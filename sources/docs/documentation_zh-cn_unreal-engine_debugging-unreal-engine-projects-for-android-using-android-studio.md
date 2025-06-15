# 使用Android Studio调试虚幻引擎Android项目 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/debugging-unreal-engine-projects-for-android-using-android-studio
> 
> 生成时间: 2025-06-14T19:59:35.250Z

---

目录

![调试Android项目](https://dev.epicgames.com/community/api/documentation/image/ad92ba4c-c091-4340-8db9-71dbe16b3249?resizing_type=fill&width=1920&height=335)

虚幻引擎(UE)允许您使用Android Studio调试UE4项目中使用的C++和Java代码。在下面的教程中，我们将了解如何设置Android Studio，以便它可以用于调试UE Android项目。

## 减少迭代时间

为了在迭代中缩短Android项目的编译时间，可以对项目进行设置以避免在 `.apk` 中打包 `libUnreal.so`，而是将其推送到设备的内部文件目录中。这可以跳过Grandle并避免每次更改都要重装 `.apk`。要实现以上目的，请打开项目的 `*Engine.ini` 文件并添加以下行：

\*Engine.ini

```cpp
	[[/Script/AndroidRuntimeSettings.AndroidRuntimeSettings]
	bDontBundleLibrariesInAPK=True
```

如果你直接使用了虚幻编译工具，也可以传递 `-ForceDontBundleLibrariesInAPK=true` 以启用此设置。

在选择了该设置后，非发布构建的AGDE和Quick Launch都会启用它。发布构建仍然会将 `libUnreal.so` 打包进 `.apk`。

## 设置Android Studio

要Android Studio以调试UE项目，请按以下步骤操作：

1.  如果你还没有这样做，请下载并安装与当前虚幻引擎版本兼容的Android Studio版本。请参考[开发要求](/documentation/404)，了解应该使用哪个版本；参考[Android SDK和NDK设置指南](/documentation/404)，了解如何设置您的环境。
    
2.  接下来，构建要调试的 `APK`，然后将其部署到用于调试的Android设备上。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/966e51eb-3700-47d5-93a8-e9bc440dcc04/ue5_1-01-select-package-project.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/966e51eb-3700-47d5-93a8-e9bc440dcc04/ue5_1-01-select-package-project.png)
    
    点击查看大图
    
3.  打开Android Studio Launcher，从显示的选项中，选择 **打开现有的Android Studio项目（Open an existing Android Studio Project）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af46e6a5-ae2e-4d2c-a266-974b9b6070e7/androiddebugging_01.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af46e6a5-ae2e-4d2c-a266-974b9b6070e7/androiddebugging_01.png)
    
    点击查看大图
    
4.  在 **打开文件或项目（Open File or Project）** 菜单中，导航到 **C:\\YourProjectName\\Intermediate\\Android\\APK\\Gradle**，选择 **Gradle** 目录，然后按下 **确定（OK）** 按钮。
    
    ![找到Grandle目录](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9b403c0-ae6f-471d-bb39-b5e68ea85a78/androiddebugging_02.png "Navigate to Grandle directory")
5.  打开Android Studio后，前往 **运行菜单（Run Menu）**，并选择 **编辑配置（Edit Configurations）** 选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f05ff3e3-495e-4e02-8ebf-6765f48755c6/androiddebugging_03.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f05ff3e3-495e-4e02-8ebf-6765f48755c6/androiddebugging_03.png)
    
    点击查看大图
    
6.  单击 **调试器（Debugger）** 选项卡，并将调试类型设置为 **双（Dual）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e998a9a-5e51-4e3b-8593-2e5148b22291/androiddebugging_04.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e998a9a-5e51-4e3b-8593-2e5148b22291/androiddebugging_04.png)
    
    点击查看大图
    
7.  接下来，转到 **LLDB启动命令（LLDB Startup Command）** 选项卡，按下 **加号（plus）** 图标(+)然后输入以下一行，同时按下 **确定（OK）** 按钮以完成此过程。
    
    ```cpp
        命令脚本导入 "C:\PathToYourUE4EngineInstall\Engine\Extras/LLDBDataFormatters\UE4DataFormatters_2ByteChars.py"
    ```
    
    请注意，在C++代码中，应使用TEXT（"string"）替代L（"string"）。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e56fce2-59ba-4656-88be-b80ae545f535/androiddebugging_05.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e56fce2-59ba-4656-88be-b80ae545f535/androiddebugging_05.png)
    
    点击查看大图
    
    请务必按下 **回车（Enter）** 键，否则命令不会执行。
    
8.  现在，打开项目的任意一个.cpp文件，并将断点添加到要调试的项目。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b64a8440-6c8f-4818-8d33-3ff5ae06c575/androiddebugging_10.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b64a8440-6c8f-4818-8d33-3ff5ae06c575/androiddebugging_10.png)
    
    点击查看大图
    
9.  在主菜单中，选择 **运行（Run）** > **调试（Debug）'app-app'**。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b70af7fa-8d94-4a55-b146-704a9ed4b8a5/androiddebugging_06.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b70af7fa-8d94-4a55-b146-704a9ed4b8a5/androiddebugging_06.png)

点击查看大图

1.  当显示 **选择部署类型（Select Deployment Type）** 窗口时，从列表中选择你的设备并按下 **确定（OK）** 按钮。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf030490-ed1b-43e7-9750-50120174b89b/androiddebugging_07.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf030490-ed1b-43e7-9750-50120174b89b/androiddebugging_07.png)

点击查看大图

## 最终结果

完成上述步骤后，等待调试器附加到你的Android设备。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92187016-14ad-42fd-85a6-941aa5341e34/androiddebugging_08.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92187016-14ad-42fd-85a6-941aa5341e34/androiddebugging_08.png)

点击查看大图

根据项目的大小，调试器可能需要一些时间来进行附加。如果没有使用 **在APK内打包数据（Package data inside APK）** 选项，这样做也 **不会** 在设备上安装数据。这样做会减慢重新部署调试的速度，因为APK会更大。另一种选择是，在使用Android Studio进行调试之前，首先在编辑器上执行 **启动**，以在设备上安装当前关卡。或者，如果您需要的不仅仅是当前关卡数据，则可以在设备上打包和安装OBB。

-   [development](https://dev.epicgames.com/community/search?query=development)
-   [debugging](https://dev.epicgames.com/community/search?query=debugging)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [减少迭代时间](/documentation/zh-cn/unreal-engine/debugging-unreal-engine-projects-for-android-using-android-studio#%E5%87%8F%E5%B0%91%E8%BF%AD%E4%BB%A3%E6%97%B6%E9%97%B4)
-   [设置Android Studio](/documentation/zh-cn/unreal-engine/debugging-unreal-engine-projects-for-android-using-android-studio#%E8%AE%BE%E7%BD%AEandroidstudio)
-   [最终结果](/documentation/zh-cn/unreal-engine/debugging-unreal-engine-projects-for-android-using-android-studio#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)