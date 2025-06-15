# 面向虚幻引擎的Horde自动化中心 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-automation-hub-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:37:18.248Z

---

目录

![Horde自动化中心](https://dev.epicgames.com/community/api/documentation/image/9f66c244-110e-4456-80b5-4375a4f4c65f?resizing_type=fill&width=1920&height=335)

Horde自动化中心会显示个体和套件[Gauntlet](/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-in-unreal-engine)测试结果。 Horde可高效生成流送、平台、配置、渲染API等的可搜索元数据。Epic by QA、发布经理和代码所有者可以使用自动化中心快速查看和调查跨平台和流送的最新测试结果。 它提供历史数据和视图，可深入研究特定测试事件，包括屏幕截图、日志记录和调用堆栈。

要显示测试结果，除了启用Horde[构建自动化](/documentation/zh-cn/unreal-engine/horde-build-automation-for-unreal-engine)之外，所需的配置仅仅是在Gauntlet测试命令行中添加 `-WriteTestResultsForHorde` 参数。 请参阅下文的BuildGraph[示例](/documentation/zh-cn/unreal-engine/horde-automation-hub-for-unreal-engine#buildgraph)了解详情。

## 自动化筛选器

自动化UI由数据驱动，会根据测试元数据自动填充。 测试结果可以按照项目、测试、数据流、平台、配置、目标、渲染硬件接口和变体进行筛选。 详细选项也可以建立链接，便于共享和添加到书签。

![自动化选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bde004d-ae99-48aa-95f7-d7a61d401571/automationhub-leftpanel.png)

## 测试图块

测试结果以图块形式呈现，这些图块会基于所选平台和数据流显示相对测试健康状况。

![测试结果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc00db53-c993-42b6-a5f4-fe3e581a89f2/automationhub-testresults.png)

测试图块可以展开，以查看平台和变更列表等更多详细信息，这些详细信息将与各个[Horde CI](/documentation/zh-cn/unreal-engine/horde-build-automation-for-unreal-engine)作业步骤关联，从而协助调查问题。

![测试卡片](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a58a50a0-3ed8-4e98-895a-5bc14ec01584/automationhub-testpanel.png)

该功能还提供测试历史记录图表和详细故障败报告，其中包含日志记录和调用堆栈。

![测试历史记录](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d79e298c-fa13-4ade-b53c-ba439d0f34a5/automationhub-testhistory.png)

## 测试套件

Gauntlet测试套件可能包含数千个单独的单元测试。 自动化中心可以通过跨数据流比较，对每个单元测试的历史数据进行深入研究。

![套件结果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/930448e8-b06a-4797-83c1-35a798a45da5/automationhub-suiteresults.png)

套件测试会生成测试事件，查看这些事件有助于诊断问题。 测试事件可以包含日志记录、屏幕截图等更多数据，以捕捉退步情况。 为了便于比较，也可以选择单元测试的其他替代平台。

![屏幕截图比较](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb65e2b4-a885-43da-81c2-853590086c66/automationhub-screenshotcompare.png)

## BuildGraph示例

以下[**BuildGraph**](/documentation/zh-cn/unreal-engine/buildgraph-for-unreal-engine)片段声明：

-   `HordeDeviceService` 和 `HordeDevicePool` 属性，用于指定你的Horde服务器以及要使用的设备池。
-   添加了一个 `BootTest Android` 节点，该节点指定了 `-WriteTestResultsForHorde` 参数，并自动生成测试数据，这些数据供Horde摄取，会被解析成高效的元数据，并由自动化中心进行展示
    
    ```cpp
          <Property Name="HordeDeviceService" Value="http://localhost:13440" />
          <Property Name="HordeDevicePool" Value="UE5" />
    			
          <Node Name="BootTest Android">
              <Command Name="RunUnreal" Arguments="-test=UE.BootTest -platform=Android " -deviceurl="$(HordeDeviceService)" -devicepool="$(HordeDevicePool)" -WriteTestResultsForHorde/>
          </Node>
    ```
    

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [自动化筛选器](/documentation/zh-cn/unreal-engine/horde-automation-hub-for-unreal-engine#%E8%87%AA%E5%8A%A8%E5%8C%96%E7%AD%9B%E9%80%89%E5%99%A8)
-   [测试图块](/documentation/zh-cn/unreal-engine/horde-automation-hub-for-unreal-engine#%E6%B5%8B%E8%AF%95%E5%9B%BE%E5%9D%97)
-   [测试套件](/documentation/zh-cn/unreal-engine/horde-automation-hub-for-unreal-engine#%E6%B5%8B%E8%AF%95%E5%A5%97%E4%BB%B6)
-   [BuildGraph示例](/documentation/zh-cn/unreal-engine/horde-automation-hub-for-unreal-engine#buildgraph%E7%A4%BA%E4%BE%8B)