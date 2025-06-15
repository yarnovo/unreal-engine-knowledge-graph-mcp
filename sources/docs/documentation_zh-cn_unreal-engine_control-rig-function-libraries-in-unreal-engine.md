# 虚幻引擎中的Control Rig函数库 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/control-rig-function-libraries-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:15:38.669Z

---

目录

![Control Rig函数库](https://dev.epicgames.com/community/api/documentation/image/f309a9be-3c3a-4e77-8326-f8c46ce40bfa?resizing_type=fill&width=1920&height=335)

类似于[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)，将函数设为"公有"，可以在资产图表之间共享用户创建的函数。蓝图仅将函数共享到子类，而Control Rig函数可以在项目范围内共享。你可以创建自定义函数库，将其共享给项目中的所有Control Rig图表。

本文档提供了在Control Rig中创建函数库的最佳实践指南，并介绍了如何访问引擎提供的默认函数库。

## 新建函数库

以下步骤介绍了如何创建和使用新Control Rig函数库。

### 创建Control Rig容器

由于自定义函数只能存在于Control Rig资产内，第一步就是创建Control Rig资产。此Control Rig不应链接到特定骨骼网格体，因为它将主要用于包含你的函数。

在[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)中，点击 **添加（Add (+)）** ，然后选择 **动画（Animation）> Control Rig** 。在 **创建Control Rig蓝图（Create Control Rig Blueprint）** 对话框窗口中，选择 **ControlRig** 并点击 **创建（Create）** 。在创建Control Rig后将其打开。

![创建control rig](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4535431-ca2c-44d2-a72b-6b7aae67b957/createrig1.png)

就本资产而言，你的函数库 *是* Control Rig资产，不包含对特定骨架的依赖关系。作为函数容器，这可使资产尽量轻便。

### 创建公有函数

在[Control Rig编辑器](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine)中，点击 **我的蓝图（My Blueprint）** 的 **函数（Functions）** 分段上的 **添加（Add (+)）** ，创建新函数。

![创建control rig函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4ba04cd-b861-4877-a41c-30375bc0d9aa/createfunction1.png)

接下来，选择该函数，在 **细节（Details）** 面板中将 **访问说明符（Access Specifier）** 设置为 **公有（Public）** 。这使该函数在所有Control Rig中可公开访问。

![公有函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ec887b6-6c6e-4378-81c2-a87c6748c531/createfunction2.png)

### 设置函数中的数据

在函数中，你可以创建所需的任意内含逻辑，包括有关函数的元数据，例如提示文本说明和上下文菜单类别。

此示例创建了 **For Each** 和 **Set Control Visibility** 节点，并连接到了函数的 **Entry** 和 **Return** 节点。

![函数示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9020bf82-7754-40af-a862-a229c7d66879/functionsetup1.png)

要在Entry节点上创建变量输入，请选择 **Entry** 并点击 **细节（Details）** 面板中 **输入（Inputs）** 类别上的 **添加（Add (+)）** 。此示例创建了以下变量：

-   **Rig元素键（Rig Element Key）** ，类型为 **数组（Array）** 。
-   **布尔值（Boolean）** ，类型为 **单一（Single）** 。

![变量设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7e5e820-7b0a-4900-9824-ba58236abf67/functionsetup2.png)

接下来，将变量输入连接到对应的节点。

![变量连接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f67eb73-21f2-4a6f-ae30-6c3503fd7eab/functionsetup3.png)

你还可以选择编辑 **细节（Details）** 面板中的 **节点设置（Node Settings）** 属性，将分类、提示文本或其他有用属性添加到函数。

![函数设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/292e2a24-f632-494c-a27f-afcc136637d9/functionsetup4.png)

名称

说明

**类别（Category）**

填充此属性会将该节点放在具名的上下文菜单类别中。在Control Rig图表中添加该节点时，此类别可见。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f0354cc-91fa-445b-a721-616c9b8f1352/functionsetup5.png)

**关键字（Keywords）**

添加搜索词，用于在使用上下文菜单搜索时查找此函数。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d219ba93-4383-45e2-afeb-66bc0cf8adc0/functionsetup6.png)

**说明（Description）**

为此函数添加提示文本说明。将光标悬停在上下文菜单项上，或悬停在添加到图表中的节点上时，你可以查看提示文本。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9e2b4ff-b346-4402-8851-dd50fb4b77c4/functionsetup7.png)

**颜色（Color）**

设置函数节点标题的颜色。你可以展开 **节点默认值（Node Defaults）** 类别来预览节点的外观。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb58e57e-0693-47a0-8b04-f07c38887c23/functionsetup8.png)

### 引用函数

要在其他Control Rig中添加你的共享函数，请右键点击 **Rig图表（Rig Graph）** ，并从上下文菜单添加你的函数。共享函数还会在节点标题中显示其文件夹路径供参考。

![添加函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea856236-7ffa-435a-8e60-81704831b381/functionref1.png)

双击共享函数节点，将打开包含该函数的Control Rig资产，并打开函数逻辑。

### 将函数本地化

若要从共享版本分散函数逻辑，你可以将函数本地化，这会在你的当前Rig图表中创建函数的本地副本。

为此，请右键点击函数节点后选择 **将函数本地化（Localize Function）** 。在对话框窗口中，确保函数已启用，然后点击 **确定（OK）** 。

![将函数本地化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de540edd-a55c-49ad-9d30-a9b2248f0e6f/localize1.png)

该函数现在会转换为本地函数，其中你可以在本地分散逻辑。

![本地化为新函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ae1e73f-1e9e-4ec5-8fea-9fa96e2a3704/localize2.png)

## 标准函数库

默认情况下，虚幻引擎包含一个Control Rig **标准函数库** ，你可以参考该库来了解如何构造你自己的函数库。此外，它包含各种函数，可用于辅助你自己的操控工作流程。

标准函数库位于 **Control Rig插件（Control Rig Plugin）** 文件夹中。要访问该库，请打开 **内容浏览器（Content Browser）** ，点击 **设置（Settings）** 并启用 **显示引擎内容（Show Engine Content）** 和 **显示插件内容（Show Plugin Content）** ，确保该插件文件夹已启用。

![显示引擎和插件内容](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b49248d-9f2a-4437-8168-0c46a4d7e701/standardlibrary1.png)

接下来，在 **引擎（Engine）> 插件（Plugins）> Control Rig内容（Control Rig Content）> StandardFunctionLibrary** 中找到并打开 **StandardFunctionLibrary** 。

![标准函数库](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9f10b93-b8c2-4637-a6c2-10d122677d19/standardlibrary2.png)

打开后，你可以在 **我的蓝图（My Blueprint）** 面板中查看各种函数。

![标准函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a41d0aaa-c431-4346-a0f5-25c3dea82cee/standardlibrary3.png)

由于标准函数库由 **引擎内容（Engine Content）** 提供，你在该资产中所做的任何改动都会在你重新安装或更新虚幻引擎后被重载。因此我们建议你创建自己的函数库，不要修改引擎内容（Engine Content）的。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)
-   [library](https://dev.epicgames.com/community/search?query=library)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [新建函数库](/documentation/zh-cn/unreal-engine/control-rig-function-libraries-in-unreal-engine#%E6%96%B0%E5%BB%BA%E5%87%BD%E6%95%B0%E5%BA%93)
-   [创建Control Rig容器](/documentation/zh-cn/unreal-engine/control-rig-function-libraries-in-unreal-engine#%E5%88%9B%E5%BB%BAcontrolrig%E5%AE%B9%E5%99%A8)
-   [创建公有函数](/documentation/zh-cn/unreal-engine/control-rig-function-libraries-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%85%AC%E6%9C%89%E5%87%BD%E6%95%B0)
-   [设置函数中的数据](/documentation/zh-cn/unreal-engine/control-rig-function-libraries-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%87%BD%E6%95%B0%E4%B8%AD%E7%9A%84%E6%95%B0%E6%8D%AE)
-   [引用函数](/documentation/zh-cn/unreal-engine/control-rig-function-libraries-in-unreal-engine#%E5%BC%95%E7%94%A8%E5%87%BD%E6%95%B0)
-   [将函数本地化](/documentation/zh-cn/unreal-engine/control-rig-function-libraries-in-unreal-engine#%E5%B0%86%E5%87%BD%E6%95%B0%E6%9C%AC%E5%9C%B0%E5%8C%96)
-   [标准函数库](/documentation/zh-cn/unreal-engine/control-rig-function-libraries-in-unreal-engine#%E6%A0%87%E5%87%86%E5%87%BD%E6%95%B0%E5%BA%93)