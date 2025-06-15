# 虚幻引擎Paper 2D Sprite碰撞 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/paper-2d-sprite-collision-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:16:51.338Z

---

目录

![Sprite 碰撞](https://dev.epicgames.com/community/api/documentation/image/97768729-35fb-4772-b2c8-9d8d5f6636b5?resizing_type=fill&width=1920&height=335)

和其他类型的几何体（如静态网格物体、骨骼网格物体等）一样，**Sprite** 可定义用于计算与场景中其他几何体碰撞的形态。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d055760-64c2-47cc-a670-34a4f968c5a4/collision_shape.png)

## 碰撞域

**Sprite 碰撞域** 属性用于定义计算碰撞的方法。存在三种 不同设置：

碰撞类型

描述

**无**

无碰撞几何体生成；只用于装饰性 sprite。

**使用 2D 物理**

这是一个 *实验性* 选项，用于生成在 Box2D 中使用的碰撞几何体。关于限流，请查阅 [2D 碰撞](/documentation/zh-cn/unreal-engine/paper-2d-sprite-collision-in-unreal-engine#2dcollision) 中的详细信息。

**使用 3D 物理**

将生成在 PhysX.中使用的碰撞几何体。在 sprite 中定义的 2D 碰撞几何体将被突出，使用垂直轴深处的 **碰撞厚度** 制作 3D 碰撞几何体。

## 碰撞几何体

碰撞几何体上的 **几何体类型** 设置指定了用于生成碰撞几何体 的算法类型。下列设置可用：

类型

描述

**源边界框式**

在 Sprite 上使用 [源区](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine) 的边界框。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23db8548-9bbb-4c97-afa0-75d1ce2e3772/collision_box.png)

**严格边界框式**

生成严格边界框，将 sprite 的全透明区域排除在外。多数情况下这种方式能生成更佳的碰撞效果。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba0c040e-a39d-4bd8-9b85-697911bbbf42/collision_tight.png)

**收缩包裹式**

（*实验性*）生成匹配 Sprite 不透明区域的复杂几何体。这种方式能产生最真实的碰撞效果，但额外的几何体可能对运行性能产生影响。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f55198e-01d2-4a11-8ba9-cd87b565101e/collision_shrink.png)

**自定义式**

可指定视口中互动使用的几何体。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70f002bf-7c08-4712-a44f-2a1414689aff/collision_custom.png)

**方块式**

分割为许多小方块，包括最终几何体中仅为非空的小方块。

"编辑碰撞"模式显示碰撞几何体，且可在视口中进行调整，将模式自动设为自定义式。

工具栏按钮可用于添加额外多边形或捕捉顶点至像素网格。选择一个边沿后按下 **Shift+左键单击** 组合键可添加新顶点，选中顶点后可按下 **删除键** 进行删除。

## 2D 碰撞

Box2D 2.3.1 是一个初始的 **实验性** 整合版本，进行了多项相关调整，以便在引擎中实现 2D 物理。这并非官方正式支持的原型版本，请谨慎使用，勿用于正式游戏开发。 当前版本仅包括 Win32 和 Win64 的 Box2D 预编译库，因此 2D 碰撞在其他平台上将 无法实现。在 sprite 上选中 2D 域之后将自动进行碰撞检测和响应，而查询 （如点追踪）必须在物理项目设置中单独启用（bEnable2DPhysics 选项）。

整合版支持碰撞检测和响应（包括虚幻碰撞通道/过滤）、刚体 模拟、以及光线投射。非零范围查询、扫描测试和重叠测试等功能尚未加入。如 CharacterMovementComponent 和 MoveComponent with bSweep=true 均基于这些类型的查询，功能仍暂不可用。

长期整合策略的目标是将其打造为一流的引擎，使 2D 场景可直接套用相同的技术和理论知识； 举例而言，只存在一个重叠事件，而并非以 2D 和 3D 形式单独 存在。Box2D 中已加入 3D 光线投射，可进行"面内"追踪（2D 场景中的玩法追踪） 或"垂直面"追踪（如触摸输入追踪，确定物体在手指/鼠标指针下），产生正常光照效果路径和法线。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [碰撞域](/documentation/zh-cn/unreal-engine/paper-2d-sprite-collision-in-unreal-engine#%E7%A2%B0%E6%92%9E%E5%9F%9F)
-   [碰撞几何体](/documentation/zh-cn/unreal-engine/paper-2d-sprite-collision-in-unreal-engine#%E7%A2%B0%E6%92%9E%E5%87%A0%E4%BD%95%E4%BD%93)
-   [2D 碰撞](/documentation/zh-cn/unreal-engine/paper-2d-sprite-collision-in-unreal-engine#2d%E7%A2%B0%E6%92%9E)

相关文档

[

材质

![材质](https://dev.epicgames.com/community/api/documentation/image/cdeef2f5-00ad-4403-bbd3-ee8f0b14330e?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-materials)

[

纹理

![纹理](https://dev.epicgames.com/community/api/documentation/image/ba1ff4b2-613a-41ac-a7d1-d350fedca14e?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)