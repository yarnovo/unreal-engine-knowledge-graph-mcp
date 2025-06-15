# 面板布料编辑器概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/panel-cloth-editor-overview
> 
> 生成时间: 2025-06-14T19:48:55.185Z

---

目录

![面板布料编辑器概述](https://dev.epicgames.com/community/api/documentation/image/2d1a04a9-4f65-4afd-997f-be711ac88687?resizing_type=fill&width=1920&height=335)

## 介绍

虚幻引擎5.3引入了一种使用 **Chaos布料面板** 节点编辑器创作布料的新方法。这个新的工作流程侧重于缩短迭代时间，并且能够更灵活、非破坏性地在引擎中创作Chaos布料。

此系统使用一种 **布料资产** ，它将保存在运行时生成和模拟该资产所需的所有信息。你通过Chaos布料面板节点编辑器构建资产，并使用数据流图表从各种源生成逼真的布料物理现象。

构建你的布料资产时，你可以从外部基于面板的数字内容创建（DCC）包中导入静态网格体，并转移皮肤权重和遮罩。你还可以添加XPBD布料约束并使用LSV（关卡设定体积）碰撞进行模拟。

一旦创建了该资产，你可以通过Chaos布料组件将其与所有骨骼或静态网格体配合使用。

此工作流程可将布料资产从其各自的骨骼网格体中分离出来，并使美术师能够生成各种角色可以使用的布料资产。此外，它无需调整虚幻引擎之外的布料资产，因此可以缩短迭代时间。

## 新旧面板编辑器对比

### 物理模拟

Chaos布料面板节点编辑器和旧版布料编辑器使用同一Chaos解算器进行物理模拟。但是，该面板节点编辑器扩展了可选(XPBD)约束类型的功能。

从长远来看，Chaos布料面板节点编辑器将继续扩展功能，旨在支持实时工作流程，以及面向VFX的工作流程（通过使用缓存）。数据流图表的设置决定了模拟的速度和精度。

### 布料资产渲染

Chaos布料面板节点编辑器能够让你更精细地控制布料资产设置，且不会把布料指标烘焙成褶形姿势。这转而又提供了采用正确设置的更美观的模拟，即使使用的是旧约束。

布料资产工作流程使用独立于骨骼网格体的单独布料资产。这使得美术师拥有更大的灵活性，并能够在布料渲染网格体中使用尽可能多的材质。

不过，与旧版系统相比，它的渲染成本略高。这是因为布料资产是由组件单独渲染的，这在对象管理和绘制调用方面会产生更多的开销。

## 工作流程概述

使用Chaos布料面板节点编辑器创作布料时，总体工作流程包括如下：

**外部DCC包（External DCC Package）**

-   将角色的骨骼网格体导入外部DCC包中。
-   创建布料资产并确保它们适合。确保创建单独的渲染和模拟网格体。
-   以FBX格式导出这两种静态网格体。

**虚幻引擎（Unreal Engine）**

-   将静态网格体导入虚幻引擎。
-   从每个具有新数据流图表的新静态网格体中创建一个新的布料资产。
-   构建节点图表，以非破坏性的方式生成布料资产。
-   将皮肤权重从骨骼网格体转移到布料静态网格体。
-   配置布料设置 - 类似于旧版系统。
-   将权重贴图添加到布料网格体。
-   为碰撞设置物理资产。
-   将Chaos布料组件添加到你的角色蓝图，并添加布料资产。
-   在游戏中测试布料模拟。

要详细了解此工作流程，请遵循[面板布料编辑器教程](https://dev.epicgames.com/community/learning/tutorials/pv7x/unreal-engine-cloth-panel-editor)。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [介绍](/documentation/zh-cn/unreal-engine/panel-cloth-editor-overview#%E4%BB%8B%E7%BB%8D)
-   [新旧面板编辑器对比](/documentation/zh-cn/unreal-engine/panel-cloth-editor-overview#%E6%96%B0%E6%97%A7%E9%9D%A2%E6%9D%BF%E7%BC%96%E8%BE%91%E5%99%A8%E5%AF%B9%E6%AF%94)
-   [物理模拟](/documentation/zh-cn/unreal-engine/panel-cloth-editor-overview#%E7%89%A9%E7%90%86%E6%A8%A1%E6%8B%9F)
-   [布料资产渲染](/documentation/zh-cn/unreal-engine/panel-cloth-editor-overview#%E5%B8%83%E6%96%99%E8%B5%84%E4%BA%A7%E6%B8%B2%E6%9F%93)
-   [工作流程概述](/documentation/zh-cn/unreal-engine/panel-cloth-editor-overview#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E6%A6%82%E8%BF%B0)