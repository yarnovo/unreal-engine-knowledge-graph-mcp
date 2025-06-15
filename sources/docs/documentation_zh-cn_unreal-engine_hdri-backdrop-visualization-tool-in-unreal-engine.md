# 虚幻引擎中的HDRI背景可视化工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:15:57.045Z

---

目录

![HDRI背景可视化工具](https://dev.epicgames.com/community/api/documentation/image/a0c40565-5c60-46c4-9f57-4bc5200c9e8a?resizing_type=fill&width=1920&height=335)

通常将高动态范围（HDR）图像用作背景，能在视觉丰富的情境下最为有效的展示模型。将HDR图像用作产品可视化背景的关键优势在于设置相对较快、可自定义，同时能获得精美的光照和反射。但仅将HDR图像用作背景还不够。为实现合理效果，在HDR图像环境中需用假的背景平面捕捉阴影，当物体被照亮时，阴影将投射到此假平面，从而在可视化放置物体和背景之间创造一致性。

利用 **HDRI背景** Actor 可完成所有此类操作，改善产品可视化工作流程。其自动处理以下操作：

-   背景网格体（如穹顶或自定义几何体）
-   来自动态天空光照的环境照明
-   动态反射
-   使用阴影捕捉投射到地面

## 启用HDRI背景

在使用此资产前，需要先为项目启用 **HDRI背景** 插件。

1.  在虚幻编辑器中打开项目。
    
2.  在 **主** 菜单面板中点击 **编辑**，并选择 **插件**。
    
3.  在 **渲染** 目录下找到 **HDRI背景** 插件并勾选 **启用**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f19fa01-e67a-4a39-b41a-d0bc63b29fb2/01-hdri-enable-plugin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f19fa01-e67a-4a39-b41a-d0bc63b29fb2/01-hdri-enable-plugin.png)
    
    点击查看大图。
    
4.  点击 **立即重启** 重启项目并应用更改。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6f29f6a-58df-46b5-a305-6be8a79fcab9/02-hdri-restart-ue.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6f29f6a-58df-46b5-a305-6be8a79fcab9/02-hdri-restart-ue.png)
    
    点击查看大图。
    

## 工作流

1.  将使用经纬度的球形HDR图像导入 **内容浏览器**。可使用导入按钮 、右键点击快捷菜单或拖放 方法进行导入。
    
    导入后，确保在纹理编辑器中设置合适的HDR图像 **最大纹理尺寸（Maximum Texture Size）** 和 **Mip生成设置（Mip Gen Settings）**。欲了解更多信息，参见本页的[HDR图像设置](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine#hdr%E5%9B%BE%E5%83%8F%E8%AE%BE%E7%BD%AE)章节。
    
    使用[HDRI Haven](https://hdrihaven.com)站点免费下载一些有趣的HDR图像，或使用适用于于HDRI背景Actor的一些图像。使用内容浏览器的 **查看选项（View Options）** 启用 **显示引擎内容（Show Engine Content）** 和 **显示插件内容（Show Plugin Content）** 以显示可用的 **立方体贴图** 资产。引擎默认包含部分资产，存储在 `DatasmithContent Content/Textures` 文件夹中。
    
2.  点击 **主** 菜单面板中的 **文件（File）** 菜单，选择 **新建关卡（New Level）**。然后，在 **新建关卡（New Level）** 窗口中，选择 **空白关卡（Empty Level）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20b9d90c-333f-4be7-b2e8-e9f59503b906/03-hdri-new-empty-level.png)
3.  在 **放置Actor（Place Actors）** 面板的 **照明（Lights）** 下，点击并将 **HDRI背景（HDRI Backdrop）** 资产拖入 **关卡视口**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/add545c9-3860-4c21-a920-c816926415a9/04-hdri-drag-into-level.png)
4.  选中关卡中的HDRI背景资产，使用 **细节** 面板设置以下各项：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5f06096-c531-4584-bdc0-544405b49be6/05-hdri-initial-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5f06096-c531-4584-bdc0-544405b49be6/05-hdri-initial-settings.png)
    
    点击查看大图。
    
    1.  **立方体贴图（Cubemap）：**在可用选项中选取立方体贴图，然后将其从 **内容浏览器** 中拖到此插槽上。
        
        使用无法在穹顶或球形网格体（如仓库或箱式空间）上正常显示的立方体贴图时，需使用 **网格体** 指定参数选择合适的网格体。
        
    2.  **大小（Size）：**调整此值设置网格体（HDR图像投射到之上）的大小。
        
    3.  **投射中心（Projection Center）：**选择3D小工具移动投射中心，以便与摄像机位置匹配，并根据需要进行调整，减少背景上HDR图像的偏斜和拉伸。
        
    
    欲了解此类及其他可调整设置的详细信息，参见本页的[HDRI背景设置](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine#hdri%E8%83%8C%E6%99%AF%E8%AE%BE%E7%BD%AE)章节。
    
5.  如要在可视化中使用动态阴影，还可选择添加 **光源** 并将其设为 **可移动（Movable）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/616868bb-215f-4d5e-8344-93b67a2b1282/06-hdri-add-directional-light.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/616868bb-215f-4d5e-8344-93b67a2b1282/06-hdri-add-directional-light.png)
    
    点击查看大图。
    

### HDR图像设置

将HDR图像导入为虚幻资产时，HDRI背景Actor不会对其进行修改。首先需在[纹理编辑器](/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine)中手动应用若干设置：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f0e989f-3d3c-4cbd-9202-53da998a43b7/07-hdri-texture-editor-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f0e989f-3d3c-4cbd-9202-53da998a43b7/07-hdri-texture-editor-settings.png)

点击查看大图。

1.  该HDR图像的 **已导入**、**已显示** 和 **游戏最大** 分辨率。
    
2.  应将 **Mip生成设置（Mip Gen Settings）** 设为 **NoMipmaps** 以使用完全品质。
    
3.  **最大纹理尺寸（Maximum Texture Size）** 应与已导入HDR图像的较大分辨率值匹配——在本例中为4096。
    

如不更改此类值，HDR图像可能无法正确显示。其分辨率较低，图像较为模糊。

### HDR图像背景网格体设置

并非所有HDR图像创建时都相同，可能需要各自自定义几何体以便投射。除了HDR图像外，还在编辑器中提供多个可供选择的背景网格体。

首先须使用 **设置（Settings）** 启用 **显示引擎内容（Show Engine Content）** 和 **显示插件内容（Show Plugin Content）**，才能在资产选择下拉窗口中看到可用的静态网格体。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d96fc15-cf5e-4518-8964-8c4513de99ba/08-hdri-content-browser-section.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d96fc15-cf5e-4518-8964-8c4513de99ba/08-hdri-content-browser-section.png)

点击查看大图。

使用 **网格体** 旁的资产选择框来选择将HDR图像投射之上的环境网格体。其可为任意静态网格体，如创建的自定义几何体，或引擎提供的三个几何体之一。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e76bcf5f-856b-4e02-a6f2-aae7cbd00138/09-hdri-mesh-selecting.png)

背景网格体

网格体

描述

**EnviroDome**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cabafa84-586b-41c7-b400-f8e61931b68d/10-hdri-sky-dome.png)

拥有地面平面的穹顶网格体，是大型外部环境HDR图像的理想选择。

**EnviroBoxSharp**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/462c76a3-5cea-434d-b76e-e317b9406e10/11-hdri-enviro-box-sharp.png)

拥有毛边的箱体环境，是室内环境的理想选择，例如仓库或定义好墙壁的空间。

**EnviroBox**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfc05096-b227-4580-ae5b-6006316f5b95/12-hdri-enviro-box.png)

拥有平滑边缘的箱体环境，是工作室环境的理想选择，通常适用于如有单色背景布的环境。

以下为引擎中各网格体背景的范例展示：

 

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cef00e94-2a8c-4aa4-afc7-db8a05af55a9/13-hdri-scene-sky-dome.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07fd3284-4e7c-476f-87ae-ddd21f539b32/14-hdri-scene-box-sharp.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1958cc0f-78cd-4796-9ca2-4decba36f64d/15-hdri-scene-box-smooth.png)

默认EnviroDome

EnviroBoxSharp

EnviroBox

## HDRI背景设置

在关卡中选中HDRI背景资产后，可在该资产的 **细节（Details）** 面板中设置、启用和调整以下设置：

属性

描述

**立方体贴图（Cubemap）**

指定将投射到地面和背景的已导入HDR图像，内置天空光源将使用此图像。

**强度（Intensity）**

设置嵌入天空光照的强度及背景HDR图像的自发光程度。值越大，在HDR图像中采样的环境光照越亮（cd/m2）。

注意：天空光照或自发光材质等物理照明单位的测量单位为cd/m2。太阳和天空光源的范围高达数千单位，这与物理摄像机的关系密切，该摄像机的曝光值（EV）范围是EV100:14（请参阅"Sunny 16"定理）。拥有HDRI背景资产时，无需使用正确物理值，但可能需将EV设为远低于EV100:14的值。还需注意的是某些HDR图像范围为0-5.0或大于5 cd/m2，而其他图像的范围为0-100K单位。这意味在切换HDR图像时，会有明显的亮度变化。

**大小（Size）**

设置用于投射HDR图像的网格体大小（以米计）。其控制背景网格体的直径，应根据所用HDR图像、水平高度和场景中内容进行调整。对于多数室外场景而言，典型大小应约为100米。

**投射中心（Projection Center）**

定义HDR图像的投射点。

**光照距离系数（Lighting Distance Factor）**

指定将受光照和阴影影响的地面区域。光照区域将拥有稍微不同的着色，具体取决于强度和场景中的其他光照参数。此设置将使光照区域范围围绕摄像机平滑混合，从而减少与背景HDR投射的着色差异。

**使用摄像机投射（Use Camera Projection）**

禁用地面追踪，并启用HDR图像以跟踪摄像机。

**网格体（Mesh）**

指定自定义静态网格体对象以用作背景，HDR图像投射自该背景。

### 投射中心

应将背景上的HDR图像投射中心设为与用于捕捉图像的摄像机高度匹配。

选择3D小工具来定义3D空间中的投射中心位置：

也可在变换文本框中手动输入此类数值（建议使用 **视口** 中的3D小工具以获得最为顺滑的交互）：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57e10d9b-b1bc-4ae0-b790-386b8a26d5c8/16-hdri-project-centr-setting.png)

-   Z（高度）应约为90厘米（cm），此为用于捕捉HDR图像的摄像机三脚架平均高度。由于高度取决于用于捕捉图像的摄像机高度，因此可使用不同值。
-   利用X和Y可偏移投射原点。多数情况下，不应更改该值。

### 光照距离系数

可向场景添加自己的光照和调整参数；但有时光照和阴影强度与背景有差异。利用 **光照距离系数** 可定义摄像机周围的地面区域，以混合场景光照和阴影来减小此类差异。

![光照距离系数：0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ee47a6e-98d6-4bc1-9342-cf87f99c7d24/17-hdri-lighting-dist-factor-0.png)

![光照距离系数：0.5（默认）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/582f6abd-2421-4b4f-81ef-f6a8cffafbad/18-hdri-lighting-dist-factor-1.png)

光照距离系数：0

光照距离系数：0.5（默认）

**光照距离系数** 值为穹顶 **大小** 值的百分比。典型值约为0.5或稍高的数值。如使用不当将导致瑕疵。设置过高时，背景边缘将出现水平线，较低值有助于解决此类瑕疵。

背景上无需合成阴影和环境光遮蔽（AO）时，可将该值设为0。

## 附加说明

以下是部分使用HDRI背景资产时的额外注意事项和建议：

-   **与天空光照Actor互动**
    
    将HDRI背景添加到场景时，将创建作为子组件的动态[天空光照](/documentation/zh-cn/unreal-engine/sky-lights-in-unreal-engine)。如有常规天空光照，应将其删除。否则，场景将包含多个天空光照，影响性能、质量和场景中的理想效果。
    
-   **HDR图像拉伸**
    
    为确保在最小拉伸下达到最佳效果，放置摄像机时应使其朝向投射原点周围。调整[投射中心](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine#%E6%8A%95%E5%B0%84%E4%B8%AD%E5%BF%83)可减少拉伸，便于相对缩放。
    
-   **光线追踪功能**
    
    HDRI背景适用于虚幻引擎的所有光源类型及支持的[硬件光线追踪](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-in-unreal-engine)功能。HDRI背景蓝图默认包含启用 **投射光线追踪阴影** 的天空光照组件，此为利用光线追踪进行正确的基于图像光照（IBL）的先决条件。
    
    此外还需谨记，向场景添加功能时可在后期处理体积中启用和设置额外光线追踪功能。可控制环境光遮蔽、全局光照、半透明和反射。
    
-   **强度、HDR内容和曝光**
    
    HDR图像由天空光照输入和驱动。HDR图像的内容会对场景亮度产生极大影响。无论HDR图像内容为何，HDRI背景资产均不会在其中执行像素值规范化来提供\_稳定\_强度。这意味在切换不同HDR图像时，由于无法自动处理，因此需调整此强度。但可能会在未来版本中新增此功能。
    
-   **高精度法线**
    
    修改此G Buffer格式选项将以每通道16位对 `默认` 格式进行编码。它能在平滑的高模上形成高精度反射。使用默认格式时，这些平滑的反射表面上可能出现波纹反射瑕疵。
    
    在 **项目设置（Project Settings）** > **渲染（Rendering）> 优化（Optimizations）** 中，在 **GBuffer格式（GBuffer Format）** 下拉菜单中选择 **高精度法线（High Precision Normals）**。
    
    ![高精度法线：已禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a83da436-7903-4a19-ae06-d8c3b3065e50/19-hdri-high-precision-normal-0.png)
    
    ![高精度法线：已启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3400f40b-b23f-4fd9-aeea-e2a3541dd520/20-hdri-high-precision-normal-1.png)
    
    高精度法线：已禁用
    
    高精度法线：已启用
    
-   **反射采集分辨率**
    
    修改此值即可将高精度反射从立方体贴图和HDR图像投射到场景中的天幕和反射采集actor上。
    
    在 **项目设置（Project Settings)** > **渲染（Rendering）> 集分辨率（Reflection Capture Resolution）** 值（须为2的幂次方）。此分辨率将自动应用到场景中放置的所有反射采集。可将 **天空光照** 的值设为希望使用的最大分辨率。
    
    ![反射采集分辨率：128（默认）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffc506ad-15b6-479b-93d9-a700b971d931/21-hdri-refl-capture-resolution-128.png)
    
    ![反射采集分辨率：1024](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45edd60b-49ad-4bce-b8a2-c6c75f90ef67/22-hdri-refl-capture-resolution-1024.png)
    
    反射采集分辨率：128（默认）
    
    反射采集分辨率：1024
    

## 其他资源

-   NASA的Juno 3D模型，由"[NASA 3D资产](https://nasa3d.arc.nasa.gov/detail/eoss-juno)"提供。
-   HDR图像，由"[HDRI Haven](https://hdrihaven.com)"提供。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [artist tool](https://dev.epicgames.com/community/search?query=artist%20tool)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [visualization](https://dev.epicgames.com/community/search?query=visualization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用HDRI背景](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine#%E5%90%AF%E7%94%A8hdri%E8%83%8C%E6%99%AF)
-   [工作流](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81)
-   [HDR图像设置](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine#hdr%E5%9B%BE%E5%83%8F%E8%AE%BE%E7%BD%AE)
-   [HDR图像背景网格体设置](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine#hdr%E5%9B%BE%E5%83%8F%E8%83%8C%E6%99%AF%E7%BD%91%E6%A0%BC%E4%BD%93%E8%AE%BE%E7%BD%AE)
-   [HDRI背景设置](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine#hdri%E8%83%8C%E6%99%AF%E8%AE%BE%E7%BD%AE)
-   [投射中心](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine#%E6%8A%95%E5%B0%84%E4%B8%AD%E5%BF%83)
-   [光照距离系数](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine#%E5%85%89%E7%85%A7%E8%B7%9D%E7%A6%BB%E7%B3%BB%E6%95%B0)
-   [附加说明](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine#%E9%99%84%E5%8A%A0%E8%AF%B4%E6%98%8E)
-   [其他资源](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine#%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)