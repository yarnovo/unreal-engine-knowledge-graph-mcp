# 面向Maya用户的虚幻编辑器和功能概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-editor-and-features-overview-for-maya-users
> 
> 生成时间: 2025-06-14T18:50:16.973Z

---

目录

![面向Maya用户的虚幻编辑器和功能概述](https://dev.epicgames.com/community/api/documentation/image/81517392-fee9-4de5-bec4-6f312d5deeab?resizing_type=fill&width=1920&height=335)

如果你要完全或部分从Maya工作流程转到虚幻引擎，可能会有一些挑战，因为原来的应用程序上有你依赖和熟悉的功能。 虽然两者在某些领域具有相似功能，但虚幻引擎提供的生态系统及其组织方式与Maya存在诸多差异。

本指南将逐步引导你了解如何开始使用虚幻引擎及其功能，并尽量对比Maya的等效功能。 本指南划分为多个小节，涵盖虚幻引擎新用户或临时用户需要了解的信息。

## 从Maya转换到虚幻引擎意味着什么？

[![](https://dev.epicgames.com/community/api/documentation/image/b1f5f387-7244-4f0b-b3c3-4c6ff58de746?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b1f5f387-7244-4f0b-b3c3-4c6ff58de746?resizing_type=fit)

-   **虚幻引擎管线和传统管线**
    
    -   在传统管线工作流程中，每个部门都有自己的任务分配，例如光照、外观开发、绑定、角色创建等。 当内容在一个部门完成处理后，可能会转到下一个部门单独处理，这会浪费时间，因为每个部门生成的内容需要花费一些时间才能找到合适的解决方案。
        
    -   使用全面集成的虚幻引擎管线有助于避免往返式工作流程和导入/导出问题。 当所有人都在同一个工具和所见即所得的实时编辑器中协作时，部门间的协作也会更简单。
        
-   **实时场景更新和全局时间轴**
    
    -   Maya有主时间轴，用于表示场景的整体时间。 你可以设置关键点并跳转到特定时间点。 在虚幻引擎中，你无需专用时间轴即可实时工作。 但它提供Sequencer等专用工具，你可以在其中查看时间轴并设置关键点，从而为场景中的对象制作动画。
        
-   **实时渲染和离线渲染**
    
    -   在Maya中，要使用Arnold或V-Ray渲染单帧，可能需要等待数分钟到数小时。 在虚幻引擎中，你可以实时查看结果。
        
-   **虚幻引擎提供无缝资产集成**
    
    -   FBX、Alembic和USD导入管线可保留你在Maya中创建的几何体、绑定和动画资产。
        
-   **内置美术师友好型工具，重塑传统管线工作流程**
    
    -   虚幻引擎自带一套工具，涵盖从项目初期到最终输出的全流程开发。 它可以替代传统离线管线的全部环节，让你在做出修改时获得实时反馈。 无需等待即可看到最终结果。
        
    -   虚幻引擎还支持全套动画工作流程功能，包括骨骼网格体编辑工具、使用控制绑定进行绑定、动画师工具包插件、动画变形器等。
        
    -   借助引擎的材质编辑器、后期处理效果、粒子和物理系统，你可以使用迭代协作的工作流程，让团队共同为项目打造几乎任何风格和视觉效果。
        
    -   高质量照明系统具备动态全局光照和反射功能，并支持电影级质量阴影投射，无需任何额外设置即可运行。
        

## Maya和虚幻引擎术语

在全面学习虚幻引擎之前，我们先来梳理你可能熟悉的Maya术语及其在虚幻引擎中的对应概念。

Autodesk Maya

虚幻引擎

场景文件

项目

通道盒/特性编辑器

细节面板

大纲视图

大纲视图/动画大纲视图

引用角色/资产

使用内容浏览器实例化

时间轴/摄影表/Trax编辑器

Sequencer

场景/环境集

关卡

动画场景文件

关卡序列

图表编辑器

曲线编辑器

Hypershade

材质编辑器

## 主题

要了解并熟悉虚幻引擎及其功能，请探索以下主题。 最好从上到下依次学习，但每个主题也可独立学习，无需依赖其他页面内容。

[

![Unreal Engine Interface and Navigation](https://dev.epicgames.com/community/api/documentation/image/ed24529a-e266-4568-984f-df7e0ade61ed?resizing_type=fit&width=640&height=640)

Unreal Engine Interface and Navigation

An overview of Unreal Engine's editor interface and navigation controls for Maya users.





](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-interface-and-navigation)[

![从Maya向虚幻引擎导入内容](https://dev.epicgames.com/community/api/documentation/image/f8fbdc57-60a2-4212-b12d-ef3286dbcf36?resizing_type=fit&width=640&height=640)

从Maya向虚幻引擎导入内容

面向Maya用户的虚幻引擎导入内容概述。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/importing-content-into-unreal-engine-from-maya)[

![面向Maya用户的虚幻引擎材质和纹理的使用](https://dev.epicgames.com/community/api/documentation/image/6a37b218-b4ec-4bf6-8a11-c8a179732c64?resizing_type=fit&width=640&height=640)

面向Maya用户的虚幻引擎材质和纹理的使用

面向Maya用户的虚幻引擎材质系统和纹理概述。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-materials-and-textures-in-unreal-engine-for-maya-users)[

![面向Maya用户的虚幻引擎的光照和渲染](https://dev.epicgames.com/community/api/documentation/image/7d33fa95-94e5-41a0-a0b0-8aa675febf9c?resizing_type=fit&width=640&height=640)

面向Maya用户的虚幻引擎的光照和渲染

面向Maya用户的虚幻引擎的光照和渲染功能概述。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lighting-and-rendering-in-unreal-engine-for-maya-users)[

![面向Maya用户的虚幻引擎脚本编写](https://dev.epicgames.com/community/api/documentation/image/99aff70c-a054-43d4-9914-619d44f0aa7b?resizing_type=fit&width=640&height=640)

面向Maya用户的虚幻引擎脚本编写

面向Maya用户的虚幻引擎脚本编写功能概述。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/scripting-in-unreal-engine-for-maya-users)[

![面向Maya用户的虚幻引擎世界设计和编译](https://dev.epicgames.com/community/api/documentation/image/05c0e147-696a-4569-88c5-b3b34f89fbee?resizing_type=fit&width=640&height=640)

面向Maya用户的虚幻引擎世界设计和编译

面向Maya用户的虚幻引擎场景设计工具概述。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/designing-and-building-worlds-in-unreal-engine-for-maya-users)[

![面向Maya用户的虚幻引擎动画制作](https://dev.epicgames.com/community/api/documentation/image/802c3c57-db1a-4b03-b13b-db4a95bdc17d?resizing_type=fit&width=640&height=640)

面向Maya用户的虚幻引擎动画制作

面向Maya用户的虚幻引擎动画系统及其核心功能概述。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animating-in-unreal-engine-for-maya-users)[

![面向Maya用户的虚幻引擎过场动画和Sequencer的使用](https://dev.epicgames.com/community/api/documentation/image/151ad5cd-0264-4a95-bc52-099124d0643b?resizing_type=fit&width=640&height=640)

面向Maya用户的虚幻引擎过场动画和Sequencer的使用

面向Maya用户的虚幻引擎过场动画工具Sequencer概述。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-cinematics-and-sequencer-in-unreal-engine-for-maya-users)[

![面向Maya用户的虚幻引擎其他功能和资源](https://dev.epicgames.com/community/api/documentation/image/e3d9254a-8c32-49a7-a657-8393f5840d6c?resizing_type=fit&width=640&height=640)

面向Maya用户的虚幻引擎其他功能和资源

面向Maya用户的虚幻引擎其他功能及有用资源概述。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/additional-features-and-resources-of-unreal-engine-for-maya-users)

-   [maya](https://dev.epicgames.com/community/search?query=maya)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [从Maya转换到虚幻引擎意味着什么？](/documentation/zh-cn/unreal-engine/unreal-editor-and-features-overview-for-maya-users#%E4%BB%8Emaya%E8%BD%AC%E6%8D%A2%E5%88%B0%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E6%84%8F%E5%91%B3%E7%9D%80%E4%BB%80%E4%B9%88%EF%BC%9F)
-   [Maya和虚幻引擎术语](/documentation/zh-cn/unreal-engine/unreal-editor-and-features-overview-for-maya-users#maya%E5%92%8C%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E6%9C%AF%E8%AF%AD)
-   [主题](/documentation/zh-cn/unreal-engine/unreal-editor-and-features-overview-for-maya-users#%E4%B8%BB%E9%A2%98)