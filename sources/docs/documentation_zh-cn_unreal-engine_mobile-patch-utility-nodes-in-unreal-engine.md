# 虚幻引擎移动补丁工具节点 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mobile-patch-utility-nodes-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:00.237Z

---

目录

![移动补丁工具节点](https://dev.epicgames.com/community/api/documentation/image/f2fa91e1-1944-47f2-b43f-15e2d331c24e?resizing_type=fill&width=1920&height=335)

使用[](/documentation/404)为移动项目创建小型初始下载后，还需要以可下载数据块的方式将项目的剩余内容提供给用户。 全新的移动补丁工具蓝图库包含移动游戏从云端网站下载并安装游戏内容和补丁（而非从 App Store 上进行初始下载）的所有必备功能。 这些功能可确定是否有更新游戏内容、开始下载、跟踪进程、处理错误，并在最后安装成功下载的内容包。 此外还包含检查存储空间和 WiFi 连接的功能，以便在这些情况下提醒用户。 支持 Android 和 iOS。

为展示这些函数之间的上下文关系，此处展示设置范例。 如蓝图图表范例中的函数或事件未列于下表中，则需要为您自己的项目创建自定义节点。

## 使用待定内容

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c2bf87d-1b13-4313-8a4f-79601eaa8c02/patching_1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c2bf87d-1b13-4313-8a4f-79601eaa8c02/patching_1.png)

这是补丁流程的第一步。补丁开始时，需要使用 **Request Content** 节点从远程服务器请求内容（通过关卡加载或用户行为）。 在此例中，安装目录保存在一个变量中，但其也可作为函数输入进行传递。**Content To Install** 同样保存在一个变量中，以便之后使用。 内容请求完成后，将请求的成功或失败执行不同事件。自定义事件用作 **Request Content** 函数的输入。 此处显示的 **Check Download Space** 函数将调用一个自定义事件，开始补丁逻辑的下一套内容。

节点

描述

Request Content

尝试使用特定的 manifest URL 下载一个 manifest 文件。成功后，它将返回一个代表远程内容的对象。可查询此对象的更多信息，如内容总大小、下载大小，等等。用户可选择下载并安装远程内容。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50007bed-7057-43a6-a532-fdf4860d5ce8/patching_2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50007bed-7057-43a6-a532-fdf4860d5ce8/patching_2.png)

请求远程内容成功后，下一步是使用 **Get Required Disk Space** 节点确保有足够空间进行下载，并将结果与 **Get Disk Free Space** 的结果进行对比。 如所需的磁盘空间小于剩余磁盘空间，则调用自定义事件开始下载。

节点

描述

Get Disk Free Space

获取内容安装（或即将进行安装）路径的剩余磁盘空间（以 MB 为单位）。

Get Required Disk Space

获取此内容安装所需的磁盘空间（以 MB 为单位）。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92f79cb7-fba9-409b-a676-5c36ee7b6274/patching_3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92f79cb7-fba9-409b-a676-5c36ee7b6274/patching_3.png)

虽然此图表中有大量内容，但唯一的移动补丁工具函数是 **Start Install**，它将尝试下载并安装远程内容。和 **Request Content** 一样， **Start Install** 拥有成功和失败的事件参数。如安装成功，则使用 **Mount Content** 自定义事件触发补丁流程的最终部分。 此时将触发另一个带定时器的自定义事件 **Mount Content**。使用定时器和 **Update Download State** 函数，下载状态可以固定间隔向用户展示。此逻辑的更多内容在下一个蓝图图表中。

节点

描述

Start Install

尝试下载并安装远程内容。用户可选择将安装内容装入游戏中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fc0913c-dc6a-4215-9fbe-e7bac2308c3f/patching_4.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fc0913c-dc6a-4215-9fbe-e7bac2308c3f/patching_4.png)

**Display Download State** 自定义事件连接到 **Format Text** 节点，用户可在补丁流程的这个阶段中在 UI（用户界面）上填入进度条， 或显示进度的其他方法。**Get Download Size**、**Get Download Speed**、**Get Download Status Text**、**Get Install Progress** 和 **Get Total Downloaded Size** 节点的输出在此组合为一个简单文本段，向用户呈现。此脚本随定时器以固定间隔调用，但并不回叫到任何其他范例图表。

节点

描述

Get Download Size

获取此安装内容的总下载大小。

Get Download Speed

获取当前的下载速度（以 MB/秒为单位）安装中有效。

Get Download Status Text

获取当前的安装状态文本。安装中有效。

Get Install Progress

获取当前的安装进度。已知进度的结果在 0 和 1 之间，未知进度的结果小于 0。

Get Total Downloaded Size

获取已下载的总大小（以 MB 为单位）。安装中有效。

## 使用安装内容

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86c3ae97-f222-43e7-bc4e-1bb8984428ad/patching_5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86c3ae97-f222-43e7-bc4e-1bb8984428ad/patching_5.png)

补丁流程的最后阶段是装入内容。我们使用的是第一个蓝图图表容纳的 **Install Directory** 变量，但这也可作为函数输入进行传递。 **Get Installed Content** 节点用于从目录中寻找内容，然后 **Mount** 函数将把内容装入游戏。与 **Request Content** 和 **Start Install** 不同的是，**Mount** 没有成功和失败的事件回调。

节点

描述

Get Installed Content

获取安装的内容。如指定目录中有安装内容，此节点将返回一个非空对象。用户可选择将安装内容装入游戏。

Mount

装入安装内容。

## 其他移动补丁函数

上方的图表是如何在移动设备上设置补丁的简单范例，但也能设置其他复杂行为。例如可设置游戏在无可用 WiFi 连接时提醒用户， 或为 iOS 和 Android 设备提供不同内容。针对这些以及其他使用情况，将以下函数添加到蓝图将有所帮助。

节点

描述

Get Active Device Profile Name

获取当前选中的设备配置文件命名。

Get Installed Content Size

获取安装内容的大小（以 MB 为单位）

Get Supported Platform Names

获取此设备上支持平台名的列表。范例：Android\_ETC2, Android\_ASTC

Has Active WiFi Connection

返回当前是否存在可用 WiFi 连接。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用待定内容](/documentation/zh-cn/unreal-engine/mobile-patch-utility-nodes-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%BE%85%E5%AE%9A%E5%86%85%E5%AE%B9)
-   [使用安装内容](/documentation/zh-cn/unreal-engine/mobile-patch-utility-nodes-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%AE%89%E8%A3%85%E5%86%85%E5%AE%B9)
-   [其他移动补丁函数](/documentation/zh-cn/unreal-engine/mobile-patch-utility-nodes-in-unreal-engine#%E5%85%B6%E4%BB%96%E7%A7%BB%E5%8A%A8%E8%A1%A5%E4%B8%81%E5%87%BD%E6%95%B0)

相关文档

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)