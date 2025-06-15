# 面向虚幻引擎的Horde条件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-conditions-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:37:22.259Z

---

目录

![Horde条件](https://dev.epicgames.com/community/api/documentation/image/4233bbbb-2c19-4f44-b783-8ce3bf301e08?resizing_type=fill&width=1920&height=335)

## 简介

在Horde的多个部分中，你可以指定查询条件，从而为操作选择特定代理。这些条件字符串以字符串形式存储在JSON配置文件中，采用类似C语言的语法。

代理会报告从它们的特性中收集的许多属性，你可以从Horde操作面板上的代理（Agents）页面查看这些属性。代理可能会针对某个特定键报告多个值，例如 `PlatformGroup: Desktop` 和 `PlatformGroup: Unix` 。如果某个特定键存在满足表达式的值，则条件求值为true。

## 值

条件字符串中的值为动态类型，会被强制转换为执行相应操作的正确格式。例如，整型 `0` 、字符串 `'0'` 和 `'false'` 以及布尔值 `false` 在功能上是等效的。

整型可以使用以下二进制数量级后缀作为简写形式：

后缀

大小

Kb

2^10 (1,024)

Mb

2^20 (1,048,576)

Gb

2^30 (1,073,741,824)

Tb

2^40 (1,099,511,627,776)

## 运算符

运算符遵循标准C语言的优先级规则。子表达式可以用 `(`圆括号`)` 括起来。

### 布尔运算符

运算符

说明

`true`

布尔字面量

`false`

布尔字面量

`!A`

否定

A `&&` B

逻辑AND

A `\|\|` B

逻辑OR

A `==` B

等式

A `!=` B

不等式

### 整型运算符

运算符

说明

`1234`

整型字面量

`1234kb`

整型字面量，带有二进制大小后缀（求值为1,263,616）。

A `==` B

等式测试

A `!=` B

不等式测试

A `<` B

测试一个值是否小于另一个值

A `<=` B

测试一个值是否小于或等于另一个值

A `>` B

测试一个值是否大于另一个值

A `>=` B

测试一个值是否大于或等于另一个值

A `==` B

等式测试

### 字符串运算符

运算符

说明

`'value'`

字符串字面量

`"value"`

字符串字面量

A `==` B

测试两个字符串是否相等。比较时不区分大小写。

A `!=` B

测试两个字符串是否不同。比较时不区分大小写。

A `~=` B

测试一个字符串（A）是否与一个正则表达式（B）匹配。比较正则表达式时不区分大小写。

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [简介](/documentation/zh-cn/unreal-engine/horde-conditions-for-unreal-engine#%E7%AE%80%E4%BB%8B)
-   [值](/documentation/zh-cn/unreal-engine/horde-conditions-for-unreal-engine#%E5%80%BC)
-   [运算符](/documentation/zh-cn/unreal-engine/horde-conditions-for-unreal-engine#%E8%BF%90%E7%AE%97%E7%AC%A6)
-   [布尔运算符](/documentation/zh-cn/unreal-engine/horde-conditions-for-unreal-engine#%E5%B8%83%E5%B0%94%E8%BF%90%E7%AE%97%E7%AC%A6)
-   [整型运算符](/documentation/zh-cn/unreal-engine/horde-conditions-for-unreal-engine#%E6%95%B4%E5%9E%8B%E8%BF%90%E7%AE%97%E7%AC%A6)
-   [字符串运算符](/documentation/zh-cn/unreal-engine/horde-conditions-for-unreal-engine#%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%BF%90%E7%AE%97%E7%AC%A6)