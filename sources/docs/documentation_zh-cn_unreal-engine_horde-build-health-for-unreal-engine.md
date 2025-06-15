# 面向虚幻引擎的Horde构建健康状况 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:37:45.171Z

---

目录

![Horde构建健康状况](https://dev.epicgames.com/community/api/documentation/image/75c371cc-ee9b-41dd-8ece-7344e00b3947?resizing_type=fill&width=1920&height=335)

# 构建健康状况

Epic Games拥有一个庞大的开发团队，致力于不断地推出新的产品。我们采用基于主干的开发模型，每个版本都有独立的分支，并且发布分支的提交会自动合并回主线。

维护一个稳定且健康的代码库至关重要，这有助于我们快速迭代，因此我们制定了一系列策略来提供帮助：

-   开发者在提交变更之前可以运行的本地测试套件。
-   能够通过Horde的 *预检* 系统在构建场运行预提交测试套件。
-   一个自动化的 **构建健康状况** 系统，用于识别构建错误并对错误进行分组和分类，并通过 *Slack* 尽快通知负责的开发者。

构建健康状况系统跟传统的漏洞追踪数据库很像，它会为构建失败创建 **问题** ，但它是自动化的，具备上下文感知能力，且高度依赖数据驱动，并紧密集成到Horde的作业操作面板和日志中。

该系统的效果取决于输入的数据质量，因此我们会谨慎地为所有错误注解尽可能多的上下文信息，以便系统在出现问题时能够做出明智的决策。

## 构建失败剖析

每个分支都被建模为一个线性提交序列。当构建失败时，我们会尝试找出自上次成功构建以来是哪个提交导致了问题。

我们可以通过多种启发法进判断；例如查找那些修改了某个无法编译的特定资产或源文件的提交，区分代码/内容错误以及相关更改，查找与修改的源文件名匹配的连接器符号名称等等。

此外，有时单个更改可能会导致一系列广泛的错误。例如，一个编译失败的源文件可能在MSVC、Clang和GCC上产生完全不同的错误；一个缺失的资产可能会在不同平台上导致烘焙错误等等。这些错误可能会在构建管线的不同阶段出现，我们希望能尽快发现错误，同时避免在后续阶段产生大量无关的通知。

最后，由于我们在多个分支上进行开发，并频繁地在这些分支之间进行合并操作，所以我们希望将不同分支流中的错误进行汇总，并追溯到被认定为导致问题的原始提交。

## 问题、区间与指纹

Horde会为每个检测到的构建失败创建一个构建健康状况 **问题** 。

每个问题包含多个 **区间** ，每个区间对应观察到问题的一个分支流，每个区间会标识出最后一次成功构建和第一次失败构建的提交。当相关错误在某个分支流中不再出现时，对应的区间就会被标记为已解决；当问题的所有区间都被解决时，问题本身也会被标记为已解决。

构建错误会通过其 **指纹信息** 被摄取并关联到相应的区间上。指纹提供对错误的程序化描述，以及应如何与其他错误进行匹配。

### 指纹的内容

指纹包含以下数据（请参阅 `IIssueFingerprint.cs` ）：

-   **Type** ：一个用于标识问题类型的字符串。指纹只会与同类型的其他指纹匹配。最常遇到的问题类型之一是 `Compile` ，表示一个或多个源文件中存在编译错误。
-   **SummaryTemplate** ：一个字符串，用于在Horde操作面板和通知中填充问题的描述。可能包含占位符字符串，当指纹合并在一起时，这些占位符字符串将被展开（请参阅[摘要模板](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E6%91%98%E8%A6%81%E6%A8%A1%E6%9D%BF)）。
-   **Keys** ：用于对指纹进行匹配和分组的标识数据片段，例如与错误相关的文件名。每个键都有名称和类型。
-   **RejectKey** ：此指纹 *不* 应与之匹配的键组。
-   **Metadata** ：任意键/值数据，可以聚合用于摘要模板和调试。
-   **ChangeFilter** ：一组用分号隔开的通配符，用于指定可被认为是导致此错误的文件，例如对于C++源文件，可以是 `*.c;*.cpp;*.h;*.hpp*` 。

### 指纹的匹配与合并

指纹的匹配逻辑在 `IIssueFingerprint.cs` 中实现。其流程如下：

-   为构建步骤中的每个错误或警告生成一个指纹。
-   将每个指纹与同一分支流中未解决的区间的指纹进行比较。如果满足以下条件，则新指纹会被视为与现有指纹匹配：
    1.  类型相同
    2.  摘要模板相同
    3.  新指纹与现有指纹至少有一个共同的键，或者两个指纹都没有键。
    4.  新指纹不包含 *rejectKeys* 中列出的键。
-   所有未与现有区间匹配的指纹会被分组在一起，并添加到新的区间中。这些指纹使用一组更宽松的条件进行分组：
    1.  类型相同
    2.  两个指纹都没有对方拒绝键中所包含的键。
-   对于新区间，我们会找出可疑提交的列表，沿着该提交的合并历史记录追溯到其原始分支流。如果问题中有一个匹配的指纹、共享一个可疑提交，并且在当前分支流中还没有对应的区间，我们就会将其添加到该问题中。否则，将创建一个新问题。

### 创建指纹

可以通过两种方式为错误创建指纹：

-   在生成指纹信息时，将指纹信息直接包含在[结构化日志事件](/documentation/zh-cn/unreal-engine/horde-structured-logging-for-unreal-engine)中。
-   当构建步骤完成后，在Horde服务器中对[结构化日志事件](/documentation/zh-cn/unreal-engine/horde-structured-logging-for-unreal-engine)进行后处理。

优先选择直接在结构化日志事件中包含指纹，因为这样更具可扩展性，并且在添加细粒度上下文信息方面能提供最大程度的控制。

#### 向错误添加指纹(C#)

`EpicGames.Horde` 库包含了一些扩展方法，用于创建将指纹元数据附加到日志事件的作用域，这些方法使用标准的.NET `ILogger` 接口。此接口通过 `CommandUtils.Logger` 属性向 `AutomationTool` 命令公开。

可以按照以下示例添加指纹：

```c_sharp
IssueFingerprint fingerprint = new IssueFingerprint("Compile", "Compile {Severity} in {Files}", IssueChangeFilter.Code);
fingerprint.Keys.Add(IssueKey.FromFile("Foo.cpp"));

using (IDisposable scope = Logger.BeginIssueScope(fingerprint))
{
    Logger.LogError("Compile errors in {File}", new FileReference("Foo.cpp"));
}
```

#### 通过后处理添加指纹

后处理由 `EpicGames.Horde` 项目中的 `IssueHandler` 派生类处理。

服务器通过搜索带有 `[IssueHandler]` 属性的类来枚举处理程序。每个包含待处理事件的构建步骤都会为每个处理程序创建一个新实例。

日志事件按照 `IssueHandler.Priorty` 值的降序传递给 `IssueHandler.HandleEvent` ，直到找到返回 `true` 的处理程序。所有事件处理完毕后， `IssueHandler.GetIssues` 将返回匹配的日志事件及其指纹的列表。

请注意，处理程序并非必须为日志事件生成指纹；对于更具体的错误（例如编译错误），屏蔽掉更模糊的错误（例如UnrealBuildTool返回失败退出代码）可能很有用。因此，对于那些想要从剩余处理程序管线中排除的错误， `HandleEvent` 可以返回true。

### 摘要模板

以下占位符变量可用于摘要模板：

-   `{Severity}` ：根据分组到该问题中的诊断的最高严重程度，扩展为字符串 'Warnings'或'Errors'。
-   `{Files}` ：从类型为 `File` 的键扩展为文件名列表。最多包含3个文件。
-   `{Meta:Key}` ：扩展为与 `Key` 关联的元数据值列表。

## 工作流程

工作流程定义了开发者如何收到以及在何处收到有关构建健康状况的通知。

工作流程通过流配置文件中的[`Workflows`](/documentation/zh-cn/unreal-engine/horde-schema-for-unreal-engine#streams)属性进行配置，作业通过作业模板的[`WorkflowId`](/documentation/zh-cn/unreal-engine/horde-schema-for-unreal-engine#templaterefconfig)属性配置为使用作业。

作业中的各个节点可以通过在BuildGraph脚本中使用[注解](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E6%B3%A8%E8%A7%A3)，配置为使用工作流程。

### 通知

Horde支持通过[Slack](https://www.slack.com)发送问题通知。默认情况下，系统会为每个识别出的问题创建一个Slack线程，并且会@提醒那些疑似导致该问题的开发者，引起他们的注意。

通过交互式界面，开发者可以在Slack中确认或拒绝问题，无需转到Horde操作面板。

通过流配置文件配置Slack通道和用户时，大多数参数需要提供Slack通道和用户ID，而不是它们的名称。

### 报告

工作流程可以配置为按定义的时间间隔发送摘要报告，显示未解决问题的列表、相关线程的链接以及流健康状况的统计信息。

报告的发送可以通过工作流程配置中的 `reportTimes` 和`reportChannel` 属性进行设置。

### 注解

可以使用 **节点属性** 进一步配置对各个作业步骤问题的处理。可以通过BuildGraph脚本中 `Node` 元素上的 `Annotations` 属性为节点指定属性：

```xml
<Node Name="Compile UnrealEditor Win64" Annotations="Workflow=my-workflow;BuildBlocker=true">
```

受支持的注解集在 `NodeAnnotations.cs` 源文件中定义。目前，可用注解如下：

-   `Workflow` ：用于对来自该节点的问题进行分类的工作流程
-   `CreateIssues` ：当设置为 `false` 时，允许禁用为该节点创建问题。
-   `AutoAssign` ：是否自动分配只能由一个用户导致的问题，或者与修改的文件有明确关联的问题。
-   `AutoAssignToUser` ：将此步骤中的问题自动分配给由提供参数所指定的Perforce用户。
-   `NotifySubmitters` ：是否通知在构建从成功转变为失败期间的所有提交者，允许他们主动站出来对问题承担责任。
-   `IssueGroup` ：指定一个后缀，将该后缀附加到从该节点创建的问题的 `type` 属性，防止该问题与其他问题合并。
-   `BuildBlocker` ：该节点中的失败是否应被视为构建阻碍。被识别为构建阻碍的问题在Slack通知中有一个特殊标记。

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [构建健康状况](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E6%9E%84%E5%BB%BA%E5%81%A5%E5%BA%B7%E7%8A%B6%E5%86%B5)
-   [构建失败剖析](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E6%9E%84%E5%BB%BA%E5%A4%B1%E8%B4%A5%E5%89%96%E6%9E%90)
-   [问题、区间与指纹](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E9%97%AE%E9%A2%98%E3%80%81%E5%8C%BA%E9%97%B4%E4%B8%8E%E6%8C%87%E7%BA%B9)
-   [指纹的内容](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E6%8C%87%E7%BA%B9%E7%9A%84%E5%86%85%E5%AE%B9)
-   [指纹的匹配与合并](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E6%8C%87%E7%BA%B9%E7%9A%84%E5%8C%B9%E9%85%8D%E4%B8%8E%E5%90%88%E5%B9%B6)
-   [创建指纹](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E5%88%9B%E5%BB%BA%E6%8C%87%E7%BA%B9)
-   [向错误添加指纹(C#)](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E5%90%91%E9%94%99%E8%AF%AF%E6%B7%BB%E5%8A%A0%E6%8C%87%E7%BA%B9\(c#\))
-   [通过后处理添加指纹](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E9%80%9A%E8%BF%87%E5%90%8E%E5%A4%84%E7%90%86%E6%B7%BB%E5%8A%A0%E6%8C%87%E7%BA%B9)
-   [摘要模板](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E6%91%98%E8%A6%81%E6%A8%A1%E6%9D%BF)
-   [工作流程](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [通知](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E9%80%9A%E7%9F%A5)
-   [报告](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E6%8A%A5%E5%91%8A)
-   [注解](/documentation/zh-cn/unreal-engine/horde-build-health-for-unreal-engine#%E6%B3%A8%E8%A7%A3)