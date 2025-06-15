# 在虚幻引擎中的过场动画终止播放后该怎么办 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/what-happens-when-my-cinematic-ends-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:14:42.529Z

---

目录

![保留或存储通过 Sequencer 进行的修改](https://dev.epicgames.com/community/api/documentation/image/45efb805-c0b2-4448-ac72-5299faf51be5?resizing_type=fill&width=1920&height=335)

在 Sequencer 中进行操作时，用户可修改 Actor 状态，并在过场动画结束后将状态保留。举例而言，创建一个过场动画，角色解锁并打开一扇门，之后这扇门仍然保持打开状态。然而在影片制作环境中，用户可能需要在镜头中设置动画数值，使其及时返回设置动画之前的状态，避免渗入到下个镜头中。用户可通过 **When Finished** 属性以每个轨道为基础来确定轨道应返回设置动画之前的状态，或在序列播放完成后保留修改。

在此指南中，您将使用 When Finished 属性保留一个光照的颜色变化，同时保留对门运动所进行的修改。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f4ae0be-ddc9-4a0c-b174-a1f342fd93dc/heroimage.png)

## 步骤

在此指南中，我们使用的是启用了 **Starter Content** 的 **Blueprint Third Person Template** 项目。

1.  从 **Content/StarterContent/Props** 文件夹将一个 **SM\_Door** 和 **SM\_DoorFrame** 拖入 **关卡视口**，并将门放置在门框中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/762a57b5-220a-471f-ae36-633d9bf44c94/whenfinished_01.png)
    
    按下 **W** 键进入平移模式，如有必要可禁用网格对齐（下图所示），在门框中对门的位置进行微调。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af0d627f-ecc9-4a7a-9f7f-e0a84489e248/whenfinished_02.png)
2.  在 **放置Actor（Place Actors）** 面板的 **Lights** 选项卡中，将一个 **Point Light** 拖入 **关卡视口** 并将其放置在门前。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5431be31-306f-4ca2-b58c-09ce9cb0ffb3/whenfinished_03.png)
3.  在 **关卡视口** 中将 **ThirdPersonCharacter** 放置到门前。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc46e499-c846-4f1e-8625-fc0db5d15967/whenfinished_04.png)
4.  点击 **主工具栏** 中的 **Cinematics** 按钮并选择 **Add Level Sequence**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0e614b0-18ef-452f-be70-c07a78845675/whenfinished_05.png)
5.  在 **Save Asset As** 窗口中选择一个 **命名** 和保存路径，然后点击 **Save**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f590696c-8f26-4a72-89fd-7ff6e2016f99/whenfinished_06.png)
6.  在 **Sequencer** 窗口中，点击 **Add** 按钮并选择 **Shot Track**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ef5e6b4-f492-448d-8ece-905f85f81491/whenfinished_07.png)
    
    此操作将创建一个 [镜头轨道（Shot Track）](/documentation/zh-cn/unreal-engine/sequences-shots-and-takes-in-unreal-engine)，用于将过场动画切分为自含式的"镜头"，以便进行整理和二次整理。
    
7.  在 **镜头轨道** 上，点击 **\+ Shot** 按钮和 **Insert Shot**，弹出提示后使用默认命名规则。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6700fb9e-198d-4090-a338-75bd6d4ced5f/whenfinished_08.png)
8.  选取镜头末尾，将其拉回至 **第 75 帧**，使镜头的长度是整个序列的一半。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8a04083-798d-4c2d-974e-58b62d97210f/whenfinished_09.png)
    
    我们将使用镜头来影响场景中的光照，并在镜头结束后保留这些修改。
    
9.  将 **时间轴** 调至 **第 0 帧**、并在关卡中选择 **SM\_Door**，然后通过 **\+ Add** 按钮添加 **Actor To Sequencer**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ecb1a1d-1de2-450e-9147-e5b6e8d143fd/whenfinished_10.png)
    
    我们将对主关卡中的门产生影响，并保留即将应用的修改。
    
10.  点击 **SM\_Door** **Transform** 轨道上的 **+** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1102622-8f7d-4ec5-9013-251d80297a3a/whenfinished_11.png)
11.  将 **时间轴** 标记移动至 **第 150 帧**，然后旋转关卡中的门（**E** 键）将其打开，然后按下 **S** 键添加其打开时的变形。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55f36618-7f4c-406e-8e5e-8c8c00a2db71/whenfinished_12.png)
    
    完成此设置后，过场动画播放完成后门将从关闭状态变为打开。
    
12.  双击 **镜头轨道** 中的镜头将其打开，然后在关卡中选择 **Point Light** 并将其添加至镜头。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98cbcbcb-8d14-4123-8fc1-e600daf0d01a/whenfinished_13.png)
13.  在 **Light Color** 轨道上点击 **+** 符号指定镜头 **第 0 帧** 处使用的默认颜色。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b90faea-63fb-4fdb-b9a0-361583dc4d2d/whenfinished_14.png)
14.  将 **时间轴** 标记移至 **第 75 帧** 并将 **Light Color** 改为 **Green**（或其他任意颜色），为新值添加键。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b93c712a-e4b0-4235-af6b-534badf4d696/whenfinished_15.png)
15.  在轨道窗口中右键点击 **Light Color** 轨道，并选择 **Properties** 查看 **When Finished** 状态。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0867aa82-9ded-490d-9ced-423967257413/whenfinished_16.png)
    
    **When Finished** 默认状态是分段动画完成后此轨道将 **Restore State**（恢复其原始状态）。
    
16.  退出 **镜头** 并点击 **Sequencer** 窗口右上角的导览列按钮返回 **Master Sequence** 关卡。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed33952f-9268-45c6-856d-e84a356ed545/whenfinished_17.png)
17.  右键点击 **SM\_Door** 的 **Transform** 轨道并选择 **Properties**，然后将 **When Finished** 属性改为 **Keep State**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e74d5c1-0df2-4c2b-a68d-33f55ab394ac/whenfinished_18.png)
    
    此操作将宣称要 **保留状态（Keep State）**，代表动画结束时我们将保留通过 Sequencer 进行的修改。
    
18.  在关卡中选择 **Level Sequence** Actor，然后在 **Details** 面板中将 **Auto Play** 选项设为 **True**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c649100-8446-41fe-aa7b-7e1a405243ca/whenfinished_19.png)
19.  在 **Main Toolbar** 中点击 **Build** 按钮并选择 **Build Lighting Only**，然后（在构建光照后）点击 **Play** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3919867f-fe09-4225-8029-9fd6a452433b/whenfinished_20.png)

## 最终结果

在关卡中进行游戏时，光线将改变颜色，然后重新变为白色。而门此时仍为开启状态。

对于镜头中的光照，我们使用的是 **Restore State** 默认的 **When Finished** 属性值，将在镜头播放完毕后返回其原始状态。 而对于门来说，我们将 When Finished 属性改为了 **Keep State**，动画播放完毕后将保留修改，使门保持为开启状态。

需要考虑的一点是，Keep State 是本地效果，**Level Sequence** actor 中有一个全局 **Restore State** 选项：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e104539c-1054-4682-a951-64711e547536/whenfinished_21.png)

Level Sequence actor 的 **Details** 面板中的 Restore State 选项将在关卡序列停止播放时保存所有状态。如要在序列完全结束后保持轨道的状态，则需要将动画分段设为 Keep State，且 Level Sequence actor **并非** 设为 Restore State，否则全局值将覆盖本地设置。

-   [how-to](https://dev.epicgames.com/community/search?query=how-to)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/what-happens-when-my-cinematic-ends-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/what-happens-when-my-cinematic-ends-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)