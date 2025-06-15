# 虚幻引擎中的程序化内容生成（PCG）群系核心和示例插件快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-quick-start-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:18:02.828Z

---

目录

![PCG群系快速入门](https://dev.epicgames.com/community/api/documentation/image/9a22c2f7-eb30-41eb-a5f3-87542d97b471?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

PCG群系核心和示例插件是关于如何将[PCG框架](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview)用于属性集表、反馈循环、递归子图表和[运行时分层生成](/documentation/404)等功能的示例。

## 基本要求

本小节涵盖了让PCG群系核心在世界中正常运行所需的基本要求和所有步骤。

## 启用插件

PCG群系核心和示例是两个不同的插件。PCG群系核心插件是独立的，仅包含使群系创建工具正常运行所需的内容，依赖PCG框架和PCG几何体脚本互操作插件。PCG群系示例插件是展示群系创建工具的内容示例，可以在所有项目中启用，并依赖PCG群系核心插件。

要启用插件，请打开插件设置并启用PCG群系核心以访问工具，或者启用PCG群系示例以访问工具和内容示例。如需详细了解如何启用插件，请参阅[使用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e87a2dbf-f619-47e8-a0f2-c12bb330cebd/pcg-biome-quick-start-image-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e87a2dbf-f619-47e8-a0f2-c12bb330cebd/pcg-biome-quick-start-image-1.png)

## 资源

要访问与PCG群系核心和示例插件相关的所有内容，必须启用 **显示引擎内容（Show Engine Content）** 和 **显示插件内容（Show Plugin Content）** 内容浏览器设置。方法是打开 **内容浏览器（Content Browser）** 中的 **设置（Settings）** 菜单，并点击两个选项旁边的复选框。

![PCG群系快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b61c296f-f6a2-4fd7-ad35-43d4aa5113b7/pcg-biome-quick-start-image-18.png "PCG Biome Quick Start") ![PCG群系快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca815356-b39f-4989-aa4b-8f1419c80e7a/pcg-biome-quick-start-image-2.png "PCG Biome Quick Start")

内容浏览器路径：

`/All/EngineData/Plugins/PCGBiomeCore`

`/All/EngineData/Plugins/PCGBiomeSample`

磁盘路径：

`..\Engine\Plugins\Experimental\PCGBiomeCore\`

`..\Engine\Plugins\Experimental\PCGBiomeSample\`

### PCG群系核心内容

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e737623-b639-4937-9a3d-65a1309a2a2b/pcg-biome-quick-start-image-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e737623-b639-4937-9a3d-65a1309a2a2b/pcg-biome-quick-start-image-3.png)

所有基础蓝图类位于： `/All/EngineData/Plugins/PCGBiomeCore/Blueprints`

**BP\_PCGBiomeCore** 是主蓝图类，预配置了PCG组件，该组件会引用BiomeCore PCG图表，并将盒体碰撞组件作为其体积。

位于插件根目录的BiomeCore PCG图表是用于执行群系核心正常运行所需所有逻辑的源和主图表。它包含多个子图表及其自己的嵌套子图表。所有这些单独的子图表都存储在"Core"文件夹下。

BiomeCore图表： `/Script/PCG.PCGGraph'/PCGBiomeCore/BiomeCore.BiomeCore'`

该工具依赖多个 **数据资产（Data Assets）** ，这些是带有特定结构的预制类，用于生成内容。这些资产是 **BiomeDefinitions** 、 **BiomeAssets** 和 **BiomeGenerators** 。它们位于其相应文件夹和 `../Setup` 子文件夹中。每种类型的默认资产也可用于测试和调试。

### PCG群系示例内容

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d21d2c3f-d604-43fb-a2c0-28d367f7beb1/pcg-biome-quick-start-image-4.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d21d2c3f-d604-43fb-a2c0-28d367f7beb1/pcg-biome-quick-start-image-4.png)

**BiomeSampleLevel** 世界位于： `/All/EngineData/Plugins/PCGBiomeSample/Maps`

世界包含预配置的BP\_PCGBiomeCore、群系设置、体积和样条线Actor，因而最适合作为起始点来了解如何设置并理解工具。

示例包含多个群系、发生器和资产，以及自定义结构和从群系核心基类继承的数据资产类。它们全部位于其相应的BiomeSample文件夹和 `../Setup` 子文件夹中。

此外，PCG群系示例插件还包含额外数据，包括位于Tiles文件夹中的BiomeMap纹理、图块化Flow和SunExposure texture2Darray，以及示例PCG程序集、网格体和筛选器图表实例。

## 世界设置

这是关于从头开始使用群系创建工具的分步快速入门指南，接着是关于如何添加新群系和资产的说明。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01db188c-604d-468a-b63d-a6caaf07e34c/pcg-biome-quick-start-image-5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01db188c-604d-468a-b63d-a6caaf07e34c/pcg-biome-quick-start-image-5.png)

1.  创建新的关卡或打开现有世界。PCG群系核心适用于使用分区和非分区关卡的[世界分区](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)。
    
2.  通过地形编辑器模式添加符合所需世界场景比例的新地形。如果从开放世界模板或带有现有地形的现有关卡开始，则不需要执行操作。
    
    处理PCG群系核心时，地形是 **可选的**。
    
3.  添加或拖放 **BP\_PCGBiomeCore** Actor到关卡中。提供的BP\_PCGBiomeCore蓝图类位于此处：`/Script/Engine.Blueprint'/PCGBiomeCore/Blueprints/BP_PCGBiomeCore.BP_PCGBiomeCore'`
    
4.  将BP\_PCGBiomeCore Actor的体积组件比例调整为所需世界覆盖范围。工具使用此体积来约束其生成和输出。为获得最佳性能，应该仔细调整体积以适应地形或环境，包括高度。默认比例是1024 x 1024 x 256米。
    
5.  在关卡中选择 **BP\_PCGBiomeCore** Actor的"**BiomeCore**"PCG组件，并点击 **生成（Generate）** 以初始化生成的状态，以便实时更新。在此阶段，关卡中一般不会发生什么。
    

在继续设置[群系、发生器和资产](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-quick-start-guide-in-unreal-engine#%E7%BE%A4%E7%B3%BB-%E5%8F%91%E7%94%9F%E5%99%A8%E5%92%8C%E8%B5%84%E4%BA%A7%E8%AE%BE%E7%BD%AE)之前，通过以下操作验证之前的步骤：

-   在 **DefaultBiomeVolume/Spline actor** 体积中添加或拖放 **DefaultBiomeVolume/Spline Actor** 。
    
    **预期结果**：将进行自动刷新，同时调试立方体网格体将在DefaultBiomeVolume/Spline和BiomeCore体积中约束的地形表面上生成。
    
    如果没有进行刷新或没有生成调试立方体，请验证是否使用 **生成（Generate）** 按钮（见上述第5步）触发了BiomeCore PCG组件一次，以及DefaultBiomeVolume/Spline Actor是否位于BiomeCore体积内并与地形表面重叠。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a110480a-71ff-4f53-bd70-ee6fb565d757/pcg-biome-quick-start-image-6.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a110480a-71ff-4f53-bd70-ee6fb565d757/pcg-biome-quick-start-image-6.png)
    
-   添加DefaultBiomeVolume/Spline之后，可以启用群系缓存调试显示，以验证群系覆盖范围和创建。BiomeCore PCG组件包含所有全局参数。要查看群系缓存，请重载并启用"**调试 - 显示群系缓存（Debug - Display Biome Cache）**" 选项。如需详细了解群系缓存，请参阅[群系缓存](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-reference-guide-in-unreal-engine#%E7%BE%A4%E7%B3%BB%E7%BC%93%E5%AD%98)。
    
    **预期结果：**将进行自动刷新，显示缓存体素。默认未定义群系颜色是黑色，预配置的DefaultBiomeVolume/Spline Actor群系颜色是白色。白色缓存体素应该显示在放置DefaultBiomeVolume/Spline的地方。
    
    如果群系缓存未显示，请确保使用 **生成（Generate）** 按钮（上述第5步）触发了BiomeCore PCG组件一次，并且该选项在BiomeCore PCG组件上被重载并启用。如果整个缓存变成黑色，请将DefaultBiomeVolume/Spline Actor移至BiomeCore体积内。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf09b68d-7184-4ffa-a0e2-e73b21de8955/pcg-biome-quick-start-image-7.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf09b68d-7184-4ffa-a0e2-e73b21de8955/pcg-biome-quick-start-image-7.png)
    
-   验证了BiomeCore可按预期工作之后，从世界中删除DefaultBiomeVolume/Spline。
    

## 群系、发生器和资产设置

原始世界设置完成并验证后，继续执行以下步骤，使用定义和资产创建新群系：

1.  在世界中的群系核心Actor体积中添加或拖放 **BP\_PCGBiomeVolume** 或 **BP\_PCGBiomeSpline** Actor，与地形表面重叠。下面提供了蓝图类：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7ed73d2-6bfd-475f-9b0b-f6c57de1c602/pcg-biome-quick-start-image-8.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7ed73d2-6bfd-475f-9b0b-f6c57de1c602/pcg-biome-quick-start-image-8.png)
    
    BP\_PCGBiomeVolume：`/Script/Engine.Blueprint'/PCGBiomeCore/Blueprints/BP_PCGBiomeVolume.BP_PCGBiomeVolume'`
    
    BP\_PCGBiomeSpline：`/Script/Engine.Blueprint'/PCGBiomeCore/Blueprints/BP_PCGBiomeSpline.BP_PCGBiomeSpline'`
    
2.  为群系定义、发生器和资产创建一组新的数据资产。数据资产可以通过内容浏览器的"添加（ADD）"按钮添加、通过右键点击菜单"数据资产"添加，或从相同类的现有资产复制。
    
3.  **群系定义**：在项目的 **class BiomeDefinitionTemplate** 的内容文件夹中添加新数据资产，并设置其 **BiomeName**、**BiomeColor**、**BiomePriority** 属性。
    
    这些属性将定义你的群系，定义资产可以在一个世界或多个世界中的多个群系体积和样条线间共享和复用，但其设置相较于其他群系定义资产必须唯一。为群系缓存启用调试显示时，将显示BiomeColor。
    
    ![PCG群系快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7199bca5-8ed0-4374-9cd6-829f4e522b2c/pcg-biome-quick-start-image-9.png "PCG Biome Quick Start")
    
    如需详细了解群系定义，请参阅[群系定义](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-reference-guide-in-unreal-engine#%E7%BE%A4%E7%B3%BB%E5%AE%9A%E4%B9%89)。
    
4.  **群系发生器**：在项目的 **class BiomeGeneratorTemplate** 的内容文件夹中添加新数据资产，并设置其 **GeneratorType**、**GeneratorPriority** 和 **GeneratorGraph** 属性。
    
    这些属性将定义你的发生器，发生器资产可以且应该在多个资产间共享和复用，它提供了要在其中分配资产和生成的关联GeneratorGraph PCG图表中的初始点数据。
    
    ![PCG群系快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4bfe3806-219b-4847-b429-3453496dc01b/pcg-biome-quick-start-image-10.png "PCG Biome Quick Start")
    
    **GeneratorGraph** 是一个PCG图表或PCG图表实例，它输出其通过对世界、地形或任何所需逻辑取样所创建的点数据。首先，复制下面的 **BiomeGenerator\_Template** 图表：
    
    `/Script/PCG.PCGGraph'/PCGBiomeCore/BiomeGenerators/Graphs/BiomeGenerator_Template.BiomeGenerator_Template'`
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1d32cbd-c85f-41f1-80ea-77b0c3111c68/pcg-biome-quick-start-image-11.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1d32cbd-c85f-41f1-80ea-77b0c3111c68/pcg-biome-quick-start-image-11.png)
    
    如需详细了解群系发生器，请参阅[发生器](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-reference-guide-in-unreal-engine#%E5%8F%91%E7%94%9F%E5%99%A8)。
    
5.  **群系资产**：在项目的 **class BiomeAssetTemplate** 的内容文件夹中添加新数据资产，然后添加新群系资产数组条目并设置其 **发生器（Generator）** ，这是对上面创建的群系发生器数据资产的必需引用，还要设置一个网格体，这是要生成的视觉效果。
    
    群系资产数组是要处理和生成的资产的集合。每个条目包含要配置的多个属性，拥有相同发生器引用的资产随机分布到生成的点上。群系资产列表也可以在多个群系间共享和复用。
    
    ![PCG群系快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/532c7c18-f74b-4552-a60d-a028ad380b64/pcg-biome-quick-start-image-12.png "PCG Biome Quick Start")
    
    如需详细了解群系资产，请参阅[群系资产和结构](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-reference-guide-in-unreal-engine#%E7%BE%A4%E7%B3%BB%E8%B5%84%E4%BA%A7%E5%92%8C%E7%BB%93%E6%9E%84)。
    
6.  为第1步中添加到世界的BP\_PCGBiomeVolume分配群系定义和资产。
    
    ![PCG群系快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3bcdef7-a310-4a79-8b63-763e6834787a/pcg-biome-quick-start-image-13.png "PCG Biome Quick Start")

执行这些步骤后，将进行自动刷新，BP\_PCGBiomeVolume和群系核心体积中约束的新群系将生成定义的资产。

完成此初始配置后，可以使用更多发生器和资产扩展群系。可以使用相同过程创建任意数量的群系，它们可以在同一个世界或多个世界中并存，请参阅PCGBiomeSample插件中的BiomeSampleLevel，了解完整设置。

在此图中，群系配置了仅引用和共享2个自定义发生器（一个用于树，一个用于岩石）的多个资产。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d87c6e64-2ef6-4b93-a104-051dcdee8bbd/pcg-biome-quick-start-image-14.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d87c6e64-2ef6-4b93-a104-051dcdee8bbd/pcg-biome-quick-start-image-14.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1740166e-fdaf-4dae-9642-0a5c12881b30/pcg-biome-quick-start-image-15.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1740166e-fdaf-4dae-9642-0a5c12881b30/pcg-biome-quick-start-image-15.png)

使用重叠BP\_PCGBiomeSpline Actor和64米群系混合范围在添加多个更高优先级的群系及其相应资产后。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a3757db-27eb-496e-a3aa-dad3ebe8f06f/pcg-biome-quick-start-image-16.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a3757db-27eb-496e-a3aa-dad3ebe8f06f/pcg-biome-quick-start-image-16.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6e830a5-2af7-4beb-bdac-c74074ddb4cf/pcg-biome-quick-start-image-17.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6e830a5-2af7-4beb-bdac-c74074ddb4cf/pcg-biome-quick-start-image-17.png)

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [procedural generation](https://dev.epicgames.com/community/search?query=procedural%20generation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [基本要求](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-quick-start-guide-in-unreal-engine#%E5%9F%BA%E6%9C%AC%E8%A6%81%E6%B1%82)
-   [启用插件](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-quick-start-guide-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%8F%92%E4%BB%B6)
-   [资源](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-quick-start-guide-in-unreal-engine#%E8%B5%84%E6%BA%90)
-   [PCG群系核心内容](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-quick-start-guide-in-unreal-engine#pcg%E7%BE%A4%E7%B3%BB%E6%A0%B8%E5%BF%83%E5%86%85%E5%AE%B9)
-   [PCG群系示例内容](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-quick-start-guide-in-unreal-engine#pcg%E7%BE%A4%E7%B3%BB%E7%A4%BA%E4%BE%8B%E5%86%85%E5%AE%B9)
-   [世界设置](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-quick-start-guide-in-unreal-engine#%E4%B8%96%E7%95%8C%E8%AE%BE%E7%BD%AE)
-   [群系、发生器和资产设置](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-quick-start-guide-in-unreal-engine#%E7%BE%A4%E7%B3%BB%E3%80%81%E5%8F%91%E7%94%9F%E5%99%A8%E5%92%8C%E8%B5%84%E4%BA%A7%E8%AE%BE%E7%BD%AE)