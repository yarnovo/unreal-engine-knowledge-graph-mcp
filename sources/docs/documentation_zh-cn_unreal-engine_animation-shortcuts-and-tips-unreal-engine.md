# 动画生产率提示与技巧 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine
> 
> 生成时间: 2025-06-14T20:10:12.578Z

---

目录

![动画生产率提示与技巧](https://dev.epicgames.com/community/api/documentation/image/213faa91-056d-47e9-ba26-9c9f5209ae31?resizing_type=fill&width=1920&height=335)

## 资产导航操作

### 在单独选项卡中打开

按住SHIFT的同时打开动画资产，可在新选项卡中打开。

![按住Shift打开新的选项卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c2fa3aa-3dcd-4976-84e0-d15e31dff1dc/shiftopen.gif) \[注释：UE5推出时将上面的行替换为注释部分\] 在UE4中，按住SHIFT的同时打开动画资产，可在新选项卡中打开。 在UE5时，可在在编辑器偏好设置中启用"始终在新选项卡中打开动画资产（Always Open Animation Assets in New Tab）"，将上述操作设置为默认行为。

### 动画资产筛选

打开动画资产后，你可以在资产浏览器（Asset Browser）选项卡中筛选内容。 特别有用的筛选器包括 **动画筛选器（Anim Filters）>使用曲线...（Uses Curve...）** 和 **动画筛选器（Anim Filters）>使用骨架通知...（Uses Skeleton Notify...）**。

### 内容浏览器筛选

内容浏览器有各种针对动画内容的筛选器，但务必再看看 **其他筛选器（Other Filters）** 类别。它有一些实用的选项，例如 **已签出（Checked Out）** 文件。

### 引用查看界面

引用查看界面非常适用于追踪引用动画资产的资产。 **热键（Hotkeys）：**Alt+Shift+R

![引用查看界面的快捷键](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/901fcde1-9307-487d-8f33-815f4ec5a2b6/referencehotkey.gif)

### 内容浏览器高级搜索语法

欲了解如何使用内容浏览器的高级搜索功能，请参见[高级搜索语法](/documentation/zh-cn/unreal-engine/advanced-search-syntax-in-unreal-engine)文档。

## 动画蓝图

### 蓝图编辑器速查表

欲了解使用 **蓝图编辑器** 的通用技巧，请参见[蓝图速查表](/documentation/zh-cn/unreal-engine/blueprint-editor-cheat-sheet-in-unreal-engine)。

### 姿势观看

右键点击 **动画图表（Animation Graph）** 中的任意动画节点，选择 **切换姿势观看（Toggle Pose Watch）**，以查看姿势当前在图表中的调试绘制效果。

![姿势观看](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0839ae0b-1d44-4615-b807-0588f088feaa/posewatch.png)

## 动画序列/蒙太奇编辑器

### 显示叠加动画

查看叠加动画时，点击预览视口顶部的 **角色（Character）** 按钮，并选择 **动画（Animation）>附加基础（Additive Base）** 以绘制基本姿势。

![显示叠加动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12cb464f-d646-4cb2-9597-c33b635a1e07/visualizing_additives.png)

## 编辑器首选项

### 自动保存

你可以使用 **编辑器偏好设置（Editor Preferences）** 中的 **启用自动保存（Enable AutoSave）** 设置禁用自动保存。

### 关卡加载

在 **编辑器偏好设置（Editor Preferences）** 中将 **启动时加载关卡（Load Level at Startup）** 设为 **上一次打开的关卡（Last Opened）**，以在重新启动编辑器时始终加载之前打开的最后一个关卡。

## 通用技巧

### 撤销未保存的更改

如果你对某个文件做了更改但未保存，现在想清除这些更改，可在内容浏览器中右键点击该文件，选择 **资产操作（Asset Actions）>重新加载（Reload）**。

## 在编辑器中运行(PIE)

### 动画调试文本

命令

说明

**NextDebugTarget (PGUP)**

更改调试目标

**PreviousDebugTarget (PGDOWN)**

更改调试目标

**ShowDebug**

清除显示

**ShowDebug ANIMATION**

切换动画调试数据的显示状态

**ShowDebugToggleSubCategory**

切换特定类别的显示（见自动完成结果）

### 其他命令

命令

说明

**a.animnode.\***

各种动画节点的调试选项

**Log `<类别>` `<详细级别>`**

更改日志详细级别

更改日志详细级别的示例：`Log LogAnimMontage Verbose`

**p.VisualizeMovement 0**

隐藏移动组件调试

**p.VisualizeMovement 1**

显示移动组件调试

**show Bones**

显示/隐藏骨骼

**show Collision**

显示/隐藏碰撞

**Slomo 0.5**

慢动作

**Stat FPS**

显示帧率

**t.MaxFPS 0**

移除帧率限制

**t.MaxFPS 20**

将帧率限制为20（警告：会影响编辑器）

### 调试LOD

命令

说明

**a.VisualizeLODs 0**

隐藏LOD信息

**a.VisualizeLODs 1**

显示LOD信息

**FORCESKELLOD LOD=2**

将所有骨骼网格体强制设为LOD 2

**FORCESKELLOD LOD=-1**

禁用强制LOD

### 调试属性

命令

说明

**DisplayAll `<类名称>` `<属性名称>`**

显示特定类的所有对象上的某个属性的值。

对组件值使用DisplayAll的示例：`DisplayAll CharacterMovementComponent Velocity`

对AnimBP值使用DisplayAll的示例：`DisplayAll MyAnimBP_C AimYaw`

**DisplayClear**

清除DisplayAll的结果

**GetAll `<类名称>` `<属性名称>`**

与DisplayAll相同，但打印至输出日志

**Display `<对象名称>` `<属性名称>`**

显示单个实例的属性值

使用 **Display** 查找Actor **GetAll** 命令可用于查找要用于 `<对象名称>` 的内容。

1.  要查找感兴趣的 **Actor ID**，将鼠标悬停在世界大纲视图中该Actor的名称上。例如：`BP_MyPawn_C_3`
2.  运行 `GetAll MyAnimBP AimYaw`
3.  在输出日志中找到对象名称的路径。例如：`/Temp/UEDPIE_0_Untitled_1.Untitled_1:PersistentLevel.BP_MyPawn_C_3.CharacterMesh0.MyAnimBP_C_0`
4.  运行 `Display /Temp/UEDPIE_0_Untitled_1.Untitled_1:PersistentLevel.BP_MyPawn_C_3.CharacterMesh0.MyAnimBP_C_0 AimYaw`

### 内存追踪

命令

说明

**obj list class="AnimSequence"**

列示加载的所有动画序列（推荐在烘焙版本中测试）

**obj refs name=ASSET\_NAME**

打印指定资产的引用关系链

示例：`obj refs name= /Game/Characters/Animations/ThirdPersonJump_End.ThirdPersonJump_End`

### 作弊脚本

你可以通过在游戏的DefaultGame.ini中添加 **作弊脚本**，将多个控制台命令组合成单个命令。

示例：

```cpp
		[CheatScript.ShowAnimVars]
		+Cmd="displayclear"
		+Cmd="DisplayAll CharacterMovementComponent Velocity"
		+Cmd="DisplayAll MyAnimBP_C AimYaw"

```

从控制台运行命令：`CheatScript ShowAnimVars`。

### 编辑器工具控件

[编辑器工具控件](/documentation/404)允许在蓝图中完整地创建自定义编辑器控件。一个常见用例是创建一组触发常用控制台命令的按钮。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [资产导航操作](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E8%B5%84%E4%BA%A7%E5%AF%BC%E8%88%AA%E6%93%8D%E4%BD%9C)
-   [在单独选项卡中打开](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E5%9C%A8%E5%8D%95%E7%8B%AC%E9%80%89%E9%A1%B9%E5%8D%A1%E4%B8%AD%E6%89%93%E5%BC%80)
-   [动画资产筛选](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E5%8A%A8%E7%94%BB%E8%B5%84%E4%BA%A7%E7%AD%9B%E9%80%89)
-   [内容浏览器筛选](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E5%86%85%E5%AE%B9%E6%B5%8F%E8%A7%88%E5%99%A8%E7%AD%9B%E9%80%89)
-   [引用查看界面](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E5%BC%95%E7%94%A8%E6%9F%A5%E7%9C%8B%E7%95%8C%E9%9D%A2)
-   [内容浏览器高级搜索语法](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E5%86%85%E5%AE%B9%E6%B5%8F%E8%A7%88%E5%99%A8%E9%AB%98%E7%BA%A7%E6%90%9C%E7%B4%A2%E8%AF%AD%E6%B3%95)
-   [动画蓝图](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E5%8A%A8%E7%94%BB%E8%93%9D%E5%9B%BE)
-   [蓝图编辑器速查表](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E8%93%9D%E5%9B%BE%E7%BC%96%E8%BE%91%E5%99%A8%E9%80%9F%E6%9F%A5%E8%A1%A8)
-   [姿势观看](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E5%A7%BF%E5%8A%BF%E8%A7%82%E7%9C%8B)
-   [动画序列/蒙太奇编辑器](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E5%8A%A8%E7%94%BB%E5%BA%8F%E5%88%97/%E8%92%99%E5%A4%AA%E5%A5%87%E7%BC%96%E8%BE%91%E5%99%A8)
-   [显示叠加动画](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E6%98%BE%E7%A4%BA%E5%8F%A0%E5%8A%A0%E5%8A%A8%E7%94%BB)
-   [编辑器首选项](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E9%A6%96%E9%80%89%E9%A1%B9)
-   [自动保存](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E8%87%AA%E5%8A%A8%E4%BF%9D%E5%AD%98)
-   [关卡加载](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E5%85%B3%E5%8D%A1%E5%8A%A0%E8%BD%BD)
-   [通用技巧](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E9%80%9A%E7%94%A8%E6%8A%80%E5%B7%A7)
-   [撤销未保存的更改](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E6%92%A4%E9%94%80%E6%9C%AA%E4%BF%9D%E5%AD%98%E7%9A%84%E6%9B%B4%E6%94%B9)
-   [在编辑器中运行(PIE)](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E8%BF%90%E8%A1%8C\(pie\))
-   [动画调试文本](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E5%8A%A8%E7%94%BB%E8%B0%83%E8%AF%95%E6%96%87%E6%9C%AC)
-   [其他命令](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E5%85%B6%E4%BB%96%E5%91%BD%E4%BB%A4)
-   [调试LOD](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E8%B0%83%E8%AF%95lod)
-   [调试属性](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E8%B0%83%E8%AF%95%E5%B1%9E%E6%80%A7)
-   [内存追踪](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E5%86%85%E5%AD%98%E8%BF%BD%E8%B8%AA)
-   [作弊脚本](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E4%BD%9C%E5%BC%8A%E8%84%9A%E6%9C%AC)
-   [编辑器工具控件](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E5%B7%A5%E5%85%B7%E6%8E%A7%E4%BB%B6)

相关文档

[

高级搜索语法

![高级搜索语法](https://dev.epicgames.com/community/api/documentation/image/649e4267-b0ab-4241-9c4e-8df692e1922a?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/advanced-search-syntax-in-unreal-engine)