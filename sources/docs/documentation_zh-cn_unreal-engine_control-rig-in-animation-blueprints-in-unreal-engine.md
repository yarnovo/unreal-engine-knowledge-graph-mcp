# 在虚幻引擎动画蓝图中使用控制绑定 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/control-rig-in-animation-blueprints-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:15:41.386Z

---

目录

![在动画蓝图中使用控制绑定](https://dev.epicgames.com/community/api/documentation/image/d4b0f412-d1ba-4d3e-a2ba-37af49a03393?resizing_type=fill&width=1920&height=335)

你可以在[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)中引用 **控制绑定** ，从而制作能与控制点以及变量交互的动画蓝图逻辑。通常，你需要以这种方式来使用控制绑定，以便对某些控制绑定功能实现程序化的游戏逻辑，例如地面对齐，或者和任意接触点的对齐。

#### 先决条件

-   你已经为 **骨架网格体（Skeletal Mesh）** 创建了 **控制绑定资产（Control Rig Asset）** 。有关如何执行此操作的信息，请参阅 **[控制绑定快速入门指南](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine)** 页面。
    
-   你已经为同一骨架网格体创建了 **动画蓝图资产（Animation Blueprint Asset）** 。有关如何执行此操作的信息，请参阅 **[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)** 页面。
    

## 控制绑定蓝图节点

你需要使用 **控制绑定节点（Control Rig node）** 在动画蓝图中访问控制绑定内容。右键点击 **动画图表（Anim Graph）** 并选择 **杂项 > 控制绑定（Misc > Control Rig）** 可添加此节点。务必要连接引脚，将源输出连接到结果姿势。

![控制绑定动画蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e94aab1a-9873-4cc7-a286-6e254d514aa9/node.png)

接下来，你需要指定合适的 **控制绑定类（Control Rig Class）** 。为此，你需要选择节点，找到 **细节（Details）** 面板，然后从 **控制绑定类（Control Rig Class）** 属性下拉菜单中选择控制绑定。

![控制绑定动画蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe3fb706-2363-47e0-81d3-94ab998a74dd/class.png)

### 属性

控制绑定动画蓝图节点具有以下特定属性：

名称

说明

**设置网格体的初始变换（Set Initial Transform From Mesh）**

使用骨架网格体的初始变换来覆盖控制绑定的初始变换。

**将输入姿势重置为初始值（Reset Input Pose to Initial）**

启用此属性将使姿势重置为求值之前的初始姿势。

**传输输入姿势（Transfer Input Pose）**

当数据连接到其 **源（Source）** 引脚时，启用控制绑定节点要读取的骨骼变换信息。

**传输输入曲线（Transfer Input Curves）**

当数据连接到其 **源（Source）** 引脚时，启用控制绑定节点要读取的[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)信息。

**在全局空间中传输姿势（Transfer Pose in Global Space）**

启用后，在 **Global（全局）** 空间中对传入的姿势求值；如果禁用，则在 **本地（Local）** 空间中求值。

在全局空间中传输姿势可以确保全局姿势匹配，而本地空间则可以确保本地变换匹配。通常来说，只有在控制绑定骨架和动画蓝图骨架之间的骨架层级存在差异时，变换才会不同。禁用此功能还可以提升性能。

**要传输的输入骨骼**

当数据连接到其 **源（Source）** 引脚时，要传输的骨骼列表。只有添加到此列表中的骨骼才能传输。如果没有列出骨骼，则传输所有骨骼。

**输入（Input）**

如果控制绑定包含 **变量（Variables）** ，你可以通过启用 **使用引脚（Use Pin）** 将变量作为节点上的引脚公开；如果变量为 **浮点（Float）** ，你可以通过从"使用曲线"下拉菜单中选择曲线来使用[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)进行控制。

你还可以在控制点条目上启用 **使用引脚（Use Pin）** ，从而在此处公开所有控制点的输入数据。

**控制绑定类（Control Rig Class）**

要用于此节点的控制绑定类。

## 访问变量和控制点

通过操控节点上提供的 **控制点（Controls）** 或 **变量（Variables）** 可实现与控制绑定节点的主要交互。然后，你可以将其连接到相关逻辑，以便驱动其数值或变换。

点击在控制绑定的 **我的蓝图（My Blueprint）** 面板中变量旁边的 **眼睛（Eye）** ，确保变量在实例中是可编辑的，公开该变量。然后，在 **动画蓝图（Animation Blueprints）** 中，选择 **控制绑定节点（Control Rig node）** 并在 **变量（Variable）** 条目上启用 **使用引脚（Use Pin）** 。现在，变量应该以引脚形式在节点上公开。

![控制绑定动画蓝图变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/923444b4-5c78-48cf-a652-392abb63b70a/exposevar.png)

对于 **浮点（Float）** 类型的变量，点击 **使用曲线（Uses Curve）** 旁边的下拉菜单并选择 **动画曲线（AnimCurve）** ，可为需要通过[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)驱动的变量进行指定。

![控制绑定动画蓝图动画曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8a4d139-09c3-4163-b534-c26d951e3af9/usecurve.png)

默认情况下，控制绑定类中的所有控制点都列入控制绑定节点的 **输入（Input）** 属性中，你可以通过启用 **使用引脚（Use Pin）** 将其公开。这将公开该控制点的变换数据。

![控制绑定动画蓝图控制点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/194890ff-b998-423b-9bc6-8ae87a8a478a/exposectrl.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)
-   [animation blueprint](https://dev.epicgames.com/community/search?query=animation%20blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/control-rig-in-animation-blueprints-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [控制绑定蓝图节点](/documentation/zh-cn/unreal-engine/control-rig-in-animation-blueprints-in-unreal-engine#%E6%8E%A7%E5%88%B6%E7%BB%91%E5%AE%9A%E8%93%9D%E5%9B%BE%E8%8A%82%E7%82%B9)
-   [属性](/documentation/zh-cn/unreal-engine/control-rig-in-animation-blueprints-in-unreal-engine#%E5%B1%9E%E6%80%A7)
-   [访问变量和控制点](/documentation/zh-cn/unreal-engine/control-rig-in-animation-blueprints-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%8F%98%E9%87%8F%E5%92%8C%E6%8E%A7%E5%88%B6%E7%82%B9)