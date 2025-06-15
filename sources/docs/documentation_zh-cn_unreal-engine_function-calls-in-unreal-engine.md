# 虚幻引擎函数调用 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/function-calls-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:42.704Z

---

目录

![函数调用](https://dev.epicgames.com/community/api/documentation/image/239854f2-0469-4456-9b91-2bf8d5a6a8e6?resizing_type=fill&width=1920&height=335)

**Function Calls（函数调用）**是可以蓝图中形成的操作，该蓝图同属于目标Actor或对象的函数相对应 。对于关卡蓝图来说，相关actor很多时候都是 关卡蓝图本身。函数调用显示为一个盒形，具有显示了函数名称的标题。 不同类型的函数调用具有不同颜色的标题。

## 自身

**Self Function Calls（自身函数调用）** 是属于蓝图本身的函数， 通过在该蓝图继承的类或父类中声明。

## 其他

**Other Function Calls（其他函数调用）** 是属于除了该蓝图之外的其他对象或Actor的函数。例如， 该蓝图可能有一个StaticMeshComponent，该StaticMeshComponent可以通过SetStaticMesh函数调用修改它的网格物体。 由于这个函数属于StaticMeshComponent 而不属于蓝图，所以它是Other Function Call（其他函数调用）。

## 纯函数调用

**Pure Function Calls（纯函数调用）** 是可以执行的特殊动作，它不会直接影响世界或者世界中的对象 。这些函数一般执行类似于这样的事情: 输出一个属性值、数学运算操作(比如两个值间的加减乘除等)， 所产生的结果不会对任何事物造成影响。 只有将该结果进行赋值或使用该结果，才能对世界产生影响。

![Pure Function Call Node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c73388de-ab0e-453c-b6ac-67c1d4c2fb47/k2_node_func_pure.png)

![数学纯函数调用节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9150e27b-93e3-40f4-b3ae-36deaff10ff9/k2_node_func_pure_math.png)

标准

压缩

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [自身](/documentation/zh-cn/unreal-engine/function-calls-in-unreal-engine#%E8%87%AA%E8%BA%AB)
-   [其他](/documentation/zh-cn/unreal-engine/function-calls-in-unreal-engine#%E5%85%B6%E4%BB%96)
-   [纯函数调用](/documentation/zh-cn/unreal-engine/function-calls-in-unreal-engine#%E7%BA%AF%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)