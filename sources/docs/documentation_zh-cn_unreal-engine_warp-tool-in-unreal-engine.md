# 虚幻引擎中的扭曲工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/warp-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:08:32.304Z

---

目录

![扭曲](https://dev.epicgames.com/community/api/documentation/image/75ad3ceb-8b7f-42f5-a4f4-0b52420a7fd9?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**扭曲（Warp）** 工具使用弯曲（bend）、迸发（flare）和扭转（twist）等非线性变换，改变网格体的形状。

## 访问工具

你可以通过以下方法访问扭曲工具：

-   **建模模式（Modeling Mode）** 中的 **变形（Deform）** 类别。如需详细了解建模模式以及访问方法，请参阅[建模模式概述](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)。
-   **骨架编辑器（Skeleton Editor）** 中的 **编辑工具（Editing Tools）** 选项卡。更多详情，请参阅[骨架编辑](/documentation/zh-cn/unreal-engine/skeleton-editing-in-unreal-engine)。

## 使用工具

你可以从 **操作类型（Operation Type）** 属性中选择以下变换来使网格体变形：

-   弯曲（Bend）
-   迸发（Flare）
-   扭转（Twist）

扭曲工具使用独特的小工具（额外T形控点）调整变形程度。你可以 **按住Ctrl并点击** ，将小工具放入特定网格体区域。在**选项（Options）** 分段中，句柄以数字方式表示如下：

-   上边界（Upper Bound）
-   下边界（Lower Bound）
-   角度或百分比（Degree or percentage）

工具使用完毕后，在[工具确认](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%92%A4%E9%94%80%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E5%92%8C%E6%8E%A5%E5%8F%97%E6%9B%B4%E6%94%B9)面板中接受或取消更改。

### 热键

**按键命令**

**操作**

**Ctrl + 点击**

重新定位小工具。

**F**

放大网格体位置。

**ESC**

取消 更改并退出工具。

**Enter**

接受工具更改。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [modeling mode](https://dev.epicgames.com/community/search?query=modeling%20mode)
-   [sculpting](https://dev.epicgames.com/community/search?query=sculpting)
-   [skeleton editing](https://dev.epicgames.com/community/search?query=skeleton%20editing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问工具](/documentation/zh-cn/unreal-engine/warp-tool-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%B7%A5%E5%85%B7)
-   [使用工具](/documentation/zh-cn/unreal-engine/warp-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%B7%A5%E5%85%B7)
-   [热键](/documentation/zh-cn/unreal-engine/warp-tool-in-unreal-engine#%E7%83%AD%E9%94%AE)

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