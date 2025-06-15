# 虚幻引擎中的虚拟现实旁观者模式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-reality-spectator-screen-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:44:25.588Z

---

目录

![虚拟现实旁观者模式](https://dev.epicgames.com/community/api/documentation/image/598b13de-f5b8-4b94-8d29-e7567256fa3a?resizing_type=fill&width=1920&height=335)

如果是为 Playstation 开发的话，请参考 PlayStation VR (PS VR) 旁观者文档。

如果你希望在其他人与虚拟现实（VR）环境互动（第一人称视角）时充当VR旁观者（第三人称视角），那么虚幻引擎4（UE4） **VR旁观者屏幕** 会是一个理想功能。 在运行VR旁观者屏幕时，你可以用自己的电脑显示器（或电视）观察其他玩家， 这有助于收集用户对沉浸式VR体验的反馈。

*Images Courtesy of [GhostPaint.com](http://ghostpaint.com/)*

![VRSpecScreen.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e118eac-35e0-475c-9225-b61522b215c8/vrspecscreen.png)

![VRPlayerPerspectiveScreen.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67d187d8-5704-4838-b3f1-ebb5a6fdbf4b/vrplayerperspectivescreen.png)

VR 观众画面视角

VR 玩家的头戴显示器视角

*在左侧，你（观众）观察到 VR 中这位艺术家正在绘制砖墙；而在右侧，VR 中艺术家正专注于进行绘制。*

根据头戴显示器（HMD）生产商的不同，VR 观众画面与 VR 社交画面含义相同；或者 VR 观众模式与 VR 镜像模式含义相同。 在此文档的情景中，**观众画面** 是一个连接到 VR 设备的标准输出设备（如电脑显示器或电视）。 此外，启用 **观众模式** 意味着用户能够在玩家使用头戴显示器在 VR 环境中进行游戏时进行观察（或在特定情况下进行交互）。

## 支持平台

以下平台当前支持 UE4 中的观众画面模式：

-   [HTC Vive](https://www.vive.com/us/)
-   [Oculus Rift](https://www.oculus.com/rift/)
-   [Steam VR](http://store.steampowered.com/steamvr)
-   [PlayStation VR (PS VR)](https://www.playstation.com/en-us/explore/playstation-vr/?emcid=pa-pe-97928)

虽然我们希望其他个人电脑设备和主机能够支持此功能，但移动 VR 设备（平台）很难支持此功能。

## 观众画面模式入门

除 PS VR 之外，观众画面模式默认在 UE4 中启动。

在观众画面模式中使用纹理时，左上角的坐标代表最小的坐标值，而右下角的坐标则代表最大的坐标值。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8dcb8307-583a-4c4b-afa6-12545bc744aa/vrspec_bptexturecoordinate.png)

## 旁观者窗口蓝图节点

范例中，我们用了以下蓝图接口：

节点

描述

**[设置旁观者屏幕纹理](/documentation/zh-cn/unreal-engine/set-spectator-screen-texture-in-unreal-engine)**

此节点可以更改社交（旁观者）屏幕上显示的纹理。

**[设置旁观者屏幕模式 TexturePlusEye布局](/documentation/zh-cn/unreal-engine/set-spectator-screen-mode-texture-plus-eye-layout-in-unreal-engine)**

此节点设置了ESpectatorScreenMode中的TexturePlusEye函数的布局。

**[设置旁观者屏幕模式](/documentation/zh-cn/unreal-engine/set-spectator-screen-mode-in-unreal-engine)**

此节点设置了社交（旁观者）屏幕模式。

### 使用范例

1.  在支持观众画面的平台中设置一个 VR 项目。

1.  现在需要新建一个蓝图脚本，指定需要渲染到观众画面的图像。为便于展示，以下蓝图节点对三个键盘输入形成响应：
    
    1.  举例而言，按下 **1** 键时第一个蓝图节点将指定一个静态纹理，它将在纹理区域中被绘制。
        
        ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28336850-71cf-457b-8f53-12a4b13a3aff/vrspec_bp_1.png)
    2.  按下 **2** 键时，第二个蓝图节点将指定一个布局，头戴显示器的眼睛视图将被绘制到整个画面（纹理将在屏幕的左上四分之一半圆中绘制）。此外，此节点将在指定纹理布局的同时确保首先绘制眼睛布局。
        
        ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47bd65b9-fcc5-4fe8-92a2-0decfb03b07a/vrspec_bp_2.png)
        
        眼睛和纹理矩形的最大和最小值被标准化到 `[0.0, 1.0]` 之间。
        
    3.  最后按下 **3** 键时，第三个蓝图节点将启用（因此切换至）**TexturePlusEye** 模式。
        
        ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04a59d11-e5b0-46be-94b1-bfc8cac151c6/vrspec_bp_3.png)

### 最终结果

总而言之，新蓝图随需要使用的观众画面模式设置观众画面的纹理（以及其眼睛和纹理布局）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b132339-2232-4ac2-94e9-2cb1a30f8933/vrspec_bp.png)

虽然纹理可作为一个渲染目标（可从一个 **SceneCaptureComponent2D** 进行写入），或一个用户界面元素的容器，但需要注意的是 **SceneCapture** 的计算开销极大。

如果需要在运行时测试不同纹理或布局，可在观众画面模式启用时切换纹理（甚至布局）。

## 切换模式

如果需要切换至新的观众画面模式，可打开命令行并输入 `vr.SpectatorScreenMode` **值**。例如输入 `vr.SpectatorScreenMode 2` 将启用 **Distorted** 模式，当前 Oculus Rift 支持此模式。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac215c57-0616-42ce-807f-f0fe6c214c41/vrspec_cvarexample.png)

### 支持的模式

不同平台将支持特定的观众画面模式，具体如下：

值

模式

Oculus Rift

SteamVR

PS VR

注解

**0**

Disabled

✓

✓

 

为在头戴显示器上达到最佳效果，此模式禁用观众画面输出。

**1**

SingleEyeLetterboxed

✓

✓

✓

此模式主要用于调试之用，只在屏幕上显示一个宽银幕眼睛。

**2**

Undistorted

✓

✓

✓

这是一个调试模式，显示两只眼睛的整个渲染区域。

**3**

Distorted

✓

 

 

只有 Oculus 支持此模式。具体而言，这是一个 Oculus 特有的调试模式，显示色差等内容。

**4**

SingleEye

✓

✓

✓

和 **Undistorted** 模式相似，这是只用于一只眼睛的调试模式。因为此模式会拉伸场景，因此可用于识别场景中细微的穿帮。

**5**

SingleEyeCroppedToFit

✓

✓

✓

此模式将对眼睛进行裁剪，以填充整个画面。

**6**

Texture

✓

✓

✓

此模式显示指定 **Utexture** 的全屏视图。

**7**

TexturePlusMirror

✓

✓

✓

此模式在一个渲染矩形中显示一个纹理，而眼睛则显示在另一个渲染矩形中。

## 优化观众画面模式

当前观众画面模式没有标准优化设置。如你想要实现观众画面模式的优化解决方案，推荐在 30 fps 下进行场景采集（假定 VR 应用程序以 60、90 或 120 fps 运行）。 此外，推荐将观众画面输出限制为 30 fps。请注意：如果尝试在特定硬件上限制观众画面输出， VR 帧率以 90 fps 运行时则可能出现渲染问题（基本上每三帧就会掉帧）。

## 4.17版已知问题

-   一帧过后运行时创建的渲染目标才会被指定为观众纹理，因此直到应用程序的第一帧被渲染后才会出现无提醒失败。
-   如果渲染目标被销毁，同时又被指定为观众纹理，应用程序可能崩溃。

-   [vr](https://dev.epicgames.com/community/search?query=vr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [支持平台](/documentation/zh-cn/unreal-engine/virtual-reality-spectator-screen-in-unreal-engine#%E6%94%AF%E6%8C%81%E5%B9%B3%E5%8F%B0)
-   [观众画面模式入门](/documentation/zh-cn/unreal-engine/virtual-reality-spectator-screen-in-unreal-engine#%E8%A7%82%E4%BC%97%E7%94%BB%E9%9D%A2%E6%A8%A1%E5%BC%8F%E5%85%A5%E9%97%A8)
-   [旁观者窗口蓝图节点](/documentation/zh-cn/unreal-engine/virtual-reality-spectator-screen-in-unreal-engine#%E6%97%81%E8%A7%82%E8%80%85%E7%AA%97%E5%8F%A3%E8%93%9D%E5%9B%BE%E8%8A%82%E7%82%B9)
-   [使用范例](/documentation/zh-cn/unreal-engine/virtual-reality-spectator-screen-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%8C%83%E4%BE%8B)
-   [最终结果](/documentation/zh-cn/unreal-engine/virtual-reality-spectator-screen-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [切换模式](/documentation/zh-cn/unreal-engine/virtual-reality-spectator-screen-in-unreal-engine#%E5%88%87%E6%8D%A2%E6%A8%A1%E5%BC%8F)
-   [支持的模式](/documentation/zh-cn/unreal-engine/virtual-reality-spectator-screen-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A8%A1%E5%BC%8F)
-   [优化观众画面模式](/documentation/zh-cn/unreal-engine/virtual-reality-spectator-screen-in-unreal-engine#%E4%BC%98%E5%8C%96%E8%A7%82%E4%BC%97%E7%94%BB%E9%9D%A2%E6%A8%A1%E5%BC%8F)
-   [4.17版已知问题](/documentation/zh-cn/unreal-engine/virtual-reality-spectator-screen-in-unreal-engine#417%E7%89%88%E5%B7%B2%E7%9F%A5%E9%97%AE%E9%A2%98)