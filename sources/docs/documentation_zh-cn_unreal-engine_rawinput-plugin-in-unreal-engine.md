# 虚幻引擎RawInput插件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/rawinput-plugin-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:46:01.921Z

---

目录

![RawInput插件](https://dev.epicgames.com/community/api/documentation/image/1f50a3f0-402b-4be3-8483-b0cd2d118afc?resizing_type=fill&width=1920&height=335)

**\*RawInput** 插件为Microsoft XInput API（应用程序编程接口）不能正确处理的特定的用户定义设备提供支持，通常是操纵杆和方向盘。这些输入设备的按钮和轴可以自定义映射到游戏输入，包括插件本身创建的新输入。

## 启用RawInput

默认情况下不启用该插件。您可以在 **插件（Plugins）** 菜单的 **输入设备（Input Devices）** 部分中将其启用。

![RawInput插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29706fd8-d6b6-4da8-a5d5-3ae0bbbe439d/rawinputplugin.png)

启用该插件后，**Raw Input** 部分将出现在 **项目设置（Project Settings）** 菜单中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7ecd677-c3d2-40d1-886f-71e47f5a5c6a/rawinput.png)

## 配置设备

在该部分中，您可以添加新设备。每个设备都通过供应商ID和产品ID标识，这些ID是十六进制值，位于设备的驱动程序属性中。轴（默认为8个）和按钮（默认为12个）数组将添加到控制器配置中。这样您就能够将任何控制器轴或按钮（通过数组索引指示）映射到任何 **虚幻引擎** 轴或键。该插件提供8个新轴（"通用USB控制器轴1"到"通用USB控制器轴8"）和12个新按钮（"通用USB控制器按钮1"到"通用USB控制器按钮20"）。每个轴和按钮都可以启用或禁用，轴也可以调转方向和偏移。

![Windows设备设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47183486-a152-4525-b044-6a427f2bc3d7/windowssettings.png)

在上图中，您可以在Windows控制面板（在设备管理器下面）中看到Logitech G920的硬件ID信息。供应商ID是"VID\_"后面的四位字符串（046D），产品ID是"PID\_"后面的四位字符串（C262）。在RawInput中配置设备时需要该信息。

## 示例（载具模板）

作为示例，我们将 **虚幻引擎** 随附的载具模板配置为使用 **Logitech G920**，这是一个驱动游戏的控制器，带有方向盘和加速/制动踏板。

### 在RawInput中配置设备

驱动程序将方向盘报告为轴1，将制动器报告为轴3，将加速踏板报告为轴4。在RawInput插件设置中，各个输入必须输入到设备驱动程序的对应轴处的数组中。即，方向盘数据必须在数组元素1中，制动器数据必须在数组元素3中，加速踏板数据必须在数组元素4中。所有其他条目可能会被移除或标记为禁用。

需要注意的是，输入的数组索引无需对应于"通用USB控制器轴"或"通用USB控制器输入"值。例如，虽然制动器位于数组位置3中，但绑定的是"通用USB控制器轴2"。这是为了确保将不同的控制器配置为相同的工作方式，即使它们使用不同的输入轴也没有影响。

![RawInput设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de36f981-fbb8-4c6e-a452-6516bb16e3d2/rawinputdata.png)

由于设备输出范围与我们预期的标准控制器输出范围不符，因此将重新映射输入范围。方向盘返回0.0（左）到1.0（右）中的值，但我们需要以0.0为输入范围中间值，因此我们给它设置一个偏移值-0.5。制动器和加速踏板也返回0.0到1.0中的值，但设备使用0.0来指示按下踏板，使用1.0指示踏板抬起，而我们的项目需要相反的设置。为了进行这一调整，我们将轴值调转，然后添加偏移值1.0。

### 将RawInput轴映射到输入绑定

![输入设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e8d950f-cb2d-4319-939c-0e85811f8ddf/inputdata.png)

我们现在可以将新轴映射到游戏输入绑定。方向盘（在"通用USB控制器轴1"上）映射到范围\[-0.5, 0.5\]，但我们希望它更灵敏一些，因此可以按系数3.0将它上调。同样，制动器（在"通用USB控制器轴2"上）需要沿负方向延伸，并且应该比加速踏板力量更强，因此将其调节-2.0。加速踏板（在"通用USB控制器轴3"上）无需修改，只需要添加到相应的输入绑定。通过使用RawInput和添加这些输入绑定，我们无需任何新输入绑定或对项目代码或蓝图进行任何更改，即可支持Logitech G920。

这种缩放用法为使用"通用USB控制器"轴，而不是根据标准游戏手柄操纵杆输入配置设备提供了一个充分的理由。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [input](https://dev.epicgames.com/community/search?query=input)
-   [action mapping](https://dev.epicgames.com/community/search?query=action%20mapping)
-   [axis mapping](https://dev.epicgames.com/community/search?query=axis%20mapping)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用RawInput](/documentation/zh-cn/unreal-engine/rawinput-plugin-in-unreal-engine#%E5%90%AF%E7%94%A8rawinput)
-   [配置设备](/documentation/zh-cn/unreal-engine/rawinput-plugin-in-unreal-engine#%E9%85%8D%E7%BD%AE%E8%AE%BE%E5%A4%87)
-   [示例（载具模板）](/documentation/zh-cn/unreal-engine/rawinput-plugin-in-unreal-engine#%E7%A4%BA%E4%BE%8B%EF%BC%88%E8%BD%BD%E5%85%B7%E6%A8%A1%E6%9D%BF%EF%BC%89)
-   [在RawInput中配置设备](/documentation/zh-cn/unreal-engine/rawinput-plugin-in-unreal-engine#%E5%9C%A8rawinput%E4%B8%AD%E9%85%8D%E7%BD%AE%E8%AE%BE%E5%A4%87)
-   [将RawInput轴映射到输入绑定](/documentation/zh-cn/unreal-engine/rawinput-plugin-in-unreal-engine#%E5%B0%86rawinput%E8%BD%B4%E6%98%A0%E5%B0%84%E5%88%B0%E8%BE%93%E5%85%A5%E7%BB%91%E5%AE%9A)