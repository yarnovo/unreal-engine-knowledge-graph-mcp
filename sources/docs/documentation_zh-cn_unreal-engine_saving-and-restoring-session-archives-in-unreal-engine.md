# 虚幻引擎会话档案的保存和恢复 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/saving-and-restoring-session-archives-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:34:31.361Z

---

目录

![会话档案的保存和恢复](https://dev.epicgames.com/community/api/documentation/image/0aed56ce-f2b0-42fe-b3d5-31c602428aa5?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

多用户编辑服务器可随时将在单个会话中进行的所有事务保存到磁盘上的档案中。稍后，可使用此档案创建包含所有这些更改的新会话。

本文中的介绍展示如何将会话保存至档案，以及稍后如何将档案恢复到活跃会话中。

将使用 **多用户浏览器** 中的功能按钮完成此操作。可通过在主菜单中选择 **窗口（Window）>开发人员工具（Developer Tools）>多用户浏览器（Multi-User Browser）** 或开启工具栏按钮打开此面板，进行多用户编辑。欲了解更多信息，请参见[快速入门](/documentation/zh-cn/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine)。

## 将会话保存至档案

按照本节中的说明，将活跃会话保存到磁盘上的档案中。

### 步骤

1.  选择要在 **多用户浏览器** 中保存的会话。
    
2.  单击工具栏中的 **档案** 图标，或右键单击会话，然后从快捷菜单中选择 **档案（Archive）**。
    
    ![Archive icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/365aa377-67dd-4b10-8f66-174db23e88a0/01-archive-icon.png "Archive icon")
3.  立即在会话名称的下方，为档案文件设置描述性命名，然后点击复选框图标。
    
    ![Name the session](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b2bd7fe-e5ef-4210-95ff-e08065c6b942/02-archive-name.png "Name the session")

### 最终结果

新档案将出现在会话列表中。它与活跃会话的区别在于使用方框图标和浅灰色文本。

![An archived session in the list of sessions](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5314835-256d-405c-ac17-d2a2b9d4bdf3/03-session-list-new-archive.png "Archived session in the list of sessions")

服务器将会话档案保存在虚幻引擎安装文件夹下的 `Engine\Programs\UnrealMultiUserServer\Saved\MultiUser` 中。

## 恢复已存档会话

按照本节中的介绍将档案恢复到活跃会话中，以便加入该会话并继续编辑。

### 步骤

从档案恢复会话：

1.  确保运行的服务器与用来创建原始会话的服务器相同。每台服务器负责将其会话保存到本地计算机上的档案中。这意味着每台服务器只能恢复其存档的会话。
    
2.  打开最初用于创建会话的项目，并确保该项目内容的状态与存档会话的原始状态相同。
    
    注意：恢复已存档会话时，与加入现有会话一样，磁盘上的项目内容状态必须与最初创建会话时项目内容的状态相同。
    
3.  选择要在 **多用户浏览器** 中恢复的档案。
    
    ![Select an archive in the sessions list](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6455ced4-bdc3-4fd9-8037-d3697a8d039b/04-select-to-restore-archive.png "Select an archive in the sessions list")
4.  点击工具栏中的 **恢复** 图标或双击该档案，或者右键点击该档案，然后从快捷菜单中选择 **恢复（Restore）**。
    
    ![Restore icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6aac9dec-5f56-4ddd-8de5-af4f8a732284/05-restore-icon.png "Restore icon")
5.  设置要从存储在档案中的事务创建的新会话的命名，然后点击复选框图标。
    
    ![Name the new session](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39b08086-8135-4816-94f1-b52e6502db63/06-restored-session-new-name.png "Name the new session")\]
    

### 最终结果

多用户编辑系统会启动属于您的新会话，并立即将您加入该会话。历史记录（History）将显示会话运行期间所有事务的完整记录。工作时，将继续在现有历史上方添加新的事务。

![Restored session](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c83e038a-69bc-4e24-84a0-89d2e8cf867c/07-history-of-sessions.png "Restored session")

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [post processing](https://dev.epicgames.com/community/search?query=post%20processing)
-   [multi-user editing](https://dev.epicgames.com/community/search?query=multi-user%20editing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [将会话保存至档案](/documentation/zh-cn/unreal-engine/saving-and-restoring-session-archives-in-unreal-engine#%E5%B0%86%E4%BC%9A%E8%AF%9D%E4%BF%9D%E5%AD%98%E8%87%B3%E6%A1%A3%E6%A1%88)
-   [步骤](/documentation/zh-cn/unreal-engine/saving-and-restoring-session-archives-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/saving-and-restoring-session-archives-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [恢复已存档会话](/documentation/zh-cn/unreal-engine/saving-and-restoring-session-archives-in-unreal-engine#%E6%81%A2%E5%A4%8D%E5%B7%B2%E5%AD%98%E6%A1%A3%E4%BC%9A%E8%AF%9D)
-   [步骤](/documentation/zh-cn/unreal-engine/saving-and-restoring-session-archives-in-unreal-engine#%E6%AD%A5%E9%AA%A4-2)
-   [最终结果](/documentation/zh-cn/unreal-engine/saving-and-restoring-session-archives-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C-2)