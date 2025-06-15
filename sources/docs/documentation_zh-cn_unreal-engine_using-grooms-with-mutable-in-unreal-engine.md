# 在虚幻引擎中使用Groom和Mutable | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-grooms-with-mutable-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:03:39.126Z

---

目录

![使用Groom和Mutable](https://dev.epicgames.com/community/api/documentation/image/04491163-b931-4e6f-810d-3da7d020536b?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

## 要求

要搭配使用[Groom](/documentation/zh-cn/unreal-engine/hair-rendering-and-simulation-in-unreal-engine)和Mutable，需要在 **项目设置（Project Settings）** 中开启 **Grooms Extensions For Mutable** 插件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9933fe7-e48c-46eb-91a0-0f2cd88b0e40/groom-ext-plugin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9933fe7-e48c-46eb-91a0-0f2cd88b0e40/groom-ext-plugin.png)

启用后，你将在现有 **Object** 节点上看到一个新的引脚。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36a56494-f3af-491f-8467-7d05f523fdc3/groom-pin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36a56494-f3af-491f-8467-7d05f523fdc3/groom-pin.png)

## 用法

Groom可以被添加到由Mutable标记的所有骨骼网格体组件上（请参阅[节点网格体组件](https://github.com/anticto/Mutable-Documentation/wiki/Node-Mesh-Component)）。Groom组件作为被标记骨骼网格体组件的子级被动态创建。

要使用Groom，请执行以下操作：

1.  创建一个新的Groom Constant节点，并使用组件名称指定要绑定到的组件。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1f15870-dc80-4448-8159-72dcf711bde5/groom-constants.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1f15870-dc80-4448-8159-72dcf711bde5/groom-constants.png)
    
2.  在 **节点属性（Node Properties）** 面板中，指定 **Groom资产（Groom Asset）** 和 **绑定资产（Binding Asset）** 。绑定资产必须具有与绑定的骨骼网格体组件中的 **目标骨骼网格体（Target Skeletal Mesh）** 相同的骨骼网格体。其他属性将被自动复制到动态创建的Groom组件中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67fb778a-7dba-4634-8d0e-ecec4a6192d3/node-properties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67fb778a-7dba-4634-8d0e-ecec4a6192d3/node-properties.png)
    
3.  将新节点连接到 **Object** 节点。请注意，Groom Constant节点可以使用Group节点有条件地被激活。
    

## 当前局限

-   修饰符节点无法应用于由groom绑定的网格体组件。
-   Mutable生成的骨骼网格体的LOD数量必须与绑定资产中的源骨骼网格体的LOD数量相同。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [grooms](https://dev.epicgames.com/community/search?query=grooms)
-   [mutable](https://dev.epicgames.com/community/search?query=mutable)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [要求](/documentation/zh-cn/unreal-engine/using-grooms-with-mutable-in-unreal-engine#%E8%A6%81%E6%B1%82)
-   [用法](/documentation/zh-cn/unreal-engine/using-grooms-with-mutable-in-unreal-engine#%E7%94%A8%E6%B3%95)
-   [当前局限](/documentation/zh-cn/unreal-engine/using-grooms-with-mutable-in-unreal-engine#%E5%BD%93%E5%89%8D%E5%B1%80%E9%99%90)