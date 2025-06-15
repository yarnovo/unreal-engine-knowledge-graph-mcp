import OpenAI from "openai";
import fs from "fs-extra";
import path from "path";
import "dotenv/config";

interface ConceptRelation {
  conceptA: string;        // 起始概念
  relation: string;        // 关系类型
  conceptB: string;        // 目标概念
  context?: string;        // 关系上下文说明
  direction?: 'bidirectional' | 'unidirectional'; // 关系方向性
}

// 添加警告接口
interface Warning {
  type: 'large_file' | 'processing_error' | 'api_error' | 'content_warning';
  message: string;
  filename?: string;
  details?: any;
  timestamp: string;
}

interface DocumentConceptRelations {
  filename: string;
  sourceFile: string;
  relations: ConceptRelation[];
  timestamp: string;
  warnings?: Warning[];  // 添加警告字段
  excludedFiles?: string[]; // 添加被排除的文件列表
  metadata?: {
    fileSize: number;
    contentLength: number;
    processingTimeMs: number;
  };
}

// 添加配置接口
interface ExtractConfig {
  version: string;
  description: string;
  excludeFiles: string[];
  excludePatterns: string[];
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
  };
  output: {
    includeWarnings: boolean;
    includeMetadata: boolean;
    timestampFormat: string;
  };
}

// 添加处理结果接口
interface ProcessResult {
  filename: string;
  sourceFile: string;
  success: boolean;
  relationsCount: number;
  warnings?: Warning[];  // 添加警告字段
  error?: string;
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
    warnings: {
      largeSizeThreshold: 8000,
      largeSizeWarningMessage: "文档内容较长，可能增加API调用成本",
      enableSizeWarning: true,
      recordWarningsInOutput: true
    },
    processing: {
      delayBetweenRequests: 1000,
      maxRetries: 3,
      timeoutMs: 30000
    },
    output: {
      includeWarnings: true,
      includeMetadata: true,
      timestampFormat: "ISO"
    }
  };
}

// 添加文件过滤函数
function shouldExcludeFile(filename: string, config: ExtractConfig): boolean {
  // 检查完全匹配的文件名
  if (config.excludeFiles.includes(filename)) {
    return true;
  }
  
  // 检查模式匹配
  for (const pattern of config.excludePatterns) {
    const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
    if (regex.test(filename)) {
      return true;
    }
  }
  
  return false;
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

  // 如果有失败的文件需要重试（优先处理失败的文件）
  if (progressData.failedFiles.length > 0) {
    return {
      shouldContinue: true,
      filesToProcess: progressData.failedFiles,
      message: `🔄 发现 ${progressData.failedFiles.length} 个失败的文件，开始重试`
    };
  }

  // 如果有剩余文件需要处理
  if (progressData.remainingFiles.length > 0) {
    return {
      shouldContinue: true,
      filesToProcess: progressData.remainingFiles,
      message: `⏭️ 从上次进度恢复，剩余 ${progressData.remainingFiles.length} 个文件`
    };
  }

  // 如果已完成所有文件（包括成功和失败的）
  if (progressData.status === 'completed' && progressData.processedCount === progressData.totalFiles) {
    return {
      shouldContinue: false,
      filesToProcess: [],
      message: "✅ 任务已完成，无需继续执行"
    };
  }

  // 所有文件都已处理完成
  return {
    shouldContinue: false,
    filesToProcess: [],
    message: "✅ 所有文件都已处理完成"
  };
}

async function extractConceptRelations(content: string, config: ExtractConfig): Promise<{
  relations: ConceptRelation[];
  warnings: Warning[];
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

  const prompt = `
你是一个专业的知识图谱构建专家。请分析以下虚幻引擎文档内容，提取概念与概念之间的关系，构建学习导向的知识图谱。

核心目标：帮助学习者通过一个概念发现相关联的其他概念，形成概念关系网络。

请遵循以下原则：
1. **概念识别**：识别文档中的核心技术概念、功能模块、系统组件、开发概念等
2. **概念关系**：重点提取概念与概念之间的学习相关性，包括：
   - 依赖关系：概念A需要先理解概念B
   - 关联关系：概念A与概念B在使用中经常配合
   - 层级关系：概念A是概念B的上级/下级概念
   - 替代关系：概念A可以替代概念B或者是概念B的升级版
   - 应用关系：概念A在概念B中被应用
3. **学习导向**：关系应该有助于学习路径规划和概念扩展
4. **概念表述**：使用清晰、标准的概念名称，保持一致性
5. **上下文价值**：上下文应该说明为什么这两个概念相关，对学习者的意义

请严格按照以下JSON格式返回结果：
{
  "relations": [
    {
      "conceptA": "起始概念",
      "relation": "关系类型",
      "conceptB": "目标概念",
      "context": "学习相关性说明",
      "direction": "bidirectional"
    }
  ]
}

文档内容：
${content}

请提取有助于学习和概念理解的关系，重点关注概念间的学习关联性。
注意：
- direction字段：如果是双向关系（如"A关联B"同时"B关联A"），设为"bidirectional"
- direction字段：如果是单向关系（如"A依赖B"但"B不依赖A"），设为"unidirectional"：
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "你是一个专业的知识图谱构建专家，专注于构建学习导向的概念关系网络。" },
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
      return { relations: [], warnings };
    }

    // 尝试解析JSON响应
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      const warning = createWarning('api_error', '无法从响应中提取JSON');
      warnings.push(warning);
      console.error('无法从响应中提取JSON');
      return { relations: [], warnings };
    }

    const result = JSON.parse(jsonMatch[0]);
    return { relations: result.relations || [], warnings };
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
    
    const content = await fs.readFile(filePath, 'utf-8');
    const fileStat = await fs.stat(filePath);
    
    if (content.length < 100) {
      console.log(`[${index}/${total}] 跳过内容过短的文件: ${filePath}`);
      return {
        filename,
        sourceFile: filePath,
        success: false,
        relationsCount: 0,
        warnings,
        error: '文件内容过短'
      };
    }

    const { relations, warnings: extractWarnings } = await extractConceptRelations(content, config);
    warnings.push(...extractWarnings);
    
    if (relations.length === 0) {
      console.log(`[${index}/${total}] 未能从文件提取到概念关系: ${filePath}`);
      const warning = createWarning('content_warning', '未能提取到概念关系', filename);
      warnings.push(warning);
      return {
        filename,
        sourceFile: filePath,
        success: false,
        relationsCount: 0,
        warnings,
        error: '未能提取到概念关系'
      };
    }

    const processingTime = Date.now() - startTime;
    const documentRelations: DocumentConceptRelations = {
      filename,
      sourceFile: filePath,
      relations,
      timestamp: new Date().toISOString(),
      warnings: config.output.includeWarnings ? warnings : undefined,
      excludedFiles: excludedFiles.length > 0 ? excludedFiles : undefined,
      metadata: config.output.includeMetadata ? {
        fileSize: fileStat.size,
        contentLength: content.length,
        processingTimeMs: processingTime
      } : undefined
    };

    // 保存到文件
    const outputPath = path.join(TRIPLETS_DIR, `${filename}.json`);
    await fs.writeFile(outputPath, JSON.stringify(documentRelations, null, 2), 'utf-8');
    
    console.log(`[${index}/${total}] ✅ 成功提取 ${relations.length} 个概念关系，已保存到: ${outputPath}`);
    if (warnings.length > 0) {
      console.log(`[${index}/${total}] ⚠️  生成了 ${warnings.length} 个警告`);
    }
    
    return {
      filename,
      sourceFile: filePath,
      success: true,
      relationsCount: relations.length,
      warnings
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
      relationsCount: 0,
      warnings,
      error: (error as Error).message
    };
  }
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
    if (shouldExcludeFile(file, config)) {
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

  console.log(`📊 将处理 ${filesToProcess.length} 个文件`);

  // 初始化或更新进度数据
  let progressData: ProgressData;
  if (existingProgress && existingProgress.status !== 'completed') {
    // 恢复现有进度
    progressData = existingProgress;
    progressData.status = 'running';
    progressData.remainingFiles = filesToProcess;
    progressData.excludedCount = excludedFiles.length;
    progressData.excludedFiles = excludedFiles;
    if (message.includes('重试')) {
      progressData.failedFiles = []; // 清空失败列表，准备重试
    }
  } else {
    // 创建新的进度数据
    progressData = createInitialProgress(fullFilePaths, excludedFiles);
    progressData.remainingFiles = filesToProcess;
  }

  // 保存初始进度
  saveProgress(progressData);

  // 处理每个文件
  for (let i = 0; i < filesToProcess.length; i++) {
    const filePath = filesToProcess[i];
    const filename = path.basename(filePath, '.md');
    
    try {
      const result = await processMarkdownFile(filePath, i + 1, filesToProcess.length, config, excludedFiles);
      
      // 更新进度数据
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
      
      // 实时保存进度
      saveProgress(progressData);
      
      // 添加延迟避免API限流
      if (!TEST_MODE && i < filesToProcess.length - 1) {
        const delay = config.processing.delayBetweenRequests;
        console.log(`⏳ 等待 ${delay}ms 避免API限流...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error(`处理文件失败: ${filePath}`, error);
      
      // 记录失败结果
      const result: ProcessResult = {
        filename,
        sourceFile: filePath,
        success: false,
        relationsCount: 0,
        warnings: [createWarning('processing_error', `处理失败: ${(error as Error).message}`, filename)],
        error: (error as Error).message
      };
      
      progressData.processedCount++;
      progressData.failedCount++;
      progressData.totalWarnings += result.warnings?.length || 0;
      progressData.remainingFiles = progressData.remainingFiles.filter(f => f !== filePath);
      
      if (!progressData.failedFiles.includes(filePath)) {
        progressData.failedFiles.push(filePath);
      }
      
      const existingResultIndex = progressData.results.findIndex(r => r.filename === filename);
      if (existingResultIndex >= 0) {
        progressData.results[existingResultIndex] = result;
      } else {
        progressData.results.push(result);
      }
      
      saveProgress(progressData);
      continue;
    }
  }

  // 标记任务完成
  progressData.status = 'completed';
  progressData.endTime = new Date().toISOString();
  saveProgress(progressData);

  console.log('\n🎉 概念关系提取完成！');
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
    .reduce((sum, r) => sum + r.relationsCount, 0);
  console.log(`   - 总概念关系数: ${totalRelations}`);
  
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