# DMX概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dmx-overview
> 
> 生成时间: 2025-06-14T20:29:21.611Z

---

目录

![DMX概述](https://dev.epicgames.com/community/api/documentation/image/0f70596c-0af1-442b-bae0-d27ed66c101a?resizing_type=fill&width=1920&height=335)

## 什么是DMX？

[DMX](https://en.wikipedia.org/wiki/DMX512)表示"数字多路复用"，是在现场活动场地中常用来控制简单到复杂的舞台光照和效果的数字通信网络标准。DMX最初用作控制调光器的标准方法，在DMX512之前，它已采用各种不兼容的专有协议。很快，它成为了连接控制器（例如照明控制台）与调光器和特效设备（例如烟雾机和智能灯）的主要方法。

DMX还扩展到非剧场室内和建筑光照应用中，从圣诞灯串到电子公告板，使用范围广泛。DMX现在几乎可以用来控制一切，它在剧院和现场都很受欢迎。DMX在整个行业广泛使用，可以控制各种设备，例如光照灯具、激光器、烟雾机、机械设备等。

现在，在虚拟制片中，DMX越来越受青睐，在两个方面都得到运用。首先，使用光照台控制和触发虚幻中的事件。其次，驱动大量启用了DMX的光照灯具和设备，例如，通过利用像素映射工具，其中生成的图像和像素用于驱动灯具RGB值。最后，另一个值得强调的重要用例是，为拥有DMX技术支持的演出、项目和虚拟制片设置在UE中呈现高质量的视觉预览。

## 协议

我们添加了DMX功能，同时支持 **[Art-Net](https://en.wikipedia.org/wiki/Art-Net)** 和 **[sACN](https://en.wikipedia.org/wiki/Architecture_for_Control_Networks)** 行业变体。

Art-Net和sACN是网络协议，允许通过以太网（IP）聚合并发送DMX数据。Art-Net允许沿单根网络电缆向下发送32,768个域。尽管Artnet是较旧的协议，但受到更多设备的支持。sACN（控制网络的流送架构）当前似乎更流行，允许通过单根网线运行63,999个DMX数据域。

## DMX数据

DMX可以被视为从一个位置（即源头）发送到另一个位置（即目的地）的数字信息包。每个包都创建于某个源，其中包含应由某些收件人接收和读取的特定信息。每个数据包的结构经过精心设计，如果你想进一步了解其硬件级别工作原理，请阅读 **[ESTA标准](https://tsp.esta.org/tsp/documents/docs/ANSI-ESTA_E1-11_2008R2018.pdf)** 。就我们而言，我们仅关注其中包含的数据。每个包包含一个512字节的数组，其中每个字节包含0-255范围内的值。

![DMX数据结构](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81cc2411-7cca-4e51-99a9-3747900552d3/dmx-data.png)

每个字节通常称为一个 **信道（Channel）** 。由512个信道构成的传输包通常称为一个 **域（Universe）** 。

## DMX使用虚幻引擎

使用虚幻引擎，你可以直接使用DMX通过以太网使用接口设备控制灯具。UE可以充当信号源，使用Art-Net或sACN协议将数据传输到DMX，然后传输到构成安装的菊链式灯具，还会直接接收并解译从灯具发回的DMX消息。

你还可以使用UE处理光照控制台，可以解译并传递所连接DMX灯具的光照控制台发送的DMX说明，或将有关UE中渲染的场景的DMX数据发送到光照控制台。

![联网到计算机的灯具充当DMX控制台](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f39d0c0-aa56-4976-9c3c-7118a8444c2b/console-organization.png)

此处，虚幻引擎会在充当DMX数据源的计算机上运行。 要查看图像源，请点击此处。

此引擎版本中未实现对USB接口的支持。

## DMX灯具

实际上，DMX灯具是负责根据接收到的数据接收和执行命令的设备。这可能意味着打开或关闭光源或将设备旋转90度。DMX灯具有很多种，从只能开关的标准舞台光源，到具备多方向旋转和滤光器的智能光源，应有尽有。

每个灯具都有一组在硬件级别上预定义的属性/命令。这些属性已划分到称为 **模式（Modes）** 的各种功能组。灯具通常包含多个模式，用于预定义灯具将响应的可用属性并启用或禁用特定功能。

灯具制造商为用户提供了不同的模式选项，以便他们可以适应各种用例，包括尽可能多的功能，同时允许用户选择对自己最重要的功能。这样形成了最简单、最少信道数模式；复杂、庞大的信道模式；以及一些中间模式。在专业光照实践中，很多时候都会选择中间模式，以在功能和易控制性之间取得平衡，并更加节省地使用DMX信道数。

每种模式都包含一组属性。属性负责指示硬件如何响应收到的DMX数据。在大多数情况下，你可以在设备随附的灯具手册中找到特定灯具的所有属性。

![DMX灯具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1b41574-22d4-40cb-9b30-0fbd8493b0d8/dmx-light-fixtures.png "DMX light fixtures")

请参阅[DMX灯具](/documentation/404)文档，了解更多信息。

## 信号通信

接下来让我们了解一下UE和灯具如何使用DMX相互通信。UE可以驱动一个或多个域，其中每个域都以长串菊链串接多个灯具。你可以将域视为一组已寻址灯具的标识形式。要将数据发送到相应的灯具，你还需要将其发送到正确的域。

当你命令UE分发DMX数据包后，UE将定位相应的域，并沿着灯具链发送数据包，以供每个已连接灯具接收和解译。每个灯具接收相同的数据包，并且如果该数据包包含适用于该灯具的数据，则执行内部命令。灯具读取数据后，数据会沿链向下传递到下一个灯具，重复该过程。要确保灯具接收正确的信息，它必须在正确的地址侦听正确的数据。这里引入了灯具寻址或"配接"概念，下一节会详细介绍。

在下面，你可以查看信号层级和数据使用情况的概述。

![DMX网络的逻辑组织](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42e8eedb-5004-41a2-8a14-8c70cc369e88/dmx-network-org.png)

**名称**

**说明**

域

每个域可以包含许多以菊链形式连接在一起的灯具，每个域最多512字节。

灯具

每个灯具在域中占用一个或多个地址。

起始地址

灯具的起始地址确定灯具应该如何解译接收到的DMX数据包（字节数组中的单个索引）。

属性

一个灯具包含一组由其当前模式定义的属性，每个属性都具有一个由其属性编号（信道）加上起始地址确定的地址（见下图"灯具配接"下的示例）。

## 灯具配接

灯具配接的概念源自这一理念：即你需要能够沿通讯链虚拟放置灯具，以便接收相应的数据。由于UE使用DMX发送要由多个灯具读取的完整数据包，因此必须设法让灯具准确识别该包中应读取和解译的字节和应忽略的字节。

这可通过在域中的特定起始地址处指定每个灯具来完成。起始地址范围为1到512（你的DMX数据包中值的数量上限）。将灯具分配给特定的起始地址时，它会占用一定范围内的地址，即从指定起始地址，到该起始地址加上灯具在其当前模式下包含的属性数量。

请参阅以下示例：

![示例域中的地址范围。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/773fc2bc-beba-4f77-84df-06469e1bba86/universe-addresses.png)

**灯具2** 当前模式 = 8ChannelMode（包含 **8** 种属性）

1.  红（地址8）
    
2.  绿（地址9）
    
3.  蓝（地址10）
    
4.  频闪（地址11）
    
5.  平移（地址12）
    
6.  倾斜（地址13）
    
7.  宏（地址15）
    

**起始地址** = 8

**地址范围** = 8 - 15

使用上面的示例，为了进行平移，灯具将侦听地址12，以便获取0-255之间的字节值，这将最终控制灯具在其定义的旋转范围内平移的数量。

#### 属性分辨率

通常，属性将使用单个字节的输入范围（例如0-255）。有时，需要更高的分辨率实现更高精度的运动或光照控制。在这种情况下，属性采用更大的输入范围，该范围由多个字节而不是一个字节构成。多个字节的组合可能导致控制特定属性的值更高。下面是可能的属性信号类型。

1.  **8位属性** - 最小值：0，最大值：255 - 占用1个地址
    
2.  **16位属性** - 最小值：0，最大值：65,536 - 占用2个地址
    
3.  **24位属性** - 最小值：0，最大值：16,777,215 - 占用3个地址
    
4.  **32位属性** - 最小值：0，最大值：4,294,967,296 - 占用4个地址
    

当需要一个使用超过8位的属性时，该属性在域中会占用多个地址。根据分辨率情况，它可以占用多个连续的地址。你可以在上面的列表中看到属性将占用的地址数量。

## DMX网络通信

过去几年，发送DMX数据的网络通信方法变得日益流行和重要。随着演出规模变得越来越大，灯具数量增加，用户越来越需要快速、高效和可靠地处理更多灯具。

要克服DMX的信道限制，同时仍然使用DMX的结构，以太网协议应运而生。这些协议允许通过单根Cat5电缆传输多个DMX域中的数据。UE DMX插件支持两种使用最广泛的以太网协议：Art-Net和sACN。

### Art-Net

Art-Net是免版权使用费的通信协议，用于通过UDP传输DMX512-A光照控制协议和远程设备管理（RDM）协议。它用于在"节点"（例如，智能光照设备）和"服务器"（运行光照控制软件（在本例中即UE）的光照台或通用计算机）之间进行通信。

可以在[Art-Net网站](https://art-net.org.uk/structure/the-technology/)上找到有关Art-Net协议的更多详细信息。

### sACN

控制网络的流送架构（sACN）是ESTA开发的一种标准协议，用于通过网络高效传输DMX域数据。它在很多方面都可以和ArtNet匹敌。它可带来的一项优势是多播选项支持非常简易的配置。sACN是用于控制大量RGB LED的流行协议。

# 协议集成

虚幻引擎DMX插件提供通过sACN和Art-Net协议变体接收和发送DMX数据的跨平台支持。由于Art-Net和sACN都是UDP网络协议，因此，虚幻引擎现有的网络消息功能现在可以在本地实现基于虚幻引擎架编译的每个协议。

此插件集成了Art-Net协议的最新版本Art-Net 4。Art-Net 4的理论限制为32,768个域或端口地址（即32千层域），而Art-Net 3的域限制为256个。

有关完整的Art-Net 4协议规范，可以在[此处](https://artisticlicence.com/WebSiteMaster/User%20Guides/art-net.pdf)找到官方文档。

有关sACN协议的已发布文档，请访问此[链接](https://tsp.esta.org/tsp/documents/published_docs.php)。

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [dmx](https://dev.epicgames.com/community/search?query=dmx)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [什么是DMX？](/documentation/zh-cn/unreal-engine/dmx-overview#%E4%BB%80%E4%B9%88%E6%98%AFdmx%EF%BC%9F)
-   [协议](/documentation/zh-cn/unreal-engine/dmx-overview#%E5%8D%8F%E8%AE%AE)
-   [DMX数据](/documentation/zh-cn/unreal-engine/dmx-overview#dmx%E6%95%B0%E6%8D%AE)
-   [DMX使用虚幻引擎](/documentation/zh-cn/unreal-engine/dmx-overview#dmx%E4%BD%BF%E7%94%A8%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)
-   [DMX灯具](/documentation/zh-cn/unreal-engine/dmx-overview#dmx%E7%81%AF%E5%85%B7)
-   [信号通信](/documentation/zh-cn/unreal-engine/dmx-overview#%E4%BF%A1%E5%8F%B7%E9%80%9A%E4%BF%A1)
-   [灯具配接](/documentation/zh-cn/unreal-engine/dmx-overview#%E7%81%AF%E5%85%B7%E9%85%8D%E6%8E%A5)
-   [属性分辨率](/documentation/zh-cn/unreal-engine/dmx-overview#%E5%B1%9E%E6%80%A7%E5%88%86%E8%BE%A8%E7%8E%87)
-   [DMX网络通信](/documentation/zh-cn/unreal-engine/dmx-overview#dmx%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1)
-   [Art-Net](/documentation/zh-cn/unreal-engine/dmx-overview#art-net)
-   [sACN](/documentation/zh-cn/unreal-engine/dmx-overview#sacn)
-   [协议集成](/documentation/zh-cn/unreal-engine/dmx-overview#%E5%8D%8F%E8%AE%AE%E9%9B%86%E6%88%90)