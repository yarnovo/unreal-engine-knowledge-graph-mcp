# 虚幻引擎蓝图可视化脚本编辑器中的图表编辑器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/graph-editor-for-the-blueprints-visual-scripting-editor-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:38:19.585Z

---

目录

![蓝图编辑器图表编辑器](https://dev.epicgames.com/community/api/documentation/image/91b7f418-cfd8-425e-b944-65bff664f2ca?resizing_type=fill&width=1920&height=335)

**图表编辑器（Graph Editor）** 面板是蓝图系统的核心。您可在此创建节点和线路的网络，以定义脚本化行为。您可以单击节点以快速选择节点，并拖动节点来重新定位它们。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4f58759-d7e9-4d6d-8dd4-a8b7a28c5f23/grapheditor.png)

1.  **图表区域（Graph Area）** - 这是您将用于实际布置所有节点的位置。
2.  **前进和后退按钮（Forward and Back Buttons）** - 这些按钮允许您在不同图表之间切换，就像浏览网络浏览器一样。
3.  **选项卡区域（Tabs area）** - 当您打开不同图表时，各个图表的选项卡将在此处打开，允许您在不同图表之间快速切换。
4.  **痕迹（Breadcrumbs）** - 它们显示图表和子图表的进展。当您逐步深入函数或折叠图时，这将显示您在网络中所处的位置。
5.  **缩放系数（Zoom Factor）** - 它仅显示图表编辑器中的当前缩放比例。
6.  **蓝图标签（Blueprint label）** - 它显示您正在编辑的蓝图的类型。当您编辑蓝图接口（Blueprint Interface）、动画蓝图（Animation Blueprint）、宏（Macro）和其他类型时，此标签将更新。

### 图表编辑器控件

使用以下控件可浏览 **图表编辑器（Graph Editor）** 选项卡：

控制

操作

**右键单击+拖动**

平移图表。

**鼠标滚动**

缩放图表。

**右键单击**

弹出上下文菜单。

**单击** 节点

选择该节点。

在空白区域内 **单击+拖动**

选择字幕选择框内的节点。

在空白区域内 **Ctrl+单击+拖动**

切换字幕选择框内的节点选择。

在空白区域内 **Shift+单击+拖动**

将字幕选择框内的节点添加到当前选择。

**单击+拖动** 节点

移动节点。

从引脚到引脚 **单击+拖动**

将引脚连接到一起。

从引脚到引脚 **Ctrl+单击+拖动**

将线路从原点引脚移至目标引脚。

从引脚到空白区域 **单击+拖动**

弹出上下文菜单，仅显示相关节点。将原点引脚连接到已创建节点上的兼容引脚。

**Alt+单击** 引脚

移除连接到选定引脚的所有线路。

StaticMesh、SoundCue、SkeletalMesh和ParticleSystem资源可从 **内容浏览器（Content Browser）** 拖放到 **图表编辑器（Graph Editor）** 选项卡上，以使用自动分配的资源创建新的AddComponent函数调用。

![Blueprints - Drag and Drop Component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65acbe96-c827-4929-9704-308423c97905/k2_component_graph_drag.png)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [图表编辑器控件](/documentation/zh-cn/unreal-engine/graph-editor-for-the-blueprints-visual-scripting-editor-in-unreal-engine#%E5%9B%BE%E8%A1%A8%E7%BC%96%E8%BE%91%E5%99%A8%E6%8E%A7%E4%BB%B6)