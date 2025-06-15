# 使用虚幻编辑器中的版本控制 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-source-control-in-the-unreal-editor
> 
> 生成时间: 2025-06-14T20:33:55.542Z

---

目录

![虚幻编辑器中的版本控制](https://dev.epicgames.com/community/api/documentation/image/f3ebdff3-b577-4a6b-b0b1-7c3e318e6bca?resizing_type=fill&width=1920&height=335)

无论项目选择何种版本控制软件，在虚幻中的用法都是一样的。 下面的教程将会细致的说明虚幻中关于使用版本控制软件需要知道的一切。

## 在虚幻编辑器中的协同工作方式

用虚幻引擎做项目，多人协作非常容易。在下面的章节中，我们来说明一下虚幻编辑器中协同工具如何使用。

### 在虚幻编辑器中签出文件

协作的主要方式是通过 [内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)。所有的版本控制的操作都在文件或者目录的菜单选项中。比如，要 **Check Out** 一个文件（为了把它锁定并编辑）， 在 **内容浏览器** 中对该资源 **点击右键** 并选择 **Check Out** 项目。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5e262cc-cdcc-47e6-a402-9e47ce36d710/sc_ue4_checkout_1.png)

可以通过启用 **当修改资源时提示签出 Prompt for Checkout on Asset Modification**，将编辑器设置为自动签出文件， 并可以通过 **Editor Preferences** -> **Loading & Saving** -> **Source Control** 找到这个选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4576e148-e14c-433b-bd65-e7a8a75f0150/sc_ue4_checkout_2.png)

还可以设置编辑器在第一次保存一个新资源时就自动的将它在版本管理软件上标记为新增文件。可以通过 **Editor Preferences** > **Loading & Saving** > **Source Control** 找到该选项，只需要启用 **Add New Files when Modified**，该选项默认也是打开的。当开始编辑一个素材时，右下角将会有个通知框并询问你是否要签出这些文件。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0b38214-3c32-407e-9876-0addfe877eeb/sc_ue4_checkout_3.png)

这能够直接签出这些素材文件以便编辑它们。如果点击了 **Check-Out** 链接，则能看到这样一个对话框：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50b5ff4b-fe15-475c-bd42-42c351df49a2/sc_ue4_checkout_4.png)

数字

属性名称

描述

1:

**Check Out Selected**

将列表中勾选的文件签出。

2:

**Make Writable**

去掉本地文件的只读标记以便继续编辑。

3:

**Ask Me Later** 继续当前的工作，并晚一些再签出这些文件。

 

如果在 **内容浏览器** 中对一个资源文件 **点击右键**，并选择 **版本控制** 选项时，可以看到该文件可能的几种不同的版本控制的状态。

图标

描述

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6ed67d3-5462-4e10-9838-9e269c7920af/sc_ue4_checkout_check.png)

在列表中勾选的文件迁出。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0879bef-fceb-4bbe-85e6-0e29b4e06130/sc_ue4_checkout_add.png)

在版本控制中标记为新增文件。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dfe7718d-72cf-4dab-ad59-e3b165dd9a2c/sc_ue4_checkout_new_version.png)

版本控制软件中有此文件的更新版本。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c39259f-e52d-427b-a820-4da92e515759/sc_ue4_checkout_file_not_under_source.png)

该文件当前并未在版本控制中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d3bd5b1-cdae-4313-aa6a-6ae1210e75ad/sc_ue4_checkout_by_another_user.png)

当前正被另一用户签出（悬停在资源上能查看谁签出了该文件）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8e6b238-d260-474f-a6d5-03a6b29c3754/sc_ue4_checkout_for_branch.png)

当前正被签出并做分支或拷贝（有些软件能够提供文件拷贝的路径）。

### 提交到版本控制软件中（Submit）

在虚幻引擎中提交到版本管理软件的过程，正如版本管理一样，如果不提交的话，其他用户就无法看到你当前的工作或者新创建的素材。 如果正好做了很多更新变化，或者最近并没有关心本地做了哪些改动，这个工作流程也是很简便的， 只需要在编辑器的 **File** 菜单中选择 **Submit to Source Control** 即可。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b4c02ac-8f44-4728-b92d-7041288e5195/sc_ue4_submit_to_source.png)

这将会扫描本地的项目和引擎的目录，那些做了修改的资源将会被提交，并将会显示一个 **提交文件** 的对话框。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63341e1a-f9b4-48a1-8068-388e9816fe7c/sc_ue4_submit_to_source_cl_description.png)

这时可以填写这次内容变化的描述，并点击 **OK** 就能将这些文件提交（commit/submit）到版本控制软件中。

### 同步文件（Sync）

如果要获得其他人的更新，可以在 **内容浏览器** 的文件或文件夹上 **点击右键**，并选择 **Sync** 选项。当然，也可以在外部软件程序中 **Sync** 这些文件，比如 Perforce（P4V）。然后，建议在使用外部的版本控制软件操作时，应当先关闭编辑器，避免由于编辑器当前打开并锁定文件导致的外部软件的同步过程失败。

当一个文件是 **Out of Sync** 时（比如版本管理软件服务器上有一个比你本地文件更新的文件版本），在 **内容浏览器** 中这个按钮，![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d31adfb-e004-4a28-98c5-091b5c4cc28f/sc_ue4_checkout_new_version.png)， 将会显示在该资源上。

### 新增文件（Adding）

类似于 Check-Out 的过程，可以通过编辑器首选项中的 **Add New Files When Modified** 来自动新增文件到版本控制软件中。

在 **内容浏览器** 中，新增文件会有一个 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae3058ed-6ca1-4a26-9a67-768d13abab2c/sc_ue4_checkout_add.png) 标记并能够被签入，和文件被 Check Out 的行为类似。

### 删除文件（Deleting）

要删除一个已在版本控制软件中的资源要更复杂一些，因为它通常会被其他资源引用到。 如果在 **内容浏览器** 中选择一个文件直接按了 **Delete**（或者通过 **右键** 菜单选择），将会显示以下这个 **Delete Assets** 对话框。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f04d7b77-c338-4fe9-a463-890ffc27d1d9/sc_ue4_delete_assets.png)

编号

名称

描述

1

**Pending Deleted Assets**

这是将要删除的资源。

2

**Assets Referencing the Pending Deleted Assets**

这里显示了那些引用到即将删除资源的资源。

3

**Replace References**

这里可以指定当需要删除的资源被删除后，那些引用它的资源的替换资源。

4

**Force Delete**

这里可以强制删除一个资源。然后这么做一定要非常小心，它可能对项目有很大的负面影响。应该仅作为其他方式都不工作时才用它。

5

**Cancel**

取消删除操作。

一旦选定了如何处理删除的动作，该文件通常会被一个隐藏的 **资源** 替换，该资源叫做 [重定向链接](/documentation/zh-cn/unreal-engine/asset-redirectors-in-unreal-engine)。如果想要清理这些由于删除资源而至的 [重定向链接](/documentation/zh-cn/unreal-engine/asset-redirectors-in-unreal-engine)。如果你想在删除资产时清理重定向器，你可以在 **内容浏览器** 内的某个 **文件夹目录** 上 **点击右键** 并选择 **修复目录的重定向链接 Fix Up Redirectors in Folders**。这将会修复项目中对重定向有引用关系的资源素材，并删除那些重定向链接，并在版本管理软件中标记这些重定向链接文件为删除状态。要提交这个改变的话，仍然需要借助外部工具，比如 P4V 或者 TortoiseSVN 来完成提交。

### 关卡文件

关卡文件可以向其他资源文件一样，通过 **内容浏览器** 来完成版本管理的功能。然而关卡也可以通过 **关卡浏览器** 的菜单来处理， 它有一个 **版本管理** 的子菜单其中包含了版本管理的选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e97fcda-355a-4869-a2c0-56eb0fd765c8/sc_ue4_level_broswer.png)

### 配置文件（.ini）

很多编辑器及项目的配置选项都保存在配置文件中。有些配置文件需要被保存到版本管理中。编辑器提供了一种方法能够签出、签入这些设置以便团队成员之间共享。在 **Edit** > **Project Settings** 可以看到下图的形式。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78ecdce1-31ce-4921-a442-f85f2c2d58e9/sc_ue4_project_description.png)

签出文件能够让这些设置可以被编辑修改。不幸的是现在并没有办法在编辑器中签入这些文件到版本管理软件里。因此还是需要再虚幻编辑器以外的软件，比如 P4V 或者 TortoiseSVN 中完成签入的操作。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [在虚幻编辑器中的协同工作方式](/documentation/zh-cn/unreal-engine/using-source-control-in-the-unreal-editor#%E5%9C%A8%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E6%96%B9%E5%BC%8F)
-   [在虚幻编辑器中签出文件](/documentation/zh-cn/unreal-engine/using-source-control-in-the-unreal-editor#%E5%9C%A8%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E7%AD%BE%E5%87%BA%E6%96%87%E4%BB%B6)
-   [提交到版本控制软件中（Submit）](/documentation/zh-cn/unreal-engine/using-source-control-in-the-unreal-editor#%E6%8F%90%E4%BA%A4%E5%88%B0%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6%E8%BD%AF%E4%BB%B6%E4%B8%AD%EF%BC%88submit%EF%BC%89)
-   [同步文件（Sync）](/documentation/zh-cn/unreal-engine/using-source-control-in-the-unreal-editor#%E5%90%8C%E6%AD%A5%E6%96%87%E4%BB%B6%EF%BC%88sync%EF%BC%89)
-   [新增文件（Adding）](/documentation/zh-cn/unreal-engine/using-source-control-in-the-unreal-editor#%E6%96%B0%E5%A2%9E%E6%96%87%E4%BB%B6%EF%BC%88adding%EF%BC%89)
-   [删除文件（Deleting）](/documentation/zh-cn/unreal-engine/using-source-control-in-the-unreal-editor#%E5%88%A0%E9%99%A4%E6%96%87%E4%BB%B6%EF%BC%88deleting%EF%BC%89)
-   [关卡文件](/documentation/zh-cn/unreal-engine/using-source-control-in-the-unreal-editor#%E5%85%B3%E5%8D%A1%E6%96%87%E4%BB%B6)
-   [配置文件（.ini）](/documentation/zh-cn/unreal-engine/using-source-control-in-the-unreal-editor#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%EF%BC%88ini%EF%BC%89)

相关文档

[

源码管理

![源码管理](https://dev.epicgames.com/community/api/documentation/image/d4b8f2f9-4a27-4f69-89c9-020fda6ce2fd?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/source-control-in-unreal-engine)

[

内容浏览器

![内容浏览器](https://dev.epicgames.com/community/api/documentation/image/133ace36-135f-4673-9d72-c841fdb16066?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)

[

项目设置

![项目设置](https://dev.epicgames.com/community/api/documentation/image/bd3e1a10-f81c-49e4-869d-415d31e3fe52?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/project-settings-in-unreal-engine)

[

配置文件

![配置文件](https://dev.epicgames.com/community/api/documentation/image/eec063ee-d5cb-4c6b-89e9-658109e8962f?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/configuration-files-in-unreal-engine)