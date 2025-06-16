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

// 辅助函数：去重数组
function removeDuplicates<T>(array: T[], keyFn: (item: T) => string): T[] {
  const seen = new Set<string>();
  return array.filter(item => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

// 辅助函数：合并概念搜索结果
function mergeConceptResults(results: Array<any>, searchTerms: {cn: string, en: string}): any {
  if (results.length === 0) {
    return {
      searchTerms,
      found: false,
      message: "未找到相关概念，请检查概念名称是否正确",
      suggestions: []
    };
  }

  if (results.length === 1 && results[0]) {
    return {
      searchTerms,
      found: true,
      ...results[0]
    };
  }

  // 合并多个结果
  const validResults = results.filter(r => r !== null);
  if (validResults.length === 0) {
    return {
      searchTerms,
      found: false,
      message: "未找到相关概念，请检查概念名称是否正确",
      suggestions: []
    };
  }

  // 合并相关概念，去重
  const allRelatedConcepts = validResults.flatMap(r => r.relatedConcepts || []);
  const uniqueRelatedConcepts = removeDuplicates(allRelatedConcepts, item => 
    `${item.concept}-${item.predicate}-${item.direction}`
  );

  return {
    searchTerms,
    found: true,
    concept: validResults.map(r => r.concept).join(" / "),
    totalRelations: Math.max(...validResults.map(r => r.totalRelations || 0)),
    relatedConcepts: uniqueRelatedConcepts
  };
}

// 搜索虚幻引擎概念关系（使用知识三元组）
server.tool(
  "search_concept_relations",
  "搜索虚幻引擎概念之间的知识三元组关系，用于学习和概念扩展。支持中英文双语查询。",
  {
    concept: z.object({
      cn: z.string().describe("中文概念名称"),
      en: z.string().describe("英文概念名称")
    }).describe("要查询的概念名称（中英文）"),
    limit: z.number().optional().default(20).describe("返回的最大关系数量"),
  },
  {
    readOnlyHint: true,
    openWorldHint: false,
  },
  async (args) => {
    try {
      const { cn, en } = args.concept;
      
      console.log(`🔍 搜索概念关系: 中文="${cn}", 英文="${en}"`);
      
      // 分别查询中英文概念
      const promises = [
        neo4jSearch.searchRelatedConcepts(cn, args.limit),
        neo4jSearch.searchRelatedConcepts(en, args.limit)
      ];

      const results = await Promise.all(promises);
      const mergedResult = mergeConceptResults(results, args.concept);

      // 如果没有找到结果，尝试提供建议
      if (!mergedResult.found) {
        const suggestionPromises = [
          neo4jSearch.searchConceptsByName(cn, 5),
          neo4jSearch.searchConceptsByName(en, 5)
        ];
        
        const suggestions = await Promise.all(suggestionPromises);
        const allSuggestions = suggestions.flat();
        const uniqueSuggestions = [...new Set(allSuggestions)];
        
        mergedResult.suggestions = uniqueSuggestions;
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              ...mergedResult,
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
              searchTerms: args.concept,
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
  "模糊搜索虚幻引擎概念名称，支持中英文双语查询",
  {
    searchTerm: z.object({
      cn: z.string().describe("中文搜索关键词"),
      en: z.string().describe("英文搜索关键词")
    }).describe("搜索关键词（中英文）"),
    limit: z.number().optional().default(10).describe("返回的最大概念数量"),
  },
  {
    readOnlyHint: true,
    openWorldHint: false,
  },
  async (args) => {
    try {
      const { cn, en } = args.searchTerm;
      
      console.log(`🔍 搜索概念名称: 中文="${cn}", 英文="${en}"`);
      
      // 分别查询中英文概念
      const promises = [
        neo4jSearch.searchConceptsByName(cn, args.limit),
        neo4jSearch.searchConceptsByName(en, args.limit)
      ];

      const results = await Promise.all(promises);
      const allConcepts = results.flat();
      const uniqueConcepts = [...new Set(allConcepts)];
      
      // 限制返回数量
      const limitedConcepts = uniqueConcepts.slice(0, args.limit);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              searchTerms: args.searchTerm,
              concepts: limitedConcepts,
              count: limitedConcepts.length,
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
              searchTerms: args.searchTerm,
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
  "获取所有虚幻引擎概念列表及其关系统计信息（按关系数量排序，优先显示核心概念）",
  {
    limit: z.number().optional().default(100).describe("返回的最大概念数量"),
  },
  {
    readOnlyHint: true,
    openWorldHint: false,
  },
  async (args) => {
    try {
      console.log(`📋 获取所有概念列表及统计信息，限制数量: ${args.limit}`);
      
      const concepts = await neo4jSearch.getAllConcepts(args.limit);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              concepts,
              count: concepts.length,
              limit: args.limit,
              note: "概念按关系数量从大到小排序，包含入度、出度和总关系数统计"
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

// Create stdio transport
const transport = new StdioServerTransport();

// Connect server to stdio transport
server.connect(transport);
