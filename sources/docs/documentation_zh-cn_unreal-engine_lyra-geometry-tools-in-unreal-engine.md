# 虚幻引擎中的Lyra几何体工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lyra-geometry-tools-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:49:47.796Z

---

目录

![Lyra中的几何体工具](https://dev.epicgames.com/community/api/documentation/image/0e9bccae-b77f-42ad-9298-6dc74fd3c546?resizing_type=fill&width=1920&height=335)

**几何体脚本编写（Geometry Scripting）** 是虚幻引擎5中引入的全新试验性插件，为 **流程性网格体Actor** 提供了 **Actor** 基类（**GeneratedDynamicMeshActor**），以及可用于生成该Actor的网格体的蓝图函数库。例如，下面显示的简单蓝图生成了 **参数化盒体（Parametric Box）** 对象，你可以使用Actor的 **细节（Details）** 面板中公开的宽度/深度/高度蓝图变量来调整对象的大小。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a1ea0a5-d18f-4144-903b-64b0b30bb676/appendbox.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a1ea0a5-d18f-4144-903b-64b0b30bb676/appendbox.png)

![geometry-scripting-tool-being-used-in-the-editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08469cb3-8363-4e99-bea6-feaf53c06b41/placebox.gif)

**几何体脚本库** 包含160多个函数，其中有各种类型的形状生成器、挤压和旋转、网格体布尔值，用于配置材质分配以及在静态网格体资产之间复制的工具函数。

## 工具库

Lyra技术美术师使用 **蓝图Actor** 中的流程性网格体生成来构建参数化关卡设计元素库作为蓝图Actor。这些蓝图在Lyra项目中称为 **工具（蓝图Actor工具）** ，位于 **Tools子文件夹** 的 **Content** **目录** 中。要使用其中某个工具，请将其拖入关卡中，然后使用Actor **细节（Details）面板** 中的设置将该部分配置为你喜好的样子。

在本文档中，我们采用"工具（Tool）"来描述这些参数化对象。但是，蓝图用户界面中的一些地方也使用了生成器（Generator）和生成的网格体（Generated Mesh）。

例如，在下图中，左侧是默认 **B\_Tool\_AdvancedWindow**，然后通过更改Actor上的选项/参数/材质，构建了其他两个变体。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/363818b7-0d2c-452b-a39b-96ed3731737b/toolshapes.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/363818b7-0d2c-452b-a39b-96ed3731737b/toolshapes.png)

Lyra使用下表中列出的 **蓝图Actor工具** 构建。

蓝图Actor工具

说明

图片

B\_ASimpleCubeTool B\_GeneratedTube B\_GeneratedTube\_Advanced B\_Tool\_AdvancedWindow

适合用于创建在外部有方角、在开口处有圆角并且可使用3D小工具拖动开口的网格体。这包括一个镜像和自定义布尔值切割平面选项。![高级窗口示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/542cb993-ceb6-441d-b450-9ca5cc29c307/advancedwindow.png)

 

B\_Tool\_CornerExtrude B\_Tool\_CornerExtrude1

创建带有统一宽度和统一边角半径的边角网格体。![边角挤压示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7ca3233-37fb-4923-b12b-0c018907af69/cornerextrude.png)

 

B\_Tool\_Panel\_BGM

创建带有边角半径功能按钮的网格体。这是统一宽度且带有唯一材质ID的布尔值（加/减/相交）内嵌网格体。网格体尺寸通过可拖动的3D小工具控制，并包含一个镜像和自定义布尔值切割平面选项。![工具面板示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bee80171-2905-48d4-a348-d18daa84f3ed/toolpanel.png)

 

B\_Tool\_RampMakerControl\_BGM

一种用户定义的工具，由简单的矩形盒体组成，沿样条线带有宽度、高度和深度功能按钮。您可以在游戏视图模式（G键开关）下编辑和查看样条线点。使用Alt+鼠标左键拖动会将新样条线点附加到末端样条线点。此工具会烘焙单个网格体。![斜坡发生器功能按钮示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a5edc61-1314-49f7-a2a5-061331a89f48/rampmakerbgm.png)

 

B\_Tool\_Repeater

沿可编辑的样条线分布带有用户定义的尺寸的一系列盒体，其示例可在 **B\_Tool\_Stairs\_BGM** 中查看 ![楼梯示例工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0cd0ca57-4762-455a-9bb5-65cd51379361/toolrepeater.png)

 

## 烘焙到静态网格体资产

使用 **参数化** **工具Actor** 时，关卡设计师可以高效地制作关卡布局的原型，并可以在 **PIE**（**在编辑器中运行**）中将其用于执行基本测试。作为蓝图基础的 **动态网格体Actor** 不使用传统的UE StaticMesh资产，而是会使用 **动态网格体组件** ，这是为高效编辑而设计的一种新型组件。

动态网格体组件可提供快速的参数化设计，但不支持[Lumen](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)或[Nanite](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)之类的UE渲染功能。此外，动态网格体组件Actor不支持实例化，这意味着工具的副本是完全单独的网格体。更改原始工具的参数不会影响副本。

在设计关卡时，如果多个地方使用了相同的元素，这会带来困扰，因为设计师只能选择手动更新每个副本上的设置。因此，请遵守标准UE渲染架构和设计工作流程，因为蓝图工具Actor需要烘焙到静态网格体资产。

为了支持这一点，工具Actor的细节（Details）面板中有 **生成管理（Generation Management）** 分段，其中包括两个操作按钮：**生成新静态网格体（Generate New Static Mesh）** 和 **烘焙到静态网格体（Bake to Static Mesh）** 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7d9c315-1c10-494c-a8b7-a3df4bf2cdab/geometrybakemesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7d9c315-1c10-494c-a8b7-a3df4bf2cdab/geometrybakemesh.png)

要烘焙工具实例的静态网格体版本，请点击 **生成新静态网格体（Generate New Static Mesh）** 按钮。这会在Actor上的其他设置定义的路径上创建新的静态网格体资产。

例如，在上图中，资产在 `ShooterMaps/Content/Meshes/` Generated文件夹目录中创建，并命名为自动生成的名称加上前缀 **Mesh\_** 。

此静态网格体资产的实例现在可以放在关卡中。点击 **生成（Generate）** 按钮时，工具Actor会跟踪那些创建并存储在 **目标静态网格体（Target Static Mesh）** 字段中的资产。然后，用户可以随时点击 **烘焙到静态网格体（Bake to Static Mesh）** 来更新该静态网格体资产。这样就可以通过编辑工具来更轻松地编辑关卡中的实例。

在该上下文中提到"实例"这个词的时候，我们指的是关卡中引用静态网格体资产的Actor，例如"资产的实例"，而 *不* 是 **实例化静态网格体组件** 实例。

在下面的gif图中，你可以观察此过程的演示。我们一开始从 **生成新静态网格体（Generate New Static Mesh）** 按钮创建新资产，然后放置三个单独的实例，并通过编辑和重新烘焙工具来更新资产。

![生成静态网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6c10adb-8cc0-437d-87e5-ec6b98dfa3c7/workflow.gif)

生成新静态网格体（Generate New Static Mesh）和烘焙到静态网格体（Bake To Static Mesh）功能是使用几何体脚本编写在蓝图中实现的。这些函数位于 **BakedGeneratedDynamicMeshActor** 的蓝图子类 **生成的动态网格体Actor** 中。

你可以在 `/Content/Tools/BakedGeneratedMeshSystem` 目录文件夹中找到此动态网格体Actor。 所有工具蓝图Actor都是此基类的子类。

## 非破坏性关卡设计

上面小节中介绍的 **烘焙到静态网格体（Bake to Static Mesh）** 功能提供了使用参数化网格体工具执行 **非破坏性关卡设计** 的高效方法。关卡设计师可使用工具来配置关卡元素，然后将其烘焙到资产，以在关卡中放置实例。烘焙的资产支持Nanite和Lumen、高效实例化渲染以及UE中的其他所有静态网格体功能。

此系统有一个缺点，工具Actor必须作为静态网格体资产/实例的某种"模板"存在于关卡中。如果删除工具，设置就会丢失。解决办法之一是，将工具设置为隐藏，但这意味着要执行编辑就必须显式将其显示出来，之后再次将其隐藏。另一个办法是，将工具放在关卡中"偏僻"的地方。在Lyra中，具体做法是将工具放在实际关卡下面。

例如，你在打开 **L\_Expanse** 贴图时，可能会发现有许多明显随机摆放的对象放在主关卡下面，就是这个原因。这些是用于生成和编辑关卡资产的工具。以下小节中说明了它们为什么看起来杂乱无章。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04b4c363-591b-4b96-98bc-2b77d869b99a/leveldesign.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04b4c363-591b-4b96-98bc-2b77d869b99a/leveldesign.png)

## 在工具和资产之间交换

上文介绍的资产烘焙系统提供了非破坏性关卡设计参数化工具Actor，但仍有一些困难。具体来说，很难找到工具来编写在关卡中放置的特定资产。此外，以迭代方式编辑和重新烘焙位于别处的工具来微调已放置的资产，效率比较低下。

为了支持更好的工作流程，蓝图中完整构建了用于在已放置的静态网格体资产（静态网格体Actor）和工具Actor之间交换的系统。此系统使用 **Actor Action Utility** 蓝图，用户可以用它创建蓝图操作，使操作显示在编辑器中的右键点击上下文菜单中。

如需了解更多信息，请参阅[脚本化操作](/documentation/zh-cn/unreal-engine/scripted-actions-in-unreal-engine)。

`/Content/Tools/BakedGeneratedMeshSystem/EditorActions/` 文件夹中有两个操作工具。

第一个是 **SwapGeneratedActor\_ToSM**，用于将工具Actor替换为其烘焙的静态网格体资产的实例。此编辑器操作会将项目 **交换到静态网格体（Swap to Static Mesh）** 添加到 **BakedGeneratedDynamicMeshActor** 子类的上下文菜单。运行该项目时，将发生以下过程：

1.  检查Actor中是否已配置已烘焙的资产。如果尚无已烘焙的资产，则自动在工具Actor上运行生成新静态网格体（Generate New Static Mesh）和烘焙到静态网格体（Bake to Static Mesh）操作。
    
2.  创建新 **烘焙的静态网格体Actor（Baked Static Mesh Actor）** 并分配烘焙的资产。
    
3.  将新Actor上的 **变换（Transform）** 设置为与工具上的当前变换相同。
    
4.  将工具Actor中的 **名称（Name）** 、 **数据层（Data Layer）** 和 **大纲视图（Outliner）** 位置复制到新静态网格体Actor。
    
5.  将工具Actor重新放到关卡下面。
    
6.  将前缀附加到大纲视图中的工具Actor名称
    

此名称在Lyra中配置为 **ZZSTORED\_**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d03d6a8-8699-4b52-b5ba-b5c3310ecd46/swaptostatic.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d03d6a8-8699-4b52-b5ba-b5c3310ecd46/swaptostatic.png)

第二个编辑器操作是 **SwapGeneratedActor\_FromSM**，用于从放置的静态网格体实例（**烘焙的静态网格体Actor**）交换到源工具Actor。这会将 **交换到生成的网格体（Swap to Generated Mesh）** 操作添加到烘焙的静态网格体Actor的上下文菜单。运行此操作时，将删除静态网格体Actor，然后更新工具Actor上的变换以取代已删除的静态网格体Actor。

你可以做出参数化编辑，更新已烘焙的资产，然后运行 **交换到静态网格体（Swap to Static Mesh）** 操作以切换回静态网格体。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ad3de92-b88c-42d8-bda3-8f607b8a96e5/swaptogeneratedmesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ad3de92-b88c-42d8-bda3-8f607b8a96e5/swaptogeneratedmesh.png)

![生成网格体动画过程](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ea7814f-35fc-4be2-a8c9-b61d1f061af6/generatemeshworkflow.gif)

## 源密钥和生成的网格体冷存储

关卡设计师可使用上面介绍的工具、烘焙功能和交换操作来创建和编辑关卡。现在，你可以探索技术细节，了解如何在蓝图中完全实现交换。

如前所述，**已烘焙的生成的动态网格体Actor** 会跟踪 **目标静态网格体（Target Static Mesh）** 字段中当前已烘焙的资产。 生成资产时，也会随机生成新的 **源生成器密钥（Source Generator Key）** 字符串。该字符串显示在Actor **细节（Details）面板** 中。

  

这些字段可以手动初始化，也可以使用生成新静态网格体（Generate New Static Mesh）按钮来初始化。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ef7f343-b60e-40c8-8e5c-71c9a7b6552d/generationmanagement.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ef7f343-b60e-40c8-8e5c-71c9a7b6552d/generationmanagement.png)

交换到静态网格体（Swap to Static Mesh）操作创建的静态网格体Actor是基础StaticMeshActor的蓝图子类 **烘焙的静态网格体Actor** 。该子类有一个额外的字段 **源生成器密钥（Source Generator Key）** 。操作创建新烘焙的静态网格体Actor时，其源生成器密钥（Source Generator Key）设置为与它所基于的工具相同的字符串。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27c44d55-4398-427e-9c0f-b10f57ed48ae/sourcegeneratorkey.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27c44d55-4398-427e-9c0f-b10f57ed48ae/sourcegeneratorkey.png)

此源生成器密钥（Source Generator Key）字符串是交换系统的基础。给定烘焙的静态网格体Actor时，你可以使用该密钥来确定它是从哪个工具继承的。 此外，你还可以在给定工具中的密钥时找到所有烘焙的静态网格体Actor实例。

一种搜索方法是，在所有Actor中迭代。我们将另一个蓝图对象添加到系统中，以集中这些信息并提供一个地方来使用各种工具函数（例如这些搜索）。这是 **GeneratedMeshColdStorage** 蓝图，它是编辑器工具Actor。

其中一个Actor必须放在关卡中，交换系统才能正常运行。它没有几何体，对游戏没有影响。它将管理 **存储的Actor（Stored Actors）** 列表中的一系列已知工具Actor，如下所示。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb1de12e-3c53-403d-8123-db9079710fa9/coldstorage.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb1de12e-3c53-403d-8123-db9079710fa9/coldstorage.png)

生成的网格体冷存储对象有两个公共蓝图函数：**Store Actor** 和 **Extract Actor** 。"来回交换"操作将使用这些函数来存储或恢复工具Actor。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/006eb158-def6-4bdf-889c-f3f0b3011c1b/blueprintfunctions.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/006eb158-def6-4bdf-889c-f3f0b3011c1b/blueprintfunctions.png)

# 工具/资产交换系统的新关卡设置

下面是使用上面介绍的烘焙/交换系统设置新关卡的逐步说明。

1.  将 **Tools/BakedGeneratedMeshSystem/GeneratedMeshColdStorage** 资产的实例从内容浏览器（Content Browser）拖移到关卡中。
    
2.  将 **Tools/B\_Tool\_AdvancedWindow** 资产的实例拖移到关卡中。
    
3.  选择此新Actor（**B\_Tool\_AdvancedWindow**）。
    
4.  向下滚动到 **Actor细节（Actor Details）** 面板的 **生成管理（Generation Management）** 分段，并点击 **生成新静态网格体（Generate New Static Mesh）** 。
    
5.  右键点击关卡中的Actor，并从Actor上下文菜单中的 **脚本化Actor操作（Scripted Actor Actions）** 子菜单选择 **交换到静态网格体（Swap to Static Mesh）** 。这会将工具Actor替换为静态网格体Actor。
    
6.  按住Alt键并拖动关卡中的3D小工具，创建所选静态网格体Actor的副本。
    
7.  选择两个静态网格体Actor之一，右键点击，并从Actor上下文菜单中的 **脚本化Actor操作（Scripted Actor Actions）** 子菜单选择 **交换到生成的网格体（Swap to Generated Mesh）** 。这会将静态网格体Actor替换为工具Actor。
    
8.  向上滚动到Actor细节（Actor Details）面板中的 **墙壁（Wall）** 分段，并增加 **墙壁宽度（Wall Width）** 。这只会影响工具Actor。
    
9.  向下滚动到 **Actor细节（Actor Details）** 面板的 **生成管理（Generation Management）** 分段，并点击 **烘焙到静态网格体（Bake to Static Mesh）** 。静态网格体Actor将更新为与工具Actor相同的外观。
    
10.  右键点击关卡中的Actor，并从Actor上下文菜单中的 **脚本化Actor操作（Scripted Actor Actions）** 子菜单选择 **交换到静态网格体（Swap to Static Mesh）** 。这会再次将工具Actor替换为静态网格体Actor。
    

## 交换系统常见问题

上面介绍的资产/工具交换系统包含在 **Lyra L\_Expanse** 关卡中。大部分关卡元素基于关卡中存在的工具，并且你可以在工具和放置的资产之间交换，以试验非破坏性关卡设计。

在Lyra开发过程中，我们注意到了几个常见的错误用法，可供你引以为鉴。

-   如果生成的静态网格体资产是手动放置的，那么不会交换Actor，而是产生的Actor会变为静态网格体Actor，而非烘焙的静态网格体Actor。在这种情况下，Actor没有源密钥（Source Key）字段，因此没有指向源工具的链接，并且交换到静态网格体（Swap to Static Mesh）上下文菜单操作将不可用。
    
-   交换到静态网格体（Swap to Static Mesh）操作不会自动将工具烘焙到资产，在第一次调用时例外。你必须显式点击烘焙（Bake）按钮，否则工具和烘焙的资产可能不同步。你可以通过交换回来并烘焙来修复该问题。
    
-   一旦工具烘焙到资产，并且该资产在关卡中使用后，不要再次对该工具使用生成新静态网格体（Generate New Static Mesh）按钮。这样做会生成新的源密钥，所有现有资产实例的源密钥不会引用任何现有工具（无法交换回来）。
    
-   如果在关卡中复制了工具以创建变体，则两个副本有相同的源密钥和相同的目标静态网格体资产。在这种情况下，**必须** 运行生成新静态网格体（Generate New Static Mesh）来解决此冲突。
    
-   生成的静态网格体资产没有源密钥的作用域，只有静态网格体Actor才有。因此，如果删除了使用关卡中某个资产的所有Actor，指向源工具的链接将丢失（工具仍存在于关卡中，但很难找到）。要彻底删除资产，必须首先删除该工具，然后删除已放置的Actor，再删除该资产。
    
-   如果删除工具，其设置就会丢失，无法挽回。这不会影响已放置的实例，但无法恢复已删除的工具来进一步更新实例。
    
-   源密钥（Source Key）字段是字符串，可以在细节面板中手动编辑。如果这样做了，资产实例与工具之间的链接将丢失。但是，这意味着可以手动将字符串更新为与工具和实例中的相同，从而修复破坏的链接。
    

我们计划在Lyra示例的未来迭代中改进这些局限性。

## 附加说明

**分配的材质** ：在工具和资产实例之间交换时，除了复制世界变换之外，还会复制已分配的材质。这使得关卡中资产的不同实例可以拥有不同的材质分配，同时仍查以与工具进行交换，并且工具（在"换入"时）将反映正确的材质。但是，直接在工具上进行的所有材质分配将丢失。

**Actor设置** ：资产/实例交换还会尽可能保留数据层、大纲视图中的位置以及Actor名称。 它会尝试隐藏/显示工具Actor，以及将其移到关卡下面。但是，虚幻编辑器（Unreal Editor）不会保存此隐藏/显示状态，所以在重新加载关卡时会将其重置（这也是Actor显示在关卡下面的原因）。

这种复制操作是从复制Actor属性的低级别引擎API执行的，因此其他许多Actor设置将来回复制。但是，两个对象上都没有的Actor属性复制不了。要处理这种情况，设置必须在"复制到/复制自"（Copy To / From）操作中显式处理。

**烘焙/游戏编译** ：在UE 5.0中，用于工具的生成的动态网格体Actor基类只能在编辑器中使用。这意味着放置的工具Actor将显示在PIE中，但不会包含在编译的已烘焙游戏中。

-   [geometry](https://dev.epicgames.com/community/search?query=geometry)
-   [lyra](https://dev.epicgames.com/community/search?query=lyra)
-   [geometry tools](https://dev.epicgames.com/community/search?query=geometry%20tools)
-   [geometry scripting](https://dev.epicgames.com/community/search?query=geometry%20scripting)
-   [level design](https://dev.epicgames.com/community/search?query=level%20design)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [工具库](/documentation/zh-cn/unreal-engine/lyra-geometry-tools-in-unreal-engine#%E5%B7%A5%E5%85%B7%E5%BA%93)
-   [烘焙到静态网格体资产](/documentation/zh-cn/unreal-engine/lyra-geometry-tools-in-unreal-engine#%E7%83%98%E7%84%99%E5%88%B0%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E8%B5%84%E4%BA%A7)
-   [非破坏性关卡设计](/documentation/zh-cn/unreal-engine/lyra-geometry-tools-in-unreal-engine#%E9%9D%9E%E7%A0%B4%E5%9D%8F%E6%80%A7%E5%85%B3%E5%8D%A1%E8%AE%BE%E8%AE%A1)
-   [在工具和资产之间交换](/documentation/zh-cn/unreal-engine/lyra-geometry-tools-in-unreal-engine#%E5%9C%A8%E5%B7%A5%E5%85%B7%E5%92%8C%E8%B5%84%E4%BA%A7%E4%B9%8B%E9%97%B4%E4%BA%A4%E6%8D%A2)
-   [源密钥和生成的网格体冷存储](/documentation/zh-cn/unreal-engine/lyra-geometry-tools-in-unreal-engine#%E6%BA%90%E5%AF%86%E9%92%A5%E5%92%8C%E7%94%9F%E6%88%90%E7%9A%84%E7%BD%91%E6%A0%BC%E4%BD%93%E5%86%B7%E5%AD%98%E5%82%A8)
-   [工具/资产交换系统的新关卡设置](/documentation/zh-cn/unreal-engine/lyra-geometry-tools-in-unreal-engine#%E5%B7%A5%E5%85%B7/%E8%B5%84%E4%BA%A7%E4%BA%A4%E6%8D%A2%E7%B3%BB%E7%BB%9F%E7%9A%84%E6%96%B0%E5%85%B3%E5%8D%A1%E8%AE%BE%E7%BD%AE)
-   [交换系统常见问题](/documentation/zh-cn/unreal-engine/lyra-geometry-tools-in-unreal-engine#%E4%BA%A4%E6%8D%A2%E7%B3%BB%E7%BB%9F%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
-   [附加说明](/documentation/zh-cn/unreal-engine/lyra-geometry-tools-in-unreal-engine#%E9%99%84%E5%8A%A0%E8%AF%B4%E6%98%8E)