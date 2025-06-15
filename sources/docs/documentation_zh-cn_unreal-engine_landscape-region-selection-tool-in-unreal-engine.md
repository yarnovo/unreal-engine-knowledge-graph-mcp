# 虚幻引擎地形区域选择工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-region-selection-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:12:57.868Z

---

目录

![地形区域选择工具](https://dev.epicgames.com/community/api/documentation/image/c4d9c42c-28c2-4afd-af12-74e7b2804e81?resizing_type=fill&width=1920&height=335)

**区域选择（Region Selection）** 工具使用当前的笔刷设置和工具强度选择区域，用于将地形 [小工具](/documentation/zh-cn/unreal-engine/landscape-copy-tool-in-unreal-engine) 匹配到特定区域， 或用作复制数据到小工具（或从小工具复制数据）的遮罩。

## 使用区域选择工具

在此例中将利用默认正数法使用区域选择工具绘制地形区域；然后再切换至负数法，对不需要包括的区域进行位置；最终显示 Use Region As Mask 部分， 采集被绘制的整个地形组件，而非只采集其中的区域。

使用以下控制键绘制可用于选择的区域：

**功能键**

**操作**

**鼠标左键**

添加到所选区域。

**Shift + 鼠标左键**

从所选区域移除。

![无选中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c926cb79-6c6f-461a-9644-67ad97723dff/01-without-selection.png "Without Selection")

![有选中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/255e5b5a-e635-4600-aa80-fff18c224960/02-with-selection.png "With Selection")

无选中

有选中

在此例中，一个区域已被绘制进行选择，然后可用于遮罩层或与复制/粘贴工具共用。

## 工具设置

![Landscape Select button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2369d6eb-205f-440a-a964-72aa26f46a6c/03-landscape-select-button.png "Landscape Select button")

![Selection tool properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4854dc1f-8f2f-4544-a872-853727a38f85/04-selection-tool-properties.png "Selection tool properties")

 

 

**属性**

**描述**

**Clear Region Selection**

清楚当前选中的区域。

**Tool Strength**

设定每次笔刷笔划效果的量。

**Use Region as Mask**

勾选后，区域选择将成为活动区域（由所选区域构成）的遮罩。

![Region Selection](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9216e05e-5395-4f08-b22e-dd0615d998f8/05-region-selection.png "Region Selection")

 

**Negative Mask**

此项与 **Use Region as Mask** 同时勾选后，区域选择将成为一个遮罩，但活动区域由未选中的区域构成。

![Region Mask Negative Selection](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/703e39a1-313c-48e8-bf98-8c83f1d5d14c/06-region-mask-negative-selection.png "Region Mask Negative Selection") 

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [region](https://dev.epicgames.com/community/search?query=region)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用区域选择工具](/documentation/zh-cn/unreal-engine/landscape-region-selection-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%8C%BA%E5%9F%9F%E9%80%89%E6%8B%A9%E5%B7%A5%E5%85%B7)
-   [工具设置](/documentation/zh-cn/unreal-engine/landscape-region-selection-tool-in-unreal-engine#%E5%B7%A5%E5%85%B7%E8%AE%BE%E7%BD%AE)