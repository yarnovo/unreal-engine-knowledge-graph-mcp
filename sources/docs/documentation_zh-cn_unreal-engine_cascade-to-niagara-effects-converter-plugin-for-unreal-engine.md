# 虚幻引擎Cascade to Niagara Effects Converter插件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cascade-to-niagara-effects-converter-plugin-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:30:09.593Z

---

目录

![将Cascade转换为Niagara的转换插件](https://dev.epicgames.com/community/api/documentation/image/06edbbad-6012-44f7-9da4-e4d724a87b44?resizing_type=fill&width=1920&height=335)

## Cascade到Niagara转换器插件

**Cascade到Niagara转换器** 插件是一个实用程序，旨在转换 **Cascade粒子系统** 资产。 该插件包括一个蓝图函数库，用于以编程方式生成Niagara发射器和Niagara系统资产，以及Python脚本层，用于将Cascade系统转换为新的Niagara系统。

对于希望将现有内容从Cascade转换为Niagara的用户而言，此插件是理想之选。此插件作为一个起始点，升级到虚幻引擎使用的最新工具，并将继续更新，直到未来引擎版本弃用和删除Cascade。

## 启用Cascade到Niagara转换器插件

如果要为你的项目启用Cascade到Niagara转换器插件，请执行以下步骤。

1.  导航至主菜单中的 **编辑（Edit） > 插件（Plugins）**，打开 **插件浏览器（Plugins Browser）** 选项卡。
    
2.  从 **内置（Built-In）** 类别侧菜单中，导航至 **FX > Cascade到Niagara转换器（Cascade To Niagara Converter）** 插件，然后启用该插件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63af3c0a-6e42-481d-a3f3-295b037ebf47/niagaraconverter.png)
3.  出现提示时，点击 **立即重启（Restart Now）**，使更改生效。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad9b6c36-3bf1-4ae5-9f40-e84f9ba82d99/restarteditor.png)

## 使用Cascade到Niagara转换器插件

在 **内容浏览器** 中右键点击级联粒子，然后从上下文菜单中选择 **转换到Niagara系统（Convert to Niagara System）**， 将所需的 **级联粒子系统** 转换为 **Niagara系统**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56157ce7-88c7-4781-9d5b-e9159d5cfa5e/convertasset.png)

\*在上面的示例中，我们使用了初学者内容包文件夹中的级联粒子系统 P\_Steam\_Lit。

在源Cascade系统所在目录下创建新的Niagara系统，后缀为 `_Converted`。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/011ee2df-c9cc-4ed9-95b5-75a25d41b2c5/convertsuffix.png)

新生成的Niagara系统会创建转换报告，你可以通过打开新的Niagara系统并查看 **Niagara日志（Niagara Log）** 窗口来查看该报告。 要检查转换后的Niagara系统，建议在编辑器中打开资产，并解决转换报告中可能包含的任何警告或错误。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/020215df-aeeb-4a34-9cfb-74fa9de4cb9f/niagaralog.png)

Niagara日志提供警告：它已跳过转换布尔值 bApplyGlobalSpawnRateScale。

## 错误和警告类型

在转换Cascade系统assimplegalleryagara系统资产后，你可能会看到 **Niagara系统概述窗口** 中显示一些错误和警告。 将鼠标光标悬停在任一符号上都会显示任何可能产生冲突的问题的简短描述。

-   ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d08c6ffd-45bb-4035-b31f-d09f55a42b47/error.png) – 指示 **错误** 的图标。
    
-   ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7f861ec-a01e-48a5-82c0-c0b08bc8d18f/warning.png) – 表示 **警告** 的图标。
    

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ebc5c860-697a-4090-96c1-07cc8ee036b5/convertederrors.png)

上图展示了两个错误的简要说明，表示粒子更新（Particle Update）字段中的依赖性未得到满足。

选择任一属性都会在界面右侧打开选择（Selection） **细节窗口**，使你能够观察到有关问题的更详细说明。根据问题的类型，可能会提供 **修复问题** 提示，帮助你自动解决问题。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca9954d3-ce24-4926-baec-85aaee088e3e/errordetail.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53154e0a-0989-4405-a267-b89a108c86fc/warningdetail.png)

错误

警告

选择（Selection）细节窗口显示了有关 `加速力` 和 `阻力` 模块的未满足依赖性错误的附加详细说明，以及有关如何纠正它们的建议。选择修复问题将导致插件调整模块堆栈组的顺序。

选择（Selection）细节窗口显示警告"未指定错误"，指示变量 `bApplyGlobalRateScale` 已在转换过程中跳过。

## Cascade到Niagara支持的转换操作

Cascade到Niagara转换器支持转换级联粒子系统的通用表示形式，但是，有些模块和属性并不完全受支持。下表列出了尚未得到支持或部分支持的项目。

功能

支持（是/否/部分）

其他注意事项

事件模块：

 

 

**事件生成器**

否

 

**EventReceiver杀死全部**

否

 

**EventReceiver生成**

否

 

发射器到发射器模块

 

 

**粒子吸引器**

否

 

**源运动**

否

 

**发射器初始位置**

否

 

**发射器直接位置**

否

 

**种子模块**

否

 

**光束和AnimTrail渲染器**

否

 

**条带渲染器**

部分

条带UV不能保证等同于转换后的Niagara系统。

**级联发射器LOD**

部分

转换仅在LOD为0的所有模块上运行。

如果转换了具有不受支持模块或渲染器的级联粒子系统， 则生成的Niagara系统会将跳过的模块和/或渲染器转换记录在其消息日志中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b888d05a-0ff9-4478-a639-10bced209540/logconversion.png)

Niagara日志显示一条消息，指示在转换过程中跳过了哪些级联模块。

## 扩展Cascade到Niagara转换器插件的功能

该插件支持通过修改位于转换插件的Python目录中的python脚本来扩展转换功能，该目录位于： `Engine/Plugins/FX/CascadeToNiagaraConverter/Content/Python`。

适用于已在Cascade中创建自己的自定义模块、渲染器和属性的用户。通过从相对接口扩展并将新脚本添加到 `CascadeToNiagaraConverter/Content/Python` 下的相关目录中，可以为每个脚本创建新的转换器脚本。 例如，假如想要转换一个自定义模块，你可以在 `ModuleConversionScripts` 目录下新建一个脚本，然后从 `ModuleConverterInterface` 类派生出一个类。有关更多详细信息或示例，请参阅相关接口脚本的源代码。

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [plugin](https://dev.epicgames.com/community/search?query=plugin)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)
-   [cascade](https://dev.epicgames.com/community/search?query=cascade)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Cascade到Niagara转换器插件](/documentation/zh-cn/unreal-engine/cascade-to-niagara-effects-converter-plugin-for-unreal-engine#cascade%E5%88%B0niagara%E8%BD%AC%E6%8D%A2%E5%99%A8%E6%8F%92%E4%BB%B6)
-   [启用Cascade到Niagara转换器插件](/documentation/zh-cn/unreal-engine/cascade-to-niagara-effects-converter-plugin-for-unreal-engine#%E5%90%AF%E7%94%A8cascade%E5%88%B0niagara%E8%BD%AC%E6%8D%A2%E5%99%A8%E6%8F%92%E4%BB%B6)
-   [使用Cascade到Niagara转换器插件](/documentation/zh-cn/unreal-engine/cascade-to-niagara-effects-converter-plugin-for-unreal-engine#%E4%BD%BF%E7%94%A8cascade%E5%88%B0niagara%E8%BD%AC%E6%8D%A2%E5%99%A8%E6%8F%92%E4%BB%B6)
-   [错误和警告类型](/documentation/zh-cn/unreal-engine/cascade-to-niagara-effects-converter-plugin-for-unreal-engine#%E9%94%99%E8%AF%AF%E5%92%8C%E8%AD%A6%E5%91%8A%E7%B1%BB%E5%9E%8B)
-   [Cascade到Niagara支持的转换操作](/documentation/zh-cn/unreal-engine/cascade-to-niagara-effects-converter-plugin-for-unreal-engine#cascade%E5%88%B0niagara%E6%94%AF%E6%8C%81%E7%9A%84%E8%BD%AC%E6%8D%A2%E6%93%8D%E4%BD%9C)
-   [扩展Cascade到Niagara转换器插件的功能](/documentation/zh-cn/unreal-engine/cascade-to-niagara-effects-converter-plugin-for-unreal-engine#%E6%89%A9%E5%B1%95cascade%E5%88%B0niagara%E8%BD%AC%E6%8D%A2%E5%99%A8%E6%8F%92%E4%BB%B6%E7%9A%84%E5%8A%9F%E8%83%BD)