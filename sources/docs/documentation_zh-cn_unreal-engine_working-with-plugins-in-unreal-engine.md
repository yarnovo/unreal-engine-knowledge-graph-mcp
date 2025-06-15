# 使用虚幻引擎中的插件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:51:44.143Z

---

目录

![使用插件](https://dev.epicgames.com/community/api/documentation/image/7d6ab302-5765-4d08-b311-df82a77f0846?resizing_type=fill&width=1920&height=335)

**插件（plugin）** 是可选的软件组件，用于向 **虚幻引擎（Unreal Engine）** 添加特定功能。插件可以添加全新的功能以及修改内置功能，而不直接修改虚幻引擎代码。例如，插件可以将新菜单项和工具栏命令添加到编辑器，甚至可以添加全新的功能和编辑器子模式。

你可以根据需要为每个项目独立启用或禁用插件。

虚幻引擎中提供了两种类型的插件：

-   虚幻引擎插件。
    
-   第三方插件。
    

## 启用插件

要启用虚幻引擎插件，请执行以下步骤：

1.  在主菜单中，前往 **编辑（Edit）> 插件（Plugins）** 。这将打开 **插件（Plugins）** 窗口。
    
    ![虚幻引擎5中的](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73c53fa0-4e87-47e9-a0cb-44867f1f251d/ue5-plugins-window.png)
    
    虚幻引擎5中的"插件"窗口。
    
2.  使用屏幕左侧的列表查找你想启用的插件。或者，在 **搜索（Search）** 框中输入一个词以搜索包含该词的所有插件名称和说明。
    
    ![按名称搜索插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/016f95a8-6d40-4c6b-9c90-8694e53979e5/finding-plugins.png)
    
    此示例显示"xr"一词的所有搜索结果。请注意，搜索词在出现的所有地方都已高亮显示。
    
3.  要启用插件，请点击其旁边的复选框。
    
    ![启用插件。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6116e1d2-6be2-48ed-82d3-b60214b3eec7/enabling-a-plugin.png)
    
    启用插件
    
    对于非生产就绪的插件（例如测试版插件），你可能会看到警告，要求你确认你想启用该插件。
    
4.  保存你的工作，然后重新启动虚幻引擎。
    

第三方插件可能要求执行额外步骤，你才能将其启用。有关更多信息，请参阅你想安装的第三方插件的文档。请注意，Epic Games对第三方插件的内容概不负责。

## 禁用插件

要禁用插件，请执行以下步骤：

1.  在主菜单中，前往 **编辑（Edit）> 插件（Plugins）** 。这将打开 **插件（Plugins）** 窗口。
    
    ![虚幻引擎5中的](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5da59100-cef8-4c2e-bd15-8a2b6d7c98eb/ue5-plugins-window.png)
    
    虚幻引擎5中的"插件"窗口。
    
2.  使用屏幕左侧的列表查找你想禁用的插件。或者，在 **搜索（Search）** 框中输入一个词以搜索包含该词的所有插件名称和说明。
    
    ![按名称搜索插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b44505ea-2094-468b-9e04-bab8c6c8d5f6/finding-plugins.png)
    
    此示例显示"xr"一词的所有搜索结果。请注意，搜索词在出现的所有地方都已高亮显示。
    
3.  要禁用插件，请清除其旁边的复选框。
    
    ![禁用插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14d46398-7579-46c1-a352-c076b84fe593/disabling-a-plugin.png)
    
    禁用插件
    
    如果你想禁用的插件是其他插件的 *依赖项* （即，其他插件需要该插件才能运行），你将看到通知，询问你是否也要禁用这些插件。请注意，如果你使用了其中的插件来实现项目中的现有功能，禁用插件后可能会破坏该功能。
    
4.  保存你的工作，然后重新启动虚幻引擎。
    

## 从Fab安装插件

即使虚幻引擎包含能提供许多不同种类功能的插件，你仍可以使用下文所述的方法从[Fab](https://www.fab.com)安装额外的插件。

### 从Fab网站下载插件

你可以直接在Fab网站上浏览和下载虚幻引擎插件，也可以在Epic Games启动程序中直接访问Fab。

要从该网站下载插件，请按以下步骤操作：

1.  在 **Epic Games启动程序** 中，找到 **虚幻引擎（Unreal Engine）** 选项卡，选择 **Fab** 并点击 **开始探索（Start exploring）**。
    
    ![Fab tab in the Epic Games launcher](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16bff6a1-31f2-4421-b488-660e626acbd9/fab-launcher-cropped.png)
2.  跳转到Fab网站。
    
    ![The Fab website](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f151589-d591-4482-b83b-8501f5b5035c/fab-site.png)
3.  搜索要安装的插件，并点击缩略图打开列表页面。
    
    ![Searching for a plugin on Fab](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b623961-c82b-445d-ab13-5a2de08e7469/fab-gltf-search.png)

下一步取决于你选择的是[免费插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine#%E5%85%8D%E8%B4%B9%E6%8F%92%E4%BB%B6)还是[付费插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine#%E4%BB%98%E8%B4%B9%E6%8F%92%E4%BB%B6)。

以下信息源自Fab文档[购买和下载素材](/documentation/zh-cn/fab/purchasing-and-downloading-assets-in-fab#%E8%8E%B7%E5%8F%96%E4%BA%A7%E5%93%81)。详情请参阅原文档。

#### 免费插件

要下载免费插件，请按以下步骤操作：

1.  在插件列表页面中点击 **添加到我的库（Add to My Library）**。
    
    ![Adding a plugin to your library](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36e82311-16be-4257-bf27-c96f839f27a2/fab-gltf-listing.png)
2.  接受FabEULA。
    
    ![Accept the Fab EULA](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5c33b32-243b-443c-91e1-593f9cade9ed/fab-end-user-license.png)
3.  此时，你的免费插件就会出现在你位于Fab网站上的Fab库以及Epic Games启动程序中。
    
    ![Plugin saved in my library notification](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df7e799c-4eb1-4474-a23a-99fb921460ef/saved-in-library.png)

#### 付费插件

要下载出售的插件，请按以下步骤操作：

1.  点击 **选择许可证（Select a License）** 下拉菜单，查看可用的许可证。如适用，则选择一个许可证类型。根据你所在的组织规模，许可证可能有所不同。
    
    ![Select a license](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e27df2e-65bc-4389-8032-2478f2ccc2af/buy-paid-plugin.png)
2.  选择 **立即购买（Buy now）** 或 **加入购物车（Add to cart）**。
    
    1.  如果你选择了"立即购买"，将会看到结算页面，可以直接为所选的插件付费。然后直接进入第4步。
        
    2.  如果你选择了"加入购物车"，插件会被加入购物车，然后进入第3步。
        
3.  选完想要购买的所有插件后，点击 **查看购物车（View in cart）**，然后点击 **结算（Checkout）** 按钮为所选的所有插件（集其他Fab产品）付费。
    
    ![Checking out](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c67df60e-2585-46ab-b893-b6cd25fabb32/fab-view-cart.png)
4.  完成结算流程，然后你会看到与免费插件一样的提示信息。
    
    ![Plugin saved in my library notification](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c123e3c9-cd56-48c9-8559-109ffc1f4dcc/saved-in-library.png)

#### 安装插件

将新插件加入Fab库后，你需要将其安装到虚幻引擎。

1.  在启动程序中找到库（Library）选项卡，向下滚动到Fab库（Fab Library）分段。搜索新插件，然后点击 **安装到引擎（Install to Engine）**。
    
    ![Install to Engine button for a plugin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58bc10a4-9a0d-4fae-97de-ec0fc34b06e1/launcher-library.png)
    
    如果找不到新插件，请刷新Fab库。
    
    ![Refresh the Fab Library](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9dad1e01-0a80-40b3-bc09-acb522812574/fab-refresh.png)
    
2.  选择插件要安装到的引擎版本，然后点击 **安装（Install）**。
    
    ![Selecting an Unreal Engine version](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe527b12-9b68-458d-bfd7-1a40a64dae14/install-options.png)
    
    在安装插件或其他资产时，只有受支持的虚幻引擎版本才会出现在选择列表中，即使你还安装了其他版本的虚幻引擎。
    
3.  安装完成后，打开安装了该插件的虚幻引擎版本，按照本文中的[启用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%8F%92%E4%BB%B6)说明 **启用** 插件。
    

### 通过虚幻引擎从Fab下载插件

你可以在虚幻引擎内工作的同事，使用Fab插件下载插件（和其他内容）。在安装来自Fab的其他插件前，你必须先[启用Fab插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine#%E5%90%AF%E7%94%A8fab%E6%8F%92%E4%BB%B6)。

![Fab plugin in Unreal Engine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdc74667-1008-488d-9640-bdbf4f57c892/fab-plugin.png)

安装完插件后，你可以在虚幻引擎内通过以下选项访问它：

-   在 **窗口（Windows）** 菜单中，向下滚动到 **获取内容（Get Content）** 分段并点击 **Fab**。
    
    ![Fab in the Unreal Engine Windows menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ddd9f35-3917-4c0d-91f8-da3d655bdbcf/ue-windows-get-content.png)
-   在 **内容侧滑菜单** 中点击 **+添加（+Add）** 按钮右边的 **Fab** 按钮。
    
    ![Fab in the Content Drawer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c9f4a2f-4fec-4063-97ee-438ec9f0ad05/fab-content-drawer.png)

在Fab窗口中，你可以像在Fab网站上那样搜索并获取插件（包括免费和付费的）。

![Fab window in Unreal Engine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb13470c-8881-4abe-aeac-ef0aa158df26/fab-in-ue.png)

在虚幻引擎内，只有虚幻引擎可用的插件才会出现在Fab窗口中。面向其他平台的内容不可用。

插件被添加到库后，还需要下载并安装才能使用。要安装新插件，需退出虚幻引擎，在Fab库中找到插件。点击 **安装到引擎（Install to Engine）**，再按上文所述的方法操作。

![Install to Engine button for a plugin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b3bd777-5943-4ef4-bb72-27798e78c04b/launcher-library.png) ![Selecting an Unreal Engine version](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cfa0440-c36d-40d6-a6d0-f4ff2ccae290/install-options.png)

## 插件安装位置

虚幻引擎将所有插件存储在以下位置：

-   Windows上的 `C:\Program Files\Epic Games\UE_[version]\Engine\Plugins`
    
-   macOS上的 `/Users/Shared/Epic Games/UE_[version]/Engine/Plugins`
    

-   [plugins](https://dev.epicgames.com/community/search?query=plugins)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%8F%92%E4%BB%B6)
-   [禁用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine#%E7%A6%81%E7%94%A8%E6%8F%92%E4%BB%B6)
-   [从Fab安装插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine#%E4%BB%8Efab%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6)
-   [从Fab网站下载插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine#%E4%BB%8Efab%E7%BD%91%E7%AB%99%E4%B8%8B%E8%BD%BD%E6%8F%92%E4%BB%B6)
-   [免费插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine#%E5%85%8D%E8%B4%B9%E6%8F%92%E4%BB%B6)
-   [付费插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine#%E4%BB%98%E8%B4%B9%E6%8F%92%E4%BB%B6)
-   [安装插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine#%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6)
-   [通过虚幻引擎从Fab下载插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine#%E9%80%9A%E8%BF%87%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%BB%8Efab%E4%B8%8B%E8%BD%BD%E6%8F%92%E4%BB%B6)
-   [插件安装位置](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine#%E6%8F%92%E4%BB%B6%E5%AE%89%E8%A3%85%E4%BD%8D%E7%BD%AE)