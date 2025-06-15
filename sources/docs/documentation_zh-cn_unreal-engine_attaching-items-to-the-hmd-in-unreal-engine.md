# 在虚幻引擎中为HMD添加显示内容 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/attaching-items-to-the-hmd-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:44:07.535Z

---

目录

![在HMD中添加显示内容](https://dev.epicgames.com/community/api/documentation/image/a6e5ba20-2971-4475-88c0-87df88d51fdf?resizing_type=fill&width=1920&height=335)

虚幻引擎4（UE4）提供了一种标准方法，以便在HMD中添加显示内容。无论你针对哪款头戴式显示器（HMD）进行开发，都可以使用该方法。该方法不仅可用于任何HMD，而且通过该方法添加的内容，将与HMD保持完全同步。在以下文档中，我们将介绍在HMD中添加内容所需的全部知识。

现在，如果你希望获取玩家在世界场景中的位置，你只能获取摄像机Actor的位置。

## 设置对象使它们跟随HMD

你可以对静态网格体、粒子效果、UI元素和许多其他项进行设置，以使它们跟随HMD移动，方法如下。

1.  首先，打开Pawn蓝图并导航至 **视口（Viewport）** 选项卡。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef31aafa-3765-44cb-a429-0a259d83734e/vr_follow_hmd_setup_00.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef31aafa-3765-44cb-a429-0a259d83734e/vr_follow_hmd_setup_00.png)
    
    点击查看大图。
    
2.  在 **组件（Component）** 选项卡中，单击 **添加组件（Add Component）**，然后在搜索框中输入 **Cube** 并单击显示的 **立方体（Cube）** 网格体，以将它添加为组件。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd14ce32-2aaa-4d95-930b-b0846f64a3b0/vr_follow_hmd_setup_01.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd14ce32-2aaa-4d95-930b-b0846f64a3b0/vr_follow_hmd_setup_01.png)
    
    点击查看大图。
    
3.  选中该立方体（Cube）静态网格体并将它拖到摄像机（Camera）上，以使摄像机（Camera）成为该立方体（Cube）静态网格体的父项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f3d310e-4eba-4404-8351-a4dbb0a1db3a/vr_follow_hmd_setup_02.png)
4.  现在，编译蓝图，然后使用UE4编辑器中的VR预览选项启动项目。当你戴上HMD，然后转动头部时，你连接的立方体（Cube）将紧随你的头部移动，如以下视频中所示。
    

## HMD和玩家世界场景位置

你也可以通过使用以下蓝图设置获取摄像机（Camera）组件的位置，从而快速获取玩家及其HMD的准确世界场景位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5fe307b-6573-4e2a-8028-001ab8275002/vr_get_player_location_00.png)

在上图中，只要用户在键盘上按下T键，摄像机在世界场景中的X、Y和Z位置就将输出到屏幕及日志窗口中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cfe22b2-0d2d-4b52-a96b-fe7b63237d8c/vr_follow_hmd_setup_03.png)

-   [vr](https://dev.epicgames.com/community/search?query=vr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置对象使它们跟随HMD](/documentation/zh-cn/unreal-engine/attaching-items-to-the-hmd-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%AF%B9%E8%B1%A1%E4%BD%BF%E5%AE%83%E4%BB%AC%E8%B7%9F%E9%9A%8Fhmd)
-   [HMD和玩家世界场景位置](/documentation/zh-cn/unreal-engine/attaching-items-to-the-hmd-in-unreal-engine#hmd%E5%92%8C%E7%8E%A9%E5%AE%B6%E4%B8%96%E7%95%8C%E5%9C%BA%E6%99%AF%E4%BD%8D%E7%BD%AE)