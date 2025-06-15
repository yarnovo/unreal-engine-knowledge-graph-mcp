# 虚幻引擎协作查看器（Collab Viewer）联网要求 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/networking-requirements-for-the-collab-viewer-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:43:32.799Z

---

目录

![协作查看器（Collab Viewer）联网要求](https://dev.epicgames.com/community/api/documentation/image/31e799d0-635f-4d03-b1ab-781a3f25bf32?resizing_type=fill&width=1920&height=335)

本页介绍使用协作查看器（Collab Viewer）模板将多台计算机接入同一运行时设计查阅会话时所涉及的一些网络要求和注意事项。

## 通过局域网连接

[快速入门](/documentation/zh-cn/unreal-engine/collab-viewer-template-quick-start-in-unreal-engine)页面的操作指示讲述了如何在简单局域网中连接运行的多台计算机。这种情况下，只要满足以下条件即可：

1.  所有计算机均已连接到同一网络。
2.  所有计算机均配备虚幻引擎标准网络端口 **7777**，用于此网络内通信。
3.  没有设置任何中间网络组件（如路由器或网络地址遍历(NAT)服务）来屏蔽连接。

若出现连接问题，请联系网络管理员。

## 在网络间连接

若要让计算机跨多个子网或通过开放式互联网加入会话，则需要执行一些额外的网络配置。具体执行步骤取决于网络配置。通常如下：

-   服务器主机需要经由特定IP地址，对所有客户端可见。这可能需要在路由器上设置NAT遍历规则，并开启防火墙让端口7777上进行对外通信。
-   不要期待自动服务器检测功能在同一网络之外仍适用。客户端需要手动指定要与之连接的服务器IP地址。

为避免延迟和滞后，最好在同一网络内本地使用协作查看器（Collab Viewer）。

## 带宽要求

由于协作查看器（Collab Viewer）模板仅复制网络上的轻量级数据，例如会话中用户的3D变换及激光笔，所以网络带宽的使用应相对较低。若要精确测量，可使用[网络分析器](/documentation/zh-cn/unreal-engine/using-the-network-profiler-in-unreal-engine)分析此模板在网络上的执行方式。

## 其他资源

有关虚幻引擎中联网操作的详情，请参阅[联网和多人游戏](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine)部分的文档。

-   [collaboration](https://dev.epicgames.com/community/search?query=collaboration)
-   [templates](https://dev.epicgames.com/community/search?query=templates)
-   [collab viewer](https://dev.epicgames.com/community/search?query=collab%20viewer)
-   [design review](https://dev.epicgames.com/community/search?query=design%20review)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [通过局域网连接](/documentation/zh-cn/unreal-engine/networking-requirements-for-the-collab-viewer-in-unreal-engine#%E9%80%9A%E8%BF%87%E5%B1%80%E5%9F%9F%E7%BD%91%E8%BF%9E%E6%8E%A5)
-   [在网络间连接](/documentation/zh-cn/unreal-engine/networking-requirements-for-the-collab-viewer-in-unreal-engine#%E5%9C%A8%E7%BD%91%E7%BB%9C%E9%97%B4%E8%BF%9E%E6%8E%A5)
-   [带宽要求](/documentation/zh-cn/unreal-engine/networking-requirements-for-the-collab-viewer-in-unreal-engine#%E5%B8%A6%E5%AE%BD%E8%A6%81%E6%B1%82)
-   [其他资源](/documentation/zh-cn/unreal-engine/networking-requirements-for-the-collab-viewer-in-unreal-engine#%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)