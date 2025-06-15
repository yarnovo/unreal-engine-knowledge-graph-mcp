# 在虚幻引擎中准备资产进行分块 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/preparing-assets-for-chunking-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:48:05.855Z

---

目录

![准备资产进行分块](https://dev.epicgames.com/community/api/documentation/image/9afbe84f-a49d-4b51-87d5-a87060b608d1?resizing_type=fill&width=1920&height=335)

**虚幻引擎（UE）** 能够以打包文件的形式交付应用程序主可执行文件之外的资产。为此，你需要将资产整理成文件块，即烘焙过程可以识别的资产文件组。该指南将教你如何在 **虚幻编辑器** 中将资产整理成文件块。完成后，你将有一个示例项目，该项目将生成打包文件，你可以使用补丁系统交付该文件。

## 推荐资产

本指南中将使用以下资产：**Paragon** 中的 **Crunch** 、 **Boris** 和 **Khaimera** ，你可以从虚幻商城免费下载它们。只要你拥有可以安全分组到单独文件夹中的资产，你就无需使用这些特定资产。由于UE已经以这种方式整理Paragon角色资产，因此 **Paragon角色资产（Paragon Character Assets）** 是方便的测试用例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b08b1d0e-9007-4f32-86d1-fbb44e41fafe/01_paragonassets.png)

## 必要设置

继续下一步之前，应查看[设置ChunkDownloader插件](/documentation/zh-cn/unreal-engine/setting-up-the-chunkdownloader-plugin-in-unreal-engine)。

如参考指南中所示，你需要：

1.  基于 **空白模板** 创建 **C++项目** 。将该项目命名为 **PatchingDemo** 。
    
2.  在 **插件（Plugins）** 菜单中启用 **ChunkDownloader** 插件。
    
3.  在 **项目设置（Project Settings）> 项目（Project）> 打包（Packaging）** 中，启用 **使用Pak文件（Use Pak File）** 和 **生成块（Generate Chunks）** 。
    
4.  在 **Visual Studio** 中编辑你项目的 `[ProjectName]Build.cs` 文件。
    
5.  生成Visual Studio项目文件。
    
6.  在Visual Studio中构建你的项目。
    

## 整理分块计划

现在，你已启用分块并设置了插件，你需要整理资产并将其打包为文件块。

有关分块过程的更多信息，请参阅[烘培和分块](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine)。

1.  在 **ParagonBoris** 文件夹中点击右键，找到 **创建高级资产（Create Advanced Asset）** > **杂项（Miscellaneous）** ，然后创建新的 **数据资产（Data Asset）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/effbe985-44f7-40f0-9940-e3a613323ec2/02_createdataasset.png)
2.  选择 **PrimaryAssetLabel** 作为新数据资产的基类。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0c6475a-4e1a-4c97-91ce-a7aa64d1e030/03_primaryassetlabel.png)
    
    你可以在C++中创建PrimaryAssetLabel的子类以便添加额外的元数据。如果在蓝图中为PrimaryAssetLabel创建子类，则这些子类将无法用于分块。
    
3.  将新的主要资产标签命名为 **Label\_Boris** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a127805e-87ca-4108-9566-21222b9a596d/04_labelborisasset.png)
4.  打开 **Label\_Boris** ，并填写以下属性：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbff8b1e-5504-4063-be38-3a7069073674/05_labelborissettings.png)
    
    属性
    
    值
    
    **文件块ID（Chunk ID）**
    
    对于每个文件夹，这应该是唯一值。这里我们将 **1001** 用于 Boris。
    
    **优先级（Priority）**
    
    该值应大于0。这里我们全部设置为 **1** 。
    
    **烘焙规则（Cook Rule）**
    
    设置为 **始终烘焙（Always Cook）** 。
    
    **标记我的目录中的资产（Label Assets in My Directory）**
    
    设置为 **启用（Enabled）** 。
    
    **是运行时标签（Is Runtime Label）**
    
    设置为 **启用（Enable）**
    
5.  对 **ParagonCrunch** 和 **ParagonKhaimera** 重复步骤1至4。在此示例中，我们将Crunch的 **ChunkID** 设置为 **1002** ，将Khaimera的 **ChunkID** 设置为 **1003** 。
    
6.  包装或烘焙项目的内容。
    

## 最终结果

如果一切设置正确，则在UE完成打包后，你将在构建目录中的 `/Windows/PatchingDemo/Content/Paks` 下看到打包文件。UE将用指定的文件块ID为每个文件命名，每个文件将包含你的三个角色的资产。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc4faf47-f5d9-4b84-b924-bd2ae16a45dd/06_finalpakfiles.png)

你也可以点击 **工具（Tools）> 审核（Audit）> 资产审核（Asset Audit）** ，在资产审核（Asset Audit）窗口中查看你的文件块。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6da5afbb-830c-4561-b51d-7787b3836f1f/07_openassetaudit.png)

你可以在[烘焙和分块](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine)中找到有关资产审核的更多信息。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a69ceaff-6758-437e-a1d5-dd874ee341eb/08_pakfileassetaudit.png)

-   [cooking](https://dev.epicgames.com/community/search?query=cooking)
-   [chunking](https://dev.epicgames.com/community/search?query=chunking)
-   [patching](https://dev.epicgames.com/community/search?query=patching)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [推荐资产](/documentation/zh-cn/unreal-engine/preparing-assets-for-chunking-in-unreal-engine#%E6%8E%A8%E8%8D%90%E8%B5%84%E4%BA%A7)
-   [必要设置](/documentation/zh-cn/unreal-engine/preparing-assets-for-chunking-in-unreal-engine#%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [整理分块计划](/documentation/zh-cn/unreal-engine/preparing-assets-for-chunking-in-unreal-engine#%E6%95%B4%E7%90%86%E5%88%86%E5%9D%97%E8%AE%A1%E5%88%92)
-   [最终结果](/documentation/zh-cn/unreal-engine/preparing-assets-for-chunking-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)