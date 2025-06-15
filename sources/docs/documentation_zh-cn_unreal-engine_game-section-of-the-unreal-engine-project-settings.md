# 虚幻引擎项目设置的"游戏"分段 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/game-section-of-the-unreal-engine-project-settings
> 
> 生成时间: 2025-06-14T18:53:11.937Z

---

目录

## 资产管理器

### 资产管理器

**分段**

**说明**

**要扫描的主要资产类型（Primary Asset Types to Scan）**

需要在启动时扫描的资产类型的列表。

**要排除的目录（Directories to Exclude）**

要排除在扫描范围之外的主要资产目录的列表，有助于排除测试资产。

**主要资产规则（Primary Asset Rules）**

具体资产规则覆盖的列表。

**自定义主要资产规则（Custom Primary Asset Rules）**

特定于游戏的资产规则覆盖的类型列表，此分段默认情况下不会产生任何作用。

**仅烘焙产品级资产（Only Cook Production Assets）**

如果为true， `DevelopmentCook` 资产受到烘焙时将会出错，你应该在产品级分支上启用此分段。

**应由管理器决定类型和名称（Should Manager Determine Type and Name）**

如果为true，资产管理器将调用 `DeterminePrimaryAssetIdForObject` 并使用 `.ini` 设置，来决定不实现 `GetPrimaryAssetId` 的主要资产的类型和名称。

对烘焙和未烘焙版本都适用，但速度慢于直接在原生资产上实现 `GetPrimaryAssetId` 。

**应在编辑器中猜测类型和名称（Should Guess Type and Name in Editor）**

如果为true，即使 `bShouldManagerDetermineTypeAndName` 为false，也将在编辑器中表示资产的 `PrimaryAsset` 类型/名称。

会猜测在 `GetPrimaryAssetId` 实现后尚未重新保存的内容的正确ID。

**应在加载时获取缺少的数据块（Should Acquire Missing Chunks on Load）**

如果为true，将查询平台数据块安装接口，从而为所有请求的主要资产加载请求缺少的数据块。

**应就无效资产发出警告（Should Warn About Invalid Assets）**

如果为true，当资产管理器收到指示，要求其加载其不了解的资产或对这类资产进行处理时，将会发出警告。

### 重定向

**分段**

**说明**

**主要资产ID重定向（Primary Asset Id Redirects）**

从 `Type:Name` 重定向到 `Type:NameNew` 。

**主要资产类型重定向（Primary Asset Type Redirects）**

从 `Type` 重定向到 `TypeNew` 。

**资产路径重定向（Asset Path Redirects）**

从 `/game/assetpath` 重定向到 `/game/assetpathnew` 。

### 资产注册表

**分段**

**说明**

**资产注册表的元数据标签（Metadata Tags For Asset Registry）**

需要转移到资产注册表的元数据标签。

## 资产工具

### 高级复制

**分段**

**说明**

**高级复制自定义（Advanced Copy Customizations）**

在对资产进行高级复制时所用规则的列表。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [资产管理器](/documentation/zh-cn/unreal-engine/game-section-of-the-unreal-engine-project-settings#%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%99%A8)
-   [资产管理器](/documentation/zh-cn/unreal-engine/game-section-of-the-unreal-engine-project-settings#%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%99%A8-2)
-   [重定向](/documentation/zh-cn/unreal-engine/game-section-of-the-unreal-engine-project-settings#%E9%87%8D%E5%AE%9A%E5%90%91)
-   [资产注册表](/documentation/zh-cn/unreal-engine/game-section-of-the-unreal-engine-project-settings#%E8%B5%84%E4%BA%A7%E6%B3%A8%E5%86%8C%E8%A1%A8)
-   [资产工具](/documentation/zh-cn/unreal-engine/game-section-of-the-unreal-engine-project-settings#%E8%B5%84%E4%BA%A7%E5%B7%A5%E5%85%B7)
-   [高级复制](/documentation/zh-cn/unreal-engine/game-section-of-the-unreal-engine-project-settings#%E9%AB%98%E7%BA%A7%E5%A4%8D%E5%88%B6)