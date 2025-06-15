# 在虚幻引擎过场动画中为材质制作动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animate-materials-in-unreal-engine-cinematic
> 
> 生成时间: 2025-06-14T20:12:06.892Z

---

目录

![材质轨道](https://dev.epicgames.com/community/api/documentation/image/2d9cd80f-9e90-4b3c-8c6c-8cdb50c86db3?resizing_type=fill&width=1920&height=335)

在 **Sequencer** 中，你可以通过各种方式更改你的 **Actor** 上的 **材质** 以及为其制作动画。使用 **材质切换器轨道（Material Switcher Track）** 更改哪个材质当前应用于Actor，使用 **材质参数轨道（Material Parameter Track）** 为[材质参数](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine#materialparameterization)制作动画，或使用 **材质参数集合轨道（Material Parameter Collection Track）** 同时为多个材质制作动画。

本页面将介绍在Sequencer中为Actor上的材质制作动画的各种方法。

#### 先决条件

-   你了解[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)及其[接口](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)。
-   您基本了解如何创建[材质](/documentation/zh-cn/unreal-engine/unreal-engine-materials)、[材质参数](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine#%E6%9D%90%E8%B4%A8%E5%8F%82%E6%95%B0%E5%8C%96)、[材质参数集合](/documentation/zh-cn/unreal-engine/using-material-parameter-collections-in-unreal-engine)。

## 切换材质

要在播放序列期间将Actor的材质切换为不同的材质，请使用 **材质切换轨道（Material Switch Track）** 。如果你已经创建预设材质实例并想立即在它们之间切换，此轨道会很有用。

要切换你的Actor上的材质，请首先在Sequencer中添加该Actor的网格体组件轨道。点击 **添加轨道（Add Track (+)）** 并选择 **网格体组件（Mesh Component）** 。

![添加网格体组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b5938ee-53e6-4cdd-851d-9112fb4d2d25/switcher1.png)

接下来，在 **组件轨道（Component Track）** 上点击 **添加轨道（Add Track (+)）** 并添加 **材质元素切换器（Material Element Switcher）** ，从而添加此组件的材质切换器轨道。元素编号对应于当前分配给网格体的 **材质元素（Material Elements）** 。要更改多个材质，请添加所有必要元素的切换器。

![添加材质元素切换器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff92a4e2-bccd-4fcc-b376-bed492bafde6/switcher2.png)

添加轨道后，你可以将其[设为关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)，以设置你想在特定时间应用的材质。要更改分配的材质，请点击材质切换器轨道上的下拉菜单，并选择不同的材质。

![材质切换器更改材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1135f9d-08e9-40ee-9803-104ca921c3d8/switcher3.png)

现在你可以推移或播放序列，并观察材质切换。

![材质切换器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef2b4c23-626f-4d6c-99ec-bf51325f6656/switcher4.gif)

## 为材质参数制作动画

要在材质中随时间推移为特定[材质参数](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine#%E6%9D%90%E8%B4%A8%E5%8F%82%E6%95%B0%E5%8C%96)制作动画，请使用 **材质参数轨道（Material Parameter Track）** 。

类似于切换材质，你必须先在Sequencer中添加该Actor的网格体组件轨道。在Actor轨道上点击 **添加轨道（Add Track (+)）** 并选择 **网格体组件（Mesh Component）** 。

![添加网格体组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b23dd99e-c453-407e-aecf-4099a380aa10/switcher1.png)

接下来，在 **组件轨道（Component Track）** 上点击 **添加轨道（Add Track (+)）** 并添加 **材质参数元素（Material Parameter Element）** ，从而添加此组件的材质参数轨道。元素编号对应于当前分配给网格体的 **材质元素（Material Elements）** 。要为多个材质上的参数制作动画，请添加所有必要元素的材质参数轨道。

![添加材质元素](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe7af111-cf87-4b99-96c8-3b1a570f5e54/param1.png)

添加元素轨道后，添加要制作动画的特定材质参数。在 **材质元素轨道（Material Element Track）** 上点击 **添加参数（Add Parameter (+)）** ，然后选择参数。根据需要为你的元素添加任意数量的参数轨道。

![添加参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ad20fa2-3356-484a-9d41-60ff4b111b48/param2.png)

根据添加的参数类型，Sequencer将使用兼容的[属性轨道](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E5%B1%9E%E6%80%A7%E8%BD%A8%E9%81%93)与之交互。例如，添加 **向量参数（Vector Parameter）** 将创建[颜色轨道](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E9%A2%9C%E8%89%B2)

添加参数轨道后，你可以照常将其[设为关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)，为参数制作动画。此后，推移或播放序列，观察参数更改的效果。

![为材质参数制作动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e70fda3-11b7-49a8-a9db-6d4b21ed7ce9/param3.gif)

正如常规的分段用法那样，材质参数分段可以通过重叠其分段来彼此[混合](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine#%E6%B7%B7%E5%90%88)。这很适合用于在不同的预设材质状态之间混合，而不是直接为其制作动画。

![混合材质参数分段](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7986bfd-727a-46fa-b4a8-4cb990e41a74/param4.gif)

## 为材质参数集合制作动画

Sequencer还包含用于为[材质参数集合](/documentation/zh-cn/unreal-engine/using-material-parameter-collections-in-unreal-engine)制作动画的 **材质参数集合轨道（Material Parameter Collection Track）** 。使用它直接为引用集合的材质制作动画，这样Sequencer可以同时影响多个材质。

要创建材质参数集合轨道，点击 **Sequencer** 中的 **添加轨道（Add Track (+)）** ，然后从 **材质参数集合轨道（Material Parameter Collection Track）** 菜单中选择你的 **材质参数集合资产** 。

![创建材质参数集合轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af5c1231-d502-49cd-808d-94bcd2b3ee2a/createtrack.png)

然后，你可以点击轨道上的 **添加参数（Add Parameter (+)）** 并选择一个参数，从该集合中添加单个参数。此处列出的参数基于在集合资产中创建的参数。选择参数后，将使用在当前时间沿时间轴设置的关键帧为其创建相应的轨道。

![添加材质参数集合参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08d51fec-515d-4b05-a217-2ac02ae1edcd/createparam.png)

鉴于材质参数集合具有任意性，而且它们在每个材质的图表中有不同的设置，材质参数集合轨道可以通过多种方式影响你的场景。在此示例中，向量参数用于控制角色上的其他色调。更改此参数会影响此材质的所有子实例。

![材质参数集合材质设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f6b5b8e-95ab-48d7-8b5c-37cbf0d2b8d1/materialsetup.png)

添加参数轨道后，你可以照常将其[设为关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)，为参数制作动画。此后，推移或播放序列，观察制作动画的参数集合的效果。

![为材质参数集合制作动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02643447-5fb4-4f9b-b2cf-463d49029cda/collection.gif)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/animate-materials-in-unreal-engine-cinematic#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [切换材质](/documentation/zh-cn/unreal-engine/animate-materials-in-unreal-engine-cinematic#%E5%88%87%E6%8D%A2%E6%9D%90%E8%B4%A8)
-   [为材质参数制作动画](/documentation/zh-cn/unreal-engine/animate-materials-in-unreal-engine-cinematic#%E4%B8%BA%E6%9D%90%E8%B4%A8%E5%8F%82%E6%95%B0%E5%88%B6%E4%BD%9C%E5%8A%A8%E7%94%BB)
-   [为材质参数集合制作动画](/documentation/zh-cn/unreal-engine/animate-materials-in-unreal-engine-cinematic#%E4%B8%BA%E6%9D%90%E8%B4%A8%E5%8F%82%E6%95%B0%E9%9B%86%E5%90%88%E5%88%B6%E4%BD%9C%E5%8A%A8%E7%94%BB)