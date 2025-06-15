# 虚幻引擎开放世界场景工具提示和技巧 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/open-world-tools-tips-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:17:36.855Z

---

目录

![开放世界场景工具提示和技巧](https://dev.epicgames.com/community/api/documentation/image/d5193a45-17c2-423e-9fe1-e895c26d4f61?resizing_type=fill&width=1920&height=335)

![Tip-Trick Header](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/481c2c07-559e-42ee-995f-5c2558dfd631/01-t-tip-trick-header.png "Tip-Trick Header")

在以下章节中，我们将学习充分使用开放世界场景工具的提示和技巧。 以下提示和技巧由 GDC 2015 中风筝 Demo 的 Epic 开发人员提供（他们所使用的工具正是开放世界场景工具）。 请注意：以下内容并非按步骤进行的教程，而是高阶阅读，以便了解可获得的效果和将这些技术应用到项目中的方法。

如需了解开放世界场景工具使用的更多基础信息，请查阅 [程序化植物快速入门](/documentation/zh-cn/unreal-engine/procedural-foliage-tool-in-unreal-engine) 或 [草地工具快速入门](/documentation/zh-cn/unreal-engine/grass-quick-start-in-unreal-engine)。

## 草地工具植物网格体剔除

调整草地工具的剔除，渲染超远距离的静态网格体时须注意：如选项设置过高，可能导致显卡和/或 UE5 编辑器会话崩溃。

在项目中使用草地工具时您可能会注意到 - 超过一定距离的静态网格体将不会被显示。 这称为剔除，是一种优化方法 - 离摄像机一定距离的物体将不会被渲染，以减轻项目的渲染负担。 在UE5中，有多种方法对草地工具停止渲染静态网格体的距离进行调整。 草地工具静态网格体剔除距离的第一种设置方法：在 **地形草地类** Actor 的 **Grass Varieties** 部分对 **开始** 和 **结束** 剔除距离进行设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67be0fd9-1c6a-403b-9911-ed27224c8288/02-grass-tool-cull-distanc.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67be0fd9-1c6a-403b-9911-ed27224c8288/02-grass-tool-cull-distanc.png)

点击查看大图。

上图为风筝 demo 中部分草地静态网格体的剔除设置。 上图中的原始数值为 6,500，如将其改为 30,000，较远的草地静态网格体也将被渲染。

![Default of 6,500](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b42b863-e6fa-4491-89c8-cdca0a9db552/03-original-settings-of-6-500.png "Default of 6,500")

![Set to 30,000](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51494aa8-351d-416f-b5e9-7230426894a0/04-new-setting-of-30-000.png "Set to 30,000")

Default of 6,500

Set to 30,000

仔细观察上方的对比截图会发现无论将 End Cull Distance 的数值设为多大，超过一定距离的静态网格体均不会被渲染。 如要渲染更远距离的静态网格体，需在 UE4 控制台输入以下带小数的命令。

```cpp
	Foliage.MinimumScreenSize 0.0001

```

**Foliage.MinimumScreenSize** 命令将在屏幕空间中增加或减少静态网格体被剔除的大小。 屏幕空间中的相对大小将结合到摄像机的距离使用，确保不会偶然性地对离摄像机很远的小物体进行渲染。 可将此设置看做一个全选操作，即使偶尔忽略一些网格体的剔除设置，项目性能也不会受到影响。 如需输入命令，在键盘上按下波浪键（~）或反勾号（\`）键在UE5编辑器中打开虚幻控制台。 打开虚幻控制台后，可看到类似下图的命令输入框出现在UE5编辑器底部。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d9490ff-e326-4773-9e76-f450879cf7ba/05-ue5-console.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d9490ff-e326-4773-9e76-f450879cf7ba/05-ue5-console.png)

点击查看大图。

将命令 **Foliage.MinimumScreenSize 0.0001** 输入控制台，然后按下 **Enter** 键应用。 重建草地图后，在视口中可以发现更远距离的静态网格体将被渲染。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd080f42-f6ee-43c1-a921-982ebd072b5b/06-ue5-foliage-command.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd080f42-f6ee-43c1-a921-982ebd072b5b/06-ue5-foliage-command.png)

点击查看大图。

对比图显示默认设置 **0.0001** 和 **0.00000001** 之间的剔除距离差异。

![Original Settings of 0.0001](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/383a9c6d-bef9-4389-b92c-74951688d744/07-setting-of-0-0001.png "Original Settings of 0.0001")

![Max Settings of 0.00000001](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/071635b4-02f5-450e-89ab-0091b7517ca2/08-setting-of-0-00000001.png "Max Settings of 0.00000001")

Original Settings of 0.0001

Max Settings of 0.00000001

请注意：使用大于默认 0.0001 的数值可能引起性能问题。 如需增加 Foliage.MinimumScreenSize 的数值，必须先进行性能测试，确保对剔除执行的变更不会对项目整体性能产生较大影响。

## 基于程序化植物体积域的遮罩

程序化生成整个森林可节约大量时间。如果需要限制特定树木只在特定区域生成，应该进行哪些操作？ 可通过一系列操作实现此效果，如使用多个程序化植物体积域，或使用植物工具在需要的地点放置树木。然而项目将复杂化，维护工作量将变大。 幸运的是，**植物类** 拥有对静态网格体（静态网格体被指定到地形材质中特定图层）放置进行限制的选项 - 在绘制中图层公开时只允许生成该植物类。

无论使用哪种方法，都需要在关卡中选择 **Procedural Foliage Volume**，然后点击 **Resimulate** 按钮更新并查看变更。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60f038ea-bc41-4c30-8601-390487e3cb2c/09-t-resim-button.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60f038ea-bc41-4c30-8601-390487e3cb2c/09-t-resim-button.png)

点击查看大图。

下图中是非常简单的地形材质设置，允许三种不同植物类使用三种不同纹理。 注意 **Layer Blend** 中每个输入的独特命名。 这些命名非常重要，因为它们决定着植物类受限的地形地貌图层。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/480767e8-239d-4a0c-9af6-a867fbc63cbc/10-t-landscape-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/480767e8-239d-4a0c-9af6-a867fbc63cbc/10-t-landscape-material.png)

点击查看大图。

地形材质设置好后，需要对植物类进行设置，使其与正确的地形图层关联。 下图中显示的植物类设置范例可将指定静态网格体限制放置在地形材质中的一个特定图层上。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/378f437b-d074-46fd-a573-b2eddc86c89a/11-t-restrict-to-landscape-layers.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/378f437b-d074-46fd-a573-b2eddc86c89a/11-t-restrict-to-landscape-layers.png)

点击查看大图。

如要进行自行设置，须在植物类中执行下列操作：

1.  展开 **Show Advanced** 箭头图表，显示 **Landscape Layers** 选项。
2.  按下 **elements** 右方的加号图标在阵列中添加一个新输入。
3.  为该植物类限制放置的地形材质图层输入命名。

设置好材质和植物类型后，将材质指定到地形地貌，然后以常规方式开始地形绘制。 绘制完成后（或如需查看当前效果），在关卡中选择程序化植物体积域，然后按下 **Resimulate** 按钮更新并应用变更。 完成后，生成的植物将被限制在与其关联的地形纹理中（如下图所示）。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/575d9a36-1bb7-46ce-bb64-f49c8bd130aa/12-t-content-breakdown.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/575d9a36-1bb7-46ce-bb64-f49c8bd130aa/12-t-content-breakdown.png)

点击查看大图。

仔细观察上图可发现所有植物均已按预期被程序化放置，而生成的网格体不会相互混杂。 例如阔叶树只在应用青草纹理的地形上生成。 仔细观察会发现灌木和松树也只在其各自限制的地形上生成。

## 草地工具基于纹理的遮罩

控制植物网格体生成或不能生成的另一种方法：使用一个纹理作为遮罩对开放世界场景工具发出指令，使其在特定区域生成或不生成植物网格体。 下图中的简单材质展示基于纹理的遮罩。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4afa701-189d-4e33-8b57-3d2322dbb50c/13-t-texture-based-masking.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4afa701-189d-4e33-8b57-3d2322dbb50c/13-t-texture-based-masking.png)

点击查看大图。

上图的最左边是 World Position Scaling 部分。 它可在世界空间中调整遮罩纹理的尺寸，使其与地形地貌相匹配。 图中偏左位置的遮罩纹理用于定义植物放置的位置，以及两个地形纹理的混合。 以下是遮罩纹理各种通道的用途详解：

-   **红色通道**：此通道定义地形上草地网格体的生成位置，以及基于地形的纹理混合方式。
    
-   **绿色通道**：此通道定义地形上岩石网格体的生成位置。
    

图中最右边的是主材质节点和草地输出。 主材质节点的设置方法与其他标准材质相同。 草地输出的设置与基于纹理的遮罩相似，关键的不同点在于使用纹理被遮罩或未被遮罩的部分生成/不生成静态网格体（而非只显示不同的纹理）。 在UE5中将此材质应用到地形后，获得的效果与下图相似。图中左上角的遮罩纹理展示遮罩颜色在地形中的具体作用。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/defda909-6b52-4fbe-a534-57a2451f9130/14-t-masking-in-action.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/defda909-6b52-4fbe-a534-57a2451f9130/14-t-masking-in-action.png)

点击查看大图。

在上图中，大部分草地静态网格体只在使用遮罩纹理红色通道的区域中生成，而石块则由遮罩纹理的绿色通道生成。 您可能已经注意到，草地和石块并非完全处于其生成的遮罩纹理区域中。 这是正常现象，通过静态网格体的颤抖和偏移获得更真实自然的效果。

## 草地工具基于数学的遮罩

虽然纹理遮罩的使用方便而快捷，但有时会因为性能原因而无法承担额外的纹理数据，或不需要对放置进行过度控制。 在这些情况下，可使用材质编辑器中创建的数学函数替代纹理进行网格体放置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/080b6527-4b05-42d2-b4d2-69d785335a92/15-t-math-based-masking.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/080b6527-4b05-42d2-b4d2-69d785335a92/15-t-math-based-masking.png)

点击查看大图。

上图中我们沿用了上例中的材质，但变更了草地和石块的生成方式。 此例使用 **Checker Pattern** 材质函数控制放置，使草地和石块以棋盘模式生成。 **1-** 被添加至石块，在不生成草地的区域生成石块。 应用至地形后的效果与下图相似：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f13415c3-21b6-4491-a283-ce7c0ad94317/16-t-check-pattern.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f13415c3-21b6-4491-a283-ce7c0ad94317/16-t-check-pattern.png)

点击查看大图。

## 草地工具的非随机放置

通过正确调整，草地工具还可用于模拟多种效果（如作物在田地中的生长）。 下图即为此类范例：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfdaf106-2b44-4e91-a7f9-4f9b8690974e/17-t-spawing-in-row.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfdaf106-2b44-4e91-a7f9-4f9b8690974e/17-t-spawing-in-row.png)

点击查看大图。

如要使草地工具拥有此类功能，须勾选 **Use Grid**，将 **Placement Jitter** 设为 **0**，再将 **Grass Density** 设为 100 以下的数值。 下图是地形草地类的设置情况，达成的效果即为上图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5ced6e8-51fc-443a-a774-7adb6f7f3b12/18-t-lgt-crops-setup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5ced6e8-51fc-443a-a774-7adb6f7f3b12/18-t-lgt-crops-setup.png)

点击查看大图。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [open world](https://dev.epicgames.com/community/search?query=open%20world)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [草地工具植物网格体剔除](/documentation/zh-cn/unreal-engine/open-world-tools-tips-in-unreal-engine#%E8%8D%89%E5%9C%B0%E5%B7%A5%E5%85%B7%E6%A4%8D%E7%89%A9%E7%BD%91%E6%A0%BC%E4%BD%93%E5%89%94%E9%99%A4)
-   [基于程序化植物体积域的遮罩](/documentation/zh-cn/unreal-engine/open-world-tools-tips-in-unreal-engine#%E5%9F%BA%E4%BA%8E%E7%A8%8B%E5%BA%8F%E5%8C%96%E6%A4%8D%E7%89%A9%E4%BD%93%E7%A7%AF%E5%9F%9F%E7%9A%84%E9%81%AE%E7%BD%A9)
-   [草地工具基于纹理的遮罩](/documentation/zh-cn/unreal-engine/open-world-tools-tips-in-unreal-engine#%E8%8D%89%E5%9C%B0%E5%B7%A5%E5%85%B7%E5%9F%BA%E4%BA%8E%E7%BA%B9%E7%90%86%E7%9A%84%E9%81%AE%E7%BD%A9)
-   [草地工具基于数学的遮罩](/documentation/zh-cn/unreal-engine/open-world-tools-tips-in-unreal-engine#%E8%8D%89%E5%9C%B0%E5%B7%A5%E5%85%B7%E5%9F%BA%E4%BA%8E%E6%95%B0%E5%AD%A6%E7%9A%84%E9%81%AE%E7%BD%A9)
-   [草地工具的非随机放置](/documentation/zh-cn/unreal-engine/open-world-tools-tips-in-unreal-engine#%E8%8D%89%E5%9C%B0%E5%B7%A5%E5%85%B7%E7%9A%84%E9%9D%9E%E9%9A%8F%E6%9C%BA%E6%94%BE%E7%BD%AE)