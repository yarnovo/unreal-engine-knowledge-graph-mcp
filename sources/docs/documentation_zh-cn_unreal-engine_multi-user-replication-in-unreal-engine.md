# 虚幻引擎中的多用户复制 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/multi-user-replication-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:34:25.016Z

---

目录

![多用户复制](https://dev.epicgames.com/community/api/documentation/image/7a5dfa41-b491-40b9-ba41-754feab89acd?resizing_type=fill&width=1920&height=335)

## 概述

多用户复制（Multi-User Replication）功能通过[多用户编辑](/documentation/zh-cn/unreal-engine/multi-user-editing-in-unreal-engine)实现在客户端之间进行Actor属性的实时复制。本用户指南将介绍如何使用多用户复制功能。

此功能用于在编辑器之间复制对象。此系统不适合用于进行Gameplay的复制。

## 先决条件

要使用多用户复制，你必须将虚幻引擎项目配置为使用"多用户编辑（Multi-User Editing）"，运行多用户服务器，并加入一个会话。如需详细了解相关设置过程，请参阅[多用户编辑入门](/documentation/zh-cn/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine)。

## 打开复制选项卡

加入多用户会话后，点击 **复制（Replication）** 选项卡。

![复制选项卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/663379d5-5c38-4ddd-ba28-43b749aa26ca/replication-tab.png)

## 复制属性

多用户复制不会复制整个Actor。由于带宽限制，也不建议尝试复制Actor的所有属性。替代做法是选择单个属性进行复制。

要使用多用户复制功能实时复制某个属性，请执行以下步骤：

1.  转到 **复制（Replication）** 选项卡并点击 **添加（Add）** ，选择要复制的Actor。
    
    ![添加Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09c5a46c-df7d-4e73-b0b5-77a51fa4ac32/add-actor.png)
2.  点击底部面板的 **编辑（Edit）** 按钮，从属性所在的组件选择属性。
    
    ![选择属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88e0aa11-c98a-4467-8f84-7f6759e79d4e/edit-property.png)
    
    被添加的属性应该会被自动分配给添加该属性的客户端。这时，该客户端对该属性的求值将被复制给会话中的其他客户端。
    
3.  要停止对Actor的复制，请点击Actor名称旁的 **暂停（Pause）** 按钮。要继续复制，请点击 **运行（Play）** 按钮。
    
    ![暂停按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6de3302a-76e8-48f6-bd71-e5f72275819a/pause-replication.png)

## 设置复制速率

默认情况下，被添加到复制中的Actor会尝试以每秒30帧的速率进行复制。要更改此速率，请右键点击Actor并将鼠标悬停在要更改速率的组件上。

![速率的设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fdeb07bd-c9ec-45c5-8812-5b2b29c558e1/set-rate.png)

可将速率设为下列选项之一：

-   **实时（Realtime）** ：组件的复制速率与引擎的求值速率一致。
-   **指定速率（Specified Rate）** ：组件将尝试以复制速率（Replication Rate）所指定的速率进行复制。

如果编辑器的求值速率低于指定的复制速率，则复制速率将以较低的速率为上限。

## 更改属性作者

要更改作为某个Actor所有属性的复制作者的客户端，请右键点击顶部面板中的Actor，然后在 **全部重分配给（Reassign All To）** 类别中点击一名新作者。

![点击新作者](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87d0f836-0a82-4dfc-b900-d8ea1d1a9686/change-all-properties.png)

要更改作为单个属性的复制作者的客户端，请在底部面板中找到该属性，然后点击 **作者（Author）** 下拉菜单，并选择一名新作者。

![点击作者下拉菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63d7e672-3333-4fe6-a71d-f79a9e0d71c6/change-one-property.png)

如果多个客户端被指定为不同属性的作者，那么这些客户端都可以复制同一个Actor。

## 使用多用户复制预设

在复杂的复制环境中，将Actor和属性的分配保存起来以供日后调用，这种做法也许会很有价值。复制预设（Replication Preset）可以实现这种操作。

预设会将Actor的标签映射到客户端名称。如果多个客户端共享相同的名称，则预设将无法生效。为避免这种情况，请转到项目设置的 **多用户编辑（Multi-User Editing）** 分段，设置客户端的 **显示名称（Display Name）** 。

### 创建复制预设

要创建复制预设，请执行以下步骤：

1.  转到 **复制（Replication）** 选项卡，点击 **预设（Presets）** > **将预设另存为（Save Preset as...）** 。
    
    ![保存预设](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82b734c5-5a5f-4402-a632-35fe685027df/preset.png)
2.  保存预设。
    

如果你计划将来在不同会话中使用预设资产，请不要忘记将其持久化。

### 加载复制预设

要加载预设，请执行以下步骤：

1.  转到 **复制（Replication）** 选项卡，点击 **预设（Presets）** ，然后点击需要加载的预设。
    
    ![加载预设](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0655af1e-e134-4d21-a3ef-8a0e0dfae44e/load-preset.png)

## 进阶内容：默认属性

添加给定类的组件以供复制时，你可以配置默认添加的属性。

要配置默认属性，请执行以下步骤：

1.  打开虚幻引擎的主菜单，转至 **编辑（Edit）**\> **项目设置（Project Settings）** 。
    
2.  转到多用户复制（Multi User Replication）分段，展开 **复制编辑器设置（Replication Editor Settings）** 。
    
3.  转到 **默认属性选择（Default Property Selection）** ，将类（通常是组件的类）映射到需要自动添加的属性。
    
    ![默认属性选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d744dba2-f563-4b3a-b051-fec5f9ab4622/map-classes.png)
4.  转到 **已添加的默认子对象规则（Default Added Subobject Rules）** ，指定 **默认属性选择（Default Property Selection）** 中定义的规则适用于哪些类型的Actor。这样就可以将 **默认属性选择（Default Property Selection）** 中指定的组件默认项应用于所需的Actor类。
    
    -   作为键，指定要应用规则的Actor类；默认情况下，应该有一条规则应用于所有Actor类。
    -   作为值，指定子对象（通常是组件）的类型，以应用 **默认属性选择（Default Property Selection）** 中的规则。
    
    ![已添加的默认子对象规则](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abb39c16-66d9-4861-8a7a-ba3f8f7b0c59/subobject-rules.png)

-   [post processing](https://dev.epicgames.com/community/search?query=post%20processing)
-   [multi-user editing](https://dev.epicgames.com/community/search?query=multi-user%20editing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/multi-user-replication-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [先决条件](/documentation/zh-cn/unreal-engine/multi-user-replication-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [打开复制选项卡](/documentation/zh-cn/unreal-engine/multi-user-replication-in-unreal-engine#%E6%89%93%E5%BC%80%E5%A4%8D%E5%88%B6%E9%80%89%E9%A1%B9%E5%8D%A1)
-   [复制属性](/documentation/zh-cn/unreal-engine/multi-user-replication-in-unreal-engine#%E5%A4%8D%E5%88%B6%E5%B1%9E%E6%80%A7)
-   [设置复制速率](/documentation/zh-cn/unreal-engine/multi-user-replication-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%A4%8D%E5%88%B6%E9%80%9F%E7%8E%87)
-   [更改属性作者](/documentation/zh-cn/unreal-engine/multi-user-replication-in-unreal-engine#%E6%9B%B4%E6%94%B9%E5%B1%9E%E6%80%A7%E4%BD%9C%E8%80%85)
-   [使用多用户复制预设](/documentation/zh-cn/unreal-engine/multi-user-replication-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%A4%9A%E7%94%A8%E6%88%B7%E5%A4%8D%E5%88%B6%E9%A2%84%E8%AE%BE)
-   [创建复制预设](/documentation/zh-cn/unreal-engine/multi-user-replication-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%A4%8D%E5%88%B6%E9%A2%84%E8%AE%BE)
-   [加载复制预设](/documentation/zh-cn/unreal-engine/multi-user-replication-in-unreal-engine#%E5%8A%A0%E8%BD%BD%E5%A4%8D%E5%88%B6%E9%A2%84%E8%AE%BE)
-   [进阶内容：默认属性](/documentation/zh-cn/unreal-engine/multi-user-replication-in-unreal-engine#%E8%BF%9B%E9%98%B6%E5%86%85%E5%AE%B9%EF%BC%9A%E9%BB%98%E8%AE%A4%E5%B1%9E%E6%80%A7)