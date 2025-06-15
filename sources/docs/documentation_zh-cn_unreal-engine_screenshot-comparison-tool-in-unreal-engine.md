# 虚幻引擎中的屏幕截图比较工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/screenshot-comparison-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:40:37.745Z

---

目录

![屏幕截图比较工具](https://dev.epicgames.com/community/api/documentation/image/072b2f17-b39b-4d30-a2e7-267913fe908e?resizing_type=fill&width=1920&height=335)

通过 **屏幕截图比较** 浏览器，你或你的质量保证（QA）团队可以快速比较在 **虚幻编辑器** 中截图。通过自动化测试生成的屏幕截图可以使用虚幻（会话）前端工具来查看，该工具会维护屏幕截图的历史记录，允许你识别出不同构建版本中的明显渲染错误。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4a62db7-6b10-44db-9564-73d0ddd3ea09/screenshotcomparisonbrowser.png)

来自Epic自己的自动化测试项目的填充屏幕截图测试。

## 屏幕截图捕获方法

你可以通过多种方法构造屏幕截图测试；最方便的方法是从使用屏幕截图功能Actor开始，或者在现有的功能测试中提取屏幕截图。

#### 功能测试Actor设置

**功能性屏幕截图测试（Functional Screenshot Test）** Actor 使用摄像机捕获屏幕截图，因为这样可以共享许多现有的后期处理和摄像机设置。 下面列出的设置是用于捕获你所需要的屏幕截图的功能性屏幕截图测试所特有的。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ad601a1-b14c-45dc-810e-42087f75220e/ft_screenshotoptions.png)

设置

说明

**分辨率（Resolution）**

需要的屏幕截图分辨率。如果不提供设置，将使用"自动化设置（Automation Settings）"中的平台设置的默认分辨率。

**延迟（Delay）**

提取屏幕截图之前的延迟。

**禁用产生噪点的渲染功能（Disable Noisy Rendering Features）**

禁用抗锯齿、动态模糊、屏幕空间反射、眼部适应（自动曝光）和接触阴影，因为如果你是要显式地寻找变化，这些功能造成的噪点会在最终渲染的图像中占很大一部分。

**可视化缓冲区（Visualize Buffer）**

允许你对非默认最终光照场景图像的缓冲区提取屏幕截图。如果你尝试针对特定的GBuffer构建测试，要判断是否引入了错误会比较困难，那么此设置很有用。

**容差（Tolerance）**

这些是容差的快速默认值。默认情况下使用"低（Low）"，因为在每个像素的颜色中始终有时空抗锯齿引入的一些差异。

-   零（Zero）
-   低（Low）
-   中（Medium）
-   高（High）
-   自定义（Custom）

**容差量（Tolerance Amount）**

对于每个信道和亮度级别，你都可以控制一块颜色基本相同的区域。通常此设置是必要的，因为现代渲染技术为了隐藏锯齿往往会不断引入噪点。

-   **RGBA信道**：分别设置任何RGBA信道的数值。
-   **最小亮度（Min Brightness）**：可接受的最小容差亮度值。
-   **最大亮度（Max Brightness）**：可接受的最大容差亮度值。

**最大局部误差（Maximum Local Error）**

在你找到颜色容差变化的原因后，需要控制局部的可接受误差。根据在三角形边缘上像素的着色方式，可能有一定比例的像素超出容差级别。与最大全局误差不同，最大局部误差是通过着眼于图像的一小部分来工作的。系统将把这些数据块与局部误差比较，尝试找到会被全局误差忽略的重要更改的热点。

**最大全局误差（Maximum Global Error）**

在你找到颜色容差变化的原因后，需要控制总体的可接受误差。根据在三角形边缘上像素的着色方式，可能有一定比例的像素超出容差级别。

**忽略抗锯齿（Ignore Anti-Aliasing）**

如果启用此设置，将会根据可能发生的情况搜索相邻像素，以寻找符合预期的像素，例如像素发生微小漂移。

**忽略颜色（Ignore Colors）**

如果启用此设置，在屏幕截图测试中将仅比较场景的亮度。

#### 编辑器首选项

在 **编辑器首选项（Editor Preferences）** 中，可以为所有已放置的功能性屏幕截图测试Actor设置为了比较而捕获的所有屏幕截图的默认分辨率。可以 转到 **编辑（Edit）** > **编辑器首选项（Editor Preferences）** > **自动化（Automation）** > **屏幕截图（Screenshots）** 来设置此项。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69bd2912-b95f-4c55-a5c4-19659552dc6a/editorpreferences_screenshotres.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69bd2912-b95f-4c55-a5c4-19659552dc6a/editorpreferences_screenshotres.png)

点击查看大图。

对个别功能性屏幕截图测试Actor设置的屏幕截图分辨率将覆盖此数值。

### 功能性屏幕截图测试Actor

**功能性屏幕截图测试** Actor是一种可以放置在关卡中的组件，用于在从虚幻前端运行的自动化测试中捕获屏幕截图。 你可以运行两种不同的屏幕截图测试：一种是捕获场景视图的普通屏幕截图，另一种用来捕获你的游戏用户界面（UI）。

要访问这些功能性屏幕截图Actor，请在 **放置Actor（Place Actors）** 面板中将其中一个拖到场景中。你可以在 **所有类（All Classes）** 选项卡中找到"功能性屏幕截图测试（Functional Screenshot Test）"和"功能性UI屏幕截图测试（Functional UIScreenshot Test）"。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/943b025f-0ba3-47d6-bd68-40718d26a1bd/modespanel.png)

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c59fe293-62f2-4eef-bce5-67c0c213dbd0/screenshottest.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23e99d31-ba6a-4e25-8d89-734d1c88a3bc/screenshotui.png)

功能性屏幕截图测试

功能性UI屏幕截图测试

### 在其他功能性测试中提取屏幕截图

除了提取独立的屏幕截图，你还可以在[功能性测试](/documentation/zh-cn/unreal-engine/functional-testing-in-unreal-engine)中提取屏幕截图，从而在其他脚本操作期间利用屏幕截图比较。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60d24665-136d-4c30-960b-739959844c29/screenshotwfuncttest.png)

用于在其他功能性测试中捕获屏幕截图的蓝图示例。

有一点需要记住，你可以自定义在捕获屏幕截图时应用的[屏幕截图设置](/documentation/zh-cn/unreal-engine/screenshot-comparison-tool-in-unreal-engine#functionaltestactorsettings)。在 捕获Gameplay或渲染功能以进行比较时，你应该考虑将两个有用的蓝图节点设置为默认容差。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93d9b60e-ea85-4e90-bfa4-e29003e6d67c/getscreenshotdefauloptions.png)

用于Gameplay和渲染的 **默认屏幕截图选项（Default Screenshot Options）** 节点可用于设置屏幕截图测试Actor的默认 **容差** 级别。在捕获Gameplay差异时，**Gameplay** 节点可用于禁用镜头和缓冲区中不一定需要的噪点。如果你是在显式地测试渲染功能，那么就应该使用 **渲染（Rendering）** 节点，否则应对关卡中放置的每一个功能性屏幕截图测试Actor实例使用默认设置。

## 屏幕截图浏览器

在屏幕截图比较浏览器中将会出现你的所有屏幕截图比较，当你引入新的比较或者屏幕截图比较失败时，也应该查看此视图。你可以在此浏览器中检查失败，并作出正确决定，例如因为功能更改的需要而更新屏幕截图，或者因为怀疑有问题而输入游戏的bug报告。

要访问屏幕截图比较浏览器，你首先需要打开虚幻（会话）前端。你可以在编辑器中选择 **窗口（Window）** > **开发者工具（Developer Tools）** > **会话前端（Session Frontend）** 来执行此操作。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afd1e767-7e14-4765-9fbb-bec3bbd874ff/screenshotbrowsertab.png)

屏幕截图比较浏览器来自Epic关于自动化测试的内部测试项目。

捕获的屏幕截图将保存在项目的 **Saved** > **Automation** > **Comparisons** 文件夹中。如有必要，你可以使用文本框输入你自己的保存位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26dff66a-1270-48da-9809-306e75d5e4e2/comparisonsaveloc.png)

运行几次测试之后，你就会有自己的填充图像用于比较。如果你已连接到源代码控制，此时你可以访问几个关于要对这些图像进行的操作的选项。 如果你没有连接到任何形式的源代码控制，这些对话框将被禁用。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f69d8c66-9d84-47cc-864e-600ef00fcce6/addnew.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90467a8c-8af3-47d9-a9b4-eb2cffd195d0/replacealternative.png)

添加

替换/作为备选项添加

操作

描述

**添加（Add）**

将屏幕截图添加到基准文件夹，并将它添加到源代码控制中的待定更改列表。

**替换（Replace）**

删除所有基准数据示例，替换为最新的屏幕截图，作为新的基准数据。

**作为备选项添加（Add As Alternative）**

偶尔会出现两幅图像都正确的情况。这可能是因为硬件或驱动程序的细小差异，甚至可能是因为硬件所支持的扩展。由于我们仅根据 Platform\_RHI\_ShaderModel 存储屏幕截图，有可能需要进一步的微调。此时 **作为备选项添加（Add As Alternative）** 就可发挥作用。它添加图像的另一个基准版本，系统在比较图像时，始终会根据元数据挑选最接近的基准屏幕截图。如果屏幕截图来自完全相同的设备，此选项将会灰显。

在运行一组新的测试之前，一定要使用 **删除所有报告（Delete All Reports）**。因为该工具会随着时间推移累积报告，它也没有自动清除来自应用程序中先前运行的报告的功能。所以进行此操作可以确保你在运行接下来的测试前拥有干净的记录。

### 基准截图

屏幕截图的 **基准** 版本是你知道正确的版本。为了进行屏幕截图比较，系统将把基准屏幕截图与 后来提取的所有屏幕截图进行对比。如果最新的屏幕截图与其不符，就会造成测试失败。

在你第一次运行屏幕截图自动化测试时，在消息日志和屏幕截图浏览器中将会出现警告信息，表明你需要将新提取的屏幕截图作为基准图像添加。

 

 

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c770e606-2ab5-4c85-8fd5-dff5a1572869/messagelog_addnew.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c770e606-2ab5-4c85-8fd5-dff5a1572869/messagelog_addnew.png)

点击查看大图

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de987bc8-44cf-435b-86ac-fc66f7f877d5/warning_addnew.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de987bc8-44cf-435b-86ac-fc66f7f877d5/warning_addnew.png)

点击查看大图

消息日志警告

屏幕截图浏览器警告

在"屏幕截图浏览器（Screenshot Browser）"选项卡中，单击 **添加（Add New）** 按钮，创建用于提交基准图像的更改列表。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9d11aa6-dc0a-422c-8948-30c3008a4098/screenshotaddnew.png)

如果你的 **添加（Add New）** 按钮灰显，请确保连接到源代码控制来启用它。

## 屏幕截图比较视图

在屏幕截图比较浏览器中，如果你单击任何图像，将会打开一个窗口，可用来在基准图像和传入图像之间混合。这样就可以更方便地在相互对比中看出所有差异。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fc5f37d-5534-475f-ab4d-49799a185290/comparisonimages.png)

这里的三个图像（从左到右）如下所示：

-   **基准（Ground Truth）** 是你知道正确的图像。
-   **差异（Difference）** 是用于比较滑块的两个图像之间的差异。
-   **传入（Incoming）** 是在运行自动化测试之后最新捕获的屏幕截图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c191ac69-0244-405f-b548-0ac94a0829d3/opencomparisonslider.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c191ac69-0244-405f-b548-0ac94a0829d3/opencomparisonslider.png)

点击查看大图。

单击这三个图像中的任何一个都可打开比较滑块窗口。你在该屏幕中可以拖动基准屏幕截图和传入屏幕截图之间的滑块进行比较。

![基准](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57d211b8-aaaa-491a-90b5-bcbcc6b0c26d/groundtruth.png)

![新屏幕截图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/867af7b3-6d2e-4750-9789-6a74661c8bc3/comparison.png)

基准

新屏幕截图

在此示例中，已知正确的基准图像和最新运行的自动化测试所捕获的传入屏幕截图之间有明显差异。

## 屏幕截图工作流

1.  你首先要选择你希望用于提取屏幕截图的方法：
    
    -   [屏幕截图功能性测试Actor](/documentation/zh-cn/unreal-engine/screenshot-comparison-tool-in-unreal-engine#functionalscreenshottestactor)
    -   [在其他功能性测试中提取屏幕截图](/documentation/zh-cn/unreal-engine/screenshot-comparison-tool-in-unreal-engine#takingascreenshotaspartofanotherfunctionaltest)
2.  如果你本地运行测试，或者在构建Farm上运行，将收到一条警告，表明你需要批准第一幅屏幕截图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fde4374-403c-4054-9f87-5bd42693dd4b/messagelogwarning.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fde4374-403c-4054-9f87-5bd42693dd4b/messagelogwarning.png)
    
    点击查看大图。
    
    在 **屏幕截图浏览器** 中，你要单击 **添加（Add New）** 将它作为基准图像添加。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23b105f1-5c56-400c-bf77-5e78a37bcfad/screenshotaddnew.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23b105f1-5c56-400c-bf77-5e78a37bcfad/screenshotaddnew.png)
    
    点击查看大图。
    
    对于其他平台，构建Farm可以负责初始屏幕截图，而你可以远程批准在这些平台上提取的屏幕截图，方法是就在屏幕截图浏览器中提供网络路径，它就显示在自动化报告的顶端。
    
3.  下次运行 **屏幕截图比较** 测试时，应该就会得到屏幕截图通过或未通过测试的结果。用屏幕截图浏览器来选择屏幕截图测试并比较差异。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de5c26fa-7721-4cf1-925a-78cfca37517e/passfail.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de5c26fa-7721-4cf1-925a-78cfca37517e/passfail.png)

点击查看大图。

如果测试失败，将会自动在"屏幕截图浏览器（Screenshot Browser）"选项卡中显示供比较，这样你就可以选择 **替换（Replace）** 或 **作为备选项添加（Add As Alternative）** 到基准图像。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ecfd1ed-7443-488a-95b9-4c79638aeec7/passfail1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ecfd1ed-7443-488a-95b9-4c79638aeec7/passfail1.png)

点击查看大图。

如果你使用[源代码控制](/documentation/zh-cn/unreal-engine/source-control-in-unreal-engine)，屏幕截图浏览器会将它们添加到待定更改列表，这样你就能在测试完成后检入这些图像。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [屏幕截图捕获方法](/documentation/zh-cn/unreal-engine/screenshot-comparison-tool-in-unreal-engine#%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%E6%8D%95%E8%8E%B7%E6%96%B9%E6%B3%95)
-   [功能测试Actor设置](/documentation/zh-cn/unreal-engine/screenshot-comparison-tool-in-unreal-engine#%E5%8A%9F%E8%83%BD%E6%B5%8B%E8%AF%95actor%E8%AE%BE%E7%BD%AE)
-   [编辑器首选项](/documentation/zh-cn/unreal-engine/screenshot-comparison-tool-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E9%A6%96%E9%80%89%E9%A1%B9)
-   [功能性屏幕截图测试Actor](/documentation/zh-cn/unreal-engine/screenshot-comparison-tool-in-unreal-engine#%E5%8A%9F%E8%83%BD%E6%80%A7%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%E6%B5%8B%E8%AF%95actor)
-   [在其他功能性测试中提取屏幕截图](/documentation/zh-cn/unreal-engine/screenshot-comparison-tool-in-unreal-engine#%E5%9C%A8%E5%85%B6%E4%BB%96%E5%8A%9F%E8%83%BD%E6%80%A7%E6%B5%8B%E8%AF%95%E4%B8%AD%E6%8F%90%E5%8F%96%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE)
-   [屏幕截图浏览器](/documentation/zh-cn/unreal-engine/screenshot-comparison-tool-in-unreal-engine#%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%E6%B5%8F%E8%A7%88%E5%99%A8)
-   [基准截图](/documentation/zh-cn/unreal-engine/screenshot-comparison-tool-in-unreal-engine#%E5%9F%BA%E5%87%86%E6%88%AA%E5%9B%BE)
-   [屏幕截图比较视图](/documentation/zh-cn/unreal-engine/screenshot-comparison-tool-in-unreal-engine#%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%E6%AF%94%E8%BE%83%E8%A7%86%E5%9B%BE)
-   [屏幕截图工作流](/documentation/zh-cn/unreal-engine/screenshot-comparison-tool-in-unreal-engine#%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%E5%B7%A5%E4%BD%9C%E6%B5%81)