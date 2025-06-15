import { chromium, Browser, BrowserContext, Page } from "playwright";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import TurndownService from "turndown";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface LinkInfo {
  navTitle: string;
  link: string;
  pageTitle?: string;
  pageDescription?: string;
}

interface EnhancedListData {
  total: number;
  generated: string;
  stats: {
    totalLinks: number;
    withPageTitle: number;
    withPageDescription: number;
    completionRate: {
      pageTitle: string;
      pageDescription: string;
    };
  };
  links: LinkInfo[];
}

interface CrawlResult {
  url: string;
  success: boolean;
  filename: string;
  error?: string;
}

interface BrowserFingerprint {
  userAgent: string;
  viewport: { width: number; height: number };
  locale: string;
  timezoneId: string;
}

// 进度文件数据结构
interface ProgressData {
  status: 'running' | 'completed' | 'failed' | 'interrupted';
  startTime: string;
  lastUpdateTime: string;
  endTime?: string;
  totalLinks: number;
  processedCount: number;
  successCount: number;
  failedCount: number;
  currentBatch: number;
  totalBatches: number;
  results: CrawlResult[];
  completionRate: number;
  remainingUrls: string[]; // 剩余未处理的URLs
  failedUrls: string[]; // 失败需要重试的URLs
}

// 随机延迟函数
function randomDelay(min: number = 1000, max: number = 3000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成随机浏览器标识
function generateRandomBrowserFingerprint(): BrowserFingerprint {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  ];

  const viewports = [
    { width: 1366, height: 768 },
    { width: 1920, height: 1080 },
    { width: 1440, height: 900 },
    { width: 1536, height: 864 },
    { width: 1280, height: 720 },
  ];

  const locales = ["zh-CN", "en-US", "zh-TW"];
  const timezones = ["Asia/Shanghai", "Asia/Taipei", "Asia/Hong_Kong"];

  return {
    userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
    viewport: viewports[Math.floor(Math.random() * viewports.length)],
    locale: locales[Math.floor(Math.random() * locales.length)],
    timezoneId: timezones[Math.floor(Math.random() * timezones.length)],
  };
}

// 模拟人类鼠标移动
async function simulateHumanBehavior(page: Page): Promise<void> {
  try {
    const viewport = page.viewportSize();
    if (viewport) {
      const x = Math.floor(Math.random() * viewport.width);
      const y = Math.floor(Math.random() * viewport.height);

      await page.mouse.move(x, y, {
        steps: Math.floor(Math.random() * 10) + 5,
      });

      if (Math.random() > 0.5) {
        await page.mouse.wheel(0, Math.floor(Math.random() * 500) + 100);
        await new Promise((resolve) =>
          setTimeout(resolve, randomDelay(500, 1500))
        );
      }
    }

    await new Promise((resolve) => setTimeout(resolve, randomDelay(500, 2000)));
  } catch (error) {
    console.log(`   🤖 模拟人类行为时出错: ${(error as Error).message}`);
  }
}

// 将URL转换为合法的文件名
function urlToFilename(url: string): string {
  const urlObj = new URL(url);
  let filename = urlObj.pathname;

  if (!filename || filename === "/") {
    filename = "/index";
  }

  filename = filename
    .replace(/[<>:"/\\|?*]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/\.+/g, ".")
    .replace(/^\/+/, "")
    .replace(/\/+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

  if (!filename) {
    filename = "page";
  }

  if (filename.length > 200) {
    filename = filename.substring(0, 200);
  }

  return filename + ".md";
}

// 读取进度文件
function loadProgress(progressFilePath: string): ProgressData | null {
  try {
    if (!existsSync(progressFilePath)) {
      return null;
    }
    
    const content = readFileSync(progressFilePath, "utf-8");
    const progressData: ProgressData = JSON.parse(content);
    
    console.log("📄 发现已存在的进度文件");
    console.log(`   状态: ${progressData.status}`);
    console.log(`   开始时间: ${progressData.startTime}`);
    console.log(`   最后更新: ${progressData.lastUpdateTime}`);
    console.log(`   进度: ${progressData.processedCount}/${progressData.totalLinks} (${progressData.completionRate.toFixed(1)}%)`);
    console.log(`   成功: ${progressData.successCount}, 失败: ${progressData.failedCount}`);
    console.log(`   剩余链接: ${progressData.remainingUrls.length}`);
    console.log(`   失败重试: ${progressData.failedUrls.length}`);
    
    return progressData;
  } catch (error) {
    console.error("❌ 读取进度文件失败:", (error as Error).message);
    return null;
  }
}

// 保存进度文件
function saveProgress(progressFilePath: string, progressData: ProgressData): void {
  try {
    progressData.lastUpdateTime = new Date().toISOString();
    progressData.completionRate = progressData.totalLinks > 0 
      ? (progressData.processedCount / progressData.totalLinks) * 100 
      : 0;
    
    writeFileSync(progressFilePath, JSON.stringify(progressData, null, 2), "utf-8");
    console.log(`💾 进度已保存: ${progressData.processedCount}/${progressData.totalLinks} (${progressData.completionRate.toFixed(1)}%)`);
  } catch (error) {
    console.error("❌ 保存进度文件失败:", (error as Error).message);
  }
}

// 创建初始进度数据
function createInitialProgress(links: LinkInfo[], batchSize: number): ProgressData {
  return {
    status: 'running',
    startTime: new Date().toISOString(),
    lastUpdateTime: new Date().toISOString(),
    totalLinks: links.length,
    processedCount: 0,
    successCount: 0,
    failedCount: 0,
    currentBatch: 0,
    totalBatches: Math.ceil(links.length / batchSize),
    results: [],
    completionRate: 0,
    remainingUrls: links.map(link => link.link),
    failedUrls: []
  };
}

// 分析进度并决定执行策略
function analyzeProgress(progressData: ProgressData | null, links: LinkInfo[]): {
  shouldContinue: boolean;
  linksToProcess: LinkInfo[];
  startBatch: number;
  message: string;
} {
  if (!progressData) {
    return {
      shouldContinue: true,
      linksToProcess: links,
      startBatch: 0,
      message: "🚀 开始全新的爬取任务"
    };
  }

  // 如果已完成
  if (progressData.status === 'completed' && progressData.processedCount === progressData.totalLinks) {
    return {
      shouldContinue: false,
      linksToProcess: [],
      startBatch: 0,
      message: "✅ 任务已完成，无需继续执行"
    };
  }

  // 如果有失败的链接需要重试
  if (progressData.failedUrls.length > 0) {
    const failedLinks = links.filter(link => progressData.failedUrls.includes(link.link));
    return {
      shouldContinue: true,
      linksToProcess: failedLinks,
      startBatch: 0,
      message: `🔄 发现 ${failedLinks.length} 个失败的链接，开始重试`
    };
  }

  // 如果有剩余链接需要处理
  if (progressData.remainingUrls.length > 0) {
    const remainingLinks = links.filter(link => progressData.remainingUrls.includes(link.link));
    return {
      shouldContinue: true,
      linksToProcess: remainingLinks,
      startBatch: progressData.currentBatch,
      message: `⏭️ 从上次进度恢复，剩余 ${remainingLinks.length} 个链接`
    };
  }

  // 所有链接都已处理完成
  return {
    shouldContinue: false,
    linksToProcess: [],
    startBatch: 0,
    message: "✅ 所有链接都已处理完成"
  };
}

// 处理单个页面的函数
async function processSinglePage(
  page: Page,
  linkInfo: LinkInfo,
  index: number,
  total: number,
  turndownService: TurndownService,
  outputDir: string
): Promise<CrawlResult> {
  const url = linkInfo.link;
  const filename = urlToFilename(url);

  try {
    console.log(`   [${index}/${total}] 🔗 处理: ${linkInfo.navTitle}`);
    console.log(`   链接: ${url}`);
    console.log(`   文件名: ${filename}`);

    const thinkingDelay = randomDelay(800, 2000);
    console.log(`   [${index}] 🤔 模拟用户思考 ${thinkingDelay}ms...`);
    await new Promise((resolve) => setTimeout(resolve, thinkingDelay));

    console.log(`   [${index}] 📄 正在加载页面...`);
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    console.log(`   [${index}] 📊 响应状态: ${response?.status()}`);

    if (!response || !response.ok()) {
      throw new Error(`HTTP ${response?.status()}: ${response?.statusText()}`);
    }

    console.log(`   [${index}] ⏳ 等待页面渲染并模拟用户行为...`);
    await new Promise((resolve) =>
      setTimeout(resolve, randomDelay(1500, 3000))
    );

    await simulateHumanBehavior(page);

    console.log(`   [${index}] 🔍 提取文档内容...`);
    const documentHTML = await page.evaluate(() => {
      const documentElement = document.querySelector("document");
      if (documentElement) {
        return documentElement.innerHTML;
      }

      const alternatives = [
        "main",
        ".main-content",
        ".content",
        ".document",
        ".doc-content",
        "#content",
        "article",
      ];

      for (const selector of alternatives) {
        const element = document.querySelector(selector);
        if (element) {
          return element.innerHTML;
        }
      }

      console.warn("未找到文档内容元素，使用body内容");
      return document.body.innerHTML;
    });

    if (!documentHTML) {
      throw new Error("无法提取页面HTML内容");
    }

    console.log(`   [${index}] 🔄 转换HTML为Markdown...`);
    const markdown = turndownService.turndown(documentHTML);

    const pageHeader = `# ${linkInfo.pageTitle || linkInfo.navTitle}

> 原文链接: ${url}
> 
> 生成时间: ${new Date().toISOString()}

---

`;

    const finalMarkdown = pageHeader + markdown;

    const filePath = path.join(outputDir, filename);
    console.log(`   [${index}] 💾 保存文件: ${filePath}`);
    writeFileSync(filePath, finalMarkdown, "utf-8");

    const readingDelay = randomDelay(1000, 3000);
    console.log(`   [${index}] 📖 模拟用户阅读 ${readingDelay}ms...`);
    await new Promise((resolve) => setTimeout(resolve, readingDelay));

    console.log(`   [${index}] ✅ 成功处理并保存文件`);

    return {
      url,
      success: true,
      filename,
    };
  } catch (error) {
    console.log(`   [${index}] ❌ 处理失败: ${(error as Error).message}`);

    return {
      url,
      success: false,
      filename,
      error: (error as Error).message,
    };
  }
}

async function crawlToMarkdown(): Promise<void> {
  let browser: Browser | null = null;
  const BATCH_SIZE = 10;
  const TEST_MODE = process.env.TEST_MODE === "true";

  try {
    console.log("📋 读取增强链接列表...");
    
    // 使用 createRequire 从 npm 包中读取 JSON 文件
    const require = createRequire(import.meta.url);
    const enhancedList = require("unreal-engine-docs-mcp/sources/enhanced-list.json");
    
    const enhancedData: EnhancedListData = enhancedList;
    let allLinks = enhancedData.links || [];

    if (TEST_MODE) {
      console.log("🧪 测试模式：只处理前5个链接");
      allLinks = allLinks.slice(0, 5);
    }

    // 设置进度文件路径
    const sourcesDir = path.join(__dirname, "..", "..", "sources");
    const progressFilePath = path.join(sourcesDir, "docs.result.json");
    
    console.log(`📁 进度文件路径: ${progressFilePath}`);

    // 读取现有进度
    const existingProgress = loadProgress(progressFilePath);
    
    // 分析进度并决定执行策略
    const { shouldContinue, linksToProcess, startBatch, message } = analyzeProgress(existingProgress, allLinks);
    
    console.log(`🎯 执行策略: ${message}`);
    
    if (!shouldContinue) {
      console.log("🏁 任务结束");
      return;
    }

    console.log(`📊 将处理 ${linksToProcess.length} 个链接`);
    console.log(`🔄 批量处理模式: 每批同时处理 ${BATCH_SIZE} 个页面`);

    const outputDir = path.join(__dirname, "..", "..", "sources", "docs");
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // 确保 sources 目录存在
    if (!existsSync(sourcesDir)) {
      mkdirSync(sourcesDir, { recursive: true });
    }

    const turndownService = new TurndownService({
      headingStyle: "atx",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      emDelimiter: "*",
      strongDelimiter: "**",
    });

    turndownService.addRule("removeScripts", {
      filter: ["script", "style", "nav", "aside", "footer", "header"],
      replacement: function () {
        return "";
      },
    });

    // 初始化或更新进度数据
    let progressData: ProgressData;
    if (existingProgress && existingProgress.status !== 'completed') {
      // 恢复现有进度
      progressData = existingProgress;
      progressData.status = 'running';
      progressData.remainingUrls = linksToProcess.map(link => link.link);
      if (message.includes('重试')) {
        progressData.failedUrls = []; // 清空失败列表，准备重试
      }
      // 重新计算批次信息
      progressData.totalBatches = Math.ceil(linksToProcess.length / BATCH_SIZE);
      progressData.currentBatch = 0; // 重新开始批次计数
    } else {
      // 创建新的进度数据
      progressData = createInitialProgress(linksToProcess, BATCH_SIZE);
    }

    // 保存初始进度
    saveProgress(progressFilePath, progressData);

    console.log("🚀 启动本地浏览器 (Chrome)...");
    browser = await chromium.launch({
      headless: false,
      channel: "chrome",
      slowMo: 30,
      devtools: false,
      args: [
        "--disable-blink-features=AutomationControlled",
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
        "--disable-dev-shm-usage",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
        "--disable-background-timer-throttling",
        "--disable-background-networking",
        "--disable-client-side-phishing-detection",
        "--disable-sync",
        "--disable-translate",
        "--hide-scrollbars",
        "--mute-audio",
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });

    const totalBatches = Math.ceil(linksToProcess.length / BATCH_SIZE);
    progressData.totalBatches = totalBatches;

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const startIndex = batchIndex * BATCH_SIZE;
      const endIndex = Math.min(startIndex + BATCH_SIZE, linksToProcess.length);
      const batch = linksToProcess.slice(startIndex, endIndex);
      const currentBatch = batchIndex + 1;

      progressData.currentBatch = currentBatch;

      console.log(
        `\n🚀 开始处理第 ${currentBatch}/${totalBatches} 批 (${batch.length} 个页面)`
      );
      console.log(
        `📍 处理范围: ${startIndex + 1}-${endIndex} / ${linksToProcess.length}`
      );

      if (batchIndex > 0) {
        const batchDelay = randomDelay(3000, 8000);
        console.log(`⏰ 批次间等待 ${batchDelay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, batchDelay));
      }

      const fingerprint = generateRandomBrowserFingerprint();
      console.log(`🎭 当前批次浏览器标识:`);
      console.log(
        `   User-Agent: ${fingerprint.userAgent.substring(0, 80)}...`
      );
      console.log(
        `   视口: ${fingerprint.viewport.width}x${fingerprint.viewport.height}`
      );
      console.log(
        `   语言: ${fingerprint.locale}, 时区: ${fingerprint.timezoneId}`
      );

      const context = await browser.newContext({
        viewport: fingerprint.viewport,
        userAgent: fingerprint.userAgent,
        locale: fingerprint.locale,
        timezoneId: fingerprint.timezoneId,
        permissions: ["geolocation"],
        extraHTTPHeaders: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
          "Accept-Language": `${fingerprint.locale},zh;q=0.9,en;q=0.8`,
          "Accept-Encoding": "gzip, deflate, br",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "none",
          "Upgrade-Insecure-Requests": "1",
        },
      });

      const pages: Page[] = [];
      const pagePromises: Promise<CrawlResult>[] = [];

      console.log(`📑 开始创建标签页...`);
      for (let i = 0; i < batch.length; i++) {
        const linkInfo = batch[i];
        const pageIndex = startIndex + i + 1;

        console.log(
          `   📖 创建第 ${i + 1}/${batch.length} 个标签页 (总第${pageIndex}页)`
        );

        const page = await context.newPage();
        pages.push(page);

        await page.route("**/*", (route) => {
          const resourceType = route.request().resourceType();
          if (["image", "stylesheet", "font", "media"].includes(resourceType)) {
            route.abort();
          } else {
            route.continue();
          }
        });

        const pagePromise = processSinglePage(
          page,
          linkInfo,
          pageIndex,
          linksToProcess.length,
          turndownService,
          outputDir
        );
        pagePromises.push(pagePromise);

        if (i < batch.length - 1) {
          const tabDelay = randomDelay(500, 1500);
          console.log(`   ⏳ 等待 ${tabDelay}ms 再打开下一个标签页...`);
          await new Promise((resolve) => setTimeout(resolve, tabDelay));
        }
      }

      console.log(`⚡ 所有标签页已创建，等待处理完成...`);

      const batchResults = await Promise.allSettled(pagePromises);

      console.log(`🗑️  关闭当前批次的所有标签页...`);
      for (const page of pages) {
        try {
          await page.close();
        } catch (error) {
          console.log(`   ⚠️  关闭标签页时出错: ${(error as Error).message}`);
        }
      }

      await context.close();

      // 处理批次结果并更新进度
      let batchSuccessCount = 0;
      let batchFailedCount = 0;

      batchResults.forEach((result, index) => {
        const linkInfo = batch[index];
        progressData.processedCount++;

        // 从剩余列表中移除
        progressData.remainingUrls = progressData.remainingUrls.filter(url => url !== linkInfo.link);

        if (result.status === "fulfilled") {
          const crawlResult = result.value;
          
          // 查找是否已有此URL的结果
          const existingResultIndex = progressData.results.findIndex(r => r.url === linkInfo.link);
          
          if (existingResultIndex >= 0) {
            // 更新现有结果
            progressData.results[existingResultIndex] = crawlResult;
          } else {
            // 添加新的结果
            progressData.results.push(crawlResult);
          }

          if (crawlResult.success) {
            // 从失败列表中移除（如果之前失败过）
            const wasInFailedList = progressData.failedUrls.includes(linkInfo.link);
            progressData.failedUrls = progressData.failedUrls.filter(url => url !== linkInfo.link);
            
            // 检查是否是重试的链接
            const existingResult = progressData.results.find(r => r.url === linkInfo.link && r !== crawlResult);
            const isRetry = existingResult && !existingResult.success;
            
            if (isRetry) {
              // 重试成功：减少失败计数，增加成功计数
              progressData.failedCount = Math.max(0, progressData.failedCount - 1);
              progressData.successCount++;
            } else if (existingResultIndex < 0) {
              // 新的成功：增加成功计数
              progressData.successCount++;
            }
            
            batchSuccessCount++;
          } else {
            progressData.failedCount++;
            batchFailedCount++;
            // 添加到失败列表
            if (!progressData.failedUrls.includes(linkInfo.link)) {
              progressData.failedUrls.push(linkInfo.link);
            }
          }
        } else {
          batchFailedCount++;
          progressData.failedCount++;
          const crawlResult: CrawlResult = {
            url: linkInfo.link,
            success: false,
            filename: urlToFilename(linkInfo.link),
            error: `Promise执行失败: ${result.reason}`,
          };
          
          // 查找是否已有此URL的结果
          const existingResultIndex = progressData.results.findIndex(r => r.url === linkInfo.link);
          
          if (existingResultIndex >= 0) {
            // 更新现有结果
            progressData.results[existingResultIndex] = crawlResult;
          } else {
            // 添加新的结果
            progressData.results.push(crawlResult);
          }
          
          // 添加到失败列表
          if (!progressData.failedUrls.includes(linkInfo.link)) {
            progressData.failedUrls.push(linkInfo.link);
          }
          
          console.log(
            `   [${startIndex + index + 1}] ❌ Promise 执行失败: ${
              result.reason
            }`
          );
        }
      });

      console.log(`✅ 第 ${currentBatch} 批处理完成`);
      console.log(`   📊 本批成功: ${batchSuccessCount}`);
      console.log(`   📊 本批失败: ${batchFailedCount}`);
      console.log(
        `📈 总体进度: ${progressData.processedCount}/${progressData.totalLinks} (${progressData.completionRate.toFixed(1)}%)`
      );
      console.log(`   累计成功: ${progressData.successCount}, 累计失败: ${progressData.failedCount}`);

      // 实时保存进度
      saveProgress(progressFilePath, progressData);
    }

    // 标记任务完成
    progressData.status = 'completed';
    progressData.endTime = new Date().toISOString();
    saveProgress(progressFilePath, progressData);

    console.log(`\n🎉 全部处理完成!`);
    console.log(`📁 输出目录: ${outputDir}`);
    console.log(`📊 最终统计:`);
    console.log(`   - 总链接数: ${progressData.totalLinks}`);
    console.log(`   - 成功爬取: ${progressData.successCount}`);
    console.log(`   - 爬取失败: ${progressData.failedCount}`);
    console.log(
      `   - 成功率: ${((progressData.successCount / progressData.totalLinks) * 100).toFixed(1)}%`
    );

    const failedResults = progressData.results.filter((r) => !r.success);
    if (failedResults.length > 0) {
      console.log(`\n❌ 失败的链接 (${failedResults.length}个):`);
      failedResults.slice(0, 10).forEach((result, index) => {
        console.log(`${index + 1}. ${result.url}`);
        console.log(`   错误: ${result.error}`);
      });
      if (failedResults.length > 10) {
        console.log(`   ... 还有 ${failedResults.length - 10} 个失败的链接`);
      }
      console.log(`\n💡 提示: 再次运行脚本将自动重试失败的链接`);
    }
  } catch (error) {
    console.error("❌ 爬取失败:", (error as Error).message);
    console.error((error as Error).stack);
    
    // 更新进度状态为失败
    const sourcesDir = path.join(__dirname, "..", "..", "sources");
    const progressFilePath = path.join(sourcesDir, "docs.result.json");
    try {
      const progressData = loadProgress(progressFilePath);
      if (progressData) {
        progressData.status = 'interrupted';
        progressData.endTime = new Date().toISOString();
        saveProgress(progressFilePath, progressData);
      }
    } catch (saveError) {
      console.error("❌ 保存失败状态时出错:", (saveError as Error).message);
    }
    
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }

    console.log("✅ 资源清理完成");
  }
}

crawlToMarkdown();
