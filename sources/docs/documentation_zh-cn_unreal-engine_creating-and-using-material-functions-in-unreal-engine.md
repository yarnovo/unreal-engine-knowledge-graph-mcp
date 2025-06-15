# 在虚幻引擎中创建和使用材质函数 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-and-using-material-functions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:26:44.166Z

---

目录

![创建和使用材质函数](https://dev.epicgames.com/community/api/documentation/image/1aae73e2-5670-4dca-98cc-2ce17b188f7f?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [材质函数概述](/documentation/zh-cn/unreal-engine/unreal-engine-material-functions-overview)

## 创建材质函数

请按照以下步骤创建新的材质函数：

1.  在 **内容浏览器（Content Browser）** 中右键单击。在上下文菜单中的"创建高级资产（Create Advanced Asset）"分段下，打开 **材质（Materials）** 子菜单，并从列表中选择 **材质函数（Material Function）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb3d93fd-76e4-4f4c-9063-fb1a3f8a084a/create-material-function.png)
2.  等待材质函数出现在"内容浏览器（Content Browser）"中，然后重命名该函数。名称应尽可能准确清楚，以确保通过名称便能轻松了解材质函数的作用。 本例中使用名称 **Custom\_Fresnel**。你可以通过在 **内容浏览器（Content Browser）** 中选择材质函数、按键盘上的 **F2** 并输入新名称来重命名材质函数。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71bfb0ef-0349-4fde-ba21-60060c0b1ede/custom-fresnel.png)

## 编辑材质函数

创建新的材质函数后，你需要在"材质编辑器（Material Editor）"中打开它以开始构建材质表达式网络。如果你想更改现有材质函数的行为，也可以打开相应的材质函数。 有两种方法可以打开材质函数进行编辑：

1.  双击 **内容浏览器（Content Browser）** 中的材质函数资产，在单独的"材质编辑器（Material Editor）"选项卡中打开它。 然后就可以在材质函数中编辑材质表达式网络以修改其行为。
    
    ![Cheap Contrast Material Function asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00845569-cdba-4365-a502-868bd40c0a1b/cheap-contrast-content-browser.png)
2.  双击现有材质中的某个材质函数节点，该材质函数随后将在新的"材质编辑器（Material Editor）"选项卡中打开。
    
    ![Cheap contrast Material Function Call node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c1d8649-c801-469c-bd6f-d05794ca3033/cheap-contrast-node.png)

双击材质函数后，材质函数会在"材质编辑器（Material Editor）"的新选项卡中打开，其中会显示函数中包含的材质表达式网络。然后，你可以根据自己的喜好编辑图表。

![Cheap contrast material graph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54357c59-8811-4ae8-892b-dfd9e4769f00/cheap-contrast-material-graph.png)

请务必注意，对材质函数所做的任何更改在保存后都将传播到该材质函数的所有后续实例。例如，如果你对"径向梯度材质函数（Radial Gradient Material Function）"的内部网络进行了更改，则该函数的所有现有实例以及所有后续新实例都将收到更新。

因此，除非你确定你的更改需要在函数的所有其他实例中传播，否则在"内容浏览器（Content Browser）"中 **复制现有函数** 可能才是明智之举（右键单击并从上下文菜单中选择"复制（Duplicate）"），而不是编辑原始材质函数。

对函数进行更改后，必须单击 **应用（Apply）** 按钮才能将更改传播到函数资产以及使用该函数的任何材质。完成后，请务必将资产保存在"内容浏览器（Content Browser）"中。

![Apply changes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b4da689-4760-42e9-89d0-45db7beaaa96/apply-changes.png)

## 发布新函数

为了使用材质函数，需要确保它显示在"材质编辑器控制板（Material Editor Palette）"的 **材质函数库（Material Function Library）** 中。为此，必须将 **公开到库（Expose to Library）** 属性设置为true。

1.  通过单击材质图表的背景，取消选择函数中的所有节点。这样将在 **细节（Details）** 面板中显示函数的基本属性。
    
    ![Expose to library](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58e0426a-463c-4e45-8fea-811fd563670a/expose-to-library.png)
2.  添加一段描述。这很重要，因为在用户将鼠标悬停在"材质函数库（Material Function Library）"和"材质编辑器（Material Editor）"中的函数上时，此处添加的描述会作为提示文本显示给用户。向"输入（Input）"和"输出（Output）"节点添加描述当然是一个好习惯，但如果只能选择一个地方在表达式中添加注释，那么此处是目前最重要的一个。
    
    ![Function description](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9f7d625-9133-45d0-a38b-fade49ac58cf/function-description.png)
3.  **库类目文本（Library Categories Text）** 可让你选择材质函数将出现在哪个类目中。你可以添加额外的类目，方法是单击 **插入（Insert）**，然后键入新的类目名称。但是，明智的做法是尽可能简洁，不要添加超出绝对必要的类目。
    
    ![Function categories](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c9297d6-a4c6-4eef-ad27-c5fd02a097ae/categories.png)

## 使用材质函数

### 在材质控制板中

创建材质函数并将其发布到库后，可直接从"材质编辑器控制板（Material Editor Palette）"中拖动该材质函数，从而在现有材质中使用该材质函数。 除了用户创建的材质函数外，控制板还包含引擎自带的所有默认材质函数。

![Material Function library](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d876182c-e132-4a09-86f1-bdf3c16ed0e1/mf-library-palette.png)

默认材质函数分为多种类目。用户创建的材质函数默认放置在 **杂项（Misc）** 类目中，但你可以在函数的"细节（Details）"面板属性中更改它们的类目。 将一个材质函数拖到你的材质图表中，随即将创建一个材质函数调用节点，其中包含由函数内的输入和输出节点定义的各种输入和输出。

![Drag Material Function from Palette](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32743d0f-691d-4176-8839-b05281c50cc7/drag-from-palette.png)

你也可以通过在"材质编辑器（Material Editor）"中 **右键单击** 并在上下文菜单中搜索材质函数，将材质函数添加到你的材质中。

### "未指定函数"节点

第三种使用材质函数的方法是在材质图表中放置一个 **未指定函数（Unspecified Function）** 节点，然后在"细节（Details）"面板中为该节点指定一个材质函数。

1.  按住 **F键** 并在材质图表中 **左键单击** 以放置"未指定函数（Unspecified Function）"节点。
    
    ![Unspecified Function node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38b782b6-ae7a-4e63-89be-9413c389e30b/unspecified-function.png)
2.  在 **细节（Details）** 面板中为"未指定函数（Unspecified Function）"节点指定一个材质函数。你可以在"细节（Details）"面板的下拉菜单中搜索某个材质函数，也可以在 **内容浏览器（Content Browser）** 中选择某个材质函数资产，然后单击 **使用内容浏览器中的选定资产（Use Selected Asset from Content Browser）** 按钮。
    
    ![Use selected asset from Content Browser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b2fbe5d-3a35-432e-b955-d0942109e81d/use-selected-asset.png)
3.  在本示例中，"未指定函数（Unspecified Function）"节点被替换为选定的材质函数："混合角度校正法线（Blend Angle Corrected Normals）"。
    
    ![Blend angle corrected normals node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce92fd54-4ccc-478b-9a71-910595d6f134/blend-angle-corrected.png)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建材质函数](/documentation/zh-cn/unreal-engine/creating-and-using-material-functions-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%9D%90%E8%B4%A8%E5%87%BD%E6%95%B0)
-   [编辑材质函数](/documentation/zh-cn/unreal-engine/creating-and-using-material-functions-in-unreal-engine#%E7%BC%96%E8%BE%91%E6%9D%90%E8%B4%A8%E5%87%BD%E6%95%B0)
-   [发布新函数](/documentation/zh-cn/unreal-engine/creating-and-using-material-functions-in-unreal-engine#%E5%8F%91%E5%B8%83%E6%96%B0%E5%87%BD%E6%95%B0)
-   [使用材质函数](/documentation/zh-cn/unreal-engine/creating-and-using-material-functions-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%9D%90%E8%B4%A8%E5%87%BD%E6%95%B0)
-   [在材质控制板中](/documentation/zh-cn/unreal-engine/creating-and-using-material-functions-in-unreal-engine#%E5%9C%A8%E6%9D%90%E8%B4%A8%E6%8E%A7%E5%88%B6%E6%9D%BF%E4%B8%AD)
-   ["未指定函数"节点](/documentation/zh-cn/unreal-engine/creating-and-using-material-functions-in-unreal-engine#%22%E6%9C%AA%E6%8C%87%E5%AE%9A%E5%87%BD%E6%95%B0%22%E8%8A%82%E7%82%B9)