# DMX控制控制台 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dmx-control-console
> 
> 生成时间: 2025-06-14T20:29:26.997Z

---

目录

![DMX控制控制台](https://dev.epicgames.com/community/api/documentation/image/fdc2f1b1-3f2f-4695-a3d8-62e6735de198?resizing_type=fill&width=1920&height=335)

**控制控制台（Control Console）** 旨在简化DMX调试，让你能够快速控制一组虚拟的或实体的灯具。它将根据你的库和配接选择自动生成和填充滑块。你可以立即使用这些滑块生成和发送DMX数据。

![DMX控制控制台](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ecd79e7d-37fa-4773-ae9c-6e400b9f396c/control-console.png)

## 工作流程

### 库和配接选择

浏览至包含配接和灯具数据库的 **DMX库** 资产。

![选择正确的DMX库](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a85bf2fa-6579-4141-ba41-0619e3e2aec6/select-library.png)

### 添加灯具配接

然后你可以决定从DMX库添加所有灯具配接，或手动逐个选择灯具配接。

-   点击 **+添加（+ Add）** 将选定的灯具配接添加到现有行。
    
-   点击 **+行（+ Row）** 将选定的灯具配接添加到新行。
    

![用于添加灯具配接的添加和行选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ba150af-3f49-4918-984d-d994ebd352a8/add-fixture-patches.png)

当你将灯具配接添加到控制台时，将在 **调节器组** 内为该配接的各个功能创建一个 **调节器** 。你可以检查调节器组的详细信息，必要时可以在右侧的 **细节视图（Details View）** 中编辑。

![调节器组细节视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79547e80-9848-4d1c-b2a2-fb115b9257c0/details-view.png)

### 添加原始调节器

**原始调节器** 是一个与灯具配接没有任何关系的DMX调节器。要创建原始调节器，请按如下方式处理：

1.  点击 **添加(+)（Add (+)）** 按钮，新建一个调节器组。

![添加新的调节器组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48d3d8f5-8511-4f2f-8c2a-5f7a18e54c8f/add-fader-group.png)

1.  点击调节器组内部的 **添加(+)（Add (+)）** 按钮，创建一个原始调节器。

![添加新的调节器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af094029-8a17-4aba-9d48-29e37a3bdadd/add-fader.png) ![新添加的调节器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9f16e30-fbe2-48de-a3e6-4cb2ba62b708/new-fader-added.png)

然后在 **细节（Details）** 面板中编辑调节器属性，以说明其精度（8位、16位或24位）和其他必要参数，例如域ID（Universe ID）、起始地址（Start Address）和最小值（Min Value）/最大值（Max Value）接受范围。

![调节器设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3254d80-72dc-4241-ba69-8646e9da50d3/fader-settings.png)

### 全局搜索

全局搜索可用于在公开的控制滑块中快速筛选。此搜索接受各种输入，例如调节器组名、属性名称（"红（Red）、绿（Green）、蓝（Blue）、黯淡（Dimmer）"）、灯具ID（fixture ID）（"1、2、4-5"）、域（"域1、2、4-5"）或地址（"1.512"）。

![DMX控制控制台全局搜索](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c35272a9-9d9c-4db2-87ac-1119084e7e3d/global-search.png)

### 振荡器

振荡器提供了一种使所选滑块动画化的方法。我们提供了一些默认振荡器（如正弦波或方波），你也可像使用蓝图那样自己创建振荡器。

![用于将滑块动画化的振荡器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bca2c3f9-29fa-4a81-bc67-c2261883a460/oscillators.png)

-   [dmx](https://dev.epicgames.com/community/search?query=dmx)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [工作流程](/documentation/zh-cn/unreal-engine/dmx-control-console#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [库和配接选择](/documentation/zh-cn/unreal-engine/dmx-control-console#%E5%BA%93%E5%92%8C%E9%85%8D%E6%8E%A5%E9%80%89%E6%8B%A9)
-   [添加灯具配接](/documentation/zh-cn/unreal-engine/dmx-control-console#%E6%B7%BB%E5%8A%A0%E7%81%AF%E5%85%B7%E9%85%8D%E6%8E%A5)
-   [添加原始调节器](/documentation/zh-cn/unreal-engine/dmx-control-console#%E6%B7%BB%E5%8A%A0%E5%8E%9F%E5%A7%8B%E8%B0%83%E8%8A%82%E5%99%A8)
-   [全局搜索](/documentation/zh-cn/unreal-engine/dmx-control-console#%E5%85%A8%E5%B1%80%E6%90%9C%E7%B4%A2)
-   [振荡器](/documentation/zh-cn/unreal-engine/dmx-control-console#%E6%8C%AF%E8%8D%A1%E5%99%A8)