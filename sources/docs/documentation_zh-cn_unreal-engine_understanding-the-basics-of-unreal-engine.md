# 理解虚幻引擎的基础知识 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/understanding-the-basics-of-unreal-engine
> 
> 生成时间: 2025-06-14T18:51:39.470Z

---

目录

![理解基础知识](https://dev.epicgames.com/community/api/documentation/image/a9064321-8b99-484a-b133-0f89178eaa51?resizing_type=fill&width=1920&height=335)

本节介绍了 **虚幻引擎5** （UE5）及其工具的基础知识。如果你刚接触UE5，建议你先熟悉虚幻编辑器的界面、蓝图可视化脚本，以及虚幻项目中有哪些内容可供你使用。

请参阅下述章节，了解你可以学习哪些UE5技能。

## 安装虚幻引擎

了解如何下载和安装虚幻引擎，熟悉Windows、macOS和Linux对于虚幻引擎5的系统要求。

%understanding-the-basics/installing-unreal-engine:Topic%

%understanding-the-basics/installing-unreal-engine/hardware-software-specifications:Topic%

## 基础知识

熟悉虚幻编辑器界面的主要组成部分、各类工具和子编辑器，以及一些常见的虚幻引擎术语。

[

![虚幻编辑器界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93471142-30c4-4bbb-9477-4d1560bce475/interface-thumbnail.jpg)

虚幻编辑器界面

虚幻编辑器界面关键元素的概述





](/documentation/zh-cn/unreal-engine/unreal-editor-interface)[

![虚幻引擎术语](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3ab43cb-6130-49a1-90fc-1314d43385ac/placeholder_topic.png)

虚幻引擎术语

介绍虚幻引擎中的最常用术语





](/documentation/zh-cn/unreal-engine/unreal-engine-terminology)[

![工具和编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11c1b49f-f7d8-44f3-b101-d0bb5a2d4a45/tools-and-editors_topic.png)

工具和编辑器

虚幻引擎5中包含的不同类型编辑器的概览。





](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine)[

![坐标系与坐标空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac8f8995-e35d-449c-a79e-3a1b60f53f8c/coordinate-topic.png)

坐标系与坐标空间

介绍坐标系与不同的坐标空间。





](/documentation/zh-cn/unreal-engine/coordinate-system-and-spaces-in-unreal-engine)[

![目录结构](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4919553d-0736-4708-9adc-fca75da3c172/placeholder_topic.png)

目录结构

介绍引擎和游戏项目的目录结构。





](/documentation/zh-cn/unreal-engine/unreal-engine-directory-structure)

## 内容浏览器

了解如何在 **内容浏览器（Content Browser）** 中使用资产；它是虚幻编辑器中用于创建、导入、组织、查看和管理内容的主要区域。

[](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)

[![内容浏览器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/133ace36-135f-4673-9d72-c841fdb16066/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)

[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)

[一种你可以用于查看、管理和处理项目中所有资产的工具。](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)

[

![内容浏览器界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97160233-5e7c-450f-aa4e-444c5c65824a/placeholder_topic.png)

内容浏览器界面

介绍内容浏览器界面和功能。





](/documentation/zh-cn/unreal-engine/content-browser-interface-in-unreal-engine)[

![开发者文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/daf0d528-7930-48f7-830a-ca33448ec52e/placeholder_topic.png)

开发者文件夹

使用开发者文件夹进行迭代并与其他开发者协作。





](/documentation/zh-cn/unreal-engine/developers-folder-in-unreal-engine)[

![源面板参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f22f3aa3-9e0e-4382-b3c6-7e4946aef08c/placeholder_topic.png)

源面板参考

在内容浏览器中使用源面板的参考





](/documentation/zh-cn/unreal-engine/sources-panel-reference-in-unreal-engine)[

![内容浏览器设置参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12882f6a-d1f3-44e2-8afe-cf46eb4faa1d/placeholder_topic.png)

内容浏览器设置参考

调整内容浏览器的缩略图显示、资产筛选以及其他方面。





](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine)[

![筛选器和集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d05d346-4fe0-4d3d-a1fc-14311ccca26b/placeholder_topic.png)

筛选器和集合

使用筛选器和集合在内容浏览器中对资产进行排序和分组。





](/documentation/zh-cn/unreal-engine/filters-and-collections-in-unreal-engine)[

![高级搜索语法](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/649e4267-b0ab-4241-9c4e-8df692e1922a/advanced-search-content-browser.png)

高级搜索语法

介绍在内容浏览器中可以使用的高级搜索运算符。





](/documentation/zh-cn/unreal-engine/advanced-search-syntax-in-unreal-engine)

## 自定义虚幻引擎

自定义虚幻引擎的布局、键盘绑定和行为，学习如何通过启用插件来添加一些实用功能。

[

![使用插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce60b980-6db7-49f9-adba-439a2c874282/topic_working-with-plugins.png)

使用插件

在虚幻引擎中安装、启用和禁用插件





](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)[

![自定义按键快捷键](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ceda184d-738c-4991-9c01-97f98994cb49/placeholder_topic.png)

自定义按键快捷键

介绍如何调整虚幻引擎中常用命令的快捷键，创建新的快捷键以便适应你的使用习惯。





](/documentation/zh-cn/unreal-engine/customizing-keyboard-shortcuts-in-unreal-engine)[

![编辑器偏好设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58939c46-bcea-41d9-b9c6-d33ebff3d5a7/preferences_thumb.png)

编辑器偏好设置

用于配置控件、视口、源码管理等通用编辑器行为的选项。





](/documentation/zh-cn/unreal-engine/unreal-editor-preferences)

## 使用虚幻项目和模板工作

了解如何使用虚幻项目，这些项目存放着你在虚幻引擎中构建的任何内容。你还可以阅读虚幻引擎提供的两个基本项目模板，它们可以作为第一人称或第三人称体验的起点。

[](/documentation/zh-cn/unreal-engine/working-with-projects-and-templates-in-unreal-engine)

[![使用项目和模板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0eeb2804-a658-4972-a4cd-b137f1c2e56c/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/working-with-projects-and-templates-in-unreal-engine)

[使用项目和模板](/documentation/zh-cn/unreal-engine/working-with-projects-and-templates-in-unreal-engine)

[介绍如何创建和管理虚幻引擎项目、使用模板作为起始点以及创建自定义模板。](/documentation/zh-cn/unreal-engine/working-with-projects-and-templates-in-unreal-engine)

[

![新建项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37da7fb6-c9e5-4b8b-a0e5-66d4f82f5fc7/topic_creating-new-project.png)

新建项目

介绍如何在虚幻引擎中创建并配置新项目。





](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)[

![打开现有项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c2ed96e-80a4-4811-8b2c-efadaf2c351e/topic-opening-an-existing-project.png)

打开现有项目

介绍如何访问和打开虚幻引擎中的现有项目。





](/documentation/zh-cn/unreal-engine/opening-an-existing-unreal-engine-project)[

![模板参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c00c3228-61d9-46fa-8406-bc627006312c/template-reference-topic-image.png)

模板参考

虚幻引擎中的模板与模板的用法





](/documentation/zh-cn/unreal-engine/unreal-engine-templates-reference)[

![升级项目以兼容新版虚幻引擎](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f36a45a-ccc2-4d86-b7ae-11f73b24d0ad/placeholder_topic.png)

升级项目以兼容新版虚幻引擎

了解如何升级项目以兼容新版虚幻引擎。





](/documentation/zh-cn/unreal-engine/updating-projects-to-newer-versions-of-unreal-engine)[

![恢复中心](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc1bb72d-2a4d-443c-9725-0402c1d999e5/placeholder_topic.png)

恢复中心

此插件可在编辑器崩溃或异常退出后帮助恢复虚幻引擎会话。





](/documentation/zh-cn/unreal-engine/recovery-hub-in-unreal-engine)[

![创建自定义模板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b20a27e0-bb89-4cfc-a615-00f0e0349383/topic-converting-project-to-template.png)

创建自定义模板

将已有的项目转换为模板所需的步骤





](/documentation/zh-cn/unreal-engine/converting-a-project-to-an-unreal-engine-template)

## 关卡

关卡（即地图）包含了玩家可以看到并与之交互的所有对象，比如场景、可使用的物体、其他角色等。每个虚幻引擎项目中至少包含一个关卡。在下述页面中阅读更多关于如何创建和管理关卡的内容。

[

![使用关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26c3a383-532c-4ca4-82f0-339134d7ebdf/level_topic.png)

使用关卡

如何创建、保存和打开关卡资产。





](/documentation/zh-cn/unreal-engine/working-with-levels-in-unreal-engine)[

![管理多个关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19c8502d-f739-4c2a-ad65-e00771ccac97/ue5-social.png)

管理多个关卡

使用关卡窗口管理持久关卡和子关卡





](/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine)[

![World Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b35e3dfc-ce35-4313-bfdb-5e46fe6e8263/world-settings-topic.png)

World Settings

The World Settings panel is where you set and override Level-specific settings.





](/documentation/en-us/unreal-engine/world-settings-in-unreal-engine)[

![更改默认关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10e70ee0-8deb-4459-a1fe-87e89c019846/placeholder_topic.png)

更改默认关卡

介绍如何设置项目的默认游戏关卡。





](/documentation/zh-cn/unreal-engine/changing-the-default-level-of-an-unreal-engine-project)

## 资产与内容包

虚幻引擎项目中的所有内容都属于某种资产。请参阅下述页面，了解资产的使用详情。

[

![直接导入资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b9f6365-6037-4eae-9fd8-d86b094ded0a/topic-importing-assets-directly.png)

直接导入资产

介绍了将一小组资产导入到虚幻引擎项目中的两种方法。





](/documentation/zh-cn/unreal-engine/importing-assets-directly-into-unreal-engine)[

![使用资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10d12658-de58-4518-9ad8-ca11ae3eaf0c/topic-working-with-assets.png)

使用资产

如何从内容浏览器创建、删除和管理资产。





](/documentation/zh-cn/unreal-engine/working-with-assets-in-unreal-engine)[

![迁移资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5ce001c-7a43-4d78-8a97-1915e02e8ed8/topic-migrating-assets.png)

迁移资产

如何将资产从一个项目复制到另一个项目。





](/documentation/zh-cn/unreal-engine/migrating-assets-in-unreal-engine)[

![资产元数据](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97f2053b-2b26-4c64-87f1-266c97787f4e/asset-metadata-banner.png)

资产元数据

介绍如何为虚幻引擎的资产创建、读取和修改元数据。





](/documentation/zh-cn/unreal-engine/asset-metadata-in-unreal-engine)[

![自动重新导入资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca219ab1-1896-41ae-bfab-95e9f21056db/topic-reimporting-assets-automatically.png)

自动重新导入资产

本文介绍了UE4的自动重新导入功能，并介绍如何最大限度地利用此功能。





](/documentation/zh-cn/unreal-engine/reimporting-assets-automatically-in-unreal-engine)[

![查找资产引用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f13c04aa-9b4b-4226-9202-24879ea67649/topic-finding-asset-references.png)

查找资产引用

介绍内容浏览器中的





](/documentation/zh-cn/unreal-engine/reference-viewer-in-unreal-engine)[

![替换引用工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a605cfd3-8bf0-47e4-95d2-d1b88fc1c486/topic-consolidating-assets.png)

替换引用工具

通过将多个资产合并成单个资产并修复引用来删除重复资产的工具。





](/documentation/zh-cn/unreal-engine/consolidating-assets-in-unreal-engine)[

![类查看器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91f27949-2b5e-4b2e-b7f5-ede02a9ee307/topic-class-viewer.png)

类查看器

用于查看虚幻引擎类和创建子类的工具。





](/documentation/zh-cn/unreal-engine/class-viewer-in-unreal-engine)[

![全局资产选取器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/795a36ba-3690-4c69-81ca-c0b120a247c3/placeholder_topic.png)

全局资产选取器

使用全局资产选取器快速找到资产树中任何文件夹中的资产。





](/documentation/zh-cn/unreal-engine/global-asset-picker-in-unreal-engine)[

![属性矩阵](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fab26b8f-bd3b-4b06-ad5c-ec90a39ceec1/topic-image.png)

属性矩阵

用于同时查看和编辑多个Actor的多个属性的工具。





](/documentation/zh-cn/unreal-engine/property-matrix-in-unreal-engine)

## Actor和组件

在更细化的角度来看，虚幻项目由许许多多Actor（相当于各个独立内容单元）构成，这些Actor又绑定着一个或多个组件。下述页面能告诉你关于Actor和组件的更多详情。

[](/documentation/zh-cn/unreal-engine/actors-and-geometry-in-unreal-engine)

[![Actor和几何体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0edf0358-c25c-4cad-88cf-3019f55118d8/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/actors-and-geometry-in-unreal-engine)

[Actor和几何体](/documentation/zh-cn/unreal-engine/actors-and-geometry-in-unreal-engine)

[定义Actor并介绍如何在关卡设计中使用它们，并列出了最常用的Actor类型。](/documentation/zh-cn/unreal-engine/actors-and-geometry-in-unreal-engine)

[

![放置Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e80ec1d-34ba-4f46-a632-64972c170605/placeholder_topic.png)

放置Actor

展示如何在关卡中放置道具、光源和摄像机等Actor





](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)[

![选择Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5f211d0-6f00-41d8-9015-f0633a39a553/placeholder_topic.png)

选择Actor

概述用于在关卡编辑器视口中选择Actor的方法。





](/documentation/zh-cn/unreal-engine/selecting-actors-in-unreal-engine)[

![变换Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9353ad5a-0f97-48dd-b50a-1a4cc8756a30/placeholder_topic.png)

变换Actor

如何调整关卡中Actor的位置、旋转和缩放。





](/documentation/zh-cn/unreal-engine/transforming-actors-in-unreal-engine)[

![Actor对齐](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90eff11d-9215-47b9-a35d-41365e409a3c/topic-image.png)

Actor对齐

介绍虚幻引擎中的Actor对齐。





](/documentation/zh-cn/unreal-engine/actor-snapping-in-unreal-engine)[

![Actor移动性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f26fb8d0-1132-4e6b-aeac-532ad6e22d32/placeholder_topic.png)

Actor移动性

该设置可控制Actor在Gameplay期间是否能够以某种方式移动或变化。





](/documentation/zh-cn/unreal-engine/actor-mobility-in-unreal-engine)[

![Actor分组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20164be9-adf6-4157-bc7c-eb8a31bdd8c6/actorgrouping_topic.png)

Actor分组

如何在虚幻引擎中创建和处理Actor组。





](/documentation/zh-cn/unreal-engine/grouping-actors-in-unreal-engine)[

![合并Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c84c560-458c-47dd-9c70-4de3c4effbf4/placeholder_topic.png)

合并Actor

如何在虚幻引擎中将两个或更多静态网格体Actor合并为单个Actor。





](/documentation/zh-cn/unreal-engine/merging-actors-in-unreal-engine)[

![Actor参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa50511a-f8d5-42e5-9dc5-1128ce0cceed/placeholder_topic.png)

Actor参考

介绍虚幻引擎中最常用Actor的作用，以及你可在哪里进一步了解相关信息。





](/documentation/zh-cn/unreal-engine/unreal-engine-actors-reference)[

![基础组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4266964e-20f0-4d0d-b4fc-42fe581a86df/components_topic.png)

基础组件

介绍虚幻引擎中最常见的组件，并介绍相关学习资源。





](/documentation/zh-cn/unreal-engine/basic-components-in-unreal-engine)

## 运行和模拟

了解如何在虚幻编辑器中直接测试你的内容。

[](/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine)

[![运行和模拟](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b10ee72-f9fc-4135-8030-366605b4187a/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine)

[运行和模拟](/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine)

[在虚幻编辑器中运行测试和模拟游戏。](/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine)

## 构建你的应用

为不同平台打包应用。

%understanding-the-basics/packaging-projects:Topic%

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [安装虚幻引擎](/documentation/zh-cn/unreal-engine/understanding-the-basics-of-unreal-engine#%E5%AE%89%E8%A3%85%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)
-   [基础知识](/documentation/zh-cn/unreal-engine/understanding-the-basics-of-unreal-engine#%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86)
-   [内容浏览器](/documentation/zh-cn/unreal-engine/understanding-the-basics-of-unreal-engine#%E5%86%85%E5%AE%B9%E6%B5%8F%E8%A7%88%E5%99%A8)
-   [自定义虚幻引擎](/documentation/zh-cn/unreal-engine/understanding-the-basics-of-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)
-   [使用虚幻项目和模板工作](/documentation/zh-cn/unreal-engine/understanding-the-basics-of-unreal-engine#%E4%BD%BF%E7%94%A8%E8%99%9A%E5%B9%BB%E9%A1%B9%E7%9B%AE%E5%92%8C%E6%A8%A1%E6%9D%BF%E5%B7%A5%E4%BD%9C)
-   [关卡](/documentation/zh-cn/unreal-engine/understanding-the-basics-of-unreal-engine#%E5%85%B3%E5%8D%A1)
-   [资产与内容包](/documentation/zh-cn/unreal-engine/understanding-the-basics-of-unreal-engine#%E8%B5%84%E4%BA%A7%E4%B8%8E%E5%86%85%E5%AE%B9%E5%8C%85)
-   [Actor和组件](/documentation/zh-cn/unreal-engine/understanding-the-basics-of-unreal-engine#actor%E5%92%8C%E7%BB%84%E4%BB%B6)
-   [运行和模拟](/documentation/zh-cn/unreal-engine/understanding-the-basics-of-unreal-engine#%E8%BF%90%E8%A1%8C%E5%92%8C%E6%A8%A1%E6%8B%9F)
-   [构建你的应用](/documentation/zh-cn/unreal-engine/understanding-the-basics-of-unreal-engine#%E6%9E%84%E5%BB%BA%E4%BD%A0%E7%9A%84%E5%BA%94%E7%94%A8)