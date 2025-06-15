# 虚幻引擎中的控制绑定编辑器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:15:08.716Z

---

目录

![控制绑定编辑器](https://dev.epicgames.com/community/api/documentation/image/420383dc-4bfa-4d19-97d3-3db5d34755f5?resizing_type=fill&width=1920&height=335)

本文介绍了控制绑定编辑器的用户界面、各种工具和功能。

![控制绑定编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ab54bc8-d469-4ed2-a2ae-62315581d203/editoroverview.png)

1.  [**工具栏（Toolbar）**](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F)
2.  [**视口（Viewport）**](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E8%A7%86%E5%8F%A3)
3.  [**绑定层级（Rig Hierarchy）**](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E7%BB%91%E5%AE%9A%E5%B1%82%E7%BA%A7)
4.  [**绑定图表（Rig Graph）**](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E7%BB%91%E5%AE%9A%E5%9B%BE%E8%A1%A8)
5.  [**细节面板（Details）**](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF)

## 工具栏

![控制绑定工具栏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/842695fb-b9d3-45fd-9628-6d152a3e0e5c/toolbar.png)

**控制绑定** 工具栏提供了预览和编译控制绑定的相关按钮。这些按钮的具体功能如下所示：

名称

图标

说明

**编译（Compile）**

![控制绑定编译](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/333d6cc3-27fd-4817-9b00-830943b6e29b/toolbarcompile.png)

和 **[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)** 类似，控制绑定必须先 **编译** 才能执行逻辑并保存。点击该按钮可以编译绑定，并会提示该绑定是否需要编译。

只要绑定层级发生了改动，就需要编译。改动包括对控制点、骨骼或空间进行添加、移除、重设父子关系和重命名等操作。创建变量时，也需要重新编译。

当你在视口中操控控制点后，"编译（Compile）"按钮还能重置这些控制点。

**解算方向（Solve Direction）**

![工具栏正向解算](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82ae2b1d-5f98-43bb-b4ee-b15640c8dab3/toolbarsolvedirection.png)

"解算方向（Solve Direction）"用于在不同解算器事件链之间切换。用它来预览不同的[解算方向](/documentation/zh-cn/unreal-engine/control-rig-forwards-solve-and-backwards-solve-in-unreal-engine)。每个选项都关联一个绑定图表（即解算方向事件节点）。选择选项后，即可预览该解算链。

![解算方向菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6be52bc-d78f-4257-975d-fd9383f5548b/solvedirection.png)

点击主按钮可在当前模式与之前所选模式间切换。

**自动编译（Auto Compile）**

![工具栏自动编译](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/898bfd49-338b-48f1-a772-2992036fe8a2/toolbarautocompile.png)

启用 **自动编译（Auto Compile）** ，编译会在绑定图表发生改动后自动进行。这包括创建和链接节点之类的操作。上述所有其他更改仍需要手动编译。

**调试对象（Debug Object）**

![控制绑定编辑器预览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fc9977c-fa9b-4b9b-a43a-7817a16e9249/toolbardebug.png)

该下拉菜单会将控制绑定视口关联到某个正在模拟或运行的控制绑定。这样就能在控制绑定视口中预览控制绑定动画。

**类设置（Class Settings）**

![工具栏类设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8b6d9fe-189b-4202-a584-7bee91af3b1e/toolbarclass.png)

点击"类设置（Class Settings）"按钮后，蓝图类设置会在[细节](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF)面板中显示。其中包含 **形状库（Shape Libraries）** 属性，它可以更改你在绑定时使用的控制点形状。请访问[控制点形状和控制点形状库](/documentation/zh-cn/unreal-engine/control-shapes-and-control-shape-library-in-unreal-engine)页面，了解有关该功能的更多信息。

![形状库](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b6f0f26-9809-47f4-981d-ac9d53292000/shapelibrary.png)

你还可以访问控制绑定Python命令，如[Python上下文](/documentation/zh-cn/unreal-engine/control-rig-python-scripting-in-unreal-engine#python%E4%B8%8A%E4%B8%8B%E6%96%87)和[复制Python脚本](/documentation/zh-cn/unreal-engine/control-rig-python-scripting-in-unreal-engine#%E5%A4%8D%E5%88%B6python%E8%84%9A%E6%9C%AC).

## 视口

你可以在视口中完成以下操作：

-   预览控制绑定节点的交互效果。
-   设置不同的显示模式和调试显示。
-   选择和操控控制点。
-   使用顶部工具栏更改预览模式。

![控制绑定视口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/572c10a0-bc5c-480d-b687-9c5db4562025/viewport.png)

**视图选项（View Options）** 菜单包含以下控制绑定设置：

![控制绑定视图选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a64c556-8042-4f42-a1ac-8f23e5206cef/viewoptions.png)

名称

说明

**显示Null（Display Nulls）**

在视口中显示[Null](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine)的可选择轴。

![控制绑定显示Null](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/741df9d0-9d8e-4947-8207-7e243571d851/nulls.png)

**选择时显示轴（Display Axes On Selection）**

在你选择绑定元素时显示本地轴。

![控制绑定在选择时显示轴](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/888b82e1-f545-420b-a3d4-aa54eab2b679/axisdisplay.png)

**轴比例（Axes Scale）**

从 **显示Null（Display Nulls）** 或 **在选择时显示轴（Display Axes On Selection）** 选项绘制轴时轴显示的大小。

![控制绑定轴比例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/967e847f-e26d-4686-94f0-8808138001f6/nulls.png)

**骨骼半径（Bone Radius）**

骨骼可见时骨骼的大小。若要显示骨骼，请将骨骼选中或从 **角色（Character）> 骨骼（Bones）** 菜单中设置。

![控制绑定骨骼半径](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77241134-144a-4c90-aeb2-348d97697e34/bonesize.png)

**引脚控制空间（Pin Control Space）**

控制引脚值时，你可以从此处选择一个元素，将操控器偏移为相对于不同的元素。

## 绑定层级

**绑定层级（Rig Hierarchy）** 面板类似大纲视图，可以查看控制点结构并选中控制点。这也是你新建[控制点、骨骼和Null](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine)的主要区域。

![控制绑定层级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aab3378a-3e5b-4781-a109-5882ab884d47/righierarchy.png)

要创建这些元素，在面板中点击右键，选择 **新建（New）> 控制点（Control）、骨骼（Bone）或Null** 。你的选择将决定这些元素的创建位置。如果未做任何选择，则将在原点(0,0,0)创建新元素。

![新建控制点骨骼Null](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef245941-2037-447b-af50-ee6e3cd273fc/newcontrol.png)

上下文菜单包含以下命令：

![绑定层级右键点击菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8801ddc9-3eff-4f49-8755-506c104c9191/righierarchycontext.png)

名称

说明

**新建（New）**

用于创建新 **控制点（Controls）**、**骨骼（Bones）** 或 **Null** 的创建菜单。

**删除（Delete）**

删除当前选择。

**复制（Duplicate）**

复制当前选择。

**重命名（Rename）**

重命名当前选择。

**镜像（Mirror）**

复制你当前所选的元素，并沿轴镜像该副本。点击后，界面上将显示对话框窗口，你可以在其中指定希望镜像操作如何运作。

![控制绑定镜像控制点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f25627d-eb34-48be-8b09-d4b13b5a0bfb/mirror.png)

-   **镜像轴（Mirror Axis）** 是镜像时所依据的轴。对于虚幻引擎中面向Y前向的字符，你可以将此项保持为 **X** 的默认值。
-   **要翻转的轴（Axis to Flip）** 是为了正确镜像旋转而要旋转180度的轴。对于虚幻引擎中面向Y前向的字符，你可以将此项保持为 **Z** 的默认值。
-   **搜索（Search）** 可用于指定你要搜索以替换的关键字或字母。如果你要使用后缀"\_left"镜像控制点，则需要在此处写"left"。
-   **替换（Replace）** 可用于指定你要替换 **搜索（Search）** 中所使用文本的关键字或字母。如果你要使用后缀"\_left"镜像控制点，则需要在此处写"right"。

**测试空间切换（Test Space Switching）**

打开对话框窗口以预览控制点的[空间切换](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine)行为。

![控制绑定测试空间切换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/268d9e2a-78b7-46ce-b0cb-12f90617aa58/testspaceswitch.png)

-   **父节点（Parent）** 是默认选项。控制点将按照父节点所在的空间进行改动。
-   **世界（World）** 使控制点脱离父节点的影响，并与世界空间关联。
-   点击 **添加(+)（Add (+)）** 按钮，添加其他控制点作为父节点。

**复制（Copy）**

复制当前选择，包括本地和全局变换，可以与 **粘贴本地（Paste Local）** / **全局变换（Global Transform）** 一起使用。

**粘贴（Paste）**

粘贴当前选择。

**粘贴本地变换（Paste Local Transform）**

粘贴当前复制的控制点的本地变换。

**粘贴全局变换（Paste Global Transform）**

粘贴当前复制的控制点的世界变换

**重置变换（Reset Transform）**

将当前选择的控制点重置回初始变换。

**重置所有变换（Reset All Transforms）**

将所有控制点重置回初始变换。

**从当前位置设置初始变换（Set Initial Transform from Current）**

在视口中移动变换后，点击此项会将新位置设置为新的初始变换。

**从最近骨骼设置初始变换（Set Initial Transform from Closest Bone）**

使用此命令会将当前所选控制点捕捉到最近的骨骼，并将该位置设置为初始变换。这适用于将控制点与骨骼对齐。

**从当前位置设置形状变换（Set Shape Transform From Current）**

如果你在变换控制点，执行此命令会将控制点的枢轴点重置回初始变换，但保持控制点形状的当前视效位置。如果你想要自定义控制点的视效位置，同时保持枢轴点不变，则此命令很有用。

**取消父子关系（Unparent）**

将当前所选的元素移至层级顶部。

**导入（Import）**

将骨架层级导入到当前绑定。

**刷新（Refresh）**

从所选网格体刷新现有初始变换。这仅在找到节点时更新。

## 我的蓝图

**我的蓝图（My Blueprint）** 面板类似于[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)中的我的蓝图面板，包含控制绑定的所有 **函数（Functions）** 和 **变量（Variables）** 。控制绑定中的变量主要用于在绑定图表中控制逻辑，而不是让关卡中的实例公开某个变量。

![控制绑定我的蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aeef02ba-fde1-4cd1-b306-87580dda6688/mybp.png)

## 执行堆栈

**执行堆栈（Execution Stack）** 面板可用于预览图表中操作的顺序。你可用它调试节点和评估事件顺序。

![控制绑定执行堆栈](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bc03863-5d82-4dec-802e-bee7ba00fbf6/execution.png)

右键点击一个执行节点并选择 **聚焦所选项（Focus on Selection）** ，即可在绑定图表中对准当前节点。你还可以双击节点对准它。

## 曲线容器

**曲线容器（Curve Container）** 面板会列出 **骨架（Skeleton）** 中的 **动画曲线（Anim Curves）**，并允许你在绑定图表中控制曲线。

![控制绑定曲线容器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02e06354-b57f-4ac0-bfd0-9a54d7cdb98d/curves.png)

你可以使用 **Get Curve Value** 和 **Set Curve Value** 节点在绑定图表中引用曲线。

![控制绑定获取设置曲线值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9ba2374-e9bc-4073-b131-78a98a4b1a31/curveref.png)

## 绑定图表

**绑定图表（Rig Graph）** 用于编写控制绑定的行为脚本。

将层级节点从绑定层级（Rig Hierarchy）面板拖到图表中，选择所需的引用类型，即可引用该节点。

![控制绑定图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46767c2c-6bf6-4dd3-8913-6a9555b56c9b/riggraph1.png)

右键点击也可创建节点。在上下文菜单中搜索并找到所需节点。

![控制绑定图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/857cb212-9c3c-498c-8f63-7721a285d40a/riggraph2.png)

类似于[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)，多个节点可以折叠为组或 **函数（Functions）**，方法是右键点击所选节点，然后选择 **折叠节点(Collapse Nodes)** 或 **折叠为函数（Collapse to Function）** 。

![控制绑定函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/604c2e66-a220-4390-9efe-8c59c1f0db9e/collapse1.png)

函数可以在 **我的蓝图（My Blueprint）** 面板中的 **函数（Functions）** 类别中访问。你可以通过函数更好地编排大型图表，复用逻辑，并轻松在控制绑定之间共享功能。

![控制绑定函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0874776a-ed12-4c93-9ddf-9d2b10f0499e/collapse2.png)

## 细节面板

**细节（Details）** 面板包含控制绑定编辑器中选中内容的相关信息。这些内容可能包括控制点、骨骼和绑定图表节点。选中控制点后，将显示以下属性：

![控制绑定属性细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/636bb059-b5e0-42b1-88a0-987c05d34a69/details.png)

名称

说明

**名称（Name）**

所选绑定元素的名称。

**显示名称（Display Name）**

控制点在[Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)和[动画大纲视图](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#animoutliner)中所显示的名称。如果未使用，则名称将退回 **名称（Name）** 中指定的值。

**控制点类型（Control Type）**

要使用的控制点[类型](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E6%8E%A7%E5%88%B6%E7%82%B9%E7%B1%BB%E5%9E%8B)。在你希望控制点仅影响特定值时，例如控制点仅旋转、平移或提供单个属性时，这可用于限制或更改控制点的数据。

**可制作动画（Animatable）**

确定控制点在Sequencer中是否可制作动画。如果你的绑定包含纯视效的控制点，这会很有用。

**可用空间（Available Spaces）**

这是一个数组，你可以在其中为控制点添加[预定义自定义空间](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine#%E9%A2%84%E5%AE%9A%E4%B9%89%E8%87%AA%E5%AE%9A%E4%B9%89%E7%A9%BA%E9%97%B4)，用于[空间切换](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine)。

**绘制限值（Draw Limits）**

如果[变换限值](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%8F%98%E6%8D%A2%E9%99%90%E5%80%BC)用于所选控制点，则绘制调试行。

![控制绑定绘制限值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9b9b0cf-fdee-4e1e-8a3e-9444c86f29e7/drawlimits.gif)

**变换（Transform）**

显示所选绑定元素的不同[变换类型](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%8F%98%E6%8D%A2%E7%B1%BB%E5%9E%8B)。骨骼和Null仅显示 **初始（Initial）** 和 **当前（Current）**，而控制点将显示 **初始（Initial）**、**当前（Current）**、**偏移（Offset）** 和 **最小值/最大值（Min/Max）** 限值。

**形状（Shape）**

**形状（Shape）** 类别包含用于为所选控制点[自定义形状](/documentation/zh-cn/unreal-engine/control-shapes-and-control-shape-library-in-unreal-engine)的属性。

## 预览场景设置

**预览场景设置（Preview Scene Settings）** 面板包含用于控制骨骼网格体、动画和视口环境设置的属性。

![控制绑定预览场景设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0dbc823d-6efb-4227-b786-60de08a62599/previewsettings.png)

以下属性可用于调整控制绑定视口：

名称

说明

**预览控制器（Preview Controller）**

使用预览控制器在视口中播放动画。如果你要在角色播放动画时测试控制点的行为，或者测试 **[反向解算](/documentation/zh-cn/unreal-engine/control-rig-forwards-solve-and-backwards-solve-in-unreal-engine)** 行为，这会很有用。

![控制绑定预览控制器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a623c9aa-495d-425b-995c-90c8d5325a6e/previewcontroller.gif)

**预览网格体（Preview Mesh）**

要用于视口中角色的骨骼网格体。你可以将此改为带有兼容骨架的其他网格体。

**服装模拟工厂（Clothing Simulation Factory）**

要在视口中使用的布料模拟。

**允许不同骨架（Allow Different Skeletons）**

如果启用此属性，你可以在 **预览网格体（Preview Mesh）** 或 **骨骼网格体（Skeletal Meshes）** 属性中选择带有不兼容骨架的骨骼网格体。

**允许自定义AnimBP覆盖（Allow Custom AnimBP Override）**

使用预览集合时，允许动画蓝图使用这些集合覆盖。

**更多网格体（Additional Meshes）**

在此处指定 **预览集合（Preview Collection）**。

**骨骼网格体（Skeletal Meshes）**

要添加到视口的更多网格体。如果你使用的是[模块化角色](/documentation/zh-cn/unreal-engine/working-with-modular-characters-in-unreal-engine)，这会很有用。

-   [editor](https://dev.epicgames.com/community/search?query=editor)
-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [工具栏](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F)
-   [视口](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E8%A7%86%E5%8F%A3)
-   [绑定层级](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E7%BB%91%E5%AE%9A%E5%B1%82%E7%BA%A7)
-   [我的蓝图](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E6%88%91%E7%9A%84%E8%93%9D%E5%9B%BE)
-   [执行堆栈](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E6%89%A7%E8%A1%8C%E5%A0%86%E6%A0%88)
-   [曲线容器](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E6%9B%B2%E7%BA%BF%E5%AE%B9%E5%99%A8)
-   [绑定图表](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E7%BB%91%E5%AE%9A%E5%9B%BE%E8%A1%A8)
-   [细节面板](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF)
-   [预览场景设置](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E9%A2%84%E8%A7%88%E5%9C%BA%E6%99%AF%E8%AE%BE%E7%BD%AE)