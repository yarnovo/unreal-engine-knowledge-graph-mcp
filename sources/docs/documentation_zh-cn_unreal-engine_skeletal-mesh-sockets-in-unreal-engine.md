# 虚幻引擎中的骨骼网格体插槽 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:05:25.953Z

---

目录

![骨骼网格体插槽](https://dev.epicgames.com/community/api/documentation/image/030daf59-f091-408d-8381-e438d7115d96?resizing_type=fill&width=1920&height=335)

有时，将对象绑定到骨骼网格体的某个骨骼上时，你可能需要偏移此绑定对象。这时，你不必使用数学运算来估算偏移值，而是可以创建一个 **插槽（Sockets）** 。插槽是骨架层级中的一种特殊的绑定点，可以相对于作为其父节点的骨骼进行变换。设置之后，你可以将对象、武器和其他Actor附加到插槽。

本文档概述了如何创建和使用插槽。

#### 先决条件

-   你的项目有[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)。

## 创建插槽

插槽从 **骨架树（Skeleton Tree）** 创建，后者可从主要[动画编辑器](/documentation/zh-cn/unreal-engine/animation-editors-in-unreal-engine)访问。右键点击 **骨架树（Skeleton Tree）** 中的骨骼并选择 **添加插槽（Add Socket）** 。

![添加插槽](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2155d623-6e97-4e05-915f-16e2e54552a3/create1.png)

新插槽现在将显示在骨架树中，以你之前选择的骨骼为父节点。

![新插槽](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f48d12b9-2309-4064-90b6-6c15b55f73c2/create2.png)

右键点击插槽并选择 **删除（Delete）** 或在键盘上按 **Delete** 键可删除插槽。

![删除插槽](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/514ec60f-491b-48cd-8f94-86cee9900c91/create3.png)

默认情况下，创建和操控插槽时，这将编辑骨骼网格体的[骨架资产](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)。因此，你在更改插槽后必须保存。

## 管理和编辑插槽

创建插槽后，你可以按以下方式与之交互。

### 插槽可视性

默认情况下，插槽在[动画编辑器视口](/documentation/zh-cn/unreal-engine/animation-editors-in-unreal-engine#%E8%A7%86%E5%8F%A3)中不可见，你可以在视口菜单中找到 **角色（Character）> 骨骼（Bones）** 并启用 **插槽（Sockets）** 来使其可见。

![在视口中显示插槽](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9297596-9dfe-4532-962f-69f4284dd651/visibility.png)

### 选择和移动

要选择插槽，可以在骨架树中点击插槽，如果插槽已在视口中可见，可以在视口中点击插槽。接着，你可以拖动视口中的变换操控器来移动插槽。插槽可以平移、旋转和缩放。

![选择和移动插槽](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b7d91ec-172d-44fe-9fb2-03550ab4f2b4/selectionmove.gif)

### 复制和粘贴

插槽可以根据你的要求以不同方式复制和粘贴。

要复制插槽，请在骨架树中右键点击它并选择 **复制所选插槽（Copy Selected Sockets）** ，或按 **Ctrl+C** 。

![复制所选插槽](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88e8681f-5840-4f95-b07b-877a873628db/copypaste1.png)

接下来，你可以选择以下任一操作：

1.  将插槽粘贴到相同的骨骼，方法是右键点击骨架树中的任一骨骼并选择 **粘贴插槽（Paste Sockets）** 。这实际上会复制该插槽。
    
    ![粘贴插槽](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7927c9df-55c7-41d0-bd61-622567946ada/copypaste2.png)
    
2.  将插槽粘贴到不同的骨骼，方法是右键点击骨架树中的不同骨骼并选择 **将插槽粘贴到所选骨骼（Paste Sockets To Selected Bone）** 。这将使用相同的偏移信息粘贴该插槽的副本，但会以新的骨骼为父节点。
    
    ![将插槽粘贴到所选骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7cd95cf-1c52-45ce-9b78-2fdc5ca1d60a/copypaste3.png)
    

### 网格体插槽

在不同的骨骼网格体之间[共享骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#%E5%85%B1%E4%BA%AB%E9%AA%A8%E6%9E%B6)时，可能需要创建专属于某个骨骼网格体的插槽。这可以使用 **网格体插槽（Mesh Sockets）** 来完成，这样做会使插槽存在于 **骨骼网格体（Skeletal Mesh）** 上，而不是 **骨架（Skeleton）** 上。

![网格体插槽比较](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4568875e-8ad3-4748-95e2-63d5be81f16a/meshsocket1.png)

要创建网格体插槽，请右键点击现有插槽并选择 **创建网格体插槽（Create Mesh Socket）** 。这会将插槽转换为网格体插槽。确保你当前是将[骨骼网格体编辑器](/documentation/zh-cn/unreal-engine/skeletal-mesh-editor-in-unreal-engine)用于你想为其创建此插槽的骨骼网格体。

![创建网格体插槽](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5fef574e-33fe-4553-abee-23c3ab1edccc/meshsocket2.png)

与骨架资产上现有的插槽一样，网格体插槽将转而存在于骨骼网格体上，这需要你在创建或修改网格体插槽时保存该资产。

### 插槽细节

选择插槽时，**细节（Details）** 面板中包含以下属性。

![插槽细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c28d76a8-d990-47e5-b648-ab54a3bc9911/details1.png)

名称

说明

**相对位置/旋转/比例（Relative Location / Rotation / Scale）**

插槽在位置、旋转或比例方面的当前变换坐标，采用相对于其父骨骼的坐标。

**强制始终制作动画（Force Always Animated）**

启用此属性将导致此插槽的所有父骨骼始终求值，无论它们是否由于当前LOD设置而被删除。

**插槽名称（Socket Name）**

此插槽的名称。

**骨骼名称（Bone Name）**

此插槽附加到的骨骼的名称。将此值更改为不同骨骼会为插槽采用新的父节点。

## 附加到插槽

创建并定位插槽后，你可以向其附加对象、效果和其他Actor。你可以执行以下种类的附加。

### 基本关卡附加

你可以在关卡中设置基本附加，其中对象将默认附加到插槽。有多种方法可以做到这一点。

![关卡中的基本插槽附加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91558b30-27fb-405a-a32a-caf8258f1435/basic1.png)

#### 拖放

在关卡大纲视图中，将对象拖到骨骼网格体Actor上。界面上将显示一个窗口，你可以在其之后选择要附加到的骨骼或插槽。选择你的插槽，附加过程将完成。

![拖放插槽附加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fa0bd8e-ddc7-43a5-9e08-2245f33ddfdd/basic2.gif)

在关卡中附加时，对象将保留之前的世界变换，如果你要为不同的对象创建唯一的偏移，这会很有用。如果你想要对象匹配插槽的变换，则将对象的变换值设置为默认值。

![零变换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dcf7edc-c059-4d27-9c52-7582e2785369/basic3.png)

#### 上下文菜单

右键点击对象并选择 **附加到（Attach To）** ，然后点击骨骼网格体Actor。界面上将显示一个窗口，你可以在其之后选择要附加到的骨骼或插槽。选择你的插槽，附加过程将完成。

![上下文菜单插槽附加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1831883-dc2e-488a-9d49-0f5bef89196a/basic4.png)

#### 插槽对齐

点击关卡编辑器中的 **设置（Settings）** 下拉菜单，选择 **启用插槽对齐（Enable Socket Snapping）** 。这将使所有 **插槽** 在视口中可见。

![启用插槽对齐](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5b59fa9-b7ff-4a99-b4a3-7ce93c30c979/basic5.png)

接下来，你可以快速将对象附加到任意可见的插槽，方法是选择该对象，然后选择插槽。

![插槽对齐附加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/636a3b36-f8cd-408a-b4da-375be72b05d8/basic6.gif)

### 基本蓝图附加

你还可以在[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)中设置 **骨骼网格体组件（Skeletal Mesh Component）** 的基本默认附加。

首先，将对象拖到 **组件（Components）** 面板中的骨骼网格体上，使骨骼网格体组件成为该对象的父节点。

![蓝图插槽附加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3da78e67-5ed0-4fbf-a23d-de4a6d773512/blueprints1.png)

接下来，选择子对象，并在 **细节（Details）** 面板中找到 **父插槽（Parent Socket）** 属性。点击 **搜索按钮** 并选择要附加到的插槽。

![蓝图父插槽附加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d4c10d4-2fb1-400c-8b03-9661ea1949c6/blueprints2.gif)

### 动态附加

如果你想控制对象何时附加到插槽、何时脱离插槽，你可以使用各种 **附加** 和 **脱离** 蓝图函数。

若要附加，你可以使用以下函数：

-   **Attach Actor To Actor** 。
-   **Attach Actor To Component** 。
-   **Attach Component To Component** 。

![附加蓝图函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/882a89d0-ebf5-4242-9d0b-0b0202c77842/dynamic1.png)

附加函数包含以下属性：

名称

说明

**目标（Target）**

所附加的子Actor或组件。

**父节点（Parent）**

**目标（Target）** 所附加到的父Actor或组件。

**插槽（Socket）**

附加时要使用的插槽

**位置/旋转/比例规则（Location / Rotation / Scale Rule）**

用于控制 **目标（Target）** 在附加后应该位于何处的变换规则。可以从以下选项中进行选择：

-   **保持相关（Keep Relative）** ，用于维持当前变换数字值。这可能会导致目标移入新位置，很适合用于在附加时维持相同的偏移坐标。
-   **保持世界（Keep World）** ，这将维持目标的当前视觉变换。这不会在附加时导致转移，因为系统将执行计算，以在附加前后维持相同的视觉变换。
-   **对齐到目标（Snap to Target）** ，这会将目标传送到父节点或插槽的坐标。

**结合模拟的形体（Weld Simulated Bodies）**

是否将目标[结合](/documentation/zh-cn/unreal-engine/welding-physics-bodies-in-unreal-engine-by-using-the-physics-asset-editor)到父节点。

若要脱离，你可以使用以下函数：

-   **Detach From Actor**
-   **Detach From Component**

![脱离蓝图函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e467109-fdae-49b4-afae-e03b71829cb9/dynamic2.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建插槽](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%8F%92%E6%A7%BD)
-   [管理和编辑插槽](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E7%AE%A1%E7%90%86%E5%92%8C%E7%BC%96%E8%BE%91%E6%8F%92%E6%A7%BD)
-   [插槽可视性](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E6%8F%92%E6%A7%BD%E5%8F%AF%E8%A7%86%E6%80%A7)
-   [选择和移动](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E9%80%89%E6%8B%A9%E5%92%8C%E7%A7%BB%E5%8A%A8)
-   [复制和粘贴](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E5%A4%8D%E5%88%B6%E5%92%8C%E7%B2%98%E8%B4%B4)
-   [网格体插槽](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E6%8F%92%E6%A7%BD)
-   [插槽细节](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E6%8F%92%E6%A7%BD%E7%BB%86%E8%8A%82)
-   [附加到插槽](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E9%99%84%E5%8A%A0%E5%88%B0%E6%8F%92%E6%A7%BD)
-   [基本关卡附加](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E5%9F%BA%E6%9C%AC%E5%85%B3%E5%8D%A1%E9%99%84%E5%8A%A0)
-   [拖放](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E6%8B%96%E6%94%BE)
-   [上下文菜单](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E4%B8%8A%E4%B8%8B%E6%96%87%E8%8F%9C%E5%8D%95)
-   [插槽对齐](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E6%8F%92%E6%A7%BD%E5%AF%B9%E9%BD%90)
-   [基本蓝图附加](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E5%9F%BA%E6%9C%AC%E8%93%9D%E5%9B%BE%E9%99%84%E5%8A%A0)
-   [动态附加](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine#%E5%8A%A8%E6%80%81%E9%99%84%E5%8A%A0)