# 在虚幻引擎中折叠图表 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/collapsing-graphs-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:34:41.408Z

---

目录

![折叠图表](https://dev.epicgames.com/community/api/documentation/image/3842a5e7-0c4d-426c-b50c-827549b76aba?resizing_type=fill&width=1920&height=335)

本页讲述将 **Blueprint** 图表折叠为一个单独节点、一个 **函数** 或一个 **宏** 的多种方法。将大型图表折叠为一个连接图表，便于清理。

## 折叠节点

下图表现的是最简单的折叠方法，将 **折叠节点** 转变为连接图表。它主要用于组织，使事件图表中的内容整齐清楚。

1.  在 **蓝图** 的 **图表** 上找到需要折叠的节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e7e3a91-756a-47a6-8563-ce9289b8bbe4/collapse1.png)
    
    此处有一些在玩家跳跃后减少其能量的节点。
    
2.  在节点上 **单击左键** 并拖动，选择需要折叠的所有节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16edf31d-d959-40ba-b962-0f25b3badd44/collapse2.png)
    
    可通过 **Control + 左键单击** 组合键从选择中添加/减去节点。
    
3.  选定需要折叠的节点后，在选中的任意节点上 **单击右键** 并选择 **Collapse Nodes**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69c3912b-0dc4-437d-90fe-91a7a7191f07/collapse3.png)
4.  所有节点将折叠为一个单独的 **Collapsed Graph** 节点，然后可为该节点命名。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/839fcd5f-5429-4c55-acf4-2017d673f1a4/collapse4.png)
5.  鼠标悬停在 **Collapsed Graph** 节点上，可以看到节点网络的预览窗口。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/219348b4-a663-4f15-9ef6-9e77d0a2481d/collapse5.png)
6.  **双击** **Collapsed Graph** 节点将打开含所选节点的新图表。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4a31ae2-c4de-4fe1-962c-26cbc75d5253/collapse6.png)
7.  在 **Collapsed Graph** 中，可从 **Details** 面板添加引脚至 **Inputs** 或 **Outputs** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a55c8af1-b2ac-497c-8cd8-3ebff428792c/collapse10.png)
    
    折叠时将默认添加 **Execute**，在此添加两个 Execute 输出引脚：**OutOfEnergy** 和 **CanJump**。
    
    我们也对图表进行了修改，在扣除玩家拥有的能量之前确定能量是否已经耗尽。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/530c8719-cef3-4f61-bc38-a1b728d03e1d/collapse8.png)
    
    带折叠节点的 **事件图表** 外观如下图所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae4f08e3-922c-43b4-902c-460e21b95aa6/collapse9.png)
8.  在折叠节点上 **单击右键**，可选择 **Expand Node** 将节点转换为其原始状态。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/234a0201-247f-41e0-a6b9-5cbaf751e041/collapse7.png)

## 折叠为函数

折叠节点的另一种方式是将它们折叠为一个 **函数**。较之于折叠图表，将节点折叠为函数有下列优点：基于任意指定参数在脚本的另一区域调用函数、在另一蓝图中调用函数（需为包含要调用函数的蓝图添加引用）。

下列步骤说明如何将节点折叠为函数。

1.  选中需要折叠的节点，在其中一个节点上 **单击右键** 并选择 **Collapse to Function**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/843e027c-4f49-42c1-999b-55aead96a06f/collapsefunction1.png)
2.  一个新 **Function** 将被创建，可在 **MyBlueprint** 窗口按 **F2** 键对其进行重命名。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c406dfcf-5062-4ef6-acb1-d565755939c8/collapsefunction2.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45c4a6ea-545b-4268-ba08-6624b950535e/collapsefunction3.png)
    
    在此处可对函数进行重命名。
    
3.  **双击** 函数在一个新图表窗口中将其打开。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d30ea821-e89b-4566-8888-fd0c9e2bc30a/collapsefunction4.png)
    
    和折叠图表相似，可点击 **Inputs** 或 **Outputs** 节点，通过 **Details** 面板为其添加引脚。
    
4.  可通过函数名指定其在何时被调用。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e434811-dd34-47ee-9f64-8b2ad316eda5/collapsefunction5.png)
    
    在此处，F 键被按下时将调用 **Remove Energy** 函数。
    
5.  在函数上 **单击右键** 并选择 **Expand Node** 可恢复折叠前的原始状态。
    

如需函数使用或调用的更多信息，请查阅 [函数](/documentation/zh-cn/unreal-engine/functions-in-unreal-engine) 文档。

## 折叠为宏

除折叠为折叠图表和函数外，还可将节点折叠为 **宏**。如此理解宏方为最佳：选取相连的数个节点，将它们合并为单个节点，便于执行整体操作。利用其执行高频率操作（如复杂数学方程式）十分实用。

下列步骤讲述如何将节点折叠为宏。

1.  选中需要折叠的节点，在其中一个节点上 **单击右键** 并选择 **Collapse to Macro**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41b2eeac-d6c7-4d95-8eab-3ee0410c9b3f/collapsemacro1.png)
2.  一个新宏节点创建成功，可在 **MyBlueprint** 窗口按 **F2** 键对其进行重命名。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54db786b-3cb0-4351-bbda-c4e9459e7aed/collapsemacro2.png)
3.  **双击** 可将宏打开。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f276b5d-abf2-4834-9790-9b7db23559fd/collapsemacro4.png)
    
    利用此方法可随意添加 **输入** 或 **输出** 引脚。
    
    下图事件图表应用了带额外引脚的宏。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6a8599b-a166-4fd9-9d08-2259b46a5ff9/collapsemacro5.png)
4.  在宏上 **单击右键**，可选择 **Expand Node** 将节点转换为其原始状态。
    

如需宏的更多信息，请查阅 [宏](/documentation/zh-cn/unreal-engine/macros-in-unreal-engine) 文档。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [折叠节点](/documentation/zh-cn/unreal-engine/collapsing-graphs-in-unreal-engine#%E6%8A%98%E5%8F%A0%E8%8A%82%E7%82%B9)
-   [折叠为函数](/documentation/zh-cn/unreal-engine/collapsing-graphs-in-unreal-engine#%E6%8A%98%E5%8F%A0%E4%B8%BA%E5%87%BD%E6%95%B0)
-   [折叠为宏](/documentation/zh-cn/unreal-engine/collapsing-graphs-in-unreal-engine#%E6%8A%98%E5%8F%A0%E4%B8%BA%E5%AE%8F)