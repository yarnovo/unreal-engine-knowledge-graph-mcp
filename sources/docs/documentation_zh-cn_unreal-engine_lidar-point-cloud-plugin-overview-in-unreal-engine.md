# 虚幻引擎LiDAR点云插件概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-overview-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:07:04.712Z

---

目录

![LiDAR点云插件概述](https://dev.epicgames.com/community/api/documentation/image/51767862-46e5-4c60-b2bd-8fd0859798d8?resizing_type=fill&width=1920&height=335)

**LiDAR点云插件** 能让你在虚幻引擎中导入、可视化和编辑点云。该插件还支持各种着色技术。得益于该插件的多重优化和动态LOD（细节级别）缩放，在处理大型数据集时不会出现明显的性能降低，即使在运行时也是如此。

## 支持的点云文件格式

**点云** 是一组数据点，其中的每个点均由XYZ坐标和（可选）颜色进行定义。虚幻引擎支持以下点云文件格式：

扩展名

描述

`*.xyz`, `*.pts`, `*.txt`

一般类型的ASCII点云文件格式，可以包含以下其中之一：

-   点坐标（每个点的X Y Z值，以"米"为单位）
    
-   点坐标以及颜色（每个点的X Y Z R G B值）
    

可以采用浮点表示法（如0.00892855）或科学表示法（如8.92855E-03）。

`*.las`, `*.laz`

LAS是一种用于在用户之间交换三维点云数据的公共文件格式。虽然主要是为交换LiDAR点云数据开发的，但这种格式支持任何三维X、Y、Z元组数据的交换。这种二进制文件格式是专有系统以及通用ASCII文件交换系统的替代格式，并且被广泛使用。

LAZ文件是经过压缩的LAS文件。LAZ文件的大小要小得多，但它们的导入速度也成比例减慢。

虚幻引擎支持8位、12位和16位LAS/LAZ文件。

`*.e57`

E57是一种紧凑的开源文件格式，用于存储和交换诸如点云、图像和元数据等3D成像数据。

## 导入和导出点云

要 **导入** 点云资产，可以使用以下任一方法：

-   将一个保存为受支持的文件格式的点云拖到 **内容浏览器（Content Browser）** 中。
    
-   在 **内容浏览器（Content Browser）** 中，单击 **添加/导入（Add/Import）**，然后找到并选择所需的文件。
    

导入时，"米"单位将转换为虚幻单位（UU），转换关系为1 UU = 1厘米。要使用自定义的导入标度，请打开LiDAR点云插件的"项目设置（Project Settings）"，然后更改 **导入标度（Import Scale）** 值。

可以使用现有的 **虚幻导出（Unreal Export）** 工具将点云资产 **导出** 为ASCII或LAS。在 **内容浏览器（Content Browser）** 中，右键单击该资产，然后选择 **资产操作（Asset Actions）> 导出（Export）**。

导出时，虚幻单位会转换回"米"（将值乘以0.01）。要使用自定义的导出标度，请打开LiDAR点云插件的"项目设置（Project Settings）"，然后更改 **导出标度（Export Scale）** 值。

## 性能

性能主要取决于 **全局点数预算**，此预算设置了一次可以显示的最大点数。使用共享预算而不是每个组件的预算可以同时有效地渲染大量资产，因为系统将从所有可见组件中选择最优化的点。更高的点数预算意味着更高的质量和更高的性能成本。全局点数预算可节省VRAM并提高帧率，但不会降低整体RAM使用量。

可以使用控制台变量来设置全局点数预算。点数预算越高，点云越密集。

有关更多信息，请参阅[LiDAR点云插件参考](/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-reference)页面中的控制台变量小节。

## 按需流送

打开点云时，虚幻引擎仅加载必要的头信息并根据需要流送实际的批量数据。这种机制可以加快资产加载速度并降低总RAM消耗量。

新导入的资产将保留在系统内存中，并且在保存之前无法利用流送功能。保存完毕后，编辑器将释放该资产占用的内存。

如果在引擎中加载大量点云文件，在解析点云数据并将数据作为虚幻引擎资产进行处理时，仍然需要占用大量RAM。例如，这个加载到虚幻引擎中的蒙特利尔市公开可用的LiDAR数据具有以下性能指标：

![蒙特利尔市的LiDAR数据](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce0e366a-7e8c-4548-bb6c-92b2bf021308/ue5_01-lidar-data-from-the-city-of-montreal.png "LiDAR data from the city of Montreal")

单个LAS文件

大约684个瓦片，总共占用253 GB磁盘空间

虚幻RAM使用量

预算为100万个点时使用约3.5 GB

帧率

120 fps（全局预算计数为100万个点）

总点数

每1公里x1公里瓦片平均有1430万个点\*621个文件=约89亿个点（@@@）

## 裁剪体积

如果只想显示数据的一部分，但不想删除其余部分，则可以使用 **LiDAR裁剪体积（Lidar Clipping Volume）** Actor。启用LiDAR点云插件后，可以在 **放置Actor（Place Actor）> 体积（Volumes）** > LiDAR裁剪体积（Lidar Clipping Volume）\*\*下找到此Actor。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab49b855-4023-493e-bd16-dcdb800d98cf/ue5_02-lidar-clipping-volume-actor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab49b855-4023-493e-bd16-dcdb800d98cf/ue5_02-lidar-clipping-volume-actor.png)

点击查看到大图

可以从裁剪体积的 **细节（Details）** 面板中配置该裁剪体积的属性。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b17e4cb-faaf-479e-9563-49a57d9b49b5/ue5_03-clipping-volume-from-details-panel.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b17e4cb-faaf-479e-9563-49a57d9b49b5/ue5_03-clipping-volume-from-details-panel.png)

点击查看大图

在 **模式（Modes）** 中提供了两个模式选项：

-   **裁剪外部（Clip Outside）** 会隐藏裁剪体积外部的所有点云数据。
    
    ![具有](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ada6ed0-82ff-4e72-a3eb-b86eee12081b/ue5_04-clip-outside.gif "Lidar Clipping Volume Actor with Clip Outside setting")
-   **裁剪内部（Clip Inside）** 会隐藏裁剪体积内部的所有点云数据。
    
    ![具有](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4284b9f-17af-4b59-a52c-b08cde41e272/ue5_05-clip-inside.gif "Lidar Clipping Volume Actor with Clip Inside setting")

在一个关卡中最多可以使用16个裁剪体积。如果多个体积重叠，请使用 **优先级（Priority）** 设置来确定哪个优先。

## 在运行时更改数据

LiDAR点云插件支持在运行时插入、移除和修改数据，包括在打包的可执行文件中执行这些操作。

执行此类操作时需要牢记以下几点注意事项：

-   插入的数据必须在资产范围内，否则会干扰LOD系统。
    
-   移动点不会将它们重新定位到相邻的LOD，因此建议不要过度移动点。
    
-   多次插入多个点时，生成LOD的过程可能会占用大量资源。
    

为了缓解上述问题，可以使用远大于需求的范围（例如，每个轴为100000）来初始化点云资产，并通过将插件的 **项目设置（Project Settings）** 中的 **最大存储桶大小（Max Bucket Size）** 设置更改为一个非常大的数字（例如1000000000）来基本完全禁用LOD系统。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [lidar](https://dev.epicgames.com/community/search?query=lidar)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [支持的点云文件格式](/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-overview-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E7%82%B9%E4%BA%91%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F)
-   [导入和导出点云](/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-overview-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%92%8C%E5%AF%BC%E5%87%BA%E7%82%B9%E4%BA%91)
-   [性能](/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-overview-in-unreal-engine#%E6%80%A7%E8%83%BD)
-   [按需流送](/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-overview-in-unreal-engine#%E6%8C%89%E9%9C%80%E6%B5%81%E9%80%81)
-   [裁剪体积](/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-overview-in-unreal-engine#%E8%A3%81%E5%89%AA%E4%BD%93%E7%A7%AF)
-   [在运行时更改数据](/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-overview-in-unreal-engine#%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E6%9B%B4%E6%94%B9%E6%95%B0%E6%8D%AE)