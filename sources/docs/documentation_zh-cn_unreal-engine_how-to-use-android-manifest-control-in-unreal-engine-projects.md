# 为虚幻引擎项目设置及使用Android Mainfest文件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-use-android-manifest-control-in-unreal-engine-projects
> 
> 生成时间: 2025-06-14T20:01:04.528Z

---

目录

![Android Manifest控制](https://dev.epicgames.com/community/api/documentation/image/edecd81d-59b6-46fc-8e65-a1be7837b163?resizing_type=fill&width=1920&height=335)

**AndroidManifest.xml** 文件用于存储在"项目设置（Projects Settings）"的 **Advanced APKPackaging** 部分中设置的各种Android系统权限和设置。在以下文档中，我们将阐述如何输入将添加到AndroidManifest.xml文件中的命令，以满足 **虚幻引擎4**（UE4）项目的需求。

## Android Manifest查找

需要先将项目打包或部署到Android设备才能查找项目的AndroidManifest.xml文件。构建或部署好项目后，可以在 **（项目名称）\\Intermediate\\Android\\APK** 中找到AndroidManifest.xml文件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9429884e-499d-4050-be63-9182edd0dcb5/amc_file_location.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9429884e-499d-4050-be63-9182edd0dcb5/amc_file_location.png)

单击查看大图。

在任何情况下都 **绝不能** 编辑AndroidManifest.xml文件。如果AndroidManifest.xml文件需要编辑，应在UE4编辑器的"Advanced APK Packing"部分中进行。

## Android Manifest布局

在典型的AndroidManifest.xml文件中，你将看到以下三个部分：

-   **Application Definition**
-   **Activity**
-   **Requirements**
    
    ```cpp
              <manifest xmlns:android="http://schemas.android.com/apk/res/android"
                  package="com.yourcompany.project"
                  android:versionCode="1"
                  android:versionName="1.0.0">
    		
                  <-- Application Definition -->
                  <application android:label="@string/app_name"
              android:icon="@drawable/icon" android:hasCode="true">
                      <activity android:name="com.epicgames.ue4.GameActivity"
                      </activity>
                  </application>
    		
                   <-- Requirements -->
                   <uses-sdk android:minSdkVersions="9"/>
                   <uses-feature android android:glEsVersion="0x00020000"
              android:required="true" />
                   <uses-permission
              android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
              </manifest>
    		
    ```
    

请注意，上面的Android Manifest文件不是有效的清单文件，仅用于参考目的。

## Manifest的额外标签

可以为Manifest添加额外的标签，方法是单击 **加号** 图标来向标签数组中添加新的元素，然后将要使用的一个或多个标签输入到输入框中。在此示例中，使用的是以下标签：**android:sharedUserId="Foo"**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef09f488-c825-4f5f-8f18-3f846c4560d6/amc_extra_man_tags.png)

输入到"Extra Tags for Manifest"部分中的标签将添加到AndroidManifest.xml文件的 **manifest** 部分。

```cpp
	<manifest xmlns:android="http://schemas.android.com/apk/res/android"
	package="com.YourCompany.AndroidManifest"
	android:sharedUserId="Foo"
	android:versionCode="1"
	android:versionName="1.0">

```

## 应用的额外标签

可以为Application添加额外的标签，方法是单击 **加号** 图标来向应用程序数组中添加新的元素，然后输入要使用的标签。在此示例中，使用的是以下标签：**android:hardwareAccelerated="True"**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e1f7fca-d7d7-4c12-849b-f79c95662c04/amc_extra_app_tags.png)

输入到"Extra Tags for Application"部分中的项将添加到AndroidManifest.xml文件的 **Application Definition** 部分。

```cpp
	
	<application android:label="@string/app_name"
	 android:icon="@drawable/icon"
	 android:hardwareAccelerated="True"
	 android:hasCode="true">

```

## 应用的额外设置

可以为应用程序添加额外的设置以供使用，方法是在 **Extra Settings for < application>** 部分中输入要使用的设置。如果要使用多个设置，请添加 **\\n** 来分隔每个设置。在此示例中，添加了以下两项：**android:banner="Foo"** 和 **android:vmSafeMode="True"**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16ee0d63-c5d3-429a-8794-d2431a161662/amc_extra_app_settings.png)

输入到"Extra Settings for <Android:nameapplication>"部分中的项将添加到AndroidManifest.xml文件的 **Activity** 部分。

```cpp
		</activity>
		<activity android:name=".DownloaderActivity" android:screenOrientation="landscape" android:configChanges="screenSize|orientation|keyboardHidden|keyboard" android:theme="@style/UE4SplashTheme" />
		<meta-data android:name="com.epicgames.ue4.GameActivity.DepthBufferPreference" android:value="0" />
		<meta-data android:name="com.epicgames.ue4.GameActivity.bPackageDataInsideApk" android:value="false" />
		<meta-data android:name="com.epicgames.ue4.GameActivity.bVerifyOBBOnStartUp" android:value="false" />
		<meta-data android:name="com.epicgames.ue4.GameActivity.bShouldHideUI" android:value="false" />
		<meta-data android:name="com.epicgames.ue4.GameActivity.ProjectName" android:value="AndroidManifest" />
		<meta-data android:name="com.epicgames.ue4.GameActivity.bHasOBBFiles" android:value="true" />
		<meta-data android:name="com.epicgames.ue4.GameActivity.bSupportsVulkan" android:value="false" />
		<meta-data android:name="com.google.android.gms.games.APP_ID" android:value="@string/app_id" />
		<meta-data android:name="com.google.android.gms.version" android:value="@integer/google_play_services_version" />
		<activity android:name="com.google.android.gms.ads.AdActivity" android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|uiMode|screenSize|smallestScreenSize" />
			android:banner="Foo"
			android:vmSafeMode="True"
		<service android:name="OBBDownloaderService" /><receiver android:name="AlarmReceiver" /></application>

```

## UE4游戏活动的额外标签

可以向 **Extra Tags for UE4.GameActivity node** 部分添加额外的标签，方法是单击 **加号** 图标来向"Extra Tags for UE4.GameActivity node" 数组中添加新的元素并输入要使用的标签。

-   [development](https://dev.epicgames.com/community/search?query=development)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [manifest](https://dev.epicgames.com/community/search?query=manifest)
-   [distribution](https://dev.epicgames.com/community/search?query=distribution)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Android Manifest查找](/documentation/zh-cn/unreal-engine/how-to-use-android-manifest-control-in-unreal-engine-projects#androidmanifest%E6%9F%A5%E6%89%BE)
-   [Android Manifest布局](/documentation/zh-cn/unreal-engine/how-to-use-android-manifest-control-in-unreal-engine-projects#androidmanifest%E5%B8%83%E5%B1%80)
-   [Manifest的额外标签](/documentation/zh-cn/unreal-engine/how-to-use-android-manifest-control-in-unreal-engine-projects#manifest%E7%9A%84%E9%A2%9D%E5%A4%96%E6%A0%87%E7%AD%BE)
-   [应用的额外标签](/documentation/zh-cn/unreal-engine/how-to-use-android-manifest-control-in-unreal-engine-projects#%E5%BA%94%E7%94%A8%E7%9A%84%E9%A2%9D%E5%A4%96%E6%A0%87%E7%AD%BE)
-   [应用的额外设置](/documentation/zh-cn/unreal-engine/how-to-use-android-manifest-control-in-unreal-engine-projects#%E5%BA%94%E7%94%A8%E7%9A%84%E9%A2%9D%E5%A4%96%E8%AE%BE%E7%BD%AE)
-   [UE4游戏活动的额外标签](/documentation/zh-cn/unreal-engine/how-to-use-android-manifest-control-in-unreal-engine-projects#ue4%E6%B8%B8%E6%88%8F%E6%B4%BB%E5%8A%A8%E7%9A%84%E9%A2%9D%E5%A4%96%E6%A0%87%E7%AD%BE)