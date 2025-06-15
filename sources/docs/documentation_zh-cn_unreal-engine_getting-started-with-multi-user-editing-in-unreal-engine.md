# 虚幻引擎多用户编辑入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:34:29.790Z

---

目录

![多用户编辑入门](https://dev.epicgames.com/community/api/documentation/image/0f858a8e-4481-47be-882c-f77dc91bb1cb?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

此快速入门页面将介绍多用户编辑系统的基础知识，帮助读者使用该功能。完成本教程后将学习到：

-   如何对多台电脑进行设置，让其能同时加入会话。
    
-   如何启动服务器对会话进行管理。
    
-   如何发起和加入会话，以便和团队成员共同工作。
    
-   如何将在会话中所做的更改保存到本地电脑上的项目内容中。
    

**先决条件：**操作本教程时，虽然可以用同一台主机上的虚幻编辑器的多个实例，但是效率更高的方法是将多台不同的电脑连接至同一会话。首先：

-   在每台电脑上安装相同版本的虚幻引擎。
    
-   确保所有电脑都连接到同一局域网（LAN）或虚拟专用网络（VPN）。
    

此过程中使用的图像是[第三人称模板](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine)示例项目，可从Epic Games Launcher的 **虚幻商城（Marketplace）** 选项卡中获取。然而，同样的步骤也适用于正在进行的所有虚幻引擎项目。

## 1 - 启动插件

要将虚幻编辑器的多个实例连接在一起，以便在共享会话中进行工作，需先为该项目启用 **多用户编辑** 插件。

1.  在虚幻编辑器中打开你的项目。
    
2.  从主菜单中选择 **编辑（Edit） > 插件（Plugins）**。
    
3.  在 **编辑器（Editor）** 类目下，找到 **多用户编辑** 插件并选中其 **启用（Enabled）** 框。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b84eb204-f3fb-484a-b31e-515056fa3335/01-multi-user-plugin-enable.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b84eb204-f3fb-484a-b31e-515056fa3335/01-multi-user-plugin-enable.png)
    
4.  点击 **是（Yes）** 确认。
    
    ![Confirm](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39ae2e2f-4c8c-4fd1-a664-99b39640ba45/02-pugin-enable-yes.png "Confirm")
5.  点击 **立即重启（Restart Now）** 重新启动项目并应用该更改。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76adfd23-3259-444a-a2b5-1603cda9851e/03-restart-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76adfd23-3259-444a-a2b5-1603cda9851e/03-restart-editor.png)
    

## 2 - 设置多台电脑

每台连接至同一多用户编辑会话的电脑，必须安装相同版本的虚幻引擎。

该虚幻引擎项目在每台电脑上的副本必须相同，即每个副本都有完全相同的内容。

-   通常实现这一点的方法是，将该项目存储在一个版本控制系统中，如Perforce、Git或Subversion，并将每台电脑同步至同一个版本或变更列表。
    
    如使用Perforce，也可考虑使用UnrealGameSync工具（UGS）来简化这个过程。欲了解相关细节，请参见[UGS文档](/documentation/zh-cn/unreal-engine/unreal-game-sync-ugs-for-unreal-engine).
    
-   多用户编辑系统并不强制要求使用源码管理。可以将项目文件夹轻松地从一台电脑复制到需加入同一会话的所有其他电脑中。这种方法在多用户编辑系统的初始测试中十分实用。然而，要避免对这种方法产生依赖。在团队中，有效利用版本控制工具才是维护和共享项目内容的最安全方式。
    

每台电脑上均存该项目的副本后，则需要自定义一些关键设置。在每台电脑上执行以下操作：

1.  在虚幻编辑器中打开项目，然后在主菜单中选择 **编辑（Edit）> 项目设置（Project Settings）**。
    
2.  在 **项目设置（Project Settings）** 窗口中，打开 **插件（Plugins） > 多用户编辑（Multi-User Editing）** 部分。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7438ef0-2d1f-4c81-8223-e8a1bed7e268/04-project-settings-plugin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7438ef0-2d1f-4c81-8223-e8a1bed7e268/04-project-settings-plugin.png)
    
    更改以下设置来添加编辑器UI的快捷按钮，自定义每个虚幻编辑器实例在连接到会话时向其他实例显示的在线状态信息。
    
    设置
    
    描述
    
    **启用多用户工具栏按钮（Enable Multi-User Toolbar Button）**
    
    向虚幻编辑器主窗口添加一个新按钮，提供最常用的多用户编辑命令的快捷方式。
    
    **显示名称（Display Name）**
    
    设置多用户编辑系统显示该电脑的在线状态信息和会话历史时所使用的名称。  
    默认状态下，多用户编辑系统会尝试使用主机操作系统的当前用户的登录信息，但在某些情况下可能需要覆盖此值——例如在多台电脑上登录了相同的用户帐户时。
    
    **化身颜色（Avatar Color）**
    
    设置多用户编辑系统在显示在线状态信息和会话历史时与此电脑关联的颜色。  
    默认状态下，该颜色对于所有用户都是相同的（白色），但如为每台电脑指定不同的颜色，则能更轻松地理解会话历史。
    
    欲了解此面板中各种可用设置的相关细节，也可参见[多用户编辑参考](/documentation/zh-cn/unreal-engine/multi-user-editing-reference-for-unreal-engine)。
    
3.  再次重启编辑器使新设置生效。
    

## 3 - 启动服务器

在每台需进行连接的电脑上打开虚幻编辑器中的项目后，需启动一台服务器，以便对这些电脑的共享会话进行管理。实现该目标的最简单方法是从虚幻编辑器的任一实例中启动。

1.  点击工具栏中的多用户编辑图标。（它应该会显示 **浏览（Browse）**，表示当前未连接到会话。）
    
    ![Browse](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7494f0d-2ef9-465b-8e15-db97ce4c0c84/05-browse-icon.png "Browse")
2.  **多用户浏览器（Multi-User Browser）** 窗口会打开。通过此面板可访问在多用户编辑系统中工作时需要的大部分会话管理工具。你将会经常回到此窗口。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f39eb0dc-d968-465b-9bc0-8b2d93ce6ed7/06-multi-user-browser.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f39eb0dc-d968-465b-9bc0-8b2d93ce6ed7/06-multi-user-browser.png)
    
    即使工具栏图标不在活跃状态，也可随时选择 **窗口（Window）> 多用户浏览器（Multi-User Browser）** 打开此面板。
    
3.  在 **多用户浏览器（Multi-User Browser）** 窗口中，点击工具栏最左侧的 **启动** 图标，在电脑上启动多用户编辑服务器。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fb47258-b046-4cdf-906e-938be8c34c4a/07-create-new-session.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fb47258-b046-4cdf-906e-938be8c34c4a/07-create-new-session.png)
    
4.  将看到新打开的命令窗口。管理会话和更改项目内容时，该服务器会定期发送状态信息，并在此窗口中显示。例如：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/499b3fc1-cf17-4513-94c0-f84901081a06/07-1-browser-log.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/499b3fc1-cf17-4513-94c0-f84901081a06/07-1-browser-log.png)
    

也可在安装了虚幻引擎的任何电脑上从命令行启动服务器。欲了解有关细节，请参见"多用户编辑参考"页面的[虚幻多用户服务器命令行参数](/documentation/zh-cn/unreal-engine/multi-user-editing-reference-for-unreal-engine#%E8%99%9A%E5%B9%BB%E5%A4%9A%E7%94%A8%E6%88%B7%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%9A%84%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%8F%82%E6%95%B0)部分。

## 4 - 开始会话

现在一台电脑上运行着一台服务器，但是虚幻编辑器实例尚未连接至该服务器。为实现该操作，需新建会话。会话将对其连接的全部用户对该项目的资源和关卡做出的全部修改进行管理并共享。

新建会话的步骤：

1.  在任何一台电脑上，按上一节所示方法打开 **多用户浏览器（Multi-User Browser）** 窗口。
    
    此处还不会列出任何会话。但是，只要运行服务器的电脑在网络上对运行此虚幻编辑器实例的电脑可见，便应该可以新建会话。
    
2.  点击 **多用户浏览器（Multi-User Browser）** 窗口工具栏中的 **新建会话** 图标。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/002b3b48-426a-467c-855d-72fbfe6fcb12/08-add-new-session.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/002b3b48-426a-467c-855d-72fbfe6fcb12/08-add-new-session.png)
    
    将会看到列表视图增加了新的一行，用于设置新会话。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d178041-d395-4091-87fe-f29c52f497d9/09-place-session-name.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d178041-d395-4091-87fe-f29c52f497d9/09-place-session-name.png)
    
3.  输入新会话的名称，然后从下拉列表选择要用来管理会话的服务器。（此时该列表中只有一个服务器。）然后选择最右端的复选框图标来创建会话。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79751c03-3874-4893-8b2e-1991ac38f028/10-getting-started-session.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79751c03-3874-4893-8b2e-1991ac38f028/10-getting-started-session.png)
    
    如有服务器与运行虚幻编辑器的电脑运行在同一个LAN或VPN上，但无法新建会话或在 **服务器（Server）** 下拉列表中看到该服务器，此时可能需停下来做一些附加的网络配置。请参见[高级多用户编辑](/documentation/zh-cn/unreal-engine/advanced-multi-user-networking-in-unreal-engine)。
    

你将会自动连接到新会话。**多用户浏览器（Multi-User Browser）** 窗口的布局将会改变，显示已加入会话的相关细节。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b9277d5-66bc-4f18-8437-defed61bc716/11-session-connected-computer-a.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b9277d5-66bc-4f18-8437-defed61bc716/11-session-connected-computer-a.png)

此外，主虚幻编辑器工具栏中的按钮将会表明已连接。

![Multi-User Editor connected in the Toolbar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d113c5d4-55c5-4679-8a20-296a64e7ff29/12-leave-session-icon.png "Multi-User Editor connected in the Toolbar")

## 5 - 加入会话

现在已有一台正在运行的服务器，并且已用一台电脑上的虚幻编辑器在该服务器上创建会话，将能从其他电脑运行的虚幻编辑器实例连接到同一会话。

在需加入会话的其他每台电脑上执行以下操作：

1.  打开 **多用户浏览器（Multi-User Browser）** 窗口。可以看到已在其他电脑上创建的会话在此列出。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54b84ca8-4784-41b2-889e-e9144b6dc35e/13-session-name-server-name.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54b84ca8-4784-41b2-889e-e9144b6dc35e/13-session-name-server-name.png)
    
2.  选择会话可以看到关于项目的细节和当前连接到会话的人员。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96a86e8b-0045-4dfe-a934-50328f2bd7b5/14-session-details.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96a86e8b-0045-4dfe-a934-50328f2bd7b5/14-session-details.png)
    
    也可将鼠标悬停到任何会话上来查看其细节：
    
    ![Session tooltip](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01b2c5d5-7f95-4cba-bfde-63ab633729de/15-session-details-kursos.png "Session tooltip")
    
3.  在工具栏中点击 **加入所选会话** 图标以加入。（或者也可以双击会话名称。）
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff4600e5-4a1c-4ef4-acdd-c8de25ea1d45/16-join-session.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff4600e5-4a1c-4ef4-acdd-c8de25ea1d45/16-join-session.png)
    

一旦连接，**多用户浏览器（Multi-User Browser）** 窗口就会改变，显示已加入会话的相关细节。此时应看到 *所有* 已连接用户将显示在 **客户端** 列表中，以及共享会话中所有参加者所做更改的历史记录。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/676b0e7f-9385-4755-8ab8-904c5823850c/17-two-pc-session.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/676b0e7f-9385-4755-8ab8-904c5823850c/17-two-pc-session.png)

如已在此会话中工作的任何其他电脑在你加入之前已经对项目中的关卡或资源进行了更改，虚幻编辑器实例将自动从服务器获取这些事务，并将其应用至共享会话工作区的本地视图中。此时只能处理与所有其他参与者相同的一批内容，但是在虚幻编辑器用户界面中可用任何方式对该内容进行操作。可以在不影响其他用户的情况下，进行在关卡视口中移动相机视点、在内容浏览器中浏览新文件夹、切换工具、打开新窗口和面板等操作。

现在，多台电脑已连接至同一会话，我们可以在一台电脑上进行一些更改，并查看这些更改会如何传播至该会话中的其他电脑。

## 6 - 共同工作

现在已有多个用户连接至同一个实时会话中，大家就可以共同构建虚拟世界了。所有人都可以照常处理虚幻引擎项目，但是现在每个人都能立即观察到彼此应用的更改。

欲了解在线工作中的其他细节，请参见[多用户编辑概述](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine)。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7367ec01-2efe-4f84-833b-befb9a5a7d96/18-two-pc-session-example.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7367ec01-2efe-4f84-833b-befb9a5a7d96/18-two-pc-session-example.png)

## 7 - 保存会话更改

此时，你和你的团队可能已经对项目中的某个关卡和某些资源进行了一些更改。但是，这些整改尚未反映至在电脑上组成项目内容的实际文件中。如想保留团队在实时会话中完成的工作，则需要 *保存* 这些更改。也就是说，必须将多用户编辑系统处理的所有事务应用到本地项目文件中。

无论是否正在使用源码管理提供程序，均可使用工具栏中的 **源码管理（Source Control）** 保存更改。

1.  点击工具栏中 **源码管理（Source Control）** 按钮旁边的箭头，然后选择 **保存会话更改（Persist Session Changes）**。
    
    ![Persist Session Changes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49b4b2a3-678c-4565-8728-cfa8d0c40c8d/19-persist-session-changes.png "Persist Session Changes")
2.  在"保存并提交文件（Persist & Submit Files）"窗口中，将看到在实时会话期间修改的所有文件的列表。使用复选框，选出需要应用至本地电脑上项目文件的修改文件。
    
    ![Persist & Submit Files](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d37738a-f807-4e75-b0c9-f1d05701e40e/20-persist-and-submit.png "Persist & Submit Files")
3.  如在启动或加入会话时设置源码管理提供程序，可选择在新的变更列表或修订版中立即将要保留的更改提交回该程序。
    
    如果未选择立即提交，多用户编辑系统将自动从源码管理提供程序迁出修改后的文件，以便将会话中所做的更改应用和保存到电脑上的本地文件。只要愿意，还可进行进一步的修改（在会话中修改，或者在离开会话后脱机修改），然后使用标准源码管理工作流提交所有更改。
    
    如想立即将会话中所做的更改提交至源码管理：
    
    1.  选中窗口底部的 **提交至源码管理（Submit to Source Control）** 选项。
        
        ![提交至源码管理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcfe1e8c-71b0-4cf4-8985-31ed6fc6ccf8/multiuserediting-qs-persist-submitbox.png "Submit to Source Control")
    2.  就像在常规源码管理工作流中一样，必须对所提交的更改设置描述。展开窗口顶部的 **变更列表描述（Changelist Description）** ，并在框中输入描述。
        
        ![Set a changelist description](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca09307b-2ac7-4d86-a047-3e4f889224eb/22-changelist-description.png "Set a changelist description")
    3.  如知道以后需要对提交的文件进行更多修改，可像通常的源码管理工作流一样，选中 **保持文件迁出状态（Keep Files Checked Out）** 选项。
        
        ![Keep Files Checked Out](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc7ef20a-dd1d-4916-89b5-3136b4cdaae9/23-keep-files-checked-out.png "Keep Files Checked Out")
4.  如对要提交的文件列表满意，且已经设置所需的源码管理选项，请点击 **提交（Submit）**。
    
    ![Submit](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddd8f9cd-6ab7-417c-ada2-7e7bbeecbbf0/24-submit-all-files.png "Submit")

与会话的连接不会断开，想工作多久都可以。

## 8 - 清理

现在，你已经将你和团队在实时会话期间对关卡和资源所做的更改应用到了磁盘上的项目中，并选择性地将这些更改提交回源码管理系统，可能已经不再需要会话。可以随时重新加入并重新开始中断的会话。但与在旧的会话中长时间工作相比，定期从更新的变更列表中建立新的编辑会话更为可取。

不再需要会话时，可使用 **多用户浏览器** 将其删除。

只有最初创建会话的用户才能将其删除。其他用户即使参与了该会话，也无法在 **多用户浏览器** 中看到该选项。

1.  如果尚未断开与会话的连接，请断开。（当你与会话保持连接时，无法将其删除。）
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22f5a1f3-dd5a-4fa4-89c7-c418e7d018fe/25-disconnect-session.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22f5a1f3-dd5a-4fa4-89c7-c418e7d018fe/25-disconnect-session.png)
    
    如在工具栏中显示多用户编辑按钮，连接时它会显示 **退出（Leave）**。只要点击它就可以退出会话：
    
    ![Leave the current session from the Toolbar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c326421-e7d0-4264-b00e-f6f0c47391e8/26-leave-session.png "Leave the current session from the Toolbar")
    
2.  断开连接后，在 **多用户浏览器** 中选择会话，并在工具栏中点击 **删除** 图标将它删除。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e31a07dd-9252-492e-8344-4be988d5de59/27-delete-session.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e31a07dd-9252-492e-8344-4be988d5de59/27-delete-session.png)
    
3.  确认删除。
    
    ![Confirm deletion](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23d38ecd-21df-47c3-b07e-646e42f2efe1/28-delete-session-confirmation.png "Confirm deletion")
    
    如有任何其他用户连接至已删除的会话，将会自动断开连接。
    
4.  最后，如知道以后暂时不需重新连接到任何共享会话，可通过在服务器的控制台窗口中按下 **Ctrl+C**，停止服务器。
    
    不要仅关闭控制台窗口。服务器会将其视为异常关机。下次启动服务器时，关闭控制台窗口时仍处于活动状态的会话将自动恢复。
    

现在已回到开始学习本教程时所在之处，但拥有所有用户在共享编辑会话中所做的全部更改。 

## 9 - 自行尝试

如已成功完成上述所有步骤，虚幻编辑器中的实时协作工作流首次体验便已完成。你已经学会如何在多台电脑上设置项目，将这些电脑连接至同一共享编辑会话，并与团队成员一起构建虚拟世界。你可能已经明白了如何在自己的项目团队中、在自己的项目上实施这些工作流。现在将能享受多用户编辑带来的系统即时协作、零迭代时间以及创造性合作的优势。

-   如开始在团队中经常使用多用户编辑系统，可能需要在 **项目设置（Project Settings）** 中设置默认服务器命名和会话命名。此设置完成后，工具栏按钮会更新，显示 **加入（Join）** 而非 **浏览（Browse）**。然后可点击工具栏图标，一键加入默认会话。也可选择在打开项目时自动连接至默认会话。
    
-   如需多个用户同步播放相同的动画，可配置多用户编辑系统同步Sequencer用户界面中的操作，从而实现不同用户操作的同步。每个选择加入同步的用户都需要设置一些控制台命令。
    

欲了解需修改设置的详细信息，请参见[多用户编辑参考](/documentation/zh-cn/unreal-engine/multi-user-editing-reference-for-unreal-engine)。

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [multi-user editing](https://dev.epicgames.com/community/search?query=multi-user%20editing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 启动插件](/documentation/zh-cn/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine#1-%E5%90%AF%E5%8A%A8%E6%8F%92%E4%BB%B6)
-   [2 - 设置多台电脑](/documentation/zh-cn/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine#2-%E8%AE%BE%E7%BD%AE%E5%A4%9A%E5%8F%B0%E7%94%B5%E8%84%91)
-   [3 - 启动服务器](/documentation/zh-cn/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine#3-%E5%90%AF%E5%8A%A8%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [4 - 开始会话](/documentation/zh-cn/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine#4-%E5%BC%80%E5%A7%8B%E4%BC%9A%E8%AF%9D)
-   [5 - 加入会话](/documentation/zh-cn/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine#5-%E5%8A%A0%E5%85%A5%E4%BC%9A%E8%AF%9D)
-   [6 - 共同工作](/documentation/zh-cn/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine#6-%E5%85%B1%E5%90%8C%E5%B7%A5%E4%BD%9C)
-   [7 - 保存会话更改](/documentation/zh-cn/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine#7-%E4%BF%9D%E5%AD%98%E4%BC%9A%E8%AF%9D%E6%9B%B4%E6%94%B9)
-   [8 - 清理](/documentation/zh-cn/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine#8-%E6%B8%85%E7%90%86)
-   [9 - 自行尝试](/documentation/zh-cn/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine#9-%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95)