# 虚幻引擎Oculus Rift快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/oculus-rift-quick-start-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:46:22.851Z

---

目录

![Oculus Rift快速入门](https://dev.epicgames.com/community/api/documentation/image/af1242cc-2035-452c-8143-47ac5335bfcc?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7430a70-5d9f-4f8c-942b-b43e556d3e49/oculus_topic_image.png)

### 目标

Oculus快速入门将带领您了解如何设置您的计算机和Oculus Rift，以便与虚幻引擎4（UE4）一起使用。

### 目的

-   为Oculus Rift头戴式显示器（HMD）下载并安装所需软件，以配合您的开发PC使用。
    
-   创建一个新的UE项目，专门针对Oculus Rift虚拟现实（VR）的开发。
    
-   设置必要的项目设置，以便您的项目可以与Oculus Rift VR HMD一起使用。
    

## 1 - Oculus Rift初始设置

在下面部分，我们将介绍您需要安装的软件，以便您的Oculus Rift可以与虚幻引擎一起使用。

在安装Oculus runtimes期间，您需要连接互联网30到60分钟。

1.  访问[Oculus设置页面](https://www.oculus.com/setup/)[](https://www.oculus.com/en-us/setup/)，并单击页面中心的 **开始下载（Start Download）** 按钮下载Oculus runtimes。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56a544ab-9ef5-4539-816d-6e486c99a5bf/or_download_runtimes_00.png)
    
2.  **Oculus安装（Oculus Setup）** 可执行文件下载完成后，双击它开始安装过程。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a310858-8a47-4abd-bb06-5883a9ed548d/oculus_rift_exe_00.png "Oculus_Rift_Exe_00.png")
    
    在安装过程中，将要求您安装来自 **Oculus VR, LLC** 的设备软件。当显示此内容时，按 **安装（Install）** 按钮继续安装。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8243a34-15c8-4853-b847-5d1829937483/rift_device_software_install_00.png)
    

### 最终结果

当Oculus Rift软件安装完成后，打开Oculus程序，然后转到 **设备（Devices）** 选项卡。如果一切设置正确，设备（Devices）选项卡应该类似下图：  
牋![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9013f9d8-4960-4b30-9977-47581ce65c6d/oculus_rift_devicestab_00.png "Oculus_Rift_DevicesTab_00.png")

## 2 - 测试Rift和UE

在下面部分，我们将介绍如何设置一个新的虚幻引擎（UE）项目来与Oculus Rift一起使用。

1.  创建一个新的空白 **蓝图（Blueprint）** 项目，并将硬件设置为 **移动设备/平板电脑（Mobile / Tablet）**，显卡设置为 **可缩放的3D或2D（Scalable 3D or 2D）** 和 **不含初学者内容（No Starter Content）**。
    
2.  启动UE4之后，转到 **主菜单（Main Menu）** 并将 **运行（Play）** 选项从默认的 **选中的视口（Selected Viewport）** 更改为 **虚拟现实预览（VR Preview）**，按下虚拟现实预览（VR Preview）以启动关卡。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5392e0c-f4df-42ad-a3bf-1502c2c187ca/rift_vr_preview_00.png "Rift_VR_Preview_00.png")
    

### 最终结果

当虚拟现实预览（VR Preview）启动时，戴上您的HMD，您现在应该看到显示的基本关卡。您应该还能够朝任何方向旋转您的头部，如下方视频中所示。

## 3 - 看你的了！

下面有一些额外的资源，它们可以为在虚幻引擎中开发VR项目提供有用的信息。

### 文档

-   [虚拟现实开发](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine)
    -   [VR速查表](/documentation/zh-cn/unreal-engine/xr-best-practices-in-unreal-engine)
        
    -   [Oculus Rift最佳实践](/documentation/zh-cn/unreal-engine/xr-best-practices-in-unreal-engine)
        
-   [Oculus文档](https://developer.oculus.com/documentation/)
    -   [用户指南](https://support.oculus.com/857827607684748/)
        
    -   [开发者指南](https://developer.oculus.com/documentation/unreal/latest/concepts/unreal-engine/)
        

### 可尝试内容

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/adbfb37e-cd40-47b3-ab1d-16b61697fe9c/store_couchknights_screenshot_3.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/815c9dda-6315-4f0a-8328-de71f363243d/store_showdown_screenshot_5.png)

CouchKnights

Showdown

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8770d6b7-3efc-4cee-8ae3-81b38ff2742e/store_vreditor_screenshot_5.png)

 

VR模式 

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [vr](https://dev.epicgames.com/community/search?query=vr)
-   [oculus rift](https://dev.epicgames.com/community/search?query=oculus%20rift)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标](/documentation/zh-cn/unreal-engine/oculus-rift-quick-start-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/oculus-rift-quick-start-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [1 - Oculus Rift初始设置](/documentation/zh-cn/unreal-engine/oculus-rift-quick-start-in-unreal-engine#1-oculusrift%E5%88%9D%E5%A7%8B%E8%AE%BE%E7%BD%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/oculus-rift-quick-start-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [2 - 测试Rift和UE](/documentation/zh-cn/unreal-engine/oculus-rift-quick-start-in-unreal-engine#2-%E6%B5%8B%E8%AF%95rift%E5%92%8Cue)
-   [最终结果](/documentation/zh-cn/unreal-engine/oculus-rift-quick-start-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C-2)
-   [3 - 看你的了！](/documentation/zh-cn/unreal-engine/oculus-rift-quick-start-in-unreal-engine#3-%E7%9C%8B%E4%BD%A0%E7%9A%84%E4%BA%86%EF%BC%81)
-   [文档](/documentation/zh-cn/unreal-engine/oculus-rift-quick-start-in-unreal-engine#%E6%96%87%E6%A1%A3)
-   [可尝试内容](/documentation/zh-cn/unreal-engine/oculus-rift-quick-start-in-unreal-engine#%E5%8F%AF%E5%B0%9D%E8%AF%95%E5%86%85%E5%AE%B9)