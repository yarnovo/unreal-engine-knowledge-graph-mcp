# 在虚幻引擎中设置SteamVR输入系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/set-up-the-steamvr-input-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:45:23.603Z

---

目录

![设置SteamVR输入系统](https://dev.epicgames.com/community/api/documentation/image/22d3b2df-b598-4067-94e7-a2d21b8434f1?resizing_type=fill&width=1920&height=335)

![EditDefaultUE4Bindings.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/857d864f-bc4c-430f-b040-b00eae1806d2/editdefaultue4bindings.png)

虚幻引擎4的输入操作和事件系统现在包含对SteamVR输入系统的实验性支持。用户可用SteamVR输入系统为最喜欢的游戏构建绑定配置，甚至可为游戏编写时并不存在的控制器构建绑定配置。启用后，UE4输入设置中定义的操作和轴映射可绑定至SteamVR绑定编辑器工具中的设备。

欲知更多信息，请参阅Steam的SteamVR输入系统初始公告：[控制器：介绍SteamVR输入](https://steamcommunity.com/games/250820/announcements/detail/3809361199426010680)

为保持与现有项目的向后兼容性，默认情况下新SteamVR输入系统的支持已禁用。

## 步骤

1.  新SteamVR输入系统与现有项目不兼容，因此必须显式启用。若要启用SteamVR输入，请在虚幻引擎的 **ConsoleVariables.ini** 文件(*\\Engine\\Config\\ConsoleVariables.ini*)中将控制台变量 *\*vr.SteamVR.EnableVRInput* 设为 *1*。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61c97b7a-66f5-494b-a7ac-9b87fc68676c/consolevariablesini.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61c97b7a-66f5-494b-a7ac-9b87fc68676c/consolevariablesini.png)
    
    点击查看大图。
    
2.  在 **项目设置（Project Settings）> 引擎（Engine）> 输入（Input）> 绑定（Bindings）** 下，为要处理的输入操作设置[操作和轴映射](https://www.unrealengine.com/en-US/blog/input-action-and-axis-mappings-in-ue4)。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7410c052-01cf-4a20-b711-8b80ed85f653/steamvr_bindings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7410c052-01cf-4a20-b711-8b80ed85f653/steamvr_bindings.png)
    
    点击查看大图。
    
    由于最终按键绑定在SteamVR中是通过 **输入绑定（Input Bindings）** 来执行，因此只要将某些按键绑定至各个操作和轴即可，实际指定给 **输入操作和轴映射（Input Action and Axis Mappings）** 的按键无关紧要。
    
3.  保存设置，并重新启动SteamVR和虚幻编辑器。
    
    停止SteamVR后，还可能需要编辑 *C:\\Program Files (x86)\\Steam\\config\\steamvr.vrsettings*，移除为虚幻编辑器生成的操作清单设置缓存数据块。
    
4.  在 **SteamVR** 的 **设备（Devices）** 下，点击 **控制器输入绑定（Controller Input Binding）**。在上方，运行中应用程序的下面，找到您的应用程序。使用UI创建一些绑定，然后保存。
    

-   在 **SteamVR beta** 下，选择 **设备（Devices）**，然后选择 **控制器输入绑定（Controller Input Bindings）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f561b7af-ca18-4a60-9b5c-916dc5b28ab5/steamvrinput_controllerinputbindings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f561b7af-ca18-4a60-9b5c-916dc5b28ab5/steamvrinput_controllerinputbindings.png)
    
    点击查看大图。
    
-   选择应用程序的绑定进行编辑(UE4EDITOR.EXE)。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c09ec52e-6df0-4eb9-9f7f-06f1f1185768/steamvrinput_applicationtoedit.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c09ec52e-6df0-4eb9-9f7f-06f1f1185768/steamvrinput_applicationtoedit.png)
    
    点击查看大图。
    
-   选择 **编辑（Edit）** 编辑现有绑定。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91d7ed4b-1786-4162-8d1a-597d5313112a/steamvrinput_changebindingsforapplication.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91d7ed4b-1786-4162-8d1a-597d5313112a/steamvrinput_changebindingsforapplication.png)
    
    点击查看大图。
    
-   更改现有绑定并进行保存。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc0f69f3-f42e-41bd-b2ae-d35f4445059b/steamvrinput_editbindings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc0f69f3-f42e-41bd-b2ae-d35f4445059b/steamvrinput_editbindings.png)
    
    点击查看大图。
    

**关于2D轴（About 2D Axes）**：虚幻引擎只有1维轴输入，而Steam支持最多3维输入。如果在输入设置中定义了绑定到同一控制器对应X和Y的两个轴，则可纠正此不匹配。举例而言，假设 *MoveRight* 绑定至 *Motion Controller Thumb Stick X*，而 *MoveForward* 绑定至 *Motion Controller Thumb Stick Y*。SteamVR控制器实际上将生成三个操作，即一个名为 *MoveRight* 的 *vector1* 操作，一个名为 *MoveForward* 的 *vector1* 操作，以及一个名为 *MoveRightForward* 的组合 *vector2* 操作。而根据需要的输入类型（1维或2维），您可选择仅绑定其中一项，或两项皆绑定。

## 最终结果

使用[操作输入API](https://www.unrealengine.com/en-US/blog/input-action-and-axis-mappings-in-ue4)操作的游戏现在应对SteamVR输入系统中定义的绑定作出响应。

-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/set-up-the-steamvr-input-system-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/set-up-the-steamvr-input-system-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)