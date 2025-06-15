# 虚幻引擎材质分析工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-material-analyzer-tool
> 
> 生成时间: 2025-06-14T19:29:36.456Z

---

目录

![材质分析器](https://dev.epicgames.com/community/api/documentation/image/196e85cc-ec96-4f7a-bcc9-c757c9f82ca7?resizing_type=fill&width=1920&height=335)

**材质分析器** 是一个开发者工具，帮助你识别和分析项目中的所有材质或[材质实例](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)。这样使你能够进行一些更改，从而节约着色器Permutation和存储数据成本。当你选择要分析的材质或材质实例后，该工具将查找该材质的所有后代（或材质实例的父材质的所有后代）。该工具还能识别所有基础属性覆盖、静态切换和静态组件遮罩参数。

## 打开材质分析器

1.  在菜单栏中，单击 **工具（Tools）> 审核（Audit） > 材质分析器（Material Analyzer）**。**材质分析器（Material Analyzer）** 窗口将会打开。
    
    ![Material Analyzer menu path](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e36c4921-5fe6-47f2-92d6-61ce84d55c3e/material-analyzer-menu.png)
2.  单击 **要分析的材质（Material to Analyze）** 旁边的下拉菜单。通过列表或搜索栏，选择想要分析的材质或材质实例。
    
    ![Select Material to analyze](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a38a3aec-fa40-4357-ac28-1af5bec9689e/select-material-to-analyze.png)
3.  材质分析器工具显示你选择的材质的所有实例列表。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1624405-5037-498b-9b37-dcfabefbc350/material-analyzer-results.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1624405-5037-498b-9b37-dcfabefbc350/material-analyzer-results.png)
    

## 查看建议列表

材质实例层级下面是一个建议列表。建议列表将具有一组相同静态覆盖的所有材质实例分组到一起。你可以单击每一行旁边的箭头来查看标识的静态实例。  
![Suggestion list](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be661958-c171-432e-8248-f9a322aae8cf/suggestion-list.png)

## 创建本地集合

每个建议列表都有一个 **创建本地集合（Create Local Collection）** 按钮。单击该按钮来将所有相关实例放置在一个本地集合中，这样就可以轻松找到它们并进行更新，让它们拥有更高效的参数设置。

![Create local collection](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94e9f642-de4c-4343-b259-ab902d0b3df4/create-local-collection.png)

## 查看静态切换参数列表

要查看材质实例的静态切换参数，单击"静态切换参数"（Static Switch Parameter）列旁的箭头来显示完整列表。这些列的大小是可以调整的，因此如果文本被裁减掉，可以移动列。

![Static switch parameters](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ce80245-6e8f-4974-b745-86cf952854c1/static-switch-parameters.png)

## 重设材质实例父项

你可以将这些材质实例的父项重设为拥有相同静态覆盖的新实例，以便重设父项的材质实例只更改它们的唯一覆盖。这样就节省了着色器Permutation和存储数据方面的成本。确保从你重设了父项的材质实例移除所有静态参数覆盖，否则仍会存储多余数据。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [打开材质分析器](/documentation/zh-cn/unreal-engine/unreal-engine-material-analyzer-tool#%E6%89%93%E5%BC%80%E6%9D%90%E8%B4%A8%E5%88%86%E6%9E%90%E5%99%A8)
-   [查看建议列表](/documentation/zh-cn/unreal-engine/unreal-engine-material-analyzer-tool#%E6%9F%A5%E7%9C%8B%E5%BB%BA%E8%AE%AE%E5%88%97%E8%A1%A8)
-   [创建本地集合](/documentation/zh-cn/unreal-engine/unreal-engine-material-analyzer-tool#%E5%88%9B%E5%BB%BA%E6%9C%AC%E5%9C%B0%E9%9B%86%E5%90%88)
-   [查看静态切换参数列表](/documentation/zh-cn/unreal-engine/unreal-engine-material-analyzer-tool#%E6%9F%A5%E7%9C%8B%E9%9D%99%E6%80%81%E5%88%87%E6%8D%A2%E5%8F%82%E6%95%B0%E5%88%97%E8%A1%A8)
-   [重设材质实例父项](/documentation/zh-cn/unreal-engine/unreal-engine-material-analyzer-tool#%E9%87%8D%E8%AE%BE%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B%E7%88%B6%E9%A1%B9)