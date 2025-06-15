# 创建虚幻引擎中的蓝图类 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:50.821Z

---

目录

![创建蓝图类](https://dev.epicgames.com/community/api/documentation/image/2c398ccd-b4cc-4d1f-a5ec-db4e78e6e9f4?resizing_type=fill&width=1920&height=335)

可使用本文档中的提高任一方法，通过 **内容浏览器（Content Browser）** 或 **关卡编辑器（Level Editor）** 创建 **蓝图资产**。

## 通过内容浏览器创建

内容浏览器功能有一个专门的 **新增（Add New）** 按钮，用于在当前目录下新建蓝图资产。你也可以右键点击 **资产视图（Asset View）** 或 **资产树（Asset Tree）** 在选定位置创建蓝图资产。

### 使用新增按钮

1.  在 **内容浏览器（Content Browser）** 中，点击 **新增（Add New）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd00485b-136d-4cb9-ba4b-c44db3ffda64/contentbrowseraddnew.png)
2.  从下拉菜单的 **创建基本资产（Create Basic Asset）** 部分中选择 **蓝图类（Blueprint Class）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9afc6b4a-5344-460b-a361-dca0aaa6e858/contentbrowserdropdown.png)
    
    可通过 **创建高级资产（Create Advanced Asset）** 下的 **蓝图（Blueprints）** 选项来创建各种不同的[蓝图资产类型](/documentation/zh-cn/unreal-engine/types-of-blueprints-in-unreal-engine)。
    
3.  为蓝图资产选择 **父类（Parent Class）**。欲知更多信息，请参见[父类](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine#%E7%88%B6%E7%B1%BB)。
    
    ![选择父类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c3d6f5a-6e14-4027-a57c-a4e864cf4b36/new_asset_parent_class.png)

### 使用资产视图

1.  在 **内容浏览器（Content Browser）** 里的 **资产视图（Asset View）**（右侧面板） 里面右键点击，打开快捷菜单。
    
2.  在 **创建基础资产（Create Basic Asset\*）** 中选择新建 **蓝图类** 。
    
    ![New Asset menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2853653-586a-48c7-b4c8-5e7bec9ad61d/new_asset_blueprint_menu.png)
3.  为你的蓝图选择一个父类。
    
    ![Choose a Parent Class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7b2f68d-8c01-4152-9596-b473f99b7d6c/new_asset_parent_class.png)
    
    查看[父类](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine#%E7%88%B6%E7%B1%BB)页面来了解如何选择父类。
    

### 使用资产树

1.  在 **内容浏览器（Content Browser）** 上的 **资产树（Asset Tree）** （左侧面板）点击右键。
    
2.  在出现的快捷菜单中，选择 **新资产（New Asset）**，然后选择 **蓝图类（Blueprint Class\*）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fecb3499-9861-492d-9cfb-4e1ceeac5d9a/rtclick_content_browser_asset_tree.png)
3.  为你的蓝图选择一个父类。
    
    ![Choose a Parent Class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fde4072-3493-42c6-b843-d36a6c316c36/new_asset_parent_class.png)
    
    查看[父类](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine#%E7%88%B6%E7%B1%BB)页面来了解如何选择父类。
    

## 在关卡编辑器中创建

可通过关卡编辑器（Level Editor）中的一个或多个选定 **Actor** 创建 **蓝图资产（Blueprint Asset）**。创建的蓝图将包含Actor，并将保留在关卡编辑器（Level Editor）中做的所有Actor属性更改以及Actor之间的空间关系。此功能可将多Actor系统保存到单个可重复使用的资产中。

1.  在关卡编辑器（Level Editor）视口中选择一个或多个Actor。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6230bbb-2cdd-40f3-aff0-be9578d348c7/multiactorselection.png)
    
2.  在关卡编辑器（Level Editor）工具栏中，单击 **蓝图（Blueprint）** 下拉菜单，然后选择 **将选择转换为蓝图类（Convert Selection to Blueprint Class）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e3e7a14-b741-4535-b70a-998c85e20417/bpdropdownbutton.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a4d0289-2653-4c61-b870-1ca5bc82b275/convertselectiontobp.png)
    
    如果仅选择一个Actor，则 **细节（Details）** 面板中将显示 **蓝图/添加脚本（Blueprint/Add Script）** 按钮。由于从单个Actor创建蓝图资产所需的用户信息较少，因此可使用此按钮直接跳至[新子类](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine#newsubclass)菜单，以节省时间。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8763c789-642b-4bc3-8465-349c5731de1c/bpaddscriptbutton.png)
    
3.  此时，编辑器将提供三种从所选Actor创建新蓝图资产的方法：**新子类（New Subclass）**、**子Actor（Child Actors）** 和 **收获组件（Harvest Components）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d9adca2-707f-45ac-9281-1962a69b1fab/createbpfromselection.png)
    
4.  选择方法后，从窗口底部的列表中为新蓝图资产选择父Actor类。如果使用 **新子类（New Subclass）** 方法，则父类将进一步受限为所选Actor或其子类的类。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1efce58-c5be-41df-9bd9-8f0b600ff93b/parentclassselection.png)
    
5.  选择方法并选择父类后，新蓝图资产将显示在内容浏览器（Content Browser）中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bb2d0a4-9647-41c8-ae22-e9ab93e7e273/contentbrowserconvertedbp.png)
    

### 新子类

**新子类（New Subclass）** 仅在选定单个Actor时可用。此方法可将蓝图资产作为Actor子类或其任一子类创建，包含所做的任何Actor属性更改。这个方法最直接。蓝图资产将保留对选定Actor的属性进行的更改。

### 子Actor

**子Actor（Child Actors）** 方法基于任意Actor类创建蓝图资产。新Actor拥有默认组件，并且关卡编辑器（Level Editor）视口中的每个选定Actor有一个额外的 **子Actor组件（Child Actor Component）**。子Actor组件将保留对选定Actor属性进行的更改。

通常，由于此方法不会引入新行为或非必要组件，所以用户会选择基础Actor类。

### 收获组件

**收获组件（Harvest Components）** 方法基于任意Actor类创建单个蓝图资产（Blueprint Asset），然后收获所有选定Actor的组件，并将组件附加到新Actor。当Actor主要作为其组件的容器时，请使用此方法。举例而言，由于通常只会出现渲染和潜在碰撞这类行为，多个 **静态网格体Actor** 可有效地组合为拥有多个静态网格体组件的单个Actor。但是，由于AI控制的角色做出的行为拥有Actor级别的自主权，并可能需要单独控制组件并单独访问组件数据，因此这类角色通常需要保留为单独的Actor。

### 在类查看器中创建

[类查看器（Class Viewer）](/documentation/zh-cn/unreal-engine/class-viewer-in-unreal-engine) 也可以创建蓝图资产。在使用类查看器时，它可以按以下方式帮助过滤显示的类：

1.  在 **Class Viewer** 工具栏, 点击 **Filters**.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9af0dd0d-d5a7-482d-a76f-ce3614fa1c05/class_viewer_filters.png)
2.  在 **Filters** 菜单中, 选择 **Blueprint Bases Only**.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5530c73f-8b99-41b0-a26a-8013d3a8bc34/filter_blueprint_class_viewer.png)

要新建蓝图资产，需选择想要用作基础的类。在本例中，**CameraActor** 就是我们的基类。

1.  点击所选基类右边的向下箭头，或直接右键点击类。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/949e5ce4-8f83-4aa7-aa87-2661ce0a90e4/class_viewer_arrow.png)
2.  **创建蓝图（Create Blueprint）**选项将会出现在快捷菜单中。点击它打开创建蓝图的对话框。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/069810d9-90b5-44d7-bd22-3b6387a261e8/class_viewer_down_arrow.png)
3.  输入蓝图类的名字并选择保存它的文件夹位置。
    
4.  在创建蓝图对话框的上方，点击 "创建 \[Path\]/\[Name\]" 。这将创建蓝图资产并在 **蓝图编辑器中**打开它。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5705eff-51f4-490f-a886-b4af159848b8/class_viewer_create_complete.png)
5.  点击蓝图编辑器工具栏中的 **保存**，以保存新建的蓝图资产，完成流程。
    

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [通过内容浏览器创建](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine#%E9%80%9A%E8%BF%87%E5%86%85%E5%AE%B9%E6%B5%8F%E8%A7%88%E5%99%A8%E5%88%9B%E5%BB%BA)
-   [使用新增按钮](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%96%B0%E5%A2%9E%E6%8C%89%E9%92%AE)
-   [使用资产视图](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%B5%84%E4%BA%A7%E8%A7%86%E5%9B%BE)
-   [使用资产树](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%B5%84%E4%BA%A7%E6%A0%91)
-   [在关卡编辑器中创建](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine#%E5%9C%A8%E5%85%B3%E5%8D%A1%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E5%88%9B%E5%BB%BA)
-   [新子类](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine#%E6%96%B0%E5%AD%90%E7%B1%BB)
-   [子Actor](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine#%E5%AD%90actor)
-   [收获组件](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine#%E6%94%B6%E8%8E%B7%E7%BB%84%E4%BB%B6)
-   [在类查看器中创建](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine#%E5%9C%A8%E7%B1%BB%E6%9F%A5%E7%9C%8B%E5%99%A8%E4%B8%AD%E5%88%9B%E5%BB%BA)