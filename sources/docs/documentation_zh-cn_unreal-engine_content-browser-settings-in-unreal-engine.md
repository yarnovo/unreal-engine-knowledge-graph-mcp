# 虚幻引擎中的内容浏览器设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:52:22.432Z

---

目录

![内容浏览器设置参考](https://dev.epicgames.com/community/api/documentation/image/f8c1a9ae-9148-4232-b9c9-1f7e855d7c06?resizing_type=fill&width=1920&height=335)

**设置（Settings）** 按钮位于 **内容浏览器（Content Browser）** 的右上角。点击该按钮会打开一个菜单，你可以在其中调整内容浏览器当前实例的各种设置，例如：

-   视图类型（资产的显示方式：图块、列表或列）。
    
-   搜索筛选器。
    
-   要包含或排除的内容。
    
-   搜索选项。
    

![内容浏览器中的](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8a671b6-e06f-4aac-81f2-6248bbf18fa6/ue5_1-content-browser-settings.png)

## 视图类型

这些设置会影响资产视图中资产的显示方式。你可以选择以下某个视图类型：

### 图块

**图块（Tiles）** 视图将所有资产布局为图块网格，如下所示：

![使用图块视图的资产视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b25aa06-68a4-4f24-a4fd-5f9adf2beb45/asset-view-tiles.png)

### 列表

**列表（List）** 视图将所有资产布局为带有名称和文件类型的缩略图列表，如下所示：

![使用列表视图的资产视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8dc793b3-ec91-4b55-9ad9-ba9adb9638bd/asset-view-list.png)

### 列

**列（Columns）** 视图使用属性的电子表格式排列来布局所有资产，如下所示：

![使用列视图的资产视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/836ccb72-20d8-4315-acf9-5e31ad7f582c/asset-view-columns.png)

显示的细节会根据资产类型而变化。例如，蓝图资产显示其类型和父类，静态网格体显示其顶点和三角形数量。

你可以对每个列执行以下操作：

-   左键点击列名，按列值的升序或降序对资产排序。
    
-   将鼠标悬停在列名上，然后点击垂直省略号菜单并选择 **隐藏列（Hide Column）** ，以隐藏该列。
    
-   在 **设置（Settings）** 菜单中选择 **切换列（Toggle Columns）** 选项并启用你想显示的列，以将该列取消隐藏。
    

你还可以将所有资产细节导出为 `.csv` 文件。从 **设置（Settings）** 菜单，选择 **导出为CSV（Export to CSV）** 选项。请注意，仅当资产查看者当前使用的是列视图时，才会显示此选项。

## 锁定

**锁定内容浏览器（Lock Content Browser）** 选项是可切换的设置。如果启用，此内容浏览器实例将忽略"在内容浏览器中查找"的请求。

## 视图

使用 **视图（View）** 设置切换内容浏览器中显示的内容，以及筛选行为。

**选项**

**说明**

**显示文件夹（Show Folders）**

禁用此选项以使内容浏览器在单个视图中显示项目中的所有资产。

禁用 **显示空文件夹（Show Empty Folders）** 子选项以使内容浏览器仅显示至少包含一个资产的文件夹。

**显示空文件夹（Show Empty Folders）**

禁用此选项以使内容浏览器隐藏空文件夹。

**显示收藏夹（Show Favorites）**

启用此选项会在"源"面板顶部添加新的 **收藏夹（Favorites）** 类别。此类别显示你是否已将至少一个文件夹或资产添加到收藏夹。

要将文件夹或资产添加到收藏夹，请右键点击它，然后从上下文菜单选择 **添加到收藏夹（Add To Favorites）** 。

**以递归方式筛选（Filter Recursively）**

切换此选项以控制资产视图筛选器是否应该以递归方式应用。

**显示所有文件夹（Show All Folder）**

切换 `All`（所有）文件夹在"源"面板文件夹层级中的可视性。如果禁用，文件夹层级将上移一个级别。

**整理文件夹（Organize Folders）**

启用此选项以在内容浏览器的 **资产（Asset）** 视图中自动整理文件夹。

**路径视图筛选器（Path View Filters）**

切换会影响内容浏览器中的 **路径视图（Path View）** 的选项。在处理使用来自多个源的内容的大规模项目时，此选项很有用。

**显示源面板（Show Sources Panel）**

切换此选项以显示或隐藏"源"面板。

### 内容

切换以下选项以控制特定类型的资产是否显示在资产视图中。

**选项**

**说明**

**显示C++类（Show C++ Classes）**

如果启用，将在"源"面板中显示 `Engine C++ Classes` 文件夹。此文件夹包含虚幻引擎中所有C++类的可浏览层级。

**显示开发人员内容（Show Developers Content）**

如果启用，将在"源"面板中显示 `Developers` 文件夹。此文件夹用于在多用户项目上与其他开发人员协作。

**显示引擎内容（Show Engine Content）**

如果启用，将在"源"面板中显示 `Engine Content` 文件夹。此文件夹包含带有各种内容和功能的虚幻引擎现有资产的集合。

**显示插件内容（Show Plugin Content）**

如果启用，特定于插件的内容将在内容浏览器中显示。

**显示本地化内容（Show Localized Content）**

如果启用，本地化内容将在内容浏览器中显示。

## 搜索

使用 **搜索（Search）** 选项可控制在内容浏览器中执行的搜索中包含或排除哪些内容。

-   资产类名
    
-   资产路径
    
-   集合名称
    

### 缩略图

使用 **缩略图（Thumbnail）** 选项可控制生成和显示缩略图的方式。

**选项**

**说明**

**缩略图大小（Thumbnail Size）**

为资产视图中显示的缩略图选择五种可能的大小之一：

-   微小
-   小
-   中
-   大
-   超大

**缩略图编辑模式（Thumbnail Edit Mode）**

如果启用，你可以在3D资产的缩略图内左键点击并拖动以调整相应缩略图。完成后，点击"编辑完成（Done Editing）"按钮以保存更改。要恢复更改，请点击缩略图右上角的"撤销（Undo）"按钮。

![从内容浏览器编辑资产的缩略图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27903994-b3e4-4a21-97df-114a3b8f3744/editing-asset-thumbnails.gif)

你必须保存资产以保存对其缩略图所做的更改。

|

**实时缩略图（Real-Time Thumbnails）**

如果启用，资产缩略图将实时渲染。

## 内容浏览器编辑器偏好设置

你可以从[编辑器偏好设置](/documentation/zh-cn/unreal-engine/unreal-editor-preferences)调整会对内容浏览器造成影响的更多设置（菜单：**编辑（Edit）> 编辑器偏好设置（Editor Preferences）**，然后选择 **内容浏览器（Content Browser）** 分段）。

**设置**

**说明**

**发出警告前可同时加载的资产数（Assets to Load at Once Before Warning）**

在虚幻引擎显示警告之前，内容浏览器中可以同时加载的资产数量。

**默认打开源面板（Open Sources Panel by Default）**

如果启用，内容浏览器将默认打开"源"面板。

**要保留在"最近打开"筛选器中的资产数（Number of Assets to Keep in the Recently Opened Filter）**

资产视图中"最近打开"筛选器显示的资产数量。

**启用实时材质实例缩略图（Enable Realtime Material Instance Thumbnails）**

如果启用，材质实例缩略图将实时渲染。

-   [content browser](https://dev.epicgames.com/community/search?query=content%20browser)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [视图类型](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine#%E8%A7%86%E5%9B%BE%E7%B1%BB%E5%9E%8B)
-   [图块](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine#%E5%9B%BE%E5%9D%97)
-   [列表](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine#%E5%88%97%E8%A1%A8)
-   [列](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine#%E5%88%97)
-   [锁定](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine#%E9%94%81%E5%AE%9A)
-   [视图](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine#%E8%A7%86%E5%9B%BE)
-   [内容](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine#%E5%86%85%E5%AE%B9)
-   [搜索](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine#%E6%90%9C%E7%B4%A2)
-   [缩略图](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine#%E7%BC%A9%E7%95%A5%E5%9B%BE)
-   [内容浏览器编辑器偏好设置](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine#%E5%86%85%E5%AE%B9%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%96%E8%BE%91%E5%99%A8%E5%81%8F%E5%A5%BD%E8%AE%BE%E7%BD%AE)