# 虚幻引擎时间超级分辨率常见问答 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/temporal-super-resolution-frequently-asked-questions-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:22:32.097Z

---

目录

![时间超级分辨率常见问答](https://dev.epicgames.com/community/api/documentation/image/f6166007-b202-4aa7-b74a-34d38f539a75?resizing_type=fill&width=1920&height=335)

本页面包含 **时间超级分辨率（TSR）** 相关的常见问题。本页各小节均对应TSR技术概述中的小节。如需详情和示例，请参阅[时间超级分辨率](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine)。

## TSR的伸缩性

TSR包含很多用于其分辨率修改设置的自定义选项，因此你可以根据项目需求自定义各个平台的分辨率修改设置。如需详细了解TSR的伸缩性选项及其功能，请参阅[时间超级分辨率](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#tsr%E7%9A%84%E4%BC%B8%E7%BC%A9%E6%80%A7)的"TSR的伸缩性"小节。

-   **为什么TSR在Stat GPU中的运行时GPU开销比预期要慢？**
    
    TSR在接近帧末尾时在GPU上运行，从而在分辨率提升到显示分辨率之前清除锯齿。这是渲染器的最后一个组件，为其用于在帧上累积数据的历史记录分配持久GPU资源。若GPU耗尽显存，TSR通常是第一个遇到性能缺陷的组件，即需要在主机GPU内存上分配GPU资源。
    
    如果GPU遇到内存不足问题，可以尝试调整会触发GPU崩溃的超时检测和恢复（TDR）事件。如需更多信息，请参阅[解决GPU崩溃](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine)。
    
-   **TSR支持的屏幕百分比范围是多少？**
    
    TSR着色器在设计上支持25%至200%范围内的屏幕百分比，可将控制台命令 `r.TSR.History.ScreenPercentage` 与 `r.ScreenPercentage` 配合使用。举例如下：
    
    -   `r.TSR.History.ScreenPercentage=200` 可接受输入为 `r.ScreenPercentage=50` 至 `r.ScreenPercentage=200` 。
    -   `r.TSR.History.ScreenPercentage=100` 可接受输入为 `r.ScreenPercentage=25` 至 `r.ScreenPercentage=100` 。
    
    你需要密切关注TSR输入和TSR 1spp的历史记录，了解TSR每帧需要处理的信息量。
    
-   **TSR是否支持动态渲染分辨率？支持哪些平台？**
    
    支持，游戏主机平台支持并启用了动态分辨率。但是，Windows和其他台式机平台不支持。这并不是TSR独有的问题。这是一个正在研究的领域，目前正在《Fortnite》上进行测试。目前的问题包括：
    
    -   动态分辨率的目的是最大化分辨率，并且避免GPU得不到充分利用，从而获得最高的TSR历史收敛率。游戏主机就不同了，除了游戏之外还有更多程序在GPU上运行，并且每个程序都以自己的帧率在运行。目前，现有API无法得知应该为其他程序留下多少GPU余量，从而让它们以所需的帧率完成帧渲染。
    -   D3D的交换链上缺少一个API，让我们可以在启用VSync的情况下在屏幕顶部撕开一小部分，而这在游戏主机上是常见的做法（可通过 `rhi.PresentThreshold.Top` 指定）。若动态分辨率最终迟了几微秒才完成，不掉帧就非常重要。在我们的测试中，相比游戏主机平台，这种情况在Windows等台式机平台上更常见，因为GPU可能会被第三方程序抢占使用。
    -   GPU会为了省电而动态调整时钟。这会降低动态分辨率，因为它会尽量保守地降低GPU开销。这里的问题是，我们缺少可以查询GPU调整情况的官方D3D API。在使用驱动后门（请参阅微软关于D3DKMTQueryStatistics函数的文章）时，我们才在《Fortnite》中发现这一问题，当时我们将 `Stat TSR` 用于了 **GPU Clock** 和 **DynRes** 的统计信息。
-   **TSR是否会插值或生成中间帧？**
    
    不会。TSR是虚幻引擎内置的时间分辨率修改器/超分辨率技术。时间分辨率修改/超分辨率不同于生成中间帧的技术。由于人们对这两类技术都很感兴趣，因此如果不加以说明，相关信息可能会造成困惑。
    
-   **TSR可以与第三方帧插值/帧生成配合使用吗？**
    
    可以。它的工作方式与渲染器相同。这种帧插值技术必须在时间分辨率修改器后的后期处理链中处理更多的功能，例如动态模糊、色差、锐化、胶片颗粒、泛光、镜头污垢、局部曝光和后期处理材质。由于ISceneViewExtensions的存在，帧插值/帧生成插件可以自由访问深度和运动向量，而无需设置ITemporalUpscaler来替代TSR。例如，电视制造商可以在任何视频内容上进行帧生成，不论是广播信道、流媒体服务、物理媒体还是游戏主机。
    
-   **帧插值/帧生成对TSR有什么影响？**
    
    像许多渲染技术一样，帧插值/帧生成会增加GPU开销。当TSR或其他时间分辨率修改器依赖GPU进行细节累积时，GPU开销的增加都会对帧率产生影响。
    
    例如，假设有一种帧插值技术，它会将帧相乘并使呈现的帧数增加一倍，从而将游戏的FPS从55Hz提高到插值后的88Hz。启用帧插值后，游戏的新帧率可通过插值后的游戏FPS等于以下值来计算：
    
    例如，假设有一种帧插值技术，当FrameMultiplier=2时，呈现的帧数增加一倍，从GameFPS=55Hz变为InterpolatedFPS=88Hz。通过InterpolatedGameFPS=FPSInterpolatedFPS/FrameMultiplier=44 Hz，可以计算出启用帧插值后的新游戏帧率。游戏帧率将下降，乘法因子为InterpolatedGameFPS/GameFPS=0.8。这将直接让输入到时间分辨率修改器的MP乘以\*0.8，并将历史收敛率提高1/0.8=1.25倍。
    
    你可以使用 `Stat TSR` 显示 **TSR输入** 和 **TSR** 收敛率来检查这些结果。同时可以看出启用帧插值对细节积累速度的影响。
    
-   **你们是否有计划改进时间抗锯齿（TAA）技术或时间抗锯齿分辨率修改（TAAU）技术？**
    
    没有计划。TAA及其变体TAAU是在上一代游戏主机的限制下开发的。自开发以来，唯一增加的功能是让TSR能够使用R11G11B10，且历史记录中不出现严重的色彩精度问题。这可以在旧平台上节省更多内存带宽性能，并通过默认启用的 `r.TemporalAA.R11G11B10History` 命令进行控制。对于你自己的项目，你仍然可以在D3D11或D3D12上为那些使用低端GPU的用户提供TAA，因为在低抗锯齿伸缩性的情况下使用TSR的开销仍然太高。《Fortnite》就是考虑到这些玩家的需求而如此设置的。
    
-   **是否可以将TSR与其他第三方时间分辨率修改器进行比较？**
    
    虽然TSR是虚幻引擎5中的默认方法，但是你的项目可以随时使用第三方时间分辨率修改器。5.3版本的ITemporalUpscaler接口存在的问题，即在第三方时间分辨率修改器之间切换时可能导致崩溃，已得到解决。在视口中的 **显示（Show）> 可视化（Visualize）** 菜单下，可以开启 **时间分辨率修改器（Temporal Upscaler）** 的可视化。该查看器可用于任何时间分辨率修改器，无论是虚幻引擎内置的还是第三方的。在相同的渲染和显示分辨率条件下，可使用该查看器方便地将内置时间分辨率修改器和第三方修改器进行比较。
    
-   **TSR 是否有锐化通道？**
    
    没有。我们只关注匹配TSR生成图像的引用。不过，在时间分辨率修改后运行的色调映射器具有可选的锐化功能，可以通过 `r.Tonemapper.Shapen` 启用。你可以使用 **显示（Show）> 可视化（Visualize）** 菜单下的 **时间分辨率修改器** 可视化功能查看启用情况。
    
    由于游戏的竞技性，《Fortnite》为所有平台的所有时间分辨率修改器都设置了 `r.Tonemapper.Sharpen=0.5` 。
    

## TSR历史记录

TSR会随着时间的推移累积细节。这些渲染细节随时间的聚合集成是在显示分辨率的历史记录中完成的。如需详细了解TSR的历史记录及其功能，请参阅[时间超级分辨率](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#tsr%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95)的"TSR历史记录"小节。

-   **TSR的历史样本数是否会影响历史记录的内存占用？**
    
    若通过 `r.TSR.History.SampleCount` 设置更高的样本数，就不会影响TSR的历史记录。TSR不会记录原始的像素详细信息，而是出于性能原因，在历史记录中进行累积/汇总。历史样本数仅与历史记录中当前帧的最小贡献有关。即1/历史样本数。样本数越低，历史记录中当前帧的最小贡献就越高，这会导致时间不稳定性变高。样本数越高，当前帧的最小贡献越低，图像就越稳定。但如果出现重影，则重影需要一段时间才会消失。
    
    历史样本数针对的是每个TSR的输出/显示像素，这意味着Nyquist-Shannon历史记录为每个历史像素使用的历史样本数较低，这也是使用时间超级分辨率可视化模式 `show VisualizeTSR` 时显示的结果。
    
-   **如何调整移动过程中的历史记录权重？**
    
    若要设置移动过程中的历史记录权重，需要在图像稳定性和清晰度之间做出权衡。例如，通过降低 `r.TSR.Velocity.WeightClampingSampleCount` 的值，《Fortnite》等竞技类游戏可以降低部分移动过程中的图像稳定性来换取清晰度。此控制台变量应在 `r.TSR.History.ScreenPercentage` 设置为100的情况下进行调整，因为较高的历史分辨率会自然地减少移动过程中的模糊和稳定性。
    
-   **在4K显示器上以超高（Epic）抗锯齿伸缩性运行TSR，能否渲染出8K纹理？**
    
    能。在4K显示器上以超高（Epic）抗锯齿伸缩性运行TSR，将有效提供8K纹理。如果你的游戏不要求在移动过程中呈现清晰的视觉效果，可以考虑将抗锯齿伸缩性调高。注意，如果使用最新的高性能GPU搭配1080p显示器，历史重新投影造成的细节损失会更加明显。因此，为TSR抗锯齿公开低、中、高和超高的伸缩性将对你的项目大有裨益，而且也便于玩家根据自己的硬件条件调整游戏体验。
    
-   **我的项目是否应该使用屏幕百分比大于200的TSR历史记录？**
    
    没有必要。因为每个轴上两倍的像素数量足以在显示像素中隐藏历史像素之间的插值。使用高于200的屏幕百分比还会导致出现渲染分辨率和历史分辨率之间的分辨率修改问题，这远远超出了我们的测试范围。TSR历史记录已经能在100和200之间任意缩放屏幕百分比，值得强调的是，当历史记录屏幕百分比等于200时，会有一个针对性的下采样通道着色器排列，因为这时达到了Nyquist-Shannon快速进入的必要条件，并且此时下采样的数学计算得到了简化。如有需要，可用 `r.TSR.History.ScreenPercentage` 调整 TSR历史屏幕百分比。
    
-   **如果我想让TSR历史屏幕百分比大于100%，我的TSR历史屏幕百分比是否应该与主屏幕百分比一致？**
    
    是的，如果你希望TSR历史屏幕百分比（`r.TSR.History.ScreenPerecentage`）大于100%，那么该百分比应与主屏幕百分比（`r.ScreenPercentage`）相一致，否则你的超级采样渲染将出现历史拒绝模糊。如果项目的帧预算可以承受更高的主画屏幕分比，那将也可以承受与之一致的TSR历史屏幕百分比。
    
-   **TSR是否能够渲染8K？**
    
    TSR的开发和设计旨在尽可能快地更新历史记录。对于以4K渲染的游戏主机，这意味着为了图像质量，需要为视差和阴影启发式的渲染分辨率尽可能给出预算空间。在PC上，这意味着在高端GPU上以4K分辨率执行Nyquist-Shannon历史记录的预算，或在速度较快的GPU上以较低的显示分辨率执行。虽然我们没有积极测试8K，但使用更高的抗锯齿质量或设置更低的TSR历史屏幕百分比（`r.TSR.History.ScreenPerecentage`）来避免16K历史记录应该不会有问题。
    
    当使用 `r.PostProcessing.QuarterResolutionDownsample 2` 时，虚幻引擎具有实验性的8K支持，能以八分之一的分辨率运行部分后期处理链。这可以结合使用 `r.Bloom.ScreenPercentage 12.5` ，使FFT也能在此分辨率下运行。使用这些设置后，当 `r.TSR.History.ScreenPercentage` 等于100时（或使用超高(Epic)抗锯齿伸缩性时），TSR就能在历史更新中以八分之一的尺寸生成场景颜色。
    
-   **Nyquist-Shannon历史记录显存不足导致崩溃的风险有多大？**
    
    如果有可用显存就不会有问题。但如果没有可用显存，驱动就会开始分配CPU内存，从而导致性能下降。TSR会检查GMaxTextureDimensions，避免分配的历史记录超过硬件实际可以编码到其像素坐标的体量（通常为16384像素）。TSR还使用32位浮点来计算所有纹理的UV坐标，使其具有23位尾数的精度，即使在16位VALU着色器排列上也是如此。
    
-   **TSR的Nyquist-Shannon历史记录是否会影响后期处理链性能？**
    
    对Nyquist-Shannon历史记录之后的后期处理链没有影响，因为下采样到显示分辨率是在TSR中进行的。因此，在其后的通道中，超高（Epic）或高（High）抗锯齿伸缩性设置在分辨率上没有区别。
    
-   **Nyquist-Shannon历史记录的使用开销很高。我们是否应该为玩家提供其他选择？**
    
    虚幻引擎提供低、中、高、超高和电影级伸缩性组用于调整画质，而超高（Epic）伸缩性是提供给玩家的最高画质。查看[Steam的硬件调查](https://store.steampowered.com/hwsurvey/Steam-Hardware-Software-Survey-Welcome-to-Steam)可知最普遍的用户显示器分辨率如何；并不是每个人都拥有4K显示器。考虑到这一点，你可能需要考虑其他选项，从而在Nyquist-Shannon历史记录的质量和性能权衡下增加多样性，让玩家能够使用较低的TSR抗锯齿伸缩性。例如，如果用户使用1080p显示器，由于1080p显示器上的历史记录重新投影模糊，屏幕百分比可能是540p。
    
-   **考虑为TSR历史屏幕百分比公开单独的TSR设置。**
    
    你可以选择添加自己的抗锯齿伸缩性组，并将组作为单独的设置公开。区分TSR设置与其他抗锯齿选项的一种方法是，添加括号来指示所使用的方法。使用你自己的项目界面可以进一步区分这一点。例如，在《Fortnite》中，支持多种抗锯齿方法。根据低、中、高和超高质量设置，各TSR设置有自己的选项。还有一些额外的参数公开给用户界面，如TSR历史屏幕百分比（`r.TSR.History.ScreenPercentage`）。
    
    如果要添加TSR历史屏幕百分比，请考虑如何命名。比如像"TSR超级采样（TSR Super Sampling）"这样的名称固然可行，但可能与屏幕百分比（Screen Percentage）或其他具有超级采样功能的第三方时间分辨率修改器混淆。
    

## 着色拒绝

TSR的着色拒绝启发法是一个决定当前帧与之前渲染帧的匹配程度以及是否应该重复使用或拒绝的过程。如需详细了解TSR的着色拒绝及其功能，请参阅[时间超级分辨率](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E7%9D%80%E8%89%B2%E6%8B%92%E7%BB%9D)的"着色拒绝"小节。

-   **BlendFinal和ClampBlend小于1时的TSR重影问题。**
    
    TSR开发正在尽可能尝试解决这个问题，但这是一个已知的TSR着色拒绝问题。
    
-   **使用ClampBlend进行历史记录拒绝有什么好处？**
    
    虚幻引擎4的时间抗锯齿功能主要依赖ClampBlend的拒绝技术。这能确保历史颜色不会偏离输入分辨率太远，同时保留一些抗锯齿边缘。但是缺点在于当噪点较多时会产生重影，因此，为了减少重影，不能单独将这一技术用于历史记录。此外它会模糊纹理细节，因此只能在需要时使用。
    
-   **使用BlendFinal进行历史记录拒绝有什么好处？**
    
    BlendFinal可以动态地控制当前帧相对于历史记录的权重。BlendFinal值越高，当前帧应该占据的输出就越多，直到不再使用历史记录为止。如果BlendFinal等于1，则会禁用历史记录重新投影，以抵消空间抗锯齿的开销。如此使用BlendFinal，能有效拒绝屏幕上噪点过多并且会使限制区产生重影瑕疵（就如同使用时间抗锯齿时出现的情况）区域的历史记录。但也有缺点，它会在渲染分辨率噪点中有所显现。
    

## TSR和半透明度

半透明度是TSR需要处理的一个特殊问题，因为可以将任意数量的任意层混合在一起。更因为半透明材质从不绘制速度。如需详细了解TSR如何处理半透明材质，请参阅[时间超级分辨率](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#tsr%E5%92%8C%E5%8D%8A%E9%80%8F%E6%98%8E%E5%BA%A6)的"TSR和半透明度"小节。

-   **TSR是否需要半透明材质才能使用响应式抗锯齿设置？**
    
    TSR不需要半透明材质就能使用响应式抗锯齿设置。该设置对时间抗锯齿（TAA）非常有用。这可以防止TAA给使用半透明材质的视觉特效处理带来过多细节丢失。TSR将 **半透明通道（Translucency Pass）** 默认设置为 **DOF之后（After DOF）** ，解决了半透明材质的这一问题。
    
-   **是否应该禁用DOF之后半透明度，直接绘制到场景颜色以节省性能？**
    
    你可以使用 `r.SeparateTranslucency 0` 直接绘制到场景颜色，这样可以消除复合通道的开销，从而节省性能。但我们不推荐这么做。禁用该功能后，TSR的GPU开销并不会更快。事实上，TSR省去了在处理过程中对单独复合通道的需求，而唯一可以节省的性能是，将半透明绘制为浮点R11G11B10格式（如果使用 `r.SceneColorFormat` 进行配置），而不是浮点R16G16B16A16像素格式。但是，在混合极低频率透明效果时（如烟云等），这往往会产生量化问题。
    
    一个已知的问题是，效果质量较低时，BaseScalabililty.ini会将 `r.SeparateTranslucency` 设置为0，从而使TSR在场景中的半透明效果上出现重影。要解决这个问题，可以使用 `r.TSR.ForceSeparateTranslucency` ，从而在使用TSR时强制启用单独的半透明通道。
    
-   **景深之后的半透明效果是否会增加内存压力？**
    
    景深之后的半透明效果不会给内存带来额外压力，因为引擎会在一帧中多次重复使用中间资源内存。这一点是使用[渲染依赖图](/documentation/zh-cn/unreal-engine/render-dependency-graph-in-unreal-engine)和带有临时内存分配器的RHI来实现的。可用 `r.RDG.TransientAllocator 1` （默认启用）对此进行设置。
    
-   **如果我的DOF之后半透明效果在焦距后面绘制DOF之前半透明效果，是否有重影风险？**
    
    这种情况不太可能发生，因为噪点会降低TSR在着色拒绝方面的精度，而应用于半透明材质的景深模糊会减少噪点。相反地，任何噪点都可能是Nanite细节造成的。
    

## 采用后期处理材质的TSR

后处理材质为TSR渲染材质提供了一定的灵活性，但后期处理材质也有自己的局限性，因为TSR是在后期处理渲染链的中间进行的。材质将被插入到场景颜色和景深之后半透明度的不同位置。如需详细了解TSR如何使用后期处理材质，请参阅[时间超级分辨率](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E9%87%87%E7%94%A8%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E6%9D%90%E8%B4%A8%E7%9A%84tsr)的"采用后期处理材质的TSR"小节。

-   **使用TSR处理卡通渲染轮廓的最佳方法是什么？**
    
    当轮廓效果不佳时（主要是由于轮廓缺乏运动向量），可以考虑将轮廓内联到它所勾勒的几何体上，这样几何体就可以牵引对象运动向量周围的线条。线条至少应有一个像素的粗细，以避免轮廓不连贯。
    
    在动态对象上，例如奔跑的角色上，轮廓取决于摄像机视图，这意味着轮廓有在角色表面移动的趋势，而不会将这种移动反馈到运动向量中。使用后期处理材质设置 **可混合位置（Blendable Location）** 和 **DOF之后半透明度（Translucency After DOF）** ，利用半透明材质的特殊逻辑，使材质在没有运动向量时也不会出现重影。
    
-   **如何在TSR之后访问抗锯齿深度缓冲区？**
    
    这恐怕是不可能的。主要问题是后台缓冲区无法进行抗锯齿。至于为什么无法进行抗锯齿，打个比方，假设背景在30米外，而距离背景10米处有个路灯。如果对两者之间的深度进行抗锯齿处理，就意味着最终的深度可能在10米到30米之间。路灯和建筑并不相连。因此我们没有实现深度的时间累积。由于深度缓冲区的不稳定性和锯齿会导致抖动，我们也不准备实现这种功能。在TSR之后不可能切实达到这一结果，因为必定会将锯齿和不稳定性带回图像中。有鉴于此，我们建议在TSR或TAA之前实现基于深度的效果。
    

## 闪烁时间分析

TSR的闪烁时间分析会分析图像中的瑕疵（如摩尔纹），并尝试保持几何细节的一致性和可见性（即使距离很远）。此外还会尽可能地使图像稳定。如需详细了解TSR的闪烁时间分析工作原理，请参阅[时间超级分辨率](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E9%97%AA%E7%83%81%E6%97%B6%E9%97%B4%E5%88%86%E6%9E%90)的"闪烁时间分析"小节。

-   **闪烁是否一定要通过TSR来缓解？**
    
    目前有两种已知的闪烁来源可以不用TSR缓解：
    
    -   场景中存在高强度的物体，导致Lumen全局光照失去稳定性。
    -   当几何体边缘未结合时，使用Nanite简化的远处对象可能导致闪烁。
-   **材质设置"具有像素动画（Has Pixel Animation）"是否会强制绘制对象的速度？**
    
    材质设置"具有像素动画（Has Pixel Animation）"会强制此材质禁用渲染器的启发法，这种启发法假设动画完全由运动向量描述。由于GBuffer中缺少可用位，并且为了前向渲染中能使用此功能，此材质设置已被编码进了TSR为重新投影而读取的速度缓冲区。因此，即使启用此材质设置的不透明几何体是静态的，它仍然需要绘制其静态速度才能编码此设置。
    
-   **"具有像素动画（Has Pixel Animation）"设置是否会在材质实例上添加材质着色器排列？**
    
    "具有像素动画（Has Pixel Animation）"材质设置不会为使用该设置的材质实例添加额外着色器排列。为避免编译更多着色器排列，该设置会自动应用在已指定使用该设置的材质的图元上。不过，这意味着只要图元在材质插槽中至少有一个材质启用了该标记，都将在该图元的所有材质上禁用TSR闪烁时间分析。我们建议避免使用具有几何复杂性的图元，因为这些图元有多个材质插槽，但只有部分网格使用材质动画。
    

## 历史记录恢复

TSR的历史记录恢复是决定是否使用紧接的前一帧或历史记录中更早的"恢复"帧以更好地匹配当前帧细节的过程。此过程是为了稳定图像，以限制甚至防止噪点和重影瑕疵的发生。如需详细了解如何从历史记录恢复帧，请参阅[时间超级分辨率](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E6%81%A2%E5%A4%8D)的"历史记录恢复"小节。

-   **为什么只持续保留某些帧？**
    
    我们只持续保留某些帧是为了节省显存。当抗锯齿伸缩性设置为超高（Epic）和电影级（Cinematic），且TSR历史记录屏幕百分比（`r.TSR.History.ScreenPercentage`）等于200时，这点对Nyquist-Shannon历史记录尤其重要。
    
-   **TSR的历史记录恢复是否会占用更多内存？**
    
    如果没有历史记录恢复，TSR需要两个历史记录：当前帧和上一帧的历史记录，而这两个记录在每帧都会转换角色。而启用历史记录恢复（`r.TSR.Resurrection 1`）后，历史记录数将变为2+TSR恢复的持久帧计数（`r.TSR.Resurrection.PersistentFrameCount`）。由于持久帧计数为2帧，默认情况下，历史记录恢复会使TSR的内存占用增加一倍。历史记录的内存占用可以在时间分辨率修改器可视化模式下查看。可在视口中的 **显示（Show ）>可视化（Visualize）** 菜单中选择 **时间分辨率修改器（Temporal Upscaler）** 切换这种可视化模式。
    
-   **为什么只恢复最旧的持久帧？**
    
    我们只恢复最旧的持久帧，是因为恢复的基础GPU开销较高，因为仍需要重新投影所恢复帧的渲染分辨率版本，以便与前一帧和当前帧进行比较。即使最终没用上任何恢复帧，也得为每一帧都这么做。
    
-   **为什么TSR恢复持久帧的间隔计数有一些限制？**
    
    为尽可能优化历史记录恢复，同时避免在显示分辨率或更高分辨率下的更新历史记录（Update History）通道中出现额外纹理获取指令，TSR使用了Texture2DArrays。这样一来，当单个着色器需要同时读取和写入纹理时，着色器可同时读取的纹理切片的范围就会受到一定的限制。
    
-   **GPU是否会执行额外的历史记录拷贝以保留持久帧？**
    
    不会。
    
-   **为什么我期望的所有地方都没有发生恢复？**
    
    历史记录恢复需要两个条件：
    
    -   恢复帧比前一帧更匹配当前帧。
    -   前一帧与当前帧的匹配程度不够。
    
    在这两项条件下，恢复帧才会与当前帧进行比较。如果匹配程度足够，就会使用恢复帧。当存在大量间接光照时，当前帧可能没有足够的Lumen样本，从而使当前帧与实际情况或恢复帧看起来不同。这可能会阻止帧的恢复。
    
-   **将TSR的最新更改合并到虚幻引擎的早期版本会有多复杂？**
    
    从虚幻引擎5.4开始，TSR历史记录由Texture2DArray构成，而不是Texture2D。为避免额外的GPU拷贝输出Texture2D用于下一个后期处理链，我们对后期处理通道进行了一些更改，在PostProcessing.cpp文件中使用新的 `FScreenPassTextureSlice` 来接受RDG纹理上的SRV。虚幻引擎5.3中已经包含了很多这些更改，因此你可以从5.4及更高版本中挑选一些已包含在常用TSR文件中的更改。
    
    对于5.3之前的虚幻引擎版本，可以在此处找到5.3版本在后期处理链中为允许历史记录恢复而做出的更改：
    
    -   [https://github.com/EpicGames/UnrealEngine/commit/d03d2caf4e4e7b874ca0f672100ca35eeede5123](https://github.com/EpicGames/UnrealEngine/commit/d03d2caf4e4e7b874ca0f672100ca35eeede5123)
    -   [https://github.com/EpicGames/UnrealEngine/commit/0f284290394673adb307ba49aa5701f1dc5889be](https://github.com/EpicGames/UnrealEngine/commit/0f284290394673adb307ba49aa5701f1dc5889be)
    -   [https://github.com/EpicGames/UnrealEngine/commit/72ed81e4a0dff2f3d66ab062e1d1308f60f1706f](https://github.com/EpicGames/UnrealEngine/commit/72ed81e4a0dff2f3d66ab062e1d1308f60f1706f)
    -   [https://github.com/EpicGames/UnrealEngine/commit/25e8efb4a6f8775c2e73edd84d02d0ea6d1da3de](https://github.com/EpicGames/UnrealEngine/commit/25e8efb4a6f8775c2e73edd84d02d0ea6d1da3de)
    -   [https://github.com/EpicGames/UnrealEngine/commit/6d3f7b6544feaec39ce88059bd31808fbd9da2cc](https://github.com/EpicGames/UnrealEngine/commit/6d3f7b6544feaec39ce88059bd31808fbd9da2cc)
    
    虚幻引擎5.4需要对后期处理链进行额外更改，请参见此处：
    
    -   [https://github.com/EpicGames/UnrealEngine/commit/59a7373ea7bde36706a2f8601ff6d72979624672](https://github.com/EpicGames/UnrealEngine/commit/59a7373ea7bde36706a2f8601ff6d72979624672)
-   **历史记录恢复是否可用于为游戏主机平台开发的项目？**
    
    从虚幻引擎5.4开始，TSR已经实现足够多的优化以补偿恢复的基本开销，使其GPU运行时开销与虚幻引擎5.1相同。这是TSR在4K游戏主机上以60 Hz运行《Fortnite》时的情况。在我们将性能重播锁定在60%的动态分辨率比例下进行的测试中，测得的总体平均开销为0.24毫秒，而《Fortnite》在动态分辨率下的平均运行屏幕百分比为51%。
    
-   **移动对象可以恢复吗？**
    
    恢复功能会尽力减少从头开始积累细节的频率。当对象不再出现在屏幕上时（比如它被该帧内的物体遮挡或移动到了帧外），TSR就会失去该对象的移动轨迹，不得不重新积累细节。TSR缺乏光学流，这意味着它只能使用当前帧的深度缓冲区重新投影，并使用恢复帧的视图和投影矩阵来查看其外观是否与当前帧一致。
    
    如果对象没有移动或移动幅度很小，TSR就会恢复这些细节，除非颜色不一致。例如在《Fortnite》中，即使缓慢移动的草地并非完全一致，TSR也能将草地恢复。因为这足以用来捕捉新草地上积累的新鲜细节。而对移动速度较快的细节，当它们在屏幕上移动时，很难注意到它们没有恢复，相比之下，在场景中的静态物体身上更容易发现这些缺失的细节。
    

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [anti aliasing](https://dev.epicgames.com/community/search?query=anti%20aliasing)
-   [temporal super resolution](https://dev.epicgames.com/community/search?query=temporal%20super%20resolution)
-   [tsr](https://dev.epicgames.com/community/search?query=tsr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [TSR的伸缩性](/documentation/zh-cn/unreal-engine/temporal-super-resolution-frequently-asked-questions-for-unreal-engine#tsr%E7%9A%84%E4%BC%B8%E7%BC%A9%E6%80%A7)
-   [TSR历史记录](/documentation/zh-cn/unreal-engine/temporal-super-resolution-frequently-asked-questions-for-unreal-engine#tsr%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95)
-   [着色拒绝](/documentation/zh-cn/unreal-engine/temporal-super-resolution-frequently-asked-questions-for-unreal-engine#%E7%9D%80%E8%89%B2%E6%8B%92%E7%BB%9D)
-   [TSR和半透明度](/documentation/zh-cn/unreal-engine/temporal-super-resolution-frequently-asked-questions-for-unreal-engine#tsr%E5%92%8C%E5%8D%8A%E9%80%8F%E6%98%8E%E5%BA%A6)
-   [采用后期处理材质的TSR](/documentation/zh-cn/unreal-engine/temporal-super-resolution-frequently-asked-questions-for-unreal-engine#%E9%87%87%E7%94%A8%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E6%9D%90%E8%B4%A8%E7%9A%84tsr)
-   [闪烁时间分析](/documentation/zh-cn/unreal-engine/temporal-super-resolution-frequently-asked-questions-for-unreal-engine#%E9%97%AA%E7%83%81%E6%97%B6%E9%97%B4%E5%88%86%E6%9E%90)
-   [历史记录恢复](/documentation/zh-cn/unreal-engine/temporal-super-resolution-frequently-asked-questions-for-unreal-engine#%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E6%81%A2%E5%A4%8D)