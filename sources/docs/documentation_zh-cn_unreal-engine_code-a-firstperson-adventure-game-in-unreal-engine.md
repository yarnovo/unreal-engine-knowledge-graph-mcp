# Code a First-Person Adventure Game in Unreal Engine | Unreal Engine 5.6 Documentation | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/code-a-firstperson-adventure-game-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:49:50.654Z

---

目录

在虚幻引擎中使用C++可以让你完全控制和访问引擎功能，让你可以在项目中创建新功能。 这种做法适用于创建复杂系统，优化性能，将游戏提升到新的高度！

凭借虚幻引擎中的代码，你可以使用**蓝图**或C++类创建新功能。 蓝图是引擎的可视化编码工具。 它对初学者非常友好，易于探索，并且可以快速编辑。 你将使用虚幻引擎的蓝图编辑器编辑蓝图，并最终在内容浏览器中得到蓝图类型的资产。

不过，随着蓝图的复杂性增加，蓝图的读取和管理也会变得越来越困难。 在大型项目中，C++更简洁、更易于读取、执行速度更快，并且可以让你访问虚幻引擎的所有功能，从而让你能够完全掌控Gameplay机制。

C++和蓝图也可以配合使用！ 你可以将C++类扩展为蓝图，从而让设计者能够轻松调整变量，或以更直观的方式对其加以使用。 蓝图会充当C++类的子类，继承该类的所有功能。

在本教程中，你将使用C++和虚幻编辑器建立一个新的虚幻引擎代码项目，同时编译一个自定义玩家角色。

## 开始之前

-   Read the other getting-started pages in [Unreal Engine for New Users](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-for-new-users).
    
-   [为虚幻引擎设置Visual Studio](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-visual-studio-development-environment-for-cplusplus-projects-in-unreal-engine?application_version=5.5)
    

## 开始实践！

[

![设置并编译项目](https://dev.epicgames.com/community/api/documentation/image/c49ad177-84e9-4919-9d19-d7f456dfaa8c?resizing_type=fit&width=640&height=640)

设置并编译项目

学习如何使用模板设置并编译新的C++游戏项目。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine)[

![创建具有输入操作的玩家角色](https://dev.epicgames.com/community/api/documentation/image/9f7a4571-b47e-4a01-83e5-55831ef59ac0?resizing_type=fit&width=640&height=640)

创建具有输入操作的玩家角色

学习如何开始编译具有输入操作的C++角色。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus)[

![配置角色移动](https://dev.epicgames.com/community/api/documentation/image/b4425fbc-5b34-45b1-ab14-3e51ab875a51?resizing_type=fit&width=640&height=640)

配置角色移动

学习如何使用C++绑定玩家输入与角色移动。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/configure-character-movement-with-cplusplus-in-unreal-engine)[

![添加第一人称摄像机、网格体和动画](https://dev.epicgames.com/community/api/documentation/image/1596d350-a3e9-4ec1-a537-f41a07ac32e8?resizing_type=fit&width=640&height=640)

添加第一人称摄像机、网格体和动画

学习如何使用C++为第一人称角色附加网格体和摄像机组件。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation)[

![管理物品和数据](https://dev.epicgames.com/community/api/documentation/image/cf498487-79cd-4030-8128-27224b04addd?resizing_type=fit&width=640&height=640)

管理物品和数据

学习使用物品数据结构体、数据资产和数据表来定义物品，并存储和组织物品数据以实现可伸缩性。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/manage-item-and-data-in-an-unreal-engine-game)[

![创建可重新生成的拾取物](https://dev.epicgames.com/community/api/documentation/image/47c97195-b038-4e05-8f7f-2481587c40dc?resizing_type=fit&width=640&height=640)

创建可重新生成的拾取物

了解如何使用C++创建自定义拾取物并将其在关卡中初始化。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine)[

![Equip Your Character](https://dev.epicgames.com/community/api/documentation/image/d7ce94e9-285d-4876-b873-3c7728f842fa?resizing_type=fit&width=640&height=640)

Equip Your Character

Learn to use C++ to create custom equippable items and attach them to your character.





](https://dev.epicgames.com/documentation/en-us/unreal-engine/equip-your-character-with-cplusplus-tools)[

![Implement a Projectile](https://dev.epicgames.com/community/api/documentation/image/25ecf04a-ccd5-4507-80d4-446d937d850c?resizing_type=fit&width=640&height=640)

Implement a Projectile

Learn to use C++ to implement projectiles and spawn them during gameplay.





](https://dev.epicgames.com/documentation/en-us/unreal-engine/implement-a-projectile-in-unreal-engine)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [开始之前](/documentation/zh-cn/unreal-engine/code-a-firstperson-adventure-game-in-unreal-engine#%E5%BC%80%E5%A7%8B%E4%B9%8B%E5%89%8D)
-   [开始实践！](/documentation/zh-cn/unreal-engine/code-a-firstperson-adventure-game-in-unreal-engine#%E5%BC%80%E5%A7%8B%E5%AE%9E%E8%B7%B5%EF%BC%81)