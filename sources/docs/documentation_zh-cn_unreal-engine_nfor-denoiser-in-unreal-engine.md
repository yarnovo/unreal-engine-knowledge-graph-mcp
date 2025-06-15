# 虚幻引擎的NFOR降噪器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nfor-denoiser-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:43:26.355Z

---

目录

![NFOR时空降噪器](https://dev.epicgames.com/community/api/documentation/image/ae88ca98-f8ed-4e76-949a-f95383c590de?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

**NFOR降噪器** 是针对虚幻引擎[路径追踪器](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine)的时空降噪引擎，旨在为离线路径追踪渲染提供高时间稳定性。此降噪器能创建流畅的摄像机动画，并通过GPU加速，根据周围的时间和空间斑块对每个像素进行降噪。该算法的灵感来自于论文[用于蒙特卡洛渲染降噪的非线性加权一阶回归](https://cs.dartmouth.edu/~wjarosz/publications/bitterli16nonlinearly.html)。我们利用带宽选择和散射对反射率解调辐射进行降噪处理，以保留更多细节。

NFOR降噪器非常适合搭配[影片渲染队列](/documentation/404)（MRQ）进行渲染，以产出高质量的输出，但并不适用于改善极低的取样数或快速移动的物体。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9dbdb0f5-da74-4143-8e5a-9371b216a7ed/nfor-denoiser-comparison.gif)

## 设置NFOR降噪器

NFOR降噪器是虚幻引擎的插件，插件名为 **NFORDenoise** 。默认情况下，所有项目都启用该插件，但如果未启用，你可以在 **插件（Plugins）** 浏览器中将其启用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fc55edf-6e84-4c35-bc31-2da31d22a61a/nfor-plugin.png)

### 路径追踪器要求

使用路径追踪器前，你首先必须在项目设置中启用 **支持硬件光线追踪（Support Hardware Ray Tracing）** 。

关于使用虚幻引擎路径追踪器的硬件要求，请参阅[光线追踪和路径追踪功能](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracing-features-in-unreal-engine)文档的"系统要求"一节。

### 设置影片渲染图表

[影片渲染图表](/documentation/404)原生支持NFOR降噪。要使用该时间降噪器，对 **Path Traced Renderer** 通道节点的部分设置进行修改即可。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2652b1c-efd0-435a-88b2-51d4c63917c5/nfor-mrgconfig.png)

选择 **Path Traced Renderer** 节点后修改 **细节（Details）** 面板的如下设置项即可：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13f11ba0-0070-404d-a13b-951e57fe920d/nfor-mrg-ptsettings.png)

-   找到降噪器类别，勾选 **降噪器类型（Denoiser Type）** 并将其设为 **时间（Temporal）** 。这就可以启用时间降噪器NFOR
    
    NFOR是默认的时间降噪器，通过控制台命令 `r.PathTracing.TemporalDenoiser.Name NFOR` 进行设置。如果在下拉菜单中将降噪器类型设置为 **空间（Spatial）** ，则默认降噪器将变为英特尔的开放式图像降噪（OIDN）插件的神经网络引擎（NNE）版本。你也可以使用控制台命令 `r.PathTracing.Denoiser.Name NNEDenoiser` 来对其进行设置。
    
-   根据渲染需要调整 **帧数（Frame Count）** 。当与NFOR降噪一起使用时，这个数字指的是要将当前帧两端（过去和未来）的多少帧用于降噪。你可以将帧的值设为0到3之间。
    
    此设置仅在降噪类型为 **时间（Temporal）** 时适用。当设置为 **0** 时，NFOR将以 **空间（Spatial）** 类型运行。
    

查看日志输出可验证时间降噪器是否在运行。日志中显示的内容应该如下：

… LogNFORDenoise: Frame 322: Denoised NumOfHistory = 5 …

如果日志不显示这些内容，请确认你是否勾选了 **启用降噪器（Enable Denoiser）** 方框。该选项会重载后期处理体积（Post Process Volume）设置中的降噪器设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7051a2e2-206f-452f-abd4-05fc3d230c6e/nfor-mrg-enabledenoiser.png)

如果使用了太多的时间子样本，建议启用 **引用动态模糊（Reference Motion Blur）** 。否则，每个时间子样本都会触发降噪，从而增加不必要的帧降噪时间。此提示同样适用于影片渲染队列。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/449cda97-528a-4d97-8511-af6a842c4bec/nfor-mrg-refmotionblur.png)

### 设置影片渲染队列

要搭配影片渲染队列使用NFOR降噪，你需要设置以下内容：

1.  将控制台变量 `r.PathTracing.SpatialDenoiser.Type` 设为 `1` 以使用时间降噪器。
2.  按需将控制台变量 `r.NFOR.FrameCount` 设置为0至3之间的值。该数值表示要将当前帧两端（过去和未来）的多少帧用于降噪。默认值为2帧。
3.  找到路径追踪（Path Tracing）类别，勾选 **后期处理体积（Post Process Volume）** 下的 **降噪器（Denoiser）** 复选框。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e00cb5a-5b40-4202-a0b8-cc06272ed2b7/nfor-ppvsettings.png)

使用影片渲染队列时，由于需要未来帧，每个镜头结束时都存在带噪点的初始帧和缺失帧。影片渲染图表路径则不存在此问题。

### NFOR杂项参数

更多可用的NFOR降噪参数如下：

-   **辐射过滤（Radiance Filtering）：**
    -   `r.NFOR.NonLocalMean.Radiance.PatchDistance` 将设置在为辐射降噪时非局部均值算法的搜索距离。搜索斑块的宽度和高度等于斑块距离乘以2再+ 1。值越大，越能提高降噪的平滑度，但会以二次方增加渲染时间。默认值为9。
    -   `r.NFOR.NonLocalMean.Radiance.PatchSize` 将设置非局部均值算法的大小，其中斑块的宽度和高度等于斑块大小乘以2再+ 1。默认值为3。数值越大，平滑度越高。
-   **功能过滤（Feature Filtering）：**
    -   `r.NFOR.NonLocalMean.Feature.PatchDistance` （默认值为5）控制功能缓冲区和alpha通道的降噪强度。
    -   `r.NFOR.NonLocalMean.Feature.PatchSize` （默认值为3）
-   **预分割反射率率以保留细节：**
    -   将 `r.NFORPredivideAlbedo.Offset` 设为 `0.1` 。对辐射度进行解调前，会为反射率添加此偏移量，以避免除以零引起的问题。这有助于在画面中保留更多的高频细节。当场景噪点过于严重时，值越大，越能提高降噪平滑度。默认值为0.1。
-   **NFOR帧数（NFOR Frame Count）：**
    
    -   将 `r.NFOR.FrameCount` 设为 `2` ，从而在使用影片渲染队列进行离线渲染时，默认以5帧作为历史记录。这5帧包括前后的各2帧，以及当前的1帧。编辑器中，针对之前单帧的降噪，帧数值将始终为0。目前你可以使用0到3之间的值。
    
    不得为影片渲染图表修改此参数。Path Traced Renderer节点会修改此值，使其与影片渲染图表的内部状态保持一致，以输出正确的帧渲染。
    

## 限制

-   降噪器无法去除萤火虫
-   降噪器需要较大的取样数量。

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [path tracing](https://dev.epicgames.com/community/search?query=path%20tracing)
-   [path tracer](https://dev.epicgames.com/community/search?query=path%20tracer)
-   [artificial intelligence](https://dev.epicgames.com/community/search?query=artificial%20intelligence)
-   [machine learning](https://dev.epicgames.com/community/search?query=machine%20learning)
-   [neural networks](https://dev.epicgames.com/community/search?query=neural%20networks)
-   [nne](https://dev.epicgames.com/community/search?query=nne)
-   [denoiser](https://dev.epicgames.com/community/search?query=denoiser)
-   [denoising](https://dev.epicgames.com/community/search?query=denoising)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置NFOR降噪器](/documentation/zh-cn/unreal-engine/nfor-denoiser-in-unreal-engine#%E8%AE%BE%E7%BD%AEnfor%E9%99%8D%E5%99%AA%E5%99%A8)
-   [路径追踪器要求](/documentation/zh-cn/unreal-engine/nfor-denoiser-in-unreal-engine#%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8%E8%A6%81%E6%B1%82)
-   [设置影片渲染图表](/documentation/zh-cn/unreal-engine/nfor-denoiser-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%BD%B1%E7%89%87%E6%B8%B2%E6%9F%93%E5%9B%BE%E8%A1%A8)
-   [设置影片渲染队列](/documentation/zh-cn/unreal-engine/nfor-denoiser-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%BD%B1%E7%89%87%E6%B8%B2%E6%9F%93%E9%98%9F%E5%88%97)
-   [NFOR杂项参数](/documentation/zh-cn/unreal-engine/nfor-denoiser-in-unreal-engine#nfor%E6%9D%82%E9%A1%B9%E5%8F%82%E6%95%B0)
-   [限制](/documentation/zh-cn/unreal-engine/nfor-denoiser-in-unreal-engine#%E9%99%90%E5%88%B6)