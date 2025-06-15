# 使用虚幻引擎网格体贴花 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-mesh-decals-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:27:22.864Z

---

目录

![网格体贴花](https://dev.epicgames.com/community/api/documentation/image/f3efd0b6-793d-4cfd-8af7-bee10fa7f9e8?resizing_type=fill&width=1920&height=335)

虚幻引擎现支持 **网格体贴花（Mesh Decals）**，使用户能在单独的表面几何体上使用延迟贴花属性， 在静态和骨架网格体上形成更多细节。因为延迟贴花依赖于投射， 因此多数平面表面未与其被投射的表面对齐时，将出现剪切和扭曲现象。 网格体贴花则可提供不跟随简单投射的贴花，而能够结合包裹边缘的几何体使用， 结合样条使用，最终提升角色的外观效果。

## 网格体贴花与遮罩材质比较

网格体贴花是半透明混合模式和延迟贴花的混搭，它们并不渲染到深度中，但会在不透明几何体被渲染后对 GBuffer 或 DBuffer 进行更新。与使用遮罩材质不同的是，EarlyZ 通道不存在开销，不会获得阴影或适当的遮蔽，但可通过权衡获得材质中的柔和过渡。

需要注意的是，网格体贴花和延迟贴花 Actor 之间存在数点不同：

-   较大的延迟贴花通常执行朝前和朝后的绘制调用，因此绘制调用数更少。
-   被覆盖的像素更少，扁平朝后的贴花覆盖的像素为 0，因此处理速度更快。
-   可使用自定义 UV，因此能进行更为复杂的投射。
-   可使覆盖法线贴图的贴花围绕表面进行包裹（或沿样条进行拉伸）。

![ Mesh Decal ](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/780bf88f-7ae6-4672-84a5-4422bb76e77c/meshdecal.png)

![ Masked Material ](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f14c74e2-9dfd-437b-9bc0-658a9e65c25b/maskedmaterial.png)

Mesh Decal

Masked Material

## 创建内容

创建内容进行使用，因为网格体贴花几何体与模型创建相一致。因为几何体不依赖于投射（如延迟贴花 Actor）， 所以几何体只需要停留在需要影响的表面前方。由此可以得出，贴花几何体应该"拥抱"下方的表面，但却无需十分紧密地进行匹配， 因为已经应用了一个较小的深度偏差，足以容纳这个小偏差。此外，在贴花之外伸出一些几何体有助于形成贴花的柔和过渡， 这样的效果无法通过遮罩材质实现。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fed70c88-de59-4eea-96b1-33409fb6211a/meshdecalauthoring.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba8be4a5-7a68-4297-8af3-d807564f6f3a/meshdecalauthoringcomposite.png)

基础模型和贴花几何体（单独）

合成模型

创建内容时需要注意的另外一点是网格体贴花结合 LOD 使用时会较为困难，在深度缓冲精度有限时远距离观察同样效果不佳， 因为几何体将如预期相交（或不能匹配）。然而可以修改模型来解决这个问题（多数情况下），或者使用材质中的 **世界位置偏差（World Position Offset）** 来调整偏差，而无需返回建模应用程序进行处理。

![Mesh Decal offset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11a15cad-9d15-4773-a499-a98094293dc1/mesh-decal-offset.png)

![ 偏移值：0 ](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7837843-18f7-474a-a38e-97c49dad360f/2_offset.png)

![ 偏移值：-0.6 ](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a9d933a-7bcb-4638-b1c9-adeafa03d314/1_offset.png)

偏移值：0

偏移值：-0.6

在此例中，贴花几何体与基础模型十分接近，深度无法容纳偏差。使用较小的负偏差值将几何体拉出一些， 避免其与下方的几何体相交。

## 注意事项

-   DBuffer 和非 DBuffer 使用相同的容器。
-   有许多层重叠时按深度排序可避免穿帮。
-   并行渲染尚未衔接。如大量使用此功能，将节约一些 CPU 开销。

## 限制

-   材质编辑器预览不可见。
-   美术师无法进行指定排序。
-   尚未加入切线空间支持。
-   着色器过度绘制/过度绘制功能缺失。
-   材质编辑器对基础通道使用进行假设，因此它当前无法显示正确的指令数。
-   不能对 DepthBias 便利地进行调节。当前版本中用户需要从模型之上的表面使用模型中的偏差，或通过材质中的世界位置偏差进行控制。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [decals](https://dev.epicgames.com/community/search?query=decals)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [网格体贴花与遮罩材质比较](/documentation/zh-cn/unreal-engine/using-mesh-decals-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E8%B4%B4%E8%8A%B1%E4%B8%8E%E9%81%AE%E7%BD%A9%E6%9D%90%E8%B4%A8%E6%AF%94%E8%BE%83)
-   [创建内容](/documentation/zh-cn/unreal-engine/using-mesh-decals-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%86%85%E5%AE%B9)
-   [注意事项](/documentation/zh-cn/unreal-engine/using-mesh-decals-in-unreal-engine#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
-   [限制](/documentation/zh-cn/unreal-engine/using-mesh-decals-in-unreal-engine#%E9%99%90%E5%88%B6)