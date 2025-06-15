# 虚幻引擎OpenXR输入 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/openxr-input-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:43:37.768Z

---

目录

![OpenXR输入](https://dev.epicgames.com/community/api/documentation/image/2328c896-486c-4f6f-aca9-3948ed43221f?resizing_type=fill&width=1920&height=335)

OpenXR运行时使用[交互配置文件](https://www.khronos.org/registry/OpenXR/specs/1.0/html/xrspec.html#semantic-path-interaction-profiles)来支持各种硬件控制器，并为控制器连接到的任何设备提供操作绑定。虚幻引擎中的OpenXR输入映射依赖[操作映射输入系统](/documentation/zh-cn/unreal-engine/input-in-unreal-engine)来将操作连接到OpenXR交互配置文件。有关如何使用操作映射输入系统的指南，请参见[创建新输入](/documentation/zh-cn/unreal-engine/setting-up-user-inputs-in-unreal-engine)。

OpenXR输入系统旨在通过模拟未使用虚幻项目中的 **操作映射（Action Mappings）** 显式指定的任何控制器映射来提供跨设备兼容性。在模拟控制器映射时，OpenXR运行时将会选择与用户控制器密切匹配的控制器绑定。 由于OpenXR提供了这种跨设备兼容性，因此你只需要为你支持并可以进行测试的控制器添加绑定。你为控制器指定的任何绑定都会定义连接到该控制器的操作。如果你仅将绑定部分应用到控制器，则控制器不会支持任何缺失的绑定。 在下例中，项目具有两个操作：**跳跃（Jump）** 和 **拾取（Pickup）**。

-   **跳跃（Jump）** 映射到多种控制器上的键，例如 **Vive Index (L)触发器（Vive Index (L) Trigger）** 和 **Oculus Touch (L)触发器（Oculus Touch (L) Trigger）**。
-   **拾取（Pickup）** 仅映射至 **Valve Index (L) A Touch**。 在这种情况下，OpenXR运行时将不会在任何其他控制器上模拟 **拾取（Pickup）** 操作，因为这些控制器绑定了 **跳跃（Jump）**，但没有绑定 **拾取（Pickup）**。如果从 **跳跃（Jump）** 中移除了其他控制器的键，则OpenXR运行时将无法为模拟器模拟 **跳跃（Jump）** 和 **拾取（Pickup）**。

![示例引擎输入操作映射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48ced5f8-9147-474e-b405-681628ae3ffc/engine_input_2.png)

某些运行时可能支持单个配置，无法模拟其他配置。你应该尽可能多的设备添加绑定。

## 姿势

OpenXR提供了两个姿势来表示用户在执行操作时应该使用的手势：

-   **抓握（Grip）：**表示用户为了抓住虚拟对象而抓握时的位置和方向。
-   **瞄准（Aim）：**表示从用户的手或控制器延伸出的光线，用于指向目标。 如需这两种姿势的详细信息，请参见OpenXR[规格](https://www.khronos.org/registry/OpenXR/specs/1.0/html/xrspec.html)。在虚幻引擎中，如果这两种姿势可供你的设备使用，则表示为动作源，并在调用[枚举动作源](https://docs.unrealengine.com/en-US/BlueprintAPI/Input/MotionTracking/EnumerateMotionSources/index.html)时作为结果返回。

虚幻引擎使用的坐标系与OpenXR规格中规定的坐标系不同。虚幻使用左旋坐标系：+X表示向前，+Z向上，而+Y向右。

启用 **OpenXRMsftHandInteraction** 插件，在支持此扩展插件的运行时上复制所追踪手的OpenXR抓握和瞄准姿势。 ![Openxr hand interaction plugin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2accdeae-6378-471c-8278-ca5945cd2d1b/openxr_hand_iteraction_plugin.png) 

-   [xr](https://dev.epicgames.com/community/search?query=xr)
-   [input](https://dev.epicgames.com/community/search?query=input)
-   [openxr](https://dev.epicgames.com/community/search?query=openxr)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [姿势](/documentation/zh-cn/unreal-engine/openxr-input-in-unreal-engine#%E5%A7%BF%E5%8A%BF)