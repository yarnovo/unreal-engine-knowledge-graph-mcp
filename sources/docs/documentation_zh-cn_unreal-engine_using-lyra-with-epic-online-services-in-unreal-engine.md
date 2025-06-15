# 在虚幻引擎中将Epic在线服务用于Lyra | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-lyra-with-epic-online-services-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:50:11.138Z

---

目录

![将Epic在线服务用于Lyra](https://dev.epicgames.com/community/api/documentation/image/41b3ab2f-5011-4647-96dd-414ed112b825?resizing_type=fill&width=1920&height=335)

[Lyra初学者游戏（Lyra Starter Game）](/documentation/zh-cn/unreal-engine/lyra-sample-game-in-unreal-engine)示例项目旨在用于开发和发布多人游戏。此项目支持在线多人游戏功能，并集成了[Epic在线服务](https://dev.epicgames.com/en-US/services)（**EOS**）后端。但是，如果是从 **Epic Games启动程序** 下载的Lyra，则必须进行一些额外设置，才能使用EOS。

Lyra初学者游戏可以访问通用用户插件（Common User Plugin）中的Epic在线服务功能。通用用户插件使用在线子系统（OSSv1）和在线服务（OSSv2）插件实现EOS功能。Lyra默认使用在线子系统（OSSv1）。[Common User插件](/documentation/zh-cn/unreal-engine/common-user-plugin-in-unreal-engine-for-lyra-sample-game)文档页面说明了这两种插件的功能，包括如何将OSSv2用于Epic在线服务。你可以在[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)文档页面中详细了解OSSv1和OSSv2的区别。

## Epic帐户和引擎设置

要在Lyra中使用EOS，必须设置帐户以访问EOS和虚幻引擎源代码：

1.  要测试多人游戏，至少需要2个 **Epic帐户**。创建新帐户的方法是导航到[Epic Games商城](https://store.epicgames.com/en-US/)页面，然后单击 **登录（Sign In）**，使用新的电子邮件地址和密码进行 **注册（Sign Up）**。
    
    为了提高效率，可以在另一个浏览器中使用第二个帐户登录。
    
2.  要启用完整的EOS支持，必须具有一个可以访问虚幻引擎源代码的帐户。确认你的主Epic帐户已经与 **GitHub** 同步，如[在GitHub上访问虚幻引擎源代码](https://www.unrealengine.com/en-US/ue-on-github)页面所述。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23c7a3f4-b7c9-4658-9390-2ea758802015/connectgithub.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23c7a3f4-b7c9-4658-9390-2ea758802015/connectgithub.png)
    
3.  获得源代码访问权限后，请按照[\[下载虚幻引擎源代码\](https://docs.unrealengine.com/5.0/en-US/downloading-unreal-engine-source-code/)](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)所述，下载并安装引擎源代码。安装引擎的 **版本分支**。可以使用 **Visual Studio 2019** 或 **Visual Studio 2022**。
    
    下载源代码并运行 `Setup.bat` 的过程可能需要一些时间。我们建议你在等待设置完成的过程中继续创建帐户。
    
4.  你需要在两个帐户上都启用 **双因素身份验证** 以便访问EOS开发者工具。为此，可以从 **帐户管理（Account Management）** 页面导航到 **密码和安全** **（Password & Security）** 中执行此操作，也可以在你执行第5步时根据系统提示完成此设置。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1cc24b6-8b52-4e99-aae1-fbc166dfae0a/passwordsecurity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1cc24b6-8b52-4e99-aae1-fbc166dfae0a/passwordsecurity.png)
    
5.  两个Epic帐户都需要能够访问[\[EOS开发者门户\](https://dev.epicgames.com/portal/)](https://dev.epicgames.com/portal/en-US/))（**开发者门户**）。 导航到开发者门户时，系统会提示接受许可证并选择 **作为个人（On your own）** 还是 **作为组织（As an Organization）**。 请选择 **作为组织（As an Organization）** 以使用你的主帐户创建组织。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87b581d6-ac54-44b7-9dce-c1ca66fea26a/asorganization.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87b581d6-ac54-44b7-9dce-c1ca66fea26a/asorganization.png)
    
6.  使用开发者门户登录到你的主帐户和组织后，你需要将你的辅助帐户添加到组织。单击 **开发者门户（Developer Portal）** 目录左侧的 **组织（Organization）** 分段，然后从 **团队（Team）** 选项卡中单击 **邀请（Invite）** 按钮。随后，系统会提示你填写辅助帐户的电子邮件地址。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b272635f-3e9c-494f-a72e-c922656409fd/testorganization.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b272635f-3e9c-494f-a72e-c922656409fd/testorganization.png)
    

该角色对于开发测试并不重要，因此你可以在单击 **邀请（Invite）** 之前选择 **社区工具（Community Tools）**。可以通过单击 **设置（Settings）** 重命名你的 **组织（Organization）**。或者，还可以为你的辅助帐户创建一个组织，但是，本教程不需要这样做。

1.  你的辅助帐户将在电子邮件中收到邀请链接。你需要在登录辅助帐户时访问此URL。
    
    可以将URL粘贴到已使用辅助帐户登录的浏览器中来接受邀请。
    

接受邀请后，辅助帐户除了在测试期间登录外，不会用于任何其他用途。

## Epic在线服务产品设置

在拥有具备开发者访问权限的Epic帐户并且具有相应的组织后，需要在后端设置一个产品以便在Lyra的本地副本中使用。要在PC平台上开发和测试Lyra，需要为EOS和 **Epic帐户服务（EAS）** 进行额外的设置。

[Epic帐户服务](https://dev.epicgames.com/docs/services/en-US/EpicAccountServices/index.html)提供旨在与EOS集成的身份验证和社交工具。如果你可以访问由平台或发布商提供的另一个身份验证系统，则不需要使用EAS。Lyra使用EAS执行开发登录以及与Epic Games商城的集成。

本小节中的步骤均在[EOS开发者门户](https://dev.epicgames.com/portal/)中执行，并且包含的信息与[EOS设置指南](https://dev.epicgames.com/en-US/news/how-to-set-up-epic-online-services-eos)和[Epic帐户服务入门页面](https://dev.epicgames.com/docs/services/en-US/EpicAccountServices/GettingStarted/index.html)中的相同：

1.  首先，需要设置[产品](https://dev.epicgames.com/docs/services/en-US/DevPortal/ProductManagement/index.html)。可以通过选择 **创建产品（Create Product）** 来创建新产品。然后，可以选择你的产品以查看各种EOS功能的选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b66cbcb1-0e65-4454-80bc-f0f94bc2fb2a/createproduct.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b66cbcb1-0e65-4454-80bc-f0f94bc2fb2a/createproduct.png)
    
2.  接下来，你需要为你的Lyra版本设置[客户端](https://dev.epicgames.com/docs/services/en-US/DevPortal/ClientCredentials/index.html)和 **客户端策略**。在 **产品设置（Product Settings）** 中，单击 **客户端（Clients）** 选项卡。系统会提示你阅读并接受法律协议。执行此操作后，"Clients（客户端）"页面会显示其他授权许可的提示。对于本教程，你需要接受 **Epic帐户服务（Epic Account Services）** 的授权许可。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61d444ae-6530-46b6-811c-01d51ff0638e/clients.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61d444ae-6530-46b6-811c-01d51ff0638e/clients.png)
    
3.  单击 **新增客户端（Add New Client）** 以创建一个名为"Lyra测试客户端（Lyra Test Client）"的新客户端。然后，单击 **新增客户端策略（Add New Client Policy）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6948ee8c-853e-426f-b811-4c1864ff4e8e/addnewclient.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6948ee8c-853e-426f-b811-4c1864ff4e8e/addnewclient.png)
    
4.  在 **客户端策略名称（Client policy name）** 字段中，输入"P2P客户端（Peer to Peer client）"，因为它可以重复用于多个产品。对于 **客户端策略类型（Client policy type）**，请选择 **Peer2Peer**，因为它提供Lyra所需的所有功能。单击两次 **保存并退出（Save & Exit）** 以保存你的新策略和客户端。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a5b4536-694d-4930-9081-dc1c1a2974a4/newclientpolicy.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a5b4536-694d-4930-9081-dc1c1a2974a4/newclientpolicy.png)
    
5.  要允许使用EOS进行开发测试，你需要设置一个应用程序将你的产品与EAS连接。要为游戏使用EOS，你需要在该服务上设置EOS应用程序。这样就会将你的游戏与Epic帐户服务相关联。要执行此操作，请选择 **Epic帐户服务（Epic Account Services）**，系统会提示你阅读并接受法律协议。完成后，单击你的 **Lyra测试产品（Lyra Test Product）** 的 **权限（Permissions）(1)** 字段。或者，可以单击 **创建应用程序（Create Application）(2)**，然后单击右上角的 **权限（Permissions）** 选项卡。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fc16a0c-38f8-4a8f-9779-13b793b9f3b8/createapppermissions.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fc16a0c-38f8-4a8f-9779-13b793b9f3b8/createapppermissions.png)
    
    [品牌设置（Brand Settings）](https://dev.epicgames.com/docs/services/en-US/EpicAccountServices/BrandReview/index.html)需要在发布前进行设置，但开发和测试不需要进行品牌设置。
    
    ![brand-settings-menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2450fa11-8ea2-467c-8029-f4fff1e12cb8/brandsettings.png)
    
6.  在 **权限（Permissions）** 页面上，启用 **在线状态（Online Presence）(1)** 和 **好友（Friends）(2)**，因为Lyra需要这两项设置才能启用社交功能。单击 **保存更改（Save Changes）(3)**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41e40ec3-a541-4fcc-8d69-afb9546c5570/permissions.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41e40ec3-a541-4fcc-8d69-afb9546c5570/permissions.png)
    
7.  选择 **关联的客户端（Linked Clients）(1)**，然后单击 **选择客户端（Select Clients）** 旁边的下拉箭头并选择 **Lyra测试客户端（Lyra Test Client）(2)** 以将其关联到此应用程序，再单击 **保存更改（Save Changes）(3)**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7713fc57-c1ae-420b-aabd-210d629166d2/linkedclients.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7713fc57-c1ae-420b-aabd-210d629166d2/linkedclients.png)
    
    你可以导航到 **产品设置（Product Settings）** 页面，然后从 **通用（General）** 选项卡中向下滚动以查看你稍后需要的所有信息。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0b6a2e9-7687-40f0-b49a-cfffd3cdaba1/productsettings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0b6a2e9-7687-40f0-b49a-cfffd3cdaba1/productsettings.png)
    
8.  EOS设置的最后一步是安装[开发者身份验证工具（Developer Authentication Tool）](https://dev.epicgames.com/docs/services/en-US/EpicAccountServices/DeveloperAuthenticationTool/index.html)。此工具可以简化多人游戏测试，因为你只需登录每个帐户一次，而不必在每次启动游戏时都进行双因素身份验证检查。
    

你的UE5源代码安装目录的Engine/Source/ThirdParty/EOSSDK/Tools文件夹中有身份验证工具的副本，也可以在[EOS SDK下载内容](https://dev.epicgames.com/portal/en-US/sdk)中找到。

## 安装和配置Lyra

你现在拥有完整下载的引擎版本和完全设置好的EOS产品。下面的步骤将引导你完成安装、配置和构建Lyra的过程，使Lyra能够使用EOS。这些步骤类似于[Lyra文档](/documentation/zh-cn/unreal-engine/lyra-sample-game-in-unreal-engine)中的对应步骤。

1.  打开 **Epic Games启动程序**（使用你的主帐户登录），然后选择 **虚幻引擎（Unreal Engine）** > **示例（Samples）**。单击 **Lyra初学者游戏（Lyra Starter Game）**，然后单击 **创建项目（Create Project）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff4e18e7-db6e-4f3a-ab5c-027c61211d97/epicgameslyra.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff4e18e7-db6e-4f3a-ab5c-027c61211d97/epicgameslyra.png)
    
2.  不要接受默认设置， 请为你的项目指定一个名称。
    
    如果你打算将Lyra改编成另一款游戏，则应在此处使用该名称。
    

选择安装引擎源代码的根文件夹。例如，如果已将引擎源代码安装到C:\\UE5，请单击 **浏览（Browse）** 以选择这个文件夹，然后单击 **创建（Create）** 以便下载该项目。进行此操作之后，你应该有一个Engine子文件夹，还有一个与你刚选择的项目名称相匹配的子文件夹（默认为LyraStarterGame）。

1.  你需要安装位于 `Engine/Extras/UnrealVS` 文件夹中的 **UnrealVS** 扩展。使用该扩展可以轻松管理Visual Studio中的启动项目和命令行参数。
    
2.  导航到引擎源代码的根目录，然后安装并运行GenerateProjectFiles.bat以创建一个名为UE5.sln的新解决方案文件。双击该文件以加载Visual Studio。 加载完成后，你的LyraStarterGame版本会列在 **解决方案资源管理器（Solution Explorer）** 中的 **游戏（Games）** 类目下（包括LyraGameEOS）。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83ae1d79-438c-40ef-a639-3a82e87e66cc/visualstudiolyra.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83ae1d79-438c-40ef-a639-3a82e87e66cc/visualstudiolyra.png)
    
3.  右键单击LyraStarterGame，选择 **设为启动项目（Set As Startup Project）**，然后[构建该项目](/documentation/zh-cn/unreal-engine/compiling-game-projects-in-unreal-engine-using-cplusplus)。
    
    这将编译Lyra和所需的所有引擎功能，可能需要一段时间。如果遇到任何编译错误，则需要在解决它们之后再继续。
    
4.  从源代码构建Lyra后，可从 **调试（Debug）菜单** 运行该项目，并可浏览项目示例。
    
5.  你需要进行额外设置，以便将该项目配置为使用EOS。Lyra附带了特定于EOS的配置文件，使用[Common User插件](/documentation/zh-cn/unreal-engine/common-user-plugin-in-unreal-engine-for-lyra-sample-game)的 **CustomConfig** 功能即可启用这些配置文件。具体方法是修改项目的 `Config/Custom/EOS` 文件夹中的 `DefaultEngine.ini` 文件。在线服务和在线子系统的配置方法不同。
    
    -   要配置在线子系统（OSSv1），需打开该文件并搜索到以下行：
        
        ```cpp
                  ;For OSSV1, fill in the following line with actual details and then uncomment
                      ;+Artifacts=(ArtifactName="ARTIFACTNAME",ClientId="CLIENTID",ClientSecret="CLIENTSECRET",ProductId="PRODUCTID",SandboxId="SANDBOXID",DeploymentId="DEPLOYTMENTID",EncryptionKey="ENCRYPTIONKEY")
        ```
        
        -   如需更多在线子系统EOS的配置信息，请参阅[在线子系统EOS插件](/documentation/zh-cn/unreal-engine/online-subsystem-eos-plugin-in-unreal-engine#artifactsettings)文档。
    -   要配置在线服务（OSSv2），需打开该文件并搜索到以下行：
        
        ```cpp
              ;For OSSv2, fill in the following lines with actual details and then uncomment
              ;+[OnlineServices.EOS]
              ;+ProductId=PRODUCTID
              ;+SandboxId=SANDBOXID
              ;+DeploymentId=DEPLOYTMENTID
              ;+ClientId=CLIENTID
              ;+ClientSecret=CLIENTSECRET
        ```
        
        -   如需更多在Lyra中启用OSSv2、禁用OSSv1的信息，请参阅[通用用户插件](/documentation/zh-cn/unreal-engine/common-user-plugin-in-unreal-engine-for-lyra-sample-game)文档中的[使用在线服务插件](/documentation/zh-cn/unreal-engine/common-user-plugin-in-unreal-engine-for-lyra-sample-game#%E4%BD%BF%E7%94%A8%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1%E6%8F%92%E4%BB%B6)一节。
        -   For more information about configuring Online Services EOS, see the [Enable and Configure Online Services EOS](/documentation/zh-cn/unreal-engine/enable-and-configure-online-services-eos-in-unreal-engine#epiconlineservices) documentation.
    
    虚幻引擎配置文件（`.ini`）在每一行的开头使用分号（`;`）来标识注释。要在引擎配置文件中取消某一行的注释，只需移除行首的分号（`;`）即可。
    
6.  修改配置文件后，需保存修改。
    

## 在编辑器版本中测试EOS

现在可以开始执行在编辑器版本和打包的版本中测试游戏的步骤。

1.  在 **Visual Studio** 中，启用 **UnrealVS工具栏**，并将以下行添加到命令行分段中：
    
    ```cpp
         -game -customconfig=EOS
    ```
    
2.  调试项目以使用新命令行进行启动，这将在独立游戏模式下启动项目并使用EOS配置文件。完成后，将显示一条错误消息"登录失败，未实现（Login Failure Not Implemented）"。
    
3.  单击 **OK（确定）**，随后将加载Lyra主菜单。此错误消息表示你的项目正在尝试使用EOS，但由于你没有在命令行上指定足够的信息而无法登录。如果你没有看到登录失败的错误消息，则配置文件可能存在错误，因此应在输出日志中搜索与EOS相关的任何错误。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/419ab54e-2980-4a02-8717-ecfef537befb/loginfailure.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/419ab54e-2980-4a02-8717-ecfef537befb/loginfailure.png)
    
4.  现在，运行你在 **Epic在线服务产品设置（Epic Online Services Product Setup）** 中解压缩的 **开发者身份验证工具（Developer Authentication Tool）**。运行 **EOS\_DevAuthTool** 程序时，系统会提示你输入要使用的 **端口**，请输入 **6666**。
    
    在Windows上，你可能会收到要求访问防火墙的另一个提示。你需要允许访问。
    

接下来，单击 **登录（Login）** 以打开嵌入式浏览器，可在其中使用你的主Epic帐户登录。输入双因素代码后，系统会提示你输入 **凭据名称（Credential Name）**，请输入"Player1"或类似名称。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc61e783-b08f-4ee0-9a73-9d72bf7800cb/credits.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc61e783-b08f-4ee0-9a73-9d72bf7800cb/credits.png)

1.  对你的辅助帐户重复此过程，但请指定另一个不同的凭据名称，例如"Player2"。你的两个帐户将保持登录到该测试会话的EOS后端。最终，你将需要重新启动开发工具并再次登录以刷新身份验证。
    
2.  导航回 **Visual Studio** 并将以下选项添加到 **UnrealVS** 中的命令行：
    
    ```cpp
         -AUTH_LOGIN=localhost:6666 -AUTH_PASSWORD=Player1 -AUTH_TYPE=developer
    ```
    
    但是，需要将端口和凭据名称替换为前面选取的名称。例如，此时的完整命令行可以是：
    
    ```cpp
         LyraStarterGame -game -customconfig=EOS -AUTH_LOGIN=localhost:6666 -AUTH_PASSWORD=Player1 -AUTH_TYPE=developer.
    ```
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1436a46-cc28-4709-8588-8d719536bf1e/visualstudioauth.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1436a46-cc28-4709-8588-8d719536bf1e/visualstudioauth.png)
    
3.  单击 **调试（Debug）** 以再次启动游戏。这一次，将使用命令行上的额外信息来登录EOS。随即将打开一个浏览器窗口，警告你有一个未经验证的应用程序，这是因为品牌设置未完成。单击两次"接受（Accept）"以授权将应用程序关联到你的Epic帐户。这将带你回到游戏并显示主菜单（无错误消息）。按 **Shift**+**F3** 打开Epic帐户覆层，其中显示你已完全登录。
    
4.  此帐户是你的多人游戏的主帐户，因此请单击 **Play Lyra（运行Lyra）**，然后单击 **开始游戏（Start a Game）** 以加载托管屏幕。确保 **网络（Network）** 设置为 **在线（Online）**，然后选择 **淘汰（Elimination）** 开始比赛。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/739ba0a0-35ac-480b-bec8-7f94b2ad0193/hostelimination.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/739ba0a0-35ac-480b-bec8-7f94b2ad0193/hostelimination.png)
    
    为确保你的计算机可以处理两个游戏副本，你可能需要将图形质量设置为"低（Low）"并在设置菜单中启用窗口模式。
    
5.  返回到 **Visual Studio** 并从 **调试（Debug）** 菜单中分离此客户端。将UnrealVS命令行中的-AUTH\_PASSWORD值更改为第二个凭据名称（Player2），准备使用你的辅助帐户登录。 单击 **调试（Debug）** 以再次启动游戏。当第二个实例启动时，系统会提示你将应用程序授权给你的第二个帐户，然后显示主菜单。
    
6.  为确保一切正常，请单击 **浏览（Browse）** 以显示 **服务器浏览器（Server Browser）**，并检查第一个游戏实例托管的游戏是否仍在运行。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/831c0661-cb1f-4d17-88c2-31af7b0c9f17/joinagame.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/831c0661-cb1f-4d17-88c2-31af7b0c9f17/joinagame.png)
    
7.  选择游戏。如果你加入游戏成功，则该过程完成。你现在处于一个有2名玩家（和机器人）的多人游戏中。
    

## LyraGameEOS打包

在确认EOS可以在开发编辑器版本中正常运行后，即可按照额外的步骤创建打包的 **LyraGameEOS** 版本。

仅当遵循了将Lyra安装到从源代码构建的引擎副本中的完整过程后，这些步骤才有效，因为安装启动器的版本无法自定义构建过程。

1.  在 **开发（Development）** 版本中设置你的项目，并加载编辑器以创建游戏的EOS打包版本。
    
    可以清除项目名称后的命令行，UnrealVS会在下拉菜单中保留命令行历史记录。
    
2.  编辑器加载后，导航到工具栏，单击 **平台（Platforms）** > **Windows** > **构建目标（Build** **Target）**，然后选择 **LyraGameEOS** 以构建游戏的自定义版本，这一游戏版本将 `-CustomConfig=EOS` 设置烘焙到可执行文件中。
    
3.  导航到 **工具栏（Toolbar）> 平台（Platforms）> Windows >打包项目（Package Project）** 以选择一个输出目录。选择目录之后，系统将开始烘焙和打包过程。
    
    检查输出日志中是否有任何错误。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43578565-c904-48e2-b7e0-14470acc210f/platforms.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43578565-c904-48e2-b7e0-14470acc210f/platforms.png)
    
    如果打包Lyra失败并且日志显示有与UAT相关的错误消息，则可能是遇到了Lyra游戏示例的原始5.0版本中存在的错误。要修复此错误，可下载5.0.2版（或更高版本）的Lyra示例，或将Lyra安装到引擎基础安装目录的 `Samples/Games` 子文件夹（C:\\UE5\\Samples\\Games\\LyraStarterGame）。
    
4.  如果烘焙和打包过程成功，则会将打包的游戏副本放在你选择的目录中。这个打包的版本可以压缩并发送到另一台计算机以进行真实的多人游戏测试。
    

如果从Epic Games商城运行这个打包的版本，则会传入正确的用户凭据。但是，对于开发测试，你需要创建一个快捷方式或批处理文件，并添加以下命令行：

```cpp
-AUTH_LOGIN=localhost:6666 -AUTH_PASSWORD=Player1 -AUTH_TYPE=developer
```

## 后续步骤

完成这些步骤后，你现在获得了一个完整工作的Lyra版本，可在其中使用EOS进行多人游戏的开发和测试。借助启用了EOS的Lyra游戏示例的工作版本，你可以将其用作其他开发任务的基础，最终目标是发布你自己的游戏。要调整Lyra多人游戏代码以用于另一个现有游戏，你可以在整个Lyra代码库之上构建你的游戏，或者可以按照文档中的说明将[CommonUser](/documentation/zh-cn/unreal-engine/common-user-plugin-in-unreal-engine-for-lyra-sample-game)插件和配置文件复制到你自己的游戏中。

Lyra设计为在所有受支持的游戏主机、移动平台和PC桌面平台上均可运行，但是，当前版本的示例主要是使用Epic Games商城的内部版本在PC上进行测试的。为了准备在[Epic Games商城](https://dev.epicgames.com/docs/services/en-US/EpicGamesStore/index.html)中发布你自己的游戏，我们建议你与你的发布商合作完成[品牌审核](https://dev.epicgames.com/docs/services/en-US/EpicAccountServices/BrandReview/index.html)流程，并开始与发布团队进行对话。

如果你在开发游戏的跨平台版本时需要帮助，或对本教程中的EOS设置步骤有任何疑问，可以在[EOS社区论坛](https://eoshelp.epicgames.com/s/)上创建讨论或联系EOS支持团队。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online](https://dev.epicgames.com/community/search?query=online)
-   [networking](https://dev.epicgames.com/community/search?query=networking)
-   [lyra](https://dev.epicgames.com/community/search?query=lyra)
-   [eos](https://dev.epicgames.com/community/search?query=eos)
-   [eas](https://dev.epicgames.com/community/search?query=eas)
-   [epic online services](https://dev.epicgames.com/community/search?query=epic%20online%20services)
-   [epic account services](https://dev.epicgames.com/community/search?query=epic%20account%20services)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Epic帐户和引擎设置](/documentation/zh-cn/unreal-engine/using-lyra-with-epic-online-services-in-unreal-engine#epic%E5%B8%90%E6%88%B7%E5%92%8C%E5%BC%95%E6%93%8E%E8%AE%BE%E7%BD%AE)
-   [Epic在线服务产品设置](/documentation/zh-cn/unreal-engine/using-lyra-with-epic-online-services-in-unreal-engine#epic%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1%E4%BA%A7%E5%93%81%E8%AE%BE%E7%BD%AE)
-   [安装和配置Lyra](/documentation/zh-cn/unreal-engine/using-lyra-with-epic-online-services-in-unreal-engine#%E5%AE%89%E8%A3%85%E5%92%8C%E9%85%8D%E7%BD%AElyra)
-   [在编辑器版本中测试EOS](/documentation/zh-cn/unreal-engine/using-lyra-with-epic-online-services-in-unreal-engine#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E7%89%88%E6%9C%AC%E4%B8%AD%E6%B5%8B%E8%AF%95eos)
-   [LyraGameEOS打包](/documentation/zh-cn/unreal-engine/using-lyra-with-epic-online-services-in-unreal-engine#lyragameeos%E6%89%93%E5%8C%85)
-   [后续步骤](/documentation/zh-cn/unreal-engine/using-lyra-with-epic-online-services-in-unreal-engine#%E5%90%8E%E7%BB%AD%E6%AD%A5%E9%AA%A4)