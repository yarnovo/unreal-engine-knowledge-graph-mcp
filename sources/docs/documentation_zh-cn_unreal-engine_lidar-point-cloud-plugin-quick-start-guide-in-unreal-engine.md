# 虚幻引擎LiDAR点云插件快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-quick-start-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:07:35.384Z

---

目录

![LiDAR点云插件快速入门指南](https://dev.epicgames.com/community/api/documentation/image/a9f0e8a3-5c08-48fc-ab1d-1988d07d6a84?resizing_type=fill&width=1920&height=335)

本快速入门指南涵盖以下步骤：

1.  启用LiDAR点云插件。
    
2.  导入点云并将其放置到场景中。
    
3.  为点云构建碰撞，以便可以对其进行实时探索。
    
4.  编辑点云。
    

## 1\. 启用插件

LiDAR点云插件随虚幻引擎一起提供，但必须先为项目启用该插件，然后才能使用它。

1.  打开 **插件（Plugins）** 窗口（主菜单：**编辑（Edit）> 插件（Plugins）**）。
    
2.  在 **插件（Plugins）** 窗口中，搜索 **LiDAR点云支持（LiDAR Point Cloud Support）** 插件，然后单击 **已启用（Enabled）** 选项。
    
    ![LiDAR点云支持插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc8b12d6-d342-4364-a1a2-3c665368a1af/ue5-1_01-lidar-point-cloud-support-plugin.png "LiDAR Point Cloud Support plugin")
3.  保存项目并重新启动虚幻引擎。
    

## 2\. 导入点云

1.  新建项目。使用一个包含角色控制器的模板，例如[第三人称模板（Third Person Template）](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine)。
    
2.  选择要导入的点云文件，并将其拖到 **内容浏览器（Content Browser）** 中。
    
3.  将点云从 **内容浏览器（Content Browser）** 拖到 **视口（Viewport）** 中。此时将自动创建 **LidarPointCloudActor** 的一个实例并将你指定的云指定给它。
    

## 3\. 构建并测试碰撞

为了能够像任何其他关卡一样移动导入的点云扫描，需要先为其构建并启用碰撞。

1.  在 **主工具栏** 中，点击 **模式（Modes）** 按钮，选择 **Lidar模式（Lidar Mode）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4544ca4d-15fd-4d7c-8aa0-3798d621ed64/ue5-1_02-lidar-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4544ca4d-15fd-4d7c-8aa0-3798d621ed64/ue5-1_02-lidar-mode.png)
    
    点击查看大图
    
2.  选择 **添加碰撞（Add Collision）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f01fb9d-95cc-4be8-b904-17bf85982f3d/ue5-1_03-add-collision.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f01fb9d-95cc-4be8-b904-17bf85982f3d/ue5-1_03-add-collision.png)
    
    点击查案大图
    
3.  单击 **保存（Save）** 以保存更改。
    
4.  返回主编辑器窗口，从 **放置Actor（Place Actors）** 面板中，搜索 **玩家出生点（Player Start）** 组件，然后将其拖到关卡中。将其置于地面上方。
    
5.  单击 **运行（Play）** 以启动 **在编辑器中运行（Play in Editor）** 模式，然后移动导入的扫描。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6d5a976-2cfa-4c6d-9d97-3eb424703faa/ue5-1_04-quickstart-result.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6d5a976-2cfa-4c6d-9d97-3eb424703faa/ue5-1_04-quickstart-result.png)
    
    点击查看大图
    

## 4\. 编辑点云

接下来，你将对点云进行一些简单的编辑。可以使用一系列工具选择并编辑单个点和点组。

1.  要编辑点，必须先选择它们，然后从三种可用的选择方法中选择其一：
    
    -   框形选择（Box Selection）
    -   多边形选择（Polygonal Selection）
    -   套索选择（Lasso Selection）
    -   绘制选择（Paint Selection）
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85835021-3c45-4c71-a0ae-06898c12a81b/ue5-1_05-selection-methods.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85835021-3c45-4c71-a0ae-06898c12a81b/ue5-1_05-selection-methods.png)
    
    点击查看大图
    
    选择的点将突出显示。按键盘上的 **Esc** 键可清除所进行的选择。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/716cb9e6-d51f-4fdb-a2c8-f34849cc0812/ue5-1_06-selected-points.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/716cb9e6-d51f-4fdb-a2c8-f34849cc0812/ue5-1_06-selected-points.png)
    
    点击查看大图
    
2.  可以 **隐藏（Hide）**、**删除（Delete）** 或 **裁剪（Crop）** 选择的点。
    

编辑点云后，必须重建其碰撞。

## 独立操作!

探索LiDAR点云插件提供的其他一些功能：

-   启用[Eye-Dome Lighting](/documentation/zh-cn/unreal-engine/eye-dome-lighting-mode-for-point-clouds-in-unreal-engine)以增强深度感知。
    
-   参阅[LiDAR点云插件参考](/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-reference)以了解所有可用的选项。
    

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [lidar](https://dev.epicgames.com/community/search?query=lidar)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1\. 启用插件](/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-quick-start-guide-in-unreal-engine#1%E5%90%AF%E7%94%A8%E6%8F%92%E4%BB%B6)
-   [2\. 导入点云](/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-quick-start-guide-in-unreal-engine#2%E5%AF%BC%E5%85%A5%E7%82%B9%E4%BA%91)
-   [3\. 构建并测试碰撞](/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-quick-start-guide-in-unreal-engine#3%E6%9E%84%E5%BB%BA%E5%B9%B6%E6%B5%8B%E8%AF%95%E7%A2%B0%E6%92%9E)
-   [4\. 编辑点云](/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-quick-start-guide-in-unreal-engine#4%E7%BC%96%E8%BE%91%E7%82%B9%E4%BA%91)
-   [独立操作!](/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-quick-start-guide-in-unreal-engine#%E7%8B%AC%E7%AB%8B%E6%93%8D%E4%BD%9C!)