# Color Picker in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/color-picker-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:52:17.247Z

---

目录

![取色器](https://dev.epicgames.com/community/api/documentation/image/7aed100a-3d08-4e48-87e0-7feb3f9fd620?resizing_type=fill&width=1920&height=335)

**取色器（Color Picker）** 让你可以轻松地在虚幻编辑器中调整某个颜色属性的颜色值。你可以用RGBA（红色、绿色、蓝色、透明）、HSV（色调、饱和度、值）和十六进制颜色码（ARGB）。你也可以单击色环中的任意位置，或者采集鼠标指针所在位置的颜色（屏幕任何位置都可以）。

![ColorPicker](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b571a45-b4c8-49c2-881c-b4e9d1b5c1ec/colorpicker.png)

选项

说明

![主题和sRGB（Themes & sRGB）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70f56692-9860-4141-8d67-50aecc17ecdc/themesrgb.png)

允许选择[主题](/documentation/zh-cn/unreal-engine/color-picker-in-unreal-engine#%E4%B8%BB%E9%A2%98)和 **sRGB** 预览（请参见以下注释）。

![色环](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c1bec4e-5372-49f1-8d77-0353564ad7d0/colorwheel.png)

在色环中，用鼠标单击并拖拽即可直观地选择颜色。其他调整可以使用两个竖条完成。除了色环，也可以使用色谱，但前提是启用了这个选项。

![色卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3675450-9043-4b04-9454-7c3c7e3cd285/colorswatches.png)

当前指定给属性的颜色显示为（Old），当前在取色器中选中的颜色显示为（New）。颜色可以从 *Old* 或 *New* 部分中拖到 **主题** 栏进行保存，以便后续重复使用。

![取色选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ef44495-1164-424e-896e-470442a1a9b0/coloroptions.png)

在色环和或色谱（左图）之间切换。**滴管**（右图）可以用于从虚幻引擎内部或外部的任意窗口选择带颜色的像素。

![红色通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8b5be52-60d9-4c82-8e2b-5439a462971a/redchannel.png)

拖拽或输入值来设置 **红色** 通道。

![绿色通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fff6c27-63ee-468d-9bc6-ef14fc963348/greenchannel.png)

拖拽或输入值来设置 **绿色** 通道。

![蓝色通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/348f2306-609f-4a1f-bf7c-c36a95714639/bluechannel.png)

拖拽或输入值来设置 **蓝色** 通道。

![色调通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/190c05cf-cfd9-45e1-bdb5-4469d3766b4d/huechannel.png)

拖拽或输入值来设置 **色调**。

![饱和度通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8bd30dc-f108-41c0-91e3-74b8c1eac657/saturationchannel.png)

拖拽或输入值来设置 **饱和度**。

![值通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/436d95f1-113c-48a0-bedf-c64e3db426fe/valuechannel.png)

拖拽或输入值来设置 **值**（颜色亮度）。

![透明通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d72813d8-007e-45fd-92b7-a328cc432fba/alphachannel.png)

拖拽或输入值来设置 **透明** 通道。

![十六进制值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af82487a-335d-47f5-8f6a-3d8e3ab593b5/hexvalues.png)

以“十六进制线性（Hexadecimal Linear）”或“十六进制sRGB（Hexadecimal sRGB）”格式手动输入值。

在使用取色器时，它不会将“滴管”在屏幕上采集的色样直接进行逆伽玛转换（inverse gamma conversion）。而是将sRGB视为所有颜色的取样空间，这样从Photoshop采集的色样就与转换到线性空间的颜色版本相同。当重新转换回到sRGB空间时，它就是你在Photoshop中看到的相同颜色。

`FColor` 和 `FLinearColor` 也可以使用UPROPERTY标签 **sRGB=true**（或 **false**）默认为sRGB空间，你可以强制默认选中某个特定的sRGB复选框。

[虚幻示意图形(UMG)](/documentation/zh-cn/unreal-engine/creating-user-interfaces-with-umg-and-slate-in-unreal-engine)中的一些地方现在强制实施该默认设置,因为sRGB是（PC上）渲染UMG的空间。在Mac上，最终的渲染空间是伽玛2.2，因此需要进行更多操作。

## 主题

**主题（Themes）** 是可以轻松复用的颜色集合。它们可以提供一些常用颜色，或者将美术和设计师使用的颜色限制于一个特定的调色盘。

![示例主题](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/242ea3ea-d332-4cfe-8ca0-b3da182046c1/theme_spring.png)

### 创建主题

单击 **主题菜单（Theme Menu）** 按钮。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6987a427-3242-4146-9510-795763291f64/thememenubutton.png)

单击 **新建主题（New Theme）** 按钮以向列表添加空主题。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ed4eb1a-4efa-4490-9a28-1bf4b3683bda/newtheme_2.png)

单击 **复制（Duplicate）** 按钮以创建复制现有主题的新主题。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0840eeb-1d5c-4342-944d-fb242853ce10/theme_duplicate.png)

### 重命名主题

单击 **重命名（Rename）** 按钮可以将主题重命名。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/699f5e06-d8b5-444b-979a-fc2f36c4da7f/theme_rename.png)

这样会显示一个文本字段，其中包含默认文本“新主题（New Theme）”。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b6fe225-ac37-4b0c-afb4-8aa4e44f1204/theme_rename_editbox.png)

为主题输入新名称。然后单击 **接受（Accept）** 按钮。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7476f42-724a-419f-9e58-b5f9229b07d3/theme_rename_newname.png)

### 添加和移除颜色

主题中的颜色可以通过拖放进行添加、移除或重新排序。

从主色卡拖拽颜色以添加到主题。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3ce625a-56a1-40e6-ab25-488ef53204e6/theme_add_color.png)

向左或向右拖拽颜色可以对主题中的颜色重新排序。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68ae62d3-d551-4007-b1a6-df531fbb9276/theme_edit.png)

将颜色拖拽到 **垃圾桶** 图标可以从主题中删除颜色。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5760b6ef-a3d2-40e2-bd1a-b04654e3d433/theme_edit_color_delete.png)

颜色也可以用 **主题菜单（Theme Menu）** 进行重新排序和移除。

要编辑主题，请将颜色向左或向右拖拽。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98c4c381-a72d-4d9e-835f-087c55cd3855/theme_menu_edit.png)

要从主题删除颜色，请将其拖到 **垃圾桶** 图标。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6736fea6-0005-4a7b-b21e-2639b30bbf11/theme_menu_delete.png)

### 为主题中保存的颜色添加标签

你可以为 **主题栏** 中保存的颜色添加标签，方法是右键单击保存的颜色，然后在 **颜色标签（Color Label）** 窗口中为颜色输入名称。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bedb76c8-3018-4694-b961-ea2e7d8fadb5/colorlabel-2.png)

将鼠标悬浮于已经添加了标签的颜色上时，你会看到该颜色的工具提示属性中列出了其名称。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/543a8d30-9464-4179-859e-2cb667ba4ae3/colorlabel-3.png)

颜色也可以用 **主题菜单（Theme Menu）** 添加标签。右键单击颜色，然后在 **颜色标签（Color Label）** 窗口中为颜色输入名称。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87630f8c-7830-42f5-bc23-a54a5092c28c/colorlabel-4.png)

### 使用主题

要更改主题，在 **主题菜单（Theme Menu）** 中选择你要激活的主题。

![选择主题](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b1347f1-bc80-40aa-8e3d-c28e4710e67e/theme_select.png)

要使用当前主题中的颜色，双击要应用的颜色。这样会更新取色器中当前选中的颜色。

![使用颜色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45fd293d-dbb1-4c52-948c-73b62813d645/theme_use_color.png)

将光标悬浮于主题中的某种颜色上将显示该颜色的信息。

![颜色信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5518b8d8-ea33-457c-a48e-306b86e18f70/theme_color_info.png)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [主题](/documentation/zh-cn/unreal-engine/color-picker-in-unreal-engine#%E4%B8%BB%E9%A2%98)
-   [创建主题](/documentation/zh-cn/unreal-engine/color-picker-in-unreal-engine#%E5%88%9B%E5%BB%BA%E4%B8%BB%E9%A2%98)
-   [重命名主题](/documentation/zh-cn/unreal-engine/color-picker-in-unreal-engine#%E9%87%8D%E5%91%BD%E5%90%8D%E4%B8%BB%E9%A2%98)
-   [添加和移除颜色](/documentation/zh-cn/unreal-engine/color-picker-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%92%8C%E7%A7%BB%E9%99%A4%E9%A2%9C%E8%89%B2)
-   [为主题中保存的颜色添加标签](/documentation/zh-cn/unreal-engine/color-picker-in-unreal-engine#%E4%B8%BA%E4%B8%BB%E9%A2%98%E4%B8%AD%E4%BF%9D%E5%AD%98%E7%9A%84%E9%A2%9C%E8%89%B2%E6%B7%BB%E5%8A%A0%E6%A0%87%E7%AD%BE)
-   [使用主题](/documentation/zh-cn/unreal-engine/color-picker-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%B8%BB%E9%A2%98)