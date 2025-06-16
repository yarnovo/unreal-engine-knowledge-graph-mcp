# 虚幻引擎知识图谱 MCP 服务器

[English](README_EN.md) | 中文

这个项目提供虚幻引擎官方文档的 MCP（Model Context Protocol）服务器，支持**基于Neo4j图数据库的概念关系搜索**，帮助开发者发现概念间的学习路径和依赖关系。

## 项目背景

在学习虚幻引擎开发过程中，开发者经常需要理解各种概念之间的关系，比如：
- 蓝图系统与C++代码的关系
- 材质编辑器与节点图编程的关系  
- Nanite虚拟几何体与高多边形模型的关系

传统的文档搜索只能找到单个概念的信息，无法揭示概念间的学习路径和依赖关系。本项目通过构建知识图谱，让AI能够理解概念间的关联，提供更智能的学习指导。

## 解决方案

本项目提供了一个基于Neo4j图数据库的MCP服务器，专门用于虚幻引擎概念关系的智能搜索和发现。通过DeepSeek v3模型提取文档中的概念关系，构建完整的知识图谱。

## 功能特性

- 🔗 **概念关系搜索**: 发现任意概念的相关概念和学习路径
- 🧠 **智能概念发现**: 基于图数据库的深度关系挖掘
- 🔍 **概念名称搜索**: 模糊搜索概念名称，支持中英文双语查询
- 📊 **关系统计信息**: 获取概念的关系数量统计，按重要性排序

## 在 MCP Host 中使用

### Cursor 配置

在项目根目录创建或编辑 `.cursor/mcp.json` 配置文件：

```json
{
    "mcpServers": {
        "unreal-engine-knowledge-graph-mcp": {
            "command": "npx",
            "args": [
                "-y",
                "unreal-engine-knowledge-graph-mcp"
            ],
            "env": {
                "NEO4J_URI": "bolt://localhost:7687",
                "NEO4J_USER": "neo4j",
                "NEO4J_PASSWORD": "password123"
            }
        }
    }
}
```

### VSCode 配置

在项目根目录创建或编辑 `.vscode/mcp.json` 配置文件：

```json
{
    "servers": {
        "unreal-engine-knowledge-graph-mcp": {
            "type": "stdio",
            "command": "npx",
            "args": [
                "-y",
                "unreal-engine-knowledge-graph-mcp"
            ],
            "env": {
                "NEO4J_URI": "bolt://localhost:7687",
                "NEO4J_USER": "neo4j",
                "NEO4J_PASSWORD": "password123"
            }
        }
    }
}
```

### 环境变量说明

| 环境变量 | 含义 | 默认值 |
|---------|------|--------|
| `NEO4J_URI` | Neo4j数据库连接地址 | `bolt://localhost:7687` |
| `NEO4J_USER` | Neo4j用户名 | `neo4j` |
| `NEO4J_PASSWORD` | Neo4j密码 | `password123` |
| `DEEPSEEK_API_KEY` | DeepSeek API密钥 | 无 |

## MCP工具功能

### search_concept_relations

搜索指定概念的相关概念和关系，支持中英文双语查询。

**使用场景:**
- 🎯 **概念学习扩展**: "我想学习蓝图系统，相关的概念还有哪些？"
- 🔍 **技术关联探索**: "虚幻引擎包含哪些核心功能模块？"
- 🧭 **学习路径规划**: "从材质编辑器出发，我还需要了解什么？"

**提示词示例:**
```
帮我搜索"蓝图系统"和"Blueprint System"的相关概念，我想了解它与其他功能的关系
查找"虚幻引擎"和"Unreal Engine"包含哪些核心功能
搜索"材质编辑器"和"Material Editor"相关的学习内容
```

**参数:**
- `concept` (必需): 要查询的概念名称（中英文双语）
  - `cn` (必需): 中文概念名称
  - `en` (必需): 英文概念名称
- `limit` (可选): 返回的最大关系数量，默认20

**返回数据格式:**
```json
{
  "searchTerms": {
    "cn": "虚幻引擎",
    "en": "Unreal Engine"
  },
  "concept": "虚幻引擎 / Unreal Engine",
  "found": true,
  "totalRelations": 12,
  "relatedConcepts": [
    {
      "concept": "蓝图系统",
      "predicate": "包含",
      "context": "虚幻引擎的可视化脚本编程系统",
      "direction": "outgoing"
    }
  ],
  "limit": 20
}
```

### search_concepts

模糊搜索概念名称，支持中英文双语查询。

**使用场景:**
- 🔍 **快速查找概念**: "我记得有个关于'粒子'的功能，叫什么名字来着？"
- 📝 **概念名称确认**: "虚幻引擎中2D相关的功能都有哪些？"
- 🎯 **关键词探索**: "搜索包含'编辑器'的所有概念"

**提示词示例:**
```
搜索包含"粒子"和"Particle"的所有概念
查找与"2D"相关的功能
搜索"编辑器"和"Editor"相关的工具
```

**参数:**
- `searchTerm` (必需): 搜索关键词（中英文双语）
  - `cn` (必需): 中文搜索关键词
  - `en` (必需): 英文搜索关键词
- `limit` (可选): 返回的最大概念数量，默认10

**返回数据格式:**
```json
{
  "searchTerms": {
    "cn": "蓝图",
    "en": "Blueprint"
  },
  "concepts": ["蓝图系统", "蓝图编辑器", "Blueprint System", "Blueprint Editor"],
  "count": 4,
  "limit": 10
}
```

### get_all_concepts

获取所有可用概念列表及其关系统计信息（按关系数量排序，优先显示核心概念）。

**使用场景:**
- 📋 **核心概念优先浏览**: "虚幻引擎知识图谱中最重要的概念有哪些？"
- 🎯 **学习计划制定**: "我想按重要性顺序学习，哪些是核心概念？"
- 📊 **概念关系分析**: "这些概念分别有多少关联，哪些最核心？"

**提示词示例:**
```
显示最重要的虚幻引擎概念，按关系数量排序
列出前50个核心概念，我想了解哪些最重要
获取概念列表及其关系统计，帮我制定学习计划
```

**参数:**
- `limit` (可选): 返回的最大概念数量，默认100

**返回数据格式:**
```json
{
  "concepts": [
    {
      "concept": "蓝图系统",
      "relationCount": 25,
      "incomingCount": 12,
      "outgoingCount": 13
    },
    {
      "concept": "虚幻引擎",
      "relationCount": 20,
      "incomingCount": 8,
      "outgoingCount": 12
    }
  ],
  "count": 2,
  "limit": 100,
  "note": "概念按关系数量从大到小排序，包含入度、出度和总关系数统计"
}
```

## 系统架构

### 核心组件

1. **文档处理**: 读取Markdown文档，使用DeepSeek v3提取概念关系
2. **知识图谱**: 基于Neo4j存储概念和关系数据
3. **MCP服务**: 提供标准化的概念关系查询接口

### 数据流程

```
Markdown文档 → DeepSeek v3分析 → 概念关系提取 → Neo4j图数据库 → MCP工具查询
```

## 开发测试

### 环境要求

- Node.js >= 18.0.0
- Docker (用于运行Neo4j)
- DeepSeek API密钥

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/unreal-engine-knowledge-graph-mcp.git
cd unreal-engine-knowledge-graph-mcp
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑.env文件，添加DeepSeek API密钥
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

4. **启动Neo4j数据库**
```bash
# 启动Docker容器
docker-compose up -d

# 等待数据库启动完成
npm run test-connection
```

5. **构建项目**
```bash
npm run build
```

6. **提取概念关系（测试模式）**
```bash
# 测试模式：只处理一个文档文件
npm run extract-triplets:test-mode
```

7. **导入数据到Neo4j**
```bash
npm run import-to-neo4j
```

## 知识三元组数据结构

系统使用标准的知识图谱三元组结构存储概念关系：

```json
{
  "filename": "文档名称",
  "sourceFile": "源文件路径",
  "triples": [
    {
      "subject": "主体概念",
      "predicate": "关系谓词",
      "object": "客体概念",
      "context": "上下文说明",
      "direction": "bidirectional"
    }
  ],
  "timestamp": "创建时间戳"
}
```

**字段说明：**
- `subject`: 主体概念名称（知识三元组的主语）
- `predicate`: 关系谓词（如：包含、支持、依赖、关联等）
- `object`: 客体概念名称（知识三元组的宾语）
- `context`: 关系的上下文说明，帮助理解关系的具体含义
- `direction`: 关系方向性
  - `"unidirectional"`: 单向关系（主体→客体，但客体不一定→主体）
  - `"bidirectional"`: 双向关系（主体↔客体，相互关联）
- `confidence`: 置信度（0.0-1.0），表示关系提取的准确性和可靠性
  - `0.9-1.0`: 明确的技术关系，文档中有直接、清晰的说明
  - `0.7-0.9`: 较为明确的关系，基于上下文推断但证据充分
  - `0.5-0.7`: 中等置信度，关系存在但需要一定推理
  - `0.3-0.5`: 较弱的关系，主要基于语义相似性
  - `0.1-0.3`: 非常弱的关系，仅基于概念共现

## 开发指南

### 项目结构

```
├── scripts/                    # 脚本文件
│   ├── extract-triplets.ts     # 知识三元组提取
│   ├── import-to-neo4j.ts      # 数据导入Neo4j
│   └── test-connection.ts      # 数据库连接测试
├── bin/                        # 源代码
│   ├── index.ts                # MCP服务器实现
│   └── neo4j-search.ts         # Neo4j搜索引擎
├── sources/                    # 数据文件
│   ├── docs/                   # Markdown文档
│   └── triplets/               # 知识三元组JSON文件
├── tests/                      # 测试文件
│   └── mcp-client.test.ts      # MCP客户端测试
├── docker-compose.yml          # Neo4j Docker配置
└── package.json                # 项目配置
```

### 可用脚本

```bash
# 构建项目
npm run build

# 测试数据库连接
npm run test-connection

# 生成演示数据
npm run extract-triplets:test-mode

# 提取知识三元组（需要DeepSeek API）
npm run extract-triplets

# 导入数据到Neo4j
npm run import-to-neo4j

# 清空数据库并重新导入
npm run import-to-neo4j -- --clear

# 运行测试
npm test
```

### 添加新文档

1. 将Markdown文档放入 `sources/docs/` 目录
2. 运行概念关系提取：`npm run extract-triplets`
3. 导入到Neo4j：`npm run import-to-neo4j`

### 自定义知识三元组

你可以手动创建知识三元组JSON文件：

```json
{
  "filename": "custom-triples",
  "sourceFile": "custom/triples.md",
  "triples": [
    {
      "subject": "自定义概念A",
      "predicate": "关联",
      "object": "自定义概念B",
      "context": "这是一个自定义的知识三元组",
      "direction": "bidirectional"
    }
  ],
  "timestamp": "2025-01-12T10:30:15.387Z"
}
```

将文件保存到 `sources/triplets/` 目录，然后运行导入命令。

## 技术栈

### 核心技术
- **Node.js**: 运行环境
- **TypeScript**: 类型安全的开发语言
- **MCP SDK**: Model Context Protocol 实现
- **Neo4j**: 图数据库
- **Docker**: 容器化部署

### AI集成
- **DeepSeek v3**: 概念关系提取
- **OpenAI SDK**: API调用接口

### 开发工具
- **Vitest**: 单元测试框架
- **tsx**: TypeScript执行器
- **Zod**: 参数验证

## 故障排除

### Neo4j连接问题

```bash
# 检查Docker容器状态
docker-compose ps

# 查看Neo4j日志
docker-compose logs neo4j

# 重启Neo4j容器
docker-compose restart neo4j
```

### 测试连接
```bash
npm run test-connection
```

### 查看Neo4j浏览器界面
访问 http://localhost:7474
- 用户名: neo4j
- 密码: password123

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！ 