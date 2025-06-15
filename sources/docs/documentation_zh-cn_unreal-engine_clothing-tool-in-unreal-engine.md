# 虚幻引擎布料工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:48:47.433Z

---

目录

![布料工具](https://dev.epicgames.com/community/api/documentation/image/fe0346ae-b39a-4e14-9121-17ca4243db5b?resizing_type=fill&width=1920&height=335)

虚幻引擎采用Chaos的布料解算器，它是一种底层布料解算器，负责实现布料的粒子模拟。由于我们现在能够直接访问模拟数据，因此此布料解算器可实现轻量化集成，并极具扩展性。

![Unreal Engine uses Chaos Cloth solver which is a low-level clothing solver responsible for the particle simulation that runs clothing](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07fc6ee1-bb7e-4541-b11a-4f2584216e8c/clothing-overview-banner.png)

布料工具在编辑器中可用后，开发人员将能直接使用虚幻引擎来编写内容，而不需要外部依赖项。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c4b4741-ed2d-4500-85c6-f4fa106c1501/new-workflow.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c4b4741-ed2d-4500-85c6-f4fa106c1501/new-workflow.png)

虚幻引擎布料工作流程。点击查看大图。

在这个流程中，你只需一次创建内容，之后的所有编辑工作都可以在虚幻引擎中直接完成。这使得内容的测试和迭代变得更加快速，还能避免因为内容创建和内容使用场景不同而导致的不便，因为你可以在游戏中实时查看布料模拟编辑后的效果。

## 布料绘制流程

当你在编辑器中创建布料时，布料绘制工具允许你快速为角色创建布料并使用骨架网格体现有任意材质元素。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18dade96-a1c7-48b6-8f1f-be2d855abd38/cloth-interface.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18dade96-a1c7-48b6-8f1f-be2d855abd38/cloth-interface.png)

点击查看大图。

1.  **分段选择（Section Selection）-** 选择用于绘制布料的材质ID。
    
2.  **布料绘制面板（Cloth Paint Panel）-** 包含绘制布料需要的所有必要工具和属性。
    

根据以下步骤学习创建布料资产并将其指定给角色的过程，以及在渲染网格体上绘制的基础知识。

### 创建并指定布料资产

要开始使用布料，首先需要在细节级别（LOD）部分中创建布料资产，并将其指定至渲染网格体，以便在其上进行绘制。

根据以下步骤进行学习：

1.  在骨架网格体编辑器中，单击主工具栏上的 **分段选择（Section Selection）** 按钮。你可选择已指定自身材质元素的骨架网格体的不同部分。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7af63eba-88dc-4a50-ad08-6d9a0750633e/cloth-section-selection.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7af63eba-88dc-4a50-ad08-6d9a0750633e/cloth-section-selection.png)
    
    点击查看大图。
    
2.  单击鼠标左键选择要用作布料的网格体部分。然后右键单击打开快捷菜单来创建布料资产。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c10ab47-d36b-4bc7-9049-5550f7ee5977/cloth-asset-context-menu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c10ab47-d36b-4bc7-9049-5550f7ee5977/cloth-asset-context-menu.png)
    
    点击查看大图。
    
3.  在快捷菜单中选择 **在选项中创建布料资产（Create Cloth Asset from Selection）**，然后填写以下菜单区域：
    
    ![The parameters to be filled in when creating a cloth asset from a selection](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0921f76e-af7f-45dc-89a8-53674870ba4e/create-cloth-context-menu.png)
    
    -   **资产名称（Asset Name）** - 为资产命名，便于之后查找。
        
    -   **从网格体移除（Remove from Mesh）** - 若要将几何体的一个单独网格关联为布料，则可启用此项。若不需要，则无需勾选。
        
    -   **物理资产（Physics Asset）** - 若此布料资产用于角色，请使用此处的物理资产以确保布料模拟产生适当的碰撞。
        
    
    等你对设置满意后，点击 **创建（Create）** 按钮。
    
    ![Clicking create after setting the parameters](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e22754b3-e0b7-4ffe-9f44-74502be87298/create-cloth-button.png)
4.  对部分再次右键单击以打开快捷菜单，将光标悬停在 **应用布料资产（Apply Clothing Asset）** 上，然后在可用布料资产中选择需要应用的对象。它会与所选部分创建的布料资产进行关联。
    
    ![Appying a clothing asset using the context menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afb469bf-b014-4132-bf59-a6f5abbd8234/cloth-asset-context-menu-apply.png)

### 在布料上绘制

当你准备好在布料上进行绘制后，你可以使用以下选项开始在所选布料资产上绘制：

-   绘制（Paint）- **鼠标左键**
    
-   擦除（Erase）- **Shift + 鼠标左键**
    
-   布料预览（Cloth Preview）- **H**
    

若你使用过NVIDIA的PhysX DCC插件或其他程序的类似绘制工具，进行3DS Max或Maya的布料创建，那便不会对此操作中的功能按钮感到陌生。

1.  在骨架网格体编辑器中，前往文件菜单并选择 **窗口（Window）**，然后在列表中选择 **布料（Clothing）**。
    
    ![Selecting clothing in the main window's menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9dcd12e1-77e5-43a2-8b12-15ed711a700d/painting-step-1-1.png)
    
    此操作将打开 **布料（Clothing）** 面板。
    
    ![The clothing panel with main parameter categories expanded](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98d829f4-3ae5-4398-9559-56c3b081f1d9/clothing-panel.png)
2.  在 **布料（Clothing）** 面板中，从 **布料数据（Clothing Data）** 列表中选择指定的 **布料资产（Cloth Asset）**。
    
    ![Highlighting the activate cloth paint button in the toolbar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9696540d-6396-475f-bc10-1fdd1b3cad55/activate-cloth-paint.png)
3.  在 **布料（Clothing）** 面板中，在 **布料数据（Clothing Data）** 面板中选择你指定的 **布料资产（Cloth Asset）**。
    
    ![Selecting a cloth asset from the clothing data list](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0cff61c6-35ee-4eb1-8294-cd5080e6014c/painting-step-2.png)
4.  在 **布料绘制（Cloth Painting）** 部分选择要使用的[绘制工具](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E7%BB%98%E5%88%B6%E5%B7%A5%E5%85%B7)类型，然后设置 **绘制值（Paint Value）**（默认使用笔刷绘制工具）。然后单击鼠标左键并在网格体表面拖动以开始绘制。
    
    按住 **H** 键盘快捷键以预览你绘制的布料。
    

## 绘制工具

![The paint tool selection dropdown menu highlighted](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c83e1c29-f99e-4761-aa87-f1a3f9a5d617/paint-tool-selection.png)

利用 **工具（Tool）** 选项，选择可用的笔刷来绘制布料。

-   [笔刷](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E7%AC%94%E5%88%B7)
    
-   [梯度](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E6%A2%AF%E5%BA%A6)
    
-   [平滑](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E5%B9%B3%E6%BB%91)
    
-   [填充](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E5%A1%AB%E5%85%85)
    

### 笔刷

利用 **笔刷（Brush）** 工具在布料资产上进行拖动即可在布料上绘制出半径和强度值。

![The lower part of the clothing panel with a brush selected in the cloth painting section](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aeeff2a9-c8d3-4f5c-8a9d-6f9bdd525f49/cloth-painting-brush.png)

绘制布料时，使用 **绘制值（Paint Value）** 控制笔刷的强度。此数值控制绘制区域近似于布料响应的程度。数值为0时蒙皮顶点无法移动，而数值为100时蒙皮顶点可从原始位置移动1米。

![Painting cloth with the brush](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/776f2180-1346-43c0-97f9-1960ecb2c296/paint-brush.png)

有关该工具及其属性的更多详情，请参阅此处的[笔刷属性](/documentation/404)参考。

### 梯度

利用 **梯度（Gradient）** 工具，你可以在选中的一组布料值之间绘制出渐变混合效果。

![The lower part of the clothing panel with gradient selected in the cloth painting section](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07a37cbf-43b2-4cbc-8d7b-9f3781ba1700/cloth-painting-gradient.png)

绘制梯度需要执行以下步骤：

1.  使用 **鼠标左键** 绘制 **梯度起始值（Gradient Start Value）**。它由已绘制顶点上的 **绿** 点来表示。
    
2.  按住 **Ctrl + 鼠标左键** 绘制 **梯度结束值（Gradient End Value）**。它由已绘制顶点上的 **红** 点来表示。
    
3.  完成绘制后按下 **回车** 键绘制梯度。
    

![An example of a cloth gradient](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d67c6895-cc59-4506-90fc-45527f702056/gradient-example.png)

有关该工具及其属性的更多详情，请参阅此处的[梯度属性](/documentation/404)参考。

### 平滑

利用 **平滑（Smooth）** 工具，可模糊或柔化绘制布料值之间的对比度。

![布料面板的下半部分（布料绘制分段中选中了平滑）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ff36690-b1e3-4050-8ddc-9ccde24801db/cloth_painting_smooth.png)

使用 **强度（Strength）** 值可调整模糊效果的强弱，用于在绘制区域之间创建柔化梯度。

![Using the smooth tool to create a soft gradient between painted areas](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ac24eeb-f68e-4fb2-b49a-8ec21778a567/paint-smooth.png)

有关该工具及其属性的更多详情，请参阅此处的[平滑属性](/documentation/404)参考。

### 填充

利用 **填充（Fill）** 工具，可使用其他数值替代数值相似的区域。

![布料面板的下半部分（布料绘制分段中选中了填充）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efb4ac33-a609-45aa-931b-cda3711c0e50/cloth_painting_fill.png)

使用 **填充值（Fill Value）** 设置填充区域顶点的数值。采样用于替换的顶点时，使用 **阈值（Threshold）** 设置填充操作所用的数值。

![绘制区域（白色）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec1be2da-e1ee-472a-8162-671cef503843/paint-fill-1.png)

![绘制区域 | 填充值1.0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dd5241b-278e-4af6-bf65-4fef3156da35/paint-fill-2.png)

绘制区域（白色）

绘制区域 | 填充值1.0

有关该工具及其属性的更多详情，请参阅此处的[填充属性](/documentation/404)参考。

## 布料属性

利用 **布料配置（Cloth Config）** 属性可调整布料以模拟不同类型的材质，如粗麻布、橡胶，或是其他类型的布料材质。

![布料面板中的布料配置属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e517625-86a9-4710-818b-fb953eb99031/cloth_config.png)

有关布料配置属性的更多详情，请参阅此处的[布料配置属性](/documentation/404)参考。

## 遮罩

**遮罩（Mask）** 是一类参数集，可用于交换布料资产。

![布料面板的遮罩参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dfc98ec-c0ab-4030-bdf7-4ffcbd8afb0a/masks.png)

该参数集代表以下 **目标**（或参数集）：

-   **最大距离（Max Distance）**：布料上的点从其动画位置移动的最远距离。
    
-   **逆止距离（Backstop Distance）**：布料上的点所用偏移，以限制最大距离（Max Distance）内的移动。
    
-   **逆止半径（Backstop Radius）**：与最大距离（Max Distance）相交时，可防止布料上已绘制的点进入该区域的球体半径。
    
-   **动画驱动乘数（Anim Drive Multiplier）**：用于驱动弹簧朝动画设置的位置拉伸布料，使动画师能够控制过场或动画驱动的场景。
    
    -   也可在运行时使用Actor之间的对象来驱动，蓝图可以在骨架网格组件上访问该对象。
        
    -   运行时设置的值与绘制的值相乘组合，得到最终的弹簧和阻尼强度。
        

你可以同时含有多个 **目标**，但一次仅能指定一个。此操作可以非破坏性方式快速测试不同配置。

要创建遮罩并将其指定至目标，请按照以下步骤操作：

1.  点击 **加号** (+)按钮新建空白遮罩。
    
    ![Create a new mask by clicking the plus button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4fb489f-e12a-430c-9d15-e34fce112af5/masks-01.png)
2.  右键单击新遮罩，将光标悬停在 **设置目标（Set Target）** 上，从可用的 **目标（Targets）** 列表中进行选择。
    
    ![Setting a target for a new mask](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c4d2a33-c970-4ea1-bf58-5723bc09da6d/masks-step-202.png)
3.  在遮罩（Mask）窗口中，可看到所选目标已被列为布料资产的活动目标。
    
    ![Active target selected for cloth asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d25d4e7-2fc6-4d93-bcdc-a2cd1dbfa1ec/masks-step-203.png)
4.  也可单击窗口中的默认名称并输入新名称，以重命名该遮罩。
    
    ![Renaming a mask by clicking the default name](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cd4ddf1-ba3e-487e-bd4f-101825ed1ba9/masks-step-204.png)

你还可通过快捷菜单将骨架网格体顶点颜色复制到选定的布料参数遮罩：

![Selecting a vertex color to copy](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f35a571d-d2ac-4478-b935-6dfa7ba6d472/copy-from-vertex-color.png)

有关遮罩的更多详情，请参阅此处的[遮罩属性](/documentation/404)参考。

## 从骨架网格体复制布料

如果有多个相似类型的骨架网格体，例如角色的斗篷，可以使用 **从骨架网格体复制布料（Copy Clothing from SkeletalMesh）** 选项将已经定义好的布料设置复制并导入到另一个骨架网格体，无需重新设置全部参数，节省时间。

![Selecting clothing data to copy using a dropdown menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f05a8e54-2da7-42da-b1ab-8c572e510746/copy-clothing-from-skeletal-mesh.png)

要进行此操作，只需找到 **布料数据（Clothing Data）**，点击 **从骨架网格体复制布料（Copy Clothing from SkeletalMesh）** 并选择要复制器布料数据的骨架网格体即可。

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [cloth](https://dev.epicgames.com/community/search?query=cloth)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [布料绘制流程](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E5%B8%83%E6%96%99%E7%BB%98%E5%88%B6%E6%B5%81%E7%A8%8B)
-   [创建并指定布料资产](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%B9%B6%E6%8C%87%E5%AE%9A%E5%B8%83%E6%96%99%E8%B5%84%E4%BA%A7)
-   [在布料上绘制](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E5%9C%A8%E5%B8%83%E6%96%99%E4%B8%8A%E7%BB%98%E5%88%B6)
-   [绘制工具](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E7%BB%98%E5%88%B6%E5%B7%A5%E5%85%B7)
-   [笔刷](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E7%AC%94%E5%88%B7)
-   [梯度](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E6%A2%AF%E5%BA%A6)
-   [平滑](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E5%B9%B3%E6%BB%91)
-   [填充](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E5%A1%AB%E5%85%85)
-   [布料属性](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E5%B8%83%E6%96%99%E5%B1%9E%E6%80%A7)
-   [遮罩](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E9%81%AE%E7%BD%A9)
-   [从骨架网格体复制布料](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine#%E4%BB%8E%E9%AA%A8%E6%9E%B6%E7%BD%91%E6%A0%BC%E4%BD%93%E5%A4%8D%E5%88%B6%E5%B8%83%E6%96%99)