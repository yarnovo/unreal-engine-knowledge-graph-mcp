# 虚幻引擎中的静态网格体Actor | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:58:22.588Z

---

目录

![静态网格体Actor](https://dev.epicgames.com/community/api/documentation/image/4b675fbe-33f5-467c-b62a-cb195329f98a?resizing_type=fill&width=1920&height=335)

**静态网格体Actor（Static Mesh Actor）** 是一种简单的Actor类型，用于在关卡中显示3D网格体。尽管名称暗示Actor是静态的（或无法移动），但这里"静态"指的是所使用的网格体类型，而不是指Actor能否移动。如果网格体的几何体不会改变，该网格体就是 *\*静态* 的。否则，Actor本身可以在运行期间以其他方式移动或更改。

静态网格体Actor常用于创建游戏世界或其他类型的环境。

虚幻引擎包含以下默认的静态网格体Actor：

-   立方体
    
-   球体
    
-   圆柱体
    
-   椎体
    
-   平面
    

除了这些之外，你还可以导入你自己的在其他3D应用程序中创建的静态网格体Actor。

要详细了解如何将内容导入到虚幻引擎中，请参阅[直接导入资产](/documentation/zh-cn/unreal-engine/importing-assets-directly-into-unreal-engine)页面。

## 放置静态网格体Actor

要放置静态网格体Actor，最快的方式是从[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)将其拖入关卡视口中。接着，你可以使用其变换属性将其放在需要的地方。

![通过拖放来放置静态网格体Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9da6b9d-dc6a-4414-86ce-93ca1c8036c2/placing-a-static-mesh-actor.gif)

要了解放置Actor的其他方法，请参阅[放置Actor](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)页面。

## 更改静态网格体Actor的材质

你可以为每个静态网格体Actor单独覆盖应用于静态网格体的材质。这样一来，你可以在关卡中使用单个静态网格体资产多次，同时每次显示唯一的外观。

下面的示例显示了使用相同静态网格体（一个简单的三维立方体）的三个静态网格体Actor。每个Actor使用不同的材质。

![使用不同材质的三个静态网格体Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5acf415-3cfd-437f-9b8d-8164abce1150/cubes.png)

要替换分配给静态网格体的材质，请在内容浏览器中找到该材质，然后将其拖到关卡视口中的静态网格体Actor，如以下示例所示。

![更改分配给静态网格体Actor的材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8ad03a4-8a0e-423f-bdb7-ae2929a77d9f/assigning-material-to-static-mesh.gif)

要了解将材质分配给静态网格体的其他方法，请参阅[设置静态网格体的材质](/documentation/zh-cn/unreal-engine/using-materials-with-static-meshes-in-unreal-engine)页面。

## 在Gameplay期间移动静态网格体Actor

Actor的 **移动性（Mobility）** 设置可控制Actor在Gameplay期间是否能够以某种方式移动或变化。

默认情况下，静态网格体Actor的移动性为 **静态（Static）** 。要在运行期间移动、旋转或缩放静态网格体Actor，你必须首先将其设为 **可移动（Movable）** 。为此，在Actor的 **细节（Details）** 面板中，将其 **移动性（Mobility）** 设置为 **可移动（Movable）** 。

![Actor的可移动移动性属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/925cd6ac-eea5-4637-9839-90f67f0217b6/actor-mobility-movable.png)

要详细了解不同的移动性设置及其如何影响静态网格体Actor，请参阅[Actor移动性](/documentation/zh-cn/unreal-engine/actor-mobility-in-unreal-engine)页面。

## 为静态网格体Actor启用物理

如果你希望静态网格体Actor受重力和碰撞影响，请在Actor的 **细节（Details）** 面板中启用 **模拟物理（Simulate Physics）** 属性。

![静态网格体Actor的模拟物理属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b09d82b8-2b5d-4e32-b319-63f094e135b9/simulate-physics-property.png)

你可以在[物理](/documentation/zh-cn/unreal-engine/physics-in-unreal-engine)小节中详细阅读在虚幻引擎中实现物理效果的方式。

在下面的示例中，球体静态网格体Actor启用了 **模拟物理（Simulate Physics）** 。模拟开始时，重力会影响球体，使其坠落，直至与地面碰撞。

![受重力影响的球体静态网格体Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf66b73c-ccd8-4958-b0f3-2b3d6e079887/sphere-falling.gif)

## 为静态网格体Actor启用碰撞

**碰撞（Collision）** 是Actor的一个属性，用于在环境中的其他Actor碰撞该Actor时做出反应。

默认情况下，如果静态网格体有 **物理形体（Physics Bodies）** ，无论是在你的3D编辑包中生成（请参阅[FBX内容管线](/documentation/zh-cn/unreal-engine/fbx-content-pipeline)）还是在 **静态网格体编辑器（Static Mesh Editor）** 中生成（请参阅[碰撞响应参考](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine)），该网格体都会发生碰撞，并且将设置为 **全部阻止（Block All）** 。

请参阅[碰撞](/documentation/zh-cn/unreal-engine/collision-in-unreal-engine)文档，详细了解不同类型的碰撞及其如何影响静态网格体Actor。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [放置静态网格体Actor](/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine#%E6%94%BE%E7%BD%AE%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93actor)
-   [更改静态网格体Actor的材质](/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine#%E6%9B%B4%E6%94%B9%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93actor%E7%9A%84%E6%9D%90%E8%B4%A8)
-   [在Gameplay期间移动静态网格体Actor](/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine#%E5%9C%A8gameplay%E6%9C%9F%E9%97%B4%E7%A7%BB%E5%8A%A8%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93actor)
-   [为静态网格体Actor启用物理](/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine#%E4%B8%BA%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93actor%E5%90%AF%E7%94%A8%E7%89%A9%E7%90%86)
-   [为静态网格体Actor启用碰撞](/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine#%E4%B8%BA%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93actor%E5%90%AF%E7%94%A8%E7%A2%B0%E6%92%9E)