# 虚幻引擎过场动画Actor轨道 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:11:38.190Z

---

目录

![Object绑定轨道](https://dev.epicgames.com/community/api/documentation/image/fca13d84-c131-4c73-876d-423f9b44e91a?resizing_type=fill&width=1920&height=335)

在Sequencer中，你可以添加 **\*[静态网格体Actor](/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine)**、**[骨骼网格体Actor](/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine)** 和其他类型的Actor来制作动画。Sequencer中的所有Actor都使用 **Object绑定轨道** 进行引用，从而访问其属性、组件和变量。

本指南概述了Object绑定轨道、绑定如何使用它、如何访问Sequencer中的Actor组件，以及如何使用自动轨道创建。

#### 准备工作

-   确保你已了解 **[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)** 及其 **[界面](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)**。
-   确保你已了解 **[蓝图可视化脚本](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)**。

## 创建

当你通过各种方法向Sequencer添加Actor时，就会创建Object绑定轨道。

在 **轨道(+)** 菜单内前往 **Actor到Sequencer（Actor To Sequencer）** 子菜单，可以将Actor添加到序列。从这里，你可以选择当前处于你的关卡中的任何Actor以添加到序列，或使用搜索栏搜索特定Actor。

![actor to sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd46bcfc-70ce-4a42-8348-0b093fbe39f3/addactor.gif)

如果已经选择了关卡中的一个Actor，为了方便起见，其将在 **Actor到Sequencer** 列表的顶部列出。

你还可以从其他窗口（如 **[大纲视图](/documentation/zh-cn/unreal-engine/outliner-in-unreal-engine)** ）拖动Actor，并将其添加到Sequencer中。

![sequencer drag and drop actor add](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/138611b1-dffa-47b3-9860-540ef065d699/addactor2.png)

### 绑定

将Actor添加到Sequencer后，将创建Object绑定轨道并绑定到选定的Actor。绑定使某些属性轨道和组件变得可用，具体取决于Actor的类。

举例而言，将轨道绑定到 **[骨骼网格体Actor](/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine)** 后，可以创建 **[动画轨道](/documentation/zh-cn/unreal-engine/cinematic-animation-track-in-unreal-engine)**，这是 **骨骼网格体组件** 特定的轨道。

![skeletal mesh actor component animation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dff56ebf-7d98-4f10-b980-6945a9e730df/animationtrack.png)

右键点击轨道并导航到 **指定Actor** 菜单，即可变更或删除Actor绑定。

![assign actor bind](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/162f4501-48b9-4788-a07d-5bc73704ea4f/assignactor.png)

要变更Object绑定轨道的绑定，可以直接从 **指定Actor** 菜单中的Actor列表中选择新Actor，或选择新Actor并点击 **用选定项替换**。

![replace with selected](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3abd0bec-eb7e-4d02-bd36-aba81ec83486/replaceactor.gif)

在不同类的Actor之间重新绑定时，将会保留任何类特定的轨道，但它们已没有功能，除非新的绑定包含轨道的兼容组件。

要移除绑定，右键点击"Object绑定轨道"，导航到"指定Actor"菜单，然后选择 **移除全部**。如果在视口中选择了相同的Actor，还可以选择 **移除选定项**。

![remove object binding](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ee4b225-9d48-440f-a746-fb6d992fee95/removebinding.png)

你还可以使用 **[蓝图函数](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)** 来变更绑定。导航到 **Sequencer > 播放器 > 绑定** 以从关卡序列引用Object调用蓝图函数时，就可以找到绑定函数。可以在此选择使用显式绑定函数，如 **设置绑定**，或[**按标签**](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine#%E6%A0%87%E7%AD%BE)变更绑定。

![sequencer player bindings blueprints](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba3b46e6-f313-4681-ba80-4d7898cf04a8/bindingbp.png)

### 多重绑定

还可以将多个Actor绑定到轨道，从而使单个轨道能够同时控制多个Actor。绑定多个Actor时，轨道使用 **黄色V形符号**表示，绑定的Actor数量显示在轨道名称旁边的括号中。

![multiple object binding](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cea856a5-3c68-44e7-99df-7531c94dfa6a/chevron.png)

如果希望同时变更多个Actor的属性，绑定多个Actor会十分实用，例如调整某个区域的所有光源时。

![multiple binding lights](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04fbb68b-adb6-45ea-87a9-837043e55938/multilightsexample.gif)

你还可以在过场动画中的多个角色之间共享数据，然后控制其在运行时期间的可见性，使条件角色或Object在播放场景时可见。

![conditional characters multiple bindings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c98a8440-5254-4d0a-afca-e9c9796f6c76/multiactorexample.png)

要将多个Actor绑定到同一轨道，从视口选择所需的Actor，右键点击当前存在的Object绑定轨道，然后选择 **指定Actor > 添加选定项**。

![create multiple bindings sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d29d739-4963-49d7-992b-6a528f950caa/multibind.gif)

你可以将不同类的Actor绑定在一起，但只能访问首个绑定Actor的组件。不过，[**变换**](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#transformtrack)等共享属性仍能正常运行。

## 访问组件

通常，Actor只有一个组件，添加轨道到Actor时过滤掉该组件的最常用属性。添加组件轨道并添加来自该组件的属性后，你可以访问Actor属性的全部范围。

点击Object绑定轨道上的 **轨道(+)** 下拉列表，并从 **组件** 类别中选择组件，即可完成此操作。然后，点击组件轨道上的 **轨道(+)** 下拉列表来查看所有可用的组件属性。

![sequencer component properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6ddb326-3300-437c-bbbf-5b6bae4716cf/components.png)

Actor蓝图或拥有多个组件的蓝图也可以以相同的方式访问其组件。在此示例中，Actor蓝图包含 **骨骼网格体组件**、**点光源组件** 和 **摄像机组件**。点击 **轨道(+)** 下拉列表时，可在 **组件** 类别中访问这些组件及其子组件。

![blueprint actor sequencer components](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20a4761e-4cfc-4972-ac2b-ba8af8023b53/components2.png)

## 自动轨道创建

向Sequencer添加某些Actor时，你可能会注意到轨道是自动创建的。例如：

-   **[静态网格体Actor](/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine)** 将自动创建一条[**变换轨道**](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#transformtrack)。
    
    ![static mesh sequencer auto track](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eda7f11d-c2b0-41ee-9970-dd2e9c0a306c/staticmesh.png)
    
-   **[骨骼网格体Actor](/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine)** 将自动创建一条 [**变换轨道**](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#transformtrack) 和一条 **[动画轨道](/documentation/zh-cn/unreal-engine/cinematic-animation-track-in-unreal-engine)**。
    
    ![skeletal mesh sequencer auto track](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d17c3da0-ac4b-4e88-99e1-255b0f043802/skellymesh.png)
    
-   **[电影摄像机Actor](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)** 将自动创建一条 [**变换轨道**](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#transformtrack) 和一个 **摄像机组件**（带 **光圈**、**焦距** 和 **对焦距离** 属性轨道）。
    
    ![camera actor sequencer auto track](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5355aee5-a965-4fd8-aae6-c81225c22094/cinecamera.png)
    
-   **[光源Actor](/documentation/zh-cn/unreal-engine/light-types-and-their-mobility-in-unreal-engine)** 将自动创建 **光源组件**，带 **强度** 和 **光源颜色** 属性轨道。
    
    ![lights sequencer auto track](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22a374a0-6382-4a44-ab89-67ccca456427/light.png)
    

出现这种情况的原因是[**Sequencer插件项目设置**](/documentation/zh-cn/unreal-engine/cinematic-editor-and-project-settings-in-unreal-engine#%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)中的 **轨道设置**。可以打开 **项目设置** 窗口，并找到 **插件** 类别中的 **关卡Sequencer** 来查找这些设置。

![sequencer track settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6fcb84e-8c16-4c12-afad-0e62c016b257/projectsettings.png)

默认情况下，使用前面提到的轨道设置来填充 **轨道设置** 数组。你可以点击 **添加 (+)** 按钮来添加一个新的数组项目，每个数组拥有以下类别：

![add track setting](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c7b842e-9d42-4dd1-9c72-7f289e74a53b/tracksettingsadd.png)

名称

说明

**匹配Actor类**

你可以在此指定Actor类，以在将其添加到Sequencer时自动为其创建轨道。

![matching actor class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f933ed4c-338e-42c6-bb09-369c82f46f20/matchingclass.png)

**默认轨道**

此数组用于指定将 **匹配Actor类** 添加到Sequencer时添加的轨道。点击 **添加(+)** 按钮，然后点击下拉菜单浏览 **Sequencer** 轨道类型。

![default tracks](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/812c8b60-72a3-4e92-809e-4fd1267e229a/defaulttracks.png)

**排除默认轨道**

此数组用于指定不希望添加到此Actor类的轨道。如果指定其他轨道进行添加，如当你的类从父类继承时（该父类也在此指定了默认轨道），则可能需要使用此选项。

**默认属性轨道**

此数组用于指定将Actor添加到Sequencer时添加的属性轨道。点击 **添加(+)** 按钮将新属性项添加到数组中。

![default property tracks](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/496c6db1-e461-4b2c-a8d0-5b988fd876e3/propertytracks.png)

-   **组件路径** 用于指定要从中添加属性的Actor的组件。
-   **属性路径** 用于指定要自动添加的属性名称。

**排除默认属性轨道**

此数组用于指定不希望添加到此Actor类的属性轨道。如果指定其他轨道进行添加，如当你的类从父类继承时（该父类也在此指定了默认属性轨道），则可能需要使用此选项。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [准备工作](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine#%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)
-   [创建](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine#%E5%88%9B%E5%BB%BA)
-   [绑定](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine#%E7%BB%91%E5%AE%9A)
-   [多重绑定](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine#%E5%A4%9A%E9%87%8D%E7%BB%91%E5%AE%9A)
-   [访问组件](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine#%E8%AE%BF%E9%97%AE%E7%BB%84%E4%BB%B6)
-   [自动轨道创建](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine#%E8%87%AA%E5%8A%A8%E8%BD%A8%E9%81%93%E5%88%9B%E5%BB%BA)