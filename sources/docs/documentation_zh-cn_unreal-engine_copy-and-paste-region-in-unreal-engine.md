# 虚幻引擎中的复制与粘贴区域 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/copy-and-paste-region-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:12:23.623Z

---

目录

![复制与粘贴区域](https://dev.epicgames.com/community/api/documentation/image/d80b4db2-df15-4ddf-8b25-23805aae26dc?resizing_type=fill&width=1920&height=335)

**复制/粘贴（Copy/Paste）** 工具可通过地形小工具将高度数据从地形的一个区域复制到另一个区域。 也可导入能够粘贴到地形中的现有高度图，或将高度数据的选择区域作为其自身的高度图（.raw 文件）导出， 以便在第三方软件中使用。

## 使用复制/粘贴工具

在此展示中，可手动对小工具进行缩放，以复制一个区域并将其粘贴到另一个位置中。而区域选择（Region Selection）则用于绘制小工具可自动进行缩放匹配的区域， 使其能被复制粘贴到另一个位置。

### 复制/粘贴小工具

小工具（Gizmo）用于捕捉地形的高度数据，然后进行使用。它能帮助您轻松地移动地形的各个部分、从现有高度图中导入高度数据， 或将高度数据导出到一个高度图文件中，在 World Machine 之类的第三方程序中使用。

 

 

 

![Selecting height data](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f85bc85-3780-4f05-b645-d465cab1713e/01-selecting-height-data.png)

![Copying height data to the Gizmo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c896b6fd-d6ed-40a2-869e-44a96741b605/02-copying-height-data-to-the-gizmo.png)

![Copying gizmo data to the heightmap](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a19fe8b-6d51-4507-9dc7-56aa4c302f4b/03-copying-gizmo-data-to-the-heightmap.png)

在这些范例中，小工具边界已沿被捕捉的绘制区域进行缩放，然后小工具将被放置到地形的另一个部分上，最后它将被粘贴到现有的地形上。

如需了解小工具的使用方法，可在此处阅读 [Gizmo 工具](/documentation/zh-cn/unreal-engine/landscape-copy-tool-in-unreal-engine) 的相关内容。

## 工具设置

 

 

![Copy/Paste Tool](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee147fd4-b456-4556-8825-48fe0184e712/04-copy-paste-tool.png)

![Copy and Paste tool properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24c6b142-2852-4805-82c1-fde166dac4d9/05-copy-and-paste-tool-properties.png)

**属性**

**描述**

**Copy Data to Gizmo**

将小工具边界内的数据复制到小工具，将所选区域内的全部遮罩纳入考量。

**Fit Gizmo to Selected Regions**

放置并调整小工具的大小，使其完整包含全部区域选择。

**Fit Height Values to Gizmo**

调整小工具中的数据，使其与小工具的 Z 轴大小匹配。

**Clear Gizmo Data**

清理任意复制数据的小工具。

**Tool Strength**

工具的强度。如您使用的是压力感应的笔/平板，所用的压力则决定工具的强度。

**Paste Mode**

粘贴只升高、或者只降低，或者同时升高和降低：

**Both**：粘贴将升高和降低数据所在位置的数值。 **Raise**：粘贴只会升高数值，并粘贴数据所在位置。高度图以下的区域均不进行修改。适用于复制粘贴山脉。 **Lower**：粘贴只会降低数值，并粘贴数据所在位置。高度图以上的区域均不进行修改。适用于复制粘贴山谷或地坑。

**Gizmo Copy/Paste All Layers**

设置后将复制粘贴所有层。否则，它将只复制粘贴在目标面板中选中的层。

**Snap Gizmo to Landscape Grid**

确保小工具与地形完美对齐，让采样点排列好，从而使复制粘贴模糊度降低。如小工具被缩放，则不相关。

**Use Smooth Gizmo Brush**

将小工具数据的边缘平滑到地形之中。如无此操作，粘贴数据的边缘将存在锐度。

高级

 

**Gizmo Import/Export**

导入或导出所选区域高度图时可使用的选项：

**Heightmap**：设置需要导入的高度图文件的导入文件路径。 **Heightmap Size**：正在被导入的高度图数据的大小。不应对此属性进行调整。 **Layer Filename**：设置用于绘制图层的高度图数据的导入文件路径。 **Layer Name**：设置导入高度图层的命名。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [region](https://dev.epicgames.com/community/search?query=region)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用复制/粘贴工具](/documentation/zh-cn/unreal-engine/copy-and-paste-region-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%A4%8D%E5%88%B6/%E7%B2%98%E8%B4%B4%E5%B7%A5%E5%85%B7)
-   [复制/粘贴小工具](/documentation/zh-cn/unreal-engine/copy-and-paste-region-in-unreal-engine#%E5%A4%8D%E5%88%B6/%E7%B2%98%E8%B4%B4%E5%B0%8F%E5%B7%A5%E5%85%B7)
-   [工具设置](/documentation/zh-cn/unreal-engine/copy-and-paste-region-in-unreal-engine#%E5%B7%A5%E5%85%B7%E8%AE%BE%E7%BD%AE)