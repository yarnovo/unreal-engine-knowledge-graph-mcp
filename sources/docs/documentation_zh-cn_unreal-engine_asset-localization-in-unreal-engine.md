# 虚幻引擎中的资产本地化 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/asset-localization-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:11:08.928Z

---

目录

![资产本地化](https://dev.epicgames.com/community/api/documentation/image/cc592c38-29b6-4f03-81b0-1ea6d35c98f8?resizing_type=fill&width=1920&height=335)

资产本地化允许您在依据文化的基础上用一个资产完全替换另一个资产。

本地化资产存在于项目内容文件夹中 **L10N** 文件夹下依据文化的文件夹中。因此，如果您有一个名为"/Game/MyFolder/MyAsset"的资产，并且想要将该资产本地化为法语("fr")，那么本地化资产将为"/Game/L10N/fr/MyFolder/MyAsset"。

**内容浏览器** 提供帮助您管理本地化资产的选项。这些选项可以在 **资产本地化（Asset Localization）** 子菜单下找到。要使用内容浏览器选项创建或管理本地化资产，必须为要本地化的文化提供"LocRes"文件。在默认情况下，本地化资产在内容浏览器中处于隐藏状态。单击 **设置（Settings）> 显示本地化内容（Show Localized Content）** 以查看。

如果在运行时更改了文化，则本地化资产不会进行热重载，因为内容热重载仅在编辑器中可用。如果您计划在运行时支持动态文化更改，则可能需要重新启动游戏才能使这些更改生效。重新启动游戏将清除并重载本地化资产。

包含字节码的资产（例如蓝图）无法本地化，因为这些资产可以原生化为C++。这些资产不能在运行时进行替换。

## 本地化字体

字体本地化可以通过以下两种方式之一实现：

-   您可以使用[复合字体](/documentation/zh-cn/unreal-engine/font-asset-and-editor-in-unreal-engine)来生成适用于所有文化的单个字体资产。
    
-   您可以使用资产本地化为每种文化生成单独的字体资产。
    

只有当您的项目不支持在运行时动态更改文化，并且不显示任何不受限制的用户定义文本（如播放器名称或聊天窗口）时，才推荐使用第二个选项。在所有其他情况下，第一个选项将提供更好的结果。

## 本地化对话

对话本地化集中在 **对话声波** 资产类型上，它允许您定义通过标准本地化管道收集步骤收集的口语文本（以及可选的字幕覆盖）。

对话声波本身并不是一个完整的对话或会话系统。它们只是提供了一种表达方式，"线路 **X** 是人员 **A** 向人员 **B**、**C** 或 **D** 说话"，使用的是针对每种组合的指定声波。每种语言所需的独特声波的数量可能会有所不同，这取决于语言的规则。但是，这种问题被封装在对话声波中。因此，您只需要在正确的上下文中播放它，就会得到准确的本地化结果。

**虚幻引擎(UE)** 还提供了一系列工具来帮助录制和管理本地化对话。在U4中，不需要使用这些工具将对话本地化，但这些工具确实会自动执行许多这种工作。

如果您使用这些工具，这些工具将在本地化目标的内容文件夹中生成一个额外的依据文化的文件，文件名为"{TargetName} dialog .csv"。**对话表单** 是自定义CSV文件，包含本地化管道从您的资产中收集的依据文化的对话行。它们由本地化导出脚本步骤生成，并由本地化导入脚本步骤重新导入到存档中。

关于对话表单，请记住以下信息：

-   **口语对话（SpokenDialogue）** 字段可以在录制过程中进行编辑，并作为当前翻译重新导入。
    
-   **音频文件名（AudioFileName）** 字段定义对话行的录制音频应具有的依据文化的WAV文件（见下文）。
    

一旦从这些对话表单中录制了音频，音频文件应该按照 **音频文件名（AudioFileName）** 字段定义的名称命名，并放置在一个文化子文件夹（例如"MyRecordedAudio/fr"）中。然后，可以使用导入对话步骤将其导入UE，以生成正确的 **对话（Dialogue）** 和 **声波资产（Sound Wave Assets）**（这可以在新音频可用时迭代完成）。

默认的对话文件名格式保证唯一性，但对用户而言并不具备良好的可读性。可以使用 **项目设置（Project Settings）** 的 **音频（Audio）** 部分下的 **对话文件名格式（Dialogue Filename Format）** 设置进行更改。应该在开始录制任何音频之前确定使用的文件名格式，因为之后很难更改。

由于与翻译文本相比，翻译对话的成本相对较高，预计只有在脚本完成后才会开始对话本地化，并遵循以下工作流程。

1.  为对话行设置原生对话。
    
2.  录制原生对话并可能对其进行编辑（可能使用多次迭代）。如果进行了编辑，则重新导入编辑过的原生对话以进行翻译。
    
3.  将原生对话翻译成文本，准备制作本地化对话。
    
4.  录制本地化对话并可能对其进行编辑（可能使用多次迭代）。如果进行了编辑，则重新导入本地化对话，以确保字幕准确。
    

在此过程中任何原生文本发生更改，都将从步骤1重新启动工作流程。

## 创建资产组

资产组允许您创建一系列资产类，这些资产类集可以指定给与项目其余部分不同的文化。

一个常见的用例是，允许玩家选择音频使用一种语言，而其他所有内容使用另一种语言。为此，定义一个名为 **音频（Audio）** 的新资产组，并将其设置为针对您的项目使用音频类（通常转到"DefaultGame.ini"中）：

```cpp
    [Internationalization.AssetGroupClasses]
    +Audio=SoundWave
    +Audio=DialogueWave
```

现在，您可以将一种独特的文化指定给该资产组，而不影响项目的其余部分。详情请参阅[管理活跃的文化](/documentation/zh-cn/unreal-engine/managing-the-active-culture-at-runtime)页面。

-   [localization](https://dev.epicgames.com/community/search?query=localization)
-   [asset localization](https://dev.epicgames.com/community/search?query=asset%20localization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [本地化字体](/documentation/zh-cn/unreal-engine/asset-localization-in-unreal-engine#%E6%9C%AC%E5%9C%B0%E5%8C%96%E5%AD%97%E4%BD%93)
-   [本地化对话](/documentation/zh-cn/unreal-engine/asset-localization-in-unreal-engine#%E6%9C%AC%E5%9C%B0%E5%8C%96%E5%AF%B9%E8%AF%9D)
-   [创建资产组](/documentation/zh-cn/unreal-engine/asset-localization-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%B5%84%E4%BA%A7%E7%BB%84)