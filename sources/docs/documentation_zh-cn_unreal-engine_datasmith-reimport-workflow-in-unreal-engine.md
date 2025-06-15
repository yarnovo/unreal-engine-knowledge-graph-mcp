# 虚幻引擎中的Datasmith重新导入工作流程 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:04:16.732Z

---

目录

![Datasmith重新导入工作流程](https://dev.epicgames.com/community/api/documentation/image/d821d898-e9df-473d-a99b-9a0e84680e27?resizing_type=fill&width=1920&height=335)

Datasmith将各种源应用程序中的设计数据导入到虚幻引擎中，通常是为了依据这些数据构建实时可视化和体验。但通常，虽然你是在虚幻中构建这些可视化，但所处理的源场景或设计数据需要进行一些更改，才能满足新的需要或将项目干系人的反馈融入到项目中。为避免繁重且成本高昂的返工，你需要能够融入这些上游更改，而不会丢失已经在虚幻编辑器中完成的所有工作。

本页介绍将Datasmith内容的更新拉取到虚幻项目中的不同方法，以及资源和Actor在这个过程中会经历哪些变化。你有两个选择：

1.  **重新导入整个Datasmith场景。** 这样会更新Datasmith场景资源，将源场景中所做的所有最新更改包含进去，并尝试将这些更改协调到你在虚幻编辑器中所完成的工作。请参见下方的[完整场景重新导入](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#%E5%AE%8C%E6%95%B4%E5%9C%BA%E6%99%AF%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5)。
    
2.  **重新导入Datasmith导入的单个资源**，如静态网格体、材质或纹理。这样你可以处理对所选资源的更改，而不影响Datasmith场景的其他地方。请参见下文的[单个资产重新导入](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#%E5%8D%95%E4%B8%AA%E8%B5%84%E4%BA%A7%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5)。
    

关于详细教程以及如何在虚幻编辑器中使用这些导入流程，请参阅[Datasmith重新导入工作流程](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine)。

## 完整场景重新导入

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f1f7c8b-8b5d-4f5a-a13e-07c0311e4c42/datasmith-reimport-datasmith-scene.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f1f7c8b-8b5d-4f5a-a13e-07c0311e4c42/datasmith-reimport-datasmith-scene.png)

点击查看大图

你可以一次性重新导入整个Datasmith场景。这种方法将更新Datasmith在内容浏览器中创建的所有资源，以匹配你在源应用程序或数据文件中所做的最新更改。从这里，你可以选择性更新关卡中的Datasmith场景Actor，以使它们与Datasmith场景资源保持的新场景层级同步。

### 对场景层级的更改

在重新导入Datasmith场景时，你在源场景中所做的所有最新更改会立即更新到Datasmith场景 **资源** 中包含的场景层级。导入后，Datasmith场景资源中的场景层级将包含所有相同的信息，就像第一次导入这个场景一样。

但是，对场景层级的这些更改不一定会反映到包含Datasmith场景的虚幻引擎关卡中。你放到项目关卡中的Datasmith场景实例在关卡中拥有过时的场景层级，直到你将它们与更新后的资源 **同步** 为止。

同步会更新Datasmith场景Actor中的信息以及它在世界大纲视图中的子代，以便与更新后的资源匹配，如下所示：

-   **修改的Actor。** 你 *没有* 在虚幻编辑器中修改的任何Actor都会立即更新，以与重新导入的Datasmith场景中的最新相关信息匹配。你 *已经* 在虚幻编辑器中修改的任何Actor会进行更新，以与重新导入的Datasmith场景中的最新信息匹配，但Datasmith作为覆盖跟踪的更改 *除外*。
    
-   **新Actor。** 自上次导入以来添加到源文件的任何新对象都会在关卡中添加新的Actor来代表它们。
    
-   **删除的Actor。** 你从源文件中删除的任何对象都会从虚幻关卡中 *删除* 其对应的Actor——除非这些Actor包含其他覆盖。如果与已删除对象对应的虚幻Actor包含覆盖，则除非特意删除，否则不会从关卡中删除这类Actor。 在默认情况下，你已从虚幻关卡中删除但仍存在于源文件中的任何Actor *不会* 添加回关卡。但是，当你将关卡中的Datasmith场景Actor与重新导入的Datasmith场景资源同步时，可以启用这个选项。
    
-   **父子关系。** 关卡中的Actor父子层级会进行更新，以与源文件中的更改匹配。
    

例如，以下前后对比图像描述的是：

1.  已从源场景中删除的对象（在本例中是Lift对象）会从Datasmith场景中删除。
    
2.  在源场景中，对对象父子结构所做的更改（在本例中，光源分组到一个新的父代下面）会反映到Datasmith场景中。
    
3.  已添加到源场景的对象（在本例中为工具箱）会添加到Datasmith场景。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f28db01-4b14-47ae-80bb-381d76acf48e/datasmith-reimport-scene-hierarchy.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f28db01-4b14-47ae-80bb-381d76acf48e/datasmith-reimport-scene-hierarchy.png)

点击查看大图

你可以通过两种方法将Datasmith场景Actor与其资源同步：

-   在重新导入Datasmith场景资源时，可以自动更新当前打开关卡中从该资源创建的任何Datasmith场景Actor。这是一种简单的方法，适用于只在一个关卡中添加了Datasmith场景的情况。
    
-   你可以随时根据需要，将关卡中的Datasmith场景Actor与其Datasmith场景资源同步。如果项目中有不同的关卡包含Datasmith场景的实例，并且你需要它们全部反映出源场景中的更改，则需要使用这种方法。
    

有关详细信息，请参阅[重新导入Datasmith内容](/documentation/zh-cn/unreal-engine/reimporting-datasmith-content-into-unreal-engine)。

## 对几何结构、材质和纹理的更改

在重新导入Datasmith场景时：

-   *仅当* 自上次导入场景以来在源文件中修改了静态网格体、纹理和材质实例资源时，Datasmith才会重新创建这些资源。
    
-   无论是否在源文件中进行了修改，Datasmith **始终** 重新创建所有父材质资源。
    

当Datasmith重新创建资源时，它可能会覆盖你在虚幻中对资源所做的更改！

通常，你不应失去Datasmith作为覆盖跟踪的任何信息，或者特定于虚幻对场景对象的表示方法的任何信息。但是，你可能会失去你在虚幻中对Datasmith所导入、但Datasmith没有作为覆盖进行跟踪的信息的更改。例如，覆盖资源将覆盖你在虚幻中对父材质图表内部属性，或静态网格体资源几何结构所做的更改。

为避免失去你在虚幻中对资源所做的更改，你有两种选择：

-   重新导入时，在 **重新导入选项（Reimport Options）** 对话框中，取消选中对应资源类型的 **处理（Process）** 复选框，避免重新导入这类资源。例如，如果在虚幻中修改了一个导入的材质图表，你不想失去这些更改，可以取消选中 **材质和纹理（Materials & Textures）** 选项。但是，如果源文件中包含一些其他 *想要* 更新的材质资源，则不能使用这种方法。在这种情况下，你可以选择仅重新导入想要更新的资源类型，请参见下文的[单个资产重新导入](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#%E5%8D%95%E4%B8%AA%E8%B5%84%E4%BA%A7%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5)。
    
-   每当需要修改你通过Datasmith导入的资源时，将你想要修改的资源复制到其他文件夹，并修改副本。然后，将使用原始资源的地方更新为使用复制资源。重新导入时，原始资源将被覆盖，但复制资源保持不变。
    

当你删除源文件中的对象或材质后重新导入场景时，Datasmith不会删除它之前为这些对象创建的资源。这些资源保留在内容浏览器中，因此你可以继续在虚幻编辑器中，脱离Datasmith场景将它们当做独立资源使用。但是，当你同步某个关卡中的Datasmith场景Actor来匹配重新导入的Datasmith场景资源时，这些已删除资源的实例也会被删除（除非它们包含任何覆盖）。

以下前后对比图像描述了重新导入场景时静态网格体资源的变化：

1.  你在源文件中修改的对象（在本例中为球形灯罩）会在虚幻中重新创建，旧版本资源将被覆盖。
    
2.  你从源场景中删除的对象（在本例中为黄色升举元素）不会从项目的内容浏览器中删除。
    
3.  你添加到源场景的对象（在本例中为工具箱）作为新资源添加到内容浏览器。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aba6309f-1fee-4a00-963d-38a8cb2f9b04/datasmith-reimport-assets.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aba6309f-1fee-4a00-963d-38a8cb2f9b04/datasmith-reimport-assets.png)

点击查看大图

请记住，在虚幻引擎中更改资源时，更改会立即反映到使用该资源的所有地方。Datasmith在重新导入期间重新创建或修改资源也会如此。例如，如果你更改源应用程序中某个对象的几何结构，你会看到重新导入对应静态网格体资源后，关卡中用来体现该静态网格体资源的所有Actor都会自动更新以显示新的几何结构。

### 何时使用完整场景重新导入

我们建议在大多数情况下使用完整场景重新导入。尤其是在以下情况下，更需要重新导入完整场景：

-   你需要从源场景导入之前不存在于虚幻中的新对象或材质。
    
-   3D空间中的场景对象布局发生了更改，或对象在场景层级中有了新的父子关系，你需要反映到虚幻中。
    
-   你无法单独重新导入资源。这可能是因为，源文件中发生更改的对象过多，无法一一处理，或者因为你不知道哪些资源发生了更改。
    

## 单个资产重新导入

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f249495e-30e1-4123-88ac-843c07983708/datasmith-reimport-asset.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f249495e-30e1-4123-88ac-843c07983708/datasmith-reimport-asset.png)

点击查看大图

如果不重新导入整个Datasmith场景，你可以重新导入Datasmith导入流程创建的所选虚幻引擎资源——例如，单个静态网格体资源、材质或纹理。

在使用该选项时，整个过程几乎与上文[对几何结构、材质和纹理的更改](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#%E5%AF%B9%E5%87%A0%E4%BD%95%E7%BB%93%E6%9E%84%E3%80%81%E6%9D%90%E8%B4%A8%E5%92%8C%E7%BA%B9%E7%90%86%E7%9A%84%E6%9B%B4%E6%94%B9)所述相同，但仅限于你选择的单个资源。唯一的差别是：

-   资源始终是从头开始创建的，即使源场景中未进行修改也是如此。例如，以静态网格体资源为例，始终会重新构建静态网格体的几何结构，因此在虚幻中对几何结构所做的任何更改都会被覆盖。
    
-   Datasmith场景资源不会更改，因此对于你放入场景的任何关卡，其中的场景层级也不会发生更改，无论是否重新同步这些关卡中的Datasmith场景Actor都是如此。
    
-   由于Datasmith场景资源不会更改，它会继续跟踪上次导入整个场景以来对资源的覆盖。如果你重设重新导入资源上的覆盖，它会还原为上次导入整个Datasmith场景时的状态。
    

### 何时使用单个资产重新导入

在以下情况下，单个资产重新导入可能是合适的选择：

-   你想要导入对少量资源的更改，但你知道整个Datasmith场景包含对其他资源或场景层级的更改，而你 *不想* 导入这些更改。
    
-   你在导入整个Datasmith场景时对资源应用了一些设置，现在想对特定资源应用不同的Datasmith导入设置。
    

该工作流程对导入时需要进行曲面细分的CAD模型尤其有用，因为你可以对Datasmith场景的不同部分应用不同的曲面细分设置。这可能会帮助你控制每个静态网格体资源中的三角形数量，从而优化场景性能。例如，你可以导入具有低分辨率设置的CAD文件，然后选择重新导入少量的高分辨率的重要静态网格体资源。

对选定的静态网格体资源重新进行曲面细分也可以达到相同的目的，且不必重新导入。与重新导入不同，重新曲面细分不会从CAD场景文件中重新导入几何体。它会基于上一次导入的几何体，使用新设置为静态几何体资源重新生成三角形网格体。详情请参阅[二次曲面细分CAD几何体](/documentation/zh-cn/unreal-engine/retessellating-cad-geometry-in-unreal-engine)。

## 数据保留

无论是选择重新导入完整Datasmith场景还是单个资源，重新导入流程都会保留你在虚幻中所做的大部分工作，包括：

-   Datasmith作为覆盖跟踪的属性。请参见下文的[Datasmith覆盖](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#datasmith%E8%A6%86%E7%9B%96)。
    
-   虚幻引擎独有的属性。请参见下文的[虚幻引擎属性](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E5%B1%9E%E6%80%A7)。
    

### 虚幻引擎属性

你不应失去对虚幻特有的资源和Actor属性所做的更改——即，并非Datasmith从源文件导入的属性。

例如，假设你使用Datasmith导入场景，然后在虚幻编辑器中禁用了一个导入的静态网格体Actor的 **投射阴影（Cast Shadows）** 属性。在重新导入Datasmith场景资源并同步关卡中的Datasmith场景Actor时，该"投射阴影（Cast Shadows）"属性将保持禁用。

### Datasmith覆盖

在重新导入Datasmith场景或资源时，都不应该失去你对虚幻引擎资源或Actor所做的任何更改，Datasmith会将这些更改识别为 *覆盖*。覆盖包括分配给静态网格体资源和Actor的材质，关卡中作为Datasmith场景的一部分而创建的Actor的3D变换。

有关哪些更改会被视为覆盖的详细信息，请参阅[Datasmith导入流程](/documentation/zh-cn/unreal-engine/datasmith-import-process-in-unreal-engine)。

下次在重新导入Datasmith场景后重设对资源或Actor的覆盖时，虚幻资源或Actor会重设为重新导入 *后* 的值，而不是 *原始* 值。例如：

-   假设你的场景包含一个名为"椅子（Chair）"的静态网格体资源，在初始Datasmith导入后，为其分配了名为"Color\_00000000"的材质。
    
-   在虚幻编辑器中，你修改这个资源，让其使用一个新的基于物理的材质，名为"黑色皮革（Black Leather）"。Datasmith会将这个更改视为覆盖进行跟踪。
    
-   现在，在你的源场景中，你更改了椅子的颜色属性，并重新导入相应资源或包含椅子的Datasmith场景。起初，你重新导入的资源分配到的仍然是你在虚幻中分配的"黑色皮革（Black Leather）"材质。
    
-   如果你重设该资源的覆盖，它 *不会* 还原为使用原始的"Color\_00000000"材质，而是还原为使用Datasmith新生成的材质资源来匹配椅子的新颜色属性。
    

## 自动重新导入

你可以配置虚幻编辑器来监视所选文件夹中的资源是否发生了更改，然后自动重新导入这些资源。

我们不建议将该系统用于Datasmith场景资源或用于Datasmith创建的单个资源。自动导入仅适用于你添加到项目的其他类别的模型或资源，例如，作为Datasmith模型的额外布景单独导入的FBX文件。

有关为非Datasmith内容设置该系统的详细信息，请参阅[自动重新导入](/documentation/zh-cn/unreal-engine/reimporting-assets-automatically-in-unreal-engine)。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [完整场景重新导入](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#%E5%AE%8C%E6%95%B4%E5%9C%BA%E6%99%AF%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5)
-   [对场景层级的更改](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#%E5%AF%B9%E5%9C%BA%E6%99%AF%E5%B1%82%E7%BA%A7%E7%9A%84%E6%9B%B4%E6%94%B9)
-   [对几何结构、材质和纹理的更改](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#%E5%AF%B9%E5%87%A0%E4%BD%95%E7%BB%93%E6%9E%84%E3%80%81%E6%9D%90%E8%B4%A8%E5%92%8C%E7%BA%B9%E7%90%86%E7%9A%84%E6%9B%B4%E6%94%B9)
-   [何时使用完整场景重新导入](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8%E5%AE%8C%E6%95%B4%E5%9C%BA%E6%99%AF%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5)
-   [单个资产重新导入](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#%E5%8D%95%E4%B8%AA%E8%B5%84%E4%BA%A7%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5)
-   [何时使用单个资产重新导入](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8%E5%8D%95%E4%B8%AA%E8%B5%84%E4%BA%A7%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5)
-   [数据保留](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#%E6%95%B0%E6%8D%AE%E4%BF%9D%E7%95%99)
-   [虚幻引擎属性](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E5%B1%9E%E6%80%A7)
-   [Datasmith覆盖](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#datasmith%E8%A6%86%E7%9B%96)
-   [自动重新导入](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine#%E8%87%AA%E5%8A%A8%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5)