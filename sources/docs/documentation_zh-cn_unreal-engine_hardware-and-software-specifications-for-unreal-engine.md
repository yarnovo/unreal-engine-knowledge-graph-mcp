# 虚幻引擎的硬件和软件规格 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/hardware-and-software-specifications-for-unreal-engine
> 
> 生成时间: 2025-06-14T18:49:21.442Z

---

目录

![硬件和软件规格](https://dev.epicgames.com/community/api/documentation/image/5aa5bb09-c537-4186-8ce8-f371010fb87b?resizing_type=fill&width=1920&height=335)

操作系统

×Windows

从下拉菜单中选择一个选项以查看与之相关的内容

本页介绍虚幻引擎（UE5）的硬件和软件要求。

## 推荐硬件

**操作系统**

Windows 10 64位版本1909版本.1350及以上版本，或版本2004和20H2修订版.789及以上版本。

Windows 11与UE5兼容，且符合推荐规格要求。

**处理器**

Intel或AMD四核处理器，2.5 GHz或更快

**内存**

32 GB内存

**显存**

8 GB或更高

**显卡**

配备最新驱动程序的DirectX11或12兼容显卡。

虽然某些功能的最低要求是DirectX 11，但我们建议大多数游戏使用DirectX 12。

DirectX11更适合旧电脑，尤其是集成显卡的笔记本电脑。 DirectX12 提供了更高的帧率、多核处理支持以及并行和异步计算。

要充分利用虚幻引擎5的渲染功能（如Nanite和Lumen），请参阅本页的"UE5渲染功能要求"小节。

## 最低软件要求

运行引擎或编辑器的最低要求如下。

运行引擎

**操作系统**

Windows 10版本1703 (Creators Update)

**DirectX Runtime**

[DirectX End-User Runtimes（2010年6月）](https://www.microsoft.com/zh-cn/download/details.aspx?id=8109)

程序员使用该引擎开发的要求如下。

使用引擎开发

**'运行引擎'的所有要求项（自动安装）**

**Visual Studio版本**

Visual Studio 2022

iOS应用程序开发

**iTunes版本**

[iTunes 12或更高](http://www.apple.com/itunes)

尽管推荐在Windows系统上使用Visual Studio进行开发，但虚幻引擎也支持VS Code和Rider编辑器。

## 必备条件软件安装程序

虚幻引擎自带安装程序，用于安装运行编辑器和引擎所需的一切内容，例如**Microsoft Visual C++ 2015-2022可再发行程序包**。

通过Epic Games启动程序安装虚幻引擎时，启动程序会自动安装这些必备条件。 但是，如果你从源代码编译虚幻引擎，或必须为计算机准备所有虚幻引擎必备条件以用于特定用途，那么你可能需要自行运行安装程序。 例如，设置全新计算机以充当[Swarm Agent](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine)。

你可以在虚幻引擎安装位置的`Engine/Extras/Redist/en-us`文件夹中找到安装程序。

虚幻引擎5删除了对32位平台的支持。

如果你使用Perforce获取虚幻引擎源代码，你可以在Perforce仓库的`Engine/Extras/Redist/en-us`文件夹中找到二进制文件。

如需详细了解Visual Studio，请参阅 [设置Visual Studio](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-visual-studio-development-environment-for-cplusplus-projects-in-unreal-engine)。

## 显卡驱动程序

目前我们建议使用各显卡制造商推出的最新稳定版本：

-   [点击这里下载NVIDIA驱动程序](http://www.nvidia.com/Download/index.aspx)
    
-   [点击这里下载AMD驱动程序](http://support.amd.com/us/gpudownload/Pages/index.aspx)
    
-   [点击这里下载Intel驱动程序](https://www.intel.com/content/www/us/en/products/docs/arc-discrete-graphics/software/drivers.html)
    

## Performance Notes

The spec below represents a typical system used at Epic Games (a Lenovo P620 Content Creation Workstation, standard version). This provides a reasonable guideline for developing games with Unreal Engine 5.

-   Operating System: Windows 11
    
-   Power Supply: 1400W Power supply unit
    
-   RAM: 256 GB DDR5-4800MHz (RDIMM, ECC)
    
-   Processor: AMD Ryzen™ Threadripper™ PRO 7985WX Processor (3.20 GHz up to 5.10 GHz)
    
-   OS Drive: 2 TB SSD M.2 2280 PCIe Gen4 Performance TLC Opal
    
-   DATA Drive: 4 TB SSD M.2 2280 PCIe Gen4 Performance TLC Opal
    
-   GPU: NVIDIA RTX™ 4080 16GB GDDR6
    
-   NIC: AMD RZ616
    
-   TPM Compliant
    

如果无法获取Xoreax Incredibuild（开发工具包），建议使用具有12到16个核心的计算机进行编译。

## UE5渲染功能要求

虚幻引擎某些渲染功能的系统要求和最低要求有所不同。

UE5功能

系统要求

**Lumen全局光照、Lumen反射和MegaLights**

-   Windows 10构建1909.1350以及支持DirectX 12的更高版本。
    
    -   项目设置中必须启用**SM6**。
        
-   以下显卡之一：
    
    -   AMD RX-6000系列或更高版本。
        
    -   Intel® Arc™ A系列显卡或更高版本。
        
    -   NVIDIA RTX-2000系列或更高版本。
        

Lumen硬件光线追踪现在需要在项目设置中设置SM6。

如需了解详情，请参阅[Lumen技术细节](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine)。

**Nanite虚拟化几何体和虚拟阴影贴图**

-   支持Windows 10构建1909.1350及更高版本的所有版本，以及支持[DirectX 12 Agility SDK](https://devblogs.microsoft.com/directx/gettingstarted-dx12agility)的Windows 11。
    
    -   Windows 10版本2004和20H2 — 修订版号应大于或等于.789。
        
    -   DirectX 12（带着色器模型6.6 Atomics），或Vulkan（VK\_KHR\_shader\_atomic\_int64）。
        
    -   项目设置中必须启用**SM6**。 （在新项目中默认开启。）  
        
    -   Windows 10版本1909 — 修订版号应大于或等于.1350。
        
-   最新显卡驱动程序。
    

如需了解详情，请参阅[Nanite虚拟化几何体](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)和[虚拟阴影贴图](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine)。

**时间超级分辨率**

可在任何支持Shader Model 5的显卡上运行，但每个着色器8UAV的数量限制会影响性能。 时间超分辨率着色器在支持Shader Model 6的D3D12上编译时启用了16位类型。

如需了解详情，请参阅[时间超级分辨率](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine)。

-   [development](https://dev.epicgames.com/community/search?query=development)
-   [sdk](https://dev.epicgames.com/community/search?query=sdk)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [推荐硬件](/documentation/zh-cn/unreal-engine/hardware-and-software-specifications-for-unreal-engine#%E6%8E%A8%E8%8D%90%E7%A1%AC%E4%BB%B6)
-   [最低软件要求](/documentation/zh-cn/unreal-engine/hardware-and-software-specifications-for-unreal-engine#%E6%9C%80%E4%BD%8E%E8%BD%AF%E4%BB%B6%E8%A6%81%E6%B1%82)
-   [必备条件软件安装程序](/documentation/zh-cn/unreal-engine/hardware-and-software-specifications-for-unreal-engine#%E5%BF%85%E5%A4%87%E6%9D%A1%E4%BB%B6%E8%BD%AF%E4%BB%B6%E5%AE%89%E8%A3%85%E7%A8%8B%E5%BA%8F)
-   [显卡驱动程序](/documentation/zh-cn/unreal-engine/hardware-and-software-specifications-for-unreal-engine#%E6%98%BE%E5%8D%A1%E9%A9%B1%E5%8A%A8%E7%A8%8B%E5%BA%8F)
-   [Performance Notes](/documentation/zh-cn/unreal-engine/hardware-and-software-specifications-for-unreal-engine#performancenotes)
-   [UE5渲染功能要求](/documentation/zh-cn/unreal-engine/hardware-and-software-specifications-for-unreal-engine#ue5%E6%B8%B2%E6%9F%93%E5%8A%9F%E8%83%BD%E8%A6%81%E6%B1%82)