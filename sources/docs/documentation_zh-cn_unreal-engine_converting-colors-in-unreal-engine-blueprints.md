# 在虚幻引擎蓝图中转换颜色 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/converting-colors-in-unreal-engine-blueprints
> 
> 生成时间: 2025-06-14T20:30:19.101Z

---

目录

![在蓝图中转换颜色](https://dev.epicgames.com/community/api/documentation/image/9276bf84-1b93-45f3-a78b-e2ead2870841?resizing_type=fill&width=1920&height=335)

你可以使用 **蓝图（Blueprints）** 将[OpenColorIO](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine) (**OCIO**)颜色变换应用于任何一种输入纹理（包括播放视频源的 **MediaTexture**），并在 **RenderTarget** 中获得转换后的结果。此页面将显示如何在项目中使用 **Apply Color Space Transform** 蓝图函数。

## 先决条件

你必须在项目中设置以下内容才能完成下面的分段：

-   一个 **OpenColorIO配置资产（OpenColorIO Configuration Asset）**。请参阅[OpenColorIO快速入门](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine)了解创建此资产的步骤。
    
-   一个 **蓝图类（Blueprint Class）** ，从包含 **事件更新函数（Event Tick）** 的 **蓝图Actor（Blueprint Actor）** 创建。
    

## 使用Apply Color Space Transform函数

执行以下步骤，将颜色转换应用于蓝图。这些步骤使用 **EditorUtilityActor** 蓝图类作为示例。

1.  在 **蓝图编辑器（Blueprint Editor）** 中，双击打开你的 **蓝图类（Blueprint Class）** 。
    
2.  在 **我的蓝图（My Blueprint）** 面板中的 **变量（Variables）> 组件（Components）** 下，点击 **添加(+)变量（Add (+) Variable）** 以创建新变量。将新变量命名为 **InputTexture** 。
    
    ![在蓝图类中添加新变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bfbffe18-ee54-4fe1-a2fc-79f31e21114a/add-new-variable.png)
3.  在新的InputTexture变量旁边，点击 **设为公开（Make Public）** ，使其在此蓝图之外可见。
    
    ![设为公开的InputTexture变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48697fd0-94c5-4046-8b1a-1cd01d24c752/make-variable-public.png)
4.  将变量InputTexture的 **变量类型（Variable Type）** 设为 **对象类型（Object Types）> 纹理（Texture）> 对象引用（Object Reference）** 。
    
    ![将InputTexture变量类型设为纹理对象引用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6612cbc3-3750-4147-ac6d-1007385ae174/set-inputtexture-variable-type-texture.png)
5.  再创建两个变量并将其设为公开：
    
    -   **OutputTexture** ，变量类型为 **纹理渲染目标2D（Texture Render Target 2D）> 对象引用（Object Reference）**
        
    -   **ColorConversionSettings** ，变量类型为 **打开颜色IOColor转换设置（Open Color IOColor Conversion Settings）** 。
        
    
    ![创建了所有变量的蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0438a3a-8182-48bd-83da-a9ab5b16c990/ocio-variables-created.png)
6.  将 **InputTexture** 变量拖动到 **事件图表（Event Graph）** 中，然后选择 **Get InputTexture**。这会在事件图表中创建新的InputTexture节点。
    
    ![拖动到事件图表中以创建Get InputTexture节点的InputTexture变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00a58396-c6e7-4253-9ff5-df55c588114d/get-inputtexture-node.png)
7.  对 **OutputTexture** 和 **ColorConversionSettings** 变量重复该过程。
    
    ![从所有变量创建的蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95e6c158-e5a4-4913-8701-95223144a48a/blueprint-ocio-nodes-created.png)
8.  在 **事件图表** 中右键点击，然后添加新的 **Apply Color Space Transform** 节点。
    
    ![Apply Color Space Transform节点已创建](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e412dd43-e9b0-454b-b546-a4aa2ec01118/apply-color-space-transform-node.png)
9.  将这些节点连接起来：
    
    -   将 **输出执行引脚** 从预先提供的 **Event Tick** 节点连接到 **Apply Color Space Transform** 节点的 **输入执行引脚**。
        
    -   将 **InputTexture** 节点的 **输出数据引脚** 连接到 **Apply Color Space Transform** 节点上的 **输入纹理输入数据引脚**。
        
    -   将 **OutputTexture** 节点的 **输出数据引脚** 连接到 **Apply Color Space Transform** 节点的 **输出渲染目标** **输入数据引脚**。
        
    -   将 **Color Conversion Settings** 节点的 **输出数据引脚** 连接到 **Apply Color Space Transform** 节点的 **转换设置输入数据引脚**。
        
    
    ![蓝图节点已连接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/627fac96-cfc1-47ce-a419-d50e8c2039d6/blueprint-nodes-connected.png)
10.  **编译（Compile）** 并 **保存（Save）** 蓝图。关闭蓝图编辑器。
    
11.  将你的 **蓝图资产（Blueprint Asset）** 拖动到关卡中以创建其 **Actor** 。
    
12.  在 **大纲视图（Outliner）** 中，选择你的 **蓝图Actor（Blueprint Actor）** 以打开其 **细节（Details）** 面板。
    
13.  在 **细节（Details）** 面板中，展开 **默认（Default）** 分段，并将 **输入纹理（Input Texture）** 设为你所需的输入文件。
    
14.  在 **内容浏览器（Content Browser）** 中创建 **渲染目标资产（Render Target Asset）** ，并将 **输出纹理（Output Texture）** 设为指向新的渲染目标资产。
    
    ![分配了所有变量的蓝图类Actor的细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa65a16d-0b03-4522-a437-a8af4d2a9932/blueprint-class-variables-assigned.png)
15.  在 **蓝图Actor（Blueprint Actor）** 的 **细节（Details）** 面板中，展开 **颜色转换设置（Color Conversion Settings）** 分段。将 **配置源（Configuration Source）** 设为你的OpenColorIO配置资产，并调整 **源颜色空间（Source Color Space）** 和 **目标颜色空间（Destination Color Space）** 以匹配输入和输出媒体的颜色空间。
    
16.  将你的 **渲染目标资产（Render Target Asset）** 拖动到关卡中的 **Actor** ，以使用颜色变换预览你的媒体。你可以继续调整源颜色空间（Source Color Space）和目标颜色空间（Destination Color Space）设置以便预览不同的输出。
    

-   [vfx](https://dev.epicgames.com/community/search?query=vfx)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/converting-colors-in-unreal-engine-blueprints#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [使用Apply Color Space Transform函数](/documentation/zh-cn/unreal-engine/converting-colors-in-unreal-engine-blueprints#%E4%BD%BF%E7%94%A8applycolorspacetransform%E5%87%BD%E6%95%B0)