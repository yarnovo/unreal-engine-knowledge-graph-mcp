# 虚幻引擎Niagara概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:30:06.568Z

---

目录

![Niagara概述](https://dev.epicgames.com/community/api/documentation/image/5e94fc31-5e9f-4cd7-9f20-fbca1fd0ea80?resizing_type=fill&width=1920&height=335)

Niagara是虚幻引擎的下一代视觉特效处理系统。技术美术师无需程序员的任何帮助，就能使用Niagara创建出丰富多彩的效果。此系统适应性强，灵活多变。初学者可以从修改模板或行为示例来入手，而高级用户可以自行创建自定义模块。

## 核心Niagara组件

在Niagara视觉特效处理系统中，共有四个核心组件：

-   系统（System）
-   发射器（Emitter）
-   模块（Module）
-   参数（Parameter）

### 系统

Niagara系统是一种容器，可以放入你要构建该效果的所有内容。在这个系统中，你可以搭建不同的构建块来实现总体效果。

你可以修改一些系统级的行为，这些修改随后将应用到该效果中所有内容。

![Niagara系统设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47316ff8-564b-43c2-83e9-6be98561be47/01-niagara-system.png "Niagara System Settings")

系统编辑器中的 **时间轴（Timeline）** 面板将显示系统中包含的发射器，并且可以用于管理这些发射器。

### 发射器

发射器可用来在Niagara系统中生成粒子。发射器将控制粒子的生成、粒子在生命周期中的遭遇，以及粒子的外观和行为。

发射器位于堆栈中。在该堆栈中有几个组，而在组中可以放置用于实现各个任务的模块。 组如下所示。

![发射器组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c48ba2a-c017-4151-96a6-b32dd80e4f43/02-emitters-with-groups.png "Emitter Groups")

1.  **发射器生成（Emitter Spawn）**
    
    此组将定义在CPU上首次创建发射器时将会发生什么。使用此组可以定义初始设置和默认值。
    
2.  **发射器更新（Emitter Update）**
    
    此组将定义CPU上每一帧发生的发射器级模块。如果你希望粒子在每一帧上持续生成，可以使用此组来定义粒子的生成。
    
3.  **粒子生成（Particle Spawn）**
    
    当粒子生成时，每个粒子将调用一次此组。此时你可能需要定义粒子的初始化细节，例如粒子的生成位置、粒子的颜色、大小和其他特征。
    
4.  **粒子更新（Particle Update）**
    
    每一帧上的每个粒子都会调用此组。你需要在此处定义在粒子生命周期中将会逐帧更改的所有特征。例如，粒子的颜色会随着时间逐渐变化。或者，粒子受到各种力的影响，例如重力、旋度噪点或点吸引。你甚至可能需要让粒子随着时间改变大小。
    
5.  **事件处理器（Event Handler）**
    
    在事件处理器组中，你可以在一个或多个用于定义特定数据的发射器中创建"生成"事件。然后，你可以在用于触发某个行为以响应该生成的事件的其他发射器中创建"侦听"事件。
    
6.  **渲染（Render）**
    
    最后一个组是渲染组。你可以在此处定义粒子的显示，以及为粒子设置一个或多个渲染器。如果要定义3D模型作为粒子的基础以便在这个基础上应用材质，那么你可能需要使用网格体渲染器。或者，你可能需要使用Sprite渲染器并将粒子定义为2D Sprite。我们提供了很多不同的渲染器来供你选择和试用。
    

### 模块

模块是Niagara中效果的基础构建块。你可以将模块添加到组中来形成堆栈。模块按照自上而下的顺序处理。

![发射器模块](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fcea36e-2629-445d-b514-74e664164305/03-modules-in-an-emitter.png "Emitter Modules")

你可以将模块视为能够执行某些数学运算的容器。你需要将数据传送到模块中，然后在模块中对该数据执行一些数学运算，然后在模块结束时将该数据重新写出。

模块是使用高级着色语言(HLSL)进行构建的，但是可以使用节点在图表中以可视方式进行构建。你可以创建函数（包括输入），或者写入到某个数值或参数贴图中。你甚至可以使用图表中的 **CustomHLSL** 节点，以内联方式编写HLSL代码。

你可以双击Niagara中发射器内部的模块，以查看在模块内部发生的数学运算。你甚至可以复制和创建自己的模块。例如，双击"添加速度（Add Velocity）"模块来查看其内部，则可以看到数据流。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f58faace-62a8-4045-90ce-f8d6cb1d6409/04-add-velocity-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f58faace-62a8-4045-90ce-f8d6cb1d6409/04-add-velocity-module.png)

点击查看大图。

脚本首先检索输入 - 速度输入和坐标空间。然后获取粒子的当前速度，以及输入的比例因子。然后，输入速度随之进行调整，变换到正确的坐标空间中，并添加到粒子的当前速度上。该工作完成后，新的粒子速度将会写出，以便于堆栈中其他需要速度信息的任何模块都可以检索该速度。

所有模块都使用这种基础方法构建，但是部分模块的内部数学运算更加复杂。

### 参数和参数类型

*参数* 在Niagara模拟中，是一种数据的抽象化。系统会将参数 *类型* 分配给参数，以定义参数所表示的数据。参数分为四种类型：

-   **图元（Primitive）** ：这种类型的参数将定义具有各种精度和通道宽度的数值数据。
-   **枚举（Enum）** ：这种类型的参数将定义一组固定的指定值，并认定其中一个指定值。
-   **结构体（Struct）** ：这种类型的参数将定义一组合并的图元和枚举类型。
-   **数据接口（Data Interfaces）** ：这种类型的参数将定义能够从外部数据源提供数据的函数。此类参数可能是来自UE4其他部件的数据，或者是来自外部应用的数据。

![参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/416b4e8f-9f34-481f-8d02-2877751b2aa9/05-parameters.png "Parameters")

点击 **加号** 图标 (**+**) 并选择 **直接设置新参数或现有参数（Set new or existing parameter directly）** ，可以将自定义参数模块添加到发射器。这会将 **设置参数（Set Parameter）** 模块添加到堆栈。点击 **设置参数（Set Parameter）** 模块上的 **加号** 图标 (**+**) 即可设置现有参数，点击 **创建新参数（Create New Parameter）** 即可设置新参数。

## 模板、向导和行为示例

首次创建Niagara发射器或Niagara系统时，界面上将显示一个对话框，其中将提供多个选项，供您选择创建哪种类型的发射器或系统。

你可以更改模板中的参数。你可以添加、修改或删除模块。你还可以在系统模板中添加、修改或删除发射器。模板让你可以快速开发挥创造力，也提供了一些可以供你直接使用的内容。

### 系统向导

要创建新的Niagara系统，请右键点击 **内容浏览器（Content Browser）** 并找到 **特效处理（FX）** > **Niagara系统（Niagara System）**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72c689e0-f5d1-4b87-ba9b-021a26fee45f/06-create-new-niagara-system.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72c689e0-f5d1-4b87-ba9b-021a26fee45f/06-create-new-niagara-system.png)

点击查看大图。

系统向导提供了以下选项来创建新系统：

-   **基于所选发射器的新系统（New system from selected emitters）** ：如果选择此选项并点击 **下一步（Next）** ，将显示可用发射器的列表。此列表包涵项目中的现有发射器和模板发射器。选择要包含在新系统中的发射器，然后点击绿色的 **加号** 图标 (**+**) 添加。然后点击 **完成（Finish）** 即可创建系统。如果选择现有发射器，系统将从这些发射器继承。如果选择模板发射器，系统将不会继承任何内容。此外，模板发射器是可以严格位于系统本地的实例，也可以保存为单独的发射器资产。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f43e579-de0c-42cc-8fae-2ca3fecbbe52/07-new-system-from-selected-emitters.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f43e579-de0c-42cc-8fae-2ca3fecbbe52/07-new-system-from-selected-emitters.png)
    
    点击查看大图。
    
-   **基于模板或行为示例的新系统（New system from a template or behavior example）** ：如果选择此选项并点击 **下一步（Next）**，你可以从用于表示多个通用效果系统的模板或行为示例列表中选择。对于发射器模板，可以由美术负责人或创意总监制作。如果您刚开始使用UE，此选项可以提供在Niagara中构建特效处理系统的示例。 行为示例是简单的示例，设计用于支持Niagara系统的某个独立的方面，通过查看某个示例可以了解该行为的原理。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/791c2c6d-9422-4fde-b079-5dd45a5a8519/08-new-system-from-template.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/791c2c6d-9422-4fde-b079-5dd45a5a8519/08-new-system-from-template.png)
    
    点击查看大图。
    
-   **复制现有系统（Copy existing system）** ：如果选择此选项并点击 **下一步（Next）** ，将显示现有系统的列表。从中选择一个要复制的系统，然后点击 **完成（Finish）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41d4dbb6-d255-4574-a301-0dc4b2975fe9/09-copy-existing-system.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41d4dbb6-d255-4574-a301-0dc4b2975fe9/09-copy-existing-system.png)
    
    点击查看大图。
    
-   **创建空系统（Create empty system）** ：如果选择此选项，系统将不包含发射器或发射器模板。如果要创建与其他系统完全不同的系统，此选项将非常有用。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bec48251-699c-4d09-8004-ae4064b66f85/10-create-empty-system.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bec48251-699c-4d09-8004-ae4064b66f85/10-create-empty-system.png)
    
    点击查看大图。
    

### 发射器向导

要创建新的发射器，请右键点击 **内容浏览器（Content Browser）** 并找到 **特效处理（FX）** > **Niagara发射器（Niagara Emitter）**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/087e073a-20da-47de-9a42-997c0c04efe4/11-new-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/087e073a-20da-47de-9a42-997c0c04efe4/11-new-emitter.png)

点击查看大图。

发射器向导提供了以下选项来创建新发射器：

-   **基于模板的新发射器（New emitter from a template）** ：如果选择此选项，你可以从用于表示多个通用效果类型的模板列表中选择。在大型开发工作室中，美术负责人或创意总监可以制作模板列表，从而确保将公司的最佳做法烘焙到模板中。如果您刚开始使用UE，这些模板则可以作为一个良好的起点。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5121e281-692b-42be-a001-076d6fcb963e/12-new-emitter-from-template.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5121e281-692b-42be-a001-076d6fcb963e/12-new-emitter-from-template.png)
    
    点击查看大图。
    
-   **从现有发射器继承（Inherit from an existing emitter）** ：如果选择此选项，你可以创建一个从现有发射器继承属性的新发射器。此选项会将新发射器作为您选择的现有发射器的子项。如果需要多个同时具有某些属性的发射器，这是一个非常适合的选项。你可以更改父发射器，并让所有子发射器应用这些更改。从父发射器中选择使用此选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87dc1a4c-ae7b-4529-a312-b939e803fb0c/13-new-emitter-from-parent.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87dc1a4c-ae7b-4529-a312-b939e803fb0c/13-new-emitter-from-parent.png)
    
    点击查看大图。
    
-   **复制现有发射器（Copy existing emitter）** ：如果选择此选项，你可以创建一个作为已创建发射器副本的新发射器。如果需要创建多个相似的发射器，此选项将非常有用。选择此选项之后点击"下一步（Next）"，将显示可用发射器的列表。随后可以选择要复制的发射器。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ec72bec-1be0-4938-b69d-c34efd61cabf/14-copy-existing-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ec72bec-1be0-4938-b69d-c34efd61cabf/14-copy-existing-emitter.png)
    
    点击查看大图。
    

## Niagara视觉特效处理工作流

### 创建系统

首先创建一个Niagara系统，以便在其中添加一个或多个发射器。随后你就可以设置每个发射器的属性。

### 创建或添加发射器

在Niagara编辑器中，你可以通过更改发射器中已存在的模块的属性，或针对所需的效果来添加新模块，从而调整发射器。此外，你还可以复制发射器并将多个发射器添加到单个Niagara系统中。作为此方法的示例，请参阅Sparks教程。

### 创建或添加模块

在发射器中，你可以从Niagara添加现有模块，方法是点击要添加模块的组的 **加号（Plus）(+)** 。Niagara中随附了大量预装模块，大部分情况下，你不需要设计自定义模块即可创建效果。

但是，如果需要创建自己的模块，理解数据在模块中的流动方式将非常有帮助。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c649b7a-36f8-4d7f-9136-62fd4ca4d5bd/15-create-module-workflow.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c649b7a-36f8-4d7f-9136-62fd4ca4d5bd/15-create-module-workflow.png)

数据在模块中流动。点击查看大图。

-   模块将累加到一个临时的命名空间中，然后你可以将更多的模块堆叠在一起。只要模块所针对的属性相同，那么这些模块就可以正确地堆叠和累加。
-   在编写模块时，有很多功能可供使用：
    -   布尔运算符
    -   数学表达式
    -   三角表达式
    -   自定义函数
    -   让样板函数变得更轻松的节点
-   你创建模块之后，任何人都可以使用。
-   所有使用HLSL的模块。逻辑流如下所示：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2695030-3987-4c40-b1fd-175cd305a806/16-hlsl-logic-flow.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2695030-3987-4c40-b1fd-175cd305a806/16-hlsl-logic-flow.png)
    
    HLSL逻辑流。点击查看大图。
    

请记住，你创建的所有模块、发射器和系统都会使用资源。为了节约资源和提高性能，请查看Niagara中已经包含的模块，以了解是否可以在不创建新模块的情况下完成目标。[动态输入](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E5%8A%A8%E6%80%81%E8%BE%93%E5%85%A5)可在此处用于强化效果。

## Niagara范例

### 继承

-   采用平面化层级时，你无法有效地查找和使用库中已有的资产，这就导致你需要重新创建这些资产。重复工作将会导致效率下降，成本增加。
-   层级式继承提高了发现能力，能够有效地重新使用现有资产。
-   对于系统中的子发射器，继承的内容都可以覆盖。
-   模块可以添加，或者可以恢复为父级值。
-   发射器级的行为也是如此，例如生成、生命周期、循环、爆发等。

### 动态输入

-   动态输入的构建方式与模块相同。
-   动态输入让用户可以对继承进行无限扩展。
-   动态输入不处理参数映射，而是处理数值类型。
-   所有数值都可以由图表逻辑和面向用户的数值驱动。
-   在创建模块时，动态输入几乎具有相同的功能，但可以选择并放入堆栈中，而不必实际创建新模块。
-   你可以通过使用和链接动态输入来修改和自定义现有模块；这样可以减少模块拥挤和提高性能。

### 微表达式

-   所有内联值都可以转换成HLSL表达式片段。
-   用户可以访问粒子、发射器或系统中的变量，以及HLSL或VM函数。
-   这对于不需要新模块的小型一次性功能非常有效。

### 事件

-   事件是在元素（例如粒子、发射器和系统）之间进行通信的方法。
-   事件可以是任何类型的数据，能够打包到负载中（例如结构体）并发送。然后，所有操作都可以侦听该事件并采取行动。
-   你可以使用的选项包括：
    -   使用粒子ID在粒子上直接运行事件。
    -   在系统中的每个粒子上运行事件。
    -   将粒子设置为针对事件生成，然后对这些粒子采取某种操作。
-   事件是图表（结构体）中的特殊节点。如何使用事件节点：
    -   命名事件。
    -   向事件添加所需的数据。
    -   将事件处理器添加到发射器堆栈中。
    -   设置事件处理器的选项。
-   事件有单独的执行堆栈。
    -   你可以将复杂的图表逻辑放入事件处理器。
    -   你可以使用复杂的逻辑设置整个粒子系统，然后制作在事件触发时发生的整个单独的行为集。

### 数据接口

-   软件提供了一个可扩展的系统，允许访问任意数据。
-   任意数据包括网格体数据、音频、外部DDC信息、代码对象和文本容器。
-   数据接口可以编写成插件，以便在未来获得更大的可扩展性。
-   用户可以使用骨骼网格体数据口将数据关联到骨骼网格体。

### Houdini

-   你可以利用Houdini，计算分割点、生成位置、影响位置、影响速度、法线等。
-   然后你可以将该数据从Houdini导出为通用的容器格式(CSV)。
-   你可以将该CSV导入到UE4项目中的Niagara。

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [核心Niagara组件](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E6%A0%B8%E5%BF%83niagara%E7%BB%84%E4%BB%B6)
-   [系统](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E7%B3%BB%E7%BB%9F)
-   [发射器](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E5%8F%91%E5%B0%84%E5%99%A8)
-   [模块](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E6%A8%A1%E5%9D%97)
-   [参数和参数类型](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E5%8F%82%E6%95%B0%E5%92%8C%E5%8F%82%E6%95%B0%E7%B1%BB%E5%9E%8B)
-   [模板、向导和行为示例](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E6%A8%A1%E6%9D%BF%E3%80%81%E5%90%91%E5%AF%BC%E5%92%8C%E8%A1%8C%E4%B8%BA%E7%A4%BA%E4%BE%8B)
-   [系统向导](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E7%B3%BB%E7%BB%9F%E5%90%91%E5%AF%BC)
-   [发射器向导](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E5%8F%91%E5%B0%84%E5%99%A8%E5%90%91%E5%AF%BC)
-   [Niagara视觉特效处理工作流](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#niagara%E8%A7%86%E8%A7%89%E7%89%B9%E6%95%88%E5%A4%84%E7%90%86%E5%B7%A5%E4%BD%9C%E6%B5%81)
-   [创建系统](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E5%88%9B%E5%BB%BA%E7%B3%BB%E7%BB%9F)
-   [创建或添加发射器](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E5%88%9B%E5%BB%BA%E6%88%96%E6%B7%BB%E5%8A%A0%E5%8F%91%E5%B0%84%E5%99%A8)
-   [创建或添加模块](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E5%88%9B%E5%BB%BA%E6%88%96%E6%B7%BB%E5%8A%A0%E6%A8%A1%E5%9D%97)
-   [Niagara范例](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#niagara%E8%8C%83%E4%BE%8B)
-   [继承](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E7%BB%A7%E6%89%BF)
-   [动态输入](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E5%8A%A8%E6%80%81%E8%BE%93%E5%85%A5)
-   [微表达式](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E5%BE%AE%E8%A1%A8%E8%BE%BE%E5%BC%8F)
-   [事件](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E4%BA%8B%E4%BB%B6)
-   [数据接口](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3)
-   [Houdini](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#houdini)