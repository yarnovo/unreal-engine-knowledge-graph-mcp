# 旧版VR摄像机和光照工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools
> 
> 生成时间: 2025-06-14T19:20:55.762Z

---

目录

![旧版VR摄像机和光照工具](https://dev.epicgames.com/community/api/documentation/image/7d836b8d-507a-485b-bb58-0f703cb7a7b0?resizing_type=fill&width=1920&height=335)

本文中提到的旧版虚拟堪景工具将在未来的引擎版本中废弃。我们建议改用[新版虚拟堪景工具](/documentation/zh-cn/unreal-engine/virtual-scouting-in-unreal-engine)。 未使用的VREditor代码和模块将在未来的引擎版本中彻底废弃。

## Viewfinder

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1f90d99-3679-42d8-ab0c-06081349caeb/viewfinder1.png)

利用 **Viewfinder** 工具，可以通过虚拟镜头查看环境，然后利用相同的视口在场景中生成虚拟摄像机。初始的viewfinder显示仅对你可见。要让其他人看到你的构图，你可以利用此工具在场景中轻松创建摄像机。要激活此工具，打开虚拟探查菜单并选择 **Viewfinder** 选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2afab08-6b14-4fdb-83a0-e7e490a84e77/viewfinder2.png)

在初始视口监视器中，可以用触控板或动作控制器上的控制杆实现一些功能。

-   可以点击Vive动作控制器触控板的左上方和右上方来更改镜头：点击左上方切换短镜头，右上方切换长镜头。
-   向左或向下移动Rift控制杆会切换到短镜头，向右或向上移动则会切换到长镜头。镜头选择是由[镜头工具包](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#howtochangelenskitinformation)决定的。
-   Vive触控板的底部区域或Rift的B或Y按钮可以获取当前viewfinder显示画面的快照。当你希望在多用户探查会话中向其他用户展示你的特定构图时，此功能很有帮助。
-   快照还会保存到你计算机上的Content/Snapshots/\[关卡名称\]文件夹。这些快照对于故事脚本或镜头规划非常有用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c35a7843-8b93-4249-b721-dbbb4278bbb8/08.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b0b021d-9247-41af-80fb-a5c5b20199a0/oculusvf.png)

Vive

Oculus Touch

从Viewfinder工具中获取的快照（左侧的图像帧）的示例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e6ef17e-ffe5-461c-84b7-4c240ea42ad1/badger3_ucusnapshotsexample.png)

## 虚拟摄像机

要在场景中生成虚拟摄像机，请在Viewfinder工具处于激活状态时按动作控制器上的触发器。

-   你可以使用与viewfinder显示相同的功能按钮更改新摄像机的镜头。
-   你还可以利用此工具通过控制器来选择和操作摄像机。
-   虽然你也可以使用交互工具操作摄像机，但除非使用摄像机的上下文菜单，否则无法调整镜头。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a19abdbd-56bf-4043-8f5b-70be4f4d58df/virtualcamera1.png)

### 摄像机上下文菜单

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/177569fd-3e73-4bda-9c22-901b7f311bf9/badger3_cameracontextmenu.png)

你可以利用摄像机上下文菜单直接在VR中更改摄像机设置。当摄像机高亮显示时，点击动作控制器上的菜单按钮即可打开上下文菜单。下面列出了你可以在虚拟摄像机上修改的设置。

-   **删除（Delete）**：从关卡中移除摄像机。
-   **标记（Mark）**：在摄像机的当前位置生成摄像机位置标记。如需更多信息，请参见"摄像机标记"部分。
-   **焦距（Focal Length）**：利用摄像机的镜头选项打开另一个HUD。
-   **F值（ F-Stop）**：利用孔径选项打开另一个HUD，这些选项可用于调整摄像机的距焦范围。
    
    调整F值不会影响曝光。
    
-   **快照（Snapshot）**：从摄像机的当前位置获取快照图像。

如果使用焦距或F值上下文菜单选项，请点击Vive动作控制器触控板上的左侧或右侧部分，或向左或向右移动Oculus Touch控制器的控制杆。这将使用[镜头工具包](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#howtochangelenskitinformation)中的设置来调整摄像机的设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef228d74-5097-47d8-aa04-e39e7c099055/fstop1.png)

### 摄像机监视器

选中摄像机后，漂浮在虚拟摄像机对象上方的是摄像机监视器，它显示摄像机看到的内容。你可以与此摄像机监视器交互，以固定或移动它。以下是与摄像机监视器交互的方式：

-   摄像机监视器的左下角是Pin（固定）按钮。选择此按钮将使摄像机监视器保持可见，即使在场景中取消选择该摄像机或选择其他对象。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2374af3-7ce2-4c4b-a714-f3c93d364362/badger3_ucuviewfindermonitorpinned.png)
-   摄像机监视器的右下角是切换按钮。此选项可用于切换要将摄像机监视器锁定到摄像机还是锁定到你。如果连接到你，当你在场景中导航时，摄像机视图将停留在你面前。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/635ddb85-3f14-4f04-962d-02d4ee504b0a/vcammon1.png)
-   当摄像机监视器连接到你时，可以选择监视器下面的条以重新定位监视器。移动动作控制器可以移动摄像机监视器。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caff62a5-5c13-4455-8ada-4bf59447d0d2/vcammon2.png)
-   你可以将监视器锚定在其当前位置，断开与你的连接。要将监视器锚定在关卡里，请选择监视器条左侧的箭头按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e81781ac-e079-4f26-a93f-d98c2819ae05/vcammon3.png)

### 摄像机标记

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb44570d-3e6b-4fbb-a84f-fce8510e8a53/image_35.png)

使用 **摄像机标记（Camera Marks）** 保存摄像机的位置及其镜头设置。你随时可以让摄像机返回此位置并恢复这些设置，以重新创建相同的镜头构图。对于移动镜头（比如使用移动车），此功能还有助于传达摄像机的开始和结束位置。

通过打开 **虚拟探查（Virtual Scouting）** 菜单并在右侧面板中选择 **摄像机标记（Camera Marks）**，可以传送到摄像机标记所在位置。当你要传送到的摄像机标记高亮显示时，按动作控制器上的触发器。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a95e1a9-c39d-4b6a-8fd4-b08393d1ae90/image_36.png)

### 三脚架

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcf6c116-58dd-434c-a942-fcb379f7c276/image_50.png)

当 **三脚架（Tripod）** 工具激活时，你可以将虚拟摄像机连接到动作控制器，以操作摄像机的平移和倾斜旋转。下面的说明解释了如何激活和使用此工具：

-   打开 **虚拟探查（Virtual Scouting）** 菜单并选择 **三脚架（Tripod）** 选项，以激活此工具。虚拟三脚架将显示并连接到你的动作控制器。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/557e70d8-f486-48a2-acea-980f4bb7fd52/image_51.png)
-   按动作控制器上的触发器，将你的虚拟摄像机连接到三脚架设备。动作控制器将驱动三脚架的动作，因此在此模式下无法断开控制器与三脚架的连接。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ddc2c2d-93eb-440f-bb6a-6c56fac1ecfb/image_52.png)
-   再次按动作控制器上的触发器，断开摄像机与三脚架的连接。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e05460d-a158-4243-ad09-eaea92c6dc55/tripod1.png)
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/859e4818-94ee-4f98-bb5f-f78ae9a8a426/tripod2.png)
    
     
    
     
    

### 手持

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c1e408b-1051-43ac-a41c-6ad173f666e7/image_53.png)

利用 **手持（Handheld）** 工具，你可以将虚拟摄像机连接到动作控制器，以操作摄像机。此运动追踪包括平移，以及平移、倾斜和滚动。

按照下面的说明激活和使用工具。

-   打开虚拟探查菜单并选择"手持"选项，以激活手持式工具。手持式摄像机设备将显示并连接到你的控制器。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/947b81e9-fc0a-4a10-ae71-7047c8b32e96/image_54.png)
-   按动作控制器上的触发器，将你的虚拟摄像机连接到手持式摄像机设备。动作控制器将驱动设备的动作，因此在此模式下无法断开控制器与设备的连接。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fe95231-6011-4bb9-9dd8-d4e970cc7ae4/handheld1.png)
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c585d9f-a3b6-4c71-9a88-4f659da48470/handheld2.png)
    
     
    
     
    
-   再次按动作控制器上的触发器，断开摄像机与三脚架的连接。
    

### 移动车

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e01813f2-f6b6-4076-98ae-3705fadbfd83/image_55.png)

在激活 **移动车（Dolly）** 工具后，你可以在VR中创建移动车轨道，让虚拟摄像机沿着轨道移动。 打开 **虚拟探查（Virtual Scouting）** 菜单并选择 **移动车（Dolly）** 选项，以激活此工具。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2efb2c21-9178-4f75-bfa9-a51b430bd391/image_56.png)

-   使用Vive动作控制器将移动车点添加到关卡时，请点击触控板的顶部。在创建两个或更多的点之后，点击触控板的底部在关卡中生成轨道。
-   使用Oculus Touch控制器将移动车点添加到关卡时，按B或Y按钮。在创建两个或更多的点之后，推下控制杆以在关卡中生成轨道。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ada53d34-01ac-47f0-82dc-60b8bc8b737e/09.png)
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e2c112e-c8ee-4080-a034-db8a02c5cfe3/rightrift_dolly.png)
    
    Vive
    
    Oculus Touch
    
-   在轨道生成之后，可以编辑移动车点以调整轨道的形状和路径。要点击移动车点，请选择移动车点并按动作控制器上的触发器。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6173fb6d-14ef-4543-930a-cfb34d5c54ca/image_57.png)

要将摄像机连接到移动车轨道，必须在编辑器中将摄像机设置为轨道的父项。此操作无法在VR中完成。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba1a1482-8ba1-4977-9106-029beae50592/image_58_cropped.png)

你可以使用自定义蓝图设置，沿着轨道驱动摄像机的位置。利用此自定义设置，可以按照真实移动车在三维空间中的移动方式来移动虚拟摄像机。

## 使用VR摄像机

## 将动作控制器挂载到真实摄像机设备

在使用三脚架和手持式工具时，可以将动作控制器挂载到真实三脚架或手持设备上。这样，如果有需要，您可以在移动真实的三脚架或手持式设备时，利用专业设备做出更真实的摄像机动作。

为了让动作控制器在真实设备上具有多样化的挂载位置，你可以调整动作控制器和虚拟摄像机之间的枢轴点。

1.  将虚拟摄像机连接到设备之后，使用交互工具和你的其他动作控制器的交互指针来选择摄像机。
2.  按住动作控制器上的触发器来重新确定设备上枢轴点的位置。
3.  使用交互工具释放摄像机，以在设备上保存虚拟摄像机的新枢轴点。

### 摄像机Viewfinder和UI面板亮度

如果viewfinder或摄像机监视器太亮或太暗，你可以按照以下步骤调整亮度：

1.  导航至 **编辑 > 编辑器首选项（Edit > Editor Preferences）**.
2.  选择 **VR模式（VR Mode）**。
3.  在VR模式设置页面上，修改 **UI面板亮度（UI Panel Brightness）** 设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59c1cb88-43b9-4f89-bc8d-a630bf3f5741/image_12.png)

### 摄像机操作和小工具

启用"变换小工具"之后，在单个轴上操控摄像机将增加轻松。如果你计划直接使用动作控制器操作摄像机，那么禁用变换小工具是更好的选择。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3774cdce-bf48-4538-a9c9-7bf6f763e7dc/turnoffgizmo1.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b658d0c4-4bdc-431c-a5f1-50b78a5d25f2/turnoffgizmo2.png)

启用变换小工具

禁用变换小工具

### 如何更改摄像机胶片背板

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0209b3e7-9b69-4957-ad7a-4c105ffba0ed/image_66_cropped.png)

任何使用Viewfinder工具添加到关卡的虚拟摄像机都会有一组可以在该摄像机上使用的胶片背板。你可以编辑胶片背板选项列表，并为每个选项设置长宽比。

1.  在文本编辑器中，打开项目的Engine（引擎） > Config（配置） > DefaultEngine.ini文件。
2.  在FimbackPresets数组中编辑选项。
3.  编辑DefaulFilmbackPresetName，以更改Viewfinder工具的默认胶片背板。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3600d554-a60f-4785-bfae-8230bc0019f7/image_67.png)

如果编辑了预设值，建议将该DefaultEngine.ini分发至将要同时用于多用户虚拟探查会话的任何其他机器。

### 如何更改镜头工具包信息

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c18d8fd1-81d5-4c71-8396-b2c177973fc7/image_69_cropped.png)

任何使用Viewfinder工具添加到关卡的虚拟摄像机都会有一组可以在该虚拟摄像机上使用的镜头。你可以在镜头列表中添加镜头或编辑此列表，虚拟摄像机可以使用这些镜头进行虚拟探查。

1.  在文本编辑器中，打开项目的 **引擎 > 配置 > DefaultEngine.ini（Engine > Config > DefaultEngine.ini）** 文件。
2.  在 **LensPresets** 数组中编辑各个选项。
3.  在镜头工具包数组中编辑 **DefaultLensPresetName**，以更改Viewfinder工具的默认镜头。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10f97660-bcc8-4686-abdb-dacb6d9c799a/image_68.png)

可以定义定焦和变焦镜头，但Viewfinder工具将仅在可选的定焦镜头之间切换。

## Gaffer

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72ea2cf8-9197-407c-99df-94ac21013fc3/image_59.png)

使用 **Gaffer** 工具，你可以在场景中生成光源。你可以移动和调整此光源，就像是现场的真实光源。

1.  打开虚拟探查菜单并选择"Gaffer"选项，以激活Gaffer工具。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8449f6d-9571-41eb-9460-abf024f3284c/image_60.png)
2.  按动作控制器上的触发器，让光源显示在你的关卡中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb31f927-3073-4970-871a-500c725a51b4/image_61.png)
3.  在光源的碰撞层内部移动动作控制器，让光源的移动和旋转更加自然。
4.  你可以使用Vive动作控制器上的触控板或Oculus Touch控制器上的控制杆调整光源的扩散范围和亮度。
    
    -   触控板或控制杆的上部可以让光源变亮，底部可以让光源变暗。
    -   触控板或控制杆的左侧可以让光源扩散范围变大，右部可以让光源扩散范围变小。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bceb136-7f89-4ed3-87f4-4e2f71691498/10.png)
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b20a6689-edff-4153-a6a9-ea5fa396b47c/rightrift_gaffer.png)
    
    Vive
    
    Oculus Touch
    

### 光源上下文菜单

使用 **光源上下文菜单（Light Context Menu）** 可以编辑光源的强度和扩散范围，以及光源的温度设置。要查看光源上下文菜单，请选择光源并按动作控制器上的 **菜单（Menu）** 按钮。b

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29d6fb09-e8ca-4ee6-8429-897fcb6eaeeb/lightcontext1.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10305d73-5cdd-4f70-8631-000fcee96e34/lightcontext2.png)

 

 

点击触控板或控制杆，在菜单中选择选项。这将打开使用以下设置的HUD。使用触控板或控制杆在HUD中选择选项。

-   **删除（Delete）**：从场景中移除选择的光源。
-   **强度（Intensity）**：利用光源的"亮度"选项打开另一个HUD。
-   **扩散范围（Spread）**：利用光源的投射角度选项打开另一个HUD。这些可以从光源连接的面板的角度查看。
-   **温度（Temperature）**：利用Kelvin中光源的色温选项打开另一个HUD。
-   **复制（Duplicate）**：在场景中生成光源的副本。

-   [virtual scouting](https://dev.epicgames.com/community/search?query=virtual%20scouting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Viewfinder](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#viewfinder)
-   [虚拟摄像机](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA)
-   [摄像机上下文菜单](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#%E6%91%84%E5%83%8F%E6%9C%BA%E4%B8%8A%E4%B8%8B%E6%96%87%E8%8F%9C%E5%8D%95)
-   [摄像机监视器](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#%E6%91%84%E5%83%8F%E6%9C%BA%E7%9B%91%E8%A7%86%E5%99%A8)
-   [摄像机标记](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#%E6%91%84%E5%83%8F%E6%9C%BA%E6%A0%87%E8%AE%B0)
-   [三脚架](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#%E4%B8%89%E8%84%9A%E6%9E%B6)
-   [手持](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#%E6%89%8B%E6%8C%81)
-   [移动车](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#%E7%A7%BB%E5%8A%A8%E8%BD%A6)
-   [使用VR摄像机](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#%E4%BD%BF%E7%94%A8vr%E6%91%84%E5%83%8F%E6%9C%BA)
-   [将动作控制器挂载到真实摄像机设备](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#%E5%B0%86%E5%8A%A8%E4%BD%9C%E6%8E%A7%E5%88%B6%E5%99%A8%E6%8C%82%E8%BD%BD%E5%88%B0%E7%9C%9F%E5%AE%9E%E6%91%84%E5%83%8F%E6%9C%BA%E8%AE%BE%E5%A4%87)
-   [摄像机Viewfinder和UI面板亮度](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#%E6%91%84%E5%83%8F%E6%9C%BAviewfinder%E5%92%8Cui%E9%9D%A2%E6%9D%BF%E4%BA%AE%E5%BA%A6)
-   [摄像机操作和小工具](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#%E6%91%84%E5%83%8F%E6%9C%BA%E6%93%8D%E4%BD%9C%E5%92%8C%E5%B0%8F%E5%B7%A5%E5%85%B7)
-   [如何更改摄像机胶片背板](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#%E5%A6%82%E4%BD%95%E6%9B%B4%E6%94%B9%E6%91%84%E5%83%8F%E6%9C%BA%E8%83%B6%E7%89%87%E8%83%8C%E6%9D%BF)
-   [如何更改镜头工具包信息](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#%E5%A6%82%E4%BD%95%E6%9B%B4%E6%94%B9%E9%95%9C%E5%A4%B4%E5%B7%A5%E5%85%B7%E5%8C%85%E4%BF%A1%E6%81%AF)
-   [Gaffer](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#gaffer)
-   [光源上下文菜单](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools#%E5%85%89%E6%BA%90%E4%B8%8A%E4%B8%8B%E6%96%87%E8%8F%9C%E5%8D%95)