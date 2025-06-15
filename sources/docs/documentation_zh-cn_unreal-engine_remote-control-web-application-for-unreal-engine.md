# 虚幻引擎远程控制Web应用程序 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:35:49.950Z

---

目录

![远程控制Web应用程序](https://dev.epicgames.com/community/api/documentation/image/fec108fc-de40-4d99-aa6e-cade745fc148?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

[远程控制预设](/documentation/zh-cn/unreal-engine/getting-started-with-remote-control-presets-in-unreal-engine)中公开的参数和函数可以连接到 **远程控制Web界面（Remote Control Web Interface）** 插件提供的随附Web应用程序，以远程控制引擎。此Web应用程序具有内置的UI编辑器，可以用来自定义其界面，而不需要额外的代码来创建它或对其进行格式化。

![使用控件远程编辑后期处理对比度](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43e29566-4859-41dc-98c2-b26c6280420a/remote-control-post-process.gif)

由于这是Web应用程序，因此你可以同时运行多个客户端。在一个客户端中修改的任何属性都会通过Web服务器将其更改传播到所有其他客户端。这有助于在实时环境中创建协作式的工作流。

此页面介绍如何将公开的属性和函数连接到伙伴远程控制Web应用程序中的控件，以及如何使用应用程序的UI构建器构建你自己的UI。

## 先决条件

**远程控制Web界面（Remote Control Web Interface）** 使用NodeJS提供具有默认控件的伙伴Web应用程序，例如仪表、滑块和取色器，以远程控制引擎，无需任何额外的代码。

按照下面的步骤将Web应用程序连接到你的项目:

1.  在你的电脑上[安装NodeJS](https://nodejs.org/en/download/)。
    
    1.  最低版本：8。
        
    2.  最高版本：14.15.5。
        
2.  在虚幻编辑器中打开你的项目。
    
3.  在编辑器的主菜单中，选择 **编辑（Edit） > 插件（Plugins）** 以打开 **插件（Plugins）** 窗口。
    
4.  在 **插件（Plugins）** 窗口中，在 **消息传递（Messaging）** 类别下找到 **远程控制Web界面（Remote Control Web Interface）** 插件。勾选 **启用（Enabled）** 复选框。
    
    ![远程控制Web界面插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08809d90-20c7-4688-8398-b6ec825786b1/01-rem-con-w-i.png)
5.  重启引擎。
    
6.  验证Web应用程序已成功启动。在编辑器的主菜单中，选择 **窗口（Window） > 开发人员工具（Developer Tools） > 输出日志（Output Log）**，然后按照"远程控制Web"进行筛选，成功的日志类似于：LogRemoteControlWebInterface:
    
    `[Success] Remote Control Web Interface is running - WebApp started, port: 7000`
    
    ![Success message displayed in the output log](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bfb2f975-b9b4-4e1f-9b35-c84b8f7564df/02-com-l.png)

## 远程控制Web应用程序入门

在远程控制面板中将属性和函数连接到Web应用程序。Web应用程序将读取你在虚幻会话中已经打开的任何远程控制预设。官方支持以下浏览器：Chrome、Firefox、Safari。

你在web应用程序中更改属性值时，如果要在编辑器中查看更新，请打开 **编辑（Edit）> 编辑器首选项（Editor Preferences）**，然后在 **一般（General）** 下的 **性能（Performance）** 分段中，禁用 **在后台时使用更少的CPU（Use Less CPU when in Background）**。

![Use Less CPU in the Background setting in the Editor Preferences](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0cbe2196-9f03-4346-8b69-ee15086983c6/03-les-cpu.png)

按照这些步骤启动Web应用程序，并添加公开的属性：

1.  在运行引擎的同一台机器上打开你的Web浏览器，然后输入URL 127.0.0.1:7000。如需了解如何向其他机器公开远程控制API，请参见"远程控制快速入门"。
    
    ![在你的浏览器中输入URL](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f5d5f70-5c82-4cf1-87d8-b6727f0760a7/enter-url.png)
    
    你可以更改 **远程控制Web界面（Remote Control Web Interface）** 为你的项目使用的端口。在 **编辑器（Editor）** 的主菜单中，选择 **编辑（Edit） > 项目设置…（Project Settings…）** 以打开 **项目置（Project Settings）** 窗口。在 **项目设置（Project Settings）** 窗口中，在 **插件（Plugins）** 分段中选择 **远程控制Web界面（Remote Control Web Interface）** 以查看其设置，你可以在其中更改默认端口。
    
    ![Remote control web interface plugin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2183d0e4-cb9b-4198-9a45-cd5c691d9271/05-rem-web-prt.png)
    
    此外，你还可以从 **远程控制预设（Remote Control Preset）** 启动Web应用程序.如需更多信息，请参考[远程控制面板参考](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#%E8%8F%9C%E5%8D%95)。
    
2.  在页面加载时，你应该可以看到空白的远程控制应用程序。在Web应用程序中点击 **控制（Control）** 开关，从而切换到 **设计（Design）** 模式，以开始添加控件。
    
    ![控制模式中的模式开关](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4272c8c-9424-4eab-a969-a250a237c448/mode-toggle-control.png) ![Mode toggle in Design mode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7d34cd8-fb2e-4a14-9e44-ea7cbffb89da/06-des-but.png)
3.  选择 **属性（Properties）** 选项卡。
    
    ![Remote control properties tab](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d236d4b1-43d6-431f-aa54-23bb93838260/07-prop-b.png)
4.  将一个公开的属性拖放到右侧面板中。从 **属性（Properties）** 面板添加属性时，如果属性当前不存在，则会创建 **面板控件（Panel Widget）**，并且属性的关联控件将添加到面板控件。
    
    在下面的示例中，创建了面板控件，并将取色器控件添加到了面板控件。取色器绑定到场景的 **PostProcessVolume** 的 **对比度（Contrast）** 字段。
    
    ![Color Picker Widget bound to Post Process Volume Contrast property](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2515453b-f516-423c-8b1d-326af62891f2/08-con-arr.png)
5.  切换到 **控制（Control）** 模式。
    
    ![Color Picker Widget in Control mode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b06bfa73-d890-4a3e-92f5-56bb48a320b5/09-con-web.png)
6.  在Web应用程序中修改公开的属性，并验证关联的属性在编辑器中完成了更新。
    
    ![使用控件远程编辑后期处理对比度](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a50a96b4-e1a3-4542-b4c4-1b068e3fcf21/remote-control-post-process.gif)
7.  在虚幻编辑器中保存相应的远程控制预设，从而将你的更改保存到Web应用程序。下次打开Web应用程序时，布局将与上次保存资产时相同。
    

## 预设

Web应用程序中可以有多个远程预设，但一次只能打开一个远程控制预设。在 **设计（Design）** 模式中，转到 **预设（Presets）** 分段，在窗口左侧查看可用的远程预设并选择你要查看的预设。当前打开的远程控制预设的名称显示在窗口的右上角。

![Multiple presets in the Remote Control window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f99aa1a-729f-4be2-a5f7-5c62ef625996/10-1rem-pr.png)

## 选项卡

你可以在Web应用程序中拥有多个选项卡。这有助于在实时环境中为操作员创建不同的视图。

-   你可以更改选项卡的标签，然后从图标库中选择图标来区分这些选项卡。
    
-   你也可以复制一个选项卡，将其用作新界面的起始点。
    

![Multiple tabs](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef9a07f9-f678-4254-a866-f030627642f0/11-tab-pn.png)

在已经设置为使用其他虚幻工具的Web应用程序中，你可以添加两个独特的选项卡：[关卡快照](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine)和[Sequencer](/documentation/zh-cn/unreal-engine/real-time-compositing-with-sequencer-in-unreal-engine)。下面的部分介绍与远程控制之间的集成。

### 关卡快照集成

在远程控制Web应用程序中，你可以获取关卡的新快照，或切换到以前远程获取的快照。如需在项目中使用关卡快照的更多信息，请参阅[关卡快照](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine)。

![Remote Control Level Snapshots](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67865797-a6c4-4f21-9b7c-d7647531d1c9/lvl-sn-in.jpg)

必须启用关卡快照插件才能在远程控制Web应用程序中使用此功能。

### Sequencer集成

在远程控制Web应用程序中，你可以查看项目中的所有序列、按名称筛选以及选择要查看的序列。如需在项目中使用序列的更多信息，请参阅[Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)。点击序列右侧的播放（Play）按钮图标，可以在当前关卡中启动或回复序列。序列开始播放之前可能会存在短暂的延迟。

页面中的序列将按照其资产名称显示，而不是按照大纲视图中列出的名称来显示。在放入世界之后重新命名的资产将按照其在内容浏览器中的名称显示。

![远程控制Sequencer集成](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abe01e15-83b2-4561-ad03-dc1f0553128d/sequencer-integration.png)

此选项卡显示项目中的所有序列，但你只能播放当前关卡中存在的序列。筛选仅基于资产路径，因此目前无法根据关卡中存在的序列进行筛选。

## 控件

控件包含在Web应用程序中，用于表示引擎中可以交互的数据格式，以及为Web页面提供格式设置。

![添加面板控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5adceff0-8e4b-4cc1-96b9-6a27ba3e37b2/paneldrop.gif)

下面的列表显示你可以添加到UI的所有可用控件：

-   按钮
-   取色器
-   调谐钮
-   下拉菜单
-   摇杆
-   标签
-   列表
-   迷你取色器
-   面板
-   滑块
-   间隔物
-   选项卡
-   文本
-   开关
-   向量

**面板（Panel）** 控件用于包含所有其他控件，并且必须在放置其他控件之前进行放置。**列表（List）** 控件用于包含 **面板（Panel）**，以及在同一个 **选项卡（Tab）** 中提供多个UI。

![添加列表控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d008da72-6c9c-4c3b-a6f3-2a251bc85975/listwidgets.gif)

## 属性

远程控制Web应用程序的"属性"选项卡中列出的属性和组直接与远程控制预设中的属性和组匹配。

![Comparing properties in Web Application and Preset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ebac77f-699b-47f2-aa20-28912d20b2c7/14-com-pan.png)

将属性从Web应用程序的左侧托盘拖放到画布区域，以添加已经绑定到UI中属性的控件。如果属性已经在面板上释放，将自动添加到面板。如果没有面板，将创建空面板并将其封装到内部。

![添加属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2877321-9f1e-4d37-a15e-8f50b6341a71/propertywidget.gif)

## 控件和属性设置

在 **设计（Design）** 模式下的Web页面中选择控件，设置面板将会显示在窗口的左下角。根据控件类型和它表示的数据，将显示不同的字段。

对于每种控件类型，你可以更改其标签。如果控件绑定到属性，你可以更改控件连接到哪种属性。

### 控件模式

某些数据格式（例如向量）在UI中可以用多种方法表示。

按照下面的步骤为你的控件更改模式。

1.  选择你要查看的控件以打开其设置面板。
    
2.  在控件的设置面板中，选择你要使用的模式。例如，对于向量，你可以选择 **摇杆（Joystick）**、**调谐钮（Dial）** 或 **滑块（Sliders）**。
    
    ![Select a widget's mode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7372b3a3-447e-49d0-9ff2-926bfb7e03fa/15-rel-loc.png)
3.  在选择模式时，游戏控制器图标显示在属性旁边。选择此按钮，在你选择的模式中打开属性。
    
    ![Click game controller button to open property](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d804ca4e-b06c-4fcd-ac1c-122a894909a3/16-vec-wid.png)
4.  模式显示在窗口底部。
    
    ![Widget mode appears at the bottom of the screen](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9aa221ca-f13b-4479-9afb-a3760f3bed6a/17-dil-wid.png)

### 删除控件

你可以逐个删除控件，也可以同时删除面板中的所有控件。要删除一个控件，请选择控件以打开其设置面板并选择 **删除控件（Delete Widget）**。要删除面板中的所有控件，请选择面板以打开其设置面板并选择 **删除控件（Delete Widget）**。

![删除控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5659418-c5ec-4316-af3c-eaea5f228bbd/delete-widget.gif)

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [remote control](https://dev.epicgames.com/community/search?query=remote%20control)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [远程控制Web应用程序入门](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine#%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6web%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E5%85%A5%E9%97%A8)
-   [预设](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine#%E9%A2%84%E8%AE%BE)
-   [选项卡](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine#%E9%80%89%E9%A1%B9%E5%8D%A1)
-   [关卡快照集成](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine#%E5%85%B3%E5%8D%A1%E5%BF%AB%E7%85%A7%E9%9B%86%E6%88%90)
-   [Sequencer集成](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine#sequencer%E9%9B%86%E6%88%90)
-   [控件](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine#%E6%8E%A7%E4%BB%B6)
-   [属性](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine#%E5%B1%9E%E6%80%A7)
-   [控件和属性设置](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine#%E6%8E%A7%E4%BB%B6%E5%92%8C%E5%B1%9E%E6%80%A7%E8%AE%BE%E7%BD%AE)
-   [控件模式](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine#%E6%8E%A7%E4%BB%B6%E6%A8%A1%E5%BC%8F)
-   [删除控件](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine#%E5%88%A0%E9%99%A4%E6%8E%A7%E4%BB%B6)