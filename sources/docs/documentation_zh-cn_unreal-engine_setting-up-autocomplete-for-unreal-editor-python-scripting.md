# 为虚幻编辑器Python脚本设置自动完成 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-autocomplete-for-unreal-editor-python-scripting
> 
> 生成时间: 2025-06-14T20:35:55.013Z

---

目录

![为编辑器Python脚本设置自动完成](https://dev.epicgames.com/community/api/documentation/image/629a17b6-b9e9-4db6-afd6-74ceec7b2d66?resizing_type=fill&width=1920&height=335)

## 先决条件:启用开发人员模式

在设置自动完成之前，你需要让 **虚幻引擎Python插件** 生成所需的存根。要完成此操作，前往 **编辑器偏好设置（Editor Preferences）> 插件（Plugins）> Python**，选择 **开发人员模式（Developer Mode）**，之后重新启动编辑器。生成的存根文件将位于 `PROJECT_DIRECTORY/Intermediate/PythonStub`。

## PyCharm

打开 **设置（Settings）** 窗口，前往 **项目（Project）> Python 解译器（Python Interpreter）**，然后点击齿轮并选择 **全部显示（Show all）**。在 **Python解译器（Python Interpreters）** 窗口中，你可以点击 **路径（Paths）按钮** 并点击 **+**，添加存根文件的位置。

![添加Python存根文件路径](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76754505-5fff-46cb-a7ad-87b522e3a983/python-stub-path.png)

你还需要前往 **帮助（Help）> 编辑自定义属性（Edit Custom Properties）** 并添加以下内容来提高智能提示文件的大小上限：

```cpp
		idea.max.intellisense.filesize = 25000

```

重新启动PyCharm后，你就可以在虚幻引擎API中看到自动完成菜单中的函数。

## VSCode

前往 **设置（Settings）> 扩展（Extension）> Python** 并找到 **自动完成：更多路径（Auto Complete: Extra Paths）**。点击链接打开 **settings.json** 文件，将路径添加到 **python.autoComplete.extraPaths** 下的存根文件。

![Python自动完成路径设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2252339e-067e-4689-9314-42f6b3677a68/vscode-settings-path.png) ![在settings.json文件中设置路径](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07a029b6-0617-4544-9f5c-12aaf8132154/vscode-code-path.png)

重新启动 **Visual Studio Code（VSCode）** 之后，现在应该能够在UE API中看到自动完成菜单中的函数。

## 输入提示

从虚幻引擎5.1开始，Python插件可以生成一个桩代码用于输入提示，（更多关于输入提示的相关信息，参考[PEP 484](https://peps.python.org/pep-0484/))。 输入提示会出现在你的Python IDE自动完成菜单中。输入提示可以进行配置，在虚幻引擎菜单栏中点击 **编辑（Edit） > 编辑器偏好设置（Editor Preferences）**。这样会打开 **编辑器偏好设置（Editor Preferences）** 选项卡。找到 **插件（Plugins） > Python** 来查看可用的Python脚本插件用户设置。要使用输入提示，必须启用 **开发者模式（Developer Mode）**。下表展示了可用的输入提示模式和相关信息。

输入提示模式

描述

**自动完成（Auto-Completion）**

提示完全一致的参数并返回类型或者方法的类型。

**输入检查（Type Checker）**

添加全部可能的输入纠正。比如，它会提示你在输入一个 `unreal.Name` 的时候将其替换为一个Python字符串。这样会让自动完成菜单过于杂乱并且难以阅读，但是这个选项在IDE打开输入检查的时候会更有用。

**关闭（Off）**

完全关闭输入提示。

默认情况下， **输入提示模式（Type Hinting Mode）** 设置为 **自动完成（Auto-Completion）**。

请注意，这种提示并不完全准确。在一些情况下，生成桩代码时输入并不明确。在另外的一些情况下，C++反射API在参数或者方法的返回值可以为 `None` 的时候，不能提供足够的信息来准确给出提示

每次启动编辑器时都会重新生成存根文件。因此，你可以在将新函数提供给Python之后重新启动编辑器，或启用新插件来确保存根文件保持最新状态。

-   [python](https://dev.epicgames.com/community/search?query=python)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [scripting](https://dev.epicgames.com/community/search?query=scripting)
-   [autocomplete](https://dev.epicgames.com/community/search?query=autocomplete)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件:启用开发人员模式](/documentation/zh-cn/unreal-engine/setting-up-autocomplete-for-unreal-editor-python-scripting#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6:%E5%90%AF%E7%94%A8%E5%BC%80%E5%8F%91%E4%BA%BA%E5%91%98%E6%A8%A1%E5%BC%8F)
-   [PyCharm](/documentation/zh-cn/unreal-engine/setting-up-autocomplete-for-unreal-editor-python-scripting#pycharm)
-   [VSCode](/documentation/zh-cn/unreal-engine/setting-up-autocomplete-for-unreal-editor-python-scripting#vscode)
-   [输入提示](/documentation/zh-cn/unreal-engine/setting-up-autocomplete-for-unreal-editor-python-scripting#%E8%BE%93%E5%85%A5%E6%8F%90%E7%A4%BA)