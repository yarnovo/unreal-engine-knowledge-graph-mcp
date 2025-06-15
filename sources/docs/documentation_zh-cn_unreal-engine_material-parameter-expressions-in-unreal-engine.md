# 虚幻引擎中的材质参数表达式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:28:19.895Z

---

目录

![材质参数表达式](https://dev.epicgames.com/community/api/documentation/image/5b8faf2f-f8ee-4698-9e7d-d9b5f25a6490?resizing_type=fill&width=1920&height=335)

## 集合参数

**集合参数表达式**用于引用**材质参数集合**资产。 这些是可以由许多不同资产（例如材质和蓝图等等）轻松重复使用的参数组。

集合参数表达式让你可以在参数集合中修改一次全局值，并使其传播到引用该集合的多个材质。 如需更多信息，请参阅[材质参数集合](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-material-parameter-collections-in-unreal-engine)文档。

[![材质参数集合示例](https://dev.epicgames.com/community/api/documentation/image/086f7640-52bb-4de7-81ad-85477752e256?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/086f7640-52bb-4de7-81ad-85477752e256?resizing_type=fit)

点击查看大图。

材质最多可以引用两个不同的材质参数集合。 一个通常用于表示游戏范围的值， 另一个可以用于表示特定于关卡的参数。 一个集合最多可以包含1024个标量参数和1024个向量 参数。

## 动态参数

**DynamicParameter**表达式为粒子发射器提供导管，以便将最多四个要以任意方式处理的值传递给材质。 这些值是通过放置在发射器上的**ParameterDynamic**模块在**Niagara**中设置的。

属性

说明

**参数名称（Param Names）**

参数名称的数组。 这里的值将决定材质编辑器中显示在表达式输出上的文本，同时也将是Niagara中的ParameterDynamic模块中用来引用参数的名称。

**默认值（Default Value）**

指定参数输出的初始值（Vector4）。

输出

 

**参数1（Param1）**

输出"参数名称"（Param names）属性中第一个参数的值。 此输出的名称可根据"参数名称"（Param names）属性中的值而变化。

**参数2（Param2）**

输出"参数名称"（Param names）属性中第二个参数的值。 此输出的名称可根据"参数名称"（Param names）属性中的值而变化。

**参数3（Param3）**

输出"参数名称"（Param names）属性中第三个参数的值。 此输出的名称可根据"参数名称"（Param names）属性中的值而变化。

**参数4（Param4）**

输出"参数名称"（Param names）属性中第四个参数的值。 此输出的名称可根据"参数名称"（Param names）属性中的值而变化。

## FontSampleParameter

**FontSampleParameter**表达式提供了一种在材质实例常量中公开基于字体的参数的方法，这让你可以在不同实例中轻松使用不同的字体。 字体的阿尔法通道将包含字体轮廓值。 您只能指定有效的字体页面。

项目

说明

属性

 

**参数名称（Parameter Name）**

指定用于在材质实例和通过代码中识别参数的名称。

**组（Group）**

提供在一个MaterialInstanceConstant内按组或目录组织参数名称的方法。 一个材质中所有拥有同一个组属性名称的参数都会被列在实例的该目录下。

**字体（Font）**

包含要在表达式内保留的默认字体资产（来自**内容浏览器**）。

**字体纹理页面（Font Texture Page）**

要用作纹理一部分的当前字体纹理页面。

[![字体样本参数](https://dev.epicgames.com/community/api/documentation/image/419b5c7d-f954-450e-9d72-a343cd448e80?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/419b5c7d-f954-450e-9d72-a343cd448e80?resizing_type=fit)

## 标量参数

**ScalarParameter**表达式将输出单个浮点值（[常量](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine)），你可以在材质实例中或通过蓝图或代码动态访问和更改该值。

属性

说明

**参数名称（Parameter Name）**

指定用于在材质实例和通过代码中识别参数的名称。

**组（Group）**

提供在一个MaterialInstanceConstant内按组或目录组织参数名称的方法。 一个材质中所有拥有同一个组属性名称的参数都会被列在实例的该目录下。

**默认值（Default Value）**

指定常量采用的初始值。

你可以更新标量参数中的值，并立即看到结果，而不用重新编译材质。

![标量参数已从0更新到10。](https://dev.epicgames.com/community/api/documentation/image/5c226764-9f9b-4b2c-986a-d51dd306f80f?resizing_type=fit&width=1920&height=1080)![标量参数已从0更新到10。](https://dev.epicgames.com/community/api/documentation/image/1c79fe60-f6fc-4691-9743-699a0787518a?resizing_type=fit&width=1920&height=1080)

**标量参数已从0更新到10。**

## StaticSwitchParameter

**StaticSwitchParameter**表达式接受两个输入，并在参数值为*true*时输出第一个输入，否则输出第二个输入。

此参数称为"静态"是因为它不可在运行时更改，而只能在材质实例编辑器中设置。 静态开关是在编译时（而非运行时）进行应用。 这意味着删除的材质分支决不会执行，因此静态开关在运行时实际上是自由的。 另一方面，对于材质中**使用**的每一种静态参数组合（滥用静态参数组合可能会导致着色器排列的激增），都必须通过编译来产生材质的新版本。 请尽量减少材质中的静态参数数目以及实际使用的静态参数排列数。

属性

说明

**参数名称（Parameter Name）**

指定用于在材质实例和通过代码中识别参数的名称。

**组（Group）**

提供在一个MaterialInstanceConstant内按组或目录组织参数名称的方法。 一个材质中所有拥有同一个组属性名称的参数都会被列在实例的该目录下。

**默认值（Default Value）**

如果为*true*，则输出将是第一个输入。 否则，输出将是第二个输入。

**扩展标题显示（Extended Caption Display）**

如果为*true*，则表达式的标题栏将显示表达式的值。

输入

 

**A**

接收具有任意数目通道的值。

**B**

接收具有任意数目通道的值。

**用法示例**：你可以使用静态开关删除材质的整个分支，而不会带来运行时开销。 各个材质实例可具有不同的值，这使你能够建立模板化的着色器设置，而不会影响性能。

![静态开关已从True更新为False。](https://dev.epicgames.com/community/api/documentation/image/fc3680fd-1227-4f53-9578-243b70acf879?resizing_type=fit&width=1920&height=1080)![静态开关已从True更新为False。](https://dev.epicgames.com/community/api/documentation/image/6f639f7b-b0f3-4c3d-ad5d-550c256c9cc2?resizing_type=fit&width=1920&height=1080)

**静态开关已从True更新为False。**

## StaticBoolParameter

**StaticBoolParameter**的工作方式类似于StaticSwitchParameter，不同之处在于，它仅创建布尔参数，而不实现开关。 你可以使用StaticBoolParameter将默认值传递到材质函数上的布尔输入中。

[![静态布尔参数](https://dev.epicgames.com/community/api/documentation/image/9737184c-5213-41f1-8a9a-3f14ad53439d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9737184c-5213-41f1-8a9a-3f14ad53439d?resizing_type=fit)

属性

说明

**参数名称（Parameter Name）**

指定用于在材质实例和通过代码中识别参数的名称。

**组（Group）**

提供在一个MaterialInstanceConstant内按组或目录组织参数名称的方法。 一个材质中所有拥有同一个组属性名称的参数都会被列在实例的该目录下。

**默认值（Default Value）**

参数的默认布尔值，即*True*（选中）或*False*。

静态开关是在编译时（而非运行时）进行应用，这意味着你可以在材质实例编辑器中重载该参数，但它不能在Gameplay期间更改。 无论被删除的是哪个材质分支，它都决不会执行，因此静态开关在运行时实际上是自由的。 另一方面，对于材质中**使用**的每一种静态参数组合（滥用静态参数组合可能会导致着色器排列的激增），都必须通过编译来产生材质的新版本。 请尽量减少材质中的静态参数数目以及实际使用的静态参数排列数。

此节点需搭配[材质函数](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/material-functions-in-unreal-engine)使用。

## StaticComponentMaskParameter

**StaticComponentMaskParameter**表达式的行为类似于普通的组件遮罩，不同之处在于，你可以重载材质实例中的遮罩值。

此参数称为"静态"是因为它不可在运行时更改，而只能在材质实例编辑器中设置。 静态开关是在编译时（而非运行时）进行应用。 这意味着删除的材质分支决不会执行，因此静态开关在运行时实际上是自由的。 另一方面，对于材质中**使用**的每一种静态参数组合（滥用静态参数组合可能会导致着色器排列的激增），都必须通过编译来产出材质的新版本。 请尽量减少材质中的静态参数数目以及实际使用的静态参数排列数。

属性

说明

**参数名称（Parameter Name）**

指定用于在材质实例和通过代码中识别参数的名称。

**组（Group）**

提供在一个MaterialInstanceConstant内按组或目录组织参数名称的方法。 一个材质中所有拥有同一个组属性名称的参数都会被列在实例的该目录下。

**默认R（Default R）**

如果选中此项目，那么会将输入值的红色通道（第一个通道）传递到输出。

**默认G（Default G）**

如果选中此项目，那么会将输入值的绿色通道（第二个通道）传递到输出。

**默认B（Default B）**

如果选中此项目，那么会将输入值的蓝色通道（第三个通道）传递到输出。

**默认A（Default A）**

如果选中此项目，那么会将输入值的alpha通道（第四个通道）传递到输出。

**用法示例**：你可以使用静态组件遮罩，让实例来规定要使用的遮罩纹理通道。 对于不必在运行时更改的静态蒙版，应始终使用这种方法，而不要将纹理查找乘以矢量参数以屏蔽通道，因为这将浪费纹理带宽和着色器指令。

![选中的通道会被传递到输出，而未选中的通道会被废弃。](https://dev.epicgames.com/community/api/documentation/image/5b0f0d9a-871e-4b98-b0f4-cbf7a4a389ba?resizing_type=fit&width=1920&height=1080)![选中的通道会被传递到输出，而未选中的通道会被废弃。](https://dev.epicgames.com/community/api/documentation/image/65032eae-d334-4d51-93b7-23dde846ec91?resizing_type=fit&width=1920&height=1080)

**选中的通道会被传递到输出，而未选中的通道会被废弃。**

## 向量参数

**VectorParameter**表达式与[Constant4Vector](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine)基本相同，不同之处在于，你可以在材质实例中和通过代码修改该参数。 VectorParameter（矢量参数）的一个好处是，它的值可使用取色器来设置。

项目

说明

属性

 

**参数名称（Parameter Name）**

指定用于在材质实例和通过代码中识别参数的名称。

**组（Group）**

提供在一个MaterialInstanceConstant内按组或目录组织参数名称的方法。 一个材质中所有拥有同一个组属性名称的参数都会被列在实例的该目录下。

**默认值（Default Value）**

-   **R**
    
-   **G**
    
-   **B**
    
-   **A**
    

默认情况下输出的向量（除非被材质实例常量重载）。

-   指定表达式所输出向量的红色（即第一个）通道的浮点值。
    
-   指定表达式所输出向量的绿色（即第二个）通道的浮点值。
    
-   指定表达式所输出向量的蓝色（即第三个）通道的浮点值。
    
-   指定表达式所输出向量的Alpha（即第四个）通道的浮点值。
    

[![向量参数示例图表](https://dev.epicgames.com/community/api/documentation/image/aaa850c9-cb07-4037-8d04-933be21a91b2?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/aaa850c9-cb07-4037-8d04-933be21a91b2?resizing_type=fit)

由于插值器受限制，VertexColor（顶点颜色）与 Transform（转换）节点互斥。 如果你同时使用Transform（转换）节点和VertexColor（顶点颜色），那么VertexColor（顶点颜色）的结果为全白色。

**程序员需知：**对于Sprite粒子，颜色会被逐顶点传达给着色器，而网格体粒子的颜色会被设置为着色器常量。

## TextureObjectParameter

**TextureObjectParameter**表达式将定义纹理参数并输出纹理对象。 此表达式常被用于将纹理参数传递给具有纹理输入的材质函数。 材质函数节点上的纹理输入与来自TextureSample 2D节点的浮点3数据不兼容，因此纹理对象（T2d）是必须的。 此节点不会对该纹理进行实际取样，因此必须搭配**TextureSample**节点使用。

[![纹理对象参数](https://dev.epicgames.com/community/api/documentation/image/c6adabef-7842-4990-bd08-0985740829c9?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c6adabef-7842-4990-bd08-0985740829c9?resizing_type=fit)

属性

说明

**参数名称（Parameter Name）**

指定用于在材质实例和通过代码中识别参数的名称。

**组（Group）**

提供在一个MaterialInstanceConstant内按组或目录组织参数名称的方法。 一个材质中所有拥有同一个组属性名称的参数都会被列在实例的该目录下。

**纹理（Texture）**

指定表达式所取样的纹理。

**取样器类型（Sampler Type）**

将从节点取样和输出的数据类型。

**Mip值模式（MipValueMode）**

选择如何从默认计算的硬件自定义示例的mip级别或导数。 影响外观和性能。

此节点需搭配[材质函数](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/material-functions-in-unreal-engine)使用。

## TextureSampleParameter2D

**TextureSampleParameter2D**表达式与TextureSample基本相同，不同之处在于，你可以在材质实例中和通过蓝图或代码修改该参数。

[![纹理样本参数](https://dev.epicgames.com/community/api/documentation/image/ff4f7612-03b1-41fd-a0e2-32eb9b9279ca?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ff4f7612-03b1-41fd-a0e2-32eb9b9279ca?resizing_type=fit)

属性

说明

**参数名称（Parameter Name）**

指定用于在材质实例和通过代码中识别参数的名称。

**组（Group）**

提供在一个MaterialInstanceConstant内按组或目录组织参数名称的方法。 一个材质中所有拥有同一个组属性名称的参数都会被列在实例的该目录下。

**纹理（Texture）**

指定表达式所取样的纹理。

**取样器类型（Sampler Type）**

将从节点取样和输出的数据类型。

**Mip值模式（MipValueMode）**

选择如何从默认计算的硬件自定义示例的mip级别或导数。 影响外观和性能。

输入

 

**UVs**

接收UV纹理坐标，以用于纹理。 如果没有向UV输入值，将使用材质应用于的网格体的纹理坐标。

输出

 

**RGB**

输出颜色的三通道RGB向量值。

**R**

输出颜色的红色通道。

**G**

输出颜色的绿色通道。

**B**

输出颜色的蓝色通道。

**A**

输出颜色的alpha通道。 如果纹理不包含alpha通道，将"alpha"通道连接到某物上，虽然从技术上讲不违法，但总是会得到0（黑色）。

## TextureSampleParameterSubUV

**TextureSampleParameterSubUV**表达式与[ParticleSubUV](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine)基本相同，不同之处在于，你可以在材质实例中和通过代码修改该参数。

项目

说明

属性

 

**参数名称（Parameter Name）**

指定用于在材质实例和通过代码中识别参数的名称。

**组（Group）**

提供在一个MaterialInstanceConstant内按组或目录组织参数名称的方法。 一个材质中所有拥有同一个组属性名称的参数都会被列在实例的该目录下。

**混合（Blend）**

将SubUV sprite布局的每一帧都混合在一起，而不是立即从一个帧"弹出"到下一个。

**纹理（Texture）**

指定表达式所取样的纹理。

**取样器类型（Sampler Type）**

将从节点取样和输出的数据类型。

**Mip值模式（MipValueMode）**

选择如何从默认计算的硬件自定义示例的mip级别或导数。 影响外观和性能。

输入

 

**UVs**

UV输入被忽略，不执行任何操作。

输出

 

**RGB**

输出颜色的三通道RGB向量值。

**R**

输出颜色的红色通道。

**G**

输出颜色的绿色通道。

**B**

输出颜色的蓝色通道。

**A**

输出颜色的alpha通道。 如果纹理不包含alpha通道，将"alpha"通道连接到某物上，虽然从技术上讲不违法，但总是会得到0（黑色）。

## TextureSampleParameterCube

**TextureSampleParameterCube**表达式与TextureSample基本相同，不同之处在于，它仅接受立方体贴图，并且你可以在材质实例中和通过代码修改该参数。

属性

说明

**参数名称（Parameter Name）**

指定用于在材质实例和通过代码中识别参数的名称。

**组（Group）**

提供在一个MaterialInstanceConstant内按组或目录组织参数名称的方法。 一个材质中所有拥有同一个组属性名称的参数都会被列在实例的该目录下。

**纹理（Texture）**

指定表达式所取样的纹理。

**取样器类型（Sampler Type）**

将从节点取样和输出的数据类型。

**Mip值模式（MipValueMode）**

选择如何从默认计算的硬件自定义示例的mip级别或导数。 影响外观和性能。

输入

 

**UVs**

接收UV纹理坐标，以用于纹理。 如果没有向UV输入值，将使用材质应用于的网格体的纹理坐标。 此输入接收双通道的向量值。

输出

 

**RGB**

输出颜色的三通道RGB向量值。

**R**

输出颜色的红色通道。

**G**

输出颜色的绿色通道。

**B**

输出颜色的蓝色通道。

**A**

输出颜色的alpha通道。 如果纹理未包含alpha通道，那么将"alpha"通道连接到任何内容（虽然在技术上不合法）的结果将始终为零（黑色）。

## TextureSampleParameterMovie

**TextureSampleParameterMovie**表达式与TextureSample基本相同，不同之处在于，它仅接受视频纹理（Bink视频），并且你可以在材质实例中和通过代码修改该参数。

属性

说明

**参数名称（Parameter Name）**

指定用于在材质实例和通过代码中识别参数的名称。

**组（Group）**

提供在一个MaterialInstanceConstant内按组或目录组织参数名称的方法。 一个材质中所有拥有同一个组属性名称的参数都会被列在实例的该目录下。

**纹理（Texture）**

指定表达式所取样的纹理。

**取样器类型（Sampler Type）**

将从节点取样和输出的数据类型。

**Mip值模式（MipValueMode）**

选择如何从默认计算的硬件自定义示例的mip级别或导数。 影响外观和性能。

输入

 

**UVs**

接收UV纹理坐标，以用于纹理。 如果没有向UV输入值，将使用材质应用于的网格体的纹理坐标。

输出

 

**RGB**

输出颜色的三通道RGB向量值。

**R**

输出颜色的红色通道。

**G**

输出颜色的绿色通道。

**B**

输出颜色的蓝色通道。

**A**

输出颜色的alpha通道。 如果纹理不包含alpha通道，将"alpha"通道连接到某物上，虽然从技术上讲不违法，但总是会得到0（黑色）。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [集合参数](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#collection-parameters)
-   [动态参数](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#dynamic-parameter)
-   [FontSampleParameter](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#fontsampleparameter)
-   [标量参数](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#scalar-parameter)
-   [StaticSwitchParameter](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#static-switch-parameter)
-   [StaticBoolParameter](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#static-bool-parameter)
-   [StaticComponentMaskParameter](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#static-component-mask-parameter)
-   [向量参数](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#vector-parameter)
-   [TextureObjectParameter](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#textureobjectparameter)
-   [TextureSampleParameter2D](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#texturesampleparameter2d)
-   [TextureSampleParameterSubUV](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#texturesampleparametersubuv)
-   [TextureSampleParameterCube](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#texturesampleparametercube)
-   [TextureSampleParameterMovie](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#texturesampleparametermovie)