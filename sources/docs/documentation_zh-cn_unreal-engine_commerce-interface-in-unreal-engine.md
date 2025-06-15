# 虚幻引擎中的商务接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/commerce-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:10.964Z

---

目录

![商务接口](https://dev.epicgames.com/community/api/documentation/image/9ceac8e6-d5f4-437c-ace9-d1dceb9ea299?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**在线服务商务接口（Online Services Commerce Interface）** 是虚幻引擎中使玩家能够在Gameplay之外购买或兑换游戏内容的游戏服务的基础。商务接口包含两个主要组件：

-   **交易（Transactions）** ：使用平台货币购买商城物品的过程。
    -   交易完成后，接口将授予玩家相应的权利。
-   **权利（Entitlements）** ：玩家有权接收或使用的内容。
    -   玩家可能因为购买了物品或兑换了游戏代码而接收或使用权利。

## API概述

下表概要说明了商务接口中包含的函数。

**函数**

**说明**

**商品**

 

[`QueryOffers`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ICommerce/QueryOffers)

获取商城中的所有可用商品的列表，并将其缓存在接口中。这包括所有可用的可下载内容（DLC）、程序包、物品，等等。

[`QueryOffersById`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ICommerce/QueryOffersById)

获取提供的ID列表中可用商品的列表，并将其缓存在接口中。

[`GetOffers`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ICommerce/GetOffers)

从接口检索 `QueryOffers` 缓存的商品。

[`GetOffersById`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ICommerce/GetOffersById)

从接口中缓存的提供的ID列表检索商品。

**商城**

 

[`ShowStoreUI`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ICommerce/ShowStoreUI)

显示原生商城UI，供用户在游戏客户端之外查看商城信息或处理交易。

**结账**

 

[`Checkout`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ICommerce/Checkout)

使用通过 `GetOffers` 或 `GetOffersById` 检索的一个或多个购买商品启动购买流程。

**事件监听**

 

[`OnPurchaseCompleted`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ICommerce/OnPurchaseCompleted)

每次本地用户完成交易时触发的事件。这可以在内部通过 `Checkout` 启动，也可以在外部通过原生商城UI启动。

**权利**

 

[`QueryTransactionEntitlements`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ICommerce/QueryTransactionEntitlements)

查看对应于成功 `Checkout` 调用的游戏内权利，以向玩家提供这些福利。

[`QueryEntitlements`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ICommerce/QueryEntitlements)

获取商城中特定用户已经获得的权利的列表，并将其缓存在接口中。

[`GetEntitlements`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ICommerce/GetEntitlements)

从接口检索 `QueryEntitlements` 缓存的商品。

[`RedeemEntitlement`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ICommerce/RedeemEntitlement)

将权利标记为"已兑换"。后续查询时，该权利将带有已兑换标记。这很适合没有外部游戏服务来管理权利的情况。

**验证**

 

[`RetreiveS2SToken`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ICommerce/RetrieveS2SToken)

返回一个令牌，可将其发送到游戏服务后端,以与平台通信并验证给定权利的所有权。

## 流程

现在我们提供一个使用在线服务商务接口的示例流程，该流程将监管用户启动游戏、进入游戏内商城进行购买并验证该购买以供使用的流程。

### 启动游戏

用户启动游戏并向其所需在线服务成功验证身份后，游戏会调用 `QueryEntitlements` 。游戏会将 `QueryEntitlements` 缓存的数据与用户的存档数据中注册的权利比较，从而查看在用户离线时授予了哪些权利，并相应将其应用于用户。同时，游戏使用OnPurchaseCompleted事件监听未来用户完成购买时的消息。

### 进入游戏内商城接口

用户将在游戏内打开商城的菜单。游戏会在调用QueryOffers时为打开商城的用户显示加载画面。查询解决后，游戏接着会调用GetOffers来获取数据的本地副本。然后，本地副本会传递到UI框架，以渲染和显示游戏商品。

### 执行交易

查看商品中的物品后，用户可决定购买特定产品，我们称之为 `PRODUCT_A` 。用户会将 `PRODUCT_A` 添加到游戏内购物车（由游戏内UI处理），并确认交易。验证用户身份后，游戏将使用 `PRODUCT_A` 的ID调用 `Checkout` 。此时用户会进入平台UI，进行最终确认和支付处理。

`Checkout` 成功解决并且 `OnPurchaseCompleted` 事件触发后，游戏会在给定交易ID上调用 `QueryTransactionEntitlements` ，获取交易中授予用户的游戏内权利ID，并将其应用于用户的存档游戏。如果 `PRODUCT_A` 不应该全局授予用户的Gameplay，游戏会接着调用 `RedeemEntitlement` ，确保 `PRODUCT_A` 的权利不会复制。

### 验证交易

成功购买和兑换 `PRODUCT_A` 后，用户可决定使用新购买的 `PRODUCT_A` 进入在线游戏。验证游戏服务器的身份时，游戏会注意到本地用户在认领新权利，并会请求验证令牌以确保产品合法。游戏会在提供用于验证的ID上调用 `RetrieveS2SToken` ，并获取JSON Web令牌（JWT），后端服务接着会使用它连接到平台服务并验证产品的所有权。此函数成功返回后，用户即可以使用新购买的物品进入在线游戏。

## 从在线子系统转换代码

在线服务商务接口负责[在线子系统](/documentation/zh-cn/unreal-engine/online-subsystem-in-unreal-engine)中的 **商城（Store）** （只读代码）和 **购买（Purchase）** （读/写代码）拥有的所有代码。下表显示了在线系统商务接口中的对象与其在旧版在线子系统中的同等对象之间的对应关系。

**在线服务**

 

**在线子系统**

 

**接口**

**对象**

**接口**

**对象**

商务

商品

[商城](/documentation/zh-cn/unreal-engine/online-subsystem-store-interface-in-unreal-engine)

商品

商务

权利

[购买](/documentation/zh-cn/unreal-engine/online-subsystem-purchase-interface-in-unreal-engine)

权利

## 更多信息

### 头文件

欢迎直接查阅 `Commerce.h` 头文件，根据需要了解更多信息。商务接口头文件 `Commerce.h` 位于以下目录中：

```cpp
	UNREAL_ENGINE_ROOT\Engine\Plugins\Online\OnlineServices\Source\OnlineServicesInterface\Public\Online

```

如需有关如何获取UE源代码的逐步指南，请参阅关于[下载虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)的文档。

### 函数参数和返回类型

请参阅[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)页面的[函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)小节，了解函数参数和返回类型的说明，包括如何传递参数和处理函数返回时的结果。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [purchase](https://dev.epicgames.com/community/search?query=purchase)
-   [store](https://dev.epicgames.com/community/search?query=store)
-   [multiplayer](https://dev.epicgames.com/community/search?query=multiplayer)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [commerce](https://dev.epicgames.com/community/search?query=commerce)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API概述](/documentation/zh-cn/unreal-engine/commerce-interface-in-unreal-engine#api%E6%A6%82%E8%BF%B0)
-   [流程](/documentation/zh-cn/unreal-engine/commerce-interface-in-unreal-engine#%E6%B5%81%E7%A8%8B)
-   [启动游戏](/documentation/zh-cn/unreal-engine/commerce-interface-in-unreal-engine#%E5%90%AF%E5%8A%A8%E6%B8%B8%E6%88%8F)
-   [进入游戏内商城接口](/documentation/zh-cn/unreal-engine/commerce-interface-in-unreal-engine#%E8%BF%9B%E5%85%A5%E6%B8%B8%E6%88%8F%E5%86%85%E5%95%86%E5%9F%8E%E6%8E%A5%E5%8F%A3)
-   [执行交易](/documentation/zh-cn/unreal-engine/commerce-interface-in-unreal-engine#%E6%89%A7%E8%A1%8C%E4%BA%A4%E6%98%93)
-   [验证交易](/documentation/zh-cn/unreal-engine/commerce-interface-in-unreal-engine#%E9%AA%8C%E8%AF%81%E4%BA%A4%E6%98%93)
-   [从在线子系统转换代码](/documentation/zh-cn/unreal-engine/commerce-interface-in-unreal-engine#%E4%BB%8E%E5%9C%A8%E7%BA%BF%E5%AD%90%E7%B3%BB%E7%BB%9F%E8%BD%AC%E6%8D%A2%E4%BB%A3%E7%A0%81)
-   [更多信息](/documentation/zh-cn/unreal-engine/commerce-interface-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [头文件](/documentation/zh-cn/unreal-engine/commerce-interface-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [函数参数和返回类型](/documentation/zh-cn/unreal-engine/commerce-interface-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%92%8C%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)

相关文档

[

购买接口

![购买接口](https://dev.epicgames.com/community/api/documentation/image/f860be26-b084-42b8-b319-3a46f3ac9535?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/online-subsystem-purchase-interface-in-unreal-engine)

[

商店接口

![商店接口](https://dev.epicgames.com/community/api/documentation/image/15ad7a61-616a-48be-a84d-93cbdbbd62fb?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/online-subsystem-store-interface-in-unreal-engine)