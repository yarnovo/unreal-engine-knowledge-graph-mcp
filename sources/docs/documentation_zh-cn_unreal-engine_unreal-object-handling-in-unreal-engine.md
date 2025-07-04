# 虚幻引擎中的Object处理 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-object-handling-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:40:55.598Z

---

目录

![虚幻Object处理](https://dev.epicgames.com/community/api/documentation/image/887af4c8-c824-4ee7-82bc-bd24ccdb77c5?resizing_type=fill&width=1920&height=335)

使用适当的宏标记类、属性和函数可以将它们转变为`UClasses`、`UProperties`和`UFunctions`。这让虚幻引擎能够访问它们，从而允许实现一些后台处理功能。

## 自动属性初始化

在调用构造函数之前，`UObject`在初始化时自动归零。这针对整个类发生，`UProperties`和类似的原生成员。成员随后可以使用类构造函数中的自定义值进行初始化。

## 自动更新引用

`AActor`或`UActorComponent`被销毁或者从运行中删除时，对反射系统可见的对它的所有引用（`UProperty`指针和虚幻引擎容器类中存储的指针，如`TArray`）都将自动清空。这样的好处是防止悬挂指针持久存在并导致后续问题，但也意味着如果其他某段代码将`AActor`和`UActorComponent`指针销毁，这些指针也会变为空。最终的好处是空检查更可靠，因为会检测标准情况空指针和非空指针指向删除内存的情况。

必须理解的是，这种功能仅适用于标记了`UPROPERTY`或存储在虚幻引擎容器类中的`UActorComponent`或`AActor`引用。存储在原始指针中的Object引用对于虚幻引擎将为未知，并且不会自动清空，也不会妨碍垃圾回收。请注意，这不意味着所有`UObject*`变量都必须是`UProperties`。如果你需要的Object指针不是`UProperty`，请考虑使用`TWeakObjectPtr`。这是"弱"指针，意味着不会妨碍垃圾回收，但可以查询有效性，然后再接受访问，并且它所指向的Object要被销毁时，它将被设置为空。

另一种被引用UObject UProperty自动清空的情况是对编辑器中的资源使用"强制删除（Force Delete）"。因此，作用于属于资源的UObject的所有代码都必须处理这些变为空的指针。

## 序列化

当`UObject`被序列化时，所有`UProperty`值都将被自动写入或读取，除非显式标记为"瞬时"或无法从后构造函数默认值进行更改。例如，你可以在关卡中放入`AEnemy`实例，将其"体力（Health）"设置为500，保存并成功地重新加载，而不必在`UClass`定义之外编写一行代码。

当添加或删除UProperties时，系统会无缝处理加载预先存在的内容。新属性从新的CDO复制默认值。删除的属性将会被静默忽略。

如果需要自定义行为，则可以覆盖`UObject::Serialize`函数。这对于检测数据错误，检查版本号或执行自动转换或更新（如果数据格式有所更改）十分有用。

## 更新属性值

当`UClass`的 **类默认对象**（CDO）更改，引擎将尝试在加载类的所有实例时对这些实例应用这些更改。对于给定Object实例，如果更新的变量值与旧CDO中的值相匹配，则将更新为它在新CDO中保存的值。如果变量包含任何其他值，系统会假设这个值是故意设置的，这些更改将会被保留。

例如，假设你在一个关卡中放置了多个 `AEnemy` Object并保存，然后将 `AEnemy` 构造函数中的默认Health值设置为100。再假设将Enemy\_3的Health值设置为500，因为它们特别难对付。现在，假设你改变注意了，将Health的默认值增加到150。下次加载关卡时，虚幻意识到你更改了CDO，并将使用旧默认Health值（100）的所有`AEnemy`实例更新为使用Health值150。Enemy\_3的Health将保持在500，因为它不使用旧的默认值。

## 编辑器集成

编辑器理解`UObject`和`UProperties`，编辑器可以自动公开这些值以供编辑，而不必编写特殊代码。这可以选择在蓝图视觉脚本系统中融入集成。有许多选项可以控制变量和函数的可访问性和公开。

## 运行时类型信息和类型转换

由于`UObject`是虚幻引擎反射系统的一部分，它们始终知道它们是哪些`UClass`，并可以在运行时做出有关类型的决定和类型转换。

在原生代码中，每个`UObject`类都将自定义`Super`类型定义设置为其父类，从而可以轻松控制覆盖行为。示例：

```cpp
	class AEnemy : public ACharacter
	{
		virtual void Speak()
		{
			Say("Time to fight!");
		}
	};

	class AMegaBoss : public AEnemy
	{
		virtual void Speak()
		{
			Say("Powering up!");
			Super::Speak();
		}
	};

```

如你所见，调用`Speak`将会让MegaBoss说"Powering up!Time to fight!"。

此外，你可以使用模板化Cast函数或者查询（如果Object是使用`IsA`的特定类）安全地将Object从基类转换为更衍生性类。另一个简短示例：

```cpp
	class ALegendaryWeapon : public AWeapon
	{
		void SlayMegaBoss()
		{
			TArray<AEnemy> EnemyList = GetEnemyListFromSomewhere();

			// The legendary weapon is only effective against the MegaBoss
			for (AEnemy Enemy :EnemyList)
			{
				AMegaBoss* MegaBoss = Cast<AMegaBoss>(Enemy);
				if (MegaBoss)
				{
					Incinerate(MegaBoss);
				}
			}
		}
	};

```

这里我们使用了`Cast`来尝试将`AEnemy`转换为`AMegaBoss`。如果所提及Object实际上不是`AMegaBoss`（或者其子类），则Cast会返回空指针，我们可以适当的做出反应。在以上代码中，`Incinerate`将仅对MegaBoss调用。

## 垃圾回收

虚幻实现垃圾回收机制，不再被引用或已被显式标记为销毁的`UObject`将定期清除。引擎构建一个引用图表以确定哪些`UObject`仍在使用，哪些是孤立的。在该图表根部是一组指定为"根集"的`UObject`。任何`UObject`都可以添加到根集。当进行垃圾回收时，引擎将从根集开始，搜索已知`UObject`引用树来跟踪所有引用的`UObject`。任何未被引用的`UObject`（意味着未在树搜索中找到这些对象）将被假设为不再需要，因此被删除。

一个实际的影响是，通常情况下，你需要为任何希望保持活跃的对象维护一个 `UPROPERTY` 引用，无论它是简单的对象指针，还是包含对象指针类型的虚幻引擎容器类，如 `TArray<UObject*>`。Actor及其组件通常属于例外情况，因为Actor通常被链接回到根集的Object引用（例如它们所属的关卡），而Actor的组件被Actor自身引用。Actor可以显式标记为销毁，方法是调用它们的`Destroy`函数，这是从进行中游戏移除Actor的标准方法。组件可以使用`DestroyComponent`函数显式销毁，但它们通常在拥有它们的Actor从游戏中移除时被销毁。

虚幻引擎4中的垃圾回收速度快，效率高，内置大量的优化功能，能够尽量降低开销，如多线程可访问性分析可以标识孤立Object，优化的反加密代码能够尽快从容器中移除Actor。还有一些其他功能以调节，以更精准地控制如何以及何时执行垃圾回收，大部分都可以在 **项目设置（Project Settings）** 中的 **引擎 - 垃圾回收（Engine - Garbage Collection）** 下找到。以下设置通常用于为项目调节垃圾回收器性能：

设置

功能描述

**创建垃圾回收器UObject集群（Create Garbage Collector UObject Clusters）**

可以在项目设置中打开或关闭（默认打开）。如果打开，相关Object将被分组到一起归入垃圾回收集群，这样只需要检查集群自身即可，而不必检查每个Object。这意味着可以更快速地执行可访问性，因为整个集群将被视为一个对象，但也意味着该集群中的单个项目将被反加密，并准备在同一帧中删除，如果集群足够大，这样可能会导致卡顿。一般而言，集群创建会提高垃圾回收性能，缩短可访问性分析耗费的时间。

**合并GC集群（Merge GC Clusters）**

可以启用集群合并，这样当一个集群的对象引用另一个集群的对象时，让集群合并起来。请注意，清空导致合并的引用不会让新合并的集群瓦解或拆散。**创建垃圾回收器UObject集群（Create Garbage Collector UObject Clusters）** 也必须打开，该功能才能工作。这会使垃圾回收器反加密和销毁对象的频率降低，但一次反加密和销毁的对象数量会增加。此外，有些情况下不会对合并集群进行垃圾回收，因为对该集群中任何对象的任何引用都会阻止对整个集群进行垃圾回收。

**启用Actor集群（Actor Clustering Enabled）**

通过在 **项目设置（Project Settings）** 中打开这个选项，并将`bCanBeInCluster`变量设置为`true`，或者覆盖代码中的`CanBeInCluster`函数以使其返回`true`，可以将Actor放入集群中。默认情况下，Actor和组件会将这个选项关闭，但静态网格体Actor和反射捕获组件除外。该功能可用于将应该一次性全部销毁的Actor分组在一起，通常是关卡中放置的不能被销毁的静态网格体，除非卸载包含这些网格体的子关卡。

**启用蓝图集群（Blueprint Clustering Enabled）**

蓝图的`UBlueprintGeneratedClass`和相关数据，如共享UPROPERTY和UFUNCTION数据，可以通过打开该设置来建立集群。必须要认识到的是，该集群引用蓝图生成的类自身，而不是蓝图的单个实例。

**待清除终止对象之间的间隔（Time Between Purging Pending Kill Objects）**

垃圾回收活动的频率可以在项目设置中调整。该高级控制对于防止卡顿尤其有用。通过缩短回收间隔，可以减少将在下一次可访问性分析阶段发现的无法访问的对象的可能数量，并避免同时清除大量Actor时可能会发生的卡顿。

![ProjectSettingsGarbageCollection.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c73ad87-3feb-4cd6-ac06-dceb08f3b605/projectsettingsgarbagecollection.png)

项目设置中的垃圾回收设置

## 网络复制

`UObject`系统包含一组可靠的功能，能够促进[网络通信和多人游戏](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine)。

`UProperties`可以标记为告诉引擎[在网络游戏期间复制数据](/documentation/404)。常见模型是一个变量在服务器上发生更改，引擎检测到这个更改，并将其可靠地发送到所有客户端。当变量通过复制发生更改时，客户端可以选择性接收回调函数。

`UFunctions`也可以标记为[在远程机器上执行](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine)。例如，"server"函数在客户端上调用时，将会在服务器上执行这个函数以获取服务器版本的Actor。而另一方面，"client"函数可以从服务器调用，并在拥有这个函数的客户端版本的对应Actor上运行。

-   [architecture](https://dev.epicgames.com/community/search?query=architecture)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [自动属性初始化](/documentation/zh-cn/unreal-engine/unreal-object-handling-in-unreal-engine#%E8%87%AA%E5%8A%A8%E5%B1%9E%E6%80%A7%E5%88%9D%E5%A7%8B%E5%8C%96)
-   [自动更新引用](/documentation/zh-cn/unreal-engine/unreal-object-handling-in-unreal-engine#%E8%87%AA%E5%8A%A8%E6%9B%B4%E6%96%B0%E5%BC%95%E7%94%A8)
-   [序列化](/documentation/zh-cn/unreal-engine/unreal-object-handling-in-unreal-engine#%E5%BA%8F%E5%88%97%E5%8C%96)
-   [更新属性值](/documentation/zh-cn/unreal-engine/unreal-object-handling-in-unreal-engine#%E6%9B%B4%E6%96%B0%E5%B1%9E%E6%80%A7%E5%80%BC)
-   [编辑器集成](/documentation/zh-cn/unreal-engine/unreal-object-handling-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E9%9B%86%E6%88%90)
-   [运行时类型信息和类型转换](/documentation/zh-cn/unreal-engine/unreal-object-handling-in-unreal-engine#%E8%BF%90%E8%A1%8C%E6%97%B6%E7%B1%BB%E5%9E%8B%E4%BF%A1%E6%81%AF%E5%92%8C%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2)
-   [垃圾回收](/documentation/zh-cn/unreal-engine/unreal-object-handling-in-unreal-engine#%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6)
-   [网络复制](/documentation/zh-cn/unreal-engine/unreal-object-handling-in-unreal-engine#%E7%BD%91%E7%BB%9C%E5%A4%8D%E5%88%B6)

相关文档

[

联网和多人游戏

![联网和多人游戏](https://dev.epicgames.com/community/api/documentation/image/31fbb234-004a-447b-a210-103cb0e1d71b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine)