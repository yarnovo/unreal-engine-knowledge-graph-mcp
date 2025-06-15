# 在虚幻引擎中为项目添加自定义追踪类型 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/add-a-custom-trace-type-to-your-project-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:49:22.050Z

---

目录

![给项目添加自定义追踪类型](https://dev.epicgames.com/community/api/documentation/image/517549ae-223f-4819-b020-7bf5c1ac0954?resizing_type=fill&width=1920&height=335)

你经常会发现两个默认的 **追踪响应** 通道（"可视性（Visibility）"和"摄像机（Camera）"）无法满足需求，例如，你可能需要一种特殊激光，它需要能够穿过你无法透视或无法让摄像机穿过的特殊不透明对象。遇到此类情况时，你可以按照以下步骤添加自己的自定义 **追踪响应** 通道。

## 步骤

1.  打开项目设置：**"编辑（Edit）"菜单** -> **项目设置（Project Settings）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b96c7a8e-f340-4732-ad62-9904be3f4894/col-project-settings-1.png)
2.  在 **引擎（Engine）** 下，选择 **碰撞（Collision）**：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/462b1502-7213-44cc-857d-f25e436db2f8/col-project-settings-2.png)
3.  单击 **新建追踪通道...（New Trace Channel...）** 按钮。为新建的 **追踪通道（Trace Channel）** 命名，并设置其 **默认响应（Default Response）**。点击 **接受（Accept）** 按钮。
    
    **默认响应** 可以是 **阻挡（Block）**、**重叠（Overlap）** 或 **忽略（Ignore）**。根据你的用例，你应该谨慎选择，以避免额外的Actor碰撞设置工作。
    
4.  要让新追踪通道在所有组件或节点上显示，必须关闭并重新打开 **蓝图编辑器** 中任何已打开的 **蓝图**。
    

## 结果

你现在拥有新的追踪通道，可在编辑器中的任意位置使用。必须将你希望能够使用新通道追踪的所有Actor或组件设置为阻止新通道。

-   [collision](https://dev.epicgames.com/community/search?query=collision)
-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/add-a-custom-trace-type-to-your-project-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [结果](/documentation/zh-cn/unreal-engine/add-a-custom-trace-type-to-your-project-in-unreal-engine#%E7%BB%93%E6%9E%9C)