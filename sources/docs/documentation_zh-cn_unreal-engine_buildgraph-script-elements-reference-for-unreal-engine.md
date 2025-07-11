# 虚幻引擎BuildGraph 脚本元素参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:32:18.674Z

---

目录

![BuildGraph 脚本元素](https://dev.epicgames.com/community/api/documentation/image/19744ae5-2604-4399-8cce-0e539d2f3c3b?resizing_type=fill&width=1920&height=335)

**BuildGraph** 脚本使用XML编写。本文档覆盖了 BuildGraph 脚本中的数据类型以及它们的整体结构。

## 元素

**元素（Elements）**描述它们包含的数据，使它们成为 BuildGraph 脚本的基础构建块之一。下表包含作为元数据提供的项目，将在构建系统上运行时导出。在本地执行任务时它们不会被 BuildGraph 直接使用，将以 `[META]` 标记。

## 图表结构

一个 BuildGraph 脚本通常由以下元素定义：

-   `<Node>`
    
-   `<Aggregate>`
    
-   `<Agent>`
    
-   `<Trigger>`
    

### 节点

`<Node>` 是 BuildGraph 中执行的最小单位，拥有一套输入和输出。每个 `<Node>` 由按顺序执行的一个任务序列组成。

属性

类型

是否必需？

描述

**Name**

命名

必需

节点名。

**Requires**

目标列表

可选

由此节点需要执行的其他节点生成的节点列表、聚合，或标记文件集，由分号间隔。

**Produces**

标记列表

可选

此节点向其他节点提供的标记文件集，由分号间隔。

**After**

目标列表

可选

如果一些节点为当前目标的一部分，该属性列举在该节点之前运行的那些节点，由分号间隔。（如非当前目标的部分，则无视）。

**NotifyOnWarnings**

布尔

可选

如为 `false` ，此节点将不生成警告通知。只由构建系统使用。默认为 `true`。`[META]`

**If**

条件

可选

将被求值的条件。元素将被无视，除非条件求值为 `true`。

### 聚合

`<Aggregate>` 声明一个命名的聚合，可用作一套其它节点（或生成的标签集）的同义词。

属性

类型

是否必需？

描述

**Name**

命名

必需

聚合名。

**Requires**

目标列表

必需

此聚合的依赖性列表。可能是节点、标记的文件集，或代理群组。

**If**

条件

可选

将被求值的条件。元素将被无视，除非条件求值为 `true`。

### 代理

`<Agent>` 定义按次序执行的节点上代理的要求（无需清理中间目录）。本地构建时将无视 `<Agent>` 要求，但必须被指定。

属性

类型

是否必需？

描述

**Name**

命名

必需

群组名。

**Type**

辨识符列表

可选

运行的代理类型。此字符串的含义由 host 构建系统所推断；它不含任何本质含义。`[META]`

**If**

条件

可选

将被求值的条件。元素将被无视，除非条件求值为 `true`。

### 触发

`<Trigger>` 的作用是图表部分（该图表只在显式用户介入后执行）的一个容器。如需在触发后执行节点，将 `-Trigger=<Name>` 传至命令行。

属性

类型

是否必需？

描述

**Name**

命名

必需

触发名。

**If**

条件

可选

将被求值的条件。元素将被无视，除非条件求值为 `true`。

## 属性操作

BuildGraph 属性可通过以下元素进行修改：

-   `<Property>`
    
-   `<Option>`
    
-   `<EnvVar>`
    

### 属性

`<Property>` 设置属性的数值。如外部作用域中的属性已使用相同命名声明，`<Property>` 会将其覆盖。否则将在当前作用域中声明一个新属性。

属性

类型

是否必需？

描述

**Name**

命名

必需

设置的属性名。

**Value**

字符串

必需

属性的新值。

**If**

条件

可选

将被求值的条件。元素将被无视，除非条件求值为 `true`。

### 选项

`<Option>` 定义可从命令行进行设置的用户选项。`<Option>` 可能只出现在全局作用域。

属性

类型

是否必需？

描述

**Name**

命名

必需

通过选项数值初始化的选项（和属性）名。

**Description**

字符串

必需

通过 `-ListOnly` 参数运行 BuildGraph 时选项显示的描述。

**Restrict**

正则表达式

可选

匹配此选项有效数值的正则表达式（如 `[a-zA-Z]+`, `true \| false`）。

**DefaultValue**

字符串

必需

用户不进行显式设置时的选项默认值。

**If**

条件

可选

将被求值的条件。元素将被无视，除非条件求值为 `true`。

### EnvVar

`<EnvVar>` 声明属性，以包含环境变量的内容（如未设置则为空白字符串）。`<EnvVar>` 可能只出现在全局作用域。

属性

类型

是否必需？

描述

**Name**

Name

Required

作为属性引入的环境变量名。

**If**

条件

可选

将被求值的条件。元素将被无视，除非条件求值为 `true`。

## 流动控制

可通过以下元素控制 BuildGraph 脚本的流动。

-   `<Include>`
    
-   `<Do>`
    
-   `<Switch>`
    
-   `<ForEach>`
    

### 包括

`<Include>` 处理其他 BuildGraph 脚本的内容，就像它存在出现在此文件中那样。`<Include>` 可能只出现在全局作用域。

属性

类型

是否必需？

描述

**Script**

字符串

必需

需要包含的脚本的路径（相对于当前脚本）。

**If**

条件

可选

将被求值的条件。元素将被无视，除非条件求值为 `true`。

### Do

`<Do>` 将元素的序列分组，仅在条件求值为 true 时对它们进行处理。

属性

类型

是否必需？

描述

**If**

条件

可选

将被求值的条件。元素将被无视，除非条件求值为 `true`。

### 切换

`<Switch>` 与 [C](http://www.open-std.org/jtc1/sc22/wg14/www/standards) 切换语句相似，因其在分支序列上对条件求值，使用求值为 true 的条件处理首个语句。

`<Switch>` 语句示例：

```cpp
	<Switch>
		<Case If=X>
			<Elements go here if X is true>
		</Case>
		<Case If=Y>
			<Elements go here if X is false but Y is true>
		</Case>
		<Default>
			<Elements go here otherwise>
		</Default>
	</Switch>
```

属性

类型

是否必需？

描述

**If**

条件

可选

将被求值的条件。元素将被无视，除非条件求值为 `true`。

### ForEach

`<ForEach>` 通过在一个列表中指定到每个项目的给定属性（由分号间隔）来展开元素主体。

`<ForEach>` 语句示例：

```cpp
	<ForEach Name="Counter" Values="1;2;3;4;5">
		<Log Message="Counter=$(Counter)"/>
	</ForEach>
```

属性

类型

是否必需？

描述

**Name**

命名

必需

指定到列表中每个数值的属性。

**Values**

字符串列表

必需

数值列表，由分号间隔。

**If**

条件

可选

将被求值的条件。元素将被无视，除非条件求值为 `true`。

## 诊断

可通过以下元素对 BuildGraph 脚本执行诊断。

-   `<Warning>`
    
-   `<Error>`
    

### 警告

`<Warning> 会在执行图表前输出警告消息。` `可能包含在节点、代理、触发、或整体作用域中。如` \` 在被裁剪到被执行的目标后仍为图表的一部分，它将只提供一个输出。

属性

类型

是否必需？

描述

**Message**

字符串

必需

被打印到日志的文本。

**If**

条件

可选

将被求值的条件。元素将被无视，除非条件求值为 `true`。

### 错误

`<Error>` 将输出错误消息。`<Error>` 可能包含在节点、代理、触发、或整体作用域中。如 `<Error>` 在被裁剪到被执行的目标后仍为图表的一部分，它将只提供一个输出。

属性

类型

是否必需？

描述

**Message**

字符串

必需

被打印到日志的文本。

**If**

条件

可选

将被求值的条件。元素将被无视，除非条件求值为 `true`。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [buildgraph](https://dev.epicgames.com/community/search?query=buildgraph)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [元素](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E5%85%83%E7%B4%A0)
-   [图表结构](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E5%9B%BE%E8%A1%A8%E7%BB%93%E6%9E%84)
-   [节点](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E8%8A%82%E7%82%B9)
-   [聚合](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E8%81%9A%E5%90%88)
-   [代理](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E4%BB%A3%E7%90%86)
-   [触发](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E8%A7%A6%E5%8F%91)
-   [属性操作](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E5%B1%9E%E6%80%A7%E6%93%8D%E4%BD%9C)
-   [属性](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E5%B1%9E%E6%80%A7)
-   [选项](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E9%80%89%E9%A1%B9)
-   [EnvVar](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#envvar)
-   [流动控制](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E6%B5%81%E5%8A%A8%E6%8E%A7%E5%88%B6)
-   [包括](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E5%8C%85%E6%8B%AC)
-   [Do](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#do)
-   [切换](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E5%88%87%E6%8D%A2)
-   [ForEach](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#foreach)
-   [诊断](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E8%AF%8A%E6%96%AD)
-   [警告](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E8%AD%A6%E5%91%8A)
-   [错误](/documentation/zh-cn/unreal-engine/buildgraph-script-elements-reference-for-unreal-engine#%E9%94%99%E8%AF%AF)