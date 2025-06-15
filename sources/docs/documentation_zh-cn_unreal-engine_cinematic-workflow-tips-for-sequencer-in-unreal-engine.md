# 虚幻引擎中Sequencer的过场动画工作流程提示 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:14:47.032Z

---

目录

![过场动画快捷方式和提示](https://dev.epicgames.com/community/api/documentation/image/e78a14de-c95a-473e-bada-04d8beb7e17c?resizing_type=fill&width=1920&height=335)

为了提高你的过场动画工作效率，Sequencer编辑器中内置了若干快捷方式。本文档将介绍Sequencer的常见工作流程、如何克服问题及其他实用功能。

## 播放

### 空格键播放切换

默认情况下，仅当窗口焦点位于Sequencer上时，方可使用 **空格键** 作为热键来切换序列的播放。如果焦点在视口上，按空格键将循环切换各变换操控模式。

若要无视窗口焦点的位置用空格键切换Sequencer的播放，请执行以下步骤：

1.  打开[编辑器偏好设置](/documentation/zh-cn/unreal-engine/unreal-editor-preferences)窗口，并在 **通用（General）> 键盘快捷键（Keyboard Shortcuts）** 下找到 **在平移、旋转和缩放之间循环切换（Cycle Between Translate, Rotate, and Scale）** 。点击 **移除此绑定（X）（Remove this binding (X)）** 可将此快捷方式取消绑定。
    
    ![取消绑定空格键热键](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da92e54a-c13f-43e3-9143-d0f231b01ff2/spacebar1.png)
    
    你仍然可以通过按下 **Q** 、 **W** 、 **E** 和 **R** 分别启用 **选择** 、 **平移** 、 **旋转** 和 **缩放** ，使用热键在这些变换模式之间进行切换。
    
2.  从视口的 **视角（Perspective）** 菜单中，启用[过场动画视口](/documentation/zh-cn/unreal-engine/cinematic-viewport-controls-in-unreal-engine)。
    
    ![启用过场动画视口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1f467d1-cff1-4b07-8658-dce8cad436b4/spacebar2.png)
    
3.  现在，你可以在焦点位于Sequencer或过场动画视口上时按下 **空格键** ，播放将会正确切换。
    
    ![空格键播放切换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86b9a84f-fa82-4886-add3-10aaf823458c/spacebar3.gif)
    

### 非独占帧和独占帧

虚幻引擎内的动画使用"非独占"帧和"独占"帧的概念，这两个概念将确定是否对完整帧进行完全包含或求值。通常，在序列中定义 **开始帧** 和 **结束帧** 时，比如为[动画](/documentation/zh-cn/unreal-engine/cinematic-animation-track-in-unreal-engine)、[镜头](/documentation/zh-cn/unreal-engine/sequences-shots-and-takes-in-unreal-engine)或整个Sequencer播放时间定义这些帧时，这一点有重要意义。

对于Sequencer，开始帧为非独占帧，结束帧为独占帧，这会导致对直至结束帧的所有帧数据进行求值。在本例中，开始时间设置为 **0** ，结束时间设置为 **10** ，这意味着实际耗时为 **9.999** （重复）帧。换言之，它的求值一直持续到结束时间，但并未持续到底。这模仿了Adobe Premiere等大多数非线性编辑软件中常见的行为。

![Sequencer独占帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f4fd21e-dad7-4dcd-9a5e-f712f4712d6b/exclusive.png)

预计可以利用此功能实现以下行为：

-   启用 [**在擦除时将光标保持在播放范围内（Keep Cursor in Playback Range While Scrubbing）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E6%92%AD%E6%94%BE%E9%80%89%E9%A1%B9) 后，应该无法擦除或查看序列中的确切结束帧。虽然该帧上可能存在数据，但Sequencer永远不会到达它。在本例中，结束时间为 **0346** 帧，但播放仅到达 **0345\*** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b79df68-5195-48de-aac5-db5d039f8e0a/exclusive2.gif)
    
-   如果播放头位于两个分段接触的同一点（如镜头），则将显示下一个镜头而不是上一个镜头的数据。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/916993e0-413a-488a-b517-368c4306253e/exclusive3.png)
    
-   使用[影片渲染队列](/documentation/404)渲染图像序列时，结束帧将被排除在外。这意味着，如果序列包含帧 **0 - 50** ，图像序列将输出帧 **0 - 49** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3c68180-0bb6-4850-b8bb-26bef437c2fa/exclusive4.png)
    

Sequencer对非独占帧和独占帧的处理与[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)不同，后者同时包括开始帧和结束帧。导入动画FBX时，虚幻引擎将包括最终帧以外的少量数据，这会导致最终帧完全包括在内。如果对未编辑的动画分段末端的放大足够大的倍率，可以在Sequencer中观察到这一点。

![独占动画序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac047887-eb93-4d4c-b6bc-5549fd4e8c3d/exclusive5.gif)

但对动画执行修剪以及其他[分段编辑](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine#%E4%BA%92%E5%8A%A8%E5%92%8C%E6%98%BE%E7%A4%BA)操作将恢复Sequencer的结束帧独占行为。

## 工作流程快捷方式

### 鼠标中键擦除

与Autodesk Maya类似，你可以在时间轴中点击并拖动 **鼠标中键** ，从而更改当前时间，但不触发更新或求值。当你想将其他包围关键帧设置为相同的值但不同的时间时，此快捷方式可能会有帮助。以这种方式操控播放头时，它的颜色将变为 **黄色** ，表示序列未求值。

![鼠标中键擦除](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e45aed5-7cdb-4bd0-bd6d-a7dd2960d750/playheadmmb.gif)

### 将Actor添加到Sequencer

从[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)或通过[放置Actor](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)将新Actor拖入关卡时，按下某些键也会将其添加到Sequencer。根据按下的键，它会将Actor添加为[可生成或可拥有对象](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics)。

-   按住 **Ctrl** 会将新Actor作为可拥有对象添加到Sequencer。
-   按住 **Shift** 会将新Actor作为可生成对象添加到Sequencer。

![添加Sequencer Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ddde5d1-bc55-46d5-a653-75c142ea2043/addingactors.gif)

### 默认轨道

向Sequencer添加某些Actor时，你可能会注意到轨道是自动创建的。例如：

-   **[静态网格体Actor](/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine)** 将自动创建一条[**变换轨道**](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#transformtrack)。
    
    ![static mesh sequencer auto track](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eda7f11d-c2b0-41ee-9970-dd2e9c0a306c/staticmesh.png)
    
-   **[骨骼网格体Actor](/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine)** 将自动创建一条 [**变换轨道**](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#transformtrack) 和一条 **[动画轨道](/documentation/zh-cn/unreal-engine/cinematic-animation-track-in-unreal-engine)**。
    
    ![skeletal mesh sequencer auto track](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d17c3da0-ac4b-4e88-99e1-255b0f043802/skellymesh.png)
    
-   **[电影摄像机Actor](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)** 将自动创建一条 [**变换轨道**](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#transformtrack) 和一个 **摄像机组件**（带 **光圈**、**焦距** 和 **对焦距离** 属性轨道）。
    
    ![camera actor sequencer auto track](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5355aee5-a965-4fd8-aae6-c81225c22094/cinecamera.png)
    
-   **[光源Actor](/documentation/zh-cn/unreal-engine/light-types-and-their-mobility-in-unreal-engine)** 将自动创建 **光源组件**，带 **强度** 和 **光源颜色** 属性轨道。
    
    ![lights sequencer auto track](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22a374a0-6382-4a44-ab89-67ccca456427/light.png)
    

出现这种情况的原因是[**Sequencer插件项目设置**](/documentation/zh-cn/unreal-engine/cinematic-editor-and-project-settings-in-unreal-engine#%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)中的 **轨道设置**。可以打开 **项目设置** 窗口，并找到 **插件** 类别中的 **关卡Sequencer** 来查找这些设置。

![sequencer track settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6fcb84e-8c16-4c12-afad-0e62c016b257/projectsettings.png)

默认情况下，使用前面提到的轨道设置来填充 **轨道设置** 数组。你可以点击 **添加 (+)** 按钮来添加一个新的数组项目，每个数组拥有以下类别：

![add track setting](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c7b842e-9d42-4dd1-9c72-7f289e74a53b/tracksettingsadd.png)

名称

说明

**匹配Actor类**

你可以在此指定Actor类，以在将其添加到Sequencer时自动为其创建轨道。

![matching actor class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f933ed4c-338e-42c6-bb09-369c82f46f20/matchingclass.png)

**默认轨道**

此数组用于指定将 **匹配Actor类** 添加到Sequencer时添加的轨道。点击 **添加(+)** 按钮，然后点击下拉菜单浏览 **Sequencer** 轨道类型。

![default tracks](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/812c8b60-72a3-4e92-809e-4fd1267e229a/defaulttracks.png)

**排除默认轨道**

此数组用于指定不希望添加到此Actor类的轨道。如果指定其他轨道进行添加，如当你的类从父类继承时（该父类也在此指定了默认轨道），则可能需要使用此选项。

**默认属性轨道**

此数组用于指定将Actor添加到Sequencer时添加的属性轨道。点击 **添加(+)** 按钮将新属性项添加到数组中。

![default property tracks](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/496c6db1-e461-4b2c-a8d0-5b988fd876e3/propertytracks.png)

-   **组件路径** 用于指定要从中添加属性的Actor的组件。
-   **属性路径** 用于指定要自动添加的属性名称。

**排除默认属性轨道**

此数组用于指定不希望添加到此Actor类的属性轨道。如果指定其他轨道进行添加，如当你的类从父类继承时（该父类也在此指定了默认属性轨道），则可能需要使用此选项。

### 自动调整镜头大小

在内部调整镜头的开始和结束时间时，你可以使用 **自动调整大小（Auto Size）** 命令自动将父镜头分段与这些编辑匹配。要执行此操作，请右键点击镜头并选择 **编辑（Edit）> 自动调整大小（Auto Size）** 。如果你要对镜头重新定时，并希望镜头分段自动匹配而不需要手动重新修剪，可能适合使用此命令。

![自动调整镜头大小](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d36bebc-50d3-4786-a86d-d927c3d937e3/autosize.gif)

### Shift键对齐和对准

将分段资产拖动到Sequencer轨道上时，如[音频](/documentation/zh-cn/unreal-engine/cinematic-audio-track-in-unreal-engine)、[子序列](/documentation/zh-cn/unreal-engine/cinematic-subscequences-track-in-unreal-engine)或[动画](/documentation/zh-cn/unreal-engine/cinematic-animation-track-in-unreal-engine)轨道，按住 **Shift** 会将放下的分段对齐到播放头位置。

![shift键拖动](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b758a882-656c-4519-badc-e329f3d9f8ec/shift1.gif)

禁用 **对齐到按下的键（Snap to the Pressed Key）** 后，你仍然可以按住 **Shift** 并点击关键帧来将播放头与关键帧对齐。这样可以轻松执行后续操作，如更改此关键帧的数值或将其他关键帧与其对齐。

![shift键对准](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca8e7187-e827-478c-b5eb-aa261f343a11/shift2.gif)

## 工作流程提示

### 超宽显示器框架

使用不受约束的宽高比制作过场动画时，如果显示器的宽高比与最初预期的宽高比有很大不同，则可能会遇到镜头构图发生变化的情况。例如，如果在过场动画中创建了以下镜头：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8630f47-fc1e-41ad-b4ee-d7b34f188a55/aspectratio1.png)

然后，如果在超宽显示器上播放此镜头，宽高比的剧烈变化可能会严重破坏原始框架。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af23e24a-eae4-4d65-b180-bc3b6a199569/aspectratio2.png)

在这种情况下，维持垂直框架设置很重要，因此可以通过导航到 **关卡序列Actor（Level Sequence Actor）** 的"细节（Details）"面板并执行以下操作来解决此问题：

-   启用 **覆盖宽高比轴约束（Override Aspect Ratio Axis Constraint）**。
-   将 **宽高比轴约束（Aspect Ratio Axis Constraint）** 设置为 **维持Y轴FOV（Maintain Y-Axis FOV）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a853ca53-b760-4596-ad11-ddb22771c49c/aspectratio3.png)

完成后，垂直框架空间将受到限制，无论宽高比如何，都可以保持这些角色的框架。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d219a918-24e9-4878-ab1c-8a9a6c053025/aspectratio4.png)

## 预热渲染

使用[影片渲染队列](/documentation/404)（MRQ）创建预渲染序列时，可能需要"预热"每个镜头，才能正确渲染场景的各个方面。例如，一些常见问题可能包括：

-   粒子效果和其他效果在镜头开始时激活，而不是已处于激活状态。
-   布料和其他符合物理特性的实体在镜头开始时显示出明显的"停顿"。
-   镜头的第一个渲染帧可能会表现出明显的锯齿或其他时间瑕疵（噪点）。

你可以使用影片渲染队列内[抗锯齿渲染设置](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%8A%97%E9%94%AF%E9%BD%BF)中的各种预热属性来解决这些问题。根据具体情况，还可能需要考虑其他注意事项来确定最适合使用的设置。

### 粒子

在某些情况下，你可能希望粒子和其他效果在镜头开始之前已激活一段时间。虽然实时预览可能会显示正确的行为，但使用MRQ渲染可能会导致粒子系统在镜头开始时激活，而这是不希望发生的情况。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b06c4f35-7638-43a0-a1f3-7a6481afb87d/warmupparticle_off.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5dd2c719-f1b7-432a-a705-4bf245c448dc/warmupparticle_on.gif)

未预热的粒子

预热的粒子

对于这种粒子情况，你可以通过以下任一方式加以解决：

-   在镜头的开始时间创建粒子的激活（Activate）关键帧，然后使用 **引擎预热计数（Engine Warm Up Count）** 设置帧数值。该数值可以是任意值，具体取决于粒子预热所需的帧数。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/150d591d-9482-4a84-9fd8-ad52eb36587a/warmupparticle1.png)
    
-   你也可以创建粒子的激活（Activate）关键帧或将其连同[镜头切换](/documentation/zh-cn/unreal-engine/cinematic-camera-cut-track-in-unreal-engine)分段一并移动到序列的 **预开始** 区域。然后，启用 **使用镜头切换进行预热（Use Camera Cut for Warm Up）** 。这将导致预热时间由镜头切换（Camera Cut）轨道分段占据的预开始区域定义。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf514cf6-76fe-4dc1-8aa5-bdc58ee09d4b/warmupparticle2.png)
    

如果你的粒子 **基于GPU** ，则还需要启用 **渲染预热帧（Render Warm Up Frames）** 。

![渲染预热帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a53b6318-5cb4-4370-a54a-5f854063d892/warmupparticle3.png)

### 布料和物理效果

对于布料和其他物理对象，在渲染时它们往往会在镜头开始时有明显的停顿。这是由于要等到渲染开始时游戏模拟才会开始，因此物理效果需要时间来稳定地呈现真实的模拟状态。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3203a360-382a-4844-8aff-b1b770cb6ac2/warmupcloth_off.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b22f2f3-5d18-4735-aec5-a9cba81fb785/warmupcloth_on.gif)

布料在开始时停顿（无预热）

布料不停顿（有预热）

#### 开始时不运动

若镜头开始时角色或物理对象无运动（如处于空闲姿势），你可以在 **引擎预热计数（Engine Warm Up Count）** 上设置帧数值来修复此问题。该数值可以是任意值，具体取决于物理效果稳定下来所需的帧数。通常应使用大于30的数值。

![引擎预热计数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f0f70bb-0561-4be1-938b-aae0fa2eee32/warmupcloth1.png)

#### 开始时运动

若在镜头开始时物理对象处于运动状态（如奔跑或跳跃）， **引擎预热计数（Engine Warm Up Count）** 将不会产生准确的结果。这是因为它只"预热"起始帧，并未考虑可能已预先发生的运动。在下图中你可以观察到，左侧示例中的布料从不自然的静止位置开始，然后随着模拟对运动的反应进行校正。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4fcf832-9acd-44a8-8730-f93c4d415ff9/warmupcloth2_off.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aaf1dc83-19cd-4f99-b973-9662925916d3/warmupcloth2_on.gif)

 

布料从静止位置开始（预热设置不正确）

布料正确地从后面开始（使用正确的预热设置）

\[

为了解决此问题，你必须执行以下操作：

1.  确保你的物理角色或对象在Sequencer的预开始区域（包括 **镜头切换（Camera Cuts）** 分段）中包含动画数据。这可能需要你更改动画和变换轨道关键帧，以将其扩展到预开始区域内。
    
    ![布料预开始动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1eb5a642-d971-40cb-9087-3d3147606ebc/warmupcloth2.gif)
    
    如果你要[在上下文中](/documentation/zh-cn/unreal-engine/sequences-shots-and-takes-in-unreal-engine#%E4%B8%BB%E5%BA%8F%E5%88%97%E4%B8%8A%E4%B8%8B%E6%96%87)预览镜头，最好在Sequencer的[播放选项](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E6%92%AD%E6%94%BE%E9%80%89%E9%A1%B9)菜单中启用 **对子序列单独求值（Evaluate Sub Sequences In Isolation）** 。否则，如果在擦除时进入负时间轴区域，将预览上一个镜头，而不是当前镜头的预开始区域。
    
2.  在抗锯齿（Anti-Aliasing）图像设置中，启用 **使用镜头切换进行预热（Use Camera Cut for Warm Up）** 。这将导致预热时间由镜头切换（Camera Cut）轨道分段占据的预开始区域定义。这会造成序列累积预开始运动，从而使物理效果在镜头开始时处于准确状态。**引擎预热计数（Engine Warm Up Count）** 会对第一帧求值并保留第一帧， **使用镜头切换进行预热（Use Camera Cut for Warm Up）** 则会对起始帧之前的序列求值。
    
    ![布料使用镜头切换进行预热](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab97b7e4-a843-40d7-9638-cfbdde56a9a2/warmupcloth3.png)
    

此技巧还可用于为其他东西（如尾迹粒子）构建移动历史。

### 时间瑕疵

在镜头的前几帧，也可能出现由时间抗锯齿（TAA）、时间超级分辨率（TSR）或光线跟踪降噪器等具有时间组件的渲染功能引起的锯齿以及其他瑕疵。通常，此问题在反光的表面上表现为明显的硬边或颗粒状闪光。这是由于在渲染开始时累积的时间历史不足所致。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45fe9bdd-c9e6-4c89-9288-9645f1bb6262/warmuptemporal_off.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcee2d7d-9bad-4250-863e-966e7e46d0e8/warmuptemporal_on.png)

闪光和锯齿状边缘（无预热）

平滑边缘和高光（有预热）

要解决此问题，你可以执行以下任一操作：

-   设置 **渲染预热计数（Render Warm Up Count）** 的帧数值。该数值将是为构建第一帧的时间历史而预先渲染的帧数。
    
    ![时间预热设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a0ef38c-64a8-4d18-b487-6a453e2f90cb/warmuptemporal1.png)
    
-   若增加 **渲染预热计数（Render Warm Up Count）** 不能解决问题，你可以改为增加 **引擎预热计数（Engine Warm Up Count）** 值，并启用 **渲染预热帧（Render Warm Up Frames）** 。这将对序列的第一帧求值，然后持续更新引擎和渲染器，直到已经过 **引擎预热计数（Engine Warm Up Count）** 帧数。
    
    ![时间预热设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bdbaff3e-b653-4c43-93d8-910e858ba95e/warmuptemporal2.png)
    

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [tips](https://dev.epicgames.com/community/search?query=tips)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [播放](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E6%92%AD%E6%94%BE)
-   [空格键播放切换](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E7%A9%BA%E6%A0%BC%E9%94%AE%E6%92%AD%E6%94%BE%E5%88%87%E6%8D%A2)
-   [非独占帧和独占帧](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E9%9D%9E%E7%8B%AC%E5%8D%A0%E5%B8%A7%E5%92%8C%E7%8B%AC%E5%8D%A0%E5%B8%A7)
-   [工作流程快捷方式](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E5%BF%AB%E6%8D%B7%E6%96%B9%E5%BC%8F)
-   [鼠标中键擦除](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E9%BC%A0%E6%A0%87%E4%B8%AD%E9%94%AE%E6%93%A6%E9%99%A4)
-   [将Actor添加到Sequencer](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E5%B0%86actor%E6%B7%BB%E5%8A%A0%E5%88%B0sequencer)
-   [默认轨道](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E9%BB%98%E8%AE%A4%E8%BD%A8%E9%81%93)
-   [自动调整镜头大小](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E8%87%AA%E5%8A%A8%E8%B0%83%E6%95%B4%E9%95%9C%E5%A4%B4%E5%A4%A7%E5%B0%8F)
-   [Shift键对齐和对准](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#shift%E9%94%AE%E5%AF%B9%E9%BD%90%E5%92%8C%E5%AF%B9%E5%87%86)
-   [工作流程提示](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E6%8F%90%E7%A4%BA)
-   [超宽显示器框架](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E8%B6%85%E5%AE%BD%E6%98%BE%E7%A4%BA%E5%99%A8%E6%A1%86%E6%9E%B6)
-   [预热渲染](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E9%A2%84%E7%83%AD%E6%B8%B2%E6%9F%93)
-   [粒子](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E7%B2%92%E5%AD%90)
-   [布料和物理效果](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E5%B8%83%E6%96%99%E5%92%8C%E7%89%A9%E7%90%86%E6%95%88%E6%9E%9C)
-   [开始时不运动](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E5%BC%80%E5%A7%8B%E6%97%B6%E4%B8%8D%E8%BF%90%E5%8A%A8)
-   [开始时运动](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E5%BC%80%E5%A7%8B%E6%97%B6%E8%BF%90%E5%8A%A8)
-   [时间瑕疵](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine#%E6%97%B6%E9%97%B4%E7%91%95%E7%96%B5)