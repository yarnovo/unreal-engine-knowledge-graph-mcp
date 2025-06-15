# 虚幻引擎编辑器工具控件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/editor-utility-widgets-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:35:18.796Z

---

目录

![编辑器工具控件](https://dev.epicgames.com/community/api/documentation/image/cf37bcb0-5e93-4825-883e-3f9f44e7fe5a?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

如果您想要修改 **虚幻编辑器** 的用户界面(UI)，您可以使用 **编辑器工具控件（Editor Utility Widgets）** 来添加新的UI元素。编辑器工具控件是基于 **虚幻动态图形（Unreal Motion Graphics）** (UMG)的，所以您可以像在任何其他UMG控件蓝图中一样设置蓝图中的控件。

这些控件专门用于编辑器UI，您可以使用它们来创建自定义编辑器选项卡。然后，您可以从窗口（Windows）菜单中选择这些自定义选项卡，就像选择现有的编辑器选项卡一样。

## 创建编辑器工具控件

1.  在 **内容浏览器（Content Browser）** 中单击右键，选择 **编辑器工具（Editor Utilities）> 编辑器控件（Editor Widget）**。
    
    ![Add Editor Utility Widget asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83c52750-d78c-4d66-97ac-c796cdc2e0cc/ue5_1-01-add-asset.png "Add Editor Utility Widget asset")
2.  命名编辑器工具控件资产。在本例中，该资产被命名为 **TestEditorUtility**。双击该 **编辑器工具控件资产（Editor Utility Widget Asset）** 以打开控件蓝图进行编辑。
    
    ![Name your Editor Utility Widget Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e00f538-3557-4e6a-918c-681ff87d2c30/ue5_1-02-name-asset.png "Name your Editor Utility Widget Asset")
3.  根据需要编辑控件蓝图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/297a17cb-f27c-402d-a439-3e4334d9cd28/ue5_1-03-edit-widget-blueprint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/297a17cb-f27c-402d-a439-3e4334d9cd28/ue5_1-03-edit-widget-blueprint.png)
    
4.  右键单击该 **编辑器工具控件资产（Editor Utility Widget Asset）**，并选择 **运行编辑器工具控件（Run Editor Utility Widget）** 以打开一个显示编辑器工具的编辑器选项卡。该选项卡只能与关卡编辑器选项卡一起停靠。
    
    ![Run Editor Utility Widget](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a5568b0-fe30-40f7-a9c7-e44584ce6213/ue5_1-04-run-editor-utility-widget.png "Run Editor Utility Widget")
5.  一旦您运行了编辑器工具控件，它就会出现在关卡编辑器的窗口（Windows）下拉框中的编辑器工具控件（Editor Utility Widgets）类别下。
    
    ![Test Editor Utility](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c54fb816-d553-4e0c-98f3-a861bd1c9343/ue5_1-05-enable-test.png "Test Editor Utility")

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)
-   [blutilities](https://dev.epicgames.com/community/search?query=blutilities)
-   [editor utility](https://dev.epicgames.com/community/search?query=editor%20utility)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建编辑器工具控件](/documentation/zh-cn/unreal-engine/editor-utility-widgets-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%BC%96%E8%BE%91%E5%99%A8%E5%B7%A5%E5%85%B7%E6%8E%A7%E4%BB%B6)