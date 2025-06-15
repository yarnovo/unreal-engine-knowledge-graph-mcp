# 在虚幻引擎中制作UMG控件动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animating-umg-widgets-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:17:56.932Z

---

目录

![制作UMG控件动画](https://dev.epicgames.com/community/api/documentation/image/4d598f8e-4e61-4880-b1df-b71f49743335?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cbc97eb-bbab-41a9-a226-76acabcb0308/animationbanner.png)

**控件蓝图编辑器** 的底部有两个窗口，可用来实施和控制 UI 控件的动画。第一个是 **动画** 窗口，可以创建用来驱动控件动画的基础动画轨。第二个是 **时间轴** 窗口，用于指定动画如何随时间应用至控件，其方法是在指定的时间上放置 **关键帧** 并定义附加的控件在该关键帧如何显示（可以是尺寸、形状、位置甚至颜色选项）。

## 添加动画

为了开始在 UMG 中添加动画，您首先需要添加一个动画轨。可以在 **动画** 窗口中单击 **+动画** 按钮添加动画轨。添加动画后（下图中的黄框），会收到提示为动画轨输入一个名称。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf790c64-92ae-4f7c-a670-44f880624543/animation2.png)

添加动画轨后，**时间轴** 将会变为可用，并且您可以开始添加 **动画关键帧**，动画关键帧与控件随时间改变的值是相关的。同时也请注意每个控件可以有多个动画轨，例如使一个按钮在移过屏幕的同时进行闪烁。

## 添加动画关键帧

有两种方法向动画轨中添加关键帧。第一种方法是使用 **时间轴** 窗口中的 **自动关键帧** 复选框（下图中的黄框）。通过这种方式，当对支持关键帧的值进行修改时，会自动向时间轴中添加关键帧。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a90fc4da-b506-438d-b421-14a50582076d/animation3.png)

目前选中的动画轨在 **时间轴** 的顶端突出显示（由上面的黄框表示）。

通过 **自动关键帧** 选项添加关键帧的一般流程为：为控件指定一个时间，使其在这个时间达到预定值，然后将 **时间轴滑块** 移动到这一时间上，并使用 **细节** 面板或网格（通常用于设置位置、旋转或缩放比例）来设置值。设置好最终结果后，滑动到序列的起始位置并设置控件的默认状态。在两个时间段之间滑动时间轴滑块时，应该可以看到随时间逐渐发生的变化。

第二种添加关键帧的方法是在支持关键帧的设置旁边单击 **添加关键帧** 按钮。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fa84a73-07e9-47da-81cc-e6e162e62145/animationkeyframing.png)

在上图中，每个设置旁边都有一个图标，可以单击这些图标向时间轴的当前位置添加一个该值的关键帧。在下图中，**背景颜色** 的关键帧添加到了 0.00 和 2.00，此处按钮控件的背景颜色在 2 秒内由白色变成黄色。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4962ef59-6bcf-4fc0-b388-78645ecca091/animationkeyframing2.png)

## 更改关键帧的值

按住 **Ctrl** 键并单击关键帧，可以更改时间轴上某一特定时间的多个关键帧的值。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/697f615c-76da-4447-98a6-64d90296ce96/animation5.png)

上图中，我们选择了与包含按钮的垂直框的位置相关联的所有关键帧，以此通过 **细节** 面板手动设置这些关键帧。例如，我们想使对象只沿着一个轴移动，那么可以通过手动输入值来更精确地控制控件的移动。

## 调用动画

创建动画的同时也会为其创建一个变量。在 **我的蓝图** 窗口中，可以在 **图表** 选项卡上的 **动画** 下拉菜单下，看到已经创建的所有动画轨。通过按住 **Ctrl** 并将动画拖动到图表中，就可以对其发布命令，如播放或停止。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7251a442-0ece-4082-9c64-229e474b7c59/animation6.png)

在此，我们令 **开始动画** 在控件蓝图构建好的时候开始播放。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99228012-8f42-4d1a-8ad6-430f7e9309ca/animation7.png)

并且在此我们使 **闪烁按钮** 动画在 **start\_Button** 被单击时停止播放。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dc71fa6-8e99-4afc-a9cc-75986b0123c8/animationstop.png)

## 示例：带动画的主菜单

下面是两个示例动画，用来模仿一个简单的 **主菜单** 屏幕，其中按钮从屏幕底部飞入，而 **开始** 按钮不断闪烁。完成这些步骤后，应看到与下图中的示例类似的情况。

本示例仅用于展示如何在 UMG 中设置动画，单击按钮不会有任何作用。

1.  按任意的方式设置主菜单，并在屏幕上包含一个具有 **按钮** 的 **垂直框**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec6fe34f-3d49-4c81-880e-0082dfb88916/animation1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec6fe34f-3d49-4c81-880e-0082dfb88916/animation1.png)
    
    *点击查看全图。*
    
2.  在 **动画** 窗口中单击 **新建** 按钮，并为动画命名，例如 **开始动画**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ede317b-5276-4849-8567-e7dd88c67614/animation2.png)
3.  单击 **时间轴窗口** 中的 **自动关键帧** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c54f3c2f-8aa7-447f-a38a-7efec367ff7f/animation3.png)
4.  将时间轴上的 **时间轴滑块** 移动到 **0.00**，然后单击包含按钮的 **垂直框**。
    
5.  按住 **Ctrl**，单击图案控件（黄色箭头）的中心并将 **垂直框** 拖出屏幕 (1)。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95049d9f-886f-49db-b25a-19270d4a0fc2/animation4.png)
    
    这样即可在时间轴的当前位置上添加关键帧 (2)。
    
6.  在 **垂直框** 的 **细节** 面板中，单击 **锚** 并选择 **中下方** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cbb5c27-f9ab-4d72-ac60-261e9a0558f2/animation3b.png)
7.  将 **时间轴滑块** 移动到 **1.00**，然后按住 **Ctrl**，单击并向上移动 **垂直框** 使其完全可见。
    
8.  在 **垂直框** 的 **细节** 面板中单击 **锚** 并选择 **居中** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/157c7448-6114-4dd8-8cbb-e68bc383b5ff/animation4b.png)
9.  在 **动画** 窗口中，单击 **新建** 按钮添加另一个名为 **闪烁按钮** 的动画。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18576be9-4cde-4bc9-9567-c42c9faae4cc/animation9.png)
    
    确保未勾选 **自动关键帧**。
    
10.  将 **时间轴滑块** 移动到 **1.00** 并单击 **开始** 按钮将其选中。
    
11.  在 **细节** 面板中的 **外观** 部分下，单击 **背景颜色** 旁边的 **添加关键帧** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5dc7d57-65e7-4bff-b2b9-73da8ecdbe56/animation10.png)
12.  将 **时间轴滑块** 移动到 **2.00**，然后更改 **背景颜色** 的颜色并添加另一个关键帧。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca81230d-b193-49e4-a6e2-84bd385600cc/animation11.png)
13.  此时 **闪烁按钮** 动画的 **时间轴** 应与下图中一样。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/563eefcc-f820-428f-bf84-9aa9cc7aa2ea/animation12.png)
14.  单击 **图表** 标签，将两个动画变量拖入其中，创建出下面所示的图表。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e51f8b6c-1f33-4e26-ab58-d340e988b304/animation13.png)
    
    在此，当控件蓝图构建好时，播放 **开始动画**（按钮从屏幕底部飞入）。然后使用 **Set Timer** 节点每隔 2 秒调用一次名为 **StartBlinking** 的 **自定义事件**（Set Timer 节点设置为循环）。然后 **StartBlinking** 自定义事件每隔 2 秒就播放 **闪烁按钮** 动画（该动画是指"开始"按钮随时间由白色变为绿色）。
    
15.  最后从 **关卡蓝图** 或您的可操纵角色蓝图创建控件蓝图。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abc8e038-0e73-4fc5-bd56-e08df972b2e5/animationcreatewidget.png)
    
    我们在 **我的角色** 蓝图中创建该控件（控件包含主菜单的动画和 UI 布局）并使用 **Add to Viewport** 节点将其添加到窗口。
    

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [animations](https://dev.epicgames.com/community/search?query=animations)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [添加动画](/documentation/zh-cn/unreal-engine/animating-umg-widgets-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%8A%A8%E7%94%BB)
-   [添加动画关键帧](/documentation/zh-cn/unreal-engine/animating-umg-widgets-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%8A%A8%E7%94%BB%E5%85%B3%E9%94%AE%E5%B8%A7)
-   [更改关键帧的值](/documentation/zh-cn/unreal-engine/animating-umg-widgets-in-unreal-engine#%E6%9B%B4%E6%94%B9%E5%85%B3%E9%94%AE%E5%B8%A7%E7%9A%84%E5%80%BC)
-   [调用动画](/documentation/zh-cn/unreal-engine/animating-umg-widgets-in-unreal-engine#%E8%B0%83%E7%94%A8%E5%8A%A8%E7%94%BB)
-   [示例：带动画的主菜单](/documentation/zh-cn/unreal-engine/animating-umg-widgets-in-unreal-engine#%E7%A4%BA%E4%BE%8B%EF%BC%9A%E5%B8%A6%E5%8A%A8%E7%94%BB%E7%9A%84%E4%B8%BB%E8%8F%9C%E5%8D%95)