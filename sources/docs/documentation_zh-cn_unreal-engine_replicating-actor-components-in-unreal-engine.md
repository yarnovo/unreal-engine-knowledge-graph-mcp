# 在虚幻引擎中复制Actor组件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/replicating-actor-components-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:56:53.100Z

---

目录

![Actor组件复制](https://dev.epicgames.com/community/api/documentation/image/d00e4d28-02d9-4abe-b7dd-aa75e8dd2542?resizing_type=fill&width=1920&height=335)

Actor组件可以扩展Actor的行为。Actor组件是一类特殊的对象，可以作为子对象附加到Actor上。Actor组件默认不会复制，但你可以配置任意Actor组件，使其作为其所属Actor的一部分进行复制。Actor组件可以复制自身属性和子对象，也可以像Actor那样调用由Actor组件类定义的远程过程调用（RPC）。

要将Actor组件作为Actor的一部分复制，必须确保：

-   将拥有该Actor组件的Actor设置为可复制。
-   将Actor组件设置为可复制。

## Actor组件类型

### 静态Actor组件

*静态Actor组件* 在其所属Actor生成时生成。静态组件在Actor的C++结构函数中创建的默认子对象，或是在蓝图编辑器的[组件模式](/documentation/zh-cn/unreal-engine/components-window-in-unreal-engine)中创建。

#### 复制静态Actor组件

复制在Actor结构函数中创建的Actor组件，请按以下步骤操作：

1.  在Actor结构函数中：
    -   使用 `bReplicates = true;` 将Actor设置为可复制。
    -   使用 `CreateDefaultSubobject<T>` 在Actor结构函数中创建Actor组件：
        
        ```cpp
                  AMyActor::AMyActor()
                  {
                      bReplicates = true;
                      MyActorComponent = CreateDefaultSubobject<UMyActorComponent>(TEXT("MyActorComponent"));
                  }
        ```
        
2.  在Actor组件结构函数中：
    -   使用 `UActorComponent::SetIsReplicatedByDefault` 将Actor组件设置为可复制：
        
        ```cpp
                  UMyActorComponent::UMyActorComponent()
                  {
                      SetIsReplicatedByDefault(true);
                  }
        ```
        

### 动态Actor组件

*动态Actor组件* 实在运行时在服务器上生成的Actor组件。动态Actor组件的创建或删除都会被复制到相连的客户端上。动态Actor组件的工作方式类似Actor。

客户端可以生成自有的、本地的、不可复制的动态Actor组件。

#### 复制动态Actor组件

要复制在运行时动态创建的Actor组件，请按以下步骤操作：

1.  在Actor结构函数中：
    -   使用 `bReplicates = true;` 将Actor设置为可复制。
    -   使用 `NewObject<T>` 在Gameplay代码中创建Actor组件：
        
        ```cpp
                  MyActorComponent = NewObject<UMyActorComponent>();
        ```
        
2.  在想要复制新Actor组件时：
    -   使用 `UActorComponent::SetIsReplicated` 将Actor组件设置为可复制：
        
        ```cpp
                  if (MyActorComponent)
                  {
                      MyActorComponent->SetIsReplicated(true);
                  }
        ```
        

### 蓝图Actor组件

你可以在蓝图中生成静态和动态Actor组件。

#### 复制静态蓝图Actor组件

要在蓝图中复制静态Actor组件，需在Actor组件的 **细节面板** 中开启 **复制（Replicates）** 布尔字段。只有当组件具有你想要复制的属性或事件，你才需要复制该Actor组件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88d3c85e-dfa1-4c23-bd52-5e8ae39b774d/component-replicates.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88d3c85e-dfa1-4c23-bd52-5e8ae39b774d/component-replicates.png)

你可以在 细节面板 的 组件可复制性（Component Replication） 分段中奖一个Actor组件设置为默认可复制。

**组件可复制性（Component Replication）** 仅出现在支持某种形式复制功能的组件上。

#### 复制动态蓝图Actor组件

要在蓝图中复制动态Actor组件，需要在开启 **应复制（Should Replicate）** 字段的前提下调用 **Set Is Replicated** 函数。

复制代码

Begin Object Class=/Script/BlueprintGraph.K2Node\_CustomEvent Name="K2Node\_CustomEvent\_0" ExportPath="/Script/BlueprintGraph.K2Node\_CustomEvent'/Game/MyBlueprints/BP\_MyActor.BP\_MyActor:EventGraph.K2Node\_CustomEvent\_0'" CustomFunctionName="Event ReplicateComponent" NodePosY=681 NodeGuid=818B4FBA4AB8D2434CFAECA23B4FA1A1 CustomProperties Pin (PinId=421A30E3469187EF6B5740AE931D3780,PinName="OutputDelegate",Direction="EGPD\_Output",PinType.PinCategory="delegate",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(MemberParent="/Script/Engine.BlueprintGeneratedClass'/Game/MyBlueprints/BP\_MyActor.BP\_MyActor\_C'",MemberName="Event ReplicateComponent",MemberGuid=818B4FBA4AB8D2434CFAECA23B4FA1A1),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=62D2FC444CA20DB5E9B3A8955CAC3E2E,PinName="then",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node\_CallFunction\_0 06F6405B4C0EAC380F0686AAB61C9142,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_CallFunction Name="K2Node\_CallFunction\_0" ExportPath="/Script/BlueprintGraph.K2Node\_CallFunction'/Game/MyBlueprints/BP\_MyActor.BP\_MyActor:EventGraph.K2Node\_CallFunction\_0'" FunctionReference=(MemberParent="/Script/CoreUObject.Class'/Script/Engine.ActorComponent'",MemberName="SetIsReplicated") NodePosX=416 NodePosY=681 NodeGuid=BF0399784595F2FE6960EB96EC2720C3 CustomProperties Pin (PinId=06F6405B4C0EAC380F0686AAB61C9142,PinName="execute",PinToolTip="\\nExec",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node\_CustomEvent\_0 62D2FC444CA20DB5E9B3A8955CAC3E2E,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=B9CD644C4D6D4BA1C0974A9E6587E6C6,PinName="then",PinToolTip="\\nExec",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=B3041B214B81F199F983ACB72C6313B4,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinToolTip="Target\\nActor Component Object Reference",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/Engine.ActorComponent'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node\_VariableGet\_0 148F62B441C32524EE4B75A258C6EDA3,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=63B137774CD10EC982E1EB9977EDDB2A,PinName="ShouldReplicate",PinToolTip="Should Replicate\\nBoolean",PinType.PinCategory="bool",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="true",AutogeneratedDefaultValue="false",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableGet Name="K2Node\_VariableGet\_0" ExportPath="/Script/BlueprintGraph.K2Node\_VariableGet'/Game/MyBlueprints/BP\_MyActor.BP\_MyActor:EventGraph.K2Node\_VariableGet\_0'" VariableReference=(MemberName="BP\_MyActorComponent",bSelfContext=True) NodePosX=128 NodePosY=784 NodeGuid=77ABE40B46D72F9B9E5F3CAF2525B65C CustomProperties Pin (PinId=148F62B441C32524EE4B75A258C6EDA3,PinName="BP\_MyActorComponent",Direction="EGPD\_Output",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/Engine.BlueprintGeneratedClass'/Game/MyBlueprints/BP\_MyActorComponent.BP\_MyActorComponent\_C'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node\_CallFunction\_0 B3041B214B81F199F983ACB72C6313B4,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=2E0192B34CCBEC99A1F485B839A7E62D,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/Engine.BlueprintGeneratedClass'/Game/MyBlueprints/BP\_MyActor.BP\_MyActor\_C'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object

Begin Object Class=/Script/BlueprintGraph.K2Node\_CustomEvent Name="K2Node\_CustomEvent\_0" ExportPath="/Script/BlueprintGraph.K2Node\_CustomEvent'/Game/MyBlueprints/BP\_MyActor.BP\_MyActor:EventGraph.K2Node\_CustomEvent\_0'" CustomFunctionName="Event ReplicateComponent" NodePosY=681 NodeGuid=818B4FBA4AB8D2434CFAECA23B4FA1A1 CustomProperties Pin (PinId=421A30E3469187EF6B5740AE931D3780,PinName="OutputDelegate",Direction="EGPD\_Output",PinType.PinCategory="delegate",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(MemberParent="/Script/Engine.BlueprintGeneratedClass'/Game/MyBlueprints/BP\_MyActor.BP\_MyActor\_C'",MemberName="Event ReplicateComponent",MemberGuid=818B4FBA4AB8D2434CFAECA23B4FA1A1),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=62D2FC444CA20DB5E9B3A8955CAC3E2E,PinName="then",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node\_CallFunction\_0 06F6405B4C0EAC380F0686AAB61C9142,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_CallFunction Name="K2Node\_CallFunction\_0" ExportPath="/Script/BlueprintGraph.K2Node\_CallFunction'/Game/MyBlueprints/BP\_MyActor.BP\_MyActor:EventGraph.K2Node\_CallFunction\_0'" FunctionReference=(MemberParent="/Script/CoreUObject.Class'/Script/Engine.ActorComponent'",MemberName="SetIsReplicated") NodePosX=416 NodePosY=681 NodeGuid=BF0399784595F2FE6960EB96EC2720C3 CustomProperties Pin (PinId=06F6405B4C0EAC380F0686AAB61C9142,PinName="execute",PinToolTip="\\nExec",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node\_CustomEvent\_0 62D2FC444CA20DB5E9B3A8955CAC3E2E,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=B9CD644C4D6D4BA1C0974A9E6587E6C6,PinName="then",PinToolTip="\\nExec",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=B3041B214B81F199F983ACB72C6313B4,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinToolTip="Target\\nActor Component Object Reference",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/Engine.ActorComponent'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node\_VariableGet\_0 148F62B441C32524EE4B75A258C6EDA3,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=63B137774CD10EC982E1EB9977EDDB2A,PinName="ShouldReplicate",PinToolTip="Should Replicate\\nBoolean",PinType.PinCategory="bool",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="true",AutogeneratedDefaultValue="false",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableGet Name="K2Node\_VariableGet\_0" ExportPath="/Script/BlueprintGraph.K2Node\_VariableGet'/Game/MyBlueprints/BP\_MyActor.BP\_MyActor:EventGraph.K2Node\_VariableGet\_0'" VariableReference=(MemberName="BP\_MyActorComponent",bSelfContext=True) NodePosX=128 NodePosY=784 NodeGuid=77ABE40B46D72F9B9E5F3CAF2525B65C CustomProperties Pin (PinId=148F62B441C32524EE4B75A258C6EDA3,PinName="BP\_MyActorComponent",Direction="EGPD\_Output",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/Engine.BlueprintGeneratedClass'/Game/MyBlueprints/BP\_MyActorComponent.BP\_MyActorComponent\_C'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node\_CallFunction\_0 B3041B214B81F199F983ACB72C6313B4,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=2E0192B34CCBEC99A1F485B839A7E62D,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/Engine.BlueprintGeneratedClass'/Game/MyBlueprints/BP\_MyActor.BP\_MyActor\_C'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object

## 复制Actor组件属性

你可以用复制Actor属性的方法来复制Actor组件属性。关于复制Actor属性的详情，请参阅[复制Actor属性](/documentation/zh-cn/unreal-engine/replicate-actor-properties-in-unreal-engine)一文。

## Actor组件远程过程调用

你可以在Actor组件类中定义远程过程调用（RPC），并用调用ActorRPC的方式来调用它。关于定义、实现和调用RPC的详情，请参阅[远程过程调用](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine)一文。

## 复制Actor组件子对象

Actor组件可以像Actor拥有自己的复制子对象列表。它们使用和Actor想通的API接口来注册和注销其子对象。Actor组件内的子对象也可以拥有复制条件。

在检查复制子对象的条件前，其所属组件必须先被复制到连接上。例如，如果子对象具有一个 `COND_OwnerOnly` 条件，但被注册到了一个使用 `COND_SkipOwner` 条件的组件上，那么该子对象将永远不会被复制，因为其所属组件会被跳过。

关于复制子对象的详情，请参阅[复制Actor子对象](/documentation/zh-cn/unreal-engine/replicating-uobjects-in-unreal-engine)一文。

## 带宽开销

Actor内每个被复制的Actor组件都会增加：

-   一个由4个字节组成的网络全局唯一标识符（NetGUID）标头。
-   所有复制的属性和空间需求。
-   一个约1字节长的脚标。

在考虑带宽开销时，需要注意三个地方：

-   *复制*：相比复制整个Actor，复制一个Actor组件上的一个属性的影响相对较小。
-   *调用RPC*：从Actor组件调用RPC的开销高于直接从Actor调用RPC。为了缓解这一情况，建议考虑通过Actor发送Actor组件RPC。具体示例请参阅[角色移动组件](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine)一文。
-   *Actor组件数量*：Actor组件相对较小。但如果你使用了大量组件和组件子对象，可能会降低性能。

-   [components](https://dev.epicgames.com/community/search?query=components)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [networking](https://dev.epicgames.com/community/search?query=networking)
-   [replication](https://dev.epicgames.com/community/search?query=replication)
-   [actor](https://dev.epicgames.com/community/search?query=actor)
-   [properties](https://dev.epicgames.com/community/search?query=properties)
-   [actor component](https://dev.epicgames.com/community/search?query=actor%20component)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Actor组件类型](/documentation/zh-cn/unreal-engine/replicating-actor-components-in-unreal-engine#actor%E7%BB%84%E4%BB%B6%E7%B1%BB%E5%9E%8B)
-   [静态Actor组件](/documentation/zh-cn/unreal-engine/replicating-actor-components-in-unreal-engine#%E9%9D%99%E6%80%81actor%E7%BB%84%E4%BB%B6)
-   [复制静态Actor组件](/documentation/zh-cn/unreal-engine/replicating-actor-components-in-unreal-engine#%E5%A4%8D%E5%88%B6%E9%9D%99%E6%80%81actor%E7%BB%84%E4%BB%B6)
-   [动态Actor组件](/documentation/zh-cn/unreal-engine/replicating-actor-components-in-unreal-engine#%E5%8A%A8%E6%80%81actor%E7%BB%84%E4%BB%B6)
-   [复制动态Actor组件](/documentation/zh-cn/unreal-engine/replicating-actor-components-in-unreal-engine#%E5%A4%8D%E5%88%B6%E5%8A%A8%E6%80%81actor%E7%BB%84%E4%BB%B6)
-   [蓝图Actor组件](/documentation/zh-cn/unreal-engine/replicating-actor-components-in-unreal-engine#%E8%93%9D%E5%9B%BEactor%E7%BB%84%E4%BB%B6)
-   [复制静态蓝图Actor组件](/documentation/zh-cn/unreal-engine/replicating-actor-components-in-unreal-engine#%E5%A4%8D%E5%88%B6%E9%9D%99%E6%80%81%E8%93%9D%E5%9B%BEactor%E7%BB%84%E4%BB%B6)
-   [复制动态蓝图Actor组件](/documentation/zh-cn/unreal-engine/replicating-actor-components-in-unreal-engine#%E5%A4%8D%E5%88%B6%E5%8A%A8%E6%80%81%E8%93%9D%E5%9B%BEactor%E7%BB%84%E4%BB%B6)
-   [复制Actor组件属性](/documentation/zh-cn/unreal-engine/replicating-actor-components-in-unreal-engine#%E5%A4%8D%E5%88%B6actor%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7)
-   [Actor组件远程过程调用](/documentation/zh-cn/unreal-engine/replicating-actor-components-in-unreal-engine#actor%E7%BB%84%E4%BB%B6%E8%BF%9C%E7%A8%8B%E8%BF%87%E7%A8%8B%E8%B0%83%E7%94%A8)
-   [复制Actor组件子对象](/documentation/zh-cn/unreal-engine/replicating-actor-components-in-unreal-engine#%E5%A4%8D%E5%88%B6actor%E7%BB%84%E4%BB%B6%E5%AD%90%E5%AF%B9%E8%B1%A1)
-   [带宽开销](/documentation/zh-cn/unreal-engine/replicating-actor-components-in-unreal-engine#%E5%B8%A6%E5%AE%BD%E5%BC%80%E9%94%80)

相关文档

[

复制子对象

![复制子对象](https://dev.epicgames.com/community/api/documentation/image/5d0ac9fb-0aea-47e2-914d-ce139f5057a9?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/replicating-uobjects-in-unreal-engine)