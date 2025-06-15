# 在虚幻引擎中用Paper 2D设置动画状态机 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/paper-2d-setting-up-an-animation-state-machine-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:16:14.769Z

---

目录

![设置动画状态机](https://dev.epicgames.com/community/api/documentation/image/997173ff-9783-4703-85ea-f3a0f289cd8d?resizing_type=fill&width=1920&height=335)

此页讲述如何设置 2D 角色的动画状态机，使角色基于定义的条件在不同 Flipbook 动画之间切换。

在进入此教程前，须先设置好 Paper 2D 角色的动作，以及角色需要切换的 Flipbook 动画。如尚未设为设置好角色或 Flipbook 动画，请查阅 [Paper 2D 顶视教程](/documentation/zh-cn/unreal-engine/paper-2d-example-in-unreal-engine) 中关于设置 Paper 2D 角色、应用动作，并通过链接下载教程中使用的样本资源。

打开项目，设置好 Paper 2D 角色之后即可按以下步骤执行。

## 变量设置

1.  在项目中打开 Paper 2D 角色蓝图（此例中为 **TopDownCharacter**）。
    
2.  在 **My Blueprint** 窗口中，点击 **Add Variable** 按钮创建一个布尔变量并将其命名为 **IsMoving?**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef034852-36eb-4bd4-bebe-665889160a4d/animation1.png)
3.  基于一个 Flipbook 动画（如 Idle）创建另一个变量并对其命名，再将其设为 **Paper Flipbook** 类型。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8e04408-a3f9-40a2-b137-0f7ceb4e0179/animation2.png)
    
    制作的游戏类型不同，所需要的动画也不同。大多数以角色为基础的游戏中，角色均有待机状态（原地休息不动）。
    
4.  点击 **Compile**，然后将变量的默认值设为其对应的 Flipbook 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95a4add1-96f7-4aa8-92a8-5a91432f5614/animation3.png)
    
    上图中，我们将 Idle Flipbook 动画指定到 IdleFlipbook 变量。
    
    （任选）为保证清晰明了，需要将变量放入名为 **Animations** 的 **Category** 中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb4632aa-e415-40a0-9791-92080025ffe5/animation4.png)
    
    可根据您自己的需求输入类目名称，使资源组织有序。
    
5.  在角色播放的每个动画上重复之前的两个步骤。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e23269d8-9721-4dc2-9a5a-d78777e49dc6/animation5.png)
    
    上图中创建了名为 **RunFlipbook** 的另一个 Paper Flipbook 变量，点击 **Compile**，然后将变量的 **默认值** 设置到对应的 Run Flipbook 动画。范例中只拥有两个动画，可将一个设为死亡动画，另一个设为装填枪支（如有）或近身攻击，其他一个设为拾起或使用道具，等等。
    
    为每个 Flipbook 动画状态添加变量后即可进入下一部分。
    

## 更新动画设置

下一步将创建一些脚本，处理动画状态的更新。

1.  在 **事件图表** 中 **单击右键**，搜索并添加一个 **自定义事件（Custom Event）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e99d7d3-3258-4e61-9f33-90ee2e7407a2/animation6.png)
    
    将自定义事件设为与 **UpdateAnimation** 效果有关的命名。
    
2.  再次在此图表中 **单击右键** 并添加一个 **Get Velocity** 节点，然后从返回值拖出连线，添加 **Vector Length** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1f4e044-96ef-4984-b9d5-befa06ecbda1/animation7.png)
    
    可通过速度（Velocity）的矢量长度（Vector Length）来确定角色是否处于移动状态。
    
3.  在 Vector Length 返回值的引出连线后添加一个 **\>** 节点，然后将 **IsMoving?** 变量拖放到布尔返回上完成设置。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6671e670-a579-4df9-af90-bcda8d07cd06/animation8.png)

## 动画状态机函数

我们将在此创建一个函数用于进行状态确认，并输入对应的 Flipbook 动画进行使用。

1.  在 **My Blueprint** 窗口中，新建一个名为 **Anim State Machine** 的 **函数**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94cd715b-3430-4e08-a89e-c0a026fe896f/animation9.png)
2.  在函数的 **Details** 面板中，添加一个名为 **IsMoving?** 的 **Input** 布尔和一个名为 **Output Flipbook** 的 **Output** Paper Flipbook。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/655ac91f-8326-4b3b-8355-113038d3368f/animation10.png)
    
    函数将抓取同样名为 IsMoving? 的变量值，确定当前是否处于移动状态，并将其作为测试用例决定当前的状态（是否移动）。函数将输出一个 *Output Flipbook*，稍后我们将设置使用的 sprite。
    
3.  在函数输入可执行引脚的引出连线后连接一个 **Branch** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c2cfaef-1e67-43f6-93eb-e33226c59df3/animation11.png)
    
    调用此函数时，首先将对 **IsMoving?** 变量执行 True/False 检查。
    
4.  返回 **内容浏览器** 中，**单击右键**，然后在 **Blueprints** 下创建一个 **枚举**，将其命名为 **Animation State**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26221ff0-0ad3-41c1-8374-8d8ebf5b8031/animation12.png)
    
    我们使用枚举创建一个列表，此列表包含所有可选择的角色动画状态。
    
5.  打开枚举，然后为角色的每个动画添加状态。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11480c9e-ffc3-4690-9892-c9703db96e04/animation13.png)
    
    例如，我们现在只拥有 Idle 和 Run，但您可根据要使用的动画添加更多状态。
    
6.  返回 Paper 2D 角色蓝图，新建一个名为 **AnimationState** 的变量，将 Enum 设为 *Animation State*。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aaca87ba-5cee-4828-89d8-3ec6c17e0a18/animation14.png)
7.  在 **Anim State Machine** 函数中长按 **Alt** 并拖入 **AnimationState** 进行设置。
    
8.  拖入另一个 **AnimationState** 变量并将这两者和 **Branch** 节点的 **True** 和 **False** 引脚连接起来。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2c02cc5-5e47-4c33-97bd-0046eb5288ff/animation15.png)
    
    将连接到 True 的枚举状态设为 **Run**，另一个枚举设为 **Idle**。如 IsMoving? 为 true，则枚举状态设为 Run；如为 false，则设为 Idle。范例只检查是否存在移动，您可根据自身需求添加各种 Branch 节点，对各种条件进行检查。
    
    有一点需要注意：进行检查的顺序十分重要，需要优先进行一些状态的检查。例如需要先播放角色死亡 Flipbook 动画，并检查角色是否已死；如确认已死，则播放死亡动画并判定角色死亡。如未死，则继续执行其他检查（角色是否移动、攻击、使用道具等），最后检查角色是否执行操作；如不执行任何操作，则显示待机动作。
    
9.  长按 **Ctrl** 拖入 **IdleFlipbook**、**RunFlipbook** 和 **Animation State** 变量，然后 **单击右键** 添加一个 **Select** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5b4001b-28e1-4e87-bb66-3504d3da9bca/animation16.png)
    
    在这部分中，需要将每个动画变量拖入图表。
    
10.  连接每个节点使函数完整，与下图相似。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4dfb6a5-338f-4630-92c7-26e98d4e217d/animation17.png)
    
    函数现在将检查是否处于移动状态，如是，则将枚举状态设为 Run（如未移动，则设为 Idle）。然后使用 Select 节点从枚举获得动画状态，再基于状态指定相应的 Flipbook 作为 *Output Flipbook* 使用。
    

## 完成 Update Animation 事件

完成函数后，将其作为 Update Animation 事件的一部分调用，并完成剩余脚本。

1.  在 **My Blueprint** 窗口的 **事件图表** 上选择 **Show Inherited Variables**，然后长按 **Ctrl** 拖入 **Sprite**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da8a21db-0cf4-4621-8883-dffa3bbb9da4/animation18.png)
2.  拖入 **Anim State Machine** 函数并将其和 **Set Is Moving?** 节点连接，然后在 **Sprite** 连接引线后添加一个 **Set Flipbook** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e434d9b-5b1c-4ab3-8df4-8b071f81396a/animation19.png)
3.  按下图所示，为 **UpdateAnimation** 自定义事件将所有节点连接起来。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c10cb245-d402-4abc-874e-99cdbf02d4b0/animation20.png)
4.  从 MoveForward 事件的 **Add Movement Input** 节点调用 **Update Animation** 自定义事件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b2d69c2-d1c5-4ae2-be17-7cb578dd1e30/animation21.png)
5.  **编译** 并 **保存**，然后在编辑器中进行游戏。
    
    现在，角色将基于是否移动在两个状态之间切换。
    

如上所述，如需在此设置中添加更多动画状态，需要：

-   为角色需要进入的每个动画状态设置 Flipbook 动画。
-   在 Paper 2D 角色蓝图中添加动画状态并将其设为 Flipbook 变量。
-   将每个状态添加到创建的 **Animation State** 枚举。
-   创建条件（决定玩家进入每种状态的时机），并将其添加到 **Anim State Machine** 函数。
-   将每个 Flipbook 变量连接到 **Anim State Machine** 函数中的 **Select** 节点。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [变量设置](/documentation/zh-cn/unreal-engine/paper-2d-setting-up-an-animation-state-machine-in-unreal-engine#%E5%8F%98%E9%87%8F%E8%AE%BE%E7%BD%AE)
-   [更新动画设置](/documentation/zh-cn/unreal-engine/paper-2d-setting-up-an-animation-state-machine-in-unreal-engine#%E6%9B%B4%E6%96%B0%E5%8A%A8%E7%94%BB%E8%AE%BE%E7%BD%AE)
-   [动画状态机函数](/documentation/zh-cn/unreal-engine/paper-2d-setting-up-an-animation-state-machine-in-unreal-engine#%E5%8A%A8%E7%94%BB%E7%8A%B6%E6%80%81%E6%9C%BA%E5%87%BD%E6%95%B0)
-   [完成 Update Animation 事件](/documentation/zh-cn/unreal-engine/paper-2d-setting-up-an-animation-state-machine-in-unreal-engine#%E5%AE%8C%E6%88%90updateanimation%E4%BA%8B%E4%BB%B6)