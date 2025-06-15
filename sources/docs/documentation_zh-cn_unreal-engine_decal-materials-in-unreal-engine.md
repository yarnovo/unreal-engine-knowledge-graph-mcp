# 虚幻引擎中的贴花材质 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:27:27.777Z

---

目录

![贴花材质](https://dev.epicgames.com/community/api/documentation/image/deeeae36-31d8-41fc-8971-0a55aeed2a6f?resizing_type=fill&width=1920&height=335)

贴花是一种材质，可将材质的特征（例如基础颜色、粗糙度和法线）投射到关卡中的几何体上，从而对场景做出局部修改。这包括能够使用贴花Actor或贴花网格体直接投射到静态和骨骼网格体。

贴花最常用于打破重复性，或在底层表面上添加脏污和破损效果。下面的示例展现了放置贴花后，无缝拼贴的墙壁纹理所呈现的破损效果。

![石墙上的贴花示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3eb435c9-f501-49a2-91b4-721ebd3d8e9c/decals-use-case.png)

没有贴花和有贴花的石墙。

虚幻引擎使用两种方法将贴花投射到网格体上。

-   在 **DBuffer** 中累积所有贴花，它会存储BasePass之前的基础颜色、法线和粗糙度信息。然后在BasePass材质中对DBuffer取样。
-   在BasePass之后，但在光照之前，直接将贴花混合到 **GBuffer** 。

在所有虚幻引擎5项目的项目设置中，DBuffer贴花默认启用，是贴花的默认应用方法。虚幻引擎会根据渲染所在的平台自动推断是使用DBuffer还是GBuffer通道。凡是具有 **延迟贴花（Deferred Decal）** 材质域的材质，均在适合项目和平台的贴花通道中渲染。

Substrate和DBuffer材质表达式需要启用DBuffer贴花才能正确渲染。如需更多信息和上下文，请参阅[DBuffer贴花平台和功能支持](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#dbuffer%E8%B4%B4%E8%8A%B1%E5%B9%B3%E5%8F%B0%E5%92%8C%E5%8A%9F%E8%83%BD%E6%94%AF%E6%8C%81)。

## 使用贴花

贴花由两个元素构成：材质和显示该材质的方法，例如贴花Actor或网格体。你可以使用以下方法放置贴花：

-   在关卡中手动放置贴花Actor。
-   创建包含贴花Actor组件的蓝图。
-   将贴花材质应用于静态或骨骼网格体。

### 贴花材质

要定义贴花材质，请设置其：

![贴花材质属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47f6d774-d7d8-4ebb-9c91-f3d4bf1b75ab/decal-properties.png)

-   **材质域：**延迟贴花
-   **混合模式：**半透明或Alpha复合

DBuffer贴花不支持[调制](/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine#%E8%B0%83%E5%88%B6)混合模式，但这也不会导致编译错误。如果选择“调制”，材质会成功编译，但混合模式会静默回退为半透明混合模式。

如果你的材质需要更多混合选项，请参阅本页面的[DBuffer材质表达式](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#dbuffer%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F)章节。

### 贴花Actor

你可以从 **创建（Create）** 菜单的 **视觉效果（Visual Effects）> 贴花Actor（Decal Actor）** 下创建贴花Actor。或者，你也可以从 **放置Actor（Place Actors）** 面板的 **视觉效果（Visual Effects）** 类别中将贴花Actor拖入关卡中。

![创建贴花Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b821f46c-d839-49bb-8b38-bf4f6b6aad54/create-decal-actor.png)

贴花Actor是一个与方向相关的线框盒体，决定了贴花材质投射的边界。其箭头指示贴花的投射方向。

![贴花Actor线框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ec23502-3677-4ac9-9d3f-42aa4df2b178/decal-actor-direction.png)

要使用贴花Actor，请执行以下操作：

1.  将贴花Actor放置在关卡中，并使其朝向要投射到的表面。
2.  在细节面板中，将Dbuffer贴花材质分配到贴花材质分配槽。

贴花Actor可以垂直或沿斜角投射到表面上。边界框达到极限后，贴花投射会消退，在它和底层材质之间混合，如以下示例所示。

![没有和有旋转消退的贴花Actor边界框。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01787e02-0f7b-4c19-81b5-5c9023b23684/decal-actor-bounding-box.png)

贴花Actor具有以下属性：

![贴花Actor属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c5adc80-cb82-426c-82dc-5ae47983b344/decal-actor-properties.png)

属性

定义

**贴花材质（Decal Material）**

指定贴花使用的材质资产。

**排序（Sort Order）**

控制贴花元素的渲染顺序。数字越大，渲染越迟（在最上层），数字越小，渲染位置越靠近最底层。

**消退屏幕尺寸（Fade Screen Size）**

贴花将淡出的屏幕尺寸。

**消退开始延迟（Fade Start Delay）**

贴花淡出前要等待的秒数。

**消退时长（Fade Duration）**

贴花淡出的秒数。将消退时长和开始延迟设置为0会使贴花持久存在。

**淡入时长（Fade In Duration）**

贴花淡入的秒数。

**淡入开始延迟（Fade In Start Delay）**

贴花淡入之前，要等待的秒数。

**消退后销毁所有者（Destroy Owner After Fade）**

启用后，贴花所属的Actor将在贴花淡出后自动销毁。

**贴花尺寸（Decal Size）**

局部空间中的贴花尺寸。

**贴花颜色（Decal Color）**

一种设置贴花[基础颜色](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine#%E5%9F%BA%E7%A1%80%E9%A2%9C%E8%89%B2)的方式。你可以使用Decal Color节点在材质图表中访问此颜色。

### 网格体贴花

贴花材质可以直接应用于静态和骨骼网格体，以充当自定义贴花。这些在你有自定义形状和投射要实现时非常适合，例如将网格体应用于表面，或以贴花Actor中无法实现的特定方式在现有网格体上添加细节。

下面的示例展现了一个贴花网格体，其中带有很接近贴花形状的自定义几何体片段。此方法。

![旋转的贴花Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18e4ac99-067d-448a-8960-548621a94b63/road-mesh-decal.png)

左侧：贴花网格体几何体；右侧：游戏中显示的贴花。

### 贴花属性用法

#### Actor接收贴花

静态和骨骼网格体有一个 **接收贴花（Receives Decals）** 属性，用于设置是否应该接受投射到其表面上的贴花。由于贴花Actor是沿某个方向投射贴花材质的体积，这意味着与该体积相交的所有对象都会受影响。对于不应受贴花影响的Actor，禁用“接收贴花”属性很有用。例如，对于在世界中移动的角色，禁用该属性很有用，这样当角色在体积中移动时，贴花就不会投射到角色上。

![接收贴花设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/312799fd-09e1-4434-883b-653e9c3b3dc3/receives-decals-setting.png)

下面的示例展现了与贴花Actor相交的紧密Actor群集。只有墙壁受投射的贴花材质影响。其他两个对象都禁用了“接收贴花”，所以不受贴花Actor的体积影响。

![接收贴花示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa447f56-aae4-4bdf-8907-86b89d37a5fd/receives-decals-example.png)

#### 贴花响应

游戏中贴花的最终外观不仅取决于属性，还取决于接收贴花投射的材质。例如，要使贴花材质与它投射到的材质混合，就需要将该数据从接收材质传递到贴花材质，以便它们恰当地混合在一起。

此示例比较了贴花材质投射到没有设置贴花响应（左侧）的材质表面上与投射到已将贴花响应设置为颜色、法线和粗糙度（右侧）的材质表面上的情况。如果接收表面正确设置了贴花响应时，投射的贴花和接收材质就可以相应混合。

![颜色法线粗糙度贴花响应](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49b01cc9-d3de-45a0-be42-e57ced487be8/color-normal-roughness.png)

接收材质的 **贴花响应（Decal Response）** 属性将决定在接收表面上显示哪些贴花投射属性。你可以在材质的 **细节（Details）** 面板的 **材质（Material）> 高级（Advanced）** 下设置此项。

所有材质的默认响应都被设置为 **颜色法线粗糙度（Color Normal Roughness）** 。

![贴花响应属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0458ae3c-4a93-4f5e-950e-454600ca2067/decal-response-property.png)

贴花响应

定义

**无（None）**

材质不接收贴花。仍然可以从材质图表中读取DBuffer通道以进行自定义贴花应用，这样可释放插值器。

**颜色、法线、粗糙度（Color Normal Roughness）**

接收贴花，应用所有DBuffer通道。

**颜色（Color）**

接收贴花，应用颜色DBuffer通道。

**颜色、法线（Color Normal）**

接收贴花，应用颜色和法线Dbuffer通道。

**颜色、粗糙度（Color Roughness）**

接收贴花，应用颜色、粗糙度、高光度和金属感DBuffer通道。

**法线（Normal）**

接收贴花，应用法线DBuffer通道。

**法线、粗糙度（Normal Roughness）**

接收贴花，应用法线、粗糙度、高光度和金属感DBuffer通道。

**粗糙度（Roughness）**

接收贴花，应用粗糙度、高光度和金属感DBuffer通道。

#### 排序

如果你有多个重叠贴花，你可以使用 **排序（Sort Order）** 属性指定贴花的显示顺序。值更大的贴花将显示在值更小的贴花之上。此属性位于贴花Actor上。

![排序](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32c7a1c1-e9e7-48a3-b474-9ab3e37c6c9d/sort-order.png)

在下面的示例中，有三个贴花彼此重叠。蓝色设置为3，红色为2，绿色为1，所以蓝色在所有贴花之上，接着是红色，然后是绿色。

![排序示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/effcfa78-0a09-4861-a6c4-17d45e0685bc/sort-order-example.png)

## DBuffer材质表达式

为获得恰当的结果，请在接收贴花的材质（而不是应用于贴花Actor的贴花材质本身）的图表中使用这些材质表达式。

使用DBuffer贴花材质域的材质仅支持半透明和Alpha复合混合模式。对于你想创建的贴花材质类型，这可能带来限制。**DBuffer材质表达式（DBuffer Material Expressions）** 在添加到接收材质的逻辑时允许自定义混合逻辑。

利用这些DBuffer材质表达式，可以访问可构成[贴花响应](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E8%B4%B4%E8%8A%B1%E5%93%8D%E5%BA%94)的三种DBuffer纹理中的每一个 — BaseColor、WorldNormal和Roughness。这些节点将DBuffer中的纹理数据直接读取到材质图表中，为你的贴花材质带来可自定义的灵活性，例如近似重现虚幻引擎4（UE4）中的旧版染色贴花行为。

![DBuffer纹理表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/377624a2-41f5-4f3d-a55a-3fe73ce6624d/dbuffer-expressions.png)

要指定材质表达式从哪个DBuffer纹理中读取数据，请在图表中选择该节点，并使用细节面板中的 **DBuffer纹理（DBuffer Texture）** 属性下拉菜单，在BaseColor、WorldNormal和Roughness之间选择。

![Dbuffer纹理设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1984f799-5509-4f24-b81c-c3f2e7257a71/dbuffer-texture-dropdown.png)

除了DBuffer材质表达式之外，还有 **ApplyDBuffer** 材质函数，可用于将DBuffer材质表达式直接应用于材质属性。它会复制DBuffer贴花响应属性自动应用的逻辑。

![应用DBuffer材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/404651ad-078f-474c-8986-8fa8181bbf61/apply-dbuffer-function.png)

你可以将贴花响应设置设为 **无（None）** ，防止你的逻辑在使用ApplyDBuffer节点时重复应用贴花。

### 重现旧版行为

利用 **DBuffer** 材质表达式，可以近似创建虚幻引擎4中的旧版贴花混合模式。

下面的示例比较了虚幻引擎4中的染色贴花混合模式（左侧）与使用DBuffer材质表达式在虚幻引擎5中重现的模式（右侧）。

这两者之间存在视觉差异，部分原因是虚幻引擎4和虚幻引擎5之间存在光照差异。这两个示例都由定向光源和天空光照动态点亮。

![DBuffer染色混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f81957e-8121-4848-a54a-4de4f4cdcb89/stain-blending-example.png)

左侧：虚幻引擎4中的染色贴花；右侧：虚幻引擎5中的近似染色贴花。

下图显示了重现染色贴花混合模式的旧版外观的起始点。

![染色材质图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5be03039-3937-4f3e-a477-60b12faa6ac9/stain-material-graph.png)

使用DBuffer材质表达式的材质应该将其贴花响应设置为 **无（None）** ，避免可能导致贴花显示不正确的重复应用。

![贴花响应节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b79ba74a-8836-4039-8bc8-2e7f47fe2a90/decal-response-none.png)

这种方法的主要局限性在于，DBuffer贴花必须要排序，而且表面始终只能显示一个贴花。重叠的DBuffer贴花不会混合在一起。这在贴花重叠时更明显。

![重叠的DBuffer材质表达式贴花示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41318036-5fbb-45b6-9f60-5d1a2970bc85/overlapping-dbuffer-decal-example.png)

左侧：虚幻引擎4中重叠的染色DBuffer贴花；右侧：虚幻引擎5中重叠的DBuffer材质表达式贴花。

## 性能影响

在贴花的渲染开销中，屏幕覆盖范围和材质复杂性是最大的因素，在渲染其他材质时也是如此。只要控制住这两个因素，你就可以同时渲染许多贴花，而不对性能造成太大冲击。

在光栅渲染路径中使用DBuffer贴花的一大因素是，需要在场景中激活深度预通道。实际上，对于更高端的平台，这基本上不会造成问题，因为虚拟纹理、Nanite和Lumen等系统都使用深度预通道。如果你的项目中使用了这类系统，则DBuffer贴花不会造成影响。

若要优化DBuffer贴花的性能，最好仅为实际需要接收贴花的材质启用DBuffer贴花响应，这包括在接收材质中启用实际使用的通道（具体请参阅[贴花响应](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E8%B4%B4%E8%8A%B1%E5%93%8D%E5%BA%94)一节）。凡是利用DBuffer的材质，都有额外代码来执行此操作，这进而增加了材质的复杂性。

重新投射上一帧的法线也可能会带来一些开销，但仅限于受贴花影响的像素的取样和重新投射。

在使用路径追踪器渲染时，[网格体贴花](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E8%B4%B4%E8%8A%B1)会产生较大的开销，因为维护和追踪贴花的另一个加速结构（即TLAS）会产生费用，并且在追踪TLAS之前对贴花投射排序也有额外的开销。一般来说，贴花的屏幕覆盖范围越大，贴花的开销就越大。

例如，名为《The Origin》的[摄像机内视效制片测试](https://www.fab.com/listings/17ce3d9c-0843-48ff-96d6-3f49a7163dbd)示例项目使用了大量网格体贴花，它渲染一个帧的开销比更有限（贴花数量少很多）的场景高大约30%。你可以通过视口中的显示选项打开和关闭贴花，并使用 `stat gpu` 命令查看开销。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e15759d2-8398-4db4-89a0-20bca958c0c3/origin-pathtracer-01.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e15759d2-8398-4db4-89a0-20bca958c0c3/origin-pathtracer-01.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ba6c384-69dd-4e3e-b311-c071c57cc1ef/origin-pathtracer-02.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ba6c384-69dd-4e3e-b311-c071c57cc1ef/origin-pathtracer-02.png)

贴花关闭（约32毫秒/取样）

贴花打开（约44毫秒/取样）

## 其他信息和限制

### DBuffer贴花平台和功能支持

虚幻引擎5项目会默认启用DBuffer贴花，但你仍可以在一些不受支持的平台（例如移动平台）上强制关闭它。这可能会影响已使用[Dbuffer材质表达式](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#dbuffer%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F)创作的材质。这还可能为需要启用DBuffer贴花的功能带来问题，例如[Substrate](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine)。

如果你的项目将支持多个平台，你需要在创作材质时牢记这一点。一种做法是使用 **Feature Level Switch** 材质节点，简化更低端渲染路径的材质图表，而不必为这些路径使用单独的材质。

### DBuffer贴花的移动兼容性

移动平台不支持DBuffer贴花渲染。移动正向着色（OpenGL ES 3.2、Metal、Vulkan和Nintento Switch）也不支持GBuffer贴花渲染，而是通过将基础颜色（BaseColor）和自发光应用到光照场景颜色来模拟贴花。使用[移动延迟着色](/documentation/zh-cn/unreal-engine/using-the-mobile-deferred-shading-mode-in-unreal-engine)时，会使用GBuffer贴花，但是不支持环境光遮蔽。

如需详细了解移动渲染路径的贴花支持，请参阅[移动渲染功能](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine)。

#### Substrate贴花的移动兼容性

如果你在项目中使用了[Substrate](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine)，移动延迟着色将不会使用GBuffer，并且仅支持渲染DBuffer贴花。

### 与UE4旧版贴花的视觉效果差异

如果你的项目使用烘焙的光照，UE4中的旧版GBuffer贴花与UE5中的DBuffer贴花可能存在视觉效果差异。这是因为，GBuffer贴花在烘焙的光照和天空光照之后应用，并且不像DBuffer贴花那样直接受光照影响。这会导致看起来褪色。

DBuffer贴花会更早应用（主要在BasePass材质中，但自发光和环境光遮蔽除外），这意味着它在计算烘焙的间接光照时会被正确取样。下面的示例显示了使用烘焙的间接光照的GBuffer网格体贴花（左侧）和DBuffer网格体贴花（右侧）之间的差异。

![间接点亮的GBuffer和DBuffer贴花示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/017184a7-f24d-447c-adb3-a269f670131f/gbuffer-washed-out.png)

### 法线重新投射

DBuffer贴花必须重新投射上一帧的法线，才能克服着色器的限制。这是因为法线只能写入给定帧或从中读取，不能同时写入和读取。若发生重新投射错误，DBuffer贴花可能会因法线缺失而出现面片瑕疵。这是因为DBuffer取样太早，而无法取样除预通道深度之外的内容。

默认情况下，会禁用上一帧法线预投射。如果你看到这些类型的瑕疵，你可以使用控制台变量 `r.Decal.NormalProjectionEnabled` 启用上一帧法线重新投射。

启用后，DBuffer贴花上的SceneTexture节点会允许上一帧的法线重新投射。如果在深度预通道中提供了动作，就会从上一帧取法线重新投射（ `r.VelocityOutputPass 0` （默认值））。否则，法线重新投射退却会从深度缓冲区提取法线。

法线重新投射的主要应用场景为基于表面的朝向来应用贴花，例如落在对象上表面的雪或长在上面的草。

### 染色混合模式

正如[重现旧版行为](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E9%87%8D%E7%8E%B0%E6%97%A7%E7%89%88%E8%A1%8C%E4%B8%BA)一节中的示例中所提到的那样，你可以使用[DBuffer材质表达式](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#dbuffer%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F)重现虚幻引擎4中的染色贴花混合模式的外观和应用，但不能完全重现，因为没有考虑重叠贴花。

但如果你是将项目从虚幻引擎4迁移到虚幻引擎5，那么DBuffer贴花不支持染色混合模式。相反，它们会回退到默认混合模式。DBuffer贴花会在颜色值之间插值，使得 `(OutputColor = SourceAlpha + Dest(1-Alpha))` 。而染色混合模式是类似于 `(OutColor = SourceAlpha + Dest)` 的乘法运算。

### 贴花自发光和环境光遮蔽输入

自发光和环境光遮蔽被视为贴花材质中的特殊情况。它们在主材质节点上的输入引脚从不使用DBuffer系统，而是由额外的绘制调用实现，这些调用会对场景颜色（SceneColor）或屏幕空间环境光遮蔽执行延迟混合。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [decals](https://dev.epicgames.com/community/search?query=decals)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用贴花](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%B4%B4%E8%8A%B1)
-   [贴花材质](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E8%B4%B4%E8%8A%B1%E6%9D%90%E8%B4%A8)
-   [贴花Actor](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E8%B4%B4%E8%8A%B1actor)
-   [网格体贴花](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E8%B4%B4%E8%8A%B1)
-   [贴花属性用法](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E8%B4%B4%E8%8A%B1%E5%B1%9E%E6%80%A7%E7%94%A8%E6%B3%95)
-   [Actor接收贴花](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#actor%E6%8E%A5%E6%94%B6%E8%B4%B4%E8%8A%B1)
-   [贴花响应](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E8%B4%B4%E8%8A%B1%E5%93%8D%E5%BA%94)
-   [排序](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E6%8E%92%E5%BA%8F)
-   [DBuffer材质表达式](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#dbuffer%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F)
-   [重现旧版行为](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E9%87%8D%E7%8E%B0%E6%97%A7%E7%89%88%E8%A1%8C%E4%B8%BA)
-   [性能影响](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E6%80%A7%E8%83%BD%E5%BD%B1%E5%93%8D)
-   [其他信息和限制](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E5%85%B6%E4%BB%96%E4%BF%A1%E6%81%AF%E5%92%8C%E9%99%90%E5%88%B6)
-   [DBuffer贴花平台和功能支持](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#dbuffer%E8%B4%B4%E8%8A%B1%E5%B9%B3%E5%8F%B0%E5%92%8C%E5%8A%9F%E8%83%BD%E6%94%AF%E6%8C%81)
-   [DBuffer贴花的移动兼容性](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#dbuffer%E8%B4%B4%E8%8A%B1%E7%9A%84%E7%A7%BB%E5%8A%A8%E5%85%BC%E5%AE%B9%E6%80%A7)
-   [Substrate贴花的移动兼容性](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#substrate%E8%B4%B4%E8%8A%B1%E7%9A%84%E7%A7%BB%E5%8A%A8%E5%85%BC%E5%AE%B9%E6%80%A7)
-   [与UE4旧版贴花的视觉效果差异](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E4%B8%8Eue4%E6%97%A7%E7%89%88%E8%B4%B4%E8%8A%B1%E7%9A%84%E8%A7%86%E8%A7%89%E6%95%88%E6%9E%9C%E5%B7%AE%E5%BC%82)
-   [法线重新投射](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E6%B3%95%E7%BA%BF%E9%87%8D%E6%96%B0%E6%8A%95%E5%B0%84)
-   [染色混合模式](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E6%9F%93%E8%89%B2%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F)
-   [贴花自发光和环境光遮蔽输入](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine#%E8%B4%B4%E8%8A%B1%E8%87%AA%E5%8F%91%E5%85%89%E5%92%8C%E7%8E%AF%E5%A2%83%E5%85%89%E9%81%AE%E8%94%BD%E8%BE%93%E5%85%A5)