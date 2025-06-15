# 虚幻引擎中的Live Link Hub快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/live-link-hub-quick-start-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:07:06.848Z

---

目录

![Live Link Hub快速入门](https://dev.epicgames.com/community/api/documentation/image/97f3fb5c-0c03-470b-ad7a-692b62a442cd?resizing_type=fill&width=1920&height=335)

本文介绍了Live Link Hub的基本设置步骤及入门指南。

## 在虚幻编辑器中激活必要的插件

要启用Live Link Hub插件，请找到 **编辑（Edit）** > **插件（Plugins）** 并打开 **插件浏览器（Plugin Browser）**，搜索"Live Link"。

![Live Link plugins](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0041ae10-1cb9-4c6c-b05b-9f654328b7d1/image_0.png)

启用Live Link Hub插件条目。

Live Link - 在空白项目中，此插件是默认启用的。你之前可能禁用了它。如果禁用过，请将其启用。

重启编辑器

## 启动Live Link Hub

在菜单中会出现Live Link Hub的新条目。找到 **工具（Tools） -> Live Link Hub**。

![Live Link Hub in the Tools menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b087b741-f557-4e92-92e9-ab2d0697d9c4/image_1.png)

这会在你的计算机上启动Live Link Hub。

如果你想要在未安装虚幻引擎的计算机上运行Live Link Hub，可以从[Epic游戏商城](https://store.epicgames.com)下载Live Link Hub。

在启动Live Link Hub时，同一个网络中的所有运行虚幻编辑器且启用了Live Link Hubris插件的PC客户端都会出现在"客户端（Clients）"面板中。

你的编辑器会话应该已经出现在了最右边的"客户端（Clients）"面板中。

![An Unreal Editor session in Live Link Hub](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3758631a-a8af-40b2-bca1-9aee17408347/image_2.png)

在UE中，消息条会显示绿色的"Live Link已连接（Live Link Connected）"横幅：

![Live Link Connected banner](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65c549bf-5c69-47a3-b689-53b7be3cae97/image_3.png)

如果发生错误，消息条会显示警告信息：

![Live Link Hub Error warning message](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61651a51-46e3-41e4-95d3-b6fc1fddc2d9/image_4.png)

在UE中打开Live Link面板，查看其中是由列出了一个名为"Live Link Hub"的源。它应该如下所示：

![Live Link Hub source in the Live Link panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1bee7e61-3c7c-4e21-a47d-dcb3adc94590/image_5.png)

如果列表中没有名为"Live Link Hub"的源，你可以点击 **+添加源（+Add Source）** 手动添加。

如果有新的客户端（引擎会话）上线，它们会被自动添加到Live Link Hub。如果它们断开连接，则会在列表中显示为未连接。

## 添加源

要添加实时动画数据源，请在 **源（Sources）** 面板中点击 **+添加源（+Add Source）**：

![Add a source](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62428254-11cd-43b7-a036-7b8d81c3612a/image_6.png)

数据会被发送到所有连接的客户端。你的源主体会出现在中间的 **主体（Subjects）** 面板中：

![Your source's subjects](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3db9e7d-7597-455e-9579-734b22ffb47f/image_7.png)

你也可以在UE中点击消息条中的Live Link Hub分段，或打开Live Link面板，查看列出的主体：

![Live Link subjects listed in Unreal Engine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83638b5b-9ecf-4c93-afed-bb1eca04caec/image_8.png)

此时，数据会被流送到你的虚幻编辑器。你可以按照[Live Link文档](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine)所描述的那样对其进行处理。

## 进阶主题

### 通过命令行启动

你可以通过命令行启动Live Link Hub，这可以让你访问额外的启动参数。

如果你时通过虚幻引擎安装运行Live Link Hub，可以选择在Hubris中启用以下Live Link插件：

-   LiveLinkFreeD
-   LiveLinkPrestonMDR
-   LiveLinkMasterLockit
-   LiveLinkVRPN

按Windows+R并输入CMD。按回车键打开命令行窗口。

输入并执行以下命令：

```cpp
[your install directory]\Engine\Binaries\LiveLinkHub.exe -EnablePlugins=”LiveLinkFreeD,LiveLinkPrestonMDR,LiveLinkMasterLockit,LiveLinkVRPN”
```

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [live link](https://dev.epicgames.com/community/search?query=live%20link)
-   [animation tool](https://dev.epicgames.com/community/search?query=animation%20tool)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [在虚幻编辑器中激活必要的插件](/documentation/zh-cn/unreal-engine/live-link-hub-quick-start-in-unreal-engine#%E5%9C%A8%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%BF%80%E6%B4%BB%E5%BF%85%E8%A6%81%E7%9A%84%E6%8F%92%E4%BB%B6)
-   [启动Live Link Hub](/documentation/zh-cn/unreal-engine/live-link-hub-quick-start-in-unreal-engine#%E5%90%AF%E5%8A%A8livelinkhub)
-   [添加源](/documentation/zh-cn/unreal-engine/live-link-hub-quick-start-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E6%BA%90)
-   [进阶主题](/documentation/zh-cn/unreal-engine/live-link-hub-quick-start-in-unreal-engine#%E8%BF%9B%E9%98%B6%E4%B8%BB%E9%A2%98)
-   [通过命令行启动](/documentation/zh-cn/unreal-engine/live-link-hub-quick-start-in-unreal-engine#%E9%80%9A%E8%BF%87%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%90%AF%E5%8A%A8)