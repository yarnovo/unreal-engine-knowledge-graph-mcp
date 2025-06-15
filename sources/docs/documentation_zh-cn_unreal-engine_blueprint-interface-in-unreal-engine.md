# 虚幻引擎中的蓝图接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:38.670Z

---

目录

![蓝图接口](https://dev.epicgames.com/community/api/documentation/image/f860ba91-ec5a-420d-8534-fbc7fcc53602?resizing_type=fill&width=1920&height=335)

**蓝图接口（Blueprint Interface）** 是一个或多个函数的集合 - 只有名称，没有实施 -  
可以添加到其他蓝图中。任何添加了该接口的蓝图都保证拥有这些函数。接口的函数 可以在添加它的每个蓝图中提供功能。在本质上，这类似于一般编程中的接口概念， 它允许多个不同类型的对象通过一个公共接口 共享和被访问。简单地说，蓝图接口允许不同的蓝图相互共享和发送数据。

内容创建者可以通过编辑器以与其他蓝图类似的方式创建蓝图接口， 但它们仍有一定的局限性，原因在于以下操作不可执行：

-   添加新变量
-   编辑图表
-   添加组件

蓝图接口的使用提供了一种实现与多个不同类型的对象交互的通用方法， 这些对象都共享某些特定的功能。这意味着您可以拥有完全不同类型的对象，比如一辆车和一棵树，它们有一个共同的特点， 那就是它们都可以被武器射击并受到伤害。通过创建包含"OnTakeWeaponFire"函数的蓝图接口，并让车和树都实施该蓝图接口， 您可以将车和树视为同一类型， 在它们被击中时只需调用"OnTakeWeaponFire"函数。请阅读有关如何在 [在蓝图中实现接口](/documentation/zh-cn/unreal-engine/implementing-blueprint-interfaces-in-unreal-engine)页面上实施蓝图接口的信息。

## 创建蓝图接口

在 **内容浏览器（Content Browser）** 中点击 **Add**，然后选择 **蓝图（Blueprints） > 蓝图接口（Blueprint Interface）**。命名新接口。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e10b304-b469-4b9d-addb-fcb78904abf1/createinterface.png)

你还可以右键点击 **内容浏览器（Content Browser）** 中点击 **Add**，然后选择 **蓝图（Blueprints） > 蓝图接口（Blueprint Interface）**。

![](createdblueprintinterface.png)

创建完毕后，您需要编辑接口的函数。

## 编辑蓝图接口

蓝图接口在 **蓝图编辑器（Blueprint Editor）** 中编辑。由于您不能创建自己的变量、图表或组件，所以编辑接口的过程与编辑标准蓝图类的过程截然不同。

当您首次打开一个新接口时，编辑器如下图所示：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da8ac411-21d0-4f45-bbf7-adbf49b2463a/interfaceeditor.png)

如果您刚刚创建了接口，您将看到编辑器为您创建了一个名为 **NewFunction\_0** 的新空白函数，它将被突出显示以便您重命名。

### 添加函数

函数是接口的主要组件。接口函数没有实施。它们只是作为输入和输出的定义而存在。这些函数可以用于通过接口发送数据，也可以在实施该接口的任何蓝图中被覆盖。

若要添加新函数，请执行以下操作：

1.  在 **我的蓝图（My Blueprint）** 选项卡中，单击函数一栏旁的 **+** 图标。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f74408d-b9ac-4814-bea0-49b9f72c3761/addmyfunction.png)
2.  在 **我的蓝图（My Blueprint）** 窗格中，输入新函数的名称。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef8577b0-ad98-4eb2-b650-f81e1048f24b/renamemyfunction.png)
3.  新图表区域将与新函数一同显示。请注意，该函数既没有输入，也没有输出。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13a4817a-b51d-426a-9373-1ecaa0d8f3a3/newfunctioncreated.png)

### 编辑函数签名

由于接口函数没有实施，作为设计人员，您所能做的就是指定一系列类型化输入和输出。

若要编辑函数的签名，请执行以下操作：

1.  在 **细节（Details）** 选项卡中，滚动到 **输入** 类别，点击 **+** 创建新的输入参数。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cd26160-94f2-4372-a770-5f3bf77fb787/details_signature.png)
2.  根据需要设置输入名称（Input Name）和类型（Type）。您还可以使用名称旁边的![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30a52fad-0605-430c-a88c-22a58cd23ea3/button_dropdownarrow.png)按钮展开输入，从而设置默认值（Default Value）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd701fb4-2659-4ee9-b54a-50c08318cd88/floatinput-graph.png)
3.  输出也可以通过相同的方式来添加。请注意图表如何自动更新以显示它们。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f03ffdd-f460-448d-ac22-5b850f714220/outputbool-graph.png)

### 其他注意事项

-   在任何输入和输出参数上，您可以单击![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d273df9e-18c6-447d-bad0-106f014d2da2/button_x_remove.png)按钮以移除该参数。
    
-   可以使用参数名称字段下的小文本字段为输入参数提供默认值，但是您必须展开 **细节（Details）** 选项卡中的属性条目才能看到它。
    
-   你可以更改输入和输出参数出现在节点上的位置。拖动 **输入** 和 **输出** 的右侧边界，调整顺序。
    
-   对于包含需要跨服务器复制的函数的任何接口，您都可以使用复制（Replicates）复选框。通过单击 **类设置（Class Settings）** 按钮即可在 **细节（Details）** 选项卡中找到该复选框。
    

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建蓝图接口](/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%93%9D%E5%9B%BE%E6%8E%A5%E5%8F%A3)
-   [编辑蓝图接口](/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine#%E7%BC%96%E8%BE%91%E8%93%9D%E5%9B%BE%E6%8E%A5%E5%8F%A3)
-   [添加函数](/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%87%BD%E6%95%B0)
-   [编辑函数签名](/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%87%BD%E6%95%B0%E7%AD%BE%E5%90%8D)
-   [其他注意事项](/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine#%E5%85%B6%E4%BB%96%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)