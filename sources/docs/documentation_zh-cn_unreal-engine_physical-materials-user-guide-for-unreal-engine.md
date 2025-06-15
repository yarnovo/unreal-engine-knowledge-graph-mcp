# 虚幻引擎物理材质用户指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/physical-materials-user-guide-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:50:12.790Z

---

目录

![物理材质用户指南](https://dev.epicgames.com/community/api/documentation/image/88b6b0cb-7ff2-41be-a424-ae0143ff3e06?resizing_type=fill&width=1920&height=335)

此文档包括 **物理材质（Physical Materials）** 的创建和使用，以及为项目启用或编辑 **表面类型（SurfaceTypes）**。

## 创建

1.  打开 Content Drawer。**点击** 添加 > 物理 > 物理材质（Add > Physics > Physical Material）**，或在** Content Drawer **中** 单击右键 -> 物理 -> 物理材质\*\*。
    
    ![ Click Add, Physics, Physical Material or right-click in the Content Drawer, Physics, Physical Material from the Content Drawer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34874995-c6e1-4fc4-abef-a30ddd88c9e3/new-physical-material.png)
2.  双击 **NewPhysicalMaterial** 对其属性进行编辑。
    
    ![Double click the NewPhysicalMaterial](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/942d3b11-db9f-4990-b360-b70068442801/physical-material-properties.png)
3.  **调整属性**。
    
    ![Adjust properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20538d07-82cb-447b-b4fa-9c6a9b9432c3/adjust-properties.png)
4.  **点击保存**
    
    ![Click Save](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb9b76c5-60ba-4997-9ddc-28ec7dd06af6/icon-save-asset-40x.png)

如需了解物理材质中属性的相关内容，请查阅 [物理材质参考](/documentation/zh-cn/unreal-engine/physical-materials-reference-for-unreal-engine)。

### 表面类型

虚幻引擎5默认支持 62 种表面类型，可根据需求任意对其进行标记。它们保存在项目的 `DefaultEngine.ini` 文件中，此文件的存放路径为 `YourProjectRoot\Config\DefaultEngine.ini`。

## 用法

### 材质

1.  **打开** 或 **创建** 一个新材质。
    
    ![Open or create a new Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8188930a-7b9d-41a2-97fd-c1bdbe4a11d7/physical-material-material-01.png)
2.  **选择** 主材质节点。
    
    ![Select the main material node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c344c7a-c8a1-4c3a-87ce-81ff8917ed0a/physical-material-none.png)
3.  **变更** 物理材质。
    
    ![Change the Physical Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/164820e1-a137-4add-b202-62f05cd02a5c/physical-material-glass-2.png)

### 材质实例

1.  打开或创建一个新 **材质实例**。
    
    ![Open or create a new Material Instance](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cffc485a-c123-4df3-8348-c4e172d9196c/physical-material-material-instance-01.png)
2.  **变更** 物理材质。
    
    ![Change the Physical Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/045f14fc-5a9e-414a-b0a1-3501f1de6c3f/basic-material.png)

### 物理资产（骨架网格体）

调整 **物理资产** 的 **物理材质** 时，最佳方法是将最常用的物理材质指定到物理资产中的所有 **物理形体** 上。

1.  在 **内容浏览器** 中双击物理资产，用 **物理资产编辑器** 打开物理资产。
    
    ![Double-click a Physics Asset in the Content Drawer to open it in the Physics Asset Editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4188a552-1cef-4cb5-93d2-53e96b9700a6/physics-asset.png)
2.  在物理资产编辑器中，打开 **物理材质** 下拉菜单\*\*，选择要应用的物理材质。 ![Select a Physical Material from the Physical Material dropdown in the toolbar in the Physics Asset Editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50ff6874-3a2b-42a4-8f27-563fb88487d9/physical-material-dropdown.png) 

如特定的物理形体需要不同的物理材质，可对它们进行单独调整。

1.  在 **Content Drawer** 中双击 **物理资产**，用 **物理资产编辑器** 打开物理资产。
2.  选择一个 **物理形体**。
3.  在细节面板中，在物理分类中，找到 **简单碰撞物理材质（Simple Collision Physical Material）**。

![Physical Material Physics Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c9dc2a8-2d9a-43a6-beb3-e97659545be9/physical-material-physics-asset-04.png)

骨架网格体的物理交互默认行为是只和与其相关的物理资产进行交互，因此将不使用 其材质的物理材质。

利用 Physics Assets 对 Simple Collision Physical Material 属性进行设置。追踪物理资产时需要执行复杂追踪， 此后复杂追踪将返回命中物理形体的 Simple Collision Physical Material 属性中所排列的物理材质。

### 静态网格体

**静态网格体** 包含 **简单碰撞**（用 3D 美术软件或 静态网格体编辑器创建的物理实体）和 **复杂碰撞**（碰撞体和模型形状一样）两种碰撞类型。这些碰撞可由多种不同材质组成，每种材质均包含其自身独有的物理材质。

碰撞

物理材质排序

**Simple**

碰撞或追踪使用简单碰撞时，它将引用 StaticMesh Editor 中设置的静态网格体物理材质。如静态网格体 Actor 的 *Phys Material Override* 未被设为 `None`，它将使用列于该属性中的物理材质。

**Complex**

碰撞或追踪使用复杂碰撞时，它将引用材质上的物理材质或应用至静态网格体 Actor 的材质实例。如静态网格体 Actor 的 Phys Material Override 未被设为 `None`，它将使用列于该属性中的物理材质。

为静态网格体设置简单碰撞物理材质的步骤：

1.  在内容浏览器中 **双击** 一个 **静态网格体**，打开 **静态网格体编辑器**。
    
    ![Double Click a Static Mesh in the Content Drawer to bring up the Static Mesh Editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41c2d7a2-e44c-4fb9-9ca2-64643daffbba/physical-material-static-mesh-editor-01.png)
2.  将 **静态网格体编辑器** 中的 **简单碰撞物理材质（Simple Collision Physical Material）** 属性改为所需的物理材质。
    
    ![Change the Simple Collision Physical Material property in the Static Mesh Settings category to the desired Physical Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54366111-d106-4913-96c2-d703fd6da209/physical-material-static-mesh-editor-02.png)
3.  **点击保存**
    
    ![Click Save](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/328a89ed-d323-4f71-94fd-d30a1c255ea8/icon-save-asset-40x.png)

### 杂项

![The Phys Material Override property exists on everything with a Physics category](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9674fd56-cc53-4b8c-9209-11ab82e08499/physical-material-override.png)

*Phys Material Override* 属性广泛存在于 **Collision** 类目下。它可利用选中的物理材质在 Actor 或组件上完全覆盖简单碰撞物理材质。

-   覆盖一个静态网格体的简单碰撞物理材质。
-   因为骨架网格体物理资产固定返回简单碰撞，可利用它覆盖放置好的骨架网格体 Actor 上的所有物理材质。

此操作在复杂碰撞追踪上无效。

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [physical materials](https://dev.epicgames.com/community/search?query=physical%20materials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建](/documentation/zh-cn/unreal-engine/physical-materials-user-guide-for-unreal-engine#%E5%88%9B%E5%BB%BA)
-   [表面类型](/documentation/zh-cn/unreal-engine/physical-materials-user-guide-for-unreal-engine#%E8%A1%A8%E9%9D%A2%E7%B1%BB%E5%9E%8B)
-   [用法](/documentation/zh-cn/unreal-engine/physical-materials-user-guide-for-unreal-engine#%E7%94%A8%E6%B3%95)
-   [材质](/documentation/zh-cn/unreal-engine/physical-materials-user-guide-for-unreal-engine#%E6%9D%90%E8%B4%A8)
-   [材质实例](/documentation/zh-cn/unreal-engine/physical-materials-user-guide-for-unreal-engine#%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B)
-   [物理资产（骨架网格体）](/documentation/zh-cn/unreal-engine/physical-materials-user-guide-for-unreal-engine#%E7%89%A9%E7%90%86%E8%B5%84%E4%BA%A7%EF%BC%88%E9%AA%A8%E6%9E%B6%E7%BD%91%E6%A0%BC%E4%BD%93%EF%BC%89)
-   [静态网格体](/documentation/zh-cn/unreal-engine/physical-materials-user-guide-for-unreal-engine#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [杂项](/documentation/zh-cn/unreal-engine/physical-materials-user-guide-for-unreal-engine#%E6%9D%82%E9%A1%B9)