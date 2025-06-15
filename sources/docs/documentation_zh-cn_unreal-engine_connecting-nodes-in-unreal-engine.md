# 在虚幻引擎中连接节点 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/connecting-nodes-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:34:43.729Z

---

目录

![连接节点](https://dev.epicgames.com/community/api/documentation/image/92da33e1-2fdb-4ee5-b852-9d1ac971cbd6?resizing_type=fill&width=1920&height=335)

本页讲述在蓝图中的图表上连接节点的多种方法。

## 引脚至引脚连接

连接节点的最常用方法为 **引脚至引脚** 连接。

使用 **鼠标左键** 拖动一个引脚到另一个兼容的引脚上。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fbbc70f-e7d8-40de-aec9-5972c4183ec9/connectingnodes1.png)

鼠标悬停在一个兼容引脚上时将出现一个绿色的小勾。

尝试连接两个不兼容的引脚时，将出现图标提示节点无法连接的原因。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c541004d-9614-4993-be1f-7018799669c8/noncompatible.png)

引脚拥有典型的颜色编码，反映出它们接收的连接类型。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c3c54aa-21cc-4590-bf27-ae6417d89c70/colorcoded.png)

也存在连接两个不同类型引脚的情况，此时将创建一个 **转换节点**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9ea8ad8-3630-4595-896c-5cae1ab02b75/conversionnode1.png)

在上图中，我们将一个 Integer 输出和一个 String 输入连接起来。可以从提示文本中看到它即将被转换。

相连之后，两个引脚之间加入了一个新的转换节点。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d99ba86e-6958-4608-92a8-9bb72bb8c5a1/conversionnode2.png)

将引脚拖至图表中的空白处，以便放置新节点。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ace68dc-2a52-4932-ad5a-b1b44a35466c/placenodenode.png)

松开 **鼠标左键** 后将出现快捷菜单。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/313d621d-6181-4fbf-9ec7-affeb4b152f4/dragoffnode.png)

-   在 [放置节点](/documentation/zh-cn/unreal-engine/placing-nodes-in-unreal-engine) 中查阅快捷菜单的详细内容。

选择需要放置的节点后，节点将自动连接。

也可选取现有连接，将其连接到另一兼容的引脚上。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d3a8aa3-ab5c-4c9f-aeba-c855debd6dd4/movingwires1.png)

在上图实例中，长按 **Control** 键，点击引脚，将其拖至另一输入...

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/617e2ec3-5f57-4f9f-9f11-1170cdf087ac/movingwires2.png)

此操作将把连接移至另一引脚而无需重新连接。

### 引脚操作

如下表所示，一些额外引脚相关操作可用于节点。

![引脚操作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78fb2c05-9141-43c1-b4d1-977aaaecaf49/pinactions.png)

操作

命令

引脚相关的关联菜单

**右击** 引脚

着重显示连接线

**鼠标** 悬停到引脚上

连接到另一个引脚

**左击** + 拖拽到那个引脚

引脚的过滤后的操作菜单

**左击** + 拖拽到图表

断开所有连接

**Alt + 左击** 引脚

移动所有连接

**Ctrl + 鼠标左键** 拖拽到引脚

### 节点至节点连接

使用变量时可选择一些 **节点至节点** 连接，以节约时间。

举例来说，脚本中存在一个已连接的 **Set** 变量节点（在此节点中设置变量值），而您希望在无需重新连接脚本的前提下将其与另一变量交换。可拖动另一变量到希望改变的变量上，其将被自动切换并保持连接不断。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b35483fd-715f-4be6-844a-0326154d7f06/nodetonode1.png)

如上图所示，**Event Begin Play** 节点将 **Boolean Variable** 设为 false，需要将它换为我们创建的 **Float 变量**。拖动 Float 节点到 Set 变量上，提示文本将告知您正在执行的操作将使节点发生变化，将对 Float 变量进行写入或设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11df3e24-8814-4ce9-8c47-8879bd4448d7/nodetonode2.png)

确认执行此操作后，节点将切换为新节点，连接也不会断开。

可对已连接的 **Get** 节点执行相同操作（下图实例中正在更换 Bool 变量）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/293adb30-490e-48ab-b7c4-b5462a437691/nodetonode3.png)

## 拖放连接

使用变量的另一个捷径是执行 **拖放** （节点至引脚）连接。

在下图实例中，需要在 **Event Begin Play** 节点上设置 Point Light 的 light color。**Set Light Color** 节点询问 **New Light Color**，而我们已为其创建了一个 **Linear Color 变量**。在 **MyBlueprint** 窗口中，直接将该变量拖放至图表中的引脚上。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49ef0888-b9b0-4200-ba34-9f8641f202ac/nodetonode5.png)

执行此操作后，变量自动与节点相连。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc484696-6855-4dae-9a84-4b7c2708fc71/nodetonode6.png)

此方法可避免添加节点至图表，然后执行引脚至引脚连接的过程。

## 重设连接路线

使用复杂或大型蓝图时，可能会出现连线杂乱无章的状况，需要在图表中改变其显示方式，以便清楚可见。可利用选项添加一个 **Reroute** 节点，新增一个"延长线"类型到输出引脚，以便移动线路。

在下图实例中，输出引脚的线路隐藏在黄色框中的节点后面。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f690af5-3d1b-48b1-ba81-d8448e900368/reroute1.png)

拖动希望重设线路的输出引脚，选择 **Add Reroute Node** 选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11dbc764-8817-4ce0-addb-90e23ae8d792/reroute2.png)

此操作将在旧引脚连接的图表中创建一个新引脚。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22d555fe-d79b-4346-968c-24b5bcd14255/reroute3.png)

然后如下图所示拖动新引脚并将其和目标连接起来。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4d37306-ef66-412c-896b-9a8126d8124d/reroute4.png)

Reroute 节点作为旧引脚，可被拖离。可将新节点和它连接起来。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f2fa606-1363-4165-b468-f7b1f459ef7d/reroute5.png)

利用 Reroute 节点使蓝图整洁美观，使访问者对连接一目了然。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)
-   [execution flow](https://dev.epicgames.com/community/search?query=execution%20flow)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [引脚至引脚连接](/documentation/zh-cn/unreal-engine/connecting-nodes-in-unreal-engine#%E5%BC%95%E8%84%9A%E8%87%B3%E5%BC%95%E8%84%9A%E8%BF%9E%E6%8E%A5)
-   [引脚操作](/documentation/zh-cn/unreal-engine/connecting-nodes-in-unreal-engine#%E5%BC%95%E8%84%9A%E6%93%8D%E4%BD%9C)
-   [节点至节点连接](/documentation/zh-cn/unreal-engine/connecting-nodes-in-unreal-engine#%E8%8A%82%E7%82%B9%E8%87%B3%E8%8A%82%E7%82%B9%E8%BF%9E%E6%8E%A5)
-   [拖放连接](/documentation/zh-cn/unreal-engine/connecting-nodes-in-unreal-engine#%E6%8B%96%E6%94%BE%E8%BF%9E%E6%8E%A5)
-   [重设连接路线](/documentation/zh-cn/unreal-engine/connecting-nodes-in-unreal-engine#%E9%87%8D%E8%AE%BE%E8%BF%9E%E6%8E%A5%E8%B7%AF%E7%BA%BF)