# 虚幻引擎中的地形蓝图笔刷 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:12:29.156Z

---

目录

![地形蓝图笔刷](https://dev.epicgames.com/community/api/documentation/image/37ee65c3-a522-425d-8146-fcf19e3a05bd?resizing_type=fill&width=1920&height=335)

地形蓝图笔刷提供了用户定义的造型笔刷堆栈，其支持非破坏性操纵。因此，堆栈中的低层笔刷若发生变化，变化也将自动流入堆栈上方的笔刷。这些笔刷可用于将多个地貌操纵彼此叠加，同时让各个操纵相互分离，必要时用户可以围绕地貌重新排列或在移动地貌。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7c0b315-9d76-4550-b0aa-89f60c3af9f7/non_destructive.gif)

要使用地形蓝图笔刷，必须在插件浏览器中启用Landmass插件，并在创建地形时选中 **启用编辑图层（Enable Edit Layers）** 。

**在插件浏览器中启用Landmass插件的方法：**

1.  从主菜单打开插件浏览器。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82eb2bc3-87a5-45c8-8609-2247ea858533/pluginsbrowser.png)
2.  搜索 *Landmass* 并点击 **启用（Enable）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f5b994b-91c8-4ae7-92ea-322c573d1eaa/landmassplugin_enabled.png)

**在创建地形时启用编辑图层的方法：**

-   在 **新地形（New Landscape）** 分段中勾选 **启用编辑图层（Enable Edit Layers）** 属性。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e868b550-a627-496b-a7b1-c061e5cb71a8/enableeditlayers.png)

## 将地形蓝图笔刷添加到编辑图层

**将新地形蓝图笔刷添加到现有编辑图层的方法：**

1.  在关卡编辑器工具栏中选择地形模式后，选择"造型（Sculpt）"选项卡，并从可用造型工具选择 **蓝图（Blueprint）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c74bd13-a6fb-4016-9d71-2f6da3ebf980/selectblueprinttool.png)
2.  点击 **蓝图笔刷（Blueprint Brush）** 下拉菜单，选择一种可用的笔刷类型。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7989cfc-7c3f-477f-9bae-1f682e94b841/blueprintbrushselect.png)
3.  在视口中，点击地形以添加新笔刷。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52077941-081a-4049-8489-8a40212bfe48/newbrush.png)

## 内置地形蓝图笔刷类型

### CustomBrush\_Landmass笔刷

CustomBursh\_Landmass笔刷从用户定义的样条线形状和可配置效果集合（例如侵蚀、旋度噪点和置换）生成地块形状，并将生成的形状应用于地貌

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d17cd83-f3ed-474a-b57f-a240d04f8708/falloff_angle_45.png)

#### 混合模式

混合模式将确定形状如何添加到或剪切到地貌中，类似于CSG或布尔运算。 有四种混合模式可用：

混合模式

说明

Alpha混合

同时生成地块形状的常规和反转版本，并将反转形状应用于位于底层地貌下面的部分，从而升高和降低地貌。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e24c0adc-d8fc-492c-8494-472cc932d9d4/blend_alpha.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e24c0adc-d8fc-492c-8494-472cc932d9d4/blend_alpha.png)

最小值

生成地块形状的反转版本，并仅应用位于底层地貌下面的部分，从而降低地貌。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60543aa4-f07e-4955-9718-d5264620c4cd/blend_min.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60543aa4-f07e-4955-9718-d5264620c4cd/blend_min.png)

最大值

仅应用地块形状中位于底层地貌上方的部分，从而升高地貌。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f17d74fb-f593-412f-b205-d18eda12a119/blend_max.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f17d74fb-f593-412f-b205-d18eda12a119/blend_max.png)

叠加

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2002c4ea-8497-440b-b25d-49b6396819fe/blend_additive.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2002c4ea-8497-440b-b25d-49b6396819fe/blend_additive.png)

#### 形状限制

Landmass笔刷生成的形状可以限顶或不限顶。如果形状限顶，则效果类似于平顶高原。如不限顶，则形状类似于有尖顶的山峰或山丘。

 

 

![启用形状限顶](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c19f26d-fe91-4037-9c1a-9427d0d142fa/capshape.png)

![Cap Shape disabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0981771-d00c-4e76-aafa-27ab54889fc7/capshape_disabled.png)

启用形状限顶

禁用形状限顶

#### 衰减

衰减将决定从笔刷形状到底层地貌的过渡斜面。

属性

说明

角度

[见下文](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#%E8%A7%92%E5%BA%A6)

宽度

[见下文](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#%E5%AE%BD%E5%BA%A6)

##### 角度

衰减斜面由指定角度决定。衰减角度越大，斜面越陡峭。对不限顶的形状而言，形状内部也会持续衰减，从而形成山峰的形状

 

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33484bf5-dbfa-4061-af7e-b9cfd7463cab/falloff_angle_30.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f94b7a3f-096d-40a7-9549-e52608a0c1c1/falloff_angle_45.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f30745b-58f9-4b85-83aa-49cc90b93a25/falloff_angle_60.png)

30度

45度

60度

###### 宽度

指定距离（虚幻单位）可决定衰减斜面。衰减距离越短，斜面越陡峭。

 

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad68b0b6-4622-4a81-b573-0dc2ca9399f2/falloff_width_100.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d44ad2ec-9741-4d79-8eb4-1ef8ee62cfb1/falloff_width_200.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b0a2ce8-ace6-42c4-a5e3-3e437df07d84/falloff_width_400.png)

100个单位

200个单位

400个单位

#### 噪点

噪点能将最多两个倍频的旋度噪点应用于生成的地块形状。

属性

说明

旋度\[1/2\]强度

[见下文](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#%E6%97%8B%E5%BA%A6%E5%BC%BA%E5%BA%A6)

旋度\[1/2\]平铺

[见下文](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#%E6%97%8B%E5%BA%A6%E5%B9%B3%E9%93%BA))

##### 旋度强度

设置应用于地块形状的噪点振幅。

 

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad017c3c-3abe-4583-b798-11fececefb6b/noise_strength_0.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f54f7840-e2d5-4a10-9505-a416bdf7ed34/noise_strength_1.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aacfaa04-a316-4e64-abc6-95c005de75dd/noise_strength_2.png)

强度0

强度1

强度2

##### 旋度平铺

设置应用于地块形状的噪点频率。

 

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1906c6b0-ef42-444e-a6cc-5d614a2ccc92/noise_frequency_0.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03367911-d2da-4e3c-8f03-eed6c73dcec1/noise_frequency_5.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4c82aae-e109-4566-bdea-c6e797790efd/noise_frequency_15.png)

平铺0

平铺5

平铺15

### CustomBrush\_LandmassRiver笔刷

CustomBrush\_LandmassRiver笔刷将沿用户定义的样条线挤压静态网格体，并升高或降低地貌以匹配挤压的网格体。此笔刷很适合为道路或河流布局，使地貌自动调整以匹配。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a8965e3-0ede-41e2-a014-b109ed6e5595/landmass_river.png)

### CustomBrush\_MaterialOnly笔刷

CustomBrush\_MaterialOnly笔刷将使用材质将流程性噪点应用于整个地貌，以形成基础。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/245fc616-918f-406e-bfb9-348f1e7eb2aa/materialonly_noise.png)

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [sculpting](https://dev.epicgames.com/community/search?query=sculpting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [将地形蓝图笔刷添加到编辑图层](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#%E5%B0%86%E5%9C%B0%E5%BD%A2%E8%93%9D%E5%9B%BE%E7%AC%94%E5%88%B7%E6%B7%BB%E5%8A%A0%E5%88%B0%E7%BC%96%E8%BE%91%E5%9B%BE%E5%B1%82)
-   [内置地形蓝图笔刷类型](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#%E5%86%85%E7%BD%AE%E5%9C%B0%E5%BD%A2%E8%93%9D%E5%9B%BE%E7%AC%94%E5%88%B7%E7%B1%BB%E5%9E%8B)
-   [CustomBrush\_Landmass笔刷](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#custombrush-landmass%E7%AC%94%E5%88%B7)
-   [混合模式](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F)
-   [形状限制](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#%E5%BD%A2%E7%8A%B6%E9%99%90%E5%88%B6)
-   [衰减](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#%E8%A1%B0%E5%87%8F)
-   [角度](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#%E8%A7%92%E5%BA%A6)
-   [宽度](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#%E5%AE%BD%E5%BA%A6)
-   [噪点](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#%E5%99%AA%E7%82%B9)
-   [旋度强度](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#%E6%97%8B%E5%BA%A6%E5%BC%BA%E5%BA%A6)
-   [旋度平铺](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#%E6%97%8B%E5%BA%A6%E5%B9%B3%E9%93%BA)
-   [CustomBrush\_LandmassRiver笔刷](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#custombrush-landmassriver%E7%AC%94%E5%88%B7)
-   [CustomBrush\_MaterialOnly笔刷](/documentation/zh-cn/unreal-engine/landscape-blueprint-brushes-in-unreal-engine#custombrush-materialonly%E7%AC%94%E5%88%B7)