# Chaos模块化载具系统概览 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/chaos-modular-vehicles-overview
> 
> 生成时间: 2025-06-14T19:53:06.532Z

---

目录

![Chaos模块化载具系统概览](https://dev.epicgames.com/community/api/documentation/image/f7b9407c-6e69-47e3-b583-668934c965ad?resizing_type=fill&width=1920&height=335)

## 简介

![模块化载具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cd241a8-8fdc-496a-9336-544585f8b730/lego-vehicles.gif)

**Chaos模块化载具系统** 是一款支持载具实时建造和摧毁功能的载具模拟插件。这意味着可以在运行时添加或移除载具组件，以适应Gameplay条件。

组装好的载具可以通过代码来手动拆卸部件，或在物理碰撞时使用物理模拟将某些部件拆卸下来。

该系统的设计初衷是支持[重模拟网络物理模型](/documentation/zh-cn/unreal-engine/networked-physics-overview)，比载具系统更为灵活，但也存在一定限制。因此，两套系统同时存在，并可在同一项目中使用。

## 载具系统和模块化载具系统

### 载具构成

使用载具系统创建的载具以骨骼网格体为基础，因此在创建资产后，其拓扑结构就固定了。这些载具可通过[物理资产编辑器](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine)设置碰撞效果，并可使用骨骼网格体动画来制作动画。

相比之下，使用模块化载具系统创建的载具，其构成方式是创建一个几何体合集组件层级，这些组件在集群并集（Cluster Union）载具组件下相连。此外，每个几何体集合组件都可以拥有各自的模拟组件，以便在运行时驱动其行为。

### 复制支持

模块化载具系统原生支持网络物理组件和重模拟复制模式，可提供由客户端预测的服务器权威物理效果（附加倒回重新模拟）。此外，开发者还可以自行创建自定义模块，并提供接口来处理重新模拟所需的额外网络序列化。

### 模拟表示法

载具系统使用一个组件来驱动整个载具模拟。该组件用于配置载具模拟的各个方面，如发动机、变速箱、底盘和车轮等。

模块化载具系统则是基于一套独立的模拟组件集合，当几何体集合被添加到集群并集组件中时，这些组件会被分配到模拟树中。该系统包括发动机、底盘、变速箱、离合器、悬挂、车轮、推进器和气垫模拟组件。

各模块的运行相互独立，模拟各自指定的几何体集合组件，并对组合的群集并集刚体施加作用力。

你可以为载具添加或移除任意数量的模拟组件，使得载具类型更加多样化。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [简介](/documentation/zh-cn/unreal-engine/chaos-modular-vehicles-overview#%E7%AE%80%E4%BB%8B)
-   [载具系统和模块化载具系统](/documentation/zh-cn/unreal-engine/chaos-modular-vehicles-overview#%E8%BD%BD%E5%85%B7%E7%B3%BB%E7%BB%9F%E5%92%8C%E6%A8%A1%E5%9D%97%E5%8C%96%E8%BD%BD%E5%85%B7%E7%B3%BB%E7%BB%9F)
-   [载具构成](/documentation/zh-cn/unreal-engine/chaos-modular-vehicles-overview#%E8%BD%BD%E5%85%B7%E6%9E%84%E6%88%90)
-   [复制支持](/documentation/zh-cn/unreal-engine/chaos-modular-vehicles-overview#%E5%A4%8D%E5%88%B6%E6%94%AF%E6%8C%81)
-   [模拟表示法](/documentation/zh-cn/unreal-engine/chaos-modular-vehicles-overview#%E6%A8%A1%E6%8B%9F%E8%A1%A8%E7%A4%BA%E6%B3%95)