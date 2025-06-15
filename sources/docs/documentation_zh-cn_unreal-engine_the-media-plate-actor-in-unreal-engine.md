# 虚幻引擎中的媒体板Actor | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:24:13.000Z

---

目录

![媒体板Actor](https://dev.epicgames.com/community/api/documentation/image/82618f44-4b42-4e49-be23-5ea266823430?resizing_type=fill&width=1920&height=335)

虚幻引擎的 **媒体板Actor** 是一种预构建的Actor，你可以将其添加到自己的场景中，以播放视频、图像序列以及指向媒体框架支持的资产的URL。媒体板Actor是在场景中播放媒体源的最简便方法。你可以使用媒体板显示与虚拟摄像机同步的视频背景，这使其对于电影或广播行业的虚拟制片尤其重要。它对于添加游戏TV、屏幕或广告牌等需要动态播放不同媒体内容的情况非常有用。

![视口中显示了正在流送媒体的媒体板Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6931e6b3-5e1f-4e86-8944-476b1881dbf9/media_plate_actor.png)

媒体板Actor支持：

-   简化的视频导入流程
-   具有内置[球体和平面网格体](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%87%A0%E4%BD%95%E4%BD%93)的平铺EXR图像序列的优化流送。需要DX12或更高版本。
-   媒体播放列表
-   拖放资产和Actor
-   Sequencer集成
-   查看视锥体剔除

## 创建媒体板Actor

创建媒体板Actor的方法有很多。

你可以：

-   将媒体文件（视频文件或序列中的图像）直接拖入视口。
-   将\[媒体源资产\]（#导入媒体资源）从你的内容侧滑菜单拖动到视口中。
-   使用[放置Actor菜单](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)

## 导入媒体源

媒体板既支持多种媒体源资产，包括视频文件、图像序列，以及AJA媒体源、Black Magic媒体源、Rivermax媒体源，以及其他类似的采集卡媒体源。根据你所使用的媒体类型，可以使用不同的方法导入媒体源，并在虚幻编辑器中指示相关资产的引用路径。

这些方法都会立即创建媒体板Actor，然后你可以使用\[媒体板功能按钮\]（#媒体板设置）对其进行配置。

### 导入视频文件

要导入视频文件：

1.  打开 **内容侧滑菜单（Content Drawer）** 。
2.  将你的视频文件拖动到 **内容侧滑菜单（Content Drawer）** 中，并放置在该处。
3.  将该文件从 **内容侧滑菜单（Content Drawer）** 拖动到 **视口（Viewport）** 中。此操作会创建媒体板Actor。

![将视频文件拖动到内容侧滑菜单中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cb993aa-fb1b-43c3-89dd-d85615d2ed21/video_dragndrop-a.png)

### 导入媒体序列

要导入媒体序列：

1.  在 **内容侧滑菜单（Content Drawer）** 中，创建一个 **图像媒体源（Img Media Source）** 。
2.  在 **序列（Sequence）** > **序列路径（Sequence Path）** 下，为包含你的图像的文件夹指定路径。
3.  可选：在 **高级（Advanced）** > **帧率覆盖（Frame Rate Override）** 下，设置图像序列帧率。如果你不在此处指定任何值，媒体板Actor会使用你的全局设置下的默认帧率。
4.  将 **图像媒体源（Img Media Source）** 从 **内容侧滑菜单（Content Drawer）** 拖动到 **视口（Viewport）** 中。此操作会创建媒体板Actor。

### 导入采集卡媒体源

要导入包括AJA、Blackmagic和Rivermax在内的采集卡媒体源，请按以下步骤操作：

1.  打开 **内容侧滑菜单（Content Drawer）** 。
2.  新建并配置一个采集卡媒体资产。
3.  将采集卡媒体资产从内容侧滑菜单（Content Drawer）拖入 **视口（Viewport）** 中。此操作会创建媒体板Actor。

要使用采集卡媒体源，你必须要先安装并配置采集卡。关于使用采集卡的更多详情，请参阅[专业视频I/O](/documentation/zh-cn/unreal-engine/professional-video-io-in-unreal-engine)（适用于AJA和Blackmagic），以及[将SMPTE 2110用于nDisplay](/documentation/zh-cn/unreal-engine/using-smpte-2110-with-ndisplay)（适用于Rivermax）文档。

### 将媒体文件导入现有媒体板Actor

如果你已经创建媒体板Actor，可以直接从 **细节（Details）** 面板引用媒体文件。

要直接从媒体板Actor引用媒体文件，请执行以下步骤：

1.  在 **视口（Viewport）** 中选择 **媒体板Actor（Media Plate Actor）** 。
2.  在 **细节（Details）** 面板中，转至 **媒体板（Media Plate）** > **播放列表（Playlist）** 。
3.  将 **播放列表中的第一个项目（First Item in Playlist）** 设置为 **文件（File）** 。
4.  点击 **省略号（…）** 选择媒体文件并设置 **媒体路径（Media Path）** 。

![带有](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fadd9ff7-6593-41b6-af4c-805bfea63a65/set_media_path.png)

## 媒体板设置

在媒体板Actor设置中，你可以调整视频或图像序列的外观和播放。你不需要创建媒体纹理或媒体播放器。

媒体板具有以下设置

### 变换

在 **变换（Transform）** 分段，你可以调整媒体板Actor的位置、缩放和方向。要阅读有关这些设置的更多信息，请参阅[虚幻引擎中的变换Actor](/documentation/zh-cn/unreal-engine/transforming-actors-in-unreal-engine)。

### 功能按钮

属性

说明

打开时播放（Play on Open）

使视频或图像在打开时自动开始播放。

自动播放（Auto Play）

在你进入游戏模式时自动打开视频或图像序列。

启用音频（Enable Audio）

如果存在音轨，此设置会为激活的视频解码引擎启用音频。

开始时间（Start time）

你可以使用此属性设置自定义开始时间。此属性可以让使用相同源视频的不同媒体板Actor在不同的时间开始。然后，你可以在所在级别的多个实例中使用相同的可循环剪辑片段，每次都显示不同的内容。

尽可见时播放（Play Only when Visible）

对媒体板Actor应用视锥体剔除，从而让整个视频解码和流送在Actor位于视锥体外部时停止。此属性通常对具有nDisplay这样的群集渲染的大型安装有用。在你使用若干大型和资源密集型媒体板时尤其实用。

循环（Loop）

当视频到达最后一帧时自动循环播放。

### 几何体

你可以在此处选择是使用 **平面（Plane）** 、 **球体（Sphere）** 还是 **自定义（Custom）** 网格体。当你选择一种网格体时，引用的网格体会自动出现，并且该网格体类型的相关设置将可供你进行配置。

如果你使用的是平铺EXR图像序列，并且具有DX12或以上的图形能力，我们建议你选择 **平面（Plane）** 或 **球体（Sphere）** 网格体。这两种预构建网格体均使用媒体板Actor的优化流送，因此只会流送对摄像机可见的图块。自定义网格体将流送所有图块，无论图块是否对摄像机可见。如果你想将媒体转换为EXR格式，可以使用[处理EXR工具](/documentation/zh-cn/unreal-engine/convert-media-into-the-exr-format-with-the-process-exr-tool-in-unreal-engine)。

### 播放列表

当你添加视频或图像序列时，虚幻编辑器会自动创建 **媒体播放列表** 来容纳视频资产引用，该列表可在媒体播放列表（Media Playlist）分段中看到。该分段还会显示对初始媒体源以及媒体路径的引用。

该分段还包含可点击的图标，你可以使用这些图标来 **重启（Restart）** 、 **倒回（Rewind）** 、 **播放（Play）** 、 **暂停（Pause）** 、 **快进（Fast Forward）** 、 **打开（Open）** 和 **关闭（Close）** 播放列表。

**打开媒体板（Open Media Plate）** 按钮用于打开一个媒体板窗口，其中面向平面的网格体会向你显示有关媒体的深度信息。在该窗口中，你还可以使用 **上一个** 和 **下一个** 图标访问你的播放列表中的其他媒体。

### 媒体细节

**媒体细节（Media Details）** 分段包括媒体的分辨率、帧率、大小、方法、格式、合并细节级别偏差及其mip和图块数量的细节。

### 媒体纹理

属性

说明

启用实时Mip（Enable RealTime Mips）

如果为true，媒体纹理会为每个视频帧生成Mip贴图链。启用后，媒体板四边形内可见的视频帧将更为平滑，且不会有锯齿瑕疵。

Mip数量（Mips Quantity）

设置实时生成的Mip贴图级别。

### 材质

**材质（Materials）** 分段让你可以选择另一种材质来覆盖现有的默认媒体板材质。默认材质是在自发光通道中渲染像素的半透明和非光照材质。该材质捆绑在 **媒体板插件内容目录** 内。

要为媒体板Actor选取其他材质，请执行以下操作：

1.  选择媒体板Actor。
2.  在 **细节（Details）** 面板中，点击 **渲染（Rendering）** 筛选器，弹出 **材质（Materials）** 分段。
3.  在 **材质（Materials）** 分段中，点击 **选择媒体板材质（Select Media Plate Material）** 下拉菜单并选择新材质。

![细节面板的截图。高亮显示了](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19b6dbdc-c634-41cf-99d5-78577698f13c/select_material.png)

媒体板Actor会寻找一个叫做 **MediaTexture** 的特殊 **纹理** 参数。此参数必须存在于选定的材质内，以便它可以绑定和访问从视频解码器 **MediaTexture** 接收到的像素。

媒体板自带以下默认材质：

对于2D板：

材质名称

说明

M\_MediaPlate

是半透明材质。这是默认选择。如果你远离半透明材质，可能会遭遇TSR重影瑕疵。

M\_MediaPlateCC

色彩校正材料。

对于天空：

材质名称

说明

M\_Sky

不透明，启用 `IsSky` 布尔值。

M\_SkyCC

天空的色彩校正材质。

### EXR图块和贴图

属性

说明

可见Mip图块计数（Visible Mips Tiles Calculations）

默认情况下，此设置与你选择的静态网格体匹配。如果你想使用平面（Plane）或球体（Sphere），但不希望媒体板只流送对摄像机可见的像素，则可以将此属性设置为 **无（None）** 。此设置可能对调试有帮助，但我们建议你不要将其用于产品。

Mip贴图偏差（Mip Map Bias）

偏移所请求的mipmap级别以调整性能。有时，由于带宽的原因，PC无法播放某个EXR序列，即使将该序列拆分成图块和mip也无法实现。为减少输入/输出（IO）带宽，可以向任一方向偏移媒体板Actor，以加载分辨率较低的更高级别mip。默认情况下，预估的Mip贴图级别与渲染器相匹配，这使得它依赖于视野（FOV）和分辨率。

启用Mip贴图分辨率修改（Enable Mip Map Upscaling）

如果为true，此选项将强制对 **修改分辨率的Mip级别（Upscale Mip Level）** 设置中设定的所选Mip贴图级别修改分辨率。正常情况下，媒体板只在视口中加载所需的质量mip和图块。但在反射和天空光照等情况下，你可能必须为EXR纹理区域在视口之外加载较低质量的图块，因为尽管这些区域对摄像机并非直接可见，但它们对光照和反射依然有所作用。

分辨率修改的Mip级别（Upscale Mip Level）

**启用Mip贴图分辨率修改（Enable Mip Map Upscaling）** 设置所启用的Mip贴图级别。例如，如果此属性设置为3，则Mip贴图级别为3或更高的纹理将被完全读入纹理中。Mip贴图级别为2或更低的纹理会使用Mip贴图级别3的纹理，但分辨率修改为实际Mip贴图级别对应纹理的尺寸。录制时，摄像机可见区域包含恰当质量的mip，而摄像机不直接可见的一切包含已修改分辨率的更低质量mip。

当 **可见图块和Mip逻辑（Visible Tiles & Mips Logic）** 设为 **球体（Sphere）** 时，本分段将包含另一个属性：

属性

说明

自适应极点Mip分辨率修改（Adaptive Pole Mip Upscale）

降低球体两极的质量，从而减轻负载。仅当使用球体网格体时可用。使用球体网格体时，图块会在球体两极附近挤在一起。如果你有很大的 `.exr` 文件（16k），系统就需要加载更多图块。使用此选项，系统会决定是否应该加载更高级别的mip（更低质量）来减轻负载。

### 缓存

属性

说明

重载（Override）

降低球体两极的质量，从而减轻负载。仅当使用球体网格体时可用。使用球体网格体时，图块会在球体两极附近挤在一起。如果你有很大的 `.exr` 文件（16k），系统就需要加载更多图块。使用此选项，系统会决定是否应该加载更高级别的mip（更低质量）来减轻负载。

预读（Look Ahead）

缓存的预读时间，以秒为单位。为了获得充分的缓存，我们建议设置为2-4帧。在24fps下，2帧应该需要0.084秒。本项设置的默认值为0.2秒。你缓存的帧越多，摄像机移动时需要作废和重新加载的帧就越多。

### 高级设置

属性

说明

音频组件（Audio Component）

包含所用音频组件的细节。

静态网格体组件（Static Mesh Component）

包含所用网格体组件的高级细节和属性。

其他 > 黑边（Other > Letterboxes）

包含所用黑边的细节。

## 覆层材质技术

为解决播放过程中出现的时间和抗锯齿瑕疵问题，覆层材质能让媒体板Actor在自身的复合通道中渲染视频帧。Actor将无抖动地进入动态模糊后的半透明渲染目标，并在时间超级分辨率（TSR）过程后还原为场景色彩。你可以使用 **r.Translucency.SeparateResolution.Basis** 为覆层材质设置正确的最终（经分辨率调整）分辨率。

由于覆层材质技术使用半透明渲染目标，因此它只对无半透明效果的视频有效。

要应用覆层材质，请执行以下步骤：

1.  在关卡内[创建媒体板Actor](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%AA%92%E4%BD%93%E6%9D%BFactor)。
2.  进入关卡编辑器，右键点击媒体板Actor并点击 **应用覆层复合材质（Apply Overlay Composite Materials）** 。这将替换基础材质、加入覆层材质，并启用半透明变量。

![应用覆层复合材质并重置默认材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23161f71-38b9-4c7e-9a6b-df7db18520c9/apply-composite-material.png)

要从媒体板Actor中移除覆层复合材质，点击重置默认材质（Reset Default Materials）即可。

## Sequencer集成

**Sequencer** 集成对于精确控制视频或图像序列剪辑片段的开始、结束或循环时间具有重要意义。你也可以使用它来确保所有剪辑片段帧锁定到确切的Sequencer时间，从而让你能够通过整体级别动画和逻辑精细控制序列。

要将你的媒体板Actor添加到Sequencer：

-   将 **Actor** 从 **世界大纲视图（World Outliner）** 中拖出，并放入你的 **Sequencer轨道（Sequencer Track）** 。

![将Actor放入Sequencer轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/604e2677-4b37-4a10-9907-0005664739aa/drop_actor_sequencer.png)

要想在Sequencer中正常同步，你必须在媒体板功能按钮中禁用音频（通用设置（General Settings） > 取消选中"启用音频"（Enable Audio）），或在使用Electra媒体播放器的手动创建蓝图中禁用音频。

### 剪辑片段之间的交叉过渡

使用Sequencer时，你可以将交叉过渡应用于两个媒体轨道：

1.  [设置媒体板材质](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E6%9D%90%E8%B4%A8)为 **M\_MediaPlateCrossFade** 。
2.  在 **细节（Details）** 面板的 **材质（Materials）** 下，点击 **创建动态材质（Create Dynamic Material）** 。这需要虚拟制片工具插件。
3.  要打开Sequencer，在主菜单栏中转至 **窗口（Window）** > **过场动画（Cinematics）** > **Sequencer** 。如果Sequencer为空白，你需要[创建关卡序列](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)。
4.  从 **大纲视图（Outliner）** 面板，点击 **媒体板Actor（Media Plate Actor）** 并拖入 **Sequencer** 面板，创建 **媒体轨道（Media Track）** 。 a. 在弹出窗口中，点击 **是（Yes）** 禁用自动播放。
5.  重复第4步，创建第二个媒体轨道。

创建两个媒体轨道后，你可以合并这些轨道来自动创建交叉过渡，或在单独的轨道上手动创建交叉过渡。

#### 自动创建交叉过渡

1.  将新创建的轨道拖入第一个轨道。
2.  拖动一个轨道，使其与另一个轨道重叠。Sequencer将自动计算交叉过渡值。
    
    ![Sequencer的截图，显示正在拖动以与轨道B重叠的轨道A。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd10fccf-c4ec-4ed6-b1ff-1d0e704e533e/crossfade_auto.png)

#### 手动创建交叉过渡

1.  按 **Ctrl** 键显示轨道上的箭头。
2.  右键点击并拖动箭头，为第一个轨道定义渐入和淡出曲线。
    
    ![Sequencer的截图，高亮显示了可以用于定义曲线的两个轨道中第一个轨道上的箭头。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65d09ebc-f429-4025-a155-c9eccf836a9f/crossfade_manual_track1.png)
3.  为第二个轨道重复第2步。
    
    ![Sequencer的截图，高亮显示了第二个轨道上的箭头。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/769fa71b-b243-4e51-92ae-9f35ccef3161/crossfade_manual_track2.png)

## 注意事项和局限性

当你使用媒体板Actor时，请留意以下注意事项和局限性：

-   **媒体播放器** ：只有Electra和IMGMedia播放器支持同步。默认情况下，引擎会选择它找到的第一个播放器。要保证同步播放，你可以在 **FileMediaSource** > **播放器覆盖（Player Overrides）** > **窗口（Windows）** > **Electra播放器(ElectraPlayer)** 内进行选择，手动强制将Electra设为你的播放器。
-   **同步锁定**：如果你使用的是nDisplay群集设置，并希望优化图像播放帧精度，你可以使用称为[同步锁定固定速率](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%90%8C%E6%AD%A5%E9%94%81%E5%AE%9A%E5%9B%BA%E5%AE%9A%E9%80%9F%E7%8E%87)的自定义时点。
-   实时天景和反射：如果要使用视口外的Mip（多级渐进纹理）和平铺来实现实时天景和反射，则必须使用\[anchor link upscalehigherlevelmip\]控制台变量。

### 同步锁定固定速率

要实现同步锁定固定速率时点，请按照以下步骤操作：

1.  在 **内容浏览器** 中，单击 **添加 (+)** > **媒体** ，新建 **媒体资料** 。
2.  在 **媒体源** > **索引 \[0\]** 下，选择 **文件媒体源** 。
3.  勾选 **覆盖项目设置** 。
4.  点击 **同步锁定** > **自定义时点** > **同步锁定固定速率** 。
5.  取消勾选 **应阻止** 。
    
    ![同步锁定设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03b7c3f9-4855-4e2f-a0de-67ed29fb7677/genlock_fixed_rate.png)
6.  保存媒体配置文件，但不要在将编辑器机器上加载。此媒体配置文件仅适用于nDisplay节点。
7.  创建媒体配置文件后，需要将其部署到nDisplay节点。在 **交换板** 设置菜单中，点击 **媒体配置文件** 下拉菜单，然后选择媒体配置文件。
    1.  你还可以使用每个节点设置中的 **媒体配置文件** 下拉菜单，为每个节点单独设置媒体配置文件。

## 实用的控制台变量

-   **ImgMedia.FieldOfViewMultiplier：** (`ImgMedia.FieldOfViewMultiplier=1`)
    
    由于媒体板只加载当前视图可见的图块，在某些情况下，快速平移镜头可能会导致边缘周围的图块暂时缺失。这个控制台变量让你可以增加在视图边缘加载的图块数量。
    
-   **ImgMedia.MipMapLevelPadding：** (`ImgMedia.MipMapLevelPadding=0`)
    
    如果mipmap估值与渲染器的匹配精度不足，则将此值填充到计算的最小和最大mipmap级别。这会让加载的图块数量增加，但有助于在出现异常时消除瑕疵。
    
-   **Concert.EnableLoopingOnPlayer：** (`Concert.EnableLoopingOnPlayer=1`)（默认值）
    
    默认情况下，多用户序列管理器可确保在Sequencer播放器上启用了循环时媒体播放循环执行。在5.1版之前，多用户不会在nDisplay序列播放器上启用循环，循环的处理将通过使用Sequencer重置播放头来实现。这可以让播放头与ICVFX墙上的内容保持同步。如果你更希望在编辑器和nDisplay群集之间同步播放头，请将此值设置为0。
    
-   **r.EXRReaderGPU.UpscaleHigherLevelMip：** (`r.EXRReaderGPU.UpscaleHigherLevelMip=-1`)
    
    正常情况下，媒体板只在视口中加载所需的质量mip和图块。但在反射和天空光照等某些情况下，你可能需要为未填充数据的EXR纹理区域在视口之外加载较低质量的图块，以使它们对光照和反射有所助益。
    
    例如，如果你将此控制台变量设置为mip级别3，则mip级别3将完全读取、加载并将分辨率修改成mip 0、1、2。3及以上（4、5、6等）mip级别将完全读入纹理。录制时，摄像机可见区域包含正常质量mip，而所有激活视图不直接可见的区域则包含较低质量mip。
    

## 调试

你可以使用以下统计命令来调试媒体板Actor：

-   **媒体统计信息（Stat Media）** ：显示有关正在播放的当前媒体的信息。
-   **ImgMedia.MipMapDebug 1** ：在游戏模式下，将可见的图块和mip调试信息输出到屏幕上。只能用于 `.exr` 媒体格式的文件。
-   **记录冗长LogImgMedia日志（Log LogImgMedia Verbose）** ：启用ImgMedia专属的冗长日志数据。

-   [media plate](https://dev.epicgames.com/community/search?query=media%20plate)
-   [streaming media](https://dev.epicgames.com/community/search?query=streaming%20media)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建媒体板Actor](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%AA%92%E4%BD%93%E6%9D%BFactor)
-   [导入媒体源](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%AA%92%E4%BD%93%E6%BA%90)
-   [导入视频文件](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%AF%BC%E5%85%A5%E8%A7%86%E9%A2%91%E6%96%87%E4%BB%B6)
-   [导入媒体序列](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%AA%92%E4%BD%93%E5%BA%8F%E5%88%97)
-   [导入采集卡媒体源](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%AF%BC%E5%85%A5%E9%87%87%E9%9B%86%E5%8D%A1%E5%AA%92%E4%BD%93%E6%BA%90)
-   [将媒体文件导入现有媒体板Actor](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%B0%86%E5%AA%92%E4%BD%93%E6%96%87%E4%BB%B6%E5%AF%BC%E5%85%A5%E7%8E%B0%E6%9C%89%E5%AA%92%E4%BD%93%E6%9D%BFactor)
-   [媒体板设置](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%AA%92%E4%BD%93%E6%9D%BF%E8%AE%BE%E7%BD%AE)
-   [变换](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%8F%98%E6%8D%A2)
-   [功能按钮](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [几何体](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%87%A0%E4%BD%95%E4%BD%93)
-   [播放列表](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E6%92%AD%E6%94%BE%E5%88%97%E8%A1%A8)
-   [媒体细节](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%AA%92%E4%BD%93%E7%BB%86%E8%8A%82)
-   [媒体纹理](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%AA%92%E4%BD%93%E7%BA%B9%E7%90%86)
-   [材质](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E6%9D%90%E8%B4%A8)
-   [EXR图块和贴图](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#exr%E5%9B%BE%E5%9D%97%E5%92%8C%E8%B4%B4%E5%9B%BE)
-   [缓存](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E7%BC%93%E5%AD%98)
-   [高级设置](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E9%AB%98%E7%BA%A7%E8%AE%BE%E7%BD%AE)
-   [覆层材质技术](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E8%A6%86%E5%B1%82%E6%9D%90%E8%B4%A8%E6%8A%80%E6%9C%AF)
-   [Sequencer集成](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#sequencer%E9%9B%86%E6%88%90)
-   [剪辑片段之间的交叉过渡](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%89%AA%E8%BE%91%E7%89%87%E6%AE%B5%E4%B9%8B%E9%97%B4%E7%9A%84%E4%BA%A4%E5%8F%89%E8%BF%87%E6%B8%A1)
-   [自动创建交叉过渡](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E8%87%AA%E5%8A%A8%E5%88%9B%E5%BB%BA%E4%BA%A4%E5%8F%89%E8%BF%87%E6%B8%A1)
-   [手动创建交叉过渡](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E6%89%8B%E5%8A%A8%E5%88%9B%E5%BB%BA%E4%BA%A4%E5%8F%89%E8%BF%87%E6%B8%A1)
-   [注意事项和局限性](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9%E5%92%8C%E5%B1%80%E9%99%90%E6%80%A7)
-   [同步锁定固定速率](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%90%8C%E6%AD%A5%E9%94%81%E5%AE%9A%E5%9B%BA%E5%AE%9A%E9%80%9F%E7%8E%87)
-   [实用的控制台变量](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E5%AE%9E%E7%94%A8%E7%9A%84%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F)
-   [调试](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E8%B0%83%E8%AF%95)