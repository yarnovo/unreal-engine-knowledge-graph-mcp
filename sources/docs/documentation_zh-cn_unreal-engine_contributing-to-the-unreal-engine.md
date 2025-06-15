# 为虚幻引擎贡献代码 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/contributing-to-the-unreal-engine
> 
> 生成时间: 2025-06-14T19:39:20.466Z

---

目录

![为虚幻引擎贡献代码](https://dev.epicgames.com/community/api/documentation/image/eeddab35-49e5-426e-9c54-9735870861a5?resizing_type=fill&width=1920&height=335)

如果你在 **虚幻引擎（UE）** 源代码中修复了某个漏洞或者增加了某项新功能，你可以将改动内容贡献给 **Epic Games**，以便将其发布进下一个版本的虚幻引擎中。

多年来，我们已经从社区收到了成千上万条贡献。加入贡献团队有很多好处，例如：

-   如果你的修复内容和新功能被合并到源代码仓库中，你等于已经获取了虚幻引擎的最新改动内容。你不必再研究如何将本地更改内容与新版本的引擎源码合并，也不必担心你的自定义修复内容无法编译、或者在并入最新的引擎代码后无法按照预期工作。
    
-   改进虚幻引擎和编辑工具有助于在更大范围上加强虚幻社区，反过来促使你的知识和技能更有价值。
    
-   如果我们接受了你提交的改动，我们会在版本说明中将你列为贡献者，并列出你的姓名和GitHub用户名（Github handle）。
    

我们使用GitHub的拉取请求（Pull Request）机制来管理、追踪和评估提交。本页面将介绍你在上手前所需了解的一切内容。

## 制定提交计划

在 **GitHub** 中创建拉取请求很简单，但如果要让我们轻松评估你的内容并快速合并到我们的仓库中，你就要事先制定好计划。

如果你想加大被接受的概率，同时避免额外的工作或改动，请遵循以下建议。

-   **突出重点。** 理想情况下，每个拉取请求都应该修复一个特定的bug，或者添加一项独立的功能。你的拉取请求可能涉及对多个文件的更改，也可能由任意数量的提交组成，但所有这些更改都应该是为了实现单个目标。  
    如果你想要同时贡献多个内容，请创建多个拉取请求。对我们来说，验证和引入多个单独的请求比将一个大型提交分解为几个单独的组成部分更容易。
    
-   **从主分支开始。** 虽然我们可以合并你在其他分支上所做的更改，但最好先是从 **主** 分支（甚至可以是原始的Unreal Geams仓库）创建一个新的、干净的分支，然后进行改动。
    
-   **确保通用。** 虚幻引擎和编辑工具用于各行各业之中，并且几乎可以用于所有的实时项目之中。当你设计一项新功能时，重要的是让它尽可能通用，这样它才能为尽可能多的用户服务。请不要假设你的功能只适用于某种游戏玩法或内容。
    
-   **遵循我们的代码标准。** [虚幻引擎代码规范](/documentation/zh-cn/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine)介绍了我们自己在编写代码时会尽量遵守的规范。请在提交的代码中尽量遵守这规范。如果你不这样做，我们可能需要更长的时间来集成你的修复内容，或者我们可能会要求你重新提交拉取请求以便符合规范。
    
-   **详细描述你的改动。** 请提前思考如何以最佳方式告诉我们你的改动目的。不要等到在GitHub上填写拉取请求表单时才思考你的想法。  
    如果你的改动内容是修复某个bug，那么我们该如何重现这一bug？我们如何判断你的改动是否解决了问题？为什么选择这种方法而不是其他可能的修复方法？ 如果你想添加一项新功能，那么它适合哪些人群使用？它应该如何工作？它完全是你自己的工作成果，还是源自其他产品或其他开发人员的工作？ 
    

请记住，我们无法保证一定会接受你的提交内容，哪怕你满足了所有条件。负责审核提交内容的Epic工程师通常对即将到来的开发计划、可能受影响的其他引擎子系统或插件、第三方考虑事项等都有深入的了解。如果他们确定由于某种原因我们不能接受你的提交，他们会在拉取请求对话中告知你原因。

## 设置你的分支

请使用以下步骤将你的改动应用到你的Fork中的新分支中。

1.  更新你的Fork中的主分支，让它与Epic Games虚幻引擎原始仓库中的主分支的最新内容保持同步。  
    详情请参阅[与Epic的最新改动保持同步](/documentation/zh-cn/unreal-engine/updating-to-the-latest-changes-from-epic-in-unreal-engine)。
    
2.  在你的Fork中，基于主分支创建一个新的分支来保存你的更改。你可以在GitHub页面上对Fork执行此操作，也可以在本地计算机上使用Git命令行工具或任何可视化Git工具执行此操作。
    
3.  如有必要，在本地计算机上从你的Fork获取（fetch）最新的更改，然后检出你的新分支。
    
4.  在虚幻引擎源代码的本地副本中进行更改。
    
5.  编译虚幻引擎并进行测试，确保你已经修复了漏洞或者你的功能能正常运行。
    
    请不要跳过这一步！你可能会对这一步不以为然，尤其是当你的修复工作很简单时。但要记住，主分支会频繁收到更新请求，其中任何一个更新都可能会对你原来的改动产生扰动。
    
6.  将你的更改提交到本地分支，然后将其提交（push）到你的GitHub仓库。
    

## 开始拉取请求（Pull Request）

一旦你在你的Fork的新分支中做出了更改，你可以在GitHub网站上创建一个新的拉取请求，要求我们将这些更改合并回虚幻引擎的原始仓库中。

1.  在网页浏览器中，访问[github.com](http://www.github.com)并打开你的仓库主页。  
    网页格式通常为 `https://github.com/<username>/UnrealEngine`，其中 `<username>` 为你的GitHub用户名。
    
2.  你可能会看到一条通知，显示你的新分支最近被改动过了。如果是这样，你可以点击绿色的 **比较和拉取请求（Compare & pull request）** 按钮。
    
    ![比较和拉取请求](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14bc2793-0b1d-481c-83e6-86b9dc8c7b60/contributing-github-1-recent.png "Compare and pull request")
    
    如果不是这样的，从 **分支（Branch）** 下拉列表中选择包含更改的分支，然后点击 **新建拉取请求（New Pull Request）**。
    
    ![新建拉取请求](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2eaf04ab-1a4e-4e42-aa07-56279bd4899d/contributing-github-2-new-pr.png "New pull request")
3.  在打开拉取请求（Open a Pull Request）页面上，点击 **基础（base）** 下拉列表并选择 **主（master）** 分支。你可以用这种办法来选择将改动合并到哪个分支中。
    
4.  选择版本分支后，你应该会看到，你的分支 **能够合并（Able to merge）** (1)，页面底部的提交列表(2)应该仅包含你在你的分支中所做的更改。
    
5.  你可以利用这个机会来告诉我们所需了解的一切信息，包括你的改动目的和改动范围。请为你的拉取请求编写一段简短描述，并在文本框中提供更为详细的信息。
    
6.  当你觉得已经向我们提供了所有和改动有关的必要信息后，请点击 **创建拉取请求（Create pull request）**。
    

你会跳转到一个和你的拉取请求有关的新页面，该页面分配了一个唯一编号。你可以在这里编辑标题或描述，或者在对话历史记录中添加新的注释。如果你对你的自定义分支进行更多提交，那么你的拉取请求也会自动更新，以便包含新的改动。

如果想要以后能快速回到这里，你可以：

-   将该URL保存为书签，或者
    
-   找到Epic Games虚幻引擎仓库页面上的[拉取请求](https://github.com/EpicGames/UnrealEngine/pulls)选项卡。你可以使用 **过滤器（Filters）** 下拉列表轻松地在列表中找到你创建的拉取请求。
    

## 后续步骤

Epic的工程团队将尽快评估你的拉取请求，但是你的工作还没有完成。

我们后续可能会问你一些问题，或者要求你做一些额外改动。如果是这样，我们将通过你的拉取请求的对话（Conversation）选项卡与你沟通。请密切关注你的拉取请求，或者订阅GitHub网站的电子邮件通知，这样你就能避免错过我们的消息。

如果我们将你的修复内容合并到了我们的仓库中，你的拉取请求会被设置为 **关闭（Closed）**，而不是 **已合并（Merged）**。这很正常，也在意料之中。集成你的更改的提交通常会标记你的拉取请求，这样就会有你的贡献记录。

-   [github](https://dev.epicgames.com/community/search?query=github)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [制定提交计划](/documentation/zh-cn/unreal-engine/contributing-to-the-unreal-engine#%E5%88%B6%E5%AE%9A%E6%8F%90%E4%BA%A4%E8%AE%A1%E5%88%92)
-   [设置你的分支](/documentation/zh-cn/unreal-engine/contributing-to-the-unreal-engine#%E8%AE%BE%E7%BD%AE%E4%BD%A0%E7%9A%84%E5%88%86%E6%94%AF)
-   [开始拉取请求（Pull Request）](/documentation/zh-cn/unreal-engine/contributing-to-the-unreal-engine#%E5%BC%80%E5%A7%8B%E6%8B%89%E5%8F%96%E8%AF%B7%E6%B1%82%EF%BC%88pullrequest%EF%BC%89)
-   [后续步骤](/documentation/zh-cn/unreal-engine/contributing-to-the-unreal-engine#%E5%90%8E%E7%BB%AD%E6%AD%A5%E9%AA%A4)

相关文档

[

合并Epic的最新更新内容

![合并Epic的最新更新内容](https://dev.epicgames.com/community/api/documentation/image/5f013208-3200-4180-b85c-12372b1aa4dc?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/updating-to-the-latest-changes-from-epic-in-unreal-engine)