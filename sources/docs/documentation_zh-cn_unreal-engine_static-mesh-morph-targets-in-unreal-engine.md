# 虚幻引擎静态网格体变形目标 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/static-mesh-morph-targets-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:02:44.597Z

---

目录

![静态网格体变形目标](https://dev.epicgames.com/community/api/documentation/image/e8ab0101-140a-480b-bc23-8df92df66fb5?resizing_type=fill&width=1920&height=335)

利用 **变形目标（Morph Targets）** 可以将网格体从基础形状变为 *目标* 形状。 通常它们将作为动画系统的一部分与SkeletalMesh一同使用； 然而使用 `StaticMeshMorpher.ms` maxscript和 **StaticMeshMorphTarget** [材质函数](/documentation/zh-cn/unreal-engine/material-functions-in-unreal-engine)、 StaticMesh也能设置使用变形目标进行变形。

此方法使用多个UV通道、顶点颜色和WorldPositionOffset来执行变形。 每个变形目标的顶点偏移被保存为UV通道中的顶点颜色。 StaticMeshMorphTarget材质函数将对其进行提取， 使其在材质中可用。将其传至材质的WorldPositionOffset输入后， 网格体的顶点可变换到变形目标中顶点的位置。

## 脚本设置和安装

`StaticMeshMorpher.ms` 脚本在版本中的 `UE4/Engine/Extras/FX_tools/3DSMax2012_x64/` 路径下。

**运行** `StaticMeshMorpher.ms` **maxscript** 的方法：

1.  在3dsMax的 **MAXScript** 菜单中选择 **运行脚本（Run Script...）**。
    
2.  导航到版本中 `StaticMeshMorpher.ms` maxscript 所在的路径并将其打开。
    
3.  脚本的接口将显示，可供使用。
    

脚本也可以绑定到一个按键组合或添加到自定义菜单来使其更快速而简便地运行。

## 创建变形目标

变形目标要求将相同网格体多个实例的顶点执行变换。 举例而言：融化的冰球可能有三种形式：

![Game Model](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83c31bee-9493-4715-b09c-8b53dd6adef5/game_model_table.png)

![Morph target 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1357e7e5-69ec-41dc-80fc-6a79266a2520/morph_1_table.png)

![Morph target 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0ab253e-6eb6-4e14-b5f1-1723afc3c1a2/morph_2_table.png)

游戏模型

变形目标1

变形目标2

变形目标将打包到UV通道2和3中（假定两个变形目标正在被打包），如有必要， 变形目标1的法线也能保存在网格体的顶点颜色中。

**打包变形目标的步骤：**

1.  按下![Pick Game Mesh](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fa67e24-91fe-4a72-b297-76bb5eefe43d/button_pick_gamemesh.png)按钮，然后在场景中选择游戏模型网格体。
    
    ![Game Mesh Selected](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d05595e-22e8-4e0e-b8f1-7019348c6a11/game_mesh_selected.png)
2.  按下![Pick Morph Target 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/681704c7-8605-4ac6-add0-b6777a0079e8/button_pick_morph1.png)键，然后在场景中选择第一个变形目标的网格体。
    
    ![Morph Target 2 Selected](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd9fbd80-0b9e-47e3-a8ee-7e0e820cc72a/morph_1_selected.png)
3.  为场景中的第二个变形目标（如有）重复上述步骤。
    
    ![Morph Target 2 Selected](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/693b0a64-cff3-4b4c-813a-2c890b131d85/morph_2_selected.png)
4.  如有必要，勾选 **保存变形1法线（Store Morph 1 Normals）** 勾选框。
    
5.  按下![Pack Morph Targets](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0cac11f4-2f84-4bd9-bb3f-831d1650231d/button_pack_morphs.png)开始将变形目标打包到UV通道中。
    
    ![Morph Packing Progress](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f6c6ad4-f7f7-4c3f-9e1d-606b11df967e/processing_progress.png)
6.  网格体可从3dsMax导出，正常导入虚幻引擎。查看 **[FBX静态网格体管线](/documentation/zh-cn/unreal-engine/fbx-static-mesh-pipeline-in-unreal-engine)** 了解此进程的细节。
    

## 材质设置

*StaticMeshMorphTargets* 函数可访问应用到 *StaticMesh* 的 *Material* 中的变形目标和法线。 此函数拥有两个相应于两个变形目标的输出，以及法线的一个输出。 变形目标输出提供的值可插入 *Material* 节点中的 WorldPositionOffset 输入通道； 而法线输出可连接到 *Material* 节点的 *Normal* 输入通道。

为在基础网格体和变形目标之间进行 *变形*，将使用一个或多个 *LinearInterpolate* 表达式结合单个 *ScalarParameter* 来驱动Alpha输出。 这使得变形目标可在运行时由gameplay代码或 Matinee驱动。

设置范例（仅变形网络）显示于此：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/230497cc-519d-47a9-aed2-e8320e6fe2af/morph_material_setup.png)

上方网络中 *Time* 参数从0到1时的结果显示如下：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eaaa2c48-d5b7-4b39-8ab5-7e5464c4d628/morph_result.png)

-   [static mesh](https://dev.epicgames.com/community/search?query=static%20mesh)
-   [morph target](https://dev.epicgames.com/community/search?query=morph%20target)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [脚本设置和安装](/documentation/zh-cn/unreal-engine/static-mesh-morph-targets-in-unreal-engine#%E8%84%9A%E6%9C%AC%E8%AE%BE%E7%BD%AE%E5%92%8C%E5%AE%89%E8%A3%85)
-   [创建变形目标](/documentation/zh-cn/unreal-engine/static-mesh-morph-targets-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8F%98%E5%BD%A2%E7%9B%AE%E6%A0%87)
-   [材质设置](/documentation/zh-cn/unreal-engine/static-mesh-morph-targets-in-unreal-engine#%E6%9D%90%E8%B4%A8%E8%AE%BE%E7%BD%AE)