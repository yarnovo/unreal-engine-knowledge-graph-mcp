# 虚幻引擎中的蓝图头文件视图概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/an-overview-of-the-blueprint-header-view-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:37:20.944Z

---

目录

![蓝图头文件视图](https://dev.epicgames.com/community/api/documentation/image/fb3de82d-54ca-49e9-b45c-5dc257cade6b?resizing_type=fill&width=1920&height=335)

**蓝图头文件视图（Blueprint Header View）** 可将虚幻引擎[蓝图类](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine)和[蓝图结构体](/documentation/zh-cn/unreal-engine/blueprint-struct-variables-in-unreal-engine)转换为C++代码。

如果你用过虚幻引擎4，它就像虚幻引擎4中的[蓝图原生化](https://docs.unrealengine.com/4.27/zh-CN/ProgrammingAndScripting/Blueprints/TechnicalGuide/NativizingBlueprints/)。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3c3f2b5-fc3b-46e1-9748-a9fc3d6fe09e/blueprintheaderview.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3c3f2b5-fc3b-46e1-9748-a9fc3d6fe09e/blueprintheaderview.png)

在转换过程中，蓝图头文件视图会为蓝图的以下元素创建C++样式的声明：

-   [变量](/documentation/zh-cn/unreal-engine/blueprint-variables-in-unreal-engine)
    
-   [函数](/documentation/zh-cn/unreal-engine/functions-in-unreal-engine)
    
-   [Actor组件](/documentation/zh-cn/unreal-engine/basic-components-in-unreal-engine)
    
-   [事件分发器](/documentation/zh-cn/unreal-engine/event-dispatchers-in-unreal-engine)
    

## 使用蓝图头文件视图

要在项目中使用蓝图头文件视图，请执行以下操作：

1.  右键点击 **内容浏览器（Content Browser）** 中的蓝图 **类（Class）** 或 **结构体（Struct）** 。
    
2.  从上下文菜单，选择 **预览等效C++头文件（Preview Equivalent C++ Header）** 。
    

![预览cpp](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4bd6dc2d-7304-48fb-b98b-6b0ac7cd24cb/previewcpp.png)

### C++头文件预览

从菜单选择 **预览等效C++头文件（Preview Equivalent C++ Header）** 时，将打开 **C++头文件预览（C++ Header Preview）** 窗口。该窗口将显示蓝图的变量、函数、Actor组件和事件分发器。

![cpp头文件预览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ed2753e-d1d7-4a99-bcd0-dbad1e56b352/cppheaderpreview.jpg)

### 设置

点击 **设置（Settings）** 按钮，打开 **样式（style）** 和 **排序（sort）** 选项的下拉列表。

![设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8247b44e-be63-4677-b7ad-de3056af6e80/settings.png)

#### 排序方法

**排序方法（Sort Method）** 提供了在C++头文件预览窗口中对蓝图类和属性的显示排序的选项。从以下排序方法值选择：

排序方法

说明

无

属性按蓝图类中的相同显示顺序显示。

按访问说明符排序

属性按访问说明符以可视性（公开（public）、受到保护（protected）、私密（private））的顺序分组在一起。

为最优填充排序

属性排序为尽量减少编译的类布局中的填充。

#### 样式

**样式（Style）** 类似于语法高亮显示。你可以在C++头文件预览窗口中调整 **语法** 和 **选择颜色** 的 **字体大小（Font Size）** 和 **颜色RGB（Color RGB）** 。你可以配置以下语法元素：

-   注释
    
-   错误
    
-   宏
    
-   类型名称
    
-   标识符
    
-   关键字
    

![语法颜色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ac60d43-1440-4346-a691-3a4e8809bf0a/syntaxcolors.png)

#### 选择颜色

在C++头文件预览中使用鼠标时，更改 **选择颜色（Selection Color）** 可控制选择高亮显示。

![高亮显示选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd28f06e-a368-4837-8aac-bcf13cf2655d/highlightcolors.png)

在上图中，我们将选择颜色值设置为RGB颜色紫色。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [header view](https://dev.epicgames.com/community/search?query=header%20view)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用蓝图头文件视图](/documentation/zh-cn/unreal-engine/an-overview-of-the-blueprint-header-view-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%93%9D%E5%9B%BE%E5%A4%B4%E6%96%87%E4%BB%B6%E8%A7%86%E5%9B%BE)
-   [C++头文件预览](/documentation/zh-cn/unreal-engine/an-overview-of-the-blueprint-header-view-in-unreal-engine#c++%E5%A4%B4%E6%96%87%E4%BB%B6%E9%A2%84%E8%A7%88)
-   [设置](/documentation/zh-cn/unreal-engine/an-overview-of-the-blueprint-header-view-in-unreal-engine#%E8%AE%BE%E7%BD%AE)
-   [排序方法](/documentation/zh-cn/unreal-engine/an-overview-of-the-blueprint-header-view-in-unreal-engine#%E6%8E%92%E5%BA%8F%E6%96%B9%E6%B3%95)
-   [样式](/documentation/zh-cn/unreal-engine/an-overview-of-the-blueprint-header-view-in-unreal-engine#%E6%A0%B7%E5%BC%8F)
-   [选择颜色](/documentation/zh-cn/unreal-engine/an-overview-of-the-blueprint-header-view-in-unreal-engine#%E9%80%89%E6%8B%A9%E9%A2%9C%E8%89%B2)