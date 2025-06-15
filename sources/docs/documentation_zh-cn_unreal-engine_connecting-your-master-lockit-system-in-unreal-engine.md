# 通过虚幻引擎连接你的Master Lockit系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/connecting-your-master-lockit-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:08:15.054Z

---

目录

![连接你的Master Lockit系统](https://dev.epicgames.com/community/api/documentation/image/772f7c8f-1f7e-4401-b09c-b1583c465523?resizing_type=fill&width=1920&height=335)

## 步骤

在本分段中，你将通过使用Live Link的Ambient Master Lockit Plus设备连接智能镜头。

制片摄像机上的智能镜头将连接到Master Lockit Plus，并且Master Lockit Plus将通过以太网连接到虚幻引擎工作站网络。

1.  点击 **设置（Settings）> 插件（Plugins）**，打开 **插件菜单（Plugins Menu）**。点击 **虚拟制片（Virtual Production）** 类别并搜索 **LiveLinkMasterLockit** 插件。
    
    ![打开插件菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0395a885-d405-4a69-96c0-67a4826012de/cc-pluginmenu1.png)
2.  启用该插件，然后点击消息窗口上的 **是（Yes）**。点击 **立即重启（Restart Now）** 以重启编辑器。
    
    ![添加Master Lockit](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a60fd842-4e1b-4f5f-a90f-af1ef58708c2/ccs-lockit0.png) ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5737ed08-0d19-4ac7-8c31-4e95eaa92348/ccs-restarteditor.png)
3.  编辑器完成加载后，转到 **Live Link** 窗口并点击 **\+ 源（+ Source）> MasterLockit**。输入 **Master Lockit的IP地址**，然后点击 **确定（OK）**。
    
    ![添加Master Lockit](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f1e03d2-1b3e-420f-8c00-c6cc655fe4f4/ccs-lockit1.png)
4.  选择窗口中的 **Master Lockit设备（Master Lockit Device）** 并点击 **查看选项（View Options）**，然后选择 **显示帧数据（Show Frame Data）**。确认 **Live Link** 分段中的值正确更新。
    
    ![显示帧数据](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/752e2a8a-bec2-49a5-86e2-fa5681960924/ccs-lockit2.png)
5.  在 **世界大纲视图（World Outliner）** 窗口中选择 **电影摄像机Actor（CineCamera Actor）**，然后转到 **细节（Details）** 面板。选择 **Live Link控制器（Live Link Controller）** 组件，然后向下滚动到 **Live Link** 分段。点击 **主题表示（Subject Representation）** 下拉菜单，然后选择你的 **Master Lockit设备（Master Lockit Device）**。
    
    ![将Master Lockit设备添加到主题表示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40a9ad35-2461-4c2c-8eee-69d964167163/ccs-lockit3.png)
6.  选择 **摄像机组件（Camera Component）**，然后向下滚动到 **焦点设置（Focus Settings）**。验证更改物理摄像机上的焦点和光圈是否更新了 **电影摄像机Actor（CineCamera Actor）** 中的相同设置。
    
7.  将 **聚焦方法（Focus Method）** 设置从 **手动（Manual）** 更改为 **禁用（Disabled）**。这将阻止CG电影摄像机上的焦点发生变化，因为焦点是由物理摄像机控制的
    
    ![将](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67745c3d-b098-4a2d-8578-075740c01c5a/ccs-preston5.png)

#### 结果

在本指南中，你使用Live Link连接了你的Master Lockit设备，并从制片摄像机上的智能镜头流送了聚焦、光圈和变焦。

-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [in-camera vfx](https://dev.epicgames.com/community/search?query=in-camera%20vfx)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/connecting-your-master-lockit-system-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [结果](/documentation/zh-cn/unreal-engine/connecting-your-master-lockit-system-in-unreal-engine#%E7%BB%93%E6%9E%9C)