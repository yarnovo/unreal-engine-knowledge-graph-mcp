# 在虚幻引擎中整理材质图表 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:26:19.087Z

---

目录

![整理材质图表](https://dev.epicgames.com/community/api/documentation/image/059179f9-d112-4131-889e-c0eba77ea655?resizing_type=fill&width=1920&height=335)

随着材质的复杂度提高，节点图表会很快变得难以阅读和交互。当材质从主要作者移交给其他美术师或开发人员时，复杂、无序的图表编辑起来很慢，其他人员也很难理解这些图表。

## 材质编辑器整理工具

虚幻引擎包含了多个工具，用于整理材质图表。

1.  [注释](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E6%B3%A8%E9%87%8A)
2.  [重路由节点](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E9%87%8D%E8%B7%AF%E7%94%B1%E8%8A%82%E7%82%B9)
3.  [可命名重路由节点](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E5%8F%AF%E5%91%BD%E5%90%8D%E9%87%8D%E8%B7%AF%E7%94%B1%E8%8A%82%E7%82%B9)
4.  [对齐和分布](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E5%AF%B9%E9%BD%90%E5%92%8C%E5%88%86%E5%B8%83)
5.  [折叠节点](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E6%8A%98%E5%8F%A0%E8%8A%82%E7%82%B9)

## 注释

注释是改进材质图表可读性的最简易的方法。 此材质并未达到过分复杂的程度，但如果没有注解，交到另一个美术师手里之后，也需要费一些工夫来解读。

 ![带有和不带有注释的材质图表网络。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ecd478e-dbea-444d-a648-7712fc7b3870/messy-graph.png) ![带有和不带有注释的材质图表网络。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e18c6aa5-3006-4fda-97a6-5dbeb81b458e/commented-graph.png)

**带有和不带有注释的材质图表网络。**

拖动滑块以查看使用注释注解的相同材质。 每组节点在做什么，通过标签即可做到一目了然。

有两种方法可以为材质添加注释。

### 节点说明

你可以向节点图表中的单个材质表达式或函数添加注释或说明。

1.  将鼠标指针悬停在材质图表中的节点上。
2.  **左键点击** **切换注释气泡** 图标。
    
    ![切换注释气泡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3ace36c-bdbf-46cf-b937-f60b4c5510b5/toggle-comment.png)
3.  在字段中输入注释。
    
    ![输入注释](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cf5215e-ebb2-429e-bb53-f6ce64a58043/add-comment.png)
4.  如果你希望在放大和缩小材质图表时保持注释可见，请点击固定图标。这样一来，即使在缩小的情况下，注释仍能保持可辨识的大小。 你可以再次点击 **切换注释气泡** 图标以隐藏注释。
    
    ![固定注释](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/deb29416-1096-480b-8a62-5744bb3cb0e9/pin-comment-sm.png)

你在注释气泡中键入的所有内容也会显示在该节点的 **细节（Details）** 面板的 **说明（Desc）** 字段中。 即使隐藏注释气泡，此说明仍保持可见。

![节点说明框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a67008a-deb8-40fa-a1ee-115648d2c899/node-description.png)

### 注释框

你可以使用注释框将一系列相关节点分组在一起。

![UV平铺注释框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97b11d73-2eba-487f-92fc-b09a4fd8891d/global-tiling-comment.png)

1.  选择你想放入注释框中的所有节点。
2.  按 **C 键** 以在所选节点周围创建一个注释框。
3.  在标题字段中键入名称。

使用注释框，你可以将框中的所有节点作为单个组一起移动。**左键点击并拖动** 标题栏以移动注释框。

-   你可以将节点拖入或拖出注释框来添加和删除节点。
-   拖动边角或边缘来调整注释框大小。
-   你可以将注释框互相嵌套。

### 注释颜色

注释框在 **细节（Details）** 面板中有一个颜色属性。

1.  点击注释框的 **标题栏（header bar）** 以访问其"细节（Details）"属性。
    
    ![注释标题栏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31b6691e-c2a6-4a6f-b90d-d8b2d4a5f002/comment-header.png)
2.  点击 **注释颜色（Comment Color）** 色条并在 **取色器（Color Picker）** 对话框中选择新颜色。
    
    ![注释取色器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f78591f2-0e96-4fb9-adfd-3cb4a349591d/comment-color-sm.png)

## 重路由节点

重路由节点允许你修改两个材质节点之间的路径。你还可以使用重路由节点来分割连线，以便连到多个输入引脚上。

在连线任意位置双击，添加一个重路由节点。

![Add wire reroute pin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf562235-652c-4a5a-8cd2-847fee976651/cable-reroute-add.png)

要修改连线的路径，请将鼠标悬停在重路由节点上，直到显示移动图标。

![移动连线重路由引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d49a427-4087-4bb9-8974-2ec1e35de43c/cable-reroute-hover.png)

左键点击并拖动引脚到新位置。 使用重路由，你可以重定向阻碍原始路径的节点周围的连线。

![新连线路径](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ccf45cfe-7d65-4b87-8e18-7c843af489eb/cable-reroute-example.png)

在者视频中，重路由节点用来分割连线，以便将其插入三个输入。

## 可命名重路由节点

使用 **可命名重路由节点**，你可以消除连线，并改为通过输入和输出节点路由信息，从而简化材质图表。 可命名重路由节点就像从材质图表的一个区域到另一个区域的隧道或门户。

例如，与"粗糙度（Roughness）"贴图相关节点的这个小群集会在材质图表中间创建相对较长的连线。 使用可命名重路由节点，你可以消除连线，而不更改信息流。

![不必要的连线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f090952b-476f-441c-9894-07a33d6cd7a9/unnecessary-cable.png)

### 创建可命名重路由节点

1.  沿连线双击，以添加重路由引脚。
    
    ![可命名重路由节点引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/053fa858-baf1-46f3-9008-b952140f8bba/named-reroute-pin.png)
2.  右键点击节点，在上下文菜单中选择 **转换为可命名重路由节点（Convert to Named Reroute）**。
    
    ![转换为可命名重路由节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5d8e391-2e67-45fa-9f7e-e1b04f573d98/convert-to-named.png)
3.  连线连接将消失，并将在连接的开头和结尾创建两个 **可命名重路由节点（Named Reroute）** 节点。它们并排显示，你可以看到可命名重路由节点很像一个隧道。 数据流入第一个节点，并通过第二个节点流出，后者称为 **可命名重路由节点用途节点（Named Reroute Usage node）** 。
    
    ![可命名重路由节点节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f31fba2f-a72c-4c23-9900-ae060251e060/named-reroute-nodes.png)

重路由中的第一个节点称为 **可命名重路由节点声明（Named Reroute Declaration）** 。在 **细节（Details）** 面板中为此节点提供唯一的描述性名称极其重要。

![重路由声明描述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9eb52c45-22b5-4bd2-a248-4236c658ad0c/reroute-declaration.png)

选择"可命名重路由节点声明（Named Reroute Declaration）"节点，并在 **名称（Name）** 字段中输入说明。 如果你想对重路由进行颜色编码，还可以更改 **节点颜色（Node Color）** 属性。

可命名重路由节点 **输出节点** 可以传递到更下游的多个输入中，也可以进行复制并多次使用。

例如，之前我们使用了重路由引脚将全局UV功能按钮传递到三个下游输入内。

![三元重路由引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dca32eb8-3633-4324-a927-b1e383c0f2ff/triple-reroute.png)

如果此引脚转换为可命名重路由节点，将生成三个 **用途（Usage）** 节点，而不是一个。

![三个用途节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45905427-a4c3-4a42-bf4b-911ed83e96c7/triple-output.png)

**全局UV功能按钮（Global UV Controls）** 注释框中的内容已脱离节点网络的其余部分。 你可以将其移至图表中的任意位置，数据仍将通过可命名重路由节点流入 **反射率（Albedo）**、**粗糙度（Roughness）** 和 **基础法线（Base Normal）** UV。

![可命名重路由节点数据流](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/faf92ef2-30d4-4292-9256-850f507f5543/named-reroutes-zoomedout.png)

或者，你也可以根据需要使用单个可命名重路由节点输出节点，并将其馈送到所有三个UV输入中。

![单用途三个输入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6e36a40-4a6f-4652-b57a-d97acff790e5/named-reroute-output-alt.png)

### 添加可命名重路由节点用途节点

你可以从 **右键点击** 菜单或 **控制板** 添加更多可命名重路由节点用途节点。

材质中的所有可命名重路由节点都显示在菜单最顶部。 你还可以选择现有重路由节点并按 **Ctrl+D** 来复制这些节点。

![控制板中的可命名重路由节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57a3b7ba-a432-4d84-916b-d20d0011f689/call-reroutes.png)

### 转换回传统重路由

如果你认为看到连线连接更有利，可以将可命名重路由节点转换回未可命名重路由节点引脚。

 ![粗糙度可命名重路由节点将转换回传统重路由引脚。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/359c051d-ba1e-46e0-904c-4f4350b86a50/restore-connection.png) ![粗糙度可命名重路由节点将转换回传统重路由引脚。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e7d960a-ff14-431e-826b-2e0c087ae750/reroute-pin-restored.png)

粗糙度可命名重路由节点将转换回传统重路由引脚。

1.  **右键点击** 可命名重路由节点声明或用途节点（两者均可）。
2.  从菜单选择 **转换为重路由（Convert to Reroute）**。
    
    ![转换回重路由](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffe80cf7-cef9-460e-a5ee-8183059dc068/convert-to-reroute-cleaner.png)
3.  连线将恢复，并将留下未可命名重路由节点引脚。如果不再需要该引脚，你可以将其选中并按 **Delete** 键。
    
    ![删除重路由引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/331d152b-1a04-4541-b6e6-695b51822743/delete-pin.png)

### 重路由选择选项

可命名重路由节点节点有一些选择选项，可让你 **查找并选择** 材质图表中的对应重路由节点。

右键点击 **可命名重路由节点声明（Named Reroute Declaration）** 节点并点击 **选择可命名重路由节点用途（Select Named Reroute Usages）** 以选择该重路由的所有下游输出节点。

![选择重路由用途](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3088a9e2-7c11-4821-b61e-b44c4a0d4a24/select-usages.png)

右键点击 **可命名重路由节点用途（Named Reroute Usage）** 节点并点击 **选择可命名重路由节点声明（Select Named Declaration）** 以选择该重路由的上游源节点。

![选择重路由声明](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd987291-6c59-45d2-b990-de32e4b30e69/select-declaration.png)

## 对齐和分布

材质编辑器的右键点击菜单中有几个选项，用于在材质图表中对齐和分布节点。

1.  选择你想对齐的两个或更多节点。
    
    ![选择多个节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae9f8d46-8744-430d-9cd6-bb7daac070e3/select-multiple.png)
2.  **右键点击** 其中某个节点并打开 **对齐（Alignment）** 子菜单。
    
    ![对齐选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e466365-4b89-43d4-89a1-add6ba1bce3a/alignment-options.png)
3.  选择某个选项以对齐或分布所选节点。
    
    ![左对齐的节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2fcdf7d0-7097-4055-ab8b-fd6b74febe3b/aligned-and-distributed.png)

在此示例中，使用了 **左对齐（Align Left）** 来对齐所选节点的左边缘。 然后使用了 **垂直分布（Distribute Vertically）** 沿垂直轴在这些节点之间创建等距间隔。

### 对齐

使用"对齐（Align）"菜单中的选项，你可以沿六个不同的轴对齐节点。 你还可以拉直六个节点之间的连接连线。

选项

结果

快捷方式

上对齐

对齐所选节点的上边缘。

Shift+W

居中对齐

对齐所选节点的垂直中间位置。

Alt+Shift+W

下对齐

对齐所选节点的下边缘。

Shift+S

左对齐

对齐所选节点的左边缘。

Shift+A

中心对齐

对齐所选节点的水平中心。

Alt+Shift+S

右对齐

对齐所选节点的右边缘。

Shift+D

拉直连接

拉直两个节点之间的连线，使其完全水平。

Q

### 分布

使用 **分布（Distribution）** 选项，你可以沿水平或垂直轴在所选节点之间创建等距间隔。

选项

结果

水平分布（Distribute Horizontally）

在所选节点之间创建等距水平间隔。

垂直分布（Distribute Vertically）

在所选节点之间创建等距垂直间隔。

## 折叠节点

你可以使用 **折叠节点（Collapse Nodes）** 选项将多个材质表达式或函数压缩为单个节点。

你可能出于几种原因而需要这样做。

-   如果一大组相关节点变得过于复杂，将其折叠可以释放图表中的空间，使材质更易于阅读。
-   第二种用例是，一组节点非常普遍或存在重复性，你不需要查看完整节点网络就能理解其用途。

例如，下面显示的 **细节法线平铺（Detail Normal Tiling）** 节点使用熟悉的方法来控制纹理的比例。

![细节法线平铺](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8272e938-9741-481b-af81-f8c646d148b6/detail-normal-tiling.png)

要简化图表，你可以折叠"细节法线平铺（Detail Normal Tiling）"框中的所有内容：

### 如何折叠节点

1.  选择你想折叠的所有材质节点。
    
    ![选择节点组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b7ca410-23ee-41fb-a987-93126e438daa/select-detail-normals.png)
2.  .**右键点击** 其中某个节点并从上下文菜单选择 **折叠节点（Collapse Nodes）**。
    
    ![折叠节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c15c3ec-3f2f-4c92-aaab-6dd40e551f00/collapse-nodes.png)
3.  所选材质表达式将替换为带有默认名称 **折叠节点（Collapsed Nodes）** 的单个节点。
    
    ![折叠的节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/318cea05-231b-4942-a05a-8ecaef4ef3de/collapsed-nodes-unnamed.png)
4.  **左键点击** 节点顶部的名称，并在字段中输入描述性名称。
    
    ![重命名节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20a9465d-80d0-4420-960a-767aa88b65fa/rename-collapsed-node.png)
5.  图表的"细节法线（Detail Normals）"分段得到极大简化。
    
    ![简化的细节法线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e118604f-84cf-45eb-83bd-08e5f4a9185d/detail-normals-condensed.png)

### 编辑折叠节点

材质图表并没有发生改变。 折叠节点只是充当了其中的节点网络容器。

如果你将鼠标悬停在某个折叠节点上，你会看到其中存储的材质图表预览。

![悬停预览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83c93a6f-09cb-4922-b903-7a4b90333ba7/collapsed-node-preview.png)

**双击** 折叠节点以查看并编辑内容。这将在相同的材质编辑器窗口中打开子图表。

点击材质编辑器顶部浏览记录导航中的 **材质图表（Material Graph）** ，以停止查看折叠节点并返回主图表。

![返回图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06cc8008-0224-4976-a5f3-c86d9526a7dc/return-to-main-graph.png)

### 展开折叠节点

你可以展开折叠节点，回到其在材质图表中的先前配置。

1.  右键点击折叠节点。
2.  点击上下文菜单中的 **展开节点（Expand Node）**。
    
    ![展开节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ffa193f-8a27-496e-85e3-669e0f982de8/expand-node.png)
3.  折叠节点将恢复其原始位置。
    
    ![恢复的节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb42a161-7404-4688-bdc4-23ab6e96c697/nodes-restored.png)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [材质编辑器整理工具](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E6%9D%90%E8%B4%A8%E7%BC%96%E8%BE%91%E5%99%A8%E6%95%B4%E7%90%86%E5%B7%A5%E5%85%B7)
-   [注释](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E6%B3%A8%E9%87%8A)
-   [节点说明](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E8%8A%82%E7%82%B9%E8%AF%B4%E6%98%8E)
-   [注释框](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E6%B3%A8%E9%87%8A%E6%A1%86)
-   [注释颜色](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E6%B3%A8%E9%87%8A%E9%A2%9C%E8%89%B2)
-   [重路由节点](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E9%87%8D%E8%B7%AF%E7%94%B1%E8%8A%82%E7%82%B9)
-   [可命名重路由节点](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E5%8F%AF%E5%91%BD%E5%90%8D%E9%87%8D%E8%B7%AF%E7%94%B1%E8%8A%82%E7%82%B9)
-   [创建可命名重路由节点](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8F%AF%E5%91%BD%E5%90%8D%E9%87%8D%E8%B7%AF%E7%94%B1%E8%8A%82%E7%82%B9)
-   [添加可命名重路由节点用途节点](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%8F%AF%E5%91%BD%E5%90%8D%E9%87%8D%E8%B7%AF%E7%94%B1%E8%8A%82%E7%82%B9%E7%94%A8%E9%80%94%E8%8A%82%E7%82%B9)
-   [转换回传统重路由](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E8%BD%AC%E6%8D%A2%E5%9B%9E%E4%BC%A0%E7%BB%9F%E9%87%8D%E8%B7%AF%E7%94%B1)
-   [重路由选择选项](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E9%87%8D%E8%B7%AF%E7%94%B1%E9%80%89%E6%8B%A9%E9%80%89%E9%A1%B9)
-   [对齐和分布](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E5%AF%B9%E9%BD%90%E5%92%8C%E5%88%86%E5%B8%83)
-   [对齐](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E5%AF%B9%E9%BD%90)
-   [分布](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E5%88%86%E5%B8%83)
-   [折叠节点](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E6%8A%98%E5%8F%A0%E8%8A%82%E7%82%B9)
-   [如何折叠节点](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E5%A6%82%E4%BD%95%E6%8A%98%E5%8F%A0%E8%8A%82%E7%82%B9)
-   [编辑折叠节点](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E7%BC%96%E8%BE%91%E6%8A%98%E5%8F%A0%E8%8A%82%E7%82%B9)
-   [展开折叠节点](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine#%E5%B1%95%E5%BC%80%E6%8A%98%E5%8F%A0%E8%8A%82%E7%82%B9)

相关文档

[

材质表达式参考

![材质表达式参考](https://dev.epicgames.com/community/api/documentation/image/b9193bb7-2415-40f9-9ce6-998b0d1bed78?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-expressions-reference)

[

材质函数参考

![材质函数参考](https://dev.epicgames.com/community/api/documentation/image/8a665179-3355-4c89-9772-2eee352e8088?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-functions-reference)