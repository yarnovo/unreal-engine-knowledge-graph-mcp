# 使用 Multi Line Trace (Raycast) by Object | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-a-multi-line-trace-raycast-by-object-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:52:37.669Z

---

目录

![使用 Multi Line Trace (Raycast) by Object](https://dev.epicgames.com/community/api/documentation/image/aeac568f-9130-4b72-ac2f-5e2e3fc35163?resizing_type=fill&width=1920&height=335)

**MultiLineTraceForObjects** 将沿给定的线执行碰撞追踪并返回所有遭遇的命中，只返回与特定物体类型相匹配的物体。以下是设置 **MultiLineTraceForObjects** 的步骤。

## 步骤

1.  按照用于 [LineTraceByChannel](/documentation/zh-cn/unreal-engine/using-a-single-line-trace-raycast-by-channel-in-unreal-engine) 范例的步骤设置追踪。
    
2.  用 **MultiLineTraceForObjects** 节点替代 **LineTraceByChannel** 节点。
    
3.  从 **Object Types** 引脚连出引线并添加一个 **Make Array** 节点，然后使用下拉菜单将物体添加到阵列。
    
    ![Drag off the Object Types pin and add a Make Array node then use the drop-down menus to add Objects to the Array](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06440333-6988-48ea-a4d4-980e17569d10/guide-how-to-2b-21.png)
    
    我们在此将 **WorldDynamic** 和 **PhysicsBody** 指定为物体类型。可使用 **Add pin** 按钮添加更多物体类型到阵列。
    
4.  从追踪节点的 **Out Hits** 引脚连出引线并添加一个 **ForEachLoop** 节点。
    
    ![Drag off the Out Hits pin of the trace node and add a For Each Loop node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/292a177f-75f2-4a0f-ac4e-3fd4c1550ad7/guide-how-to-2b-22.png)
    
    这使我们能够对追踪命中的每个 Actor 执行操作。
    
5.  从 **Array Element** 连出引线并添加一个 **Break Hit Result**。然后从 **Hit Actor** 连出引线，添加一个 **To String (Object)** 并连接到 **Print String**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7c73a80-933f-4083-90ba-caaddc059266/guide-how-to-2b-23.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7c73a80-933f-4083-90ba-caaddc059266/guide-how-to-2b-23.png)
    
    点击查看大图。
    
    每个被阵列命中的 Actor 将被输出到屏幕。
    

## 结果

此处，物理 Actor（物体类型为物理形体）前方有一个悬挂的吊灯（物体类型为世界动态）。

![A hanging ceiling light World Dynamic Object Type in front of a Physics Actor Physics Body Object Type](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32e28f28-a57a-44dd-bfeb-b78d69e89636/guide-how-to-2b-20.png)

**Multi Line Trace by Object** 与 **Multi Line Trace by Channel** 不同，不会在其命中的首个物体上停止，因此追踪将穿过吊灯到达立方体。

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [tracing](https://dev.epicgames.com/community/search?query=tracing)
-   [raycast](https://dev.epicgames.com/community/search?query=raycast)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-a-multi-line-trace-raycast-by-object-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [结果](/documentation/zh-cn/unreal-engine/using-a-multi-line-trace-raycast-by-object-in-unreal-engine#%E7%BB%93%E6%9E%9C)