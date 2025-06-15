# 在虚幻引擎中创建和使用材质实例 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:26:21.589Z

---

目录

![创建和使用材质实例](https://dev.epicgames.com/community/api/documentation/image/1f898a28-f518-45f9-9150-e5d6d8c04a4b?resizing_type=fill&width=1920&height=335)

在虚幻引擎中创建和编辑标准材质可能是一个很耗时的过程。为了加快和简化材质创建工作流程，虚幻引擎提供了一种特殊类型的材质，其被称为 **材质实例（Material instance）**。本教程演示了如何在你的项目中设置和使用材质实例。

## 材质实例化

材质实例化用于创建一种父材质，你可以将其用作基础，生成各种各样不同外观的子项（材质实例）。

为了实现这种灵活性，[材质实例化](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)使用了一种称为 **继承（inheritance）** 的概念：父材质的属性会传递给其子项。 父材质中指定为 **参数（parameters）** 的属性在 **材质实例编辑器（Material Instance Editor）** 中公开给美术师。

![材质实例编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd2f271c-a9db-4b78-a800-bf260ceebb01/instance-editor-ue5.png)

使用材质实例，你可以从单个基础材质创建许多变体。

![三个材质实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47185746-e1e3-4394-ba05-9a5c51b7d31e/three-instances-ue5-sm.png)

### 创建材质实例是包含两个步骤的过程

1.  首先创建一种 **参数化（parameterized）** 材质，以用作实例的父材质。
2.  在内容浏览器中创建 **材质实例常量（Material Instance Constant）** 。 然后你可以在材质实例编辑器中自定义该材质。

如需进一步了解关于材质实例化的背景信息，请[阅读此处的概述](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)。

## 创建参数化材质

材质实例继承其父材质的所有属性，但默认情况下并非所有这些属性都可以在材质实例编辑器中自定义。

要使材质属性在材质实例中可编辑，你必须使用参数节点而不是常规[材质表达式](/documentation/zh-cn/unreal-engine/unreal-engine-material-expressions-reference)来将特定属性指定为 **参数（parameters）** 。

有两种方法可将参数节点添加到材质图表。

### 从材质控制板添加参数节点

如果你在 **材质控制板（Material Palette）** 中或从材质编辑器中的右键菜单搜索"parameter"一词，可以找到所有可用的参数节点。

你可以从控制板拖放这些参数节点，或在右键菜单中选择它们，以将其添加到材质图表。

![材质表达式控制板和上下文菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa225e20-4860-4366-911b-0dc4ff891354/pallette-and-context-menu.png)

右键菜单（左侧）和材质控制板（右侧）中的参数。

#### 参数快捷键

两个最常用的材质参数在材质编辑器中有键盘快捷键。

1.  **标量参数（Scalar Parameter）** - 按住 **S键** 并在材质图表中 **左键点击** 以放置标量参数。 标量参数是常量的参数化版本，并且包含单个数字值。
2.  **矢量参数（Vector Parameter）** - 按住 **V键** 并在材质图表中 **左键点击** 以放置矢量参数。矢量参数是Constant 4 Vector的参数化版本，并且包含四个浮点值。

使用快捷键或控制板将标量参数放置在材质图表中。

![粗糙度标量参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49f235af-7e8d-4e26-b52f-1bb026fb3b67/roughness-scalar-parameter.png)

将该参数命名为 **粗糙度（Roughness）** 并将其连接到对应的[材质输入](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine)。

#### 默认值和值范围

如果你想设置参数的默认值或限制值范围，可以在细节（Details）面板中这样做。

![默认值粗糙度](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7646649-cd1b-4611-9673-3aba77507e3e/roughness-default-values.png)

例如，粗糙度输入接受从0到1的值。要确保粗糙度参数始终保持在这个预期的范围内，请将 **滑块最小值（Slider Min）** 和 **滑块最大值（Slider Max）** 分别设置为0和1。

如果你需要0之外的默认粗糙度值，请在 **默认值（Default Value）** 字段中输入该值。

选择粗糙度参数并按 **Ctrl+D** 以复制该节点。 将第二个标量参数重命名为 **金属感（Metallic）** 并将其连接到相应的输入。 你的图表现在应该如下所示：

![金属感和粗糙度参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01c39b06-290f-4a62-938a-9d853835ca48/metallic-roughness.png)

### 将节点转换为参数

你还可以将标准材质表达式转换为现有材质图表中的参数。

出于演示目的，请将 **Constant3Vector** 节点放置在材质图表中。这是标准（非参数化）材质表达式，常用于定义材质的基础颜色。

![插入Constant3 Vector](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/296ac37d-57c1-46c2-a985-3fbaecb51e48/constant-3-vector.png)

要将此节点转换为参数，请 **右键点击** 该节点，然后从上下文菜单中选择 **转换为参数（Convert to Parameter）**。

![转换为参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d391e1e-36d9-4f15-9c41-ee9aeebfd3d7/convert-to-param-ue5.png)

请务必为参数提供唯一的描述性名称，如BaseColor。 在你转换节点时，将自动选择命名字段。

![重命名细节面板中的参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca23c130-74ff-4150-89bd-4cf129781c9f/rename-parameter-details.png)

你可以在如上所示的 **默认值（Default Value）** 字段中更改颜色，也可以双击BaseColor节点以打开取色器。

![取色器界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc23150e-08b1-403a-9c77-2dc572c53921/color-picker-interface.png)

你无法在虚幻引擎中参数化每个材质节点，但对于可以参数化的所有材质表达式，右键菜单中都提供了 **转换为参数（Convert To Parameter）** 选项。

### 参数化材质示例

你的材质图表现在应该包含一个插入到BaseColor的矢量参数和两个分别插入到金属感（Metallic）和粗糙度（Roughness）输入的标量参数：

![参数化材质示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e23a513-0e6c-447a-85d4-10acecfba78f/parameterized-material-example.png)

这三个参数将允许你在创建材质实例后更改材质的颜色、粗糙度和金属感属性。

点击[材质编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-ui)左上角的 **应用（Apply）** 以编译材质，然后点击 **保存（Save）** 。

![编译材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75341bb1-83d5-4fd5-bd7a-74f7e081be9e/apply-and-save-ue5.png)

## 创建材质实例

现在你有了简单的参数化材质，可以创建材质实例并在[材质实例编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui)中进行自定义。

要创建材质实例，请在内容浏览器中右键点击你的材质，然后从菜单选择 **创建材质实例（Create Material Instance）** 。

![创建材质实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6236bd60-c457-4b07-8a85-a4e6adabdd51/create-material-instance-ue5.png)

你的材质实例将从你用于创建它的材质继承其名称。要重命名材质实例，你可以选择它并按 **F2** 或 **单击** 名称字段。

![重命名实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba620e03-863f-4645-9303-d73768f1fd8c/rename-material-instance-ue5.png)

## 编辑材质实例

在内容浏览器中 **双击** 材质实例以打开 **材质实例编辑器（Material Instance Editor）** 。

![打开材质实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2ca79f6-88f2-442d-9683-1083f96710f4/double-click-instance.png)

材质实例编辑器是一种界面，你可以在其中自定义材质参数以生成父材质的不同外观的变体。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/193d8e7e-fd37-443c-89a3-b965c0bd91c1/material-instance-editor-ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/193d8e7e-fd37-443c-89a3-b965c0bd91c1/material-instance-editor-ue5.png)

材质实例编辑器中的材质实例。

### 调整材质参数

材质参数位于材质实例编辑器右侧的细节（Details）面板中。 请注意，这些参数的名称取自原始材质图表中的参数节点。

使用以下步骤可编辑参数：

![覆盖材质参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5bd4d4a6-bcaa-44e2-ba2e-aa6c86e8d68a/override-parameters.png)

1.  勾选参数旁边的框以启用编辑。
2.  在字段中输入新值，或左键点击并拖动以上下滑动值。 对于矢量参数，左键点击色条以激活取色器。
3.  要将参数重置为默认值，请点击此处图中的箭头图标。

随着你调整参数，材质预览将在材质实例编辑器中实时更新，如果材质当前应用于Actor，还会在关卡中更新。

## 使用参数组

你可以将参数分类为 **参数组（Parameter Groups）** ，以改善材质实例的组织和可读性。

上述例子只有三个参数，较易于阅读，而对于大量参数化的主材质，如果你不使用参数组，与之交互的效率就会比较低下。

下面的滑块显示了使用和不使用组的材质实例。 在没有参数组的例子中，标量参数显示在单个无组织的列表中。 使用参数组的实例按材质属性整齐地进行组织。

![没有参数组的材质实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27302a00-0945-44da-a0c9-8a37767a1e91/without-groups.png)

![使用参数组的材质实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f67dc93f-e867-410d-a456-5d1d84b9d218/with-groups.png)

没有参数组的材质实例

使用参数组的材质实例

### 如何使用参数组

参数组在父材质中配置，而不是在材质实例中配置。 这在材质编辑器的细节（Details）面板中完成。

在材质图表中选择一个材质参数节点。

![色调Vector 3参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a25822f4-2e8d-4ed0-9e27-68f7fa050d8a/tint-parameter.png)

在细节（Details）面板的 **组（Group）** 字段中输入名称。 你可以随意命名各个组，但建议按参数所控制的材质属性对参数分组。

![基础颜色参数组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/046c5100-83a9-4d09-9ff9-b6f119a78e64/base-color-group.png)

将参数组名称分配给一个材质参数表达式后，该名称将显示在组（Group）字段旁边的下拉菜单中。

对于其余参数，你可以输入新组名，或从下拉菜单选择某个现有参数组。

![选择现有参数组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51aa0615-59a0-4115-999b-cfd6ce6279f9/parameter-group-dropdown.png)

### 在组中对参数排序

你可以使用 **排序优先级（Sort Priority）** 字段来更改组中列出参数的顺序。 默认情况下，所有参数都按字母顺序列出，这样一来，材质实例编辑器中的排序会比较笨拙或低效。 在下面的滑块中，UV平铺和偏移功能按钮在按字母顺序列出时会分散，但通过向每个参数分配排序优先级值，可以让体验得到改善。

![字母顺序参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7e49156-e967-41d0-8fd7-7fd1b3bb5ae6/uv-controls-unordered.png)

![重新排序的参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5222a8b-88fb-4e37-bd28-19cef07c6ab6/uv-controls-reordered.png)

字母顺序参数

重新排序的参数

要更改参数的顺序，请选择节点并在细节（Details）面板中的 **排序优先级（Sort Priority）** 字段中输入新值。

![参数组排序优先级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8cd3796-f869-43fe-9a2b-101691a2364f/sort-priority.png)

### 对参数组排序

默认情况下，参数组按字母顺序在材质实例编辑器中显示。

有两种方法可更改参数组的顺序。 一种解决方案是直接向组名添加数字。

Megascans父材质使用此方法，参数组的编号从 **00 - 07** 。

![Megascans参数组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/350aee6f-674b-4d78-b741-ec627cd6b776/megascans-group-sorting.png)

这样一来，参数组可以按它们在主材质节点中的显示顺序显示。

#### 组排序优先级

你还可以使用细节（Details）面板中的 **组排序优先级（Group Sort Priority）** 属性来更改参数组的顺序。 此属性位于父材质中，而不是在材质实例中。

1.  取消选择材质图表中的所有节点以访问其材质属性。
2.  在细节（Details）面板中，展开 **组排序（Group Sorting）** ，然后展开 **参数组数据（Parameter Group Data）** 。
3.  此分段中的数组列出你的材质中的所有参数。展开每个索引并更改 **组排序优先级（Group Sort Priority）** 以修改各个组的顺序。
    
    ![组排序优先级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ae9b031-3dc6-4007-80a4-d0e78dc317aa/parameter-group-sorting.png)

## 更改材质实例的父材质

你可以在材质实例编辑器中轻松更改材质实例所使用的父材质。

要更改父材质，请在材质实例编辑器中打开材质实例。 在细节（Details）面板中的 **通用（General）** 分段下，找到 **父项（Parent）** 属性。

![父材质字段](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/862fad42-b11b-4839-af99-b8e12b2bab61/parent-material-ue5.png)

使用下拉菜单搜索并选择不同的父材质。你还可以在内容浏览器中选择材质，然后点击 **使用内容浏览器中的选定资产（Use Selected Asset in Content Browser）按钮** （朝左箭头）。

请注意，如果你更改父材质，可能会完全更改材质实例的外观和属性。 你之前在使用的参数可能在新的父材质中不再可用。

![更改父材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf0a07b8-c117-4225-b863-ab73a99742c1/change-parent.png)

例如，如果你从下拉列表中选择 **M\_Metal\_Gold** 材质，**M\_Parameterized** 示例中存在的三个参数（粗糙度、金属感、基础颜色）在gold实例中不再可用。

![新的父材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40145a35-681c-4871-a60c-094ec43d61f3/new-parent-gold.png)

## 结论

材质实例化是一种强大的工具，你可以在项目的所有方面中加以使用。 从为武器和道具添加一些变量，到帮助美术师更好地利用可用材质， 材质实例有助于简化和统一在项目中创建和使用材质的方式。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [材质实例化](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B%E5%8C%96)
-   [创建材质实例是包含两个步骤的过程](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B%E6%98%AF%E5%8C%85%E5%90%AB%E4%B8%A4%E4%B8%AA%E6%AD%A5%E9%AA%A4%E7%9A%84%E8%BF%87%E7%A8%8B)
-   [创建参数化材质](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8F%82%E6%95%B0%E5%8C%96%E6%9D%90%E8%B4%A8)
-   [从材质控制板添加参数节点](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E4%BB%8E%E6%9D%90%E8%B4%A8%E6%8E%A7%E5%88%B6%E6%9D%BF%E6%B7%BB%E5%8A%A0%E5%8F%82%E6%95%B0%E8%8A%82%E7%82%B9)
-   [参数快捷键](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E5%8F%82%E6%95%B0%E5%BF%AB%E6%8D%B7%E9%94%AE)
-   [默认值和值范围](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E9%BB%98%E8%AE%A4%E5%80%BC%E5%92%8C%E5%80%BC%E8%8C%83%E5%9B%B4)
-   [将节点转换为参数](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E5%B0%86%E8%8A%82%E7%82%B9%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%8F%82%E6%95%B0)
-   [参数化材质示例](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E5%8F%82%E6%95%B0%E5%8C%96%E6%9D%90%E8%B4%A8%E7%A4%BA%E4%BE%8B)
-   [创建材质实例](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B)
-   [编辑材质实例](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E7%BC%96%E8%BE%91%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B)
-   [调整材质参数](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E8%B0%83%E6%95%B4%E6%9D%90%E8%B4%A8%E5%8F%82%E6%95%B0)
-   [使用参数组](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%8F%82%E6%95%B0%E7%BB%84)
-   [如何使用参数组](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E5%8F%82%E6%95%B0%E7%BB%84)
-   [在组中对参数排序](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E5%9C%A8%E7%BB%84%E4%B8%AD%E5%AF%B9%E5%8F%82%E6%95%B0%E6%8E%92%E5%BA%8F)
-   [对参数组排序](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E5%AF%B9%E5%8F%82%E6%95%B0%E7%BB%84%E6%8E%92%E5%BA%8F)
-   [组排序优先级](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E7%BB%84%E6%8E%92%E5%BA%8F%E4%BC%98%E5%85%88%E7%BA%A7)
-   [更改材质实例的父材质](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E6%9B%B4%E6%94%B9%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B%E7%9A%84%E7%88%B6%E6%9D%90%E8%B4%A8)
-   [结论](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine#%E7%BB%93%E8%AE%BA)

相关文档

[

实例化材质

![实例化材质](https://dev.epicgames.com/community/api/documentation/image/389a46ab-e487-4ed1-beeb-d1d8865de685?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)

[

材质编辑器UI

![材质编辑器UI](https://dev.epicgames.com/community/api/documentation/image/4c4d4a6a-52c0-432a-bd48-7a029cd60652?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-ui)

[

材质输入

![材质输入](https://dev.epicgames.com/community/api/documentation/image/e597ee6d-9089-48c5-948f-900cae75b677?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine)

[

材质基本概念

![材质基本概念](https://dev.epicgames.com/community/api/documentation/image/fbac30c8-a779-4090-bf78-ba9029431fd8?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts)

[

材质属性

![材质属性](https://dev.epicgames.com/community/api/documentation/image/1dd04efc-be01-4b5d-b4c8-f876754895b1?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-properties)