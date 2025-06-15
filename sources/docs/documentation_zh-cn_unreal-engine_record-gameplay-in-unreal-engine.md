# 虚幻引擎中录制Gameplay | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/record-gameplay-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:14:35.823Z

---

目录

![使用镜头试拍录制器](https://dev.epicgames.com/community/api/documentation/image/be112e39-c416-4f35-8588-b44e92d9384e?resizing_type=fill&width=1920&height=335)

使用镜头试拍录制器，能快速迭代录制性能并快速查看之前虚拟制造工作流的镜头。 可轻松录制与关卡角色关联的动作捕捉中的动画及未来播放的Live Link实际数据。通过录制镜头并将其添加到Sequencer中，可轻松适应各种大小和数量的镜头制作。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9dc6fb18-069f-4a03-aa0c-1ddd1f359f97/takerecorder.png)

镜头试拍录制器的常见用法是与[Live Link](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine)一起在项目中使用。利用镜头试拍录制器可快速录制性能，因此更新并迭代之前镜头的简单方法便是使用Live Link。

本教程将使用Live Link和面部AR采样。若想学习本教程，参阅[面部AR采样文档](/documentation/zh-cn/unreal-engine/face-ar-sample-in-unreal-engine)，了解设置编辑器和Live Link的方法。

## 使用镜头试拍录制器

连接建立后，即可使用镜头试拍录制器捕捉序列。

确保启用镜头试拍录制器插件。导航到"编辑（Edit）> 插件（Plugins）"并搜索镜头试拍录制器即可完成操作。

1.  在虚幻引擎项目中,导航到 **窗口（Window）** > **镜头试拍录制器（Take Recorder）**。
    
2.  在世界大纲视图中选择Actor。在镜头试拍录制器中，选择 **+源（+ Source）> 来自Actor（From Actor）> 添加"Actor名称"（Add 'Actor Name'）**。
    
    ![adding_a_source_from_actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d602ce72-6fda-4b34-896c-372de89a1d02/source2_callout.png)
3.  在列表中选择Actor。在Actor设置下，将 **录制类型（Record Type）** 改为适当设置。
    
4.  选择 **播放（Play）**，然后选择镜头试拍录制器中的红色录制按钮。录制将在Sequencer中显示实时数据，可在视口中查看实时动作捕捉。
    
    ![record_button_callout](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/947afdfd-24cc-4680-9fcc-c45ed1414ef6/record_button_callout.png)
5.  完成录制后，点击镜头试拍录制器中的停止按钮。
    

重复此过程即可按需录制镜头。

## 组织和查看镜头试拍

完成录制后，可通过两种方式查看Sequencer中的镜头。首先，可选择 **查看上一录制（Review the Last Recording）** 图标（带眼睛的软盘）查看刚刚录制的镜头。 利用此操作可在Sequencer中查看录制的轨迹。若镜头不合需重新录制，可选择 **返回至待定镜头（Return Back to the Pending Take）** 箭头图标切回录制模式。

![PendingTake_callout](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88461a15-cf4e-48bf-bd8b-73403a4c4572/pendingtake_callout.png)

要查看镜头，在镜头试拍录制器中选择 **镜头浏览器（Take Browser）** 图标。之后会单独弹出窗口标签，其中包含内容浏览器中所有镜头的文件夹。镜头浏览器使用镜头试拍录制器用户设置中保存的位置。

![Browse_callout](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a59090b-658d-42a2-86ca-e80c8e10008c/takebrowser.png) ![Content_Browser_with_takes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42ea2b9f-bcba-4eea-9234-e17df83a7103/takebrowser2.png)

默认保存位置位于 **动画（Cinematics）> 镜头（Takes）** 下。要更改内容浏览器中的默认保存位置，选择镜头试拍录制器的 **设置（Settings）** 图标。在 **用户设置（User Settings）** 下，将 **预设保存位置（Preset Save Location）** 改为新位置。

![TR_settings_callout](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55c3850e-b490-45aa-b703-e19cef192633/record_settings.png) ![TR_User_Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c36c223-7e98-49db-881b-a5738ebd72e9/usersettings_callout.png)

要查看序列，在内容浏览器中双击文件。可以其他序列的相同方式播放该序列。

![Playback_example_with_two_actors](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bc9dff3-bada-40df-b10e-e5f1b53f55a2/playback_example2.png)

同时具有各序列的指定元数据，将鼠标悬停在内容浏览器中的序列上，即可查看。同时可使用列视图类型查看元数据。

![Example_of_take_metadata](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d59a4f9c-79aa-4171-81a4-5b569c5aa086/metadata_hover.png)

## 使用分层镜头试拍录制

利用分层镜头试拍录制，可向现有序列添加额外录制轨迹。此操作在序列中使用多个actor的动作捕捉时尤为有效。

1.  使用"Actor A"，按需录制首个镜头。然后，选择上一或最佳镜头，并选择 **查看上个录制（Review the Last Recording）** 切换到查看模式。
    
2.  在查看模式下，选择隔板图标 **以此镜头为基础开始新录制（Start a new recording using this Take as base）**。
    
    ![Clapboard_icon_callout](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e4096a7-328a-4c8f-86e2-f9b6d4157d8d/layertake.png)
    
    将切回录制模式，可在Sequencer中查看来自Actor A的镜头。
    
3.  添加第二个Actor即"Actor B"的新 **源**。点击开关按钮禁用"Actor A"。
    
    ![disable_actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c67bc7f8-d069-415f-b919-7caa30e399d6/disable_actor.png)
4.  使用Actor B录制镜头。录制完成后，选择 **查看上个录制（Review the Last Recording）** 以同时播放录制并预览镜头。 本例将Actor A在视口中隐藏以录制Actor B。可根据录制内容选择是否进行隐藏。
    

可按需录制镜头，并将其堆叠为单个序列。完成后，整个序列将保存为单个文件，各镜头将保存在子文件夹中。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [live link](https://dev.epicgames.com/community/search?query=live%20link)
-   [take recorder](https://dev.epicgames.com/community/search?query=take%20recorder)
-   [ar](https://dev.epicgames.com/community/search?query=ar)
-   [motion capture](https://dev.epicgames.com/community/search?query=motion%20capture)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用镜头试拍录制器](/documentation/zh-cn/unreal-engine/record-gameplay-in-unreal-engine#%E4%BD%BF%E7%94%A8%E9%95%9C%E5%A4%B4%E8%AF%95%E6%8B%8D%E5%BD%95%E5%88%B6%E5%99%A8)
-   [组织和查看镜头试拍](/documentation/zh-cn/unreal-engine/record-gameplay-in-unreal-engine#%E7%BB%84%E7%BB%87%E5%92%8C%E6%9F%A5%E7%9C%8B%E9%95%9C%E5%A4%B4%E8%AF%95%E6%8B%8D)
-   [使用分层镜头试拍录制](/documentation/zh-cn/unreal-engine/record-gameplay-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%88%86%E5%B1%82%E9%95%9C%E5%A4%B4%E8%AF%95%E6%8B%8D%E5%BD%95%E5%88%B6)