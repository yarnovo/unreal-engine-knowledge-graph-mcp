# 虚幻引擎中的关键帧和曲线。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/keys-and-curves-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:13.092Z

---

目录

![关键帧和曲线](https://dev.epicgames.com/community/api/documentation/image/71c72e8b-2638-4a60-b260-44157a1e8fe8?resizing_type=fill&width=1920&height=335)

编程语言

×C++

从下拉菜单中选择一个选项以查看与之相关的内容

**曲线（Curve）**（**UCurveBase**）定义了要在给定范围内求值的内插点的轨道。 曲线可以是**向量**、**浮点**以及**颜色**。 所有轨道都可以有任意数量的**关键点**，用于定义时间或值。 数据可以内插到这些关键帧之间，以计算时间轴中任何点的值。

## 使用关键帧和曲线

在本例中，你将创建一个**UCurveFloat**，它会定义要在给定范围内求值的内插浮点的曲线。

要创建`UCurveFloat`并将其实例化为**时间轴组件**，请执行以下步骤：

1.  找到**内容浏览器**，点击**C++ Classes**文件夹，然后点击**添加（+）（Add (+)）**按钮并选择**新建C++类（New C++ Class）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/75f09885-df51-48b6-9bd9-e6b35dbbf45d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/75f09885-df51-48b6-9bd9-e6b35dbbf45d?resizing_type=fit)
    
2.  选择**Actor**作为**父类**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/0401c8f8-60ca-4283-b7a1-59c57c1975b4?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/0401c8f8-60ca-4283-b7a1-59c57c1975b4?resizing_type=fit)
    
    点击查看大图。
    
3.  将创建的Actor命名为**ExampleTimelineComponent**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/712a8845-7952-4063-b58b-d772eba67267?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/712a8845-7952-4063-b58b-d772eba67267?resizing_type=fit)
    
    点击查看大图。
    
4.  创建新的Actor时，**Visual Studio**会自动打开`ExampleTimelineComponent.h`和`ExampleTimelineComponent.cpp`文件。 找到`ExampleTimelineComponent.h`文件并将以下内容添加到`#include`分段中：
    
    ExampleTimelineComponent.h
    
    `#include "Components/TimelineComponent.h"`
    
    #include &quot;Components/TimelineComponent.h&quot;
    
    复制完整片段(1行长度)
    
5.  接下来，在`ExampleTimelineComponent`类定义中添加以下代码：
    
    ExampleTimelineComponent.h
    
    `   protected:              UPROPERTY(EditAnywhere, BlueprintReadWrite)           UTimelineComponent* ExampleTimelineComp;          public:              UPROPERTY(EditAnywhere)           UCurveFloat* ExampleTimelineCurve;         `
    
    protected: UPROPERTY(EditAnywhere, BlueprintReadWrite) UTimelineComponent\* ExampleTimelineComp; public: UPROPERTY(EditAnywhere) UCurveFloat\* ExampleTimelineCurve;
    
    复制完整片段(9行长度)
    
6.  编译你的代码。
    
7.  找到**内容浏览器**，选择**添加（+）（Add (+)）> 杂项（Miscellaneous）> 曲线（Curve）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/af972791-88bc-456b-9aa3-df3c556e261d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/af972791-88bc-456b-9aa3-df3c556e261d?resizing_type=fit)
    
8.  选择**CurveFloat**并将其命名为**ExampleFloatTrack**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/e0782ffe-53e2-4fb5-8d9a-edc236bc348c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e0782ffe-53e2-4fb5-8d9a-edc236bc348c?resizing_type=fit)
    
9.  在**内容浏览器**中，找到包含你的**ExampleTimelineComponent**类的文件夹，右键点击并选择**基于ExampleTimelineComponent创建蓝图类（Create Blueprint Class based on ExampleTimelineComponent）**。 将其命名为**BP\_ExampleTimelineComponent**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/e15b8bca-4792-48ba-880d-ace25ab7d9e0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e15b8bca-4792-48ba-880d-ace25ab7d9e0?resizing_type=fit)
    
10.  打开**BP\_ExampleTimelineComponent**类的默认值，找到**细节（Detail）**面板并分配带有**ExampleFloatTrack**的**示例时间轴曲线**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/35800ce7-3efd-4072-8a81-cc12f81f36e4?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/35800ce7-3efd-4072-8a81-cc12f81f36e4?resizing_type=fit)
    
11.  在内容浏览器中，双击你的**浮点轨道示例**，并打开**时间轴编辑器**。
    

## 添加关键帧

添加关键点的方式是按下**Enter**键，或右键点击灰色条并从上下文菜单选择操作**添加关键点（Add Key）**。

[![](https://dev.epicgames.com/community/api/documentation/image/f4df9f5c-0352-4095-8cbe-364a560a3b9d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f4df9f5c-0352-4095-8cbe-364a560a3b9d?resizing_type=fit)

## 编辑关键帧

要设置关键帧的时间和值，可点击该关键帧，在靠近轨道顶部的时间和值字段中输入值。

[![](https://dev.epicgames.com/community/api/documentation/image/b04a486d-181d-44ed-9713-d2157c2f616c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b04a486d-181d-44ed-9713-d2157c2f616c?resizing_type=fit)

## 删除关键帧

若要删除所选关键点，按键盘上的**Delete**键，或右键点击你想删除的关键点，并从上下文菜单中选择**删除（Delete）**操作即可。

## 移动关键帧

要将关键帧沿着时间轴移动，选择该关键帧并拖动它。 若要选择多个关键点，请使用**Ctrl**键。 水平方向拖动可以更新该关键点的**时间（Time）**值，垂直拖动则更新**值（Value）**。

## 关键帧插值

右键点击关键帧，将显示上下文菜单，用于选择所选关键帧的插值类型。

[![](https://dev.epicgames.com/community/api/documentation/image/2b68ac60-a25e-4124-9da4-46c412b14a5c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2b68ac60-a25e-4124-9da4-46c412b14a5c?resizing_type=fit)

关键帧插值仅影响内插的目标关键帧与其下一个关键帧之间的曲线。 例如，将所有其他关键点设为**线性（Linear）**，中央关键点设为**立方体自动（Cubic-Auto）**，则轨道将类似于下图。

[![](https://dev.epicgames.com/community/api/documentation/image/bd201a66-a53c-43ea-9ff9-a0cba0d714ed?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/bd201a66-a53c-43ea-9ff9-a0cba0d714ed?resizing_type=fit)

可用插值类型有：

-   **自动（Auto）**
    
    [![](https://dev.epicgames.com/community/api/documentation/image/508975f7-a1bf-432d-a2cf-cfeb80013460?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/508975f7-a1bf-432d-a2cf-cfeb80013460?resizing_type=fit)
    
-   **用户（User）**
    
    [![](https://dev.epicgames.com/community/api/documentation/image/8bd6f942-9132-4d00-a386-1b89f5f92ff2?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/8bd6f942-9132-4d00-a386-1b89f5f92ff2?resizing_type=fit)
    
-   **断裂（Break）**
    
    [![](https://dev.epicgames.com/community/api/documentation/image/3a3cfe1f-d062-4d7f-8685-cac4989b17b8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/3a3cfe1f-d062-4d7f-8685-cac4989b17b8?resizing_type=fit)
    
-   **线性（Linear）**
    
    [![](https://dev.epicgames.com/community/api/documentation/image/f11e7f85-b2b1-4886-b9c5-0462fd3c74e7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f11e7f85-b2b1-4886-b9c5-0462fd3c74e7?resizing_type=fit)
    
-   **常量（Constant）**
    
    [![](https://dev.epicgames.com/community/api/documentation/image/522e55a6-35d7-46a4-8b26-f1c8edc7f109?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/522e55a6-35d7-46a4-8b26-f1c8edc7f109?resizing_type=fit)
    

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [蓝图](https://dev.epicgames.com/community/search?query=%E8%93%9D%E5%9B%BE)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用关键帧和曲线](/documentation/zh-cn/unreal-engine/keys-and-curves-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%85%B3%E9%94%AE%E5%B8%A7%E5%92%8C%E6%9B%B2%E7%BA%BF)
-   [添加关键帧](/documentation/zh-cn/unreal-engine/keys-and-curves-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%85%B3%E9%94%AE%E5%B8%A7)
-   [编辑关键帧](/documentation/zh-cn/unreal-engine/keys-and-curves-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%85%B3%E9%94%AE%E5%B8%A7)
-   [删除关键帧](/documentation/zh-cn/unreal-engine/keys-and-curves-in-unreal-engine#%E5%88%A0%E9%99%A4%E5%85%B3%E9%94%AE%E5%B8%A7)
-   [移动关键帧](/documentation/zh-cn/unreal-engine/keys-and-curves-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E5%85%B3%E9%94%AE%E5%B8%A7)
-   [关键帧插值](/documentation/zh-cn/unreal-engine/keys-and-curves-in-unreal-engine#%E5%85%B3%E9%94%AE%E5%B8%A7%E6%8F%92%E5%80%BC)