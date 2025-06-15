# 使用虚幻引擎时如何修复GPU驱动程序崩溃 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine
> 
> 生成时间: 2025-06-14T19:22:52.035Z

---

目录

![如何修复GPU驱动程序崩溃](https://dev.epicgames.com/community/api/documentation/image/84a7d5fc-e567-4206-86db-da662ee70092?resizing_type=fill&width=1920&height=335)

## GPU崩溃情况概述

在处理含有大量图形的项目时，你有可能会遇到GPU崩溃。发生这种情况时，你将看到如下所示的窗口。

![GPU崩溃](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f1c76f4-3a01-4590-a71a-052f4fb14b50/gpu-crash.png)

接着通常会出现虚幻引擎崩溃报告器窗口。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21ebbdd4-f66e-43fd-abdc-56a28be77616/render-core-crash.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21ebbdd4-f66e-43fd-abdc-56a28be77616/render-core-crash.png)

点击查看大图。

## 发生GPU崩溃的原因

为防止应用程序因使用过多内存而锁死，Windows实施了保护措施。如果一个应用程序的渲染时间超过几秒，Windows就会杀死GPU驱动程序，导致应用程序崩溃。在虚幻引擎这样的应用程序中，无法知道渲染进程的耗时，因此无法在应用程序层面避免崩溃。

## 如何解决此崩溃

在开发项目期间，遇到GPU崩溃的情况并不罕见。但是，有一种方法可在开发过程中避免这种类型的崩溃，就是编辑Windows注册表项，让系统有更多时间运行渲染进程。在本指南中，你将创建两个新的注册表项：`TdrDelay` 和 `TdrDdiDelay` 。

-   `TdrDelay` 用于设置超时阈值。即负责处理和存储（VRAM）的GPU调度程序发出抢占请求时，GPU将此请求延迟的秒数。
    
-   `TdrDdiDelay` 用于设置操作系统（OS）允许线程离开驱动程序的时长。该时长耗尽之后，将发生超时延迟故障。
    

要进一步了解注册表项，请查阅Microsoft关于[Tdr注册表项](https://docs.microsoft.com/en-us/windows-hardware/drivers/display/tdr-registry-keys)的官方文档。

在Windows操作系统上更改注册表项，可能会产生意外的结果，并需要彻底重新安装Windows。尽管在本教程中添加或编辑注册表项应该不会导致这些结果，但我们推荐你在备份系统之后再继续操作。若因修改系统注册表给系统造成损害，Epic Games概不负责。

你需要将两个注册表项添加到显卡驱动。执行以下步骤来添加注册表项。

1.  在Windows操作系统搜索栏中输入"**run**" 。打开 **运行（Run）** 应用程序。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c3d108b-eaec-46c9-8324-77b80040318b/run.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c3d108b-eaec-46c9-8324-77b80040318b/run.png)
    
    点击查看大图。
    
2.  在搜索字段中，输入"**regedit**" 。点击 **确定（OK）** 打开注册表编辑工具。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3092aec8-f7a7-49c8-aaf4-eb1cc11df99e/run-reg-edit.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3092aec8-f7a7-49c8-aaf4-eb1cc11df99e/run-reg-edit.png)
    
    点击查看大图。
    
3.  在注册表编辑工具左侧导航栏中找到 **GraphicsDrivers** 分段。此项的位置是 `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\GraphicsDrivers`。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75ddb846-5dda-4c76-9b30-bd06d7a93df5/reg-edit-graphics-drivers.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75ddb846-5dda-4c76-9b30-bd06d7a93df5/reg-edit-graphics-drivers.png)
    
    点击查看大图。
    
    注册表项需要添加到 **GraphicsDrivers** 文件夹，而不是其子文件夹。请务必选择正确的文件夹。
    
4.  你需要的注册表项称为 `TdrDelay` 。如果该注册表项已存在，请双击进行编辑。如果尚未存在，请右键点击右侧的窗格，并选择 **新建（New） > DWORD (32 位)值（DWORD (32-bit) Value）** 。
    
    ![创建新DWORD注册表项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5a0e5c7-556c-4d34-8e4f-1337ab4d5049/new-dword.png)
5.  将 **基数（Base）** 设置为 **十进制（Decimal）** 。将TdrDelay的 **值（Value）** 设置为 **60** 。点击 **确定（OK）** 完成。
    
    ![TdrDelay设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27606f64-6167-4487-8f18-2eb2d0ed9bff/tdr-delay.png)
6.  你需要称为 `TdrDdiDelay` 的第二个注册表项。如果该注册表已存在，请双击进行编辑。如果尚未存在，请右键点击右侧的窗格，并选择 **新建（New） > DWORD (32 位)值（DWORD (32-bit) Value）** 进行创建。
    
7.  将 **基数（Base）** 设置为 **十进制（Decimal）** 。将 `TdrDdiDelay` 的 **值（Value）** 设置为 **60** 。点击 **确定（OK）** 完成。
    
    ![TdrDdiDelay设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e21d6fe-20e7-49e3-a8c3-9ac53b44440d/tdr-ddi-delay.png)
8.  你的注册表现在应该包括 `TdrDelay` 和 `TdrDdiDelay`。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0168ab9b-bb78-4541-81a5-cf3f2712c358/graphics-drivers-final.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0168ab9b-bb78-4541-81a5-cf3f2712c358/graphics-drivers-final.png)
    
    点击查看大图。
    
9.  关闭注册表编辑器。
    
10.  重启计算机，使这些更改生效。
    

## 结果

添加这些注册表项之后，Windows现在将等待60秒，再确定应用程序的渲染进程是否耗时太久。如果你仍遇到类似的GPU崩溃，请将注册表项 `TdrDelay` 和 `TdrDdiDelay` 中的 **值（Value）** 从 **60** 更改为 **120** 秒。

虽然这种方法能够很好地遏制基于渲染的GPU崩溃，但并不能解决所有崩溃。如果你尝试同时处理太多数据，无论你将超时延迟设置得多长，GPU都可能会超时。该解决方案只是给你的显卡稍微多提供了一点时间。

-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [GPU崩溃情况概述](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine#gpu%E5%B4%A9%E6%BA%83%E6%83%85%E5%86%B5%E6%A6%82%E8%BF%B0)
-   [发生GPU崩溃的原因](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine#%E5%8F%91%E7%94%9Fgpu%E5%B4%A9%E6%BA%83%E7%9A%84%E5%8E%9F%E5%9B%A0)
-   [如何解决此崩溃](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E6%AD%A4%E5%B4%A9%E6%BA%83)
-   [结果](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine#%E7%BB%93%E6%9E%9C)