# 使用SVN作为版本虚幻引擎的控制软件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-svn-as-source-control-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:34:21.984Z

---

目录

![使用SVN作为版本控制软件](https://dev.epicgames.com/community/api/documentation/image/2645f99b-d9e2-4fb4-b338-c38d6c29b98e?resizing_type=fill&width=1920&height=335)

虚幻引擎已经集成了一个叫做 Subversion 的版本控制软件，或简称 SVN，以便让大家能够在项目上协同工作。版本控制软件能够为团队成员提供一个共享资源和代码的方式，并且还提供了文件的备份以及历史记录查询，这样便能在当有问题发生时将某部分回滚到一个早先的版本上。

## 在虚幻引擎中使用 Subversion（SVN）

如果不选用 Perforce，那么可以使用 Subversion（SVN）。对于用户使用数据的行为上 SVN 和 Perforce 类似。以下的指南将引导如何在虚幻的项目上配置 SVN 为软件版本管理服务。

### 架设 SVN 服务器

要架设一个 SVN 服务器，可以通过 Subversion 的命令行工具来完成，但这里为了方便，我们准备描述如何在 Windows 上使用 VisualSVN 来架设服务器。

可以在 [这里](https://www.visualsvn.com/server/download/) 下载 Windows 版本的 SVN。

### 在本地机器上设置 SVN 服务器

1.  在 SVN 安装完成后，在 VisualSVN 中打开 SVN，在目录树的 **Repositories** 上 **点击右键** 并选择 **Create New Repository**：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ea13cd4-5d8d-4a32-b305-da6002ee5dc9/sc_svn_create_new_repository.png)
2.  如果有此提示，先选择 **Regular Files System**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43cddfa6-62fb-4820-9e7c-31e6f32cbd4c/sc_svn_choose_regualr_file_system.png)
3.  然后为该库（repository）输入一个名字。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/111e6e92-bfae-42d5-a36d-350588f0d894/sc_svn_repository_name.png)
4.  接下来选择是否要在库中添加一些初始目录：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/984545d8-db4d-4cca-ba0b-38b41b38a070/sc_svn_initial_repo_structure.png)

如果要和其他人一起在 C++ 的代码上协同工作，添加 **Trunk**、**Branches** 和 **Tag** 目录会比较有用。初始的安全设置也可以在这时设置。如果不确定该如何设置的话，可以对所有的用户读写权限保留默认设置。完成创建后，就应该能在树形列表中看见新建的库了。

### 局域网的服务器

可以在本地局域网中设置一个服务器便于团队成员协同工作。只需要遵循上述的过程搭建服务并在客户端使用该服务器的连接信息即可。

### 安全访问

很多用户都希望通过安全连接来访问他们的库。这些连接的 URL 地址以 **https://** 作为开头，并且在设置的时候有一些事情需要注意。要使用 HTTPS 的话，服务端需要提供一个受信任的证书，这样客户端便能知道它当前连接的是一个安全的服务器。VisualSVN 可以签发一个本地证书，这样内部用户就能使用安全连接。可以通过在树状视图的根节点 **点击右键** 来查看详细信息，选择 **属性** 并浏览 **证书 Certificate** 分页：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33f5403d-1dde-4ac9-bc61-25f4cdf7349b/sc_svn_certificate.png)

当使用安全连接连接到 SVN 服务器的时候，服务器签发的证书对应的名字必须和用户连接的名字相同。比如，如果用户通过 URL **https://my-server/svn** 来访问服务器，因此这个证书则应该是签发给 "my-server"（去掉引号）的，同样，如果用户是通过 IP 地址 **https://192.168.0.1/svn** 来连接的话，那么证书就应该被签发给 "192.168.0.1"（去掉引号）。

### 云服务商

有一些云服务商提供了 SVN 的云端架设服务以便于远程协作。可以先快速浏览以下搜索引擎中的 SVN Hosting 结果。每个主机服务商都有些不同，但总的来说都是会提供一组验证信息供你连接。查看下面的 从虚幻编辑器中连接 的部分来了解连接到 Perforce 云服务的信息。

### 签出到本地工作拷贝（Working Copy）

要在 SVN 的版本管理下工作，需要设置一个 **Working Copy** 这样文件才能在你本地机器上管理。目前还不能在虚幻编辑器中完成这个设置。可以通过 SVN 的命令行工具来设置，但在我们这里为了方便，我们描述如何在 Windows 的 TortoiseSVN 中设置 Working Copy。

可以在 [这里](http://tortoisesvn.net/) 下载 Windows 版本的 TortoiseSVN。

在创建一个新项目时，可以选择是 C++ 项目还是纯蓝图项目。 如果选择了 C++ 项目，则可以在项目目录中可以看到有 `Source/` 目录。下面这些项目目录初始就应当被添加到版本管理中：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7840d426-daf9-4a75-a8a9-e438acc0898c/sc_svn_added_filese.png)

被高亮为 **绿色** 的目录和文件应该被添加到项目的 Depot 中。Binaries 目录高亮为 **黄色**，可以选择是否要加入到版本管理中，这取决于团队自生的工作需要。如果团队中每个人都准备自己来编译引擎和游戏的话，那么 Binaries 则无需加入到版本管理中，但如果团队中有人只是想获取一个版本就能直接在编辑器中工作的话，则需要把 Binaries 添加上去。

如果在一个其他人已经创建的项目中工作，以下的步骤可以跳过，它们可能并不适用。

要创建 Working Copy，需要先 **Check Out** 库的根目录（假设是空目录）。只需要在 Windows 的资源管理器中在项目目录上 **点击右键** 并选择 **SVN Checkout**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7b9a295-6802-4c6b-81d9-12338028ab82/sc_svn_checkout.png)

输入你的库的 URL 地址以及 checkout 到本地的目录（请确认没有创建出子目录）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/971ed737-5340-4546-9291-34e8471036b7/sc_new_workspace.png)

然后点击 **OK**，在本地的指定目录中会自动创建一个隐藏文件夹 **.svn**，SVN 软件会在其中保存 Working Copy 的相关信息。

### 向 Subversion 添加文件

1.  要想你的库中添加文件的话，在 Windows 的资源管理器中选择要添加的项目，然后 **点击右键** 并选择 **TortoiseSVN->Add** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83a004fc-ae33-44cc-8a5a-f0c18c32a706/sc_svn_add.png)
2.  然后 SVN 将会标记这些选择的文件并准备添加到库中。接下来，**右键点击** 项目目录，并选择 **TortoiseSVN->SVN Commit**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7f07740-fd07-47e4-a81e-ca1cf47017d9/sc_svn_commit.png)
3.  这将会扫描目录中有过变化的文件或者新增的文件，并在提交对话框中显示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36b72275-678a-4d4b-a117-a32eaad0f56f/sc_svn_commit_message.png)
4.  现在可以输入提交的信息，并点击 **OK** 按钮将改动上传到服务器。如果想要在其他人已经开始的项目上工作，则需要通过 TortoiseSVN 工具来从 SVN 上获取最新的版本，只需执行上面的 **SVN Checkout** 的过程，并勾选 **Fully Recursive** 来确保每个子目录中的内容都能得到更新。这将会把所有服务器上存在的文件都下载到本地目录中。
    

### 从虚幻编辑器中连接 Subversion

可以在编辑器中直接连接 SVN 服务器，只需点击 **工具栏** 的 **版本控制** 按钮：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9eee717-fcc6-4c4e-94dc-37a53c510204/sc_svn_connect_from_ue4_1.png)

打开后，选择 **Subversion** 作为软件版本管理软件的提供商，并输入登录验证信息。密码部分可以选填，填了就可以无需每次都输入密码。一旦设置成功，SVN 将会保存这些信息。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c62acb7-9540-4e72-b20f-0d74a3d885c9/sc_svn_connect_from_ue4_2.png)

### 在 Mac OSX 上使用 SVN 以及安全连接

由于 Mac 保存安全信息，比如密码，的方式，可能会在编辑器设置后还需要额外的一些步骤才能正常的连接到诸如 **https://** 的服务器上。 如果看到以下这些错误信息的话，可能需要执行额外的步骤：

```cpp
	E175002: Unexpected HTTP status 400 'Bad Request' on '/projectname/'
	E175002: Unexpected HTTP status 405 'Method Not Allowed' on '/projectname/'
	E215004: Authentication failed and interactive prompting is disabled; see the --force-interactive option
	E215004: No more credentials or we tried too many times.
```

要修复这个，首先打开命令行窗口，并输入：

```cpp
	cd [Engine Installation Directory]/Engine/Binaries/ThirdParty/svn/Mac/bin
```

这样能将当前目录改变到引擎附带的 SVN 执行文件目录下（并不是引擎的安装目录）。

然后输入：

```cpp
	svn info --username=me https://example.com/svn/repo
```

将你的用户名和库的 URL 地址替换上面相应的部分，这时将会提示输入密码：

```cpp
	Authentication realm:
	Password for 'me':
```

输入密码后，将会保存在 keychain 中。然后只要按照上面的正常步骤，编辑器就能正确的连接到服务器了。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [在虚幻引擎中使用 Subversion（SVN）](/documentation/zh-cn/unreal-engine/using-svn-as-source-control-for-unreal-engine#%E5%9C%A8%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E4%BD%BF%E7%94%A8subversion%EF%BC%88svn%EF%BC%89)
-   [架设 SVN 服务器](/documentation/zh-cn/unreal-engine/using-svn-as-source-control-for-unreal-engine#%E6%9E%B6%E8%AE%BEsvn%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [在本地机器上设置 SVN 服务器](/documentation/zh-cn/unreal-engine/using-svn-as-source-control-for-unreal-engine#%E5%9C%A8%E6%9C%AC%E5%9C%B0%E6%9C%BA%E5%99%A8%E4%B8%8A%E8%AE%BE%E7%BD%AEsvn%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [局域网的服务器](/documentation/zh-cn/unreal-engine/using-svn-as-source-control-for-unreal-engine#%E5%B1%80%E5%9F%9F%E7%BD%91%E7%9A%84%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [安全访问](/documentation/zh-cn/unreal-engine/using-svn-as-source-control-for-unreal-engine#%E5%AE%89%E5%85%A8%E8%AE%BF%E9%97%AE)
-   [云服务商](/documentation/zh-cn/unreal-engine/using-svn-as-source-control-for-unreal-engine#%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%95%86)
-   [签出到本地工作拷贝（Working Copy）](/documentation/zh-cn/unreal-engine/using-svn-as-source-control-for-unreal-engine#%E7%AD%BE%E5%87%BA%E5%88%B0%E6%9C%AC%E5%9C%B0%E5%B7%A5%E4%BD%9C%E6%8B%B7%E8%B4%9D%EF%BC%88workingcopy%EF%BC%89)
-   [向 Subversion 添加文件](/documentation/zh-cn/unreal-engine/using-svn-as-source-control-for-unreal-engine#%E5%90%91subversion%E6%B7%BB%E5%8A%A0%E6%96%87%E4%BB%B6)
-   [从虚幻编辑器中连接 Subversion](/documentation/zh-cn/unreal-engine/using-svn-as-source-control-for-unreal-engine#%E4%BB%8E%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E8%BF%9E%E6%8E%A5subversion)
-   [在 Mac OSX 上使用 SVN 以及安全连接](/documentation/zh-cn/unreal-engine/using-svn-as-source-control-for-unreal-engine#%E5%9C%A8macosx%E4%B8%8A%E4%BD%BF%E7%94%A8svn%E4%BB%A5%E5%8F%8A%E5%AE%89%E5%85%A8%E8%BF%9E%E6%8E%A5)

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