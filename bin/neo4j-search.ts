import neo4j, { Driver, Session } from "neo4j-driver";
import "dotenv/config";

interface KnowledgeTriple {
  subject: string;
  predicate: string;
  object: string;
  context?: string;
  document?: string;
  direction?: 'bidirectional' | 'unidirectional';
  confidence?: number;     // 置信度（0.0-1.0）
}

interface ConceptSearchResult {
  concept: string;
  relatedConcepts: Array<{
    concept: string;
    predicate: string;
    context?: string;
    document?: string;
    direction: 'outgoing' | 'incoming';
    confidence?: number;     // 置信度（0.0-1.0）
  }>;
  totalRelations: number;
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
             collect(DISTINCT {concept: target.name, predicate: r1.predicate, context: r1.context, document: r1.document, direction: 'outgoing', confidence: r1.confidence}) as outgoing,
             collect(DISTINCT {concept: source.name, predicate: r2.predicate, context: r2.context, document: r2.document, direction: 'incoming', confidence: r2.confidence}) as incoming
        
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
   * 获取所有概念列表及其关系统计信息（按关系数量排序，优先返回核心概念）
   */
  async getAllConcepts(limit: number = 100): Promise<Array<{
    concept: string;
    relationCount: number;
    incomingCount: number;
    outgoingCount: number;
  }>> {
    if (!await this.isAvailable()) {
      throw new Error('Neo4j数据库不可用');
    }

    const session = this.driver.session();
    
    try {
      const result = await session.run(`
        MATCH (e:Entity)
        OPTIONAL MATCH (e)-[r_out:RELATES_TO]->()
        OPTIONAL MATCH ()-[r_in:RELATES_TO]->(e)
        WITH e, 
             count(DISTINCT r_out) as outgoingCount,
             count(DISTINCT r_in) as incomingCount,
             count(DISTINCT r_out) + count(DISTINCT r_in) as totalCount
        WHERE totalCount > 0
        RETURN e.name as concept, 
               totalCount as relationCount,
               incomingCount,
               outgoingCount
        ORDER BY totalCount DESC, e.name
        LIMIT toInteger($limit)
      `, { limit });

      return result.records.map(record => ({
        concept: record.get('concept'),
        relationCount: record.get('relationCount').toNumber(),
        incomingCount: record.get('incomingCount').toNumber(),
        outgoingCount: record.get('outgoingCount').toNumber()
      }));
    } finally {
      await session.close();
    }
  }
}

// 单例模式
let searchEngineInstance: Neo4jSearchEngine | null = null;

export function getNeo4jSearchEngine(): Neo4jSearchEngine {
  if (!searchEngineInstance) {
    searchEngineInstance = new Neo4jSearchEngine();
  }
  return searchEngineInstance;
}

export { Neo4jSearchEngine, ConceptSearchResult, KnowledgeTriple }; 