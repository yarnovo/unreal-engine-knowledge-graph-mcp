# 管理运行时活跃的文化 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/managing-the-active-culture-at-runtime
> 
> 生成时间: 2025-06-14T19:11:16.957Z

---

目录

![管理运行时活跃的文化](https://dev.epicgames.com/community/api/documentation/image/ff373a44-0957-4346-a132-7f6d6d6a4d20?resizing_type=fill&width=1920&height=335)

## 查询和应用文化

在 **虚幻引擎(UE)** 中，**活跃的文化（Active Culture）** 实际上可以指以下三种情况之一：

-   **语言** - 该语言用于确定应该使用的本地化数据。
    
-   **区域** - 该区域用于控制国际化库中数字/日期/时间等等的格式。
    
-   **资源组文化** - [资源组](/documentation/zh-cn/unreal-engine/asset-localization-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%B5%84%E6%BA%90%E7%BB%84)允许您创建一组资源类，这些资源类可以指定给与主项目语言不同的文化。
    

可以通过更改活跃的文化（Active Culture）来同时设置所有这些内容。然而，如果您的项目打算使用资源组，则您需要将语言和地区（游戏通常将它们设置为相同的值）和资源组区分为不同的设置。

UE简化了这种区分，还提供了一些工具，您可以在C++和蓝图中使用这些工具来帮助管理这些设置。

### 获取活跃的文化

活跃的文化基础信息存储在"FInternationalization"单件中，但"UKismetInternationalizationLibrary"提供了一小组包装函数，使您能够一致从C++和蓝图访问此信息。

函数

说明

**[GetCurrentLanguage](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FInternationalization/GetCurrentLanguage/index.html)**

将活跃的语言获取为IETF语言标签。

**[GetCurrentLocale](https://api.unrealengine.com/INT/API/Runtime/Engine/Kismet/UKismetInternationalizationLibra-/GetCurrentLocale/index.html)**

将活跃的区域获取为IETF语言标签。

**[GetCurrentAssetGroupCulture](https://api.unrealengine.com/INT/API/Runtime/Engine/Kismet/UKismetInternationalizationLibra-/GetCurrentAssetG-/index.html)**

将指定资源组的文化获取为IETF语言标签。

### 设置活跃的文化

活跃的文化基础信息存储在"FInternationalization"单件中，但"UKismetInternationalizationLibrary"提供了一小组包装函数，使您能够从C++和蓝图设置值。它们还提供了一种方法，可以选择将新设置保存到每个用户的配置文件中。

函数

说明

**[SetCurrentCulture](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FInternationalization/SetCurrentCulture/index.html)**

从IETF语言标签中设置活跃的文化（语言、区域和所有资源组）。

**[SetCurrentLanguage](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FInternationalization/SetCurrentLanguage/index.html)**

从IETF语言标签中设置活跃的语言。

**[SetCurrentLocale](https://api.unrealengine.com/INT/API/Runtime/Engine/Kismet/UKismetInternationalizationLibra-/SetCurrentLocale/index.html)**

从IETF语言标签中设置活跃的区域。

**[SetCurrentLanguageAndLocale](https://api.unrealengine.com/INT/API/Runtime/Engine/Kismet/UKismetInternationalizationLibra-/SetCurrentLangua-/index.html)**

从设置IETF语言标签中设置活跃的语言和区域。

**[SetCurrentAssetGroupCulture](https://api.unrealengine.com/INT/API/Runtime/Engine/Kismet/UKismetInternationalizationLibra-/SetCurrentAssetG-/index.html)**

从IETF语言标签中设置指定资源组的文化。

**[ClearCurrentAssetGroupCulture](https://api.unrealengine.com/INT/API/Runtime/Engine/Kismet/UKismetInternationalizationLibra-/ClearCurrentAsse-/index.html)**

清除指定资源组的文化（将恢复回使用活跃的文化）。

在非发布版本中，还可以使用引擎控制台命令更改文化。

**示例：**

```cpp
	culture=fr
	language=fr
	locale=fr

```

### 查询可用语言

相关可用语言基础信息存储在"FTextLocalizationManager"单件中，但"UKismetInternationalizationLibrary"提供了一小组包装函数，让您能够一致从C++和蓝图访问此信息。

函数

说明

**[GetNativeCulture](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FPolyglotTextData/GetNativeCulture/index.html)**

将本地化类别的原生文化获取为IETF语言标签。

**[GetLocalizedCultures](http://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FPolyglotTextData/GetLocalizedCultures/index.html)**

将有本地化数据可用的文化列表获取为IETF语言标签。

**GetSuitableCulture**

从可用语言列表中获取最合适的文化。

**GetCultureDisplayName**

从语言IETF标签中获取文化的显示名称。

### 覆盖默认文化

UE通过查询基础平台层的活跃的语言和区域来确定默认文化。如果不支持平台语言，UE将返回到本地化目标的原生语言。在已发布的项目中，您可能不会覆盖此行为。但是，在开发过程中，这些覆盖对于测试其他语言非常有用。

项目的默认设置通常在DefaultGame.ini中定义。下面的示例显示了将文化设置为法语。

**示例：**

```cpp
	[Internationalization]
	culture=fr

```

下面的示例显示了将语言和区域设置为法语，而将音频资源组设置为日语。

**示例：**

```cpp
	[Internationalization]
	language=fr
	locale=fr
	[Internationalization.AssetGroupCultures]
	+Audio=ja

```

还可以使用命令行标签覆盖这些设置。

**示例：**

```cpp
	-culture=fr
	-language=fr
	-locale=fr

```

## 本地化预览

本地化预览提供了一种无需退出编辑器即可预览项目本地化数据的方法，它通过 **预览游戏语言（Preview Game Language）** 设置进行配置。要更改这些设置，请遵循以下步骤。

1.  在编辑器的菜单栏中，单击 **编辑（Edit）> 编辑器偏好设置（Editor Preferences）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a9a5051-984f-435f-9e15-68364365a1bf/localizationpreview-01.png)
2.  在 **编辑器偏好设置（Editor Preferences）** 对话框中，在 **常规（General）** 下，单击 **区域和语言（Region and Language）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee1bece3-074b-4bea-8309-1a21790c5f73/localizationpreview-02.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee1bece3-074b-4bea-8309-1a21790c5f73/localizationpreview-02.png)
    
3.  单击 **预览游戏语言（Preview Game Language）** 旁边的下拉框并选择要预览的语言。
    

当在 **编辑器中运行(PIE)** 运行时，预览会自动激活，并传递给编辑器中启动的所有独立实例。还可以在 **UMG编辑器** 中使用该预览来用不同的语言预览控件。在预览运行时，所有可编辑文本字段将设置为只读状态，以防止翻译数据意外覆盖源数据。

PIE和UMG预览有时不能完全准确地展示项目在运行时的情形，因为它们只加载本地化数据，而不影响语言或地区设置。如果您想要准确地展示，可以在编辑器中运行独立的实例（这与使用"-game"运行编辑器相同）。

## 文化重映射

文化重映射提供了一种将一个文化代码映射到另一个文化代码的方法，并且在处理脚本或国家代码无法处理的区域差异时非常有用。文化重映射会进入"DefaultGame.ini"文件，它们是一对用分号隔开的IETF语言标签。

**示例：**

```cpp
	[Internationalization]
	+CultureMappings="es-MX;es-419"

```

## 文化限制

文化限制提供了启用或禁用某些文化的方法，您可以根据每个构建配置执行此方法。如果您想禁用测试所需的语言，但不应包含在项目的已发布版本中，则文化限制可能非常有用。

文化限制通常会进入"DefaultGame.ini"，它们设置了一个IETF语言标签。可以包含一个应用该限制的构建配置列表（没有列出构建配置意味着这些限制适用于所有的构建配置）。

**示例：**

```cpp
	[Internationalization]
	;在所有构建配置中仅启用法语
	+EnabledCultures="fr"
	[Internationalization]
	;在测试和发布构建配置中仅启用法语
	+EnabledCultures="fr;Test,Shipping"
	[Internationalization]
	;在发布构建配置中禁用德语
```

+DisabledCultures="de;Shipping"

-   [localization](https://dev.epicgames.com/community/search?query=localization)
-   [active culture](https://dev.epicgames.com/community/search?query=active%20culture)
-   [culture remapping](https://dev.epicgames.com/community/search?query=culture%20remapping)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [查询和应用文化](/documentation/zh-cn/unreal-engine/managing-the-active-culture-at-runtime#%E6%9F%A5%E8%AF%A2%E5%92%8C%E5%BA%94%E7%94%A8%E6%96%87%E5%8C%96)
-   [获取活跃的文化](/documentation/zh-cn/unreal-engine/managing-the-active-culture-at-runtime#%E8%8E%B7%E5%8F%96%E6%B4%BB%E8%B7%83%E7%9A%84%E6%96%87%E5%8C%96)
-   [设置活跃的文化](/documentation/zh-cn/unreal-engine/managing-the-active-culture-at-runtime#%E8%AE%BE%E7%BD%AE%E6%B4%BB%E8%B7%83%E7%9A%84%E6%96%87%E5%8C%96)
-   [查询可用语言](/documentation/zh-cn/unreal-engine/managing-the-active-culture-at-runtime#%E6%9F%A5%E8%AF%A2%E5%8F%AF%E7%94%A8%E8%AF%AD%E8%A8%80)
-   [覆盖默认文化](/documentation/zh-cn/unreal-engine/managing-the-active-culture-at-runtime#%E8%A6%86%E7%9B%96%E9%BB%98%E8%AE%A4%E6%96%87%E5%8C%96)
-   [本地化预览](/documentation/zh-cn/unreal-engine/managing-the-active-culture-at-runtime#%E6%9C%AC%E5%9C%B0%E5%8C%96%E9%A2%84%E8%A7%88)
-   [文化重映射](/documentation/zh-cn/unreal-engine/managing-the-active-culture-at-runtime#%E6%96%87%E5%8C%96%E9%87%8D%E6%98%A0%E5%B0%84)
-   [文化限制](/documentation/zh-cn/unreal-engine/managing-the-active-culture-at-runtime#%E6%96%87%E5%8C%96%E9%99%90%E5%88%B6)