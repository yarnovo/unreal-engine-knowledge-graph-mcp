# 虚幻引擎关卡编辑器细节面板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/level-editor-details-panel-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:19:23.503Z

---

目录

![关卡编辑器细节面板](https://dev.epicgames.com/community/api/documentation/image/d02701c8-2445-4e62-bfd8-3d78d81d3923?resizing_type=fill&width=1920&height=335)

选择操作系统：

Windows macOS Linux

**细节（Details）** 面板包含特定于视口中的当前选项的信息、工具和函数。 它包含用于移动、旋转和缩放Actor的转换编辑框，显示选定Actor的所有可编辑属性， 并根据视口中选定Actor的类型提供对附加编辑功能的快速 访问。例如，可以将选定Actor导出到FBX并转换为另一种兼容类型。细节（Details） 面板还允许您查看选定Actor使用的材质（如有）并快速打开它们进行编辑。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4fc7e4d-6aed-495d-9fd4-6747808da0e0/01-level-editor-details-panel.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4fc7e4d-6aed-495d-9fd4-6747808da0e0/01-level-editor-details-panel.png)

点击查看大图。

## Actor名称

可以直接在编辑器中为Actor设置友好名称。可以使用这些名称访问相关Actor，也可以 使用 **[世界大纲视图（World Outliner）面板](/documentation/zh-cn/unreal-engine/outliner-in-unreal-engine)** 中的搜索功能找到它们。

要编辑Actor名称，只需在 **细节（Details）** 面板顶部的文本框中键入名称。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c56f4f3-86b8-4f43-83a9-135cc45d1958/02-actor-name-field.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c56f4f3-86b8-4f43-83a9-135cc45d1958/02-actor-name-field.png)

点击查看大图。

## 搜索过滤器

可以使用 **搜索细节（Search Details）** 框过滤细节面板中显示的属性。当您键入时，将自动过滤属性， 只显示与文本匹配的属性。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06dbeb1a-d98d-4e3e-b41b-72b207e85730/03-properties-filtered.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06dbeb1a-d98d-4e3e-b41b-72b207e85730/03-properties-filtered.png)

点击查看大图。

要清除过滤器，单击 **搜索（Search）** 框右侧的 ![Clear Search](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9b78282-4e77-4128-a481-864731c29d31/04-clear-search.png "Clear Search") 按钮。

因为此文本框数据隐藏了与搜索条件不匹配的所有属性， 所以如果没有看到要查找的属性，请检查以确保清除了这些细节。

## 收藏夹

该选项目前被认为是实验性的，一些功能可能不如预期有效。

如果Actor中有您经常更改或者想要快速访问的属性，您可以使用 **收藏夹（Favorites）** 属性来标记它们，以便它们显示在 **细节（Details）** 面板的顶部。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2ed36ca-242a-4664-a3a4-3bb5f99f49e2/05-favorites.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2ed36ca-242a-4664-a3a4-3bb5f99f49e2/05-favorites.png)

点击查看大图。

上面，我们选择了两个选项作为 收藏夹（Favorites），在它们的属性名旁边设置星号图标指示。

**启用收藏夹：**

1.  在 **编辑（Edit）** 菜单中，选择 **编辑器偏好设置（Editor Preferences）**。
    
    ![Main Menu Bar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65a73aa4-3f0f-49c7-bc71-d5a97b0cfe16/editorprefs.png "Main Menu Bar") ![Main Menu Bar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a38da002-3992-424f-a9fe-17603cb5fc87/editorprefs_mac.png)
2.  在 **试验性（Experimental）** 下，选中 **启用细节面板偏好（Enable Details Panel Favorites）** 选项。
    
    ![Experimental](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97570d33-2ccb-4c9c-a4c5-cd3ab61a8464/experimental.png "Experimental")

可能需要重启编辑器，才会应用所做更改。

**将属性标记为收藏夹：**

1.  启用此选项后，在任何细节（Details）面板中单击属性旁边的星号图标。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a8c711f-26ad-4883-bf32-829aadddcf3a/06-click-favorite.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a8c711f-26ad-4883-bf32-829aadddcf3a/06-click-favorite.png)
    
    点击查看大图。
    

由于自定义的复杂性，有些属性可能无法提供收藏它们的功能。

1.  该属性（以及所有其他标记的收藏夹）将列在面板的 **收藏夹（Favorites）** 部分下。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b47b8bb4-6178-4c6c-844c-787635f0b433/07-marked-favorites.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b47b8bb4-6178-4c6c-844c-787635f0b433/07-marked-favorites.png)
    
    点击查看大图。
    

## 默认值

当属性被修改为其默认值以外的值时，将显示一个指示器。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73b3daf6-3082-4049-8db6-c25d8906e2da/08-property-not-set-to-default.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73b3daf6-3082-4049-8db6-c25d8906e2da/08-property-not-set-to-default.png)

点击查看大图。

通过单击![重置为默认（Reset to Default）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5eada88c-f534-4c8c-909f-d42789a428d5/09-reset-to-default.png "Reset to Default") 指示器并从菜单中选择重置值， 可以将所有属性重置为默认值。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd533ce1-abec-424a-b81a-cdd9220995ca/10-reset-to-default-menu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd533ce1-abec-424a-b81a-cdd9220995ca/10-reset-to-default-menu.png)

点击查看大图。

属性的值被重置为默认值，如菜单所示，指示器不再存在。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d7976ef-8f9e-452b-93b0-0c475759f676/11-property-set-to-default.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d7976ef-8f9e-452b-93b0-0c475759f676/11-property-set-to-default.png)

点击查看大图。

## 编辑条件

可以启用或禁用属性。属性只有在启用后才能进行编辑。默认情况下， 所有属性都已启用，除非它们有编辑条件。有编辑条件的属性 依赖于另一个变量的值来确定它们是否启用、可否进行编辑。

在某些情况下，编辑条件用于确定属性是否会覆盖某些其他值，或者是否有 任何影响。其他时候，除非满足某些条件，否则某些属性可能根本没有意义。例如，您可能有 一组与间接光照有关的属性，以及一个能够全局切换是启用还用禁用间接光照的 "bool"属性。组中的每个属性都可以以全局切换为条件，以便只有在使用间接光照时才 启用它们。

有简单的编辑条件的属性将在左侧空白处显示一个复选框。当该复选框被选中时， 该属性将被启用。当未选中时，该属性将被禁用并显示为灰色。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdf8d12d-cc76-403c-a7d5-e91917b0a0c7/12-edit-consition-properties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdf8d12d-cc76-403c-a7d5-e91917b0a0c7/12-edit-consition-properties.png)

点击查看大图。

## EditConst属性

声明为"editconst"的属性（不能在编辑器中修改）显示它们的值，并高亮显示以表明它们不能编辑。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8666310e-321a-449e-995f-e5ef62861088/13-edit-const-property.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8666310e-321a-449e-995f-e5ef62861088/13-edit-const-property.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59854e67-7029-4cc5-8757-4cc235124630/14-edit-const-property-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59854e67-7029-4cc5-8757-4cc235124630/14-edit-const-property-1.png)

点击查看大图。

## 类别

在 **细节（Details）** 面板中，属性按类别显示。通常，诸如 **渲染（Rendering）**、**光照（Lighting）** 和 **碰撞（Collision）** 等类别由属性在代码中的声明方式决定，并用作将相关属性组织成组的一种方法。其他类别，诸如 **转换（Transform）**、**静态网格体（Static Mesh）**、**材质（Materials）**、**Actor**、**代码视图（Code View）** 和 **图层（Layers）**，则是自定义控件，专门设计用于公开某些属性或功能，使它们易于查找、修改或使用。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Actor名称](/documentation/zh-cn/unreal-engine/level-editor-details-panel-in-unreal-engine#actor%E5%90%8D%E7%A7%B0)
-   [搜索过滤器](/documentation/zh-cn/unreal-engine/level-editor-details-panel-in-unreal-engine#%E6%90%9C%E7%B4%A2%E8%BF%87%E6%BB%A4%E5%99%A8)
-   [收藏夹](/documentation/zh-cn/unreal-engine/level-editor-details-panel-in-unreal-engine#%E6%94%B6%E8%97%8F%E5%A4%B9)
-   [默认值](/documentation/zh-cn/unreal-engine/level-editor-details-panel-in-unreal-engine#%E9%BB%98%E8%AE%A4%E5%80%BC)
-   [编辑条件](/documentation/zh-cn/unreal-engine/level-editor-details-panel-in-unreal-engine#%E7%BC%96%E8%BE%91%E6%9D%A1%E4%BB%B6)
-   [EditConst属性](/documentation/zh-cn/unreal-engine/level-editor-details-panel-in-unreal-engine#editconst%E5%B1%9E%E6%80%A7)
-   [类别](/documentation/zh-cn/unreal-engine/level-editor-details-panel-in-unreal-engine#%E7%B1%BB%E5%88%AB)