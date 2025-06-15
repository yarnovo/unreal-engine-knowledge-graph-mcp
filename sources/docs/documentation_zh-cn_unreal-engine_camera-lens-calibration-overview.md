# 摄像机镜头校准概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview
> 
> 生成时间: 2025-06-14T20:25:34.107Z

---

目录

![摄像机镜头校准概述](https://dev.epicgames.com/community/api/documentation/image/36892368-7aca-45e6-a2b4-ad3cc8572d10?resizing_type=fill&width=1920&height=335)

要想利用CG渲染和实时视频创建准确的构图，需要在虚幻引擎中有一个虚拟摄像机，能够准确地模拟用于捕获现实世界视频画面的物理摄像机。虚拟摄像机的位置和方向必须紧密匹配物理摄像机的位置和方向，并且其追踪信息必须匹配视频内容的确切计时，以确保每个视频帧准确同步到摄像机在每个时刻的位置。

**摄像机校准（Camera Calibration）** 插件向用户提供了简化的工具和工作流程，用于在编辑器中校准摄像机和镜头。此校准流程会生成所需的数据，以准确地将虚拟摄像机与物理摄像机在空间中的位置对齐，并对物理摄像机的镜头畸变建模。该插件引入了"镜头文件"资产类型，其中封装了摄像机和镜头的所有校准数据。

"摄像机校准"插件还包含一个功能强大的镜头畸变管线，它可以获取校准后的畸变数据，并将准确的后期处理效果应用于CG渲染。畸变后期处理效果可以直接应用于[CineCamera](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)Actor，以便在[影片渲染队列](/documentation/404)中使用，或者应用于[Composure](/documentation/zh-cn/unreal-engine/real-time-compositing-with-composure-in-unreal-engine)的CG层。

该插件的工具和框架可扩展并且很灵活，可支持范围广泛的一系列镜头和工作流程。

## 摄像机镜头校准

### 聚焦和光圈映射

"摄像机校准"插件使用"镜头文件"资产将原始聚焦和光圈值转换为"电影摄像机"组件使用的物理单位。例如，原始输入值可能包括通过LiveLink从外部设备流送的编码器位置（绝对位置或规格化位置）。这些值还可以转换为合适的单位，但这需要微调以实现更高的准确性。

### 校准后的数据

校准后的镜头数据可能因摄像机的聚焦和变焦而异。因此，要实现高质量校准，用户经常需要使用多个聚焦和变焦点进行校准。畸变参数、摄像机固有属性和节点偏移全部与其关联的聚焦和变焦值一起存储在镜头文件中。通过在存储的聚焦和变焦点之间插值，可以针对任何聚焦和变焦位置评估校准后的镜头文件。

### 畸变参数

"摄像机校准"插件进一步支持为多种物理镜头型号定义的准确镜头畸变后期处理效果。这些镜头型号定义了一组畸变参数，用于计算镜头周围各种位置的畸变。

该插件支持球状畸变模型，该模型基于Brown-Conrady模型，并使用五个畸变参数（K1、K2、P1、P2、K3）。这些参数没有单位，并且在校准流程中计算。该插件可扩展，并且允许用户添加对使用不同参数的额外模型的支持。

### 摄像机固有属性

摄像机固有属性包括焦距和图像中心，并且定义了摄像机坐标系中的3D点如何投射到2D图像。这些固有属性也必须校准，以准确地对摄像机和镜头建模。

根据校准方法的不同，焦距可以使用物理单位（毫米）或像素数计算。焦距经常表示为2D向量(Fx, Fy)，其中的长度应该大致相等。为了将表示通用化，镜头文件会将校准后的焦距存储为除以图像传感器宽度和高度（以毫米为单位）或除以图像分辨率（以像素为单位）的规格化值。

规格化之后，Fx和Fy不再彼此大致相等，但(Fx, Fy)应大致等于你的长宽比。

校准后的图像中心考虑了镜头与摄像机图像传感器之间的物理不对齐情况，但通常应该接近理想的中心。图像中心通常也按物理单位（毫米）或像素计算，并且表示为2D向量(Cx, Cy)。类似于焦距，图像中心通过除以传感器宽度和高度（以毫米为单位）或除以图像分辨率（以像素为单位）来规格化。规格化之后，图像中心应该接近(0.5, 0.5)。

### 节点偏移

镜头的节点是光线收敛到的点。在虚幻引擎中，虚拟摄像机应放在虚拟世界中的这个节点处，确保真实对象和CG对象正确匹配。

"节点偏移"校准是单独的校准步骤，用于查找追踪的物理摄像机的姿势，并计算该姿势与你的追踪数据之间的偏移。这可确保在摄像机移动时，虚拟摄像机的变换将继续设置为物理镜头的节点。

### ST图

ST图是一种图像，其中每个像素的值对应于UV空间中畸变的图像坐标。ST图可以使用虚幻引擎外部的校准工具来生成，并且可以用于后期处理，以改变对场景纹理取样时使用的UV。

为了支持已从外部工具生成校准后数据的用户，"摄像机校准"插件支持直接将ST图的输入到镜头文件。

## 镜头文件资产编辑器

镜头文件资产编辑器提供了多个校准工具，用于自动使用校准后的数据填充镜头文件。该编辑器还提供了一个曲线编辑器，用户可以在其中调整计算后的结果。

### 校准步骤

虚幻引擎中的校准步骤包括镜头畸变校准、节点偏移校准，以及用于输入静态镜头信息的步骤。校准步骤的列表可扩展，这意味着程序员可以实现额外的校准工具并将其添加到编辑器。

![Calibration Steps in the Lens File Asset Editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/509f2f3b-2577-4371-8715-fd33e6dcac07/calibration-steps.png)

#### 镜头信息

用户可以输入静态镜头数据，例如镜头型号名称和序列号，还可以输入摄像机数据，例如图像传感器的尺寸。准确的镜头信息有助于确保校准镜头畸变和摄像机参数时的精准度。

#### 镜头畸变

你可以选择用哪种校准算法来计算畸变参数和摄像机固有属性。插件提供了以下算法，它们依靠OpenCV以及一组3D-2D的点对应关系来校准镜头。

-   **棋盘格（Checkerboard）：** 使用一个物理棋盘格，其边角会被自动检测到。
    
-   **点方法（Points Method）：** 使用带有可识别校准图案的校准器，可以是任何对象，其特征必须由用户手动指定
    

这一步的具体实现方法可以扩展。程序员可以通过继承UCameraLensDistortionAlgo类来实现其他算法。

#### 图像中心

你可以在校准镜头后手动调整图像中心的位置。当某两个校准焦点或变焦点之间的插值图像的中心不准确时，或者当某些外部因素（如温度）影响了摄像机镜头时，可以使用此方法。

#### 节点偏移

你可以使用哪种校准算法和校准对象来计算节点偏移。插件包含以下算法：点方法、Aruco标识、棋盘格。

-   **点方法：** 使用带有一个或多个可识别特征（如LED标记）的可跟踪校准对象。你可以将校准器放置在相机画面中的不同位置，并在Simulcam视口中点击，捕获校准器当前的3D和2D位置。在收集了足够点后，系统会最小化捕获点的再投影误差，估算出节点偏移。
    
-   **Aruco标识：** 一种特殊的点方法，使用图像处理技术来捕捉带有Aruco图案的跟踪校准器。
    
-   **棋盘格：** 一种特殊的点方法，它使用图像处理技术以及一个带有棋盘格图案来捕捉跟踪校准器的2D位置。
    
-   **光轴：** 借助校准器对象，你可以在相机不同距离以外捕捉少量点，并让这些点都精确投射到镜头中心。这些点之间的连线代表光轴，通过手动将虚拟摄像机沿该轴线移动，直到找到入口瞳孔的位置，就可以找到节点（nodal point）。
    

此步骤可扩展，所以程序员可以继承UCameraNodalOffsetAlgo类来实现额外的算法。

### 视口设置

你可以修改视口设置来调整镜头文件资产编辑器视口中的显示内容。视口设置包含以下参数：

-   **透明度（Transparency）：** 滑块用于调整媒体内容和CG层的合成效果。0.0表示100%显示媒体。1.0表示100%显示CG。
    
-   **摄像机（Camera）：** 用来渲染CG层的[虚拟相机](/documentation/zh-cn/unreal-engine/virtual-cameras-in-unreal-engine)Actor。如需执行校准，此摄像机必须有一个[Live Link](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine)摄像机主体来控制它的焦点、光圈和变焦值，并且有镜头文件资产来指定给它。
    
-   **媒体源（Media Source）：** 用于渲染媒体层的[媒体配置文件](/documentation/zh-cn/unreal-engine/supporting-multiple-media-configurations-in-unreal-engine)。
    
-   **覆层（Overlay）：** 用于在视口上添加覆层的选项。你可以选择 **无** 或 **准星（Crosshair）**。你也可以在插件设置中添加自定义叠加内容。
    

![Viewport Settings ](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a11e4542-8a06-4d78-a185-388d3dd1e0bd/viewport-settings.png)

## 畸变管线

"镜头畸变"管线将使用摄像机和镜头数据来创建应用于最终渲染的准确畸变效果。

有三种主要类型的输入数据，可用于对现实世界镜头的畸变建模：

-   流送每帧畸变参数和摄像机固有属性的LiveLink镜头源。
    
-   流送摄像机FIZ以评估"镜头文件"资产的LiveLink摄像机源。
    
-   使用摄像机Actor的当前聚焦和变焦来评估"镜头文件"资产。
    

接收输入数据并生成畸变状态的底层对象称为 **镜头畸变处理程序（lens distortion handler）**。向处理程序提供输入数据的对象称为畸变数据的 **生产者（producers）**。从处理程序接收输出置换贴图并将其应用于图像的对象称为畸变数据的 **消费者（consumers）**。

镜头畸变处理程序将接收畸变参数和摄像机固有属性作为输入，并且将生成畸变UV置换贴图和引用该置换贴图的后期处理材质。置换贴图分辨率可以在项目设置中指定，并且相较于最终渲染分辨率可以相对较小（例如，128 x 128）。

### 畸变数据的生产者

#### 流送每帧畸变参数和摄像机固有属性的LiveLink

有一些第三方摄像机追踪供应商，除了使用自己的协议提供基本摄像机位置和方向之外，还会提供校准后的镜头畸变信息。此镜头数据（包括畸变参数和摄像机固有属性）将针对每帧进行流送，并且可用于在无需"镜头文件"资产的情况下计算畸变。为了将此数据流送到虚幻引擎中，我们提供了LiveLink镜头角色和镜头控制器。

镜头控制器将实例化新的镜头畸变处理程序，并流送它从LiveLink源接收的数据。实例化的处理程序类型取决于镜头型号，这也必须由LiveLink源指定为静态数据。

#### 流送摄像机FIZ以评估"镜头文件"资产的LiveLink

对于在虚幻引擎中执行摄像机校准的用户，我们向LiveLink摄像机控制器添加了"镜头文件"资产。存在镜头文件时，摄像机控制器将在通过LiveLink流送的聚焦和变焦位置评估该镜头文件。此评估会在镜头文件中最接近的校准点之间插值，以生成当前帧的畸变参数、摄像机固有属性和节点偏移。

或者，如果镜头文件包含ST图，这些内容也会基于通过LiveLink流送的聚焦和变焦来插值。

#### 静态摄像机FIZ和"镜头文件"资产

一些用户可能不通过LiveLink流送实时摄像机数据，因此管线还支持使用虚拟摄像机的当前聚焦和变焦设置评估镜头文件。

"摄像机校准"插件引入了可以添加到电影摄像机Actor的"镜头畸变"组件。此组件可以直接基于当前摄像机设置评估镜头文件。

#### 蓝图

用户可以使用蓝图创建镜头畸变处理程序对象，并驱动其畸变状态，而无需指定镜头文件。此工作流程不适合使用实时视频合成CG元素，但可用于偏好畸变外观的纯CG项目。

### 畸变数据的消费者

#### 带有"镜头畸变"组件的电影摄像机

"镜头畸变"组件可以添加到电影摄像机Actor，以从场景中的所有生产者接收畸变数据。

用户可以从组件设置中选择畸变源。选择畸变源后，后期处理材质将自动添加到目标摄像机组件，该组件会接收所选畸变源生成的畸变置换贴图。

你可以在组件设置中选择一个畸变源。选择了畸变源后，系统会自动为目标摄像机组件添加一个后处理材质。该组件用于接收由畸变源产生的畸变位移图。

将畸变效果应用于摄像机并不会影响可能以该摄像机为目标的所有Composure CG层。

#### Composure CG层

你可以在Composure CG层设置中指定畸变源。可用源列表将基于关卡中当前正在为CG层的目标摄像机生成畸变数据的生产者。

选择畸变源后，后期处理材质将自动添加到CG层的场景捕获组件。此材质会接收所选畸变源生成的畸变置换贴图。请注意，目标摄像机必须是电影摄像机Actor。

将畸变效果应用于CG层并不会影响目标摄像机的渲染输出。

### 过扫描

为了恰当地使CG图像畸变，需要的输入像素往往超过原始非畸变渲染中可用的像素。为了确保畸变图像在每个像素包含有效数据，我们必须 **过扫描** 非畸变渲染，从场景生成少量额外渲染。

过扫描中需要的额外像素百分比由镜头畸变处理程序基于当前畸变状态计算。然后，**过扫描因子（Overscan Factor）** 被畸变消费者用于扩大非畸变渲染的视野(FOV)，然后再应用后期处理畸变材质。这会生成带有更宽场景视图的非畸变图像，但是目标图像分辨率与原始非畸变图像相同。

用户还可以从畸变生产者设置指定过扫描乘数，其中用户可以指定应该应用多少计算的过扫描（从0x到2x的任意数字）。

### 非畸变

镜头畸变处理程序会计算非畸变置换贴图，该贴图可从蓝图访问。这样一来，用户就能创建自定义后期处理材质，然后应用这些材质以逆转传入媒体源中的畸变。

## OpenCV

摄像机镜头校准工具的算法使用了[OpenCV](https://opencv.org/)。你可以通过 **OpenCV** 插件直接使用OpenCV。该插件包含OpenCV 4.5.4版本，并添加了新的蓝图节点，如用于ArUco标记跟踪和棋盘格跟踪的节点。关于这些蓝图节点的更多细节，请参考蓝图API参考页面。

-   [OpenCV棋盘格函数的蓝图API参考页面](https://docs.unrealengine.com/BlueprintAPI/OpenCV_1)
-   [OpenCV ArUco函数的蓝图API参考页面](https://docs.unrealengine.com/BlueprintAPI/OpenCV/)

-   [camera](https://dev.epicgames.com/community/search?query=camera)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [摄像机镜头校准](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E6%91%84%E5%83%8F%E6%9C%BA%E9%95%9C%E5%A4%B4%E6%A0%A1%E5%87%86)
-   [聚焦和光圈映射](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E8%81%9A%E7%84%A6%E5%92%8C%E5%85%89%E5%9C%88%E6%98%A0%E5%B0%84)
-   [校准后的数据](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E6%A0%A1%E5%87%86%E5%90%8E%E7%9A%84%E6%95%B0%E6%8D%AE)
-   [畸变参数](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E7%95%B8%E5%8F%98%E5%8F%82%E6%95%B0)
-   [摄像机固有属性](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E6%91%84%E5%83%8F%E6%9C%BA%E5%9B%BA%E6%9C%89%E5%B1%9E%E6%80%A7)
-   [节点偏移](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E8%8A%82%E7%82%B9%E5%81%8F%E7%A7%BB)
-   [ST图](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#st%E5%9B%BE)
-   [镜头文件资产编辑器](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E9%95%9C%E5%A4%B4%E6%96%87%E4%BB%B6%E8%B5%84%E4%BA%A7%E7%BC%96%E8%BE%91%E5%99%A8)
-   [校准步骤](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E6%A0%A1%E5%87%86%E6%AD%A5%E9%AA%A4)
-   [镜头信息](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E9%95%9C%E5%A4%B4%E4%BF%A1%E6%81%AF)
-   [镜头畸变](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E9%95%9C%E5%A4%B4%E7%95%B8%E5%8F%98)
-   [图像中心](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E5%9B%BE%E5%83%8F%E4%B8%AD%E5%BF%83)
-   [节点偏移](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E8%8A%82%E7%82%B9%E5%81%8F%E7%A7%BB-2)
-   [视口设置](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E8%A7%86%E5%8F%A3%E8%AE%BE%E7%BD%AE)
-   [畸变管线](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E7%95%B8%E5%8F%98%E7%AE%A1%E7%BA%BF)
-   [畸变数据的生产者](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E7%95%B8%E5%8F%98%E6%95%B0%E6%8D%AE%E7%9A%84%E7%94%9F%E4%BA%A7%E8%80%85)
-   [流送每帧畸变参数和摄像机固有属性的LiveLink](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E6%B5%81%E9%80%81%E6%AF%8F%E5%B8%A7%E7%95%B8%E5%8F%98%E5%8F%82%E6%95%B0%E5%92%8C%E6%91%84%E5%83%8F%E6%9C%BA%E5%9B%BA%E6%9C%89%E5%B1%9E%E6%80%A7%E7%9A%84livelink)
-   [流送摄像机FIZ以评估"镜头文件"资产的LiveLink](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E6%B5%81%E9%80%81%E6%91%84%E5%83%8F%E6%9C%BAfiz%E4%BB%A5%E8%AF%84%E4%BC%B0%22%E9%95%9C%E5%A4%B4%E6%96%87%E4%BB%B6%22%E8%B5%84%E4%BA%A7%E7%9A%84livelink)
-   [静态摄像机FIZ和"镜头文件"资产](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E9%9D%99%E6%80%81%E6%91%84%E5%83%8F%E6%9C%BAfiz%E5%92%8C%22%E9%95%9C%E5%A4%B4%E6%96%87%E4%BB%B6%22%E8%B5%84%E4%BA%A7)
-   [蓝图](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E8%93%9D%E5%9B%BE)
-   [畸变数据的消费者](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E7%95%B8%E5%8F%98%E6%95%B0%E6%8D%AE%E7%9A%84%E6%B6%88%E8%B4%B9%E8%80%85)
-   [带有"镜头畸变"组件的电影摄像机](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E5%B8%A6%E6%9C%89%22%E9%95%9C%E5%A4%B4%E7%95%B8%E5%8F%98%22%E7%BB%84%E4%BB%B6%E7%9A%84%E7%94%B5%E5%BD%B1%E6%91%84%E5%83%8F%E6%9C%BA)
-   [Composure CG层](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#composurecg%E5%B1%82)
-   [过扫描](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E8%BF%87%E6%89%AB%E6%8F%8F)
-   [非畸变](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#%E9%9D%9E%E7%95%B8%E5%8F%98)
-   [OpenCV](/documentation/zh-cn/unreal-engine/camera-lens-calibration-overview#opencv)