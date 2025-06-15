# 虚幻引擎FShaderCache | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fshadercache-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:24:26.887Z

---

目录

![FShaderCache](https://dev.epicgames.com/community/api/documentation/image/d7df9d73-d745-4451-a489-768002e526a7?resizing_type=fill&width=1920&height=335)

## 总览

FShaderCache 提供的机制可减少游戏中着色器的卡顿。它支持 OpenGLDrv 和 MetalRHI RHIs，可在 Mac、Linux 和 Windows 平台上使用。

可通过多个控制台命令启用或禁用 FShaderCache 功能。

控制台命令

描述

`r.UseShaderCaching [0/1]`

-   着色器反序列化中早提交，不为请求式。
-   追踪束缚着色器态，使它们在早提交中被预束缚。

`r.UseShaderDrawLog [0/1]`

追踪 RHI 绘制状态，使每个束缚着色器态均可被预绘制。

`r.UseShaderPredraw [0/1]`

预绘制追踪的 RHI 绘制状态，消除首次使用的卡顿。

`r.PredrawBatchTime [Time in (ms)]`

控制每帧预绘制时间。如有需要，在多个帧上进行分布。全部使用 -1。

`r.UseShaderBinaryCache 0/1`

将所有着色器字节码累加到一个单独的缓存文件中

`r.UseAsyncShaderPrecompilation 0/1`

游戏进程中着色器代码的异步预编译

`r.TargetPrecompileFrameTime [Time in (ms)]`

启用 r.UseAsyncShaderPrecompilation 时维持的最大目标帧时。使用 -1 一次性预编译所有着色器。

`r.AccelPredrawBatchTime [Time in (ms)]`

处于非互动模式中（如加载画面）时临时加速预绘制的选项。选择 0 使用 `r.PredrawBatchTime`。

`r.AccelTargetPrecompileFrameTime [Time in (ms)]`

处于非互动模式中（如加载画面）时加速异步预编译的选项。选择 0 使用 r.TargetPrecompileFrameTime。

`r.InitialShaderLoadTime [Time in (ms)]`

启动时进入异步预编译前着色器加载所消耗的时间最大量。使用 -1 进行同步加载）

## 使用

应在开发机上启用 `r.UseShaderCaching` 和 `r.UseShaderDrawLog` 填充缓存。 用户/玩家应启用 `r.UseShaderCaching` 和 `r.UseShaderPredraw` 消耗缓存。 绘制日志（`r.UseShaderDrawLog`）会添加明显的固定系统开销，尽量不要在发布产品中使用。 二进制着色器缓存可在游戏进程中或打包过程中（当前仅限 Mac 目标）被累加，方法为指定着色器平台在 CachedShaderFormats 阵列（在 Engine.ini 的 /Script/MacTargetPlatform.MacTargetSettings 设置组中）中进行缓存。 对于 OpenGL 而言，二进制缓存包含足够的着色器管线数据来构造全链接 GL 程序或 GL 程序管线（取决于 GL\_ARB\_separate\_shader\_objects 是否可用），但用于其他 RHI 上管线构造的数据却不足。 这有助于在未首先完成游戏进程的情况下降低 OpenGL 上出现的卡顿。如以最佳效果运行，仍然建议首先完成游戏进程。 缓存通过着色器散列完成，内容大部分已完成时建议只将其用作最终优化工具， 因为对着色器散列进行修改将导致未使用的条目在缓存中累加，增加缓存大小，但不会减少卡顿。

代码将先尝试并加载可写入的缓存，然后根据需要返回到分布缓存。

缓存类型

缓存位置

可写入

`<Game>/Saved/DrawCache.ushadercache, <Game>/Saved/ByteCodeCache.ushadercode`

分布

`<Game>/Content/DrawCache.ushadercache, <Game>/Content/ByteCodeCache.ushadercode`

### 整合步骤

可通过众多控制台命令减少项目中的卡顿，使用推荐的优先顺序可启用最大化性能的选项，同时避免执行额外的项目工作。

1.  在项目配置中为所有用户启用 `r.UseShaderCaching` 和 `r.UseShaderPredraw`。
2.  尽量只在内部版本上启用 `r.UseShaderDrawLog` 并确保着色器绘制状态在每个版本的最终 QA 中均被记录。无法实行时（如极大和/或流送游戏），对所有用户启用。

测试此设置是否足以将卡顿降低到可接受的范围，额外的优化需要更多工作，且负面影响极大。

1.  如以上设置不足以解决问题，启用 `r.UseShaderBinaryCache` 并配置 CachedShaderFormats，确保二进制缓存的填充（当前仅限 Mac）。
2.  现在所有着色器代码均将在启动时加载，所有预绘制操作将发生在第一帧。如加载时间太过极端，将 `r.PredrawBatchTime` 设为大于 0 ms 即可在每帧中消耗预绘制。
3.  还可为 `r.AccelPredrawBatchTime` 指定较大的值。显示加载画面或其他非互动内容时可应用此值。
4.  调用 `FShaderCache::BeginAcceleratedBatching` 告知着色器缓存可以牺牲游戏帧率为代价加速预绘制；有必要返回开销较低的预绘制分批时，调用 `FShaderCache::EndAcceleratedBatching`。
5.  调用 `FShaderCache::FlushOutstandingBatches` 将在下一帧处理所有剩余的着色器。
6.  如项目初始加载仍然过长，则启用 `r.UseAsyncShaderPrecompilation` 并将 `r.InitialShaderLoadTime` 设为大于 0 的值。随着着色器初始加载时间的增加，必须在游戏运行时处理的工作便会减少。
7.  调整所需的目标帧时时可修改 `r.TargetPrecompileFrameTime` 的数值，对着色器进行异步预编译。
8.  和预绘制分批相同，可指定一个更为主动的值进行预编译：将 `r.AccelTargetPrecompileFrameTime` 设为较大的值，然后调用 `FShaderCache::BeginAcceleratedBatching`（之后调用 `FShaderCache::EndAcceleratedBatching`）。
9.  启用 `r.UseAsyncShaderPrecompilation` 后，调用 `FShaderCache::FlushOutstandingBatches` 也将会清空所有未解决的编译请求。

## 处理更新/失效

缓存需要更新且可写入缓存已失效时，游戏应指定一个新的 GameVersion。 初始化 RHI（它将初始化缓存）之前调用 `FShaderCache::SetGameVersion`。这将导致之前版本生成的缓存内容被无视。当前无法继承之前版本的缓存条目。

## 区域/流送分批

对流送游戏或缓存极大的内容而言，应根据需求针对当前相关游戏区域/流送等级添加对 `FShaderCache::SetStreamingKey` 含唯一值的调用。录入的绘制状态将被连接到使用的流送键。这将把预绘制限制为之后运行中使用的流送键所要求的绘制状态。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [总览](/documentation/zh-cn/unreal-engine/fshadercache-in-unreal-engine#%E6%80%BB%E8%A7%88)
-   [使用](/documentation/zh-cn/unreal-engine/fshadercache-in-unreal-engine#%E4%BD%BF%E7%94%A8)
-   [整合步骤](/documentation/zh-cn/unreal-engine/fshadercache-in-unreal-engine#%E6%95%B4%E5%90%88%E6%AD%A5%E9%AA%A4)
-   [处理更新/失效](/documentation/zh-cn/unreal-engine/fshadercache-in-unreal-engine#%E5%A4%84%E7%90%86%E6%9B%B4%E6%96%B0/%E5%A4%B1%E6%95%88)
-   [区域/流送分批](/documentation/zh-cn/unreal-engine/fshadercache-in-unreal-engine#%E5%8C%BA%E5%9F%9F/%E6%B5%81%E9%80%81%E5%88%86%E6%89%B9)