# 在虚幻引擎项目中使用Slate | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-slate-in-a-project-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:18:23.378Z

---

目录

![在项目中使用Slate](https://dev.epicgames.com/community/api/documentation/image/e4388e4e-0475-408a-b3d3-2777c2c89c91?resizing_type=fill&width=1920&height=335)

为了使用Slate用户界面（UI）框架，你必须正确设置项目，以便它能识别出 框架。你可以添加Slate.h头文件并引用框架中的各种元素 从而使用Slate构建UI。

## 模块依赖项

Slate框架保存在若干个模块中。为了让项目使用它们， 你必须在 \*.build.cs 文件中为你的项目设置一些依赖项。

以下是你的项目需要访问的模块：

模块

依赖项类型

InputCore

公有

Slate

私有

SlateCore

私有

**设置Slate模块的依赖项：**

1.  打开你的项目的\[项目名称\].build.cs 文件。它位于\[项目目录\]/\[项目名称\]/Source/\[项目名称\]目录中。
2.  将 `"InputCore"` 添加到 `PublicDependencyModuleNames` 中，以便添加InputCore公有依赖项。
    
    ```cpp
         PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore" });
    		
    ```
    
    代码类项目被创建时，InputCore模块会被默认设置为公有依赖项。
    
3.  添加Slate和SlateCore私有依赖项。在 \*.build.cs 文件中有一行代码，可用于添加私有依赖项：
    
    ```cpp
         PrivateDependencyModuleNames.AddRange(new string[] {  });
    		
    ```
    
    将SlateCore和Slate模块添加到该行中：
    
    ```cpp
         PrivateDependencyModuleNames.AddRange(new string[] { "Slate", "SlateCore" });
    
    ```
    
    根据你创建项目的时机，以及你所使用的引擎版本，Slate依赖项可能已经 在 \*.build.cs 文件中设置好了，只是被注释掉了。你可以取消注释对应的代码， 以便设置依赖项。
    
    ```cpp
         // 若使用Slate UI则取消注释
         // PrivateDependencyModuleNames.AddRange(new string[] { "Slate", "SlateCore" });
    ```
    

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [slate](https://dev.epicgames.com/community/search?query=slate)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [模块依赖项](/documentation/zh-cn/unreal-engine/using-slate-in-a-project-in-unreal-engine#%E6%A8%A1%E5%9D%97%E4%BE%9D%E8%B5%96%E9%A1%B9)