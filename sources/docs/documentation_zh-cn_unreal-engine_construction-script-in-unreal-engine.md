# 虚幻引擎构造脚本 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/construction-script-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:50.997Z

---

目录

![构造脚本](https://dev.epicgames.com/community/api/documentation/image/b4fb7cb0-c10d-432d-ac1b-da4676b600f4?resizing_type=fill&width=1920&height=335)

![User Construction Script](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bfcb9d9f-4c25-4dfa-9d77-14b1fda7a74b/ucs_banner.png)

创建蓝图类的实例时，**构造脚本（Construction Script）** 在组件列表之后运行。它包含的节点图表允许蓝图实例执行初始化操作。构造脚本的功能可以非常丰富，它们可以执行场景射线追踪、设置网格体和材质等操作，从而根据场景环境来进行设置。例如，光源蓝图可判断其所在地面类型，然后从一组网格体中选择合适的网格体，或者，栅栏蓝图可以向各个方向射出射线，从而确定栅栏可以有多长。

仅类蓝图包含 **Construction Scripts（构造脚本）** 。关卡蓝图没有构造脚本。

**Construction Script(构造脚本)** 图表的执行入口点是一直存在的 *ConstructionScript* 节点。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5a97710-021d-499c-9130-699ee8b1229c/construction_script.png)

## 应用图表

请参照[蓝图编辑器图表编辑器](/documentation/zh-cn/unreal-engine/graph-editor-for-the-blueprints-visual-scripting-editor-in-unreal-engine)获得关于在蓝图中应用 **ConstructionScript（构造脚本）** 和其他图表的详细指南。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [graphs](https://dev.epicgames.com/community/search?query=graphs)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [应用图表](/documentation/zh-cn/unreal-engine/construction-script-in-unreal-engine#%E5%BA%94%E7%94%A8%E5%9B%BE%E8%A1%A8)