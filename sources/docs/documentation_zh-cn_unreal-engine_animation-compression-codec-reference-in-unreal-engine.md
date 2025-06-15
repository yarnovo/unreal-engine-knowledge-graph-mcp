# 虚幻引擎动画压缩编码解码器参考说明 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:08:52.606Z

---

目录

![动画压缩编码解码器参考说明](https://dev.epicgames.com/community/api/documentation/image/e6e0ad59-a3d8-42fa-8724-e9c5f636abeb?resizing_type=fill&width=1920&height=335)

**压缩编码解码器** 是一类压缩算法和方法，你可以使用它们驱动 **动画压缩设置** 资产，以压缩动画数据。你可以使用下面的文档查阅 **虚幻引擎** 中可供使用的 **骨骼压缩编码解码器** 和 **曲线压缩编码解码器** 的列表和说明。

### 骨骼压缩编码解码器参考

你可以在这里查阅虚幻引擎附带的所有骨骼压缩编码解码器及其功能和可用属性的说明。

#### 动画压缩仅按位压缩

动画压缩仅按位压缩（Anim Compress Bitwise Compress Only）编码解码器专注于按位压缩，并且会保留所有动画关键帧。

你可以在这里查阅 **动画压缩仅按位压缩（Anim Compress Bitwise Compress Only）** 编码解码器的属性列表以及对这些属性功能的说明：

属性

说明

**压缩（Compression）**

通过设置以下属性，控制压缩编码解码器如何格式化压缩的动画数据：

-   **平移压缩格式（Translation Compression Format）** ：设置 **平移数据** 的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **旋转压缩格式（Rotation Compression Format）** ：设置 **旋转** 数据的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **缩放压缩格式（Scale Compression Format）** ：设置 **缩放** 数据的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **说明（Description）** ：设置该编码解码器的说明。
    

#### 动画压缩破坏性最低

动画压缩破坏性最低（Anim Compress Least Destructive）编码解码器可将目前的动画压缩结果恢复成原始数据。

你可以在这里查阅 **动画压缩破坏性最低（Anim Compress Least Destructive）** 编码解码器的属性列表以及对这些属性功能的说明：

属性

说明

**压缩（Compression）**

通过设置以下属性，控制压缩编码解码器如何格式化压缩的动画数据：

-   **平移压缩格式（Translation Compression Format）** ：设置 **平移数据** 的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **旋转压缩格式（Rotation Compression Format）** ：设置 **旋转** 数据的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **缩放压缩格式（Scale Compression Format）** ：设置 **缩放** 数据的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **说明（Description）** ：设置该编码解码器的说明。
    

#### 动画压缩按每条轨道压缩

动画压缩按每条轨道压缩（Anim Compress Per Track Compression）编码解码器以单条轨道为基础进行压缩，并且会单独压缩每条轨道。

你可以在这里查阅 **动画压缩按每条轨道压缩（Anim Compress Per Track Compression）** 编码解码器的属性列表以及对这些属性功能的说明：

属性

说明

**按每条轨道（PerTrack）**

通过设置以下属性，控制每条轨道的压缩编码解码器的运作方式：

-   **最大归零阈值（Max Zeroing Threshold）** ：设置将分量替换为零时使用的最大阈值。数值越低，保留的关键帧就越多，但得到的压缩率越低。
-   **最大按位位置差（Max Pos Diff Bitwise）** ：设置在测试是否可以移除一个动画关键帧时使用的最大 **位置** 差。数值越低，保留的关键帧就越多，但得到的压缩率越低。
-   **最大按位角度差（Max Angle Diff Bitwise）** ：设置在测试是否可以移除一个动画关键帧时使用的最大 **角度** 差。数值越低，保留的关键帧就越多，但得到的压缩率越低。
-   **最大按位缩放差（Max Scale Diff Bitwise）** ：设置在测试是否可以移除一个动画关键帧时使用的最大 **缩放** 差。数值越低，保留的关键帧就越多，但得到的压缩率越低。
-   **允许的旋转格式（Allowed Rotation Formats）** ：设置逐轨道压缩器能够在 **旋转** 关键帧上尝试的编码格式。如需了解可用选项，请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)。
-   **允许的平移格式（Allowed Translation Formats）** ：逐轨道压缩器能够在 **平移** 关键帧上尝试的编码格式。如需了解可用选项，请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)
-   **允许的缩放格式（Allowed Scale Formats）** ：逐轨道压缩器能够在 **缩放** 关键帧上尝试的编码格式。如需了解可用选项，请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)

**重新采样（Resampling）**

通过设置以下属性，控制重新采样动画数据时，压缩编码解码器的运作方式：

-   **重新采样动画（Resample Animation）** ：启用后，编码解码器将使用 **重新采样帧率（Resample Framerate）** 属性中设置的值对动画帧率进行重新采样。
-   **重新采样的帧率** ：启用 **重新采样（Resampling）** 属性后，设置在压缩过程中对动画重新进行采样的帧率。
-   **重新采样的最少关键帧（Min Keys for Resampling）** ：设置动画 **至少** 应该具有多少关键帧，才能对其重新采样。在压缩期间，若动画的关键帧数量少于该属性值，则不会被重新采样。

**适应性误差（AdaptiveError）**

通过设置以下属性，控制压缩编码解码器的误差阈值如何影响动画数据：

-   **使用自适应误差（Use Adaptive Error）** ：启用后，将根据骨架中的 **高度** 值调整误差阈值。
-   **对末端执行器使用重载（Use Override for End Effectors）** ：启用后，使用 **最小执行器差（Min Effector Diff）** 属性的值作为末端执行器的阈值。
-   **轨道高度偏差（Track Height Bias）** ：设置一个用于确定偏差的值，在使用轨道高度计算自适应误差之前，该值会加到轨道高度上。
-   **父项除数（Parenting Divisor）** ：启用 **使用自适应误差（UseAdpative Error）** 属性后，设置一个值，使得关键帧在树结构中出现的位置越靠上，误差容忍度越低。以下是使用的公式：

`EffectiveErrorTolerance = Max(BaseErrorTolerance / power( parentingDiviosor, Max(Heigh + Bias,0) * ParentingDivisiorExponent), ZeroingThreshold)`

-   **父项除数指数（Parenting Divisor Exponent）** ：启用 **使用自适应误差（UseAdpative Error）** 属性后，设置一个值，使得关键帧在树结构中出现的位置越靠上，误差容忍度呈指数式降低。以下是使用的公式：

`EffectiveErrorTolerance = Max(BaseErrorTolerance / power( parentingDiviosor, Max(Heigh + Bias,0) * ParentingDivisiorExponent), ZeroingThreshold)`

**适应性误差2（AdaptiveError2）**

通过设置以下属性，额外控制压缩编码解码器的误差阈值如何影响动画数据：

-   **使用自适应误差2（Use Additive Error 2）** ：启用后，自适应误差系统将基于末端执行器中由于轨道误差而引入的误差，确定每条轨道的允许误差。
-   **旋转误差源比率（Rotation Error Source Ratio）** ：设置一个值，以确定末端执行器 **旋转** 中有多少比率的误差可以来自于给定轨道的旋转误差或平移误差。如果使用的值为 `1` ，所有误差都必须来自于旋转误差。如果使用的值为 `0.5` ，每种误差所占的比率各占一半。如果使用的值为 `0.0` ，所有误差都必须来自于平移误差。
-   **平移误差源比率（Translation Error Source Ratio）** ：设置一个值，以确定末端执行器 **平移** 中有多少比率的误差可以来自于给定轨道的旋转误差或平移误差。如果使用的值为 `1` ，所有误差都必须来自于平移误差。如果使用的值为 `0.5` ，每种误差所占的比率各占一半。如果使用的值为 `0.0` ，所有误差都必须来自于旋转误差。
-   **缩放误差源比率（Scale Error Source Ratio）** ：设置一个值，以确定末端执行器的缩放误差有多少比率可以来自于给定轨道的旋转误差或缩放误差。如果使用的值为 `1` ，所有误差都必须来自于旋转误差。如果使用的值为 `0.5` ，每种误差所占的比率各占一半。如果使用的值为 `0.0` ，所有误差都必须来自于缩放误差。
-   **每条轨道的最大误差比率（Max Error Per Track Ratio）** ：设置一个分数值，以确定任何特定轨道所引入的误差可以占误差总预算的多少。

**线性关键帧移除（LinearKeyRemoval）**

通过设置以下属性，控制压缩编码解码器如何从动画数据中移除线性关键帧：

-   **最大位置差（Max Pos Diff）** ：设置在测试是否可以移除一个动画关键帧时使用的最大 **位置** 差。数值越低，保留的关键帧就越多，但得到的压缩率越低。
    
-   **最大角度差（Max Angle Diff）** ：设置在测试是否可以移除一个动画关键帧时使用的最大 **角度** 差。数值越低，保留的关键帧就越多，但得到的压缩率越低。
    
-   **最大缩放差（Max Scale Diff）** ：设置在测试是否可以移除一个动画关键帧时使用的最大 **缩放** 差。数值越低，保留的关键帧就越多，但得到的压缩率越低。
    
-   **最大执行器差（Max Effector Diff）** ：由于移除关键帧需要经过测试，我们会全程监测直到末端执行器的全部影响。如果移除一个关键帧会导致它们的位置变化超过这个量，那么将保留该关键帧。该值用于除末端执行器父节点外的所有骨骼。
    
-   **最小执行器差（Min Effector Diff）** ：由于移除关键帧需要经过测试，我们会全程监测直到末端执行器的全部影响。如果移除一个关键帧会导致它们的位置变化低于这个量，那么将保留该关键帧。该值用于除末端执行器父节点外的所有骨骼。
    
-   **执行器差插槽（Effector Diff Socket）** ：为附有插槽的末端执行器设置错误阈值。通常，附有插槽的末端执行器是更重要的骨骼，为了保留更多细节，你或许应该避免采用激进的方式压缩它们。
    
-   **父关键帧缩放（Parent Key Scale）** ：设置一个 **缩放** 值，如果骨骼的父骨骼在相同的时间位置也有一个关键帧，该值将提升该骨骼保留关键帧的可能性。更高的值将以压缩为代价，消除动画中的抖动瑕疵。
    
-   **重定向（Retarget）** ：启用后，将调整节点，以补偿压缩动画造成的压缩误差。如果禁用，将不会调整节点。
    
-   **实际过滤线性关键帧（Actually Filter Linear Keys）** ：启用后，将执行最后的过滤步骤，或者只执行按位压缩后的重定向。如果启用该属性并禁用 **重定向（Retarget）** 属性，那么线性压缩器的表现不会比底层的按位压缩器好，而且会非常慢。
    

**压缩（Compression）**

通过设置以下属性，控制压缩编码解码器如何格式化压缩的动画数据：

-   **平移压缩格式（Translation Compression Format）** ：设置 **平移数据** 的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **旋转压缩格式（Rotation Compression Format）** ：设置 **旋转** 数据的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **缩放压缩格式（Scale Compression Format）** ：设置 **缩放** 数据的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **说明（Description）** ：设置该编码解码器的说明。
    

#### 动画压缩隔帧移除

移除动画中所有第奇数个或第偶数个关键帧。

你可以在这里查阅 **动画压缩隔帧移除（Anim Compress Removes Every Second Key）** 的属性列表以及对这些属性功能的说明：

属性

说明

**动画压缩算法隔帧移除（AnimationCompressionAlgorithm\_RemoveEverySecondKey）**

通过设置以下属性，控制压缩编码解码器如何移除关键帧：

-   **关键帧数量下限（Min Keys）** ：动画若未达到关键帧数量下限（Min Keys），将不会失去关键帧。
-   **从第二个关键帧开始（Start at Second Key）** ：启用后，编码解码器将从第二个关键帧开始移除关键帧。例如，关键帧 `1` 、 `3` 、 `5` 将被移除。禁用后，编码解码器将从第一个关键帧开始移除关键帧。例如，关键帧 `0` 、 `2` 、 `4` 将被移除。

**压缩（Compression）**

通过设置以下属性，控制压缩编码解码器如何格式化压缩的动画数据：

-   **平移压缩格式（Translation Compression Format）** ：设置 **平移数据** 的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **旋转压缩格式（Rotation Compression Format）** ：设置 **旋转** 数据的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **缩放压缩格式（Scale Compression Format）** ：设置 **缩放** 数据的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **说明（Description）** ：设置该编码解码器的说明。
    

#### 动画压缩移除线性关键帧

移除所有与周围关键帧相比未发生变化的关键帧。

你可以在这里查阅 **动画压缩移除线性关键帧（Anim Compress Remove Linear Keys）** 的属性列表以及对这些属性功能的说明：

属性

说明

**LinearKeyRemoval**

通过设置以下属性，控制压缩编码解码器如何从动画数据中移除线性关键帧：

-   **最大位置差（Max Pos Diff）** ：设置在测试是否可以移除一个动画关键帧时使用的最大 **位置** 差。数值越低，保留的关键帧就越多，但得到的压缩率越低。
    
-   **最大角度差（Max Angle Diff）** ：设置在测试是否可以移除一个动画关键帧时使用的最大 **角度** 差。数值越低，保留的关键帧就越多，但得到的压缩率越低。
    
-   **最大缩放差（Max Scale Diff）** ：设置在测试是否可以移除一个动画关键帧时使用的最大 **缩放** 差。数值越低，保留的关键帧就越多，但得到的压缩率越低。
    
-   **最大执行器差（Max Effector Diff）** ：由于移除关键帧需要经过测试，我们会全程监测直到末端执行器的全部影响。如果移除一个关键帧会导致它们的位置变化超过这个量，那么将保留该关键帧。该值用于除末端执行器父节点外的所有骨骼。
    
-   **最小执行器差（Min Effector Diff）** ：由于移除关键帧需要经过测试，我们会全程监测直到末端执行器的全部影响。如果移除一个关键帧会导致它们的位置变化低于这个量，那么将保留该关键帧。该值用于除末端执行器父节点外的所有骨骼。
    
-   **执行器差插槽（Effector Diff Socket）** ：为附有插槽的末端执行器设置错误阈值。通常，附有插槽的末端执行器是更重要的骨骼，为了保留更多细节，你或许应该避免采用激进的方式压缩它们。
    
-   **父关键帧缩放（Parent Key Scale）** ：设置一个 **缩放** 值，如果骨骼的父骨骼在相同的时间位置也有一个关键帧，该值将提升该骨骼保留关键帧的可能性。更高的值将以压缩为代价，消除动画中的抖动瑕疵。
    
-   **重定向（Retarget）** ：启用后，将调整节点，以补偿压缩动画造成的压缩误差。如果禁用，将不会调整节点。
    
-   **实际过滤线性关键帧（Actually Filter Linear Keys）** ：启用后，将执行最后的过滤步骤，或者只执行按位压缩后的重定向。如果启用该属性并禁用 **重定向（Retarget）** 属性，那么线性压缩器的表现不会比底层的按位压缩器好，而且会非常慢。
    

**Compression**

通过设置以下属性，控制压缩编码解码器如何格式化压缩的动画数据：

-   **平移压缩格式（Translation Compression Format）** ：设置 **平移数据** 的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **旋转压缩格式（Rotation Compression Format）** ：设置 **旋转** 数据的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **缩放压缩格式（Scale Compression Format）** ：设置 **缩放** 数据的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **说明（Description）** ：设置该编码解码器的说明。
    

#### 动画压缩移除不重要的关键帧

移除所有与周围关键帧相比，帧内资产位置和方向未发生变化的关键帧。

你可以在这里查阅 **动画压缩移除不重要的关键帧（Anim Compress Removes Trivial Keys）** 的属性列表以及对这些属性功能的说明：

属性

说明

**AniamtionCompressionAlgorithm\_RemoveTrivialKeys**

通过设置以下属性，控制压缩编码解码器如何从动画数据中移除不重要的关键帧：

-   **最大位置差（Max Pos Diff）** ：设置在测试是否可以移除一个动画关键帧时使用的最大 **位置** 差。数值越低，保留的关键帧就越多，但得到的压缩率越低。
-   **最大角度差（Max Angle Diff）** ：设置在测试是否可以移除一个动画关键帧时使用的最大 **角度** 差。数值越低，保留的关键帧就越多，但得到的压缩率越低。
-   **最大缩放差（Max Scale Diff）** ：设置在测试是否可以移除一个动画关键帧时使用的最大 **缩放** 差。数值越低，保留的关键帧就越多，但得到的压缩率越低。

**Compression**

通过设置以下属性，控制压缩编码解码器如何格式化压缩的动画数据：

-   **平移压缩格式（Translation Compression Format）** ：设置 **平移数据** 的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **旋转压缩格式（Rotation Compression Format）** ：设置 **旋转** 数据的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **缩放压缩格式（Scale Compression Format）** ：设置 **缩放** 数据的按位压缩格式。请参阅[压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)了解更多信息。
    
-   **说明（Description）** ：设置该编码解码器的说明。
    

### 按位压缩格式参考

你可以在这里查阅可用的按位压缩数据格式列表，以及对这些格式功能的说明：

格式

说明

**ACF None**

这种格式会保留所有 **32位浮点** ，不执行压缩。这种格式实质上保留了原始动画数据。

**ACF Float 96No W**

这种格式将以 **32位浮点** 的形式仅压缩旋转四元数的 **X** 、 **Y** 、 **Z** 旋转数据，而 **W** 分量将在解压时被丢弃和重建。这种格式以最小的精度损失保留了接近原始数据的动画数据。

**ACF Fixed 48No W**

这种格式仅压缩旋转四元数的 **X** 、 **Y** 、 **Z** 旋转数据，并以量化数据的形式将它们分别存储在 **16个比特位** 中。四元数的 **W** 分量也将被丢弃。

**ACF Interval Fixed 32 No W**

这种格式 **采用范围缩减方式，以各个分量分别占11、11和10个比特位的形式** 存储压缩后的数值。对于旋转，四元数的 **W** 分量将被丢弃。

**ACF Fixed 32No W**

这种格式 **以各个分量分别占11、11和10个比特位的形式** 存储压缩后的数值。对于旋转，四元数的 **W** 分量将被丢弃。

**ACF Float 32No W**

这种格式使用自定义浮点格式存储压缩后的数值，小数部分占6或7位，指数占3位。对于旋转，四元数的W分量将被丢弃。

**ACF Identity**

这种格式始终会将四元数的 **W** 返回给旋转轨道。

### 曲线压缩编码解码器参考

你可以在这里查阅虚幻引擎附带的所有曲线压缩编码解码器及其功能和可用属性的说明。

#### 压缩富曲线

该编码解码器用于在压缩动画序列时压缩富动画曲线。你可以在这里查阅压缩富曲线（Compress Rich Curves）编码解码器的属性及对这些属性功能的说明：

属性

说明

**Max Curve Error**

设置压缩富动画曲线时允许的最大误差。

**Use Anim Sequence Sample Rate**

启用后，将使用动画序列采样率压缩动画。禁用后，将使用 **误差采样率（Error Sample Rate）** 属性的值对动画进行采样。

**Error Sample Rate**

禁用 **使用动画序列采样率（Use Anim Sequence Sample Rate）** 属性后，设置在压缩时使用的动画采样率值。

#### 统一索引

该编码解码器用于在压缩动画序列时，对动画曲线进行统一 **索引** 。

#### 统一采样

该编码解码器用于在压缩动画序列时对动画曲线进行统一 **采样** 。你可以在这里查阅统一采样（Uniformly Sampled）编码解码器的属性及对这些属性功能的说明：

属性

说明

**使用动画序列采样率（Use Anim Sequence Sample Rate）**

启用后，将使用动画序列采样率压缩动画。禁用后，将使用 **误差采样率（Error Sample Rate）** 属性的值对动画进行采样。

**误差采样率（Error Sample Rate）**

禁用 **使用动画序列采样率（Use Anim Sequence Sample Rate）** 属性后，设置在压缩时使用的动画采样率值。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [骨骼压缩编码解码器参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E9%AA%A8%E9%AA%BC%E5%8E%8B%E7%BC%A9%E7%BC%96%E7%A0%81%E8%A7%A3%E7%A0%81%E5%99%A8%E5%8F%82%E8%80%83)
-   [动画压缩仅按位压缩](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%8E%8B%E7%BC%A9%E4%BB%85%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9)
-   [动画压缩破坏性最低](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%8E%8B%E7%BC%A9%E7%A0%B4%E5%9D%8F%E6%80%A7%E6%9C%80%E4%BD%8E)
-   [动画压缩按每条轨道压缩](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%8E%8B%E7%BC%A9%E6%8C%89%E6%AF%8F%E6%9D%A1%E8%BD%A8%E9%81%93%E5%8E%8B%E7%BC%A9)
-   [动画压缩隔帧移除](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%8E%8B%E7%BC%A9%E9%9A%94%E5%B8%A7%E7%A7%BB%E9%99%A4)
-   [动画压缩移除线性关键帧](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%8E%8B%E7%BC%A9%E7%A7%BB%E9%99%A4%E7%BA%BF%E6%80%A7%E5%85%B3%E9%94%AE%E5%B8%A7)
-   [动画压缩移除不重要的关键帧](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%8E%8B%E7%BC%A9%E7%A7%BB%E9%99%A4%E4%B8%8D%E9%87%8D%E8%A6%81%E7%9A%84%E5%85%B3%E9%94%AE%E5%B8%A7)
-   [按位压缩格式参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%8C%89%E4%BD%8D%E5%8E%8B%E7%BC%A9%E6%A0%BC%E5%BC%8F%E5%8F%82%E8%80%83)
-   [曲线压缩编码解码器参考](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E6%9B%B2%E7%BA%BF%E5%8E%8B%E7%BC%A9%E7%BC%96%E7%A0%81%E8%A7%A3%E7%A0%81%E5%99%A8%E5%8F%82%E8%80%83)
-   [压缩富曲线](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E5%8E%8B%E7%BC%A9%E5%AF%8C%E6%9B%B2%E7%BA%BF)
-   [统一索引](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E7%BB%9F%E4%B8%80%E7%B4%A2%E5%BC%95)
-   [统一采样](/documentation/zh-cn/unreal-engine/animation-compression-codec-reference-in-unreal-engine#%E7%BB%9F%E4%B8%80%E9%87%87%E6%A0%B7)