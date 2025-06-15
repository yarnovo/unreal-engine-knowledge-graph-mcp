# 在虚幻引擎中更改过场动画轨道 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/change-cinematic-track-bindings-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:14:26.085Z

---

目录

![用Sequencer在蓝图中重新绑定Actor](https://dev.epicgames.com/community/api/documentation/image/045d0623-58ce-4cdd-a4e5-4c8b3cc9e407?resizing_type=fill&width=1920&height=335)

创建游戏进程过场动画时，有时需要在Sequencer中对运行时动态生成的对象设置动画。 举例而言，用户可创建一个带动画的对象，使其在Sequencer中沿路径移动，而该对象可由玩家（玩家在游戏进程中生成）进行定义。 在[蓝图可视化脚本](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)的协助下，用户可使用 **Get Sequence Bindings** 节点从关卡序列公开绑定辨识符，并使用自有设置覆盖这些绑定。

在此例中，我们对一个空白Actor设置动画，使其沿一条路径移动，而玩家按下按键即可将对象修改为不同的效果。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7578517a-6a70-4924-82a8-2c24bc55c611/endresult.png)

在此指南中，我们使用的是启用了 **初学者内容包** 的 **蓝图第三人称模板** 项目。

## 步骤

1.  在 **放置（Actor）** 面板的 **基本（Basic）** 选项卡中，将一个 **空Actor** 拖入关卡。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e4ec2c6-8eba-43d7-aad5-80e2afcb95b2/dynamicanim_01.png)
    
    我们将在Sequencer中对此空白actor设置动画，并覆盖序列绑定，将actor改为不同的粒子特效。
    
2.  在主工具栏中点击 **过场动画（Cinematics）** 按钮，然后选择 **添加关卡序列（Add Level Sequence）**，为序列指定任意命名。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/564187db-58a2-45bb-8bd8-f09d217f6410/dynamicanim_02.png)
3.  选择关卡中的空白actor，然后将空白actor添加到Sequencer。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2590f313-4c05-471c-9c13-19fe35d18098/dynamicanim_03.png)
4.  点击空白actor上的 **轨迹** 按钮，选择 **变换**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c3c0d2e-1438-43e6-96a8-c0ae7adf4da5/dynamicanim_04.png)
5.  为 **变换** 轨迹添加一个关键帧，初始化空白actor在关卡中的当前位置。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3a2ee98-c2e1-492b-8707-cc02c5bad3b8/dynamicanim_05.png)
6.  将时间轴前移至第 **75** 帧，然后在关卡中移动空白actor，并在其新位置添加一个新的关键帧。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/274040d3-784a-4437-a9da-d4ce3e2b5abd/dynamicanim_06.png)
7.  点击右键并复制Sequencer中的首帧，然后移动至第 **150** 帧，点击右键 **粘贴** **变换** 关键帧。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9fffd7f-209f-4054-a97e-2d904dc55001/dynamicanim_07.png)
    
    复制首个关键帧并将其粘贴到末尾后将获得能够循环的平顺序列。
    
8.  在关卡序列的 **细节** 面板中启用 **自动播放（Auto Play）**，并将 **循环（Loop）** 设为 **无限循环（Loop Indefinitely）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e9d1a1d-0004-4abd-930d-a7ec8e264539/dynamicanim_08.png)
9.  点击主工具栏的 **蓝图（Blueprints）** 按钮，然后选择 **打开关卡蓝图（Open Level Blueprint）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5e0b020-8520-4fb2-97a8-b31fdaee4af9/dynamicanim_09.png)
10.  在 **关卡蓝图** 中点击右键添加一个连接到 **Flip Flop** 节点的 **F** 键盘事件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50898939-f62a-463a-aa35-29e89a139249/dynamicanim_10.png)
11.  添加2个 **Spawn Actor from Class** 节点（一个使用 **Blueprint Effect Fire**，另一个使用 **Blueprint Effect Sparks**），并如下所示连接到 **Make Transform** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/765e5439-4e4d-487a-afe5-2e1479c28b86/dynamicanim_11.png)
12.  在 **SpawnActor Blueprint Effect Fire** 节点的 **返回值** 上点击右键，选择 **提升为变量（Promote to Variable）**，将其命名为 **Fire BP**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ac39251-6252-4f33-b053-6ec124640cd8/dynamicanim_12.png)
13.  将 **SpawnActor Blueprint Effect Sparks** 的 **返回值** 提升为 **Sparks BP**。
    
14.  为关卡序列添加一个引用，在其后方使用 **Add Binding** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ec0b4f3-9292-4d64-8617-1013ff939c6e/dynamicanim_13.png)
15.  创建另一个 **Add Binding** 节点，如下图所示进行连接，将 **Fire BP** 和 **Sparks BP** 填入为 **Actor**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d26bd78-106a-4ef7-bdef-47c0c932b70a/dynamicanim_14.png)
16.  点击右键并使用 **Get Sequence Binding** 节点（设置下方高亮的选项），并连接到两个 **Add Binding** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ac55677-a50a-4eba-be3f-c15ebc765cd7/dynamicanim_15.png)
    
    可在 **Get Sequence Binding** 节点上指定要针对的关卡序列，以及希望覆盖的 **绑定**。 在此例中，关卡序列（空白actor）中只列出了一个能覆盖的轨迹。 添加到关卡序列的可覆盖对象将显示在下拉菜单中。
    
17.  引入 **Sparks BP** 和 **Fire BP** 变量。使用 **IsValid** 节点，如对象有效，则 **销毁Actor**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9a2d94d-7880-4177-a182-cd50d9e79b8b/dynamicanim_16.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9a2d94d-7880-4177-a182-cd50d9e79b8b/dynamicanim_16.png)
    
    Click image for full view.
    
    脚本现已完成，将生成火焰或火花特效、覆盖关卡序列中的空白actor，然后销毁其他的粒子效果（如其有效）。
    
18.  在编辑器中运行，然后按下 **F** 键在生成的Actor之间进行切换。
    

## 最终结果

在编辑器中运行时按下 **F** 键，空白actor将被生成的火焰或火花特效所替换，并使用应用到空白actor的动画。

除添加绑定之外还可进行以下操作：

-   **移除绑定**，从指定的绑定移除指定的actor。
-   **重设绑定**，将指定的绑定重设回默认设置。
-   **重设多项绑定**，将所有覆盖的绑定重设回默认设置。
-   **设置绑定**，用指定的actor覆盖指定的绑定。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9179baa-8f9a-4bb6-8858-9c294a662317/additionalfunctions.png)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/change-cinematic-track-bindings-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/change-cinematic-track-bindings-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)