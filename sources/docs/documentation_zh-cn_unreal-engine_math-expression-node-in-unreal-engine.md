# 虚幻引擎数学表达式节点 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/math-expression-node-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:09.622Z

---

目录

![数学表达式节点](https://dev.epicgames.com/community/api/documentation/image/9e85d477-d14d-4c84-adcc-3f842496ab19?resizing_type=fill&width=1920&height=335)

要想创建一个数学表达式节点，请 **右击** 图表并从关联菜单中选择 **Add Math Expression（添加数学表达式）...** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5aa16bd5-7bbe-4d6a-a0ba-d7a126f9229d/addmathexpression.png)

数学表达式节点就像一个合并的图表。它是一个独立的节点，您可以 **双击** 它来打开构成其功能的子图表。 最初，该名称/表达式是空的。任何时候，当您重命名该节点时，都将会解析新表达式并生成新的子图表。

要想重命名该节点，并更新子图表，请 **右击** 该节点，并选择 **Rename（重命名）** 。

比如，您可以使用以下表达式来重命名该数学表达式节点：

```cpp
	(1+x)*sin(myVar)-2.4/rand()

```

这将会更新该数学表达式节点，使其具有两个浮点型输入 **X** 和 **MyVar** ，及一个浮点型输出。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f7d8c8a-1df4-4698-8eef-6e43e8760270/mathnodeexample.png)

如果您 **双击** 具有该表达式的节点，那么您将看到以下这个子图表：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c8c279b-d244-493a-ba40-57f7d842805b/mathnodeexpand.png)

子图表是根据以下规则创建的：

1.  字母名称 (以字母开头的符号) 应该变为数学表达式上的变量、输入引脚，或者函数调用。上面的示例中字母名称有： **x** 、 **sin** 、**myVar** 和 **rand** 。
    1.  如果一个字母名称和BSlueprint中的一个现有变量一样，那么它将变成一个变量获取节点 (也就是如果蓝图已经具有了 **myVar** 变量)。
    2.  如果字母名称后面有一个左括号(比如 **sin(** 和 **rand(** )，那么它将会变成一个函数节点。
    3.  如果之前的两种情形都不符合，那么该字母名称将会变成数学函数节点上的一个浮点型输入。
    4.  如果该名称匹配节点上现有引脚的名称，则还将被用于输入。
2.  数值常量将总是变成引脚输入。它们自身永远不会创建一个节点，但是会使用它们来填充其他节点的输入文本域。
3.  数学运算符(像+ 、\*、 -) 会变成函数节点。
4.  和数学运算中的处理一样，括号内的表达式具有优先权，需要优先计算。

## 变量

变量命名非常灵活，但是记住以下几点非常重要：

-   变量名称本身可以包含数字，但是不能以数字开头。
-   变量名称不能和隐藏的蓝图变量名称一样。
-   确保您正在使用正确的变量类型。比如， **boolVar+1.5** 就不是一个有效的表达式。

## 运算顺序

运算顺序如下所示(按照优先级从高到底的顺序)：

1.  括号内的表达式
2.  阶乘
3.  指数
4.  乘除法
5.  加减法

## 可用的蓝图函数

代码函数库中的蓝图纯函数应该都是可用的。这包括：

-   三角函数 (sin/cos/tan、asin、acos, 等):
    
    ```cpp
              sin(x)
    ```
    
-   区间限定函数 (min, max, clamp,等):
    
    ```cpp
              clamp(y,0,20)
    ```
    
-   四舍五入函数 (floor, fceil, round等):
    
    ```cpp
              round(z)
    ```
    
-   指数函数(square, power, sqrt, loge, e/exp等)
    

某些函数具有多个经常使用的名称。为了处理这个问题，同一个函数或节点会有几个相关联的别名。一些示例:

-   Power（幂数）别名: power, pow
-   三角函数 (asin/arcsin, acos/arccos, 等)

因为您正在输入函数，而不是连接引脚，所以请确保输入正确的数值及参数类型。如果数值和参数类型不匹配，那么该数学该表达式节点 将会显示一个错误。

## 基本结构体类型

在数学中，有一些经常要用到的基本结构体： 向量、变换等。您可以在表达式中轻松地创建及操作这些类型。

-   vector 关键字生成一个MakeVector节点:
    
    ```cpp
              vector(x,y,z)
    ```
    
-   rotator 关键字生成一个MakeRotator 节点:
    
    ```cpp
              rotator(x,y,z)
    ```
    
-   transform 关键字生成一个MakeTransform 节点:
    
    ```cpp
              transform(vec(x,y,z), rot(p,y,r), vec(6,5,4))
    		
    ```
    

正如某些函数有别名一样，向量和旋转量也有别名。

-   Vector（向量）别名
    
    ```cpp
              vector, vec, vect
    ```
    
-   Rotator（旋转量）别名
    
    ```cpp
              rotator, rot
    		
    ```
    

## 支持的操作符

支持以下所有操作符，这些操作符可以同逻辑操作符和比较操作符结合使用，来创建复杂的表达式。

-   乘除法操作符:
    
    ```cpp
              *, /, %
    ```
    
-   加减法操作符:
    
    ```cpp
              +, -
    ```
    
-   关系操作符:
    
    ```cpp
              <, >, <=, >=
    ```
    
-   等于:
    
    ```cpp
              ==, !=
    ```
    
-   逻辑操作符:
    
    ```cpp
              ||, &&, ^
    		
    ```
    

## 不支持的操作符

目前，不支持以下操作符。

-   条件操作符:
    
    ```cpp
              ?:
    ```
    
-   位操作符:
    
    ```cpp
              |, &, <<, >>
    ```
    
-   一元前缀操作符:
    
    ```cpp
              +, -, ++, --, ~, !  等。
    ```
    
-   后缀操作符:
    
    ```cpp
              ++, --, [] 等
    ```
    

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)
-   [special nodes](https://dev.epicgames.com/community/search?query=special%20nodes)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [变量](/documentation/zh-cn/unreal-engine/math-expression-node-in-unreal-engine#%E5%8F%98%E9%87%8F)
-   [运算顺序](/documentation/zh-cn/unreal-engine/math-expression-node-in-unreal-engine#%E8%BF%90%E7%AE%97%E9%A1%BA%E5%BA%8F)
-   [可用的蓝图函数](/documentation/zh-cn/unreal-engine/math-expression-node-in-unreal-engine#%E5%8F%AF%E7%94%A8%E7%9A%84%E8%93%9D%E5%9B%BE%E5%87%BD%E6%95%B0)
-   [基本结构体类型](/documentation/zh-cn/unreal-engine/math-expression-node-in-unreal-engine#%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84%E4%BD%93%E7%B1%BB%E5%9E%8B)
-   [支持的操作符](/documentation/zh-cn/unreal-engine/math-expression-node-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E6%93%8D%E4%BD%9C%E7%AC%A6)
-   [不支持的操作符](/documentation/zh-cn/unreal-engine/math-expression-node-in-unreal-engine#%E4%B8%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%93%8D%E4%BD%9C%E7%AC%A6)