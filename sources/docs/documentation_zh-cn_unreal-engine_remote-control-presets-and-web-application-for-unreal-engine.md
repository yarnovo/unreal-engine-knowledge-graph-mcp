# 虚幻引擎远程控制预设和Web应用程序 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/remote-control-presets-and-web-application-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:35:48.530Z

---

目录

![远程控制预设和Web应用程序](https://dev.epicgames.com/community/api/documentation/image/7ad56386-a5a4-4bad-871e-f183778ef701?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

利用 **远程控制预设（Remote Control Preset）**，收集任何UI参数或函数并组织到单个面板中，并向[远程控制API](/documentation/zh-cn/unreal-engine/remote-control-for-unreal-engine)公开。这些参数和函数可以连接到 **远程控制Web界面（Remote Control Web Interface）** 插件配套的Web应用程序中的控件，以远程控制引擎。此Web应用程序具有内置的UI编辑器，可以用来自定义其界面，而不需要额外的代码来创建它或对其进行格式化。

由于这是Web应用程序，因此你可以同时运行多个客户端。在一个客户端中修改的任何属性都会通过Web服务器将其更改传播到所有其他客户端。这有助于在实时环境中创建协作式的工作流。

![通过远程控制控件来转动光源方向](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46d71d66-128f-4bcf-be74-314c22e6d9da/rem-con.gif)

## [

![远程控制预设入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/452f20c9-4d7a-4984-aaf1-271474464f27/00-tp.png)

远程控制预设入门

借助远程控制预设，你可以收集各种UI参数或函数，并将它们整理到单个面板中，然后向远程控制API公开。





](/documentation/zh-cn/unreal-engine/getting-started-with-remote-control-presets-in-unreal-engine)[

![远程控制协议](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38f51f84-52bb-4d11-9934-bc08e01afd8f/placeholder_topic.png)

远程控制协议

借助远程控制协议，你可以将协议输入数据绑定给被暴露的属性，从而通过外部设备控制属性。





](/documentation/zh-cn/unreal-engine/remote-control-protocols-in-unreal-engine)

[

![远程控制Web应用程序](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c349b3c-6d31-4899-b736-168cf397b1bf/placeholder_topic.png)

远程控制Web应用程序

学习如何通过随附的远程控制Web应用来控制引擎，以及如何使用使用内置UI编辑器，在不创建额外代码或执行格式化的情况下创建自定义UI。





](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine)[

![远程控制面板参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4fee26e1-2071-43ee-a1eb-41e802cf99fd/placeholder_topic.png)

远程控制面板参考

本页面将简要介绍远程控制面板中包含的界面元素和选项。





](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine)

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [remote control](https://dev.epicgames.com/community/search?query=remote%20control)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [远程控制预设入门借助远程控制预设，你可以收集各种UI参数或函数，并将它们整理到单个面板中，然后向远程控制API公开。 远程控制协议借助远程控制协议，你可以将协议输入数据绑定给被暴露的属性，从而通过外部设备控制属性。](/documentation/zh-cn/unreal-engine/remote-control-presets-and-web-application-for-unreal-engine#%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E9%A2%84%E8%AE%BE%E5%85%A5%E9%97%A8%E5%80%9F%E5%8A%A9%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E9%A2%84%E8%AE%BE%EF%BC%8C%E4%BD%A0%E5%8F%AF%E4%BB%A5%E6%94%B6%E9%9B%86%E5%90%84%E7%A7%8Dui%E5%8F%82%E6%95%B0%E6%88%96%E5%87%BD%E6%95%B0%EF%BC%8C%E5%B9%B6%E5%B0%86%E5%AE%83%E4%BB%AC%E6%95%B4%E7%90%86%E5%88%B0%E5%8D%95%E4%B8%AA%E9%9D%A2%E6%9D%BF%E4%B8%AD%EF%BC%8C%E7%84%B6%E5%90%8E%E5%90%91%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6api%E5%85%AC%E5%BC%80%E3%80%82%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E5%8D%8F%E8%AE%AE%E5%80%9F%E5%8A%A9%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E5%8D%8F%E8%AE%AE%EF%BC%8C%E4%BD%A0%E5%8F%AF%E4%BB%A5%E5%B0%86%E5%8D%8F%E8%AE%AE%E8%BE%93%E5%85%A5%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A%E7%BB%99%E8%A2%AB%E6%9A%B4%E9%9C%B2%E7%9A%84%E5%B1%9E%E6%80%A7%EF%BC%8C%E4%BB%8E%E8%80%8C%E9%80%9A%E8%BF%87%E5%A4%96%E9%83%A8%E8%AE%BE%E5%A4%87%E6%8E%A7%E5%88%B6%E5%B1%9E%E6%80%A7%E3%80%82)