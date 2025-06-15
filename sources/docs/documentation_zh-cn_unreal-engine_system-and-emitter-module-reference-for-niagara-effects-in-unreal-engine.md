# 虚幻引擎Niagara系统和发射器模块参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/system-and-emitter-module-reference-for-niagara-effects-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:32:24.617Z

---

目录

![Niagara系统和发射器模块参考](https://dev.epicgames.com/community/api/documentation/image/89308cf6-a1aa-4bb0-85dd-665dfc2626f8?resizing_type=fill&width=1920&height=335)

本页面针对Niagara中的模块运行方式提供了一些基础参考内容。页面底部有一些跳转至其他页面的链接，介绍了Niagara插件中包含的各个组和模块。

## Niagara选择堆栈模型

在Niagara中，粒子模拟（Particle Simulation）会模仿 *堆栈* 的形式运行，它会按照从堆栈顶部到底部的顺序，依次执行名为 *模块* 的可编程代码块。要注意的是，每个模块都会被指定到一个 *组* 中，该组描述了何时执行该模块。

**系统** 组中的模块会首先执行，它们会处理各个发射器共享的行为。然后，**发射器** 组中的模块（Module）和项目（Item）会单独针对各个组执行。之后， **粒子** 组中的参数会针对单个发射器中的各个粒子执行。最后，**渲染器** 组的项目将描述如何将各个发射器的模拟粒子数据渲染到屏幕上。

欲了解选择堆栈详情，请参见[Niagara关键概念](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine)中的 **Niagara选择堆栈和堆栈分组** 部分。

**模块是项目（Item），但项目并不是模块**。*模块* 是用户可创建的可编辑资产。*项目（Item）* 指的是系统或发射器中用户无法创建的部分。举例而言，系统属性、发射器属性和渲染器都是项目。

## 执行状态管理

Niagara系统和发射器拥有定义其模拟运行方式的独特执行状态。作为系统的一部分，各发射器都拥有独立于所属系统的唯一执行状态，因此可以修改独立于所属系统之外的执行方式。可能的执行状态有：

-   **活跃（Active）**：系统或发射器模拟生成并允许生成。
-   **非活跃（Inactive）**：系统或发射器模拟生成，但不允许新生成。
-   **InactiveClear**：系统或发射器将销毁其拥有的所有粒子，然后切换为非活跃执行状态。
-   **完成（Complete）**：系统或发射器既不模拟也不渲染。

## 设置、组和渲染器

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [module](https://dev.epicgames.com/community/search?query=module)
-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)
-   [emitter](https://dev.epicgames.com/community/search?query=emitter)
-   [system](https://dev.epicgames.com/community/search?query=system)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Niagara选择堆栈模型](/documentation/zh-cn/unreal-engine/system-and-emitter-module-reference-for-niagara-effects-in-unreal-engine#niagara%E9%80%89%E6%8B%A9%E5%A0%86%E6%A0%88%E6%A8%A1%E5%9E%8B)
-   [执行状态管理](/documentation/zh-cn/unreal-engine/system-and-emitter-module-reference-for-niagara-effects-in-unreal-engine#%E6%89%A7%E8%A1%8C%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86)
-   [设置、组和渲染器](/documentation/zh-cn/unreal-engine/system-and-emitter-module-reference-for-niagara-effects-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E3%80%81%E7%BB%84%E5%92%8C%E6%B8%B2%E6%9F%93%E5%99%A8)