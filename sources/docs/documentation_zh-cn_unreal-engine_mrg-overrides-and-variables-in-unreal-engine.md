# 虚幻引擎内MRG的重载和变量 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mrg-overrides-and-variables-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:11:15.910Z

---

目录

![MRG的重载和变量](https://dev.epicgames.com/community/api/documentation/image/3cc9d98a-ce1f-4b4f-b329-a7f166d3fe8f?resizing_type=fill&width=1920&height=335)

## 设置项的重载

每个节点都有自己的一套适用参数。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50883b48-33fb-4880-81ea-5340106a6262/image_0.png)

要更改或重载默认设置，勾选复选框并更新所需的值即可。被重载的参数旁有返回箭头，可将参数重置为类的默认值，这一点与引擎其余部分的工作方式一致。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e791ab4-7fec-4206-96c2-b790364dc102/image_1.png)

你可以在渲染图表中轻松覆盖并重新声明完整的节点。请记住图表的求值从输出流回输入，或从右到左的方式。这意味着在图表更靠后的步骤中，也可以重新声明整个节点。

在下方的简单例子中，我们使用默认的Warm Up Settings节点。对图表求值即可看到最终效果。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a659b49c-1826-48cc-b691-950e5a28c4fb/image_2.png)

如果在下游添加第二个Warmup Settings节点并设定不同的值，我们会发现这些值已在图表求值调试中进行了完全的重新声明。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e6ffdf7-96f9-4d59-8b7d-e81cec4992f3/image_3.png)

这也能够"按链路"生效。

同时也适用于子图表。在此示例中，默认的Warm Up节点位于子图表中。对图表求值后，我们发现父节点图表会从子图表继承预热设置。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a784666-05e7-467f-ae80-7b6051fdc742/image_4.png)

但我们可以在下游将其重载。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e15c0fc-cf39-4017-9a0c-45c643143dcf/image_5.png)

你甚至可以逐链重新声明集合的成员身份。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e9c5e17-da8d-48f7-8a15-329a6cddebc5/image_6.png)

你还可以创建新集合，更改渲染器并重新声明修饰符，使该图表流的求值变得极易编辑且灵活。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1cf888ed-6b61-4e05-8826-3ac24ed61b1a/image_7.png)

## 公开参数和变量

右键点击节点即可查看可作为变量公开的项目。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/741378f4-559b-4717-963c-beea2663419f/image_8.png)

选择属性就会公开其引脚。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89e9da03-96d7-4268-9644-a35faab65eb6/image_9.png)

将鼠标悬停在引脚上，即可查看其数据类型。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c393f39b-891b-42c2-9d1a-d36ea6d2b72c/image_10.png)

打开点击"成员（Members）"选项卡，找到"变量（Variables）"分段，点击加号图标，即可创建你自己的变量。然后请设置变量的名称、类型和默认值。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e93ac1ba-5280-4317-8d71-c572f89881b5/image_11.png)

然后即可直接将变量拖入图表内，并将其连接到适用的引脚上。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8afa4ba0-af92-4d27-b8b5-ae80ca714ba7/image_12.png)

也可以右键点击所需的引脚，选择"提升为变量（Promote to Variable）"。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18e37211-8f4f-4726-bbc9-19e3ced12b56/image_13.png)

如此即可创建具有正确数据类型的变量并成功连接。然后就可以在细节面板中编辑其名称和默认值。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e6163fa-96f5-497d-a179-df317db39b96/image_14.png)

有了公开的变量后，在分配图表时，如有必要，你就可以从影片渲染队列的作业级别上设置这些参数。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12b8355e-1605-467c-9806-0c17359fbdcf/image_15.png)

和图表节点的做法类似，要重载MRQ作业级别上的参数，勾选复选框并设定所需的参数设置即可。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ce100a4-e3ca-4388-89e6-ad4628e35875/image_16.png)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [movie render queue](https://dev.epicgames.com/community/search?query=movie%20render%20queue)
-   [render](https://dev.epicgames.com/community/search?query=render)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置项的重载](/documentation/zh-cn/unreal-engine/mrg-overrides-and-variables-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E9%A1%B9%E7%9A%84%E9%87%8D%E8%BD%BD)
-   [公开参数和变量](/documentation/zh-cn/unreal-engine/mrg-overrides-and-variables-in-unreal-engine#%E5%85%AC%E5%BC%80%E5%8F%82%E6%95%B0%E5%92%8C%E5%8F%98%E9%87%8F)