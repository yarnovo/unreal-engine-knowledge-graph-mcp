# 虚幻虚拟摄像机（VCam）虚拟摄像机设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings
> 
> 生成时间: 2025-06-14T20:13:37.932Z

---

目录

![虚幻虚拟摄像机（VCam）虚拟摄像机设置](https://dev.epicgames.com/community/api/documentation/image/8cd60207-724a-43c2-a809-3f10711ac9d4?resizing_type=fill&width=1920&height=335)

**虚拟摄像机（Virtual Camera）** 设置位于Unreal VCam应用程序的左侧。此菜单包括用于控制场景中虚拟摄像机的不同摄像机、镜头、曝光设置的选项。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f100c48-313b-4633-8c4b-7828e69df387/vcamcamerasettings.png)

该菜单包括以下设置：

**图标**

**调谐钮名称 / 操作**

**说明**

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c39ccf1-9fb6-4f7b-a966-33c28576c00d/lenssettings.png)

**镜头设置（Lens Settings）**

设置虚拟摄像机参数，包括镜头尺寸、焦点、光圈等。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/708fb031-bab8-4179-a02b-bebcfa46f70e/focussettings.png)

**焦点设置（Focus Settings）**

设置虚拟摄像机的对焦模式和对焦距离。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52107f5c-2b22-4a96-b228-9174aa3b4ce9/filmbacksettings.png)

**胶片背板设置（Filmback Settings）**

虚拟摄像机的图像传感器的可配置设置。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d99a4a60-4ddf-4d57-89ec-94a220adfe6e/isosettings.png)

**ISO和曝光补偿设置（ISO and Exposure Compensation Settings）**

关于如何处理虚拟摄像机曝光的可配置设置。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0d4edcf-53af-4bdf-aeba-5caa901dac9a/nearclipsettings.png)

**近裁剪平面设置（Near Clip Plane Settings）**

设置摄像机距离，在此距离之内的多边形将不再渲染。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c8bff9c-212d-40c2-ad6d-f46b57a447fe/masksettings.png)

**遮罩/覆层/准星设置（Mask / Overlay / Reticle Settings）**

设置将哪种类型的纵横比遮罩、网格覆层和准星用于虚拟摄像机。

### 镜头设置

**镜头（Lens）** 设置包括镜头、焦点、光圈设置的虚拟摄像机预设。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caa6dfb8-cc5c-4b3d-94af-12fcfec79ae2/lenssettingsinterface.png)

#### 镜头预设和焦距

选择 **镜头模式（Lens Mode）** 后，你可以调整常见焦距和光圈的可配置预设。你还可以手动在对焦距离中设置光圈和拨入。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44b40dc9-06ca-4c96-abea-25336021f5c3/lenspreset.png)

你可以在 **项目设置（Project Settings）** 的 **过场动画摄像机（Cinematic Camera） > 镜头预设（Lens Presets）** 中配置镜头预设。你可以在此添加自己的预设，也可以修改和移除现有的预设。

**调谐钮名称 / 操作**

**说明**

**左调谐钮（Left Dials）**

 

**镜头预设（Lens Preset）**

从焦距和光圈的预设列表中选择。一些预设包括焦距调谐钮。 镜头预设包括：

-   12mm定焦f/2.8
-   12mm定焦f/2.8
-   12mm定焦f/2.8
-   30mm定焦f/1.4
-   50mm定焦f/1.8
-   85mm定焦f/1.8
-   105mm定焦f/2
-   200mm定焦f/2
-   24-70mm变焦f/2.8
-   70-200mm变焦f/2.8
-   通用变焦

镜头预设在项目设置的 **过场动画摄像机（Cinematic Camera）** 类别中设置。你可以添加新预设和编辑现有预设。

**焦距（Focal Length）**

设置镜头的长度（以毫米为单位）。长度越长，放大倍数越高，视角越窄。长度越短，放大倍数越低，视角越广。（仅在一些镜头预设上可用。）

**右调谐钮（Left Dials）**

 

**对焦距离（Focus Distance）**

设置距离虚拟摄像机多远之内（以米为单位）对象才会对焦。

**光圈（Iris）**

通过使光圈变宽（低F值）或变窄（高F值）来控制光线量。

#### 使用捏合变焦

使用两根手指在虚拟摄像机屏幕的中心进行捏合，可以在当前选定的镜头范围内放大和缩小。如果你的镜头是具有设定焦距且无法变焦的定焦镜头，则捏合变焦没有任何作用。

### 焦点设置

**焦点（Focus）** 设置选项可以配置虚拟摄像机如何聚焦对象。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c4f319e-2df7-4d55-ba25-f050ca4f6d68/focussettingdials.png)

**图标**

**调谐钮名称 / 操作**

**说明**

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cfc06a5-37b8-4583-93c7-5d378c8e43e1/focussettings.png)

**对焦方式（Focus Method）**

选择你希望虚拟摄像机如何在场景中应用焦点：

-   选择 **不覆盖（Do Not Override）**，你就不能在任何菜单中更改对焦距离调谐钮，并且 **后期处理体积（Post Process Volume）** 设置可以持久保存
-   选择 **手动（Manual）**，就可以使用 **对焦距离（Focus Distance）** 调谐钮设置从摄像机到主体的距离来手动调整焦点
-   选择 **追踪（Tracking）** 会将焦点锁定在镜头中的特定Actor上
-   选择 **禁用（Disable）** 会阻止所有景深

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e3fcc69-6018-4c70-851b-6ece98f0a587/focussettings.png)

**对焦距离（Focus Distance）**

指定距离虚拟摄像机多远之内（以米为单位）对象才会对焦。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f95128b3-98f8-405e-aa9c-747d68c2f0d2/pickactor.png)

**选择要追踪的Actor（Pick Actor to Track）**

使用此项选择场景中要聚焦的Actor。在 **追踪（Tracking）** 模式下，选定的Actor始终保持聚焦，并且其与摄像机的距离决定了对焦距离。当处于 **手动（Manual）** 模式时，手动对焦距离被设置为离该目标的距离，但如果摄像机或目标移动，不会追踪选定的Actor。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b96a4d1c-40ed-4ee7-baaf-7f38ddf6103a/togglefocuspeaking.png)

**切换对焦峰值（Toggle Focus Peaking）**

切换当前设置了对焦距离的场景中的视觉参考。

#### 使用点击对焦

双击场景中的Actor可以选择焦点目标。界面上会出现黄色焦点指示器，用于确认你点击的位置。即使你未处于 **对焦模式（Focus Mode）**，也可以点击对焦。

基于当前模式，点击对焦的行为会有所不同：

-   在 **手动对焦（Manual Focus）** 中，点击一个Actor会将手动对焦距离设置为与被点击Actor的距离。如果Actor或摄像机移动，此值不会更新。
    
-   在 **追踪焦点（Tracking Focus）** 中，点击Actor会设置追踪焦点目标，并将对焦距离锁定到所选Actor或骨骼网格体插槽上的点击点。如果Actor/插槽或摄像机移动，焦点会调整以保持聚焦该点。
    

只有具有碰撞的Actor（或骨骼Actor的物理资产）才可以通过点击对焦进行检测。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bd2a200-05e3-4681-994c-6030e460d716/taptofocus.png)

#### 使用追踪焦点

你可以使用HUD中的 **选择要追踪的Actor（Pick Actor to Track）** 选项，或使用 **点击对焦（Tap to Focus）**，追踪场景中的Actor并维护虚拟摄像机在其中的焦点。

要使用追踪焦点，请执行以下操作：

1.  在 **镜头设置（Lens settings）** 菜单中，找到 **焦点（Focus）** 设置。此处会默认选中 **对焦方式（Focus Method）**，其可调整的调谐钮会显示在屏幕上。
    
2.  将 **左调谐钮** 拖动到 **追踪（Tracking）**。
    

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80935ff9-33f0-46d5-a6d7-403292854309/trackingfocusdial.png)

手持并看着你的设备，双击场景中的Actor。或者，将虚拟摄像机 **准星** 对准你想保持聚焦的对象。点击左菜单中的 **选择要追踪的Actor** 图标。完成此操作后，查看 **右** 调谐钮，你会在下面看到 **追踪偏移（Tracking Offset）** 以及聚焦的资产/骨骼网格体插槽的 **名称** 。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0cf1d230-96f6-4dc6-bf55-8e7aecb2618e/trackingfocusoffset.png)

使用追踪对焦方式时，使用 **追踪焦点偏移（Tracking Focus Offset）** 的右调谐钮拨入主体上的焦点。追踪骨骼网格体Actor时，目标点会移至最接近的插槽进行聚焦，这可能并不总是为你想聚焦的确切点。

#### 使用对焦峰值

你可以使用 **对焦峰值（Focus Peaking）** 切换开关，查看场景中的确切对焦距离。红色轮廓表示对焦距离。**对焦峰值（Focus Peaking）** 有助于快速查看场景中的对焦距离，以便进行调整。轮廓区域会根据你当前的 **光圈** 扩大和缩小，以显示 **景深**。要调整焦点，请使用应用程序右侧的 **对焦距离** 调谐钮。

### 胶片背板设置

**胶片背板** 描述了数字成像传感器的帧的尺寸。此大小将确定摄像机通过Viewfinder能看到什么。胶片背板将确定帧的大小、景深、分辨率等。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8cb2664e-2e23-4f1c-a20a-6a3e73e715f7/filmbacksettingsinterface.png)

标准预设如下：

-   16:9 Film
    
-   16:9 Digital Film
    
-   16:9 DSLR
    
-   Super 8mm
    
-   Super 16mm
    
-   Super 35mm
    
-   35mm Academy
    
-   35mm Full Aperture
    
-   35mm Vista Vision
    
-   IMAX 70mm
    
-   APS-C (Canon)
    
-   Full Frame DSLR
    
-   Micro Four Thirds
    

下面的示例使用 **30mm定焦f/1.4** 镜头预设。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f284c08-552a-4a29-9dcd-bb317877c707/16x9film.png)

16:9胶片（16:9 Film）

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80022a18-1f83-408e-91da-f6877d26bc33/16x9dslr.png)

\*\*16:9 DLSR\*\*

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74c8ea0b-b819-4e64-92f5-e932059f50e4/super16.png)

Super 16mm

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1189053d-b7bd-4d46-af87-e8a137c08ba5/imax70.png)

IMAX 70mm

你可以在项目设置的 **过场动画摄像机（Cinematic Camera）> 胶片背板预设（Filmback Presets）** 下配置胶片背板预设。你可以在这里添加自己的预设，改变或删除现有预设。

### ISO、光圈、快门速度和曝光补偿设置

**曝光（Exposure）** 设置可控制图像的明暗程度。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd099ee0-c5bf-4207-b9f6-c65cb5e6645e/isosettingsinterface.png)

**调谐钮名称 / 操作**

**说明**

 

**左调谐钮（Left Dials）**

 

 

**ISO**

设置摄像机的传感器的灵敏度。数字越低，对光的敏感度就越低，图像越暗。数字越高，对光的敏感度就越高，图像越亮。未设置为 **自动曝光（Auto Exposure）** 时，ISO将取决于摄像机光圈设置的F值。

 

**光圈（Iris）**

设置光圈开口的直径（以F值测量）。这会控制允许通过摄像机镜头的光线量。这还会影响景深。如需详细信息，请参阅[过场动画景深](/documentation/zh-cn/unreal-engine/cinematic-depth-of-field-in-unreal-engine)。

 

**右调谐钮（Right Dials）**

 

 

**曝光补偿（Exposure Compensation）**

应用补偿（以F值为单位）以覆盖曝光，使帧变亮或变暗。数字越低，曝光度越高，成像越亮。数字越高，曝光度越低，成像越暗。

 

**快门速度（Shutter Speed）**

调整摄像机的"曝光时间"（以几分之一秒为单位）。快门速度越慢，图像越亮。快门速度越快，图像越暗。与实体摄像机不同，虚拟摄像机的快门速度仅影响曝光而不影响动态模糊。

 

#### 使用斑马条纹

点击 **曝光模式（Exposure Mode）** 中的 **斑马条纹（Zebra striping）** 按钮或顶部快速操作按钮，可开关斑马条纹。启用后，斑马条纹会标记帧中过度曝光的区域。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f04f87d-7d99-4e04-a6c1-3ae27f258b5c/zebrastriping.png)

### 近裁剪平面

**近裁剪平面（Near Clip Plane）** 设置距离摄像机多远（以厘米为单位）之内的多边形不再渲染。如果你不想渲染挡住视线的对象，但仍继续渲染其阴影以及与场景的交互，此选项很有用。

在下面的示例中，虚拟摄像机使用较长的镜头捕获主体，但视线被植物遮挡了一部分。使用近裁剪平面，虚幻不会渲染与摄像机相距设定距离之内的任何几何体。

### 遮罩、覆层和准星设置

**遮罩/覆层/准星（Mask / Overlay / Reticle）** 设置包括虚拟摄像机Viewfinder的可选视觉效果导线。这包括网格、安全区、不同准星以及不同纵横比的遮罩。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25a36695-a24e-4e81-b7e5-7a493dfd1fd7/maskoverlayinterface.png)

每组覆层、准星和遮罩都包括自己的 **不透明度（Opacity）** 调谐钮。你可以将其用于设置每组的不透明或透明程度。值为0时不可见，值为0.5时部分透明，值为1.0时完全不透明。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56ded73f-3f97-48ef-966d-5d7220ebc104/opacity0.png)

不透明度 = 0（覆层网格不可见）

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/684b225c-2035-47c0-9b56-e7d52ae247d7/opacity05.png)

不透明度 = 0.5（覆层网格部分透明）

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7eb21242-b930-48c7-ba53-b78f67dab2d8/opacity1.png)

不透明度 = 1（覆层网格不透明）

#### 覆层选择

使用 **覆层（Overlay）** 调谐钮可选择要在虚拟摄像机Viewfinder上覆盖的网格类型。

可用的选项包括：

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/670d378a-f3ca-4778-9edb-f90234be4593/ruleofthirds.png)

三分法（Rule of Thirds）

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f43802de-aaa6-4898-8730-ade0df3b9a62/quadsymmetry.png)

四边对称（Quad Symmetry）

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c814bcd9-c90f-4df0-a4aa-46ccc85b1e78/safezones.png)

安全区（Safe Zones）

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d486b40-22ee-44ce-a028-753eb2f10cc1/opacity0.png)

隐藏（Hidden）

#### 准星选择

你可以使用 **准星（Reticle）** 调谐钮选择用于瞄准虚拟摄像机所拍摄对象的帧中心的设计。

可用的选项包括：

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fbc5bd60-bea1-4e23-9c0b-8fc08aa2a23f/dot.png)

点（Dot）

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95de4fc0-69f4-4c51-831f-b10312328b07/circle.png)

圆（Circle）

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c557e83-769c-43c1-8cc4-df89b798664f/cross.png)

十字形（Cross）

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca2ac6bb-d42f-4a52-b8b9-6fc197ef14de/splitcircle.png)

分割圆（Split Circle）

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/632dc760-14f3-4c99-8e7e-fc00286418d1/hidden.png)

隐藏（Hidden）

#### 遮罩选择

你可以使用 **遮罩（Mask）** 调谐钮从虚拟摄像机Viewfinder中不同大小纵横比的遮罩预设中选择。遮罩预设包括通用行业标准。

可用的选项包括：

-   9:16 (0.562)
    
-   1:1
    
-   4:3 (1.333)
    
-   3:2 (1.5)
    
-   16:9 (1.778)
    
-   1.85:1 (1.85)
    
-   2:1
    
-   2.39:1 (2.39)
    
-   2.4:1 (2.4)
    
-   2.76:1 (2.76)
    
-   自定义
    

下面是覆盖虚拟摄像机取景器的遮罩预设的示例：

如果包括的预设都不符合你的要求，可以使用 **自定义（Custom）** 选项定义你自己的遮罩区域。选择后，屏幕右侧会显示新的调谐钮。向左拖动调谐钮可缩小遮罩，向右拖动调谐钮可扩大遮罩。遮罩可以填满帧的顶部和底部或帧的两侧。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/133ea019-4871-4e20-b197-a09d2e0d44e6/maskpresets.png)

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [virtual camera](https://dev.epicgames.com/community/search?query=virtual%20camera)
-   [working with media](https://dev.epicgames.com/community/search?query=working%20with%20media)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [镜头设置](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#%E9%95%9C%E5%A4%B4%E8%AE%BE%E7%BD%AE)
-   [镜头预设和焦距](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#%E9%95%9C%E5%A4%B4%E9%A2%84%E8%AE%BE%E5%92%8C%E7%84%A6%E8%B7%9D)
-   [使用捏合变焦](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#%E4%BD%BF%E7%94%A8%E6%8D%8F%E5%90%88%E5%8F%98%E7%84%A6)
-   [焦点设置](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#%E7%84%A6%E7%82%B9%E8%AE%BE%E7%BD%AE)
-   [使用点击对焦](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#%E4%BD%BF%E7%94%A8%E7%82%B9%E5%87%BB%E5%AF%B9%E7%84%A6)
-   [使用追踪焦点](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#%E4%BD%BF%E7%94%A8%E8%BF%BD%E8%B8%AA%E7%84%A6%E7%82%B9)
-   [使用对焦峰值](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#%E4%BD%BF%E7%94%A8%E5%AF%B9%E7%84%A6%E5%B3%B0%E5%80%BC)
-   [胶片背板设置](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#%E8%83%B6%E7%89%87%E8%83%8C%E6%9D%BF%E8%AE%BE%E7%BD%AE)
-   [ISO、光圈、快门速度和曝光补偿设置](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#iso%E3%80%81%E5%85%89%E5%9C%88%E3%80%81%E5%BF%AB%E9%97%A8%E9%80%9F%E5%BA%A6%E5%92%8C%E6%9B%9D%E5%85%89%E8%A1%A5%E5%81%BF%E8%AE%BE%E7%BD%AE)
-   [使用斑马条纹](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#%E4%BD%BF%E7%94%A8%E6%96%91%E9%A9%AC%E6%9D%A1%E7%BA%B9)
-   [近裁剪平面](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#%E8%BF%91%E8%A3%81%E5%89%AA%E5%B9%B3%E9%9D%A2)
-   [遮罩、覆层和准星设置](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#%E9%81%AE%E7%BD%A9%E3%80%81%E8%A6%86%E5%B1%82%E5%92%8C%E5%87%86%E6%98%9F%E8%AE%BE%E7%BD%AE)
-   [覆层选择](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#%E8%A6%86%E5%B1%82%E9%80%89%E6%8B%A9)
-   [准星选择](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#%E5%87%86%E6%98%9F%E9%80%89%E6%8B%A9)
-   [遮罩选择](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings#%E9%81%AE%E7%BD%A9%E9%80%89%E6%8B%A9)