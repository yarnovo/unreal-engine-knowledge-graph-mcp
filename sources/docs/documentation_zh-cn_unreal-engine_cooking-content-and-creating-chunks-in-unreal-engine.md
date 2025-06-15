# 虚幻引擎中的内容烘焙和数据块划分 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:41:39.067Z

---

目录

![烘焙和数据块划分](https://dev.epicgames.com/community/api/documentation/image/bb59481c-da4e-4994-a739-0480866ce80a?resizing_type=fill&width=1920&height=335)

当你 **烘焙** 项目时，**虚幻引擎** 可以将你的游戏资产分成单独的 **数据块（chunk）**，这些数据块可以单独发布，例如以DLC和补丁形式发布。数据块是由引擎的资产管理系统识别的带编号资产集，当烘焙项目时，每个数据块都会生成 **.pak** 文件，然后你可以通过内容分发系统进行发布。

你可以使用 **[资产管理器](/documentation/zh-cn/unreal-engine/asset-management-in-unreal-engine)** 或使用 **主要资产标签** 将资产指定为属于特定数据块。两者都使用规则和元数据系统构造数据块，然后在烘焙过程中读取这些数据块。以下分段概述了如何使用这些工具，以及如何与编辑器中的数据块进行交互。

## 了解主资产规则

**主资产** 是可以由资产管理器直接操作的资产，而 **次资产** 是当主要资产引用它们时自动加载的资产。主资产是在烘焙和数据块划分过程中引用的类型。

**主资产规则** 用于决定哪些主资产对哪些次资产拥有管理权限，以及在烘焙过程中如何处理资产。这些规则由 `FPrimaryAssetRules` 结构体所定义，由[资产管理器](/documentation/zh-cn/unreal-engine/asset-management-in-unreal-engine)所使用，以便决定烘焙时的资产处理方式。如需了解 `FPrimaryAssetRules` 中可用选项的详细信息，请查看其[API页面](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/FPrimaryAssetRules)。你也需要查看 `EPrimaryAssetCookRule` [API页面](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/EPrimaryAssetCookRule)上定义的烘焙规则。

主资产规则的功能之一是整理数据块。通过定义规则并为其赋予 **数据块ID**，所有属于该规则的主资产都将被划分为具有该ID号的数据块。这些主资产有权管理的任何次资产都将与它一起进行数据块划分。

### 数据块整理

任何未提供特定数据块ID或提供负数据块ID的资产都将打包为数据块0的一部分，数据块0是随游戏基本数据一起分发的"默认"数据块。ID值大于0的所有数据块在烘焙时都将分为不同的.pak文件。你可以采用适合你项目的任何方式整理数据块。例如，ShooterGame示例项目包含三个数据块：

-   面向"避难所"地图的数据块1
-   面向"高层建筑"地图的数据块2
-   面向所有其他数据的数据块0

ShooterGame将地图识别为主资产，因此，只要地图拥有次资产的管理权限，地图使用的任何次资产（例如纹理或网格体）都将使用次资产所属地图的数据块ID。

再举一个例子，如果你正在创建MOBA或任何其他"英雄主题"游戏，你需要将不同英雄的基础资产划分为特定的数据块，然后你可以将任何其他服装或皮肤也划分为各自的数据块，以便将它们单独分发。

## 在项目中定义数据块

虚幻引擎提供了几种用于管理主资产规则和定义数据块的方法。你可以在资产管理器中定义主资产规则，直接在你的 `*Game.ini` 文件中对其进行编辑，你也可以在内容浏览器中使用主资产标签。

### 通过资产管理器定义数据块

你可以打开 **项目设置（Project Settings）** 并导航到 **游戏（Game）** > **资产管理器（Asset Manager）**，手动编辑项目的主资产规则。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ed67d38-41aa-47a0-bcaf-5246af4feb29/primaryassetrulesprojectsettings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ed67d38-41aa-47a0-bcaf-5246af4feb29/primaryassetrulesprojectsettings.png)

在资产管理器的设置中编辑主资产规则。点击查看大图。

**要扫描的主资产类型（Primary Asset Types to Scan）** 指定你要资产管理器将其识别为主资产的资产类型。你可以通过 **主资产规则（primary asset rules）** 列表指定单个主资产的 **优先级** 和 **数据块ID**。

### 使用配置中的规则重载定义数据块

配置中的 **规则重载** 可用于建立特定主资产的优先级和数据块设置。要使用规则重载替代主资产标签构建ShooterGame的三数据块设置，需要在 `DefaultGame.ini` 中创建以下分段：

```cpp
	[/Script/Engine.AssetManagerSettings]
	+PrimaryAssetRules=(PrimaryAssetId="Map:/Game/Maps/Sanctuary",Rules=(Priority=-1,ChunkId=1,CookRule=Unknown))
	+PrimaryAssetRules=(PrimaryAssetId="Map:/Game/Maps/Highrise",Rules=(Prority=-1,ChunkId=2,CookRule=Unknown))
	+PrimaryAssetRules=(PrimaryAssetId="Map:/Game/Maps/ShooterEntry",Rules=(Priority=-1,ChunkId=0,CookRule=AlwaysCook))

```

DefaultGame.ini文件中的烘焙和数据块划分规则。我们已在此例中的初始地图"ShooterEntry"中添加一个显式引用。

这将把我们的主游戏地图设置到特定的数据块中，会使所有引用也被添加到这些数据块。最终的条目管理数据块0，确保游戏首次启动时加载的地图引用的任何内容将保存在数据块0（同时也是默认数据块）中。-1的优先级值将把优先级设为默认值1。

### 通过主资产标签定义数据块

主资产标签是一种数据资产类型，可以指定用于烘焙和数据块划分的其他资产。与为单个资产创建规则相比，它们的操作可以更快完成。

![内容浏览器中的主资产标签示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e537ba5-615d-443d-961c-7daaa536708d/primaryassetlabels.png)

内容浏览器中的主资产标签示例。

要创建主资产标签，请在 **内容浏览器** 中 **右键点击**，然后点击 **杂项（Miscellaneous）** > **数据资产（Data Asset）**。

![在内容浏览器中创建数据资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5217b3dc-aa59-4aba-9700-ded9c00d9092/createdataasset.png)

在 **选择数据资产类（Pick Data Asset Class）** 菜单中，选择 **PrimaryAssetLabel**，然后点击 **选择（Select）**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dab4894f-35c5-4485-b87b-cd63db9d6f42/pickdataassetclass.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dab4894f-35c5-4485-b87b-cd63db9d6f42/pickdataassetclass.png)

当你创建新数据资产时，将弹出选择数据资产类（Pick Data Asset Class）菜单。点击查看大图。

你的新主资产标签将在 **内容浏览器** 中创建。如果你 **双击** 它，你可以编辑其数据。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79aba02d-429d-4e19-9520-28acc4c7de84/highriselabel.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79aba02d-429d-4e19-9520-28acc4c7de84/highriselabel.png)

ShooterGame中HighriseLabel主资产标签的设置。点击查看大图。

就像资产管理器中的主资产规则一样，主资产标签同时包含 **数据块ID** 和 **优先级**。但是，你可以一次在主资产标签中将这些规则应用于多个资产。你可以通过 **显示资产（Explicit Assets）** 字段指定特定资产的列表，也可以指定 **资产集** 属于此标签。或者，你可以选中 **我的目录中的标签资产（Label Assets in My Directory）**，然后主资产标签将影响内容浏览器中同一文件夹下的所有资产。

## 打包数据块

定义数据块ID后，打包项目将自动为每个数据块创建.pak文件。你可以在项目的 `Saved/StagedBuilds/[PlatformName]/[ProjectName]/Content/Paks` 文件夹中找到它们。

![Pak文件在StagedBuilds中的位置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1eea5abe-7fbc-47e9-95b4-ec47fb622bf5/pakfilelocation.png)

打包的.pak文件位于Content/Paks目录平台和项目的子文件夹下的StagedBuilds文件夹中。

.Pak文件基于你打包的平台生成，因此它们在平台之间不可互换。生成文件后，你就可以在你选择的分发系统中使用它们。

## 分析资产到数据块的分配

UE4提供了若干个内置工具，用于审计数据块。借助这些工具，你可以查看哪些资产被分配到哪些数据块，哪些源头赋予了它们这些分配任务，以及关于分块资产的大小信息。

### 资产审计窗口

要打开 **资产审计窗口（Asset Audit Window）**，请打开 **窗口（Windows）** 下拉菜单，展开 **开发者工具（Developer Tools）**，然后选择 **资产审计（Asset Audit）**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c47f3b10-7034-4d2a-ba0d-586eebec604a/assetauditinmenu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c47f3b10-7034-4d2a-ba0d-586eebec604a/assetauditinmenu.png)

点击查看大图。

资产审计窗口将会显示，但会是空白的。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1dd67e9c-3b33-4739-96fd-18e4b223dddf/assetauditempty.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1dd67e9c-3b33-4739-96fd-18e4b223dddf/assetauditempty.png)

资产审计窗口初次打开时的效果。点击查看大图。

单击 **添加数据块（Add Chunks）** 按钮将在窗口中填充当前项目中存在的所有数据块的摘要。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb059593-8335-4d35-a0e3-436864c06f16/assetauditpopulated.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb059593-8335-4d35-a0e3-436864c06f16/assetauditpopulated.png)

在ShooterGame中，资产分布在三个数据块之间。点击查看大图。

要检查单个数据块，请右键单击它并选中 **大小贴图（Size Map）** 或 **引用查看器（Reference Viewer）**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f80cf070-47f4-4f6c-b331-fb099d1db243/assetauditrightclick.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f80cf070-47f4-4f6c-b331-fb099d1db243/assetauditrightclick.png)

点击查看大图。

### 大小贴图

大小贴图直观地显示了数据块中包含的每个资产的类型和大小。资产显示为彩色框，框中包含图标或缩略图，且资产已按比例缩放以展示资产的大小。框嵌套在其他框中表示父-子引用关系。例如，材质引用的纹理显示在材质的框中，因为加载材质会隐式加载纹理。

在ShooterGame中，数据块0包含显示游戏菜单并进入游戏所需的资产，而数据块1和数据块2用于游戏的可玩地图。因此，数据块0比其他数据块小，并且资产的类型更加多样化。在这里，我们可以看到数据块0和数据块1的资产细分和总发布磁盘大小：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/affd73a4-1091-48d3-a722-657344785ee9/sizemapchunk0disksize.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/affd73a4-1091-48d3-a722-657344785ee9/sizemapchunk0disksize.png)

ShooterGame的数据块0包含许多独立的资产，但相对较小。点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f79ab7b-01b3-47d3-a015-bfb0e8da0860/sizemapchunk1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f79ab7b-01b3-47d3-a015-bfb0e8da0860/sizemapchunk1.png)

数据块1（如图所示）和数据块2包含进行游戏的各个地图，因此它们具有单个、较大的连接资产组。点击查看大图。

大小贴图还支持可视化它所包含资产的内存使用情况（在编辑器中）。对于同一组资产，编辑器内的内存大小可能与发布产品的磁盘空间使用情况有很大不同。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0b9e78e-85a7-406c-af22-039ae9bb09e9/sizemapchunk0memorysize.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0b9e78e-85a7-406c-af22-039ae9bb09e9/sizemapchunk0memorysize.png)

数据块0以内存大小模式显示。此模式根据编辑器中资产的内存使用情况调整框的大小。点击查看大图。

可以右键单击资产的框来检查或编辑各个资产。你可以使用鼠标滚轮放大或缩小，或者双击某个资产展开它，使其填充窗口。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29e413a4-3df9-41e5-8cd0-a532eff2c7c8/sizemapchunk0rightclick.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29e413a4-3df9-41e5-8cd0-a532eff2c7c8/sizemapchunk0rightclick.png)

"loading screen"纹理资产的右键单击菜单。点击查看大图。

### 引用查看器

[引用查看器](/documentation/zh-cn/unreal-engine/reference-viewer-in-unreal-engine)生成一个图表，该图表将资产间引用表示为资产本身之间的一个连接网。可以使用此工具查看数据块和各个资产。在ShooterGame示例中，查看数据块1时将仅显示两个直接连接的资产："Sanctuary"地图，以及与数据块1关联的主资产标签。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ca9fb13-16e7-404e-b656-7f8df9f62a12/referenceviewerchunk1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ca9fb13-16e7-404e-b656-7f8df9f62a12/referenceviewerchunk1.png)

引用查看器关于ShooterGame中数据块1直接引用的资产的图表。已右键单击Sanctuary地图资产的节点。点击查看大图。

在内容浏览器或引用查看器中右键单击一个节点并选择"重新居中图表（Re-Center Graph）"（或在引用查看器中双击该节点）将显示该节点的引用。在下图中，我们从居中数据块1更改为居中"Map:/Game/Maps/Sanctuary"节点，显示出"Sanctuary"地图被其左侧的两个节点（数据块1和数据块1的主资产标签）引用，同时引用了其右侧了许多子节点，例如"M\_FFA\_Wall\_01"材质：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10878411-de12-4570-835e-930dd7c5fb7f/referenceviewerchunk1map.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10878411-de12-4570-835e-930dd7c5fb7f/referenceviewerchunk1map.png)

在引用查看器中查看ShooterGame的"Sanctuary"地图（数据块1的一部分）。点击查看大图。

上面显示的图表并不完整。它受到引用查看器中选项设置的限制。限制图表的范围可以大大减少引擎在构建图表时所花费的时间。有关这些选项的详细信息，请参阅[引用查看器页面](/documentation/zh-cn/unreal-engine/reference-viewer-in-unreal-engine)。

通过这种方式浏览引用，你可以确切地了解为什么给定资产与另一个资产或数据块相关联。这可以帮助发现和删除不必要的资产引用，或者调整数据块划分策略以更好地满足项目的需要。

-   [assets](https://dev.epicgames.com/community/search?query=assets)
-   [asset management](https://dev.epicgames.com/community/search?query=asset%20management)
-   [cooking](https://dev.epicgames.com/community/search?query=cooking)
-   [chunking](https://dev.epicgames.com/community/search?query=chunking)
-   [patching](https://dev.epicgames.com/community/search?query=patching)
-   [dlc](https://dev.epicgames.com/community/search?query=dlc)
-   [downloadable content](https://dev.epicgames.com/community/search?query=downloadable%20content)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [了解主资产规则](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine#%E4%BA%86%E8%A7%A3%E4%B8%BB%E8%B5%84%E4%BA%A7%E8%A7%84%E5%88%99)
-   [数据块整理](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine#%E6%95%B0%E6%8D%AE%E5%9D%97%E6%95%B4%E7%90%86)
-   [在项目中定义数据块](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine#%E5%9C%A8%E9%A1%B9%E7%9B%AE%E4%B8%AD%E5%AE%9A%E4%B9%89%E6%95%B0%E6%8D%AE%E5%9D%97)
-   [通过资产管理器定义数据块](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine#%E9%80%9A%E8%BF%87%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%99%A8%E5%AE%9A%E4%B9%89%E6%95%B0%E6%8D%AE%E5%9D%97)
-   [使用配置中的规则重载定义数据块](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine#%E4%BD%BF%E7%94%A8%E9%85%8D%E7%BD%AE%E4%B8%AD%E7%9A%84%E8%A7%84%E5%88%99%E9%87%8D%E8%BD%BD%E5%AE%9A%E4%B9%89%E6%95%B0%E6%8D%AE%E5%9D%97)
-   [通过主资产标签定义数据块](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine#%E9%80%9A%E8%BF%87%E4%B8%BB%E8%B5%84%E4%BA%A7%E6%A0%87%E7%AD%BE%E5%AE%9A%E4%B9%89%E6%95%B0%E6%8D%AE%E5%9D%97)
-   [打包数据块](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine#%E6%89%93%E5%8C%85%E6%95%B0%E6%8D%AE%E5%9D%97)
-   [分析资产到数据块的分配](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine#%E5%88%86%E6%9E%90%E8%B5%84%E4%BA%A7%E5%88%B0%E6%95%B0%E6%8D%AE%E5%9D%97%E7%9A%84%E5%88%86%E9%85%8D)
-   [资产审计窗口](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine#%E8%B5%84%E4%BA%A7%E5%AE%A1%E8%AE%A1%E7%AA%97%E5%8F%A3)
-   [大小贴图](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine#%E5%A4%A7%E5%B0%8F%E8%B4%B4%E5%9B%BE)
-   [引用查看器](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine#%E5%BC%95%E7%94%A8%E6%9F%A5%E7%9C%8B%E5%99%A8)

相关文档

[

资产管理

![资产管理](https://dev.epicgames.com/community/api/documentation/image/3fefe7a7-0de5-41c3-bc2a-7ae55fc99695?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/asset-management-in-unreal-engine)