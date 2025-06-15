# 在虚幻引擎中导入字体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/importing-fonts-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:18:58.200Z

---

目录

![导入字体](https://dev.epicgames.com/community/api/documentation/image/f890e170-9520-41fc-b9f7-675ebdcb6966?resizing_type=fill&width=1920&height=335)

此指南说明如何将自建字体文件导入 **虚幻引擎**。

![Banner Image](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85614972-f060-4fe6-ad83-827f1bc7e8fd/ue5_1-importing-fonts-banner.png "Banner Image")

开始导入文件后，可在多种方法中进行选择，选择最适合您工作流程的方法。可选择的导入方法：

-   使用 Content Browser 的 Import 按钮。
-   拖放到 Content Browser 中
-   使用字体编辑器

导入字体时还可以在 **TrueType Font**（TTF）和 **OpenType Font**（OTF）之间进行选择。选择最能满足您需求的导入方法和字体类型。

在此指南中，我们使用的是 **Blank Template**，未加入 **Starter Content**、选择默认 **Target Hardware** 和 **Project Settings**。

## 使用 Content Browser

可使用 Content Browser 的 **Import** 按钮选择 TTF 或 OTF 字体文件。

1.  在 Content Browser 中点击 **Import** 按钮。
    
    ![Click the Import button in the Content Browser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b6e9048-9bdd-41c1-9155-bcce63000d98/ue5_1-01-click-import.png "Click the Import button in the Content Browser")
2.  **Import** 对话框出现后，导航至需要导入的 TFF 或 OTF 字体文件并将其选中。然后点击 **Open**。
    
    ![Select Font in the Import dialog window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3285a160-aa7b-4743-bf0d-42fdb1c15eb5/ue5_1-02-select-font.png "Select Font in the Import dialog window")
3.  稍后将出现 **Font Face Import Options** 对话。从列出的选项中选择 **Yes**，在 Content Browser 中创建字体风格资源和合成字体资源。
    
    ![Select Yes in the Font Face Import Options dialog window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eefaf5aa-12b6-47d6-af1d-ab202130dbf4/ue5_1-03-import-option-window.png "Select Yes in the Font Face Import Options dialog window")
4.  现在即可在文件夹层级中找到字体风格资源。
    
    ![The imported Font Face asset in folder](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c270b86a-375e-4e46-8998-eef9a581095f/ue5_1-04-added-font-asset.png "The imported Font Face asset in folder")

## 使用拖放

用户可将 `TTF` 或 `OTF` 文件直接 **拖放** 到 Content Browser 中创建字体资源。

1.  导航到保存 `TTF` 或 `OTF` 文件的文件夹。选择并长按将文件拖到 **文件浏览器** 中，开始导入进程。
    
    ![Drag the file into the Content Browser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e122de8-29bb-45e0-8ca7-eb65dcbc3c1b/ue5_1-05-drag-font.png "Drag the file into the Content Browser")
2.  稍后将出现 **Font Import Options**。从列出的选项中选择 **Yes**，在 Content Browser 中创建字体风格资源和合成字体资源。
    
    ![Select Yes in the Font Face Import Options dialog window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ccc3c46d-e31d-43fd-be2b-833975a2ffa1/ue5_1-03-import-option-window.png "Select Yes in the Font Face Import Options dialog window")
3.  现在即可在文件夹层级中找到字体风格资源。
    
    ![The imported Font Face asset in folder](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37f8271a-0532-4ef6-a461-38e90f635a5e/ue5_1-04-added-font-asset.png "The imported Font Face asset in folder")

## 使用字体编辑器

用户可直接从 **字体编辑器** 中的 [默认字体群](/documentation/zh-cn/unreal-engine/font-asset-and-editor-in-unreal-engine#defaultfontfamily) 列表导入并创建字体风格资源， 无需先导入字体资源再对其进行指定。

1.  打开一个现有 **字体** 资源或使用 Content Browser 中的 **+Add New** 按钮。
    
    ![Click the Add button in the Content Browser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/246875a1-6003-4392-83fe-83d40b1d3ead/ue5_1-06-click-add.png "Click the Add button in the Content Browser")
2.  打开 **字体编辑器** 窗口。
    
    ![Font Editor window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/463de09d-4c29-4642-aaf5-c95d1adba092/ue5_1-07-font-editor-window.png "Font Editor window")
3.  点击 **Add Font** 按钮为 **默认字体群** 添加一个新的字体选项。
    
    ![Click the Add Font button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bb79846-3353-4512-b686-54c8b7a1be78/ue5_1-08-click-add-font.png "Click the Add Font button")
4.  选择选项下拉旁边的 **folder** 按钮。
    
    ![Select the **folder** button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f586048-3ddc-4ce1-bb29-923c4b08966c/ue5_1-09-name-and-browse.png "Select the **folder** button")
5.  **Import** 对话框出现后，导航至需要导入的 `TFF` 或 `OTF` 字体文件并将其选中。然后点击 **Open**。
    
    ![Select Font in the Import dialog window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93e496f3-43d9-48ba-a856-b8a7d9cab221/ue5_1-02-select-font.png "Select Font in the Import dialog window")
6.  之后将出现 **Save Font Face** 窗口。为字体命名，在游戏文件夹层级中选择相同路径。然后点击 **Save**。
    
    ![The Save Font Face window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/923348c6-aec2-4551-8828-70faa04355e6/ue5_1-10-save-font-window.png "The Save Font Face window")
7.  现在即可在文件夹层级中找到字体风格资源。
    
    ![The imported Font Face asset in folder](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69f34e62-f5f2-4642-bb9c-ab56abe9c7c7/ue5_1-04-added-font-asset.png "The imported Font Face asset in folder")

## 最终结果

了解如何使用多种方法进行导入后，即可使用这些选项将自建字体文件导入游戏和项目。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)
-   [fonts](https://dev.epicgames.com/community/search?query=fonts)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用 Content Browser](/documentation/zh-cn/unreal-engine/importing-fonts-in-unreal-engine#%E4%BD%BF%E7%94%A8contentbrowser)
-   [使用拖放](/documentation/zh-cn/unreal-engine/importing-fonts-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%8B%96%E6%94%BE)
-   [使用字体编辑器](/documentation/zh-cn/unreal-engine/importing-fonts-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%AD%97%E4%BD%93%E7%BC%96%E8%BE%91%E5%99%A8)
-   [最终结果](/documentation/zh-cn/unreal-engine/importing-fonts-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)