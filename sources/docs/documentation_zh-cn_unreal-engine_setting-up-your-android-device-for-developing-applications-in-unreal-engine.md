# 为开发虚幻引擎应用设置Android设备 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-your-android-device-for-developing-applications-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:01:02.649Z

---

目录

![设置Android设备](https://dev.epicgames.com/community/api/documentation/image/17eeb5e2-f32c-4e00-8789-e8808ee6ddbc?resizing_type=fill&width=1920&height=335)

以下部分将讲述如何设置Android设备，使其能运行您的 **虚幻引擎（UE）** 项目。

## 1\. 将Android USB驱动程序安装到计算机

1.  将Android设备通过USB连接到开发用PC上。
    
2.  设备驱动软件应该会自动安装。如果没有安装，请访问[Android的OEM USB驱动程序](http://developer.android.com/tools/extras/oem-usb.html)页面，寻找更多驱动安装程序链接及其他信息。
    
3.  将Android设备从USB断开，然后立即插回。PC辨识出设备后，Android设备上将出现以下信息，询问是否要允许此PC与设备对话。信息框会询问想要用USB链接做什么。点击 **允许此计算机** 前的 **勾选框**，然后点击 **确认** 按钮。
    

## 2\. 在Android设备上启用开发者模式

1.  在Android设备上打开 **设置（Settings）** 菜单。
    
2.  向下滚动并选择 **关于手机（About Phone）**。根据所使用Android设备的不同，此处可能出现 **关于设备（About Device）**、**关于平板（About Tablet）** 或 **关于Shield（About Shield）** 等选项。
    
    在较新的Android版本中，其可能位于 **更多（More）** 部分中。
    
3.  点按 **版本号（Build Number）** 7次来启动开发者模式。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd36a192-219f-47fe-a3e8-0430c6028532/enable_dev_mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd36a192-219f-47fe-a3e8-0430c6028532/enable_dev_mode.png)
    
4.  启动开发者模式后，屏幕上便会出现类似于下图的成功消息。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e62867d-403c-44a5-981d-f2053f952b32/dev_mode_active.png)

## 3\. 启用USB调试

1.  在Android设备上打开 **设置** 菜单。
    
2.  回到 **设置（Settings）** 菜单中，并选择应已存在与此的 **开发者选项（Developer Options）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24cb2d89-4606-48ec-b32a-05fe2ff879ae/dev_options_enabled.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24cb2d89-4606-48ec-b32a-05fe2ff879ae/dev_options_enabled.png)
    
3.  在 **开发者选项（Developer Options）** 菜单点按中启用 **USB调试（USB debugging）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f97a6b46-bf19-4768-b345-cb18d5b558ec/enable_usb_debugging.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f97a6b46-bf19-4768-b345-cb18d5b558ec/enable_usb_debugging.png)
    
4.  弹出提示后点按 **OK** 键。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0a6e2ce-9c7e-4b20-bb01-5c3c38de9fab/enable_usb_debugging_warning.png)

## 4\. 验证设备是否已连接

可执行以下操作来验证所有内容是否已设置完毕，Android也已能够用于虚幻引擎开发。

1.  按下 **Windows + R** 组合键打开 **运行** 命令框，开启 **Windows命令提示符**。
    
2.  在 **打开** 输入中，键入 **cmd** 并按下 **确认** 按钮打开Windows命令提示符。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/350d1650-78fb-44b9-a4b8-c4683efb3da7/windows_run_command.png)
3.  在Windows命令提示符中输入 **adb devices** 然后按下 **回车** 键显示连接的所有Android设备。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b05e62c6-1c99-4738-9652-718ac5ebedc1/adb_devices.png)

1.  从/Applications/Utilities打开Terminal应用。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffc12544-5316-4fb7-a0f0-879bbc2104b8/mac_terminal_activate.png)
2.  在命令提示符中输入 **adb devices**，就能看到连接到Mac的所有设备。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/323a66af-10ff-4b05-8203-3f1d79547353/mac_checking_adb_devices.png)

输入adb devices命令后如仍未看到设备，可尝试以下操作：

-   如设备已在列表中但名称旁显示有 **未授权**，则说明尚未接受开发PC电脑的RSA密钥指纹。
    
-   如插入并设置设备后其仍未出现，则在Windows命令行弹窗中按以下顺序输入命令并重启 **Android调试桥** 或（ADB）服务：
    
    属性名称
    
    描述
    
    **ADB kill - server**
    
    其将停止ADB服务。
    
    **ADB start - server**
    
    其将开始ADB服务。
    
-   在一些情况下，一个已正确配置的Android设备如果被连接为 **媒体设备（MTP）**，其则有可能不会出现。如出现此情况，请在使用USB的选项中选择"相机（PTP）"选项，将其连接为 **相机（PTP）**。
    

## 最终结果

完成上述步骤后，Android设备就可以用于部署和调试了。如需进一步了解细节，请参阅[Android快速入门指南](/documentation/zh-cn/unreal-engine/setting-up-unreal-engine-projects-for-android-development)，可学习在虚幻引擎中针对Android系统配置项目。

-   [setup](https://dev.epicgames.com/community/search?query=setup)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [platform](https://dev.epicgames.com/community/search?query=platform)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1\. 将Android USB驱动程序安装到计算机](/documentation/zh-cn/unreal-engine/setting-up-your-android-device-for-developing-applications-in-unreal-engine#1%E5%B0%86androidusb%E9%A9%B1%E5%8A%A8%E7%A8%8B%E5%BA%8F%E5%AE%89%E8%A3%85%E5%88%B0%E8%AE%A1%E7%AE%97%E6%9C%BA)
-   [2\. 在Android设备上启用开发者模式](/documentation/zh-cn/unreal-engine/setting-up-your-android-device-for-developing-applications-in-unreal-engine#2%E5%9C%A8android%E8%AE%BE%E5%A4%87%E4%B8%8A%E5%90%AF%E7%94%A8%E5%BC%80%E5%8F%91%E8%80%85%E6%A8%A1%E5%BC%8F)
-   [3\. 启用USB调试](/documentation/zh-cn/unreal-engine/setting-up-your-android-device-for-developing-applications-in-unreal-engine#3%E5%90%AF%E7%94%A8usb%E8%B0%83%E8%AF%95)
-   [4\. 验证设备是否已连接](/documentation/zh-cn/unreal-engine/setting-up-your-android-device-for-developing-applications-in-unreal-engine#4%E9%AA%8C%E8%AF%81%E8%AE%BE%E5%A4%87%E6%98%AF%E5%90%A6%E5%B7%B2%E8%BF%9E%E6%8E%A5)
-   [最终结果](/documentation/zh-cn/unreal-engine/setting-up-your-android-device-for-developing-applications-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)