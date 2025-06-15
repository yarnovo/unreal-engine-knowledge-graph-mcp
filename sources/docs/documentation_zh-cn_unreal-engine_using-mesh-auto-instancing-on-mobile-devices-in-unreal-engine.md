# 在虚幻引擎中使用移动设备上的网格体自动实例化 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-mesh-auto-instancing-on-mobile-devices-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:00:33.437Z

---

目录

![移动设备上的网格体自动实例化](https://dev.epicgames.com/community/api/documentation/image/c4e3ab60-094b-4b6f-ac16-dd5654055a69?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

虚幻引擎[**网格体绘制管线**](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine)实现合并绘制调用的网格体自动实例化功能，可大大提高图形性能。该功能现在可用于移动设备，但需进行一些额外设置配置。

## 步骤

1.  找到项目的 **Config** 文件夹，然后打开 **DefaultEngine.ini.**。
    
2.  添加下面几行代码：
    
    ```cpp
             r.Mobile.SupportGPUScene=1
             r.Mobile.UseGPUSceneTexture=1
    		
    ```
    
    保存更改并关闭文件。
    

启用此功能将促使为移动平台重建着色器。若将虚幻编辑器设为Android预览模式，编辑器将相应地重新编译着色器。大项目可能有很长的迭代时间。

## 结果

通过为项目启用上述设置，将为所有设备启用自动实例化。`r.Mobile.SupportGPUScene` 在移动设备上启用自动实例化。但它们将与桌面编译使用同一个缓冲区。Mali设备仅支持最大64 kb的缓冲区，通常无法支持此功能。`r.Mobile.UseGPUSceneTexture` 将让自动实例化过程使用纹理而非缓冲区来存储所需信息，因而Mali设备也能使用自动实例化。

## 限制

除[网格体绘制管道](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine)页面提到绘制调用合并限制外，自动实例化还有一些针对移动设备的限制：

-   移动设备上的自动实例化主要对严重CPU密集型而非GPU密集型项目有益。尽管启用自动实例化不太可能会损害GPU密集型项目，但不太可能看到显著的性能改进。
    
-   若游戏需要大量内存，鉴于 `r.Mobile.UseGPUSceneTexture` 在Mali设备上无效，关闭 `r.Mobile.UseGPUSceneTexture` 并使用缓冲区可能会更有益。
    

自动实例化的有效性在很大程度上取决于项目的具体规范。因此，我们建议你创建启用自动实例化的编译并对其进行分析，从而确定是否会看到显著的性能提升。分析详情，参见[性能和分析](/documentation/zh-cn/unreal-engine/testing-and-optimizing-your-content)部分。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [graphics](https://dev.epicgames.com/community/search?query=graphics)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [mesh](https://dev.epicgames.com/community/search?query=mesh)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-mesh-auto-instancing-on-mobile-devices-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [结果](/documentation/zh-cn/unreal-engine/using-mesh-auto-instancing-on-mobile-devices-in-unreal-engine#%E7%BB%93%E6%9E%9C)
-   [限制](/documentation/zh-cn/unreal-engine/using-mesh-auto-instancing-on-mobile-devices-in-unreal-engine#%E9%99%90%E5%88%B6)

相关文档

[

测试并优化你的内容

![测试并优化你的内容](https://dev.epicgames.com/community/api/documentation/image/08e147b7-4ad0-4a64-9a37-0d05286faa85?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/testing-and-optimizing-your-content)