# 虚幻引擎中的动画姿势资产 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:06:37.917Z

---

目录

![动画姿势资产](https://dev.epicgames.com/community/api/documentation/image/50adf2c0-7506-4ec9-94fe-d03f5ebd0cb6?resizing_type=fill&width=1920&height=335)

在 **虚幻引擎** 中，动画 **姿势资产** 是存储的[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)姿势，可在项目中作为动画目标或参考点使用。

![内容浏览器中的动画姿势资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/552663cb-1c8a-43fd-b997-a3cb388d9334/contentbowser.png)

姿势资产可保存网格体几何体的位置以及骨架数据。姿势资产可以包含单个静态姿势或许多姿势（作为为资产中的动画曲线保存）。

## 创建姿势资产

有很多方法可创建动画姿势资产。

在[骨架编辑器](/documentation/zh-cn/unreal-engine/skeleton-editor-in-unreal-engine)、[骨骼网格体编辑器](/documentation/zh-cn/unreal-engine/skeletal-mesh-editor-in-unreal-engine)或[动画序列编辑器](/documentation/zh-cn/unreal-engine/animation-sequence-editor-in-unreal-engine)中工作时，你可以使用[动画编辑器](/documentation/zh-cn/unreal-engine/animation-editors-in-unreal-engine) **工具栏** 中的 **创建资产（create asset）** 按钮创建姿势资产，将当前骨骼网格体位置保存为动画姿势资产。

![使用动画编辑器中的“创建资产”按钮创建姿势资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddbece15-e19e-4566-b064-bb308dbcfd20/creatassetbutton.png)

你还可以从整个[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)创建动画姿势资产，方法是 **右键点击** **内容浏览器（Content Browser）** 中的资产并在快捷菜单中选择 **创建（Create）> 创建姿势资产（Create PoseAsset）** 。

![在内容浏览器中右键点击并选择快捷菜单中的“创建姿势资产”来创建姿势资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56d18ebf-8b84-475d-b90f-2fe8cf61b50a/createposeasset.png)

选择 **创建姿势资产（Create PoseAsset）** 后，将打开“创建姿势资产（Create Pose Asset）”窗口，你可以在其中选择想从哪个动画序列创建动画姿势资产。

![选择动画序列以生成姿势资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e662d561-8705-4984-a6c0-ecc57232e57a/poseassetwindow.png)

从整个 **动画序列** 生成姿势资产时，虚幻引擎将为每个动画帧创建姿势。生成的姿势可以通过姿势资产中存在的[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)来访问。

你可以按顺序为生成的姿势曲线输入想要的名称，方法是在 **\[可选\] 姿势名称（\[OPTIONAL\] Pose Names）** 字段中为每个动画曲线或帧输入独占一行的名称。

![在可选姿势名称字段中为姿势曲线命名](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64bf9260-b690-4b6d-aac9-c7694bba37f1/name.png)

### 叠加姿势资产

创建并打开姿势资产后，你可以将姿势资产修改为叠加姿势，方法是启用 **叠加（Additive）** 属性并在姿势资产的 **资产细节面板（Asset Details Panel）** 中选择 **转换为叠加姿势（Convert to Additive Pose）** 按钮。

![姿势资产细节面板中的叠加姿势资产设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/473b3a82-d849-4aac-87bb-88ecf5954f0a/additive.png)

叠加姿势资产能够在叠加功能中与动画序列等其他动画数据一起播放，而不覆盖整个姿势。

## 使用姿势资产

姿势资产可以通过许多方式被用于驱动角色。

### Pose Blender

你可以使用 **Pose Blender** 和 **Pose Driver** 动画蓝图节点来控制动画姿势资产的播放和混合，在运行时驱动角色。

[

![姿势混合器](images/static/document_list/empty_thumbnail.svg)

姿势混合器

如何使用姿势混合器和按名称播放姿势节点播放姿势资产曲线。





](/documentation/zh-cn/unreal-engine/pose-blender-in-unreal-engine)[

![姿势驱动器](images/static/document_list/empty_thumbnail.svg)

姿势驱动器

介绍如何使用姿势驱动器以便根据骨骼运动控制动作资产或曲线值。





](/documentation/zh-cn/unreal-engine/pose-driver-in-unreal-engine)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation assets](https://dev.epicgames.com/community/search?query=animation%20assets)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建姿势资产](/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%A7%BF%E5%8A%BF%E8%B5%84%E4%BA%A7)
-   [叠加姿势资产](/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine#%E5%8F%A0%E5%8A%A0%E5%A7%BF%E5%8A%BF%E8%B5%84%E4%BA%A7)
-   [使用姿势资产](/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%A7%BF%E5%8A%BF%E8%B5%84%E4%BA%A7)
-   [Pose Blender](/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine#poseblender)