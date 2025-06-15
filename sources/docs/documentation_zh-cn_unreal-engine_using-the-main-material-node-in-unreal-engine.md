# 使用虚幻引擎中的主材质节点 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:26:20.761Z

---

目录

![使用主材质节点](https://dev.epicgames.com/community/api/documentation/image/0014c20b-e989-4231-8eef-da2cf1cabea3?resizing_type=fill&width=1920&height=335)

**材质（Materials）** 通过使用名为 **高级着色语言（High Level Shading Language）** （简称HLSL）的专门编码语言创建。 HLSL允许材质直接将指令发送到图形硬件，以便美术师和编码人员控制屏幕上显示的内容。在虚幻引擎5 (UE5)中，用于创建材质的 **材质表达式（Material Expression）** 节点包含此HLSL节点的小片段。

**主材质节点（Main Material Node）** 上的输入是UE5材质图表中的最后一站。 连接到主材质节点输入中的材质表达式节点组合将决定在关卡中编译并使用的最终材质的总体外观。

![UE5主材质节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01998ec2-8cdb-404b-a64d-5ec37f6e6d33/main-material-node-ue5.png)

带有默认输入的主材质节点。

## 材质输入

主材质节点上的每个 **输入（input）** 定义了材质的外观和表面属性的单个唯一方面。 例如，如果你将 **Constant3Vector** 连接到 **基础颜色（Base Color）** 输入，并为其提供值(1,0,0)，你就可以将材质设置为红色。

![基础颜色中的向量3](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56ccee5f-708c-4587-917b-59e1f17c0523/base-color.png)

此材质图表仅显式定义了材质的单个方面——其基础颜色。

但是，材质的总体外观是主材质节点中所有已启用输入的集体结果。 已启用输入引脚在主材质节点上是白色的，而已禁用输入显示为灰色。

![主材质节点中的已启用输入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d033d31-655e-464d-9887-24f4cdd733e5/active-inputs.png)

未从图表中的材质表达式接收数据的输入会直接恢复为默认值。 例如，尽管没有内容插入到"金属感（Metallic）"、"高光度（Specular）"或"粗糙度（Roughness）"，这些属性仍会影响材质的外观。

![空的材质输入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58290280-dcd3-4ab6-824b-dfb11d1c6a40/empty-inputs.png)

-   **金属感（Metallic）** 默认为0（非金属）。
-   **高光度（Specular）** 默认为0.5。
-   **粗糙度（Roughness）** 默认为0.5。

因此，将这些值插入到"金属感（Metallic）"、"高光度（Specular）"和"粗糙度（Roughness）"的材质，其外观与之前显示的材质完全相同。

  ![滑块：请注意，当默认数值连接到主材质节点时，预览渲染效果不会发生更改。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30f9581c-bbe4-470d-b083-b544a035912f/default-no-inputs.png) ![滑块：请注意，当默认数值连接到主材质节点时，预览渲染效果不会发生更改。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c527d6e7-3075-474a-bfda-91b2217fa715/default-spec-metallic-roughness.png) ![滑块：请注意，当默认数值连接到主材质节点时，预览渲染效果不会发生更改。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4da6b42d-1721-49a4-9e12-dc9939ebfa4d/new-values.png)

滑块：请注意，当默认数值连接到主材质节点时，预览渲染效果不会发生更改。

通过更改这些值，你可以改变材质的外观和表面属性。 在第三个图像中，粗糙度值从 **0.5更改为0.07** ，并且材质看起来更加锃亮。 将 **Constant3Vector** 中的值更改为 **(0,0,1)** 会将基础颜色设置为蓝色而不是红色。

### 理解材质输入

UE5将 **基于物理的渲染（Physically Based Rendering）** (PBR) 工作流程用于材质，这意味着材质非常接近真实世界中表面与光线的交互方式。 要有效创建材质，请务必理解每个输入对最终材质的确切影响如何。 这两页提供有关虚幻引擎5中PBR材质工作流程的基础信息。

-   阅读[基于物理的渲染](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine)概述，以了解在PBR工作流程中创建材质的最佳实践。
-   阅读[材质输入](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine)页面，以了解主材质节点上每个输入的用途的示例和说明。

### 已启用和已禁用的输入

主材质节点中的某些输入引脚在默认情况下已启用，而其他输入引脚则已禁用。 **细节面板（Details Panel）** 中的以下属性决定哪些输入已启用。

-   材质域
-   混合模式
-   着色模型

![默认主材质节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5204477e-ea5b-4e92-a7d1-12858946aaf8/enabled-inputs.png)

修改这三个材质属性之一可能会更改主材质节点中启用和禁用的输入。

在中间示例中，将混合模式从 **不透明（Opaque）** 更改为 **半透明（Translucent）** 会启用"不透明度"和"折射"输入。 还会禁用半透明材质未使用的所有输入。

![主材质节点变体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74bf413b-f245-420b-9bf6-bbdf073f5c20/main-mat-node-variations.png)

在最右侧，选择 **清除涂层着色模型（Clear Coat Shading Model）** 会启用"清除涂层"和"清除涂层粗糙度"的输入。

你必须选择主材质节点才能在 **细节面板（Details Panel）** 中访问这些属性。要选择主材质节点，请使用 **鼠标左键** 点击该节点，或点击材质图表背景中的任意位置。

### 连接到已禁用输入的节点将被忽略

在混合模式或着色模型之前切换时，一些输入可能会被禁用。 材质表达式仍连接到已禁用的输入，但在编译材质时会被忽略。

在本示例中，某个常量值连接到"不透明度"。 混合模式从 **半透明（Translucent）** 更改为 **不透明（Opaque）** ，导致"不透明度"输入被禁用。

![不透明度已禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f506c80-85fa-435a-b7a1-1e6095a8a329/opacity-ignored.png)

常量节点仍连接到"不透明度"输入，但电缆和输入显示为灰色，以指示输入已禁用。 连接到已禁用输入的节点不会对编译的材质造成任何影响。

## 主材质节点细节面板属性

在材质编辑器中选择主材质节点时， **细节（Details）** 面板会显示与材质用法相关的所有可编辑属性列表。

如上所示， **混合模式（Blend Mode）** 和 **着色模型（Shading Model）** 之类的属性会直接影响主材质节点中有哪些输入被启用。 其他分段允许你修改材质与特定平台或渲染功能交互的方式。

下面是主材质节点细节面板中每个分段的用途的简要细分内容：

![细节面板属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a348046-7644-4847-8800-74a60deaeef5/details-panel-properties.png)

分段名称：

说明

**物理材质（Physical Material）**

这允许你指定哪种类型的物理材质用于此材质。

**材质（Material）**

编辑材质时，你会在这里花费大部分时间。你可以在"材质（Material）"分段中更改材质域、混合模式和着色模型，以及其他更多选项。

**物理材质遮罩（Physical Material Mask）**

要用于此材质的物理材质贴图数组。

**半透明（Translucency）**

你可以在这里调整此材质中的半透明如何运作。请注意，仅当材质混合模式设置为"半透明（Translucent）"时，此分段才可编辑。

**半透明自身阴影（Translucency Self Shadowing）**

你可以在这里调整半透明自身阴影的外观和行为。请注意，仅当材质混合模式设置为"半透明（Translucent）"时，此分段才可编辑。

**用途（Usage）**

你在这里设置此材质将用于哪种类型的对象。用途标记通常由编辑器自动设置。但是，如果你知道此材质应当用于特定对象类型，请确保在这里将其启用，以避免将来出错。

**移动（Mobile）**

你在这里设置此材质在智能手机等移动设备上使用时应如何表现。

**前向着色（Forward Shading）**

在使用前向着色渲染器时的逐材质覆盖。

**组排序（Group Sorting）**

允许你更改材质中参数组的顺序。

**后期处理材质（Post Process Material）**

你在这里定义此材质应如何用于后期处理和色调映射。请注意，仅当材质域设置为"后期处理（Post Process）"时，此分段才可编辑。

**折射（Refraction）**

用于更改折射模式和折射深度偏离的属性。

**Lightmass**

你可以在这里调整此材质与Lightmass的交互方式。

**预览（Previewing）**

更改用于在材质编辑器视口中预览材质的静态网格体。

**导入设置（Import Settings）**

要用于此材质的一系列导入数据类型以及与之相关的选项。

在[材质属性](/documentation/zh-cn/unreal-engine/unreal-engine-material-properties)页面上查看有关这些设置的更多信息。

## 使用主材质节点

主材质节点上的输入的工作方式与材质图表中的其他所有材质表达式或函数完全相同。

要将材质表达式连接到主材质节点中的输入，请执行以下操作：

1.  **左键单击** 材质表达式的输出引脚，并将鼠标拖动到主材质节点上的输入引脚。
    
    ![拖动连接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22ad647e-627b-40a8-a6ed-72cf41751317/drag-connection.png)
2.  当绿色勾选图标显示时，在输入引脚上释放 **鼠标左键**。
    
    ![连接材质节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68fb3aba-78a6-429c-833e-7ee5bb79b417/connect-node.png)

如果你不知道如何将材质表达式和函数放入材质图表中，请[阅读此处](/documentation/zh-cn/unreal-engine/placing-material-expressions-and-functions-in-unreal-engine)。

## 预览和应用材质

主材质节点是UE5材质图表的终点。 你传递到主材质节点输入中的信息最终决定了材质的外观。 当你将材质表达式连接到主材质节点时，材质编辑器视口中的预览会持续更新，这样你可以评估你的更改，并确保获得所需的结果。

继续阅读有关[预览材质的各种方式](/documentation/zh-cn/unreal-engine/previewing-and-applying-your-materials-in-unreal-engine)以及如何将其应用于关卡中的Actor的信息。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [材质输入](/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine#%E6%9D%90%E8%B4%A8%E8%BE%93%E5%85%A5)
-   [理解材质输入](/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine#%E7%90%86%E8%A7%A3%E6%9D%90%E8%B4%A8%E8%BE%93%E5%85%A5)
-   [已启用和已禁用的输入](/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine#%E5%B7%B2%E5%90%AF%E7%94%A8%E5%92%8C%E5%B7%B2%E7%A6%81%E7%94%A8%E7%9A%84%E8%BE%93%E5%85%A5)
-   [连接到已禁用输入的节点将被忽略](/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine#%E8%BF%9E%E6%8E%A5%E5%88%B0%E5%B7%B2%E7%A6%81%E7%94%A8%E8%BE%93%E5%85%A5%E7%9A%84%E8%8A%82%E7%82%B9%E5%B0%86%E8%A2%AB%E5%BF%BD%E7%95%A5)
-   [主材质节点细节面板属性](/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine#%E4%B8%BB%E6%9D%90%E8%B4%A8%E8%8A%82%E7%82%B9%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF%E5%B1%9E%E6%80%A7)
-   [使用主材质节点](/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%B8%BB%E6%9D%90%E8%B4%A8%E8%8A%82%E7%82%B9)
-   [预览和应用材质](/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine#%E9%A2%84%E8%A7%88%E5%92%8C%E5%BA%94%E7%94%A8%E6%9D%90%E8%B4%A8)

相关文档

[

材质输入

![材质输入](https://dev.epicgames.com/community/api/documentation/image/e597ee6d-9089-48c5-948f-900cae75b677?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine)

[

材质编辑器指南

![材质编辑器指南](https://dev.epicgames.com/community/api/documentation/image/14556df3-8b8e-4517-8ed0-d76a90f5fdfe?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)

[

材质编辑器UI

![材质编辑器UI](https://dev.epicgames.com/community/api/documentation/image/4c4d4a6a-52c0-432a-bd48-7a029cd60652?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-ui)

[

材质基本概念

![材质基本概念](https://dev.epicgames.com/community/api/documentation/image/fbac30c8-a779-4090-bf78-ba9029431fd8?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts)

[

材质属性

![材质属性](https://dev.epicgames.com/community/api/documentation/image/1dd04efc-be01-4b5d-b4c8-f876754895b1?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-properties)