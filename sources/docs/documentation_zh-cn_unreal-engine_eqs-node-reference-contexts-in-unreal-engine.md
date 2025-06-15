# 虚幻引擎EQS节点参考：情境 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/eqs-node-reference-contexts-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:44:26.425Z

---

目录

![EQS节点参考：情境](https://dev.epicgames.com/community/api/documentation/image/7d89ab96-6b6e-4cee-ada3-27f387f9b67a?resizing_type=fill&width=1920&height=335)

在场景查询系统（EQS）中，**情境** 为使用的所有[测试](/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine)或[生成器](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine)提供参考框架。情境可以是简单的 **查询器**（其执行测试），也可以比较复杂，例如 **某种类型的所有Actor**。**Points:Grid** 之类的生成器可以使用返回多个位置或Actor的情境。这将会在每个情境的位置处创建一个网格（按照定义的大小和密度）。除了引擎提供的情境以外，还可以在蓝图中使用 **EnvQueryContext\_BlueprintBase** 类或通过 C++ 代码创建自定义情境。 

## EnvQueryContext\_Item

**项目（Item）** 由生成器创建，如果使用 **EQS测试Pawn** 创建，那么它们就是出现在编辑器中的球体。EnvQueryContext\_Item是位置（FVector）或Actor（AActor）。

## EnvQueryContext\_Querier

**查询器** 是当前被AI控制器占据的Pawn，执行启动场景查询的[行为树](/documentation/zh-cn/unreal-engine/behavior-trees-in-unreal-engine)。举例而言，可以使用查询器作为情境的一种情况是：希望在AI角色周围的场景中搜索它们可以使用的物品，或者寻找可以使其获得掩护躲避玩家的地方，或者只是确定AI执行查询的当前位置。

在生成器类型的 **细节（Details）** 面板中，可以将查询器指定为下列属性的情境：

生成器

属性

**Actors of Class**

**Search Center**

![Actors of Class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53a9b149-0cab-4b6b-9365-7f65789754b9/querier-actors-of-class.png)

**Current Location**

**Query Context**

![Current Location](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e67353ff-db22-4eed-97b3-73ab1fe688c3/querier-current-location.png)

**Points:Circle**

**Circle Center**

![Circle Point](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0beff63-2194-4c95-8000-9da9eef73681/querier-circle.png)

**Points:Cone**

**Center Actor**

![Cone Point](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae3dad35-6b1a-44ed-bac7-78e90d1d848b/querier-cone.png)

**Points:Donut**

**Center**

![Donut Point](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ae2afbb-9212-4b14-90c0-f84799b1e9ab/querier-donut.png)

**Points:Grid**

**Generate Around**

![Grid Point](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56c78984-5a38-4ff5-a98f-e3caed3db0aa/querier-grid.png)

**Points:Pathing Grid**

**Generate Around**

![Pathing Grid Point](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa07b770-6c12-401d-888d-02b412f27daa/querier-pathing-grid.png)

## EnvQueryContext\_BlueprintBase

可以通过蓝图使用 **EnvQueryContext\_BlueprintBase** 类创建自定义情境。这会提供四个可覆盖的函数，以便用户添加自己的自定义情境，用于查询中的测试。

使用自定义情境的方法：

1.  创建 **EnvQueryContext\_BlueprintBase** 类的新蓝图。
    
    ![Create a new Blueprint of the EnvQueryContext BlueprintBase class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43539339-9aca-4a53-9d83-430cff30a7c5/blueprint-base-create.png)
2.  在EnvQueryContext\_BlueprintBase中，单击 **覆盖（Override）** 并选择要使用的函数类型。
    
    ![Click Override and select the type of function you wish to use](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06b343b2-5c60-4daf-9a1b-531ba8e4099b/blueprint-base-function.png)

请参见下表了解每种函数覆盖的描述：

函数

描述

Provide Single Location

这会返回单个位置（矢量）。生成该位置的方式由用户来决定。举例而言，下面的函数将返回在距离查询器1500厘米以内范围发现的随机Actor（在DesiredObjectType中发现的Actor，如Pawn、载具）的追踪命中位置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3db6c30-724f-4eaa-a432-75c89f2d4013/provide-single-location.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3db6c30-724f-4eaa-a432-75c89f2d4013/provide-single-location.png)

Provide Single Actor

这会返回单个Actor。可以通过任何想要的方法获取该Actor。在这个示例中，该函数将返回玩家0的受控Actor：

![Provide Single Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fbfb4781-f083-4910-b571-a063319e58e5/provide-single-actor.png)

Provide Locations Set

这会返回位置（矢量）的数组。生成这些位置的方式由您决定。在下面的示例中，此函数将从位于一个半径1500单位的圆上的16个等间距位置进行追踪，返回场景中的成功命中：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89fbb221-4639-42c2-8127-1c6fa46a12f9/provide-locations-set.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89fbb221-4639-42c2-8127-1c6fa46a12f9/provide-locations-set.png)

Provide Actors Set

这会返回Actor的排列。可以使用任何想要的方法获取这些Actor。下面的示例使用了一个"获取所有Actors of Class"（Get All Actors of Class）节点来将我们指定的类获取为要返回的Actor：

![Provide Actors Set](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6745b52a-4612-4467-9e08-249af3a703c3/provide-actors-set.png)

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [eqs](https://dev.epicgames.com/community/search?query=eqs)
-   [environmental query system](https://dev.epicgames.com/community/search?query=environmental%20query%20system)
-   [eqs node reference list](https://dev.epicgames.com/community/search?query=eqs%20node%20reference%20list)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [EnvQueryContext\_Item](/documentation/zh-cn/unreal-engine/eqs-node-reference-contexts-in-unreal-engine#envquerycontext-item)
-   [EnvQueryContext\_Querier](/documentation/zh-cn/unreal-engine/eqs-node-reference-contexts-in-unreal-engine#envquerycontext-querier)
-   [EnvQueryContext\_BlueprintBase](/documentation/zh-cn/unreal-engine/eqs-node-reference-contexts-in-unreal-engine#envquerycontext-blueprintbase)