# 试用虚幻引擎连接到tvOS设备 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/connecting-to-tvos-devices-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:02:03.944Z

---

目录

![连接到tvOS设备](https://dev.epicgames.com/community/api/documentation/image/cc676f4d-def5-4060-aa3a-09c9a5df4c0c?resizing_type=fill&width=1920&height=335)

**AppleTV** 设备使用类似于iOS设备的方法在Xcode中启动和调试项目。但是，由于最新的tvOS设备没有USB端口，你需要改为使用局域网访问这些设备。本页面将展示如何设置tvOS设备，以便你可以使用虚幻编辑器的 **设备管理器（Device Manager）** 或Xcode连接到该设备。

## 连接tvOS设备

理想情况下，虚幻编辑器的设备管理器和Xcode都应该通过局域网自动识别你的tvOS设备。按照以下核对清单操作，确保该设备对你的计算机可见：

1.  确保你的tvOS设备通过以太网电缆连接到本地网络。虽然也可以通过WiFi连接到Apple TV，但以太网连接更稳定可靠。
    
2.  在虚幻编辑器的主菜单中，选择 **窗口（Window）** > **开发人员工具（Developer Tools）** > **设备管理器（Device Manager）**。
    
3.  在"设备管理器（Device Manager）"窗口中，验证你的tvOS设备是否可见。
    
4.  如果你的tvOS设备不可见，请点击 **连接到IP（Connect to IP）**，然后键入Apple TV的IP地址。
    

你的Apple TV在设备管理器中可见之后，就可以按照与iOS设备相同的工作流程来[启动和调试项目](/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine)。

-   [testing](https://dev.epicgames.com/community/search?query=testing)
-   [debugging](https://dev.epicgames.com/community/search?query=debugging)
-   [tvos](https://dev.epicgames.com/community/search?query=tvos)
-   [xcode](https://dev.epicgames.com/community/search?query=xcode)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [连接tvOS设备](/documentation/zh-cn/unreal-engine/connecting-to-tvos-devices-in-unreal-engine#%E8%BF%9E%E6%8E%A5tvos%E8%AE%BE%E5%A4%87)