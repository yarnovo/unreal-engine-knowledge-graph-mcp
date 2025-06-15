# 虚幻引擎关卡流送体积参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/level-streaming-volumes-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:20:28.779Z

---

目录

![关卡流送体积参考](https://dev.epicgames.com/community/api/documentation/image/ad286316-ad49-47c1-93b1-10765d943af2?resizing_type=fill&width=1920&height=335)

**关卡流送体积** 用于辅助[关卡流送](/documentation/zh-cn/unreal-engine/level-streaming-in-unreal-engine)流程。它们允许你简单封装关卡，并控制其何时在内存中加载或卸载（在玩家进入或离开体积时）。

你可以通过从 **详细信息（Details）** 面板调整属性来调整关卡流送体积（Level Streaming Volume）处理关卡流送的方式，如下图所示。

属性

说明

**流送关卡（Streaming Levels）**

显示受体积影响的关卡。

**仅限编辑器预可视化（Editor Pre Vis Only）**

确定流送体积是否仅用于编辑器流送关卡预可视化。

**已禁用（Disabled）**

如果为真，则按流送体积代码忽略流送体积。此外也用于禁用关卡流送体积（Level Streaming Volume）而不将其与关卡分离，或者用于在蓝图和体积流送之间切换关卡流送（Volume Streaming）的控制。

**流送使用（Streaming Usage）**

确定体积的用途，例如是否用于控制加载，加载和可视性，或只是控制可视性（阻止加载）。

## 将流送体积与关卡关联

基于体积的关卡流送以如下方式工作：每个流送关卡（Streaming Level）都可以关联一组关卡流送体积（Level Streaming Volume）。每一帧中，引擎会在每一关卡上迭代， 并检查玩家的视点是否位于与该关卡相关的任何关卡流送体积（Level Streaming Volume）内。如果该视点在至少一个 关卡流送体积（Level Streaming Volume）内，则发出请求以开始加载该关卡。如果该视点在所有关卡流送体积（Level Streaming Volume）之外，关卡将标记为卸载。

-   [关卡流送指南](/documentation/zh-cn/unreal-engine/level-streaming-using-volumes-in-unreal-engine)

## 重要细节信息

-   所有关卡流送体积（Level Streaming Volume）都必须存在于固定关卡中。存在于其他关卡内的关卡流送体积（Level Streaming Volume）不可用于关卡流送，并将在 检查地图错误时生成警告。
    
-   如果一个关卡具有任何与之关联的流送体积，则该关卡的其他流送方法将无法正确工作。
    
-   一个关卡流送体积（Level Streaming Volume）可以影响多个关卡。类似地，一个关卡可以受多个关卡流送体积（Level Streaming Volume）影响。
    
-   基于体积的流送可用于分割屏幕。在发出任何加载/卸载请求之前，所有本地玩家的视点都将予以考虑。
    

## 测试你的流送体积设置

在目标平台上的游戏中测试基于体积的关卡流送至关重要。在 **在编辑器中运行（Play in Editor）** 模式(PIE)中流送将显示将发生加载/卸载之处， 但在PIE中流送不代表实际在游戏中进行加载卸载。这是因为在PIE中，关卡已经在内存中，所以"加载"关卡只是 立即取消隐藏它而已。

在目标平台上的独立游戏中运行关卡对于确保流送设置的正常工作至关重要。注意在某些平台上，可能需要几秒钟的时间来 在一个关卡中流送。适当调整你的关卡流送体积（Level Streaming Volume），以便在玩家到达关卡时加载该关卡。可以通过调整与关卡关联的 关卡流送体积（Level Streaming Volume）来修改关卡加载行为。增加体积会导致关联关卡更早加载，更晚卸载，而减少体积则会导致更晚加载， 更早卸载。

## 适用于视效预览的关卡流送体积

仅可通过在关卡流送体积（Level Streaming Volume）上设置 **仅限编辑器预可视化（Editor Pre Vis Only）** 标记来将该关卡流送体积（Level Streaming Volume）标记为编辑器预可视化。这样，基于体积的关卡流送仍然可以用于编辑器预可视化， 同时使用另一种流送方法进行游戏内流送。

## 关卡流送体积的成本

每一帧中，`UWorld::ProcessLevelStreamingVolumes`会在各个流送关卡上迭代，对于各个关卡，如果任何本地玩家在 与关卡关联的任何体积内，则该关卡将开始加载。同样，如果所有本地玩家都在所有体积之外，则关卡将开始卸载。

`UWorld::ProcessLevelStreamingVolumes`以如下方式利用一致性：对于每个关卡，将缓存最近包含过玩家的体积。首先检查此缓存体积， 以便玩家所在或返回到的关卡能够很快被接受。

任何形状的体积都很好，但显而易见的是，数量越少，效果越好。关卡流送体积（Level Streaming Volume）的成本上限可以用与已卸载关卡相关联的关卡流送体积（Level Streaming Volume）的 数量之和近似表示。

"流送（Streaming）"统计数据组下存在两个统计数据，用于监视关卡流送性能。"流送体积（Streaming Volume）"统计数据跟踪根据每帧的玩家视点数测试 的关卡流送体积（Level Streaming Volume）数量，而"体积流送计时（Volume Streaming Tick）"统计数据则跟踪每帧的`UWorld::ProcessLevelStreamingVolumes`中花费的时间。

## 向卸载请求添加滞后

玩家在关卡流送体积（Level Streaming Volume）边界上来回移动会导致发出不需要的加载/卸载请求。为了解决此问题，已将滞后添加到卸载 请求。加载请求不存在滞后，因为如果需要加载某个关卡，我们总是希望该关卡能尽快加载。

卸载滞后量可以通过修改[关卡窗口](/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine)中的流送关卡的 **体积卸载请求之间的最小时间（Min Time Between Volume Unload Requests）** 来调整。 默认卸载滞后为2.0秒。

## 禁用关卡流送体积

关卡流送体积（Level Streaming Volume）上有一个 **bDisabled** 属性。当其设置为真时，无论是在游戏中还是在编辑器中，流送体积代码都会忽略该体积。**bDisabled** 可用于禁用关卡流送体积（Level Streaming Volume）而不将其与关卡分离。

举个 **bDisabled** 标记用途的例子，假设有一扇门通向一个关卡，而该关卡的流送由流送体积来控制。流送体积向外延伸至越过此门， 从而使关卡将在玩家能够到达该门并打开它时流送进其中。但是，一开始门是锁着的， 当玩家达成关卡另一部分中的目标时，门才会被解锁。所以，即使流送体积延伸至越过此门，我们也不希望处于门另一侧的关卡 流送，除非门实际已解锁（"可打开"）。

蓝图和C++都可以用来切换 **关卡流送体积（Level Streaming Volume）** 的禁用状态。

-   [level streaming](https://dev.epicgames.com/community/search?query=level%20streaming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [将流送体积与关卡关联](/documentation/zh-cn/unreal-engine/level-streaming-volumes-reference-in-unreal-engine#%E5%B0%86%E6%B5%81%E9%80%81%E4%BD%93%E7%A7%AF%E4%B8%8E%E5%85%B3%E5%8D%A1%E5%85%B3%E8%81%94)
-   [重要细节信息](/documentation/zh-cn/unreal-engine/level-streaming-volumes-reference-in-unreal-engine#%E9%87%8D%E8%A6%81%E7%BB%86%E8%8A%82%E4%BF%A1%E6%81%AF)
-   [测试你的流送体积设置](/documentation/zh-cn/unreal-engine/level-streaming-volumes-reference-in-unreal-engine#%E6%B5%8B%E8%AF%95%E4%BD%A0%E7%9A%84%E6%B5%81%E9%80%81%E4%BD%93%E7%A7%AF%E8%AE%BE%E7%BD%AE)
-   [适用于视效预览的关卡流送体积](/documentation/zh-cn/unreal-engine/level-streaming-volumes-reference-in-unreal-engine#%E9%80%82%E7%94%A8%E4%BA%8E%E8%A7%86%E6%95%88%E9%A2%84%E8%A7%88%E7%9A%84%E5%85%B3%E5%8D%A1%E6%B5%81%E9%80%81%E4%BD%93%E7%A7%AF)
-   [关卡流送体积的成本](/documentation/zh-cn/unreal-engine/level-streaming-volumes-reference-in-unreal-engine#%E5%85%B3%E5%8D%A1%E6%B5%81%E9%80%81%E4%BD%93%E7%A7%AF%E7%9A%84%E6%88%90%E6%9C%AC)
-   [向卸载请求添加滞后](/documentation/zh-cn/unreal-engine/level-streaming-volumes-reference-in-unreal-engine#%E5%90%91%E5%8D%B8%E8%BD%BD%E8%AF%B7%E6%B1%82%E6%B7%BB%E5%8A%A0%E6%BB%9E%E5%90%8E)
-   [禁用关卡流送体积](/documentation/zh-cn/unreal-engine/level-streaming-volumes-reference-in-unreal-engine#%E7%A6%81%E7%94%A8%E5%85%B3%E5%8D%A1%E6%B5%81%E9%80%81%E4%BD%93%E7%A7%AF)