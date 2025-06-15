# 虚幻引擎中的可混合物 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blendables-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:21:58.365Z

---

目录

![可混合物](https://dev.epicgames.com/community/api/documentation/image/35617d6c-a5ec-45f8-976d-b881a0e9baef?resizing_type=fill&width=1920&height=335)

**可混合物（Blendable）** 资产的属性可与其他可混合物进行平滑插值。可混合物最常用于后期处理材质，但系统可取决于画面用于任意资产（通常取决于摄像机位置）。

## 可混合物

**可混合物** 加入引擎已有一段时间，但只用于后期处理材质 / 后期处理材质实例。但概念为更整体的应用，因为它可将任意数据（线性值或颜色最为适合）混合到部分最终数据。子系统可拾取画面中的数据并影响渲染。因为数据为每个画面进行混合，意味着分屏情况下每个画面可拥有不同的混合设置（如命中指示器影响后期处理）。

**可混合物** 是拥有 IBlendableInterface 的对象，当前由这些资产类型实现：

-   PostprocessMaterials
-   PostprocessMaterialInstances
-   LightPropagationVolumeBlendable（如下）

**可混合物** 容器存在 PostProcessSettings 中。此资产内置在以下对象中：

-   PostProcessVolume
-   PostProcessComponent
-   SceneCaptureActor
-   CameraComponent

**LightPropagationVolumeBlendable** 资产的创建用于展示如何创建新可混合物，并说明如何替代现有的 PostProcessSettings。现有系统在小规模时工作效率佳，但大量设置需要更为复杂的系统。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d5df6d8-253e-4802-a63f-c686493e3492/createblendableasset.png)

可混合物资产显示在 content browser 的 Blendable 类目中。可使用 Add New 或按此类目进行资产过滤.

新系统的优点：

-   引擎修改时易于延展和维持（无需变更中心架构，可位于其自身的模块中）
-   在包上使用间接法无需层访问即可调整内容（版本控制）
-   间接法意味着单一资产可重复在多个情况下使用（冗余更少，性能更佳）
-   可对每个可混合物的 UI 进行自定义（通过单一结构体执行较难）
-   每个可混合物引用均拥有其各自的权重，资产可拥有权重（引用 LightPropagationVolumeBlendable），每个属性的权重也容易达成。
-   分解大型结构体，使和蓝图的互动更加高效简单。

## 可混合物容器

容器作为权重和 IBlendableInterface 引用的阵列实现。

打开 PostProcessVolume 设置并查看可混合物阵列，可看到一个引用可混合资产的权重阵列。权重通常在 0..1 范围中，引用对象可为包（通过 content browser 创建）中的资产，或包含可混合物阵列的对象中的资产。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc83472e-21a2-4c44-9bbd-ec78d181e88a/blendablesui.png)

可在后期处理设置中（此处为后期处理体积域中）找到可混合物容器。此处的阵列拥有三个元素，一个 LightPropagationVolumeBlendable（保存在体积域对象中）、一个尚未使用的阵列元素和一个名为 LPV0 的资产引用（保存在包中）。两个可混合物的权重均为 1.0.

在阵列中创建新元素时，可选择创建一个特定类型（当前只有 LightPropagationVolumeBlendable）的可混合物，或使用资产引用（如 LightPropagationVolumeBlendable、材质、材质实例）。之后将会有更多可混合物类型（如 Bloom、SceneColor、DepthOfField 等）引用可为任意类型的可混合物（拥有 IBlendableInterface）。阵列中的排序与层堆栈的方式相反，因为它们的混合自上而下应用，且混合将覆写之前的数据。注意：许多体积域（或其他对象）的数据组合时将把权重和优先级考虑在内。

注解：在名为"global"的关卡中设置一个低优先级的未绑定后期处理体积域不失为一个好方法。如需对现有关卡进行完整控制，可添加一个高优先级的未绑定体积域。将可混合物的权重调到 0 然后再迅速调回原有数字，即可确认可混合物是否有效。

## 可混合物在包中、作为对象（如体积域）的部分，或在蓝图中动态创建

您可任意进行选择，但我们建议使用包（引用包中的命名资产），因其便于进行批量调整，可将版本控制冲突最小化。为获得最大的可编程性，可在蓝图中创建一个可混合物。因为蓝图是编程的一种形式，这和将设置放入 UI 或将它们硬编码到代码中相似。代码方法更为复杂，其他用户调整设置更为困难。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/878113db-c770-4c16-b2a4-9cd8a6b3d2b2/assetwithdifferentouter.png)

可在编辑器中看到 LightPropagationVolumeBlendable 的细节。无论可混合物是在 content browser 中（左图）还是在对象（如后期处理体积域）中创建，用户界面皆相似。好办法是 - 为每个属性设置一个复选框（权重为 0 或 1）并为整个结构体设置一个混合权重。

## 如何自行创建可混合物（在 C++ 中）

我们建议复制 LightPropagationVolumeBlendable 插件。创建资产后，即可以光线传播系统相同的方式获得混合数据。混合后，**GetSingleFinalDataConst()** 法用于获取数据。为保证性能，建议只在必要时调用此函数（不要进行频繁调用）。

## 蓝图

**AddOrUpdateBlendable** 蓝图函数将在 PostProcessSettings 所在之处公开。可对可混合物容器进行便捷访问。将拥有可混合物容器、权重和混合物引用的对象传入。如容器中已存在引用，它将更新权重。因可能误导遍历容器的其他代码，它不会移除容器元素，并存在对垃圾回收的蕴含。权重为 0 的可混合物引用不存在实际的性能开销，因为不需要移除元素。

你可在此处了解如何在内容浏览器中引用可混合物资产。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2460323d-d8bb-488d-88c0-baee9e65cefb/addblendablevar.png)

LightPropagationVolumeBlendable（对象引用）类型的变量 'BlendableVar' 用于引用一个名为 'LPV0' 的 LightPropagationVolumeBlendable 资产。

可通过 **ConstructObjectFromClass** 蓝图函数在蓝图中新建可混合物。将新对象的 **Outer** 设为拥有可混合物容器的对象，此操作的效果和在 UI 中创建对象相同（将可混合物作为对象的一部分创建）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd22a1a5-f377-420f-9c0b-2abc46297160/addblendableconstruct.png)

此处我们创建了一个 LightpropagationVolumeBlendable 类型的对象，获取设置并通过 SetMembersIn... 设置成员。

注：此时需要手动将覆盖标记设为 true（勾选复选框），否则无法获得命名相同的属性。

## 未来更新

-   浏览函数 AddOrUpdateBlendable 时上下文相关功能无法使用（解决方法：禁用"context sensitive"复选框）。
-   计划将所有 PostprocessSettings 分割为 LightPropagationVolumeBlendable 之类的对象，之后 PostProcessSettings 将被移除。旧版本的关卡可在加载时进行转换， 不会丢失数据。为避免大量资产过度生成内容包，可能会将对象创建为关卡的一部分。
-   将进一步改良蓝图互动，使其更易于使用。
-   将可混合阵列更简单地公开到世界场景设置和项目设置中。
-   为使应用的可混合物拥有更高的透明度，将加入调试画面，显示权重、资产/对象名称和类型。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [post process](https://dev.epicgames.com/community/search?query=post%20process)
-   [bloom](https://dev.epicgames.com/community/search?query=bloom)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [可混合物](/documentation/zh-cn/unreal-engine/blendables-in-unreal-engine#%E5%8F%AF%E6%B7%B7%E5%90%88%E7%89%A9)
-   [可混合物容器](/documentation/zh-cn/unreal-engine/blendables-in-unreal-engine#%E5%8F%AF%E6%B7%B7%E5%90%88%E7%89%A9%E5%AE%B9%E5%99%A8)
-   [可混合物在包中、作为对象（如体积域）的部分，或在蓝图中动态创建](/documentation/zh-cn/unreal-engine/blendables-in-unreal-engine#%E5%8F%AF%E6%B7%B7%E5%90%88%E7%89%A9%E5%9C%A8%E5%8C%85%E4%B8%AD%E3%80%81%E4%BD%9C%E4%B8%BA%E5%AF%B9%E8%B1%A1%EF%BC%88%E5%A6%82%E4%BD%93%E7%A7%AF%E5%9F%9F%EF%BC%89%E7%9A%84%E9%83%A8%E5%88%86%EF%BC%8C%E6%88%96%E5%9C%A8%E8%93%9D%E5%9B%BE%E4%B8%AD%E5%8A%A8%E6%80%81%E5%88%9B%E5%BB%BA)
-   [如何自行创建可混合物（在 C++ 中）](/documentation/zh-cn/unreal-engine/blendables-in-unreal-engine#%E5%A6%82%E4%BD%95%E8%87%AA%E8%A1%8C%E5%88%9B%E5%BB%BA%E5%8F%AF%E6%B7%B7%E5%90%88%E7%89%A9%EF%BC%88%E5%9C%A8c++%E4%B8%AD%EF%BC%89)
-   [蓝图](/documentation/zh-cn/unreal-engine/blendables-in-unreal-engine#%E8%93%9D%E5%9B%BE)
-   [未来更新](/documentation/zh-cn/unreal-engine/blendables-in-unreal-engine#%E6%9C%AA%E6%9D%A5%E6%9B%B4%E6%96%B0)