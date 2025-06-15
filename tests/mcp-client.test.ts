#!/usr/bin/env node

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let client: Client;
let transport: StdioClientTransport;

// 检测是否在CI环境中
const isCI = !!process.env.CI;

describe.skipIf(isCI)('虚幻引擎知识图谱 MCP 服务端测试', () => {
  beforeAll(async () => {
    console.log("🚀 开始测试虚幻引擎知识图谱 MCP 服务端...");

    // 创建客户端传输，连接到编译后的服务端
    const serverPath = join(__dirname, "..", "dist", "src", "index.js");
    console.log(`📁 服务端路径: ${serverPath}`);

    transport = new StdioClientTransport({
      command: "node",
      args: [serverPath],
    });

    // 创建客户端
    client = new Client({
      name: "knowledge-graph-test-client",
      version: "1.0.0",
    });

    // 连接到服务端
    console.log("🔗 连接到服务端...");
    await client.connect(transport);
    console.log("✅ 成功连接到服务端");
  });

  afterAll(async () => {
    // 关闭客户端连接
    if (client) {
      await client.close();
      console.log("🔌 客户端连接已关闭");
    }
  });

  it('应该能列出可用工具', async () => {
    console.log("\n📋 列出可用工具...");
    const tools = await client.listTools();
    
    expect(tools.tools).toBeDefined();
    expect(tools.tools.length).toBeGreaterThan(0);
    
    console.log("可用工具:");
    tools.tools.forEach((tool) => {
      console.log(`  - ${tool.name}: ${tool.description}`);
    });

    // 检查是否有预期的Neo4j工具
    const toolNames = tools.tools.map(t => t.name);
    expect(toolNames).toContain('search_concept_relations');
    expect(toolNames).toContain('search_concepts');
    expect(toolNames).toContain('get_all_concepts');
    expect(toolNames).toContain('search_by_relation_type');
    expect(toolNames).toContain('get_knowledge_graph_stats');
  });

  it('应该能获取知识图谱统计信息', async () => {
    console.log("\n📊 测试获取知识图谱统计信息...");
    const result = await client.callTool({
      name: "get_knowledge_graph_stats",
      arguments: {},
    });

    expect(result).toBeDefined();
    const content = result as any;
    expect(content.content).toBeDefined();
    expect(content.content.length).toBeGreaterThan(0);
    expect(content.content[0].type).toBe("text");

    const data = JSON.parse(content.content[0].text);
    console.log("知识图谱统计信息:");
    console.log(`  - Neo4j可用性: ${data.neo4jAvailable}`);
    
    if (data.statistics) {
      console.log(`  - 实体数量: ${data.statistics.entityCount}`);
      console.log(`  - 文档数量: ${data.statistics.documentCount}`);
      console.log(`  - 关系数量: ${data.statistics.relationCount}`);
      console.log("  - 关系类型:");
      data.statistics.relationTypes.forEach((rt: any, index: number) => {
        console.log(`    ${index + 1}. ${rt.type}: ${rt.count}`);
      });
    } else {
      console.log(`  - 错误: ${data.error}`);
    }

    expect(data.neo4jAvailable).toBeDefined();
  });

  it('应该能获取所有概念列表', async () => {
    console.log("\n📋 测试获取所有概念列表...");
    const result = await client.callTool({
      name: "get_all_concepts",
      arguments: {
        limit: 20
      },
    });

    expect(result).toBeDefined();
    const content = result as any;
    expect(content.content).toBeDefined();
    expect(content.content.length).toBeGreaterThan(0);
    expect(content.content[0].type).toBe("text");

    const data = JSON.parse(content.content[0].text);
    expect(data.concepts).toBeDefined();
    expect(Array.isArray(data.concepts)).toBe(true);
    expect(data.count).toBeDefined();
    expect(data.limit).toBe(20);

    console.log(`概念列表 (前${Math.min(data.count, 10)}个):`);
    data.concepts.slice(0, 10).forEach((concept: string, index: number) => {
      console.log(`  ${index + 1}. ${concept}`);
    });
  });

  it('应该能搜索概念名称', async () => {
    console.log("\n🔍 测试搜索概念名称...");
    const result = await client.callTool({
      name: "search_concepts",
      arguments: {
        searchTerm: "蓝图",
        limit: 10
      },
    });

    expect(result).toBeDefined();
    const content = result as any;
    expect(content.content).toBeDefined();
    expect(content.content.length).toBeGreaterThan(0);
    expect(content.content[0].type).toBe("text");

    const data = JSON.parse(content.content[0].text);
    expect(data.searchTerm).toBe("蓝图");
    expect(data.concepts).toBeDefined();
    expect(Array.isArray(data.concepts)).toBe(true);
    expect(data.count).toBeDefined();
    expect(data.limit).toBe(10);

    console.log(`搜索"蓝图"相关概念:`);
    data.concepts.forEach((concept: string, index: number) => {
      console.log(`  ${index + 1}. ${concept}`);
    });
  });

  it('应该能搜索概念关系', async () => {
    console.log("\n🔗 测试搜索概念关系...");
    const result = await client.callTool({
      name: "search_concept_relations",
      arguments: {
        concept: "虚幻引擎",
        limit: 15
      },
    });

    expect(result).toBeDefined();
    const content = result as any;
    expect(content.content).toBeDefined();
    expect(content.content.length).toBeGreaterThan(0);
    expect(content.content[0].type).toBe("text");

    const data = JSON.parse(content.content[0].text);
    console.log(`搜索"虚幻引擎"的概念关系:`);
    console.log(`  - 概念: ${data.concept}`);
    console.log(`  - 找到: ${data.found}`);
    
    if (data.found) {
      console.log(`  - 总关系数: ${data.totalRelations}`);
      console.log(`  - 显示关系数: ${data.relatedConcepts.length}`);
      console.log("  - 相关概念:");
      data.relatedConcepts.forEach((rel: any, index: number) => {
        console.log(`    ${index + 1}. ${rel.concept} (${rel.direction === 'outgoing' ? '→' : '←'} ${rel.relation})`);
        if (rel.context) {
          console.log(`       上下文: ${rel.context}`);
        }
      });
    } else {
      console.log(`  - 建议: ${JSON.stringify(data.suggestions)}`);
    }

    expect(data.concept).toBe("虚幻引擎");
    expect(data.found).toBeDefined();
  });

  it('应该能根据关系类型搜索', async () => {
    console.log("\n🔗 测试根据关系类型搜索...");
    const result = await client.callTool({
      name: "search_by_relation_type",
      arguments: {
        relationType: "支持",
        limit: 10
      },
    });

    expect(result).toBeDefined();
    const content = result as any;
    expect(content.content).toBeDefined();
    expect(content.content.length).toBeGreaterThan(0);
    expect(content.content[0].type).toBe("text");

    const data = JSON.parse(content.content[0].text);
    expect(data.relationType).toBe("支持");
    expect(data.relations).toBeDefined();
    expect(Array.isArray(data.relations)).toBe(true);
    expect(data.count).toBeDefined();
    expect(data.totalCount).toBeDefined();
    expect(data.limit).toBe(10);

    console.log(`搜索"支持"关系类型:`);
    console.log(`  - 返回关系数: ${data.count}`);
    console.log(`  - 总关系数: ${data.totalCount}`);
    console.log("  - 关系列表:");
    data.relations.forEach((rel: any, index: number) => {
      console.log(`    ${index + 1}. ${rel.conceptA} → [${rel.relation}] → ${rel.conceptB}`);
      if (rel.context) {
        console.log(`       上下文: ${rel.context}`);
      }
    });
  });



  it('应该能处理不存在的概念查询', async () => {
    console.log("\n❓ 测试查询不存在的概念...");
    const result = await client.callTool({
      name: "search_concept_relations",
      arguments: {
        concept: "不存在的概念XYZ123",
        limit: 10
      },
    });

    expect(result).toBeDefined();
    const content = result as any;
    expect(content.content).toBeDefined();
    expect(content.content.length).toBeGreaterThan(0);
    expect(content.content[0].type).toBe("text");

    const data = JSON.parse(content.content[0].text);
    expect(data.concept).toBe("不存在的概念XYZ123");
    expect(data.found).toBe(false);
    expect(data.message).toBeDefined();
    expect(data.suggestions).toBeDefined();
    expect(Array.isArray(data.suggestions)).toBe(true);

    console.log(`查询不存在概念的结果:`);
    console.log(`  - 概念: ${data.concept}`);
    console.log(`  - 找到: ${data.found}`);
    console.log(`  - 消息: ${data.message}`);
    console.log(`  - 建议: ${JSON.stringify(data.suggestions)}`);
  });
});
