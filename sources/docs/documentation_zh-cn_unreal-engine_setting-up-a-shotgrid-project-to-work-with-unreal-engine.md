# 设置适用于虚幻引擎的ShotGrid项目 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-a-shotgrid-project-to-work-with-unreal-engine
> 
> 生成时间: 2025-06-14T20:36:47.398Z

---

目录

![设置适用于虚幻引擎的ShotGrid项目](https://dev.epicgames.com/community/api/documentation/image/51c0a5fa-48ae-414a-8820-b774feea0533?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

![ShotGrid Project in Unreal Editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37b579e7-ab8c-48cd-b88c-89c8051ddedf/shotgrid-project-hero.png)

设置ShotGrid项目以与虚幻引擎4配合工作的流程与内容流程中的其他应用程序（例如，Autodesk Maya或3ds Max、或Foundry Nuke）的流程相似。你将需要将ShotGrid项目配置为使用 *工具包引擎*，它是一系列工具和脚本，旨在让ShotGrid项目了解虚幻引擎并将ShotGrid工具和工作流集成到虚幻编辑器界面。

针对每个要与虚幻引擎配合使用的ShotGrid项目，只需进行一次本页面中列出来的配置。此配置通常由ShotGrid管理员完成。如果你已设置过ShotGrid项目并将它们配置为与其他内容创建工具集成，那么此流程对你来说应该相当熟悉了。如果对此流程不太熟悉，请参阅以下资源：

-   [集成用户手册](https://developer.shotgridsoftware.com/d587be80/?title=Integrations+User+Guide)总体概述了如何快速上手使用ShotGrid集成。
    
-   [集成管理员手册](https://developer.shotgridsoftware.com/a944bb05/?title=Administration)对流程配置进行了详细说明。
    

## 开始之前

我们建议你使用GitHub上tk-config-unrealbasic\](https://github.com/ue4plugins/tk-config-unrealbasic)库中已为你设置好的项目配置。此配置对基本ShotGrid工具包配置进行了扩展，增加了构成虚幻集成的元素。我们还在[tk-config-unreal](https://github.com/ue4plugins/tk-config-unreal)库中提供了第二个示例项目，它相当于ShotGrid的default2配置。

-   要使用GitHub中的这一配置，计算机上必须安装有Git。如果尚未安装Git，[请从此处下载](https://git-scm.com/downloads)。
-   从网站的 **Apps** 菜单下载并安装 **ShotGrid Desktop** 应用程序。
    
    ![Downloading ShotGrid Desktop via the ShotGrid Apps menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c56bffcb-5cb5-46f0-a689-f8cccad1aa7c/downloading-shotgrid-desktop.png)

## 1 - 将虚幻引擎软件添加到ShotGrid

在此步骤中，你需要将虚幻引擎集成作为新软件添加到你的组织。

1.  在网页浏览器中登录你所在组织的ShotGrid页面。然后在用户菜单中选择 **Software**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/679b96eb-9776-41ce-992f-9aaee9a74141/shotgrid-user-menu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/679b96eb-9776-41ce-992f-9aaee9a74141/shotgrid-user-menu.png)
    
2.  在 **Software** 页面上点击 **Add Software** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74cc9586-f243-4afa-8568-185e3d33268c/add-software.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74cc9586-f243-4afa-8568-185e3d33268c/add-software.png)
    
3.  将 **Software Name** 设置为 **Unreal Engine**，并将 **Engine** 设置为 **tk-unreal**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de80d0c7-0b02-4d28-b4fe-0faf88cd722b/create-a-new-pipeline-configuration.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de80d0c7-0b02-4d28-b4fe-0faf88cd722b/create-a-new-pipeline-configuration.png)
    
4.  点击 **Create Software**。  
    在返回 **Software** 页面后，你将可以在列表中看到新添加的虚幻引擎条目。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab603c3e-8679-4cb2-b3c1-05b6c130985d/unreal-in-software-menu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab603c3e-8679-4cb2-b3c1-05b6c130985d/unreal-in-software-menu.png)
    

### 最终结果

ShotGrid现在已经得知了虚幻引擎集成的存在，你可以继续按照以下步骤将组织中的ShotGrid项目与虚幻编辑器配合使用。

## 2 - 设置ShotGrid项目

在此步骤中，你将在ShotGrid项目中添加一个 **管线配置（Pipeline Configuration）**，并使用[分发配置](https://developer.shotgridsoftware.com/tk-core/initializing.html#distributed-configurations)部署它。这会在所有能够访问ShotGrid网站的项目用户间共享该配置。如有需要，你也可以根据ShotGrid的文档指导，在磁盘上设置一个[集中式配置](https://developer.shotgridsoftware.com/tk-core/initializing.html#centralized-configurations)。

要向ShotGrid项目添加管线配置，请执行以下操作：

1.  从GitHub上下载[最新版tk-config-unrealbasic](https://github.com/ue4plugins/tk-config-unrealbasic/releases)的.zip文件。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2e5b922-34d1-4a36-9b81-bb281bb03018/download-latest-tk-config.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2e5b922-34d1-4a36-9b81-bb281bb03018/download-latest-tk-config.png)
    
2.  在你的ShotGrid网站上，打开项目并找到 **Other > Pipeline Configurations**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/363b9ae9-8f17-4b27-8083-4c53270237f9/pipeline-configuration.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/363b9ae9-8f17-4b27-8083-4c53270237f9/pipeline-configuration.png)
    
3.  在 **Pipeline Configurations** 页面上，点击 **Add Pipeline Configuration**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e167bd0-4e72-4fed-97ae-8eec215f037c/add-pipeline-configuration.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e167bd0-4e72-4fed-97ae-8eec215f037c/add-pipeline-configuration.png)
    
4.  将 **Config Name** 设置为Primary，并将 **\*Plugin Ids** 设置为 **basic.\***。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fc80c79-24c1-4ea7-91c9-febf0357062c/create-a-new-pipeline-configuration.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fc80c79-24c1-4ea7-91c9-febf0357062c/create-a-new-pipeline-configuration.png)
    
5.  点击 **Create Pipeline Configuration**。在返回 **Pipeline Configurations** 页面后，你就能看到 **Primary** 列表中新增了一个条目。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba5b8010-84b3-4934-83a4-65f4433c8851/primary-configuration.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba5b8010-84b3-4934-83a4-65f4433c8851/primary-configuration.png)
    
6.  点击 **Uploaded Config** 字段，选择 **Upload File**。将你从GitHub上下载的.zip文件添加到这里。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1726a18e-2025-4d71-95c9-64e1e4d05d12/provide-zip-file.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1726a18e-2025-4d71-95c9-64e1e4d05d12/provide-zip-file.png)
    

### 最终结果

现在，你的ShotGrid项目已经可以使用虚幻引擎集成了。ShotGrid Desktop会为每个项目用户自动下载并安装你上传的管线配置。如果有管理员修改了上传的配置，.zip文件中配置文件的后续更新都会被检测到并为每个用户更新。

## 3 - 设置ShotGrid项目配置

在此步骤中，你将安装ShotGrid Desktop中的管线配置并启动一个能被ShotGri感知到的虚幻引擎实例。

要安装管线配置，请执行以下操作：

1.  打开ShotGrid Desktop并点击你刚刚在ShotGrid网站上为其上传了管线配置的项目。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/346568fe-c716-4d76-a7be-a204ae14d6ac/projects-in-shotgrid-desktop.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/346568fe-c716-4d76-a7be-a204ae14d6ac/projects-in-shotgrid-desktop.png)
    
2.  点击项目时，它会检测到上传的管线配置并从GitHub上下载它及所有必要的ShotGrid组件（引擎、应用程序和框架）。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09278cd3-cb2e-41c0-811c-0403c6719d4b/downloading-project-and-components.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09278cd3-cb2e-41c0-811c-0403c6719d4b/downloading-project-and-components.png)
    

### 最终结果

项目设置完成后，ShotGrid Desktop将扫描你的计算机以查找虚幻引擎安装程序并在项目的"应用程序（Apps）"页面上将它们列出。点击图标即可启动最新可用的引擎版本，或在下拉菜单中选择特定的引擎版本。

![Launch the latest version of Unreal Engine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce98cc79-2db2-478e-ae3a-69b6d789503c/launch-latest-version.png)

如果你从ShotGrid Desktop启用虚幻引擎，并打开了一个启用过ShotGrid插件的虚幻引擎项目，你就可以入[将虚幻引擎与Autodesk ShotGrid配合使用](/documentation/zh-cn/unreal-engine/setting-up-a-shotgrid-project-to-work-with-unreal-engine#using-unreal-engine-with-autodesk-shortgrid)页面中所述的那样使用ShotGrid集成了。

## 后续步骤

-   有关如何为项目扩展工具包配置的更多信息，请参阅Autodesk的[Beyond Your First Project](https://developer.shotgridsoftware.com/c3b662a6/?title=Beyond+Your+First+Project)文档。
-   有关如何在ShotGrid中管理项目配置的更多信息，请参阅Autodesk的[Configuration staging and rollout](https://developer.shotgridsoftware.com/60762324/?title=Configuration+Staging+and+Rollout)文档。
-   要了解如何设置虚幻项目配置，请参阅[tk-config-unreal-basic](https://github.com/ue4plugins/tk-config-unrealbasic)库。
-   要探索虚幻工具包引擎的实现，包括它使用及公开的Python连接，请参阅[tk-unreal](https://github.com/ue4plugins/tk-unreal)库。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [shotgrid](https://dev.epicgames.com/community/search?query=shotgrid)
-   [integration](https://dev.epicgames.com/community/search?query=integration)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [开始之前](/documentation/zh-cn/unreal-engine/setting-up-a-shotgrid-project-to-work-with-unreal-engine#%E5%BC%80%E5%A7%8B%E4%B9%8B%E5%89%8D)
-   [1 - 将虚幻引擎软件添加到ShotGrid](/documentation/zh-cn/unreal-engine/setting-up-a-shotgrid-project-to-work-with-unreal-engine#1-%E5%B0%86%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E8%BD%AF%E4%BB%B6%E6%B7%BB%E5%8A%A0%E5%88%B0shotgrid)
-   [最终结果](/documentation/zh-cn/unreal-engine/setting-up-a-shotgrid-project-to-work-with-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [2 - 设置ShotGrid项目](/documentation/zh-cn/unreal-engine/setting-up-a-shotgrid-project-to-work-with-unreal-engine#2-%E8%AE%BE%E7%BD%AEshotgrid%E9%A1%B9%E7%9B%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/setting-up-a-shotgrid-project-to-work-with-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C-2)
-   [3 - 设置ShotGrid项目配置](/documentation/zh-cn/unreal-engine/setting-up-a-shotgrid-project-to-work-with-unreal-engine#3-%E8%AE%BE%E7%BD%AEshotgrid%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/setting-up-a-shotgrid-project-to-work-with-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C-3)
-   [后续步骤](/documentation/zh-cn/unreal-engine/setting-up-a-shotgrid-project-to-work-with-unreal-engine#%E5%90%8E%E7%BB%AD%E6%AD%A5%E9%AA%A4)