# 虚幻引擎中的动态资产选择 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dynamic-asset-selection-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:04:41.297Z

---

目录

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

你可以组合使用 **代理（Proxy）** 、 **代理表（Proxy Table）** 和 **选择器表（Chooser Table）** 资产构建动态资产选择逻辑，基于项目中的变量驱动动画。例如，你可以使用代理和代理表资产来选择应该为你的角色加载和使用哪种类型的动画集，例如不同的武器集。你也可以通过项目中的上下文变量，使用选择器表动态选择单独的动画资产，例如基于你的角色被攻击的部位做出不同的命中响应。

你可以参阅以下文档，详细了解如何设置虚幻引擎中的动态动画选择系统。

虽然此文档着重介绍如何使用选择器和代理表来选择与动画相关的资产（如动画序列、蒙太奇或AnimInstance类等），但系统本身是通用的，可用于选择任意类型的资产、对象或类。

#### 先决条件

-   启用 **选择器（Chooser）** 插件。在 **菜单栏** 中找到 **编辑（Edit）** > **插件（Plugins）** 并找到 **动画（Animation）** 分段中的 **选择器（Chooser）** ，或使用 **搜索栏** 。启用插件并重启编辑器。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76332339-a554-41e3-90ec-aaca5fa76e30/image_0.png)

-   你的项目包含需要包含一组需要基于运行时的情况动态选择的动画。这可以是唯一的装饰动画集、相关Gameplay动画（如上下文动画场景），或对于武器等可装备物品相关的动画集。
    
-   你的项目需包含一个功能动画蓝图，你可以在其中构建动态动画选择逻辑。
    

## 设置动画选择系统

你可以在本章节中了解到如何在项目中设置动画选择器系统，根据项目在运行时的情况动态选择命中响应动画播放。

### 创建代理资产

[代理资产](/documentation/zh-cn/unreal-engine/dynamic-asset-selection-in-unreal-engine#%E4%BB%A3%E7%90%86%E8%B5%84%E4%BA%A7)用于存储关于哪个[代理表](/documentation/zh-cn/unreal-engine/dynamic-asset-selection-in-unreal-engine#%E4%BB%A3%E7%90%86%E8%A1%A8)资产处于活动状态的上下文信息以及其他相关变量。

要创建代理资产，请使用 **内容浏览器（Content Browser）** 中的（**+**）**添加（Add）**，并找到 **杂项（Miscellaneous）** > **代理资产（Proxy Asset）** 。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/817448fe-2bc2-4af0-904b-45bfa34abe0a/image_1.png)

为你想要从中动态选择动画以驱动角色的每个动画集创建代理资产，例如待机、行走或奔跑动画集。

创建代理资产后，打开每个资产以访问其设置。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57f3c03f-2321-4f10-a6c4-4df57b6e0ff3/image_2.png)

将每个代理资产的 **类型（Type）** 属性设置为你使用的动画资产类型，在本例中为 `AnimSequenceBase` 。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3910a26-8d4c-4f12-9560-315be0f5d612/image_3.png)

将 **上下文数据（Context Data）** 属性设置为 **动画蓝图（Animation Blueprint）**，方法是使用（**+**）**添加（Add）** 并选择 **上下文对象类型类（Context Object Type Class）** 选项来添加新的 **索引（Index）** 数组。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e12857b-2255-4d39-a464-0ed894a1ceeb/image_4.png)

展开 **索引（Index）** 数组的设置，将 **类（Class）** 属性设置为使用你的动画蓝图，在本例中为 `ABP_Manny` 。然后确保将 **方向（Direction）** 属性设置为 **读取（Read）** 。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec0d3e68-ed08-40be-becf-1f1f99f48fcc/image_5.png)

### 动画蓝图设置

设置完代理资产后，你必须在你的角色的动画蓝图中创建一个变量，才能在运行时期间存储活动代理表。要创建此变量，请打开你的角色的动画蓝图，并使用（**+**）**添加（Add）** 在 **我的蓝图（My Blueprint）** 面板中创建新变量。然后将变量类型设置为 **代理表对象引用（Proxy Table Object Reference）** 。创建变量之后， **保存** 并 **编译** 你的动画蓝图。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40136825-f41e-4eb8-a320-e8496f051c20/image_6.png)

代理表变量将在动画图表中由Evaluate Proxy节点使用，以便在运行时确定活动代理表。

### 创建代理表资产

**代理表（Proxy Table）** 资产用于存储可以在运行时动态选择的动画资产集。例如，一个代理表可以存储一个角色的待机动画，而另一个代理表可以存储其行走或奔跑的动画集。

要创建代理表资产，请使用 **内容浏览器（Content Browser）** 中的（**+**）**添加（Add）** 并找到 **杂项（Miscellaneous）** > **代理表（Proxy Table）** 。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8433f813-aae7-4173-b88a-ced3c88f6c35/image_7.png)

你需要为每个需要不同动画集的上下文情况创建代理表资产，例如为徒手角色和持手枪或步枪的角色创建移动动画集。

创建代理表资产之后，打开资产以访问代理表的值。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/014f6f7b-59a4-443f-a2fe-77326eea25f5/image_8.png)

在ProxyTable中，使用（**+**） **添加行（Add Row）** ，为每个 **代理资产（Proxy Asset）** 添加一个条目并选择资产。接着你可以使用值列分配集内的关联动画资产。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/689aa591-0bcc-408e-938e-fea75744e6d6/image_9.png)

在以下工作流程示例中， `ProxyTable_Unarmed` 资产分别将 `Unarmed_Idle` 和 `Unarmed_Walk` 动画分配到了 `ProxyAsset_Idle` 和 `ProxyAsset_Walk` 行中 。而在 `ProxyTable_Pistol` 资产中，对应的代理资产行中则被分配了 `Pistol_Idle` 和 `Pistol_Walk` 动画。

ProxyTable\_Unarmed

ProxyTable\_Pistol

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d0cd476-0e0b-416a-a9c6-567e1e98f174/unarmed.png)

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e38903a-7454-4be0-8fc7-ff2fa7c0537b/pistol.png)

值列还包含 **类（Class）** 引用、 **选择器资产（Chooser Asset）** 或 **查找代理（Lookup Proxy）** ，用于更多动态动画选择系统。

### 在运行时使用代理表

你可以在Sequence Player节点上使用[动画节点函数](/documentation/zh-cn/unreal-engine/animation-blueprint-node-functions-in-unreal-engine)，在运行时使用代理表资产。要创建新函数来选择代理表资产，请选择Sequence Player节点，并在 **On Update** 绑定处添加新函数。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7756fc3e-2caa-4416-bd7c-b71579dae4b7/image_10.png)

从 **On Update** 节点添加 **Evaluate Proxy** 节点。![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2944a2ac-a88a-4bb7-89e0-80cc762be931/image_11.png)

然后选择该节点并使用下拉菜单在代理属性中选择代理资产。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bdfdf121-5db2-477b-a35d-a31341743682/image_12.png)

然后将结果提升到变量，并将输出连接到Sequence Player节点。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/581c5634-5236-45dd-80ac-9903254cb143/image_13.png)

接着，你可以使用各种方法（例如选择器表）在Evaluate Proxy节点上设置活动代理表资产，以动态地更改驱动角色的动画集。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/902c476c-8535-4597-8831-397f2d515749/image_14.gif)

### 创建选择器表资产

选择器资产用于存储由动画的各种迭代构成的动画数据集，这些迭代可以基于上下文选择和播放。例如，选择器表可能包含一组命中响应动画，其中每个条目都是根据身体被命中的不同部位（手臂、腿部、胸部、头部）做出不同响应的动画，可以基于命中部位等上下文变量进行选择。

要创建选择器表资产，请使用 **内容浏览器（Content Browser）** 中的（**+**）**添加（Add）** 并找到 **杂项（Miscellaneous）** > **选择器表（Chooser Table）** 。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/053c609f-ddf6-47a4-ac60-7ff6ce411c71/image_15.png)

创建选择器表后，你可以打开资产，访问其属性。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df7c0425-ecfe-4b6a-9330-210998107fbf/image_16.png)

使用（**+**）**添加（Add）** 在上下文数据属性中创建新数组元素，并将属性设置为 **上下文对象类型类（Context Object Type Class）**。然后展开索引数组，将 **类（Class）** 属性设置为你的角色的动画蓝图，并确保将 **方向（Direction）** 属性设置为 **读取（Read）** 。接着，你可以将输出对象类型设置为你使用的动画资产。此工作流程示例使用动画序列，因此选择了 **AnimSequenceBase** 类选项。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62fecb15-1105-4ec5-857e-3b8bde47eae4/image_17.png)

现在，你可以使用（**+**） **添加列（Add Column）** 按钮在选择器表面板中添加列，以设置你希望影响其选择过程的动画蓝图中的变量。创建列后，你可以定义动画蓝图中哪个变量可以影响选择，以及每行中为了选择动画序列资产而必须达到的变量值或状态。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5a67780-e5a3-4977-9dd5-776fde6aa99a/image_18.png)

在此工作流程示例中，布尔变量 `IsCrouching` 将在值为false时选择 `MM_HangingIdle` 动画，二在值为true时选择 `MM_Rifle_Walk_Left` 。`MoveemntAngle` 变量将在值介于 `-100` 到`100` 之间时选择 `MM_HangingIdle` ，而只在值为 `0.0` 时选择 `MM_Rilfe_Walk_Left` 动画。

为了使用此选择过程驱动角色的动画，你必须将代理表条目设置为 **Evaluate Chooser** 并分配选择器表资产。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f4d7da4-3190-4ce9-896b-946ea12c1e55/image_19.png)

现在所选动画将基于活动代理表资产和选择器表所做的选择而变化。

你还可以在动画蓝图图表或状态机中使用Evaluate Chooser节点，从而只使用ChooserTables，而不使用ProxyTables。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3cbd337a-fedf-4d0c-b646-4d6cafc2b013/image_20.png)

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/dynamic-asset-selection-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [设置动画选择系统](/documentation/zh-cn/unreal-engine/dynamic-asset-selection-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%8A%A8%E7%94%BB%E9%80%89%E6%8B%A9%E7%B3%BB%E7%BB%9F)
-   [创建代理资产](/documentation/zh-cn/unreal-engine/dynamic-asset-selection-in-unreal-engine#%E5%88%9B%E5%BB%BA%E4%BB%A3%E7%90%86%E8%B5%84%E4%BA%A7)
-   [动画蓝图设置](/documentation/zh-cn/unreal-engine/dynamic-asset-selection-in-unreal-engine#%E5%8A%A8%E7%94%BB%E8%93%9D%E5%9B%BE%E8%AE%BE%E7%BD%AE)
-   [创建代理表资产](/documentation/zh-cn/unreal-engine/dynamic-asset-selection-in-unreal-engine#%E5%88%9B%E5%BB%BA%E4%BB%A3%E7%90%86%E8%A1%A8%E8%B5%84%E4%BA%A7)
-   [在运行时使用代理表](/documentation/zh-cn/unreal-engine/dynamic-asset-selection-in-unreal-engine#%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E4%BD%BF%E7%94%A8%E4%BB%A3%E7%90%86%E8%A1%A8)
-   [创建选择器表资产](/documentation/zh-cn/unreal-engine/dynamic-asset-selection-in-unreal-engine#%E5%88%9B%E5%BB%BA%E9%80%89%E6%8B%A9%E5%99%A8%E8%A1%A8%E8%B5%84%E4%BA%A7)