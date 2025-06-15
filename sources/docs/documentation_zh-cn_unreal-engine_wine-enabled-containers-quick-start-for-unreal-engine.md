# 虚幻引擎中支持Wine的容器快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/wine-enabled-containers-quick-start-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:33:29.983Z

---

目录

![支持Wine的容器快速入门](https://dev.epicgames.com/community/api/documentation/image/7f8811a7-e06c-46fd-a480-7538977539cb?resizing_type=fill&width=1920&height=335)

## 前置主题

要理解和使用本文的内容，请先熟悉以下主题：

-   [安装虚幻引擎](/documentation/404)
-   [构建容器镜像](https://docs.docker.com/get-started/docker-concepts/building-images/)
-   [运行容器](https://docs.docker.com/engine/containers/run/)
-   使用[虚幻自动化工具](/documentation/zh-cn/unreal-engine/unreal-automation-tool-for-unreal-engine)

本快速入门指南只在帮助你构建支持Wine的容器镜像，以便配合虚幻引擎使用，从而在Linux上运行Windows开发和云部署工作流程。本指南将介绍以下内容：

-   在计算机上安装Docker。
-   下载Wine资源库，其中包含用于构建支持Wine的容器镜像的脚本。
-   构建一个包含虚幻引擎和Wine的Linux容器镜像，以便运行Windows工作负载。

按以下指南构建的容器镜像不包含C++编译器工具链。因此，它不能被用于打包包含C++代码的虚幻引擎项目。容器镜像可以被用于打包只包含蓝图脚本的项目。

## 要求

要根据本快速入门指南构建和运行Wine容器镜像，你的计算需要满足[硬件和软件要求](/documentation/zh-cn/unreal-engine/hardware-and-software-requirements-for-wine-containers-for-unreal-engine)的Linux容器一节中列出的硬件和软件要求。

此外，你还需要在计算机上安装以下软件，才能满足本指南的要求：

-   Docker，且Docker Engine版本不低于23.0.0。详见下文中的[安装Docker](/documentation/zh-cn/unreal-engine/wine-enabled-containers-quick-start-for-unreal-engine#%E5%AE%89%E8%A3%85docker)一节。
-   Python，且版本不低于3.7。要下载和安装Python，请访问[python.org](https://www.python.org/)。

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

## 下载Wine资源库

Epic Games提供构建封装了Wine的容器镜像所需的资源，这些镜像带有改进兼容性的补丁，可增强虚幻引擎工作负载的兼容性。这些资源在GitHub上公开可用，可供虚幻引擎许可方使用。

从[github.com/EpicGamesExt/WineResources](https://github.com/EpicGamesExt/WineResources)将Wine资源库下载到你的计算机。如果你已经安装了Git，可以直接将资源库复制到本地目录。或者，你也可以在 **代码（Code）** 下拉菜单中选择 **下载ZIP文件（Download ZIP）** 下载ZIP压缩文件。下载完成后，将文件解压到本地目录。

## 构建Wine基础镜像

打开命令提示符（或终端）窗口，将你的工作目录改为 `WineResources/build`。

根据所使用的操纵系统，运行对应的封装器脚本：

-   在Linux和macOS上，运行 `./build.sh`
-   在Windows上，运行 `.\build.bat`

封装器脚本会自动安装构建脚本所依赖的Python数据包，然后运行Python构建脚本本身。。Python构建脚本会构建基础镜像，其中会包含已打补丁版本的Wine。构建完成后，带有 `epicgames/wine-patched:9.0.0` 标签的容器镜像就可以使用了。

为了测试基础镜像，请运行一个容器，该容器会打印出已构建的Wine版本：

```shell
docker run --rm "epicgames/wine-patched:9.0.0" wine --version
```

## 将虚幻引擎复制到Wine容器镜像

现在，你可以基于上一步中创建的基础镜像新建一个包含虚幻引擎安装构建的容器镜像了。

此步骤需要一个Windows版虚幻引擎的副本。获取所需文件的推荐方法是在Windows计算机上通过[Epic Games启动程序](https://store.epicgames.com/en-US/download) 下载虚幻引擎，并按照[官方安装说明](https://www.unrealengine.com/en-US/learn/get-started/understanding-the-basics/installing-unreal-engine)进行操作。

将虚幻引擎根目录（包含 `Engine/`）中的内容复制到 `WineResources/examples/quickstart/wrap-installed-build/context/UnrealEngine/` 目录中。

在Windows系统下复制安装构建文件时，如果有任何一个目标文件路径超过了[最大路径长度限制](https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation)，可能会遇到错误。为了避免这种情况，要么确保目标目录的路径较短（例如，将Wine资源库的本地副本存储在某个驱动器的根目录下，比如 `C:\WineResources`），要么按照微软的[启用长路径支持的说明](https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation？#enable-long-paths-in-windows-10-version-1607-and-later)来操作。

打开命令提示符（或终端）窗口，将你的工作目录改为 `WineResources/examples/quickstart/wrap-installed-build/`。要构建包含同时包含Wine和虚幻引擎的新容器镜像，请根据所使用的操纵系统，运行对应的封装器脚本：

-   在Linux和macOS上，运行 `./build.sh`
-   在Windows上，运行 `.\build.bat`

封装器脚本会使用操作系统对应的命令运行Python构建脚本本身。Python构建脚本会验证安装构建文件已被复制到正确的位置，然后自动检测文件代表的虚幻引擎版本。然后，脚本就会构建容器镜像。

构建完成后，带有 `epicgames/unreal-engine:dev-wine-blueprintonly-<VERSION>` 标签的容器镜像就可以使用了。其中 `<VERSION>` 为该容器镜像多针对的虚幻引擎的版本号。

将安装构建文件复制到容器中的Dockerfile步骤可能要花费较长时间（在许多系统上可能需要超过一小时，而在Windows环境下使用Docker Desktop并搭配WSL2时可能需要数小时）。由于没有输出来显示复制操作的进度，所以可能会让人觉得该操作卡住了，但实际上发生这种情况的可能性微乎其微，只需等待其完成即可。

## 使用支持Wine的虚幻引擎容器镜像

创建好支持Wine的虚幻引擎容器镜像后，就可以针对Windows打包虚幻引擎项目了。如上文所述，该容器镜像目前不支持打包含C++代码的项目，因此它只能被用于打包含蓝图脚本的项目。

下面的代码演示了如何在针对虚幻引擎5.5.0构建的Wine镜像中使用虚幻自动化工具打包项目：

请将 `<PATH_TO_PROJECT>` 替换为想要打包的虚幻引擎项目所在的目录路径（即包含 `.uproject` 文件的目录），并将 `<UPROJECT_FILE>` 替换为 `.uproject` 文件的名称。

选择操作系统

选择操作系统：

Windows macOS Linux

```cpp
docker run --rm -v "<PATH_TO_PROJECT>:/project" ^
"epicgames/unreal-engine:dev-wine-blueprintonly-5.5.0" ^
    /bin/sh -c "wine ^
    C:/UnrealEngine/Engine/Build/BatchFiles/RunUAT.bat ^
    BuildCookRun ^
    -noP4 -allmaps -build -cook -stage -pak ^
    -project='Z:/project/<UPROJECT_FILE>' ^
    -platform=Win64 ^
    -clientconfig=Development ^
    -archive -archivedirectory='Z:/project/archive'"
```

如果你在PowerShell窗口，而非命令提示符窗口中运行命令，则需要将每行末尾的波浪号转义字符（`^`）替换为反斜杠转义字符（`\`）。

```cpp
docker run --rm -v "<PATH_TO_PROJECT>:/project" \
"epicgames/unreal-engine:dev-wine-blueprintonly-5.5.0" \
    /bin/sh -c "wine \
    C:/UnrealEngine/Engine/Build/BatchFiles/RunUAT.bat \
    BuildCookRun \
    -noP4 -allmaps -build -cook -stage -pak \
    -project='Z:/project/<UPROJECT_FILE>' \
    -platform=Win64 \
    -clientconfig=Development \
    -archive -archivedirectory='Z:/project/archive'"
```

```cpp
docker run --rm -v "<PATH_TO_PROJECT>:/project" \
"epicgames/unreal-engine:dev-wine-blueprintonly-5.5.0" \
    /bin/sh -c "wine \
    C:/UnrealEngine/Engine/Build/BatchFiles/RunUAT.bat \
    BuildCookRun \
    -noP4 -allmaps -build -cook -stage -pak \
    -project='Z:/project/<UPROJECT_FILE>' \
    -platform=Win64 \
    -clientconfig=Development \
    -archive -archivedirectory='Z:/project/archive'"
```

-   [container](https://dev.epicgames.com/community/search?query=container)
-   [containers](https://dev.epicgames.com/community/search?query=containers)
-   [linux](https://dev.epicgames.com/community/search?query=linux)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)
-   [wine](https://dev.epicgames.com/community/search?query=wine)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [前置主题](/documentation/zh-cn/unreal-engine/wine-enabled-containers-quick-start-for-unreal-engine#%E5%89%8D%E7%BD%AE%E4%B8%BB%E9%A2%98)
-   [要求](/documentation/zh-cn/unreal-engine/wine-enabled-containers-quick-start-for-unreal-engine#%E8%A6%81%E6%B1%82)
-   [安装Docker](/documentation/zh-cn/unreal-engine/wine-enabled-containers-quick-start-for-unreal-engine#%E5%AE%89%E8%A3%85docker)
-   [下载Wine资源库](/documentation/zh-cn/unreal-engine/wine-enabled-containers-quick-start-for-unreal-engine#%E4%B8%8B%E8%BD%BDwine%E8%B5%84%E6%BA%90%E5%BA%93)
-   [构建Wine基础镜像](/documentation/zh-cn/unreal-engine/wine-enabled-containers-quick-start-for-unreal-engine#%E6%9E%84%E5%BB%BAwine%E5%9F%BA%E7%A1%80%E9%95%9C%E5%83%8F)
-   [将虚幻引擎复制到Wine容器镜像](/documentation/zh-cn/unreal-engine/wine-enabled-containers-quick-start-for-unreal-engine#%E5%B0%86%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E5%A4%8D%E5%88%B6%E5%88%B0wine%E5%AE%B9%E5%99%A8%E9%95%9C%E5%83%8F)
-   [使用支持Wine的虚幻引擎容器镜像](/documentation/zh-cn/unreal-engine/wine-enabled-containers-quick-start-for-unreal-engine#%E4%BD%BF%E7%94%A8%E6%94%AF%E6%8C%81wine%E7%9A%84%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E5%AE%B9%E5%99%A8%E9%95%9C%E5%83%8F)