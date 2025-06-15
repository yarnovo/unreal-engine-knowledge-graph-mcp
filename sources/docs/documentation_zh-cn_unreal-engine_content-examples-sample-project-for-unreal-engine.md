# 虚幻引擎内容示例 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/content-examples-sample-project-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:48:27.966Z

---

目录

![内容示例](https://dev.epicgames.com/community/api/documentation/image/bfe7f6ad-7075-474d-ab51-77dcd0649b31?resizing_type=fill&width=1920&height=335)

**内容示例（Content Examples）** 项目旨在展示虚幻引擎（UE）中可供使用的不同技术。该项目由一系列关卡组成，每个关卡都将为你介绍引擎的一个不同方面。在关卡中移动时，你会看到一系列标有编号的"展台"，而每个"展台"都会展示特定主题的示例资产。

内容示例的介绍采用了一种交互式学习方法。其中一些关卡需要进入游戏，以便与资产进行交互。

你可以在内容示例关卡中打开任何示例，自由进行更改或编辑，制作自己的版本，并了解它们的构成方式。你也可以在自己的关卡中使用任意示例。

## 安装内容示例的范例项目

要使用内容示例项目创建项目，请按以下步骤操作：

1.  通过 **Fab** 访问[内容示例](https://fab.com/s/d435deb8d960)，点击 **添加到我的库（Add to My Library）**，让项目文件出现在 **Epic Games启动程序** 中。
    1.  或者，你也可以在UE的Fab插件中搜索该示例项目。
2.  在 **Epic Games启动程序** 中，找到 **虚幻引擎 > 库 > Fab库** 以访问项目。
    
    只有在你安装了兼容的引擎版本时，示例项目才会出现在 **Fab库** 中。
    
3.  点击 **创建项目（Create Project）** 并按照屏幕上的提示下载示例并启动新项目。
    
4.  项目打开后，你可以在入口走廊中浏览，了解如何使用项目文件。选择 **文件（File）>打开关卡（Open Level）** 可浏览全部可用内容。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24689cb1-f4c1-4664-90bc-db24dcdfb3eb/04-file-open-level.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24689cb1-f4c1-4664-90bc-db24dcdfb3eb/04-file-open-level.png)
    
    点击查看大图。
    
5.  在 **Map** 文件夹中选择一个要探索的关卡。点击 **打开（Open）** 打开该关卡。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2d4a9e3-fe55-4292-9837-768d41427ac8/05-available-levels.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2d4a9e3-fe55-4292-9837-768d41427ac8/05-available-levels.png)
    
    点击查看大图。
    

关于访问示例内容及虚幻引擎的Fab插件，详见[示例与教程](/documentation/zh-cn/unreal-engine/samples-and-tutorials-for-unreal-engine)。

## 可用内容

内容示例项目中提供了以下关卡供你探索。

关卡名称

内容

**动画（Animation）**

这张地图提供如何向Actor应用动画的示例。这可以通过一次性事件、循环事件、蓝图或在动画蓝图中定义行为类型序列来完成。它还展示了各种动画资产技术以及骨骼重定向。

**动画基础知识（Animation\_Basics）**

这张地图介绍动画的基础知识。你可以在此地图中了解骨骼网格体、根骨骼运动、混合空间等。

**动画重定向（Animation Retargeting）**

这张地图提供了如何在不同角色上重新使用动画的示例，无论它们的比例和骨骼层级如何。你可以在此地图中了解平移重定向、IK Rig和IK重定向器等技术。重定向过程可以在运行时完成，也可以在离线创建新动画资产时完成。

**音频（Audio）**

这张地图显示了各种声音Actor和资产。你可以在此地图中了解如何在关卡中应用这些内容。这张地图还包括为混响和音量控制等效果设置音频音量的示例。

**蓝图交流（Blueprint\_Communication）**

这张地图介绍了蓝图之间相互交流的方式。包括通过投射直接交流、使用事件分发器以及使用接口在蓝图之间发送数据的演示。

**蓝图输入示例（Blueprint\_Input\_Examples）**

这张地图显示了可拥有的蓝图Pawn。你可以在此地图中了解如何捕获玩家的输入，然后以不同方式使用它们来驱动各种蓝图。

**蓝图鼠标交互（Blueprint\_Mouse\_Interaction）**

这张地图介绍如何使用鼠标输入来控制游戏。你可以在此地图中了解如何设置玩家控制器以启用鼠标点击。

**蓝图样条线（Blueprint\_Splines）**

这张地图展示了如何将样条线组件与蓝图一起使用，以创建能够以多种不同方式使用的路径。

**蓝图渲染到目标（BlueprintRenderToTarget）**

这张地图展示了如何使用蓝图的"渲染到目标"功能来实现纹理创建器、高度场绘制器和GPU流体表面模拟。

**蓝图高级技术（Blueprints\_Advanced）**

这张地图介绍了在关卡中使用蓝图的实用提示和技巧。包括随机化示例、对象数组的创建和游戏行为示例，如跟踪聚光源和工作入口。

**蓝图概述（Blueprints\_Overview）**

这张地图介绍了在项目中使用蓝图视觉效果脚本的基础知识。

**Cascade旧版效果（Cascade\_Legacy\_Effects）**

这张地图显示了使用Cascade粒子效果引擎的示例。 **注意**： Cascade技术已废弃，不再积极开发。你应查看Niagara示例地图以了解最新技术。

**Cascade旧版粒子（Cascade\_Legacy\_Particles）**

这张地图显示了使用Cascade粒子效果引擎的补充示例。 **注意**： Cascade技术已废弃，不再积极开发。你应查看Niagara示例地图以了解最新技术。

**Chaos破坏系统（Chaos Destruction）**

这张地图介绍了使用Chaos引擎的破坏系统的基础知识。你可以在此地图中了解几何体集合、破裂方法等。

**角色渲染（Character\_Rendering）**

这张地图介绍了对眼睛材质和头发着色进行角色渲染的示例。

**布料（Cloth）**

这张地图显示了在游戏中使用Chaos布料的提示和技巧。 **注意**： 虚幻引擎5中可以使用骨骼网格体编辑器创作布料。

**通用UI（CommonUI）**

这张地图显示了如何使用CommonUI创建分层的多平台用户界面。

**Control Rig**

这张地图显示了如何使用Control Rig操纵骨骼网格体来创建动态动画。Contro Rig可以通过动画蓝图或Sequencer驱动。这张地图还显示了各种Control Rig资产技术、Rig分层、Rig共享和样条线。

**贴花（Decals）**

这张地图展示了如何将材质和材质元素投射到表面上。你可以使用贴花在一个表面的特定区域添加独特的效果，用于装饰或创作变体。

**示例项目欢迎界面（ExampleProjectWelcome）**

这是在你首次打开内容示例项目时显示的"迎宾大厅"。这里详细说明了如何浏览项目。

**FBX导入选项（FBX\_Import\_Options）**

这张地图显示了在导入FBX文件时要使用的一些关键设置。FBX文件导入可用于静态和骨骼网格体。

**IKRig**

这张地图提供使用IK Rig创建骨骼网格体姿势的示例。数据可以由动画蓝图驱动，使用全身IK等交互式解算器。这张地图还显示了各种IK Rig资产技术，以及如何在动画中叠加使用UK。

**地形（Landscapes）**

地形内容示例地图中提供了三个示例，展示了如何使用地形工具创建山脉、丘陵和山谷。第二个和第三个示例演示了两个附加工具的使用，分别是样条线工具（用于创建道路）和植被工具（用于快速散布和放置树木等静态网格体）。

**关卡脚本（Level\_Scripting）**

这张地图显示了蓝图脚本在关卡中的各种用途。你可以在此地图中了解如何配合关卡脚本蓝图使用触发器，以处理一系列游戏交互。

**关卡流送（Level\_Streaming）**

这张地图介绍关卡流送的概念，展示了在运行时将内容加入关卡的不同方法。

**光照（Lighting）**

这张地图概述了引擎中的光源及其关键属性。包括光源类型、光源移动性、阴影设置等示例。

**材质高级设置（Material\_Advanced）**

这张地图包含材质设置的高级示例。

**材质实例（Material\_Instances）**

这张地图显示了如何设置材质实例。你可以设置主材质以及从主材质继承参数的子材质。

**材质节点（Material\_Nodes）**

这张地图介绍不同的材质输入。通过这些示例可以了解不同输入如何影响材质的整体外观。

**材质属性（Material\_Properties）**

这张地图提供所有材质属性的概览。

**数学殿堂（Math\_Hall）**

这张地图介绍了基本的数学函数、材质函数和三角函数。通过让对象面向玩家、使用矢量测量距离等示例，了解如何在游戏脚本中使用数学。

**变形目标（MorphTargets）**

这张地图概述了如何在骨骼网格体上使用变形目标来更改其形状或材质。

**寻路网格体（NavMesh）**

这张地图概述了如何使用寻路网格体进行AI寻路。例如，你可以使用它来绕过障碍物。

**网络功能（Network\_Features）**

这张地图展示了蓝图联网功能的示例。

**Niagara高级粒子（Niagara\_Advanced\_Particles）**

这张地图显示了高级Niagara粒子效果的示例。你可以在此地图中了解如何进行最近邻查询、模拟阶段、迭代约束、网格体复制、将粒子数据导出到蓝图等。

**Niagara流体（Niagara\_Fluids）**

这张地图显示了使用Niagara流体插件的示例。查看2D和3D气体和液体模拟的示例。了解如何设置碰撞、光照、父项模拟以及质量/性能权衡。 **注意**： 必须在PIE中运行模拟。请确保你的显卡已更新到最新的驱动程序版本。

**Niagara粒子（Niagara\_Particles）**

这张地图介绍Niagara粒子效果引擎。沉浸在复杂性日益增加的Niagara模拟中，逐步学习相关知识。

**Paper2D**

这张地图介绍如何使用Paper2D插件创建2D游戏。你可以在此地图中了解如何创建平面粒子、图像序列视图，并应用具有锁定轴的物理系统。

**视差遮挡映射（ParallaxOcclusionMapping）**

这张地图展示如何使用视差遮挡映射通过像素着色器赋予纹理置换外观。这类似于凹凸贴图偏移，但通过高度图的光线追踪提供更准确的交叉点。

**物理系统动画（PhysicalAnimation）**

这张地图中的示例展示了如何使角色动画与物理系统相融合。

**物理系统（Physics）**

这张地图介绍虚幻引擎中的物理系统。你可以在此地图中了解如何向对象施加作用力，并学习不同类型的约束

**枢轴绘制器（PivotPainter）**

这张地图介绍如何在虚幻引擎中使用3ds Max中的枢轴绘制器脚本。这些示例使用单物体绘制器（Per Object Painter）创建。此MAXScript用于在模型顶点数据中存储模型枢轴点和旋转信息。随后，此信息可用于在引擎中动态更改对象的形状、位置或方向。另有高级示例展示了如何为草和树设置动画。

**枢轴绘制器2（PivotPainter2）**

枢轴绘制器2是3ds MAXScript，可用于生成复杂的程序化动画。枢轴绘制器2在3ds Max中的工作流程有所改进，提高了数据准确性，并增加了输出选项的数量。

**后期处理（PostProcessing）**

这张地图显示了可用于更改关卡外观的后期处理效果示例。你可以探索胶片、泛光、镜头光晕等诸多选项。

**程序化网格体（ProceduralMesh）**

这张地图介绍如何使用程序化网格体工具通过顶点位置、三角形、法线、UV和切线生成形状。

**皮肤渲染（Skin Rendering）**

这张地图展示了如何使用次表面轮廓创建逼真的人体皮肤。

**静态网格体（StaticMeshes）**

这张地图介绍了静态网格体及其许多不同的属性。你可以在此地图中了解如何在游戏中制作静态或可移动的网格体。查看UV纹理映射、将材质应用于网格体、顶点颜色、网格体绘制工具等示例。

**虚幻示意图形（UMG）**

你可以在此了解如何使用虚幻示意图形为游戏构建用户界面。查看滑块、按钮、进度条等示例。

**体积（Volumes）**

你可以在此了解如何在关卡中添加体积以实现不同的效果。体积用于定义在其中应用特定行为的区域。例如，你可以根据与镜头的距离来剔除体积内的对象。

-   [fab](https://dev.epicgames.com/community/search?query=fab)
-   [free](https://dev.epicgames.com/community/search?query=free)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [安装内容示例的范例项目](/documentation/zh-cn/unreal-engine/content-examples-sample-project-for-unreal-engine#%E5%AE%89%E8%A3%85%E5%86%85%E5%AE%B9%E7%A4%BA%E4%BE%8B%E7%9A%84%E8%8C%83%E4%BE%8B%E9%A1%B9%E7%9B%AE)
-   [可用内容](/documentation/zh-cn/unreal-engine/content-examples-sample-project-for-unreal-engine#%E5%8F%AF%E7%94%A8%E5%86%85%E5%AE%B9)

相关文档

[

示例与教学

![示例与教学](https://dev.epicgames.com/community/api/documentation/image/bea1bf2f-50ab-4f66-a4e2-d7c116b54675?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/samples-and-tutorials-for-unreal-engine)