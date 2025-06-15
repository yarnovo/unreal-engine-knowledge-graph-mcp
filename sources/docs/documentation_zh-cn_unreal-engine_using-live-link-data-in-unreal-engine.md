# 在虚幻引擎中使用Live Link数据 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:07:15.619Z

---

目录

![使用Live Link数据](https://dev.epicgames.com/community/api/documentation/image/783f1cdd-513d-46d8-ac12-dbd4122219f1?resizing_type=fill&width=1920&height=335)

用户可以通过 **Live Link** 流送来自各种源头的数据，并将这些数据直接用于关卡中的Actor。为了改进此流程，**虚幻引擎** 开发出了一些功能，旨在简化将Live Link数据应用于关卡中Actor的过程。

-   **Live Link预设（Live Link Presets）** 能保存数据源的设置，供以后使用。
-   **LiveLink控制器组件（LiveLink Controller Component）** 允许你启用LiveLink控制器。它们能简化将Live Link信息用于Actor的过程，我们还添加了几个蓝图节点以方便收集这些数据。
-   **LiveLink骨骼动画组件（LiveLink Skeletal Animation Component）** 能公开 **OnLiveLinkUpdated** 事件节点，该节点会在每次Live Link更新时检索有关对象和数据源的信息，并可通过蓝图执行若干其他功能。

有关启用Live Link和设置连接的更多信息，请参见[Live Link插件](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine)文档。

在虚幻引擎 4.23版之前，**LiveLink骨骼动画组件（LiveLink Skeletal Animation Component）** 被称为 **Live Link组件（Live Link Component）**。

## Live Link预设

虚幻引擎从[Live Link连接](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine#livelinkconnectionwindow)窗口中创建的各种数据源获取Live Link数据。创建后，这些数据源可以保存为 **预设（Presets）**，并可使用 **应用到客户端（Apply to client）** 节点通过蓝图访问这些数据源。

![Live Link apply to client节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a7a7f06-64f0-41cd-96cf-4fd2f5566675/live_link_apply_to_client.png)

可以利用此节点在应用程序启动时加载Live Link预设。

还可通过Live Link面板中的预设（Presets）按钮激活Live Link预设，或在项目设置（Project Settings）中通过在菜单的 **插件 - Live Link（Plugins - Live Link）** 部分中设置 **默认Live Link预设（Default Live Link Preset）** 来激活Live Link预设。也可使用命令行'LiveLink.Preset.Apply Preset=/Game/Folder/MyLiveLinkPreset.MyLiveLinkPreset'应用预设。

## Live Link组件

### Live Link骨骼动画组件

当你从 **组件（Components）** 面板为Actor的蓝图添加Live Link骨骼动画组件后，该组件不会成为其他组件的子节点。它会单独保存在你的蓝图内，使你可以访问 **On Live Link Updated Event**。

![Live Link组件细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9156308f-e735-4e2f-9642-349d873e60c0/onlivelinkupdatedcomponent.png)

每次更新组件（包括编辑器内）时都会触发On Live Link Updated事件。

![On Live Link Updated节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e5c5022-c478-42b1-815d-045b6b3e2eea/livelinkupdated.png)

On Live Link Updated其实取代了 **Tick事件（Tick Event）**，不同点在于，它还可以在编辑器内运行。例如，如果你希望在编辑器内实时驱动一些数据，则可以使用此节点。

### Live Link控制器组件

Live Link控制器组件位于角色蓝图中，允许你使用Live Link控制器。这些控制器会自动从Live Link对象获取数据，并通过Live Link控制器将这些数据应用到Actor中对应的组件。

![Live Link组件控制器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e861a2d5-0382-4445-87b3-b5805d653847/live_link_component_controller.png)

## 使用Live Link控制器

Live Link控制器能快速获取Live Link数据，并流送给场景中的Actor。每个控制器都会读取来自Live Link对象的数据，并自动应用到你选择的Actor身上。根据情况，控制器分为三种不同种类：

-   变换（Transform）
-   摄像机（Camera）
-   光源（Light） 有关这些不同的Live Link控制器的详细信息，请见下文。

### 变换

变换控制器能从Live Link对象快速捕获变换数据，并将这些数据应用于关卡中的Actor。

![Live Link变换控制器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b865f4a-a3b2-4104-9de8-f3c87a34e670/live_link_transform.png)

此控制器提供以下选项：

设置

说明

**世界变换（World Transform）**

将组件的变换设置为世界空间。取消选中则意味着设置为本地空间。

**使用缩放（Use Scale）**

使用来自Live Link的缩放数据。

**扫描（Sweep）**

扫描根组件并检查阻挡碰撞，沿途触发重叠，如果阻挡，则会在未达目标时停止。

**传送（Teleport）**

传送物理状态（如果启用了物理碰撞）。

-   如果选中，则物理速度保持不变。
-   如果未选中，则基于位置变化更新物理速度。

### 摄像机

摄像机控制器会将Live Link对象中的摄像机设置和移动数据以及摄像机角色直接应用到你关卡中的摄像机Actor。

![Live Link摄像机控制器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02955982-3750-4e85-bdaf-6dec8a98f0bf/live_link_camera.png)

可以做动画处理的摄像机设置包括：

-   视野（以角度为单位）
-   长宽比（宽/高）
-   焦距
-   以F值计算的摄像机孔径
-   摄像机焦距（厘米）（仅手动聚焦）
-   摄像机投影模式（视角、正交等）

### 光源

光源控制器将Live Link对象中的光源设置以及光源角色直接应用到你关卡中的光源Actor。

![Live Link光源控制器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64be280e-0a1e-4a42-9698-5d39ebeac0be/live_link_light.png)

可以做动画处理的光源设置包括：

-   色温（以开尔文为单位）。
-   总能量（勒克斯值）。
-   滤色。
-   内锥角（聚光源的角度）。
-   外锥角（聚光源的角度）。
-   光源可见影响（适用于点光源和聚光源）。
-   光源形状的软半径（适用于点光源和聚光源）。
-   光源形状的长度（适用于点光源和聚光源）。

可以使用外部插件添加或创建额外的控制器。有关外部插件的更多信息，请参见[插件](/documentation/404)文档。

### 将控制器应用于Actor

要应用Live Link控制器，首先将Live Link控制器组件添加到你的Actor：

![将Live Link控制器应用到立方体静态网格体Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6fabc5e-9ddf-452f-9fa5-c2b39b3fdadd/apply_controller_to_actor.png)

这一部分要求你已连接Live Link源。有关连接源的更多信息，请参见[Live Link插件](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine)文档。

通过 **细节（Details）** 面板使用以下步骤添加组件：

1.  选择关卡中的 **Actor**。
2.  在 **细节（Details）** 面板中，点击 **+添加组件（+ Add Component）** 按钮，并搜索 **Live Link控制器（Live Link Controller）** 组件。
3.  添加后，从组件列表选择该组件，打开 **主题表示（Subject Representation）** 下拉菜单。从列表中选择要作为此Actor数据源的对象。虚幻将基于你的选择为你选择 **要控制的组件（Component to Control）**。必要时可以调整。

设置控制器后，你的Actor将开始从选定Live Link对象自动接收数据。

## 常见蓝图节点

可以通过各种蓝图节点访问Live Link数据。

### Get Live Link Subjects

有时你需要获取一个对象列表才能使用 **Evaluate Live Link Frame** 节点。这种情况下，你可以使用 **Get Live Link Subjects**：

![get live link subjects蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22c3efa5-2989-4e85-adba-49f382f1a3f2/get_live_link_subjects.png)

这将返回Evaluate Live Link Frame函数认为有效的一组对象。

### Evaluate Live Link Frame

调用Evaluate Live Link Frame函数可以获取与所提供的对象名称关联的Live Link数据。此函数提供当前帧是否有效的执行引脚，以及可以从 **数据结果（Data Result）** 输出中访问的静态和帧数据。此数据由选择用于评估对象的角色类型所确定。

下例显示直接从数据结构引脚访问的数据。

![使用连接的输出评估Live Link Frame蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fae39b04-5fc2-4433-8356-d0d5e02f383c/evaluate_live_link_frame.png)

### 使用来自Evaluate Live Link Frame的数据

Evaluate Live Link Frame可以使用多个蓝图函数评估所提供的数据。结果数据取决于评估的角色。评估动画角色时，会看到以下内容：

-   获取基本数据（Get Basic Data）
-   获取曲线（Get Curves）
-   获取元数据（Get Metadata）
-   获取根变换（Get Root Transform）
-   按索引获取变换（Get Transform by Index）
-   按名称获取变换（Get Transform by Name）
-   变换数量（Number of Transforms）
-   变换名称（Transform Names）

### Get Basic Data

**Get Basic Data** 节点将返回当前对象帧中所存对象的基本结构。

![get basic data蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17cbc406-a6dc-46da-b4c2-5e81577e327e/get_basic_data.png)

### Get Curves

**Get Curves** 函数可以获取所有混合形状（Blend Shape）或动画曲线（Animated Curve），并将名称映射返回到各个条目的值。

![get curves节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e05d0095-00ac-4475-be05-adcc00aa01e4/getcurves.png)

你可以使用 **查找（Find）**，并输入一个名称（Name）以检索某个曲线的值（或使用布尔值确定是否找到了该值）。

![find map节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04a75164-169f-438b-92dd-70fb4fce27d0/findmaplefteyeopen.png)

### Get Metadata

**Get Metadata** 函数返回对象帧中存储的对象元数据结构，你可拆分该结构以检索信息：

![get metadata节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6447475-6901-4e77-9df8-bbce8b57d554/getmetadata.png)

字符串元数据是指定字符串在对象上的映射，例如你可能需要将某个要流送对象的类型作为一个指定字符串传递。元数据还包括 **场景时间码（Scene Timecode）** 和 **场景帧率（Scene Framerate）**，你可拆分其结构以获取所需信息。

输出

说明

**字符串元数据（String Metadata）**

指定字符串的映射，用于提供有关某个帧或对象的额外信息，例如"类型（Type）"："摄像机（Camera）"。

**场景时间码（Scene Timecode）**

与当前帧关联的时间码值。

并不保证其唯一性，例如在MotionBuilder中编辑单个帧会导致为多个帧发送该帧的时间码。

**场景帧率（Scene Framerate）**

场景时间码对应的帧率。

### Get Root Transform

**Get Root Transform** 函数将对象帧的根变换以Live Link变换的形式返回（如果没有变换，则返回身份）。

![get root transform节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4361b990-0534-420b-9130-3ce2c169822e/roottransformlivelink.png)

这将返回一个Live Link变换而非标准变换，因为可以在上面调用其他函数（下文中介绍）：

函数

说明

**子项计数（Child Count）**

返回给定Live Link变换的子项数。

**组件空间变换（Component Space Transform）**

返回给定Live Link变换（相对于你的型号的根）的根空间中的变换值。

**获取子项（Get Children）**

返回给定Live Link变换的子Live Link变换数组。

**获取父项（Get Parent）**

如果存在父项，返回父Live Link变换，如果不存在父项，返回身份变换。

**拥有父项（Has Parent）**

返回给定Live Link变换是否有父变换。

**父骨骼空间变换（Parent Bone Space Transform）**

返回给定Live Link变换的父空间中的变换值（它的内部存储方式，并无论父骨骼如何，均与之相关联）。

**变换名称（Transform Name）**

返回给定Live Link变换的名称。

### Get Transform By Index

**Get Transform By Index** 函数返回指定索引处的某个对象帧中存储的Live Link变换（如果变换索引无效，此函数返回一个身份变换）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e2d1bb4-94be-4a74-bfbe-e8178357ee42/livelinktransformindex.png)

### Get Transform by Name

**按名称获取变换（Get Transform by Name）** 函数类似于 **按索引获取变换（Get Transform by Index）**，但获取变换名称（Transform Name）数据。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33d01596-ee88-4f84-9f05-01718f2264bd/gettransformbyname.png)

### Number of Transforms

**Number of Transforms** 函数这将返回对象帧内的变换数。

![number of transforms节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b30efc9-f562-47a4-95e8-97944ef28ef6/livelinknumoftransforms.png)

其中一种使用情况是与 **按索引获取变换（Get Transform By Index）** 结合使用，以循环并检索你的每个Live Link变换（类似于下例）：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c94e7060-6304-4bff-b049-608945e056e0/loopingthroughtransforms-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c94e7060-6304-4bff-b049-608945e056e0/loopingthroughtransforms-1.png)

点击查看大图。

### Get Transform Names

**Get Transform Names** 函数返回某帧中所有变换的名称数组。

![get transform names节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/893adaf6-6d75-4438-b579-dfe3a19c3a7b/gettransformnames.png)

## 使用蓝图应用Live Link预设

蓝图与Live Link的一个常见用法是，在运行时使用 **应用到客户端（Apply to client）** 节点将Live Link预设分配到骨骼网格体：

![Apply to client节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3162adf-4325-41e0-a21f-dd931685ace8/apply_to_client.png)

1.  首先在Live Link面板中创建Live Link预设。有关预设的更多信息，请参见[Live Link插件](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine)文档。
2.  在角色蓝图中新建变量，在 **Details** 面板中将 **变量类型（Variable Type）** 设置为 **Live Link预设（Live Link Preset）**，从而创建预设的引用。
3.  编译你的蓝图，将新变量的默认值设置为你保存的Live Link预设。
4.  将该变量拖到你的蓝图中，并从菜单中选择 **获取（Get）**。
5.  从该变量拖开引线，并搜索 **应用到客户端（Apply to client）** 节点。
6.  将 **Event Begin Play** 节点连接到 **应用到客户端（Apply to client）**。

-   [live link](https://dev.epicgames.com/community/search?query=live%20link)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Live Link预设](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#livelink%E9%A2%84%E8%AE%BE)
-   [Live Link组件](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#livelink%E7%BB%84%E4%BB%B6)
-   [Live Link骨骼动画组件](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#livelink%E9%AA%A8%E9%AA%BC%E5%8A%A8%E7%94%BB%E7%BB%84%E4%BB%B6)
-   [Live Link控制器组件](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#livelink%E6%8E%A7%E5%88%B6%E5%99%A8%E7%BB%84%E4%BB%B6)
-   [使用Live Link控制器](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#%E4%BD%BF%E7%94%A8livelink%E6%8E%A7%E5%88%B6%E5%99%A8)
-   [变换](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#%E5%8F%98%E6%8D%A2)
-   [摄像机](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA)
-   [光源](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#%E5%85%89%E6%BA%90)
-   [将控制器应用于Actor](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#%E5%B0%86%E6%8E%A7%E5%88%B6%E5%99%A8%E5%BA%94%E7%94%A8%E4%BA%8Eactor)
-   [常见蓝图节点](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#%E5%B8%B8%E8%A7%81%E8%93%9D%E5%9B%BE%E8%8A%82%E7%82%B9)
-   [Get Live Link Subjects](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#getlivelinksubjects)
-   [Evaluate Live Link Frame](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#evaluatelivelinkframe)
-   [使用来自Evaluate Live Link Frame的数据](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%9D%A5%E8%87%AAevaluatelivelinkframe%E7%9A%84%E6%95%B0%E6%8D%AE)
-   [Get Basic Data](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#getbasicdata)
-   [Get Curves](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#getcurves)
-   [Get Metadata](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#getmetadata)
-   [Get Root Transform](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#getroottransform)
-   [Get Transform By Index](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#gettransformbyindex)
-   [Get Transform by Name](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#gettransformbyname)
-   [Number of Transforms](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#numberoftransforms)
-   [Get Transform Names](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#gettransformnames)
-   [使用蓝图应用Live Link预设](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%93%9D%E5%9B%BE%E5%BA%94%E7%94%A8livelink%E9%A2%84%E8%AE%BE)