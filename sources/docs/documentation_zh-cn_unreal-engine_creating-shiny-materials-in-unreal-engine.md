# 在虚幻引擎中创建有光泽的材质 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-shiny-materials-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:29:15.041Z

---

目录

![创建有光泽的材质](https://dev.epicgames.com/community/api/documentation/image/1b6da90c-7a13-41b4-90f5-edb8ad56a354?resizing_type=fill&width=1920&height=335)

现实世界中的每个物体都有一定程度的光泽。在一些情况下这种光泽（或者反射度）很明显，比如镜子、镀铬或者玻璃。其它情况下光泽的差异比较细微，比如刷漆的木头，平整但不光滑的石头或者水泥。

在虚幻引擎中，你可以使用 \*\*金属感（Metallic）、高光度（Specular）和粗糙度（Roughness）等[材质输入](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine)来模拟物体的光泽度。该教程将介绍在材质中引入光泽度的几种常见方式。

## 光泽度

在现实世界中，当光线照射在物体表面时，一些会被吸收，一些会被散射，而一些会被直接反射。散射的光线被称为 **漫反射（diffuse reflection）**。你在现实世界中看到没有反射性的物体，比如树桩，你看到的大部分是散射光线。直接反射的光线被称为 **高光反射（specular reflection）**。在镀铬的水龙头或者一滩水中看到自己的倒影，那么你看到的便是高光反射。

在虚幻引擎中，光泽度并不是一个技术性的名称，而是一个美学上的名称。在该教程中，光泽度用来表示表面能够产生多少聚合的像镜面一样的反射。而这些反射的准确属性由金属感、高光度和粗糙度输入来定义。

## 粗糙度与光泽度

**粗糙度（Roughness）** 在帮助确定表面光泽度方面扮演着重要角色。其输入数值为 **0** 到 **1**。

![粗糙度数值0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ccf376f8-7ec2-4cf2-bafc-96299511f0c9/roughness-example-01.png)

-   粗糙度越高，材质看起来就越像镜面。当粗糙度为 **0** 时材质为完美的镜面。
-   粗糙度越高，材质的光泽就越少。当粗糙度为 **1** 时，材质为完全漫反射。

以下展示了粗糙度如何影响材质的光泽。在该示例中，球体位于一个空白的环境中，所以模型上的高光为光源的直接反射。

![非金属物体粗糙度对比](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c11ddd5-531d-4ede-a5a5-8b396ce30520/roughness-spectrum-nonmetal-cubemap.png)

最左侧的球体粗糙度值为 **0**，光源反射为一个锐利精准的高光。随着粗糙度慢慢由 **0** 增加至 **1**，这个高光变得越来越模糊，球体也失去了光泽。

## 金属感与光泽度

**金属（Metallic）** 物体观感上的光泽也由粗糙度数值决定。低粗糙度数值会产生有光泽的金属材质，而高粗糙度数值会产生光泽较少的材质。金属和非金属之间的关键区别在于高光反射的颜色如何计算。

-   金属感数值为 **0**，高光反射环境和光源的颜色。
-   金属感数值为 **1**，高光反射会加入材质的基础颜色。

 ![随着金属感数值从0变为1，注意反射的颜色受基础颜色影响程度变化。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad9ffbc9-f6cc-40d6-8be9-16f63bb2f761/metal-non-metal-01.png) ![随着金属感数值从0变为1，注意反射的颜色受基础颜色影响程度变化。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54e4425f-4926-45c3-a748-3f85dd2401c9/metal-non-metal-02.png)

**随着金属感数值从0变为1，注意反射的颜色受基础颜色影响程度变化。**

以下示例展示粗糙度数值如何影响金属材质。该材质金属感数值为 **1**，在多个图片中保持不变。**基础颜色（Base Color）** 输入为蓝色，以此来展示基础颜色如何影响金属材质上反射的颜色。

![金属不同粗糙度对比](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af9ef4f8-40ca-4142-bc36-7b41cddc22a4/roughness-spectrum-metal-cubemap.png)

金属材质上粗糙度从0到1。

在最左侧，球体的粗糙度数值为 **0** ，看起来和镜面一样。随着粗糙度由 **0增加到1**，球体也失去了光泽。注意材质的基础颜色影响了反射的颜色

## 高光度与光泽度

在99%的情况下，你从不需要调整 **高光度（Specular）** 输入，其默认值 **0.5** 对于大部分材质来说已经足够。

**高光度（Specular）** 也可影响材质的光泽度。将高光度值调整到接近1时，将使材质的反射和反射高光显得特别强特别显眼， 而将该值减小到接近0会弱化反射及反射高光，直到它们几乎不存在为止。

以下示例展示当高光度值从0更改为1时，对反射及反射高光强度的影响。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e3b2e40-acc8-4e5c-8bb3-c30447ece59d/shiny_specular.png)

粗糙度可以无视高光度影响物体的光泽。即使高光度（Specular）输入数值为1，通过将粗糙度的值设置为1，也可以取消高光度效果。如果启用了金属感，那么调整高光度不会影响材质。

默认高光度数值0.5已经可以准确的模拟真实世界中大部分物体的高光度。所以，对于大部分材质，你应该不需要修改该数值。当然你可以从艺术的角度进行选择，但是如果数值与0.5差别太大会使物体看起来不真实。

## 在材质中使用光泽度

通过以下步骤来创建有光泽度的材质。

本教程将使用项目中包含 **初学者内容包** 时可以找到的内容。如果你未将初学者内容包包括在项目中，请参阅 [迁移内容](/documentation/zh-cn/unreal-engine/migrating-assets-in-unreal-engine)内容页面，以了解有关如何在项目之间移动内容的信息。 通过这种方法，你可以将初学者内容包添加到项目中。

1.  在内容浏览器中右键单击，然后在弹出菜单的创建基本资源（Create Basic Asset）部分中，选择 **材质（Material）**。
    
    ![创建新材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1246768c-5e45-43ed-ad24-d0f55dfeb22e/create-material.png)
2.  将材质命名为 **ShinyMaterial**，然后 **双击** 图标来将其在[材质编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)中打开。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e42ce42-cfcd-49d9-a756-4c6acd770e64/double-click-material.png)
3.  打开材质之后，将以下纹理和材质表达式节点添加到材质图中。这些纹理位于内容浏览器的 **StarterContent > Textures** 文件夹中。
    
    -   **纹理取样：** T\_Metal\_Gold\_D x 1
    -   **纹理取样：**\* T\_Metal\_Gold\_N x 1
    -   **标量参数** x 3
    -   **乘数** x 1
    
    ![将材质表达式添加到图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df3a77c6-a56f-4e0e-930e-bbb5eefe8a16/add-material-expressions.png)
4.  需要对标量参数进行命名并填写默认值。选中每个标量参数，然后在细节面板中如下对其进行重命名并且设置 **默认值（Default Value）**。
    
    -   **金属感（Metallic）:** 默认值为 **0**
    -   **高光度（Specular）:** 默认值为 **0.5**
    -   **粗糙度（Roughness）:** 默认值为 **0.5**
    
    ![重命名参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2800493-9be0-4b2f-834e-4f9013558aad/rename-parameters.png)
5.  将所有材质表达式节点连接到[主材质节点](/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine)上相应的输入。完成之后，材质图应该类似于下图：
    
    ![连接材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/575fac6b-7df6-49ad-bec7-e8ee50e8033c/connect-material-expressions.png)
6.  点击工具栏中的 **应用（Apply）** 和 **保存（Save）** 按钮来编译材质，然后关闭材质编辑器。
    
    ![应用并保存材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/518bbb71-ba9f-4666-8a1e-8f949be14484/save-and-apply.png)
7.  在内容浏览器中找到 **ShinyMaterial** 资产，然后 **右键单击** 它，并从显示的菜单中选择 **创建材质实例（Create Material Instance）** 选项。
    
    ![创建材质实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76706278-a5ae-494a-a6a9-c613406a1565/create-material-instance.png)
8.  在内容浏览器中 **双击** 来将材质实例在[材质实例编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui)中打开。在实例编辑器中，选中复选框来启用全部三个 **全局标量参数值（Global Scalar Parameter Values）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6c4dafc-9f43-40df-b639-78e3a2d67d90/override-parameter-values.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6c4dafc-9f43-40df-b639-78e3a2d67d90/override-parameter-values.png)
    

**标量参数值（Scalar Parameter Values）** 现已启用，将它们设置为不同的值，可以在预览视口中看到其产生的影响。例如，将 **金属感（Metallic）设置为1**，然后将 **粗糙度（Roughness）设置为0.2**，可得到像金子一样闪闪发亮的金属，其表面有一些不同于通常映射的瑕疵。

![金色材质实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e76f98c-4243-478c-93d5-aaeb6cbccf27/gold-material.png)

如果将粗糙度设置为 **0.7**，可以看到反射变得模糊，表面失去光泽，但是反射并没有完全消失。

![提高粗糙度](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33d583b3-2aad-4f14-8372-fc53c1bd898e/increase-roughness-value.png)

最后，如果将 **金属感设为0**，**粗糙度设为0.15**，表面看起来不再像是金属，而是刮蹭过的塑料或者涂料。

![刮蹭过的塑料材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5ff889a-2273-4cc1-bba4-055279a58571/scuffed-plastic-material.png)

## 总结

当你为材质调整 **粗糙度** 数值时，记住绝大部分物体都有或多或少的光泽。即便是一些你不认为是反光的表面也会在强光照射下反射出高光。

大多数情况下你应该避免使用粗糙度数值0或者1，而是取其中间的值。纹理遮罩通常用来给粗糙度数值添加变化和噪点。这样产生的表面不会是完全光泽或者暗淡，而是二者混合而成的有趣的结果。请参阅[纹理遮罩](/documentation/zh-cn/unreal-engine/using-texture-masks-in-unreal-engine)。

请记住，反射材质会产生性能成本，尤其是大量距离较近的金属感物体。互相反射或者反射其它反射的金属感对象可能会引起成本高昂的性能问题。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [光泽度](/documentation/zh-cn/unreal-engine/creating-shiny-materials-in-unreal-engine#%E5%85%89%E6%B3%BD%E5%BA%A6)
-   [粗糙度与光泽度](/documentation/zh-cn/unreal-engine/creating-shiny-materials-in-unreal-engine#%E7%B2%97%E7%B3%99%E5%BA%A6%E4%B8%8E%E5%85%89%E6%B3%BD%E5%BA%A6)
-   [金属感与光泽度](/documentation/zh-cn/unreal-engine/creating-shiny-materials-in-unreal-engine#%E9%87%91%E5%B1%9E%E6%84%9F%E4%B8%8E%E5%85%89%E6%B3%BD%E5%BA%A6)
-   [高光度与光泽度](/documentation/zh-cn/unreal-engine/creating-shiny-materials-in-unreal-engine#%E9%AB%98%E5%85%89%E5%BA%A6%E4%B8%8E%E5%85%89%E6%B3%BD%E5%BA%A6)
-   [在材质中使用光泽度](/documentation/zh-cn/unreal-engine/creating-shiny-materials-in-unreal-engine#%E5%9C%A8%E6%9D%90%E8%B4%A8%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%85%89%E6%B3%BD%E5%BA%A6)
-   [总结](/documentation/zh-cn/unreal-engine/creating-shiny-materials-in-unreal-engine#%E6%80%BB%E7%BB%93)

相关文档

[

基于物理的材质

![基于物理的材质](https://dev.epicgames.com/community/api/documentation/image/d659c3a3-4fe9-461d-b484-ccab548f1612?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine)

[

材质表达式参考

![材质表达式参考](https://dev.epicgames.com/community/api/documentation/image/b9193bb7-2415-40f9-9ce6-998b0d1bed78?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-expressions-reference)

[

材质函数参考

![材质函数参考](https://dev.epicgames.com/community/api/documentation/image/8a665179-3355-4c89-9772-2eee352e8088?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-functions-reference)