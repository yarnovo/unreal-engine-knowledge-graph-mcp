# 虚幻引擎中的材质混合模式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:25:52.994Z

---

目录

![材质混合模式](https://dev.epicgames.com/community/api/documentation/image/49117438-bf24-489c-945f-c2ec1501639f?resizing_type=fill&width=1920&height=335)

混合模式说明当前材质的输出如何与背景中已经绘制的内容混合。 从专业角度来说，当某个材质需要叠加在其他像素上进行绘制时，混合模式允许你控制引擎如何将材质（**来源颜色**）与帧缓冲区中的内容（**目标颜色**）相混合。

混合模式选项与其他基础[材质属性](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-material-properties)都位于"细节（Details）"面板中：

[![混合模式下拉菜单](https://dev.epicgames.com/community/api/documentation/image/97c43edc-297d-4106-8945-e92770e6f431?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/97c43edc-297d-4106-8945-e92770e6f431?resizing_type=fit)

本文将在一台摄像机和墙壁之间放置一个球体，以此演示各种混合模式的效果。 更改球体材质上的混合模式，可以看到球体如何与墙面上的像素混合。

[![混合模式演示设置](https://dev.epicgames.com/community/api/documentation/image/58e8aa30-e0b3-49b4-9ed6-22f89ea82212?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/58e8aa30-e0b3-49b4-9ed6-22f89ea82212?resizing_type=fit)

## 不透明

不透明（Opaque）混合模式是最简单的模式，大概也是最常用的模式。 它表示表面既不能被光线通过、也不能被穿透。 此模式适合大部分塑料、金属、岩石等表面，以及其他表面类型的大部分区域。 在摄像机画面中，金色球体完全遮挡了它后面的墙壁。

[![不透明混合模式](https://dev.epicgames.com/community/api/documentation/image/f6a8d6a9-ab05-4a36-9276-7b8ae836db61?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f6a8d6a9-ab05-4a36-9276-7b8ae836db61?resizing_type=fit)

 

 

[![](https://dev.epicgames.com/community/api/documentation/image/74a2f8f2-ec42-4ddc-ba49-163894e221e2?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/74a2f8f2-ec42-4ddc-ba49-163894e221e2?resizing_type=fit)

[![](https://dev.epicgames.com/community/api/documentation/image/1312bfe1-6c37-4098-a6af-1bb889586fcd?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1312bfe1-6c37-4098-a6af-1bb889586fcd?resizing_type=fit)

场景设置

摄像机视图

## 遮罩

遮罩混合模式（Masked Blend Mode）用于一些需要以二元（开/关）方式控制可视性的对象。 例如，假定一个材质要模拟铁丝围栏或格栅。 某些区域看起来像固体，而其他区域不可见。 此类材质适合于遮罩混合模式。

下面显示了一个遮罩材质的图表，其中，一张黑白条带纹理是**不透明遮罩（Opacity Mask）**的输入参数。 遮罩的白色部分表示该区域可见，而黑色则不可见。 使用遮罩材质时，不存在中间区域的不透明度。

[![遮罩材质图表](https://dev.epicgames.com/community/api/documentation/image/ca1eabff-bfa5-47c0-a645-f515f4f1d1c7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ca1eabff-bfa5-47c0-a645-f515f4f1d1c7?resizing_type=fit)

下面是该材质在摄像机中的样子：

[![遮罩材质](https://dev.epicgames.com/community/api/documentation/image/29cc6feb-1e8c-4769-8a5d-eee309754033?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/29cc6feb-1e8c-4769-8a5d-eee309754033?resizing_type=fit)

请记住，**透明**和**不渲染**是不同的概念。 透明表面（例如玻璃）仍会参与光线的交互，例如反射（镜面反射）。 而在遮罩模式下，被剔除的像素将完全不被绘制；这些区域看不到任何反射。 如果你想保留反射或高光度功能，最好使用半透明混合模式，或考虑创建[分层材质](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/layering-materials-in-unreal-engine)。

此外，由于被剔除的区域中不会渲染特定效果（例如反射），因此系统不会计算它们，从而节省GPU的性能开销。

### 不透明裁剪遮罩

使用遮罩混合模式时，你需要特别注意**不透明遮罩裁剪值（Opacity Mask Clip Value）**这个属性。 该属性是一个0-1的标量值，决定了不透明遮罩纹理中的像素在低于多少值后将被剔除（分界点）；比这个分界点**更暗**的像素将一律不渲染。

![不透明遮罩裁剪值（拖动滑块可预览。）](https://dev.epicgames.com/community/api/documentation/image/158c12d8-4003-4e30-bd5d-a2de2ffdb9d1?resizing_type=fit&width=1920&height=1080)![不透明遮罩裁剪值（拖动滑块可预览。）](https://dev.epicgames.com/community/api/documentation/image/c6f2ef31-03e8-4aef-ab4a-a15af1f7900d?resizing_type=fit&width=1920&height=1080)![不透明遮罩裁剪值（拖动滑块可预览。）](https://dev.epicgames.com/community/api/documentation/image/a49bff46-98c0-4d0d-88a5-2d1917d8096c?resizing_type=fit&width=1920&height=1080)![不透明遮罩裁剪值（拖动滑块可预览。）](https://dev.epicgames.com/community/api/documentation/image/93842766-63b6-43eb-bad6-ee1821b3c49f?resizing_type=fit&width=1920&height=1080)![不透明遮罩裁剪值（拖动滑块可预览。）](https://dev.epicgames.com/community/api/documentation/image/fd7c311f-a461-462b-a651-2087acffc7cd?resizing_type=fit&width=1920&height=1080)![不透明遮罩裁剪值（拖动滑块可预览。）](https://dev.epicgames.com/community/api/documentation/image/2ffeb679-46a2-4030-b52f-0eb168da7849?resizing_type=fit&width=1920&height=1080)![不透明遮罩裁剪值（拖动滑块可预览。）](https://dev.epicgames.com/community/api/documentation/image/866d2003-3aae-4110-9162-d11bdbdec178?resizing_type=fit&width=1920&height=1080)![不透明遮罩裁剪值（拖动滑块可预览。）](https://dev.epicgames.com/community/api/documentation/image/6bcc6490-3b05-4c7a-819b-12b39bbe008f?resizing_type=fit&width=1920&height=1080)![不透明遮罩裁剪值（拖动滑块可预览。）](https://dev.epicgames.com/community/api/documentation/image/53497360-d6f5-46b6-9815-d873dbcb5886?resizing_type=fit&width=1920&height=1080)

**不透明遮罩裁剪值（拖动滑块可预览。）**

在以上示例中，材质的**双面（Two Sided）**属性为**True**（勾选状态），这就是你能看到盒子内部的原因。

此外，尽管此处是一个交互式示例，但**不透明遮罩裁剪值（Opacity Mask Clip Value）**属性本身无法在运行时更改。

## 半透明（Translucent）

半透明混合模式（Translucent Blend Mode）用于需要某种形式的透明度的对象。 它不同于遮罩混合模式，因为它允许透明度的级别发生变化。

[![半透明材质图表](https://dev.epicgames.com/community/api/documentation/image/f6e1bb8c-896e-48a5-8475-41922f486d93?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f6e1bb8c-896e-48a5-8475-41922f486d93?resizing_type=fit)

这种混合模式的工作方式如下：接收一个**不透明度（Opacity）**值或纹理，并将其应用于表面，使得黑色区域完全透明，白色区域完全不透明，而不同深浅的中间渐变色将产生对应的透明度水平。 在示例中，不透明参数接受了一张黑白色梯度纹理，这样，球体在网格体顶部完全透明，中间逐渐变色，在底部变得完全不透明。

[![球体上的半透明梯度](https://dev.epicgames.com/community/api/documentation/image/267d489c-31e2-4716-b305-e5b956964666?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/267d489c-31e2-4716-b305-e5b956964666?resizing_type=fit)

重点来了！注意，半透明材质目前不支持镜面反射。 这意味着，你在表面上看不到任何反射。 但是，你可以使用使用立方体贴图，通过类似如下的节点网络来模拟反射。 立方体贴图（Cubemap）纹理会直接添加到基础颜色之上。

[![球体上的伪高光度](https://dev.epicgames.com/community/api/documentation/image/f12f797b-e86f-4b46-8906-b48e97c78361?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f12f797b-e86f-4b46-8906-b48e97c78361?resizing_type=fit)

## 叠加

叠加混合模式（Additive Blend Mode）中，引擎直接获取材质的像素，将其与背景像素相加。 这很像Photoshop中的*线性减淡（添加）（Linear Dodge (Add)）*混合模式。 这表示不会变暗；因为所有像素值都添加在一起，黑色直接渲染为透明。 这种混合方式适合于各种特殊效果，例如火焰、蒸汽或全息图。

[![叠加材质图表](https://dev.epicgames.com/community/api/documentation/image/9d13d8de-7055-48d2-a1b8-b850a059d27c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9d13d8de-7055-48d2-a1b8-b850a059d27c?resizing_type=fit)

与半透明混合模式一样，此混合模式不支持高光度（即 反射）。 这种叠加性质可能意味着，你也无法使用反射效果；不过你可以参考上文中半透明（Translucent）小节中的立方体贴图，模拟类反射的效果。

在下图中，场景中添加了两个球体。 请注意，在两个球体重叠之处，像素被叠加到一起，因此更加明亮。

[![叠加材质示例](https://dev.epicgames.com/community/api/documentation/image/14c12894-3d5e-4793-8f76-d30165f8d137?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/14c12894-3d5e-4793-8f76-d30165f8d137?resizing_type=fit)

叠加型材质的一个缺陷是，在浅色背景上常常很难辨识。 侧视图说明了这点。

[![叠加材质侧视图](https://dev.epicgames.com/community/api/documentation/image/3eb6e103-cb6a-493a-be93-8104b474746f?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/3eb6e103-cb6a-493a-be93-8104b474746f?resizing_type=fit)

一种解决方案是改用[AlphaComposite](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine)混合模式，它可以优化明亮场景中的饱和度和可视性。

## 调制

调制混合模式（Modulate Blend Mode）将材质的值乘以背景的像素。 它的效果类似于Photoshop中的正片叠底混合模式（ Multiply Blend Mode），能产生变暗的效果。

[![调制材质图表](https://dev.epicgames.com/community/api/documentation/image/2f0444ad-60f9-40a6-a490-8665f62fd460?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2f0444ad-60f9-40a6-a490-8665f62fd460?resizing_type=fit)

在上图中，材质着色模型为**无光照（Unlit）**，混合模式为**调制（Modulate）**。 "自发光"采用了一个Constant3向量作为参数，用于定义表面的颜色。

[![调制材质示例](https://dev.epicgames.com/community/api/documentation/image/91c9ec88-f952-4439-ad95-908b1c01dd6c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/91c9ec88-f952-4439-ad95-908b1c01dd6c?resizing_type=fit)

请注意，多个球体重叠时，其像素会相乘，导致颜色变深。

调制混合模式最适合某些粒子效果，但请注意，此模式不支持光照或单独半透明。

## Alpha复合

**AlphaComposite**混合模式可以让你控制材质部分的混合方式。 通过一些材质设置或逻辑，你可以控制材质的哪些部分以叠加方式混合，哪些部分使用材质的不透明输入以半透明方式混合。 AlphaComposite的原理是将底层场景颜色乘以材质不透明度的反转值。因此当材质被添加到场景颜色时，较不透明的部分会比那些更不透明的部分显得更加鲜艳饱和。

[![Alpha复合图表](https://dev.epicgames.com/community/api/documentation/image/2f6de427-6f2d-484f-8c45-c2f34fbaad6d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2f6de427-6f2d-484f-8c45-c2f34fbaad6d?resizing_type=fit)

使用具有实际效果的AlphaComposite的材质设置示例。

## Alpha维持

**AlphaHoldout**混合模式可让你"维持"材质的Alpha，在视图空间中直接在材质后方的对象上打孔。 下图显示了AlphaHoldout实现的摄像机和场景布局。

[![](https://dev.epicgames.com/community/api/documentation/image/f277bd23-8362-44e5-b5ac-73cf0016dcf1?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f277bd23-8362-44e5-b5ac-73cf0016dcf1?resizing_type=fit)

1.  摄像机。
    
2.  前景中的静态网格体充当"打孔"对象。 **AlphaHoldout材质**被应用于该网格体。 该材质必须使用**无光照**着色模型。
    
3.  接收表面（你打算穿过其中打孔）放置在AlphaHoldout对象后面；在本例中是一堵砖墙。 接收表面上的材质**必须**使用半透明、叠加、调制或AlphaComposite混合模式。 AlphaHoldout材质不能作用于不透明材质。
    
4.  场景的背景，透过孔可见。
    

从摄像机的视角，你将通过接收表面看到透明的孔，使其后面的对象可见。

[![AlphaHoldout示例](https://dev.epicgames.com/community/api/documentation/image/cf8f008b-c596-4d97-abe8-efee713dbed8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/cf8f008b-c596-4d97-abe8-efee713dbed8?resizing_type=fit)

由于AlphaHoldOut材质位于单独的静态网格体资产上，你可以在编辑器中轻松移动它，或在游戏中对其制作动画。

## 混合模式方案

模式

说明

**不透明（Opaque）**

最终颜色 = 来源颜色。 这意味着材质将在背景上绘制。 此混合模式与光照兼容。

**遮罩（Masked）**

如果不透明遮罩（OpacityMask） > 不透明遮罩裁剪值（OpacityMaskClipValue），最终颜色 = 来源颜色，否则废弃像素。 此混合模式与光照兼容。

**半透明（Translucent）**

最终颜色 = 源颜色 \* 不透明度 + 目标颜色 \* (1 - 不透明度)。 此混合模式与动态光照**不**兼容。

**叠加（Additive）**

最终颜色 = 来源颜色 + 目标颜色。 此混合模式与动态光照**不**兼容。

**调制（Modulate）**

最终颜色 = 来源颜色 x 目标颜色。 此混合模式与动态光照或雾**不**兼容，除非该材质为贴花材质。

**AlphaComposite（预乘的Alpha）**

最终颜色 = 来源颜色 + 目标颜色 \*（1 - 来源不透明度）。

**AlphaHoldout**

最终颜色 = 目标颜色 \*（1 - 来源不透明度）。 此混合模式与动态光照**不**兼容。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)
-   [material properties](https://dev.epicgames.com/community/search?query=material%20properties)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [不透明](/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine#%E4%B8%8D%E9%80%8F%E6%98%8E)
-   [遮罩](/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine#%E9%81%AE%E7%BD%A9)
-   [不透明裁剪遮罩](/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine#%E4%B8%8D%E9%80%8F%E6%98%8E%E8%A3%81%E5%89%AA%E9%81%AE%E7%BD%A9)
-   [半透明（Translucent）](/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine#%E5%8D%8A%E9%80%8F%E6%98%8E%EF%BC%88translucent%EF%BC%89)
-   [叠加](/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine#%E5%8F%A0%E5%8A%A0)
-   [调制](/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine#%E8%B0%83%E5%88%B6)
-   [Alpha复合](/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine#alpha%E5%A4%8D%E5%90%88)
-   [Alpha维持](/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine#alpha%E7%BB%B4%E6%8C%81)
-   [混合模式方案](/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine#%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F%E6%96%B9%E6%A1%88)