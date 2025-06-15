# 虚幻引擎中Niagara轻量级发射器的快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:31:13.327Z

---

目录

![Niagara轻量级发射器快速入门](https://dev.epicgames.com/community/api/documentation/image/b54f0bf1-73b3-4dea-80c5-b8fda85851cd?resizing_type=fill&width=1920&height=335)

Niagara轻量级发射器快速入门旨在介绍 **轻量级发射器** ，这种发射器可帮助你优化Niagara系统在不同平台上的性能。本指南将使用简单的示例清楚地展示轻量级发射器的使用过程和优势。

如需详细了解轻量级发射器，请参阅[轻量级发射器概览](/documentation/zh-cn/unreal-engine/niagara-lightweight-emitters-overview)。

## 目的

通过本指南，你将学会：

-   创建分别使用常规发射器和轻量级发射器的系统。
    
-   创建新测试关卡，并放置大量系统。
    
-   使用Niagara调试器测试系统性能，并将两者进行比较。
    

本指南使用游戏（Games）类别中的第三人称模板项目。

## 创建两个测试用Niagara系统

本节将介绍如何创建Niagara系统并为其添加常规发射器，然后再创建另一个Niagara系统，并使用轻量级发射器。

### 创建使用常规发射器的Niagara系统

按照以下步骤操作，创建使用常规发射器的Niagara系统。

1.  在虚幻引擎中打开或新建一个项目。
    
    ![创建新项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57cb6f64-7574-41bb-b4f1-3cf0f5f0615b/create-new-project.png)
2.  打开 **内容浏览器（Content Browser）** 。在内容浏览器中右键点击，然后选择 **Niagara系统（Niagara System）** 。
    
    ![创建新系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cecbdb26-6153-4a8c-b08f-599cc7b073c7/create-new-system.png)
3.  打开资产浏览器（Asset Browser），选择 **默认系统（Default System）** 并点击 **创建（Create）** 。
    
    ![选择默认系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ef689b9-5629-40ce-96ea-4ad364e296fd/select-default-system.png)
4.  将新系统命名为 **NS\_Fountain** 。双击系统，在Niagara编辑器中将其打开。
    

### 为第一个系统添加常规喷泉发射器

按照如下步骤为NS\_Fountain系统添加常规发射器。

1.  确保NS\_Fountain系统已在Niagara编辑器中打开。右键点击工作空间，然后选择 **添加发射器（Add Emitter）** 。
    
    ![添加常规发射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d38d076b-5e13-484b-b4aa-a14d5f9f0337/add-emitter.png)
2.  在资产浏览器（Asset Browser）中，选择 **喷泉（Fountain）** 发射器。然后点击 **添加（Add）** ，从而为NS\_Fountain系统添加常规发射器。本示例将不改动默认值。
    
    ![选择喷泉发射器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36e4ed00-41d6-408b-a25a-8a817d1b7eb4/select-fountain-emitter.png)
3.  在Niagara编辑器中，点击以选中喷泉发射器。在 **细节（Details）** 面板中，点击 **齿轮** 图标以打开菜单。
    
    ![重命名喷泉发射器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa72d5a3-92ac-440e-89f3-1472739dd77f/rename-fountain-emitter.png)
4.  选择 **重命名（Rename）** 。将发射器命名为 **Fountain-R** （以将其标明为常规发射器）。
    

也可以双击发射器的名称，然后输入新名称，从而将其重命名。

### 创建使用轻量级发射器的Niagara系统

按照以下步骤操作，创建第二个系统。

1.  在内容浏览器（Content Browser）中右键点击，然后选择 **Niagara系统（Niagara System）** 。
    
2.  在资产浏览器（Asset Browser）中，选择 **FountainLightweight** 系统并点击 **创建（Create）** 。
    
    ![选择喷泉轻量级系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d20abae9-b7e7-4daa-9c35-5e164812532c/select-fountain-lightweight-system.png)
3.  在Niagara编辑器中，打开NS\_Fountain\_LW系统。此系统模板包括一个用于喷泉效果的轻量级发射器。
    

### 修改使用轻量级发射器的系统

在上一节中创建的系统已经拥有了轻量级喷泉发射器。本节将介绍如何修改发射器，使其与第一个系统中的喷泉发射器相匹配。这能让你更轻易地对比两种发射器的性能。

请按照以下步骤修改轻量级发射器。

1.  双击轻量级发射器的名称并修改命名。将其重命名为 **Fountain-LW** 。
    
    ![重命名轻量级发射器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b958724-002b-4e72-879e-ce1f886685d3/lightweight-emitter-name.png)
2.  选择发射器，然后点击 **生成率（Spawn Rate）** 。将 **速率（Rate）** 设置变更为 **300** 。
    
    ![速率变更为300](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/185307e3-7592-47ee-a9da-83b9cb8e963e/modify-spawn-rate.png)
3.  在发射器中，保留以下模块的 **默认** 设置：
    
    -   初始化粒子（Initialize Particle）
    -   形状位置（Shape Location）
    -   添加速度（Add Velocity）
    -   阻力（Drag）
    -   重力（Gravity Force）
4.  点击 **比例颜色（Scale Color）** 模块。将颜色改为红色，以便在测试时更容易区分常规系统和轻量级系统。然后点击 **确定（OK）** 。
    
    ![更改比例颜色模块](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e10f2e7-7139-4941-9cda-9057b35d7049/change-scale-color.png)

## 创建测试关卡

本节将介绍如何在项目中创建测试关卡，以便放置多个系统实例。

### 创建测试关卡

按照以下步骤操作，创建新关卡。

1.  在菜单栏中，点击 **文件（File）> 新关卡（New Level）** 。在 **新关卡（New Level）** 窗口中，选择 **基础（Basic）** 模版，点击 **创建（Create）** 。
    
    ![创建新关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02df93ec-4777-4711-b7cf-d15173e39130/create-new-level-basic.png)
2.  在菜单栏中，点击 **文件（File）> 将现有关卡另存为（Save Current Level As）** 。这将打开 **将关卡另存为（Save Level As）** 窗口。
    
3.  为新关卡选择一个文件夹。将其命名为 **NiagaraLWTest** 并点击 **保存（Save）** 。
    
    ![将关卡另存为窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bffee377-200a-4aa6-b0e0-7a62b3a389fd/save-level-as.png)

### 在测试关卡中放置系统

为了真正展现常规发射器和轻量级发射器在性能上的差异，你必须在测试关卡中放置大量的系统实例。你可以使用任何方法来放置用于测试的系统。在下一节的演示图中，系统被放置成一个20 x 20的矩阵。

1.  将 **NS\_Fountain** 系统放入测试关卡并进行复制，直到关卡中有大量实例为止。下方演示图中为一个20 x 20的NS\_Fountain系统实例矩阵。
    
    ![放置常规发射器系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9a581f0-682e-42c3-b814-3f16ed9a9201/place-regular-emitter-system.png)
2.  将 **NS\_Fountain\_LW** 系统放入测试关卡，按照复制NS\_Fountain系统的方法进行复制。类似于NS\_Fountain系统，下方演示图中也是一个20 x 20的系统实例矩阵。
    
    ![放置轻量级发射器系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7742b44d-4bb3-4cc3-9d81-066615262e36/place-lightweight-emitter-system.png)

## 使用Niagara调试器测试性能

本节介绍如何使用Niagara调试器比较常规发射器和轻量级发射器的性能。

### 设置Niagara调试器

请按照以下步骤打开Niagara调试器，并按测量性能的目的进行设置。

1.  确保NS\_Fountain系统在视口中。
    
2.  找到菜单栏，点击 **工具（Tools） > 调试（Debug） > Niagara调试器（Niagara Debugger）** 。这将打开 **Niagara调试器** ，此分段收纳在 **细节（Details）** 面板中的一个选项卡旁。
    
    ![打Niagara调试器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4834b2c3-3fdd-4dfc-afb1-09b112f8018f/open-niagara-debugger.png)
3.  在Niagara调试器中，单击 **HUD** 按钮上的三个点，然后勾选 **显示概览（Show Overview）** 复选框。视口将显示统计数据的覆层。
    
    ![勾选显示概览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32a78ebc-3120-4274-a8fd-09384040b777/check-show-overview.png)
4.  在 **调试概览（Debug Overview）** 分段，单击第一个下拉菜单，并选择 **性能（Performance）** 。视口中的统计覆层将变为追踪性能。
    
    ![将概览变为性能](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35b826f3-2bb4-47bf-9953-3107a879a2de/change-overview-to-performance.png)

### 比较常规和轻量级发射器的性能覆层

按照以下步骤比较NS\_Fountain和NS\_Fountain\_LW系统性能覆层中的各项指标。

1.  性能覆层将显示两个系统的多项统计数据。其中一个重要的性能指标是平均游戏线程（Game Thread Average），如下图所示。
    
    ![性能覆层详情](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f34e327b-7346-4cf7-bff6-0f1d39301af3/reg-emitter-performance-closeup.png)
2.  在大纲视图中选择NS\_Fountain系统，查看常规发射器覆层中的指标。
    
3.  在大纲视图中选择NS\_Fountain\_LW系统，查看轻量级发射器覆层中的指标。
    

### 比较常规和轻量级发射器的Stat Unit列表

按照以下步骤比较常规和轻量级发射器的Stat Unit指标列表。

1.  **Stat Unit** 列表位于视口的右上角。性能（Performance）覆层与该区域是叠加的，会妨碍查看。要关闭覆层，请点击 **HUD** 按钮，取消勾选 **显示概览（Show Overview）** 复选框即可。
    
    ![关闭性能覆层](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d64f19e3-14f9-492c-96cb-24358e4fab49/uncheck-show-overview.png)
2.  按下 **波浪号（~）** 按键以打开控制台。输入 `stat UNIT` 并按下回车。这时视口右上角将显示统计数据列表。
    
    ![使用stat UNIT命令](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44291ab4-fecd-474f-b58a-0c374fbf8f30/stat-unit-command-console.png)
3.  该列表将显示许多指标，但其中重要指标有两个：常规发射器的 **帧（Frame）** （即帧率）和 **绘制（Draw）** （即绘制次数）。
    
    ![常规发射器的Stat Unit](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bdd615b7-59b2-4780-b633-deff5c84eaf4/stat-unit-display-regular.png)
4.  在大纲视图中选择NS\_Fountain系统，查看常规发射器的指标。
    
5.  在大纲视图中选择NS\_Fountain\_LW系统，查看轻量级发射器的指标。
    

## 最终结果

使用轻量级发射器后，你应该能看到Niagara效果的平均游戏线程（Game Thread Average）得到了优化。

**NS\_Fountain**

**NS\_Fountain\_LW**

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54cbec43-3e2b-487a-a197-dcd8dc8dbd4f/perf-overlay-reg-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54cbec43-3e2b-487a-a197-dcd8dc8dbd4f/perf-overlay-reg-emitter.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2aa1625-f571-4d82-89b6-d42deac939a2/perf-overlay-lw-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2aa1625-f571-4d82-89b6-d42deac939a2/perf-overlay-lw-emitter.png)

点击查看大图。

点击查看大图。

使用轻量级发射器后，应该也能看到帧（Frame）和绘制（Draw）指标上的优化。

**NS\_Fountain**

**NS\_Fountain\_LW**

![常规发射器的Stat Unit](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/720c6d4a-accb-4113-8cd2-b25660ea9c71/stat-unit-display-regular.png "Stat Unit display for regular emitter")

![轻量级发射器的Stat Unit](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e545b4e-aaa6-4126-8227-f3954fc2ad04/stat-unit-display-lightweight.png "Stat Unit display for lightweight emitter")

-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目的](/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [创建两个测试用Niagara系统](/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine#%E5%88%9B%E5%BB%BA%E4%B8%A4%E4%B8%AA%E6%B5%8B%E8%AF%95%E7%94%A8niagara%E7%B3%BB%E7%BB%9F)
-   [创建使用常规发射器的Niagara系统](/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine#%E5%88%9B%E5%BB%BA%E4%BD%BF%E7%94%A8%E5%B8%B8%E8%A7%84%E5%8F%91%E5%B0%84%E5%99%A8%E7%9A%84niagara%E7%B3%BB%E7%BB%9F)
-   [为第一个系统添加常规喷泉发射器](/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine#%E4%B8%BA%E7%AC%AC%E4%B8%80%E4%B8%AA%E7%B3%BB%E7%BB%9F%E6%B7%BB%E5%8A%A0%E5%B8%B8%E8%A7%84%E5%96%B7%E6%B3%89%E5%8F%91%E5%B0%84%E5%99%A8)
-   [创建使用轻量级发射器的Niagara系统](/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine#%E5%88%9B%E5%BB%BA%E4%BD%BF%E7%94%A8%E8%BD%BB%E9%87%8F%E7%BA%A7%E5%8F%91%E5%B0%84%E5%99%A8%E7%9A%84niagara%E7%B3%BB%E7%BB%9F)
-   [修改使用轻量级发射器的系统](/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine#%E4%BF%AE%E6%94%B9%E4%BD%BF%E7%94%A8%E8%BD%BB%E9%87%8F%E7%BA%A7%E5%8F%91%E5%B0%84%E5%99%A8%E7%9A%84%E7%B3%BB%E7%BB%9F)
-   [创建测试关卡](/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%B5%8B%E8%AF%95%E5%85%B3%E5%8D%A1)
-   [创建测试关卡](/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%B5%8B%E8%AF%95%E5%85%B3%E5%8D%A1-2)
-   [在测试关卡中放置系统](/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine#%E5%9C%A8%E6%B5%8B%E8%AF%95%E5%85%B3%E5%8D%A1%E4%B8%AD%E6%94%BE%E7%BD%AE%E7%B3%BB%E7%BB%9F)
-   [使用Niagara调试器测试性能](/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine#%E4%BD%BF%E7%94%A8niagara%E8%B0%83%E8%AF%95%E5%99%A8%E6%B5%8B%E8%AF%95%E6%80%A7%E8%83%BD)
-   [设置Niagara调试器](/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine#%E8%AE%BE%E7%BD%AEniagara%E8%B0%83%E8%AF%95%E5%99%A8)
-   [比较常规和轻量级发射器的性能覆层](/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine#%E6%AF%94%E8%BE%83%E5%B8%B8%E8%A7%84%E5%92%8C%E8%BD%BB%E9%87%8F%E7%BA%A7%E5%8F%91%E5%B0%84%E5%99%A8%E7%9A%84%E6%80%A7%E8%83%BD%E8%A6%86%E5%B1%82)
-   [比较常规和轻量级发射器的Stat Unit列表](/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine#%E6%AF%94%E8%BE%83%E5%B8%B8%E8%A7%84%E5%92%8C%E8%BD%BB%E9%87%8F%E7%BA%A7%E5%8F%91%E5%B0%84%E5%99%A8%E7%9A%84statunit%E5%88%97%E8%A1%A8)
-   [最终结果](/documentation/zh-cn/unreal-engine/lightweight-emitters-quick-start-for-niagara-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)