# 虚幻引擎中的2D开发 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/2d-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:51:10.156Z

---

目录

![虚幻引擎中的2D开发](https://dev.epicgames.com/community/api/documentation/image/331552fc-b502-4d83-8575-b1bc832569e1?resizing_type=fill&width=1920&height=335)

**Paper 2D** 是一款 **虚幻引擎（UE）** 插件，可以用来创建2D和2D/3D混合的游戏玩法和动画系统。Paper 2D插件支持各类2D资产类型，如用于2D角色和对象的Sprites，用于制作Sprites动画的Flipbooks、可以用来创建2D关卡和环境的TileSets和TileMaps，并且还附带了创建和编辑资产所需的所有相关编辑器。

[](/documentation/zh-cn/unreal-engine/paper-2d-overview-in-unreal-engine)

[![虚幻引擎](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8163343c-1802-43ce-a4e2-868026b5a568/paper2d_topic.png)](/documentation/zh-cn/unreal-engine/paper-2d-overview-in-unreal-engine)

[虚幻引擎](/documentation/zh-cn/unreal-engine/paper-2d-overview-in-unreal-engine)

[Paper 2D是一种基于Sprite的系统，用于在虚幻引擎中开发2D或2D/3D结合的游戏。](/documentation/zh-cn/unreal-engine/paper-2d-overview-in-unreal-engine)

在构建含2D元素的项目时，Paper 2D系统可为你提供许多选择。该插件拥有丰富的资产和编辑器功能，你可以利用它们来创建高质量的2D内容，从角色到环境皆可。此外，该插件与UE的3D渲染功能完全兼容，这意味着2D元素能够与3D角色、对象或环境无缝集成。

![paper 2d hybrid example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7fb6839-db3d-4628-8e5c-5ec75106634d/image-0.png)

#### 先决条件

要在UE中创建2D和2D/3D混合项目，请先安装Paper 2D插件。

-   在虚幻编辑器中，找到 **菜单栏**，依次点击 **编辑（Edit）** > **插件（Plugins）** 并在 **2D分段** 中找到 **Paper 2D** 插件，或使用 **搜索栏** 搜索到它。如果该插件未启用，请勾选它并重启编辑器。

![paper 2d plugin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44445482-ae9b-4759-8005-c7f327ff9e0d/image-1.png)

## 从Unity迁移项目

要将2D项目从Unity迁移到UE，请按以下步骤操作：

1.  在Unity项目的 **Assets** 文件夹（其位于Unity项目的根目录下）中找到与2D资产相关的图像文件。
    
    UE支持Unity支持的所有2D图像文件，如 `.jpg` 和 `.png`。
    
2.  在Unity项目文件夹中找到图像文件后，你可以将其拖放到UE项目的 **内容浏览器** 中，或使用内容浏览器的 **导入（Import）** 按钮查看文件在你的计算机中的位置。
    

导入到UE的图像文件会以纹理资产的形式导入，其可被用于创建Paper 2D资产，如Sprites、Flipbooks和TileMaps。

在导入低分辨率的图像（如基于Sprite的原画）时，你可以为纹理应用Sprite特有的设置，以锐化和增强像素原画的外观。方法是在内容浏览器中右键点击资产，在快捷菜单中选择 **Sprite操作（Sprite Actions）** > **应用Paper 2D导入设置（Apply Paper 2D Import Settings）** 选项。

关于将基于基于Sprite的资产导入UE的更多详情，请参阅Paper 2D Sprites文档中的[Importing Sprites section](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine#%E5%AF%BC%E5%85%A5sprites)一节。

将图像资产导入UE后，你就可以创建Sprite和TileSet资产，并使用它们各自的编辑器开始构建游戏对象了。

## 资产

下文简单概述了Paper 2D系统，并提供了更多文档链接以供扩展阅读。

### Sprites

和Unity一样，在UE中，用于创建2D角色和对象的主要资产被称为 **Sprite** 资产。Sprite是是一种平面游戏对象，你可以将图像映射到其上，用作角色或物体。虽然任何图像都可以用作Sprite资源，但Paper 2D插件附带了专门的设置和材质，以帮助改善2D风格项目中常见的低分辨率像素风格图形的外观。

![manny sprite](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cf7a5d0-b84b-4abb-b250-6570811ee24f/image-2.png)

然后，你可以将Sprite以 **Sprite组件** 的形式添加到任何UE **Actor** 或 **Paper 2D角色Actor**。

关于UE中Sprite的更多详情，如Sprite编辑器的设置和参考信息，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine)

[![Paper 2D Sprites](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3998081-399e-4655-9b9c-786cc29f1933/sprite-topic.png)](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine)

[Paper 2D Sprites](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine)

[介绍虚幻引擎中的Sprite的创建方法。](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine)

### Flipbooks

你可以使用 **Flipbooks** 为Sprite Actor制作动作。它可以存储一系列不同的Sprite资产的线性顺序播放内容。与Unity不同的是，Flipbooks是一种独特的资产，可以独立于单个Sprite资产甚或Actor对象使用。这意味着动画更加灵活且可重复使用，并且可以通过蓝图或C++代码随时播放。

![manny flipbook](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba062bb0-7afe-4b42-9df3-55cb7d99eb33/image-3.gif)

关于在UE中创建、使用和编辑Flipbooks的更多详情，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/paper-2d-flipbooks-in-unreal-engine)

[![Paper 2D Flipbooks](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c10a1ab5-6566-42f4-9bc8-2124a19f37bd/flipbook-topic.png)](/documentation/zh-cn/unreal-engine/paper-2d-flipbooks-in-unreal-engine)

[Paper 2D Flipbooks](/documentation/zh-cn/unreal-engine/paper-2d-flipbooks-in-unreal-engine)

[虚幻引擎中Flipbooks的描述及其创建方法。](/documentation/zh-cn/unreal-engine/paper-2d-flipbooks-in-unreal-engine)

### TileSets和TileMaps

Paper 2D插件还包含TileSet和TileMap资产，以及与之对应的编辑器。你可以用这些编辑器来创建2D关卡和环境。使用TileSet资产，你可以导入一个包含关卡中所有背景资产的大型资产文件，提取每个图块，并定义会影响玩家与环境交互方式的碰撞设置。

然后，你可以将这些图块组合成一个TileMap资产，以此来构建关卡。你可以使用诸如图层之类的工具来为项目构建动态且有趣的环境。

![tilemap in unreal engine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd6309d8-f005-401b-89cc-18b273afe955/image-4.png)

关于在UE中使用TileSet和TileMap资产的更多详情，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine)

[![Paper 2D 图块集/图块地图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b049ac8f-b777-44d3-be53-6f91a59a6b1b/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine)

[Paper 2D 图块集/图块地图](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine)

[如何创建在 Paper 2D 中使用的图块集和图块地图。](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine)

-   [unity](https://dev.epicgames.com/community/search?query=unity)
-   [paper 2d](https://dev.epicgames.com/community/search?query=paper%202d)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/2d-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [从Unity迁移项目](/documentation/zh-cn/unreal-engine/2d-in-unreal-engine#%E4%BB%8Eunity%E8%BF%81%E7%A7%BB%E9%A1%B9%E7%9B%AE)
-   [资产](/documentation/zh-cn/unreal-engine/2d-in-unreal-engine#%E8%B5%84%E4%BA%A7)
-   [Sprites](/documentation/zh-cn/unreal-engine/2d-in-unreal-engine#sprites)
-   [Flipbooks](/documentation/zh-cn/unreal-engine/2d-in-unreal-engine#flipbooks)
-   [TileSets和TileMaps](/documentation/zh-cn/unreal-engine/2d-in-unreal-engine#tilesets%E5%92%8Ctilemaps)