# 在虚幻引擎中使用远程会话插件进行iOS开发 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-remote-session-plugin-for-ios-development-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:00:27.958Z

---

目录

![使用远程会话插件进行iOS开发](https://dev.epicgames.com/community/api/documentation/image/273643a3-d740-411e-949b-adf92ec7a19d?resizing_type=fill&width=1920&height=335)

远程会话插件旨在复制与PC连接在同一网络上的iOS设备的输入，以便从编辑器或本地运行的游戏或应用程序的封装版本测试游戏或应用程序。Unreal Remote 2应用程序与远程会话插件配合使用，可以帮助用户测试游戏或应用程序。

## 获取Unreal Remote 2应用程序

1.  转到iOS设备上的应用商店。搜索 **Unreal Remote 2**。点击 **获取（Get）** 下载。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b72ec35-333c-48a2-b592-87dc6c459600/unrealremote_appstore.png)
2.  **Unreal Remote 2** 应用程序将下载并安装到设备上。该设备应连接到与PC相同的网络。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fefd2c42-f478-4970-a644-0979cf3c8dba/unrealremote_installed.png)
3.  在iOS设备上启动该应用程序，输入你的PC的IP地址。然后点击 **连接（Connect）**。
    
    ![UnrealRemote_IPAddress.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3285b110-8929-4c8b-96e4-2bf1a136d83b/unrealremote_ipaddress-opt.png)

## 启用远程会话插件

1.  在虚幻编辑器中，单击 **编辑（Edit） > 插件（Edit > Plugins）**。显示 **插件（Plugins）** 面板。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2c1d4f0-94d1-42b3-b206-041789200cef/editplugins.png)
2.  在左侧导航面板中，向下滚动到 **试验（Experimental）**。找到 **远程会话插件（Remote Session Plugin）**。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10016bba-5473-4f6d-9d96-a842031ad490/enableremotesessionplugin.png) 你也可以在 **搜索（Search）** 栏中输入"remote"来查找插件。
    
    如果使用在搜索栏中输入"remote"的方法，你可能会在搜索结果中看到Slate远程插件。这是版本较旧的插件，不应启用——**仅启用远程会话插件**。
    
3.  选中 **启用（Enabled）** 复选框。将显示一条警告消息，指出你需要重新启动编辑器才能使更改生效。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d9fd436-0ddc-4f05-8146-0556d3fab0f0/enableslateremoteplugin-2.png)
4.  单击 **立即重启（Restart Now）** 来重新启动编辑器。
    
5.  在虚幻编辑器中，单击 **播放（Play）** 按钮上的下拉箭头。这将显示播放状态选项的菜单。选择 **新编辑器窗口（PIE）（New Editor Window，PIE）** 或 **独立游戏（Standalone Game）**。打开一个新窗口。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e6fc5c4-0d9a-4581-b09f-ed6f9b3638ed/enableslateremoteplugin_step5.png)
6.  确保虚幻引擎编辑器是活动窗口。输入管理器将接收来自iOS设备上的Unreal Remote应用程序的交互。以下类别中的所有蓝图节点（以及相应的 C++ API）将返回可用值：
    
    -   接触事件（Touch events）
    -   接触输入（Touch input）
    -   姿势事件（Gesture events）
    -   动作事件（Motion events）
    -   动作值（Motion values）

-   [ios](https://dev.epicgames.com/community/search?query=ios)
-   [slate remote plugin](https://dev.epicgames.com/community/search?query=slate%20remote%20plugin)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [获取Unreal Remote 2应用程序](/documentation/zh-cn/unreal-engine/using-the-remote-session-plugin-for-ios-development-in-unreal-engine#%E8%8E%B7%E5%8F%96unrealremote2%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F)
-   [启用远程会话插件](/documentation/zh-cn/unreal-engine/using-the-remote-session-plugin-for-ios-development-in-unreal-engine#%E5%90%AF%E7%94%A8%E8%BF%9C%E7%A8%8B%E4%BC%9A%E8%AF%9D%E6%8F%92%E4%BB%B6)