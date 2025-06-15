# 虚幻引擎中的Actor编辑器上下文 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/actor-editor-context-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:19:59.643Z

---

目录

![Actor编辑器上下文](https://dev.epicgames.com/community/api/documentation/image/b189d344-915c-4737-9c3e-f50ca64ce788?resizing_type=fill&width=1920&height=335)

**Actor编辑器上下文（Actor Editor Context）** 是一种编辑器功能，可用于将[关卡](/documentation/zh-cn/unreal-engine/levels-in-unreal-engine)、[数据层](/documentation/zh-cn/unreal-engine/world-partition---data-layers-in-unreal-engine)、[关卡实例](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine), or [大纲视图Actor文件夹](/documentation/zh-cn/unreal-engine/outliner-in-unreal-engine)设置为 **当前编辑器上下文**。设置为当前上下文时，你添加到视口的所有Actor都会分配到当前上下文。 若分配当前Actor编辑器上下文，将在添加大量Actor时自动将它们分配到指定上下文，这有助于让你的世界保持井然有序，例如将一个环境中的所有树保持在树大纲视图文件夹中，并将其分配到树数据层。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fad1b58e-bf3f-4792-b058-960e5868f608/trees-folder-data-layer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fad1b58e-bf3f-4792-b058-960e5868f608/trees-folder-data-layer.png)

设置到树数据层和树Actor文件夹的Actor编辑器上下文。点击查看大图。

视口右下角的一个控件可显示当前处于活动状态的关卡、关卡实例、数据层或Actor文件夹。

## 设置当前上下文

### 当前关卡

在不使用[世界分区](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)的世界中，知道你在哪个关卡中工作是子关卡工作流程不可或缺的一环。使用"关卡（Levels）"窗口将子关卡添加到你的关卡之后，Actor编辑器上下文将显示当前关卡：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/096bcd0e-1234-468b-9e4c-415149465434/current-sublevel-window.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/096bcd0e-1234-468b-9e4c-415149465434/current-sublevel-window.png)

显示带有一个名为SubLevel的子关卡的持久关卡的关卡窗口。点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76c4d940-8121-4081-b54f-fb879a5b68f0/current-sublevel.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76c4d940-8121-4081-b54f-fb879a5b68f0/current-sublevel.png)

将SubLevel显示为当前关卡的Actor编辑器上下文。点击查看大图。

使用Actor编辑器上下文控件中的下拉菜单，你可以指定当前关卡。你添加到视口的所有Actor都会分配到该关卡。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd23222b-a731-4ad0-afd3-b78d4780a6e3/current-sublevel-select.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd23222b-a731-4ad0-afd3-b78d4780a6e3/current-sublevel-select.png)

点击下拉菜单更改当前关卡。

### 当前关卡实例

关卡实例化是基于关卡的工作流程，用于创建预制 **关卡实例（Level Instances）** ，你可以多次将其放入你的世界。编辑关卡实例时，虚幻引擎会创建新的空上下文，并且Actor编辑器上下文会显示当前关卡实例：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30e95593-3332-4116-ad8d-0f80a370ebd2/current-level-instance.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30e95593-3332-4116-ad8d-0f80a370ebd2/current-level-instance.png)

显示当前打开的关卡实例的Actor编辑器上下文。点击查看大图。

你添加到视口的所有Actor都会分配到当前打开的关卡实例。将更改提交到关卡实例时，编辑器会将你返回到之前的Actor编辑器上下文。

### 当前数据层

数据层会在编辑器中以及在运行时控制Actor的加载和卸载。不同于关卡，Actor可以分配到多个数据层。 要设置一个或多个当前数据层：

1.根据需要选择 **窗口（Window）> 世界分区（World Partition）> 数据层大纲视图（Data Layer Outliner）** ，打开 **数据层大纲视图（Data Layer Outliner）** 。 1.右键点击你想设为当前值的数据层，并选择 **设为当前数据层（Make Current Data Layer (s)）** 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b561a26-fc0d-43c6-990e-fb49b942d776/current-data-layer-outliner.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b561a26-fc0d-43c6-990e-fb49b942d776/current-data-layer-outliner.png)

显示设为当前值的树数据层的数据层大纲视图。

这样会将所选数据层添加到当前上下文。其名称和分配的调试颜色现在显示在Actor编辑器上下文控件中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45d7b2a6-bb6f-4ec2-8f34-1774d13f2c79/current-data-layer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45d7b2a6-bb6f-4ec2-8f34-1774d13f2c79/current-data-layer.png)

Actor编辑器上下文控件将树显示为当前数据层。点击查看大图。

你添加到视口的所有Actor都会分配到当前数据层。要清除当前数据层上下文，请右键点击数据层大纲视图，然后选择 **清除当前数据层（Clear Current Data Layer(s)）** ，或点击Actor编辑器上下文控件的该分段中的 **X** 按钮。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e3560ad-7500-47e9-9e6c-3a23387b2379/clear-data-layer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e3560ad-7500-47e9-9e6c-3a23387b2379/clear-data-layer.png)

点击Actor编辑器上下文控件中的X按钮以清除当前数据层。

### 当前Actor文件夹

与数据层的操作相似，你还可以在大纲视图中分配当前Actor文件夹。 要设置当前Actor文件夹：

1.  根据需要，选择 **窗口（Window）> 大纲视图（Outliner）** ，然后选择四个大纲视图实例之一，以打开 **大纲视图（Outliner）** 。
2.  右键点击你想设为当前值的文件夹，然后从上下文菜单选择 **设为当前文件夹（Make Current Folder）** 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/174aebcd-f2fb-46a1-b799-c3c0e1e302a1/clear-actor-folder-outliner.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/174aebcd-f2fb-46a1-b799-c3c0e1e302a1/clear-actor-folder-outliner.png)

将树显示为当前Actor文件夹的大纲视图。

这样会将所选文件夹添加到当前上下文。其名称现在显示在Actor编辑器上下文控件中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df70c3e4-b709-46d8-9017-0ec247e9dac2/current-actor-folder.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df70c3e4-b709-46d8-9017-0ec247e9dac2/current-actor-folder.png)

将树显示为当前Actor文件夹的Actor编辑器上下文控件。点击查看大图。

你添加到视口的所有Actor都会分配到当前Actor文件夹。要清除此上下文，请右键点击大纲视图，然后选择 **清除当前文件夹（Clear Current Folder）** ，或点击Actor编辑器上下文控件的该分段中的 **X** 按钮。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94989da8-4125-4926-b712-6ec27169d7c4/clear-actor-folder.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94989da8-4125-4926-b712-6ec27169d7c4/clear-actor-folder.png)

点击Actor编辑器上下文控件中的X按钮，即可清除当前Actor文件夹。

## 在视口中切换Actor编辑器上下文

Actor编辑器上下文控件默认启用。要将其禁用，请执行以下步骤：

1.  点击视口左上角的 **视口选项（Viewport Options）** 按钮，然后选择 **高级设置（Advanced Settings）** 。这将打开 **编辑器偏好设置（Editor Preferences）** 窗口。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11fbdea3-744b-46f4-9f4f-f01c7fd4f04a/viewport-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11fbdea3-744b-46f4-9f4f-f01c7fd4f04a/viewport-settings.png)
    
    点击"视口选项"按钮并选择底部的"高级设置"。
    
2.  找到 **关卡编辑器 - 视口（Level Editor - Viewports）** 设置的 **外观体验（Look and Feel）** 分段，取消勾选 **显示Actor编辑器上下文（Show Actor Editor Context）** 复选框。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57dabce9-bb5a-4462-bb13-8f4dea0c41ef/look-and-feel-toggle.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57dabce9-bb5a-4462-bb13-8f4dea0c41ef/look-and-feel-toggle.png)
    
    "关卡编辑器 - 视口"设置。点击查看大图。
    

-   [outliner](https://dev.epicgames.com/community/search?query=outliner)
-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [actor editor context](https://dev.epicgames.com/community/search?query=actor%20editor%20context)
-   [data layers](https://dev.epicgames.com/community/search?query=data%20layers)
-   [level instancing](https://dev.epicgames.com/community/search?query=level%20instancing)
-   [level editor](https://dev.epicgames.com/community/search?query=level%20editor)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置当前上下文](/documentation/zh-cn/unreal-engine/actor-editor-context-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%BD%93%E5%89%8D%E4%B8%8A%E4%B8%8B%E6%96%87)
-   [当前关卡](/documentation/zh-cn/unreal-engine/actor-editor-context-in-unreal-engine#%E5%BD%93%E5%89%8D%E5%85%B3%E5%8D%A1)
-   [当前关卡实例](/documentation/zh-cn/unreal-engine/actor-editor-context-in-unreal-engine#%E5%BD%93%E5%89%8D%E5%85%B3%E5%8D%A1%E5%AE%9E%E4%BE%8B)
-   [当前数据层](/documentation/zh-cn/unreal-engine/actor-editor-context-in-unreal-engine#%E5%BD%93%E5%89%8D%E6%95%B0%E6%8D%AE%E5%B1%82)
-   [当前Actor文件夹](/documentation/zh-cn/unreal-engine/actor-editor-context-in-unreal-engine#%E5%BD%93%E5%89%8Dactor%E6%96%87%E4%BB%B6%E5%A4%B9)
-   [在视口中切换Actor编辑器上下文](/documentation/zh-cn/unreal-engine/actor-editor-context-in-unreal-engine#%E5%9C%A8%E8%A7%86%E5%8F%A3%E4%B8%AD%E5%88%87%E6%8D%A2actor%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%8A%E4%B8%8B%E6%96%87)