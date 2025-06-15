# 使用命令行渲染操作虚幻引擎中的MRQ | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-command-line-rendering-with-move-render-queue-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:11:06.409Z

---

目录

![使用命令行渲染操作MRQ](https://dev.epicgames.com/community/api/documentation/image/b32637ae-69c3-4e06-9e1c-7bea65adb45a?resizing_type=fill&width=1920&height=335)

如果你项目中的C++代码引用了 `MoviePipelineMasterConfig.h`，你必须将其替换为 `MovePipelinePrimaryConfig.h`。

在 **虚幻引擎（Unreal Engine）** 中使用[影片渲染队列（MRQ）](/documentation/404)渲染[Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)项目时，你可以搭配使用MRQ资产配置、简化的[命令行渲染](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine)参数，以及Python执行器来自定义你的渲染工作流程。

传统离线渲染农场通常可以在单台计算机上处理单个帧，与之不同的是，在虚幻引擎中，最小的可分发工作单元是镜头切换（Camera Cut），或者说关卡序列镜头（Level Sequence Shot）。这是因为，虚幻引擎的实时渲染特性决定了它在渲染画面时需要依赖前一帧的信息，而这类信息无法在多台计算机间共享。

相较于[旧版的渲染电影功能](/documentation/zh-cn/unreal-engine/rendering-out-cinematic-movies-in-unreal-engine)，电影渲染队列（MRQ）配置文件可能很复杂。MRQ不再采用旧版系统中的命令行参数机制；在新系统中，它通过命令行调用渲染。原本支持的命令行参数已减少到只剩几个基本参数；不过，虚幻引擎支持使用Python自定义你的渲染过程。这意味着，你可以更好地控制命令行渲染的执行方式，相较于旧版渲染电影系统更灵活。

大致来说，你可以运行以下三种模式：

1.  指定单个关卡序列和配置资产。
    
2.  指定要渲染的整个队列（Queue）。
    
3.  使用自定义Python执行器完全控制渲染。
    

以下文档介绍了支持的三种参数模式，以及你可以通过MRQ在项目渲染中使用和自定义的自定义Python执行器。

## 关卡序列参数

`-LevelSequence` 参数可用于指定要使用MRQ渲染的特定关卡序列的路径。如果你使用此路线，还必须指定 `-MoviePipelineConfig` 参数，它指向 **UMoviePipelinePrimaryConfig** 预设资产，这样会将恰当的设置分配给要用于渲染的资产。

此方法是通过命令行启动MRQ渲染的最基本用法。你的命令行可能类似于以下内容，其中 `subwaySequencer_P` 是要加载的地图， `SubwaySequencerMASTER` 是关卡序列资产， `SmallTestPreset` 是 **UMoviePipelinePrimaryConfig** 预设资产：

```cpp

UnrealEditor-Cmd.exe "E:\SubwaySequencer\SubwaySequencer.uproject" subwaySequencer_P -game 
-LevelSequence="/Game/Sequencer/SubwaySequencerMASTER.SubwaySequencerMASTER" 
-MoviePipelineConfig="/Game/Cinematics/MoviePipeline/Presets/SmallTestPreset.SmallTestPreset" -windowed -resx=1280 -resy=720 -log -notexturestreaming

```

此示例方法仅支持在单张地图中渲染单个作业，并将渲染该关卡序列包含的所有镜头。

## 电影管线配置参数

以关卡序列参数为基础，接下来要指定 `-MoviePipelineConfig` 参数，该参数作为 **UMoviePipelineQueue** 资产（通过MRQ UI保存）的路径而不是 **主配置（Primary Config）** 和关卡序列资产的路径运行。这将自动在队列中相应条目指定的贴图上使用队列中存储的每个作业的配置处理队列中的每个作业。对于此参数，你的命令行可能如下：

```cpp

UnrealEditor-Cmd.exe "E:\SubwaySequencer\SubwaySequencer.uproject" subwaySequencer_P -game 
-MoviePipelineConfig="/Game/Cinematics/MoviePipeline/Presets/BigTestQueue.BigTestQueue" -windowed -resx=1280 -resy=720 -log -notexturestreaming

```

## 使用Python的自定义管线功能

你还可以使用Python中的自定义执行器构建你自己的管线功能，这可用于从命令行读取参数，配置或创建MRQ作业，等等。为此，你必须使用 `-MoviePipelineLocalExecutorClass=/Script/MovieRenderPipelineCore.MoviePipelinePythonHostExecutor` ，然后通过 `- ExecutorPythonClass=...` 指定Python执行器类。

运行自定义Python执行器时，你的命令行可能类似于以下内容：

```cpp

UnrealEditor-Cmd.exe "E:\SubwaySequencer\SubwaySequencer.uproject" subwaySequencer_P -game 
-MoviePipelineLocalExecutorClass=/Script/MovieRenderPipelineCore.MoviePipelinePythonHostExecutor 
-ExecutorPythonClass=/Engine/PythonTypes.MoviePipelineExampleRuntimeExecutor -windowed -resx=1280 -resy=720 -log -notexturestreaming

```

若使用此命令行，引擎将启动，然后为你创建基于Python的执行器（在本例中为 `MoviePipelineExampleRuntimeExecutor` ）的实例。创建你的执行器后，你可以读取命令行参数，运行MRQ作业，与外部服务器通信以确定作业信息，等等。

如果你希望自行构建基于Python的执行器，你需要创建从 `unreal.MoviePipelinePythonHostExecutor` 继承的基于Python的UClass，然后你需要覆盖 `execute_delayed` 函数。你需要在 `/Content/Python` 文件夹中创建用于导入自定义模块的"init\_unreal.py"类。虚幻引擎需要此 `init_unreal.py` 文件，才能解析你的Python文件并将其重写为引擎支持的UClass，接着可以在命令行上指定后者。请查看示例脚本，了解关于具体操作示例。

你可以在 `\Plugins\MovieScene\MovieRenderPipeline\Content\Python\MoviePipelineExampleRuntimeExecutor.py` 中查看示例Python执行器，其中显示了如何从命令行读取、发起 **HTTP** 请求并尝试本地套接字连接。此示例的确切参数稍多于上面描述的情况，因此在尝试进行测试时，请阅读示例文件顶部的信息。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [python](https://dev.epicgames.com/community/search?query=python)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [movie render queue](https://dev.epicgames.com/community/search?query=movie%20render%20queue)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [关卡序列参数](/documentation/zh-cn/unreal-engine/using-command-line-rendering-with-move-render-queue-in-unreal-engine#%E5%85%B3%E5%8D%A1%E5%BA%8F%E5%88%97%E5%8F%82%E6%95%B0)
-   [电影管线配置参数](/documentation/zh-cn/unreal-engine/using-command-line-rendering-with-move-render-queue-in-unreal-engine#%E7%94%B5%E5%BD%B1%E7%AE%A1%E7%BA%BF%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0)
-   [使用Python的自定义管线功能](/documentation/zh-cn/unreal-engine/using-command-line-rendering-with-move-render-queue-in-unreal-engine#%E4%BD%BF%E7%94%A8python%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E7%AE%A1%E7%BA%BF%E5%8A%9F%E8%83%BD)