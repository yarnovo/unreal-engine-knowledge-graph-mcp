# 如何在虚幻引擎中使用混合现实捕捉校准工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:58.777Z

---

目录

![如何使用混合现实捕捉校准工具](https://dev.epicgames.com/community/api/documentation/image/96f7c3e5-baba-4d05-a3d9-ca421ade257d?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

校准的目标是在虚拟场景中将虚拟摄像机和物理摄像机相匹配。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13f0d433-2918-4346-be46-e0139bde9dc1/adjustingalignmentstep.png "AdjustingAlignmentStep.png") 在运行时，游戏需要知道一些信息，例如：

-   要使用的摄像机和镜头类型。
-   摄像机相对于虚拟场景的位置。

要进行场景合成，游戏需要知道诸如以下之类的信息：

-   色度背景的颜色（通常为绿色）。
-   如何有效地抠去色度颜色。
-   要从摄像机取景框中完全抠去的区域。

游戏需要知道以上信息，才能用虚拟摄像机模拟物理摄像机。所以这时候校准工具就派上用场了。借助校准工具，你可以立即配置所有这些设置，并使用这些信息创建校准设置文件。此设置文件可以在其他游戏中重复使用。

## 校准前设置

在开始捕捉混合现实之前，你需要合适的设备。以下简要概述了你需要的设备以及有关如何设置的一些提示。这包括捕捉流程中的基本绿幕和摄像机设置，以及校准所需的设备和软件。

#### 绿幕和摄像机

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9b9f2f5-77a8-41c1-aed5-6048c47d9052/mr_greenscreensetup.png "MR_GreenScreenSetup.png")

1.  **摄像机**  
    UE4 仅支持一组非常特定的视频捕捉设备。有关支持的设备列表，请参见[支持的视频设备](/documentation/zh-cn/unreal-engine/supported-video-devices-for-mixed-reality-capture-in-unreal-engine)。将列出的设备连接到PC进行流送。
2.  **色度背景（Chroma backdrop）** 色度镶迭通常使用绿幕。设置绿幕时，请确保绿幕紧绷，尽量减少褶皱，尤其是在拍摄对象的后面。如果设置光照，应确保不在对象后面直接投射阴影。颜色应该平滑。背景中绿色阴影区域越多，色度镶迭就越困难。让拍摄对象尽可能远离背景会很有帮助。如果你打算对拍摄对象的脚进行拍摄，请考虑在地板上也使用绿幕。
3.  **摄像机安装** 对于初始设置（校准），必须固定摄像机。如果你使用网络摄像头，只需将其连接到你的桌面/显示器即可。另一种选择是将摄像机安装在三脚架上。
4.  **多重安装 + 跟踪器（选件）** 如果你打算在拍摄期间四处移动摄像机，最好将跟踪设备（例如HTC Vive Tracker）连接到摄像机。另外，你还可以使用[多重安装](https://www.bhphotovideo.com/c/product/1062513-REG/desmond_d3d_1_stereo_camera_bracket.html)将摄像机和跟踪器牢固地安装在一个地方。

#### 校准专用仪器

校准过程需要一些额外的特定仪器或系统（相对于捕捉过程）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b541a8bf-ab4c-409d-afd9-aed78d7c9bbb/mr_requiredsetupitems.jpg "MR_RequiredSetupItems.jpg")

-   **HTC Vive 或 Oculus Rift** 校准工具需要使用这两个VR系统中的一个才能工作。该工具使用控制器的跟踪功能来评估摄像机的位置。如果你尚未设置HTC Vive或Oculus系统，必须先完成设置过程，然后才能进行校准。
-   **打印的棋盘格模板** 打印棋盘格模板，并将其粘贴到坚硬的平面（例如纸板）上。下载的校准工具中包括棋盘格模板示例。
    
    在用胶带粘打印的棋盘格时，请勿让胶带遮住棋盘格模板（即使是透明胶带也会产生镜面反射，使摄像机难以识别）。
    

## 步骤

安装仪器后，可以在[此处](http://epic.gm/mrccal)下载校准工具。下载文件后，将其解压缩并运行MRCalibration.exe。

校准过程分为几个步骤。下面将详细介绍每个步骤。

1.  选择设备/摄像机/跟踪器
2.  镜头校准
3.  对齐校准
4.  对齐调整
5.  合成校准
6.  削除抠像

校准期间将在每个步骤结束时保存进度。你可以按照需要退出和返回工具。完成校准过程后，校准工具会生成设置文件，你可以使用该文件在其他项目中启动MRC会话。

设置文件会记录校准进度。要重新开始校准过程，必须删除设置文件。设置文件名为 *MrcCalibration.sav*，可以在工具的 */Saved/SaveGames/* 目录下找到。

#### 共享功能按钮

尽管每个步骤都有特定的功能按钮，但有一些功能按钮是在整个工具中通用的：

-   **Enter**：下一步/确认/接受/提交
-   **End**：跳过（仅在满足步骤要求时适用——有些步骤不能跳过）
-   **P/Thumbstick**：预览
-   **M**：镜像视频源
-   **R**：还原更改过的设置
-   **Esc**：退出

工具中仍然存在一些瑕疵，有些方面的可用性还需要改进。该工具还算实用，但我们计划在以后的版本中提高可用性。欢迎提供反馈意见！

## 校准过程

### 1.选择设备/摄像机/跟踪器

如果有多个视频捕捉设备连接到PC，必须指定要使用的设备。请使用 **Up/Down** 键循环浏览这些设备。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b17849f7-ab9d-43b1-ad58-4e175c0b9e1f/mr_deviceselection.png "MR_DeviceSelection.png")

此外，每个摄像机可能有多种格式和分辨率。我们力求自动选择最佳的格式和分辨率，但你可以使用 **Left/Right** 更改选择。

摄像机影像的分辨率不会影响混合现实捕捉的输出分辨率。捕捉的输出分辨率由要捕捉的游戏项目控制。摄像机影像的分辨率仅控制场景中影像的清晰度。

#### 设备选择功能按钮

-   **Up/Down**：选择视频捕捉源
-   **Left/Right**：选择视频捕捉格式
-   **Tab**：选择摄像机跟踪器

#### 选择追踪器

如果你计划在拍摄期间四处移动摄像机，需要将其连接到跟踪设备。

在继续下一步之前，你可以按 **Tab** 键循环浏览可用的跟踪附件。对于HTC Vive，第一个跟踪器在附件列表中命名为"Special\_1"。

进行适当的选择后，按 **Enter** 键进入下一步。

### 2.镜头校准

不同的摄像机镜头会以不同的方式弯曲和扭曲图像（想想鱼眼镜头）。你当然不希望在捕捉的场景中出现畸变，因此请学习如何进行镜头校准以消除图像畸变。![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/527b0c4e-2b64-4a46-98e3-6fd98cf610a6/mr_lenscalibration.png "MR_LensCalibration.png")

在执行此步骤的过程中，你将需要打印出与校准工具一起下载的棋盘格图像。在此步骤中，校准工具继续根据棋盘格模板截取屏幕截图。

将打印的模板放在摄像机前面的多个位置。使用不同的角度和景深，尤其是在取景框的边缘周围，让校准工具可以收集各种各样的样本。如果校准工具收集了足够的样本，屏幕顶部的文本会发生变化。

如果摄像机设置为自动对焦，你可能会发现在此步骤中禁用自动对焦会很有帮助。

#### 重投影误差

在校准工具收集了足够的样本后，该工具就会显示无畸变的影像预览。如果影像看起来还可以，请按 **Enter** 键继续。如果需要，你可以添加更多样本，或按 **R** 键重置并重新启动。

判断去畸变过程是否有效的一个很好的方法是，在画面中寻找应该为直线的元素（墙角、过道等）。镜头畸变通常会扭曲直角（特别是向取景框边缘扭曲）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bea0df03-e76f-4858-847a-56b190808db8/mr_reprojectionerror.png "MR_ReprojectionError.png")

"重投影误差"报告显示了该过程的准确程度。重投影误差值越低越好。如果该值小于1，说明显示效果非常好！

#### 视角

此步骤最重要的用途可能是对摄像机的视角（或FOV，"视野"）进行估算。

FOV决定了摄像机可以看到的场景范围，务必尽可能使虚拟摄像机的FOV与该值匹配。

如果你已经知道摄像机的FOV值（以度为单位），可以使用 *mrc.FovOverride* 控制台变量对其进行设置。

大多数USB摄像机制造商会列出设备的对角FOV（DFOV）。但是，我们感兴趣的是水平FOV（以度为单位）。你可以使用上一步中选择的分辨率的高度（h）和宽度（w），通过以下公式从对角FOV计算出水平FOV。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24989218-b3d6-47f6-bdb3-2d24953924a1/mr_fovformula.png "MR_FOVFormula.png")

还有一些方法可以计算DSLR镜头的水平FOV。 

如果你不能立刻知道摄像机的特定FOV值，请不要担心，此步骤将为你计算出近似值。

如果你可以调整摄像机的镜头，请注意不要在完成校准后调整变焦。调整变焦将改变物理摄像机的视野（FOV），但不会改变虚拟摄像机的视野。虚拟摄像机使用校准期间使用的FOV。如果在校准后调整了摄像机的变焦，需要重复校准过程。

### 3.对其校准

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acc47201-3b6b-475c-8de6-9945aaeb867a/adjustingalignment2.png "AdjustingAlignment2.png")

在此阶段，你必须重新进行"对齐"和"调整"步骤，直到完成为止。

1.  将控制器与屏幕上的模型对齐。
2.  调整取样对齐。
3.  重复。

务必覆盖头盔的传感器，这样才能从控制器获得准确的跟踪数据。

对于HTC Vive，请确保在启动该工具之前已打开控制器。否则，校准工具可能无法显示要对齐的模型（工具需要能识别正在使用的控制器类型）。

#### 第 1 阶段- 与模型对齐

屏幕上会显示一个用于对齐控制器的粉红色/紫红色模型对齐。当控制器和模型在同一直线上时，将控制器朝向屏幕并扣动扳机。

扣动扳机后，屏幕将把图像定格，然后进入下一步。

#### 第 2 阶段 - 调整样本

首次扣动扳机时可能不完全准确（因为你的手会颤抖）。在此阶段中，要调整最后一个样本，使其在画框中更精确地对齐。

#### 第 3 阶段 - 重复

要对齐的点总共有11个。如果你对某些点的对齐是满意的，可以不必再进行对齐。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25473d39-aab7-46eb-9aa2-3f7cfb410f96/adjustingalignment2.gif)

#### 调整功能按键

-   **Up/Down**：垂直移动模型
-   **Left/Right**：水平移动模型
-   **Num +/-**：放大/缩小模型
-   **Alt + Up/Down**：垂直旋转模型（Pitch）
-   **Alt + Left/Right**：水平旋转模型（Yaw）
-   **Alt + Num +/-**：左右旋转模型（Roll）
-   **H**：隐藏模型及其轮廓
-   **Alt + H**：仅隐藏模型（保留轮廓）
-   **P**：预览对齐
-   **Enter**：接受对齐

#### 预览结果

取样时，屏幕会显示一系列彩色编码图标（十字和目标）。你可以通过查看每对的接近程度来了解对齐的接近程度。你可能希望所有的对都尽可能接近，但如果其中一对相差较多也不要担心（该样本可能不准确）。

按住 **P** 键（或摇杆）可以预览对齐的接近程度。如果对结果满意并希望跳过剩余的对齐点，请按 **End** 键。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0601ca95-6112-4293-9baf-32d3b65fa8a6/mr_previewresults.png "MR_PreviewResults.png")

**视频延迟：**视频源和控制器跟踪之间可能会有一些延迟。这加大了判断两者是否正确对齐的难度。要解决这个问题，可以通过控制台变量 *mrc.TrackingLatencyOverride* 添加延迟，使两者更加同步。

### 4.对齐调整

到目前为止，你一次只调整了一个样本对齐。该样本为校准工具提供了摄像机位置的近似值，但取景框中的某些角落的校准效果可能比其他地方好。 

![单击以播放动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afbad055-b02e-4fa2-bb39-f719ef30cc88/mr_adjustsample.gif)

在此步骤中，屏幕上有五个白框。请将一个控制器移动到每个框中，并在每个框中扣动扳机。

你执行此过程时的深度（到摄像机的距离）应该与计划拍摄的景深相同。

为该区域取样时，每个框都会消失。用手跟踪的模型需要完全在框中才能取样。

#### 进行调整

点击全部5个框之后，屏幕将变为分屏式视图。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f52ea54d-3b84-457d-9321-c6528adeb6d9/mr_makingadjustments.png "MR_MakingAdjustments.png")

与之前的对齐过程一样，移动、旋转和缩放模型以匹配图像。

#### 调整功能按键

-   **Up/Down**：垂直移动模型
-   **Left/Right**：水平移动模型
-   **Num +/-**：放大/缩小模型
-   **Alt + Up/Down**：垂直旋转模型（Pitch）
-   **Alt + Left/Right**：水平旋转模型（Yaw）
-   **Alt + Num +/-**：左右旋转模型（Roll）
-   **`</>`**：上下调整FOV（小心）
-   **R**：重置调整
-   **P**：预览对齐
-   **Enter**：接受调整后的对齐

你可以看到一个样本的调整/优化如何偏离其他样本。

在此步骤中旋转不太好理解，因为你会同时移动所有模型。请把它们看成一个模型，而你在围绕整个模型的中心旋转。将中间的样本置于屏幕中心，并首先对齐它，将其用作参考点。

### 5.合成校准

在此步骤中，你将调整特定的合成设置。这是你在混合现实捕捉中查看合成场景的第一步。现在退出，一切都会正常运行。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e30ce3f-a5e0-4695-a155-dfdeb701275d/mr_compositingcalibratrion.png "MR_CompositingCalibratrion.png")

使用箭头键选择和设置特定值。

#### 色键设置

此步骤中的大多数设置都与色度镶迭过程有关，[UE博客文章](https://www.unrealengine.com/en-US/blog/setting-up-a-chroma-key-material-in-ue4)对此进行了详细讨论。

设置

说明

**色度颜色（ChromaColor）**

色度背景的颜色（通常为绿色）。

**亮度强度（Luminance Power）**

用于分离背景颜色和可能将可见颜色染色的阴影。

**色度剪辑阈值（Chroma Clip Threshold）**

在此容差范围内匹配色度颜色的颜色，将被完全抠像。值越高，抠像区域越大。值为0表示只有与色度颜色完全相同，像素才能完全透明。

**色度不透明强度（Chroma Opacity Strength）**

调整剩余像素的不透明度。数字越大，半透明度越低。颜色越接近色度颜色，该值越高，以防变得透明。

**消溢色强度（Despill Strength）**

调整消溢色强度。值为0表示不执行消溢色校准。

**消溢色剪切FOV上限（Despill Cutoff Cap）**

消溢色校准不会影响与色度颜色的差异超出此公差水平的颜色。值越高，颜色校准越多。

**消溢色锐度（Despill Sharpness）**

用于软化消溢色渐变 - 定义消溢色衰减曲线。以指数方式调整消溢色强度。值越小，越细微/柔和。

**仿造光线反射强度（Faux Bounce Intensity）**

用于调整消溢色过程中所去除颜色的替代颜色强度。值为0表示不应用仿造光线反射强度。

**仿造光线反射颜色（Faux Bounce Color）**

该颜色用于替代消溢色过程中去除的色度颜色溢色。

#### 其他合成设置

设置

说明

**跟踪延迟（Tracking Latency）**

根据视频捕捉设备的不同，视频源相对于控制器可能存在延迟。使用此设置，你可以将延迟应用于控制器以使两者更同步。

**深度偏移（Depth Offset）**

默认情况下，视频与头盔的深度对齐。用于确定拍摄对象前后的渲染内容。允许你在场景的前后应用偏移。

按 **Enter** 键可从一个设置到下一个设置循环显示。如果你对配置满意，请按 **End** 进行保存。你可以随时重启该工具，以便稍后调整这些值。

### 6.削除抠像

削除抠像是遮住你在视频源中始终应该抠去的区域的过程。

如果绿幕未覆盖整个框架，则需要完成此额外过程，从捕捉中抠去多余区域。

这是校准过程的最后一步。如果你没有此问题或无需修复此问题，可以跳过此步骤并退出。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b491277-9ba9-4b2a-91d6-c16c35a8e5d9/mr_garbagematting.png "MR_GarbageMatting.png")

这是工具中唯一需要在VR中进行的步骤。如果你使用头盔，功能按钮将显示在前面。

#### 削除抠像功能按钮

-   **End/Esc**：保存并退出该工具

左控制器

右控制器

-   **握柄（Grip）**：Alt （握住它时功能按钮会改变）
-   **扳机（Trigger）（握住并拖动）**：移动Gizmo
-   **摇杆（Thumbstick）**：撤消

握住左握柄（w/ LGrip held）

-   **扳机（Trigger）**：Gizmo位置复位
-   **摇杆（Thumbstick）**：再次运行

-   **握柄（Grip）**：创建蒙版模型
-   **扳机（Trigger）**：选择/取消选择蒙版模型
-   **摇杆（Thumbstick）**：下一个Gizmo模式（旋转、平移、缩放等）

握住左握柄（w/ LGrip held）

-   **扳机（Trigger）**：取消全选
-   **摇杆（Thumbstick）**：上一个Gizmo模式

![单击以播放动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6be7728-eb74-4618-ae00-0f316aca1c5c/mr_garbagemattingcontrols.gif)

与[VR场景编辑器](/documentation/zh-cn/unreal-engine/virtual-scouting-in-unreal-engine)的工作原理类似，你可以放置和定位3D平面。将平面与要从捕捉中抠去的实际部分匹配。

VR有一个预览窗口，因此你可以在更改蒙版时查看结果。此时，你可以移动摄像机（如果连接到跟踪器）以从不同角度查看它的外观。

完美地对齐蒙版可能并非易事。如果你遇到问题，请尝试直接站在要放置蒙版的位置。使用画中画功能帮助引导该过程。

抠去所需的区域并退出应用程序时，（**End** 或 **Esc**） - 将保存所有设置。如有必要，你可以重启该工具以调整设置。

## 最终结果

完成校准过程后，你可以退出工具。该工具的 *Saved/SaveGames/* 目录中将有一个 *MrcCalibration.sav* 文件。

![单击以播放动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0fe2e89-bf38-4cd5-98d6-f49f4c3890e7/mr_completingcalibration.gif)

如果找到 *MrcCalibration.sav* 文件，请将其复制到游戏的 */Saved/SaveGames/* 文件夹中。如果你的游戏还没有SaveGames目录，则需要手动创建。

完成此过程后，你无需再次执行此操作（除非更改设置）。相同的校准设置文件可以重复用于多个UE作品（如果启用了MRC Framework插件）。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [basics/gettingstarted](https://dev.epicgames.com/community/search?query=basics%2Fgettingstarted)
-   [mr](https://dev.epicgames.com/community/search?query=mr)
-   [landingpage](https://dev.epicgames.com/community/search?query=landingpage)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [校准前设置](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E6%A0%A1%E5%87%86%E5%89%8D%E8%AE%BE%E7%BD%AE)
-   [绿幕和摄像机](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E7%BB%BF%E5%B9%95%E5%92%8C%E6%91%84%E5%83%8F%E6%9C%BA)
-   [校准专用仪器](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E6%A0%A1%E5%87%86%E4%B8%93%E7%94%A8%E4%BB%AA%E5%99%A8)
-   [步骤](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [共享功能按钮](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E5%85%B1%E4%BA%AB%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [校准过程](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E6%A0%A1%E5%87%86%E8%BF%87%E7%A8%8B)
-   [1.选择设备/摄像机/跟踪器](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#1%E9%80%89%E6%8B%A9%E8%AE%BE%E5%A4%87/%E6%91%84%E5%83%8F%E6%9C%BA/%E8%B7%9F%E8%B8%AA%E5%99%A8)
-   [设备选择功能按钮](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E8%AE%BE%E5%A4%87%E9%80%89%E6%8B%A9%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [选择追踪器](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E9%80%89%E6%8B%A9%E8%BF%BD%E8%B8%AA%E5%99%A8)
-   [2.镜头校准](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#2%E9%95%9C%E5%A4%B4%E6%A0%A1%E5%87%86)
-   [重投影误差](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E9%87%8D%E6%8A%95%E5%BD%B1%E8%AF%AF%E5%B7%AE)
-   [视角](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E8%A7%86%E8%A7%92)
-   [3.对其校准](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#3%E5%AF%B9%E5%85%B6%E6%A0%A1%E5%87%86)
-   [第 1 阶段- 与模型对齐](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E7%AC%AC1%E9%98%B6%E6%AE%B5-%E4%B8%8E%E6%A8%A1%E5%9E%8B%E5%AF%B9%E9%BD%90)
-   [第 2 阶段 - 调整样本](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E7%AC%AC2%E9%98%B6%E6%AE%B5-%E8%B0%83%E6%95%B4%E6%A0%B7%E6%9C%AC)
-   [第 3 阶段 - 重复](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E7%AC%AC3%E9%98%B6%E6%AE%B5-%E9%87%8D%E5%A4%8D)
-   [调整功能按键](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E8%B0%83%E6%95%B4%E5%8A%9F%E8%83%BD%E6%8C%89%E9%94%AE)
-   [预览结果](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E9%A2%84%E8%A7%88%E7%BB%93%E6%9E%9C)
-   [4.对齐调整](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#4%E5%AF%B9%E9%BD%90%E8%B0%83%E6%95%B4)
-   [进行调整](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E8%BF%9B%E8%A1%8C%E8%B0%83%E6%95%B4)
-   [调整功能按键](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E8%B0%83%E6%95%B4%E5%8A%9F%E8%83%BD%E6%8C%89%E9%94%AE-2)
-   [5.合成校准](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#5%E5%90%88%E6%88%90%E6%A0%A1%E5%87%86)
-   [色键设置](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E8%89%B2%E9%94%AE%E8%AE%BE%E7%BD%AE)
-   [其他合成设置](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E5%85%B6%E4%BB%96%E5%90%88%E6%88%90%E8%AE%BE%E7%BD%AE)
-   [6.削除抠像](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#6%E5%89%8A%E9%99%A4%E6%8A%A0%E5%83%8F)
-   [削除抠像功能按钮](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E5%89%8A%E9%99%A4%E6%8A%A0%E5%83%8F%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)