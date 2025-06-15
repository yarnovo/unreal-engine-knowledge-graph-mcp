# 在虚幻引擎Sequencer中控制动画蓝图参数 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/control-animation-blueprint-parameters-from-sequencer-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:14:34.842Z

---

目录

![使用Sequencer控制动画实例](https://dev.epicgames.com/community/api/documentation/image/c42663cb-8d6c-4234-8264-4b91d302af44?resizing_type=fill&width=1920&height=335)

在Sequencer中可以通过可占据项（Possessable）为动画实例上的变量设置动画，让你直接控制动画蓝图变量、函数和其他内容。你可以通过添加骨架网格体组件轨迹来获取动画实例轨迹，其中任何公开给过场动画的变量都将显示并可用于设置关键帧。

在本操作指南中，我们通过为Sequencer中的属性更改设置关键帧，将动画蓝图中定义的多个动画动作混合。

## 步骤

此指南使用新增的 **蓝图第三人称（Blueprint Third Person@@@）** 模板项目。

1.  在 **Content/Mannequin/Character/Mesh** 文件夹中，右键单击 **SK\_Mannequin**，然后选择 **创建（Create）** 下的 **动画蓝图（Anim Blueprint）**，并以任意名称为其命名。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c11d16d-5121-4a30-98be-8effe0348d71/image_1.png)

1.  在 **内容浏览器（Content Browser）** 中单击鼠标右键，然后在 **蓝图（Blueprints）** 下选择 **列举（Enumeration）**，再将其命名为 **MoveType**。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9fe49ff-c394-4d03-8ed7-9368666b5ce8/image_2.png)

1.  创建三个名为 **Idle、Walk** 和 **Run** 的列举项，只需单击 **新建（New）** 按钮即可。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/574287b1-3466-42da-85c9-6a8165751916/image_3.png)

1.  打开第1步中创建的 **动画蓝图**，创建 **MoveType** 类型变量，将其命名为 **MoveType** 并启用 **公开给过场动画（Expose to Cinematics）**。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d4751b6-2d43-4166-a3c2-df857d1c3afd/image_4.png)

1.  在 **动画图表** 中，添加 **ThirdPersonIdle、ThirdPersonWalk** 和 **ThirdPersonRun** 动画以及 **按运动类型混合动作（Blend Poses by Move Type）** 节点。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/282af6d3-525e-42d7-a621-aabcb9bcdcea/image_5.png)

1.  右键单击 **混合动作（Blend Poses）** 节点，然后为 **Idle、Walk** 和 **Run** 添加引脚。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b607c5a4-0a88-4b58-a176-a242eeaca0ce/image_6.png)

1.  将 **Move Type** 变量添加到图表中，然后将各个节点连接到 **最终动画动作（Final Animation Pose）**，如下图所示。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6eda61b2-08b1-400b-a87f-ae39ad62d8f0/image_7.png)

1.  将 **动画蓝图** 拖动到关卡中，然后创建新的 **关卡序列** （以任意名称为其命名）并将动画蓝图添加到序列中。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52a8416b-11ec-40c4-8953-d6edb053a952/image_8.png)

1.  单击动画蓝图上的 **\+ 轨迹（Track）** 按钮，添加 **SkeletalMeshComponent0** 轨迹。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ce323b4-c75c-4f95-b6c2-4761cd123a56/image_9.png)

1.  单击SkeletalMeshComponent上的 **\+ 轨迹（Track）** 按钮，添加 **动画实例（Anim Instance）** 轨迹。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea7a8175-5212-4cb6-9bcc-4c74e5b5fdb9/image_10.png)

1.  单击动画实例上的 **\+ 轨迹（Track）** 按钮，添加 **Move Type** 属性。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/472e139e-741c-443a-8e99-ba287a58afdb/image_11.png)
2.  把时间轴拉到第 **45** 帧，将 **Move Type** 下拉菜单更改为 **Walk**，添加一个关键帧。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/906f1419-5c9d-48ab-ab23-01588f6df302/image_12.png)
3.  把时间轴拉到第 **90** 帧，将 **Move Type** 下拉菜单更改为 **Run**，添加另一个关键帧。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4217054b-a87c-46ad-8bef-e59025cec80a/image_13.png)
4.  在第 **120** 帧处为 **Move Type** 添加设置为 **Walk** 的关键帧，并在第 **150** 帧处添加另一个关键帧，设置为 **Idle。**
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc41c978-34db-4384-b108-8311c04c8ceb/image_14.png)
5.  在 **细节（Details）** 面板中将关卡序列设置为 **自动播放（Auto Play）**，然后单击 **播放（Play）** 或 **模拟（Simulate）** 按钮，以在编辑器中播放/模拟。
    

## 最终结果

在播放或模拟时，关卡序列将播放角色状态，并按照序列中定义的 **Move Type** 关键帧属性更改角色的状态。当角色的动作逻辑是由动画蓝图驱动时，无论想要控制角色通过序列进入何种动作，为变量属性设置动画都会非常有用。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/control-animation-blueprint-parameters-from-sequencer-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/control-animation-blueprint-parameters-from-sequencer-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)