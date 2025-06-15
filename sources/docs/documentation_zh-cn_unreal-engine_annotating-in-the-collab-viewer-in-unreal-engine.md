# 在虚幻引擎协作查看器（Collab Viewer）中进行注释 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/annotating-in-the-collab-viewer-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:43:05.337Z

---

目录

![在协作查看器（Collab Viewer）中进行注释](https://dev.epicgames.com/community/api/documentation/image/4bd7ebd3-46bc-4e37-8e24-bb52df3e584b?resizing_type=fill&width=1920&height=335)

当你与其他参与者在协作类视图中操作时，注释便于你快速做记录。 你可以在任意水平或垂直平面上编写或绘制注释。

## 在桌面模式下添加注释

### 绘制笔划

要用激光笔绘制笔划，请执行以下步骤：

1.  启动或加入团队协作视图，并移至要注释区域旁边的位置。
    
2.  按 **空格键** 打开交互菜单，高亮显示 **注释（Annotation）**，然后选择 **绘制笔划（Paint Stroke）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76c30ea9-7767-4cbe-9ea3-68e62eed05f3/interaction-menu-annotation-paint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76c30ea9-7767-4cbe-9ea3-68e62eed05f3/interaction-menu-annotation-paint.png)
    
    点击查看大图。
    
3.  正对要绘制的区域，使用鼠标左键来绘画。开始绘画时，你绘画的表面的边缘会高光下显示。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3dc3ab6-a423-4db2-b9f4-a2818c6da833/annotating-vertical.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3dc3ab6-a423-4db2-b9f4-a2818c6da833/annotating-vertical.png)
    
    点击查看大图。
    
4.  每次单击并释放按钮时，都会创建一个新的笔画。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a718776-2772-429d-b49d-0e5b491ed931/annotating-horizontal.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a718776-2772-429d-b49d-0e5b491ed931/annotating-horizontal.png)
    
    点击查看大图。
    

### 文字注释

要添加文字注释，请执行以下步骤：

1.  启动或加入团队协作视图，并移至要注释区域旁边的位置。
2.  按 **空格键** 打开交互菜单，高亮显示 **注释（Annotation）**，然后选择 **文字注释（Annotate Text）**。
    
    ![交互菜单文字注释](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2f9e13a-ab14-4960-828a-57ccf94da071/annotate-text-standard-1.png)
3.  正对要添加文字的区域，点击鼠标左键。一个空白的2D标签将会连接到光标所在的几何体。每点击一次便会创建一个新的标签。
    
    ![放置文字注释标签](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/792a6867-9114-49b8-8cbf-6bd0264b59ab/annotate-text-standard-2.png)
4.  可以选择单个标签来用键盘输入文本。
5.  可以选择标签上或者连接到几何体上的黄色圆圈来移动标签。
    
    ![移动文字注释标签](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6916003d-1fa5-4092-8db0-5bf52435fa07/annotate-text-standard-3.png)

## 在VR模式下进行注释

### 绘制笔划

要用控制器绘制笔划，请执行以下步骤：

1.  启动或加入团队协作视图，并移至要注释区域旁边的位置。
    
2.  从工具栏中选择 **VR模式（VR mode）** 或者按下键盘上的 **P** 键来激活VR模式。
    
    ![选择VR模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90f30929-9220-4665-888e-a9c06620d172/selectvrmode.png)
3.  用VR控制器打开交互菜单：:
    -   **Oculus Touch:** 按下右控制器的A按钮或者左控制器的X按钮来打开菜单。
    -   **Valve Index 控制器:** 按下任意控制器的A按钮来打开菜单。
    -   **HTC Vive 控制器:** 按下任意控制器的菜单按钮来打开菜单。
4.  在交互菜单中，用光标高亮显示 **注释（Annotation）> 绘制笔划（Paint Stroke）**，然后用扳机确认选择。
    
    ![VR模式中的交互菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2578fbb-9ec9-43cd-a128-ae6bb8fbb0a2/interaction_menu_vr.png)
5.  按右控制器上的扳机进行绘制，然后释放触发器以终止笔划。
    
    ![VR模式中绘画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ad3f4a6-83b2-456f-acf8-a008fc53edec/painting_vr.png)

### 文字注释

要用控制器添加文字注释，请执行以下步骤：

1.  启动或加入团队协作视图，并移至要注释区域旁边的位置。
    
2.  从工具栏中选择 **VR模式（VR mode）** 或者按下键盘上的 **P** 键来激活VR模式。
    
3.  用VR控制器打开交互菜单：:
    -   **Oculus Touch:** 按下右控制器的A按钮或者左控制器的X按钮来打开菜单。
    -   **Valve Index 控制器:** 按下任意控制器的A按钮来打开菜单。
    -   **HTC Vive 控制器:** 按下任意控制器的菜单按钮来打开菜单。T
4.  在交互菜单中，用光标高亮显示 **注释（Annotation）> 文字注释（Annotate Text）**，然后用扳机确认选择。
    
    ![VR模式交互菜单文字注释](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c64e36d-42db-4fad-a459-caf0285cd423/text_interaction_menu_vr.png)
5.  按下控制器上的扳机来在光标指示的位置放置标签。每按下一次扳机就会创建一个新的标签。
    
    ![VR模式放置文字标签](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9367a335-6ae2-4fd3-b917-ec2df2e37a88/text_annotation_vr.png)
6.  可以选择单个标签来用虚拟键盘输入文本。
    
    ![用VR键盘添加文字注释](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c4c378a-b463-4a02-a386-a53d01c7955d/text_vr_keyboard.png)
7.  可以选择标签上或者连接到几何体上的黄色圆圈来移动标签。

## 删除注释

### 绘制笔划

要删除绘制的笔划，请执行以下步骤：

1.  打开交互菜单。
    
2.  高光显示 **注释（Annotation）**，然后选择 **删除笔划（Delete Stroke）**。
    
3.  将激光指向笔划，然后选中它进行删除。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b78ec6a-fb99-4697-8b5f-10f85dfe9d19/annotation-delete.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b78ec6a-fb99-4697-8b5f-10f85dfe9d19/annotation-delete.png)
    
    点击查看大图。
    

### 文字注释

要删除文字注释，请执行以下步骤：

点击想要删除标签上的X按钮。光标移至该按钮上时按钮会变红，用来指示哪个标签将被删除。

![删除文字注释](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fda8b67b-0866-4024-b8b5-73dabcce4552/delete-text-annotation.png)

-   [collaboration](https://dev.epicgames.com/community/search?query=collaboration)
-   [templates](https://dev.epicgames.com/community/search?query=templates)
-   [collab viewer](https://dev.epicgames.com/community/search?query=collab%20viewer)
-   [design review](https://dev.epicgames.com/community/search?query=design%20review)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [在桌面模式下添加注释](/documentation/zh-cn/unreal-engine/annotating-in-the-collab-viewer-in-unreal-engine#%E5%9C%A8%E6%A1%8C%E9%9D%A2%E6%A8%A1%E5%BC%8F%E4%B8%8B%E6%B7%BB%E5%8A%A0%E6%B3%A8%E9%87%8A)
-   [绘制笔划](/documentation/zh-cn/unreal-engine/annotating-in-the-collab-viewer-in-unreal-engine#%E7%BB%98%E5%88%B6%E7%AC%94%E5%88%92)
-   [文字注释](/documentation/zh-cn/unreal-engine/annotating-in-the-collab-viewer-in-unreal-engine#%E6%96%87%E5%AD%97%E6%B3%A8%E9%87%8A)
-   [在VR模式下进行注释](/documentation/zh-cn/unreal-engine/annotating-in-the-collab-viewer-in-unreal-engine#%E5%9C%A8vr%E6%A8%A1%E5%BC%8F%E4%B8%8B%E8%BF%9B%E8%A1%8C%E6%B3%A8%E9%87%8A)
-   [绘制笔划](/documentation/zh-cn/unreal-engine/annotating-in-the-collab-viewer-in-unreal-engine#%E7%BB%98%E5%88%B6%E7%AC%94%E5%88%92-2)
-   [文字注释](/documentation/zh-cn/unreal-engine/annotating-in-the-collab-viewer-in-unreal-engine#%E6%96%87%E5%AD%97%E6%B3%A8%E9%87%8A-2)
-   [删除注释](/documentation/zh-cn/unreal-engine/annotating-in-the-collab-viewer-in-unreal-engine#%E5%88%A0%E9%99%A4%E6%B3%A8%E9%87%8A)
-   [绘制笔划](/documentation/zh-cn/unreal-engine/annotating-in-the-collab-viewer-in-unreal-engine#%E7%BB%98%E5%88%B6%E7%AC%94%E5%88%92-3)
-   [文字注释](/documentation/zh-cn/unreal-engine/annotating-in-the-collab-viewer-in-unreal-engine#%E6%96%87%E5%AD%97%E6%B3%A8%E9%87%8A-3)