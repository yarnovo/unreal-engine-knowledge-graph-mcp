# 摘要快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/summary-quick-start-guide
> 
> 生成时间: 2025-06-14T19:29:41.368Z

---

目录

![摘要视图快速入门指南](https://dev.epicgames.com/community/api/documentation/image/d30209a2-64ff-4e27-af0b-907bb3b0f619?resizing_type=fill&width=1920&height=335)

## 概述

在虚幻引擎中构建高级视觉效果时，Niagara系统会变得相当复杂。每个发射器可能会包含数十甚至数百个参数，用于控制最终输出。这对视觉效果美术师和高级用户来说很有用。但对于新手或非视觉特效处理美术师来说，这就超出能力范围了。

用户可以使用 **摘要视图（Summary View）** 创建发射器的参数子集。此视图完全可自定义，仅含用户选定的参数。这有助于突出显示会影响模拟的关键参数，或者向非技术用户公开特定参数以方便使用。

在任意Niagara系统中，每个发射器可以创建一个摘要视图。此例中，发射器默认设置了摘要视图，你将使用发射器附带的流体系统。然后你将从头创建一个。

## 创建Niagara系统

本小节中，你将新建一个Niagara系统，并看到其默认摘要视图。

1.  要打开 **插件（Plugins）** 窗口，请点击 **设置（Settings）> 插件（Plugins）** 。转到 **FX** 类别，并启用 **NiagaraFluids** 插件。必要时重启虚幻引擎编辑器。
    
    ![启用NiagaraFluids插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42605f78-f0a1-4fdd-8cef-6d625bd74b49/niagara-summary-1.png)
2.  在 **内容浏览器（Content Browser）** 中点击右键，然后选择 **FX > Niagara系统（Niagara System）**。
    
    ![在内容浏览器中点击右键，然后选择FX > Niagara系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b0852ee-8fd5-4039-b324-740d7cfa1749/niagara-summary-2.png)
3.  选择 **基于模板或行为示例的新系统（New system from a template or behavior example）** ，然后点击 **下一步（Next）** 。
    
    ！[选择基于模板或行为示例的新系统，然后点击下一步](/documentation/404)
    
4.  选择 **网格3D气体彩色烟雾（Grid 3D Gas Colored Smoke）** ，然后点击 **完成（Finish）** 。将该Niagara系统命名为 **NS\_ColoredSmoke** 。
    
    ![选择网格3D气体彩色烟雾，然后点击完成](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6730105-3c27-453f-a753-11193e19650a/niagara-summary-4.png)
5.  双击打开 **NS\_ColoredSmoke** 。选择 **Grid3D\_Gas\_Master\_Emitter** ，然后点击 **发射器摘要（Emitter Summary）** 。
    
    ![点击发射器摘要](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/187220ad-488f-4339-bacc-696d6ac3c15f/niagara-summary-6.png)
6.  转到 **细节（Details）** 面板以查看此发射器的 **摘要视图（Summary View）** 。
    
    摘要视图由 **分段（Sections）** (1)和单独的 **参数（Parameters）** (2)组成。分段充当要显示的参数的过滤器。参数可以是单独的变量、整个模块，甚至是渲染器及其属性。此外，你可以创建类别（无图示），以进一步将各个参数分组到特定分段下。
    
    ！[摘要视图由分段(1)和参数(2)组成](/documentation/404)
    

## 创建你的第一个摘要视图

本小节中，你将为一个发射器创建摘要视图。你还将学会如何搜索和添加参数。

1.  在 **NS\_ColoredSmoke** 中，选择 **ParticleSourceEmitter** 并点击 **发射器摘要（Emitter Summary）** 。
    
    ![选择ParticleSourceEmitter并点击发射器摘要](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2d8ca38-197f-40eb-a7a4-f003f22bab11/niagara-summary-8.png)
2.  转到 **细节（Details）** 面板，注意 **摘要视图（Summary View）** 为空。点击 **编辑摘要（Edit Summary）** 以打开 **编辑摘要视图（Edit Summary View）** 窗口。
    
    ！[点击编辑摘要以打开编辑摘要视图窗口](/documentation/404)
    
3.  编辑摘要视图（Edit Summary View）窗口包括以下区域：
    
    -   (1) **源列表（Source List）** 区域，可在其中搜索信息源，包括各个参数、模块、渲染器等。选择源并将其拖动到类别(2)，以将其包含在你的摘要视图中。
    -   (2) **分段（Section）** 和 **类别（Category）** 区域。可在其中将你的参数有序地放到类别和分段下。
    -   (3) **细节（Details）** 区域。此区域将显示选定元素的详细信息。
    
    ![编辑摘要视图窗口包含源列表区域(1)、分段和类别区域(2)，以及细节区域(3)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13dbf15f-0f69-4502-8e2b-92afb69044cf/niagara-summary-10.png)
4.  点击搜索栏并键入"Spawn Count"。然后点击 **生成计数（Spawn Count）** 并将其拖入 **添加类别（Add Category）** 按钮下方的区域内。
    
    ![点击搜索栏并键入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52654d5b-51f6-4a8d-9c9d-81e5b11c86e6/niagara-summary-11.png)
    
    选择该参数，以在 **细节（Details）** 区域内查看可用信息。这种情况下，你可以输入 **显示名覆盖** 和 **提示覆盖** 。还要注意发射器的摘要视图是如何即时更新并显示生成计数（Spawn Count）参数的。
    
    ![选择该参数，以在细节区域内查看可用信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a30152c-fc0d-4a42-93c4-352137c45c88/niagara-summary-12.png)
5.  按照上述步骤，将以下参数添加到你的摘要中：**颜色（Color）** 、 **噪点强度（Noise Strength）** 、 **噪点频率（Noise Frequency）** ，如下所示。
    
    ![将以下参数添加到你的摘要中：颜色、噪点强度、噪点频率](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0492065d-95fc-40f2-8821-0f8310e50f41/niagara-summary-13.png)
6.  你的摘要视图看起来应该类似于下图。
    
    ![你应在摘要视图中看到你的参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b442150-cad4-4a41-9cde-ed8170491a26/niagara-summary-14.png)

## 整理你的摘要视图

本小节中，你将为摘要视图创建各个类别和分段。你还将对其中一个参数使用显示名覆盖（Display Name Override）。

1.  在 **编辑摘要视图（Edit Summary View）** 窗口中，点击 **添加类别（Add Category）** ，并将你的类别命名为 **Particle Spawn** 。
    
    ![点击添加类别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3bf327d8-884f-4271-9a86-417a63c36271/niagara-summary-15.png)
2.  点击 **生成计数（Spawn Count）** 参数并将其拖动到 **粒子生成（Particle Spawn）** 类别，将该参数嵌套到该分类中。
    
    ![点击生成计数参数并将其拖动到粒子生成类别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/daaebb34-fbda-4780-9a12-2c95845c676d/niagara-summary-17.png)
3.  添加类别 **粒子颜色（Particle Color）** ，然后在其中添加 **颜色（Color）** 参数。添加类别 **粒子噪点（Particle Noise）** ，然后添加参数 **噪点强度（Noise Strength）** 和 **噪点频率（Noise Frequency）** 。
    
    ![添加类别粒子颜色和粒子噪点。添加颜色、噪点强度、噪点频率参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72d77ff8-78be-4430-87b3-b839601b1fb3/niagara-summary-18.png)
4.  点击 **添加分段（Add Section）** 并将新分段命名为 **Color** 。系统将默认选择你的新分段。注意，此新分段不包含参数或类别。
    
    ![点击添加分段并将新分段命名为Color](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f4a787d-99b9-4b99-acfb-c852ac84cd4c/niagara-summary-19.png) ![注意，此新分段不包含参数或类别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e6f6904-73e9-4503-adbc-81bf4696981b/niagara-summary-20.png)
5.  点击 **全部（All）** 分段。选择 **粒子颜色（Particle Color）** 类别并将其拖动到 **颜色（Color）** 分段中。
    
    ![选择粒子颜色类别并将其拖动到颜色分段中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/873dbcb2-f215-4824-8a7c-bd21a57d3a53/niagara-summary-21.png)
    
    点击 **颜色（Color）** 分段以查看 **粒子颜色（Particle Color）** 类别，以及与该类别关联的参数。
    
    ![点击颜色分段以查看粒子颜色类别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47d66b03-135f-4eab-89f7-8e02c319d3e6/niagara-summary-22.png)
6.  返回到 **全部（All）** 分段，并新建一个名为 **Forces** 的分段。然后选择 **粒子噪点（Particle Noise）** 分类并将其拖动到该分段中。
    
    ![新建一个名为Forces的分段并将粒子噪点分类拖动到该分段中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e726bdfa-8f5b-4120-b8f6-96dd41927f98/niagara-summary-23.png)
7.  返回到 **全部（All）** 分段，并选择 **生成计数（Spawn Count）** 参数。在 **细节（Details）** 区域，点击 **显示名覆盖（Display Name Override）** 输入框并输入 **粒子计数（Particle Count）** 。
    
    ![选择生成计数参数。在细节区域，点击显示名覆盖输入框并输入粒子计数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df3f7440-6821-4c17-8d93-9b56914edf9b/niagara-summary-24.png)。
    
8.  你的摘要视图现在应反应你的所有分段和类别。
    
    ![你的摘要视图现在应反应你的所有分段和类别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/230d2013-4421-44d2-99f5-21e9ea698f00/niagara-summary-25.png)

## 从发射器添加参数

除了使用编辑摘要视图（Edit Summary View）窗口，在发射器中工作的同时，你可以将参数直接添加到摘要视图。这样，在处理发射器时你可以更轻松地构建摘要视图。

要从发射器添加参数，请遵循以下步骤：

1.  退出 **编辑摘要视图（Edit Summary View）** 窗口，并在发射器中点击 **粒子更新（Particle Update）** 。
    
    ![在发射器中点击粒子更新](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9160224a-121a-4887-abef-efd35395fc65/niagara-summary-26.png)
2.  转到 **细节（Details）** 面板，然后向下滚动到 **旋度噪点力（Curl Noise Force）** 模块。右键点击 **噪点质量/成本（Noise Quality/Cost）** 参数并选择 **添加到发射器摘要（Add to Emitter Summary）** 。
    
    ![右键点击噪点质量/成本参数并选择添加到发射器摘要](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a6cbbaa-8920-4a7e-8c43-df6ca9fc5e4c/niagara-summary-27.png)。
    
3.  向上滚动到 **旋转位置（Spin Position）** 模块。右键点击该模块名称，并选择 **添加到发射器摘要（Add to Emitter Summary）** 。你可以将单独的参数、整个模块等添加到摘要视图。
    
    ![向上滚动到旋转位置模块。右键点击该模块名称并选择添加到发射器摘要](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78ce9300-d8ea-4c63-8ba2-ef9193158834/niagara-summary-28.png)
4.  在发射器中点击摘要视图（Summary View）以确认已添加你的参数。
    
    ![在发射器中点击摘要视图（Summary View）以确认已添加你的参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/066f342a-2dc4-40d3-9688-53e0d6ee2c15/niagara-summary-29.png)

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/summary-quick-start-guide#%E6%A6%82%E8%BF%B0)
-   [创建Niagara系统](/documentation/zh-cn/unreal-engine/summary-quick-start-guide#%E5%88%9B%E5%BB%BAniagara%E7%B3%BB%E7%BB%9F)
-   [创建你的第一个摘要视图](/documentation/zh-cn/unreal-engine/summary-quick-start-guide#%E5%88%9B%E5%BB%BA%E4%BD%A0%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA%E6%91%98%E8%A6%81%E8%A7%86%E5%9B%BE)
-   [整理你的摘要视图](/documentation/zh-cn/unreal-engine/summary-quick-start-guide#%E6%95%B4%E7%90%86%E4%BD%A0%E7%9A%84%E6%91%98%E8%A6%81%E8%A7%86%E5%9B%BE)
-   [从发射器添加参数](/documentation/zh-cn/unreal-engine/summary-quick-start-guide#%E4%BB%8E%E5%8F%91%E5%B0%84%E5%99%A8%E6%B7%BB%E5%8A%A0%E5%8F%82%E6%95%B0)