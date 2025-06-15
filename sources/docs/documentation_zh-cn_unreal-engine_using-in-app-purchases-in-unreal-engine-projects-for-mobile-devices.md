# 在虚幻引擎项目内使用移动设备的使用应用程序内购买 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-in-app-purchases-in-unreal-engine-projects-for-mobile-devices
> 
> 生成时间: 2025-06-14T19:59:34.910Z

---

目录

![使用应用程序内购买](https://dev.epicgames.com/community/api/documentation/image/e13c2ba6-3806-477b-b847-26815482f225?resizing_type=fill&width=1920&height=335)

应用程序内购买使你能够向玩家提供额外的内容和功能。这可以用来为免费游戏创收，或者为游戏提供额外付费内容。

## 配置

有关为各个平台配置应用程序内购买的详细信息，请参阅下方相应的平台特定页面：

-   [使用安卓内购](/documentation/zh-cn/unreal-engine/how-to-use-in-app-purchases-in-unreal-engine-projects-on-android)

## 读取购买信息

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7b96d22-2af0-4e1d-af15-35b02af7ce83/image_3.png)

然后您可以使用 **读取应用程序内购买信息（Read In-App Purchase Information）** 蓝图节点（或关联的C++函数调用）阅读应用程序内购买信息。像大多数其他在线子系统函数一样，它将玩家控制器作为输入以及您的产品辨识符数组。注意，下方的进行应用程序内购买（Make In-App Purchase）采用单个辨识符，而读取（Read）可以处理信息数组。此函数返回应用程序内购买（In App Purchase）结构体的数组，且该数组的各个元素均可以经过分析来获取名称、描述、价格和其他数据，以显示在您的UI中或用于您的游戏进程逻辑。

## 完成购买

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/082bb9e1-635c-4565-a634-b6b0d3b284f7/image_4.png)

若要进行应用程序内购买，请使用 **进行应用程序内购买（Make In-App Purchases）** 蓝图节点（或关联的C++函数调用）。它将玩家控制器作为输入以及产品请求（Product Request）结构体。产品请求（Product Request）就是来自iTunes Connect或Google Play Developer主机的产品辨识符（此例中为match3theme\_night），以及产品是否是消费品。

**进行应用程序内购买（Make an In-App Purchase）** 节点是潜在的，因此您希望使其依赖于购买成功与否的任何游戏进程行为都应使用那两个执行引脚。它们将仅在收到在线服务返回的响应后执行。此节点还返回购买的完成状态（例如成功（Success）、失败（Failed）、恢复（Restored））和详细的应用程序内购买信息（In App Purchase Information）结构体。

此函数有非潜在版本（将显示蓝图节点，而不显示时钟）。此处的退出执行引脚并不会等待在线服务的响应，因此您通常需要使用潜在版本。

## 恢复购买

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6722aac-d833-4a30-b887-d9a91d3f240c/image_5.png)

若要恢复购买，请使用 **恢复应用程序内购买（Restore In-App Purchases）** 蓝图节点（或关联的C++函数调用）。它仅接受玩家控制器，并返回与该玩家控制器关联的所有购买信息的数组。然后你可以处理该数组，与你的游戏进程逻辑需要的特定辨识符进行对比。

-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [in-app purchase](https://dev.epicgames.com/community/search?query=in-app%20purchase)
-   [services](https://dev.epicgames.com/community/search?query=services)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [配置](/documentation/zh-cn/unreal-engine/using-in-app-purchases-in-unreal-engine-projects-for-mobile-devices#%E9%85%8D%E7%BD%AE)
-   [读取购买信息](/documentation/zh-cn/unreal-engine/using-in-app-purchases-in-unreal-engine-projects-for-mobile-devices#%E8%AF%BB%E5%8F%96%E8%B4%AD%E4%B9%B0%E4%BF%A1%E6%81%AF)
-   [完成购买](/documentation/zh-cn/unreal-engine/using-in-app-purchases-in-unreal-engine-projects-for-mobile-devices#%E5%AE%8C%E6%88%90%E8%B4%AD%E4%B9%B0)
-   [恢复购买](/documentation/zh-cn/unreal-engine/using-in-app-purchases-in-unreal-engine-projects-for-mobile-devices#%E6%81%A2%E5%A4%8D%E8%B4%AD%E4%B9%B0)