# 虚幻引擎BuildGraph | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/buildgraph-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:32:18.784Z

---

目录

![BuildGraph](https://dev.epicgames.com/community/api/documentation/image/b97f3893-848b-4436-a1af-f1f162fa791e?resizing_type=fill&width=1920&height=335)

**BuildGraph** 是一个基于脚本的构建自动化系统，其特点是拥有 **虚幻引擎（UE）** 项目中常见的构建块图表。BuildGraph 整合了 **UnrealBuildTool**、**AutomationTool**，以及 **编辑器**。可根据项目进行延展和自定义。

BuildGraph 脚本以 XML 编写，指定用户定义节点的图表（通过节点之间的依赖性）。每个节点由按序列执行的多个任务组成，产生某些输出（如编译此项目、然后打包、运行此测试，等等）。当被询问构建目标（即为一个节点或命名输出）时，BuildGraph 将执行图表中构建所需的全部节点。

和其他构建工具不同，BuildGraph 是类似 makefile 的脚本语言和 build farm 配置脚本的混合。它允许对承担步骤执行的机器类型进行注解，在出现步骤失败时提供失败通知接收者列表，并将仅在显式用户触发后执行的节点分组。它还将追踪来自任务执行的输出文件的创建，方式是让图表执行在一个农场的机器上进行分布（节点在需要之处同步运行），且中间工件将自动传送至网络共享（或从网络共享传输）。

Epic 使用 BuildGraph 准备虚幻引擎二进制版本、市场中的样本包，并应用自己游戏的流程（除其他外）。`[虚幻引擎根目录]/Engine/Build/Graph/Examples` 目录下有数个示例 BuildGraph 脚本，创建二进制 UE4 分布的脚本位于 `[虚幻引擎根目录]/Engine/Build/InstalledEngineBuild.xml` 中。

通过 Visual Studio 打开脚本后，将使用存在于 `[虚幻引擎根目录]Engine/Build/Graph/Schema.xsd` 的模式在编辑时提供丰富的工具提示、验证和智能感知功能。

## 编写 BuildGraph 脚本

如希望学习如何自行编写 **BuildGraph** 脚本，它有助于了解构成图表的多个部分。图表通过以下单元创建：

-   **任务**：作为构建过程的部分执行的行为（编译、打包等）。
    
-   **节点**：排序任务（执行生成输出）的命名序列。在它们可被执行之前，节点可能依赖于其他节点先行执行其任务。
    
-   **代理**：在相同机器上执行的一组节点（如作为构建系统的一部分运行）。进行本地构建时代理无效果。
    
-   **触发**：手动介入后才会执行的群组的容器。
    
-   **聚合**：可通过单一命名进行引用的节点和命名输出群组。
    

脚本常频繁使用可重复使用的属性或条件定义值。属性由 `<Property>` 单元声明，作用域为其首个声明的点。通过 `<Property Name>` 符号引用的属性在所有属性字符串均有效，并将在脚本被读取时被展开。用户可在命令行上进行供应的属性可通过 `<Option>` 单元进行声明，可使用 `<EnvVar>` 单元将环境变量导入属性。

单元可通过"if"属性进行条件定义。查看以下条件语句表达式语法。

BuildGraph 一般用于打包的游戏，因此原生支持过滤和文件处理。支持文件列表的属性可能包含一个 Perforce 风格的通配符（匹配任意位置任意数量的 `...`、`*` 和 `？` 式样）、一个完整的路径名、或对文件标记合集的一个引用。属性以 `#` 前缀表示。使用 `<Tag>` 任务可将文件添加到一个标记集，还可执行并/差风格的运算。每个节点可以命名标签串列的形式声明多个输出，其他节点可依赖于这个串列。

图表可作为构建系统的一部分同步执行。如需照此执行，通过 `-Export=<Filename>` 参数运行生成最初的图表配置（生成一个 JSON 文件，列出要执行的节点和依赖性）。每个参与的代理应被同步到相同的变更列表，AutomationTool（UAT）应通过合适的 `-SingleNode=<Name>` 参数重新运行。来自不同节点的输出通过共享存储（通常为网络共享）在代理之间传输，可使用 `-SharedStorageDir=<Path>` 参数在命令行上指定共享路径。注意：机器的分配（它们之间的协调）将假定由外部系统管理。

用于定义 BuildGraph 架构的单元列于以下部分中。

## BuildGraph 脚本编写参考

[

![BuildGraph脚本条件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e41816c-3c41-4c1b-b6c5-1d0e20944812/placeholder_topic.png)

BuildGraph脚本条件

学习编写BuildGraph脚本条件的语法。





](/documentation/zh-cn/unreal-engine/buildgraph-script-conditions-reference-for-unreal-engine)[

![BuildGraph 脚本类型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3683726f-1e87-4426-858b-f634f34cd53d/placeholder_topic.png)

BuildGraph 脚本类型

学习 BuildGraph 属性的有效数据类型。





](/documentation/zh-cn/unreal-engine/buildgraph-script-types-reference-for-unreal-engine)[

![BuildGraph脚本任务](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f89cb48-95f9-4fca-b4b2-abb4b6a47790/placeholder_topic.png)

BuildGraph脚本任务

了解如何利用BuildGraph创建自定义任务。





](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine)[

![BuildGraph 脚本元素](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f04ce633-15c0-4b3f-8c34-8b8de8ec2793/placeholder_topic.png)

BuildGraph 脚本元素

学习 BuildGraph 的元素。





](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine)

## 使用 BuildGraph

[](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine)

[![BuildGraph功能的使用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/662b6b68-850a-4b10-8247-540650c14028/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine)

[BuildGraph功能的使用](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine)

[此页面展示了使用BuildGraph脚本的使用示例。](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine)

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [buildgraph](https://dev.epicgames.com/community/search?query=buildgraph)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [编写 BuildGraph 脚本](/documentation/zh-cn/unreal-engine/buildgraph-for-unreal-engine#%E7%BC%96%E5%86%99buildgraph%E8%84%9A%E6%9C%AC)
-   [BuildGraph 脚本编写参考](/documentation/zh-cn/unreal-engine/buildgraph-for-unreal-engine#buildgraph%E8%84%9A%E6%9C%AC%E7%BC%96%E5%86%99%E5%8F%82%E8%80%83)
-   [使用 BuildGraph](/documentation/zh-cn/unreal-engine/buildgraph-for-unreal-engine#%E4%BD%BF%E7%94%A8buildgraph)

相关文档

[

虚幻编译工具

![虚幻编译工具](https://dev.epicgames.com/community/api/documentation/image/1cb1c340-bd57-4fdb-b0e3-88a4f14ff2b3?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-build-tool-in-unreal-engine)