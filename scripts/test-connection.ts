import neo4j, { Driver } from "neo4j-driver";
import "dotenv/config";

const NEO4J_URI = process.env.NEO4J_URI || "bolt://localhost:7687";
const NEO4J_USER = process.env.NEO4J_USER || "neo4j";
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || "password123";

async function testConnection() {
  const driver: Driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));
  
  try {
    console.log('正在测试Neo4j连接...');
    await driver.verifyConnectivity();
    console.log('✅ Neo4j连接成功！');
    
    const session = driver.session();
    
    // 测试基本查询
    console.log('正在测试基本查询...');
    const result = await session.run('RETURN "Hello Neo4j!" AS message, datetime() AS timestamp');
    const record = result.records[0];
    console.log('✅ 查询结果:', record.get('message'), record.get('timestamp'));
    
    // 创建测试节点
    console.log('正在创建测试节点...');
    await session.run(`
      MERGE (ue:Engine {name: "Unreal Engine"})
      MERGE (bp:System {name: "Blueprint System"})
      MERGE (ue)-[:CONTAINS]->(bp)
      RETURN ue, bp
    `);
    console.log('✅ 测试节点创建成功！');
    
    // 查询测试节点
    const testQuery = await session.run(`
      MATCH (ue:Engine)-[r:CONTAINS]->(bp:System)
      RETURN ue.name as engine, r, bp.name as system
    `);
    
    console.log('✅ 测试数据查询结果:');
    testQuery.records.forEach((record: any) => {
      console.log(`  引擎: ${record.get('engine')} -> 系统: ${record.get('system')}`);
    });
    
    await session.close();
    
  } catch (error) {
    console.error('❌ 连接测试失败:', error);
    throw error;
  } finally {
    await driver.close();
  }
}

async function main() {
  try {
    await testConnection();
    console.log('\n🎉 所有测试通过！Neo4j数据库已准备就绪。');
    console.log('\n访问Neo4j浏览器:');
    console.log(`URL: http://localhost:7474`);
    console.log(`用户名: ${NEO4J_USER}`);
    console.log(`密码: ${NEO4J_PASSWORD}`);
  } catch (error) {
    console.error('❌ 测试失败:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本则执行main函数
main().catch(console.error); 