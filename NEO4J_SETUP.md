# 虚幻引擎知识图谱系统 - Neo4j集成

本系统使用Neo4j图数据库来存储和查询虚幻引擎文档的知识图谱数据。通过DeepSeek大模型解析文档内容，提取实体关系三元组，并构建知识图谱。

## 🚀 快速开始

### 1. 启动Neo4j数据库

```bash
# 启动Neo4j容器
docker-compose up -d

# 检查容器状态
docker ps

# 查看日志
docker logs unreal-engine-neo4j
```

### 2. 测试数据库连接

```bash
# 测试Neo4j连接
npm run test-connection
```

### 3. 处理文档并提取三元组

#### 方式一：测试模式（推荐开始）

```bash
# 设置环境变量
# 在.env文件中添加：DEEPSEEK_API_KEY=your_api_key_here

# 测试模式（只处理一个文档文件）
npm run extract-triplets:test-mode

# 导入到Neo4j数据库
npm run import-to-neo4j
```

#### 方式二：完整处理（处理所有文档）

```bash
# 设置环境变量
# 在.env文件中添加：DEEPSEEK_API_KEY=your_api_key_here

# 提取所有文档三元组
npm run extract-triplets

# 导入到Neo4j数据库
npm run import-to-neo4j
```

## 📊 系统架构

```
sources/
├── docs/           # 原始markdown文档
└── triplets/       # 提取的三元组JSON文件

scripts/
├── extract-triplets.ts    # 文档解析和三元组提取
├── import-to-neo4j.ts     # 数据导入Neo4j
└── test-connection.ts     # 连接测试

docker-compose.yml         # Neo4j数据库配置
```

## 🗄️ 数据库模式

### 节点类型

- **Entity**: 实体节点（如：虚幻引擎、蓝图系统等）
  - `name`: 实体名称
  
- **Document**: 文档节点
  - `filename`: 文件名
  - `sourceFile`: 源文件路径
  - `timestamp`: 时间戳
  - `tripletsCount`: 三元组数量

### 关系类型

- **RELATES_TO**: 实体间的关系
  - `type`: 关系类型（包含、提供、支持等）
  - `context`: 上下文描述
  - `document`: 来源文档
  - `timestamp`: 时间戳
  
- **MENTIONED_IN**: 实体在文档中被提及
  - 连接实体与文档节点

## 🔧 环境配置

### 必需的环境变量

在`.env`文件中设置：

```env
# DeepSeek API配置
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# Neo4j数据库配置（可选，有默认值）
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password123
```

### 系统要求

- Node.js 18+
- Docker & Docker Compose
- 至少2GB内存（用于Neo4j）

## 🌐 访问Neo4j浏览器

启动数据库后，可以通过以下方式访问：

- **URL**: http://localhost:7474
- **用户名**: neo4j
- **密码**: password123

### 常用Cypher查询示例

```cypher
// 查看所有节点类型
MATCH (n) RETURN DISTINCT labels(n)

// 查看实体统计
MATCH (e:Entity) RETURN count(e) as entity_count

// 查看关系类型分布
MATCH ()-[r:RELATES_TO]->()
RETURN r.type as relation_type, count(r) as count
ORDER BY count DESC

// 查找虚幻引擎相关的所有关系
MATCH (ue:Entity {name: "虚幻引擎"})-[r:RELATES_TO]->(target)
RETURN ue.name, r.type, target.name, r.context

// 查找特定实体的邻居节点
MATCH (e:Entity {name: "蓝图系统"})-[r:RELATES_TO]-(neighbor)
RETURN e.name, r.type, neighbor.name, r.context

// 查看文档覆盖情况
MATCH (d:Document)
RETURN d.filename, d.tripletsCount
ORDER BY d.tripletsCount DESC
```

## 📝 脚本详细说明

### extract-triplets.ts
- 读取`sources/docs/`目录下的markdown文件
- 调用DeepSeek API提取三元组
- 保存结果到`sources/triplets/`目录

### import-to-neo4j.ts
- 读取三元组JSON文件
- 创建Neo4j节点和关系
- 设置数据库约束和索引
- 提供统计信息



### test-connection.ts
- 测试Neo4j数据库连接
- 验证基本查询功能

## 🛠️ 开发和维护

### 构建项目

```bash
npm run build
```

### 清空数据库

```bash
npm run import-to-neo4j -- --clear
```

### 停止服务

```bash
# 停止Neo4j容器
docker-compose down

# 删除所有数据（谨慎使用）
docker-compose down -v
```

## 🎯 应用场景

1. **智能问答系统**: 基于知识图谱回答虚幻引擎相关问题
2. **文档关联分析**: 发现不同文档间的关联关系
3. **知识发现**: 挖掘隐藏的技术概念关系
4. **个性化推荐**: 根据用户兴趣推荐相关内容

## 🚨 注意事项

1. **API费用**: DeepSeek API按token计费，大文档处理成本较高
2. **处理时间**: 包含API调用延迟，避免过于频繁的请求
3. **数据质量**: 三元组质量依赖于提示词设计和模型性能
4. **存储空间**: Neo4j数据库会占用一定磁盘空间

## 📞 技术支持

如有问题，请检查：
1. Docker容器是否正常运行
2. 环境变量是否正确设置
3. 网络连接是否正常
4. API密钥是否有效

---

🎉 **恭喜！您已成功搭建虚幻引擎知识图谱系统！** 