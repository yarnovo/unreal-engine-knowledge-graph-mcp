# 虚幻引擎草地工具快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/grass-quick-start-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:17:33.453Z

---

目录

![草地工具快速入门](https://dev.epicgames.com/community/api/documentation/image/7d8bd996-077f-4d6d-80dc-416c0ca23ee4?resizing_type=fill&width=1920&height=335)

### 概述

此快速入门指南将讲解如何为地形设置和并应用草地纹理。 本快速入门教程将介绍创建、设置和生成静态网格体的方法，给地形覆盖上茂密的草地。 本文还将介绍关键属性和设置，可协助打造虚拟草地，以适应项目需求。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4151b477-3b2a-4a65-a517-0328156707ec/01-t-grass-intro.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4151b477-3b2a-4a65-a517-0328156707ec/01-t-grass-intro.png)

点击查看大图。

同时还可了解所有必要Actor和属性，以保证草地效果正常生效并输出理想结果。 完成本快速入门时，将得到类似下图的新关卡。

当前草地系统仅能与地形Actor配合使用。在其他任何Actor类型上使用草地系统，将无法生成草地。

## 1 - 必备软件

下载 **Open World Demo Collection** 内容包，因为接下来的快速入门中将使用该内容包的部分内容。 下载Open World Demo Collection后，执行以下步骤将其添加到用于进行本快速入门练习的项目：

1.  在Epic Games 启动程序的 **学习** 或**商城** 页面中找到并下载 **Open World Demo Collection**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d408ef14-9a96-448f-97ee-e10ca8a158c0/02-owdc-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d408ef14-9a96-448f-97ee-e10ca8a158c0/02-owdc-1.png)
    
    点击查看大图。
    
2.  前往启动程序的 **库** 部分，在 **保管库（Vault）** 部分找到Open World Demo Collection。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/028feca3-1e1b-433a-bda6-2f83dc07869f/03-owdc-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/028feca3-1e1b-433a-bda6-2f83dc07869f/03-owdc-2.png)
    
    点击查看大图。
    
3.  点击 **添加到项目** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d396710-f77e-4458-a5f2-54d84fd97078/04-add-to-project.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d396710-f77e-4458-a5f2-54d84fd97078/04-add-to-project.png)
    
    点击查看大图。
    
4.  将显示可添加此包的项目列表。选择本快速入门练习所用的属性，然后按 **添加到项目** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b45f263f-77ed-4865-8e79-3e3b347c7060/05-select-project.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b45f263f-77ed-4865-8e79-3e3b347c7060/05-select-project.png)
    
    点击查看大图。
    

## 2 - 初始关卡设置

现在，要新建关卡和地形以便获得应用草地的对象。

1.  新建关卡，使用空白的 **默认** 模板。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/232a5526-c25c-409e-a992-a03558b3f82e/06-t-new-level.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/232a5526-c25c-409e-a992-a03558b3f82e/06-t-new-level.png)
    
    点击查看大图。
    
2.  在关卡中添加一个新的地形Actor（Landscape Actor）。在主工具栏中，点击 **模式（Modes）** 按钮，然后选择 **地形（Landscape）** 按钮，显示地形面板和工具栏，然后点击 **创建（Create）** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51a580e3-d3aa-4f74-956e-324de0f670a3/07-create-landscape.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51a580e3-d3aa-4f74-956e-324de0f670a3/07-create-landscape.png)
    
    点击查看大图。
    
3.  为更好展示草地工具，向地形地面添加少许噪点，使其不完全平坦。在 **地形（Landscape）** 工具栏的 **雕刻(Sculpt)** 选项卡中，在工具列表中选择 **噪点（Noise）** 工具， 将噪点属性设置成以下值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06c340d1-43d7-441b-ab22-c739e9784b4c/08-t-sculpt-tool-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06c340d1-43d7-441b-ab22-c739e9784b4c/08-t-sculpt-tool-settings.png)
    
    点击查看大图。
    
    属性名称
    
    值
    
    更多详情
    
    **笔刷大小**
    
    65536.0
    
    该属性提供大型笔刷，足以一次性影响整个地形。
    
    **工具强度（Tool Strength）**
    
    0.01
    
    由于只需十分细微的效果，因此将工具强度设至极低，并利用绘制添加强度。
    
    **噪点缩放（Noise Scale）**
    
    256
    
    设置粳稻的噪点缩放，使噪点应用到地形时更平滑、更自然。
    
4.  将地形笔刷放入视口中，以便其覆盖整个地形，然后点击鼠标左键 **3** 到 **4** 次，向地形添加部分十分细微的噪点。
    
5.  退出地形模式。点击 **模式（Modes）** 按钮，然后选择 **选择（Select）** 显示 **放置Actor（Place Actors）** 面板。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69bfe486-8606-45e9-af97-7491de128edc/09-place-actors.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69bfe486-8606-45e9-af97-7491de128edc/09-place-actors.png)
    
    点击查看大图。
    
    完成后，应能得到类似下图的结果。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d57bec7f-1b24-4b6c-80e7-c76c74c57702/10-t-noise-on-landscape.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d57bec7f-1b24-4b6c-80e7-c76c74c57702/10-t-noise-on-landscape.png)
    
    点击查看大图。
    
    草地系统也适用于完全平坦的地形。以上对地形的修改纯粹出于美术目的，以便更好展示最终效果。
    

## 3 - 创建和设置草地工具Actor

接下来要创建所需的Actor和材质，以便草地工具能正常工作。 我们会继续使用上一步中创建的关卡。

1.  创建地形草地类型：在 **内容浏览器** 中 **点击右键**，然后在显示的快捷菜单中选择 **植被（Foliage）** > **地形草地类型（Landscape Grass Type）** 并将其命名为 **Grass\_00**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7a15812-dbf7-4f7d-a9a1-4e50a49605e2/11-t-create-ls-grass.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7a15812-dbf7-4f7d-a9a1-4e50a49605e2/11-t-create-ls-grass.png)
    
    点击查看大图。
    
2.  打开地形草地类型并在 **草地品种（Grass Varieties）** 阵列中添加一个新项目：**双击** **地形草地类型**，并在其打开后按下 **草地品种（Grass Varieties）** 名称右侧的 **加号** 图标。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2879074c-03a4-4f3b-8dd8-39d1f0f9558c/12-t-add-new-gv.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2879074c-03a4-4f3b-8dd8-39d1f0f9558c/12-t-add-new-gv.png)
    
    点击查看大图。
    
3.  在 **地形草地类型** Actor中找到 **草地网格体** 部分，然后点击显示为 **无** 的输入框，输入 **SM\_FieldGrass\_01** 作为搜索词，再点击 **SM\_FieldGrass\_01** 将其加载为 **草地网格体**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1d1cfaf-31f8-4efd-8c13-9a5d89772acb/13-t-set-grass-type.gif)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1d1cfaf-31f8-4efd-8c13-9a5d89772acb/13-t-set-grass-type.gif)
    
    点击查看大图。
    
4.  添加静态网格体后，需设置下列属性确保生成足够草地网格体，并使此类网格体随机旋转和对齐到地形。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f76cb44-166a-4dbd-8cda-97e72cf5ed4c/14-t-grass-props.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f76cb44-166a-4dbd-8cda-97e72cf5ed4c/14-t-grass-props.png)
    
    点击查看大图。
    
    属性名称
    
    值
    
    更多详情
    
    **草地密度**
    
    400.0
    
    如想得到草地效果，须生成大量静态网格体使地形看起来覆盖着茂密的草地。
    
    **使用网格**
    
    Enabled
    
    使静态网格体放置得更自然，此值将偏移其放置位置。
    
    **随机旋转**
    
    Enabled
    
    将随机旋转给予用于植被和草地的静态网格体，确保不会总是看到所用静态网格体的相同面，增加场景的视觉多样性。
    
    **对齐到表面**
    
    Enabled
    
    此属性可确保所用静态网格体与地形表面贴合。
    

## 4 - 地形材质与草地工具

开始使用草地工具前，还须创建可与地形及 **地形草地类型** 同时使用的材质。 下一章节中将介绍设置此材质及与其链接的方法，以使其与地形草地类型配合使用。

如要更深入地了解UE4中地形的工作原理，请查看[地形](/documentation/zh-cn/unreal-engine/landscape-outdoor-terrain-in-unreal-engine)页面了解更多信息。

1.  **内容浏览器** 中 **点击右键**，然后在 **创建基本资源** 部分选择 **材质和纹理（Material & Textures）** 选项新建用于地形的材质，并将其命名为 **MAT\_GT\_Grass**
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a47ecd6-5466-4f89-b0e8-c450fe76ab8e/15-t-create-new-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a47ecd6-5466-4f89-b0e8-c450fe76ab8e/15-t-create-new-material.png)
    
    点击查看大图。
    
2.  在 **内容浏览器** 中 **双击** **MAT\_GT\_Grass** 材质将其打开，然后将下列两个纹理从 **Open World Demo Collection** 添加到材质图表。
    
    -   **T\_AlpinePatch001\_D\_alt\_R**
    -   **T\_GDC\_Grass01\_D\_NoisyAlpha**
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/307317b5-cca8-4107-ad61-9ab28f3bdfef/16-t-added-textures.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/307317b5-cca8-4107-ad61-9ab28f3bdfef/16-t-added-textures.png)
    
    点击查看大图。
    
3.  使用 **控制板** 搜索功能搜索下方列出的材质表达式节点。 找到所需材质表达式节点后，在控制板中选中，然后拖进材质图表中。
    
    材质表达式命名
    
    数量
    
    更多详情
    
    **Landscape Layer Blend**
    
    1
    
    要使地形更加逼真，时常需将多个地形同时或分别混合和绘制，利用地形图层混合（Landscape Layer Blend）便可进行此操作。
    
    **Landscape Layer Sample**
    
    1
    
    利用此材质表达式，材质和地形可互相对话，确保绘制某个材质图层时使用正确的静态网格体。
    
    **Landscape Grass Output**
    
    1
    
    利用此表达式，地形能够根据地形材质中的设置生成草地类型。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9ddf839-b1fb-4068-aa9f-5fe2186ecf29/17-t-add-material-nodes.gif)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9ddf839-b1fb-4068-aa9f-5fe2186ecf29/17-t-add-material-nodes.gif)
    
    点击查看大图。
    
    如不太熟悉UE4材质编辑器的工作方式，或希望了解更多相关信息，请查看官方 \*\*[虚幻引擎材质文档](/documentation/zh-cn/unreal-engine/unreal-engine-materials)，了解材质相关事物的更多信息。
    
4.  选择 **Landscape Layer Blend** 节点，然后在 **细节** 面板中的 **图层** 部分中，双击 **加号** 图标，向其添加两个新图层。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/258ecab9-795a-4379-af6a-74f746a4d906/18-t-lb-add-2-layers.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/258ecab9-795a-4379-af6a-74f746a4d906/18-t-lb-add-2-layers.png)
    
    点击查看大图。
    
5.  添加两个图层后，将其中一个的 **图层命名** 设为 **Grass**，另一个的 **图层命名** 设为 **Rock**，并将两者的 **预览权重（Preview Weight）** 都设为 **1.0**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7874bf0-e432-45e6-ba73-9e7af72829a0/19-t-ls-layer-blend-setup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7874bf0-e432-45e6-ba73-9e7af72829a0/19-t-ls-layer-blend-setup.png)
    
    点击查看大图。
    
6.  将 **T\_AlpinePatch001\_D\_alt\_RDaltR** 纹理连接到 **Landscape Layer Blend** 节点上的 **图层岩石** 输入，然后将 **T\_GDC\_Grass01\_D\_NoisyAlpha** 连接到 **图层草地** 输入，最后将 **Landscape Layer Blend** 节点的 **输出** 连接到主材质节点 **Mat\_GT\_Grass** 上的 **基础颜色（Base Color）** 输入。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae054d82-6fa8-4ed5-911c-14bc3402b021/20-t-hook-up-textures.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae054d82-6fa8-4ed5-911c-14bc3402b021/20-t-hook-up-textures.png)
    
    点击查看大图。
    
7.  在 **内容浏览器** 中，选择上一步中创建的 **Grass\_00** 地形草地类型。
    
8.  在 **材质** 中的 **草地类型** 选项下，按 **箭头** 图标加载当前内容浏览器内选中的Actor。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20377440-eaa0-42e5-b22e-a91b9622eb9e/21-t-input-grass-type.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20377440-eaa0-42e5-b22e-a91b9622eb9e/21-t-input-grass-type.png)
    
    点击查看大图。
    
9.  选择 **Landscape Layer Sample** 节点，在 **参数命名（Parameter Name）** 下输入 **Grass** 作为命名，并将 **Landscape Layer Sample** 的输出连接到 **Landscape Grass Output** 节点的输入。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcfad142-e2a0-4707-ac58-851037cf1ffd/22-t-llw-setup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcfad142-e2a0-4707-ac58-851037cf1ffd/22-t-llw-setup.png)
    
    点击查看大图。
    
10.  完成后可得到类似下图的材质。和往常一样，记住按 **应用** 和 **保存** 按钮编译并保存材质。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/157b2159-db2f-442b-ae95-18c8f3b880e0/23-t-final-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/157b2159-db2f-442b-ae95-18c8f3b880e0/23-t-final-material.png)
    
    点击查看大图。
    

## 5 - 使用草地工具

为了查看草地系统的效果，需将上一步中创建的材质应用到地形，然后使用地形绘图工具定义要生成草地的位置。 下一章节中将介绍将材质应用到地形，再使用地形绘图工具定义应生成草地的区域的方法。 我们将继续使用上一步创建的关卡。

1.  在视口中点击并选择关卡中放置的地形Actor。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61b8b073-02dd-4fec-8dbc-41e9a6ed0104/24-t-selected-landscape.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61b8b073-02dd-4fec-8dbc-41e9a6ed0104/24-t-selected-landscape.png)
    
    点击查看大图。
    
2.  在 **内容浏览器** 中找到 **MAT\_GT\_Grass** 材质，点击并选择。
    
3.  在地形上，在 **细节** 面板的 **地形材质** 部分中，按 **箭头** 图标将 **MAT\_GT\_Grass** 材质应用到地形。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0caf587-16a2-46a6-9ff2-9bffc2d517d5/25-t-apply-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0caf587-16a2-46a6-9ff2-9bffc2d517d5/25-t-apply-material.png)
    
    点击查看大图。
    
4.  在 **主工具栏（Main Toolbar）** 中点击 **模式（Mode）** 按钮，选择 **地形（Landscape）** 模式。在 **地形（Landscape）** 工具栏中，点击 **绘制（Paint）** 选项卡进入 **绘制（Paint）** 模式。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c33ec4fb-2044-41ac-9708-2d4e5c5d7d39/26-t-landscape-paint-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c33ec4fb-2044-41ac-9708-2d4e5c5d7d39/26-t-landscape-paint-mode.png)
    
    点击查看大图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90a227e8-c955-405c-8c17-acfdd3413e41/27-t-landscape-paint-mode-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90a227e8-c955-405c-8c17-acfdd3413e41/27-t-landscape-paint-mode-1.png)
    
    点击查看大图。
    
5.  在 **目标图层** 部分，按位于图层命名最右端的 **加号** 图标添加新的 **图形信息**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4aa6ebf9-f7a0-460f-b3d7-cfc949c24067/28-t-add-target-layers.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4aa6ebf9-f7a0-460f-b3d7-cfc949c24067/28-t-add-target-layers.png)
    
    点击查看大图。
    
6.  弹出提示时，选择 **权重混合图层（法线）（Weight- Blended Layer(normal)）** 选项，然后在内容浏览器中选择要保存新图层混合的位置。 确保创建Rock和Grass的 **图层信息**。
    
7.  选择 **草地** 目标图层，然后在视口中长按 **鼠标左键** 开始将草地材质绘制到地形。 在此步中，要尽量完全覆盖地形，便可得到类似此图的结果。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78086ec7-65a9-4b67-8318-7c0e5c880595/29-t-painting-grass-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78086ec7-65a9-4b67-8318-7c0e5c880595/29-t-painting-grass-2.png)
    
    点击查看大图。
    
    开始在地形上绘制时，生成草地时编辑器可能会失去响应，这取决于开发PC的性能。 绘制完成后将动态生成草地，因此这是正常现象。 在操作时调低 **地形草地类型** 中的 **草地密度（Grass Density）**，完成后再重新调至所需水平，以便缓解此现象。
    
8.  要在地形中删除草地，选择岩石目标图层，然后在视口中长按 **鼠标左键**，开始使用岩石纹理替换草地纹理。
    
    调整 **笔刷大小** 和 **工具强度（Tool Strength）**，在地形上绘制时有助于更好定义放置或删除草地的方式。
    

## 6 - 自行尝试

现已了解草地工具带有的功能，请尝试利用刚学到的知识，结合下列工具，制作出类似下图的关卡：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28600b36-428e-4906-b079-45ea74965a7a/44-t-on-your-own.png "On Your Own")

-   使用[程序性植被工具](/documentation/zh-cn/unreal-engine/procedural-foliage-tool-in-unreal-engine)，使地形被茂密的草地、花朵和灌木覆盖。
    
-   使用 **[地形雕刻](/documentation/zh-cn/unreal-engine/landscape-sculpt-mode-in-unreal-engine)** 工具添加丘陵、山脉和湖泊等特征，以定义地形的外观和效果。
    
-   创建包含可在地形上绘制的多种纹理的[地形材质](/documentation/zh-cn/unreal-engine/landscape-materials-in-unreal-engine)，使地形表面的视觉效果更多样，细节更丰富。
    
-   调整 **[定向光源](/documentation/zh-cn/unreal-engine/directional-lights-in-unreal-engine)**，使关卡的光照呈现出清晨或黄昏的光照效果。
    
-   设置关卡光照，使用完全基于动态的光照解决方案，其将利用动态阴影及 **[光线追踪距离场软阴影](/documentation/zh-cn/unreal-engine/distance-field-soft-shadows-in-unreal-engine)**。
    
-   尝试使用[植被系统](/documentation/zh-cn/unreal-engine/foliage-mode-in-unreal-engine) 工具删除或微调由过程植被工具放置的植被网格体的放置、旋转和比例，以便得到理想效果。
    
-   使用 **[摄像机](/documentation/zh-cn/unreal-engine/camera-actors-in-unreal-engine)** 结合 **[Sequencer](/documentation/zh-cn/unreal-engine/real-time-compositing-with-sequencer-in-unreal-engine)** 渲染出关卡的视频，向他人展示创作成果。
    

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [open world](https://dev.epicgames.com/community/search?query=open%20world)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/grass-quick-start-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [1 - 必备软件](/documentation/zh-cn/unreal-engine/grass-quick-start-in-unreal-engine#1-%E5%BF%85%E5%A4%87%E8%BD%AF%E4%BB%B6)
-   [2 - 初始关卡设置](/documentation/zh-cn/unreal-engine/grass-quick-start-in-unreal-engine#2-%E5%88%9D%E5%A7%8B%E5%85%B3%E5%8D%A1%E8%AE%BE%E7%BD%AE)
-   [3 - 创建和设置草地工具Actor](/documentation/zh-cn/unreal-engine/grass-quick-start-in-unreal-engine#3-%E5%88%9B%E5%BB%BA%E5%92%8C%E8%AE%BE%E7%BD%AE%E8%8D%89%E5%9C%B0%E5%B7%A5%E5%85%B7actor)
-   [4 - 地形材质与草地工具](/documentation/zh-cn/unreal-engine/grass-quick-start-in-unreal-engine#4-%E5%9C%B0%E5%BD%A2%E6%9D%90%E8%B4%A8%E4%B8%8E%E8%8D%89%E5%9C%B0%E5%B7%A5%E5%85%B7)
-   [5 - 使用草地工具](/documentation/zh-cn/unreal-engine/grass-quick-start-in-unreal-engine#5-%E4%BD%BF%E7%94%A8%E8%8D%89%E5%9C%B0%E5%B7%A5%E5%85%B7)
-   [6 - 自行尝试](/documentation/zh-cn/unreal-engine/grass-quick-start-in-unreal-engine#6-%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95)