# 虚幻引擎中的多边形组编辑工具参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:08:48.317Z

---

目录

![多边形组编辑参考](https://dev.epicgames.com/community/api/documentation/image/18ea17de-186b-4190-9c4b-eff84f3be139?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

本文档是多边形组编辑工具属性的参考指南，提供了一系列用于使用多边形组编辑网格体的操作指南。有关该工具的概述及其访问方式，请参阅[多边形组编辑](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-in-unreal-engine)。

在你开始使用多边形组编辑工具之前，我们推荐查看[了解多边形组](/documentation/zh-cn/unreal-engine/understanding-polygroups-in-unreal-engine)文档，详细了解多边形组及其创建方式。

多边形组编辑工具主要由以下分段构成：

-   [面编辑](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%9D%A2%E7%BC%96%E8%BE%91)：用于编辑网格体的多边形组面的操作。
-   [形状编辑](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%BD%A2%E7%8A%B6%E7%BC%96%E8%BE%91)：用于编辑网格体整体的操作。
-   [边缘编辑](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E8%BE%B9%E7%BC%98%E7%BC%96%E8%BE%91)：用于编辑网格体的多边形组边缘的操作。
-   [UV](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#uv)：用于创建UV的操作。
-   [选择](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E6%8B%A9%E6%93%8D%E4%BD%9C)：用于高亮显示网格体元素（多边形组顶点、边缘和面）的操作。你必须选择一个元素才能使用编辑分段中的多种操作。

关联的[热键](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E7%83%AD%E9%94%AE)在本文档结尾列出。

如果你在[工具确认](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%92%A4%E9%94%80%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E5%92%8C%E6%8E%A5%E5%8F%97%E6%9B%B4%E6%94%B9)面板中点击 **接受（Accept）** 或 **取消（Cancel）** ，多边形组编辑工具会关闭。

## 面编辑

**面编辑** 分段包括用于编辑网格体的多边形组面的操作。一个三角形就可以一个是多边形组面。使用操作之前，你必须首先选择一个面。如需更多信息，请参阅[选择筛选器](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E6%8B%A9%E7%AD%9B%E9%80%89%E5%99%A8)小节。

### 挤压

**挤压（Extrude）** 操作会沿一组所选的面正向或反向突出几何体，并使用所选项边界周围的新面将其连接到网格体。新面会沿袭相邻面的多边形组划分。如果所选项位于网格体边界上（不存在相邻面），你可以使用下表中的 **将共线性用于设置边界组（Use Colinearity for Setting Border Groups）** 设置调整新面的多边形组划分。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0ed0431-026c-404d-918e-308a9922fe1f/extrude-operation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0ed0431-026c-404d-918e-308a9922fe1f/extrude-operation.png)

点击查看大图。

点击挤压操作时，工具属性面板会显示操作的属性。选择面时，挤压操作还将作为可用的独立工具出现在 **选择（Select）** 类别中。如需详细了解此类别，请参阅[网格体元素选择](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E5%85%83%E7%B4%A0%E9%80%89%E6%8B%A9)。

**当前操作**

**说明**

**应用（Apply）**

将挤压更改烘焙到网格体中。

**取消(Esc)（Cancel (Esc)）**

否定更改。

**挤压**

**说明**

**距离模式（Distance Mode）**

确定挤压距离的设置方式。你可以使用以下方法：

-   **视在口中点击（Click in Viewport）：** 鼠标移动可控制挤压高度和深度。在视口中点击以完成挤压并退出操作。使用光标，你可以将挤压距离对齐到关卡中的对象。从所选区域中心发出的附加线将指示挤压的测量方向。
-   **固定（Fixed）：** 通过输入数字设置挤压高度或深度（ **距离（Distance）** ）。

**壳到实心（Shells to Solids）**

控制挤压整个开放边界块是应该创建实心壳还是开放壳。

-   True（启用）：将开放边界面挤压为实心壳（网格体中没有孔洞）。
-   False（禁用）：将开放边界面挤压为开放壳。

**方向模式（Direction Mode）**

确定挤压过程中顶点移动的方向。你可以使用以下方法：

-   **单个方向（Single Direction）：** 沿相同方向挤压所有三角形，无视其法线。
-   **所选三角形法线（Selected Triangle Normals）：** 采用每个受挤压的顶点周围的所选三角形的角度加权平均值，来确定顶点移动方向。
-   **所选三角形法线均匀（Selected Triangle Normals Even）：** 类似于"所选三角形法线"'，但还调整移动的距离，试图使三角形与原始朝向保持平行。
    -   **最大距离比例因子（Max Distance Scale Factor）：** 控制为了与源三角形保持平行，顶点可以从目标距离移动的最大距离。

[详见相关示例](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%8C%A4%E5%8E%8B%E6%96%B9%E5%90%91%E6%A8%A1%E5%BC%8F%E7%A4%BA%E4%BE%8B)

**方向（Direction）**

方向模式分段中单个方向处于活动状态时的挤压方向。你可以从以下选项中选择：

-   **所选法线（Selection Normal）**
-   **世界X（World X）**
-   **世界Y（World Y）**
-   **世界Z（World Z）**
-   **本地X（Local X）**
-   **本地Y（Local Y）**
-   **本地Z（Local Z）**

**高级**

**说明**

**测量方向（Measure Direction）**

当 **所选三角形法线（Selected Triangle Normals）** 或 **所选三角形法线均匀（Selected Triangle Normals Even）** 以及 **在视口中点击（Click In Viewport）** 处于活动状态时，测量挤压距离的方向。挤压高度基于相应轴上的鼠标位置设置。你可以从以下选项中选择：

-   **所选法线（Selection Normal）**
-   **世界X（World X）**
-   **世界Y（World Y）**
-   **世界Z（World Z）**
-   **本地X（Local X）**
-   **本地Y（Local Y）**
-   **本地Z（Local Z）**

**将共线性用于设置边界组（Use Colinearity for Setting Border Groups）**

考虑边缘共线性，以确定在被挤压的面接触网格体边界时，连接被挤压的面的边缘三角形如何分组。

-   如果为true，触碰网格体边界的边缘三角形将按照边界的共线分段进行分组。
-   如果为false，触碰网格体边界的所有边缘三角形将被分为一组。

例如，为true时，挤压扁平矩形会在一侧得出四个不同的多边形组，而不是一个相连的多边形组。

[选项](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E9%A1%B9)和[小工具](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)属性同样可用。

#### 挤压方向模式示例

 

 

 

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e50592f-658d-47da-b0ac-8ac32dd52e88/no-extrusion.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73b0d965-2f40-4496-afc0-977e43ffa740/single-direction.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0cfc32a1-fae6-47a5-b909-97b6800dfdc4/extrude-triangle-normal.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2d14de4-198e-43cc-88ae-8a38c3ce2d8d/extrude-triangle-normal-even.png)

 

无挤压

顶点法线

单个方向

所选三角形法线

所选三角形法线均匀

### 偏移

**偏移** 操作将突出所选面，类似于挤压操作，但默认为沿顶点法线而不是单个方向移动面。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18294a87-8c83-496e-9902-acd3f4c4fa51/offset-operation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18294a87-8c83-496e-9902-acd3f4c4fa51/offset-operation.png)

点击查看大图。

点击偏移操作时，工具属性面板会显示操作的属性。选择面时，偏移操作还作为可用的独立工具出现在 **选择（Select）** 类别中。如需详细了解此类别，请参阅[网格体元素选择](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E5%85%83%E7%B4%A0%E9%80%89%E6%8B%A9)。

**当前操作**

**说明**

**应用（Apply）**

将挤压更改烘焙到网格体中。

**取消(Esc)（Cancel (Esc)）**

否定更改。

**挤压（Extrude）**

**说明**

**距离模式（Distance Mode）**

确定挤压距离的设置方式。你可以使用以下方法：

-   **视在口中点击（Click in Viewport）：** 鼠标移动可控制挤压高度和深度。在视口中点击以完成挤压并退出操作。使用光标，你可以将挤压距离对齐到关卡中的对象。从所选区域中心发出的附加线将指示挤压的测量方向。
-   **固定（Fixed）：** 通过输入数字设置挤压高度或深度（ **距离（Distance）** ）。

**偏移（Offset）**

**说明**

**壳到实心（Shells to Solids）**

控制挤压整个开放边界块是应该创建实心壳还是开放壳。

-   True（启用）：将开放边界面挤压为实心壳（网格体中没有孔洞）。
-   False（禁用）：将开放边界面挤压为开放壳。

**方向模式（Direction Mode）**

确定挤压过程中顶点移动的方向。你可以使用以下方法：

-   **顶点法线（Vertex Normals）：** 遵循顶点法线，无论所选项如何。
-   **所选三角形法线（Selected Triangle Normals）：** 采用每个受挤压的顶点周围的所选三角形的角度加权平均值，确定顶点移动方向。
-   **所选三角形法线均匀（Selected Triangle Normals Even）：** 类似于所选三角形法线，但还调整移动的距离，试图使三角形与原始朝向保持平行。
    -   **最大距离比例因子（Max Distance Scale Factor）：** 控制为了与源三角形保持平行，顶点可以从目标距离移动的最大距离。

[详见相关示例](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%81%8F%E7%A7%BB%E6%96%B9%E5%90%91%E6%A8%A1%E5%BC%8F%E7%A4%BA%E4%BE%8B)

**高级**

**说明**

**测量方向（Measure Direction）**

当 **所选三角形法线（Selected Triangle Normals）** 或 **所选三角形法线均匀（Selected Triangle Normals Even）** 以及 **在视口中点击（Click In Viewport）** 处于活动状态时，测量挤压距离的方向。挤压高度基于相应轴上的鼠标位置设置。你可以从以下选项中选择：

-   **所选法线（Selection Normal）**
-   **世界X（World X）**
-   **世界Y（World Y）**
-   **世界Z（World Z）**
-   **本地X（Local X）**
-   **本地Y（Local Y）**
-   **本地Z（Local Z）**

**将共线性用于设置边界组（Use Colinearity for Setting Border Groups）**

考虑边缘共线性，以确定在被挤压的面接触网格体边界时，连接被挤压的面的边缘三角形如何分组。

-   如果为true，触碰网格体边界的边缘三角形将按照边界的共线分段进行分组。
-   如果为false，触碰网格体边界的所有边缘三角形将被分为一组。

例如，为true时，挤压扁平矩形会在一侧得出四个不同的多边形组，而不是一个相连的多边形组。

[选项](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E9%A1%B9)和[小工具](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)属性同样可用。

#### 偏移方向模式示例

 

 

 

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5c2fc80-009d-4e8b-a5d0-8aff62bd3368/selection.png)

![Vertex Normals](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75fb2a0e-6eb7-43d3-bcc7-bdad7aed42f7/vertex-normals.png)

![Selected Triangle Normals](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f96200b-0f9c-4c4f-a940-b2d9755bc035/triangle-normals.png)

![Triangle Normal Even](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a29e8352-8a7e-42a0-908b-1b58cb0aa80f/triangle-normal-even.png)

 

无挤压

顶点法线

单个方向

所选三角形法线

所选三角形法线均匀

### 推拉

**推拉** 操作将挤压面，从而切割或合并网格体部分。你可以将其视为在原始网格体和受挤压的所选项之间执行布尔操作（类似[布尔工具](/documentation/zh-cn/unreal-engine/boolean-tool-in-unreal-engine)所执行的操作）。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43b5b9b1-e67f-4ccc-948c-87db925513a7/push-pull-operation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43b5b9b1-e67f-4ccc-948c-87db925513a7/push-pull-operation.png)

左图为所选面；中图为推拉操作；右图为挤压操作。

点击推拉操作时，工具属性面板会显示操作的属性。选择面时，推拉操作还将作为可用的独立工具出现在 **选择（Select）** 类别中。如需详细了解此类别，请参阅[网格体元素选择](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E5%85%83%E7%B4%A0%E9%80%89%E6%8B%A9)。

**当前操作**

**说明**

**应用（Apply）**

将挤压更改烘焙到网格体中。

**取消(Esc)（Cancel (Esc)）**

否定更改。

**挤压**

**说明**

**距离模式（Distance Mode）**

确定挤压距离的设置方式。你可以使用以下方法：

-   **视在口中点击（Click in Viewport）：** 鼠标移动可控制挤压高度和深度。在视口中点击以完成挤压并退出操作。使用光标，你可以将挤压距离对齐到关卡中的对象。从所选区域中心发出的附加线将指示挤压的测量方向。
-   **固定（Fixed）：** 通过输入数字设置挤压高度或深度（ **距离（Distance）** ）。

**挤压选项（Extrusion Options）**

**说明**

**方向模式（Direction Mode）**

确定布尔操作前，挤压过程中顶点移动的方向。你可以使用以下方法：

-   **顶点法线（Vertex Normals）：** 遵循顶点法线，无论所选项如何。
-   **单个方向（Single Direction）：** 沿相同方向移动所有三角形，无论其法线如何。
-   **所选三角形法线（Selected Triangle Normals）：** 采用每个受挤压的顶点周围的所选三角形的角度加权平均值，确定顶点移动方向。
-   **所选三角形法线均匀（Selected Triangle Normals Even）：** 类似于所选三角形法线，但还调整移动的距离，试图使三角形与原始朝向保持平行。
    -   **最大距离比例因子（Max Distance Scale Factor）：** 控制为了与源三角形保持平行，顶点可以从目标距离移动的最大距离。

[详见相关示例](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%8E%A8%E6%8B%89%E6%96%B9%E5%90%91%E6%A8%A1%E5%BC%8F%E7%A4%BA%E4%BE%8B)

**壳到实心（Shells to Solids）**

控制挤压整个开放边界块是应该创建实心壳还是开放壳。

-   True（启用）：将开放边界面挤压为实心壳（网格体中没有孔洞）。
-   False（禁用）：将开放边界面挤压为开放壳。

**高级**

**说明**

**测量方向（Measure Direction）**

当 **所选三角形法线（Selected Triangle Normals）** 或 **所选三角形法线均匀（Selected Triangle Normals Even）** 以及 **在视口中点击（Click In Viewport）** 处于活动状态时，测量挤压距离的方向。挤压高度基于相应轴上的鼠标位置设置。你可以从以下选项中选择：

-   **所选法线（Selection Normal）**
-   **世界X（World X）**
-   **世界Y（World Y）**
-   **世界Z（World Z）**
-   **本地X（Local X）**
-   **本地Y（Local Y）**
-   **本地Z（Local Z）**

**将共线性用于设置边界组（Use Colinearity for Setting Border Groups）**

考虑边缘共线性，以确定在挤压的面接触网格体边界时，连接挤压的面的边缘三角形如何分组。

考虑边缘共线性，以确定在被挤压的面接触网格体边界时，连接被挤压的面的边缘三角形如何分组。

-   如果为true，触碰网格体边界的边缘三角形将按照边界的共线分段进行分组。
-   如果为false，触碰网格体边界的所有边缘三角形将被分为一组。

例如，为true时，挤压扁平矩形会在一侧得出四个不同的多边形组，而不是一个相连的多边形组。

[选项](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E9%A1%B9)和[小工具](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)属性同样可用。

#### 推拉方向模式示例

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ca74854-51e5-46c7-b3b7-59726dd97ec2/selection.png)

![Vertex Normals](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c445b53-6804-419b-b1f5-27745df7ed60/vertex-normals.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb6adf67-443b-4787-8c7e-69adbb701c1e/push-pull-single-direction.png)

![Selected Triangle Normals](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5fd26af8-8f10-40bc-8d2c-9e0976d3a8e9/triangle-normals.png)

![Triangle Normal Even](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abab9c88-084a-4657-944c-d956ac408770/triangle-normal-even.png)

无挤压

顶点法线

单个方向

所选三角形法线

所选三角形法线均匀

### 内嵌

**内嵌** 操作会收缩所选的一组面以创建新面。鼠标移动可控制内嵌距离。在视口中点击可完成内嵌。

点击内嵌操作时，工具属性面板会显示操作的属性。内嵌操作还将作为可用的独立工具出现在 **选择（Select）** 类别中。如需详细了解此类别，请参阅[网格体元素选择](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E5%85%83%E7%B4%A0%E9%80%89%E6%8B%A9)。

**当前操作**

**说明**

**完成（Done）**

如果你决定不需要更改，点击即可退出操作。你还可以使用 **Ctrl** + **Z** 取消操作。

**内嵌/外嵌（Inset/Outset）**

**说明**

**柔和度（Softness）**

应用到内嵌边界的平滑程度。该值较低时，所选项边界上的面可能会在弯曲处重叠。

**重新投射（Reproject）**

确定内嵌区域中的顶点是否应该被投射回输入表面上。

**仅边界（Boundary Only）**

控制该操作是同时移动内部顶点，还是仅移动边界顶点。

**面积比例（Area Scale）**

在求解内部顶点时调整面积缩放。

这些设置在高分辨率的曲面上最值得注意。

[选项](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E9%A1%B9)和[小工具](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)属性同样可用。

### 外嵌

**外嵌** 操作将向外展开所选的一组面以创建新面。鼠标移动可控制外嵌距离。在视口中点击可确认外嵌距离。

点击外嵌操作时，工具属性面板会显示操作的属性。外嵌操作还将作为可用的独立工具出现在 **选择（Select）** 类别中。如需详细了解此类别，请参阅[网格体元素选择](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E5%85%83%E7%B4%A0%E9%80%89%E6%8B%A9)。

**当前操作**

说明

**完成（Done）**

如果你决定不需要更改，点击即可退出操作。你还可以使用 **Ctrl** + **Z** 取消操作。

**内嵌/外嵌（Inset/Outset）**

说明

**柔和度（Softness）**

应用到内嵌边界的平滑程度。该值较低时，所选项边界上的面可能会在弯曲处重叠。

**仅边界（Boundary Only）**

控制外嵌操作是否移动内部顶点以及边界顶点。

**面积比例（Area Scale）**

在求解内部顶点时调整面积缩放。

这些设置在高分辨率的曲面上最值得注意。

[选项](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E9%A1%B9)和[小工具](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)属性同样可用。

### 斜边

**斜边（Bevel）** 操作使所选面周围的边缘循环倾斜，以创建边缘对齐的面。

点击斜边操作时，工具属性面板会显示操作的属性。斜边操作还将作为可用的独立工具出现在 **选择（Select）** 类别中。如需详细了解此类别，请参阅[网格体元素选择](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E5%85%83%E7%B4%A0%E9%80%89%E6%8B%A9)。

**当前操作**

说明

**应用（Apply）**

将更改烘焙到网格体中。

**取消(Esc)（Cancel (Esc)）**

否定更改。

**斜边（Bevel）**

说明

**斜边距离（Bevel Distance）**

调

整斜边的长度。

长度设置得太高可能导致面重叠。

[选项](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E9%A1%B9)和[小工具](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)属性同样可用。

### 删除

**删除（Delete）** 操作将删除所选面。你还可以使用热键 **Backspace** 和 **Delete** 。

### 合并

**合并（Merge）** 操作会将所选的一组面组合为一个面，创建新的多边形组。

### 切割面

**切割面（Cut Faces）** 操作沿绘制的线条分开所选的面，就像有一个平面沿该线条切割了它们一样。切割的边界处会形成新的多边形组。

要绘制线条，请按照以下步骤操作：

1.  点击所选面上的任意点，或对齐到某个顶点。
2.  移动光标，设置线条方向和距离。
3.  点击设置切割线。

切割仅在所选面上发生，包括与所绘线条相交但被遮挡的面。

点击切割面操作时，工具属性面板会显示操作的属性。切割面操作还将作为可用的独立工具出现在 **选择（Select）** 类别中。如需详细了解此类别，请参阅[网格体元素选择](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#meshelementselection)。

**当前操作**

**说明**

**完成（Done）**

如果你决定不需要更改，点击即可退出操作。你还可以使用 **Ctrl** + **Z** 取消操作。

**切割（Cut）**

**说明**

**方向（Orientation）**

确定在拆分面时切割平面的方向。切割曲面时，差异更明显。你可以从以下选项中选择：

-   **面法线（Face Normals）：** 切割平面使用所绘线条的末端处的法线确定方向。
-   **查看方向（View Direction）：** 切割平面的方向与查看方向对齐。

**对齐顶点（Snap Vertices）**

确定光标是否应该对齐到顶点。

[选项](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E9%A1%B9)和[小工具](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)属性同样可用。

### 重新计算法线

**重新计算法线（Recalc Normals）** 操作将重新计算当前所选的一组面的法线。

![编辑网格体后的法线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/661cab18-a88f-4fb1-a75e-1f3f3ca75caa/original-normals.png)

![重新计算的法线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1cc1fdf9-7522-4863-abcd-06e73dd5f0f8/recalculated-normals.png)

编辑网格体后的法线

重新计算的法线

### 翻转

**翻转（Flip）** 操作将反转当前所选的一组面的法线和面的方向。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6eb63d1-0974-459e-9731-a98ff8887484/flip-operation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6eb63d1-0974-459e-9731-a98ff8887484/flip-operation.png)

点击查看大图。

### 重新三角剖分

**重新三角剖分（Retriangulate）** 操作将删除所选项中的所有内部顶点，并尝试仅使用其边界对其重新进行三角剖分。

![内部顶点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a48398a-f373-4529-9ec5-3c3b7028c8e1/interior-vertices.png)

![最小化三角剖分](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92b08357-7d0f-4d09-b03f-625c1bba6371/retriangulate.png)

内部顶点

最小化三角剖分

### 分解

**分解（Decompose）** 操作会将每个所选面分拆成每个三角形一个单独的多边形组。

### 断开连接

**断开连接（Disconnect）** 操作将在边界处分开所选面，断开其与网格体的连接。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d96b4542-dc97-41da-8437-d4917053ea2e/disconnect-operation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d96b4542-dc97-41da-8437-d4917053ea2e/disconnect-operation.png)

点击查看大图。

### 复制

**复制（Duplicate）** 操作将在边界处复制所选面。复制的面不与网格体相连。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f60c6b05-9c74-4b3b-883c-cdc89477142c/duplicate-operation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f60c6b05-9c74-4b3b-883c-cdc89477142c/duplicate-operation.png)

点击查看大图。

## 形状编辑

**形状编辑** 分段包含用于编辑整个网格体的操作。

### 插入边缘循环

使用 **插入边缘循环（Insert Edge Loop）** 操作在网格体中类似四边形的多边形组中插入边缘链。你只能将边缘添加到恰好有四个内角的、类似四边形的面。你可以在该操作处于活动状态时设置多个插入。

点击插入边缘循环操作时，工具属性面板会显示操作的属性。插入边缘循环操作还将作为可用的独立工具出现在 **选择（Select）** 类别中。如需详细了解此类别，请参阅[网格体元素选择](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E5%85%83%E7%B4%A0%E9%80%89%E6%8B%A9)。

**当前操作**

说明

**完成（Done）**

如果你决定不需要更改，点击即可退出操作。你还可以使用 **Ctrl** + **Z** 取消操作。

**插入边缘循环（Insert Edge Loop）**

说明

**位置模式（Position Mode）**

确定边缘循环相对于循环方向的垂直位置。你可以从以下方法中选择：

-   **均匀（Even）：** 通过均匀划分每个面的起始和终止边缘来插入边缘。例如，一次插入单个循环时，新边缘恰好在中点处与现有边缘交叉。在"均匀"处于活动状态时，可以使用 **循环数量（Number of Loops）** 选项。
    -   **循环数量（Number of Loops）：** 确定一次插入多少个循环。
-   **比例偏移（Proportion Offset）：** 边缘循环位于与它们相交的各个边缘的同等长度比例处。
-   **距离偏移（Distance Offset）：** 边缘循环位于它们相交的各个边缘的起点的恒定距离处。如果边缘太短，循环将被限制在末端。在"距离偏移"处于活动状态时，可以使用"翻转偏移方向（Flip Offset Direction）" 选项。
    -   **翻转偏移方向（Flip Offset Direction）：** 从边缘的对面测量距离偏移量。

**插入方向（Insertion Mode）**

确定如何将边缘循环添加到网格体。你可以从以下方法中选择：

-   **重新三角剖分（Retriangulate）：** 删除现有组，并为新组创建新三角形。此过程会使拓扑保持简单，但会破坏非平面组。
-   **平面切割（Plane Cut）：** 保持现有三角形，并切割它们以创建新路径。此过程会保留非平面组的形状，但可能会随时间推移产生片段化三角形。

**高亮显示问题组（Highlight Problem Groups）**

为true时，高亮显示可阻碍循环的非四边形类多边形组，并使用X标记其内角。

**高级（Advanced）**

说明

**交互式（Interactive）**

决定是使用光标还是数字值设置边缘的偏移量。为false时，偏移量由距离或比例偏移量通过数字方式指定，而鼠标点击仅选择边缘。不可用于均匀位置模式。

**距离偏移（Distance Offset）**

通过数字方式设置偏移量。仅在交互式为false且位置模式被设置为距离偏移时可用。

**比例偏移 （Proportion Offset）**

通过数字方式设置偏移量。仅在交互式为false且位置模式被设置为比例偏移时可用。

**顶点公差（Vertex Tolerance）**

确定新循环边缘需要距离现有顶点多近，才会在与某个边缘交叉时使用该现有顶点，而不是创建新顶点。

[选项](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E9%A1%B9)和[小工具](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)属性同样可用。

### 插入边缘

使用 **插入边缘（Insert Edge）** 将一个边缘添加到单个面中的现有边缘或顶点。该操作处于活动状态时，可以设置同时插入多个边缘。

要插入边缘，请按照以下步骤操作：

1.  沿网格体边缘点击或对齐到顶点。
2.  移动光标，设置边缘方向和距离。
3.  点击相邻边缘或对齐到顶点以添加新边缘。

当插入边缘不足以将给定的面划分成单独的几部分时，该操作将无法添加边缘。

例如，它无法连接O形面的内边缘和外边缘，因为面的三角形会以C形状保持连接，这意味着在新边缘处没有多边形组边界。在这种情况下插入边缘需要使用切割面工具（它会切开整个面，而不仅仅是在端点之间切割）或将面分解为多个新的多边形组。

点击插入边缘操作时，工具属性面板会显示操作的属性。

**当前操作**

**说明**

**完成（Done）**

如果你决定不需要更改，点击即可退出操作。你还可以使用 **Ctrl** + **Z** 取消操作。

**插入边缘**

**说明**

**插入模式（Insertion Mode）**

确定如何将边缘循环添加到网格体。你可以从以下方法中选择：

-   **重新三角剖分（Retriangulate）：** 删除现有组，并为新组创建新三角形。此过程会使拓扑保持简单，但会破坏非平面组。
-   **平面切割（Plane Cut）：** 保持现有三角形，并切割它们以创建新路径。此过程会保留非平面组的形状，但可能会随时间推移产生片段化三角形。

**连续插入（Continuous Insertion）**

为true时，插入的边缘会被链接起来，以便每个终点成为新的起点。

**高级（Advanced）**

**说明**

**顶点公差（Vertex Tolerance）**

确定新边缘需要距离现有顶点多近，才会在与某个边缘交叉时使用该现有顶点，而不是创建新顶点。这在存在内部顶点的情况下，使用平面切割模式时尤其有用。

[选项](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E9%A1%B9)和[小工具](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)的属性也可用。

### 按组简化

**按组简化（Simplify by Groups）** 将删除共用直边上的顶点、删除所有内部顶点并重新三角剖分，以简化每个多边形组。

在多边形组很简单且有不需要的内部或共线顶点时，此过程有助于清理网格体拓扑。但是，不要将该操作用于涉及非平面的面的多边形组拓扑，因为它会失去形状并销毁无法进行重新三角剖分的所有面（在此情况下，完成后会显示警告）。例如，这目前无法在圆柱体的侧面是单个多边形组时对其进行重新三角剖分。

![内部顶点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fac0784b-73a4-4a1c-ba79-2b5038b3348f/simplify-by-groups-2.png)

![简化后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56d11db8-92e4-4e57-84a4-8c5f5acc4d7f/simplify-by-groups.png)

内部顶点

简化后

## 边缘编辑

**边缘编辑** 分段包含用于编辑网格体的多边形组边缘的操作。使用操作之前，你必须选择一个边缘。如需更多信息，请参阅[选择筛选器](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E6%8B%A9%E7%AD%9B%E9%80%89%E5%99%A8)小节。

### 结合

结合操作将合并两个所选边缘，将第一个所选边缘移入第二个边缘。

### 拉直

**拉直** 操作会使所选每个边缘采用终点之间的笔直路径。

### 填补空隙

**填补空隙** 操作将填补所有选定边界边缘的相邻孔隙。

### 斜边

**斜边** 操作将使选定边缘倾斜，将其替换为斜角面。

![无斜边](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71da7f39-22e4-4ec9-84da-9cac62c46460/no-bevel.png)

![斜边](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18b2064c-7fe4-4df6-8307-385d5aef9d45/bevel.png)

无斜边

斜边

### 桥接

**桥接** 操作将创建新面来连接选定边缘。

### 简化

**简化** 操作将尝试沿边缘删除共线顶点，前提是这样做不会更改UV或产生低质量的三角形。

## UV

**UV** 分段包含用于编辑网格体UV的操作。

### 平面投影

**平面投影** 操作将在选定面上交互式设置UV。

要设置UV，请按以下步骤操作：

1.  点击面。
2.  将光标拖入或拖出。
3.  点击设置UV。

绘制的线条可以对齐到顶点，帮助控制方向。如需详细了解如何创建和编辑UV，请参阅[UV编辑器](/documentation/zh-cn/unreal-engine/uv-editor-in-unreal-engine)。点击平面投影操作时，工具属性面板会显示操作的属性。

**当前操作**

**说明**

**完成（Done）**

如果你决定不需要更改，点击即可退出操作。你还可以使用 **Ctrl** + **Z** 取消操作。

**平面投影UV（Planar Project UV）**

**说明**

**显示材质（Show Material）**

确定要设置的材质类型，是默认还是棋盘格。为false时，棋盘格材质将变为活动状态。

[选项](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E9%A1%B9)和[小工具](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)的属性也可用。

## 选择操作

你可以使用 **选择筛选器（Selection Filter）** 手动选择网格体的元素（多边形组顶点、边缘和面），或使用 **选择操作（Selection Actions）** 执行快速选择。

**选择操作**

**说明**

**反转选择（Invert Selection）**

选择你之前未选择的所有指定元素，并取消选择之前选择的所有元素。选定的元素类型取决于选择筛选器。如果选择了多个元素图标，将选中选择筛选器中的第一个活动元素（最左侧）。

**全选（Select All）**

选择所有指定元素。选定的元素类型取决于选择筛选器。如果选择了多个元素图标，将选中选择筛选器中的第一个活动元素（最左侧）。

## 选择筛选器

**选择筛选器** 将控制网格体中的哪种元素可以被选中（多边形组顶点、边缘和面）。所有元素都可以被同时设置为true。点击图标可启用和禁用对元素的选择。

![选择筛选器图标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4bd9d24-f9a7-48a0-879a-9f3f0f959d93/selection-filter.png)

对于选取框选择，在视口中点击并拖动，同时选择一个元素的多个组件。使用 **更多选择选项（Additional Selection Options）** 中的属性进一步控制。如果在进行选取框选择时启用了多个元素，则选择第一个活动元素（最左侧）。

**元素图标**

**说明**

![选择多边形组顶点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75766528-c97b-4993-9de6-ae9cfcea61b0/select-vertices.png)

选择多边形组的顶点。

![选择多边形组边缘](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db064047-cfc1-4abe-a889-77dfa445c2ad/select-edges.png)

选择多边形组的边缘。

![选择多边形组面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30a1325e-4b06-4e63-a394-920809ac3cc0/select-faces.png)

选择多边形组的面

!\[选择多边形组边缘循环(working-with-content/modeling-and-geometry-scripting/modeling-tools/polygroup-edit/select-edge-loops.png){:width="50"}

选择多边形组边缘循环。边缘循环是穿过连接了四个边缘的顶点的路径。

![选择多边形组圆环E](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/963033c0-4bd0-4bd6-a23a-0e6ce5dbf496/select-ring-edges.png)(w:50)

选择多边形组边缘的圆环。圆环是在有四个多边形组边缘的面上位于彼此相对的边缘序列。

如果你无法选择想要的元素，请确认你正确设置了多边形组。

## 额外选择选项

**额外选择选项**

**说明**

**选取框忽略遮挡（Marquee Ignore Occlusion）**

为true时，选取框选择包括所有有效的几何组件。为false时，选取框选择仅包括当前摄像机内可见的元素。

**正交视口行为（Ortho Viewport Behavior）**

**说明**

**偏好投影元素（Prefer Projected Element）**

选择投影到某个点的边缘而不是选择该点处的顶点，或选择投影到某个边缘的面而不是选择该边缘。

**选择向下光线（Select Down Ray）**

如果最近的元素有效，请选择它后面与之对齐的其他元素。

**忽略遮挡（Ignore Occlusion）**

不检查最近的元素在场景带光照版本中是否在当前视角中被遮挡。

**击中背面（Hit Back Faces）**

选择一个面的背面。在使用"里朝外"的网格体（例如各个面都朝里的、表示房间内部的立方体）时最好将此项关闭，避免选中更近的背面。

**启用选取框（Enable Marquee）**

激活选取框选择。

## 选项

可视化的额外选项。

**可视化选项**

说明

**显示线框（Show Wireframe）**

以三角形级别创建网格体的拓扑的轮廓。

**显示可选择的内角（Show Selectable Corners）**

切换生成的内角的可视性。如需更多信息，请参阅下面的 **[拓扑选项](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%8B%93%E6%89%91%E9%80%89%E9%A1%B9)** 小节。

**小工具可见（Gizmo Visible）**

切换变换小工具的可视性。

## 小工具

当你将小工具的坐标系设置为本地空间时，额外小工具控制将处于活动状态。当你启用世界变换时，这些设置会被停用。

**小工具选项**

**说明**

**本地帧模式（Local Frame Mode）**

确定小工具的旋转是取自所选元素（ **从几何体（From Geometry）** ）还是取自网格体整体的变换（ **从对象（From Object）** ）。

**锁定旋转（Lock Rotation）**

为true时，保留上次选择的小工具方向。使用 **Q0** 热键开启/关闭。

## 拓扑选项

对三角形分组以创建多边形组时，会形成一个边界边缘来包围三角形。根据你的网格体和生成的多边形组的拓扑，相较于其他建模数字内容创建（DCC）软件，编辑网格体的边缘可能无法达到你预期的效果。

在下图中，网格体包括两个多边形组，由高亮显示的边界边缘表示。虽然多边形组的边界由于形状弯曲看起来有多个边缘，但它并不是由多边形组顶点构成，也就是说这里只有一条多边形组边缘。

![多边形组边界边缘](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e6f0828-b52e-4e73-934d-a68c521f6d3f/polygroup-boundary-edge.png)

多边形组边缘和顶点在以下条件下生成：

-   两个或更多相连的多边形组面（或一个网格体边界）创建一个多边形组边缘。
-   三个或更多相连的多边形组边缘创建一个多边形组顶点。

为了帮助在没有或只有一个相邻面的多多边形组边界上生成额外的边缘和顶点，可以使用以下拓扑选项。

**拓扑选项**

**说明**

**添加额外内角（Add Extra Corners）**

在锐利的组边缘弯曲处添加内角，以生成多边形组顶点。此生成是对放置在三个或更多多边形组边缘的连接点处的法线内角的补充。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0e720c4-79d8-4c56-95ce-9cfc9a3011a6/extra-corners.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0e720c4-79d8-4c56-95ce-9cfc9a3011a6/extra-corners.png)

**额外内角角度阈值度数（Extra Corner Angle Threshold Degrees）**

确定角度必须达到何种锐利程度才有资格成为额外内角。更低的值需要更锐利的内角，使其对弯曲的组边缘更宽容。该设置将在点击"重新生成额外内角"或修改拓扑的操作完成之后应用。

如果出现不需要的内角（额外顶点和边缘），请调整角度阈值或禁用"添加额外内角"，然后点击"重新生成额外内角"。

**重新生成额外内角（Regenerate Extra Corners）**

重新生成额外内角。必须在开启"添加额外内角"或调整角度阈值之后点击。

## 热键

**热键**

**说明**

**F**

放大选择的位置。

**Shift + 点击/拖动**

将元素添加到当前所选项。

**Ctrl + 点击/拖动**

从当前所选项删除元素。

**Ctrl + Shift + 点击/拖动**

切换所选项中的元素。

**Enter**

接受工具更改。

**ESC**

取消更改并退出工具。

**中间拖动小工具（Middle-Drag Gizmo）**

变换网格体枢轴点。按住Ctrl键启用对齐。

**Ctrl + 拖动小工具**

对齐选定元素的变换。

**Q**

锁定小工具旋转。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [modeling mode](https://dev.epicgames.com/community/search?query=modeling%20mode)
-   [modeling tools](https://dev.epicgames.com/community/search?query=modeling%20tools)
-   [polygon modeling](https://dev.epicgames.com/community/search?query=polygon%20modeling)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [面编辑](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%9D%A2%E7%BC%96%E8%BE%91)
-   [挤压](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%8C%A4%E5%8E%8B)
-   [挤压方向模式示例](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%8C%A4%E5%8E%8B%E6%96%B9%E5%90%91%E6%A8%A1%E5%BC%8F%E7%A4%BA%E4%BE%8B)
-   [偏移](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%81%8F%E7%A7%BB)
-   [偏移方向模式示例](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%81%8F%E7%A7%BB%E6%96%B9%E5%90%91%E6%A8%A1%E5%BC%8F%E7%A4%BA%E4%BE%8B)
-   [推拉](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%8E%A8%E6%8B%89)
-   [推拉方向模式示例](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%8E%A8%E6%8B%89%E6%96%B9%E5%90%91%E6%A8%A1%E5%BC%8F%E7%A4%BA%E4%BE%8B)
-   [内嵌](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%86%85%E5%B5%8C)
-   [外嵌](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%A4%96%E5%B5%8C)
-   [斜边](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%96%9C%E8%BE%B9)
-   [删除](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%88%A0%E9%99%A4)
-   [合并](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%90%88%E5%B9%B6)
-   [切割面](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%88%87%E5%89%B2%E9%9D%A2)
-   [重新计算法线](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%87%8D%E6%96%B0%E8%AE%A1%E7%AE%97%E6%B3%95%E7%BA%BF)
-   [翻转](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E7%BF%BB%E8%BD%AC)
-   [重新三角剖分](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%87%8D%E6%96%B0%E4%B8%89%E8%A7%92%E5%89%96%E5%88%86)
-   [分解](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%88%86%E8%A7%A3)
-   [断开连接](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%96%AD%E5%BC%80%E8%BF%9E%E6%8E%A5)
-   [复制](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%A4%8D%E5%88%B6)
-   [形状编辑](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%BD%A2%E7%8A%B6%E7%BC%96%E8%BE%91)
-   [插入边缘循环](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%8F%92%E5%85%A5%E8%BE%B9%E7%BC%98%E5%BE%AA%E7%8E%AF)
-   [插入边缘](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%8F%92%E5%85%A5%E8%BE%B9%E7%BC%98)
-   [按组简化](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%8C%89%E7%BB%84%E7%AE%80%E5%8C%96)
-   [边缘编辑](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E8%BE%B9%E7%BC%98%E7%BC%96%E8%BE%91)
-   [结合](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E7%BB%93%E5%90%88)
-   [拉直](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%8B%89%E7%9B%B4)
-   [填补空隙](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%A1%AB%E8%A1%A5%E7%A9%BA%E9%9A%99)
-   [斜边](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%96%9C%E8%BE%B9-2)
-   [桥接](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%A1%A5%E6%8E%A5)
-   [简化](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E7%AE%80%E5%8C%96)
-   [UV](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#uv)
-   [平面投影](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%B9%B3%E9%9D%A2%E6%8A%95%E5%BD%B1)
-   [选择操作](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E6%8B%A9%E6%93%8D%E4%BD%9C)
-   [选择筛选器](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E6%8B%A9%E7%AD%9B%E9%80%89%E5%99%A8)
-   [额外选择选项](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%A2%9D%E5%A4%96%E9%80%89%E6%8B%A9%E9%80%89%E9%A1%B9)
-   [选项](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E9%80%89%E9%A1%B9)
-   [小工具](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)
-   [拓扑选项](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E6%8B%93%E6%89%91%E9%80%89%E9%A1%B9)
-   [热键](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-reference-in-unreal-engine#%E7%83%AD%E9%94%AE)

相关文档

[

多边形组编辑

![多边形组编辑](https://dev.epicgames.com/community/api/documentation/image/69b88c4e-3c78-496c-9d1a-cd796d865366?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-in-unreal-engine)

[

建模工具

![建模工具](https://dev.epicgames.com/community/api/documentation/image/152a0302-28b3-46e6-91d6-98c2ff1dde1b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/modeling-tools-in-unreal-engine)

[

建模模式概述

![建模模式概述](https://dev.epicgames.com/community/api/documentation/image/5f9ab70c-68fd-4dd1-9e68-9294f46ed6e0?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)

[

建模模式 - 处理资产

![建模模式 - 处理资产](https://dev.epicgames.com/community/api/documentation/image/a47163cd-8973-4f6f-b9d8-6f3f03f03df0?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/working-with-meshes-in-unreal-engine)