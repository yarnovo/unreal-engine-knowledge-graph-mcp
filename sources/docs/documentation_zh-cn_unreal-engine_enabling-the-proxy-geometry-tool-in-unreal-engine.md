# 启用虚幻引擎中的代理几何体工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/enabling-the-proxy-geometry-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:02:11.800Z

---

目录

![启用代理几何体工具](https://dev.epicgames.com/community/api/documentation/image/e8941ea3-77da-4cf7-bd5a-5a486131a19f?resizing_type=fill&width=1920&height=335)

你需要先启用代理几何体工具。在本教程中，我们将介绍如何在UE5项目中启用代理几何体工具。

## 步骤

1.  首先启动UE5项目，项目打开后，转至主工具栏选择 **编辑（Edit）> 项目设置（Project Settings）** 来打开项目设置。
    
    [![](01-project-settings.png)](01-project-settings.png)
    
    点击查看大图。
    
2.  项目设置打开后，转至 **编辑器（Editor）> 分层LOD网格体简化（Hierarchical LOD Mesh Simplification）** ，在 **通用（General）** 分段下点击 **分层LOD网格体缩减插件（Hierarchical LOD Mesh Reduction Plugin）** ，然后选择 **ProxyLODMeshReduction** 插件。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df54d9ce-b2cf-44ff-88ec-ab728d20f40d/02-proxy-lod-mesh-reduction-plugin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df54d9ce-b2cf-44ff-88ec-ab728d20f40d/02-proxy-lod-mesh-reduction-plugin.png)
    
    点击查看大图。
    
3.  接着转至 **工具（Tools）** ，然后点击 **合并Actor（Merge Actors）** 选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7a69dc6-ee8b-4f10-8ef5-75e5cbc27c49/04-merge-actors-option.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7a69dc6-ee8b-4f10-8ef5-75e5cbc27c49/04-merge-actors-option.png)
    
    点击查看大图。
    

## 最终结果

"合并Actor（Merge Actors）"工具打开后，你应该会在顶部看到两个图标。点击第二个图标，访问代理几何体工具的选项。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7c45d4a-16d1-4c72-a171-424198af8840/05-proxy-geometry-tools.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7c45d4a-16d1-4c72-a171-424198af8840/05-proxy-geometry-tools.png)

点击查看大图。

请注意，在选择放入关卡中的静态网格体之前，所有选项都将显示为灰色。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [proxy geometry tool](https://dev.epicgames.com/community/search?query=proxy%20geometry%20tool)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/enabling-the-proxy-geometry-tool-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/enabling-the-proxy-geometry-tool-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)