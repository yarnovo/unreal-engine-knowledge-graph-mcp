# 虚幻引擎nDisplay多用户技术参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/ndisplay-multi-user-technical-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:27:26.889Z

---

目录

![nDisplay多用户技术参考](https://dev.epicgames.com/community/api/documentation/image/c0251df6-acc2-4616-b00b-18744886d2a0?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

用[nDisplay](/documentation/zh-cn/unreal-engine/ndisplay-overview-for-unreal-engine)启动[多用户编辑会话](/documentation/zh-cn/unreal-engine/multi-user-editing-in-unreal-engine)时， **虚幻引擎** 会自动创建一个本地服务器作为多个编辑用户同时使用的主机。

在该文档中，你将会了解到在虚幻引擎中使用nDisplay启动虚拟制片项目时，多用户服务器的连接逻辑。

## 多用户连接逻辑

第一次用nDisplay启动虚拟制片项目时，你可以使用[快速启动工具](/documentation/zh-cn/unreal-engine/ndisplay-quick-launch-local-tool-in-unreal-engine)来自动启动一个本地服务器供多个用户连接。

第二次用nDisplay启动项目时，虚幻引擎会自动连接到已有的服务器，如果编辑器已经在会话中运行，还会重新使用已有的多用户编辑会话。如果编辑器没有在nDisplay多用户编辑会话中运行，虚幻引擎会在本地服务器上创建一个新的多用户编辑会话。

你还可以搭建你自己的自定义多用户服务器作为nDisplay多用户编辑会话的主机，用户可以通过本地连接或者通过网络连接。

试图加入一个基于网络的多用户服务器时，虚幻引擎会检查编辑器是否已经在一个多用户编辑会话中运行。如果编辑器正在编辑会话中运行，虚幻引擎会加入生成的多用户服务器和会话。如果编辑器没有在nDisplay多用户编辑会话中运行，那么虚幻引擎会关闭本地多用户服务器，忽视基于网络的多用户服务器，并且启动一个新的本地服务器。

你可以通过下方的示意图来更好地了解虚幻引擎多用户 (**MU**) 连接行为：

![flowchart showing a visual diagram of how unreal engine connects to servers and m u editing sessions](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cad75776-fb23-4ba9-b55a-7c5972c38c80/flowchart.png)

要进一步了解如何开始使用多用户编辑会话，请参考[多用户](/documentation/zh-cn/unreal-engine/multi-user-editing-in-unreal-engine)文档。

要进一步了解如何用nDisplay启动虚拟制片项目，请参考[nDisplay](/documentation/zh-cn/unreal-engine/ndisplay-overview-for-unreal-engine)文档。

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [virtual camera](https://dev.epicgames.com/community/search?query=virtual%20camera)
-   [multi-user](https://dev.epicgames.com/community/search?query=multi-user)
-   [working with media](https://dev.epicgames.com/community/search?query=working%20with%20media)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [多用户连接逻辑](/documentation/zh-cn/unreal-engine/ndisplay-multi-user-technical-reference-in-unreal-engine#%E5%A4%9A%E7%94%A8%E6%88%B7%E8%BF%9E%E6%8E%A5%E9%80%BB%E8%BE%91)

相关文档

[

虚幻引擎多用户编辑

![虚幻引擎多用户编辑](https://dev.epicgames.com/community/api/documentation/image/d972b58a-d8bc-4407-a8d1-f7f34989690b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/multi-user-editing-in-unreal-engine)