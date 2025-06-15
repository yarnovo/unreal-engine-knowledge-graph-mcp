# 在虚幻引擎中使用UMG字体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-fonts-with-umg-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:19:16.831Z

---

目录

![使用UMG字体](https://dev.epicgames.com/community/api/documentation/image/46bfe197-de80-4c5c-a009-1b45bae625f7?resizing_type=fill&width=1920&height=335)

在此指南中，您将学习到如何用控件蓝图编辑器设置 **文本** 控件的自建字体资源。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03329c5a-960f-4c8c-bca8-be2181248cd4/01_fontwithumg_hero.png)

## 步骤

执行以下步骤来学习如何调整自定义字体并通过控件蓝图编辑器的UMG UI设计工具来使用字体。

在此指南中，我们使用的是 **Blank Template**，未加入 **Starter Content**。选择默认 **Target Hardware** 和 **Project Settings**。

1.  创建一个新的[控件蓝图](/documentation/zh-cn/unreal-engine/widget-blueprints-in-umg-for-unreal-engine)。在 **内容浏览器（Content Browser）** 中点击 **添加（Add）**，然后选择 **用户界面（User Interface） > 控件蓝图（Widget Blueprint）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0444e05f-6966-4273-a03e-95069494530b/02_newwidgetblueprint.png)
2.  **双击** 创建好的 **控件蓝图（Widget Blueprint）** 来将其在 **控件蓝图编辑器（Widget Blueprint Editor）** 中打开。
    
3.  在 **调色板（Pallete）** 面板中找到 **画板面板（Canvas Panel）** 控件并将其拖入 **可视化设计工具（Visual Designer）** 窗口中。
    
4.  在 **调色板（Pallete）** 面板中找到 **文本（Text）** 控件并将其拖入 **可视化设计工具（Visual Designer）** 窗口的 **画板面板（Canvas Panel）**。
    
5.  点击创建好的 **文本（Text）** 控件来访问它的 **细节（Details）** 面板。在 **细节（Details）** 面板中，在 **外观（Appearance）** 下找到 **字体（Font）** 选项。在这里可以调整字体类型、风格（常规、粗体、斜体等）、大小以及间距等等。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/736ece50-e1aa-4696-9e44-0b07d42c2b69/03_fontoptions.png)
6.  **虚幻引擎（Unreal Engine）** 默认使用 **Roboto** 字体。点击 **字体类型（Font Family）** 旁的下拉菜单即可选择创建的自定义字体资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d771e93-1476-4052-9d5a-31f1e8cb0fd8/04_fontfamily.png)
    
    也可在此菜单中选择创建一个自定义字体并指定新资源的保存位置（默认为空，需要填入）。
    
7.  点击 **风格（TypeFace）** 旁的下拉菜单来为选中的字体资产选用风格。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfd977de-dcaa-45c8-a53c-ee119cf30a39/05_fonttypeface.png)
8.  你可以在 **大小（Size）** 旁边的输入框指定字体大小。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9da7be0e-db5b-4581-b7fb-4a117611d97e/06_fontsize.png)
9.  另外，还可以在 **字母间距（Letter Spacing）** 旁的输入框来指定字母之间的距离。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/394374d2-ec9e-4e6a-bfca-2095456d2fae/07_fontletterspacing.png)

当前版本中 UMG 只支持 **Runtime** 缓存字体资源。此外，如果你已使用老方法指定字体，基于文件的现有字体设置不会丢失，但之后需要创建字体资产以便以UMG使用自定义字体。

## 最终结果

你已经了解了通过控件蓝图编辑器调整文本控件的 **字体** 资产的基础。另外，你可以通过[颜色、材质和外框属性](/documentation/zh-cn/unreal-engine/font-materials-and-outlines-in-unreal-engine)来设置更多的字体风格。

-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-fonts-with-umg-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-fonts-with-umg-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)