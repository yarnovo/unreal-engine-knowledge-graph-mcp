# 在虚幻引擎中设置爆炸动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-xr-explode-animations-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:43:33.707Z

---

目录

![设置爆炸动画](https://dev.epicgames.com/community/api/documentation/image/3a40e4f6-05b3-4ee8-945c-40eae6d7f693?resizing_type=fill&width=1920&height=335)

与一个由小部件组成的总成进行交互的常见方式是将其 *炸开*：使其组件部分在空间中相互分离，以便观察者查看每个单独部件，以及它们结合在一起的方式。

协作查看器（Collab Viewer）模板包含一个蓝图类，可用于设置部件爆炸视图，以及在运行时实现总成默认视图与爆炸视图之间的流畅切换。

## 设置初始和爆炸位置

要为自有内容设置爆炸视图，请执行以下操作：

1.  删除场景中全部现有 **BP\_Explode** Actor。（关卡中可有多个 **BP\_Explode** Actor，但交互菜单目前一次仅列出一个爆炸动画。）
2.  确保所处关卡是Actor要管理的内容所在的关卡。**BP\_Explode** 蓝图仅对所处关卡的内容生效。  
    以默认样本内容为例，打开 **关卡（Levels）** 窗口（**窗口（Window）>关卡（Levels）**），双击 **示例关卡（SampleLevel）**。
    
    ![SampleLevel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ff38adf-9784-47ba-a38a-bc6c27d2e7c6/collabviewer-explode-samplelevel.png "SampleLevel")
3.  在 **内容浏览器** 中，在 **CollaborativeViewer/Blueprints/Commands/Explode** 文件夹下找到 **BP\_Explode** 蓝图类，拖入视口。  
    ![拖拽并放置BP_Explode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ceb430af-33aa-4a27-913d-48a0837b022f/collabviewer-explode-dragdrop.png "Drag and drop a BP_Explode")
4.  在视口或 **世界大纲视图** 中选择该新蓝图Actor。
    
    ![选择BP_Explode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb9fc14a-30aa-4051-8c6c-08cbbae0bfe6/collabviewer-explode-selected.png "Select the BP_Explode")
5.  在 **细节（Details）** 面板中，用描述性名称为Actor命名。此名称在运行时将显示在交互菜单中，以便您触发和反转爆炸动画。
    
    ![重命名BP_Explode Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e33fb11d-e152-4c60-b199-c5e841634d3f/collabviewer-explode-rename.png "Rename BP_Explode Actor")
6.  在 **细节（Details）** 面板中找到 **Explode** 组。运用这组功能按钮设置总成的默认视图和爆炸视图。
    
    ![BP_Explode细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fca065e9-299d-40c1-b681-d0f024d284d9/collabviewer-explode-details.png "BP_Explode Details")
7.  在 **Actor根** 列表中，需要识别此蓝图在关卡中添加动画的Actor。
    
    -   可向列表单独添加各Actor。
    -   如果要添加动画的Actor是 **世界大纲视图** 中同一父Actor的子项，只需将该父项添加到此列表即可。
    
    例如，上图所示的前一步骤中选择了 **建筑（Building）** Actor。此Actor是建筑所含全部默认内容项的父项。因此蓝图可以为建筑中的所有Actor添加动画，但树木、变速器总成、外部场地除外。
    
8.  列表中所需Actor齐备后，（必要时）全部移至视口中，使其按照安排出现在各自的默认初始位置。点击 **设置初始位置（Set Initial Location）** 按钮记录这些变换。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/242d7e05-6de7-49d0-9322-94c4834cde61/collabviewer-explode-setinitial.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/242d7e05-6de7-49d0-9322-94c4834cde61/collabviewer-explode-setinitial.png)
    
9.  现在，将视口中的所有Actor移至爆炸时所处的位置。点击 **设置爆炸位置（Set Explode Location）** 按钮锁定此类变换。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/308a5030-44c3-4b1e-9c33-051dbf58331b/collabviewer-explode-setexploded.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/308a5030-44c3-4b1e-9c33-051dbf58331b/collabviewer-explode-setexploded.png)
    
10.  可点击 **查看爆炸（View Explode）** 和 **查看初始位置（View Initial Location）** 按钮，在虚幻编辑器中测试记录的变换。点击此类按钮时，所有拥有动画的部件应在关卡视口中的预设位置之间进行切换。动画将不如运行时流畅，但仍可检查Actor在3D空间中的位置是否符合预期。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e08273cd-4898-413c-a65b-ae5c8a16899d/collabviewer-explode-testineditor.png "collabviewer-explode-testineditor.png")

**BP\_Explode** Actor保存其所管理的Actor列表。如需修改 **BP\_Explode** 拥有的对象，例如删除关卡中的一些Actor，或更改父项层级，必须先重新设置初始位置 **和** 爆炸位置，然后再在编辑器中查看这两个位置。否则这些Actor列表会过时。这可能会导致一些Actor丢失在场景中应所处的位置。

可在关卡添加多个 **BP\_Explode** Actor，为总成的不同部件添加动画。但只有第一个Actor会显示在交互菜单中。

若创建多个 **BP\_Explode** Actor，则一个Actor最多只能存在于一个 **BP\_Explode** 中。否则，最终位置可能不合预期。

## 运行时位置切换

要在运行时在爆炸视图和默认视图之间切换，请执行以下操作：

1.  运行或测试游戏，然后打开交互菜单。（在桌面模式中，按 **空格键**。在VR模式中，按右控制器的肩部按钮。） 菜单底部会出现一个项目，其名称为已创建 **BP\_Explode** Actor的名称。
2.  高亮显示此菜单项，并选择 **爆炸（Explode）**，使注册到同一 **BP\_Explode** 的所有部件从关卡中当前位置流畅移至爆炸位置。
    
    ![爆炸命令](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f530f6a7-f1fe-4f56-a247-009ab73dc2e4/collabviewer-explode-menuexplode.png "Explode command")
3.  若在总成爆炸分解时重新打开交互菜单，会看到 **构建（Build）** 选项。选择此选项，使爆炸分解部件从当前位置返回默认起始位置。
    
    ![构建命令](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43528a62-6ea6-4f51-9104-383ec8e70cbb/collabviewer-explode-menubuild.png "Build command")

以下视频是上一节运行时构建的自定义动画。

-   [collaboration](https://dev.epicgames.com/community/search?query=collaboration)
-   [templates](https://dev.epicgames.com/community/search?query=templates)
-   [collab viewer](https://dev.epicgames.com/community/search?query=collab%20viewer)
-   [design review](https://dev.epicgames.com/community/search?query=design%20review)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置初始和爆炸位置](/documentation/zh-cn/unreal-engine/setting-up-xr-explode-animations-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%88%9D%E5%A7%8B%E5%92%8C%E7%88%86%E7%82%B8%E4%BD%8D%E7%BD%AE)
-   [运行时位置切换](/documentation/zh-cn/unreal-engine/setting-up-xr-explode-animations-in-unreal-engine#%E8%BF%90%E8%A1%8C%E6%97%B6%E4%BD%8D%E7%BD%AE%E5%88%87%E6%8D%A2)