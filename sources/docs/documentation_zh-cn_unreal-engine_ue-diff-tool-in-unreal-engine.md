# 虚幻引擎中的UE对比工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:37:17.541Z

---

目录

![虚幻对比工具](https://dev.epicgames.com/community/api/documentation/image/25cd4c88-c4b9-4511-a093-53ae1c8ac5d0?resizing_type=fill&width=1920&height=335)

对于大型复杂文件，手动追踪漏洞和剖析功能可能很难。传统上，对比的文件是基于文本的文件。但对于 **资产** 和 **蓝图** ，文本表示将不具有建设性。这就是我们开发UE对比工具的原因。 UE对比工具可对比虚幻引擎中的资产。它支持：

-   比较资产与版本控制中资产本身的早前版本。
-   比较两种不同的资产。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a733b5be-bed4-479f-b764-6cb89f61c3f8/overview.png)

当你对比一个资产或两个不同的资产时，会比较两个文件。工具会将两个文件之间的差异突出显示，以便发现差异。

  

并非所有资产类型都受到支持。当前支持的类型如下：

-   蓝图
-   蓝图相邻类型。

## 对比工具的剖析

如需将两个资产相互对比，请找到内容浏览器，选择两个资产，然后右键点击并选择 **对比选定项（Diff Selected）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8899c28-330b-4a90-afe5-dd040191b83d/diffselected.png)

### 切换差异

使用对比工具时，你可以使用 **下一个（Next）** 和 **上一个（Previous）** （Prev）箭头按钮快速循环浏览差异，或点击导航树中的项目来观察具体差异。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1818248-aaf9-4e45-8101-6bbe81e83675/toggledifferences.gif)

### 基本图表对比导航

你可以使用 **锁定/解锁（Lock/Unlock）** 按钮切换是否锁定两个图表之间的平移和缩放。如需快速查找更改，请使用鼠标中间滚轮进行缩小。所有未更改的节点显示为灰色，已更改的节点为可见状态，并用色码描边来表明更改类型。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2467d8e-faac-4e30-8a8d-8f4a76e1b37b/lockunlock.gif)

### 颜色编码

使用以下配色方案对图表更改进行颜色编码。

颜色

 

说明

红色

左侧面板上的某些内容在右侧面板中缺失（内容减少。）

 

绿色

右侧面板上的某些内容在左侧面板中缺失（内容增加。）

 

青色

某些内容发生了变化。

 

灰色

左侧面板上的某些内容在右侧面板中缺失（移动了节点、注释。）

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95eed8e8-caeb-47c6-9426-4c5049d299ff/overview.png)

## UE检查工具

你可以使用 **UE检查工具（UE Review Tool）** 列出搁置或提交的变更列表中的所有资产。该工具还允许用户对比和检查这些资产。目前，检查工具仅支持用于Perforce。

你可以从位于编辑器右下角的 **版本控制（Revision Control）** 菜单启动该检查工具。如果列表中没有该工具，请确认你已登录Perforce。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bf0454e-8186-4a80-97f7-4857adb1ebff/uereviewtool.gif)

## 将本地资产更改与当前版本控制修订版进行对比

版本控制的一个优点是，能够查看文件的以前版本，并对其进行比较或"对比"，以了解文件的更改情况。可通过以下几种不同的操作程序将你的本地资产更改与你当前的版本控制修订版进行对比。

### 操作程序1

在内容浏览器中右键点击资产，找到 **版本控制（Source Control）** > **与库对比（Diff Against Depot）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a72133d-285d-41cb-bcbe-80f529578ba2/difflocaloption1.gif)

### 操作程序2

右键点击 **查看变更列表（View Changelists）** 工具中的资产，然后选择 **与库对比（Diff Against Depot）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/798b6a46-340e-49d3-a1b1-a1c3918dd7bb/diffagainstdepot.gif)

### 操作程序3（仅适用于蓝图）

在"蓝图编辑器（Blueprint Editor）"中，找到 **对比（Diff）** > **库（Depot）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34e5304f-b2bc-44af-b1c0-901abdd7c65d/diffdepot.gif)

## 将本地资产更改与特定版本控制修订版进行对比

按照以下任一操作程序，均可将本地资产与特定版本控制修订版进行对比。

### 操作程序1

在内容浏览器中右键点击资产，找到 **版本控制（Source Control）** > **历史记录（History）** 。 右键点击你想对比的修订版，并选择 **与工作区文件对比（Diff Against Workspace File）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e9bc0eb-1665-4afc-9d7e-f140e809f799/diffagainstworkspacefile.gif)

### 操作程序2

在"蓝图编辑器（Blueprint Editor）"中，点击 **对比（Diff）** 并选择要进行对比的修订版。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/457464c3-4e64-4271-a3c4-5f9db83cd748/blueprinteditordiff.gif)

## 将资产的早期修订版与其上一修订版进行对比

### 操作程序1

在 **内容浏览器** 中的资产上右键点击。找到 **版本控制（Source Control）** > **历史记录（History）** ，然后右键点击你要进行对比的修订版，并选择 **与上一修订版对比（Diff Against Previous Revision）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f18c7ccb-4fcd-4b02-9fc7-969c1792e405/diffagainstpreviousrevision.gif)

### 操作程序2

在"UE检查工具（UE Review Tool）"中，输入你想要对比的CL，然后点击资产旁的 **对比（diff）** 按钮。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b414d4a0-ef5b-4d4c-b1fd-3afe26a562e0/specificoption2.gif)

## 将搁置的CL与其上一修订版进行对比

在"UE检查工具（UE Review Tool）"中，输入你想要对比的变更列表（CL），然后点击资产旁的 **对比（diff）** 按钮。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d36837c-b070-4e05-8f0f-44519e60cca9/diffshelved.gif)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [对比工具的剖析](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E5%AF%B9%E6%AF%94%E5%B7%A5%E5%85%B7%E7%9A%84%E5%89%96%E6%9E%90)
-   [切换差异](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E5%88%87%E6%8D%A2%E5%B7%AE%E5%BC%82)
-   [基本图表对比导航](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E5%9F%BA%E6%9C%AC%E5%9B%BE%E8%A1%A8%E5%AF%B9%E6%AF%94%E5%AF%BC%E8%88%AA)
-   [颜色编码](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E9%A2%9C%E8%89%B2%E7%BC%96%E7%A0%81)
-   [UE检查工具](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#ue%E6%A3%80%E6%9F%A5%E5%B7%A5%E5%85%B7)
-   [将本地资产更改与当前版本控制修订版进行对比](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E5%B0%86%E6%9C%AC%E5%9C%B0%E8%B5%84%E4%BA%A7%E6%9B%B4%E6%94%B9%E4%B8%8E%E5%BD%93%E5%89%8D%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6%E4%BF%AE%E8%AE%A2%E7%89%88%E8%BF%9B%E8%A1%8C%E5%AF%B9%E6%AF%94)
-   [操作程序1](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E6%93%8D%E4%BD%9C%E7%A8%8B%E5%BA%8F1)
-   [操作程序2](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E6%93%8D%E4%BD%9C%E7%A8%8B%E5%BA%8F2)
-   [操作程序3（仅适用于蓝图）](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E6%93%8D%E4%BD%9C%E7%A8%8B%E5%BA%8F3%EF%BC%88%E4%BB%85%E9%80%82%E7%94%A8%E4%BA%8E%E8%93%9D%E5%9B%BE%EF%BC%89)
-   [将本地资产更改与特定版本控制修订版进行对比](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E5%B0%86%E6%9C%AC%E5%9C%B0%E8%B5%84%E4%BA%A7%E6%9B%B4%E6%94%B9%E4%B8%8E%E7%89%B9%E5%AE%9A%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6%E4%BF%AE%E8%AE%A2%E7%89%88%E8%BF%9B%E8%A1%8C%E5%AF%B9%E6%AF%94)
-   [操作程序1](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E6%93%8D%E4%BD%9C%E7%A8%8B%E5%BA%8F1-2)
-   [操作程序2](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E6%93%8D%E4%BD%9C%E7%A8%8B%E5%BA%8F2-2)
-   [将资产的早期修订版与其上一修订版进行对比](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E5%B0%86%E8%B5%84%E4%BA%A7%E7%9A%84%E6%97%A9%E6%9C%9F%E4%BF%AE%E8%AE%A2%E7%89%88%E4%B8%8E%E5%85%B6%E4%B8%8A%E4%B8%80%E4%BF%AE%E8%AE%A2%E7%89%88%E8%BF%9B%E8%A1%8C%E5%AF%B9%E6%AF%94)
-   [操作程序1](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E6%93%8D%E4%BD%9C%E7%A8%8B%E5%BA%8F1-3)
-   [操作程序2](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E6%93%8D%E4%BD%9C%E7%A8%8B%E5%BA%8F2-3)
-   [将搁置的CL与其上一修订版进行对比](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine#%E5%B0%86%E6%90%81%E7%BD%AE%E7%9A%84cl%E4%B8%8E%E5%85%B6%E4%B8%8A%E4%B8%80%E4%BF%AE%E8%AE%A2%E7%89%88%E8%BF%9B%E8%A1%8C%E5%AF%B9%E6%AF%94)