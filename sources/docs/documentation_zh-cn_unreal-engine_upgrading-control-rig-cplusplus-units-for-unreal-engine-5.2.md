# 为虚幻引擎5.2升级控制绑定的C++单元 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/upgrading-control-rig-cplusplus-units-for-unreal-engine-5.2
> 
> 生成时间: 2025-06-14T20:16:12.079Z

---

目录

![为虚幻引擎5.2升级控制绑定的C++单元](https://dev.epicgames.com/community/api/documentation/image/4f6fcbb2-be74-4b91-bbd9-7110cd0182de?resizing_type=fill&width=1920&height=335)

在 **虚幻引擎** 5.2中，对[控制绑定](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine) `FRigVMStruct` 和 `FRigUnit` 在项目的 **C++** 代码库中的实现方式做了重大改变。术语和自定义 `FRigVMStruct` 结构内的 **上下文（Context）** 概念的扩展使用，需要对这些结构体进行重构。

你可以使用该文档来了解更多关于如何迁移你的控制绑定代码，以便使其兼容虚幻引擎5.2的信息。

## 执行签名变更

在以前版本的虚幻引擎中，`FRigVMExecuteContext` 成员被视为每个RigVM方法的参数。在虚幻引擎5.2中，执行上下文的成员将不再被传递。相反，一个名为 `ExecuteContext` 的单一参数被传递给所有RigVM方法。该参数可以是一个 **常数（const）** 或 **可变量（mutable）**，这取决于它在结构体中的用法。

要查看与 `FRigUnitContext` 相关的变化，请参阅[不透明参数和FRigUnitContext](/documentation/zh-cn/unreal-engine/upgrading-control-rig-cplusplus-units-for-unreal-engine-5.2#opaqueargumentsandfrigunitcontext)部分。

此处，你可以参考一个从虚幻引擎5.1到5.2的签名变更的例子，,`FRigUnit` 如 `FRigUnit_SendEvent` 是 `FRigUnit_SendEvent::Execute` 的签名：

5.1 Signature

5.2 Signature

```cpp
void FRigUnit_SendEvent::StaticExecute(
	const FRigVMExecuteContext& RigVMExecuteContext,
	const ERigEvent Event,
	const FRigElementKey& Item,
	const float OffsetInSeconds,
	const bool bEnable,
	const bool bOnlyDuringInteraction,
	FControlRigExecuteContext& ExecuteContext,
	const FRigUnitContext & Context
)
```

```cpp
void FRigUnit_SendEvent::StaticExecute(
	FControlRigExecuteContext& ExecuteContext,
	const ERigEvent Event,
	const FRigElementKey& Item,
	const float OffsetInSeconds,
	const bool bEnable,
	const bool bOnlyDuringInteraction
)
```

由于新的 `ExecuteContext` 参数提供了对 **const** 或 **mutable** 上下文的访问，我们移除了 `RigVMExecuteContext` 参数。

### 不透明参数和FRigUnitContext

以前特定领域的 `RIGVM_METHOD` 实现可以选择传递额外的 **不透明参数（opaque arguments）**。在虚幻引擎5.2中，对于不透明参数的支持已被移除。这种机制以前唯一的用法是控制绑定节点的 `FRigUnitContext`。依靠访问 `FRigUnitContext` **上下文** 参数的代码必须更新至使用 `ExecuteContext.UnitContext` 以确保兼容性。

成员从FRigUnitContext移动至FRigExecuteContext

这里你可以参考从 `FRigUnitContext` 转移到 `FRigExecuteContext` 的成员列表：

| 5.1中移除的参数 | 5.2中重构的参数 | | --- | --- | | `FRigUnitContext::DrawInterface` | `FRigVMExecuteContext::GetDrawInterface();` | | `FRigUnitContext::DrawContainer` | `FRigVMExecuteContext::GetDrawContainer();` | | `FRigUnitContext::DeltaTime` | `FRigVMExecuteContext::GetDeltaTime();` | | `FRigUnitContext::AbsoluteTime` | `FRigVMExecuteContext::GetAbsoluteTime();` | | `FRigUnitContext::FramesPerSecond |` FRigVMExecuteContext::GetFramesPerSecond();\` |

`FRigUnitContext::Hierarchy`

`FControlRigExecuteContext::Hierarchy;`

`FRigUnitContext::ToWorldSpaceTransform`

`FRigUnitContext::GetToWorldSpaceTransform();`

`FRigUnitContext::OwningComponent`

`FRigUnitContext::GetOwningComponent();`

`FRigUnitContext::OwningActor`

`FRigUnitContext::GetOwningActor();`

`FRigUnitContext::World`

`FRigUnitContext::GetWorld();`

`FRigUnitContext::Log`

`FRigVMExecuteContext::GetLog();`

`FRigUnitContext::NameCache`

`FRigVMExecuteContext::GetNameCache();`

所有与转换相关的辅助函数也都转移到了 `FRigVMExecuteContext` 中。

## 移除FRigUnitContext.State

控制绑定和RigVM不再以 **初始（Init）** 或 **更新（Update）** 状态多次调用RIGVM\_METHOD回调。相反，它在 **初始** 状态期间将内存重置为默认值，然后一直运行过去被认为是 **更新** 的状态。这意味着你可能需要改变你的代码，从过去依赖 **初始** 状态进行初始化，改为使用 **未初始化标志** 或类似方法来确定是否需要初始化。

### 示例

你可以在这里参考虚幻引擎源码树中的一个重构代码的例子。你也可以使用[虚幻引擎GitHub源码树](https://www.unrealengine.com/en-US/ue-on-github)来对比额外的重构，例如在不同的版本之间使用控制绑定节点。

5.1 FRigUnit\_SendEvent::Execute()

5.2 FRigUnit\_SendEvent::Execute()

\~~~ FRigUnit\_SendEvent\_Execute() { DECLARE\_SCOPE\_HIERARCHICAL\_COUNTER\_RIGUNIT()

if(!bEnable) { return; }

if (bOnlyDuringInteraction && !Context.IsInteracting()) { return; }

URigHierarchy *Hierarchy = ExecuteContext.Hierarchy; if (Hierarchy) { switch (Context.State) { case EControlRigState::Init: { break; } case EControlRigState::Update: { FRigEventContext EventContext; EventContext.Key = Item; EventContext.Event = Event; EventContext.SourceEventName = ExecuteContext.GetEventName(); EventContext.LocalTime = Context.AbsoluteTime + OffsetInSeconds; Hierarchy->SendEvent(EventContext, false /* async \*/); break; } default: { break; } } } }

```cpp




```

FRigUnit\_SendEvent\_Execute() { DECLARE\_SCOPE\_HIERARCHICAL\_COUNTER\_RIGUNIT()

if(!bEnable) { return; }

if (bOnlyDuringInteraction && !ExecuteContext.UnitContext.IsInteracting()) { return; }

URigHierarchy *Hierarchy = ExecuteContext.Hierarchy; if (Hierarchy) { FRigEventContext EventContext; EventContext.Key = Item; EventContext.Event = Event; EventContext.SourceEventName = ExecuteContext.GetEventName(); EventContext.LocalTime = ExecuteContext.GetAbsoluteTime() + OffsetInSeconds; Hierarchy->SendEvent(EventContext, false /* async \*/); } } ~~~

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [执行签名变更](/documentation/zh-cn/unreal-engine/upgrading-control-rig-cplusplus-units-for-unreal-engine-5.2#%E6%89%A7%E8%A1%8C%E7%AD%BE%E5%90%8D%E5%8F%98%E6%9B%B4)
-   [不透明参数和FRigUnitContext](/documentation/zh-cn/unreal-engine/upgrading-control-rig-cplusplus-units-for-unreal-engine-5.2#%E4%B8%8D%E9%80%8F%E6%98%8E%E5%8F%82%E6%95%B0%E5%92%8Cfrigunitcontext)
-   [移除FRigUnitContext.State](/documentation/zh-cn/unreal-engine/upgrading-control-rig-cplusplus-units-for-unreal-engine-5.2#%E7%A7%BB%E9%99%A4frigunitcontextstate)
-   [示例](/documentation/zh-cn/unreal-engine/upgrading-control-rig-cplusplus-units-for-unreal-engine-5.2#%E7%A4%BA%E4%BE%8B)