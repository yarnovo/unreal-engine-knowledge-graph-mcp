# 在虚幻引擎中创建物理约束配置文件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-a-physics-constraint-profile-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:50:42.558Z

---

目录

![创建物理约束配置文件](https://dev.epicgames.com/community/api/documentation/image/236d1f8b-faac-4fd2-a442-a2ca96e70ef9?resizing_type=fill&width=1920&height=335)

本教程中，我们会讲解创建 **约束配置文件** 以及向其添加 **物理约束** 的基础知识。

## 步骤

1.  使用 **内容浏览器** 为你的 **骨骼网格体** 找到或[创建](/documentation/zh-cn/unreal-engine/creating-a-new-physics-asset-in-unreal-engine) **物理资产**。
    
    ![Physics Asset in the Content Drawer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37405435-0a5d-4f74-9d5c-cd4ecb1de3ce/physics-asset.png)
    
    如果选择新建 **物理资产**，则建立之后方可继续。
    
2.  双击该物理资产，以打开 **物理资产编辑器（Physics Asset Editor）**。
    
    ![The Physics Asset Editor main user interface](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/edebb1e5-a22c-476c-a84b-61336bf55cd9/physics-asset-editor.png)
3.  在 **Windows** 菜单下，选择 **配置文件（Profiles）**；**配置文件（Profiles）** 窗口应显示为停靠的选项卡。
    
    ![Windows menu with Profiles highlighted](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b66ecde0-e899-47c9-8ad2-502784919419/profiles-window-menu.png)
4.  使用 **约束配置文件（Constraints Profiles）** 部分上的 **新增（New）** 按钮添加 **配置文件（Profile）**，并设置名称（下图中命名为 `DocsConstraintProfile`）。
    
    ![Adding and naming a new Constraints Profile](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffa8f3c7-3b30-40e0-b751-1bd2a83ae649/docs-constraint-profile.png)
5.  在 **骨架树（Skeleton Tree）** 面板、**物理图表（Physics Graph）** 或 **视口（Viewport）** 中选择要包括在新的 **约束配置文件（Constraint Profile）** 中的 **物理约束（Physics Constraint）**。
    
    要在骨架树（Skeleton Tree）面板中查看约束，在 **选项（Options）** 下拉菜单中选择 **显示约束（Show Constraints）**。
    
6.  按下 **配置文件（Profiles）** 面板中的 **分配（Assign）** 按钮。
    
    ![Assigning Constraints to a Profile](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8292dea0-f720-48fa-bdd8-0a086cacdde3/assign-constraints-to-profile-2.png)
    
    1 - 分配（Assign）按钮 2 - 在骨架树（Skeleton Tree）面板中选定的约束 3 - 在物理图表（Physics Graph）面板中选定的约束 4 - 在视口（Viewport）中选定的约束
    
7.  调整选定 **物理约束（Physics Constraints）** 的属性。
    
    ![Adjusting Physical Constraint Properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c0e897e-a7aa-4089-8084-9ec0cb89cf3a/physics-constraints-profile-adjust.png)
8.  对要添加到 **约束配置文件（Constraint Profile）** 的所有 **物理约束（Physics Constraints）** 重复步骤5-7。
    
    可以同时选择、分配和编辑多个约束的属性。想要让属性不同，单独编辑即可。
    
9.  使用 **物理资产编辑器（Physics Asset Editor）** 中的 **保存（Save）** 按钮保存 **物理资产（Physics Asset）**。
    
    ![Save your Physics Asset using the Save button in the Physics Asset Editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca9b53b0-2175-4995-aee9-46a8dc452f05/save-button.png)

要编辑现有的约束配置文件，在下拉菜单中选中，然后使用 **分配（Assign）** 添加新的约束，或使用 **取消分配（Unassign）** 移除现有约束。

## 结果

现在 **物理资产（Physics Asset）** 有了配置文件，可以从蓝图或C++调用，以更改 **物理约束（Physical Constraint）** 属性。

## 其他资源

-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/creating-a-physics-constraint-profile-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [结果](/documentation/zh-cn/unreal-engine/creating-a-physics-constraint-profile-in-unreal-engine#%E7%BB%93%E6%9E%9C)
-   [其他资源](/documentation/zh-cn/unreal-engine/creating-a-physics-constraint-profile-in-unreal-engine#%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)