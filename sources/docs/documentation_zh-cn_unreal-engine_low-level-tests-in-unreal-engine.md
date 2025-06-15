# 虚幻引擎中的低级别测试 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:40:01.206Z

---

目录

![低级别测试](https://dev.epicgames.com/community/api/documentation/image/ebd238df-4ae0-456e-a952-44d4603f97d4?resizing_type=fill&width=1920&height=335)

**低级别测试（LLT）** 是虚幻引擎（UE）中的一种测试框架，面向轻量级、以模块为中心的测试。低级别测试使用Catch2测试框架编写。你可以为UE支持的所有平台构建和执行低级别测试。低级别测试包括以下测试类型：

-   **显式（Explicit）** ：由模块和目标对定义的独立测试。

测试均可采用以下任一测试方法：

-   **单元测试（Unit）** ：测试独立的代码分段或单元。
-   **集成测试（Integration）** ：测试组合在一起的多个代码分段或单元。
-   **功能测试（Functional）** ：测试特性或用例的特定功能。
-   **烟雾测试（Smoke）** ：快速验证特性或用例。
-   **端到端测试（End-to-end）** ：测试一个特性的多个阶段。
-   **性能测试（Performance）** ：对特性的运行时间进行基准测试。
-   **应力测试（Stress）** ： 尝试通过对系统施加压力来破坏功能。

你可以通过以下任一测试范例编写低级别测试：

-   **测试驱动开发（TDD）**
-   **行为驱动开发（BDD）**

## 为何要使用低级别测试

低级别测试与其他UE测试框架的不同之处在于，前者在编译和运行时可在资源方面实现投入最小化。LLT适用于各种UE特性，包括：[UObjects](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine)、[资产](/documentation/zh-cn/unreal-engine/working-with-assets-in-unreal-engine)、[引擎组件](/documentation/zh-cn/unreal-engine/basic-components-in-unreal-engine)等。虚幻引擎中的低级别测试使用Catch2（一种现代C++测试框架）编写，扩展后包括测试分组和生命周期事件，以及非常适用于虚幻引擎模块化架构的其他特性。

## 低级别测试指导文档

本页面的其余部分简要概述了多种常见的测试方法。

以下是关于本文档所涵盖内容的概述。所有用例都会用到"构建和运行"文档小节，该小节对于学习如何运行测试至关重要。

### 虚幻引擎低级别测试文档

虚幻引擎低级别测试文档中涵盖的领域包括：

-   [低级别测试类型](/documentation/zh-cn/unreal-engine/types-of-low-level-tests-in-unreal-engine)
-   [编写低级别测试](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine)
-   [构建和运行低级别测试](/documentation/zh-cn/unreal-engine/build-and-run-low-level-tests-in-unreal-engine)

### Catch2文档

本文档未提供Catch2所提供特性的全面资源。有关Catch2的更多信息，请参阅[GitHub](https://github.com/)中的[Catch2仓库](https://github.com/catchorg/Catch2)。有关Catch2的详细信息，包括在Catch2中编写测试，请参阅[Catch2文档](https://github.com/catchorg/Catch2/tree/devel/docs)。

## 测试方法

本小节旨在简要概述低级别测试可帮助你实现的不同测试方法。

### 单元测试

**单元测试** 旨在测试代码的一个单元，通常是一个类中的单一方法。单元测试依赖于模拟输入和外部依赖项，如服务器或数据库。通常，你会为每个测试类编写一个单元测试套件。单元测试的目标在于涵盖一个类的公共接口，以及一种方法中的不同代码路径。

大多数测试并非单元测试，因为这些测试在编写方式上非常受限，并且目标代码可能无法以这种严格的方式进行测试。单元测试应只需进行最少的特殊全局设置（设置模拟、存根和伪对象）和清理，并且它们应该能够在测试套件之间独立运行。单元测试不应对其他单元测试有顺序依赖性。单元测试的速度非常快，只需几秒或更短的时间即可运行。

### 集成测试

**集成测试** 旨在测试组合在一起的多个代码单元，通常是两个或更多类或方法。集成测试可能需要进行全局设置，如加载模块或外部资源。集成测试没有单元测试那么受限，并且更常见，但更难覆盖代码中的分支（if条件等）。集成测试的速度通常比单元测试要慢，需要数秒才能运行。

### 功能测试

**功能测试** 旨在测试特定功能，通常是单个特性或用例。功能测试通常需要进行全局设置和清理，以管理外部资源。这些是最常见的测试类型，它们在复杂程度上差异很大。功能测试可能需要数秒至数分钟运行，极少数情况下可能需要数小时。功能测试的速度通常比集成测试要慢。

### 烟雾测试

**烟雾测试** 旨在快速验证特性或用例。烟雾测试采用最低验收标准。烟雾测试可在应用程序启动（如果需要数秒）或开发版本中运行。通常包含在持续集成、迭代构建中。

### 端到端测试

**端到端测试** 贯穿一个特性的多个阶段，而不仅仅是一个片段。端到端测试是较繁重的测试，可能需要数分钟或更长时间才能完成。端到端测试通常具有带先决条件的检查点，这些先决条件可停止测试。

### 性能测试和应力测试

**性能测试** 通常是基准测试，并且通常需要长时间运行。**应力测试** 针对一项功能，试图通过重复操作或使系统承受压力来破坏系统。这两种测试类型通常都会捕获性能指标，以便与基线进行比较。这两种测试类型的速度可能都很慢，通常需要数小时才能完成，但对于应该运行多长时间没有基本规则。某些性能测试可能仅需数秒或数分钟即可完成。

## 了解更多

### 低级别测试类型

了解有关显式测试以及如何在虚幻引擎代码中构建这种测试的更多信息。

[](/documentation/zh-cn/unreal-engine/types-of-low-level-tests-in-unreal-engine)

[![低级别测试类型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4aee28c0-704f-45cb-bd5d-dc877bd50ddc/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/types-of-low-level-tests-in-unreal-engine)

[低级别测试类型](/documentation/zh-cn/unreal-engine/types-of-low-level-tests-in-unreal-engine)

[确定哪种测试最适合你的用例。](/documentation/zh-cn/unreal-engine/types-of-low-level-tests-in-unreal-engine)

### 编写低级别测试

了解如何在虚幻引擎中使用Catch2编写低级别测试，包括基本指南和最佳实践。

[](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine)

[![编写低级别测试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c830944b-6b62-4395-8210-cf8b10699cf8/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine)

[编写低级别测试](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine)

[了解如何在虚幻引擎中编写低级别测试，包括命名规范和最佳实践。](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine)

### 构建和运行低级别测试

了解如何在虚幻引擎中使用Visual Studio、虚幻编译工具和BuildGraph构建和运行低级别测试。

[](/documentation/zh-cn/unreal-engine/build-and-run-low-level-tests-in-unreal-engine)

[![构建和运行低级别测试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b0967aa-f2b2-4c97-90eb-a2a2fc66bfa5/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/build-and-run-low-level-tests-in-unreal-engine)

[构建和运行低级别测试](/documentation/zh-cn/unreal-engine/build-and-run-low-level-tests-in-unreal-engine)

[了解构建和运行低级别测试的不同方法。](/documentation/zh-cn/unreal-engine/build-and-run-low-level-tests-in-unreal-engine)

-   [testing](https://dev.epicgames.com/community/search?query=testing)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [test](https://dev.epicgames.com/community/search?query=test)
-   [low-level tests](https://dev.epicgames.com/community/search?query=low-level%20tests)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [为何要使用低级别测试](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#%E4%B8%BA%E4%BD%95%E8%A6%81%E4%BD%BF%E7%94%A8%E4%BD%8E%E7%BA%A7%E5%88%AB%E6%B5%8B%E8%AF%95)
-   [低级别测试指导文档](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#%E4%BD%8E%E7%BA%A7%E5%88%AB%E6%B5%8B%E8%AF%95%E6%8C%87%E5%AF%BC%E6%96%87%E6%A1%A3)
-   [虚幻引擎低级别测试文档](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%BD%8E%E7%BA%A7%E5%88%AB%E6%B5%8B%E8%AF%95%E6%96%87%E6%A1%A3)
-   [Catch2文档](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#catch2%E6%96%87%E6%A1%A3)
-   [测试方法](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#%E6%B5%8B%E8%AF%95%E6%96%B9%E6%B3%95)
-   [单元测试](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95)
-   [集成测试](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95)
-   [功能测试](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#%E5%8A%9F%E8%83%BD%E6%B5%8B%E8%AF%95)
-   [烟雾测试](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#%E7%83%9F%E9%9B%BE%E6%B5%8B%E8%AF%95)
-   [端到端测试](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#%E7%AB%AF%E5%88%B0%E7%AB%AF%E6%B5%8B%E8%AF%95)
-   [性能测试和应力测试](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95%E5%92%8C%E5%BA%94%E5%8A%9B%E6%B5%8B%E8%AF%95)
-   [了解更多](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#%E4%BA%86%E8%A7%A3%E6%9B%B4%E5%A4%9A)
-   [低级别测试类型](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#%E4%BD%8E%E7%BA%A7%E5%88%AB%E6%B5%8B%E8%AF%95%E7%B1%BB%E5%9E%8B)
-   [编写低级别测试](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#%E7%BC%96%E5%86%99%E4%BD%8E%E7%BA%A7%E5%88%AB%E6%B5%8B%E8%AF%95)
-   [构建和运行低级别测试](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine#%E6%9E%84%E5%BB%BA%E5%92%8C%E8%BF%90%E8%A1%8C%E4%BD%8E%E7%BA%A7%E5%88%AB%E6%B5%8B%E8%AF%95)

相关文档

[

低级别测试类型

![低级别测试类型](https://dev.epicgames.com/community/api/documentation/image/4aee28c0-704f-45cb-bd5d-dc877bd50ddc?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/types-of-low-level-tests-in-unreal-engine)

[

编写低级别测试

![编写低级别测试](https://dev.epicgames.com/community/api/documentation/image/c830944b-6b62-4395-8210-cf8b10699cf8?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine)

[

构建和运行低级别测试

![构建和运行低级别测试](https://dev.epicgames.com/community/api/documentation/image/6b0967aa-f2b2-4c97-90eb-a2a2fc66bfa5?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/build-and-run-low-level-tests-in-unreal-engine)