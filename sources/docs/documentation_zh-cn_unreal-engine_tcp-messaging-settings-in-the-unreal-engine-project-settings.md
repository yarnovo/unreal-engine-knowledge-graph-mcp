# 虚幻引擎项目设置中的TCP消息传递设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/tcp-messaging-settings-in-the-unreal-engine-project-settings
> 
> 生成时间: 2025-06-14T18:57:01.397Z

---

目录

![TCP消息传递](https://dev.epicgames.com/community/api/documentation/image/a66d1f72-169d-4be0-a01c-fd4acdd3c290?resizing_type=fill&width=1920&height=335)

## TCP消息传递

### 传输

**设置**

**说明**

**启用传输（Enable Transport）**

定义是否启用TCP传输通道。

**监听端点（Listen Endpoint）**

要在其中监听传入的连接的IP端点。

格式为 `IP_ADDRESS:PORT_NUMBER` 。留空以禁用监听。

**连接到端点（Connect to Endpoints）**

要尝试对其建立传出连接的IP端点。

使用此设置可连接到远程对等端。

格式为 `IP_ADDRESS:PORT_NUMBER` 。

**连接重试延迟（Connection Retry Delay）**

在传出连接已断开连接或连接失败时，重新建立连接的相邻两次尝试之间的延迟时间。

使用 `0` 会禁用重新连接。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [TCP消息传递](/documentation/zh-cn/unreal-engine/tcp-messaging-settings-in-the-unreal-engine-project-settings#tcp%E6%B6%88%E6%81%AF%E4%BC%A0%E9%80%92)
-   [传输](/documentation/zh-cn/unreal-engine/tcp-messaging-settings-in-the-unreal-engine-project-settings#%E4%BC%A0%E8%BE%93)