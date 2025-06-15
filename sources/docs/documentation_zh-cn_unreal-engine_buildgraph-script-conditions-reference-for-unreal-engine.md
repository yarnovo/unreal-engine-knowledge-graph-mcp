# 虚幻引擎BuildGraph脚本条件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/buildgraph-script-conditions-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:32:18.886Z

---

目录

![BuildGraph脚本条件](https://dev.epicgames.com/community/api/documentation/image/075cc5e2-e22a-47fb-bf94-015a444b2f73?resizing_type=fill&width=1920&height=335)

如果需要将逻辑复杂性编译到 **BuildGraph** 脚本中，则需要使用 **条件** 语句。以下部分将介绍BuildGraph条件的编写方式，包括一个条件运算符的列表。

## 条件

BuildGraph脚本条件由计算得出为 `true` 或 `false` 的原子和运算符构成。

### 原子

**原子（Atoms）** 可以是数字、字符串或辨识符，它们将强制变为合适的类型，以便运算符对其进行使用。原子可以包含在单引号（'）或双引号（"）中。它们也可以是一系列不带引号的字母、数字和带下划线字符。无论对它们如何进行声明，所有原子的类型均视为相同。此外，原子对比时不区分大小写，意味着字符串"True"和'true'与辨识符 `true` 相同（无视大小写和引号的不同）。

## 运算符

运算符列表说明如下：

**运算符**

**描述**

**优先权**

`(x)`

用于分组的子表达式。

1

`!x`

`x` 为 `false` 时求值为 `true` 。

1

`Exists(x)`

文件 `x` 存在时求值为 `true` 。

1

`HasTrailingSlash(x)`

`x` 以斜杠或反斜杠结尾时求值为 `true` 。

1

`x == y`

两个原子相等（不区分大小写）时求值为 `true` 。

2

`x != y`

两个原子不相等（不区分大小写）时求值为 `true` 。

2

`x < y`

整数 `x` 小于整数 `y` 时求值为 `true` 。

2

`x <= y`

整数 `x` 小于或等于整数 `y` 时求值为 `true` 。

2

`x > y`

整数 `x` 大于整数 `y` 时求值为 `true` 。

2

`x >= y`

整数 `x` 大于或等于整数 `y` 时求值为 `true` 。

2

`x and y`

两个原子都为 `true` 时求值为 `true` 。

3

`x or y`

`x` 为 `true` 或 `y` 为 `true` 或两个原子都为 `true` 时求值为 `true` 。

4

`'<'` 和 `'>'` 字符必须被换码为XML中的 `"<"` 和 `">"` 。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [buildgraph](https://dev.epicgames.com/community/search?query=buildgraph)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [条件](/documentation/zh-cn/unreal-engine/buildgraph-script-conditions-reference-for-unreal-engine#%E6%9D%A1%E4%BB%B6)
-   [原子](/documentation/zh-cn/unreal-engine/buildgraph-script-conditions-reference-for-unreal-engine#%E5%8E%9F%E5%AD%90)
-   [运算符](/documentation/zh-cn/unreal-engine/buildgraph-script-conditions-reference-for-unreal-engine#%E8%BF%90%E7%AE%97%E7%AC%A6)