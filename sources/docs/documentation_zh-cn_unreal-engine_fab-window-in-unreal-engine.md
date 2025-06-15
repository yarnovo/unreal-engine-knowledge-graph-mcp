# 虚幻引擎中的Fab窗口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:57:53.569Z

---

目录

![虚幻引擎中的Fab](https://dev.epicgames.com/community/api/documentation/image/392b66b7-5e30-4359-8376-6e619b4fbfdb?resizing_type=fill&width=1920&height=335)

使用虚幻引擎时，你可以使用Fab窗口直接访问Fab，从而为项目获取并下载插件和资产。 操作类似于用浏览器访问[Fab](https://www.fab.com/)，但有一些差别。

## 访问Fab

要在虚幻引擎中访问Fab，请找到**窗口（Window）**菜单，向下滚动至"获取内容（Get Content）"分段，找到**Fab**。

[![窗口菜单中的Fab](https://dev.epicgames.com/community/api/documentation/image/89ddc5b5-4b5d-4e83-a7f1-2a89e26881e6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/89ddc5b5-4b5d-4e83-a7f1-2a89e26881e6?resizing_type=fit)

你也可以打开**内容侧滑菜单**，然后点击**添加+（Add+）**按钮旁边的**Fab**按钮。

[![内容侧滑菜单中的Fab按钮](https://dev.epicgames.com/community/api/documentation/image/80c0d004-cc39-401b-8a0e-8b6654483f11?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/80c0d004-cc39-401b-8a0e-8b6654483f11?resizing_type=fit)

### Fab插件

Fab窗口需要使用**Fab插件**，而虚幻引擎会默认启用Fab插件。 如果你无法访问Fab窗口，请找到[编辑（Edit） > 插件（Plugins）](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)，然后搜索并启用Fab插件。

[![虚幻引擎中的Fab插件](https://dev.epicgames.com/community/api/documentation/image/38e57acc-40bd-4bc7-8ceb-ed148e637b14?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/38e57acc-40bd-4bc7-8ceb-ed148e637b14?resizing_type=fit)

## Fab产品

Fab窗口可供你查找、查看和评估产品列表，让你可以在虚幻引擎中获取这些产品并用于自己的项目。 产品列表有免费的，也有是付费的。 你可以在Fab窗口中与产品图块形式的列表交互，也可以点击产品图块查看完整的列表。

### 产品图块

Fab窗口中的产品图块会为你展示相关产品的基本信息。 这包括：

1.  名称
    
2.  发布者
    
3.  评分
    
4.  价格（或是否免费）
    
5.  产品是否已经被保存入库。
    
    [![我的库中保存的Fab产品](https://dev.epicgames.com/community/api/documentation/image/f718f73a-d3fc-459e-a88d-65842cc4d838?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f718f73a-d3fc-459e-a88d-65842cc4d838?resizing_type=fit)
    

你可以在Fab窗口中使用产品图块直接与产品列表交互。

1.  将鼠标悬浮在产品图块上，即可显示产品类型以及兼容的文件格式。
    
    [![将鼠标悬浮在产品图块上](https://dev.epicgames.com/community/api/documentation/image/c699a43c-d788-45e1-91a7-0f29a3298a33?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c699a43c-d788-45e1-91a7-0f29a3298a33?resizing_type=fit)
    
2.  点击**购物车图标**即可将产品加入[购物车](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#cart-view)，点击**愿望清单图标**即可将其加入[愿望清单](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#wishlist-view)。
    
    [![将产品加入购物车和愿望清单](https://dev.epicgames.com/community/api/documentation/image/10ae0854-3d72-4a50-aba2-23155004efb7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/10ae0854-3d72-4a50-aba2-23155004efb7?resizing_type=fit)
    
3.  点击产品将其加入购物车时，必须同时选择一项[许可](https://dev.epicgames.com/documentation/zh-cn/fab/licenses-and-pricing-in-fab)。
    
    [![在探索（Discover）视图中选择许可并将产品加入购物车。](https://dev.epicgames.com/community/api/documentation/image/d7c1ff97-94cd-46a3-9afd-a6b8db3f48bb?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/d7c1ff97-94cd-46a3-9afd-a6b8db3f48bb?resizing_type=fit)
    

## 产品预览

当你在Fab窗口中点击产品图块时，系统将为你显示完整产品的预览。

[![虚幻引擎Fab窗口中的产品预览](https://dev.epicgames.com/community/api/documentation/image/ebd57e60-ad90-4b2c-bb5e-bffae74b0f50?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ebd57e60-ad90-4b2c-bb5e-bffae74b0f50?resizing_type=fit)

点击查看大图。

产品预览将显示产品的基本信息，包括：

1.  发布者
    
2.  名称
    
3.  产品类型
    
4.  评分
    
5.  可用的许可类型和条款
    
6.  包含的文件格式
    
7.  发布日期
    
8.  年龄评级
    
9.  AI的使用和生成情况。
    

点击图片即可全屏查看，你还可以在[Fab3D查看器](https://dev.epicgames.com/documentation/zh-cn/fab/using-the-3d-editor-in-fab)中查看某些带有3D模型的产品。

向下滚动预览还可以查看该产品的完整描述，包括各种支持的文件类型的全部相关技术信息。

[![Fab窗口产品预览详情](https://dev.epicgames.com/community/api/documentation/image/9c388f53-a172-4de2-aa06-4a5d2bfd0830?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9c388f53-a172-4de2-aa06-4a5d2bfd0830?resizing_type=fit)

点击查看大图。

### 添加至我的库

查看免费产品的预览时，你可以点击**添加至我的库（Add to My Library）**以立即将该产品收入库中。

[![将免费产品添加至你的Fab库](https://dev.epicgames.com/community/api/documentation/image/9fd4a28e-e186-4f8f-8c0b-6a2c1f0cddf1?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9fd4a28e-e186-4f8f-8c0b-6a2c1f0cddf1?resizing_type=fit)

点击查看大图。

### 立即购买

查看付费产品的预览时，可以点击**立即购买（Buy Now）**立即购买该产品。 这将触发你刚才预览的产品的结账流程。

如果你尚未选择许可，则需先进行选择。

[![立即购买许可错误](https://dev.epicgames.com/community/api/documentation/image/b8d97cec-222d-43df-8d04-d5a1f1f11840?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b8d97cec-222d-43df-8d04-d5a1f1f11840?resizing_type=fit)

[![Fab窗口产品预览：选择许可](https://dev.epicgames.com/community/api/documentation/image/bd8e1219-899d-432e-9b33-5d1402a8f585?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/bd8e1219-899d-432e-9b33-5d1402a8f585?resizing_type=fit)

系统会为你显示所选产品的结账页面。这时你可以选择支付方式和其他相关细节。

[![Fab窗口立即购买结账页](https://dev.epicgames.com/community/api/documentation/image/60ab633d-f6d6-4e11-b1c5-9a2ca37fabe0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/60ab633d-f6d6-4e11-b1c5-9a2ca37fabe0?resizing_type=fit)

点击查看大图。

价格将默认以美元（USD）显示。 如果你登录了Fab，那么价格将以你的本地货币显示。

[![Fab窗口立即购买加拿大元结账页](https://dev.epicgames.com/community/api/documentation/image/71649f6e-5ca3-4e5b-87f3-0db1759985f9?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/71649f6e-5ca3-4e5b-87f3-0db1759985f9?resizing_type=fit)

点击查看大图。

### 添加至购物车/愿望清单

如果你不想立刻购买预览的产品，可以点击**添加至购物车（Add to cart）**以将其加入[购物车](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#cart-view)以供日后购买。 你也可以点击"添加至购物车"按钮右边的**愿望清单按钮**，将产品加入你的[愿望清单](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#wishlist-view)。

[![添加至购物车和添加至愿望清单按钮](https://dev.epicgames.com/community/api/documentation/image/f3cb15d7-5c28-4e73-9220-22882eb3210b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f3cb15d7-5c28-4e73-9220-22882eb3210b?resizing_type=fit)

如果产品已经被加入购物车或愿望清单，按钮会发生变化。 这时你可以点击"在购物车内查看（View in cart）"按钮，前往购物车并完成购买。 你也可以点击愿望清单按钮，将产品移出愿望清单。

[![在购物车内查看和从愿望清单中移出按钮](https://dev.epicgames.com/community/api/documentation/image/4177cf27-59bb-45c0-8434-55b71dfcfba4?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4177cf27-59bb-45c0-8434-55b71dfcfba4?resizing_type=fit)

## 探索视图

打开Fab窗口时，你会看到**探索**视图。 这是Fab窗口的默认视图。 Fab窗口有多个分段，每个分段各具特色，能帮你找到可在项目中使用的产品。

[![Fab窗口探索视图](https://dev.epicgames.com/community/api/documentation/image/39825944-681c-4377-b770-4413070296d9?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/39825944-681c-4377-b770-4413070296d9?resizing_type=fit)

点击查看大图。

1.  [搜索栏](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#search-bar)
    
2.  [导航功能按钮](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#navigation-controls)
    
3.  [账户功能按钮](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#account-controls)
    
4.  [精选产品](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#featured-products)（仅限探索视图）
    
    1.  [精选虚幻引擎产品](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#featured-unreal-engine-products)
        
    2.  [Quixel](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#quixel)
        
    3.  [虚幻引擎示例](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#ue-samples)
        
5.  [产品类型面板](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#product-type-panel)
    
6.  [产品列表和筛选器菜单](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#product-list-and-filter-menu)
    

### 搜索栏

Fab窗口的所有视图都提供了搜索栏，供你使用文本字符串来筛选Fab产品。

[![Fab窗口搜索栏](https://dev.epicgames.com/community/api/documentation/image/33e186cf-9495-49ca-8f2c-e009158de60a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/33e186cf-9495-49ca-8f2c-e009158de60a?resizing_type=fit)

[![Fab窗口搜索结果](https://dev.epicgames.com/community/api/documentation/image/8e47283a-7f71-4693-8366-292ce34bc347?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/8e47283a-7f71-4693-8366-292ce34bc347?resizing_type=fit)

点击查看大图。

如果你对初步搜索结果不满意（比如太宽泛或太狭隘），可以使用AND和OR等布尔运算符来增加条件，从而调整搜索结果。

[![使用AND运算符的Fab窗口搜索结果](https://dev.epicgames.com/community/api/documentation/image/cdc5b45b-4e91-4882-9177-5b7ca46a6a12?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/cdc5b45b-4e91-4882-9177-5b7ca46a6a12?resizing_type=fit)

点击查看大图。

你还可以使用[产品类型面板](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#product-type-panel)以及[产品筛选器菜单](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#product-list-and-filter-menu)进一步优化搜索。

### 导航功能按钮

导航功能按钮能帮你在不同的搜索结果和筛选结果页面之间轻松移动。

[![Fab窗口导航功能按钮图标](https://dev.epicgames.com/community/api/documentation/image/cc90095a-6b7f-45d8-9210-eb13776f7ade?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/cc90095a-6b7f-45d8-9210-eb13776f7ade?resizing_type=fit)

1.  点击**主页**图标即可返回Fab窗口的探索视图。
    
2.  点击**返回（<）**图标，即可返回至前一组搜索结果和筛选结果。 如果只存在一组结果，则返回Fab窗口主页视图。
    
3.  点击**前进（>）**图标，即可回到点击返回图标之前你所在的那组搜索结果。 如果你已经位于最近的结果页，则不会触发任何操作。
    

### 账户功能按钮

账户功能按钮能帮你管理自己的账户、购物车以及Fab的设置。 你可以使用这些按钮前往你的Fab库以及愿望清单。

[![Fab窗口账户功能按钮图标](https://dev.epicgames.com/community/api/documentation/image/e67f0436-bee4-4489-90e1-fc7b6e3b8c28?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e67f0436-bee4-4489-90e1-fc7b6e3b8c28?resizing_type=fit)

1.  显示Fab窗口中的**我的库（My Library）**视图。
    
2.  显示Fab窗口中的**愿望清单（Wishlist）**视图。
    
3.  显示待结账的**购物车**内容；该图标还会显示购物车中的商品数量。
    
4.  打开本地化菜单，让你选择Fab窗口的语言。
    
    [![Fab窗口本地化下拉菜单](https://dev.epicgames.com/community/api/documentation/image/df7cfc2f-ff46-45cb-bab2-dfbe9c5601a0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/df7cfc2f-ff46-45cb-bab2-dfbe9c5601a0?resizing_type=fit)
    
5.  打开账户（Account）菜单，显示其他选项。
    
    [![Fab窗口账户菜单](https://dev.epicgames.com/community/api/documentation/image/96fbbbec-4fa8-4b61-8e02-b7ef6a17e408?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/96fbbbec-4fa8-4b61-8e02-b7ef6a17e408?resizing_type=fit)
    
    -   点击**帮助（Help）**即可在你的浏览器中打开[Fab文档](https://dev.epicgames.com/documentation/zh-cn/fab/fab-documentation)。
        
    -   点击**Fab设置（Fab settings）**即可在单独窗口中打开[Fab设置](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#fab-settings)。
        
    -   点击**账户设置（Account settings）**即可在你的浏览器中打开Epic Games账户设置。 你可能需要登录。
        
    -   点击**登出（Sign out）**即可登出你的Epic Games账户。
        

### 精选产品

在默认的探索视图中，Fab窗口会分三个类别展示一系列的精选产品。 在每个类别中，你都可以点击类别右边的**前进（>）**和**后退（<）**按钮，在轮播的产品之间水平滚动。

[![轮播滚动的前进和后退图标](https://dev.epicgames.com/community/api/documentation/image/d1fe23a7-cc73-483b-bdbb-c3e7ced524e6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/d1fe23a7-cc73-483b-bdbb-c3e7ced524e6?resizing_type=fit)

Fab窗口中只会显示虚幻引擎可用的Fab产品。 如果你 需要浏览可供其他应用程序使用的产品，请前往[Fab主页](https://www.fab.com/)。

#### 精选虚幻引擎产品

此类别会显示由第三方卖家创建的精选促销产品。

#### Quixel

此类别会显示由Quixel创建的精选产品，包括免费产品和促销产品。

#### 虚幻引擎示例

此类别会显示由Epic Games开发者创建的免费示例，用于展示各种功能和项目。

### 产品类型面板

你可以使用Fab窗口左侧的产品类型面板，仅查看指定类型的产品。 你可以展开列出的各种产品类型，使其显示子类型和标签，从而精简你想查看的产品列表。 在此处，你可以使用[筛选器菜单](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#product-list-and-filter-menu)进一步限制Fab窗口为你展示的产品列表。 点击面板顶部的**所有产品（All products）**按钮即可重置产品类型筛选器。

[![Fab窗口产品类型面板](https://dev.epicgames.com/community/api/documentation/image/58cbd7de-5d32-4ba3-8ecc-d1c160704104?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/58cbd7de-5d32-4ba3-8ecc-d1c160704104?resizing_type=fit)

### 产品列表和筛选器菜单

Fab窗口将提供完整的产品列表，供你购买（适用于付费产品）或加入库中（适用于免费产品）。 该窗口同时还提供广泛的筛选和排序选项，见产品列表顶部的筛选器菜单。 除探索视图外，所有视图都在Fab窗口顶部提供了筛选器菜单，具体就位于[精选产品](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#featured-products)下方。

[![Fab窗口筛选器菜单左侧](https://dev.epicgames.com/community/api/documentation/image/7a110620-c5fe-4f0d-865b-f364287a6f3b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/7a110620-c5fe-4f0d-865b-f364287a6f3b?resizing_type=fit)

[![Fab窗口筛选器菜单右侧](https://dev.epicgames.com/community/api/documentation/image/aa9dc860-9942-4c16-bdc7-34a5dd6e38f8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/aa9dc860-9942-4c16-bdc7-34a5dd6e38f8?resizing_type=fit)

每项筛选器菜单选项都能让你以不同方式精简你在Fab窗口中的产品搜索。 筛选器的使用数量没有限制，你可以使用产品列表顶部的筛选器标签逐一清除或全部一起清除。

[![Fab窗口多个筛选器](https://dev.epicgames.com/community/api/documentation/image/c591c8ce-cc26-4f2f-a60a-d3b039aebfed?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c591c8ce-cc26-4f2f-a60a-d3b039aebfed?resizing_type=fit)

点击查看大图。

如需详细了解筛选器菜单，请参阅[Fab文档](https://dev.epicgames.com/documentation/zh-cn/fab/purchasing-and-downloading-assets-in-fab#preview-products)。

#### 包含3D兼容格式

**包含3D****兼容格式**开关可展开Fab窗口中所示产品的文件格式范围。具体包含的3D兼容文件类型如下：

-   GLB
    
-   GLTF
    
-   FBX
    
-   虚幻引擎
    

[![Fab窗口3D兼容格式开关](https://dev.epicgames.com/community/api/documentation/image/a1bc7c89-2558-4fb5-b2fc-56fc7f547bd3?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a1bc7c89-2558-4fb5-b2fc-56fc7f547bd3?resizing_type=fit)

#### 样式

**样式（Style）**下拉菜单提供了一个简易的搜索栏，以及基于渲染样式和阶段/主题样式的筛选器选项可展开列表。 你可以同时选择多个筛选器。

[![Fab窗口样式筛选器](https://dev.epicgames.com/community/api/documentation/image/6ff50bf5-f133-421d-a2a3-0d6731e5d436?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6ff50bf5-f133-421d-a2a3-0d6731e5d436?resizing_type=fit)

#### 兼容性

**兼容性（Compatibility）**下拉菜单有子菜单，可供你选择支持的最旧和最新的虚幻引擎版本，以及可供选择的支持平台的核对清单。 你可以同时选择多个筛选器。

[![Fab窗口兼容性筛选器](https://dev.epicgames.com/community/api/documentation/image/39ae3efb-1cfa-4843-a4ac-ead02a31f8f6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/39ae3efb-1cfa-4843-a4ac-ead02a31f8f6?resizing_type=fit)

#### 技术规格

**技术规格（Technical features）**下拉菜单提供了一个简易的搜索栏，以及针对动画、功能和虚幻引擎功能的筛选器选项可展开列表。 你可以同时选择多个筛选器。

[![Fab窗口技术规格筛选器](https://dev.epicgames.com/community/api/documentation/image/4516cb07-0808-4359-86a8-cfdfaa155004?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4516cb07-0808-4359-86a8-cfdfaa155004?resizing_type=fit)

#### 标签

**标签（Tags）**下拉菜单提供了一个简易的搜索栏，供你查找具备指定标签的产品。

[![Fab窗口标签搜索栏](https://dev.epicgames.com/community/api/documentation/image/940eb5be-7e72-41da-87de-7215446e9b53?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/940eb5be-7e72-41da-87de-7215446e9b53?resizing_type=fit)

#### 价格

**价格（Price）**下拉菜单提供字段供你依据最低和最高价格进行筛选。 该菜单还提供可筛选免费产品的复选框，以及可以仅显示促销产品的开关。

[![Fab窗口价格筛选器](https://dev.epicgames.com/community/api/documentation/image/cdc453a4-e66f-41e0-8510-2561297b2a26?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/cdc453a4-e66f-41e0-8510-2561297b2a26?resizing_type=fit)

#### 许可

**许可（Licenses）**下拉菜单提供了基于[Fab支持的许可类型](https://dev.epicgames.com/documentation/zh-cn/fab/licenses-and-pricing-in-fab)的筛选器选项，具体包括：

1.  [Creative Commons Attribution许可证 (CC -BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
    
2.  标准Fab个人和专业许可
    
3.  旧版虚幻引擎商城许可
    

[![Fab窗口许可筛选器](https://dev.epicgames.com/community/api/documentation/image/1d426bc9-c753-4bba-baec-ebf19b93feaf?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1d426bc9-c753-4bba-baec-ebf19b93feaf?resizing_type=fit)

#### 发布者

**发布者（Publishers）**下拉菜单提供了一个简易的搜索栏，供你查找来自于指定发布者的产品。

[![Fab窗口发布者搜索栏](https://dev.epicgames.com/community/api/documentation/image/9fcbff89-55dd-4e2d-a544-5084747fa481?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9fcbff89-55dd-4e2d-a544-5084747fa481?resizing_type=fit)

#### 发布日期

**发布日期（Date published）**下拉菜单让你可以根据产品的发布时间来限制搜索结果。

[![Fab窗口发布日期筛选器](https://dev.epicgames.com/community/api/documentation/image/f40c5dc4-1249-4095-bc94-13010c316ba5?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f40c5dc4-1249-4095-bc94-13010c316ba5?resizing_type=fit)

#### 评分

**评分（Ratings）**下拉菜单让你可以根据产品的社区星级评分来限制搜索结果。

[![Fab窗口评分筛选器](https://dev.epicgames.com/community/api/documentation/image/410f5598-9e36-4aff-8a20-5d6dc8ff01e6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/410f5598-9e36-4aff-8a20-5d6dc8ff01e6?resizing_type=fit)

#### 排序方式

**排序方式（Sort by）**下拉菜单并不提供针对搜索结果的筛选器。 其实该菜单将决定产品在Fab窗口中的排序和显示方式。

[![Fab窗口排序方式下拉菜单](https://dev.epicgames.com/community/api/documentation/image/f38d9da5-fda7-485f-8f88-1553ad63460d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f38d9da5-fda7-485f-8f88-1553ad63460d?resizing_type=fit)

#### 内容偏好设置

点击**内容偏好设置（Content preferences）**按钮（位于Fab窗口右侧，筛选器下拉菜单旁）即可打开内容偏好设置窗口。

[![Fab窗口内容偏好设置按钮](https://dev.epicgames.com/community/api/documentation/image/5473f500-e6ad-4b44-93d4-94ff6829fee4?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/5473f500-e6ad-4b44-93d4-94ff6829fee4?resizing_type=fit)

你可以选择是否显示使用AI创作的产品，以及是否隐藏、模糊或显示成人内容。 选好内容偏好设置后，点击**存储（Save）**即可将你的偏好设置应用到Fab的全局。

[![Fab窗口内容偏好设置选项](https://dev.epicgames.com/community/api/documentation/image/167fc22d-d58e-4298-956d-7076d29a04b3?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/167fc22d-d58e-4298-956d-7076d29a04b3?resizing_type=fit)

## 我的库视图

点击**我的库**图标即可显示我的库（My Library）视图。

[![Fab窗口我的库图标](https://dev.epicgames.com/community/api/documentation/image/4413c926-375d-4034-8c2c-653d67ea524f?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4413c926-375d-4034-8c2c-653d67ea524f?resizing_type=fit)

默认情况下，这将显示与你的Epic Games账户关联且可在虚幻引擎中使用的所有免费和付费Fab产品。

[![Fab窗口我的库图视图](https://dev.epicgames.com/community/api/documentation/image/067cc98b-ff68-4251-8f1e-579f8a5305a2?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/067cc98b-ff68-4251-8f1e-579f8a5305a2?resizing_type=fit)

点击查看大图。

你可以使用多个筛选器和排序选项来管理你的库：

1.  你可以使用搜索栏查找特定的产品。
    
2.  你可以使用左侧的产品类型面板筛选你的库。
    
3.  你可以切换是否显示3D兼容格式。
    
4.  你可以按购买日期筛选你的库。
    
5.  你可以使用右侧的下拉菜单，选择以从最新到最旧或从最旧到最新的顺序来排序。
    

你可以点击某个产品图块右下方的**+**图标，下载该产品并将其直接添加到虚幻引擎中的当前项目。

[![Fab窗口产品图块添加到项目按钮](https://dev.epicgames.com/community/api/documentation/image/68b9c2bf-b9a4-44e4-be6a-39a60ece7442?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/68b9c2bf-b9a4-44e4-be6a-39a60ece7442?resizing_type=fit)

## 愿望清单视图

点击账户功能按钮中的**愿望清单**图标即可显示愿望清单视图。

[![Fab窗口愿望清单图标](https://dev.epicgames.com/community/api/documentation/image/f3541e5b-2020-4687-92b5-2489a38fd0b2?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f3541e5b-2020-4687-92b5-2489a38fd0b2?resizing_type=fit)

默认情况下，该视图将显示你在Fab窗口中点击了产品图块上的愿望清单图标的所有产品。

[![Fab窗口愿望清单视图](https://dev.epicgames.com/community/api/documentation/image/96d89147-efe5-45c0-8901-4faf07243eca?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/96d89147-efe5-45c0-8901-4faf07243eca?resizing_type=fit)

点击查看大图。

你可以使用多个筛选器和排序选项来管理你的愿望清单：

1.  你可以使用搜索栏查找特定的产品。
    
2.  你可以使用左侧的产品类型面板筛选你的愿望清单。仅当某类型的产品至少有一项被你加入了愿望清单时，系统才会显示该产品类型。
    
3.  你也可以使用任意的标准筛选器菜单选项筛选你的愿望清单。
    
4.  你可以让愿望清单按名称、评级或价格排序。
    

## 购物车视图

在探索、我的库或愿望清单视图中，你都可以点击**购物车**图标以查看购物车，或者点某[产品预览](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#product-preview)上的**在购物车中查看（View in cart）**按钮。

[![Fab窗口购物车图标](https://dev.epicgames.com/community/api/documentation/image/2b027888-6320-4fb8-b2d5-811336744da1?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2b027888-6320-4fb8-b2d5-811336744da1?resizing_type=fit)

购物车会显示你所选待购产品的概览信息。 你可以检查购物项，并移除不想购买的物品。 确认无误后，点击**下单（Checkout）**即可为所购产品付款。

[![Fab窗口购物车视图](https://dev.epicgames.com/community/api/documentation/image/ef46d294-39a0-403f-80cc-577351da3ac3?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ef46d294-39a0-403f-80cc-577351da3ac3?resizing_type=fit)

点击查看大图。

价格将默认以美元（USD）显示。 如果你登录了Fab，那么价格将以你的本地货币显示。

[![加拿大元Fab窗口购物车视图](https://dev.epicgames.com/community/api/documentation/image/25a3f301-d7a5-40d6-9021-46e79fe29f32?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/25a3f301-d7a5-40d6-9021-46e79fe29f32?resizing_type=fit)

价格将默认以美元（USD）显示。 如果你登录了Fab，那么价格将以你的本地货币显示。

## Fab设置

**Fab设置（Fab Settings）**窗口让你可以控制Fab窗口的一些基础功能。

[![Fab设置窗口](https://dev.epicgames.com/community/api/documentation/image/5d72bf1e-5ec7-4155-ae98-37991d107085?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/5d72bf1e-5ec7-4155-ae98-37991d107085?resizing_type=fit)

**通用**

-   **启用调试选项（Enable Debug Options）：**此复选框可启用Chrome针对Fab的调试选项。
    
-   **缓存目录路径（Cache Directory Path）：**此字段让你可以设置Fab缓存的位置。 默认路径为：  
    
    `C:/Users/[AccountName]/AppData/Local/Temp/FabLibrary`
    
    点击字段旁的**省略号（...）**即可浏览本地设备上的位置。
    
-   **缓存目录大小（Cache Directory Size）：**此字段会以字节显示当前Fab缓存的大小。 点击**清空目录（Clean Directory）**即可清空缓存。
    

**Megascans**

-   **首选质量级别（Preferred Quality Tier）：**你可以使用此字段决定Megascans资产的首选质量。 选项如下：
    
    -   低（Low）
        
    -   中（Medium）（默认值）
        
    -   高（High）
        
    -   原始（Raw）
        

-   [fab](https://dev.epicgames.com/community/search?query=fab)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问Fab](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E8%AE%BF%E9%97%AEfab)
-   [Fab插件](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#fab%E6%8F%92%E4%BB%B6)
-   [Fab产品](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#fab%E4%BA%A7%E5%93%81)
-   [产品图块](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E4%BA%A7%E5%93%81%E5%9B%BE%E5%9D%97)
-   [产品预览](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#product-preview)
-   [添加至我的库](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E8%87%B3%E6%88%91%E7%9A%84%E5%BA%93)
-   [立即购买](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E7%AB%8B%E5%8D%B3%E8%B4%AD%E4%B9%B0)
-   [添加至购物车/愿望清单](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E8%87%B3%E8%B4%AD%E7%89%A9%E8%BD%A6/%E6%84%BF%E6%9C%9B%E6%B8%85%E5%8D%95)
-   [探索视图](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E6%8E%A2%E7%B4%A2%E8%A7%86%E5%9B%BE)
-   [搜索栏](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#search-bar)
-   [导航功能按钮](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#navigation-controls)
-   [账户功能按钮](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#account-controls)
-   [精选产品](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#featured-products)
-   [精选虚幻引擎产品](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#featured-unreal-engine-products)
-   [Quixel](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#quixel)
-   [虚幻引擎示例](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#ue-samples)
-   [产品类型面板](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#product-type-panel)
-   [产品列表和筛选器菜单](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#product-list-and-filter-menu)
-   [包含3D兼容格式](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E5%8C%85%E5%90%AB3d%E5%85%BC%E5%AE%B9%E6%A0%BC%E5%BC%8F)
-   [样式](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E6%A0%B7%E5%BC%8F)
-   [兼容性](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E5%85%BC%E5%AE%B9%E6%80%A7)
-   [技术规格](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC)
-   [标签](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E6%A0%87%E7%AD%BE)
-   [价格](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E4%BB%B7%E6%A0%BC)
-   [许可](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E8%AE%B8%E5%8F%AF)
-   [发布者](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E5%8F%91%E5%B8%83%E8%80%85)
-   [发布日期](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E5%8F%91%E5%B8%83%E6%97%A5%E6%9C%9F)
-   [评分](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E8%AF%84%E5%88%86)
-   [排序方式](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E6%8E%92%E5%BA%8F%E6%96%B9%E5%BC%8F)
-   [内容偏好设置](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E5%86%85%E5%AE%B9%E5%81%8F%E5%A5%BD%E8%AE%BE%E7%BD%AE)
-   [我的库视图](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#%E6%88%91%E7%9A%84%E5%BA%93%E8%A7%86%E5%9B%BE)
-   [愿望清单视图](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#wishlist-view)
-   [购物车视图](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#cart-view)
-   [Fab设置](/documentation/zh-cn/unreal-engine/fab-window-in-unreal-engine#fab-settings)

相关文档

[

使用插件

![使用插件](https://dev.epicgames.com/community/api/documentation/image/ce60b980-6db7-49f9-adba-439a2c874282?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)