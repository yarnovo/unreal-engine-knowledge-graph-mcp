import OpenAI from "openai";
import fs from "fs-extra";
import path from "path";
import micromatch from "micromatch";
import { get_encoding } from "tiktoken";
import { calculateTokens } from "./calculate-tokens.js";
import "dotenv/config";

interface KnowledgeTriple {
  subject: string;         // 主体（知识三元组的主语）
  predicate: string;       // 谓语（知识三元组的关系谓词）
  object: string;          // 客体（知识三元组的宾语）
  context?: string;        // 关系上下文说明
  direction?: 'bidirectional' | 'unidirectional'; // 关系方向性
  confidence?: number;     // 置信度（0.0-1.0，表示关系提取的准确性）
}

// 添加警告接口
interface Warning {
  type: 'large_file' | 'processing_error' | 'api_error' | 'content_warning';
  message: string;
  filename?: string;
  details?: any;
  timestamp: string;
}

interface DocumentKnowledgeTriples {
  filename: string;
  sourceFile: string;
  triples: KnowledgeTriple[];  // 改为知识三元组
  timestamp: string;
  warnings?: Warning[];  // 添加警告字段
  metadata?: {
    fileSize: number;
    contentLength: number;
    processingTimeMs: number;
  };
}

// 添加配置接口
interface PreprocessingRule {
  name: string;
  description: string;
  filePatterns: string[];        // 文件名匹配正则表达式
  scriptPath: string;           // 预处理脚本相对路径
  enabled: boolean;
}

interface ChunkingConfig {
  enabled: boolean;              // 是否启用切片功能
  maxContextTokens: number;      // 最大上下文token数（API限制）
  minTokensPerChunk: number;     // 最小切片token数
  overlapRatio: number;          // 切片重叠系数（0.0-1.0）
  encoding: string;              // tiktoken编码模型
}

interface ExtractConfig {
  version: string;
  description: string;
  excludeFiles: string[];
  excludePatterns: string[];
  includePatterns?: string[];  // 添加包含模式
  warnings: {
    largeSizeThreshold: number;
    largeSizeWarningMessage: string;
    enableSizeWarning: boolean;
    recordWarningsInOutput: boolean;
  };
  processing: {
    delayBetweenRequests: number;
    maxRetries: number;
    timeoutMs: number;
    concurrency: number;          // 添加并发数量控制
    batchDelayMs: number;         // 添加批次间延迟控制
  };
  chunking?: ChunkingConfig;     // 添加切片配置
  preprocessing?: {              // 添加预处理配置
    enabled: boolean;
    scriptsPath: string;         // 预处理脚本目录
    rules: PreprocessingRule[];  // 预处理规则
  };
  output: {
    includeWarnings: boolean;
    includeMetadata: boolean;
    timestampFormat: string;
  };
}

// 添加切片接口
interface ContentChunk {
  index: number;           // 切片索引
  content: string;         // 切片内容
  tokenCount: number;      // 切片token数量
  startPosition: number;   // 在原文中的起始位置
  endPosition: number;     // 在原文中的结束位置
}

interface ChunkResult {
  chunkIndex: number;
  triples: KnowledgeTriple[];
  warnings: Warning[];
  success: boolean;
  error?: string;
}

// 添加处理结果接口
interface ProcessResult {
  filename: string;
  sourceFile: string;
  success: boolean;
  triplesCount: number;  // 改为三元组数量
  warnings?: Warning[];  // 添加警告字段
  error?: string;
  chunkCount?: number;   // 切片数量（如果使用了切片）
}

// 添加进度数据接口
interface ProgressData {
  status: 'running' | 'completed' | 'failed' | 'interrupted';
  startTime: string;
  lastUpdateTime: string;
  endTime?: string;
  totalFiles: number;
  processedCount: number;
  successCount: number;
  failedCount: number;
  excludedCount: number;  // 添加被排除的文件计数
  results: ProcessResult[];
  completionRate: number;
  remainingFiles: string[]; // 剩余未处理的文件
  failedFiles: string[]; // 失败需要重试的文件
  excludedFiles: string[]; // 被排除的文件列表
  totalWarnings: number;  // 总警告数
}

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY || ''
});

const DOCS_DIR = path.join(process.cwd(), 'sources', 'docs');
const TRIPLETS_DIR = path.join(process.cwd(), 'sources', 'triplets');
const PROGRESS_FILE = path.join(process.cwd(), 'sources', 'triplets.result.json');
const CONFIG_FILE = path.join(process.cwd(), 'config', 'extract-triplets.config.json');
const TEST_MODE = process.env.TEST_MODE === "true";

// 添加配置加载函数
function loadConfig(): ExtractConfig {
  try {
    if (!fs.existsSync(CONFIG_FILE)) {
      console.warn('⚠️  配置文件不存在，使用默认配置');
      return getDefaultConfig();
    }
    
    const configContent = fs.readFileSync(CONFIG_FILE, 'utf-8');
    const config: ExtractConfig = JSON.parse(configContent);
      console.log(`📋 已加载配置文件: ${CONFIG_FILE}`);
  console.log(`   排除文件: ${config.excludeFiles.length} 个`);
  console.log(`   排除模式: ${config.excludePatterns.length} 个`);
  console.log(`   大文件阈值: ${config.warnings.largeSizeThreshold} 字符`);
  console.log(`   并发请求数: ${config.processing.concurrency} 个`);
  console.log(`   批次间延迟: ${config.processing.batchDelayMs}ms`);
  if (config.chunking?.enabled) {
    console.log(`   文件切片: 启用`);
    console.log(`   最大上下文token: ${config.chunking.maxContextTokens}`);
    console.log(`   最小切片token: ${config.chunking.minTokensPerChunk}`);
    console.log(`   重叠系数: ${config.chunking.overlapRatio}`);
    console.log(`   编码模型: ${config.chunking.encoding}`);
  } else {
    console.log(`   文件切片: 禁用`);
  }
    
    return config;
  } catch (error) {
    console.error('❌ 加载配置文件失败:', (error as Error).message);
    console.log('使用默认配置');
    return getDefaultConfig();
  }
}

function getDefaultConfig(): ExtractConfig {
  return {
    version: "1.0.0",
    description: "默认配置",
    excludeFiles: [],
    excludePatterns: [],
    includePatterns: [],  // 默认为空，表示包含所有文件
    warnings: {
      largeSizeThreshold: 8000,
      largeSizeWarningMessage: "文档内容较长，可能增加API调用成本",
      enableSizeWarning: true,
      recordWarningsInOutput: true
    },
    processing: {
      delayBetweenRequests: 1000,
      maxRetries: 3,
      timeoutMs: 30000,
      concurrency: 12,          // 并发请求数量（建议10-15个）
      batchDelayMs: 2000        // 批次间延迟（毫秒）
    },
    chunking: {                 // 默认切片配置
      enabled: true,
      maxContextTokens: 65536,
      minTokensPerChunk: 1000,
      overlapRatio: 0.1,
      encoding: "o200k_base"
    },
    output: {
      includeWarnings: true,
      includeMetadata: true,
      timestampFormat: "ISO"
    }
  };
}

// 添加文件过滤函数
function shouldIncludeFile(filename: string, config: ExtractConfig): boolean {
  // 如果有includePatterns，先检查是否匹配包含模式
  if (config.includePatterns && config.includePatterns.length > 0) {
    const matched = micromatch.isMatch(filename, config.includePatterns, { 
      ignore: [],
      dot: true,
      basename: true
    });
    if (!matched) {
      return false; // 如果不匹配任何包含模式，则排除
    }
  }
  
  // 检查是否在排除列表中
  if (config.excludeFiles.includes(filename)) {
    return false;
  }
  
  // 检查排除模式匹配
  if (config.excludePatterns.length > 0) {
    const matched = micromatch.isMatch(filename, config.excludePatterns, { 
      ignore: [],
      dot: true,
      basename: true
    });
    if (matched) {
      return false;
    }
  }
  
  return true;
}

// 添加警告创建函数
function createWarning(type: Warning['type'], message: string, filename?: string, details?: any): Warning {
  return {
    type,
    message,
    filename,
    details,
    timestamp: new Date().toISOString()
  };
}

// 添加动态切片算法函数
function calculateOptimalChunkSize(totalTokens: number, config: ChunkingConfig): {
  chunkSize: number;
  estimatedChunks: number;
} {
  // 动态计算最优切片大小的算法
  // 目标：每个切片尽可能大，但确保最小切片也满足要求
  
  const { maxContextTokens, minTokensPerChunk, overlapRatio } = config;
  
  // 如果内容很小，直接返回
  if (totalTokens <= maxContextTokens) {
    return { chunkSize: totalTokens, estimatedChunks: 1 };
  }
  
  // 先尝试使用最大允许的切片大小
  let chunkSize = maxContextTokens;
  
  // 计算在这个切片大小下需要多少个切片
  // 考虑重叠：有效覆盖 = chunkSize * (1 + (n-1) * (1 - overlapRatio))
  // 即：totalTokens = chunkSize * (1 + (n-1) * (1 - overlapRatio))
  // 解出：n = (totalTokens / chunkSize - 1) / (1 - overlapRatio) + 1
  let estimatedChunks = Math.ceil((totalTokens / chunkSize - 1) / (1 - overlapRatio) + 1);
  
  // 检查最后一个切片是否满足最小token要求
  // 最后一个切片的大小近似为：totalTokens - (estimatedChunks - 1) * chunkSize * (1 - overlapRatio)
  let lastChunkSize = totalTokens - (estimatedChunks - 1) * chunkSize * (1 - overlapRatio);
  
  // 如果最后一个切片太小，我们需要调整策略
  if (lastChunkSize < minTokensPerChunk && estimatedChunks > 1) {
    // 重新计算：确保所有切片都满足最小要求
    // 我们尝试减少切片大小，让最后一个切片也能满足最小要求
    
    // 二分查找最优的切片大小
    let minSize = minTokensPerChunk;
    let maxSize = maxContextTokens;
    let bestChunkSize = maxContextTokens;
    let bestChunks = estimatedChunks;
    
    while (maxSize - minSize > 100) { // 精度控制
      const midSize = Math.floor((minSize + maxSize) / 2);
      const midChunks = Math.ceil((totalTokens / midSize - 1) / (1 - overlapRatio) + 1);
      const midLastChunkSize = totalTokens - (midChunks - 1) * midSize * (1 - overlapRatio);
      
      if (midLastChunkSize >= minTokensPerChunk || midChunks === 1) {
        // 这个大小可行，尝试更大的
        bestChunkSize = midSize;
        bestChunks = midChunks;
        minSize = midSize;
      } else {
        // 太大了，最后一个切片太小
        maxSize = midSize;
      }
    }
    
    chunkSize = bestChunkSize;
    estimatedChunks = bestChunks;
  }
  
  return { chunkSize, estimatedChunks };
}

// 重新设计的文本切片函数
function chunkContent(content: string, config: ChunkingConfig, filename?: string): {
  chunks: ContentChunk[];
  warnings: Warning[];
} {
  const warnings: Warning[] = [];
  
  try {
    // 计算总token数
    const totalTokens = calculateTokens(content, config.encoding as any);
    
    // 如果内容较短，不需要切片
    if (totalTokens <= config.maxContextTokens) {
      return {
        chunks: [{
          index: 0,
          content,
          tokenCount: totalTokens,
          startPosition: 0,
          endPosition: content.length
        }],
        warnings
      };
    }
    
    console.log(`📝 文件${filename ? ` ${filename}` : ''} 需要切片: ${totalTokens} tokens > ${config.maxContextTokens} tokens`);
    
    // 计算最优切片大小
    const { chunkSize: optimalChunkSize, estimatedChunks } = calculateOptimalChunkSize(totalTokens, config);
    
    console.log(`🎯 动态计算切片参数: 目标大小=${optimalChunkSize} tokens, 预估切片数=${estimatedChunks}`);
    
    const chunks: ContentChunk[] = [];
    let currentPosition = 0;
    let chunkIndex = 0;
    
    while (currentPosition < content.length) {
      // 估算当前位置对应的大致字符长度
      const estimatedChunkLength = Math.floor(optimalChunkSize * 4); // 大致估算每token对应4个字符
      let endPosition = Math.min(currentPosition + estimatedChunkLength, content.length);
      
      // 提取候选切片
      let chunkContent = content.slice(currentPosition, endPosition);
      let chunkTokens = calculateTokens(chunkContent, config.encoding as any);
      
      // 如果token数量超过限制，逐步缩小切片
              while (chunkTokens > optimalChunkSize && chunkContent.length > 500) {
          endPosition = Math.floor(endPosition * 0.9); // 缩小10%
          chunkContent = content.slice(currentPosition, endPosition);
          chunkTokens = calculateTokens(chunkContent, config.encoding as any);
        }
      
              // 如果仍然太大，强制切分
        if (chunkTokens > optimalChunkSize) {
          // 逐字符减少直到满足token限制
          while (chunkTokens > optimalChunkSize && chunkContent.length > 1) {
            endPosition--;
            chunkContent = content.slice(currentPosition, endPosition);
            chunkTokens = calculateTokens(chunkContent, config.encoding as any);
          }
        }
      
              // 尝试在合适的位置切分（避免在单词中间切分）
        if (endPosition < content.length) {
          const betterEndPosition = findBetterCutPosition(content, currentPosition, endPosition);
          if (betterEndPosition > currentPosition) {
            endPosition = betterEndPosition;
            chunkContent = content.slice(currentPosition, endPosition);
            chunkTokens = calculateTokens(chunkContent, config.encoding as any);
          }
        }
      
      // 检查是否是最后一个切片，如果是，确保它满足最小token要求
      const isLastChunk = endPosition >= content.length;
      if (isLastChunk && chunkTokens < config.minTokensPerChunk && chunks.length > 0) {
                  // 最后一个切片太小，合并到上一个切片
          const lastChunk = chunks[chunks.length - 1];
          const mergedContent = lastChunk.content + chunkContent;
          const mergedTokens = calculateTokens(mergedContent, config.encoding as any);
        
        if (mergedTokens <= config.maxContextTokens) {
          lastChunk.content = mergedContent;
          lastChunk.tokenCount = mergedTokens;
          lastChunk.endPosition = endPosition;
          break;
        }
      }
      
      chunks.push({
        index: chunkIndex,
        content: chunkContent,
        tokenCount: chunkTokens,
        startPosition: currentPosition,
        endPosition: endPosition
      });
      
      chunkIndex++;
      
      // 计算下一个切片的起始位置（考虑重叠）
      if (endPosition >= content.length) {
        break;
      }
      
      // 计算重叠的字符位置
      const overlapCharLength = Math.floor(chunkContent.length * config.overlapRatio);
      currentPosition = Math.max(currentPosition + 1, endPosition - overlapCharLength);
    }
    
    // 验证切片质量
    const minChunkTokens = Math.min(...chunks.map(c => c.tokenCount));
    const maxChunkTokens = Math.max(...chunks.map(c => c.tokenCount));
    const avgChunkTokens = chunks.reduce((sum, c) => sum + c.tokenCount, 0) / chunks.length;
    
    console.log(`📊 切片完成: ${chunks.length} 个切片`);
    console.log(`   Token分布: 最小=${minChunkTokens}, 最大=${maxChunkTokens}, 平均=${avgChunkTokens.toFixed(0)}`);
    console.log(`   总计覆盖: ${chunks.reduce((sum, c) => sum + c.tokenCount, 0)} tokens`);
    
    // 检查是否有切片小于最小要求
    if (minChunkTokens < config.minTokensPerChunk) {
      const warning = createWarning('content_warning', 
        `存在小于最小要求的切片: ${minChunkTokens} < ${config.minTokensPerChunk}`, filename);
      warnings.push(warning);
    }
    
    return { chunks, warnings };
    
  } catch (error) {
    const warning = createWarning('processing_error', `文本切片失败: ${(error as Error).message}`, filename);
    warnings.push(warning);
    console.error('文本切片失败:', error);
    
    // 返回整个内容作为单个切片
    return {
      chunks: [{
        index: 0,
        content,
        tokenCount: content.length, // 使用字符数作为近似值
        startPosition: 0,
        endPosition: content.length
      }],
      warnings
    };
  }
}

// 寻找更好的切分位置（避免在单词中间切分）
function findBetterCutPosition(content: string, startPos: number, endPos: number): number {
  if (endPos >= content.length) return endPos;
  
  // 查找合适的切分点（段落、句子、单词边界）
  const searchRange = Math.min(200, Math.floor((endPos - startPos) * 0.1)); // 在10%范围内搜索
  
  // 优先级：段落 > 句子 > 单词边界
  const breakPoints = [
    { pattern: /\n\s*\n/, priority: 3 }, // 段落分隔
    { pattern: /[.!?]\s+/, priority: 2 }, // 句子结尾
    { pattern: /\s+/, priority: 1 }       // 单词边界
  ];
  
  for (const bp of breakPoints) {
    for (let i = endPos; i >= endPos - searchRange && i > startPos; i--) {
      const testStr = content.slice(i - 2, i + 2);
      if (bp.pattern.test(testStr)) {
        return i;
      }
    }
  }
  
  return endPos;
}

// 添加预处理函数
async function preprocessContent(content: string, filename: string, config: ExtractConfig): Promise<{
  processedContent: string;
  warnings: Warning[];
}> {
  const warnings: Warning[] = [];
  let processedContent = content;

  if (!config.preprocessing?.enabled || !config.preprocessing.rules.length) {
    return { processedContent, warnings };
  }

  for (const rule of config.preprocessing.rules) {
    if (!rule.enabled) continue;

    // 使用 micromatch 检查文件名是否匹配 glob 模式
    const matchesPattern = (() => {
      try {
        return micromatch.isMatch(filename, rule.filePatterns, { 
          ignore: [],
          dot: true,
          basename: true,
          nocase: true  // 不区分大小写
        });
      } catch (error) {
        const warning = createWarning('processing_error', `预处理规则 ${rule.name} 的 glob 模式无效: ${rule.filePatterns.join(', ')}`, filename);
        warnings.push(warning);
        return false;
      }
    })();

    if (matchesPattern) {
      try {
        // 构建后的脚本路径应该指向dist目录
        const baseScriptPath = rule.scriptPath.endsWith('.js') ? rule.scriptPath : `${rule.scriptPath}.js`;
        const scriptPath = path.resolve('dist', config.preprocessing.scriptsPath, baseScriptPath);
        
        // 检查脚本文件是否存在
        if (!fs.existsSync(scriptPath)) {
          const warning = createWarning('processing_error', `预处理脚本不存在: ${scriptPath}`, filename);
          warnings.push(warning);
          continue;
        }

        console.log(`📝 应用预处理规则 "${rule.name}" 到文件: ${filename}`);
        
        // 动态导入预处理脚本 (支持ESM)
        const scriptUrl = `file://${scriptPath}?t=${Date.now()}`; // 添加时间戳避免缓存
        const preprocessor = await import(scriptUrl);
        
        if (typeof preprocessor.default !== 'function' && typeof preprocessor.preprocess !== 'function') {
          const warning = createWarning('processing_error', `预处理脚本 ${rule.scriptPath} 必须导出 default 或 preprocess 函数`, filename);
          warnings.push(warning);
          continue;
        }

        const preprocessFunc = preprocessor.default || preprocessor.preprocess;
        const result = await preprocessFunc(processedContent, filename);
        
        if (typeof result === 'string') {
          processedContent = result;
        } else if (result && typeof result.content === 'string') {
          processedContent = result.content;
          if (result.warnings) {
            warnings.push(...result.warnings);
          }
        }
        
      } catch (error) {
        const warning = createWarning('processing_error', `预处理脚本执行失败: ${(error as Error).message}`, filename);
        warnings.push(warning);
        console.error(`❌ 预处理脚本执行失败:`, error);
      }
    }
  }

  return { processedContent, warnings };
}

// 添加进度管理函数
function loadProgress(): ProgressData | null {
  try {
    if (!fs.existsSync(PROGRESS_FILE)) {
      return null;
    }
    
    const content = fs.readFileSync(PROGRESS_FILE, "utf-8");
    const progressData: ProgressData = JSON.parse(content);
    
    console.log("📄 发现已存在的进度文件");
    console.log(`   状态: ${progressData.status}`);
    console.log(`   开始时间: ${progressData.startTime}`);
    console.log(`   最后更新: ${progressData.lastUpdateTime}`);
    console.log(`   进度: ${progressData.processedCount}/${progressData.totalFiles} (${progressData.completionRate.toFixed(1)}%)`);
    console.log(`   成功: ${progressData.successCount}, 失败: ${progressData.failedCount}`);
    if (progressData.excludedCount > 0) {
      console.log(`   排除: ${progressData.excludedCount}`);
    }
    console.log(`   剩余文件: ${progressData.remainingFiles.length}`);
    console.log(`   失败重试: ${progressData.failedFiles.length}`);
    if (progressData.totalWarnings > 0) {
      console.log(`   总警告数: ${progressData.totalWarnings}`);
    }
    
    return progressData;
  } catch (error) {
    console.error("❌ 读取进度文件失败:", (error as Error).message);
    return null;
  }
}

function saveProgress(progressData: ProgressData): void {
  try {
    progressData.lastUpdateTime = new Date().toISOString();
    progressData.completionRate = progressData.totalFiles > 0 
      ? (progressData.processedCount / progressData.totalFiles) * 100 
      : 0;
    
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progressData, null, 2), "utf-8");
    console.log(`💾 进度已保存: ${progressData.processedCount}/${progressData.totalFiles} (${progressData.completionRate.toFixed(1)}%)`);
  } catch (error) {
    console.error("❌ 保存进度文件失败:", (error as Error).message);
  }
}

function createInitialProgress(files: string[], excludedFiles: string[]): ProgressData {
  return {
    status: 'running',
    startTime: new Date().toISOString(),
    lastUpdateTime: new Date().toISOString(),
    totalFiles: files.length,
    processedCount: 0,
    successCount: 0,
    failedCount: 0,
    excludedCount: excludedFiles.length,
    results: [],
    completionRate: 0,
    remainingFiles: [...files],
    failedFiles: [],
    excludedFiles: [...excludedFiles],
    totalWarnings: 0
  };
}

function analyzeProgress(progressData: ProgressData | null, files: string[]): {
  shouldContinue: boolean;
  filesToProcess: string[];
  message: string;
} {
  if (!progressData) {
    return {
      shouldContinue: true,
      filesToProcess: files,
      message: "🚀 开始全新的概念关系提取任务"
    };
  }

  // 如果状态不是completed，优先处理剩余文件
  if (progressData.status !== 'completed') {
    // 如果有剩余文件需要处理
    if (progressData.remainingFiles.length > 0) {
      return {
        shouldContinue: true,
        filesToProcess: progressData.remainingFiles,
        message: `⏭️ 从上次进度恢复，剩余 ${progressData.remainingFiles.length} 个文件`
      };
    }
  }

  // 如果状态是completed且有失败的文件需要重试
  if (progressData.status === 'completed' && progressData.failedFiles.length > 0) {
    return {
      shouldContinue: true,
      filesToProcess: progressData.failedFiles, // 这里先返回失败文件，main函数会重新组织
      message: `🔄 任务已完成但存在失败文件，开始重试 ${progressData.failedFiles.length} 个失败的文件`
    };
  }

  // 如果已完成所有文件且无失败文件
  if (progressData.status === 'completed' && progressData.failedFiles.length === 0) {
    return {
      shouldContinue: false,
      filesToProcess: [],
      message: "✅ 任务已完成，所有文件都处理成功"
    };
  }

  // 所有文件都已处理完成
  return {
    shouldContinue: false,
    filesToProcess: [],
    message: "✅ 所有文件都已处理完成"
  };
}

// 添加切片处理的知识三元组提取函数
async function extractKnowledgeTriplesWithChunking(content: string, config: ExtractConfig, filename?: string): Promise<{
  triples: KnowledgeTriple[];
  warnings: Warning[];
  chunkCount?: number;
}> {
  const allTriples: KnowledgeTriple[] = [];
  const allWarnings: Warning[] = [];
  
  if (!config.chunking) {
    const warning = createWarning('processing_error', '切片配置未启用，无法进行切片处理', filename);
    allWarnings.push(warning);
    return { triples: [], warnings: allWarnings, chunkCount: 0 };
  }
  
  try {
    // 对内容进行切片
    const { chunks, warnings: chunkWarnings } = chunkContent(content, config.chunking, filename);
    allWarnings.push(...chunkWarnings);
    
    console.log(`🎯 开始处理 ${chunks.length} 个切片`);
    
    // 逐个处理切片
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`📝 处理切片 ${i + 1}/${chunks.length} (${chunk.tokenCount} tokens)`);
      
      try {
        // 为每个切片调用单独的提取函数
        const { triples: chunkTriples, warnings: chunkWarnings } = await extractKnowledgeTriplesForChunk(
          chunk.content, 
          config, 
          i + 1, 
          chunks.length,
          filename
        );
        
        allTriples.push(...chunkTriples);
        allWarnings.push(...chunkWarnings);
        
        console.log(`✅ 切片 ${i + 1} 完成: 提取到 ${chunkTriples.length} 个三元组`);
        
        // 切片间延迟
        if (i < chunks.length - 1) {
          await new Promise(resolve => setTimeout(resolve, config.processing.delayBetweenRequests));
        }
        
      } catch (error) {
        const warning = createWarning('api_error', `切片 ${i + 1} 处理失败: ${(error as Error).message}`, filename);
        allWarnings.push(warning);
        console.error(`❌ 切片 ${i + 1} 处理失败:`, error);
      }
    }
    
    // 去重处理（可选）
    const uniqueTriples = deduplicateTriples(allTriples);
    const duplicateCount = allTriples.length - uniqueTriples.length;
    
    if (duplicateCount > 0) {
      console.log(`🔄 去重完成: 移除 ${duplicateCount} 个重复三元组`);
      const warning = createWarning('content_warning', `切片处理过程中发现 ${duplicateCount} 个重复三元组已被移除`, filename);
      allWarnings.push(warning);
    }
    
    console.log(`🎉 切片处理完成: 总计 ${uniqueTriples.length} 个三元组（来自 ${chunks.length} 个切片）`);
    return { triples: uniqueTriples, warnings: allWarnings, chunkCount: chunks.length };
    
  } catch (error) {
    const warning = createWarning('processing_error', `切片处理失败: ${(error as Error).message}`, filename);
    allWarnings.push(warning);
    console.error('切片处理失败:', error);
    return { triples: [], warnings: allWarnings, chunkCount: 0 };
  }
}

// 添加单个切片的三元组提取函数
async function extractKnowledgeTriplesForChunk(
  chunkContent: string, 
  config: ExtractConfig, 
  chunkIndex: number, 
  totalChunks: number,
  filename?: string
): Promise<{
  triples: KnowledgeTriple[];
  warnings: Warning[];
}> {
  const warnings: Warning[] = [];
  
  const prompt = generateExtractionPrompt(chunkContent, true, { index: chunkIndex, total: totalChunks });

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "你是一个专业的知识图谱构建专家，专注于构建学习导向的标准知识三元组网络。" },
        { role: "user", content: prompt }
      ],
      model: "deepseek-chat",
      temperature: 0.1
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      const warning = createWarning('api_error', `切片 ${chunkIndex} 模型返回空内容`, filename);
      warnings.push(warning);
      console.error(`切片 ${chunkIndex} 模型返回空内容`);
      return { triples: [], warnings };
    }

    // 尝试解析JSON响应
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      const warning = createWarning('api_error', `切片 ${chunkIndex} 无法从响应中提取JSON`, filename);
      warnings.push(warning);
      console.error(`切片 ${chunkIndex} 无法从响应中提取JSON`);
      return { triples: [], warnings };
    }

    const result = JSON.parse(jsonMatch[0]);
    return { triples: result.triples || [], warnings };
  } catch (error) {
    const warning = createWarning('api_error', `切片 ${chunkIndex} 调用DeepSeek API失败: ${(error as Error).message}`, filename);
    warnings.push(warning);
    console.error(`切片 ${chunkIndex} 调用DeepSeek API失败:`, error);
    throw error; // 重新抛出错误以便上层处理
  }
}

// 添加三元组去重函数
function deduplicateTriples(triples: KnowledgeTriple[]): KnowledgeTriple[] {
  const seen = new Set<string>();
  const uniqueTriples: KnowledgeTriple[] = [];
  
  for (const triple of triples) {
    // 创建唯一标识符（基于主体、谓语、客体的组合）
    const key = `${triple.subject.toLowerCase()}|${triple.predicate.toLowerCase()}|${triple.object.toLowerCase()}`;
    
    if (!seen.has(key)) {
      seen.add(key);
      uniqueTriples.push(triple);
    }
  }
  
  return uniqueTriples;
}

// 添加公共提示词生成函数
function generateExtractionPrompt(content: string, isChunk: boolean = false, chunkInfo?: { index: number, total: number }): string {
  const chunkPrefix = isChunk && chunkInfo 
    ? `【重要说明】这是文档的第 ${chunkInfo.index} 部分（共 ${chunkInfo.total} 部分），请专注于本片段的核心概念和关系。\n\n`
    : '';

  return `你是一个专业的知识图谱构建专家。请分析以下虚幻引擎文档内容${isChunk ? '片段' : ''}，提取标准知识图谱三元组，构建学习导向的知识图谱。

${chunkPrefix}核心目标：帮助学习者通过一个概念发现相关联的其他概念，形成概念关系网络。

请遵循以下原则：
1. **概念识别**：识别文档中的核心技术概念、功能模块、系统组件、开发概念等
2. **三元组构建**：重点提取概念与概念之间的学习相关性，构建标准的知识三元组（主体-谓语-客体）：
   - **自然语义关系**：根据概念间的实际关系，使用最自然、最准确的动词或动词短语作为谓词
   - **关系发现**：不局限于预设关系类型，自主发现文档中体现的各种概念关系
   - **谓词标准化**：使用简洁、准确的动词作为关系谓词，避免冗长表述
3. **学习导向**：关系应该有助于学习路径规划和概念扩展
4. **概念表述**：使用清晰、标准的概念名称，保持一致性
5. **上下文价值**：上下文应该说明为什么这两个概念相关，对学习者的意义

**关系谓词建议**：
- 优先使用动词：包含、支持、依赖、实现、扩展、替代、生成、控制、管理等
- 功能关系：用于、适用于、专门用于、主要用于等
- 结构关系：属于、组成、继承、基于等
- 时序关系：前置、后续、升级、替换等
- 让文档内容自然地引导关系的发现，不强制套用固定模式

请严格按照以下JSON格式返回结果：
{
  "triples": [
    {
      "subject": "主体概念",
      "predicate": "关系谓词",
      "object": "客体概念",
      "context": "学习相关性说明",
      "direction": "bidirectional",
      "confidence": 0.9
    }
  ]
}

文档内容${isChunk ? '片段' : ''}：
${content}

请提取有助于学习和概念理解的知识三元组，重点关注概念间的学习关联性。
注意：
- direction字段：如果是双向关系（如"A关联B"同时"B关联A"），设为"bidirectional"
- direction字段：如果是单向关系（如"A依赖B"但"B不依赖A"），设为"unidirectional"
- confidence字段：根据以下标准评估置信度（0.0-1.0）：
  * 0.9-1.0：明确的技术关系，文档中有直接、清晰的说明
  * 0.7-0.9：较为明确的关系，基于上下文推断但证据充分
  * 0.5-0.7：中等置信度，关系存在但需要一定推理
  * 0.3-0.5：较弱的关系，主要基于语义相似性
  * 0.1-0.3：非常弱的关系，仅基于概念共现`;
}

async function extractKnowledgeTriples(content: string, config: ExtractConfig, filename?: string): Promise<{
  triples: KnowledgeTriple[];
  warnings: Warning[];
  chunkCount?: number;
}> {
  const warnings: Warning[] = [];
  
  // 检查文件大小并记录警告
  if (config.warnings.enableSizeWarning && content.length > config.warnings.largeSizeThreshold) {
    const warning = createWarning(
      'large_file',
      `${config.warnings.largeSizeWarningMessage} (${content.length} 字符)`
    );
    warnings.push(warning);
    console.warn(`⚠️  ${warning.message}`);
  }

  // 检查是否需要切片处理
  const needsChunking = config.chunking?.enabled && content.length > (config.chunking.maxContextTokens * 3); // 大致估算
  
  if (needsChunking && config.chunking) {
    console.log(`🔪 文件${filename ? ` ${filename}` : ''} 需要切片处理`);
    return await extractKnowledgeTriplesWithChunking(content, config, filename);
  }

  const prompt = generateExtractionPrompt(content);

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "你是一个专业的知识图谱构建专家，专注于构建学习导向的标准知识三元组网络。" },
        { role: "user", content: prompt }
      ],
      model: "deepseek-chat",
      temperature: 0.1
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      const warning = createWarning('api_error', '模型返回空内容');
      warnings.push(warning);
      console.error('模型返回空内容');
      return { triples: [], warnings, chunkCount: 1 };
    }

    // 尝试解析JSON响应
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      const warning = createWarning('api_error', '无法从响应中提取JSON');
      warnings.push(warning);
      console.error('无法从响应中提取JSON');
      return { triples: [], warnings, chunkCount: 1 };
    }

    const result = JSON.parse(jsonMatch[0]);
    return { triples: result.triples || [], warnings, chunkCount: 1 };
  } catch (error) {
    const warning = createWarning('api_error', `调用DeepSeek API失败: ${(error as Error).message}`);
    warnings.push(warning);
    console.error('调用DeepSeek API失败:', error);
    throw error; // 重新抛出错误以便上层处理
  }
}

async function processMarkdownFile(filePath: string, index: number, total: number, config: ExtractConfig, excludedFiles: string[]): Promise<ProcessResult> {
  const filename = path.basename(filePath, '.md');
  const startTime = Date.now();
  const warnings: Warning[] = [];
  
  try {
    console.log(`[${index}/${total}] 处理文件: ${filePath}`);
    
    const originalContent = await fs.readFile(filePath, 'utf-8');
    const fileStat = await fs.stat(filePath);
    
    if (originalContent.length < 100) {
      console.log(`[${index}/${total}] 跳过内容过短的文件: ${filePath}`);
      return {
        filename,
        sourceFile: filePath,
        success: false,
        triplesCount: 0,
        warnings,
        error: '文件内容过短'
      };
    }

    // 🔧 新增：预处理内容
    const { processedContent, warnings: preprocessWarnings } = await preprocessContent(originalContent, filename, config);
    warnings.push(...preprocessWarnings);
    
    // 检查预处理后的内容长度
    if (processedContent.length < 100) {
      console.log(`[${index}/${total}] 预处理后内容过短: ${filePath}`);
      return {
        filename,
        sourceFile: filePath,
        success: false,
        triplesCount: 0,
        warnings,
        error: '预处理后内容过短'
      };
    }

    const { triples, warnings: extractWarnings, chunkCount } = await extractKnowledgeTriples(processedContent, config, filename);
    warnings.push(...extractWarnings);
    
    if (triples.length === 0) {
      console.log(`[${index}/${total}] 未能从文件提取到知识三元组: ${filePath}`);
      const warning = createWarning('content_warning', '未能提取到知识三元组', filename);
      warnings.push(warning);
      return {
        filename,
        sourceFile: filePath,
        success: false,
        triplesCount: 0,
        warnings,
        error: '未能提取到知识三元组'
      };
    }

    const processingTime = Date.now() - startTime;
    const documentTriples: DocumentKnowledgeTriples = {
      filename,
      sourceFile: filePath,
      triples,
      timestamp: new Date().toISOString(),
      warnings: config.output.includeWarnings ? warnings : undefined,
      metadata: config.output.includeMetadata ? {
        fileSize: fileStat.size,
        contentLength: processedContent.length,
        processingTimeMs: processingTime
      } : undefined
    };

    // 保存到文件
    const outputPath = path.join(TRIPLETS_DIR, `${filename}.json`);
    await fs.writeFile(outputPath, JSON.stringify(documentTriples, null, 2), 'utf-8');
    
    console.log(`[${index}/${total}] ✅ 成功提取 ${triples.length} 个知识三元组，已保存到: ${outputPath}`);
    if (warnings.length > 0) {
      console.log(`[${index}/${total}] ⚠️  生成了 ${warnings.length} 个警告`);
    }
    
    return {
      filename,
      sourceFile: filePath,
      success: true,
      triplesCount: triples.length,
      warnings,
      chunkCount: chunkCount || 1  // 使用实际的切片数量
    };
  } catch (error) {
    const processingTime = Date.now() - startTime;
    const errorWarning = createWarning('processing_error', `处理文件时发生错误: ${(error as Error).message}`, filename);
    warnings.push(errorWarning);
    
    console.error(`[${index}/${total}] ❌ 处理文件失败 ${filePath}:`, error);
    return {
      filename,
      sourceFile: filePath,
      success: false,
      triplesCount: 0,
      warnings,
      error: (error as Error).message
    };
  }
}

// 并发批处理函数 - 同时处理多个文件以提高效率
async function processBatch(
  filePaths: string[], 
  startIndex: number, 
  config: ExtractConfig, 
  excludedFiles: string[],
  progressData: ProgressData
): Promise<ProcessResult[]> {
  const batchPromises = filePaths.map(async (filePath, localIndex) => {
    const globalIndex = startIndex + localIndex;
    const filename = path.basename(filePath, '.md');
    
    try {
      return await processMarkdownFile(filePath, globalIndex + 1, progressData.totalFiles, config, excludedFiles);
    } catch (error) {
      console.error(`批次处理文件失败: ${filePath}`, error);
      
      // 创建失败的结果
      return {
        filename,
        sourceFile: filePath,
        success: false,
        triplesCount: 0,
        warnings: [createWarning('processing_error', `批次处理失败: ${(error as Error).message}`, filename)],
        error: (error as Error).message
      } as ProcessResult;
    }
  });

  // 使用 Promise.allSettled 确保即使有意外异常也能获取所有已完成的结果
  const settledResults = await Promise.allSettled(batchPromises);
  
  const results: ProcessResult[] = settledResults.map((settled, index) => {
    const filePath = filePaths[index];
    const filename = path.basename(filePath, '.md');
    
    if (settled.status === 'fulfilled') {
      return settled.value;
    } else {
      // Promise被拒绝，创建失败结果
      console.error(`批次Promise拒绝: ${filePath}`, settled.reason);
      return {
        filename,
        sourceFile: filePath,
        success: false,
        triplesCount: 0,
        warnings: [createWarning('processing_error', `Promise拒绝: ${settled.reason?.message || settled.reason}`, filename)],
        error: settled.reason?.message || String(settled.reason)
      } as ProcessResult;
    }
  });
  
  return results;
}

// 添加进度更新函数
function updateProgressWithResults(progressData: ProgressData, results: ProcessResult[], processedFiles: string[]): void {
  results.forEach((result, index) => {
    const filePath = processedFiles[index];
    const filename = result.filename;
    
    // 更新统计
    progressData.processedCount++;
    
    // 统计警告数
    if (result.warnings && result.warnings.length > 0) {
      progressData.totalWarnings += result.warnings.length;
    }
    
    // 从剩余列表中移除
    progressData.remainingFiles = progressData.remainingFiles.filter(f => f !== filePath);
    
    // 查找是否已有此文件的结果
    const existingResultIndex = progressData.results.findIndex(r => r.filename === filename);
    
    if (existingResultIndex >= 0) {
      // 更新现有结果
      progressData.results[existingResultIndex] = result;
    } else {
      // 添加新的结果
      progressData.results.push(result);
    }
    
    if (result.success) {
      // 从失败列表中移除（如果之前失败过）
      const wasInFailedList = progressData.failedFiles.includes(filePath);
      progressData.failedFiles = progressData.failedFiles.filter(f => f !== filePath);
      
      if (wasInFailedList) {
        // 重试成功：减少失败计数，增加成功计数
        progressData.failedCount = Math.max(0, progressData.failedCount - 1);
        progressData.successCount++;
      } else if (existingResultIndex < 0) {
        // 新的成功：增加成功计数
        progressData.successCount++;
      }
    } else {
      if (existingResultIndex < 0) {
        progressData.failedCount++;
      }
      // 添加到失败列表
      if (!progressData.failedFiles.includes(filePath)) {
        progressData.failedFiles.push(filePath);
      }
    }
  });
  
  // 更新完成率
  progressData.completionRate = (progressData.processedCount / progressData.totalFiles) * 100;
}

async function main() {
  console.log('开始提取虚幻引擎文档概念关系...');
  
  if (!process.env.DEEPSEEK_API_KEY) {
    console.error('错误: 请设置DEEPSEEK_API_KEY环境变量');
    process.exit(1);
  }

  // 加载配置
  const config = loadConfig();

  // 确保输出目录存在
  await fs.ensureDir(TRIPLETS_DIR);

  // 读取所有markdown文件
  const markdownFiles = await fs.readdir(DOCS_DIR);
  let mdFiles = markdownFiles.filter(file => file.endsWith('.md'));

  if (mdFiles.length === 0) {
    console.warn('⚠️  警告: 在 sources/docs 目录中没有找到任何 .md 文件');
    console.log('请先运行 npm run crawl-to-markdown 来获取文档文件');
    return;
  }

  // 过滤文件
  const excludedFiles: string[] = [];
  const filteredFiles = mdFiles.filter(file => {
    if (!shouldIncludeFile(file, config)) {
      excludedFiles.push(file);
      return false;
    }
    return true;
  });

  console.log(`📊 文件统计:`);
  console.log(`   - 总文件数: ${mdFiles.length}`);
  console.log(`   - 排除文件数: ${excludedFiles.length}`);
  console.log(`   - 待处理文件数: ${filteredFiles.length}`);
  
  if (excludedFiles.length > 0) {
    console.log(`🚫 被排除的文件:`);
    excludedFiles.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file}`);
    });
  }

  // 构建完整文件路径
  const fullFilePaths = filteredFiles.map(file => path.join(DOCS_DIR, file));

  if (TEST_MODE) {
    console.log('🧪 测试模式：只处理前3个文档文件');
    fullFilePaths.splice(3);
  }

  console.log(`找到 ${fullFilePaths.length} 个markdown文档文件${TEST_MODE ? ' (测试模式)' : ''}`);

  // 读取现有进度
  const existingProgress = loadProgress();
  
  // 分析进度并决定执行策略
  const { shouldContinue, filesToProcess, message } = analyzeProgress(existingProgress, fullFilePaths);
  
  console.log(`🎯 执行策略: ${message}`);
  
  if (!shouldContinue) {
    console.log("🏁 任务结束");
    return;
  }

  // 初始化或更新进度数据
  let progressData: ProgressData;
  let isRetryingFailedFiles = false; // 标记是否在重试失败文件
  let actualFilesToProcess: string[]; // 实际要处理的文件列表
  
  if (existingProgress && existingProgress.status !== 'completed') {
    // 恢复现有进度 - 处理剩余文件
    progressData = existingProgress;
    progressData.status = 'running';
    progressData.remainingFiles = filesToProcess;
    progressData.excludedCount = excludedFiles.length;
    progressData.excludedFiles = excludedFiles;
    actualFilesToProcess = filesToProcess;
  } else if (existingProgress && existingProgress.status === 'completed' && message.includes('重试')) {
    // 重试失败文件 - 关键修复：把失败文件移到剩余文件中
    progressData = existingProgress;
    progressData.status = 'running'; // 重置为running状态
    isRetryingFailedFiles = true;
    
    const failedFilesCount = progressData.failedFiles.length;
    
    // 🔧 修复：把失败文件移到剩余文件列表中，形成正确的处理循环
    progressData.remainingFiles = [...progressData.failedFiles]; 
    progressData.failedFiles = []; // 清空失败列表
    
    // 📊 重要修复：更新统计数据
    progressData.failedCount = 0; // 失败数量重置为0，因为所有失败文件都重新进入队列
    progressData.processedCount -= failedFilesCount; // 减少已处理计数，因为这些文件要重新处理
    progressData.completionRate = (progressData.processedCount / progressData.totalFiles) * 100; // 重新计算完成率
    
    // 移除失败文件的处理结果（因为要重新处理）
    progressData.results = progressData.results.filter(result => result.success);
    
    actualFilesToProcess = progressData.remainingFiles; // 实际处理剩余文件
    
    console.log(`🔄 重试模式：将 ${actualFilesToProcess.length} 个失败文件移到剩余文件队列中`);
    console.log(`📊 统计更新：失败数量 ${failedFilesCount} → 0，完成率重新计算为 ${progressData.completionRate.toFixed(1)}%`);
  } else {
    // 创建新的进度数据
    progressData = createInitialProgress(fullFilePaths, excludedFiles);
    progressData.remainingFiles = filesToProcess;
    actualFilesToProcess = filesToProcess;
  }

  console.log(`📊 将处理 ${actualFilesToProcess.length} 个文件`);

  // 保存初始进度
  saveProgress(progressData);

  // 并发批处理文件
  const concurrency = config.processing.concurrency;
  const totalBatches = Math.ceil(actualFilesToProcess.length / concurrency);
  
  console.log(`🚀 开始并发处理，并发数: ${concurrency}，总批次: ${totalBatches}`);
  console.log(`💡 提示: 可在配置文件中调整 processing.concurrency 参数来控制并发数量`);

  for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
    const startIndex = batchIndex * concurrency;
    const endIndex = Math.min(startIndex + concurrency, actualFilesToProcess.length);
    const batchFiles = actualFilesToProcess.slice(startIndex, endIndex);
    
    console.log(`\n📦 处理批次 ${batchIndex + 1}/${totalBatches} (文件 ${startIndex + 1}-${endIndex})`);
    console.log(`   本批次文件: ${batchFiles.map(f => path.basename(f, '.md')).join(', ')}`);
    
    try {
      // 并发处理本批次的文件
      const batchResults = await processBatch(batchFiles, startIndex, config, excludedFiles, progressData);
      
      // 更新进度数据
      updateProgressWithResults(progressData, batchResults, batchFiles);
      
      // 保存进度
      saveProgress(progressData);
      
      // 显示批次结果
      const successCount = batchResults.filter(r => r.success).length;
      const failedCount = batchResults.filter(r => !r.success).length;
      console.log(`   ✅ 成功: ${successCount}, ❌ 失败: ${failedCount}`);
      
      // 显示失败文件的详细信息
      if (failedCount > 0) {
        const failedFiles = batchResults.filter(r => !r.success);
        console.log(`   📄 失败文件:`);
        failedFiles.forEach(result => {
          console.log(`      • ${result.filename}: ${result.error}`);
        });
      }
      
      // 批次间延迟（避免API限流）
      if (!TEST_MODE && batchIndex < totalBatches - 1) {
        const delay = config.processing.batchDelayMs;
        console.log(`   ⏳ 等待 ${delay}ms 避免API限流...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
    } catch (error) {
      // 这种情况现在应该很少发生，因为 processBatch 使用了 Promise.allSettled
      console.error(`❌ 批次 ${batchIndex + 1} 意外错误:`, error);
      
      // 为本批次所有文件创建失败结果（作为最后的保障）
      const batchResults: ProcessResult[] = batchFiles.map(filePath => {
        const filename = path.basename(filePath, '.md');
        return {
          filename,
          sourceFile: filePath,
          success: false,
          triplesCount: 0,
          warnings: [createWarning('processing_error', `批次意外错误: ${(error as Error).message}`, filename)],
          error: (error as Error).message
        };
      });
      
      // 使用统一的结果更新逻辑
      updateProgressWithResults(progressData, batchResults, batchFiles);
      saveProgress(progressData);
      
      continue;
    }
  }

  // 标记任务完成状态
  if (isRetryingFailedFiles) {
    // 如果是重试失败文件，保持completed状态
    progressData.status = 'completed';
  } else {
    // 如果是处理剩余文件，标记为完成
    progressData.status = 'completed';
    progressData.endTime = new Date().toISOString();
  }
  saveProgress(progressData);

  if (isRetryingFailedFiles) {
    console.log('\n🔄 失败文件重试完成！');
  } else {
    console.log('\n🎉 概念关系提取完成！');
  }
  console.log(`📁 输出目录: ${TRIPLETS_DIR}`);
  console.log(`📊 最终统计:`);
  console.log(`   - 总文件数: ${progressData.totalFiles}`);
  console.log(`   - 成功处理: ${progressData.successCount}`);
  console.log(`   - 处理失败: ${progressData.failedCount}`);
  if (progressData.excludedCount > 0) {
    console.log(`   - 排除文件: ${progressData.excludedCount}`);
  }
  console.log(`   - 成功率: ${((progressData.successCount / progressData.totalFiles) * 100).toFixed(1)}%`);
  
  const totalRelations = progressData.results
    .filter(r => r.success)
    .reduce((sum, r) => sum + r.triplesCount, 0);
  console.log(`   - 总知识三元组数: ${totalRelations}`);
  
  if (progressData.totalWarnings > 0) {
    console.log(`   - 总警告数: ${progressData.totalWarnings}`);
  }

  const failedResults = progressData.results.filter(r => !r.success);
  if (failedResults.length > 0) {
    console.log(`\n❌ 失败的文件 (${failedResults.length}个):`);
    failedResults.slice(0, 10).forEach((result, index) => {
      console.log(`${index + 1}. ${result.filename}`);
      console.log(`   错误: ${result.error}`);
    });
    if (failedResults.length > 10) {
      console.log(`   ... 还有 ${failedResults.length - 10} 个失败的文件`);
    }
    console.log(`\n💡 提示: 再次运行脚本将自动重试失败的文件`);
  }
  
  // 显示警告统计
  if (progressData.totalWarnings > 0) {
    const warningsByType: { [key: string]: number } = {};
    progressData.results.forEach(result => {
      if (result.warnings) {
        result.warnings.forEach(warning => {
          warningsByType[warning.type] = (warningsByType[warning.type] || 0) + 1;
        });
      }
    });
    
    console.log(`\n⚠️  警告统计:`);
    Object.entries(warningsByType).forEach(([type, count]) => {
      console.log(`   - ${type}: ${count} 个`);
    });
  }
}

// 如果直接运行此脚本则执行main函数  
main().catch((error) => {
  console.error('❌ 脚本执行失败:', error);
  
  // 更新进度状态为失败
  try {
    const progressData = loadProgress();
    if (progressData) {
      progressData.status = 'interrupted';
      progressData.endTime = new Date().toISOString();
      saveProgress(progressData);
    }
  } catch (saveError) {
    console.error("❌ 保存失败状态时出错:", (saveError as Error).message);
  }
  
  process.exit(1);
}); 