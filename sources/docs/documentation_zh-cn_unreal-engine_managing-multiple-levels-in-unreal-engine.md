# 在虚幻引擎中管理多个窗口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:57:28.160Z

---

目录

![管理多个关卡](https://dev.epicgames.com/community/api/documentation/image/0d8b0349-e170-4528-a4c8-599e96d4bccd?resizing_type=fill&width=1920&height=335)

在 **虚幻引擎（Unreal Engine）** 4旧版项目或非游戏项目（例如建筑可视化）上工作时，你可以使用 **关卡（Levels）** 窗口进行关卡管理。对于虚幻引擎5.0及更高版本中的游戏开发， **关卡（Levels）** 窗口被[世界分区](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)废弃。本页面涵盖了如何通过 **关卡（Levels）** 窗口管理多个关卡。

这些步骤使用[建筑模板](/documentation/zh-cn/unreal-engine/unreal-engine-templates-reference#%E5%BB%BA%E7%AD%91%E3%80%81%E5%B7%A5%E7%A8%8B%E5%92%8C%E6%96%BD%E5%B7%A5%E6%A8%A1%E6%9D%BF)作为参考。

你还可以从 **窗口（Windows）** 菜单访问 **关卡（Levels）** 窗口。

![访问关卡窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07bd5285-b0cc-4191-a684-b07493f38bca/ue5-levels-window.png)

你将总是拥有一个 **持久关卡（Persistent Level）** ，并且你可以有一个或多个子关卡，子关卡总是通过 **关卡流送体积（Level Streaming Volumes）** 、 **蓝图（Blueprints）** 或 **C++代码（C++ code）** 加载或流送。 **关卡（Levels）** 窗口会显示所有这些关卡，使你能够更改哪个关卡是当前关卡（以粗体蓝色文本表示），保存一个或多个关卡，并访问关卡蓝图。如果在关卡编辑器的视口中做出了更改，你将修改当前关卡。你可以使用此窗口处理多个贴图，前提是贴图都可写。

![持久关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e0f204e-1999-4a1f-8b6c-e0edd138e7bb/ue5-persistent-level.png)

右键点击 **持久关卡（Persistent Level）** 后，会显示多个操作选项，包括将该关卡设置为当前关卡、更改可视性和锁定状态、选中关卡中的所有Actor。

![持久关卡上下文菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3a9e806-664e-4110-a427-2ddec2c2b190/ue5_right_clicl_persistent.png)

子关卡也有类似的选项，此外，还有一些用于移除子关卡和更改流送方法的额外选项。

![子关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a5e19be-78e6-42de-9668-748016135b19/ue5-sub-level.png)

更改关卡的可视性只会影响它的显示，不会对关卡能否加载进游戏产生影响。不过，当你重新生成关卡时，此处不可见的关卡将不参与构建过程；如果你的关卡很复杂，这样能大大节省时间。

## 添加新的子关卡

持久关卡或子关卡的一部分可以拆分出来，作为新的子关卡。你也可以新建关卡或添加现有关卡来创建子关卡。 添加新的子关卡后，该关卡会自动成为"当前关卡"。因此，如果你想继续使用之前的关卡，请记得右键单击之前的关卡，在菜单中 **设为当前（Make Current）** 。

### 添加已有关卡

1.  单击 **关卡（Levels）** 下拉菜单，然后选择 **添加现有（Add Existing）** ，添加一个新的子关卡。
    
    ![添加现有关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de5c829a-67fb-46b5-8393-aa5ccf924ada/ue5-add-existing.png)
2.  在 **打开关卡（Open Level）** 对话框中选择要添加的关卡，然后单击 **打开（Open）** 。
    
    ![打开现有关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08bdf740-b0b0-4d9d-98c6-63c742be6618/ue5-open-existing-level.png)

### 新建空白子关卡

1.  单击 **关卡（Levels）** 下拉菜单，然后选择 **新建（Create New）** ，新建一个空白子关卡。
    
    ![新建子关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c720d2cd-1534-49f7-b65c-2a06ec749466/ue5-create-new.png)
2.  选择创建空白关卡或模板
    
    ![创建空白或基于模板的子关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25df5f87-91b9-4f1c-9318-9670c2f88be4/ue5-choose-level-creation.png)
3.  为关卡选择保存位置和名称，然后点击 **保存（Save）** 。
    
    ![保存新关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fae005ed-487f-46d7-9738-01e92aae4fba/ue5-save-new-level.png)
    
    新关卡将作为当前持久关卡的子关卡，同时也会变成当前关卡，供你在 **视口** 中操作。
    

### 拆分子关卡

如果你想把关卡的一部分拆分出来，以便单独加载它或与团队协作编辑），你可以选中要用的Actor，用它们新建一个关卡。

1.  在 **场景大纲视图（Scene Outliner）** 或 **视口（Viewport）** 中选中所有要移到新关卡的Actor。
    
2.  在 **关卡（Levels）** 窗口中，单击 **关卡（Levels）** 下拉菜单，然后选择 **使用选定Actor新建（Create New with Selected Actors）** 以创建一个新子关卡。
    
    ![使用所选Actor新建](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50be65e3-eb5a-448c-a267-b5aab90d7597/ue5-new-level-from-actors.png)
3.  为关卡选择一个保存位置和名称，然后单击 **保存（Save）** 。
    
    ![保存关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f99be1c8-b31a-473f-aea1-4db2ddee9ea6/ue5-name-new-actor-level.png)
    
    所有选中的Actor都会在原有关卡中被移除，并被添加到新关卡中。新关卡将作为当前持久关卡的一个子关卡，并被设置为当前关卡，供你在视口中处理。
    
    如果你移动的Actor被某个保留在持久关卡中的Actor所引用，引擎会弹出消息，询问你是否真的要将其从持久关卡中删除。
    

![删除新关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/274419e4-bbc0-4965-97fc-5b330a7a5e9b/deletenewlevel.png)

## 在关卡间迁移Actor

你可以先在当前关卡中复制Actor，然后切换到目标关卡并粘贴Actor时。不过，有一种更简单的方法。

1.  在 **场景大纲视图（Scene Outliner）** 中或 **视口（Viewport）** 中选中要移至新关卡的Actor。
    
2.  在 **关卡（Levels）** 窗口中， **右键单击** 关卡，然后在右键菜单中选择 **移动所选Actor至关卡（Move Selected Actors to Level）** 。
    
    ![根据选择的Actor新建关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e92b940f-07ed-4b90-bd67-523eeb1bd979/ue5-move-actors.png)
3.  按下 **Ctrl+S** ，保存所有关卡。
    

## 关卡细节

在 **关卡（Levels）** 窗口中，点击图中的的放大镜标识可以打开 **关卡细节（Level Details）** 窗口，它允许你访问当前关卡的更多信息。若要设置关卡流送体积（Level Streaming Volumes），你需要打开关卡的 **关卡细节（Level Details）** ；详细操作过程，请参阅[关卡流送体积参考](/documentation/zh-cn/unreal-engine/level-streaming-using-volumes-in-unreal-engine)。

![关卡细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6dc1c2a-b22d-4afd-a4a3-1959bf6f4fed/ue5-level-details.png)

持久关卡没有额外的细节信息，除了一个用于切换到其他关卡的菜单。

![持久关卡细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d9ec595-903a-4d19-826c-499328a61766/ue5-persistent-level-detail.png)

你可以设置子关卡的偏移 **位置（Position）** 和 **旋转（Rotation）** ，要使用的 **流送体积（Streaming Volumes）** 和调试用的 **关卡颜色（Level Color）** 。此处还有一些用于提升性能的高级设置，例如卸载请求之间的最小时间间隔。

![关卡细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27779b1b-daf0-4a87-a3cc-ac6e42bc274f/ue5-sublevel-details.png)

## 子关卡可视化选项

你可以在主 **关卡（Levels）** 窗口中或 **关卡细节（Level Details）** 窗口中设置子关卡的颜色。

若要切换关卡颜色，请点击视口上的 **显示（Show）** 按钮，然后选择 **高级（Advanced）> 关卡颜色（Level Coloration）** 。

![关卡颜色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9dd7b65-b8c9-49d9-a791-f5818be9bba9/ue-level-coloration.png)

持久关卡将用白色显示，而所有子关卡将用它们的选定颜色表示。 **关卡颜色（Level Coloration）** 只能在透视和正交视口下工作；在 **游戏模式（Game Mode）** 下会被关闭。

![查看关卡颜色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbd8e7f4-b51f-4826-ae9f-e1a418126626/ue5-social.png)

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [level streaming](https://dev.epicgames.com/community/search?query=level%20streaming)
-   [level design](https://dev.epicgames.com/community/search?query=level%20design)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [添加新的子关卡](/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%9A%84%E5%AD%90%E5%85%B3%E5%8D%A1)
-   [添加已有关卡](/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%B7%B2%E6%9C%89%E5%85%B3%E5%8D%A1)
-   [新建空白子关卡](/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine#%E6%96%B0%E5%BB%BA%E7%A9%BA%E7%99%BD%E5%AD%90%E5%85%B3%E5%8D%A1)
-   [拆分子关卡](/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine#%E6%8B%86%E5%88%86%E5%AD%90%E5%85%B3%E5%8D%A1)
-   [在关卡间迁移Actor](/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine#%E5%9C%A8%E5%85%B3%E5%8D%A1%E9%97%B4%E8%BF%81%E7%A7%BBactor)
-   [关卡细节](/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine#%E5%85%B3%E5%8D%A1%E7%BB%86%E8%8A%82)
-   [子关卡可视化选项](/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine#%E5%AD%90%E5%85%B3%E5%8D%A1%E5%8F%AF%E8%A7%86%E5%8C%96%E9%80%89%E9%A1%B9)

相关文档

[

关卡

![关卡](https://dev.epicgames.com/community/api/documentation/image/31a4e420-7eca-4a94-843b-4b5fbf2fdbd1?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/levels-in-unreal-engine)