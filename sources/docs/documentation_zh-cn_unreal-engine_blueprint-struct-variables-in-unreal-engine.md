# 虚幻引擎中的结构体变量 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprint-struct-variables-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:44.019Z

---

目录

![蓝图中的结构体变量](https://dev.epicgames.com/community/api/documentation/image/2b6e5f87-b032-496c-bcdc-6bae2f588ea2?resizing_type=fill&width=1920&height=335)

结构体是相关联的不同数据类型的合集，便于进行访问。您可能已经在蓝图中用到了简单结构体， 因为矢量、旋转体和变形均为结构体变量。例如矢量结构体保存彼此关联的 X 浮点、Y 浮点和 Z 浮点变量。

结构体也可保存其数据。变形结构体保存 Actor 的位置（矢量结构体）、旋转（旋转体结构体）和大小（矢量结构体）数据。

## 创建结构体

将结构体变量添加到蓝图的方法和添加其他 [蓝图变量](/documentation/zh-cn/unreal-engine/blueprint-variables-in-unreal-engine) 的方法相同。简单结构体（如矢量、旋转体和变形）位列于变量类型下拉菜单的顶部。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de778616-62ab-4aa6-8eb1-d64f21f9b0ce/addsimplestruct.png)

此下拉菜单还有一个 **Structure** 部分，在此可找到蓝图当前可用的全部结构体变量。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27793164-5f30-4b33-94f8-48beb68f2d97/addcomplexstruct.png)

## 访问结构体信息

结构体的工作是将数据捆绑起来，因此您需要访问那些小块的信息。可通过几种不同方法执行：

### 分离结构体引脚

如需在节点上访问结构体中的单个变量，可使用分离结构体引脚（Split Struct Pin）。

如需分离结构体引脚，右键点击引脚并选择 **Split Struct Pin**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5373394b-bcfb-4d05-8010-7b469698bee2/splitstructpin.png)

这将把结构体中包含的所有变量公开为节点上的单独引脚，便于您输入数值或单独对其进行操作。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56f666f4-f87a-4eb8-a47c-b417c70c774d/locationxyz.png)

如需取消执行 **Split Struct Pin**，右键点击任意新引脚并选择 **Recombine Struct Pin**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59b34739-6d05-4ba7-a95f-40fc60f4cd3d/recombinestructpin.png)

可分离重组输入和输出结构体引脚。

## 拆分结构体

将结构体拆分为单独部分通常是在函数或宏中进行重复的游戏性逻辑。使用 **Break Struct** 节点可轻松复制贯穿蓝图图表的行为。 如需创建 **Break Struct** 节点，从结构体输出引脚连出引线，从快捷菜单选择 **Break \[Struct Name\]**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5dee0df-3674-4d7f-9154-6a7898043ed5/breakhitresult.png)

使用的结构体不同，**Break Struct** 节点的命名和输出引脚也有所不同；但总体而言，结构体将被拆分为单独的部分。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ad77dc9-9467-49d4-ba3f-b278e5f906a3/brokenhitresult.png)

举例而言，如需使用 **Hit Result** 的 **Impact Point**、**Hit Component** 和 **Hit Bone Name**， 可在函数中放置一个 **Break Hit Result** 节点，意味着只需将 **Hit Result** 作为函数输入进行输入，并将这三个数据块在函数中固定保持分离。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/385bd549-2f1f-49f6-bc51-f1d6f1c7d1d7/breakhitexample.png)

### 组成结构体

与将结构体筛分为单独数据块相似，也可使用正确的数据组成结构体。

如需创建 **Make Struct** 节点，从结构体输入引脚连出引线，从快捷菜单选择 **Make \[Struct Name\]**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0dbef858-9c00-4fcc-8f64-b6e7ad934113/makelinearmenu.png)

使用的结构体不同，**Make Struct** 节点的命名和输入引脚也有所不同；但总体而言，可通过其包含的所有数据组成结构体。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32f1b4e0-01b4-47bf-89df-7ea356bfd750/makelinearcolor.png)

### 设置结构体中的成员

有时结构体会包含大量数据，而需要修改的只是其中数个元素。对结构体中的成员进行设置即可精确地对数据进行修改， 无需将作为固定常量的所有数据引脚连接起来。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/646b159e-0913-43b8-ae60-ce3fdd947841/setmembersinstruct.png)

如需通过 **Set Members in Struct** 节点修改可用成员，先选择节点。**Details** 中的复选框可将成员作为节点上的引脚公开。 未公开的成员变量不会被 **Set Members in Struct** 节点修改。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/842abddb-13ab-4d2f-84e8-154c49697a77/setmembersdetails.png)

## 使用自定义结构体

除使用引擎提供的结构体外，还可设置自己的变量和数值创建自定义结构体。

要创建自定义结构体，在 **内容浏览器** 中点击右键，然后选择 **创建高级资源** 和 **蓝图** 下的 **结构体**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d852e0df-3d41-4fcd-9a86-d0d590ebdae1/structs.png "Structs.png")

定义结构体命名并打开后，即可在 **结构窗口** 中添加变量及其默认值。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23acf422-d483-43e4-aaea-4d4313eb30bb/structwindow.png "StructWindow.png")

之后可通过创建变量并将 **变量类型** 指定为结构体命名，将此结构体作为变量添加到其他蓝图中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f130ead1-5084-4ddd-81a1-568a73713219/creatingstructvar.png "CreatingStructVar.png")

编译后可查看添加到结构体中的所有可定义变量。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4366a455-7e23-4335-a7ab-97616f441d03/defaultvalues.png "DefaultValues.png")

### 拆分自定义结构体

将自定义结构体添加到图表时，可将其拖动并拆分，以访问其中变量。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6fae366-3f80-43fb-b523-77474ef7fbee/breakstruct.png "BreakStruct.png")

之后可将结构体中的单个变量连接到其他蓝图节点。另外也可在 **细节** 面板中点击 **隐藏未连接引脚** 按钮，隐藏未连接到其他蓝图节点的引脚。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ed9154b-cd13-45c8-b202-315ab9e91d96/hideunconnectedpins.png "HideUnconnectedPins.png")

将隐藏Break Struct节点上所有未连接的引脚。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7128890a-ece0-4867-a58d-908cf050a3ca/hiddenpins.png "HiddenPins.png")

启用所需变量旁的（作为引脚）属性，可在 **细节** 面板中重新启用显示引脚。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)
-   [arrays and structures](https://dev.epicgames.com/community/search?query=arrays%20and%20structures)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建结构体](/documentation/zh-cn/unreal-engine/blueprint-struct-variables-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%BB%93%E6%9E%84%E4%BD%93)
-   [访问结构体信息](/documentation/zh-cn/unreal-engine/blueprint-struct-variables-in-unreal-engine#%E8%AE%BF%E9%97%AE%E7%BB%93%E6%9E%84%E4%BD%93%E4%BF%A1%E6%81%AF)
-   [分离结构体引脚](/documentation/zh-cn/unreal-engine/blueprint-struct-variables-in-unreal-engine#%E5%88%86%E7%A6%BB%E7%BB%93%E6%9E%84%E4%BD%93%E5%BC%95%E8%84%9A)
-   [拆分结构体](/documentation/zh-cn/unreal-engine/blueprint-struct-variables-in-unreal-engine#%E6%8B%86%E5%88%86%E7%BB%93%E6%9E%84%E4%BD%93)
-   [组成结构体](/documentation/zh-cn/unreal-engine/blueprint-struct-variables-in-unreal-engine#%E7%BB%84%E6%88%90%E7%BB%93%E6%9E%84%E4%BD%93)
-   [设置结构体中的成员](/documentation/zh-cn/unreal-engine/blueprint-struct-variables-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E7%BB%93%E6%9E%84%E4%BD%93%E4%B8%AD%E7%9A%84%E6%88%90%E5%91%98)
-   [使用自定义结构体](/documentation/zh-cn/unreal-engine/blueprint-struct-variables-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%93%E6%9E%84%E4%BD%93)
-   [拆分自定义结构体](/documentation/zh-cn/unreal-engine/blueprint-struct-variables-in-unreal-engine#%E6%8B%86%E5%88%86%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%93%E6%9E%84%E4%BD%93)