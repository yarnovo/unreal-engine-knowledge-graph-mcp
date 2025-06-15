# 虚幻引擎中的NNE降噪器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nne-denoiser-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:43:49.159Z

---

目录

![NNE降噪器](https://dev.epicgames.com/community/api/documentation/image/9bd66101-0b81-46d7-a9de-98e08f5b844f?resizing_type=fill&width=1920&height=335)

**NNE降噪器** 是一款路径追踪降噪器，支持通过NNE运行时导入和运行自定义神经降噪器网络。模型以常规 **UNNEModelData** 资产的形式导入，并且降噪推理可以在CPU、GPU或RDG上运行，具体取决于所选运行时的特性。

该插件附带了不同版本的英特尔Open Image降噪器（快速版、平衡版和高质量版，每种还分为有和没有Alpha通道的版本），可以代替自定义模型使用。

## 更改预设

NNEDenoiser插件设置允许用户选择用于空间降噪的降噪器资产，无论其是在CPU、GPU还是RDG上运行，以及使用哪种运行时。若要让路径追踪器使用这些设置中定义的神经网络，你需要将 `r.PathTracing.Denoiser.Name` 设置为 `NNEDenoiser`。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8812c0d8-7531-45ba-a649-9c49cb2eef34/nned-1.png)

### 降噪器资产

模型及其输入和输出映射信息都在数据资产所描述。修改数据资产会修改用于降噪的模型。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f8e7eea-5a0b-484c-befc-506fae7305cc/nned-2.png)

如果英特尔的Open Image降噪器没有出现在下拉菜单中，请确认勾选了 **浏览设置**（齿轮图标）中的 **显示引擎内容（Show Engine Content）** 和 **显示插件内容（Show Plugin Content）** 复选框。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/458a600a-de01-45a9-a817-3426223ff8d7/nned-3.png)

### 运行时类型

此下拉菜单定义了将在何处进行降噪。根据所选的运行时，以及其在当前平台上是否可用，可用的选项将有所不同。请参考每个运行时的特性，以确认哪些配置有效。

#### CPU

这会将有噪点的结果复制到CPU上，在那里进行推理运算，并将结果上传回PCU。请注意，这两次设备间的复制可能会降低降噪的速度。

#### GPU

这会将有噪点的结果复制到CPU上，将其传递到运行时，后者会将其复制到GPU进行推理运算，然后再复制回来，因此它最终又会被复制到GPU上。

由于要经过4次设备间的复制，因此除非没有其他可用的运行时来运行模型，或是模型在CPU上运行更慢，否则不建议使用此设置。

#### RDG

此设置最为高效，因此有噪点的图像是在设备上进行降噪，无需被复制到CPU。如果有相应的可用运行时，建议使用此设置。

### 运行时名称重载

本字段可被用于重载使用中的NNE运行时。请参考每个运行时，以获取此处应使用的名称。另外请注意，包含运行时的插件必须手动启用才能使其生效。此外，所选运行时必须与 **运行时类型（Runtime Type）** 兼容，并且能够运行所选模型。

## 自定义神经降噪器网络

要使用自定义神经网络作为降噪器，则需要一个神经网络模型、输入和输出映射定义，以及一个NNEDenoiser资产。

### 模型

神经网络的添加十分健谈，只需将神经网络文件直接拖入内容编辑器即可。这将创建一个 **UNNEModelData** 资产。请注意，不同的运行时支持的文件格式也各不相同。你必须启用支持某一个格式文件的运行时，才能成功导入神经网络。

### 输入/输出映射

一个神经网络可以有多个输出和输出张量，并且每个张量都可以有多个通道。要将路径追踪器提供的数据（如颜色、法线、反射率等等）映射到神经网络的输入张量和通道上，就需要定义映射文件。

新建映射的方法如下：

1.  在编辑器的内容窗口中点击右键，在 **杂项（Miscellaneous）** 菜单中选择 **数据表（Data Table）**。
2.  在打开的对话框中搜索 **NNEDenoiserInputMappingData** 并选中它。
3.  为神经网络的每个输入张量的每个通道都新添加一行。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4d55393-d4e1-429d-b01f-5cc2a1ea6346/nned-4.png)

同样的，你也可以再创建一个定义输出映射的资产。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc36fb9c-a099-42f8-911b-56b8355190f2/nned-5.png)

属性

说明

**行名称选择框（Row Name Selection Box）**

这是一个可以自行设定的名称，用于描述模型输入通道。它不必与模型的实际输入名称相关联。

**资源（Resource）**

资源说明该数据是从哪个路径追踪器资源中映射来的。

**帧索引（Frame Index）**

此缩影定义了路径追踪器数据是从哪一帧映射来的。索引0会从当前帧获取数据，负数会从之前的帧获取数据，而正数索引会访问未来的帧。

**张量索引（Tensor Index）**

此为模型的输入张量的索引。索引i会将数据映射到模型的第i个输入张量。

**张量通道（Tensor Channel）**

此为模型输入张量通道的索引。索引i会将数据映射到模型输入张量的第i个通道。

**资源通道（Resource Channel）**

此为路径追踪器资源通道的索引。索引i会将数据映射到路径追踪器资源的第i个通道。

### 资产

NNEDenoiser资产定义了一个模型，其输入和输出映射，以及平铺配置。它会在插件设置中被用于选择路径追踪器将使用哪个模型。要创建一个新的自定义资产，请在编辑器的内容窗口中点击右键，依次选择"杂项（Miscellaneous）"和"数据资产（Data Asset）"。在打开的对话框中搜索"NNEDenoiser资产（NNEDenoiser Asset）"并选择它。选择你导入的模型以及在相应下拉列表中定义的映射。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42b1b24b-1d63-4867-b6eb-2538ea3e48e2/nned-6.png)

然后，根据模型特性定义平铺配置。

属性

说明

**尺寸对齐（Size Alignment）**

选择图块尺寸，使其能被该数字整除。如果满足了特定的退旗条件，某些运行时的某些操作符的运行速度会更快。只有在模型支持动态尺寸的情况下，此项才会产生影响。

**重叠（Overlap）**

定义了相邻图块需要重叠的幅度大小，以适应模型的感知域。这是通过输入图像中对输出像素产生影响的像素数量的半径来定义的

**最大尺寸（Max Size）**

每个图块的最大尺寸。只有在模型支持动态尺寸的情况下，此项才会产生影响。

**最小尺寸（Min Size）**

每个图块的最小尺寸。只有在模型支持动态尺寸的情况下，此项才会产生影响。

-   [path tracing](https://dev.epicgames.com/community/search?query=path%20tracing)
-   [path tracer](https://dev.epicgames.com/community/search?query=path%20tracer)
-   [artificial intelligence](https://dev.epicgames.com/community/search?query=artificial%20intelligence)
-   [machine learning](https://dev.epicgames.com/community/search?query=machine%20learning)
-   [neural networks](https://dev.epicgames.com/community/search?query=neural%20networks)
-   [nne](https://dev.epicgames.com/community/search?query=nne)
-   [denoiser](https://dev.epicgames.com/community/search?query=denoiser)
-   [denoising](https://dev.epicgames.com/community/search?query=denoising)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [更改预设](/documentation/zh-cn/unreal-engine/nne-denoiser-in-unreal-engine#%E6%9B%B4%E6%94%B9%E9%A2%84%E8%AE%BE)
-   [降噪器资产](/documentation/zh-cn/unreal-engine/nne-denoiser-in-unreal-engine#%E9%99%8D%E5%99%AA%E5%99%A8%E8%B5%84%E4%BA%A7)
-   [运行时类型](/documentation/zh-cn/unreal-engine/nne-denoiser-in-unreal-engine#%E8%BF%90%E8%A1%8C%E6%97%B6%E7%B1%BB%E5%9E%8B)
-   [CPU](/documentation/zh-cn/unreal-engine/nne-denoiser-in-unreal-engine#cpu)
-   [GPU](/documentation/zh-cn/unreal-engine/nne-denoiser-in-unreal-engine#gpu)
-   [RDG](/documentation/zh-cn/unreal-engine/nne-denoiser-in-unreal-engine#rdg)
-   [运行时名称重载](/documentation/zh-cn/unreal-engine/nne-denoiser-in-unreal-engine#%E8%BF%90%E8%A1%8C%E6%97%B6%E5%90%8D%E7%A7%B0%E9%87%8D%E8%BD%BD)
-   [自定义神经降噪器网络](/documentation/zh-cn/unreal-engine/nne-denoiser-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%A5%9E%E7%BB%8F%E9%99%8D%E5%99%AA%E5%99%A8%E7%BD%91%E7%BB%9C)
-   [模型](/documentation/zh-cn/unreal-engine/nne-denoiser-in-unreal-engine#%E6%A8%A1%E5%9E%8B)
-   [输入/输出映射](/documentation/zh-cn/unreal-engine/nne-denoiser-in-unreal-engine#%E8%BE%93%E5%85%A5/%E8%BE%93%E5%87%BA%E6%98%A0%E5%B0%84)
-   [资产](/documentation/zh-cn/unreal-engine/nne-denoiser-in-unreal-engine#%E8%B5%84%E4%BA%A7)