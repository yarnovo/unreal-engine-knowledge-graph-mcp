# 虚幻引擎中的DMX库参考文档 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dmx-library-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:29:48.193Z

---

目录

![DMX库参考文档](https://dev.epicgames.com/community/api/documentation/image/e3f18551-281c-4aae-9fb0-62888c0201a6?resizing_type=fill&width=1920&height=335)

要使用DMX库资产，必须先[启用DMX插件](/documentation/404)。

DMX库资产是DMX插件的主要数据结构，包含以下信息：

-   控制器
-   灯具类型
-   灯具配接

浏览资产创建菜单时，可在 **DMX** > **DMX库（DMX Library）** 下找到DMX库资产。

从内容侧滑菜单打开DMX库时，弹出的窗口会带有一个导航栏和三个选项卡，具体为："库设置（Library Settings）"选项卡、"灯具类型（Fixture Types）"选项卡和"灯具配接（Fixture Patch）"选项卡。

![DMX库的导航栏和三个选项卡。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/071124b4-27a8-407f-a1a5-9d934a4227dc/library-top.png)

## 导航栏

**导航栏** 上有用于保存、浏览资产以及导入和导出MVR文件的功能按钮。

![导航栏的三个分段。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10cf1810-535c-4e33-93c9-b7ea0ac17bf8/navigation-bar.png)

编号

名称

说明

1

**保存**

保存对DMX库所做的更改。

2

**浏览**

打开 **内容浏览器（Content Browser）** 并选择DMX库资产。

3

**导入（Import）** 和 **导出（Export）**

这些按钮具有以下功能：

-   **导入（Import）**　：从MVR文件导入DMX库。
-   **导出（Export）**　：将DMX库导出为MVR文件。

## 库设置

你可以在库的设置中启用或禁用输入和输出端口。要更新其他DMX端口的设置，请选择 **打开DMX项目设置（Open DMX Project Settings）** 。

![库的设置项。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8369647a-4a4a-477a-9f3c-780355461fed/library-settings.png)

## 灯具类型

在灯具类型（Fixture Types）选项卡中，你可以创建并更新灯具类型，包括灯具的模式和函数。

![灯具类型选项卡的六块区域。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d83f670-b7eb-4726-8bbe-842a404582c1/fixture-types.png)

编号

名称

说明

1

**灯具类型** 列表

用于创建和整理灯具类型的列表。

2

**灯具设置**

灯具的设置项以及以GDTF形式导入的灯具数据。

3

**模式** 列表

用于创建和整理模式的列表。

4

*\*模式设置*

所选模式的属性和设置项。

5

**函数** 列表

属性和函数的列表。

6

**函数设置**

所选函数的协议设置，如位深度和信道分配等。

## 灯具配接

灯具配接（Fixture Patch）选项卡分为以下几个区域：

![灯具配接选项卡的三块区域。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/809be9e1-b038-4612-a445-2c214c0156d3/fixture-patch.png)

编号

名称

说明

1

**灯具列表**

所有灯具配接的列表。

2

**配接器工具**

每个域中配接位置的可视化表示。

3

**灯具配接** 面板

所选灯具配接的细节。

### 灯具列表

灯具列表分为如下竖列：

![灯具列表的竖列。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67cbaded-6e7f-4a50-a556-0804ebfad9cf/fixture-list.png)

-   **灯具配接（Fixture Patch）** ：配接的名称。
-   **FID** ：灯具的ID。每个灯具都应使用独有的FID。
-   **灯具类型（Fixture Type）** ：配接所基于的灯具类型。
-   **模式（Mode）** ：配接所用灯具类型的模式。
-   **配接（Patch）**　: 配接的域和首个信道。（例如，2.1 \* 表示域2、信道1。）

灯具列表（Fixture List）上下文菜单的选项如下。

![灯具列表的上下文菜单。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a45bbf6-5851-436a-8449-2487728581db/fixture-list-menu.png)

操作

说明

**剪切（Cut）**

剪切所选配接。

**复制（Copy）**

复制所选配接。

**粘贴（Paste）**

从选定的域开始，将剪切或复制的配接粘贴到首个空闲信道。

**再制（Duplicate）**

从选定的域开始，在首个空闲信道中创建所选配接的副本。

**在选定域自动分配（Auto-assign in selected universe）**

从选定的域开始，将所选的配接分配到首个空闲信道。

### 配接窗口

配接窗口（Patch Window）包含的选项如下。

![配接窗口的选项。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e98f04a-ccd9-4491-93ea-69f0f537006e/patch-window.png)

-   **本地域（Local Universe）** ：目前选中的域。
-   **显示域中的所有配接（Show all patches in Universes）** ：启用此选项后，配接器将显示库中的所有配接，而不是只显示选定的配接。
-   **监视DMX输入（Monitor DMX inputs）** : 启用此选项后，配接器将监视输入的DMX。

配接窗口（Patch Window）上下文菜单的选项如下。

![配接窗口的上下文菜单。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/597e2463-5878-4b81-b8a4-786e9767e734/patch-window-menu.png)

操作

说明

**在选定域自动分配（Auto-assign in selected universe）**

从选定的域开始，将配接分配到首个空闲信道。

**自动分配至\[域信道\]（Auto-assign at \[Universe.Channel\]）**

从右键选定的域开始，将配接分配至首个空闲信道。

**分配至\[域信道\]（Assign at \[Universe.Channel\]）**

将配接分配到右键选定的信道，不论该信道范围是否已被占用。

**对齐（Align）** （限多选）

逐个对齐所有选中的配接。

**堆叠（Stack）** （限多选）

将所有选中的配接堆叠在一起。

**分布至域（Spread over Universes）** （限多选）

将所有配接放入其各自的域。

-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [dmx](https://dev.epicgames.com/community/search?query=dmx)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [导航栏](/documentation/zh-cn/unreal-engine/dmx-library-reference-in-unreal-engine#%E5%AF%BC%E8%88%AA%E6%A0%8F)
-   [库设置](/documentation/zh-cn/unreal-engine/dmx-library-reference-in-unreal-engine#%E5%BA%93%E8%AE%BE%E7%BD%AE)
-   [灯具类型](/documentation/zh-cn/unreal-engine/dmx-library-reference-in-unreal-engine#%E7%81%AF%E5%85%B7%E7%B1%BB%E5%9E%8B)
-   [灯具配接](/documentation/zh-cn/unreal-engine/dmx-library-reference-in-unreal-engine#%E7%81%AF%E5%85%B7%E9%85%8D%E6%8E%A5)
-   [灯具列表](/documentation/zh-cn/unreal-engine/dmx-library-reference-in-unreal-engine#%E7%81%AF%E5%85%B7%E5%88%97%E8%A1%A8)
-   [配接窗口](/documentation/zh-cn/unreal-engine/dmx-library-reference-in-unreal-engine#%E9%85%8D%E6%8E%A5%E7%AA%97%E5%8F%A3)