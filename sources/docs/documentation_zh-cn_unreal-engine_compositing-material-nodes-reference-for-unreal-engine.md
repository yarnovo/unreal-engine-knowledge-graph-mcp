# 虚幻引擎合成材质节点参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/compositing-material-nodes-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:52.070Z

---

目录

![合成材质节点参考](https://dev.epicgames.com/community/api/documentation/image/ac33f6f3-974d-473f-ab74-7231f11dee32?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

为了简化合成操作，我们添加了一系列节点来提供最常见的一些合成操作。我们将在这里简要地重点介绍各个节点及其用途。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c83e2cc-c86f-494c-bc51-3d8956b8f26e/image1.png "image1.png")

合成材质节点需要 **float4** 输入，因此确保传递 **RGBA**，而不仅仅是 **RGB**。

## Over

该节点使用输入A的alpha将一个图像（A）叠加到另一个图像（B）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3ec61ce-e4fd-4fff-8342-c86a549dbd2f/image7.png "image7.png")

该节点需要输入颜色通道预乘图像的alpha。

## In

该节点返回A在B形状以部的部分。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2e6c987-f60a-4721-b3e4-fd4977f96260/image2.png "image2.png")

## Out

该节点返回A在B形状以外的部分。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41ec6c09-9642-42d7-aebc-080a17e39d3c/image3.png "image3.png")

## PreMult

该节点将输入的RGBA通道乘以其alpha。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ccd535e-7833-49b3-bc6c-2675fbdfce6b/image6.png "image6.png")

## UnPreMult

该节点将用输入的RGBA通道除以其alpha。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/055f82a1-e553-4e6b-93fd-2e6cc71cc7ea/image5.png "image5.png")

## KeyMix

该节点使用指定的遮罩将两个图像叠加在一起。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1611648f-7a49-4a61-8726-793f3a62f7de/image4.png "image4.png")

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [reference](https://dev.epicgames.com/community/search?query=reference)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Over](/documentation/zh-cn/unreal-engine/compositing-material-nodes-reference-for-unreal-engine#over)
-   [In](/documentation/zh-cn/unreal-engine/compositing-material-nodes-reference-for-unreal-engine#in)
-   [Out](/documentation/zh-cn/unreal-engine/compositing-material-nodes-reference-for-unreal-engine#out)
-   [PreMult](/documentation/zh-cn/unreal-engine/compositing-material-nodes-reference-for-unreal-engine#premult)
-   [UnPreMult](/documentation/zh-cn/unreal-engine/compositing-material-nodes-reference-for-unreal-engine#unpremult)
-   [KeyMix](/documentation/zh-cn/unreal-engine/compositing-material-nodes-reference-for-unreal-engine#keymix)