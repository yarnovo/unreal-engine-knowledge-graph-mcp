# 虚幻引擎蓝图编译器概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:11.887Z

---

目录

![蓝图编译器概述](https://dev.epicgames.com/community/api/documentation/image/712cf9fd-d80b-497d-92f0-09bebff425c3?resizing_type=fill&width=1920&height=335)

与普通C++类一样，蓝图在游戏中使用之前需要进行编译。当您单击 **蓝图编辑器（Blueprint Editor）** 中的 **编译（Compile）** 按钮时，系统将执行把蓝图资源的属性和图表 转换为类的过程。

## 术语

$ FKismetCompilerContext : 执行编译工作的类。系统为每次编译生成一个新实例。存储对正在编译的类、蓝图等的引用。

$ FKismetFunctionContext : 保存用于编译单个函数的信息，例如对关联图表、属性和生成的UFunction的引用。

$ FNodeHandlingFunctor : 一个辅助工具类，用于处理编译器中的一个节点类（单件）。包含用于注册引脚连接和生成编译语句的函数。

$ FKismetCompiledStatement : 编译器中的工作单元。编译器将节点转换为一组已编译语句，后端将这些语句转换为字节码操作。

**示例：**变量赋值（Variable assignment）、转到（Goto）、调用（Call）

$ FKismetTerm : 图表中的终端（文字、常量或变量引用）。每个数据引脚连接都与其中一个终端关联！您还可以在"NodeHandlingFunctor"中为Scratch变量、中间结果等创建自己的术语。

## 编译过程

下面概述了编译蓝图的基本过程：

（单击项目以查看）

1.  [清理类](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E6%B8%85%E7%90%86%E7%B1%BB)
2.  [创建类属性](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%B1%BB%E5%B1%9E%E6%80%A7)
3.  [创建函数列表](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%87%BD%E6%95%B0%E5%88%97%E8%A1%A8)
4.  [绑定和链接类](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E7%BB%91%E5%AE%9A%E5%92%8C%E9%93%BE%E6%8E%A5%E7%B1%BB)
5.  [编译函数\*](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E7%BC%96%E8%AF%91%E5%87%BD%E6%95%B0)
6.  [完成编译类](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E5%AE%8C%E6%88%90%E7%BC%96%E8%AF%91%E7%B1%BB)
7.  [后端发出生成的代码\*](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E5%90%8E%E7%AB%AF%E5%8F%91%E5%87%BA%E7%94%9F%E6%88%90%E7%9A%84%E4%BB%A3%E7%A0%81)
8.  [复制类默认对象属性](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E5%A4%8D%E5%88%B6%E7%B1%BB%E9%BB%98%E8%AE%A4%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7)
9.  [重新实例化](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E9%87%8D%E6%96%B0%E5%AE%9E%E4%BE%8B%E5%8C%96)

### 清理类

类是现场编译的，这意味着相同的 **UBlueprintGeneratedClass** 会被一次又一次地清理和重用， 因此指向类的指针不必固定。**CleanAndSanitizeClass()** 将属性和函数从类中移到临时包中的垃圾类中， 然后清除类中的任何数据。

### 创建类属性

编译器在蓝图的 **新变量（NewVariables）** 阵列以及其他一些地方（构造脚本等）上进行迭代， 以查找类所需的所有UProperty，然后在 函数 **CreateClassVariablesFromBlueprint()** 中创建UClass作用域上的UProperty。

### 创建函数列表

编译器通过处理事件图表，处理正则函数图表和\_预编译\_函数（即为每个上下文调用 **PrecompileFunction()**） 来为类创建函数列表。

#### 处理事件图表

事件图表的处理由 **CreateAndProcessUberGraph()** 函数执行。此 函数将所有事件图表复制到一个大图表中，在此之后，节点将获得机会而展开。然后， 此函数为图表中的每个事件节点创建一个函数存根，并为每个事件图表创建一个 **FKismetFunctionContext**。

#### 处理函数图表

正则函数图表的处理由 **ProcessOneFunctionGraph()** 函数完成， 此函数将每个图表复制到一个临时图表中，其中节点将获得机会而展开。此函数还将为每个函数图表都创建一个 **FKismetFunctionContext** 。

#### 预编译函数

函数的预编译由每个上下文的 **PrecompileFunction()** 处理。此函数执行 以下操作：

-   计划执行并计算数据依赖性。
-   删除任何计划外的或不是数据依赖项的节点。
-   在每个剩余节点上运行节点处理器的 **RegisterNets()**。
-   此操作将为函数内的值创建 **FKismetTerms**。
-   创建 **UFunction** 和关联属性。

### 绑定和链接类

现在编译器已经了解类的所有UProperty和UFunction，因此它可以绑定和链接该类， 这包括填充属性链、属性大小、函数图等。此时，从本质上看，它具有一个类标头 -  
减去最终的标记和元数据 - 以及一个类默认对象(CDO)。

### 编译函数

下一步是为剩余的节点生成 **FKismetCompiledStatment** 对象， 此操作使用 **AppendStatementForNode()** 通过节点处理器的 **Compile()** 函数完成。此 函数可以在编译函数中创建 **FKismetTerm** 对象，但前提是这些对象仅在本地使用。

### 完成编译类

为了完成编译类，编译器将确定类标记，并从父类传播标记和元数据， 最后执行一些最终检查，以确保编译过程中一切正常。

### 后端发出生成的代码

后端将每个函数上下文中的语句集合转换为代码。有两个后端 在使用：

-   **FKismetCompilerVMBackend** - 将FKCS转换为UnrealScript VM字节码，然后将其序列化为函数的脚本阵列。
-   **FKismetCppBackend** - 发出\_类似C++\_的代码，仅用于调试用途。

### 复制类默认对象属性

编译器使用一个特殊的函数 **CopyPropertiesForUnrelatedObjects()** 将类的旧CDO中的值 复制到新CDO中。属性通过标记序列化复制， 因此只要名称一致，它们就应当会被正确地传输。在此阶段， CDO的组件将被重新实例化并进行适当的修复。操作时以GeneratedClass CDO为准。

### 重新实例化

由于类可能已经更改了大小，且属性可能已经过添加或删除， 因此编译器需要用刚编译的类重新实例化所有对象。这个过程使用 **TObjectIterator** 查找类的所有实例， 生成一个新实例，然后使用 **CopyPropertiesForUnrelatedObjects()** 函数 将旧实例复制到新实例。

有关详细信息，请参阅 **FBlueprintCompileReinstancer** 类。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [术语](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E6%9C%AF%E8%AF%AD)
-   [编译过程](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E7%BC%96%E8%AF%91%E8%BF%87%E7%A8%8B)
-   [清理类](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E6%B8%85%E7%90%86%E7%B1%BB)
-   [创建类属性](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%B1%BB%E5%B1%9E%E6%80%A7)
-   [创建函数列表](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%87%BD%E6%95%B0%E5%88%97%E8%A1%A8)
-   [处理事件图表](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E5%A4%84%E7%90%86%E4%BA%8B%E4%BB%B6%E5%9B%BE%E8%A1%A8)
-   [处理函数图表](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E5%A4%84%E7%90%86%E5%87%BD%E6%95%B0%E5%9B%BE%E8%A1%A8)
-   [预编译函数](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E9%A2%84%E7%BC%96%E8%AF%91%E5%87%BD%E6%95%B0)
-   [绑定和链接类](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E7%BB%91%E5%AE%9A%E5%92%8C%E9%93%BE%E6%8E%A5%E7%B1%BB)
-   [编译函数](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E7%BC%96%E8%AF%91%E5%87%BD%E6%95%B0)
-   [完成编译类](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E5%AE%8C%E6%88%90%E7%BC%96%E8%AF%91%E7%B1%BB)
-   [后端发出生成的代码](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E5%90%8E%E7%AB%AF%E5%8F%91%E5%87%BA%E7%94%9F%E6%88%90%E7%9A%84%E4%BB%A3%E7%A0%81)
-   [复制类默认对象属性](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E5%A4%8D%E5%88%B6%E7%B1%BB%E9%BB%98%E8%AE%A4%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7)
-   [重新实例化](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine#%E9%87%8D%E6%96%B0%E5%AE%9E%E4%BE%8B%E5%8C%96)