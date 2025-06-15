# 与虚幻引擎像素流送系统交互 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/interacting-with-the-pixel-streaming-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:46:52.380Z

---

目录

![与像素流送系统交互](https://dev.epicgames.com/community/api/documentation/image/04acaffb-1675-4e04-b808-6ee726c18f10?resizing_type=fill&width=1920&height=335)

在按照[快速入门指南](/documentation/404)中的说明设置像素流系统时，你无需在虚幻引擎应用程序的游戏代码中执行特殊操作即可在运行时管理系统。但像素流送插件确实提供一些可选方式来控制像素流送系统和与其交互，以达到特定效果。本页介绍这些附加选项。

## 冻结帧

若将虚幻引擎应用程序渲染的每一帧都编码到媒体流送中，会有如下缺点：需要占用运行虚幻引擎的计算机的资产；通过网络发送所有帧会消耗带宽；根据可用带宽，编码可能会降低渲染图像的质量。

为了最大限度减少使用GPU资产和网络带宽，有时可能要暂时禁止像素流插件编码和发送每一帧，选择向已连接的客户端显示一张静态图像。例如：

-   若客户端未与应用程序积极交互，且虚拟场景中没有任何对象在移动，则可能需要应用程序冻结在最后一个渲染帧上，直到发生改变。
    
-   可能需要向客户端显示任意图像，例如加载屏幕或消息标题。
    

为此，像素流送插件提供可用于暂停和恢复编码的蓝图节点。可在蓝图编辑器中的 **像素流送冻结帧（Pixel Streaming Freeze Frame）** 类别中找到此类节点：

![像素流送冻结帧函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32e611bd-b730-433e-8221-b8724bb6b6e7/freeze-frame-category.png "Pixel Streaming Freeze Frame functions")

-   想要用静态图像替换媒体流送时，使用 **Freeze Frame** 节点。
    
    ![Freeze Frame节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1a4e89a-d567-4e8d-8078-32e0879fd5be/freeze-frame.png "Freeze Frame node")
    
    此节点接受对纹理资产的可选引用。若提供一个，已连接的客户端将在播放器窗口中看到指定的纹理。若未提供，连接客户端将看到你调用此节点时虚幻引擎应用程序生成的最后一个渲染帧。
    
-   想要恢复每帧流送时，使用 **Unfreeze Frame** 节点。
    
    ![Unfreeze Frame节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07321194-03e8-49a9-945e-72419d4fef3a/unfreeze-frame.png "Unfreeze Frame node")

冻结在单个帧或图像纹理上不会影响来自浏览器的输入。冻结后，默认情况下，播放器页面仍会将键盘和鼠标事件发送到虚幻引擎。

## 从UE5到播放器页面的通信

虚幻引擎应用程序可以向所有连接的播放器HTML页面发送自定义事件，你可在播放器的JavaScript环境中响应这些事件。这样，你可以根据Gameplay事件更改网页UI。

要执行此设置：

1.  在虚幻引擎应用程序中，每当要向播放器页面发送事件时，使用 **Pixel Streaming > Send Pixel Streaming Response** 节点。向该节点指定一个自定义字符串参数，以向播放器页面表明已发生的事件。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25410ec3-8097-465c-9702-06cd66411010/send_pixel_streaming_response.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25410ec3-8097-465c-9702-06cd66411010/send_pixel_streaming_response.jpg)
    
    点击查看大图。
    
    或者举个更常见的示例（按3键时，将向播放器发送响应）：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8090b33e-7261-4584-931a-44e141173aa4/send_ps_response_example.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8090b33e-7261-4584-931a-44e141173aa4/send_ps_response_example.jpg)
    
    点击查看大图。
    
2.  在播放器页面的JavaScript中，你将需要写入一个自定义事件处理程序函数，每当该页面从虚幻引擎应用程序收到响应事件时，都将调用此函数。它会收到由 **Send Pixel Streaming Response** 节点发送的原始字符串参数。例如：
    
    ```cpp
            function myHandleResponseFunction(data) {
                console.warn("Response received!");
                switch (data) {
                    case "MyCustomEvent":
                        ...// 处理一种事件类型
                    case "AnotherEvent":
                        ...// 处理另一个事件
                }
            }
    ```
    
3.  调用 `app.js` 提供的 `addResponseEventListener` 函数来注册监听器函数。为事件监听器向此函数传递一个唯一名称以及你的函数。例如：
    
    ```cpp
        addResponseEventListener("handle_responses", myHandleResponseFunction);
    ```
    
4.  如果需要删除你的事件监听器，可调用 `removeResponseEventListener` 并传递同一名称。例如：
    
    ```cpp
        removeResponseEventListener("handle_responses");
    ```
    

若要传递更复杂的数据，可以将你传递给 **Send Pixel Streaming Response** 节点的字符串格式化为JSON。例如：

![Send Pixel Streaming response using JSON](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a905477-4459-49a1-ae06-be95cd8ad7ae/pixelstreaming-send-game-event-json.png "Send Pixel Streaming response using JSON")

## 响应像素流送事件

像素流送系统向应用程序游戏进程代码提供了一种方法，以便响应像素流送会话过程中发生的选定事件。这些事件有两种版本：蓝图事件和原生C++事件：

### 蓝图事件

这些委托可以通过UE5的蓝图编辑器访问。

事件

说明

**OnNewConnection**

当新客户端连接到虚幻引擎应用程序的实例时发射。

**OnConnectionClosed**

在连接到虚幻引擎应用程序的此实例的客户端断开连接时发射。

**所有连接关闭时（On All Connections Closed）**

当连接此虚幻引擎应用程序实例的最后一个客户端断开连接时发出。发出此事件后，将没有客户端查看应用程序的媒体流送。可利用此机会让游戏逻辑将应用程序重置为初始状态，为加入新客户端做准备。

**OnStatChanged**

用 `FPixelStreamingPlayerId, FName, float` （播放器ID、统计数据名称和统计数据值）的格式报告不同的像素流统计数据。

以下蓝图事件只对Pixel Streaming 2可用。

事件

说明

**OnDataTrackOpen**

当连接到虚幻引擎应用程序的客户端打开数据追踪时发射。

**OnDataTrackClose**

当连接到虚幻引擎应用程序的客户端关闭数据追踪时发射。

**OnFallbacktoSoftwareEncoding**

当循环 引擎应用程序的硬件编码会话耗尽时发射。

为了响应此类事件，可利用 **像素流送器委托（Pixel Streamer delegate）** 类进行绑定。通常在游戏开始时设置此绑定；例如，为了响应 **开始播放事件（Event BeginPlay）** 事件。设置绑定后，每当触发绑定事件时将触发自定义事件。

1.  在蓝图图表编辑器中，从任意节点的执行引脚向右拖动，并选择 **Pixel Streamer Delegates> Get Pixel Streamer Delegates** 。
    
    ![Get Pixel Streamer Delegates](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89b910b5-9371-44c2-a2f1-d3a1e421e09d/delegates-1.png "Get Pixel Streamer Delegates")
2.  从 **返回值（Return Value）** 向右拖动，展开 **像素流送器委托（Pixel Streamer Delegates）** 类别。将看到许多用于绑定和取消绑定事件的新选项。
    
    ![Pixel Streamer Delegates节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70f7544f-2ad3-4590-b326-e2b8cbe70a3e/delegates-2.png "Pixel Streamer Delegates nodes")
3.  为要响应的事件选择 **绑定...（Bind...）** 选项，例如 **绑定事件至所有连接关闭时（Bind Event to On All Connections Closed）** 。将获得一个带有 **事件（Event）** 输入的新节点。将其输入执行引脚连接到 **Get Pixel Streamer Delegates** 中的输出执行引脚。
    
    ![绑定委托](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d694a677-3667-4192-8eab-146d991070f0/delegates-3.png "Bind Delegate")
4.  若你已有想要触发的自定义事件，则将其标题栏中的 **输出委托（Output Delegate）** 引脚连接到刚创建的 **Bind** 节点上的 **事件（Event）** 输入。否则，从 **事件（Event）** 输入中向左拖动并选择 **添加事件（Add Event）> 添加自定义事件（Add Custom Event）** 以创建新的自定义事件。
    
    ![自定义事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d412301-7bf1-4b7c-8db3-e2e48f78bef1/delegates-4.png "Custom Event")
5.  将自定义事件连接到想要运行以响应像素流送事件的蓝图逻辑。
    

例如，此实现调用在同一个蓝图中所定义的自定义函数来将应用程序重置为初始状态：

![响应自定义事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40147de8-e25c-4a2d-942b-cb476920086b/delegates-5.png "Respond to the custom event")

### C++事件

开发人员可以将自己的处理程序注册到这些像素流送委托。我们推荐开发人员参阅此页面：[多播代理](/documentation/zh-cn/unreal-engine/multicast-delegates-in-unreal-engine)，了解有关虚幻引擎中C++委托用法的具体信息。使用像素流送委托的一个简单示例如下：

```cpp
	#include "PixelStreamingDelegates.h"

	void FExample::OnStatChanged(FString PlayerId, FName StatName, float StatValue)
	{
	//待办事项：针对更改的统计数据执行某个操作。
	}

	void FExample::BindToDelegates()
	{
	// 绑定到OnStatChangedNative委托。
	if(UPixelStreamingDelegates* Delegates = UPixelStreamingDelegates::Get())
	{
	Delegates->OnStatChangedNative.AddRaw(this, &FExample::OnStatChanged);
	}
	};
```

-   [guide](https://dev.epicgames.com/community/search?query=guide)
-   [pixel streaming](https://dev.epicgames.com/community/search?query=pixel%20streaming)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [冻结帧](/documentation/zh-cn/unreal-engine/interacting-with-the-pixel-streaming-system-in-unreal-engine#%E5%86%BB%E7%BB%93%E5%B8%A7)
-   [从UE5到播放器页面的通信](/documentation/zh-cn/unreal-engine/interacting-with-the-pixel-streaming-system-in-unreal-engine#%E4%BB%8Eue5%E5%88%B0%E6%92%AD%E6%94%BE%E5%99%A8%E9%A1%B5%E9%9D%A2%E7%9A%84%E9%80%9A%E4%BF%A1)
-   [响应像素流送事件](/documentation/zh-cn/unreal-engine/interacting-with-the-pixel-streaming-system-in-unreal-engine#%E5%93%8D%E5%BA%94%E5%83%8F%E7%B4%A0%E6%B5%81%E9%80%81%E4%BA%8B%E4%BB%B6)
-   [蓝图事件](/documentation/zh-cn/unreal-engine/interacting-with-the-pixel-streaming-system-in-unreal-engine#%E8%93%9D%E5%9B%BE%E4%BA%8B%E4%BB%B6)
-   [C++事件](/documentation/zh-cn/unreal-engine/interacting-with-the-pixel-streaming-system-in-unreal-engine#c++%E4%BA%8B%E4%BB%B6)

相关文档

[

虚幻引擎中的像素流送入门

![虚幻引擎中的像素流送入门](https://dev.epicgames.com/community/api/documentation/image/0180f07a-4fa9-49f9-aca0-846ea9104203?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/getting-started-with-pixel-streaming-in-unreal-engine)