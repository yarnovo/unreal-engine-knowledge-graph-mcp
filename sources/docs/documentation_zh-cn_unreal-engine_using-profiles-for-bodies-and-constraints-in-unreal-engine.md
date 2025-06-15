# 为形体和约束使用配置文件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-profiles-for-bodies-and-constraints-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:51:40.664Z

---

目录

![为形体和约束使用配置文件](https://dev.epicgames.com/community/api/documentation/image/f0cce6e6-55d9-4754-a208-d3300c3a0e26?resizing_type=fill&width=1920&height=335)

你可以使用[物理资源编辑器](/documentation/zh-cn/unreal-engine/physics-asset-editor-interface-in-unreal-engine)创建自己的[配置文件](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine---tools-and-profiles)，通过该配置文件将物理动画设置指定给[形体](/documentation/zh-cn/unreal-engine/physics-bodies-in-unreal-engine)，将约束设置指定给[约束](/documentation/zh-cn/unreal-engine/physics-constraint-reference-in-unreal-engine)。

![Profiles properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0860a766-0b93-42a8-8d6a-0f78ae70e84d/profiles.png)

阅读以下部分，了解如何创建、指定、取消指定、删除配置文件：

## 创建和指定配置文件

要创建和指定配置文件，请按照下列步骤操作：

1.  在 **骨架树（Skeleton Tree）** 中，选择 **物理形体（Physics body）** 或 **物理约束（Physics constraint）**。
    
    ![选择一个物理形体或约束](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a0f8e02-39ed-413a-a3e3-c09cf978af0c/create-assign-01.png)
2.  在 **配置文件（Profiles）** 选项卡中，单击要创建的配置文件类型旁的 **新建（New）** 按键；配置文件类型有 **物理动画（Physical Animation）** 和 **约束（Constraint）**。然后在 **当前配置文件（Current Profile）** 下的文本框中，为配置文件命名，以便稍后引用。
    
    ![新建一个配置文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74fc4701-a917-4175-8231-dda9acee6be2/create-assign-02.png)
    
    创建配置文件时，它们的初值设定为"empty"，表示使用默认设置。
    
3.  使用 **图表（Graph）** 或 **骨架树（Skeleton Tree）** 选择要指定给配置文件的形体或约束。
    
    ![在图表中被选中的形体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac60315b-f3b4-4c60-8e6e-f1b61eebfe5f/create-assign-03.png)
    
    所选形体的图表。
    
    然后在 **配置文件（Profiles）** 选项卡中，将 **当前配置文件（Current Profile）** 设置为要使用的配置文件，并单击 **指定（Assign）**。所选节点将从阴影变为填充色。
    
    ![配置面板中的指定按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea2d2710-ff82-4824-9798-7790deb2b8ac/create-assign-03a.png)
    
    颜色变化表示它们已经指定给该配置文件，而其他显示为（阴影）的形体节点则没有。
    
    ![Profile相关节点的颜色变化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1f341a7-f946-445c-ab40-74e6820f3e15/create-assign-03b.png)
4.  在所选形体的 **细节（Details）** 面板中，将显示当前指定的配置文件，你可以调整要创建的配置文件类型的属性。
    
    ![细节面板中的配置文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39104950-0ced-48bb-968c-6914379147ce/create-assign-04.png)
    
    物理动画配置文件已经指定给该所选形体。
    
    如果是物理动画配置文件，合适的值可以是 1000, 100, 1000, 100, 0, 0
    
    ![Recommended default Physical Animation values](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a462e5c1-db8d-405c-a766-1c553c428dc2/physical-animation-start-values.png)
    

## 取消指定配置文件

要对形体或约束 **取消指定（Unassign）** 配置文件，请按照下列步骤操作：

1.  从要编辑的 **骨架树** 中选择 **物理形体（Physics Body）** 或 **物理约束（Physics Constraint）**。
    
    ![选择一个物理实体或约束](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b002a69-b2c0-4d52-b251-5dd21796ff20/create-assign-01.png)
2.  在 **配置文件（Profiles）** 选项卡中，将 **当前配置文件（Current Profile）** 设置为要编辑的配置文件。如果需要，使用 **下拉菜单** 选择指定的配置文件。
    
    ![选择配置文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34cd364b-63f7-4976-aeb7-31c75bb86204/unassign-02.png)
    
    在 **图表（Graph）** 中，指定给所选配置文件的节点将显示为填充色，而不再是阴影。
    
    ![节点与配置文件相关联](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a91b775c-3ee1-40a4-8286-ab870c0c3dd4/create-assign-03b.png)
3.  选择了要取消与配置文件关联的节点后，然后单击 **配置文件（Profiles）** 选项卡中的 **取消指定（Unassign）** 按钮。
    
    ![配置面板中的取消指定按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2e3fc59-0179-480a-9d1f-dc733062d1fb/unassign-03.png)
    
    执行此操作后，所选节点将显示为阴影，而不是显示当前所选配置文件的填充颜色。
    
    ![灰色节点不再与配置关联](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3eb11fed-cbea-4fa1-8e26-89bab8eb6dbe/create-assign-03.png)

## 删除配置文件

要 **删除** 配置文件，请按照下列步骤操作：

1.  在 **配置文件（Profiles）** 选项卡中，使用 **下拉菜单** 将 **当前配置文件（Current Profile）** 选为要删除的配置文件。
    
    ![选择配置文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/910f14de-7cd1-498d-a633-6603fd8866d8/delete-profiles-01.png)
    
    下拉列表的底部列出了所有已创建的配置文件。
    
2.  单击 **删除（Delete）** 按钮将其从可用配置文件列表中删除。
    
    ![删除配置文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0996c376-471e-4fbb-afc7-b40bf46704b2/delete-profile-02.png)

## 其他资源

-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建和指定配置文件](/documentation/zh-cn/unreal-engine/using-profiles-for-bodies-and-constraints-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E6%8C%87%E5%AE%9A%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
-   [取消指定配置文件](/documentation/zh-cn/unreal-engine/using-profiles-for-bodies-and-constraints-in-unreal-engine#%E5%8F%96%E6%B6%88%E6%8C%87%E5%AE%9A%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
-   [删除配置文件](/documentation/zh-cn/unreal-engine/using-profiles-for-bodies-and-constraints-in-unreal-engine#%E5%88%A0%E9%99%A4%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
-   [其他资源](/documentation/zh-cn/unreal-engine/using-profiles-for-bodies-and-constraints-in-unreal-engine#%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)