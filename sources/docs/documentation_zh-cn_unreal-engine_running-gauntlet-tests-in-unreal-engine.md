# 在虚幻引擎中运行Gauntlet测试 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/running-gauntlet-tests-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:41:12.003Z

---

目录

![运行Gauntlet测试](https://dev.epicgames.com/community/api/documentation/image/32960ab0-76b5-4999-b636-a631b9d43136?resizing_type=fill&width=1920&height=335)

## 运行Unreal命令：虚幻引擎（UE）的测试封装包

Gauntlet提供针对虚幻引擎的命令、测试和类，从而处理引擎的各类细节问题。

触发虚幻引擎测试的主要Gauntlet命令是 `RunUnreal` 。该命令利用特定的类来处理虚幻引擎打包的游戏和其他输出。

部分相关的测试已经进行了实施，以推动常见的测试工作流程，包括：

-   `UE.BootTest` 和 `UE.EditorBootTest` - 启动项目客户端或编辑器，然后在初始化完成后退出。
-   `UE.EditorAutomation` 和 `UE.TargetAutomation` - 在编辑器和客户端上运行引擎自动化测试框架。
-   `UE.Networking` - 在目标地图被设为触发 `NetTestGauntletClientController` 或 `NetTestGauntletServerController` 时运行自动化网络测试。
-   `UE.ErrorTest` - 在目标地图被设为触发 `ErrorTest` Gauntlet控制器时为其运行自动化测试。
-   `UE.PLMTest` - 在目标平台上运行进程生命周期管理。

### UE.Automation测试

`UE.Automation.cs` 下的测试简化了从构建系统运行[C++](/documentation/zh-cn/unreal-engine/write-cplusplus-tests-in-unreal-engine)和[功能](/documentation/zh-cn/unreal-engine/functional-testing-in-unreal-engine)测试的方式。

Gauntlet内有一个测试可以在编辑器中运行虚幻引擎功能测试，还有一个打包的游戏（客户端）：`UE.EditorAutomation` 和 `UE.TargetAutomation` 。

#### 编辑器命令行

```cpp
RunUAT.bat RunUnreal -test=UE.EditorAutomation -runtest=Mytest.one -project=<path to uproject> -build=editor
```

#### 客户端命令行

```cpp
RunUAT.bat RunUnreal -test=UE.TargetAutomation -runtest=Mytest.one -project=<path to uproject> -build=<path to packaged game>
```

#### 目标平台命令行

```cpp
RunUAT.bat RunUnreal -test=UE.TargetAutomation -runtest=Mytest.one -project=<path to uproject> -build=<path to packaged game> -platform=<platform> -device=<ip>:<platform>
```

Gauntlet仅可以部署主机和移动设备构建，前提是你实现了相应的 `ITargetDevice` 、 `IDeviceFactory` 、 `IDefaultDeviceSource` 、 `IAppInstall` 和 `IAppInstance`

#### 失败时恢复测试

UE.Automation测试可以在严重故障（如运行过程中崩溃）后恢复测试。此行为是可选的，因为它会强制测试控制器在测试开始前保存JSON文件。

要启用恢复测试的行为，请添加参数 `-ResumeOnCriticalFailure` 。

测试恢复最多发生三次，之后将判定构建过于不稳定而无法继续测试。

## 用命令行向Gauntlet传递参数

你可以用命令行向Gauntlet传递自定义的参数。Gauntlet会自动将所有参数传递给测试类，而你可以通过特定的属性访问这些参数。

你可以使用如下命令行语法：

```cpp
-test="MyTest(foo,bar='some value')"
```

你可以使用如下语法从测试类访问该参数：

```cpp
bool MyBoolFromArgumentLine = Context.TestParams.ParseParam("foo");
string MyValueFromArgumentLine = Context.TestParams.ParseValue("bar", "DefaultValue");
```

你也可以用UAT执行的C#代码来解析全局命令行参数（无论是否有其他代码使用它），使用的语法如下：

```cpp
string MyValueFromArgumentLine = Globals.Params.ParseValue("ArgumentLine", "DefaultValue");
```

## Lyra Gauntlet测试

本节将说明如何运行[Lyra示例游戏](/documentation/zh-cn/unreal-engine/lyra-sample-game-in-unreal-engine)中的现有Gauntlet测试。

### 启动测试节点代码

```cpp
using Gauntlet;

namespace LyraTest
{
	/// <summary>
	/// 简单的启动测试
	/// </summary>
	public class BootTest : UnrealTestNode<UnrealTestConfiguration>
	{
		public BootTest(UnrealTestContext InContext)
		: base(InContext)
		{}

		/// <summary>
		/// 返回BootTest的配置，只需要客户端和合适的
		/// 超时
		/// 测试期望客户端自动退出
		/// </summary>
		/// <returns></returns>
		public override UnrealTestConfiguration GetConfiguration()
		{
			UnrealTestConfiguration Config = base.GetConfiguration();

			// 获取单个客户端
			UnrealTestRole ClientRole = Config.RequireRole(UnrealTargetRole.Client);
			// 触发特定日志消息时退出
			ClientRole.CommandLineParams.Add("testexit", "GauntletHeartbeat: Idle");

			Config.MaxDuration = 5 * 600; // 超时5分钟

			return Config;
		}
	}
}
```

### 运行启动测试样例

1.  打开命令提示符。
2.  将目录更改为虚幻引擎根目录的 `Engine/Build/BatchFiles` 。
3.  在命令提示符中输入下列命令。
    
    ```cpp
         RunUAT BuildCookRun -project=Samples/Games/Lyra/Lyra.uproject -platform=Win64 -configuration=Development -build -cook -pak -stage
    ```
    
4.  该过程完成后，在命令提示符中输入下列命令：
    
    ```cpp
         RunUAT RunUnreal -project=Samples/Games/Lyra -platform=Win64 -configuration=Development -build=local -test=LyraTest.BootTest
    ```
    

### 启动测试流程说明

1.  `BuildCookRun` 将在 `Samples/Games/Lyra/Saved/StagedBuilds` 位置生成Win64版本的Lyra。
2.  `RunUnreal` 启动Gauntlet，并：
    1.  创建 `LyraTest.BootTest` 节点的实例，提供运行测试的基本规则。
    2.  发现Lyra项目的本地版本。
    3.  验证Win64开发版本是否可用。
    4.  启动Lyra。
    5.  监控运行过程中是否存在问题。
    6.  检测到Lyra退出。
    7.  检查常见问题，如崩溃、断言和致命错误等。
3.  如果 `LyraTest.BootTest` 节点证明测试仍在运行且没有错误，则创建摘要报告。

-   [testing](https://dev.epicgames.com/community/search?query=testing)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [automation](https://dev.epicgames.com/community/search?query=automation)
-   [gauntlet](https://dev.epicgames.com/community/search?query=gauntlet)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [运行Unreal命令：虚幻引擎（UE）的测试封装包](/documentation/zh-cn/unreal-engine/running-gauntlet-tests-in-unreal-engine#%E8%BF%90%E8%A1%8Cunreal%E5%91%BD%E4%BB%A4%EF%BC%9A%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%EF%BC%88ue%EF%BC%89%E7%9A%84%E6%B5%8B%E8%AF%95%E5%B0%81%E8%A3%85%E5%8C%85)
-   [UE.Automation测试](/documentation/zh-cn/unreal-engine/running-gauntlet-tests-in-unreal-engine#ueautomation%E6%B5%8B%E8%AF%95)
-   [编辑器命令行](/documentation/zh-cn/unreal-engine/running-gauntlet-tests-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E5%91%BD%E4%BB%A4%E8%A1%8C)
-   [客户端命令行](/documentation/zh-cn/unreal-engine/running-gauntlet-tests-in-unreal-engine#%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%91%BD%E4%BB%A4%E8%A1%8C)
-   [目标平台命令行](/documentation/zh-cn/unreal-engine/running-gauntlet-tests-in-unreal-engine#%E7%9B%AE%E6%A0%87%E5%B9%B3%E5%8F%B0%E5%91%BD%E4%BB%A4%E8%A1%8C)
-   [失败时恢复测试](/documentation/zh-cn/unreal-engine/running-gauntlet-tests-in-unreal-engine#%E5%A4%B1%E8%B4%A5%E6%97%B6%E6%81%A2%E5%A4%8D%E6%B5%8B%E8%AF%95)
-   [用命令行向Gauntlet传递参数](/documentation/zh-cn/unreal-engine/running-gauntlet-tests-in-unreal-engine#%E7%94%A8%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%90%91gauntlet%E4%BC%A0%E9%80%92%E5%8F%82%E6%95%B0)
-   [Lyra Gauntlet测试](/documentation/zh-cn/unreal-engine/running-gauntlet-tests-in-unreal-engine#lyragauntlet%E6%B5%8B%E8%AF%95)
-   [启动测试节点代码](/documentation/zh-cn/unreal-engine/running-gauntlet-tests-in-unreal-engine#%E5%90%AF%E5%8A%A8%E6%B5%8B%E8%AF%95%E8%8A%82%E7%82%B9%E4%BB%A3%E7%A0%81)
-   [运行启动测试样例](/documentation/zh-cn/unreal-engine/running-gauntlet-tests-in-unreal-engine#%E8%BF%90%E8%A1%8C%E5%90%AF%E5%8A%A8%E6%B5%8B%E8%AF%95%E6%A0%B7%E4%BE%8B)
-   [启动测试流程说明](/documentation/zh-cn/unreal-engine/running-gauntlet-tests-in-unreal-engine#%E5%90%AF%E5%8A%A8%E6%B5%8B%E8%AF%95%E6%B5%81%E7%A8%8B%E8%AF%B4%E6%98%8E)