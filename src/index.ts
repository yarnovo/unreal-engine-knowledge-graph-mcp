#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { getNeo4jSearchEngine } from "./neo4j-search.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



// Load package.json to get version
let packageVersion = "1.0.0";
try {
  const packagePath = join(__dirname, "..", "..", "package.json");
  const packageData = JSON.parse(readFileSync(packagePath, "utf-8"));
  packageVersion = packageData.version;
} catch (error) {
  console.warn(
    "Could not load package version:",
    error instanceof Error ? error.message : String(error)
  );
}

console.log(`当前版本号：${packageVersion}`);

const server = new McpServer({
  name: "unreal-engine-knowledge-graph-mcp",
  version: packageVersion,
});

// 初始化Neo4j搜索引擎
const neo4jSearch = getNeo4jSearchEngine();

// 搜索虚幻引擎概念关系
server.tool(
  "search_concept_relations",
  "搜索虚幻引擎概念之间的关系，用于学习和概念扩展",
  {
    concept: z.string().describe("要查询的概念名称"),
    limit: z.number().optional().default(20).describe("返回的最大关系数量"),
  },
  {
    readOnlyHint: true,
    openWorldHint: false,
  },
  async (args) => {
    try {
      console.log(`🔍 搜索概念关系: ${args.concept}`);
      
      const result = await neo4jSearch.searchRelatedConcepts(args.concept, args.limit);
      
      if (!result) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                concept: args.concept,
                found: false,
                message: "未找到该概念，请检查概念名称是否正确",
                suggestions: await neo4jSearch.searchConceptsByName(args.concept, 5)
              }, null, 2),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              concept: result.concept,
              found: true,
              totalRelations: result.totalRelations,
              relatedConcepts: result.relatedConcepts,
              limit: args.limit
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error("❌ 概念关系搜索失败:", error);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              concept: args.concept,
              found: false,
              error: error instanceof Error ? error.message : String(error)
            }, null, 2),
          },
        ],
        isError: true,
      };
    }
  }
);

// 搜索概念名称
server.tool(
  "search_concepts",
  "模糊搜索虚幻引擎概念名称",
  {
    searchTerm: z.string().describe("搜索关键词"),
    limit: z.number().optional().default(10).describe("返回的最大概念数量"),
  },
  {
    readOnlyHint: true,
    openWorldHint: false,
  },
  async (args) => {
    try {
      console.log(`🔍 搜索概念名称: ${args.searchTerm}`);
      
      const concepts = await neo4jSearch.searchConceptsByName(args.searchTerm, args.limit);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              searchTerm: args.searchTerm,
              concepts,
              count: concepts.length,
              limit: args.limit
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error("❌ 概念名称搜索失败:", error);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              searchTerm: args.searchTerm,
              concepts: [],
              error: error instanceof Error ? error.message : String(error)
            }, null, 2),
          },
        ],
        isError: true,
      };
    }
  }
);

// 获取所有概念列表
server.tool(
  "get_all_concepts",
  "获取所有虚幻引擎概念列表",
  {
    limit: z.number().optional().default(100).describe("返回的最大概念数量"),
  },
  {
    readOnlyHint: true,
    openWorldHint: false,
  },
  async (args) => {
    try {
      console.log(`📋 获取所有概念列表，限制数量: ${args.limit}`);
      
      const concepts = await neo4jSearch.getAllConcepts(args.limit);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              concepts,
              count: concepts.length,
              limit: args.limit
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error("❌ 获取概念列表失败:", error);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              concepts: [],
              error: error instanceof Error ? error.message : String(error)
            }, null, 2),
          },
        ],
        isError: true,
      };
    }
  }
);

// 根据关系类型搜索
server.tool(
  "search_by_relation_type",
  "根据关系类型搜索概念间的关系",
  {
    relationType: z.string().describe("关系类型，如：包含、支持、依赖等"),
    limit: z.number().optional().default(20).describe("返回的最大关系数量"),
  },
  {
    readOnlyHint: true,
    openWorldHint: false,
  },
  async (args) => {
    try {
      console.log(`🔍 根据关系类型搜索: ${args.relationType}`);
      
      const result = await neo4jSearch.searchByRelationType(args.relationType, args.limit);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              relationType: args.relationType,
              relations: result.relations,
              count: result.relations.length,
              totalCount: result.totalCount,
              limit: args.limit
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error("❌ 关系类型搜索失败:", error);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              relationType: args.relationType,
              relations: [],
              error: error instanceof Error ? error.message : String(error)
            }, null, 2),
          },
        ],
        isError: true,
      };
    }
  }
);

// 获取知识图谱统计信息
server.tool(
  "get_knowledge_graph_stats",
  "获取知识图谱的统计信息",
  {},
  {
    readOnlyHint: true,
    openWorldHint: false,
  },
  async () => {
    try {
      console.log(`📊 获取知识图谱统计信息`);
      
      const stats = await neo4jSearch.getStatistics();
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              statistics: stats,
              neo4jAvailable: true
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error("❌ 获取统计信息失败:", error);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              statistics: null,
              neo4jAvailable: false,
              error: error instanceof Error ? error.message : String(error)
            }, null, 2),
          },
        ],
        isError: true,
      };
    }
  }
);



// Create stdio transport
const transport = new StdioServerTransport();

// Connect server to stdio transport
server.connect(transport);
