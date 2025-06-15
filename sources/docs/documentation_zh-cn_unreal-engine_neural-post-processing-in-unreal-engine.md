# 虚幻引擎中的神经后期处理 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/neural-post-processing-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:43:30.513Z

---

目录

![神经后期处理](https://dev.epicgames.com/community/api/documentation/image/f7c47589-0e0e-47fa-99a8-19cd4b7ed464?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

**神经后期处理（Neural Post Processing）** 是一种在后期处理管线中使用神经网络的用户友好型方法。你可以使用材质编辑器设置利用神经网络的后期处理材质（Post Process Material），而无需编写任何代码。

## 启用神经后期处理

在开始前，你需要先在项目中启用 **Neural Rendering** 插件。具体方法是在主菜单的 **编辑（Edit）** 下打开 **插件（Plugin）** 浏览器。此插件包含了基于神经配置以及由材质编辑器设置的神经缓冲区/纹理集来运行网络所需的所有代码。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85499994-bde5-42a4-8991-c512f8b2cac7/npp-pluginbrowser.png)

## 设置神经后期处理材质

请按下文所述导入并设置ONNX格式的神经网络，并创建一个可以使用此神经网络的后期处理材质。

### 设置神经网络配置

请按以下步骤将一个兼容的神经网络模型导入虚幻引擎并对其进行设置。

1.  将一个 **ONNX（\*.onnx）** 机器学习模型文件导入虚幻引擎，创建一个 **NNE模型数据（NNE Model Data）** 资产。
2.  在内容浏览器中，使用 **添加（+）** 菜单创建一个 **神经配置（Neural Profile）** 资产。你可以从 **材质（Material） > 配置（Profiles）** 菜单添加一个。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a6f142a-6279-4f50-ba59-cfc5d1d622bc/npp-addneuralprofile.png)
3.  打开新创建的 **\*神经配置（Neural Profile）** 资产。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3a1594f-7783-4331-a8a3-17303eb739a0/npp-neuralprofileasseteditor.png)
4.  在导入ONNX文件时，使用NNE模型数据分配插槽设置创建的NNE模型数据资产。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f6c3286-3326-4e87-a26e-d11933ab2c78/npp-neuralprofile-nnemodeldataslot.png)

### 创建后期处理材质

按以下步骤设置一个使用神经配置和某些图表逻辑的后期处理材质。

1.  在内容浏览器中新建一个 **材质** 并打开它。
2.  在材质编辑器中，使用 **细节** 面板进行以下设置：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec34ac5c-f4ab-446e-99cf-7b8ef9b46a1c/npp-materialsettings.png)
    -   **材质域（Material Domain）**：后期处理（Post Process）
    -   **配合神经网络使用（Used with Neural Networks）**：勾选
    -   **神经配置（Neural Profile）**：神经配置资产
3.  在材质图表中，使用 **Neural Input** 节点准备网络的输入，并通过 **Neural Output** 节点从网络中获取输出。在连接到主材质节点的 **Emissive Color** 引脚后，你的图表应该如下图所示：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8bc39c36-5cbd-4082-ad21-30facf7b741e/npp-materialgraph.png)
4.  点击材质编辑器工具栏中的 **应用（Apply）**。

使用此设置后，材质就可以使用材质编辑器中的所有可用节点对数据进行预处理和后期处理了。此示例应用了一个简单的1/2.2常数伽马校正，并将输入值范围从0 ~ 1调整为0 ~255，然后在从神经网络输出获取结果后将其反转回显示范围。缩放并非总是必需的。这取决于神经网络模型的输入和输出范围。如果模型的输入和输出在0 ~ 1的范围内，那么我们有如下更简单的设置：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08ac0ef3-2ac9-4c84-8f5f-2befca2071da/npp-exampematerial1.png)

下面的示例进一步说明了如何将自定义区域应用于使用默认光源材质作为遮罩的情况。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddd24148-1424-41e8-8cba-c24f89130d78/npp-examplematerial2.png)

此设置可以创建如下结果：

![Basic Scene](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/087e2593-7b56-4f52-9117-557f4cd4e7c2/npp-examplescene1.png)

![Scene with Neural Post Process Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c72655e-3c9c-4f4e-bafa-34e74fa9a429/npp-examplescene2.png)

Basic Scene

Scene with Neural Post Process Material

## 神经配置资产设置

神经配置用于与神经网络进行绑定，指定运行时、批次大小以及图块配置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e835e8f-577a-4318-8130-91d52c35c3e5/npp-neuralprofileasseteditor1.png)

属性

说明

模型

 

**运行时类型（Runtime Type）**

支持的NNE运行时类型，NNERuntimeORTDml或者NNERuntimeRDGHlsl。

**NNE模型数据（NNE Model Data）**

存储导入引擎的NNE模型数据，如ONNX模型。

**输入尺寸（Input Dimension）**

正在使用的神经网络引擎（NNE）模型数据的输入尺寸。

**输出尺寸（Output Dimension）**

正在使用的神经网络引擎（NNE）模型数据的输出尺寸。

重载

 

**批次大小（Batch Size）**

用于在批次尺寸为动态（-1）的情况下重载批次大小。

图块

 

**图块大小（Tile Size）**

使用的图块总数。每个批次执行一个图块。NNE模型被加载并直接使用，而不会放大其尺寸。例如，如果输入纹理具有不同的尺寸，那么在应用之前会将其缩小。如果将此项设置为"自动（Auto）"，则会在批次尺寸中自动创建平铺缓冲区，其中每个图块都会运行神经模型。例如，如果模型的输入尺寸为（1x3x200x200）且后期处理使用的缓冲区大小为1000x1000，那么将运行并重新合并5x5个的图块（(5x5)x3x200x200）。

**边界重叠（Border Overlaps）**

图块边界（左右上下）的重叠幅度。当"图块大小（Tile Size）"被设置为"自动（Auto）"时，此数值越大，覆盖整个屏幕所需的图块就越多。

**重叠解算类型（Overlap Resolve Type）**

设置重叠的解算方式。忽略此项表示重叠的图块区域对相邻图块没有影响。羽化表示重叠区域以线性方式与相邻图块混合。

### 平铺

纹理索引模式支持平铺，包括图块的重叠。在平铺过程中，你可以将重叠的图块区域设为 **忽略（Ignored）** 或 **羽化（Feathered）**，以支持诸如神经过滤和风格转换等应用。更多的图块有助于增加细节，但基于网络的复杂程度，可能会造成较高的开销。

下面是一个展示神经风格转换的示例，使用了2X2的图块，羽化设置并隐藏接缝。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5bc91d6f-47a5-4702-842f-aa19bce28541/npp-tiling1.png)

你可以使用控制台可视化命令 `r.Neuralpostprocess.TileOverlap.Visualize 1` 将图块的重叠情况可视化。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c858a890-746e-4565-a5b6-1a5c0770dd90/npp-tiling2.png)

在将"图块大小（Tile Size）"设为 **自动（Auto）** 时，图块大小不会应用缩放，但会直接将网络应用于神经输入纹理。此时，纹理外的图块会被镜像。下面的示例展示了在将图块大小设为自动时，图块的重叠情况。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bdf68fff-265e-4257-a198-573f3f04abf5/npp-tiling3.png)

### 缓冲区索引

纹理会被缩放至目标尺寸，如果将将"图块大小（Tile Size）"设为 **自动（Auto）**，则纹理保持不变。当前纹理索引模式默认支持\[1 x 3 x H x W\]的纹理索引模式。

若要使用具有其他尺寸\[B x C x H x W\]的任意ONNX模型，你可以使用 **缓冲区索引模式（Buffer Indexing Mode）** 。此模式提供了对实际读取/写入值的完全控制。它本身不会进行任何过滤操作，你需要使用材质图表中的逻辑或编写自定义着色器代码来应用所需的任何过滤器。

下面的示例将场景划分成了B=2x2个批次，并通过Neural Input和Neural Output (Buffer)节点对每个批次进行了设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34f71dfc-14e6-44d2-a7aa-fff697c02eb3/npp-buffering1.png)

你还需要修改神经配置（Neural Profile）资产中的部分设置。你可以在以下选项中任选一项：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a386e72-d6e7-4085-aeac-18a9525f2620/npp-buffering2.png)

-   如果支持动态批次，则将 **批次大小重载（Batch Size Override）** 设为 **4**。
-   如果 **不** 支持动态批次，则将 **图块大小（Tile Size）** 设为 **2x2**。

图块会被依次调用，而对批次操作会在一个运行周期内完成。这两个选项也可以结合使用，这取决于你如何设计从缓冲区读取/写入数据的流程。目前，\*Neural Output\*\* 节点的每次调用都会读取三个连续的通道。

### 运行时类型

有两种NNE运行时可供选择：

-   **NNERuntimeORTDml**：此类型将DirectML作为后端使用。
-   **NNERuntimeRDGHlsl**：此类型采用了针对输出宽度进行优化的卷积运算，其结果取模为32 。

## 应用场景

你可以在项目的实时渲染过程中使用神经后期处理，也可以通过场景捕获（Scene Capture）工具来使用它。以下是一些潜在的应用场景：

-   **风格化**：快速风格转换、AnimeGAN、CartoonGAN、Pix2Pix、CycleGAN
-   **素描风格**：ShadeSketch
-   **神经色调映射**
-   **图像分割与分类**

## 其他注意事项

-   **神经输入/输出节点的调用数量**
    -   虽然一个后期处理材质中只能调用一个Neural Input节点，但可以多次调用Neural Output节点。
-   **Neural Input遮罩**
    -   可以使用遮罩来选取屏幕的一部分以写入缓冲区/纹理。例如，如果有一个矩形区域位于屏幕的左上角，你可以将遮罩设置为0，并将该区域设置为1，使其UV坐标和输入生效，以将其写入缓冲区，同时忽略其他UV坐标和输入。
-   **如果最终分辨率过低**
    -   最终分辨率受模型输出尺寸影响。请在神经配置（Neural Profile）中检查输出尺寸。要提升分辨率，你可以导出更高分辨率的模型，也可以使用上文中提到的缓冲区索引/平铺方法来提高尺寸。注意，有些模型在边界处可能出现不连贯的情况。
-   **缓冲区布局**
    -   纹理缩影模式原生支持的布局为BCHW。由于开发的模型的布局可能是BHWC（如tensorflow），你应该明确将其导出为BCHW。

## 实用控制台命令

-   `r.Neuralpostprocess.Apply` 可以启用或禁用神经网络。在禁用时，神经输入会被直接返回为神经输出。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [post processing](https://dev.epicgames.com/community/search?query=post%20processing)
-   [machine learning](https://dev.epicgames.com/community/search?query=machine%20learning)
-   [nne](https://dev.epicgames.com/community/search?query=nne)
-   [post process materials](https://dev.epicgames.com/community/search?query=post%20process%20materials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用神经后期处理](/documentation/zh-cn/unreal-engine/neural-post-processing-in-unreal-engine#%E5%90%AF%E7%94%A8%E7%A5%9E%E7%BB%8F%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86)
-   [设置神经后期处理材质](/documentation/zh-cn/unreal-engine/neural-post-processing-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E7%A5%9E%E7%BB%8F%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E6%9D%90%E8%B4%A8)
-   [设置神经网络配置](/documentation/zh-cn/unreal-engine/neural-post-processing-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C%E9%85%8D%E7%BD%AE)
-   [创建后期处理材质](/documentation/zh-cn/unreal-engine/neural-post-processing-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E6%9D%90%E8%B4%A8)
-   [神经配置资产设置](/documentation/zh-cn/unreal-engine/neural-post-processing-in-unreal-engine#%E7%A5%9E%E7%BB%8F%E9%85%8D%E7%BD%AE%E8%B5%84%E4%BA%A7%E8%AE%BE%E7%BD%AE)
-   [平铺](/documentation/zh-cn/unreal-engine/neural-post-processing-in-unreal-engine#%E5%B9%B3%E9%93%BA)
-   [缓冲区索引](/documentation/zh-cn/unreal-engine/neural-post-processing-in-unreal-engine#%E7%BC%93%E5%86%B2%E5%8C%BA%E7%B4%A2%E5%BC%95)
-   [运行时类型](/documentation/zh-cn/unreal-engine/neural-post-processing-in-unreal-engine#%E8%BF%90%E8%A1%8C%E6%97%B6%E7%B1%BB%E5%9E%8B)
-   [应用场景](/documentation/zh-cn/unreal-engine/neural-post-processing-in-unreal-engine#%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)
-   [其他注意事项](/documentation/zh-cn/unreal-engine/neural-post-processing-in-unreal-engine#%E5%85%B6%E4%BB%96%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
-   [实用控制台命令](/documentation/zh-cn/unreal-engine/neural-post-processing-in-unreal-engine#%E5%AE%9E%E7%94%A8%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%91%BD%E4%BB%A4)