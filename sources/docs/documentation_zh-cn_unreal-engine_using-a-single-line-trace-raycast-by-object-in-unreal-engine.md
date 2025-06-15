# 在虚幻引擎中使用 Single Line Trace (Raycast) by Object | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-a-single-line-trace-raycast-by-object-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:52:44.316Z

---

目录

![使用 Single Line Trace (Raycast) by Object](https://dev.epicgames.com/community/api/documentation/image/c97d1aa6-6587-4898-b3e1-3533bab39aa5?resizing_type=fill&width=1920&height=335)

**LineTraceForObjects** 将沿给定的线执行碰撞追踪并返回追踪命中的首个物体（须与特定物体类型匹配）。执行以下步骤设置 **LineTraceForObjects** 追踪：

## 步骤

1.  按照用于 [LineTraceByChannel](/documentation/zh-cn/unreal-engine/using-a-single-line-trace-raycast-by-channel-in-unreal-engine) 范例的步骤设置追踪。
    
2.  用 **Line Trace For Objects** 节点替代 **Line Trace By Channel** 节点。
    
3.  从 **Object Types** 引脚连出引线并添加 **Make Array** 节点。
    
    ![Drag off the Object Types pin and add the Make Array node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9345eaa-1c8d-4473-b7c8-31843dd03068/guide-how-to-2b-12.png)
4.  在 **Make Array** 节点上，通过下拉菜单指定需要追踪的 **物体类型**。
    
    ![Specify the ObjectType you want to trace for via the drop-down menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d2b1cdb-ad1f-47df-8a9b-9a25bd6c3457/guide-how-to-2b-13.png)
    
    此处我们追踪的物体类型是 **WorldDyanmic**。可点击 **Add Pin** 按钮添加更多类型。
    
5.  可以设置 **LineTraceByChannel** 的相同方式设置其余的追踪。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55ce53db-3f2b-4e6a-98f2-8cd27e2c7771/guide-how-to-2b-15.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55ce53db-3f2b-4e6a-98f2-8cd27e2c7771/guide-how-to-2b-15.png)
    
    点击查看大图。
    

## 结果

我们已在关卡中添加一个 **WorldDynamic** 物体。

![A single WorldDynamic Object in our level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/907e14d3-f9cb-480b-a151-9560a02b2154/guide-how-to-2b-16.png)

现在只有添加的 Actor 返回为命中，因此立方体（由于为物理 Actor）不会返回命中。

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [tracing](https://dev.epicgames.com/community/search?query=tracing)
-   [raycast](https://dev.epicgames.com/community/search?query=raycast)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-a-single-line-trace-raycast-by-object-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [结果](/documentation/zh-cn/unreal-engine/using-a-single-line-trace-raycast-by-object-in-unreal-engine#%E7%BB%93%E6%9E%9C)