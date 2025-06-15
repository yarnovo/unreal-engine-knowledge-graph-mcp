# 虚幻引擎中的场景文件夹结构 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/envs-folder-structure-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:25:40.514Z

---

目录

![场景文件夹结构](https://dev.epicgames.com/community/api/documentation/image/be3f2d9b-e890-42fd-8f4a-93bdcf7bbf47?resizing_type=fill&width=1920&height=335)

![内容浏览器中推荐的场景文件夹结构](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/feb5f901-2594-43c4-be0e-1f58cae484e0/cb_env.png)

**场景（Envs）** 文件夹包括用于你的场景（envs）的所有资产。

由于源控制只能让你取出二进制资产，比如 `.umap` 文件，每个在同一个场景中工作的人都必须在他们自己的关卡中工作。要解决该问题，可以将一个场景根据每个Actor的类型分为多个[子关卡](/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine)。

举个例子，一个光线美术师可以在光照子关卡中工作，FX美术师可以在FX子关卡中工作。通常还可以有多个GEO关卡来将场景划分为不同的区域，分给各个美术师进行工作。要使用的子关卡的数量和种类取决于生产的需求。

该分区中的文件链接至 **Stages** 文件夹的文件，因为它们会在最终摄像机内持续关卡被合并。

以下是在示例项目中对于每个场景使用的各种文件夹类型：

-   **关卡资产（Level Asset）**：关卡资产遵循 (关卡名)\_(描述) 结构。\_P 后缀用于持续关卡，作为子关卡的容器。打开该关卡资产可以查看由所有子关卡构成的整个场景。
    
-   **子关卡（SubLevels）**：在该项目中，每个关卡都分为焦散（Caustics）、FX、Geo和光照子关卡。
    
-   **快照（Snapshots）**：与关卡关联的关卡快照资产。
    

示例：

-   CaveEntrance
    
    -   CaveEntrance\_P — Main persistent level
        
    -   SubLevels
        
        -   CaveEntrance\_Geo\_A
            
        -   CaveEntrance\_Lighting\_A
            
        -   CaveEntrance\_FX\_A
            
        -   CaveEntrance\_Anim\_A
            
        -   CaveEntrance\_Vis\_A
            
    -   Snapshots
        
        -   SNAP\_CaveEntrance\_(Description)
-   CavePath
    
-   SpaceJunkyard
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36250fd2-ece3-4620-9ad3-0cd8cfebe496/envs-chart.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36250fd2-ece3-4620-9ad3-0cd8cfebe496/envs-chart.png)

推荐的内容浏览器中项目场景文件夹结构示意图。

-   [content browser](https://dev.epicgames.com/community/search?query=content%20browser)
-   [icvfx](https://dev.epicgames.com/community/search?query=icvfx)
-   [virtual sets](https://dev.epicgames.com/community/search?query=virtual%20sets)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)