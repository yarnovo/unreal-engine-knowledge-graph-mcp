# 虚幻引擎中的运动控制器组件设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/motion-controller-component-setup-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:43:42.331Z

---

目录

![运动控制器组件设置](https://dev.epicgames.com/community/api/documentation/image/2f319de7-0596-4e8a-8856-55fa03be1dde?resizing_type=fill&width=1920&height=335)

无论你是要针对哪个虚拟现实平台进行开发，添加对运动控制器的支持都可以提升沉浸感和互动程度，而这是无法通过控制器或鼠标和键盘实现的。在以下操作指南中，我们将介绍如何向支持运动控制器的VR平台添加这种支持。

## 支持的平台

"组件（Components）"选项卡中的运动控制器组件将适用于下VR平台。

-   Oculus VR
-   Steam VR
-   Gear VR
-   Playstation VR
-   Google VR

如果没有列出你开发的目标平台，确保查看平台文档以了解如何设置运动控制器以便使用。

## 运动控制器设置

在下面一节中，我们将介绍如何添加和设置运动控制器工作所需的组件。

本操作指南在编写时，假设你已设置了Pawn，以能够与你开发所针对的VR头戴式显示器（HMD）配合工作。如果你不确定如何操作，请查看你开发所针对的VR头戴式显示器（HMD）的[入门指南](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine)。

1.  首先，在 **内容浏览器** 内部，找到并打开 **玩家Pawn** 蓝图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07063eaf-2be5-4cbb-b832-0627b59e2f91/01-select-vr-pawn_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07063eaf-2be5-4cbb-b832-0627b59e2f91/01-select-vr-pawn_ue5.png)
    
    点击查看大图。
    
2.  在 **组件（Components）** 部分，单击 **添加组件（Add Component）** 按钮，以显示可以添加到该蓝图的组件。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9393c64d-8931-4b97-998a-e621fa977c6a/02-add-button_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9393c64d-8931-4b97-998a-e621fa977c6a/02-add-button_ue5.png)
    
    点击查看大图。
    
3.  在搜索框中输入 **Motion**，然后单击 **运动控制器（Motion Controller）** 组件以将其添加到组件列表，并将其命名为 **MC\_Left**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08a68d88-c37c-49c7-b248-7d3f308df208/03-motion-controller_ue5.png)
4.  选择新添加的运动控制器组件，在 **细节（Details）** 面板的 **运动控制器（Motion Controller）** 部分下面，确保将 **手（Hand）** 设置为 **左（Left）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e43f58a-6b1d-4187-a025-889984be4b00/04-motion-source-left_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e43f58a-6b1d-4187-a025-889984be4b00/04-motion-source-left_ue5.png)
    
    点击查看大图。
    
5.  接下来，选择 **组件（Components）面板** 中的 **运动控制器组件（Motion Controller Component）**，单击 **添加组件（Add Component）** 按钮，然后搜索并添加 **静态网格体组件（Static Mesh Component）**，将其命名为 **SM\_Left**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fa9fcc6-5c72-48a0-88fd-c1929b0e49b7/05-sm-left_ue5.png)
    
    确保该静态网格体组件是运动控制器组件的子代，否则在运动控制器移动时，静态网格体不会跟随。
    
6.  现在，在静态网格体组件"细节（Details）"面板的 **静态网格体（Static Mesh）** 部分中，输入"静态网格体（Static Mesh）"来表示运动控制器的外观。在本示例中，我们使用简单箱体，但你可以随意使用任何现有的静态网格体。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dfe0e8b5-cf09-4f86-b3ba-9af7fdb52a71/06-static-mesh-cube_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dfe0e8b5-cf09-4f86-b3ba-9af7fdb52a71/06-static-mesh-cube_ue5.png)
    
    点击查看大图。
    
7.  现在，复制整个左手运动控制器设置，然后将 **左（Left）** 替换为 **右（Right）**。还需确保该运动控制器将用于哪只手，方法是前往运动控制器组件，然后将 **手（Hand）** 从"左（Left）"更改为 **右（Right）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14d302ea-1483-40aa-bd74-db3664869b51/07-mc-right_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14d302ea-1483-40aa-bd74-db3664869b51/07-mc-right_ue5.png)
    
    点击查看大图。
    
8.  编译并保存你的Pawn蓝图，确保将它放在测试关卡中，然后启动项目。当你戴上HMD，拿起运动控制器时，现在应该能够执行以下视频中显示的操作。
    

## 运动控制器组件可视化

运动控制器有一个 **可视化（Visualization）** 分类，能让你快速且便捷的添加一个显示模型静态网格体到运动控制器。在默认情况下，系统会试图加载一个与驱动运动控制器的设备相匹配的静态网格体模型。该可视化字段提供下列选项：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eec10f01-5745-424c-8e34-50c1966066e9/08-visualization-settings_ue5.png "08-visualization-settings_ue5.png")

属性名称

说明

**显示设备模型（Display Device Model）**

用于自动渲染一个与设定手关联的模型。

**显示模型源（Display Model Source）**

确定需要的模型的源。在默认情况下，活跃的XR系统会接受查询并为关联设备提供一个模型（如果有）。注意：如果没有默认模型，这可能会失败；请使用 '自定义' 指定你自己的模型。

**自定义显示网格体（Custom Display Mesh）**

将显示一个关联到此运动控制器的网格体覆盖。

**显示网格体材质覆盖（Display Mesh Material Overrides）**

指定显示网格体的材质覆盖。

## 培训直播

\[OBJECT:TopicCompactVideo\] \[PARAMLITERAL:title\]

Setting Up Motion Controllers

\[/PARAMLITERAL\] \[PARAMLITERAL:videoid\]  

6ALnsdQnkVQ

\[/PARAMLITERAL\] \[PARAMLITERAL:service\]

youtube

\[/PARAMLITERAL\] \[/OBJECT\] \[OBJECT:TopicCompactVideo\] \[PARAMLITERAL:title\]

Creating Interactions in VR With Motion Controllers Part 1

\[/PARAMLITERAL\] \[PARAMLITERAL:videoid\]

eRNtgFo6iU0

\[/PARAMLITERAL\] \[PARAMLITERAL:service\]

youtube

\[/PARAMLITERAL\] \[/OBJECT\] \[OBJECT:TopicCompactVideo\] \[PARAMLITERAL:title\]

Creating Interactions in VR With Motion Controllers Part 2

\[/PARAMLITERAL\] \[PARAMLITERAL:videoid\]  

utOahIZgKgc

\[/PARAMLITERAL\] \[PARAMLITERAL:service\]

youtube

\[/PARAMLITERAL\] \[/OBJECT\] \[OBJECT:TopicCompactVideo\] \[PARAMLITERAL:title\]

Creating Interactions in VR With Motion Controllers Part 3

\[/PARAMLITERAL\] \[PARAMLITERAL:videoid\]

fcmRGkpWefY

\[/PARAMLITERAL\] \[PARAMLITERAL:service\]

youtube

\[/PARAMLITERAL\] \[/OBJECT\]

-   [vr](https://dev.epicgames.com/community/search?query=vr)
-   [motion controller](https://dev.epicgames.com/community/search?query=motion%20controller)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [支持的平台](/documentation/zh-cn/unreal-engine/motion-controller-component-setup-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E5%B9%B3%E5%8F%B0)
-   [运动控制器设置](/documentation/zh-cn/unreal-engine/motion-controller-component-setup-in-unreal-engine#%E8%BF%90%E5%8A%A8%E6%8E%A7%E5%88%B6%E5%99%A8%E8%AE%BE%E7%BD%AE)
-   [运动控制器组件可视化](/documentation/zh-cn/unreal-engine/motion-controller-component-setup-in-unreal-engine#%E8%BF%90%E5%8A%A8%E6%8E%A7%E5%88%B6%E5%99%A8%E7%BB%84%E4%BB%B6%E5%8F%AF%E8%A7%86%E5%8C%96)
-   [培训直播](/documentation/zh-cn/unreal-engine/motion-controller-component-setup-in-unreal-engine#%E5%9F%B9%E8%AE%AD%E7%9B%B4%E6%92%AD)