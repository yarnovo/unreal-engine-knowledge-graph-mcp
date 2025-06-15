# 虚幻引擎关卡快照筛选器参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/level-snapshot-filter-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:33:59.217Z

---

目录

![关卡快照筛选器参考](https://dev.epicgames.com/community/api/documentation/image/5cab1709-92f3-4f4b-bad6-8c4c32956783?resizing_type=fill&width=1920&height=335)

此处仅描述了默认C++筛选器的属性。使用蓝图创建的自定义筛选器可以拥有你指定的任何属性。

## 共享筛选器属性

属性名称

说明

筛选器

 

名称

编辑器中的显示名称。如果留空，将默认为类名。

筛选器行为

确定是直接传递筛选器的结果，还是将其取反。

忽略筛选器

确定是否忽略筛选器。

配置

 

默认结果\*

选项包括：

-   包含（Include）：包含Actor/属性。
-   排除（Exclude）：排除Actor/属性。
-   无所谓（Do Not Care）：
    -   其他筛选器将决定（Another filter will decide）。如果所有筛选器都设置为"无所谓"，那么包含Actor/属性。
    -   用于仅实现一个函数的筛选器：IsActorValid或IsPropertyValid。

\* 此属性未被每个筛选器共享。

## Actor更改了变换筛选器属性

![Actor Changed Transform filter properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba6735d6-3693-4714-abed-cbf5e97acf81/01-actor-changed-transform.png)

属性名称

说明

配置

 

变换检查规则

确定是允许改变了位置的Actor，还是保持在同一位置的Actor。 选项：

-   在变换更改时有效：在快照和世界Actor有不同变换时返回True。
-   在变换保持不变时有效：在快照和世界Actor有相同变换时返回True。

忽略位置

如果启用，那么不比较Actor的位置。

忽略旋转

如果启用，那么不比较Actor的旋转。

忽略缩放

如果启用，那么不比较Actor的缩放比例。

## Actor从属属性筛选器属性

此筛选器很复杂，并且基于其他筛选器。它旨在用于经验丰富的用户，应小心使用。

![Actor Dependent Property filter properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43ef32fc-bae1-48f1-8da9-e8c346449fc8/02-actor-dependent-property.png)

属性名称

说明

配置

 

Actor筛选器

在此筛选器上运行了IsActorValid。在依赖于此筛选器的以下某个筛选器上运行了IsPropertyValid。从下拉列表中选择筛选器，并相应配置其属性。

包含属性筛选器

在ActorFilter > IsActorValid返回Include时由IsPropertyValid使用。从下拉列表中选择筛选器，并相应配置其属性。

排除属性筛选器

在ActorFilter > IsActorValid返回Exclude时由IsPropertyValid使用。从下拉列表中选择筛选器，并相应配置其属性。

无所谓处理

确定在IsActorValid返回DoNotCare时IsPropertyValid应该使用什么筛选器。 选项：

-   使用包含筛选器：IsActorValid返回Include时，使用RunOnIncludedActorFilter。
-   使用排除筛选器：IsActorValid返回Exclude时，使用RunOnExcludedActorFilter。
-   使用无所谓筛选器：IsActorValid返回DoNotCare时，使用RunOnDoNotCareActorFilter。

无所谓属性筛选器

在ActorFilter > IsActorValid返回DoNotCare并且DoNotCareHandling == UseDoNotCareFilter时由IsPropertyValid使用。从下拉列表中选择筛选器，并相应配置其属性。

## "Actor有标签"筛选器属性

![Actor Has Tag filter properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f9dfdd2-4057-4eee-af2c-d0ec71882d9a/03-actor-has-tag.png)

属性名称

说明

配置

 

标签检查行为

确定如何匹配每个Actor中允许的标签。 选项：

-   有所有标签：Actor必须有所有标签才能通过。
-   有任意标签：Actor必须有至少一个标签才能通过。

允许的标签

要对其检查Actor的标签。该属性是包含多个元素的集合，这些元素是标记的文本字符串。

要检查的Actor

确定要在哪个Actor上检查标签。 选项：

-   世界Actor：仅检查世界Actor的标签。
-   快照Actor：仅检查快照Actor的标签。
-   两者：检查两组Actor的标签。

## 常量筛选器属性

![Constant filter properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5fbca98-8859-4585-b02b-250a11212343/04-constant-filter.png)

属性名称

说明

配置

 

Actor是有效结果

选项：

-   包含（Include）
-   排除（Exclude）
-   无所谓（Do Not Care）

属性是有效结果

选项：

-   包含（Include）
-   排除（Exclude）
-   无所谓（Do Not Care）

已删除的Actor是有效结果

选项：

-   包含（Include）
-   排除（Exclude）
-   无所谓（Do Not Care）

已添加的Actor是有效结果

选项：

-   包含（Include）
-   排除（Exclude）
-   无所谓（Do Not Care）

## "属性有名称"筛选器属性

![Property Has Name filter properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25aeabde-9682-4995-b56c-415013d3522e/05-property-has-name.png)

属性名称

说明

配置

 

名称匹配规则

如何将属性名称与允许的名称作比较。 选项：

-   精确包含：名称必须包含输入子字符串（区分大小写）。
-   包含（忽略大小写）：名称必须包含输入子字符串（不区分大小写）。
-   精确匹配：名称必须匹配输入子字符串（区分大小写）。
-   匹配（忽略大小写）：名称必须匹配输入子字符串（不区分大小写）。

允许的名称

要对其检查该属性的名称。该属性是包含多个元素的集合，这些元素是名称的文本字符串。

## 属性类型筛选器属性

![Property Type filter properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6751e087-3596-41c6-bac5-d9e9d538de1b/06-property-type.png)

属性名称

说明

配置

 

允许的类型

你希望允许的属性类型。该属性是包含多个元素的集合，这些元素是类型的文本字符串。

## 变换属性筛选器属性

![Transform Property filter properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c1f904e-110a-4bf3-b779-854cef9aca92/07-transform-property.png)

属性名称

说明

变换

 

位置

选项：

-   包含（Include）
-   排除（Exclude）
-   无所谓（Do Not Care）

旋转

选项：

-   包含（Include）
-   排除（Exclude）
-   无所谓（Do Not Care）

缩放

选项：

-   包含（Include）
-   排除（Exclude）
-   无所谓（Do Not Care）

-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [level snapshot](https://dev.epicgames.com/community/search?query=level%20snapshot)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [共享筛选器属性](/documentation/zh-cn/unreal-engine/level-snapshot-filter-reference-for-unreal-engine#%E5%85%B1%E4%BA%AB%E7%AD%9B%E9%80%89%E5%99%A8%E5%B1%9E%E6%80%A7)
-   [Actor更改了变换筛选器属性](/documentation/zh-cn/unreal-engine/level-snapshot-filter-reference-for-unreal-engine#actor%E6%9B%B4%E6%94%B9%E4%BA%86%E5%8F%98%E6%8D%A2%E7%AD%9B%E9%80%89%E5%99%A8%E5%B1%9E%E6%80%A7)
-   [Actor从属属性筛选器属性](/documentation/zh-cn/unreal-engine/level-snapshot-filter-reference-for-unreal-engine#actor%E4%BB%8E%E5%B1%9E%E5%B1%9E%E6%80%A7%E7%AD%9B%E9%80%89%E5%99%A8%E5%B1%9E%E6%80%A7)
-   ["Actor有标签"筛选器属性](/documentation/zh-cn/unreal-engine/level-snapshot-filter-reference-for-unreal-engine#%22actor%E6%9C%89%E6%A0%87%E7%AD%BE%22%E7%AD%9B%E9%80%89%E5%99%A8%E5%B1%9E%E6%80%A7)
-   [常量筛选器属性](/documentation/zh-cn/unreal-engine/level-snapshot-filter-reference-for-unreal-engine#%E5%B8%B8%E9%87%8F%E7%AD%9B%E9%80%89%E5%99%A8%E5%B1%9E%E6%80%A7)
-   ["属性有名称"筛选器属性](/documentation/zh-cn/unreal-engine/level-snapshot-filter-reference-for-unreal-engine#%22%E5%B1%9E%E6%80%A7%E6%9C%89%E5%90%8D%E7%A7%B0%22%E7%AD%9B%E9%80%89%E5%99%A8%E5%B1%9E%E6%80%A7)
-   [属性类型筛选器属性](/documentation/zh-cn/unreal-engine/level-snapshot-filter-reference-for-unreal-engine#%E5%B1%9E%E6%80%A7%E7%B1%BB%E5%9E%8B%E7%AD%9B%E9%80%89%E5%99%A8%E5%B1%9E%E6%80%A7)
-   [变换属性筛选器属性](/documentation/zh-cn/unreal-engine/level-snapshot-filter-reference-for-unreal-engine#%E5%8F%98%E6%8D%A2%E5%B1%9E%E6%80%A7%E7%AD%9B%E9%80%89%E5%99%A8%E5%B1%9E%E6%80%A7)