# 虚幻引擎中的摄像机晃动 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:13:43.414Z

---

目录

![摄像机晃动](https://dev.epicgames.com/community/api/documentation/image/537791e3-d640-4da5-9bf3-cb2c1edef976?resizing_type=fill&width=1920&height=335)

你可以使用虚幻引擎的摄像机晃动蓝图向摄像机添加摄像机晃动效果。本指南概述了如何创建 **CameraShakeBase** 蓝图、可用晃动类型以及如何在Sequencer、蓝图和摄像机晃动源中播放它们。

#### 准备工作

-   你已了解 **[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)** 并知道如何 **[创建摄像机动画](/documentation/zh-cn/unreal-engine/how-to-animate-cinematic-cameras-in-unreal-engine)**。
    
-   你已了解 **[蓝图可视化脚本](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)**。
    
-   如果使用的是基于序列的自定义晃动，则必须了解 **[使用模板序列](/documentation/zh-cn/unreal-engine/template-sequences-in-unreal-engine)**。
    
-   如果希望在游戏中测试摄像机晃动，则可以使用 **[第三人称模板](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine)** 创建一个项目。
    

## 摄像机晃动创建

要创建晃动资产，点击 **[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)** 中的 **添加/导入**，然后选择 **蓝图类**。在下一个窗口中，找到或搜索 **CameraShakeBase** 类，然后点击 **选择**。

![create camera shake base](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d013c189-db8f-44ac-b6c8-b8e40f1b4aaf/createshake.png)

创建资产后，命名并打开它以查看摄像机晃动细节。

![shake blueprint details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2dd70d41-f79b-49b6-9914-a89de551d05a/openshake.png)

### 细节

摄像机晃动资产拥有以下基本细节：

名称

说明

**单个实例（Single Instance）**

启用此选项仅允许播放此晃动的单个实例一次。随后尝试播放此晃动将重新启动它，而不是额外分层。

**根晃动模式（Root Shake Pattern）**

要使用的[**晃动类型**](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#%E6%A0%B9%E6%99%83%E5%8A%A8%E6%A8%A1%E5%BC%8F%E7%B1%BB%E5%9E%8B)。

## 根晃动模式类型

晃动模式控制摄像机晃动的形状和行为。你可以从以下模式中选择，从而创建摄像机晃动。

### Perlin噪声

通过基于指定的振幅和频率对随机点进行采样，可以生成随时间变化的Perlin噪声。使用 **[Smoothstep](https://en.wikipedia.org/wiki/Smoothstep)** 将这些点混合到缓动函数。通常，Perlin噪声对于高强度摄像机晃动（如隆隆声或附近的爆炸）会非常有用。

![perlin noise graph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed1d1561-bbb9-4e5f-b083-19022c8590c1/perlin.png) ![perlin camera shake example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afc49d97-f1b0-4510-a7f9-fbf3c2f2fb47/perlinexample.gif)

当你把 **根晃动模式** 设置成 **Perlin噪声摄像机晃动模式** 时，将显示可用于控制Perlin噪声晃动行为的其他细节。可以为摄像机的位置、旋转和视野（FOV）属性创建晃动效果。

![perlin noise camera shake pattern](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9028d602-c7b8-4990-a688-f82be53e2349/perlindetails.png)

**位置** 和 **旋转** 属性类别都会显示各自的轴，你可以展开它们来显示 **振幅** 和 **频率** 属性。

-   **振幅** 控制晃动模式的大小。增加该值将导致该轴上的晃动从中心移动更大的距离。
    
-   **频率** 控制晃动的速度。增加该值将使晃动的移动速度加快。
    

![shake amplitude frequency](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d198ddda-f586-49a6-9e01-3ffdad3506c1/axisampfreq.png)

此外，你可以使用 **振幅** 和 **倍频器** 属性，将位置和旋转轴上的组合振幅和频率结果相乘。如果希望对晃动进行全局更改而无需更改每个轴，这些属性会非常有用。

![multiply amplitude frequency](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80f3d638-9915-4a8f-aaae-1e0a60b5d8a5/perlinmultipliers.png)

展开 **定时** 类别可以控制晃动的定时。

-   **时长** 控制晃动的长度。如果为0或小于0，则晃动将无限播放。
    
-   **混合输入/输出时间** 控制晃动开始和结束时的线性混合长度。0值表示不会发生混合。
    

![perlin noise timing details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d2b1c70-35a0-4684-8abf-40ab29af6a38/perlintiming.png)

### 正弦波

正弦波使用拥有平滑周期振荡的连续波生成随时间变化的噪声。通常，波噪声对于较低强度的晃动非常有用，如摇摆的船或梦幻般的漂流效果。

![sine wave graph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8492c576-d570-444d-bce1-2ad9a195d81f/wave.png) ![sine wave camera shake example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5403bf8f-8373-4362-a6aa-330c460320c8/waveexample.gif)

当你为 **根晃动模式** 选择 **波形振荡器摄像机晃动模式** 时，将显示额外的细节，这可用于控制波的晃动行为。与Perlin噪声类似，可在摄像机的位置、旋转和视野（FOV）属性上创建波晃动效果。

![wave oscillator camera shake pattern details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c646dd98-41b5-4d6e-ae61-eb058ebbeebe/wavedetails.png)

正弦波噪声的 **位置**、**旋转**、**视野** 和 **定时** 的属性与[**Perlin噪声**](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#perlin%E5%99%AA%E5%A3%B0) 相同。但在展开轴时，还有一个名为 **初始偏移类型** 的额外属性，如果希望你的波形从 **零** 或曲线上的 **随机** 点开始，则可指定该属性。

![sine wave initial offset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b29a6716-e4a3-4160-9ed1-7b430c79b20d/waveoffset.png)

### 序列晃动

序列晃动使用[**摄像机动画序列**](/documentation/zh-cn/unreal-engine/template-sequences-in-unreal-engine#cameraanimationsequence)中包含的摄像机动画生成晃动。如果希望完全控制摄像机晃动的样式和行为，序列噪声会非常实用。

![sequence shake graph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c46ab39-8ac3-42aa-9e2a-57b4b555023a/cenoise.png)

为**根晃动模式** 选择 **序列摄像机晃动模式** 时，将显示其他细节，可以用其来选择摄像机动画序列资产并控制其行为。晃动的时长基于摄像机动画序列的长度。

![sequence camera shake pattern details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d6ed24d-7a8a-4f81-8aa7-2711fd12e9be/sequenceshakedetails.png)

名称

说明

**序列**

指定[**摄像机动画序列资产**](/documentation/zh-cn/unreal-engine/template-sequences-in-unreal-engine#cameraanimationsequence)。

**播放速率**

晃动效果的速度。值为1表示正常速度，小于1的值将使晃动播放速度变慢，大于1的值将使晃动播放速度变快。

**比例**

应用于晃动强度的乘数。值为1表示正常强度，小于1的值表示强度更低，大于1的值表示强度更高。

**混合输入/输出时间**

**混合输入/输出时间** 控制晃动开始和结束时的线性混合长度。0值表示不会发生混合。

**随机片段时长**

启用 **随机片段** 时使用的随机片段时长。

**随机片段**

启用此选项将开始播放摄像机动画序列中的随机点的晃动。你还必须在 **随机片段时长** 属性中设置一个值，以定义晃动的新长度。如果拥有的摄像机晃动动画较长，并且希望从中随机播放较小的片段，此选项会非常实用。

与典型 **模板序列** 工作流不同的是，当创建用作摄像机晃动模式的摄像机动画序列时，无需将该小节设为附加。

### 合成

合成晃动可将 **Perlin**、**波** 和 **序列** 晃动组合到一个层系统中。使用合成晃动可以创建包含来自每种晃动类型的元素的更多元的晃动。

![composite shake example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5226d0bc-d90d-4eab-be1f-a2fcb8e45ea7/compositeexample.gif)

当你为 **根晃动模式** 选择 **合成** **摄像机晃动模式** 时将显示更多细节，可以用其来添加子模式并将不同的晃动类型分层在一起。

![composite camera shake pattern details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dae4ccf9-b307-4d42-8301-f80105a230ee/compositedetails.png)

点击 **子模式** 旁边的 **+** 按钮将向数组添加新的晃动模式。你可以添加任意数量的晃动模式。每个元素都包含与该模式相关的细节。

![composite shake array](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10f5a426-976f-4f28-888e-5dc3ae7b7408/compositearray.png)

## 播放晃动

创建摄像机晃动后，有几种方法可以播放。

### 从Sequencer播放

点击 **电影摄像机Actor** 轨道上的 **\+ 轨道** 按钮，并在 **摄像机晃动** 菜单中选择摄像机晃动资产，可将晃动添加到Sequencer中的摄像机。

![sequencer camera shake](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cc88f2d-9fce-4b19-b0c3-37f58c12c1db/addshakeseq.png)

你还可以将晃动添加到 **摄像机组件** 轨道，从而产生相同的结果。

![sequencer camera component shake](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed6ecbb7-9c14-40b5-9647-3583de6209b0/addshakecomp.png)

添加后，你可以播放序列以查看晃动效果。

![sequencer camera shake example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ff83c52-8a34-4e5e-9b60-d0b69b41e538/seqshake.gif)

摄像机晃动小节包含由蓝图细节确定的时长和混合输入/输出时间的可视化。更改这些属性将更新小节显示。

![sequencer shake section visualize](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc2b2cbf-3a6b-4b80-9bda-753a899b1e79/sectionediting.gif)

右键点击"晃动"小节并导航到 **属性** 菜单将在Sequencer中显示晃动属性。

![sequencer shake section details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/821ed461-c8f2-49db-94b2-5ee340bef5c1/sectiondetails.png)

名称

说明

**晃动类**

指定要使用的晃动蓝图类。如果其他资产可用，可以将此晃动更改为其他资产。

**播放比例**

晃动强度的全局乘数。值为1表示正常强度，小于1的值表示强度更低，大于1的值表示强度更高。

**播放空间**

指定晃动应处于的坐标空间。

-   **本地摄像机** 将导致相对于摄像机位置进行晃动，使其成为附加晃动。
-   **世界** 将使晃动坐标相对于关卡的坐标。
-   **用户定义** 将使晃动旋转坐标相对于 **用户定义的游戏空间** 中指定的坐标。

**用户定义的播放空间**

将 **播放空间** 设为 **用户定义** 时，你可以在此处输入旋转坐标，该坐标相对于 **世界旋转** 坐标，但拥有指定的偏移量。

### 从蓝图播放

你还可以使用 **Start Camera Shake** 节点，从蓝图播放晃动。该节点包含用于指定 **晃动**、**比例** 和 **播放空间** 的参数。

![start camera shake blueprint node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/deb44d68-5d74-48f7-bf20-813c491bfad0/shakebp1.png)

"Start Camera Shake"函数需要 **玩家控制器** 或 **摄像机晃动源组件** 作为目标。

## 摄像机晃动源

**摄像机晃动源** 会基于摄像机与某个位置的接近程度来触发摄像机晃动。它还包含控制晃动影响的大小和半径。你可以在你的关卡中将其添加为 **Actor**，或在蓝图中添加为 **组件**。

要将 **摄像机晃动源Actor** 添加到你的关卡，请将其从 **[放置Actor](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)** 面板拖到关卡中。

![camera shake source actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0bf78b6-5251-403d-8234-7ee0f615daa2/addsourceactor.png)

选择Actor或组件将显示以下细节：

![camera shake source actor details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a54af46f-db7f-4298-b9f7-4ee585301c4a/sourcedetails.png)

名称

说明

**衰减**

摄像机离源越来越近或越来越远时的衰减曲线类型。这可以是 **二次**（提供一个简单的输入和输出混合），也可以是 **线性**（提供一个线性混合）。

**内衰减半径**

晃动将在其中以最大强度播放的源的半径。

**外衰减半径**

晃动不再可见的源的半径。当摄像机在外内半径之间移动时，晃动将在其间混合其强度。

**摄像机晃动**

要使用的晃动蓝图类。

**自动启动**

启用此选项将导致在玩游戏时自动启动晃动。

### 循环晃动示例

通过执行以下操作，可以快速创建源晃动效果：

1.  在 **摄像机晃动蓝图** 中，将所有 **定时** 属性设为0。这将使晃动循环无限进行，无混合。此外，这还可确保为轴设置了适当的振幅和频率，以便晃动可见。
2.  将蓝图指定给摄像机晃动源 **摄像机晃动** 属性，并启用 **自动开始**。

![source shake setup](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2c9df0d-f5e1-44c8-81aa-969ef7f10081/sourceshakesetup.png)

现在，只要玩游戏并接近源点，你就会看到，随着摄像机进入摄像机晃动源的影响，晃动混合打开和关闭。

![distance shake example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ee8163d-5c75-4328-80a5-41baed46e873/sourceshakeexample.gif)

### 摄像机晃动预览器

摄像机晃动预览器可用于预览编辑器中的[**摄像机晃动源**](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#camerashakesource) 而无需开始游戏或模拟。

要打开预览器，导航到"虚幻编辑器"主菜单，然后选择 **窗口 > 摄像机晃动预览器**。

![camera shake previewer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed19bee7-2f57-4c0d-a1e8-2d11f15b68ec/openpreviewer.png)

要在编辑器中播放摄像机晃动，你需要启用"视口选项"菜单中的 **允许摄像机晃动**。

![allow camera shakes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef7e7067-80c6-48df-8643-7870af0149ef/allowcamerashakes.png)

接下来，选择要预览的晃动源条目，然后点击 **播放/停止选定项** 以启用晃动预览。如果要同时预览多个源，也可以点击 **播放/停止全部**。一旦播放，你可以将编辑器的摄像机移向源，并查看晃动效果。

![camera shake previewer example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03a484ee-fe1e-4062-ba45-84969a6899f8/shakepreviewexample.gif)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [camera](https://dev.epicgames.com/community/search?query=camera)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [准备工作](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)
-   [摄像机晃动创建](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E6%99%83%E5%8A%A8%E5%88%9B%E5%BB%BA)
-   [细节](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#%E7%BB%86%E8%8A%82)
-   [根晃动模式类型](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#%E6%A0%B9%E6%99%83%E5%8A%A8%E6%A8%A1%E5%BC%8F%E7%B1%BB%E5%9E%8B)
-   [Perlin噪声](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#perlin%E5%99%AA%E5%A3%B0)
-   [正弦波](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#%E6%AD%A3%E5%BC%A6%E6%B3%A2)
-   [序列晃动](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#%E5%BA%8F%E5%88%97%E6%99%83%E5%8A%A8)
-   [合成](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#%E5%90%88%E6%88%90)
-   [播放晃动](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#%E6%92%AD%E6%94%BE%E6%99%83%E5%8A%A8)
-   [从Sequencer播放](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#%E4%BB%8Esequencer%E6%92%AD%E6%94%BE)
-   [从蓝图播放](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#%E4%BB%8E%E8%93%9D%E5%9B%BE%E6%92%AD%E6%94%BE)
-   [摄像机晃动源](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E6%99%83%E5%8A%A8%E6%BA%90)
-   [循环晃动示例](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#%E5%BE%AA%E7%8E%AF%E6%99%83%E5%8A%A8%E7%A4%BA%E4%BE%8B)
-   [摄像机晃动预览器](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E6%99%83%E5%8A%A8%E9%A2%84%E8%A7%88%E5%99%A8)