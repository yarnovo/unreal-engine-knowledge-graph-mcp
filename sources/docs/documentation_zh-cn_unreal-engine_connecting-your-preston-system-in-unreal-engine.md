# 通过虚幻引擎连接你的Preston系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/connecting-your-preston-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:08:49.596Z

---

目录

![连接你的Preston系统](https://dev.epicgames.com/community/api/documentation/image/19ffa597-c700-4b31-b346-4d5c33e603dd?resizing_type=fill&width=1920&height=335)

## 步骤

如果你要将Preston系统用于制片摄像机，请执行以下步骤。

在本示例中，Preston MDR单元需要将序列输出转换到以太网。这是使用Tibo序列到以太网转换器执行的。此以太网连接需要位于虚幻引擎所在的相同网络上。其他硬件设备也可用于流送Preston数据。请咨询相关插件的供应商，或设置是否使用不同的设备发送Preston数据。

1.  点击 **设置（Settings）> 插件（Plugins）**，打开 **插件菜单（Plugins Menu）**。点击 **虚拟制片（Virtual Production）** 类别并搜索 **LiveLinkPrestonMDR** 插件。
    
    ![打开插件菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14bbe116-60cb-4d91-85ee-1338a406ace8/cc-pluginmenu1.png)
2.  启用该插件，然后点击消息窗口上的 **是（Yes）**。点击 **立即重启（Restart Now）** 以重启编辑器。
    
    ![启用Preston插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/863681fa-02f9-44a7-afaf-2da679257eeb/ccs-preston0.png) ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5cf19a2-1cb9-4672-9690-85baca3347ab/ccs-restarteditor.png)
3.  编辑器完成加载后，转到 **Live Link** 窗口并点击 **\+ 源（+ Source）> PrestonMDR**。输入 **Tibo的IP地址** 和 **端口号1001**，然后点击 **确定（OK）**。
    
    ![添加Preston主题](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/820eb280-e7d1-44da-96e0-1b3894acc969/ccs-preston1.png)
4.  从列表选择Preston主题，并将 **传入数据模式（Incoming Data Mode）** 下拉菜单设置为 **校准后的数据（Calibrated Data）**。
    
    ![选择校准后的数据](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3eaaf30-841a-412b-9837-57e788493e35/ccs-preston2.png)
5.  选择带有绿色圆圈的Preston MDR设备。打开 **查看选项（View Options）** 下拉菜单并将设置更改为 **显示帧数据（Show Frame Data）**。这将显示Live Link数据。
    
    ![查看选项：显示帧数据](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c2e0f7c-41df-45fb-b29d-d85e1d163c64/ccs-preston2a.png)
6.  更改Preston手动单元上的聚焦和光圈，以查看"光圈"和"对焦距离"的值如何变化，并验证这些值是否匹配摄像机上的值。
    
7.  在 **世界大纲视图（World Outliner）** 窗口中选择你的 **电影摄像机Actor（CineCamera Actor）**，然后转到 **细节（Details）** 面板。选择你的 **Live Link控制器（Live Link Controller）** 组件，然后向下滚动到 **Live Link** 分段。点击 **主题表示（Subject Representation）** 下拉菜单，然后选择你的Preston主题。
    
    ![选择你的Preston主题](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee2b4a9f-3bdd-4661-ba89-e97265d3bc55/ccs-preston3.png)
8.  向下滚动到 **摄像机校准（Camera Calibration）** 分段，然后点击 **镜头文件（Lens File）** 下拉菜单。选择你的摄像机的镜头文件。
    
    ![选择你的Preston主题](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9af90f6-3ec4-45d8-a61d-fabc8b71d815/ccs-preston4.png)
9.  将 **聚焦方法（Focus Method）** 设置从 **手动（Manual）** 更改为 **禁用（Disabled）**。这将阻止CG电影摄像机上的焦点发生变化，因为焦点是由物理摄像机通过使用Live Link虚拟主题手动输入的值控制的。
    
    ![将](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db6251e6-3d6b-4a11-b537-c5818b2ed437/ccs-preston5.png)

#### 结果

在本指南中，你使用Live Link设置并连接了Preston MDR，以将聚焦、光圈和变焦流送到连接到UE中电影摄像机的镜头文件。

-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [in-camera vfx](https://dev.epicgames.com/community/search?query=in-camera%20vfx)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/connecting-your-preston-system-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [结果](/documentation/zh-cn/unreal-engine/connecting-your-preston-system-in-unreal-engine#%E7%BB%93%E6%9E%9C)