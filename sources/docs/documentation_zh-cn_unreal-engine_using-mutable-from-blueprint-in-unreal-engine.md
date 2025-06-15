# 在虚幻引擎中从蓝图使用Mutable | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-mutable-from-blueprint-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:03:46.515Z

---

目录

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

你可以使用以下文档了解如何在蓝图中设置和使用Mutable角色。

## 创建可自定义角色

你可以使用以下步骤在蓝图中创建一个新的Mutable角色。

1.  创建一个新的 **Actor** 蓝图。创建蓝图后，为该资产命名并打开它。
    
    ![自定义蓝图actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08e278dd-c0ad-4095-942b-31d0ef7d41c7/image_0.png)
    
    或者，你也可以使用具有骨骼网格体组件的类/蓝图。
    
2.  在蓝图编辑器的 **组件（Components）** 面板中，选择 **骨骼网格体（Skeletal Mesh）** 组件，然后添加新的 **可自定义骨骼（Customizable Skeletal）** 组件作为子组件。
    
    ![添加可自定义骨骼网格体组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ed3d5d6-ba80-4038-b1f4-03859ecf002c/image_1.png)
3.  将 **骨骼网格体（Skeletal Mesh）** 组件和 **可自定义骨架（Customizable Skeletal）** 组件分别命名为 `Body` 和 `Body_CO` 。
    
    ![命名形体组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e23470ad-480d-4b5a-a59f-3343c01b3eba/image_2.png)
4.  选择 **骨骼网格体（Skeletal Mesh）** 组件，然后在 **细节（Details）** 面板中找到 **可自定义骨骼网格体（Customizable Skeletal Mesh）** 分段，并使用资产选择下拉菜单在 **可自定义对象实例（Customizable Object Instance）** 属性中设置要使用的实例。
    
    ![在细节面板中选择实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01a3bbe9-384a-42da-bd75-8d5ef00626d4/image_3.png)
5.  然后，将骨骼网格体组件的 **组件名称（Component Name）** 属性设置为 `Body` 。经过此操作，你将在蓝图的视口中看到角色的形体。
    
    ![视口中的角色形体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d71fb7c3-3d7a-41c6-b015-5e41cff1e7f8/image_4.png)
6.  接下来，为角色的头部添加一个新的 **骨骼网格体（Skeletal Mesh）** 组件。它应该是 `Body` 骨骼网格体组件的子组件。然后将新的骨骼网格体组件命名为 `Head` 。
    
    ![在组件面板中添加头部形体组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc41eec9-ebfb-4a88-b34c-43bbe5667a68/image_5.png)
7.  创建一个新的 **可自定义骨架（Customizable Skeletal）** 组件，作为 `Head` 骨骼网格体组件的子组件，并将其命名为 `Head_CO` 。
    
    ![添加可自定义骨架组件至头部组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/beeaf60f-0055-4088-afb3-afc11fcf4904/image_6.png)
8.  选择 `Head` **骨骼网格体（Skeletal Mesh）** 组件，添加我们已添加到形体组件的相同实例，然后将 **组件名称（Component Name）** 属性设置为 `Head` 。
    
    ![设置头部实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/892f99c6-157b-4d73-8e27-5135ee7dbf26/image_7.png)

现在，你的Mutable角色已在Actor蓝图中设置完成，并且在蓝图视口中可见。

![完成的角色设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5635899c-8f0f-4cb1-86e2-3710d52b83cc/image_8.png)

## 更改参数

参数由实例存储，可以使用API节点进行访问或修改。你可以参考以下示例，了解如何根据参数类型设置参数值。

### 布尔参数

![布尔参数设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e8aa24e-450c-4991-bc74-6fbe68290d72/image_9.png)

### 整型参数

务必确保所需选项实际存在于实例中。使用 **FindParameter** 节点搜索现有参数，然后使用 **GetIntParameterAvailableOption** 节点获取可用选项。这两个节点都必须使用 `CustomizableObject` 参考变量作为目标，可以通过 `CustomizableObjectInstance` 参考变量访问。

![整形参数设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/000443cc-d8bb-49f0-9f34-c29f5cf931b2/image_10.png)

### 浮点参数

![浮点参数设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f22d433-ebbf-4cbe-8d45-c3a0b3d3fff0/image_11.png)

### 颜色参数

![颜色参数设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ded22f11-a3c0-4325-b5c1-18de5d8588f5/image_12.png)

### 投射器参数

![投射器参数设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e39e7bb-bc3f-4c43-8d3d-3b89c6909538/image_13.png)

## 更新实例

要应用参数的最新更改，需要更新实例。在一次或多次更改之后，添加一个 **UpdateSkeletalMeshAsync** 节点，即可实现此操作。

![更新实例示例蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd0eb88d-fa54-4469-9fbe-3959306c504c/image_14.png)

## 更新的委托

可以将事件注册到此委托。广播将在骨骼网格体更新完成后进行。

将事件绑定到更新的委托

从更新的委托取消绑定事件

![bind event to updated delegate节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0ab0201-368a-4b3f-86d0-3ea9cdf2c483/image_15.png)

![unbind event to updated delegate节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcdfacc4-2395-48e1-bcb3-cb3b4cb0ee84/image_16.png)

## 参数信息

有时，实例中的参数数量、参数类型或整型参数选项名称等其他信息可能会很有用。这些信息保存在源 `CustomizableObject` 参考变量中，可通过实例访问，并且可以使用以下节点进行检索：

节点

图像

**Get Parameter Count**

![get parameter count节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9a036e6-26de-41d6-ac79-bc9f21017381/image_17.png)

**Get Parameter Name**

![get parameter name节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb5c370a-7f96-4f87-9bfd-e72fa8d197ad/image_18.png)

**Get Parameter Type by Name**

![get parameter type by name节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/662d00f2-3533-43c8-83e5-bbf94e6ae7b1/image_19.png)

**Find Parameter**

![find parameter节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9484d61-d383-4989-9220-ceea5c637452/image_20.png)

**Get Int Parameter Num Options**

![get int parameter num options节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffb3020d-6142-4703-b5f1-e4cae894bb82/image_21.png)

**Get Int Parameter Available Option**

![get int parameter available option节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da4bc18d-63df-4cbb-a9e5-f0dc1076cbfa/image_22.png)

## 更改状态

你也可以使用节点API查询和更改状态：

![get current state节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b97576af-d968-486c-8303-e416314a6a8d/image_23.png)

与更改参数时一样，在更改状态后需要使用UpdateSkeletalMeshAsync节点更新实例。

![使用当前状态变量设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8750693e-54d6-4a19-b5f1-7a9609ed2258/image_24.png)

## 状态信息

了解 **可自定义对象** 所拥有的状态数量和名称，以及某个状态中参数的数量和名称等信息，可能会很有用。这些信息按 **可自定义对象** 存储，可通过 **CustomizableObjectInstance** 访问，并且可以使用以下节点进行检索：

节点

图像

**Get State Count**

![get state count节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/306a87e4-b563-415c-8128-503a4e77fb37/image_25.png)

**Get State Name**

![get state name节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07c94247-2969-46a6-8216-304124bc94c0/image_26.png)

**Get State Parameter Count**

![get state parameter count节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58ca3c92-d53b-47d1-8c8d-85d0fd53a5cc/image_27.png)

**Get State Parameter Name**

![get state parameter name节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49d6c6ad-d5de-4c53-9844-e29c6f96e73b/image_28.png)

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [mutable](https://dev.epicgames.com/community/search?query=mutable)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建可自定义角色](/documentation/zh-cn/unreal-engine/using-mutable-from-blueprint-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8F%AF%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A7%92%E8%89%B2)
-   [更改参数](/documentation/zh-cn/unreal-engine/using-mutable-from-blueprint-in-unreal-engine#%E6%9B%B4%E6%94%B9%E5%8F%82%E6%95%B0)
-   [布尔参数](/documentation/zh-cn/unreal-engine/using-mutable-from-blueprint-in-unreal-engine#%E5%B8%83%E5%B0%94%E5%8F%82%E6%95%B0)
-   [整型参数](/documentation/zh-cn/unreal-engine/using-mutable-from-blueprint-in-unreal-engine#%E6%95%B4%E5%9E%8B%E5%8F%82%E6%95%B0)
-   [浮点参数](/documentation/zh-cn/unreal-engine/using-mutable-from-blueprint-in-unreal-engine#%E6%B5%AE%E7%82%B9%E5%8F%82%E6%95%B0)
-   [颜色参数](/documentation/zh-cn/unreal-engine/using-mutable-from-blueprint-in-unreal-engine#%E9%A2%9C%E8%89%B2%E5%8F%82%E6%95%B0)
-   [投射器参数](/documentation/zh-cn/unreal-engine/using-mutable-from-blueprint-in-unreal-engine#%E6%8A%95%E5%B0%84%E5%99%A8%E5%8F%82%E6%95%B0)
-   [更新实例](/documentation/zh-cn/unreal-engine/using-mutable-from-blueprint-in-unreal-engine#%E6%9B%B4%E6%96%B0%E5%AE%9E%E4%BE%8B)
-   [更新的委托](/documentation/zh-cn/unreal-engine/using-mutable-from-blueprint-in-unreal-engine#%E6%9B%B4%E6%96%B0%E7%9A%84%E5%A7%94%E6%89%98)
-   [参数信息](/documentation/zh-cn/unreal-engine/using-mutable-from-blueprint-in-unreal-engine#%E5%8F%82%E6%95%B0%E4%BF%A1%E6%81%AF)
-   [更改状态](/documentation/zh-cn/unreal-engine/using-mutable-from-blueprint-in-unreal-engine#%E6%9B%B4%E6%94%B9%E7%8A%B6%E6%80%81)
-   [状态信息](/documentation/zh-cn/unreal-engine/using-mutable-from-blueprint-in-unreal-engine#%E7%8A%B6%E6%80%81%E4%BF%A1%E6%81%AF)