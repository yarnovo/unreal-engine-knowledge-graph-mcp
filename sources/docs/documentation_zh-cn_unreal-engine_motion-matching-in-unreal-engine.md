# 虚幻引擎中的运动匹配 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:05:00.840Z

---

目录

虚幻引擎中的 **运动匹配（Motion Matching）** 是一个基于查询的动画姿势选择系统。运动匹配在 **姿势搜索（Pose Search）** 插件中，你可以将运动匹配[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)节点用作[状态机](/documentation/zh-cn/unreal-engine/state-machines-in-unreal-engine)或[混合空间](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine)的动态替代方案。运动匹配与传统的动画系统不同，它可以基于一组动画数据做出明智的动画姿势选择，创建响应式和反应式动画系统，而无需在[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)之间设置过渡或混合逻辑。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5aaff00-e14f-434a-b328-aadd6230fd33/image_000.gif)

运动匹配节点可通过模式（如骨骼的位置和速度）查询角色通道，并基于存储在 **数据库（Database）** 资产中的一组动画数据，做出明智的动画姿势选择，以匹配查询。相比传统的状态机或混合逻辑，运动匹配角色动画结果对Gameplay系统的反应性和响应性更佳。

借助运动匹配，只需将更多动画数据添加到数据库资产，你就能提升角色的动画保真度。有了更多的动画数据，运动匹配节点可以访问更多可供选择的数据，而无需更改或实现额外的过渡逻辑。

虚幻引擎的运动匹配系统还包含一套设置和调试工具，可用于调整动画系统，从而适配你的项目目标。借助这些工具，你可以查看选项、编辑查询流程和设置选择标准权重。

本文档概述了虚幻引擎中的运动匹配，并提供了示例工作流来介绍如何使用运动匹配设置角色的移动动画系统。

#### 先决条件

-   启用 **姿势搜索（Pose Search）** [插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。方法是在 **菜单栏** 中找到 **编辑（Edit） > 插件（Plugins）** 并找到 **动画（Animation）** 分段中的插件，或使用 **搜索栏** 。启用插件并重启编辑器。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d34aef0-c8e3-4150-a582-6fc34fded849/image_100.png)

-   你的项目包含角色，有一组移动（行走、跑步和转弯）动画。如果没有，请从虚幻商城下载游戏动画示例项目。有关此示例项目的详情，请参阅[游戏动画示例项目](/documentation/zh-cn/unreal-engine/game-animation-sample-project-in-unreal-engine)文档。

## 运动匹配设置

你可以根据以下示例工作流程，了解如何在项目中设置基于移动的简单运动匹配系统。关于更精细和高级的设置，请参阅[游戏动画示例项目](/documentation/zh-cn/unreal-engine/game-animation-sample-project-in-unreal-engine)文档。

### 创建姿势搜索模式资产

势搜索模式资产存储了你的运动匹配配置以及查询设置。该资产用于将你的动画数据库和查询系统关联到运动匹配节点，并定义了将被用于查询，以做出动画选择的数据。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5db32dc7-2dc1-48e5-a5f1-8b97aabf5768/image_200.png)

要创建姿势搜索模式资产，请在内容浏览器中 **右键点击**，（**+**）**添加** 并选择 **动画（Animation）** > **运动匹配（Motion Matching）** > **姿势搜索模式（Pose Search Schema）**。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b93a0501-1e02-43c1-b773-8a62d38c8b9d/image_300.png)

新建好姿势搜索模式资产后，系统将弹出提示框，要求你选择要为其建立运动匹配系统的角色骨架。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25345a0a-8b23-4245-8d9f-2a4305adfb2d/image_400.png)

新的姿势搜索模式资产为运动设置预配置了两个通道，即[轨迹通道（Trajectory Channel）](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E8%BD%A8%E8%BF%B9%E9%80%9A%E9%81%93)和[姿势搜索通道（Pose Search Channel）](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E6%90%9C%E7%B4%A2%E9%80%9A%E9%81%93)。通过轨迹（Trajectory）通道，你可以在运动轨迹组件（Motion Trajectory Component）上设置要取样的点，以便进行姿势选择。默认设置适用于此示例工作流程，但你也可以使用 **样本（Samples）** 属性中的（**+**）**添加（Add）** 功能添加更多的样本，为运动匹配系统提供更多可供选择的可用数据。

建议你使用尽可能少的样本。虽然样本越多，为运动匹配节点提供的数据越准确，但是这样会使系统的结果失真。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f02c6515-f048-4ee0-885a-794ca6b85de7/image_500.png)

#### 轨迹通道

对于轨迹通道中的每个索引，你都可以指定标记（Flags），以确定查询运动轨迹通道时，取样点要寻找哪种类型的数据。默认值适用于此工作流程示例。如需详细了解轨迹通道设置和标记，请参阅[轨迹通道参考](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E8%BD%A8%E8%BF%B9%E9%80%9A%E9%81%93)小节。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd1afd6e-bd2c-425d-964f-509492ad81b8/image_600.png)

#### 姿势搜索通道

通过 **姿势通道（Pose Channel）** ，你可以为运动匹配系统设置骨骼定义，以将姿势与查询系统进行匹配。默认资产预配置了用于人体模型骨架的足骨 `foot_l` 和 `foot_r` 的骨骼定义。如果你使用不同的骨架，请将这些骨骼定义替换为骨架资产的左右足骨。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41f69558-89cc-4450-b5ab-ef69156b7b45/image_700.png)

你还可以为每个取样骨骼设置标记，以确定运动匹配系统将查看取样骨骼的哪种数据，以便进行选择。如需详细了解姿势通道设置和不同的标记，请参阅[姿势通道](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E9%80%9A%E9%81%93)小节。

姿势通道可以将任何骨骼用作参考点。对于移动运动匹配动画系统，你需要选择对跟踪动作相关运动数据有用的一对骨骼，如角色的双脚。在替代系统中，如攀爬系统，你需要选择所含数据更具价值的骨骼，如角色的手骨。

你也可以向运动数据库配置资产添加更多通道，但更多的通道和通道内样本在运行时将消耗更多性能

对于此工作流程实例，默认值就能够提供良好的移动结果。

#### 姿势搜索模式资产参考

你可以参考下面的姿势搜索模式资产属性和设置列表。

属性

说明

**骨架（Skeleton）**

你可以在此属性中为使用运动匹配节点的角色定义骨架资产。

**镜像数据表（Mirror Data Table）**

你可以在此属性中设置镜像数据表资产，为进行动画选择时要使用的运动匹配节点提供镜像动画序列。

**数据预处理器（Data Preprocessor）**

设置对完整姿势特征数据集执行的操作类型。可以从以下选项中进行选择：

-   **无（None）** ：此选项不会应用任何数据预处理。
    
-   **规格化（Normalize）** ：此选项将针对偏差规格化所有数据。此外，所有权重将被规格化为单一矢量值。
    
-   **仅按偏差规格化（Normalize Only by Deviation）** ：此选项仅针对偏差规格化所有数据，而不会规格化权重值。
    

**取样速率（Sample Rate）**

设置数据库中动画数据取样的更新速率。取样速率越高，动画姿势搜索越精细，但是这样会增加系统的内存开销。

**通道（Channels）**

你可以在此处添加和设置通道，供运动匹配系统在运行时查询、搜索和匹配动画姿势时使用。通道会将姿势搜索模式资产的开销逐项分解为更简单的部分，例如样本骨骼的位置或速度，或肢体阶段。针对索引数据库姿势的查询的总开销是组合通道开销的总和。使用 (+) 添加（Add）并从下拉菜单选择通道，即可添加通道。添加额外通道将细化你对运动匹配系统的搜索，但需要占用更多内存并增加性能开销。

建议使用尽可能少的通道实现动画系统目标。

如需详细了解各个通道及其特定属性，请参阅[通道](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E9%80%9A%E9%81%93)小节。

**Permutation数（Number of Permutations）**

设置在进行选择时，关联数据库中的动画资产被索引的次数。

**Permutation时间偏移（Permutations Time Offset）**

设置的值代表相对于第一次Permutation的 **取样时间（Sampling Time）** 的 **PermutationTime** 的起始偏移。后续Permutation将使用以下公式确定Permutation时间偏移： `PermutationTime = SamplingTime + PermutationTimeOffset + PermutationIndex / PermutationSampleRate`。

**添加数据填充（Add Data Padding）**

启用后，将一个填充通道添加到运动数据库配置资产，以确保数据被对齐为16字节并填充，以增加最终内存为代价改进性能。

**注入额外的调试通道（Inject Additional Debug Channels）**

启用后，要求将额外通道注入此模式。其原始意图是添加UPoseSearchFeatureChannel\_postions(s)，以帮助降低调试绘制的复杂度（数据库将拥有在适当位置和时间绘制线条的所有必要位置）。

### 通道

你可以参考下面的运动数据库模式资产可用通道列表。

#### 分组

你可以使用 **分组通道（Group Channel）** 将其他姿势搜索模式资产通道分组，以便一起运行操作。创建分组通道后，你可以在其"子通道（Sub-Channel）"属性中使用(**+**) **添加（Add）** 创建其他通道。

#### 朝向

你可以使用朝向通道（Heading Channel）查询系统朝向。当你想要匹配特定骨骼的朝向组件（以朝向轴表示），例如仅骨骼的水平或垂直移动时，此通道可能很有用。

你可以参考下面的朝向通道属性及功能说明列表：

属性

说明

**调试颜色（Debug Color）**

你可以在此属性中设置将在视口中渲染的调试绘制颜色，帮助调试运动匹配系统。

**骨骼（Bone）**

你可以在此属性中指定来自角色骨架的骨骼，该骨骼将在查询中用于进行姿势选择。你可以使用下拉菜单从骨架的层级中选择骨骼。

**原点骨骼（Origin Bone）**

从骨架中指定充当原点骨骼的骨骼，以确定其朝向。打开下拉层级菜单即可从角色的骨架中选择骨骼。

**权重（Weight）**

设置一个权重值，用于对该通道相对于运动数据库配置资产中其他通道对输出姿势的影响进行加权。

**取样属性ID（Sample Attribute ID）**

设定充当取样属性ID的值。如果值大于 `0.0` ，那么姿势搜索数据库中所有与此姿势搜索模式资产相关联且位于本通道内的动画都应定义姿势搜索：取样属性ID通知状态（Pose Search: Sampling Attribute ID Notify State）和取样属性（Sampling Attribute）。取样属性中设置的值将充当数据源，而非骨骼通道。取样属性的值将被转换为原点骨骼空间。

**取样时间偏移（Sample Time Offset）**

你可以在此属性中设置一个值，该值将用作取样时间偏移量。

**原点时间偏移（Origin Time Offset）**

你可以在此属性中设置用于设置偏移原点时间的值。与此通道的原点骨骼（根骨骼或轨迹骨骼）对应的取样时间相关数据将（以秒为单位）将被此属性的值偏移。举例说明，如果将原点骨骼设为角色的头部骨骼，取样时间偏移设为 `0.5` ，原点时间偏移也设为 `0.5` ，那么此通道将尝试匹配未来 `0.5` 秒内角色头部骨骼的朝向，同时对应未来的根骨骼。

**朝向轴（Heading Axis）**

设置将用于查询取样 **骨骼** 属性运动的轴（**X** 、 **Y** 或 **Z**）。

**输入查询姿势（Input Query Pose）**

你可以在此属性中设置输入查询姿势的方式。可选的方式有：

-   **使用角色姿势（Use Character Pose）** ：使用角色的当前姿势输入查询姿势。
    
-   **使用连续姿势（Use Continuing Pose）** ：使用角色的连续姿势输入查询姿势。
    
-   **使用插值连续姿势（Use Interpolated Continuing Pose）** ：使用插值混合以连续姿势输入查询姿势。
    

**组件剥离（Component Stripping）**

你可以在此属性中选择要从查询数据中剥离的特定运动轴。选择 **无（None）** 不执行组件剥离，选择 **剥离XY（Strip XY）** 将仅观察 **X** 和 **Y** 运动轴，沿水平面匹配，而选择 **剥离Z（Strip Z）** 将仅观察 **Z** 轴上的运动，仅沿查询的运动高度匹配。

**Permutation时间类型（Permutation Time Type）**

选择要在动画取样时使用的Permutation时间类型。可以从以下选项中进行选择：

-   **使用取样时间（Use Sample Time）** ：此时间类型在对骨骼按照其最终 **取样时间偏移（Sample Time Offset）** 取样之外，还以相同的取样时间对 **骨骼** 和 **原点骨骼** 进行取样。其定义为当前动画的求值时间。
    
-   **使用Permutation时间（Use Permutation Time）** ：此时间类型在对骨骼按照其最终 **取样时间偏移** 取样之外，还以相同的Permutation时间对 **骨骼** 和 **原点骨骼** 进行取样。其定义为 `SampleTime` （即 `UseSampleTime` ） `+ Schema -> PermutationTimeOffset + PermutationIndex / Schema -> PermutationSampleRate` ，其中 `PurmutationIndex` 的范围是 `[0, Schema -> Number of Permutations]` 。
    
-   **使用取样到Permutation时间（Use Sample to Permutation Time）** ：此时间类型在按照骨骼的最终 **取样时间偏移** 取样之外，还以同样的时间对 **骨骼** 进行求值，并按 **Permutation时间** 对 **原点骨骼** 进行求值。
    

**规格化分组（Normalization Group）**

你可以在此属性中设置规格化分组，以根据其他朝向通道规格化本通道的查询。设置后，所有基数相同且规格化分组相同的同类通道将规格化到同一处。例如都规格化到手持武器的角色的移动数据库中。因为包含不可镜像的动画，你也许仍然需要分别规格化左脚和右脚的位置和速度。

#### 填充

填充（Padding）通道用于为运动匹配数据库添加额外的填充数据，以消耗最终额外内存为代价提高性能。如果启用添加数据填充（Add Data Padding）属性且将其设为 `16` 字节，本通道将被自动注入姿势搜索模式（Pose Search Schema）。你可以使用 **填充大小（Padding Size）** 属性设置通道填充数据的Permutation数量。

#### 阶段

你可以参考下面的阶段通道属性及功能说明：

属性

说明

**调试颜色（Debug Color）**

你可以在此属性中设置将在视口中渲染的调试绘制颜色，帮助调试运动匹配系统。

**骨骼（Bone）**

你可以在此属性中指定来自角色骨架的骨骼，该骨骼将在查询中用于进行姿势选择。你可以使用下拉菜单从骨架的层级中选择骨骼。

**权重（Weight）**

设置一个权重值，用于对该通道相对于运动数据库配置资产中其他通道对输出姿势的影响进行加权。

**输入查询姿势（Input Query Pose）**

你可以在此属性中设置输入查询姿势的方式。可选的方式有：

-   **使用角色姿势（Use Character Pose）** ：使用角色的当前姿势输入查询姿势。
    
-   **使用连续姿势（Use Continuing Pose）** ：使用角色的连续姿势输入查询姿势。
    
-   **使用插值连续姿势（Use Interpolated Continuing Pose）** ：使用插值混合以连续姿势输入查询姿势。
    

#### 姿势

你可以使用姿势（Pose）通道来计算角色在角色空间而非全局空间中的位置。当你要查询的移动是相对于该角色位置的本地移动而非全局移动时，此通道非常有用。

你可以参考下面的姿势通道属性及功能说明：

属性

说明

**权重（Weight）**

设置一个权重值，用于对该通道相对于运动数据库配置资产中其他通道对输出姿势的影响进行加权。

**取样骨骼（Sampled Bones）**

你可以在此属性中定义骨骼列表，姿势通道将根据关联标记对这些骨骼进行取样，以便针对查询系统匹配姿势。你可以使用(+)添加（Add）功能添加取样骨骼定义。添加索引后，你可以设置以下属性：

-   **调试颜色（Debug Color）** ：设置将用于运行时在视口中渲染 **引用（Reference）** 取样骨骼的调试绘制的颜色。
-   **引用（Reference）** ：可以使用下拉菜单从角色的骨架层级中选择骨骼。
-   **标记（Flags）** ：你可以在此属性中切换标记，这将决定从取样骨骼引用什么类型的数据。你可以根据需要切换多个标记来实现项目目标。可切换的标记有：
    -   **速度（Velocity）**
    -   **位置（Position）**
    -   **旋转（Rotation）**
    -   **阶段（Phase）**
-   **权重（Weight）** ：设置一个权重值，用于衡量此 **取样骨骼（Sampled Bones）** 索引对通道的影响。

**输入查询姿势（Input Query Pose）**

你可以在此属性中设置输入查询姿势的方式。可选的方式有：

-   **使用角色姿势（Use Character Pose）** ：使用角色的当前姿势输入查询姿势。
    
-   **使用连续姿势（Use Continuing Pose）** ：使用角色的连续姿势输入查询姿势。
    
-   **使用插值连续姿势（Use Interpolated Continuing Pose）** ：使用插值混合以连续姿势输入查询姿势。
    

**使用角色空间速度（Use Character Space Velocities）**

启用后，将基于角色空间中的位置计算速度，否则将使用全局空间位置计算。

#### 位置

你可以使用位置通道（Position Channel）来查询角色骨架中某根骨骼相对于另一根骨骼的位置。当尝试根据骨骼的位移或相对于另一根骨骼的位置进行姿势选择时，此通道非常有用。

你可以参考下面的位置通道属性及功能说明列表：

属性

说明

**调试颜色（Debug Color）**

你可以在此属性中设置将在视口中渲染的调试绘制颜色，帮助调试运动匹配系统。

**骨骼（Bone）**

你可以在此属性中指定来自角色骨架的骨骼，该骨骼将在查询中用于进行姿势选择。你可以使用下拉菜单从骨架的层级中选择骨骼。

**原点骨骼（Origin Bone）**

你可以在此属性中从角色骨架指定骨骼，将其用作参考点，以计算 **骨骼** 的位置变化。你可以使用下拉菜单从骨骼的层级中选择骨骼。

**权重（Weight）**

设置一个权重值，用于对该通道相对于运动数据库配置资产中其他通道对输出姿势的影响进行加权。

**取样时间偏移（Sample Time Offset）**

你可以在此属性中设置一个值，该值将用作取样时间偏移量。

**输入查询姿势（Input Query Pose）**

你可以在此属性中设置输入查询姿势的方式。可选的方式有：

-   **使用角色姿势（Use Character Pose）** ：使用角色的当前姿势输入查询姿势。
    
-   **使用连续姿势（Use Continuing Pose）** ：使用角色的连续姿势输入查询姿势。
    
-   **使用插值连续姿势（Use Interpolated Continuing Pose）** ：使用插值混合以连续姿势输入查询姿势。
    

**组件剥离（Component Stripping）**

你可以在此属性中选择要从查询数据中剥离的特定运动轴。选择 **无（None）** 不执行组件剥离，选择 **剥离XY（Strip XY）** 将仅观察 **X** 和 **Y** 运动轴，沿水平面匹配，而选择 **剥离Z（Strip Z）** 将仅观察 **Z** 轴上的运动，仅沿查询的运动高度匹配。

**Permutation时间偏移（Permutations Time Offset）**

设置的值代表相对于第一次Permutation的 **取样时间（Sampling Time）** 的 **PermutationTime** 的起始偏移。后续Permutation将使用以下公式确定Permutation时间偏移：`PermutationTime = SamplingTime + PermutationTimeOffset + PermutationIndex / PermutationSampleRate` 。

#### 取样时间

取样时间通道（Sampling Time Channel）服务于调试目的，利用取样时间来改善功能数据。本通道的默认 **权重** 为 `0.0` ，因此搜索时会将其忽略。

#### 轨迹

轨迹通道（Trajectory Channel）用于对角色的移动轨迹进行取样，可与 **角色轨迹（Character Trajectory）** 蓝图组件结合使用。你可以使用 **权重（Weight）** 属性，设置轨迹通道（Trajectory Channel）对最终输出姿势的影响程度。你可以使用"取样（Samples）"属性，在对角色移动模型进行取样的角色轨迹组件上添加取样时间点。

你可以参考下面的取样属性及功能说明列表：

属性

说明

**调试颜色（Debug Color）**

你可以在此属性中设置将在视口中渲染的调试绘制颜色，帮助调试运动匹配系统。

**偏移（Offset）**

你可以在此属性中设置何时从角色轨迹组件中获取角色的移动样本。正值将沿时间轴前移，而负值将沿时间轴后移。

**标记（Flags）**

你可以在此属性中切换在沿着角色轨迹组件的位置获取角色移动的哪些值，由 **偏移（Offset）** 属性指定。你可以在下拉列表中切换任意数量的值。

**权重（Weight）**

设置一个值，用于加权取样对最终输出姿势选择的影响。该值仅用于针对索引中的其他取样进行加权，而不用于针对其他通道进行加权。

#### 速度

你可以使用速度通道（Velocity Channel）根据角色在角色空间或全局空间中的速度查询姿势。

你可以参考下面的速度通道属性及功能说明列表：

属性

说明

**调试颜色（Debug Color）**

你可以在此属性中设置将在视口中渲染的调试绘制颜色，帮助调试运动匹配系统。

**骨骼（Bone）**

你可以在此属性中指定来自角色骨架的骨骼，该骨骼将在查询中用于进行姿势选择。你可以使用下拉菜单从骨架的层级中选择骨骼。

**权重（Weight）**

设置一个权重值，用于对该通道相对于运动数据库配置资产中其他通道对输出姿势的影响进行加权。

**取样时间偏移（Sample Time Offset）**

你可以在此属性中设置一个值，该值将用作取样时间偏移量。

**输入查询姿势（Input Query Pose）**

你可以在此属性中设置输入查询姿势的方式。可选的方式有：

-   **使用角色姿势（Use Character Pose）** ：使用角色的当前姿势输入查询姿势。
    
-   **使用连续姿势（Use Continuing Pose）** ：使用角色的连续姿势输入查询姿势。
    
-   **使用插值连续姿势（Use Interpolated Continuing Pose）** ：使用插值混合以连续姿势输入查询姿势。
    

**使用角色空间速度（Use Character Space Velocities）**

启用后，指定 **骨骼** 的速度将在角色空间而非全局空间中计算。当你查询本地移动而非角色在全局空间中的移动时，此属性非常有用。

**规格化（Normalize）**

启用后，速度值将规格化为最大值 `1`。当尝试查询骨骼何时在移动而不是移动程度时，此属性会很有帮助。

**组件剥离（Component Stripping）**

你可以在此属性中选择要从查询数据中剥离的特定运动轴。选择 **无（None）** 不执行组件剥离，选择 **剥离XY（Strip XY）** 将仅观察 **X** 和 **Y** 运动轴，沿水平面匹配，而选择 **剥离Z（Strip Z）** 将仅观察 **Z** 轴上的运动，仅沿查询的运动高度匹配。

### 试验性通道

本节给出了试验性姿势搜索模式通道（Experimental Pose Search Schema Channels）的列表及对应的功能说明：

以下皆为试验性通道，不应在生产环境中依赖其功能。

#### 碰撞腿（试验性）

使用 **碰撞腿（Crashing Legs）** 通道，选择使下肢保持设定距离的姿势，可以防止角色移动时腿部发生重叠。相隔距离是使用从 `LeftThigh` 位置到 `RightThigh` 位置的角度，和从 `LeftFoot` 位置到 `RightFoot` 位置的方向计算的，然后将其除以PI，得到 `-1.0` 到 `1.0` 设定范围内的值。当Permutation次数（Number of Permutations）属性的值大于 `1.0` 时，本通道将被自动注入姿势搜索模式（Pose Search Schema）。本通道依设计应与试验性的 **运动匹配拼接（Motion Matched Stitching）** 功能配合使用。

你可以参考下面的碰撞腿通道设置及功能说明列表：

属性

说明

**左大腿（LeftThigh）**

设置代表角色左大腿的骨骼。

**右大腿（Right Thighh）**

设置代表角色右大腿的骨骼。

**左脚（Left Foot）**

设置代表角色左脚的骨骼。

**右脚（Right Foot）**

设置代表角色右脚的骨骼。

**权重（Weight）**

设置权重值，对该通道的结果与运动数据库配置资产中其他激活通道的结果进行加权。

**输入查询姿势（Input Query Pose）**

你可以在此属性中设置输入查询姿势的方式。可选的方式有：

-   **使用角色姿势（Use Character Pose）** ：使用角色的当前姿势输入查询姿势。
    
-   **使用连续姿势（Use Continuing Pose）** ：使用角色的连续姿势输入查询姿势。
    
-   **使用插值连续姿势（Use Interpolated Continuing Pose）** ：使用插值混合以连续姿势输入查询姿势。
    

**允许公差（Allowed Tolerance）**

设置使用此通道进行选择时的允许公差。

#### Permutation时间（试验性）

你可以使用Permutation时间（Permutation Time）通道对其他通道进行加权，从而决定各通道对最终产出姿势的影响程度。

你可以使用 **权重（Weight）** 属性设置此通道相对于其他通道的影响权重。

### 创建姿势搜索库资产

要以可供运动匹配节点选择的格式存储角色动画数据，你必须创建姿势搜索数据库资产。要创建姿势搜索数据库资产，请在 **内容浏览器** 中找到（**+**）**添加（Add）** ，并选择 **动画（Animation）** > **运动匹配（Motion Matching）** > **姿势搜索数据库（Pose Search Database）** 。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d563655-99d7-432f-8f24-f41cab45bc8f/image_800.png)

在创建好姿势搜索数据库资产之后，你必须从资产选择器中选择一个姿势搜索模式资产，以定义它。方法是在内容浏览器中双击该资产以打开资产编辑器。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9784a55-5480-4ee1-95db-a595c6d539bc/image_900.png)

姿势搜索数据库是你添加和编辑动画资产列表的地方，该列表供运动匹配使用，后者可从中做出选择。在创建了资产后，你可以 **双击** **内容浏览器（Content Browser）** 中的资产以打开姿势搜索数据库资产编辑器。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9fb25a9-9c07-4284-9825-1cee9580fcde/image_1000.png)

现在你可以将动画资产添加到姿势搜索数据库资产了。在此工作流程实例中，使用了一组移动资产，如循环、旋转和停止。

在运动匹配设置中被用于移动的动画必须包含根运动，且动画序列必须启用了根运动属性。

你可以根据自身需要使用任意数量的动画资产来达到想要的保真度，你提供的动画资产越多，可供运动匹配节点选择的数据就越多。

要添加动画资产，请使用 **资产列表（Asset List）** 面板中的（**+**）**添加** 按钮，或使用 **内容浏览器（Content Browser）** 或 **资产浏览器（Asset Browser）** 面板拖放资产。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c167c3c-ba8c-4b60-95d6-b7d63cd38039/image_1100.gif)姿势搜索数据库资产支持多种动画资产类型，[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)资产是可用的默认资产。你也可以选择使用[动画合成](/documentation/zh-cn/unreal-engine/animation-composites-in-unreal-engine)、[混合空间](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine)。 ![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abce2666-2fe0-4436-9680-d25146f934dd/image_1200.png) 

尽管动画蓝图不支持[动画蒙太奇](/documentation/zh-cn/unreal-engine/animation-montage-in-unreal-engine)，因此不能与Motion Matching节点一起使用，但你可使用角色蓝图的实验性运动匹配功能，在运动匹配设置中使用并播放蒙太奇资产。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e2ff074-bdf5-4fee-85c7-d22aacc00f59/image_1300.gif)

向姿势搜索数据库添加动画后，你可以在 **资产列表（Asset List）** 面板中选中一个或多个动画序列资产，在 **视口（Viewport）** 中播放它们并进行查看，或在 **选择项细节（Selection Details）** 面板中编辑其属性。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca183d82-356f-49b9-8260-d8923588acde/image_1400.png) ![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/637f608a-711b-4532-98e6-b217bfb08b4c/image_1500.png)

属性

说明

**模式（Schema）**

你可以在此属性中设定或引用姿势搜索模式（Pose Search Schema）资产，而该资产将设定此姿势搜索数据库资产为进行匹配而使用的通道。此属性将自动填充你在创建数据库资产时所选的模式。你可以使用此属性的资产选择下拉菜单更改相关联的模式。

**连续姿势开销偏差（Continuing Pose Cost Bias）**

你可以在此属性中设置一个值，给当前选定姿势添加偏差。这样你可以对姿势应用正或负开销偏差，以影响选择下一个姿势时对其定值的方式。这对于将系统延长或缩短一个动画片段很有帮助，具体具决于你设置的值。负值会使动画更有可能被连续选中，或者播放更长的时长，而正值会使动画不太可能被再次选中，使得动画播放时长缩短。

**循环开销偏差（Looping Cost Bias）**

你可以在此属性中设置一个值，该值将被添加到数据库中所有循环动画资产。这样你便可以控制系统选择循环动画的可能性。负值使系统更有可能选择循环动画，并保持在循环动画中，而正值则使得系统不太可能选择循环动画或连续播放循环动画。

**从数据库参数中排除（Exclude from Database Parameters）**

你可以在此属性中设置动画第一帧和最后一帧的求值范围。此属性可被用于裁剪数据库中动画的起始帧和结束帧，从而在混合当前动画和下一选定动画时维持过渡姿势，例如在混出时阻止动画最后一帧出现。当值为 `0.0` 时不会执行裁剪，而帧为负数时，则会根据所使用的属性裁剪动画的其中一端。

**额外外插时间（Additional Extrapolation Time）**

你可以在此属性中设置此参数的值，以决定混入或混出动画时使用的额外外插时间。你可以设置下列公式所用的最小值或最大值，从而限制各动画的外插时间：

`MinimumExtrapolationTime = AnimationAssetTimeStart + AdditionalExtrapolationTime.Min` `MaximumExtrapolationTime = AnimationAssetTimeEnd + AdditionalExtrapolationTime.Max`

**标签（Tags）**

你可以在此属性中设置充当姿势搜索数据库资产元数据的标签数组。点击（ **+** ） **添加（Add）** 即可为数组添加新元素。添加数组元素后，还可以为索引元素添加文本值。

**规格化集（Normalization Set）**

你可以在此属性中设置姿势搜索规格化集资产，定义你所希望用以进行规格化选择的姿势搜索数据库资产列表。虽然没有规格化集也能让运动匹配设置生效，但按类型分割动画集并使用规格化集比较各动画集，可以使结果更准确且高效。如需详细了解规格化集的使用，请参阅本文档的[姿势搜索规格化集](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E6%90%9C%E7%B4%A2%E8%A7%84%E6%A0%BC%E5%8C%96%E9%9B%86)小节。

**预览网格体（Preview Mesh）**

你可以在此属性中设定播放动画时视口所用的骨骼网格体资产。如果不定义此属性，编辑器将采用与所添加动画资产相关联的骨骼网格体。若要选择新的预览骨骼网格体，请使用此属性的资产选择下拉菜单，并选择与数据库动画资产兼容的骨骼。

**姿势搜索模式（Pose Search Mode）**

设置数据库搜索动画数据的模式。可从下拉菜单中选择下列选项：

-   **暴力搜索（Brute Force）** ：对数据库搜索进行高运算量的求值。系统将对全部有索引的姿势进行求值，以找出最佳姿势。
    
-   **PCAKDTree** ：优化的搜索模式。数据库仅使用从 **基本组件数量（Number Of Principal Components）** 属性中得出的最显著维度，将库内姿势投射到基本组件分析（PCA）空间中，并构建 **KDTree** （一种空间分割数据结构）以帮助进行搜索。
    
-   **VPTree** ：一种使用有利位置树的优化搜索模式。
    

此模式为试验性模式，因此不应在生产环境中依赖其功能。

**姿势裁剪相似度阈值（Pose Pruning Similarity Threshold）**

你可以在此属性中设定一个值，以决定将相似姿势保存到同一索引的阈值。举例说明，如果两个姿势的选择值一致，比如具有模式基数的多维点会比较相似，且这些值比姿势裁剪相似度阈值（Pose Pruning Similarity Threshold）设置的值更接近，那么数据库将只保存一个姿势，供两个不同的姿势索引访问。此属性适合用于设置阈值来为给定值选择多个姿势，从而节省内存。

此属性仅在 **姿势搜索模式（Pose Search Mode）** 属性设定为 **PCAKDTree** 时可用。

**基本组件数量（Number Of Principal Components）**

当 **姿势搜索模式（Pose Search Mode）** 属性为 **PCAKDTree** 时，此参数决定创建KDTree所用的维度数量。值越高则维度越多，数据集方差就越合理。一般而言，维度越多，搜索结果就越好，但也会导致内存占用更多和项目性能更差。

此属性仅在 **姿势搜索模式（Pose Search Mode）** 属性设定为 **PCAKDTree** 时可用。

**KDTree最大叶片尺寸（KDTree Max Leaf Size）**

设置KDTree各分支的最大叶片数。

此属性仅在 **姿势搜索模式（Pose Search Mode）** 属性设定为 **PCAKDTree** 时可用。

**KNNQuerryNumNeighbors**

使用KDTree搜索只能得出近似的开销结果，因此数据库搜索将选择数个姿势来执行完整的开销分析，从而选出最佳的姿势。设定此属性的值即可设定从KDTree搜索中选择进行全面开销分析的姿势数量。使用 **VPTree姿势搜索模式（VPTree Pose Search Mode）** 时，此属性也可用于设定来自VPTree搜索的姿势数量，以执行全面的开销分析。

### 创建最简设置：Motion Matching节点和Pose History节点

打开角色的动画蓝图，右键点击图表并在 **姿势搜索（Pose Search）** 类别下选择运动匹配（Motion Matching），即可创建一个 **Pose Search** 节点。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5584e72c-4fbf-412c-81a9-827c4c0c9ad3/image_1600.png)

打开图表中Motion Matching节点的 **可搜索（Searchable）** 引脚下拉菜单，选择你的数据库资产。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed56637f-43c0-4e4c-8a3f-019d1affa413/image_1700.png)

然后添加一个 **Pose History** 节点：拖出运动匹配节点的 **输出（Output）** 引脚，找到 **姿势搜索（Pose Search）** 分段，选择Pose History节点，或使用 **搜索栏** 。然后将Pose History节点的 **输出（Output）** 引脚连接到 **Output Pose** 节点即可。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d764686-e5b4-46e7-a5da-7f02a3732be5/image_1800.png)

选择AnimGraph中的Pose History节点并在 **细节（Details）** 面板中展开其属性。启用 **生成轨迹（Generate Trajectory）** 属性。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f01451c-3f90-40c9-92c4-8ecf43b2f79c/image_1900.png)

然后，展开 **收集的骨骼（Collected Bones）** 属性，并使用（ **+** ） **添加（Add）** 为角色骨架的每块待取样骨骼添加数组元素。若Pose History和Motion Matching节点在进行动画选择时查询轨迹，将对此属性中所定义的骨骼进行取样。![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3d24a63-ac2b-4c52-813a-c1dad653cc52/image_20.png)

**保存（Save）** 并 **编译（Compile）** 动画蓝图。你的角色现在就会使用运动匹配在运行时选择移动动画姿势。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e559b48d-3740-4b85-a2cf-7d133a78b6fd/image_2100.gif)

### 运动匹配节点

你可以参考下面的运动匹配节点设置及功能说明列表：

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91927c5e-e193-4e2c-b104-ad16c44d3aa9/image_2200.png)

属性

说明

**数据库（Database）**

你可以在此属性中设置数据库资产，以供选择。

**混合时间（Blend Time）**

设置一个值，用于确定选择新动画序列片段时的混合时长。运动匹配有一个内置的混合树，为混合类型、混合质量和混合配置文件提供了更多选项。例如，如果有需要，你可以执行诸如上半身比下半身混合时间更长之类的操作。将来，此功能还将扩展，提供更多选项。

**混合配置文件（Blend Profile）**

你可以在此属性中设置角色的混合配置文件，与运动匹配结合使用。

**模式（Mode）**

你可以在此属性中设置曲线，以决定如何随时间推移将混合效果应用于骨骼。常见的选择有 **线性（Linear）** 、 **缓入（Ease In）** 、 **缓出（Ease Out）** 以及和 **缓入缓出（Ease In and Out）** 。你可以从嵌套在混合配置文件属性扩展的下拉菜单中访问此属性。

**姿势跳跃阈值时间（Pose Jump Threshold Time）**

你可以在此属性中设置一个时间段，以秒为单位。对于同一资产，系统不会跳转到此范围内的姿势，除非与当前帧的距离达到此时间长度。这有助于防止系统一遍又一遍地选取同一剪辑片段内的动画分段，并有助于促进播放动画或选择新内容。

**姿势重选历史记录（Pose Reselect History）**

你可以在此属性中设置一个时间范围，以秒为单位，防止系统跳转到在所设秒数内曾经选择过的姿势。

**搜索节流时间（Search Throttle Time）**

设置系统搜索新姿势的频率。

**播放速率（Play Rate）**

你可以在此属性中设置动画选择的播放速率。

**使用惯性混合（Use Inertial Blend）**

启用后，动画混合将应用惯性混合。

**相关后重置（Reset On Becoming Relevant）**

启用后，如果节点因未在前一帧或前几帧更新而变得与图表相关，则此属性将重置运动匹配状态。

**应该搜索（Should Search）**

启用后，运动匹配节点将在关联的数据库资产中搜索动画，与查询系统进行匹配。

**应使用缓存通道数据（Should Use Cached Channel Data）**

启用后，对具有不同模式的多个数据库进行搜索时，将尝试共享在查询构建期间计算的姿势特征数据。这样做是为了在不同模式间尽可能共享连续的姿势特征向量（并提高性能）。此属性默认禁用，以向下兼容现有的运动匹配系统。

**应过滤通知（Should Filter Notifies）**

启用后，所有来自动画播放器示例的通知都应被过滤。{以秒为单位}

**最大活动混合数（Max Active Blends）**

设置混合堆栈中活动混合动画的最大数量。若此属性为 `0` ，则禁用混合堆栈。

**存储混合姿势（Store Blended Pose）**

启用后，如果请求的混合数大于最大活动混合数（Max Active Blends）的值，那么混合堆栈将混合，并累加为一个包含所有溢出动画的存储姿势。禁用后，将保存用于存储姿势的内存，但一旦达到最大活动混合数的值，混合堆栈将开始丢弃动画，甚至导致动画弹出。

**暂停通知重现（Notify Recency Time Out）**

设置通知发送后的时间窗口，期间将过滤掉所有相同通知的实例。

**重载动画的最大混合时间（Max Blend in Time to Override Animation）**

如果最近添加的动画在此属性值设定的范围内，则新请求的混合动画将取代它的位置。否则新混合动画将进入混合堆栈。

**播放器深度混合时间乘数（Player Depth Blend Time Multiplier）**

设置此属性的值作为动画播放器混入定时器的乘数。增大此值有助于让深层混合产出更快的混合时间。

### 动画通知过滤

运动匹配系统可能会出现这样的问题：系统选择的每个姿势都会触发特定的动画通知，例如行走或奔跑动画中的脚步音效。这会导致相邻帧播放两个或多个脚步音效，而不是一个。使用 **动画通知过滤（Anim Notify Filtering）** 即可解决这个问题。

下方是倒回调试器（Rewind Debugger）为同一角色Gameplay场景录制的两段记录，左边的示例没有使用动画通知过滤，由于其选择的动画姿势，该序列多次触发了相同的动画通知。右边的示例使用了动画通知过滤，以防止在给定时间内触发相同的通知，从而保证了在设定的时间段内只触发一次动画通知。

无动画通知过滤

有动画通知过滤

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99a24160-921b-4af0-b36b-c0adba9458ed/image_2300.png)

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d457a81-5845-4af6-ae94-20416954705a/image_2400.png)

要实现动画通知过滤，请打开角色的动画蓝图，选择Motion Matching节点，打开 **细节（Details）** 面板，启用 **应过滤通知（Should Filter Notifies）** 。然后可以设置 **暂停通知重现（Notify Recency Time Out）** ，决定过滤掉通知的持续时间（以秒为单位）。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93a36450-7b5a-4cc2-bb99-87fb02286713/image_2500.png)

可将默认值 `0.2` 作为基线，因为它对双足移动最为合适，但你的项目可能需要使用不同的值来实现预期结果。

启用 **应过滤通知（Should Filter Notifies）** 属性后将同等对待所有动画通知，在 **暂停通知重现（Notify Recency Time Out）** 所定时间范围内，同一通知的所有重复实例都将被过滤掉。如果动画包含你不想过滤掉的通知，请在动画序列或蒙太奇中选择该通知，并禁用该通知 **细节（Details）** 面板中的 **可通过请求被过滤（Can Be Filtered Via Request）** 属性。所有动画通知默认都启用该属性。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73f5a917-4802-447d-a719-ce72a360adfb/image_2600.png)

动画通知过滤仅适用于动画通知（Anim Notify），对动画通知状态（Anim Notify States）无效。

### 姿势搜索模式通道权重

你可以使用姿势搜索模式资产中每个通道的权重属性，控制每个通道对选择过程的影响程度。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1797a3a0-724f-41e5-a30f-4124c602ed3d/image_2700.png)

姿势搜索模式资产中每个通道的 **权重（Weight）** 属性会告诉运动匹配系统这些通道对于从数据库中选择动画帧的影响有多大。

在上面的工作流程实例中，姿势通道权重被设置为 `1.0` ，轨迹通道权重被设置为 `3.0` 。这意味着轨迹差异对系统的影响是姿势差异的三倍。

每个通道中的单个属性也可以被赋予权重，以微调影响动画选择的因数。例如，你还可以为历史和预测范围赋予权重，使评分偏向于过去或未来。这使你可以分配通道的那些元素将被用于确定其在姿势搜索模式的各通道间的影响力。

无论你为这些不同的权重赋予什么值，系统都会自动将它们全部规格化。要防止规格化权重，请将 **数据处理器（Data Processor）** 属性设置为 **无** 。

但是，权重未必总能解决错误的姿势选择。例如，如果你的移动模型是以每秒5米的速度移动，但你的平均数据是约每秒4米，这可能导致运动匹配系统不断选择权重值最高的动画姿势。调整权重降低权重值最高的动画姿势可以纠正这种重复选择的问题，但可能导致某些通道的评分被完全忽略，导致你的动画系统出现不连贯的问题。

调整通道的权重表示你在调整系统选择动画姿势的方式，而不是根据项目需求调整系统。要保留你的整个动画系统，可以使用其他方法来适应所有的Gameplay场景，如姿势搜索数据库集。

#### 姿势搜索规格化集

姿势搜索规格化集是一组经过定义的姿势搜索数据库资产，这些资产都包含数组适用于特定用例的动画。例如，一个数据库可以包含角色的行走动画，另一个包含角色的奔跑动画。通过在一个姿势搜索规格化集资产中设置多个姿势搜索数据库资产，你可以划分动画集，为每个动画集设置权重，并在满足特定条件时使运动匹配系统更容易选择某个动画集中的动画。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5590bd33-b679-4dba-b661-2e4aa838d768/image_2800.png)

姿势搜索规格化集可以在触发特定Gameplay事件时动态替换。这将限制运动匹配节点可选择的动画数据池，使你更好地控制动画系统的动画姿势输出。具体方法是在姿势搜索规格化集资产中定义一组姿势搜索数据库资产，并使用选择器系统在运行时动态设置要激活哪个数据库。

### 运动匹配通知

你还可以使用一组运动匹配通知来协助你进行设置。你可以参考下面的可用运动匹配通知及功能说明列表：

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a908483-9647-40a0-bc30-bbe1ebcd1fd1/image_2900.png)

通知

说明

**姿势搜索：块过渡（Pose Search: Block Transition）**

使用此通知状态，你可以设置一个动画区域，希望将无法跳转该被标记区域，但可以从未被标记的上一个分段播放到该区域。当你不想跳到动画的某些分段时，此功能非常有用。假如你有一个闲置动画，其中角色会在动画中挠头，你肯定不想直接跳到挠头动画的中段。如果你标记该区域，就可以跳到动画未被标记的任何分段。

**姿势搜索：从数据库中排除（Pose Search: Exclude From Database）**

使用此通知状态，你可以从动画序列中完全排除动画数据的某些分段。设置了此通知的分段不会被构建或搜索。

**姿势搜索：运动匹配分支（Pose Search: Motion Matched Branch In）**

使用此通知状态来规定动画被运动匹配系统选中时应该分支到何处。

**姿势搜索：重载基础开销偏差（Pose Search: Override Base Cost Bias）**

此通知状态允许你为选择动画的某些分段给予加值或减值。负值表示给予加值，而正值表示给予减值。如果系统离开起始动画的时间早于你的预期，此功能将对此有所帮助：你可以将此通知放在你希望系统继续播放、不要过早离开的分段，给予其少量加值，以尝试让系统在该区域停留更长时间。

**姿势搜索：重载连续姿势开销偏差（Pose Search: Override Continuing Pose Cost Bias）**

可使用此通知状态设置连续姿势的姿势搜索开销，从而根据通知参数决定动画片段再次被选中以持续连续的可能性。

**姿势搜索：取样属性（Pose Search: Sampling Attribute）**

通过指定通道的取样属性ID属性以匹配通知状态的取样属性ID属性，在数据库索引期间，你的姿势搜索模式通道可以将此通知状态作用动画空间位置、旋转和线速度的提供者。

**姿势搜索取样效果（Pose Search Sampling Effect）**

通过指定通道的取样属性ID属性以匹配通知状态的取样属性ID属性，在数据库索引期间，你的姿势搜索模式通道可用此通知状态标定由取样属性ID识别的事件。

## 动画扭曲

你可以将Animation Warping节点与Motion Matching结合使用，通过在运行时程序化地修改角色的姿势来缓解覆盖范围不足的问题。

如需详细了解动画扭曲，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine)

[![运动扭曲](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ed30c73-cb67-46d1-870a-1212b256223d/topicimage.png)](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine)

[运动扭曲](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine)

[深入探讨虚幻引擎中动画的运动扭曲。](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine)

## 运动匹配调试

关于调试和优化运动匹配动画系统的详细说明，请参阅[运动匹配调试](/documentation/zh-cn/unreal-engine/motion-matching-debugging-in-unreal-engine)文档。

## 其他信息

关于虚幻引擎的运动匹配功能的更多详情，请参看[运动匹配 | GDC 2024](/documentation/404)演讲。

## 示例内容

你可以下载并查看游戏动画示例项目，以获取一套高质量动画资产以及一套针对角色移动的完整运动匹配设置。

如需了解运动匹配示例项目的详情，请查阅以下文档：

[](/documentation/zh-cn/unreal-engine/game-animation-sample-project-in-unreal-engine)

[![游戏动画示例项目](images/static/document_list/empty_thumbnail.svg)](/documentation/zh-cn/unreal-engine/game-animation-sample-project-in-unreal-engine)

[游戏动画示例项目](/documentation/zh-cn/unreal-engine/game-animation-sample-project-in-unreal-engine)

[游戏动画示例项目是一个你可以用来观察和了解虚幻引擎中的高品质响应式动画系统的示例项目。](/documentation/zh-cn/unreal-engine/game-animation-sample-project-in-unreal-engine)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [motion matching](https://dev.epicgames.com/community/search?query=motion%20matching)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [运动匹配设置](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E8%BF%90%E5%8A%A8%E5%8C%B9%E9%85%8D%E8%AE%BE%E7%BD%AE)
-   [创建姿势搜索模式资产](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%A7%BF%E5%8A%BF%E6%90%9C%E7%B4%A2%E6%A8%A1%E5%BC%8F%E8%B5%84%E4%BA%A7)
-   [轨迹通道](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E8%BD%A8%E8%BF%B9%E9%80%9A%E9%81%93)
-   [姿势搜索通道](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E6%90%9C%E7%B4%A2%E9%80%9A%E9%81%93)
-   [姿势搜索模式资产参考](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E6%90%9C%E7%B4%A2%E6%A8%A1%E5%BC%8F%E8%B5%84%E4%BA%A7%E5%8F%82%E8%80%83)
-   [通道](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E9%80%9A%E9%81%93)
-   [分组](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%88%86%E7%BB%84)
-   [朝向](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E6%9C%9D%E5%90%91)
-   [填充](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%A1%AB%E5%85%85)
-   [阶段](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E9%98%B6%E6%AE%B5)
-   [姿势](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%A7%BF%E5%8A%BF)
-   [位置](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E4%BD%8D%E7%BD%AE)
-   [取样时间](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%8F%96%E6%A0%B7%E6%97%B6%E9%97%B4)
-   [轨迹](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E8%BD%A8%E8%BF%B9)
-   [速度](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E9%80%9F%E5%BA%A6)
-   [试验性通道](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E8%AF%95%E9%AA%8C%E6%80%A7%E9%80%9A%E9%81%93)
-   [碰撞腿（试验性）](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E7%A2%B0%E6%92%9E%E8%85%BF%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [Permutation时间（试验性）](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#permutation%E6%97%B6%E9%97%B4%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [创建姿势搜索库资产](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%A7%BF%E5%8A%BF%E6%90%9C%E7%B4%A2%E5%BA%93%E8%B5%84%E4%BA%A7)
-   [创建最简设置：Motion Matching节点和Pose History节点](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%9C%80%E7%AE%80%E8%AE%BE%E7%BD%AE%EF%BC%9Amotionmatching%E8%8A%82%E7%82%B9%E5%92%8Cposehistory%E8%8A%82%E7%82%B9)
-   [运动匹配节点](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E8%BF%90%E5%8A%A8%E5%8C%B9%E9%85%8D%E8%8A%82%E7%82%B9)
-   [动画通知过滤](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%8A%A8%E7%94%BB%E9%80%9A%E7%9F%A5%E8%BF%87%E6%BB%A4)
-   [姿势搜索模式通道权重](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E6%90%9C%E7%B4%A2%E6%A8%A1%E5%BC%8F%E9%80%9A%E9%81%93%E6%9D%83%E9%87%8D)
-   [姿势搜索规格化集](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E6%90%9C%E7%B4%A2%E8%A7%84%E6%A0%BC%E5%8C%96%E9%9B%86)
-   [运动匹配通知](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E8%BF%90%E5%8A%A8%E5%8C%B9%E9%85%8D%E9%80%9A%E7%9F%A5)
-   [动画扭曲](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%8A%A8%E7%94%BB%E6%89%AD%E6%9B%B2)
-   [运动匹配调试](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E8%BF%90%E5%8A%A8%E5%8C%B9%E9%85%8D%E8%B0%83%E8%AF%95)
-   [其他信息](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E5%85%B6%E4%BB%96%E4%BF%A1%E6%81%AF)
-   [示例内容](/documentation/zh-cn/unreal-engine/motion-matching-in-unreal-engine#%E7%A4%BA%E4%BE%8B%E5%86%85%E5%AE%B9)