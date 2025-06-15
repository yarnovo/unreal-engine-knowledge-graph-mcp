# 虚幻引擎MG UI设计器快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:17:21.674Z

---

目录

![UMG UI设计器快速入门](https://dev.epicgames.com/community/api/documentation/image/ad320d23-5a42-4252-b8ea-19457e6013ff?resizing_type=fill&width=1920&height=335)

在本 **快速入门指南** 中，您将了解如何使用 **虚幻示意图形界面设计器（Unreal Motion Graphics UI Designer）(UMG)** 实现一些基本的游戏中HUD元素和前端菜单。你将了解如何创建动态元素：血条、能量条和弹药数量，还将学习如何将它们添加到 **视口** 中。

所有的操作都一步一步详细介绍。如果您从未使用过 **虚幻引擎**，建议您首先熟悉阅读[关卡设计快速入门](/documentation/zh-cn/unreal-engine/level-designer-quick-start-in-unreal-engine)。其中您可以找到使用UE工作的基本知识和术语。另外，本教程还包含了相关的延伸阅读链接。如有需要，请查阅这些链接。

## 1 - 必要的项目设置

在本教程中，我们将在启用 **初学者内容包（Starter Content）** 的情况下使用 **蓝图第一人称（Blueprint First Person）** 模板。

角色在游戏开始时没有武器。拿到武器后，画面就会出现弹药提示。因此，需要用到两个控件：HUD和HUD\_AmmoCount。你要调整HUD控件，让它在游戏开始时显示角色的血条和能量条，而HUD\_AmmoCount控件则用于在角色使用武器时显示弹药。

1.  创建 **控件蓝图**。单击 **内容浏览器（Content Browser）** 中的 **新增（Add New）** 按钮，然后在 **用户界面（User Interface）** 下选择 **控件蓝图（Widget Blueprint）** 并将其命名为 **HUD**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8928686-2e16-4caf-9873-05742dd2d6af/01-01_createwidgetblueprint.png)
    
    控件蓝图可用于创建并设置UI元素，例如HUD、菜单等等。在控件蓝图中，你可以设置UI布局，并编写UI逻辑。
    
    有关控件蓝图的更多信息，请参阅[UMG控件蓝图](/documentation/zh-cn/unreal-engine/level-designer-quick-start-in-unreal-engine)文档。
    
2.  再创建三个控件蓝图，分别命名为 **HUD\_AmmoCount** 、 **主菜单（MainMenu）**、**暂停菜单（PauseMenu）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/603ab5c8-fffe-43e6-bee7-f6c7545150ac/01-02_widgetsyouneed.png)
3.  新建一个 **关卡**。**右键单击** **内容浏览器（Content Browser）**，并创建一个名为 **主关卡（Main）** 的新 **关卡（Level）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5144b76b-b2c8-4a72-8487-ca1bcc5a54b9/01-03_createlevel.png)
    
    你会在本指南的稍后部分使用它进行主菜单（Main Menu）设置。
    

### 修改BP\_FirstPersonCharacter蓝图

1.  在 **内容浏览器（Content Browser）** 中，打开 **Content/FirstPerson/Blueprints** 文件夹下的 **第一人称角色（FirstPersonCharacter）** 蓝图。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82a71214-472b-41b0-bb0b-245c0b03267d/01-11_firstperbp.png)
    
    这就是你在游戏中操控的 **角色的蓝图**。你将调整它，让它添加HUD控件并在视口中显示HUD控件。
    
2.  在 **蓝图编辑器** 中，单击 **添加变量（Add Variable）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/061c1309-b633-4331-8e15-cc16c70dad76/01-12_addvariable.png)
3.  在新变量的 **细节（Details）** 面板中，将其命名为 **生命值（Health）**，将其更改为 **浮点（Float）** 变量类型。将 **默认值（Default Value）** 设置为 **1.0**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9452918-01ec-4944-b7da-64044c3b3f9c/01-13_healthdetail.png)
    
    你将通过这个变量来调整HUD控件中的玩家角色的生命值。
    
4.  创建另一个名为 **能量（Energy）** 的 **浮点（Float）** 变量，并将其 **默认值（Default Value）** 设置为 **1.0**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac453efc-bdda-4e5e-93b2-a41c97e41bf5/01-14_energydetail.png)
    
    你将通过这个变量来调整HUD控件中的玩家角色的能量值。
    
    在输入默认值前，你需要单击工具栏中的 **编译（Compile）** 按钮以编译蓝图。
    
5.  创建另一个名为 **弹药（Ammo）** 的 **整数（Integer）** 类型的变量，并将其 **默认值（Default Value）** 设置为 **25**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd89a944-73f1-457e-b308-9e0a32f98f16/01-15_ammodetail.png)
6.  再创建一个名为 **最大弹药量（MaxAmmo）** 的 **整型（Integer）** 变量，并将其 **默认值（Default Value）** 设置为 **25**。
    
7.  在 **图表（Graph）** 窗口中点击右键，添加 **Event Begin Play** 节点。然后添加 **创建控件（Create Widget）** 节点。将 **类（Class）** 设置为 **HUD** 控件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80bc06a9-f821-49ed-8c9b-9b072671f3e2/01-16_createhudwidget.png)
8.  对于 **创建HUD控件（Create HUD Widget）** 的 **返回值（Return Value）**，请选择 **提升为变量（Promote to Variable）** 并将其命名为 **HUD引用（HUD Reference）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8af42581-f5ba-4c1a-8851-3a2739926346/01-17_hudtovar.png)
    
    执行此操作后，即可在游戏开始时创建HUD控件，并将其设置为变量以供稍后调用。如果需要通过蓝图调用某些函数或设置HUD控件的属性，这种方法很有用。例如，如果需要在游戏暂停时隐藏HUD，则可以通过此变量访问HUD。
    
9.  将 **添加到视口（Add to Viewport）** 节点连接到 **设置（Set）** 节点的输出引脚。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb9e53a3-252f-4cae-9d14-3304b8d404d9/01-18_beginplay.png)
    
    执行此操作后，从游戏过程开始便已经将HUD控件添加到了视口。
    
10.  **编译（Compile）** 并 **保存（Save）** **BP\_FirstPersonCharacter** 蓝图，然后将其关闭。
    

### 调整BP\_Rifle蓝图

调整BP\_Rifle蓝图的过程与调整BP\_FirstPersonCharacter蓝图的过程类似。如需了解更多细节，请参阅上文的[调整BP\_FirstPersonCharacter蓝图](/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine#%E8%B0%83%E6%95%B4bp_firstpersoncharacter%E8%93%9D%E5%9B%BE)小节。

1.  在 **内容浏览器（Content Browser）** 中，打开位于 **Content/FirstPerson/Blueprints** 文件夹下的 **BP\_Rifle** 蓝图。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f551dba6-d7a6-44bf-bca3-bdfde643446c/01-21_riflebp.png)
2.  找到 **在组件开始重叠时（SphereCollision）（On Component Begin Overlap (SphereCollision)）** 节点。**右键单击** 相应的执行引脚，然后选择 **断开所有引脚连接（Break All Pin Link(s)）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f025f01f-1430-4ba9-9b88-a3f56ade37d2/01-22_breakalllinks1.png)
3.  拖动 **在组件开始重叠时（SphereCollision）（On Component Begin Overlap (SphereCollision)）** 节点的执行引脚，添加一个 **创建控件（Create Widget）** 节点。将 **类（Class）** 设置为 **HUD\_AmmoCount** 控件。
    
4.  对于 **创建HUD控件（Create HUD Widget）** 的 **返回值（Return Value）**，请选择 **提升为变量（Promote to Variable）** 并将其命名为 **HUD弹药计数引用（HUD Ammo Count Ref）**。
    
5.  将 **添加到视口（Add to Viewport）** 节点连接到 **设置（Set）** 节点的输出引脚。
    
6.  将 **添加到视口（Add to Viewport）** 节点的执行引脚与 **转换为BP\_FirstPersonCharacter（Cast to BP\_FirstPersonCharacter）** 节点的执行引脚连接起来。脚本应如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6348c1ea-a5b8-469d-8aae-ecdde45d1b5d/01-23_oncompevent.png)
    
    执行此操作后，便将HUD\_AmmoCount控件添加到了视口，以便在角色携带武器时进行计数。
    
7.  **编译（Compile）** 并 **保存（Save）** **BP\_Rifle** 蓝图，然后将其关闭。
    

### 调整BP\_FirstPersonCharacter蓝图中的角色变量

本章介绍如何调整声明的变量并将它们添加到蓝图中。

1.  在 **BP\_FirstPersonCharacter** 的蓝图编辑器中，按住 **Alt** 将 **能量（Energy）** 变量拖入 **图表（Graph）** 窗口，并将其放置在"跳跃（Jump）"脚本的旁边。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f62abef-6d33-4bd8-86b2-f52a0971fe9c/01-31_dragenergy.png)
2.  按住 **Ctrl**，拖入 **能量（Energy）** 变量副本，并将其连接到 **Float - Float** 节点，值设置为 **0.25**，连接方式如图所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1bdfff90-0cbc-4ba1-94a9-2295467d9fe1/01-32_jump.png)
    
    借助此脚本，每次角色跳跃时，都会在当前能量值的基础上将能量值减少0.25。
    
3.  为 **生命值（Health）** 变量设置相同的脚本，但是使用 **F** 按键事件（或任何其他按键事件）进行测试。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3108c69f-a998-4cd5-bcfa-5c936af66633/01-33_testhealth.png)
    
    借助此脚本，可以测试是否每次按 **F** 时都会在当前生命值的基础上将生命值减少0.25。
    
4.  **编译（Compile）** 并 **保存（Save）** **BP\_FirstPersonCharacter** 蓝图，然后将其关闭。
    
    要添加重新装弹功能，请执行以下操作。添加 **R按键事件（R Key Event）**。按住 **Alt** 拖动 **弹药（Ammo）** 变量。按住 **Ctrl** 拖动 **最大弹药数（Max Ammo）** 变量。如下图所示进行连接。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b753aa16-80c6-4243-a5da-260d75ce46d2/01-46_reloadammo.png)
    

### 调整BP\_Rifle蓝图中的角色变量

1.  打开 **BP\_Rifle** 蓝图。找到 **OnFireProjectile自定义事件（OnFireProjectile Custom Event）**。**右键单击** 相应的执行引脚，然后选择 **断开所有引脚连接（Break All Pin Link(s)）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5105ebc-8aca-4b1e-8a82-375e6b256475/01-41_breakalllinks2.png)
2.  在此节点附近 **右键单击**，然后添加 **分支（Branch）** 节点。
    
3.  按住 **Ctrl** 将 **FirstPersonCharacterReference** 变量的副本拖入 **图表（Graph）** 窗口。拖动相应的引脚并选择 **获取弹药（Get Ammo）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7efb671e-bdc3-4c87-943a-3d4fce9ba77b/01-42_addammo.png)
4.  添加 **大于（Greater）** 运算符节点，设置为 **0**，并进行如下所示的连接。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1c830f7-b678-4e41-b73c-ac71930bb012/01-43_onfirecondit.png)
    
    由于此脚本，选择的角色可以在弹药数大于零时开火。
    
5.  在 **蒙太奇播放（Montage Play）** 节点之后的 **OnFireProjectile自定义事件（OnFireProjectile Custom Event）** 脚本的末尾，按住 **Ctrl** 将 **FirstPersonCharacterReference** 变量的副本拖入 **图形（Graph）** 窗口。拖动相应的引脚并选择 **获取弹药（Get Ammo）**。再次拖动引脚并选择 **设置弹药（Set Ammo）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0de90208-4c95-430a-a839-41f0b7c0c208/01-44_setammo.png)
6.  添加 **减法（Substruct）** 运算符，并将 **弹药（Ammo）** 设置为等于 **弹药 - 1（Ammo - 1）**。脚本应如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08284c1c-e536-4b9d-bc7e-3874b88e2f0d/01-45_ammocountscript.png)
    
    由于此脚本，选择的角色每次开火都会减少弹药。
    
7.  **编译（Compile）** 并 **保存（Save）** **BP\_Rifle** 蓝图，然后将其关闭。
    

## 2 - 显示生命值、能量和弹药

在此步骤中，应在控件中设置"生命值（Health）"、"能量（Energy）"和"弹药（Ammo）"变量的可视化，并调整与游戏过程的关联性。

### 视觉效果：生命值、能量和弹药

要设置HUD控件的可视化，请执行以下操作。

1.  打开您的 **HUD** 控件蓝图，访问 **控件蓝图编辑器（Widget Blueprint Editor）**。执行此操作后，即可创建HUD控件的可视化布局和脚本功能。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ae7af46-e761-421f-bfc9-01728e2d8437/02-01_widgetbpeditor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ae7af46-e761-421f-bfc9-01728e2d8437/02-01_widgetbpeditor.png)
    
    有关控件蓝图编辑器的各个不同方面的更多信息，请参阅[UMG控件蓝图](/documentation/zh-cn/unreal-engine/widget-blueprints-in-umg-for-unreal-engine)。
    
2.  在 **控制板（Palette）** 面板中的 **面板（Panel）** 下找到 **水平方框（Horizontal Box）**，然后将其拖到 **层级（Hierarchy）** 面板中的 **画布面板（Canvas Panel）** 上。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd7eb8f8-d374-41e0-987f-d7d29d46c2a5/02-02_horboxwidget1.png)
    
    **面板（Panel）** 控件有点像其他控件的容器，并为其中的控件提供额外的功能。
    
3.  同样在 **面板（Panel）** 下，将两个 **垂直方框（Vertical Box）** 拖到 **水平方框（Horizontal Box）** 上。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b41b0a44-85fd-48b1-b79d-be38a2b15d75/02-03_widgetstructure1.png)
4.  在 **常见（Common）** 下，将两个 **文本（Text）** 控件拖动到第一个垂直方框上，将两个 **进度条（Progress Bar）** 拖动到第二个垂直方框上。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cff4b9e-dcbc-46fe-b7af-367e29bfaf16/02-04_widgetstructure2.png)
5.  选择 **水平方框（Horizontal Box）**，然后在图表中调整该框大小，并将其放置在窗口的左上角。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2debf66-8f6f-4f42-a206-5652d99927ef/02-05_widgetlocation.png)
6.  选择这两个 **进度条（Progress Bar）**，然后在 **细节（Details）** 面板中将这两者均设置为 **尺寸（Size）** 下的 **填充（Fill）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18915f4a-d5aa-4fb2-83b8-8446c443e10e/02-06_progbardetails.png)
7.  选择包含这些进度条（Progress Bar）的 **垂直方框（Vertical Box）**，然后同样在 **细节（Details）** 面板中将这两者均设置为 **尺寸（Size）** 下的 **填充（Fill）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/383bb945-4059-4319-b922-3656a0e0f536/02-07_vertboxdetails.png)
8.  再次选择 **水平方框（Horizontal Box）**，重新调整其大小，使进度条与文本对齐。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1946cc6e-49ce-46c3-8490-a6667f7c92b2/02-08_horboxwidget2.png)
9.  在 **层级（Hierarchy）** 窗口中选择最顶部的 **文本（Text）** 控件，然后在 **详情（Details）** 面板的 **内容（Content）** 下，输入 **生命值：（Health:）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/542b4da0-b099-4de3-99db-f0e4206a959b/02-09_texthealth.png)
10.  对另一个 **文本（Text）** 控件执行相同的操作，但将它标记为 **能量（Energy）**：图表看起来如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e735aaa3-ce87-40cd-b3a2-0e2e4ed501c5/02-10_healthenergybar.png)
    
    默认情况下，虚幻示意图形文本控件使用虚幻引擎中的字体。这样就可以在虚幻引擎中快速开始工作。但是，这种内置字体有一些局限性。例如，只支持一小部分的语言。在大多数情况下，需要将自定义字体导入资产中。有关设置文本控件以使用自定义字体的更多细节，请参阅[在虚幻引擎用户界面中创建和指定字体](/documentation/zh-cn/unreal-engine/creating-and-assigning-fonts-in-unreal-engine-user-interface)。
    
11.  选择生命值旁边的 **进度条（Progress Bar）**，并在 **详情（Details）** 面板中，将 **填充颜色和不透明度（Fill Color and Opacity）** 设置为绿色。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6b594a2-8a60-4da1-88a5-d950781219a2/02-11_healthcolor.png)
    
    指定颜色时，进度条（Progress Bar）不会改变颜色。这是因为用于填充进度条的 **百分比（Percent）** 值设置为0.0。可以更改这个值来测试不同的颜色。稍后会将这个值关联到角色的"生命值（Health）"变量值。
    
12.  还要为 **能量（Energy）** 条设置"填充颜色（Fill Color）"和"不透明度（Opacity）"（例如，橙色）。
    
13.  HUD控件布局应如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3cdc378-91c3-4beb-94ac-e482924962ce/02-12_hudlayout.png)
14.  **编译（Compile）** 并 **保存（Save）** **HUD** 控件蓝图，然后将其关闭。
    

### 视觉效果：弹药

要设置HUD\_AmmoCount控件的可视化，请执行以下操作。

1.  打开 **HUD\_AmmoCount** 控件蓝图以访问 **控件蓝图编辑器（Widget Blueprint Editor）**。
    
2.  使用同样的方式向 **层级（Hierarchy）** 面板添加控件。布局结构应如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d54a5690-65af-445b-8642-a1f5f315e448/02-13_widgetstructure3.png)
3.  选择 **图表（Graph）** 中的 **水平方框（Horizontal Box）**，调整方框的尺寸，并将其放置在窗口的右上角。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cac34240-9b8c-45e0-8259-582bc5efc0ea/02-14_widgetammolocation.png)
4.  选择 **水平方框（Horizontal Box）**，然后在 **细节（Details）** 面板中单击 **锚点（Anchors）** 并选择右上角的锚点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87e1d85b-9c5e-4129-87c2-26cf47909391/02-15_widgetammoanchors.png)
    
    借助此锚点，将 **锚点标牌（Anchor Medallion）** 放置在屏幕的右上角。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e4ba9ef-03ee-4bee-a27b-718c07fdadf1/02-16_hudammofinal.png)
    
    由于锚点设置，无论屏幕尺寸如何，都可以固定水平方框位置。调整屏幕尺寸时，控件与锚点标牌之间的距离保持不变。
    
    您可以单击并更改图表内的 **预览大小（Preview Size）** 选项，从而测试不同尺寸的屏幕大。
    
5.  **编译（Compile）** 并 **保存（Save）** **HUD\_AmmoCount** 控件蓝图，然后将其关闭。
    

### 脚本：生命值、能量和弹药

下一步是为HUD元素编写功能。

1.  打开 **HUD** 控件蓝图以访问 **控件蓝图编辑器（Widget Blueprint Editor）**。
    
2.  在控件蓝图编辑器（Widget Blueprint Editor）窗口的右上角单击 **图表（Graph）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f99a4a29-9b3d-4a19-86bd-2e6b90a861ac/02-17_grapheditingmode.png)
3.  在 **图表（Graph）** 中的 **Event Construct** 节点下，**右键单击** 并添加 **Get Player Character** 节点。
    
4.  拖出 **返回值（Return Value）** 引脚，并选择 \*\*转换为第一人称角色（Cast to BP\_FirstPersonCharacter）
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d37ebc0b-16cd-4286-9ac7-caeff9181290/02-18_casttohud.png)
5.  拖动 **作为BP第一人称角色（As BP First Person Character）** 引脚并选择 **提升为变量（Promote to Variable）**（将其命名为 **我的角色（My Character）**），然后如下图所示进行连接。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c36bd45e-6388-48f1-8092-e0920b71b5a9/02-19_eventconstruct.png)
    
    执行此操作后，即可从 **BP\_FirstPersonCharacter** 蓝图中访问变量。
    
6.  单击工具栏中的 **编译（Compile）** 对脚本进行编译。
    
7.  返回到 **设计器（Designer）** 并选择 **生命值（Health）** 旁边的 **进度条（Progress Bar）**。
    
8.  在 **细节（Details）** 面板中的 **进度（Progress）** 下，单击 **百分比（Percent）** 旁边的 **绑定（Bind）** 选项，然后单击 **创建绑定（Create Binding）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/223d619a-c62e-4347-b1d2-58fec0e5b4db/02-20_createbinding.png)
    
    执行此操作后，即可通过在打开的窗口中调整函数脚本来创建自定义绑定。
    
9.  按住 **Ctrl** 将 **MyCharacter** 变量的副本拖入 **图表（Graph）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88e71507-5234-438c-bf34-22355e0489ae/02-21_dragmycharacter.png)
10.  拖动 **MyCharacter** 引脚并选择 **获取生命值（Get Health）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75e76aef-30ea-4652-a4ea-a19a964d9d69/02-22_gethealth.png)
11.  将 **生命值（Health）** 引脚连接到 **返回节点（Return Node）** 的 **返回值（Return Value）**。结果应如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71babb1e-f5da-44df-b8ec-a87537e22318/02-23_healthscript.png)
12.  执行同样的过程来调整 **能量（Energy）** 旁边的 **进度条（Progress Bar）**。结果应如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b48783a-bfc8-46b4-b248-6007bc906035/02-24_energyscript.png)
13.  **编译（Compile）** 并 **保存（Save）** **HUD** 控件蓝图，然后将其关闭。
    

### 脚本：弹药和AmmoMax

设置"弹药（Ammo）"变量的过程类似于设置"生命值（Health）"和"能量（Energy）"变量。如需了解更多详细信息，请参阅上文的[脚本：生命值和能量](/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine#%E8%84%9A%E6%9C%AC%EF%BC%9A%E7%94%9F%E5%91%BD%E5%80%BC%E5%92%8C%E8%83%BD%E9%87%8F)小节。

1.  打开 **HUD\_AmmoCount** 控件蓝图并转到 **图表（Graph）** 选项卡。
    
2.  如前文所述，创建用于将 **HUD\_AmmoCount** 控件蓝图连接到 **BP\_FirstPersonCharacter** 蓝图的脚本。结果应如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55ff6ab8-4720-433f-ae93-633e55f2fed9/02-19_eventconstruct.png)
3.  单击工具栏中的 **编译（Compile）** 对脚本进行编译。
    
4.  返回到 **设计器（Designer）** 并在 **弹药（Ammo）** 文本后面选择 **25**。在 **文本（Text）** 的 **细节（Details）** 面板中，单击 **绑定（Bind）** 和 **创建绑定（Create Binding）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d10c7b8-e20e-4440-bdba-b2cf9c56cf03/02-25_createbindingtext.png)
5.  在打开的窗口中，按住 **Ctrl** 将 **MyCharacter** 变量的副本拖入 **图表（Graph）**。拖动 **MyCharacter** 引脚并选择 **获取弹药（Get Ammo）**。将 **弹药（Ammo）** 引脚连接到 **返回节点（Return Node）** 的 **返回值（Return Value）**。结果应如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90d4db5c-3ee5-45b5-abd7-ae4acb92f242/02-26_ammoscript.png)
    
    将 **弹药（Ammo）** 节点连接到 **返回的节点（Returned Node）** 后，将自动创建一个转换节点 **至文本（To Text）**。
    
6.  对其他 **25** 文本重复上述过程，并为"AmmoMax"文本创建绑定。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfe06a97-a02c-4360-a45f-fb1bbdc03a96/02-27_ammomaxscript.png)
    
    如果最大弹药数为常量，则没有必要这样做。但是，借助此 **AmmoMax** 变量设置，可以通过在 **BP\_FirstPersonCharacter** 中创建脚本来更改此数值。
    
7.  单击 **编译（Compile）** 和 **保存（Save）**，然后单击 **运行（Play）** 按钮以在编辑器中运行。
    

在本指南的帮助下，你调整了通过HUD控件显示生命值和能量条的方式，以及通过HUD\_AmmoCount控件显示弹药的方式。所有这些控件都会显示角色蓝图中的当前值。游戏过程中，按 **空格键** 会使角色跳跃，能量将降低；按 **F** 会使生命值减少；按 **鼠标左键** 会使武器开火，弹药将减少。

下一小节将介绍如何创建主菜单，此菜单可用于加载到你设置的游戏中。此外，还将介绍如何使用 **虚幻示意图形** 和 **蓝图**。

## 3 - 延伸阅读

本指南涵盖主题的相关内容：

-   有关虚幻示意图形（Unreal Motion Graphics）的更多信息，请参阅：[UMG UI设计器](/documentation/zh-cn/unreal-engine/umg-editor-reference-for-unreal-engine)
-   有关蓝图（Blueprint）的更多信息，请参阅：[蓝图可视化脚本](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 必要的项目设置](/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine#1-%E5%BF%85%E8%A6%81%E7%9A%84%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [修改BP\_FirstPersonCharacter蓝图](/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine#%E4%BF%AE%E6%94%B9bp-firstpersoncharacter%E8%93%9D%E5%9B%BE)
-   [调整BP\_Rifle蓝图](/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine#%E8%B0%83%E6%95%B4bp-rifle%E8%93%9D%E5%9B%BE)
-   [调整BP\_FirstPersonCharacter蓝图中的角色变量](/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine#%E8%B0%83%E6%95%B4bp-firstpersoncharacter%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84%E8%A7%92%E8%89%B2%E5%8F%98%E9%87%8F)
-   [调整BP\_Rifle蓝图中的角色变量](/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine#%E8%B0%83%E6%95%B4bp-rifle%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84%E8%A7%92%E8%89%B2%E5%8F%98%E9%87%8F)
-   [2 - 显示生命值、能量和弹药](/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine#2-%E6%98%BE%E7%A4%BA%E7%94%9F%E5%91%BD%E5%80%BC%E3%80%81%E8%83%BD%E9%87%8F%E5%92%8C%E5%BC%B9%E8%8D%AF)
-   [视觉效果：生命值、能量和弹药](/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine#%E8%A7%86%E8%A7%89%E6%95%88%E6%9E%9C%EF%BC%9A%E7%94%9F%E5%91%BD%E5%80%BC%E3%80%81%E8%83%BD%E9%87%8F%E5%92%8C%E5%BC%B9%E8%8D%AF)
-   [视觉效果：弹药](/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine#%E8%A7%86%E8%A7%89%E6%95%88%E6%9E%9C%EF%BC%9A%E5%BC%B9%E8%8D%AF)
-   [脚本：生命值、能量和弹药](/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine#%E8%84%9A%E6%9C%AC%EF%BC%9A%E7%94%9F%E5%91%BD%E5%80%BC%E3%80%81%E8%83%BD%E9%87%8F%E5%92%8C%E5%BC%B9%E8%8D%AF)
-   [脚本：弹药和AmmoMax](/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine#%E8%84%9A%E6%9C%AC%EF%BC%9A%E5%BC%B9%E8%8D%AF%E5%92%8Cammomax)
-   [3 - 延伸阅读](/documentation/zh-cn/unreal-engine/umg-ui-designer-quick-start-guide-in-unreal-engine#3-%E5%BB%B6%E4%BC%B8%E9%98%85%E8%AF%BB)