# 虚幻引擎中的时间轴节点 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:06.859Z

---

目录

![时间轴节点](https://dev.epicgames.com/community/api/documentation/image/87ac7d9c-6f8e-4c2a-b0cf-63aa1d382af6?resizing_type=fill&width=1920&height=335)

## Get Play Rate（获得播放速率）

**Get Play Rate（获得播放速率）** 节点返回输入时间轴的当前播放速率。该数值作为浮点值返回。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a1fd804-84da-485c-aadf-963a7103025f/get_playrate.png)

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

**输出**

 

 

**Return Value（返回值）**

浮点型

输出时间轴的当前播放速率。

## Get Playback Position（获得播放位置）

**Get Playback Position（获得播放位置）** 节点返回当前的播放位置，或输入时间轴上的当前时刻的时间。该数值作为浮点值返回。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/314d1cb7-007b-44f3-a76d-f2dc2bdac631/get_playback_position.png)

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

**输出**

 

 

**Return Value（返回值）**

浮点型

输出时间轴的当前播放位置。

## Get Timeline Length（获得时间轴长度）

**Get Timeline Length（获得时间轴长度）** 节点返回输入时间轴的总长度，以浮点型值返回。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8f9de14-93d3-4d9f-9b61-064a04a70046/get_timeline_length.png)

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

**输出**

 

 

**Return Value（返回值）**

浮点型

输出时间轴的总播放长度。

## Is Looping（是否循环）

**Is Looping（是否循环）** 节点返回一个布尔值，如果输入时间轴正在循环则返回True,如果输入时间轴没有循环，则返回False。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8054cc4-e49c-4b8d-ab99-f471f375e68e/is_looping.png)

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

**输出**

 

 

**Return Value（返回值）**

布尔型

输出Looping(循环)属性的值。

## Is Playing（是否正在播放）

**Is Playing（是否正在播放）** 节点返回一个布尔值，如果输入时间轴正在播放则返回True,如果输入时间轴没有播放，则返回False。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5ac1d84-204e-4e33-ae28-5ce406907af9/is_playing.png)

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

**输出**

 

 

**Return Value（返回值）**

布尔型

输出是否正在播放该时间轴。

## Is Reversing(是否正在反向播放)

**Is Reversing（是否正在反向播放）** 节点返回一个布尔值，如果输入时间轴正在反向播放则返回True,如果输入时间轴没有反向播放，则返回False。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5dd76da-6621-47f1-8583-b22fddca0d00/is_reversing.png)

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

**输出**

 

 

**Return Value（返回值）**

布尔型

输出是否正在反向播放该时间轴。

## Play（播放）

**Play（播放）** 节点通知输入时间轴开始从当前播放位置处开始播放。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa6ebfbd-7a0a-4d46-bbe8-8aedcdca5cb2/play01.png)

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

## Play from Start（从开始处播放）

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df53652b-5edb-4e30-9bf6-d0a32cc8ded5/play_from_start.png)

**Play from Start（从开始处播放）** 节点通知输入时间轴开始从时间轴的开始处开始播放。

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

## Reverse(反向播放)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99741d62-0d1b-48dd-849d-f0c8883b4677/reverse01.png)

**Reverse（反向播放）** 节点通知输入时间轴开始从当前播放位置处开始反向播放。

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

## Reverse from End(从结尾处开始反向播放)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a93e7e9d-602e-46fb-afea-b68d6f26fa83/reverse_from_end.png)

**Reverse from End(从结尾处开始反向播放)** 节点通知输入时间轴开始从结尾处开始反向播放。

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

## Set Looping(设置循环)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9b27b21-0305-475a-b56a-ca7ecc27a3d9/set_looping.png)

**Set Looping（设置循环）** 节点取入一个输入时间轴和一个布尔值。它将时间轴的Looping属性设置为该布尔型值。

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

**New Looping（新循环）**

布尔型

用于设置时间轴的循环状况的值。

## Set New Time（设置新时间）

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ffb9ca8-5a6c-4882-b4e7-e066ecda43bb/set_new_time.png)

**Set New Time（设置新时间）** 节点取入一个输入时间轴和一个布尔值。它将时间轴的New Time属性设置为浮点型的值。

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

**New Time（新时间）**

浮点型

用于设置新的播放位置。

## Set Play Rate（设置播放速率）

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59260c9a-cc5e-471e-b39b-7390a1eef253/set_play_rate.png)

**Set New Time（设置播放速率）** 节点取入一个输入时间轴和一个浮点型的值。它将时间轴的Play Rate（播放速率）属性设置为该浮点型的值。

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

**New Rate（新速率）**

浮点型

用于设置新的播放速率。

## Set Playback Position（设置播放位置）

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a0c0ae5-107c-47de-a647-55de0c6f6255/set_playback_position.png)

**Set Playback Position（设置播放位置）** 节点取入一个输入时间轴、一个浮点型值和一个布尔值。它让时间轴的Playback Position(播放位置)属性跳转到浮点型值处。如果时间轴中有任何事件轨道，那么则使用该布尔值来决定是否触发它们。

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

**New Position（新位置）**

浮点型

用于跳转到新的播放位置处。

**Fire Events（触发事件）**

布尔型

用于控制是否触发跳过的任何事件(任何事件轨道上的事件)。

## Set Timeline Length(设置时间轴长度)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da630cb0-833f-46c2-9804-9fe1cc1236a3/set_timeline_length.png)

**Set Timeline Length（设置时间轴长度）** 节点设置时间轴的总播放长度。

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

**New Length（新长度）**

浮点型

用于设置新的播放长度。

## Set Timeline Length Mode（设置时间轴长度模式）

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0393d30-68fb-41f5-8c5f-a75534356f04/set_timeline_lengthmode.png)

**Set Timeline Length Mode（设置时间轴长度模式）** 节点设置时间轴的Length Mode(长度模式)属性。这允许您在播放完整的时间轴和仅播放到最后一个关键帧之间切换。

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

**New Length Mode(新的长度模式)**

字节型

设置播放模式为"Timeline Length（时间轴长度）"或"Last Keyframe（最后一个关键帧）"

## Stop（停止）

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07da85dd-c535-4c52-9602-1518d7572dce/stop01.png)

**Stop（停止）** 节点停止播放输入时间轴节点。

**名称**

**类型**

**描述**

**输入**

 

 

**Target（目标）**

时间轴组件

取入一个时间轴变量

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Get Play Rate（获得播放速率）](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#getplayrate%EF%BC%88%E8%8E%B7%E5%BE%97%E6%92%AD%E6%94%BE%E9%80%9F%E7%8E%87%EF%BC%89)
-   [Get Playback Position（获得播放位置）](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#getplaybackposition%EF%BC%88%E8%8E%B7%E5%BE%97%E6%92%AD%E6%94%BE%E4%BD%8D%E7%BD%AE%EF%BC%89)
-   [Get Timeline Length（获得时间轴长度）](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#gettimelinelength%EF%BC%88%E8%8E%B7%E5%BE%97%E6%97%B6%E9%97%B4%E8%BD%B4%E9%95%BF%E5%BA%A6%EF%BC%89)
-   [Is Looping（是否循环）](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#islooping%EF%BC%88%E6%98%AF%E5%90%A6%E5%BE%AA%E7%8E%AF%EF%BC%89)
-   [Is Playing（是否正在播放）](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#isplaying%EF%BC%88%E6%98%AF%E5%90%A6%E6%AD%A3%E5%9C%A8%E6%92%AD%E6%94%BE%EF%BC%89)
-   [Is Reversing(是否正在反向播放)](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#isreversing\(%E6%98%AF%E5%90%A6%E6%AD%A3%E5%9C%A8%E5%8F%8D%E5%90%91%E6%92%AD%E6%94%BE\))
-   [Play（播放）](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#play%EF%BC%88%E6%92%AD%E6%94%BE%EF%BC%89)
-   [Play from Start（从开始处播放）](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#playfromstart%EF%BC%88%E4%BB%8E%E5%BC%80%E5%A7%8B%E5%A4%84%E6%92%AD%E6%94%BE%EF%BC%89)
-   [Reverse(反向播放)](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#reverse\(%E5%8F%8D%E5%90%91%E6%92%AD%E6%94%BE\))
-   [Reverse from End(从结尾处开始反向播放)](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#reversefromend\(%E4%BB%8E%E7%BB%93%E5%B0%BE%E5%A4%84%E5%BC%80%E5%A7%8B%E5%8F%8D%E5%90%91%E6%92%AD%E6%94%BE\))
-   [Set Looping(设置循环)](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#setlooping\(%E8%AE%BE%E7%BD%AE%E5%BE%AA%E7%8E%AF\))
-   [Set New Time（设置新时间）](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#setnewtime%EF%BC%88%E8%AE%BE%E7%BD%AE%E6%96%B0%E6%97%B6%E9%97%B4%EF%BC%89)
-   [Set Play Rate（设置播放速率）](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#setplayrate%EF%BC%88%E8%AE%BE%E7%BD%AE%E6%92%AD%E6%94%BE%E9%80%9F%E7%8E%87%EF%BC%89)
-   [Set Playback Position（设置播放位置）](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#setplaybackposition%EF%BC%88%E8%AE%BE%E7%BD%AE%E6%92%AD%E6%94%BE%E4%BD%8D%E7%BD%AE%EF%BC%89)
-   [Set Timeline Length(设置时间轴长度)](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#settimelinelength\(%E8%AE%BE%E7%BD%AE%E6%97%B6%E9%97%B4%E8%BD%B4%E9%95%BF%E5%BA%A6\))
-   [Set Timeline Length Mode（设置时间轴长度模式）](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#settimelinelengthmode%EF%BC%88%E8%AE%BE%E7%BD%AE%E6%97%B6%E9%97%B4%E8%BD%B4%E9%95%BF%E5%BA%A6%E6%A8%A1%E5%BC%8F%EF%BC%89)
-   [Stop（停止）](/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine#stop%EF%BC%88%E5%81%9C%E6%AD%A2%EF%BC%89)