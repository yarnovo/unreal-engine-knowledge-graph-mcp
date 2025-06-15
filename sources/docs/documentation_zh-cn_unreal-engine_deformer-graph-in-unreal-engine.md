# 虚幻引擎中的变形器图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:06:44.019Z

---

目录

![变形器图](https://dev.epicgames.com/community/api/documentation/image/fbc541e2-4df8-4e9d-aca4-6a8fc2726983?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

你可以使用 **虚幻引擎** 的 **变形器图（Deformer Graph）** 插件创建和编辑变形器图资产，从而为虚幻引擎中的所有蒙皮网格体执行和自定义网格体变形。你可以使用变形图表创建和修改逻辑来调整网格体几何形状，从而微调网格体变形行为，或者在虚幻引擎内创建全新的变形。变形器图最常用于微调角色的皮肤和织物在运动中的逼真行为，或者用于一次性动画，因为使用变形逻辑比手工制作动画更容易创建这类动画。

![变形器图演示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ee53d7f-c8a4-4df3-a865-34ef1febac49/dgdemo.gif)

网格体变形器形式多样，比如[变形目标](/documentation/zh-cn/unreal-engine/morph-target-previewer)、[布料模拟](/documentation/zh-cn/unreal-engine/cloth-simulation-in-unreal-engine)，甚至还有在[机器学习（ML）变形器](/documentation/zh-cn/unreal-engine/how-to-use-the-machine-learning-deformer-in-unreal-engine)等外部DCC（数字内容创建）软件中创建的生成模型。

本文档简要介绍虚幻引擎中的变形器图系统。

## 如何使用变形器图

你可以在此处了解如何在虚幻引擎中设置并开始使用变形器图。

#### 先决条件

-   启用 **变形器图（Deformer Graph）** [插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。在 **菜单栏** 中找到 **编辑（Edit）> 插件（Plugins）** 并找到 **动画（Animation）** 分段中的 **变形器图（Deformer Graph）** ，或使用 **搜索栏** 完成此操作。启用插件并重启编辑器。

![启用变形器图插件并重新启动编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71f57407-08d5-45c1-995c-6a282516c0b4/plugin.png)

-   你的项目包含蒙皮网格体，它可能是[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)角色，也可能是[静态网格体](/documentation/zh-cn/unreal-engine/static-meshes)对象。

## 创建变形器图资产

通过在 **内容浏览器（Content Browser）** 中 **右键点击** 并找到 **动画（Animation） > 变形器（Deformers） > 变形器图（Deformer Graph）** 来创建 **变形器图（Deformer Graph）** 资产。

![要创建新资产，请在内容浏览器中右键点击，找到动画变形器并选择变形器图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/719184a5-7293-42b2-b0af-240a016268c3/contentbrowser.png)

如果在视口中选择了网格体，则你还可以在 **细节（Details）** 面板中找到 **网格体变形器（Mesh Deformer）** 属性， **启用**网格体变形器属性，然后从选择菜单中选择 **变形器图（Deformer Graph）** 选项来创建新的变形器图（Deformer Graph）。

![在角色细节面板中启用网格体变形器属性，然后从下拉选择菜单中选择创建新的变形器图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78b0bb3a-c65a-4d10-968b-c3b5fa0b4536/createdeformergraph.png)

以下默认变形器图资产与变形器图插件一起打包，供你在为角色和对象创建自定义网格体变形器逻辑时使用或自定义。在内容浏览器（Content Browser）中，找到 **引擎（Engine）> 插件（PlugIns）> 变形器图内容（Deformer Graph Content）> 变形器（Deformers）** ，即可访问这些变形器图。

![在引擎文件夹的插件变形器图内容变形器下找到随变形器图插件打包的默认变形器图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b831e4a1-c2ff-4d34-adf0-a5921107fabb/defaultgraphs.png)

资产

说明

**DG\_LinearBlendSkin**

此图表应用标准线性混合蒙皮管线。系统支持所有蒙皮特性使用此图表。

**DG\_LinearBlendSkin\_Morph**

此图表应用标准线性混合蒙皮和[变形目标](/documentation/zh-cn/unreal-engine/morph-target-previewer)管线。系统支持这些管线的所有特性使用此图表。

**DG\_LinearBlendSkin\_Morph\_Cloth**

此图表应用标准线性混合蒙皮、[变形目标](/documentation/zh-cn/unreal-engine/morph-target-previewer)和[布料模拟（](/documentation/zh-cn/unreal-engine/cloth-simulation-in-unreal-engine)管线。系统支持这些管线的所有特性使用此图表。此图表是 **DG\_LinearBlendSkin和DG\_LinearBlendSkin\_Morph** 变形器图的超集，可用来替代这些图表而不会造成性能损失。较简单的变形器图资产 **DG\_LinearBlendSkin** 和 **DG\_LinearBlendSkin\_Morph** 单独存在，供想要自行构建实现的人参考。

**DG\_LinearBlendSkin\_Morph\_Cloth\_RecomputeNormals**

此图表应用标准线性混合蒙皮、[变形目标](/documentation/zh-cn/unreal-engine/morph-target-previewer)和[布料模拟](/documentation/zh-cn/unreal-engine/cloth-simulation-in-unreal-engine)管线。它还应用额外的通道来重新计算顶点法线。它可以使用重新计算切线（Recompute Tangents）设置来模拟GPU皮肤缓存（GPU Skin Cache）的现有行为。

在网格体的细节面板中选择变形器图时，如果你没有看到 **Engine** 文件夹，或者没有看到默认变形器图作为可用选项，请确保你在 **内容浏览器（Content Browser）** 的 **视图设置（View Settings）** 中启用了 **插件内容（Plugin Content）** 。

![在内容浏览器设置菜单中启用显示插件内容，以在内容中显示插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05f74be4-50fa-4a15-8cef-eb2f29a69ce7/plugincontent.png)

有关创建和使用变形器图资产的更多信息，请参阅[如何创建自定义变形器图](/documentation/zh-cn/unreal-engine/how-to-create-a-custom-deformer-graph-in-unreal-engine)指南。

## 打开变形器图

启用 **变形器图插件（Deformer Graph Plugin）** 后，你可以 **双击** **内容浏览器（Content Browser）** 中的变形器图资产，或在游戏对象 **细节（Details）** 面板的 **网格体变形器（Mesh Deformer）** 属性中双击，打开 **变形器图编辑器（Deformer Graph Editor）** 。

![双击细节面板中的角色变形器图资产以打开变形器图编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/055b4ac1-d80c-4a67-8498-2c4c95988cb4/opendeformergraph.png)

### 变形器图界面

以下参考所适用的变形器图界面，在你创建和编辑自定义变形器图资产时，可用于在虚幻引擎中将网格体变形。

![具有代表编辑器独特面板和功能的高亮显示框的变形器图编辑器界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98e4d34c-6be7-460e-8d7f-f9168a0015ce/interface.png)

界面

说明

1\. **编译（Compile）**

编译变形器图。

2\. [视口（Viewport）](/documentation/zh-cn/unreal-engine/editor-viewports-in-unreal-engine)

查看变形器图逻辑对网格体的影响。

3\. [控制板（Palette）](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E6%8E%A7%E5%88%B6%E6%9D%BF%E9%9D%A2%E6%9D%BF)

包含唯一变形器图蓝图节点的工具箱。

4\. [资源管理器（Explorer）](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E5%8F%98%E5%BD%A2%E5%99%A8%E5%9B%BE%E5%AD%90%E5%9B%BE%E8%A1%A8)

添加和管理变形器图[子图表](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E5%8F%98%E5%BD%A2%E5%99%A8%E5%9B%BE%E5%AD%90%E5%9B%BE%E8%A1%A8)、[组件绑定](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E7%BB%84%E4%BB%B6%E7%BB%91%E5%AE%9A)、[变量](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E5%8F%98%E9%87%8F)和[资源](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E8%B5%84%E6%BA%90)。

5\. [图表编辑器（Graph Editor）](/documentation/zh-cn/unreal-engine/user-interface-reference-for-the-blueprints-visual-scripting-editor-in-unreal-engine)

与其他 **蓝图编辑器（Blueprint Editor）** 类似，使用一系列唯一[变形器图节点](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E6%8E%A7%E5%88%B6%E6%9D%BF%E7%BB%84%E4%BB%B6%E5%8F%82%E8%80%83)管理和编辑变形器图逻辑。

6\. **编译输出（Compile Output）**

在变形器图编译成功和失败后，查看编译器日志和信息。

7\. [细节（Details）](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF)

访问特定于组件和节点的信息和属性。

8\. [着色器文本编辑器（Shader Text Editor）](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E7%9D%80%E8%89%B2%E5%99%A8%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8)

用于使用 **高级着色器语言**（**HLSL**）修改 **自定义计算内核（Custom Compute Kernel）** 节点编程的文本编辑器。

### 控制板面板

你可以使用变形器图的 **控制板（Palette）** ，拖放自定义变形器图节点和内核，供你在创建网格体变形逻辑时引用或使用。

![控制板面板演示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caa11ddc-4c53-4cdf-ba59-a6a2c2f6e86a/palettedemo.gif)

有关控制板面板中可用组件的完整列表和说明，请参阅本文件底部的[控制板组件参考](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E6%8E%A7%E5%88%B6%E6%9D%BF%E7%BB%84%E4%BB%B6%E5%8F%82%E8%80%83)列表。

### 变形器图子图表

在变形器图内，你可以使用3种类型的 **子图表（Subgraph）** 。

![从变形器图资源管理器面板的子图表菜单中选择图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fc11e5a-3858-4c48-a438-a7b3ae847ab9/subgraphs.png)

默认情况下，变形器图只包含每帧执行一次的 **更新图表（Update Graph）** 。

你可以选择性地添加 **设置图表（SetUp Graph）** ，以在所属对象 **初始化** 时执行。

此外，你还可以创建和使用 **触发图表（Trigger Graph）** ，并且可以应蓝图或C++代码的请求执行这些图表。收到执行触发图表的请求时，系统会将它们排队并执行，其顺序位于初始设置图表（若存在） **之后** ，且位于每帧更新图表 **之前** 。

你可以为变形器图添加子图表，方法是点击资源管理器（Explorer）面板的 **图表（Graphs）** 分段旁边的 **添加（Add）**（**+**），或者点击资源管理器（Explorer）面板顶部的绿色（**+**）**新增（Add New）** 按钮。点击任一项后，你可以从下拉菜单中选择创建 **设置图表（Setup Graph）** 或 **触发图表（Trigger Graph）** 。

![使用资源管理器面板中的绿色新增按钮或加号按钮创建图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f898758a-40e0-47a1-b7c4-503da35e064c/createnewsubgraph.png)

变形器图中无法添加额外的更新图表，并且只能添加一个设置图表。你可以根据项目需要添加多个触发图表。然后，可以重命名触发图表，方法是在 **资源管理器（Explorer）** 面板中 **双击** 所需触发图表的名称，或者选择触发图表并按 **F2** 键。

### 组件绑定

组件绑定（Component Bindings）是对包含在所属对象中的可用组件的引用。

![从变形器图资源管理器面板的组件绑定菜单中选择组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd4edfcb-0de3-4470-95e0-6a816c2724d0/componentbindings.png)

你可以为变形器图创建额外的组件绑定，方法是点击 **资源管理器（Explorer）面板** 的 **组件绑定（Component Bindings）** 分段旁边的 **添加（Add）**（**+**），或者点击 **资源管理器（Explorer）** 面板顶部的绿色（**+**）**新增（Add New）** 按钮。

![使用资源管理器面板中的绿色新增按钮或加号按钮创建组件绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/971e55b1-44bb-442b-a47a-f60977de3786/createcomponentbinding.png)

下面是一些组件绑定的示例，你可以在创建变形器图逻辑时使用这些绑定：

组件绑定

说明

**骨骼网格体组件（Skeletal Mesh Component）**

添加对所属对象的 **骨骼网格体（Skeletal Mesh）** 组件的引用。可以使用骨骼网格体引用许多属性和组件，如 **网格体顶点（Mesh Vertices）** 、 **三角形（Triangles）** 和 **场景时间（Scene Time）** 。

**场景组件（Scene Component）**

**场景（Scene）** 组件会从变形器图占据的 **场景** 、角色或主题中提取数据和信息。游戏时间以及其他有用信息可从场景组件中提取。

场景信息也可以从骨骼网格体或蒙皮网格体组件绑定中收集，但在特定情况下，使用单独的场景组件绑定可能对控制或组织有帮助。

**蒙皮网格体组件（Skinned Mesh Component）**

蒙皮网格体组件可以代表任何类型的蒙皮网格体。此组件可以是附加到角色的辅助对象，也可以代表没有骨骼的角色或对象。

### 变量

在 **资源管理器（Explorer）选项卡** 的 **变量（Variables）** 分段，你可以创建和管理外部可见变量，供你在变形器图中调整和控制逻辑时引用。

![从变形器图资源管理器面板的变量菜单中选择变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4643e3b3-ec6c-4683-b849-b87c240010f5/variables.png)

你可以创建变量，方法是点击 **资源管理器（Explorer）** 面板的 **变量（Variables）** 分段旁边的 **添加（Add）**（**+**），或者点击 **资源管理器（Explorer）** 面板顶部的绿色（**+**）**新增（Add New）** 按钮。

![使用资源管理器面板中的绿色新增按钮或加号按钮创建变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/186dea89-4c8b-4f0e-b6f0-745ff245f634/createnewvariable.png)

创建新变量后，你可以在资源管理器（Explorer）面板中选择该变量，在细节面板中打开它的属性。

![在图表中选择变量以在细节面板中查看其属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caf69ff1-60f7-40bc-961a-d7bcdb029034/variabledetails.png)

在细节面板中，你可以使用 **变量名称（Variable Name）** 属性命名变量，并定义其 **数据类型（Data Type）** 。可为变量分配任何数据类型或组件，以供与其他变形器图节点一起使用。

### 资源

与[变量](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E5%8F%98%E9%87%8F)类似，你可以在资源管理器（Explorer）面板的 **资源（Resources）** 分段中创建和管理 **着色器资源（Shader Resources）** 。资源是对特定值和组件的内部引用，变形器图内的其他节点可以通过引用这些值和组件来执行网格体变形功能。

![从变形器图资源管理器面板的资源菜单中选择资源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fcfbcb8-5456-4eef-bb43-4d97740d6cf7/resources.png)

你可以创建资源，方法是点击 **资源管理器（Explorer）** 面板的 **资源（Resources）** 分段旁边的 **添加（Add）**（**+**），或者点击 **资源管理器（Explorer）** 面板顶部的绿色（**+**）**新增（Add New）** 按钮。

![使用资源管理器面板中的绿色新增按钮或加号按钮创建资源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5b61b7a-aa74-4663-ad84-8dd575b13ad6/createnewvariable.png)

创建资源后，你可以在资源管理器（Explorer）选项卡中选择它，在细节面板中打开其属性。

![在资源管理器面板中选择资源以在细节面板中打开其属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/757440b9-27aa-44da-b24c-6308a2ba5b71/resourcesdetails.png)

你可以调整以下资源参数：

属性

说明

**资源名称（Resource Name）**

在提供的字段中为资源命名。

**数据类型（Data Type）**

设置资源可以存储的数据类型。

**组件绑定（Component Binding）**

设置资源绑定到的组件绑定。

**数据域（Data Domain）**

设置资源的数据域。

在第一个下拉菜单中，你可以选择维度。你可以从以下维度中进行选择：

-   **三角形（Triangle）** ：选择所有三角形。
-   **顶点（Vertex）** ：选择所有顶点。
-   **顶点（Vertex）> 骨骼（Bone）** ：按骨骼选择顶点组。
-   **顶点（Vertex）> 索引0（Index0）** ：选择索引0（Index 0）内的顶点组。
-   **顶点（Vertex）> UV通道（UVChannel）** ：按UV通道选择顶点组。
-   **表达式…（Expression…）** ：使用提供的字段输入自定义数据类型。

当维度设置为三角形（Triangle）或顶点（Vertex）时，你可以额外指定每个条目应存储多少个数据值。从 **x1** 开始，对于每个条目的一个数据点，你还可以从 **x3** 、 **x4** 或 **x8** 中选择。

数据点不仅在维度上必须匹配，而且在每个条目存在的数据值数量上也必须匹配。如果你在变形器图逻辑中遇到输入/输出引脚不兼容或资源无响应的情况，请确保你的 **数据域（Data Domain）** 属性设置为兼容值。

与变量不同，你可以在变形器图内 **设置** 以及 **引用** 资源值和组件。创建资源后，你可以将资源 **拖放** 到变形器图编辑器中，并从 **获取（Get）**实例（用于引用资源中包含的现有值）、**设置（Set）** 实例（用于设置或定义供以后使用的资源）或 **获取/设置（Get/Set）** 实例（可用于对存储值执行设置和引用两种操作）中进行选择。

![在添加到图表时从上下文菜单中选择获取/设置/获取设置资源实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77932f4c-924d-4025-b3c2-890a82692e29/getsetresourcedemo.gif)

在创建 **获取/设置资源（Get/Set Resource）** 、 **获取资源（Get Resource）** 或 **设置资源（Set Resource）** 节点后，你可以修改资源实例与 **资源缓冲区** 的交互方式。你可以定义这一行为，方法是在 **图表（Graph）** 中选择节点，并在节点的 **细节（Details）** 面板中设置 **写入类型（Write Type）** 属性。

![在图表中选择资源以在细节面板中调整其写入类型属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b19add1-fde2-4de8-a479-fd9127dbcc37/writetype.png)

你可以从以下写入类型属性选项中选择：

选项

说明

**写入（Write）**

将值写入资源缓冲区。

**写入原子性添加（Write Atomic Add）**

用图表值覆盖资源缓冲区中的值。

**写入原子性最小值（Write Atomic Min）**

用图表 **最小** 值覆盖资源缓冲区中的值。

**写入原子性最大值（Write Atomic Max）**

用图表 **最大** 值覆盖资源缓冲区中的值。

### 细节面板

**变形器图细节（Deformer Graph Details）** 面板将显示有关每个变形器图节点的信息和设置。要查看节点的属性，在图表编辑器中选择该节点后，细节面板即会显示其属性。

![在图表中选择内核以在细节面板中打开其属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c518687-9a16-4545-b864-a4147ef4b2ee/kerneldetails.png)

在选择内核节点（Kernel Node）时，可以添加和修改 **输入（Input）** 和 **输出（Output）** 绑定。

为了达到功能效果，输入和输出绑定必须与它们所连接的数据类型精确匹配。请确保所有内核输入（Kernel Input）或内核输出（Kernel Output）绑定都设置为与所需的连接值或提取值匹配。

### 着色器文本编辑器

你可以使用 **着色器文本编辑器（Shader Text Editor）** 对 **自定义计算内核（Custom Compute Kernel）** 节点编程， 以控制特定的网格体变形行为。

![在创建内核后，你可以在着色器文本面板中编辑和引用其hlsl编程](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7d566a8-68a7-4296-9bff-420e36bcd2ee/kernelshadertext.png)

着色器文本编辑器使用 **高级着色器语言**（HLSL）对内核进行编程。

变形器图中每添加一个自定义计算内核，着色器文本编辑器面板中就会打开一个新的选项卡。

[在自定义内核选项卡之间切换](/documentation/404)(convert:false)

在每个自定义计算内核（Custom Compute Kernel）选项卡内，你都可以访问节点的 **声明（Declarations）** ，它们是只读信息，表示图表编辑器对节点进行的修改，如添加的输入和输出绑定。

[着色器文本编辑器的声明部分显示内核的hlsl声明](/documentation/404)(convert:false)

你还可以访问节点的 **着色器文本（Shader Text）** ，可以在其中编写自定义HLSL代码，用来创建网格体变形。

[着色器文本编辑器的着色器文本部分显示内核的自定义hlsl编程](/documentation/404)(convert:false)

有关HLSL编码标准的更多信息，请参阅[Microsoft高级着色器语言参考文档和编程指南](https://learn.microsoft.com/zh-cn/windows/win32/direct3dhlsl/dx-graphics-hlsl)。

有关使用着色器文本编辑器的工作流程示例，请参阅[如何创建变形器图](/documentation/zh-cn/unreal-engine/how-to-create-a-custom-deformer-graph-in-unreal-engine)指南。

## 控制板组件参考

在本小节，你可以参考变形器图**控制板（Palette）** 中提供的可用组件及其功能说明的列表。

![控制板面板是可以让你访问自定义变形器图节点的地方](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/338d9bca-3040-4bc9-ae75-3652d42551ae/palette.png)

控制板组件

节点

说明

**动画属性（Animation Attributes）**

[alt text](/documentation/404)

添加对[动画属性（Animation Attributes）](/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine)的引用，你可以利用它们来触发或激活变形器逻辑。

**布料（Cloth）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca5875b8-62ff-42d1-b0af-d429cf782de6/cloth.png)

添加并附加对与骨骼网格体关联的[布料模拟](/documentation/404)模型的引用。更多信息请参阅[布料模拟模型](/documentation/zh-cn/unreal-engine/cloth-simulation-in-unreal-engine)。

**连接（Connectivity）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b1f73b3-7816-494b-9705-3bdede99a109/connectivity.png)

将蒙皮网格体组件连接到现有顶点或顶点数据集。

**调试绘制（Debug Draw）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/289500a5-3599-4269-aa1c-cd87b204d8c6/debug.png)

使用连接的蒙皮网格体组件绑定在视口中绘制网格体的调试视图。调试数据以 **字符串** 形式提取，可使用图表中的节点 **输出** 引脚进行访问。

细节面板中的选项包括：

-   **强制启用（Force Enable）** ：强制在视口中进行调试绘制。
-   **线条数量上限（Max Line count）** ：设置调试绘制可以显示的顶点之间的最大线条数量。
-   **三角形数量上限（Max triangle Count）** ：设置调试绘制可以显示的几何体三角形的最大数量。
-   **角色数量上限（Max Character Count）** ：设置调试绘制可以显示的最大角色数量。
-   **字体大小（Font Size）** ：设置调试绘制覆层的字体大小。

**变形目标（Morph Target）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e10f23d-e23f-47b4-abdf-2099af989dac/morphtarget.png)

通过使用蒙皮网格体组件，[Morph Target](/documentation/zh-cn/unreal-engine/morph-target-previewer)节点可以将 **增量位置（Delta** Position） **和** 增量法线（Delta Normal） **隔离为** 向量3（Vector 3）\*\* 值。

**场景数据（Scene Data）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdc38894-00a8-4e93-ba42-224610a70248/scenedata.png)

提取可用来控制或触发变形器图逻辑的场景数据。你可以创建 **场景组件绑定**，也可以使用 **骨骼网格体组件绑定** 来引用骨骼网格体在运行时占用的当前场景。

**骨架（Skeleton）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66d7f868-11c5-4725-a414-b0a63182828f/skeleton.png)

从骨骼网格体组件绑定中提取骨架数据。可用的输出包括：

-   **骨骼数量（Num Bones）** ：输出值是 *\*无符号整型（UInt）* 值，代表蒙皮网格体骨架中的骨骼数量。
-   **骨骼矩阵（Bone Matrix）** ：输出值是3x4的骨骼位置矩阵。
-   **骨骼权重（Bone Weight）** ：输出值是骨骼的 **Alpha** 权重，以浮点形式表示。
-   **加权骨骼矩阵（Weighted Bone Matrix）** ：输出值是3x4的加权骨骼位置矩阵。

**蒙皮网格体（Skinned Mesh）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e856cab6-7df2-4cfc-93c6-3dbe8ba8179e/skinnedmesh.png)

从 **蒙皮网格体（Skinned Mesh）** 组件绑定中提取网格体数据。可用的输出包括：

-   **顶点数量（Num Vertices）** ：输出网格体内含的顶点数量，以整型值表示。
-   **位置（Position）** ：输出顶点的位置，以 **向量3（Vector 3）** 值表示。
-   **切线X（Tangent X）** ：输出 **X** 轴上 **切线** ，以 **向量2（Vector 2）** 值表示。
-   **切线Z（Tangent Z）** ：输出 **Z** 轴上 **切线** ，以 **向量2（Vector 2）** 值表示。
-   **UV通道数（Num UV Channels）** ：输出网格体占有的UV通道数量，以整型值表示。
-   **UV** ：输出按设置的UV通道分类的网格体顶点，以向量2（Vector 2）值表示。
-   **颜色（Color）** ：输出网格体颜色的 **R** 、 **G** 、 **B** 和 **W** 值，以 **向量4（Vector 4）** 值表示。
-   **三角形数量（Num Triangles）** ：输出组成网格体的几何体的三角形数量，以整型值表示。 **索引缓冲区（Index Buffer）** ：输出网格体的索引缓冲区坐标并将其与网格体的顶点坐标隔离，以数组表示。

**自定义计算内核（Custom Compute Kernel）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b20d2e1c-0aa0-4e9b-a075-5a4815c5af88/kernel.png)

创建 **自定义计算内核（Custom Compute Kernel）** ，可以使用 **高级着色器语言**（**HLSL**）对其编程，以执行自定义网格体变形。有关创建和使用自定义计算内核的更多信息，请参阅[如何创建自定义变形器图](/documentation/zh-cn/unreal-engine/how-to-create-a-custom-deformer-graph-in-unreal-engine)指南。

**执行蒙皮网格体（Execute Skinned Mesh）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2339974c-8798-4298-ba8c-f0ff60b9316c/execute.png)

你可以使用 **蒙皮网格体（Skinned Mesh）** 组件作为输入，执行供在 **内核（Kernel）** 中使用的网格体数据线程。在细节面板中，你可以将函数的 **域（Domain）** 设置为每个 **顶点** 用一个线程或每个 **三角形** 用一个线程运行内核。

**Execute Skinned Mesh** 节点将输出 **IntVector 3** 值，该值可与 **自定义计算内核（Custom Compute Kernel）** 连接并一起使用。要想仅隔离 **X** 、 **Y** 或 **Z** 轴上的输出数据，请使用输出引脚旁的 **三角形** 展开 **输出** 引脚。每个轴都有一个单独的 **整型（Integer）** 输出引脚。

**编写蒙皮网格体（Write Skinned Mesh）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1e6b9bd-23b7-4991-bf49-8057f2c4e6ba/writemesh.png)

**Write Skinned Mesh** 输出节点是变形器图的最后操作，用于写入对网格体的 **顶点** 或 **三角形** 执行的修改。

**蒙皮网格体（Skinned Mesh）** 输入引脚将连接到初始网格体 **组件绑定** 。然后，可以使用向量3（Vector 3）**位置（Position）** 输入引脚，以及向量4（Vector 4）**切线X（Tangent X）** 、 **切线Z（Tangent Z）** 和 **颜色（Color）** 输入引脚，将新的网格体属性写入网格体。

**布尔常量（Bool Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/687de434-6600-4496-ac2f-f347255580b5/bool.png)

设置常量 **布尔** 值。节点可以接受布尔变量值，你也可以使用 **值（Value）** 属性在图表中或在节点的 **细节（Details）** 面板中手动切换布尔值。

**组件常量（Component Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ac4421e-cc4e-49e9-a500-069a403b754d/component.png)

使用组件绑定设置 **组件常量** 。可以在图表中设置组件常量，或者使用节点 **细节（Details）** 面板中的 **值（Value）** 属性手动定义组件常量。

**浮点常量（Float Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f55878b-fdcc-4227-ace4-0fe3d8032e8f/float.png)

设置常量 **浮点** 值。节点可以接受来自其他组件的 **浮点** 值，你也可以在图表中或在节点的 **细节（Details）** 面板中手动设置值。

**整型常量（Int Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57777549-c8fe-438a-9a6e-3faebdbc97a3/int.png)

设置常量 **有符号整型** 值。节点可以接受来自其他组件的 **零** 和 **正** 整型值，你也可以在图表中或在节点的 **细节（Details）** 面板中手动设置值。

**无符号整型常量（UInt Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd5f4efd-b671-4a5a-8500-7a9b4b3cd296/uint.png)

设置常量 **无符号整型** 值。节点可以接受来自其他组件的 **任何** 整型值，你也可以在图表中或在节点的 **细节（Details）** 面板中手动设置值。

**双精度常量（Double Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0120e806-b526-4afc-a518-8c1a83b4e08b/double.png)

设置常量 **双精度** 值。节点可以接受来自其他组件的任何双精度值，你也可以在图表中或在节点的 **细节（Details）** 面板中手动设置值。

**整型向量2常量（Int Vector 2 Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/760d62d1-2074-4a77-8f03-e785c8d7b1be/intvec2.png)

在 **X** 和 **Y** 轴上设置常量 **向量2（Vector 2）** 值。节点可以接受来自其他组件的任何向量2值，你也可以使用三角形或在节点的 **细节（Details）** 面板中展开输入引脚，手动在图表中设置 **X** 和 **Y** 整型值。你还可以使用输出引脚附近的三角形，将向量2值拆分成 **X** 和 **Y** 的整型值。

**整型向量3常量（Int Vector 3 Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/182a36fe-be79-4054-aadd-1d4405273b7d/intvec3.png)

在 **X** 、 **Y** 和 **Z** 轴上设置常量 **向量3（Vector 3）** 值。节点可以接受来自其他组件的任何向量3值，你也可以使用三角形或在节点的 **细节（Details）** 面板中展开输入引脚，手动在图表中设置 **X** 、 **Y** 和 **Z** 整型值。你还可以使用输出引脚附近的三角形，将向量3值拆分成 **X** 、 **Y** 和 **Z** 值的整型值。

**整型向量4常量（Int Vector 4 Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1dfdd15c-0fec-45c3-9721-ea374944a9ba/intvec4.png)

在 **X** 、 **Y** 、 **Z** 和 **W** 轴上设置常量 **向量4（Vector 4）** 值。节点可以接受来自其他组件的任何向量4值，你也可以使用三角形或在节点的 **细节（Details）** 面板中展开输入引脚，手动在图表中设置 **X** 、 **Y** 、 **Z** 和 **W** 整型值。你还可以使用输出引脚附近的三角形，将向量4值拆分成 **X** 、 **Y** 、 **Z** 和 **W** 值的整型值。

**线性颜色常量（Linear Color Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3f502c8-3374-43fe-b35c-add242b4b54d/color.png)

为存储为 **浮点4** 值的 **R** 、 **G** 、 **B** 和 **A** 值设置常量 **颜色（Color）** 值。节点可以接受来自其他组件的任何浮点4或颜色（Color）值，你也可以使用三角形或在节点的 **细节（Details）** 面板中展开输入引脚，手动在图表中设置 **R** 、 **G** 、 **B** 和 **A** 浮点值。你还可以使用输出引脚附近的三角形，将颜色（Color）值拆分成单独的 **R** 、 **G** 、 **B** 和 **A** 值的浮点值。

**四元常量（Quat Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fc11c06-7c13-45db-b8b4-c5ac9e7216cc/quat.png)

在 **X** 、 **Y** 、 **Z** 和 **W** 轴上设置常量 **四元（Quat）** 或 **浮点4** 值。节点可以接受来自其他组件的任何四元（Quat）或浮点4值，你也可以使用三角形或在节点的 **细节（Details）** 面板中展开输入引脚，手动在图表中设置 **X** 、 **Y** 、 **Z** 和 **W** 浮点值。你还可以使用输出引脚附近的三角形，将四元（Quat）值拆分成单独的 **X** 、 **Y** 、 **Z** 和 **W** 值各自的浮点值。

**旋转体常量（Rotator Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/940e8599-30be-48ee-b050-ce3de2ed5a2e/rotator.png)

在 **X**（**俯仰\[Pitch\]**）、 **Y**（**偏转\[Yaw\]**）和 **Z**（**滚动\[Roll\]**）轴上设置常量 **旋转体（Rotator）** 或 **浮点3** 值。节点可以接受来自其他组件的任何旋转体（Rotator）或浮点3值，你也可以使用三角形或在节点的 **细节（Details）** 面板中展开输入引脚，手动在图表中设置 **俯仰（Pitch）** 、 **偏转（Yaw）** 和 **滚动（Roll）** 值。你还可以使用输出引脚附近的三角形，将旋转体（Rotator）值拆分成 **俯仰（Pitch）** 、 **偏转（Yaw）** 和 **滚动（Roll）** 的浮点值。

**变换常量（Transforms Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2595ea9d-9715-4d91-a789-f758e3f2ba1b/double.png)

设置常量 **变换** 值。节点可以接受来自其他组件的任何变换值，你也可以在节点的 **细节（Details）** 面板中手动设置 **X** 、 **Y** 和 **Z** 轴上的位置（Location）、旋转（Rotation）和缩放（Scale）值。

**向量2常量（ Vector 2 Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd73540d-97a2-49ab-86e2-3fe47dac5d43/floatvector2.png)

在 **X** 、 **Y** 和 **Z** 轴上设置常量 **向量2（Vector 2）** 值。节点可以接受来自其他组件的任何向量2值，你也可以使用三角形或在节点的 **细节（Details）** 面板中展开输入引脚，手动在图表中设置 **X** 、 **Y** 和 **Z** 浮点值。你还可以使用输出引脚附近的三角形，将向量2值拆分成 **X** 、 **Y** 和 **Z** 轴的浮点值。

**向量3常量（ Vector 3 Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7252708e-5f6d-41a6-892f-605505b9eb25/floatvector3.png)

在 **X** 、 **Y** 和 **Z** 轴上设置常量 **向量2（Vector 2）** 值。节点可以接受来自其他组件的任何向量3值，你也可以使用三角形或在节点的 **细节（Details）** 面板中展开输入引脚，手动在图表中设置 **X** 、 **Y** 和 **Z** 浮点值。你还可以使用输出引脚附近的三角形，将向量3值拆分成 **X** 、 **Y** 和 **Z** 轴的浮点值。

**向量4常量（ Vector 4 Constant）**

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a19a27ac-a8c1-4c02-a789-0d87ddd34291/floatvector4.png)

在 **X** 、 **Y** 、 **Z** 和 **W** 轴上设置常量 **向量4（Vector 4）** 值。节点可以接受来自其他组件的任何向量4值，你也可以使用三角形或在节点的细节面板中展开输入引脚，手动在图表中设置 **X** 、 **Y** 、 **Z** 和 **W** 浮点值。你还可以使用输出引脚附近的三角形，将向量4值拆分成 **X** 、 **Y** 、 **Z** 和 **W** 轴的浮点值。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [deformers](https://dev.epicgames.com/community/search?query=deformers)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [如何使用变形器图](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E5%8F%98%E5%BD%A2%E5%99%A8%E5%9B%BE)
-   [先决条件](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建变形器图资产](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8F%98%E5%BD%A2%E5%99%A8%E5%9B%BE%E8%B5%84%E4%BA%A7)
-   [打开变形器图](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E6%89%93%E5%BC%80%E5%8F%98%E5%BD%A2%E5%99%A8%E5%9B%BE)
-   [变形器图界面](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E5%8F%98%E5%BD%A2%E5%99%A8%E5%9B%BE%E7%95%8C%E9%9D%A2)
-   [控制板面板](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E6%8E%A7%E5%88%B6%E6%9D%BF%E9%9D%A2%E6%9D%BF)
-   [变形器图子图表](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E5%8F%98%E5%BD%A2%E5%99%A8%E5%9B%BE%E5%AD%90%E5%9B%BE%E8%A1%A8)
-   [组件绑定](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E7%BB%84%E4%BB%B6%E7%BB%91%E5%AE%9A)
-   [变量](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E5%8F%98%E9%87%8F)
-   [资源](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E8%B5%84%E6%BA%90)
-   [细节面板](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF)
-   [着色器文本编辑器](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E7%9D%80%E8%89%B2%E5%99%A8%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8)
-   [控制板组件参考](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine#%E6%8E%A7%E5%88%B6%E6%9D%BF%E7%BB%84%E4%BB%B6%E5%8F%82%E8%80%83)

相关文档

[

静态网格体

![静态网格体](https://dev.epicgames.com/community/api/documentation/image/38f8cd93-613a-482e-a362-543889fa0f0c?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/static-meshes)