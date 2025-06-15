# 虚幻引擎中的顶点动画工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:07:03.979Z

---

目录

![顶点动画工具](https://dev.epicgames.com/community/api/documentation/image/0ff88c78-5a48-49d0-aaf6-0e8b0b659868?resizing_type=fill&width=1920&height=335)

将复杂的动画数据存储在 2D 纹理中或网格 UV 中是在保持必要的动画外观和感觉前提下降低动画开销的好方法。 过去你可能使用 [变形目标](/documentation/zh-cn/unreal-engine/static-mesh-morph-targets-in-unreal-engine) 做过同样的事，但是这个新方法有几个变形目标所不具备的优点。 其中一个优点就是允许你在无法利用变形目标的系统（例如级联粒子编辑器）中使用复杂的动画数据。 在下列文档中，我们将论述如何使用此脚本为你的项目生成内容。

## 先决条件

在我们开始使用脚本前你需要了解几点知识，这样才能在使用这种技术时获得尽可能好的结果。

### 脚本位置

顶点动画脚本将位于下列位置，名为 **VertexAnimationTools.ms**。

```cpp
		Engine\Extras\3dsMaxScripts\VertexAnimationTools.ms

```

最新版本的顶点动画脚本已经更新，修正了3Ds Max 2014及以上版本处理图像灰度的方式。

### 关于工具的警告

虽然此工具通过将复杂的动画数据存储到纹理中，可以非常有效地降低动画开销，但使用此工具也会带来几个缺点。 首先，此工具只能在一个 2D 纹理中最多影响 **8192 个顶点**。 这是因为对于 DirectX 11，纹理的最大大小是在 X 或 Y 方向为 8192 像素。 此工具使用下列公式生成纹理中的数据。

```cpp
		最终纹理分辨率：X = 网格中的顶点数，Y = 捕获的帧数。

```

由于这一限制，此工具最适合用于需要动画但可能不宜使用复杂动画结构来实现的视觉效果或环境静态网格。 此工具也 **不适用于** 骨骼网格动画，因为材质编辑器不能使用骨骼转换。 这意味着如果你想以类似的方式影响骨骼网格的顶点，需要使用 [变形目标](/documentation/zh-cn/unreal-engine/static-mesh-morph-targets-in-unreal-engine)。

### 顶点动画工具详解

在顶点动画工具中，你将找到影响静态网格顶点的两种截然不同的方法。 下一节我们将说明这两种方法并讨论它们彼此的差异。

-   **顶点动画工具（Vertex Animation Tools）：**顶点动画工具最上面的部分标为"顶点动画工具"（Vertex Animation Tools），用于生成将存储变形目标顶点位置和法线的 2D 纹理。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57d7c153-0ebe-458d-92f7-46d6951970f3/vat_tool_breakdown_01.png)
    
    属性名称
    
    说明
    
    **动画选项（Animation Options）：**
    
    "动画选项"（Animation Options）允许你选择是使用在 3Ds Max 中用时间轴创建的动画，还是使用在 3Ds Max 或其他 3D 软件包（例如 Maya 或 Blender）中创建然后从该软件包逐帧导出的各个关键帧网格，以便在 3Ds Max 中重新构建动画。
    
    **处理动画网格（Process Animated Meshes）：**
    
    此按钮将处理 3Ds Max 场景中的动画网格，创建然后导出所需的纹理。
    
    **动画开始（Anim Start）：**
    
    此选项定义应该作为动画开头的帧。
    
    **动画结束（Anim End）：**
    
    此选项定义应该作为动画结尾的帧。
    
    **跳帧（Frame Skip）:**
    
    此选项允许你跳过若干帧以在纹理空间上尝试和保存。
    
    **处理选定网格（Process Selected Meshes）：**
    
    此选项仅在启用关键帧网格的情况下可用，它将按选择的先后顺序处理选定的关键帧网格。
    
-   **序列描画器（Sequence Painter）：**序列描画器的作用与顶点动画工具相似，但有一个关键的不同，顶点的信息存储在网格 UV 中而不是 2D 纹理中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78a14c88-2788-4dc8-a1d0-9ecbcc59adc0/vat_tool_breakdown_02.png)
    
    属性名称
    
    说明
    
    **描画选择序列（Paint Selection Sequence）：**
    
    此选项在网格 UV 中存储关于网格顶点的信息，而不是将该数据存储在 2D 纹理中。
    

### 3Ds Max 版本和脚本安装

我们只使用 **3Ds Max 2015** 测试过此工具。 虽然它也许能够和其他 3Ds Max 版本配合工作，但我们尚未测试过任何其他版本，因此使用其他版本的 3Ds Max 请自负风险。 要安装脚本，只需将脚本从它在 **4.8\\Engine\\Extras\\3dsMaxScripts** 中的位置拖到 3Ds Max 视口中，然后脚本将自动启动。

如果你发现自己经常使用此脚本，可以将脚本添加到某个工具栏或者四向菜单中。如果你不清楚如何添加，[Autodesk 站点有非常详细的操作指南](http://knowledge.autodesk.com/support/3ds-max/learn-explore/caas/CloudHelp/cloudhelp/2015/ENU/3DSMax/files/GUID-A2CF8BAA-7B52-40A8-8C40-803B1AB5FC05-htm.html)，将为你说明如何操作。

## 3Ds Max 单位设置

在我们开始使用工具前，首先需要确保将 3Ds Max 使用的计量单位设置为与 UE4 使用的计量单位相符。 这样我们就能确保此工具从 3Ds Max 导出的数据在 UE4 中也能以同样的方式工作。 由于 UE4 使用厘米作为其默认计量单位，我们需要确保 3Ds Max 也使用此单位，为了更改此设置，我们需要进行下列操作。

1.  首先，打开 3Ds Max 2015，完成加载后从主菜单栏选择 **定制（Customize）** > **单位设置（Unit Setup）**。
2.  然后单击 **系统单位设置（System Unit Setup）**，将 **系统单位设置（System Unit Setup）**从"英寸"（Inches）改为 **厘米（Centimeters）**，再按 **确定（OK）**按钮。
3.  最后将 **显示单位刻度（Display Unit Scale）** 改为 **公制单位（Generic Units）**，并按 **确定（OK）**按钮。

**不要** 跳过此步骤，这一点极其重要。如果跳过此步骤，将内容导入 UE4 中时可能因为 UE4 和 3Ds Max 的单位不同而导致渲染错误。

## 工具选择

顶点动画 3Ds Max 脚本提供了两种不同的存储顶点动画数据方法。 一种方法在 2D 纹理中存储顶点位置，另一种方法在网格的 UV 中存储顶点位置数据。 在下面你将找到说明如何设置和使用这两种方法的链接。

[**关键帧方法**](/documentation/zh-cn/unreal-engine/vertex-animation-tool---key-framed-meshes-in-unreal-engine) - 此方法使用关键帧，它们可以从其他 3D 软件包导出，并导入 3Ds Max 中。信息保存在网格 UV 中。

[**动画时间轴方法**](/documentation/zh-cn/unreal-engine/vertex-animation-tool---timeline-meshes-in-unreal-engine) - 此方法使用 3Ds Max 动画时间轴，将结果编码为 2D 纹理。

## 提示与技巧

要想充分发挥此技术的优点，你可以遵循下面概述的几条提示与技巧。

### 提高动画播放速率

如果你感到动画播放速率太慢，可以使用 **TimeWithSpeedVariable** 材质函数加快播放速率。 要进行此操作，如果你使用 **MS\_SequencePainter\_SequenceFlibook** 材质函数，只需将 **TimeWithSpeedVariable** 的输出连接到 **0-1 动画（0-1 Animation）**输入。 如果你使用 **MS\_VertexAnimationTools\_MorphTargets** 材质函数，请将 **TimeWithSpeedVariable** 的输出连接到 **变形动画（Morph Animations）**的输入。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3c5de4c-2a95-4c21-9b1c-2b6e3af81a17/vat_sp_speed_up_time.png)

### 多个动画网格

你可以一次选择多个动画网格，脚本会将所有数据烘焙到一个网格和一组纹理。 在处理由不同部件组成的角色时，此功能非常有用。 只需选择你需要使用的部件，然后照常运行脚本即可。 脚本将把你选择的部件组合起来，从而生成一个新网格以及所需的 2D 纹理。

### 跳帧

使用脚本的 **顶点动画工具（Vertex Animation Tools）**部分的 **跳帧（Frame Skip）**选项可跳过某些帧。 这是一个非常有用的选项，因为通过它可以降低最终纹理大小，同时保留原动画的外观和感觉。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92635002-c268-4145-ab29-0782297fc1cf/vat_frame_skip.png)

看一看下面的示例视频，就能了解跳帧功能的实际运作。 你可以看到，在 Original 一词前面的茶壶显示了如何使用全帧范围生成动画。 下一个茶壶，也就是在数字 2 前面的那个，显示了每播一帧就跳过一帧的茶壶动画。以此类推。 你可以看到在最后一个示例中，即使跳过 10 帧，效果仍然保持原来的外观和感觉。

网格名称/编号

纹理大小

内存存储

Original

175 KB

不适用

2

59 KB

116 KB

5

30 KB

145 KB

10

21 KB

154 KB

## 技术信息

下一节说明关于顶点动画脚本如何工作的技术信息。 请注意，这里提供这些信息仅供参考，或者面向希望进一步了解脚本如何工作以便修改的人。

### 局限性

顶点位置变形目标信息以 16 位带正负号浮点数文件格式存储。 32 位图像更精确，但 16 位已经足以应对大多数 FX 工作。 也就是说，偏移浮点位置离其静止位置越远，精度越低。

还要注意的是，脚本纹理应该使用最邻近的方法采样。

### 内存用量

每帧每个顶点的内存使用量如下：

-   顶点偏移纹理：每帧每个顶点（每个像素）8 字节
-   法线纹理:每帧每个顶点（每个像素）4 字节

-   [tools](https://dev.epicgames.com/community/search?query=tools)
-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [3ds max](https://dev.epicgames.com/community/search?query=3ds%20max)
-   [deformers](https://dev.epicgames.com/community/search?query=deformers)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [脚本位置](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine#%E8%84%9A%E6%9C%AC%E4%BD%8D%E7%BD%AE)
-   [关于工具的警告](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine#%E5%85%B3%E4%BA%8E%E5%B7%A5%E5%85%B7%E7%9A%84%E8%AD%A6%E5%91%8A)
-   [顶点动画工具详解](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine#%E9%A1%B6%E7%82%B9%E5%8A%A8%E7%94%BB%E5%B7%A5%E5%85%B7%E8%AF%A6%E8%A7%A3)
-   [3Ds Max 版本和脚本安装](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine#3dsmax%E7%89%88%E6%9C%AC%E5%92%8C%E8%84%9A%E6%9C%AC%E5%AE%89%E8%A3%85)
-   [3Ds Max 单位设置](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine#3dsmax%E5%8D%95%E4%BD%8D%E8%AE%BE%E7%BD%AE)
-   [工具选择](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine#%E5%B7%A5%E5%85%B7%E9%80%89%E6%8B%A9)
-   [提示与技巧](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine#%E6%8F%90%E7%A4%BA%E4%B8%8E%E6%8A%80%E5%B7%A7)
-   [提高动画播放速率](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine#%E6%8F%90%E9%AB%98%E5%8A%A8%E7%94%BB%E6%92%AD%E6%94%BE%E9%80%9F%E7%8E%87)
-   [多个动画网格](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine#%E5%A4%9A%E4%B8%AA%E5%8A%A8%E7%94%BB%E7%BD%91%E6%A0%BC)
-   [跳帧](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine#%E8%B7%B3%E5%B8%A7)
-   [技术信息](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine#%E6%8A%80%E6%9C%AF%E4%BF%A1%E6%81%AF)
-   [局限性](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine#%E5%B1%80%E9%99%90%E6%80%A7)
-   [内存用量](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine#%E5%86%85%E5%AD%98%E7%94%A8%E9%87%8F)