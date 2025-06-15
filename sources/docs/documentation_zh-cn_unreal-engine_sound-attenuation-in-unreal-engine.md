# 虚幻引擎音效衰减 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:23:38.098Z

---

目录

![音效衰减](https://dev.epicgames.com/community/api/documentation/image/cc8d8b42-2441-4594-bcd8-9a07d6e1f3be?resizing_type=fill&width=1920&height=335)

本文是音效衰减设置资产的参考页面。该资产会根据音效相对于聆听者的距离来控制音效的各个方面。通常情况下的聆听者便是玩家，但有时也不是。因此本文档中使用"聆听者"一词。

## 衰减（体积）

![衰减体积属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3a0c33f-ea82-45a1-ac30-f49c6396e504/01-attenuation-volume-properties.png)

这部分定义当聆听者远离音效时音量将如何降低（衰减）。在衰减形状内部区域中，音效将处于最大音量。聆听者远离此内部区域时，音量将降低，并在外部区域边界处达到最低音量。音效相对于距离的衰减率由衰减函数决定。

### 衰减函数

此属性定义的函数将决定随距离而变化的衰减率。有许多不同函数供选择：

#### 线性

![线性函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/799ce9fe-dca7-49d6-bde1-b9cdce6651c2/image_1.png)

这是默认函数（Linear）。使用此函数时音量将线性衰减，因此随着聆听者靠近和远离声源，音量变化将保持恒定。此函数适用于不需要严格聚焦的三维空间衰减设置的大型背景类音效之间的淡入淡出。

#### 对数

![对数函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45324064-1c6b-4db6-93ae-a15cb5d6956b/image_2.png)

使用此函数（Logarithmic）时，音量将按以下方式衰减：近距离时音量变化较大，远距离时音量变化较小。此函数适用于以下现场音效：需要良好的3D定位，并且在合理距离下仍可听到。

#### 反函数

![反函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca0d076f-6643-42b2-a9c8-b3f8591351fb/image_3.png)

使用此函数（Inverse）时，音量变化与对数曲线的变化类似，但程度更大。此函数适用于以下音效：在远距离时刚好能听到，但当聆听者非常靠近声源时音量将明显变大。

#### 对数反函数

![对数反函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5e40f55-2bfe-4ebd-a68a-ff09deed1f16/image_4.png)

使用此函数（Log Reverse）时，近距离时音量变化较小，远距离时音量变化较大。此函数适用于需要在较大距离范围保持高音量的音效。

#### 自然音效

![自然音效函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf9fce46-a854-475b-b4ac-93b049518866/image_5.png)

此函数（Natural Sound）尝试模拟更"自然"的衰减行为，以形成与现实更接近的行为。此函数是介于对数函数与反函数之间的"中间地带"。

#### 自定义

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65fd6b31-cab5-46a6-84ca-21dc216f4f97/02-custom-attenuation-curve.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65fd6b31-cab5-46a6-84ca-21dc216f4f97/02-custom-attenuation-curve.png)

点击查看全图。

提供的函数均无法提供所需行为时，可以使用此项来定义自己的自定义函数（Custom）。可直接在曲线编辑器窗口中绘制一个，也可指定已存在的浮点曲线资产。

### 衰减形状

此属性定义形状，即用于定义音效最小和最大衰减点的形状。

#### 球体

![球体衰减形状](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0f535f9-a3fc-4670-98a5-1631afe8c7e4/03-sphere-attenuation-shape.png)

此设置为默认设置，生成球体衰减形状，由于它模拟声音在现实世界的传播方式，因此适用于大多数现场音效。

![球体衰减示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78df9e6a-f7cf-4e28-ae71-df10c1b8961c/04-sphere-attenuation-shape-example.png)

#### 胶囊体

![胶囊体衰减形状](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6df0f41-4786-4170-95a7-316836251da0/05-capsule-attenuation-shape.png)

此设置产生胶囊体衰减形状（末端为圆形的圆柱体），适用于类似水管的音效：不会从空间的单一特定点发出声音，而是产生类似潺潺流水顺管道流动的音效。

![胶囊体衰减示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9592b2f3-8d38-43cd-b8de-dfce7e3231b7/06-capsule-attenuation-shape-example.png)

#### 盒体

![盒体衰减形状](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6af67614-6ec0-4f0d-bbbe-77981af8931d/07-box-attenuation-shape.png)

此设置产生盒体衰减形状，由于可以定义盒体形状来匹配房间形状，因此适用于房间环境声/周围环境声。

![盒体衰减示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b12f6771-42e1-4675-8488-d1975934caf3/08-box-attenuation-shape-example.png)

#### 椎体

![椎体衰减形状](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a88346c3-693a-4938-a299-0d6f58b6d96b/09-cone-attenuation-shape.png)

此设置产生锥形衰减形状，适用于需要定向衰减模式的情况，例如公共广播扬声器。

![椎体衰减示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0339d77f-8fd4-49b4-ac98-ba5b840df92a/10-cone-attenuation-shape-example.png)

### 内部形状区域

这些属性定义衰减形状的内部区域，即最大音量区域（换言之，完全没有衰减）。这些属性测量声源原点的距离（以虚幻单位计）。

具体显示的属性取决于选择的衰减形状。

#### 内径

此属性定义球体衰减形状的内部区域。

![指示了内径的球体衰减](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/917b0303-7073-4da6-96ac-156544ec3ce0/11-inner-radius.png)

#### 胶囊体半高

此属性定义胶囊体衰减形状内部区域的高度（由于是从声源原点——即胶囊体中点开始测量，所以称为"半高"）。

![指示了胶囊体半高的胶囊体衰减](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f8f47d4-c92f-401a-af37-07d205776f6d/12-capsule-half-height.png)

#### 胶囊体半径

此属性定义胶囊体衰减形状的内部区域半径。

![指示了胶囊体半径的胶囊体衰减](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/678770b9-fc4c-425e-8216-1fc0032db9f0/13-capsule-radius.png)

#### 范围

此属性定义盒体衰减形状的尺寸（从声源处开始测量）。此属性有三个值：x、y、z。

![指示了范围的盒体衰减](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9935985a-94eb-4f3f-aea2-6e90a0071bc9/14-extents-box.png)

#### 椎体半径

此属性定义椎体衰减形状的内部区域长度（从声源处开始测量）。

![指示了椎体半径的椎体衰减](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee25fc30-3978-455f-83fe-563544e296b9/15-cone-radius.png)

#### 椎体角度

此属性定义椎体衰减形状的内部区域宽度（从椎体中心开始测量，以度为单位）。

![指示了椎体度的椎体衰减](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e64e696f-b269-456d-b648-8bd02f8df905/16-cone-angle.png)

#### 椎体衰减角度

此属性定义椎体衰减形状的外部区域宽度（从椎体角度以外开始测量，以度为单位）。

![指示了椎体衰减角度的椎体衰减](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e094d9ef-c299-45a1-a16e-cf9cb443afa4/17-cone-falloff-angle.png)

#### 椎体偏移

此属性定义声源正后方的距离，即所希望的椎体起始位置（此属性独立于其他属性，因此会将锥体向后扩展，而不是向后移动）。

![指示了椎体偏移的椎体衰减](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd20a359-1d1a-4565-9b3d-87adf5ff5d4f/18-cone-offset.png)

### 衰减距离

此属性定义衰减形状外部区域的大小。无论形状如何，此属性都为同一属性，都是从内部区域的边缘处开始测量。

![指示了衰减距离的球体衰减](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2cca36a-e9dd-4b17-8ef6-dc99fcc9ec39/19-falloff-distance-sphere.png) ![指示了衰减距离的胶囊体衰减](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/899d0655-6ed5-48db-a6c1-35744f46f330/20-falloff-distance-capsule.png) ![指示了衰减距离的盒体衰减](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1acb045-ee80-475f-8194-146055a59a46/21-falloff-distance-box.png) ![指示了衰减距离的椎体衰减](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad2eddf3-6bf3-4469-8116-b8acfcc295e8/22-falloff-distance-cone.png)

### 启用音量衰减

此属性用于启用或禁用基于距离的音量衰减。

为True时，音效将根据上方定义的设置随距离的变化而衰减。

为False时，无论音效与聆听者之间的距离为何，音效都会以最大音量播放。

## 衰减（空间化）

![衰减空间化属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5da381dc-47df-41f0-9052-d74b4782ac4b/23-attenuation-spatialization-properties.png)

这部分解释音效在游戏场景中的空间化方式。用户可选择最适合项目的空间化方法，也可尝试不同设置来了解聆听者移动时音效的不同表现方式。

### 启用空间化

此属性用于启用或禁用音效空间化。

为True时，音效将从游戏场景中的特定位置空间化，并随着聆听者的移动而相应平移。若想让音效表现为来自游戏场景中的特定位置，可使用此设置（即点源音效）。

为False时，音效将非空间化，实际上将成为"扁平"的2D音效，因此无论声源相对于聆听者的位置如何，都不会应用平移。此过程的确切性质取决于扬声器配置和音效格式。举例而言，若使用立体声播放，则单声道音效不会上混为立体声，而四声道、5.1声道和7.1声道音效不会下混为立体声。可在 **项目设置（Project Settings）>引擎（Engine）>音频（Audio）>质量（Quality）>单声道上混法（Mono Channel Upmix Method）** 中设置上混单声道音效时所使用的方法。若不希望音效来自游戏场景中的特定位置，则可使用此属性（例如区域循环或房间环境声）。

### 空间化方法

可使用此属性定义音效空间化时使用的平移方法。目前有两个选项：

#### 平移

此选项为默认选项，使用虚幻引擎的标准平移方法来计算空间定位。使用此方法时，无论使用线性或等幂平移，都可将其定义为全局项目设置。可在 **项目设置（Project Settings）>引擎（Engine）>音频（Audio）>质量（Quality）>平移方法（Panning Method）** 中找到此选项。若通过扬声器播放，使用此方法效果最佳。

#### 双声道

此选项使用所启用的双声道插件处理音效的空间定位。可在 **项目设置（Project Settings）>平台（Platforms）>\[您的平台\]（\[YourPlatform\]）>音频（Audio）>空间化插件（Spatialization Plugin）** 中设置插件。可使用内置空间化插件，也可通过插件（Plugins）窗口启用第三方插件。由于双声道平移在扬声器上无法良好地转译，因此此方法需通过耳机播放。

### 非空间化半径

此属性定义距离阈值，低于该阈值时音效将开始从空间化转换为非空间化（成为2D音效）。此属性适用于在接近声源时防止音效的空间位置上出现突然不和谐声音跳跃。近距离时，此属性还能够"大型"音效充满空间区域（如大型机器、瀑布等）。

下图中，大型机器的音效被设为拥有450非空间化半径（如绿色球体所示）。聆听者超出此范围时，此音效将像平常一样空间化，但聆听者超过此阈值时，此音效的所有声道将开始渗入到扬声器配置的所有声道。此过程为插值过程，从定义的阈值处开始，以声源的100%渗入结束。举例而言，在5.1系统上播放的立体声音效会让其左声道渗入所有5个声道，同时会让其右声道渗入所有5个声道。因此，开始填充空间区域的音效（无论使用何种扬声器配置，音效都将开始来自所有扬声器）将提供更真实的音阶感。

![非空间化半径](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0de53c3-3422-4c2b-a89c-302b7e2e17d6/24-non-spatialized-radius.png)

### 3D立体声传播

此属性定义在游戏场景中空间化时立体声音效左声道与右声道之间的距离。使用立体声音效时，此属性适用于创建更宽更大的音感。它还有助于缓解声源空间位置上的突然跳跃。下图中，绿色和红色球体分别代表立体声音效的左声道和右声道，已利用此参数将声道定位在机器的两侧。

![立体声的左右声道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d737cfd1-3565-4d7d-b713-6eb338cfec90/25-3d-stereo-spread.png)

### 规格化3D立体声音效

此属性用于启用或禁用应用到正在场景中进行空间化的立体声音效的6dB增益衰减。若因上述3D立体声传播（Stereo Spread）属性或通过相关距离平移导致立体声传播降至0.0，发现因声道加总而出现音效剪裁现象时，此属性将十分实用。

## 衰减（空气吸收）

![空气吸收属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec1816ed-62fb-44b5-b142-af567b1be1ab/26-attenuation-air-absorption-properties.png)

这部分定义算法如何尝试模拟空气吸收对音效的影响，即随着距离的变化，高频比低频衰减得更快。

可定义距离范围，在此范围内将应用滤波器，然后滤波器使用截止频率设置来确定想要的滤波量——即在最小距离与最大距离之间移动时，将在最小截止频率与最大截止频率之间内插滤波器。除低通滤波器用于模拟空气吸收外，还可以将高通滤波器用于减少随距离变化的音效感知大小。

下图中，绿色圆圈表示最小距离，红色圆圈表示最大距离，所有滤波器设置将在这两个距离之间应用并内插。

![最小和最大距离](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17c5ca17-560c-48d6-8499-c5622b5dc976/27-air-absorption-example.png)

### 启用空气吸收

此属性用于启用或禁用空气吸收模型。

若为True，则利用低通滤波器处理音效，其截止点相对于聆听者与声源的距离发生变化（如下列设置所配置）。

若为False，则不会处理音效。

### 最小距离范围

此属性定义应当应用滤波器时与声源之间的最小距离。应尝试不同设置来找到最适合使用音效的点（但良好的起始点应基于衰减距离设置的内部范围）。

### 最大距离范围

此属性定义应当应用滤波器时与声源之间的最大距离。应尝试不同设置来找到最适合使用音效的点（但良好的起始点应基于衰减距离设置的衰减范围）。

### 最小时的低通截止频率

此属性定义低通滤波器在最小距离范围（如上定义）时的截止频率。应尝试不同设置来找到最适合的值来匹配所用的音效，但鉴于现实中靠近声源时几乎没有空气吸收效果，此处使用较大值更为合适。

### 最大时的低通截止频率

此属性定义低通滤波器在最大距离范围（如上定义）时的截止频率。应尝试不同设置来找到最适合的值来匹配所用的音效，但鉴于现实中远离声源时存在更多空气吸收效果，此处使用较小值更为合适。

### 最小时的高通截止频率

此属性定义高通滤波器在最小距离范围（如上定义）时的截止频率。应尝试不同设置来找到最适合的值来匹配所用的音效，但此处使用精细值更为合适（适用于大多数情况）。鉴于有时可能需要在近距离时感觉音效较大，此处使用较低值更为合适。

### 最大时高通截止频率

此属性定义高通滤波器在最大距离范围（如上定义）时的截止频率。应尝试不同设置来找到最适合的值来匹配所用的音效，但此处使用精细值更为合适（适用于大多数情况）。为了让音效在某个距离处感觉较小，不那么突出，使用较大值较为合适。

### 启用对数频率缩放

由于滤波器截止频率值相对于聆听者位置内插，此属性用于启用或禁用对这些值应用对数缩放。可能根据设置发现默认线性缩放产生一些极端和不自然的音效。若如此，可启用对数缩放，因为对数缩放会产生感知上的线性频率扫描，平滑处理这些变化。

### 吸收方法

此属性用于确定是要使用内置缩放函数（上述对数或线性），还是要创建自己的自定义曲线，来确定如何随着滤波距离的变化缩放内插。

有两个选择：

#### 线性

此选项使用内置缩放函数（线性或对数，具体取决于上述属性）。

#### 自定义

可使用此选项分别为低通和高通滤波器创建自己的自定义缩放曲线。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dacfc718-eadc-4a5a-961f-ad563bdec774/28-custom-curve-air-absorption-method.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dacfc718-eadc-4a5a-961f-ad563bdec774/28-custom-curve-air-absorption-method.png)

点击查看大图。

## 衰减（聚焦）

![衰减聚焦属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8391725-941a-492e-a69c-051097d4df28/29-attenuation-focus-properties.png)

这一部分控制可用于音效"聚焦行为"的一些其他处理。根据音效位置相对于聆听者的旋转，有时可能需要突出音效。举例而言，某些属于特殊拾取物品的音效通常会（有意）稍微被其余混杂音效所掩盖，但若玩家直接（或几乎直接）查看拾取物品时，则可能需要将其音效从混杂音效中稍微突出一点。另外，有时可能需要在所有音效中设置此聆听者聚焦行为，尝试和模仿由于我们容易将注意力集中于眼前的音效而导致的感知差异。

利用此类设置可控制以下内容：确定音效归类为焦点以内还是以外的角度，基于音效处于焦点以内还是以外音效的距离计算应用的缩放比例，向焦点以内和焦点以外的音效应用的衰减量，以及随着音效进入和离开聚焦范围，此类设置的插值速度。

下图中，绿色椎体为对象被归类焦点以内的角度区域，红色椎体为过渡区域，超出此范围的对象都将归为焦点以外。

![进入和离开聚焦范围](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee60ad23-060c-466c-bed9-49896fea9ef8/30-attenuation-listener-focus-example.png)

### 启用聆听者聚焦

此属性用于启用或禁用聆听者聚焦系统。

若为True，则音效将检查自身处于焦点以内还是以外，并相应地应用各种比例因子。

若为False，则音效将直接根据其常用的衰减、距离和优先级设置来呈现效果。

### 聚焦方位

此属性决定音效要被归类为焦点以内所需要处于的方位（水平旋转）角度，以度为单位。角度为0表示直接位于聆听者前向矢量的前方。

### 非聚焦方位

此属性决定音效要被归类为焦点以外所需要超过的方位（水平旋转）角度，以度为单位。角度为0表示直接位于聆听者前向矢量的前方。

### 聚焦距离缩放

此属性定义将应用于音效与聆听者之间计算距离的缩放值，从而定义音效的衰减音量。此处的值若小于1.0，音效听起来将比实际位于焦点以内时更接近聆听者。

### 非聚焦距离缩放

此属性定义将应用于音效与聆听者之间计算距离的缩放值，从而定义音效的衰减音量。此处的值若值大于1.0，音效听起来将比实际位于焦点以外时更远离聆听者。

### 聚焦优先级缩放

此属性定义将应用于音效优先级设置的缩放值（在音效中定义）。此处的值若大于1.0，音效优先级设置在音效位于焦点以内时将增大。

### 非聚焦优先级缩放

此属性定义将应用于音效优先级设置的缩放值（在音效中定义）。此处的值若小于1.0，音效优先级设置在音效位于焦点以外时将减小。

### 聚焦音量衰减

此属性定义将应用于音效被归为焦点以内时音量的缩放值。在音效的初始音量根据上述衰减距离设置随着音效与聆听者之间的距离缩放之后，才会发生这种情况。此处的值若大于1.0，音效位于焦点以内时将增大音量。

### 非聚焦音量衰减

此属性定义将应用于音效被归为焦点以外时音量的缩放值。在音效的初始音量根据上述衰减距离设置随着音效与聆听者之间的距离缩放之后，才会发生这种情况。此处的值若小于1.0，音效位于焦点以外时将降低音量。

### 启用聚焦插值

可使用此属性启用或禁用聚焦插值系统，当音效在焦点内外移动时，此系统可用于设置之间的平顺过渡。

若为True，在焦点内外移动时，插值将应用于上述各个设置。

若为False，当音效在焦点内外之间切换时，此系统将直接在上述定义的设置之间切换。

### 聚焦出动插值速度

此属性是一个标量，用于定义从焦点以外移到焦点以内时使用的插值速度。值越大，插值时间越快。

### 聚焦释放插值速度

此属性是一个标量，用于定义从焦点以内移到焦点以外时使用的插值速度。值越大，插值时间越快。

## 衰减混响发送

![衰减混响属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96c458d3-9fce-4ea6-9094-476a3c53836d/31-attenuation-reverb-properties.png)

这部分定义音效与聆听者之间的距离以及应用于音效的混响量。此处假设在场景设置中定义了默认混响设置，或音效在音频音量范围内且应用了混响效果，同时音效的音效类别设置允许应用混响。

可控制用于确定混响发送等级的方法、要发送到混响效果的音效量（混响最小/最大发送等级（Reverb Min/Max Send Level）），及如何随音效与聆听者的距离而变化（混响最小/最大发送距离（Reverb Min/Max Send Distance））。

### 启用混响发送

此属性用于启用或禁用混响发送系统。

若为True，将根据下面的设置通过指定混响效果处理音效。

若为False，则不通过混响处理音效，且为完全干燥。

### 混响发送方法

此属性定义如何确定向混响效果发送的音效量。

#### 线性

将根据最小/最大距离（Min/Max Distance）值中定义的距离，在最小/最大发送等级（Min/Max Send Levels）中定义的值之间插值，以此确定向混响效果发送的音效量。

#### 自定义曲线

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90a53c6d-d390-4270-a9c5-01dd1230cfe0/32-custom-reverb-send-curve.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90a53c6d-d390-4270-a9c5-01dd1230cfe0/32-custom-reverb-send-curve.png)

点击查看全图。

将根据最小/最大距离（Min/Max Distance）值中定义的距离通过定义的曲线来确定向混响效果发送的音效量。

#### 手动

将通过单一恒定值定义向混响发送的音效量，不会相对于距离而变化，因此可能最适用于非空间化的"氛围式"音效，而非点源3D音效。

### 混响最小发送等级

此属性仅在使用线性发送方法时可用，能够确定在"最小距离（Min Distance）"属性中定义的距离下对音效应用的混响量。此处通常会使用较低值，以便在靠近声源时比混响音效更直接。

### 混响最大发送等级

此属性仅在使用线性发送方法时可用，能够确定在"最大距离（Max Distance）"属性中定义的距离下对音效应用的混响量。此处通常会使用较高值，以便在远离声源时比直接音效拥有更强的混响。

### 混响最小距离

此属性定义与最小发送等级（使用线性发送方法时）或自定义曲线的最低值对应的声源之间的距离。

### 混响最大距离

此属性定义与最大发送等级（使用线性发送方法时）或自定义曲线的最高值对应的声源之间的距离。

## 衰减遮挡

![遮挡设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc7dd4cd-4026-4b4a-beb8-cf686359700b/image_37.png)

这部分将解释内置遮挡系统将如何发挥作用，以便模拟因声源与聆听者之间存在物体而导致音效在高频内容和/或振幅上降低。

用户可以控制引擎检查障碍物的方式，以及在发现障碍物后低通滤波和音量降低的程度。也可通过改变速度来改变音效。

### 启用遮挡

可使用此属性启用和禁用内置遮挡系统。

若为True，内置系统将检查是否有障碍物，并应用下面定义的设置。

若为False，内置系统将关闭，除非使用第三方插件（在下面的"插件设置（Plugin Settings）"中定义），否则音效不会模拟遮挡。

### 遮挡追踪通道

此属性确定将使用哪个追踪通道来确定声源与聆听者之间是否存在障碍物。此处的默认项为可见性（Visibility），非常适用于大多数目的。实际上，若对象在其属性中设置了碰撞，则将使用此设置。若要从遮挡系统排除特定对象，以免对音效形成障碍，可将正在使用的通道（如可见性（Visibility））的碰撞响应（Collision Response）属性设为"忽略（Ignore）"。（可能需将碰撞预设（Collision Preset）属性更改为"自定义（Custom）"来访问，这可能会影响其他系统的正常运行，因此应谨慎操作。建议设置自定义音频追踪通道）。

### 遮挡低通滤波器频率

系统检测到声源与聆听者之间存在障碍物时，此属性将定义应用的低通滤波器的截止频率。此处使用的值越低，滤波效果就会越极端、越显著。

### 遮挡音效衰减

系统检测到声源与聆听者之间存在障碍物时，此属性将定义如何将缩放值应用于音效的音量。此处使用的值越低，音量降低就会越极端、越显著。

### 遮挡插值时间

由于音效在受阻挡与不受阻挡状态之间交替，此属性为遮挡效果定义过渡时间。此处使用的值越低，系统的响应能力就越强，但根据设置，可能会产生一些相当极端的表现。最好尝试不同的时间值来找到适合不同情况的最佳值。

### 为遮挡使用复杂碰撞

可使用此属性启用和禁用障碍系统使用复杂碰撞。默认情况下系统将使用对象的简单碰撞来检查是否存在障碍物，这样做在资产方面开销要小得多。但若关卡中的对象形状复杂，这样做可能会产生不能令人信服的结果，例如音效可能会被标记受阻碍，但事实却并非如此。在下列截图中可以发现对象的简单碰撞模型与复杂碰撞模型之间的差异，若聆听者接近对象底部，对象会产生上面强调的问题。

![带有简单碰撞的网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18c8fee8-2739-46fa-96b7-44638d62839f/34-simple-collision-model.png) ![带有复杂碰撞的网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc3aa812-375e-4cf2-be71-f15fcfd49fb2/35-complex-collision-model.png)

## 衰减（优先级）

![衰减优先级属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7eb782de-3a6c-4a80-9317-3f6502e1788e/36-attenuation-priority-properties.png)

本小节将确定在达到声道限制时音效是可以播放还是保持激活。你可以选择优先级衰减的方法，并定义衰减优先级的最小和最大距离。

### 启用优先级衰减

此设置将根据距离启用或禁用音效优先级的衰减。

### 优先级衰减方法

此属性将定义用于控制优先级衰减的方法。

#### 线性

基于距离范围和优先级衰减范围之间的线性插值的优先级衰减。

#### 自定义曲线

基于提供的曲线的优先级衰减。

#### 手动

基于静态优先级标量的手动优先级衰减。此设置很适合2D音效。

### 最小距离处的优先级衰减

当音效与最接近的聆听者处于最小优先级衰减距离时，扩展优先级所依据的内插值。

### 最大距离处的优先级衰减

当音效与最接近的聆听者处于最大优先级衰减距离时，扩展优先级所依据的内插值

### 优先级衰减最小距离

此属性将定义衰减优先级的最小距离。

### 优先级衰减最大距离

此属性将定义衰减优先级的最大距离。

## 衰减（子混音）

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26e47850-a4ab-4c46-9fa7-cfe3247c5285/37-attenuation-submix-properties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26e47850-a4ab-4c46-9fa7-cfe3247c5285/37-attenuation-submix-properties.png)

点击查看大图。

本小节可以简便地将声源发送到子混音。你可以在一个地方对大量资产设置子混音发送。此设置在同时定义了体积衰减时很有用。

### 启用子混音发送

此属性将根据距离启用或禁用子混音发送。

### 子混音发送设置

此属性将根据距离来确定在将音效发送到子混音时要使用的子混音发送设置。

#### 子混音

要根据距离将音效发送到的子混音。

#### 子混音发送方法

此属性将定义用于子混音发送的方法。

#### 子混音最小发送等级

当音效所在距离等于子混音最小发送距离（Submix Min Send Distance）中指定的值时，发送到子混音的音效量。

#### 子混音最大发送等级

当音效所在距离等于子混音最大发送距离（Submix Max Send Distance）中指定的值时，发送到子混音的音效量。

#### 子混音最小发送距离

此属性将定义要发送到子混音的最小距离。

#### 子混音最大发送距离

此属性将定义要发送到子混音的最大距离。

#### 手动子混音发送等级

此属性将定义手动子混音发送等级。不随距离发生变化。

#### 自定义子混音发送曲线

此属性可自定义曲线，将其用于与距离挂钩的发送等级。

## 衰减（源数据覆盖）

![衰减源数据覆盖](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f6b5235-61cc-4ea4-8158-89fc9064a638/38-attenuation-source-data-override.png)

本小节包含用于源数据覆盖插件的设置。

### 启用源数据覆盖

此属性将使用源数据覆盖插件启用或禁用对WaveInstance数据的覆盖。

### 源数据覆盖插件设置

这是一组用于源数据覆盖插件的设置。并非所有音频插件都采用该功能。

## 衰减插件设置

可使用此部分定义第三方空间化、遮挡或混响插件的开发者提供的所有可访问设置。若正在使用本地内置系统，则此部分将为空。

### 空间化插件设置

此处将显示所有空间化插件设置。

### 遮挡插件设置

此处将显示所有遮挡插件设置。

### 混响插件设置

此处将显示所有混响插件设置。

### 源数据覆盖插件设置

源数据覆盖插件设置将出现在这里。

-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [sound](https://dev.epicgames.com/community/search?query=sound)
-   [attenuation](https://dev.epicgames.com/community/search?query=attenuation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [衰减（体积）](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%A1%B0%E5%87%8F%EF%BC%88%E4%BD%93%E7%A7%AF%EF%BC%89)
-   [衰减函数](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%A1%B0%E5%87%8F%E5%87%BD%E6%95%B0)
-   [线性](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E7%BA%BF%E6%80%A7)
-   [对数](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%AF%B9%E6%95%B0)
-   [反函数](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%8F%8D%E5%87%BD%E6%95%B0)
-   [对数反函数](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%AF%B9%E6%95%B0%E5%8F%8D%E5%87%BD%E6%95%B0)
-   [自然音效](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%87%AA%E7%84%B6%E9%9F%B3%E6%95%88)
-   [自定义](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89)
-   [衰减形状](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%A1%B0%E5%87%8F%E5%BD%A2%E7%8A%B6)
-   [球体](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E7%90%83%E4%BD%93)
-   [胶囊体](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%83%B6%E5%9B%8A%E4%BD%93)
-   [盒体](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E7%9B%92%E4%BD%93)
-   [椎体](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%A4%8E%E4%BD%93)
-   [内部形状区域](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%86%85%E9%83%A8%E5%BD%A2%E7%8A%B6%E5%8C%BA%E5%9F%9F)
-   [内径](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%86%85%E5%BE%84)
-   [胶囊体半高](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%83%B6%E5%9B%8A%E4%BD%93%E5%8D%8A%E9%AB%98)
-   [胶囊体半径](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%83%B6%E5%9B%8A%E4%BD%93%E5%8D%8A%E5%BE%84)
-   [范围](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%8C%83%E5%9B%B4)
-   [椎体半径](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%A4%8E%E4%BD%93%E5%8D%8A%E5%BE%84)
-   [椎体角度](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%A4%8E%E4%BD%93%E8%A7%92%E5%BA%A6)
-   [椎体衰减角度](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%A4%8E%E4%BD%93%E8%A1%B0%E5%87%8F%E8%A7%92%E5%BA%A6)
-   [椎体偏移](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%A4%8E%E4%BD%93%E5%81%8F%E7%A7%BB)
-   [衰减距离](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%A1%B0%E5%87%8F%E8%B7%9D%E7%A6%BB)
-   [启用音量衰减](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%90%AF%E7%94%A8%E9%9F%B3%E9%87%8F%E8%A1%B0%E5%87%8F)
-   [衰减（空间化）](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%A1%B0%E5%87%8F%EF%BC%88%E7%A9%BA%E9%97%B4%E5%8C%96%EF%BC%89)
-   [启用空间化](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%90%AF%E7%94%A8%E7%A9%BA%E9%97%B4%E5%8C%96)
-   [空间化方法](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E7%A9%BA%E9%97%B4%E5%8C%96%E6%96%B9%E6%B3%95)
-   [平移](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%B9%B3%E7%A7%BB)
-   [双声道](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%8F%8C%E5%A3%B0%E9%81%93)
-   [非空间化半径](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E9%9D%9E%E7%A9%BA%E9%97%B4%E5%8C%96%E5%8D%8A%E5%BE%84)
-   [3D立体声传播](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#3d%E7%AB%8B%E4%BD%93%E5%A3%B0%E4%BC%A0%E6%92%AD)
-   [规格化3D立体声音效](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%A7%84%E6%A0%BC%E5%8C%963d%E7%AB%8B%E4%BD%93%E5%A3%B0%E9%9F%B3%E6%95%88)
-   [衰减（空气吸收）](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%A1%B0%E5%87%8F%EF%BC%88%E7%A9%BA%E6%B0%94%E5%90%B8%E6%94%B6%EF%BC%89)
-   [启用空气吸收](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%90%AF%E7%94%A8%E7%A9%BA%E6%B0%94%E5%90%B8%E6%94%B6)
-   [最小距离范围](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%9C%80%E5%B0%8F%E8%B7%9D%E7%A6%BB%E8%8C%83%E5%9B%B4)
-   [最大距离范围](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%9C%80%E5%A4%A7%E8%B7%9D%E7%A6%BB%E8%8C%83%E5%9B%B4)
-   [最小时的低通截止频率](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%9C%80%E5%B0%8F%E6%97%B6%E7%9A%84%E4%BD%8E%E9%80%9A%E6%88%AA%E6%AD%A2%E9%A2%91%E7%8E%87)
-   [最大时的低通截止频率](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%9C%80%E5%A4%A7%E6%97%B6%E7%9A%84%E4%BD%8E%E9%80%9A%E6%88%AA%E6%AD%A2%E9%A2%91%E7%8E%87)
-   [最小时的高通截止频率](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%9C%80%E5%B0%8F%E6%97%B6%E7%9A%84%E9%AB%98%E9%80%9A%E6%88%AA%E6%AD%A2%E9%A2%91%E7%8E%87)
-   [最大时高通截止频率](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%9C%80%E5%A4%A7%E6%97%B6%E9%AB%98%E9%80%9A%E6%88%AA%E6%AD%A2%E9%A2%91%E7%8E%87)
-   [启用对数频率缩放](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%AF%B9%E6%95%B0%E9%A2%91%E7%8E%87%E7%BC%A9%E6%94%BE)
-   [吸收方法](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%90%B8%E6%94%B6%E6%96%B9%E6%B3%95)
-   [线性](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E7%BA%BF%E6%80%A7-2)
-   [自定义](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89-2)
-   [衰减（聚焦）](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%A1%B0%E5%87%8F%EF%BC%88%E8%81%9A%E7%84%A6%EF%BC%89)
-   [启用聆听者聚焦](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%90%AF%E7%94%A8%E8%81%86%E5%90%AC%E8%80%85%E8%81%9A%E7%84%A6)
-   [聚焦方位](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%81%9A%E7%84%A6%E6%96%B9%E4%BD%8D)
-   [非聚焦方位](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E9%9D%9E%E8%81%9A%E7%84%A6%E6%96%B9%E4%BD%8D)
-   [聚焦距离缩放](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%81%9A%E7%84%A6%E8%B7%9D%E7%A6%BB%E7%BC%A9%E6%94%BE)
-   [非聚焦距离缩放](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E9%9D%9E%E8%81%9A%E7%84%A6%E8%B7%9D%E7%A6%BB%E7%BC%A9%E6%94%BE)
-   [聚焦优先级缩放](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%81%9A%E7%84%A6%E4%BC%98%E5%85%88%E7%BA%A7%E7%BC%A9%E6%94%BE)
-   [非聚焦优先级缩放](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E9%9D%9E%E8%81%9A%E7%84%A6%E4%BC%98%E5%85%88%E7%BA%A7%E7%BC%A9%E6%94%BE)
-   [聚焦音量衰减](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%81%9A%E7%84%A6%E9%9F%B3%E9%87%8F%E8%A1%B0%E5%87%8F)
-   [非聚焦音量衰减](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E9%9D%9E%E8%81%9A%E7%84%A6%E9%9F%B3%E9%87%8F%E8%A1%B0%E5%87%8F)
-   [启用聚焦插值](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%90%AF%E7%94%A8%E8%81%9A%E7%84%A6%E6%8F%92%E5%80%BC)
-   [聚焦出动插值速度](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%81%9A%E7%84%A6%E5%87%BA%E5%8A%A8%E6%8F%92%E5%80%BC%E9%80%9F%E5%BA%A6)
-   [聚焦释放插值速度](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%81%9A%E7%84%A6%E9%87%8A%E6%94%BE%E6%8F%92%E5%80%BC%E9%80%9F%E5%BA%A6)
-   [衰减混响发送](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%A1%B0%E5%87%8F%E6%B7%B7%E5%93%8D%E5%8F%91%E9%80%81)
-   [启用混响发送](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%B7%B7%E5%93%8D%E5%8F%91%E9%80%81)
-   [混响发送方法](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%B7%B7%E5%93%8D%E5%8F%91%E9%80%81%E6%96%B9%E6%B3%95)
-   [线性](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E7%BA%BF%E6%80%A7-3)
-   [自定义曲线](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%9B%B2%E7%BA%BF)
-   [手动](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%89%8B%E5%8A%A8)
-   [混响最小发送等级](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%B7%B7%E5%93%8D%E6%9C%80%E5%B0%8F%E5%8F%91%E9%80%81%E7%AD%89%E7%BA%A7)
-   [混响最大发送等级](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%B7%B7%E5%93%8D%E6%9C%80%E5%A4%A7%E5%8F%91%E9%80%81%E7%AD%89%E7%BA%A7)
-   [混响最小距离](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%B7%B7%E5%93%8D%E6%9C%80%E5%B0%8F%E8%B7%9D%E7%A6%BB)
-   [混响最大距离](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%B7%B7%E5%93%8D%E6%9C%80%E5%A4%A7%E8%B7%9D%E7%A6%BB)
-   [衰减遮挡](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%A1%B0%E5%87%8F%E9%81%AE%E6%8C%A1)
-   [启用遮挡](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%90%AF%E7%94%A8%E9%81%AE%E6%8C%A1)
-   [遮挡追踪通道](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E9%81%AE%E6%8C%A1%E8%BF%BD%E8%B8%AA%E9%80%9A%E9%81%93)
-   [遮挡低通滤波器频率](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E9%81%AE%E6%8C%A1%E4%BD%8E%E9%80%9A%E6%BB%A4%E6%B3%A2%E5%99%A8%E9%A2%91%E7%8E%87)
-   [遮挡音效衰减](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E9%81%AE%E6%8C%A1%E9%9F%B3%E6%95%88%E8%A1%B0%E5%87%8F)
-   [遮挡插值时间](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E9%81%AE%E6%8C%A1%E6%8F%92%E5%80%BC%E6%97%B6%E9%97%B4)
-   [为遮挡使用复杂碰撞](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E4%B8%BA%E9%81%AE%E6%8C%A1%E4%BD%BF%E7%94%A8%E5%A4%8D%E6%9D%82%E7%A2%B0%E6%92%9E)
-   [衰减（优先级）](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%A1%B0%E5%87%8F%EF%BC%88%E4%BC%98%E5%85%88%E7%BA%A7%EF%BC%89)
-   [启用优先级衰减](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%90%AF%E7%94%A8%E4%BC%98%E5%85%88%E7%BA%A7%E8%A1%B0%E5%87%8F)
-   [优先级衰减方法](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E4%BC%98%E5%85%88%E7%BA%A7%E8%A1%B0%E5%87%8F%E6%96%B9%E6%B3%95)
-   [线性](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E7%BA%BF%E6%80%A7-4)
-   [自定义曲线](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%9B%B2%E7%BA%BF-2)
-   [手动](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%89%8B%E5%8A%A8-2)
-   [最小距离处的优先级衰减](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%9C%80%E5%B0%8F%E8%B7%9D%E7%A6%BB%E5%A4%84%E7%9A%84%E4%BC%98%E5%85%88%E7%BA%A7%E8%A1%B0%E5%87%8F)
-   [最大距离处的优先级衰减](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%9C%80%E5%A4%A7%E8%B7%9D%E7%A6%BB%E5%A4%84%E7%9A%84%E4%BC%98%E5%85%88%E7%BA%A7%E8%A1%B0%E5%87%8F)
-   [优先级衰减最小距离](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E4%BC%98%E5%85%88%E7%BA%A7%E8%A1%B0%E5%87%8F%E6%9C%80%E5%B0%8F%E8%B7%9D%E7%A6%BB)
-   [优先级衰减最大距离](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E4%BC%98%E5%85%88%E7%BA%A7%E8%A1%B0%E5%87%8F%E6%9C%80%E5%A4%A7%E8%B7%9D%E7%A6%BB)
-   [衰减（子混音）](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%A1%B0%E5%87%8F%EF%BC%88%E5%AD%90%E6%B7%B7%E9%9F%B3%EF%BC%89)
-   [启用子混音发送](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%AD%90%E6%B7%B7%E9%9F%B3%E5%8F%91%E9%80%81)
-   [子混音发送设置](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%AD%90%E6%B7%B7%E9%9F%B3%E5%8F%91%E9%80%81%E8%AE%BE%E7%BD%AE)
-   [子混音](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%AD%90%E6%B7%B7%E9%9F%B3)
-   [子混音发送方法](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%AD%90%E6%B7%B7%E9%9F%B3%E5%8F%91%E9%80%81%E6%96%B9%E6%B3%95)
-   [子混音最小发送等级](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%AD%90%E6%B7%B7%E9%9F%B3%E6%9C%80%E5%B0%8F%E5%8F%91%E9%80%81%E7%AD%89%E7%BA%A7)
-   [子混音最大发送等级](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%AD%90%E6%B7%B7%E9%9F%B3%E6%9C%80%E5%A4%A7%E5%8F%91%E9%80%81%E7%AD%89%E7%BA%A7)
-   [子混音最小发送距离](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%AD%90%E6%B7%B7%E9%9F%B3%E6%9C%80%E5%B0%8F%E5%8F%91%E9%80%81%E8%B7%9D%E7%A6%BB)
-   [子混音最大发送距离](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%AD%90%E6%B7%B7%E9%9F%B3%E6%9C%80%E5%A4%A7%E5%8F%91%E9%80%81%E8%B7%9D%E7%A6%BB)
-   [手动子混音发送等级](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%89%8B%E5%8A%A8%E5%AD%90%E6%B7%B7%E9%9F%B3%E5%8F%91%E9%80%81%E7%AD%89%E7%BA%A7)
-   [自定义子混音发送曲线](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AD%90%E6%B7%B7%E9%9F%B3%E5%8F%91%E9%80%81%E6%9B%B2%E7%BA%BF)
-   [衰减（源数据覆盖）](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%A1%B0%E5%87%8F%EF%BC%88%E6%BA%90%E6%95%B0%E6%8D%AE%E8%A6%86%E7%9B%96%EF%BC%89)
-   [启用源数据覆盖](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%BA%90%E6%95%B0%E6%8D%AE%E8%A6%86%E7%9B%96)
-   [源数据覆盖插件设置](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%BA%90%E6%95%B0%E6%8D%AE%E8%A6%86%E7%9B%96%E6%8F%92%E4%BB%B6%E8%AE%BE%E7%BD%AE)
-   [衰减插件设置](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E8%A1%B0%E5%87%8F%E6%8F%92%E4%BB%B6%E8%AE%BE%E7%BD%AE)
-   [空间化插件设置](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E7%A9%BA%E9%97%B4%E5%8C%96%E6%8F%92%E4%BB%B6%E8%AE%BE%E7%BD%AE)
-   [遮挡插件设置](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E9%81%AE%E6%8C%A1%E6%8F%92%E4%BB%B6%E8%AE%BE%E7%BD%AE)
-   [混响插件设置](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%B7%B7%E5%93%8D%E6%8F%92%E4%BB%B6%E8%AE%BE%E7%BD%AE)
-   [源数据覆盖插件设置](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#%E6%BA%90%E6%95%B0%E6%8D%AE%E8%A6%86%E7%9B%96%E6%8F%92%E4%BB%B6%E8%AE%BE%E7%BD%AE-2)