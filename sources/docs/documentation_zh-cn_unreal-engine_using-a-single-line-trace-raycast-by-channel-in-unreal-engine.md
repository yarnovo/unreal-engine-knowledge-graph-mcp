# 在虚幻引擎中使用 Single Line Trace (Raycast) by Channel | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-a-single-line-trace-raycast-by-channel-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:52:40.384Z

---

目录

![使用 Single Line Trace (Raycast) by Channel](https://dev.epicgames.com/community/api/documentation/image/5fb64e9d-6a6e-49e5-81e9-352c574d7aa0?resizing_type=fill&width=1920&height=335)

**Line Trace By Channel** 将沿给定的线执行碰撞追踪并返回追踪命中的首个物体。以下是设置 **Single Line Trace By Channel** 的步骤。

## 步骤

1.  使用 **包括 Starter Content** 的 **Blueprint First Person** 模版创建新项目并打开项目。
    
2.  在 **FirstPerson/Blueprints** 文件夹中，打开 **BP\_FirstPersonCharacter** 蓝图。
    
3.  在图表中单击右键，搜索并添加一个 **Event Tick** 节点。
    
    ![Add an Event Tick node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8358be8c-a572-406c-b5b9-66c0a6626d66/guide-how-to-2b-1.png)
    
    这会导致追踪每帧运行。
    
4.  从执行引脚连出引线，然后搜索 **LineTraceByChannel** 节点。
    
    ![Search for the Line Trace By Channel node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80baa825-6b3c-4967-a49a-d0e5cc933d74/guide-how-to-2b-2.png)
5.  按住 **Ctrl** 键，拖入 **First Person Camera** 组件。
    
    ![Drag in the First Person Camera component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c2ab140-2aba-4d51-9055-5eaad1baa21d/guide-how-to-2b-3.png)
    
    我们便会从这个摄像机开始追踪。
    
6.  从 **First Person Camera** 节点连出引线，添加一个 **Get World Location** 节点，然后将其连接到追踪的 **Start**。
    
7.  再次从 **First Person Camera** 节点连出引线，添加一个 **Get World Rotation** 节点。
    
    ![Add a Get World Rotation node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc4a4c5a-cfa3-43d2-a2e8-e3232fefd408/guide-how-to-2b-4.png)
    
    我们从 FirstPersonCamera 的位置开始追踪，然后获得 FirstPersonCamera 的旋转。
    
8.  从 **Get World Rotation** 节点连出引线并添加一个 **Get Forward Vector**，然后再从此处连出引线并添加一个 **Vector \* Float** 节点，设为 **1500**。
    
    ![Drag off the Get World Rotation node and add a Get Forward Vector then drag off that and add a Vector Multiple Float node set to 1500](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6332b8a-cbdd-487f-bf92-62d09c392d52/guide-how-to-2b-5.png)
    
    获得旋转和向前矢量后，然后将其向外延伸 1500（此值为追踪的长度）。
    
9.  从 **Get World Location** 节点连出引线并添加一个 **Vector + Vector** 节点，然后（按下图所示）连接到追踪节点的 **End**。
    
    ![Drag off the Get World Location node and add a Vector Plus Vector node connecting to the End of the Line Trace By Channel node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02653beb-a94b-4d26-9c7f-ca2cd9fcf44f/guide-how-to-2b-6.png)
    
    我们在此使用 FirstPersonCamera 的位置并将其向外延伸 1500 个单位（基于其旋转和向前矢量）。
    
10.  在追踪节点上将 **Draw Debug Type** 设为 **For One Frame**。
    
    ![Set the Draw Debug Type to For One Frame on the Line Trace By Channel node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6aed2b6-56a5-4110-a607-ba67555477dd/guide-how-to-2b-7.png)
    
    进行游戏查看线条追踪时即可看到一条调试线。
    
11.  从追踪的执行输出引脚连出引线并添加一个 **Print String** 节点。
    
    ![Drag off the execution out pin of the Line Trace By Channel node and add a Print String node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35e98cbe-f2cb-4d6a-aebf-cee2a92ed672/guide-how-to-2b-8.png)
12.  从 **Out Hit** 引脚连出引线，搜索 **Break Hit**，然后添加一个 **Break Hit Result** 节点。
    
    ![Drag off the Out Hit pin and search for Break Hit then add a Break Hit Result node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf2b5d41-e70e-454c-a5df-b96845075fd2/guide-how-to-2b-9.png)
13.  从（**Break Hit Result** 的）**Hit Actor** 引脚连出引线，添加一个 **To String (Object)** 节点并将其连接到 **Print String** 节点。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e49aff7-427f-4196-8133-fa8c2908775c/guide-how-to-2b-10.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e49aff7-427f-4196-8133-fa8c2908775c/guide-how-to-2b-10.png)
    
    点击查看大图。
    
    这可以让我们调试输出追踪命中的对象。
    
14.  点击 **Compile** 按钮，然后在编辑器中开始游戏，查看关卡中的立方体。
    
    ![Play in the Editor and look at the cubes in the level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81d2b1cb-888b-4640-9d96-9344631d56e6/guide-how-to-2b-11.png)
    
    此处脱离了第一人称视角，便于从追踪射线的角度查看。
    
    追踪命中立方体后，便会把立方体的名称显示到屏幕上。
    

## 最终结果

上例将返回设为对提供的追踪通道产生响应的所有物体，然而有时候可能需要只返回特定的物体。上例中，可使用 **Actors to Ignore** 引脚接收应被追踪无视的 Actor 阵列（但这意味着必须指定需要无视的每个 Actor）。

也可执行 **Line Trace By Object**，只返回特定的 **ObjectTypes**。这样便能以（追踪中包含的）特定物体集为目标。

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [tracing](https://dev.epicgames.com/community/search?query=tracing)
-   [raycast](https://dev.epicgames.com/community/search?query=raycast)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-a-single-line-trace-raycast-by-channel-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-a-single-line-trace-raycast-by-channel-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)