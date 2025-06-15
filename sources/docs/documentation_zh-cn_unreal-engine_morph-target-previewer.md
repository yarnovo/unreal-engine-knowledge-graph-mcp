# 变形目标预览器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/morph-target-previewer
> 
> 生成时间: 2025-06-14T20:07:08.495Z

---

目录

![变形目标预览器](https://dev.epicgames.com/community/api/documentation/image/21231c70-9863-4588-abba-8a3dbb821788?resizing_type=fill&width=1920&height=335)

**变形目标预览器（Morph Target Previewer）** 用于预览应用到 **骨架网格体** 的 **变形目标（Morph Targets）**（有时称作"变形"或"混合变形"）。每个 **变形目标** 将附加混合到现有的 **骨架网格体** 几何体中。多个变形目标组合后可创建复杂的顶点驱动动画，适合处理面部表情之类的内容。

打开[动画编辑器](/documentation/zh-cn/unreal-engine/animation-editors-in-unreal-engine) 后，**变形目标预览器** 窗口便会默认显示。

## 界面

**变形目标预览器** 面板由两大部分组成：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/142f30a6-258d-4ba2-9dbb-f5da7a677db1/morphtargetpreviewerinterface.png)

1.  搜索栏
2.  变形目标列表

搜索栏可过滤出 **变形目标** 列表，以便进行快速查找。输入所需目标的前几位字母后列表便会开始过滤。 也可在一个 **变形目标** 上点击右键，之后将弹出一个含额外操作（如 **Delete** 或 **Copy Morph Target Names**）的对话框。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a19a4ba-f0d2-40c3-aaa3-c65a2808800d/rightclickdelete.png)

## 创建变形目标

可将 **变形目标** 作为 **骨架网格体** 的一部分导入，也可独立导入（独立于给定的网格体）。导入文件格式为 FBX。

如需了解设置过程和如何将变形目标导入虚幻引擎的更多内容，请查阅[FBX变换目标管线](/documentation/zh-cn/unreal-engine/fbx-morph-target-pipeline-in-unreal-engine)。

## 使用变形目标

变形目标到位后，则需要设置[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine) 对其加以利用。这将借助 **Set Morph Target** 节点在事件图表中完成。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e745a7c-5aa6-4591-8dfd-18e341fad679/setmorphtarget.png)

引脚

描述

输入引脚

 

Execution

触发节点效果的执行连线。

Target

目标 **骨架网格体**。多数情况下这会指向"self"。

Morph Target Name

正在编辑的 **变形目标** 命名。

Value

一个（0.0 到 1.0 之间）的浮点值，用于设置编辑中 **变形目标** 的值。

输出引脚

 

Execution

将执行传至下一个节点。

## 变形目标调试视图模式

启动此视图模式后即可轻松查看哪些顶点受到每个变形目标的影响。

1.  在视口窗口中，点击 **Show** > **Mesh Overlay** > **Selected MorphTarget Vertices**。
2.  现在从 **Morph Target Preview** 面板中选中任意 **变形目标**，查看调试视图。

## 优化

如目标平台支持 Shader Model 5，则可启用变形目标的 GPU 计算。这意味着如果游戏 CPU 受限，CPU 则无需执行计算，可省出 GPU 处理。此功能可在 **Project Settings** 中启用，请按照以下步骤执行：

1.  在文件菜单上点击 **Edit** > **Project Settings**。
2.  打开 **Project Settings** 的 **Rendering** 部分。
3.  在 **Optimizations** 类目中找到 **Use GPU for computing morph targets** 勾选框并将其启用。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9481eac1-587b-4332-955b-ab1d000855ef/projectsettingsmorphgpu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9481eac1-587b-4332-955b-ab1d000855ef/projectsettingsmorphgpu.png)

点击查看大图。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [morph target](https://dev.epicgames.com/community/search?query=morph%20target)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [fbx importing](https://dev.epicgames.com/community/search?query=fbx%20importing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [界面](/documentation/zh-cn/unreal-engine/morph-target-previewer#%E7%95%8C%E9%9D%A2)
-   [创建变形目标](/documentation/zh-cn/unreal-engine/morph-target-previewer#%E5%88%9B%E5%BB%BA%E5%8F%98%E5%BD%A2%E7%9B%AE%E6%A0%87)
-   [使用变形目标](/documentation/zh-cn/unreal-engine/morph-target-previewer#%E4%BD%BF%E7%94%A8%E5%8F%98%E5%BD%A2%E7%9B%AE%E6%A0%87)
-   [变形目标调试视图模式](/documentation/zh-cn/unreal-engine/morph-target-previewer#%E5%8F%98%E5%BD%A2%E7%9B%AE%E6%A0%87%E8%B0%83%E8%AF%95%E8%A7%86%E5%9B%BE%E6%A8%A1%E5%BC%8F)
-   [优化](/documentation/zh-cn/unreal-engine/morph-target-previewer#%E4%BC%98%E5%8C%96)