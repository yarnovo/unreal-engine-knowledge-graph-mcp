# 虚幻引擎中的UMG富文本块 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:18:51.303Z

---

目录

![UMG富文本块](https://dev.epicgames.com/community/api/documentation/image/312eed1f-1e0e-4b10-8123-97e58b20c9f2?resizing_type=fill&width=1920&height=335)

虚幻示意图形（UMG）中提供的文本块带来了各种各样的样式选项和自定义。但是，你可能需要更灵活的文本块选项，以支持标记样式更改、内联图像、超链接等功能。

**UMG RichTextBlock** 提供了一种更为灵活的文本块。它支持标记样式更改、内联图像、超链接等功能。UMG RichTextBlock接受装饰器类，你可以编写这些类来定义项目中需要的标记行为。此外，页面显示了有关属性的详细信息，你可以使用富图像行和富文本样式行数据类型设置到RichTextBlock控件和数据表资产。

**RichTextBlock** 使用 **数据表资产（Data Table Asset）** 管理添加的样式和自定义。借助于数据表资产，你将能够创建你自己的样式。此外，它还允许你编写自定义装饰器类，以定义项目中需要的标记行为。页面显示了装饰器类 **RichTextBlockImageDecorator** 的示例。你可以将其用作体验编写自定义装饰器类的起始点。

熟悉页面内容，以详细了解UMG中的RichTextBlock，以及如何编写自定义装饰器类。

## 创建和分配数据表资产

首先，你应该创建数据表资产。借助于数据表资产，你将能够创建不同类型的数据标签，并用于UMG中的RichTextBlock控件。你可以使用数据表资产来指定文本样式或图像，你可以通过RichTextBlock使用富文本以内联方式使用它们。

像其他资产那样创建数据表资产：点击 **内容浏览器（Content Browser）** 中的 **新增（Add New）** ，然后选择 **杂项（Miscellaneous）> 数据表（Data Table）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5ece127-448a-4c1e-9e0c-77015bee1a7e/01_addnewdta.png)

在 **选取行结构（Pick Row Structure）** 窗口中选择 **富图像行（Rich Image Row）** 或 **富文本样式行（Rich Text Style Row）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b23433e3-321d-44f7-a023-5e8d7de1a476/02_createdta_pickstructure.png)

富图像行使用自定义装饰器类，你可以在[装饰器类](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E8%A3%85%E9%A5%B0%E5%99%A8%E7%B1%BB)小节中详细了解装饰器类。

### 富图像行数据类型

页面显示了富图像行数据类型示例，这是一个自定义装饰器类。将数据表资产用于富图像行数据类型，存储图像并通过不同的自定义选项进行设置。因此，你可以通过RichTextBlock将此数据用作文本中的内联图像。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0c32722-ee68-4be5-89a3-9e1693005dfb/03_exmp_dta_imagerowdt.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0c32722-ee68-4be5-89a3-9e1693005dfb/03_exmp_dta_imagerowdt.png)

执行下面的步骤，创建和使用数据表资产的富图像行数据类型。

1.  创建数据表资产，从 **选取行结构（Pick Row Structure）** 窗口的下拉列表中选择 **富图像行（Rich Image Row）** 。此外，你还可以重命名此数据表资产。例如，采用名称"Image\_DataTable"。
2.  在内容浏览器中双击已创建的数据表资产，以在 **数据表编辑器（Data Table Editor）** 中将其打开。
3.  点击数据表资产面板中的 **添加（Add）** 以添加新行。在数据表资产中为每个内联图像创建行，这些行将通过RichTextBlock用于你的文本。有其他工具可以处理数据表资产面板中的行，例如：**复制（Copy）** 、 **粘贴（Paste）** 、 **复制（Duplicate）** 、 **删除（Remove）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3845a460-2ae3-4665-8221-52feea74e9f5/04_addrows_dta_imagerowdt.png)
4.  你可以通过 **行名称（Row Name）** 分段的文本字段更改行名称。该名称允许使用前缀、大小写混合，等等。
5.  在 **外观（Appearance）** 下设置这些图像所需的属性。
6.  添加行完成后，点击 **保存（Save）** 并关闭数据表资产。

请参阅[富图像行数据类型的数据表资产的属性](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E5%AF%8C%E5%9B%BE%E5%83%8F%E8%A1%8C%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E7%9A%84%E6%95%B0%E6%8D%AE%E8%A1%A8%E8%B5%84%E4%BA%A7%E7%9A%84%E5%B1%9E%E6%80%A7)，详细了解这些设置。

### 富文本样式行数据类型

富文本样式行数据类型是默认装饰器类。借助于此类，你可以设置文本样式，以便通过RichTextBlock应用于文本。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb6e077d-995b-497f-8e90-4d84119fa0eb/05_exmp_dta_textstylerowdt.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb6e077d-995b-497f-8e90-4d84119fa0eb/05_exmp_dta_textstylerowdt.png)

执行下面的步骤，创建和使用数据表资产的富文本样式行数据类型。

1.  创建数据表资产，从选取行结构（Pick Row Structure）窗口的下拉列表中选择 **富文本样式行（Rich Text Style Row）** 。此外，你还可以重命名此数据表资产。例如，采用名称"TextStyle\_DataTable"。
2.  在内容浏览器中双击已创建的数据表资产，以在数据表编辑器中将其打开。
3.  点击数据表资产面板中的 **添加（Add）** 以添加新行。在数据表资产中为每个文本样式创建行，这些行将通过RichTextBlock用于你的文本。有其他工具可以处理数据表资产面板中的行，例如：**复制（Copy）** 、 **粘贴（Paste）** 、 **复制（Duplicate）** 、 **删除（Remove）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c975b9b4-a9ca-4587-8073-b174a45c7d67/06_addrows_dta_textstylerowdt.png)
4.  你可以在行名称（Row Name）分段的文本字段中更改每行的名称。该名称允许使用前缀、大小写混合，等等。
    
    推荐将数据表资产的第一行重命名为"Default"。因此，你已将此行的样式定义为分配的RichTextBlock中文本的默认样式。
    
5.  在外观（Appearance）下设置这些样式所需的属性。
6.  添加行完成后，点击保存（Save）并关闭数据表资产。

请参阅[富文本样式行数据类型的数据表资产的属性](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%B7%E5%BC%8F%E8%A1%8C%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E7%9A%84%E6%95%B0%E6%8D%AE%E8%A1%A8%E8%B5%84%E4%BA%A7%E7%9A%84%E5%B1%9E%E6%80%A7)，详细了解这些设置。

要正确显示文本，需要在数据表资产中为每个富文本样式行设置字体。打开数据表编辑器。你应该选择你想自定义的文本行，然后访问行编辑器的 **外观（Appearance）> 文本样式（Text Style）> 字体（Font）** 分段。在新窗口中，你需要点击 **齿轮** 并启用 **显示引擎内容（Show Engine Content）** 。借助于此项，你将能够选择 **Roboto** 字体或你所需的其他字体。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9489307-ee31-45f9-87a9-4dba5d4771e9/07_fontsetup_dta.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9489307-ee31-45f9-87a9-4dba5d4771e9/07_fontsetup_dta.png)

## 在UMG UI设计器中使用富文本块控件

你应该使用已创建的数据表资产分配RichTextBlock控件因此，你将能够通过 **设计器视口（Designer Viewport）** 使用数据表资产中配置的文本样式和内联图像。

### 添加富文本块控件

创建控件蓝图：点击内容浏览器中的 **新增（Add New）** ，然后选择 **用户界面（User Interface）> 控件蓝图（Widget Blueprint）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca645c6b-3a3a-4ab2-9055-442b30b63eb7/08_createwidgetblueprint.png)

你应该会在左侧的 **控制板（Palette）** 面板中找到 **画布面板（Canvas Panel）** 。将画布面板拖入设计器视口中。在控制板面板中找到 **RichTextBlock** ，将此控件拖入设计器视口的画布面板框中。你可以根据需要缩放RichTextBlock或调整大小。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8fb2633-fb49-4189-8de0-d55e9fa3ea16/09_addrichtextblocktowb.png)

文本框不会自动缩放以适应文本大小。如果你不调整框的大小以适应文本大小，一些文本可能会被裁剪，无法正确显示。此外，你还可以在细节（Details）面板中启用 **根据内容设置（Set to Content）** 分段的复选框，以自动根据内容调整文本框大小。

### 将数据表资产分配给富文本块

选择添加的RichTextBlock控件。借助于右侧的 **细节（Details）** 面板，你能够将数据表资产分配给外观（Appearance）分段中的RichTextBlock。

使用 **文本样式集（Text Style Set）** 将带有富文本样式行的数据表资产分配给RichTextBlock。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61e99d00-b22b-4fb4-90f5-d249a5831a7d/10_assigndttortb.png)

### 将样式应用于文本

如前所述，你应该将数据表资产分配给RichTextBlock。执行下面的步骤，将数据表资产中的样式应用于文本。

1.  选择RichTextBlock。
2.  在右侧的细节（Details）面板中找到 **内容（Content）** 分段。
3.  将你的文本输入到 **文本（Text）** 分段的文本字段中。

显示文本采用数据表资产中名为"Default"的行中的样式。例如，如果你在文本字段中输入了"This is some rich text!"，它将使用你在数据表资产的"Default"行中自定义的样式显示。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e50d4aae-d0be-4219-8558-26df19197e95/11_exmp_rtbdeftextstyle.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e50d4aae-d0be-4219-8558-26df19197e95/11_exmp_rtbdeftextstyle.png)

你可以更改你在数据表资产中定义的RichTextBlock的默认文本样式。在细节（Details）面板中启用 **覆盖默认样式（Override Default Style）** 分段的复选框。因此，你将能够在 **默认文本样式覆盖（Default Text Style Override）** 分段中自定义新的默认文本样式。

如果你需要数据表资产中的其他样式，请使用标记 `<TextStyleRowName>text</>` （其中，*"TextStyleRowName"* 是你分配的数据表资产的文本样式行名称，*"text"* 是你想采用指定行中样式的文本部分），在封闭的括号内输入样式行的名称。例如：`This is some <RichText.Emphasis>rich</> text!` 你可以为文本的不同部分应用不同的样式。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e27f808-4ec8-4f54-a0d9-42b1a2d4e1fd/12_exmp_rtbtextstyle.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e27f808-4ec8-4f54-a0d9-42b1a2d4e1fd/12_exmp_rtbtextstyle.png)

提示：RichTextBlock中的行名称标签对于数据表资产行名称不区分大小写。

## 装饰器类

你可以使用 **装饰器类** 在文本中包含样式之外的其他内容。创建装饰器类时，你可以设置自己的标记标签。借助于此项，你将能够使用[Slate](/documentation/zh-cn/unreal-engine/slate-user-interface-programming-framework-for-unreal-engine)。它允许你在文本中无缝地渲染其他元素。

### 使用装饰器

页面举例说明了如何通过 **RichTextBlockImageRowDecorator** 类在文本中包含内联图像。该示例可帮助你开始使用自定义装饰器类。

你需要具备富图像行数据类型的已创建数据表资产（请参阅上面的[创建和分配数据表资产](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E5%88%86%E9%85%8D%E6%95%B0%E6%8D%AE%E8%A1%A8%E8%B5%84%E4%BA%A7)小节），以及RichTextBlockImageRowDecorator **父类** 的子类 **蓝图类** 作为蓝图来配置实例。为此，执行下面的步骤：

1.  创建新蓝图类：点击内容浏览器中的 **新增（Add New）** ，然后选择 **蓝图类（Blueprint Class）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2311935-b9ff-46bf-8ddd-0335e8ad39c4/13_createblueprintclass.png)
2.  在 **选取父类（Pick Parent Class）** 窗口中选择 **RichTextBlockImageRowDecorator** 并点击 **选择（Select）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3594621-d005-4e1a-9187-a53dfbe2e21b/14_pickparentclass.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3594621-d005-4e1a-9187-a53dfbe2e21b/14_pickparentclass.png)
    
3.  在内容浏览器（Content Browser）中双击已创建的蓝图类，在 **蓝图编辑器（Blueprint Editor）** 中打开。
4.  借助于右侧的细节（Details）面板，通过 **图像集（Image Set）** 将此蓝图类分配给富图像行数据类型的数据表资产。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5534dbab-736f-49dc-ae1c-5686c675620d/15_assigndtatobc.png)

完成上面列出的所有操作后，你能够将装饰器类添加到RichTextBlock控件。执行下面的步骤，以在文本中使用数据表资产中的内联图像。

1.  打开控件蓝图。
2.  在右侧的细节（Details）面板中的外观（Appearance）下找到 **装饰器类（Decorator Classes）** 分段。
3.  点击 **(+)** 按钮，将数组元素添加到装饰器类。
4.  在下拉列表中选择已创建的蓝图类。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cbf77058-29f1-4aab-9c75-f7c6ed63b2d7/16_adddecoratorclass_to_rtb.png)

若要插入数据表资产中的内联图像，你应该在细节（Details）面板的内容（Content）分段中使用标记 `<img id="ImageRowName"/>`（其中 *"ImageNameFromTable"* 是你分配的数据表资产的行名称）。例如，如果你在文本字段中输入了 `With <img id="RichText.Logo"/> inline images!` ，并点击 **编译（Compile）** ，它会使用你在数据表资产中名为"RichText.Logo"的行自定义的内联图像显示文本。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed025c33-d2b1-41d2-8fe2-656fd6874743/17_exmp_inlineimagertb.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed025c33-d2b1-41d2-8fe2-656fd6874743/17_exmp_inlineimagertb.png)

### 添加新装饰器

你可以定义自定义装饰器类，它们可以利用Slate添加你想内联该文本的内容。为此，你应该编写两个类：`URichTextBlockDecorator` 和 `FRichTextDecorator` 。你应该设置这些类。因此，你将能够将装饰器添加到任意RichTextBlock。使用装饰器类数组和你的标记，通过你的装饰器解析文本。

`URichTextBlockDecorator` 定义了 `UObject` 来实现 `CreateDecorator` ，它应该返回指向 `FRichTextDecorator` 的 `SharedPtr` 。因此，你可以实现任意属性和工具函数。此外，你可以为你的装饰器创建子类作为蓝图。它允许添加和使用你在RichTextBlock中需要的数据。

记住，`RichTextBlockImageDecorator` 定义了数据表属性。你想在蓝图中修改的内容都应该存在于 `UObject` 中。

## UMG富文本块的设置

此参考小节显示了有关属性的详细信息，你可以使用富图像行和富文本样式行数据类型设置到RichTextBlock控件和数据表资产。

### 富文本块属性

属性

说明

插槽（画布面板插槽）

 

**锚点（Anchors）**

这会设置所选控件的锚点位置。

-   **最小值（Minimum）** - 按住最小锚点，左上方。
-   **最大值（Maximum）** - 按住最大锚点，右下方。

**对齐（Alignment）**

对齐是控件的枢轴点。开始于左上角的(0,0)，结束于右下角的(1,1)。移动对齐点，你就可以移动控件的原点。

**根据内容设置大小（Size To Content）**

AutoSize为true时，使用控件所需的大小。

**ZOrder**

这将表明渲染所选控件时的顺序优先级。值越大，渲染越晚，最晚的显示在顶部。值越小，渲染越早，最早的显示在底部。

内容

 

**文本（Text）**

这是要在控件中显示的文本。

外观

 

**文本样式集（Text Style Set）**

这会保存数据表资产，支持将富文本装饰器用于文本和图像样式。

**装饰器类（Decorator Classes）**

这会添加可用于所选控件的装饰器。

**覆盖默认样式（Override Default Style）**

如果设置为true，它以内联方式指定此富文本的默认文本样式，覆盖样式集表中提供的默认值。

**默认文本样式覆盖（Default Text Style Override）**

这会设置默认情况下要应用的文本样式。

**最小所需宽度（Min Desired Width）**

这会为文本设置最小所需大小。

**变换策略（Transform Policy）**

要应用于此文本块的文本变换策略。

-   **无（None）** - 没有变换，仅按原样使用给定的文本。
-   **变为小写（To Lower）**\*\* - 将文本转换为小写来显示。
-   **变为大写（To Upper）** - 将文本转换为大写来显示。

**对齐方式（Justification）**

这会设置文本与边距对齐的方式。

**边距（Margin）**

这会设置文本区域边缘周围空白区的大小。

**行高百分比（Line Height Percentage）**

这会设置每个行高的缩放量。

裁剪

 

**裁剪（Clipping）**

控制此控件的裁剪行为。正常情况下，溢出控件边界的内容会继续渲染。启用裁剪会防止溢出的内容被看到。

-   **继承（Inherit）** - 所选控件不会裁剪子项，该控件及所有子项都继承上一个裁剪的控件的裁剪区域。
-   **裁剪到边界（Clip to Bounds）** - 所选控件将裁剪此控件的边界之外的内容。它会将这些边界与之前的裁剪区域相交。

不同裁剪空间中的元素无法批处理，因此应用裁剪时有性能成本。除非面板实际上需要防止在边界之外显示内容，否则不要启用裁剪。

**溢出策略（Overflow Policy）**

设置在文本被裁剪以及不适应此控件的裁剪矩形时对文本执行的操作。

-   **裁剪（Clip）** - 溢出文本将被裁剪。
-   **省略号（Ellipsis）**\*\* - 溢出文本将替换为省略号。

换行

 

**文本自动换行（Auto Wrap Text）**

如果设置为true，它会根据为控件计算的水平空间自动将文本换行。

**文本换行宽度（Wrap Text At）**

这将确定文本在其长度超过此宽度时是否换到新行。如果此值为零或负数，则不发生换行。

**换行策略（Wrapping Policy）**

要使用的换行策略：

-   **默认换行（Default Wrapping）** - 没有回退，仅使用给定的换行迭代器。
-   **允许每个字符换行（Allow Per Character Wrapping）** - 单词太长时回退为每个字符换行

行为

 

**提示文本（Tool Tip Text）**

用户将鼠标光标悬停在控件上时显示的提示文本。

**启用（Is Enabled）**

这将设置此控件是否可以由用户交互式修改。

**可视性（Visibility）**

设置此控件的可视性。

-   **可见（Visible）** - 控件可见，并且可以与光标交互。
-   **折叠（Collapsed）** - 控件不可见，并且在布局中不占用空间。它永远无法被点击，因为它不占用空间。
-   **隐藏（Hidden）** - 控件不可见，但占用布局空间。它不可交互，因为它已隐藏。
-   **不可点击测试（自身及所有子项）（Not Hit Testable (Self & All Children)）** - 控件及其子项可见，但无法与光标交互。
-   **不可点击测试（仅自身）（Not Hit Testable (Self Only)）** - 控件及其子项可见，但无法与光标交互。（与不可点击测试（自身及所有子项）相同，但不适用于子控件。

**渲染不透明度（Render Opacity）**

这会设置控件的不透明度。

**提示文本控件（Tool Tip Widget）**

用户将鼠标光标悬停在控件上时显示的提示文本控件。

**光标（Cursor）**

鼠标在控件上方时要显示的光标。

-   **无（None）** - 没有鼠标光标可见。
-   **默认（Default）** - 默认箭头光标。
-   **文本编辑束（Text Edit Beam）** - 指示可以编辑的文本。
-   **调整左右大小（Resize Left Right）** - 调整水平箭头光标的大小。
-   **调整上下大小（Resize Up Down）** - 调整垂直箭头光标的大小。
-   **调整南东大小（Resize South East）** - 双向正向调整箭头光标大小。
-   **调整南西大小（Resize South West）** - 双向反向调整箭头光标大小。
-   **大十字（Cardinal Cross）** - 指示在移动某个对象。
-   **十字准星（Crosshairs）** - 指示精度选择，通常是拖动圈住了某个对象的选择框。
-   **手形（Hand）** - 使用带手形指针的手形光标。
-   **抓取手形（Grab Hand）** - 使用张开手形光标，指示可以抓取某个对象。
-   **抓取手形握紧（Grab Hand Closed）** - 使用握紧手形光标，指示抓取了某个对象。
-   **带斜线的圆圈（Slashed Circle）** - 光标指示操作无法完成。
-   **滴管（Eye Dropper）** - 指示可以选择颜色。

渲染变换

 

**变换（Transform）**

控件的渲染变换允许将任意2D变换应用于控件。

-   **平移（Translation）** - 控件在X和Y轴上的平移量（按Slate单位）。
-   **缩放（Scale）** - 控件在X和Y轴上的缩放量。
-   **剪切（Shear）** - 控件在X和Y轴上的剪切量（按Slate单位）。
-   **角度（Angle）** - 控件的旋转角度。

**枢轴点（Pivot）**

渲染变换枢轴点控制应用变换的位置。该值是发生旋转等操作所围绕的规格化坐标。

性能

 

**易变（Is Volatile）**

如果设置为true，这将防止缓存控件或其子项的几何体或布局信息。如果此控件每个帧都会发生变化，但你想让它仍位于无效面板中，则应该将其标记为易变，而不是每一帧使其失效。它会让无效面板实际上不缓存任何内容。

导航

 

**左（Left）**

定义使用左（Left）时的导航：

-   **逃离（Escape）** - 允许导航逃离此控件的边界。
-   **停止（Stop）** - 导航在此控件的边界处停止。
-   **换行（Wrap）** - 导航换行到此对象的相反边界。
-   **显式（Explicit）** - 导航转至指定的控件。
-   **自定义（Custom）** - 自定义函数可以确定在导航离开自身或其子项时，导航到哪个控件。导航离开自身或子项时应用。
-   **自定义边界（Custom Boundary）** - 自定义函数可以确定导航到哪个控件。到达边界时应用。

**右（Right）**

定义使用右（Right）时的导航：

-   **逃离（Escape）** - 允许导航逃离此控件的边界。
-   **停止（Stop）** - 导航在此控件的边界处停止。
-   **换行（Wrap）** - 导航换行到此对象的相反边界。
-   **显式（Explicit）** - 导航转至指定的控件。
-   **自定义（Custom）** - 自定义函数可以确定在导航离开自身或其子项时，导航到哪个控件。导航离开自身或子项时应用。
-   **自定义边界（Custom Boundary）** - 自定义函数可以确定导航到哪个控件。到达边界时应用。

**上（Up）**

定义使用上（Up）时的导航：

-   **逃离（Escape）** - 允许导航逃离此控件的边界。
-   **停止（Stop）** - 导航在此控件的边界处停止。
-   **换行（Wrap）** - 导航换行到此对象的相反边界。
-   **显式（Explicit）** - 导航转至指定的控件。
-   **自定义（Custom）** - 自定义函数可以确定在导航离开自身或其子项时，导航到哪个控件。导航离开自身或子项时应用。
-   **自定义边界（Custom Boundary）** - 自定义函数可以确定导航到哪个控件。到达边界时应用。

**下（Down）**

定义使用下（Down）时的导航：

-   **逃离（Escape）** - 允许导航逃离此控件的边界。
-   **停止（Stop）** - 导航在此控件的边界处停止。
-   **换行（Wrap）** - 导航换行到此对象的相反边界。
-   **显式（Explicit）** - 导航转至指定的控件。
-   **自定义（Custom）** - 自定义函数可以确定在导航离开自身或其子项时，导航到哪个控件。导航离开自身或子项时应用。
-   **自定义边界（Custom Boundary）** - 自定义函数可以确定导航到哪个控件。到达边界时应用。

**下一步（Next）**

定义使用下一步（Next）时的导航：

-   **逃离（Escape）** - 允许导航逃离此控件的边界。
-   **停止（Stop）** - 导航在此控件的边界处停止。
-   **换行（Wrap）** - 导航换行到此对象的相反边界。
-   **显式（Explicit）** - 导航转至指定的控件。
-   **自定义（Custom）** - 自定义函数可以确定在导航离开自身或其子项时，导航到哪个控件。导航离开自身或子项时应用。
-   **自定义边界（Custom Boundary）** - 自定义函数可以确定导航到哪个控件。到达边界时应用。

**上一步（Previous）**

定义使用上一步（Previous）时的导航：

-   **逃离（Escape）** - 允许导航逃离此控件的边界。
-   **停止（Stop）** - 导航在此控件的边界处停止。
-   **换行（Wrap）** - 导航换行到此对象的相反边界。
-   **显式（Explicit）** - 导航转至指定的控件。
-   **自定义（Custom）** - 自定义函数可以确定在导航离开自身或其子项时，导航到哪个控件。导航离开自身或子项时应用。
-   **自定义边界（Custom Boundary）** - 自定义函数可以确定导航到哪个控件。到达边界时应用。

本地化

 

**强制方向偏好（Force Direction Preference）**

将其用于设置新的流方向。

-   **继承（Inherit）** - 继承父控件设置的流方向。
-   **文化（Culture）** - 开始设置控件的布局。它使用当前文化的布局方向偏好，翻转流的方向性。
-   **从左到右（Left to Right）** - 强制从左到右的布局流。
-   **从右到左（Right to Left）** - 强制从右到左的布局流。

**文本塑形方法（Text Shaping Method）**

它将确定所选控件中使用的文本塑形方法。如果未设置，将使用获取默认文本塑形方法（Get Default Text Shaping Method）设置的默认值。

-   **自动（Auto）** - 根据文本的阅读方向，自动选取尽可能最快的塑形方法（KerningOnly或FullShaping）。从左到右的文本使用KerningOnly方法。从右到左的文本使用FullShaping方法。
-   **仅字距调整（Kerning Only）** - 仅使用字距调整数据提供伪塑形。这可能比完整塑形更快，但无法正确渲染复杂的从右到左或双向样式（例如阿拉伯语）。如果你知道文本框将仅显示简单的样式（例如数字），它很适合作为优化功能。
-   **完整塑形（Full Shaping）** - 提供全文塑形，允许准确渲染复杂的从右到左或双向样式（例如阿拉伯语）。它将为所有语言执行连字替换（例如英语中的"fi"样式）。

**文本流方向（Text Flow Direction）**

它将确定所选控件中使用的流方向。如果未设置，将使用获取默认文本流方向（Get Default Text Flow Direction）设置的默认值。

-   **自动（Auto）** - 自动检测其文本中每个段落的流方向。
-   **从左到右（Left to Right）** - 强制文本从左到右流动。
-   **从右到左（Right to Left）** - 强制文本从右到左流动。

### 富图像行数据类型的数据表资产的属性

在数据表资产中设置以下属性，以控制用于RichTextBlock控件的图像样式。

属性

说明

**图像（Image）**

要为此笔刷渲染的图像。分配的资产可以是UTexture、UMaterialInterface或实现AtlasedTextureInterface的对象。

**图像大小（Image Size）**

资源的大小（按Slate单位）。

**色调（Tint）**

应用于图像的色调。

**绘制为（Draw As）**

如何绘制图像。

-   **无（None）**\- 什么也不做。
-   **框（Box）** - 绘制3x3的框，其中各个边和中部根据边距拉伸。
-   **边框（Border）** - 绘制3x3的边框，其中各个边平铺，中部为空。
-   **图像（Image）** - 绘制图像；将忽略边距。
-   **圆角框（Rounded Box）**\- 绘制带轮廓和边角半径的实心矩形。

**平铺（Tiling）**

如何在图像模式下平铺图像。

-   **无平铺（No Tile）** - 仅拉伸。
-   **水平（Horizontal）** - 水平平铺图像。
-   **垂直（Vertical）** - 垂直平铺图像。
-   **两者（Both）** - 同时沿两个方向平铺图像。

**预览（Preview）**

设置图像应该如何显示在预览框中。

**水平对齐（Horizontal Alignment）：**

-   **填充（Fill）** - 图像将水平填充预览框。
-   **左（Left）** - 图像将对齐到预览框的左侧。
-   **中心（Center）** - 图像将位于预览框的中心。
-   **右（Right）** - 图像将对齐到预览框的右侧。

**垂直对齐（Vertical Alignment）：**

-   **填充（Fill）** - 图像将垂直填充预览框。
-   **顶部（Top）** - 图像将对齐到预览框的顶部。
-   **中心（Center）** - 图像将位于预览框的中心。
-   **底部（Bottom）** - 图像将对齐到预览框的底部。

### 富文本样式行数据类型的数据表资产的属性

在数据表资产中设置以下属性，以控制用于RichTextBlock控件的文本样式。

属性

说明

字体

 

**字体系列（Font Family）**

字体对象（从UMG或Slate控件样式资产使用时有效）。

**字样（Typeface）**

要从默认字样使用的字体的名称。如果初始选择了无（None），将使用第一个条目（粗体（Bold））。

**大小（Size）**

字体大小以磅值为单位测量。磅值到Slate单位的转换按96 dpi执行。所以，如果你使用Photoshop等工具制作布局和UI模型的原型，请务必将默认dpi测量从72 dpi更改为96 dpi。

**字体材质（Font Material）**

渲染此字体时要使用的材质。

**轮廓设置（Outline Settings）**

用于将轮廓应用于字体的设置。

-   **轮廓大小（Outline Size）** - 按Slate单位的轮廓大小（在1.0字体比例，此单位是一个像素）。
-   **单独填充Alpha（Separate Fill Alpha）** - 如果设置为true，轮廓在填充区域所在位置将完全为半透明。它允许使用单独填充alpha值。启用此项的代价是，在内轮廓边框与填充区域相交处，完全不透明填充的质量略微变差。
-   **将轮廓应用于下落阴影（Apply Outline to Drop Shadows）**\- 如果设置为true，轮廓将应用于使用此字体的所有下落阴影。
-   **轮廓材质（Outline Material）**\- 设置可选的材质以应用于轮廓。
-   **轮廓颜色（Outline Color）** - 使用此字体的字符的轮廓颜色。

**颜色（Color）**

此文本的颜色和不透明度。

**阴影偏移（Shadow Offset）**

它将设置阴影应该偏移多大程度。偏移0指示没有阴影。

**阴影颜色和不透明度（Shadow Color and Opacity）**

阴影的颜色和不透明度。

**阴影背景颜色（Shadow Background Color）**

所选文本的背景颜色。

**高亮颜色（Highlight Color）**

高亮文本的颜色。

**变换策略（Transform Policy）**

文本变换策略（默认为无（None））。

**溢出策略（Overflow Policy）**

确定在文本被裁剪以及不适应文本控件的裁剪矩形时对文本执行的操作。

高亮形状

 

**图像（Image）**

要为此笔刷渲染的图像。分配的资产可以是UTexture、UMaterialInterface或实现AtlasedTextureInterface的对象。

**图像大小（Image Size）**

资源的大小（按Slate单位）。

**色调（Tint）**

应用于图像的色调。

**绘制为（Draw As）**

如何绘制图像。

-   **无（None）**\- 什么也不做。
-   **框（Box）** - 绘制3x3的框，其中各个边和中部根据边距拉伸。
-   **边框（Border）** - 绘制3x3的边框，其中各个边平铺，中部为空。
-   **图像（Image）** - 绘制图像；将忽略边距。
-   **圆角框（Rounded Box）**\- 绘制带轮廓和边角半径的实心矩形。

**平铺（Tiling）**

如何在图像模式下平铺图像。

-   **无平铺（No Tile）** - 仅拉伸。
-   **水平（Horizontal）** - 水平平铺图像。
-   **垂直（Vertical）** - 垂直平铺图像。
-   **两者（Both）** - 同时沿两个方向平铺图像。

**预览（Preview）**

设置图像应该如何显示在预览框中。

**水平对齐（Horizontal Alignment）：**

-   **填充（Fill）** - 图像将水平填充预览框。
-   **左（Left）** - 图像将对齐到预览框的左侧。
-   **中心（Center）** - 图像将位于预览框的中心。
-   **右（Right）** - 图像将对齐到预览框的右侧。

**垂直对齐（Vertical Alignment）：**

-   **填充（Fill）** - 图像将垂直填充预览框。
-   **顶部（Top）** - 图像将对齐到预览框的顶部。
-   **中心（Center）** - 图像将位于预览框的中心。
-   **底部（Bottom）** - 图像将对齐到预览框的底部。

删除线笔刷

 

**图像（Image）**

要为此笔刷渲染的图像。分配的资产可以是UTexture、UMaterialInterface或实现AtlasedTextureInterface的对象。

**图像大小（Image Size）**

资源的大小（按Slate单位）。

**色调（Tint）**

应用于图像的色调。

**绘制为（Draw As）**

如何绘制图像。

-   **无（None）**\- 什么也不做。
-   **框（Box）** - 绘制3x3的框，其中各个边和中部根据边距拉伸。
-   **边框（Border）** - 绘制3x3的边框，其中各个边平铺，中部为空。
-   **图像（Image）** - 绘制图像；将忽略边距。
-   **圆角框（Rounded Box）**\- 绘制带轮廓和边角半径的实心矩形。

**平铺（Tiling）**

如何在图像模式下平铺图像。

-   **无平铺（No Tile）** - 仅拉伸。
-   **水平（Horizontal）** - 水平平铺图像。
-   **垂直（Vertical）** - 垂直平铺图像。
-   **两者（Both）** - 同时沿两个方向平铺图像。

**预览（Preview）**

设置图像应该如何显示在预览框中。

**水平对齐（Horizontal Alignment）：**

-   **填充（Fill）** - 图像将水平填充预览框。
-   **左（Left）** - 图像将对齐到预览框的左侧。
-   **中心（Center）** - 图像将位于预览框的中心。
-   **右（Right）** - 图像将对齐到预览框的右侧。

**垂直对齐（Vertical Alignment）：**

-   **填充（Fill）** - 图像将垂直填充预览框。
-   **顶部（Top）** - 图像将对齐到预览框的顶部。
-   **中心（Center）** - 图像将位于预览框的中心。
-   **底部（Bottom）** - 图像将对齐到预览框的底部。

下划线笔刷

 

**图像（Image）**

要为此笔刷渲染的图像。分配的资产可以是UTexture、UMaterialInterface或实现AtlasedTextureInterface的对象。

**图像大小（Image Size）**

资源的大小（按Slate单位）。

**色调（Tint）**

应用于图像的色调。

**绘制为（Draw As）**

如何绘制图像。

-   **无（None）**\- 什么也不做。
-   **框（Box）** - 绘制3x3的框，其中各个边和中部根据边距拉伸。
-   **边框（Border）** - 绘制3x3的边框，其中各个边平铺，中部为空。
-   **图像（Image）** - 绘制图像；将忽略边距。
-   **圆角框（Rounded Box）**\- 绘制带轮廓和边角半径的实心矩形。

**平铺（Tiling）**

如何在图像模式下平铺图像。

-   **无平铺（No Tile）** - 仅拉伸。
-   **水平（Horizontal）** - 水平平铺图像。
-   **垂直（Vertical）** - 垂直平铺图像。
-   **两者（Both）** - 同时沿两个方向平铺图像。

**预览（Preview）**

设置图像应该如何显示在预览框中。

**水平对齐（Horizontal Alignment）：**

-   **填充（Fill）** - 图像将水平填充预览框。
-   **左（Left）** - 图像将对齐到预览框的左侧。
-   **中心（Center）** - 图像将位于预览框的中心。
-   **右（Right）** - 图像将对齐到预览框的右侧。

**垂直对齐（Vertical Alignment）：**

-   **填充（Fill）** - 图像将垂直填充预览框。
-   **顶部（Top）** - 图像将对齐到预览框的顶部。
-   **中心（Center）** - 图像将位于预览框的中心。
-   **底部（Bottom）** - 图像将对齐到预览框的底部。

-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)
-   [umg](https://dev.epicgames.com/community/search?query=umg)
-   [rich text block](https://dev.epicgames.com/community/search?query=rich%20text%20block)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建和分配数据表资产](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E5%88%86%E9%85%8D%E6%95%B0%E6%8D%AE%E8%A1%A8%E8%B5%84%E4%BA%A7)
-   [富图像行数据类型](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E5%AF%8C%E5%9B%BE%E5%83%8F%E8%A1%8C%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)
-   [富文本样式行数据类型](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%B7%E5%BC%8F%E8%A1%8C%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)
-   [在UMG UI设计器中使用富文本块控件](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E5%9C%A8umgui%E8%AE%BE%E8%AE%A1%E5%99%A8%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%AF%8C%E6%96%87%E6%9C%AC%E5%9D%97%E6%8E%A7%E4%BB%B6)
-   [添加富文本块控件](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%AF%8C%E6%96%87%E6%9C%AC%E5%9D%97%E6%8E%A7%E4%BB%B6)
-   [将数据表资产分配给富文本块](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E5%B0%86%E6%95%B0%E6%8D%AE%E8%A1%A8%E8%B5%84%E4%BA%A7%E5%88%86%E9%85%8D%E7%BB%99%E5%AF%8C%E6%96%87%E6%9C%AC%E5%9D%97)
-   [将样式应用于文本](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E5%B0%86%E6%A0%B7%E5%BC%8F%E5%BA%94%E7%94%A8%E4%BA%8E%E6%96%87%E6%9C%AC)
-   [装饰器类](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E8%A3%85%E9%A5%B0%E5%99%A8%E7%B1%BB)
-   [使用装饰器](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%A3%85%E9%A5%B0%E5%99%A8)
-   [添加新装饰器](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E6%96%B0%E8%A3%85%E9%A5%B0%E5%99%A8)
-   [UMG富文本块的设置](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#umg%E5%AF%8C%E6%96%87%E6%9C%AC%E5%9D%97%E7%9A%84%E8%AE%BE%E7%BD%AE)
-   [富文本块属性](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E5%AF%8C%E6%96%87%E6%9C%AC%E5%9D%97%E5%B1%9E%E6%80%A7)
-   [富图像行数据类型的数据表资产的属性](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E5%AF%8C%E5%9B%BE%E5%83%8F%E8%A1%8C%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E7%9A%84%E6%95%B0%E6%8D%AE%E8%A1%A8%E8%B5%84%E4%BA%A7%E7%9A%84%E5%B1%9E%E6%80%A7)
-   [富文本样式行数据类型的数据表资产的属性](/documentation/zh-cn/unreal-engine/umg-rich-text-blocks-in-unreal-engine#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%B7%E5%BC%8F%E8%A1%8C%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E7%9A%84%E6%95%B0%E6%8D%AE%E8%A1%A8%E8%B5%84%E4%BA%A7%E7%9A%84%E5%B1%9E%E6%80%A7)