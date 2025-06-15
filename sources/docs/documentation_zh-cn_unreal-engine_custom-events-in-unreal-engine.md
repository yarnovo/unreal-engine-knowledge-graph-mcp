# 虚幻引擎自定义事件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/custom-events-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:42.463Z

---

目录

![自定义事件](https://dev.epicgames.com/community/api/documentation/image/649e089c-8221-460b-945b-7ff127d853f4?resizing_type=fill&width=1920&height=335)

和 **Events（事件）** 一样， **Custom Events（自定义事件）** 具有一个用于执行的输出引脚和可选的输出数据引脚。但是，自定义事件是由用户创建的， 并且可以在一个图表中多次调用它们。它们定义了一个执行独立网络的入口点， 但是不同是通过代码调用它们来执行的。而是依赖于 **事件图表** 的其他部分， 通过使用 **Custom Event(自定义事件)** 调用或者通过 `CE` 或 `KE` 控制台命令 来显示地执行它们。

## 自定义事件

Custom Events（自定义事件）为您提供了一种创建您自己的事件的方法，您可以在您的蓝图序列 的任何地方处调用这些事件。当您正在把多个输出执行线连接到一个特定节点的输入执行引脚时， 使用自定义事件可以简化您图表的节点连线网络。您甚至可以在一个蓝图的图表中创建自定义事件，而在另一个图表中调用该事件。

创建自定义事件的简单流程:

-   创建并命名Custom Event（自定义事件）。
-   设置这个事件应该具有的任何输入参数及其默认值。
-   创建一个调用该自定义事件的特殊函数。
-   输入任何需要的输入参数。

### 创建自定义事件

1.  通过右击并从关联菜单中选择 **Add Custom Event（添加自定义事件）...** 来创建一个Custom Event(自定义事件)节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b9cecd9-009d-4904-a2ba-915d5f78706a/add_custom_event.png)
2.  给这个新事件赋予一个名称。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2310f222-3c83-4197-a09c-8752690a79c6/name_custom_event.png)
3.  在您的新事件的 **Details（详细信息）** 面板中，您可以设置当在服务器上调用该事件并添加输入参数时，是否将该事件复制到所有客户端上。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ccfe6c77-f758-435b-82d5-b4be41dc182d/new_details_custom_event.png)

要想添加输入参数：

1.  点击 **详细信息** 面板的 **Inputs（输入）** 部分的 **New(新建)** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3bf5b162-fe7e-4c0a-9b19-481390964204/new_input_custom_event.png)
2.  命名该新输入并使用下拉菜单设置其类型。在这个示例中，有一个String(字符串型)的输入参数 **MyStringParam** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cda14455-87fc-40c9-81e7-a2fb69369f4a/named_new_variable.png)
3.  您也可以通过展开参数项来设置一个默认值。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6ac16c2-4863-437d-82e3-ac528abeb04c/set_default_parameter.png)

要想改变节点边缘上的这个参数的引脚的位置，请使用展开的 **详细信息** 面板项的向下和向上箭头。

现在，和其他事件或执行节点一样，您可以把其他节点附加到您的自定义事件的输出执行引脚上，这样当触发了您的自定义事件时将会开始执行那个节点网络。 这个自定义事件向屏幕输出了一个字符串。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d305d725-4525-49e2-a75c-358db4672417/small_custom_event.png)

### 调用自定义事件

您已经创了自定义事件及其相关的节点网络，但是和常规的Events（事件）不同，没有触发自定义事件的预制条件。要想调用您的自定义事件，请 **右击** 并从关联菜单中选择 **Call Function（调用函数） > \[自定义事件名称\]** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ee0fe4c-323a-4503-8678-32c5815ef9ca/call_ce_context_menu.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/953a7925-676b-4ddd-982e-38c88166c7cb/call_custom_event_node.png)

\_自定义事件上设置的任何输入参数在新的节点中都将呈现为输入数据引脚，以便它们可以传入到自定义事件中。您可以根据需要使用数据连线把任何数据引脚连接到变量或其他数据引脚上。

和常规的Events(事件)不同，常规事件在每个图表中每种事件类型仅能调用一次；但是您可以在图表中多次调用一个自定义事件。这样，自定义事件就可以把多个执行输出分支连入到 一个单独的执行输入上，而不需要直接连线。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2755be18-e41d-451b-b5d6-b4e4b8ef71b3/connected_custom_event.png)

在这个示例中，如果 **IsSuccess** 布尔变量为false，那么将打印一个错误信息。这个图表的功能，和在序列中的 **Branch** 节点后面连接 **Print String** 节点的功能一样， 但是它有个附加功能是图表中的其他部分可以使用 **Print String** 节点，且图表中两个网络部分的彼此位置不必太近。

### 自定义事件疑难解答

如果在Custom Event（自定义事件）节点上看到 **警告!** 条，提示 **"不能找到名称为\[CustomEvent\]的函数"** 信息，请 **编译** 您的蓝图。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7514f550-4d78-4aa5-a65c-05877eee93da/custom_event_warning.png)

如果您修改了您的自定义事件上的输入参数的数量，那么当您编译蓝图时，调用该自定义事件的所有节点都会出现错误。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ad55683-5029-46a9-8eb1-47a626c5272b/parameter_change_error.png)

您必须刷新调用您的自定义事件的所有节点。要想刷新一个单独节点或者一组选中的节点，请右击这些节点并选择 **Refresh Nodes（刷新节点）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf554b86-52ff-4c75-9c44-1e80fda7a63e/refresh_nodes.png)

要想刷新您的图表中的所有节点，请在 **File(文件)** 菜单中 选择 **Refresh All Nodes（刷新所有节点）** 项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a656bb19-84e1-45c1-8b6c-05ee2f91a1c6/refresh_all_nodes.png)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)
-   [execution flow](https://dev.epicgames.com/community/search?query=execution%20flow)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [自定义事件](/documentation/zh-cn/unreal-engine/custom-events-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6)
-   [创建自定义事件](/documentation/zh-cn/unreal-engine/custom-events-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6)
-   [调用自定义事件](/documentation/zh-cn/unreal-engine/custom-events-in-unreal-engine#%E8%B0%83%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6)
-   [自定义事件疑难解答](/documentation/zh-cn/unreal-engine/custom-events-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6%E7%96%91%E9%9A%BE%E8%A7%A3%E7%AD%94)