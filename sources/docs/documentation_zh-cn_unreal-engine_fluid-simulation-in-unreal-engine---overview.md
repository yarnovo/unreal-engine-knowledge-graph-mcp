# 虚幻引擎中的流体模拟 - 概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview
> 
> 生成时间: 2025-06-14T19:49:47.888Z

---

目录

![流体模拟概述](https://dev.epicgames.com/community/api/documentation/image/322e7c0f-5919-4330-80d3-36170f7793ae?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

虚幻引擎5包含一组用于实时模拟流体效果的工具。

此工具集对美术师十分友好，包含一系列基于GPU的模拟器、可复用的模块，以及强大的数据结构，均可在Niagara编辑器（Niagara Editor）中使用。 高级用户可以利用各种公开的参数来修改模拟，从而满足其需求。

流体模拟系统旨在生成各种复杂的流体效果，以便满足游戏及场景动画中对于实时流体效果的需要。该系统还可以将复杂的模拟效果烘焙成序列图片，从而满足更多需要。

## 目标受众

流体（气体和液体）模拟器的目标受众涵盖图形研究人员、特效美术师等在内的所有人。 以下是它对于不同用户的一些用途：

### 特效美术师

-   在地图中快速放置流体系统，用于模拟某些游戏元素，或用于某些过场动画效果。
-   对Actor通过蓝图暴露的用户参数进行编辑、关键帧设置或其他控制。
-   调整一些系统参数以获得所需的外观。
-   添加适当的力和碰撞对象，使流体对场景做出响应。
-   对流体注入流体解算器的方式进行简单修改。

### 特效师

-   从预定义的模板开始构建自定义系统，以实现所需的外观。
-   合并新的力、源出方法或自定义边界条件。
-   在系统内的流体发射器和源出发射器中添加和修改现有模块。
-   分析并进行更改以提高特定系统的性能。
-   构建或修改系统并公开用户参数，以强化团队中的美术师能力。

### 研发部门的开发者

-   通过编写HLSL着色器代码来扩展基础发射器，从而设计复杂的流体行为。
-   通过修改或替换现有模块来修改模拟算法的各个方面。
-   尝试新算法并在Niagara编辑器或地图中快速测试这些算法。
-   使用用户参数和摘要视图构建新系统和打包参数。

## 流体模拟的重要概念

### 概述

流体模拟是指通过算法生成表示流体（如气体或液体）运动的数据的过程。 这种模拟数据可以表示为网格或粒子，具体取决于所使用的算法。

虚幻引擎流体模拟系统使用网格来模拟气体，并混合使用粒子和网格来模拟液体。

### 网格

气体模拟由网格表示，网格中每个单元都包含表示该处介质的密度、温度和速度的数据。 网格单元尺寸越小，模拟质量越高，但这种质量的提高也伴随着计算开销的增加。

渲染烟雾模拟时，你通常会使密度网格可视化。与密度较低的区域相比，密度较高的区域更不透明。 火焰模拟与之类似，由温度控制每个网格单元中的火焰颜色。 在火焰模拟中，温度升高会导致气体由于浮力而上升得更快。

### 流体运动

在模拟具有真实运动效果的流体时，主要工作之一是"压力解算"过程。 该技术涉及求解一个方程组，目的是确保流体在对象周围正确流动并产生逼真的漩涡运动。

此模拟涉及一个迭代过程，迭代次数越多，产生的模拟就越精确。 但是，更多的迭代将导致更高的计算开销。 需要重点注意的是，有时"压力解算"技术会影响添加到模拟中的力并削弱其效果。

### 碰撞对象

为了使流体响应附近的对象，必须首先设置所谓的"边界条件"。

要为模拟设置边界条件，需要遮蔽模拟区域内对象所在的区域，以确保任何其他流体都无法占据同一个空间。 这些碰撞对象可以在场景中移动，碰撞对象的速度用于让周围的流体产生位移。

举一个常见的例子，一个物体掉入一池液体中，导致物体周围溅起水花并产生涟漪。 系统可以使用许多对象类型作为碰撞物，例如静态网格体、几何体集合和深度贴图。

### 液体

Niagara流体（Niagara Fluids）使用称为FLIP（Fluid-Implicit-Particle，即流体隐式粒子）的混合粒子和网格算法来模拟液体，例如流水。 该系统在网格上解算流体的速度，然后取样后回到代表流体形状的粒子。

请注意，液体模拟和气体模拟之间有一些相似之处，因此前面关于碰撞对象和流体运动的几小节内容也适用于液体。

## Niagara的重要概念

所有流体模拟器都可以从Niagara编辑器中访问到，并且会利用Niagara的各种功能。

要了解有关Niagara VFX系统的更多信息，请访问[此处](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)的文档。

### 网格数据接口

**网格2D集合（Grid 2D Collection）** 和 **网格3D集合（Grid 3D Collection）** 是分别用于在2D和3D网格中存储指定属性的数据接口。 这些接口用于解算流体时所需的所有计算。

### 模拟阶段

对于气体或液体模拟算法中的每个步骤，虚幻引擎流体模拟系统都会确保在处理完所有网格单元之后才会进入下一步。 该系统使用Niagara中所谓的 **模拟阶段（Simulation Stages）** 来实现此目的。 请注意，通过修改模拟阶段的 **迭代次数（Num Iterations）** 属性，可以在进入下一模拟阶段之前多次运行模拟阶段。

### 可复用模块

大部分流体行为都是在模块中定义的，这些模块可以在Niagara系统堆栈中移动。 一些模块用于2D、3D、气体和液体模拟器，并且一般都按照高通用性的方式来编写。 高级用户可以通过修改或替换各种模块来修改核心流体解算器行为。

### 流体参数

**新Niagara系统（New Niagara System）** 菜单中公开的所有模板系统都有用户参数，可用于对放置在地图中的Actor进行修改。 可以直接在 **细节（Details）** 面板中编辑值。 流体发射器的 **摘要视图（Summary View）** 上公开了更多参数，可以在Niagara编辑器中修改这些参数。

## 模拟器类型

### 2D气体

这是一种气体模拟，只在二维空间中进行流动。 这些模拟通常比3D模拟快得多，最适合游戏和实时用途。 但是，2D气体模拟通常缺乏3D模拟可以表现出的复杂湍流。

需要重点注意的是，3D对象可以与2D模拟交互。 这些类型的模拟可以设置为始终面向摄像机并模拟3D行为。 这通常用于创建火炬或其他需要深度的火焰效果。

2D气体模拟在面向摄像机或面向世界的平面上渲染。

### 3D气体

这是最常见的气体模拟类型。 与2D气体模拟相比，3D气体可模拟深度和更复杂的流动过程，但也需要更高的内存和GPU开销。

这种类型的模拟器最适合用于实时应用程序中的hero效果以及用于过场动画。 也可以将结果烘焙到纹理中，从而提高实时性能。

采用烘焙光照的气体模拟可以通过将阴影烘焙到网格中来实现自阴影。 然后会将此数据传递到材质进行渲染。 光线步进材质负责通过积累可见密度和温度来生成体积图像。

### 2D FLIP

2D FLIP对3D粒子进行取样并生成一个2D模拟域，在该域中进行压力解算并应用FLIP算法来更新粒子。 通常，该域与摄像机对齐，尽管使用了2D流体力，但仍可以实现复杂的3D外观流动效果。 这可用于模拟令人信服的飞溅效果，但不适用于水池。

2D FLIP模拟通常渲染为3D粒子。

### 浅水

与2D FLIP不同，浅水（Shallow Water）模拟器可用于模拟不包含大量飞溅效果的水池。 这种模拟器可用于模拟船只尾流，或是与在水中移动的对象进行简单的交互。

浅水模拟是渲染为水面位移的高度场。

### 3D FLIP

3D FLIP模拟是强大的液体模拟，能够模拟各种效果，例如海滩波浪、河流和复杂的对象交互。 请注意，这些复杂的模拟在计算方面开销很高。 这些是粒子模拟，速度由确保流体不会压缩的网格解算器进行确定。

3D FLIP模拟的渲染方法是将粒子拼接到网格中，然后使用光线行进技术将网格渲染为表面。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [fluids](https://dev.epicgames.com/community/search?query=fluids)
-   [liquid](https://dev.epicgames.com/community/search?query=liquid)
-   [gas](https://dev.epicgames.com/community/search?query=gas)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标受众](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E7%9B%AE%E6%A0%87%E5%8F%97%E4%BC%97)
-   [特效美术师](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E7%89%B9%E6%95%88%E7%BE%8E%E6%9C%AF%E5%B8%88)
-   [特效师](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E7%89%B9%E6%95%88%E5%B8%88)
-   [研发部门的开发者](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E7%A0%94%E5%8F%91%E9%83%A8%E9%97%A8%E7%9A%84%E5%BC%80%E5%8F%91%E8%80%85)
-   [流体模拟的重要概念](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E6%B5%81%E4%BD%93%E6%A8%A1%E6%8B%9F%E7%9A%84%E9%87%8D%E8%A6%81%E6%A6%82%E5%BF%B5)
-   [概述](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E6%A6%82%E8%BF%B0)
-   [网格](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E7%BD%91%E6%A0%BC)
-   [流体运动](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E6%B5%81%E4%BD%93%E8%BF%90%E5%8A%A8)
-   [碰撞对象](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E7%A2%B0%E6%92%9E%E5%AF%B9%E8%B1%A1)
-   [液体](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E6%B6%B2%E4%BD%93)
-   [Niagara的重要概念](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#niagara%E7%9A%84%E9%87%8D%E8%A6%81%E6%A6%82%E5%BF%B5)
-   [网格数据接口](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E7%BD%91%E6%A0%BC%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3)
-   [模拟阶段](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E6%A8%A1%E6%8B%9F%E9%98%B6%E6%AE%B5)
-   [可复用模块](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E5%8F%AF%E5%A4%8D%E7%94%A8%E6%A8%A1%E5%9D%97)
-   [流体参数](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E6%B5%81%E4%BD%93%E5%8F%82%E6%95%B0)
-   [模拟器类型](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E6%A8%A1%E6%8B%9F%E5%99%A8%E7%B1%BB%E5%9E%8B)
-   [2D气体](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#2d%E6%B0%94%E4%BD%93)
-   [3D气体](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#3d%E6%B0%94%E4%BD%93)
-   [2D FLIP](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#2dflip)
-   [浅水](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#%E6%B5%85%E6%B0%B4)
-   [3D FLIP](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview#3dflip)