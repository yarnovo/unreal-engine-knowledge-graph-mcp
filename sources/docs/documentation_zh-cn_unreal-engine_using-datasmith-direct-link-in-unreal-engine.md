# 使用Datasmith Direct Link | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-datasmith-direct-link-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:04:44.376Z

---

目录

![使用Datasmith Direct Link](https://dev.epicgames.com/community/api/documentation/image/a2f5c37e-97f3-449b-bee1-7f5cacb2b05b?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**Datasmith Direct Link** 是许多Datasmith导出程序插件都有的功能，只需按一下按钮，即可在基于虚幻引擎的应用程序（例如 **Twinmotion**）中逐步更新视口。

 

 

![Archicad Direct Link](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28154d4a-2c7b-4a07-bc37-82d36b28c3ea/archicad-directlink.png "Direct Link在Archicad中打开")

![协作查看器Direct Link](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/adf46413-6255-4943-9687-a5976ba95bd5/collab-viewer-directlink.png "DirectLink选项在协作查看器模板中打开")

源应用程序

目标应用程序

借助Direct Link工作流，你可以在一个或多个源应用程序与多个目的地（例如基于虚幻引擎的应用程序或Twinmotion）之间设置Datasmith DirectLink。

![Direct Link图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a8fdad5-a120-4bf2-8070-9f5d44f59ffa/directlink-diagram.png "说明DirectLink如何连接源和目标")

Datasmith Direct Link使多个源应用程序能够连接到一个或多个目的地。

此链接会更新你的虚幻引擎关卡或Twinmotion模型，从而无需在你每次进行更改时从源重新导出 `*.udatasmith` 文件。这样可以更容易近乎实时地更新和可视化3D场景的增量更改。

## 设置Direct Link连接

Datasmith Direct Link工作流的入门首先是，在你的3D应用程序和基于虚幻引擎的应用程序之间创建连接。

1.  为你的应用程序下载并安装合适的Datasmith导出程序插件。你可以在[此处](https://www.unrealengine.com/en-US/datasmith/plugins)下载相应的插件。请参阅[Datasmith软件交互指南](/documentation/zh-cn/unreal-engine/datasmith-software-interop-guides-for-unreal-engine)，详细了解如何在你的应用程序中使用Datasmith导出器插件。
    
    ![Archicad插件安装](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32237641-edc0-48dd-b6e0-666ed8ab032e/archicad-install.png "Archicad插件安装")
    
    安装适用于Archicad的Datasmith导出程序插件。
    
2.  为3D应用程序安装Datasmith导出程序插件后，请确保启用了Datasmith功能。这将视你的应用程序而定。
3.  打开你的目标应用程序，并选择你的3D应用程序作为 **源**。
    
    ![Direct Link目标设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff75a38b-0108-4f5d-90a5-7ab29969e614/directlink-destination-setup.png "设置DirectLink目标")
    
    协作查看器模板中的Datasmith选项面板。
    
    例如，当使用 **协作查看器（Collab Viewer）** 模板在项目设置中运行本地会话时，按住 **空格键** 并选择 **Datasmith** 选项，将一个或多个DirectLink源添加到关卡。请参阅[协作查看器模板快速入门](/documentation/zh-cn/unreal-engine/collab-viewer-template-quick-start-in-unreal-engine)，详细了解协作查看器模板的用法。
    
4.  返回源应用程序，点击与DirectLink同步（Synchronize with DirectLink）按钮，同步DirectLink连接。
    
    ![Archicad工具栏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f47849b7-09e4-4f38-9307-19b63a7a6e59/archicad-toolbar.png "Archicad Datasmith工具栏")
    
    点击与DirectLink同步（Synchronize with DirectLink）按钮，同步应用程序之间的更改。
    

## 在打包项目中使用Direct Link

要在打包项目中使用Direct Link，你还必须为项目的 `.exe` 文件启用UDP消息传输。

1.  在Windows资源管理器或其他文件资源管理器中，打开你的项目文件夹，然后打开 `WindowsNoEditor` 文件夹。
2.  右键单击你的项目的可执行文件，在上下文菜单中选择 **创建快捷方式**。
    
    ![Creating a shortcut to the packaged Unreal Engine project](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16ef6119-4a95-40a4-8d87-ce4a02feb166/create-shortcut.png)
3.  右键单击您创建的快捷方式，并从上下文菜单中选择**属性**。
    
    ![Opening the properties of the newly created shortcut](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9177a679-3ddd-4db0-a6c7-79d8effe9c72/shortcut-properties.png)
4.  在快捷方式的 **属性** 窗口中，在 **目标** 属性中添加 `-messaging` 参数。
    
    就本示例而言，如下所示： `"C:\Users\admin\Documents\Unreal Projects\DirectLinkTest\WindowsNoEditor\DirectLinkTest.exe" -messaging`
    
    ![Adding a parameter to the shortcut's target](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20ac0b6f-035e-43e9-8ae4-dacb9fced00b/target-parameter.png)
5.  点击 **确认（OK）** 保存修改。

## 最终结果

建立DirectLink连接后，你现在只需按一下按钮即可更新虚幻引擎或Twinmotion模型。

![Direct Link示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2167d00-f25f-4e4e-9a75-71345e65c17d/directlink-example.gif "Example of Direct Link working between Archicad 24 and the Collab Viewer template.")

禁用 **在后台时降低CPU用量（Use Less CPU when in Background）** 选项，启用后，如果当前操作的窗口非虚幻引擎窗口，关卡中的Pawn未被持有时，3D视口仍然会更新。此选项位于 **编辑器偏好设置（Editor Preferences）中** 的 **通用（General）>性能（Performance）** 中。

-   [importing](https://dev.epicgames.com/community/search?query=importing)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置Direct Link连接](/documentation/zh-cn/unreal-engine/using-datasmith-direct-link-in-unreal-engine#%E8%AE%BE%E7%BD%AEdirectlink%E8%BF%9E%E6%8E%A5)
-   [在打包项目中使用Direct Link](/documentation/zh-cn/unreal-engine/using-datasmith-direct-link-in-unreal-engine#%E5%9C%A8%E6%89%93%E5%8C%85%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8directlink)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-datasmith-direct-link-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)