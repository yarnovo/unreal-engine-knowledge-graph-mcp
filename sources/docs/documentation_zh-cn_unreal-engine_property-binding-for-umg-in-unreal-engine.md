# 虚幻引擎中的UMG属性绑定 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/property-binding-for-umg-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:18:19.666Z

---

目录

![属性绑定](https://dev.epicgames.com/community/api/documentation/image/c0f92a2b-0eaf-44b0-990d-dc1784437582?resizing_type=fill&width=1920&height=335)

UMG 最有用的一个方面是能够将控件的属性绑定到蓝图中的功能或者属性。将属性绑定到蓝图中的功能或属性变量后，只要调用功能或更新属性，都会在控件中反映出来。

## 功能绑定

举例来说，您有一个 **进度条** 控件，并且希望随时进行更新，从而反映出玩家的体力值。在进度条的 **外观** 下，您会看到 **百分比** 选项带有可以将百分比值 **绑定** 到功能或属性（如下图黄框中所示）的选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/350cce2c-e212-48ad-bdef-54aaa27c1469/apperance.png)

点击 **绑定** 按钮并选择 **创建绑定** 选项后，将创建一个新的功能并打开它。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed594a99-fba6-4023-bb99-e77b309bc8da/newfunction.png)

**返回值** 取决于百分比的值，因此您可以插入一个值来馈送进度条的数据。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f78bf3d-9f44-4f3d-98e2-988a990c1687/playerhealth.png)

如上图所示，功能从我们的角色蓝图中获得了一个名为玩家体力的变量。只要玩家体力变量更新，这种更新就会自动传递到进度条上并以进度条上的百分比反映出来。

## 属性绑定

**属性绑定** 包括指定一个绑定到控件属性的属性变量。更新属性变量后，绑定到该属性变量的设置会自动更新并反映在控件中。

下文展示了一个绑定按钮属性变量的示例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2698d16b-5c01-4615-aebf-0194a777e833/property1.png)

在上图中，我们有三个主菜单按钮：**继续**、**开始** 和 **退出**，而我们希望 **继续** 按钮只在玩家保存过游戏的情况下启用。在"继续"按钮的 **行为** 部分下，您可以取消选中 **IsEnabled**（使得按钮在默认情况下不启用）然后点击 **绑定** 按钮。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8ad6a08-2b3b-4789-a95d-936dee9a2ffb/property2.png)

在该控件蓝图的 **图形** 选项卡上，您可以创建 **布尔** 变量，创建后，可通过"绑定"按钮进行分配（下图中我们创建了一个名为 **DoesSaveExist?** 的布尔变量）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c445e6f2-0364-4303-a262-b7ce16ebbb41/property3.png)

将该变量绑定到 **IsEnabled** 行为之后，您可以在每次启动游戏时，通过检查是否存在存档文件来设置该值。如果存在，则投射到该控件蓝图以访问 **DoesSaveExist** 变量并将其设置为 *Ture*，从而启用按钮。

如果您绑定了控件的某个属性，然后直接在该控件上调用 **设置** 功能，那么将打破这种绑定关系。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [功能绑定](/documentation/zh-cn/unreal-engine/property-binding-for-umg-in-unreal-engine#%E5%8A%9F%E8%83%BD%E7%BB%91%E5%AE%9A)
-   [属性绑定](/documentation/zh-cn/unreal-engine/property-binding-for-umg-in-unreal-engine#%E5%B1%9E%E6%80%A7%E7%BB%91%E5%AE%9A)