# 在虚幻引擎中设置旁观者屏幕模式 TexturePlusEye布局 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/set-spectator-screen-mode-texture-plus-eye-layout-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:44:29.648Z

---

目录

![设置旁观者屏幕模式 TexturePlusEye布局](https://dev.epicgames.com/community/api/documentation/image/624eccfb-ac23-4ee2-b509-fb0e94e3d713?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd25beef-7220-43ba-ba9d-2b9fd033969e/setspectatorscreenmodetexturepluseyelayoutnode.png)

此节点在 `ESpectatorScreenMode` 中设置 `TexturePlusEye` 函数的布局。

**输入**

引脚位置

命名

描述

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2bc0215-c6c9-49a5-bbac-be442eacfc57/setspectatorscreenmodetexturepluseyelayoutnode_1.png)

(In) Exec

输入执行引脚。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/079f63dc-3b0c-4941-be68-a2f5c8439b2d/setspectatorscreenmodetexturepluseyelayoutnode_2.png)

Eye Rect Min

一个矢量 2D 结构，设置绘制眼睛的画面矩形的最小位置。

值被规格化至 `0.0` 和 `1.0` 之间。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0197b337-bbcb-45d8-8e25-8277460ba9e5/setspectatorscreenmodetexturepluseyelayoutnode_3.png)

Eye Rect Max

一个矢量 2D 结构，设置绘制眼睛的画面矩形的最大位置。

值被规格化至 `0.0` 和 `1.0` 之间。

  

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88aaea81-b352-4061-92fa-9d80d3dc6e72/setspectatorscreenmodetexturepluseyelayoutnode_4.png)

Texture Rect Min

一个矢量 2D 结构，设置绘制纹理的画面矩形的最小位置。

值被规格化至 `0.0` 和 `1.0` 之间。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13ba175c-a986-4373-b46c-bcdc483c58b1/setspectatorscreenmodetexturepluseyelayoutnode_5.png)

Texture Rect Max

一个矢量 2D 结构，设置绘制纹理的画面矩形的最大位置。

值被规格化至 `0.0` 和 `1.0` 之间。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e70a7ff-f8c7-44fe-bbee-4efb64880566/setspectatorscreenmodetexturepluseyelayoutnode_6.png)

Draw Eye First

如果此标记设为 `True`，则眼睛在纹理之前被绘制；如此标记设为 false，纹理将在眼睛之前被绘制。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ff90511-6681-4c9f-8d24-57d3fb63307c/setspectatorscreenmodetexturepluseyelayoutnode_7.png)

Clear Black

如果此标记设为 `True`，任意矩形被绘制之前渲染目标将被绘制为黑色。

**输出**

引脚位置

命名

描述

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00f440c6-b22c-4c28-8830-dd60a05eaeed/setspectatorscreenmodetexturepluseyelayoutnode_8.png)

(Out) Exec

输出执行引脚。

-   [vr](https://dev.epicgames.com/community/search?query=vr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)