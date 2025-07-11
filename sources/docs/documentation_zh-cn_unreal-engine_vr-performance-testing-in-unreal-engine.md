# 虚幻引擎中的VR性能测试 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/vr-performance-testing-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:44:32.623Z

---

目录

![VR 性能测试](https://dev.epicgames.com/community/api/documentation/image/d9b0df83-fa31-4e12-8fce-914dfa6c9609?resizing_type=fill&width=1920&height=335)

总体而言，维持 VR 项目的帧率挑战性极大，即使使用推荐硬件也同样如此。VR 帧率稳定性比常规实时渲染更为重要，因为掉帧会对用户体验产生极大的破坏。

因此需要预留缓冲，以便获取比普通帧运行时间更长的帧。由于其可能导致输入/追踪延迟，因此无法对多个帧进行指令管线化。这意味着游戏线程将固定比渲染线程提前一帧，GPU 和渲染线程则在同一帧上同步。因为二次投影存在系统开销，GPU 时间略微少于 11 ms。游戏代码开销会在游戏线程中造成较长的帧时、绘制调用开销会在渲染线程中造成较长的帧时、变形或着色开销会在 GPU 中造成较长的帧时。这些因素都会导致帧时的缺失。需要考虑这三个因素，并进行平衡。

如使用 [最佳方法指南](/documentation/zh-cn/unreal-engine/xr-best-practices-in-unreal-engine) 中的控制台变量设置，渲染线程性能应该达到理想效果。因此，对内容和游戏代码进行优化十分重要，可借此榨取帧率。需要尽量简化所有内容。

简化内容的常见方法如下。

-   不使用动态光照和阴影。
-   不大量使用半透明。
-   可见批次中的实例。如实例化群组中的一个元素为可见，则整个群组均会被绘制。
-   为所有内容设置 LOD。
-   简化材质复杂程度，减少每个物体的材质数量。
-   烘焙重要性不高的内容。
-   不使用能包含玩家的大型几何体。
-   尽量使用预计算的可见体积域。

查看 [Bullet Train](https://s3.amazonaws.com/epiccms_epiccms_bucket/Resources/files/Going+Off+the+Rails.zip) 和 [Showdown](https://cdn2.unrealengine.com/Resources/files/UE4-Integration-and-Demos_OC-100270768.pptx) 范例，了解 Epic 时如何制作视觉效果极佳但实际却较为简单的虚拟现实内容。还需要注意的是多数屏幕空间技巧均无法在立体中使用。看上去会是扁平或错误的效果。

必须在项目中对工作进行分析，维持帧率。慢慢增加复杂度到临界点的方式更为可取。在游戏发布前数日还需要下调效果来维持性能并非良好的工作方式。

减少绘制调用有两个技巧。尽量多地将材质组合起来，并大量使用实例化静态网格体组件。此外，实例化时需要注意的是——如果被实例化的内容有一部分为可见，则其整体均会被绘制。因此在一些情况下实例化的益处会大大减少。必须按批进行实例化，批中大多数物体从相同的点看上去均为可见或不可见。

可以另外考虑的方法是使用剔除体积域，将体积域之外的不可见空间全部剔除。遮蔽在其选择进行绘制的内容中稍显自由，而剔除体积域有助于使这些选择更为保守。如果内容以此方式构建，则可通过开启或关闭 Actor（或整个子关卡）的显示达到相同效果。

另外需要注意的是，透明度为零的内容可能仍会被绘制。因此，如果不需要对其进行渲染，则将其隐藏。

## 获取整体数据

Oculus 和 SteamVR 均有用于了解性能的第三方工具。建议使用这些工具查看实际的帧时和合成器开销。

在 UE4 中可通过以下方式获取游戏中的整体数据。

控制台命令

描述

stat unit

可显示整体游戏线程、绘制线程和 GPU 时间，以及整体的帧时。这最适用于收集以下信息：整体总帧时是否处于理想区间、游戏线程时间，但不可用于收集绘制线程和 GPU 时间。

startfpschart / stopfpschart

如果需要了解 90Hz 以上花费的时间百分比，可运行这些命令。它将捕捉并聚合开始和结束之间窗口上的数据，并转存带有桶装帧率信息的文件。注意：游戏有时会报告略低于 90Hz，但实际却为 90。最好检查 80+ 的桶（bucket），确定在帧率上消耗的实际时间。

stat gpu

4.14 版本中添加了此命令，与 GPU 分析工具提供数据相似，玩家可在游戏中观察并监控这些数据。很适用于快速检查 GPU 工作的开销。

### 实时 GPU 分析工具

在游戏或编辑器中输入 `stat gpu` 即可使用全新的实时 GPU 分析工具。这些数据为累积式，非层级式。因此不需要从事件树向下寻找即可看到主要类型。例如，阴影投影为所有光照的全部投影（在所有镜头中）的总和。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ee436dc-0eab-4aec-aa7a-2c19b5698f3d/statgpu.png)

如果需要在游戏进程中收集数据（例如用于图表中），实时数据则尤其实用。实时显示可用于分析在控制台变量或精度设置上启用的功能，或立即知晓结果在编辑器中进行优化。

数据在代码中被声明为浮点计数器，如： `DECLARE_FLOAT_COUNTER_STAT(TEXT("Postprocessing"), Stat_GPU_Postprocessing, STATGROUP_GPU);`

渲染线程代码块可与 `SCOPED_GPU_STAT` 宏一同被 instrument，工作原理与 `SCOPED_DRAW_EVENT` 相似，如： `SCOPED_GPU_STAT(RHICmdList, Stat_GPU_Postprocessing);`

与绘制事件不同，GPU 数据为累积式。可为相同数据添加多个条目，它们将被聚合。

为被显示标记的内容应被包含在包罗 `[unaccounted]` 数据中。如该数据较高，则说明尚有内容未包含在显式数据中，需要添加更多宏进行追踪。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [获取整体数据](/documentation/zh-cn/unreal-engine/vr-performance-testing-in-unreal-engine#%E8%8E%B7%E5%8F%96%E6%95%B4%E4%BD%93%E6%95%B0%E6%8D%AE)
-   [实时 GPU 分析工具](/documentation/zh-cn/unreal-engine/vr-performance-testing-in-unreal-engine#%E5%AE%9E%E6%97%B6gpu%E5%88%86%E6%9E%90%E5%B7%A5%E5%85%B7)