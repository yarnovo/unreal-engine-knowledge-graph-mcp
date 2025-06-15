# 为Unity开发者准备的虚幻引擎代码编写指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/writing-code-in-unreal-engine-for-unity-developers
> 
> 生成时间: 2025-06-14T18:51:05.689Z

---

目录

![在虚幻引擎中编写代码](https://dev.epicgames.com/community/api/documentation/image/3b9437f4-ac0f-4e1e-a323-63860978b374?resizing_type=fill&width=1920&height=335)

### 设置

### C++

假如要在虚幻引擎（UE）中编写C++代码，你还要在Windows上下载[Visual Studio](https://visualstudio.microsoft.com/downloads/)，或在macOS上[安装Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)。当你创建新的C++项目（时，UE将自动创建Visual Studio项目文件。

从UE项目访问Visual Studio的方法有以下两种：

-   在 **内容浏览器（Content Browser）** 中， **双击** C++类，在Visual Studio中打开。
-   从主菜单，转至 **工具（Tools）** > **打开Visual Studio（Open Visual Studio）** 。仅当你的项目包含至少一个C++类时，才会显示此选项。

UE中有一点很不同：有时必须手动刷新Visual Studio项目文件（例如，下载新版UE后，或手动更改磁盘上的源文件位置时）。要这样做，可以采用以下两种方法：

-   从UE的主菜单，转至 **工具（Tools）> 刷新Visual Studio项目（Refresh Visual Studio Project）** 。
-   **右键点击** 项目的目录中的 **.uproject** 文件，并选择 **生成Visual Studio项目文件（Generate Visual Studio project files）** 。

更多详情请参阅[开发设置](/documentation/zh-cn/unreal-engine/setting-up-your-development-environment-for-cplusplus-in-unreal-engine)。

### 蓝图

如果编写蓝图脚本，则只需要UE。虚幻编辑器已内置了所有功能。

### 编写事件函数

如果你用过MonoBehavior，那你应该熟悉 `Start` 、 `Update` 和 `OnDestroy` 等方法。下面比较了Unity的行为与对应的UE：Actor和组件的行为。

在Unity中，某个基本组件的代码可能是这样：

```cpp
public class MyComponent : MonoBehaviour
{
	void Start() {}
	void OnDestroy() {}
	void Update() {}
}
```

### AActor

在UE中，你可以在Actor本身上编写代码，而不是仅仅对新组件类型编码。

此外，Actor有类似于Unity的 `Start` 、 `OnDestroy` 和 `Update` 方法的方法。如下所示：

#### C++

```cpp
UCLASS()
class AMyActor : public AActor
{
	GENERATED_BODY()

	// 游戏开始时调用。
	void BeginPlay();

	// 销毁时调用。
	void EndPlay(const EEndPlayReason::Type EndPlayReason);

	// 每帧调用以更新此Actor。
	void Tick(float DeltaSeconds);
};
```

#### 蓝图

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f540b5a0-211b-4182-b256-e4dcc93cd6cf/image_29.png)

### UActorComponent

UE中的组件概念与MonoBehaviors类似，但包含不同的方法。

#### C++

```cpp
UCLASS()
class UMyComponent : public UActorComponent
{
	GENERATED_BODY()

	// 在创建所属Actor之后调用
	void InitializeComponent();

	// 在销毁组件或所属Actor时调用
	void UninitializeComponent();

	// 组件版的Tick函数
	void TickComponent(float DeltaTime, enum ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction);
};
```

#### 蓝图

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caa4d96b-7184-4d09-ae52-62f17a0c3aee/image_30.png)

## 其他注意事项

-   在UE中，必须在子项的方法中显式调用父项的方法。例如，在Unity的C#代码中，可能是 `base.Update()`，但在UE的C++代码中，你需要为Actor使用 `Super::Tick()`，或为组件使用 `Super::TickComponent()`。
-   在UE的C++代码中，类有多种前缀，比如 `U` 用于 `UObject` 子类，`A` 用于Actor子类。更多详情，请参阅[代码规范](/documentation/zh-cn/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine)。
-   对于Gameplay代码编写示例，请参阅[在虚幻引擎中创建Gameplay](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers)。

-   [unity](https://dev.epicgames.com/community/search?query=unity)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置](/documentation/zh-cn/unreal-engine/writing-code-in-unreal-engine-for-unity-developers#%E8%AE%BE%E7%BD%AE)
-   [C++](/documentation/zh-cn/unreal-engine/writing-code-in-unreal-engine-for-unity-developers#c++)
-   [蓝图](/documentation/zh-cn/unreal-engine/writing-code-in-unreal-engine-for-unity-developers#%E8%93%9D%E5%9B%BE)
-   [编写事件函数](/documentation/zh-cn/unreal-engine/writing-code-in-unreal-engine-for-unity-developers#%E7%BC%96%E5%86%99%E4%BA%8B%E4%BB%B6%E5%87%BD%E6%95%B0)
-   [AActor](/documentation/zh-cn/unreal-engine/writing-code-in-unreal-engine-for-unity-developers#aactor)
-   [C++](/documentation/zh-cn/unreal-engine/writing-code-in-unreal-engine-for-unity-developers#c++-2)
-   [蓝图](/documentation/zh-cn/unreal-engine/writing-code-in-unreal-engine-for-unity-developers#%E8%93%9D%E5%9B%BE-2)
-   [UActorComponent](/documentation/zh-cn/unreal-engine/writing-code-in-unreal-engine-for-unity-developers#uactorcomponent)
-   [C++](/documentation/zh-cn/unreal-engine/writing-code-in-unreal-engine-for-unity-developers#c++-3)
-   [蓝图](/documentation/zh-cn/unreal-engine/writing-code-in-unreal-engine-for-unity-developers#%E8%93%9D%E5%9B%BE-3)
-   [其他注意事项](/documentation/zh-cn/unreal-engine/writing-code-in-unreal-engine-for-unity-developers#%E5%85%B6%E4%BB%96%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)