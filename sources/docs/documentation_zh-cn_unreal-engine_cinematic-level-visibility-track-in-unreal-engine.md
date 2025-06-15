# 虚幻引擎关卡可视性轨道 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-level-visibility-track-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:12:07.803Z

---

目录

![关卡可视性轨道](https://dev.epicgames.com/community/api/documentation/image/109f54fb-9527-4013-8bd0-71c60e5eeb49?resizing_type=fill&width=1920&height=335)

在序列中有时您可能希望切换整个 [**关卡**](/documentation/404) 的可见性。您可以通过在 Sequencer 中使用 **关卡可见性轨道** 将关卡设置为 **可见** 或 **隐藏** 来实现这一点。 此操作不会流式切入/切出关卡，而会将关卡中的所有内容设置为可见或隐藏。

在本示例中我们创建两个含有独特内容的非常小的关卡，然后在我们的过场动画中切换这些关卡的可见性。

## 步骤

在本操作指南中，我们使用 **Blueprint Third Person Template**，并启用了 **起步内容**。

1.  在 **内容浏览器** 中，在您的项目中 **右键单击**，然后创建两个 **关卡**，分别名为 **Level01** 和 **Level02**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3336e287-05f1-4f20-9666-282621d2bc67/visibility01.png)
2.  打开 **Level01**，然后在视口中单击 **查看模式（View Mode）**下拉菜单，选择 **不照亮（Unlit）**
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89d088de-79a9-47cf-83e6-17003e3b81b8/visibility02.png)
    
    因为没有光照，所以更便于看到我们放在关卡中的项目。
    
3.  在 **内容浏览器** 中的 **Content/StarterContent/Architecture** 下，将 **SM\_AssetPlatform** 拖动到关卡中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49bc764e-2d5d-4e13-a114-1eceab438c2b/visibility03.png)
4.  在 **内容浏览器** 中的 **Content/StarterContent/Props** 下，将 **SM\_Chair** 拖动到关卡中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e596946d-cb8f-4328-a93b-cbaf88049aa0/visibility04.png)
5.  **保存（Save）**关卡，然后打开 **Level02**，将 **Wall\_Door\_400x300** 拖动到关卡中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/faa9c8e9-056c-4b9d-934e-8885e722ffdd/visibility05.png)
6.  将 **Floor\_400x400**（或其他任何资产）拖动到关卡中，如下图所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51022419-638d-4dc2-945b-7cb214fc8fc8/visibility07.png)
    
    我们添加的内容仅用作示例，旨在区分关卡 01 与关卡 02。您可随意添加自己的内容！
    
7.  在 **内容浏览器** 中的 **Content/ThirdPersonBP/Maps** 下，打开 **ThirdPersonExampleMap** 并将视口设置为 **照亮（Lit）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/123d1599-bde2-4a56-bc57-a51d911b8068/visibility08.png)
8.  从菜单栏选择 **窗口（Window）**，然后选择 **关卡（Levels）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3775898d-f8ab-42da-b920-09f9c07d534c/visibility09.png)
9.  单击 **关卡（Levels）**下拉菜单，然后选择 **添加现有项...（Add Exisiting...）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/325b3d88-2e90-42f2-9ba9-7491776390a2/visibility10.png)
    
    我们需要添加要让关卡可见性轨道影响的关卡。
    
10.  在 **打开的关卡（Open Level）**窗口中指向您的 **Level01**，然后重复以上过程并添加 **Level02**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b884c56e-4957-417a-9af1-092ca07c9c79/visibility11.png)
11.  按住 **Shift** 并单击每个关卡，然后 **右键单击**，将 **流式方法（Streaming Method）**改为 **总是加载（Always Loaded）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ac8d161-456e-43e4-99f7-83c3dfb847d0/visibility12.png)
    
    这样我们就可以通过 Sequencer 的可见性轨道选择性地打开/关闭每个关卡。
    
12.  **右键单击** **持久关卡（Persistent Level）**，选择 **设为当前关卡（Make Current）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e6d42cb-d82e-4a64-86c8-c8eef3d6298b/visibility13.png)
    
    现在我们的关卡已经设置好了，我们可以跳转到 Sequencer 中，使用我们的关卡可见性轨道来影响它们。
    
    请参见 [关卡流送](/documentation/zh-cn/unreal-engine/level-streaming-in-unreal-engine) 了解更多关于关卡流式播放的信息。
    
13.  在工具栏中单击 **过场动画（Cinematics）**，再选择 **添加关卡序列（Add Level Sequence）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba027fbe-059c-4213-97a3-eb97baa2863c/visibility14.png)
14.  在 Sequencer 中单击 **添加（Add）**按钮并添加 **关卡可见性轨道（Level Visibility Track）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0249ee08-c749-4a6f-9c05-d08212a1ec10/visibility15.png)
15.  在关卡可见性轨道上，单击 **可见性触发器（Visibility Trigger）**按钮，然后添加两条 **可见（Visible）**轨道和两条 **隐藏（Hidden）**轨道。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a340af1e-0cac-4576-a6fd-6fa7b0768584/visibility16.png)
16.  **右键单击** 最上面的可见轨道，然后在 **属性（Properties）**下面单击 **关卡名称（Level Names）**旁的 **+**，输入 **Level01**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bad0507e-db53-4640-aaf2-b55f6f9452fd/visibility17.png)
    
    **关卡名称（Level Names）**字段是我们定义要影响哪些关卡的地方，我们为此轨道将其设置为 **Level01**。
    
17.  对第二条 **可见** 轨道重复上一步，但使用 **Level02** 代之。
    
18.  对于两条 **隐藏** 轨道，将其中一条的 **关卡名称（Level Names）** 设置为 **Level01**，另一条的设置为 **Level 02**，然后按下图所示排列。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b96961d3-2a6f-4c30-87e0-ec3b8301027c/visibility18.png)
    
    在上图中，上面的两条轨道与 **Level01** 相关，该关卡将从可见变为隐藏。下面的两条轨道与 **Level02** 相关，该关卡将先 **隐藏**，然后变为 **可见**。
    
    您可能看不到放在关卡中的项目，请使用 **WASD** 键并从关卡下方检查。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f427d3af-04ee-4924-a573-a2633e7e14d0/visibility19.png)
    
    流式切入时它们的显示位置基于它们在其相应关卡中的放置位置。您可以像选择任何其他 Actor 一样选择关卡流式切入 Actor，并可使用 [**转换工具**](/documentation/zh-cn/unreal-engine/transforming-actors-in-unreal-engine) 对其进行操纵。
    
19.  使用序列编辑器的预览 **播放（Play）**按钮来播放关卡序列。
    

## 最终结果

放在 Level 01 中的项目将在持久关卡中先出现，然后消失，同时放在 Level 02 关卡中的项目会出现。

我们还将关卡序列资产拖动到关卡中，并启用了 **自动播放（Auto Play）**选项，这样就能使用 **在编辑器中播放（Play in Editor）**选项。

使用关卡可见性轨道时有一点必须牢记，虽然可以将关卡及其资产切换为隐藏或可见，但这并不会卸载或加载关卡，每个关卡仍然驻留在内存中，并根据您选择的设置渲染或不渲染。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/cinematic-level-visibility-track-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/cinematic-level-visibility-track-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)

相关文档

[

关卡

![关卡](https://dev.epicgames.com/community/api/documentation/image/31a4e420-7eca-4a94-843b-4b5fbf2fdbd1?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/levels-in-unreal-engine)