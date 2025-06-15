# 虚幻引擎Paper 2D中的Sprite插槽 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/paper-2d-sprite-sockets-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:16:11.533Z

---

目录

![使用 Sprite 插槽](https://dev.epicgames.com/community/api/documentation/image/88facaa8-afca-499f-8574-4ef761179b44?resizing_type=fill&width=1920&height=335)

此页面讲述如何对 sprite 添加插槽，然后从可附加对象的蓝图访问这些插槽。可从 sprite 插槽（如身上着火的角色）生成粒子特效，将一把武器（如一把枪或一把剑）附加到角色手上，或生成任意数量的各种物品并附加到 sprite 的插槽。

在此例中，我们将把一顶帽子附加到角色的头上。

**为 sprite 添加插槽的步骤**：

1.  找到需要添加插槽的 sprite 并打开。
    
2.  在 **Details** 面板中点击 **Sockets** 旁边的 **+** 添加一个新的插槽。
    
3.  在 **Socket Name** 输入命名，并使用 **Local Transform** 或视口中的控件把插槽移动到所需之处。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2023575b-eb1d-4b7e-891a-33bd53e9b64c/addingsocket.png)
    
    在视口中移动插槽之前需要先将画面拉近并点击插槽。
    

需要记录插槽的命名。上图中新建了一个名为 *HatSocket* 的插槽，我们通过它生成一个 2D 帽子以便角色穿戴。以上步骤只包含了一个 sprite，而待机动画中使用了 8 个不同的 sprites，因此也需要为这些 sprite 添加插槽。

可使用 **Property Matrix** 快速执行此操作。

**为多个 sprite 添加插槽**：

1.  在 **Content Browser** 中，选择 Flipbook 动画中每个需要应用插槽的 sprite。
    
2.  在 sprite 上 **单击右键**，然后在 **Asset Actions** 下选择 **Property Matrix...**
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44eac082-b409-4663-a484-87d1e27bf4d5/propterymatrix.png)
    
    打开 **Property Matrix** 即可同时对所有 sprite 进行修改，节约时间。
    
    我们还选择了已添加插槽的 sprite 作为参考，因此一共选中了 8 帧。
    
3.  在 **Property Matrix** 中选择每个 sprite（不含插槽），然后点击 **+** 添加插槽。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1dddff9d-980f-4e2a-978f-711e6679ff14/addsockets.png)
4.  展开元素 0，然后在 **Socket Name** 下将它们的命名设为第一个 sprite 的命名（在此例中为 **HatSocket**）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cae4020-24f5-48b3-a6a7-6915c11de268/addsockets2.png)
5.  打开 **Local Transform**，再打开 **Translation**，将 XYZ 的数值设为第一个 sprite 的数值。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/424c4b4f-d5a9-4123-b6e7-ba270b24c055/addsockets3.png)
6.  在动画中打开每个 sprite，确保它们都已添加好插槽。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a80c812f-7e85-4925-9c16-be07d4e39f2a/addsockets4.png)
    
    可能需要调整每个 sprite 的插槽位置，确保其处在该帧中的所需位置。
    

现在，Flipbook 中每帧均附加了插槽，即可命令蓝图在插槽位置生成 actor。

**通过蓝图访问 Sprite 插槽**：

1.  在角色蓝图的 **My Blueprint** 窗口中点击眼睛图标和 **Show Inherited Variables**。
    
2.  **单击左键** 拖入角色的 **Sprite** 组件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16e16ad7-43fd-4bea-acf2-02971078908c/blueprint1.png)
3.  在 **Event Begin Play** 节点的引出连线后添加一个 **Spawn Actor from Class** 节点（设为所需的 Actor 类）。
    
4.  对 **Spawn Transform** 使用 **Make Transform** 节点，在 **Return Value** 的引出连线后使用一个 **Attach To** 节点。
    
5.  将 **Sprite** 组件作为 **In Parent** 连接，在 **In Socket Name** 输入创建的插槽。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8abc354a-6764-4ac3-b7e9-e9f344fdfc6b/blueprint2.png)
    
    设置与上图相似。例如，我们生成了一个名为 **Hat\_BP** 的蓝图，此蓝图包含帽子的 Sprite 组件（此组件在我们创建的 **HatSocket** 位置上被附加到角色上）。我们已对待机的帧执行以上操作，然后再对奔跑的帧执行相同步骤，最后角色将头戴一顶帽子出现在游戏中（如下图所示）。
    
6.  进行 **编译** 并在编辑器中进行游戏后，生成的 Actor 类将在插槽位置生成并成功附加。
    

可添加一个插槽到一个 sprite，并在插槽中附加任意数量的不同内容。Sprite 是否为 Flipbook 的一部分，是否已设置动画，以及插槽中的内容均完全取决于您的选择。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)