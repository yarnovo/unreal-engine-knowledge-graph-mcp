# Multicast Delegates in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/multicast-delegates-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:41:54.471Z

---

目录

![多播委托](https://dev.epicgames.com/community/api/documentation/image/949876b6-3f18-4c60-85cb-0c6d5fa03d6f?resizing_type=fill&width=1920&height=335)

多播委托拥有大部分与单播委托相同的功能。它们只拥有对对象的弱引用，可以与结构体一起使用，可以四处轻松复制等等。就像常规委托一样，多播委托可以远程加载/保存和触发；但多播委托函数不能使用返回值。它们最适合用来四处轻松传递一组委托。

## 声明多播委托

多播委托在声明方式上与[声明标准委托](/documentation/zh-cn/unreal-engine/delegates-and-lambda-functions-in-unreal-engine)相同，只是前者使用特定于多播委托的宏变体。

声明宏

说明

`DECLARE_MULTICAST_DELEGATE[_RetVal, ...]\( DelegateName \)`

创建一个多播委托。

`DECLARE_DYNAMIC_MULTICAST_DELEGATE[_RetVal, ...]\( DelegateName \)`

创建一个动态多播委托。

## 绑定多播委托

多播委托可以绑定多个函数，当委托触发时，将调用所有这些函数。因此，绑定函数在语义上与数组更加类似。

函数

说明

"Add()"

将函数委托添加到该多播委托的调用列表中。

"AddStatic()"

添加原始C++指针全局函数委托。

"AddRaw()"

添加原始C++指针委托。原始指针不使用任何类型的引用，因此如果从委托下面删除了对象，则调用此函数可能不安全。调用Execute()时请小心！

`AddLambda()`

添加一个函子。这通常用于那些不会捕获指针的lambda函数。

`AddSPLambda()`

添加一个函子。它只有在对目标共享指针的弱引用有效的情况下才会被调用。

`AddWeakLambda()`

添加一个函子。它只有在对UObject的弱引用有效的情况下才会被调用。

"AddSP()"

添加基于共享指针的（快速、非线程安全）成员函数委托。共享指针委托保留对对象的弱引用。

"AddUObject()"

添加基于UObject的成员函数委托。UObject委托保留对对象的弱引用。

"Remove()"

从该多播委托的调用列表中删除函数（性能为O(N)）。请注意，委托的顺序可能不会被保留！

"RemoveAll()"

从该多播委托的调用列表中删除绑定到指定UserObject的所有函数。请注意，委托的顺序可能不会被保留！

"RemoveAll()"将删除绑定到所提供指针的所有已注册委托。切记，未绑定到对象指针的原始委托不会被该函数所删除！

请参阅"DelegateSignatureImpl.inl"（位于 `..\Engine\Source\Runtime\Core\Public\Delegates\` 中）了解这些函数的变体、参数和实现。

## 多播执行

多播委托允许您附加多个函数委托，然后通过调用多播委托的"Broadcast()"函数一次性同时执行它们。多播委托签名不得使用返回值。

在多播委托上调用"Broadcast()"总是安全的，即使是在没有任何绑定时也是如此。唯一需要注意的是，如果您使用委托来初始化输出变量，通常会带来非常不利的后果。

调用"Broadcast()"时绑定函数的执行顺序尚未定义。执行顺序可能与函数的添加顺序不相同。

函数

说明

"Broadcast()"

将该委托广播给所有绑定的对象，但可能已过期的对象除外。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [声明多播委托](/documentation/zh-cn/unreal-engine/multicast-delegates-in-unreal-engine#%E5%A3%B0%E6%98%8E%E5%A4%9A%E6%92%AD%E5%A7%94%E6%89%98)
-   [绑定多播委托](/documentation/zh-cn/unreal-engine/multicast-delegates-in-unreal-engine#%E7%BB%91%E5%AE%9A%E5%A4%9A%E6%92%AD%E5%A7%94%E6%89%98)
-   [多播执行](/documentation/zh-cn/unreal-engine/multicast-delegates-in-unreal-engine#%E5%A4%9A%E6%92%AD%E6%89%A7%E8%A1%8C)