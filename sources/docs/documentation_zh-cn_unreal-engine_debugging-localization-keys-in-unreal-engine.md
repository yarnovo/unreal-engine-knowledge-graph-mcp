# 在虚幻引擎中调试本地化键 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/debugging-localization-keys-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:11:09.197Z

---

目录

![本地化键调试](https://dev.epicgames.com/community/api/documentation/image/a86a819b-1c5a-422a-9c32-cdc7f6210e07?resizing_type=fill&width=1920&height=335)

**本地化键调试文化（localization key debug culture）** 是一种特殊的[本地化文化](/documentation/zh-cn/unreal-engine/managing-the-active-culture-at-runtime)，可帮助你调试本地化的文本。如果你将应用程序的文化设置为 `keys` 的值，则你的UI中本地化的文本都将显示其本地化键，而不是显示文本。这既包括使用[字符串表](/documentation/zh-cn/unreal-engine/using-string-tables-for-text-in-unreal-engine)本地化的文本，也包括在C++中通过 `LOCTEXT` 宏本地化的文本。 确定可能存在问题的本地化文本由此变得简单，尤其是对于复杂UI，因为你可以直接在所显示文本的上下文中观察键，并将它们与表进行快速匹配。

如需使用本地化键调试文化，请执行以下步骤：

1.  执行以下操作之一：

-   运行你的应用程序的 **开发** 或 **调试** 版本。更多详情请参阅\[打包\]小节。
    
-   使用 **在编辑器中运行（Play In Editor）** ，在 **虚幻编辑器** 中运行你的应用程序。
    

在虚幻编辑器的控制台中更改本地化文化，将会更改编辑器文本以及预览中的文本所使用的语言。我们建议使用开发或调试版本，而不是使用虚幻编辑器，以保持环境整洁并避免混淆。

1.  点击波浪号（ **~** ）键以调出 **控制台** 。
    
2.  键入以下命令并按Enter键：
    
    ```cpp
         -culture=keys
    ```
    

你输入此命令后，你的UI中本地化的文本都将显示其键，而不是正常文本。

![激活了Keys文化的Lyra示例项目。 ](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83317f78-522b-4109-8c9f-bebe36c5eebb/debug_keys_editor.png)

激活了Keys调试文化的Lyra主菜单示例。Slate.LogPaintedText 设置为true，因此日志在预览中显示所绘制文本的完整本地化键。

### 显示完整本地化键

你可以将 `Slate.LogPaintedText` 设置为1或 `true` ，以将当前在屏幕上绘制的文本记录在日志中。这样就可以看到完整的本地化键，而不会出现UI裁剪问题。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [localization](https://dev.epicgames.com/community/search?query=localization)
-   [debugging](https://dev.epicgames.com/community/search?query=debugging)
-   [localization keys](https://dev.epicgames.com/community/search?query=localization%20keys)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [显示完整本地化键](/documentation/zh-cn/unreal-engine/debugging-localization-keys-in-unreal-engine#%E6%98%BE%E7%A4%BA%E5%AE%8C%E6%95%B4%E6%9C%AC%E5%9C%B0%E5%8C%96%E9%94%AE)