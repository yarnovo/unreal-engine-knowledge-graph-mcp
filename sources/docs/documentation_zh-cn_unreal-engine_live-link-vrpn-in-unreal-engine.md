# 虚幻引擎中的Live Link VRPN | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/live-link-vrpn-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:08:18.442Z

---

目录

![Live Link VRPN](https://dev.epicgames.com/community/api/documentation/image/b2d89b31-b51f-471f-a805-5e49ec4e131c?resizing_type=fill&width=1920&height=335)

**Live Link** 支持所有通过[VRPN](https://github.com/vrpn/vrpn/wiki)服务器公开的设备（且该服务器支持OpenVR）。VRPN提供了用于VR外围设备的抽象层，以便于它们全都拥有相同的数据报告。鉴于VRPN的性质，你可以具有多个映射到同一设备的 **Live Link主题（Live Link Subjects）**。

## 入门指南

按照下面的步骤，使用 **Live Link VRPN** 设置你的设备。

1.  启动你的VRPN服务器。
    
    VRPN服务器必须支持OpenVR。
    
2.  启动 **虚幻引擎**，然后打开你的项目。
    
3.  启用以下插件：
    
    1.  **Live Link**
        
    2.  **Live Link VRPN**
        
4.  重新启动虚幻引擎4。
    
5.  在虚幻编辑器的 **主菜单** 中，选择 **窗口（Window） > Live Link** 以打开 **Live Link** 窗口。
    
6.  点击 **添加源（Add Source）** 并选择 **Live Link VRPN源（Live Link VRPN Source）**。
    
    ![选择Live Link VRPN源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2b6f4f3-e87d-4635-b6ce-0fa5d509bf39/live-link-vrpn-source.png)
    
    用户选择的Live Link VRPN源，其中显示连接设置（Connection Settings）面板。这些是默认设置。
    
7.  在 **连接设置（Connection Settings）** 窗口中：
    
    1.  将 **IP 地址（IP Address）** 设置为VRPN服务器的IP地址和端口号。在此示例中，VRPN服务器在使用端口3884的本地计算机上运行，因此文本值为127.0.0.1:3884。
        
    2.  为频率设置 **本地更新速率（赫兹）（Local Update Rate in Hz）**，以轮询VRPN服务器。默认值为120，最大值为1000。
        
    3.  将 **设备名称（Device Name）** 设置为VRPN为你的设备使用的标识符。最好使用序列号，而不是常规的设备标识符，因为序列号不会变化。
        
        在此示例中，VRPN服务器使用标识符openvr/controller/1GNGH850VE0304\_Controller\_Left来作为左侧VR控制器。
        
    4.  将 **主题名称（Subject Name）** 设置为易于识别的名称。这将作为 **Live Link主题名称（Live Link Subject Name）**。在此示例中，主题名称为LeftController\_VRPNTracker。
        
    5.  将 **类型（Type）** 设置为以下值之一：
        
        -   **跟踪器（Tracker）**：返回设备的位置和方向来作为虚幻变换。
        -   **模拟（Analog）**：返回介于0到1之间的一个或多个模拟轴，例如设备上的摇杆或滑块。
        -   **调谐钮（Dial）**：返回一个浮点值来表示旋转，例如设备上的调谐钮。
        -   **按钮（Button）**：返回一个浮点数组，其中的值为0或1。
    6.  点击 **添加（Add）**。
        
        ![将连接设置添加到VRPN源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/782685db-eaaa-46dd-90dd-4fb2b44e1330/add-connection-settings.png)
8.  接收到第一个数据之后，具有给定名称的Live Link主题显示在 **VRPN** 小节下。在此示例中，主题名称为LeftController\_VRPNTracker。
    
    ![VRPN小节中的Live Link主题](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ef5cc29-2477-454c-b3f5-cb270939891d/live-link-subject.png)
    
    如果你的Live Link VRPN主题未显示，请参阅下面的[故障排除](/documentation/zh-cn/unreal-engine/live-link-vrpn-in-unreal-engine#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4)小节，了解如何确保接收数据。
    
9.  **对于跟踪器类型：**在关卡中选择 **Actor** 并添加 **LiveLinkComponentController**。将 **Subject Representation** 设置为Live Link VRPN主题。在此示例中，主题是LeftController\_VRPNTracker。
    
    ![添加Live Link组件控制器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1304938-74a0-435d-9324-8035e3475534/live-link-component-controller.png)
    
    **对于其他类型：**由于其他类型是浮点值，请在 **蓝图** 中使用它们来修改场景。
    

### 转向轴映射

由于VRPN未实施标准轴映射，因此Live Link提供了功能按钮来使用Live Link预处理器来为轴映射调整方向。

请按照下面的步骤，在虚幻引擎中为你的设备更改轴映射。

1.  在 **Live Link** 窗口中，点击 **Live Link VRPN主题（Live Link VRPN Subject）**。
    
2.  点击 **查看选项（View Options） > 显示主题属性（Show Subject Properties）**。
    
3.  在 **预处理器（Pre Processors）** 旁边，点击 **添加（Add）(+)** 按钮来添加预处理器。
    
    ![添加Live Link预处理器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61923621-ec59-4c52-8cd4-caeca7824ec3/add-preprocessor-element.png)
4.  将预处理器元素设置为 **变换轴开关（Transform Axis Switch）** 并展开此分段。
    
    ![展开变换轴开关分段](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fc40068-bbe2-4f3a-8050-b7849baf6789/expand-transform-axis-switch.png)
5.  更改 **前面（Front）**、**右侧（Right）** 和 **上轴（Up Axes）** 以匹配设备的坐标系。每个VRPN服务器都可能有不同的默认轴映射，每个设备都可以具有自己的轴映射。如需详细信息，请参阅你的VRPN服务器的文档或配置文件。在此示例中，设备使用-Z表示向前，+X表示向右，+Y表示向上。
    
    ![设置轴](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a46d196-1899-4776-9a20-7fc1dd148378/axis-settings.png)
6.  根据需要移动轴之后，根据需要启动并设置 **偏移位置（Offset Position）** 或 **偏移旋转（Offset Rotation）** 使在世界中达到正确的方向或位置。
    
    ![启用偏移位置和偏移旋转](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dfa3095e-a2ea-400e-9bef-0c5182ad2ae9/enable-offsets.png)

## 故障排除

添加Live Link源时，如果Live Link VRPN主题未显示，请尝试按照下面的提示来排除故障。

-   确保Live Link中指定的IP地址和端口与VRPN服务器匹配。
    
-   如果数据流送是从VRPN中正确发送的，那么可以使用同一服务器上的[LiveLinkXR](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine)插件来进行故障排除。
    
-   在Live Link中，选择Live Link VRPN主题并点击 **查看选项（View Options） > 显示帧数据（Show Frame Data）** 来查看虚幻引擎正在接收的数据。
    

![显示帧数据视图选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6bc9dad-6748-4e14-8062-c09da2edca43/show-frame-data.png)

-   [live link](https://dev.epicgames.com/community/search?query=live%20link)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门指南](/documentation/zh-cn/unreal-engine/live-link-vrpn-in-unreal-engine#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [转向轴映射](/documentation/zh-cn/unreal-engine/live-link-vrpn-in-unreal-engine#%E8%BD%AC%E5%90%91%E8%BD%B4%E6%98%A0%E5%B0%84)
-   [故障排除](/documentation/zh-cn/unreal-engine/live-link-vrpn-in-unreal-engine#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4)