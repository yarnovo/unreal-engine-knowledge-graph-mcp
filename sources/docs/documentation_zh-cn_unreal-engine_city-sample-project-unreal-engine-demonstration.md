# 城市示例项目虚幻引擎演示 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration
> 
> 生成时间: 2025-06-14T20:48:32.177Z

---

目录

![城市示例](https://dev.epicgames.com/community/api/documentation/image/de7181ce-e168-410e-933e-ba9626083f7f?resizing_type=fill&width=1920&height=335)

设计师和开发人员都可以使用《城市示例》项目这个游乐场探索如何将各种全新和改进的系统整合起来，创建引人入胜的广阔环境。该示例使用PlayStation 5和Xbox Series S|X硬件上发布的[黑客帝国觉醒：虚幻引擎5体验](https://www.unrealengine.com/wakeup)技术演示中所用的相同资产和设计技巧构建。

你可以利用虚幻引擎5的全新和改进的功能构建度细节丰富的大型世界，并使用Mass AI和全动态光照打造逼真效果。城市可通过规则处理器使用程序化生成操作来设计和构建。

该示例项目中使用了以下功能：

-   世界分区与一个Actor一个文件一起用于改进关卡流送和编辑器工作流程效率。
-   Nanite支持使用高保真虚拟化微多边形几何体。
-   Lumen使用硬件光线追踪生成动态全局光照和反射。
-   虚拟阴影贴图系统为城市提供一致的高分辨率投影。
-   Mass AI根据MetaHuman库管理交通和人群的行为和可视化。
-   Chaos物理系统可驱动载具和破坏系统。
-   MetaSounds系统在城市中布置城市声效。
-   Niagara用于粒子系统。
-   以及其他功能！

## 访问《城市示例》项目

要使用城市示例项目创建项目，请按以下步骤操作：

1.  通过 **Fab** 访问[城市示例](https://fab.com/s/5e8f5eda64d8)，点击 **添加到我的库（Add to My Library）**，让项目文件出现在 **Epic Games启动程序** 中。
    1.  或者，你也可以在UE的Fab插件中搜索该示例项目。
2.  在 **Epic Games启动程序** 中，找到 **虚幻引擎 > 库 > Fab库** 以访问项目。
    
    只有在你安装了兼容的引擎版本时，示例项目才会出现在 **Fab库** 中。
    
3.  点击 **创建项目（Create Project）** 并按照屏幕上的提示下载示例并启动新项目。

关于访问示例内容及虚幻引擎的Fab插件，详见[示例与教程](/documentation/zh-cn/unreal-engine/samples-and-tutorials-for-unreal-engine)。

### 推荐的系统规格

《城市示例》是一个包含大量图形的项目，需要强大的显卡和系统才能以稳定帧率运行。推荐将该项目安装在固态硬盘（SSD）上，Nanite和虚拟阴影贴图需要高速存取来实现尽可能最佳的性能。

-   Windows 10，带DirectX 12支持
-   12核CPU，3.4 GHz
-   64 GB的系统RAM
-   GeForce RTX-2080 / AMD Radeon 6000或更高版本
-   至少8 GB的VRAM

此示例项目要求你的计算机有最新显卡驱动程序和DirectX 12。Nanite和虚拟阴影贴图需要DirectX 12。

在较低规格的系统上，你可以调整视口屏幕百分比设置，通过降低关卡编辑器视口的分辨率来获得更好的性能。你可以使用 **屏幕百分比** 滑块在编辑器视口左上角的 **视口选项（Viewport Options）** 中设置。

![在关卡视口中设置屏幕百分比](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea16f28b-ebd5-49df-8312-c251172a4cb2/setting-screen-percentage.png)

## 浏览《城市示例》项目

打开《城市示例》时，你首先看到的是 **启动** 贴图，其中提供了关于使用该示例项目及其推荐系统要求的一些屏幕信息。该项目包含两个贴图：一个大城市和一个小城市。从内容浏览器（Content Browser）的 **内容（Content）> 贴图（Map）** 文件夹中选择其中一个贴图打开。

-   **大城市（Big City）** （Big\_City\_LLV）贴图是为[黑客帝国觉醒](https://www.unrealengine.com/wakeup)技术演示生成的相同贴图。这种贴图非常耗费资源，在低于推荐规格的计算机上可能性能不佳。其大小约为4千米乘4千米。
-   **小城市（Small City）** （Small\_City\_LVL）是使用与较大城市相同的资产和配置生成的较小城市。它旨在展示与较大城市相同的所有渲染、物理系统、人工智能、声效和Gameplay功能。

《城市示例》是使用世界分区和数据层开发和设计世界的一种作品展示。与虚幻引擎4不同的是，这里没有传统上会用于在对象中加载的子关卡。相反，世界分区会按需加载它们，并将场景拆分为单独的可编辑部分。

加载任一城市关卡后，你会发现 **世界分区（World Partition）** 窗口停靠在编辑器视口右侧，并显示世界的简化贴图。

![带世界贴图的世界分区窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7ad5987-5418-404a-a899-5320aca73312/world-partition-window.png)

有一个世界分区工具是 **数据层大纲视图（Data Layers Outliner）** ，其中提供了数据层的列表，这些数据层包含构成场景的对象。数据层大纲视图可以从主菜单中的 **窗口（Window）> 世界分区（World Partition）> 数据层大纲视图（Data Layers Outliner）** 打开。

数据层可以根据需要从该窗口禁用。使用列出的层旁边的 **可视性** （眼睛）图标可阻止该层被渲染，若要完全禁用该层，请使用相应复选框。

![世界分区数据层大纲视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e1aa9b3-4ec3-4a2c-b4f6-337faf226f1a/wp-data-layers-outliner.png)

选择某个数据层时，属性将显示在窗口底部区域。

![显示了属性的世界分区数据层大纲视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1218029-155b-4747-a02d-c84a34ad8915/wp-data-layers-outliner-2.png)

首次打开小城市时，你会注意到，它已准备就绪，所有资产都已加载。但是，打开大城市时，没有加载单元格。你需要使用编辑器中的世界分区（World Partition）窗口才能加载单元格。右键点击任一单元格，或使用鼠标左键点击并拖动以选择多个单元格，再右键点击。然后，选择 **加载所选单元格（Load Selected Cells）** 。

你可以在世界分区（World Partition）窗口中双击任一单元格，以将摄像机移至贴图上的该位置，从而快速浏览贴图。

### 《城市示例》游戏内功能按钮

《城市示例》是一种可操作的体验，玩家可以在城市里随意行走、驾驶和飞行。你可以使用键盘和鼠标或游戏手柄。下面是每种活动方式的功能按钮。

### 行走功能按钮

项目名称

手柄

键盘和鼠标

**向前移动（Move Forward）**

左摇杆

W

**向后移动（Move Backward）**

左摇杆

S

**向左移动（Move Left）**

左摇杆

A

**向右移动（Move Right\*）**

左摇杆

D

**察看（Look）**

右摇杆

鼠标移动

**菜单（Menu）**

开始或选项按钮

O

**启用飞行模式（Enable Flying Mode）**

Y

X

**冲刺（Sprint）**

右肩键

左SHIFT或L-SHIFT

**关闭功能按钮（Dismiss Controls）**

X

Z

#### 驾驶功能按钮

项目名称

手柄

键盘和鼠标

**油门（Throttle）**

右扳机

W

**刹车/倒车（Brake/Reverse）**

左扳机

S

**向左转向（Steer Left）**

左摇杆

A

**向右转向（Steer Right\*）**

左摇杆

D

**察看（Look）**

右摇杆

鼠标移动

**手刹（Handbrake）**

B

空格键

**上车/下车（Enter/Exist Vehicle）**

A

C

**菜单（Menu）**

开始或选项菜单

O

**关闭功能按钮（Dismiss Controls）**

X

Z

#### 飞行功能按钮

项目名称

手柄

键盘和鼠标

**向前移动（Move Forward）**

左摇杆

W

**向后移动（Move Backward）**

左摇杆

S

**向左移动（Move Left）**

左摇杆

A

**向右移动（Move Right\*）**

左摇杆

D

**察看（Look）**

右摇杆

鼠标移动

**更高海拔（上升）（Altitude Up (Ascend)）**

右扳机

E

**更低海拔（下降）（Altitude Down (Descend)）**

左扳机

Q

**加速（Speed Up）**

右肩键

F

**减速（Speed Down）**

左肩键

R

**菜单（Menu）**

开始或选项按钮

O

**启用行走模式（Enable Walking Mode）**

Y

X

**关闭功能按钮（Dismiss Controls）**

X

Z

#### 菜单导航功能按钮

项目名称

手柄

键盘和鼠标

**菜单导航（Menu Navigation）**

左右肩键

\[和\]

**菜单项向上导航（Menu Item Navigation Up）**

十字方向键向上

上箭头

**菜单项向下导航（Menu Item Navigation Down）**

十字方向键向下

下箭头

**调整设置（Adjust Settings）**

十字方向键向左和十字方向键向右

左箭头和右箭头

#### 照片模式功能按钮

项目名称

手柄

键盘和鼠标

**向前移动（Move Forward）**

左摇杆

W

**向后移动（Move Backward）**

左摇杆

S

**向左移动（Move Left）**

左摇杆

A

**向右移动（Move Right\*）**

左摇杆

D

**察看（Look）**

右摇杆

鼠标移动

**更高海拔（上升）（Altitude Up (Ascend)）**

右扳机

E

**更低海拔（下降）（Altitude Down (Descend)）**

左扳机

Q

**重置摄像机（Reset Camera）**

Y

\-

**自动对焦（保留）（Auto Focus (Hold)）**

A

X

**关闭菜单（Close Menu）**

开始或选项按钮

O

**隐藏用户界面（Hide User Interface）**

X

Z

### 《城市示例》游戏内菜单选项

打开游戏内 **菜单（Menu）** 后，屏幕右下角将显示用户界面。它包含一些选项，用于更改光照、人群和交通密度，以及为Nanite等功能启用可视化选项。它还包含专用摄影模式，其中带有常见摄像机功能，如曝光、光圈和景深设置。

你可以使用键盘 **左/右方括号** 键导航菜单，如果你使用手柄，则使用 **左/右肩键** 。你可以使用以下游戏内菜单。

#### 照片模式菜单

**照片模式（Photo Mode）** 菜单包含用于配置曝光、光圈和对焦的摄像机和聚焦设置。

![游戏内照片模式菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc6c78dd-343a-4b62-bf4c-34c4e92803a3/menu-photo-mode.png)

菜单设置

说明

摄像机

 

**曝光补偿（Exposure Compensation）**

将所渲染帧的曝光调整为更亮或更暗。

**光圈（Aperture）**

更改摄像机镜头的开口大小。F值越低，进入镜头开口的光线就越多，从而提高对焦以创建景深。

**焦距（Focal Length）**

设置摄像机使用的视角。焦距越大，场景中所捕获的内容就越少，但会进一步放大对象，并增加景深。焦距越小，场景中所捕获的内容就越多，但会减小发生的景深数量。

摄像机

 

**对焦距离（Focus Distance）**

设置镜头可以对焦图像的最短距离。

#### 世界设置菜单

**世界设置（World Settings）** 菜单包含各种设置，用于影响光照，人群、交通和停放载具的密度，以及各种可视化选项。

![游戏内世界设置菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68f3b84f-6a31-4cad-acc5-33f2445337f9/menu-world-settings.png)

菜单设置

说明

模拟

 

**夜间模式（Night Mode）**

在白天和夜间光照之间切换。

**太阳旋转（Sun Rotation）**

设置太阳旋转的角度，以度数为单位。

密度

 

**人群（Crowd）**

设置城市街道上的人群密度。

**交通（Traffic）**

设置城市街道上的交通密度。

**停放车辆（Parked Cars）**

设置城市街边的车辆停放密度。

可视化

 

**人群和交通（Crowd & Traffic）**

切换可视化模式来替换停放车辆（蓝色）、行驶中的车辆（绿色）和人群中的个人（白色）。

**后期处理滤镜（Post-processing Filter）**

切换后期处理滤镜，与《黑客帝国：觉醒》技术演示中所使用的类似。

**Nanite视图（Nanite View）**

在Nanite的不同可视化模式之间切换。

-   **默认（Default）** 是游戏视图。
-   **图元（Primitives）** 是为其启用了Nanite的数量。
-   **实例（Instances）** 为场景中静态网格体的每个单独实例应用不同的颜色。
-   **群集（Clusters）** 显示当前场景视图中所渲染的所有三角形分组的彩色表示。
-   **三角形（Triangles）** 显示构成场景的Nanite网格体的所有三角形。
-   **材质ID（Material ID）** 为Nanite图元的每种材质应用单独的颜色。

#### 手柄设置菜单

**手柄设置（Controller Settings）** 菜单将显示行走、驾驶、无人机和照片模式的手柄按钮映射。该菜单还包含摄像机控制的察看灵敏度和反转垂直轴设置。

![游戏内手柄设置菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e378d935-bdc4-49ba-95d2-7e82a68cd546/menu-controller-settings.png)

菜单设置

说明

摄像机控制

 

**触觉反馈（Haptic Feedback）**

在播放时切换触觉反馈振动。

**反转垂直轴（Invert Vertical Axis）**

反转移动的垂直轴。

**察看灵敏度（Look Sensitivity）**

调整在环顾四周时应用于摄像机移动的灵敏度比例。

更改这些设置还会影响键盘和鼠标。

## 高端视觉效果

《城市示例》演示了虚幻引擎5在构建大型开放世界方面的高端视觉效果。

《城市示例》需要DirectX 12来实现高端视觉效果。在不满足该项目[推荐的系统规格](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E6%8E%A8%E8%8D%90%E7%9A%84%E7%B3%BB%E7%BB%9F%E8%A7%84%E6%A0%BC)的系统中，一些功能运行起来受到限制，或者完全无法运行。

### Lumen全局光照和反射

Lumen用于在整个城市中提供动态全局光照和反射。Lumen为许多区域被间接照亮的场景提供动态、逼真的光照。它会适应直接光照和几何体中的变化，结合新旧技术，在实时预算内实现高质量的结果。

Lumen围绕次世代主机和高端PC构建。

![Lumen全局光照和反射：已启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d37a03e-0928-409f-8eec-b3d1feef49ce/lumen-enabled.jpg)

![Lumen全局光照和反射：已禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db30a03b-da86-4fab-9fd4-d44e7168f59e/lumen-disabled.jpg)

Lumen全局光照和反射：已启用

Lumen全局光照和反射：已禁用

《城市示例》使用[硬件光线追踪](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E7%A1%AC%E4%BB%B6%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA)，它支持更大范围的几何体类型，例如蒙皮网格体。硬件光线追踪还能更好地扩展到更高的质量，因为它与几何体的实际三角形相交，还可以选择在光线接触时评估光照，而不是低质量的表面缓存。

对于使用Nanite的静态网格体，硬件光线追踪只能在退却网格体上运行，而退却网格体是根据Nanite的静态静态网格体编辑器中的 **退却三角形百分比（Proxy Triangle Percent）** 生成的。屏幕追踪用于掩盖Nanite渲染的完整三角形网格体和Lumen要执行光线追踪的退却网格体之间的不一致。

Lumen能够处理所有可移动的光源，包括作为光源的自发光材质。天空光照使用Lumen的最终采集（Final Gather）来处理天空阴影，让室内区域比室外区域明显暗得多，这有助于突显能够反射更多光线的浅色表面。《城市示例》仅由定向光源、天空光照和表面的自发光材质照亮。

![Lumen全局光照和反射 | 白天光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d40d43ae-4530-44b1-9833-0c9541b66ca8/lumen-day.png)

![Lumen全局光照和反射 | 夜间光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2e214ab-5f64-408c-8b26-e2cdbf897a2a/lumen-night.png)

Lumen全局光照和反射 | 白天光照

Lumen全局光照和反射 | 夜间光照

当你在游戏内探索城市时，使用菜单可访问 **世界设置（World Settings）** ，你可以在其中调整 **太阳旋转（Sun Rotation）** 。在编辑器中工作时，你可以使用键盘快捷键 **右Ctrl + L** ，并拖动鼠标来四处移动定向光源。

如需详细了解其工作原理，请参阅[Lumen全局光照和反射](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)以及[Lumen技术细节](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine)。

### Nanite虚拟化几何体

Nanite虚拟化几何体用于《城市示例》中的所有静态网格体，这些网格体都不使用传统的[细节级别](/documentation/zh-cn/unreal-engine/creating-levels-of-detail-in-blueprints-and-python-in-unreal-engine)。Nanite可智能地仅处理可以感知到的细节，从而渲染像素级别的细节以及海量对象。它处理几何体的方式与[虚拟纹理](/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine)处理纹理细节的方式相同。

Nanite的内部网格体格式和渲染技术意味着，随着你在世界中移动，其表示也会动态变化，从而动态更新细节级别并剔除屏幕上未渲染的部分。更靠近玩家摄像机的对象会获得更多细节，而更远的对象则获得更少的细节，同时保持均匀的屏幕细节。

![Nanite的质量的例子](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f26b26f-d8a4-4d65-8b67-fa7d0349c0f4/nanite-examples.png)

《城市示例》由数十亿个多边形组成，这些多边形源自遍布于整个世界的上万个对象。你可以通过Nanite实时使用电影级品质的资产，除了在静态网格体上启用Nanite之外，几乎或完全不需要进行其他设置。你甚至可以直接在游戏中放入Zbrush中的高模雕刻模型。

使用Nanite提供的任一可视化模式，可查看它是如何渲染场景的。你可以使用 **Nanite可视化（Nanite Visualization）** 卷展菜单下的 **视图模式（View Modes）** 菜单，从可视化列表中选择。

![Nanite可视化模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e3917f5-a260-4686-96d0-d5f13b2dbb5a/nanite-vis-modes.png)

Nanite的概述可视化模式。

如需详细了解如何为你自己的项目使用和配置Nanite，请参阅[Nanite虚拟化几何体](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)文档。

### 时间超级分辨率

大型开放世界可能包含几千个到几百万个实例，所含多边形总数达几十亿个，所需的几何细节和保真度也非常高，因而为次世代主机和高端PC开发游戏的需求也相应增加了。这种保真度级别可能意味着，游戏在以原生4K分辨率渲染一个帧之前就可能耗用大量性能预算。

**时间超级分辨率（Temporal Super Resolution）** （TSR）是一种抗锯齿方法，旨在满足人口稠密的大型世界的保真度需求。它使用与平台无关的时间上采样算法，获取较低的输入分辨率，并输出质量接近4K分辨率的渲染帧。这意味着，你可以在不渲染原生4K的情况下提高性能，但仍能通过较低渲染分辨率实现媲美4K的质量。

在下面的比较中，你可以看到以原生4K渲染的捕获帧与以1080p渲染并已向上延展到4K的捕获帧之间的质量和性能差异。在《城市示例》的这个镜头中，你可以利用时间超级分辨率实现接近原生4K分辨率的图像质量，同时将GPU帧时缩短接近一半。

![以原生4K分辨率渲染的4K帧 | 帧时：57.50 毫秒  ](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85c548a9-d0ab-4580-88d1-52db0036e32b/tsr-native-4k.png)

![以1080p分辨率渲染的4K帧 (r.ScreenPercentage=50) | 帧时：33.37 毫秒](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ada52669-df94-41af-aac1-c04e597e186d/tsr-4k-upscale.png)

以原生4K分辨率渲染的4K帧 | 帧时：57.50 毫秒

以1080p分辨率渲染的4K帧 (r.ScreenPercentage=50) | 帧时：33.37 毫秒

你可以右键点击并以全分辨率保存比较滑块中的每个图像，检查质量相似度。

### 虚拟阴影贴图

**虚拟阴影贴图（Virtual Shadow Maps）**（VSM）是虚幻引擎5的新阴影映射方法，用于提供一致的高分辨率投影来处理使用Nanite、Lumen和世界分区功能的电影级品质的资产和动态照亮的大型开放世界。

传统动态投影技术常常仅限于中小规模的世界，迫使设计师和美术师牺牲质量来提高性能。相比之下，虚拟阴影贴图提供了单个统一投影方法，自动为最需要的地方提供品质保证。现在，阴影对于更远距离的大大小小的对象都能有一致的质量，带有逼真的软半影和接触硬化。

在下面的比较中，俯视城市风景，你可以看到虚拟阴影相对于级联阴影贴图的质量和一致性差异。对于虚拟阴影贴图，整个城市的细节从大到小都以一致的方式投影。对于建筑的较小部分，如尖顶和屋顶设备，将捕获到精细细节，甚至远处地面上的车辆和较大对象也有阴影。

相比之下，在使用级联阴影贴图时，你必须决定需要在场景中的什么地方具备这种细节。阴影贴图不太适合大面积的高质量细节，这样会带来显著的性能成本。注意，远处的阴影不太清晰，地面上的投影看起来只是给全体投影，而不是给单个对象投影。

![虚拟阴影贴图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6639d265-07f6-4677-9444-085049be9fd7/shadow-vsm.png)

![级联阴影贴图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/823f77d5-ba98-433f-85ca-390d1a697b7a/shadow-csm.png)

虚拟阴影贴图

级联阴影贴图

请参阅[虚拟阴影贴图](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine)文档，详细了解如何为你自己的项目使用和配置这种贴图。

### 局部曝光后期处理

**局部曝光** 是为虚幻引擎5开发的一种新技术，它会在美术师控制的参数范围内自动应用局部曝光调整，以在现有全局曝光系统基础上保留高亮和阴影细节。场景中经常有使用了动态光照的棘手高动态范围，在其中应用单项全局曝光调整并不足以避免喷发的高亮和全暗的阴影。

在带有动态昼夜变换系统的游戏中，或是《城市示例》这种可以动态改变光照的游戏中，场景很容易在渲染图像的一些部分曝光不足或过度曝光。以下面的场景为例，太阳照射的区域非常明亮，而桥下的区域在不使用局部曝光调整的情况下则极为阴暗。在无法为每个场景精心制作光照的情况下，比如在《城市示例》中，玩家可以随意浏览环境，此时使用局部曝光有助于实现更一致的结果。

![使用局部曝光进行后期处理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05ee3afd-03c5-4dd0-8765-d2451c7325ac/ppv-local-exposure.png)

![仅使用曝光进行后期处理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15225b5d-281e-4728-969b-68fb7a0c07e7/ppv-exposure-only.png)

使用局部曝光进行后期处理

仅使用曝光进行后期处理

## 程序化生成和填充的城市

《城市示例》项目中的城市通过程序化生成操作来设计和创建，其中大量使用SideFX的Houdini软件来构建城市的所有方面，从城市岛屿的形状到道路和公路、建筑、人行道、街道设施等，应有尽有。城市的"生成"仅在Houdini内使用用户提供的自定义工具和输入来执行。

结果将产生巨大的点云，点云将从Houdini导出，然后导入虚幻引擎5中，其中专为该项目开发的虚幻引擎工具 **规则处理器（Rule Processor）** 会将点云转换为成千上万个实例。

Epic Games开发《黑客帝国觉醒》时，我们已经知道该项目会是一个开放世界城市，需要丰富的细节，规模非常庞大。 该项目使用了虚幻引擎5的许多新功能，在开发时，我们已经知道其他许多部门会创建内容，他们需要能够一起同时工作。环境团队的规模相对较小，而项目所需处理的细节数量庞大，这意味着两件事：Nanite要消除一贯的多边形预算限制，并且需要可以在世界中成千上万次实例化的模块化资产。

Houdini用于处理所有前期工作，包括生成城市形状、道路网络，连接高速公路系统，构建位置等，并且它提供了海量的元数据，可在虚幻引擎5中用于程序化生成最终城市。设计师可以使用Houdini中的这些工具在短时间内生成无限数量的不同城市。

生成的城市数据包含各种各样的元数据，可供虚幻引擎5中的其他工具使用，包括驱动交通和人群模拟的人工智能系统。建筑通过体积构造。建筑生成器使用形状语法语言来设计建筑体积的样式。每种不同的建筑样式都有一组不同的规则。给定体积还可以分割成两种不同的样式：一种用于建筑的底部，一种用于剩余顶部。

《城市示例》项目包含使用Houdini和Houdini Engine来程序化生成你自己的城市所需的源文件。你将需要SideFX的许可证，才能将引擎中的城市建筑生成器资产用于Houdini。Houdini源文件位于CitySample根文件夹中，名为 `CitySample_HoudiniFiles.zip`。

《城市示例》使用以下版本开发：

-   Houdini：18.5.532
-   Houdini Engine：3.5.2

我们将在不久的将来推出引导式指南，讲解如何使用这些文件自行生成附带了道路和高速公路网络的城市。

Houdini使用自上而下流动的节点图表。每个节点都是一个程序，用于对其输入执行任务，并输出结果以传递到其他节点，就像虚幻引擎中的材质图表一样。主城市分阶段构建，结构如下：

1.  城市布局
2.  道路
3.  高速公路
4.  停车场和人行道
5.  交通、建筑和地面
6.  街道设施、贴花和音频

各个部分按依赖性顺序构建，即高速公路依赖于道路网络，而建筑位置要求先构建高速公路以避免将建筑放在高速公路上。

为了构建城市并支持构成世界的所有程序化生成的实例，需要尽量多使用Nanite。这意味着你可以构建一个巨型网格体，并且需要到用实例。城市中的每个建筑由成百上千个实例构成，并且街道上的所有道具，如设施、贴花甚至是垃圾，都使用Nanite。城市中极少使用自定义几何体，这可确保项目的内存用量保持在设定的预算之内。

但是，有时难免会需要一定程度的自定义几何体。自定义网格体用于碰撞、高速公路地面、道路贴花以及非矩形建筑的自定义屋顶。

## 协同构建大型世界

利用虚幻引擎5，你可以在项目中更轻松地协同工作，以管理和编辑资产和场景。

### 一个Actor一个文件

《城市示例》中的整个世界使用 **一个Actor一个文件**（OFPA）系统。它为放在关卡中的Actor的每个唯一实例编写单独的文件，而不是将其数据写入单个贴图文件。

对于在关卡编辑器中工作的开发人员，工作流程没有什么变化。你仍可以打开单个贴图文件并做出更改来编辑关卡。但是，对于使用版本控制系统协同工作的开发人员，现在底层系统会将每个Actor作为单独的文件来跟踪，这意味着设计师和美术师可以编辑相同关卡的不同对象和图层，而且在提交更改时不会遇到冲突。

如需详细了解如何在你自己的项目中设置和使用该功能，请参阅[一个Actor一个文件](/documentation/zh-cn/unreal-engine/one-file-per-actor-in-unreal-engine)。

### 世界分区

围绕大型开放世界开放游戏需要将地图划分为许多较小的分段，以便在遍历地图的过程中相应加载和卸载。一次性加载横跨几千米的整个区域并在其中填充对象并不总是可行。在以往的开发工具中，开发人需要手动将关卡划分成子关卡，并细心管理关卡的加载和卸载机制。在上下文中查看世界的不同分段往往很难实现。

**世界分区** 系统解决了这个问题并简化了过程，因为它会根据关卡中对象的网格位置自动将这些对象划分为单元格。这些单元格将管理其中的内容，并随着对象的添加和删除而相应调整，这样你永远不需要手动管理资产。在Gameplay期间，世界分区会随着你在世界中移动而自动加载和卸载单元格。

![在大城市关卡中加载了一些单元的世界分区](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1314ca5d-e022-4842-9561-403b17ce3884/wp-big-city-loaded-cells.png)

使用世界分区加载了大城市一部分的关卡编辑器。

如需详细了解如何在你自己的开放世界项目中设置和使用该系统，请参阅[世界分区](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)。

### 数据层

世界分区系统会将关卡划分为可以随意加载和卸载的单元格，而 **数据层** 则是世界分区中的一种系统，用于将对象整理为可根据需要加载和卸载的层。数据层取代了虚幻引擎4中的旧版层系统，后者需要对要管理的内容进行大量手动整理。

《城市示例》将数据层整理为了世界中的不同对象集，例如程序化对象、屋顶道具、高速公路，等等。数据层大纲视图包含所有层的列表，这些层包含场景中的对象。你可以在其中使用这些层添加、删除或设置对象的可视性。

![世界分区数据层大纲视图窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55bae34c-c4b8-4c41-b387-d745815db98a/wp-data-layers-outliner-3.png)

如需详细了解如何设置和使用层来整理场景中的对象，请参阅[世界分区 - 数据层](/documentation/zh-cn/unreal-engine/world-partition---data-layers-in-unreal-engine)。

## 模拟现实世界系统

### MetaHuman

《城市示例》中填充了成千上万个唯一数字人类角色，这些角色是根据MetaHuman和配饰的子集修改而来的。**MetaHuman** 角色使用[MetaHuman Creator](https://www.unrealengine.com/metahuman-creator)生成。你可以利用MetaHuman Creator生成质量一致的大量多元化且唯一的逼真角色。

![MetaHuman不可操作角色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88164596-bf32-4bad-8258-f200e99c5444/city-sample-crowd.png)

《城市示例》和《黑客帝国觉醒》中使用的生成的MetaHuman角色人群。

你可以利用MetaHuman Creator设计和开发电影级品质的角色，这些角色可用于可操作角色和不可操作角色（NPC）。例如，你可以在下面的图像中看到，背景NPC的质量与可操作英雄角色IO是一致的。

![MetaHuman英雄和不可操作角色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51adf911-13eb-44a9-b8a8-f2753cb5d3fb/mh-characters.png)

（从左到右）《城市示例》可操作英雄角色IO、男性角色和女性角色。

MetaHuman角色带有完整装备，随时可以开始动画。这些角色还包含其自己的细节级别，可平衡质量与性能，从而可以在城市中填充电影级品质的动画角色。

![MetaHuman人群模拟](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c258d001-9aa1-46e0-8cde-69393ca96298/mh-crowd-simulation.png)

有许多唯一的高质量角色的城市街道十字路口。

在游戏内使用无人机模式时，你可以看到成百上千个人群角色。离得最近的角色是装备完整的动画MetaHuman角色，更远处的角色是根据MetaHuman自定义生成的顶点动画静态网格体。

![MetaHuman城市街道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2354a9e9-fb6d-4086-880e-56065931ba50/mh-city-street.png)

使用Mass AI人群系统填充有MetaHuman角色的《城市示例》人行道。

要开始创建你自己的电影级品质数字人类，请立即开始使用[MetaHuman Creator](https://www.unrealengine.com/metahuman-creator)。如需详细了解MetaHuman Creator以及如何在你自己的虚幻引擎5项目中使用MetaHuman，请参阅[MetaHuman文档](https://docs.metahuman.unrealengine.com/)。

### 人工智能系统

虚幻引擎5的 **人工智能（Artificial Intelligence）** 功能可以让城市和周围的世界更逼真。这些功能有许多是引擎中的新功能，目前被视为试验性的功能。你可以深入探究《城市示例》并探索这些功能如何用于该项目。

如需详细了解为虚幻引擎5开发并用于《城市示例》的这些功能，请参阅[人工智能](/documentation/zh-cn/unreal-engine/artificial-intelligence-in-unreal-engine)文档。

#### MassEntity

**MassEntity** 为面向数据的计算提供了一种框架，这种计算可以用于性能很关键的地方，包括在场景中模拟成千上万个AI艾真体，但并不仅限于AI领域。它还可确保世界中的实体持久存在。该系统同时用于《城市示例》中的交通和人群系统。

**批量生成器（Mass Spawner）** 是将批量实体引入世界的进入点。批量生成器规定了两个事项：生成哪种类型的实体，以及在哪个位置生成。《城市示例》使用了多个生成器，人群、十字路口、交通和停放的载具分别对应一个生成器。

当你选择放入关卡中的某个批量生成器Actor时，**细节（Details）** 面板将包含关于如何使用实体的信息。**实体类型（Entity Type）** (1) 指定生成哪种类型的实体，而 **生成数据生成器（Spawn Data Generators）** (2) 指定在世界中哪个位置生成。

![批量人群生成器蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bcf3d23-b186-4134-a350-5497289622ed/bp-mass-crowd-spawner.png)

指定应该由批量生成器生成的内容时，你应该创建称为 **批量实体定义（Mass Entity Definition）** 的新资产类型。它规定了所生成实体的特征，例如视觉效果、细节级别、行为，等等。

批量生成器使用新的 **批量实体定义（Mass Entity Definition）** 数据资产类型来指定应该生成的内容。该数据资产规定了所生成实体的 **特征（Traits）** ，例如其行为、视觉效果、细节级别，等等。

![批量实体定义资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c1b71e6-03f0-4338-ba91-f2838f12691c/mass-entity-definition-asset.png)

决定在何处生成实体时，系统将采用沿Houdini中程序化数据提供的ZoneGraph（参阅下一小节）进行分布的方案，用于沿该ZoneGraph创建生成点，以供人群和交通系统使用。

![用于生成人群和交通实体的所创建数据](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e39896c0-5721-4d0b-8ab4-7621cb6ddf2d/crowd-traffic-entities.png)

用于选择在城市中何处生成人群和交通实体的所创建数据。

对于使用了生成器的停放载具，将根据程序化数据沿城市街道创建位置的点云。

![用于生成的停放载具的点云位置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddb5c0dd-ba45-4320-a42f-4f043b131369/point-cloud-parked-vehicles.png)

用于所生成停放载具的沿城市街道的点云位置。

批量生成器支持世界中实体的许多分布可能性。下方例子直观地展示了整个世界中生成的交通和人群系统。绿色表示行驶中的载具，蓝色表示停放的载具，白色表示人群。

![用于人群和交通系统的批量生成器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f358ff0-1aa5-4793-acd8-684c8746cc19/mass-spawner.gif)

访问虚幻引擎5文档中的[批量实体](/documentation/zh-cn/unreal-engine/mass-entity-in-unreal-engine)，详细了解该功能。

#### ZoneGraph

**ZoneGraph** 是用于AI的轻量级设计驱动型流程，遵循逐点走廊结构。它可以存储有意义的标签（静态和动态），可以针对AI行为利用这些标签。

![区域图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d696e71-8775-4c88-8a0f-81e369e42ad1/zone-graph.png)

**区域形状（Zone Shape）** 组件可以从 **放置Actor（Place Actors）** 面板添加到世界中。请查看大城市关卡的世界大纲视图，并查找 **区域形状（Zone Shapes）** 文件夹以查看其使用情况。

#### StateTree

**StateTree** 是一种新的通用状态机，带有直观的用户界面，以决策树结构显示。StateTree规定了人群的行为。这些StateTree资产直接在人群的批量实体定义数据资产中链接。

![State Tree示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e938aea3-b864-4d7b-8a4f-8d821132cef3/state-tree.png)

你会发现人群的批量实体定义数据资产中指定了这些StateTree资产。交通系统不在StateTree行为上运行。例如，查看 `Content/AI` 文件夹中名为 **CrowdStateTree** 的数据资产。

访问虚幻引擎5文档中的[StateTree](/documentation/zh-cn/unreal-engine/state-tree-in-unreal-engine)，详细了解该功能。

#### 智能对象

**智能对象** 是放入关卡中供AI艾真体和玩家与之交互的Actor的集合。该系统可配置，并为你的场景增加一层前所未有的可交互性。

这些并未作为开发的城市的一部分发布，但你可以在示例项目中随附的 **MassCrowd** 测试贴图中自行探索。

访问虚幻引擎5文档中的[智能对象](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine)，详细了解该功能。

## Chaos载具

《城市示例》中的载具由 **Chaos载具系统** 驱动。你可以利用这一基于物理的系统为不同样式的Gameplay设置和配置载具，例如街机赛车或具有更逼真操作方式的游戏。

![Chaos载具物理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24995318-bae0-4b04-8722-a39d2cd7c0d9/chaos-vehicles.gif)

《城市示例》还允许你驾驶各种四轮载具，每种载具有其自己的物理配置进行操作。

![载具选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc8530cf-7a44-4559-8cc6-4a65e47779a0/csv-featured.png)

Chaos载具系统还支持强大的变形系统，使用Control Rig为每个载具创建唯一的变形。

![Chaos载具物理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fe1d10b-e441-4403-9d60-00ef84fe42c8/chaos-vehicle-physics.gif)

如需详细了解如何在虚幻引擎5中设置和使用载具，请参阅[Chaos载具](/documentation/zh-cn/unreal-engine/vehicles-in-unreal-engine)。

### 调整载具处理

每个载具蓝图包含一个 **载具移动组件（Vehicle Movement Component）** ，它定义了载具的物理和机械属性，包括其引擎扭矩、传输、传动装置、质量和质心。载具移动组件还针对前轮和后轮有一个纯数据的 **车轮蓝图（Wheel Blueprints）** 数组。车轮蓝图通过轮胎摩擦、悬架、刹车扭矩等设置控制了载具的许多操作和刹车属性。

每个载具的载具数据蓝图位于 `Content/Vehicles/[Vehicle_Name]` 文件夹中。例如，`Content/Vehicle/vehCar_vehicle02` 。

可驾驶载具蓝图的名称以"\_Sandbox"结尾，例如 `BP_vehCar_vehicle02_Sandbox` 。这些汽车可以放入关卡中，并且可驾驶。

### 动态载具变形

《城市示例》中的载具将[Control Rig](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)用于Chaos载具系统，以将唯一变形应用于每个载具。这意味着，每次撞车通过利用载具的驾驶动力学来动态实现。碰撞使用载具主体周围放置的几个物理形体来检测，而约束塑性使物理约束能够在通过指定阈值之后持久变形。

载具Control Rig包含沿单个轴锁定的可移动约束。随着它们沿该轴移动，它们会将车身的一部分变形。在《城市示例》中，单个Control Rig用于所有可驾驶载具，以应用动态变形。它名为 **CR\_Frame\_Destructible**，并位于内容浏览器（Content Browser）的 `Content/Vehicle/Animation` 文件夹中。

由于单个Control Rig用于所有载具，你将需要使用 **预览网格体（Preview Mesh）** 指定插槽来切换不同的可驾驶载具，以预览其变形。

![带有变形Control Rig的不同载具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28d02cb7-7be4-482e-bfda-a662c611a692/vehicle-cr-preview-mesh.png)

不同的可驾驶载具的变形Control Rig。

## 程序化音效和Metasound

除了提供各类视觉效果、游戏机制和创建开放世界的工具外，虚幻引擎5还提供了 **Metasound** ，能让你可以更好地控制游戏音效。

音效设计师可以利用MetaSound访问功能齐全的 **数字信号处理（Digital Signal Processing）** （DSP）图表，并实现"准确到采样级别"的音频调制和事件控制，无论你在播放预先设计的音频还是实时合成，而这一切都由强大的接口驱动，以对来自代码和蓝图的游戏数据做出反应。

Metasound为设计师配备了强大的高效制作工具，例如 **预设（Preset）** 和 **复合（Composition）** 系统，让设计师能够定义和复用其Metasound图表。它还支持设计师构建强大的自定义Metasound节点库，可以简化工作流程，同时使Metasound更容易跨团队访问。

除了开发的Metasound系统之外，《城市示例》还包含了试验性设计、工具和系统，利用音频让程序化创建的世界更逼真。

访问虚幻引擎5文档中的[MetaSound](/documentation/zh-cn/unreal-engine/metasounds-in-unreal-engine)，详细了解该系统。

### 载具音效

#### 可驾驶载具

《城市示例》中的可驾驶载具利用了称为 **MotoSynth** 的试验性工具。它是一种精细的引擎模拟工具，利用车辆加速和减速的录制文件，精细地实时重新合成加速和减速移动。此外，可驾驶载具将Metasound用于各种装饰性引擎音效，包括空循环、漂移噪音和转速过高的音效。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b33ca294-1176-4fa1-9377-1bb4bf36dafe/stereo-mixer-graph.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee6f879e-639c-4837-a114-942965e3eaf3/moto-synth.png)

载具音效的立体声混音

MotoSynth功能按钮

#### NPC载具

不可操作角色（简称NPC）载具完全由Metasound驱动。它们围绕种子随机化来利用程序化音效生成功能。程序化随机混合的传统弯音引擎循环、合成过滤噪音和合成副音会根据NPC载具的速度动态调制。

![不可操作角色载具MetaSound图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43218b07-e510-4d3f-8e3d-6066342d1454/npc-vehicle-metasounds-graph.png)

### 音乐重新设计

Metasound是一种功能强大的设计环境，允许设计师对现有音效和音乐材料制作工具模型和复用。《城市示例》包含两种再混音变体，复用了为演示而创建的原始音乐符干，从而创建音乐的崭新变体，包括让人联想到夜店音乐的夜晚模式变体。

![MetaSound图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e19ce17c-bc8a-44f6-ac05-e8541b6e3b13/metasounds-graph.png)

### 城市音景和程序化音效生成

#### 世界音效数据系统和使用Houdini

**世界音效数据（World Audio Data）** 系统是一套以程序化数据传播和设计为中心的试验性工具和功能。它包含一个自定义 **处理器规则（Processor Rule）** ，用于转换Houdini点云元数据，并将其烘焙为 **音景色点空间哈希图（Soundscape ColorPoint Spatial Hashmap）** ，然后将缓存的哈希图数据分发到各个Actor，这些Actor设计为使用散布在16平方公里大城市中的世界分区流送进来和流送出去。

这些世界音效数据Actor包含 **色点（Colorpoint）** 缓存，并利用世界分区流送来维持较低的内存占用量。

![世界音效数据系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66eb1cfd-99cb-4722-8c23-0ae94a022d87/world-audio-data-system.png)

#### 音景设计

城市中的大部分背景音效由 **音景（Soundscape）** 控制，这是一种基于状态的试验性程序化背景音效系统。音景允许设计师为 **监听器** 周围的音效定义生成行为，包括基于色点元数据的有条件生成行为。《城市示例》中生成的大部分音效取决于通过世界音效数据系统缓存并动态加载的色点数据。这样一来，设计师可以根据空间元数据指定允许生成哪些类型的音效，例如高速公路周围的背景高速公路音效、大型街道上的背景交通噪音，等等。

除了色点数据之外，音景还会侦听通过Mass AI处理器馈送到音景的动态色点数据，以跟踪闲置MetaHuman和NPC载具的位置。位置用于背景喇叭声、MetaHuman喊叫声和其他发声。音景对于让城市音效活灵活现起着关键的作用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69d1ee73-9579-4791-a274-3bcbd965f82d/soundscape-ambient-sounds.png)![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62dc1950-e606-428f-a72d-297484488a90/soundscape-ambient-sounds-1.png)

## 创建你自己的程序化城市指南

城市示例项目提供了使用Houdini和虚幻引擎5自行生成程序化城市所需的所有源文件。

在第一篇指南中，你将使用Houdini设置并生成程序化数据。你可以用这些数据自行创建城市，包括道路网络、高速公路系统、建筑区等等。而在第二篇指南中，你将使用从Houdini中导出的数据和虚幻引擎工具及功能，填充并构建你的城市。

[](/documentation/zh-cn/unreal-engine/city-sample-quick-start-for-generating-a-city-and-freeway-using-houdini)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e882b20-a2b3-42dc-8135-6c30208ed475/city-05-topic.png)](/documentation/zh-cn/unreal-engine/city-sample-quick-start-for-generating-a-city-and-freeway-using-houdini)

[

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/353635b9-966d-48c6-a3ca-3086851fb8e8/city-05-topic.png)

](/documentation/zh-cn/unreal-engine/city-sample-quick-start-for-generating-a-city-and-freeway-in-unreal-engine-5)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [global illumination](https://dev.epicgames.com/community/search?query=global%20illumination)
-   [artificial intelligence](https://dev.epicgames.com/community/search?query=artificial%20intelligence)
-   [metasounds](https://dev.epicgames.com/community/search?query=metasounds)
-   [vehicle physics](https://dev.epicgames.com/community/search?query=vehicle%20physics)
-   [procedural generation](https://dev.epicgames.com/community/search?query=procedural%20generation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问《城市示例》项目](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E8%AE%BF%E9%97%AE%E3%80%8A%E5%9F%8E%E5%B8%82%E7%A4%BA%E4%BE%8B%E3%80%8B%E9%A1%B9%E7%9B%AE)
-   [推荐的系统规格](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E6%8E%A8%E8%8D%90%E7%9A%84%E7%B3%BB%E7%BB%9F%E8%A7%84%E6%A0%BC)
-   [浏览《城市示例》项目](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E6%B5%8F%E8%A7%88%E3%80%8A%E5%9F%8E%E5%B8%82%E7%A4%BA%E4%BE%8B%E3%80%8B%E9%A1%B9%E7%9B%AE)
-   [《城市示例》游戏内功能按钮](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E3%80%8A%E5%9F%8E%E5%B8%82%E7%A4%BA%E4%BE%8B%E3%80%8B%E6%B8%B8%E6%88%8F%E5%86%85%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [行走功能按钮](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E8%A1%8C%E8%B5%B0%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [驾驶功能按钮](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E9%A9%BE%E9%A9%B6%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [飞行功能按钮](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E9%A3%9E%E8%A1%8C%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [菜单导航功能按钮](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E8%8F%9C%E5%8D%95%E5%AF%BC%E8%88%AA%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [照片模式功能按钮](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E7%85%A7%E7%89%87%E6%A8%A1%E5%BC%8F%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [《城市示例》游戏内菜单选项](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E3%80%8A%E5%9F%8E%E5%B8%82%E7%A4%BA%E4%BE%8B%E3%80%8B%E6%B8%B8%E6%88%8F%E5%86%85%E8%8F%9C%E5%8D%95%E9%80%89%E9%A1%B9)
-   [照片模式菜单](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E7%85%A7%E7%89%87%E6%A8%A1%E5%BC%8F%E8%8F%9C%E5%8D%95)
-   [世界设置菜单](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E4%B8%96%E7%95%8C%E8%AE%BE%E7%BD%AE%E8%8F%9C%E5%8D%95)
-   [手柄设置菜单](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E6%89%8B%E6%9F%84%E8%AE%BE%E7%BD%AE%E8%8F%9C%E5%8D%95)
-   [高端视觉效果](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E9%AB%98%E7%AB%AF%E8%A7%86%E8%A7%89%E6%95%88%E6%9E%9C)
-   [Lumen全局光照和反射](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#lumen%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7%E5%92%8C%E5%8F%8D%E5%B0%84)
-   [Nanite虚拟化几何体](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#nanite%E8%99%9A%E6%8B%9F%E5%8C%96%E5%87%A0%E4%BD%95%E4%BD%93)
-   [时间超级分辨率](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E6%97%B6%E9%97%B4%E8%B6%85%E7%BA%A7%E5%88%86%E8%BE%A8%E7%8E%87)
-   [虚拟阴影贴图](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E8%99%9A%E6%8B%9F%E9%98%B4%E5%BD%B1%E8%B4%B4%E5%9B%BE)
-   [局部曝光后期处理](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E5%B1%80%E9%83%A8%E6%9B%9D%E5%85%89%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86)
-   [程序化生成和填充的城市](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%94%9F%E6%88%90%E5%92%8C%E5%A1%AB%E5%85%85%E7%9A%84%E5%9F%8E%E5%B8%82)
-   [协同构建大型世界](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E5%8D%8F%E5%90%8C%E6%9E%84%E5%BB%BA%E5%A4%A7%E5%9E%8B%E4%B8%96%E7%95%8C)
-   [一个Actor一个文件](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E4%B8%80%E4%B8%AAactor%E4%B8%80%E4%B8%AA%E6%96%87%E4%BB%B6)
-   [世界分区](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E4%B8%96%E7%95%8C%E5%88%86%E5%8C%BA)
-   [数据层](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E6%95%B0%E6%8D%AE%E5%B1%82)
-   [模拟现实世界系统](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E6%A8%A1%E6%8B%9F%E7%8E%B0%E5%AE%9E%E4%B8%96%E7%95%8C%E7%B3%BB%E7%BB%9F)
-   [MetaHuman](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#metahuman)
-   [人工智能系统](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E7%B3%BB%E7%BB%9F)
-   [MassEntity](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#massentity)
-   [ZoneGraph](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#zonegraph)
-   [StateTree](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#statetree)
-   [智能对象](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1)
-   [Chaos载具](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#chaos%E8%BD%BD%E5%85%B7)
-   [调整载具处理](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E8%B0%83%E6%95%B4%E8%BD%BD%E5%85%B7%E5%A4%84%E7%90%86)
-   [动态载具变形](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E5%8A%A8%E6%80%81%E8%BD%BD%E5%85%B7%E5%8F%98%E5%BD%A2)
-   [程序化音效和Metasound](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E7%A8%8B%E5%BA%8F%E5%8C%96%E9%9F%B3%E6%95%88%E5%92%8Cmetasound)
-   [载具音效](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E8%BD%BD%E5%85%B7%E9%9F%B3%E6%95%88)
-   [可驾驶载具](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E5%8F%AF%E9%A9%BE%E9%A9%B6%E8%BD%BD%E5%85%B7)
-   [NPC载具](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#npc%E8%BD%BD%E5%85%B7)
-   [音乐重新设计](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E9%9F%B3%E4%B9%90%E9%87%8D%E6%96%B0%E8%AE%BE%E8%AE%A1)
-   [城市音景和程序化音效生成](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E5%9F%8E%E5%B8%82%E9%9F%B3%E6%99%AF%E5%92%8C%E7%A8%8B%E5%BA%8F%E5%8C%96%E9%9F%B3%E6%95%88%E7%94%9F%E6%88%90)
-   [世界音效数据系统和使用Houdini](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E4%B8%96%E7%95%8C%E9%9F%B3%E6%95%88%E6%95%B0%E6%8D%AE%E7%B3%BB%E7%BB%9F%E5%92%8C%E4%BD%BF%E7%94%A8houdini)
-   [音景设计](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E9%9F%B3%E6%99%AF%E8%AE%BE%E8%AE%A1)
-   [创建你自己的程序化城市指南](/documentation/zh-cn/unreal-engine/city-sample-project-unreal-engine-demonstration#%E5%88%9B%E5%BB%BA%E4%BD%A0%E8%87%AA%E5%B7%B1%E7%9A%84%E7%A8%8B%E5%BA%8F%E5%8C%96%E5%9F%8E%E5%B8%82%E6%8C%87%E5%8D%97)