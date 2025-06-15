# 利用Maxscript实现Datasmith的自动化导出 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-maxscript-to-automate-the-datasmith-export-to-unreal-engine
> 
> 生成时间: 2025-06-14T19:05:34.167Z

---

目录

![利用Maxscript实现Datasmith的自动化导出](https://dev.epicgames.com/community/api/documentation/image/41310d5c-3b47-412b-852b-c8012f20edc3?resizing_type=fill&width=1920&height=335)

3ds Max的Datasmith导出插件在安装和激活时，会向MAXScript环境添加 `DatasmithExport` 小接口。可使用该接口将3ds Max场景导出到 *.udatasmith* 文件的过程自动化，而不必遵循[从3ds Max导出Datasmith内容](/documentation/zh-cn/unreal-engine/exporting-datasmith-files-from-3ds-max-to-unreal-engine)所描述的手动过程。

## 范例

以下MAXScript代码范例展示如何导出包含所有场景object和动画的3ds Max场景。

```cpp

DatasmithExport.IncludeTarget = #VisibleObjects               -- or #SelectedObjects
DatasmithExport.AnimatedTransforms = #ActiveTimeSegment       -- or #CurrentFrame
DatasmithExport.Export "D:\path\filename.udatasmith" false    -- set your own path and filename

```

## DatasmithExport MAXScript接口

以下部分描述 `DatasmithExport` 接口公开的属性和方法。

### 包含目标

-   类型：`列举`
-   访问：读取、写入

确定导出的文件会包含场景中的哪些object。

-   `#可见的Object（VisibleObjects）` - 导出的文件将包含场景中在当前在3ds Max中可见的所有object。这是默认值。
-   `#选中的Object（SelectedObjects）` - 导出的文件将只包含当前选中的可见object。

### AnimatedTransforms

-   类型：`enum`
-   访问：读取、写入

确定导出器如何处理带有动画3D变换的对象。在以下值中二选一：

-   `#当前帧（CurrentFrame）` - 导出的文件将只包括场景中在当前帧出现的对象，不包括任何动画数据。这是默认值。
-   `#启用时间分段（ActiveTimeSegment）` - 导出的文件将包括所有对象的动画数据，这些对象的3D变换会在3ds Max时间轴上当前活跃的时间分段中添加动画。导入器会将该动画数据转换为关卡序列，在虚幻引擎中用它来播放动画。

无论为此设置选择的值是什么，Datasmith导出器所导出的数据固定以3ds Max当前帧中的场景对象的状态为基础。如果存在拥有动画的网格体变形或其他子对象动画，导入后在虚幻引擎中看到的资源和Actor将反映在导出场景时该帧中这些对象的状态。

### 版本

-   类型：`整数`
-   访问：只读

返回针对3ds Max的Datasmith导出器编译所针对的虚幻引擎的版本号，以整数表示。

### Export(strFilename, boolSuppressWarnings)

-   类型：`方法`

启动导出过程。本方法需以下参数：

参数

类型

描述

`strFilename`

字符串

应由导出器创建的 `.udatasmith` 文件绝对路径和文件名。

`boolSuppresWarnings`

布尔值

有一个窗口通常会显示场景中内容的导出方式的注释和警告，确定自动导出时是否隐藏此窗口。如希望脚本的运行无人参与或不显眼，不要求用户在导出完成时关闭窗口，请将此设置为 `true`。

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [3ds max](https://dev.epicgames.com/community/search?query=3ds%20max)
-   [how to](https://dev.epicgames.com/community/search?query=how%20to)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [范例](/documentation/zh-cn/unreal-engine/using-maxscript-to-automate-the-datasmith-export-to-unreal-engine#%E8%8C%83%E4%BE%8B)
-   [DatasmithExport MAXScript接口](/documentation/zh-cn/unreal-engine/using-maxscript-to-automate-the-datasmith-export-to-unreal-engine#datasmithexportmaxscript%E6%8E%A5%E5%8F%A3)
-   [包含目标](/documentation/zh-cn/unreal-engine/using-maxscript-to-automate-the-datasmith-export-to-unreal-engine#%E5%8C%85%E5%90%AB%E7%9B%AE%E6%A0%87)
-   [AnimatedTransforms](/documentation/zh-cn/unreal-engine/using-maxscript-to-automate-the-datasmith-export-to-unreal-engine#animatedtransforms)
-   [版本](/documentation/zh-cn/unreal-engine/using-maxscript-to-automate-the-datasmith-export-to-unreal-engine#%E7%89%88%E6%9C%AC)
-   [Export(strFilename, boolSuppressWarnings)](/documentation/zh-cn/unreal-engine/using-maxscript-to-automate-the-datasmith-export-to-unreal-engine#export\(strfilename,boolsuppresswarnings\))