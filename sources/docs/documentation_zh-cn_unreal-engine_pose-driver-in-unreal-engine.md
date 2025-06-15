# 虚幻引擎中的姿势驱动器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/pose-driver-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:06:41.500Z

---

目录

![姿势驱动器](https://dev.epicgames.com/community/api/documentation/image/1fb43407-676a-489d-b852-b8783ac98c1c?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

你可以使用 can use the **姿势驱动器（Pose Driver）** [动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)来驱动[姿势资产](/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine)，并使用[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)来制作角色动画。

![姿势驱动器动画蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1828ccfe-0045-42ad-9417-7d239ceabc43/posedrivernode.png)

[姿势混合器](/documentation/zh-cn/unreal-engine/pose-blender-in-unreal-engine)和[Pose by Name](/documentation/zh-cn/unreal-engine/pose-blender-in-unreal-engine#posebyname)动画蓝图节点用于在已有的动画姿势之间混合姿势资产，而姿势驱动器节点用于驱动姿势资产中包含的姿势来为角色添加动画。

通过姿势驱动器节点，你可以使用骨骼动作来在运行时驱动姿势资产播放。

![姿势驱动器示例使用动画序列曲线驱动动画曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cd3c89e-2ba8-413a-9258-6fee626d376d/armdemo.gif)

![动画图表中使用姿势驱动器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86f51699-6d02-4457-b699-50bc08ab114f/armdemo.png)

视口

图表

选中一个姿势资产，设置一个[姿势目标](/documentation/zh-cn/unreal-engine/pose-driver-in-unreal-engine#posetargets)和一个 **源骨骼（Source Bone）**，你便可以使用源骨骼动作数据控制姿势资产在被驱动时的行为。

重新选择一个姿势驱动器节点的姿势资产，并且使用 **工具（Tools）** 属性导入一组新的姿势时，必须先创建一个新的 **姿势驱动器（Pose Driver）** 节点。

## 姿势目标

通过在 **姿势目标（Pose Targets）** 属性中指定目标，你可以从 **姿势资产（Pose Asset）** or **动画曲线（Animation Curves）** 中指定用于姿势驱动器节点的目标骨骼网格体姿势。姿势目标可以手动输入，也可以用 **姿势资产（Pose Asset）** 中的姿势自动分配。

要将姿势资产中包含的姿势作为姿势目标，首先，在姿势驱动器的 **细节（Details）** 面板中，在 **姿势资产（Pose Asset）** 属性下指定一个姿势资产。

![姿势驱动器细节面板中的姿势目标属性添加目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a9ba968-5e58-4171-a446-17b468c53fd8/addtarget.png)

姿势资产指定完成后，从 **工具（Tool）** 属性的菜单中选择从姿势资产 **复制资势（Copy Poses）**。

![工具下拉菜单选择从姿势资产复制姿势来将姿势导入为姿势目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f82b5fe1-fa86-419a-80aa-2d977dff7c72/copyfromposeasset.png)

导入的姿势目标现在可以使用姿势驱动器节点进行控制。

### 姿势目标属性参考

![姿势目标通用属性参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd54ec0a-0896-4ab6-930a-1c6801c004ca/posetargetprop1.png)

以下属性控制着全部姿势驱动器节点的姿势目标的行为。以下可以参考姿势目标的各种属性。

属性

描述

**单独驱动姿势/仅曲线（Solo Driven Pose / Curve Only）**

在这里可以切换姿势目标是代表整个姿势还是仅仅代表动画曲线。启用后，只单独解算曲线数据，不改变源关节。禁用后，会使用全部的姿势数据。

**工具（Tools）**

当 **姿势驱动器（Pose Driver）** 节点定义了一个姿势资产，你可以选择以下选项来控制由姿势驱动器驱动的姿势或者曲线的行为。在下拉菜单中可以选择以下选项：

**从姿势资产中复制全部（Copy All from PoseAsset）**: 从关联的 **姿势资产** 中复制目标。选用后，该项会覆盖所有已有的姿势目标。 **自动缩放（Auto Scale）**: 自动设置所有的缩放因数，基于到最近一个邻近的姿势目标的距离。

**添加目标（Add Target）**

你可以使用 **(+) 添加目标（Add Target）** 按钮来添加一个姿势目标。

![姿势目标详尽属性参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dbe0e24-606f-4f80-b869-672c2928df94/posetargetprop2.png)

以下属性可以对姿势驱动器节点中的每个姿势目标单独调整。以下可以参考姿势目标的各种属性。

属性

描述

**单独（Solo）**

点击并按住单独按钮可以在视口中预览姿势目标。双击单独姿势可以将姿势目标预览锁定。双击一个锁定的姿势的单独按钮便可以解除预览锁定。

**移除目标（Remove Target）**

点击姿势目标旁边的 **移除目标（Remove Target）** 按钮可以将其移除。

**缩放（Scale）**

在这里可以设置姿势目标的曲线或者姿势缩放。数值1会将全部曲线或者姿势数值作为姿势目标。

**驱动（Drive）**

在这里可以从姿势资产中选择哪一个姿势用姿势目标来驱动。

**隐藏（Hidden）**

启用后，调试绘图中会隐藏该姿势目标。

**覆盖（Override）**

在这里，你可以设置覆盖姿势目标的混合方式和函数。第一个字段中可以选择以下之一混合方式：

-   **欧几里得（Euclidian）**
-   **四元数（Quaternion）**
-   **摇摆角（Swing Angle）**
-   **扭曲角（Twist Angle）**
-   **默认方式（Default Method）**

第二个字段中可以选择以下之一覆盖混合函数：

-   **高斯（Gaussin）**
-   **指数（Exponential）**
-   **线性（Linear）**
-   **三次方（Cubic）**
-   **五次方（Quintic）**
-   **默认函数（Default Function）**

**曲线（Curve）**

当姿势目标是一个[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)而不是动画姿势时，启用该属性。如果姿势目标是动画姿势，那么禁用该属性。

**X**、**Y** 和 **Z**

在这里可以引用并调整姿势目标位置的 **X**、**Y** 和 **Z** 数值。默认情况下其在 **视口（Viewport）** 中显示为一个 **绿色物体**。如果全部数值都设为0，姿势目标的动作会被隔离在 **源骨骼（Source Bone）** 及其 **子级（Children）**。

### 基于曲线的姿势目标

除了使用 **姿势资产（Pose Asset）** 以外，姿势目标也可以由[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)来驱动。在 **姿势驱动器（Pose Driver）** 节点的细节面板中，将 **驱动输出（Drive Output）** 设置为 **驱动曲线（Drive Curves）**。

![姿势驱动器细节面板驱动输出属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ac95a1b-df0a-4561-8676-c2c57e5bd8fb/driveoutput.png)

在姿势目标比分，启用 \*单独驱动姿势/仅曲线（Solo Driven Pose / Curve Only）**，然后为每个曲线姿势目标，启用** 曲线（Curve）\*\*。启用了曲线睡醒后便可以在属性窗口中编辑曲线图表。

![姿势驱动器细节面板中的曲线属性和图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3f74ef4-d4f2-4194-9751-f3c616daee03/addcurve.png)

### 属性参考

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb379319-6eda-42c4-8a49-cded1445edb4/details.png)

以下是姿势驱动器节点的各种属性。

属性

描述

**源骨骼（Source Bones）**

从角色的 **骨架（skeleton）** 中选择骨骼来用作 **源骨骼（Source Bone）**，从而基于该骨骼的朝向应用驱动动画的姿势参数。可以添加多个源骨骼，但是需要至少一个。**添加（Add (+)）** 序数来定义驱动姿势朝向的源骨骼。

**计算空间骨骼（Eval Space Bone）**

在这里可以从角色的 **骨架（skeleton）** 中选择骨骼来计算 **源骨骼（Source Bone）** 的变换 。如果未指定，将使用 **源骨骼（Source Bone）** 的 **本地空间（local space）**。

**从参考姿势计算（Eval from Ref Pose）**

启用后，会相对于 **参考姿势（Reference Pose）** 位置来计算源骨骼方向和变换。推荐在使用 **摇摆（Swing）** 和 **扭曲角（Twist Angle）** 作为 **距离方法（Distance Method）** 使用时启用，因为会从角色的 **参考姿势（RefPose）** 计算扭曲。禁用后，会使用 **源骨骼（Source Bone）** 的 **本地空间（local space）**。

当设置了 **计算空间骨骼（Eval Space Bone）** 时，**从参考姿势计算（Eval from Ref Pose）** 会被略过。

**仅驱动选定骨骼（Only Drive Selected Bones）**

启用后，会将 **仅驱动骨骼（Only Drive Bones）** 列表中不包含的骨骼过滤掉。

**仅驱动骨骼（Only Drive Bones）**

在这里可以添加和选择角色中的骨骼，会在 **仅驱动选定骨骼（Only Drive Selected Bones）** 属性启用时使用。

**解算器类型（Solver Type）**

在这里可以指定使用的解算器类型。**叠加型** 解算器在大部分情况下需要归一化，而**插值型** 解算器不那么依赖于归一化。**插值型** 解算器还具有更加流畅的混合，而 **叠加型** 解算器需要更多的目标，但是可以更加精准地控制每个目标的影响。

-   **叠加型（Additive）**：叠加型解算器会将每个目标的影响添加总和在一起。这种解算器速度更快，但是需要更多的目标来达到较好的覆盖面，并且需要进行归一化才能够取得流畅的结果。
    
-   **插值型（Interpolative）**：插值型解算器会根据距离从每个目标插入数值。只要输入数值在目标所划定的范围内，插值就能够正常运行并且不需要归一化就能够返回0% - 100%之间的权重值。插值比起叠加能够使用更少的目标达到更流畅的结果，但是会有更大的运算性能开销。
    

**半径（Radius）**

在这里可以设置每个目标的默认半径。

**自动半径（Automatic Radius）**

启用后，节点会自动根据目标之间的平均距离自动选择半径。

**函数（Function）**

在这里可以选择使用的混合函数，有如下选项：

-   **高斯（Gaussin）**
-   **指数（Exponential）**
-   **线性（Linear）**
-   **三次方（Cubic）**
-   **五次方（Quintic）**
-   **默认函数（Default Function）**

**距离方法（Distance Method）**

在这里可以选择使用的混合方式，有如下选项：

-   **欧几里得（Euclidian）**
-   **四元数（Quaternion）**
-   **摇摆角（Swing Angle）**
-   **扭曲角（Twist Angle）**
-   **默认方式（Default Method）**

**扭曲轴（Twist Axis）**

当 **距离方法（Distance Method）** 设为 **摇摆角（Swing Angle）** 时所使用的轴。你可以在 **X**、**Y** 或者 **Z** 轴上设置轴限制数值。

**权重阈值（Weight Threshold）**

在这里可以设置权重阈值，低于该值的权重不会从目标对输出产生影响。

**归一化方式（Normalize Method）**

在这里可以选择使用的归一化权重的方式，有如下选项：

-   **仅归一化超过1（Only Normalize Above One）**：当数值超过1时，进行归一化。
-   **总是归一化（Always Normalize）**：零影响权重会保持为零。
-   **在中位数内归一化（Normalize Within Median）**：仅在 **中位数参考（Median Reference）** 属性数值中进行归一化。中位数是一个有着 **最大** 角和 **最小** 角的锥形，在其范围内会在不归一化和归一化之间插值。这样可以帮助定义一个体积，在其中总是进行归一化。
    
-   \*不归一化（No Normalization）\*\*：完全不归一化。仅在使用插值型方法是使用该项，并且已知所有的输入值都在目标划定的区域内。

**中位数参考（Median Reference）**

当 **归一化方式（Normalize Method）** 设置为 **在中位数内归一化（Normalize Within Median）** 在该项中可以设置中位数限制的旋转或者位置（用于归一化）。

**中位数最小值（Median Min）**

在这里可以设置用于中位数归一化的最小距离。

**中位数最大值（Median Max）**

在这里可以设置用于中位数归一化的最大距离。

**驱动源（Drive Source）**

在这里可以选择读取变换的哪一部分来应用alpha去驱动 **姿势目标（Pose Target）**： **旋转（Rotation）** 还是 **位移（Translation）** 。

**驱动输出（Drive Output）**

在这里可以选择姿势目标是来自要驱动的姿势资产还是动画曲线中的姿势。可以选择：

-   **驱动姿势（Drive Poses）**： 使用目标DriveName来驱动来自指定姿势资产中的姿势。
-   **驱动曲线（Drive Curves）**：使用目标的DriveName来驱动曲线。

**姿势资产（Pose Asset）**

在这里可以选择项目中的 **姿势资产（Pose Asset）** 来进行驱动。

### 调试设置

![调试属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/231f21c5-7cac-4127-a08e-3a869af599e3/debugprop.png)

以下是姿势驱动器节点的调试设置。

属性

描述

**轴长度（Axis Length）**

使用世界单位的轴长度，在调试绘图中使用。

**锥体细分（Cone Subdivision）**

调试绘制锥体时使用的细分/线条的数量。

**绘制调试锥体（Draw Debug Cones）**

启用后，会在3D中绘制锥体方便调试。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [animation blending](https://dev.epicgames.com/community/search?query=animation%20blending)
-   [animation blueprint](https://dev.epicgames.com/community/search?query=animation%20blueprint)
-   [pose assets](https://dev.epicgames.com/community/search?query=pose%20assets)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [姿势目标](/documentation/zh-cn/unreal-engine/pose-driver-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E7%9B%AE%E6%A0%87)
-   [姿势目标属性参考](/documentation/zh-cn/unreal-engine/pose-driver-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E7%9B%AE%E6%A0%87%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)
-   [基于曲线的姿势目标](/documentation/zh-cn/unreal-engine/pose-driver-in-unreal-engine#%E5%9F%BA%E4%BA%8E%E6%9B%B2%E7%BA%BF%E7%9A%84%E5%A7%BF%E5%8A%BF%E7%9B%AE%E6%A0%87)
-   [属性参考](/documentation/zh-cn/unreal-engine/pose-driver-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)
-   [调试设置](/documentation/zh-cn/unreal-engine/pose-driver-in-unreal-engine#%E8%B0%83%E8%AF%95%E8%AE%BE%E7%BD%AE)