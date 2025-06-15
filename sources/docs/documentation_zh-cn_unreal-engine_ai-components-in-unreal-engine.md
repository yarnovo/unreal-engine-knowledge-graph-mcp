# 虚幻引擎中的AI组件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/ai-components-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:44:50.354Z

---

目录

![AI组件](https://dev.epicgames.com/community/api/documentation/image/a1269f9f-56a6-4807-988d-589067ba70ee?resizing_type=fill&width=1920&height=335)

AI组件允许 Pawn 感知周围环境中的数据，例如噪声来源位置、或 Pawn 能够看到某个对象。

## AI 感知组件

在 **AIPerceptionSystem** 中，**AIPerceptionComponent** 相当于刺激源的监听器，用于收集已注册的刺激信号。当组件获得新的刺激信号（批量）时，将会调用 **UpdatePerception**。

## Pawn噪声发生器组件

**PawnNoiseEmitterComponent** 追踪 **SensingComponents** 使用的噪声事件数据来监听Pawn。该组件主要存在于 Pawn 或其控制器上。它在网络客户端上不进行任何操作。

## Pawn感应组件

Pawn的感应组件（Sensing Component）用于封装Actor的感知（例如视觉和听觉）设置及功能，以便Actor在游戏世界中观察/监听Pawn。其在网络客户端上不进行任何操作。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [AI 感知组件](/documentation/zh-cn/unreal-engine/ai-components-in-unreal-engine#ai%E6%84%9F%E7%9F%A5%E7%BB%84%E4%BB%B6)
-   [Pawn噪声发生器组件](/documentation/zh-cn/unreal-engine/ai-components-in-unreal-engine#pawn%E5%99%AA%E5%A3%B0%E5%8F%91%E7%94%9F%E5%99%A8%E7%BB%84%E4%BB%B6)
-   [Pawn感应组件](/documentation/zh-cn/unreal-engine/ai-components-in-unreal-engine#pawn%E6%84%9F%E5%BA%94%E7%BB%84%E4%BB%B6)

相关文档

[

人工智能

![人工智能](https://dev.epicgames.com/community/api/documentation/image/1a4dc47b-52b9-4e06-b61d-512591255b60?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/artificial-intelligence-in-unreal-engine)