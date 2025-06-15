# 虚幻引擎中的IES光源描述文件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-ies-light-profiles-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:14:28.027Z

---

目录

![IES光源描述文件](https://dev.epicgames.com/community/api/documentation/image/c67abf65-1995-4b70-b9ea-4ed5c934fd33?resizing_type=fill&width=1920&height=335)

照明工程学会（IES）定义了一种文件格式，以使用真实世界测量数据描述光源的光照分布。此类IES光度文件或 **IES描述文件** 是一类照明行业标准方法，对特定真实照明灯具散发出光线亮度和光线衰减进行图解。其可使光照考虑灯具的反光表面、灯泡的形状以及发生的透镜效应。此类光度照明主要运用于企业领域（如媒体和娱乐或建筑和制造），但也常在游戏制作中用于获取逼真的光照效果。

IES光源描述文件是一种1D纹理（梯度）。但其实际并非纹理文件。曲线以弧形定义光强度，该弧形"扫过"轴，并根据提供的真实世界数据，使点光源、聚光源和矩形光源投射逼真光线。此曲线的工作原理与光总亮度的乘数类似，例如从光源投射纹理时，不会产生使用纹理的开销，也不会在某些角度发生错误。

在以下范例中，IES描述文件被指定到点光源，各面板左上角的图表显示给定IES描述文件的形状。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0807ab74-500c-41ba-a858-7a2a3f40a395/01-ies-light-profiles-examples.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0807ab74-500c-41ba-a858-7a2a3f40a395/01-ies-light-profiles-examples.png)

点击查看大图。

如在文本编辑器中打开IES描述文件，可发现其为包含各式元数据的ASCII文件，如Lithonia TE\_150S\_E17\_C范例所示：

```cpp
	IESNA:LM-63-2002
	[TEST] 11915
	[TESTDATE] 1/31/2008
	[ISSUEDATE] 1/24/2014
	[TESTLAB] ACUITY BRANDS LIGHTING CONYERS LAB
	[TESTMETHOD] IES LM-46:2004
	[MANUFAC] Lithonia Lighting
	[LUMCAT] TE 150S E17 C (SC=1.0)
	[LUMINAIRE] PREMIUM ENCLOSED HIGHBAY INDUSTRIAL WITH ALUMINUM REFLECTOR, CLEAR TEMPERED GLASS LENS, AND CONCENTRATING DISTRIBUTION
	[LAMPCAT] LU150
	[LAMP] ONE 150-WATT CLEAR ET-23.5 HIGH PRESSURE SODIUM, VERTICAL BASE-UP POSITION
	[BALLAST]
	[BALLASTCAT]
	[DISTRIBUTION] DIRECT, SC-0=1.05, SC-90=1.05
	[_LAMPPOSITION] 0 , 0
	[_LAMPTYPE] HIGH PRESSURE SODIUM
	[_LAMPWATTAGE] 150
	[_LAMPLUMENS] 16000
	[_MOUNTING] Suspended
	[_FAMILY] TE E17
	[_PRODUCTID] 69f8c24f-2e1c-4665-820d-92d61687bd9f
	[_INFOLINK] www.lithonia.com/visual/ies/ies.asp?vfile=
	[_PRODUCTGROUP] INDOOR HID
	[_TERCAT] Highbay, Nonlinear
	[_TER] 41
	TILT=NONE
	1  16000  1  11  1  1  1  -1.4  0  0
	1  1  189
	0  5  15  25  35  45  55  65  75  85  90
	0
	8461  8664  10082  7108  4474  1272  330  106  54  39  35
```

## 使用方法

按照以下步骤在中使用你的IES描述文件：

### 导入和指定到光源

1.  要导入IES描述文件，可使用可用[纹理导入方法](/documentation/zh-cn/unreal-engine/datasmith-import-options-in-unreal-engine)之一：使用 **新增（Add New）** 按钮，拖放操作，或使用右键菜单。
    
2.  选择场景中的[点光源](/documentation/zh-cn/unreal-engine/point-lights-in-unreal-engine)、[聚光源](/documentation/zh-cn/unreal-engine/spot-lights-in-unreal-engine)或[矩形光源](/documentation/zh-cn/unreal-engine/rectangular-area-lights-in-unreal-engine)。在 **细节** 面板中，将光源描述文件指定到 **光源描述文件（Light Profiles）** 下的 **IES纹理（IES Texture）** 插槽。
    
    ![Assigning the light profile to the IES Texture](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60b02b1b-56e7-429b-be9f-3d0b2e26c84c/02-ies-light-profiles-assigning-texture.png)

由于光源描述文件遮罩和低光照贴图分辨率，因此使用拥有预计算 **静态** 光照构建的光源描述文件可能会导致较差效果。提高接收表面的光照贴图分辨率或使用 **静止** 或 **可移动** 光源可获得最佳效果。

### 描述文件光源强度

也可选择使用IES描述文件的光源强度，而非光源本身的 **强度**：

![Setting up IES intensity options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56616d8d-d01e-4470-86c7-d3a2c7a0b218/03-ies-light-profiles-intensity-options.png)

-   **使用IES强度（Use IES Intensity）** 将使用描述文件中的光源亮度；禁用时，则会使用选定光源的强度值。
    
-   **IES强度比例（IES Intensity Scale）** 整体调整描述文件的亮度贡献。仅在启用 **使用IES强度（Use IES Intensity）** 时才可设置该数值。
    

### 纹理属性

打开IES描述文件时，[纹理编辑器](/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine)在 **纹理光源描述文件（Texture Light Profiles）** 下提供若干可供设置的选项：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b4d44ff-0081-42e8-878e-0e209bc2f69f/04-ies-light-profiles-texture-editor-properties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b4d44ff-0081-42e8-878e-0e209bc2f69f/04-ies-light-profiles-texture-editor-properties.png)

Click the image for full size.

属性

说明

**亮度（Brightness）**

从IES描述文件导入的光源亮度（以烛光计）。在光源上启用 **使用IES强度（Use IES Intensity）**，且该值小于等于0时，描述文件仅用于遮罩，导致光源完全被描述文件遮住。此外，该选项应与光源的 **平方反比衰减（Inverse Square Falloff）** 设置结合使用。

**纹理乘数（Texture Multiplier）**

此不可编辑值为乘数，用于将纹理值映射到整合为1.0f球体的结果。

### 3D光源描述文件可视化

选择已指定IES纹理的光源时，将显示可视化光源代表。

![未选中光源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c019b301-7f7e-421c-9648-b1a131d96adc/05-ies-light-profiles-visualization-1.png)

![选中光源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3722afa-a205-4352-929e-d09958d11610/06-ies-light-profiles-visualization-2.png)

未选中光源

选中光源

## 附加说明

### 性能

IES描述文件的渲染速度极快，不会对性能造成显著影响，因此相较于[光源函数](/documentation/zh-cn/unreal-engine/using-light-functions-in-unreal-engine)，其是塑造光源形态的理想选择。

### 聚光源

在任何点光源或矩形光源上使用IES描述文件时，会在视觉上将此类光源转化为聚光源，而在聚光源上使用此类光源则造成类似效果，唯一区别是聚光源锥体会遮住IES描述文件效果。但由于聚光源的投射区为179度弧形（最大角度），因此通过该点的IES数据将丢失。

![选中光源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ffdb90f-1db4-4768-ade7-4f2aa20ac933/07-ies-light-profiles-spot-light-visual-1.png)

![未选中光源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbd35df0-e0f5-41ae-897c-af41a73c4692/08-ies-light-profiles-spot-light-visual-2.png)

选中光源

未选中光源

在此比较中，IES描述文件朝所有方向发射光线。聚光源使用IES数据时，将以聚光源的 **锥体角度** 裁剪该数据。点光源使用IES数据时，不会裁剪IES描述文件。

### 获取和预览光源描述文件

由于几乎所有主流照明制造商均免费提供IES描述文件，因此最简单的获取方法便是访问制造商网站进行下载。以下为部分链接：

-   [Lithonia Lighting](https://lithonia.acuitybrands.com/photometricdownloads)
-   [Philips](http://www.usa.lighting.philips.com/support/support/literature/photometric-data)

要查看光源IES描述文件，可使用光度查看器，如免费可用的IESviewer。利用其可选择光源描述文件，显示描述文件并预览效果，以便之后决定是否导入到Unreal Engine中。

![IESviewer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7b64081-0741-4da0-8bd8-dbc9b1cb8e21/09-ies-light-profiles-iesviewer.png)

图像来源Andrey Legotin。

某些制造商网站（如Lithonia网站）拥有内置描述文件查看器，可在网页浏览器中使用，而无需下载描述文件进行预览。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [shadows](https://dev.epicgames.com/community/search?query=shadows)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用方法](/documentation/zh-cn/unreal-engine/using-ies-light-profiles-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
-   [导入和指定到光源](/documentation/zh-cn/unreal-engine/using-ies-light-profiles-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%92%8C%E6%8C%87%E5%AE%9A%E5%88%B0%E5%85%89%E6%BA%90)
-   [描述文件光源强度](/documentation/zh-cn/unreal-engine/using-ies-light-profiles-in-unreal-engine#%E6%8F%8F%E8%BF%B0%E6%96%87%E4%BB%B6%E5%85%89%E6%BA%90%E5%BC%BA%E5%BA%A6)
-   [纹理属性](/documentation/zh-cn/unreal-engine/using-ies-light-profiles-in-unreal-engine#%E7%BA%B9%E7%90%86%E5%B1%9E%E6%80%A7)
-   [3D光源描述文件可视化](/documentation/zh-cn/unreal-engine/using-ies-light-profiles-in-unreal-engine#3d%E5%85%89%E6%BA%90%E6%8F%8F%E8%BF%B0%E6%96%87%E4%BB%B6%E5%8F%AF%E8%A7%86%E5%8C%96)
-   [附加说明](/documentation/zh-cn/unreal-engine/using-ies-light-profiles-in-unreal-engine#%E9%99%84%E5%8A%A0%E8%AF%B4%E6%98%8E)
-   [性能](/documentation/zh-cn/unreal-engine/using-ies-light-profiles-in-unreal-engine#%E6%80%A7%E8%83%BD)
-   [聚光源](/documentation/zh-cn/unreal-engine/using-ies-light-profiles-in-unreal-engine#%E8%81%9A%E5%85%89%E6%BA%90)
-   [获取和预览光源描述文件](/documentation/zh-cn/unreal-engine/using-ies-light-profiles-in-unreal-engine#%E8%8E%B7%E5%8F%96%E5%92%8C%E9%A2%84%E8%A7%88%E5%85%89%E6%BA%90%E6%8F%8F%E8%BF%B0%E6%96%87%E4%BB%B6)