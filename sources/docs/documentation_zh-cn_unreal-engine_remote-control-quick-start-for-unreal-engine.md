# 虚幻引擎远程控制快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/remote-control-quick-start-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:35:55.164Z

---

目录

![远程控制快速入门](https://dev.epicgames.com/community/api/documentation/image/b608822f-df7a-46fe-90e1-28730c0aa559?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

此页面上的说明介绍远程控制API入门的分步指南。学完本教程将了解如何设置项目以聆听来自网页应用程序的传入请求，并可以准备开始提出自己的请求。

**先决条件：**

-   远程控制API服务器使用端口 `8080` 监听传入的HTTP请求。如果此端口不可用，你可以在 **项目设置** 的 **Web远程控制（Web Remote Control）** 中更改 **远程控制HTTP服务器端口（Remote Control HTTP Server Port）**。
-   必须初步了解如何从网页客户端向HTTP服务器端点发出承载JSON有效负载的请求。
-   此页面上的步骤使用一个由 **蓝图第三人称** 模板设置的项目。基本上同样的步骤可以用于任何项目。但是，如果项目未使用与该模板相同的天空设置，那么在步骤[3 - 发送请求](/documentation/zh-cn/unreal-engine/remote-control-quick-start-for-unreal-engine#3-%E5%8F%91%E9%80%81%E8%AF%B7%E6%B1%82)中的具体对象路径和请求可能会无效。

**不要尝试将虚幻引擎应用程序的主机名和端口对公共互联网开放。**这样使项目和计算机容易遭到第三方恶意行为的侵害。

应只在局域网（LAN）内部或通过安全的虚拟专用网（VPN）使用网页远程控制系统。

## 1 - 建立项目

要开始发出网页远程控制请求，需先安装 **远程控制（Remote Control）** 插件。

### 步骤

1.  在虚幻编辑器中，打开使用网页远程控制的项目。
    
2.  在主菜单中，选择 **编辑（Edit）> 插件（Plugins）** 来打开 **插件（Plugins）** 窗口。
    
3.  在 **插件（Plugins）** 窗口中，在 **消息（Messaging）** 类别中找到 **远程控制API（Remote Control API）** 插件。选中 **启用（Enabled）** 勾选框。
    
    ![启用远程控制API插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4b1a1b7-4209-475f-8dd1-a586e8c28f3e/plugin-enable.png "Enable the Remote Control API Plugin")
4.  点击 **是（Yes）** 接受此插件仍为测试版本的警告。
    
5.  点击 **立即重启（Restart Now）** 重启虚幻编辑器，并重新打开项目。
    

### 最终结果

在虚幻编辑器中重新打开项目后，即可启动网页远程控制服务器。

## 2 - 管理服务器

网页远程控制系统依赖于由虚幻编辑器进程启动和管理的网页服务器。为安全起见，此服务器仅在显式启动时运行。要控制该服务器何时运行，可使用几个简单的控制台命令：

命令

说明

`WebControl.StartServer`

启动网页服务器并开始在端口 `30010` 上聆听传入请求。

`WebControl.StopServer`

停止网页服务器，禁止再处理任何对虚幻编辑器实例的请求。

`WebControl.EnableServerOnStartup`

每当此项目在虚幻引擎中以任何支持的模式打开（在虚幻编辑器主窗口中、在编辑器中运行（PIE）会话中、或在虚幻编辑器的 `-游戏` 模式下）时，便自动启动Web服务器。

现在，我们就在编辑器主窗口中启动该服务器。

### 步骤

1.  在主菜单中，选择 **窗口（Window）> 开发者工具（Developer Tools）> 输出日志（Output Log）**。
    
2.  在 **Cmd** 栏中，输入控制台命令 `WebControl.StartServer`。
    
    ![启动服务器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f2917ed-67c0-41a0-b7cc-be667662f110/start-server.png "Start the Server")
3.  将显示一条消息，表示服务器正在运行：
    
    ![网页远程控制服务器已启动](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b28fa0b-e307-4162-9855-cc47decf878b/server-running.png "Web Remote Control server started")

### 最终结果

服务器在运行后，即可开始对它输送请求。

## 3 - 发送请求

我们建议从尽可能简单的用例开始，发出初始请求。

-   使用专门用于测试API请求和响应的工具，例如[Insomnia](https://insomnia.rest/)或[Postman](https://www.getpostman.com/)。这样可以方便确认自己为请求正确构造了JSON有效负载。对网络远程控制端点的工作情况和它们提供的响应类型感到满意后，可将对这些端点的调用合并到自己的网页应用程序中。
    
-   首先在用来在编辑器中运行项目的计算机上，本地发出第一批请求。确定这些请求有效后，可从连接到本地网络的其他计算机或设备上的客户端发出请求。
    

### 步骤

1.  在网页客户端应用中，设置拥有以下代码的请求：
    
    ```cpp
            {
                "objectPath" : "/Game/ThirdPersonBP/Maps/ThirdPersonExampleMap.ThirdPersonExampleMap:PersistentLevel.LightSource_0.LightComponent0",
                "access":"READ_ACCESS",
                "propertyName":"RelativeRotation"
            }
    		
    ```
    
    此请求将询问关卡的主要定向光源（在 **世界大纲视图** 中名为 **光源（Light Source）** 的Actor）上 `RelativeRotation` 属性的当前值。
    
2.  将该消息以 `PUT` 请求的形式发送给下列端点：
    
    ```cpp
            http://localhost:30010/remote/object/property
    		
    ```
    
3.  你应该能在你的网络客户端中看到一条响应，其中包含状态码以及你请求的信息：
    
    ```cpp
            {
                "RelativeRotation": {
                    "Pitch": -66.3094,
                    "Yaw": 7.72808,
                    "Roll": -6.48224
                }
            }
    		
    ```
    
4.  如选择 **光源（Light Source）** Actor并查看 **细节（Details）** 面板，将看到响应中的值与该处显示的值匹配：
    
    ![定向光源组件变换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1efb5c4-2d54-4594-8868-afdaf3270455/light-component-transform.png "Directional Light Component Transform")
    
    这展示了网页远程控制系统能够如何将对象（在此例中是一个矢量）分解为JSON值，从而与网页应用程序进行交换。
    
5.  接下来，我们将远程更改这个光源的旋转。
    
    此属性在引擎源代码中定义为 `BlueprintReadOnly`：
    
    ```cpp
        /** Rotation of the component relative to its parent */
        UPROPERTY(EditAnywhere, BlueprintReadOnly, ReplicatedUsing=OnRep_Transform, Category=Transform)
        FRotator RelativeRotation;
    
    ```
    
    这意味着我们需调用由同一对象公开的 `BlueprintCallable` 函数才能修改它。可以在 `Engine/Source/Runtime/Engine/Classes/Components/SceneComponent.h` 文件中找到此定义：
    
    ```cpp
        /**
         * 设置组件相对于其父项的旋转
         * @param NewRotation		组件相对于其父项的新旋转
         * @param SweepHitResult	如扫描为true，来自任意影响的命中结果。
         * @param bSweep			是否对目标位置进行扫描（当前不支持旋转）。
         * @param bTeleport			是否传送物理状态（如此对象已启用物理碰撞）。
         *							如为true，此对象的物理速度则不会发生改变（因此布偶部件不会受位置变化影响）。
         *							如为false，则基于位置变化更新物理速度（会影响布偶部件）。
         */
        UFUNCTION(BlueprintCallable, Category="Utilities|Transformation", meta=(DisplayName="SetRelativeRotation", ScriptName="SetRelativeRotation", AdvancedDisplay="bSweep,SweepHitResult,bTeleport"))
        void K2_SetRelativeRotation(FRotator NewRotation, bool bSweep, FHitResult& SweepHitResult, bool bTeleport);
        void SetRelativeRotation(FRotator NewRotation, bool bSweep=false, FHitResult* OutSweepHitResult=nullptr, ETeleportType Teleport = ETeleportType::None);
        void SetRelativeRotation(const FQuat& NewRotation, bool bSweep=false, FHitResult* OutSweepHitResult=nullptr, ETeleportType Teleport = ETeleportType::None);
    
    ```
    
6.  设置拥有下列代码的请求：
    
    ```cpp
            {
                "objectPath" :"/Game/ThirdPersonBP/Maps/ThirdPersonExampleMap.ThirdPersonExampleMap:PersistentLevel.LightSource_0.LightComponent0",
                "functionName":"SetRelativeRotation",
                "parameters": {
                    "NewRotation": {
                        "Pitch":90,
                        "Yaw":0,
                        "Roll":0
                    }
                },
                "generateTransaction":true
            }
    		
    ```
    
7.  将该消息以 `PUT` 请求的形式发送给下列端点：
    
    ```cpp
            http://localhost:30010/remote/object/call
    		
    ```
    
    此时应会看到关卡中定向光源的角度发生变化，使场景中的对象笼罩在阴影中。
    
    ![定向光源角度已改变](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f60b32a-c830-4ca4-91c0-a82715bf7950/light-rotation-changed.png "Directional Light angle changed")
    
    此时如果返回并重新发出与步骤2中相同的请求，将会收到刚刚设置的更新值。
    
8.  我们要远程调用函数来更新天空，使它考虑太阳的新角度。在此例中，我们将调用在蓝图中 **BP\_Sky\_Sphere** 类中定义的函数：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be58d49b-5bb6-4e2f-b79f-7fc8795659ad/skysphere-refresh-function.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be58d49b-5bb6-4e2f-b79f-7fc8795659ad/skysphere-refresh-function.png)
    
    此函数的作用与在 **SkySphereBlueprint** Actor的 **细节（Details）** 面板中勾选 **刷新材质（Refresh Material）** 框相同。
    
9.  将此消息发送到上文所述的同一端点：
    
    ```cpp
            {
                "objectPath" : "/Game/ThirdPersonBP/Maps/ThirdPersonExampleMap.ThirdPersonExampleMap:PersistentLevel.SkySphereBlueprint",
                "functionName":"RefreshMaterial",
                "generateTransaction":true
            }
    		
    ```
    
    在此例中，函数无需任何输入参数，所以我们可以完全忽略 `parameters` 属性。
    
    将看到关卡中的天空变为夜空：
    
    ![天空材质已更新](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e87d7c1f-1f1d-4182-98dd-6a96fa0b4d8a/sky-updated.png "Sky material updated")

### 最终结果

执行上述步骤后，你便已学习到如何从网页客户端获取运行中虚幻引擎项目内容的相关信息。你也学习到了远程更改项目内容的方法，即从网页客户端发出请求来执行由对象在编辑器环境中公开的函数。在此例中我们更改的是天空。

  ![通过远程控制更改的光照和天空](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5a9cff3-6fa4-4c15-bed5-610fe29ade5d/sky-start.png) ![通过远程控制更改的光照和天空](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24df2a83-1e26-485c-9723-52193b133748/light-rotation-changed.png) ![通过远程控制更改的光照和天空](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2da28946-fb9b-43d5-aa4f-ffc001f4cf09/sky-updated.png)

**通过远程控制更改的光照和天空**

## 4 - 自行尝试

在上述简单过程中使用的两个端点也可以用来对项目内容进行深入的更改。它们的用法还有诸多可学习的部分，请参见[端点参考](/documentation/zh-cn/unreal-engine/remote-control-api-http-reference-for-unreal-engine)了解更多细节和范例。

网络服务器的地址默认设置为127.0.0.1，只能由运行虚幻引擎会话的电脑获取。为了允许其他设备通过远程控制API访问你的虚幻会话框，请将项目 **DefaultEngine.ini** 文件中的 **DefaultBindAddress** 改为你的设备的IP地址。

```cpp
	[HTTPServer.Listeners]
	DefaultBindAddress=0.0.0.0
```

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [remote control](https://dev.epicgames.com/community/search?query=remote%20control)
-   [scripting](https://dev.epicgames.com/community/search?query=scripting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 建立项目](/documentation/zh-cn/unreal-engine/remote-control-quick-start-for-unreal-engine#1-%E5%BB%BA%E7%AB%8B%E9%A1%B9%E7%9B%AE)
-   [步骤](/documentation/zh-cn/unreal-engine/remote-control-quick-start-for-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/remote-control-quick-start-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [2 - 管理服务器](/documentation/zh-cn/unreal-engine/remote-control-quick-start-for-unreal-engine#2-%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [步骤](/documentation/zh-cn/unreal-engine/remote-control-quick-start-for-unreal-engine#%E6%AD%A5%E9%AA%A4-2)
-   [最终结果](/documentation/zh-cn/unreal-engine/remote-control-quick-start-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C-2)
-   [3 - 发送请求](/documentation/zh-cn/unreal-engine/remote-control-quick-start-for-unreal-engine#3-%E5%8F%91%E9%80%81%E8%AF%B7%E6%B1%82)
-   [步骤](/documentation/zh-cn/unreal-engine/remote-control-quick-start-for-unreal-engine#%E6%AD%A5%E9%AA%A4-3)
-   [最终结果](/documentation/zh-cn/unreal-engine/remote-control-quick-start-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C-3)
-   [4 - 自行尝试](/documentation/zh-cn/unreal-engine/remote-control-quick-start-for-unreal-engine#4-%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95)