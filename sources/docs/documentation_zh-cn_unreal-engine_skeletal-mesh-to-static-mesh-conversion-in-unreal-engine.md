# 在虚幻引擎中将骨骼网格体转换为静态网格体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/skeletal-mesh-to-static-mesh-conversion-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:01:40.623Z

---

目录

![将骨骼网格体转换为静态网格体](https://dev.epicgames.com/community/api/documentation/image/989a10dc-4ab1-48a9-8721-d26aa7b62172?resizing_type=fill&width=1920&height=335)

在创建启动画面、屏幕截图或其他游戏内静态版本的角色时，一种很有用的做法是将特定姿势的[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)资产无损转换为[静态网格体](/documentation/zh-cn/unreal-engine/static-meshes)以保持其位置并降低静止对象的渲染成本。

以下文档将提供一个示例工作流程，说明如何在虚幻引擎中设定 **骨骼网格体** 资产的姿势并将该资产转换为 **静态网格体** 资产。

#### 先决条件

-   你的项目包含一个 **骨骼网格体** 角色。

## 设定骨骼网格体的姿势

要开始在虚幻引擎中设定角色的姿势，请在[骨骼网格体编辑器（Skeletal Mesh Editor）](/documentation/zh-cn/unreal-engine/skeletal-mesh-editor-in-unreal-engine)中打开骨骼网格体资产。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1279703-dfc9-4056-b274-898d7f73e9df/skelmesheditor.png)

要显示骨骼网格体的骨骼，为了操控其位置，请在 **视口（Viewport）** 面板中导航到 **角色（Character）** > **骨骼（Bones）**，然后切换 **所有层级（All Hierarchy）** 选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7a6770c-da25-4f97-bcea-296025edddd5/exposebones.png)

单击选择要调整的骨骼，然后使用 **移动（Move）**、**旋转（Rotate）** 和 **缩放（Scale）** 工具来操控角色的姿势。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5592ed9c-39e8-4f49-96d2-90534a5b17aa/manipulatetools.gif)

## 保存骨骼网格体姿势

将角色的姿势操控到所需位置后，可以使用骨骼网格体编辑器 **工具栏** 中的 **创建静态网格体（Make Static Mesh）** 按钮将该姿势另存为静态网格体资产。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cd65b43-8992-44f7-8cb6-3aed803e20da/makestaticmesh.png)

指定新的静态网格体资产的 **名称（Name）**，并选择一个位置来保存该资产，然后选择 **保存（Save）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3993bd3b-2d55-4deb-85f6-457e53973532/save.png)

现在可以在项目中使用转换后的静态网格体。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64530b98-f2e0-4aa5-b1ee-00b7d8dd99ff/placestatic.gif)

将骨骼网格体转换为静态网格体后，为了安全地将网格体重新定位到其参考姿势，可以使用骨骼网格体编辑器 **工具栏** 中的 **重新导入基础网格体（Reimport Base Mesh）** 按钮重新导入骨骼网格体的 `.fbx` 源文件，或使用 **Ctrl** + **Z** 手动还原所做的操控编辑。

如果不还原骨骼操控编辑，骨骼网格体的动画序列将无法正常播放。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53ca8252-9293-40fd-bc39-7ed9fdc2ddb2/reimport.png)

还可以使用骨骼网格体编辑器工具栏中的"创建资产（Create Asset）"按钮将特定姿势的骨骼网格体另存为[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)和[姿势资产](/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine)，以便用于其他更动态的用例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9375e8c8-070e-47a5-b807-5871eafbd333/createasset.png)

如需详细了解如何使用保存的骨骼网格体姿势，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine)

[![动画姿势资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c13888e-5460-4a31-8ba0-399e794a2ce2/topicimage.png)](/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine)

[动画姿势资产](/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine)

[讲解动画姿势资产，其可通过加权曲线数据来驱动动画。](/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine)

## 转换多个骨骼网格体和静态网格体

还可以将一组已放置在关卡中的静态网格体或骨骼网格体对象转换为单个静态网格体资产，以便将多个角色摆放在一起，或将角色与其他对象（如背景或武器）组合在一起。 在关卡中放置和定位对象后，可以多选要转换为静态网格体的每个对象，然后在 **菜单栏** 中导航到 **Actor** > **将Actor转换为静态网格体（Convert Actors to Static Mesh）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e06962c5-3ec2-4ba4-bfbc-c939ec45617d/convertinscene.png)

指定新的静态网格体资产的 **名称（Name）**，并选择一个位置来保存该资产，然后选择 **保存（Save）**。 现在可以在项目中使用转换后的静态网格体。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50a8b8dd-aa8f-427f-98fb-b2211ce94f13/staticscene.gif)

还可以 **在编辑器中运行**（Play In Editor，简称 **PIE**）期间将多组游戏对象转换为单个静态网格体，以及在编辑器中的其他模拟模式下进行此操作，例如使用[倒回调试器（Rewind Debugger）](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine)录制Gameplay片段以保存更多动态Gameplay快照。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b5eb46b-a3f3-4a6c-9c25-561c7d0bfe6d/pie.gif)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [static mesh](https://dev.epicgames.com/community/search?query=static%20mesh)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/skeletal-mesh-to-static-mesh-conversion-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [设定骨骼网格体的姿势](/documentation/zh-cn/unreal-engine/skeletal-mesh-to-static-mesh-conversion-in-unreal-engine#%E8%AE%BE%E5%AE%9A%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93%E7%9A%84%E5%A7%BF%E5%8A%BF)
-   [保存骨骼网格体姿势](/documentation/zh-cn/unreal-engine/skeletal-mesh-to-static-mesh-conversion-in-unreal-engine#%E4%BF%9D%E5%AD%98%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93%E5%A7%BF%E5%8A%BF)
-   [转换多个骨骼网格体和静态网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-to-static-mesh-conversion-in-unreal-engine#%E8%BD%AC%E6%8D%A2%E5%A4%9A%E4%B8%AA%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93%E5%92%8C%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)