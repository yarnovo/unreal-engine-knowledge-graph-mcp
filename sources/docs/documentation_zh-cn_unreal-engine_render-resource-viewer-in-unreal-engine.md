# 虚幻引擎中的渲染资源查看器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/render-resource-viewer-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:23:01.071Z

---

目录

![渲染资源查看器](https://dev.epicgames.com/community/api/documentation/image/cd21ac70-c24c-41ea-b4bf-c0bff0b3dc28?resizing_type=fill&width=1920&height=335)

**渲染资源查看器** 是一种提供实时的 — 在窗口打开时捕获 — 所有的GPU内存分配去向和渲染资源的情况的快照的工具。这些包括顶点和索引缓冲区，以及它们来自的资产类型。这个工具对于美术师和开发者在辨别并理解那些资产正在进行分配时很有帮助。它也能提供优化GPU内存并使其项目保持在渲染预算之内所需的信息。

![渲染资源查看器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bec83d72-d11f-4ec5-abf7-4028a4e04676/render-resource-viewer-interface-5-3.png)

这个工具包括一个交互式界面：

-   显示每个渲染资源分配及其名称、大小、类型、标记和所有者。
-   有一个可排序和可筛选的分配表。
-   提供可用于识别和了解哪些资产在进行分配的信息。

## 打开渲染资源查看器

你可以从 **工具** 菜单中打开 **渲染资源查看器** 。

![启动渲染资源查看器的UE主菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5dc96962-6991-4484-835a-6b22fab8b9bf/opening-rrv.png)

## 了解渲染资源查看器界面。

渲染资源查看器界面由以下部分组成：

-   **刷新按钮**
    -   查看器会在打开时生成实时的快照，且不会随时自动更新。使用这个按钮来刷新列表并生成新的GPU内存分配快照。
        
        ![渲染资源查看器界面刷新按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4e40f98-2c85-4a20-aaaf-ccebe82e934f/render-resource-viewer-interface-refresh-5-3.png)
-   **资源过滤器**
    -   每个资源都有一些渲染标记。使用这些资源复选框来显示与你的搜索相关的经过滤条目。从以下条件中选择：
    -   **驻留（Resident）：** 可由GPU访问，并且未被逐出（未使用）。
    -   **临时：** 只在它处于活动状态的渲染过程中被分配，它将与框架中的其他资源共享底层内存。（过滤器默认不勾选）
    -   **流送：** 是一种可流动的纹理。
    -   **渲染目标（RT）：** 可以被GPU作为渲染目标缓冲区写入。
    -   **深度模板（DS）：** 可以被GPU作为深度模板缓冲区写入。
    -   **未排序存取视图（UAV）：** 支持未排序存取视图，允许从多个GPU线程暂时无序读/写存取而不产生内存冲突。
    -   **光线追踪加速结构（RTAS）：** 是一种光线追踪加速结构。
        
        ![渲染资源查看器界面按标记过滤](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cebde171-8a09-4e1b-a270-015cad442ec8/render-resource-viewer-interface-filterbyflags-5-3.png)
-   **搜索框** 同时从 **源命名** 和 **所有者** 两个种类中搜索文本。例如，要找到属于一个骨骼网格体的所有资源是很困难的，但通过搜索其所有者的路径，你可以看到正在使用的总内存。
    
    ![渲染资源查看器界面搜索字段](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4ee96ef-fe4e-4b3d-9394-2da908fa4e4f/render-resource-viewer-interface-search-5-3.png)
-   **资源总额**
    -   显示列表中的条目总数和它们的综合大小。改变筛选标志和搜索只列出筛选后的结果和它们的总数。
        
        ![渲染资源查看器界面资源总额](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6c8c418-899e-4b41-94c8-33b314e81017/render-resource-viewer-interface-resourcetotals-5-3.png)
-   **资源表**
    -   该窗口会列出关于某个资源占用内存的信息。在这个窗口中，你可以看到资源的名称、它的类型、大小和标记，以及该资源的所有者。所有者一列提供了资源所属的UObject的路径名称，包括其LOD索引。
        
        ![渲染资源查看器界面资源列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9718e3ca-37cb-41ca-9eed-6bf6be4932a8/render-resource-viewer-interface-resourcewindow-5-3.png)

## 附加说明

### 不存在所有者

当一个资源的所有者（owner）为 "无 "时，意味着该资源所有者目前没有被追踪。目前追踪的资源包括静态网格体、骨骼网格体、纹理和毛发/Groom资产。追踪的资源列表将会继续增加。

### 所有者路径和LOD索引

如果资源属于一个网格体，所有者路径也会在其末端显示该网格所属的LOD索引。例如，虚幻引擎中的一些默认模板所包含的Quinn人体模型有多个层次的细节设置。当查看这个骨骼网格的资源条目时，路径会看起来像 `/Game/Characters/Mannequins/Meshes/SKM_Quinn.SKM_Quinn[LOD1]` 。

### 在内容浏览器中浏览资产

使用热键 **CTRL + B** 或右键点击资产条目并选择 **浏览资产（Browse to Asset）** ，即可找到所列的资产。此操作可打开内容浏览器，显示资产的位置。如果没有与 **所有者（Owner）** **列** 关联的资产路径，则不采取任何操作。

![右键点击条目可在内容浏览器中浏览条目中的资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42c564f9-f44a-49c6-ad50-6c068c91671f/browstoasset.png)

-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [debugging](https://dev.epicgames.com/community/search?query=debugging)
-   [memory](https://dev.epicgames.com/community/search?query=memory)
-   [gpu](https://dev.epicgames.com/community/search?query=gpu)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [打开渲染资源查看器](/documentation/zh-cn/unreal-engine/render-resource-viewer-in-unreal-engine#%E6%89%93%E5%BC%80%E6%B8%B2%E6%9F%93%E8%B5%84%E6%BA%90%E6%9F%A5%E7%9C%8B%E5%99%A8)
-   [了解渲染资源查看器界面。](/documentation/zh-cn/unreal-engine/render-resource-viewer-in-unreal-engine#%E4%BA%86%E8%A7%A3%E6%B8%B2%E6%9F%93%E8%B5%84%E6%BA%90%E6%9F%A5%E7%9C%8B%E5%99%A8%E7%95%8C%E9%9D%A2%E3%80%82)
-   [附加说明](/documentation/zh-cn/unreal-engine/render-resource-viewer-in-unreal-engine#%E9%99%84%E5%8A%A0%E8%AF%B4%E6%98%8E)
-   [不存在所有者](/documentation/zh-cn/unreal-engine/render-resource-viewer-in-unreal-engine#%E4%B8%8D%E5%AD%98%E5%9C%A8%E6%89%80%E6%9C%89%E8%80%85)
-   [所有者路径和LOD索引](/documentation/zh-cn/unreal-engine/render-resource-viewer-in-unreal-engine#%E6%89%80%E6%9C%89%E8%80%85%E8%B7%AF%E5%BE%84%E5%92%8Clod%E7%B4%A2%E5%BC%95)
-   [在内容浏览器中浏览资产](/documentation/zh-cn/unreal-engine/render-resource-viewer-in-unreal-engine#%E5%9C%A8%E5%86%85%E5%AE%B9%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%AD%E6%B5%8F%E8%A7%88%E8%B5%84%E4%BA%A7)