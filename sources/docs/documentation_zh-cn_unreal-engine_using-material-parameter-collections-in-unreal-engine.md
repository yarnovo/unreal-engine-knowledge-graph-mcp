# 虚幻引擎中的材质参数集合 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-material-parameter-collections-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:26:26.463Z

---

目录

![材质参数集合](https://dev.epicgames.com/community/api/documentation/image/04e6db44-dbf5-4851-acc9-8df7c779065c?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/949e3760-dfb7-4ed1-b2c5-ad1fee66834a/globalparams1.jpg)

**材质参数集合（MaterialParameterCollection）** 是一种资产，能够储存任意组合的[标量和向量参数](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine)，并在材质中引用。它是一种强大的工具，能让美术师一次性将全局数据导入到多个材质中。它还有助于设置关卡中的效果，例如雪量、破坏程度、湿度等。如果不使用材质参数集合，你需要在关卡的不同材质实例中单独设置许多材质参数。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e6a8ea8-b693-4624-b355-5db71420535e/globalparams1.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76a244e5-422b-4626-ae36-d93906597018/globalparams2.png)

在上面这两张图中，我们使用了参数集合中的全局参数来控制场景的以下方面

-   花朵随着风速和风力而变形的状态
-   玩家位置被跟踪并提供给植物叶子。该位置信息用于在玩家走到花和草附近时移动花草。
-   太阳角度和颜色也被跟踪，并用于正确地给水波着色，并将该效果限制为仅在光线直接射入水波时显示（玩家看向太阳时）。
-   水在一天中的着色效果和总体漫反射光线颜色也受到控制。

## 创建和编辑材质参数集合

材质参数集合是一种单独的资产类型，可以在[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)中创建。执行以下步骤来创建材质参数集合并添加一个参数。

1.  在内容浏览器中 **右键点击**，在"创建高级资产"部分中展开 **材质（Material）** 子分类。在菜单中选择 **材质参数集合（MaterialParameterCollection）**。
    
    ![创建新的材质参数集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f3fa06c-df8a-41bd-923b-a222376d9399/create-mpc.png)
2.  重命名材质参数集合资产来描述其中将要包含的参数类型。在该示例中，我们将其命名为 **MPC\_GlobalParams**。**双击** 资产来编辑材质参数集合。
    
    ![重命名材质参数集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c0b02ff-1d4b-47a7-8711-5ff7e78f1cf8/rename-mpc.png)
3.  新打开的窗口会显示材质参数集合中的 **标量（Scalar）** 和 **矢量参数（Vector Parameters）**。
    
    ![打开材质参数集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3457559-67b5-4dc4-b94b-a43add06fb31/mpc-details-panel.png)
4.  要向集合中添加参数，在标量向量其中一个部分中点击 **添加元素** (+) 图标。在该示例中，添加一个 **标量参数（Scalar Parameter）**。将其命名为 **GlobalEmissivePower** 并将默认值（Default Value）更改为 **1.0**。
    
    ![向MPC添加一个标量参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90646aac-cf59-45fc-9067-d887dd90ca86/add-scalar-param.png)
5.  按照需要添加标量或者向量参数。一个材质参数集合能够包括最多1024个标量参数和1024个向量参数。
    

## 在材质中使用材质参数集合

现在你可以使用你的材质参数集合中的参数来定义材质的属性。使用材质参数集合的一大好处是参数数值作为单独的资产与材质本身分开保存。这意味着你可以将一个材质参数集合引用在任意数量的材质中，并且只用更改一次数值就可以印象全部引用它的材质。

通过以下步骤来在基础材质中引用你的材质参数集合。

1.  在内容浏览器中 **右键点击** 并在菜单的创建基础资产部分中点击 **材质（Material）**。给该材质添加一个描述性的命名。
    
    ![创建新材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ccbf6e8-ffcf-4f9c-8d95-1e12885941f7/create-material.png)
2.  现在内容浏览器中应该有了一个材质和上一小节中创建的材质参数集合。**双击** **材质** 来将其在材质编辑器中打开。
    
    ![内容浏览器中的材质和材质参数集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b970312-b409-4a6f-91d1-5fdf635e69b2/mpc-and-material-assets.png)
3.  将要创建的材质是一个发光的表面，使用一个菲涅尔表达式来让材质的边缘上更加明亮。向你的材质图表中添加以下材质表达式节点。
    
    材质表达式类型
    
    名称
    
    默认值
    
    矢量参数
    
    底色
    
    1,0,0,0
    
    矢量参数
    
    发光颜色
    
    0.1,0.01,0.14,0
    
    乘数 - x2
    
    n/a
    
    n/a
    
    菲涅尔
    
    n/a
    
    n/a
    
    按照下图所示连接材质表达式。
    
    ![发光材质初始材质图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7db6219a-ed8a-4e93-a134-5bf6e43877fa/emissive-starting-graph.png)
4.  在材质图表中选中 **菲涅尔（Fresnel）**。在细节面板中将 **指数（Exponent）** 设为 **6**，**基本反射小数（Base Reflect Fraction）** 设置为 **0.1**。这些属性控制边缘光线效果的降低。尝试不同的 **指数（Exponent）** 来改变菲涅尔节点对表面影响的程度。
    
    ![菲涅尔材质表达式属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a62972a6-6b6a-431f-9d1f-94711c83e82b/fresnel-settings.png)
5.  在材质图表中 **右键点击** 并找到 "集合（collection）" 然后向图表中添加一个 **集合参数（CollectionParameter）**。该节点用于将信息从你的材质参数集合输入材质图表。
    
    ![未指定的集合参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/327cef78-0dfb-4295-8463-a15cadd0f38d/collection-parameter.png)
6.  选择材质图表中的 **集合参数（Collection Parameter）** 节点。在细节面板中，使用 **集合（Collection）** 下拉菜单来选择之前创建的 **MPC\_GlobalParameters** 集合。
    
    ![选择材质参数集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c9dac37-2a6a-4182-9cc4-e65b0e678c31/select-parameter-collection.png)
7.  使用 **参数名称（Parameter Name）** 下拉菜单来选择 **EmissivePower** 参数。
    
    ![选择Emissive Power参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/451a1bd0-fe3b-4eeb-b5fb-b233f38f5e0d/select-parameter.png)
8.  将 **'EmissivePower'** 节点连接到下图所示的乘数节点上打开的 **B** 输入。
    
    ![选择Emissive Power参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2986cbb8-803a-4359-9f4f-95a9750d5497/final-mpc-graph.png)
9.  在材质编辑器工具栏中点击 **保存（Save）** 来编译并保存材质。保存好资产后便可以关闭材质编辑器。
    
    ![保存材质资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5aec3b7-cdd4-46da-bbc7-f2c2f861f0e4/save-and-compile.png)

## 测试材质参数集合

为了展示材质参数集合在控制多个材质的属性时的重大作用，你可以创建一个或者多个材质实例并将其应用到场景中的不同物体上。

1.  **右键点击** 你的基础材质并选择 **创建材质实例（Create Material Instance）**。
    
    ![创建材质实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc76cc35-50fe-4bf1-92f4-1355962dc649/create-material-instance.png)
2.  将基本材质和材质实例应用到场景中两个不同的物体上。你可以在材质实例中更改底色和发光颜色参数，这样可以分辨两个物体。
    
    ![在关卡中将材质应用到物体上](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4812169d-7139-4a02-9d44-d030ec4c79a3/apply-materials-in-level.png)
3.  现在当你打开材质参数集合并更改 **EmissivePower** 数值时，新数值会立刻应用到基础材质和材质实例上。
    

## 通过蓝图更新材质参数集合

你还可以通过蓝图来操作材质参数集合。 这是一种非常强大的工具，因为这样可以在游戏运行期间，随时根据需要调整材质集合参数。以下示例展示如何用按键控制两个材质的 **EmissivePower**。在运行时，按下 **B** 键会将发光数值变得更亮，按下 **D** 键会将亮度调暗。松开按键后参数会调回初始数值 **1**。

1.  在主编辑器视口上方的工具栏中，展开 **蓝图（Blueprints）** 下拉菜单，然后在列表中选择 **打开关卡蓝图（Open Level Blueprint）**。
    
    ![打开关卡蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0bc93e9-4a51-40df-b2e1-19c3379b92dd/open-level-blueprint.png)
2.  在关卡蓝图中 **右键点击** 并找到 **键盘事件（keyboard event）**。从菜单中添加一个 **B** 键盘事件。重复该操作并添加一个 **D** 键盘事件。
    
    ![B和D键盘事件节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db542cd4-79c0-4ab9-8a0c-9c9f77b811ac/keyboard-event-nodes.png)
3.  在关卡蓝图中 **右键点击** 并添加一个 **设置标量参数数值（Set Scalar Parameter Value）** 节点。使用 **集合（Collection）** 下拉菜单来引用你的 **MPC\_GlobalParams** 材质参数集合。
    
    ![集合下拉菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7dbec72d-293a-446c-a777-08a528fb1712/collection-drop-down.png)
    
    使用 **参数（Parameter）** 下拉菜单来引用 **EmissivePower** 参数。
    
    ![Emissive Power参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/747836cd-532d-4f5b-8bc2-b104087b2fbe/emissive-power-variable.png)
4.  复制 **设置标量参数数值节点（Set Scalar Parameter Value Node）** 两次，这样蓝图中有三个副本。如下图所示连接节点。**B和D** 键盘事件上的 **按下（Pressed）** 输出应该连接到第一个和第三个 **设置标量参数数值（Set Scalar Parameter Value）** 节点的输入上。两个键盘事件的 **松开（Released）** 输出都应该连接到第二个 **设置标量参数数值（Set Scalar Parameter Value）** 节点的输入上。
    
    ![完成的蓝图图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f07ed0b0-c579-4dd4-94d5-1b8dd541e7b5/blueprint-wired.png)
5.  最后一步，需要设置每个键盘事件中 **EmissivePower** 的 **参数数值（Parameter Value）**。在该示例中，当 **B** 键按下时，**EmissivePower** 增加至 **50**。当 **D** 键按下时，**Emissive Power** 减少到 **0.05**。松开这两个键时，参数会变为其初始的数值 **1**。
    
    ![EmissivePower数值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6ce40ce-16cf-4370-8ff5-532faa2b2c44/emissive-power-values.png)
6.  在蓝图编辑器工具栏中点击 **编译（Compile）** 来编译关卡蓝图。现在可以在游戏中测试这些变动。
    
7.  在编辑器工具栏中点击 **编辑器内游玩（Play in Editor）** 图表，通过按下 **B** 和 **D** 键来测试蓝图。结果如下面的视频所示。
    

## 限制和性能特征

材质最多可以引用两个不同的材质参数集合。一个通常用于表示游戏范围的值， 另一个可以用于表示特定于关卡的参数。一个集合最多可以包含1024个标量参数和1024个向量 参数。

修改集合中的参数数量会导致引用该集合的所有材质重新编译。 如果需要添加大量参数，提前在空贴图中添加大量参数会更加快速。

如果重命名参数，引用该参数的任何材质都会继续按预期工作。但是，引用该参数的任何蓝图 现已破坏。您必须重新分配作用于该集合的蓝图函数的参数名称 来解决这个问题。

更新材质参数集合中的值比设置各个材质实例 上的许多不同参数更加高效。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建和编辑材质参数集合](/documentation/zh-cn/unreal-engine/using-material-parameter-collections-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E7%BC%96%E8%BE%91%E6%9D%90%E8%B4%A8%E5%8F%82%E6%95%B0%E9%9B%86%E5%90%88)
-   [在材质中使用材质参数集合](/documentation/zh-cn/unreal-engine/using-material-parameter-collections-in-unreal-engine#%E5%9C%A8%E6%9D%90%E8%B4%A8%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%9D%90%E8%B4%A8%E5%8F%82%E6%95%B0%E9%9B%86%E5%90%88)
-   [测试材质参数集合](/documentation/zh-cn/unreal-engine/using-material-parameter-collections-in-unreal-engine#%E6%B5%8B%E8%AF%95%E6%9D%90%E8%B4%A8%E5%8F%82%E6%95%B0%E9%9B%86%E5%90%88)
-   [通过蓝图更新材质参数集合](/documentation/zh-cn/unreal-engine/using-material-parameter-collections-in-unreal-engine#%E9%80%9A%E8%BF%87%E8%93%9D%E5%9B%BE%E6%9B%B4%E6%96%B0%E6%9D%90%E8%B4%A8%E5%8F%82%E6%95%B0%E9%9B%86%E5%90%88)
-   [限制和性能特征](/documentation/zh-cn/unreal-engine/using-material-parameter-collections-in-unreal-engine#%E9%99%90%E5%88%B6%E5%92%8C%E6%80%A7%E8%83%BD%E7%89%B9%E5%BE%81)

相关文档

[

材质

![材质](https://dev.epicgames.com/community/api/documentation/image/cdeef2f5-00ad-4403-bbd3-ee8f0b14330e?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-materials)

[

实例化材质

![实例化材质](https://dev.epicgames.com/community/api/documentation/image/389a46ab-e487-4ed1-beeb-d1d8865de685?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)

[

材质编辑器指南

![材质编辑器指南](https://dev.epicgames.com/community/api/documentation/image/14556df3-8b8e-4517-8ed0-d76a90f5fdfe?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)

[

创建和使用材质实例

![创建和使用材质实例](https://dev.epicgames.com/community/api/documentation/image/1314d7f2-884a-4ed2-9ddb-5988106546a5?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine)