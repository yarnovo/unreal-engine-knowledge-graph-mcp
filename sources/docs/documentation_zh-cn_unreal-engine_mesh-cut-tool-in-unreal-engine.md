# 虚幻引擎中的网格体切割工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mesh-cut-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:09:04.427Z

---

目录

![网格体切割](https://dev.epicgames.com/community/api/documentation/image/0380b2fb-90f2-434f-8212-7dcb1a1db0bc?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**网格体切割（Mesh Cut）** 工具能用一个网格体将另一个网格体切割为多个部分。你可以使用该工具将网格体分解为更小的组件并添加细节，省去在建模时手动添加边和删除面的麻烦。

## 访问工具

网格体切割位于 **建模模式（Modeling Mode）** 的 **建模（Model）** 类别中。如需详细了解建模模式以及访问方法，请参阅[建模模式概述](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)。

## 使用网格体切割

网格体的控件会显示在视口中，以便随时调整切割效果。

类似于[布尔](/documentation/zh-cn/unreal-engine/boolean-tool-in-unreal-engine)工具，选择顺序很重要，具体如下：

-   第一个选定的网格体是被切割的网格体。
-   第二个选定的网格体用于定义切割的形状/边界。

网格体切割是一种单次切割工具，意味着每次你想切割网格体，就要重新启动一次会话。

在使用过该工具后，你可以使用[工具确认](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7-%E6%92%A4%E9%94%80%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E5%92%8C%E6%8E%A5%E5%8F%97%E6%9B%B4%E6%94%B9)面板接受或取消更改。

## 设置

**设置**

**说明**

**尝试修复孔洞（Try Fix Holes）**

为true时，网格体切割会自动尝试填充数字错误造成的孔洞。

**尝试折叠边缘（Try Collapse Edges）**

为true时，布尔运算造成的额外边缘会折叠。

**缠绕阈值（Winding Threshold）**

确定一个网格体中的三角形是位于另一个网格体内部还是外部。

**显示新边界（Show New Boundaries）**

为true时，显示布尔运算中因数字错误造成的边界边缘。

**使用第一个网格体的材质（Use First Mesh Materials）**

为True时，仅第一个网格体保留其材质分配。其他所有三角形都分配材质0。

**显示小工具（Show Gizmo）**

切换变换小工具的可视性。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [modeling mode](https://dev.epicgames.com/community/search?query=modeling%20mode)
-   [modeling tools](https://dev.epicgames.com/community/search?query=modeling%20tools)
-   [low-poly modeling](https://dev.epicgames.com/community/search?query=low-poly%20modeling)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问工具](/documentation/zh-cn/unreal-engine/mesh-cut-tool-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%B7%A5%E5%85%B7)
-   [使用网格体切割](/documentation/zh-cn/unreal-engine/mesh-cut-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%BD%91%E6%A0%BC%E4%BD%93%E5%88%87%E5%89%B2)
-   [设置](/documentation/zh-cn/unreal-engine/mesh-cut-tool-in-unreal-engine#%E8%AE%BE%E7%BD%AE)

相关文档

[

建模工具

![建模工具](https://dev.epicgames.com/community/api/documentation/image/152a0302-28b3-46e6-91d6-98c2ff1dde1b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/modeling-tools-in-unreal-engine)

[

建模模式概述

![建模模式概述](https://dev.epicgames.com/community/api/documentation/image/5f9ab70c-68fd-4dd1-9e68-9294f46ed6e0?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)

[

建模模式 - 处理资产

![建模模式 - 处理资产](https://dev.epicgames.com/community/api/documentation/image/a47163cd-8973-4f6f-b9d8-6f3f03f03df0?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/working-with-meshes-in-unreal-engine)