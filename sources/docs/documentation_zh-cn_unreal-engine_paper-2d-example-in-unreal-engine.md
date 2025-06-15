# 虚幻引擎Paper 2D示例 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/paper-2d-example-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:16:47.344Z

---

目录

![顶视 2D 游戏设置](https://dev.epicgames.com/community/api/documentation/image/ed072960-635c-44ba-97fa-74d78be02618?resizing_type=fill&width=1920&height=335)

此页面讲述如何对现有的 **第三人称模板（Third Person Template）** 项目进行修改，创建一个 **顶视 2D** 游戏。

可在此教程中使用自己的 2D 角色，也可从以下链接下载一个样本角色：

-   [样本资源](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/e929e9fa-319f-4720-878a-f393a736dc9e/sampleassets.rar)

## 项目设置

我们将进行此教程的项目设置，您可导入自己的资源，也可使用样本资源。

1.  新建一个 **Third Person Blueprint** 模板项目。
    
2.  在项目中 **右键单击** **内容浏览器** 中的 **Content** 文件夹，然后创建一个 **新文件夹**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ea160ea-817f-4b62-84f0-fca56f8de04d/topdown1.png)
    
    将文件夹命名为 **TopDown** 或其他任意命名。
    
3.  找到下载的样本资源并将 **SoldierSprites.paper2dsprites** 资源拖入 **内容浏览器**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddbf986d-2271-4f85-a219-80114b1abe74/topdown2.png)
    
    此操作将自动创建一个 **SolderSprites** Sprite 表单资源以及包含 **Frames** 和 **Textures** 的文件夹。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/823f4e71-fad9-4bfe-a536-c8e4150ce149/topdown3.png)
    
    如需了解设置资源进行导入的更多内容，请查阅 [Paper 2D 导入选项](/documentation/zh-cn/unreal-engine/import-sprites-in-unreal-engine) 文档。
    
4.  在 **SoldierSprites** 资源上 **单击右键** 并选择 **create Flipbooks**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c627a4d-981a-4575-9c18-1a16bf623f2a/topdown4.png)
    
    此操作将基于 sprite 表单创建两个 Flipbook。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aee8764e-05b0-4493-bab7-1c854435093b/topdown5.png)
5.  （任选）打开 **Idle** Flipbook，在 details 面板中将 **Frames Per Second** 设为 **3.0**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ccec7d3-fcfc-44a4-a45f-6dbf3510efaa/topdown6.png)
    
    再将 **Run** Flipbook 的 **Frames Per Second** 设为 **8.0**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc878ed2-9ad0-47ca-84f0-23c2aca90b62/topdown7.png)
    
    此操作将降低两个 Flipbook 动画的播放速度。
    

项目现已设置完成，即可开始设置顶视角色。

## 角色设置

我们将新建一个 Paper 2D 角色蓝图并设置角色。

1.  在 **内容浏览器** 中 **单击右键**，选择新建一个 **Blueprint Class**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/757d4ccc-a407-4b11-899b-07e2bdd55885/topdown8.png)
2.  在 **Pick Parent Class** 窗口中点击 **All Classes** 下拉菜单，搜索并添加 **PaperCharacter**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e35cd74-122b-43b4-ae74-1dc88b41c360/topdown9.png)
    
    为新蓝图命名，如 **TopDownCharacter**。
    
3.  在 **TopDownCharacter** 蓝图中的 **Components** 窗口内点击 **Sprite** 组件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a239ec74-a900-420d-89f0-bc686709118d/topdown10.png)
4.  在 **Details** 的 **Sprite** 下点击 **Source Flipbook** 下拉菜单并选择 **Idle** Flipbook。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1bd5f74-7b0a-43d8-a4c2-c803db8a1f7f/topdown11.png)
    
    角色将被添加到胶囊体组件中的 **视口**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2fba8e4d-eb7b-4b27-83e3-d1bfd57ded8e/topdown12.png)
5.  返回 **Details** 面板，在 **Transform** 下将 XYZ 轴的 **Rotation** 设为 **\-90,0,90**，**Scale** 设为 **0.75**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/816f44e0-a84c-4db6-8573-3dd8eb1302db/topdown13.png)
    
    此操作将把 Flipbook 旋转入位并将其缩小，便于放入碰撞胶囊体。
    
6.  在 **Components** 窗口中点击 **CapsuleComponent**，然后在 **Details** 面板中调整 **Shape** 设置。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2848780b-5f11-4cf9-933c-c8c679842db1/topdown14.png)
    
    基于使用角色的不同，设置将存在差异，我们将 **Half Height** 和 **Radius** 设为 **45.0**。
    
7.  在 **Components** 窗口中点击 **TopDownCharacter(self)**，然后在 **Details** 面板中取消勾选 **Use Controller Rotation Yaw**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3b86d20-3205-4776-9eb0-19412f400d9f/topdown15.png)
    
    在此示例中，我们要让角色自动朝向他们要移动的方向，不使用控制器旋转。
    
8.  在 **Components** 窗口中点击 **CharacterMovement** 组件。
    
9.  在 **CharacterMovement** 的 **Details** 面板中将 **Max Walk Speed** 更新到 **400**，然后勾选 **Orient Rotation to Movement**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca597422-7852-4915-a84b-bc01acd05af4/topdown16.png)
    
    此操作将减慢角色移动速度，并基于运动自动旋转角色。
    
10.  在 **Components** 窗口中点击 **Add Component** 并搜索添加一个 **弹簧臂（Spring Arm）** 组件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cb190d8-213d-4ffa-ab52-1800b2050fc1/topdown17.png)
11.  再次点击 **Add Component** 并添加一个 **摄像机（Camera）** 组件，然后将摄像机拖到弹簧臂上完成附加。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9005bdc-4401-41e7-8720-b4619358501d/topdown18.png)
12.  选择 **摄像机** 组件，然后在 **Details** 面板中将 **Location** 设置归零。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03341227-ab15-4392-a9ef-45dbddd93c3d/zerocamera.png)
13.  选中 **弹簧臂**，然后在 **Details** 面板中进行以下更新。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a145d1e-8be8-4a8f-af86-3b5bcb6da590/topdown19.png)
    
    我们将弹簧臂（同时也延伸到摄像机）的 **Rotation** 设为 **180, -90, 180**，将摄像机直接放置在角色上方。然后将 **Target Arm Length** 改为 **600**，将摄像机和角色之间的距离调远。最后取消勾选 **Pitch、Yaw 和 Roll** 的 **Inherit** 选项，因为不需要继承摄像机的设置。
    
14.  点击 **编译** 和 **保存**，然后最小化蓝图（稍后再返回）。
    

角色便设置完成，然后尚未对其应用移动脚本，需要从 **Third Person Character** 蓝图中抓取。

## 完成

无需进行重复工作，因为此模板的角色自带移动的脚本功能，我们可将该功能复制到 Paper Character，使其可移动。

如需了解角色动作设置和在空白项目中设置角色动作的详细内容，请查阅 [在蓝图中设置角色动作](/documentation/zh-cn/unreal-engine/setting-up-character-movement) 文档。

1.  在 **Content Browser** 的 **ThirdPersonBP** 文件夹中打开 **Blueprints** 文件夹，然后打开 **ThirdPersonCharacter** 蓝图。
    
2.  在 **事件图表** 中 **鼠标左键** 拖动选择框，然后按下 **Ctrl+C** 组合键复制 **Movement Input** 部分。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a18ab90-a996-485f-858d-45bb6b186475/topdown20.png)
    
    此处包含其他 3D 游戏性脚本，如操纵摄像机、控制器输入和跳跃。此教程只讲述整体动作。
    
3.  返回 **Paper Character** 蓝图，在 **事件图表** 中按下 **Ctrl+V** 进行粘贴。
    
4.  在 **ThirdPersonBP** 和 **Blueprints** 文件夹中打开 **ThirdPersonGameMode** 蓝图。
    
5.  在 **Classes** 下将 **Default Pawn Class** 改为使用的 **Paper Character**（*TopDownCharacter*）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5caa6eed-f722-4bb7-ad63-26ae5895cb57/topdown21.png)
    
    此操作将把 Paper Character 设为游戏中使用的默认角色。
    
6.  删除关卡中的蓝色角色，在运行游戏时不对其进行控制。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5f4ab11-bbd9-48d7-bb5c-73a7a076f6c7/deleteme.png)
7.  点击主工具栏中的 **Play** 按钮在编辑器中进行游戏。
    
    虽然 2D 角色为待机状态，但您仍可使用 **WASD** 键四处移动默认地图。
    

此教程说明如何创建可操作的 2D 角色，完成顶视游戏的基础设置；其他教程将继续深入挖掘该范例，如 **设置动画状态机**（为角色设置各种 Flipbook 动画状态进行使用），以及 **Paper 2D 图块地图** 中 2D 地图的创建部分。需要为顶视游戏设置固定摄像机位而非跟随摄像机？**如何在蓝图中使用摄像机** 页面将为您指点迷津。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [项目设置](/documentation/zh-cn/unreal-engine/paper-2d-example-in-unreal-engine#%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [角色设置](/documentation/zh-cn/unreal-engine/paper-2d-example-in-unreal-engine#%E8%A7%92%E8%89%B2%E8%AE%BE%E7%BD%AE)
-   [完成](/documentation/zh-cn/unreal-engine/paper-2d-example-in-unreal-engine#%E5%AE%8C%E6%88%90)

相关文档

[

摄像机

![摄像机](https://dev.epicgames.com/community/api/documentation/image/d47b3bbe-ce01-473d-96c1-38d0cbad3819?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/cameras-in-unreal-engine)