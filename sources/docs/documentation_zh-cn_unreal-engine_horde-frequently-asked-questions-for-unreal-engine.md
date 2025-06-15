# 面向虚幻引擎的Horde常见问题解答 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-frequently-asked-questions-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:38:16.418Z

---

目录

![Horde常见问题解答](https://dev.epicgames.com/community/api/documentation/image/d7970738-46a4-4585-8351-95e0a354b61d?resizing_type=fill&width=1920&height=335)

### 为什么用例全都混在一起？

传统上，我们的大多数目标用例作为不同的组件进行处理，但将用例整合在一起会方便很多，还能优化常见用例。例如：

-   存储是所有用于缓存的数据管线的关键组件。
-   远程执行需要数据靠近计算节点，以便快速检索到数据。
-   可伸缩的构建自动化系统使用与远程执行平台相同的调度、管理工具和自动伸缩功能，并且需要一个存储后端来存储中间件和最终构件。

通过共享基础设施来支持我们的内部开发团队，我们希望能够进一步减少繁琐的工作，帮助团队成功协作。

### 要部署Horde才能使用虚幻引擎吗？

不是。不部署Horde也能使用虚幻引擎，但Horde对Epic Games很有价值，我们也希望它对其他团队同样有价值。

### 必须要将Horde部署到云端吗？

不必。Horde能够在使用现有硬件的本地部署环境中良好运行，不过即便你没有在云端托管其他任何基础设施，某些应用程序仍可能会从云存储中获益。

### 必须要使用CI系统/远程执行功能/测试框架等等吗？

不需要。每个功能都是可选项，禁用任何功能都无妨碍。

### 为什么要使用Horde进行构建自动化，而不使用Jenkins或TeamCity呢？

大多数构建自动化系统特意设计为通用型，所以你可以在其上运行任何工作负载。

这使得构建运维团队有大量繁琐的工作要做：编写构建脚本，管理代理之间的构件传输以实现并行处理，为最终构件设置存储，实现一种方法来为构建代理管理联网开发工具包和移动设备的分配等等。

此外，最终得到的系统并不是非常智能。你可能会收到构建失败的通知，但需要人工来诊断是什么故障、故障从什么时候开始的，以及需要由谁来修复故障。你需要想办法清理旧的构建构件，并管理它们的访问权限。如果你为构件使用网络共享，你需要处理大量差别不大的重合构件。然后，如果你是一家大型机构，你需要找到一种方法，将这些构件分发给不同地点的开发者，当然，你可能还需要一些工具，以便开发者能够找到并获取这些构件。

比如搭建服务器来追踪构建之间的自动化测试结果，这又是另一个层面的事情了；你可以选择在构建自动化系统上运行，但你可能会有大量的测试，这些测试会针对众多不同的变更生成数据，而这些数据又需要存储在某个地方，而且你可能还想要深入研究这些数据，从而查明一些事情，例如，在某个特定地图中帧率何时降到了某个特定阈值以下，或者某个特定关卡的大小在何时超出了某个特定点。

很多这类问题与构建自动化系统通常致力于解决的问题并无关联。但通过将这些问题放在一起考虑，我们就能做出更明智的实施决策，充分了解它们的运行环境。

也就是说，Horde的CI功能在默认情况下是不启用的。在不迁移到新的构建自动化系统的情况下，Horde中的其他功能仍然可以使用。

### 构建自动化系统支持Git、Subversion等吗？

目前不支持。我们做了许多以Perforce为中心的假设，例如能够在单一的线性分支历史中对变更进行强排序。我们还有很多自定义逻辑，可以有效地配置Perforce工作区。

我们未来可能会探索对其他版本控制系统的支持。

### 如果我们使用了Horde，Epic Games会获取有关我们项目的遥测数据吗？

不会。Horde不会向Epic Games发送任何数据。

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [为什么用例全都混在一起？](/documentation/zh-cn/unreal-engine/horde-frequently-asked-questions-for-unreal-engine#%E4%B8%BA%E4%BB%80%E4%B9%88%E7%94%A8%E4%BE%8B%E5%85%A8%E9%83%BD%E6%B7%B7%E5%9C%A8%E4%B8%80%E8%B5%B7%EF%BC%9F)
-   [要部署Horde才能使用虚幻引擎吗？](/documentation/zh-cn/unreal-engine/horde-frequently-asked-questions-for-unreal-engine#%E8%A6%81%E9%83%A8%E7%BD%B2horde%E6%89%8D%E8%83%BD%E4%BD%BF%E7%94%A8%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E5%90%97%EF%BC%9F)
-   [必须要将Horde部署到云端吗？](/documentation/zh-cn/unreal-engine/horde-frequently-asked-questions-for-unreal-engine#%E5%BF%85%E9%A1%BB%E8%A6%81%E5%B0%86horde%E9%83%A8%E7%BD%B2%E5%88%B0%E4%BA%91%E7%AB%AF%E5%90%97%EF%BC%9F)
-   [必须要使用CI系统/远程执行功能/测试框架等等吗？](/documentation/zh-cn/unreal-engine/horde-frequently-asked-questions-for-unreal-engine#%E5%BF%85%E9%A1%BB%E8%A6%81%E4%BD%BF%E7%94%A8ci%E7%B3%BB%E7%BB%9F/%E8%BF%9C%E7%A8%8B%E6%89%A7%E8%A1%8C%E5%8A%9F%E8%83%BD/%E6%B5%8B%E8%AF%95%E6%A1%86%E6%9E%B6%E7%AD%89%E7%AD%89%E5%90%97%EF%BC%9F)
-   [为什么要使用Horde进行构建自动化，而不使用Jenkins或TeamCity呢？](/documentation/zh-cn/unreal-engine/horde-frequently-asked-questions-for-unreal-engine#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E4%BD%BF%E7%94%A8horde%E8%BF%9B%E8%A1%8C%E6%9E%84%E5%BB%BA%E8%87%AA%E5%8A%A8%E5%8C%96%EF%BC%8C%E8%80%8C%E4%B8%8D%E4%BD%BF%E7%94%A8jenkins%E6%88%96teamcity%E5%91%A2%EF%BC%9F)
-   [构建自动化系统支持Git、Subversion等吗？](/documentation/zh-cn/unreal-engine/horde-frequently-asked-questions-for-unreal-engine#%E6%9E%84%E5%BB%BA%E8%87%AA%E5%8A%A8%E5%8C%96%E7%B3%BB%E7%BB%9F%E6%94%AF%E6%8C%81git%E3%80%81subversion%E7%AD%89%E5%90%97%EF%BC%9F)
-   [如果我们使用了Horde，Epic Games会获取有关我们项目的遥测数据吗？](/documentation/zh-cn/unreal-engine/horde-frequently-asked-questions-for-unreal-engine#%E5%A6%82%E6%9E%9C%E6%88%91%E4%BB%AC%E4%BD%BF%E7%94%A8%E4%BA%86horde%EF%BC%8Cepicgames%E4%BC%9A%E8%8E%B7%E5%8F%96%E6%9C%89%E5%85%B3%E6%88%91%E4%BB%AC%E9%A1%B9%E7%9B%AE%E7%9A%84%E9%81%A5%E6%B5%8B%E6%95%B0%E6%8D%AE%E5%90%97%EF%BC%9F)