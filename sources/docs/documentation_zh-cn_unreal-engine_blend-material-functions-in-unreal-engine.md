# 在虚幻引擎中混合材质函数 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:26:46.341Z

---

目录

![混合材质函数](https://dev.epicgames.com/community/api/documentation/image/c8002943-54d3-426a-accf-8321f69b4e2c?resizing_type=fill&width=1920&height=335)

**混合** 是一种函数类型，这类函数在纹理的颜色信息中执行数学运算，以使一个纹理可以特定方式混合到另一个纹理中。

混合始终具有"底色"（Base）和"混合"（Blend）输入，这两个输入都是"矢量 3"（Vector3）。这两个输入都接收纹理，并以某种方式混合到一起。混合方式取决于您所使用的混合函数类型。

## 混合函数

以下是所有混合材质函数的列表。

### Blend\_ColorBurn（混合\_颜色加深）

**Blend\_ColorBurn（混合\_颜色加深）**以"混合"（Blend）颜色越暗，在最终结果中使用该颜色越多的方式，对材质进行混合。如果"混合"（Blend）颜色为白色，则不进行任何更改。

项目

说明

输入

 

**底色（矢量 3）（Base (Vector3)）**

要以某种方式与"混合"（Blend）纹理进行混合的底色（原始纹理）。

**混合（矢量 3）（Blend (Vector3)）**

这是混合纹理，它根据所执行的混合操作类型，以某种方式与底色混合。

![颜色加深](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/655a4091-6e02-4d08-bb38-738cfbe98968/colorburn.png)

 

![底色（Base）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b395249-d024-4ea9-a801-d0493988d98c/base.png)

![混合（Blend）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/191951e8-e8ba-47a6-8492-86da6653ee98/blend.png)

![颜色加深混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9467b25-1344-4635-b04e-a15da3375634/colorburn2.png)

 

底色（Base）

混合（Blend）

结果（Result）

### Blend\_ColorDodge（混合\_颜色减淡）

**Blend\_ColorDodge（混合\_颜色减淡）**通过将"底色"（Base）颜色反转并将其除以"混合"（Blend）颜色，使结果变亮。

项目

说明

输入

 

**底色（矢量 3）（Base (Vector3)）**

要以某种方式与"混合"（Blend）纹理进行混合的底色（原始纹理）。

**混合（矢量 3）（Blend (Vector3)）**

这是混合纹理，它根据所执行的混合操作类型，以某种方式与底色混合。

![颜色减淡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf4665de-2eda-4397-98b2-bf9efc0f8d31/colordodge.png)

 

![底色（Base）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae6fd52b-2d0b-42e7-992d-266834592e43/base.png)

![混合（Blend）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42562c01-65ba-48a5-a0b1-85dff0d0a380/blend.png)

![颜色减淡混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b299589a-c699-4821-b625-af93a7ebcfa1/colordodge2.png)

 

底色（Base）

混合（Blend）

结果（Result）

### Blend\_Darken（混合\_变暗）

**Blend\_Darken（混合\_变暗）**针对"底色"（Base）和"混合"（Blend）颜色的每个像素，选择较暗的值。如果"混合"（Blend）颜色为白色，则不会产生变化。

项目

说明

输入

 

**底色（矢量 3）（Base (Vector3)）**

要以某种方式与"混合"（Blend）纹理进行混合的底色（原始纹理）。

**混合（矢量 3）（Blend (Vector3)）**

这是混合纹理，它根据所执行的混合操作类型，以某种方式与底色混合。

![变暗](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa7ef824-ca32-4967-88f1-b149bf48c555/darken.png)

 

![底色（Base）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37e3be4e-d37d-481b-b1e6-3b521064dd88/base.png)

![混合（Blend）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d409f795-fd11-4866-b39c-388a9cb95df0/blend.png)

![变暗混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5296a91d-b92a-42fd-9a52-e06a9c589d99/darken2.png)

 

底色（Base）

混合（Blend）

结果（Result）

### Blend\_Difference（混合\_差异）

**Blend\_Difference（混合\_差异）**通过从"混合"（Blend）中减去"底色"（Base），然后取结果的绝对值，创建反转样式的效果。

项目

说明

输入

 

**底色（矢量 3）（Base (Vector3)）**

要以某种方式与"混合"（Blend）纹理进行混合的底色（原始纹理）。

**混合（矢量 3）（Blend (Vector3)）**

这是混合纹理，它根据所执行的混合操作类型，以某种方式与底色混合。

![差异](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2a69417-7f67-4c18-980b-61601ae537fd/difference.png)

 

![底色（Base）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28c7a9e3-3cc0-4afb-bc1f-39232dd2a29a/base.png)

![混合（Blend）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/555e61e1-df46-413d-82f0-c0ed5c06120f/blend.png)

![差异混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11233587-b966-4fb9-aca1-b14bfb1fae57/difference2.png)

 

底色（Base）

混合（Blend）

结果（Result）

### Blend\_Exclusion（混合\_排除）

**Blend\_Exclusion（混合\_排除）**将"底色"（Base）和"混合"（Blend）纹理二等分，对其进行组合，然后对结果执行部分反转。

项目

说明

输入

 

**底色（矢量 3）（Base (Vector3)）**

要以某种方式与"混合"（Blend）纹理进行混合的底色（原始纹理）。

**混合（矢量 3）（Blend (Vector3)）**

这是混合纹理，它根据所执行的混合操作类型，以某种方式与底色混合。

![排除](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47fe0ca5-329b-4b65-8c4f-85aaff6da5e5/exclusion.png)

 

![底色（Base）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/280330a2-d439-4e4e-8816-d0ce6be85c2b/base.png)

![混合（Blend）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95b3b369-5ebc-4ee7-9cf0-7c5117962b71/blend.png)

![排除混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f887049-267e-4d1f-8784-6e264341d35b/exclusion2.png)

 

底色（Base）

混合（Blend）

结果（Result）

### Blend\_HardLight（混合\_强光）

**Blend\_HardLight（混合\_强光）**与 Blend\_Overlay（混合\_覆盖）的粗糙版本相似，它会对"底色"（Base）和"混合"（Blend）进行筛滤或相乘。此函数对"混合"（Blend）颜色执行比较，从而每当"混合"（Blend）比 50% 灰度亮时，就通过"筛滤"（Screen）操作对"底色"（Base）和"混合"（Blend）进行组合。如果"混合"（Blend）比 50% 灰度暗，那么将像"乘"功能一样，将"底色"（Base）与"混合"（Blend）相乘。然后，提高最终结果的对比度，以产生粗糙输出。

项目

说明

输入

 

**底色（矢量 3）（Base (Vector3)）**

要以某种方式与"混合"（Blend）纹理进行混合的底色（原始纹理）。

**混合（矢量 3）（Blend (Vector3)）**

这是混合纹理，它根据所执行的混合操作类型，以某种方式与底色混合。

![强光](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48c25dcd-abfa-4467-ba78-91b0a40a44a4/hardlight.png)

 

![底色（Base）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/746ec702-e660-4dac-90aa-2ff2f33deb38/base.png)

![混合（Blend）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/045db2c0-8a78-4412-bb02-5bc6e512cd2c/blend.png)

![强光混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8bb90fb-3f12-4ea5-88b3-72287edffcce/hardlight2.png)

 

底色（Base）

混合（Blend）

结果（Result）

### Blend\_Lighten（混合\_变亮）

**Blend\_Lighten（混合\_变亮）**对"底色"（Base）和"混合"（Blend）颜色的每个像素进行比较，并返回较亮的结果。

项目

说明

输入

 

**底色（矢量 3）（Base (Vector3)）**

要以某种方式与"混合"（Blend）纹理进行混合的底色（原始纹理）。

**混合（矢量 3）（Blend (Vector3)）**

这是混合纹理，它根据所执行的混合操作类型，以某种方式与底色混合。

![变亮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76d5c7a5-8f15-45a5-a009-a756aa8560c9/lighten.png)

 

![底色（Base）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4753d96-3de8-4a7b-8a96-182598fdf3c5/base.png)

![混合（Blend）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/adc14815-ea77-4b81-8c3b-7e89154021a9/blend.png)

![变亮混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4aef4029-79fa-4b01-a499-143559553274/lighten2.png)

 

底色（Base）

混合（Blend）

结果（Result）

### Blend\_LinearBurn（混合\_线性加深）

**Blend\_LinearBurn（混合\_线性加深）**将"底色"（Base）颜色与"混合"（Blend）颜色相加，然后从结果中减去 1。

项目

说明

输入

 

**底色（矢量 3）（Base (Vector3)）**

要以某种方式与"混合"（Blend）纹理进行混合的底色（原始纹理）。

**混合（矢量 3）（Blend (Vector3)）**

这是混合纹理，它根据所执行的混合操作类型，以某种方式与底色混合。

![线性加深](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa4d2a57-e1b0-4b29-a4c5-7c358f77e71a/linearburn.png)

 

![底色（Base）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/030694d6-5ac7-4197-b86b-6010fc5d9ae8/base.png)

![混合（Blend）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ec54a08-9e84-45f6-afff-80c966f40660/blend.png)

![线性加深混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/672beebe-3c3a-46c6-89b8-d991d251a876/linearburn2.png)

 

底色（Base）

混合（Blend）

结果（Result）

### Blend\_LinearDodge（混合\_线性减淡）

**Blend\_LinearDodge（混合\_线性减淡）**将"底色"（Base）颜色与"混合"（Blend）颜色相加。

项目

说明

输入

 

**底色（矢量 3）（Base (Vector3)）**

要以某种方式与"混合"（Blend）纹理进行混合的底色（原始纹理）。

**混合（矢量 3）（Blend (Vector3)）**

这是混合纹理，它根据所执行的混合操作类型，以某种方式与底色混合。

![线性减淡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f759baec-2eeb-4dcd-bf73-035e374f88cd/lineardodge.png)

 

![底色（Base）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13ce8cdd-fc72-4c0b-a732-132af7e67768/base.png)

![混合（Blend）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7f14af4-bf9e-4f5e-b521-e2844b2f51f2/blend.png)

![线性减淡混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00d620b0-4f48-4b09-a21c-e606376ca766/lineardodge2.png)

 

底色（Base）

混合（Blend）

结果（Result）

### Blend\_LinearLight（混合\_线性光）

**Blend\_LinearLight（混合\_线性光）**是 Blend\_Overlay（混合\_覆盖）的线性版本，用于提供更粗糙的结果。此函数对"混合"（Blend）颜色执行比较，从而每当"混合"（Blend）比 50% 灰度亮时，就通过"筛滤"（Screen）操作对"底色"（Base）和"混合"（Blend）进行组合。如果"混合"（Blend）比 50% 灰度暗，那么将像"乘"功能一样，将"底色"（Base）与"混合"（Blend）相乘。

项目

说明

输入

 

**底色（矢量 3）（Base (Vector3)）**

要以某种方式与"混合"（Blend）纹理进行混合的底色（原始纹理）。

**混合（矢量 3）（Blend (Vector3)）**

这是混合纹理，它根据所执行的混合操作类型，以某种方式与底色混合。

![线性光](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6491b2e3-2b2d-4c90-9378-a5eb6ef9628c/linearlight.png)

 

![底色（Base）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57eb20ba-3c9a-42a6-a6d2-aa143bab61b6/base.png)

![混合（Blend）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97fb65d3-c09b-4f14-8312-928fa3efd59d/blend.png)

![线性光混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87b4b240-38ea-4a36-875c-9299f1ef8e67/linearlight2.png)

 

底色（Base）

混合（Blend）

结果（Result）

### Blend\_Overlay（混合\_覆盖）

**Blend\_Overlay（混合\_覆盖）**对"底色"（Base）和"混合"（Blend）进行筛滤或相乘。此函数对"混合"（Blend）颜色执行比较，从而每当"混合"（Blend）比 50% 灰度亮时，就通过"筛滤"（Screen）操作对"底色"（Base）和"混合"（Blend）进行组合。如果"混合"（Blend）比 50% 灰度暗，那么将像"乘"功能一样，将"底色"（Base）与"混合"（Blend）相乘。

项目

说明

输入

 

**底色（矢量 3）（Base (Vector3)）**

要以某种方式与"混合"（Blend）纹理进行混合的底色（原始纹理）。

**混合（矢量 3）（Blend (Vector3)）**

这是混合纹理，它根据所执行的混合操作类型，以某种方式与底色混合。

![覆盖](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c8fc4c3-947b-4899-842b-c07d8fec8e1f/overlay.png)

 

![底色（Base）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/286fc9f2-4a1b-48da-8cf8-60a18f792796/base.png)

![混合（Blend）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a37e1ad-fabd-498d-b037-75af9f83caf6/blend.png)

![覆盖混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4140a26-7d8d-46e6-b356-73f8d0e91f3f/overlay2.png)

 

底色（Base）

混合（Blend）

结果（Result）

### Blend\_PinLight（混合\_点光）

**Blend\_PinLight（混合\_点光）**与 Blend\_Overlay（混合\_覆盖）相似，它使"底色"（Base）和"混合"（Blend）一起变亮或变暗。此函数对"混合"（Blend）颜色执行比较，从而每当"混合"（Blend）比 50% 灰度亮时，就通过"筛滤"（Screen）操作对"底色"（Base）和"混合"（Blend）进行组合。如果"混合"（Blend）比 50% 灰度暗，那么将像"乘"功能一样，将"底色"（Base）与"混合"（Blend）相乘。对比度会软化，这使此函数成为 Overlay（覆盖）的不太粗糙版本。

项目

说明

输入

 

**底色（矢量 3）（Base (Vector3)）**

要以某种方式与"混合"（Blend）纹理进行混合的底色（原始纹理）。

**混合（矢量 3）（Blend (Vector3)）**

这是混合纹理，它根据所执行的混合操作类型，以某种方式与底色混合。

![点光](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3ab70c5-53ca-44f5-9824-bc9539ee64a3/pinlight.png)

 

![底色（Base）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82be1393-6079-4657-96d8-d6f9457962e4/base.png)

![混合（Blend）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04a8af23-1f73-41bb-b23f-e4cf5a5ae11a/blend.png)

![点光混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/adca703f-1573-4ccf-8e12-2b54173a1d5a/pinlight2.png)

 

底色（Base）

混合（Blend）

结果（Result）

### Blend\_Screen（混合\_筛滤）

**Blend\_Screen（混合\_筛滤）**按"混合"（Blend）颜色使"底色"（Base）变亮。其工作方式如下：对这两种颜色都执行"一减"，将它们相乘，然后对结果执行"一减"。

项目

说明

输入

 

**底色（矢量 3）（Base (Vector3)）**

要以某种方式与"混合"（Blend）纹理进行混合的底色（原始纹理）。

**混合（矢量 3）（Blend (Vector3)）**

这是混合纹理，它根据所执行的混合操作类型，以某种方式与底色混合。

![筛滤](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4409300-40d7-4531-beb5-1e3cf7339389/screen.png)

 

![底色（Base）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad13e455-3376-4677-9a95-06a2771a66dd/base.png)

![混合（Blend）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77833adb-5712-4c1a-9d9c-eef2edbd345a/blend.png)

![筛滤混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10aa680e-ae17-44d2-bcea-4ac3ce397358/screen2.png)

 

底色（Base）

混合（Blend）

结果（Result）

### Blend\_SoftLight（混合\_柔光）

**Blend\_SoftLight（混合\_柔光）**是 Overlay（覆盖）的柔和版本。此函数对"混合"（Blend）颜色执行比较，从而每当"混合"（Blend）比 50% 灰度亮时，就通过"筛滤"（Screen）操作对"底色"（Base）和"混合"（Blend）进行组合。如果"混合"（Blend）比 50% 灰度暗，那么将像"乘"功能一样，将"底色"（Base）与"混合"（Blend）相乘。对比度会软化，这使此函数成为 Overlay（覆盖）的不太粗糙版本。

项目

说明

输入

 

**底色（矢量 3）（Base (Vector3)）**

要以某种方式与"混合"（Blend）纹理进行混合的底色（原始纹理）。

**混合（矢量 3）（Blend (Vector3)）**

这是混合纹理，它根据所执行的混合操作类型，以某种方式与底色混合。

![柔光](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42c7305a-8053-464a-80a5-33d57f60fda5/softlight.png)

 

![底色（Base）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c0ad8bd-c7aa-4c1d-959d-bdfb97226351/base.png)

![混合（Blend）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59fed341-7e48-4395-893b-6c3f513265ac/blend.png)

![柔光混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb982d5a-477d-4dcd-82cd-cee13b084724/softlight2.png)

 

底色（Base）

混合（Blend）

结果（Result）

-   [materials](https://dev.epicgames.com/community/search?query=materials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [混合函数](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#%E6%B7%B7%E5%90%88%E5%87%BD%E6%95%B0)
-   [Blend\_ColorBurn（混合\_颜色加深）](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#blend-colorburn%EF%BC%88%E6%B7%B7%E5%90%88-%E9%A2%9C%E8%89%B2%E5%8A%A0%E6%B7%B1%EF%BC%89)
-   [Blend\_ColorDodge（混合\_颜色减淡）](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#blend-colordodge%EF%BC%88%E6%B7%B7%E5%90%88-%E9%A2%9C%E8%89%B2%E5%87%8F%E6%B7%A1%EF%BC%89)
-   [Blend\_Darken（混合\_变暗）](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#blend-darken%EF%BC%88%E6%B7%B7%E5%90%88-%E5%8F%98%E6%9A%97%EF%BC%89)
-   [Blend\_Difference（混合\_差异）](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#blend-difference%EF%BC%88%E6%B7%B7%E5%90%88-%E5%B7%AE%E5%BC%82%EF%BC%89)
-   [Blend\_Exclusion（混合\_排除）](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#blend-exclusion%EF%BC%88%E6%B7%B7%E5%90%88-%E6%8E%92%E9%99%A4%EF%BC%89)
-   [Blend\_HardLight（混合\_强光）](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#blend-hardlight%EF%BC%88%E6%B7%B7%E5%90%88-%E5%BC%BA%E5%85%89%EF%BC%89)
-   [Blend\_Lighten（混合\_变亮）](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#blend-lighten%EF%BC%88%E6%B7%B7%E5%90%88-%E5%8F%98%E4%BA%AE%EF%BC%89)
-   [Blend\_LinearBurn（混合\_线性加深）](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#blend-linearburn%EF%BC%88%E6%B7%B7%E5%90%88-%E7%BA%BF%E6%80%A7%E5%8A%A0%E6%B7%B1%EF%BC%89)
-   [Blend\_LinearDodge（混合\_线性减淡）](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#blend-lineardodge%EF%BC%88%E6%B7%B7%E5%90%88-%E7%BA%BF%E6%80%A7%E5%87%8F%E6%B7%A1%EF%BC%89)
-   [Blend\_LinearLight（混合\_线性光）](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#blend-linearlight%EF%BC%88%E6%B7%B7%E5%90%88-%E7%BA%BF%E6%80%A7%E5%85%89%EF%BC%89)
-   [Blend\_Overlay（混合\_覆盖）](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#blend-overlay%EF%BC%88%E6%B7%B7%E5%90%88-%E8%A6%86%E7%9B%96%EF%BC%89)
-   [Blend\_PinLight（混合\_点光）](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#blend-pinlight%EF%BC%88%E6%B7%B7%E5%90%88-%E7%82%B9%E5%85%89%EF%BC%89)
-   [Blend\_Screen（混合\_筛滤）](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#blend-screen%EF%BC%88%E6%B7%B7%E5%90%88-%E7%AD%9B%E6%BB%A4%EF%BC%89)
-   [Blend\_SoftLight（混合\_柔光）](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine#blend-softlight%EF%BC%88%E6%B7%B7%E5%90%88-%E6%9F%94%E5%85%89%EF%BC%89)