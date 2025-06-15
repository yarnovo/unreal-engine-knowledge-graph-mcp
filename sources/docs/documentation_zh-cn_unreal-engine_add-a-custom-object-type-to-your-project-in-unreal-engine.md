# 为项目添加自定义物体类型 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/add-a-custom-object-type-to-your-project-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:49:20.273Z

---

目录

![为项目添加自定义物体类型](https://dev.epicgames.com/community/api/documentation/image/d7592163-759a-4972-bb78-fbf4c3d9ab43?resizing_type=fill&width=1920&height=335)

事实上存在这样的情况：6 个物体响应通道和 2 个轨迹响应通道的粒度不足，无法创建所需的效果。这时 Project Settings 中的碰撞编辑器就可以大显身手了。从 **Edit Menu** -> **Project Settings** -> **Collision** 菜单中进行访问：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b69b62af-eaaf-4c4b-b93b-f663aa400bff/col_projectsettings_1.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f06df75-bd0a-465e-9f61-49788aaf3958/col_projectsettings_2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f06df75-bd0a-465e-9f61-49788aaf3958/col_projectsettings_2.png)

在此处可新添加物体响应通道和轨迹响应通道。点击 **New Object Channel...** 或 **New Trace Channel...** 按钮，完成命名，选择 **Default Response**，然后点击 **Accept**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f089370-c01f-4553-92b5-78f53bb2a4bc/col_customchannel.png)

最多可设 18 个自定义物体响应通道或轨迹响应通道。

### 预设

打开 **Preset** 类目点击 **New...** 按钮可进行自定义预设。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c262e9a-bedc-48ea-9fa5-e8fdfe94ff84/col_custompresets.png)

在此可为预设命名、启用或禁用碰撞、选择预设的物体类型、最后为选中的物体类型定义每个响应通道的行为。

-   [collision](https://dev.epicgames.com/community/search?query=collision)
-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [预设](/documentation/zh-cn/unreal-engine/add-a-custom-object-type-to-your-project-in-unreal-engine#%E9%A2%84%E8%AE%BE)