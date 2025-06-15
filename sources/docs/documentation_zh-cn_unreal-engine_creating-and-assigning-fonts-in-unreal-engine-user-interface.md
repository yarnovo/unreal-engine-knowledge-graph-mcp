# 在虚幻引擎用户界面中创建和指定字体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-and-assigning-fonts-in-unreal-engine-user-interface
> 
> 生成时间: 2025-06-14T20:18:52.021Z

---

目录

![创建并指定字体](https://dev.epicgames.com/community/api/documentation/image/21cd9eaa-5287-4741-9342-dd9dc3b4888a?resizing_type=fill&width=1920&height=335)

在此指南中，您将了解如何创建空白字体资源（可对其指定字体风格资源，或直接使用字体编辑器导入新 TTF 或 OTF 字体文件）。

![Banner Image](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d47f1aa7-12e2-4b19-bb89-5d92598c79a9/ue5_1-creating-fonts-banner.png)

## 步骤

根据以下步骤自建字体资源，然后学习如何使用字体编辑器指定一个字体风格资源。

在此指南中，我们使用的是 **Blank Template**，未加入 **Starter Content**、选择默认 **Target Hardware** 和 **Project Settings**。

### 创建字体资源

1.  点击 **Content Browser** 中的 **Add New** 按钮，然后选择 **User Interface** 下的 **Font** 选项。
    
    ![Create a Font Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac0e8ed1-017a-46cb-8e35-2356889e9d93/ue5_1-01-add-font-asset.png "Create a Font Asset")
2.  将新建一个合成字体资源，并弹出提示为其 **命名**。
    
    ![Name a Font Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8b7beb1-cfc0-4fd2-b09b-23689c419c41/ue5_1-02-name-font-asset.png "Name a Font Asset")
3.  输入命名后，资源上将出现一个星号，说明资源尚未保存。点击 **Save All** 按钮保存资源，然后在弹出的菜单中确认保存。
    
    ![Click the Save All button to save your asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0690e37-1695-4afb-a8a9-f2a14cc47ac3/ue5_1-03-save-font-asset.png "Click the Save All button to save your asset")

### 指定字体风格资源

1.  创建空白字体资源后，便需要指定使用的字体风格。双击字体在字体编辑器中打开执行此操作。
    
    ![Open created Font Asset in Font Editor Window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d4f080c-d31c-4fcc-b06d-b0cd6a06ff0d/ue5_1-04-font-editor-window.png "Open created Font Asset in Font Editor Window")
2.  在字体编辑器中点击 **Add Font** 按钮新增一个字体槽。
    
    ![In the Font Editor add a new Font slot](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5e40869-bce0-44f3-9cc5-931273dfba20/ue5_1-05-click-add-font.png "In the Font Editor add a new Font slot")
3.  在字体编辑器中，为新添的字体插槽命名。
    
    ![Name added Font slot](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6917fcf1-67be-4aea-8933-b3b3db1fe73a/ue5_1-06-name-font-slot.png "Name added Font slot")
4.  使用字体命名下方的下拉选择选中已导入项目的字体风格资源。
    
    ![Use the dropdown selection to select an existing Font Face asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fad11943-eef0-4510-8528-2eb309699b30/ue5_1-07-assign-font-face.png "Use the dropdown selection to select an existing Font Face asset")
    
    如尚未拥有字体风格资源，可使用下拉选择框旁的文件夹图标寻找并导入您自己的 TrueType Font（TTF）或 OpenType Font（OTF）字体文件。
    

## 最终结果

现在，你已经掌握了如何自建字体资源，并在字体编辑器中将导入的字体风格资源指定给字体资产。你的字体资产将可以在 UMG UI 设计器中使用。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)
-   [fonts](https://dev.epicgames.com/community/search?query=fonts)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/creating-and-assigning-fonts-in-unreal-engine-user-interface#%E6%AD%A5%E9%AA%A4)
-   [创建字体资源](/documentation/zh-cn/unreal-engine/creating-and-assigning-fonts-in-unreal-engine-user-interface#%E5%88%9B%E5%BB%BA%E5%AD%97%E4%BD%93%E8%B5%84%E6%BA%90)
-   [指定字体风格资源](/documentation/zh-cn/unreal-engine/creating-and-assigning-fonts-in-unreal-engine-user-interface#%E6%8C%87%E5%AE%9A%E5%AD%97%E4%BD%93%E9%A3%8E%E6%A0%BC%E8%B5%84%E6%BA%90)
-   [最终结果](/documentation/zh-cn/unreal-engine/creating-and-assigning-fonts-in-unreal-engine-user-interface#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)