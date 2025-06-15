# 虚幻引擎中的工具和编辑器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:51:45.970Z

---

目录

![工具和编辑器](https://dev.epicgames.com/community/api/documentation/image/9c4f40be-60bc-4e30-9689-2d4c9ea9879e?resizing_type=fill&width=1920&height=335)

**虚幻引擎5** 提供了 **工具** 、 **编辑器** 和 **系统** 组合，供你用于创建游戏或应用程序。

本页使用以下术语：

-   **工具** 即你用来执行特定任务的用具，如在关卡中放置Actor，或绘制地形。
-   \*编辑器 **即你用来实现更复杂目标的工具集合。例如，** 关卡编辑器 **可让你构建游戏关卡，或者你可以在** 材质编辑器\*\* 中改变材料的外观体验。
-   **系统** 是功能大合集，这些功能会协同产生游戏或应用程序各方面内容。例如， **蓝图** 是用于视觉化脚本Gameplay元素的系统。

有时，系统和编辑器可能有类似的名称。例如，材质编辑器用于编辑材质资产，而材质系统为在虚幻引擎中使用材质提供底层支持。

虚幻引擎中的部分工具和编辑器是内置的，而其他工具和编辑器则是可选的 **插件（plugins）** ，这些插件可以根据项目需求来启用或禁用。要详细了解插件，请参考[使用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)页面。

本页概述了你将在虚幻引擎5中使用的主要工具和编辑器。功能说明文档中涵盖了各种虚幻引擎工具的详细使用说明。

无论你使用 **蓝图编辑器** 为关卡中的Actor编写行为脚本，还是使用 **Niagara编辑器** 创建粒子效果，了解每个编辑器的用途以及导航方法，均能优化你的工作流程，从而帮助你在开发过程中避开绊脚石。

## 关卡编辑器

#### Gameplay关卡

**关卡编辑器** 是你构建Gameplay关卡的主要编辑器。在这里通过添加不同类型的[Actor和几何体](/documentation/zh-cn/unreal-engine/actors-and-geometry-in-unreal-engine)、[蓝图可视化脚本](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)、[Niagara](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine)等来定义播放空间。在默认情况下，当你创建或打开项目时，虚幻引擎5会打开关卡编辑器。

如需了解更多信息，请参阅[关卡编辑器](/documentation/zh-cn/unreal-engine/level-editor-in-unreal-engine)。

## 静态网格体编辑器

#### 静态网格体

可以使用 **静态网格体编辑器（Static Mesh Editor）** 来预览外观、碰撞和UV贴图，以及设置和操控[静态网格体](/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine)。在静态网格编辑器中，你也可以针对你的静态网格体资产设置[LOD](/documentation/zh-cn/unreal-engine/creating-and-using-lods-in-unreal-engine)（或细节级别设置），以根据你的游戏运行方式和地点控制静态网格体资产出现的简洁程度或详细程度。

如需更多信息，请参阅[静态网格体编辑器UI](/documentation/zh-cn/unreal-engine/static-mesh-editor-ui-in-unreal-engine)。

## 材质编辑器

#### 材质

**材质编辑器** 是你创建和编辑材质的地方。材质是可应用于网格体以控制其视觉效果的资产。例如，你可以创建污垢材质，并将其应用到关卡中的各个地板上，从而创建看似有污垢覆盖的表面。

如需了解详细信息，请参阅[材质编辑器指南](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)。

## 蓝图编辑器

#### 蓝图

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/228d64ae-d263-4e92-8105-5c41047a1f92/ue5-blueprint-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/228d64ae-d263-4e92-8105-5c41047a1f92/ue5-blueprint-editor.png)

虚幻引擎5中的蓝图编辑器。点击查看完整视图。

**蓝图编辑器** 是你使用和修改蓝图的地方。这些特殊资产可用来创建Gameplay元素（如控制Actor或对事件编写脚本），修改材质或执行其他虚幻引擎功能，省去编写任何C++代码的过程。

如需更多信息，请参阅[蓝图编辑器参考](/documentation/zh-cn/unreal-engine/user-interface-reference-for-the-blueprints-visual-scripting-editor-in-unreal-engine)。

## 物理资源编辑器

#### 物理

你可以使用 **物理资产编辑器** 创建物理资产，以配合[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)使用。在实践中，你可以使用此方法实现变形和碰撞等物理特性。你可以从零开始，构建完整的布娃娃设置，或使用自动化工具来创建一套基本物理形体和物理约束。

如需更多信息，请参阅[物理资产编辑器](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine)。

## 行为树编辑器

#### AI行为

**行为树编辑器** 是你通过一种可视化的基于节点脚本系统（类似于蓝图）为关卡中的Actor编写人工智能（AI）脚本的地方。你可以为敌人、非游戏角色（NPC）、载具等创建任意数量的不同行为。

如需更多信息，请参阅[行为树用户指南](/documentation/zh-cn/unreal-engine/behavior-tree-in-unreal-engine---user-guide)。

## Niagara编辑器

#### 粒子效果

**Niagara编辑器** 利用由分离粒子发射器组成的全套模块化粒子效果系统，为每个效果创建特殊效果。可将发射器保在内容浏览器中，以备后用，并将作为当前和未来项目中的新发射器基础使用。

如需了解详细信息，请参阅[Niagara关键概念](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine)。

## UMG界面编辑器

#### 用户界面

**虚幻示意图形UI编辑器** 是视觉UI创作工具，可用来创建UI元素，如在游戏内头顶显示、菜单或其他界面相关的图形。

如需更多信息，请参阅[UMG UI设计器快速入门](/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine)。

## 字体编辑器

#### 字体

使用 **字体编辑器** 添加、组织和预览字体资产。你也可以定义字体参数，如字体资产布局和提示策略（*字体提示*是一种数学方法，可确保文本在任意尺寸的显示屏中都可读）。

如需更多信息，请参阅 [字体资源和编辑器](/documentation/zh-cn/unreal-engine/font-asset-and-editor-in-unreal-engine)。

## Sequencer编辑器

#### 过场动画和动态事件

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/588a5a4f-8a21-459e-82fc-ade06c34d35b/ue4-sequencer-meerkat.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/588a5a4f-8a21-459e-82fc-ade06c34d35b/ue4-sequencer-meerkat.png)

在制作Weta Digital动画短片猫鼬的过程中使用了Sequencer。点击查看完整视图。

利用 **Sequencer编辑器** 可通过专用多轨迹编辑器创建游戏过场动画。通过创建 **关卡序列（Level Sequences）** 和添加 **轨迹** （Tracks），你可以定义各个轨迹的组成，这样将确定场景的内容。轨迹可以包含动画（Animation）（用于将角色动画化）、变形（Transformation）（在场景中移动各个东西）、音频（Audio）（用于包括音乐或音效）等等。

如需了解更多信息，请参阅[Sequencer概述](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)。

## 动画编辑器

#### 动画

**动画编辑器** 是虚幻引擎5中的动画编辑器。你可以使用该工具来编辑[骨骼资产](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)、[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)、[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)，以及其他各种动画资产。

如需更多信息，请参阅[动画编辑器](/documentation/zh-cn/unreal-engine/animation-editors-in-unreal-engine)。

## Control Rig编辑器

#### 动画

**Control Rig** 是动画工具套件，可以用于直接在引擎中操纵角色并实现其动画。使用Control Rig，你无需在外部工具中进行操纵和制作动画，而是直接在虚幻编辑器中制作动画。使用此系统，你可以在角色上创建和操纵自定义控制点，在 [Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine) 中制作动画，并使用各种其他动画工具来帮助完成动画制作过程。

如需了解更多信息，请参阅[控制绑定](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)。

## Sound Cue编辑器

#### Sound Cue

虚幻引擎5中的音频播放的行为在Sound Cue中得到定义，可使用 **Sound Cue编辑器** 对其进行编辑。在此编辑器中，你可以组合多个声音资产后混音，以此生成单混音输出，另存为一个Sound Cue。

如需了解更多信息，请参阅[Sound Cue编辑器](/documentation/zh-cn/unreal-engine/sound-cue-editor-in-unreal-engine)。

## 媒体编辑器

#### 外部媒体播放

使用 **媒体编辑器** 来定义媒体文件或URL，以作为虚幻引擎5内部播放的源媒体使用。

你可以定义源媒体播放方式设置，如自动播放、播放速度和循环，但不能直接编辑媒体。

如需了解更多信息，请参阅[媒体编辑器参考文档](/documentation/zh-cn/unreal-engine/media-editor-reference-for-unreal-engine)。

## nDisplay 3D配置编辑器

#### 虚拟制作和实时事件

[nDisplay](/documentation/zh-cn/unreal-engine/rendering-to-multiple-displays-with-ndisplay-in-unreal-engine)在多个同步显示设备上渲染虚幻引擎场景，如能量墙、穹顶和曲面界面。你可以使用 **nDisplay配置编辑器** 创建nDisplay设置，并使所有显示设备上的内容渲染方式可视化。

如需了解更多信息，请参阅[nDisplay 3D配置编辑器](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine)。

## DMX库编辑器

#### 实时事件

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/561b39f8-dbd5-4940-9df6-f080ee615578/ue4-dmx-library-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/561b39f8-dbd5-4940-9df6-f080ee615578/ue4-dmx-library-editor.png)

DMX实操。此截图来自Moment Factory的示例项目。点击查看完整视图。

**DMX（数字多路复用）** 是在整个实时事件行业中用来控制各种设备的数字通信标准，如照明灯具、激光、烟雾机、机械设备和电子广告牌。在 **DMX库编辑器** 中，你可以自定义相关设备及其命令。

如需了解更多信息，请参阅[DMX](/documentation/zh-cn/unreal-engine/dmx-in-unreal-engine)。

-   [](https://dev.epicgames.com/community/search)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [关卡编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E5%85%B3%E5%8D%A1%E7%BC%96%E8%BE%91%E5%99%A8)
-   [Gameplay关卡](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#gameplay%E5%85%B3%E5%8D%A1)
-   [静态网格体编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BC%96%E8%BE%91%E5%99%A8)
-   [静态网格体](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [材质编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E6%9D%90%E8%B4%A8%E7%BC%96%E8%BE%91%E5%99%A8)
-   [材质](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E6%9D%90%E8%B4%A8)
-   [蓝图编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E8%93%9D%E5%9B%BE%E7%BC%96%E8%BE%91%E5%99%A8)
-   [蓝图](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E8%93%9D%E5%9B%BE)
-   [物理资源编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E7%89%A9%E7%90%86%E8%B5%84%E6%BA%90%E7%BC%96%E8%BE%91%E5%99%A8)
-   [物理](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E7%89%A9%E7%90%86)
-   [行为树编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E8%A1%8C%E4%B8%BA%E6%A0%91%E7%BC%96%E8%BE%91%E5%99%A8)
-   [AI行为](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#ai%E8%A1%8C%E4%B8%BA)
-   [Niagara编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#niagara%E7%BC%96%E8%BE%91%E5%99%A8)
-   [粒子效果](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E7%B2%92%E5%AD%90%E6%95%88%E6%9E%9C)
-   [UMG界面编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#umg%E7%95%8C%E9%9D%A2%E7%BC%96%E8%BE%91%E5%99%A8)
-   [用户界面](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2)
-   [字体编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E5%AD%97%E4%BD%93%E7%BC%96%E8%BE%91%E5%99%A8)
-   [字体](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E5%AD%97%E4%BD%93)
-   [Sequencer编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#sequencer%E7%BC%96%E8%BE%91%E5%99%A8)
-   [过场动画和动态事件](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%E5%92%8C%E5%8A%A8%E6%80%81%E4%BA%8B%E4%BB%B6)
-   [动画编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E5%8A%A8%E7%94%BB%E7%BC%96%E8%BE%91%E5%99%A8)
-   [动画](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E5%8A%A8%E7%94%BB)
-   [Control Rig编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#controlrig%E7%BC%96%E8%BE%91%E5%99%A8)
-   [动画](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E5%8A%A8%E7%94%BB-2)
-   [Sound Cue编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#soundcue%E7%BC%96%E8%BE%91%E5%99%A8)
-   [Sound Cue](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#soundcue)
-   [媒体编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E5%AA%92%E4%BD%93%E7%BC%96%E8%BE%91%E5%99%A8)
-   [外部媒体播放](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E5%A4%96%E9%83%A8%E5%AA%92%E4%BD%93%E6%92%AD%E6%94%BE)
-   [nDisplay 3D配置编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#ndisplay3d%E9%85%8D%E7%BD%AE%E7%BC%96%E8%BE%91%E5%99%A8)
-   [虚拟制作和实时事件](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E8%99%9A%E6%8B%9F%E5%88%B6%E4%BD%9C%E5%92%8C%E5%AE%9E%E6%97%B6%E4%BA%8B%E4%BB%B6)
-   [DMX库编辑器](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#dmx%E5%BA%93%E7%BC%96%E8%BE%91%E5%99%A8)
-   [实时事件](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine#%E5%AE%9E%E6%97%B6%E4%BA%8B%E4%BB%B6)