# 为虚幻引擎创建OIDC令牌 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-oidc-tokens-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:30:54.183Z

---

目录

![OIDC令牌](https://dev.epicgames.com/community/api/documentation/image/4acdce32-737f-478c-a89a-cf879ae54eca?resizing_type=fill&width=1920&height=335)

**OIDC令牌** 可以公开、分配、访问、刷新与OIDC兼容的身份提供商提供的令牌。这对于设置各种要与虚幻编辑器结合使用的云服务非常有用，例如[云DDC](/documentation/zh-cn/unreal-engine/how-to-set-up-a-cloud-type-derived-data-cache-for-unreal-engine)。本页面将介绍如何配置OIDC令牌工具和设置身份提供商。

## 配置

配置文件可以放在 `Engine\Programs\OidcToken\oidc-configuration.json` 或 `<Game>\Programs\OidcToken\oidc-configuration.json` 下面

下面是配置文件的示例：

oidc-configuration.json

```cpp

{

	"OidcToken": {

		"Providers": {

			"MyOwnProvider": {

				"ServerUri": "https://<url-to-your-provider>",

				"ClientId": "<unique-id-from-provider-usually-guid>",

				"DisplayName": "MyOwnProvider",

				"RedirectUri": "http://localhost:6556/callback", // This needs to match what is configured as the redirect URI for your IdP.

                "PossibleRedirectUri": [

					"http://localhost:6556/callback",

					"http://localhost:6557/callback",

				], // 可以使用的重定向URL集。端口可能正在使用中，因此最好配置一些替代方案。这些需要与IdP中的配置匹配。

				"Scopes": "openid profile offline_access" // 这些作用域是你需要的基本作用域。有些系统可能需要更多，并且作用域的名称可能不同。

			}

		}

	}

}

```

## 设置身份提供商

本小节将介绍如何设置一些常见的 **身份提供商（IdP）** 。

### Okta

你需要设置以下项目才能将Okta用作IdP：

-   一个用于 **交互式登录** （由用户登录）的 **客户端** （应用程序）。
    
-   一个 **自定义身份验证服务器** ，用于控制Okta如何映射声明和作用域，以及你可以为其分配用户来管理访问控制的一些组。
    
-   如果你要在无法进行交互式登录的构建农场中运行，则需要设置另一个 **客户端** （应用程序）以允许登录。
    

在没有自定义身份验证服务器的情况下，Okta不支持OIDC登录。要设置身份验证服务器，请参阅[Okta关于身份验证服务器的文档](https://developer.okta.com/docs/concepts/auth-servers/)。

要将Okta设置为身份提供商，请按以下步骤操作：

1.  打开 **Okta管理员操作面板（Okta admin dashboard）** 。
    
2.  点击 **应用程序（Applications）** > **应用程序（Applications）** 。
    
3.  创建用于交互式登录的 **客户端** 并启用以下授权类型：
    
    -   刷新令牌
        
    -   授权代码
        
4.  我们建议在 **本地主机** 下指定 **几个登录URL** 。例如：
    

-   http://localhost:8749/oidc-token
    
-   http://localhost:8750/oidc-token
    
-   http://localhost:8751/oidc-token
    
-   http://localhost:8752/oidc-token
    
-   http://localhost:8753/oidc-token
    
-   http://localhost:8754/oidc-token
    

这样应用程序就可以在登录过程中在多个本地端口上运行，从而避免端口繁忙的问题。

上面列出的端口是随机示例。你可以选择适合自己需求的端口。

1.  设置 **无人值守登录客户端** ，该客户端与你在前面步骤中建立的客户端类似，但有以下几点不同：
    
    -   改用 **客户端凭据** 授予类型。
        
    -   你无需指定任何登录URL。
        

这要求你将 **配置文件对象** 与客户端结合使用。如需查看关于如何更新已创建配置文件的示例，请参阅[Okta关于更新配置文件属性的文档](https://developer.okta.com/docs/reference/api/apps/#update-application-level-profile-attributes)。

1.创建你要用于无人值守登录的客户端凭据后，请为其提交有效负载，类似于以下示例：

```cpp

"profile": {

        "clientCredentialsGroups": [

            "app-ue-storage-project-your-project-name"

        ]

    }

```

1.  按照以下指示更新自定义身份验证服务器中的 **组声明** ：
    
    -   你可以根据需要映射用户组，但你需要创建至少一个组，该组需准确包含你想要有访问权限的所有用户。在Epic Games，我们通常是一个项目一个组。
        
    -   你还需要为具有某些拥有更高访问权限的用户创建一个 **管理员组** 。
        
    -   采用的命名规范要便于识别你想使用的组。这有助于确保你仅发送适用于虚幻引擎事务的组作为令牌的一部分，而不是用户所属的所有组。
        
    -   创建时请确保为每个组至少分配一个用户。
        
2.  在Okta管理员页面，在 **安全（Security）** > **API** 下配置自定义身份验证服务器。
    

自定义身份验证服务器是Okta的附加组件，你可能无法使用，但Okta需要它来处理OIDC登录。

要创建身份验证服务器，请点击 **创建身份验证服务器（Create Authorization Server）** 按钮。该身份验证服务器并非只有云DDC才能用，而是可用于你想要使用的任何虚幻引擎服务。

1.  编辑身份验证服务器并设置 **访问策略（Access Policies）**。为每个客户端创建一个策略，并将其设置为允许该客户端登录。
    
2.  打开访问令牌类型的 **声明（Claims）** ，然后设置 **组（Groups）** 声明，并将其设置为筛选出你要使用的组，以及包含 `clientCredentialsGroups` 。使用此自定义表达式：
    
    ```cpp
    		
         (appuser != null) ? Arrays.flatten( Groups.startsWith("OKTA", "app-ue-", 100) == null ? {} : Groups.startsWith("OKTA", "app-ue-", 100) ) : app.profile.clientCredentialsGroup1s
    		
    ```
    

这会筛选掉以 `app-ue` 开头的组。

1.  设置你可以用于构建农场登录的 **cache\_access** 作用域。

完成上述步骤后，Okta即可充当你的身份提供商。

#### 如何测试你的身份提供商Okta

要测试Okta，请执行以下步骤：

1.  在身份验证服务器中，前往 **令牌预览（Token Preview）** 。
    
2.  选择具有 **授权代码** 授权类型的 **交互式登录** 客户端。
    
3.  选择分配到正确组的用户。
    

当你预览此令牌时，显示的JSON应包含一个 **组** 数组，其中包含你已分配的组的名称。

### Microsoft Entra (AzureAD)

要将Microsoft Entra设置为身份提供商，请按以下步骤操作：

1.  前往 Microsoft [Azure Portal](https://portal.azure.com)。
    
2.  点击 **Microsoft Entra** 服务。
    
3.  前往 **应用程序注册（App registration）**，并为桌面登录创建新的应用程序注册。它应包含以下设置：
    
    -   单一租户
        
    -   包含一组使用公共客户端/原生选项的本地主机重定向URL。以下是一些重定向URL示例：
        

-   http://localhost:8749/oidc-token
    
-   http://localhost:8750/oidc-token
    
-   http://localhost:8751/oidc-token
    
-   http://localhost:8752/oidc-token
    
-   http://localhost:8753/oidc-token
    
-   http://localhost:8754/oidc-token
    

记下此应用程序的 `客户端ID`。

1.  前往 **令牌配置（Token Configuration）** 并添加 **组** 声明设置，以使用 **分配给应用程序的组**。
    
2.  为 **项目用户** 角色创建新的 **安全组**。将该安全组分配给该角色，然后将你所需的所有用户添加到该安全组。
    
3.  创建以下 **应用角色**：
    
    -   **项目用户（Project User）**（通常是一个项目一个用户）
        
    -   **管理员（Admin）**
        

项目用户角色需要可分配给用户、组和应用程序，而管理员角色仅适用于用户。

1.  返回 **应用程序注册（App registration）** 并为后端服务（例如"虚幻云DDC"）创建应用程序。
    
2.  将API作用域添加到你的新应用程序并将其命名为 `user.access`。为访问此API的桌面应用程序分配 `客户端id`。
    
3.  为你的烘焙应用程序创建一个单独的新应用程序注册，并向其添加客户端密钥，以便在无人值守的情况下登录（或者如果你愿意，也可以使用托管身份或类似身份）。你还应该为此应用程序分配项目用户角色。
    
4.  创建 `oidc-configuration.json` 文件时，你可以在 **端点（Endpoints）** 按钮下找到要用于应用程序注册的 **服务器url**。其通常是 `[https://login.microsoftonline.com/](https://login.microsoftonline.com/)<directory-tenant-id>/v2.0`。
    
5.  对于 **客户端ID** 请使用你创建的桌面应用程序的 `客户端ID`。该作用域需要包含你在后端服务中创建的API作用域，因此其结尾通常都是：`offline_access profile openid api://<api scope guid>/user.access`.
    

完成上述步骤后，Microsoft Azure即可充当你的身份提供商。

-   [oidc token](https://dev.epicgames.com/community/search?query=oidc%20token)
-   [cloud services](https://dev.epicgames.com/community/search?query=cloud%20services)
-   [cloud ddc](https://dev.epicgames.com/community/search?query=cloud%20ddc)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [配置](/documentation/zh-cn/unreal-engine/creating-oidc-tokens-for-unreal-engine#%E9%85%8D%E7%BD%AE)
-   [设置身份提供商](/documentation/zh-cn/unreal-engine/creating-oidc-tokens-for-unreal-engine#%E8%AE%BE%E7%BD%AE%E8%BA%AB%E4%BB%BD%E6%8F%90%E4%BE%9B%E5%95%86)
-   [Okta](/documentation/zh-cn/unreal-engine/creating-oidc-tokens-for-unreal-engine#okta)
-   [如何测试你的身份提供商Okta](/documentation/zh-cn/unreal-engine/creating-oidc-tokens-for-unreal-engine#%E5%A6%82%E4%BD%95%E6%B5%8B%E8%AF%95%E4%BD%A0%E7%9A%84%E8%BA%AB%E4%BB%BD%E6%8F%90%E4%BE%9B%E5%95%86okta)
-   [Microsoft Entra (AzureAD)](/documentation/zh-cn/unreal-engine/creating-oidc-tokens-for-unreal-engine#microsoftentra\(azuread\))