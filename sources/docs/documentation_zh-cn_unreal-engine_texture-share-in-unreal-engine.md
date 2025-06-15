# 虚幻引擎中的纹理共享 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/texture-share-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:57.716Z

---

目录

![纹理共享](https://dev.epicgames.com/community/api/documentation/image/9e878363-eda3-4033-992b-c64f0c3f9d85?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**纹理共享** 将数据保存在GPU内存中，绕过CPU及其高昂的内存复制操作开销，从而高效地在进程之间发送和接收GPU数据。

共享数据示例包括GPU纹理、投影和摄像机矩阵，以及深度缓冲区。纹理共享支持同步机制和线程屏障，确保应用程序之间的一致性。

纹理共享可以通过以下方法集成到项目中：

-   C++ SDK与DirectX11和DirectX12集成
    
-   蓝图
    
-   支持nDisplay
    

![虚幻将其视口发送到外部应用程序，在旋转立方体上渲染为纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79486868-f758-4e3f-b0c9-e016c9104cfa/unreal_sharing_viewport.gif)

虚幻引擎与外部应用程序共享视口的示例。应用程序将视口作为旋转立方体上的纹理。

## 示例项目

C++项目样本与引擎源代码都包含在文件夹 **Engine/Source/Programs/TextureShare/Samples/ThirdParty** 中。这里有一些关于如何将DirectX11和DirectX12与纹理共享配合使用的例子。欲了解如何开始使用纹理共享，请参阅[快速入门](/documentation/zh-cn/unreal-engine/texture-share-quick-start-for-unreal-engine)。

## 同步策略

纹理共享中每次交互必然有一个发送方和接收方来共享GPU数据。应用程序交换数据时，发送方和接收方应针对发送和接收操作使用镜像优先级。

例如，让虚幻引擎做发送方，一个第三方DirectX应用程序做接收方：

-   虚幻引擎将执行发送，然后执行接收。
    
-   第三方应用程序将执行接收，然后执行发送。
    

纹理共享提供了多个选项，可在交换的不同阶段进行同步以控制阻塞行为。下文描述了这三个阶段。

### 连接同步模式

**连接同步模式** 定义客户端和服务器连接时的同步策略。下表介绍这些策略：

选项

说明

默认（Default）

此模式使用模块的全局设置。默认连接同步策略为：

-   **客户端（Client）：**SyncSession
-   **服务器（Server）：**无（None）

无（None）

当远程进程连接到纹理共享机制时，此模式不会阻塞。

SyncSession

此模式会阻塞，直至远程进程成功连接并准备好交换数据。

### 帧同步模式

**帧同步模式** 定义已生成帧的同步策略。下表介绍这些策略：

选项

说明

默认（Default）

此模式使用模块的全局设置。默认帧同步策略为：

-   **客户端（Client）：**FrameSync
-   **服务器（Server）：**FrameSync

无（None）

这种模式不会与远程进程同步帧，并且可能会跳帧。

FrameSync

此模式确保应用程序交换帧时不会跳帧。此模式保证进程之间的帧索引一致。

### 纹理同步模式

**纹理同步模式** 定义建立纹理共享连接机制时读写数据的操作顺序。下表介绍这些策略：

选项

说明

默认（Default）

此模式使用模块全局设置。默认纹理同步策略为：

-   **客户端（Client）：**SyncRead
-   **服务器（Server）：**SyncRead

无（None）

此模式跳过纹理配对，并且不会在读取之前阻塞远程进程的写入操作。

SyncRead

此模式跳过纹理配对，但在读取之前阻塞，等待写入操作在远程进程中结束。

SyncPairingRead

此模式在纹理配对期间阻塞，并在读取之前阻塞，等待写入操作在远程进程中结束。

## 使用纹理共享与nDisplay

nDisplay支持纹理共享共享视口并在其上显示接收的纹理。可从视口的 **id** 访问共享视口纹理。

要在nDisplay视口中显示从另一个应用程序接收到的纹理，使用nDisplay的后期处理功能来定义纹理共享项，并将其分配给一个nDisplay窗口。

欲了解有关在nDisplay中共享和接收纹理的更多详情，请参阅[nDisplay配置文件引用](/documentation/zh-cn/unreal-engine/ndisplay-configuration-file-reference-for-unreal-engine)。

## 已知限制

纹理共享目前只是测试版功能。以下是此功能的已知限制。

-   纹理共享SDK目前仅支持DirectX11和DirectX12。
    
-   纹理共享项名称的最大长度为128个字符。
    
-   每个进程的纹理共享项最大数量为100。
    
-   每个纹理共享项的最大纹理数为10。
    

纹理共享项是一个容器，它有一个指向DirectX纹理和辅助缓冲区（比如投影、摄像机和旋转矩阵）的指针。

-   [beta](https://dev.epicgames.com/community/search?query=beta)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [示例项目](/documentation/zh-cn/unreal-engine/texture-share-in-unreal-engine#%E7%A4%BA%E4%BE%8B%E9%A1%B9%E7%9B%AE)
-   [同步策略](/documentation/zh-cn/unreal-engine/texture-share-in-unreal-engine#%E5%90%8C%E6%AD%A5%E7%AD%96%E7%95%A5)
-   [连接同步模式](/documentation/zh-cn/unreal-engine/texture-share-in-unreal-engine#%E8%BF%9E%E6%8E%A5%E5%90%8C%E6%AD%A5%E6%A8%A1%E5%BC%8F)
-   [帧同步模式](/documentation/zh-cn/unreal-engine/texture-share-in-unreal-engine#%E5%B8%A7%E5%90%8C%E6%AD%A5%E6%A8%A1%E5%BC%8F)
-   [纹理同步模式](/documentation/zh-cn/unreal-engine/texture-share-in-unreal-engine#%E7%BA%B9%E7%90%86%E5%90%8C%E6%AD%A5%E6%A8%A1%E5%BC%8F)
-   [使用纹理共享与nDisplay](/documentation/zh-cn/unreal-engine/texture-share-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%BA%B9%E7%90%86%E5%85%B1%E4%BA%AB%E4%B8%8Endisplay)
-   [已知限制](/documentation/zh-cn/unreal-engine/texture-share-in-unreal-engine#%E5%B7%B2%E7%9F%A5%E9%99%90%E5%88%B6)