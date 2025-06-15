# 面向虚幻引擎的Horde存储 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-storage-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:37:47.896Z

---

目录

![Horde存储](https://dev.epicgames.com/community/api/documentation/image/9cf99cff-1bbf-41ed-9171-63e64fd229df?resizing_type=fill&width=1920&height=335)

Horde的存储平台旨在支持对由相互关联的blob组成的海量数据结构进行操作。blob是不可变的，由一个任意数据块以及零个或多个对其他blob的外部引用组成。

所有这类数据结构的进入点都是一个ref，它是一个用户定义的名称，用于保存对数据结构根节点处的一个blob的引用。所有未被ref直接或间接引用的节点 都将被垃圾回收。

## 历史记录

Horde的存储系统可以被视为GitSync工具的一种升级版本，用于为Epic的GitHub库下载二进制文件；对于提交到Epic的Perforce服务器的每次变更，我们都会将匹配二进制文件上传至AWS S3，并向Git库提交一份这些文件的清单，该清单可用于下载这些文件。GitSync工具会利用这份清单来检索和解压缩这些文件，每当Git钩检出一个新的提交时，就会执行这一操作，而该钩是通过运行库根目录下的 `Setup.bat` 文件安装的。

GitSync的主要设计目标之一是，将二进制数据的托管工作分担到一个经过验证、具备可伸缩性的第三方存储服务（AWS S3）上，而无需维护一个能够支持许多虚幻引擎开发者的活动服务器。因此，我们保留了Git所采用的内容寻址理念，但将这些基于内容寻址的负载打包成非确定性的包，以提高下载效率。在上传时，我们会采用一种启发法来决定是复用现有的包来下载数据，还是将数据重新打包成新的包，以此避免开销高昂的数据收集操作。

虽然客户端仍然可以将数据建模为类似Git的Merkle树，即利用它们可能已有的本地缓存数据通过唯一标识的SHA1哈希值来实现，但我们通过将数据放入预制的静态下载包中，减少了在协商要传输给客户端的数据时的通信量和服务器端计算负载，这些下载包经过精心安排，旨在优化我们预计会一起请求的blob之间的一致性。

这种模式针对流式读写操作进行了优化，同时在必要时仍能支持点读。

## Blob

Horde中的blob具有以下属性（见 `BlobData` 类）：

-   **类型（Type）** ：由一个GUID和整型版本号表示，用于区分可能具有特定序列化格式但数据相同的负载。
-   **负载（Payload）** ：一个字节数组。Blob意味着完全读入内存，因此负载通常限制在几百KB以内。对于较大的负载，可以使用实用工具库，通过静态分块或内容定义的分块将其拆分为更小的blob。
-   **引用（References）** ：一组对blob的引用。

对blob的引用通常使用 `IBlobHandle` 实例在内存中进行操作。在刷新到存储后，blob句柄可以与 `BlobLocator` 相互转换，后者是一种由存储系统分配的、与实现定义的不透明字符串标识符。

Horde通过 `IBlobWriter` 接口对blob序列化到底层存储后端的方式进行了抽象处理；程序员可以请求一个缓冲区来对blob进行序列化，写入数据及其引用，然后收到一个返回的 `IBlobHandle` ，从而在未来任意时刻都能对blob进行检索。具体实现将决定数据的存储方式，并在必要时对数据进行压缩、打包、缓冲和上传操作。

可以创建多个 `IBlobWriter` 实例，用于写入相关blob的不同数据流。

## 引用和别名

引用和别名提供进入存储系统的入口点。使用任意一种方法，你都可以为特定的blob分配一个用户定义的名称，并后续检索。

-   **引用** 是指向blob存储的强引用，并且充当垃圾回收器的根节点。引用可以设置为在固定时间到期，或者在特定时间段内未被检索后到期。这对实现缓存非常有用。
-   **别名** 是对blob的弱引用。可能存在多个名称相同的别名，用户可以通过特定的别名来查询一个或多个blob。别名关联用户指定的优先级，使用者可以按照优先级顺序来查询别名。

## 内容寻址

Horde采用支持内容寻址的方式对blob进行建模。虽然哈希值不会通过 `BlobLocator` 字符串直接公开，但哈希值可以编码到blob的负载中，并且在引用数组中有一个匹配的条目。

由于引用与blob负载分开存储，因此通过 `BlobLocator` 存储的唯一标识符不会影响负载的哈希值。

该实现主要使用 `IoHash` 对blob数据进行哈希处理（截断的20字节Blake 3哈希值），但将负载中的哈希编码与存储系统中的引用解耦后，可以使用其他哈希算法来替代。底层存储系统可以推断blob树的拓扑结构，同时还支持多种哈希算法。

`IBlobRef` 接口在基本 `IBlobHandle` 接口基础上进行了扩展，增加了目标blob的 `IoHash` 。

## 实现

本小节介绍了存储系统当前的实现细节，这些细节在未来的版本中可能会发生变化。

### 层

该存储系统通过多个层实现：

-   C#序列化库（ `BlobSerializer` 、 `BlobConverter` 等）。
-   逻辑存储模型通过 `IStorageClient` 接口声明，这是与存储系统进行交互的主要方式。在这一层，blob通过 `IBlobHandle` 对象进行操作。
    -   `BundleStorageClient` 是 `IStorageClient` 的标准实现，并将blob打包成[数据包](/documentation/zh-cn/unreal-engine/horde-storage-for-unreal-engine#%E6%95%B0%E6%8D%AE%E5%8C%85)。
    -   `KeyValueStorageClient` 实现了一个客户端，该客户端会将各个blob传递给底层 `IStorageBackend` 。
-   物理存储模型通过 `IStorageBackend` 接口声明，该接口负责通过网络将数据发送到存储服务实现。
    -   `HttpStorageBackend` 通过HTTP将数据上传到Horde服务器。
    -   `FileStorageBackend` 直接将数据写入磁盘上的文件。
    -   `MemoryStorageBackend` 将数据存储在内存中。
-   批量数据存储通过 `IObjectStore` 接口定义，该接口与底层存储服务进行交互。
    -   `FileObjectStore` 将数据写入磁盘上的文件。
    -   `AwsObjectStore` 从AWS S3中读写数据。
    -   `AzureObjectStore` 从Azure blob存储中读写数据。

### 数据包

Blob被设计为一种通用存储图元，因此我们会尽力高效地处理从几个字节到几百KB的各类blob（对于更大的数据流，可以沿着固定边界或者使用内容定义切割，将其分割成较小的块。）

Blob被打包成数据包，以便放在底层对象存储中。

在存储系统里，数据包的实现及其使用大多对用户代码隐藏，但了解blob流将如何写入存储可能有助于推断访问模式。

每个数据包由一系列压缩信息包组成，每个信息包可能包含多个blob。每个信息包都是独立的，因此可以通过对数据包数据进行一次连续范围读取来对其进行解码。

### 定位器

定位器通常具有以下形式：

```cpp
[path]#pkt=[offset],[length]&exp=[index]
```

-   `[path]` ：底层对象存储中某个对象的路径。
-   `[offset]` 和 `[length]` ：数据包内的压缩信息包数据的字节范围。
-   `[index]` ：数据包中导出的blob的索引。

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [历史记录](/documentation/zh-cn/unreal-engine/horde-storage-for-unreal-engine#%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95)
-   [Blob](/documentation/zh-cn/unreal-engine/horde-storage-for-unreal-engine#blob)
-   [引用和别名](/documentation/zh-cn/unreal-engine/horde-storage-for-unreal-engine#%E5%BC%95%E7%94%A8%E5%92%8C%E5%88%AB%E5%90%8D)
-   [内容寻址](/documentation/zh-cn/unreal-engine/horde-storage-for-unreal-engine#%E5%86%85%E5%AE%B9%E5%AF%BB%E5%9D%80)
-   [实现](/documentation/zh-cn/unreal-engine/horde-storage-for-unreal-engine#%E5%AE%9E%E7%8E%B0)
-   [层](/documentation/zh-cn/unreal-engine/horde-storage-for-unreal-engine#%E5%B1%82)
-   [数据包](/documentation/zh-cn/unreal-engine/horde-storage-for-unreal-engine#%E6%95%B0%E6%8D%AE%E5%8C%85)
-   [定位器](/documentation/zh-cn/unreal-engine/horde-storage-for-unreal-engine#%E5%AE%9A%E4%BD%8D%E5%99%A8)