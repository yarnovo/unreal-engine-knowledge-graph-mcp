# 在虚幻引擎中创建物理动画配置文件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-a-physical-animation-profile-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:51:10.591Z

---

目录

![创建物理动画配置文件](https://dev.epicgames.com/community/api/documentation/image/6a4739f9-b920-4fa1-b89b-41254f1b0b70?resizing_type=fill&width=1920&height=335)

本教程中，我们会讲解创建 **物理动画配置文件（Physical Animation Profile）** 以及向其添加 **物理形体（Physics Bodies）** 的基础知识。

## 步骤

1.  使用 **内容侧滑菜单（Content Drawer）** 为你的 **骨骼网格体** 找到或[创建](/documentation/zh-cn/unreal-engine/creating-a-new-physics-asset-in-unreal-engine) **物理资产**。
    
    ![内容侧滑菜单中的物理资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d783e40-b0fd-450d-8ff0-f024dad7ec6e/physics_asset.png)
    
    如果选择新建 **物理资产**，则建立之后方可继续。
    
2.  双击该物理资产，以打开 **物理资产编辑器（Physics Asset Editor）**。
    
    ![物理资产编辑器主用户界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57fca027-e3fa-4020-9ac7-8b123d2ce649/physics_asset_editor.png)
3.  在 **Windows** 菜单下，选择 **配置文件（Profiles）**；**配置文件（Profiles）** 窗口应显示为停靠的选项卡。
    
    ![高亮显示配置文件的Windows菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fb64863-b41e-4842-af06-4b1ada4e7f3d/profiles_window_menu.png)
4.  使用 **物理动画配置文件（Physical Animation Profiles）** 条目上的 **新增（New）** 按钮添加 **配置文件（Profile）**，并设置名称（下图中命名为 `DocsProfile`）。
    
    ![添加并命名新的物理动画配置文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab6ca91c-5bd5-49db-852c-7f0d9f70d75c/docs_phys_anim_profile.png)
5.  在 **骨架树（Skeleton Tree）** 面板、**物理图表（Physics Graph）** 或 **视口（Viewport）** 中，选择要纳入新 **物理动画配置文件（Physical Animation Profile）** 的 **物理形体（Physics Body）**。
    
    要在骨架树（Skeleton Tree）面板中查看约束，在 **选项（Options）** 下拉菜单中选择 **显示约束（Show Constraints）**。
    
6.  按下 **配置文件（Profiles）** 面板中的 **分配（Assign）** 按钮。
    
    ![将约束分配到配置文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/841be1cc-bcca-404d-8cbd-aae600811ce4/assign_physics_bodies_to_profile_2.png)
    
    1 - 分配（Assign）按钮 2 - 在骨架树（Skeleton Tree）面板中选定的物理形体 3 - 在物理图表（Physics Graph）面板中选定的物理形体 4 - 在视口（Viewport）中选定的物理形体
    
7.  调整选定 **物理形体（Physics Bodies）** 的属性。
    
    ![细节面板中的物理动画属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bdbdf4d8-2281-424c-beb8-a3e662f07949/physical_animation_details.png)
    
    1000、100、1000、100、0、0是比较好的一组起始值
    
    ![物理动画推荐默认值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b44477ad-84d8-4fd9-8a8e-eb1acd6c5c5f/physical_animation_recommended_defaults.png)
    
8.  对要添加到 **物理动画配置文件（Physics Animation Profile）** 的所有 **物理形体（Physics Bodies）** 重复步骤5-7。
    
    可以同时选择、分配和编辑多个物理形体的属性。想要让属性不同，单独编辑即可。
    
9.  使用 **物理资产编辑器（Physics Asset Editor）** 中的 **保存（Save）** 按钮保存 **物理资产（Physics Asset）**。
    
    ![使用物理资产编辑器中的保存按钮保存物理资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57a7332b-6c49-4e31-9ca6-004088697850/save-button.png)

要编辑现有的物理动画配置文件，在下拉菜单中选中，然后使用 **分配（Assign）** 添加新的物理形体，或使用 **取消分配（Unassign）** 移除现有物理形体。

## 结果

现在 **物理资产（Physics Asset）** 有了配置文件，可以从蓝图或C++调用，以更改 **物理形体（Physics Bodies）** 的 **物理动画（Physical Animation）** 属性。

## 其他资源

-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/creating-a-physical-animation-profile-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [结果](/documentation/zh-cn/unreal-engine/creating-a-physical-animation-profile-in-unreal-engine#%E7%BB%93%E6%9E%9C)
-   [其他资源](/documentation/zh-cn/unreal-engine/creating-a-physical-animation-profile-in-unreal-engine#%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)