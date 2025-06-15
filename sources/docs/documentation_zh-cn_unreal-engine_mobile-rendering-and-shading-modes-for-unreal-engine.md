# 虚幻引擎的移动渲染和着色模式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:59:10.236Z

---

目录

![渲染和着色模式](https://dev.epicgames.com/community/api/documentation/image/62b71aa4-23e4-4d9b-9e8f-3fcbe691334c?resizing_type=fill&width=1920&height=335)

UE提供了适合在移动设备上使用的 **前向** 和 **延迟** 着色模式，以及对 **桌面渲染器** 的试验性支持。每种着色模式在性能和保真度方面均有不同的权衡。本页面概述了移动端的前向和桌面着色模式，而桌面渲染器则在[单独的指南](/documentation/404)中进行介绍。

## 如何设置着色模式

你可以使用控制台变量 `r.Mobile.ShadingPath` 在 `Engine.ini` 文件中设置你要使用的移动着色模型。你可以使用的值如下：

**值**

**着色模式**

**说明**

0

移动前向着色（Mobile Forward Shading）

在运行时处理光照和阴影。适用于使用预计算光照的项目。

1

移动延迟着色（Mobile Deferred Shading）

处理光照和阴影

或者，你可以在高端移动设备上使用 **桌面渲染器** ，但请记住，这会产生显著的性能开销。有关更多详情，请参阅[移动端桌面渲染器](/documentation/404)。

有关这些渲染模式的更多详细信息，请参阅以下小节。

## 我应使用哪种着色模式？

![移动前向反射（旧）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cebdeaad-54c0-43a6-8632-7b6bd3649156/mobilerenderingold.png)

![移动延迟反射（新）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c058719-cb74-4c05-8732-8c90a7b7db60/mobilerenderingnew.png)

移动前向反射（旧）

移动延迟反射（新）

虚幻引擎支持的大多数设备都能够满足使用移动延迟着色的硬件要求，并且由于材质复杂性降低以及光照功能出色，它通常能够提供出色的性能。

对于使用预计算光照的项目，我们强烈建议使用移动前向着色。

## 移动前向着色

**前向着色** 处理绘制时材质与光影的交互，这是移动端的默认着色模式。

### 优势

-   基线性能最快且兼容多种硬件。
    
-   使用预计算光照实现更快的渲染。
    
-   提供最佳种类和质量的抗锯齿选项。
    
-   使用大量反射捕获时性能更佳。
    

### 缺点

-   对动态光照、阴影和反射的支持有限。
    
-   材质必须包括光源和阴影代码以及所有其他参数。
    
    -   这会增加：
        
        -   材质使用的指令数量。
            
        -   材质使用的采样器数量。
            
        -   编译材质/着色器时的编译时长。
            
    -   与延迟着色相比，这可能会导致更多卡顿和内存消耗。
        

### 何时使用前向着色

前向着色适用于：

-   使用预计算光照的项目。
    
-   使用局部光源或大量反射捕获的项目。
    
-   针对不使用基于图块的GPU的设备的项目。
    

## 移动延迟着色

**延迟着色** 将几何体和光照/着色作为单独的通道进行处理，而不是在运行时同时处理。为高质量反射、多个动态光源、光照贴花和其他高级光照功能提供支持，这些功能在移动端的默认前向渲染模式中通常不可用。有关其保真度和性能改进的更多详细信息，请参阅[移动延迟着色](/documentation/zh-cn/unreal-engine/using-the-mobile-deferred-shading-mode-in-unreal-engine)。

### 优势

-   在使用基于图块的GPU的移动设备上，性能更佳。
    
-   在使用复杂光照的项目上，性能更佳，内存使用率更高。
    
-   提供前向着色不提供的高级光照功能。
    

### 缺点

-   需要相对高端的移动硬件。
    
-   仅为预计算光照提供默认光照和无光照着色模型。
    
-   抗锯齿选项更加有限。
    

### 何时使用延迟着色

延迟着色适用于：

-   使用动态光照的项目。
    
-   具有广泛户外环境的项目。
    

### 光照功能

移动延迟着色模式提供以下光照功能：

-   光源函数
    
-   光源配置文件
    
-   IES光源配置文件
    
-   光照贴花
    
-   提升局部光源渲染效率。
    

有关更多细节，请参阅[移动延迟着色](/documentation/zh-cn/unreal-engine/using-the-mobile-deferred-shading-mode-in-unreal-engine)。

### 渲染限制

-   **预计算光照和着色模型限制** ：如果你的项目使用预计算光照，延迟着色仅会提供默认光照（DefaultLit）和无光照（Unlit）着色模型。如果你的项目使用预计算光照，我们强烈建议你使用前向着色而非延迟着色。
    
-   **半透明通道** ：延迟着色模式提供半透明功能，但半透明通道始终使用前向着色。确保半透明材质（比如玻璃或水）的 **光照模式（Lighting Mode）** 设置为 **表面前向着色（Surface ForwardShading）** 。
    
-   **多重取样抗锯齿（MSAA）** ：延迟渲染无法支持MSAA，因为它需要在GBuffer中占用大量空间。由于需要着色每个样本而非每个像素，它还会有更加耗费资源的着色通道。
    
-   **光照贴花限制** ：在延迟模式下，静态光照不支持光照贴花，因为它需要更多的贴花缓冲空间。由于存在内存限制，移动设备上不支持光照贴花。然而，**自发光** 贴花很适合静态光照。
    
-   **其他贴花限制** ：由于GBuffer中存在空间限制，贴花将八面体编码用于法线，从而缩减大小。此编码使得你无法在GBuffer中混合或修改法线。然而，你可以完全覆盖它们。
    
-   **着色模型限制** ：若使用移动延迟着色，在同时支持多个着色模型的情况下，开销会非常高。因此，你应将复杂着色模型限制为仅用于需要它们的对象。
    

### 图块内存用法

每个移动平台在图块内存中执行着色的方式不同。

-   **iOS** 使用类似于 `framebuffer_fetch` 的功能访问图块内存中的GBuffer。
    
-   **Android Vulkan** 使用Vulkan的子通道。
    
-   **Android GLES** 需要扩展，并且没有适用于所有GPU的通用方法。
    
-   **Mali** 和 **PowerVR** 使用PLS扩展。
    
-   **Adreno** GPU使用 `framebuffer_fetch` 扩展。
    

其他GPU使用立即模式渲染器，所以这些图块内存技巧不适用。在这些案例中，GBuffer作为系统内存中的常规纹理分配，并且可能没有内存优势。

### 硬件限制

UE支持的大多数移动硬件都满足使用移动延迟着色模型的要求。然而，运行Android Vulkan的Mali设备对颜色和输入附件有严格限制：

-   GBuffer中逐像素16字节或128位。
    
-   最多只能使用4个输入附件。
    
-   在光照处理阶段，最多仅获取3个颜色附件和1个深度附件。
    

为确保所有设备的一致性，移动延迟着色模式默认采用这些限制。若要移除这些限制，可将 `Engine.ini` 文件中的 `MobileUsesExtendedGBuffer` 参数设置为 `true` 。然后，移动延迟着色模式将扩展GBuffer以使用用户设备的所有功能。

-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [ios](https://dev.epicgames.com/community/search?query=ios)
-   [android vulkan](https://dev.epicgames.com/community/search?query=android%20vulkan)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [如何设置着色模式](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine#%E5%A6%82%E4%BD%95%E8%AE%BE%E7%BD%AE%E7%9D%80%E8%89%B2%E6%A8%A1%E5%BC%8F)
-   [我应使用哪种着色模式？](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine#%E6%88%91%E5%BA%94%E4%BD%BF%E7%94%A8%E5%93%AA%E7%A7%8D%E7%9D%80%E8%89%B2%E6%A8%A1%E5%BC%8F%EF%BC%9F)
-   [移动前向着色](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine#%E7%A7%BB%E5%8A%A8%E5%89%8D%E5%90%91%E7%9D%80%E8%89%B2)
-   [优势](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine#%E4%BC%98%E5%8A%BF)
-   [缺点](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine#%E7%BC%BA%E7%82%B9)
-   [何时使用前向着色](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8%E5%89%8D%E5%90%91%E7%9D%80%E8%89%B2)
-   [移动延迟着色](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine#%E7%A7%BB%E5%8A%A8%E5%BB%B6%E8%BF%9F%E7%9D%80%E8%89%B2)
-   [优势](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine#%E4%BC%98%E5%8A%BF-2)
-   [缺点](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine#%E7%BC%BA%E7%82%B9-2)
-   [何时使用延迟着色](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8%E5%BB%B6%E8%BF%9F%E7%9D%80%E8%89%B2)
-   [光照功能](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine#%E5%85%89%E7%85%A7%E5%8A%9F%E8%83%BD)
-   [渲染限制](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine#%E6%B8%B2%E6%9F%93%E9%99%90%E5%88%B6)
-   [图块内存用法](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine#%E5%9B%BE%E5%9D%97%E5%86%85%E5%AD%98%E7%94%A8%E6%B3%95)
-   [硬件限制](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine#%E7%A1%AC%E4%BB%B6%E9%99%90%E5%88%B6)

相关文档

[

移动延迟着色模式

![移动延迟着色模式](https://dev.epicgames.com/community/api/documentation/image/e25b17e5-a27a-4b61-9cc5-53a07d42b990?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/using-the-mobile-deferred-shading-mode-in-unreal-engine)