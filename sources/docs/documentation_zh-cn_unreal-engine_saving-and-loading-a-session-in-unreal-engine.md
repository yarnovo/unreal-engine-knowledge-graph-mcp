# 在虚幻引擎中保存和加载会话 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/saving-and-loading-a-session-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:43:06.513Z

---

目录

![保存和加载会话](https://dev.epicgames.com/community/api/documentation/image/ac530f27-0444-4cf7-8061-89978c5cc87f?resizing_type=fill&width=1920&height=335)

协作视图的主讲者和其他参与者可保存注释、测量值、**X射线** 透明状态以及 **变换** 所移动的项目的位置。

## 保存会话

要保存会话，选择 **保存（Save）** 按钮，输入会话名称，然后按Enter。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0c52d6c-7165-4235-b0e6-7a7669503b7d/01-save-button_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0c52d6c-7165-4235-b0e6-7a7669503b7d/01-save-button_ue5.png)

点击查看大图。

每个参与者将会话保存在协作视图会话包的本地副本中。 会话保存在 `YourProjectName/Saved/SaveGames` 子文件夹中。

不会保存您与其他参与者的当前位置和旋转。

不能修改已保存的会话，也不能使用现有已保存会话的名称。

在VR模式下无法保存和恢复会话。

## 加载会话

要加载已保存的会话，选择 **保存（Save）** 按钮旁边的菜单，然后选择会话。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9dc8cb0-3375-4334-bbfd-b60cb2f63e9f/02-load-session_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9dc8cb0-3375-4334-bbfd-b60cb2f63e9f/02-load-session_ue5.png)

点击查看大图。

会话列表包括您保存的会话，以及当前连接的任何其他参与者保存的会话。

## 虚幻编辑器中的加载状态

现在你可以直接在编辑器中重新加载保存过的状态。

1.  复制 **.sav文件**（代表你想重新加载的状态）以及应用程序 Saved/SaveGames 目录中的 **MainSaveGame.sav** 文件，拷贝到项目中的同一目录。
    
2.  在编辑器中，打开 **CollaborativeViewer > Blueprints > Tools** 文件夹，选择 **Editor\_CollabViewerUtility\_BP**。点击右键并选择 **运行编辑器实用工具控件（Run Editor Utility Widget）**。
    
3.  会出现一个包含默认状态选择器的控件，你现在可以在下拉列表中选择一个复制状态。
    
4.  你可能需要在视口中移动摄像机来刷新参数。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9d3d910-dc3b-4b46-8609-0cd17de7f4c3/03-load-states_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9d3d910-dc3b-4b46-8609-0cd17de7f4c3/03-load-states_ue5.png)

Click for full image.

-   [collaboration](https://dev.epicgames.com/community/search?query=collaboration)
-   [templates](https://dev.epicgames.com/community/search?query=templates)
-   [collab viewer](https://dev.epicgames.com/community/search?query=collab%20viewer)
-   [design review](https://dev.epicgames.com/community/search?query=design%20review)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [保存会话](/documentation/zh-cn/unreal-engine/saving-and-loading-a-session-in-unreal-engine#%E4%BF%9D%E5%AD%98%E4%BC%9A%E8%AF%9D)
-   [加载会话](/documentation/zh-cn/unreal-engine/saving-and-loading-a-session-in-unreal-engine#%E5%8A%A0%E8%BD%BD%E4%BC%9A%E8%AF%9D)
-   [虚幻编辑器中的加载状态](/documentation/zh-cn/unreal-engine/saving-and-loading-a-session-in-unreal-engine#%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E7%9A%84%E5%8A%A0%E8%BD%BD%E7%8A%B6%E6%80%81)