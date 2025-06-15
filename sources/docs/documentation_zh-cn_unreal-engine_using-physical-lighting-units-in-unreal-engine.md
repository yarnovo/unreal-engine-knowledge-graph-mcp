# 使用虚幻引擎中的物理光照单位 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-physical-lighting-units-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:14:34.160Z

---

目录

![物理光照单位](https://dev.epicgames.com/community/api/documentation/image/6941a79f-4f9a-4310-b90a-7a3b830be955?resizing_type=fill&width=1920&height=335)

**虚幻引擎**（UE）中的光源是使用基于物理的光照单位定义的，因此可以输入已知的可测量值来实现完全真实的光照效果。除了支持不同光照单位的光源类型外，针对[眼部适应（或自动曝光）](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine)的后期处理现在支持扩展范围的值，并用EV100（ISO 100）表示。有了基于物理的光照单位和自动曝光，无需使用"神奇"数字，也不需要美术用"肉眼"观察不同值，就可以更轻松地创建逼真的光照效果。

## 用于光照强度的光照单位

每种类型的光源在选中后，会在 **细节**面板中的 **强度（Intensity）** 值旁边显示基于物理的光照单位。

![Light Type Units](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81390a23-26d8-4d9c-a3de-25d6bd223d05/01-physical-light-units-options.png)

对于这些类型的光源，其强度显示如下：

-   **定向光源** 使用 **定向法线照度**，表示为 **勒克斯**，等于每平方米一个流明。
-   **天空光照** 和 **作为静态光源的自发光材质** 使用表示为 **每平方米烛光**（cd/m2）的照度。
-   **点光源**、**聚光源** 和 **矩形光源** 可以在以下光照单位之间选择：
    -   **烛光**（cd）是对一个球面度（sr）的立体角范围内均匀发出的发光强度的测量。例如，光源设置为1000 cd会在一米处测量到1000勒克斯。
    -   **流明**（lm）是对照射到一个球面体角度内的光通量的测量。在光度测定中，光通量（或发光能力）测量的是光照感知能力。无论分布情况如何（宽或窄），发出的总能量是相同的。
    -   **无单位** 是特定于引擎的光照强度值，保持与虚幻引擎4.19之前的引擎版本的兼容性。

### 定向光源

**定向光源** 模拟 **定向法线照度**，它表示在垂直于太阳光线的表面上，由直接太阳辐射的[**可见**](https://en.wikipedia.org/wiki/Light)部分产生的光线数量。[**照度**](https://en.wikipedia.org/wiki/Illuminance)以[**勒克斯**](https://en.wikipedia.org/wiki/Lux) (lx)表示。

### 自发光表面

自发光表面用 **每平方米烛光**（cd/m2）来表示，它指定在增加任何光照之前的像素照度。

#### 天空光照

**天空光照（Sky Light）** 使用像素强度乘以光照强度，所得结果即为总照度，在HDR中用cd/m2表示。例如，如果将HDR像素视为筛选器，这些像素范围是0-1.0，天空光照设置为强度1000 cd/m2，则产生的照度为1.0 \* 1000 cd/m2。

#### 作为静态光源的自发光材质

对于支持按Actor设置 **使用自发光实现静态光照** 的[应用于静态网格体的自发光材质](/documentation/zh-cn/unreal-engine/using-the-emissive-material-input-in-unreal-engine)，使用表面照度来将光照烘焙到场景中。

### 点光源、聚光源和矩形光源

对于 **点光源**、**聚光源** 和 **矩形光源**，您可以指定启用了 **逆平方衰减（Inverse Squared Falloff）** 的任意光源的单位类型。你可以使用光源的细节面板来将 **强度单位（Intensity Units）** 设置为 **烛光（Candela）**、**流明（Lumen）** 或 **无单位（Unitless）**。

**逆平方衰减（Inverse Squared Falloff）** 是基于物理的距离衰减，衰减半径仅限制所有三种光照单位类型支持的光照影响。禁用时，只有 **无单位（Unitless）** 可用。如果您不希望在光源附近有强光源，因此放置了低强度补充光源，则可以使用禁用了"逆平方衰减"（Inverse Squared Falloff）的光源。

![Selecting Light Type Units](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4948e6fb-33a8-4a15-a17d-4862aaa066cb/02-physical-light-units-select-units.png)

点光源、聚光源和矩形光源的默认单位类型可以在 **项目设置（Project Settings）>渲染（Rendering）>默认设置（Default Settings）** 中设置。

各种单位之间的关系如下所示：

-   1 cd=625个无单位
-   1 cd=1 lm/sr

请注意，光源强度用 **烛光** 定义时，不受椎角的影响。另一方面，光源强度用 **流明** 定义时，发光能力仅应用于受光源影响的立体角，用 **球面度**（sr）计算。

对于 **点光源**，受光源影响的立体角为4π sr：

-   照度（1 lm）≈49.7 \* 照度（1个无单位）
-   照度（1 cd）≈12.6 \* 照度（1 lm）

对于 **点光源**，立体角定义为2π \* (1 - cos(θ))，其中θ是光锥半角：

-   照度（1 lm）≈99.5 / (1 - cos(θ)) \* 照度（1个无单位）

对于默认椎体，θ = 44°，立体角大约为1.76 sr：

-   照度（1 lm）≈354 \* 照度（1个无单位），针对默认聚光源。
-   照度（1 cd）≈1.76 \* 照度（1 lm），针对默认聚光源。

如果以流明表示光源强度，则椎角越小，来自光源的表面照度越强。

对于 **矩形光源**，立体角定义为2π sr：

-   照度（1 lm）≈199 \* 照度（1个无单位）
-   照度（1 cd）≈3.14 \* 照度（1 lm）

## 提示和建议

下面是充分利用基于物理的光照工作流程的一些建议：

-   如果放置光照后导致图像变白，表示自动曝光范围可能过于局限。考虑增大 **自动曝光最大值EV100（Auto Exposure Max EV100）**（和 **柱状图最大值EV100（Histogram Max EV100）**）。
-   如果反光表面出现黑斑等瑕疵，表示场景颜色缓冲可能溢出。要解决这个问题，启用"项目设置"（Project Settings）中的 **应用预曝光后再写入场景颜色（Apply Pre-Exposure before writing to the scene color）**，或者减少场景中的光照亮度。
-   不要忘记场景已经应用了一些默认后期处理设置（即使不存在后期处理体积也是如此）。这些默认设置可能会对摄像机设置产生意想不到的影响。建议在场景中放入后期处理体积，这样您可以按需更改这些设置。
-   如果将项目设置更改为使用扩展默认亮度范围，则会破坏现有的曝光配置。您必须手动迁移/重新配置这些资源的设置，这样才可以安全地从流程起点开始操作。
-   自动曝光柱状图可能会受到稳定性问题的影响，场景中的一个微小变化会产生稍有不同的曝光值。为解决这个问题，将 **柱状图最小值（Histogram Min）** 和 **最大值（Max）** 范围降低到场景中实际使用的值左右。要查看使用值，请启用 **可视化HDR（Visualize HDR）** 显示标志。

## 一般注意事项

必须要特别注意的是，避免在资源和实例之间发生默认值传播问题。建议从另一个光源实例化的任意光源（通过蓝图或默认对象）保持与父代相同的光照单位。另一方面，已在使用的光源不应更改其单位。这样可以保证更改默认值会产生预期行为，并正确传播到实例，有助于防止破坏现有实例。

点光源、聚光源和矩形光源的默认项目 **光照单位** 可以在 **项目设置（Project Settings）>渲染（Rendering）>默认设置（Default Settings）** 中设置。

![Project Settings for Physical Lighting Units](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c348ce73-2ff5-4e99-8177-1bf7730686ab/03-physical-light-units-rendering-settings.png)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [shadows](https://dev.epicgames.com/community/search?query=shadows)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [用于光照强度的光照单位](/documentation/zh-cn/unreal-engine/using-physical-lighting-units-in-unreal-engine#%E7%94%A8%E4%BA%8E%E5%85%89%E7%85%A7%E5%BC%BA%E5%BA%A6%E7%9A%84%E5%85%89%E7%85%A7%E5%8D%95%E4%BD%8D)
-   [定向光源](/documentation/zh-cn/unreal-engine/using-physical-lighting-units-in-unreal-engine#%E5%AE%9A%E5%90%91%E5%85%89%E6%BA%90)
-   [自发光表面](/documentation/zh-cn/unreal-engine/using-physical-lighting-units-in-unreal-engine#%E8%87%AA%E5%8F%91%E5%85%89%E8%A1%A8%E9%9D%A2)
-   [天空光照](/documentation/zh-cn/unreal-engine/using-physical-lighting-units-in-unreal-engine#%E5%A4%A9%E7%A9%BA%E5%85%89%E7%85%A7)
-   [作为静态光源的自发光材质](/documentation/zh-cn/unreal-engine/using-physical-lighting-units-in-unreal-engine#%E4%BD%9C%E4%B8%BA%E9%9D%99%E6%80%81%E5%85%89%E6%BA%90%E7%9A%84%E8%87%AA%E5%8F%91%E5%85%89%E6%9D%90%E8%B4%A8)
-   [点光源、聚光源和矩形光源](/documentation/zh-cn/unreal-engine/using-physical-lighting-units-in-unreal-engine#%E7%82%B9%E5%85%89%E6%BA%90%E3%80%81%E8%81%9A%E5%85%89%E6%BA%90%E5%92%8C%E7%9F%A9%E5%BD%A2%E5%85%89%E6%BA%90)
-   [提示和建议](/documentation/zh-cn/unreal-engine/using-physical-lighting-units-in-unreal-engine#%E6%8F%90%E7%A4%BA%E5%92%8C%E5%BB%BA%E8%AE%AE)
-   [一般注意事项](/documentation/zh-cn/unreal-engine/using-physical-lighting-units-in-unreal-engine#%E4%B8%80%E8%88%AC%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)