# 在虚幻引擎中复制姿势 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/copy-a-pose-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:09:44.872Z

---

目录

![从另一个骨架网格体复制姿势](https://dev.epicgames.com/community/api/documentation/image/7f2c6285-6f90-4f23-bd34-7529ce9ef4b8?resizing_type=fill&width=1920&height=335)

处理动画角色时，有时可能希望将同一动画数据应用给完全不同的角色。通过使用 **从网格体复制姿势（Copy Pose From Mesh）** 动画蓝图节点和少量蓝图可视化脚本，可以引用骨架网格体组件并将它使用的姿势复制给其他骨架网格体的动画蓝图。

在此操作指南中，我们将使用"从网格体复制姿势"（Copy Pose From Mesh）节点来将玩家角色的动画复制给另外一个骨架网格体。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35b1a003-f769-4127-9c2a-246deb2d5866/copyposefrommesh.png)

## 步骤

1.  在 **Content/ThirdPersonBP/Blueprints** 文件夹中，复制 **ThirdPersonCharacter** 蓝图并使用默认名称。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fdbfe902-dd25-4a83-b272-56ab2b2be644/copypose_1.png)
2.  在 **Content/Mannequin/Character/Mesh** 文件夹中，右键单击 **SK\_Mannequin**，在 **创建（Create）** 下，选择 **动画蓝图（Anim Blueprint）** 并使用默认的命名规范。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be60cb18-9cdd-4680-8b24-f214ab07e5f7/copypose_2.png)
3.  打开步骤1中的 **ThirdPersonCharacter1** 蓝图，然后删除 **事件图表** 中的所有节点。
    
4.  在 **组件（Components）** 窗口中选中 **网格体（Mesh）**，然后在 **细节（Details）** 面板中，将 **动画类（Anim Class）** 设置为 **UE4\_Mannequin\_Skeleton\_AnimBlueprint**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0844fe01-2e43-4cb7-a5b4-5e234e9bf422/copypose_3-1.png)
5.  打开 **UE4\_Mannequin\_Skeleton\_AnimBlueprint**，在 **动画图表** 中，添加 **从网格体复制姿势（Copy Pose From Mesh）** 节点并将其连接到 **最终动画姿势（Final Animation Pose）**，然后将 **源网格体组件（Source Mesh Component）** 提升为 **角色引用（Character Reference）** 变量。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad0c141d-6227-4206-b6bc-f626a8155836/copypose_5.png)
    
    "角色引用（Character Reference）"变量将引用我们指定的角色的骨架网格体组件。 
    
6.  在 **ThirdPersonCharacter1** 蓝图中，创建名为 **角色引用（Character Reference）** 的变量并将 **变量类型（Variable Type）** 设置为 **第三人称角色（Third Person Character）**，然后启用 **实例可编辑（Instance Editable）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7170136b-6e43-4bc7-8930-748be0c6ecc3/copypose_6.png)
7.  将 **ThirdPersonCharacter1** 蓝图拖到关卡中，然后在其 **细节（Details）** 面板中，将关卡中的 **ThirdPersonCharacter** 指定为 **角色引用（Character Reference）** 变量。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/376928b2-89b4-4279-8763-d1babd172845/copypose_7.png)
    
    通过在此处指定该值，我们将创建到我们希望复制其骨架网格体组件的角色（在此示例中，为玩家角色）的引用。 
    
8.  打开 **UE4\_Mannequin\_Skeleton\_AnimBlueprint**，在 **事件图表** 中，使用 **尝试获取Pawn拥有者（Try Get Pawn Owner）** 节点连接 **投射到ThirdPersonCharacter1（Cast to ThirdPersonCharacter1）**，然后将 **作为第三人称角色1（As Third Person Character 1）** 引脚与 **角色引用（Character Reference）** 变量相连。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cb6136a-9ad2-4c60-81c3-7948bd4ddc7b/copypose_8.png)
9.  从 **角色引用（Character Reference）** 节点拖出引线并与添加的 **获取网格体（Get Mesh）** 节点相连，然后设置动画蓝图中的 **角色引用（Character Reference）** 变量。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/907fbd68-d958-4ec0-8a0d-d60d54cf3e4b/copypose_9.png)
    
    现在玩家角色的骨架网格体将被复制并指定给动画蓝图中的"角色引用（Character Reference）"，以驱动角色的姿势。 
    
10.  从主工具栏中，在编辑器中 **运行（Play）**。 
    

## 最终结果

在编辑器中运行时，该不可操作角色将播放和玩家角色相同的动画。 

当你四处移动时，关卡中的另一个角色将复制你的动画姿势，即使该角色并没有可驱动这些不同姿势的逻辑或状态机。尽管该示例从玩家角色进行复制，但是可以设置具有AI和状态机驱动动画的不可操作角色（NPC），然后让另一个不具有逻辑的NPC通过"从网格体复制姿势（Copy Pose From Mesh）"节点来复制姿势，从而模仿相同的行为和逻辑。 

使用"从网格体复制姿势（Copy Pose From Mesh）"节点时，可以在 **细节（Details）** 面板中启用 **使用连接的父项（Use Attached Parent）**，它可在源网格体组件无效时查找连接的父项并将它用作源。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bb36665-7174-45ca-b6f1-effbe7fce737/copyposedetails.png)

而且除骨骼变换以外，还可以 **复制曲线（Copy Curves）**，它将复制当前骨架中现有的曲线。如果曲线列表变化了，动画系统也需要重新初始化。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation blueprint](https://dev.epicgames.com/community/search?query=animation%20blueprint)
-   [copy pose](https://dev.epicgames.com/community/search?query=copy%20pose)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/copy-a-pose-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/copy-a-pose-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)