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
- 🎯 **关系类型查询**: 按关系类型（如：包含、支持、依赖）搜索概念关系
- 🧠 **智能概念发现**: 基于图数据库的深度关系挖掘
- 📊 **知识图谱统计**: 实时获取图数据库的统计信息
- 🔍 **概念名称搜索**: 模糊搜索概念名称，支持中文查询

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

搜索指定概念的相关概念和关系。

**参数:**
- `concept` (必需): 要查询的概念名称
- `limit` (可选): 返回的最大关系数量，默认20

**返回数据格式:**
```json
{
  "concept": "虚幻引擎",
  "found": true,
  "totalRelations": 12,
  "relatedConcepts": [
    {
      "concept": "蓝图系统",
      "relation": "包含",
      "context": "虚幻引擎的可视化脚本编程系统",
      "direction": "outgoing"
    }
  ],
  "limit": 20
}
```

### search_concepts

模糊搜索概念名称。

**参数:**
- `searchTerm` (必需): 搜索关键词
- `limit` (可选): 返回的最大概念数量，默认10

**返回数据格式:**
```json
{
  "searchTerm": "蓝图",
  "concepts": ["蓝图系统", "蓝图编辑器"],
  "count": 2,
  "limit": 10
}
```

### get_all_concepts

获取所有可用概念列表。

**参数:**
- `limit` (可选): 返回的最大概念数量，默认100

### search_by_relation_type

根据关系类型搜索概念关系。

**参数:**
- `relationType` (必需): 关系类型（如：包含、支持、依赖等）
- `limit` (可选): 返回的最大关系数量，默认20

**返回数据格式:**
```json
{
  "relationType": "支持",
  "relations": [
    {
      "conceptA": "蓝图系统",
      "relation": "支持",
      "conceptB": "事件驱动编程",
      "context": "蓝图可以响应各种游戏事件",
      "direction": "unidirectional"
    }
  ],
  "count": 5,
  "totalCount": 15,
  "limit": 20
}
```

### get_knowledge_graph_stats

获取知识图谱统计信息。

**返回数据格式:**
```json
{
  "statistics": {
    "entityCount": 14,
    "documentCount": 1,
    "relationCount": 12,
    "relationTypes": [
      {"type": "支持", "count": 3},
      {"type": "包含", "count": 2}
    ]
  },
  "neo4jAvailable": true
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

## 概念关系数据结构

系统使用以下数据结构存储概念关系：

```json
{
  "filename": "文档名称",
  "sourceFile": "源文件路径",
  "relations": [
    {
      "conceptA": "起始概念",
      "relation": "关系类型",
      "conceptB": "目标概念",
      "context": "上下文说明",
      "direction": "bidirectional"
    }
  ],
  "timestamp": "创建时间戳"
}
```

**字段说明：**
- `conceptA`: 起始概念名称
- `relation`: 关系类型（如：包含、支持、依赖、关联等）
- `conceptB`: 目标概念名称
- `context`: 关系的上下文说明，帮助理解关系的具体含义
- `direction`: 关系方向性
  - `"unidirectional"`: 单向关系（A→B，但B不一定→A）
  - `"bidirectional"`: 双向关系（A↔B，相互关联）

## 开发指南

### 项目结构

```
├── scripts/                    # 脚本文件
│   ├── extract-triplets.ts     # 概念关系提取
│   ├── import-to-neo4j.ts      # 数据导入Neo4j
│   └── test-connection.ts      # 数据库连接测试
├── src/                        # 源代码
│   ├── index.ts                # MCP服务器实现
│   └── neo4j-search.ts         # Neo4j搜索引擎
├── sources/                    # 数据文件
│   ├── docs/                   # Markdown文档
│   └── triplets/               # 概念关系JSON文件
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

# 提取概念关系（需要DeepSeek API）
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

### 自定义概念关系

你可以手动创建概念关系JSON文件：

```json
{
  "filename": "custom-relations",
  "sourceFile": "custom/relations.md",
  "relations": [
    {
      "conceptA": "自定义概念A",
      "relation": "关联",
      "conceptB": "自定义概念B",
      "context": "这是一个自定义的概念关系",
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