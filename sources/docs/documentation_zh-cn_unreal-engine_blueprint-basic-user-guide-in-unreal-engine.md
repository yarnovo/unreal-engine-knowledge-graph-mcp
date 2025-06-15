# 虚幻引擎蓝图基础用户指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprint-basic-user-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:34:45.373Z

---

目录

![蓝图基础用户指南](https://dev.epicgames.com/community/api/documentation/image/8cd61ef4-1cb8-4e71-bb7a-582567033163?resizing_type=fill&width=1920&height=335)

本页面包含 **蓝图** 的最基本用例和常用操作，帮助你快速上手。

有关蓝图的更多详细信息，请参阅 [蓝图可视化脚本](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine) 文档。

## 创建蓝图

可通过多种方法创建蓝图，第一种是通过使用 **内容浏览器** 中的 **添加（Add New）** 按钮：

1.  在 **内容浏览器（Content Browser）** 中，点击 **新增（Add New）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd00485b-136d-4cb9-ba4b-c44db3ffda64/contentbrowseraddnew.png)
2.  从下拉菜单的 **创建基本资产（Create Basic Asset）** 部分中选择 **蓝图类（Blueprint Class）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9afc6b4a-5344-460b-a361-dca0aaa6e858/contentbrowserdropdown.png)
    
    可通过 **创建高级资产（Create Advanced Asset）** 下的 **蓝图（Blueprints）** 选项来创建各种不同的[蓝图资产类型](/documentation/zh-cn/unreal-engine/types-of-blueprints-in-unreal-engine)。
    
3.  为蓝图资产选择 **父类（Parent Class）**。欲知更多信息，请参见[父类](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine#%E7%88%B6%E7%B1%BB)。
    
    ![选择父类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c3d6f5a-6e14-4027-a57c-a4e864cf4b36/new_asset_parent_class.png)

选择类之后，新的蓝图资源将添加到 **内容浏览器** 中，你可以为它指定名称。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cce8c9c7-f113-4388-8b1e-46dde2bbd377/basic4.png)

### 使用资源创建蓝图

也可以通过在 **内容浏览器** 中 **右键单击** 资源，然后在 *资源操作（Asset Actions）* 下选择 **使用此资源创建蓝图...（Create Blueprint Using This...）** 选项的方法创建蓝图。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e3fc433-36ff-42cb-87ea-d2ab115943d5/basic8.png)

只能针对支持该选项的资源——静态网格体、骨架网格体、粒子效果、声音提示或声波等——使用该选项。如果所选择的资源不支持该选项，该选项将显示为灰色。

选择 **使用此资源创建蓝图...（Create Blueprint Using This...）** 选项之后，你将收到选择保存位置的提示。确认保存位置之后，蓝图将自动在蓝图编辑器中打开。

## 在关卡中放置蓝图

要在关卡中放置蓝图，你可以...

将它从 **内容浏览器** 中 **拖放到** 关卡中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/562ba0da-0d89-4463-9374-c3613f365e5c/draganddropbp.png)

或者在 **内容浏览器** 中选中蓝图，然后在关卡中 **右键单击** 并从上下文菜单中选择 **放置Actor（Place Actor）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e81f90b-73b2-4be1-be2e-b142482f418d/rightclickmethod.png)

## 放置蓝图节点

在 **图表（Grap）** 中放置节点的方法有多种（请参阅 [放置节点](/documentation/zh-cn/unreal-engine/placing-nodes-in-unreal-engine) 了解更多信息），本部分将介绍最常用的方法以及如何连接节点。

多数情况下，可在蓝图图表中 **单击右键** 访问 **快捷菜单** 放置节点。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55a34b33-bd1e-4e97-aa69-a1fce7e5e328/rightclick1.png)

从上图菜单中展开任意类目（或子类目），然后选择需要的节点添加至图表中。

窗口右上角有一个名为 **Context Sensitive** 的选项。它为默认开启，禁用此选项后将基于当前上下文自动筛选菜单中显示的选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2569edeb-311d-4052-997a-5bd9fed5d867/rightclick2.png)

如下图所示，**Context Sensitive** 选项开启时 **单击右键** 并搜索 **Animation**，便会出现筛选列表。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11dae491-cd2d-4fdd-8dce-e28de6aee409/rightclick3.png)

然而，如取消勾选 **Context Sensitive** 并搜索 **Animation**，便会出现所有与 animation 相关的内容。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ac34ac5-37f6-4196-b2dc-c3964def199c/rightclick4.png)

图表中 **单击右键** 呼出快捷菜单，也可拖动现有节点访问快捷菜单。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6bd3600-ec9b-4fed-a12c-85fa2341e40f/rightclick5.png)

在上图中有一个 **Character Movement** 组件引用，拖动其输出引脚可添加连接上下文的节点。如下例所示，这些节点和被拖动的节点为相关。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fda258e6-9ca5-4a07-8839-05754962e1fd/rightclick6.png)

在上图中，搜索 **Set Max Walk**，然后从菜单中选择 **Set Max Walk Speed** 对角色的最高步行速度进行设置。

## 连接蓝图节点

要连接节点,从一个引脚拖出引线并连接到同一类型的另一个引脚（在一些情况下将会创建转换节点，例如，将浮点输出连接到文本输入时将会在这两个引脚之间创建转换节点并自动转换和连接这两个节点）。

以下是两个节点间的基本连接，输入引脚和输出引脚的类型相同。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79b89f8d-2deb-4435-a431-c7676f03089a/basicconnect.png)

以下是正在进行的转换的示例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/135803f9-1924-4d34-b47a-099cbcdf2742/conversionnode.png)

-   请参阅 [蓝图编辑器速查表](/documentation/zh-cn/unreal-engine/blueprint-editor-cheat-sheet-in-unreal-engine) 获取基于节点的更多操作和快捷键。

## 创建变量

**Variables（变量）** 是保存值或参考世界场景中的对象或Actor的属性。这些 属性可以由包含它们的 **蓝图（Blueprint）** 通过内部方式访问，也可以 通过外部方式访问，以便设计人员使用放置在关卡中的蓝图实例 来修改它们的值。

你可以在 **MyBlueprint** 窗口中为蓝图创建变量，方法是单击变量列表标题上的 **添加按钮 （+）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a965aa01-a34c-404f-8e59-5772d1ed6534/myblueprint_variable.png)

创建好变量之后，需要能够定义变量的属性。

-   有关变量类型和使用变量的更多信息，请参阅 [蓝图变量](/documentation/zh-cn/unreal-engine/blueprint-variables-in-unreal-engine)。

-   [class](https://dev.epicgames.com/community/search?query=class)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建蓝图](/documentation/zh-cn/unreal-engine/blueprint-basic-user-guide-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%93%9D%E5%9B%BE)
-   [使用资源创建蓝图](/documentation/zh-cn/unreal-engine/blueprint-basic-user-guide-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%B5%84%E6%BA%90%E5%88%9B%E5%BB%BA%E8%93%9D%E5%9B%BE)
-   [在关卡中放置蓝图](/documentation/zh-cn/unreal-engine/blueprint-basic-user-guide-in-unreal-engine#%E5%9C%A8%E5%85%B3%E5%8D%A1%E4%B8%AD%E6%94%BE%E7%BD%AE%E8%93%9D%E5%9B%BE)
-   [放置蓝图节点](/documentation/zh-cn/unreal-engine/blueprint-basic-user-guide-in-unreal-engine#%E6%94%BE%E7%BD%AE%E8%93%9D%E5%9B%BE%E8%8A%82%E7%82%B9)
-   [连接蓝图节点](/documentation/zh-cn/unreal-engine/blueprint-basic-user-guide-in-unreal-engine#%E8%BF%9E%E6%8E%A5%E8%93%9D%E5%9B%BE%E8%8A%82%E7%82%B9)
-   [创建变量](/documentation/zh-cn/unreal-engine/blueprint-basic-user-guide-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8F%98%E9%87%8F)

相关文档

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)

[

创建交互体验

![创建交互体验](https://dev.epicgames.com/community/api/documentation/image/0eda86f3-ba7f-4874-8cc5-635e5528cabf?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/gameplay-systems-in-unreal-engine)