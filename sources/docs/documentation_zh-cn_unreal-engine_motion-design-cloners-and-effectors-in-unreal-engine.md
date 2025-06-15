# 虚幻引擎的动态设计克隆器和效果器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:17:10.167Z

---

目录

![克隆器和效果器](https://dev.epicgames.com/community/api/documentation/image/5c5e24e5-158d-4607-a207-85ac338034ea?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

## 简介

动态设计对既定Niagara粒子系统有其独属的集成方式。你可以使用动态设计，通过创建克隆体或现有几何体的多个实例的方式，帮你快速创建生动的动态图形。你可以以群组为单位或精细地调整各种相关Actor属性。

Niagara提供了核心功能，但是使用克隆器和效果器时，你可以通过精简化的工具应用显著简化流程。你可以用克隆器和效果器进行缩放、旋转、定位和程序化噪点，能对Actor进行随机化和着色，从而生成独特的视觉效果。

本文假定读者已熟悉[动态设计快速入门](/documentation/zh-cn/unreal-engine/motion-design-quickstart-guide-in-unreal-engine)的内容。

## 工具所在的位置

首先启用 **ClonerEffector** 插件，或者启用动态设计模式（详见快速入门指南）。

进入动态设计模式后，点击调色板中的 **Actors** 即可看到两个主要工具：

-   **克隆器Actor（Cloner Actor）**
-   **效果器Actor（Effector Actor）**

也可以点击 **放置Actor（Place Actors）** 选项卡，然后搜索"Motion Design Cloner and Effector"。

![放置克隆器或效果器Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a7cd5f0-5ac5-4f8b-9598-99b87c940b27/image_0.png)

克隆器和效果器Actor在 **放置Actors** 面板中的位置如下图所示：

![动态设计Actor在放置Actor面板中的位置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6004d8b-219f-42a1-8a06-6514e8113a53/image_1.png)

## 克隆器Actor

在 **动态设计** 模式下，双击工具栏上的克隆器Actor（Cloner Actor）即可将Actor放置在关卡中央，此时将应用默认网格体。也可以点击克隆器Actor（Cloner Actor）按钮，然后在视口中点击鼠标以放置该Actor。这时它将使用DefaultCube，但你可以为其应用自己想要的其他网格体。例如，你可以从 **动态设计3D形状（Motion Design 3D Shapes）**调色板中选择其他形状（见上方截图）。

下面是一个混合与匹配形状的示例，使用球体和环体网格体而非默认的立方体网格体：

![混搭的球体和环体克隆体形状](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/050b260f-6f95-4c2a-b5ee-bd6a555a0038/image_2.png)

细节面板中的类别项如下：

-   [通用（General）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E9%80%9A%E7%94%A8)
-   [克隆器（Cloner）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%85%8B%E9%9A%86%E5%99%A8)
-   [效果器（Effector）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%95%88%E6%9E%9C%E5%99%A8)
-   [散射（Emission）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%95%A3%E5%B0%84)
-   [物理（Physics）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%89%A9%E7%90%86)
-   [渲染（Rendering）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%B8%B2%E6%9F%93)
-   [工具（Utilities）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%B7%A5%E5%85%B7)

### 通用

**通用（General）** 类别项包含用于定位克隆器Actor的各种常用变换。这些变换不会直接影响[布局](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%B8%83%E5%B1%80)。

![克隆器Actor通用类别项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4718e4f7-5acb-4095-bb3f-2c676dcd784a/image_3.png)

**通用属性**

**说明**

变换（Transform）

 

**位置（Location）**

使用XYZ坐标的标准位置变换。

**旋转（Rotation）**

使用XYZ坐标的标准旋转变换。

**缩放（Scale）**

使用XYZ坐标的标准缩放变换。

### 克隆器

**克隆器（Cloner）** 类别项负责处理系统对克隆体的大部分排序和展示工作。包括为克隆器指定 **布局** 、为克隆器染色，以及在更改设置后无法立即生效时强制更新克隆器。另外你还能使用 **启用（Enabled）** 开关完全禁用克隆器。

![克隆器Actor的克隆器类别项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5f91c38-20e6-4fee-91b1-4672ef65041f/image_4.png)

#### 强制更新克隆器

当克隆器系统无法更新时，此功能可作为应变方案，确保正常生成克隆器。

#### 种子

若搭配 **范围（Range）** 属性使用， **种子（Seed）** 属性可根据数值的更改而提供变体。

在下图示例中，我们通过修改 **最大偏移（OffsetMax）** 属性调整了形状的位置。更改 **种子** 的值可将位置随机化。

种子值为0：

![最大偏移且种子值为0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c17104d5-594d-4eed-910d-dea7987d463f/image_5.png)

种子值为1：

![最大偏移且种子值为1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7446cc2e-66f9-4512-b045-23142fbbb741/image_6.png)

#### 颜色

用RGBA值设置克隆体的颜色。可以用取色器，也可以直接输入数值。

#### 高级

在此子类别项中，你可以使用 **树木更新间隔（Tree Update Interval）** 来设置树的刷新频率。为了降低系统开销，默认值为0.2，表示不要每次tick都更新树木，而是大约每5tick更新一次。

![克隆器类别下的高级属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49a7a06c-fb49-48a5-9038-a29a57b2182d/image_7.png)

**查看器Sprite可见（Visualizer Sprite Visible）** 开关可在视口中显示或隐藏克隆器控件：

![查看器Sprite可见](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfbb9943-9ecc-4ee4-9af3-6507b87df699/image_8.png)

**克隆器属性**

**说明**

**强制更新克隆器（Force Update Cloner）**

在出现错误时手动强制更新克隆器。

**启用（Enabled）**

启用克隆器。

**种子（Seed）**

用于将克隆器的位置随机化。

**颜色（Color）**

使用取色器选择标准的RGBA颜色。

高级（Advanced）

 

**树木更新间隔（Tree Update Interval）**

决定树的刷新频率。

**查看器Sprite可见（Visualizer Sprite Visible）**

启用以使克隆器控件可见。

#### 布局

**布局（Layout）** 是克隆器类别项中最重要的选项。布局的选项和范围（Range）、步进（Step）、效果器（Effectors）、生命周期（Lifetime）、渲染（Rendering）和渐进（Progress）等子类别项类似。它们还会根据所选布局的不同而使用特定的选项。

![布局类别项下的属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3934fcd1-0282-48c7-a86e-57806b4b9764/image_9.png)

设置布局将更改克隆体的排列方式。你可以设置上图所示的其他属性，例如设置 **间距（Spacing）** 可让克隆体分散，设置 **数量（Count）** 属性可调整克隆体的数量。

布局（Layout）下拉菜单中可用于排列克隆体的选项如下：

-   [网格（Grid）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%BD%91%E6%A0%BC)
-   [线条（Line）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%BA%BF%E6%9D%A1)
-   [圆形（Circle）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%9C%86%E5%BD%A2)
-   [圆柱体（Cylinder）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%9C%86%E6%9F%B1%E4%BD%93)
-   [球体均匀（Sphere Uniform）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%90%83%E4%BD%93%E5%9D%87%E5%8C%80)
-   [蜂巢（Honeycomb）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E8%9C%82%E5%B7%A2)
-   [网格体（Mesh）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [样条线（Spline）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%A0%B7%E6%9D%A1%E7%BA%BF)
-   [球体随机（Sphere Random）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%90%83%E4%BD%93%E9%9A%8F%E6%9C%BA)

每种 **布局（Layout）** 都有不同的设置和选项。

![布局下拉菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7c3a5e0-951a-4b28-b2ae-23650ea50775/image_10.png)

##### 网格

网格（Grid）布局可将克隆体排列为三维的网格。设置相关参数即可指定各轴（X、Y、Z）上显示的克隆体数量，以及克隆体的间距。你还可以使用此布局将克隆体限制在约束中（即特定的形状轮廓），或对约束进行反转。

![约束选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1df7d69-f8f9-4cd2-9672-9c15da3e5f93/image_11.png) ![网格布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a94c3232-af73-4180-a5aa-7f19d8fa5511/image_12.png)

下方示例用 **约束（Constraint）** 将克隆体排列为球体：

![球体约束属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cd99658-1d04-4ab6-ab54-816edb7865ab/image_13.png) ![采用球体约束的网格](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9927a59c-e2b4-4514-beb2-bd3b70124239/image_14.png)

所有 **网格布局** 的选项都可以进行 **反转约束（Invert Constraint）** 。

![启用反转约束选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b40a3518-fdb7-4c91-b73c-5924a29b0834/image_15.png) ![采用反转球体约束的网格](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fdf42e92-3430-448b-94de-c83c7d348a7e/image_16.png)

你还可以用纹理来约束克隆体：

![采用纹理约束的网格](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28b2d6d5-b919-468e-a0b1-25f9e06f7af9/image_17.png)

**网格布局属性**

**说明**

**X/Y/Z轴数量（Count X / Y / Z）**

网格中克隆体在X、Y或Z轴上的数量。

**X/Y/Z轴间距（Spacing X / Y / Z）**

网格中克隆体在X、Y或Z轴上的间距。

**约束（Constraint）**

选项包括：

-   无（None）（不使用约束）
-   圆柱体（Cylinder）
-   球体（Sphere）
-   纹理（Texture）

**反转约束（Invert Constraint）**

启用后可反转所选约束的效果。当"约束（Constraint）"为"无（None）"时不可用。

##### 线条

线条（Line）布局会将克隆器Actor排列成一条直线。用 **数量（Count）** 属性可控制克隆体的数量，用 **间距（Spacing）** 属性可控制克隆体的间距。用 **轴（Axis）** 属性可控制克隆体的流动方向，用 **旋转（Rotation）** 属性可让克隆体沿X、Y和Z轴的组合方向进行卷曲。

![线条布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c352347-d97c-4eb7-ad8e-4c991ef52917/image_18.png)

**线条布局属性**

**说明**

**数量（Count）**

线条中克隆器的数量。

**间距（Spacing）**

线条中克隆器的间距。

**轴（Axis）**

线条所沿的主轴（X、Y或Z轴）。

**X/Y/Z轴旋转（Rotation X / Y / Z）**

线条朝X、Y或Z轴旋转的角度。不会直接旋转克隆器Actor。

##### 圆形

**圆形（Circle）** 布局会将克隆器Actor排列成圆形。用 **数量（Count）** 属性可控制克隆体的数量， **半径（Radius）** 属性可控制克隆体所列圆形的半径。**角度比（Angle Ratio）** 属性可决定克隆体在圆形上的分散程度。0表示克隆体之间完全没有间距，1表示克隆体沿整个形状均匀分布。用 **平面（Plane）** 下拉菜单即可定义克隆体在哪个平面（XY、YZ、XZ）上生成。**朝向网格体（Orient Mesh）** 开关选项会强制所有克隆体朝向圆心。

![圆形布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a6306ac-1e5f-40e2-bffc-160b67126488/image_19.png)

**角度起点（Angle Start）** 属性将决定圆的旋转角度。

调整 **角度比（Angle Ratio）** 可使克隆体沿着圆形分散。要让克隆体只在半个圆内分散，那么请将值设为0.5，如下图所示：

![用角度比创建半圆](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5281debf-0a58-4acc-bc9b-97ac5567ece9/image_20.png)

如果在单轴属性上缩放，而不是完全绑定在各轴上，那么将得到一个椭圆：

![在单一轴上缩放从而形成椭圆](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c33e1d17-fadf-4f1b-8097-148bbb9c8d43/image_21.png)

**圆形布局属性**

**说明**

**数量（Count）**

圆形中克隆体的数量。

**半径（Radius）**

圆的半径。

**角度起点（Angle Start）**

设置圆的旋转角度。

**角度比（Angle Ratio）**

决定克隆体在圆上的分散程度。数值限0到1，0表示无间距，1表示在整个圆上均匀分布。

**朝向网格体（Orient Mesh）**

强制克隆体朝向圆心。

**平面（Plane）**

确定坐标轴，用于定义圆形布局克隆体在哪个平面上生成。 选项包括：

-   XY
-   YZ
-   XZ

**X/Y/Z轴缩放（Scale X / Y / Z）**

圆形布局在X、Y或Z轴上的缩放。不会缩放克隆器Actor。

##### 圆柱体

圆柱体（Cylinder）布局会将克隆器Actor排列成圆柱体。其属性与圆形布局基本一致，但增加了高度和高度数量属性。

![圆柱体布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30855b79-005b-4f6b-ad8b-5b4dcc0a4305/image_22.png)

**圆柱体布局属性**

**说明**

**底部数量（Base Count）**

圆柱体底面圆圈中克隆体的数量。

**高度（Height）**

圆柱体从其底部平面算起的高度。

**高度数量（Height Count）**

从圆柱体底部到顶部的直线上克隆体的数量。每个克隆体代表一个完整的圆。

**半径（Radius）**

圆柱体的半径。

**角度起点（Angle Start）**

设定圆柱体的旋转角度。

**角度比（Angle Ratio）**

决定构成圆柱体的每一个圆圈上克隆体的分散程度。数值限0到1，0表示无间距，1表示在整个圆柱体上均匀地分布。

**朝向网格体（Orient Mesh）**

使克隆体面向圆柱体的中心。

**平面（Plane）**

确定坐标轴，用于定义圆柱体布局克隆体在哪个平面上生成。 选项包括：

-   XY
-   YZ
-   XZ

**X/Y/Z轴缩放（Scale X / Y / Z）**

圆柱体布局在X、Y或Z轴上的缩放。不会缩放克隆器Actor。

##### 球体均匀

你可以设置球体中克隆体的总 **数量（Count）** 和球体的 **半径（Radius）** ，从而让克隆体均匀分布。

![球体均匀布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9850be78-7cda-4462-8b99-d74b904374c1/image_23.png)

**旋转（Rotation）** 属性将使整个球体沿X、Y或Z轴旋转：

![让球体布局旋转](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/684f4e84-e3d3-42f3-8296-786ab48703c6/image_24.gif)

**比率（Ratio）** 属性决定克隆体能覆盖多少球体面积。0.5的值得出的效果如下图所示：

![利用比率属性覆盖半个球体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e328766a-0882-4bb9-bffb-b8ca9145ce70/image_25.png)

**朝向网格体（Orient Mesh）** 开关选项会强制所有克隆体朝向球体中心。

![利用朝向网格体属性强制调整克隆体的朝向](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a84e090-b7df-4069-bab2-488d66af6232/image_26.png)

如果为X、Y和Z轴设置不均匀的 **缩放（Scale）** 属性，就能得到椭圆形的球体，如下图所示：

![利用不均匀缩放创建椭圆形球体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10bbf1f8-8750-4cea-b251-5464bed65f3c/image_27.png)

**球体均匀布局属性**

**说明**

**数量（Count）**

球体中克隆体的数量。

**半径（Radius）**

球体的半径，可控制克隆体的分散程度。

**比率（Ratio）**

决定克隆体能覆盖多少球体面积。

**朝向网格体（Orient Mesh）**

强制克隆体面向球体的中心。

**X/Y/Z轴旋转（Rotation X / Y / Z）**

球体向X、Y或Z轴旋转的角度。不会直接旋转克隆器Actor。

**X/Y/Z轴缩放（Scale X / Y / Z）**

布局球体在X、Y或Z轴上的缩放。不会缩放克隆器Actor。

##### 蜂巢

你可以使用 **平面（Plane）** 设置项来设置元素沿着哪条轴克隆，并利用 **宽度数量（Width Count）** 和 **高度数量（Height Count）** 来控制克隆体的数量。**宽度偏移（Width Offset）** 和 **高度偏移（Height Offset）** 属性将决定克隆体的位置偏移。使用 **宽度间距（Width Spacing）** 和 **高度间距（Height Spacing）** 属性可控制克隆体的间距。

![蜂巢布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb88370a-4cd6-4313-b155-7731ffb09fae/image_28.png)

设置 **扭曲系数（Twist Factor）** 的值，即可扭曲 **蜂巢** 布局，并使用扭曲轴（Twist Axis）属性决定蜂巢将沿哪条轴扭曲。数值以百分比表示，100%代表完整扭曲180度。

沿Y轴扭曲：

![沿Y轴扭曲的蜂巢布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/feaaf275-4a4c-4534-9174-01c6248aac00/image_29.png)

沿Z轴扭曲：

![沿Z轴扭曲的蜂巢布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05196d4e-f978-470f-b043-f025e21bcf75/image_30.png)

沿X轴扭曲：

![沿X轴扭曲的蜂巢布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2aa4f0f-9178-42f8-9346-f9f2e3333c86/image_31.png)

**蜂巢布局属性**

**说明**

**平面（Plane）**

确定坐标轴，用于定义六边形布局克隆体在哪个平面上生成。 选项包括：

-   XY
-   YZ
-   XZ

**宽度数量（Width Count）**

沿水平方向布局的克隆体数量。

**高度数量（Height Count）**

沿垂直方向布局的克隆体数量。

**宽度偏移（Width Offset）**

控制水平方向位置的偏移。

**高度偏移（Height Offset）**

控制垂直方向位置的偏移。

**宽度间距（Width Spacing）**

控制水平方向克隆体的间距。

**高度间距（Height Spacing）**

控制垂直方向克隆体的间距。

**扭曲系数（Twist Factor）**

控制蜂巢布局的扭曲程度（按百分比表示）。100%代表180度扭曲。

**扭曲轴（Twist Axis）**

确定沿哪个轴（X、Y或Z轴）扭曲布局。

##### 网格体

网格体（Mesh）布局让你沿静态网格体或骨骼网格体填充克隆。你可以在 **资产（Asset）** 属性下进行选择。如下方示例所示，选定数量的克隆体被均匀地填充到静态网格体的各个顶点上。

![网格体布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3166f1af-3ee6-468c-a73d-34471fe0c2cd/image_32.png)

可以通过多种方式对网格体进行取样：

![网格体取样数据选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a92c7639-5e23-465d-a70b-6bdc22300609/image_33.png)

下图是用三角形取样的例子：

![用三角形对网格体取样](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0b70047-e8e3-4d10-9f66-b57a6ad5644d/image_34.png)

下方示例使用了骨骼网格体：

![使用骨骼网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59e5b370-6d37-4674-a291-62a5681451c2/image_35.png)

**网格体布局属性**

**说明**

**取样Actor（Sample Actor）**

标示用作网格体源的Actor。

**资产（Asset）**

决定资产的类型。选项包括：

-   静态网格体（Static Mesh）
-   骨骼网格体（Skeletal Mesh）

**数量（Count）**

网格体上克隆体的数量。

**取样数据（Sample Data）**

决定动态设计系统对网格体取样的方式。选项包括：

-   顶点（Vertices）
-   三角形（Triangles）
-   插槽（Sockets）（限骨骼网格体）
-   骨骼（Bones ）（限骨骼网格体）
-   分段（Sections）

##### 样条线

使用"样条线布局"时，你可以用动态设计工具箱创建样条线Actor，并将其作为"取样Actor"，并沿样条线路径重复克隆该Actor。你可以调整克隆体的朝向，让其沿着曲线旋转。具体方法是用 **朝向网格体（Orient Mesh）** 开关强制克隆体沿用样条线的切线方向，并让单个的静态网格体在Y轴上进行90度旋转。下图显示了使用此类组合的结果。

![样条线布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d71655c-4f9d-4955-9a85-44462bd04142/image_36.png)

下图显示了同一个Actor在不启用朝向网格体开关并使用默认变换的情况。

![采用默认变换且禁用朝向网格体的样条线布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e684acd-978f-4163-ae5a-697adce7c2a5/image_37.png)

**样条线布局属性**

**说明**

**数量（Count）**

样条线上克隆体的数量。

**取样Actor（SampleActor）**

为克隆体使用的样条线Actor。

**朝向网格体（Orient Mesh）**

强制让克隆体沿用样条线的切线方向。

##### 球体随机

球体随机（Sphere Random）布局会让网格体克隆体沿球体表面进行随机、混乱的分布。具体分布由 **散布（Distribution）** 、**纬度（Latitude）** 和 **经度（Longitude ）** 设置项来控制。启用 **朝向网格体（Orient Mesh）** 会让所有克隆体沿着前向向量的方向围绕球体表面调整方向。在下面的示例中，前向向量为自球体中心 **向外** ，如下图所示：

![球体随机布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c7a210a-92e5-489b-b994-80423db78855/image_38.png)

不启用 **朝向网格体** 的结果就会如下图所示，所有克隆体都会沿用前向向量的方向。本例中即X轴的方向：

![所有克隆体沿用前向向量方向的球体随机布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4b1b4fc-be85-4793-9a20-bed54795d5a4/image_39.png)

若 **经度** 和 **纬度** 的值均为0.5，那么克隆体将只覆盖四分之一的球体。增加克隆体的数量（示例中为800）能更好地展示这一点。

![经度和纬度减半以覆盖四分之一的球体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1aa33635-bbfc-440e-bd6a-d318ab9abe7a/image_40.png)

调高 **缩放（Scale）** 值可扩大克隆体所覆盖的总面积，从而降低克隆体的密度。

缩放值较小：

![缩放值越小，克隆体密度越大](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8d8a7d7-f484-40d9-a43f-d6592b525cc9/image_41.png)

缩放值较大：

![缩放值越大，克隆体密度越小](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a515fccb-675e-4808-9225-6b1b415e516d/image_42.png)

更改 **旋转（Rotation）** 值可让克隆体群组进行旋转。

**球体随机布局属性**

**说明**

**数量（Count）**

球体中克隆体的数量。

**半径（Radius）**

球体的半径，可控制克隆体的分散程度。

**散布（Distribution）**

决定克隆体均匀分散的程度。

**经度（Longitude）**

以度数为单位，决定水平方向上克隆体对球体的覆盖范围。

**纬度（Latitude）**

以度数为单位，决定垂直方向上克隆体对球体的覆盖范围。

**朝向网格体（Orient Mesh）**

启用此选项以让所有克隆体沿球体布局的表面决定朝向。

**X/Y/Z轴旋转（Rotation X / Y / Z）**

决定球体向X、Y或Z轴旋转的角度。不会直接旋转克隆器Actor。

**X/Y/Z轴缩放（Scale X / Y / Z）**

布局球体在X、Y或Z轴上的缩放。不会缩放克隆器Actor。

#### 范围

![克隆器类别项下的范围属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c8e10f5-086b-41cd-8dc5-7a74362c7892/image_43.png)

由于所有克隆体都是粒子，你可以使用 **偏移（Offset）** 、 **旋转（Rotation）** 和**缩放（Scale ）** 等设置项来调整克隆体的初始变换。这类操作可以均匀也可以不均匀缩。你还可以根据当前布局随机调整其初始位置。下图示例修改了 **最小缩放（ScaleMin）** 和 **最大缩放（ScaleMax）** 属性，取值范围为0.001至2.613之间，对球体中的克隆体进行了缩放。

![由均匀缩放的不同大小克隆体构成的球体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82538142-1c37-4dfd-bbd7-43e8703025ea/image_44.png)

禁用"启用均匀缩放（ScaleUniformEnabled）"属性即可让克隆体的形状随机化。

![由不均匀缩放的不同大小克隆体构成的球体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efefded8-87c5-47a9-8389-34b823d2c1fe/image_45.png)

**范围属性**

**说明**

**启用（Enabled）**

启用后，克隆体将使用范围功能。

**X/Y/Z轴最小偏移（OffsetMin X / Y / Z）**

决定在X、Y或Z轴上的最小偏移。

**X/Y/Z轴最大偏移（OffsetMax X / Y / Z）**

决定在X、Y或Z轴上的最大偏移。

**X/Y/Z轴最小旋转（RotationMin X / Y / Z）**

决定在X、Y或Z轴上的最小旋转角度。

**X/Y/Z轴最大旋转（RotationMax X / Y / Z）**

决定在X、Y或Z轴上的最大旋转角度。

**启用均匀缩放（ScaleUniformEnabled）**

启用后，克隆体将均匀缩放。

**X/Y/Z轴最小缩放（ScaleMin X / Y / Z）**

决定在X、Y或Z轴上的最小缩放程度。

**X/Y/Z最大缩放（ScaleMax X / Y / Z）**

决定在X、Y或Z轴上的最大缩放程度。

#### 步进（克隆器）

![使用克隆器类别项的步进属性进行偏移变换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/601271d8-82b0-417f-955b-22b2b405a693/image_46.png)

**步进（Step）** 属性让你可以用偏移的方式设置克隆体的缩放和旋转。要使用此效果，克隆体的数量数必须大于1。缩放和旋转效果将逐克隆体累加。

**步进属性**

**说明**

**启用（Enabled）**

启用后，克隆体将使用步进功能。

**X/Y/Z轴旋转（Rotation X / Y / Z）**

决定在X、Y或Z轴上的旋转角度。

**X/Y/Z轴缩放（Scale X / Y / Z）**

决定在X、Y或Z轴上的缩放程度。

### 散射

**散射（Emission）** 类别属性让你可以生成新克隆体，然后再让它们消失。同时你还可以控制克隆体的生成速率、数量和持续时间。

![散射类别属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1425e5e2-72c9-486d-b730-3b0875fa4ddb/image_47.png)

#### 生成

**生成（Spawn）** 功能可以让克隆体在生命周期到期后进行重新生成，从而造成一种动态的模拟效果。如果你想让克隆体持续不断地重新生成，请将 **散射模式（Emission Mode）** 从 **一次（Once）** 改为 **无限次（Infinite）** ，并启用[生命周期](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)功能。要编辑视觉效果，请将 **散射样式（Emission Style）** 从 **立即（Instant）** 改为 **速率（Rate）** 。**散射速率（Emission Rate）** 属性可决定每秒出现的克隆数量。

如果你只想生成固定数量的克隆体，而非无限数量，请将散射模式从 **无限次（Infinite）** 改为 **多次（Multiple）** ，并将 **散射数量（Emission Count）** 值设置为任意值。

**生成属性**

**说明**

**散射模式（Emission Mode）**

决定克隆体是无限次生成，还是按固定次数生成。选项包括：

-   **一次（Once）** ：克隆体仅生成一次。
-   **无限次（Infinite）** ：克隆体将生成无限次。
-   **多次（Multiple）** ：克隆体将按固定次数生成。

**散射数量（Emission Count）**

当 **散射模式（Emission Mode）** 为"多次"时，决定克隆器生成循环的次数。

**散射间隔（Emission Interval）**

决定生成克隆器的时间间隔。

**散射样式（Emission Style）**

决定克隆体生成的速度。选项包括：

-   **立即（Instant）** ：所有克隆体都将在循环开始时立即生成。
-   **速率（Rate）** ：随时间生成克隆体。

**速率（Rate）**

决定每秒生成的克隆体数量。仅当行为模式（BehaviorMode）为"速率"时生效。

#### 生命周期

若启用"生命周期（Lifetime）"选项，克隆体将在一段时间后消失。

下图所示为克隆体生命周期的起始状态。

![生命周期属性，克隆体的起始状态](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12a35173-fcf9-44c8-b885-79c96ff3e0ed/image_48.png)

克隆体将随着时间的流逝而消失。

![克隆体在生命周期到期后消失](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca3e9839-c34d-44a1-8c0d-285f96ad7d89/image_49.png) ![生命周期设置的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84033fd2-7fa1-4e99-adf2-23bcc9bf6d7f/image_50.png)

**最小时间（Min）** 和 **最大时间（Max）** 属性将控制克隆体存在的最短和最长时间。修改其中任一属性都会让定时器重新启动。

**启用缩放（ScaleEnabled）** 开关让你能够使用一套预先设定的曲线 **模板（Templates）** 。

![生命周期的启用缩放选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af49d724-b2a8-47e8-b2fb-31fc40769096/image_51.png)

**生命周期属性**

**说明**

**启用（Enabled）**

启用此选项后，克隆器将使用生命周期功能。

**最小时间（Min）**

克隆器存在的最短时间。

**最大时间（Max）**

克隆器存在的最长时间。

**启用缩放（ScaleEnabled）**

启用后才可使用各种曲线模板。

**模板（Templates）**

 

**线性上升（Linear Ramp Up）**

生命周期的曲线模板。

**线性下降（Linear Ramp Down）**

生命周期的曲线模板。

**陡降（Drop Off）**

生命周期的曲线模板。

**缓入（Ease In）**

生命周期的曲线模板。

**脉冲输出（Pulse Out）**

生命周期的曲线模板。

**平滑上升（Smooth Ramp Up）**

生命周期的曲线模板。

**平滑下降（Smooth Ramp Down）**

生命周期的曲线模板。

**上升后下降（Ramp Up Ramp Down）**

生命周期的曲线模板。

#### 渐进

你可以使用 **渐进（Progress）** 设置来隐藏或显示克隆体。你可以让克隆体从上到下显示，或者启用 **反转渐进（Invert Progress）** ，从而让克隆体从下到上显示。

![散射类别项的渐进属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e1e9074-67fa-4c87-bac4-1cbb66d232a7/image_52.png)

渐进值为0.5时的克隆体：

![半程渐进](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af6e3fb9-bd5a-4606-bdd6-83c3ea0355d7/image_53.png)

启用 **反转渐进（Invert Progress）** 后，渐进值为0.5时的克隆体。

![半程反转渐进](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37abafe2-be5c-4172-8a57-33025ea123c8/image_54.png)

**渐进属性**

**说明**

**反转渐进（Invert Progress）**

启用后，克隆体将从下到上出现，而不是从上到下。

**渐进（Progress）**

决定隐藏或显示的克隆体的比例。

### 物理

鉴于克隆体也是粒子，粒子物理让克隆体能够与表面碰撞，也能相互碰撞。

#### 启用表面碰撞

若勾选 **启用表面碰撞（Surface Collision Enabled）** 属性，那么克隆体将可以与关卡中的表面发生碰撞。下图示例中，表面指地面。下方图片为各种情况的示例。

启用碰撞前：

![无碰撞物理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6c1effc-fd39-40f0-9e42-aa44abebf9ab/image_55.png)

勾选 **启用表面碰撞（Surface Collision Enabled）** 后，将克隆器Actor的位置移向地面：

![仅启用表面碰撞，让克隆体和表面发生碰撞](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5e3f8aa-5077-4ff5-a4f8-e88c51d2a02c/image_56.png)

示例中只使用了"启用表面碰撞"属性，所以再将克隆体向上移动也不会改变它们的相对位置，因为它们不会相互碰撞。具体效果如下图：

![仅启用表面碰撞，让克隆体再次向上移动](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36571061-92e0-417d-9954-7cd9b5314edb/image_57.png)

#### 启用粒子碰撞

勾选 **启用粒子碰撞（Particle Collision Enabled）** 属性即可让克隆器相互碰撞：

![启用粒子碰撞，让克隆体相互碰撞](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44ee919d-668b-45c7-b83f-13873ab248d8/image_58.png)

启用表面碰撞（Surface Collision Enabled）和启用粒子碰撞（Particle Collision Enabled）属性可以被同时勾选。这时克隆体不仅会与地面碰撞，还会相互碰撞，从而形成如下图所示的团块效果：

![启用表面碰撞和粒子碰撞](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f96c4cb1-a210-49c9-955f-f27adcd1d6f0/image_59.png)

#### 启用碰撞速度和碰撞迭代

如果想在发生碰撞后再计算物理，可以勾选 **启用碰撞速度（Collision Velocity Enabled）** 属性，进一步加剧粒子间的相互作用。

通过 **碰撞迭代（Collision Iterations）** 属性可以提高相互作用的精准度，该属性将决了碰撞解算器过程的重复频率；数值越高，碰撞越精确，但会影响系统性能。

![启用碰撞速度和碰撞迭代](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79a85aaa-db3e-4f6f-9ea5-1d3b3b2a327b/image_60.png)

#### 碰撞网格大小/碰撞网格分辨率

**碰撞网格大小（Collision Grid Size）** 和 **碰撞网格分辨率（Collision Grid Resolution）** 属性会直接影响受碰撞影响的克隆体数量。相对于所要覆盖的区域而言，数值越大，受影响的克隆体数量就越多。如果数值较低，效果将如下图所示。下图示例中，所有位于200x200x200网格体积之外的克隆体都不会产生物理碰撞：

![小碰撞网格尺寸中的粒子碰撞](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0aebced-3bac-4037-bf78-c18c5f07ad79/image_61.png)

调大碰撞网格大小的值即可扩大供粒子碰撞的空间体积，产生的结果将类似于下图：

![大碰撞网格尺寸中的粒子碰撞](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6411ac2d-b07f-46ea-9462-829338f86c13/image_62.png)

如果碰撞网格分辨率的值较低，则碰撞物理计算将应用于大块的克隆体整体，而不是单个粒子。如果碰撞网格分辨率的值较高，那么碰撞物理计算也能正常应用于单个的克隆体。

#### 碰撞半径模式

**碰撞半径模式（Collision Radius Mode）** 属性将决定单个所附Actor的整体半径计算方式。在上图示例中存在两种Actor，即环体和球体。

-   **延展长度（Extent Length）** ：计算从网格体中心到最远点的距离。适用于大小不一致的形状。
-   **手动（Manual）** ：让你能够无视网格体的 *实际* 大小来定义各个网格体的大小。适用于需要进行填充或无视实际大小来减少被计算的大小的情况。
-   **最小边长（Min Extent）** ：计算被引用网格体最短边的长度。
-   **最大边长（Max Extent）** ：计算被引用网格体最长边的长度。

#### 最小质量和最大质量

**最小质量（Mass Min）** 和 **最大质量（Mass Max）** 定义了粒子的整体重量，单位为公斤（kg）。

**物理属性**

**说明**

**启用表面碰撞（Surface Collision Enabled）**

启用后，克隆体会与关卡内的表面发生碰撞。

**启用粒子碰撞（Particle Collision Enabled）**

启用后，克隆体会相互碰撞。

**启用碰撞速度（Collision Velocity Enabled）**

启用后，克隆体发生碰撞后会加速弹开。

**碰撞迭代（Collision Iterations）**

决定计算克隆体碰撞的次数。

**碰撞网格分辨率（Collision Grid Resolution）**

决定克隆体所应用碰撞物理的精度。

**X/Y/Z轴碰撞网格大小（Collision Grid Size X / Y / Z）**

用X/Y/Z轴定义供克隆体发生碰撞的空间体积。

**碰撞半径模式（Collision Radius Mode）**

决定单个所附Actor的整体半径计算方式。 选项包括：

-   延展长度（Extent Length）
-   手动（Manual）
-   最小边长（Min Extent）
-   最大边长（Max Extent）

**最小质量（Mass Min）**

定义粒子（克隆体）的最小重量，单位为kg。

**最大质量（Mass Min）**

定义粒子（克隆体）的最大重量，单位为kg。

### 渲染

完成克隆器的其他设置项后，你可以用克隆器的 **渲染（Rendering）** 设置来控制克隆体的总体可见性和朝向，这具体取决于本类别中几个额外属性的值。

#### 网格体渲染模式

有好几种网格体渲染模式可供选择。

##### 迭代

按所附的网格体进行迭代。

![迭代网格体渲染模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d034eba6-6714-4793-82e8-6f26d484eb31/image_63.png)

##### 随机

随机排列所附的网格体。

![随机网格体渲染模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c77df9a1-6faa-4383-85e3-c4ae26c17339/image_64.png)

##### 混合

按网格体总数和所附网格体进行混合。

![混合网格体渲染模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53e4d65f-2648-4bb8-9fab-490fd172dd22/image_65.png)

#### 网格体朝向模式

**网格体朝向模式（Mesh Facing Mode）** 将决定克隆体的朝向。

![网格体朝向模式的选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40c33d66-4067-465b-b956-6705e36d763f/image_66.png)

##### 默认

**默认（Default）** 朝向将使用前向向量的朝向，具体如下图所示。箭头指向前向向量的方向，且不会发生旋转。

![默认网格体朝向模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb40a87c-990f-4c08-ad28-3bfe1f267bd5/image_67.png)

##### 速度

按克隆体的速度方向确定其朝向。因此，当克隆体绕球体旋转时，它们将保持朝向其旋转的方向。

![速度网格体朝向模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9919b850-29a5-4f7b-9823-987201ca9e34/image_68.png)

##### 摄像机位置

使所有克隆体直接朝向摄像机。以下方GIF图为例，图中的箭头只显示前部而不显示尾部，因为它们始终都完全朝向摄像机。

![克隆体朝向摄像机位置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1c5801c-a1a4-4ee6-bcce-81cd158b073a/image_69.gif)

##### 摄像机平面

让所有克隆体朝向摄像机所在的平面，而不是直接朝向摄像机本身。

![克隆体朝向摄像机所在平面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4245fb0f-5a88-40f8-b06e-b3e9c42e0be2/image_70.gif)

#### 网格体投射阴影

你还可以启用 **网格体投射阴影（Meshes Cast Shadows）** 属性，使网格体投射阴影。

#### 默认网格体

如果细节面板中的克隆体Actor下方没有附带网格体，那么你可以设置默认网格体。方法是使用 **默认网格体（Default Meshes）** 选项。下方示例所用的默认网格体为SM\_Ball\_01。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6aeaa131-7061-4bc3-af7f-3bec72d5215b/image_71.png)

#### 可视化效果器

**可视化效果器（Visualize Effectors）** 属性决定是否为所有克隆体使用默认材质，这样你就能暂时屏蔽材质的颜色和图案干扰，从而更清晰地评估使用效果器的结果。

#### 使用重载材质

你可以启用 **使用重载材质（Use Override Material）** 属性，为所有克隆体使用自定义的材质。

![使用重载材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e36486fc-92c1-4999-b12f-4139541f8dbf/image_143.gif)

##### 重载材质

用此属性选择你的重载材质。可以从内容浏览器中选择任何材质。

##### 使用材质设计器编辑

选择重载材质后，点击 **使用材质设计器编辑（Edit with Material Designer）** 即可对其进行编辑。这将在 **动态设计材质设计器** 的单独面板中打开相关材质。

##### 设置半透明优先级

启用此属性以使用"设置半透明优先级（Set Translucent Priority）"功能。

**渲染属性**

**说明**

**网格体渲染模式（Mesh Render Mode）**

决定克隆器的渲染模式。 选项包括：

-   迭代（Iterate）
-   随机（Random）
-   混合（Blend）

**网格体朝向模式（Mesh Facing Mode）**

启用后，克隆体将始终朝向摄像机。 选项包括：

-   默认（Default）
-   速度（Velocity）
-   摄像机位置（Camera Position）
-   摄像机平面（Camera Plane）

**网格体投射阴影（Mesh Cast Shadows）**

启用后，克隆体网格体将投射阴影。

**默认网格体（Default Meshes）**

当克隆体下方未附带网格体时，使用此数组设置克隆体使用的默认网格体。

**可视化效果器（Visualize Effectors）**

启用后，所有克隆体都将使用默认材质，以方便查看效果器。

**使用重载材质（Use Override Materials）**

启用后，你可以定义用于所有克隆体的自定义材质。 用于定义材质的多个子属性和选项如下：

-   **重载材质（Override Materials）**
-   **用材质设计器编辑（Edit with Material Designer）**
-   **设置半透明优先级（Set Translucent Priority）**

### 工具

某些情况下，你并不希望克隆器保持"生效"，有时你只需要克隆器在设定好的条件下出现。下面介绍的几种工具在这种情况下非常有用。

![克隆器Actor的工具类别项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/860362b5-332d-443d-b6f2-0d4a9b6a2eb2/image_72.png)

例如，你用克隆器创建了一些内容，但希望场景中出现实际的Actor，而非粒子，那么你可以将克隆器创建的内容转换为静态网格体或动态网格体，然后导出。然后你就可以像使用其他网格体那样使用这些网格体（包括实例），并享受这些资产类型带来的所有优势。这就像对粒子进行快照，并将结果变换为关卡中的Actor。

#### 创建所附默认Actor

如果你删除了创建克隆器时生成的默认Actor，那么点击此工具即可用当前默认的Actor重新生成该Actor。如果你未更改当前默认Actor，那么该工具会生成一个标准的立方体静态网格体。

如果克隆器下方未附带网格体，可以使用 **渲染（Rendering）** 选项卡下的 **默认网格体（Default Meshes）** 选项来设置默认网格体。下图示例中设置的默认网格体为SM\_Ball\_01。

![默认网格体设置示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4079e8e3-5853-406b-97d1-fda170aff520/image_73.png) ![默认网格体示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20e92b2f-24bb-48ab-9500-df60f0f34fcc/image_74.png) 

#### 转换为静态网格体

要使用此工具，需要先指定静态网格体输出的保存位置。

![指定保存位置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/419e24fd-11e1-4bfc-96c5-2aec5a851e17/image_75.png)

克隆体的实例将被保存为静态网格体，并放置在各自的原始位置。

![大纲视图中保存的静态网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b0ecbda-be85-4f22-92e0-4d215c075038/image_76.png)

#### 转换为单个静态网格体

此工具会将所有克隆体压缩为单个静态网格体。

下图是一个克隆器和多个克隆体转换为静态网格体前的示例：

![转换为静态网格体之前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0103d62c-3e7b-4c89-8ad4-586ce589cc88/image_77.png)

点击"转换为单个静态网格体（Convert to Static Mesh）"工具后，静态网格体输出将出现在"内容侧滑菜单"中：

![内容侧滑菜单中的静态网格体输出](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df0acbda-d084-4fbd-ac35-637da618768e/image_78.png)

新创建的静态网格体会被自动命名，格式为 `SM_{ClonerName}_{MeshUniqueId}` 。你可以在内容侧滑菜单中重命名该静态网格体。

#### 转换为实例化静态网格体

将克隆器的所有子项转换为 **实例化静态网格体（Instanced Static Mesh）** 。这或许可以提高性能。

#### 转换为单个动态网格体/转换为多个动态网格体

类似于上文描述的转换为静态网格体的工具，但它们会将克隆体转换为动态网格体。**动态网格体** 的说明见 **修饰符** 相关文档。

#### 创建克隆器Sequencer轨道

用此工具可将克隆器链接到Sequencer，从而让你以线性的方式推移碰撞的克隆动画。为达成此目的，将缓存动画。

效果器碰撞速度物理（Effector Collision Velocity Physics）属性非常适合用来试验此功能。在为Sequencer创建轨道前，请先启用此属性并设置克隆体，如下图所示：

![效果器碰撞速度物理属性的设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/887e5618-daf6-42da-ba9c-9e09df0364a2/image_79.png) ![创建克隆器Sequencer轨道按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9820698b-457e-4a55-a557-9b3a4ba1cefc/image_80.png)

创建Sequencer轨道后的结果应与下方示例类似：

![Sequencer轨道示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a06d4fb-cc9a-4196-882b-89f4e3cbac53/image_81.gif)

## 效果器Actor

你可以用 **效果器（Effector）** 来修改克隆体的各项变换值。你可以用多种切入方式来完成此操作，比如用与克隆器系统绑定的多个效果器。你可以使用效果器达成的结果有：

-   向不同方向移动克隆体。
-   用噪点模式随机化克隆体的位置。
-   通过偏移、旋转和缩放等方式来操纵克隆体的变换。

主要要求是，克隆体的元素必须位于效果器的影响范围内。

### 创建效果器

创建效果器的方法有两种：

-   选择一个现成的克隆器并点击细节面板中的 **生成绑定的效果器（Spawn Linked Effector）** 按钮。
    
    ![为现成克隆器生成绑定的效果器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fd4dc24-6370-4d0b-ae11-719058a0fb1b/image_82.png)
-   直接放置效果器：双击 **动态设计** 工具栏上的 **效果器Actor（Effector Actor）** 按钮，或使用 **放置Actor（Place Actors）** 选项卡并搜索Motion Design Effector Actor。
    
    ![直接放置效果器Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70095588-bcc6-4840-8e1f-a6d30293e236/image_83.png)

如果你只有一个克隆器，推荐第一种方法。

要使用多个效果器，则需要创建一个 **效果器** Actor，为其命名，并将其添加到克隆器的 **效果器** 数组中。

![创建多个效果器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eef51d0b-f42a-44a6-aa8d-9e6599e20b24/image_84.png) ![将效果器添加到克隆器数组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cda5607a-8d88-40ae-ae97-099691c61bf2/image_85.png)

添加并分配新效果器后，请将项目设置为类似于下图示例的状态。红色区域为原先的效果器，蓝色区域为新效果器。

![同时使用多个效果器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29c2bd43-e37a-41bf-92b6-7d8b94461e0e/image_86.gif)

### 通用

![效果器Actor的通用类别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70ba5273-1522-4edc-930b-7e447988b45e/image_87.png)

在通用（General）类别中，有应用于效果器Actor的一些标准变换设置。

**通用属性**

**说明**

位置（Location）

使用XYZ坐标的标准位置变换。

旋转（Rotation）

使用XYZ坐标的标准旋转变换。

缩放（Scale）

使用XYZ坐标的标准缩放变换。

移动性（Mobility）

与其他虚幻引擎Actor的情况类似，将决定[Actor移动性](/documentation/zh-cn/unreal-engine/actor-mobility-in-unreal-engine)。 选项包括：

-   静态（Static）
-   固定（Stationary）
-   可移动（Movable）

#### 效果器

在 **效果器（Effector）**类别中，启用（Enabled）\*\* 复选框决定是否要使用该工具。如要使用效果器，请确保勾选该复选框。

![效果器Actor的效果器类别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81e38401-fa1a-4e58-b3ff-381984ff7a91/image_88.png)

**强度（Magnitude）** 属性决定效果器对其范围内克隆体的影响强度。

**颜色（Color）** 属性让你能够为受效果器影响的克隆器着色。如果不想为克隆器着色，将此属性设置为白色即可。可以用虚幻引擎的取色器来选择颜色，或者直接输入RGBA值。

你可以在 **高级（Advanced）** 分段下：

-   使用 **查看器Sprite可见（Visualizer Sprite Visible）** 属性控制视口中效果器内外边界的可见性
-   使用细节面板中的 **查看器组件可见（Visualizer Component Visible）** 属性控制效果器Actor下查看器组件的可见性。

启用查看器Sprite可见性：

![启用查看器Sprite时将显示边界](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ef00595-d44e-4f04-b876-3941ae88d3db/image_89.png)

禁用查看器Sprite可见性：

![禁用查看器Sprite时将隐藏边界](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c49bffb5-9d12-497f-aa30-6fca909e5688/image_90.png)

**通道数据标识符（Channel Data Identifier）** 属性是一项高级功能，让你能够在动态设计之外的地方将效果器配合自定义项目使用。例如，高级用户可以使用Niagara模块编译自己的自定义系统，而这些模块可以使用效果器的数据通道接受动态设计效果器的影响。这些值是临时的，且可以随世界的重新加载而变化。

**效果器类别属性**

**说明**

**启用（Enabled）**

启用效果器。

**强度（Magnitude）**

决定效果器对其范围内克隆体的影响强度。

**颜色（Color）**

使用取色器选择标准的RGBA颜色。

**高级（Advanced）**

 

**查看器组件可见（Visualizer Component Visible）**

启用后，查看器组件将在细节面板中可见。

**查看器Sprite可见（Visualizer Sprite Visible）**

启用后，查看器Sprite将在视口中可见。

**通道数据标识符（Channel Data Identifier）**

标识用于自定义系统的效果器。

### 力

你可以用 **力（Forces）** 来为克隆体制作创意动画。力不使用关键帧，而是依靠Niagara物理。效果器系统中有几种制作动画方法，可以根据需要随意组合使用。只有在启用力后，各种力相关的设置选项才可用。

![效果器Actor的力类别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/876cae41-5a7b-4474-afb4-c911dd5855e0/image_91.png)

**力属性**

**说明**

**启用力（Forces Enabled）**

启用效果器的力选项。

**启用朝向力（Orientation Force Enabled）**

启用朝向力和相关设置。

**启用涡旋力（Vortex Force Enabled）**

启用涡旋力和相关设置。

**启用旋度噪点力（Curl Noise Force Enabled）**

启用旋度噪点力和相关设置。

**启用吸引力（Attraction Force Enabled）**

启用吸引力和相关设置。

**启用重力（Gravity Force Enabled）**

启用重力和相关设置。

**启用阻力（Drag Force Enabled）**

启用阻力和相关设置。

**启用向量噪点力（Vector Noise Force Enabled）**

启用向量噪点力和相关设置。

#### 朝向力

![朝向力的属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f635262-ac2c-4de0-8349-06a2c4f67599/image_92.png)

朝向力（Orientation Force）选项以恒定的速率影响克隆体的朝向，并根据克隆体与 **内半径** 中心的距离使其旋转，距离越近，旋转越快。

下方示例中，效果器所影响的深绿色区域对克隆体施加的旋转速度要快于浅色的区域，这具体取决于克隆体与效应器内半径的交点在何处。如果克隆体位于内外边界之外，那么它们就完全不会旋转。

![受朝向力影响的环体示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55dcbf58-3461-4566-9ac5-9a232f0e3b82/image_93.png)

**朝向力速率（Orientation Force Rate）**、**最小朝向力（Orientation Force Min）** 和 **最大朝向力（Orientation Force Max）** 属性三者相结合，可以让你操纵受力克隆体的朝向以及克隆体循环的频率。**朝向力速率** 决定旋转的速度，而 **最小朝向力** 和 **最大朝向力** 能够调节循环速度。

![朝向力旋转的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ca620b8-c6b5-4d4c-ac6e-0626c2a54a26/image_94.gif)

**朝向力属性**

**说明**

**朝向力速率（Orientation Force Rate）**

决定克隆体的旋转速度。

**X/Y/Z轴最小朝向力（Orientation Force Min X / Y / Z）**

沿指定轴对克隆体施加的最小力。

**X/Y/Z轴最大朝向力（Orientation Force Max X / Y / Z）**

沿指定轴对克隆体施加的最大力。

#### 旋涡力

![旋涡力的属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44c9ce58-9085-4b67-8ba9-ddfc58b5a3b4/image_95.png)

在旋涡力（Vortex Force）生效过程的早期，克隆体将随沿X轴施加的力变强后开始漂移。

![旋涡力的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5be71e81-236c-44fa-bead-f594f0174881/image_96.gif)

克隆体将根据旋涡力强度（Vortex Force Amount）围绕旋涡力轴（Vortex Force Axis）进行旋转。结合上一张GIF截图所示的值与效果器尺寸，得出的结果是克隆体将以相对较慢的速度飞出屏幕。

**旋涡力属性**

**说明**

**旋涡力强度（Vortex Force Amount）**

决定施加给克隆体的旋转力的强度。

**X/Y/Z轴漩涡力（Vortex Force Axis X / Y / Z）**

决定旋转的轴。不同轴上力的强度将决定最终轴相对于主轴的位置，其结果被规格化为1。

#### 旋度噪点力

旋度噪点力（Curl Noise Force）的两个属性分别是 **旋度噪点力强度（Curl Noise Force Strength）** 和 **旋度噪点力频率（Curl Noise Force Frequency）** 。

-   增加 **旋度噪点力强度** 会增加影响克隆体的加速度。
-   **旋度噪点力频率** 会将克隆体送往不同的方向。值越高，将克隆体分散所需的时间就越长，因为施加到克隆体上的力的方向将更为随机。

但结果不是随机的，而是确定的，并且取决于克隆体的种子。若对相同的布局和克隆器重复相同的种子值，将始终得到相同的效果。

下图显示了2秒后旋度噪点力频率值为1时的效果：

![旋度噪点力频率为1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97f2acd8-6b79-4f07-9f9b-de0fedf10599/image_97.png)

下图使用了相同的设置，但2秒后 **旋度噪点力频率** 的值为50：

![旋度噪点力频率为50](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3bde944-c058-42fe-b216-b4702233d357/image_98.png)

**旋度噪点力属性**

**说明**

**旋度噪点力强度（Curl Noise Force Strength）**

决定施加给克隆体的力的强度。

**旋度噪点力频率（Curl Noise Force Frequency）**

决定力的方向的随机性。

#### 吸引力

该选项会让克隆体朝效果器的位置移动。克隆体离效果器的内半径越。下面示例中的绿色区域即为内半径。

![吸引力的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20456aa4-f3dc-4e76-8888-59f8d6c559e7/image_99.png)

粒子靠近效果器外半径时， **吸引力衰减（Attraction Force Falloff）** 属性将降低粒子的速度。下面示例中的红色外部区域即为外半径。

![吸引力衰减的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd8edcdb-8a33-4511-ada9-2a535f83dca6/image_144.gif)

**吸引力属性**

**说明**

**吸引力强度（Attraction Force Strength）**

决定克隆体朝效果器中心移动的速度。

**吸引力衰减（Attraction Force Falloff）**

降低靠近效果器外半径的粒子的速度。

#### 重力

使用此力可导致克隆体逐渐下落，具体取决于 **形状（Shape）** 属性所设置的内/外半径。

下图是启用 **重力** 前的克隆体设置示例：

![启用重力前的克隆体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11c8da2b-c8cb-40e6-98a7-11f7efdf1d30/image_100.png)

下图为相同的设置，但启用重力后不久情况：

![启用重力后的克隆体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/260ae088-e5ae-41da-8786-455895b6de3e/image_101.png)

搭配使用重力和朝向力就能得到如下图所示的效果：

![搭配使用重力和朝向力的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa88bb7c-b4dc-4481-b907-8d91c1bf5e05/image_102.png)

**重力属性**

**说明**

**X/Y/Z轴重力加速度（Gravity Force Acceleration X / Y / Z）**

决定各轴方向上加速度的强度。

Z轴取值-981近似于现实世界的重力（即9.81 m/s/s的向下加速度，或以虚幻单位表示为-981）。

#### 阻力

用阻力（Drag Force）来增加阻力并降低力的速度。如果将阻力与诸如漩涡力等其他力结合使用，你那么随着 **线性阻力（Drag Force Linear）** 属性值的增加，一切都会变得更慢。

下面的GIF图展示了将阻力效果器向左移动，从而让漩涡力发挥作用的情况。

![搭配使用阻力和漩涡力的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f83c6aa-f712-4823-a66f-3231703f81d2/image_103.gif)

**阻力属性**

**说明**

**线性阻力（Drag Force Linear）**

决定线性阻力的强度。线性阻力能减缓粒子的线性运动。

**旋转阻力（Drag Force Rotational）**

决定旋转阻力的强度。旋转阻力能减缓粒子的旋转。

#### 向量噪点力

向量噪点力（Vector Noise Force）选项可让粒子向各个方向移动，移动速度取决于 **向量噪点力强度（Vector Noise Force Amount）** 属性。

但结果不是随机的，而是确定的，并且取决于克隆体的种子，因此若对相同的布局和克隆体重复相同的种子值，将始终得到相同的效果。

![向量噪点力的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa732d22-9a5c-4997-a166-ceb16cf14352/image_104.png)

**向量度噪点力属性**

**说明**

**向量噪点力强度（Vector Noise Force Amount）**

决定向量噪点力的强度。

### 模式

共有四种模式可供你影响单个克隆体的变换。你选择的模式效果取决于效果器的[形状](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%BD%A2%E7%8A%B6)和克隆体离效果器的距离。

**模式属性**

**说明**

**模式（Mode）**

选择影响克隆体变换的模式。 选项包括：

-   偏移（Offset）
-   目标（Target）
-   噪点场（Noise Field）
-   推移（Push）

#### 偏移

**偏移（Offset）** 会将诸如位置（Location）、旋转（Rotation）和缩放（Scale）等标准变换属性应用于效果器范围内的克隆体。下图所展示的是偏移X轴的值并旋转80的效果。这将对某些效果器形状选项产生更大的影响，具体取决于它们与偏移效果器的距离。

![偏移模式示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/689fc47d-a47a-42b5-8659-689b2d8369e5/image_105.png)

**偏移模式属性**

**说明**

**X/Y/Z轴偏移（Offset X / Y / Z）**

在指定轴上将效果器的影响偏移指定的距离。

**X/Y/Z轴旋转（Rotation X / Y / Z）**

使用XYZ坐标且位于效果器范围内的标准旋转变换。

**X/Y/Z轴缩放（Scale X / Y / Z）**

使用XYZ坐标且位于效果器范围内的标准缩放变换。

#### 目标

此模式默认将 **目标Actor（TargetActor）** 设置为效果器。所有克隆体，只要位于所用效果器类型的内边界或外边界内，就会朝向该目标Actor。

![目标模式示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b83fddf5-6399-4519-9a95-2dc688f47c9a/image_106.png)

你也可以选择特定的Actor作为目标。下图的示例关卡中有一个立方体网格体。只要克隆体位于效果器的内外边界内，它们就会朝向该静态网格体。目标静态网格体本身是否位于效果器的范围内并不构成影响。仅需考虑朝向目标的网格体是否位于范围内：

![保持朝向目标Actor的克隆体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65adb7f7-800a-402b-80b2-d6c061b8fb40/image_107.gif) ![选择目标Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba211cb1-dea1-451f-b5ab-24254178e891/image_108.png)

**目标模式属性**

**说明**

**目标Actor（TargetActor）**

定义所有位于效果器影响范围内的克隆体将朝向的目标Actor。

#### 噪点场

**噪点场（Noise Field）** 会根据一系列参数组织并移动克隆体。下图示例使用了各种 **强度（Strength）** 、**平移（Pan）** 和 **频率（Frequency）** 属性的组合：

![噪点场示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f10a4b56-5794-42b3-a49b-b109f1f3bdd1/image_109.png)

##### 缩放强度

**缩放强度（Scale Strength）** 根据缓动曲线沿所选轴调整受影响区域内各克隆体的缩放。下图示例将缩放强度设为影响Z轴。根据 **平移（Pan)** 设置项的值，克隆体会随着噪点场穿过效果器区域而进行上下运动。

下图示例中，Z轴上的缩放强度被设为1.0：

![噪点场低强度Z轴缩放](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20abd433-9ae0-46ed-bff7-23971db659be/image_115.png)

下图示例中，效果器设置不变，但Z轴上的缩放强度被设置为25.0：

![噪点场高强度Z轴缩放](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b8dde50-9d2c-4835-b699-c8dfe397e2e0/image_116.png)

##### 位置强度

**位置强度（Location Strength）** 将决定噪点场的平坦程度。下图示例使用了相对较低的值：

![噪点场位置强度值低](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0a85fe4-a781-4cef-b1ea-2c2a0a39f5f3/image_110.gif)

下图示例中 **位置强度** 的值相对较高。

![噪点场位置强度值高](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5edbca32-dcd5-4ce7-b958-113b22914361/image_111.gif)

##### 旋转强度

**旋转强度（Rotation Strength）** 属性会根据克隆体与效果器中心的距离来旋转克隆体。下图示例中，受影响越严重的克隆体越白，旋转越剧烈。

![噪点场旋转强度示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f9f4d1c-020f-4a04-8b62-757f95169de3/image_112.gif)

##### 平移

**平移（Pan）** 值将决定噪点曲线通过效果器的速度。使用的值较低时，将产生类似图所示的结果：

![噪点场低平移强度示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b92d36d6-cb22-4c94-9af4-22b2c65e9594/image_113.gif)

使用的值较高时，产生的结果如下图所示：

![噪点场高平移强度示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33c9034e-3f96-4040-bd1a-5a9170849802/image_114.gif)

##### 频率

设置 **频率（Frequency）** 值将决定噪点的整体强度，这将影响峰值的数量。

下图示例中的频率值相对较低。

![噪点场低频率值示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5c93156-35c4-4abe-9a36-b48bbea9f8d5/image_117.gif)

以下是相同的示例，但频率值较高。

![噪点场高频率值示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60e29aed-5a52-40b0-833b-1ebe59d6533e/image_118.gif)

**噪点场模式属性**

**说明**

**X/Y/Z轴位置强度（Location Strength X / Y / Z）**

决定噪点场的平坦程度。值越高，噪点场越不平坦。

**X/Y/Z轴旋转强度（Rotation Strength X / Y / Z）**

决定受影响的克隆体围绕指定的轴旋转多少度。

**X/Y/Z轴缩放强度（Scale Strength X / Y / Z）**

决定受影响克隆体沿指定轴移动的程度。

**X/Y/Z轴平移（Pan X / Y / Z）**

决定噪点场沿哪条轴、以什么速度穿越效果器区域。

**频率（Frequency）**

决定噪点的强度，影响峰值的数量。

#### 推移

**推移（Push）** 模式让你能够从不同方向和 **推移力度（Push Strength）** 来推动克隆体。

![推移模式属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fef946ce-58e7-44cb-b76f-7ec467bb9154/image_119.png)

##### 向前推移

向前推移（Push Forward）选项会对克隆体施加与 **推移力度（Push Strength）** 所定义的轴方向平行的推动效果。

![向前推移示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54fffb71-b1f1-48ff-8a2c-071965a69a27/image_120.png)

##### 向右推移

向右推移（Push Right）选项会对克隆体施加与推移力度所定义的轴方向形成横向垂直的推动效果。

![向右推移示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1f7b8b6-58bf-49b0-b636-b4faa128eddd/image_121.png)

#### 向上推移

向上推移（Push Up）选项会对克隆体施加与推移力度所定义的轴方向形成纵向垂直的推动效果。

![向上推移示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/902a523f-242c-44a0-9c80-1a8d4bfa5de1/image_122.png)

使用"向前推移"、"向右推移"和"向上推移"模式选项时，将值设为负数即可产生相反方向的推移效果（即为向后、向左或向下）。

##### 朝效果器推移

朝效果器推移（Push Effector）选项会根据效果器和粒子的相对位置创建一个单位向量，并根据推移力度沿着该向量进行推动。

##### 随机推移

随机推移（Push Random）选项会根据克隆器种子创建一个随机单位向量，并根据推移力度沿着该向量进行推动。此效果是确定性的，使用相同的克隆器种子和相同的选项将始终得到相同的结果。

**推移模式属性**

**说明**

**X/Y/Z轴推移力度（Push Strength X / Y / Z）**

决定沿指定轴的推移力度。

**推移方向（Push Direction）**

决定推移的方向。选项包括：

-   向前（Forward）
-   向右（Right）
-   向上（Up）
-   向效果器（Effector）
-   随机（Random）

### 步进（效果器）

![效果器Actor步进模式示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab9eeb10-ba1f-45d5-8c73-80840bfaea82/image_123.gif)

步进（Step）效果器让你可以沿着严格的前后平面对克隆体进行定位、缩放和旋转，具体由在系统中移动的浮动平面来表示。

**步进模式属性**

**说明**

**X/Y/Z轴位置（Position X / Y / Z）**

决定步进效果器平面在指定轴上的位置。

**X/Y/Z轴旋转（Rotation X / Y / Z）**

决定步进效果器平面在指定轴上的旋转。

**X/Y/Z轴缩放（Scale X / Y / Z）**

决定步进效果器平面在指定轴上的缩放。

### 形状

你可以用 **效果器（Effector）** 面板设置多种形状，从而控制效果器对克隆体的影响范围，进而达成各种效果。形状的主要功能是将效果器的影响限制在特定范围内。当效果器不受限制时，你可以先使用 **无约束（Unbound）** 模式来了解设计器对你的设计的全部影响范围。而下文将按照各个形状选项在菜单上显示的顺序逐一进行说明。

所有形状选项（除无约束形状外）都可以设置 **缓动（Easing）** 属性，缓动属性提供了一系列可供选择的曲线，如线性、正弦、三次方、圆、弹性等。根据所选的形状选项，这些曲线会对范围内的克隆体应用额外的强度效果。详见下文中的[效果器边界](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%95%88%E6%9E%9C%E5%99%A8%E8%BE%B9%E7%95%8C)一节。

除非另有说明，下方展示的所有形状示例均使用如下 **模式（Mode）** 设置。

**属性**

**值**

**模式（Mode）**

噪点场（Noise Field）

**X轴缩放强度（Scale Strength X）**

1.0

**Y轴缩放强度（Scale Strength Y）**

1.0

**Z轴缩放强度（Scale Strength Z）**

25.0

**频率（Frequency）**

1.0

表中未标出的数值均为0。

![形状设置的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ac7378c-c508-4e13-96dc-2cedda2eea68/image_124.png)

**形状属性**

**说明**

**形状（Shape）**

决定了效果器应用的形状。选项包括：

-   球体（Sphere）
-   平面（Plane）
-   盒体（Box）
-   无约束（Unbound）
-   半径（Radial）
-   环体（Torus）

**缓动（Easing）**

决定当效果器穿过形状边界时，对效果器影响施加的缓动曲线。选项如下。

#### 效果器边界

大多数效果器形状都有两个线框边界：

-   **内边界** ，在此范围内，效果器产生的所有效果都会对克隆体产生完全影响。内边界区域默认以 **红色** 显示。
    
-   **外边界** ，在此范围内，效果器产生的所有效果都会对克隆体产生部分影响。外边界区域默认以 **蓝色** 显示。
    

形状为[无约束](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%97%A0%E7%BA%A6%E6%9D%9F)的效果器例外，详见下文。

外边界对克隆体的影响介于内边界区域内的完整影响和效果器区域外的默认克隆体行为之间，是在这个范围内的插值。效果器对外边界区域内克隆体的影响程度取决于：

-   克隆体在外边界内的位置，对应内边界边缘和外部区域之间的区域。
    
-   与效果器相关的缓动属性曲线，将决定插值的计算方式。
    
    -   可用的曲线多种多样，主要是基于各种数学函数的曲线。具体请参阅下方的曲线列表以及各种曲线的示意图。

**曲线名称**

**示意图**

**曲线名称**

**示意图**

**内指数（In Expo）**

![内指数曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b0d517f-fda6-4695-8e0c-0f4ae0d5c034/in-expo-curve.png)

**内外五次方（In Out Quint）**

![内外五次方曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05b01f5c-fe2e-4e4a-98b1-5b65a1ee0cc7/in-out-quint-curve.png)

**内圆形（In Circ）**

![内圆形曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5ab1fad-13dc-4db7-aaea-ca628656bb3b/in-circ-curve.png)

**内外四次方（In Out Quart）**

![内外四次方曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de7fec7e-a0c9-441a-a6c9-0e90ed7d6583/in-out-quart-curve.png)

**内五次方（In Quint）**

![内五次方曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b222655e-48e3-4166-924a-76b7224b8b5e/in-quint-curve.png)

**内外二次方（In Out Quad）**

![内外二次方曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c7216d8-a986-41ec-8096-c140c9292b81/in-out-quad-curve.png)

**内四次方（In Quart）**

![内四次方曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5da34b6a-55d4-4b05-bcbc-6d5640805e19/in-quart-curve.png)

**内外三次方（In Out Cubic）**

![内外三次方曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b54d93af-6687-4d81-82d1-8755b3fce945/in-out-cubic-curve.png)

**内二次方（In Quad）**

![内二次方曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/644d349c-c284-49c5-aaac-b8b9aac2665b/in-quad-curve.png)

**内外正弦（In Out Sine）**

![内外正弦曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0df7e54-a92e-40fe-b3be-238671e7a44f/in-out-sine-curve.png)

**内三次方（In Cubic）**

![内三次方曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95653921-d327-496c-9ec3-e9240a5a0659/in-cubic-curve.png)

**线性（Linear）**

![线性曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/378faf97-6b76-4970-b030-5400438961f2/linear-curve.png)

**内正弦（In Sine）**

![内正弦曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f690e61d-1382-4c10-8d70-f08f32011804/in-sine-curve.png)

**内反弹（In Bounce）**

![内反弹曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4832aef-3f9f-4d0a-ba50-0c207ed283c5/in-bounce-curve.png)

**外指数（Out Expo）**

![外指数曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35edc45e-59e8-44d5-bf03-b74633858b5c/out-expo-curve.png)

**内返回（In Back）**

![内返回曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45f41dfa-3329-4d48-9723-9f9011b28697/in-back-curve.png)

**外圆形（Out Circ）**

![外圆形曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e204401-2875-49d6-89cd-0cc5edce588c/out-circ-curve.png)

**内弹性（In Elastic）**

![内弹性曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a827648-746d-4968-99c1-0eff3f9fa90a/in-elastic-curve.png)

**外五次方（Out Quint）**

![外五次方曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce66b989-89c8-41eb-882b-ceef807dc2cb/out-quint-curve.png)

**外反弹（Out Bounce）**

![外反弹曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7b929ca-ab16-4182-94c8-03d1640be150/out-bounce-curve.png)

**外四次方（Out Quart）**

![外四次方曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ade063b-d74c-4647-b14b-f0d58903944e/out-quart-curve.png)

**外返回（Out Back）**

![外返回曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e9f0fc9-e2c1-45b0-b656-0c907388df26/out-back-curve.png)

**外二次方（Out Quad）**

![外二次方曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2fa6157f-25cd-4274-b4fb-c0c379a8f58c/out-quad-curve.png)

**外弹性（Out Elastic）**

![外弹性曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4733be0c-0055-4cf2-825e-76ff011e8a0a/out-elastic-curve.png)

**外三次方（Out Cubic）**

![外三次方曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e827996-c9d2-4bf0-b6dc-8e14047aea38/out-cubic-curve.png)

**内外反弹（In Out Bounce）**

![内外反弹曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea1a3548-ef59-4a21-8644-473ed3e25820/in-out-bounce-curve.png)

**外正弦（Out Sine）**

![外正弦曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a7b3c9b-82f2-48a9-b027-94202c9ec1cf/out-sine-curve.png)

**内外返回（In Out Back）**

![内外返回曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b28f9bd-d0e0-4e16-86d9-4e25eaed9e1e/in-out-back-curve.png)

**内外指数（In Out Expo）**

![内外指数曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72c9433c-b8e7-4a8d-80bb-d9d5bc122bb0/in-out-expo-curve.png)

**内外弹性（In Out Elastic）**

![内外弹性曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17a91d7d-8b20-447d-b0dc-f82cf1754c1b/in-out-elastic-curve.png)

**内外圆形（In Out Circ）**

![内外圆形曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f034bbbc-f0ea-40a2-a397-d2827a668c54/in-out-circ-curve.png)

**随机（Random）**

![随机曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/247d7175-5469-466a-9e49-01d34b3ea7b8/random-curve.png)

边界的定义会随效果器的形状而变化，可能用内/外半径，也可能用内/外围。详情请参阅下文的具体形状选项。

你可以使用 **项目设置（Project Settings）** 的 **动态设计（Motion Design） - 克隆器和效果器（Cloner & Effector）** 控制边界的颜色和透明度。你既可以用取色器设置颜色，也可以手动设置RGBA值。Alpha通道（A）可控制线框的透明度，取值范围为0.1（最透明）到1（最不透明）。

![动态设计效果器颜色设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62f9855e-1dd6-4502-87bc-8651e479576f/image_125.png)

#### 反转类型

所有形状属性都具有一个重要设置，即列表底部的 **反转类型（Invert Type）** 选项。勾选此属性即可反转受影响的区域。

![反转类型设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5de12d36-7733-46d3-a58c-29254396b33c/image_126.png)

下方示例显展示了一个未使用反转的球体效果器。可见效果仅在效果器边界内存在，并在外边界的边缘衰减至无：

![球体形状示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/466c019e-3184-4a4e-b52b-d09bde150237/image_127.gif)

使用反转后，示例中的可见效果范围已反转。效果器的影响在边界外达到最大强度，从外边界体积内开始衰减，对内边界体积则没有影响。

![球体形状反转示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abe4888f-4d83-48c7-ba1c-efe68063b60d/image_128.gif)

#### 球体

此形状将效果器以球体展示，球体的 **内/外** 边界属性可进行自定义。位于 **外** 边界之外的克隆体都不会受到效果器的影响。你可以按照前文所述设置 **缓动（Easing）** 属性。

![效果器球体形状示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e56a0f81-e3ef-4eb8-8e66-1b63cdecce9a/image_129.png)

将示例中的模式从 **噪点场（Noise Field）** 改为 **偏移（Offset）** 后，你将更清晰地看到球体形状的边界。

![球体形状效果器偏移模式示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d9f30e4-9d73-4c9d-8f48-73af1ca78849/image_130.png)

为上面示例中的变化而应用的模式设置如下图。

**属性**

**值**

**模式（Mode）**

偏移（Offset）

**Z轴偏移（Offset Z）**

\-262.70

**Y轴旋转（Rotation Y）**

90.0

**X轴缩放（Scale X）**

1.0

**Y轴缩放（Scale Y）**

1.0

**Z轴缩放（Scale Z）**

1.0

![球体形状效果器偏移模式设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f8bf2e2-814a-4cc9-b898-ee876ba7eb58/image_131.png)

**球体形状属性**

**说明**

**内半径（Inner Radius）**

定义球体形状效果器内围影响区域的边界。

**外半径（Outer Radius）**

定义球体形状效果器外围影响区域的边界。

**反转类型（Invert Type）**

反转形状对效果器影响的修改范围。

#### 平面

此形状的效果器穿过克隆器时，将在所选模式的最小值和最大值之间，按 **缓动（Easing）** 设置所选择的曲线进行插值。平面形状效果器有两个控点，分别代表效果器通过空间之前和之后的情况。

![平面形状噪点场示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8f288c3-1600-4381-a5d8-ba3d96da8094/image_132.png)

**平面间距（Plane Spacing）** 的值越小，两个控点之间的距离越短，效果的曲线就越不平缓。

要使用平面形状，必须选择一个缓动属性的曲线选项。默认设置为线性（Linear）曲线选项。

![平面形状效果器默认线性曲线示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92a6525e-c8ca-4a53-8fe8-567399d396cb/image_133.gif)

**平面形状属性**

**说明**

**平面间距（Plane Spacing）**

决定两个平面控点之间的距离。

**反转类型（Invert Type）**

反转形状对效果器影响的修改范围。

#### 盒体

此形状使用 **内围（Inner Extent）** 和 **外围（Outer Extent）** 属性限制效果器的影响范围，而这两个属性使用XYZ轴来定义长方体的体积。盒体形状将绘制边界框，从而指示效果的位置。与其他效果器形状选项差不多，盒体形状也可以设置缓动（Easing）属性。

![盒体形状效果器示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9535c1d-8362-4daa-81a3-c185bdea0cf1/image_134.png)

反转上方示例会得到下图的效果。

![盒体形状效果器反转示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c83242e3-3a11-471b-a07c-6b7f96ded14c/image_135.png)

**盒体形状属性**

**说明**

**X/Y/Z轴内围（Inner Extent X / Y / Z）**

在对应的轴上用方框形状定义效果器内围影响区域的边界。

**X/Y/Z轴外围（Outer Extent X / Y / Z）**

在对应的轴上用盒体形状定义效果器外围影响区域的边界。

**反转类型（Invert Type）**

反转形状对效果器影响的修改范围。

#### 无约束

此选项不对效果器施加形状限制。与其他选项不同，此形状没有边界，也不使用缓动属性。

![无约束形状效果器示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d2e9b6f-6635-4911-b8bb-e34cf9595ed4/image_136.png)

#### 径向

使用径向（Radial）形状时，可以设置 **径向角度（Radial Angle）** 。径向角度最大时，你将得到一个中空的完整圆环。圆环的中心由 **最小径向半径（Radial Min Radius）** 和 **最大径向半径（Radial Max Radius）** 属性定义。你可以用标准缓动属性选项来定义径向形状的变化方式。

下图的径向角度（Radial Angle）属性采用了内外返回曲线（In Out Back Curve）的缓动选项。该选项可以让径向形状的起点较低并向上弯曲。

![内外返回曲线设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ce34fc3-ad0d-4e35-b009-27007eacfc23/image_137.png) ![径向形状效果器示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af8d9b1c-f76d-4e36-bcf6-488e33f5b794/image_138.gif)

下面的GIF图展示了如何通过改变最小径向半径（Radial Min Radius）和最大径向半径（Radial Max Radius）来自定义圆环的内外环厚度：

![更改径向形状效果器内外环厚度的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f31ca691-74f9-4bed-96e8-8b74208d2ef1/image_139.gif)

对此示例而言， **反转类型（Invert Type）** 属性会将形状区域推向地面：

![径向形状效果器反转示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba8b292a-3eea-48a9-bac9-6ed6470e1722/image_140.gif)

**径向形状属性**

**说明**

**径向角度（Radial Angle）**

决定径向形状的弧度，最大为360度的完整圆形。

**最小径向半径（Radial Min Radius）**

决定径向形状的最小（内围）边界半径。

**最大径向半径（Radial Max Radius）**

决定径向形状的最大（外围）边界半径。

**反转类型（Invert Type）**

反转形状对效果器影响的修改范围。

#### 环体

使用环体（Torus）形状选项时，你可以控制主环体的半径以及内外边界的半径。

![环体形状效果器示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe22c961-11b7-4152-a9a1-befef4547293/image_141.gif)

使用环体半径（Torus Radius）属性即可扩大环体的大小，同时保持相等的厚度。示例如下：

![环体形状效果器半径变更示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b668baa6-3020-43d3-85c7-7bf6056d8f7c/image_142.gif)

**径向形状属性**

**说明**

环体半径（Torus Radius）

决定整个环体形状的半径。

环体内半径（Torus Inner Radius）

决定环体内边界的半径。

环体外半径（Torus Outer Radius）

决定环体外边界的半径。

反转类型（Invert Type）

反转形状对效果器影响的修改范围。

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [简介](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%AE%80%E4%BB%8B)
-   [工具所在的位置](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%89%80%E5%9C%A8%E7%9A%84%E4%BD%8D%E7%BD%AE)
-   [克隆器Actor](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%85%8B%E9%9A%86%E5%99%A8actor)
-   [通用](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E9%80%9A%E7%94%A8)
-   [克隆器](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%85%8B%E9%9A%86%E5%99%A8)
-   [强制更新克隆器](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%BC%BA%E5%88%B6%E6%9B%B4%E6%96%B0%E5%85%8B%E9%9A%86%E5%99%A8)
-   [种子](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%A7%8D%E5%AD%90)
-   [颜色](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E9%A2%9C%E8%89%B2)
-   [高级](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E9%AB%98%E7%BA%A7)
-   [布局](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%B8%83%E5%B1%80)
-   [网格](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%BD%91%E6%A0%BC)
-   [线条](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%BA%BF%E6%9D%A1)
-   [圆形](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%9C%86%E5%BD%A2)
-   [圆柱体](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%9C%86%E6%9F%B1%E4%BD%93)
-   [球体均匀](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%90%83%E4%BD%93%E5%9D%87%E5%8C%80)
-   [蜂巢](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E8%9C%82%E5%B7%A2)
-   [网格体](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [样条线](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%A0%B7%E6%9D%A1%E7%BA%BF)
-   [球体随机](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%90%83%E4%BD%93%E9%9A%8F%E6%9C%BA)
-   [范围](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E8%8C%83%E5%9B%B4)
-   [步进（克隆器）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%AD%A5%E8%BF%9B%EF%BC%88%E5%85%8B%E9%9A%86%E5%99%A8%EF%BC%89)
-   [散射](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%95%A3%E5%B0%84)
-   [生成](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%94%9F%E6%88%90)
-   [生命周期](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
-   [渐进](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%B8%90%E8%BF%9B)
-   [物理](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%89%A9%E7%90%86)
-   [启用表面碰撞](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%90%AF%E7%94%A8%E8%A1%A8%E9%9D%A2%E7%A2%B0%E6%92%9E)
-   [启用粒子碰撞](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%90%AF%E7%94%A8%E7%B2%92%E5%AD%90%E7%A2%B0%E6%92%9E)
-   [启用碰撞速度和碰撞迭代](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%90%AF%E7%94%A8%E7%A2%B0%E6%92%9E%E9%80%9F%E5%BA%A6%E5%92%8C%E7%A2%B0%E6%92%9E%E8%BF%AD%E4%BB%A3)
-   [碰撞网格大小/碰撞网格分辨率](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%A2%B0%E6%92%9E%E7%BD%91%E6%A0%BC%E5%A4%A7%E5%B0%8F/%E7%A2%B0%E6%92%9E%E7%BD%91%E6%A0%BC%E5%88%86%E8%BE%A8%E7%8E%87)
-   [碰撞半径模式](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%A2%B0%E6%92%9E%E5%8D%8A%E5%BE%84%E6%A8%A1%E5%BC%8F)
-   [最小质量和最大质量](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%9C%80%E5%B0%8F%E8%B4%A8%E9%87%8F%E5%92%8C%E6%9C%80%E5%A4%A7%E8%B4%A8%E9%87%8F)
-   [渲染](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%B8%B2%E6%9F%93)
-   [网格体渲染模式](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E6%B8%B2%E6%9F%93%E6%A8%A1%E5%BC%8F)
-   [迭代](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E8%BF%AD%E4%BB%A3)
-   [随机](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E9%9A%8F%E6%9C%BA)
-   [混合](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%B7%B7%E5%90%88)
-   [网格体朝向模式](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E6%9C%9D%E5%90%91%E6%A8%A1%E5%BC%8F)
-   [默认](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E9%BB%98%E8%AE%A4)
-   [速度](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E9%80%9F%E5%BA%A6)
-   [摄像机位置](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E4%BD%8D%E7%BD%AE)
-   [摄像机平面](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E5%B9%B3%E9%9D%A2)
-   [网格体投射阴影](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E6%8A%95%E5%B0%84%E9%98%B4%E5%BD%B1)
-   [默认网格体](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E9%BB%98%E8%AE%A4%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [可视化效果器](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%8F%AF%E8%A7%86%E5%8C%96%E6%95%88%E6%9E%9C%E5%99%A8)
-   [使用重载材质](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E4%BD%BF%E7%94%A8%E9%87%8D%E8%BD%BD%E6%9D%90%E8%B4%A8)
-   [重载材质](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E9%87%8D%E8%BD%BD%E6%9D%90%E8%B4%A8)
-   [使用材质设计器编辑](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%9D%90%E8%B4%A8%E8%AE%BE%E8%AE%A1%E5%99%A8%E7%BC%96%E8%BE%91)
-   [设置半透明优先级](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%8D%8A%E9%80%8F%E6%98%8E%E4%BC%98%E5%85%88%E7%BA%A7)
-   [工具](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%B7%A5%E5%85%B7)
-   [创建所附默认Actor](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%89%80%E9%99%84%E9%BB%98%E8%AE%A4actor)
-   [转换为静态网格体](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E8%BD%AC%E6%8D%A2%E4%B8%BA%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [转换为单个静态网格体](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%8D%95%E4%B8%AA%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [转换为实例化静态网格体](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%AE%9E%E4%BE%8B%E5%8C%96%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [转换为单个动态网格体/转换为多个动态网格体](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%8D%95%E4%B8%AA%E5%8A%A8%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93/%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%A4%9A%E4%B8%AA%E5%8A%A8%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [创建克隆器Sequencer轨道](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%85%8B%E9%9A%86%E5%99%A8sequencer%E8%BD%A8%E9%81%93)
-   [效果器Actor](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%95%88%E6%9E%9C%E5%99%A8actor)
-   [创建效果器](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%95%88%E6%9E%9C%E5%99%A8)
-   [通用](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E9%80%9A%E7%94%A8-2)
-   [效果器](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%95%88%E6%9E%9C%E5%99%A8)
-   [力](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%8A%9B)
-   [朝向力](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%9C%9D%E5%90%91%E5%8A%9B)
-   [旋涡力](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%97%8B%E6%B6%A1%E5%8A%9B)
-   [旋度噪点力](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%97%8B%E5%BA%A6%E5%99%AA%E7%82%B9%E5%8A%9B)
-   [吸引力](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%90%B8%E5%BC%95%E5%8A%9B)
-   [重力](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E9%87%8D%E5%8A%9B)
-   [阻力](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E9%98%BB%E5%8A%9B)
-   [向量噪点力](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%90%91%E9%87%8F%E5%99%AA%E7%82%B9%E5%8A%9B)
-   [模式](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%A8%A1%E5%BC%8F)
-   [偏移](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%81%8F%E7%A7%BB)
-   [目标](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [噪点场](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%99%AA%E7%82%B9%E5%9C%BA)
-   [缩放强度](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%BC%A9%E6%94%BE%E5%BC%BA%E5%BA%A6)
-   [位置强度](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E4%BD%8D%E7%BD%AE%E5%BC%BA%E5%BA%A6)
-   [旋转强度](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%97%8B%E8%BD%AC%E5%BC%BA%E5%BA%A6)
-   [平移](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%B9%B3%E7%A7%BB)
-   [频率](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E9%A2%91%E7%8E%87)
-   [推移](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%8E%A8%E7%A7%BB)
-   [向前推移](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%90%91%E5%89%8D%E6%8E%A8%E7%A7%BB)
-   [向右推移](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%90%91%E5%8F%B3%E6%8E%A8%E7%A7%BB)
-   [向上推移](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%90%91%E4%B8%8A%E6%8E%A8%E7%A7%BB)
-   [朝效果器推移](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%9C%9D%E6%95%88%E6%9E%9C%E5%99%A8%E6%8E%A8%E7%A7%BB)
-   [随机推移](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E9%9A%8F%E6%9C%BA%E6%8E%A8%E7%A7%BB)
-   [步进（效果器）](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%AD%A5%E8%BF%9B%EF%BC%88%E6%95%88%E6%9E%9C%E5%99%A8%EF%BC%89)
-   [形状](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%BD%A2%E7%8A%B6)
-   [效果器边界](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%95%88%E6%9E%9C%E5%99%A8%E8%BE%B9%E7%95%8C)
-   [反转类型](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%8F%8D%E8%BD%AC%E7%B1%BB%E5%9E%8B)
-   [球体](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%90%83%E4%BD%93)
-   [平面](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%B9%B3%E9%9D%A2)
-   [盒体](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%9B%92%E4%BD%93)
-   [无约束](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E6%97%A0%E7%BA%A6%E6%9D%9F)
-   [径向](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E5%BE%84%E5%90%91)
-   [环体](/documentation/zh-cn/unreal-engine/motion-design-cloners-and-effectors-in-unreal-engine#%E7%8E%AF%E4%BD%93)