# 虚幻引擎中的性能与带宽注意事项 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/performance-and-bandwidth-tips-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:58:09.511Z

---

目录

![性能与带宽注意事项](https://dev.epicgames.com/community/api/documentation/image/7ef44299-822f-4992-b3ec-8e0f44e01d7b?resizing_type=fill&width=1920&height=335)

**复制 Actor** 是一件耗费时间的工作。**虚幻引擎（UE）** 会尽量让这个过程变得更有效率，但您也可以做一些额外的工作来简化这个过程。

在收集 actor 用于复制时，服务器将检查一些事项，如相关性、更新频度、休眠情况等。您可以调整这些检查项以改善性能。要最大限度提升这一过程的效率，最好是遵循以下优先顺序：

-   关闭复制（`AActor::SetReplicates( false )`）
    -   当 actor 未进行复制时，它最初不会出现在列表中，我们可以充分利用这一点，确保那些无需复制的 actor 会有相应标记。
-   减少 `NetUpdateFrequency` 值
    -   actor 的更新次数越少，更新所用的时间就越短。最好是尽量压低这个数值。该数值代表了这个 actor 每秒复制到客户端的频度。
-   休眠情况
-   相关性
-   `NetClientTicksPerSecond`

如果属性并非是绝对必需，则不要将其标记为复制。如果可以，最好能尝试从现有的已复制属性中派生状态。

尝试利用已有的量化函数，如 `FVector_NetQuantize`。这样能大大减少向客户端复制此状态时所需的大小，如果使用得当，就不会导致任何明显的偏差。

`FName` 变量一般不会被压缩，所以在使用它们作为 RPC 的参数时，请记住它们通常会向字符串发送所有调用。这会产生很大的资源消耗。

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [performance and profiling](https://dev.epicgames.com/community/search?query=performance%20and%20profiling)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)
-   [multiplayer](https://dev.epicgames.com/community/search?query=multiplayer)
-   [network](https://dev.epicgames.com/community/search?query=network)
-   [fundamentals](https://dev.epicgames.com/community/search?query=fundamentals)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)