# 在虚幻引擎中创建并使用LOD | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-and-using-lods-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:01:51.063Z

---

目录

![创建并使用 LOD](https://dev.epicgames.com/community/api/documentation/image/b4dc5026-5339-4cda-8081-b7f161dbf68f?resizing_type=fill&width=1920&height=335)

当玩家靠近您在场景中放置的静态网格模型时，您想要让网格模型看起来非常细致。但是，一旦玩家远离网格模型，您就不需要让网格模型那么细致和复杂了。如果网格模型在屏幕上只占了几个像素的位置，并且玩家几乎看不到它，就没必要让它看起来非常复杂和细致。但是，当玩家靠近网格模型并且能够很清楚地看到它，网格模型就需要细致点了。在 UE5 中，您可在场景中放置一个网格模型，当玩家远离它的时候，可让该网格模型切换为不复杂的网格模型，以便让场景运行得更流畅。您可通过使用 **Level of Details** 或 **LODs** 来达到上述效果。本使用说明将向您介绍如何将不太细致版本的网格模型导入 UE5，然后让网格模型随着玩家的靠近与远离，从一个网格模型无缝切换为另一个网格模型。

## 设置

本操作指南要求您必须已经有一些另存为 .FBX 格式的网格模型，以便可以导入到 UE5 中。在本示例中，我们将使用在 Maya 中制作的简单多边形球体。请注意，您也可使用在其他应用程序中创建的资源。

导出网格模型后，启动 UE5。如果您正好有个项目想要试一下，可以试着跟着本操作指南进行操作。如果手头没有项目，则使用 **Blueprint First Person** 模板新建一个项目，并确保已启用了 **初学者内容包**。如果不启用该选项，您可能无法使用我们以后会用到某些资源，就很难跟着说明继续操作下去了。

关于新建项目的详细教程，请参阅[创建新项目](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)页面。

以上操作都完成后，给项目起个名字并指定位置，然后点击 **Create Project** 按钮。

## 创建 LOD

项目加载完成后，导航至 **Content Browser** 内的 **Meshes** 文件夹，然后找到名为 **FirstPersonCube\_Rounded** 的资源。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71591374-9d08-466f-bde0-e7e4dd48d015/01-cube-in-content-browser.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71591374-9d08-466f-bde0-e7e4dd48d015/01-cube-in-content-browser.png)

点击查看大图。

找到该资源后，在静态网格模型编辑器中打开它，打开方式为 **double-clicking** 该资源或 **right-clicking** 该资源并从出现的关联菜单中选择 **Edit**。现在，您将可以看到类似以下画面。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9166a0d5-e104-4672-9de1-70a78f7bfa31/02-cube-in-static-mesh-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9166a0d5-e104-4672-9de1-70a78f7bfa31/02-cube-in-static-mesh-editor.png)

点击查看大图。

在静态网格模型编辑器中打开了该资源后，找到 **Details** 面板。默认状态下，该面板位于右上角。找到该面板时，应出现以下所示画面：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85fadf68-9b3e-417d-9911-5d4a7860c4ad/03-details-lod-0.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85fadf68-9b3e-417d-9911-5d4a7860c4ad/03-details-lod-0.png)

点击查看大图。

上方带有 LOD0 标识。LOD 是基于零的系统，因此 LOD0 是第一个条目，LOD01 是第二个条目，依此类推。LOD0 是网格模型的基础 LOD0，如果网格模型只带有 1 个 LOD，则只能使用 LOD0，就像刚才显示的画面那样。接着，我们将对其进行更改。

之前所述区块的正下方部分名为 LOD 设置。在该部分中，有几个选项需要介绍下。第一个是 LOD 的数量。默认状态下，数量为 1，随着后续导入 LOD，该数量将增大。如果自动网格模型减少功能可用，则可对该数值进行编辑。但是，若要使用该功能，您必须先从\[Simplygon.\]获取许可证（https://www.simplygon.com/)

下一个要介绍的选项是 **LOD Import**。该选项带有一个下拉菜单，如下所示:

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c86de38-01f8-4f44-9a98-dbb972822a12/04-import-lod-level-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c86de38-01f8-4f44-9a98-dbb972822a12/04-import-lod-level-1.png)

点击查看大图。

选择 **Import LOD Level 1**。将打开一个窗口，在该窗口中，您可浏览至本操作指南之前提到的 .FBX 文件。浏览至并选择 **.FBX** 文件将导入该网格模型 LOD1，也就是第二个 LOD。完成上述操作后，您将看到画面右下方出现一个类似以下所示的弹出通知：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/321dadb1-47e6-4b41-b837-0cd4b5c54fd8/05-successful-import.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/321dadb1-47e6-4b41-b837-0cd4b5c54fd8/05-successful-import.png)

点击查看大图。

在本示例中，我们只导入 1 个 LOD，即总共有 2 个 LOD，如果您愿意，可以导入更多 LOD。为此，只需单击 **LOD Import** 的下拉菜单，并选择 **Import LOD Level X**，其中 X 代表您想要导入的下一个 LOD。您也可重新导入之前已经导入的任何 LOD。如果您想要为 LOD1 导入另一个网格模型，而不是使用之前已导入的网格模型，只需单击 **LOD Import** 的下拉菜单，然后选择 **Reimport LOD Level 1**。如果您现在单击下拉菜单，将出现如下选项：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7aa99082-84af-4327-b342-b49caa7bb0b2/06-import-lod-level-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7aa99082-84af-4327-b342-b49caa7bb0b2/06-import-lod-level-2.png)

点击查看大图。

既然已经为 LOD1 导入了网格模型，我们就要调节几个值，以展示 LOD 的功能。"Details" （细节）面板的 **LOD Settings** 区块内我们要介绍的第一个选项是 **Auto Compute LOD Distances**。该选项的功能是指定当屏幕尺寸被 LOD 个数平均分割后，何时从一个 LOD 切换至另一个 LOD。例如，在本示例中，我们有 2 个 LOD，因此当网格模型占到屏幕尺寸的 50% 以上时，LOD0 将出现。当网格模型占到屏幕尺寸的 50% 以下时，LOD1 将出现。如果有 3 个 LOD，则当网格模型占到屏幕尺寸的 66.7% 以上时，LOD0 将出现，如果网格模型占到屏幕尺寸的比例在 33.3% 到 66.7% 之间时，将出现 LOD1，如果网格模型占到屏幕尺寸 33.3% 以下，则将出现 LOD2。在本示例中，该选项的功能不是太有用，因为我们所使用的网格模型大部分情况下都小于屏幕尺寸的 50% 以下。但是，我们也可手动更改这些值，方法是取消 **Auto Compute LOD Distances** 的勾选，然后手动调节每个 LOD 的 **Screen Size** 值。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ee54957-0911-4ce2-bf0d-7466fe656b87/07-auto-compute-lod-dist.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ee54957-0911-4ce2-bf0d-7466fe656b87/07-auto-compute-lod-dist.png)

点击查看大图。

为了达到演示效果，我们就取消 **Auto Compute LOD Distances** 的勾选。随后，找到 **LOD1** 下面的 **Screen Size** 值，然后将其更改为 **0.01**。这就是说，当我们在场景中设置的立方体网格模型占到屏幕尺寸的比例小于 1% 时，立方体将切换为我们之前导入为 LOD1 的网格模型（在本示例中，是一个球体）。我们也可为每个 LOD 更改材质。为了进一步演示 LOD 的功能，我们将 LOD1 的材质更改为 **M\_Metal\_Gold**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a69e729e-9f63-49e5-8c05-a8f902008c41/08-change-material-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a69e729e-9f63-49e5-8c05-a8f902008c41/08-change-material-1.png)

点击查看大图。

## 碰撞

您可以设置 **静态网格体**， 从导入的任何 **LOD** 使用 **复杂碰撞**（每三角形）。这对于优化物理性能十分有用，尤其是在 **静态网格体** 或 **复杂碰撞轨迹** 拥有大量复杂碰撞时。但是在运行中，当LOD改变时，**复杂碰撞** 不存在开关，选中的LOD将被应用于网格体的所有复杂碰撞。

查看[设置静态网格体碰撞](/documentation/zh-cn/unreal-engine/setting-up-collisions-with-static-meshes-in-unreal-engine)了解有关该设置的信息。

## 使用中的 LOD

完成上述操作后，保存网格模型，然后返回到 **Level Editor**。您将看到当您靠近网格模型时，它是有圆角的立方体。当您远离网格模型时，它将变成您之前导入的球体。另外还要注意，该功能是不是按照距离计算的，而是按照屏幕尺寸计算的，因此如果您在较小的网格模型实例旁边放置一个较大的网格模型实例，并开始离开两个网格模型相同的距离，则较小的实例将先于较大的实例切换到下一个 LOD。请参见以下示例。

![LOD Example Far](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66f869ab-f6e6-4fa7-b094-298cff6f15ee/09-lod-example-far.png "LOD Example Far")

![LOD Example Near](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b93321a-43e4-49b2-8037-e6ad14be9f37/10-lod-example-near.png "LOD Example Near")

LOD 远

LOD 近

请注意，当我们继续向远处移动时，只有前景中的立方体占到屏幕尺寸的 1% 以上，因此它仍然是 LOD0，也就是立方体。但是，随着我们向远处移动，后面的网格模型占到屏幕尺寸的比例就小于 1% 了，因此它切换为 LOD1（本示例中为金色球体）。另外还要注意，LOD 的尺寸会跟着屏幕尺寸一起缩放，因此如果您将视区分离出来并调节尺寸，网格模型占到的比例也将随着视区的尺寸进行缩放，从而相应地切换 LOD。

很明显，将立方体变为球体并不是 LOD 最实用的用途，本示例只是起到演示 LOD 功能的效果。现在，您就可以在场景中对网格模型应用了 LOD 了，使得在靠近网格模型时，显示出细致逼真的效果，但是在远离网格模型时，则削弱网格模型的细致程度，从而优化场景性能。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [static meshes](https://dev.epicgames.com/community/search?query=static%20meshes)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置](/documentation/zh-cn/unreal-engine/creating-and-using-lods-in-unreal-engine#%E8%AE%BE%E7%BD%AE)
-   [创建 LOD](/documentation/zh-cn/unreal-engine/creating-and-using-lods-in-unreal-engine#%E5%88%9B%E5%BB%BAlod)
-   [碰撞](/documentation/zh-cn/unreal-engine/creating-and-using-lods-in-unreal-engine#%E7%A2%B0%E6%92%9E)
-   [使用中的 LOD](/documentation/zh-cn/unreal-engine/creating-and-using-lods-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%B8%AD%E7%9A%84lod)