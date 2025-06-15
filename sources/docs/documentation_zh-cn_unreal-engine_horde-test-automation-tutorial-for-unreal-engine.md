# 面向虚幻引擎的Horde测试自动化教程 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-test-automation-tutorial-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:38:16.153Z

---

目录

![Horde测试自动化教程](https://dev.epicgames.com/community/api/documentation/image/7d7a6440-299f-4e9a-a301-6346fb6295f7?resizing_type=fill&width=1920&height=335)

## 简介

Horde自动化中心会显示个体和套件[Gauntlet](/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-in-unreal-engine)测试结果。 Horde可高效生成流送、平台、配置、渲染API等的可搜索元数据。Epic by QA、发布经理和代码所有者可以使用自动化中心快速查看和调查跨平台和流送的最新测试结果。它提供历史数据和视图，可深入研究特定测试事件，包括屏幕截图、日志记录和调用堆栈。

## 先决条件

-   已安装Horde服务器（参阅[Horde安装教程](/documentation/zh-cn/unreal-engine/horde-installation-tutorial-for-unreal-engine)）。
-   配置了AutoSDK的Horde代理（参阅引擎源中的Engine\\Extras\\AutoSDK\\README.md）
-   已配置Horde构建示例项目（参阅[Horde构建自动化教程](/documentation/zh-cn/unreal-engine/horde-build-automation-tutorial-for-unreal-engine)）。
-   已将Android手机或平板电脑添加到设备管理器（参阅[Horde设备管理器教程](/documentation/zh-cn/unreal-engine/horde-device-manager-tutorial-for-unreal-engine)）。

## 步骤

1.  Horde示例UE5项目包含用于编译、打包和测试Lyra示例游戏项目的参考模板。 此示例的构建图表旨在实现通用性和可扩展性，是Epic用于自动化测试的良好现实世界图表来源。
    
    ![新构建](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a4bf360-5882-40d6-9a47-eccfb34e1a9d/tutorial-testautomation-newbuild.png)
    
    从UE5项目流视图中，选择打包构建（Packaged Build）类别，点击 `新构建（New Build）` ，然后选择 `已打包Lyra构建（Packaged Lyra Build）` 。添加Android目标平台，并点击 `开始作业（Start Job）`
    
    ![选择Android](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/227a1b17-9649-40b0-8317-905c437e9a04/tutorial-testautomation-android.png)
    
    请注意，设备管理器URL字段仅用于示例目的，你通常要在相关的Gauntlet构建图表配置中设置它。
    
2.  该作业将在Android设备上编译、烘焙和运行Lyra启动测试，并在此过程中将其从设备管理器中保留。
    
    ![自动化标签](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6529747b-f1b6-4cc3-a7c6-2fc96aaa013a/tutorial-testautomation-labels.png)
3.  完成后，测试结果将在[自动化中心](/documentation/zh-cn/unreal-engine/horde-automation-hub-for-unreal-engine)中可用，该自动化中心具有细粒度筛选器和视图，可交叉比较平台和流送。
    
    ![测试结果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79d0281d-2b30-40c6-9469-c4772dfd53ce/tutorial-testautomation-testresult.png)

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [简介](/documentation/zh-cn/unreal-engine/horde-test-automation-tutorial-for-unreal-engine#%E7%AE%80%E4%BB%8B)
-   [先决条件](/documentation/zh-cn/unreal-engine/horde-test-automation-tutorial-for-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [步骤](/documentation/zh-cn/unreal-engine/horde-test-automation-tutorial-for-unreal-engine#%E6%AD%A5%E9%AA%A4)