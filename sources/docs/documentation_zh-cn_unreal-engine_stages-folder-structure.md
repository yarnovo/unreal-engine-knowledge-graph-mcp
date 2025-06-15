# 舞台文件夹结构 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/stages-folder-structure
> 
> 生成时间: 2025-06-14T20:26:07.756Z

---

目录

![舞台文件夹结构](https://dev.epicgames.com/community/api/documentation/image/955bf095-a61a-4e95-a705-fb7460c74d1d?resizing_type=fill&width=1920&height=335)

![内容浏览器中推荐的舞台文件夹结构](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bdee7bd2-7807-4e5d-9814-f766c26af413/cb_stages.png)

**舞台（Stages）** 文件夹包含 **nDisplay配置（nDisplay Configurations）**，这些配置描述了使用的LED体积和所有相关文件的拓扑。

本小节中的文件都与 **环境（Envs）** 文件夹文件相关联，因为它们会全部组合起来，用于最终的摄像机视觉特效处理持久关卡。

-   EpicLA
    
    -   EpicLAStage\_P - 主要舞台持久关卡
        
    -   WarpMeshes - 构成体积的网格体
        
        -   EpicLA\_C1
            
            -   SM\_EpicLA\_C1
                
            -   MI\_EpicLA\_C1\_(Description)\_A
                
            -   T\_EpicLA\_C1\_(Description)\_A
                
    -   Configs
        
        -   NPC\_EpicLA\_(Description)
            
        -   EpicLA\_(Description).cfg - `.cfg` 文件在内容浏览器中不可见
            

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62b38205-79b2-4f6b-9991-30752e78eb14/stages-chart.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62b38205-79b2-4f6b-9991-30752e78eb14/stages-chart.png)

该图在内容浏览器中显示项目的推荐舞台文件夹结构。

-   [content browser](https://dev.epicgames.com/community/search?query=content%20browser)
-   [icvfx](https://dev.epicgames.com/community/search?query=icvfx)
-   [virtual sets](https://dev.epicgames.com/community/search?query=virtual%20sets)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)