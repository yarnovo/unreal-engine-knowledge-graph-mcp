# 虚幻引擎地形碰撞指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-collision-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:13:02.884Z

---

目录

![地形碰撞指南](https://dev.epicgames.com/community/api/documentation/image/0e24095f-ee49-4c8d-a006-1b2190237377?resizing_type=fill&width=1920&height=335)

## 地形碰撞

虚幻引擎5（UE5）地形系统可指定几何体（这些几何体用于整个地形或单独组件的简单和复杂碰撞）的细节程度。在以下部分中，我们将说明如何使用该系统，以及在 UE5 项目中使用前须知的相关信息。

在此示例中，我们使用的是在UE5启动程序 **学习** 标签页中的Content Examples项目。

### 碰撞Mip等级

如选择已放置在关卡中的任意地形 Actor，可在 **细节（Details） 面板的** 碰撞（Collision） **部分下可找到两个设置：**碰撞Mip等级（Collision Mip Level） **和** 简单碰撞Mip等级（Simple Collision Mip Level）\*\*。

**碰撞Mip等级（Collision Mip Level）**

用于设置地形的 **复杂** 碰撞的复杂度。碰撞Mip等级默认设为 **0**，将获得准确的地形碰撞，但内存消耗较大。将此数值设为最高的 **5** 可控制地形碰撞的开销，但碰撞的准确性便会下降。

   ![拖动滑块可在 0 到 5 之间调整碰撞 Mip 等级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f15a41e-44b9-4fbd-aab8-65f6579f0816/01-collision-mip-level-0.png "Collision Mip Level 0") ![拖动滑块可在 0 到 5 之间调整碰撞 Mip 等级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3afe155b-0f34-4638-93a1-974151718bab/02-collision-mip-level-1.png "Collision Mip Level 1") ![拖动滑块可在 0 到 5 之间调整碰撞 Mip 等级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d94a3a99-8c00-48bc-866b-f1518c485e9c/03-collision-mip-level-2.png "Collision Mip Level 2") ![拖动滑块可在 0 到 5 之间调整碰撞 Mip 等级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1c11809-8d3f-43f5-84a2-b2e80287120e/04-collision-mip-level-3.png "Collision Mip Level 3")

**拖动滑块可在 0 到 5 之间调整碰撞 Mip 等级**

\*简单碰撞Mip等级（Simple Collision Mip Level）\*\*

用于设置地形的 **简单** 碰撞的复杂度。简单碰撞Mip等级默认设为 **0**，将获得准确的地形碰撞，但内存消耗较大。将此数值设为最高的 **5** 可控制地形碰撞的开销，但碰撞的准确性便会下降。

   ![拖动滑块可在 0 到 5 之间调整简单碰撞 Mip 等级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95f6d7f7-9d7d-4369-8373-2aa7a6097f19/07-simple-collision-mip-level-0.png "Simple Collision Mip Level 0") ![拖动滑块可在 0 到 5 之间调整简单碰撞 Mip 等级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb9c4c52-32a1-40cd-86ec-7dfe2f50fd68/08-simple-collision-mip-level-1.png "Simple Collision Mip Level 1") ![拖动滑块可在 0 到 5 之间调整简单碰撞 Mip 等级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc2bd0af-53b4-4779-a0b8-68f84c65fecf/09-simple-collision-mip-level-2.png "Simple Collision Mip Level 2") ![拖动滑块可在 0 到 5 之间调整简单碰撞 Mip 等级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/484db415-ceea-41d6-b1e8-f18ab9f8fb46/10-simple-collision-mip-level-3.png "Simple Collision Mip Level 3")

**拖动滑块可在 0 到 5 之间调整简单碰撞 Mip 等级**

### 查看碰撞Mip等级

可通过玩家碰撞查看模式显示地形碰撞几何体。前往编辑器视口工具栏中的 **查看模式（View Mode）** 菜单，并选择 **玩家碰撞（Player Collision）** 或 **可见碰撞（Visibility Collision）** 即可启用碰撞查看模式。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b27afe56-ac03-40f4-9a7e-03455be07d4d/13-collision-visualization.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b27afe56-ac03-40f4-9a7e-03455be07d4d/13-collision-visualization.png)

点击查看大图。

**玩家碰撞（Player Collision）**

**玩家碰撞（Player Collision）** 查看模式显示简单碰撞 Mip 等级。 ![碰撞Mip等级玩家碰撞](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ccd0fbb5-e423-4e8b-b888-db450b2ed53e/14-cml-player-collision.png "Collision Mip Level Player Collision")

**可见碰撞（Visibility Collision）**

**可见碰撞（Visibility Collision）** 查看模式显示碰撞 Mip 等级。 ![碰撞Mip等级可见碰撞](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a75fd88-eea8-4746-8b52-6106bd0f2441/15-cml-visibility-collision.png "Collision Mip Level Visibility Collision")

### 调整地形碰撞 Mip 等级

如要对简单和复杂地形碰撞的复杂度进行设置，需要执行以下操作：

1.  在编辑器视口中选择地形地貌。在 **细节（Details） 面板中打开** 碰撞（Collision）\*\* 部分。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/daef97f2-1793-46cd-b74a-01a49d8b2ba0/16-lsc-collision.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/daef97f2-1793-46cd-b74a-01a49d8b2ba0/16-lsc-collision.png)
    
    点击查看大图。
    
2.  在 **碰撞（Collision）** 部分下找到 **Collision Mip Level** 选项。将数值设为 **0** 到 **5** 之间，然后按下 **回车** 键应用变更。关卡中的灰色碰撞网格体将自动更新反映变更。
    
    ![碰撞Mip等级 0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e757fcd-560d-4c6b-a6c8-e8bef810801d/17-collision-mip-level-0.png "Collision Mip Level 0")
    
    ![碰撞Mip等级 5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb43a763-b64d-4cf8-ba09-7c546bb107a3/18-collision-mip-level-5.png "Collision Mip Level 5")
    
    碰撞Mip等级 0
    
    碰撞Mip等级 5
    

### 混合碰撞 Mip 等级选项

可对简单和复杂地形碰撞网格体二者的复杂度进行设置，在性能和准确度上达到更好的平衡。如要在项目中独立设置简单和复杂碰撞等级，需要执行下列操作：

1.  选择地形，然后在 **细节（Details） 面板中打开** 碰撞（Collision）\*\* 部分。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0834f1f4-c40c-45b2-8ea6-9c9520d052a9/19-lsc-collision-01.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0834f1f4-c40c-45b2-8ea6-9c9520d052a9/19-lsc-collision-01.png)
    
    点击查看大图。
    
2.  将 **碰撞 Mip 等级（Collision Mip Level）** 的数值设为 **0**；**简单碰撞Mip等级（Simple Collision Mip Level）** 的数值设为 **2**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6bba627-2af0-4951-8a38-284f565ca567/20-lsc-collision-04.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6bba627-2af0-4951-8a38-284f565ca567/20-lsc-collision-04.png)
    
    点击查看大图。
    

在下图对比中即可明确碰撞Mip等级和简单碰撞Mip等级设为不同数值时地形碰撞的变化。

![玩家碰撞|简单碰撞Mip等级 = 2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f54ba14-8991-43e4-8ccc-2a9d84b68ebe/21-simple-collision-mip-level-2.png "Player Collision Simple Collision Mip Level 2")

![可见碰撞|碰撞Mip等级 = 0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac291c1b-5112-4e34-8372-d06620ec7142/22-collision-mip-level-0.png "Visibility Collision Collision Mip Level 0")

玩家碰撞|简单碰撞Mip等级 = 2

可见碰撞|碰撞Mip等级 = 0

多数情况下将 **碰撞Mip等级（Collision Mip Level）** 设为 0，**简单碰撞Mip等级（Simple Collision Mip Level）** 设为 1 或 2。如使用的数字较高，角色和碰撞的精确度便会降低。

### 设置每个地形组件的碰撞Mip等级

可对单个地形组件的碰撞Mip等级进行设置，可降低关卡非操作区域的地形碰撞复杂度。

如要在项目中设置单个组件的碰撞Mip等级，需要执行下列操作：

1.  在 **模式（Modes）** 下拉菜单中点击地形（Landscape）选项并选中 **管理（Manage）** 标签页。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a3d25ff-3065-4138-ba5a-a19b155f8f2c/23-landscape-cc-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a3d25ff-3065-4138-ba5a-a19b155f8f2c/23-landscape-cc-1.png)
    
    点击查看大图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8f1b4e2-4ae7-4676-95f3-1ed1895d38e1/24-select.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8f1b4e2-4ae7-4676-95f3-1ed1895d38e1/24-select.png)
    
    点击查看大图。
    
2.  使用 **鼠标左键** 点击选中地形组件。选中的地形组件为红色高亮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee2e8920-2062-4e5e-86b2-5641d539e9d3/25-select-cc.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee2e8920-2062-4e5e-86b2-5641d539e9d3/25-select-cc.png)
    
    点击查看大图。
    
3.  在 **细节（Details） 面板中展开** 地形组件（Landscape Component） **部分，将** 碰撞Mip等级（Collision Mip Level） **和** 简单碰撞Mip等级（Simple Collision Mip Level） **设为** 5\*\*。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/699af5ae-5140-42c7-beec-4af68e7f0dfd/26-collision-mip-level-cc.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/699af5ae-5140-42c7-beec-4af68e7f0dfd/26-collision-mip-level-cc.png)
    
    点击查看大图。
    
4.  在 **工具设置（Tool Settings）** 下的地形 **管理（Manage）** 部分中，按下 **清除组件选择（Clear Component Selection）** 按钮可取消当前选中的地形组件。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3415e05a-4440-4b61-b148-17accf7930ce/27-clear-selected-comps.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3415e05a-4440-4b61-b148-17accf7930ce/27-clear-selected-comps.png)
    
    点击查看大图。
    
5.  多选择几个地形组件并将两个碰撞 Mip 等级均设为 2。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c03f10f5-bcaf-47ca-b240-fe2772760ede/28-landscape-component-cc.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c03f10f5-bcaf-47ca-b240-fe2772760ede/28-landscape-component-cc.png)
    
    点击查看大图。
    

下图中四个标出轮廓的地形组件的碰撞 Mip 等级设置不同。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3cbf144-43b5-41d0-a40c-13e94c32c607/29-collision-cc.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3cbf144-43b5-41d0-a40c-13e94c32c607/29-collision-cc.png)

点击查看大图。

数字

碰撞 Mip 等级

1

3

2

4

3

5

4

2

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [landscape](https://dev.epicgames.com/community/search?query=landscape)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [地形碰撞](/documentation/zh-cn/unreal-engine/landscape-collision-guide-in-unreal-engine#%E5%9C%B0%E5%BD%A2%E7%A2%B0%E6%92%9E)
-   [碰撞Mip等级](/documentation/zh-cn/unreal-engine/landscape-collision-guide-in-unreal-engine#%E7%A2%B0%E6%92%9Emip%E7%AD%89%E7%BA%A7)
-   [查看碰撞Mip等级](/documentation/zh-cn/unreal-engine/landscape-collision-guide-in-unreal-engine#%E6%9F%A5%E7%9C%8B%E7%A2%B0%E6%92%9Emip%E7%AD%89%E7%BA%A7)
-   [调整地形碰撞 Mip 等级](/documentation/zh-cn/unreal-engine/landscape-collision-guide-in-unreal-engine#%E8%B0%83%E6%95%B4%E5%9C%B0%E5%BD%A2%E7%A2%B0%E6%92%9Emip%E7%AD%89%E7%BA%A7)
-   [混合碰撞 Mip 等级选项](/documentation/zh-cn/unreal-engine/landscape-collision-guide-in-unreal-engine#%E6%B7%B7%E5%90%88%E7%A2%B0%E6%92%9Emip%E7%AD%89%E7%BA%A7%E9%80%89%E9%A1%B9)
-   [设置每个地形组件的碰撞Mip等级](/documentation/zh-cn/unreal-engine/landscape-collision-guide-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E6%AF%8F%E4%B8%AA%E5%9C%B0%E5%BD%A2%E7%BB%84%E4%BB%B6%E7%9A%84%E7%A2%B0%E6%92%9Emip%E7%AD%89%E7%BA%A7)