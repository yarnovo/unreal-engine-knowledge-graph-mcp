# 音频调制快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide
> 
> 生成时间: 2025-06-14T20:21:47.430Z

---

目录

![音频调制快速入门指南](https://dev.epicgames.com/community/api/documentation/image/a1658546-946f-4140-9bff-d4b0bccbbee7?resizing_type=fill&width=1920&height=335)

## 概述

**音频调制（Audio Modulation）** 允许对 **蓝图（Blueprint）** 和 **组件（Component）** 系统中的一些常见音频参数（浮点类型）进行控制。与老版本虚幻引擎相比，该系统包含更优秀、更直观且动态的功能集，用于混合音频源以及动态控制和参数化音频属性。

在本指南中，你将学习如何为游戏音频构建基于音量的基本 **控制总线（Control Bus）** 结构。

## 目标

使用 **音频调制插件（Audio Modulation Plugin）** 为游戏音频构建基于音量的基本控制总线结构。

## 目的

-   创建控制总线和控制总线 **混合对象（Mix objects）** 以将音量混合应用于声音资产。
    
-   将控制总线分配给 **MetaSound源（MetaSound Sources）** 和 **声音类（Sound Classes）** 。
    
-   使用 **混合矩阵调试器（Mix Matrix Debugger）** 可查看控制总线的当前值。
    
-   从蓝图调制控制总线。
    

## 1 - 必要设置

1.  创建新项目并选择 **游戏（Games）** 类别和 **第三人称（Third Person）** 模板。输入项目的位置和名称。点击 **创建（Create）** 。
    
    ![创建新的第一人称项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/163f5f6b-8c40-4e0b-99d5-6b08c4960229/audio-modulation-qs-1.png)
2.  点击 **设置（Settings）> 插件（Plugins）** 打开 **插件（Plugins）** 窗口。
    
    ![打开插件窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d75a8eed-f456-4888-a0ce-38551a032210/audio-modulation-qs-2.png)
3.  搜索并 **启用** **音频调制（Audio Modulation）** 和 **MetaSound** 插件。重新启动虚幻引擎。
    
    ![打开插件窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c62f1849-23f3-4910-b272-0e9108e4d162/audio-modulation-qs-3.png)

### 阶段成果

在本分段中，你创建了新项目并启用了音频调制和MetaSound插件。现在你可以开始创建控制总线。

## 2 - 创建控制总线

1.  在 **内容浏览器（Content Browser）** 中，右键点击并选择 **声音（Sounds）> 调制（Modulation）> 控制总线（Control Bus）** 。将资产命名为 `CB_Main` 。
    
    ![将资产命名为CB_Main](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9530c29f-e7f7-49dc-aa7d-b26d1d436619/audio-modulation-qs-5.png)
2.  打开 `CB_Main` 并点击 **参数（Parameter）** 下拉菜单。点击 **齿轮** 图标并启用 **显示插件内容（Show Plugin Content）** 复选框。你可能必须选择 **显示引擎内容（Show Engine Content）** ，因为调制插件是引擎插件。
    
    ![点击齿轮图标并启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed471a9a-39e8-4fc8-9c25-344b4f4e37f0/audio-modulation-qs-6.png)
3.  搜索并选择 **音量（Volume）** 参数。
    
    ![搜索并选择音量参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c376b623-1e21-42eb-817a-ea98eb16afe3/audio-modulation-qs-7.png)
    
    你可以右键点击内容浏览器并选择 **音效（Audio）> 调制（Modulation）> 调制参数（Modulation Parameter）** 来创建自定义参数。然后，从列表中选择SoundModulationParameterVolume类。
    
4.  在 **内容浏览器（Content Browser）** 中创建两个文件夹，分别供设计师和用户存放多个控制总线。在下面的示例中，这两个文件夹名为 `Buses_Designer` 和 `Buses_User` 。
    
    ![在内容浏览器中创建两个文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a626cd8c-4c65-4c05-8a3d-92b68b9d8bd3/audio-modulation-qs-8.png)
5.  右键点击 `CB_Main` 并选择 **复制（Duplicate）** 。将新资产命名为 `CB_Ambience`。
    
    ![右键点击CB_Main并选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/374f776c-be17-4c48-b457-34567ab24c23/audio-modulation-qs-9.png)
6.  再重复此过程两次，创建 `CB_Foley` 和 `CB_Footsteps` 。选择所有三个资产并将其移至 `Buses_Designer` 文件夹。
    
    ![再重复此过程两次，创建CB_Foley和CB_Footsteps](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40f26877-8ffe-4dc9-8595-152a0b64e80e/audio-modulation-qs-10.png)
7.  重复上一步，创建 `CB_Dialogue` 、 `CB_Music` 和 `CB_SFX` 。将其移至 `Buses_User` 文件夹。
    
    ![重复上一步，创建CB_Dialogue、CB_Music和CB_SFX](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2fdf2d4c-9c44-43aa-aece-1f3b2e54bdb0/audio-modulation-qs-11.png)

### 阶段成果

在本分段中，你创建了主控制总线，用于调制项目中所有分配的音频的音量。此外，你创建了供用户和设计师使用的多个控制总线。你现在可以开始将主控制总线分配给项目中的主声音类。

## 3 - 将控制总线分配给声音资产

1.  点击 **设置（Settings） > 项目设置（Project Settings）** ，打开 **项目设置（Project Settings）** 。
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc8a842d-e781-452c-9f2f-d0d821f77dd8/audio-modulation-qs-12.png)
2.  向下滚动到 **引擎（Engine）** 分段并选择 **音频（Audio）** 类别。转至 **音频（Audio）** 分段并双击 **主默认声音类（Master Default Sound Class）** 将其打开。
    
    ![向下滚动到引擎分段并选择音频类别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/757a60fa-e2c5-4a45-8123-33a3d47bac28/audio-modulation-qs-13.png) ![双击主默认声音类将其打开](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28cc186d-cd03-47c6-a425-4e1e348d4265/audio-modulation-qs-14.png)
3.  在 **细节（Details）** 面板中，转至 **调制（Modulation）** 分段并启用 **音量（Volume）** 旁边的 **调制（Modulate）** 复选框。
    
    1.  点击 **音量调制器（Volume Modulators）** 旁边的 **+** 号并将 `CB_Main` 添加到 **Index\[0\]** 。
    
    ![转至调制分段并启用音量旁边的调制复选框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efa36069-bd13-41f3-a1db-8a173d400765/audio-modulation-qs-15.png) ![点击音量调制器旁边的+号并将CB_Main添加到Index[0]](audio-modulation-qs-16.png)
    
    将 `CB_Main` 控制总线添加到项目中的其他声音类，以便所有声音都使用相同的控制总线进行混合。调制和混合结构不遵循声音类引用层级。每个声音类必须列出要应用于引用前述声音类的声音资产的所有控制总线。
    

### 阶段成果

在本分段中，你将 `CB_Main` 控制总线分配给了主声音类。你现在可以创建示例MetaSound，以在Gameplay期间测试混音。

## 4 - 创建示例MetaSound

1.  在 **内容浏览器（Content Browser）** 中，右键点击并选择 **声音（Sounds）>MetaSound源（MetaSound Source）** 。将资产命名为 `MS_Sample`。
    
    ![将资产命名为MS_Sample](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/837a23c2-d2dc-426d-9093-7a6bbe63f69c/audio-modulation-qs-18.png)
2.  在 **内容浏览器（Content Browser）** 中双击打开 `MS_Sample` 。
    
    1.  转至左侧的 **接口（Interfaces）** 面板并点击 **UE.Source.OneShot** 旁边的 **删除** 图标将其删除。
        
    2.  在 **事件图表（Event Graph）** 中右键点击，然后搜索并选择 **Wave Player (Mono)** 。
        
    3.  将 **Input** 节点连接到 **Wave Player** 节点的 **播放（Play）** 引脚。
        
    4.  将 **Wave Player** 节点的 **单声道输出（Out Mono）** 引脚连接到 **Output** 节点。
        
    
    ![点击UE.Source.OneShot旁边的删除图标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a3bd568-0990-4614-884b-06b597d45e07/audio-modulation-qs-19a.png) ![在事件图表中右键点击，然后搜索并选择Wave Player (Mono)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc3b4d92-095b-4849-b7c9-509b0ecd3235/audio-modulation-qs-19.png) ![将Wave Player节点的单声道输出引脚连接到Output节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee523cd5-10d6-45bb-806a-374192c5e1c3/audio-modulation-qs-20.png)
3.  点击 **声波资产（Wave Asset）** 下拉菜单并选择声音资产。该示例选择了 **EndPlayInEditor** 。
    
    1.  启用 **循环（Loop）** 复选框。
    
    ![点击声波资产下拉菜单并选择声音资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae7dbd25-d4e6-4bef-bfeb-6675f52b9df8/audio-modulation-qs-21.png)
4.  点击工具栏上的 **源（Source）** 并向下滚动到 **细节（Details）** 面板。
    
    1.  展开 **调制（Modulation）** 类别。
        
    2.  点击 **音量路由（Volume Routing）** 下拉菜单并选择 **并集（Union）** 。
        
    3.  启用 **音量（Volume）** 旁边的 **调制（Modulate）** 复选框。
        
    4.  点击 **音量调制器（Volume Modulators）** 旁边的 **+** 并将 `CB_SFX` 添加到 **Index\[0\]** 。
        
    
    ![点击工具栏上的源并向下滚动到细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62eba169-80e2-42f4-803f-a3162d0cf9dc/audio-modulation-qs-22.png) ![点击音量路由下拉菜单并选择并集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3a82f5d-ad9c-4fdc-9a12-149b12c5052b/audio-modulation-qs-23.png) ![点击音量调制器旁边的+号并将CB_SFX添加到Index[0]](audio-modulation-qs-24.png)
5.  将 `MS_Sample` 拖入你的关卡中。
    
    ![将MS_Sample拖入你的关卡中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2271d47-51e0-4b23-ba6b-9d33e325b174/audio-modulation-qs-25.png)

### 阶段成果

在本分段中，你创建了一个简单的MetaSound，它将持续播放一个声音资产。你现在可以将控制总线混音应用于控制总线。

## 5 - 应用混音

在本分段中，你将创建 **控制总线混音（Control Bus Mix）** 并将其应用于 `Buses_User` 文件夹中的所有 **控制总线（Control Buses）** 。你还可以执行这些步骤，为 `Buses_Designer` 文件夹中的所有控制总线创建控制总线混合。此外，关于混合中可以包含的内容，并没有严格的规定。

你可以激活多个混音并应用于单个或一组控制总线。但是，特定混音一次只能有一个实例可以处于活动状态。

1.  在 **内容浏览器（Content Browser）** 中，右键点击并选择 **音效（Audio）> 调制（Modulation）> 控制总线混音（Control Bus Mix）** 。将资产命名为 `CM_User`。
    
    ![将资产命名为CM_User](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/431337db-1e04-445d-863d-bc6aaed00b59/audio-modulation-qs-27.png)
2.  打开CM\_User并转至"混音级（Mix Stages）"分段。
    
    1.  点击 **混音级（Mix Stages）** 旁边的 **+** 号添加新混音。
        
    2.  点击 **总线（Bus）** 下拉菜单并选择 `CB_Dialogue` 。
        
    
    ![点击总线下拉菜单并选择CB_Dialogue](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ce147ea-9d68-4650-8c9b-6d3fc05f4205/audio-modulation-qs-28.png)
3.  重复上一步，将 `CB_Music` 和 `CB_SFX` 添加到 **混音级（Mix Stages）** 。
    
    ![重复上一步，将CB_Music和CB_SFX添加到混音级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f9c8de6-cca0-48c7-a5b5-16c127b50f26/audio-modulation-qs-29.png)
4.  按 **播放（Play）** 进入运行时。
    
    1.  按 **Shift-F1** 重新获得鼠标控制权。
        
    2.  转至 `CM_User` 并点击 **激活混音（Activate Mix）** 。
        
    3.  更改 `CB_SFX` 的值，查看实时应用的更改。
        
    
    ![转至CM_User并点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcbb4034-2d8a-47b3-b95c-b2d806b828cb/audio-modulation-qs-30.png) ![更改CB_SFX的值，查看实时应用的更改](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e05e2a6-ebbd-4096-abcf-6e765628ea5f/audio-modulation-qs-31.png)

### 阶段成果

在本分段中，你创建了 `CM_User` **控制混音（Control Mix）** 并将其应用于项目中的控制总线。你还使用 `CB_SFX` 控制总线在Gameplay期间激活了混音并更改了声音的音量。

## 6 - 调试混音

1.  在Gameplay期间，按 **~** 打开 **控制台（console）** 窗口。
    
    1.  输入以下命令：`au.Debug.Modulation.Enable.Matrix 1` 启用声音调制调试。
    
    ![输入以下命令：au.Debug.Modulation.Enable.Matrix 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/552143e3-626c-438a-a94f-a94b28038044/audio-modulation-qs-32.png)
2.  你可以输入以下命令来筛选显示的控制总线和控制混音的列表：`au.Debug.Modulation.Filter.Buses [substring]` 和 `au.Debug.Modulation.Filter.Mixes [substring]`。
    
    ![你可以输入相应命令来筛选显示的控制总线和控制混音的列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc866335-cd80-4521-b9d5-605c8c09cf22/audio-modulation-qs-33.png) ![总线混音矩阵显示CB_SFX](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54569408-34fb-407b-9f33-ab592ffe2a09/audio-modulation-qs-34.png)

### 阶段成果

在本分段中，你激活了声音调制调试器，并筛选了矩阵以仅显示 `CB_SFX` 控制总线。

## 7 - 从蓝图调整控制总线

在本分段中，你将在运行时从蓝图激活控制混音。

1.  在 **Level Editor** 工具栏中点击 **蓝图（Blueprint）** 按钮并选择 **打开关卡蓝图（Open Level Blueprint）** 。
    
    ![选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcbe9bf1-0147-4231-9d97-df63a531f20e/audio-modulation-qs-35.png)
2.  在 **事件图表（Event Graph）** 中右键点击，然后搜索并选择 **Event Begin Play** 。
    
    ![右键点击，然后搜索并选择Event Begin Play](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dae3b4d3-bbe6-4222-9349-d111dfd299a6/audio-modulation-qs-36.png)
3.  从 **Event Begin Play** 节点拖移，然后搜索并选择 **Activate Control Bus Mix** 。
    
    1.  点击 **混音（Mix）** 下拉菜单并选择 `CM_User` 。
    
    ![从Event Begin Play节点拖移，然后搜索并选择Activate Control Bus Mix](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a6f9fd7-edb9-47c5-b9cb-2cc66dfdb2a9/audio-modulation-qs-37.png)
4.  从 **Activate Control Bus Mix** 节点拖出，然后搜索并选择 **Delay** 。
    
    1.  将 **时长（Duration）** 设置为 **3.0** 。
    
    ![从Activate Control Bus Mix节点拖移，然后搜索并选择Delay](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51dca7eb-d2b3-4ca4-a19e-b8626556171d/audio-modulation-qs-38.png)
5.  从 **Delay** 节点拖移，然后搜索并选择 **Set Control Bus Mix By Filter** 。
    
    1.  点击 **混音（Mix）** 下拉菜单并选择 `CM_User` 。
        
    2.  将 `CB_SFX` 添加到 **地址筛选器（Address Filter）** 。
        
    3.  输入 **值** **0.25** 。
        
    
    ![从Delay节点拖移，然后搜索并选择Set Control Bus Mix By Filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17efb0f1-3f15-4c62-8fcd-89ec0ddf8997/audio-modulation-qs-39.png)
6.  按 **播放（Play）** 并在3秒后验证 `CM_User` **控制总线（Control Bus）** 是否已激活，以及 `MS_Sample` 的音量是否降低。
    

### 阶段成果

在本分段中，你使用 `CB_SFX` 控制总线激活了 `CM_User` 控制总线并更改了音频的音量。

-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [unreal audio engine](https://dev.epicgames.com/community/search?query=unreal%20audio%20engine)
-   [modulation](https://dev.epicgames.com/community/search?query=modulation)
-   [audio bus](https://dev.epicgames.com/community/search?query=audio%20bus)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#%E6%A6%82%E8%BF%B0)
-   [目标](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#%E7%9B%AE%E7%9A%84)
-   [1 - 必要设置](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#1-%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [阶段成果](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [2 - 创建控制总线](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#2-%E5%88%9B%E5%BB%BA%E6%8E%A7%E5%88%B6%E6%80%BB%E7%BA%BF)
-   [阶段成果](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
-   [3 - 将控制总线分配给声音资产](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#3-%E5%B0%86%E6%8E%A7%E5%88%B6%E6%80%BB%E7%BA%BF%E5%88%86%E9%85%8D%E7%BB%99%E5%A3%B0%E9%9F%B3%E8%B5%84%E4%BA%A7)
-   [阶段成果](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-3)
-   [4 - 创建示例MetaSound](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#4-%E5%88%9B%E5%BB%BA%E7%A4%BA%E4%BE%8Bmetasound)
-   [阶段成果](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-4)
-   [5 - 应用混音](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#5-%E5%BA%94%E7%94%A8%E6%B7%B7%E9%9F%B3)
-   [阶段成果](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-5)
-   [6 - 调试混音](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#6-%E8%B0%83%E8%AF%95%E6%B7%B7%E9%9F%B3)
-   [阶段成果](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-6)
-   [7 - 从蓝图调整控制总线](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#7-%E4%BB%8E%E8%93%9D%E5%9B%BE%E8%B0%83%E6%95%B4%E6%8E%A7%E5%88%B6%E6%80%BB%E7%BA%BF)
-   [阶段成果](/documentation/zh-cn/unreal-engine/audio-modulation-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-7)