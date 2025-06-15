# 在虚幻引擎中创建控件模板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-umg-widget-templates-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:17:25.766Z

---

目录

![创建控件模板](https://dev.epicgames.com/community/api/documentation/image/992b531e-3862-4221-b029-1d42b6a80843?resizing_type=fill&width=1920&height=335)

使用UMG创建的每个 **控件蓝图** 都被视为 **用户控件**，其可在其他控件蓝图中重复使用和放置。 其视觉效果和脚本功能都将延续到该蓝图中。

利用某些蓝图脚本，可创建UI控件的运行方式或外观的变量，可逐实例基础覆盖此类方式或外观。 本操作指南中将创建按钮并设定样式，通过此操作，便可在将其放置入其它控件蓝图时覆盖样式。 最后，可自定义逐实例基础点击按钮时的结果。如在菜单中具有一系列按钮，且希望其外观和操作相同，但点击后产生的结果不同，此操作将十分有用。

## 1 - 设置按钮控件

首先，需创建按钮并设置点击按钮时要运行的脚本。

本操作指南将使用 **蓝图第三人称模板**，同时启用 **初学者内容包**。

1.  点击 **内容浏览器** 中的 **添加（Add）**，然后选择 **用户界面 > 控件蓝图（User Interface > Widget Blueprint）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cc699ac-aa95-4ce2-bbaf-33770bd7a3a5/01_newwidgetblueprint.png)
    
    你还可以在 **内容浏览器** 中右键点击，然后选择 **用户界面 > 控件蓝图（User Interface > Widget Blueprint）**，以此来添加控件蓝图。
    
2.  你应该创建两个 **控件蓝图（Widget Blueprints）**，命名为 **CustomButton** 和 **HUD**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d12109cb-5094-410f-a9a3-e5697b7c4a46/02_widgetsyouneed.png)
    
    **CustomButton** 是将要添加入**HUD** 控件蓝图的用户控件。
    
3.  从 **调色板（Palette）** 向 **层级（Hirerchy）** 中拖入来添加 **按钮（Button）**。右键点击添加的 **按钮（Button）** 并选择 **用于包裹（Wrap With） > 尺寸框（Size Box）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/244fff70-45bc-4f17-a587-f6c3b4eea745/03_wrapwithsetbutton.png)
4.  在 **尺寸框（Size Box）** **细节（Details）** 面板中，将 **宽度覆盖（Width Override）** 调整到 **300**，**高度覆盖（Height Override）** 调整到 **100**。你还可以将图表布局调整为 **实际屏幕显示（Desired on Screen）** 以了解按钮的实际大小。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec064338-3443-419e-a087-a5880cccf31c/04_sizeboxdetails.png)
5.  在事件图表中，长按 **Ctrl** 键并从 **我的蓝图** 面板中拖出 **按钮**。然后，拖出引脚并添加 **设置样式（Set Style）** 节点。确保选中 **Variable Apperance** 节点，而非 **Button Function** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48c3fdeb-fe60-4af2-92d7-a3da317aed02/05_addsetstylenode.png)
6.  将 **Event Construct** 节点连接到 **Set Widget Style** 节点，然后右键点击 **控件样式** 并选择 **升级为变量**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9172bf27-3ed6-4b77-a6af-7aab61f7b4a5/06_setstylepromtovar.png)
7.  将新变量命名为 **ButtonStyle**，然后 **编译** 蓝图。然后，将 **法线 > 图像** 样式设为任意纹理。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab4719ac-9659-4d56-be4f-69a96da95524/07_vardetailpanel.png)
8.  右键点击 **法线** 部分，然后选择 **复制**。然后，将图像设置粘贴到 **悬停** 值和 **按下** 值。所有三个数值现应具有相同图像纹理。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e4613e8-3e61-4d8a-944b-a2365501557c/08_copybuttonstyle.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1fdc1a1-50ad-47c5-a709-845fd158a320/09_setbuttonstyle.png)
    
9.  展开 **悬停** 并将 **着色** 颜色改为任意颜色（如黄色）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7c65f78-75b8-41f0-8f84-86b3bc4a625b/10_sethovered.png)
10.  在 **ButtonStyle** 中，勾选 **实例可编辑（Instance Editable）** 和 **生成时公开（Expose on Spawn）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03cf0346-3f77-4d36-8fd0-96eb0ca96789/11_buttonstylevardetails.png)
    
    利用此操作，可在其他蓝图中使用该控件蓝图时，修改此变量的值。
    
11.  选择 **Button** 变量，然后点击 **+** 号将 **OnClicked** 节点添加到图表。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de5aeea6-6ec6-4eda-9cfc-f9d2fef849c1/12_addonclickevent.png)
12.  在 **MyBlueprint** 面板中，选择 **事件调度器** 以新建名为 **ButtonClicked** 的 **事件调度器**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/266f9f77-0d20-4920-8b2e-d897047c6f39/13_addeventdispatchers.png)
13.  将 **ButtonClicked** 拖入图表，选择 **调用**，然后将该节点连接到 **OnClicked** 事件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ddc4116-290d-4e6b-a2b6-92ba804b6e08/14_onclickbuttonscript.png)
    
    点击按钮时，其将创建专属的脚本功能。如拥有此按钮的多个实例，且仅使用 **OnClicked** 事件，各实例将进行响应并执行相同功能。然而，通过创建 **事件调度器**，即可在逐实例基础上实现事件，同时仅有实际点击的按钮才会触发额外脚本。
    

## 2 - 将按钮控件添加到HUD控件

创建并编写按钮控件后，现在可将按钮添加到HUD控件，同时将HUD添加到视口，游戏内即可显示按钮。

1.  打开 **HUD** 控件蓝图，并向 **画布面板** 添加 **垂直框**。将框的尺寸调小。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c45f985-8654-493c-9c42-705ed481518d/15_addvertboxtocanpan.png)
2.  在 **用户创建** 下的 **选用板** 中，向 **垂直框** 添加三个 **自定义按钮**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd3bc5eb-c5b6-46bc-93a4-53de4708ce7c/16_vertboxhierarchy.png)
3.  在事件图表中，选择所有 **CustomButton** ，然后点击 **+** 将 **点击按钮** 事件添加到图中。现在应有3个事件，每个按钮一个。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c008af5-b58d-415e-9901-a198b7ed3d94/17_addbuttonclickedevent.png)
    
    此为 **CustomButton** 控件蓝图中创建的 **事件调度器**，点击此特殊按钮时其将进行响应。
    
4.  对于各 **ButtonClicked** 事件，拖出引脚并将 **Print String** 节点连接到各事件。在 **字符串中** 文本框中添加不同文本。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/844ae1da-a877-48e3-a97f-4c4b6840851e/18_addprintstringscript.png)
    
    本例中将根据点击的按钮将不同文本打印到屏幕。在现实范例中，可让各按钮打开不同菜单、修改不同游戏设置，或对玩家角色进行改造。
    
5.  从关卡编辑器主工具栏前往 **蓝图**，并选择 **打开关卡蓝图**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b0994f5-8d3e-4ee3-b76e-e7a4e00d27ee/19_openlevelbp.png)
6.  在事件图表中点击鼠标右键，并添加 **Event BeginPlay** 节点。将节点连接至 **Create Widget** 节点，并将 **类** 设为 **HUD**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96a042a5-ff6d-47c4-a96a-6d967a7ea105/20_createhudwidget.png)
7.  添加 **Add to Viewport** 节点，并将其连接至 **Create HUD Widget** 节点。然后，将 **Get Player Controller** 函数添加到 **Set Show Mouse Cursor** 节点，并勾选此复选框（将其设为True）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4867e374-97de-4f9b-940b-ba1c1ac9c9fc/21_eventbeginplayscript.png)
8.  **编译**、**保存**，再关闭 **关卡蓝图**，然后在编辑器中点击 **运行**，与游戏中的按钮进行交互。
    

## 最终结果

在编辑器中运行时，将基于已定义的 **ButtonStyle** 变量自动设置各按钮的样式，调用 **事件调度器** 和相应的 **ButtonClicked** 事件时，此类按钮将执行脚本的不同部分。**ButtonStyle** 为公开变量，且在生成时可编辑，因此可将其放入控件蓝图覆盖其中按钮样式。如不想在各蓝图中重新创建某些动画或其他复杂脚本逻辑，操作将十分有用。通过将按钮创建为用户控件，可在任何其他控件蓝图中重复使用，而无需进行额外工作。

-   [hud](https://dev.epicgames.com/community/search?query=hud)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)
-   [widget](https://dev.epicgames.com/community/search?query=widget)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 设置按钮控件](/documentation/zh-cn/unreal-engine/creating-umg-widget-templates-in-unreal-engine#1-%E8%AE%BE%E7%BD%AE%E6%8C%89%E9%92%AE%E6%8E%A7%E4%BB%B6)
-   [2 - 将按钮控件添加到HUD控件](/documentation/zh-cn/unreal-engine/creating-umg-widget-templates-in-unreal-engine#2-%E5%B0%86%E6%8C%89%E9%92%AE%E6%8E%A7%E4%BB%B6%E6%B7%BB%E5%8A%A0%E5%88%B0hud%E6%8E%A7%E4%BB%B6)
-   [最终结果](/documentation/zh-cn/unreal-engine/creating-umg-widget-templates-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)