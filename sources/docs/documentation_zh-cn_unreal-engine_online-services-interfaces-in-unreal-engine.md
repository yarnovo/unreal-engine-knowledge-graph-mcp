# 虚幻引擎中的在线服务接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/online-services-interfaces-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:53:45.903Z

---

目录

![在线服务接口](https://dev.epicgames.com/community/api/documentation/image/6b9d24d9-ba78-41e4-8c12-55897a8d990f?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**在线服务（Online Services）** 插件及其接口提供了一种通用的方式来访问各种平台在线服务的功能。在线服务插件提供服务专用的模块化 **接口（Interface）** ，这些接口按支持的功能分组。

## 接口

[

![在线服务成就接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04c369a3-e1dc-4d93-b8ee-b722de25a2b4/placeholder_topic.png)

在线服务成就接口

读取和更新玩家成就。





](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine)[

![身份验证接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8807aa0-2f99-4cb0-9ab6-339dd104ba47/placeholder_topic.png)

身份验证接口

向在线服务验证和核实本地用户的身份。





](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine)[

![商务接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c82fc04d-c004-4828-8446-e94764cb129c/placeholder_topic.png)

商务接口

在Gameplay之外购买和兑换游戏内容。





](/documentation/zh-cn/unreal-engine/commerce-interface-in-unreal-engine)[

![连接接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cd5a99d-7b3e-463c-b26c-b6fb6e0b7334/placeholder_topic.png)

连接接口

确定你的游戏是否连接到你的平台的在线服务。





](/documentation/zh-cn/unreal-engine/connectivity-interface-in-unreal-engine)[

![在线服务外部UI接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/580bb7e6-790d-4f66-b11b-6b69fe0aa63e/placeholder_topic.png)

在线服务外部UI接口

显示你平台的在线服务外部用户接口。





](/documentation/zh-cn/unreal-engine/external-ui-interface-in-unreal-engine)[

![排行榜接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e270087c-d603-4c5e-9b3f-47e08c58bcb7/placeholder_topic.png)

排行榜接口

显示和更新游戏中的排行榜。





](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine)[

![大厅接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8e2e273-ff72-486f-aa95-c06507b3f7ac/placeholder_topic.png)

大厅接口

创建和管理在线大厅。





](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine)[

![在线服务在线状态接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99be0573-1896-4c55-8e68-f61c8bc6d669/placeholder_topic.png)

在线服务在线状态接口

访问好友和粉丝的在线状态和可加入性状态。





](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine)[

![权限接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6a47258-ef02-4f8d-9bb8-c236f5346aa4/placeholder_topic.png)

权限接口

访问玩家权限，包括在线游戏和跨平台游戏以及语音和文本聊天。





](/documentation/zh-cn/unreal-engine/privileges-interface-in-unreal-engine)[

![会话接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8308c799-dca1-45c7-a39c-fcc5c3c41762/placeholder_topic.png)

会话接口

创建和管理在线游戏会话。





](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine)[

![社交接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/407a5538-37a0-41f6-8a30-26e02911efa1/placeholder_topic.png)

社交接口

管理与好友和阻止的用户之间的关系。





](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine)[

![统计数据接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7fd812c-cebe-4224-8395-dfa36173a790/placeholder_topic.png)

统计数据接口

将统计数据上传到在线服务并完成统计数据检索。





](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine)[

![作品文件接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa571169-ad90-495d-a811-fdfb0210eb88/placeholder_topic.png)

作品文件接口

从后端在线服务读取作品文件。





](/documentation/zh-cn/unreal-engine/title-file-interface-in-unreal-engine)[

![用户文件接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc038434-e9e5-4e3b-bff7-8893c738a5fa/placeholder_topic.png)

用户文件接口

从后端在线服务读取用户文件。





](/documentation/zh-cn/unreal-engine/user-file-interface-in-unreal-engine)[

![用户信息接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a91bdd94-c2aa-4035-85b6-5206547e7705/placeholder_topic.png)

用户信息接口

访问玩家的显示名称和头像以在你的游戏中使用。





](/documentation/zh-cn/unreal-engine/user-info-interface-in-unreal-engine)

-   [beta](https://dev.epicgames.com/community/search?query=beta)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [接口](/documentation/zh-cn/unreal-engine/online-services-interfaces-in-unreal-engine#%E6%8E%A5%E5%8F%A3)