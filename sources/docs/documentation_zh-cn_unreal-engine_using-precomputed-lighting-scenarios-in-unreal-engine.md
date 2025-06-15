# 使用虚幻引擎预计算光照情景 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-precomputed-lighting-scenarios-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:15:00.037Z

---

目录

![预计算光照情景](https://dev.epicgames.com/community/api/documentation/image/b835e0c5-7187-4de8-9064-703ebb71cf9d?resizing_type=fill&width=1920&height=335)

虚幻引擎 支持在关卡中使用不同的 **预计算光照情景（Precomputed Lighting Scenarios）**。这使得单个关卡可以保存并显示多种光照设置，使玩家既获得灵活的动态光照，又能以固定开销预计算光照。 对用高性能方式进行高精度渲染的虚拟现实（VR）或建筑可视化项目而言，在不同预计算光照情景之间切换更显重要。 通读此文后，你便能了解如何在 项目中使用预计算光照。

![Day Scenario](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff89fd6a-6772-4e76-b3fc-bc4043b3ca1f/01-pcls-day.png)

![Night Scenario](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ff61945-067c-4a96-be27-d3ebec34977d/02-pcls-night.png)

Day Scenario

Night Scenario

在上图中，定向光照、天空光照和天空盒已被放置到一个名为 `DayScenario` 的光照情景关卡中。而街灯的聚光源则被放置在另一个名为 `Night Scenario` 的光照情景中。

## 功能限制

虽然预计算光照情景拥有诸多优点，但使用时也需要注意其缺陷与限制。在下文中，我们将介绍其中的一些限制，并告诉你如何回避（或解决）它们。

-   在游戏中只显示一个可见光照情景关卡。
-   光照情景关卡出现后，来自所有子关卡的光照图数据均会被放置在其中，因此白天时只加载 Day Scenario 光照图。因此光照图将不再由子关卡进行流送。
-   子关卡光照贴图数据保存在光照情景的BuiltData包中。注册来自其他子关卡的反射捕获会修改当前光照情景的BuiltData。假如加载子关卡两次，并且只加载光照情景BuiltData一次，就会产生如下错误：
    
    ```cpp
    	错误： 反射捕获 /Game/Environments/Levels/Your_Level_Name.level_name:PersistentLevel.SphereReflectionCapture_1.NewReflectionComponent 上传了两次，且未重新加载其光照情景关卡。
    ```
    
    反射捕获上传时，光照情景关卡必须加载一次。
    

## 使用计算光照情景

执行以下步骤即可在 Unreal Engine 项目中使用光照情景：

1.  首先前往 **Window** > **Levels** 打开 **Levels Manager**。
    
    ![Open Levels Manager window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa537ad1-3a0b-40bb-8292-d88f7121b75f/03-pcls-open-levels-window.png)
2.  **Levels Manager** 打开后，在 **Levels** 菜单中右键点击一个子关卡，前往 **Lighting Scenario**，并选择 **Change to Lighting Scenario** 选项将关卡设为 **光照情景（Lighting Scenario）** 关卡。
    
    ![Changing Level Lightning Scenario option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/174f492f-13aa-4b4e-905a-bf5f38dbb696/04-pcls-lightning-scenario-options.png)
    
    **光照情景** 关卡显示时，其光照图将被应用到世界场景。
    
3.  右键点击子关卡，前往 **Change Streaming Method**，并选择 **Blueprint**（如其未选中），将关卡流送方法设为蓝图。
    
    ![Selecting Level Streaming Method option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1952cef6-029c-4440-8639-1ada242f03db/05-pcls-streaming-method-options.png)
4.  现在将项目所需的任意光照或 [静态网格体](/documentation/zh-cn/unreal-engine/static-meshes) 放入任意光照关卡，然后以常规方法构建每个关卡的光照。
    
    ![Building Lightning of the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b04f7845-dec8-46cf-a8e1-0dbce1730f5a/06-pcls-build-lightning.png)
5.  光照构建完成后，打开 **Persistent Level's** 蓝图并添加一个 **Load Stream Level** 节点，将其连接到 **Event Begin Play** 节点。
    
    ![Add Load Stream Level node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53d7f96a-d7f4-4cca-a98b-6e63934a3311/07-pcls-load-stream-level-node.png)
6.  将 **Event Begin Play** 节点连接到 **Load Stream Level** 节点，然后输入需要加载的关卡名。同时须勾选 **Make Visible After Load** 和 **Should Block on Load**，以便看到新加载的关卡。
    
    ![Adjust Blueprint script for streaming](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8268fbe9-33cc-45b4-94e1-eef217409835/08-pcls-adjust-bp-script.png)
7.  按下 **Play** 键运行项目，首个关卡加载完成后，它现在便会使用白天（Day）关卡光照。如需使用夜晚（Night）关卡光照，可使用相同的设置，但需要将关卡名改为晚间关卡的命名（而非白天关卡的命名）。
    
    ![白天光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ffd572c-da73-4f02-804f-968dae4678d7/01-pcls-day.png)
    
    ![夜间光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0109ee5f-0ab8-4029-8668-938fda9c23b6/02-pcls-night.png)
    
    白天光照
    
    夜间光照
    

虽然有一些明显的限制，但 Unreal Engine 中的预计算光照情景仍能为用户带来诸多益处，如增强性能，便于更改为烘焙光照（以满足项目的需求）。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [shadows](https://dev.epicgames.com/community/search?query=shadows)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [功能限制](/documentation/zh-cn/unreal-engine/using-precomputed-lighting-scenarios-in-unreal-engine#%E5%8A%9F%E8%83%BD%E9%99%90%E5%88%B6)
-   [使用计算光照情景](/documentation/zh-cn/unreal-engine/using-precomputed-lighting-scenarios-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%AE%A1%E7%AE%97%E5%85%89%E7%85%A7%E6%83%85%E6%99%AF)