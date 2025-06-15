# 虚幻引擎中的CubeGrid工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cubegrid-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:08:11.475Z

---

目录

![CubeGrid](https://dev.epicgames.com/community/api/documentation/image/db6deb35-7c79-4dbb-8100-ec20d9edbe4f?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**CubeGrid** 工具使用可重新定位的网格创建方块网格体。你可以使用CubeGrid创建新网格体或编辑所选网格体。

**推送（Push）** 和 **提取（Pull）** 操作有助于快速构建关卡原型。

## 访问工具

CubeGrid位于 **建模模式（Modeling Mode）** 的 **创建（Create）** 类别中。如需详细了解建模模式以及访问方法，请参阅[建模模式概述](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)。

## 使用CubeGrid

CubeGrid有与热键命令配合使用的操作，因此可以高效地搭建关卡。下面是用于构建网格并调整其大小的热键。

**热键**

**说明**

**点击**

选中网格。

**点击 + 拖动**

动态创建一批行和列。

**Shift + 点击**

在第一次点击和第二次点击的位置之间创建一批行和列。

**Ctrl + E**

增加网格大小。

**Ctrl + Q**

减小网格大小。

**Shift + E**

将选中的网格向前平移一个单元格。

**Shift + Q**

将选中的网格向后平移一个单元格。

选择网格后，你可以使用 **操作（Actions）** 按钮或以下热键来构建网格体。

**热键**

**说明**

**Ctrl + 拖动**

从选定网格推送或提取几何体。

**E**

从选定网格提取几何体。

**Q**

从选定网格提取。

**Z**

进入 **内角模式（Corner Mode）** ，其中你可以在所选网格中选择通过 **Ctrl + 拖动** 或 **E/Q** 推送或提取的内角。再次按 **Z** 可应用更改。

你可以使用网格小工具（使用 **R** 键切换）或通过 **Ctrl + 鼠标中键** 重新定位网格，这会将小工具移至最接近单元的内角。你还可以在 **[工具属性](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%BB%BA%E6%A8%A1%E6%A8%A1%E5%BC%8F)** 面板中设置特定位置和方向，或从创建的网格体的变换重新初始化。

请参阅 **工具属性（Tool Properties）** 面板中的 **快捷方式信息（Shortcut Info）** ，详细了解工具的各种热键。

## 输出

编辑网格体完成后，可以选择以下 **输出类型（Output Types）** ：

-   静态网格体
-   动态网格体
-   体积

在使用过该工具后，你可以使用[工具确认](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7-%E6%92%A4%E9%94%80%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E5%92%8C%E6%8E%A5%E5%8F%97%E6%9B%B4%E6%94%B9)面板接受或取消更改。

如需详细了解输出类型及其用例，请参阅[使用网格体](/documentation/zh-cn/unreal-engine/working-with-meshes-in-unreal-engine)。有关场景快速搭建的概念以及使用时机，请参阅[场景快速搭建和代替网格体](https://dev.epicgames.com/community/learning/tutorials/bXd/unreal-engine-blockouts-and-stand-in-meshes)。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [modeling mode](https://dev.epicgames.com/community/search?query=modeling%20mode)
-   [modeling tools](https://dev.epicgames.com/community/search?query=modeling%20tools)
-   [low-poly modeling](https://dev.epicgames.com/community/search?query=low-poly%20modeling)
-   [level blocking](https://dev.epicgames.com/community/search?query=level%20blocking)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问工具](/documentation/zh-cn/unreal-engine/cubegrid-tool-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%B7%A5%E5%85%B7)
-   [使用CubeGrid](/documentation/zh-cn/unreal-engine/cubegrid-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8cubegrid)
-   [输出](/documentation/zh-cn/unreal-engine/cubegrid-tool-in-unreal-engine#%E8%BE%93%E5%87%BA)

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