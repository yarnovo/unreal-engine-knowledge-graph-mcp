# 虚幻引擎在线子系统商店接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/online-subsystem-store-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:24.029Z

---

目录

![商店接口](https://dev.epicgames.com/community/api/documentation/image/6c64496b-927d-4b87-a64a-fddd7eb807a8?resizing_type=fill&width=1920&height=335)

要支持用户购买，游戏需要2个接口：**商店接口**，向用户提供商品；**购买接口**，让用户能够获得这些商品。 拥有商店接口后，游戏便能从在线服务获取商品，以个体为基础将其放置到类型中，并进行过滤和管理。 为执行购买，请使用[购买接口](/documentation/zh-cn/unreal-engine/online-subsystem-purchase-interface-in-unreal-engine)。

商品（类[`FOnlineStoreOffer`](https://api.unrealengine.com/INT/API/Plugins/OnlineSubsystem/Interfaces/FOnlineStoreOffer/index.html)）包含用户可在游戏中购买的内容的所有必需数据。 其中包含描述、价格、发布和失效日期等信息。 类型（类[`FOnlineStoreCategory`](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystem/Interfaces/FOnlineStoreCategory)）保存的数据更为简单，只包含一个命名和子类列表。 在线服务自身处理商品的设置与管理，而商店接口则负责处理获取和过滤。

## 商品和类型

商店接口将从在线服务的服务器获取商品和类型数据。 此操作涉及到连接远程机，因此其被分解为两个阶段：异步进行数据的获取和缓存；以及访问本地缓存数据。 请求完成时商店接口将自动更新缓存，只保存最近查询的结果。

### 获取商品和类型

获取商品信息的第一步是获取商店包含类型的列表。 `QueryCategories` 函数处理此操作，在完成时调用一个类型为 `FOnQueryOnlineStoreCategoriesComplete` 的委托。 如成功，商店接口将拥有一个包含所有可用类型ID的缓存。 此时，开发者可构建包含特定类型和排除其他类型的过滤器（类型为 `FOnlineStoreFilter`）来开始查询商品。 拥有过滤器后，`QueryOffersByFilter` 即可基于类型成员关系来获取商品ID。 商店接口获取并缓存商品ID后，开发者即可通过 `QueryOffersById` 函数来查询特定商品的信息。 `QueryOffersByFilter` 和 `QueryOffersById` 将使用类型为 `FOnQueryOnlineStoreOffersComplete` 的委托来说明成功或失败，商店接口的商品缓存将在任一操作成功完成后进行更新。

### 检查商品数据

"query"函数将把类型和商品的数据存入商店接口的缓存中。 要访问此数据，调用类型缓存的 `GetCategories` 或商品缓存的 `GetOffers`。 如拥有一个已知的商品ID，`GetOffer` 函数将返回相应（缓存）商品的信息。

这些函数均在本地缓存上执行运算，因此它们并不含回调。 但它们只在缓存被填充时才可用。 这些函数不会更新缓存，因此对在线服务商店中类型和商品进行的实时修改均不会被反映出来。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online subsystem](https://dev.epicgames.com/community/search?query=online%20subsystem)
-   [store interface](https://dev.epicgames.com/community/search?query=store%20interface)
-   [in-game purchases](https://dev.epicgames.com/community/search?query=in-game%20purchases)
-   [store](https://dev.epicgames.com/community/search?query=store)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [商品和类型](/documentation/zh-cn/unreal-engine/online-subsystem-store-interface-in-unreal-engine#%E5%95%86%E5%93%81%E5%92%8C%E7%B1%BB%E5%9E%8B)
-   [获取商品和类型](/documentation/zh-cn/unreal-engine/online-subsystem-store-interface-in-unreal-engine#%E8%8E%B7%E5%8F%96%E5%95%86%E5%93%81%E5%92%8C%E7%B1%BB%E5%9E%8B)
-   [检查商品数据](/documentation/zh-cn/unreal-engine/online-subsystem-store-interface-in-unreal-engine#%E6%A3%80%E6%9F%A5%E5%95%86%E5%93%81%E6%95%B0%E6%8D%AE)