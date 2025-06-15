# 用于导出内容至虚幻引擎的Datasmith 3ds Max UI | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine
> 
> 生成时间: 2025-06-14T19:05:11.517Z

---

目录

![Datasmith 3ds Max UI](https://dev.epicgames.com/community/api/documentation/image/5cae940c-bf18-4fbc-8980-774ff3171e40?resizing_type=fill&width=1920&height=335)

## 3ds Max功能区

安装好Datasmith 3ds Max导出器插件之后，它会在3ds Max 功能区（参考3ds Max文档中的[使用功能区](https://knowledge.autodesk.com/support/3ds-max/getting-started/caas/CloudHelp/cloudhelp/2021/ENU/3DSMax-Basics/files/GUID-F2C0C6D6-968E-40F1-9474-5A7FC44FBC06-htm.html)）。中新增一个Datasmith选项卡。你可以在功能区中使用3ds Max的全部Datasmith工具和设置。

![Datasmith tab of the 3ds Max ribbon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bffbee07-2774-40cd-93db-80314f7e7090/datasmith-ribbon.png "Datasmith tab of the 3ds Max ribbon")

3ds Max功能区的Datasmith选项卡

1.  [Direct Link面板](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#directlinkpanel)
2.  [文件导出面板](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#fileexportpanel)
3.  [设置面板](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#settingspanel)
4.  [工具面板](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#toolspanel)

### Direct面板

选项

说明

同步（Synchronize）

将3ds Max场景或者选中的内容推送到本地Direct Link缓存目录。

虚幻引擎和其它目的地应用都会监视该缓存，并在检测到变动时更新导入到场景。

你可以修改Direct Link缓存目录的位置。要了解详情，请参考[修改Direct Link缓存目录](/documentation/zh-cn/unreal-engine/using-direct-link-to-synchronize-3ds-max-and-unreal-engine#changethedirectlinkcachedirectory)。

切换自动同步（Toggle Auto Sync）

启用时，Datasmith会在你进行修改时自动将3ds Max场景推送到Direct Link缓存。

虚幻引擎在检测到缓存发生更改时便会重新进行导入。

连接（Connections）

打开[Datasmith Direct Link连接状态窗口](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#thedatasmithdirectlinkconnectionstatuswindow)。

### 文件导出面板

选项

说明

导出（Export）

将3ds Max场景导出到 `.udatasmith` 文件。此类文件可以被导入虚幻引擎，或基于虚幻引擎的应用程序（如Twinmotion），或是虚幻引擎运行时应用程序。Datasmith自会导出可见的对象。

导出所选项（Export Selected）

将3ds Max场景中当前被选中的对象导出到 `.udatasmith` 文件。此类文件可以被导入虚幻引擎，或基于虚幻引擎的应用程序（如Twinmotion），或是虚幻引擎运行时应用程序。Datasmith自会导出可见的对象。

动画变换（Animated Transforms）

指定Datasmith如何处理带有3D变形动画的物体。

-   **仅当前帧（Current Frame Only）**：Datasmith会导出当前帧场景中的物体，不带有任何动画数据。
-   **活跃时间片段（Active Time Segment）**：Datasmith会导出物体3D变形动画在3ds Max时间轴活跃片段中的部分。

Datasmith导入器会将动画数据转换为[关卡序列](/documentation/zh-cn/unreal-engine/creating-level-sequences-with-dynamic-transforms-in-unreal-engine)，可以用于在虚幻引擎中播放。

### 设置面板

选项

说明

限制纹理分辨率（Limit Texture Resolution）

Datasmith将程序性纹理烘焙成图片用于导入虚幻引擎时，该设置用于指定烘焙图像中的最大像素数量。数值范围为4K（4096像素）到16M（16兆像素）。

比如，如果你将该数值设为4K，Datasmith会限制纹理像素，使其仅包含4096个像素。（64x64、128x32px等等）。

该设置不会影响栅格纹理的大小，比如指定为凹凸贴图的TIFF或者JPEG文件，以及漫反射贴图等等。

导出XRef场景（Export XRef Scenes）

指定导出的 `.udatasmith` 文件中是否包含XRef场景。

XRef场景是你当前文件中外部引用的场景，但是从其它MAX文件临时加载。

要了解详情，请参考3ds Max文档的[XRef场景](https://knowledge.autodesk.com/support/3ds-max/getting-started/caas/CloudHelp/cloudhelp/2023/ENU/3DSMax-Manage-Scenes/files/GUID-5DB41A62-D7A5-4D54-AC83-5D03C9F7DB11-htm.html?us_oa=akn-us&us_si=9d8783af-02e1-4f82-be05-9f5d61f67e42&us_st=xref%20scene)。

### 工具面板

选项

说明

消息（Messages）

打开[Datasmith消息窗口](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#thedatasmithmessageswindow).

添加Datasmith属性修改器（Add Datasmith Attributes Modifier）

将一个Datasmith属性修改器应用到当前选中的物体。

Datasmith属性修改器中的选项可以用于自定义Datasmith导出特定物体的方式。要了解更多详情，请参考[每个物体的转换设置](/documentation/zh-cn/unreal-engine/datasmith-per-object-conversion-settings-for-exporting-to-unreal-engine)。

## Datasmith Direct Link连接状态窗口

Datasmith Direct Link连接状态窗口显示当前3ds Max实例与虚幻引擎或者其它基于虚幻引擎的应用（比如Twinmotion）之间的连接状态列表。

将鼠标悬停在列表上的项目中，可以显示当前连接的更多信息。

连接状态窗口还包含设置Direct Link缓存目录的相关选项。更多详情请参考[修改Direct Link缓存目录](/documentation/zh-cn/unreal-engine/using-direct-link-to-synchronize-3ds-max-and-unreal-engine#changethedirectlinkcachedirectory)。

![The Datasmith Direct Link Connection Status window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1977fccc-b47f-46ec-aab0-5bc176122df8/datasmith-direct-link-connection-status.png "The Datasmith Direct Link Connection Status window")

3ds Max中Datasmith Direct Link连接状态窗口

## Datasmith消息窗口

Datasmith消息窗口提供3ds Max导出到虚幻引擎的相关信息。当你导出场景或者选中内容时，消息窗口会显示一些导出相关的统计数据，并且报告内容中的任何问题。通常情况下，这些通知会对导出器无法正确转换，或者在虚幻引擎中显示有差异的内容发出警告。

![The Datasmith Messages window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/815ebe30-6b8e-49ca-9344-201c90f5f9fe/datasmith-messages.png "The Datasmith Messages window")

3ds Max中的Datasmith消息窗口

### 为Direct Link启用统计数据

默认情况下，Datasmith消息窗口仅在导出 `.udatasmith` 文件时显示导出统计数据。要为Direct Link同步和自动同步启用统计数据，在MaxScript控制台窗口中输入以下指令：

`Datasmith_SetExportOption_StatSync true`

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [3ds max](https://dev.epicgames.com/community/search?query=3ds%20max)
-   [interop](https://dev.epicgames.com/community/search?query=interop)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [3ds Max功能区](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#3dsmax%E5%8A%9F%E8%83%BD%E5%8C%BA)
-   [Direct面板](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#direct%E9%9D%A2%E6%9D%BF)
-   [文件导出面板](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#%E6%96%87%E4%BB%B6%E5%AF%BC%E5%87%BA%E9%9D%A2%E6%9D%BF)
-   [设置面板](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#%E8%AE%BE%E7%BD%AE%E9%9D%A2%E6%9D%BF)
-   [工具面板](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#%E5%B7%A5%E5%85%B7%E9%9D%A2%E6%9D%BF)
-   [Datasmith Direct Link连接状态窗口](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#datasmithdirectlink%E8%BF%9E%E6%8E%A5%E7%8A%B6%E6%80%81%E7%AA%97%E5%8F%A3)
-   [Datasmith消息窗口](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#datasmith%E6%B6%88%E6%81%AF%E7%AA%97%E5%8F%A3)
-   [为Direct Link启用统计数据](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#%E4%B8%BAdirectlink%E5%90%AF%E7%94%A8%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE)