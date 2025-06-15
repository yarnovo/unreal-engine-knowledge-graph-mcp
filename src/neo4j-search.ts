import neo4j, { Driver, Session } from "neo4j-driver";
import "dotenv/config";

interface ConceptRelation {
  conceptA: string;
  relation: string;
  conceptB: string;
  context?: string;
  document?: string;
  direction?: 'bidirectional' | 'unidirectional';
}

interface ConceptSearchResult {
  concept: string;
  relatedConcepts: Array<{
    concept: string;
    relation: string;
    context?: string;
    document?: string;
    direction: 'outgoing' | 'incoming';
  }>;
  totalRelations: number;
}

interface RelationSearchResult {
  relations: ConceptRelation[];
  totalCount: number;
}

class Neo4jSearchEngine {
  private driver: Driver;
  private isConnected: boolean = false;

  constructor() {
    const NEO4J_URI = process.env.NEO4J_URI || "bolt://localhost:7687";
    const NEO4J_USER = process.env.NEO4J_USER || "neo4j";
    const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || "password123";
    
    this.driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));
  }

  async connect(): Promise<boolean> {
    try {
      await this.driver.verifyConnectivity();
      this.isConnected = true;
      return true;
    } catch (error) {
      console.error('Neo4j连接失败:', error);
      this.isConnected = false;
      return false;
    }
  }

  async isAvailable(): Promise<boolean> {
    if (!this.isConnected) {
      return await this.connect();
    }
    return true;
  }

  async close(): Promise<void> {
    await this.driver.close();
    this.isConnected = false;
  }

  /**
   * 根据概念名称查找相关概念
   */
  async searchRelatedConcepts(conceptName: string, limit: number = 20): Promise<ConceptSearchResult | null> {
    if (!await this.isAvailable()) {
      throw new Error('Neo4j数据库不可用');
    }

    const session = this.driver.session();
    
    try {
      // 查找与指定概念相关的所有关系（双向）
      const result = await session.run(`
        MATCH (c:Entity {name: $conceptName})
        OPTIONAL MATCH (c)-[r1:RELATES_TO]->(target)
        OPTIONAL MATCH (source)-[r2:RELATES_TO]->(c)
        
        WITH c, 
             collect(DISTINCT {concept: target.name, relation: r1.type, context: r1.context, document: r1.document, direction: 'outgoing'}) as outgoing,
             collect(DISTINCT {concept: source.name, relation: r2.type, context: r2.context, document: r2.document, direction: 'incoming'}) as incoming
        
        RETURN c.name as concept,
               outgoing + incoming as relations,
               size(outgoing) + size(incoming) as totalRelations
        LIMIT 1
      `, { conceptName });

      if (result.records.length === 0) {
        return null;
      }

      const record = result.records[0];
      const relations = record.get('relations')
        .filter((rel: any) => rel.concept !== null)
        .slice(0, limit);

      return {
        concept: record.get('concept'),
        relatedConcepts: relations,
        totalRelations: record.get('totalRelations').toNumber()
      };
    } finally {
      await session.close();
    }
  }

  /**
   * 模糊搜索概念名称
   */
  async searchConceptsByName(searchTerm: string, limit: number = 10): Promise<string[]> {
    if (!await this.isAvailable()) {
      throw new Error('Neo4j数据库不可用');
    }

    const session = this.driver.session();
    
    try {
      const result = await session.run(`
        MATCH (e:Entity)
        WHERE e.name CONTAINS $searchTerm
        RETURN e.name as concept
        ORDER BY size(e.name), e.name
        LIMIT toInteger($limit)
      `, { searchTerm, limit });

      return result.records.map(record => record.get('concept'));
    } finally {
      await session.close();
    }
  }

  /**
   * 获取所有概念列表
   */
  async getAllConcepts(limit: number = 100): Promise<string[]> {
    if (!await this.isAvailable()) {
      throw new Error('Neo4j数据库不可用');
    }

    const session = this.driver.session();
    
    try {
      const result = await session.run(`
        MATCH (e:Entity)
        RETURN e.name as concept
        ORDER BY e.name
        LIMIT toInteger($limit)
      `, { limit });

      return result.records.map(record => record.get('concept'));
    } finally {
      await session.close();
    }
  }

  /**
   * 获取关系类型统计
   */
  async getRelationTypes(): Promise<Array<{type: string, count: number}>> {
    if (!await this.isAvailable()) {
      throw new Error('Neo4j数据库不可用');
    }

    const session = this.driver.session();
    
    try {
      const result = await session.run(`
        MATCH ()-[r:RELATES_TO]->()
        RETURN r.type as type, count(r) as count
        ORDER BY count DESC
      `);

      return result.records.map(record => ({
        type: record.get('type'),
        count: record.get('count').toNumber()
      }));
    } finally {
      await session.close();
    }
  }

  /**
   * 根据关系类型搜索
   */
  async searchByRelationType(relationType: string, limit: number = 20): Promise<RelationSearchResult> {
    if (!await this.isAvailable()) {
      throw new Error('Neo4j数据库不可用');
    }

    const session = this.driver.session();
    
    try {
      const result = await session.run(`
        MATCH (s:Entity)-[r:RELATES_TO {type: $relationType}]->(o:Entity)
        RETURN s.name as conceptA, r.type as relation, o.name as conceptB, 
               r.context as context, r.document as document, r.direction as direction
        ORDER BY s.name, o.name
        LIMIT toInteger($limit)
      `, { relationType, limit });

      const relations = result.records.map(record => ({
        conceptA: record.get('conceptA'),
        relation: record.get('relation'),
        conceptB: record.get('conceptB'),
        context: record.get('context'),
        document: record.get('document'),
        direction: record.get('direction') || 'unidirectional'
      }));

      // 获取总数
      const countResult = await session.run(`
        MATCH ()-[r:RELATES_TO {type: $relationType}]->()
        RETURN count(r) as total
      `, { relationType });

      return {
        relations,
        totalCount: countResult.records[0].get('total').toNumber()
      };
    } finally {
      await session.close();
    }
  }

  /**
   * 获取数据库统计信息
   */
  async getStatistics(): Promise<{
    entityCount: number;
    documentCount: number;
    relationCount: number;
    relationTypes: Array<{type: string, count: number}>;
  }> {
    if (!await this.isAvailable()) {
      throw new Error('Neo4j数据库不可用');
    }

    const session = this.driver.session();
    
    try {
      const entityCount = await session.run('MATCH (e:Entity) RETURN count(e) as count');
      const documentCount = await session.run('MATCH (d:Document) RETURN count(d) as count');
      const relationCount = await session.run('MATCH ()-[r:RELATES_TO]->() RETURN count(r) as count');
      const relationTypes = await this.getRelationTypes();

      return {
        entityCount: entityCount.records[0].get('count').toNumber(),
        documentCount: documentCount.records[0].get('count').toNumber(),
        relationCount: relationCount.records[0].get('count').toNumber(),
        relationTypes: relationTypes.slice(0, 10) // 前10个关系类型
      };
    } finally {
      await session.close();
    }
  }
}

// 单例模式
let neo4jSearchInstance: Neo4jSearchEngine | null = null;

export function getNeo4jSearchEngine(): Neo4jSearchEngine {
  if (!neo4jSearchInstance) {
    neo4jSearchInstance = new Neo4jSearchEngine();
  }
  return neo4jSearchInstance;
}

export { Neo4jSearchEngine, ConceptSearchResult, ConceptRelation, RelationSearchResult }; 