# 在虚幻引擎中使用nDisplay群集事件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-cluster-events-with-ndisplay-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:23.476Z

---

目录

![使用nDisplay群集事件](https://dev.epicgames.com/community/api/documentation/image/e05110d9-3b82-4841-b622-6a5900113223?resizing_type=fill&width=1920&height=335)

群集事件是使nDisplay群集中所有节点同时对事件响应的一种方法。

1.  你可以在群集的节点中生成群集事件，也可从外部应用程序将其发送到主节点进行生成。参阅[从蓝图发射群集事件](/documentation/zh-cn/unreal-engine/using-cluster-events-with-ndisplay-in-unreal-engine#%E4%BB%8E%E8%93%9D%E5%9B%BE%E5%8F%91%E5%B0%84%E7%BE%A4%E9%9B%86%E4%BA%8B%E4%BB%B6)或[从外部应用程序发射群集事件](/documentation/zh-cn/unreal-engine/using-cluster-events-with-ndisplay-in-unreal-engine#%E4%BB%8E%E5%A4%96%E9%83%A8%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E5%8F%91%E5%B0%84%E7%BE%A4%E9%9B%86%E4%BA%8B%E4%BB%B6)。
2.  群集主节点收到群集事件时，其会将该事件传播到群集中的所有节点，以便在相同帧处的所有节点上发生该事件。
3.  在虚幻引擎应用程序的蓝图或C++逻辑中，设置监听器检测此类群集事件并使用项目所需gameplay逻辑进行响应。参阅[响应蓝图中的群集事件](/documentation/zh-cn/unreal-engine/using-cluster-events-with-ndisplay-in-unreal-engine#%E5%93%8D%E5%BA%94%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84%E7%BE%A4%E9%9B%86%E4%BA%8B%E4%BB%B6)。

## 群集事件格式

nDisplay支持两种群集事件格式：JSON和二进制。JSON格式属于可读格式，它采用ASCII编码，部分字符被JSON标准禁止，并且需要一个特定的模式来构造数据。采用二进制格式时，你可以使用任何种类的二进制数据，序列化和反序列化都由你决定。使用二进制格式的群集事件在数据吞吐量和延迟方面比JSON格式有更好的性能。

### JSON群集事件结构

每个JSON nDisplay群集事件都可以包含以下属性：

设置

类型

**命名**

字符串

**类型**

字符串

**类别**

字符串

**系统事件**

用于指定这是系统事件或用户事件的布尔值。你无需自己设置该选项。

**ShouldDiscardOnRepeat**

布尔值，用于指定在当前帧内已经收到的具有相同 **名称**、**类型** 和 **类别** 的事件是否应被丢弃。

**参数**

键值对的可选映射，其中的键和值均为字符串。

可在项目中决定发送到各属性中的数据，及监听器解译此类数据的方式。

与蓝图中的群集事件进行交互时，可使用 \*Make DisplayClusterClusterEvent **和** Break DisplayClusterClusterEvent\*\* 节点来构造和解构群集事件。例如：

![A JSON Cluster Event in Blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4773bbd-4632-4ea5-89b7-2b865a42ec3b/01-make-cluster-event-json_ue5.png)

在C++中，或者当你从自己的应用程序中发出JSON群集事件时，你需要使用[`FDisplayClusterClusterEventJson`](/documentation/en-us/unreal-engine/API/Plugins/DisplayCluster/Cluster/FDisplayClusterClusterEventJson)来表示相同的结构。

### 二进制群集事件结构

每个二进制群集事件都能包含以下几个属性。

设置

类型

**Event Id**

32位整型

**系统事件**

布尔值，用于指定是系统事件还是用户事件。你不需要自己设置这个选项。

**ShouldDiscardOnRepeat**

布尔值，用于指定在当前帧中已经收到的具有相同 **Event Id** 的事件是否应该被丢弃。

**事件数据**

字节数组

由你决定想在这些属性中发送什么数据，以及监听器如何解释这些数据。

当你在蓝图中与二进制集群事件交互时，你需要使用 **Make DisplayClusterClusterEventBinary** 和 **Break DisplayClusterClusterEventBinary** 节点来构造和解析二进制集群事件。比如：

![A Binary Cluster Event in Blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f27e7f43-2682-44d9-b9f8-336febaa144e/02-make-cluster-event-binary_ue5.png "A Binary Cluster Event in Blueprint")

在C++中，或者当你通过应用发送二进制集群事件时，你需要使用[`FDisplayClusterClusterEventBinary`](/documentation/en-us/unreal-engine/API/Plugins/DisplayCluster/Cluster/FDisplayClusterClusterEventBinar-)结构体来表示相同的结构。

### 从蓝图发送群集事件

以下示例展示了如何在蓝图类中发送JSON群集事件。你可以采用相同步骤并稍作修改，就能在蓝图类中发送二进制群集事件。

要从项目中的蓝图类发出JSON群集事件，请执行以下操作：

1.  获得 **DisplayCluster Module API**（请参阅上文的[蓝图API](/documentation/zh-cn/unreal-engine/ndisplay-overview-for-unreal-engine#%E8%93%9D%E5%9B%BEapi)），并调用其 **群集（Cluster） >** **（发射群集事件（接口函数）（Emits cluster event (接口调用)）** 函数。该节点向主节点发射群集事件，标记API中的主节点，再传播回群集中的所有节点。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05ab34dd-17ca-4b5b-a212-7b38bcf3eee6/03-emit-json-cluster-event_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05ab34dd-17ca-4b5b-a212-7b38bcf3eee6/03-emit-json-cluster-event_ue5.png)
    
    点击查看大图。
    
2.  在gameplay逻辑中计算该蓝图节点的虚幻引擎应用程序各实例，会默认发射该群集事件。如在群集中的众多不同节点上计算该蓝图图表，则可能产生该事件的多个副本。 为避免产生该群集事件的多个副本，可以在 **Emit JSON cluster event** 节点上设置 **仅主节点（Master Only）** 布尔值。如勾选此项，仅主节点会发射该群集事件。如其他非主群集节点计算相同的蓝图图表，此类节点将不会发射事件。
    
    ![Primary Only](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54ea07a6-65af-4531-8bc6-bf0b3215a5d9/04-emit-json-event-primary_ue5.png "Primary Only")
3.  从 **Emit JSON cluster event** 节点的 **事件（Event）** 端口向右拖出，并选择 **Make DisplayClusterClusterEventJson**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4af47dbd-4748-4509-ba2f-4b5ae9effa93/05-add-event_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4af47dbd-4748-4509-ba2f-4b5ae9effa93/05-add-event_ue5.png)
    
    点击查看大图。
    
4.  使用 **Make DisplayClusterClusterEventJson** 节点中的设置来设置群集事件，为其 **命名**、**类型** 和 **类别** 设置字符串值。如需要随群集事件传递任意键值数据，可将此类键和值的映射传到 **参数** 输入。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/886249a7-d543-4521-b417-efb51d320fa6/06-parameters-input_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/886249a7-d543-4521-b417-efb51d320fa6/06-parameters-input_ue5.png)
    
    点击查看大图。
    
5.  **编译** 并 **保存** 蓝图。
    

下次重新打包项目并重新启动nDisplay群集时，该蓝图代码将发射设置的群集事件。要在蓝图代码中其他位置响应该事件，参阅[响应蓝图中的群集事件](/documentation/zh-cn/unreal-engine/using-cluster-events-with-ndisplay-in-unreal-engine#%E5%93%8D%E5%BA%94%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84%E7%BE%A4%E9%9B%86%E4%BA%8B%E4%BB%B6)。

### 从外部应用程序发送群集事件

启动nDisplay群集后，主节点会开始监听从特定的本地端口传入的群集事件。通过连接该端口并发送消息，可在网络中其他计算机上运行的另一应用程序中，向nDisplay系统发射新的群集事件。JSON和二进制端口监听器都使用TCP，所以你可以保持连接开放，直到群集会话结束。

对于要发出的各群集节点，发送消息必须遵循以下条件：

-   前四个字节必须给定消息剩余部分的总长度。
-   消息的剩余部分应为群集事件的内容，以JSON对象表示。
    -   JSON事件消息：
        -   JSON对象必须包含字段 **名称**、**类型**、**类别**、**系统事件**和**ShouldDiscardOnRepeat**，**参数** 字段属于可选字段。
    -   二进制事件消息：
        -   4个字节用于事件ID。
        -   1个字节用于系统事件布尔值。
        -   1个字节用于 "Should Discard on Repeat" 布尔值。
        -   N个字节用于二进制数据，其中N没有限制。

例如，要发射命名为"quit"和类型为"command"的JSON群集事件，需要进行以下操作：

1.  构造一个包含群集节点值的JSON字符串。在本例中：
    
    ```cpp
            {"Name":"quit","Type":"command","Category":"","Parameters":{}}
    		
    ```
    
    **命名**、**类型** 和 **类别** 为必填字段，但可忽略参数字段。尽管有些字段是强制性的，但你可以给字段指定空值，因为带有空字段的事件将被分为一组。为了便于阅读，建议你提供名称和ID。
    
2.  获取JSON字符串的长度——在本例中为62个字符——并将该长度4个字节的二进制格式发送给nDisplay主节点。在本例中，它是 `0x00111110`。
3.  将JSON字符串发送到nDisplay主节点。

默认情况下，主节点会在41003端口监听群集事件，在41004端口上监听二进制群集事件。你可在nDisplay配置文件中更改此默认设置。参阅[更改nDisplay通信端口](/documentation/zh-cn/unreal-engine/changing-ndisplay-communication-ports-in-unreal-engine)。

要响应项目蓝图代码中的此类群集事件，参阅[响应蓝图中的群集事件](/documentation/zh-cn/unreal-engine/using-cluster-events-with-ndisplay-in-unreal-engine#%E5%93%8D%E5%BA%94%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84%E7%BE%A4%E9%9B%86%E4%BA%8B%E4%BB%B6)。

### 响应蓝图中的群集事件

设置上述方法之一将群集事件发送到nDisplay网络后，需设置蓝图（或C++）gameplay逻辑来检测此类群集事件并以对其响应。为此，需要创建并注册监听器：实现 **DisplayClusterClusterEventListener** 接口的类。可通过在nDisplay API中调用 **添加群集事件监听器（Add Cluster Event Listener）** 函数注册监听器，然后使用 **Event On Cluster Event** 节点来检测并响应群集事件。

例如，要新建蓝图类并将其注册为监听器：

1.  在 **内容浏览器** 中，右键点击并选择 **创建基础资源（Create a Basic Asset）> 蓝图类（Blueprint Class）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d58ee9c7-7d9c-418f-ad5e-7ca27db6c9fc/07-add-blueprint-class_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d58ee9c7-7d9c-418f-ad5e-7ca27db6c9fc/07-add-blueprint-class_ue5.png)
    
    点击查看大图。
    
2.  将 **Actor** 选为父类。 ![Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15e4d6cd-852a-487f-834d-21c8b9064662/08-actor-parent-class_ue5.png "Actor")
    
3.  在 **内容浏览器** 中输入新监听器类的命名。
    
    ![Rename the class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a96e9f8-e732-41f0-8445-5d7cf36d474b/09-name-blueprint-class_ue5.png "Rename the class")
4.  将类拖入关卡视口，并将其拖放到关卡中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53cfe667-eb87-4f34-9d59-f7ab18825956/10-add-cluster-event_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53cfe667-eb87-4f34-9d59-f7ab18825956/10-add-cluster-event_ue5.png)
    
    点击查看大图。
    
5.  双击新蓝图类可编辑。
    
6.  在工具栏中，点击 **类设置（Class Settings）**。 ![Class Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05aa0b65-deb4-4b43-aa61-61502d9892e6/11-class-settings_ue5.png "Class Settings")
    
7.  在 **细节** 面板中，找到 **接口（Interfaces）> 已实现接口（Implemented Interfaces）** 设置，然后点击 **添加**。
    
    ![Add interface](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0385071b-4218-437b-aa71-6737de1db37d/12-add-interfaces_ue5.png "Add interface")
8.  在列表中找到并选择 **DisplayClusterClusterEventListener** 接口。 ![DisplayClusterClusterEventListener](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01ef6e3d-5c91-491a-a561-7224d90c8ac2/13-display-cluster-event-listener_ue5.png "DisplayClusterClusterEventListener")
    
9.  点击工具栏中的 **编译** 以编译类。
    
10.  在 **事件图表（Event Graph）** 选项卡上，设置以下图表以注册监听器：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5b45dc2-77d0-463a-83f8-0213f430d769/14-event-cluster-listener_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5b45dc2-77d0-463a-83f8-0213f430d769/14-event-cluster-listener_ue5.png)
    
    点击查看大图。
    
    要进行此设置：
    
    1.  从 **Begin Play** 事件节点直接向右拖出并选择 **（N显示）N Display > （N显示）N Display > （获取DisplayCluster模块API）Get DisplayCluster Module API**。
    2.  从该节点的 **Out API** 端口直接向右拖出并选择 **显示群集（Display Cluster） > 群集（Cluster） > （添加群集时间监听器（接口调用）（Add cluster event listener）**。
    3.  最后，从 **Add cluster event listener** 节点的 **监听器** 端口向左拖出，并选择 **（变量）Variables > （获取自身引用）Get a reference to self**。
11.  如不再需要监听器时，建议将其销毁。例如，销毁蓝图Actor时可如下操作：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a3eaf09-f958-4a55-95d8-6f51d16b0fc0/15-remove-cluster-event-listener_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a3eaf09-f958-4a55-95d8-6f51d16b0fc0/15-remove-cluster-event-listener_ue5.png)
    
    点击查看大图。
    
    要进行这一设置，请执行以下操作：
    
    1.  右键点击事件图表并选择 **添加事件（Add Event） > 事件销毁（Event Destroyed）** 节点。
    2.  从 **Event Destroyed** 节点的输出向右拖出，并选择 **N显示（N Display） > 获取DisplayCluster模块API（Get DisplayCluster Module API）**。
    3.  从该节点的 **输出API（Out API）** 端口向右拖出，并选择 **显示群集（Display Cluster）> 群集（Cluster）> 移除群集事件监听器（Remove cluster event listener）(接口调用)**。
    4.  最后，从 **Remove cluster event listener** 节点的 **监听器（Listener）** 端口向左拖出，并选择 **变量（Variables）> 获取自身引用（Get a reference to self）**。
12.  在 **事件图表（Event Graph）** 另一个区域，添加 **Add Event > N Display > Event On Cluster Event Json** 节点。在nDisplay群集中发生群集事件时，均会触发该事件。 建议读取指定给该事件的设置和参数，以便用于确定蓝图需要采取的操作。为此，从事件 **On Cluster Event Json** 节点的 **事件** 端口向右拖出，并选择 **拆分DisplayClusterClusterEvent（Break DisplayClusterClusterEvent）**。 例如，该图表会将所有群集事件的命名值直接输出到屏幕上：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33d8ec6b-3c97-4f04-9177-00c6ff02350b/16-break-display-cluster_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33d8ec6b-3c97-4f04-9177-00c6ff02350b/16-break-display-cluster_ue5.png)
    
    点击查看大图。
    
13.  **编译** 并 **保存** 蓝图类。
    

下次在群集内，发送任何源中的JSON群集事件时，将打印该JSON群集事件命名到屏幕上。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [graphics](https://dev.epicgames.com/community/search?query=graphics)
-   [guide](https://dev.epicgames.com/community/search?query=guide)
-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [群集事件格式](/documentation/zh-cn/unreal-engine/using-cluster-events-with-ndisplay-in-unreal-engine#%E7%BE%A4%E9%9B%86%E4%BA%8B%E4%BB%B6%E6%A0%BC%E5%BC%8F)
-   [JSON群集事件结构](/documentation/zh-cn/unreal-engine/using-cluster-events-with-ndisplay-in-unreal-engine#json%E7%BE%A4%E9%9B%86%E4%BA%8B%E4%BB%B6%E7%BB%93%E6%9E%84)
-   [二进制群集事件结构](/documentation/zh-cn/unreal-engine/using-cluster-events-with-ndisplay-in-unreal-engine#%E4%BA%8C%E8%BF%9B%E5%88%B6%E7%BE%A4%E9%9B%86%E4%BA%8B%E4%BB%B6%E7%BB%93%E6%9E%84)
-   [从蓝图发送群集事件](/documentation/zh-cn/unreal-engine/using-cluster-events-with-ndisplay-in-unreal-engine#%E4%BB%8E%E8%93%9D%E5%9B%BE%E5%8F%91%E9%80%81%E7%BE%A4%E9%9B%86%E4%BA%8B%E4%BB%B6)
-   [从外部应用程序发送群集事件](/documentation/zh-cn/unreal-engine/using-cluster-events-with-ndisplay-in-unreal-engine#%E4%BB%8E%E5%A4%96%E9%83%A8%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E5%8F%91%E9%80%81%E7%BE%A4%E9%9B%86%E4%BA%8B%E4%BB%B6)
-   [响应蓝图中的群集事件](/documentation/zh-cn/unreal-engine/using-cluster-events-with-ndisplay-in-unreal-engine#%E5%93%8D%E5%BA%94%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84%E7%BE%A4%E9%9B%86%E4%BA%8B%E4%BB%B6)