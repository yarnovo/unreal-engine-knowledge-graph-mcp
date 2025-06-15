# 虚幻引擎材质实例编辑器用户界面 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui
> 
> 生成时间: 2025-06-14T19:26:23.903Z

---

目录

![材质实例编辑器用户界面](https://dev.epicgames.com/community/api/documentation/image/50b5a003-5a90-4dbb-9fda-01bba58a2902?resizing_type=fill&width=1920&height=335)

材质实例编辑器用于修改材质实例中的参数。 如果你不熟悉材质参数化和实例化，请阅读以下页面：

1.  [材质实例概述](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)
2.  [创建和使用材质实例](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine)

## 打开材质实例编辑器

双击内容浏览器中的 **材质实例（Material Instance）** ，打开材质实例编辑器。

![双击实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2150aa0-1d4d-42fb-94f0-26e6fd2c2cc6/click-asset.png)

你还可以 **右键点击** 内容浏览器中的材质实例缩略图，然后从上下文菜单选择 **编辑（Edit）** 。

## 材质实例编辑器界面

材质实例编辑器包含以下区域：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3a60cc5-545f-493c-8b9a-f5f7bbf5aea6/material-instance-editor-sm.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3a60cc5-545f-493c-8b9a-f5f7bbf5aea6/material-instance-editor-sm.png)

1.  [工具栏（Toolbar）](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E5%B7%A5%E5%85%B7%E6%A0%8F) - 保存你的资产，在内容浏览器中查找资产，显示隐藏的参数，显示继承层级和平台统计数据。
2.  [视口（Viewport）](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E8%A7%86%E5%8F%A3) - 一个实时视口，其中显示材质实例的预览。
3.  [视口显示选项（Viewport display options）](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E8%A7%86%E5%8F%A3%E6%98%BE%E7%A4%BA%E9%80%89%E9%A1%B9) - 允许你编辑视口中的摄像机和显示设置，以及更改用于材质预览的网格体。
4.  [细节面板（Details Panel）](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF) - 所有公开的材质参数和属性都位于此处。

### 工具栏

**图标**

**说明**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/757e39a7-aadc-4b43-ae8d-ae0d51be93f9/save.png)

保存当前资产。

![内容浏览器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/338a4324-9853-4855-bc24-4d44e44fc312/browse.png)

查找并选择 **内容浏览器（Content Browser）** 中的材质实例。

![显示隐藏项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2438cf11-cee0-4a64-a2e3-c3c590c55df8/show-inactive.png)

显示隐藏在静态开关背后的不激活参数。

![层级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41534016-8d51-4c26-adbc-3a8ba00442d9/hierarchy-sm.png)

显示材质实例的继承层级。[见下](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E5%B1%82%E7%BA%A7%E8%8F%9C%E5%8D%95)。

![平台统计数据](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87901f17-4dba-4fa7-803e-aeba8fe7e386/platform-sm.png)

打开一个窗口，其中显示不同目标平台的渲染统计数据。

#### 层级菜单

**层级菜单（Hierarchy menu）** 显示当前材质实例的继承链。由于材质实例可以用作其他材质实例的父节点，因此父节点和子节点都在层级菜单中列出。

![层级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6712e259-41c9-4a23-bab2-579262417ed3/hierarchy.png)

-   当前材质实例的 **父节点** 在父节点链下列出。 如果有多个父节点，列出的第一个父节点位于继承层级顶端。
-   当前材质实例的 **子节点** 在材质实例下列出。

从层级菜单选择父材质或材质实例会在材质实例编辑器窗口的 **新选项卡** 中打开该资产。

![材质父节点选项卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a6e4823-ab35-4eb1-a042-ded755980777/parent-tab.png)

### 视口

![预览视口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1da61ea-af4c-4100-b660-25114de52e9f/viewport-window.png)

视口显示应用于静态网格体的材质实例的预览。 当你更改材质实例中的参数时，材质预览会实时更新。

你可以使用以下功能按钮与视口交互：

-   点击并拖动 **鼠标左键** 以旋转预览网格体。
-   点击并拖动 **鼠标中键** 以平移摄像机。
-   点击并拖动 **鼠标右键** 以放大和缩小，或使用滚轮。
-   按住 **L** 键并使用 **鼠标左键** 拖动以旋转光源方向。

### 视口显示选项

**图标**

**说明**

![视口选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b43e64e-fe7e-4d40-a67d-04985b4a119b/viewport-options.png)

包含用于启用实时预览、显示FPS以及更改预览窗口的FOV开关。

![摄像机选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49953636-a459-4e2b-adb6-eeb6100d82e4/camera-options.png)

在视角和正交视口摄像机之间切换。

![视图模式选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ec7321c-82e3-4bb0-a692-3b8a252e7427/lighting-options.png)

包含标准视图模式，如"光照（Lit）"、"无光照（Unlit）"、"线框（Wireframe）"，等等。 还包含曝光覆盖。

![显示选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b994ec71-35b6-4da8-b36c-1132b87735dc/show-options.png)

启用或禁用渲染统计数据、网格和背景。

![圆柱体预览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c6a2ced-b105-4f3f-b1f0-249eab600827/cylinder.png)

在圆柱体上预览材质实例。

![球体预览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1b6152d-3349-4488-ac5e-9d8c97e454e0/sphere.png)

在球体上预览材质实例。

![平面预览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3e552c8-bbbe-40de-aae8-04d9e92b91b6/plane.png)

在平面上预览材质实例。

![立方体预览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f147313d-1d44-4549-9b4a-3bd2d1dbbc96/cube.png)

在立方体上预览材质实例。

![自定义静态网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2b3b1c3-4dfb-48d8-b437-d42f6c883f18/custom-mesh.png)

在自定义静态网格体上预览材质实例。

你可以点击视口底部的某个形状图标，以更改材质预览网格体。

![预览网格体选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7220d803-b780-4a2c-bbb1-2b49d5d3b532/preview-mesh-options.png)

要在自定义网格体上预览材质实例，请选择内容浏览器中的 **静态网格体（Static Mesh）** 资产，然后点击 **砖图标**。 预览网格体会与材质实例一起保存，这样下次打开该实例时，它就会显示在相同的预览网格体上。

![自定义网格体预览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f691fd3b-aae1-4afb-a10a-201d2606eab3/custom-mesh-example.png)

视口还会显示有关材质的统计数据，例如，各种着色器类型的指令数，以及 该材质使用的纹理示例数量。

![视口统计数据](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91c4a359-809e-4f59-8605-f1c4133aba0f/viewport-stats.png)

要预览材质实例中的某种动作或动画，你必须启用 **实时（Realtime）** 视口选项。 点击汉堡菜单以打开视口选项，并确保"实时（Realtime）"已选中。该选项默认为启用。

![切换实时](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7be4fae9-02aa-4169-aaa4-564796e491b6/toggle-realtime.png)

你还可以按 **Ctrl+R** 以切换实时渲染。

### 细节面板

你可以在"细节面板（Details panel）"中覆盖材质实例中的参数和设置。 你对材质实例进行的所有更改都会在此界面中进行。

![细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28df99a0-2cac-4cc8-bcfc-9538c08fb9e1/details-panel.png)

"细节面板（Details panel）"中有三个主要子分段：

#### 参数组

你已通过父材质中的参数公开的材质属性在此处列出。 要覆盖参数值，请选中参数名称左侧的框，然后修改字段中的值。[参见此处](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E8%A6%86%E7%9B%96%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B%E5%8F%82%E6%95%B0)，了解有关覆盖参数的更多信息。

#### 通用

"通用（General）"分段允许你选择不同的父材质或物理材质。 你还可以调整此材质实例将如何影响Lightmass编译，并覆盖从父材质继承的一些属性。 阅读[此处关于这些设置](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E8%A6%86%E7%9B%96%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8Blightmass%E8%AE%BE%E7%BD%AE)的更多信息。

#### 预览

本分段提供了另一个输入，以更改用于材质实例预览的静态网格体。

## 覆盖材质实例参数

参数在"细节面板（Details Panel）"中的 **参数组（Parameter Groups）** 分段下列出。要覆盖材质参数，请执行以下操作：

1.  选中该参数名称左侧的框。
2.  在字段中输入新值，或使用取色器设置新值。

![覆盖参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d49f10fb-a4b6-497a-9f6d-b9524e06282f/override-params.png)

选中的参数当前在材质实例中已覆盖。 未选中的参数使用父材质中的值，即使字段中有不同的值：

![未选中的参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c289bd84-2209-48dc-b6a1-c2a4b1dd9a3e/not-overridden.png)

编辑参数完成后，请务必 **保存（Save）** 材质实例，以免你的工作丢失。 为了节省内存，关闭材质实例编辑器窗口时，未选中字段中的值将丢失。

要将参数重置为默认值，请点击该参数右侧的 **重置（Reset）** 按钮。

![重置参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7b025c9-b7ad-4749-8f78-01f12a3a9054/reset-parameter.png)

### 覆盖材质实例Lightmass设置

你可以在 **通用（General）> Lightmass设置（Lightmass Settings）** 分段下覆盖材质与Lightmass交互的方式。

例如，如果你增大自发光材质的"自发光增强（Emissive Boost）"属性，该材质将向Lightmass生成的静态光照解决方案贡献更多自发光。 这会使结果更明亮。

![覆盖自发光增强](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb2415c7-857e-49fc-99fe-40e98e5b8510/emissive-boost.png)

### 覆盖父材质属性

"材质属性覆盖"分段允许你覆盖实例的父材质中的某些材质属性。

例如，如果你需要材质实例同时在表面的正面和背面渲染，可以启用"双面（Two Sided）"选项。

![覆盖双面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2b44acf-868d-4c8e-8e70-95dac4e71302/two-sided.png)

在材质实例编辑器中覆盖这些属性而不是编辑父材质的优势是，这样做只影响材质的单个实例。 其他每个实例将从父材质继承设置。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [打开材质实例编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E6%89%93%E5%BC%80%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B%E7%BC%96%E8%BE%91%E5%99%A8)
-   [材质实例编辑器界面](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B%E7%BC%96%E8%BE%91%E5%99%A8%E7%95%8C%E9%9D%A2)
-   [工具栏](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E5%B7%A5%E5%85%B7%E6%A0%8F)
-   [层级菜单](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E5%B1%82%E7%BA%A7%E8%8F%9C%E5%8D%95)
-   [视口](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E8%A7%86%E5%8F%A3)
-   [视口显示选项](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E8%A7%86%E5%8F%A3%E6%98%BE%E7%A4%BA%E9%80%89%E9%A1%B9)
-   [细节面板](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF)
-   [参数组](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E5%8F%82%E6%95%B0%E7%BB%84)
-   [通用](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E9%80%9A%E7%94%A8)
-   [预览](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E9%A2%84%E8%A7%88)
-   [覆盖材质实例参数](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E8%A6%86%E7%9B%96%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B%E5%8F%82%E6%95%B0)
-   [覆盖材质实例Lightmass设置](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E8%A6%86%E7%9B%96%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8Blightmass%E8%AE%BE%E7%BD%AE)
-   [覆盖父材质属性](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui#%E8%A6%86%E7%9B%96%E7%88%B6%E6%9D%90%E8%B4%A8%E5%B1%9E%E6%80%A7)