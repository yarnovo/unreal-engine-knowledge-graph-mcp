# 虚幻引擎插件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:34:53.020Z

---

目录

![插件](https://dev.epicgames.com/community/api/documentation/image/1f855344-806d-42d1-876f-20c116132c85?resizing_type=fill&width=1920&height=335)

此页面将对在 **虚幻引擎（UE）** 工具中和运行时使用的 **插件** 开发与管理进行讲解。

在虚幻引擎中，插件是开发者可在编辑器中逐项目启用或禁用的代码和数据集合。插件可添加运行时gameplay功能，修改内置引擎功能（或添加新功能），新建文件类型，及使用新菜单、工具栏命令和子模式扩展编辑器的功能。使用插件可扩展许多现有虚幻引擎子系统。

现在如要创建插件，请参见[新建插件](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E6%96%B0%E5%BB%BA%E6%8F%92%E4%BB%B6)章节。

## 编辑器中的插件UI

可在 **编辑** 菜单打开插件编辑界面，查看当前安装的插件。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2231a29b-7438-4bc4-bcf8-1431da5a64e8/pluginseditor.png)

可在主"窗口"菜单访问插件编辑器。此界面显示当前安装的所有插件，可单独启用或禁用插件。

可使用左侧树形界面浏览类别。选择类别将显示该类别中的所有插件，及所有子类别中的插件。浏览各类别时，UI顶部将显示浏览路径记录，可快速跳转到更高级的类别。类别旁显示的数字表明该类别中可用插件数量。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31ff4743-835e-4795-b56e-c1197c7fee18/plugincategories.png)

插件显示在主列表中，附有各插件的命名、图标、当前版本、文本描述、作者（和可选Web超链接），及插件当前是否启用。

利用顶部的搜索功能按钮可在列表中以命名搜索插件。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fec48acb-a739-4b85-aa6c-e0a944593ade/searchingplugins.png)

在插件描述下方切换 **已启用（Enabled）** 复选框，可对活跃项目启用或禁用插件。可能需重启编辑器才能使变更生效。

## 插件剖析

含有代码的插件包含Source文件夹。此文件夹将包含一个或多个目录，其中包含插件的模块源代码。注意：插件常包含代码，但并非必要条件。参见[插件中的代码](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E6%8F%92%E4%BB%B6%E4%B8%AD%E7%9A%84%E4%BB%A3%E7%A0%81)章节，了解更多信息。

含代码的插件拥有包含该插件编译后代码的 `Binaries` 文件夹，而临时版本产品文件将另存在插件目录中的 `Intermediate` 文件夹中。

插件可拥有自己的Content文件夹，其中包含特定于该插件的资源文件。参见[插件中的内容](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E6%8F%92%E4%BB%B6%E4%B8%AD%E7%9A%84%E5%86%85%E5%AE%B9)章节，了解更多信息。插件配置文件应使用和其他配置文件相同的规则放置：

-   引擎插件： `[PluginName]/Config/Base[PluginName].ini`
-   游戏插件： `[PluginName]/Config/Default[PluginName].ini`

插件不支持自身衍生数据缓存分布。

## 插件文件夹

为便于查找插件，须将其放置在项目中或引擎本身中的插件搜索路径。

插件类型

搜索路径

引擎

`[UE根目录]/Engine/Plugins/[插件命名]`

游戏

`[项目根目录]/Engine/Plugins/[插件命名]/`

也可将插件整理到基础Plugins文件夹下的子目录中。引擎将扫描基础Plugins文件夹下的所有子文件夹，查找要加载的插件，但不会扫描已找到插件下的子目录。

虚幻引擎通过在磁盘上搜索 `.uplugin` 文件来查找插件。将此类文件称为 **插件描述文件** 。其是提供插件相关基本信息的文本文件。运行此类程勋时，引擎、编辑器和 **UnrealBuildTool** （UBT）将自动发现并自动加载插件描述文件。参见[插件描述文件](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E6%8F%92%E4%BB%B6%E6%8F%8F%E8%BF%B0%E6%96%87%E4%BB%B6)章节，了解创建和自定义此类文件的方法。

## 插件中的代码

生成Visual Studio或Xcode的项目文件时，含有 `Source` 文件夹（包含 `.Build.cs` 文件）的插件将被添加到项目文件，以便导航到其源代码。编译游戏项目时，UBT将自动编译此类插件。

插件可含有任意数量的模块源目录。多数插件仅有一个模块（但可创建多个模块，例如插件包含纯编辑器功能时），及游戏期间要运行的其他代码。

插件源文件的大部分布局与引擎中其他C++模块相同。

在模块的 `Source` 目录（或其子目录）内，插件可在标头文件中声明新反映的类型（`UCLASS` 、 `USTRUCT` 等）。引擎的构建系统将检测此类文件，并按需要生成代码支持新类型。需遵守C++模块中使用 `Uobjects` 时的一般规则，例如在模块的源文件中包含生成的标头文件和模块 `generated.inl` 文件。

虚幻引擎支持共生模块和插件。通过在自身.uproject文件中启用插件，项目模块可依赖插件。类似地，通过在自身.uplugin文件中启用其他插件，插件可表明依赖性。但其中有一项重要限制：插件和模块将拆分为若干层级，仅能依赖同一级或更高级的其他插件或模块。例如，项目模块可依赖引擎模块，但引擎模块无法依赖项目模块。这是因为引擎（及其所有插件和模块）的级别高于项目，须能在无项目的情况下编译。以下图表展示了项目和模块间的依赖性层级：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2335f00-6e35-4b35-8ab0-d2e85d30beb6/pluginandmoduledependency.png)

箭头表明可能的依赖性。各插件或模块类型可依赖同级别或更高级别的其他插件或模块类型。

### 引擎插件

虚幻引擎4的 `Engine` 目录下包含部分内置插件。引擎插件和项目插件类似，但可用于所有项目。此类插件通常由引擎和工具程序员创建，目的在于提供可在多个项目中使用并能在单一位置维护的基线功能。利用此功能，用户可直接添加或覆盖引擎功能，而无需修改引擎代码。

## 插件中的内容

虚幻引擎支持包含游戏内容以及二进制代码的插件。为使用插件中的内容，须将插件描述文件中的"CanContainContent"设置设为"true"。

## 项目中的插件

插件位于项目目录的 `Plugins` 子文件夹下，将在引擎或编辑器启动时被探测和加载。

如插件包含具有 `Source` 文件夹（和 `.Build.cs` 文件）的模块，插件代码将被自动添加到生成的C++项目文件，以便在开发项目时开发插件。编译项目时，有可用源的插件都被作为游戏依赖项进行编译。

项目生成器将忽略无 `Source` 文件夹的插件，其不会出现在C++项目文件中，但若存在二进制文件，启动时仍将加载此类插件。

目前，无法将插件配置文件与项目打包。未来版本中可能会支持此功能，但目前需手动将此类文件复制到项目的 `Config` 文件夹。

## 在Epic商城分布插件

要打包插件，请点击 **打包...（Package...）**链接，将插件打包到文件夹中进行分布。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1009309-bbbe-41be-8ee2-511d203b06c7/packageplugin.png)

### 预编译插件

如果你要预编译UE 5.2的插件，请使用Visual Studio 2019编译你的插件，这是UE 5.2支持的最低Visual Studio版本。使用Visual Studio 2019编译可确保生成的库针对所有用户兼容UE 5.2。如需详细了解Visual Studio和虚幻引擎版本兼容性，请参阅[设置Visual Studio](/documentation/404)，获取更多信息。

## 插件描述文件

插件描述文件是命名以 `.uplugin` 结尾的文件。文件名的第一部分固定为插件命名。插件描述文件固定位于插件目录中，启动时将被引擎发现。

插件描述文件使用Json（[JavaScript对象表示法](http://www.json.org/)）文件格式。

### 描述文件示例

此范例描述文件来自引擎的 `UObjectPlugin` 。

```cpp
{
    "FileVersion" : 3,
    "Version" : 1,
    "VersionName" : "1.0",
    "FriendlyName" : "UObject Example Plugin",
    "Description" : "声明自带的Uobject类型的插件示例。  可用作创建自有插件的起始点。",
    "Category" : "Examples",
    "CreatedBy" : "Epic Games, Inc.",
    "CreatedByURL" : "http://epicgames.com",
    "DocsURL" : "",
    "MarketplaceURL" : "",
    "SupportURL" : "",
    "EnabledByDefault" : true,
    "CanContainContent" : false,
    "IsBetaVersion" : false,
    "Installed" : false,
    "Modules" :
    [
        {
            "Name" : "UObjectPlugin",
            "Type" : "Developer",
            "LoadingPhase" : "Default"
        }
    ]
}
```

### 描述文件格式

描述文件为JSON格式的变量列表，此类列表为 `FPluginDescriptor` 类型。其中具有一个附加字段"FileVersion"，其是文件结构中唯一的必需字段。"FileVersion"提供插件描述文件的版本，通常应设为引擎支持的最高版本（当前为"3"）。由于此版本应用于插件描述文件的格式，而非插件本身，因此其可能不会频繁变化，也不应随插件后续版本的发行而改变。要与引擎旧版本进行最大化兼容，可使用较旧版本号，但不建议进行此操作。

欲了解其他支持字段的相关详情，参见[](/documentation/404) API参考页面。

布尔变量的字段命名删除变量命名中的首字母"b"。例如变量 `bEnabledByDefault` 对应"EnabledByDefault"字段。

#### 模块描述符

对于包含代码的插件，描述文件中的"Modules"字段将包含至少一个条目。以下为范例条目：

```cpp
{
    "Name" : "UObjectPlugin",
    "Type" : "Developer"
    "LoadingPhase" : "Default"
}
```

各条目须具有"Name"和"Type"字段。"Name"是插件模块的唯一命名，将随插件而加载。在运行时，插件的"Binaries"文件夹中需存在正确的插件二进制文件，并带有指定模块命名。对于具有Source目录的模块，模块的子文件夹树中须存在匹配的".Build.cs"文件。"Type"设置模块的类型。有效的选项为： **Runtime** 、 **RuntimeNoCommandlet** 、 **Developer** 、 **Editor** 、 **EditorNoCommandlet** 和 **Program** 。此类型决定能加载模块的应用程序类型。例如部分插件可能包含仅在编辑器运行时加载的模块。将在所有情况下加载运行时模块，即使在已发行的游戏中，也需加载。仅在开发运行时或编辑器版本中加载开发者模块，不会发行版本中加载。仅在编辑器启动时加载编辑器模块。插件可使用不同类型模块的组合。

欲了解其他支持字段的相关详情，参见[](/documentation/404) API参考页面。

## 图标

与描述文件相同，插件需要在编辑器插件浏览器中显示的图标。该图像应为128x128的.png文件，名为"Icon128.png"，保存在插件的"/Resources/"目录中。

## 新建插件

要新建插件，请使用编辑器插件浏览器中的 **新建插件** 按钮。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30667967-72f1-4737-a33a-262d45cb6153/createplugin.png)

之后可选择要创建的插件类型，输入命名，并设置基本参数。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/743487d1-848b-4a4c-8ede-0af86ee2d9bd/plugintypes.png)

新插件将显示在插件浏览器中，将在当前项目中启用。

-   [plugin](https://dev.epicgames.com/community/search?query=plugin)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [编辑器中的插件UI](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E7%9A%84%E6%8F%92%E4%BB%B6ui)
-   [插件剖析](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E6%8F%92%E4%BB%B6%E5%89%96%E6%9E%90)
-   [插件文件夹](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E6%8F%92%E4%BB%B6%E6%96%87%E4%BB%B6%E5%A4%B9)
-   [插件中的代码](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E6%8F%92%E4%BB%B6%E4%B8%AD%E7%9A%84%E4%BB%A3%E7%A0%81)
-   [引擎插件](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E5%BC%95%E6%93%8E%E6%8F%92%E4%BB%B6)
-   [插件中的内容](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E6%8F%92%E4%BB%B6%E4%B8%AD%E7%9A%84%E5%86%85%E5%AE%B9)
-   [项目中的插件](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E9%A1%B9%E7%9B%AE%E4%B8%AD%E7%9A%84%E6%8F%92%E4%BB%B6)
-   [在Epic商城分布插件](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E5%9C%A8epic%E5%95%86%E5%9F%8E%E5%88%86%E5%B8%83%E6%8F%92%E4%BB%B6)
-   [预编译插件](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E9%A2%84%E7%BC%96%E8%AF%91%E6%8F%92%E4%BB%B6)
-   [插件描述文件](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E6%8F%92%E4%BB%B6%E6%8F%8F%E8%BF%B0%E6%96%87%E4%BB%B6)
-   [描述文件示例](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E6%8F%8F%E8%BF%B0%E6%96%87%E4%BB%B6%E7%A4%BA%E4%BE%8B)
-   [描述文件格式](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E6%8F%8F%E8%BF%B0%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F)
-   [模块描述符](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E6%A8%A1%E5%9D%97%E6%8F%8F%E8%BF%B0%E7%AC%A6)
-   [图标](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E5%9B%BE%E6%A0%87)
-   [新建插件](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine#%E6%96%B0%E5%BB%BA%E6%8F%92%E4%BB%B6)

相关文档

[

第三方库

![第三方库](https://dev.epicgames.com/community/api/documentation/image/9127f743-c088-481b-9fec-752d26b0b969?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/integrating-third-party-libraries-into-unreal-engine)