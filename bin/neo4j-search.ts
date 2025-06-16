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

interface TripleSearchResult {
  triples: KnowledgeTriple[];
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
   * 获取关系谓词统计
   */
  async getPredicateTypes(): Promise<Array<{predicate: string, count: number}>> {
    if (!await this.isAvailable()) {
      throw new Error('Neo4j数据库不可用');
    }

    const session = this.driver.session();
    
    try {
      const result = await session.run(`
        MATCH ()-[r:RELATES_TO]->()
        RETURN r.predicate as predicate, count(r) as count
        ORDER BY count DESC
      `);

      return result.records.map(record => ({
        predicate: record.get('predicate'),
        count: record.get('count').toNumber()
      }));
    } finally {
      await session.close();
    }
  }

  /**
   * 根据关系谓词搜索
   */
  async searchByPredicate(predicateType: string, limit: number = 20): Promise<TripleSearchResult> {
    if (!await this.isAvailable()) {
      throw new Error('Neo4j数据库不可用');
    }

    const session = this.driver.session();
    
    try {
      const result = await session.run(`
        MATCH (s:Entity)-[r:RELATES_TO {predicate: $predicateType}]->(o:Entity)
        RETURN s.name as subject, r.predicate as predicate, o.name as object, 
               r.context as context, r.document as document, r.direction as direction, r.confidence as confidence
        ORDER BY s.name, o.name
        LIMIT toInteger($limit)
      `, { predicateType, limit });

      const triples = result.records.map(record => ({
        subject: record.get('subject'),
        predicate: record.get('predicate'),
        object: record.get('object'),
        context: record.get('context'),
        document: record.get('document'),
        direction: record.get('direction') || 'unidirectional',
        confidence: record.get('confidence')
      }));

      // 获取总数
      const countResult = await session.run(`
        MATCH ()-[r:RELATES_TO {predicate: $predicateType}]->()
        RETURN count(r) as total
      `, { predicateType });

      return {
        triples,
        totalCount: countResult.records[0].get('total').toNumber()
      };
    } finally {
      await session.close();
    }
  }

  /**
   * 根据置信度搜索知识三元组
   */
  async searchByConfidence(minConfidence: number = 0.5, limit: number = 20): Promise<TripleSearchResult> {
    if (!await this.isAvailable()) {
      throw new Error('Neo4j数据库不可用');
    }

    const session = this.driver.session();
    
    try {
      const result = await session.run(`
        MATCH (s:Entity)-[r:RELATES_TO]->(o:Entity)
        WHERE r.confidence >= $minConfidence
        RETURN s.name as subject, r.predicate as predicate, o.name as object, 
               r.context as context, r.document as document, r.direction as direction, r.confidence as confidence
        ORDER BY r.confidence DESC, s.name, o.name
        LIMIT toInteger($limit)
      `, { minConfidence, limit });

      const triples = result.records.map(record => ({
        subject: record.get('subject'),
        predicate: record.get('predicate'),
        object: record.get('object'),
        context: record.get('context'),
        document: record.get('document'),
        direction: record.get('direction') || 'unidirectional',
        confidence: record.get('confidence')
      }));

      // 获取满足条件的总数
      const countResult = await session.run(`
        MATCH ()-[r:RELATES_TO]->()
        WHERE r.confidence >= $minConfidence
        RETURN count(r) as total
      `, { minConfidence });

      return {
        triples,
        totalCount: countResult.records[0].get('total').toNumber()
      };
    } finally {
      await session.close();
    }
  }

  /**
   * 获取置信度统计信息
   */
  async getConfidenceStats(): Promise<{
    avgConfidence: number;
    highConfidenceCount: number;  // >= 0.8
    mediumConfidenceCount: number; // 0.5-0.8
    lowConfidenceCount: number;   // < 0.5
    confidenceDistribution: Array<{range: string, count: number}>;
  }> {
    if (!await this.isAvailable()) {
      throw new Error('Neo4j数据库不可用');
    }

    const session = this.driver.session();
    
    try {
      // 获取平均置信度
      const avgResult = await session.run(`
        MATCH ()-[r:RELATES_TO]->()
        WHERE r.confidence IS NOT NULL
        RETURN avg(r.confidence) as avgConfidence
      `);

      // 获取置信度分布统计
      const statsResult = await session.run(`
        MATCH ()-[r:RELATES_TO]->()
        WHERE r.confidence IS NOT NULL
        RETURN 
          count(CASE WHEN r.confidence >= 0.8 THEN 1 END) as highConfidence,
          count(CASE WHEN r.confidence >= 0.5 AND r.confidence < 0.8 THEN 1 END) as mediumConfidence,
          count(CASE WHEN r.confidence < 0.5 THEN 1 END) as lowConfidence
      `);

      // 获取详细置信度分布
      const distributionResult = await session.run(`
        MATCH ()-[r:RELATES_TO]->()
        WHERE r.confidence IS NOT NULL
        WITH 
          count(CASE WHEN r.confidence >= 0.9 THEN 1 END) as range_90_100,
          count(CASE WHEN r.confidence >= 0.8 AND r.confidence < 0.9 THEN 1 END) as range_80_90,
          count(CASE WHEN r.confidence >= 0.7 AND r.confidence < 0.8 THEN 1 END) as range_70_80,
          count(CASE WHEN r.confidence >= 0.6 AND r.confidence < 0.7 THEN 1 END) as range_60_70,
          count(CASE WHEN r.confidence >= 0.5 AND r.confidence < 0.6 THEN 1 END) as range_50_60,
          count(CASE WHEN r.confidence < 0.5 THEN 1 END) as range_0_50
        RETURN range_90_100, range_80_90, range_70_80, range_60_70, range_50_60, range_0_50
      `);

      const avgConfidenceValue = avgResult.records[0].get('avgConfidence');
      const avgConfidence = avgConfidenceValue ? Number(avgConfidenceValue) : 0;
      const statsRecord = statsResult.records[0];
      const distributionRecord = distributionResult.records[0];

      return {
        avgConfidence: Number(avgConfidence.toFixed(3)),
        highConfidenceCount: statsRecord.get('highConfidence').toNumber(),
        mediumConfidenceCount: statsRecord.get('mediumConfidence').toNumber(),
        lowConfidenceCount: statsRecord.get('lowConfidence').toNumber(),
        confidenceDistribution: [
          { range: '0.9-1.0', count: distributionRecord.get('range_90_100').toNumber() },
          { range: '0.8-0.9', count: distributionRecord.get('range_80_90').toNumber() },
          { range: '0.7-0.8', count: distributionRecord.get('range_70_80').toNumber() },
          { range: '0.6-0.7', count: distributionRecord.get('range_60_70').toNumber() },
          { range: '0.5-0.6', count: distributionRecord.get('range_50_60').toNumber() },
          { range: '0.0-0.5', count: distributionRecord.get('range_0_50').toNumber() }
        ]
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
    tripleCount: number;
    predicateTypes: Array<{predicate: string, count: number}>;
  }> {
    if (!await this.isAvailable()) {
      throw new Error('Neo4j数据库不可用');
    }

    const session = this.driver.session();
    
    try {
      const entityCount = await session.run('MATCH (e:Entity) RETURN count(e) as count');
      const documentCount = await session.run('MATCH (d:Document) RETURN count(d) as count');
      const tripleCount = await session.run('MATCH ()-[r:RELATES_TO]->() RETURN count(r) as count');
      const predicateTypes = await this.getPredicateTypes();

      return {
        entityCount: entityCount.records[0].get('count').toNumber(),
        documentCount: documentCount.records[0].get('count').toNumber(),
        tripleCount: tripleCount.records[0].get('count').toNumber(),
        predicateTypes
      };
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

export { Neo4jSearchEngine, ConceptSearchResult, KnowledgeTriple, TripleSearchResult }; 