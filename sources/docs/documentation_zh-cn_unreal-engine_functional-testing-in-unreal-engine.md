# 虚幻引擎功能测试 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/functional-testing-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:40:41.320Z

---

目录

![功能测试](https://dev.epicgames.com/community/api/documentation/image/bc296484-a0ed-4f50-a1b1-7d24aa859622?resizing_type=fill&width=1920&height=335)

## 创建测试

通过在关卡中放置 [**函数测试**](/documentation/en-us/unreal-engine/API/Developer/FunctionalTesting/AFunctionalTest) **Actor** 来完成测试设置。然后，可以对该Actor编写脚本，以在[关卡蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-editor-user-interface-for-level-blueprints-in-unreal-engine)中通过 **关卡脚本** 运行一组测试。该测试本身可以构建到函数测试本身当中（作为一个子代码类或蓝图），或者直接组装到 **关卡脚本** 中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e025af0f-5ca4-40d2-863f-44d91b8fd8eb/functionaltest_levelbp.png)

运行占位符函数测试的关卡蓝图。

### 函数测试类功能

函数测试类提供以下重要的函数：

函数名称

描述

`PrepareTest`

`PrepareTest` 函数可以在代码或蓝图子类中被覆盖。该函数和`OnTestPrepare`代理一起第一个运行，并可以被覆盖以执行测试所需的初始设置。如果该设置需要多个帧，例如，如果该设置需要在关卡中加载流送数据、构建通路数据或连接到服务器，则该函数应该开始这些过程。

`IsReady`

该函数在初始`PrepareTest`调用后的每一个tick上调用，并继续调用直到运行`OnTestStart`为止。在默认情况下，该函数返回`true`，这样允许立即调用`OnTestStarted`。如果`PrepareTest`启动的初始化过程未完成，则该函数应返回`false`以防止主测试代码提前开始运行。

`OnTestStart`

当 **函数测试管理器** 开始测试时，系统会调用该代理。将该函数与您的测试功能绑定，并确保最后调用`FinishTest`。

`OnTestFinished`

测试完成后，将会调用该代理。由于测试通常会影响关卡或关卡中的Actor，继而导致影响后续测试，因此利用这个机会进行清理对于维护可以使用的测试环境而言非常重要。

函数测试类还提供以下支持功能：

函数或属性名称

描述

`OnAdditionalTestFinishedMessageRequest`

实现`OnAdditionalTestFinishedMessageRequest`是在测试摘要中记录附加信息的有用方法。

`RegisterAutoDestroyActor`

传递到该函数的Actor会在测试结束时被自动销毁。这是清理作为测试的一部分所产生的Actor的好方法。

`LogMessage`

该函数将您提供给`LogFunctionalTest`类别的文本记录到 **输出日志** 中。这是测试运行期间用于记录进度的方法。

观察点

如果为该属性指定了Actor，玩家将在测试开始时瞬移到其位置并使用其旋转设置。

已启用

该变量可以设置为`false`以禁用测试。

### 通过关卡脚本进行测试

要在关卡脚本中运行函数测试，首先在关卡中放置函数测试Actor。选中函数测试后，打开关卡脚本并放置`OnTestStart`代理和对函数测试的引用。通过从函数测试引脚拖出引线，可以创建一个或多个`FinishTest`节点。此时，您可以构建测试，以让它将`OnTestStart`代理连接到`FinishTest`节点（如果测试包含分支，则连接到多个节点）。如果测试完成任何需要清理的操作，您还可以创建`OnTestFinished`函数。该设置完成后，自动化系统将能够正确运行该测试。该方法适用于简单测试，即通常是不太需要设置，并且无需多次运行或在多个关卡上运行的测试。

如果要在关卡脚本中添加对Actor（如函数测试Actor）的事件或引用，则必须在 **关卡编辑器** 或 **世界大纲视图** 中选中所提及的Actor。

### 通过子类方法进行测试

如果函数测试需要更复杂的设置，或者计划运行多次（在一个关卡中或者在多个关卡上），建议使用覆盖`AFunctionalTest`的方法。通过在代码中或通过蓝图扩展基本函数测试类，能够使用`PrepareTest`和`IsReady`函数，对于运行更复杂或相互依赖的测试或者设置时间超过一帧的测试而言，这两个函数非常重要。通过关卡脚本实现这些测试与之前一样，但现在可以在新的函数测试类本身（而不是关卡脚本）中包含大量测试代码，这样更便于在多个关卡中使用测试，或者在同一个关卡中多次使用。

## 创建和使用预期的测试结果

某些测试的结果内容多、复杂、精细或者不适合手动编写的解决方案。在此类情况下，运行单一测试通常很有用，单独验证结果是否正确，然后保存这些结果以与将来测试的结果进行对比。这个概念作为 **真相数据（Ground Truth Data）** 在 **函数测试编辑器** 插件中进行了实现。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf1a3a7d-a72b-4fd4-9bb4-419f091e995b/functionaltest_plugin.png)

使用"真相数据"要求启用函数测试编辑器插件。

**真相数据（Ground Truth Data）** 通过`UGroundTruthData`类实现，用于存储和比较这些结果。真相数据对象将您选择的对象作为所执行测试的"正确"结果进行存储。然后，可以按照您所需的方式比较该对象和实时模拟中的对应对象，然后您所用的逻辑将确定这种构成是否能通过测试。例如，如果您的游戏需要精准可靠的物理模拟，如高尔夫球游戏，可以建立一个模拟玩家一杆进洞的测试。真相数据可以包含高尔夫球作为对象，您可以比较实时模拟高尔夫球的位置与所保存的高尔夫球位置（假设已经进洞），以便仅允许出现极小的偏差且不会测试失败。可以按照如下所示设计这样的测试：

-   在特定位置以初始速度产生一个"测试"高尔夫球。为其指定一个固定的出球时间。此时，该高尔夫球应该位于理想位置。您现在可以尝试从真相数据加载该测试的"正确"高尔夫球。
-   如果真相数据没有返回可接受的对象（例如，返回的对象为空或错误类），则将我们创建的测试高尔夫球保存到真相数据以作为预期结果。如果最后高尔夫球没有到达应该到达的位置，始终可以在蓝图编辑器中，手动将真相数据的`ResetGroundTruth`变量设置为`false`来重设真相数据。

在蓝图编辑器中选中`ResetGroundTruth`框后，它会自动取消选中，但您的数据将会重设。

-   如果真相数据确实返回了可以投射到所需类的对象（在该示例中，Actor足够满足需要），则将比较该对象和测试高尔夫球来评估测试是否应该通过。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5bcdd333-e577-427a-a54a-709698b37296/groundtruthexample.png)

该测试检查为其指定了四秒出球时间的"测试高尔夫球"的位置是否一致。

以这种方式设置的测试可以用相同脚本运行测试并设置预期结果。预期结果可以通过在编辑器中编辑真相数据进行重设。

-   [testing](https://dev.epicgames.com/community/search?query=testing)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [automation](https://dev.epicgames.com/community/search?query=automation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建测试](/documentation/zh-cn/unreal-engine/functional-testing-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%B5%8B%E8%AF%95)
-   [函数测试类功能](/documentation/zh-cn/unreal-engine/functional-testing-in-unreal-engine#%E5%87%BD%E6%95%B0%E6%B5%8B%E8%AF%95%E7%B1%BB%E5%8A%9F%E8%83%BD)
-   [通过关卡脚本进行测试](/documentation/zh-cn/unreal-engine/functional-testing-in-unreal-engine#%E9%80%9A%E8%BF%87%E5%85%B3%E5%8D%A1%E8%84%9A%E6%9C%AC%E8%BF%9B%E8%A1%8C%E6%B5%8B%E8%AF%95)
-   [通过子类方法进行测试](/documentation/zh-cn/unreal-engine/functional-testing-in-unreal-engine#%E9%80%9A%E8%BF%87%E5%AD%90%E7%B1%BB%E6%96%B9%E6%B3%95%E8%BF%9B%E8%A1%8C%E6%B5%8B%E8%AF%95)
-   [创建和使用预期的测试结果](/documentation/zh-cn/unreal-engine/functional-testing-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E4%BD%BF%E7%94%A8%E9%A2%84%E6%9C%9F%E7%9A%84%E6%B5%8B%E8%AF%95%E7%BB%93%E6%9E%9C)