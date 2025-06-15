# 虚幻引擎中的关卡实例化 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:18:36.402Z

---

目录

![Level Instancing](https://dev.epicgames.com/community/api/documentation/image/424802b5-a422-4bfa-bab8-2dab1086a487?resizing_type=fill&width=1920&height=335)

关卡实例化是一种基于关卡的工作流程，旨在改善和精简关卡编辑体验。将关卡实例化工作流程用于一个或多个Actor来创建可以在你的整个世界内放置和复用的关卡实例。

这个工作流程具有以下优势：

-   关卡实例在相关环境中编辑，可以立即看到所做更改对你的世界的影响。对一个实例所做的更改在保存后将复用于所有实例。
    
-   快速创建静态网格体排列（兴趣点、建筑和Gameplay设置中的任何内容）的副本作为模板。
    
-   在创建Epic Games所创建的[城市示例](https://www.fab.com/listings/4898e707-7855-404b-af0e-a505ee690e68)和[Valley of the Ancient](https://www.fab.com/listings/0c19880e-21bd-42ba-8287-1caccc3951b1)演示时所使用的生产级流程。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4dc96b1-e965-4ce4-9e6c-e013dd37f0c8/automaticgridbased_hlod.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4dc96b1-e965-4ce4-9e6c-e013dd37f0c8/automaticgridbased_hlod.jpg)

城市示例中的天际线。

虽然可以在不进行 **世界分区（World Partition）** 的情况下使用 **关卡流送（Level Streaming）** ，但关卡实例不会在世界分区（World Partition）主世界之外自动具有流送管理或流送策略。

## 创建关卡实例

关卡实例分为两种：

-   **关卡实例（Level Instances）** ：Actor集合，组合在一起形成子关卡。你的整个项目可重复存在同一子关卡的多个实例，在之前版本的虚幻引擎中这是无法实现的。请将此类型用于兴趣点和独立Gameplay设置。
-   **打包型关卡蓝图（Packed Level Blueprints）** ：将 **静态网格体（Static Mesh）** 资产合并以创建进行了渲染优化的单一 **蓝图Actor（Blueprint Actor）** 。将静态网格体替换为链接到 **打包型关卡Actor（Packed Level Actor）** 的 **打包型关卡蓝图（Packed Level Blueprint）** 实例。建议将此类型用于静态建筑和密集视觉设置，如《遗迹峡谷》中使用的Mega Assemblies（@@@）。

### 创建关卡实例

新关卡实例是根据选择的Actor生成的，可以在 **视口（Viewport）** 或 **大纲视图（Outliner）** 中创建。

选择Actor之后，右键点击其中一个即可打开上下文相关菜单。在该菜单中，找到 **关卡（Level）** 选项，然后选择 **创建关卡实例（Create Level Instance）** 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f850dd0a-ec9c-4a19-b67b-5a355352b7ed/create-level-instance.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f850dd0a-ec9c-4a19-b67b-5a355352b7ed/create-level-instance.png)

通过上下文菜单创建关卡实例。

你将看到一个具有以下设置的对话框：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/694763a8-0004-4098-818c-c5c198d66ad3/new-instance-dialog.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/694763a8-0004-4098-818c-c5c198d66ad3/new-instance-dialog.png)

新建关卡实例对话框。

设置

说明

外部Acto

允许外部Actor使用"一个Actor一个文件"系统。有关更多信息，请参阅[一Actor一文件](/documentation/zh-cn/unreal-engine/one-file-per-actor-in-unreal-engine)文档。

枢轴点类型

关卡实例将采用的 **枢轴点（Pivot）** 类型：

-   **中心最小值 - Z（Center Min Z）** ：枢轴点将位于关卡实例的中心，并且位于最小的Z值位置。
-   **中心：枢轴（Center:** ：枢轴点将位于关卡实例的中心。
-   **枢轴点Actor（Pivot Actor）** ：如果选择某个Actor作为枢轴点，请使用此下拉菜单来选择将哪个Actor作为关卡实例的枢轴点。

枢轴点Actor

如果Actor被选择作为枢轴点，请使用此下拉菜单来选择哪个Actor将作为关卡实例的枢轴点。

选择你的设置并点击 **确定（Ok）** 之后，系统将要求你保存新的关卡实例。

此流程会在关卡中创建新的 **关卡实例（Level Instance）** Actor，代替之前选中的Actor。此Actor表示刚刚创建的关卡，应用于此Actor的所有变换都将应用至关卡实例。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b171b8d-ca82-4692-a8df-a086e897eb31/level-instance-viewport.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b171b8d-ca82-4692-a8df-a086e897eb31/level-instance-viewport.png)

新的关卡实例代替关卡中的资产。

组成关卡实例的Actor在大纲视图中仍然可见，但现在已成为关卡实例Actor的子项，并且不可选择。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0980ab6-1fea-4a9a-aa74-f7db0726d87b/level-instance-outliner.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0980ab6-1fea-4a9a-aa74-f7db0726d87b/level-instance-outliner.png)

这些资产现在已成为关卡实例Actor的子项。

### 创建打包型关卡蓝图

如同关卡实例，打包型关卡蓝图使用选择的Actor生成，可以通过在 **视口（Viewport）** 或 **大纲视图（Outliner）** 中点击右键进行创建。

选择Actor之后，右键点击其中一个即可打开上下文相关菜单。在该菜单中，找到 **关卡（Level）** 选项，然后选择 **创建打包型关卡Actor（Create Packed Level Actor）** 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00afadc0-3bf2-46bc-931f-f927c9a3bedc/create-packed-bp.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00afadc0-3bf2-46bc-931f-f927c9a3bedc/create-packed-bp.png)

通过上下文菜单创建打包型关卡蓝图。

你会看到与上面相同的对话框。选择你的设置并点击 **确定（Ok）** 。然后系统会要求你保存新的关卡和新的打包型关卡蓝图。

此流程会在与你的打包型关卡蓝图关联的关卡中创建一个新的 **打包型关卡Actor（Packed Level Actor）** 。

## 编辑关卡实例

创建后，可将关卡实例和打包型关卡蓝图复制和放置在你的世界中。

### 编辑关卡实例

要编辑你的关卡实例，请在视口（Viewport）中选择其中一个，然后右键点击打开菜单，找到 **关卡（Level）** 选项，然后选择 **编辑（Edit）** 。你也可以点击 **细节（Details）** 面板中的 **编辑（Edit）** 按钮。

这会使你的世界中的所有其他Actor显示为灰色，从而更便于你在相关环境中进行关卡实例编辑。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/934f9e87-8ec8-4e2e-9c20-6288a278defb/edit-level-instance.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/934f9e87-8ec8-4e2e-9c20-6288a278defb/edit-level-instance.png)

在视口中编辑关卡实例时，所有其他Actor都显示为灰色。

当你完成编辑时，在 **大纲视图（Outliner）** 中选择该关卡实例Actor，然后在 **细节（Details）** 面板中点击 **提交更改（Commit Changes）** 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd1d489d-1c83-4012-b02b-ffb4b6d5ec0f/commit-changes.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd1d489d-1c83-4012-b02b-ffb4b6d5ec0f/commit-changes.png)

点击细节（Details）面板中的提交更改（Commit Changes）保存你的关卡实例更改。

要退出编辑而不提交你的更改，请按 **Esc** 两次。

一旦对某个关卡实例做出更改，此更改就会传播到该关卡实例在你的世界中的所有副本。

### 编辑打包型关卡蓝图

要编辑你的打包型关卡蓝图，请在 **大纲视图（Outliner）** 中找到它的一个实例，然后点击 **编辑（Edit）** 。你也可以在 **内容浏览器（Content Browser）** 中找到该蓝图，然后双击。此操作将打开蓝图编辑器窗口。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb7571fe-c899-4742-8848-01dc9b5f33b8/packed-bp-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb7571fe-c899-4742-8848-01dc9b5f33b8/packed-bp-editor.png)

显示所选打包型关卡蓝图的蓝图编辑器窗口。

与关卡实例类似，对打包型关卡蓝图做出更改后，此更改会传播到该蓝图在你的世界中的所有其他副本。

### 拆分关卡实例

拆分关卡实例会将关卡实例Actor或打包型关卡Actor从世界中移除，将其替换为创建它们时使用的原始资产。拆分不会从内容浏览器中删除关卡实例或打包型关卡蓝图。

此操作无法撤销。

## 运行时关卡实例

### 数据层

关卡实例和打包型关卡蓝图支持[世界分区：数据层](/documentation/zh-cn/unreal-engine/world-partition---data-layers-in-unreal-engine)。

关卡实例中包含的Actor默认继承指定给其 **关卡实例（Level Instance）** Actor的数据层。关卡实例内的Actor还支持额外的数据层。

例如，若关卡实例中包含用于创建房屋兴趣点的资产，则可将此关卡实例指定给某个邻里数据层。该关卡实例还可以包含以节假日为主题的选项，这些选项指定给不同的节假日数据层，仅在这些数据层启用时才可见。

### 关卡流送模式

关卡实例和打包型关卡Actor使用世界分区（World Partition）设置来定义它们的流送行为，即嵌入模式（Embedded Mode）或关卡流送模式（Level Streaming Mode）。

这些设置不可编辑，在此列出仅供参考。

#### 嵌入模式

使用 **嵌入模式（Embedded Mode）** 时，使用[一个Actor一个文件(OFPA)](/documentation/zh-cn/unreal-engine/one-file-per-actor-in-unreal-engine)系统的关卡实例会被废弃，它们的Actor将会在运行时添加到世界分区网格。这是默认的运行时模式，也是建议的关卡内容流送方法。这让关卡实例仅在编辑器中存在。

在使用嵌入模式时，一些不使用OFPA的Actor将会在运行时丢失。例如，嵌入的关卡实例的AWorldSettings object在运行时不存在，因为这是非OFPA Actor。你应该避免依赖这些Actor，或在需要时使用关卡流送模式。

#### 关卡流送模式

不使用OFPA的关卡实例无法嵌入到世界分区网格中，并且在运行时使用标准的关卡流送。这意味着，**关卡实例（Level Instance）** Actor通过自身关联的世界分区运行时单元格加载时，它将加载关联的关卡。

此关卡流送的运行时开销很高，因为流中添加了更多的关卡。不建议使用采用此模式来流送大量关卡，因为性能开销会很大。

结合使用嵌入模式和[世界分区：数据层](/documentation/zh-cn/unreal-engine/world-partition---data-layers-in-unreal-engine)功能，你可以有效估计出能为动态加载的关卡预先准备哪些功能。

-   [level instancing](https://dev.epicgames.com/community/search?query=level%20instancing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建关卡实例](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%85%B3%E5%8D%A1%E5%AE%9E%E4%BE%8B)
-   [创建关卡实例](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%85%B3%E5%8D%A1%E5%AE%9E%E4%BE%8B-2)
-   [创建打包型关卡蓝图](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%89%93%E5%8C%85%E5%9E%8B%E5%85%B3%E5%8D%A1%E8%93%9D%E5%9B%BE)
-   [编辑关卡实例](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%85%B3%E5%8D%A1%E5%AE%9E%E4%BE%8B)
-   [编辑关卡实例](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%85%B3%E5%8D%A1%E5%AE%9E%E4%BE%8B-2)
-   [编辑打包型关卡蓝图](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine#%E7%BC%96%E8%BE%91%E6%89%93%E5%8C%85%E5%9E%8B%E5%85%B3%E5%8D%A1%E8%93%9D%E5%9B%BE)
-   [拆分关卡实例](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine#%E6%8B%86%E5%88%86%E5%85%B3%E5%8D%A1%E5%AE%9E%E4%BE%8B)
-   [运行时关卡实例](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine#%E8%BF%90%E8%A1%8C%E6%97%B6%E5%85%B3%E5%8D%A1%E5%AE%9E%E4%BE%8B)
-   [数据层](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine#%E6%95%B0%E6%8D%AE%E5%B1%82)
-   [关卡流送模式](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine#%E5%85%B3%E5%8D%A1%E6%B5%81%E9%80%81%E6%A8%A1%E5%BC%8F)
-   [嵌入模式](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine#%E5%B5%8C%E5%85%A5%E6%A8%A1%E5%BC%8F)
-   [关卡流送模式](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine#%E5%85%B3%E5%8D%A1%E6%B5%81%E9%80%81%E6%A8%A1%E5%BC%8F-2)