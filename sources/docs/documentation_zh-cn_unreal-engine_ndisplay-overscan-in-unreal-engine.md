# 虚幻引擎nDisplay过扫描 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/ndisplay-overscan-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:03.318Z

---

目录

![nDisplay过扫描](https://dev.epicgames.com/community/api/documentation/image/d6b651d7-612e-41c0-93c9-e96a03347021?resizing_type=fill&width=1920&height=335)

在使用nDisplay进行群集渲染并启用后期效果时，（过扫描有助于）在多个渲染节点上实现像素级别的完美渲染连续性。通过在各个方向（可配置）上实现过扫描（过扫描），然后用曝光量裁剪掉额外的渲染像素，用户可以找出最适合他们项目的（视觉精度-性能）比。

现在，你可以在大多数nDisplay项目中启用高品质视觉效果，例如泛光、AO或动态模糊，但需要一些性能开销（可配置），且影响程度保持在较小范围内。

## 局限性

-   应保持禁用自动曝光，因为过扫描不能解决这个问题。
-   后期效果的范围不超过设定的过扫描百分比时，该技术效果最好。百分比可以是任意值。它旨在减少或尽量减少视觉差异。
-   该实现适用所有项目策略。

## 支持的渲染特性

特性

nDisplay兼容性

解决方案

注\*

视觉影响

累加缓存区

ICVFX兼容性

Rendering / Post Effects

 

 

 

 

 

 

[Bloom](/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine)

是\*

过扫描

 

高

否

是

[镜头炫光](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)

否

避免

 

高

否

是

[自动曝光（眼部适应）](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine)

否

避免

将分离逻辑类型。

高

是

是

[Motion Blur](/documentation/zh-cn/unreal-engine/content-examples-sample-project-for-unreal-engine)

是\*

过扫描

 

中

否

是，但无法很好地用于过场动画。

[Depth of Field (DoF)](/documentation/zh-cn/unreal-engine/depth-of-field-in-unreal-engine)

否t Tested

避免

 

 

 

 

[屏幕空间环境光遮蔽（SSAO）](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine#ambientocclusion)

是\*

过扫描

Keep radius small

中

否

是

[时序抗锯齿（TAA）](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)

是\*

过扫描

 

低

是

是

[屏幕空间反射（SSR）](/documentation/zh-cn/unreal-engine/screen-space-reflections-in-unreal-engine)

否

避免

 

高

是

是

[屏幕空间全局光照（SSGI）](/documentation/zh-cn/unreal-engine/screen-space-global-illumination-in-unreal-engine)

否

避免

 

高

是

是

[暗角效果](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)

是\*

N/A

 

中

否

是

[场景边缘效果（色差）](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)

是\*

避免

保持小半径

低

否

是

[光追（降噪器）](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-in-unreal-engine#evaluatingdenoiserquality)

否

 

 

低

否

应该能工作，但噪点是非确定性的。

Rendering / Other

 

 

 

 

 

 

[平面反射](/documentation/zh-cn/unreal-engine/planar-reflections-in-unreal-engine)

是\*

N/A

用户可以自定义FOV设置。

高

否

是

[天空大气](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-in-unreal-engine)

是

N/A

固定

高

否

是

[基于材质（着色器）时间的动画](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine#time)

是

 

 

 

有时

 

[阴影](/documentation/zh-cn/unreal-engine/shadowing-in-unreal-engine)

是

 

 

 

否

 

[裁剪](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine)

是

 

 

 

否

 

[UMG - 2D](/documentation/zh-cn/unreal-engine/umg-editor-reference-for-unreal-engine)

否

 

 

 

否

 

Gameplay

 

 

 

 

 

 

[Sequencer](/documentation/zh-cn/unreal-engine/real-time-compositing-with-sequencer-in-unreal-engine)

是

N/A

N/A

高

否

是

[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)

是/否

避免"随机"

可以使用种子随机。此外，蓝图重新构建时，会产生 BeginPlay 无法运行的问题。

高

有时

是

[物理（Chaos解算器）IK刚体布料](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine)

是

是

 

高

否

是

[Cascade / Niagara粒子系统](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)

是

N/A

对于发射器来说，决定性设置必须被设置为ON。

高

有时

是

Media / Playback

 

 

 

 

 

 

[视频/图像序列](/documentation/zh-cn/unreal-engine/media-framework-in-unreal-engine)

N/A

N/A

视频引擎目前无法实现帧精确。

高

否

 

[视频I/O、BM、Aja](/documentation/zh-cn/unreal-engine/professional-video-io-in-unreal-engine)

N/A

N/A

N/A

高

否

 

[NDI/SMPTE 2110](/documentation/zh-cn/unreal-engine/media-framework-overview-for-unreal-engine#streammediasource)

N/A

N/A

需要测试帧准确性。

高

否

 

\* 该特性只能在限制范围内运作。例如，泛光只能在小/中程度的泛光辐射下使用，无法用于大型泛光——因为这在性能-品质比例方面没有太大意义。关于各个特性的进一步说明，请参考注释。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [局限性](/documentation/zh-cn/unreal-engine/ndisplay-overscan-in-unreal-engine#%E5%B1%80%E9%99%90%E6%80%A7)
-   [支持的渲染特性](/documentation/zh-cn/unreal-engine/ndisplay-overscan-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E6%B8%B2%E6%9F%93%E7%89%B9%E6%80%A7)