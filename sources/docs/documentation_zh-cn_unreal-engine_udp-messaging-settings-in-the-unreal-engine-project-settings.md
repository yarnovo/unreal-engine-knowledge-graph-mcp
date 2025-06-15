# 虚幻引擎项目设置中的UDP消息传递设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/udp-messaging-settings-in-the-unreal-engine-project-settings
> 
> 生成时间: 2025-06-14T18:56:57.303Z

---

目录

![UDP消息传递](https://dev.epicgames.com/community/api/documentation/image/eb6d1d87-77cf-40f2-9140-908b3feb6ece?resizing_type=fill&width=1920&height=335)

## UDP消息传递

### 可用性

**设置**

**说明**

**默认启用（Enabled by Default）**

定义UDP消息传递是否默认启用。

禁用后，在运行非编辑器版本时，消息传递将需要添加到命令行。

在发售版本中，无论是否使用此设置，还必须在TargetRules中定义 `ALLOW_UDP_MESSAGING_SHIPPING=1` ，消息传递才可用。

### 传输

**设置**

**说明**

**启用传输（Enable Transport）**

定义UDP传输通道是否应该启用。

可以在命令行上使用 `-UDPMESSAGING_TRANSPORT_ENABLE=` 指定。

**单播端点（Unicast Endpoint）**

要监听并从中发送数据包的IP端点。

格式为 `IP_ADDRESS:PORT_NUMBER` 。

使用 `0.0.0:0` 将绑定到Windows上的默认网络适配器和其他操作系统上的所有可用网络适配器。

在此处指定接口IP会将该接口用于组播。静态端点还可以通过 `<unicast ip:multicast port>` 访问此客户端。

指定IP和端口将允许使用静态端点访问此客户端。

可以在命令行上使用 `-UDPMESSAGING_TRANSPORT_UNICAST=` 指定。

**组播端点（Multicast Endpoint）**

要将组播数据包发送到的IP端点。

格式为 `IP_ADDRESS:PORT_NUMBER` 。

组播IP地址必须在 `224.0.0.0` 到 `239.255.255.255` 的范围内。

可以从命令行使用 `-UDPMESSAGING_TRANSPORT_MULTICAST=` 指定。

**消息格式（Message Format）**

用于序列化UDP消息负载的格式。

你可以从以下选项中选择：

-   **CBOR（平台字节序）（CBOR (Platform Endianness)）** ：UDP消息使用平台字节序以CBOR形式编码。这是最快速且首选的选项，但从小端字节序平台生成的CBOR数据无法由符合外部标准的CBOR解析器读取。如果需要在虚幻引擎外部使用数据，考虑改用 `CborStandardEndianness` 格式。
-   **CBOR（标准字节序）（CBOR (Standard Endianness)）** ：UDP消息使用符合CBOR标准的字节序（大端字节序）以CBOR形式编码。这在小端字节序平台上的执行速度更慢，但数据将可由标准CBOR解析器读取。如果需要在虚幻引擎外部分析或使用UDP消息，这很有用。

**高级（Advanced）**

 

**自动修复（Auto-Repair）**

定义UDP传输通道是否应该在出错时尝试自动修复。

**最大发送速率（Max Send Rate）**

维持的最大传输速率，以千兆位/秒为单位。

默认值为1千兆位/秒。

这用于控制更大数据包在网络上的传输。若没有限制，可能发生数据包数据丢失，因为发送的数据可能超出你的网卡所能支持的数量。

根据你的网络容量，将此值调高或调低。

**自动修复尝试限制（Auto-Repair Attempt Limit）**

自动修复例程将尝试修复的连续尝试次数。

**组播生存时间（Multicast Time to Live）**

发送的组播数据包的生存时间（TTL）。

**静态端点（Static Endpoints）**

静态设备的IP端点。

使用此设置可访问其他子网上的设备，例如Wi-Fi网络上的手机。

格式为 `IP_ADDRESS:PORT_NUMBER` 。

### 隧道

**设置**

**说明**

**启用隧道（Enable Tunnel）**

定义是否启用UDP隧道。

**隧道单播端点（Tunnel Unicast Endpoint）**

要监听并从中发送数据包的本地IP端点。

格式为 `IP_ADDRESS:PORT_NUMBER` 。

**隧道组播端点（Tunnel Multicast Endpoint）**

要将组播数据包发送到的IP端点。

格式为 `IP_ADDRESS:PORT_NUMBER` 。

组播IP地址必须在 `224.0.0.0` 到 `239.255.255.255` 的范围内。

**高级（Advanced）**

 

**远程隧道端点（Remote Tunnel Endpoints）**

远程隧道节点的IP端点。

使用此设置可连接到远程隧道服务。

格式为 `IP_ADDRESS:PORT_NUMBER` 。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [UDP消息传递](/documentation/zh-cn/unreal-engine/udp-messaging-settings-in-the-unreal-engine-project-settings#udp%E6%B6%88%E6%81%AF%E4%BC%A0%E9%80%92)
-   [可用性](/documentation/zh-cn/unreal-engine/udp-messaging-settings-in-the-unreal-engine-project-settings#%E5%8F%AF%E7%94%A8%E6%80%A7)
-   [传输](/documentation/zh-cn/unreal-engine/udp-messaging-settings-in-the-unreal-engine-project-settings#%E4%BC%A0%E8%BE%93)
-   [隧道](/documentation/zh-cn/unreal-engine/udp-messaging-settings-in-the-unreal-engine-project-settings#%E9%9A%A7%E9%81%93)