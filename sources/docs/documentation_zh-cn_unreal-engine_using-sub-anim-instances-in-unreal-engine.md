# 使用虚幻引擎子动画实例 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-sub-anim-instances-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:10:10.789Z

---

目录

![使用子动画实例](https://dev.epicgames.com/community/api/documentation/image/e11991e7-885b-405c-abbc-dbea023ce6ed?resizing_type=fill&width=1920&height=335)

当您开始为角色创建越来越多的复杂动画蓝图时，有时候您会想要在一个动画蓝图中重复使用另一个动画蓝图的某些部分。 您不必重新创建节点网络，而是可以将该网络与其自己的动画蓝图分离开，并使用 **子动画实例** 在需要时访问动画蓝图。

在本指南中，我们将创建动画蓝图，并设计能够影响可操作角色的逻辑，然后在模板的动画蓝图中使用子动画实例来调用该逻辑。

在本操作指南中，我们将使用 **蓝图第三人称** 模板，其中启用了 **初学者内容包**。

## 步骤

1.  在 **Content/Mannequin/Animations** 文件夹中，**右键单击** 并 **复制（Duplicate）****ThirdPerson\_AnimBP**，将它命名为 **AltAnimBP**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/652dcbb3-8ec8-47e9-a18a-e2ba3f0ffa5e/subanimbp01.png)
    
    该AltAnimBP将用作从ThirdPerson\_AnimBP调用的子动画实例。
    
    创建动画蓝图以用作子动画实例时，所使用的骨架资源必须与计划在其中融入该实例的动画蓝图中的资源相同。 在我们的示例中，我们复制了模板的动画蓝图，但在从头创建动画蓝图时，您需要选择一个骨架。
    
2.  在 **AltAnimBP** 的 **AnimGraph** 中，**单击右键** 并添加 **子图输入（Sub-Graph Input）** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/405e19f1-1c90-4f29-aade-8885d728f0e9/subanimbp02.png)
    
    这样将在子动画实例上创建 **输入姿势（In Pose）**，从而允许我们将外部姿势数据传递给该动画蓝图。
    
3.  再次 **单击右键** 并添加 **FABRIK** 骨架控制节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd4954b7-ba3a-4f8d-9b3a-23587852079b/subanimbp03.png)
    
    例如，我们将使用IK在游戏期间，玩家四处奔跑时，将角色的手臂向上推入空中。
    
4.  从 **细节（Details）** 面板为 **FABRIK** 节点分配以下设置。
    
    -   取消选中 **（作为引脚）效果器转换（(As Pin) Effector Transform）**
    -   将 **位置（Location）** 设置为 **100, 0, 200**。
    -   将 **末梢骨骼（Tip Bone）** 设置为 **index\_01\_l**。
    -   将 **根骨骼（Root Bone）** 设置为 **clavicale\_l**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b03c47cc-8855-4c52-a502-945a03acdc3e/subanimbp04.png)
5.  复制图表中的 **FABRIK** 节点，并从 **细节（Details）** 面板进行以下更改。
    
    -   将 **位置（Location）** 设置为 **\-100, 0, 200**。
    -   将 **末梢骨骼（Tip Bone）** 设置为 **index\_01\_r**。
    -   将 **根骨骼（Root Bone）** 设置为 **clavicale\_r**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf8ae00f-d231-47b2-8ed6-11fbfb880b20/subanimbp05.png)
    
    这将确保左右手臂都会受影响。
    
6.  **右键单击** **FABRIK** 节点的 **Alpha** 引脚，并选择 **提升为变量（Promote to Variable）**，命名为 **效果Alpha（Effect Alpha）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/115903fc-3d98-4af3-9ec6-cbd12b0d1fe3/subanimbp05b.png)
7.  重新创建下面所示的节点网络（将自动创建 **局部到组件（Local to Component）** 和 **组件到局部（Component to Local）** 节点）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6bdab08-f8dd-4d20-8c88-b6ff4f3d0326/subanimbp06.png)
    
    如果您 **编译** 动画蓝图，预览窗口中的角色会抬起胳膊。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d48947c-7bc2-491e-8337-65772148a2e0/compliedblueprint.png)
8.  在 **内容浏览器** 中的 **Content/Mannequin/Animations** 下面，打开 **ThirdPerson\_AnimBP**。
    
9.  在 **AnimGraph** 内部，**单击右键** 并添加 **子动画实例** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cb565ce-d502-4ece-84e5-f7bf8a763a0c/subanimbp07.png)
    
    这个节点将用于获取对所创建动画蓝图的访问权。
    
10.  在 **子动画实例** 节点的 **细节（Details）** 面板中，将 **实例类（Instance Class）** 设置为 **AltAnimBP**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ed101fe-ad0c-48ef-b797-a9163a7aaa88/subanimbp08.png)
11.  单击 **效果Alpha（EffectAlpha）** 旁边的 **公开（Expose）** 复选框以公开属性。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d1928f8-ce62-4b70-9c84-4ef12a0615ab/subanimbp09.png)
    
    通过公开属性，您可以用父动画蓝图中的数据更新这些属性。
    
12.  从 **我的蓝图（MyBlueprint）** 面板，拖入 **速度（Speed）** 变量，并除以 **600**，然后插入到 **效果Alpha（Effect Alpha）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2865bc87-6296-4500-ae43-1b36af59f08f/subanimbp10.png)
    
    这里，我们用角色的移动速度除以一个值，以产生所应用的骨架控制量之间的混合。
    
13.  **编译（Compile）**，然后 **在编辑器中运行（Play in the Editor）**。
    

## 最终结果

在下面的结果中，随着角色速度的增加，用它除以指定数量，然后再用于驱动在子动画实例网络内部应用的骨架控制量。 在本示例中，我们使用了 **子图表（Sub-Graph）** 输入节点来确定产生的姿势数据，但是您也可以创建动画蓝图及其自己的状态机和逻辑来产生最终姿势数据。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation blueprint](https://dev.epicgames.com/community/search?query=animation%20blueprint)
-   [skeletal controls](https://dev.epicgames.com/community/search?query=skeletal%20controls)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-sub-anim-instances-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-sub-anim-instances-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)