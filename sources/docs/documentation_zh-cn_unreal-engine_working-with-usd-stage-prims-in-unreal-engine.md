# 使用虚幻引擎中的USD舞台图元 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/working-with-usd-stage-prims-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:07:01.760Z

---

目录

![使用USD舞台图元](https://dev.epicgames.com/community/api/documentation/image/983505ae-be36-48d7-9cbb-14f98f7c2760?resizing_type=fill&width=1920&height=335)

**USD舞台（USD Stage）** 是可能具有子层、引用和分层文件的层的复杂组合。 虚幻引擎中的 **USD舞台编辑器（USD Stage Editor）** 允许你使用和编辑USD。

本指南探讨了在虚幻引擎中处理USD文件时可以使用的操作和工作流程。

有关USD舞台和术语的更多信息，请参阅[Pixar的通用场景描述术语和概念](https://graphics.pixar.com/usd/release/glossary.html#usd术语表-舞台)。

另请参阅[USD舞台编辑器快速入门](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine)，开始使用虚幻引擎中的USD舞台编辑器。

## 复制图元

**复制（Duplicate）** 卷展栏列出了多个用于复制图元的选项。 USD是一种复杂的格式，并非在所有情况下都明显具有"复制（duplication）"的含义。 因此，USD舞台编辑器提供了多种复制方法，这些方法使用略有不同的方式，可用于应对不同的情况。

![Right-click context menu Duplicate menu rollout.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec7300f2-5079-423c-8197-bd71964b2f2b/5_1-usd-stage-editor-duplicate-options.png)

-   **展平复合图元（Flatten Composed Prim）** 整合了图元规格，并用它们制作新的图元，"展平"所有元素。 如果复合图元在某个规格上具有覆盖，则该覆盖是这个规格在复制的图元上唯一可见的选项。
-   **单层规格（Single Layer Specs）** 仅在当前编辑目标上复制图元的规格。 此选项可用于复制给定层上图元的规格，而不复制更强层上定义的覆盖。 仅在当前编辑目标上具有要复制的图元的规格时，此选项才可用。
-   **所有本地层规格（All Local Layer Specs）** 复制USD舞台所有本地层中的每个图元规格。

在USD舞台编辑器中保存USD文件后，可以使用文本编辑器检查对该文件所做的更改。

## 剪切/复制/粘贴图元

**剪切（Cut）** 和 **复制（Copy）** 操作始终将图元的展平表示形式添加到剪贴板舞台（类似于使用 **展平复合图元（Flatten Composed Prim）** 方法复制图元）。 **粘贴（Paste）** 操作始终将剪贴板舞台中的图元作为当前选定图元的子项粘贴到当前编辑目标上。

**剪贴板舞台（Clipboard Stage）** 是USD舞台编辑器在后台保留的一个独立舞台，与当前打开的任何舞台均无关。 因此，可以使用这些操作在打开的各个不同USD舞台之间剪切、复制和粘贴图元。

## 添加引用

你可以在[USD舞台编辑器上为任何图元](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#3%E5%90%91usd%E8%88%9E%E5%8F%B0actor%E6%B7%BB%E5%8A%A0%E6%96%B0%E5%9B%BE%E5%85%83)提供一个引用，该引用可以指向当前加载的USD舞台上的另一个图元或者计算机上的另一个USD文件。 使用右键点击上下文菜单中的 **添加引用（Add Reference）** 选项打开 **添加引用（Add Reference）** 对话框，然后可以在其中指定希望选定图元如何引用另一个图元。

![USD Add Reference window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fee25e8-9ba3-4eda-82ac-378032758d44/5_1-usd-stage-editor-add-reference-window.png)

属性

描述

**内部引用（Internal Reference）**

启用后，引用将以此舞台上的图元为目标。

**目标文件（Target File）**

选择要用作引用的USD文件。

**使用默认图元（Use Default Prim）**

使用目标层的默认图元作为引用的图元。

**目标图元路径（Target Prim Path）**

禁用 **使用默认图元（Use Default Prim）** 后，应选择目标舞台的特定图元作为引用的图元。

高级（Advanced）

 

**时间码偏移（Time Code Offset）**

将一个偏移值应用于引用的图元的时间轴采样属性。 例如，将值设置为10会将引用的动画的开始延迟10个时间码。

**时间码缩放（Time Code Scale）**

这是时间比例因子，应用于引用的图元的时间轴采样属性。

要为当前加载的USD舞台上的图元添加引用，请启用 **内部引用（Internal Reference）** 并禁用 **使用默认图元（Use Default Prim）**。 这种情况下将禁用 **目标文件（Target File）** 选项并启用 **目标图元路径（Target Prim Path）** 选项，然后可以在其中指定要使用的图元。

要引用另一个USD层，请将 **内部引用（Internal Reference）** 保留为禁用状态，以便可以将其指定为 **目标文件（Target File）**。 你可以选择禁用 **使用默认图元（Use Default Prim）** 以便指定一个图元在目标层中用作引用。 保留 **使用默认图元（Use Default Prim）** 为启用状态将使用目标层的默认图元作为引用的图元。

使用右键点击上下文菜单中的 **清除引用（Clear References）** 可以删除此图元使用的所有引用。

## 添加负载

[USD舞台编辑器上的任何图元](/documentation/zh-cn/unreal-engine/usd-stage-editor-quick-start-in-unreal-engine#3%E5%90%91usd%E8%88%9E%E5%8F%B0actor%E6%B7%BB%E5%8A%A0%E6%96%B0%E5%9B%BE%E5%85%83)都可以包含[负载](https://graphics.pixar.com/usd/release/glossary.html#usd术语表-负载)。 与引用类似，可以通过右键点击图元并选择 **添加负载（Add Payload）** 来添加新负载，在此期间可以指定负载详细信息。

![USD Add Payload window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78e60c61-337c-4245-a9fc-551e6f975ac0/5_1-usd-stage-editor-add-payload-window.png)

属性

描述

**内部引用（Internal Reference）**

启用后，负载将以此舞台上的图元为目标。

**目标文件（Target File）**

选择要用作负载的USD文件。

**使用默认图元（Use Default Prim）**

使用目标层的默认图元作为负载图元。

**目标图元路径（Target Prim Path）**

禁用 **使用默认图元（Use Default Prim）** 后，应选择目标层的特定图元作为负载图元。

高级（Advanced）

 

**时间码偏移（Time Code Offset）**

将一个偏移值应用于负载图元的时间轴采样属性。 例如，将值设置为10会将负载动画的开始延迟10个时间码。

**时间码缩放（Time Code Scale）**

这是时间比例因子，应用于负载图元的时间采样属性。

要为当前加载的USD舞台上的图元添加负载，请启用 **内部引用（Internal Reference）** 并禁用 **使用默认图元（Use Default Prim）**。 这种情况下将禁用 **目标文件（Target File）** 选项并启用 **目标图元路径（Target Prim Path）** 选项，然后可以在其中指定要使用的图元。

要使用另一个USD层作为负载，请将 **内部引用（Internal Reference）** 保留为禁用状态，以便可以指定 **目标文件（Target File）**。 你可以选择禁用 **使用默认图元（Use Default Prim）** 以便指定一个图元在目标层中用作负载。 保留 **使用默认图元（Use Default Prim）** 为启用状态将使用目标层的默认图元作为负载图元。

使用右键点击上下文菜单中的 **清除负载（Clear Payloads）** 可以删除此图元使用的所有负载。

## 隔离层

在需要查看特定分支树的层而不是整个USD舞台时，**隔离（Isolate）** 选项很有用。 在后台，当选择要隔离的特定层时，你会看到这个层及其所有子层。

可以通过在 **层（Layers）** 面板中右键点击要隔离的层来访问此选项。

![Right-click option to isolate an Edit Target in the USD Stage Editor.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1957bee1-ae60-4339-9332-bc4fb9156d61/5_1-usd-stage-editor-isolate-edit-target-option.png)

隔离一个层将仅显示这个层及其子层。 所有其他层均灰显，表示它们存在于外部舞台上，但不影响隔离的舞台。

为了表示舞台中的某个层已隔离，"USD舞台（USD Stage）"窗口会在窗口右上角显示 **隔离模式（Isolated Mode）**。 点击此文字将退出隔离模式并恢复到完全复合的舞台。

![A button indicating an Edit Target is isolated currently.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/083f454c-ad39-456f-9601-f950f41aa4f6/5_1-usd-stage-editor-isolated-mod-indicator.png)

或者，也可以通过右键点击某个层并选择 **停止隔离（Stop Isolating）** 来停止隔离这个层。

-   [usd](https://dev.epicgames.com/community/search?query=usd)
-   [universal scene description](https://dev.epicgames.com/community/search?query=universal%20scene%20description)
-   [import/export](https://dev.epicgames.com/community/search?query=import%2Fexport)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [复制图元](/documentation/zh-cn/unreal-engine/working-with-usd-stage-prims-in-unreal-engine#%E5%A4%8D%E5%88%B6%E5%9B%BE%E5%85%83)
-   [剪切/复制/粘贴图元](/documentation/zh-cn/unreal-engine/working-with-usd-stage-prims-in-unreal-engine#%E5%89%AA%E5%88%87/%E5%A4%8D%E5%88%B6/%E7%B2%98%E8%B4%B4%E5%9B%BE%E5%85%83)
-   [添加引用](/documentation/zh-cn/unreal-engine/working-with-usd-stage-prims-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%BC%95%E7%94%A8)
-   [添加负载](/documentation/zh-cn/unreal-engine/working-with-usd-stage-prims-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E8%B4%9F%E8%BD%BD)
-   [隔离层](/documentation/zh-cn/unreal-engine/working-with-usd-stage-prims-in-unreal-engine#%E9%9A%94%E7%A6%BB%E5%B1%82)