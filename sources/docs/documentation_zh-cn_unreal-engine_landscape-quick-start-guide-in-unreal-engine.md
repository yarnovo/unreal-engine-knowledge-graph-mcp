# 虚幻引擎地形快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:13:30.990Z

---

目录

![地形快速入门指南](https://dev.epicgames.com/community/api/documentation/image/3b78191f-d622-46bf-81eb-652fa81a649d?resizing_type=fill&width=1920&height=335)

《虚幻编辑器地形快速入门指南》将对新建地形、塑造地形，新建地形材质，及在地形上绘制此类材质进行讲解。

## 1 - 使用地形工具

虚幻引擎5（UE5）内置的 **地形（Landscape）** 系统是一个工具合集，可帮助你创建 庞大的户外环境。但在深入讲解创建首个地形前，先来熟悉与地形系统互动时的最常用工具和键盘输入。

### 打开地形工具并使用模式

用于与地形系统交互的所有工具均可在 **模式** 下拉菜单 中的 **地形** 选项下找到。要启用地形工具，点击模式下拉菜单并从菜单中选择对应选项即可。

地形工具共有三种模式：**管理（Manage）**、**造型（Sculpt）** 和 **绘制（Paint）**，点击地形工具栏窗口顶部的图标即可进行访问。利用此类模式可以不同方式与地形互动。以下是各模式支持操作的概览。

![Landscape Tool Modes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f7394b3-ea99-499b-a02a-5b0a69b5e07b/01-landscape-tool-modes.png "Landscape Tool Modes")

图标

模式

说明

![Manage mode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c1dba98-368c-42fb-ad8e-d1e6c7e8d822/02-landscape-manage-mode.png "Manage mode")

**管理模式（Manage mode）**

创建新的地形，并修改地形组件。你也可在管理模式中使用[地形拷贝工具](/documentation/zh-cn/unreal-engine/landscape-copy-tool-in-unreal-engine)复制、粘贴、导入、导出部分地形。有关管理模式的更多信息，请参阅[地形管理模式](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine)。

![Sculpt mode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a919a554-1ce7-49e1-b166-807eb0ecab99/03-landscape-sculpt-mode.png "Sculpt mode")

**雕刻模式（Sculpt mode）**

通过选择和使用特定的工具，修改地形的形状。有关雕刻模式的更多信息，请参阅[地形雕刻模式](/documentation/zh-cn/unreal-engine/landscape-sculpt-mode-in-unreal-engine)。

![Paint mode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63470803-e630-4b41-acfe-2570daa3ce16/04-landscape-paint-mode.png "Paint mode")

**绘制模式（Paint mode）**

基于在地形材质中定义的图层，通过在地形上绘画纹理以修改部分地形的外观。有关绘制模式的更多信息，请参阅[地形绘制模式](/documentation/zh-cn/unreal-engine/landscape-paint-mode-in-unreal-engine)。

### 与地形工具互动

虽然地形工具中的三种模式可让你分别以不同的方式与地形互动，但其所用的键盘和鼠标按键却非常相似。以下为使用地形工具时最常使用的按键、按键组合和鼠标按钮的概览。

**常用功能按钮**

**操作**

**Ctrl**

可选择地形组件。

**鼠标左键**

增高或增加高度图或选中图层的权重。例如，在造型模式下，此操作将增高地形高度图。在绘制模式下，将选中材质应用到地形。

**Shift + 鼠标左键**

降低或降低高度图或选中图层的权重。例如，在造型模式下，将降低地形高度图。在绘制模式下，将擦除应用到地形特定部分的选中材质。

**Ctrl + Z**

撤销上一操作。

**Ctrl + Y**

重做撤销的上一操作。

## 2 - 新建地形

### 新建FPS蓝图项目

在创建首个地形前，先新建一个 **第一人称** 项目。

如果对新建项目的方法不熟悉，请查看以下页面，了解[新建项目](/documentation/zh-cn/unreal-engine/level-designer-quick-start-in-unreal-engine)的方法。

### 创建地形

1.  首先，如尚未新建 **第一人称** 项目，请进行创建。 本教程中可使用其他模板，但使用第一人称模板检查地形相对容易。在选择"第一人称"选项后，点击 **下一步** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b3b1e4e-e7b4-4667-a192-505d8942dff9/05-t-creating-a-new-fps-bp-project-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b3b1e4e-e7b4-4667-a192-505d8942dff9/05-t-creating-a-new-fps-bp-project-1.png)
    
    点击查看大图。
    
2.  将项目设置为使用蓝图并包含初学者内容包文件夹。在计算机上选择存储项目的位置并为其起一个合适的名字。最后，点击 **新建项目（Create Project）** 按钮继续。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61ee18cb-83f6-49d0-a4c6-8295d2bc1e59/06-t-creating-a-new-fps-bp-project-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61ee18cb-83f6-49d0-a4c6-8295d2bc1e59/06-t-creating-a-new-fps-bp-project-2.png)
    
    点击查看大图。
    
3.  新建项目并加载编辑器后，使用 **文件->新建关卡（New Level）** 新建关卡，并在新关卡模板（New Level Template）中选择 **默认关卡**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2b763a8-352e-42c1-a1c2-8cf50434f0e8/07-t-creating-a-new-level.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2b763a8-352e-42c1-a1c2-8cf50434f0e8/07-t-creating-a-new-level.png)
    
    点击查看大图。
    
4.  新建关卡，在关卡中选择 **地板（Floor）**，然后按 **删除** 键将其从关卡中删除。
    
    务必选择玩家出生点，将其沿Z轴稍微上移。此操作可将确保玩家不会在新建地形下放出生。
    
    完成后，应可获得与下图类似的效果。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4efa29e-f935-43f9-a2e6-cf148c1bf72c/08-t-blank-level.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4efa29e-f935-43f9-a2e6-cf148c1bf72c/08-t-blank-level.png)
    
    点击查看大图。
    
5.  现在，关卡已清理完毕，玩家出生点已沿Z轴上移，接下来需新建地形。要新建地形，点击 **模式** 下拉菜单上的地形选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2fa8c49-eef5-40bb-b7bf-87a2d958959a/09-t-activating-landscape-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2fa8c49-eef5-40bb-b7bf-87a2d958959a/09-t-activating-landscape-mode.png)
    
    点击查看大图。
    
6.  点击地形选项后，可看到 **地形** 面板中显示的以下一组地形工具。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3097147-1542-49f3-ad40-5b68bfc19fbb/10-t-landscape-tools.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3097147-1542-49f3-ad40-5b68bfc19fbb/10-t-landscape-tools.png)
    
    点击查看大图。
    
7.  在本教程中，仅着重讲解使用默认设置创建地形。 如要了解地形工具管理模式中各种设置的更多信息，请参考[创建地形](/documentation/zh-cn/unreal-engine/creating-landscapes-in-unreal-engine)文档。 现在，按下图进行设置，然后按下 **创建按钮** 创建地形。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6573ccb0-8eb0-4e9d-8ca9-86aa6c810287/11-t-fillworld-create-landscape.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6573ccb0-8eb0-4e9d-8ca9-86aa6c810287/11-t-fillworld-create-landscape.png)
    
    点击查看大图。
    

完成后，应可看到类似下图的内容。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e724d34a-1f6c-47a9-94bc-33397b2a1f94/12-t-creating-a-new-landscape.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e724d34a-1f6c-47a9-94bc-33397b2a1f94/12-t-creating-a-new-landscape.png)

点击查看大图。

## 3 - 塑造地形

造型 **地形** 的操作非常耗时。用于造型的所有工具都可在地形工具栏的 **造型** 标签页下找到。如要了解各造型工具功能的更多详情，可阅读[造型模式](/documentation/zh-cn/unreal-engine/landscape-sculpt-mode-in-unreal-engine)页面。如需快速参考，可查看以下塑造地形最常用按键和鼠标互动的列表。

**常用功能按钮**

**操作**

**Ctrl**

可选择地形组件。

**鼠标左键**

增高或增加高度图或选中图层的权重。例如，在造型模式下，此操作将增高地形高度图。在绘制模式下，将选中材质应用于地形。

**Shift + 鼠标左键**

降低或降低高度图或选中图层的权重。例如，在造型模式下，将降低地形高度图。在绘制模式下，将擦除应用到地形特定部分的选中材质。

**Ctrl + Z**

撤销上一操作。

**Ctrl + Y**

重做撤销的上一操作。

在地形教程的此章节中，将首先创建完全平坦的地形分段，然后逐步增加细节。此目的并非准确模拟教程中创建的内容，而是提供熟悉和适应使用各种地形工具的机会。

导致在本教程中完成的操作与之后截图稍有出入的原因有很多。使用地形工具需要不断试错，因此结果各有千秋，有时与之后图像里结果差别巨大。学习本教程最重要是要了解各地形工具的工作原理，以及此类工具相互配合生成最终成品的方式。

* * *

1.  首先找到要使用的地形分段。 本教程不会填充整个地形，仅填充其分段。 要便于使用，按下键盘上的 **Ctrl + 1** 设置相机书签。 此操作将设置相机书签，通过提供固定复位的相机视图，使衡量地形移动更加容易。 在编辑器会话中，可随时按1键，相机将准确返回设置的位置。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1538f767-af4a-462e-937c-769aa2056417/13-t-landscape-flat.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1538f767-af4a-462e-937c-769aa2056417/13-t-landscape-flat.png)
    
    点击查看大图。
    
2.  书签现已设置，开始使用 **造型工具** 绘制山丘和山谷的大体细节。 可从以下列表中查找用于该步的笔刷尺寸和强度，完成后应可看到类似下图的效果。你可以在地形面板或视口上方的地形工具栏中修改笔刷尺寸和强度的值。
    
    注意：使用 **鼠标左键** 增高地形高度，使用 **Shift** + **鼠标左键** 降低地形高度。
    
    所用工具
    
    笔刷尺寸
    
    强度设置
    
    造型工具
    
    8192
    
    0.29
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/179c8441-4474-4a5d-980b-c8881a29a202/14-t-landscape-sculpt-tool.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/179c8441-4474-4a5d-980b-c8881a29a202/14-t-landscape-sculpt-tool.png)
    
    点击查看大图。
    
3.  画出山丘和山谷的大概轮廓后，使用 **平滑工具** 优化其外观和感觉。 可从以下列表中查找用于该步的笔刷尺寸和强度，完成后应可看到类似下图的效果。使用该工具可使你的 **地形** 特征更平滑自然。注意，不要把所有地形特征都抹平了！
    
    所用工具
    
    笔刷尺寸
    
    强度设置
    
    平滑工具
    
    2048
    
    0.29
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cae73c4-a3bf-45e0-8465-52b0c3768086/15-t-landscape-smooth.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cae73c4-a3bf-45e0-8465-52b0c3768086/15-t-landscape-smooth.png)
    
    点击查看大图。
    
4.  地形经过平滑处理后，使用 **平整工具** 添加一些类似平顶山的部分。 可从以下列表中查找用于该步的笔刷尺寸和强度，完成后应可看到类似下图的效果。平整工具会捕获你首次点击的位置的高度信息，并提升/降低其高度，直到触碰到你拖动笔刷的位置。
    
    所用工具
    
    笔刷尺寸
    
    强度设置
    
    平整工具
    
    2048
    
    0.29
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/751808ce-7b28-42a9-b7d1-0201f44f336f/16-t-landscape-flatten.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/751808ce-7b28-42a9-b7d1-0201f44f336f/16-t-landscape-flatten.png)
    
    点击查看大图。
    
5.  现在可以用 **斜坡工具** 在台地间创建一些平整的斜坡了。该工具的用法为，先为斜坡设置一个起点和一个终点，然后点击 **添加斜坡** 在两点间创建一条平整的路径。每个点都可以向任意方向移动，以便创建符合情况的斜坡。 可从以下列表中查找用于该步的笔刷尺寸和强度，完成后应可看到类似下图的效果。 如不清楚斜坡工具的使用位置，可参见下图黄色高亮显示的位置。
    
    所用工具
    
    斜坡宽度
    
    侧衰减
    
    斜坡工具
    
    2000
    
    0.40
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da5a3fde-12c1-4e3b-a296-3fd6249ca868/17-t-landscape-ramp.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da5a3fde-12c1-4e3b-a296-3fd6249ca868/17-t-landscape-ramp.png)
    
    点击查看大图。
    
6.  接下来，我们将使用 **侵蚀工具** 向地形添加侵蚀效果，使其呈现气候影响形成的外观。它可以模拟风化效果。该工具非常适合在创建山峰和山脊时用于剥蚀山体。 可从以下列表中查找用于该步的笔刷尺寸和强度，完成后应可看到类似下图的效果。
    
    所用工具
    
    笔刷尺寸
    
    强度设置
    
    侵蚀工具
    
    693
    
    0.25
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb8cd61f-6de6-42d8-a8b7-6aad681264f9/18-t-landscape-erosion.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb8cd61f-6de6-42d8-a8b7-6aad681264f9/18-t-landscape-erosion.png)
    
    点击查看大图。
    
7.  下一步中将继续使用上步添加的侵蚀，向地形添加水力侵蚀来强化侵蚀效果。 **水力侵蚀工具** 与侵蚀工具不同，其用于模拟水随时间侵蚀地形细节的效果。 可从以下列表中查找用于该步的笔刷尺寸和强度，完成后应可看到类似下图的效果。和使用 **平滑工具** 时一样，注意不要把所有细节都侵蚀掉了。
    
    所用工具
    
    笔刷尺寸
    
    强度设置
    
    水力侵蚀
    
    2048
    
    0.29
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a35ccd8-0569-49a9-817a-b3e3fb8c25f5/19-t-landscape-hydro-erosion.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a35ccd8-0569-49a9-817a-b3e3fb8c25f5/19-t-landscape-hydro-erosion.png)
    
    点击查看大图。
    
8.  要进一步破坏地形表面，使用 **噪点工具**。 通过随机向上/向下或同时上下移动地形顶点，噪点工具可将随机噪点添加到地形表面。 可从以下列表中查找用于该步的笔刷尺寸和强度，完成后应可看到类似下图的效果。
    
    所用工具
    
    笔刷尺寸
    
    强度设置
    
    噪点工具
    
    2048
    
    0.29
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7678045-cd26-404e-8b21-ff8c7c4df507/20-t-landscape-noise.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7678045-cd26-404e-8b21-ff8c7c4df507/20-t-landscape-noise.png)
    
    点击查看大图。
    
9.  本教程地形造型部分的最后一步将再次使用 **平滑工具**，协助平滑处理较为参差的地形区域，让地形看起来更加自然。 虽然可能无需自行完成此步骤，但其可协助平滑处理过深区域或者玩家掉入后会卡住的区域。可从以下列表中查找用于该步的笔刷尺寸和强度，完成后应可看到类似下图的效果。
    
    所用工具
    
    笔刷尺寸
    
    强度设置
    
    平滑工具
    
    1121
    
    0.16
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18cfc7a7-9c9b-4785-b1fe-77d1dcc1cf8c/21-t-landscape-smooth-cleanup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18cfc7a7-9c9b-4785-b1fe-77d1dcc1cf8c/21-t-landscape-smooth-cleanup.png)
    
    点击查看大图。
    

## 4 - 创建地形材质

### 文件夹设置

现在已完成地形造型，接下来需添加部分材质，使其更接近于真实世界中的效果。 但在此之前，首先设置文件夹，组织你创建的内容并将其迁移到项目中。

欲了解在虚幻引擎4中设置文件夹的更多信息，请参阅[文件夹](/documentation/zh-cn/unreal-engine/sources-panel-reference-in-unreal-engine)的相关页面。

1.  首先在项目的 **Content** 文件夹中创建一个名为 **Landscape** 的新文件夹。
2.  然后在Landscape文件夹中创建以下三个文件夹：
    -   材质
    -   资源
    -   纹理

完成后，应可看到类似下图的效果。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c336fe0e-5567-4af5-93dd-eb9bbc16cad7/22-t-landscape-folders.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c336fe0e-5567-4af5-93dd-eb9bbc16cad7/22-t-landscape-folders.png)

点击查看大图。

### 迁移纹理

文件夹现已设置完毕，接下来从 **Landscape Mountains** 学习项目中迁移部分纹理，以便使用。在项目可以在Epic Games启动程序的学习标签页中找到。欲了解在项目间迁移内容的更多信息，请参考[迁移内容](/documentation/zh-cn/unreal-engine/sources-panel-reference-in-unreal-engine)的相关页面

项目间迁移内容时，可能会得到无关的额外文件夹。 要解决此问题，在 **内容浏览器** 中选择需要的纹理，然后从当前位置拖入要放置的文件夹。 此步骤纯属文件整理的范畴，对教程的最终结果并无影响。

可在地形内容范例项目中的下列文件夹中找到此类纹理。

**/Game/ExampleContent/Landscapes/Textures/**

以下为 **Landscape Content Example** 项目中要迁移的纹理。

1.  **T\_LS\_Grass\_01\_D**
2.  **T\_LS\_Grass\_01\_N**
3.  **T\_FullGrass\_D**
4.  **T\_FullGrass\_N**
5.  **T\_IceNoise\_N**

迁移纹理后，确保将其放置在上述步骤创建的 **Textures** 文件夹中。

### 创建地形材质

按照以下步骤创建地形的材质。

1.  导航到 **内容浏览器** 中的 **Materials** 文件夹。
2.  **内容浏览器** 中 **点击右键**，然后在 **创建基本资产（Create Basic Asset）** 列表中选择 **材质**。
3.  将新建材质命名方便快速查找的名称，例如 **LandscapeMaterial**。

如尚未查看[材质](/documentation/zh-cn/unreal-engine/unreal-engine-materials)页面，建议前往查看，深入了解材质在虚幻引擎5中的工作原理。

操作完成后，应可看到类似下图的效果。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32c7bee4-6454-40ba-8177-761b1ca5ee0a/23-t-landscape-create-new-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32c7bee4-6454-40ba-8177-761b1ca5ee0a/23-t-landscape-create-new-material.png)

点击查看大图。

新建地形材质后，在 **内容浏览器** 中 **双击** 以打开材质。之后屏幕上应会显示下图界面：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e31452a2-2a62-47ee-8ba4-a4eb217c7343/24-t-landscape-blank-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e31452a2-2a62-47ee-8ba4-a4eb217c7343/24-t-landscape-blank-material.png)

点击查看大图。

现在，开始在材质编辑器内部添加节点。 需创建的首个节点是 **LandscapeLayerCoords** UV节点。该节点将协助生成UV坐标。它们将被用于将地形材质映射到地形Actor。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8bf1fbd-4c71-439c-b049-385734a0cd97/25-t-landscape-uv-cords.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8bf1fbd-4c71-439c-b049-385734a0cd97/25-t-landscape-uv-cords.png)

点击查看大图。

查找特定地形节点最快的方法便是使用Landscape作为关键字在材质 **控制板** 框中搜索节点。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c5470ea-81b7-4823-8504-fb37158188df/26-t-landscape-material-search.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c5470ea-81b7-4823-8504-fb37158188df/26-t-landscape-material-search.png)

点击查看大图。

接下来要添加的材质节点是地面 **底色** 和 **法线** 贴图纹理的节点。对于雪，使用 **向量参数**（**V + 点击左键**），该参数使用米白色。要确保不使用 **金属感** 信息，需使用 **常量**（**1 + 点击左键**）0，并插入 **金属** 输入。最后，设置 **粗糙度（Roughness）** 的 **标量参数（Scalar Parameter）**（**S + 点击左键**），以便通过 **材质实例** 微调此值。最后确保将 **LandscapeCoords** 连接到每个 **纹理取样** 的UV。完成后，你的节点网络应如下图所示：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0532899-af39-4d63-b321-ea27a6b413bc/27-t-landscape-material-00.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0532899-af39-4d63-b321-ea27a6b413bc/27-t-landscape-material-00.png)

点击查看大图。

要添加各纹理的 **纹理取样** 节点，先在 **内容浏览器** 中选择所需纹理，然后在 **材质编辑器** 图表中按 **T + 点击左键** 创建节点。

要查找键绑定的更多相关信息，请查看 **编辑 > 编辑器首选项（Editor Preferences）> 键盘快捷键（Keyboard Shortcuts）** 窗口，选择 **材质编辑器-生成节点** 部分。

**编号**

**纹理命名**

**1**

T\_LS\_Grass\_01\_D

**2**

T\_FullGrass\_D

**3**

T\_LS\_Grass\_01\_N

**4**

T\_FullGrass\_N

**5**

T\_IceNoise\_N

添加材质节点并将 **LandscapeCoords** 连接到纹理UV后，现在需添加并设置 **地形图层混合** 节点。 **地形图层混合（Landscape Layer Blend）** 节点允许你通过权重混合、高度混合或Alpha混合来混合不同图层。权重混合会通过各个图层的绘制权重来判断显示哪些内容。假如我们想让两种表面无缝混合在一起，比如岩石和沙土，我们就会使用权重混合。高度混合除了使用相同的权重值，还会用到纹理取样Alpha通道中的高度值；它最适合用于让某种材质明晰地覆盖在另一种材质的上方，例如让草地和积雪层覆盖在泥土层上。最后一种是Alpha混合，它使用绘制权重信息和Alpha图层来确定最终效果。

下表展示了 **纹理** 与 **图层名称** 之间的关联及其使用的 **混合类型**。

首次放置 **地形图层混合** 节点时，其为空，类似下图中标记的节点。要向其添加 **图层**，需先在 **材质图表** 中选择节点，然后在 **细节** 面板中点击 **元素（Elements）** 字样和 **垃圾桶** 图标间的 **加号** 图标。在以下标为2的图像中，该图标以黄色高亮显示。所用纹理数量将决定要拥有的图层数。

![Landscape node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69e14641-6671-41e5-b4d4-5db9739a85f6/28-t-landscape-mlb-node.png "Landscape node") ![Landscape adding layers to node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a76bdac-24b5-4e15-a683-a74cfef9179d/29-t-landscape-adding-layers-to-mlb-node.png "Landscape adding layers to node") 

**图层混合底色**

**纹理**

**图层名称**

**混合类型**

**预览权重**

T\_LS\_Grass\_01\_D

Soil

LB权重混合

1.0

T\_FullGrass\_D

Grass

LB高度混合

0.0

Snow as a Vector 3

Snow

LB高度混合

0.0

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe5df8b8-004e-43ad-8097-c85a603e960e/30-t-landscape-layer-blend-bc.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe5df8b8-004e-43ad-8097-c85a603e960e/30-t-landscape-layer-blend-bc.png)

点击查看大图。

**图层混合法线**

**纹理**

**图层命名**

**混合类型**

**预览权重**

T\_LS\_Grass\_01\_N

Soil

LB权重混合

1.0

T\_FullGrass\_N

Grass

LB高度混合

0.0

T\_IceNoise\_N

Snow

LB权重混合

0.0

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b32188ed-c7b3-451d-a738-490c34149eff/31-t-landscape-layer-blend-n.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b32188ed-c7b3-451d-a738-490c34149eff/31-t-landscape-layer-blend-n.png)

点击查看大图。

欲了解使用 **地形图层混合** 节点的更多详情或了解如何排除疑难杂症，请参阅[地貌表达式](/documentation/zh-cn/unreal-engine/landscape-material-expressions-in-unreal-engine)页面。

设置 **图层混合** 节点后，需连接纹理贴图。混合了高度的材质将同时拥有图层连接和高度连接，以满足对额外高度信息的需要。完成后，应可看到类似下图的效果。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/117c9c64-0944-46fc-9e99-000ba1163fb5/32-t-landscape-material-final.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/117c9c64-0944-46fc-9e99-000ba1163fb5/32-t-landscape-material-final.png)

点击查看大图。

Photoshop中的材质连接是彩色的，以便更好地标注要连接的对象。目前在虚幻引擎5中，暂时无法更改材质节点间连接线的颜色。

## 5 - 绘制地形材质

现已创建地形材质，接下来将该材质应用到地形，并开始使用地形绘制工具。

### 地形绘制准备

开始绘制地形前，需进行部分设置。首先需将地形材质应用到地形：

1.  首先，在 **内容浏览器** 中查找材质。材质应位于上一章节中创建的文件夹（**Materials**）内。找到后点击选中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a30ff1c-f6a4-422d-a070-568f925f5b51/33-t-landscape-materail-in-cb.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a30ff1c-f6a4-422d-a070-568f925f5b51/33-t-landscape-materail-in-cb.png)
    
    点击查看大图。
    
2.  在 **内容浏览器** 中选择地形材质后，在场景中选中地形。然后，在 **细节** 面板中，展开 **地形** 分段，查找 **地形材质** 输入。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/641e85e7-7572-43f5-a318-e414e013066d/34-t-landscape-material-input.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/641e85e7-7572-43f5-a318-e414e013066d/34-t-landscape-material-input.png)
    
    点击查看大图。
    
3.  使用 **使用内容浏览器中选中资产 （Use Selected Asset from the Content Browser）** 箭头图标将材质应用到地形。你可以将材质资产从 **内容浏览器** 中拖到 **细节** 面板并放到 **地形材质** 输入中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fd52ba8-5ad3-4670-9896-57734c0f889d/35-t-landscape-assign-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fd52ba8-5ad3-4670-9896-57734c0f889d/35-t-landscape-assign-material.png)
    
    点击查看大图。
    
4.  完成后，应可看到类似下图的效果：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ccc740e-7bbf-46f5-9161-2cc465083de2/36-t-landscape-with-material-applied.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ccc740e-7bbf-46f5-9161-2cc465083de2/36-t-landscape-with-material-applied.png)
    
    点击查看大图。
    
    如果你发现地形上有黑线，那是由于地形上未构建光照。如重新构建关卡光照，黑线便会消失。
    

现已应用地形材质，接下来开始绘制，但在此之前，须先创建和指定三个 **地形图层信息对象**。如尝试在指定 **地形图层信息对象** 前绘制，将会出现以下警告。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50bb327e-65e9-4602-941e-a7bcf57366f3/37-t-landscape-paint-warning.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50bb327e-65e9-4602-941e-a7bcf57366f3/37-t-landscape-paint-warning.png)

点击查看大图。

需创建三个 **地形图层信息对象**，分别针对要绘制的每一个纹理，具体操作如下。

1.  首先，确保处于 **地形绘制** 模式。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a09bc00-1db3-4c3c-abda-09dc32fd9467/38-t-landscape-paint-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a09bc00-1db3-4c3c-abda-09dc32fd9467/38-t-landscape-paint-mode.png)
    
    点击查看大图。
    
2.  在地形面板中， **目标图层（Target Layers）** 部分下，应能找到三个标为 **Soil, Grass** 和 **Snow** 的输入。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95eaea5f-a64d-4a04-afcd-5fc7ae9d0f5f/39-t-landscape-target-layers.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95eaea5f-a64d-4a04-afcd-5fc7ae9d0f5f/39-t-landscape-target-layers.png)
    
    点击查看大图。
    
3.  命名右侧有一 **加号** 图标。点击该图标将调出另一菜单，其将询问要添加图层的类型。在本例中，请选择 **权重混合图层（法线）（Weight-Blended Layer (normal)）** 选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6e90bc0-c169-41f1-9e71-33088ab2ba0d/40-t-landscape-blend-layer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6e90bc0-c169-41f1-9e71-33088ab2ba0d/40-t-landscape-blend-layer.png)
    
    点击查看大图。
    
4.  选择 **权重混合图层（法线）** 选项时，弹出提示框将询问新建 **地形图层信息对象** 保存的位置。选择 **Landscape文件夹** 下的 **Resources** 文件夹，然后按 **OK** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4bef9f9f-e31f-4422-8a77-f92084e2958d/41-t-landscape-layer-info-save.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4bef9f9f-e31f-4422-8a77-f92084e2958d/41-t-landscape-layer-info-save.png)
    
    点击查看大图。
    
5.  完成首项操作后，对另外两个项目重复相同操作。完成后，应可看到类似下图的效果：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3016a58d-8954-416f-9a38-4d0bf49ef999/42-t-landscape-finshed-layers.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3016a58d-8954-416f-9a38-4d0bf49ef999/42-t-landscape-finshed-layers.png)
    
    点击查看大图。
    

现已创建并应用了 ##地形图层信息对象##，可开始绘制地形。

### 绘制地形

开始绘制地形前，先讲解一下绘制地形时最常用的键盘和鼠标输入组合。

**常用功能按钮**

**操作**

鼠标左键

执行笔划将选中工具的效果应用到所选图层。

##Ctrl+Z##

撤销上一笔划。

##Ctrl+Y##

重做撤销的上一笔划。

将纹理实际应用到地形时使用的主要工具是 **绘制工具**。欲了解可用于绘制地形的所有工具，请查看[绘制模式](/documentation/zh-cn/unreal-engine/landscape-paint-mode-in-unreal-engine)文档。

要将材质应用到地形，按住 **鼠标左键** 将选中材质应用到笔刷下方区域。

要选择需绘制的新纹理，先进入 **地形绘制模式**，然后在 **目标图层** 部分下点击列表中要绘制的纹理并将其选中。高亮显示的纹理将被绘制到地形上。在下图中，**Soil** 图层高亮显示，表示其为要绘制到地形上的纹理。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/070a29eb-4be0-4f7f-93e6-9f34a07cbdc3/43-t-landscape-picking-layers-to-paint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/070a29eb-4be0-4f7f-93e6-9f34a07cbdc3/43-t-landscape-picking-layers-to-paint.png)

点击查看大图。

完成绘制后，应可看到类似下图的效果。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d25c0c3-7257-42ca-b757-c668e8a4157e/44-t-landscape-final-paint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d25c0c3-7257-42ca-b757-c668e8a4157e/44-t-landscape-final-paint.png)

点击查看大图。

### 潜在问题和解决方法

开始绘制地形时，可能会遇到如基本材质消失或变黑等问题，如下图所示：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72c0c738-0392-48f0-8b16-c687d1c6e9df/45-t-first-paint-issues.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72c0c738-0392-48f0-8b16-c687d1c6e9df/45-t-first-paint-issues.png)

点击查看大图。

发生此类情况是由于开始绘制时，地形上没有绘制图层数据。要解决此问题，需继续绘制地形，操作以生成绘制图层数据。如要填充整个地形，首先选择大型笔刷尺寸，例如8192.0，选取要用作基础的图层，然后在整个地形上绘制一次。此操作可创建绘制图层数据，以便继续进行绘制，而材质不会变黑。

另一个潜在问题是地形上使用的纹理缩放过大或过小。要解决此问题，需要打开地形材质，然后选择 **Landscape Coords** 节点。选中后，调整 **细节** 面板中的 **映射缩放（Mapping Scale）** 并保存材质。编译后，在视口中检查缩放。如对缩放效果不满意，重复上述过程直到获得理想效果。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffe1b139-be44-439b-89ca-3292aff22ea9/46-t-landscape-texture-size.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffe1b139-be44-439b-89ca-3292aff22ea9/46-t-landscape-texture-size.png)

点击查看大图。

以下是两种 **映射缩放** 的对比效果，左侧为 **0.5**，而右侧为 **5.0**。

![映射缩放: 0.5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97ed9bc7-d0dd-4e33-8a0b-cbf6f375328a/47-mapping-scale-0-5.png "Mapping Scale: 0.5")

![映射缩放: 5.0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fe829fe-c6bf-4689-8ecc-d21a7818635c/48-mapping-scale-5-0.png "Mapping Scale: 5.0")

映射缩放: 0.5

映射缩放: 5.0

## 6 - 地形提示和技巧

以上快速入门教程已对设置和运行地形的基础知识进行了讲解，但对地形工具的介绍却十分浅显。此章节旨在展示部分地形工具的使用提示和技巧，及生成地形所需外部工具。

### 提示和技巧

-   使用 **绘制工具** 时，相较使用 **Shift** + **鼠标左键** 进行擦除，直接对要擦除的区域进行整体绘制将更为简单。
-   使用 **Alpha笔刷** 时，记住可从 **纹理通道（Texture Channel）** 下拉菜单中选择其他RGB通道来更改笔刷图案。可将最多三种不同Alpha图案打包到单个纹理中，因此此操作将十分方便。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00a396ba-87e3-4d38-baa9-3daa149a1342/49-t-landscape-tips-tricks-00.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00a396ba-87e3-4d38-baa9-3daa149a1342/49-t-landscape-tips-tricks-00.png)
    
    点击查看大图。
    
-   地形根据组件上绘制的图层，分别编译各组件的着色器。因此，假设拥有之上有泥土图层的组件，但该组件上并未绘制草地图层，该组件的材质将忽略草地图层的纹理，从而降低渲染开销。因此进行优化时，可检查地形，寻找并移除只有少量给定图层的组件，降低材质复杂度。
-   绘制图层时还需注意另一问题：避免在同一组件上绘制过多纹理。材质编辑器统计数字显示允许使用的纹理样本数量限制。但对地形材质而言，每层的遮罩也将被视为纹理取样而不会在统计数据中体现。如在组件上绘制新图层时出现默认纹理（灰色方块），原因可能是超过了纹理样本的数量限制、需要移除一个图层、或需要对材质进行优化（使用更少的纹理）。
-   可更改单个地形组件的LOD距离因子，以便其在较近或较远的距离阈值中进行简化。逐渐远离山顶或其他拥有独特轮廓的地形时，将对最明显的区域进行LOD，因此可减少这些组件的LOD偏差，保留其形状。也可增加低精度区域（如平原等在拥有较少曲面细分时也不会存在较大差别的区域）的LOD偏差。

### 世界场景构成

在虚幻引擎4（UE4）中，可使用 **世界场景构成（World Composition）** 工具对地形进行简单管理，并创建巨大的世界场景。世界场景构成的设计理念是为简化大型世界场景（尤其是使用地形系统创建的世界场景）的管理。欲了解世界场景构成工具的更多信息，请参考此处提供的官方文档：

[世界场景构成文档](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine)

### 外部创建工具

虽然默认地形工具可以满足造型和绘制的所有需求，但有时需要对地形外观和风格进行更深入的调整。可以使用以下软件包实现地形工具无法达到的效果。

 

 

[Houdini](https://www.sidefx.com/)

Houdini中的程序化地形生成使用高度场节点集，可使用图层形状和添加噪点来定义数字地形的外观。使用高级侵蚀工具可以更好地控制诸如河流线、河岸、砂石等细节，而全新的分级群聚功能可以更高效地将元素放入地形。然后，就可以导出高度和/或蒙版图层，在UE4中创建地形，或将地形网络打包为Houdini数字资产，并使用Houdini引擎插件在UE4中打开。当数字资产包含高度场节点时，它们可以与虚幻引擎本身的地形工具无缝集成。

[Mudbox](http://www.autodesk.com/products/mudbox/overview)

Mudbox主要用于数字造型和3D网格体绘制，但也可为地形生成高度图数据。查看Mudbox官方网站的详细信息，实现真实地形效果。

[Terragen](http://planetside.co.uk/)

Terragen是另一款强大的全程序化地形创建软件。和World Machine相似，其可对地形的高度图和纹理进行构建、纹理处理和导出。查看Terragen官方网站的详细信息，实现真实地形效果。

[World Machine](http://www.world-machine.com/)

World Machine是一款强大的程序化地形创建软件。其可对地形的高度图和纹理进行构建、纹理处理和导出。查看World Machine官方网站的详细信息，实现真实地形效果。

[ZBrush](http://pixologic.com/)

Zbrush是另一款数字造型和3D网格体绘制软件，也可为地形生成高度图数据。查看Zbrush官方网站的详细信息，实现真实地形效果。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [open world](https://dev.epicgames.com/community/search?query=open%20world)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 使用地形工具](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#1-%E4%BD%BF%E7%94%A8%E5%9C%B0%E5%BD%A2%E5%B7%A5%E5%85%B7)
-   [打开地形工具并使用模式](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#%E6%89%93%E5%BC%80%E5%9C%B0%E5%BD%A2%E5%B7%A5%E5%85%B7%E5%B9%B6%E4%BD%BF%E7%94%A8%E6%A8%A1%E5%BC%8F)
-   [与地形工具互动](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#%E4%B8%8E%E5%9C%B0%E5%BD%A2%E5%B7%A5%E5%85%B7%E4%BA%92%E5%8A%A8)
-   [2 - 新建地形](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#2-%E6%96%B0%E5%BB%BA%E5%9C%B0%E5%BD%A2)
-   [新建FPS蓝图项目](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#%E6%96%B0%E5%BB%BAfps%E8%93%9D%E5%9B%BE%E9%A1%B9%E7%9B%AE)
-   [创建地形](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%9C%B0%E5%BD%A2)
-   [3 - 塑造地形](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#3-%E5%A1%91%E9%80%A0%E5%9C%B0%E5%BD%A2)
-   [4 - 创建地形材质](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#4-%E5%88%9B%E5%BB%BA%E5%9C%B0%E5%BD%A2%E6%9D%90%E8%B4%A8)
-   [文件夹设置](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#%E6%96%87%E4%BB%B6%E5%A4%B9%E8%AE%BE%E7%BD%AE)
-   [迁移纹理](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#%E8%BF%81%E7%A7%BB%E7%BA%B9%E7%90%86)
-   [创建地形材质](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%9C%B0%E5%BD%A2%E6%9D%90%E8%B4%A8)
-   [5 - 绘制地形材质](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#5-%E7%BB%98%E5%88%B6%E5%9C%B0%E5%BD%A2%E6%9D%90%E8%B4%A8)
-   [地形绘制准备](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#%E5%9C%B0%E5%BD%A2%E7%BB%98%E5%88%B6%E5%87%86%E5%A4%87)
-   [绘制地形](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#%E7%BB%98%E5%88%B6%E5%9C%B0%E5%BD%A2)
-   [潜在问题和解决方法](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#%E6%BD%9C%E5%9C%A8%E9%97%AE%E9%A2%98%E5%92%8C%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95)
-   [6 - 地形提示和技巧](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#6-%E5%9C%B0%E5%BD%A2%E6%8F%90%E7%A4%BA%E5%92%8C%E6%8A%80%E5%B7%A7)
-   [提示和技巧](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#%E6%8F%90%E7%A4%BA%E5%92%8C%E6%8A%80%E5%B7%A7)
-   [世界场景构成](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#%E4%B8%96%E7%95%8C%E5%9C%BA%E6%99%AF%E6%9E%84%E6%88%90)
-   [外部创建工具](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine#%E5%A4%96%E9%83%A8%E5%88%9B%E5%BB%BA%E5%B7%A5%E5%85%B7)