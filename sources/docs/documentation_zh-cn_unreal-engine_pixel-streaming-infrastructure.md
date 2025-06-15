# 像素流送基础设施 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/pixel-streaming-infrastructure
> 
> 生成时间: 2025-06-14T20:46:56.314Z

---

目录

![像素流送基础设施](https://dev.epicgames.com/community/api/documentation/image/d8c68a7c-adca-4860-9902-13d38bd54053?resizing_type=fill&width=1920&height=335)

运行像素流送所需的"基础设施"一般包含像素流送插件的服务器和前端组件。它包含运行像素流送所需的脚本（信令服务器、配对器和SFU），并且设计为易于访问和修改。 此外，它还包含可供开发人员修改和扩展以满足其像素流体验需求的基础。 之前，这些脚本位于你的项目和引擎的Samples/PixelStreaming目录中。如果你想以后继续使用像素流送，建议使用新基础设施，因为对像素流送的所有最新前端更新都将在其中进行。

## 为什么？

我们已将像素流送前端移至其自己的仓库，这是出于多种原因：

1.  为了改进像素流送的发布节奏。基础设施存在于其自己的仓库之后，就不会与虚幻引擎的更新绑定。
    
2.  鼓励和允许虚幻引擎持证人和用户更轻松地做出贡献。
    

## 获取基础设施

共有 **3种不同的方式** 可获取像素流送基础设施。 下面的方法最常用，应该能够满足大部分用例。

### 下载Zip

你可以直接下载zip格式的基础设施，请前往：[https://github.com/EpicGamesExt/PixelStreamingInfrastructure](https://github.com/EpicGamesExt/PixelStreamingInfrastructure)。 找到你需要的基础设施分支（例如，4.27或5.0），并按下绿色的代码（Code）按钮。你应该会看到下载ZIP的选项。

### 使用Git命令

如果你在本地安装了Git，你可以通过命令行获取基础设施，例如：

在你偏好的终端中执行 `git clone --branch UE5.5 https://github.com/EpicGamesExt/PixelStreamingInfrastructure.git` （确保你安装了git）。

上述git命令将提取基础设施的5.5分支。如果你需要不同的分支，请相应修改git命令。

### 使用提供的脚本

启用像素流送插件后，你将查找脚本来自动提取所需的基础设施分支。

找到 `\Engine\Plugins\Media\PixelStreaming\Resources\WebServers` 并运行 `get_ps_servers` 命令（确保将相应的 `.bat` 脚本用于Windows，将相应的 `.sh` 脚本用于Linux或Mac）。这会自动将相关像素流送基础设施分支提取到该文件夹中。

推荐该方法是因为下载的基础设施将自动随启用了像素流送的项目打包。如果你不使用该方法，仍可以手动将基础设施放在上述位置，从而确保基础设施随你的项目打包。

## 基础设施布局

通过上述任一方法提取基础设施后，你将获得如下所示的本地文件设置。你也可以直接在GitHub上浏览基础设施。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb642558-cd02-45a3-b74e-584abac83849/infrastructurelocal.jpg)

像素流送组件位置如下所示：

1.  **前端** ：此目录包含HTML、CSS、图像和JavaScript/TypeScript代码，这些代码在网络浏览器中运行，让后者可以连接到虚幻引擎像素流应用程序并与它们进行交互，此外还包含有关如何实现这些交互的文档。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9905ec0a-0afc-47ec-b21e-89c7f96e0472/frontendlocal.jpg)
2.  **配对器（Matchmaker）** ：该文件包含配置和运行配对器所需的所有脚本。
    
    从虚幻引擎5.5开始，配对器将被废弃。需要配对器的用户可以使用之前版本的像素流送基础设施。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2faead38-65c5-4277-bd34-a044ab5a661c/matchmakerlocal.jpg)
3.  **SFU** ：该目录包含配置和运行选择性转发单元（SFU）所需的所有内容。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0463a385-0c04-4e47-ba41-f6e44327b3d8/sfulocal.jpg)
4.  **SignallingWebServer** ：用于记录那些强制类型的像素流元素，例如信令服务器、Web服务器和前端。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5edd905-db18-4b0f-88f4-bfa91028defc/sslocal.jpg)

`Platform_scripts` 目录是用于启动每个像素流送元素的所有脚本的常用位置。你可以在 `cmd` 中找到Windows脚本，在 `bash` 中找到Linux和Mac的脚本。

如需了解如何使用配对器和SFU，请参阅[托管和网络指南](/documentation/zh-cn/unreal-engine/hosting-and-networking-guide-for-pixel-streaming-in-unreal-engine)。

如需设置基本像素流送的帮助，请参阅[像素流入门](/documentation/zh-cn/unreal-engine/getting-started-with-pixel-streaming-in-unreal-engine)。

如需获得自定义前端的指导，请参阅[Frontend/Docs/](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/tree/master/Frontend)目录。

## 引擎版本

不同的引擎版本有不同的像素流送基础设施分支。每个引擎版本的像素流送插件存在差异，请务必使用兼容版本的像素流送基础设施（例如，适用于虚幻引擎5.0的分支5.0)。此外还提供了一个主分支，用于我们正在进行的开发。这将包含最新的功能，但也是试验性的，不保证稳定。

如需查看当前支持的虚幻引擎版本的列表，请参阅前端存储库的版本部分：

[](https://github.com/EpicGamesExt/PixelStreamingInfrastructure#versions)

-   [guide](https://dev.epicgames.com/community/search?query=guide)
-   [pixel streaming](https://dev.epicgames.com/community/search?query=pixel%20streaming)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [为什么？](/documentation/zh-cn/unreal-engine/pixel-streaming-infrastructure#%E4%B8%BA%E4%BB%80%E4%B9%88%EF%BC%9F)
-   [获取基础设施](/documentation/zh-cn/unreal-engine/pixel-streaming-infrastructure#%E8%8E%B7%E5%8F%96%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD)
-   [下载Zip](/documentation/zh-cn/unreal-engine/pixel-streaming-infrastructure#%E4%B8%8B%E8%BD%BDzip)
-   [使用Git命令](/documentation/zh-cn/unreal-engine/pixel-streaming-infrastructure#%E4%BD%BF%E7%94%A8git%E5%91%BD%E4%BB%A4)
-   [使用提供的脚本](/documentation/zh-cn/unreal-engine/pixel-streaming-infrastructure#%E4%BD%BF%E7%94%A8%E6%8F%90%E4%BE%9B%E7%9A%84%E8%84%9A%E6%9C%AC)
-   [基础设施布局](/documentation/zh-cn/unreal-engine/pixel-streaming-infrastructure#%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E5%B8%83%E5%B1%80)
-   [引擎版本](/documentation/zh-cn/unreal-engine/pixel-streaming-infrastructure#%E5%BC%95%E6%93%8E%E7%89%88%E6%9C%AC)