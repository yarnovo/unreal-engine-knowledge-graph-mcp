# 虚幻引擎中的宏 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/macros-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:43.983Z

---

目录

![宏](https://dev.epicgames.com/community/api/documentation/image/74746f83-ba3f-4268-b17a-4e0ddc2db0f0?resizing_type=fill&width=1920&height=335)

**蓝图宏（Blueprint Macros）** 或 **宏（Macros）** 本质上与节点的折叠图相同。它们有一个由隧道节点 指定的入口点和出口点。每个隧道都可以有任意数量的执行或数据引脚，当在其他蓝图和图表中使用时， 这些引脚在宏节点上可见。

## 创建蓝图宏

蓝图宏可以在蓝图类或关卡蓝图中创建，就像蓝图函数一样。它们还可以组织到蓝图宏库中。

若要在蓝图类、关卡蓝图或蓝图宏库中创建蓝图宏，请执行以下操作：

1.  在 **我的蓝图（My Blueprint）** 选项卡中，单击宏列表标头![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12c7ea9c-07f8-499a-be03-97c937b31ecb/myblueprint_macro.png)上的 **添加按钮（Add Button）**![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9011e106-92b1-400f-a082-09c0bb5f0f86/plus_button.png)创建一个新宏。
    
2.  为您的蓝图宏输入一个名称。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2423cb3f-9f1f-416c-9893-84af2bb9dec1/name_macro_blueprint.png)

您的蓝图宏将在蓝图编辑器的 **图表（Graph）** 选项卡中的新选项卡中打开。

您还可以通过在 **我的蓝图（My Blueprint）** 选项卡中 **右键单击** 并选择 **宏（Macro）** 来创建蓝图宏。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a17a0685-67c0-43c9-9048-9bee81ea6d44/add_macro_rtclick.png)

## 构建蓝图宏

当您第一次创建蓝图宏时，将打开一个包含 **输入（Inputs）** 隧道节点和 **输出（Outputs）** 隧道节点的新图表。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88eeb969-4dce-45e6-b9e9-d89a745cc9a1/input_output_macro.png)

在蓝图宏的 **细节（Details）** 窗格中，可添加输入和输出执行引脚和数据引脚。您还可以设置蓝图宏的 **描述（Description）**、**类别（Category）** 和 **实例颜色（Instance Color）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34f1cfd0-86a2-4f97-99dc-97da1ff9342b/new_macro_details.png)

若要添加输入或输出参数，请执行以下操作：

1.  在 **细节（Details）** 窗格的 **输入（Inputs）** 或 **输出（Outputs）** 部分中，单击 **新建（New）** 按钮。
    
2.  命名新参数并使用下拉菜单设置其类型。在本例中，有一个名为 **分数（Score）** 的整数数据输入参数，一个名为 **测试（Test）** 的输入执行引脚，以及两个名为 **赢（Win）** 和 **输（Lose）** 的输出执行引脚。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d15e100-be3e-4aa7-a733-2cf967fab1e0/macro_details.png)
    
    蓝图宏图表中的隧道节点将使用正确的引脚自动更新。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d934cd3-1fda-4b40-b90b-f987491decf8/macro_tunnels_with_pins.png)
3.  您还可以通过展开参数的条目来设置默认值。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e92fbded-1ea9-49ea-a43f-a8c7519f71ff/macro_details_expanded.png)

若要更改此参数在节点边缘上的引脚位置，请在展开的 **细节（Details）** 窗格条目中使用向上和向下箭头。

若要为蓝图宏提供一些功能，请将数据和执行导线连接到您的 **输入（Inputs）** 和 **输出（Outputs）** 隧道节点的引脚，并在它们之间创建一个网络。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/615cbbf2-3c3a-4e28-8798-080c8ec5a06b/score_comparison_example_macro.png)

这个示例蓝图宏检查输入到宏中的分数是否大于获胜所需的分数， 然后根据比较结果触发不同的输出执行流。注意，这里使用 **细节（Details）** 窗格中的向上和向下箭头翻转了 **测试（Test）** 和 **分数（Score）** 引脚，以避免蓝图宏图表中的导线交叉。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94f6e5da-dbc5-4ff9-a4fb-a72581be253f/move_pin_arrows.png)

与函数不同，宏可以有多个输出执行引脚，因此可以有根据图表逻辑的结果 激活不同输出执行引脚的执行流。此外，只要宏中的节点不是执行节点，您就可以拥有一个没有执行引脚的宏，该宏只操作数据。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17359d60-8115-468e-acd5-5b60c15b24ec/data_macro.png)

### 实施宏

有几种方法可以将宏节点添加到另一个蓝图图表中。与函数节点和自定义事件调用节点一样，您可以在蓝图中的整个图表 中添加多个宏节点副本。

若要添加一个宏，请在图表中 **右键单击**，并在显示的上下文菜单中选择该宏。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b783f6fd-d3bd-4558-8ce0-d12f0e1940ec/right_click_add_macro.png)

您还可以拖放另一个节点的引脚，如果该宏具有相应变量类型和流方向的参数引脚，它将显示在上下文菜单中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3da7c724-628f-4493-a6bb-d0440ba9b9c6/pin_macro_summon.png)

或者，您可以从 **我的蓝图（My Blueprint）** 选项卡中将宏拖放到图表中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84287a9f-ae0f-44d7-a569-29d2c9d6ed2c/macro_drag_1.png)

一旦您将宏节点添加到图表中，它会表现出像任何其他节点一样的行为，且输入和输出引脚可以相应地连接。**双击** 宏节点会打开该宏的图表。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建蓝图宏](/documentation/zh-cn/unreal-engine/macros-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%93%9D%E5%9B%BE%E5%AE%8F)
-   [构建蓝图宏](/documentation/zh-cn/unreal-engine/macros-in-unreal-engine#%E6%9E%84%E5%BB%BA%E8%93%9D%E5%9B%BE%E5%AE%8F)
-   [实施宏](/documentation/zh-cn/unreal-engine/macros-in-unreal-engine#%E5%AE%9E%E6%96%BD%E5%AE%8F)