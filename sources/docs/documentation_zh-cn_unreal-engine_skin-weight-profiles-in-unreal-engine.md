# 虚幻引擎中的蒙皮权重配置文件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:07:14.431Z

---

目录

![蒙皮权重配置文件](https://dev.epicgames.com/community/api/documentation/image/2640aee5-8f0a-4273-8fd1-7a3c02470f08?resizing_type=fill&width=1920&height=335)

使用 **蒙皮权重配置文件(SWP)**，您能够替换原始蒙皮权重 (SW) 中作为 **骨架网格体** 的一部分存储的子集。 虽然此系统的用例可能有所不同，但一个可能的用例是，在禁用任何动态角色部分的情况下或某些平台上提高视觉逼真度。

例如在下面的视频中，为了提高低端平台上的性能，穿外套的角色可能会禁用其动态部分。 当脚抬起时，会导致令人不快的穿模。使用蒙皮权重配置文件，您可以获得一个合适的方法来替代使用开销更大的动态，同时还可以减少穿模的现象。

通过下图，您还能看到使用动态布料，不使用蒙皮权重配置文件的复制姿势以及在有蒙皮权重配置文件时运行的区别。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0758f676-f3d0-4f8a-9273-7e7830c30912/cloth.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2482ca3f-d9ec-4a4b-bf08-85a43fb36c02/copypose.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/696991e1-6b0b-4356-b064-a668e698bf57/profile.gif)

布料

复制姿势

配置文件

## 设置

必须在 **编辑器** 中导入并设置蒙皮权重配置文件，以便能够在运行时使用它们。

### 导入配置文件

在 **骨架网格体编辑器** 中执行导入配置文件。您需要提供一个FBX文件，其中包含不同的蒙皮权重、配置文件名称以及一个可选的LOD索引。

1.  在 **骨架网格体** 的 **资产细节（Asset Details）** 面板中，单击 **蒙皮权重（Skin Weights）** 并选择 **导入蒙皮权重配置文件（Import Skin Weight Profile）** 下的 **+** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c46760f-ee0e-40e3-bf07-509f606c9be8/importskinweight_01.png)
2.  选择包含要导入的蒙皮权重数据的FBX文件并点击 **打开**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e81075f8-f6fc-4ebb-8c78-3e084f7e6d1a/importskinweight_02.png)
3.  输入 **配置文件名称（Profile Name）**（和可选的LOD索引），然后单击 **导入（Import）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85b4de53-0e17-4b9d-923e-b6ef764f4838/importskinweight_03.png)
    
    新的蒙皮权重配置文件将作为数组元素添加到 **资产细节（Asset Details）** 面板中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e288a27-988a-4931-a0c8-7ce034784360/importskinweight_05.png)

### 导入特定LOD数据

如果您有使用自定义LOD的 **骨架网格体** LOD，这意味着它们是单独导入的，而不是在引擎中生成的，则需要导入包含不同蒙皮权重的匹配文件。 这些文件也可以作为预存在的SWP的一部分导入，如下所示。

对于现有的SWP，选择要导入权重的LOD。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/089a2938-7269-45bc-831b-0d7dc370b886/skinweightlod_01.png)

选择包含蒙皮权重数据的FBX文件后，此文件将显示在配置文件的 **源文件（Source Files）** 部分下。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a1f3796-51c8-4e1e-ac8b-2f5cf6824137/skinweightlod_02.png)

### 为特定LOD导入配置文件

如果想要（或需要）在特定的LOD等级覆盖原始蒙皮权重，可以在导入过程中指定导入文件包含数据的LOD索引来实现这一点。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a6ee6d3-6c0a-4789-bfe0-3ce6bd87e384/importlodindex.png)

### 重新导入配置文件

如果更新了蒙皮权重配置文件的任何源数据，可以重新导入配置文件。如果存储的文件路径不再存在，将提示您输入新的文件位置。

为此，单击要重新导入的SWP的 **重新导入（Reimport）** 图标。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93e1916a-2749-4942-b471-3bd8481d8d6a/reimportswp.png)

如果您有多个LOD，可以从重新导入菜单中选择要重新导入SWP的LOD。

#### 利用不同的文件重新导入

在 **骨架网格体编辑器** 中，可以单击省略号（…）图标并选择一个新文件来从不同的文件导入蒙皮权重。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5fd25c48-4e1b-404d-9529-8282ff598925/reimportdifferentswp.png)

### 移除配置文件

您可以单击 **移除配置文件（Remove Profile）** 按钮，从而在 **骨架网格体编辑器** 中删除配置文件或配置文件中的LOD。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c153ce5b-ed34-4ee0-b50a-ebc81736c44d/removeprofile.png)

您可以从移除选项中删除配置文件中的整个SWP或LOD。

### 预览配置文件

您可以在视口中或在编辑器中运行会话期间预览特定SWP的不同蒙皮权重在[动画编辑器](/documentation/zh-cn/unreal-engine/animation-editors-in-unreal-engine)中的显示效果。

您可以为蒙皮网格体组件（或子类）设置特定的SWP，方法是在视口中选择它并选择要预览的所需配置文件。

1.  单击 **角色（Character）** 按钮，然后在 **动画（Animation）** 下的 **蒙皮权重配置文件（Skin Weight Profile）** 部分下， 选择所需的SWP。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3c82f64-7945-4b3f-aa7f-16d4d3df3373/previewskinweight_01.png)
    
    当选择要预览的SWP时，将在视口中显示调试信息。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f33c6bba-0088-473a-9c99-9868ffa3b781/previewskinweight_02.png)
    
    您还可以使用 **细节（Details）** 面板和 **蒙皮权重配置（Skin Weights Profile）** 设置在关卡编辑器主视口中预览蒙皮权重。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7413532d-a455-4d48-8c5b-7b6c247fddda/previewskinweight_04.png)
    

## 运行时蓝图公开的API

在运行时，您可以使用提供的（[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine) 公开的）API设置蒙皮网格体组件的SWP。

名称

蓝图节点

说明

**设置蒙皮权重配置文件（Set Skin Weight Profile）**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23768c6d-5777-432c-a08d-1ab9e097ae56/setskinweightprofile.png)

它将根据提供的名称设置特定的SWP（如果存在）。

**清除蒙皮权重配置文件（Clear Skin Weight Profile）**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85affa6a-aae4-432f-86f5-002da64e9e35/clearskinweightprofile.png)

它将清除任何之前设置的SWP。

**卸载蒙皮权重配置文件（Unload Skin Weight Profile）**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94446af3-731d-4c67-8ac0-c7e23cbaf810/unloadskinweightprofile.png)

它将强制卸载删除与所提供名称对应的蒙皮权重缓冲。

**获取当前蒙皮权重配置文件（Get Current Skin Weight Profile）**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40098119-e28e-4902-8032-d8101db029bf/getcurrentskinweight.png)

返回当前设置的SWP的名称，否则返回"无（None）"。

**正在使用蒙皮权重配置文件（Is Using Skin Weight Profile）**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef32dcb2-e7c1-4138-a8f4-af3fee81a431/isusingskinweightprofile.png)

返回是否设置了配置文件。

## 伸缩性

系统能够在运行时加载默认设置的SWP，可以使用两个路径来执行此操作：静态或动态路径。

### 静态路径

在骨架网格体数据序列化期间，系统使用 **静态** 路径检查是否设置了默认配置文件，如果设置了则加载它。 它将使用原始的蒙皮权重缓冲，并用默认配置文件的数据覆盖其数据。 这意味着，无论何时使用静态路径加载了默认SWP，之后不能再应用任何更改，原始数据将丢失，直到重新加载骨架网格体。

如果用户试图更改为动态路径，或试图手动设置SWP，系统会产生错误。

### 动态路径

与静态路径一样，**动态** 路径也是在序列化期间加载默认配置文件。但是，它将创建一个新的蒙皮权重缓冲，而不是覆盖原始的蒙皮权重缓冲。 当任何子系统请求缓冲时，它将返回覆盖缓冲，而不是原始缓冲。这一系统的优点是，它可以在运行时进行切换，这就是它有别于静态路径的地方。

### 默认配置文件

您可以在 **骨架网格体编辑器** 的**细节（Details）** 面板中指定一个默认SWP配置文件，也可以基于每个平台或LODIndex覆盖原始蒙皮权重。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/764e704a-bfd6-4719-bb19-4df22e6b202a/defaultprofiles_02.png)

在上图中，一个SWP被指定为 **桌面** 的覆盖，另一个SWP被设置用于 **移动**。

将SWP指定为默认配置文件时，将无法将任何其他配置文件指定为默认配置文件。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91c61c6a-6a82-4e19-abdc-5e1054ff0931/defaultprofiles_01.png)

指定了一个默认配置文件后，在 **来自LODIndex的默认配置文件（Default Profile from LODIndex）** 下，LOD索引集下面的任何LOD都将用配置文件中的蒙皮权重覆盖骨架网格体的蒙皮权重。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97154adb-0c95-4c02-b91b-a7cd19454633/defaultprofiles_03.png)

## 运行时的控制台命令

在运行时预览SWP系统时，可以使用以下控制台命令：

名称

说明

**a.SkinWeightProfile.LoadByDefaultMode**

启用/禁用运行时优化，从而用指定的默认配置文件覆盖原始蒙皮权重。可用于优化特定平台或设备的内存。

-   **0**：禁用静态。
-   **1**：启用静态。
-   **2**：禁用动态。
-   **3**：启用动态。

**a.SkinWeightProfile.DefaultLODOverride**

重载默认蒙皮权重配置文件中的LOD索引可以重载骨架网格体的默认蒙皮权重。

-   **\-1**：禁用。
-   **0**：LOD索引0。
-   **N**：LOD索引N（其中N表示要加载的LOD）。

**a.SkinWeightProfile.AllowedFromLOD**

在蒙皮权重配置文件中重载LOD索引后，可以将其应用。

-   **\-1**：禁用。
-   **0**：LOD索引0。
-   **N**：LOD索引N（其中N表示要加载的LOD）。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置](/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine#%E8%AE%BE%E7%BD%AE)
-   [导入配置文件](/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine#%E5%AF%BC%E5%85%A5%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
-   [导入特定LOD数据](/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine#%E5%AF%BC%E5%85%A5%E7%89%B9%E5%AE%9Alod%E6%95%B0%E6%8D%AE)
-   [为特定LOD导入配置文件](/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine#%E4%B8%BA%E7%89%B9%E5%AE%9Alod%E5%AF%BC%E5%85%A5%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
-   [重新导入配置文件](/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine#%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
-   [利用不同的文件重新导入](/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine#%E5%88%A9%E7%94%A8%E4%B8%8D%E5%90%8C%E7%9A%84%E6%96%87%E4%BB%B6%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5)
-   [移除配置文件](/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine#%E7%A7%BB%E9%99%A4%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
-   [预览配置文件](/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine#%E9%A2%84%E8%A7%88%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
-   [运行时蓝图公开的API](/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine#%E8%BF%90%E8%A1%8C%E6%97%B6%E8%93%9D%E5%9B%BE%E5%85%AC%E5%BC%80%E7%9A%84api)
-   [伸缩性](/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine#%E4%BC%B8%E7%BC%A9%E6%80%A7)
-   [静态路径](/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine#%E9%9D%99%E6%80%81%E8%B7%AF%E5%BE%84)
-   [动态路径](/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine#%E5%8A%A8%E6%80%81%E8%B7%AF%E5%BE%84)
-   [默认配置文件](/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine#%E9%BB%98%E8%AE%A4%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
-   [运行时的控制台命令](/documentation/zh-cn/unreal-engine/skin-weight-profiles-in-unreal-engine#%E8%BF%90%E8%A1%8C%E6%97%B6%E7%9A%84%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%91%BD%E4%BB%A4)