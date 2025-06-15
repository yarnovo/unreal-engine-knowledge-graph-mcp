# 通过源代码构建Windows容器镜像 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/building-the-windows-container-images-from-source
> 
> 生成时间: 2025-06-14T20:33:23.152Z

---

目录

![通过源代码构建Windows容器镜像](https://dev.epicgames.com/community/api/documentation/image/695e5f33-3682-4f9d-bc26-0dd7c1b5e03c?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

包含在虚幻引擎中的所有容器均有可从GitHub容器注册表下载的预构建版本。如果想为虚幻引擎自定义版本构建开发镜像，或修改镜像源代码，你只需通过源代码构建映镜像即可。

## 要求

如需构建虚幻引擎附带的Windows容器镜像，计算机需达到[硬件和软件要求](/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-container-deployments-in-unreal-engine)页面Windows容器部分列明的硬件和软件要求。

## 安装Docker

Docker是构建包含在虚幻引擎中的容器镜像的推荐工具。如需安装Docker，请按照[安装Windows版Docker桌面版](https://docs.docker.com/docker-for-windows/install/)的指示操作。

一旦Docker桌面版安装成功，你需要[从Linux容器模式切换](https://docs.docker.com/docker-for-windows#switch-between-windows-and-linux-containers)（默认）到Windows容器模式。

## 构建镜像

如果你已从GitHub下载了虚幻引擎的源代码，那么需要运行源代码根目录的 `Setup.sh` ，来下载引擎的二进制依赖文件。如果不执行此步骤，那么构建容器镜像所需的文件就会丢失。

导航至虚幻引擎源代码的子目录：

Engine/Extras/Containers/Dockerfiles/windows

如需构建Windows容器镜像，请双击 `build.bat` 文件。该操作会根据机上当前运行的Windows版本构建对应的Windows运行时镜像。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [container](https://dev.epicgames.com/community/search?query=container)
-   [containers](https://dev.epicgames.com/community/search?query=containers)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [要求](/documentation/zh-cn/unreal-engine/building-the-windows-container-images-from-source#%E8%A6%81%E6%B1%82)
-   [安装Docker](/documentation/zh-cn/unreal-engine/building-the-windows-container-images-from-source#%E5%AE%89%E8%A3%85docker)
-   [构建镜像](/documentation/zh-cn/unreal-engine/building-the-windows-container-images-from-source#%E6%9E%84%E5%BB%BA%E9%95%9C%E5%83%8F)