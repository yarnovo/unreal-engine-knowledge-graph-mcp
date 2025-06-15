# 虚幻引擎自动化系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/automation-test-framework-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:40:33.621Z

---

目录

![自动化系统概述](https://dev.epicgames.com/community/api/documentation/image/8d1b86cc-5419-48da-a0a4-c3a6c26b1c9c?resizing_type=fill&width=1920&height=335)

**自动化系统** 是基于 **功能测试框架** 而构建的，其设计目的是执行一个或多个自动化测试来执行Gameplay关卡测试。编写的大多数测试都是功能测试、低级核心或编辑器测试，这些都是使用自动化框架系统所必需的测试。编写的这些测试可以根据用途或功能划分为以下类别：

测试类型

说明

**单元**

API级别验证测试。请参阅 **TimespanTest.cpp** 或 **DateTimeTest.cpp** 以了解相关示例。

**功能**

系统层面的测试，验证诸如PIE、游戏内数据和修改分辨率等功能。请参阅 `EditorAutomationTests.cpp` 或 `EngineAutomationTests.cpp` 以了解相关示例。

**冒烟（Smoke）**

冒烟测试只是实施者的速度承诺。它们的初衷就是尽量快速，因此可以在编辑器、游戏或commandlet\_每次\_启动时运行。它们也是[UI](/documentation/zh-cn/unreal-engine/automation-system-user-guide-in-unreal-engine#userinterface)中的默认选项。

所有冒烟测试都应在1秒钟内完成。仅将单元测试或快速功能测试标记为冒烟测试。

**内容压力**

为了避免崩溃而对特定系统的更详尽测试，例如，加载所有贴图，或加载并编译所有蓝图。请参阅 `EditorAutomationTests.cpp` 或 `EngineAutomationTests.cpp` 以了解相关示例。

**截屏比较**

这允许执行QA测试，快速比较截屏以识别不同版本之间的潜在渲染问题。

## 自动化测试已移至插件

长期以来，自动化测试分布于 **虚幻引擎** 和 **编辑器** 的多个位置，意味着您在交付作品时也会包含这些测试。现在，这些测试已经移到自己的插件，可以单独启用。这也表示，由于这些测试位于插件中，您可以在编译时选择将它们包含在封装版本中。插件还可以存储内容，这样就不必保存在引擎内容文件夹中。

由于这一更改，所创建的测试类型将指示应存放在哪里。下表提供了各种测试类型以及它应该与哪个插件一起保存：

测试类型

用来存储的插件

**单元**

这些可以继续存储在与代码相同的模块中。

**项目不确定性运行时测试**

`RuntimeTests` 插件

**项目不确定性编辑器测试**

`EditorTests` 插件

**功能测试**

`EngineTest` 游戏文件夹

部分测试仍在引擎中，尚未移到插件。这些测试将陆续移到 **插件浏览器（Plugin Browser）** 中相应的插件， 迁移后会列示在 **测试（Testing）** 部分中。

### 启用自动化测试插件

要为不同的可用测试启用插件，转至文件菜单，选择 **窗口（Window）** >**插件（Plugins）** 以打开 **插件浏览器** （Plugin Browser）窗口。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d027053b-6129-49cf-992b-25cfa5142fae/enableplugins.png)

在左面板中，选择 **测试（Testing）** 类别，启用想要使用的测试插件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/806c0923-968e-4e2d-9820-21c24c1f8858/pluginsbrowser.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/806c0923-968e-4e2d-9820-21c24c1f8858/pluginsbrowser.png)

单击查看大图。

选择完成后，系统将提示重新启动编辑器。单击 **立即重启（Restart Now）** 按钮。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a417a019-01b8-4885-82d4-c9071298071e/restarttheeditor.png)

## 测试设计准则

在测试游戏或项目时，请参考 **Epic** 在自动化测试时遵循的一些通用准则：

-   不假设游戏或编辑器的状态。测试可以在各机器中无序或并行运行。
-   让磁盘上的文件保持原状态，不要改动。如果测试生成了文件，则在测试完成时将它删除。
-   假设上一次运行测试结束后，测试状态不佳。一种比较好的做法是先生成文件以尝试删除它们，然后再开始测试。

## 运行自动化测试

1.  打开任意项目。
2.  启用可用于测试的[插件](/documentation/zh-cn/unreal-engine/automation-test-framework-in-unreal-engine#enablingautomationtestplugins)并重新启动编辑器。
    
3.  在编辑器中，转至 **窗口（Window）** >**测试自动化（Test Automation）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4ca7714-3b55-4ac5-a4d5-fbee6e8a0d43/testautomation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4ca7714-3b55-4ac5-a4d5-fbee6e8a0d43/testautomation.png)
    
    单击查看大图。
    
    为了显示该菜单中的选项，首先必须至少启用一个[自动化测试插件](/documentation/zh-cn/unreal-engine/automation-test-framework-in-unreal-engine#enablingautomationtestplugins)。
    
4.  在"会话前端"（Sessions Frontend）"自动化"（Automation）选项卡的 **测试名称（Test Name）** 列中，启用以下各项：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bc36542-8c59-4924-8f9e-193601d178ef/automationwindow.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bc36542-8c59-4924-8f9e-193601d178ef/automationwindow.png)
    
    单击查看大图。
    
    -   编辑器（Editor）
    -   项目（Project）
    -   系统（System）
5.  在"自动化"（Automation）选项卡工具栏中，单击 **开始测试（Start Tests）** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f3dc98d-8d37-4f5f-b113-002144e5ffcf/starttests.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f3dc98d-8d37-4f5f-b113-002144e5ffcf/starttests.png)
    
    单击查看大图。
    
    测试完成过程中，您可以在"测试名称"（Test Name）窗口中关注进度。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35bd6b77-9b6e-44de-9a0d-8a5480b8aa48/runningtests.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35bd6b77-9b6e-44de-9a0d-8a5480b8aa48/runningtests.png)
    
    单击查看大图。
    

## 基础

**自动化系统** 提供了使用 **虚幻消息总线** 的功能执行单元测试、功能测试和内容压力测试的能力，以提高稳定性。

[

![设置自动化测试报告服务器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27aa6c6d-787a-4bbc-87de-d1d8a3197fc7/placeholder_topic.png)

设置自动化测试报告服务器

设置自动化测试报告服务器的说明。





](/documentation/zh-cn/unreal-engine/setting-up-an-automation-test-report-server)[

![Gauntlet自动化框架](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73581d83-f83d-4145-bede-03be5a0e6576/placeholder_topic.png)

Gauntlet自动化框架

在虚幻引擎中运行项目会话的框架，可执行测试并验证结果。





](/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-in-unreal-engine)[

![自动化系统用户指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81441e3a-f7f6-4c27-98ae-a77733f649e4/automation-topic.png)

自动化系统用户指南

使用自动化系统运行测试的指南。





](/documentation/zh-cn/unreal-engine/automation-system-user-guide-in-unreal-engine)

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [自动化测试已移至插件](/documentation/zh-cn/unreal-engine/automation-test-framework-in-unreal-engine#%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95%E5%B7%B2%E7%A7%BB%E8%87%B3%E6%8F%92%E4%BB%B6)
-   [启用自动化测试插件](/documentation/zh-cn/unreal-engine/automation-test-framework-in-unreal-engine#%E5%90%AF%E7%94%A8%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95%E6%8F%92%E4%BB%B6)
-   [测试设计准则](/documentation/zh-cn/unreal-engine/automation-test-framework-in-unreal-engine#%E6%B5%8B%E8%AF%95%E8%AE%BE%E8%AE%A1%E5%87%86%E5%88%99)
-   [运行自动化测试](/documentation/zh-cn/unreal-engine/automation-test-framework-in-unreal-engine#%E8%BF%90%E8%A1%8C%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95)
-   [基础](/documentation/zh-cn/unreal-engine/automation-test-framework-in-unreal-engine#%E5%9F%BA%E7%A1%80)