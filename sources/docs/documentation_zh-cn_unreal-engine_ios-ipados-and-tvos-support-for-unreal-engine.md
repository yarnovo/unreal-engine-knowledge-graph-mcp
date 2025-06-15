# 虚幻引擎的iOS、iPadOS和tvOS支持 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/ios-ipados-and-tvos-support-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:01:33.461Z

---

目录

![iOS、iPadOS和tvOS](https://dev.epicgames.com/community/api/documentation/image/6e0393b9-eff6-418b-b2e9-6d451123bdb6?resizing_type=fill&width=1920&height=335)

**虚幻引擎** 支持发布到 **iOS** 和 **tvOS** 设备。这些平台的开发需要进行专门的设置，需要一台运行 **MacOS** 的机器来为Apple生态系统中的C++项目进行签名构建，并且你需要使用 **Xcode** 调试iOS和tvOS设备上的构建。本小节将介绍如何使用这些工具，在你的团队主要使用Windows时如何简化工作流程，以及如何充分利用iOS和tvOS功能。此外，iOS和tvOS的工作流程大体相同，这些指南介绍了它们之间的一些差异。

## 入门指南

[

![iOS快速入门指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/739f81ca-c4a1-4bda-bc92-70c5f98445d3/placeholder_topic.png)

iOS快速入门指南

为iOS、tvOS或iPadOS设置虚幻引擎项目。





](/documentation/zh-cn/unreal-engine/setting-up-an-unreal-engine-project-for-ios)[

![连接到tvOS设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3e7f0fb-30f0-4b48-9a7b-5ab79e5be67f/placeholder_topic.png)

连接到tvOS设备

设置测试和调试管线，用于通过局域网连接tvOS。





](/documentation/zh-cn/unreal-engine/connecting-to-tvos-devices-in-unreal-engine)

## 适用于Windows用户的iOS和tvOS

[

![用Windows系统编译iOS项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d774e939-aba0-4a67-b974-19b350dfa431/ios_qs_editor_topicimage.png)

用Windows系统编译iOS项目

如何从安装Windows系统的计算机上对Mac进行远程编译，从而创建iOS项目。





](/documentation/zh-cn/unreal-engine/creating-remote-builds-of-unreal-engine-projects-for-ios)[

![Windows Metal Shader编译器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d76bb196-725e-4741-8973-dc940401c29e/placeholder_topic.png)

Windows Metal Shader编译器

将Windows Metal Shader编译器用于iOS项目





](/documentation/zh-cn/unreal-engine/using-the-windows-metal-shader-compiler-for-ios-in-unreal-engine)

## 开发指南

[

![处理iOS输入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f98ab11c-decb-4c40-8231-d6d2e92b6b37/placeholder_topic.png)

处理iOS输入

本指南介绍如何在iOS、tvOS和iPadOS 14及更高版本上使用外部输入设备





](/documentation/zh-cn/unreal-engine/working-with-ios-input-in-unreal-engine)[

![本地化iOS项目中的plist和NSLocalizedString](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a159efaa-a27e-4105-b46b-1c8531f5e611/placeholder_topic.png)

本地化iOS项目中的plist和NSLocalizedString

本页面将显示如何识别项目代码中需要翻译的字符串。





](/documentation/zh-cn/unreal-engine/localizing-plist-and-nslocalizedstring-in-an-ios-project-in-unreal-engine)[

![iOS故事板启动](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2709e98-2784-4db2-8922-a1a547099b84/ios_qs_editor_topicimage.png)

iOS故事板启动

在虚幻引擎项目中为iOS设置启动画面故事板





](/documentation/zh-cn/unreal-engine/setting-up-ios-launch-storyboards-in-unreal-engine-projects)

## 打包和发布

[

![打包iOS项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ed18d76-4954-431b-b5a1-b236b8481ff8/ios_qs_editor_topicimage.png)

打包iOS项目

了解如何打包虚幻引擎iOS项目





](/documentation/zh-cn/unreal-engine/packaging-ios-projects-in-unreal-engine)

## 调试

[

![访问iOS和tvOS上的日志和崩溃报告](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01f14ed1-4323-4bf4-8ad1-00f0fc11d202/placeholder_topic.png)

访问iOS和tvOS上的日志和崩溃报告

直接从设备或从TestFlight下载并阅读iOS和tvOS日志和崩溃报告。





](/documentation/zh-cn/unreal-engine/accessing-logs-and-crash-reports-on-ios-and-tvos-in-unreal-engine)[

![使用Xcode调试iOS项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d312c7c-03ca-41b5-94e1-aa2edc82d4b8/placeholder_topic.png)

使用Xcode调试iOS项目

使用Xcode在设备上启动项目，以及使用断点和LLDB命令调试项目。





](/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine)[

![使用远程会话插件进行iOS开发](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c9f87c9-809c-407e-945a-60cdc9817a45/ios_qs_editor_topicimage.png)

使用远程会话插件进行iOS开发

在PC上复制iOS设备的输入，以便进行测试。





](/documentation/zh-cn/unreal-engine/using-the-remote-session-plugin-for-ios-development-in-unreal-engine)[

![使用Xcode iOS模拟器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4544baf9-d95a-40b0-abdc-b24366291dc4/placeholder_topic.png)

使用Xcode iOS模拟器

无需实体设备，使用Xcode的iOS模拟器在各种iOS设备上测试你的项目。





](/documentation/zh-cn/unreal-engine/using-the-xcode-ios-simulator-with-unreal-engine-projects)

## 优化

[

![iOS游戏包体大小](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28cbf9f2-c008-45cb-9b0a-2712d131a23d/ios_qs_editor_topicimage.png)

iOS游戏包体大小

影响iOS已打包游戏大小的因素。





](/documentation/zh-cn/unreal-engine/optimizing-packaged-game-size-for-ios-projects-in-unreal-engine)

-   [ios](https://dev.epicgames.com/community/search?query=ios)
-   [tvos](https://dev.epicgames.com/community/search?query=tvos)
-   [ipados](https://dev.epicgames.com/community/search?query=ipados)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门指南](/documentation/zh-cn/unreal-engine/ios-ipados-and-tvos-support-for-unreal-engine#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [适用于Windows用户的iOS和tvOS](/documentation/zh-cn/unreal-engine/ios-ipados-and-tvos-support-for-unreal-engine#%E9%80%82%E7%94%A8%E4%BA%8Ewindows%E7%94%A8%E6%88%B7%E7%9A%84ios%E5%92%8Ctvos)
-   [开发指南](/documentation/zh-cn/unreal-engine/ios-ipados-and-tvos-support-for-unreal-engine#%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97)
-   [打包和发布](/documentation/zh-cn/unreal-engine/ios-ipados-and-tvos-support-for-unreal-engine#%E6%89%93%E5%8C%85%E5%92%8C%E5%8F%91%E5%B8%83)
-   [调试](/documentation/zh-cn/unreal-engine/ios-ipados-and-tvos-support-for-unreal-engine#%E8%B0%83%E8%AF%95)
-   [优化](/documentation/zh-cn/unreal-engine/ios-ipados-and-tvos-support-for-unreal-engine#%E4%BC%98%E5%8C%96)