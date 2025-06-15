# Niagara轻量级发射器概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/niagara-lightweight-emitters-overview
> 
> 生成时间: 2025-06-14T19:31:11.905Z

---

目录

![Niagara轻量级发射器概述](https://dev.epicgames.com/community/api/documentation/image/eb36768a-f4db-49e6-8ccb-3c865df231ed?resizing_type=fill&width=1920&height=335)

## 概述

虚幻引擎5.4推出了Niagara **轻量级发射器** 。这类发射器也称为 **无状态发射器** ，经过了优化，能最大程度地减少（在某些情况下消除）模拟过程中更新函数的使用。

此外，轻量级发射器无需编译，这样工作流程更快，即使系统中的发射器数量较多，对性能的影响也会更小。这意味着在大多数情况下，无状态发射器的性能将明显优于有状态（传统）发射器。

你可以在Niagara系统内添加无状态发射器，方法是右键单击系统概览（System Overview）窗口，从菜单中选择 **添加无状态发射器（Add stateless emitter）** 。Niagara系统可以同时运行两种类型的发射器，但纯无状态系统的性能最佳。

## 提升性能并加快开发速度

推出无状态发射器主要是为了降低Niagara的内存和CPU开销，并缩短视觉特效处理美术师的开发时间。

为了实现这一目的，无状态发射器具备以下优势：

-   如果Niagara系统完全无状态，则可 **降低游戏线程函数更新开销** 。
-   **去除每个无状态发射器的并发函数更新开销** 。
-   当Niagara系统完全无状态时，可 **降低渲染线程开销** 。
-   **降低内存开销** ，因为内存中没有脚本或粒子信息。
-   消除 **发射器数量** 和 **粒子实例数量** 的 **性能影响** 。
-   **减少** （有时甚至消除） **编译** 需求。

## 无状态发射器的利弊权衡

为了提高性能，无状态发射器是固定功能，并且只能访问以下模块：

-   加速力
-   添加速度
-   旋度噪点/噪点向量场
-   阻力
-   重力
-   初始化粒子
-   初始网格体方向
-   围绕点旋转
-   缩放色阶
-   缩放网格体大小
-   按速度缩放网格体大小
-   缩放Sprite大小
-   按速度缩放Sprite大小
-   形状位置
-   解算速度和力
-   Sprite旋转速率
-   子UV动画

你可以调整每个可用模块的设置，但不能创建自定义模块、暂存区或使用动态输入。当前的功能集可以通过C++进行扩展，并且你可以在Niagara系统内将无状态发射器转换为有状态发射器，反之亦然。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/niagara-lightweight-emitters-overview#%E6%A6%82%E8%BF%B0)
-   [提升性能并加快开发速度](/documentation/zh-cn/unreal-engine/niagara-lightweight-emitters-overview#%E6%8F%90%E5%8D%87%E6%80%A7%E8%83%BD%E5%B9%B6%E5%8A%A0%E5%BF%AB%E5%BC%80%E5%8F%91%E9%80%9F%E5%BA%A6)
-   [无状态发射器的利弊权衡](/documentation/zh-cn/unreal-engine/niagara-lightweight-emitters-overview#%E6%97%A0%E7%8A%B6%E6%80%81%E5%8F%91%E5%B0%84%E5%99%A8%E7%9A%84%E5%88%A9%E5%BC%8A%E6%9D%83%E8%A1%A1)