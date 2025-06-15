# 面向虚幻引擎的Horde身份验证教程 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-authentication-tutorial-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:38:08.229Z

---

目录

![Horde身份验证教程](https://dev.epicgames.com/community/api/documentation/image/567e74d7-6fc2-463a-9eae-38a93dfd581f?resizing_type=fill&width=1920&height=335)

## 简介

Horde默认禁用身份验证，以便进行演示和试验。大多数生产部署可能都要求用户登录，并根据角色限制可以执行的操作。

为此，Horde支持 **[OAuth2](https://oauth.net/2/)** 和 **[OIDC](https://openid.net/developers/how-connect-works/)** ，受大多数第三方身份提供商的支持 - 包括Okta、AWS、Azure和Google。配置外部身份提供商超出了本文档的范围，但[部署 > 服务器](/documentation/zh-cn/unreal-engine/horde-server-for-unreal-engine#%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81)页面中涉及了相关的配置要点。

如果你现在没有与OIDC兼容的身份提供商，Horde将提供自有身份提供商 - 本指南将介绍该提供商。

## 先决条件

-   Horde服务器安装（参阅[Horde安装教程](/documentation/zh-cn/unreal-engine/horde-installation-tutorial-for-unreal-engine)）。
-   具有有效证书，并且在你的服务器上启用[HTTPS支持](/documentation/zh-cn/unreal-engine/horde-server-for-unreal-engine#https)。

## 步骤

1.  在你的[server.json](/documentation/zh-cn/unreal-engine/horde-orientation-for-unreal-engine)文件中将 `AuthMode` 属性设置为 `Horde` ，然后重新启动服务器。
2.  第一次启动服务器时，系统会提示你输入管理员密码。
3.  登录后， `服务器（Server）` 菜单中会有一个 `账户（Accounts）` 菜单项。从此处，你可以管理允许登录到服务器的用户，以及他们拥有的[声明](/documentation/zh-cn/unreal-engine/horde-glossary-for-unreal-engine#%E6%8E%88%E6%9D%83)。Horde的账户系统会将 `http://epicgames.com/ue/horde/group` 声明用于用户所属组，并且操作面板将建议并自动填写在部署的配置文件中找到的组。

服务器的 `default.globals.json` 文件中定义了两个标准组，默认情况下包含于标准 `globals.json` 文件中：`查看` 和 `运行` 。

```cpp
"acl": {
    "entries": [
        {
            "claim": {
                "type": "http://epicgames.com/ue/horde/group", 
                "value": "View"
            },
            "profiles": [
                "default-read"
            ]
        },
        {
            "claim": {
                "type": "http://epicgames.com/ue/horde/group", 
                "value": "Run"
            },
            "profiles": [
                "default-run"
            ]
        }
    ]
}
```

`default-read` 和 `default-run` 配置文件在代码（ `AclConfig.cs` ）中定义。你可以在每个[AclConfig](/documentation/zh-cn/unreal-engine/horde-schema-for-unreal-engine#aclconfig)对象的 `profiles` 元素中定义自己的配置文件。

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [简介](/documentation/zh-cn/unreal-engine/horde-authentication-tutorial-for-unreal-engine#%E7%AE%80%E4%BB%8B)
-   [先决条件](/documentation/zh-cn/unreal-engine/horde-authentication-tutorial-for-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [步骤](/documentation/zh-cn/unreal-engine/horde-authentication-tutorial-for-unreal-engine#%E6%AD%A5%E9%AA%A4)