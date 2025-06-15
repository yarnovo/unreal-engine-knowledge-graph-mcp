# 虚幻引擎模板参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-templates-reference
> 
> 生成时间: 2025-06-14T18:52:45.446Z

---

目录

![模板参考](https://dev.epicgames.com/community/api/documentation/image/70eed4d6-628c-4e97-83e2-095ad64e12b0?resizing_type=fill&width=1920&height=335)

在创建新的虚幻引擎项目时，你可以使用现有模板之一来作为游戏或应用程序的基础。虚幻引擎模板中包含角色控制器、蓝图和其他不需要额外配置即可运行的功能。

如需有关如何根据模板创建新项目的说明，请参阅[新建项目](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)页面。

在选择模板时，你将会看到一则说明，详细介绍模板以及模板中包含的内容。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab7f41ed-7b28-46d9-a5d3-b4d6d793d2c8/example-template-description.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab7f41ed-7b28-46d9-a5d3-b4d6d793d2c8/example-template-description.png)

第三人称游戏模板的模板说明示例。点击查看大图。

此外，你还可以根据任何现有项目来创建自定义模板。如需了解更多信息，请参阅[创建自定义模板](/documentation/zh-cn/unreal-engine/converting-a-project-to-an-unreal-engine-template)页面。

## 为可以操控的角色配置输入

很多模板中都包含一个可以使用键盘、鼠标或控制器来控制的角色。在虚幻引擎属于中，这种角色称为Pawn。

你可以在 **项目设置（Project Settings）** 的 **输入（Input）** 部分中查看Pawn的现有功能按钮和配置新功能按钮。要打开项目设置，请执行以下操作：

1.  在主菜单中，前往 **编辑（Edit）> 项目设置（Project Settings）**。
    
2.  在左边的侧边栏中，向下滚动到 **引擎（Engine）** 部分，然后点击 **输入（Input）**。
    

展开 **绑定（Bindings）** 部分，你可以看到以下选项：

-   **动作映射（Action Mappings）**：定义用于控制动作（例如跳跃）的按键。
-   **轴映射（Axis Mappings）**：控制移动。根据模板的不同，可以将角色移动限制到一个或几个轴上。例如，在"横版过关游戏"模板中，Pawn只能左右移动和跳跃。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42549c68-190c-44c9-a082-517f6979d471/input-example.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42549c68-190c-44c9-a082-517f6979d471/input-example.png)

## 虚幻引擎中的模板

虚幻引擎中的模板分为以下几类：

-   游戏
    
-   电影、电视和直播活动
    
-   建筑、工程和施工
    
-   汽车、产品设计和制造
    
-   模拟
    

每种类别中都包含一个 **空白（Blank）** 模板，该模板包含一个空项目，没有任何其他内容和设置。这是最基础的模板。

### 游戏模板

![虚幻引擎5中的载具高级模板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89caab86-68d4-4f41-9929-ee84e272ed3f/templates-vehicle-advanced.png)

虚幻引擎5中的载具高级模板。

虚幻引擎的 **游戏（Games）** 模板是构建各种游戏的快速起点，例如第一人称或第三人称游戏、横版过关游戏或赛车游戏。

虽然这些模板都标记为"游戏"模板，其实可以用作任何类型项目的起点。例如，可以使用VR模板来创建三维空间的虚拟现实指南。第三人称模板通常都是很多不同类型项目的良好起点。

模板名称

模板内容

其他文档

**第一人称（First Person）**

第一人称角色，配备的枪可以基于物理原理射出发射物。玩家从角色的视角体验关卡内容。

[第一人称模板概述](/documentation/zh-cn/unreal-engine/first-person-template-in-unreal-engine)

**第三人称（Third Person）**

第三人称角色和基本几何体。摄像机位于角色后上方。

[第三人称模板概述](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine)

**自上而下（Top Down）**

点按新位置后可移动的角色。摄像机位于角色上方的固定位置，并随着角色的移动而移动。

 

**手持式AR（Handheld AR）**

用来创建AR应用程序的起点，以便部署到Android或iOS。包含用于扫描环境来收集数据的运行时逻辑，这些数据用于在虚拟场景中创建交互式平面，并且可以提供照明和场景深度信息。

-   [手持式AR模板快速入门](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine)
    
-   [手持式AR模板技术参考](/documentation/zh-cn/unreal-engine/handheld-ar-template-technical-reference)
    

**载具（Vehicle）**

符合物理特性的简单载具，具有两个不同的摄像机视角——一个在载具内部，另一个在载具后上方——还有HUD。

 

**虚拟现实（Virtual Reality）**

虚幻引擎5中的所有虚拟现实(VR)项目的起点。并且封装了传送以及常见输入操作（例如将物品在握手中）的逻辑。

-   [VR模板](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine)
    
-   [在虚幻引擎中开发VR](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine)
    

### 电影、电视和直播活动模板

![虚幻引擎5中的DMX模板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2c801a1-3435-476a-ab2d-0d8a107cfe5b/templates-dmx.png)

虚幻引擎5中的DMX模板。

**电影、电视和直播活动（Film, Television, and Live Events）** 模板为直播制片工作提供了一个良好的起点。

模板名称

模板内容

其他文档

**虚拟制片（Virtual Production）**

具有适用于VR探查、虚拟摄像机、SDI视频、Composure和nDisplay的功能。

-   [虚拟探查概述](/documentation/404)
    
-   [虚拟摄像机Actor快速入门](/documentation/404)
    

**DMX**

其中包括用于寻址、修补和控制代理光照灯具，以及进出虚幻引擎的实时DMX数据流送的录制和播放示例。

[DMX](/documentation/zh-cn/unreal-engine/dmx-in-unreal-engine)

**InCamera VFX**

适用于摄像机内视觉特效处理工作流的蓝图、插件和示例舞台。将此模板用作使用LED体积来实现虚拟制片拍摄时的基础。

-   [摄像机内视觉特效处理模板](/documentation/zh-cn/unreal-engine/in-camera-vfx-template-in-unreal-engine)
    
-   [摄像机内视觉特效处理概述](/documentation/zh-cn/unreal-engine/in-camera-vfx-in-unreal-engine)
    

**nDisplay**

通过计算机集群实现的显示功能。将此模板作为起点，在复杂排列的物理显示器上进行渲染，以获得直播效果。

-   [nDisplay模板](/documentation/zh-cn/unreal-engine/ndisplay-template-in-unreal-engine)
    
-   [利用nDisplay渲染到多个显示器](/documentation/zh-cn/unreal-engine/rendering-to-multiple-displays-with-ndisplay-in-unreal-engine)
    

### 建筑、工程和施工模板

![虚幻引擎5中的建筑模板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/100237d1-ce49-4490-8123-6cebacc0bb95/templates-aec.png)

虚幻引擎5中的建筑模板。

**建筑、工程和施工（Architecture, Engineering, and Construction）** 模板使用Datasmith将各种3D程序中的内容导入到虚幻引擎，而你可以在虚幻引擎中对这些内容进行进一步优化，以便于在桌面应用程序和XR应用程序中使用。

模板名称

模板内容

其他文档

**建筑（Archvis）**

样板建筑可视化工作流，其中带有可以用于阳光研究、内部渲染和非真实感风格渲染的示例场景。

 

**设计配置器（Design Configurator）**

可使用Variant Manager、UMG和蓝图功能来构建项目，在项目中可以切换不同的对象状态，例如可见性、启动动画序列、切换视图、切换不同设计选项。

 

**协作查看器（Collab Viewer）**

适用于协作式会话中的台式机和VR的导航和交互功能。此模板包含一些专门用于建筑领域的初学者内容包，默认启用了一些其他组件，包括OpenXR和LiveLink。

[协作查看器模板](/documentation/zh-cn/unreal-engine/collab-viewer-templates-in-unreal-engine)

**手持式AR（Handheld AR）**

可作为创建AR应用的起点，供你部署到Android或iOS上。包括用于扫描环境的运行时逻辑，可以收集数据并在虚拟场景中创建交互式平面，以及收集光照和场景深度信息。

-   [手持式AR模板快速入门](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine)
    
-   [手持式AR模板技术参考](/documentation/zh-cn/unreal-engine/handheld-ar-template-technical-reference)
    

### 汽车、产品设计和制造模板

![虚幻引擎5中的Photo Studio模板。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57d5a1fd-a3ac-46ea-aa3f-3defcb49ee50/templates-apm.png)

虚幻引擎5中的Photo Studio模板。

**汽车、产品设计和制造（Automotive, Product Design, and Manufacturing）** 模板使用Datasmith将各种3D程序中的内容导入到虚幻引擎，而你可以在虚幻引擎中对这些内容进行进一步优化，以便于在桌面应用程序和XR应用程序中使用。

模板名称

模板内容

其他文档

**Photo Studio**

这是一个预制的摄影工作室场景，可以用于过场动画或产品展示。

 

**产品配置器（Product Configurator）**

可使用Variant Manager、UMG和蓝图功能来构建常规产品配置器，这是一种程序，在程序中可以切换不同的零部件来测试产品的新外观，例如汽车的不同颜色。

[产品配置器](/documentation/zh-cn/unreal-engine/product-configurator-template-in-unreal-engine)

**协作查看器（Collab Viewer）**

适用于协作式会话中的台式机和VR的导航和交互功能。此模板还包含可以在VR中探索的样板模型汽车。

[协作查看器模板](/documentation/zh-cn/unreal-engine/collab-viewer-templates-in-unreal-engine)

**手持式AR（Handheld AR）**

可作为创建AR应用的起点，供你部署到Android或iOS上。包括用于扫描环境的运行时逻辑，可以收集数据并在虚拟场景中创建交互式平面，以及收集光照和场景深度信息。

-   [手持式AR模板快速入门](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine)
    
-   [手持式AR模板技术参考](/documentation/zh-cn/unreal-engine/handheld-ar-template-technical-reference)
    

### 模拟模板

![虚幻引擎5中的模拟模板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a368b73a-bfbf-4e8a-b137-bc98ca5d56cc/templates-simulation.png)

虚幻引擎5中的模拟模板的用法说明。

**模拟** 模板为各种企业模拟应用程序提供了范围广泛的起始点。这些模板包含以下功能：

-   户外环境的特定设置。
-   逼真的天空和光照。
-   地理配准工具。

模板名称

模板内容

其他文档

**模拟空白（Simulation Blank）**

该模板由带有必需设置并启用了插件的空白项目组成。此模板适合作为大部分模拟应用程序的起始点，并包含以下功能：

-   地球大气
-   大气光照
-   体积云
-   地理坐标
-   [世界大地测量系统 (WGS84)）](https://zh.wikipedia.org/wiki/%E4%B8%96%E7%95%8C%E5%A4%A7%E5%9C%B0%E6%B5%8B%E9%87%8F%E7%B3%BB%E7%BB%9F)

 

**手持式AR（Handheld AR）**

用来创建AR应用程序的起点，以便部署到Android或iOS。包含用于扫描环境来收集数据的运行时逻辑，这些数据用于在虚拟场景中创建交互式平面，并且可以提供照明和场景深度信息。

-   [手持式AR模板快速入门](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine)
    
-   [手持式AR模板技术参考](/documentation/zh-cn/unreal-engine/handheld-ar-template-technical-reference)
    

**虚拟现实（Virtual Reality）**

虚幻引擎5中的所有虚拟现实(VR)项目的起点。该模板封装了传送移位以及常见输入操作的逻辑，例如抓取物品和将物品附着到手上。

-   [VR模板](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine)
    
-   [在虚幻引擎中开发VR](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine)
    

-   [templates](https://dev.epicgames.com/community/search?query=templates)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [为可以操控的角色配置输入](/documentation/zh-cn/unreal-engine/unreal-engine-templates-reference#%E4%B8%BA%E5%8F%AF%E4%BB%A5%E6%93%8D%E6%8E%A7%E7%9A%84%E8%A7%92%E8%89%B2%E9%85%8D%E7%BD%AE%E8%BE%93%E5%85%A5)
-   [虚幻引擎中的模板](/documentation/zh-cn/unreal-engine/unreal-engine-templates-reference#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E7%9A%84%E6%A8%A1%E6%9D%BF)
-   [游戏模板](/documentation/zh-cn/unreal-engine/unreal-engine-templates-reference#%E6%B8%B8%E6%88%8F%E6%A8%A1%E6%9D%BF)
-   [电影、电视和直播活动模板](/documentation/zh-cn/unreal-engine/unreal-engine-templates-reference#%E7%94%B5%E5%BD%B1%E3%80%81%E7%94%B5%E8%A7%86%E5%92%8C%E7%9B%B4%E6%92%AD%E6%B4%BB%E5%8A%A8%E6%A8%A1%E6%9D%BF)
-   [建筑、工程和施工模板](/documentation/zh-cn/unreal-engine/unreal-engine-templates-reference#%E5%BB%BA%E7%AD%91%E3%80%81%E5%B7%A5%E7%A8%8B%E5%92%8C%E6%96%BD%E5%B7%A5%E6%A8%A1%E6%9D%BF)
-   [汽车、产品设计和制造模板](/documentation/zh-cn/unreal-engine/unreal-engine-templates-reference#%E6%B1%BD%E8%BD%A6%E3%80%81%E4%BA%A7%E5%93%81%E8%AE%BE%E8%AE%A1%E5%92%8C%E5%88%B6%E9%80%A0%E6%A8%A1%E6%9D%BF)
-   [模拟模板](/documentation/zh-cn/unreal-engine/unreal-engine-templates-reference#%E6%A8%A1%E6%8B%9F%E6%A8%A1%E6%9D%BF)