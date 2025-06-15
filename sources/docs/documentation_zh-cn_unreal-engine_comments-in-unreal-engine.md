# 虚幻引擎中的注释 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/comments-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:12.143Z

---

目录

![注释](https://dev.epicgames.com/community/api/documentation/image/bbc5ac4e-91b3-4936-b639-e8c5d6a8a02a?resizing_type=fill&width=1920&height=335)

**注释** 可被直接添加到单个 *蓝图* 节点上，也可以注释框的形式添加到组相关节点上并提供其功能的描述信息。它们可以单独以其管理用途来让 **图表** 更易读懂，但它们也可以用来提供信息，正如添加注释到节点一样，使用注释或注释框可以把文本描述内容添加到节点上。

## 节点注释

### 创建节点注释

如需直接在 *蓝图* 图表中添加注释：

1.  在节点上右键点击。
    
2.  在出现的菜单中，在 **Node Comment** （节点注释）文本框位置处输入注释，然后按下 **回车** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7919b342-8488-48af-b9f1-a3aad90fa4d6/type_node_comment.png)

你的注释会出现于节点上方的小注释气泡中。 如对图表进行缩放，节点注释将不会相应缩放。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc039f5f-29fa-42c0-b9ee-2950f725f934/commented_node.png)

### 编辑并移除节点注释

再次右键单击节点，在右键单击出现的菜单中变更 **Node Comment** （节点注释）文本框的内容来改变注释。 删除文本并按下 **回车** 将会移除注释。

## 注释框

### 创建注释框

创建注释框很容易：

1.  选择一个你想要进行注释的节点组。 你也可以先创建一个空白的注释框，并在稍后对节点附近的注释框进行排列，或者将其作为悬浮注释放置于指定区域。
    
2.  右键点击并选择 **Create Comment from Selection** （从选择项中创建注释) (如果未选中任何节点则选择 **Add Comment...** （添加注释...) )。 此时将出现新的注释框。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19e7ff89-6be0-498f-977c-11db7711ac2b/create_comment_from_selection.png)
    
    也可以点击 **C** 来创建注释。
    
3.  将你的注释输入于出现的注释框的页眉位置。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d3a2ad7-e759-40f4-8f5c-a28b7e2faac2/type_box_comment.png)
4.  你可以通过拖曳注释框的右下角来重新定义注释框尺寸。 请注意如果你尝试移动注释框，则任何位于框体内的节点将会一起移动。这对于重新排列调整过的节点组来说非常有用。 可通过 **细节** 选项卡来逐个为注释框进行此项操作的变更。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b494ad0-8703-4dd5-b3a9-d0ce14ade86f/finished_comment_box.png)
    
    注释框中的文本会随着图表的放大缩小而缩放，所以把图表缩小后，大致看一眼注释框会对了解其功能很有帮助。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ddce14b-abfd-423e-9a09-ebb6c3769517/zoomed_many_boxes.png)

### 编辑注释框文本

右键单击注释框的页眉位置，在右键单击出现的菜单中变更 **Node Comment** （节点注释）文本框的内容来改变你注释的文本。 按下 **回车** 来保存你的新注释。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e39b3f8-1076-4759-a83a-208a8ffd6bf7/rtclick_comment_box_change.png)

或者：

-   选中注释框后按下 **F2** 来编辑注释。
-   双击注释框的页眉位置来编辑注释。

### 删除注释框

在任何注释框体上点击并按下 **删除** 键，或右键点击注释框的页眉位置，并从右键点击出现的菜单中选择 **删除** 。这些选项将会删除注释框，但对于注释框内包含的节点无效。

### 注释框属性

注释框属性可以通过 **细节** 选项卡中分别对每个注释框进行调整。 只要点击注释框即可在 **细节** 选项卡中显示其属性。

项目

描述

**属性**

 

**注释颜色**

该属性可以让你变更注释框的背景颜色。 请记住使用Alpha值来调整背景的透明度。

**对注释泡泡上色**

如此项被勾选，则 **注释颜色** 将会被应用到注释框中。

**移动模式**

该属性可让你设置在移动注释时是否要同时移动其中的节点，(如同时移动则为 **组移动** 模式) ，或移动注释时为单独移动，不移动其中的节点(**注释** 模式）

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [节点注释](/documentation/zh-cn/unreal-engine/comments-in-unreal-engine#%E8%8A%82%E7%82%B9%E6%B3%A8%E9%87%8A)
-   [创建节点注释](/documentation/zh-cn/unreal-engine/comments-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%8A%82%E7%82%B9%E6%B3%A8%E9%87%8A)
-   [编辑并移除节点注释](/documentation/zh-cn/unreal-engine/comments-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%B9%B6%E7%A7%BB%E9%99%A4%E8%8A%82%E7%82%B9%E6%B3%A8%E9%87%8A)
-   [注释框](/documentation/zh-cn/unreal-engine/comments-in-unreal-engine#%E6%B3%A8%E9%87%8A%E6%A1%86)
-   [创建注释框](/documentation/zh-cn/unreal-engine/comments-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%B3%A8%E9%87%8A%E6%A1%86)
-   [编辑注释框文本](/documentation/zh-cn/unreal-engine/comments-in-unreal-engine#%E7%BC%96%E8%BE%91%E6%B3%A8%E9%87%8A%E6%A1%86%E6%96%87%E6%9C%AC)
-   [删除注释框](/documentation/zh-cn/unreal-engine/comments-in-unreal-engine#%E5%88%A0%E9%99%A4%E6%B3%A8%E9%87%8A%E6%A1%86)
-   [注释框属性](/documentation/zh-cn/unreal-engine/comments-in-unreal-engine#%E6%B3%A8%E9%87%8A%E6%A1%86%E5%B1%9E%E6%80%A7)