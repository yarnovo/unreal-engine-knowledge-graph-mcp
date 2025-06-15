# 虚幻引擎中毛发渲染和模拟快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/hair-simulation-and-rendering-quick-start-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:00:26.131Z

---

目录

毛发渲染和模拟指南重在帮助你了解虚幻引擎4中在蒙皮网格体上处理毛发梳理的基础知识。

在阅读完此教程后，你将了解如何：

-   设置项目进行毛发渲染和模拟。
-   设置Groom用于带动画的骨骼网格体。
-   设置简单的 *毛发* 材质。
-   启用并控制毛发物理效果。

## 1 - 必要设置

1.  用[虚幻项目浏览器](/documentation/zh-cn/unreal-engine/working-with-projects-and-templates-in-unreal-engine)新建项目并创建一个 **第三人称（ThirdPerson）** 模板项目。
2.  在编辑器中，前往主菜单并选择 **编辑（Edit）** > **项目设置（Project Settings）**，打开项目设置（Project Settings）窗口。 在 **渲染（Rendering） > 优化（Optimization）** 分类下，启用 **支持计算皮肤缓存（Support Compute Skin Cache）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c65b3d1-29c5-436f-950e-4c240f6b231f/1_1_projectsettings.png)
    
    由于下一步也需要重启编辑器，可忽略编辑器窗口右下角弹出的 **立即重启（Restart Now）** 按钮。
    
3.  接下来再次前往主菜单，这次选择 **编辑（Edit）** > **插件（Plugins）**，打开插件（Plugins）浏览器窗口。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a9ca32c-06d6-4192-9cac-4a8eb3e0139f/1_2_plugins_a.png)
    
    在搜索栏中搜索术语"梳理（Groom）"，或在左侧面板中选择 **几何体（Geometry）**类目，并启用以下插件：
    
    -   **Alembic Groom导入器**
    -   **Groom**
4.  重启编辑器，让项目设置（Project Settings）和插件（Plugins）的更改生效。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a29aeea-deb3-4231-afdf-26696829bc0c/1_3_restart.png)

## 2 - 创建和导入Groom

即便是简单角色也可以拥有不同类型的毛发，例如头发、胡子、眉毛等。每种类型的毛发皆拥有各自的材质和物理设置。每个分组中也有不同类型的毛发，例如模拟期间将使用的毛发。当你在DCC应用中设计毛发Groom时，可以定义此类信息。Unreal Engine会查看此信息来创建导线。

1.  在你选择的DCC应用中创建Groom，然后将其导出为Alembic（.abc）文件格式。
    
    利用[Alembic for Grooms规范](/documentation/zh-cn/unreal-engine/using-alembic-for-grooms-in-unreal-engine)，根据正确的命名规范对Groom进行设置，以便在Unreal Engine中使用。
    
2.  在内容浏览器中点击 **导入（Import）** 按钮导入Alembic文件和梳理。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e560519-ce98-4cfb-966c-830e5d20cc7a/2_2_importgroom.png)
3.  在Groom导入选项（Groom Import Options）窗口中点击 **导入（Import）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eccff81e-2326-4453-9397-ec21b2968853/2_3_groomimportoptions.png)
    -   修改烘焙进Groom的原始旋转，可以避免额外的运行时消耗。
    -   选用覆盖导线复选框来用导入发束中选择的一组发束替换导入的导线。导线数量取决于毛发至导线密度数值。
    -   使用插值质量和插值距离来修改转移导线运动时导线和发束之间如何配对。
    -   随机化导线和独特导线复选框决定导线如何影响发束；判断单个还是多个导线来影响一根发束。
4.  点击 **导入（Import）**.
    

在导入过程中，Groom系统将查找符合[Alembic for Grooms](/documentation/zh-cn/unreal-engine/using-alembic-for-grooms-in-unreal-engine)规范页面中所述的Alembic命名惯例的属性和组，并导入到新的Groom资产中。在这些属性中，RootUV属性会获取底层表面的UV，比如蒙皮表面，这样Groom之间可以有一些空间变化。

## 3 - 将Groom连接至骨骼网格体

骨骼组件可以用于在骨骼网格体的表面附上Groom资产并绑定Groom。一个可选的绑定资产用于缓存骨骼网格体的Groom项目数据，可以减少初始化时的GPU开销。

### 设置Groom组件

这部分指南将使用 **第三人称（ThirdPerson）** 模板中的 `SK_Mannequin` 。若未找到，可在内容浏览器中点击 **新增（Add New）** > **添加功能或内容包（Add Feature or Content Pack）**，并选择 **第三人称（ThirdPerson）** 模板，即可将其添加到项目。

请注意：同样的设置也可适用于角色蓝图。

1.  在 **内容浏览器（Content Browser）** 中找到 **SK\_Mannequin** 骨骼网格体并将其拖入场景。可在 **Mannequin > Character > Mesh** 文件夹下找到该骨骼网格体。
    
2.  在场景中选中骨骼网格体，然后在 **细节（Details）** 面板中点击 **添加组件（Add Component）**，添加一个 **Groom** 组件。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94aa0114-8a36-4334-b3c3-e700501d8323/3_2_addgroomcomponent.png)
    
3.  选中 **Groom** 组件然后使用 **Groom资产（Groom Asset）** 插槽将导入的Groom指定给骨骼网格体。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b5119f1-3515-463a-92c9-0fac935902b4/3_3_assigngroomtoskelmesh.png)
    
4.  启用 **将Groom绑定到骨骼网格体（Bind Groom to Skeletal Mesh）**。 Groom会调整位置并跟随它所绑定的骨骼网格体一起移动。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5cf4625-439a-4b85-90f1-23a81dab8132/3_4_enablebindingtoskelmesh.png)
    
    若要启用该属性，则 *必须* 在项目设置中启用 **支持计算皮肤缓存（Support Compute Skincache）**。否则该属性将不可用。
    

Groom和骨骼网格体之间的绑定信息会在设置 **将Groom绑定到骨骼网格体（Bind Groom to Skeletal Mesh）** 标记后计算。该操作会导致计算时临时卡顿。要避免该问题，应创建一个绑定资产（见下文）。

### 创建绑定资产

1.  在内容浏览器中，找到你的 **Groom** 资产。右键点击Groom并在快捷菜单中选择 **创建绑定**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21d4fff8-8cc3-4479-a5b8-e06adcf18a44/3a_1_menucreatebinding.png)
2.  接着会弹出一个 **Groom绑定选项** 窗口。要创建资产，你必须指定一个 **目标骨骼网格体（Target Skeletal Mesh）**；你还可以根据情况，指定一个和目标骨骼网格体享有相同拓扑结构的 **源骨骼网格体（Source Skeletal Mesh）**。设置完这些选项后，点击 **创建（Create）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec3429bf-d430-4d5b-83bf-3d22f26367c5/3a_2_groombindingoptions.png)
3.  在关卡中选中骨骼网格体。在 **细节（Details）** 面板的组件面板中选中 **Groom** 组件。在 **Groom** 分段中，确保启用 **将Groom绑定给骨骼网格体（Bind Groom to Skeletal Mesh）** 选项，然后将你创建的绑定资产指定给 **绑定资产（Binding Asset）** 插槽。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e61a7c7-723f-4b51-824c-b85e1da29d37/3a_3_assignbindingasset.png)

把绑定资产指定给Groom组件时，选项 **将Groom绑定给骨骼网格体（Bind Groom to Skeletal Mesh）** 会自动设置完毕，并且只要绑定资产处于使用状态，该选项就无法被禁用。

## 4 - 设置毛发材质

Unreal Engine默认包含带 `HairDefaultMaterial` 的简单毛发材质。

由于Unreal Engine包括默认毛发材质，因此以下步骤为本指南的可选内容。如之前并未设置过毛发材质，以下步骤将指导你完成所需的属性和设置。

1.  在内容浏览器中点击 **新增（Add New）** 按钮，从下拉菜单中选择 **材质（Material）**，并为资产命名。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55330dbf-fa6e-4a6a-9cf0-4b1a7fe41950/4_1_addnewmaterial.png)
2.  在材质编辑器中，用 **细节（Details）** 面板执行以下设置：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2912b7f-6da8-449e-828c-c9c78726961c/4_2_matshadingmodel1.png)
    
    -   着色模型（Shading Model）： **毛发（Hair）**
    
    还需要启用 **使用发束（Use with Hair Strands）**。材质应用到梳理组件后，此复选框会自动启用，并重新编译材质。如未启用，可在材质编辑器中从"细节（Details）"面板的 **使用（Usage）** 类目中启用它。
    
3.  在材质图表中，为基础 *毛发* 材质使用以下节点设置：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e7c488c-2f0c-40ab-9c33-33008b5ce193/4_3_matgraphsetup.png)
    
    为底色使用 **Constant4Vector**，并使用 **常量** 来控制粗糙度。
    
    若要设置更复杂的毛发材质，则在材质图表中使用 **HairAttribute** 表达式访问毛发属性，例如UV、尺寸（Dimensions）、RootUV、种子（Seed）。
    
4.  **保存并关闭** 材质编辑器。
5.  应用毛发材质有两种方式：通过关卡或蓝图中的相关细节（Details）面板直接在Groom资产组件上应用，或从内容浏览器中打开Groom资产。将毛发材质指定到 **材质** 元素槽。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53b2154e-e345-4c78-b75f-53186bcca0d3/4_5b_matgroomactor.png)
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db1ff2f8-7db0-46d7-9939-0fba775f1411/4_5a_matgroomactor.png)
    
    Groom资产Actor（细节面板）
    
    Groom资产（内容浏览器）
    

## 5 - 设置毛发物理特性

下一步，是为Groom资产启用物理模拟。

1.  在内容浏览器中找到Groom资产并打开其属性编辑器。
    
2.  在毛发物理分类中，勾选 **启用模拟（Enable Simulation）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34022a49-7d43-49c2-a81b-fd625641ae52/hairphysicsgroomsettings.png)

启用后，就可以使用毛发物理分类下的属性控制毛发的物理属性了。

关于Groom资产属性的详情，请参见[毛发渲染与模拟设置](/documentation/404)参考页面。

启用后，就可以在编辑器中工作以及使用"在编辑器中运行"（PIE）或"在编辑器中模拟"模式时，看到毛发应用了物理效果。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [hair](https://dev.epicgames.com/community/search?query=hair)
-   [metahumans](https://dev.epicgames.com/community/search?query=metahumans)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 必要设置](/documentation/zh-cn/unreal-engine/hair-simulation-and-rendering-quick-start-guide-in-unreal-engine#1-%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [2 - 创建和导入Groom](/documentation/zh-cn/unreal-engine/hair-simulation-and-rendering-quick-start-guide-in-unreal-engine#2-%E5%88%9B%E5%BB%BA%E5%92%8C%E5%AF%BC%E5%85%A5groom)
-   [3 - 将Groom连接至骨骼网格体](/documentation/zh-cn/unreal-engine/hair-simulation-and-rendering-quick-start-guide-in-unreal-engine#3-%E5%B0%86groom%E8%BF%9E%E6%8E%A5%E8%87%B3%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [设置Groom组件](/documentation/zh-cn/unreal-engine/hair-simulation-and-rendering-quick-start-guide-in-unreal-engine#%E8%AE%BE%E7%BD%AEgroom%E7%BB%84%E4%BB%B6)
-   [创建绑定资产](/documentation/zh-cn/unreal-engine/hair-simulation-and-rendering-quick-start-guide-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%BB%91%E5%AE%9A%E8%B5%84%E4%BA%A7)
-   [4 - 设置毛发材质](/documentation/zh-cn/unreal-engine/hair-simulation-and-rendering-quick-start-guide-in-unreal-engine#4-%E8%AE%BE%E7%BD%AE%E6%AF%9B%E5%8F%91%E6%9D%90%E8%B4%A8)
-   [5 - 设置毛发物理特性](/documentation/zh-cn/unreal-engine/hair-simulation-and-rendering-quick-start-guide-in-unreal-engine#5-%E8%AE%BE%E7%BD%AE%E6%AF%9B%E5%8F%91%E7%89%A9%E7%90%86%E7%89%B9%E6%80%A7)