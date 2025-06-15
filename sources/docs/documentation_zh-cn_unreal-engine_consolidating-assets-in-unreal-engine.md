# 虚幻引擎资产合并 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/consolidating-assets-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:57:55.949Z

---

目录

![替换引用工具](https://dev.epicgames.com/community/api/documentation/image/e2e0419c-a274-46f9-8860-c50345750cdf?resizing_type=fill&width=1920&height=335)

**替换引用工具（Replace References Tool）** 在编辑器中提供了一种将多个资产合并成单个资产的简单方法。例如，想象一下，某张纹理在开发过程中复制了多次，导致重复保存纹理，造成资产浪费。替换引用工具允许用户根据需要选择所有这类纹理，并让它们都指向同一个纹理实例。

尽管通过重新导入源资产能极大减少这种问题，但如果尝试添加相同文件两次（相同的名称和路径），当多人同时开发游戏时，仍会发生这类问题。

## 使用替换引用工具

虽然资产合并使用起来相当简单，但必须谨慎操作才能正确利用。

### 调用替换引用工具

若要访问该工具，只需在 **内容浏览器（Content Browser）** 中选择至少一项你希望在合并过程中使用的资产。然后，**单击右键** 并在出现的上下文菜单中，单击"**替换引用（Replace References）**"。替换引用（Replace References）对话框随即出现，其中填充了在召唤该工具时选择的所有资产。你可以通过将其他资产从 **内容浏览器（Content Browser）** 拖至该对话框的主要部分来添加它们。

合并通常仅限于选择同一类型的对象，但对纹理和材质则存在一些例外。如果没有看到替换引用（Replace References）选项或者不允许拖放操作，那么你应确保你只选择了同一类型的资产！如果你不小心添加了不希望添加的资产，你可以通过选择它并按下键盘上的 **删除（Delete）** 键来将其从对话框中删除。

![Consolidate1.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f13ce47a-858d-4236-a4c4-72f2945ea173/consolidate1.png)

这里有一个被复制了多次的纹理！选择所有副本并 **单击右键** 将提供替换引用（Replace References）选项。

### 合并资产

当你在对话框中填充了想要在合并过程中使用的所有资产后，选择其中一个资产作为"目标合并资产"，然后单击 **合并资产（Consolidate Assets）**。对列表中没有选择的资产的所有引用将被替换为对你所选择的资产的引用，同时将在流程中删除所有未选择的资产。

合并资产（Consolidate Assets）按钮将显示为灰色（且不可用），直至对话框中出现了至少两个资产且其中至少一个资产已被选中。

![Consolidate2.PNG](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1da864e-4822-4f72-a698-6ad1e5005bbc/consolidate2.png)

在替换引用（Replace References）对话框中，选择一个资产会将其标记为"目标合并资产"。

![Consolidate2.1.PNG](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c39459a8-d0a2-4d8a-8a9f-6415729461c7/consolidate2-1.png)

单击合并资产（Consolidate Assets）后，删除资产（Delete Assets）对话框随即出现，该对话框允许你删除不再引用因而不再需要的资产。单击 **删除（Delete）**。

![Consolidate3.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c79990b-ec93-4ace-b316-bc6a3307885d/consolidate3.png)

所有重复项都已合并到选定资产中！

### 保存已更改的包文件

合并对话框左下角有一个选项，可保存已更新的包文件（dirtied package）。如果选中此选项，将在合并操作完成时提示你保存流程所更新的任何UAsset。这种方法很方便，可以确保受合并影响的所有UAsset都正确保存，而不必你亲自在 **内容浏览器（Content Browser）** 中查找。如果由于某种原因合并失败或发生错误，UAsset将不会进行保存，你将收到相应的警告。

## 替换引用工具的工作方式

合并过程分为多个步骤。首先，对于要合并的任何有效对象，该工具尝试在已加载的且位于内存中的对象/UAsset中将这些对象的所有引用替换为"目标合并对象"的引用。这意味着，如果你已经打开了一个图或UAsset，而它引用了其中一个要合并的对象，该工具将尝试立即更新它。接下来，该工具将尝试直接删除要合并的对象（可能会失败，请参阅[**限制和警告**](/documentation/zh-cn/unreal-engine/consolidating-assets-in-unreal-engine#%E9%99%90%E5%88%B6%E5%92%8C%E8%AD%A6%E5%91%8A)）。最后，如果删除成功，该工具将 **对象重定向器** 保留在被删除对象的位置。它们会将包含对已删除对象之引用的卸载UAsset重定向到目标合并对象。

### 最佳实践

-   考虑到替换引用工具执行的性质，该工具使用不当可能会极其危险。该工具的用户应始终仔细考虑他们将要执行的任务，并决定由此产生的操作在他们资产的环境中是否有意义。虽然该工具会尝试防止一些明显错误的合并，但用户仍然应始终保持谨慎，以避免毁坏UAsset。请记住，该工具将删除已合并的资产，并将之前对它们的使用路由到选定对象；它不是执行"替换Actor"型操作的替代方法。
    
-   虽然替换引用工具将尝试在当前加载的且位于内存中的UAsset/图中强行替换对要合并的对象的引用，但最好的方法是在使用该工具时尽可能少地引用要合并的对象，从而最大限度地提高成功合并的可能性。特别是，让子编辑器（例如蓝图编辑器或静态网格体编辑器）打开并利用即将合并的资产是极不明智之举。
    
-   替换引用工具大量使用 **对象重定向器**，这意味着，在使用替换引用工具之后，偶尔使用"修复重定向命令"（Fixup Redirects Commandlet）是一种务实的策略。
    

## 限制和警告

虽然替换引用工具很有帮助，但它也有一些限制和注意事项，如下所述：

-   为了防止用户不慎毁坏他们的工作，替换引用工具只能针对同一类/类型的资产调用，但当所有对象都是一种材质或纹理类型时除外（这意味着，某个材质可以合并到一个贴花材质，即使它们严格意义上不是同一类型）。这一限制是为了防止可能导致崩溃的合并，例如将某个材质合并到一个静态网格体。即使在允许跨类型合并的地方，该工具也会给出一条清晰可见的警告，说明已经选择了多个类型进行合并。
    
-   替换引用工具并非总是能合并用户选择的资产。如果用户选择的"目标合并资产"包含对其中一个要合并的资产的引用，则不会合并该要合并的特定资产。允许这样的操作将使"目标合并资产"引用自身，而这必定会带来问题。在合并操作结束时，用户会收到有关跳过了其中哪些资产的合并（如有）的警告。
    
-   如果不能清除某个其他有效资产的所有引用，或者由于某种原因无法删除它，那么替换引用工具有时可能无法对它进行合并。这种类型的失败非常严重，会导致"部分合并"，在这种情况下，资产的一些使用已经合并，而另一些使用则没有合并。这种类型的失败应该非常少见，但是如果出现这种情况，用户会收到警告，出现的对话框中将显示受影响的资产和潜在受影响的UAsset。用户 **不** 应保存任何受影响的UAsset，否则它们将接受一个可能导致灾难性后果的部分合并。
    
-   正如在[**最佳实践（Best Practices）**](/documentation/zh-cn/unreal-engine/consolidating-assets-in-unreal-engine#%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)中提到的，当各种子编辑器（例如Persona或蓝图编辑器）中使用潜在受影响的资产时，使用替换引用工具是极其不明智的。最后，到目前为止，大多数的子编辑器对从它们下面交换引用并没有很好的响应，所以在合并时使用子编辑器可能会导致子编辑器进入无效状态且/或可能崩溃。
    
-   替换引用工具仅在操作时已加载的UAsset中替换对合并的对象的引用。它依赖于 **对象重定向器** 来修复卸载UAsset中的剩余引用。这意味着，除非特别需要，否则应注意不要执行践踏、覆盖、删除重定向器等操作。否则，一些UAsset将获得正确修复，而另一些UAsset则不会。如前所述，使用"修复重定向命令"（Fixup Redirects Commandlet）可以缓解这一问题。
    
-   目前，一旦成功执行合并操作，建议先保存相关UAsset，然后再尝试将还引用了其中一个合并的对象的任何已卸载UAsset加载到内存中。如果先加载引用的UAsset然后再进行保存，那么当前未解决的内容浏览器/对象重定向器"错误"会导致合并的资产在浏览器中重新出现。
    

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用替换引用工具](/documentation/zh-cn/unreal-engine/consolidating-assets-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%9B%BF%E6%8D%A2%E5%BC%95%E7%94%A8%E5%B7%A5%E5%85%B7)
-   [调用替换引用工具](/documentation/zh-cn/unreal-engine/consolidating-assets-in-unreal-engine#%E8%B0%83%E7%94%A8%E6%9B%BF%E6%8D%A2%E5%BC%95%E7%94%A8%E5%B7%A5%E5%85%B7)
-   [合并资产](/documentation/zh-cn/unreal-engine/consolidating-assets-in-unreal-engine#%E5%90%88%E5%B9%B6%E8%B5%84%E4%BA%A7)
-   [保存已更改的包文件](/documentation/zh-cn/unreal-engine/consolidating-assets-in-unreal-engine#%E4%BF%9D%E5%AD%98%E5%B7%B2%E6%9B%B4%E6%94%B9%E7%9A%84%E5%8C%85%E6%96%87%E4%BB%B6)
-   [替换引用工具的工作方式](/documentation/zh-cn/unreal-engine/consolidating-assets-in-unreal-engine#%E6%9B%BF%E6%8D%A2%E5%BC%95%E7%94%A8%E5%B7%A5%E5%85%B7%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%96%B9%E5%BC%8F)
-   [最佳实践](/documentation/zh-cn/unreal-engine/consolidating-assets-in-unreal-engine#%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
-   [限制和警告](/documentation/zh-cn/unreal-engine/consolidating-assets-in-unreal-engine#%E9%99%90%E5%88%B6%E5%92%8C%E8%AD%A6%E5%91%8A)