# 虚幻引擎中的程序化内容生成（PCG）群系核心与示例插件术语。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:18:27.664Z

---

目录

![PCG群系术语](https://dev.epicgames.com/community/api/documentation/image/85d324c6-27b9-4b28-831f-7869e2755d8c?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

PCG群系核心和示例插件是关于如何使用[PCG框架](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview)的示例。本文介绍了该项目中使用的许多术语的定义。

## 术语

### 群系核心（Biome Core）

数据驱动型群系创建工具，使用一种提供固定管线的系统性方法编译而成，按逻辑分段排列，附带可自定义的步骤。PCG群系核心插件包含用于程序化生成群系的PCG图表和子图表的集合。

### 群系示例（Biome Sample）

PCG群系示例插件包含关卡、数据资产和自定义PCG图表，用于展示使用群系核心的程序化群系生成。

### 群系Actor（Biome Actors）

群系核心中可用的蓝图Actor，用于设置世界中的群系。这包括群系体积/样条线和群系设置Actor。

### 群系（Biome）

由群系定义和群系资产列表定义的空间体积。

### 发生器（Generator）

一个保存着类型、优先级和发生器图表属性的数据资产，由群系资产条目引用。

### 发生器图表（Generator graph）

生成用于在世界中放置资产的根点的PCG图表。

### 群系资产（Biome Assets）

一个数据资产，包含要由群系核心生成的资产属性。

### 群系缓存（Biome Cache）

用于在世界中存储群系的3D点网格结构。

### 筛选器（Filters）

筛选器图表的列表。

### 筛选器图表（Filter graph

PCG图表根据此图标的逻辑或纹理投射处理点并写入定义。

### 变换图表（Transform graph）

PCG图表获取发生器中的点或父级变换的点，以改变其属性。用于子点的生成和放置。

### 注入的数据（Injected Data）

在群系核心的不同阶段注入的外部数据，用于排除或添加点。基于其在管线中的进入点，划分为不同的类型：排除项、类型、 特定、自定义群系数据。

### 分区（Partitioning）

将体积和处理细分为网格，加快局部更新，并将输出划分为可以单独流送进来的单独Actor。

### 分层生成（Hierarchical Generation）

将体积和处理细分为不同大小的多个网格，PCG图表的各个部分将在其中执行。分层生成通过在不同的网格大小分布计算来加快局部更新，并将数据输出到可以单独流送进来的单独Actor。如需更多信息，请参阅[使用PCG生成模式](/documentation/404)。

### 运行时分层生成（Runtime Hierarchical Generation）

使用PCG图表中配置的每个网格大小的生成半径，基于流送源或PCG生成源组件，在运行时生产网格单元格。使用与分层生成相同的多级网格大小方法。如需更多信息，请参阅[使用PCG生成模式](/documentation/404)。

### 群系核心运行时（Biome Core Runtime）

群系核心运行时是单独的PCG组件和图表，用于摄像机周围的精细资产的运行时生成。

### 运行时资产（Runtime Assets）

一个数据资产，包含要由群系核心运行时生成的资产属性。

### 程序集（Assembly）

PCG数据资产，一个PCG点数据，使用 **资产操作（Asset Action） > 从关卡创建PCG资产（Create PCG Assets from Level(s)）** 从关卡中的所有静态网格体和实例化静态网格体创建和导出。

### 资产选项（Assets options）

资产选项是从单独结构创建的属性的子类别。默认资产选项如下：

-   **调试选项（Debug Options）**
-   **资产选项（Asset Options）**
-   **网格体选项（Mesh Options）**
-   **程序集选项（Assembly Options）**
-   **筛选器选项（Filter Options）**
-   **运行时选项（Runtime Options）**。

### 全局参数（Global parameters）

影响其全局行为的群系核心图表参数。包括筛选器图表、调试缓存显示、群系混合范围和可选的群系地图投射。

### 根点（Root points）

发生器及其图表提供的所有点。

### 子点（Child points）

通过生成子资产的递归变换步骤创建的所有点。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [procedural generation](https://dev.epicgames.com/community/search?query=procedural%20generation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [术语](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E6%9C%AF%E8%AF%AD)
-   [群系核心（Biome Core）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E7%BE%A4%E7%B3%BB%E6%A0%B8%E5%BF%83%EF%BC%88biomecore%EF%BC%89)
-   [群系示例（Biome Sample）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E7%BE%A4%E7%B3%BB%E7%A4%BA%E4%BE%8B%EF%BC%88biomesample%EF%BC%89)
-   [群系Actor（Biome Actors）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E7%BE%A4%E7%B3%BBactor%EF%BC%88biomeactors%EF%BC%89)
-   [群系（Biome）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E7%BE%A4%E7%B3%BB%EF%BC%88biome%EF%BC%89)
-   [发生器（Generator）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E5%8F%91%E7%94%9F%E5%99%A8%EF%BC%88generator%EF%BC%89)
-   [发生器图表（Generator graph）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E5%8F%91%E7%94%9F%E5%99%A8%E5%9B%BE%E8%A1%A8%EF%BC%88generatorgraph%EF%BC%89)
-   [群系资产（Biome Assets）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E7%BE%A4%E7%B3%BB%E8%B5%84%E4%BA%A7%EF%BC%88biomeassets%EF%BC%89)
-   [群系缓存（Biome Cache）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E7%BE%A4%E7%B3%BB%E7%BC%93%E5%AD%98%EF%BC%88biomecache%EF%BC%89)
-   [筛选器（Filters）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E7%AD%9B%E9%80%89%E5%99%A8%EF%BC%88filters%EF%BC%89)
-   [筛选器图表（Filter graph](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E7%AD%9B%E9%80%89%E5%99%A8%E5%9B%BE%E8%A1%A8%EF%BC%88filtergraph)
-   [变换图表（Transform graph）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E5%8F%98%E6%8D%A2%E5%9B%BE%E8%A1%A8%EF%BC%88transformgraph%EF%BC%89)
-   [注入的数据（Injected Data）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E6%B3%A8%E5%85%A5%E7%9A%84%E6%95%B0%E6%8D%AE%EF%BC%88injecteddata%EF%BC%89)
-   [分区（Partitioning）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E5%88%86%E5%8C%BA%EF%BC%88partitioning%EF%BC%89)
-   [分层生成（Hierarchical Generation）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E5%88%86%E5%B1%82%E7%94%9F%E6%88%90%EF%BC%88hierarchicalgeneration%EF%BC%89)
-   [运行时分层生成（Runtime Hierarchical Generation）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E8%BF%90%E8%A1%8C%E6%97%B6%E5%88%86%E5%B1%82%E7%94%9F%E6%88%90%EF%BC%88runtimehierarchicalgeneration%EF%BC%89)
-   [群系核心运行时（Biome Core Runtime）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E7%BE%A4%E7%B3%BB%E6%A0%B8%E5%BF%83%E8%BF%90%E8%A1%8C%E6%97%B6%EF%BC%88biomecoreruntime%EF%BC%89)
-   [运行时资产（Runtime Assets）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E8%BF%90%E8%A1%8C%E6%97%B6%E8%B5%84%E4%BA%A7%EF%BC%88runtimeassets%EF%BC%89)
-   [程序集（Assembly）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E7%A8%8B%E5%BA%8F%E9%9B%86%EF%BC%88assembly%EF%BC%89)
-   [资产选项（Assets options）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E8%B5%84%E4%BA%A7%E9%80%89%E9%A1%B9%EF%BC%88assetsoptions%EF%BC%89)
-   [全局参数（Global parameters）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E5%85%A8%E5%B1%80%E5%8F%82%E6%95%B0%EF%BC%88globalparameters%EF%BC%89)
-   [根点（Root points）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E6%A0%B9%E7%82%B9%EF%BC%88rootpoints%EF%BC%89)
-   [子点（Child points）](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-glossary-in-unreal-engine#%E5%AD%90%E7%82%B9%EF%BC%88childpoints%EF%BC%89)