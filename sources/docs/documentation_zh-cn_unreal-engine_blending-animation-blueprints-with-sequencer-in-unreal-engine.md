# 使用虚幻引擎Sequencer混合动画蓝图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blending-animation-blueprints-with-sequencer-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:14:35.906Z

---

目录

![通过Sequencer混合动画蓝图](https://dev.epicgames.com/community/api/documentation/image/9d05a0ce-721a-4e6e-8b56-2ea36df31459?resizing_type=fill&width=1920&height=335)

如果你想要将Sequencer中指定的动画与角色动画蓝图中定义的动画相混合，可以使用Sequencer中的动画轨道的 **插槽（Slot）** 节点和 **权重（Weight）** 属性来完成。 

在本示例中，我们从动画蓝图获取闲散姿势，并将它混合到Sequencer中定义的奔跑动画中。 

## 步骤

在本操作指南中，我们现在使用 **蓝图第三人称模板** 项目。

1.  在 **Content/Mannequin/Character/Mesh** 文件夹中，右键单击 **SK\_Mannequin**，然后在 **创建（Create）** 下面，选择 **动画蓝图（Anim Blueprint）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87ce5f4e-d813-4646-9376-92f370a0bc3e/animbpweight_01.png "AnimBPWeight_01.png")
    
    为动画蓝图指定任意名称和保存位置。 
    
2.  在 **动画蓝图（Anim Blueprint）** 中，拖入 **ThirdPersonIdle**，并连接到 **插槽（Slot）**节点，然后连接到 **最终动画姿势（Final Animation Pose）** 节点。 
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abd2fcb5-2036-4495-b717-581e64e02993/animbpweight_02-1.png "AnimBPWeight_02-1.png")
    
    请注意，插槽（Slot）的默认名称是 **DefaultSlot**，这是我们将在本指南中在关卡序列中引用的名称。 
    
3.  将 **动画蓝图（Anim Blueprint）** 拖到关卡，然后从主工具栏中，选择 **过场动画（Cinematics）** 并选择 **添加关卡序列（Add Level Sequence）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95452c20-67ba-4feb-9af0-7026d0c82be8/animbpweight_03-3.png "AnimBPWeight_03-3.png")
    
    给关卡序列指定任意名称和保存位置。 
    
4.  向序列添加 **动画蓝图（Anim Blueprint）** 角色，然后添加/循环 **ThirdPersonRun** 动画来填充序列。 
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95ae4eae-4d58-4fc2-82bf-211e13e1bf70/animbpweight_04.png "AnimBPWeight_04.png")
5.  展开动画轨道，然后将 **权重（Weight）** 值更改为 **0.0** 并向序列添加一个键。 
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/511365e2-9204-494d-bf04-122023c6cafd/animbpweight_05.png "AnimBPWeight_05.png")
    
    通过将权重设置为0.0，我们表示在增大权重值之前不使用该动画的任何部分。 
    
6.  为 **权重（Weight）** 添加一个键，值为 **1.0**，位于帧 **75** 处，再添加另一个键，值为 **0.0**，位于帧 **150** 处。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9121dce9-2f18-4853-87dc-29da029ccdf0/animbpweight_06.png "AnimBPWeight_06.png")
    
    这将从0.0混合到1.0（动画的完整效果），然后再回到0.0。 
    
7.  右键单击 **ThirdPersonRun** 轨道，然后在 **属性（Properties）** 下面，注意 **插槽名称（Slot Name）** 和我们添加的三个 **键（Keys）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cff127d1-1f25-44dc-9873-5da4d697ed95/animbpweight_07.png "AnimBPWeight_07.png")
    
    插槽名称是指代动画蓝图中添加的插槽节点的名称。这些名称必须相匹配，这样Sequencer才能知道你所指代的是哪个插槽，并传递权重值。 
    
8.  选择关卡序列，然后在 **细节（Details）** 面板中，启用 **自动播放（Auto Play）** 并将 **循环（Loop）** 设置为 **无限循环（Loop Indefinitely）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62f588f9-a1fd-4e0d-aefd-d202f38f312b/animbpweight_08.png "AnimBPWeight_08.png")
9.  从主工具栏，选择"在编辑器中运行"（Play in the Editor）。 
    

## 最终结果

在编辑器中运行时，角色首先为闲散姿态（这是动画蓝图中的状态），然后将混合到我们在关卡序列中指定的动画（奔跑），最后恢复为闲散姿态。 

虽然我们的示例使用闲散动画作为最终动画姿势，但使用这种方法可以生成整个状态机，以根据任意数量的系数在动画蓝图中产生最终动画姿势，然后混入关卡序列中定义动画。 

举例而言，NPC可以定义一些逻辑来控制它们所处的姿势，玩家可以接近该NPC，从而触发一个剧情画面，你可以用Sequencer中定义的动画来覆盖动画逻辑。

-   [how-to](https://dev.epicgames.com/community/search?query=how-to)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/blending-animation-blueprints-with-sequencer-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/blending-animation-blueprints-with-sequencer-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)