# Media Framework Quick Start for Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/media-framework-quick-start-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:24:40.128Z

---

目录

![Media Framework快速入门指南](https://dev.epicgames.com/community/api/documentation/image/e8026a98-378f-41e7-8a39-72e40956344d?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5849a3b-283c-4b1a-8926-a27511c4a180/00-final-result.png)

*本指南结束时，您的关卡中会有一个电视在播放内容，您可以站在附近通过按键来打开或关闭电视。*

### 目的

在Media Framework快速入门指南中，我们将介绍如何设置可以在关卡中播放视频的电视（TV）。我们还使用蓝图设置TV，这样TV上的内容可以通过按按钮来打开。我们还通过 **细节（Details）** 面板公开Media Framework变量，以便快速更改TV上显示的内容。如果您是刚开始接触Media Framework工具，或者想要知道如何在关卡内的静态网格体上播放视频，本指南正适合您阅读。

本指南包含一些使用[材质](/documentation/zh-cn/unreal-engine/unreal-engine-materials)和[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)的设置以实现在TV上播放视频的效果。建议事先学习一些本主题的预备知识，但不是强制性要求。

### 目标

完成本教程后，开发者将掌握以下几点：

-   如何导入媒体和使用不同的媒体源。
-   如何创建包含用来播放媒体文件的媒体纹理的材质。
-   如何使用蓝图开始和停止播放媒体。
-   如何创建TV蓝图并在其中指定想要使用的媒体源。

## 1 - 项目和材质设置

1.  使用游戏分类中的 **ThirdPerson** 蓝图模板创建新项目，并为其指定任意名称。
    
2.  将该[样本内容](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/1f974732-44cd-4878-9ab8-00eb1b8d9e3c/sample_content.zip)提取到机器，然后将所有内容导入到引擎。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b43fa375-c1ae-43de-ab56-b0b7f0669af9/01-sample-content_ue5.png)
    
    您可以选择创建一个新文件夹来保存所有样本内容。**材质** 将根据纹理资源自动创建。
    
3.  在 **M\_TV\_Inst** 材质中，删除 **矢量参数** 节点，添加一个 **纹理样本**，并将 **样本类型（Sample Type）** 设置为 **外部（External）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30d39672-dc3a-434a-ae75-9f8ed0be20cf/02-texture-sample-external_ue5.png)
4.  添加 **纹理对象参数**，并将其命名为 **TV\_Texture**，然后通过 **Tex** 引脚连接到 **纹理样本**。
    
5.  对于 **TV\_Texture** 参数文本对象，将 **纹理** 更改为新的 **媒体纹理** 并将其命名为 **MediaPlayer\_01\_Video**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cd7da51-595e-479a-a874-56221f6ef38b/03-new-media-texture_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cd7da51-595e-479a-a874-56221f6ef38b/03-new-media-texture_ue5.png)
    
    点击查看大图。
    
6.  单击放大镜图标以浏览并打开 **MediaPlayer\_01\_Video** 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/942783f5-f77c-451e-942b-be16178c8c0e/04-media-player-01-video_ue5.png)
    
    如果你要在 **Electra媒体播放器** 中使用纹理取样或纹理对象，请将 **取样器类型（Sampler Type）** 设置为 **颜色（Color）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3646b9e5-7bd1-417a-bb38-9476bf138877/05-samler-type-color_ue5.png)
    
7.  单击 **媒体播放器（Media Player）** 下拉菜单，并创建 **媒体播放器** 资源，将其命名为 **MyMediaPlayer**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d77ed901-f695-436f-a1fb-5b4ba40fdb5c/06-new-media-player_ue5.png)
    
    当 **创建媒体播放器（Create Media Player）** 弹出菜单出现时，只需单击 **确定（Ok）** 即可，因为我们已经在上述步骤 5 中创建过了，因此不需要再创建一个 **媒体纹理**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5fc94d2-70d6-48c0-9f4b-fda625a8eea6/07-media-texture-asset_ue5.png)
8.  打开 **MyMediaPlayer** 资源，然后双击 **Gideon\_1080p\_H264** 文件，视频将会开始播放。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/797f0220-a69a-4234-94ac-32f8f1afc3aa/08-media-player_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/797f0220-a69a-4234-94ac-32f8f1afc3aa/08-media-player_ue5.png)
    
    点击查看大图。
    
9.  在 **M\_TV\_Inst** 材质中，添加 **TexCoord**，并将 **VTiling** 设置为 **2.0**，然后连接到 **纹理样本** 的 **UV** 引脚。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c32f700-f57a-43f2-ad3e-e0b65f425848/09-tex-coord-vtilling_ue5.png)
10.  再添加一个 **TextureSample**，并将 **纹理（Texture）** 设置为 **T\_TV\_M2** 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0041559c-4a53-438b-929e-2bbef3fc0eb4/10-texture-sample-t-tv_ue5.png)
11.  添加一个 **LinearInterpolate** 节点，将上一步中的 **纹理** 通过 **绿色** 通道连接到 **Alpha**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a0185e1-04b7-4d52-9bb9-9dc8644f5f67/11-texture-sample-lerp_ue5.png)
12.  如下所示连接剩余引脚。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15fe75f8-fe63-456c-958a-9b3973a97814/12-blueprint-lerp_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15fe75f8-fe63-456c-958a-9b3973a97814/12-blueprint-lerp_ue5.png)
    
    点击查看大图。
    

### 分段结果

我们已经设置了材质，它将使用 **媒体播放器** 和关联的 **媒体纹理** 资源播放我们的媒体。如果我们在 **内容浏览器** 中打开TV网格体，可能会注意到屏幕显示为黑色（某些情况下为白色）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b1aac03-6db2-4cec-895e-44ba9bedac62/13-tv-settings_ue5.png)

要预览，可以打开媒体播放器资源，双击媒体源，此时媒体将在视口中的静态网格体TV上播放。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec060126-0c83-407c-97f9-648c3e951fd6/14-two-screens-tv_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec060126-0c83-407c-97f9-648c3e951fd6/14-two-screens-tv_ue5.png)

点击查看大图。

## 2 - TV蓝图 - 组件设置

在该步骤中，我们创建使用TV静态网格体的蓝图，以及让TV能够在关卡中运行所需的其余组件。

1.  在 **内容浏览器** 中，单击 **新增（Add New）** 按钮并选择 **蓝图类（Blueprint Class）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f00d1c29-398f-4620-82f4-8b810fcaba61/15-add-blueprint-class_ue5.png)
2.  在 **选取父类（Pick Parent Class）** 菜单中，选择 **Actor** 并将蓝图命名为 **TV\_BP**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07091d85-7214-47dd-83fe-3fb76ffc9ac4/16-actor-class_ue5.png)
3.  在 **TV\_BP** 资源中，单击 **添加组件（Add Component）** 按钮并选择 **静态网格体（Static Mesh）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70f82668-9cfb-499c-9027-485447c8e5b6/17-add-static-mesh_ue5.png)
4.  在 **静态网格体（Static Mesh）** 的 **细节（Details）** 面板中，将 **SM\_TV** 指定为要使用的 **静态网格体**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cbba2908-8d20-4ce8-a6ea-adc11afe42ff/18-static-mesh-tv_ue5.png)
5.  添加 **箱体碰撞** 组件，然后调节大小并将箱体移到TV前面，如下所示。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9323777d-eb17-4347-a8b4-d646adedd80f/19-box-collision_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9323777d-eb17-4347-a8b4-d646adedd80f/19-box-collision_ue5.png)
    
    点击查看大图。
    
    我们将使用箱体碰撞来指示当玩家位于TV前面时玩家可以打开TV（我们不希望站在TV后面时能够打开TV）。
    
6.  添加 **MediaSound** 组件并在 **细节（Details）** 面板中为 **媒体播放器（Media Player）** 属性分配 **MyMediaPlayer** 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/238cbb7f-ab5f-43c2-a2a4-d57f8d23a2c4/20-media-sound_ue5.png)
    
    这将用于在 **媒体播放器** 中播放与定义的 **媒体源** 关联的音频。
    
7.  在 **箱体碰撞** 的 **细节（Details）** 面板中，添加 **组件开始重叠时（On Component Begin Overlap）** 和 **组件结束重叠时（On Component End Overlap）** 事件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69bdd25a-12b2-42f1-a7a4-91e42d84bcc1/21-add-component-overlap_ue5.png)

### 分段结果

我们的TV蓝图设置妥当，接下来添加脚本功能，以便能够在站在TV旁边时通过按键来打开TV。

## 3 - TV蓝图 - 脚本设置

在最后一步中，我们添加脚本功能，让玩家能够按按钮来打开或关闭TV。

1.  在TV蓝图的 **事件图表** 中，使用 **获取玩家控制器（Get Player Controller）**、**启用输入（Enable Input）** 和 **禁用（Disable）** 输入，连接方式如下所示。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8315124-a25f-4824-b477-35b5445c8073/22-player-blueprint_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8315124-a25f-4824-b477-35b5445c8073/22-player-blueprint_ue5.png)
    
    点击查看大图。
    
2.  右键单击图表，添加 **P** 键盘事件（或者所需的按键），将 **按下（Pressed）** 连接到 **触发器（FlipFlop）** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81f03680-57d9-498a-ae1d-7f0a05857ee8/23-p-keyboard_ue5.png)
3.  右键单击图表并禁用 **情境关联（Context Sensitive）**，然后添加 **打开源（Open Source）** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f89f67c-b0e6-49ad-b680-babccb04ae9a/24-open-source_ue5.png)
4.  在 **打开源（Open Source）** 节点上，右键单击 **目标（Target）** 引脚，选择 **提升为变量（Promote to Variable）** 并将其命名为 **MediaPlayerforVideo**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e4bcdd2-ff9b-4245-a62d-461dfb3f7c54/25-promote-to-variable_ue5.png)
    
    在默认情况下，媒体播放器设置为 **打开即播放（Play on Open）**，这样会在打开时播放媒体。
    
    对于禁用了 **打开即播放（Play on Open）** 的媒体播放器，可以使用 **播放（Play）** 节点，后跟 **打开源（Open Source）** 调用。
    
5.  将 **媒体源（Media Source）** 提升为变量，将其命名为 **SourceToOpen**。
    
6.  在 **变量（Variables）** 列表中，单击两个变量上的眼睛图标，将它们设为 **实例可编辑（Instance Editable）** 并按如下所示进行连接。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62014a36-7491-4ef3-bfc5-d56e696496cb/26-open-icons_ue5.png)
7.  添加 **结束（Close）** 节点，将其连接到 **触发器（FlipFlop）** 的 **B** 引脚，并将 **目标（Target）** 设为 **MediaPlayerforVideo**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48d6d54f-e30f-4527-bf13-f194905be65f/27-close-target_ue5.png)
8.  将 **TV\_BP** 拖到关卡，然后在 **细节（Details）** 面板中，分配 **MyMediaPlayer** 和 **Gideon\_1080p\_H264** 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6668992e-6e69-46e6-873f-e05dc96188c7/28-tv-bp-details_ue5.png)
    
    我们将使用箱体碰撞来指示当玩家位于TV前面时玩家可以打开TV（我们不希望站在TV后面时能够打开TV）。
    
9.  在 **MyMediaPlayer** 资源中，启用 **循环（Loop）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bda0065d-ab64-4f45-b8ed-248e6a2d465a/29-loop-enable_ue5.png)
    
    这样视频开始播放后将自动循环视频，除非收到关闭指令。
    
10.  单击 **播放（Play）** 按钮以在关卡中播放。
    

### 最终结果

在关卡中播放并接近TV时，按P按钮开始播放指定的媒体。再次按P将停止播放。

## 4 - 看你的了！

下面是一些额外操作，您可以使用Media Framework工具在您的项目中尝试操作：

*让玩家[控制TV的播放](/documentation/zh-cn/unreal-engine/control-video-playback-with-blueprints-in-unreal-engine)。* 使用[媒体播放列表](/documentation/zh-cn/unreal-engine/using-media-playlists-in-unreal-engine)作为媒体源，并允许玩家"更改TV频道"。 \*向拥有自己的媒体播放器、媒体声音和媒体源资源的关卡添加第二个TV蓝图。

-   [media framework](https://dev.epicgames.com/community/search?query=media%20framework)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目的](/documentation/zh-cn/unreal-engine/media-framework-quick-start-for-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [目标](/documentation/zh-cn/unreal-engine/media-framework-quick-start-for-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [1 - 项目和材质设置](/documentation/zh-cn/unreal-engine/media-framework-quick-start-for-unreal-engine#1-%E9%A1%B9%E7%9B%AE%E5%92%8C%E6%9D%90%E8%B4%A8%E8%AE%BE%E7%BD%AE)
-   [分段结果](/documentation/zh-cn/unreal-engine/media-framework-quick-start-for-unreal-engine#%E5%88%86%E6%AE%B5%E7%BB%93%E6%9E%9C)
-   [2 - TV蓝图 - 组件设置](/documentation/zh-cn/unreal-engine/media-framework-quick-start-for-unreal-engine#2-tv%E8%93%9D%E5%9B%BE-%E7%BB%84%E4%BB%B6%E8%AE%BE%E7%BD%AE)
-   [分段结果](/documentation/zh-cn/unreal-engine/media-framework-quick-start-for-unreal-engine#%E5%88%86%E6%AE%B5%E7%BB%93%E6%9E%9C-2)
-   [3 - TV蓝图 - 脚本设置](/documentation/zh-cn/unreal-engine/media-framework-quick-start-for-unreal-engine#3-tv%E8%93%9D%E5%9B%BE-%E8%84%9A%E6%9C%AC%E8%AE%BE%E7%BD%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/media-framework-quick-start-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [4 - 看你的了！](/documentation/zh-cn/unreal-engine/media-framework-quick-start-for-unreal-engine#4-%E7%9C%8B%E4%BD%A0%E7%9A%84%E4%BA%86%EF%BC%81)

相关文档

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)

[

材质

![材质](https://dev.epicgames.com/community/api/documentation/image/cdeef2f5-00ad-4403-bbd3-ee8f0b14330e?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-materials)