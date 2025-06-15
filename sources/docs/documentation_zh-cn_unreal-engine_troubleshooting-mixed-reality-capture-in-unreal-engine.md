# 虚幻引擎混合现实捕捉的故障排除 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/troubleshooting-mixed-reality-capture-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:57.893Z

---

目录

![混合现实捕捉的故障排除](https://dev.epicgames.com/community/api/documentation/image/9b3966d8-981f-4639-aedd-5e2e8e9b4bfc?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

此页面提供混合现实捕捉（MRC）的故障排除信息。

## 捕捉时闪烁

根据MR捕捉目标的分辨率（默认值是1080p），你的应用程序可能会受到其渲染目标存储池容量的限制。默认情况下，渲染目标会被设置为"按需要重新分配"，这会导致出现乒乓效应和闪烁，因为MR捕捉目标会与立体渲染目标冲突。(如以下视频所示)

如果发现这种行为，可以将渲染目标大小调整规则更改为"增加"（在engine.ini文件中，请这样设置：*r.SceneRenderTargetResizeMethod=2*）。进行这一更改应该会解决这一问题。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36ee4622-f87b-4a14-9df8-b81579e3063b/mr_captureflicker.gif)

## 捕捉在旁观者模式中不显示

MRC框架使用[虚拟现实旁观者模式](/documentation/zh-cn/unreal-engine/virtual-reality-spectator-screen-in-unreal-engine)来显示合成的场景。这意味着混合现实捕捉仅当在虚拟现实下运行时才会显示。如果你的项目也使用观众画面，那么你需要使用条件语句对使用它们的位置进行校正检查。存在有助于实现这一检查的MRC方法：

**Get Mixed Reality Capture Texture**  
返回Capture Texture，如果不存在，则返回空指针。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3eb5f184-4738-49c4-a868-f9e547ebf711/01-get-mixed-reality_ue5.png "01-get-mixed-reality_ue5.png")

**Is Mixed Reality Capture Broadcasting**  
如果系统将捕捉纹理发送到观众画面，返回true。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28ef9062-9afc-4a30-90b2-ecd7e733e80a/02-is-mixed-reality_ue5.png "02-is-mixed-reality_ue5.png")

**Set Mixed Reality Capture Broadcasting**  
切换捕捉系统是否将捕捉纹理发送到观众画面的设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47fe4ace-d80f-4071-9e2d-b546f1afbaf1/03-set-mixed-reality_ue5.png "03-set-mixed-reality_ue5.png")

**使用MRC方法的一个示例**

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab792638-78db-4a2f-bab7-ccb830f2dfe5/04-bleprint-example_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab792638-78db-4a2f-bab7-ccb830f2dfe5/04-bleprint-example_ue5.png)

Click image to expand.

## 校准过程中控制器/扳机没有响应。

如果在校准过程中控制器输入没有响应，原因可能有以下几种。

-   **头盔传感器未覆盖好。**如果头盔传感器未覆盖好，控制器可能就无法激活。
-   **应用程序窗口需要具有焦点。**如果MRCalibration窗口不是当前活动窗口，校准系统可能无法捕捉控制器动作。 
-   **Oculus系统可能未配置为允许从未知来源（Unknown Sources）运行。**目前处于测试阶段，校准系统仍在积极开发中，Oculus尚未审查。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aac7affa-03ae-4d1f-b39f-67ae23d961ca/mr_oculusunknownsourcessetting.png "MR_OculusUnknownSourcesSetting.png")

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [mr](https://dev.epicgames.com/community/search?query=mr)
-   [landingpage](https://dev.epicgames.com/community/search?query=landingpage)
-   [troubleshooting](https://dev.epicgames.com/community/search?query=troubleshooting)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [捕捉时闪烁](/documentation/zh-cn/unreal-engine/troubleshooting-mixed-reality-capture-in-unreal-engine#%E6%8D%95%E6%8D%89%E6%97%B6%E9%97%AA%E7%83%81)
-   [捕捉在旁观者模式中不显示](/documentation/zh-cn/unreal-engine/troubleshooting-mixed-reality-capture-in-unreal-engine#%E6%8D%95%E6%8D%89%E5%9C%A8%E6%97%81%E8%A7%82%E8%80%85%E6%A8%A1%E5%BC%8F%E4%B8%AD%E4%B8%8D%E6%98%BE%E7%A4%BA)
-   [校准过程中控制器/扳机没有响应。](/documentation/zh-cn/unreal-engine/troubleshooting-mixed-reality-capture-in-unreal-engine#%E6%A0%A1%E5%87%86%E8%BF%87%E7%A8%8B%E4%B8%AD%E6%8E%A7%E5%88%B6%E5%99%A8/%E6%89%B3%E6%9C%BA%E6%B2%A1%E6%9C%89%E5%93%8D%E5%BA%94%E3%80%82)