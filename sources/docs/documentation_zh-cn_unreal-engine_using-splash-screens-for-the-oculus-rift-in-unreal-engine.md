# 在虚幻引擎中为 Oculus Rift 设置启动画面 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-splash-screens-for-the-oculus-rift-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:45:54.475Z

---

目录

![为 Oculus Rift 设置启动画面](https://dev.epicgames.com/community/api/documentation/image/51e077a8-fa83-4597-8f48-8e6607a0b766?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [使用运动控制器](/documentation/zh-cn/unreal-engine/using-motion-controllers-in-unreal-engine)

Skill\_family: Tutorial Level 1 Version: 5.0 Parent: sharing-and-releasing-projects/xr-development/supported-xr-platforms/developing-for-oculus/OculusHowTo Order: 2 tags: Oculus prereq: sharing-and-releasing-projects/xr-development/supported-xr-platforms/developing-for-steamvr/HowTo/StandingCamera prereq: sharing-and-releasing-projects/xr-development/making-interactive-xr-experiences/using-motion-controllers prereq: sharing-and-releasing-projects/xr-development/supported-xr-platforms/developing-for-oculus/OculusHowTo/GuardianSystem

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d0c843e-079a-4452-8512-648cd420852a/htsplashscreen_hero_image.png)

在 UE VR 项目中变更关卡时有大量数据被卸载和加载，因此用户可能会遇到一些帧率问题。为掩盖加载新关卡时可能出现的帧率问题，可显示一个过渡画面或影片。以下教程将说明如何在 UE 项目中设置并调用过渡画面。

## 步骤

\* 针对此指南，您需要下载、解压并导入以下 zip 文件中包含的两个文件，**[Oculus 过渡画面源文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/3480984d-aa4c-4f91-8191-36973ef55240/oclussplashscreensourcecontent.zip)**

1.  打开 VRPawn 并前往 **事件图表**。在事件图表中点击右键，搜索并添加以下蓝图节点：
    
    -   Event Begin Play
    -   Set Tracking Origin
    -   Enable Auto Loading Splash Screen
    -   Add Loading Splash Screen
    -   Hide Splash Screen
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28b5ca80-2c9c-4e71-b74e-c94c87893e6d/htsplashscreen_00.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28b5ca80-2c9c-4e71-b74e-c94c87893e6d/htsplashscreen_00.png)
    
    点击查看全图。
    
2.  我们需要在关卡加载时调用过渡画面，因此需要首先启动过渡画面的自动加载，然后设置过渡画面的内容。最后我们需要隐藏过渡画面，以便在之后需要时调用。对 VRPawn 事件图表中的节点进行设置，使其与下图相符：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21041ceb-2b42-4340-9b5c-6f64d5612bcd/htsplashscreen_01.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21041ceb-2b42-4340-9b5c-6f64d5612bcd/htsplashscreen_01.png)
    
    点击查看全图。
    
    勾选 **Enable Auto Loading Splash Screen** 上的 **Auto Show Enabled** 属性，之后关卡加载时便会自动调用过渡画面。
    
3.  **Add Loading Splash Screen** 节点中有一个 **Texture** 输出，控制调用此节点时将显示的纹理或影片。将 **T\_UE4\_Logo\_00** 或其他纹理设为使用的纹理。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca17f50f-239b-4a73-b86f-fc2e7037f892/htsplashscreen_02.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca17f50f-239b-4a73-b86f-fc2e7037f892/htsplashscreen_02.png)
    
    点击查看全图。
    
    将纹理设为过渡画面的图像时，最好将纹理压缩设置设为 **UserInterface2D** 并启用 **Never Stream** 选项，确保过渡画面以最高精度显示。
    
4.  将以下三个节点连接到 VRPawn 事件图表，以便显示和隐藏过渡画面。设置完成后应与下图相同：
    
    -   Motion Controller (L)Trigger
    -   Show Loading Splash Screen
    -   Hide Loading Splash Screen
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e1f8ed6-5f8d-4a39-aa8d-0abeee98a12f/htsplashscreen_03.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e1f8ed6-5f8d-4a39-aa8d-0abeee98a12f/htsplashscreen_03.png)
    
    点击查看全图。
    
    可以用此方式显示过渡画面，但也可将此功能添加到关卡蓝图，使关卡加载后便会出现过渡画面，直到关卡加载完成。
    
5.  操作完成后，VRPawn 蓝图与下图相似。此时便可戴上头戴显示器，手持触摸控制器，站在 VR 交互区中央。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9006b343-efbf-443d-91f9-baa9b7ce82bb/htsplashscreen_04.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9006b343-efbf-443d-91f9-baa9b7ce82bb/htsplashscreen_04.png)
    
    点击查看全图。
    

## 最终结果

现在按下触摸控制器上的左扳机键后，场景应变黑，并出现 UE Logo 或您选择的图像。松开触摸控制器左扳机键将返回关卡，显示以下视频中的画面。

## UE 项目下载

可使用以下链接下载用于创建此例的 UE 项目。

-   [**Oculus Rift 过渡画面范例项目**](https://epicgames.box.com/s/1rirqbohl7inchgnssznuam7ylalrzk4)

-   [oculus](https://dev.epicgames.com/community/search?query=oculus)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-splash-screens-for-the-oculus-rift-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-splash-screens-for-the-oculus-rift-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [UE 项目下载](/documentation/zh-cn/unreal-engine/using-splash-screens-for-the-oculus-rift-in-unreal-engine#ue%E9%A1%B9%E7%9B%AE%E4%B8%8B%E8%BD%BD)