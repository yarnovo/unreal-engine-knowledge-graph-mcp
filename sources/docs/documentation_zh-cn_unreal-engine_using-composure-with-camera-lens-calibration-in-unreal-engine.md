# 将Composure与虚幻引擎中的摄像机镜头校准配合使用 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-composure-with-camera-lens-calibration-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:25:34.760Z

---

目录

![将Composure与摄像机校准配合使用](https://dev.epicgames.com/community/api/documentation/image/dd1cbda9-4ee8-4d47-84b4-e2ca4ba5fe11?resizing_type=fill&width=1920&height=335)

1.  转至 **窗口（Window）> 虚拟制片（Virtual Production）> Composure合成（Composure Compositing）** ，打开 **Composure** 窗口。
    
    ![打开Composure合成](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ee267f4-4186-41e4-ae1b-cd19e19bb840/01-open-composure-window.png "Open Composure Compositing")
2.  在 **Composure** 窗口中右键点击，并从菜单选择 **新建组合（Create New Comp）** 。点击 **空组合镜头（Empty Comp Shot）** 按钮，新建空组合。
    
    ![新建组合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f2850df-04f3-425c-9785-a38352323448/02-create-new-comp.png "Create a new Comp") ![创建空组合镜头](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21d2dff6-b277-481b-8b28-b8226305865d/03-empty-comp-shot.png "Create an Empty Comp Shot")
3.  右键点击Composure并选择 **添加层元素（Add Layer Element）** 。点击 **媒体板（Media Plate）** 按钮。此媒体板将使用你的摄像机中的实时视频内容。
    
    ![添加层元素](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94df6a37-f93d-4ee4-96d2-b9533d4a8f19/03-add-layer-element-1.png "Add Layer Element") ![添加媒体板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e740697-d029-422c-a1de-985820daf634/04-create-media-plate.png "Add a Media Plate")
4.  找到 **内容浏览器（Content Browser）> 你针对MediaIO的项目文件夹（Your project folder for MediaIO）>** 并将 **MediaBundle-01** 拖入你的关卡中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35a2ac25-36dc-48b0-af36-516e42223c58/05-add-media-bundle.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35a2ac25-36dc-48b0-af36-516e42223c58/05-add-media-bundle.png)
    
    点击查看大图。
    
5.  选择 **Composure** 窗口中的 **媒体板** ，并转至 **细节（Details）** 面板。向下滚动到 **Composure** 分段并展开 **输入（Input）** 类别。点击 **媒体源（Media Source）** 下拉菜单并从列表选择 **T\_MediaBundle-01\_BC** 。现在你应该会看到媒体板上流送的实时视频内容。
    
    ![选择媒体板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0992547-2ee4-4668-b5bf-30974cefc342/06-select-media-plate.png "Select the Media Plate")
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/090f119b-0312-4c15-a1e8-86b52e7fedc9/07-new-media-source.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/090f119b-0312-4c15-a1e8-86b52e7fedc9/07-new-media-source.png)
    
    点击查看大图。
    
6.  右键点击Composure并选择 **添加层元素（Add Layer Element）** 。点击 **CG层（CG Layer）** 按钮。
    
    ![添加CG层](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b88ccdd-261c-4e7b-b0b8-4970f707e73a/09-new-cg-layer.png "Add a CG Layer")
7.  转至 **窗口（Window）> 层（Layers）** ，打开 **层（Layers）** 窗口。
    
    ![打开层窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ebcbaf6-1ca5-4b09-99e0-3a1fa9e25d21/11-open-layers-window.png "Open the Layers Window")
8.  从 **大纲视图（Outliner）** 选择 **BP\_UE\_Tracker3** 和 **CameraCalibrationCheckerboard** 蓝图。转至 **层（Layers）** 窗口，然后右键点击并从菜单选择 **将所选Actor添加到新层（Add Selected Actors to New Layer）** 。将层命名为 **cglayer** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7ea2203-3a10-4cd0-a262-f1c363ec172f/12-add-selected-actors.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7ea2203-3a10-4cd0-a262-f1c363ec172f/12-add-selected-actors.png)
    
    点击查看大图。
    
    你还可以在内容浏览器中的引擎内容文件夹下找到 **BP\_UE\_Tracker3** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07194ae1-a73d-4b84-8753-cd93ae21e1b8/10-bp-ue-tracker3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07194ae1-a73d-4b84-8753-cd93ae21e1b8/10-bp-ue-tracker3.png)
    
    点击查看大图。
    
9.  选择 **Composure** 窗口中的 **cg元素** ，并转至 **细节（Details）** 面板。向下滚动到 **Composure** 分段并点击 **+** 按钮展开 **捕获Actor（Capture Actors）** 选项。点击 **ActorSet** 下拉菜单并从列表选择 **cglayer** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/024baa22-bf19-4a3e-a2fa-ac0dd55d6921/13-add-layers-actor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/024baa22-bf19-4a3e-a2fa-ac0dd55d6921/13-add-layers-actor.png)
    
    点击查看大图。
    
10.  选择 **cg元素** 层后，向下滚动到 **LensDistortion** 分段，并选择 **失真源（Distortion Source）** 作为 **LumixLens** 文件。
    
    ![将失真应用于CG层](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5332ad7d-84d6-470b-a7ce-c3ddf25238b6/14-select-lens-file.png "Apply Distortion to the CG Layer")
11.  右键点击 **内容浏览器（Content Browser）** 并从 **创建基本资产（Create Basic Asset）** 分段选择 **材质（Material）** 。将材质命名为 **M\_SimpleComp** 。
    
    ![新建材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68106f88-543a-4ea3-b69c-148532334af3/15-create-new-material.png "Create a New Material")
12.  双击打开 **M\_SimpleComp** 。选择材质节点并转至 **细节（Details）** 面板。将 **着色（Shading Model）** 设为 **无光照（Unlit）** 。
    
    ![将材质设为无光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ba0a909-e6d4-423c-a053-f2a52bcc8aa6/15-unlit-shading-model.png "Set the Material to Unlit")
13.  右键点击图表，然后搜索并选择 **TextureSample** 。右键点击 **Texture Sample** 节点并选择 **转换为参数（Convert to Parameter）** 。将其命名为 **CGLayer** 。转至 **细节（Details）** 面板并将纹理添加到 **CG层（CG Layer）** 下拉菜单。
    
    ![添加纹理取样](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1cc86e29-e9bc-4370-a3ca-f5961d84f0b6/16-new-texture-sample.png "Add a Texture Sample") ![将纹理转换为参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4742bae1-060f-4201-9746-39a4fca4a5bb/17-convert-to-parametr.png "Convert the Texture to a Parameter") ![添加纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b24ceb7a-c4df-43cd-a85d-36769578666e/18-new-material-texture-base.png "Add a Texture")
14.  重复上一步，添加另一个 **纹理取样（Texture Sample）** 。将参数命名为 **MediaPlate** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/151fe3e0-25dd-42e1-b65c-e348be0c919a/19-add-media-plate-parametr.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/151fe3e0-25dd-42e1-b65c-e348be0c919a/19-add-media-plate-parametr.png)
    
    点击查看大图。
    
15.  右键点击图表，然后搜索并选择 **Over** 。将两个节点的 **RGBA** 引脚连接到 **Over** 节点的 **A** 和 **B引脚** 。最后，将 **Over** 节点的 **RGBA** 引脚连接到材质节点的 **自发光颜色（Emissive Color）** 引脚。
    
    ![添加Over节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ccca8ac2-ce2c-4111-889b-237e2c492f2c/20-add-over-node.png "Add an Over Node")
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b5abd58-e646-4f9d-9a2d-8b0466bf07ed/21-new-material-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b5abd58-e646-4f9d-9a2d-8b0466bf07ed/21-new-material-graph.png)
    
    点击查看大图。
    
16.  选择 **Composure** 窗口中的组合，并转至 **细节（Details）** 面板。向下滚动到 **变换/合成通道（Transform / Compositing Passes）** 分段并展开 **变换通道（Transform Passes）** 。 将 **M\_SimpleComp** 材质添加到 **材质（Material）** 插槽。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a99d5c69-18cf-4451-8458-f9f728596fee/23-add-material-to-composure.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a99d5c69-18cf-4451-8458-f9f728596fee/23-add-material-to-composure.png)
    
    点击查看大图。
    
17.  展开 **输入元素（Input Elements）** 并将媒体板和CG元素层添加到其对应的插槽。现在你应该已将视频内容流送到媒体板，并CG元素层中显示了所选Actor。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88a70df4-0495-4ce7-aa4d-c493c4424c01/24-set-input-elements.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88a70df4-0495-4ce7-aa4d-c493c4424c01/24-set-input-elements.png)
    
    点击查看大图。
    

## 分段结果

在本指南中，你学习了如何将Composure与摄像机校准插件配合使用。

-   [composure](https://dev.epicgames.com/community/search?query=composure)
-   [camera lens calibration](https://dev.epicgames.com/community/search?query=camera%20lens%20calibration)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [分段结果](/documentation/zh-cn/unreal-engine/using-composure-with-camera-lens-calibration-in-unreal-engine#%E5%88%86%E6%AE%B5%E7%BB%93%E6%9E%9C)