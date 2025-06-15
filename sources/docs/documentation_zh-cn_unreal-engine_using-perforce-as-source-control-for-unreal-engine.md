# 使用Perforce作为虚幻引擎项目的版本控制软件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-perforce-as-source-control-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:33:58.264Z

---

目录

![使用Perforce版本控制软件](https://dev.epicgames.com/community/api/documentation/image/77286196-de1e-4851-b60f-0c47905fb42f?resizing_type=fill&width=1920&height=335)

虚幻引擎 4 （UE4）已经整合了一个叫做 Perforce 的版本控制软件，以便让大家能够在项目上协同工作。 版本控制软件能够为团队成员提供一个共享资源和代码的方式，并且还提供了文件的备份以及历史记录查询，这样便能在当有问题发生时将某部分回滚到一个早先的版本上。

## 工作流程

在虚幻编辑器中，对于资源的工作流程基本上都是遵循了 Perforce 的流程。 文件，或者叫资源文件（扩展名为 .uasset 和 .umap）是编辑器主要的工作对象。 由于这些文件是二进制的格式，因此并不能被作为文本文件打开，也不能在文本合并工具中合并。因此，当对一个文件进行改动时，编辑器将会锁定该文件（在 Perforce 中被叫做 **Check Out**），这样其他用户就无法对它同时也进行修改。当该用户完成了对这个锁定的文件的修改编辑，则需要签入（check in 或者 commit）那些文件，将文件上传到服务器上，并且释放文件的锁定状态。

## 在 UE4 中使用 Perforce

### 在本地机器上设置 Perforce 服务器

为了避免潜在的，与我们工具的集成问题，如[UnrealGameSync](/documentation/zh-cn/unreal-engine/unreal-game-sync-ugs-for-unreal-engine)，我们建议你运行 **不分大小写** 的 Perforce 服务器。

运行 Perforce 服务器又两种方式，**P4D** 和 **P4S**。P4D 运行时是一个命令行命令，因此它通常被用来做维护工作时使用。P4S 是一个和 P4D 相同功能的服务，这能让服务器程序在后台运行。 当安装 Perforce 服务器工具后，P4S 通常都会被安装并在后台启动。

有时候服务并没有自动启动。要先Windows系统中启动服务，首先找到 **Control Panel -> Administrative Tools ->Services applet**。 然后在列表中找到 Perforce Service 并启动它：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f35d0e4-2873-4b5a-945a-7e547fed0136/sc_enable_p4_service.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f35d0e4-2873-4b5a-945a-7e547fed0136/sc_enable_p4_service.png)

一旦服务运行后，可以通过 **P4Admin** 连接到服务器上。这是该服务器上第一个链接，然后就可以在初始连接对话框中创建新用户了。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a9e954f-ff9f-437f-806f-971fddf5a0e1/sc_p4_setup.png)

将服务器的连接信息填入，并点击 OK。一旦在 P4Admin 中连接道服务器后，就可以很容易的创建新的 Depot，用户，用户组。 然后就能在 P4V 或者虚幻编辑器中使用新创建的认证信息来连接服务器。

阅读 [P4Admin 文档](http://www.perforce.com/perforce/doc.current/manuals/p4admin/p4admin.pdf) 来获取进一步关于 Perforce 使用的信息。

### P4 Typemap

在向新的 Depot 添加文件前，应当先设置 **P4 Typemap** 来让 Perforce 了解如何对待虚幻文件类型。typemap 的设置能够在 Perforce 中控制文件的只读和可写的形式。 然后要做这件事情，需要先在命令行下设置 P4 的环境变量。

```cpp
	p4 set P4USER=your.username
	p4 set P4PORT=localhost:1666

```

将上面相应的部分替换为你的用户名和连接地址，并用下面的命令打开 typemap 设置。

```cpp
	p4 -P YourPassword typemap

```

然后将会看到一个文本窗口，这就是当前服务器的 typemap。下面是我们以前用过的 typemap 示例：

```cpp
	# Perforce File Type Mapping Specifications.
	#
	#  TypeMap:             a list of filetype mappings; one per line.
	#                       Each line has two elements:
	#
	#                       Filetype: The filetype to use on 'p4 add'.
	#
	#                       Path:     File pattern which will use this filetype.
	#
	# See 'p4 help typemap' for more information.

	TypeMap:
					binary+w //depot/....exe
					binary+w //depot/....dll
					binary+w //depot/....lib
					binary+w //depot/....app
					binary+w //depot/....dylib
					binary+w //depot/....stub
					binary+w //depot/....ipa
					binary //depot/....bmp
					text //depot/....ini
					text //depot/....config
					text //depot/....cpp
					text //depot/....h
					text //depot/....c
					text //depot/....cs
					text //depot/....m
					text //depot/....mm
					text //depot/....py
					binary+l //depot/....uasset
					binary+l //depot/....umap
					binary+l //depot/....upk
					binary+l //depot/....udk
					binary+l //depot/....ubulk

```

完成编辑后，点击键盘上的 **Ctrl+S** 保存并退出。命令行应该会提示 **Typemap saved**。

### 局域网的服务器

可以在本地局域网中设置一个服务器便于团队成员协同工作。只需要遵循上述的过程搭建服务并在客户端使用该服务器的连接信息即可。

### 云服务商

有一些云服务商提供了 Perforce 的云端架设服务以便于远程协作。可以先快速浏览以下搜索引擎中的 **Perforce Hosting** 结果。 每个主机服务商都有些不同，但总的来说都是会提供一组验证信息供你连接。查看下面的 **从虚幻编辑器中连接** 的部分来了解连接到 Perforce 云服务的信息。

### 设置本地的 Workspace

要在 Perforce 管理下的文件进行工作，需要在本机设置一个 Workspace 这样 Perforce 才能管理这些文件。 可以在 P4V 界面的主菜单中，View 菜单下的打开 Workspace 分页然后便能创建 Workspace 了：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0d1930f-ddbc-471b-a7c2-9adae67d93ba/sc_view_workspace.png)

要创建一个新的 Workspace，右键点击 Workspace 窗口空白处，选择 **新建 Workspace** 选项。然后输入要创建的 Workspace 的名称，以及你希望文件存储在本机的位置目录，即 Workspace 的根目录。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71788dea-a852-4e00-8dff-844b9ae05754/sc_new_workspace.png)

一旦有了服务器以及一个本地的 workspace 设定，便可以开始添加文件了。目前这必须在编辑器外，通过 P4V 来完成。 如果 workspace 中已经有了其他成员设置过的文件，则可以先跳过这一步。在创建一个新项目时，可以选择是 C++ 项目还是纯蓝图项目。 如果选择了 C++ 项目，则可以在项目目录中可以看到有 **Source/** 目录。下面这些项目目录初始就应当被添加到版本管理中：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f22c56ea-2576-4892-b547-4d6f9e200783/sc_p4_files_to_add.png)

被高亮为 **绿色** 的目录和文件应该被添加到项目的 Depot 中。Binaries 目录高亮为 **黄色**，可以选择是否要加入到版本管理中，这取决于团队自生的工作需要。 如果团队中每个人都准备自己来编译引擎和游戏的话，那么 Binaries 则无需加入到版本管理中，但如果团队中有人只是想获取一个版本就能直接在编辑器中工作的话，则需要把 Binaries 添加上去。 请留意先前的 server typemap 的设置，能够让程序员们直接重新编译版本而不受在默认的 Perforce 管理配置下这些文件只读属性的限制。

### 向 Perforce 添加文件

向 Perforce 添加文件可以通过以下几个步骤完成。

1.  要添加文件/目录到 Perforce的话，先在 P4V 中选择这些文件/目录，然后点击右键并选择 **标记为添加 Mark For Add** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18cd138e-a79c-4a40-8ed2-67e1aa3243d8/sc_p4_mark_for_add.png)
2.  这将会在默认的 changelist 中添加这些文件。所有添加的文件都可以在待上传 Changelist 分页中查看到：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ae54f2d-3ea8-402d-9d3a-7d59afab752d/sc_view_pending_changelists.png)
3.  要提交文件的话，首先在 changelist 上 点击右键并选择 **Submit**。然后就可以填写上传的描述信息，并点击 Submit 按钮完成提交。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb519c24-07c5-40da-bfc3-858cddc08743/sc_p4_submit_files.png)

如果要在一个其他人已经开始的项目中工作，可以直接在 P4V 中从 Perforce 上获取最新版本。 只需要在 P4V 的 Depot 视图中找到相应的项目目录，然后再该项目上 **点击右键** 并选择 **获取最新版本**。 然后将会根据当前 workspace 的根目录设置来获取该项目的所有文件到本地硬盘中。

### 从虚幻编辑器中连接

可以在编辑器中直接连接 Perforce 服务器，只需点击 **工具栏** 的 **版本控制** 按钮：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af15edb1-be16-4d3d-b081-34ad1c45f6fe/sc_ue4_sc_enable.png)

打开后，选择 Perforce 作为软件版本管理软件的提供商，并输入登录验证信息。 如果已经设置过 workspace 的话（当前项目正在该 Workspace 内），登录信息将会自动填上。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/468c56a2-3e1f-465e-a18d-94954a66ea83/sc_p4_ue4_setup.png)

对于有些服务器，也包括很多云端的服务，可能会需要手动输入主机和密码信息才能在编辑器中访问 Depot。可以在 Perforce 的登录对话框中打开高级选项即能看到：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbbaf888-2b00-472c-9fce-5869056b78c4/sc_p4_ue4_setup_advanced.png)

-   [perforce](https://dev.epicgames.com/community/search?query=perforce)
-   [source control](https://dev.epicgames.com/community/search?query=source%20control)
-   [data pipeline](https://dev.epicgames.com/community/search?query=data%20pipeline)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [工作流程](/documentation/zh-cn/unreal-engine/using-perforce-as-source-control-for-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [在 UE4 中使用 Perforce](/documentation/zh-cn/unreal-engine/using-perforce-as-source-control-for-unreal-engine#%E5%9C%A8ue4%E4%B8%AD%E4%BD%BF%E7%94%A8perforce)
-   [在本地机器上设置 Perforce 服务器](/documentation/zh-cn/unreal-engine/using-perforce-as-source-control-for-unreal-engine#%E5%9C%A8%E6%9C%AC%E5%9C%B0%E6%9C%BA%E5%99%A8%E4%B8%8A%E8%AE%BE%E7%BD%AEperforce%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [P4 Typemap](/documentation/zh-cn/unreal-engine/using-perforce-as-source-control-for-unreal-engine#p4typemap)
-   [局域网的服务器](/documentation/zh-cn/unreal-engine/using-perforce-as-source-control-for-unreal-engine#%E5%B1%80%E5%9F%9F%E7%BD%91%E7%9A%84%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [云服务商](/documentation/zh-cn/unreal-engine/using-perforce-as-source-control-for-unreal-engine#%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%95%86)
-   [设置本地的 Workspace](/documentation/zh-cn/unreal-engine/using-perforce-as-source-control-for-unreal-engine#%E8%AE%BE%E7%BD%AE%E6%9C%AC%E5%9C%B0%E7%9A%84workspace)
-   [向 Perforce 添加文件](/documentation/zh-cn/unreal-engine/using-perforce-as-source-control-for-unreal-engine#%E5%90%91perforce%E6%B7%BB%E5%8A%A0%E6%96%87%E4%BB%B6)
-   [从虚幻编辑器中连接](/documentation/zh-cn/unreal-engine/using-perforce-as-source-control-for-unreal-engine#%E4%BB%8E%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E8%BF%9E%E6%8E%A5)

相关文档

[

源码管理

![源码管理](https://dev.epicgames.com/community/api/documentation/image/d4b8f2f9-4a27-4f69-89c9-020fda6ce2fd?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/source-control-in-unreal-engine)

[

内容浏览器

![内容浏览器](https://dev.epicgames.com/community/api/documentation/image/133ace36-135f-4673-9d72-c841fdb16066?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)

[

项目设置

![项目设置](https://dev.epicgames.com/community/api/documentation/image/bd3e1a10-f81c-49e4-869d-415d31e3fe52?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/project-settings-in-unreal-engine)

[

配置文件

![配置文件](https://dev.epicgames.com/community/api/documentation/image/eec063ee-d5cb-4c6b-89e9-658109e8962f?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/configuration-files-in-unreal-engine)