# Token 计算工具

一个专门用于计算文档 token 数量的独立工具，支持多种编码格式，可以帮助优化 API 调用成本和切片策略。

## ✨ 功能特点

- 🎯 **精确计算**: 使用 tiktoken 库进行准确的 token 计算
- 🔧 **多编码支持**: 支持 o200k_base、cl100k_base、p50k_base、r50k_base
- 📊 **详细统计**: 提供文件大小、字符数、token数、字符/token比等详细信息
- 💡 **智能建议**: 自动判断是否需要切片，提供切片建议
- ⏰ **时间预估**: 估算 API 处理时间
- 🚀 **命令行友好**: 支持多种参数和选项

## 📦 安装使用

首先确保项目已编译：
```bash
npm run build
```

## 🔧 使用方法

### 基本用法
```bash
# 计算单个文件的 token 数量
node dist/scripts/calculate-tokens.js <文件路径>

# 使用 npm 脚本
npm run calculate-tokens <文件路径>
```

### 详细模式
```bash
# 显示详细信息（推荐）
node dist/scripts/calculate-tokens.js <文件路径> -v
node dist/scripts/calculate-tokens.js <文件路径> --verbose
```

### 指定编码类型
```bash
# 使用不同的编码类型
node dist/scripts/calculate-tokens.js <文件路径> -e cl100k_base
node dist/scripts/calculate-tokens.js <文件路径> --encoding o200k_base
```

### 获取帮助
```bash
node dist/scripts/calculate-tokens.js -h
node dist/scripts/calculate-tokens.js --help
```

## 📝 使用示例

### 示例 1: 基本计算
```bash
node dist/scripts/calculate-tokens.js ./sources/docs/my-document.md
```
输出：
```
🔢 开始计算 Token 数量...

📊 Token 计算结果:
   📁 文件: my-document.md
   📍 路径: ./sources/docs/my-document.md
   🎯 Token 数量: 1,548
```

### 示例 2: 详细模式
```bash
node dist/scripts/calculate-tokens.js ./sources/docs/my-document.md -v
```
输出：
```
🔢 开始计算 Token 数量...

📊 Token 计算结果:
   📁 文件: my-document.md
   📍 路径: ./sources/docs/my-document.md
   📦 文件大小: 15.13 KB
   📝 内容长度: 10,831 字符
   🔤 编码类型: o200k_base
   📐 字符/Token比: 2.31
   🎯 Token 数量: 4,696

💡 参考信息:
   ✅ 在 DeepSeek 上下文限制内
   ⏱️  预估处理时间: ~10 秒
```

### 示例 3: 大文档切片建议
```bash
node dist/scripts/calculate-tokens.js ./sources/docs/large-document.md -v
```
输出：
```
📊 Token 计算结果:
   🎯 Token 数量: 180,000

💡 参考信息:
   ⚠️  超出 DeepSeek 上下文限制 (65,536 tokens)
   🔪 建议切片数量: 3 个 (每片约 60k tokens)
   ⏱️  预估处理时间: ~360 秒
```

## 🔤 编码类型说明

| 编码类型 | 适用模型 | 说明 |
|---------|---------|------|
| `o200k_base` | GPT-4o, DeepSeek | **推荐** - 默认编码，适用于最新模型 |
| `cl100k_base` | GPT-4, GPT-3.5-turbo | 适用于 OpenAI GPT-4 系列 |
| `p50k_base` | GPT-3, text-davinci-003 | 适用于较老的 GPT-3 模型 |
| `r50k_base` | GPT-3, text-davinci-002 | 适用于早期 GPT-3 模型 |

## 💡 使用场景

### 1. API 成本预估
在调用 AI 服务前，先计算文档的 token 数量，预估 API 调用成本。

### 2. 切片策略优化
对于大文档，了解总 token 数，制定合适的切片策略。

### 3. 模型兼容性检查
检查文档是否超出特定模型的上下文限制。

### 4. 批处理优化
在批量处理文档前，预先了解每个文档的 token 分布。

## 🔧 程序化使用

如果需要在其他 TypeScript/JavaScript 代码中使用：

```typescript
import { calculateTokens, calculateFileTokens } from './scripts/calculate-tokens.js';

// 计算字符串的 token 数量
const tokenCount = calculateTokens("你好世界", "o200k_base");
console.log(tokenCount); // 输出: 4

// 计算文件的详细信息
const result = await calculateFileTokens("./my-file.md", "o200k_base");
console.log(result);
// 输出: { filePath, fileName, fileSize, contentLength, tokenCount, ... }
```

## 🚀 集成到工作流

### 在脚本中使用
```bash
# 检查文档是否需要切片
TOKEN_COUNT=$(node dist/scripts/calculate-tokens.js my-doc.md | grep "Token 数量" | grep -o '[0-9,]*')
if [ ${TOKEN_COUNT//,/} -gt 60000 ]; then
    echo "文档需要切片处理"
fi
```

### 在 CI/CD 中使用
```yaml
- name: Check document token counts
  run: |
    npm run build
    for file in sources/docs/*.md; do
      node dist/scripts/calculate-tokens.js "$file"
    done
```

---

## 📚 相关文档

- [主要的三元组提取工具](./extract-triplets.ts)
- [动态切片算法说明](../config/extract-triplets.config.json) 