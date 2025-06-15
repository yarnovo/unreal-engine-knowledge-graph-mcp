# 在虚幻引擎中使用代理几何体工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-proxy-geometry-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:02:19.930Z

---

目录

![使用代理几何体工具](https://dev.epicgames.com/community/api/documentation/image/35790f24-22dd-432f-8417-2f50da5012d8?resizing_type=fill&width=1920&height=335)

在下面的教程中，我们将了解如何使用代理几何体工具来为你的UE5项目创建新的静态几何体和纹理。

## 步骤

1.  **代理几何工具（Proxy Geometry Tools）** 是合并Actor工具的一部分，因此，要打开它们，需要前往 **工具（Tools）** 并点击 **合并Actor（Merge Actors）** 选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8df1ca68-b975-4b5f-99f1-d472482881af/01-merge-actors-tool.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8df1ca68-b975-4b5f-99f1-d472482881af/01-merge-actors-tool.png)
    
    点击查看大图。
    
2.  当合并Actor工具打开时，你应该会在顶部看到两个图标。单击第二个图标以显示代理几何体工具的选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4d84adc-9dfe-41c1-8ed7-acc4e85b7dd0/02-merge-actors-panel.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4d84adc-9dfe-41c1-8ed7-acc4e85b7dd0/02-merge-actors-panel.png)
    
    点击查看大图。
    
    代理几何体工具中的选项只有在关卡中选择静态网格体时才会激活。
    
3.  前往关卡中的一个位置，然后开始选择静态网格体。在本例中，选择了21个静态网格体，但请随意选择所需数量的静态网格体。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fabe82f-f6c6-4fb3-96b4-b6d19a39e95b/03-selecting-static-meshes.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fabe82f-f6c6-4fb3-96b4-b6d19a39e95b/03-selecting-static-meshes.png)
    
    点击查看大图。
    
4.  在静态网格体仍被选中的情况下，找到合并Actor（Merge Actors）窗口，然后按 **合并Actor（Merge Actors）** 按钮启动代理几何体工具的创建过程。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/430fbfcd-a88f-4e19-8903-8ad43c5a21ae/04-merge-actors-panel-button.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/430fbfcd-a88f-4e19-8903-8ad43c5a21ae/04-merge-actors-panel-button.png)
    
    点击查看大图。
    
5.  在出现的弹窗中，为代理几何体工具将要创建的新资源指定 **名称（Name）** 和 **位置（Location）**。完成后，点击 **保存（Save）** 按钮继续代理几何体工具的创建过程。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5518ff33-f932-496b-903a-0de1d41e293f/05-creating-static-mesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5518ff33-f932-496b-903a-0de1d41e293f/05-creating-static-mesh.png)
    
    点击查看大图。
    
    代理几何体工具完成所需的时间从几分钟到几个小时不等。当前的进度将在下面的窗口中显示。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b647c151-09a8-4965-b96f-ab558cb84503/06-creating-mesh-proxy.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b647c151-09a8-4965-b96f-ab558cb84503/06-creating-mesh-proxy.png)
    
    点击查看大图。
    
6.  当代理几何体工具完成后，转到内容浏览器，按照步骤5中提供的名称搜索新创建的资产。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03a6e910-7190-4761-a8dc-ef653e59d928/07-newly-created-static-mesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03a6e910-7190-4761-a8dc-ef653e59d928/07-newly-created-static-mesh.png)
    
    点击查看大图。
    

## 最终结果

要查看创建的静态网格体，转到内容浏览器，双击生成的静态网格体。在静态网格体编辑器中查看静态网格体时，请注意三角形和材质数量有所减少。  

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4b6bec3-c30e-47e3-bebc-bb4b6f9010b6/08-the-static-mesh-view.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4b6bec3-c30e-47e3-bebc-bb4b6f9010b6/08-the-static-mesh-view.png)

点击查看大图。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [proxy geometry tool](https://dev.epicgames.com/community/search?query=proxy%20geometry%20tool)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-the-proxy-geometry-tool-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-the-proxy-geometry-tool-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)