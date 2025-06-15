# 虚幻引擎Visual Studio使用技巧 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/visual-studio-tips-and-tricks-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:38:41.191Z

---

目录

![Visual Studio使用技巧](https://dev.epicgames.com/community/api/documentation/image/6fd79801-e53a-4794-90fd-507363058069?resizing_type=fill&width=1920&height=335)

## 即时窗口

命令

说明

`{,,UnrealEditor-Core}::PrintScriptCallstack()`

蓝图调用堆栈

`{,,UnrealEditor-Core}::GFrameNumber`

当前帧数（也可作为断点条件）

`{,,UnrealEditor-Core}::GPlayInEditorID`

PIE ID（适用于多玩家，也可作为断点条件）

`UnrealEditor-Engine!GPlayInEditorContextString`

PIE窗口名称（适用于多玩家）

## 快速参考

### 禁用/启用优化

将以下宏添加到文件中将禁用和启用相应文件的编译器优化：

```cpp
	PRAGMA_DISABLE_OPTIMIZATION
	PRAGMA_ENABLE_OPTIMIZATION

```

禁用优化之后，代码将严格按照你的编写来执行，不会删除你在追踪或逐步调试会话中需要使用的临时变量或调试变量。当你需要在不使用完整调试构建的情况下有选择地调试文件时，此功能很有用。

### 调试行

**调试行（Debug lines）** 指的是视口中绘制的行，通常用于显示线迹追踪的一个或多个路径。要使用调试行，你需要包含 `DrawDebugHelpers.h`。以下代码介绍如何使用 `DrawDebugLine`：

```cpp
	#include "DrawDebugHelpers.h"
	DrawDebugLine(GetWorld(), START, END, FColor::Green);

```

除了标准的调试行，`DrawDebugHelpers` 还具有大量不同的调试绘制器。包括：

**Primitive形状（Primitive Shapes）**

```cpp
	+ DrawDebugBox
	+ DrawDebugSphere
	+ DrawDebugCapsule
	+ DrawDebugCylinder
	+ DrawDebugPlane
	+ DrawDebugCone
	+ DrawDebugPoint
```

**固体形状（Solid Shapes）**

```cpp
	+ DrawDebugSolidBox
	+ DrawDebugSolidPlane
```

**其他常见形状（Other Common Shapes）**

```cpp
	+ DrawDebugFrustrum
	+ DrawDebugCamera
	+ DrawDebugCrosshairs
```

**网格体（Meshes）**

```cpp
	+ DrawDebugMesh

```

### 调试文本

以下代码提供了如何将调试文本写入到界面的示例。此示例与 **Print String** 蓝图节点中的功能相对应。

```cpp
	#include "Engine/Engine.h"
	FString MyDebugString = FString::Printf(TEXT("MyVelocity(%s)"), *MyVelocity.ToCompactString());
	GEngine->AddOnScreenDebugMessage(INDEX_NONE, 0.f, FColor::Yellow, MyDebugString, false, FVector2D::UnitVector * 1.2f);

```

`FString::Printf` 函数可以获取字符串格式参数，让你可以快速编写包含变量的字符串。你需要包含 `Engine.h` 才能获得 `Gengine` 的访问权限，从而调用 `AddOnScreenDebugMessage`。如需有关如何使用字符串格式的信息，请参考[虚幻引擎中的String处理](/documentation/zh-cn/unreal-engine/string-handling-in-unreal-engine)。

### 枚举转换为字符串

从静态 `Uenum` 调用 `GetNameStringByValue` 并为其提供你要获取其名称的值，可以将枚举转换为字符串。初始化 `Uenum` 时使用的 `StaticEnum` 与传入其数值的枚举，两者的类型必须相同。

```cpp
	EMyEnum::Type MyVariable;
	static const UEnum* Enum = StaticEnum<EMyEnum::Type>();
	Enum->GetNameStringByValue(MyVariable);

```

## 修复配置组合框宽度

默认解决方案配置组合框太小，无法看到当前选择的选项的全名。为了解决该问题，请右键单击 **工具栏**，选择 **自定义（Customize）**，选择选项卡 **命令（Commands）**，选择 **单选工具栏（radio Toolbar） > 标准（Standard）**，向下滚动至 **解决方案配置（Solution Configurations）**，点击 **修改选择（Modify Selection）**，然后输入你需要的宽度。宽度200通常很有用。

![修复配置组合框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f54a04de-3a9e-458d-9422-2c9051121087/combobox.png)

## 加速Visual Studio 2019

处理虚幻项目时，Visual Studio 2019可能会比较慢。以下是一些可以提高性能的策略：

### 调试较慢

尝试在 **选项（Option）> 调试（Debugging）> 常规（General）** 中禁用以下设置

-   调试时，取消选中 **启用诊断工具（Enable Diagnostic Tools）**
-   调试时，取消选中 **显示耗时PerfTip（Show elapsed time PerfTip）**

### Perforce Visual Studio历史记录将显示上述每种方法

![显示P4VS历史记录](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56c6f30f-4320-4627-9a11-0ea97abe7492/p4vs_history.png)

要停止Perforce Visual Studio历史记录显示上述每种方法，取消选中 **工具（Tools） > 选项（Options） > 文本编辑器\\所有语言\\CodeLens（Text Editor\\All Languages\\CodeLens）>启用CodeLens（Enable CodeLens）**。

### 打开解决方案或调试时，Visual Studio较慢

如果你正在使用另一个符号搜索插件，例如Visual Assist，你可以禁用Intellisense数据库来阻止它解析解决方案。步骤如下： **工具（Tools）** > **选项（Options）** > **文本编辑器（Text Editor）** > **C/C++** > **高级（Advanced）** > 设置 **禁用数据库 = 真（Disable Database = true）**。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [即时窗口](/documentation/zh-cn/unreal-engine/visual-studio-tips-and-tricks-in-unreal-engine#%E5%8D%B3%E6%97%B6%E7%AA%97%E5%8F%A3)
-   [快速参考](/documentation/zh-cn/unreal-engine/visual-studio-tips-and-tricks-in-unreal-engine#%E5%BF%AB%E9%80%9F%E5%8F%82%E8%80%83)
-   [禁用/启用优化](/documentation/zh-cn/unreal-engine/visual-studio-tips-and-tricks-in-unreal-engine#%E7%A6%81%E7%94%A8/%E5%90%AF%E7%94%A8%E4%BC%98%E5%8C%96)
-   [调试行](/documentation/zh-cn/unreal-engine/visual-studio-tips-and-tricks-in-unreal-engine#%E8%B0%83%E8%AF%95%E8%A1%8C)
-   [调试文本](/documentation/zh-cn/unreal-engine/visual-studio-tips-and-tricks-in-unreal-engine#%E8%B0%83%E8%AF%95%E6%96%87%E6%9C%AC)
-   [枚举转换为字符串](/documentation/zh-cn/unreal-engine/visual-studio-tips-and-tricks-in-unreal-engine#%E6%9E%9A%E4%B8%BE%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%AD%97%E7%AC%A6%E4%B8%B2)
-   [修复配置组合框宽度](/documentation/zh-cn/unreal-engine/visual-studio-tips-and-tricks-in-unreal-engine#%E4%BF%AE%E5%A4%8D%E9%85%8D%E7%BD%AE%E7%BB%84%E5%90%88%E6%A1%86%E5%AE%BD%E5%BA%A6)
-   [加速Visual Studio 2019](/documentation/zh-cn/unreal-engine/visual-studio-tips-and-tricks-in-unreal-engine#%E5%8A%A0%E9%80%9Fvisualstudio2019)
-   [调试较慢](/documentation/zh-cn/unreal-engine/visual-studio-tips-and-tricks-in-unreal-engine#%E8%B0%83%E8%AF%95%E8%BE%83%E6%85%A2)
-   [Perforce Visual Studio历史记录将显示上述每种方法](/documentation/zh-cn/unreal-engine/visual-studio-tips-and-tricks-in-unreal-engine#perforcevisualstudio%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E5%B0%86%E6%98%BE%E7%A4%BA%E4%B8%8A%E8%BF%B0%E6%AF%8F%E7%A7%8D%E6%96%B9%E6%B3%95)
-   [打开解决方案或调试时，Visual Studio较慢](/documentation/zh-cn/unreal-engine/visual-studio-tips-and-tricks-in-unreal-engine#%E6%89%93%E5%BC%80%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%E6%88%96%E8%B0%83%E8%AF%95%E6%97%B6%EF%BC%8Cvisualstudio%E8%BE%83%E6%85%A2)