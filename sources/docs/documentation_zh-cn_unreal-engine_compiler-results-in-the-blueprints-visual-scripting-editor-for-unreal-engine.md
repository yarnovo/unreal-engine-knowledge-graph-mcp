# 虚幻引擎蓝图可视化脚本编辑器中的编译器结果 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/compiler-results-in-the-blueprints-visual-scripting-editor-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:37:58.474Z

---

目录

![蓝图编辑器编译器结果](https://dev.epicgames.com/community/api/documentation/image/d45170e3-aa6c-4116-be8e-21f0df445712?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afa03fcb-5b00-4da2-b7cb-01ed30b98190/compilerwindow.png)

**编译器结果** 面板提供了编译你的蓝图脚本的反馈，告知你蓝图脚本编译是否成功或者是否有 *错误* 或 *警告* 。任何时候当发现错误或警告时，编译器结果面板会提供关于错误的信息并给出超链接，使你可以直接跳转到图表视图中存在问题的根源处。

## 界面

编译器结果的用户界面非常简单，主要由编译成功、编译警告及编译错误(失败)信息的自动填充列表构成。在任何可行的地方，你可以将鼠标悬停到每条信息上获得更多详细信息，并且所有警告或错误都会提供一个超链接，使你可以直接跳转到该信息的源头处。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed2e9135-6dee-4f4b-a84c-78b02f522a31/compileresultsui.png)

1.  Result List（结果列表） - 这是个自填充的列表，显示了你的编译结果。将会呈现到任何错误及警告的超链接。如果编译成功，你还会看到总的编译时间，以毫秒为单位。
2.  Pop-up Help（弹出式帮助） - 通过把鼠标悬停到列表中的每一项上，你可以获得关于该项本质的更多信息。如果有超链接，你可以直接跳转到出问题的节点。
3.  Clear Button（清除按钮） - 该按钮简单地清除现有的结果列表。

## 打开编译器结果面板

默认情况下， **编译器结果** 面板并不总是显示，但是可以在蓝图编辑器的 **窗口** 菜单中找到它。当蓝图编译时产生了错误或警告时，也会自动打开该面板。一般，该面板将会出现在当前 **图表** 面板的底部。

## 错误和警告浏览

任何时候，当你的编译过程中产生警告或错误时， **编译器结果** 面板使你可以执行以下操作：

-   将鼠标悬停到一条信息上来查看详细信息。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/508822e3-9499-45f0-b931-f91984e02919/mouseovermessage.png)
-   将鼠标悬停到一条信息尾部的超链接上，来查看到出问题的节点的链接。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0967b06-22fd-4082-84cc-8bc1d3f6f462/mouseoverlink.png)
-   点击一条信息来直接跳转到图表视图中出问题的节点或者可视化脚本的某个部分。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82111164-cccb-4d47-8605-5a264f98d2c3/warningfocus.jpg)
-   点击面板右下角的 **清除** 按钮来清除现有的所有信息。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e5db8d9-d8d7-42e5-b214-c66d6aa3fc8b/clearbuttons.png)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [界面](/documentation/zh-cn/unreal-engine/compiler-results-in-the-blueprints-visual-scripting-editor-for-unreal-engine#%E7%95%8C%E9%9D%A2)
-   [打开编译器结果面板](/documentation/zh-cn/unreal-engine/compiler-results-in-the-blueprints-visual-scripting-editor-for-unreal-engine#%E6%89%93%E5%BC%80%E7%BC%96%E8%AF%91%E5%99%A8%E7%BB%93%E6%9E%9C%E9%9D%A2%E6%9D%BF)
-   [错误和警告浏览](/documentation/zh-cn/unreal-engine/compiler-results-in-the-blueprints-visual-scripting-editor-for-unreal-engine#%E9%94%99%E8%AF%AF%E5%92%8C%E8%AD%A6%E5%91%8A%E6%B5%8F%E8%A7%88)