# 虚幻引擎中的FBX属性 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:05:02.605Z

---

目录

![动画属性](https://dev.epicgames.com/community/api/documentation/image/bf8b869b-0f56-4ad9-8975-24a1a5c2896f?resizing_type=fill&width=1920&height=335)

自定义节点属性可以导入到你的FBX[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)来创建不同的以数据驱动的动画。与[曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)这样的动画数据不同，属性在储存时针对整个序列并且支持不同的属性类型。

该文档介绍如何在虚幻引擎中导入并引用动画属性。

#### 先决条件

-   你应该对在Autodesk Maya的节点上[创建自定义属性](https://knowledge.autodesk.com/support/maya/learn-explore/caas/CloudHelp/cloudhelp/2019/ENU/Maya-Basics/files/GUID-C7385EC4-74E1-4F6E-8C9D-60F5CCDA7994-htm.html)有一定的了解。
-   你的项目里包含一个[骨架网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine).
-   你应该熟悉如何导入[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine).

## 导入属性

要开始在你的动画序列中导入动画属性，必须先确保一个骨骼包含带动画的属性。通常这一步在DCC软件中完成，比如Autodesk Maya。在这个示例中，**根骨骼（root Bone）** 包含了一个自定义的浮点属性。

![Maya中的自定义属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d541751-386c-49b5-9334-88901ef93f57/import1.png)

当前支持导入的数据类型有 **浮点（Floats）**，**整型（Integers）**，**字符串（Strings）** 以及 **变换（Transforms）**。

### 项目设置

为了让属性正确导入，你需要保证它们已经在项目设置中定义好。在虚幻引擎的主菜单中，前往 **编辑（Edit） > 项目设置（Project Settings）**，找到 **引擎（Engine） > 动画（Animation）** 部分，再找到 **自定义属性（Custom Attributes）** 设置。以下是可用的设置：

![项目设置自定义属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eeee87c8-b935-4295-824b-e311fd99dffe/projectsettings.png)

名称

描述

**骨骼时间码自定义属性名称设置（Bone Timecode Custom Attribute Name Settings）**

以下是一些时间码相关的属性和它们对自定义属性的默认映射。如果你的项目使用不同的属性名称，你可以更改这些设置来使其映射到不同的时间码属性

-   **小时属性名称（Hour Attribute Name）** 是 **整型（Integer）** 属性，默认映射到 **TCHour**。
-   **分钟属性名称（Minute Attribute Name）** 是 **整型（Integer）** 属性，默认映射到 **TCMinute**.
-   **秒属性名称（Second Attribute Name）** 是 **整型（Integer）** 属性，默认映射到 **TCSecond**.
-   **帧属性名称（Frame Attribute Name）** 是 **整型（Integer）** 属性，默认映射到 **TCFrame**
-   **子帧属性名称（Subframe Attribute Name）** 是 **浮点（Float）** 属性，默认映射到 **TCSubframe**
-   **速率属性名称（Rate Attribute Name）** 是 **整型（Integer）** 属性，默认映射到 **TCRate**.
-   **镜头试拍名称属性名称（Takename Attribute Name）** 是 **字符串（Strings）** 属性，默认映射到 **Takename**.

![时间码自定义属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5c5e4fb-9121-4dd4-a134-2ee09ddce433/projectsettings2.png)

这些属性名会包含在一个导入的列表中，并且像添加到骨骼自定义属性名列表一样运行。

**骨骼自定义属性名（Bone Custom Attributes Names）**

用于定义自定义属性名称的列表，导入动画时会搜索这些属性名。在这个列表中定义属性名，会在整个骨架的所有骨骼中搜索该属性。

点击 **添加（+）（Add (+)）** 来向列表中添加一个属性，然后填入以下属性：

-   **名称（Name）**，匹配你的自定义动画属性的名称。
-   **含义（Meaning）**，可选填的区域，用于为该属性定义其它的上下文信息。

![骨骼自定义属性名](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb52798a-c31b-49b2-8fe0-8454676fe502/projectsettings3.png)

**带自定义属性的骨骼名（Bone Names with Custom Attributes）**

用于指定导入时要过滤自定义属性的骨骼。在该列表中定义一个骨骼，会导致导入动画时所有的自定义属性都从该动画导入。

点击 **添加（+）（Add (+)）** 来向列表中添加内容，然后定义骨骼名称。

![带自定义属性的骨骼名](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/929bd8a1-a2e2-4458-b134-5082e96a4963/projectsettings4.png)

**属性混合模式（Attribute Blend Modes）**

用于定义属性在混合时如何运行的列表。这里的定义会针对每个属性覆盖全局的 **默认属性混合模式（Default Attribute Blend Mode）**。

点击 **添加（+）（Add (+)）** 来向列表中添加内容，定义一个属性名，然后设置混合模式：

-   **覆盖（Override）** 会在混合时按照最高的权重覆盖自定义属性值。
-   **混合（Blend）** 会根据权重在动画之间设置自定义属性的平均值。

![属性混合模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54e53a17-8366-4b87-9e12-2a854c977ca7/projectsettings5.png)

**默认属性混合模式（Default Attribute Blend Mode）**

为所有自定义属性默认使用的混合模式。与 **属性混合模式（Attribute Blend Modes）** 相似，你可以选择 **覆盖（Override）** 或者 **混合（Blend）**。

**变换属性名称（Transform Attribute Names）**

导入[变换属性](/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine#transformattributes)时要寻找的变换节点名称。

取决于你想要如何导入自定义属性，可以调整 **骨骼自定义属性名（Bone Custom Attribute Names）** 或者 **带自定义属性的骨骼名（Bone Names with Custom Attributes）**。比如，如果你想导入两个在 **根骨骼（root Bone）** 上创建的自定义属性，你可以：

-   在 **骨骼自定义属性名（Bone Custom Attributes Names）** 下创建两个条目，然后使名称和你的属性匹配。
    
    ![骨骼自定义属性名示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09eeba9e-0506-48dd-a768-2a118303aae8/projectsettings7.png)
    
-   在 **带自定义属性的骨骼名（Bone Names with Custom Attributes）** 下创建一个条目，然后将其命名为 **根（root）**。
    
    ![带自定义属性的骨骼名示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d773fd6f-bcfc-45a4-bcc1-9d19b882f356/projectsettings8.png)
    

设置好自定义属性项目设置之后，就可以导入包含自定义属性的[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)。导入FBX的时候，确保启用 **导入自定义属性（Import Custom Attribute）**。

![导入自定义属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45e71fba-6a26-449a-aea0-404ea25ff6bf/import2.png)

### 动画序列

导入包含自定义属性的动画序列后，你可以在[动画序列编辑器](/documentation/zh-cn/unreal-engine/animation-sequence-editor-in-unreal-engine)中查看属性。属性以轨道的形式位于[时间轴](/documentation/zh-cn/unreal-engine/animation-sequence-editor-in-unreal-engine#asseteditor)中，位于 **属性（Attributes） > 骨骼（Bone） > 属性名（Attribute Name）** 之下。

![动画序列中的属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce0149e6-fbd5-4bfc-afac-778e1224b935/animseq1.png)

将光标放在属性上便会显示该属性的细节信息，包括类型和关键帧数量。

![属性信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0886e206-845f-4db1-9fc5-54d174191a5c/animseq2.png)

## 变换属性

你可以导入自定义的 **变换属性（transform attributes）**，其导入步骤略有不同。变换属性用于提供给动画序列额外的变换信息而不需要添加多余的[插槽](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine)或者骨骼。

![变换属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2b0224f-e9b2-4262-a5fd-86c5e6bd79db/trans1.png)

### FBX设置

由于骨骼已经包含了基本的变换属性，你需要先给想要添加自定义属性的骨骼创建一个子节点。可以是一个 **定位器（locator）** 也可以是一个空白 **节点（node）**。

在这个示例中，一个名为 "MyTransformAttribute" 的 **定位器（locator）** 的母骨骼为 **手部骨骼（hand Bone）**。和其它任何节点和一样，这可以用任意方式变为关键帧。

![创建定位器并分配至骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9cc098b-0ba4-4d95-92c8-807358ebc61c/trans2.png)

### 设置和导入

接下来，你需要在[自定义属性项目设置](/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine#projectsettingssetup)中定义变换属性的名称。找到 **变换属性名称（Transform Attribute Names）**，点击 **添加（+）（Add (+)）** 来创建一个条目，然后添加变换属性节点的名称。

![变换属性名称](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd87efa5-92c0-4468-b882-b4179bb51fd9/trans3.png)

现在你可以导入包含自定义变换属性的[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)。导入完成后，变换属性会作为轨道在[时间轴](/documentation/zh-cn/unreal-engine/animation-sequence-editor-in-unreal-engine#asseteditor)中显示，位于 **属性（Attributes） > 骨骼（Bone） > 属性名（Attribute Name）** 之下。

![动画序列中的变换属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad5a1348-7198-46a4-a887-087f7e8cac4d/trans4.png)

你可以在动画序列视口中显示自定义变换属性，在视口菜单中点击 **角色（Character） > 骨骼（Bones）**，然后启用 **属性（Attributes）**。

![显示变换属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec9e4ae0-3799-4164-9d9d-15d8798f23f4/trans5.png)

## 引用属性

属性可以通过目标为 **骨架网格体组件（Skeletal Mesh Component）** 的 **获取属性（Get Attribute）** 函数在[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)中引用和读取。可以使用以下函数：

-   获取浮点属性（Get Float Attribute）
-   获取字符串属性（Get String Attribute）
-   获取整型属性（Get Integer Attribute）
-   获取变换属性（Get Transform Attribute）

![在蓝图中引用属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8c8ffb2-04f5-42bc-8688-b8532da6b6f8/ref1.png)

这些函数包含以下常见引脚信息：

名称

描述

**目标（Target）**

**骨架网格体组件（Skeletal Mesh Component）** 目标。

**骨骼名称（Bone Name）**

包含自定义属性的骨骼的名称。

**属性名称（Attribute Name）**

要查找的自定义属性的名称。

**默认值（Default Value）**

如果无法找到属性，该数值将会被送至 **输出值（Out Value）**。

**查找类型（Lookup Type）**

指定如何在骨架中查找属性，有以下选项：

-   **仅骨骼（Bone Only）**, 只在指定的 **骨骼名称（Bone Name）** 上搜索属性。
-   **直系母级（Immediate Parent）**, 在指定的 **骨骼名称（Bone Name）** 及其第一个母骨骼上搜索属性。
-   **母级层级（Parent Hierarchy）**, 在指定的 **骨骼名称（Bone Name）** 及其上部层级的所有母级骨骼中搜索属性，一直到根骨骼。

**输出值（Out Value）**

输出属性的数值，如果无法找到属性，输出数值为 **默认值（Default Value）**。

**返回值（Return Value）**

如果运行该函数时找到了属性，那么输出 **是（true）**，否则就输出 **否（false）**。

### 获取属性引用

你也可以使用 **获取属性引用（Get Attribute Ref）** 函数。这些函数需要将一个 **变量（Variable）** 连接至 **输出值（Out Value）**，它将会把数值写入你连接到引脚上的变量。与获取属性函数不同，获取属性引用函数会在没有找到属性的情况下保留属性的上一个值。

![获取属性引用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a36e1805-fdca-4cfb-af3a-ab2955e006cc/ref2.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [导入属性](/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%B1%9E%E6%80%A7)
-   [项目设置](/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine#%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [动画序列](/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%BA%8F%E5%88%97)
-   [变换属性](/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine#%E5%8F%98%E6%8D%A2%E5%B1%9E%E6%80%A7)
-   [FBX设置](/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine#fbx%E8%AE%BE%E7%BD%AE)
-   [设置和导入](/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%92%8C%E5%AF%BC%E5%85%A5)
-   [引用属性](/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine#%E5%BC%95%E7%94%A8%E5%B1%9E%E6%80%A7)
-   [获取属性引用](/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine#%E8%8E%B7%E5%8F%96%E5%B1%9E%E6%80%A7%E5%BC%95%E7%94%A8)