# 虚幻引擎合成元素参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/compositing-elements-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:27.877Z

---

目录

![合成元素参考](https://dev.epicgames.com/community/api/documentation/image/758ff00a-ffc4-47aa-9281-c7fd8786e0a2?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

元素是用于构造合成的单个构建块。每个元素代表合成的一层，或者合成本身。它们是关卡actor，分别负责渲染合成场景的一个部分。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76eff72e-207d-4c93-8cec-9634ea339831/image4.png "image4.png")

有许多不同的元素类型。所有类型均可配置和修改。元素可设置蓝图，您也可以创建继承自 `ACompositingElement` （或其子类）的自定义元数。

## 基础合成元素

### 空白合成镜头

这是大多数合成的起点。它不含任何通道，需要用户进行填充。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d85be17-31d9-4239-b914-31f9b23ca6e7/image13.png "image13.png")

### 媒体板元素

这个预设元素自带将视频放入合成系统、并在其上方应用 **色度镶迭** 所需要的全部通道。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d567c15c-ae0c-4b3f-8d24-78461c4f3f22/image3.png "image3.png") ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4196e1fc-532e-41f7-89ca-78dbe6fd1e99/image12.png "image12.png")

### CG图层元素

这个预设元素负责渲染来自虚拟场景的actor对象。使用 **采集Actor（Capture Actors）** 属性可指定要包括/排除的actor。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e339411d-d242-405e-8d5e-a442319b3828/image1.png "image1.png") ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a732ca46-bbec-4ca6-ae64-4509bb01d45d/image11.png "image11.png")

### CG遮片元素

这个元素类似于一个普通的 **CG图层** 元素，但是它将CG对象渲染为一个黑/白遮罩纹理。这有助于垃圾遮片，或设置一个与镶迭器同用的持续遮罩。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24d858fd-08a3-41a7-a00f-ac379a8021d9/image5.png "image5.png") ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4531570-30d6-4bbc-ad71-353761b8a9d1/image14.png "image14.png") ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67df2f0c-3523-4016-84ad-f9000a0a5f56/image17.png "image17.png")

修改元素的 **遮片类型（Matte Type）** 属性来翻转遮罩。

### 纹理元素

此元素是一个工具元素，用于将外部纹理导入合成系统中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b52062b1-56d7-4ae1-b8f6-b804d2b32e3a/image2.png "image2.png")

## 高级元素类型

在 **新元素（New Element）** 对话中切换 **所有类（All Classes）** 即可选择高级元素。这些额外的元素通过蓝图创建，可进行修改来满足特定的使用情况。

对于要列出的高级元素，首先必须加载其各自的蓝图。在内容浏览器中合成插件的Blueprints/CompositingElements文件夹下可找到高级元素蓝图（确保内容浏览器设为查看引擎和插件内容）。

### 深度元素

深度元素与CG图层元素相似，但会生成一张展现所包含actor深度的图像。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56861394-6e55-4c7e-8cdb-97d4c53b5bf8/image19.png "image19.png") ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/004a27a8-34c1-4deb-9704-e1256ca24a2d/image10.png "image10.png")

### 圆形元素

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fef1249e-3c6a-4207-9585-37f2c924294d/image9.png "image9.png") ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7f0fba0-9b90-42bd-9893-f827dc82699c/image16.png "image16.png")

### 渐变元素

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7101c1c3-a0f1-4edf-af54-0c3afc5e3a2a/image15.png "image15.png") ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2febda26-7981-45de-ae0f-33230877d8b0/image6.png "image6.png")

### 凹版绘制元素

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f01b0fb-64db-41b4-ad10-86de57f8ffca/image7.gif "image7.gif") ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad98241d-b666-4a1f-ad63-b696d075133d/image18.png "image18.png") 

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [reference](https://dev.epicgames.com/community/search?query=reference)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [基础合成元素](/documentation/zh-cn/unreal-engine/compositing-elements-reference-for-unreal-engine#%E5%9F%BA%E7%A1%80%E5%90%88%E6%88%90%E5%85%83%E7%B4%A0)
-   [空白合成镜头](/documentation/zh-cn/unreal-engine/compositing-elements-reference-for-unreal-engine#%E7%A9%BA%E7%99%BD%E5%90%88%E6%88%90%E9%95%9C%E5%A4%B4)
-   [媒体板元素](/documentation/zh-cn/unreal-engine/compositing-elements-reference-for-unreal-engine#%E5%AA%92%E4%BD%93%E6%9D%BF%E5%85%83%E7%B4%A0)
-   [CG图层元素](/documentation/zh-cn/unreal-engine/compositing-elements-reference-for-unreal-engine#cg%E5%9B%BE%E5%B1%82%E5%85%83%E7%B4%A0)
-   [CG遮片元素](/documentation/zh-cn/unreal-engine/compositing-elements-reference-for-unreal-engine#cg%E9%81%AE%E7%89%87%E5%85%83%E7%B4%A0)
-   [纹理元素](/documentation/zh-cn/unreal-engine/compositing-elements-reference-for-unreal-engine#%E7%BA%B9%E7%90%86%E5%85%83%E7%B4%A0)
-   [高级元素类型](/documentation/zh-cn/unreal-engine/compositing-elements-reference-for-unreal-engine#%E9%AB%98%E7%BA%A7%E5%85%83%E7%B4%A0%E7%B1%BB%E5%9E%8B)
-   [深度元素](/documentation/zh-cn/unreal-engine/compositing-elements-reference-for-unreal-engine#%E6%B7%B1%E5%BA%A6%E5%85%83%E7%B4%A0)
-   [圆形元素](/documentation/zh-cn/unreal-engine/compositing-elements-reference-for-unreal-engine#%E5%9C%86%E5%BD%A2%E5%85%83%E7%B4%A0)
-   [渐变元素](/documentation/zh-cn/unreal-engine/compositing-elements-reference-for-unreal-engine#%E6%B8%90%E5%8F%98%E5%85%83%E7%B4%A0)
-   [凹版绘制元素](/documentation/zh-cn/unreal-engine/compositing-elements-reference-for-unreal-engine#%E5%87%B9%E7%89%88%E7%BB%98%E5%88%B6%E5%85%83%E7%B4%A0)