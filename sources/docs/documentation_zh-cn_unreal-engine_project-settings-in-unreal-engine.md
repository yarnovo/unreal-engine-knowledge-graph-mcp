# 虚幻引擎中的项目设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/project-settings-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:53:12.167Z

---

目录

![项目设置](https://dev.epicgames.com/community/api/documentation/image/027a8fa6-5dbf-4230-a306-391eed19262f?resizing_type=fill&width=1920&height=335)

通过 **项目设置（Project Settings）** 窗口，你可以配置影响以下内容的选项：

-   你的虚幻引擎项目。
-   引擎在运行项目时的行为。
-   项目如何在特定平台上运行。

启用某些插件后，"项目设置（Project Settings）"窗口中还会出现该插件的相关配置选项。

该窗口中的所有设置都保存在项目的默认引擎配置文件（ `Engine.ini` ）中。"项目设置（Project Settings）"窗口提供了一个可视、直观以及可搜索的用户界面，帮助你来编辑这些设置。不过，你也可以手动编辑 `Engine.ini` 文件，来更改各项设置。

## 访问项目设置

要打开"项目设置（Project Settings）"窗口，请在虚幻引擎的主菜单中找到 **编辑（Edit）> 项目设置（Project Settings）** 。

![选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d648819-f3dc-4a9a-96d7-c1611e5ca0fd/001-edit-menu.png)

## 类别和分段

在"项目设置（Project Settings）"窗口中，不同设置和选项会被按照其类型被分门别类地放置。在左侧导航区域中点击某个大类，右侧面板便会显示相关的设置选项。你也可以直接按名称搜索某个选项。

你可以将项目设置导出为备份文件，存放在你的计算机中，也可以通过文件导入项目设置，方法是点击"项目设置（Project Settings）"窗口右上角的 **导出（Export）** 或 **导入（Import）** 。

每次更改"项目设置（Project Settings）"中的某个设置时，编辑器的 `.ini` 文件都会更新，其中的值会被应用到所有平台。编辑器的 `.ini` 文件位于 `<ProjectDirectory>\Config\DefaultEngine.ini` 。

平台 `.ini` 文件必须在文本编辑器中手动编辑，并且仅影响对应的平台。平台 `.ini` 文件的示例路径： `<ProjectDirectory>\Config\Windows\WindowsEngine.ini`

"项目设置（Project Settings）"窗口包含以下分段和类别：

[

![项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5110fda8-f0c6-473d-beae-b5062fcb9292/project-settings-topic-image.png)

项目

虚幻引擎项目设置的项目分段的参考。





](/documentation/zh-cn/unreal-engine/project-section-of-the-unreal-engine-project-settings)[

![游戏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/529ba9b0-11ee-48bd-adbd-0d9273165403/game-settings-topic.png)

游戏

虚幻引擎项目设置





](/documentation/zh-cn/unreal-engine/game-section-of-the-unreal-engine-project-settings)[

![引擎](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e250011b-dd26-4991-bdfa-91616739e030/project-settings-topic-image.png)

引擎

虚幻引擎项目设置的





](/documentation/zh-cn/unreal-engine/engine-settings-in-the-unreal-engine-project-settings)[

![Editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e1fe6e5-025f-4ff2-95ef-211b58513c8e/project-settings-topic-image.png)

Editor

虚幻引擎项目设置的





](/documentation/zh-cn/unreal-engine/editor-section-of-the-unreal-engine-project-settings)[

![平台](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ebc394b1-29ea-4161-9bf9-60b8b2fd2189/project-settings-topic-image.png)

平台

虚幻引擎项目设置的平台分段的参考。





](/documentation/zh-cn/unreal-engine/platforms-section-of-the-unreal-engine-project-settings)[

![插件设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fe8b7f0-74c1-4789-8ae8-8201c07d30ae/plugins-settings-topic.png)

插件设置

虚幻引擎项目设置的插件分段的参考。





](/documentation/zh-cn/unreal-engine/plugins-section-of-the-unreal-engine-project-settings)

-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问项目设置](/documentation/zh-cn/unreal-engine/project-settings-in-unreal-engine#%E8%AE%BF%E9%97%AE%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [类别和分段](/documentation/zh-cn/unreal-engine/project-settings-in-unreal-engine#%E7%B1%BB%E5%88%AB%E5%92%8C%E5%88%86%E6%AE%B5)