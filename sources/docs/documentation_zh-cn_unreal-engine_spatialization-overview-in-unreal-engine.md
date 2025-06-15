# 虚幻引擎中的空间化概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:23:36.977Z

---

目录

![空间化概述](https://dev.epicgames.com/community/api/documentation/image/f19c9181-efd8-428b-81bc-fc4f40d784e2?resizing_type=fill&width=1920&height=335)

## 介绍

在音频中，声音空间化的模拟（也称为声音定位），是通过综合运用众多音频技术来实现的。这些技术模仿自然声音现象，例如定向、衰减、传播、遮挡和阻塞以及混响。

下面是这些现象的说明：

**现象**

**描述**

**方向**

听者与声源之间的相对方向。

**衰减**

听者与声源之间的距离。

**传播**

声音从声源到听者的路径。

**阻塞和遮挡**

声音在向听者传播时可能会遇到其他物体。这些物体就是声音的障碍物。

**混响**

听者可能听到从不同路径传来的声音，从而感知到回声效果。

在虚幻音频引擎和游戏音频中，术语"空间化"通常仅指整体广义空间化问题的一个方面：用于相对于听者定向声音的方法和技术。其他方面，例如衰减、混响和遮挡，通常在相关上下文中讨论。本概述使用的术语"空间化"专指相对于听者定向声音的方法。

三种主要的空间化方法是 **平移**、**声场空间化** 和 **双耳音频空间化**。

## 平移

平移是最古老和最简单的模拟空间化的方法。在其最基本的形式中，可以通过调整不同音频通道（扬声器）之间的相对增益来实现平移。增益是一个通用术语，用于描述衰减（增益 < 1.0）或增强（增益 > 1.0）声音的操作。

对于给定的声音，使其在左声道的增益高于右声道会产生声音来自左侧的错觉。这称为立体声平移，其中"立体声"表示音频有两个声道。这很明显会产生空间化的感觉，但请注意，这种错觉是因为大脑已经受到训练，可以理解来自左侧的声音在左耳听起来会比右耳听起来更大。从技术上讲，这种心理声学体验称为双耳声级差，其中"声级"是另一个常用音量术语。

对于具有两个以上声道的扬声器设置，例如四声道、5.1和7.1环绕声，平移方法与立体声平移相同，但它适用于成对的扬声器。当描述两个以上扬声器的平移时，这称为成对平移。

对于使用两个以上声道并且在收听平面上方和下方有扬声器的扬声器设置，平移方法类似于成对平移。但是，不是调整两个成对扬声器之间的相对增益，而是调整扬声器三元组之间的增益（即三角测量）。这类平移称为向量基幅值平移或VBAP。

### 确定平移值：听者和扬声器几何体

在讨论不同的平移方法之前，了解如何根据游戏几何体计算平移值会很有用。计算平移值时需要考虑两个主要几何体：听者的几何体，以及物理扬声器位置的几何体。

### 听者几何体

所有空间化方法都要有听者的概念。听者是虚拟听者所在的位置和方向。它可以是静止的，也可以在3D环境中手动控制。

通常，听者附加到玩家摄像机，假设游戏视口的"眼"和"耳"应该位于同一位置。尽管在大多数情况下这是合理的假设，但根据游戏类型或游戏要求，可能会有更多不寻常的设置。例如，某个角色可能能够听到不同位置的声音。另一种例子可以在第三人称游戏中看到，设计师经常拆分听者几何体：设置角色的听者位置，从而实现距离衰减，而摄像机用于平移。

### 扬声器几何体

扬声器几何体涉及玩家在体验游戏时所在环境中的扬声器实际物理布置。对于耳机来说，布置是简单且固定的：扬声器紧邻听者的左右。如果绿色三角形是听者的位置和方向，耳机扬声器的几何体如下：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1862a901-da3b-4cff-8282-126643a43ec4/audio-spatialization-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1862a901-da3b-4cff-8282-126643a43ec4/audio-spatialization-1.png)

然而，对于环绕声扬声器，布置更为复杂，取决于扬声器的数量及其放置标准。下面是5.1环绕声设置中扬声器的典型布置（未显示低音炮）：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ced1d1f-fbed-410c-b47f-b18ee48c39bf/audio-spatialization-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ced1d1f-fbed-410c-b47f-b18ee48c39bf/audio-spatialization-2.png)

有许多标准的扬声器布局和声道配置。通常，游戏会根据所选的标准配置对扬声器位置做出假设。有一些方法可以使用突发噪声、音调和麦克风分析来自动确定扬声器位置，但对于视频游戏来说几乎不会这样做。

### 中央声道

在平移计算过程中，通常会忽略中央声道，因为它通常是为非空间化音频（例如对话或界面音频）保留的。

这通常在电影混音中完成，其中重要的对话使用中央声道，从而确保可以清晰地听到。因为对话需要的频带窄、功率低，这导致许多音响系统的中央声道功率不足。

因此，游戏通常选择禁用通过中央声道进行平移，主要将其用于对话或其他重要音频，例如界面音频。

### 计算单声道源的平移值

给定听者和扬声器几何体，现在可以计算声音在世界中的相对位置。

简化扬声器布置以忽略5.1扬声器布置中的中央声道，我们可以将扬声器布置概念化为游戏世界中的虚拟位置。这些位置是相对于听者在世界中的位置而言的。

平移计算可以用下图来描述，其中X表示听者位置到右扬声器的连线与听者位置到世界中声音的连线之间的角度。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a96665a-e1b6-44d9-8568-67afe27fecaa/audio-spatialization-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a96665a-e1b6-44d9-8568-67afe27fecaa/audio-spatialization-3.png)

如果扬声器相对于听者的角度已知（或根据标准选择），则可以使用这个推导出的角度X来计算在线性平移算法或等功率平移算法中需要的平移参数（参阅下面的 **执行音频平移** 部分）。

PanLeft = X / TotalArcLength

PanRight = 1.0 - PanLeft

例如，如果确定角度X为15度，左右扬声器之间的总弧长为60度（从中心向右30度，向左30度），则确定平移参数左侧为0.25，右侧为0.75。

在听者周围进行声音平移时会保持这些参数，算法仅通过确定需要使用哪些扬声器对来计算平移值而发生变化。每个扬声器的方位角布置以相同的方式用于确定左右平移参数。

对于非方位角扬声器（高度扬声器），算法是类似的，但需要三个平移参数而不是两个。

### 计算多声道源的平移值

以类似于单声道源平移的方式计算多声道源的平移。不同之处在于，对于源文件中的每个声道，都会计算一个唯一的平移矩阵（哪个输出声道应用多大增益）。

对于立体声源，每个左右声道都被视为一个单声道源。扩散参数用于确定每个源声道位置要使用的几何体。该参数定义为每个左右声道之间的实际空间距离（或半距离）。

请注意，需要确定左右声道相对于听者的方向。通常，对于立体声空间化，左右声道的方向始终与从听者指向源位置的向量正交。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/444bfe7b-f101-422a-b819-d066fd7c31d8/audio-spatialization-4.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/444bfe7b-f101-422a-b819-d066fd7c31d8/audio-spatialization-4.png)

对于高于立体声的声道源，通常是偶数数量（4、6或8），可以采用类似的算法。不像扩散参数是定义为与左右声道的距离（或半距离），它们定义为以源位置为中心的圆的半径。在这种情况下，源声道虚拟点通常是圆边缘上的点，均匀分布。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/690a367e-1547-4d33-96c1-3a5260e945d5/audio-spatialization-5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/690a367e-1547-4d33-96c1-3a5260e945d5/audio-spatialization-5.png)

对于更高的声道空间化，由于没有明确的源方向偏好（就像立体声源一样，我们可以只希望它们保持正交方向），我们还需要提供一个单独的向量来定向声道位置。通常，源自身的方向向量用于定向源声道位置。

### 执行音频平移

执行音频平移有两种主要方法：线性平移和等功率平移。

#### 线性平移

线性平移是最简单的平移技术，其中成对声道之间的声音相对增益是线性插值的，并且总增益保持不变。

当使用两个（左和右）声道时，使用以下增益计算公式：

GainLeft + GainRight = 1  
GainLeft = X  
GainRight = 1 - X

可视化的线性平移如下所示：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c710cef4-cda4-4e8c-be74-73b34bb8ad81/audio-spatialization-6.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c710cef4-cda4-4e8c-be74-73b34bb8ad81/audio-spatialization-6.png)

线性平移很容易计算，但它有一个根本的缺点：响度（音量）是用来描述声音幅度的感知体验的术语，它不是由音频信号的实际幅度决定的，而是由音频信号的功率决定的。功率等于信号幅度的平方。如果声音的幅度或增益为X，则平移计算的功率由以下公式计算：

PowerLeft = GainLeft2 = X2  
PowerRight = GainRight2 = (1 - X)2

总功率等于计算出的左右声道的功率之和：

PowerTotal = GainLeft2 + GainRight2  
PowerTotal = X2 + (1 - X)2

在此公式中使用增益值表明功率不是恒定的。当声音在中间（X = 0.5）相对于侧面（X = 0.0或X = 1.0）进行平移时，功率和响度将下降。

下面是左右声道之间的平移中心的功率或感知响度：

PowerTotal = (0.5)2 + (1 - 0.5)2  
PowerTotal = 0.25 + 0.25  
PowerTotal = 0.5

下面是声音在右侧或左侧时：

PowerTotal = (1)2 + (1 - 1)2  
PowerTotal = 1 + 0  
PowerTotal = 1

平移过程中功率的这种变化将影响游戏的整体音频体验，因为声音似乎在扬声器场中呈非线性移动。

对于立体声（耳机或扬声器），声音似乎"粘"在边缘。对于环绕声平移，当声音越过扬声器位置时，会变得响亮，然后在扬声器之间响度下降。当声音在听者周围旋转或移动时，响度会变得不均匀。

增益降低是模拟距离衰减的主要方法，因此这种增益降低也会导致声音被大脑解释为离听者越来越近，即使音频引擎的意图是声音仅在听者周围移动。

#### 等功率平移

等功率平移方法通过完美地提高响度以保持恒定功率来抵消线性平移中存在的响度下降。这种方法通过在平移过程中保持功率约束而不是保持幅度恒定来保持恒定的响度。

回到总功率公式，我们求解当总功率对于每个增益值都是恒定的（即1.0）时的X。

PowerTotal = GainLeft2 + GainRight2 = 1.0

这个公式有几种可能的解。在音频中，可以使用平方根解（称为平方根平移定律）或正弦/余弦方程（称为余弦平移定律）。

如果X是介于0.0和1.0之间的平移参数值（其中0.0是完全左侧，1.0是完全右侧），则使用以下增益计算方程来保持相等的功率。

对于平方根平移定律，左右声道增益计算如下：

GainLeft = √X  
GainRight = √(1 - X)

可以看出总功率始终保持不变：

PowerTotal = (√X)2 + (√(1-X))2  
PowerTotal = X + (1-X)  
PowerTotal = 1

对于余弦平移定律，左右声道增益计算如下：

GainLeft = Sin2 (X)  
GainRight = Cos2 (X)

可以看到，这也满足功率恒定的要求，回顾一下，定义单位圆（半径为1的圆）的三角恒等式：

Sin2(θ) + Cos2(θ) = 1

绘制此平移定律输出的图形，可以看出实际增益值不是线性的：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4350269-3325-4c36-a73f-0fd5611bae2a/audio-spatialization-7.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4350269-3325-4c36-a73f-0fd5611bae2a/audio-spatialization-7.png)

对于三维平移计算，例如高度扬声器，等功率约束将使用以下公式计算：

PowerTotal = GainA2 + GainB2 + GainC2 = 1.0

请注意，大多数游戏音频引擎在平移到高度声道时不会进行这种计算，而是使用基于对象的渲染方法，例如Dolby Atmos和DTS:X，这些方法在音频引擎之外渲染。使用的声道数量越多，游戏引擎的音频渲染就越复杂，计算成本也越高。

#### 向量反转问题

平移算法的一个问题是移动声源越过听者的情况，这时从听者指向声源位置的向量会立即改变方向。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5898ac8c-a6de-45cf-92f0-3b3849d75439/audio-spatialization-8.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5898ac8c-a6de-45cf-92f0-3b3849d75439/audio-spatialization-8.png)

该向量主要用于确定扬声器阵列中的增益值，因此当声音从听者的一侧移到另一侧时，会导致增益突然变化。在上图中，在情况2和3之间，蓝色源移动越过听者原点，用于计算增益值的向量从指向前方变为指向后方。这种"向量反转"会导致音频信号不连续，听起来像咔哒声或爆音，这是一种典型的边界情况，许多使用3D平移的引擎都无法处理。

要避免这种不连续性，主要方法是对所有扬声器或部分扬声器使用全方位混合，以"消除"由于向量反转而发生的任何不连续性。通常，用户会定义一个半径，低于该半径的声源将混合到全方位平移。这样，在此过渡期间将无法定位声音。

当平移扬声器配置虚拟半径内的声源时，无法在空间上区分情况1和2以及情况3和4之间的声源（通过扬声器声道中的增益值）。因此"近场"平移一般会出现问题。

## 声场空间化

另一种理想的基于扬声器的空间化方法是使用声场的球谐函数表示。描述这种方法的首选术语是"声场"，不过它们也被广泛称为"环境立体声"。

球谐函数是一种基于波的表示形式，它表示三维（球形）场的振动。它们用在需要任意高分辨率空间信息的许多领域。

从概念上讲，球谐函数是傅里叶定理的空间表达形式，其中任何周期函数都可以表示为一系列不同频率和幅度的正弦曲线。因此，球谐函数可以被认为是一系列可以精确定义三维场的函数。

实际上，球谐函数（或声场/环境立体声）表达式的级数描述了空间表示的分辨率如何。谐波级数越高，包含的球谐展开式中的项越多，空间表示的分辨率就越高（越清晰）。但是，使用的级数越多，计算成本就越高，并且需要更多内存才能表示。

相对于平移，使用声场的好处是，它们在定位扬声器位置之间的声源方面往往具有明显更好的结果。平移方法的质量随所用扬声器的数量呈线性增加，而声场通过很少的扬声器就可以实现极高质量的结果。

声场的另一个显著好处是它们独立于扬声器或声道配置对其空间信息进行编码和保存。它们在旋转变换、混合等情况下以与通道无关的方式保留其空间信息。

3D声源可以编码为声场表达形式，与其他声场格式混合，然后在渲染管线的最后一步进行解码，从而形成精确的输出声道格式。这意味着音频内容可以以声场格式进行预烘焙，并在本地解码为适合其收听环境的特定本地播放器的硬件配置。如果没有这种功能，则需要对多声道声源进行缩混（例如，将7.1内容缩混为立体声）以适应本地硬件配置。这种缩混过程不可避免地会丢失重要的空间信息。另一方面，声场只针对现有的任何声道配置进行解码。

请务必注意，声场本身不能以被识别为空间的形式直接收听。它们需要解码为传统扬声器/声道格式，其中声场本质上被解析为一组声道增益，这些增益应用于声道，类似于平移的工作方式。有趣的是，声场通常会导致非零增益值散布在环绕声通道配置周围，即使它们听起来像是在任何给定方向上的空间化。

最后，可以使用特定的麦克风配置来捕获真实世界的声场，这些麦克风配置以直接编码为声场格式的方式捕获音频。通常，由于硬件和麦克风成本的原因，声场麦克风阵列适合收录较低阶的声场，但确实存在昂贵的高阶声场麦克风阵列。这是特别强大的环境音频声场收录方法，可以收集复杂的空间声源素材。

## 双耳音频空间化

如果音频是为耳机设计的，那么可以利用各种心理声学现象来提高空间化质量。在音频技术中，这种称为双耳空间化（与耳机空间化相对）的空间化类型更为常见。"双耳"源于人类（和大多数动物）有两只耳朵这一事实。这就像我们也常用"双目"一样。

在以双耳方式物理定位声音的方式中，有三个主要组成部分：**双耳声级差**、**双耳时间延迟** 和 **频谱阴影**。

### 双耳声级差

双耳声级差（ILD）是空间化感知的组成部分，这是因为双耳在空间中是分开的，而声音的音量（功率）随距离的增大而下降。这意味着，头左侧的声音在左耳听起来会比右耳稍微响亮。

ILD是平移音频起作用的主要感知原因，是双耳空间化的重要组成部分。影响ILD效应的主要因素是人头的大小（或者，更具体地说，是双耳之间的距离）。

### 双耳时间延迟

双耳时间延迟（ITD）是空间化感知的组成部分，这是因为双耳在空间中是分开的，而声音在空气中传播需要时间。这意味着，头左侧的声音会先到达左耳，再到达右耳。

这种效应非常小，但可以被大脑检测到，是声音定位的重要组成部分。与ILD类似，影响ILT效应的主要因素是人头的大小。

### 频谱阴影

声音是一种波，与介质或障碍物相遇时会发生衍射。这种衍射可能相当复杂，会导致声音的微小变化和波动。这种变化可以体现在响度和频率滤波上。

如果声音的频谱阴影是一致且可预测的，随双耳角度而变化，大脑可以解释这些信息并获得有价值的位置信息。这就是为什么耳朵如此形状奇特，遍布小小沟道的原因之一。这些复杂的形状对每个人来说都是独一无二的，它们经过进化，经由这种频谱阴影，可以帮助大脑消除歧义和微调空间信息。

这种效应非常个人化，因此很难在音频引擎中模拟。

### 头相关变换函数（HRTF）

头相关变换函数或HRTF用于将进入双耳空间化的所有心理声学因素组合在一起。

HRTF是数据派生的滤波器，它是通过将冲量记录为角度（相对于代表性的听者几何体）的函数来构建的。

使用的虚拟头恰好是平均头大小（对于人类）和平均耳形状。麦克风插入虚拟人头的双耳，冲量（微小的突发噪声）记录为角度的函数。下面是一个虚拟人头示例，其中耳朵模型的耳道内放置了麦克风。

导出式滤波器称为冲量响应（IR）。只要系统是时不变的（不随时间变化）和线性的（没有输入到输出的非线性映射），IR就是滤波器，可以表示系统的所有复杂细节，而无需实际了解所有内部细节。

每个人的耳朵形状和构造都是独特的，因此，对许多人来说，标准虚拟人的通用IR设置不能带来最准确的体验。出于这个原因，产生了许多不同的IR数据集来进行完善。

#### 使用HRTF

通过记录系统如何修改单个音频样本，后续样本可以由记录的数据集处理（通过称为卷积的过程），这些样本就像由原始系统处理一样。

HRTF数据集将IR存储为相对于头的角度的函数。这就是为什么游戏音频引擎使用声音相对于听者的角度来查找与该角度最匹配的数据集。某些HRTF渲染方法捕捉到最近的IR，另一些在IR集之间执行插值以获得更连续的IR。

然后将选定的IR数据集与输入音频进行卷积，输出考虑了ILD、ITD以及双耳和头实际形状的频谱特征。其结果通常比任何一种单独实现的方法更容易定位声音。

HRTF渲染（以及一般的双耳方法）的缺点是它只适用于耳机。听到立体声扬声器发出的声音时，滤波器和延迟会出问题，空间化的实际感觉可能比使用传统平移差得多。

## 混合方法

有一些空间化方法结合了上述空间化方法的不同元素。

下面是一种常见的混合方法：

-   将各个声源的空间信息编码为与声道无关的声场。
-   将这些声场源混合在一起。
-   将声场解码为任意虚拟扬声器/声道配置。

不将解码后的音频输出到实际的环绕声硬件，而将虚拟扬声器音频输出到双耳渲染过程。这是"3D音频"耳机广泛使用的一种方法，它从游戏中获取环绕声输出，从耳机听起来更具立体感。某些软件方法也使用这种方法，因为这样可以降低整体CPU成本，并且获得HRTF空间化的好处。

## 第三方插件

虚幻引擎提供了多款第三方空间化插件。详情请参阅插件官方文档。

插件会影响通道管理，而这可能会在多通道源时，产生非预期的结果。虚幻引擎只支持单声道和立体声源的空间化。

-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [spatialization](https://dev.epicgames.com/community/search?query=spatialization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [介绍](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E4%BB%8B%E7%BB%8D)
-   [平移](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E5%B9%B3%E7%A7%BB)
-   [确定平移值：听者和扬声器几何体](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E7%A1%AE%E5%AE%9A%E5%B9%B3%E7%A7%BB%E5%80%BC%EF%BC%9A%E5%90%AC%E8%80%85%E5%92%8C%E6%89%AC%E5%A3%B0%E5%99%A8%E5%87%A0%E4%BD%95%E4%BD%93)
-   [听者几何体](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E5%90%AC%E8%80%85%E5%87%A0%E4%BD%95%E4%BD%93)
-   [扬声器几何体](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E6%89%AC%E5%A3%B0%E5%99%A8%E5%87%A0%E4%BD%95%E4%BD%93)
-   [中央声道](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E4%B8%AD%E5%A4%AE%E5%A3%B0%E9%81%93)
-   [计算单声道源的平移值](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E8%AE%A1%E7%AE%97%E5%8D%95%E5%A3%B0%E9%81%93%E6%BA%90%E7%9A%84%E5%B9%B3%E7%A7%BB%E5%80%BC)
-   [计算多声道源的平移值](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E8%AE%A1%E7%AE%97%E5%A4%9A%E5%A3%B0%E9%81%93%E6%BA%90%E7%9A%84%E5%B9%B3%E7%A7%BB%E5%80%BC)
-   [执行音频平移](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E6%89%A7%E8%A1%8C%E9%9F%B3%E9%A2%91%E5%B9%B3%E7%A7%BB)
-   [线性平移](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E7%BA%BF%E6%80%A7%E5%B9%B3%E7%A7%BB)
-   [等功率平移](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E7%AD%89%E5%8A%9F%E7%8E%87%E5%B9%B3%E7%A7%BB)
-   [向量反转问题](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E5%90%91%E9%87%8F%E5%8F%8D%E8%BD%AC%E9%97%AE%E9%A2%98)
-   [声场空间化](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E5%A3%B0%E5%9C%BA%E7%A9%BA%E9%97%B4%E5%8C%96)
-   [双耳音频空间化](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E5%8F%8C%E8%80%B3%E9%9F%B3%E9%A2%91%E7%A9%BA%E9%97%B4%E5%8C%96)
-   [双耳声级差](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E5%8F%8C%E8%80%B3%E5%A3%B0%E7%BA%A7%E5%B7%AE)
-   [双耳时间延迟](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E5%8F%8C%E8%80%B3%E6%97%B6%E9%97%B4%E5%BB%B6%E8%BF%9F)
-   [频谱阴影](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E9%A2%91%E8%B0%B1%E9%98%B4%E5%BD%B1)
-   [头相关变换函数（HRTF）](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E5%A4%B4%E7%9B%B8%E5%85%B3%E5%8F%98%E6%8D%A2%E5%87%BD%E6%95%B0%EF%BC%88hrtf%EF%BC%89)
-   [使用HRTF](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E4%BD%BF%E7%94%A8hrtf)
-   [混合方法](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E6%B7%B7%E5%90%88%E6%96%B9%E6%B3%95)
-   [第三方插件](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine#%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6)