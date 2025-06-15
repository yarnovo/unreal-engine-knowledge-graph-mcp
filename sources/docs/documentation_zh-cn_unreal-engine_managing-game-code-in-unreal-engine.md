# 在虚幻引擎中管理游戏代码 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/managing-game-code-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:38:47.718Z

---

目录

![管理游戏代码](https://dev.epicgames.com/community/api/documentation/image/468009fc-81ce-44e2-91dd-6b8d72415d1b?resizing_type=fill&width=1920&height=335)

选择操作系统：

Windows macOS Linux

## 将代码添加到项目

### C++类向导

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

### 开发环境

代码文件可通过 **Visual Studio** 创建并通过 **解决方案浏览器** 按常规方式添加到游戏项目。也可以将代码文件添加到Visual Studio之外的正确文件夹并自动重编译解决方案和项目文件。这样一来便能通过操作系统UI快速添加大量文件，并使团队工作更为简便，因为解决方案和项目文件不需要在团队成员之间同步。每个开发人员可在本地同步代码文件并重编译项目文件。

代码文件可通过 **Xcode** 创建并通过 **解决方案导航器** 按常规方式添加到游戏项目。也可将代码文件添加到Xcode之外的正确文件夹，并自动重编译项目文件。这样一来便能通过操作系统UI快速添加大量文件，并使团队工作更为简便，因为解决方案和项目文件不需要在团队成员之间同步。每个开发人员可在本地同步代码文件并重编译项目文件。

## 在开发环境中打开项目

如项目已在 **虚幻编辑器** 中打开，则可在 **文件（File）** 菜单中选择 **打开Visual Studio（Open Visual Studio）**，轻松将其在Visual Studio中打开。

![Open the Project in Visual Studio.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/894423ff-1b53-412d-a2d4-02065dcaee62/open-in-vs.png "Open Project in Visual Studio")

可通过Windows浏览器或Visual Studio的 **文件（File） > 打开（Open） > 项目/解决方案（Project/Solution）**。

**如项目处于UE根目录中：**

\* 打开UE根目录中的 `UE5.sln` Visual Studio解决方案。

**如项目处于UE4根目录之外：**

\* 打开项目根目录中的 `PROJECT_NAME.sln` Visual Studio解决方案。

如项目已在编辑器中打开，则可在 **文件（File）** 菜单中选择 **在Xcode中打开（Open in Xcode）**，轻松将其在Xcode中打开。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d18bc6a1-2ad5-4305-853d-a50717c01acb/open_xcode.png)

也可通过查找器或Xcode的 **文件（File） > 打开（Open）** 在Xcode中打开项目。

\* 打开项目根目录中的 `PROJECT_NAME.xcodeproj` Xcode项目。

## 生成项目文件

项目文件被视为中间文件，放置于 `PROJECT_DIRECTORY\Intermediate\ProjectFiles` 中。这意味着如果删除 `Intermediate` 文件夹，则必须重新生成项目文件。

### .uproject文件

**如项目处于UE根目录之外：**

1\. 在Windows浏览器中导航到 `PROJECT_NAME.uproject` 的路径。

1\. **左键点击** `PROJECT_NAME.uproject` ，确保该文件处于高亮状态。在 `PROJECT_NAME.uproject` 文件上 **点击右键** 并选择 **生成Visual Studio文件（Generate Visual Studio Files）**。

![Generate Visual Studio Project Files](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8bb21d6f-c8b0-47ab-8272-4df8493ac50d/generate-vs-project-files.png "Generate Visual Studio Project Files")

1\. **UnrealBuildTool** 更新项目文件和解决方案，包括生成Intellisense数据。

![Generating Project Files Dialogue Box](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4317f8b3-92ed-452a-b754-4fc7fb48b11f/generating-project-files-dialogue.png "Generate Project Files")

1\. 打开项目根目录中的 `PROJECT_NAME.sln` Visual Studio解决方案，在Visual Studio中查看游戏项目。

1\. 在查找器中导航到 `PROJECT_NAME.uproject` 的路径。

1\. 在 `PROJECT_NAME.uproject` 文件上 **点击右键** 并选择生成Xcode文件（Generate Xcode Files）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26d0a4b5-06e2-450a-a6f2-4dcac5bd574c/generate_xcode_files.png)

1\. UnrealBuildTool更新项目

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86a2eb4e-db87-4b95-a203-b83b0d1fd46e/generate_project_files_xcode.png)

1\. 打开项目根目录中的 `PROJECT_NAME.uproject` Xcode项目，在Xcode中查看游戏项目。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [managing game code](https://dev.epicgames.com/community/search?query=managing%20game%20code)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [将代码添加到项目](/documentation/zh-cn/unreal-engine/managing-game-code-in-unreal-engine#%E5%B0%86%E4%BB%A3%E7%A0%81%E6%B7%BB%E5%8A%A0%E5%88%B0%E9%A1%B9%E7%9B%AE)
-   [C++类向导](/documentation/zh-cn/unreal-engine/managing-game-code-in-unreal-engine#c++%E7%B1%BB%E5%90%91%E5%AF%BC)
-   [开发环境](/documentation/zh-cn/unreal-engine/managing-game-code-in-unreal-engine#%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)
-   [在开发环境中打开项目](/documentation/zh-cn/unreal-engine/managing-game-code-in-unreal-engine#%E5%9C%A8%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E4%B8%AD%E6%89%93%E5%BC%80%E9%A1%B9%E7%9B%AE)
-   [生成项目文件](/documentation/zh-cn/unreal-engine/managing-game-code-in-unreal-engine#%E7%94%9F%E6%88%90%E9%A1%B9%E7%9B%AE%E6%96%87%E4%BB%B6)
-   [.uproject文件](/documentation/zh-cn/unreal-engine/managing-game-code-in-unreal-engine#uproject%E6%96%87%E4%BB%B6)