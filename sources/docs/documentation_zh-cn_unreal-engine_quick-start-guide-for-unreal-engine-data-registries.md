# 虚幻引擎数据注册表快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/quick-start-guide-for-unreal-engine-data-registries
> 
> 生成时间: 2025-06-14T19:44:53.077Z

---

目录

![数据注册表快速入门](https://dev.epicgames.com/community/api/documentation/image/012862b8-3583-4fcc-896a-bd50571c42d3?resizing_type=fill&width=1920&height=335)

在开始使用 **数据注册表（Data Registries）** 之前，需要先启用数据注册表插件，然后便可以创建和配置你的第一个数据注册表，并向其中填充数据。

1.  要启用数据注册表插件，找到 **编辑（Edit）** > **插件（Plugins）**。在 **插件（Plugins）** 窗口中搜索，或者浏览所有插件来找到 **Gameplay** 分类下的 **数据注册表（Data Registry）** 插件。找到插件后，确保勾选 **启用（Enabled）** 复选框。
    
    如果插件窗口提示你需要重启编辑器来使插件生效，请在执行更多操作之前进行重启。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a530486c-100f-4952-ba66-ea4961a82d30/enableplugin.png)
2.  选择 **编辑（Edit）** > **项目设置（Project Settings）** 打开 **项目设置（Project Settings）**
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cf9c7e1-23bc-48e1-a389-44bd5fd51d3e/projectsettings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cf9c7e1-23bc-48e1-a389-44bd5fd51d3e/projectsettings.png)
    
3.  在左侧面板的 **游戏（Game）** 部分，可以看到一个分类 **数据注册表（Data Registry）**。
    
    如果找不到该分类，确保你启用了 **数据注册表（Data Registry）** 插件，并且在启用后重启了编辑器至少一次。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6e5b216-070a-4abc-8fd9-458ed1893701/dataregistry.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6e5b216-070a-4abc-8fd9-458ed1893701/dataregistry.png)
    
4.  在右侧面板中，将至少一个条目添加到 **要扫描的目录（Directories to Scan）** 数组。这会告知系统在何处查找数据注册表资产。`/Game/DataRegistries`就是一个典型的条目，但是目录的添加数量不受限制，具体取决于你要为项目使用怎样的组织模式。你可以趁此机会检查你指定的所有目录都存在，并验证你创建的数据注册表资产都在正确的位置。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9275a018-fb84-43ae-8e6f-6ae578d32bf0/directorysearch.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9275a018-fb84-43ae-8e6f-6ae578d32bf0/directorysearch.png)
    
5.  导航至你在内容浏览器的 **要扫描的目录（Directories to Scan）** 中指定的目录之一，然后添加新的数据注册表资产。右键点击右侧面板中的空白位置并展开上下文菜单中的 **杂项（Miscellaneous）**，即可完成此操作。在展开的上下文菜单中，选择 **DataRegistry**，然后从显示的列表中选择合适的子类。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eedae4ac-540c-49cb-9e62-fd37c3c90520/createnewdataregistry.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eedae4ac-540c-49cb-9e62-fd37c3c90520/createnewdataregistry.png)
    
6.  为新数据注册表命名并将其打开。
    
7.  在 **注册表类型（Registry Type）** 字段中输入全局唯一名称。如果希望使用[游戏标签](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine)来辨识此数据注册表中的资产，请确保在 **ID格式（ID Format）** 类别下的 **基本Gameplay标签（Base Gameplay Tag）** 字段中对其进行设置。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbbf8943-095a-4e34-bc59-b0f2c6469947/typeandtag.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbbf8943-095a-4e34-bc59-b0f2c6469947/typeandtag.png)
    
8.  将 **项结构体（Item Struct）** 字段设置为此数据注册表将包含的结构体类型。这通常是 **DataTableRowHandle** 或 **SimpleCurve**，但可以是任何数据类型。但是，
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bceff116-e289-42c5-a39d-d054af25b7ef/itemstructdropdownsearch.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bceff116-e289-42c5-a39d-d054af25b7ef/itemstructdropdownsearch.png)
    
9.  将一个或多个数据源添加到 **数据源（Data Sources）** 数组。必须为每个条目选择要添加的数据类型，并指定数据来源。你可以使用内置的数据类型，也可以添加你的项目或任何启用的插件所定义的类型。此时，你需要提供一些数据供数据注册表管理。
    
    \* 对于从已知与现存资产中采集行数据的简单源类型，例如 **DataTable源（DataTable Source）** 或 **CurveTable源（CurveTable Source）**，请选择要读取的源资产。**表规则（Table Rules）** 分段介绍了来自你指定的资产的数据行的缓存行为，因此请检查这些规则是否适用于你的用例。
    
    *对于在运行时生成新数据源的 **DataTable元数据源（DataTable Meta Source）** 或 **CurveTable元数据源（CurveTable Meta Source）**，还有一些其他设置需要处理。选择要生成的源类型、适用于所生成源的任何访问或引用规则，以及用于确定系统在查找资产时的扫描或使用规则。元数据源可以扫描资产或者接受已注册的资产（采用C++代码），也可以同时实现这两种操作。* 举例来说，你可以将搜索路径指定为 `/Game/SearchableDataTables`，但排除 `*PrivateData*`；如此一来将会删除所有包含子字符串"PrivateData"的路径，因此不会扫描 `/Game/SearchableDataTables/PrivateData/` 和 `/Game/SearchableDataTables/SubPath/SomePrivateDataHere/` 这样的路径。
    
10.  完成数据源的设置之后，配置 **缓存规则（Cache Rules）** 来满足项目的特定需求。要查找你可以配置的设置，请展开数据注册表编辑器中的 **缓存（Cache）** 分段。
    
    由于数据注册表功能仍在开发中，某些设置可能无法按照预期工作。
    
11.  你可以趁此机会检查数据注册表中是否包含了你所期望的项。点击工具栏上的 **刷新（Refresh）** 按钮，并审核 **注册表预览（Registry Preview）** 选项卡上的内容，在这里可以预览数据注册表当前已知的所有项。如果结果不符合你的预期，请修改数据源规则，然后再次点击 **刷新（Refresh）** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ec04d52-235f-4c1d-a0bd-20d4c052da71/typeandtag.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ec04d52-235f-4c1d-a0bd-20d4c052da71/typeandtag.png)
    
    如果有多个源拉取了行，那么行可能会在列表中多次出现；这不是错误，通常表示元数据源将相同的数据当作了简单源或其他元数据源。但是，顺序很重要；若尝试检索的数据项出现在多个源中，那么只有数据注册表发现的第一个实例才可以访问。浏览左侧面板中 **数据源（Data Source）** 下的 **运行时源（Runtime Sources）** 类别，查看数据注册表中按照加载顺序列出的每个项的每个实例的源。
    
    你可以在左侧面板的 **Data Sources** 的下方查看 **运行时源（Runtime Sources）** 分类，了解Data Registry中每个项的每个实例的源（按加载顺序排列）。
    
12.  在所有内容检查无误之后，保存你的数据注册表。在未来的会话中，数据注册表将在启动期间自动加载和填充。如果你更改了数据注册表，请按刷新按钮更新数据项。
    
13.  如果你计划通过C++代码使用数据注册表，请打开项目的 `Build.cs` 文件。实际文件名称将包含你的项目名称；例如，项目名称是 "MyProject"，文件名将是 `MyProject.Build.cs`。查找设置了 `PublicDependencyModuleNames` 变量的行，然后将 `"DataRegistry"` 添加到该数组。最终的行看起来应该类似于这样：
    
    ```cpp
             PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore", "DataRegistry" });
    ```
    

在完成这些步骤之后，你的项目将设置为使用数据注册表！如需关于数据注册表的工作原理以及优势的信息，请参见主要[数据注册表（Data Registries）](/documentation/zh-cn/unreal-engine/data-registries-in-unreal-engine)页。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [gameplay framework](https://dev.epicgames.com/community/search?query=gameplay%20framework)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)