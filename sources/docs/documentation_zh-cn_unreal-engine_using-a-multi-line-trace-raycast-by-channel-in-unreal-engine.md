# 在虚幻引擎中使用 Multi Line Trace (Raycast) by Channel | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-a-multi-line-trace-raycast-by-channel-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:52:40.224Z

---

目录

![使用 Multi Line Trace (Raycast) by Channel](https://dev.epicgames.com/community/api/documentation/image/754dfb1f-ded7-49ff-9a65-192b2dc92737?resizing_type=fill&width=1920&height=335)

**Multi Line Trace By Channel** 将沿给定线条执行碰撞追踪，并返回所有遭遇的命中，直到并包含首次阻挡命中，只返回对特定追踪通道响应的对象。这就意味着追踪的开始和结束之间有多个带碰撞的 **Actor** 或 **组件** 与特定的追踪通道发生 **重叠**，而您将接收到所有的 Actor 和组件。但是，如果首次命中 **阻挡** 了特定的追踪通道，则只会接收到这一个内容。如希望无视追踪通道的重叠或阻挡接受所有内容，则需要使用 [Multi Line Trace By Object](/documentation/zh-cn/unreal-engine/using-a-multi-line-trace-raycast-by-object-in-unreal-engine)节点。以下是设置 **Multi Line Trace By Channel** 的步骤。

### 步骤

1.  按照用于[Line Trace By Channel](/documentation/zh-cn/unreal-engine/using-a-single-line-trace-raycast-by-channel-in-unreal-engine) 范例的步骤设置追踪。
    
2.  用 **Multi Line Trace By Channel** 节点替代 **Line Trace By Channel** 节点。
    
3.  从 **Out Hits** 引脚连出引线并添加一个 **ForEachLoop** 节点。
    
    ![Drag off the Out Hits pin and add a For Each Loop node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fad2916a-d7c7-40d7-a0ba-994b6a81cdce/guide-how-to-2b-18.png)
    
    因为命中了多个 Actor，我们将对每个 Actor 进行一些操作（此例中是将 Actor 显示到屏幕上）。
    
4.  从 **Array Element** 连出引线并添加一个 **Break Hit Result**；然后从 **Hit Actor** 连出引线，添加一个 **Get Display Name (Object)** 并连接到 **Print String**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a1f78c0-ce6f-44ea-8adf-ab159d4c67d2/guide-how-to-2b-19.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a1f78c0-ce6f-44ea-8adf-ab159d4c67d2/guide-how-to-2b-19.png)
    
    Click image for a full view.
    
    每个被阵列命中的 Actor 将被输出到字符串。
    

## 结果

此处的物理 Actor 前有一扇玻璃窗。

![A Glass Window in front of a Physics Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3229d8cf-e8b3-4175-a805-312d3440c979/guide-how-to-2b-17.png)

玻璃窗是 **可破坏网格体**，我们已对它的 **Trace Response** 进行设置， 碰撞设置中的 **Visibility** 设为 **Overlap**；而物理 Actor（立方体）的 **Visibility** 则设为 **Block**。这样的设置可用于射穿物体（将其摧毁）并击中敌人的情形。

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [tracing](https://dev.epicgames.com/community/search?query=tracing)
-   [raycast](https://dev.epicgames.com/community/search?query=raycast)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-a-multi-line-trace-raycast-by-channel-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [结果](/documentation/zh-cn/unreal-engine/using-a-multi-line-trace-raycast-by-channel-in-unreal-engine#%E7%BB%93%E6%9E%9C)