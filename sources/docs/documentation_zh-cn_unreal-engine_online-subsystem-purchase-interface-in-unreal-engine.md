# Online Subsystem Purchase Interface in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/online-subsystem-purchase-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:20.173Z

---

目录

![购买接口](https://dev.epicgames.com/community/api/documentation/image/409c036b-bf7f-4efa-b585-2b2be536a11b?resizing_type=fill&width=1920&height=335)

支持游戏用户购买的是两个接口：**商店接口**，负责对用户提供商品；**购买接口** 则使用户获得商品。 用购买接口能执行以下操作：

-   检查确认用户是否能进行购买。
-   开始购买进程。
-   查看之前购买的历史记录。

如需获取或过滤使用者可购买的商品，请使用[商店接口](/documentation/zh-cn/unreal-engine/online-subsystem-store-interface-in-unreal-engine)。

## 游戏内购

购买（从购买接口的意义上而言）涉及到真实货币（而非游戏内货币）与游戏物品（内容）之间的交易。 然而，购买接口自身并不负责处理获取信用卡信息或设置家长控制之类的财务细节。 相反，这些细节由在线服务处理。 购买接口将检查用户是否能够进行购买、开始购买进行，并检查在线服务获取之前完成购买的列表。

### 能够进行购买

尝试进行购买前需要检查确认是否用户能执行此操作。 部分在线服务拥有账户限制功能（如家长控制），使用户无法进行购买。 在对用户显示商品之前可以检查此信息，以便隐藏或调整用户界面中的按钮，或在用户未获得权限便进行购买时显示错误消息。 如需检查用户能否进行购买，请使用 `IsAllowedToPurchase` 函数。 在线子系统已缓存此信息，所以此函数将直接返回一个 `布尔`，而不使用委托。

### 进行购买

准备好进行购买并选择商品后（如[商店接口](/documentation/zh-cn/unreal-engine/online-subsystem-store-interface-in-unreal-engine)中所定义），用 `FPurchaseCheckoutRequest` 调用 `Checkout` 函数。 这通常会呼出在线服务特定的用户界面，并最终调用类型为 `FOnPurchaseCheckoutComplete` 的委托。 委托将包含成功或失败信息，如购买成功，则提供购买收据（类 `FPurchaseReceipt`）。

购买收据使用 `FReceiptOfferEntry` 数据结构，包含用户已购买的商品。 在每个 `FReceiptOfferEntry` 中存在一个或多个排列项（类型为FLineItemInfo），每项均包含一条由在线服务生成的不透明字符串，并代表一次已发生的特定交易。 物品解锁后将向用户发放，或执行其在游戏中的作用。调用含此ID字符串的 `FinalizePurchase` 后，将向在线服务确认销售，并执行资金的划拨。

在调用 `FinalizePurchase` 之前务必将物品发放给用户并保存到账户中（如需要）。 在一些平台上，如果未进行此操作流程，用户在未收到物品时也会被扣除费用。

### 查看完成的购买

完成的购买可在用户的收据中查看。 调用 `QueryReceipts` 便会请求特定用户的收据。 操作完成后，用户提供的委托（类型为 `FOnQueryReceiptsComplete`）将受到成功或失败的信息。 成功后，用户账户的收据将被本地缓存，可通过 `GetReceipts` 函数以一个 `FPurchaseReceipt` 元素排列的形式进行访问。 此列表将包含所有非消耗性购买的一个列表，以及可消耗品的待完成购买。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online subsystem](https://dev.epicgames.com/community/search?query=online%20subsystem)
-   [purchase](https://dev.epicgames.com/community/search?query=purchase)
-   [purchase interface](https://dev.epicgames.com/community/search?query=purchase%20interface)
-   [in-game purchase](https://dev.epicgames.com/community/search?query=in-game%20purchase)
-   [in-app purchase](https://dev.epicgames.com/community/search?query=in-app%20purchase)
-   [real money](https://dev.epicgames.com/community/search?query=real%20money)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [游戏内购](/documentation/zh-cn/unreal-engine/online-subsystem-purchase-interface-in-unreal-engine#%E6%B8%B8%E6%88%8F%E5%86%85%E8%B4%AD)
-   [能够进行购买](/documentation/zh-cn/unreal-engine/online-subsystem-purchase-interface-in-unreal-engine#%E8%83%BD%E5%A4%9F%E8%BF%9B%E8%A1%8C%E8%B4%AD%E4%B9%B0)
-   [进行购买](/documentation/zh-cn/unreal-engine/online-subsystem-purchase-interface-in-unreal-engine#%E8%BF%9B%E8%A1%8C%E8%B4%AD%E4%B9%B0)
-   [查看完成的购买](/documentation/zh-cn/unreal-engine/online-subsystem-purchase-interface-in-unreal-engine#%E6%9F%A5%E7%9C%8B%E5%AE%8C%E6%88%90%E7%9A%84%E8%B4%AD%E4%B9%B0)