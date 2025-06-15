# 编辑虚幻引擎中的时间轴 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/editing-timelines-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:07.830Z

---

目录

![编辑时间轴](https://dev.epicgames.com/community/api/documentation/image/ec6029a5-e07b-4bfb-ab4c-6d1563524fec?resizing_type=fill&width=1920&height=335)

**时间轴** 可以通过对 **图表** 选项卡的时间轴节点 **双击** 来编辑，或者在 **My Blueprint（我的蓝图）** 选项卡的时间轴内进行编辑。 这样会在新选项卡中打开 **时间轴编辑器**。

## 时间轴编辑器

![Blueprint Timeline Editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7d55b2c-8ca8-4d8d-ab36-6a164a8a6c3a/k2_timeline_editor.png)

按钮/选框

描述

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f6e80e2-575d-422f-9a36-168ffe057f35/add_float_track_button.png)

添加新的浮点轨道到时间轴，以对标量浮点值进行动画处理。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40a39852-5071-4b52-bddc-c54000cb989e/add_vector_track_button.png)

添加新的向量轨道到时间轴，以对浮点向量值（例如旋转值或平移值）进行动画处理。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3bfeaa0c-ace7-4cd1-9451-5f11cb2d92af/add_event_track_button.png)

添加一个事件轨道，该轨道会提供另一个执行输出引脚，此引脚将在轨道的关键帧时间处被触发。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87306c8f-d6bd-43d9-b1df-14f2333e2a66/add_color_track_button.png)

添加新的线性颜色轨道到时间轴，以对颜色进行动画处理。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4544df5-d21f-46a4-bbff-e89f32de14ce/add_external_curve_button.png)

添加外部曲线到时间轴。 此按钮仅在 **Content Browser（内容浏览器）** 中选择外部曲线后才能被激活。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3fd1e0f-768d-4401-8948-eec1b030509c/timeline_length_button.png)

该按钮使您能为此时间轴设置回放长度。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/666d1107-ac49-472f-8aec-c2cc17e912ce/last_keyframe_button.png)

如此按钮未激活，将忽略序列的最后关键帧。 这可以帮助防止动画循环时被跳过。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ef2c86e-62fe-473e-9b43-559b287c7ccf/autoplay_button.png)

如启用该按钮，此时间轴节点无需输入即可开始，而且将在关卡一开始就开始播放。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af55cf49-3736-42fd-8aaa-ef1465427647/loop_button.png)

如启用该按钮，除非通过Stop输入引脚来停止，时间轴动画将会无限制地重复播放。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1c5d96c-982a-42a5-9601-7e775d897fc1/replicated_button.png)

如启用，时间轴动画将跨客户端被复制。

## 添加轨道

时间轴使用 **轨道** 来定义单个数据的动画。 可以为浮点值，向量值，颜色值或事件。 轨道可通过点击 **Add Track** （添加轨道）按钮之一来添加到时间轴。 举例来说，点击![Blueprint Timeline - Add Float Track Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dfcfb44-cab9-4913-8567-874475aa20ec/add_float_track_button.png)按钮来添加轨道并为新轨道输入名称。 按下 **回车** 来为您的新浮点轨道保存名称。

![Blueprint Timeline - Add Float Track](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7dc31809-2d54-4f5e-a23c-8871f0f7f382/k2_timeline_track_float.png)

1.  **Track Name** （轨道名称）-您可以在任何时候为此区域内的轨道输入新名称。
2.  **External Curve group** （外部曲线组）-使您可以从 **内容浏览器** 中选择外部曲线资源，而不用创建您自己的曲线。
3.  **Track timeline** （轨道时间轴）- 此轨道的关键帧图表。 您可以把关键帧放置到这里，并且您将看到作为运算结果的插值曲线。

## 添加关键帧

当您放置完轨道后，您可以开始添加关键帧以定义您的动画。

如需了解更多时间轴关键帧及曲线的信息，请参阅[关键帧及曲线页面](/documentation/zh-cn/unreal-engine/keys-and-curves-in-unreal-engine)。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b39559e6-2fa1-4c26-a5fa-264a9903dee1/k2_timeline_track_key_add.png)

在您完成编辑轨道后，该轨道的数据或事件执行将由与轨道名称相同的数据或执行引脚来输出。

![Blueprint Timelines - Track Data Output](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d314985d-be1c-40ab-bc20-9e980cc2b774/k2_timeline_node.png)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [时间轴编辑器](/documentation/zh-cn/unreal-engine/editing-timelines-in-unreal-engine#%E6%97%B6%E9%97%B4%E8%BD%B4%E7%BC%96%E8%BE%91%E5%99%A8)
-   [添加轨道](/documentation/zh-cn/unreal-engine/editing-timelines-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E8%BD%A8%E9%81%93)
-   [添加关键帧](/documentation/zh-cn/unreal-engine/editing-timelines-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%85%B3%E9%94%AE%E5%B8%A7)