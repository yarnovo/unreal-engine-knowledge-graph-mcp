# 自动生成寻路链接 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/automatic-navigation-link-generation
> 
> 生成时间: 2025-06-14T19:43:25.243Z

---

目录

![自动生成寻路链接](https://dev.epicgames.com/community/api/documentation/image/47d9eec6-adc6-459c-bb5d-c380b0a5c3a4?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

## 虚幻引擎中的寻路链接

**寻路链接** 用于连接关卡中两个可寻路但并不直接相连的区域。例如高处的平台和地面，或者并不直接相连的两处平台。

要想手动添加寻路链接，开发者可以在关卡中放置 **寻路链接代理Actor（NavLink Proxy Actors）** 并定义可寻路区域之间的连接点。

![手动放置的寻路链接代理Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35bae241-5bd4-4beb-87a5-b66e6c77aa36/nav-auto-links-1.png)

如需详细了解 **寻路链接代理Actor** ，请参阅[修改寻路网格体](/documentation/zh-cn/unreal-engine/modifying-the-navigation-mesh-in-unreal-engine)文档。

## 自动生成寻路链接

虚幻引擎5.5在寻路网格体的设置中引入了 **自动生成寻路链接（automatic generation of Navigation Links）** 项。

![自动生成寻路链接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7734f4c-57ec-4eee-a378-9228ed0c9fa4/nav-auto-links-demo.gif)

要启用自动生成，请执行以下操作：

1.  在关卡中放置 **寻路网格体边界体积（Navigation Mesh Bounds Volume）** Actor并将其设置为需要。
    
    ![无寻路链接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e8268ad-c45f-4899-ab78-2f184c55ccbe/nav-auto-links-2.png)
2.  在 **大纲视图（Outliner）** 中，选择 **RecastNavMesh-Default** Actor。
    
    -   转到 **细节（Details）** 面板，向下滚动到 **生成（Generation）** 分段并 **勾选** **生成寻路链接（Generate Nav Links）** 复选框。
    
    ![选择大纲视图中的RecastNavMesh-Default Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d62246aa-0135-414c-b2d3-d41c25e9eead/nav-auto-links-3.png) ![勾选生成寻路链接复选框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c13e288-a3e8-446e-9e01-fd25fe1897a0/nav-auto-links-4.png)
3.  虚幻引擎将自动生成寻路链接。
    
    ![生成的寻路链接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/384cc352-0a25-471c-8419-43c88d24835c/nav-auto-links-5.png)

## 配置寻路链接的生成

虚幻引擎将根据寻路链接下跳配置（Nav Link Jump Down Config）的设置生成寻路链接。这些链接主要用于实现AI代理（NPC）的跳跃或坠落动作。

设置如下：

设置

说明

跳跃长度（Jump Length）

水平跳跃长度。

边缘跳跃距离（Jump Distance from Edge）

从寻路网格体边缘起算的跳跃距离。

最大跳跃深度（Jump Max Depth）

在起始高度之下多远寻找着陆点。

跳跃高度（Jump Height）

相对于起始高度的峰值高度。

跳跃末端高度公差（Jump Ends Height Tolerance）

跳跃点两端能够到达地面的公差。

取样分隔系数（Sampling Separation Factor）

该值乘以单元尺寸，即可得出取样轨迹之间的距离。默认值为1。值越大，生成速度越快，但可能造成取样误差。

过滤距离阈值（Filter Distance Threshold）

过滤相似链接时，用于比较片段端点之间的距离，以匹配相似链接。

区域类（Area Class）

此配置生成的链接的区域类。

链接代理类（Link Proxy Class）

用于处理此配置所生成链接的类。它允许开发者在使用寻路链接时实现自定义的行为。

![寻路链接下跳配置设置项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dba8c77c-abd8-4a21-922c-b3816383884e/nav-auto-links-6.png)

下面是设置的示意图：

![设置示意图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bbe2c1a-3ad5-430a-9e84-f2198936d3c0/nav-auto-links-7a.png)

## 性能注意事项

在图块生成过程中，生成和验证寻路链接的过程会耗费额外的CPU周期，从而影响图块生成时间。遵循下列建议可尽量减少相关开销。

**跳跃长度**

![跳跃长度](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/996029d4-f4e1-4c69-bfc8-07bf54eb3572/nav-auto-links-8.png)

该值对生成开销的影响最大。长度够大时会增加寻路网格体图块的光栅化尺寸。请将跳跃长度保持为合理的值，以提高性能。

**取样分隔系数**

![取样分隔系数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cad22e3b-0e22-4764-9467-21ab288581ff/nav-auto-links-9.png) ![数值越大，垂直轨迹取样之间的距离就越大。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34b19d75-0c8c-42eb-ac93-7f06a520340e/nav-auto-links-10.png)

该值默认为1（无效果），但可以增大数值以增加垂直轨迹取样之间的距离。这提供了进行简单优化的机会，但取样精度降低，可能会导致一些寻路链接发生碰撞。

**寻路网格体边缘的数量**

寻路链接的生成和验证过程将按寻路网格体边界的边缘逐个执行。这意味着寻路网格体图块越复杂，生成寻路链接的开销就越高。

**寻路链接生成时间**

要查看各项调整对寻路链接生成时间的影响，请执行以下步骤：

1.  在 **大纲视图（Outliner）** 中，选择 **RecastNavMesh-Default** Actor，并前往 **细节（Details）** 面板。
    
    ![xxx](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af812c14-b8e5-4447-84d0-f33a7923ecd4/nav-auto-links-3.png)
2.  向下滚动到 **显示（Display）** 分段，并 **勾选** **绘制图块构建时间（Draw Tile Build Times）** 复选框。
    
    ![选择大纲视图中的RecastNavMesh-Default Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67abba29-4a55-41d2-a72d-c7c5e27f4244/nav-auto-links-11.png)
3.  这时屏幕上会显示 **平均链接构建时间** 。
    
    ![屏幕上显示平均链接构建时间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29fe40a3-ce13-4150-a712-8ff246811e7a/nav-auto-links-12.png)

## 为寻路链接添加自定义行为

生成的寻路链接与可以被你手动添加到关卡中的 **寻路链接代理Actor** 相同。这意味着你可以通过为链接指定 **链接代理类（Link Proxy Class）** 来添加自定义行为。

要将 **跳越能力** 添加到寻路链接，请执行如下步骤：

1.  右键点击 **内容浏览器（Content Browser）** ，选择 **蓝图类（Blueprint Class）** 以打开 **选取父类（Pick Parent Class）** 窗口。
    
    -   展开 **所有类（All Classes）** 类别，搜索并选择 **GeneratedNavLinksProxy** 。
    -   点击 **选择（Select）** 并命名资产。
    
    ![搜索并选择GeneratedNavLinksProxy](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24c66f1e-827f-4dd7-b39a-e845acb4608b/nav-auto-links-13.png)
2.  在 **内容浏览器（Content Browser）** 中双击打开资产。
    
    -   添加如下所示的蓝图代码。
    -   **编译（Compile）** 并 **保存（Save）** 。
    
    ![寻路链接蓝图代码](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b01a5f3-ab9c-466c-aa7d-2c36f98d0b99/nav-auto-links-14.png)
3.  在 **大纲视图（Outliner）** 中，选择 **RecastNavMesh-Default** Actor。
    
    -   转到 **细节（Details）** 面板，向下滚动到 **寻路链接下跳配置（Nav Link Jump Down Config）** 分段，添加你用下拉菜单创建的 **链接代理类（Link Proxy Class）** 。
    
    ![选择大纲视图中的RecastNavMesh-Default Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3fd12f2-d775-4993-bda5-c80ce8eda712/nav-auto-links-3.png) ![添加你用下拉菜单创建的链接代理类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f564ad31-d3fc-4fb8-8b2a-243c281ad7ad/nav-auto-links-15.png)

## 测试寻路链接行为

要测试自定义行为，请创建一个AI代理，让其使用寻路链接随机前往目的地。

本指南将展示设置过程，但不会逐步讲解。如需详细了解AI代理的创建过程，请参阅[人工智能](/documentation/zh-cn/unreal-engine/artificial-intelligence-in-unreal-engine)文档。

执行以下步骤以创建AI代理：

1.  新建一个 **Actor** 类型的蓝图作为AI代理的目的地，并将其命名为 **BP\_Target** 。下方示例添加了一个带有 **球形网格体** 的 **静态网格体组件** 作为视觉表示。
    
    ![新建Actor类型的蓝图作为目的地](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd99edd9-0085-438d-a31b-53e79e055145/nav-auto-links-18.png)
2.  复制虚幻引擎第三人称模板中的 **BP\_ThirdPersonCharacter** 蓝图，并将其命名为 **BP\_NPC** 。
    
    ![复制BP_ThirdPersonCharacter并命名为BP_NPC](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8441ee15-224b-4bf2-92b6-918841fcae48/nav-auto-links-16.png)
    
    你也可以点击 **添加+（Add+） > 添加功能或内容包（Add Feature or Content Pack）** ，然后选择 **第三人称（Third Person）** 模板，将其添加到项目中。
    
3.  删除 **事件图表（Event Graph）** 中所有的现有代码，并添加下图中的代码。
    
    -   **编译（Compile）** 并 **保存（Save）** 。
    
    ![AI代理蓝图代码](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9be7c2e8-f99d-435a-9512-70636408e600/nav-auto-links-17.png)
4.  将你的 **AI代理** 和数个 **BP\_Target** Actor放置到关卡中。
    
    ![将你的AI代理和数个BP_Target Actor放置到关卡中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31b3d099-7dad-486a-9016-84fe6fdc3679/nav-auto-links-19.png)
5.  按下 **模拟（Simulate）** 以查看AI代理在目的地之间的行动。

1.  下方示例显示了多个AI代理前往随机目的地的情况。

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [navigation](https://dev.epicgames.com/community/search?query=navigation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [虚幻引擎中的寻路链接](/documentation/zh-cn/unreal-engine/automatic-navigation-link-generation#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E7%9A%84%E5%AF%BB%E8%B7%AF%E9%93%BE%E6%8E%A5)
-   [自动生成寻路链接](/documentation/zh-cn/unreal-engine/automatic-navigation-link-generation#%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E5%AF%BB%E8%B7%AF%E9%93%BE%E6%8E%A5)
-   [配置寻路链接的生成](/documentation/zh-cn/unreal-engine/automatic-navigation-link-generation#%E9%85%8D%E7%BD%AE%E5%AF%BB%E8%B7%AF%E9%93%BE%E6%8E%A5%E7%9A%84%E7%94%9F%E6%88%90)
-   [性能注意事项](/documentation/zh-cn/unreal-engine/automatic-navigation-link-generation#%E6%80%A7%E8%83%BD%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
-   [为寻路链接添加自定义行为](/documentation/zh-cn/unreal-engine/automatic-navigation-link-generation#%E4%B8%BA%E5%AF%BB%E8%B7%AF%E9%93%BE%E6%8E%A5%E6%B7%BB%E5%8A%A0%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A1%8C%E4%B8%BA)
-   [测试寻路链接行为](/documentation/zh-cn/unreal-engine/automatic-navigation-link-generation#%E6%B5%8B%E8%AF%95%E5%AF%BB%E8%B7%AF%E9%93%BE%E6%8E%A5%E8%A1%8C%E4%B8%BA)