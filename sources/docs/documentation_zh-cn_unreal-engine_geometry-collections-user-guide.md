# 几何体集合用户指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/geometry-collections-user-guide
> 
> 生成时间: 2025-06-14T19:48:13.610Z

---

目录

![几何体集合用户指南](https://dev.epicgames.com/community/api/documentation/image/7a27f112-e72a-46d0-9b2b-753166b8bc37?resizing_type=fill&width=1920&height=335)

你可以在Epic开发者社区站点上观看[Chaos破坏系统 - 几何体集合](https://dev.epicgames.com/community/learning/tutorials/yrXz/chaos-destruction-geometry-collections)教程，找到视频格式的类似信息。

Chaos系统中的破坏系统从 **几何体集合（Geometry Collection）** 资产开始。这些资产可以从一个或多个静态网格体、带有静态网格体组件的蓝图、甚至是其他几何体集合构建。

拥有几何体集合之后，你可以使用[破裂模式](/documentation/zh-cn/unreal-engine/destruction-overview)将其分开，并定义设置用于确定分开方式。

在本指南中，你将学习如何通过可用于Chaos破坏系统的不同源对象创建几何体集合，以及了解最佳实践来确保最佳模拟结果。

## 创建几何体集合

### 创建几何体集合资产

执行以下步骤，创建几何体集合资产。

1.  在场景中选择兼容的Actor，点击 **模式（Mode）** 下拉菜单并选择 **破裂（Fracture）** 。
    
    ![从](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92cab8e2-f12a-46fc-9794-86c828554741/destruction-geo-col-2.png)
    
    这将打开 **破裂模式（Fracture Mode）** 窗口，其中包含用于使网格体破裂的所有工具。你也可以按 **Shift-6** 切换到破裂模式。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d5ab7f9-17e6-4772-8048-b6e132f53452/destruction-geo-col-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d5ab7f9-17e6-4772-8048-b6e132f53452/destruction-geo-col-3.png)
    
    点击查看完整视图。
    
2.  在 **生成（Generate）** 分段中，点击 **新建（New）** 创建新的 **几何体集合（Geometry Collection）** 。
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a44ae66e-9083-4c57-861c-c0d884ee5f16/destruction-geo-col-4.png)
    
    此资产类型将保存在内容浏览器中，并将用于创建你的破裂网格体。
    
    1.(1) 选择几何体集合将保存到的目录位置。
    
    1.(2) 输入几何体集合资产的名称。
    
    1.(3) 点击"创建几何体集合（Create Geometry Collection）"。
    
    ![选择目录位置，输入资产名称，并点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3215f221-9536-41a5-85ef-12efdd26a225/destruction-geo-col-5.png)
    1.  在内容浏览器中点击"全部保存（Save All）"，保存新的几何体集合资产。
        
        ![在内容浏览器中点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82a663e3-3ce0-48c2-b36c-01598623a90c/destruction-geo-col-6.png)
3.  你在场景中选择的Actor将替换为关卡中的几何体集合。
    
    ![静态网格体将替换为关卡中的几何体集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd795063-9a46-4806-82aa-f5915884ba6f/destruction-geo-col-7.png)

这些步骤可用于从任意资产组合创建几何体集合。

### 利用静态网格体创建几何体集合

你可以在关卡中组合任意数量的静态网格体，创建几何体集合。

用单个静态网格体创建几何体集合时，选择静态网格体Actor，并执行上述步骤。所选静态网格体Actor将替换为关卡中的新几何体集合。

![静态网格体将替换为关卡中的几何体集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db68d3a6-2fd6-4c3a-b990-3100f528fb46/destruction-geo-col-7.png)

几何体集合可以利用任意静态网格体组合创建。选择关卡中的多个静态网格体Actor，并执行"创建几何体集合资产（Create Geometry Collection Assets）"中详述的步骤。

选择多个静态网格体时，第一个所选Actor用于创建几何体集合的枢轴点。

![The Static Meshes are replaced with the Geometry Collection in the level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c108708-8d81-4b02-9be1-63b83af4c7b5/destruction-geo-col-16.png)

### 利用蓝图Actor创建几何体集合

你可以组合包含一个或多个 **静态网格体组件** 的 **蓝图Actor（Blueprint Actors）** 来创建几何体集合。其静态网格体组件在转换为几何体集合时被视为普通静态网格体。

下方示例是有两个静态网格体组件的蓝图资产。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6445378-9e49-4372-8fb3-86ee3a236233/destruction-geo-col-21.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6445378-9e49-4372-8fb3-86ee3a236233/destruction-geo-col-21.png)

点击查看完整视图。

你可以将蓝图资产转换为几何体集合，方法是将其拖入关卡中，并执行"创建几何体集合（Creating Geometry Collections）"中的步骤。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/183fa851-b5a3-4c0a-a507-62fad34a3683/destruction-geo-col-22.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/183fa851-b5a3-4c0a-a507-62fad34a3683/destruction-geo-col-22.png)

点击查看完整视图。

你还可以将蓝图Actor与静态网格体或其他蓝图Actor合并，方法是将其选中，并执行"创建几何体集合资产（Create Geometry Collection Assets）"中的步骤。

![蓝图和静态网格体将替换为关卡中的几何体集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc4b8e06-093b-497e-8b78-9a5c3d5b70b9/destruction-geo-col-16.png)

### 利用其他几何体集合创建几何体集合

你可以采用相同过程利用其他几何体集合创建新的几何体集合。将一个或多个几何体集合资产拖入关卡中，将其选中，并执行"创建几何体集合资产（Creating Geometry Collection Assets）"中的步骤。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fecb1682-c363-40b7-9006-e77cd837dfe2/destruction-geo-col-31.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fecb1682-c363-40b7-9006-e77cd837dfe2/destruction-geo-col-31.png)

点击查看完整视图。

## 使几何体集合破裂

现在你已拥有几何体集合，可以使用[破裂模式](/documentation/zh-cn/unreal-engine/destruction-overview)将其分开。此模式包含不同类型的破裂方法，以及群集和编辑破裂片段的方法。

在本指南中，你将使用标准 **均匀Voronoi（Uniform Voronoi）** 方法。使用该方法时，你可定义最小和最大数量的站点，以创建单元格体积进行破裂。有关各种可用破裂方法的更多详细信息，请阅读[破裂几何体集合用户指南](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide)。

执行以下步骤，破裂几何体集合：

1.  在关卡中选择几何体集合，点击 **模式（Mode）** 下拉菜单并选择 **破裂（Fracture）** 。
    
    ![从](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6702a839-78a2-4c64-827e-f99da28d4e6b/destruction-geo-col-2.png)
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/588e33d3-d392-43a4-8ce9-a8ffe1315b6c/destruction-geo-col-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/588e33d3-d392-43a4-8ce9-a8ffe1315b6c/destruction-geo-col-3.png)
    
    点击查看完整视图。
    
2.  转到 **破裂（Fracture）** 分段，然后点击 **均匀（Uniform）** 破裂按钮。
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcccca4f-8df8-4819-84ac-fbbfde2cb681/destruction-geo-col-9.png)
3.  按所示保留默认设置，并点击 **破裂（Fracture）** 。
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1cb73eed-01c0-45a7-81bf-762d7f6e09f7/destruction-geo-col-10.png)
    
    你可以参阅[破裂几何体集合用户指南](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide)教程，详细了解破裂过程。
    
4.  选择 **几何体集合（Geometry Collection）** 并将其移至高于地面。点击 **播放模式（Play Mode）** 选项按钮，并选择 **模拟（Simulate）** 或 **所选视口（Selected Viewport）** 查看结果。
    
    ![从](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6e6a70f-8edf-4e4c-9bcf-c27b84889bb7/destruction-geo-col-12.png)

几何体集合在撞击时破裂。

![柱子坠落地面并在撞击时破裂](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85cd7718-6dad-443b-99d8-201a0f6049f1/destruction-geo-col-fall.gif)

## 更改几何体集合的材质

现在你已知道如何使几何体集合破裂，你可能想更改破裂片段的外部和内部表面的外观。

1.  执行以下步骤，使用原始材质显示几何体集合：
    
    1.选择几何体集合并使用关卡的 **细节（Details）** 面板。
    
    1.在 **Chaos物理系统（Chaos Physics）** 分段中，展开 **通用（General）** 选项。
    
    1.**取消选择** **显示骨骼颜色（Show Bone Colors）** 复选框。
    
    ![显示骨骼颜色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/180125ad-2390-4d05-85b0-0c3bfc4a2082/destruction-geo-col-24a.png)
    
    ![不显示骨骼颜色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17fb175e-6a57-4ac0-b972-33aa9e469d4f/destruction-geo-col-24b.png)
    
    显示骨骼颜色
    
    不显示骨骼颜色
    
2.  在 **材质（Materials）** 分段中，每个原始材质ID都已从源资产复制。
    
    在下方示例中，**元素1（Element 1）** 和 **元素3（Element 3）** 已从 **元素0（Element 0）** 和 **元素2（Element 2）** 复制，表示创建几何体集合时的内部表面。
    
    ![在下方示例中，元素1和元素3已分别创建为元素0和元素2的副本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75ce9e04-981b-4470-8a6a-db77402a1dbd/destruction-geo-col-25.png)
3.  替换 **元素1（Element 1）** 和 **元素3（Element 3）** 中的材质，以影响内部表面的外观。在下方示例中，红色和绿色材质已添加到这些插槽。
    
    ![替换元素1和元素3中的材质，以影响内部表面的外观](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/196c7dde-7b4b-4587-ac62-55f84c4458bc/destruction-geo-col-26.png)
4.  点击 **播放模式（Play Mode）** 选项按钮，并选择 **模拟（Simulate）** 或 **所选视口（Selected Viewport）** 查看结果。
    
    ![从](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ddee932-2b6a-4597-af11-f06576c236c4/destruction-geo-col-12.png)
    
    你可以看到内部表面现在使用新添加的材质。
    
    ![柱子坠落地面并在撞击时破裂](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cad06af-e3e8-4553-bc49-902f09cc81ce/destruction-geo-col-fall-2.gif)
    
    你还可以直接在几何体集合中更改材质。在 **内容浏览器（Content Browser）** 中，双击打开 **几何体集合（Geometry Collection）** 。
    
    ![在内容浏览器中，双击打开几何体集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94f558f9-133c-4106-8887-16297e311e81/destruction-geo-col-27.png)
    1.  向下滚动到 **材质（Materials）** 分段，并替换 **索引\[1\]（Index \[1\]）** 和 **索引\[3\]（Index \[3\]）** 中的材质。
        
        ![替换索引[1]和索引[3]中的材质](destruction-geo-col-28.png)
    2.  保存几何体集合并关闭窗口。
        

## 创建几何体集合时的最佳实践

创建几何体集合时，请考虑以下事项。

### 几何体集合应该"不漏水"

用于创建几何体集合的Actor应该"不漏水"，即没有开放的面或边。有开放面的对象在模拟时的性能更差，会返回不可预测的结果。

![有洞的静态网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b27d6832-65ae-4546-bea5-3877e17fc989/destruction-geo-col-29a.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47acd7b4-2dbb-4ab5-8f9d-22cbec5d8a7b/destruction-geo-col-29b.png)

有洞的静态网格体

### 几何体集合不应该有相交几何体

构成几何体集合的对象不应该彼此相交。由于每个几何体集合是可以模拟的单独对象，因此在模拟开始后，Chaos解算器会试图将每个对象彼此推离。这可能导致不规则、不可预测的结果。

![两个重叠的静态网格体的例子](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e0edf5a-a12e-4c8c-a8dd-4a77e519faf4/destruction-geo-col-30.png)

带有重叠几何体的对象将彼此推离。

![Objects with overlapping geometry will be pushed away from each other](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6f84b84-f7dd-446b-b19e-d1cd4a0754ae/destruction-geo-col-fall-3a.gif)

不带重叠几何体的对象可正确模拟。

![不带重叠几何体的对象可正确模拟](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/974547b1-d743-4a8d-910e-80dc16a2de33/destruction-geo-col-fall-3b.gif)

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [chaos](https://dev.epicgames.com/community/search?query=chaos)
-   [destruction](https://dev.epicgames.com/community/search?query=destruction)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建几何体集合](/documentation/zh-cn/unreal-engine/geometry-collections-user-guide#%E5%88%9B%E5%BB%BA%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88)
-   [创建几何体集合资产](/documentation/zh-cn/unreal-engine/geometry-collections-user-guide#%E5%88%9B%E5%BB%BA%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88%E8%B5%84%E4%BA%A7)
-   [利用静态网格体创建几何体集合](/documentation/zh-cn/unreal-engine/geometry-collections-user-guide#%E5%88%A9%E7%94%A8%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E5%88%9B%E5%BB%BA%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88)
-   [利用蓝图Actor创建几何体集合](/documentation/zh-cn/unreal-engine/geometry-collections-user-guide#%E5%88%A9%E7%94%A8%E8%93%9D%E5%9B%BEactor%E5%88%9B%E5%BB%BA%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88)
-   [利用其他几何体集合创建几何体集合](/documentation/zh-cn/unreal-engine/geometry-collections-user-guide#%E5%88%A9%E7%94%A8%E5%85%B6%E4%BB%96%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88%E5%88%9B%E5%BB%BA%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88)
-   [使几何体集合破裂](/documentation/zh-cn/unreal-engine/geometry-collections-user-guide#%E4%BD%BF%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88%E7%A0%B4%E8%A3%82)
-   [更改几何体集合的材质](/documentation/zh-cn/unreal-engine/geometry-collections-user-guide#%E6%9B%B4%E6%94%B9%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88%E7%9A%84%E6%9D%90%E8%B4%A8)
-   [创建几何体集合时的最佳实践](/documentation/zh-cn/unreal-engine/geometry-collections-user-guide#%E5%88%9B%E5%BB%BA%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88%E6%97%B6%E7%9A%84%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
-   [几何体集合应该"不漏水"](/documentation/zh-cn/unreal-engine/geometry-collections-user-guide#%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88%E5%BA%94%E8%AF%A5%22%E4%B8%8D%E6%BC%8F%E6%B0%B4%22)
-   [几何体集合不应该有相交几何体](/documentation/zh-cn/unreal-engine/geometry-collections-user-guide#%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88%E4%B8%8D%E5%BA%94%E8%AF%A5%E6%9C%89%E7%9B%B8%E4%BA%A4%E5%87%A0%E4%BD%95%E4%BD%93)