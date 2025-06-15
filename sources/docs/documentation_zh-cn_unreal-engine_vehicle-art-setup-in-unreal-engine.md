# 虚幻引擎载具美术设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/vehicle-art-setup-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:53:13.093Z

---

目录

![载具美术设置](https://dev.epicgames.com/community/api/documentation/image/72e43800-dcc2-4a49-96ab-a76f2a42d7ca?resizing_type=fill&width=1920&height=335)

载具最基础、最少量的美术设置即为 **骨骼网格体**。载具的类型决定所需美术设置的复杂程度，对于悬挂 部分可能需要进行特殊考量。坦克不需要进行精细的悬挂设置，因为其悬挂部分未不可见。 但 **Vehicle Game** 中的越野大脚车则需要更多的连接点，使暴露在外组件的运动效果真实。

## 基础

载具网格体应向下指向正 X 轴。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2349bf43-8312-4e62-ba8f-63798178f706/basics01.png)

需要测量在虚幻引擎中使用的轮子半径（以厘米为单位）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65e0bffe-2223-4d20-9247-2e9d65cf4c91/wheelradius.png)

上图中，Maya 的距离测量工具基于两者相对的顶点距离得出轮子的直径。 轮子的半径即为该数值的一半。

3D Studio Max 的 Helpers 部分中也有类似工具。

## 连接点

四轮载具连接点的绝对最小数量为 5:1 根、4 轮。轮子和根连接点与 X 轴向前、Z 轴向上对齐：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10bd78db-20d8-47a6-9663-6257455080bf/wheeljnt.png)

可确保轮子在 Y 轴上旋转，在 Z 轴上转向。

其他所有节点均可按适当方式进行排列，但需注意诸如 **动画蓝图** **Look At** 节点之类的资产会假定 X 轴向前。

为防止出现视觉古怪，轮子的连接点应被精确居中。视觉网格体不会用于碰撞检测，然而如果轮子网格体偏移中心， 视觉上会感觉轮子已经损坏，出现动态模糊时十分明显。

## 蒙皮

Maya 的标准平滑绑定，或 3DS Max 的 Skin Modifier。轮子应只在一个连接点拥有权重，确保在旋转时不产生变形。对避震和支柱而言， 可使用一些技巧性的蒙皮，但需要虚幻编辑器层面上进行一些思考。

## 导出

载具作为 **骨骼网格体** 被导出，并且没有特别的注意事项。

## 导入

载具在导入时会采用与骨骼网格体相同的标准 FBX 导入方法。你需要启用导入器中的 **创建物理资产** 选项。

## 物理资产

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac2196c5-32e4-40f1-ab68-46aff0476753/paicon.png)

物理资产对载具十分重要，不应被忽视或忽略。首次在虚幻引擎中创建物理资产时，情况可能 与下图相似：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45a48fd4-c1b2-4883-a5ee-14d935faf9f7/badpa.png)

这是因为 **Physics Asset 工具**（**PhAT**）尝试将一个连接点的蒙皮顶点尽可能完善地包裹起来。您需要将它们全部删除并重新创建。 为什么呢？因为 PhAT 当前无法良好地重建支撑所有物理形体的约束。所以，如果作为中间媒介的 物理形体被删除后，层级上将不会创建一个新约束。不过，如果你删除所有物理形体，并从载具的根连接点进行构建，所有约束 均会被正确创建。

**骨架树（Skeleton Tree）** 面板中会显示默认的显示选项（仅物理形体）。删除所有内容。这会从资产中移除所有物理形体。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83798b75-8d7f-423f-b772-7979e8fa58f5/selectalldelete.png)

### 物理形体创建设置

1.  打开 **骨架树（Skeleton Tree）** 面板中的 **选项（Options）** 下拉菜单，然后选择 **显示所有骨骼（Show All Bones）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/621b5bcf-0d59-4035-867d-4283aa8b7fc5/showbones.png)
2.  在每个创建步骤中，都要确保 **工具** 面板中的 **形体创建（Body Creation）** 设置符合你的需要。有两个设置特别要注意：
    
    -   **最小骨骼尺寸（Min Bone Size）** 定义了一个骨骼必须多大才能为其创建物理体。请确保按照骨骼网格体设置为合适的大小。在这个示例中，我们将其设置为5。
    -   **图元类型（Primitive Type）** 控制物理形体的基本形状。你需要根据物理形体更改图元类型。
    -   在本示例中，其他选项都未更改。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d438e953-4d9f-43f4-b393-6c337492cbae/bodycreation.png)

### 创建形体碰撞

现在，从你的根关节开始，开始创建物理体。记住，只有需要模拟物理的关节，或者需要影响载具边界的关节， 才需要创建物理形体。

以我们的沙漠越野车为例，简单来说，只需为车身创建一个盒体，为四个车轮创建球体。但为了获得更好的效果， 还需创建其他一些物理形体。

1.  将 **形体图元类型（Body Creation Primitive Type）** 改为 **盒体（Box）**。
2.  右键点击 **骨架树** 中的 **rootJNT** 骨骼，打开 **上下文菜单（context menu）**。
3.  选择 **添加/替换形体（Add/Replace Bodies）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/102cb5df-18df-47a9-84df-e6d29d7293ab/bodytoroot.png)
4.  然后你可以 **移动**，**旋转** 以及 **缩放** 这个新的物理形体，以便让形状更加接近载具形状
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1e2bab5-4d7c-4a76-ae17-1a11587ac1c1/newbodyboxresultscaled.png)

这个创建好的的物理形体将作为剩余网格体的约束以及物理形体的根节点。你可以直接在 **图表** 面板中查看其关系，在骨架树面板中查看骨骼。

### 创建车轮碰撞

为车轮创建球体：

1.  将 **形体创建图元类型（Body Creation Primitive Type）** 改为 **球体（Sphere）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3199352b-5ffd-4255-b2e5-e9d863adcdaf/bodycreationsphere.png)
2.  右键点击 **骨架树** 中的车轮关节骨骼，打开 **上下文菜单（context menu）**。
3.  选择 **添加/替换形体（Add/Replace Bodies）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e23bd651-debb-4b93-a234-27d43af4a9b9/bodytowheel.png)
4.  选择为车轮新创建的物理形体，然后右键点击它，打开 **上下文菜单（context menu）**。
5.  在 **物理类型（Physics Type）** 中选择 **动力学（Kinematic）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1403e2e2-3919-40b8-91f5-c622eaaa68c1/makethewheelskin.png)
    
    你还可以在 **细节** 面板中的 **物理** 分段中更改 **物理类型**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c1d65cf-42c5-4fd0-89cd-d550c8098ac0/makethewheelskin_2.png)
    
    只有这样，车轮才能作用于载具，并且让阴影和剔除正确实现。此外，游戏开始后，也能防止车轮从车辆上 松开。
    
    车轮的物理形体不会用于碰撞。当前，车轮使用射线投射来确定如何与场景互动。
    

### 更进一步

以上只是为我们导入的载具模型创建的一个简单效果。在 Vehicle Game 示例中查看载具物理资产，应该如下图所示：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ffd2a7e-29af-4184-85ed-581dd25cc040/goodpa.png)

所有的碰撞形体都在载具的根连接点上，轮子的外部。它们可防止轮子被某些场景对象卡住。 还可防止轮胎与墙壁和栏杆之间发生穿插。

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [vehicles](https://dev.epicgames.com/community/search?query=vehicles)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [基础](/documentation/zh-cn/unreal-engine/vehicle-art-setup-in-unreal-engine#%E5%9F%BA%E7%A1%80)
-   [连接点](/documentation/zh-cn/unreal-engine/vehicle-art-setup-in-unreal-engine#%E8%BF%9E%E6%8E%A5%E7%82%B9)
-   [蒙皮](/documentation/zh-cn/unreal-engine/vehicle-art-setup-in-unreal-engine#%E8%92%99%E7%9A%AE)
-   [导出](/documentation/zh-cn/unreal-engine/vehicle-art-setup-in-unreal-engine#%E5%AF%BC%E5%87%BA)
-   [导入](/documentation/zh-cn/unreal-engine/vehicle-art-setup-in-unreal-engine#%E5%AF%BC%E5%85%A5)
-   [物理资产](/documentation/zh-cn/unreal-engine/vehicle-art-setup-in-unreal-engine#%E7%89%A9%E7%90%86%E8%B5%84%E4%BA%A7)
-   [物理形体创建设置](/documentation/zh-cn/unreal-engine/vehicle-art-setup-in-unreal-engine#%E7%89%A9%E7%90%86%E5%BD%A2%E4%BD%93%E5%88%9B%E5%BB%BA%E8%AE%BE%E7%BD%AE)
-   [创建形体碰撞](/documentation/zh-cn/unreal-engine/vehicle-art-setup-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%BD%A2%E4%BD%93%E7%A2%B0%E6%92%9E)
-   [创建车轮碰撞](/documentation/zh-cn/unreal-engine/vehicle-art-setup-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%BD%A6%E8%BD%AE%E7%A2%B0%E6%92%9E)
-   [更进一步](/documentation/zh-cn/unreal-engine/vehicle-art-setup-in-unreal-engine#%E6%9B%B4%E8%BF%9B%E4%B8%80%E6%AD%A5)