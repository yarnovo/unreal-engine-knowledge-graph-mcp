# 使用虚幻引擎的动态设计工具制作图形 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:16:47.029Z

---

目录

![使用动态设计制作图形](https://dev.epicgames.com/community/api/documentation/image/be4e807b-dfa1-4689-aa7f-260a6ec464e6?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

本教程提供了一套分步介绍的工作流程，说明了如何使用虚幻引擎的动态设计工具创建可实时控制的2D动画图形，并使其进入屏幕、离开屏幕以及在屏幕上进行变换。你也可以在这套工作流程的基础上使用动态设计制作更高级、更复杂的2D和3D动画。

## 入门指南

本教程假定你已熟悉[动态设计快速入门](/documentation/zh-cn/unreal-engine/motion-design-quickstart-guide-in-unreal-engine)的内容。如果你尚未阅读该文档，请从彼处开始。如果你已经启用了所需的插件，并阅读了关于创建新关卡和动态设计UI的章节，请继续阅读。

继续学习本教程的方式有两种，且都行之有效。

1.  在[现有关卡](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E5%9C%A8%E7%8E%B0%E6%9C%89%E5%85%B3%E5%8D%A1%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%8A%A8%E6%80%81%E8%AE%BE%E8%AE%A1)中使用动态设计。
    
2.  使用[动态设计模板](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%96%B0%E5%8A%A8%E6%80%81%E8%AE%BE%E8%AE%A1%E5%85%B3%E5%8D%A1)创建新关卡。
    

### 在现有关卡中使用动态设计

本教程给出的第一个选项是在现有关卡中打开 **动态设计界面** 。为此，点击工具栏上的 **动态设计（Motion Design）** 按钮即可。

![工具栏中的动态设计按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec4e1e47-5cd2-45f1-bf68-de6f23a68595/image_0.png)

工具栏中的动态设计按钮。

你也可以在模式（Modes）下拉菜单中切换到 **动态设计模式（Motion Design Mode）** ，从而在不更改整个界面的情况下使用动态设计工具。在键盘上按SHIFT+9键也可以打开此模式。

![模式菜单中的动态设计](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42635a38-ad30-4ba7-a650-66928a77ca53/image_1.png)

模式菜单中的动态设计。

#### 用动态设计场景的默认元素填充空白关卡

若选择上文所提的第一个选项，那么为了从空白关卡开始，请点击屏幕中上方的按钮，激活 **动态设计（Motion Design）** 模式。默认情况下，你在虚幻引擎中创建的新空白关卡中不存在光源、后期处理体积或摄像机。

![动态设计按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd854a2c-fe62-480f-bfd6-cf366b9cadc4/image_2.png)

动态设计按钮。

1.  点击 **创建默认值（Create Defaults）** ，从推荐的默认Actor中选择要添加到空白关卡中的对象。这将打开 **配置默认场景Actor（Configure Default Scene Actors）** 窗口，其中包含多个选项。
    
    ![创建默认值按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/730e32e0-b7b2-4fc3-80ea-e3a8abab636b/image_3.png)
    
    创建默认值按钮。
    
2.  选择要在场景中添加或替换的 **动态设计默认场景Actor** ，然后点击 **生成（Spawn）** 。本教程将使用默认选项。
    
    ![配置默认场景Actor窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8da66ea-ecd1-4d40-b669-c1b691430d5f/image_4.png)
    
    配置默认场景Actor窗口。
    

随后，视口和动态设计大纲视图将按你所选的选项进行更新。

### 创建新动态设计关卡

本教程的第二个选项是，使用动态设计模板创建新关卡。

创建一个新关卡（点击文件（File） > 新关卡（New Level））。在提示窗口中，选择要创建的关卡类型。**动态设计（Motion Design）** 模板适用于2D设计，而 **3D动态图形（3DMotion Graphics）** 模版适用于3D设计。本教程介绍的是2D设计。

-   若要跟随本教程中的步骤，请选择 **动态设计（Motion Design）** 模板，然后点击 **创建（Create）** 。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24d60b19-1768-4ecf-a40c-c84c12bc6eae/image_5.png)
    
    选择动态设计模版。
    

#### 生成默认场景Actor

用动态设计模板创建新关卡后，你必须配置并生成默认场景Actor。

1.  点击 **创建默认值（Create Defaults）** 按钮，打开 **配置默认场景Actor（Configure Default Scene Actors）** 窗口。
    
2.  在本教程中，你必须使用默认选项。因此请点击 **生成（Spawn）** 创建默认场景Actor。
    
    ![配置默认场景Actor窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66ba9904-da7b-4a7c-b634-ad9d476abca4/image_6.png)
    
    配置默认场景Actor窗口。
    

## 使用动态设计创建2D动画图形

### 你将学习的内容

本小节教程将说明如何使用动态设计界面的功能和工具来创建2D动画图形。具体包括：

-   绘制并自定义2D图元。
-   使用 **材质设计器** 自定义几何体。
-   使用空Actor定位内容。
-   添加文本。
-   约束文本以适应特定背景尺寸。
-   通过远程控制来控制文本。
-   播放Sequencer动画，使用Sequencer标记系统停止动画，然后从该标记处继续播放离场动画。

### 编辑初始模板

创建新关卡后的虚幻引擎用户界面应该如下图所示：

![动态设计模版的初始状态](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9ae60f8-2508-46b9-b582-e547935495d7/image_7.png)

动态设计模版的初始状态。

本教程要求你创建新的内容。因此你需要先删除随模板自动生成的图形元素。

1.  转到 **动态设计大纲视图** ，点击 **初学者内容包（Starter Content）** 组
    
2.  按键盘上的 **Delete** 键弹出对话窗口，确认删除所选对象的子项。
    

你得到的空白视口应该类似下图。

![删除初学者内容包组后的动态设计模版](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95edd2d7-86ec-4ff1-b589-53ad949a35d4/image_8.png)

删除初学者内容包组后的动态设计模版。

视口可能显示的是黑屏。这时你可以使用视口右下方的 **视图（View）** 选项，切换为棋盘格图案。

随后你必须设置画布的尺寸。

1.  为此，请点击视口左上角的 **摄像机（Camera）** 按钮。
    
2.  选择 **标尺覆盖（Ruler Override）** 。
    
3.  根据项目要求，通过 **分辨率（Resolution）** 设置项自定义画布的尺寸。
    
    ![使用标尺覆盖设置画布的尺寸](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1cca4a7b-f559-46e6-a6e0-b8de4a8b9865/image_9.png)
    
    使用标尺覆盖设置画布的尺寸。
    

### 创建形状和群组

你可以用动态设计工具箱创建各种形状。如果尚未打开动态设计面板，请点击 **模式（Mode）** 下拉菜单并选择 **动态设计（Motion Design）** 。

![从模式下拉菜单中选择动态设计](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e3f72cf-6f24-40fa-a225-85708e1ef744/image_10.png)

从模式下拉菜单中选择动态设计。

可供选择的形状有多个。本教程从 **矩形** 开始。

-   双击 **矩形（Rectangle）** 并在画布中央生成一个矩形。
    
    ![双击矩形按钮以在画布上添加矩形](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/296430eb-a218-45f6-b798-67149f1b5103/image_11.png)
    
    双击矩形按钮以在画布上添加矩形。
    
    ![新创建的矩形应如本图所示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1dbbf129-07d2-4662-8c9d-ca2746d5a8e3/image_12.png)
    
    新创建的矩形应如本图所示。
    

可以用界面右侧下方的细节面板自定义新建矩形的形状和属性（如倾斜和斜边）。还可以点击并拖动新建形状的控点来更改尺寸。

接下来请锚定形状。

1.  转到 **细节（Details）** 面板，选择 **形状（Shape）** 类别。
    
2.  将 **水平对齐（Horizontal Alignment）** 改为 **向左（Left）** ， **垂直对齐（Vertical Alignment）** 改为 **居中（Center）** 。
    
    ![更改水平对齐和垂直对齐方式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a836119-98a9-4254-b076-1fe0f5c10d7f/image_13.png)
    
    更改水平对齐和垂直对齐方式。
    

最终你会得到作为 **群组（Group）** 同时运动的其他Actor。

-   要创建群组，请选择矩形并按键盘上的CTRL+G键，或点击"动态设计大纲视图"中的 **群组（Group）** 按钮。
    
    ![群组按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f30332a-40ce-45c9-8349-55fb4d80e00d/image_14.png)
    
    群组按钮
    
    这将为矩形Actor创建一个空Actor父项。
    
    ![矩形Actor的空Actor父项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e4bb61b-12b6-4b40-a7f5-329e771933f8/image_15.png)
    
    矩形Actor的空Actor父项。
    

你可以在"细节"面板中尝试更改空Actor的位置。更改空Actor的位置不会影响矩形Actor的位置。

1.  在 **动态设计大纲视图** 中右键点击矩形，将其重命名为 **BG\_Main** 。
    
2.  将矩形移到屏幕左侧，使其与画布边缘齐平。
    
    1.  要调整矩形的位置，你既可以用矩形的几何体，也可以用矩形的空Actor父项。
        
    2.  为此，选择该 **空Actor** 并将其重命名为 **L3\_BG** 。
        
    3.  使用父项，在 **细节（Details）** 面板中移动该 **群组** 的 **位置（Location）** 。
        
    
    ![重命名空Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed3d627b-acac-4305-9e57-4b6b0f76975e/image_16.png)
    
    重命名空Actor。
    

这时你的画布应该如下图所示。

![通过移动群组来移动矩形](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1377dead-5691-4462-b1ac-313298bc4fe9/image_17.png)

通过移动群组来移动矩形。

按住鼠标中键即可在画布上进行平移。阴影区域代表 *屏幕外* 区域。本教程需要你将图形滑动到屏幕外，因此请留意画布的边界。

接下来请设定矩形的尺寸：

1.  点击 **BG\_Main** Actor，然后点击 **形状（Shape）** 按钮。
    
2.  转到动态设计大纲视图，确保将 **尺寸类型（Size Type）** 设置为 **像素（Pixels）** 。它是 **形状（Shape）** 的第一个设置项。
    
3.  将像素尺寸（Pixel Size）从 **XY** 改为 **自由（Free）** ，以解除 **像素尺寸** 属性的绑定。
    
4.  将 **像素尺寸** 属性的值设置为1842 x 132。
    
    你既可以用虚幻单位，也可以用像素来决定形状的尺寸。本教程假定你使用像素，但教程介绍的所有功能对两种情况均成立。
    
    ![设置解绑的像素尺寸属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a921f74-1aaf-48a8-8145-0fac8aee3c78/image_18.png)
    
    设置解绑的像素尺寸属性。
    

由于你创建的是下方三分之一处图形，因此请将整个群组的位置移到其通常采用的位置。

-   选择作为BG\_Main父项的 **空Actor** ，并将 **Y** 位置的值设为-160。
    
    ![设置空Actor的位置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00d857eb-789c-497f-a729-39806694edb8/image_19.png)
    
    设置空Actor的位置。
    

定位完成后，视口应该如下图所示：

![初次定位完成后的结果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9003d58-9919-40df-9123-7632ac74d2d8/image_20.png)

初次定位完成后的结果。

### 使用材质设计器自定义图形

接下来请使用 **材质设计器** 自定义下方三分之一处的图形，使其拥有比单纯的灰盒更丰富的外观。

自定义图形的步骤如下：

1.  选择对应形状，点击 **细节（Details）** 面板中的 **材质（Material）** 按钮。
    
2.  将 **材质类型（Material Type）** 设为 **材质设计器（Material Designer）** 。
    
3.  点击 **用材质设计器编辑（Edit with Material Designer）** 按钮。
    

**工具参数（Tool Parameters）** 分段中应该出现 **材质设计器（Material Designer）** 选项卡。这时你的视口应该如下图所示：

![设置以使用材质设计器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9db7b957-ff42-48b1-94d0-6a21bf5ddab6/image_21.png)

设置以使用材质设计器。

材质设计器是动态设计功能所提供的基于图层的材质创建工具。与图形编辑或照片编辑软件等其他基于图层的工具类似，材质设计器中的所有图层都有填充、遮罩通道和独立的不透明度值，以及一整套的混合模式。

下图是材质设计器界面的概览：

![材质设计器的界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c03989b5-611b-4ed9-b6a1-d040184581a3/image_22.png)

材质设计器的界面。

#### 界面按键

1.  在表面材质或后期处理材质之间切换。
    
2.  材质类型选择器。可用选项如下：
    
    -   不透明（Opaque）
    -   遮罩（Masked）
    -   半透明（Translucent）
    -   叠加（Additive）
    -   调制（Modulate）
3.  调整整个图层堆栈的不透明度。
    
4.  在调整填充或遮罩图层堆栈之间切换。
    
5.  调整图层的不透明度，并更改图层的混合模式。
    
6.  对单独图层进行填充和遮罩控制。
    
    -   锁链图标决定是否绑定填充和Alpha纹理的UV。
    -   点击图层缩略图左侧的白点即可启用或禁用任一部分。
7.  视口工具栏提供如下工具：
    
    -   图层特效。用于在图层上应用各种材质特效。
    -   添加图层。
    -   复制图层。
    -   删除图层。
8.  图层设置，如纹理变换和限制纹理等功能。
    

上方的材质设计器界面图中选中了图层的填充（棋盘格图标）。而下图则显示了设置图层类型的部分选项。具体包括：

-   纹理（Texture）
-   纯色（Solid Color）
-   颜色图集（Color Atlas）
-   纹理边缘颜色（Texture Edge Color）
-   渐变（Gradient）
-   材质函数（Material Function）

![图层类型选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/019706f5-c1b8-43fd-9fe4-f5c34e88d145/image_23.png)

图层类型选项。

1.  现在你需要一个简单的纯色，为此请选择 **纯色（Solid Color）** 。
    
2.  然后点击 **颜色（Color）** 控件并在弹出菜单中设置颜色。
    
    ![使用取色器设置颜色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf229f02-9c4f-44b2-bb19-e3299eecacb5/image_24.png)
    
    使用取色器设置颜色。
    
3.  用以下RGB值将颜色设为绿色：
    
    -   R：0.0
    -   G：0.441406
    -   B：0.030081

### 添加图案

接下来请添加图案，方法是使用视口工具栏中的 **添加新图层（Add New Layer）** 按钮创建一个新图层。

![视口工具栏中的添加新图层按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06cf6547-0a17-4eca-9b4c-0ebd30c58c6f/image_25.png)

视口工具栏中的添加新图层按钮。

默认情况下，这将创建一个纹理。点击下拉菜单后会出现数个选项。

-   选择标准的线性渐变纹理。下方示例中的纹理被命名为2。
    
    ![选择标准线性渐变纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fdebd06d-bb60-4235-9432-c8319f6900ef/image_26.png)
    
    选择标准线性渐变纹理。
    

接下来需要对UV进行一些旋转和缩放操作，从而获取本教程所需的图案。

1.  关闭遮罩，同时解绑缩放，以禁用本图层的遮罩。
    
    ![关闭遮罩并解绑缩放](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9abc8c2-5e8e-4aba-a752-da590ddbf4fa/image_27.png)
    
    关闭遮罩并解绑缩放。
    
    为此，你也可以创建一个新图层，然后选择 **无Alpha纹理（Texture No Alpha）** 。
    
2.  将纹理的 **属性** 设置如下：
    
    -   类型（Type）：纹理（Texture）
    -   纹理（Texture）：2
    -   偏移（Offset）：0.0、0.0
    -   旋转（Rotation）: 45.0
    -   缩放（Scale）：0.035、0.035
    -   枢轴点（Pivot）：0.5、0.5
    -   X轴镜像（Mirror on X）：禁用
    -   Y轴镜像（Mirror on Y）：禁用
    -   限制纹理（Clamp Texture）：禁用
    
    ![新纹理图层的属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f073658a-25eb-4849-89f6-993a6b0edf81/image_28.png)
    
    新纹理图层的属性。
    
3.  将渐变图层的 **混合（Blend）** 设置为 **倍增（Multiply）** ，具体如下图所示。
    
    ![将混合图层设为倍增](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbe8baa1-27b5-498f-96cb-728f80af88f2/image_29.png)
    
    将混合图层设为倍增。
    

你的图形应该如下图所示：

![初始图案的渐变较为粗糙](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3555d8ad-7329-41d8-9f8d-43f2b55777d1/image_30.png)

初始图案的渐变较为粗糙

接下来需要降低渐变的粗糙度。

-   将 **不透明度（Opacity）**（即上文界面概览中的第5项）设为0.11。
    
    ![降低图案的不透明度可柔化渐变效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b259f26d-c60e-42b7-90f9-51f8fc3a7b86/image_31.png)
    
    降低图案的不透明度可柔化渐变效果。
    

若要将图案拆分，可将其朝条形图的左侧淡化。

1.  返回图层设置，重新启用图层遮罩，但依然不绑定图层UV。
    
2.  在遮罩上再添加一个线性渐变（可用同一个渐变）。
    
3.  使用纹理参数中的 **限制纹理（Clamp Texture）** 按钮将其限制起来。这样可以防止纹理重复。
    
4.  为Alpha纹理设置以下属性：
    
    -   **限制纹理（Clamp Texture）：True**
    -   **偏移（Offset）： -0.566, 0.0**
    -   **旋转（Rotation）: 220.0**
    -   **缩放（Scale）： 3.0, 0.0**

结果应该如下图所示：

![添加受限线性渐变后的横幅](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97a25fcf-40fb-449a-9bcc-f8206381b8db/image_32.png)

添加受限线性渐变后的横幅。

接下来请对边缘进行圆角化处理，并让形状略微倾斜。

1.  选中形状后点击 **形状（Shape）** 按钮。
    
2.  选择 **右倾斜（Right Slant）** 属性，并将值设置为18.00。
    

**斜边化** 的方法有两种，即逐个或统一对四个角进行斜边化操作。针对本设计，你需要对右上角和右下角进行斜边化操作。

1.  展开 **形状（Shape）** 设置项底部的 **右上角（Top Right）** 和 **右下角（Bottom Right）** 选项。
    
2.  将各项数值设置如下：
    
    -   **类型（Type）：** 向内弯曲（Curve In）
    -   **尺寸（Size）：** 13.0
    -   **细分（Subdivisions）：** 8
    
    ![你的数值应该与截图中所示的数值一致](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f80acb0d-fe6b-4209-9d7b-d25839025cbe/image_33.png)
    
    你的数值应该与截图中所示的数值一致。
    

利用 **视口工具栏 > RGB** 选项，你可以让视口背景从棋盘格更改为纯黑色。这样更方便你查看图形。

![用RGB设置将视口背景设为黑色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f990ee19-d027-4f8a-98a4-b2639358ac57/image_34.png)

用RGB设置将视口背景设为黑色。

1.  要重新创建条形图，请 **右键点击** **L3\_BG** 群组并选择 **复制（Duplicate）** 。条形图的颜色将变为白色，其本身将略有偏移。
    
2.  将Actor重命名为 **L3\_BG\_Bar\_Offset** 。
    
3.  在动态设计大纲视图中，将它放置到另一个条形图的下方。这时应该出现闪烁，因为两个条形图的优先级还缺乏管理。
    
4.  选择L3\_BG和L3\_BG\_Bar\_Offset 的Actor，按CTRL+G分组。
    
5.  **右键点击** 位于群组根部的新 **空Actor** ，并添加一个名为 **半透明优先级（Translucent Priority）** 的修饰符。
    
    ![添加半透明优先级修饰符](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc967b3d-2007-42e0-9d19-74277a3fc24d/image_35.png)
    
    添加半透明优先级修饰符。
    

**半透明优先级** 修饰符会将半透明对象的渲染优先级自动排序。列表中的首个项目将优先于下一项目进行渲染。你可以将此修饰符用于嵌套的大型Actor群组或单个Actor。本教程中，你需要在动态设计动态设计的顶部使用一个半透明对象，同时用半透明优先级修饰符来管控一切。

移动图形，使它们相互偏移，而不是直接重叠在一起。

-   偏移L3\_BG\_Bar\_Offset，将其 **Z值** 设为 **\-170.0** 。结果应该如下图所示：

![你的图形应如图所示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09d4e158-694b-4780-aa23-abd0959a48f1/image_36.png) ![你的UI应如图所示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce6344e2-3606-4917-bb42-9b164b9f74b8/image_37.png)

你的图形和UI应如图所示

## 在动态设计中添加内容

接下来请为你所创建的条形图添加徽标和文本。

### 将文本添加至版面

要创建文本，请返回 **工具箱** 。

处理文本时请注意，对于给定的文本Actor，所有字符都共用相同的设置。要让单个字符使用不同的字体、颜色、尺寸等，则需要为所有需要不同设置的字符分别使用单独的文本Actor。

![动态设计的用户界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c31ef0d2-0e3a-4b29-97d1-9c86a00fdceb/image_38.png)

动态设计的用户界面。

[动态设计快速入门](/documentation/404)全面地介绍了动态设计的界面。

1.  在工具箱（上图视口左侧的2号区域）中有一个 **Actors** 按钮。点击该按钮即可显示可添加到设计中的各种Actor。
    
2.  双击 **文本Actor（Text Actor）** 将其添加到动态设计大纲视图的根层级。
    
3.  将新建的文本Actor拖入到空Actor群组，使其与背景和背景条的偏移保持一致。
    
4.  在动态设计大纲视图中双击Actor，将其重命名为 **Text\_Line\_1** 。
    
5.  选中Text\_Line\_1 Actor，按 **CTRL+G** 将其分组。
    
6.  将该群组命名为 **Text\_Lines** ，以供识别。
    
7.  由于需要两条文本行，所以请右键点击并 **复制** Text\_Line\_1，然后将复件重命名为Text\_Line\_2。
    

### 更改字体

要设置文本的字体，请转到动态设计大纲视图，选择一个文本Actor，然后进入细节面板。可选按钮有数个，请点击其中的 **文本（Text）** 按钮。

转到底部的细节面板，在选择文本按钮后，更改文本字段中的字符串即可更新文本行的内容。同时你还可以更改字体和字样。

1.  将字体（Font）更改为Roboto。
    
2.  将字样（Typeface）更改为斜体（Italic）。
    
3.  将第2行的位置向下移，避免两行重叠。
    
    ![设置文本Actor的字体和字样](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/545d4d8f-b9b4-487c-8544-9d3267c12573/image_39.png)
    
    设置文本Actor的字体和字样。
    

这时文本被绿色条覆盖着。要纠正这种情况，请使用之前设置好的半透明排序优先级修饰符。但使用该修饰符的前提是Actor的类型为半透明材质。

1.  选择一个文本Actor，点击细节面板中的 **样式（Style）** 按钮。你将看到半透明样式被设置为了"无（None）"，这意味着它不是半透明的，所以半透明排序优先级修饰符无法为其排序。
    
2.  请将样式更改为 **半透明（Translucent）** 。
    
3.  为另一个文本Actor重复上述操作。然后你会看到条形图上方出现了文本。
    
4.  选择位于根层级的 **Text\_Lines** 空Actor。
    
5.  点击细节面板中的 **通用（General）** 按钮。
    
6.  下移空Actor的 **位置（Location）** 即可将整个群组下移，直到其与条形图重叠。
    
7.  选择所有文本行，并在变换设置中将 **缩放（Scale）** 的值设为0.45。
    
    ![通用文本Actor的设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9be50110-303b-4c54-8368-82b53cff228b/image_40.png)
    
    通用文本Actor的设置。
    

### 文本版面工具

现在需要使用 **文本版面工具** 。

-   选中文本后，点击细节面板中的 **版面（Layout）** 按钮。
    
    ![文本版面设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fea36554-0366-4631-882a-ae3b52db1e9b/image_41.png)
    
    文本版面设置。
    

你可以在该分段中设置各种常见的文本属性。现在请修改其中几项。首先是 **对齐方式（Alignment）** 选项。

1.  文本的水平对齐方式因保持为左对齐，所以请不要更改该选项。
    
2.  将所有文本行的垂直对齐方式改为居中对齐，所以请选择第二行的第三个选项。
    

此外还有"字距调整（Kerning）"、"行距（Line Spacing）"和"字距（Word Spacing）"选项，但现在还不需要管这些选项。

1.  手动将Text\_Line1和Text\_Line2分开，避免其完全重叠。
    
    使用 [**网格排列** 修饰符](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E7%BD%91%E6%A0%BC%E6%8E%92%E5%88%97%E4%BF%AE%E9%A5%B0%E7%AC%A6)也可以定位文本Actor。
    
2.  利用 **最大宽度（Max Width）** 确保文本不超出版面。
    
3.  设置最大宽度的值，使文本不超出图形边界。
    
    要想减少猜测所需最大宽度值的次数，你可以输入随机数字，直到输入的数字超出版面边缘为止。这时再调整数值，直到将文本限制在理想区域内。
    
    ![设置文本版面的最大宽度值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1df8995c-e61c-4051-aedb-b1e594e8fd0a/image_42.png)
    
    设置文本版面的最大宽度值。
    

下方是将最大宽度值设置为1550并调整文本位置前后的对比。

 ![文本版面调整的前后对比。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd937933-cb24-45fc-99c1-f1705f4ba369/image_43.png) ![文本版面调整的前后对比。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8eb4a2b-2e00-49ed-8dae-b5201c24da22/image_44.png)

文本版面调整的前后对比。

确保条形图左侧留足空间，以便之后添加徽标和标题名称。

### 网格排列修饰符

如上文所述，要分开两个文本行，还可以使用 **网格排列** 修饰符。步骤如下：

1.  选择Text\_Lines根Actor，然后点击右键。
    
2.  转到修饰符并选择 **网格排列（Grid Arrange）** 。
    
3.  你将看到如下界面：
    
    ![文本行Actor的网格排列修饰符的设置项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20577823-32d1-49d9-86a7-c5f02f331a31/image_45.png)
    
    文本行Actor的网格排列修饰符的设置项。
    

目前要使用的两项设置分别是 **计数（Count）** 和 **扩散（Spread）** 。

-   将 **计数（Count）** 设置为 **(1, 2)** ， **扩散（Spread）** 设置为 **(0.0, 31.0)** 。

添加网格排列修饰符后，动态设计大纲视图将出现改变。编辑器的眼球图标和第二个Actor的运行时可见性都将被禁用。这是因为宽度和高度的计数都被设置为了1，导致这些设置项不再可见。

![计数和扩散设置更改后的文本行Actor排列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d14adf0-4ad7-489b-ae86-d8e2b67bdbb1/image_46.png)

计数和扩散设置更改后的文本行Actor排列。

这一改动对文本Actor进行了排列，拉开了间距，并在细节面板中启用了可见性。这种逻辑对更为动态的版面是必须的，但即使对于像本教程项目这样相对静态的版面而言，它也是一种高效的工具。

点击整个修饰符堆栈或单个修饰符上的复选框，即可禁用该修饰符。这对试验性操作和调试而言都非常有用。

### 将徽标添加至版面

现在你需要再次访问 **材质设计器（Material Designer）** ，但在此之前，请先添加一个几何体。

1.  转到 **工具箱** ，从2D形状中添加一个 **矩形** 。
    
2.  双击该矩形，在动态设计大纲视图中将其选中，然后在键盘上按CTRL+G键，创建一个 **群组** 。
    
3.  将该群组命名为 **Show\_ID** ，并将新建的矩形命名为 **Logo** 。
    
4.  在群组添加两个文本Actor，分别命名为 **Banner\_Line1** 和 **Banner\_Line2** 。这两个文本Actor将作为横幅的一部分。
    
5.  选择整个Show\_ID组，并将其拖动到动态设计大纲视图中Text\_Lines组的上方。
    

这时你的动态设计大纲视图应该如下图所示：

![添加徽标Actor和横幅行文本Actor后的动态设计大纲视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ba5f5b7-adb8-4ccf-9926-e2b9ac70b140/image_47.png)

添加徽标Actor和横幅行文本Actor后的动态设计大纲视图。

上述元素就位后，你就可以开始制作徽标了。点击刚刚添加的徽标Actor，打开 **材质设计器（Material Designer）** 。重复说明一次操作步骤：

1.  选择Actor。
    
2.  点击 **材质（Material）** 按钮。
    
3.  将 **材质类型（Material Type）** 设为 **材质设计器（Material Designer）** 。这时材质设计器选项卡位于动态设计大纲视图的左侧。
    
    -   这次无需取消填充和遮罩的绑定。你将应用一个同时拥有两个通道的纹理，因此它会自动使用这两个通道。
4.  点击属性下拉菜单，找到位于 **EDC\_Content** 文件夹中的 **UE\_Logoo\_icon-only** 资产。也可以将纹理直接拖放到画布上。
    
    结果应该如下图所示：
    
    ![将UE_Logo_icon-only资产添加到画布](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e1d3e37-1a08-4d92-968c-071df5c23567/image_48.png)
    
    将UE\_Logo\_icon-only资产添加到画布。
    
5.  在材质设计器属性列表中，限制该图层的纹理。
    
    ![启用限制纹理设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a17e6afa-6f68-4e54-902e-2332015b7ee2/image_49.png)
    
    启用限制纹理设置。
    

在 **视口工具栏** 中选择 **Alpha** ，即可随时检查关卡的关键帧和填充：

![将视口改为显示Alpha通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3cad8d6-e033-4094-aa11-b7e1852f9d2e/image_50.png)

将视口改为显示Alpha通道。

更改后的视口显示的内容应如下图所示：

![显示Alpha通道的视口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30044b1a-60f6-4db7-9922-a4e6eaae18e6/image_51.png)

显示Alpha通道的视口

记得请在继续工作前将视口切换回RGB。

由于 **材质设计器** 的默认值为半透明材质，你可以将徽标移动到版面中，使其只要位于列表顶部附近就能被正确排序。

1.  配置 **Banner\_Line1** 和 **Banner\_Line2** 文本Actor，使其设置与之前创建的两个文本行Actor相同。
    
2.  选择所有横幅行Actor，将它们设置为 **半透明（Translucent）** 且 **不透明度（Opacity）** 为 **1.0** ：
    
    ![横幅行文本Actor的样式设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/823add87-3178-4467-a195-97d6913bdb2e/image_52.png)
    
    横幅行文本Actor的样式设置。
    
3.  使用视口中的控点或细节面板中"通用（General）"字段下的"变换（Transform ）"设置，移动整个 **Show\_ID** 组，使徽标位于图形左侧。虽然结果需要进一步调整，但目前这样就好，具体应该如下图所示：
    
    ![正在制作的横幅图标和待变换的文本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d30ebe7d-ce07-4c55-8bf9-bd9865e1ae5b/image_53.png)
    
    正在制作的横幅图标和待变换的文本。
    
4.  点击徽标以将其选中。
    

如果难以选中徽标，原因可能是没有启用 **半透明选择（Translucent Selection）** 功能。按键盘上的 **T** 键即可启用，然后再尝试选择。

调整徽标尺寸的方法有两种：

-   使用细节面板"通用（General）"字段下Actor的"变换（Transform）"设置，缩放实际尺寸。
-   启用"限制纹理（Clamp Texture）"后，在材质设计器中更改缩放值。

现在请使用Actor的"变换（Transform）"设置项来调整徽标的尺寸。之后在制作动画时，你将使用材质设计器的变换方法来缩放UV。

-   转到细节面板，将所有三个轴的 **缩放（Scale）** 值设为 **0.55** 。
    
    ![调整徽标Actor的尺寸](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33c29c1c-9ad3-4e35-b3a4-54cd5baec924/image_54.png)
    
    调整徽标Actor的尺寸。
    

接下来请处理横幅的标题。

1.  选择Banner\_Line1，并将文本设置为"The Daily"。
    
2.  将Banner\_Line1和Banner\_Line2的版面设置安排如下：
    
    -   对齐方式（Alignment）
        -   水平（Horizontal）：左对齐（Left Justified）
        -   垂直（Vertical）：居中（Centered）
    -   字距调整（Kerning）、行距（Line Spacing）和字距（Word Spacing）：0
    -   最大宽度（Max Width）、最大高度（Max Height）和按比例缩放（Scale Proportionally）：禁用
    
    ![横幅行文本Actor版面的设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6edf26f9-96a8-46b3-9f2c-c581e34973b8/image_55.png)
    
    横幅行文本Actor版面的设置。
    

因为使用已完成的项目时无法编辑最大宽度，所以你不需要为横幅行文本Actor设置最大宽度。

1.  调整文本的大小和位置，直到得到类似于下图的结果：
    
    ![变换后的横幅图标和文本Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a531c44-f74e-4847-ae95-8c9b96904ad2/image_56.png)
    
    变换后的横幅图标和文本Actor。
    
2.  将文本字体换成你喜欢的字体。示例中使用的均为Roboto和斜体。可以用"字样（Typeface）"选项选择字体粗细。
    

![调整字体和字样](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00d1d1ff-4809-4f06-8424-0230b62575fa/image_57.png)

调整字体和字样。

### 视口功能

视口的右下方有多个功能。本教程只会用到两个相关的功能：视口对齐和视口导线。

![视口右下方显示了可访问功能的图标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6c92e77-8e0f-4bc7-a612-a6b5dd7dc047/image_58.png)

视口右下方显示了可访问功能的图标

#### 视口对齐

![视口对齐选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/591c15f2-4004-4d2e-8842-dfd7eac5ec0b/image_59.png)

视口对齐选项。

右键点击磁铁图标以访问视口对齐选项。所有选项都可以进行开关，并根据喜好进行配置。

-   在本例中，右键点击磁铁图标并选择 **屏幕和导线（Screen & Guide）** 。

左键点击磁铁图标即可将选择的所有选项禁用。

使用紧邻右侧的网格和磁铁图标即可与指定尺寸的网格对齐。

![设置视口对齐的网格大小](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05c55e8c-0f1d-4167-a061-6e66fa52e7a1/image_60.png)

设置视口对齐的网格大小。

#### 视口导线

使用虚幻引擎内置的导线系统可以确保一切都按照理想的方式进行排列。点击并拖动视口左上方的标尺即可绘制导线，而导线能为你提供额外的精度。

请拖出两条导线并与虚幻引擎徽标对齐。双击导线即可将其移除。

![使用导线排列Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19e1d3c4-6105-43da-9425-4416cd5a1906/image_61.png)

使用导线排列Actor。

要保存一组复杂的导线，请点击视口中的 **摄像机（Camera）** ，然后选择 **导线预设（Guide Presets） > 另存为（Save As）** 。

![保存导线预设](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a0feeef-45c3-4071-b98f-fcf37b1fbcf4/image_62.png)

保存导线预设。

保存导线预设后，导线预设字段下会出现额外选项。具体是：

-   激活（Active）：标识当前使用的已保存预置。
-   保存（Save）：保存当前预设。
-   另存为（Save As）：以新名称保存当前预设。
-   重新加载（Reload）：重新加载当前预设的设置。
-   你可以选择已保存的导线预设并将其填充到视口中。

![保存导线预设后出现的额外选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c90a4b99-4742-4acd-8784-35a882f2218e/image_63.png)

保存导线预设后出现的额外选项。

此时你的项目应该如下图所示：

![教程现阶段的横幅、文本Actor和徽标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bff078a-d137-4807-9425-146acc59775a/image_64.png)

教程现阶段的横幅、文本Actor和徽标。

在继续前请先保存工作。

### 背景条视效细节

在继续前，请自己尝试为背景条添加新纹理，使其不再是简单的白色条形图，而是拥有了吸引眼球的额外细节。

完成后，请阅读下文给出的步骤，看看相较之下自己的成果如何。如果你遇到了困难，请按照指示修改背景条。

1.  选择白色条形图背景，点击细节面板中的 **材质（Material）** 按钮。
    
2.  将 **材质类型（Material Type）** 设为 **材质设计器（Material Designer）** 。
    
3.  点击 **用材质设计器编辑（Edit with Material Designer）** 。
    
    ![用材质设计器编辑按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a51a2db-0e78-4a10-bbcf-3b11f219d157/image_65.png)
    
    用材质设计器编辑按钮。
    
4.  添加一个无Alpha通道的纹理。
    
    ![用添加图层菜单添加一个无Alpha通道的纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0bcb503-3b0a-44c7-bf5a-2e5148e8a788/image_66.png)
    
    用添加图层菜单添加一个无Alpha通道的纹理。
    
5.  将混合模式更改为 **倍增（Multiply）** ，并将纹理控制设置如下：
    
    -   打开纹理下拉菜单，选择标记为 **2** 的 **线性渐变资产（Linear Gradient Asset）** 。
    -   启用 **限制纹理（Clamp Texture）** 。
    -   调整 **偏移（Offset）** 、 **旋转（Rotation）** 和 **缩放（Scale）** 的UV设置。
        -   将偏移设置为-1.415。
        -   将旋转设置为-90。
        -   设置缩放，使X值为0.029，Y值为1.0。
    -   将 **不透明度（Opacity）** 设置为0.87。
    
    ![新建的无Alpha通道纹理的设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74de04db-1b44-4a7b-8248-c49abeeb0003/image_67.png)
    
    新建的无Alpha通道纹理的设置。
    

结果应该如下图所示：

![投影的结果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/811d27c2-e5ca-4af6-9e90-0592d85a0f48/image_68.png)

投影的结果。

此类投影不需要是基于纹理渐变的投影，可以使用带有实时阴影的正常场景光照。这涉及以副本几何体为绿色背板，并将其设置为不透明而不是半透明（半透明材质无法投射阴影）。你大可随意进行尝试！

## 为你的设计制作动画

你现在的目标是让自己创建的内容从屏幕外滑入视野内并在中心停下。你还需要设置离场动画，从而让图形向左侧缩回到屏幕外。

### 为横幅图形制作动画

首先选择整个图形，并设置关键帧以供其抵达。

1.  点击根空Actor。本示例中，虚幻引擎自动将其命名为Null Actor1。
    
    ![横幅图形的空Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed60b57c-926f-47a5-88a5-b94a6a5702e7/image_69.png)
    
    横幅图形的空Actor。
    
2.  转到 **Sequencer** 面板，将播放头推进到第30帧。
    
3.  设置关键帧，方法是按键盘上的 **S键** ，或点击 **细节（Details）** 面板 **通用（General）** 设置 **位置（Location）** 字段右侧的菱形图标。
    
    ![设置关键帧的菱形图标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c117b187-4812-480e-b7c7-4a25aaa66b40/image_70.png)
    
    设置关键帧的菱形图标。
    
4.  点击关键帧，打开新的选择分段。
    
    ![放置并点击关键帧后的新选择分段](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/052586a2-a032-4289-9a0a-7c292ef6ef0c/image_71.png)
    
    放置并点击关键帧后的新选择分段。
    
5.  转到Sequencer，点击磁铁图标左侧的笔图标，找到并启用 **自动添加关键帧（Auto-key）** 。启用此功能后，轨道值被更改时将自动放置关键帧。
    
    ![菜单中的自动添加关键帧功能](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88512e0f-091f-450c-a5e2-c1dc5a676e4c/image_72.png)
    
    菜单中的自动添加关键帧功能。
    
6.  将播放头拖回到第0帧，然后在Sequencer中展开Null Actor1的变换（Transform）>位置（Location）设置项：
    
    ![空Actor的变换>位置设置项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f96a0ae1-2a20-4709-9f48-c0624fc1a1ca/image_73.png)
    
    空Actor的变换>位置设置项。
    
7.  将根空Actor关键帧的 **Y值** 改为 **\-1500** 。这会使整个图形离开屏幕。另外因为启用了自动添加关键帧，该值处还会创建一个关键帧。另一种设置该关键帧的方法则是，更改动态设计大纲视图中的值并点击关键帧菱形图标。
    
8.  要让动画轻松自然地进入帧中，请点击移动开始位置的关键帧（即本例中的第0帧）。这时你应该可以在右侧的选择分段中看到一个图表视图。
    
    ![选择分段中的图表视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d4bd5c4-6349-4b7f-9d76-06a3dc2ea0e8/image_74.png)
    
    选择分段中的图表视图。
    
9.  点击 **选择（Selection）** 下拉菜单将显示几个选项，而这些选项能帮你节省制作动画的时间。在本例中请选择 **三次方（Cubic）** 。
    
    ![选择菜单选项中的三次方选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/144cec36-f40b-484c-ba05-cd78aada4a10/image_75.png) ![UI中选择后的三次方选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e959f3d0-534d-4827-a343-ea8913dc83ee/image_76.png)
    
    选择菜单选项中的三次方选项。
    
    点击Sequencer中的 **播放（Play）** 按钮以查看各选项的效果。
    
10.  接下来请为该动画添加一个暂停，以便开始制作离场动画。 将播放头移至第30帧，右键点击并选择 **添加标记（Add Mark）** 。这将创建一个 **A** 标记。右键点击A并更改其 **标签（Label）** 属性，即可更改标签。现在用A标签就好。
    
    ![添加标记](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8ee6e14-ce7f-466f-99d9-9920c3d99c18/image_77.png)
    
    添加标记。
    
    ![新标记](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6486e753-88c8-4956-a25d-25f8664e15f3/image_78.png)
    
    新标记。
    
11.  点击该按钮，在Sequencer面板右侧打开 **序列（Sequence）** 选项卡。
    
    ![序列选项卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/369e10ac-a130-44af-b7c3-e53ac20a3ecf/image_79.png)
    
    序列选项卡。
    
12.  点击 **角色（Role）** 下拉菜单并选择 **停止（Stop）** 。
    
    标记可以有多种角色。具体包括：
    
    -   标记（Mark）（默认值，无功能）
    -   停止（Stop）
    -   暂停（Pause）
    -   跳转（Jump）
    -   反向（Reverse）
    
    ![标记的角色选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/206022ac-1d2a-402e-9628-f5047192708f/image_80.png)
    
    标记的角色选项。
    
    选择停止意味着动画将在该点停止，直到你选择继续并开始播放离场动画。而你将在稍后制作离场动画。
    
13.  在当前Y位置（第50帧）处创建另一个关键帧。选择轨道后，也可以将ENTER键作为快捷键。 另一种为序列创建关键帧的方法是，点击空Actor变换位置设置中与Y设置相关联的添加关键帧按钮。具体如下所示：
    
    ![添加关键帧按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d36060f1-30aa-42ab-9fc3-81abf11e0024/image_81.png)
    
    添加关键帧按钮。
    
14.  点击第一个关键帧，按住ALT键，然后将关键帧拖到约第90帧的位置。这将复制原先的（屏幕外）关键帧，并创建合适的离场动画。
    
15.  右键点击第70帧处的播放头，然后选择 **设置结束时间（Set End Time）** 以删除时间轴中不必要的分段。
    

### 为徽标制作动画

条形图的动画制作完毕后，下一步是使用 **材质设计器（Material Designer）** 为你创建的虚幻引擎徽标制作动画。

使用 **材质设计器** 为属性制作动画与为其他属性制作动画没有区别；只要属性旁边存在菱形图标，那么工作流程就几乎相同。

1.  首先从动态设计大纲视图中选择徽标Actor。需要使用图层不透明度对其进行缩小和淡入处理。
    
    ![使用不透明度和缩放选项创建动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84cf1004-7a4f-4f67-95e2-553807c9cfa3/image_82.png)
    
    使用不透明度和缩放选项创建动画。
    
2.  为不透明度设置关键帧。
    
    -   将 **Sequencer播放头** 移至第 **8** 帧。
    -   将 **不透明度（Opacity）** 的值设置为 **0** 。
    -   点击关键帧的菱形图标即可让Sequencer移动到该点。为揭露动画设置大约20帧。
    
    ![为不透明度设置关键帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1d9eecb-2c72-4cc8-b5e0-a6acb6d78818/image_83.png)
    
    为不透明度设置关键帧。
    

移动动画的初始值和结束值如下图所示。从开始到结束的关键帧变化如下：

-   不透明度值0.0 -> 不透明度值1.0
-   缩放（Scale）
    -   X值2.786 -> X值1.0
    -   Y值2.786 -> Y值1.0

 ![移动动画的初始值和结束值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44b564e4-76ea-407e-b34d-24f907405308/image_84.png) ![移动动画的初始值和结束值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45565158-c735-4f99-aac5-047b1c886986/image_85.png)

移动动画的初始值和结束值。

你的下一个任务是用不透明度选项卡为徽标遮罩制作动画。

![再次使用不透明度选项卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4ae05b3-d56c-4f9d-ab12-2b0f51c0b2da/image_86.png)

再次使用不透明度选项卡。

-   从此选项卡中指定一个纹理，对整个材质进行遮罩（而不是仅遮罩单一图层）。
    
    ![为材质指定撕裂纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1795c1f4-dd66-429a-a106-84d950f0a528/image_87.png)
    
    为材质指定撕裂纹理。
    

将撕裂纹理添加到材质后，无论你对底层的RGB选项卡做了什么，该纹理都会将材质进行遮罩。

此时限制你的只有你的想象力。请尽情尝试用任何方式使用关键帧——其可能性无穷无尽！

## 使用远程控制绑定版面和内容

现在你已经设计并制作了图形的动画，下一步就是对其进行绑定，从而充分发挥 **远程控制** 的优势。远程控制让你能够公开各种属性，以便你在中心位置自定义属性。

远程控制还提供了一套名为 **行为（Behaviors）** 的强大系统。行为系统提供的逻辑操作为你提供了更强大的绑定能力。你是否想通过控制单个整型的数值，就达成在不同样式（包含多个属性）之间的切换？远程控制和行为系统的组合就可以帮助你做到这一点。

-   首先请选择 **远程控制（Remote Control）** 选项卡。它就位于Sequencer选项卡的旁边。
    
    ![选择远程控制选项卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fbebf86-fe8e-41c9-83f1-eff87910da02/image_88.png)
    
    选择远程控制选项卡。
    
-   你也可以用主菜单的 **窗口（Window）** > **远程控制面板（Remote Control Panel）** 打开远程控制。
    
    ![通过主菜单打开远程控制选项卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a58e0ae-7d80-4ef2-8da5-baa3cebdfd9b/image_89.png)
    
    通过主菜单打开远程控制选项卡。
    

所有动态设计关卡都预先绑定了的远程控制预设。打开面板后的界面应该如下图所示：

![远程控制面板的初始状态](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0df2d9e-39ee-45d3-9685-b430c1e4fbab/image_90.png)

远程控制面板的初始状态。

远程控制面板提供了很多强大且可能显得复杂的功能，但在本示例中你只会用到基本功能。你需要执行以下操作：

-   控制你的两个文本行。
-   用单个控制点更改显示的品牌文本、徽标和条形图本身的颜色。

先从两个文本行开始。

-   要将 **公开属性** 给 **远程控制** ，请转到动态设计大纲视图并选择 **Text\_Line\_1** Actor。
-   观察细节面板并找到摇杆图标。找到属性设置按钮并点击 **文本（Text）** 。

这些摇杆图标随处可见，毕竟远程控制可以控制项目的多个部分。

![摇杆图标表示你可以通过远程控制功能控制设置项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bca18bea-6628-4024-8dcb-eae7dc2fd46d/image_91.png)

摇杆图标表示你可以通过远程控制功能控制设置项。

此时你的界面应该如下图所示。你的文本字符串会在 **属性（Properties）** 列中被公开并供你编辑。你对文本字符串所做的更改会立即反映在视口中。

![属性列中公开的文本字符串](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49631c26-f0fa-4343-a6c0-2a28c3349eaf/image_92.png)

属性列中公开的文本字符串。

控制了左侧的品牌文本后，左侧的 **属性ID（Property ID）** 列就会变得十分重要。属性ID是一种对功能按钮进行分组的方法，非常适合用来整理大量公开的属性。它是用单一来源设置多个属性的工作流程的一部分。本教程将在稍后介绍。

你可以通过 **属性（Properties）** 右侧的列将 **控制器（Controllers）** 添加到设置中。**控制器** 的界面更简单，更易于操作。

-   要为公开的属性创建控制器，请点击并将群组拖到 **控制器（Controller）** 列中。你的界面应该如下图所示：
    
    ![为公开的属性创建控制器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34073de1-8383-411c-a1b1-a77e1f955345/image_93.png)
    
    为公开的属性创建控制器。
    

整理好控制器可以方便操作者访问你的绑定，而为字段做标记将帮你做到这一点。双击控制器ID（Controller ID）和描述（Description）字段即可进行编辑。输入字母数字字符串即可作为新的值。默认情况下，控制器ID的值为 **文本（Text）** 。

1.  将控制器ID标签更改为 **B100** 。
    
2.  将描述设置为 **文本 - 第一行（Text - Line 1）** 。
    

此时你的界面应该如下图所示：

![更改控制器ID和描述文本字段后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d84de32-1ee5-4552-9da9-1bd028db867b/image_94.png)

更改控制器ID和描述文本字段后。

-   对第二行文本重复上述过程。

如果不想重复整个过程，也可以采取另一种更复杂但更高效的方式实现同样的结果。

-   删除Text\_Line\_2 Actor。
-   复制并粘贴Text\_Line\_1 Actor。
-   将副本Actor重命名为Text\_Line\_2。

这样一来，一个 **跟踪器组件（Tracker Component）** 将被添加到副本Actor。此过程既复制了Actor，也会将相同的属性公开给远程控制。此工作流程只需要你额外执行两个步骤：

-   检查网格修饰符是否维持了适当的行距。
-   将新Actor的公开群组从 **属性（Properties）** 面板拖到 **控制器（Controller）** 列中。

你的界面应该如下图所示：

![创建第二个Text_Line Actor后的界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/048d31f6-a9f4-473c-8283-b0c4142ac616/image_95.png)

创建第二个Text\_Line Actor后的界面。

-   在控制器列中，更改 **输入（Input）** 字段下的值来测试远程控制属性。

如果一切配置正确，那么更改的效果将立即显现。请注意，当你将文本从 **属性（Properties）** 面板拖到 **控制器（Controller）** 之中后，系统将自动添加一个 **绑定行为（Bind Behavior）** ，如上方截图所示。这样的行为有很多种——均由我们设计，旨在提供额外的自动化和逻辑以简化你的工作流程。

知晓这一点后，请使用 **条件语句行为（Conditional Behavior ）** 和 **属性ID（Property ID）** 系统，建立驱动条形图左侧项目的逻辑。

-   首先请公开需要用到的属性。请用之前学习的针对Text\_Line Actor的过程，公开以下属性：

#### 徽标

1.  点击动态设计大纲视图中的徽标Actor并打开材质设计器。
    
    ![用于打开徽标所关联的材质设计器的按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98d4c697-b666-47e3-8a3a-4d6ec5cd4ec5/image_96.png)
    
    用于打开徽标所关联的材质设计器的按钮。
    
2.  点击与徽标纹理关联的远程控制按钮，即可将纹理控制器添加到远程控制面板。
    
3.  转到远程控制的属性列，突出显示新公开的纹理。将属性ID（目前被列为 **无（None）**）的值设置为 **100.Logo** 。
    

"100" 是最重要的部分，但如果你有多个图像或颜色需要标记并控制，你也可以用句点来进一步描述属性。

#### 显示标题文本

1.  分别公开包含 **日常（The Daily）** 和 **热修复（Hotfix）** 的文本字段。
    
2.  将"日常（The Daily）"和"热修复（Hotfix）"作为值分别分配给属性ID **100.ShowTitleLine1** 和 **100.ShowTitleLine2** 。 你的界面应该如下图所示：
    

![为文本字段分配属性ID](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c7fe384-d626-4fff-a30b-f9a9b8e2d9f0/image_97.png)

为文本字段分配属性ID。

#### 背景条颜色

1.  点击BG\_Main Actor，或在动态设计大纲视图中将其选中。如果它没有自动打开，请转到你先前设置好的材质设计器。
    
2.  点击绿色底部图层，点击 **更多（More） (⋮)** 菜单，展开公开选项。
    
    ![更多菜单选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec8fa4d1-29e3-4d76-a615-56d0642cd1c5/image_98.png)
    
    更多菜单选项。
    
3.  公开该属性，并为其分配属性ID **100.Background** 。
    

你的界面应该类似于下图：

![公开所有属性后的界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e389f735-97e5-4ec2-8d32-d071773ab5bb/image_99.png)

公开所有属性后的界面。

设置好公开属性后，下一步是进行用一个整型控制多个属性的设置。

1.  转到 **控制器（Controller）** 列，点击左侧的 **加号** ，选择 **整型（Integer）** 。
    
    ![控制器数值选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45888997-56d3-4d0c-a451-b3e8a2173297/image_100.png)
    
    控制器数值选项。
    
2.  为便于整理，请将控制器ID标记为 **A100** 。
    
3.  使用各行控制器ID字段左侧的拖动控点手动对列表进行重新排序。
    
4.  将此属性的描述更改为 **0 = Show 1** | **1=Show 2** 。
    
5.  选择控制器并点击 **行为（Behavior）** 列中的加号，手动添加行为。
    
6.  选择 **条件语句（Conditional）** 并点击属性。
    
    ![添加条件语句行为](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcf849f7-9bf3-4954-9f0d-c9ac1bc06934/image_101.png)
    
    添加条件语句行为。
    
    选定后，你可以选择如何为要添加的内容进行求值，但现在请将其设置为 **\=** 。
    
7.  点击操作（Actions）字段旁的 **加号** 按钮。
    
    ![点击操作列顶部的加号以添加新操作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77205875-4758-4a79-8616-b68770234901/image_102.png)
    
    点击操作列顶部的加号以添加新操作。
    
8.  转到菜单，选择 **添加指定ID操作（Add specific ID action）** > **ID: 100** ，如下图所示：
    
    ![选择使用ID:100的特定ID操作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90f3f173-3c57-46e0-b4b7-f7588a2f7c32/image_103.png)
    
    选择使用ID:100的特定ID操作。
    

这将收集所有以100为前缀的属性，并将它们都同时添加到"操作（Actions）"列中。

![所有前缀为100的属性都被收集到了操作列中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92c8011d-afbb-41b1-b719-104691946805/image_104.png)

所有前缀为100的属性都被收集到了操作列中。

这样一来，当你在 **远程控制（Remote Control）** 控制器中将该值设置为 **0** 时，所有这些值都将被设为你给所选属性所设的值。在本例中，请确保将其设置为0 = Unreal Logo和绿色背景条。

1.  右键点击属性群组，然后选择 **复制（Duplicate）** 。
    
2.  双击副件组的 **条件（Condition）** 字段，将值设置为1。
    

以下示例展示了使用此工作流程可制作的内容。

![使用所述工作流程完成的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87f46bb4-e35f-4db8-90cb-44cc2d0753f9/image_105.png)

使用所述工作流程完成的示例。

设置完成后，当你按下0时会看到第一个横幅主题，而按下1时会看到另一个横幅主题。

## 用Storm Sync打包内容

### 导出.spak文件

你可以将内容导出为轻量的 `.spak` 文件。这非常适合在缺乏源代码控制的情况下备份内容，或将完整场景及其所有依赖文件交给同事。下面介绍该如何为自己的项目使用这一功能。

1.  打开你所处理的关卡。此处采用的示例名为 `Demo_Working_Project` 。
    
2.  在视口中点击鼠标右键，选择 **导出（Export）** ：
    
    ![将项目导出为.spak文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b3bd864-2526-40e0-8adf-8837a990dee3/image_106.png)
    
    将项目导出为.spak文件。
    
    然后虚幻引擎会自动收集并显示所需文件的完整列表。
    
    ![自动收集的待导出文件列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85a0eddd-d6d4-40b8-a45f-b6116612dfe4/image_107.png)
    
    自动收集的待导出文件列表。
    
3.  点击 **下一步（Next）** 。此时你将转到导出的选项屏幕。你可以在其中为 `.spak` 文件命名。
    
    ![为导出的文件命名](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddd58b6c-c65a-4750-8542-a72d241f9801/image_108.png)
    
    为导出的文件命名。
    
4.  命名文件并点击 **完成（Finish）** 。右下角应该出现一条消息，显示文件的保存位置。
    

### 导入.spak文件

要导入 `.spak` 文件，请将文件从导出目录拖放到 **内容浏览器（Content Browser）** 中。导入文件前系统会显示一个画面，供你验证文件的内容。如果虚幻引擎检测到 `.spak` 文件内容与项目中的内容存在差异，那么它会对你发起通知，并导入有变更的内容。如果导入的是一组全新资产，那么变更列表会显示所有内容。

下图示例列表展示的是现有项目不存在任何文件的情况：

![从.spak文件导入项目时会出现的变更列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90d36a5f-a984-43e6-ba65-b0f84402c77c/image_109.png)

从.spak文件导入项目时会出现的变更列表

点击 **导入（Import）** 以将必要的文件填充到内容浏览器中。

## 纲要工具UI概览

开始本节内容前，强烈建议你使用双显示器。这样你就可以将一个显示器用作输出显示器，而另一个则用作图形的操作台。没有双显示器将很难跟上本教程。

一切设置完毕后，剩下的事情就是用 **纲要** 工具播放你制作的自定义内容。

首先，在内容浏览器中点击右键，选择 **动态设计（Motion Design）> 动态设计纲要（Motion Design Rundown）** ，创建一个新的纲要。

![创建新的动态设计纲要](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0853d68-3a2c-490d-9c48-dabe4063614c/image_110.png)

创建新的动态设计纲要。

你可以用 **纲要（Rundown）** 工具将关卡添加到中心位置并创建页面，并利用这些页面快速生成供实时播放的内容。以下工作流程将从浅层且完全本地化的角度介绍纲要工具，以供进行简单的播放任务。

只要设置正确，你就可以在一个网络中运行多个虚幻引擎实例，并通过一个运行纲要和纲要预览功能的虚幻引擎实例，对托管着待播放项目的可发现虚幻引擎实例进行控制。

![动态设计纲要界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53af1147-93f5-4195-a27e-0775c2564881/image_111.png)

动态设计纲要界面。

以下是本教程中纲要工具界面较为重要的方面：

1.  模板列表：此处放置所有的导入关卡。你可以从 **内容浏览器** 中拖出关卡到此处来进行导入。
    
2.  播放功能按钮：用面板控制选定的页面。此处可以进行播放/停止、继续和播放纲要中的下一个项目等操作。这些播放功能按钮严格地特指对图形进行实况播放。你可以使用页面预览（Page Preview）在播放前进行预览。页面预览详情见第6项。
    
3.  页面列表：从模板列表中拖出项目都会导致创建页面。你可以将页面送往指定的通道。对于本教程，请将通道保留为Channel\_0。
    
4.  页面细节：供你在此处设置单个页面的属性，例如文本行、整型值等。你还可以在此处修改页面ID和页面名称。
    
5.  工具栏：工具栏含几个常用的功能按钮，如保存、添加/删除新模板或页面，或广播设置等。"启动所有通道（Start All Channels）"右侧还有一个快速访问按钮，可高效地进行"实况播放"。
    
6.  页面预览：功能与上面提到的播放功能按钮类似，让操作者可以在实况播放图形前预览所选页面的内容。你还可以使用 **预览下一个（Preview Next）** 按钮查看完整的页面列表。
    

## 使用纲要工具

首先请将你的关卡添加到纲要。

1.  点击顶部行的 **添加模板（Add Template）** 按钮，或直接将关卡拖到模板列表中。
    
2.  双击 **开始预览（Preview In）** 按钮以查看你所处理的内容。
    

结果应该如下图所示：

![在纲要工具中预览页面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/587a7e9e-e1fd-4460-9b55-f6ebdbd4a64a/image_112.png)

在纲要工具中预览页面。

预览并不意味着你会在实况直播中播放图形。可以注意到，播放（Take In） / 停止（Take Out）按钮仍然呈灰色（详见界面描述中的列表项2）。

这是因为你还需要将模板拖到 **页面列表** 中。

1.  将模板拖入页面列表后，再点击页面预览面板上的 **继续（Continue）按键** 。如果一切正常，你应该能看到你所创建的离场动画会播放，让图形随之离开屏幕。
    
2.  在纲要中选择页面后，修改部分页面的细节。
    
    1.  更改B100和B200的值，让其显示默认文本以外的内容。
        
    2.  再次点击 **开始预览（Preview In）** 按钮。
        

结果应该如下图所示：

![在预览中修改页面的文本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9dba5ae4-7e91-445a-8ccd-7dde4f9afec9/image_113.png)

在预览中修改页面的文本。

1.  右键点击0001页面并选择 **复制（Duplicate）** 。请修改该页面，以进一步试验这些功能按钮。
    
2.  转到副本页面，将页面细节中的A100属性的值设置为1，而不是0。根据现有的逻辑，对图形使用"开始预览（Preview In）"的结果应该如下图所示：
    
    ![创建副本页面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f998bca0-88ba-45b5-a99a-ae5c2b346928/image_114.png)
    
    创建副本页面。
    

完成页面设置且页面可运行后，请简要了解一下图形的输出。为简单起见，本教程将介绍使用单机的操作，即操作和输出发生在同一引擎上。

-   点击"广播（Broadcast）"按钮，打开 **广播编辑器（Broadcast Editor）** ：
    
    ![打开广播编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5360907a-0c0f-40f9-a74a-a6213d5f89fb/image_115.png)
    
    打开广播编辑器。
    

**广播（Broadcast）** 窗口打开如下：

![广播窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02445d85-28d4-4554-a0a9-8e22b1507db9/image_116.png)

广播窗口。

右侧的 **输出设备（Output Devices）** 列表会显示目前可用的显示器

如前文所述，你必须用多个显示器。

1.  点击用于接收输出的显示器，并将其拖入Channel\_0视口。结果应该如下图所示：
    
    ![拖入输出显示器后的Channel_0视口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/303042c2-c775-439e-b24f-92d9382e45e2/image_117.png)
    
    拖入输出显示器后的Channel\_0视口。
    
2.  设置好输出后，点击 **启动所有通道（Start All Channels）** 按钮。
    
    ![启动所有通道按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dfef6daf-4eab-416c-9d20-95102d2bd52d/image_118.png)
    
    启动所有通道按钮。
    

该通道指定的屏幕将黑屏，不会显示任何活动，直到你返回 **纲要** 。

1.  在本教程中，请将刚刚黑屏的显示器指定为 **程序显示器（Program display）** ，将另一台显示器指定为 **纲要显示器（Rundown display）** 。
    
2.  你当前处于 **直播（Live）** 状态。查看纲要显示器，点击任一页面上的 **开始预览（Preview In）** 按钮。该窗口将用预览视口播放。假设预览正常，并点击纲要显示器上的 **播放（Take In）** 按钮。这时，之前黑屏的程序显示器将显示你的下方三分之一处的图形。
    

下方图片同时给出了两台显示器的显示效果：

![左侧为纲要显示器，右侧为程序显示器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ac844cf-42a1-464c-952e-45c4da4f08c6/image_119.png)

左侧为纲要显示器，右侧为程序显示器。

-   当主动输出到程序显示器时，从纲要中选择第二页，然后对该页进行 **开始预览（Preview In）** 。
    
    ![在纲要显示器中预览，且不影响程序显示器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fab8cf8e-4d91-431c-a4bc-f142ccf4cce4/image_120.png)
    
    在纲要显示器中预览，且不影响程序显示器。
    

在你预览下一页的同时，直播页面也在被正常显示。

-   点击此处的 **继续（Continue）** 按钮：
    
    ![继续按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d8d5543-ee6d-4204-b6ac-982f179e4c83/image_121.png)
    
    继续按钮。
    

程序显示器上的图形将播放离场动画，并离开显示屏范围。

-   选择002页面后，点击 **播放（Take In）** ，那么蓝色的下方三分之一处图形将播放动画，并在程序显示器上移动。

图形设置好后，请尝试使用这些选项，并学习如何操作你的图形。

你可以用数字键盘从页面列表中调出页面。按CTRL+Enter可激活该页面的预览（Preview In），按Shift+Enter可激活播放（Take In），并以将该页面发送到程序显示器。将鼠标悬停在其他按钮上，即可查看各自的快捷方式。

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门指南](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [在现有关卡中使用动态设计](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E5%9C%A8%E7%8E%B0%E6%9C%89%E5%85%B3%E5%8D%A1%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%8A%A8%E6%80%81%E8%AE%BE%E8%AE%A1)
-   [用动态设计场景的默认元素填充空白关卡](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E7%94%A8%E5%8A%A8%E6%80%81%E8%AE%BE%E8%AE%A1%E5%9C%BA%E6%99%AF%E7%9A%84%E9%BB%98%E8%AE%A4%E5%85%83%E7%B4%A0%E5%A1%AB%E5%85%85%E7%A9%BA%E7%99%BD%E5%85%B3%E5%8D%A1)
-   [创建新动态设计关卡](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%96%B0%E5%8A%A8%E6%80%81%E8%AE%BE%E8%AE%A1%E5%85%B3%E5%8D%A1)
-   [生成默认场景Actor](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E7%94%9F%E6%88%90%E9%BB%98%E8%AE%A4%E5%9C%BA%E6%99%AFactor)
-   [使用动态设计创建2D动画图形](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%8A%A8%E6%80%81%E8%AE%BE%E8%AE%A1%E5%88%9B%E5%BB%BA2d%E5%8A%A8%E7%94%BB%E5%9B%BE%E5%BD%A2)
-   [你将学习的内容](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E4%BD%A0%E5%B0%86%E5%AD%A6%E4%B9%A0%E7%9A%84%E5%86%85%E5%AE%B9)
-   [编辑初始模板](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%88%9D%E5%A7%8B%E6%A8%A1%E6%9D%BF)
-   [创建形状和群组](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%BD%A2%E7%8A%B6%E5%92%8C%E7%BE%A4%E7%BB%84)
-   [使用材质设计器自定义图形](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%9D%90%E8%B4%A8%E8%AE%BE%E8%AE%A1%E5%99%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9B%BE%E5%BD%A2)
-   [界面按键](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E7%95%8C%E9%9D%A2%E6%8C%89%E9%94%AE)
-   [添加图案](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%9B%BE%E6%A1%88)
-   [在动态设计中添加内容](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E5%9C%A8%E5%8A%A8%E6%80%81%E8%AE%BE%E8%AE%A1%E4%B8%AD%E6%B7%BB%E5%8A%A0%E5%86%85%E5%AE%B9)
-   [将文本添加至版面](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E5%B0%86%E6%96%87%E6%9C%AC%E6%B7%BB%E5%8A%A0%E8%87%B3%E7%89%88%E9%9D%A2)
-   [更改字体](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E6%9B%B4%E6%94%B9%E5%AD%97%E4%BD%93)
-   [文本版面工具](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E6%96%87%E6%9C%AC%E7%89%88%E9%9D%A2%E5%B7%A5%E5%85%B7)
-   [网格排列修饰符](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E7%BD%91%E6%A0%BC%E6%8E%92%E5%88%97%E4%BF%AE%E9%A5%B0%E7%AC%A6)
-   [将徽标添加至版面](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E5%B0%86%E5%BE%BD%E6%A0%87%E6%B7%BB%E5%8A%A0%E8%87%B3%E7%89%88%E9%9D%A2)
-   [视口功能](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E8%A7%86%E5%8F%A3%E5%8A%9F%E8%83%BD)
-   [视口对齐](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E8%A7%86%E5%8F%A3%E5%AF%B9%E9%BD%90)
-   [视口导线](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E8%A7%86%E5%8F%A3%E5%AF%BC%E7%BA%BF)
-   [背景条视效细节](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E8%83%8C%E6%99%AF%E6%9D%A1%E8%A7%86%E6%95%88%E7%BB%86%E8%8A%82)
-   [为你的设计制作动画](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E4%B8%BA%E4%BD%A0%E7%9A%84%E8%AE%BE%E8%AE%A1%E5%88%B6%E4%BD%9C%E5%8A%A8%E7%94%BB)
-   [为横幅图形制作动画](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E4%B8%BA%E6%A8%AA%E5%B9%85%E5%9B%BE%E5%BD%A2%E5%88%B6%E4%BD%9C%E5%8A%A8%E7%94%BB)
-   [为徽标制作动画](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E4%B8%BA%E5%BE%BD%E6%A0%87%E5%88%B6%E4%BD%9C%E5%8A%A8%E7%94%BB)
-   [使用远程控制绑定版面和内容](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E7%BB%91%E5%AE%9A%E7%89%88%E9%9D%A2%E5%92%8C%E5%86%85%E5%AE%B9)
-   [徽标](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E5%BE%BD%E6%A0%87)
-   [显示标题文本](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E6%98%BE%E7%A4%BA%E6%A0%87%E9%A2%98%E6%96%87%E6%9C%AC)
-   [背景条颜色](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E8%83%8C%E6%99%AF%E6%9D%A1%E9%A2%9C%E8%89%B2)
-   [用Storm Sync打包内容](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E7%94%A8stormsync%E6%89%93%E5%8C%85%E5%86%85%E5%AE%B9)
-   [导出.spak文件](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E5%AF%BC%E5%87%BAspak%E6%96%87%E4%BB%B6)
-   [导入.spak文件](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E5%AF%BC%E5%85%A5spak%E6%96%87%E4%BB%B6)
-   [纲要工具UI概览](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E7%BA%B2%E8%A6%81%E5%B7%A5%E5%85%B7ui%E6%A6%82%E8%A7%88)
-   [使用纲要工具](/documentation/zh-cn/unreal-engine/your-first-graphic-with-motion-design-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%BA%B2%E8%A6%81%E5%B7%A5%E5%85%B7)