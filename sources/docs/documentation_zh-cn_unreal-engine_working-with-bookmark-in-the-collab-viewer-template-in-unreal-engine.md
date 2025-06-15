# 在虚幻引擎协作查看器（Collab Viewer）模板中使用书签 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/working-with-bookmark-in-the-collab-viewer-template-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:43:00.174Z

---

目录

![在协作查看器（Collab Viewer）模板中使用书签](https://dev.epicgames.com/community/api/documentation/image/90fd6a03-af8e-494e-8d6e-3e037b3bbc8c?resizing_type=fill&width=1920&height=335)

协作查看器（Collab Viewer）提供了 **BP\_Bookmark** 内置型蓝图资源，用于在关卡中设置预先确定的位置和摄像机视图。用户可以在运行时轻松传送到这些预先确定的位置。

本页介绍如何在关卡中放置新书签，如何设置热键，用户按下键盘数字键后即可在不同书签之间传送。

## 放置书签

可以在关卡任意位置放置新书签。不过，建议让每个新书签都满足以下条件：

-   位于地面上。
-   位于设有碰撞网格体的静态网格体上方，如[向协作查看器添加自己的内容](/documentation/zh-cn/unreal-engine/adding-your-own-content-to-the-collab-viewer-in-unreal-engine)中所示。

否则，用户在行走模式或VR中可能会在传送后跌倒在地或穿入地面。

### 步骤

要放置书签，请执行以下操作：

1.  在关卡中，每个书签由 **BP\_Bookmark** 蓝图类实例表示。可在 **内容浏览器** 的 *CollaborativeViewer/Blueprints/Commands/Bookmark* 文件夹中找到此类。
    
    ![BP_Bookmark资源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c9b8998-2e7c-42eb-9cd2-0c931e947d51/collabviewer-bookmark-asset.png "BP_Bookmark Asset")
2.  要设置新书签，将 **BP\_Bookmark** 从 **内容浏览器** 拖到关卡中。
    
    ![将书签拖入关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9ac653e-b38f-4c0e-8e47-2457ff7d95d1/collabviewer-bookmark-place.png "Drag a Bookmark into the Level")
3.  在视口或 **世界大纲视图** 中选中书签Actor，将其移至关卡中所需位置并旋转至所需角度。
    
    必须移动书签Actor，不能只移动子摄像机组件。
    
    **导航** Actor可简便快捷地设置视点。参阅[在视口中导航Actor](/documentation/zh-cn/unreal-engine/using-editor-viewports-in-unreal-engine)。
    
4.  在 **细节（Details）** 面板中，在 **~书签（~ Bookmarks）** 部分找到 **热键（Hotkey）** 设置，设置要指定给新书签的热键。  
    可以在 **热键（Hotkey）** 域中直接输入要指定的数字，也可以用 **指定未使用热键（Assign Unused Hotkey）** 按钮为书签指定可用的最小数字键。
    
    ![BP_Bookmark热键设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c7be014-45a9-4896-aa29-88f178ab7923/collabviewer-bookmark-hotkey.png "BP_Bookmark Hotkey setting")

### 最终结果

若以桌面模式加入会话，用户可以按指定热键或使用工具栏中的书签（Bookmarks）菜单或交互菜单（Interaction Menu）中的 **书签（Bookmark）** 项传送到书签位置。

另可参阅[与协作查看器模板交互](/documentation/zh-cn/unreal-engine/interacting-with-the-collab-viewer-in-unreal-engine)。

## 在会话期间保存书签

在Collab Viewer的会话期间，你可以将当前位置记录为一个新书签。之后该书签会作为一个选项出现在书签菜单列表中。它将被保存并在重新加载时可用。

保存书签：

1.  移动到你想保存书签的位置。
    
2.  打开 **交互（Interaction）** 菜单，并选择 **书签（Bookmark）**。
    
3.  在 **书签（Bookmark）** 菜单中，选择**创建书签**。
    
    ![在交互菜单中创建书签](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7fa0264-050a-402e-acfa-630bdf8fbf30/create-bookmark-1.png)
4.  命名你的新书签，然后点击 **+添加** 按钮。
    
    ![命名并保存书签](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da0c0e1a-9b2f-4a2a-ab27-cb6a03760de8/create-bookmark-2.png)
5.  你可以点击 **创建书签（Create Bookmark）** 菜单中已保存书签旁的 **垃圾箱（bin）** 图标来删除已保存的书签。
    

-   [collaboration](https://dev.epicgames.com/community/search?query=collaboration)
-   [templates](https://dev.epicgames.com/community/search?query=templates)
-   [collab viewer](https://dev.epicgames.com/community/search?query=collab%20viewer)
-   [design review](https://dev.epicgames.com/community/search?query=design%20review)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [放置书签](/documentation/zh-cn/unreal-engine/working-with-bookmark-in-the-collab-viewer-template-in-unreal-engine#%E6%94%BE%E7%BD%AE%E4%B9%A6%E7%AD%BE)
-   [步骤](/documentation/zh-cn/unreal-engine/working-with-bookmark-in-the-collab-viewer-template-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/working-with-bookmark-in-the-collab-viewer-template-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [在会话期间保存书签](/documentation/zh-cn/unreal-engine/working-with-bookmark-in-the-collab-viewer-template-in-unreal-engine#%E5%9C%A8%E4%BC%9A%E8%AF%9D%E6%9C%9F%E9%97%B4%E4%BF%9D%E5%AD%98%E4%B9%A6%E7%AD%BE)