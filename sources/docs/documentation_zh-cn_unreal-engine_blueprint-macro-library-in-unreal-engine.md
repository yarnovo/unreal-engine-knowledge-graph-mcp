# 虚幻引擎蓝图宏库 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprint-macro-library-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:44.568Z

---

目录

![蓝图宏库](https://dev.epicgames.com/community/api/documentation/image/781e5ca8-9b32-4a08-a8fd-ed514cb5a8c9?resizing_type=fill&width=1920&height=335)

**蓝图宏库（Blueprint Macro Library）** 是一个容器，它包含一组 **宏** 或自包含的图表，这些图表可以 作为节点放置在其他蓝图中。它们可以节省时间，因为它们可以存储常用的节点序列， 包括执行和数据传输所需的输入和输出。

宏在引用它们的所有图表之间共享，但是它们会自动扩展到图表中， 就像它们在编译期间是一个折叠节点那样。这意味着蓝图宏库不需要编译。但是， 对宏的更改仅反映在重新编译包含这些图表的蓝图时 引用该宏的图表中。

## 创建蓝图宏库

蓝图宏库存储在包中，可以像任何其他资源一样通过 **内容浏览器（Content Browser）** 创建。

1.  在 **内容浏览器（Content Browser）** 中，单击![New Asset button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8c427ff-1374-4a39-b092-c8aa73f22b70/button_new_asset_blueprint.png)。
    
2.  从显示的菜单中，选择 **创建高级资源（Create Advanced Asset）** 下的 **蓝图（Blueprints）> 蓝图宏库（Blueprint Macro Library）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbac1fae-c62c-4d93-ac37-d86554f1652d/new_asset_macrolib.png)
3.  为您的蓝图宏库选择一个 **父类（Parent Class）**。
    
    ![Choose a Parent Class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14ec613c-0189-4248-b0ff-4181fc3a9244/new_asset_parent_class.png)
4.  您的蓝图宏库现在将显示在 **内容浏览器（Content Browser）** 中。在 **内容浏览器** 中的蓝图宏库图标下键入该蓝图宏库的名称。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd1a5128-8e90-4ce7-82bc-86c063d478d0/name_macro_library.png)
    
    首次创建您的蓝图宏库时，或者当您在 **蓝图编辑器（Blueprint Editor）** 中对其进行更改时，星号将添加到 **内容浏览器（Content Browser）** 中的蓝图宏库图标中。这表示蓝图宏库尚未保存。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2378f987-da48-46bf-9dee-6e2740a7f153/unsaved_macro_library.png)

还有两种其他方法可以从 **内容浏览器（Content Browser）** 访问蓝图宏库创建（Blueprint Macro Library Creation）菜单。

1.  **右键单击** **内容浏览器（Content Browser）** 的资源视图（Asset View）（右侧）面板，或单击 **内容浏览器（Content Browser）** 的资源树（Asset Tree）（左侧）的文件夹。
    
2.  在显示的菜单中，选择 **创建高级资源（Create Advanced Asset）** 下的 **蓝图（Blueprints）> 蓝图宏库（Blueprint Macro Library）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7286ba65-e2ef-41e6-a0a9-29270677ee59/rt_click_content_browser_macrolib.png)
3.  **选取父类（Pick Parent Class）** 窗口随即显示，从这里开始，蓝图宏库创建过程与使用 **新资源（New Asset）** 按钮时相同。
    

## 蓝图宏

**蓝图宏（Blueprint Macros）** 或 **宏（Macros）** 本质上与节点的折叠图相同。它们有一个由隧道节点 指定的入口点和出口点。每个隧道都可以有任意数量的执行或数据引脚，当在其他蓝图和图表中使用时， 这些引脚在宏节点上可见。

### 创建蓝图宏

蓝图宏可以在蓝图类或关卡蓝图中创建，就像蓝图函数一样。它们还可以组织到蓝图宏库中。

若要在蓝图类、关卡蓝图或蓝图宏库中创建蓝图宏，请执行以下操作：

1.  在 **我的蓝图（My Blueprint）** 选项卡中，单击宏列表标头![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12c7ea9c-07f8-499a-be03-97c937b31ecb/myblueprint_macro.png)上的 **添加按钮（Add Button）**![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9011e106-92b1-400f-a082-09c0bb5f0f86/plus_button.png)创建一个新宏。
    
2.  为您的蓝图宏输入一个名称。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2423cb3f-9f1f-416c-9893-84af2bb9dec1/name_macro_blueprint.png)

您的蓝图宏将在蓝图编辑器的 **图表（Graph）** 选项卡中的新选项卡中打开。

您还可以通过在 **我的蓝图（My Blueprint）** 选项卡中 **右键单击** 并选择 **宏（Macro）** 来创建蓝图宏。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a17a0685-67c0-43c9-9048-9bee81ea6d44/add_macro_rtclick.png)

### 构建蓝图宏

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

### 使用存储在蓝图宏库中的宏

将宏存储在蓝图宏库中可以让整个项目中的蓝图类和关卡蓝图都能够访问它们。

有几种方法可以将宏节点添加到另一个蓝图图表中。与函数节点和自定义事件调用节点一样，您可以在蓝图中的整个图表 中添加多个宏节点副本。

若要添加一个宏，请在图表中 **右键单击**，并在显示的上下文菜单中选择该宏。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b783f6fd-d3bd-4558-8ce0-d12f0e1940ec/right_click_add_macro.png)

您还可以拖放另一个节点的引脚，如果该宏具有相应变量类型和流方向的参数引脚，它将显示在上下文菜单中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3da7c724-628f-4493-a6bb-d0440ba9b9c6/pin_macro_summon.png)

一旦您将宏节点添加到图表中，它会表现出像任何其他节点一样的行为，且输入和输出引脚可以相应地连接。**双击** 任何蓝图图表中的宏节点 将打开该宏的图表。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建蓝图宏库](/documentation/zh-cn/unreal-engine/blueprint-macro-library-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%93%9D%E5%9B%BE%E5%AE%8F%E5%BA%93)
-   [蓝图宏](/documentation/zh-cn/unreal-engine/blueprint-macro-library-in-unreal-engine#%E8%93%9D%E5%9B%BE%E5%AE%8F)
-   [创建蓝图宏](/documentation/zh-cn/unreal-engine/blueprint-macro-library-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%93%9D%E5%9B%BE%E5%AE%8F)
-   [构建蓝图宏](/documentation/zh-cn/unreal-engine/blueprint-macro-library-in-unreal-engine#%E6%9E%84%E5%BB%BA%E8%93%9D%E5%9B%BE%E5%AE%8F)
-   [使用存储在蓝图宏库中的宏](/documentation/zh-cn/unreal-engine/blueprint-macro-library-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%AD%98%E5%82%A8%E5%9C%A8%E8%93%9D%E5%9B%BE%E5%AE%8F%E5%BA%93%E4%B8%AD%E7%9A%84%E5%AE%8F)