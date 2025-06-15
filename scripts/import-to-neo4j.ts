import neo4j, { Driver, Session } from "neo4j-driver";
import fs from "fs-extra";
import path from "path";
import "dotenv/config";

interface KnowledgeTriple {
  subject: string;
  predicate: string;
  object: string;
  context?: string;
  direction?: 'bidirectional' | 'unidirectional';
  confidence?: number;     // 置信度（0.0-1.0）
}

interface DocumentKnowledgeTriples {
  filename: string;
  sourceFile: string;
  triples: KnowledgeTriple[];
  timestamp: string;
}

const NEO4J_URI = process.env.NEO4J_URI || "bolt://localhost:7687";
const NEO4J_USER = process.env.NEO4J_USER || "neo4j";
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || "password123";

const TRIPLETS_DIR = path.join(process.cwd(), 'sources', 'triplets');

class Neo4jImporter {
  private driver: Driver;
  
  constructor() {
    this.driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));
  }

  async connect(): Promise<void> {
    try {
      await this.driver.verifyConnectivity();
      console.log('✅ Neo4j连接成功！');
    } catch (error) {
      console.error('❌ Neo4j连接失败:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    await this.driver.close();
  }

  async createConstraints(): Promise<void> {
    const session = this.driver.session();
    
    try {
      // 创建实体节点的唯一约束
      await session.run(`
        CREATE CONSTRAINT entity_name_unique IF NOT EXISTS
        FOR (e:Entity) REQUIRE e.name IS UNIQUE
      `);

      // 创建文档节点的唯一约束
      await session.run(`
        CREATE CONSTRAINT document_filename_unique IF NOT EXISTS
        FOR (d:Document) REQUIRE d.filename IS UNIQUE
      `);

      // 创建索引以提高查询性能
      await session.run(`
        CREATE INDEX entity_name_index IF NOT EXISTS
        FOR (e:Entity) ON (e.name)
      `);

      await session.run(`
        CREATE INDEX document_filename_index IF NOT EXISTS
        FOR (d:Document) ON (d.filename)
      `);

      console.log('数据库约束和索引创建完成');
    } catch (error) {
      console.error('创建约束失败:', error);
      throw error;
    } finally {
      await session.close();
    }
  }

  async importKnowledgeTriples(documentTriples: DocumentKnowledgeTriples): Promise<void> {
    const session = this.driver.session();
    
    try {
      // 创建文档节点
      await session.run(`
        MERGE (d:Document {filename: $filename})
        SET d.sourceFile = $sourceFile,
            d.timestamp = $timestamp,
            d.triplesCount = $triplesCount
      `, {
        filename: documentTriples.filename,
        sourceFile: documentTriples.sourceFile,
        timestamp: documentTriples.timestamp,
        triplesCount: documentTriples.triples.length
      });

      // 批量处理知识三元组
      const batchSize = 100;
      for (let i = 0; i < documentTriples.triples.length; i += batchSize) {
        const batch = documentTriples.triples.slice(i, i + batchSize);
        
        await session.run(`
          UNWIND $triples AS triple
          MERGE (s:Entity {name: triple.subject})
          MERGE (o:Entity {name: triple.object})
          MERGE (d:Document {filename: $filename})
          
          // 创建主体到文档的关系
          MERGE (s)-[:MENTIONED_IN]->(d)
          
          // 创建客体到文档的关系
          MERGE (o)-[:MENTIONED_IN]->(d)
          
          // 创建知识三元组关系
          MERGE (s)-[r:RELATES_TO {predicate: triple.predicate}]->(o)
          SET r.context = triple.context,
              r.direction = triple.direction,
              r.document = $filename,
              r.timestamp = $timestamp,
              r.confidence = triple.confidence
        `, {
          triples: batch,
          filename: documentTriples.filename,
          timestamp: documentTriples.timestamp
        });
      }

      console.log(`成功导入文档 ${documentTriples.filename} 的 ${documentTriples.triples.length} 个知识三元组`);
    } catch (error) {
      console.error(`导入文档 ${documentTriples.filename} 失败:`, error);
      throw error;
    } finally {
      await session.close();
    }
  }

  async getStatistics(): Promise<void> {
    const session = this.driver.session();
    
    try {
      // 获取节点统计
      const entityCount = await session.run('MATCH (e:Entity) RETURN count(e) as count');
      const documentCount = await session.run('MATCH (d:Document) RETURN count(d) as count');
      const relationshipCount = await session.run('MATCH ()-[r:RELATES_TO]->() RETURN count(r) as count');
      
      console.log('\n=== Neo4j图数据库统计 ===');
      console.log(`实体节点数量: ${entityCount.records[0].get('count').toNumber()}`);
      console.log(`文档节点数量: ${documentCount.records[0].get('count').toNumber()}`);
      console.log(`知识三元组数量: ${relationshipCount.records[0].get('count').toNumber()}`);
      
      // 获取关系谓词统计
      const predicateTypes = await session.run(`
        MATCH ()-[r:RELATES_TO]->()
        RETURN r.predicate as predicate, count(r) as count
        ORDER BY count DESC
        LIMIT 10
      `);
      
      console.log('\n=== 前10个关系谓词 ===');
      predicateTypes.records.forEach((record: any) => {
        console.log(`${record.get('predicate')}: ${record.get('count').toNumber()}`);
      });
      
    } catch (error) {
      console.error('获取统计信息失败:', error);
    } finally {
      await session.close();
    }
  }

  async clearDatabase(): Promise<void> {
    const session = this.driver.session();
    
    try {
      console.log('清空数据库...');
      await session.run('MATCH (n) DETACH DELETE n');
      console.log('数据库已清空');
    } catch (error) {
      console.error('清空数据库失败:', error);
      throw error;
    } finally {
      await session.close();
    }
  }
}

async function loadKnowledgeTriplesFromFile(filePath: string): Promise<DocumentKnowledgeTriples> {
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

async function main() {
  console.log('开始导入知识三元组数据到Neo4j...');
  
  const importer = new Neo4jImporter();
  
  try {
    await importer.connect();
    
    // 询问是否清空数据库
    const shouldClear = process.argv.includes('--clear');
    if (shouldClear) {
      await importer.clearDatabase();
    }
    
    // 创建约束和索引
    await importer.createConstraints();
    
    // 读取所有知识三元组文件
    const tripletFiles = await fs.readdir(TRIPLETS_DIR);
    const jsonFiles = tripletFiles.filter(file => file.endsWith('.json'));
    
    console.log(`找到 ${jsonFiles.length} 个知识三元组文件`);
    
    // 导入每个文件的数据
    for (const jsonFile of jsonFiles) {
      const filePath = path.join(TRIPLETS_DIR, jsonFile);
      
      try {
        const documentTriples = await loadKnowledgeTriplesFromFile(filePath);
        await importer.importKnowledgeTriples(documentTriples);
      } catch (error) {
        console.error(`导入文件失败: ${jsonFile}`, error);
        continue;
      }
    }
    
    // 显示统计信息
    await importer.getStatistics();
    
    console.log('\n知识三元组数据导入完成！');
    console.log('您可以通过以下方式访问Neo4j Browser:');
    console.log('URL: http://localhost:7474');
    console.log(`用户名: ${NEO4J_USER}`);
    console.log(`密码: ${NEO4J_PASSWORD}`);
    
  } catch (error) {
    console.error('导入过程中发生错误:', error);
    process.exit(1);
  } finally {
    await importer.close();
  }
}

// 如果直接运行此脚本则执行main函数
main().catch(console.error); 