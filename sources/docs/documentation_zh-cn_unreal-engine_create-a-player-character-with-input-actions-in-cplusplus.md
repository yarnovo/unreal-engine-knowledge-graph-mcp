# Create a Player Character With Input Actions in C++ | Unreal Engine 5.6 Documentation | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus
> 
> 生成时间: 2025-06-14T18:49:50.492Z

---

目录

## 开始之前

请确保已完成上一节 [设置并编译项目](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine)中的目标：

-   创建了一个基于第一人称模板的项目，项目中需包含自定义的游戏模式C++类。
    
-   验证了项目是否使用了增强输入系统。
    

## 设置新角色

你之前创建了一个带有自定义游戏模式的新C++项目。 现在，你需要添加一个新的角色类，将其扩展为蓝图，并将其设为游戏模式中的默认玩家Pawn。

### 创建C++角色类

可放入关卡中的对象都是Actor资产。 Pawn是可以由玩家或AI控制的Actor，而角色是一类特殊的Pawn，可充当玩家角色。 如需详细了解这些Actor类，请参阅虚幻引擎游戏框架文档中的[Actor](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/actors-in-unreal-engine)、[Pawn](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/pawn-in-unreal-engine)和角色类的信息。

要创建新角色类并为项目添加C++角色，请执行以下步骤：

1.  打开主编辑器菜单，转到**工具（Tool）** > **新建C++类（New C++ Class）**。
    
2.  转到**选择父类（Choose Parent Class）**窗口，找到并选择**角色（Character）**，然后点击**下一步（Next）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/0fbd9534-7a03-4c1f-8c0a-19185d20ad04?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/0fbd9534-7a03-4c1f-8c0a-19185d20ad04?resizing_type=fit)
    
3.  输入新类的名称（本教程使用`AdventureCharacter`），然后点击**创建类（Create Class）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/9996efb6-9f3e-4fea-a0ed-f7dbb53fd295?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9996efb6-9f3e-4fea-a0ed-f7dbb53fd295?resizing_type=fit)
    
4.  虚幻引擎会自动在Visual Studio（VS）中打开新类的文件。 切换回VS以找到你的新文件。
    
    如果VS没有自动提示你刷新项目，请回到虚幻编辑器，转到 **工具（Tools）**  >  **刷新Visual Studio（Refresh Visual Studio）**。
    

### 将C++角色扩展到蓝图

就像你对游戏模式所做的那样，转到**内容浏览器（Content Browser）**，右键点击你的**角色（Character）**类，选择**基于*<角色名>*创建蓝图类（Create Blueprint class based on <CharacterName>）**，为`Blueprints`文件夹中的角色创建蓝图。

[![](https://dev.epicgames.com/community/api/documentation/image/59dda234-4b97-43b2-be05-056d3c4a40b7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/59dda234-4b97-43b2-be05-056d3c4a40b7?resizing_type=fit)

### 更改默认玩家角色

要在游戏中使用你的新角色，请将其设为项目的游戏模式中使用的默认Pawn类（Default Pawn Class）。

要将你的角色设置为默认玩家角色，请执行以下步骤：

1.  如果你的游戏模式蓝图还未被打开，请转到**内容浏览器（Content Browser）**，双击你的蓝图，从而在**蓝图编辑器（Blueprint Editor）**中将其打开。
    

1.  转到该蓝图的**细节（Details）**面板，展开**类（Classes）**。 你可以在这里设置游戏模式所用的默认类。
    
2.  将**默认Pawn类（Default Pawn Class）**设为你的角色蓝图（即`BP_AdventureCharacter`）。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/874bccb9-e6f5-4033-9b49-ecee3bd72f60?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/874bccb9-e6f5-4033-9b49-ecee3bd72f60?resizing_type=fit)
    
    如果你的蓝图不在列表中，请返回内容浏览器，选择你的角色蓝图，然后在游戏模式蓝图中，点击**默认Pawn类（Default Pawn Class）**旁边的**使用内容浏览器中所选资产（Use Selected Asset in Content Browser）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/eb5da8d8-87bc-434d-b3a5-abfe4233e600?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/eb5da8d8-87bc-434d-b3a5-abfe4233e600?resizing_type=fit)
    
3.  点击窗口左上角的**保存**按钮以保存游戏模式蓝图，然后点击**编译（Compile）**，或在VS中重新编译。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/4f720571-e777-49ff-ad34-6d80ee918ee2?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4f720571-e777-49ff-ad34-6d80ee918ee2?resizing_type=fit)
    

## 探索输入操作

第一人称模板中的默认角色使用一组预先存在的输入操作，这些输入操作结合了蓝图，使角色能够移动、跳跃和环顾四周。

![](https://dev.epicgames.com/community/api/documentation/image/a67fa39e-38d1-41f5-93ec-4ace4a7405d3?resizing_type=fit)

打开并探索这些输入操作，了解它们驱动角色移动的原理。

转到内容浏览器资产树，前往**Content** > **FirstPerson** > **Input** > **Actions**文件夹。 你会看到三个输入操作，名称为`IA_Jump`、`IA_Look`和`IA_Move`，分别对应了跳跃、观察和移动。

[![](https://dev.epicgames.com/community/api/documentation/image/c6578e5a-d9d8-4da9-881b-a76bb6e9b4db?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c6578e5a-d9d8-4da9-881b-a76bb6e9b4db?resizing_type=fit)

双击`IA_Jump`将其打开并查看其**细节（Details）**面板。

[![](https://dev.epicgames.com/community/api/documentation/image/05657af9-d369-4b4e-85c5-9d002e1d3be8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/05657af9-d369-4b4e-85c5-9d002e1d3be8?resizing_type=fit)

角色的输入操作使用以下属性来定义操作类型及其功能：

**属性**

**说明**

**值类型（Value Type）**

决定了此输入操作包含何种类型的值。 请根据你希望通过此输入操作捕获的移动类型，选择一种值的类型。

例如，`IA_Jump`是一种**数字（布尔）**类型，这意味着它具有开和关两种状态（跳跃或不跳跃），分别对应一个布尔值。

**Axis1D**是一个浮点值，用于捕获一维移动（向内或向外滚动）或标量调整（改变移动速度）。

**Axis2D**是一个包含两个浮点值的向量，用于捕获二维移动，例如WSAD的控制。

**Axis3D**是一个包含三个浮点值的向量，用于捕获三维移动，例如飞行或游泳的控制。

**触发器（Triggers）**

创建触发器来表示动作的可能状态，从而让你可以在蓝图或代码中使用这些触发器来编译逻辑。 当映射到`IA_Jump`的按钮被**按下**或**松开**时，相应的触发器会触发一个事件。

**修饰符（Modifiers）**

在将虚幻引擎所接收的原始输入值发送给其他输入触发器之前，修改这些原始输入值。

## 探索输入映射上下文

输入操作不能单独起作用；它们需要输入映射上下文（Input Mapping Context）才能知道应该由哪个按钮触发，以及在什么上下文中触发。 这是成组的映射，描述了触发输入操作的规则。 你可以创建并自定义多组输入映射上下文，并将其动态地开启和关闭，从而适应游戏的需求。

默认角色拥有现成的输入映射上下文，在内容浏览器中的位置是**Content** > **FirstPerson** > **Input**。 双击`IMC_Default`即可将其打开并查看其**细节（Details）**面板。

[![](https://dev.epicgames.com/community/api/documentation/image/f86de870-dfdb-4f0d-a119-460675b15a21?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f86de870-dfdb-4f0d-a119-460675b15a21?resizing_type=fit)

`IMC_Default`包含了三项**映射**，可将三项输入操作分别映射到用户的输入。 每项映射都会拉取输入操作的触发器和修饰符。

### 映射跳跃操作

展开**IA\_Jump**映射。 你会发现存在两项功能按钮绑定：**空格键（Space Bar）**和**游戏手柄正面底部按钮（Gamepad Face Button Bottom）**。 你在游戏中按下这两个按钮中的任意一个时，就会触发**IA\_Jump**。

[![](https://dev.epicgames.com/community/api/documentation/image/92af143a-af0f-481e-975e-4159c9f6b9cc?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/92af143a-af0f-481e-975e-4159c9f6b9cc?resizing_type=fit)

### 映射键盘按键的2D移动

接下来，展开**IA\_Move** 以查看其九项绑定，这些绑定分别对应WASD键、方向键以及游戏手柄左摇杆。

[![](https://dev.epicgames.com/community/api/documentation/image/eaf30dc0-6d78-466e-af5e-338292a288eb?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/eaf30dc0-6d78-466e-af5e-338292a288eb?resizing_type=fit)

与简单的布尔跳跃相比，利用数个单独的按键创建二维移动需要更多的设置。

按键输入是一维的，未按下时返回值为0，按下时返回值为1。 D键或向右键就非常适合这种原理，因为这两个按键应该让角色沿X轴的正方向移动（即向右移动）。 然而，我们还需要让角色向前、向左和向后移动。 换句话说，我们需要在X轴和Y轴上都具有0到1以及0到-1的值。

因此，为了获得在各个方向上移动的值，输入操作会使用**修饰符（Modifier）**将输入值变换到不同的轴上，或者将其变换为负值。

例如，请展开**A**键的功能按钮绑定及其**修饰符（Modifiers）**，并查看其配置方式。 你会发现存在一个**取反（Negate）**修饰符。 这意味着当按下此键时，值1.0会变为-1.0，即让角色沿X轴的负方向移动，也就是向左移动。

[![](https://dev.epicgames.com/community/api/documentation/image/e1553b32-6a72-4333-8c06-1ab03ca61d61?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e1553b32-6a72-4333-8c06-1ab03ca61d61?resizing_type=fit)

展开**取反（Negate）**修饰符后，你可以指定是否要对X、Y或Z轴的值取反。 这些轴均默认取反，但你可以按需为指定的轴限制取反操作。

[![](https://dev.epicgames.com/community/api/documentation/image/ec940143-c4a8-49cd-9234-9fa9e2145370?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ec940143-c4a8-49cd-9234-9fa9e2145370?resizing_type=fit)

现在，展开**S**键的功能按钮绑定。 为在Y轴上创建向后移动，此绑定有两个修饰符：**交换输入轴值（Swizzle Input Axis Values）**可将输入从X轴改为Y轴，以及**取反（Negate）**修饰符。

[![](https://dev.epicgames.com/community/api/documentation/image/a0a20ec7-3410-46c1-b146-da497dbcef2c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a0a20ec7-3410-46c1-b146-da497dbcef2c?resizing_type=fit)

展开**交换输入轴值（Swizzle Input Axis Values）**修饰符。 **顺序（Order）**选项指定了应如何重新排序各轴的值。 在本例中，输入操作使用的是**YXZ**，因此相比默认的XYZ顺序，X轴和Y轴互换了。

### 映射游戏手柄的2D移动

游戏手柄摇杆使用二维轴的输入，而非一维的按键输入，因此这种映射只需要一个功能按钮绑定就能处理摇杆的移动。

只要展开**游戏手柄左摇杆2D轴（Gamepad Left Thumbstick 2D-Axis）**的**修饰符（Modifiers）**，你就能看到 **盲区（Dead Zone）**和**标量（Scalar）**修饰符。

[![](https://dev.epicgames.com/community/api/documentation/image/c3bdd5d8-a39e-4035-8984-81a2745129eb?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c3bdd5d8-a39e-4035-8984-81a2745129eb?resizing_type=fit)

**盲区（Dead Zone）**可指定忽略输入的阈值上下限。 使用盲区即可过滤掉摇杆中心附近的小幅输入值，这些值通常是由于摇杆未能完全居中或因轻微手指压力而产生的无意输入。

**标量（Scalar）**可指定X、Y和Z轴值的乘数，从而让你控制角色在各个方向上的移动速度。

### 映射游戏手柄和鼠标的观察功能按钮

展开**IA\_Look**动作映射。 此输入操作被绑定到**鼠标XY 2D轴（Mouse XY 2D-Axis）**和**游戏手柄右摇杆2D轴（Gamepad Right Thumbstick 2D-Axis）**的功能按钮。

[![](https://dev.epicgames.com/community/api/documentation/image/63b64e5a-b415-4d20-98ab-bac25b3fbebe?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/63b64e5a-b415-4d20-98ab-bac25b3fbebe?resizing_type=fit)

鼠标功能按钮绑定已经使用了2D轴，因此它只需要Y轴的取反（Negate）修饰符。如此一来，向上移动鼠标会使角色向下看。 这在第一人称游戏中是传统做法，但你也可以删除此修饰符来反转视角控制。

## 下一步

在下一节中，你将了解默认角色蓝图连接玩家输入和角色移动的方式，并开始在代码中重新实现这一连接。

[

![配置角色移动](https://dev.epicgames.com/community/api/documentation/image/b4425fbc-5b34-45b1-ab14-3e51ab875a51?resizing_type=fit&width=640&height=640)

配置角色移动

学习如何使用C++绑定玩家输入与角色移动。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/configure-character-movement-with-cplusplus-in-unreal-engine)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [开始之前](/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus#%E5%BC%80%E5%A7%8B%E4%B9%8B%E5%89%8D)
-   [设置新角色](/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus#%E8%AE%BE%E7%BD%AE%E6%96%B0%E8%A7%92%E8%89%B2)
-   [创建C++角色类](/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus#%E5%88%9B%E5%BB%BAc++%E8%A7%92%E8%89%B2%E7%B1%BB)
-   [将C++角色扩展到蓝图](/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus#%E5%B0%86c++%E8%A7%92%E8%89%B2%E6%89%A9%E5%B1%95%E5%88%B0%E8%93%9D%E5%9B%BE)
-   [更改默认玩家角色](/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus#%E6%9B%B4%E6%94%B9%E9%BB%98%E8%AE%A4%E7%8E%A9%E5%AE%B6%E8%A7%92%E8%89%B2)
-   [探索输入操作](/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus#%E6%8E%A2%E7%B4%A2%E8%BE%93%E5%85%A5%E6%93%8D%E4%BD%9C)
-   [探索输入映射上下文](/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus#%E6%8E%A2%E7%B4%A2%E8%BE%93%E5%85%A5%E6%98%A0%E5%B0%84%E4%B8%8A%E4%B8%8B%E6%96%87)
-   [映射跳跃操作](/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus#%E6%98%A0%E5%B0%84%E8%B7%B3%E8%B7%83%E6%93%8D%E4%BD%9C)
-   [映射键盘按键的2D移动](/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus#%E6%98%A0%E5%B0%84%E9%94%AE%E7%9B%98%E6%8C%89%E9%94%AE%E7%9A%842d%E7%A7%BB%E5%8A%A8)
-   [映射游戏手柄的2D移动](/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus#%E6%98%A0%E5%B0%84%E6%B8%B8%E6%88%8F%E6%89%8B%E6%9F%84%E7%9A%842d%E7%A7%BB%E5%8A%A8)
-   [映射游戏手柄和鼠标的观察功能按钮](/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus#%E6%98%A0%E5%B0%84%E6%B8%B8%E6%88%8F%E6%89%8B%E6%9F%84%E5%92%8C%E9%BC%A0%E6%A0%87%E7%9A%84%E8%A7%82%E5%AF%9F%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [下一步](/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus#%E4%B8%8B%E4%B8%80%E6%AD%A5)