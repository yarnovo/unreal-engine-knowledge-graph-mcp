# 为移动平台设置虚幻引擎项目 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-an-unreal-engine-project-for-mobile-platforms
> 
> 生成时间: 2025-06-14T19:58:34.844Z

---

目录

![创建移动项目](https://dev.epicgames.com/community/api/documentation/image/9d3d98aa-487a-4dba-95d4-7567e69aca6c?resizing_type=fill&width=1920&height=335)

本指南详细介绍了如何设置移动平台的新 **虚幻引擎** 游戏项目。移动设备有广泛的规格，一些设备可能支持更强大的渲染功能，而这里详述的设置适用于最广泛的新项目。

## 1\. 项目设置

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac601f34-1309-46b7-957e-8d228a3f945f/projectsettings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac601f34-1309-46b7-957e-8d228a3f945f/projectsettings.png)

点击查看大图。

1.  打开 **虚幻编辑器（Unreal Editor）** 。**虚幻项目浏览器（Unreal Project Browser）** 出现后，点击 **游戏（Games）** 。
    
2.  按如下所示配置项目：
    
    -   **项目模板（Project Template）：** 自上而下（Top Down）
        
    -   **目标平台（Target Platform）：** 移动（Mobile）
        
    -   **质量预设（Quality Preset）：** 可伸缩（Scalable）
        
    -   **项目名称（Project Name）：** MobileTestGame
        

你可以创建使用 **蓝图（Blueprint）** 或 **C++** 的项目。

1.  点击 **创建（Create）** 以创建项目并在虚幻编辑器（Unreal Editor）中打开。

## 2\. 项目默认值概述

本小节详细介绍了之前小节中的项目默认值，以及为什么针对新移动项目推荐这些默认值。

### 项目模板：自上而下

虽然移动用户界面配备了所有游戏模板，但自上而下游戏的点击式界面仍然非常适合触摸屏使用。你还可以很轻松地使用第三人称模板。

### C++项目与纯蓝图比较

纯蓝图项目可以发布到iOS和Android，但许多用于配置这些平台的功能仅在C++中提供。

-   你可以使用纯蓝图项目在iOS设备上编译和测试iOS项目，甚至可以从Windows设备进行编译和测试。但是，iOS应用程序需要Xcode来对项目进行签名和预配，才能在App Store上发布，所以你需要安装有Xcode的Mac来最终发布你的游戏。
    
-   使用C++项目时，Android项目可受益于更多的调试选项和工具。
    

### 目标平台：移动

选择 **移动（Mobile）** 作为目标硬件将禁用完全不受移动设备支持、通常不受支持或者由于占用过多资源而不适合虚幻引擎支持的较低端移动设备的几个功能。

-   **引擎 - 渲染（Engine – Rendering）**
    
    -   泛光已禁用。
        
    -   单独半透明已禁用。
        
    -   动态模糊已禁用。
        
    -   环境光遮蔽已禁用。
        
    -   抗锯齿方法已设置为无。
        
-   **项目 - 地图和模式（Project – Maps and Modes）**
    
    -   使用分屏已禁用。
-   **Slate**
    
    -   显式画布子ZOrder已启用。

### 质量预设：可伸缩

**可伸缩（Scalable）** 设置提供了最简渲染功能集，禁用了多个后期处理，并且更看重性能而不是保真度。

-   **引擎 - 渲染（Engine – Rendering）**
    
    -   动态模糊已禁用。
        
    -   自动曝光已禁用。
        
    -   抗锯齿方法已设置为无。
        

你可以在 **项目设置（Project Settings）** > **目标硬件（Target Hardware）** 中更改目标平台和质量预设。你还可以根据项目的需要更改个别设置，也可以根据各个设备的情况，在[设备描述](/documentation/zh-cn/unreal-engine/setting-up-device-profiles-in-unreal-engine)中覆盖设置。

## 3\. 为Android设置你的项目

如需了解关于为Android设置你的项目的完整详细信息，请参阅[Android快速入门指南](/documentation/zh-cn/unreal-engine/setting-up-unreal-engine-projects-for-android-development)。下面是所需步骤的摘要：

1.  安装与虚幻引擎兼容的最新版本 **Android Studio** 。请参阅[Android开发要求](/documentation/404)页面，了解与你的当前虚幻引擎版本兼容的Android Studio、SDK和NDK版本。请参阅Android SDK和NDK设置指南，了解Android Studio中需要的特定设置。
    
2.  运行位于引擎的 **Extras** > **Android** 文件夹中的 `SetupAndroid.bat` 、 `SetupAndroid.command` 或 `SetupAndroid.sh` 脚本。
    
3.  打开 **项目设置（Project Settings）** > **Android** ，找到为Android平台配置项目的提示符，然后点击 **立即配置（Configure Now）** 。这会将 `Build/Android` 文件夹添加到你的项目。
    
4.  如果你尚未接受Android SDK许可证，那么还需要点击项目设置（Project Settings）中的 **接受SDK许可证（Accept SDK License）** 。
    
5.  如果你需要支持Google Play Store，请向下滚动到 **Google Play Services** 分段，找到配置Google Play的提示符，然后点击 **立即配置（Configure Now）** 。
    
6.  使用格式为 `com.(OrganizationName).(ProjectName)` 的反向域样式的字符串添加 **Android包名** 。对于本示例项目，包名为 `com.YourCompany.MobileTestGame` 。
    
7.  在 **开发人员模式（Developer Mode）** 下设置你的Android设备，然后通过Wi-Fi将其连接到你的局域网，或使用USB电缆将其连接到你的计算机。请参阅[为开发设置你的Android设备](/documentation/zh-cn/unreal-engine/setting-up-your-android-device-for-developing-applications-in-unreal-engine)，了解更多详细信息。
    

## 4\. 为iOS设置你的项目

要为iOS编译项目，你需要Apple开发者账户和安装有Xcode的MacOS计算机。如需了解关于为iOS设置你的项目的完整详细信息，请参阅[iOS快速入门指南](/documentation/zh-cn/unreal-engine/setting-up-an-unreal-engine-project-for-ios)。下面是所需步骤的摘要：

1.  在 **Xcode** > **偏好设置（Preferences）** > **账户（Accounts）** 中使用你的 **开发者账户（Developer Account）** 连接Xcode。
    
2.  使用USB线，将你的iOS设备连接到Mac，然后在 **窗口（Window）** > **设备和模拟器（Devices and Simulators）** 中将Xcode连接到你的设备。
    
3.  在你的 **Apple开发者页面（Apple Developer page）** 上为你的应用创建一个 **标识符（应用ID）（Identifier (App ID)）** 。对于 **束标识符（Bundle Identifier）** ，提供格式为 `com.(OrganizationName).(ProjectName)` 的反向域字符串。对于本示例项目，包名为 `com.YourCompany.MobileTestGame` 。
    
4.  在Apple开发者页面上注册你的设备。
    
5.  将Xcode设置为针对你的项目 **自动管理代码签名（automatically manage code signing）** 。确保 **束标识符（Bundle Identifier）** 使用你在应用ID中使用的相同名称。
    
6.  在Apple开发者页面上使用你的标识符、Xcode生成的签名证书和你的注册设备创建 **预配配置文件（Provisioning Profile）** 。将其下载到方便的位置，然后点击它并拖到侧边栏中的Xcode上。
    
7.  在 **虚幻编辑器（Unreal Editor）** 中打开你的项目。在 **项目设置（Project Settings）** > **平台（Platforms）** > **iOS** 中，将 **束标识符（Bundle Identifier）** 设置为你在应用ID中使用的相同名称。在编辑器发现你的预配配置文件和签名证书后，选中各自的复选框。
    

## 5\. 在设备上测试你的项目

要在设备上测试你的项目，请使用USB电缆将其连接到你的计算机，然后点击 **平台（Platforms）** 下拉菜单。你的设备应该会显示在 **快速启动（Quick Launch）** 分段中。如果你点击设备的名称，虚幻引擎将编译你的项目并将其部署到该设备。

## 6\. 最终效果

执行本指南中的步骤后，你的移动项目现已准备好在Android和iOS上编译、部署和测试。

-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [ios](https://dev.epicgames.com/community/search?query=ios)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [platform](https://dev.epicgames.com/community/search?query=platform)
-   [tvos](https://dev.epicgames.com/community/search?query=tvos)
-   [ipados](https://dev.epicgames.com/community/search?query=ipados)
-   [project setup](https://dev.epicgames.com/community/search?query=project%20setup)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1\. 项目设置](/documentation/zh-cn/unreal-engine/setting-up-an-unreal-engine-project-for-mobile-platforms#1%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [2\. 项目默认值概述](/documentation/zh-cn/unreal-engine/setting-up-an-unreal-engine-project-for-mobile-platforms#2%E9%A1%B9%E7%9B%AE%E9%BB%98%E8%AE%A4%E5%80%BC%E6%A6%82%E8%BF%B0)
-   [项目模板：自上而下](/documentation/zh-cn/unreal-engine/setting-up-an-unreal-engine-project-for-mobile-platforms#%E9%A1%B9%E7%9B%AE%E6%A8%A1%E6%9D%BF%EF%BC%9A%E8%87%AA%E4%B8%8A%E8%80%8C%E4%B8%8B)
-   [C++项目与纯蓝图比较](/documentation/zh-cn/unreal-engine/setting-up-an-unreal-engine-project-for-mobile-platforms#c++%E9%A1%B9%E7%9B%AE%E4%B8%8E%E7%BA%AF%E8%93%9D%E5%9B%BE%E6%AF%94%E8%BE%83)
-   [目标平台：移动](/documentation/zh-cn/unreal-engine/setting-up-an-unreal-engine-project-for-mobile-platforms#%E7%9B%AE%E6%A0%87%E5%B9%B3%E5%8F%B0%EF%BC%9A%E7%A7%BB%E5%8A%A8)
-   [质量预设：可伸缩](/documentation/zh-cn/unreal-engine/setting-up-an-unreal-engine-project-for-mobile-platforms#%E8%B4%A8%E9%87%8F%E9%A2%84%E8%AE%BE%EF%BC%9A%E5%8F%AF%E4%BC%B8%E7%BC%A9)
-   [3\. 为Android设置你的项目](/documentation/zh-cn/unreal-engine/setting-up-an-unreal-engine-project-for-mobile-platforms#3%E4%B8%BAandroid%E8%AE%BE%E7%BD%AE%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE)
-   [4\. 为iOS设置你的项目](/documentation/zh-cn/unreal-engine/setting-up-an-unreal-engine-project-for-mobile-platforms#4%E4%B8%BAios%E8%AE%BE%E7%BD%AE%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE)
-   [5\. 在设备上测试你的项目](/documentation/zh-cn/unreal-engine/setting-up-an-unreal-engine-project-for-mobile-platforms#5%E5%9C%A8%E8%AE%BE%E5%A4%87%E4%B8%8A%E6%B5%8B%E8%AF%95%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE)
-   [6\. 最终效果](/documentation/zh-cn/unreal-engine/setting-up-an-unreal-engine-project-for-mobile-platforms#6%E6%9C%80%E7%BB%88%E6%95%88%E6%9E%9C)