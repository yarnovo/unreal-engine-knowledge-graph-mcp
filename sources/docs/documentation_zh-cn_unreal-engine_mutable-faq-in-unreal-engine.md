# 虚幻引擎中的Mutable常见问题解答 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:03:09.130Z

---

目录

![Mutable常见问题解答](https://dev.epicgames.com/community/api/documentation/image/cdff55fb-1065-493b-9b2f-4b59d0e1ea7a?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc32e9a1-48ba-4100-85f6-1f1540d50703/mutable-banner.png)

## Mutable适合我的项目吗？

许多项目可能会为角色使用可互换部分系统，并使用一些实时着色器效果来处理颜色。对于这些项目，Mutable可能并不是必需的。Mutable更专注于解决那些需要深度自定义且对性能要求较高的游戏需求。

## Mutable能提供什么？

Mutable为虚幻引擎提供了一个完全灵活的网格体自定义系统，没有预先定义的网格体、骨架、纹理或变形效果，不会强制你采用特定的模板、外观或功能。你可以创建你想要的可自定义网格体或角色（不一定是双足角色或动物，你也可以制作可自定义树木或物体），设置你需要的控制参数和自由度，Mutable会为你创建一个标准且高效的虚幻引擎骨骼网格体以供使用。这些骨骼网格体可以在游戏中实时创建，也可以在制作过程中在虚幻编辑器烘焙成标准资产。这使得你能够将Mutable用作另一个功能强大的美术创作流程工具。

可自定义角色是通过Mutable图表编辑器开发的，该编辑器完全集成在虚幻引擎编辑器中，与材质编辑器非常相似。Mutable还拥有C++和蓝图API，用于在游戏中控制角色自定义。

## Mutable包含我们可以在游戏中使用的角色库吗？

不包含，Mutable不是一个角色库，你仍然需要美术师为你的游戏创建资产。Mutable让你决定如何将这些资产组合成最终优化的游戏角色，并创建参数来自定义它们。

## Mutable提供角色自定义系统的初始示例项目吗？

提供，示例项目将在Fab Marketplace上提供。 节点系统背后的理念是什么？它是不是像一个由不同部分组成的数组，作为主体，然后在上面添加修饰符？ 其目的是为开发者提供最大的灵活性，没有预定义模板，即使不是程序员，也能够设计和实现复杂的可自定义角色。

图表是一个基础对象节点，可以分层级附加子对象。所有这些对象都可以添加网格体和材质，也可以被替换、切割、扩展，或者通过其他节点转换其材质。

## 我们使用的是非标准材质或渲染管线，我们可以使用Mutable吗？

可以，Mutable可以处理任意数量和类型的材质和纹理。它对于"颜色"、"法线"、"金属感"或任何材质属性都没有任何硬编码的功能。

## Mutable为角色创建了哪种类型的资产？它们是特殊或自定义骨骼网格体？它们存在什么缺点或性能损失？

Mutable创建的是标准的骨骼网格体和纹理。一旦创建完成，它们与美术师创建的资产并无区别。它们可以烘焙为虚幻引擎资源，并导出到不使用Mutable的项目中。

## 骨架的核心结构是什么？例如，它基于虚幻引擎的Mannequin吗？

Mutable没有预定义骨架。开发者在Mutable图表中设置了一个带有任意参考骨架的参考网格体，然后它会根据提供的参考骨架结构生成角色。你可以使用自己的骨架，并创建人形、动物、机器人或物体。

## Mutable可以适配动画吗？

不可以，Mutable只为你的静态或骨骼对象编译网格体和纹理，它不会修改动画。Mutable会生成带有标准骨架的标准骨骼网格体，因此你可以使用完整的动画系统。

## Mutable提供人群系统吗？

提供，Mutable提供一个用于生成人群的开箱即用型内置用示例系统。其自定义功能与LOD支持相结合，用于创建群体。这类系统通常需要根据每个项目进行高度定制，所以你可以将此系统作为一个示例来创建自己的系统。如需详细了解，请参阅"群体"页面。

## 可以将该解决方案连接到任何寻路系统、IK解算器和人群系统吗？

Mutable会生成带有虚幻引擎骨架的标准虚幻引擎网格体，所以如果这些系统能与常规虚幻引擎资产配合使用，则它们也应该能与Mutable生成的资产配合使用。

## Mutable支持同时显示多少个角色？

Mutable中没有硬编码的限制。由于它生成的是标准的虚幻引擎网格体，与美术家直接创建的网格体没有区别，因此它可以根据你的角色的开销（多边形数量、纹理分辨率等），它可以生成你的目标系统所支持的尽可能多的角色。对于虚幻引擎来说，限制因素通常是动画开销，而不是内存或渲染开销。

## Mutable是在运行时生成固定的图集，还是可以随时修改？

答案是你可以根据需要进行设置。你可以有一个供所有角色变体使用的固定图集，你也可以有一个可变的图集，它会随着你在游戏中为角色添加或删除布料部分而改变。甚至可以为不同种类的角色部分设置不同的图集或材质（一个图集用于形体，另一个图集用于夹克，再一个图集用于头盔等等）。

也可以完全不使用图集，让所有角色部分使用它们自己独立的预定义布局、纹理和材质，这对于某些类型的游戏来说是合理的。

## 贴花系统的实时性如何？如果我们使用该系统，我们可以添加的自定义类型会受到限制吗？

贴花可以在制作过程中烘焙到纹理中，也可以实时设置和更新。美术师可以在美术创作流程中使用它来创建和烘焙出有趣的纹理，玩家可以在游戏中实时更改贴花和纹身的位置。对于实时编辑，建议使用Mutable的状态功能，这样就只有贴花会实时更新，而角色的其他部分保持不变。

贴花系统会投影到开发者选择的一个或多个材质通道上，所以在可实现的效果方面没有太多限制。唯一的限制可能在于组织结构方面。例如，如果你希望单个投射器影响任何可切换的部分，所有这些可切换部分必须是单个组节点的子节点。

## Mutable包含动态系统（如毛发、布料等）吗？

除了虚幻引擎所提供的功能之外，Mutable不提供任何额外的动态系统。支持部分虚幻引擎的毛发和布料系统（请参阅本常见问题解答中的其他问题）

## Mutable支持虚幻引擎中发布的毛发groom和毛发渲染系统吗？

支持虚幻引擎的[Groom](/documentation/zh-cn/unreal-engine/hair-simulation-and-rendering-quick-start-guide-in-unreal-engine)。

## Mutable支持变形吗？

支持，Mutable可以读取源骨骼网格体中存在的变形。开发者可以选择是将它们烘焙到创建的网格体中（以使变形在实时运行时不产生开销），还是将它们保留为标准的虚幻引擎GPU变形（用于实时动画）。

## Mutable可以模拟角色的老化吗？

可以，可以使用变形和法线贴图纹理操作来实现这种效果。

## Mutable支持面部动画吗？

支持，Mutable支持基于骨骼的动画、实时变形以及基于变形的面部动画。

## Mutable可以处理布料动画吗？

虚幻引擎中有多种布料动画系统：

-   **UE Clothing Tool** ：Mutable 1.3及以上版本支持该工具。
-   **nVidia Apex Cloth** ：Mutable不支持，并且未来也不会支持。因为该系统使用了二进制blob中的不透明数据，Mutable无法与之交互。
-   **Anim Dynamics** ：该系统依赖于骨骼来使网格体变形，无需任何要求即可支持。如需了解Anim Dynamics概述，请参阅[创建动态动画](/documentation/zh-cn/unreal-engine/creating-dynamic-animations-in-unreal-engine)。
-   **Panel Clothing** ：Mutable不支持。

## Mutable支持Anim Dynamics吗？

是的，它支持。

## 如何为Mutable生成的角色设置物理资产？

默认情况下，Mutable不会对其进行处理，但你可以激活一个选项，使其自动使用根可自定义对象中参考网格体的形体资产。使用C++调用 `UCustomizableObjectInstance::SetReplacePhysicsAssets(true)` 。或者，你也可以在骨骼网格体组件中使用 **物理资产重载（Physics Asset Override）** 属性。

## Mutable有任何特殊的毛发渲染功能吗？可以对长发和马尾辫进行物理模拟吗？

不可以，它没有任何毛发特定的功能。由于Mutable使用并生成标准的虚幻引擎网格体、材质和纹理，所以任何你能使用虚幻引擎实现的毛发效果，都应该能集成到Mutable角色中。

Mutable会遵循提供的参考骨架，因此它会保留虚幻引擎Anim Dynamics骨骼，这些骨骼可用于对马尾辫进行物理模拟。

## 我可以使用烘焙变形或实时变形来改变骨骼网格体的高度吗？

无论是烘焙变形还是实时变形，Mutable变形都和虚幻引擎的变形目标具有相同的限制。在使用变形目标与骨骼网格体时，可能会遇到的一个限制是蒙皮可能会破裂。由于骨骼不受变形目标的影响，在应用变形之后，网格体中的顶点可能会出现在骨骼位置不正确的地方，从而导致不必要的变形。使用变形目标改变角色高度时，很可能会遇到这种限制，因此不建议这样做。更好的选择是使用[骨骼变换](/documentation/zh-cn/unreal-engine/animation-blueprint-transform-bone-in-unreal-engine)，这是完全受Mutable生成的骨骼网格体支持的操作。

## Mutable如何处理内容更新和二进制差异？

在成功编译游戏中所有可自定义对象后，Mutable生成的所有数据（通常一个完整游戏的数据量为几百MB，这些数据会在游戏中进行流送和缓存）都会存储在游戏项目内一个文件夹中的多个文件中。文件夹和文件数量可以通过配置选项进行更改。通过这些选项，开发者可以指定文件大小限制，如果开发者设置了一个较高的限制，所有数据将存储在一个大文件中，每次内容更新后都会修改该文件。

相反，如果设置了一个较低的限制，会将每个对象打包在其各自的小文件中。这会生成大量文件，但会更好地处理内容更新，只修改那些发生了更改的文件。虚幻引擎的pak系统将接管后续工作，可能会将所有Mutable文件打包到一个pak文件中。这会将它们拆分成多个pak文件，或者根本不将它们放入pak文件中。

## 我可以检查或调试Mutable角色吗？如果不符合预期怎么办？

在编辑器会话期间或游戏过程中，Mutable会将错误信息输出到消息日志或输出日志中。在图表编辑器中，它还会突出显示有问题的节点。

在Mutable编辑器会话期间，除了可以在预览视口中实时查看结果外，你还可以看到一个带超链接的骨骼网格体缩略图当前显示在预览视口中。你可以双击它，此时将会打开一个包含该骨骼网格体的虚幻引擎骨骼网格体编辑器窗口。你可以在此检查网格体、材质、纹理布局以及网格体所使用的纹理。

## 如何使用Mutable实现透明的紧身服装效果？

你可以结合使用纹理混合和变形效果来实现。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [mutable](https://dev.epicgames.com/community/search?query=mutable)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Mutable适合我的项目吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E9%80%82%E5%90%88%E6%88%91%E7%9A%84%E9%A1%B9%E7%9B%AE%E5%90%97%EF%BC%9F)
-   [Mutable能提供什么？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E8%83%BD%E6%8F%90%E4%BE%9B%E4%BB%80%E4%B9%88%EF%BC%9F)
-   [Mutable包含我们可以在游戏中使用的角色库吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E5%8C%85%E5%90%AB%E6%88%91%E4%BB%AC%E5%8F%AF%E4%BB%A5%E5%9C%A8%E6%B8%B8%E6%88%8F%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%9A%84%E8%A7%92%E8%89%B2%E5%BA%93%E5%90%97%EF%BC%9F)
-   [Mutable提供角色自定义系统的初始示例项目吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E6%8F%90%E4%BE%9B%E8%A7%92%E8%89%B2%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B3%BB%E7%BB%9F%E7%9A%84%E5%88%9D%E5%A7%8B%E7%A4%BA%E4%BE%8B%E9%A1%B9%E7%9B%AE%E5%90%97%EF%BC%9F)
-   [我们使用的是非标准材质或渲染管线，我们可以使用Mutable吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#%E6%88%91%E4%BB%AC%E4%BD%BF%E7%94%A8%E7%9A%84%E6%98%AF%E9%9D%9E%E6%A0%87%E5%87%86%E6%9D%90%E8%B4%A8%E6%88%96%E6%B8%B2%E6%9F%93%E7%AE%A1%E7%BA%BF%EF%BC%8C%E6%88%91%E4%BB%AC%E5%8F%AF%E4%BB%A5%E4%BD%BF%E7%94%A8mutable%E5%90%97%EF%BC%9F)
-   [Mutable为角色创建了哪种类型的资产？它们是特殊或自定义骨骼网格体？它们存在什么缺点或性能损失？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E4%B8%BA%E8%A7%92%E8%89%B2%E5%88%9B%E5%BB%BA%E4%BA%86%E5%93%AA%E7%A7%8D%E7%B1%BB%E5%9E%8B%E7%9A%84%E8%B5%84%E4%BA%A7%EF%BC%9F%E5%AE%83%E4%BB%AC%E6%98%AF%E7%89%B9%E6%AE%8A%E6%88%96%E8%87%AA%E5%AE%9A%E4%B9%89%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93%EF%BC%9F%E5%AE%83%E4%BB%AC%E5%AD%98%E5%9C%A8%E4%BB%80%E4%B9%88%E7%BC%BA%E7%82%B9%E6%88%96%E6%80%A7%E8%83%BD%E6%8D%9F%E5%A4%B1%EF%BC%9F)
-   [骨架的核心结构是什么？例如，它基于虚幻引擎的Mannequin吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#%E9%AA%A8%E6%9E%B6%E7%9A%84%E6%A0%B8%E5%BF%83%E7%BB%93%E6%9E%84%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F%E4%BE%8B%E5%A6%82%EF%BC%8C%E5%AE%83%E5%9F%BA%E4%BA%8E%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E7%9A%84mannequin%E5%90%97%EF%BC%9F)
-   [Mutable可以适配动画吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E5%8F%AF%E4%BB%A5%E9%80%82%E9%85%8D%E5%8A%A8%E7%94%BB%E5%90%97%EF%BC%9F)
-   [Mutable提供人群系统吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E6%8F%90%E4%BE%9B%E4%BA%BA%E7%BE%A4%E7%B3%BB%E7%BB%9F%E5%90%97%EF%BC%9F)
-   [可以将该解决方案连接到任何寻路系统、IK解算器和人群系统吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#%E5%8F%AF%E4%BB%A5%E5%B0%86%E8%AF%A5%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%E8%BF%9E%E6%8E%A5%E5%88%B0%E4%BB%BB%E4%BD%95%E5%AF%BB%E8%B7%AF%E7%B3%BB%E7%BB%9F%E3%80%81ik%E8%A7%A3%E7%AE%97%E5%99%A8%E5%92%8C%E4%BA%BA%E7%BE%A4%E7%B3%BB%E7%BB%9F%E5%90%97%EF%BC%9F)
-   [Mutable支持同时显示多少个角色？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E6%94%AF%E6%8C%81%E5%90%8C%E6%97%B6%E6%98%BE%E7%A4%BA%E5%A4%9A%E5%B0%91%E4%B8%AA%E8%A7%92%E8%89%B2%EF%BC%9F)
-   [Mutable是在运行时生成固定的图集，还是可以随时修改？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E6%98%AF%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E7%94%9F%E6%88%90%E5%9B%BA%E5%AE%9A%E7%9A%84%E5%9B%BE%E9%9B%86%EF%BC%8C%E8%BF%98%E6%98%AF%E5%8F%AF%E4%BB%A5%E9%9A%8F%E6%97%B6%E4%BF%AE%E6%94%B9%EF%BC%9F)
-   [贴花系统的实时性如何？如果我们使用该系统，我们可以添加的自定义类型会受到限制吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#%E8%B4%B4%E8%8A%B1%E7%B3%BB%E7%BB%9F%E7%9A%84%E5%AE%9E%E6%97%B6%E6%80%A7%E5%A6%82%E4%BD%95%EF%BC%9F%E5%A6%82%E6%9E%9C%E6%88%91%E4%BB%AC%E4%BD%BF%E7%94%A8%E8%AF%A5%E7%B3%BB%E7%BB%9F%EF%BC%8C%E6%88%91%E4%BB%AC%E5%8F%AF%E4%BB%A5%E6%B7%BB%E5%8A%A0%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%9E%8B%E4%BC%9A%E5%8F%97%E5%88%B0%E9%99%90%E5%88%B6%E5%90%97%EF%BC%9F)
-   [Mutable包含动态系统（如毛发、布料等）吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E5%8C%85%E5%90%AB%E5%8A%A8%E6%80%81%E7%B3%BB%E7%BB%9F%EF%BC%88%E5%A6%82%E6%AF%9B%E5%8F%91%E3%80%81%E5%B8%83%E6%96%99%E7%AD%89%EF%BC%89%E5%90%97%EF%BC%9F)
-   [Mutable支持虚幻引擎中发布的毛发groom和毛发渲染系统吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E6%94%AF%E6%8C%81%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E5%8F%91%E5%B8%83%E7%9A%84%E6%AF%9B%E5%8F%91groom%E5%92%8C%E6%AF%9B%E5%8F%91%E6%B8%B2%E6%9F%93%E7%B3%BB%E7%BB%9F%E5%90%97%EF%BC%9F)
-   [Mutable支持变形吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E6%94%AF%E6%8C%81%E5%8F%98%E5%BD%A2%E5%90%97%EF%BC%9F)
-   [Mutable可以模拟角色的老化吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E5%8F%AF%E4%BB%A5%E6%A8%A1%E6%8B%9F%E8%A7%92%E8%89%B2%E7%9A%84%E8%80%81%E5%8C%96%E5%90%97%EF%BC%9F)
-   [Mutable支持面部动画吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E6%94%AF%E6%8C%81%E9%9D%A2%E9%83%A8%E5%8A%A8%E7%94%BB%E5%90%97%EF%BC%9F)
-   [Mutable可以处理布料动画吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E5%8F%AF%E4%BB%A5%E5%A4%84%E7%90%86%E5%B8%83%E6%96%99%E5%8A%A8%E7%94%BB%E5%90%97%EF%BC%9F)
-   [Mutable支持Anim Dynamics吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E6%94%AF%E6%8C%81animdynamics%E5%90%97%EF%BC%9F)
-   [如何为Mutable生成的角色设置物理资产？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#%E5%A6%82%E4%BD%95%E4%B8%BAmutable%E7%94%9F%E6%88%90%E7%9A%84%E8%A7%92%E8%89%B2%E8%AE%BE%E7%BD%AE%E7%89%A9%E7%90%86%E8%B5%84%E4%BA%A7%EF%BC%9F)
-   [Mutable有任何特殊的毛发渲染功能吗？可以对长发和马尾辫进行物理模拟吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E6%9C%89%E4%BB%BB%E4%BD%95%E7%89%B9%E6%AE%8A%E7%9A%84%E6%AF%9B%E5%8F%91%E6%B8%B2%E6%9F%93%E5%8A%9F%E8%83%BD%E5%90%97%EF%BC%9F%E5%8F%AF%E4%BB%A5%E5%AF%B9%E9%95%BF%E5%8F%91%E5%92%8C%E9%A9%AC%E5%B0%BE%E8%BE%AB%E8%BF%9B%E8%A1%8C%E7%89%A9%E7%90%86%E6%A8%A1%E6%8B%9F%E5%90%97%EF%BC%9F)
-   [我可以使用烘焙变形或实时变形来改变骨骼网格体的高度吗？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#%E6%88%91%E5%8F%AF%E4%BB%A5%E4%BD%BF%E7%94%A8%E7%83%98%E7%84%99%E5%8F%98%E5%BD%A2%E6%88%96%E5%AE%9E%E6%97%B6%E5%8F%98%E5%BD%A2%E6%9D%A5%E6%94%B9%E5%8F%98%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93%E7%9A%84%E9%AB%98%E5%BA%A6%E5%90%97%EF%BC%9F)
-   [Mutable如何处理内容更新和二进制差异？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#mutable%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%86%85%E5%AE%B9%E6%9B%B4%E6%96%B0%E5%92%8C%E4%BA%8C%E8%BF%9B%E5%88%B6%E5%B7%AE%E5%BC%82%EF%BC%9F)
-   [我可以检查或调试Mutable角色吗？如果不符合预期怎么办？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#%E6%88%91%E5%8F%AF%E4%BB%A5%E6%A3%80%E6%9F%A5%E6%88%96%E8%B0%83%E8%AF%95mutable%E8%A7%92%E8%89%B2%E5%90%97%EF%BC%9F%E5%A6%82%E6%9E%9C%E4%B8%8D%E7%AC%A6%E5%90%88%E9%A2%84%E6%9C%9F%E6%80%8E%E4%B9%88%E5%8A%9E%EF%BC%9F)
-   [如何使用Mutable实现透明的紧身服装效果？](/documentation/zh-cn/unreal-engine/mutable-faq-in-unreal-engine#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8mutable%E5%AE%9E%E7%8E%B0%E9%80%8F%E6%98%8E%E7%9A%84%E7%B4%A7%E8%BA%AB%E6%9C%8D%E8%A3%85%E6%95%88%E6%9E%9C%EF%BC%9F)