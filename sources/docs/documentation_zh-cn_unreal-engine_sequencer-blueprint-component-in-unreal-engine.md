# 虚幻引擎Sequencer蓝图组件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/sequencer-blueprint-component-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:12:30.349Z

---

目录

![Actor Sequence组件](https://dev.epicgames.com/community/api/documentation/image/a9079055-5178-49fc-980c-8c405e778e8a?resizing_type=fill&width=1920&height=335)

这是尚处于开发阶段的实验性功能。一些方面可能无法正常使用，或会在未来版本中被修改。

使用并创建 [序列](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview) 时，有时可能需要在其他地方或实例中重复使用序列的功能。 借助 **Actor 序列插件** 和 **Actor 序列组件** 便可将序列直接嵌入 Actor [蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)。 将动画绑定到蓝图实例并自动触发或通过蓝图的 **事件图表** 触发，即可重复使用序列。 此外还可为世界场景中的任意 Actor 添加 Actor 序列组件，将动画添加到 Actor 的单一实例。

在此指南中，我们将创建一个带嵌入序列的蓝图，随时间设置聚光源颜色的动画并对其进行变更。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b456283d-7cd3-4bfe-af7b-d9c54fc34784/endresult.png)

蓝图即可放置在让任意关卡中或进行复制，嵌入的序列则会在调用时自动播放。

## 步骤

在此指南中，我们使用的是启用了 **Starter Content** 的 **Blueprint Third Person Template** 项目。

1.  项目打开后，从 **Edit** 菜单中选择 **Plugins**。
    
2.  从 **Plugins** 菜单的 **Built-in** 下启用 **Actor Sequence Editor** 选项，并在弹出提示后重启编辑器。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08f330a0-cdb8-4e2f-b685-b8aedc623fc9/actorsequence02.png)
    
    启用 Actor 序列编辑器时可能出现 **Experimental** 确认对话窗口，点击 **Yes** 继续。
    
3.  创建一个 **Actor** 类的新 **蓝图**，将其命名为 **Light\_BP**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed40e43a-255a-48d4-9059-0ab086a1408a/actorsequence03.png)
4.  在 **Light\_BP** 中点击 **Add Component** 并添加一个 **Spot Light**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21e7498e-c887-4233-860d-8f7448c48d42/actorsequence04.png)
5.  在 **Spot Light** 的 **Details** 面板中将 **Y** 轴的 **Rotation** 值改为 **\-60**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3faf2df3-b244-4aa6-8be0-6ebdf45a2d4b/actorsequence05.png)
    
    这将使光线在视口中旋转，角度稍微朝下。
    
6.  添加另一个 **Static Mesh** 类型的 **组件**，然后在 **Details** 面板中将网格体设为 **Floor\_400x400**，**Location** 设为 **\-180 (X), -180 (Y), -100 (Z)**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fd9c1ad-eea5-4cf5-bc14-6414ff783b95/actorsequence06.png)
    
    我们将用这个地板网格体使光线在地面上反射，并看到 Sequencer 驱动参数变化的效果。
    
7.  添加另一个 **Actor Sequence** 类型的 **组件**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08bd5177-5f7e-4f47-b0f4-fe3231cab555/actorsequence07.png)
8.  在 **Actor Sequence** 的 **Details** 面板中，设置 **Loop Indefinitely**、**Random Start Time** 和 **Auto Play**，然后点击 **Open in Tab**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/489aebb4-e74e-465f-b3e4-8979cda41987/actorsequence08.png)
    
    点击 **Open in Tab** 后，**Sequencer 编辑器** 将在蓝图中打开。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7966af9-d2d5-4fc7-9b73-9609aea25adf/sequencerwindow.png)
    
    在此例中将自动触发并播放序列，也可从 **事件图表** 中进行调用播放。
    
9.  在 **Sequencer** 标签中，点击 **Add**，然后在 **Component** 下选择 **SpotLight**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc10d673-692f-4829-85ed-bc7562184b89/actorsequence09.png)
10.  在 **SpotLight** 轨迹上点击 **Track** 按钮并选择 **Transform**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db2ba4ec-70fc-4c7e-895b-433a2e4b3d61/actorsequence10.png)
11.  再次点击 **SpotLight** 轨迹的 **Track** 按钮并添加 **Light Color** 轨迹。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75a09174-8260-48f8-b3c4-7c6bcb356861/actorsequence11.png)
12.  在 **Transform** 轨迹的 **Rotation** 下，点击 **Z** 轴值的 **+** 图表在第 **0** 帧处添加一个 **0** 键。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa513bdc-f2c1-44c6-99c3-16a5e9cf214c/actorsequence12.png)
13.  选中添加的键，然后按下 **4** 键将内插类型改为 **线性**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9da83311-48bd-4aba-9ed0-6ab573354d5d/actorsequence13.png)
    
    可通过数字键修改内插类型，也可右键点击关键帧选择内插方法。
    
14.  在 **2.00** 处添加一个键，将 **Rotation** 的 **Z** 轴值设为 **\-180.0**，并在键上按下 **4** 将内插改为 **线性**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0703afdb-4095-4696-bf6a-55c62eecc7ac/actorsequence14.png)
15.  在 **4.00** 处添加一个键，将 **Rotation** 的 **Z** 轴值设为 **\-360.0**，并在键上按下 **4** 将内插改为 **线性**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/727d3fd7-9ef8-4bd1-802c-feaa13fef1c1/actorsequence15.png)
    
    也可将红色 **结束标记** 移回 **4.00**，使序列在其开始处结束。
    
16.  在 **Light Color** 轨迹上点击 **+** 按钮在第 **0** 帧处添加一个键。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a011300-a3ce-401d-bf1d-3b97ad6ff9f7/actorsequence16.png)
17.  为 **Red** 在 **1.00** 处添加一个键，值设为 **0.0**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27a7fdb5-287e-4a85-bc84-22f00442a5d1/actorsequence17.png)
18.  为 **Green** 在 **2.00** 处添加一个键，值设为 **0.0**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2a55392-8ba5-420e-85b4-a6d23926c599/actorsequence18.png)
19.  为 **Blue** 在 **3.00** 处添加一个键，值设为 **0.0**；**Red** 和 **Green** 的值则设为 **1.0**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3698c85-2e83-4fa0-b972-de6cdc9d36ef/actorsequence19.png)
20.  为 **Blue** 在 **4.00** 处添加一个键，值设为 **1.0**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/436a3400-b7c2-49b4-8d6c-ec1780e88b5e/actorsequence20.png)
    
    这会使光线从白色变为各种颜色，然后在序列末尾重新变为白色。
    
21.  在 **Components** 窗口中，选择并 **删除** **StaticMesh** 地面。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ea215ce-d0ce-404a-83a3-1504201e6567/actorsequence21.png)
    
    光照设置完成后，我们便不再需要这个网格体作为一种在视口中预览光照的方式。
    
22.  在主关卡编辑器视口中，选择地面，然后长按 **Alt** 拖起一个地面的副本，创建出封闭关卡的屋顶。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd7eb84b-25e7-4ebf-b54a-1ae252e14a54/actorsequence22.png)
23.  在 **Content Browser** 中，在关卡中拖动并放置 **Light\_BP** 实例（如有需要可以按下 **E** 并进行旋转）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0ee7623-4b9d-42dc-ac44-4b83b6770aa8/actorsequence23.png)
24.  从 **Build** 下拉菜单中选择 **Build Lighting Only** 重新构建关卡中的光照。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9d0c785-e339-44df-8d9d-c077cb32c8bf/actorsequence24.png)
25.  点击 **Play** 按钮在编辑器中进行游戏。
    

## 最终结果

在关卡中进行游戏时，您将看到播放嵌入的序列时放置的光照会开始旋转并变换色彩。

因为序列嵌入在 Actor 蓝图中，它并不存在依赖性，因此可在任意关卡中播放，或毫无障碍地进行复制。

在我们的实例中序列已设为 **Auto Play**，然而您也可以使用 **事件图表** 编写脚本，设定序列播放的时机。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c289351f-f859-4818-90b0-227c26426d91/eventgraphplayscript.png)

上图中，我们已根据 **Event BeginPlay** 允许 Actor 从 **Player Controller** 获取输入。 **P** 键按下时，我们接收 **Actor 序列组件** 并获得 **Sequence Player**（它将调用函数 **Play** 开始播放序列）。 如果不希望序列在关卡加载时自动播放，可使用任意方法调用 Play 函数。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/sequencer-blueprint-component-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/sequencer-blueprint-component-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)

相关文档

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)