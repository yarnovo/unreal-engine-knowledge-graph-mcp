# 虚幻引擎5中的上下文切换 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/context-switches-in-unreal-engine-5
> 
> 生成时间: 2025-06-14T20:39:29.258Z

---

目录

![上下文切换](https://dev.epicgames.com/community/api/documentation/image/77413f42-8b62-4e18-bff4-80d04244c6f2?resizing_type=fill&width=1920&height=335)

## 上下文切换

**上下文切换（Context Switch）** 用于存储进程或线程的状态，以便稍后可以还原和恢复执行。 尝试使用启动程序版本（Launcher Build）来分析上下文切换时，需要确保在相应引擎版本的"选项（Options）"中启用"用于调试的编辑器符号（Editor Symbols for Debugging）"。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cd6b4c9-fefa-40e7-9bb3-199e54e01952/editorsymbolsfordebugging.png)

上下文切换在Windows、XB1/XSX和PS4/PS5平台上受支持。

1.  你可以在命令行中启用 **ContextSwitch** 追踪通道：
    
    ```cpp
             -trace=default,ContextSwitch
    		
    ```
    
    在Windows上，根据你的用户权限设置，你的项目运行时应"以管理员身份运行"。
    
2.  在Unreal Insights中打开追踪文件，如果某个会话启用了 `ContextSwitch` 追踪事件，则会在Timing Insights视图中显示以下信息：
    

a) 其他CPU核心轨道。 对于记录的追踪中的每个CPU内核都有一个轨道；其中显示时间事件，指明哪个线程在相应CPU内核上执行。 "未知（Unknown）"时间事件表示从其他应用程序/进程或从操作系统执行线程。

b) 每个CPU线程都有一个头部通道，其中包含内核编号事件，指明相应线程正在哪个内核上执行。 执行线程的时间范围以及被抢占的时间点都将突出显示出来。

![cpu-thread](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26b745b3-dce0-48bb-bb2f-5507b08049e9/cputhread.png)

c) "CPU/GPU"下拉菜单显示上下文切换的其他选项：

![cou-gpu-context-menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e19105ea-52c5-4660-8cf5-b2f38dfc5a3d/contextcpu.png)

d) CPU线程轨道中"内核（Core）"时间事件的上下文菜单会显示其他选项：

![core-timing-event-track](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f45b2f4-6b71-4a8f-9aa5-fc595ad87dce/coretiming.png)

e) CPU内核轨道中"线程（Thread）"时间事件的上下文菜单会显示其他选项：

![thread-timing-event](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4df71da1-a5d3-48a5-9165-4bada887d95f/threadtiming.png)

-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [insights](https://dev.epicgames.com/community/search?query=insights)
-   [profiling](https://dev.epicgames.com/community/search?query=profiling)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [上下文切换](/documentation/zh-cn/unreal-engine/context-switches-in-unreal-engine-5#%E4%B8%8A%E4%B8%8B%E6%96%87%E5%88%87%E6%8D%A2)