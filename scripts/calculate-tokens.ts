import fs from "fs-extra";
import path from "path";
import { get_encoding } from "tiktoken";

// 支持的编码类型
type SupportedEncoding = "o200k_base" | "cl100k_base" | "p50k_base" | "r50k_base";

interface TokenCalculationResult {
  filePath: string;
  fileName: string;
  fileSize: number;
  contentLength: number;
  tokenCount: number;
  encoding: string;
  avgCharsPerToken: number;
  estimatedApiCost?: number; // 预估API成本（如果提供价格）
}

/**
 * 计算文本内容的 token 数量
 * @param content 文本内容
 * @param encoding 编码类型，默认为 o200k_base (适用于 GPT-4o 和 DeepSeek)
 * @returns token 数量
 */
export function calculateTokens(content: string, encoding: SupportedEncoding = "o200k_base"): number {
  try {
    const encoder = get_encoding(encoding);
    const tokens = encoder.encode(content);
    const tokenCount = tokens.length;
    encoder.free(); // 释放编码器资源
    return tokenCount;
  } catch (error) {
    throw new Error(`Token 计算失败: ${(error as Error).message}`);
  }
}

/**
 * 计算文件的 token 数量和相关统计信息
 * @param filePath 文件路径
 * @param encoding 编码类型
 * @returns 详细的计算结果
 */
export async function calculateFileTokens(
  filePath: string, 
  encoding: SupportedEncoding = "o200k_base"
): Promise<TokenCalculationResult> {
  try {
    // 检查文件是否存在
    if (!await fs.pathExists(filePath)) {
      throw new Error(`文件不存在: ${filePath}`);
    }

    // 获取文件信息
    const fileStat = await fs.stat(filePath);
    const fileName = path.basename(filePath);
    
    // 读取文件内容
    const content = await fs.readFile(filePath, 'utf-8');
    
    // 计算 token 数量
    const tokenCount = calculateTokens(content, encoding);
    
    // 计算平均每个 token 的字符数
    const avgCharsPerToken = content.length > 0 ? content.length / tokenCount : 0;
    
    return {
      filePath,
      fileName,
      fileSize: fileStat.size,
      contentLength: content.length,
      tokenCount,
      encoding,
      avgCharsPerToken,
    };
  } catch (error) {
    throw new Error(`文件 token 计算失败: ${(error as Error).message}`);
  }
}

/**
 * 格式化输出计算结果
 * @param result 计算结果
 * @param verbose 是否显示详细信息
 */
function formatOutput(result: TokenCalculationResult, verbose: boolean = false): void {
  console.log(`\n📊 Token 计算结果:`);
  console.log(`   📁 文件: ${result.fileName}`);
  console.log(`   📍 路径: ${result.filePath}`);
  
  if (verbose) {
    console.log(`   📦 文件大小: ${formatBytes(result.fileSize)}`);
    console.log(`   📝 内容长度: ${result.contentLength.toLocaleString()} 字符`);
    console.log(`   🔤 编码类型: ${result.encoding}`);
    console.log(`   📐 字符/Token比: ${result.avgCharsPerToken.toFixed(2)}`);
  }
  
  console.log(`   🎯 Token 数量: ${result.tokenCount.toLocaleString()}`);
  
  // 提供一些有用的参考信息
  if (verbose) {
    console.log(`\n💡 参考信息:`);
    
    // DeepSeek API 限制参考
    if (result.tokenCount > 65536) {
      console.log(`   ⚠️  超出 DeepSeek 上下文限制 (65,536 tokens)`);
      const chunksNeeded = Math.ceil(result.tokenCount / 60000);
      console.log(`   🔪 建议切片数量: ${chunksNeeded} 个 (每片约 60k tokens)`);
    } else if (result.tokenCount > 32768) {
      console.log(`   ⚠️  接近 DeepSeek 上下文限制，建议考虑切片`);
    } else {
      console.log(`   ✅ 在 DeepSeek 上下文限制内`);
    }
    
    // 估算处理时间（基于经验）
    const estimatedSeconds = Math.ceil(result.tokenCount / 1000) * 2; // 大致估算
    console.log(`   ⏱️  预估处理时间: ~${estimatedSeconds} 秒`);
  }
}

/**
 * 格式化字节大小
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 显示使用帮助
 */
function showHelp(): void {
  console.log(`
🔢 Token 计算工具

用法:
  node dist/scripts/calculate-tokens.js <文件路径> [选项]

参数:
  <文件路径>          要计算 token 的文件路径

选项:
  -e, --encoding      编码类型 (默认: o200k_base)
                      支持: o200k_base, cl100k_base, p50k_base, r50k_base
  -v, --verbose       显示详细信息
  -h, --help          显示此帮助信息

编码说明:
  o200k_base         GPT-4o, DeepSeek (推荐)
  cl100k_base        GPT-4, GPT-3.5-turbo
  p50k_base          GPT-3, text-davinci-003
  r50k_base          GPT-3, text-davinci-002

示例:
  node dist/scripts/calculate-tokens.js ./sources/docs/my-doc.md
  node dist/scripts/calculate-tokens.js ./sources/docs/my-doc.md -v
  node dist/scripts/calculate-tokens.js ./sources/docs/my-doc.md -e cl100k_base
  npm run build && node dist/scripts/calculate-tokens.js ./sources/docs/my-doc.md -v
`);
}

/**
 * 解析命令行参数
 */
function parseArgs(args: string[]): {
  filePath?: string;
  encoding: SupportedEncoding;
  verbose: boolean;
  help: boolean;
} {
  const result = {
    filePath: undefined as string | undefined,
    encoding: "o200k_base" as SupportedEncoding,
    verbose: false,
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '-h' || arg === '--help') {
      result.help = true;
    } else if (arg === '-v' || arg === '--verbose') {
      result.verbose = true;
    } else if (arg === '-e' || arg === '--encoding') {
      const nextArg = args[i + 1];
      if (nextArg && ['o200k_base', 'cl100k_base', 'p50k_base', 'r50k_base'].includes(nextArg)) {
        result.encoding = nextArg as SupportedEncoding;
        i++; // 跳过下一个参数
      } else {
        throw new Error(`无效的编码类型: ${nextArg}`);
      }
    } else if (!arg.startsWith('-')) {
      // 如果不是选项参数，则认为是文件路径
      if (!result.filePath) {
        result.filePath = arg;
      }
    }
  }

  return result;
}

/**
 * 主函数 - 命令行入口
 */
async function main(): Promise<void> {
  try {
    const args = process.argv.slice(2); // 去掉 node 和脚本名称
    
    if (args.length === 0) {
      showHelp();
      return;
    }

    const options = parseArgs(args);
    
    if (options.help) {
      showHelp();
      return;
    }

    if (!options.filePath) {
      console.error('❌ 错误: 请提供文件路径');
      console.log('使用 -h 或 --help 查看使用说明');
      process.exit(1);
    }

    console.log('🔢 开始计算 Token 数量...');
    
    const result = await calculateFileTokens(options.filePath, options.encoding);
    formatOutput(result, options.verbose);

  } catch (error) {
    console.error('❌ 计算失败:', (error as Error).message);
    process.exit(1);
  }
}

// 如果是直接运行此脚本，则执行主函数
if (process.argv[1] && process.argv[1].includes('calculate-tokens')) {
  main();
} 