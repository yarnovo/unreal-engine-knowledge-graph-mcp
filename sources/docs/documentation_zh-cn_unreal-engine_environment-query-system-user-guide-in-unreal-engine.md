# 场景查询系统用户指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/environment-query-system-user-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:44:24.053Z

---

目录

![场景查询系统用户指南](https://dev.epicgames.com/community/api/documentation/image/7a92f933-e212-4d4d-a848-841ff55e2c3f?resizing_type=fill&width=1920&height=335)

本页面讲述了启用、创建和编辑场景查询系统（EQS）资源的常规工作流程。

## 启用EQS

在使用EQS之前，需要从 **编辑器首选项（Editor Preferences）** 菜单将其启用。

-   在 **编辑器首选项（Editor Preferences）> 试验性（Experimental）> AI** 部分，启用 **场景查询系统（Environmental Query System）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d141eb56-d117-4619-a62d-112267a91200/eqsug_enableeqs.png "EQSUG_EnableEQS.png")

## 创建EQS查询

创建EQS资源的方法：

1.  在 **内容浏览器** 中单击 **新增（Add New）** 按钮，然后在 **AI（Artificial Intelligence）** 下面选择 **场景查询（Environment Query）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d819d0b-9732-476c-b545-2dc45224a781/eqsug_createeqsasset.png "EQSUG_CreateEQSAsset.png")
2.  输入新EQS资源的名称。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acd44549-2629-4bd4-bedf-60201feae570/eqsug_entereqsname.png "EQSUG_EnterEQSName.png")

除场景查询外，还可以在内容浏览器中创建自定义[生成器](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine#customgenerators)和[情境](/documentation/zh-cn/unreal-engine/eqs-node-reference-contexts-in-unreal-engine#envquerycontext_blueprintbase)蓝图资源。

## 编辑EQS查询

在EQS资源中，可以使用[生成器](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine)来生成将要测试和加权的位置或Actor，提供[情境](/documentation/zh-cn/unreal-engine/eqs-node-reference-contexts-in-unreal-engine)或参考框架，并进行[测试](/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine)来决定生成器产生的哪个项目（Item）是最佳选择。下节将说明如何在EQS资源中创建它们。

添加生成器的方法：

-   在EQS图表中右键单击，然后选择需要的生成器类型。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e45340b7-6b01-48b6-ab8a-b4c7d5faf91e/eqsug_addgenerator.png "EQSUG_AddGenerator.png")
    
    添加生成器之后，拖出Root节点，把它连接到你的生成器。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf4c696d-207a-4ef3-a65e-976c5d384136/eqsug_connectgenerator.png "EQSUG_ConnectGenerator.png")
    
    虽然可以将多个生成器连接到Root，但查询中只会使用最左侧的生成器。
    

添加测试的方法：

-   右键单击生成器，并选择要添加的测试。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dad69c49-9ce3-49d3-9871-34ca419a4880/eqsug_addtest.png "EQSUG_AddTest.png")
    
    添加测试后，它将出现并连接到生成器。选择测试，在 **细节（Details）** 面板中调节其属性。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e72bc4c-361d-4fd7-9cc1-4934804b9792/eqsug_addtestdetails.png "EQSUG_AddTestDetails.png")

定义情境的方法：

-   在测试的 **细节（Details）** 面板中，将 **EnvQueryContext** 更改为需要的情境。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2d6ecd2-1749-49ce-ae74-a699bf9fc7cb/eqsug_context.png "EQSUG_Context.png")
    
    属性名称可能根据测试类型而变化。请参见[测试](/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine)了解更多信息。
    

## 预览EQS查询

可以在编辑器中预览EQS查询的结果，会以调试球体显示加权/过滤后的结果。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5451317-bccc-4748-9aa6-11d236a038bd/eqsug_preview.png "EQSUG_Preview.png")

在上图中，我们调试了一个EQS查询，它返回了能看到关卡中角色的一个位置。

欲知更多信息，请参见[AI调试](/documentation/zh-cn/unreal-engine/ai-debugging-in-unreal-engine)或[EQS测试Pawn](/documentation/zh-cn/unreal-engine/environment-query-testing-pawn-in-unreal-engine)。

## 将EQS用于行为树

创建EQS查询后，可以在[行为树](/documentation/404)中将查询作为 **任务** 的一部分来运行。

1.  在行为树中右键单击并添加 **运行EQS查询（Run EQS Query）** 任务节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7e5804a-9635-4b46-9850-3ccf1b0a1c9c/eqsug_runeqs.png "EQSUG_RunEQS.png")
2.  针对 **运行EQS查询（Run EQS Query）****\*\*，分配要执行的** 查询模板（Query Template）**（所需的EQS资源）和它应该返回的** 黑板键（Blackboard Key）\*\*。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ccbb3cb7-4b4f-415a-a992-23227455ec4c/eqsug_editeqsbt.png "EQSUG_EditEQSBT.png")
    
    返回的黑板键是权重最高的结果（对象或矢量）。在上面的示例中，我们有一个EQS查询用于定位玩家，并将该位置重新提供给一个黑板键，其名为 **MoveToLocation。** 
    
    可以通过 **查询配置（Query Config）** 选项选择性地添加要传递到EQS测试的参数。
    

## 结合原生代码使用EQS

虽然EQS查询通常是在行为树中运行，但也可以直接从原生代码使用它。以下示例展示了一个虚构的查询，要在指定区域内为角色或物品寻找安全生成地点：

```cpp
	// 以下名称必须与查询中使用的变量名一致
	static const FName SafeZoneIndexName = FName(TEXT("SafeZoneIndex"));
	static const FName SafeZoneRadiusName = FName(TEXT("SafeZoneRadius"));

	// 运行查询，根据区域索引和安全半径寻找安全的生成点
	bool AMyActor::RunPlacementQuery(const UEnvQuery* PlacementQuery)
	{
		if (PlacementQuery)
		{
			// 设置查询请求
			FEnvQueryRequest QueryRequest(PlacementQuery, this);

			// 设置查询参数
			QueryRequest.SetIntParam(SafeZoneIndexName, SafeZoneIndexValue);
			QueryRequest.SetFloatParam(SafeZoneRadiusName, SafeZoneRadius);

			// 执行查询
			QueryRequest.Execute(EEnvQueryRunMode::RandomBest25Pct, this, &AFortAthenaMutator_SpawningPolicyBase::OnEQSSpawnLocationFinished);

			// 返回true说明查询已开始
			return true;
		}

		// 返回false说明查询未能开始
		return false;
	}
```

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [eqs](https://dev.epicgames.com/community/search?query=eqs)
-   [environment query system](https://dev.epicgames.com/community/search?query=environment%20query%20system)
-   [eqs essentials](https://dev.epicgames.com/community/search?query=eqs%20essentials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用EQS](/documentation/zh-cn/unreal-engine/environment-query-system-user-guide-in-unreal-engine#%E5%90%AF%E7%94%A8eqs)
-   [创建EQS查询](/documentation/zh-cn/unreal-engine/environment-query-system-user-guide-in-unreal-engine#%E5%88%9B%E5%BB%BAeqs%E6%9F%A5%E8%AF%A2)
-   [编辑EQS查询](/documentation/zh-cn/unreal-engine/environment-query-system-user-guide-in-unreal-engine#%E7%BC%96%E8%BE%91eqs%E6%9F%A5%E8%AF%A2)
-   [预览EQS查询](/documentation/zh-cn/unreal-engine/environment-query-system-user-guide-in-unreal-engine#%E9%A2%84%E8%A7%88eqs%E6%9F%A5%E8%AF%A2)
-   [将EQS用于行为树](/documentation/zh-cn/unreal-engine/environment-query-system-user-guide-in-unreal-engine#%E5%B0%86eqs%E7%94%A8%E4%BA%8E%E8%A1%8C%E4%B8%BA%E6%A0%91)
-   [结合原生代码使用EQS](/documentation/zh-cn/unreal-engine/environment-query-system-user-guide-in-unreal-engine#%E7%BB%93%E5%90%88%E5%8E%9F%E7%94%9F%E4%BB%A3%E7%A0%81%E4%BD%BF%E7%94%A8eqs)