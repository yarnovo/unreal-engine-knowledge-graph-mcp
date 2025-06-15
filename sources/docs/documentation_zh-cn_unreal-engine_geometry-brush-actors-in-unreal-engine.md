# 虚幻引擎中的几何体笔刷Actor | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:58:49.066Z

---

目录

![几何体笔刷Actor](https://dev.epicgames.com/community/api/documentation/image/1e003ee4-ac95-4cde-b48e-7b46fdd8228d?resizing_type=fill&width=1920&height=335)

几何体笔刷，又称二进制空间划分（BSP）笔刷，是虚幻引擎的关卡构建工具。理论上说，建议将几何体笔刷用于在关卡中填充、雕刻空间体积。在关卡设计过程中，你可以使用笔刷为关卡创建基础形状。在美术师创建最终网格体时，它可以作为始终存在的用具，也可作为测试用的临时工具。

之前，几何体笔刷一直作为关卡设计的主要模块。现在，这个任务已交给[静态网格体](/documentation/zh-cn/unreal-engine/static-meshes)和引擎内[建模工具](/documentation/zh-cn/unreal-engine/getting-started-with-modeling-mode)，后两者效率远高于几何体笔刷。但在产品的早期阶段，几何体笔刷依旧有用——它可以快速设置关卡和对象的原型，也可用于无法使用3D建模工具的关卡构建。本文将介绍几何体笔刷的用途及用法。

不建议将几何体笔刷用作关卡设计的单一方法。它应视情况使用，在关卡早期搭建阶段较为有用。

## 几何体笔刷的用途

尽管现在主要使用静态网格体来填充关卡，但几何体笔刷仍有用武之地，比如规划关卡或创建填充用几何体。

### 规划关卡

创建关卡的标准工作流程大致为：

-   规划关卡和设计关卡路径
-   游戏玩法测试流程
-   修改布局并重复测试
-   初始建模阶段
-   初始光照阶段
-   碰撞和性能问题的测试
-   完善阶段

 

 

![UE中的关卡规划](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de8d35be-cc45-4f54-ba66-b1b9a9a8d2ea/elementalbsp.png)

![Final level design in UE](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23233741-cc21-42ee-a50c-9aa3e04e1c34/elementalcomplete.png)

笔刷规划/草拟

最终关卡

第一步是在使用静态网格体和其他成品美术资源填充关卡前，先规划关卡以确定布局和流程。通常使用几何体笔刷创建关卡的轮廓，然后通过测试和迭代，由团队确定最终布局。由于无需美术团队，因此在关卡设计的这方面最适用几何体笔刷。关卡设计师可使用虚幻编辑器中的内置工具创建和修改几何体笔刷，以达到满意的关卡布局和效果。

测试结束后便开始建模，关卡设计师会逐渐用静态网格体取代几何体笔刷将。这一替换过程可实现更快的初始迭代，同时也为美术团队的建模工作提供了极好的参考。

### 简单填充几何体

关卡设计师创建关卡时，时常需要使用较为简单的几何体填充间隙或空间。若无用于填充区域的现成静态网格体，设计师可直接使用几何体笔刷进行填充，无需美术团队创建自定义网格体。尽管静态网格体性能更好，但对于简单几何体而言，偶尔使用几何体笔刷也不会造成严重影响。

## 创建笔刷

使用 **放置Actor（Place Actors）** 面板中的 **几何体（Geometry）** 选项卡创建笔刷：

1.  在添加下拉菜单中选择 **放置Actor（Place Actors）** 面板。
    
    ![Geometry brush via Place Actors Panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2dad3853-9ab5-481a-8636-3af38b84773d/add-dropdown-ue-5-1.png)
2.  选择几何体图标。
    
    ![Place Actors Panel in UE](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3232943e-8d46-4ce5-be75-2c66e76222de/place-actors-panel-ue-5-1.png)
3.  将列表中的某一个图元类型拖入 **视口**。
    
    ![Placing geometry brush in Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0ece95b-fa25-40a9-9be2-b50defb2ef93/place-geometry-in-level-ue-5-1.png)
4.  在 **细节** 面板中选择[笔刷类型](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E7%AC%94%E5%88%B7%E7%B1%BB%E5%9E%8B)（叠加或删减）。
    
5.  使用细节面板中的 **笔刷设置（Brush Settings）** 、变换控件或激活 **笔刷编辑模式（Brush Editing Mode）** 修改笔刷。详见[修改笔刷](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E4%BF%AE%E6%94%B9%E7%AC%94%E5%88%B7)。
    

## 笔刷图元

图元

说明

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3ae1611-79a0-4c47-9bd7-4314f2cb98d9/bsp_box.png)

创建盒体形状的几何体笔刷Actor，之后可在 **细节（Details）** 面板中自定义。选项包括：

-   **X**：设置X轴上的大小。
-   **Y**：设置Y轴上的大小。
-   **Z**：设置Z轴上的大小。
-   **墙壁厚度（Wall Thickness）**：若勾选 **中空（Hollow）**，则设置笔刷内壁厚度。
-   **中空（Hollow）**：勾选此框，笔刷内部将出现中空（用于快速创建房间），而非实心。若勾选，则启用 **墙壁厚度（Wall Thickness）** 设置。
-   **曲面细分（Tessellated）**：勾选此框会将盒体面曲面细分为三角形，而非保持四边形。

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db79d3b5-f657-4958-9e84-48825a803b3a/bsp_cone.png)

创建椎体形状的几何体笔刷Actor，之后可在 **细节（Details）** 面板中自定义。选项包括：

-   **Z**：在Z轴上设置高度。
-   **Z上限（Cap Z）**：若勾选 **中空（Hollow）** ，则设置在Z轴上设置高度的内部上限。
-   **外部半径（Outer Radius）**：设置椎体基座半径。
-   **内部半径（Inner Radius）**：若勾选 **中空（Hollow）**，则设置椎体内壁半径。
-   **面数（Sides）**：设置椎体形状周围的面数。
-   **面对齐（Align to Side）**：勾选此框，将沿X轴与面的旋转对齐。禁用会将其中一角指向轴下方。
-   **中空（Hollow）**：勾选此框，笔刷内部将出现中空（用于快速创建房间），而非实心。若勾选，则启用 **内部半径（Inner Radius）** 设置。

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc44f3ad-34ac-480d-bff8-99b062fe7ac6/bsp_cylinder.png)

创建圆柱体形状的几何体笔刷Actor，之后可在 **细节（Details）** 面板中自定义。选项包括：

-   **Z**：在Z轴上设置高度。
-   **外部半径（Outer Radius）**：设置圆柱体的半径。
-   **内部半径（Inner Radius）**：若勾选 **中空（Hollow）**，则设置圆柱体内的中空空间半径。
-   **面数（Sides）**：设置圆柱体形状周围的面数。
-   **面对齐（Align to Side）**：勾选此框，将沿X轴与面的旋转对齐。禁用会将其中一角指向轴下方。
-   **中空（Hollow）**：勾选此框，笔刷内部将出现中空（用于快速创建房间），而非实心。若勾选，则启用 **内部半径（Inner Radius）** 设置。

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41784332-0837-42c2-99ae-480d019a51ec/bsp_curvedstair.png)

创建曲线楼梯形状的几何体笔刷Actor，即楼梯可弯曲，但无法自我环绕 - 因此需要螺旋式楼梯。曲线楼梯将一直延伸到地面。可在 **细节（Details）** 面板中自定义形状。选项包括：

-   **内部半径（Inner Radius）**：设置阶梯环绕的内柱半径。
-   **阶梯高度（Step Height）**：设置每级阶梯的高度。
-   **阶梯宽度（Step Width）**：设置每级阶梯的宽度。
-   **曲线角度（Angle of Curve）**：设置每级楼梯的旋转角度。
-   **阶梯数（Num Steps）**：设置楼梯中阶梯的数量。
-   **添加到第一级阶梯（Add to First Step）**：向第一级阶梯添加额外高度，可有效更改楼梯的整体高度。（输入负值则降低第一级阶梯高度）。
-   **逆时针方向（Counter Clockwise）**：勾选此框使楼梯逆时针弯曲，而非顺时针。

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5457d975-a97e-420d-aad0-cb249b08868f/bsp_linstair.png)

创建线性楼梯形状的几何体笔刷Actor，即无弯曲的直线楼梯。楼梯将一直延伸到地面。之后可在 **细节（Details）** 面板中自定义形状。选项包括：

-   **阶梯长度（Step Length）**：设置每级阶梯的长度。
-   **阶梯高度（Step Height）**：设置每级阶梯的高度。
-   **阶梯宽度（Step Width）**：设置每级阶梯的宽度。
-   **阶梯数（Num Steps）**：设置楼梯的阶梯数。
-   **添加到第一级阶梯（Add to First Step）**:向第一级阶梯添加额外高度，可有效更改楼梯的整体高度。（输入负值则降低第一级阶梯高度）。

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15ab13f7-003a-4cac-946e-26c542109bdc/bsp_spiralstair.png)

创建螺旋楼梯形状的几何体笔刷Actor，即楼梯可重复自我环绕。此类楼梯不会一直延伸到地面。可在 **细节（Details）** 面板中自定义形状。选项包括：

-   **内部半径（Inner Radius）**：设置阶梯环绕的内柱半径。
-   **阶梯宽度（Step Width）**：设置每级阶梯的宽度。
-   **阶梯高度（Step Height）**：相对下一级阶梯，设置各级阶梯的高度差。
-   **阶梯厚度（Step Thickness）**：设置阶梯的厚度。
-   **360度阶梯数（Num Steps Per 360）**：设置一次完整旋转所需的阶梯数。
-   **阶梯数（Num Steps）**：设置楼梯中阶梯的数量。
-   **添加到第一级阶梯（Add to First Step）**：向第一级阶梯添加额外高度，可有效更改楼梯的整体高度。（输入负值会降低第一级阶梯的高度）。
-   **倾斜天花板（Sloped Ceiling）**：勾选此框将创建楼梯的倾斜底面，而非分层底面。
-   **倾斜地板（Sloped Floor）**：勾选此框将创建倾斜地板，可快速将其转换为斜坡，而非传统楼梯。
-   **逆时针方向（Counter Clockwise）**：若要让楼梯逆时针而非顺时针弯曲，选中此框。

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a9fdef4-bf23-4eb8-a1be-dd76d2c0ab7b/bsp_sphere.png)

创建球体形状的几何体笔刷Actor，之后可在 **细节（Details）** 面板中自定义。选项包括：

-   **半径（Radius）**：设置球体半径。
-   **曲面细分（Tessellation）**：设置用于构成球体的面数。受曲面细分法的限制，此值上限为5。

 

## 修改笔刷

可使用数种方法修改笔刷，每项方法均适用于特定情况，也可按需编辑笔刷。

### 笔刷编辑模式

建议使用 **笔刷编辑模式（Brush Editing Mode）** 修改笔刷的实际形状。利用此编辑器模式可直接操作笔刷的顶点、边和面。其与极简3D建模应用程序的工作方式极其类似。

![BSP Brush Editing Mode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be673c0a-0800-4c16-9fc0-b4387515a3e3/brush-editing-mode-ue-5-1.png)

你可以同时打开笔刷编辑（Brush Editing）和放置Actor（Place Actors）面板，使工作流程效率更高。

![BSP Panels](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8de25672-c0c0-404a-af1f-35dc20c5cdc5/brush-panels-side-by-side-ue-5-1.png)

欲了解 **笔刷编辑模式（Brush Editing Mode）** 以及如何利用其修改笔刷的更多相关信息，参阅[关卡编辑器模式](/documentation/zh-cn/unreal-engine/level-editor-modes-in-unreal-engine)页面。

### 变换控件

你可使用不同编辑器变换控件修改笔刷。此类变换控件支持交互式平移、旋转和缩放，并可通过视口工具栏中的控件按钮进行访问。

![Adjust BSP Brushes with transform widgets](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb3c6ca2-b90c-481b-a419-4a35ab6acc4c/transform-widgets-ue-5-1.png)

欲了解变换控件及其用法的更多信息，参阅[变换Actor](/documentation/zh-cn/unreal-engine/transforming-actors-in-unreal-engine)。

## 笔刷属性

你可以选择笔刷，然后使用 **细节（Details）** 面板编辑现有笔刷。若选择整个笔刷，可看到 **笔刷设置（Brush Settings）** 类别：

![Geometry Brush Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99b3ab0a-a40b-4991-bdf4-e7ee1913c7ea/brush-settings-ue-5-1.png)

### 笔刷类型

**笔刷类型（Brush Type）** 下拉列表包括以下选项：

笔刷类型下拉列表

 

**叠加（Additive）**

将笔刷（Brush）设置为叠加（Additive）。

**删减（Subtractive）**

将笔刷（Brush）设置为删减（Subtractive）。

每种笔刷类型都适用于特定情况。

#### 叠加

**叠加（Additive）** 笔刷是实体的填充空间。你可以使用叠加笔刷添加到关卡中的笔刷几何体。想象一下房间的四面墙、地板和天花板，就可以直观地理解什么事叠加笔刷。在地图中，它们均为单独的盒状叠加笔刷，并匹配各角形成封闭空间。

#### 删减

**删减（Subtractive）** 笔刷为中空的镂空空间。使用该笔刷可在之前创建的叠加笔刷中删除实心控件，以创建门窗等项目。删减空间是玩家可自由移动的唯一区域。

### 高级属性

点击 **笔刷设置（Brush Settings）** 底部的![高级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65aadf57-53de-4ef1-a61a-1a10b2ff6e7b/button_advanced.png)按钮将公开高级笔刷属性：

![BSP Brush Advance Properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c45b4d6-0315-49f1-9799-26e3db087b35/advance-properties-ue-5-1.png)

#### 多边形

**多边形（Polygons）** 下拉列表提供以下选项：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/888489a2-25d9-426a-b090-1d25ea5a4050/polygonsdropdown.png)

多边形下拉列表

 

**合并（Merge）**

合并笔刷上的平面。

**分割（Separate）**

反转合并效果。

#### 实心度

**实心度（Solidity）** 下拉列表包括以下选项：

务必阅读[笔刷实心度部分](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#brushsolidity)了解更多详情。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee614da3-7d93-4da3-9a1c-6320eae69cda/soliditydropdown.png)

实心度下拉列表

 

**实心（Solid）**

将笔刷实心度设为实心。

**半实心（Semi Solid）**

将笔刷实心度设为半实心。

**非实心（Non Solid）**

将笔刷实心度设为非实心。

#### 顺序

**顺序（Order）** 下拉列表包括以下选项：

务必阅读[笔刷顺序](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#brushorder)了解更多详情：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c843c3c-3f85-43e6-872d-0948a0bcf1e2/oderdropdown.png)

顺序下拉列表

 

**首先（To First）**

首先计算选定笔刷。

**最后（To Last）**

最后计算选定笔刷。

### 对齐和静态网格体按钮

展开 **笔刷设置（Brush Settings）** 类别下的属性，将显示以下按钮：

笔刷类型下拉列表

 

**笔刷顶点对齐（Align Brush Vertices）**

将笔刷顶点对齐到网格。

**创建静态网格体（Create Static Mesh）**

将当前笔刷转换为保存在指定位置的静态网格体Actor。

## 拖动网格

使用笔刷时，用于在场景中对齐对象的拖动网格是十分重要的项目。如果不将笔刷的边或角设在网格上，可能会发生错误，从而导致渲染瑕疵或其他问题。使用笔刷时，应务必确保启用拖动网格，并将笔刷顶点始终保持在该网格上。

## 笔刷顺序

叠加或删减运算均按照笔刷的放置顺序进行，因此该顺序极为重要。即使是在放置删减笔刷的位置放置叠加笔刷，其效果也不同于放置叠加笔刷后放置删减笔刷的效果。

由于无法删减空白，因此空白空间中的删减处进行叠加，将忽略删减笔刷的效果。若以相反顺序放置以上笔刷，将会在空白空间中叠加，并在该该空间中的叠加处删减出镂空。

有时需打乱笔刷顺序，或添加需在现有笔刷前计算的新笔刷。正如在[笔刷属性](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#brushproperties)一节所述，笔刷顺序可以进行修改。

## 笔刷表面

若选择笔刷表面（使用 **Ctrl + Shift +点击左键** 选择表面而非笔刷），**细节（Details）** 面板中将显示以下类别：

![Geometry Brush surface](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfbf4fe1-a393-42a9-a597-6ccfef7418e5/brush-surfaces-ue-5-1.png)

### 几何体类别

**几何体（Geometry）** 类别包含部分工具，可协助管理笔刷表面的材质应用。

几何体类别按钮

 

**选择（Select）**

基于不同情况，协助选择笔刷表面。

**对齐（Alignment）**

根据所需设置，重新对齐表面的纹理坐标。在需要沿地板复杂排列的笔刷来对齐以显示为类似单个表面的情况下，该设置十分有用。

**清理几何体材质（Clean Geometry Materials）**

若在操作时丢失笔刷表面的其材质，利用此按钮可进行修复。

### 表面属性

**表面属性（Surface Properties）** 区域包含多种工具，可协助控制表面上纹理的放置方式和光照贴图分辨率。

表面属性类别

 

**平移（Pan）**

此部分中的按钮可用于按给定单元数，水平或垂直平移材质的纹理。

**旋转（Rotate）**

按给定角度旋转笔刷表面材质上的纹理。

**翻转（Flip）**

可水平或垂直翻转笔刷表面的纹理。

**缩放（Scale）**

按给定数量调整笔刷表面的纹理大小。

#### 光照

利用 **光照（Lighting）** 部分可修改笔刷表面各类以光源为中心的重要属性。

光照属性

 

**光照贴图分辨率（Lightmap Resolution）**

可本质上调整该表面的阴影。数字越小，阴影越紧密。

Lightmass设置

 

**使用双面光照（Use Two Sided Lighting）**

若勾选，此表面将在各多边形的正反面接收光线。

**仅间接阴影（Shadow Indirect Only）**

勾选此框，此表面可利用间接光照产生阴影。

**使用静态光照的自发光（Use Emissive for Static Lighting）**

勾选此框，表面的自发光颜色将影响静态对象的光照。

**使用半球体收集的顶点法线（Use Vertex Normal for Hemisphere Gather）**

勾选此框，将使用顶点法线，而非阻止自投影的默认三角形法线。

**自发光增强（Emissive Boost）**

调整自发光颜色对间接光照的影响程度。

**漫反射增强（Diffuse Boost）**

衡量漫反射颜色对间接光照产生的影响程度。

**完全遮蔽样本部分（Fully Occluded Samples Fraction）**

在间接光照计算中遮蔽前，必须遮蔽该表面上的样本部分。

## 笔刷实心度

笔刷可为 **实心（Solid）**、**半实心（Semi-solid）** 或 **非实心（Non-solid）**。笔刷的实心度指的其是否与场景中的对象发生碰撞，以及在构建几何体时，其是否会在周围笔刷中创建BSP剪切。

创建笔刷后可在 **细节（Details）** 面板中更改笔刷的实心度：

![Geometry Brush Solidity](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2802109d-094a-4e4f-a55d-9c52e526e687/brush-solidity-ue-5-1.png)

下面为三种实心度类型。

### 实心

**实心（Solid）** 笔刷为默认笔刷类型。新建叠加或删减笔刷时将使用该类型。其具有以下属性：

-   在游戏中阻挡玩家和发射物。
-   可为叠加或删减。
-   在周围笔刷上创建剪切。

### 半实心

**半实心** 笔刷为碰撞笔刷，可放置在关卡中而不会剪切场景周围的几何体。该类型可用于创建如柱子和支撑梁等物体，但通常会使用静态网格体创建此类物体。其具有以下属性：

-   与实心笔刷类似，会阻挡玩家和发射物。
-   仅可为叠加，不可为删减。
-   不会在周围笔刷中创建剪切。

### 非实心

**非实心** 笔刷为非碰撞笔刷，不会在场景周围中创建剪切。其效果可见，但无法与之交互。其具有以下属性：

-   不会阻挡玩家或发射物。
-   仅可为叠加，不可为删减。
-   不会在周围笔刷中创建剪切。

## 下一步

在了解了几何体笔刷的基本知识后，你可以再熟悉一下[建模模式](/documentation/zh-cn/unreal-engine/getting-started-with-modeling-mode)中的几何体工具，以便进一步开发你的关卡。要在当前几何体笔刷上使用建模模式工具，必须使用 **高级（Advanced）** 选项卡中的 **创建静态网格体（Create Static Mesh）** 转换它们。

-   [level design](https://dev.epicgames.com/community/search?query=level%20design)
-   [geometry brush](https://dev.epicgames.com/community/search?query=geometry%20brush)
-   [bsp brush](https://dev.epicgames.com/community/search?query=bsp%20brush)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [几何体笔刷的用途](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E5%87%A0%E4%BD%95%E4%BD%93%E7%AC%94%E5%88%B7%E7%9A%84%E7%94%A8%E9%80%94)
-   [规划关卡](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E8%A7%84%E5%88%92%E5%85%B3%E5%8D%A1)
-   [简单填充几何体](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E7%AE%80%E5%8D%95%E5%A1%AB%E5%85%85%E5%87%A0%E4%BD%95%E4%BD%93)
-   [创建笔刷](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%AC%94%E5%88%B7)
-   [笔刷图元](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E7%AC%94%E5%88%B7%E5%9B%BE%E5%85%83)
-   [修改笔刷](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E4%BF%AE%E6%94%B9%E7%AC%94%E5%88%B7)
-   [笔刷编辑模式](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E7%AC%94%E5%88%B7%E7%BC%96%E8%BE%91%E6%A8%A1%E5%BC%8F)
-   [变换控件](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E5%8F%98%E6%8D%A2%E6%8E%A7%E4%BB%B6)
-   [笔刷属性](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E7%AC%94%E5%88%B7%E5%B1%9E%E6%80%A7)
-   [笔刷类型](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E7%AC%94%E5%88%B7%E7%B1%BB%E5%9E%8B)
-   [叠加](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E5%8F%A0%E5%8A%A0)
-   [删减](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E5%88%A0%E5%87%8F)
-   [高级属性](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E9%AB%98%E7%BA%A7%E5%B1%9E%E6%80%A7)
-   [多边形](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E5%A4%9A%E8%BE%B9%E5%BD%A2)
-   [实心度](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E5%AE%9E%E5%BF%83%E5%BA%A6)
-   [顺序](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E9%A1%BA%E5%BA%8F)
-   [对齐和静态网格体按钮](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E5%AF%B9%E9%BD%90%E5%92%8C%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E6%8C%89%E9%92%AE)
-   [拖动网格](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E6%8B%96%E5%8A%A8%E7%BD%91%E6%A0%BC)
-   [笔刷顺序](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E7%AC%94%E5%88%B7%E9%A1%BA%E5%BA%8F)
-   [笔刷表面](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E7%AC%94%E5%88%B7%E8%A1%A8%E9%9D%A2)
-   [几何体类别](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E5%87%A0%E4%BD%95%E4%BD%93%E7%B1%BB%E5%88%AB)
-   [表面属性](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E8%A1%A8%E9%9D%A2%E5%B1%9E%E6%80%A7)
-   [光照](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E5%85%89%E7%85%A7)
-   [笔刷实心度](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E7%AC%94%E5%88%B7%E5%AE%9E%E5%BF%83%E5%BA%A6)
-   [实心](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E5%AE%9E%E5%BF%83)
-   [半实心](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E5%8D%8A%E5%AE%9E%E5%BF%83)
-   [非实心](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E9%9D%9E%E5%AE%9E%E5%BF%83)
-   [下一步](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine#%E4%B8%8B%E4%B8%80%E6%AD%A5)

相关文档

[

建模模式概述

![建模模式概述](https://dev.epicgames.com/community/api/documentation/image/5f9ab70c-68fd-4dd1-9e68-9294f46ed6e0?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)

[

CubeGrid

![CubeGrid](https://dev.epicgames.com/community/api/documentation/image/572eef60-7345-41fb-bbad-f3e666efce9d?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/cubegrid-tool-in-unreal-engine)

[

关卡编辑器

![关卡编辑器](https://dev.epicgames.com/community/api/documentation/image/c89e0205-1fca-4667-b907-e793bd53d2b7?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/level-editor-in-unreal-engine)