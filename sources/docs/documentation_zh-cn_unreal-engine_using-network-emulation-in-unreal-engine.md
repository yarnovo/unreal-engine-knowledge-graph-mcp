# 在虚幻引擎中使用网络模拟 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-network-emulation-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:57:56.961Z

---

目录

![使用网络模拟](https://dev.epicgames.com/community/api/documentation/image/357523c4-1605-410a-8445-2262519f4773?resizing_type=fill&width=1920&height=335)

若要在一台机器上测试多人游戏，你需要运行多个游戏实例，一个作为服务器，其他作为客户端。通常，这会为你的复制数据创建具有理想条件的环境。你复制的数据将经适当的系统传送，类似于真实的网络环境，但不会有延迟或数据包丢失，这意味着你无法准确了解数据部署到最终用户时的行为方式。同样，基于LAN的测试不会遇到这些情况。

**网络模拟** 可以模拟服务器和客户端的延迟和数据包丢失。这对于识别网络环境中可能出现的问题至关重要。要使用网络模拟，前往 **项目设置（Project Settings）** > **关卡编辑器（Level Editor）** > **运行（Play）** > **多人游戏选项（Multiplayer Options）**，然后将 **启用网络模拟（Enable Network Emulation）** 设置为 **启用（enabled）**。此操作将启用网络模拟设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e17491f5-ba3c-44c0-ba04-1485acc43e72/image_0.png)

## 设置参考

你可以在编辑器、配置文件和控制台中配置网络模拟设置。你可以通过多种方式在不同的上下文中使用这些设置，例如测试高延迟、丢包或抖动。

设置

说明

PktLag

将数据包的发送按以毫秒为单位的指定时间延迟

PktLagVariance

为数据包的延迟时间提供一些随机性，+/-以毫秒为单位的指定量

PktLoss

指定出站数据包被丢弃的百分比，以模拟数据包丢失

PktDup

指定发送重复数据包的百分比

PktOrder

启用时以乱序发送数据包（1 = 启用，0 = 禁用）

你可以用三种方式配置这些设置：**命令行**、在 **控制台** 的 **播放** 中执行、**Engine.INI** 文件。

### 命令行参数

在 **命令行** 中，使用以下命令指定设置：

```cpp
<SettingName>=<Value>
```

## 控制台

在 **控制台** 中使用：

```cpp
Net <SettingName>=<Value>
```

### 默认的Engine.Ini

要从你的 **DefaultEngine.ini** 文件中设置这些值，请添加以下分段，并为每个变量分配一个你要测试的值。

```cpp
[PacketSimulationSettings]
PktLag=0
PktLagVariance=0
PktLoss=0
PktOrder=0
PktDup=0
```

## 使用建议

多人游戏在最佳连接状态下运行时，不会遇到很多只有在连接不佳时才会出现的漏洞。为确保捕获这些漏洞，你应该在极其严苛的条件下执行本地测试和基于LAN的测试。例如：

-   500往返ping。
    
-   10%的数据包丢失或更高。
    

Epic Games会使用这类条件来测试合作性和竞争性的Gameplay。这使得捕获大量漏洞和错误成为可能，而不是将其忽视，同时强烈推进网络性能的优化。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置参考](/documentation/zh-cn/unreal-engine/using-network-emulation-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%8F%82%E8%80%83)
-   [命令行参数](/documentation/zh-cn/unreal-engine/using-network-emulation-in-unreal-engine#%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%8F%82%E6%95%B0)
-   [控制台](/documentation/zh-cn/unreal-engine/using-network-emulation-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0)
-   [默认的Engine.Ini](/documentation/zh-cn/unreal-engine/using-network-emulation-in-unreal-engine#%E9%BB%98%E8%AE%A4%E7%9A%84engineini)
-   [使用建议](/documentation/zh-cn/unreal-engine/using-network-emulation-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%BB%BA%E8%AE%AE)