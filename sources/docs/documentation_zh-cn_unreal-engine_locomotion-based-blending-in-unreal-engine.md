# 虚幻引擎中基于运动的混合 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/locomotion-based-blending-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:09:41.774Z

---

目录

![基于运动的混合](https://dev.epicgames.com/community/api/documentation/image/a9e7ac55-ad03-42c2-a9f9-4987f7cdd122?resizing_type=fill&width=1920&height=335)

[混合空间](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine)就是能在 **动画图（AnimGraph）** 中采样的特殊资源，基于两个输入值实现动画混合。 可利用动画蓝图中的一个可用标准[混合节点](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine)对基于单输入的两个动画进行简易混合。 混合空间可基于多个值（目前仅限两个）实现多个动画间更为复杂的混合。

在本操作指南中，我们将使用一个混合空间，根据角色的运动速度和运动方向来混合行走和慢跑动画。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9757c600-5460-431c-bff0-bd633f5ff928/endresultimage.png)

## 步骤

在本指南中，我们使用 **蓝图第三人称模板（Blueprint Third Person Template）** 项目，并在项目中添加了 **动画初学者包（Animation Starter Pack）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75b264b7-22cf-4d82-add7-111c9d598bbb/animationassetpack.png)

您可以从Epic启动程序通过 **商城** 免费下载动画初学者包。

1.  在 **Content/ThirdPersonBP/Blueprints** 文件夹中的项目中，打开 **ThirdPersonGameMode** 并将 **默认Pawn类（Default Pawn Class）** 设置为 **Ue4ASP\_Character**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1eec1027-cfaf-4b6a-bc05-3c3157dd068f/blendspace1.png)
    
    这样我们就可以在"动画初学者包"项目中使用之前创建的可播放角色。
    
2.  在关卡中，选择 **ThirdPersonCharacter** 并从关卡中将其删除。
    

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d338fb61-28c5-42ae-8a84-a9ea9bdd213f/blendspace2.png)

我们需要从关卡中删除该角色，以便产生上一步的角色。

1.  在 **Content/AnimStarterPack/UE4\_Mannequin/Mesh** 文件夹中，右键单击 **UE4\_Mannequin** 并在 **创建（Create）** 下面，选择 **混合空间（Blend Space）** 并指定名称。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31b083e4-733f-4588-8aa4-deba5336ddd3/blendspace3.png)

混合空间资源需要引用一个骨架资源，这里我们使用快捷键从这个骨架资源创建混合空间，并将它命名为 **MyBlendSpace**。

1.  在该混合空间中，在 **资源细节（Asset Details）** 面板的 **轴设置（Axis Settings）** 中，添加以下值：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f362232-41af-4094-8269-2e106c6428d8/blendspace4.png)

水平轴将确定我们移动的 **方向（Direction）**，单位为度：

水平轴设置

值

**名称（Name）**

方向（Direction）

**最小轴值（Minimum Axis Value）**

\-180

**最大轴值（Maximum Axis Value）**

180

**网格分区数量（Number of Grid Divisions）**

4

**插值时间（Interpolation Time）**

0

**插值类型（Interpolation Type）**

平均插值（Averaged Interpolation）

垂直轴将确定角色的移动 **速度（Speed）**：

垂直轴设置

值

**名称（Name）**

速度（Speed）

**最小轴值（Minimum Axis Value）**

0

**最大轴值（Maximum Axis Value）**

250

**网格分区数量（Number of Grid Divisions）**

4

**插值时间（Interpolation Time）**

0

**插值类型（Interpolation Type）**

平均插值（Averaged Interpolation）

1.  在 **资源浏览器（Asset Browser）** 中，将 **Walk\_Fwd\_Rifle\_Ironsights** 动画拖到网格上的中下方位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2161cbe5-524d-4796-acb1-1e25bd516815/blendspace5.png)

这将成为进入这个混合空间时的起始位置。

1.  将 **Walk\_Lt\_Rifle\_Ironsights** 动画拖到下面的位置 **1**，将 **Walk\_Rt\_Rifle\_Ironsights** 动画拖到位置 **2**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d037225d-a706-429d-870d-f6c4e656cb32/blendspace6.png)

这里放置的是左右移动时要使用的动画。

1.  将 **Walk\_Bwd\_Rifle\_Ironsights** 动画拖到下面的位置 **1** 和 **2**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a06d78d-8980-40c4-a5b7-f84a9d2568b0/blendspace7.png)

这里放置的是向后移动时要使用的动画。

1.  从 **资源浏览器（Asset Browser）**，将 **Jog\_Fwd\_Rifle** 动画拖到网格上的中上方位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38071e9b-5f9b-4f9c-884a-a947831dc05c/blendspace8.png)

这样，在速度达到最大值250且不是左右移动时，我们可以使用另一个动画，向前慢跑。

1.  将 **Jog\_Lt\_Rifle** 动画拖到下面的位置 **1**，将 **Jog\_Rt\_Rifle** 动画拖到位置 **2**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ba64f5e-9c77-4322-86aa-6e6c0829cfdb/blendspace9.png)

1.  将 **Jog\_Bwd\_Rifle** 动画拖到下面的位置 **1** 和 **2**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bee7beb9-ac0e-441a-b5b0-b5bb5c134875/blendspace10.png)

1.  在 **Content/AnimStarterPack** 文件夹中，打开 **UE4ASP\_HeroTPP\_AnimBlueprint**，然后在 **我的蓝图（My Blueprint）** 面板中，**双击** **运动** 图形。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee6d5f19-bb1f-4445-a7e4-5b43f8b2e822/blendspace11.png)

1.  **双击** **慢跑** 状态打开其图形。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ddac832-43b2-4291-ac58-117f6e03bfd0/blendspace12.png)
    
    该[状态机（State Machine）](/documentation/zh-cn/unreal-engine/state-machines-in-unreal-engine)已经包含了一个慢跑状态，而该状态又包含一个不同慢跑动画的混合空间。
    
2.  从 **资源浏览器（Asset Browser）**，将 **MyBlendSpace** 资源拖到图形，并按以下所示更换 **BS\_Jog** 混合空间。
    

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d173568-02ff-4937-9242-1ab5f32cfdff/blendspace13.png)

默认混合空间不包括行走状态，而我们的混合空间则包括行走状态，因此用我们的混合空间替换默认混合空间！

1.  在 **Content/AnimStarterPack** 文件夹汇总，打开 **Ue4ASP\_Character**。
    
2.  在图形中找到标记为 **下蹲（Crouch）** 的部分，将其删除以移除警告错误。
    

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a638389-7cc4-4043-bbf3-6c822ad4a4d7/blendspace14.png)

默认情况下，动画初学者包为下蹲创建了绑定，而我们的项目则没有。在该示例中，我们将移除下蹲行走的能力。

1.  在图形中单击右键，并添加 **左Shift** 键事件，然后将 **CharacterMovement** 从 **组件（Components）** 选项卡拖到图形。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c0e237f-efda-4ce2-b1dc-220a2879f6f4/blendspace15.png)

当我们按住左Shift按钮时，会从行走切换到慢跑。

1.  从 **角色运动（CharacterMovement）** 节点拖出引线，并将 **按下（Pressed）** 和 **松开（Released）** 的**设置最大行走速度（Set Max Walk Speed）** 分别设置为值 **250** 和 **100**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f2d89ae-025c-47e0-aa33-016b24414340/blendspace17.png)

我们根据是否按下左Shift键来更改运动速度，继而在游戏中更改角色的运动速度。

1.  单击 **角色运动（CharacterMovement）** 组装件，然后在 **细节（Details）** 面板中，将 **最大行走速度（Max Walk Speed）** 设置为 **100**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e55d03bc-fd80-464a-9963-b22cc95902d4/blendspace20.png)

我们需要更新角色的默认运动速度，以使他们开始行走。

1.  在 **组件（Components）** 选项卡中单击 **胶囊组件（CapsuleComponent）**，并在 **细节（Details）** 面板中，选中 **在游戏中隐藏（Hidden in Game）** 选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33570cf5-5e47-491a-82fc-9e6e7d0a7110/blendspace18.png)

这会关闭游戏中的碰撞胶囊体调试显示。

1.  单击 **编译（Compile）**，然后单击工具栏编辑器按钮中的 **播放（Play）**。

## 最终结果

在编辑器中运行时，使用 **WASD** 四处移动，此时角色在默认情况下将会行走，在改变方向时会在不同行走动画之间混合。 在站立时，按住 **左Shift** 键并使用 WASD 将使角色从行走/瞄准动画混合到低姿/瞄准慢跑动画，从而使角色变为"快跑"。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [blend space](https://dev.epicgames.com/community/search?query=blend%20space)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/locomotion-based-blending-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/locomotion-based-blending-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)