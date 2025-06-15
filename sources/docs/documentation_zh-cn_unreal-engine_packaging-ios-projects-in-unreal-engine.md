# 在虚幻引擎中打包iOS项目 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/packaging-ios-projects-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:02:41.773Z

---

目录

![打包iOS项目](https://dev.epicgames.com/community/api/documentation/image/f69909f9-2bde-4bd2-9c58-d7dd80156e24?resizing_type=fill&width=1920&height=335)

选择操作系统：

Windows macOS Linux

## 步骤

在下文中，我们将介绍如何使用UE4编辑器为你的项目创建 **.IPA**，并且让它之后无需UE4编辑器即可安装。

如果要本地化iOS项目，你还需要翻译代码中的字符串。请参阅[本地化iOS项目中的"plist"和"NSLocalizedString"](/documentation/zh-cn/unreal-engine/localizing-plist-and-nslocalizedstring-in-an-ios-project-in-unreal-engine)页面了解如何执行该操作的说明。

1.  如果你的设备尚未连接到计算机，请将其连接到计算机。
    
2.  在虚幻编辑器中打开你的项目。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36e7ab6b-4545-47d9-9dd8-d4642bb5298b/open_project.png)
    
3.  在 **文件（File）** 菜单中，选择 **打包项目（Package Project）> iOS**。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3cc39e13-e471-4c73-a320-780b2fb5ca7f/package_menu.png)
    
4.  在目录对话框中，为"`.ipa`文件选择要保存的位置。
    
5.  当打包游戏时，打包信息将出现在编辑器的右下角。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93d3e516-ab59-4557-abb8-b3f6ae600d61/project_package.png)
    
6.  当成功打包项目后，将显示一条消息。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33485d01-370c-4e1b-82a3-a0817383b109/package_complete.png)
    

## 最终结果

完成后，你即将有一个.IPA，可以将它部署到你的iOS设备。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fedbd7f9-b60f-4f9b-81ce-ac9e7bae0f89/app_install_xcode_6.png)

## 步骤

在下面部分，我们将介绍如何创建你的UE4项目的 **.IPA**，无需UE4编辑器即可安装。

1.  如果你的设备尚未连接到计算机，请将其连接到计算机。
    
2.  在虚幻编辑器中打开你的项目。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f21011a0-2a32-4d11-8ea7-4423a3b4b860/open_project.png)
    
3.  在 **文件（File）** 菜单中，选择 **打包项目（Package Project）> iOS**。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09123d5e-4d26-425d-b104-c7c4601d8f8e/package_menu.png)
    
4.  在目录对话框中，选择你的项目的目录，因为打包的项目（`.ipa`文件）将位于此目录中。
    
5.  当打包游戏时，打包信息将出现在编辑器的右下角。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de851a24-fc49-4152-b83b-00995df69411/project_package.png)
    
6.  当成功打包项目后，将显示一条消息。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab40930f-f895-4bf3-a8f5-9670969d58d3/package_complete.png)
    
7.  在Xcode中，前往 **窗口（Window）**，然后选择 **设置和模拟器（Devices and Simulators）**。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6937c6b-4c73-45e7-8c71-ea3d3341df78/app_install_xcode_1.png)
    
8.  在 **设备（Devices）** 部分中，按 **加号（Plus）** 符号图标以启动应用程序安装过程。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09c6d68c-59c3-453b-a1f9-76ad52da507f/app_install_xcode_2.png "app_Install_xCode_2.png")
    
9.  找到并选择UE4创建的 **.ipa**，然后按 **打开（Open）** 按钮以开始安装过程。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a371319e-2973-4ca8-b880-622cb8a02aba/app_install_xcode_3.png)
    
10.  安装进度将显示在 **设备（Devices）** 窗口的顶部。
    

## 最终结果

完成后，你将看到IPA已添加到你的iOS设备。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91de2268-23df-43b5-8382-e2f8cd125752/app_install_xcode_5.png)

-   [guides](https://dev.epicgames.com/community/search?query=guides)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [ios](https://dev.epicgames.com/community/search?query=ios)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/packaging-ios-projects-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/packaging-ios-projects-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [步骤](/documentation/zh-cn/unreal-engine/packaging-ios-projects-in-unreal-engine#%E6%AD%A5%E9%AA%A4-2)
-   [最终结果](/documentation/zh-cn/unreal-engine/packaging-ios-projects-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C-2)