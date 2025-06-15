# 为虚幻引擎安卓项目设置运行画面 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-android-launch-screens-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:01:30.433Z

---

目录

![设置安卓运行画面](https://dev.epicgames.com/community/api/documentation/image/3018ef34-e167-46a1-a457-208e21235919?resizing_type=fill&width=1920&height=335)

选择操作系统：

Windows macOS Linux

如需为 **安卓** 项目设置自定义运行画面，可在 **平台（Platforms）/安卓（Android）/运行画面（Launch Images）** 部分下的 **项目设置（Project Settings）** 中寻求支持。 您可设置使用的背景、纵向或横向图片，并设置功能是否已启用/禁用（参考下表中的详细信息）。

*运行图片选项*

选项

描述

**下载背景纵向画面（Download Background Vertical Image）**

在设备为纵向状态时用作 OBB 下载的背景。

**下载背景横向画面（Download Background Horizontal Image）**

在设备为横向状态时用作 OBB 下载的背景。

**启动头像（Launch Portrait）**

用作程序的启动画面，拥有纵向、反转纵向、感应纵向、感应或全感应朝向。

**启动环境（Launch Landscape）**

用作程序的启用画面，拥有横向、反转横向、感应横向、感应或全感应朝向。

**显示启动画面（Show Launch Image）**

将运行图片显示为启动画面。启用后，将基于项目的朝向设置包含为项目选择一个或两个运行图片。

可以在项目设置中修改应用程序的朝向设置。只需导航到 **平台（Platforms）/安卓（Android）/APK打包（APK Packaging）** 并点击 **朝向（Orientation）** 下拉菜单，选择应用需要的朝向即可。

![Orientation Settings Dropdown](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc5239c0-fe06-402c-b5c6-78ea442c2ea9/androidsplashorientationsetting.png)

## 配置运行画面

对项目进行配置，以使用运行图片：

1.  在项目中，从 **文件（File）** 菜单选择 **编辑（Edit）**，然后选择 **项目设置（Project Settings）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aae04841-f3ab-4f59-bda4-0f429f61b5f5/androidsplash1.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c463dced-f710-4e85-b2f9-6687069144a3/androidsplash1_mac.png)
2.  在 **项目设置（Project Settings）** 中，在屏幕左方的 **平台（Platforms）** 下选择 **安卓（Android）** 显示安卓 app 的项目设置。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba4233c2-c289-4452-b46e-8ec8b03194c0/androidsplash2.png)
3.  向下滚动至 **运行画面（Launch Images）** 部分，勾选 **显示运行画面（Show launch image）** 复选框。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a84c0e23-6196-4c69-b94b-df5cb5bacf62/androidsplash3.png)
4.  点击每个图片旁边的 **...** 图标打开浏览器，从电脑中选择图片。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b131a1f0-f66e-44c9-91c5-5042b479345b/androidsplash4.png)
5.  选择图片后，便会将其添加到项目中，并在启动画面中显示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39dfcb82-979f-4f3c-ac33-6edb447bc6cd/androidsplash5.png)

在 Engine/Build/Android/Java/res/drawable 文件夹中可找到纵向和横向图片范例（PNG 格式）。

-   [development](https://dev.epicgames.com/community/search?query=development)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [配置运行画面](/documentation/zh-cn/unreal-engine/setting-up-android-launch-screens-in-unreal-engine#%E9%85%8D%E7%BD%AE%E8%BF%90%E8%A1%8C%E7%94%BB%E9%9D%A2)