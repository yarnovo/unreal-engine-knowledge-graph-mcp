# 虚幻引擎中的字体材质和外框 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/font-materials-and-outlines-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:19:18.804Z

---

目录

![字体材质和外框](https://dev.epicgames.com/community/api/documentation/image/df4f85f5-373c-4562-af67-f245ed20eaf0?resizing_type=fill&width=1920&height=335)

在 UMG 中除能够为 **字体** 设置 **颜色和不透明度** 之外，还可使用材质和字体外框进行更多 **字体** 设计。

## 字体颜色

对 **字体** 的 **颜色和不透明度（Color and Opacity）** 进行设置即可设置其 **顶点颜色**。

![Set the Font Color and Opacity](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44ee84bf-fc9b-4463-b8e6-bf88881b848e/ue5_1-01-set-color.png "Set the Font Color and Opacity")

如未指定 **字体材质（Font Material）**，此操作将对文本应用纯色。

![Example of the Font Block without a Font Material specified](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c5bc92e-de73-4332-a74a-7db8df500353/ue5_1-02-example-text-block-1.png "Example of the Font Block without a Font Material specified")

## 字体材质

可在 **Details** 面板中指定 **字体** 的 **字体材质**。

![Set Font Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a4c4915-6843-450f-abec-4842c1366019/ue5_1-03-set-font-material.png "Set Font Material")

如 **字体材质** 不含 **顶点颜色（Vertex Color）** 节点，效果就像是简单乘法。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58b0093e-9b15-43f1-a0f5-2439f319c035/ue5_1-04-base-color.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58b0093e-9b15-43f1-a0f5-2439f319c035/ue5_1-04-base-color.png)

![Base Color material preview](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0316c22c-0a97-4dc6-b6c2-4d060d95245c/ue5_1-05-preview-1.png)

![Example of the Font Block with a Base Color node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef5f77e1-c231-4882-bd47-5064bb903b9b/ue5_1-06-example-text-block-2a.png)

字体材质设置

字体材质预览

最终字体

然而如果在 **字体材质** 中放置一个 **Vertex Color** 节点，即可使用其输出在着色器中执行计算。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fbbde77b-12ff-4608-be37-4576a25ec14b/ue5_1-07-vertex-red-color.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fbbde77b-12ff-4608-be37-4576a25ec14b/ue5_1-07-vertex-red-color.png)

![Vertex Red Color material preview](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d147c6c1-5b96-4748-bc93-8113d639e9c1/ue5_1-08-preview-2.png)

![Example of the Font Block with a Vertex Red Color node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/856136e3-2e33-4416-9c22-994ccc874bf6/ue5_1-09-example-text-block-2b.png)

字体材质设置

字体材质预览

最终字体

用作字体材质的材质必须在 **User Interface** 域中。

![Set Material Domain to UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e7cf0bf-b1b2-4396-84cd-9791c6a1fd27/ue5_1-10-set-domain.png "Set Material Domain to UI")

## 字体外框

您可指定字体外框使用不同的 **外框颜色** 及材质。

![Set the Font Outline Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e5c6d8f-a769-4b61-ba76-29b22399e76f/ue5_1-11-outline-settings.png "Set the Font Outline Settings")

指定的外框尺寸以 Slate 单位计。但字体大小为 1.0 时，1 个 Slate 单位等于 1 像素。

![Example of the Font Block with Outline](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/722356b7-3d9f-4c4e-9b2a-c1cfc2d2d671/ue5_1-12-example-text-block-3.png "Example of the Font Block with Outline")

有趣的一点是您可以指定是否使用 **Separate Fill Alpha**。

![Separate Fill Alpha option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/107201e5-0c40-4314-a5c3-f290eee8c208/ue5_1-13-separate-fill-alpha.png "Separate Fill Alpha option")

启用此项后，填充区域的外框为透明， 可对字体透明度和字体外框进行单独调整。禁用此项后字体将覆盖在外框之上， 因此可添加透明度；通过透明度小于 1 的字体即可看到外框颜色和材质。

![字体颜色Alpha = 0.5，禁用Separate Fill Alpha](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62d01bb6-5b5a-4963-a230-f27ec4576a47/ue5_1-14-separate-fill-alpha-disable.png)

![字体颜色Alpha = 0.5, 启用Separate Fill Alpha](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5c286d6-cf50-4919-afce-b99e9e82ad03/ue5_1-15-separate-fill-alpha-enable.png)

字体颜色Alpha = 0.5，禁用Separate Fill Alpha

字体颜色Alpha = 0.5, 启用Separate Fill Alpha

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)
-   [fonts](https://dev.epicgames.com/community/search?query=fonts)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [字体颜色](/documentation/zh-cn/unreal-engine/font-materials-and-outlines-in-unreal-engine#%E5%AD%97%E4%BD%93%E9%A2%9C%E8%89%B2)
-   [字体材质](/documentation/zh-cn/unreal-engine/font-materials-and-outlines-in-unreal-engine#%E5%AD%97%E4%BD%93%E6%9D%90%E8%B4%A8)
-   [字体外框](/documentation/zh-cn/unreal-engine/font-materials-and-outlines-in-unreal-engine#%E5%AD%97%E4%BD%93%E5%A4%96%E6%A1%86)