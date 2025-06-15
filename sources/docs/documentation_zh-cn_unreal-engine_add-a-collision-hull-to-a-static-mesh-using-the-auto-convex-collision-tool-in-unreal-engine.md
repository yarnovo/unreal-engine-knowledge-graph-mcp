# 使用自动凸包碰撞工具将碰撞凸包添加至静态网格体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/add-a-collision-hull-to-a-static-mesh-using-the-auto-convex-collision-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:49:17.927Z

---

目录

![使用自动凸包碰撞工具将碰撞凸包添加至静态网格体](https://dev.epicgames.com/community/api/documentation/image/aa51af50-2263-4eb4-8140-3536ac5975b8?resizing_type=fill&width=1920&height=335)

在下面的教程中，我们将介绍如何使用自动凸包碰撞工具自动为静态网格体创建碰撞。

自动凸包工具还使用新版本的[V-HACD库](https://github.com/kmammou/v-hacd)，该版本会提供更准确的结果。

## 步骤

1.  首先，在静态网格体编辑器中打开要添加碰撞的静态网格体。在本例中，我们将使用 **SM\_Rock Mesh**，它随初学者内容包一起提供。   
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4810a209-11cb-4176-916e-d01e0c6cd799/ht_addconvexhulls_01.png "HT_AddConvexHulls_01.png")
    
2.  然后，转到 **碰撞（Collision）** \\> **自动凸包碰撞（Auto Convex Collision）**，打开自动凸包碰撞工具。这将在静态网格体右下角打开自动凸包碰撞。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53c512a0-c2df-4887-83b1-5ddc59e8f744/ht_addconvexhulls_02.png "HT_AddConvexHulls_02.png") 
    
3.  在自动凸包碰撞工具中，利用以下设置设置以下参数：  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f0f8f6a-f9f1-4169-8f57-0e43c756e5aa/ht_addconvexhulls_03.png "HT_AddConvexHulls_03.png")
    
    属性名称
    
    值
    
    **凸包数量（Hull Count）**
    
    32
    
    **凸包最大顶点数（Max Hull Verts）**
    
    16
    
    **凸包精确度（Hull Precision）**
    
    50,000
    
4.  输入上述所有设置后，单击 **应用（Apply）** 按钮开始创建碰撞过程。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3df9517d-74e2-4cbc-8491-2504651d2c44/ht_addconvexhulls_07.png "HT_AddConvexHulls_07.png") 
    
    现在，碰撞的计算将作为后台任务在静态网格体编辑器中运行。碰撞创建进度将显示于以下进度窗口中。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92d3e72d-505a-45f9-9fb5-5a80805009da/ht_addconvexhulls_06.png "HT_AddConvexHulls_06.png")
    

## 最终结果

完成后，可以单击碰撞（Collision）图标，然后从下拉列表中选择简单碰撞（Simple Collision）选项，查看新的碰撞（如果尚未启用）。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cf26217-03b6-4421-8b60-04780bd72d1b/ht_addconvexhulls_05.png "HT_AddConvexHulls_05.png") ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2fa2cee3-ee26-4cb0-9738-583987fea216/ht_addconvexhulls_04.png "HT_AddConvexHulls_04.png")

下面图像序列显示了，将自动凸包碰撞的值从默认设置增大为允许的最大设置时，会得到什么类型的结果。

  ![自动凸包碰撞设置的结果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cdb5b10-a5b2-422a-9917-9917df8e9928/ht_addconvexhulls_default.png) ![自动凸包碰撞设置的结果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3094b04e-98f2-4c4c-bedc-00fe5be6025a/ht_addconvexhulls_medium.png) ![自动凸包碰撞设置的结果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e58e577-7c40-41f1-b6e0-dd0e36e2cdd1/ht_addconvexhulls_high.png)

自动凸包碰撞设置的结果

-   [collision](https://dev.epicgames.com/community/search?query=collision)
-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/add-a-collision-hull-to-a-static-mesh-using-the-auto-convex-collision-tool-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/add-a-collision-hull-to-a-static-mesh-using-the-auto-convex-collision-tool-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)