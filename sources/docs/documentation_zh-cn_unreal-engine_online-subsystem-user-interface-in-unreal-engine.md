# 虚幻引擎Online Subsystem用户接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/online-subsystem-user-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:20.954Z

---

目录

![在线用户接口](https://dev.epicgames.com/community/api/documentation/image/18788194-e6b1-4e69-82ab-bdeca86b5156?resizing_type=fill&width=1920&height=335)

**在线用户接口（OnlineUser Interface）** 是有关用户的所有（远程和本地）缓存信息和元数据的中心元库。该接口还提供反向查找功能，允许开发人员根据用户的显示名称或电子邮件地址搜索用户ID，并将它们映射回虚幻引擎的本地 `FUniqueId` 系统。

## 检索和检查用户元数据

要访问用户元数据，必须先请求并缓存来自在线服务的数据。使用需要其信息的用户的`FUniqueNetId`列表以及发出请求的本地用户的索引，调用`QueryUserInfo`。这是一个异步进程，当它完成时，将调用类型为`OnQueryUserInfoComplete`的委托。当成功查询使用用户信息填充了缓存后，`GetAllUserInfo`函数将返回所有收集到的数据。如果您有一个特定用户的`FUniqueNetId`，您想要该用户的数据，则您可以使用该`FUniqueNetId`调用`GetUserInfo`来获得该用户的数据。

## 映射外部用户ID

大多数在线服务支持根据用户的显示名称或电子邮件地址搜索用户。在线用户接口使用`QueryUserIdMapping`来镜像这一功能，这将获取一个显示名称或电子邮件地址，并试图通过在线服务将其映射到一个`FUniqueNetId`。由于这个过程涉及到与在线服务的联系，所以它是异步的，并将在完成时调用`FOnQueryUserMappingComplete`。与大多数信息请求不同，此函数不更新缓存。相反，当操作成功时，委托的负载将包含搜索到的已知显示名称或电子邮件地址，以及在线服务找到的`FUniqueNetId`。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online subsystem](https://dev.epicgames.com/community/search?query=online%20subsystem)
-   [online user interface](https://dev.epicgames.com/community/search?query=online%20user%20interface)
-   [userinfo](https://dev.epicgames.com/community/search?query=userinfo)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [检索和检查用户元数据](/documentation/zh-cn/unreal-engine/online-subsystem-user-interface-in-unreal-engine#%E6%A3%80%E7%B4%A2%E5%92%8C%E6%A3%80%E6%9F%A5%E7%94%A8%E6%88%B7%E5%85%83%E6%95%B0%E6%8D%AE)
-   [映射外部用户ID](/documentation/zh-cn/unreal-engine/online-subsystem-user-interface-in-unreal-engine#%E6%98%A0%E5%B0%84%E5%A4%96%E9%83%A8%E7%94%A8%E6%88%B7id)