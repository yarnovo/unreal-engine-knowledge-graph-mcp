# 虚幻引擎中的Niagara图像序列视图烘焙器快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:30:08.942Z

---

目录

![Niagara图像序列视图烘焙器快速入门指南](https://dev.epicgames.com/community/api/documentation/image/d9f3b2ec-6f6c-45a2-86cc-0ec54b3c4242?resizing_type=fill&width=1920&height=335)

**Niagara系统（Niagara systems）** 可以创建令人震撼的视觉效果。但是，在设计粒子效果时，你必须兼顾视效与性能。有时，你可能创建了很不错的效果，但发现在目标设备上使用时占用了太多内存。

其中一种解决方案是，将Niagara模拟烘焙成 **图像序列视图（Flipbook）** 。这样会创建许多平铺图像，并加载到材质上，以此作为特效。

例如，你想创建3D流体效果，但无法在目标平台上实时运行它。因此，在创建该3D流体效果之后，你可以使用 **烘焙器（Baker）** 将其烘焙成图像序列视图，然后将其应用回2D Sprite发射器。这样一来，你就可以让游戏背景中远处的次要特效拥有更高效的性能。

## 目标

在本教程中，我们将使用Niagara烘焙器，从粒子模拟效果中导出图像序列视图。

## 目的

-   设置图像序列视图的捕获
    
-   执行捕获
    
-   将图像序列视图连接到新发射器
    

## 设置捕获

1.  在 **Niagara编辑器（Niagara Editor）** 中打开现有Niagara系统。本示例使用了 **网格3D气体彩色烟雾（Grid 3D Gas Colored Smoke）** 示例，但你可以使用任意Niagara系统。要使用网格3D气体彩色烟雾，请右键点击 **内容侧滑菜单（Content Drawer）** 并选择 **创建基本资产（Create Basic Asset） > Niagara系统（Niagara System）** 。
    
    ![Creating a new Niagara system.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21f45fe0-8a3a-499d-bae6-1afd1dc1f869/niagara-flipbook-baker-1.png)
2.  从Niagara流体模板创建图像序列视图。这些模板在你启用了Niagara流体插件时可用。但是，图像序列视图可以从任意Niagara系统生成。在左侧菜单中选择 **Niagara流体（Niagara Fluids）> 3D气体（3D Gas）**，然后选择 **网格3D气体彩色烟雾（Grid 3D Gas Colored Smoke）** 并点击 **创建（Create）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fe5668c-d61e-4fc7-8f07-a3175c79939b/niagara-flipbook-baker-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fe5668c-d61e-4fc7-8f07-a3175c79939b/niagara-flipbook-baker-2.png)
    
    点击查看大图。
    
3.  在 **主工具栏（main toolbar）** 上，有一个名为 **烘焙器（Baker）** 的新按钮。选择 **打开烘焙器选项卡（Open Baker Tab）** 以显示 **烘焙器面板（Baker panel）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe713b6b-832f-4b16-85e7-2c304f77a1fd/baker-button.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe713b6b-832f-4b16-85e7-2c304f77a1fd/baker-button.png)
    
    点击查看大图。
    

### 浏览用户界面

烘焙器面板用户界面有以下部分。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0680e84d-6e06-4afa-8c86-8aae7da2f0d4/baker-panel-ui.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0680e84d-6e06-4afa-8c86-8aae7da2f0d4/baker-panel-ui.png)

点击查看大图。

1.  烘焙按钮
    
2.  Niagara预览
    
3.  图像序列（Flipbook）视图预览
    
4.  播放工具栏
    
5.  图像序列视图选项
    

### 将Niagara预览序列帧化

首先，你需要将 **Niagara预览（Niagara Preview）** 窗口中的粒子模拟序列帧化。这会将模拟烘焙到一系列扁平的2D帧，因此请确保设置了所需的角度和大小。

要调整序列帧，你可以直接在Niagara预览窗口中点击和拖动它们。

-   左键点击并拖动以环绕。
    
-   中键点击并拖动以平移。
    
-   右键点击并拖动以缩放。
    
-   点击 **F** ，使帧以系统原点为中心。
    

你还可以在 **摄像机（Camera）** 设置中输入数字值。选择所需的 **摄像机视口模式（Camera Viewport Mode）** ，然后在对应字段中编辑数字值。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f995d0e-abfc-48aa-b1e4-8fe1842f2dcf/camera-viewport-mode-perspective.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f995d0e-abfc-48aa-b1e4-8fe1842f2dcf/camera-viewport-mode-perspective.png)

点击查看大图。

### 调整时序

使用 **播放工具栏（Playback Toolbar）** 播放、暂停、前进和后退模拟，以预览将烘焙的内容。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3b09491-d9a9-45b0-8b9d-7945e75c55f4/playback-toolbar.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3b09491-d9a9-45b0-8b9d-7945e75c55f4/playback-toolbar.png)

点击查看大图。

你还可以在 **时间轴（Timeline）** 设置中调整时序，只烘焙模拟的一部分。例如，调整 **开始秒数（Start Seconds）** 以在模拟播放开始一段时间后开始图像序列视图。调整 **时长秒数（Duration Seconds）** 以更改结束时间。

设置 **每秒帧数（Frames Per Second）** 以调整组件的函数更新率。通常，你应该不需要调整该值。请将其设置为针对你所编写的内容的相同值。Niagara系统编辑器默认为30 fps。将该值设置得太低可能导致同一个图像序列视图多次渲染，例如，如果你要在1秒内使用捕获的30个帧渲染图像序列视图，并将每秒帧数设置为20，那么你只会录制20个唯一帧，而不是30个。

### 调整纹理大小

按照图像序列视图进行烘焙的方式，它将导出平铺图像，其中每个图块表示图像序列视图的一个帧。你需要设置要将多少个图块映射到纹理，以及总纹理大小。默认情况下，纹理设置为X轴有8个图块，Y轴有8个图块，总纹理大小为1024 x 1024像素。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/047e1d69-3e2c-4729-8a9b-4fbeaff6376b/flipbook-tiling.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/047e1d69-3e2c-4729-8a9b-4fbeaff6376b/flipbook-tiling.png)

点击查看大图。

这意味着，每个图块的大小将是128 x 128像素。你可以在 **纹理（Texture）** 设置下调整这些值。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0406ee0a-0b9d-4f09-82e3-a97d567f5114/setting-tiling-frames-size.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0406ee0a-0b9d-4f09-82e3-a97d567f5114/setting-tiling-frames-size.png)

点击查看大图。

通过调整 **每个维度的帧数（Frames Per Dimension）** 来设置图块数量。通过更改 **纹理大小（Texture Size）** 来调整总体纹理的大小。

烘焙器不会缩放图块来适应最终分辨率。要获得理想结果，请确保图块数量可整除总体纹理大小。

例如，如果将每个维度的帧数设置为10 x 10，但将纹理大小保持在1024 x 1024，则系统会尝试将10个图块映射到1024。但是，这会导致每个图块的宽度为102.4像素，系统无法处理非整数像素。因此，系统会将每个图块映射到大小102，最终会在纹理右下角出现4个额外的填充像素。

这可能导致子UV贴图稍微有偏差，并导致图集在播放时抖动。要获得理想行为，请将纹理大小设置为2的幂，并将每个维度的帧数设置为可整除该纹理大小的数量。

### 设置额外纹理属性

默认情况下，当 **源绑定（Source Binding）** 设置为 **无（None）** 时，烘焙器将输出 **SceneColorHDR** 值。通常，这是所需的结果。但是，所有可用GBuffer和粒子属性都可用，并且你可以从源绑定的下拉菜单选择其中任一项。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d6a4bd4-2162-46cb-8c89-346939127405/source-binding.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d6a4bd4-2162-46cb-8c89-346939127405/source-binding.png)

点击查看大图。

在你生成第一个图像序列视图之前，**生成的纹理（Generated Texture）** 会设置为无（None）。执行第一个捕获之后，这将替换为你创建的新纹理。

## 执行捕获

你已经使用正确的组帧和时序将纹理设置为按你所需的方式显示，现在可以执行捕获。

1.  从Niagara预览（Niagara Preview）窗口，点击 **烘焙（Bake）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7452d4ac-b9a0-47da-a9fb-8baaebb47967/bake.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7452d4ac-b9a0-47da-a9fb-8baaebb47967/bake.png)
    
    点击查看大图。
    
2.  随着系统渲染图像序列视图，你现在会看到进度条。完成后，界面上将打开对话框，你可以命名纹理文件。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/682b68af-2639-46fd-91d0-36479c6deccd/name-texture.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/682b68af-2639-46fd-91d0-36479c6deccd/name-texture.png)
    
    点击查看大图。
    
3.  现在已经渲染好，你的新纹理替换了烘焙器（Baker）窗口的纹理设置中的活动纹理。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbd01048-2433-4afc-a92c-bf702276871a/generated-texture.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbd01048-2433-4afc-a92c-bf702276871a/generated-texture.png)
    
    点击查看大图。
    
    如果你使用 **生成的纹理（Generated Texture）** 下所选的此纹理生成另一个捕获，它将覆盖此纹理。
    
4.  如果你想生成纹理的新变体，请点击 **生成的纹理（Generated Texture）** 的下拉菜单，然后选择 **清除（Clear）** 。然后，你可以调整设置并创建新纹理。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcf3549f-22ca-4bab-9db7-e5de41c6972b/clear-generated-texture.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcf3549f-22ca-4bab-9db7-e5de41c6972b/clear-generated-texture.png)
    
    点击查看大图。
    

你已经导出了纹理，现在可以将其添加到任意新发射器。你还可以查看图像序列视图纹理的最终外观预览。

![比较烘焙的图像序列视图与实时Niagara系统。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5c60469-7ad9-4867-8742-00d8355ecef9/flipbook-comparison.gif)

## 在发射器中使用图像序列视图纹理

要在发射器中使用图像序列视图，你必须使用 **Sprite渲染器（Sprite Renderer）** 。

1.  要设置此项，请右键点击 **内容侧滑菜单（Content Drawer）** 并创建新 **Niagara系统（Niagara System）** 。
    
2.  选择 **基于所选发射器的新系统（New system from selected emitter(s)）**，然后选择 **简单Sprite爆炸（Simple Sprite Burst）** 。
    
3.  点击 **加号(+)** 添加发射器，然后点击 **完成（Finish）** 。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc832e33-c1b5-46e8-b7bc-b77a9b4a2498/simple-sprite-burst.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc832e33-c1b5-46e8-b7bc-b77a9b4a2498/simple-sprite-burst.png)

点击查看大图。

### 添加子UV动画模块

要添加你的图像序列视图，你需要在粒子更新（Particle Update）组中添加新模块，以及在Sprite渲染器上调整一些参数。

1.  首先，点击 **粒子更新（Particle Update）** 旁边的 **加号(+)** ，并选择 **子UV动画（Sub UVAnimation）** 。这会将模块添加到堆栈。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c543b84-b51f-4754-b626-2a4538b1b159/sub-uv-animation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c543b84-b51f-4754-b626-2a4538b1b159/sub-uv-animation.png)
    
    点击查看大图。
    
2.  调整模块属性中的 **开始帧** 和 **结束帧** 以匹配动画中的帧数。在本示例中，有8 x 8个帧，共计64个。由于开始帧是第0帧，请将设置保留为0和63。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44bfb815-7501-4690-9004-59c946acf6a1/start-end-frame.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44bfb815-7501-4690-9004-59c946acf6a1/start-end-frame.png)
    
    点击查看大图。
    

### 调整Sprite渲染器上的设置

1.  选择 **Sprite渲染器（Sprite Renderer）** 以调整属性。在 **子UV（Sub UV）** 分段的 **子图像大小（Sub Image Size）** 字段中指定网格中的图块数量。在本示例中，将其保留为8 x 8。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fb3e2b4-7e92-4a0d-896b-6874b7fb0f5f/sprite-renderer-sub-image-size.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fb3e2b4-7e92-4a0d-896b-6874b7fb0f5f/sprite-renderer-sub-image-size.png)
    
    点击查看大图。
    
2.  现在，你需要创建要用于链接子UV纹理的新材质，并将新材质添加到Sprite渲染器中。点击 **材质（Material）** 旁边的下拉菜单，然后选择 **创建新资产（Create New Asset） > 材质（Material）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12b9b759-24a2-42f2-b9b4-cefdc00c0bbc/sprite-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12b9b759-24a2-42f2-b9b4-cefdc00c0bbc/sprite-material.png)
    
    点击查看大图。
    
3.  界面上将显示一个对话框。命名你的材质，并选择保存位置。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6978af51-8e46-4cd5-bc96-9456ce7ce3ca/name-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6978af51-8e46-4cd5-bc96-9456ce7ce3ca/name-material.png)
    
    点击查看大图。
    
4.  在 **内容浏览器（Content Browser）** 中双击该材质，在 **材质编辑器（Material Editor）** 中将该材质打开。 在 **细节（Details）** 面板中，将 **混合模式（Blend Mode）** 设置为 **半透明（Translucent）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fec577cb-da10-4e3d-890e-50f35e767c03/blend-mode-translucent.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fec577cb-da10-4e3d-890e-50f35e767c03/blend-mode-translucent.png)
    
    点击查看大图。
    
5.  在 **材质编辑器（Material Editor）** 中，右键点击并搜索"texture sample"以添加 **TextureSample** 节点。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0153e3f4-4cbc-41c8-8ce6-d13579bdbc69/search-texture-sample-node.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0153e3f4-4cbc-41c8-8ce6-d13579bdbc69/search-texture-sample-node.png)
    
    点击查看大图。
    
6.  选择 **TextureSample节点** 。在 **细节（Details）** 面板中，将 **纹理（Texture）** 设置为图像序列视图烘焙器中保存的某个纹理。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf6229d8-d18c-48b3-8ded-5718cd8fb9eb/set-texture.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf6229d8-d18c-48b3-8ded-5718cd8fb9eb/set-texture.png)
    
    点击查看大图。
    
    默认情况下，颜色通道会预乘黑色。要避免Sprite出现黑色边缘，你可以使用除法节点将其从RGB通道删除。
    
7.  右键点击以添加 **Divide** 节点。
    
8.  将 **TextureSample** 节点中的 **RGB** 值连接到 **Divide** 节点上的 **A** 引脚，并将 **TextureSample** 中位列第一的 **A** 值连接到 **Divide** 节点上的 **B** 引脚。
    
9.  将 **Divide** 节点的输出连接到 **自发光颜色（Emissive Color）** 。
    
10.  最后，将 **TextureSample** 中位列第一的 **A** 值连接到材质上的 **不透明度（Opacity）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ab9819b-a9bc-4de3-bce7-911dfd95ca03/connect-blueprint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ab9819b-a9bc-4de3-bce7-911dfd95ca03/connect-blueprint.png)
    
    点击查看大图。
    

### 最终效果

你的材质已经在Sprite渲染器中正确设置，现在打开Niagara编辑器中的Niagara系统。现在你可以看到你所渲染的图像序列视图在预览窗口中播放。

![Niagara编辑器中的图像序列视图预览。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/308af3ce-1e4c-4b2f-8d26-1b818fd5a81c/flipbook-preview.gif)

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [设置捕获](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E6%8D%95%E8%8E%B7)
-   [浏览用户界面](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine#%E6%B5%8F%E8%A7%88%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2)
-   [将Niagara预览序列帧化](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine#%E5%B0%86niagara%E9%A2%84%E8%A7%88%E5%BA%8F%E5%88%97%E5%B8%A7%E5%8C%96)
-   [调整时序](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine#%E8%B0%83%E6%95%B4%E6%97%B6%E5%BA%8F)
-   [调整纹理大小](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine#%E8%B0%83%E6%95%B4%E7%BA%B9%E7%90%86%E5%A4%A7%E5%B0%8F)
-   [设置额外纹理属性](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E9%A2%9D%E5%A4%96%E7%BA%B9%E7%90%86%E5%B1%9E%E6%80%A7)
-   [执行捕获](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine#%E6%89%A7%E8%A1%8C%E6%8D%95%E8%8E%B7)
-   [在发射器中使用图像序列视图纹理](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine#%E5%9C%A8%E5%8F%91%E5%B0%84%E5%99%A8%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BA%8F%E5%88%97%E8%A7%86%E5%9B%BE%E7%BA%B9%E7%90%86)
-   [添加子UV动画模块](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%AD%90uv%E5%8A%A8%E7%94%BB%E6%A8%A1%E5%9D%97)
-   [调整Sprite渲染器上的设置](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine#%E8%B0%83%E6%95%B4sprite%E6%B8%B2%E6%9F%93%E5%99%A8%E4%B8%8A%E7%9A%84%E8%AE%BE%E7%BD%AE)
-   [最终效果](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine#%E6%9C%80%E7%BB%88%E6%95%88%E6%9E%9C)