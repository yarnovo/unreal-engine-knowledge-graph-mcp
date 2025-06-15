# 使用Python脚本化运行虚幻编辑器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python
> 
> 生成时间: 2025-06-14T20:35:55.961Z

---

目录

![使用Python脚本化运行虚幻编辑器](https://dev.epicgames.com/community/api/documentation/image/56e45d29-1cb2-492c-8caa-12a81e1586e7?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

本页面介绍如何开始在虚幻编辑器中使用Python。

## 为何使用Python？

近年来，Python事实上已成为用于制作流程和3D应用程序之间的互操作性的首选语言，在媒体和娱乐行业中尤其流行。这部分要归功于它能够支持各种各样的应用程序。制作流程的复杂程度持续急剧上升，涉及到的应用程序的数量也在不断增多，拥有通用的脚本语言可以简化创建和维护大型资源管理系统的过程。

抛开这些外部原因，或与其他应用程序一起使用的需求，如果你希望在虚幻编辑器中自动化工作流程，Python也是绝佳的选择。对于刚接触编程的人员来说，它相对比较容易入门，通过PySide等模块，它可以提供创建复杂而功能全面的用户界面的能力，而且它还向社区提供很多其他非常有用的免费模块，有助于降低你的工作难度。

通过在虚幻编辑器中使用Python，你可以：

-   构建可将虚幻编辑器与你在贵组织中使用的其他3D应用程序连接在一起的大型资源管理流程或工作流程。
-   在虚幻编辑器中使耗时的资源管理任务实现自动化，例如，为静态网格体生成细节级别（LOD）。
-   以程序化的方式将内容放置在关卡中。
-   从你自己在Python中创建的UI控制虚幻编辑器。

## 将项目设置为使用Python

虚幻编辑器中的Python支持由 **Python编辑器脚本插件（Python Editor Script Plugin）** 提供。需要先为当前项目启用该插件，然后才能在编辑器中运行Python脚本。

当前，必须为每个项目分别启用该插件。

要启用该插件：

1.  打开项目，然后从主菜单中选择 **编辑（Edit） > 插件（Plugins）**。
2.  在 **插件（Plugins）** 窗口中，转至 **脚本（Scripting）** 部分。  
    在右侧面板中找到 **Python编辑器脚本插件（Python Editor Script Plugin）**，然后选中其 **启用（Enabled）** 框。
    
    ![Enable the Python Editor Script Plugin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73673855-8668-4474-825f-170d1e419503/install-python-plugin.png "Enable the Python Editor Script Plugin")
    
    也需要启用 **编辑器脚本实用程序（Editor Scripting Utilities）** 插件，它为许多常用的编辑器任务提供简化的API。有关详细信息，请参阅[脚本化和自动化编辑器](https://docs.unrealengine.com/en-us/Editor/Scripting-and-Automating-the-Editor)。
    
3.  重启编辑器。

### Python 3.11.8

Python编辑器脚本插件（Python Editor Script Plugin）包含Python 3.11.8 的嵌入式版本。

这意味着无需在计算机上单独安装Python。

默认情况下虚幻编辑器使用Python 3.11.8，因为它是当前[VFX参考平台](https://www.vfxplatform.com/)的重要组成部分。  
如果需要更改Python版本，你可以在操作系统中将`UE_PYTHON_DIR`环境变量设置为指向要嵌入的安装程序，然后从[源代码重新编译虚幻引擎](/documentation/zh-cn/unreal-engine/building-unreal-engine-from-source)。

## 在虚幻编辑器中运行Python代码的不同方式

可以使用多种不同的方式在虚幻编辑器中运行Python脚本，每一种方式都针对略微不同的使用场景而设计。可以选择任何一种可满足你的需求的方式。

不同于蓝图，Python环境仅 **在虚幻编辑器** 中可用，当项目在虚幻引擎中以任何模式（包括"在编辑器中运行（Play In Editor）"、"独立游戏（Standalone Game）"、烘焙的可执行文件等）运行时不可用。这意味着可以在脚本化和自动化编辑器或构建资源制作流程时自由使用Python，但当前无法将其作为游戏性脚本语言使用。

### "输出日志（Output Log）"中的Python控制台

可以将虚幻编辑器的控制台输入栏切换为接受Python代码而非虚幻控制台命令。

![The Python console](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6abab7a1-3c9d-414c-80bf-2f4122957ba8/python-console-input.png "The Python console")

如上图所示，可在 **输出日志（Output Log）** 面板中执行此操作，或者在按`~`键调出控制台输入栏时执行此操作。

当控制台处于Python模式时：

-   可以在该控制台中输入多行Python代码，并让编辑器立即执行每一行代码，和在命令窗口中使用交互式Python控制台完全相同。这是逐行执行Python代码的唯一方式；以下列出的所有其他方法运行的都是指定的脚本文件。
-   通过使用 **Shift+Enter** 来分隔每一行或者通过粘贴从文本编辑器复制的多行代码块可以一次运行多行代码。
-   可以通过在控制台中输入文件名来执行Python脚本文件。如果你的Python脚本需要额外的命令行参数，请将它们添加在脚本名称后面。

内置的Python `print`函数的输出也将重定向到 **输出日志（Output Log）** 面板中。

### py控制台命令

在标准控制台中，可以使用`py`命令来将行的剩余部分作为Python代码来运行，效果和在上述的Python控制台中输入完全相同。

例如，该命令可运行指定的脚本文件：

![The py console command](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/245b6a41-2fca-4322-a1ce-dda1ac7f61be/python-py-command.png "The py console command")

启动编辑器时，我们建议不要使用`ExecCmd`命令行参数的值运行该命令。这可能会导致脚本在编辑器环境就绪前就运行——例如，在启动关卡完全加载完之前。请参阅下面的部分来了解更好的选项。

### "文件（File）"菜单

虚幻编辑器主窗口中的 **文件（File）** 菜单为你提供了运行Python脚本文件的新选项。

-   使用 **执行Python脚本（Execute Python Script）** 来浏览至计算机中你之前尚未运行过的新脚本文件。
-   使用 **最近使用的Python脚本（Recent Python scripts）** 列表来再次运行你之前已运行过的脚本。将从磁盘重新读取文件，因此，如果在此期间你更改了脚本，将会运行新版本的脚本。

![从文件菜单执行Python](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/685bd734-cf7c-4238-b237-b4367d02904b/python-file-menu-options.png "Execute Python from the File menu")

### 命令行

如果从命令行或从脚本中启动虚幻编辑器，可以在命令行参数中指定Python脚本文件。如果你的Python脚本需要额外的命令行参数，请将它们添加在脚本名称后面。

可以通过两种不同的方式从命令行中运行Python脚本。在两种方法中，编辑器都会在运行完Python脚本后立即关闭。

**选项1：完整编辑器** 在该方法中，会启动完整虚幻编辑器，打开指定的项目，加载默认的启动关卡，然后在一切都加载就绪后立即运行Python脚本。需要让脚本与项目中或关卡中加载用时可能较长的内容交互时，该方法非常有用。

在命令行中添加`ExecutePythonScript`参数，并将其值设置为要运行的Python脚本的路径和文件名。例如：

```cpp
    > UnrealEditor-Cmd.exe "C:\projects\MyProject.uproject" -ExecutePythonScript="c:\my_script.py"
```

上述方法要求你为项目启用"编辑器脚本实用程序（Editor Scripting Utilities）"插件。你必须先在命令行中指定的虚幻引擎引擎项目中启用Python脚本插件。

**选项2：命令行开关** 该方法执行起来非常快，甚至无需打开编辑器界面，就可以在没有头文件的模式下运行脚本。

在命令行中为 `UnrealEditor-Cmd.exe` 添加以下参数：`-run=pythonscript -script=<script_file_or_code>`，其中 `<script_file_or_code>` 可接收以下两种数值：

-   要运行的Python脚本的路径和文件名。
-   想要运行的Python声明和命令。如有必要，可以在字符串中使用 `\n` 来避免换行。

例如：

```cpp
    > UnrealEditor-Cmd.exe "C:\projects\MyProject.uproject" -run=pythonscript -script="c:\\my_script.py"
```

或：

```cpp
    > UnrealEditor-Cmd.exe "C:\projects\MyProject.uproject" -run=pythonscript -script="a=5 \nb=10 \nc=a+b \nf=open('D:\myfile.txt','w+') \nf.write(str(c)) \nf.close()"
```

该命令行工具不会自动加载关卡，因此在编写脚本时，请记得先添加以下行：

```cpp
	unreal.get_editor_subsystem(unreal.LevelEditorSubsystem).load_level("/Game/maps/UVlayoutTest.UVlayoutTest")
```

必须先在命令行中指定的虚幻引擎引擎项目中启用Python脚本插件。

### init\_unreal.py 文件

如果编辑器在任何已配置其使用的路径中检测到名称为`init_unreal.py`的脚本文件（请参阅下面的"虚幻编辑器中的Python路径"），编辑器会立即运行该脚本。

如果你参与了一个项目或插件的开发工作，且知道使用该内容的每个人都需要在每次编辑器启动时运行相同的初始化代码，该方法非常有效。可以将初始化代码放在具有该名称的脚本中，并将脚本放在该项目或插件的 **Content/Python** 文件夹中。

### 启动脚本

在"项目设置（Project Settings）"中，你可以指定任意数量的Python脚本以让其在每次你打开该项目时运行。编辑器会在默认启动关卡完全加载之后运行这些脚本。

选择 **编辑（Edit） > 项目设置...（Project Settings...）**。在 **插件（Plugins）** 列表下，选择 **Python**。然后，将脚本添加到 **启动脚本（Startup scripts）** 设置中：

![Python startup scripts](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6eac8edb-1004-4f97-8828-7946c2e02106/python-startup-scripts.png "Python startup scripts")

完成后请重启虚幻编辑器。下一次编辑器加载项目时，会运行新的启动脚本。

### 纯编辑器蓝图

Python脚本插件向蓝图可视化脚本公开新节点，你可以在评估蓝图图表期间使用该脚本运行Python代码片段或文件。

Python执行节点仅在纯编辑器蓝图类（例如编辑器工具控件和编辑器工具蓝图）中可用。请参阅[使用蓝图编写编辑器脚本](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints)。你无法在运行时可用的蓝图类（例如直接从 **Actor** 派生的类）中使用此方法。

你将在蓝图控制板的 **Python > 执行（Python > Execution）** 部分中找到以下节点。

 

 

 

![执行Python脚本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c90c3b52-cee0-4273-b17b-7e70239beb06/bp-execute-python-script.png "Execute Python Script")

**执行Python脚本**

执行你传入或键入到 **Python命令（Python Command）** 输入中的Python文本代码。建议从蓝图调用Python，代替在Python中新建BlueprintFunctionLibrary（BPFL）类型。

-   由于Python生成的类型（Python-generated types）是瞬时的，所以当保存或加载资产时，上述BPFL方法会引起问题，因此官方不再支持。
    
-   **执行Python脚本（Execute Python Script）** 可以添加自定义输入输出引脚，这些引脚在Python脚本中可作为变量访问，并可以通过节点属性添加。
    
    \-输入会在运行 **Python脚本** 前在节点上设置，可以在脚本中读取。 -输出会在运行 **Python脚本**后在节点上读取，并且可以在脚本中设置。
    
-   **执行Python脚本** 可以包含多行Python代码，可以通过 **Shift+Return** 输入新行。
    
-   如果Python代码执行成功，则 **Success?** 得输出为true，否则为false。如果为false，你可以在 **输出日志** 中找到错误。
    

此节点无法运行文件。它只能执行Python代码行。

![执行Python命令](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76819682-cb58-4dc5-935e-3b2d8c3d5eba/bp-execute-python-command.png "Execute Python Command")

**执行Python命令**

执行你传入或键入到 **Python脚本（Python Script）** 输入中的文字Python代码或文件。节点将尝试根据输入确定它是文字代码还是文件名。

\-若Python代码或文件成功执行，则 **返回值（Return Value）** 输出为true，否则为false。若为false，则你可以在 **输出日志（Output Log）** 中找到错误。

![执行Python高级命令](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c7cd637-af24-4a90-8cbd-a2c382830bfb/bp-execute-python-command-advanced.png "Execute Python Command Advanced")

**执行Python命令（高级）**

执行你传入或键入到 **Python脚本（Python Script）** 输入中的文字Python代码或文件。此节点类似于 **执行Python命令（Execute Python Command）**，但提供了一些其他输入和输出，它们在某些场景中可能大有帮助。

-   **执行模式** 表示你希望解译 **Python脚本（Python Script）** 输入的方式。
    -   **选择** 执行文件（Execute File）\*\*，以强制命令将输入视为文件名，并尝试查找并运行该文件。该脚本返回的任何值都将打印到日志中。
    -   选择 **执行脚本（Execute Script）**，以强制命令将输入视为文字Python代码，并按原样执行。该脚本返回的任何值都将打印到日志中。
    -   选择 **评估脚本（Evaluate Script）**，以强制命令将输入视为文字Python代码，按原样评估，并在 **命令结果（Command Result）** 输出中返回脚本生成的任何值。
-   如果你将文件名传递给 **Python脚本（Python Script）** 输入，则 **文件执行作用域（File Execution Scope）** 将确定该文件是在全局作用域（**公共（Public）**）中还是在沙盒作用域（**私有（Private）**）中执行。如果你希望文件中的代码能够访问已在Python环境中定义的变量、函数等，则需要选择 **公共（Public）**。但是，这样做也会使Python文件能够重新定义变量和函数。这可能会偶然地导致意外行为。因此，使用 **私有（Private）** 作用域可能会更安全。
    
-   **命令结果（Command Result）** 输出取决于 **执行模式（Execution Mode）**。当 **Python脚本（Python Script）** 输入被成功执行或评估，并且 **执行模式（Execution Mode）** 为 **评估脚本（Evaluate Script）** 时，此输出将返回脚本生成的值。当 **Python脚本（Python Script）** 输入成功执行或评估，并且 **执行模式（Execution Mode）** 为 **评估文件（Evaluate File）** 或 **执行脚本（Execute Script）** 时，此输出将返回 `None`。 当未能成功执行或评估 **Python脚本（Python Script）** 输入时，此输出将包含错误信息。
-   **日志输出（Log Output）** 提供执行输入脚本或文件期间写入Python日志的消息完整列表的访问权限。如果你需要查找脚本编写的特定消息，则可以循环访问此数组。
-   若Python代码成功执行，则 **返回值（Return Value）** 输出为true，否则为false。若为false，则你可以在引擎的 **输出日志（Output Log）** 中、**日志输出（Log Output）** 输出引脚中和 **命令结果（Command Result）** 中找到错误。

## 虚幻编辑器中的Python环境和路径

当你使用相对路径运行Python脚本时，或在脚本中使用 `import` 命令导入另一个脚本模块时，运行或导入的脚本可以位于Python环境的 `sys.path` 变量中列出的任意路径中。

虚幻编辑器会自动向该 `sys.path` 列表中添加几个路径：

-   项目文件夹下的 **Content/Python** 子文件夹。
-   主虚幻引擎安装文件夹中的 **Content/Python** 子文件夹。
-   每个启用的插件的文件夹下的 **Content/Python** 子文件夹。
-   用户目录中的 **Documents/UnrealEngine/Python** 文件夹。例如，在Windows 10中，该路径是`C:/Users/Username/Documents/UnrealEngine/Python`

也可以使用下述的任何一种方法将自己的路径添加到该列表中：

-   在"项目设置（Project Settings）中，选择 **编辑（Edit） > 项目设置...（Project Settings...）**。在 **插件（Plugins）** 列表下，选择 **Python**。然后，将路径添加到 **其他路径（Additional Paths）** 设置中。完成后请重启虚幻编辑器。
    
    ![Additional Python paths](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74cbab02-f891-4a74-98f4-bf56be8484e2/python-additional-paths.png "Additional Python paths")
-   将这些路径添加到操作系统中的 `UE_PYTHONPATH` （或者 `PYTHONPATH`，如果你禁用了编辑器隔离解释器环境选项）环境变量的值中，然后重新启动虚幻编辑器。
-   在Python脚本中或在Python控制台中直接将路径添加到 `sys.path` 列表中。

更多信息，请参考[Python sys.path文档](https://docs.python.org/3/library/sys.html#sys.path)

默认情况下，虚幻引擎的嵌入式Python解释器会在隔离模式下运行。你可以通过选择 **编辑 > 项目设置 > 插件 > Python > 隔离解释器环境来禁用隔离模式**。

更多信息，请参阅[Python命令行 -I选项文档](https://docs.python.org/3/using/cmdline.html)

![Isolate Interpreter Environment](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41c9c208-9103-4ca9-afed-522320c05e49/python-isolate-environment.png "Isolate Interpreter Environment")

无论选择何种隔离模式，**UE\_PYTHONPATH** 环境变量总是会被引擎解析，其内容会被添加到 `sys.path` 中。*UE\_PYTHONPATH* 的作用与 *PYTHONPATH* 变量相同，但它不应被任何第三方软件修改。

## 关于虚幻编辑器Python API

Python编辑器脚本插件（Python Editor Script Plugin）公开了各种各样的类和函数，你可以使用它们与虚幻编辑器、项目中的资源和关卡中的内容交互。该API包含在`unreal`模块中。要访问它，请在你在编辑器的Python环境中运行的任何Python脚本的开始位置导入该模块：

```cpp
    import unreal
```

`unreal`模块几乎会公开在编辑器环境中从C++公开给蓝图的一切。它不是预生成的，它可以自动反映在编辑器的蓝图中可用的一切。在虚幻编辑器中启用新的插件时，被插件公开给蓝图的一切在Python中也会变得可用。任何在项目中编写并公开给蓝图的C++代码也是如此。

Python API力求以对Python开发者尽可能友好的方式公开本地虚幻API。例如：

-   必要时简单数据类型可以透明地在Python和本机类型之间来回转换。  
    传入Python列表、集或字典时，会自动将它转换为虚幻数组、集或贴图。检索API函数返回的列表、集或字典时，实际上是在获取虚幻类的实例，但其API与基础Python列表、集或字典类型完全一致。
-   Python类保留与它们表示的本地类型相同的继承层级。例如，这意味着可以使用内置的Python函数`isinstance()`和`type()`来测试一个对象是否派生自某给定的类或与某给定的类匹配。
-   API尝试平衡在虚幻中用于C++及蓝图的命名规范和Python命名规范。Python API中的类和对象具有和在蓝图中相同的名称。这通常和其本机类型相同，省略了前缀（例如，`U`或`T`）。函数和属性名称自动以小写`snake_case`格式公开。例如，你通常会调用如`unreal.StaticMeshActor.get_actor_transform()`之类的函数。列举值名称自动以大写`SNAKE_CASE`格式公开。
-   所有公开的函数都可以接受有序参数和采用任意顺序的命名参数。例如，以下两个函数调用完全等效：
    
    ```cpp
        unreal.get_editor_subsystem(unreal.StaticMeshEditorSubsystem).join_static_mesh_actors(list_of_actors, my_options)
        unreal.get_editor_subsystem(unreal.StaticMeshEditorSubsystem).join_static_mesh_actors(join_options=my_options, actors_to_join=list_of_actors)
    ```
    

### API参考

有关虚幻Python API公开的所有类和函数的详细信息，请参阅位于此处的API参考：

[**虚幻编辑器Python API参考**](https://api.unrealengine.com/INT/PythonAPI/)

API参考并未详尽列出可能由插件公开给Python的一切。如果安装了该API参考中未包含的其他插件，并且需要查看其脚本功能公开给Python的方式，可以生成你自己的包含所需插件的文档的本地版本的API参考。有关指导说明，请参阅虚幻引擎安装文件夹中 *Engine\\Plugins\\Experimental\\PythonScriptPlugin\\SphinxDocs* 下的自述文件。

## 使用Python API的最佳实践

本部分将介绍使用Python API时需要谨记的重要事项。

### 处理资源

如果需要在项目中处理资源，请始终使用虚幻Python API中的函数来进行。绝不要使用Python中内置的文件管理模块来直接处理磁盘上的资源文件。例如，如果需要将资源移动到不同的文件夹中，不要使用Python函数，如`os.rename` or `shutil.move`。如果不遵守此规则，虚幻项目和资源中包含的内部内容引用可能会失效。

我们建议你使用编辑器脚本实用程序（Editor Scripting Utilities）插件提供的`unreal.EditorAssetLibrary` API，或虚幻Python API中内置的`unreal.AssetTools`类。

### 更改编辑器属性

可以使用Python来访问项目中的对象并以编程方式针对这些对象设置许多配置属性。例如，Python脚本可以访问当前关卡中的静态网格体Actor，并设置Actor是否可以被破坏或它们是否应该在游戏中被隐藏等属性。或者，可以检索其静态网格体组件并针对这些组件设置属性，例如其Lightmass设置，甚至它们链接到的静态网格体资源。

可以通过两种不同的方式将这些属性公开给Python：

-   具有BlueprintReadOnly或BlueprintReadWrite标志的项目将作为对象上的简单属性公开。  
    可以读取和修改这些属性，就像访问任何Python对象属性一样。
-   具有ViewAnywhere或EditAnywhere标志的项目将作为"编辑器属性"公开。  
    可以使用每个对象公开的一对特殊函数来对这些值进行读写：`set_editor_property()`和`get_editor_property()`。

在每个类的API参考中，你可以在紧挨着类描述的位置找到 **编辑器属性（Editor Properties）** 列表。这些是可以使用`set_editor_property()`和`get_editor_property()`函数设置和获取的所有值。每当需要设置或获取某个对象的配置属性时，请先查看该列表以了解所需属性是否已在其中列出。

-   需要读取同时作为对象属性和编辑器属性公开的值时，直接访问该属性的结果通常与调用`get_editor_property()`函数取得的结果相同。但是，`get_editor_property()`函数经常可以访问未直接在Python对象上公开的属性。
-   需要设置同时作为对象属性和编辑器属性公开的值时，大部分情况下应该使用`set_editor_property()`函数来设置该值，而非在对象上直接设置该值。在UI中调整属性时，编辑器通常会于编辑更改前和编辑更改后在后台执行额外操作。这些操作通常在某种程度上对你做出的选择作出反应，并且使编辑器UI与对象在游戏世界中的状态保持同步。如果直接在Python对象上修改这些属性，编辑器代码不会自动运行。另外，调用`set_editor_property()`来设置属性的状态时，也会触发该编辑前和编辑后代码，与在编辑器UI的 **细节（Details）** 面板中更改该设置时相同。

例如，媒体播放器对象具有 **打开时播放（Play on Open）** 设置：

![Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/350ad11d-f7e7-4c49-8081-44a7e0a13479/details.png "Details")

这会在`unreal.MediaPlayer`类中的`play_on_open`类成员中公开：

```cpp
    import unreal
    obj = unreal.MediaPlayer()
    # 直接修改属性可能产生
    # 与在编辑器UI中更改设置不同的结果。
    # 通常需要避免直接设置这些值，如下所示：
    obj.play_on_open = True
    # 通过这种方式访问属性将产生和
    # 在编辑器UI中更改该设置完全相同的结果：
    obj.set_editor_property("play_on_open", True)
    # 两种读取值的方式具有相同的效果。
    # 如果某个类通过两种方式公开某个属性，你可以使用其中任一方式：
    play_value = obj.play_on_open
    play_value = obj.get_editor_property("play_on_open")
```

### 尽可能使用虚幻类型

如果需要虚幻Python API提供的效用，如用于数学运算或操纵3D坐标的类，我们建议你使用虚幻实用程序而非使用你自己的实现。我们对虚幻版本进行了优化，以确保引擎环境的最佳性能。

例如，需要在3D空间中操纵坐标时，请使用`unreal.Vector`类：

```cpp
    import unreal
    v1 = unreal.Vector()
    v1.x = 10
    v2 = unreal.Vector(10, 20, 30)
    v3 = (v1 + v2) * 2
    print(v3)
```

### 日志记录和反馈

`unreal`对象通过与所有引擎及编辑器子系统所使用的相同的信息传递系统公开你可以在代码中用于发送日志、警告和错误消息的函数。无论何时你需要让脚本向用户发送消息，我们都建议你使用该标准化的日志框架。

-   将`unreal.log()`用于信息性消息。为了方便起见，我们也实现了Python `print()`函数以在内部通过`unreal.log()`传递。
-   使用`unreal.log_warning()`来使用户注意到可能存在的问题。
-   将`unreal.log_error()`用于记录阻碍脚本按照预期运行的严重问题。

你的消息将与其他子系统发送的消息一起显示在 **输出日志（Output Log）** 面板中。

![Python log messages](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8553bec-c170-4a84-9658-73a93c52b986/python-log-feedback.png "Python log messages")

### 支持撤销和重复

你的脚本可以充分利用虚幻编辑器中内置的撤销/重复系统。

你定义的每一个 *事务* 中都可以包含任意数量的Python操作。使用这些事务，你可以将大型操作或多个不同对象上的操作捆绑为撤销/重复历史记录中的单个条目。通常，如果你打算让脚本在多个对象上执行某特定更改，但是不希望每次更改都在撤销/重复历史记录中存在单独的条目，而是希望通过一个条目就可以撤销对所有对象所作的该更改。

要定义事务，请使用`unreal.ScopedEditorTransaction`范围。例如，如果你运行该代码：

```cpp
import unreal
obj = unreal.MediaPlayer()
with unreal.ScopedEditorTransaction("My Transaction Test") as trans:
    obj.set_editor_property("play_on_open", False)
    obj.set_editor_property("vertical_field_of_view", 80)
```

编辑器的 **撤销历史记录（Undo History）** 面板立即会按名称列出该事务：

![Undo History](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/292c7e7f-8ffb-458c-aa78-b5f8a95d5682/undohistory.png "Undo History")

作为一般规则，限定了范围的事务可以包含在编辑器UI中也无法撤销的任何操作。但是，并非每个编辑器操作都是不可撤销的。例如，你无法在编辑器UI中撤销模型导入，因此尝试导入`unreal.ScopedEditorTransaction`中的模型将无法按照期待的方式工作。

### 缓慢操作的进度对话

如果你的脚本需要在同一个操作中处理多个资源或Actor，可能需要较长的时间才能完成。但是，当虚幻编辑器运行Python脚本时，其UI处于被封锁状态中，不允许其他的用户交互。为了向用户提供大型任务的进度信息，从而避免使编辑器让用户产生冻结或挂起的错觉，可以使用`unreal.ScopedSlowTask`范围。

例如：

```cpp
    import unreal
    total_frames = 100
    text_label = "Working!"
    with unreal.ScopedSlowTask(total_frames, text_label) as slow_task:
        slow_task.make_dialog(True)               # 如果对话不可见，使其可见
        for i in range(total_frames):
            if slow_task.should_cancel():# 如果用户已在UI中按了"取消（Cancel）"则为True
                break
            slow_task.enter_progress_frame(1)     # 使进度前进一帧。
                                                # 如果希望，也可以更新本调用中的对话文本。
            ...# 现在在此处执行针对当前帧的工作！
```

![Progress bar for a Scoped Slow Task](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19cdc093-9a68-4842-915b-5cd81f344989/python-scoped-slow-task.png "Progress bar for a Scoped Slow Task")

-   [editor](https://dev.epicgames.com/community/search?query=editor)
-   [python](https://dev.epicgames.com/community/search?query=python)
-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [overview](https://dev.epicgames.com/community/search?query=overview)
-   [landing page](https://dev.epicgames.com/community/search?query=landing%20page)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [scripting](https://dev.epicgames.com/community/search?query=scripting)
-   [landing](https://dev.epicgames.com/community/search?query=landing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [为何使用Python？](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E4%B8%BA%E4%BD%95%E4%BD%BF%E7%94%A8python%EF%BC%9F)
-   [将项目设置为使用Python](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E5%B0%86%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE%E4%B8%BA%E4%BD%BF%E7%94%A8python)
-   [Python 3.11.8](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#python3118)
-   [在虚幻编辑器中运行Python代码的不同方式](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E5%9C%A8%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E8%BF%90%E8%A1%8Cpython%E4%BB%A3%E7%A0%81%E7%9A%84%E4%B8%8D%E5%90%8C%E6%96%B9%E5%BC%8F)
-   ["输出日志（Output Log）"中的Python控制台](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%22%E8%BE%93%E5%87%BA%E6%97%A5%E5%BF%97%EF%BC%88outputlog%EF%BC%89%22%E4%B8%AD%E7%9A%84python%E6%8E%A7%E5%88%B6%E5%8F%B0)
-   [py控制台命令](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#py%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%91%BD%E4%BB%A4)
-   ["文件（File）"菜单](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%22%E6%96%87%E4%BB%B6%EF%BC%88file%EF%BC%89%22%E8%8F%9C%E5%8D%95)
-   [命令行](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E5%91%BD%E4%BB%A4%E8%A1%8C)
-   [init\_unreal.py 文件](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#init-unrealpy%E6%96%87%E4%BB%B6)
-   [启动脚本](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E5%90%AF%E5%8A%A8%E8%84%9A%E6%9C%AC)
-   [纯编辑器蓝图](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E7%BA%AF%E7%BC%96%E8%BE%91%E5%99%A8%E8%93%9D%E5%9B%BE)
-   [虚幻编辑器中的Python环境和路径](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E7%9A%84python%E7%8E%AF%E5%A2%83%E5%92%8C%E8%B7%AF%E5%BE%84)
-   [关于虚幻编辑器Python API](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E5%85%B3%E4%BA%8E%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8pythonapi)
-   [API参考](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#api%E5%8F%82%E8%80%83)
-   [使用Python API的最佳实践](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E4%BD%BF%E7%94%A8pythonapi%E7%9A%84%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
-   [处理资源](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E5%A4%84%E7%90%86%E8%B5%84%E6%BA%90)
-   [更改编辑器属性](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E6%9B%B4%E6%94%B9%E7%BC%96%E8%BE%91%E5%99%A8%E5%B1%9E%E6%80%A7)
-   [尽可能使用虚幻类型](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E5%B0%BD%E5%8F%AF%E8%83%BD%E4%BD%BF%E7%94%A8%E8%99%9A%E5%B9%BB%E7%B1%BB%E5%9E%8B)
-   [日志记录和反馈](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E6%97%A5%E5%BF%97%E8%AE%B0%E5%BD%95%E5%92%8C%E5%8F%8D%E9%A6%88)
-   [支持撤销和重复](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E6%94%AF%E6%8C%81%E6%92%A4%E9%94%80%E5%92%8C%E9%87%8D%E5%A4%8D)
-   [缓慢操作的进度对话](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python#%E7%BC%93%E6%85%A2%E6%93%8D%E4%BD%9C%E7%9A%84%E8%BF%9B%E5%BA%A6%E5%AF%B9%E8%AF%9D)