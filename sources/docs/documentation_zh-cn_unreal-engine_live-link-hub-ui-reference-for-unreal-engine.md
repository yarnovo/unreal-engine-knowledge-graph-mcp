# 面向虚幻引擎的Live Link Hub UI参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:07:37.387Z

---

目录

![Live Link Hub UI参考](https://dev.epicgames.com/community/api/documentation/image/4cfd9c15-a511-4863-96ef-77c3ba46a64d?resizing_type=fill&width=1920&height=335)

本参考资料介绍Live Link UI中每个面板的布局和功能

## Live Link Hub UI

![Live Link Hub主UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/498d750b-0c79-442a-944b-ca0e687b1bb5/image_0.png)

1.  **源（Sources）** ：点击单个源，将在下面的源细节（Source Details）面板中加载细节。
    
2.  **源细节（Source Details）**
    
3.  **主题列表（Subject List）** ：点击以突出显示单个主题，将在下面的主题细节面板中加载细节。
    
4.  **主题细节（Subject Details）** ：使用此面板通过 **转换器** 、 **预处理器** 和 **重映射器** 修改主题的数据。
    
5.  **客户端（Clients）** ：点击以突出显示某个源，将在下面的面板中列出细节。
    
6.  **客户端细节（Client Details）** ：一个只读列表，包含客户端的IP地址、主机名、UE项目名称，以及首次连接到Live Link Hub时打开的关卡。
    
7.  **录制（Record）** 按钮
    
8.  **时间码（Timecode）** 选项
    
9.  **设置（Settings）** 和 **插件（Plugins）** 对话框
    

## 主题细节

### 出站名称

你可以修改主题的名称。修改后的出站名称将是已连接客户端收到的名称。

![出站名称字段](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9354208-abc9-4545-9b4c-b390c7884851/image_1.png)

### 转换器

转换器可以用来将动画角色数据转换为变换角色数据，反之亦然。

"动画到变换 (Animation to Transform)"这种方式允许你从动画角色的层级中选择一个骨骼，并仅流送该骨骼的变换。变换角色可以供Live Link控制器和蓝图使用。

![动画到变换转换器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/325fafd1-5789-4394-8610-b999b77fa51c/image_2.png)

示例转换器从骨架中提取"臀部"变换，并将其转换为Live Link变换

"变换到动画"会获取一个变换，并将其重新格式化为一个骨骼层级。动画角色可以供动画实例使用

![变换到动画转换器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1cf375f-7bfa-4393-a0c0-50f03b0f4b04/image_3.png)

示例转换器会获取一个变换源，并将其重新格式化为一个骨骼"根"动画角色。

### 预处理器

预处理器可用来修改流经角色的所有数据。你可以交换坐标轴、添加世界空间偏移和/或旋转。

![预处理器交换坐标系](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4726eb82-6d55-45a2-aef6-37041ed5641b/image_4.png)

预处理器示例展示将右手坐标系切换为UE的左手坐标系。

### Live Link重映射器

Live Link重映射器是仅代码资产，可以让插件开发者像使用UE中的ULive LinkRetarget和ULive LinkRemap资产一样重映射数据。开发者可以为用户提供骨骼名称重映射和转换功能（例如将四元数旋转转换为欧拉旋转）。

![选择Live Link重映射器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b73a197-dd3c-4aa3-aff5-afe5f268e4c3/image_5.png)

## 客户端

客户端是Live Link Hub在当前会话中正在连接的或已连接的虚幻引擎会话。你可以前往 **添加引脚（Add Client）** 按钮添加客户端。点击突出显示客户端并按键盘上的删除键，即可删除客户端。

![在客户端面板添加客户端](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2fb592a-d3cf-4c65-9a30-d2d975207a40/image_6.png)

## 虚拟主题

虚拟主题允许你将两个或多个主题的数据合并为一个主题，以便在虚幻引擎中使用。

要创建一个虚拟主题，请转到 **添加源（Add Source）** ，然后选择 **添加虚拟主题（Add Virtual Subject）** 。

### 附件

`LiveLinkHubAnimationVirtualSubject` 可以用来合并骨骼数据，并使用 **附件（Attachments）** 在层级中重设骨骼的父级。

要创建附件，请在 `LiveLinkHubAnimationVirtualSubject` 的细节中向附件数组添加一个条目：

![添加条目至附件数组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ce4f1d8-476b-4d25-b5ad-5ffa607b4ccd/image_7.png)

在此条目中，你必须定义要附加到的父主题和骨骼、要附加的子主题和骨骼，以及所需的偏移量。

如果你的系统有独立的动作捕捉手套和身体硬件，你可以使用附件将这两个主题合并为一个主题，并将其应用到虚幻引擎中的骨骼网格体上。

![独立的身体和手部动作捕捉](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4f00735-e992-47cf-8b92-1358fe744667/image_8.png) ![Mocap combined using attachments](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8165e139-9ef5-41a5-bff7-8d328723126b/image_9.png)

你需要一个与合并的骨架层级兼容的骨架。

## 同步父级

在源上，你可以设置同步父级，这将对来自该源的所有数据重新定时。例如，这意味着你可以获取一个60fps的源，并将其重新定时为30fps。同步父级的帧率将定义源的所有主题的帧率。

![使用24 fps默认帧率且无时间码同步主题](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd21503e-50b0-4db9-8758-99b10646a2fb/image_10.png)

此Rokoko主题的默认帧率为24fps，没有嵌入时间码。

![同步使用嵌入的时间码重新定时的主题](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a1bcee1-bbb1-4a4a-bdb8-eba23709fbba/image_11.png)

UE中的同一主题，其帧率已重新定时，且嵌入了时间码。

## 时间码

时间码下拉菜单允许你从常见速率列表中选择时间码速率。你也可以将单个主题设置为你的时间码源。选择"启用时间码源（Enable Timecode Source）"，将确保所有连接客户端的时间码提供程序被覆盖，此选项会使Live Link Hub成为连接客户端的时间码源。

![从下拉菜单中选择时间码](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f7e0a1b-f412-44c5-be0f-5936b4f39687/image_12.png)

## 插件

许多第三方动作捕捉硬件制造商发布了Live Link插件。这些插件（可以加载到虚幻引擎项目中）也可以供Live Link Hub访问。

你通过Fab获取的插件会安装在以下位置：

```cpp

…/Engine/Plugins/Marketplace/…

```

如果你正在使用UEFN或将插件安装在了非默认位置，你可以按照以下步骤将插件加载到Live Link Hub中：

1.  打开 **插件浏览器（Plugin Browser）** 窗口。
    
2.  点击 **插件目录（Plugin Directories）**
    
3.  在 **用户插件目录（User Plugin Directories）** 数组中添加一个条目。该条目应指向包含你要访问的插件的文件夹。
    
    将仅加载带有`"SupportedPrograms": [ "Live Link Hub" ]`属性的插件。
    
4.  重启Live Link Hub。
    
5.  插件的源可以通过 **添加源（Add Source）** 按钮获取。
    
    ![添加源下拉菜单中可用的插件源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb52248c-a562-485a-ba63-468115b9b1da/image_13.png)

外部目录列表保存在一个INI文件中，位置如下：

```cpp

%LocalAppData%\UnrealEngine\LiveLinkHub\Config\LiveLinkHubPlugins.ini

```

## 保存的配置

Live Link Hub允许用户保存源、主题和客户端的状态。要加载之前保存的配置，请转到 **文件（File）** > **打开配置...（Open Config…）**

要保存配置，请前往 **文件（File）** > **保存配置（Save Config）** 。

选择 **新配置（New Config）** 将清除所有源、主题和客户端，就像应用程序刚刚启动一样。

Live Link Hub配置存储为 `.json` 文件。这种文件人工可读，可以在文本编辑器中打开和编辑。

## Live Link Hub设置

要访问Live Link Hub的设置，前往 **设置（Settings）** 按钮，并从下拉菜单选择设置。

## 录制Live Link数据

Live Link Hub允许你录制原始数据流，以便轻松回放。此功能旨在作为防止数据丢失的保障措施，并简化动作捕捉流程的QA，无需为QA和开发任务运行所有硬件。

### 录制

按下录制按钮即可开始录制。再次按下此按钮即可结束录制。

### 命名令牌

保存时，系统会提示你输入文件名。要自动填充此文件名，你可以设置一个文件名模板。转到 **设置（Settings）** > **Live Link Hub** 。在模板部分，你可以定义一个字符串来生成文件名。

会话名称、场记板名称和镜头试拍在UI的顶部栏中定义

![定义文件名模板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de7aaa31-4631-4e62-953f-111f2dee9d4f/image_14.png)

### 播放

要播放录制内容，前往 **播放（Playback）** 选项卡。双击录制即可加载。你当前的所有源将暂时被删除，并替换为录制内容中的虚拟化源和主题。

录制（Recording）面板底部的播放功能按钮提供了播放、暂停和推移的功能。

你可以使用右键菜单复制、重命名录制文件，以及打开录制文件在磁盘上的存储位置。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [live link](https://dev.epicgames.com/community/search?query=live%20link)
-   [animation tool](https://dev.epicgames.com/community/search?query=animation%20tool)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Live Link Hub UI](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#livelinkhubui)
-   [主题细节](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E4%B8%BB%E9%A2%98%E7%BB%86%E8%8A%82)
-   [出站名称](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E5%87%BA%E7%AB%99%E5%90%8D%E7%A7%B0)
-   [转换器](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E8%BD%AC%E6%8D%A2%E5%99%A8)
-   [预处理器](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8)
-   [Live Link重映射器](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#livelink%E9%87%8D%E6%98%A0%E5%B0%84%E5%99%A8)
-   [客户端](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E5%AE%A2%E6%88%B7%E7%AB%AF)
-   [虚拟主题](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E8%99%9A%E6%8B%9F%E4%B8%BB%E9%A2%98)
-   [附件](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E9%99%84%E4%BB%B6)
-   [同步父级](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E5%90%8C%E6%AD%A5%E7%88%B6%E7%BA%A7)
-   [时间码](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E6%97%B6%E9%97%B4%E7%A0%81)
-   [插件](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E6%8F%92%E4%BB%B6)
-   [保存的配置](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E4%BF%9D%E5%AD%98%E7%9A%84%E9%85%8D%E7%BD%AE)
-   [Live Link Hub设置](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#livelinkhub%E8%AE%BE%E7%BD%AE)
-   [录制Live Link数据](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E5%BD%95%E5%88%B6livelink%E6%95%B0%E6%8D%AE)
-   [录制](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E5%BD%95%E5%88%B6)
-   [命名令牌](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E5%91%BD%E5%90%8D%E4%BB%A4%E7%89%8C)
-   [播放](/documentation/zh-cn/unreal-engine/live-link-hub-ui-reference-for-unreal-engine#%E6%92%AD%E6%94%BE)