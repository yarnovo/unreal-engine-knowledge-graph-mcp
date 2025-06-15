# 虚幻引擎FBX场景导入 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:59:52.637Z

---

目录

![FBX场景导入](https://dev.epicgames.com/community/api/documentation/image/cc5ce4e0-60ed-4a34-96fb-480996e48f43?resizing_type=fill&width=1920&height=335)

通过Import Into Level（导入至关卡）命令可将完整的FBX场景导入关卡，无需单个导入资源。用户可完全掌控将要导入的资源，并通过导入设置对每个每个资源进行控制。此工作流还支持有选择地重新导入在虚幻引擎之外进一步编辑的资源。

在当前版本中，FBX完整场景导入支持以下类型的资源：

-   静态网格体
-   骨架网格体
-   动画
-   材质*（提供基础支持，可能与内容创建软件内的原始材质不匹配）*
-   纹理
-   刚性网格体
-   变形目标 \*摄像\_（无动画）\_
-   光源

如需在稍后再次导入场景，必须将场景作为一个单独的蓝图进行导入。此蓝图包含场景中每个资源的组件。

## FBX完整场景工作流

1.  在主菜单栏中，选择 **文件（File） > 导出至关卡（Import Into Level）**
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fec48ce2-f28a-4e98-9141-110a1322ff74/importintolevelmenu.png)
2.  选择包含要导入场景的FBX文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6bd58eb-e820-4598-8f55-854ba600857f/fbxfileimport.png)
3.  在虚幻项目中选择目标文件夹。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f0b23e3-3eb4-4365-b27d-a8967bc68f80/folderlocation.png)
4.  使用FBX场景导入对话框，从要导入的场景中选择资源（静态网格体、骨架网格体和材质）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7676c184-c2e9-4e7e-847d-60d16c871768/fbxsceneimportoptions.png)

也可选择导入过程的最终输出，将所有选定FBX场景资源导入为：

-   **单个关卡Actor**
-   **单个Actor的组件**
-   **单个蓝图Actor类的组件**（支持完整场景重新导入的唯一方法）

导入FBX场景后，所有资源均将与FBX场景数据资源共同导入到项目中。该资源包含原始FBX场景与刚导入至项目的所有资源之间的全部链接信息。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b84d45c-727d-4f96-9efb-3477d15f5940/scenedata.png)

## FBX场景导入选项对话框

通过"FBX场景导入选项"对话框可完全控制将哪些资源导入场景、以及哪些资源包含在最终输出资源中。还可为特定导入设置建立组，并对组进行命名，将其快速指定到场景中的对象。

### 场景选项卡

"场景"选项卡控制FBX场景中每个资源的导入方式。左侧是场景层级的树状图。右侧是整个场景的常规导入选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5109a574-a2d5-4b7d-a282-30c8cc12f15b/fbxsceneimportoptions.png)

请注意，在"场景"选项卡的树状图中取消选中某个资源 *不会* 阻止该资源导入。此操作仅阻止最终输出中包含该资源（关卡actor、单个actor组件或蓝图）。 要完全取消该资源的导入，必须分别在"场景"选项卡和"静态网格体"或"骨架网格"选项卡中取消选中该资源。此工作流使您能够导入最终可能使用的场景中的资源。

#### 可用选项

选项

说明

**创建内容文件夹层级（Create Content Folder Hierarchy）**

自动创建表示层级中每个层的文件夹。文件夹以该层级关卡中的首个项目命名。

**导入为动态（Import as Dynamic）**

选中后，所有actor或组件的移动性将为动态。如未选中，则为静态。

**层级类型（Hierarchy Type）**

可在此处选择导入流程的最终输出：

**蓝图资源（Blueprint Asset）**

创建单独的蓝图Actor。树状图中选中的所有资源均会成为此蓝图Actor的组件。其是 *唯一* 支持完整场景重新导入的层级类型。

**Actor组件（Actor Component）**

创建单独的Actor，在树状图中选择的每个资源均将作为其组件导入。此类型不支持重新导入。

**Actors**

此选项将树状图中的每个资源作为单独Actor导入。此类型不支持重新导入。

### 静态网格体选项卡

"静态网格体"选项卡包含用于导入FBX场景文件中各种静态网格体的所有选项。左侧列出所有包含的网格体，可取消选中不需要导入的网格体。右侧是静态网格体导入选项。在此选项卡中，可预设导入选项并快速将其应用于列表视图中的静态网格体组。此处的选项类似于标准[静态网格体导入选项](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)。

静态网格体选项卡还可创建覆盖选项集合，该功能的介绍请参见[选项覆盖](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E9%80%89%E9%A1%B9%E8%A6%86%E7%9B%96)部分。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9d28811-42c2-4580-b42b-84c91ec85dbf/staticmeshestab.png)

### 骨架网格体选项卡

"骨架网格体"选项卡显示从FBX文件导入场景的所有骨架网格体。左侧列出所有包含的骨架网格体。与"静态网格体"选项卡一样，可取消选中任何不想导入的网格体。右侧是要导入的每个骨架网格的选项列表，与标准[骨架网格体导入选项](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)非常相似。

"骨架网格体"选项卡还可创建覆盖选项集，该功能的介绍请参见[选项覆盖](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E9%80%89%E9%A1%B9%E8%A6%86%E7%9B%96)部分。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89cc8d94-3e77-42fe-ad9c-0f5da61eab66/skeletalmeshestab.png)

### 材质选项卡

利用材质选项卡能够对与FBX文件一起导入场景的材质进行控制。也可 **右键点击** FBX文件中的现有材质，将其替换为项目中的现有材质。

请注意，FBX导入器永远不会允许用户覆盖项目中已存在的材质。只能指定现有材质替换FBX文件中的材质，否则它将创建带基础纹理连接的新材质。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e6b3b10-d7bc-49d1-b5dc-5b4a387ff8e4/materialstab.png)

在"材质"选项卡上，还可覆盖保存所有材质的位置。 只需点击 **浏览** 选项，即可定义材质在项目中的导入位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0cc3484-4a88-44fd-ade3-6b89e79f9313/materialbasepath.png)

### 选项覆盖

选项覆盖可用于对多组导入选项进行分组和命名，然后将其同时应用于多个资源。用户可通过它快速创建网格体群组的常用选项集，无需逐个进行设置。

创建和应用选项覆盖的步骤：

1.  点击"静态网格体"或"骨架网格体"选项卡中的创建覆盖按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/095d4d19-c329-43eb-b847-e4d6ed1503a3/overridebutton.png)
2.  输入新建覆盖的命名。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/911e99f9-1803-4bf3-a503-e171eb732de4/namedoverride.png)
3.  在选项列表顶部的下拉列表中选择新覆盖，然后设置所需的选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13c728c3-1ee8-4ffe-8315-ad2e04e9c013/settingoptions.png)
4.  从选项卡左侧的列表中选择任意数量的网格体，然后 **右键点击**并从快捷菜单中选择新建覆盖。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/106e0e18-93b4-4f6a-9d4a-66e92eadcfbb/selectoverride.png)

也可点击选项列表上方的"删除"按钮，删除选定覆盖。

## 完整场景重新导入

如已将场景导入为蓝图对象，还可重新导入完整场景。此操作与完整场景导入功能非常相似，但可显示已添加、删除或编辑FBX场景中的哪些组件。通过完整场景重新导入功能，可方便地返回到DCC应用程序，根据需要进行更改，然后将完整场景导回到虚幻引擎中，并选择性地应用只需要更新的更改。

### 场景重新导入工作流

要重新导入场景，**右键** 点击 **FBX场景导入数据（FBX Scene Import Data）** 资源（或通过先前场景导入而导入的资源)，然后在快捷菜单中选择 **重新导入（Reimport）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e16e50af-bc32-4e30-b111-5691a7258443/reimportmenu.png)

此操作将打开"FBX场景重新导入选项"对话框。此对话框类似于"FBX场景导入选项"，但会显示已移除的资源（图标上带有减号）和已添加的资源(图标上带有加号）。还可过滤场景资源树状图，以显示在FBX场景中添加、删除或更改的资源。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/130a5f22-b4ee-4010-9b1d-54beae4af5be/reimportaddremove.png)

与先前相同，此对话框包含四个选项卡：

-   场景
-   静态网格体
-   骨架网格体
-   材质

### 重新导入列表过滤器按钮

"FBX场景重新导入选项"对话框中的所有选项卡均有一系列过滤器，用于快速访问已更改的资源。这些过滤器包括：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a86a9515-d41a-4156-8ba6-478144438330/filters.png)

选项

说明

**添加（Add）**

自动创建表示层级中每个层的文件夹。文件夹以该层级关卡中的首个项目命名。

**删除（Delete）**

仅显示自上次导入以来FBX场景中已移除的资源。

**覆盖（Overwrite）**

仅显示上次导入时将被覆盖的资源。

**差异（Diff）**

仅显示自上次导入以来已更改（添加或删除）的资源。

### 重新导入场景选项卡

"重新导入场景"选项卡与原始"导入至关卡"操作中的"场景"选项卡基本相同。但存在重大区别，即重新导入层级的功能。 如选中重新导入层级的复选框（位于选项组的顶部）重新导入蓝图层级，将丢失对蓝图组件列表所做的更改。 对蓝图所做的节点图表更改将保留。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a97603ef-25f7-417c-889e-3d75f4b55fcd/reimportscene.png)

### 重新导入静态网格体选项卡

"重新导入静态网格体"选项卡显示的功能与"FBX场景导入"对话框中的标准[静态网格体选项卡](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E9%80%89%E9%A1%B9%E5%8D%A1)相同，该选项卡现在应用于正在重新导入的网格体。 也可使用[过滤选项](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5%E5%88%97%E8%A1%A8%E8%BF%87%E6%BB%A4%E5%99%A8%E6%8C%89%E9%92%AE)对结果进行过滤。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72b5d068-6b5b-4336-9143-bee8f7e58831/reimportsm.png)

### 重新导入骨架网格体选项卡

"重新导入骨架网格体选项卡"显示的功能与"FBX场景导入"对话框中的标准[骨架网格体选项卡](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E9%AA%A8%E6%9E%B6%E7%BD%91%E6%A0%BC%E4%BD%93%E9%80%89%E9%A1%B9%E5%8D%A1)相同，该选项卡现在应用于正在重新导入的网格体。 也可使用[过滤选项](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5%E5%88%97%E8%A1%A8%E8%BF%87%E6%BB%A4%E5%99%A8%E6%8C%89%E9%92%AE)对结果进行过滤。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98726940-b0dd-4bcf-bd93-112276d316cf/reimportsk.png)

### 重新导入材质选项卡

"重新导入材质网格体选项卡"显示的功能与"FBX场景导入"对话框中的标准[材质选项卡](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E6%9D%90%E8%B4%A8%E9%80%89%E9%A1%B9%E5%8D%A1)相同，该选项卡现在应用于正在重新导入的FBX场景的材质部分。

注意：导入器不会覆盖现有材质！

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc78a4da-adf0-452e-8f86-31ea7c8302ec/reimportmats.png)

-   [import](https://dev.epicgames.com/community/search?query=import)
-   [fbx](https://dev.epicgames.com/community/search?query=fbx)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [FBX完整场景工作流](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#fbx%E5%AE%8C%E6%95%B4%E5%9C%BA%E6%99%AF%E5%B7%A5%E4%BD%9C%E6%B5%81)
-   [FBX场景导入选项对话框](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#fbx%E5%9C%BA%E6%99%AF%E5%AF%BC%E5%85%A5%E9%80%89%E9%A1%B9%E5%AF%B9%E8%AF%9D%E6%A1%86)
-   [场景选项卡](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E5%9C%BA%E6%99%AF%E9%80%89%E9%A1%B9%E5%8D%A1)
-   [可用选项](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E5%8F%AF%E7%94%A8%E9%80%89%E9%A1%B9)
-   [静态网格体选项卡](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E9%80%89%E9%A1%B9%E5%8D%A1)
-   [骨架网格体选项卡](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E9%AA%A8%E6%9E%B6%E7%BD%91%E6%A0%BC%E4%BD%93%E9%80%89%E9%A1%B9%E5%8D%A1)
-   [材质选项卡](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E6%9D%90%E8%B4%A8%E9%80%89%E9%A1%B9%E5%8D%A1)
-   [选项覆盖](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E9%80%89%E9%A1%B9%E8%A6%86%E7%9B%96)
-   [完整场景重新导入](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E5%AE%8C%E6%95%B4%E5%9C%BA%E6%99%AF%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5)
-   [场景重新导入工作流](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E5%9C%BA%E6%99%AF%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5%E5%B7%A5%E4%BD%9C%E6%B5%81)
-   [重新导入列表过滤器按钮](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5%E5%88%97%E8%A1%A8%E8%BF%87%E6%BB%A4%E5%99%A8%E6%8C%89%E9%92%AE)
-   [重新导入场景选项卡](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5%E5%9C%BA%E6%99%AF%E9%80%89%E9%A1%B9%E5%8D%A1)
-   [重新导入静态网格体选项卡](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E9%80%89%E9%A1%B9%E5%8D%A1)
-   [重新导入骨架网格体选项卡](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5%E9%AA%A8%E6%9E%B6%E7%BD%91%E6%A0%BC%E4%BD%93%E9%80%89%E9%A1%B9%E5%8D%A1)
-   [重新导入材质选项卡](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine#%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5%E6%9D%90%E8%B4%A8%E9%80%89%E9%A1%B9%E5%8D%A1)