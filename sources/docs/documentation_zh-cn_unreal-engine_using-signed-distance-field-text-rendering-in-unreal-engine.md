# Using Signed Distance Field Text Rendering in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-signed-distance-field-text-rendering-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:18:46.342Z

---

目录

![Signed Distance Field Text Rendering](https://dev.epicgames.com/community/api/documentation/image/0fc599ea-dade-49b3-9f11-f999638a7564?resizing_type=fill&width=1920&height=335)

In Unreal Engine (UE) 5.5 and newer, you can use **signed distance field-based text rendering** for any UI (user interface) text. This includes **conventional signed distance fields** and **multi-channel signed distance fields (MSDF)**, which preserve sharp corners.

A signed distance field is a resolution-independent approximate representation of individual font glyphs stored in texture memory, which can be shaded to output the anti-aliased alpha mask of a glyph. Additionally, it can provide the signed distance to a material shader, which it can use for graphical effects. A signed distance is the distance to the closest edge point, with the sign specifying whether the origin point is inside (positive) or outside (negative).

![Signed Distance Field-based Text Render](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c50dc48-adad-48eb-abb3-1cce51fec014/sdf-text-render.png)

A signed distance field-based text render on the left, and the actual texture with the signed distance field on the right.

The distance field mode does not replace the previous text rendering pipeline but is offered as an alternative since it has pros and cons.

## Pros

-   Resolution independence means that a separate texture representation won't be needed for each glyph size (and also skew, outline size), potentially saving texture memory and performance.
-   Very large text can be rendered from a low resolution distance field at good quality, saving texture memory.
-   Using text outlines is significantly more efficient with distance fields, and doesn't require additional texture memory.
-   Enables distance-based material effects, such as outlines, glows, growth animations, and more.

## Cons

-   Computing distance fields is more computationally intensive than direct rasterization.
-   As a resolution-independent technique, it does not support hinting. This can negatively affect quality at small font sizes.
-   Distance fields are an approximation. Depending on their resolution, they may only be able to reproduce some glyph features with sufficient fidelity. Thin font faces and thin, delicate features, in general, are the most problematic. Consider if the font face you use suits distance field rendering.
-   The initial version does not support font faces with non-standard geometry.

We recommend you enable the distance field mode for very large or dynamically scaled text when using the same font face at a large number of different sizes or to take advantage of the signed distance in a material effect.

## Setup and Use

To get setup, follow these steps:

1.  Open **Project Settings > Engine > User Interface > UMG Fonts**.
    
2.  Enable the **Enable Distance Field Font Rasterization** setting.
    
    ![ Enable Distance Field Font Rasterization setting](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c49795a-ba92-4a07-bb2f-2b43f4d37301/enable-distance-field-font-rasterization.png)
3.  Open the font face asset you want to use distance field text rendering for.
    
4.  In the **Details** panel, locate the **Distance Field Mode** category, then enable the **Enable Distance Field Rendering** setting. When you enable the setting you can configure the quality levels for the single and multi-channel distance field resolution.
    
    ![Enable Distance Field Rendering setting](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/627729c7-85ed-411e-865d-b8245fead91b/enable-distance-field-rendering-setting.png)

## Configuration

When you enable this rendering mode, you can set the single-channel and multi-channel distance field resolutions for low, medium, and high quality levels. These resolutions are expressed in distance field pixels per "em" (em is a font face metric approximately representing the width of the letter "M").

You are able to preview the rendering output for all of the resolutions and both distance field types, as well as the "reference" appearance rasterized directly from vector geometry. Make sure that all quality levels are of acceptable quality for all relevant glyphs. Make sure to check potentially problematic glyphs which may contain thin or small features. As a rule of thumb, the distance field resolution should be high enough that at least one whole distance field pixel fits into each such small feature.

The distance field type (multi-channel, single-channel, and approximate) and used quality level is dictated by [device profiles](/documentation/zh-cn/unreal-engine/setting-up-device-profiles-in-unreal-engine), where it can be specified per-device. Set the following CVars in the device profile to customize which rasterization mode and quality level is used.

**CVar**

**Description**

`UI.SlateSDFText.RasterizationMode`

Rasterization mode or distance field type.

`UI.SlateSDFText.ResolutionLevel`

Distance field resolution quality level. Values are 1 (low), 2 (medium), and 3 (high-quality).

The following are valid values for `UI.SlateSDFText.RasterizationMode`.

**Value**

**Description**

**Bitmap**

Direct rasterization. This disables distance field rendering for the given device.

**Msdf**

Multi-channel signed distance field rendering. Uses one of the multi-channel resolutions.

**Sdf**

Conventional single-channel signed distance field rendering. Corners may appear rounded or chipped, mitered outlines won't be available.

**SdfApproximation**

A less precise version of Sdf. This provides similar quality but at a significantly lower performance cost. Recommended for less powerful devices, such as mobile phones.

You may also override the rasterization modes for a specific font face in that font asset's settings in the Unreal Editor.

## Material effects

For utilizing font signed distance in a material effect, you can use the new **Font Signed Distance** material node.

![Material Effect Node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/084ef620-afff-4083-9240-2ea3353ec0f8/material-effects.png)

Currently, the node has no inputs, and samples the text's signed distance at the current pixel. It provides the following outputs.

**Output**

**Description**

**Signed Distance**

The primary signed distance, expressed in "em"s. It is negative outside the glyphs and positive inside. When using a multi-channel signed distance field, this will be the perpendicular distance, which forms sharp rather than rounded miters around corners.

**Smooth Signed Distance**

The Euclidean signed distance, expressed in "em"s. Where negative represents the outside and positive inside. If a single-channel distance field is used, this value is the same as the primary Signed Distance.

**Pixel Distance Factor**

Value that can be used to convert the above signed distances from "em"s to screen pixels by multiplying them together. This can be typically used for anti-aliasing, by smoothly transitioning between two colors between `threshold distance - 0.5 px` and `threshold distance + 0.5 px`.

**Implicit Opacity**

The implicit opacity of the text when the signed distance is interpreted the same way as when rendering without a material. This can be used as a basis before additional effects are added.

The distance fields only provide a limited range of signed distances in and around the font glyphs. If your material effect requires distances further away from the glyph, you can force a distance field with a wider distance range by setting an outline for the text with a width similar to that of your effect.

By default, only the interior area of text is filled by the material. If your effect needs to draw around the text (for example, a glow effect), you should enable the new option **Material Is Stencil** in the text. When you enable the option, entire glyph quads are filled with the material, and your material needs to correctly set the opacity to stencil the glyph shapes. You can use the **Implicit Opacity** as described above, or you can do it in a custom way using the signed distances.

![Font Matrial](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/416b8356-a4a3-40f7-9e2a-c1383ac2c204/font-matrial.png)

-   [signed distance field fonts](https://dev.epicgames.com/community/search?query=signed%20distance%20field%20fonts)
-   [multi-channel signed distance field fonts](https://dev.epicgames.com/community/search?query=multi-channel%20signed%20distance%20field%20fonts)
-   [msdf fonts](https://dev.epicgames.com/community/search?query=msdf%20fonts)
-   [msdf text](https://dev.epicgames.com/community/search?query=msdf%20text)
-   [sdf fonts](https://dev.epicgames.com/community/search?query=sdf%20fonts)
-   [sdf text](https://dev.epicgames.com/community/search?query=sdf%20text)
-   [sdf font](https://dev.epicgames.com/community/search?query=sdf%20font)
-   [msdf font](https://dev.epicgames.com/community/search?query=msdf%20font)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Pros](/documentation/zh-cn/unreal-engine/using-signed-distance-field-text-rendering-in-unreal-engine#pros)
-   [Cons](/documentation/zh-cn/unreal-engine/using-signed-distance-field-text-rendering-in-unreal-engine#cons)
-   [Setup and Use](/documentation/zh-cn/unreal-engine/using-signed-distance-field-text-rendering-in-unreal-engine#setupanduse)
-   [Configuration](/documentation/zh-cn/unreal-engine/using-signed-distance-field-text-rendering-in-unreal-engine#configuration)
-   [Material effects](/documentation/zh-cn/unreal-engine/using-signed-distance-field-text-rendering-in-unreal-engine#materialeffects)