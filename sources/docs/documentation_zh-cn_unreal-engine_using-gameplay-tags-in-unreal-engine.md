# 在虚幻引擎中使用Gameplay标签 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:45:27.341Z

---

目录

![Gameplay标签](https://dev.epicgames.com/community/api/documentation/image/a671c7ae-709e-4d9c-bebd-9477510b52be?resizing_type=fill&width=1920&height=335)

**Gameplay标签（Gameplay Tags）** 是用户定义的字符串，充当概念性的分层标签。你可以将Gameplay标签应用于项目中的对象，并对其求值以驱动你的Gameplay实现，类似于检查布尔值或标记。

你可以使用它们传达许多不同的概念，包括以下概念：

-   对象的属性，例如 `Character.Enemy.Zombie`
-   对象在执行或能够执行的事情，例如 `Movement.Mode.Swimming`
-   游戏事件和触发器，例如 `GameplayEvent.RequestReset`

Gameplay标签可以有任意数量的分层级别，以 `.` 字符分隔表示。例如，标签 `Event.Movement.Dash` 有三个级别，其中 `Event` 是层级中最宽泛的标识符，而 `Dash` 是最具体的。

## 定义Gameplay标签

你必须将Gameplay标签添加到标签字典，以便虚幻引擎识别它们。你可以使用以下某种方法添加（或删除）标签：

-   直接在 **项目设置（Project Settings）** 中添加或删除
-   从 **数据表（Data Table）** 资产导入
-   使用C++定义

以上所有方法都在 **项目设置（Project Settings）** 的 **Gameplay标签（GameplayTags）** 分段中的 **项目（Project）** 标题下设置。

### 在项目设置中添加标签

定义新Gameplay标签的最简单方式是，直接在 **项目设置（Project Settings）** 中添加。

要在 **项目设置（Project Settings）** 中添加标签，请执行以下操作：

1.  启用 **从配置导入标签（Import Tags From Config）** 。这会导入 `.ini` 文件中的所有Gameplay标签，包括 `Config/DefaultGameplayTags.ini` 以及 `Config/Tags` 中的所有标签。
2.  （可选）点击 **添加新Gameplay标签源（Add new Gameplay Tag source）** 按钮，在 `Config/Tags` 中创建新的源 `.ini` 文件来存储Gameplay标签。为项目的各个方面创建单独的源文件，可能对于大型项目的组织和协作很有用。
3.  点击 **Gameplay标签列表（Gameplay Tag List）** 条目旁边的 **管理Gameplay标签（Manage Gameplay Tags）** 按钮。这会打开 **Gameplay标签管理器（Gameplay Tag Manager）** 窗口。
4.  在 **Gameplay标签管理器（Gameplay Tag Manager）** 窗口中，点击左上角的 **添加（Add (+)）** 按钮。
5.  输入所需的 **名称（Name）** 、 **注释（Comment）** 和 **源（Source）** 。注释显示在标签的提示文本上，源是存储标签的 `.ini` 文件。
6.  点击 **添加新标签（Add New Tag）** 按钮。

你可以重命名、删除、复制标签或向其添加新的子标签，方法是在列表中右键点击它并从快捷菜单中选择相应选项。若标签的来源不是 `.ini` 文件，则不能在 **Gameplay标签管理器（Gameplay Tag Manager）** 窗口中重命名或删除。

你可以使用文本编辑器编辑标签 `.ini` 源文件，但你必须重启编辑器才能加载更改。

### 从数据表资产导入标签

你可以使用行类型 `GameplayTagTableRow` 从[数据表](/documentation/zh-cn/unreal-engine/data-driven-gameplay-elements-in-unreal-engine)资产导入Gameplay标签。使用此方法，你可以：

-   在 **数据表编辑器（Data Table Editor）** 中管理标签。
-   在编辑器运行期间更改数据表。
-   通过将 `.csv` 或 `.json` 文件作为数据表导入来添加标签。

要从数据表导入标签，请在 **项目设置（Project Settings）** 中执行以下操作：

1.  点击 **Gameplay标签表列表（Gameplay Tag Table List）** 旁边的 **添加元素（Add Element (+)）** 按钮。
2.  点击新索引的下拉菜单并选择你的数据表。

### 使用C++定义标签

你可以使用 `NativeGameplayTags.h` 中定义的以下宏，通过C++来定义Gameplay标签：

-   `UE_DECLARE_GAMEPLAY_TAG_EXTERN` ：在 `.h` 文件中用于声明 `.cpp` 文件中定义的标签。
-   `UE_DEFINE_GAMEPLAY_TAG` ：在 `.cpp` 文件中用于定义 `.h` 文件中声明的标签，不带提示文本注释。
-   `UE_DEFINE_GAMEPLAY_TAG_COMMENT` ：在 `.cpp` 文件中用于定义 `.h` 文件中声明的标签，带有提示文本注释。
-   `UE_DEFINE_GAMEPLAY_TAG_STATIC` ：在 `.cpp` 文件中用于定义仅对定义文件可用的标签。不同于其他 `DEFINE` 宏，这不应该与 `DECLARE` 宏调用配对。

你必须将 `GameplayTags` 模块添加到你的项目的 `Build.cs` 文件，才能在C++中访问Gameplay标签功能。

#### 示例实现

```cpp
// 在.h文件中
UE_DECLARE_GAMEPLAY_TAG_EXTERN(Movement_Mode_Walking);

// 在.cpp文件中
UE_DEFINE_GAMEPLAY_TAG_COMMENT(Movement_Mode_Walking, "Movement.Mode.Walking", "Default Character movement tag");
```

如需更详细的示例实现，请参阅[Lyra示例游戏](/documentation/zh-cn/unreal-engine/lyra-sample-game-in-unreal-engine)项目中的 `LyraGameplayTags.h` 和 `LyraGameplayTags.cpp` 。

## 使用经过定义的Gameplay标签

经过定义之后，你可以将标签应用于对象并对标签求值，以在项目中驱动Gameplay。

### 将标签应用于对象

要将标签应用于对象，请执行以下操作：

1.  将 **Gameplay标签容器（Gameplay Tag Container）** ([`FGameplayTagContainer`](/documentation/en-us/unreal-engine/API/Runtime/GameplayTags/FGameplayTagContainer))类型变量添加到对象。此变量存储多个Gameplay标签。
2.  使用“添加Gameplay标签”（[`AddTag`](/documentation/en-us/unreal-engine/API/Runtime/GameplayTags/FGameplayTagContainer/AddTag)）函数将指定标签添加到容器。

你还可以使用“删除Gameplay标签”（[`RemoveTag`](/documentation/en-us/unreal-engine/API/Runtime/GameplayTags/FGameplayTagContainer/RemoveTag)）函数从容器删除标签，并使用“附加Gameplay标签容器”（[`AppendTags`](/documentation/en-us/unreal-engine/API/Runtime/GameplayTags/FGameplayTagContainer/AppendTags)）函数将Gameplay标签容器附加到一起。

你可以直接使用Gameplay标签（[`FGameplayTag`](/documentation/en-us/unreal-engine/API/Runtime/GameplayTags/FGameplayTag)）类型变量，但对象往往有多个标签，因此经常需要Gameplay标签容器。

### 使用条件函数对标签求值

你可以基于对象的标签来驱动你的Gameplay实现。要对存储在对象的Gameplay标签容器中的标签求值，你可以使用各种条件函数，例如：

-   有标签（[`HasTag`](/documentation/en-us/unreal-engine/API/Runtime/GameplayTags/FGameplayTagContainer/HasTag)）
-   有任何标签（[`HasAny`](/documentation/en-us/unreal-engine/API/Runtime/GameplayTags/FGameplayTagContainer/HasAny)）
-   有所有标签（[`HasAll`](/documentation/en-us/unreal-engine/API/Runtime/GameplayTags/FGameplayTagContainer/HasAll)）

请参阅[`FGameplayTagContainer`](/documentation/en-us/unreal-engine/API/Runtime/GameplayTags/FGameplayTagContainer)C++ API参考和[GameplayTags](https://docs.unrealengine.com/5.3/zh-CN/BlueprintAPI/GameplayTags/)蓝图API参考，了解更多信息。

除了 `HasAll` 之类的 `All` 函数之外，使用空的Gameplay标签容器作为输入参数调用条件函数会返回false。这是因为，容器中的所有标签在源集内都没有缺失。

#### Gameplay标签查询

**Gameplay标签查询（Gameplay Tag Query）** （[`FGameplayTagQuery`](/documentation/en-us/unreal-engine/API/Runtime/GameplayTags/FGameplayTagQuery)）类型变量组合了条件函数，以更直白精简的方式建立复杂逻辑。

Gameplay标签查询支持以下表达式：

-   **任何标签匹配（Any Tags Match）** ：测试是否能在容器中发现查询中的至少一个标签。
-   **所有标签匹配（All Tags Match）** ：测试查询中的所有标签是否都在容器中。如果查询为空，这会返回true。
-   **无标签匹配（No Tags Match）** ：测试查询中的所有标签是否都不在容器中。如果查询为空，这会返回true。

此外，Gameplay标签查询支持基于子表达式求值的以下根表达式：

-   **任何表达式匹配（Any Expressions Match）** ：测试是否有任何子表达式返回true。
-   **所有表达式匹配（All Expressions Match）** ：测试是否所有子表达式都返回true。如果没有子表达式，这会返回true。
-   **无表达式匹配（No Expressions Match）** ：测试是否没有子表达式返回true。如果没有子表达式，这会返回true。

## 高级主题

### 设置标签编辑限制

你可以限制用户对Gameplay标签进行编辑（在任意层级级别）。

要限制编辑，请在 **项目设置（Project Settings）** 的 **高级Gameplay标签（Advanced Gameplay Tags）> 高级（Advanced）** 下进行以下设置：

-   **受限制的配置文件（Restricted Config Files）** ：用于存储受限制标签的 `.ini` 文件列表，这些标签与具有编辑权限的 **所有者（Owners）** 列表配对。
-   **受限制的标签列表（Restricted Tag List）** ：显示 **Gameplay标签管理器（Gameplay Tag Manager）** 窗口，你可以在该窗口中修改受限制标签。

如果有用户（非列表中的所有者）尝试编辑受限制的标签，将弹出警告消息，要求用户确认自己已获得所有者的编辑授权。如果用户无法确认，则不会做出编辑。

受限制的标签在创建之后，不能在编辑器中删除。要删除受限制的标签，必须直接编辑 `.ini` 文件。

### 简化C++中的标签访问

你可以使用[`IGameplayTagAssetInterface`](/documentation/en-us/unreal-engine/API/Runtime/GameplayTags/IGameplayTagAssetInterface)改进你的Gameplay标签实现。该接口提供了以下优势：

-   你不用显式将对象转型就可以获取对象的标签。
-   你可以为每种可能的类型编写自定义代码。

实现该接口并重载[`GetOwnedGameplayTags`](/documentation/en-us/unreal-engine/API/Runtime/GameplayTags/IGameplayTagAssetInterface/GetOwnedGameplayTags)函数，就能创建一种能够被蓝图访问的方法，来为Gameplay标签容器填充与该对象关联的标签。在大部分情况下，这意味着将基类中的标签复制到新容器中，但你的实现可以从多个容器收集标签，或调用蓝图函数以访问蓝图声明的标签或你的对象需要的任意内容。

关于该实现的示例，请参阅[Lyra示例游戏](/documentation/zh-cn/unreal-engine/lyra-sample-game-in-unreal-engine)项目中的 `ALyraTaggedActor` 类。

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [gameplay tags](https://dev.epicgames.com/community/search?query=gameplay%20tags)
-   [tags](https://dev.epicgames.com/community/search?query=tags)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [定义Gameplay标签](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine#%E5%AE%9A%E4%B9%89gameplay%E6%A0%87%E7%AD%BE)
-   [在项目设置中添加标签](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine#%E5%9C%A8%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE%E4%B8%AD%E6%B7%BB%E5%8A%A0%E6%A0%87%E7%AD%BE)
-   [从数据表资产导入标签](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine#%E4%BB%8E%E6%95%B0%E6%8D%AE%E8%A1%A8%E8%B5%84%E4%BA%A7%E5%AF%BC%E5%85%A5%E6%A0%87%E7%AD%BE)
-   [使用C++定义标签](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine#%E4%BD%BF%E7%94%A8c++%E5%AE%9A%E4%B9%89%E6%A0%87%E7%AD%BE)
-   [示例实现](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine#%E7%A4%BA%E4%BE%8B%E5%AE%9E%E7%8E%B0)
-   [使用经过定义的Gameplay标签](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%BB%8F%E8%BF%87%E5%AE%9A%E4%B9%89%E7%9A%84gameplay%E6%A0%87%E7%AD%BE)
-   [将标签应用于对象](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine#%E5%B0%86%E6%A0%87%E7%AD%BE%E5%BA%94%E7%94%A8%E4%BA%8E%E5%AF%B9%E8%B1%A1)
-   [使用条件函数对标签求值](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%9D%A1%E4%BB%B6%E5%87%BD%E6%95%B0%E5%AF%B9%E6%A0%87%E7%AD%BE%E6%B1%82%E5%80%BC)
-   [Gameplay标签查询](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine#gameplay%E6%A0%87%E7%AD%BE%E6%9F%A5%E8%AF%A2)
-   [高级主题](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine#%E9%AB%98%E7%BA%A7%E4%B8%BB%E9%A2%98)
-   [设置标签编辑限制](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E6%A0%87%E7%AD%BE%E7%BC%96%E8%BE%91%E9%99%90%E5%88%B6)
-   [简化C++中的标签访问](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine#%E7%AE%80%E5%8C%96c++%E4%B8%AD%E7%9A%84%E6%A0%87%E7%AD%BE%E8%AE%BF%E9%97%AE)