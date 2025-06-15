# 为发布虚幻引擎项目做准备 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/preparing-unreal-engine-projects-for-release
> 
> 生成时间: 2025-06-14T20:41:36.373Z

---

目录

![发布项目](https://dev.epicgames.com/community/api/documentation/image/efaedb55-c90b-4f4e-a1de-7856c9a07497?resizing_type=fill&width=1920&height=335)

使用 **虚幻编辑器（Unreal Editor）** 打包项目的发布版本以便发行。本页面以面向Windows平台打包项目为例，介绍如何打包发布版项目。按照以下步骤通过 **项目启动程序（Project Launcher）** 打包你的项目。打包过程的细节取决于你建立的项目针对哪个平台，即你是在创建Windows游戏、发行移动设备项目还是在针对另一平台。据此，你对完成的打包内容所采取的步骤将有所不同。

下例打包的是1.0版第三人称游戏，针对的是64位Windows系统，使用的语言为英语。

## 打开项目启动程序

1.  点击虚幻编辑器（Unreal Editor）**工具栏（Toolbar）** 的 **平台（Platforms）** 按钮，然后选择 **项目启动程序（Project Launcher）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a9c980b-ea66-4442-be32-860d194bbf2c/01_projectlauncher.png)
2.  点击 **添加（Add）** 按钮创建一个新的自定义启动配置文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48838406-da2a-4ab0-9698-c466b28cec45/02_addcustomprofile.png)
3.  设置该配置文件的名称和说明。
    

## 自定义项目的调整

发布流程中有许多可用的设置。

#### 项目

在 **项目（Project）** 分段下，你可以设置特定项目，或使用 **任意项目（Any Project）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56ef32f9-d335-4d29-b341-97ea55b6da05/03_adjcustproj_project.png)

#### 构建

1.  将 **构建（Build）** 配置设置为 **发行（Shipping）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd306a6c-9b41-4f08-9b61-351a3a13024d/04_adjcustproj_buildshipping.png)
2.  （可选）如果你需要将 **虚幻自动化工具（UAT））** 编译为版本的一部分，请展开 **高级设置（Advanced Settings）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/442d997e-de17-45a8-ba77-5b08d19fdc6f/05_adjcustproj_builduat.png)

#### 烘焙

1.  在下拉菜单中，选择 **按常规（By the Book）** 作为烘焙方法。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dd93e8d-de0e-43ba-8694-7b981df471ca/06_adjcustproj_cookbybook.png)
2.  选中你要烘焙的内容所面向的所有平台的复选框。在本例中，为了进行Windows测试，我们选择了 **WindowsNoEditor** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/796d8ff9-92c7-49d1-a3d9-1ad7e3c35d0d/07_adjcustproj_cookwindows.png)
3.  选中你要烘焙本地化内容时所面向的所有文化的复选框。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dee6ce98-20a5-4a70-8555-7de4c8a47db5/08_adjcustproj_cookcultures.png)
4.  选中要烘焙的贴图的复选框。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2096ea4c-e947-4caf-bddc-cc032ac4e5a6/09_adjcustproj_cookmaps.png)
5.  在 **发布/DLC/修补设置（Release/DLC/Patching Settings）** 中：
    
    -   选中 **创建游戏的发布版本以进便发行。（Create a release version of the game for distribution.）** 复选框。
    -   输入该发布版的版本号。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ded4af2-31ef-4c52-9c17-c8696338bfc6/10_adjcustproj_cookrealisesettings.png)
6.  展开 **高级设置（Advanced Settings）** ，确保启用以下选项，并启动以及你的特定项目的发行方法所需的其他选项：
    
    -   **压缩内容（Compress content）**。
    -   **保存无版本包（Save packages without versions）**。
    -   **将所有内容存储到单个文件（UnrealPak）（Store all content in a single file (UnrealPak)）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9548a322-d156-48f9-a829-14cbc4eb9cf3/11_adjcustproj_cookadvancesettings.png)
7.  此外，在 **高级设置（Advanced Settings）** 下，将 **烘焙器编译配置（Cooker build configuration）** 设置为 **发行（Shipping）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd8764d3-6d57-4acb-a754-fe99ab5bf8e4/12_adjcustproj_cookadvanceshipping.png)

#### 打包

将此版本设置为 **打包并存储在本地（Package & store locally）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b34a32c3-4ffc-46b6-98dd-7430f24ecf3a/13_adjcustproj_package.png)

#### 部署

1.  将 **部署（Deploy）** 设为 **不部署（Do not Deploy）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0c5b90f-ff1d-4fde-a5fb-60f9bdfbf561/14_adjcustproj_deploy.png)
2.  完成上述所有设置后，使用右上角的 **返回（Back）** 按钮返回主配置文件窗口。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3b0a265-1aac-4ba7-a451-0364225231b8/15_backbutton.png)
3.  点击 **发布（Release）** 配置文件旁的启动图标。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e927d64-87b2-45b9-92f7-818922b2d961/16_launchicon.png)
4.  项目启动程序将经历构建、烘焙和打包过程。这可能需要一些时间，具体视项目复杂性而定。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe562dc6-a800-419e-af8b-8e18ae6b31e1/17_packagingprocess.png)
5.  操作完成后，关闭窗口或点击 **完成（Done）** 。现在你可以通过以下步骤测试补丁。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1ba669e-5d16-49c3-8a75-e55833034da6/18_packagingprocessdone.png)
6.  保存 `[ProjectName]\Releases[ReleaseVersion][Platform]` 中的资产注册表和pak文件。在本例中，路径为 `ThirdPersonGame\Releases\1.0\WindowsNoEditor` 。
    
    未来的所有补丁或DLC都需要根据资产注册表和pak文件进行检查。
    
7.  在Windows上，你可以从 `[ProjectName]\Saved\StagedBuilds\WindowsNoEditor` 进行项目运行测试。
    

虽然Steam允许你上传完整的游戏包并会为你执行更新流程，但通过Steam发行时，仍然推荐 使用这里概述的发布版本。如果你以后决定添加其他支持的平台或发行方法，这样做将使添加过程更加顺利。

-   [versioning](https://dev.epicgames.com/community/search?query=versioning)
-   [packaging](https://dev.epicgames.com/community/search?query=packaging)
-   [cooking](https://dev.epicgames.com/community/search?query=cooking)
-   [release](https://dev.epicgames.com/community/search?query=release)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [打开项目启动程序](/documentation/zh-cn/unreal-engine/preparing-unreal-engine-projects-for-release#%E6%89%93%E5%BC%80%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E7%A8%8B%E5%BA%8F)
-   [自定义项目的调整](/documentation/zh-cn/unreal-engine/preparing-unreal-engine-projects-for-release#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%A1%B9%E7%9B%AE%E7%9A%84%E8%B0%83%E6%95%B4)
-   [项目](/documentation/zh-cn/unreal-engine/preparing-unreal-engine-projects-for-release#%E9%A1%B9%E7%9B%AE)
-   [构建](/documentation/zh-cn/unreal-engine/preparing-unreal-engine-projects-for-release#%E6%9E%84%E5%BB%BA)
-   [烘焙](/documentation/zh-cn/unreal-engine/preparing-unreal-engine-projects-for-release#%E7%83%98%E7%84%99)
-   [打包](/documentation/zh-cn/unreal-engine/preparing-unreal-engine-projects-for-release#%E6%89%93%E5%8C%85)
-   [部署](/documentation/zh-cn/unreal-engine/preparing-unreal-engine-projects-for-release#%E9%83%A8%E7%BD%B2)