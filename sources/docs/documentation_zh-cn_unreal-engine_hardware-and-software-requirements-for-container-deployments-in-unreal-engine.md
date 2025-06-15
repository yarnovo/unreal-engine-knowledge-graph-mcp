# 虚幻引擎容器部署的硬件和软件要求 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-container-deployments-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:32:56.253Z

---

目录

![硬件和软件要求](https://dev.epicgames.com/community/api/documentation/image/1b1f2925-e35e-4f37-8004-13ad96f50797?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

## Linux容器要求

包含在虚幻引擎中的Linux容器镜像可以在Windows、macOS或 Linux上构建和运行。如需构建或运行容器镜像，计算机需满足以下硬件要求：

-   64位CPU，支持[二级地址转译(SLAT)](https://en.wikipedia.org/wiki/Second_Level_Address_Translation)
    
-   在系统BIOS中启用硬件虚拟化支持
    
-   系统内存至少为4 GB
    

计算机还需要满足以下软件要求：

-   **Windows：** 64位Windows 10家庭版、专业版、企业版、教育版、1903版本或更新版本，并且安装了Windows版Docker桌面版。请参阅以下[安装Docker](/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-container-deployments-in-unreal-engine#installingdocker)部分，了解Windows系统如何安装Docker桌面版。
    
-   **macOS：** macOS版10.14或更新版本，并且安装了Mac版Docker桌面版。请参阅以下[安装Docker](/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-container-deployments-in-unreal-engine#installingdocker)部分，了解Mac系统如何安装Mac桌面版。
    
-   **Linux：** 64位版本的CentOS 7或更新版本、Debian 10或更新版本、Fedora 32或更新版本、Ubuntu 16.04或更新版本，或任何满足[Docker先决条件](https://docs.docker.com/engine/install/binaries#prerequisites)的Linux发行版，并且安装了Docker引擎。请参阅以下[安装Docker](/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-container-deployments-in-unreal-engine#%E5%AE%89%E8%A3%85docker)部分，了解如何安装Docker引擎。
    

## Windows容器要求

包含在虚幻引擎中的Windows 容器镜像可以在Windows上构建和运行。如需构建或运行容器镜像，计算机需满足以下软件要求：

\*64位Windows 10专业版、企业版、教育版、1809版本或更新并且安装了Windows版Docker桌面版。请参阅下文[安装Docker](/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-container-deployments-in-unreal-engine#%E5%AE%89%E8%A3%85docker)一节，了解Windows系统如何安装Docker桌面版。

## 安装Docker

推荐使用Docker来构建并运行包含在虚幻引擎中的容器镜像。安装Docker步骤依你使用的操作系统而定。以下链接将提供安装说明，指导你在每个可用的平台上进行安装：

-   **Windows：** [安装Windows版Docker桌面版](https://docs.docker.com/docker-for-windows/install/)
    
-   **macOS：** [安装Mac版Docker桌面版](https://docs.docker.com/docker-for-mac/install/)
    
-   **Linux：** 按照相应说明为你的特定Linux发行版安装Docker引擎：
    
    -   [CentOS](https://docs.docker.com/engine/install/centos/)
        
    -   [Debian](https://docs.docker.com/engine/install/debian/)
        
    -   [Fedora](https://docs.docker.com/engine/install/fedora/)
        
    -   [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
        
    -   [其他Linux发行版](https://docs.docker.com/engine/install/binaries/)
        

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [container](https://dev.epicgames.com/community/search?query=container)
-   [containers](https://dev.epicgames.com/community/search?query=containers)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Linux容器要求](/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-container-deployments-in-unreal-engine#linux%E5%AE%B9%E5%99%A8%E8%A6%81%E6%B1%82)
-   [Windows容器要求](/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-container-deployments-in-unreal-engine#windows%E5%AE%B9%E5%99%A8%E8%A6%81%E6%B1%82)
-   [安装Docker](/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-container-deployments-in-unreal-engine#%E5%AE%89%E8%A3%85docker)