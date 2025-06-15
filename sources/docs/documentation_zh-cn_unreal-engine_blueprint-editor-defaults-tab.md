# 蓝图编辑器的默认值选项卡 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprint-editor-defaults-tab
> 
> 生成时间: 2025-06-14T19:37:28.364Z

---

目录

![蓝图编辑器的默认值选项卡](https://dev.epicgames.com/community/api/documentation/image/8c161361-0afd-46b3-8daf-1be3c84cc451?resizing_type=fill&width=1920&height=335)

**类默认值（Class Defaults）** 选项卡包含有关蓝图默认设置和属性的信息，以及有关蓝图包含的任何变量的信息。您可根据需要修改这些设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c5ee5d9-2c60-4d05-b06d-bae4e81dd290/bp_defaultstab.png)

**类默认值（Class Defaults）** 选项卡包含以下部分：

项目

说明

**默认（Default）**

如果在创建变量时没有指定非 **默认（Default）** 类别，则列出所有变量及其值。注意，您必须编译蓝图才能在 **类默认值（Class Defaults）** 选项卡上显示其变量。

**渲染（Rendering）**

包含有关如何（以及是否）在游戏中渲染基于蓝图的Actor的相关属性信息。

**复制（Replication）**

包含有关属性的信息，这些属性指示Actor在网络游戏中的行为，例如其网络优先级和与其他客户端的相关性。

**输入（Input）**

包含有关Actor如何根据此蓝图响应输入的信息。

**Actor**

包含基于此蓝图的有关Actor的信息，例如它们是否可以被损坏。注意，对于关卡蓝图，在这一部分中只有 **标签（Tags）** 属性是相关的。

如果您为变量创建自定义类别，那么在编译蓝图之后，**类默认值（Class Defaults）** 选项卡也将显示这些类别。

## 获取类默认值

您也可以通过使用 **获取类默认值（Get Class Defaults）** 蓝图节点在运行时访问类默认值（Class Defaults）中定义的属性。目标用例用于纯数据蓝图类类型和其他情况，在这些情况下，您可能不一定需要/想要创建实例来访问默认属性值。

**若要访问获取类默认值节点，请执行以下操作**

1.  在您的蓝图类或函数图表中 **右键单击**，并从上下文菜单中输入 **GetClassDefaults**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b84a9f2a-e671-440c-ba61-6ac279b418d2/getclassdefaults.png)
2.  通过类选择器下拉菜单选择要访问的类。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/614ed589-9d20-4d22-9fef-73f572ad7b00/selectclass.png)
    
    您也可以使用函数调用或变量产生的类类型，如下面的示例所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2323431f-2a71-4000-af04-f14b086a2b17/fromvariable.png)
3.  选择节点后，您可以通过 **详细信息（Details）** 面板显示/隐藏引脚。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0603a33c-331d-4a9f-a78b-2fbdd5f698fe/detailspanel.png)

**用法说明**

-   输出引脚（可访问的类属性）默认为显示，并且可以选择隐藏（类似于结构体断开/设置节点（Struct BreakSet Nodes）。
    -   默认情况下，父类属性当前是隐藏的，以减少输出引脚的数量。
    -   标记为\_高级视图（Advanced View）\_的属性默认情况下也隐藏在 **高级（Advanced）** 节点部分中。
-   对象参考属性默认值当前 **未** 公开。
    -   这意味着您目前无法访问蓝图类中组件模板或其他原型的默认属性值。
    -   这是因为我们目前没有在蓝图中强制使用只读引用类型，而且我们需要这样做以确保引用对象的内部状态无法被更改。\\
-   当前只公开 **蓝图可见（BlueprintVisible）** 或 **蓝图只读（BlueprintReadOnly）** 属性供默认访问。
    -   这与"法线"变量Get节点通过上下文菜单公开的行为相匹配。
-   目前，\_类（Class）\_输入下拉列表列示了 **所有** UOBject派生的类类型（包括引擎类）。
    -   未来，此列表可能会被限制为排除特定于引擎的类类型。
-   例如，如果您将一个 **获取类默认值（GetClassDefaults）** 节点添加到基于Actor的蓝图类中，则系统当前会默认将输入类引脚的值与放置时的当前蓝图类类型相匹配。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [获取类默认值](/documentation/zh-cn/unreal-engine/blueprint-editor-defaults-tab#%E8%8E%B7%E5%8F%96%E7%B1%BB%E9%BB%98%E8%AE%A4%E5%80%BC)