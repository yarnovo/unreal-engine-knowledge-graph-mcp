# 虚幻引擎中Wine容器的硬件和软件要求 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-wine-containers-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:33:26.348Z

---

目录

![Wine容器的硬件和软件要求](https://dev.epicgames.com/community/api/documentation/image/41dd951c-69a8-4fb5-8131-196af1fc3128?resizing_type=fill&width=1920&height=335)

## Linux容器要求

你可以在Windows、macOS或Linux系统上用虚幻引擎构建并运行支持Wine的容器镜像。要构建或运行这些容器镜像，你的计算机需要满足以下硬件要求：

-   支持[二级地址转换（SLAT）](https://en.wikipedia.org/wiki/Second_Level_Address_Translation)的64位CPU
-   在系统BIOS中启用了硬件虚拟化支持。
-   至少需要4GB系统内存。

你的计算机还需要满足以下软件要求：

-   Windows：安装了Docker Desktop for Windows的64位Windows 10家庭版、专业版、企业版或教育版，且版本不低于1903。有关如何安装Docker Desktop for Windows的说明，请参阅下面的[安装Docker](/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-wine-containers-for-unreal-engine#%E5%AE%89%E8%A3%85docker)一节。
-   macOS: 安装了Docker Desktop for Mac的macOS，且版本不低于10.14。有关如何安装Docker Desktop for Mac的说明，请参阅下面的[安装Docker](/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-wine-containers-for-unreal-engine#%E5%AE%89%E8%A3%85docker)一节。
-   Linux：安装了Docker Engine的64位CentOS 8或更高版本、Debian 10或更高版本、Fedora 32或更高版本、Ubuntu 16.04或更高版本，或者任何满足[Docker先决条件](https://docs.docker.com/engine/install/binaries/#prerequisites)的Linux发行版本。有关如何安装Docker Engine的说明，请参阅下面的[安装Docker](/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-wine-containers-for-unreal-engine#%E5%AE%89%E8%A3%85docker)一节。

## 安装Docker

要使用Wine和虚幻引擎构建和运行容器镜像，推荐使用Docker工具。Docker的安装步骤取决于你使用何种操作系统。以下链接提供了在Docker可用的每个平台上安装Docker的操作指南：

-   Windows：[Install Docker Desktop on Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
-   macOS：[Install Docker Desktop on Mac](https://docs.docker.com/desktop/setup/install/mac-install/)
-   Linux：请根据你的特定Linux发行版本选择合适的Docker Engine安装指南：
    -   [CentOS](https://docs.docker.com/engine/install/centos/)
    -   [Debian](https://docs.docker.com/engine/install/debian/)
    -   [Fedora](https://docs.docker.com/engine/install/fedora/)
    -   [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    -   [其他Linux发行版本](https://docs.docker.com/engine/install/binaries/)

-   [container](https://dev.epicgames.com/community/search?query=container)
-   [containers](https://dev.epicgames.com/community/search?query=containers)
-   [linux](https://dev.epicgames.com/community/search?query=linux)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)
-   [wine](https://dev.epicgames.com/community/search?query=wine)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Linux容器要求](/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-wine-containers-for-unreal-engine#linux%E5%AE%B9%E5%99%A8%E8%A6%81%E6%B1%82)
-   [安装Docker](/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-wine-containers-for-unreal-engine#%E5%AE%89%E8%A3%85docker)