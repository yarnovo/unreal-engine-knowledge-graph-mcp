# 使用虚幻引擎中的C++类向导 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-cplusplus-class-wizard-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:38:48.825Z

---

目录

![C++类向导](https://dev.epicgames.com/community/api/documentation/image/a0d6161b-2df7-4ba3-b90d-d19b146d2a3f?resizing_type=fill&width=1920&height=335)

选择操作系统：

Windows macOS Linux

**C++类向导** 提供了一种快速而简单的方法，可将本地C++代码类添加到项目中，以便用户对自有的功能进行延展。 这会将纯内容的项目转换为一个代码项目。你可以像这样访问C++类向导，然后参照下述步骤新建C++类：

开始前请确保已安装Windows桌面版Visual Studio 2019或更高版本。如使用的是Mac，则必须安装Xcode 9或更高版本。

1.  在主编辑器中选择 **工具（Tool） > 新建C++类（New C++ Class...）**
    
    ![Open a new CPP class from the menu bar.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/069f19ad-bbfd-4cca-ad8a-249c0cbbdc7f/new-cpp-class.png "New CPP Class")
2.  **C++类向导** 将出现，并默认显示 **常用类（Common Classes）**。如果你没有找到所需的类，可以点击窗口右上角的 **显示所有类** 勾选框并查看所有类。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3502128-3bc4-415d-b5cc-67181f3c49a1/common-classes.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3502128-3bc4-415d-b5cc-67181f3c49a1/common-classes.png)
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4c7b3a4-5096-43d4-93a9-aa335e7d6acc/all-classes.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4c7b3a4-5096-43d4-93a9-aa335e7d6acc/all-classes.png)
    
    常用类
    
    所有类
    
3.  选择你要添加的类。在本文中，我们将选择新建 **Actor** 类。选择 **Actor** 类，然后点击 **下一步（Next >）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82f2e46e-d075-432a-a774-00b8d265607a/choose-actor-class.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82f2e46e-d075-432a-a774-00b8d265607a/choose-actor-class.png)
    
4.  之后将弹出为新类输入 **命名** 的提示。执行此操作并点击 **创建类（Create Class）** 按钮。这将创建标头（`.h`）和源（`.cpp`）文件。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97391390-dc49-4e4e-83c9-01847c8d26b1/name-new-actor-class.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97391390-dc49-4e4e-83c9-01847c8d26b1/name-new-actor-class.png)
    
    类命名只包含字母数字字符，不包含空格。域将通知是否输入了无效命名。
    
5.  在虚幻引擎中，现在 **Live Coding** 会默认启用。新建类文件后，会显示Live Coding窗口并编译类文件。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa1efe8e-49c3-4c06-a194-0d300a12ce50/live-coding.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa1efe8e-49c3-4c06-a194-0d300a12ce50/live-coding.png)
    
6.  代码将立即在Visual Studio中打开，可进行编辑。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff9ee05a-b99c-4a79-852f-b992255915e4/code-in-vs.png)
    
    代码将立即在Xcode中打开，可进行编辑。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55173941-f3f9-4243-ad3f-2d6f557f827b/codeediting_xcode.png)

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

相关文档

[

代码规范

![代码规范](https://dev.epicgames.com/community/api/documentation/image/b4e508f7-fa6d-4adf-a103-720fe2455fb7?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine)

[

从源代码构建虚幻引擎

![从源代码构建虚幻引擎](https://dev.epicgames.com/community/api/documentation/image/1d4e3c6c-26c7-41c1-8641-b0e651e179a4?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/building-unreal-engine-from-source)

[

编译游戏项目

![编译游戏项目](https://dev.epicgames.com/community/api/documentation/image/722db0b2-6223-44e1-b62f-9165d39d6178?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/compiling-game-projects-in-unreal-engine-using-cplusplus)