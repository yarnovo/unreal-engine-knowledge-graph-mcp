# 虚幻引擎中的建模模式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:07:30.412Z

---

目录

![建模模式概述](https://dev.epicgames.com/community/api/documentation/image/2888d636-5830-4643-af41-27c8b16a1211?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**建模（Modeling）** 编辑器模式也称为 **建模模式（Modeling Mode）** ，提供了可直接在虚幻引擎（UE）中创建、塑造、编辑3D几何体的工具集。这些工具提供了用于拓扑编辑、UV创建、多个材质分配、碰撞编辑和纹理烘焙的工作流程。

此概述介绍了：

-   如何访问该模式及其工具
-   工具及其工作流程背后的核心概念
-   关于使用工具的基础知识

使用建模模式之前，我们推荐了解以下主题：

-   [资产](/documentation/zh-cn/unreal-engine/assets-and-content-packs-in-unreal-engine)
-   [Actor](/documentation/zh-cn/unreal-engine/actors-and-geometry-in-unreal-engine)
-   [组件](/documentation/zh-cn/unreal-engine/basic-components-in-unreal-engine)
-   [关卡编辑器](/documentation/zh-cn/unreal-engine/level-editor-in-unreal-engine)

## 打开建模模式

要访问建模模式，请点击 **选择模式（Select Mode）** 下拉列表并点击 **建模（Modeling）** 。或者，按 **SHIFT+5** ，立即切换到此模式。如需详细了解各种模式，请参阅[关卡编辑器模式](/documentation/zh-cn/unreal-engine/level-editor-modes-in-unreal-engine)。

![访问建模模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5de71126-f1be-4ce6-a66e-87db9771e7ad/modeling-mode-dropdown.png)

如果 **建模（Modeling）** 未显示在"模式（Mode）"下拉菜单中，请确保在你的插件中启用了编辑器。

**编辑（Edit）** > **插件（Plugins）** > **建模工具编辑器模式（Modeling Tools Editor Mode）**

更多信息请参阅[使用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。

![建模编辑器插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d0c2d01-d0db-4582-99ac-b974dacd12c1/ue-5-2-modeling-plugin.png)

点击该模式后，建模模式的用户界面（UI）会显示多个面板，帮助简化你的工作流程。

![建模模式中的模式工具栏和建模面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9857a073-2ed3-4e91-a943-9e05b8e03827/ue5-3-modeling-mode-panels.png)

数字

**面板**

**说明**

1

**工具类别（Tool Category）**

类别将一组相关工具整理到一起。请参阅[工具类别](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7%E7%B1%BB%E5%88%AB)，了解更多信息。

2

**工具控制板（Tool Palette）**

由所选类别的工具构成。要详细了解所有可用工具，请参阅[建模工具](/documentation/zh-cn/unreal-engine/modeling-tools-in-unreal-engine)。

3

**工具属性（Tool Properties）**

与所选工具相关的设置。

4

**建模模式快速设置（Modeling Mode Quick Settings）**

访问常见设置，例如资产、小工具、元素分段和新网格体对象的路径位置。

### 帮助栏

在使用建模模式时，带有提示文本（例如热键命令）的额外面板在 **关卡编辑器（Level Editor）** 的[底部工具栏](/documentation/zh-cn/unreal-engine/level-editor-toolbar-in-unreal-engine)中可用。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f805241-a880-4b2a-887b-900361fd1be5/ue-5-2-tip-bar.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f805241-a880-4b2a-887b-900361fd1be5/ue-5-2-tip-bar.png)

点击查看大图。

## 理解关键概念

尽管建模模式中的许多工具与同等其他建模软件相似，但在建模模式中编辑网格体的具体方式有一些重要的区别，在开始处理之前，你应当加以了解。

### 术语

当你在虚幻引擎（UE）中处理各种类型的Actor时，例如静态网格体、动态网格体或体积，建模工具非常有用。这些Actor统称为"网格体"，但工具仅可用于特定Actor类型时除外。

### 三角形和多边形组

虚幻引擎将所有模型作为三角剖分网格体进行渲染。换句话说，当你导入或创建网格体时，无论网格体是否已在不同的环境中定义，其表面都会自动分解为多个三角形。这种转换为三角形的情况可带来多方面的保证：

-   UE无法导入或创建它无法渲染的模型。
-   UE的渲染可在所有平台之间移植，因为所有显卡驱动程序都能一致地识别三角形。
-   UE不需要在运行时花费时间和资源将四边形和n边形（超过4条边的多边形）解析为三角形。

在建模模式中，你可以使用 **三角形编辑（Triangle Edit）** 工具编辑网格体的三角形。这是最低级别的拓扑编辑工具之一，完全基于三角形和顶点的直接选择和编辑。尽管虚幻引擎原本不能识别四边形或n边形，但支持 **多边形组** ，它们可以模拟这些功能。多边形组是建模模式中各种工具可以定义的三角形的任意集合。接着你可以使用[多边形组编辑](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-in-unreal-engine)工具操控这些分组以用于传统盒体建模，使用[UV工具](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine)创建UV，等等。

使用 **创建（Create）** 类别中的某个图元形状创建网格体时，你可以使用 **多边形组模式（PolyGroup Mode）** 设置来配置新网格体的多边形组。

![在虚幻引擎中创建多边形组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7368ad54-24f4-401c-8111-1f5ae040652f/ue5-3-create-polygroups.png)

此外，你可以为多边形组分配以下工具：

-   **三角形选择（Tri Select）**
-   **生成多边形组（Generate PolyGroups）**
-   **绘制多边形组（Paint PolyGroups）**

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df4ab976-89da-44c1-bc3e-93f64c599d91/ue5-3-paint-polygroup-tool.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df4ab976-89da-44c1-bc3e-93f64c599d91/ue5-3-paint-polygroup-tool.png)

点击查看大图。

要详细了解如何创建和使用多边形组，请参阅[理解多边形组](/documentation/zh-cn/unreal-engine/understanding-polygroups-in-unreal-engine)。

### 工具、撤销历史记录和接受更改

建模模式中的大部分工具不会立即将更改应用于网格体。相反，工具会预览网格体在实施更改后的外观， **工具确认（Tool Confirmation）** 面板会显示 **取消（Cancel）** 和 **接受（Accept）** 按钮。

![接受和取消按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5a731ca-8ac1-4626-9b4d-54538c694cb9/accept-and-cancel-buttons.png)

如果你退出建模模式或按 **取消（Cancel）** ，建模模式将丢弃更改，并且网格体将恢复为你开始编辑之前的外观。若按 **接受（Accept）** ，你将退出工具，并且你在使用工具时对网格体做出的所有更改都将应用于底层网格体。当你从活动工具会话切换到其他工具时，也会应用更改。

使用工具时，你可以撤销或重做单独的更改。但接受更改之后，UE的撤销历史系统将仅跟踪工具激活之前和之后的网格体状态。例如，你可以在 **顶点塑造（Vertex Sculpt）** 工具中撤销每个笔刷。但点击 **接受（Accept）** 并退出塑造工具后，你就只能撤销所有笔刷的合并结果。撤销会将网格体恢复为你启动工具之前的状态。

### 网格体、资产和项目设置

你选择用来表示网格体的Actor类型，将确定建模模式如何处理创建和编辑过程。使用 **创建（Create）** 类别创建新网格体时，你将使用 **输出类型（Output Type）** 选择所需Actor。你可以选择以下某个Actor作为目标网格体：

-   **静态网格体（Static Mesh）**：表示你的模型，并保存在内容浏览器中。网格体实例放置在关卡中。
-   **动态网格体（Dynamic Mesh）**：表示你的模型，并仅保存在关卡中。
-   **体积（Volume）**：表示触发行为的区域，并仅保存在关卡中。

这些类型有各种用例和优势。你可以使用 **转换（Convert）** 和 **传输（Transfer）** 等工具更改当前网格体的Actor类型。使用[项目设置](/documentation/zh-cn/unreal-engine/working-with-meshes-in-unreal-engine#%E5%BB%BA%E6%A8%A1%E6%A8%A1%E5%BC%8F%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)，你可以配置网格体的创建和选择，以及资产的保存。

要继续了解如何处理输出类型以及如何调整工作流程的设置，请参阅[处理网格体](/documentation/zh-cn/unreal-engine/working-with-meshes-in-unreal-engine)文档。

## 使用建模模式

### 创建网格体

要创建新网格体，请按照以下步骤操作：

1.  打开 **创建（Create）** 类别。
2.  点击预定义的图元形状，并将你的鼠标光标移入 **视口** 中。形状的模板将跟随你的光标并对齐到关卡网格。
3.  点击关卡中你想添加网格体的地方。

编辑器将使用你在 **工具属性（Tool Properties）** 面板中配置的参数创建形状。

你还可以使用"创建"类别中的工具创建自定义网格体。例如， **挤压多边形（Extrude Polygon）** 工具可以绘制网格体的轮廓，然后将其挤压以创建一个3D形状。

**挤压多边形（Extrude Polygon）** 和 **挤压路径（Extrude Path）** 等多个工具使用网格来绘制形状。要控制网格的位置，请按住CTRL+点击所需位置。

### 编辑网格体

建模模式中的其他大部分工具都是围绕在你的游戏世界中编辑现有网格体而构建的。例如，如果你选择 **三角形编辑（Triangle Edit）** 或 **多边形组编辑（PolyGroup Edit）** ，然后点击网格体，你可以执行拓扑建模操作。

**三角形编辑（Triangle Edit）** 和 **多边形组编辑（PolyGroup Edit）** 工具中的各个操作（例如 **挤压（Extrude）** 、 **推拉（Push Pull）** 或 **切割面（Cut Faces）** ）会显示在工具属性面板中。编辑后，点击 **接受（Accept）** 按钮完成更改，或点击 **取消（Cancel）** 放弃更改。

你可以选择你的世界中的任意网格体并使用这些工具编辑它，包括未在建模模式中创建的网格体。例如，你可以在高分辨率网格体上使用 [格栅（Lattice](/documentation/zh-cn/unreal-engine/lattice-tool-in-unreal-engine)工具来快速改变其形状。

如果你打算编辑高分辨率模型，我们强烈建议你使用 **复制（Duplicate）** 工具复制资产以保留原始网格体。

### 小工具

建模模式有专用的小工具，用于唯一、快速的网格体变换。默认情况下，缩放、旋转和平移（移动）合并为一个小工具。

![建模小工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d698be2-4656-4d86-b6d6-d7f71e0d0f17/ue-5-2-gizmo.png)

要使用与关卡编辑器的标准平移、旋转和缩放一致的单独建模小工具，请按以下步骤操作：

1.  点击 **建模模式快速设置（Modeling Mode Quick Settings）** 中的设置图标
2.  禁用 **合并小工具（Combined Gizmo）** 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5884eff1-bd6a-4023-a89c-d369b3fe7319/ue-5-2-gizmo-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5884eff1-bd6a-4023-a89c-d369b3fe7319/ue-5-2-gizmo-settings.png)

点击查看大图。

除了建模小工具的结构之外，你还可以：

-   通过切换 **世界网格对齐（World Grid Snapping）** ，在相对和绝对网格对齐之间切换。
-   使用 **变换面板（Transform Panel）** 为世界空间和本地增量值输入数字。

变换面板将直接在视口中显示并且可用于多种建模和UV工具。

![数字输入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86fcbf97-c45f-43a6-9b44-8d30cec449b7/ue-5-2-transform-panel.png)

#### 小工具热键

你可以特定工具表格中列出的小工具热键。特定建模工具有额外的小工具属性，例如 **挤压多边形（Extrude Polygon）** 、 **挤压路径（Extrude Path）** 和 **图案（Patten）** 工具的可重新定位的网格。使用 **帮助栏（Help Line）** 来表明你何时可以使用这些热键。

热键

说明

**按住Ctrl键**

将所选小工具变换对齐到场景。不包括缩放。

**Crtl + 点击**

将小工具网格重新定位到点击的法线。

**Shift + Crtl + 点击**

将小工具网格重新定位到点击的表面，保留当前方向。

**鼠标中键 + 平移**

重新定位小工具。

**Q**

切换方向锁。仅适用于本地坐标系。

### 网格体元素选择

建模模式提供了直接选择网格体元素的选项，以实现更一致而优化的工作流程。**网格体元素选择（Mesh Element Selection）** 允许美术师选择网格体，选择元素，然后调用操作，而无需使用 **多边形组编辑（PolyGroup Edit）** 或 **三角形编辑（Triangle Edit）** 等中间工具。

要启用工具，请执行以下操作：

1.  点击 **建模模式快速设置（Modeling Mode Quick Settings）** 中的设置图标。
2.  选择 **网格体元素选择（Mesh Element Selection）** 。
3.  退出并重新进入 **建模模式（Modeling Mode）** 。

此外，启用该设置后， **选择（Select）** 类别将可用，上面有各种工具可用来编辑你所选的网格体。

### 自定义工具预设

当你在建模模式中使用各种工具时，你可以建立涉及特定工具的重复设置的工作流程。你不必重复输入这些设置，而可以在选择工具时使用 **预设（Presets）** 选项。使用自定义预设时，你可以保存当前工具设置，未来重新加载这些设置，并管理哪些预设集合对于项目或用户处于活动状态并启用。

![创建自定义预设](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d1a4e6b-a77a-4de7-a4ca-8838b4987a58/create-preset.png) ![预设管理器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/463f4dac-c37d-4f21-a1eb-22381f98077b/preset-manager.png)

## 工具类别

**类别**

**说明**

**收藏夹（Faves）**

顶层菜单，包含你收藏的工具。右键点击任意工具可将其添加到收藏夹类别。

**创建（Create）**

从预定义图元、路径或样条线构建新网格体。

**选择（Select）**

编辑元素选择。必须在 **建模模式快速设置（Modeling Mode Quick Settings）** 中启用 **网格体元素选择（Mesh Element Select）** 。

**XForm**

调整网格体的位置或表示。

**变形（Deform）**

塑造或扭曲网格体的整体或特定区域。

**建模（Model）**

执行精细网格体编辑。

**网格体（Mesh）**

用于检查、优化、编辑网格体的几何体的处理工具。

**体素（Voxel）**

将网格体转换为体素以执行体积操作，然后再将其转换回网格体。

**烘焙（Bake）**

生成网格体的纹理和顶点颜色数据。

**UV**

编辑网格体的UV坐标，更改纹理映射到表面的方式。

**属性（Attributes）**

检查并调整网格体的二级属性。

**杂项（Misc）**

其他实用工具，例如，管理LOD和体积转换。

要详细了解这些类别及其特定工具，请参阅[建模工具](/documentation/zh-cn/unreal-engine/modeling-tools-in-unreal-engine)。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [modeling](https://dev.epicgames.com/community/search?query=modeling)
-   [geometry](https://dev.epicgames.com/community/search?query=geometry)
-   [beta](https://dev.epicgames.com/community/search?query=beta)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [打开建模模式](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E6%89%93%E5%BC%80%E5%BB%BA%E6%A8%A1%E6%A8%A1%E5%BC%8F)
-   [帮助栏](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B8%AE%E5%8A%A9%E6%A0%8F)
-   [理解关键概念](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E7%90%86%E8%A7%A3%E5%85%B3%E9%94%AE%E6%A6%82%E5%BF%B5)
-   [术语](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E6%9C%AF%E8%AF%AD)
-   [三角形和多边形组](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E4%B8%89%E8%A7%92%E5%BD%A2%E5%92%8C%E5%A4%9A%E8%BE%B9%E5%BD%A2%E7%BB%84)
-   [工具、撤销历史记录和接受更改](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7%E3%80%81%E6%92%A4%E9%94%80%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E5%92%8C%E6%8E%A5%E5%8F%97%E6%9B%B4%E6%94%B9)
-   [网格体、资产和项目设置](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E3%80%81%E8%B5%84%E4%BA%A7%E5%92%8C%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [使用建模模式](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%BB%BA%E6%A8%A1%E6%A8%A1%E5%BC%8F)
-   [创建网格体](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [编辑网格体](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E7%BC%96%E8%BE%91%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [小工具](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)
-   [小工具热键](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7%E7%83%AD%E9%94%AE)
-   [网格体元素选择](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E5%85%83%E7%B4%A0%E9%80%89%E6%8B%A9)
-   [自定义工具预设](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B7%A5%E5%85%B7%E9%A2%84%E8%AE%BE)
-   [工具类别](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7%E7%B1%BB%E5%88%AB)