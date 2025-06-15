# 虚幻引擎中的USD舞台编辑器快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:07:05.508Z

---

目录

![USD舞台编辑器快速入门](https://dev.epicgames.com/community/api/documentation/image/9129cc7e-f42f-4253-b7e9-3eff51aacc21?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

虚幻引擎将通过USD舞台Actor和USD舞台工作流程提供对USD的支持。在本快速入门指南中，你将：

-   创建USD舞台Actor。
-   使用USD舞台窗口编辑属性。
-   为USD舞台Actor添加新图元。
-   将数据写回USD文件。
-   使用Sequencer访问USD动画。
-   将资产导入虚幻引擎项目。

在开始之前，你需要在项目中启用 **USD导入器（USD Importer）** 插件。如需更多信息，请参阅[使用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。

### 先决条件和准备工作主题

为了理解和使用本页中提到的内容，请确保你熟悉以下主题：

-   [虚幻引擎中的通用场景描述](/documentation/zh-cn/unreal-engine/universal-scene-description-in-unreal-engine)

本教程使用皮克斯的厨房套装USD文件。皮克斯维护了小型的USD示例文件库，用于学习和演示。点击[此处](https://graphics.pixar.com/usd/release/dl_downloads.html)下载厨房套装和其他示例。

## 1\. 创建USD舞台Actor

打开USD舞台（USD Stage）面板，开始处理USD内容。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b48cb4b-0ca3-4c62-be00-bba0e3ff12e8/5-0-010-usd-stage-panel.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b48cb4b-0ca3-4c62-be00-bba0e3ff12e8/5-0-010-usd-stage-panel.png)

点击查看大图。

1.  在关卡编辑器中，从顶部菜单中选择 **窗口（Window）>虚拟制片（Virtual Production）>USD舞台（USD Stage）** 。
    
2.  在 **USD舞台编辑器（USD Stage Editor）** 面板的菜单中，选择 **文件（File）>打开（Open）** ，并找到USD文件。
    

层级分段将填充来自你的USD文件中的场景层级。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28183ba4-6cef-42eb-b653-65aa137d0efd/5-0-020-usd-hierarchy.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28183ba4-6cef-42eb-b653-65aa137d0efd/5-0-020-usd-hierarchy.png)

USD舞台窗口的层级分段填充了厨房套装的内容。 点击查看大图。

你在虚幻引擎中打开的每个USD文件都需要自己的 **USD舞台** Actor，用作USD数据的锚点。上述过程会自动将USD舞台Actor添加到你的关卡。

你也可以使用 **放置Actor（Place Actors）** 面板添加USD舞台Actor，并使用 **细节（Details）** 面板中的 **根层（Root Layer）** 选项为其选择关联的USD文件。

## 2\. 使用USD舞台窗口编辑属性

你可以使用USD舞台编辑器（USD Stage Editor）窗口的属性（Properties）分段，编辑你的USD舞台Actor和图元的属性。

### 更改USD舞台Actor的UpAxis

1.  选择USD舞台（USD Stage）窗口中层级顶部的 **舞台（Stage）** 。在属性（Properties）分段中，找到 **upAxis** 属性并点击下拉菜单。选择新轴来代表你的USD数据。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d7d3a0a-3f94-4df5-a8fa-58c9358f0d0a/5-0-030-change-usd-property.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d7d3a0a-3f94-4df5-a8fa-58c9358f0d0a/5-0-030-change-usd-property.png)
    
    选择最适合你的USD数据的轴。 点击查看大图。
    

### 更改图元的变体

1.  在USD舞台编辑（USD Stage Editor）中，选择 **选项（Options）>选择（Selection）** ，并启用 **与编辑器同步（Synchronize with Editor）** 。这会同步你在虚幻引擎关卡和USD舞台编辑器窗口之间的选择。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efe03d1a-3b3c-46d2-8cb9-983f54669885/5-0-040-synchronize-with-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efe03d1a-3b3c-46d2-8cb9-983f54669885/5-0-040-synchronize-with-editor.png)
    
    启用与编辑器同步（Synchronize with Editor），在USD舞台和虚幻引擎视口之间同步你的选择。 点击查看大图。
    
      
    
2.  在层级分段，点击 **Kitchen\_Set** 旁边的下拉箭头，展开分组。展开 **Props\_grp** ，显示场景中的道具。
    
3.  展开 **West\_grp** ，显示各个图元。橙色亮显的道具表示它们是 **复合弧** ，你可以右键点击所有的图元，从而为其添加引用（或清除引用）。其他右键点击操作包括添加或删除图元的功能，以及切换、加载或卸载有效负载的功能。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a313596-6403-4cf1-89d9-c3a2318e1d7b/5-0-050-prim-contextual-menu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a313596-6403-4cf1-89d9-c3a2318e1d7b/5-0-050-prim-contextual-menu.png)
    
    点击查看大图。
    
4.  展开 **DiningTable\_grp** ，选择 **ChairB\_1** 。你可以在属性（Properties）分段中编辑以下项目：
    
    属性
    
    说明
    
    **名称（name）**
    
    显示所选资产的名称。
    
    **路径（path）**
    
    显示所选资产的路径。
    
    **种类（kind）**
    
    定义所选资产的类型。
    
    -   **程序集** ：模型集合。
    -   **组件** ：包含子组件的模型类型。
    -   **组** ：程序集中的模型集合。
    -   **模型** ：种类的基础类型。资产不应将其种类设置为模型，因为它是用于区分组件和组的抽象共性。请参阅皮克斯USD文档中的[模型层级](https://graphics.pixar.com/usd/release/glossary.html#usdglossary-model)，了解更多信息。
    -   **子组件** ：组件内的图元。不是一种模型。
    
    **目的（purpose）**
    
    设置要加载的初始目的。将USD舞台Actor和整型用作输入。
    
    选项包括：
    
    -   默认值
    -   代理
    -   渲染
    -   指南
    
    **可视性（visibility）**
    
    设置要加载的初始目的。将USD舞台Actor和整型用作输入。
    
    选项包括：
    
    -   **已继承** ：从其父节点继承可视性
    -   **不可见** ：不渲染图元及其子树中包含的所有图元。
    
    **xformOp:rotateZ**
    
    定义所选资产的Z旋转。
    
    **xformOp:translate**
    
    定义资产的X、Y和Z位置。
    
    **xformOpOrder**
    
    显示变换操作应用于资产的顺序。
    
    **modelingVariant**
    
    定义在场景中显示的当前变体。仅当资产具有一个或多个变体时才可见。
    
    **参考（References）**
    
    显示附加到此图元的所有参考。
    
5.  此场景中的椅子有两个变体， **ChairA** 和 **ChairB** 。选择 **ChairB\_1** ，找到属性的 **变体（Variants）** 分段。将 **modelingVariant** 更改为 **ChairA** 。此操作会将场景中使用的椅子网格体与新变体交换。
    

## 3\. 向USD舞台Actor添加新图元

使用右键点击菜单在层级中添加或删除图元。添加后，可以在属性（Properties）分段中编辑属性。

### 在厨房套装中添加一把新椅子

1.  右键点击层级中的 **DiningTable\_grp** 条目，然后从菜单中选择 **添加图元（Add Prim）** 。将此新图元命名为 **ChairB\_3** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4544cdf9-be57-4a36-9291-fe4e3dc3523b/5-0-060-add-prim.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4544cdf9-be57-4a36-9291-fe4e3dc3523b/5-0-060-add-prim.png)
    
    将新图元添加USD舞台。 点击查看大图。
    
2.  选择层级中的新图元。在 **细节（Details）** 分段，将其 **种类（kind）** 更改为 **组件（component）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dc087aa-89f5-4d5e-86ed-868beb85a02b/5-0-070-kind-component.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dc087aa-89f5-4d5e-86ed-868beb85a02b/5-0-070-kind-component.png)
    
    更改新图元的属性。 点击查看大图。
    
3.  引用椅子USD文件，将其带入舞台。右键点击层级中的 **ChairB\_3** ，然后选择 **添加引用（Add Reference）** 。找到厨房套装文件的位置。打开 **assets > Chair** 文件夹并选择 **Chair.usd** 。点击 **打开（Open）** 。
    
4.  你的新图元现在将引用椅子USD数据并显示 **ChairS** 变体。它应该位于关卡的原点。在层级中选择 **ChairB\_3** ，并将modelingVariant更改为 **ChairB** 。
    
5.  点击视口中的新椅子，并使用变换工具将椅子放置在桌子附近。
    

## 4\. 将数据写回你的USD文件

使用USD舞台Actor所做的更改可以写回你的USD文件。从USD舞台面板中选择 **文件（File）>保存（Save）** 。

## 5\. 使用Sequencer访问USD动画

### 访问USD动画

存储在USD文件中的动画可以从USD舞台Actor生成的专用关卡序列中访问。

1.  在 **大纲视图（Outliner）** 中选择 **USDStageActor** 。在 **细节（Details）** 面板的 **USD** 分段，找到 **关卡序列（Level Sequence）** 。双击资产，在 **Sequencer** 中打开它。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb7b18dd-3ee4-4380-9262-3aee2e2866c2/5-0-080-usd-stage-actor-in-outliner.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb7b18dd-3ee4-4380-9262-3aee2e2866c2/5-0-080-usd-stage-actor-in-outliner.png)
    
    在细节（Details）面板中双击关卡序列（Level Sequence）。 点击查看大图。
    

有关Sequencer用法的更多信息，请参阅[过场动画和Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)。

### 对椅子进行动画处理

要将动画添加到你在第三步中创建的新图元 **ChairB\_3** ，你需要创建新的USD文件，并将其作为图层添加到USD舞台Actor（USD Stage Actor）。

1.  在USD舞台（USD Stage）窗口的 **图层（Layers）** 分段，右键点击 **kitchen\_set.usd** 图层并选择 **新增（Add New）** 。将此新文件另存为 **myanim.usda** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5810e1ba-df3f-45ea-8c83-3b544cbed368/5-0-090-add-new-usd-layer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5810e1ba-df3f-45ea-8c83-3b544cbed368/5-0-090-add-new-usd-layer.png)
    
    为动画的USD数据添加新图层。 点击查看大图。
    
2.  USD图层使用[LIVRPS结构](https://graphics.pixar.com/usd/release/glossary.html#usdglossary-livrpsstrengthordering)来确定图层如何影响场景的最终构图。若要使动画影响厨房套装，包含该动画的图层在图层结构中必须高于包含图元的场景。在关卡编辑器的顶部菜单中，选择 **窗口（Window）>放置Actor（Place Actors）** ，以打开面板。在 **放置Actor（Place Actors）** 面板中搜索 **USD Stage Actor** ，并将新副本拖到关卡中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ebc1865-90b2-4ce9-8eea-c2f137bf81cf/5-0-100-place-usd-stage-actor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ebc1865-90b2-4ce9-8eea-c2f137bf81cf/5-0-100-place-usd-stage-actor.png)
    
    放置Actor面板中的新USD Actor。 点击查看大图。
    
3.  在 **大纲视图（Outliner）** 中选择 **UsdStageActor** 。在USD舞台面板中，选择 **文件（File）>打开（Open）** ，然后浏览至你的 **myanim.usda** 文件。
    
4.  右键点击 **myanim.usda** 图层并选择 **添加现有图层（Add Existing）** 选项，将厨房套装添加回图层堆栈中。在文件（File）窗口中，找到你的 **kitchen\_set.usd** 文件并点击 **打开（Open）** 。
    
5.  在添加动画之前，USD舞台需要知道动画将持续多长时间。点击层级中的 **舞台（Stage）** 图元。在属性（Properties）分段，将 **endTimeCode** 和 **endFrame** 值更改为 **48** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dda329a9-5a65-4738-86eb-63141391175d/5-0-110-set-end-frame-and-timecode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dda329a9-5a65-4738-86eb-63141391175d/5-0-110-set-end-frame-and-timecode.png)
    
    更改endTimeCode和endFrame属性。 点击查看大图。
    
6.  在 **大纲视图（Outliner）** 中选择新的USD舞台Actor。在 **细节（Details）** 面板中，向下滚动至USD分段，找到 **关卡序列（Level Sequence）** 。双击资产，在 **Sequencer** 中打开它。
    
7.  在Sequencer面板中，点击 **\+ 轨道（+ Track）** 按钮，并从 **Actor到Sequencer（Actor to Sequencer）** 子菜单中选择你想要制作动画的Actor。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e527960-2ff9-4d49-aa82-6ee3faa8daf5/5-0-120-actor-to-sequencer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e527960-2ff9-4d49-aa82-6ee3faa8daf5/5-0-120-actor-to-sequencer.png)
    
    为选定的Actor添加新的轨道组。 点击查看大图。
    
8.  点击新轨道上的 **添加（+）（Add (+)）** 按钮并创建新的 **变换（Transform）** 轨道。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/020043a6-a06c-482d-ab4f-6f76b52a4cd3/5-0-130-add-transform-track.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/020043a6-a06c-482d-ab4f-6f76b52a4cd3/5-0-130-add-transform-track.png)
    
    添加新的变换轨道。 点击查看大图。
    
9.  对椅子进行原地旋转的动画处理。有关在Sequencer中使用轨道的更多信息，请参阅[轨道](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine)。
    
10.  在USD舞台（USD Stage）窗口中使用 **文件（File）> 保存（Save）** 将数据写回USD。
    

## 6\. 将资产导入虚幻引擎项目。

显示在USD存储Actor（USD Stage Actor）上的Actor，可以通过以下任一导入选项导入到虚幻编辑器的内容浏览器中。

-   使用 **文件（File）> 导入到关卡中（Import Into Level）** 。该流程将导入资产（静态网格体、骨骼网格体、材质和纹理等等）和Actor。
-   使用 **内容浏览器（Content Browser）** 中的 **添加/导入（Add/Import）** 按钮。该流程仅导入资产。
-   将文件拖放到 **内容浏览器（Content Browser）** 中。该流程仅导入资产。
-   使用USD舞台编辑器（USD Stage Editor）窗口中的 **操作（Action）> 导入（Import）** 选项。此过程将导入USD舞台Actor上的所有内容，并适用于资产和Actor。导入过程完成后，USD舞台上的资产将替换为 **内容浏览器** 中的新Actor。

### 将厨房套装导入虚幻引擎

1.  在USD舞台（USD Stage）窗口中打开厨房套装（Kitchen Set）后，打开 **操作（Actions）** 菜单并选择 **导入（Import）** 。
    
2.  选择存储导入资产的位置。在本例中，导入厨房套装将在所选位置创建名为 **Kitchen\_set** 的文件夹。材质和静态网格体将保存在单独的子文件夹中。
    

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [usd](https://dev.epicgames.com/community/search?query=usd)
-   [universal scene description](https://dev.epicgames.com/community/search?query=universal%20scene%20description)
-   [import/export](https://dev.epicgames.com/community/search?query=import%2Fexport)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件和准备工作主题](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6%E5%92%8C%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C%E4%B8%BB%E9%A2%98)
-   [1\. 创建USD舞台Actor](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#1%E5%88%9B%E5%BB%BAusd%E8%88%9E%E5%8F%B0actor)
-   [2\. 使用USD舞台窗口编辑属性](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#2%E4%BD%BF%E7%94%A8usd%E8%88%9E%E5%8F%B0%E7%AA%97%E5%8F%A3%E7%BC%96%E8%BE%91%E5%B1%9E%E6%80%A7)
-   [更改USD舞台Actor的UpAxis](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#%E6%9B%B4%E6%94%B9usd%E8%88%9E%E5%8F%B0actor%E7%9A%84upaxis)
-   [更改图元的变体](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#%E6%9B%B4%E6%94%B9%E5%9B%BE%E5%85%83%E7%9A%84%E5%8F%98%E4%BD%93)
-   [3\. 向USD舞台Actor添加新图元](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#3%E5%90%91usd%E8%88%9E%E5%8F%B0actor%E6%B7%BB%E5%8A%A0%E6%96%B0%E5%9B%BE%E5%85%83)
-   [在厨房套装中添加一把新椅子](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#%E5%9C%A8%E5%8E%A8%E6%88%BF%E5%A5%97%E8%A3%85%E4%B8%AD%E6%B7%BB%E5%8A%A0%E4%B8%80%E6%8A%8A%E6%96%B0%E6%A4%85%E5%AD%90)
-   [4\. 将数据写回你的USD文件](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#4%E5%B0%86%E6%95%B0%E6%8D%AE%E5%86%99%E5%9B%9E%E4%BD%A0%E7%9A%84usd%E6%96%87%E4%BB%B6)
-   [5\. 使用Sequencer访问USD动画](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#5%E4%BD%BF%E7%94%A8sequencer%E8%AE%BF%E9%97%AEusd%E5%8A%A8%E7%94%BB)
-   [访问USD动画](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#%E8%AE%BF%E9%97%AEusd%E5%8A%A8%E7%94%BB)
-   [对椅子进行动画处理](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#%E5%AF%B9%E6%A4%85%E5%AD%90%E8%BF%9B%E8%A1%8C%E5%8A%A8%E7%94%BB%E5%A4%84%E7%90%86)
-   [6\. 将资产导入虚幻引擎项目。](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#6%E5%B0%86%E8%B5%84%E4%BA%A7%E5%AF%BC%E5%85%A5%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E9%A1%B9%E7%9B%AE%E3%80%82)
-   [将厨房套装导入虚幻引擎](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#%E5%B0%86%E5%8E%A8%E6%88%BF%E5%A5%97%E8%A3%85%E5%AF%BC%E5%85%A5%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)

相关文档

[

虚幻引擎中的通用场景描述

![虚幻引擎中的通用场景描述](https://dev.epicgames.com/community/api/documentation/image/4c1b6840-3bd6-4c40-8621-356d49074d1c?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/universal-scene-description-in-unreal-engine)