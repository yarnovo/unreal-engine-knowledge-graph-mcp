# 虚幻引擎支持多种媒体配置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/supporting-multiple-media-configurations-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:25:14.585Z

---

目录

![支持多种媒体配置](https://dev.epicgames.com/community/api/documentation/image/6a8445c8-40ae-4439-81cc-e8ecac6ea58f?resizing_type=fill&width=1920&height=335)

如果你已遵循[AJA媒体](/documentation/404)或[Blackmagic Design](/documentation/zh-cn/unreal-engine/blackmagic-video-io-quick-start-for-unreal-engine)硬件的快速入门指南进行了操作，那么你已经看到了一种设置媒体输入和媒体采集资源的可能方法，可以将SDI视频源导入和导出你的项目。

但是，你通常需要单个项目来处理多个不同的媒体配置。例如：

-   你可能需要在不同的计算机上处理这个项目，每个计算机都有不同的硬件或不同的连接设置。例如，一台计算机可能有AJA卡，而另一台计算机可能有Blackmagic卡；或者，连接到一台计算机上的端口1的视频源可以连接到另一台计算机上的端口2。
-   你可能需要能够在一台计算机上不同类型的源和输出之间切换项目。例如，你可能想要使用来自SDI连接的实时内容，但是当内容脱机时，则切换到使用磁盘上预先录制的文件作为输入。
-   你可能还需要更改虚幻引擎读取时间码和集中同步其帧率的方式，特别是当你更改到不同的源或输入时。例如，你可能想要仅在使用来自SDI连接的输入内容时锁定虚幻引擎的帧率。 

在类似这些情况下，你不希望每次切换设置时都必须对媒体设置和项目内容进行深入更改。相反，你可以设置多个媒体配置文件，各个配置文件将与媒体输入、输出、时间码提供者和集中同步提供者相关的所有配置设置收集在一起。只需切换到不同的媒体配置文件，就可以立即更改整个媒体输入/输出设置。

## 媒体配置文件和代理的工作原理

媒体配置文件依赖于*代理*资源在两个不同的点之间建立连接：

-   一方面，是你在媒体配置文件中设置的输入和输出配置。
-   另一方面，是这些输入和输出在项目内容中使用或生成的位置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2114b1f1-2b82-4a41-aa86-0f6ae4a2ec25/01-profile-proxy-work_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2114b1f1-2b82-4a41-aa86-0f6ae4a2ec25/01-profile-proxy-work_ue5.png)

下面的列表展示了上图中编号的部分：

1.  你在项目中设置了多个媒体配置文件：一个用于项目需要支持的各个使用场景。每个配置文件包含一个媒体源列表和一个媒体输出列表。你可以设置这些列表来确定你的项目将从何处获取视频输入，以及将采集发送到何处。  
    例如，可以设置一个配置文件从AJA媒体卡获取输入，另一个配置文件从Blackmagic Design卡获取输入，第三个配置文件从磁盘上的文件获取输入。  
    你还可以在单个媒体配置文件中进行混合和匹配。例如，单个媒体配置文件可以同时从文件和SDI内容中获得输入。
2.  当你安装了 **媒体框架工具插件（Media Framework Utilities Plugin）** 时，项目的 **项目设置（Project Settings）** 面板包含类似的输入和输出列表。媒体配置文件的输入列表中的每个编号条目都与项目设置的输入列表中的相同编号匹配，输出列表也是如此。  
    你可以在项目设置中设置这些列表条目，以指向你在项目中创建的代理媒体源或代理媒体资源。
3.  然后，当需要在项目内容中设置媒体源或媒体输出时，你可以随时引用这些代理媒体资源。例如：
    1.  当你设置一个媒体束或媒体播放器时，你将它指向这些媒体代理资源之一，而不是指向直接表示文件、流或SDI输入的媒体源。
    2.  类似地，在设置媒体采集时，将输出发送到代理媒体输出，而不是直接发送到AJA或Blackmagic媒体输出。你可以在如上所示的虚幻编辑器中的 **媒体采集（Media Capture）** 面板中执行此操作，或者在运行时调用 **创建媒体采集（Create Media Capture）** 蓝图节点时执行此操作。如果你在项目设置中设置了输出列表，以包含对相同代理媒体输出的引用，那么采集将被转发到输出，并使用你在媒体配置文件中配置的匹配索引。

代理媒体源和代理媒体输出资源本身不包含任何重要的配置属性。它们只是作为一个通道，用于连接媒体配置文件中设置的输入和输出配置，以及由项目中其他资源实际使用或生成那些输入和输出的位置。

## 选择和保存活动媒体配置文件

每当你的项目在虚幻引擎或虚幻编辑器中加载时，它只能有一个活动的媒体配置文件（或者根本没有）。

当你在虚幻编辑器中打开项目时，你可以使用主关卡编辑器工具栏中的媒体配置文件菜单选择活动的媒体配置文件。

![Selecting the active Media Profile](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/260ffc7a-a770-458a-b3a7-56b35668ac38/profiles-12-selectfileprofile.png "Selecting the active Media Profile")

媒体配置文件是总是保存在虚幻引擎项目中的资源。但是，有关哪个媒体配置文件是活动中的选择将保存在各台计算机上，而不是保存在项目中。这意味着，一旦你在给定的计算机上为给定的项目设置了媒体配置文件，就再也不必更改它了（除非你的媒体硬件或配置发生更改）。

另一方面，当你运行项目的打包版本时，有关哪个媒体配置文件是活动中的选择总是由 **启动媒体配置文件（Startup Media Profile）** 设置决定，你可以在 **插件（Plugins）> 媒体配置文件（Media Profile）** 下的 **项目设置（Project Settings）** 窗口中找到该设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/762f6414-5c24-4293-9d8e-4da6433d2e58/03-startup-media-profile_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/762f6414-5c24-4293-9d8e-4da6433d2e58/03-startup-media-profile_ue5.png)

点击查看大图

## 开始了解媒体配置文件和代理

在这个过程中，我们将设置两个媒体配置文件：一个播放来自本地电影文件的输入，另一个播放来自SDI卡的实时视频源。我们将设置两个独立的媒体束来播放关卡中的视频。最后，我们将使用代理媒体源将输入从媒体配置文件中配置的源重定向到媒体束。

**先决条件**：

-   媒体配置文件和代理资源由 **媒体框架工具（Media Framework Utilities）** 插件提供。你将需要安装这个插件。
-   你还需要遵循[AJA媒体](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine)或[Blackmagic Design](/documentation/zh-cn/unreal-engine/blackmagic-video-io-quick-start-for-unreal-engine)硬件的快速入门指南。

要查看非常类似于下面描述的设置的工作示例，请参阅Epic Games启动器的学习（Learn）选项卡所提供的[**Virtual Studio展示**](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine)。

1.  首先创建代理媒体源资源。在 **内容浏览器（Content Browser）** 中右键单击，从上下文菜单中选择 **媒体（Media）> 代理媒体源（Proxy Media Source）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f05e3e95-d182-43aa-8610-772f9792a848/04-create-proxy-media-source_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f05e3e95-d182-43aa-8610-772f9792a848/04-create-proxy-media-source_ue5.png)
    
    点击查看大图
    
    将新资源命名为 **VideoProxyInA**。
    
2.  重复前面的步骤创建另一个代理媒体源，但将其命名为 **VideoProxyInB**。
    
3.  创建一个新的媒体束资源。在 **内容浏览器（Content Browser）** 中右键单击，选择 **媒体（Media）> 媒体束（Media Bundle）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d5d1659-8836-482b-92ab-bbf35f3b70e4/05-create-media-bundle_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d5d1659-8836-482b-92ab-bbf35f3b70e4/05-create-media-bundle_ue5.png)
    
    点击查看大图
    
    将新资源命名为 **MediaBundleA**。
    
4.  双击新的媒体束资源来编辑它。
    
5.  在 **详细信息（Details）** 面板中，找到 **媒体源（Media Source）** 设置，并从下拉列表中选择 **代理媒体源（Proxy Media Source）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb0a4361-d1d6-4136-b6e7-6023d324e22d/06-select-proxy-media-source_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb0a4361-d1d6-4136-b6e7-6023d324e22d/06-select-proxy-media-source_ue5.png)
    
    点击查看大图
    
6.  展开 **源（Source）** 类别，并将 **代理（Proxy）** 设置为引用前面创建的 **VideoProxyInA** 资源。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bda3523-5ee0-4f09-8e23-f5f3f4acd7a3/07-details-proxy_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bda3523-5ee0-4f09-8e23-f5f3f4acd7a3/07-details-proxy_ue5.png)
    
    点击查看大图
    
7.  重复前面的步骤创建另一个媒体束。这次将它命名为 **MediaBundleB**，并将其源代理设置为引用 **VideoProxyInB**。
    
    这里推荐的资源名称，如VideoProxyInA和MediaProfileA，旨在帮助明确各种资源之间的关系。但是，在你自己的项目中，我们建议使用更能描述媒体代理和媒体束需要处理的内容类型的名称。这些资源名称在你的配置中以及像 **媒体采集（Media Capture）** 窗口这样的地方是可见的，因此理想情况下，它们应该对你项目的整个团队都有意义。
    
8.  从主菜单中，选择 **编辑（Edit）> 项目设置（Project Settings）**。找到 **插件（Plugins）> 媒体配置文件（Media Profile）** 部分，并展开高级选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3e6e8a5-d1e9-4c47-a7b1-89e084826a66/08-project-setting-media-source_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3e6e8a5-d1e9-4c47-a7b1-89e084826a66/08-project-setting-media-source_ue5.png)
    
    点击查看大图
    
9.  向 **媒体源代理（Media Source Proxy）** 列表添加两个条目。将其中一个条目设置为引用 **VideoProxyInA**，另一个设置为引用 **VideoProxyInB**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd5845fa-a3f6-4fae-8229-6f0af9799969/09-add-media-source-proxy_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd5845fa-a3f6-4fae-8229-6f0af9799969/09-add-media-source-proxy_ue5.png)
    
    点击查看大图
    
10.  现在，我们将创建一个名为 **FileProfile** 的新媒体配置文件，它可以从磁盘上的文件中播放视频。有两种方法可以做到这一点：
    -   在 **内容浏览器（Content Browser）** 中右键单击，从上下文菜单中选择 **媒体（Media）> 媒体配置文件（Media Profile）**，然后重命名资源。
        
        [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fe5acd3-64a8-421b-9d48-b86b1dcbe77f/10-create-new-media-profile_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fe5acd3-64a8-421b-9d48-b86b1dcbe77f/10-create-new-media-profile_ue5.png)
        
        点击查看大图
        
    -   从工具栏中的配置文件选择按钮中，选择 **新建媒体配置文件（Create New Media Profile）**，并为新资源设置路径和名称。
        
        ![从工具栏创建新资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc6a93a2-7e0b-4de8-9a55-2a3c1e2b6a23/11-second-option-media-profile_ue5.png "Create the new Asset from the Toolbar")
11.  如果新的媒体配置文件没有自动打开以进行编辑，双击它进行编辑。
    
    找到 **媒体源（Media Sources）** 设置，并向列表添加两个新元素。将列表中的各个条目设置为 **文件媒体源（File Media Source）**，并为每个条目设置不同的 **文件路径（File Path）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/099bd560-3f4c-4f12-aa2a-98cbcafb09ee/12-select-media-sources_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/099bd560-3f4c-4f12-aa2a-98cbcafb09ee/12-select-media-sources_ue5.png)
    
    点击查看大图
    
    如果你需要一些示例视频来测试，可以使用以下这些：[Video1](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/46e93fa4-6d36-4ea4-9a47-be93831a5373/samplevideo.mp4) | [Video2](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/7dcc0b54-aa9c-4c82-89ae-a3b6eae339a6/infiltrator_demo.mp4)
    
12.  重复前面的步骤以创建第二个媒体配置文件，名为 **LiveFeedProfile**，它从连接你计算机的AJA或Blackmagic设备导入视频。例如：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55189b4e-3717-4123-9bc9-7baa271d6aa4/13-black-magic-media-source_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55189b4e-3717-4123-9bc9-7baa271d6aa4/13-black-magic-media-source_ue5.png)
    
    点击查看大图
    
    各个媒体配置文件还提供了设置时间码提供者和集中同步提供者的功能：
    
    ![媒体配置文件中的时间码和集中同步设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b27d5f8-407b-4c59-b5fc-3fa9924477c7/14-blackmagic-timecode-port_ue5.png "Timecode and Genlock settings in the Media Profile")
    
    它们与 **项目设置（Project Settings）** 面板中提供的 **时间码提供者（TimecodeProvider）** 和 **自定义时间步（Custom TimeStep）** 设置具有完全相同的效果。但是，当你在媒体配置文件中设置这些值时，只有当该媒体配置文件处于活动状态时，它们才会覆盖 **项目设置（Project Settings）**。详情请参阅[时间码和集中同步](/documentation/zh-cn/unreal-engine/timecode-and-genlock-in-unreal-engine)。
    
13.  使用工具栏中的配置文件选择按钮选择上面创建的 **FileMediaProfile**。
    
    ![激活FileMediaProfile](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1944744f-4502-4bb0-9907-94a947ca1a8c/15-change-media-profile_ue5.png "Activate the FileMediaProfile")
14.  将你的两个媒体束拖放到关卡视口中。你应该看到它们开始显示从文件加载的视频或通过SDI连接传入的视频。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f218c822-a7f4-4540-8074-fafeb60d19c1/16-add-media-profile-viewport_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f218c822-a7f4-4540-8074-fafeb60d19c1/16-add-media-profile-viewport_ue5.png)
    
    点击查看大图
    
15.  现在，你可以使用工具栏中的媒体配置文件选择工具在两个媒体配置文件之间轻松切换，只需单击一次即可更改媒体源（也可选择更换时间码和集中同步设置）。
    
    ![切换媒体配置文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/763f8113-33c8-4c85-b98d-b27048353792/17-live-feed-profile_ue5.png "Switch Media Profiles")

### 使用代理媒体输出

在这个过程中，我们将扩展上一节中创建的媒体配置文件（Media Profile）设置。我们将在虚幻编辑器（或运行时的虚幻引擎）中采集一个视频源，并将该内容通过代理媒体输出路由到我们在媒体配置文件中定义的输出配置。整个过程与设置媒体源非常相似：创建一个代理资源，更新项目设置以引用代理，并在媒体配置文件中配置实际的输出设备。

1.  首先创建一个代理媒体输出资源。在 **内容浏览器（Content Browser）** 中右键单击，从上下文菜单中选择 **媒体（Media）> 代理媒体输出（Proxy Media Output）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e472ebc-ce21-4e92-97dc-accc2a45b02d/18-create-proxy-media-output_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e472ebc-ce21-4e92-97dc-accc2a45b02d/18-create-proxy-media-output_ue5.png)
    
    点击查看大图
    
    将新资源命名为 **VideoProxyOut**。
    
2.  从主菜单中，选择 **编辑（Edit）> 项目设置（Project Settings）**。找到 **插件（Plugins）> 媒体配置文件（Media Profile）** 部分，并展开高级选项。
    
    ![媒体配置文件的项目设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f182d19c-5224-421f-b971-18bd40e56ae9/19-add-ouput-proxy_ue5.png "Project Settings for Media Profiles")
3.  向 **媒体输出代理（Media Output Proxy）** 列表添加一个条目，并将其输出代理设置为指向 **VideoProxyOut**。
    
    ![设置媒体输出代理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ed98605-af05-4ce7-b35d-60782ade6330/20-video-proxy-out_ue5.png "Set the Media Output Proxy")
4.  双击你在上一节中创建的 **LiveFeedProfile**，并将一个新条目添加到 **媒体输出（Media Output）** 列表中。将其设置为将视频源发送到连接到你计算机的AJA或Blackmagic设备上的端口。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3172c18-1244-4b0c-954b-68ea3036e434/21-add-new-entry_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3172c18-1244-4b0c-954b-68ea3036e434/21-add-new-entry_ue5.png)
    
    点击查看大图
    
5.  从主菜单选择 **窗口（Window）> 媒体采集（Media Capture）**。
    
6.  如果需要，向 **视口采集（Viewport Capture）** 列表添加一个新条目，并将其 **媒体输出（Media Output）** 设置为指向你的 **VideoProxyOut** 资源。
    
    ![在媒体采集中设置代理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2aac3d4f-21e0-4bcd-b3fe-3fa36c869b1a/22-new-entry-viewport-captures_ue5.png "Set the Proxy in the Media Capture")
7.  单击 **采集（Capture）** 开始采集内容，并通过代理将其发送到你的AJA或Blackmagic设备。
    
    ![开始从虚幻编辑器采集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e29959d-ea3c-4663-8b34-1f5d3336fe94/23-capture-button_ue5.png "Start capturing from the Unreal Editor") 
    
    如果你此时将当前媒体配置文件切换到 **FileVideoProfile**，则采集将停止，因为 **FileVideoProfile** 的 **媒体输出（Media Outputs）** 列表中没有为条目0配置输出。
    
8.  要在运行时采集视频源并通过代理发送它，请完全遵循[AJA媒体](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine)或[Blackmagic Design](/documentation/zh-cn/unreal-engine/blackmagic-video-io-quick-start-for-unreal-engine)硬件的快速入门指南进行操作。 唯一的区别是，你使用要将采集发送到的 **ProxyMediaOutput** 的对象引用，而不是使用一个作为 **AjaMediaOutput** 或 **BlackmagicMediaOutput** 的对象引用变量。然后使用这个 **ProxyMediaOutput** 变量作为 **创建媒体采集（Create Media Capture）** 节点的输入。例如：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43d7f138-433c-4dc8-825e-585f6a355fa8/24-blueprint-setting_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43d7f138-433c-4dc8-825e-585f6a355fa8/24-blueprint-setting_ue5.png)
    
    点击查看大图
    

### 最终结果

现在已经设置了两个不同的媒体配置文件，每个配置文件都有自己的输入和输出内容配置。它们都使用媒体代理资源将这些输入和输出配置映射到使用或生成这些视频源的其他媒体框架资源。此示例配置可能与你的实际使用场景不匹配。但是，在完成了它的设置步骤之后，你应该对如何扩展相同的基本功能来满足自己的需求有了较好的了解。

-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [professional video](https://dev.epicgames.com/community/search?query=professional%20video)
-   [guide](https://dev.epicgames.com/community/search?query=guide)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [媒体配置文件和代理的工作原理](/documentation/zh-cn/unreal-engine/supporting-multiple-media-configurations-in-unreal-engine#%E5%AA%92%E4%BD%93%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%92%8C%E4%BB%A3%E7%90%86%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)
-   [选择和保存活动媒体配置文件](/documentation/zh-cn/unreal-engine/supporting-multiple-media-configurations-in-unreal-engine#%E9%80%89%E6%8B%A9%E5%92%8C%E4%BF%9D%E5%AD%98%E6%B4%BB%E5%8A%A8%E5%AA%92%E4%BD%93%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
-   [开始了解媒体配置文件和代理](/documentation/zh-cn/unreal-engine/supporting-multiple-media-configurations-in-unreal-engine#%E5%BC%80%E5%A7%8B%E4%BA%86%E8%A7%A3%E5%AA%92%E4%BD%93%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%92%8C%E4%BB%A3%E7%90%86)
-   [使用代理媒体输出](/documentation/zh-cn/unreal-engine/supporting-multiple-media-configurations-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%BB%A3%E7%90%86%E5%AA%92%E4%BD%93%E8%BE%93%E5%87%BA)
-   [最终结果](/documentation/zh-cn/unreal-engine/supporting-multiple-media-configurations-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)