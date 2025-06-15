# 虚幻引擎项目设置中的建模模式工具设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/modeling-mode-tools-settings-in-the-unreal-engine-project-settings
> 
> 生成时间: 2025-06-14T18:56:56.507Z

---

目录

![建模模式工具](https://dev.epicgames.com/community/api/documentation/image/25f334d4-bd62-4316-849a-cd55a08288cb?resizing_type=fill&width=1920&height=335)

## 建模模式工具

### 建模工具

**设置**

**说明**

**渲染（Rendering）**

 

**在编辑时启用光线追踪（Enable Ray Tracing While Editing）**

为网格体编辑工具启用实时光线追踪支持。

这将影响带有3D塑造等实时反馈的工具的性能。

**新网格体对象（New Mesh Objects）**

 

**启用光线追踪（Enable Ray Tracing）**

如果光线追踪支持可选，为建模工具创建的新网格体对象启用光线追踪支持（例如， `DynamicMeshActors` ）。

**启用碰撞（Enable Collision）**

为建模工具创建的新网格体对象启用碰撞支持。

**碰撞模式（Collision Mode）**

建模工具创建的新网格体对象上设置的默认碰撞模式。

你可以从以下选项中选择：

-   **项目默认值（Project Default）** ：使用项目物理设置（ `DefaultShapeComplexity` ）。
-   **简单和复杂（Simple And Complex）** ：创建简单和复杂的形状。简单形状用于常规场景查询和碰撞测试。复杂形状（按多边形）用于复杂场景查询。
-   **将简单碰撞形状用作复杂形状（Use Simple Collision As Complex）** ：仅创建简单形状。将简单形状用于所有场景查询和碰撞测试。
-   **将复杂碰撞形状用作简单形状（Use Complex Collision As Simple）** ：仅创建复杂形状（按多边形）。将复杂形状用于所有场景查询和碰撞测试。只能用于静态形状的模拟（即，可以与之碰撞，但不会通过速度力移动）。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [建模模式工具](/documentation/zh-cn/unreal-engine/modeling-mode-tools-settings-in-the-unreal-engine-project-settings#%E5%BB%BA%E6%A8%A1%E6%A8%A1%E5%BC%8F%E5%B7%A5%E5%85%B7)
-   [建模工具](/documentation/zh-cn/unreal-engine/modeling-mode-tools-settings-in-the-unreal-engine-project-settings#%E5%BB%BA%E6%A8%A1%E5%B7%A5%E5%85%B7)