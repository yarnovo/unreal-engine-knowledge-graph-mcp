# 虚幻引擎SteamVR 分析与性能 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/steamvr-profiling-and-performance-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:45:01.560Z

---

目录

![SteamVR 分析与性能](https://dev.epicgames.com/community/api/documentation/image/e8274c79-f7c3-44a8-8881-5c85db3d436c?resizing_type=fill&width=1920&height=335)

此页面说明如何对虚幻引擎中的 SteamVR 项目进行性能分析。

## SteamVR Frame Timing 工具

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5fd868cf-dbfd-4ed6-b5ee-5b9ca6b4ecd6/steamvr_propref_00.png)

SteamVR Frame Timing 工具能够追踪 UE 项目运行性能差的原因。无论在编辑器还是在打包版本中，SteamVR Frame Timing 工具都能够确认实际的 CPU 和 GPU 时间，同时负责应用程序节流。要深度了解能够用 SteamVR Frame Timing 工具进行的操作，请查看 [SteamVR Frame Timing 工具](https://developer.valvesoftware.com/wiki/SteamVR/Frame_Timing) 的官方文档。

执行以下步骤显示 SteamVR **Frame Timing** 工具。

1.  右键点击 SteamVR 工具，从出现的菜单中选择 **Settings** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac070fad-3b7d-4ccc-8ec9-92c2f916d822/steamvr_propref_01.png)
2.  然后从 Settings 菜单中点击 **Display Frame Timing** 按钮显示 Frame Timing 工具。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2052dfde-964f-4221-984d-87c796bd46ed/steamvr_propref_02.png)
3.  Frame Timing 运行后即可启动 UE4 项目，在 Frame Timing 工具中查看具体情况。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffdf8ae0-3260-48f8-bffa-19c71cb1f9c2/steamvr_propref_00.png)

## 保存 SteamVR 帧时

您可以保存 **Frame Timing** 工具生成的信息，便于之后查看或发送给其他人员查看。执行以下步骤保存 SteamVR 帧时。

1.  右键点击 SteamVR 工具，从出现的菜单中选择 **Settings** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37915009-c176-4532-b6b1-77cd672a6e87/steamvr_propref_01.png)
2.  然后从 Settings 菜单中点击 **Save Frame Data Now** 按钮保存帧数据。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04d965e1-0be7-4f4c-8084-7592b38abc89/steamvr_propref_03.png)
3.  之后帧时将被保存到一个名为 **VRFrames.csv** 的 .CSV 文件中，保存路径为 **C:\\Program Files (x86)\\Steam\\logs**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6697342c-2abd-4eb6-8ed2-6154a0e2a2d5/steamvr_propref_04.png)

-   [performance and profiling](https://dev.epicgames.com/community/search?query=performance%20and%20profiling)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [SteamVR Frame Timing 工具](/documentation/zh-cn/unreal-engine/steamvr-profiling-and-performance-in-unreal-engine#steamvrframetiming%E5%B7%A5%E5%85%B7)
-   [保存 SteamVR 帧时](/documentation/zh-cn/unreal-engine/steamvr-profiling-and-performance-in-unreal-engine#%E4%BF%9D%E5%AD%98steamvr%E5%B8%A7%E6%97%B6)

相关文档

[

Unreal Insights

![Unreal Insights](https://dev.epicgames.com/community/api/documentation/image/f3818740-1216-4fbb-bff6-249ed0ed43ef?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)