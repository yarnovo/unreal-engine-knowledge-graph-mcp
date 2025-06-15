# 虚幻引擎中的增量垃圾回收 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/incremental-garbage-collection-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:40:52.814Z

---

目录

![增量垃圾回收](https://dev.epicgames.com/community/api/documentation/image/70b440b9-6c41-4fe6-a41e-b866b5e23c21?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

虚幻引擎（UE）使用标记清除垃圾回收器来管理[UObject](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine)内存。对于软实时应用程序，垃圾回收器一直有一个重大缺陷：当垃圾回收器确定可以回收哪些对象的内存时，可能会产生Gameplay卡顿。在UE中，该过程被称为 *可达性分析* 。UE始终依赖此阶段的垃圾回收在单帧内完成，这会暂时停止所有UObject处理，尤其是Gameplay。可达性分析要扫描的对象越多，暂停时间就越长，通常没扫描多少就会产生明显的Gameplay卡顿。程序员可以采取多种方法来规避这一问题，例如：

-   保持紧张的UObject预算
-   使用UObject池
-   在正常Gameplay期间禁用垃圾回收

但是，这些变通方法往往会增加代码复杂度和总体项目成本。

## 增量可达性分析

UE使用 *增量可达性分析* 对其进行了改进。现在用户能够将垃圾回收器的可达性分析阶段分散到多帧，并可配置每帧的软时间限制。引擎通过 `TObjectPtr` 属性跟踪可达性迭代之间的UObject引用。也就是说，对公开了 `TObjectPtr` 的 `UPROPERTY` 赋值，会在垃圾回收进行时立即将对象标记为可达。这也被称为垃圾回收器 *写屏障* 。

引擎已转换为在将UObject公开给垃圾回收器的所有地方使用 `TObjectPtr` 而不是原始C++指针，包括所有UObject或 `FGCObject` `AddReferencedObjects` 函数。要在使用虚幻引擎编译的项目中使用增量可达性分析，必须将所有 `UPROPERTY` 实例转换为使用 `TObjectPtr` 而不是原始C++，否则垃圾回收可能过早回收一些UObject的内存。我们目前初步将此功能发布为试验性的功能，因为可达性分析阶段仍有可能超出指定的时间限制。

## 启用增量可达性分析

增量可达性分析可以使用添加到项目的 `DefaultEngine.ini` 的以下控制台变量来启用：

```cpp
[ConsoleVariables]
gc.AllowIncrementalReachability=1 ;启用增量可达性分析
gc.AllowIncrementalGather=1 ;启用增量收集不可达对象
gc.IncrementalReachabilityTimeLimit=0.002 ;将软时间限制设置为2毫秒
```

## 额外控制台变量

我们还提供了一组额外的控制台变量，用于压力测试和调试用途：

**控制台变量**

**说明**

**类型**

`gc.DelayReachabilityIteration`

将可达性分析延迟指定帧数。用于对GC屏障进行压力测试。

`<INTEGER>` ：帧数（默认值：10）

`gc.VerifyNoUnreachableObjects`

在可达性分析完成后运行测试，确保没有可达（有效）对象在引用不可达（很快将销毁）的对象。

0：禁用，1：启用

`gc.ContinuousIncrementalGC`

在上一次垃圾回收完成后继续重启增量垃圾回收。

0：禁用，1：启用

## 性能比较

下面使用[Unreal Insights](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)展示了示例项目的性能图表，其中关闭了增量可达性。蓝色线条表示总帧时间，橙色线条显示可达性分析耗用的时间。Unreal Insights在多帧分隔的单个事件之间绘制了连续图表线条；尽管可能看起来在整个时间轴期间都在运行垃圾回收，但实际上一次只运行一帧。

在以下对比图表的第一张图片中，我们可以清楚地看到，每次运行垃圾回收时都有一个峰值（由时间轴顶部的"GC"标签表示）。

![没有增量可达性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79b757d7-39b8-4a04-af3f-03a06b7f7676/without-igc.png)

![有增量可达性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfeebf7e-3efd-48a5-baa1-95958052e9bc/with-igc.png)

没有增量可达性

有增量可达性

在第二张图片中，打开了增量可达性，我们可以看到，GC滞后峰值消失了，现在增量可达性分散到多个帧（由现在更宽的浅绿色条形表示）。

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [c++](https://dev.epicgames.com/community/search?query=c++)
-   [uobject](https://dev.epicgames.com/community/search?query=uobject)
-   [garbage collection](https://dev.epicgames.com/community/search?query=garbage%20collection)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [增量可达性分析](/documentation/zh-cn/unreal-engine/incremental-garbage-collection-in-unreal-engine#%E5%A2%9E%E9%87%8F%E5%8F%AF%E8%BE%BE%E6%80%A7%E5%88%86%E6%9E%90)
-   [启用增量可达性分析](/documentation/zh-cn/unreal-engine/incremental-garbage-collection-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%A2%9E%E9%87%8F%E5%8F%AF%E8%BE%BE%E6%80%A7%E5%88%86%E6%9E%90)
-   [额外控制台变量](/documentation/zh-cn/unreal-engine/incremental-garbage-collection-in-unreal-engine#%E9%A2%9D%E5%A4%96%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F)
-   [性能比较](/documentation/zh-cn/unreal-engine/incremental-garbage-collection-in-unreal-engine#%E6%80%A7%E8%83%BD%E6%AF%94%E8%BE%83)