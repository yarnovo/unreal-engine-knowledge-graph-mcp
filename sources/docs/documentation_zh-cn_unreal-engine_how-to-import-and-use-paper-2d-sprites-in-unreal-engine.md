# 虚幻引擎中的Paper 2D Sprites | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:16:50.425Z

---

目录

![Paper 2D Sprites](https://dev.epicgames.com/community/api/documentation/image/d37e62de-4920-4e1a-bb93-6fcdc2ed06ed?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f8f0efb-1721-4efa-9e9b-11870b4e5d2d/sprite-banner.png)

**Paper 2D** 中的 **Sprite** 本质上是一种映射了纹理和相关材质的平面网格体，可以在场景中渲染，并且完全在虚幻引擎中创建。简单而言，它可以在虚幻引擎中迅速绘制 2D 图像。

在虚幻引擎中，你可以使用 **Sprite 编辑器** 对 Sprite 进行编辑。该编辑器拥有以下四种模式：**查看** 模式，用于预览 Sprite 和常用统计数据。**编辑源区域（Edit Source Region）** 模式，用于编辑原始纹理的哪些区域会构成 sprite。**编辑碰撞** 用于显示和编辑 sprite 的碰撞体、**编辑渲染几何体** 用于显示和编辑 sprite的渲染几何体。

准备完一组 Sprite 资产之后，你便可以开始创建 **Flipbook**。Flipbook 会按照顺序播放你添加的的 Sprite，从而实现动画效果。详情请参见[Flipbook](/documentation/zh-cn/unreal-engine/paper-2d-flipbooks-in-unreal-engine)。

## 创建 Sprite

和其他资产一样，Sprite 需要在 **内容浏览器** 中创建。既可以作为空白资产从头创建，也可以从其他现有资产中生成，或使用导入数据进行创建。

### 空白 Sprite 资产

**创建全新空白 Sprite 资产的步骤：**

1.  在 **内容浏览器** 中点击 **新建** 按钮，然后在 *Paper2D* 下选择 **Sprite**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef4bbfd4-eb0d-487a-ab3e-fd240b2291fe/sprite-content-drawer.png)
    
    在 **内容浏览器** 中 **单击右键** 可以呼出相同的快捷菜单。
    
2.  为新 Sprite 资产命名。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b2476ac-1c00-4cdb-a6f4-952af86e8221/my-sprite-content-drawer.png)
3.  此时 Sprite 已被创建但尚未保存（左下角有星号提醒）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d8d1079-f647-42ed-aa17-52f0cd5a94c3/sprite-save-all.png)
    
    点击 **全部保存** 键保存 Sprite。
    
4.  **双击** 新建的 Sprite 资产，将其在 **Sprite 编辑器** 中打开。
    
5.  在 **细节** 面板中，可利用 **源纹理** 属性为 Sprite 资产指定一个纹理。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db41b342-defa-42de-93c6-42fa3b3d3afb/details-sprite.png)

关于如何在 **Sprite 编辑器** 中处理 Sprite，请查阅 [Sprite 编辑器引用](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine) 文档。

### 从纹理生成单一 Sprite

**从现有纹理资产中创建一个 sprite：**

1.  在 **内容编辑器** 中 **右键单击** 纹理资产，然后在 *Sprite 操作* 下选择 **创建 Sprite**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f8c4569-5db8-43f3-960b-8ff4fc2d45a1/choose-sprite.png)
2.  为新 Sprite 资产命名。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3173799-4fdc-4e51-863d-28ac56da0ed8/sprite-create-name.png)

### 从 Sprite 表单纹理生成一系列的 Sprite

**从 Sprite 表单纹理生成一系列 Sprite 的步骤：**

1.  在 **内容浏览器** 中 **右键单击** Sprite 表单纹理，然后在 *Sprite 操作* 下选择 **提取 Sprite**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03b985eb-4e18-40ce-b34e-5c8122726f3b/sprite-extract-menu.png)
2.  个体 Sprite 将自动被提取并添加到 **内容浏览器** 中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9db593a-151e-42e1-8989-60c616a44e2f/sprite-extract-result.png)

### 通过 JSON 文件导入

**Paper 2D** 自带一个 JSON 格式化 sprite 表单描述的导入器。这些表单描述可从 **Adobe Flash CS6** 或 **Texture Packer** 等工具中导出。它可导入任意引用纹理并为每个 sprite 创建 sprite 资产。该导入器还会将所有 sprite 认定为一个动画的帧。因此除个体 sprite 外还将同时默认创建一个 Flipbook。如不需要 Flipbook，可直接删除。

如需导入选项的更多内容，请查阅 [Paper 2D 导入选项](/documentation/zh-cn/unreal-engine/import-sprites-in-unreal-engine)。

## 创建 Sprite 材质

**Paper 2D** 插件含一套取样一种纹理并通过顶点颜色实现多样化的基础材质，还可通过点亮与不点亮的变化形成不透明、遮罩和半透明纹理。Sprite 和 Flipbook 上的默认材质为不点亮遮罩。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b12ef75-f06a-4dac-83e7-f88509de77ce/custom-material.png)

### 创建自定义 Sprite 材质

可通过复制现有材质或在 **内容浏览器** 中创建新材质这两种方式创建自定义 Sprite 材质。当 Sprite 被渲染时，Sprite 资产中定义的纹理将被输入材质中名为 **SpriteTexture** 的纹理参数中。可通过放置 **材质编辑器** 中的 **SpriteTextureSampler** 节点自动完成此操作。Sprite 范例会将其色彩作为顶点颜色进行传输，其可在材质中任意使用，而非仅作着色之用。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建 Sprite](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine#%E5%88%9B%E5%BB%BAsprite)
-   [空白 Sprite 资产](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine#%E7%A9%BA%E7%99%BDsprite%E8%B5%84%E4%BA%A7)
-   [从纹理生成单一 Sprite](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine#%E4%BB%8E%E7%BA%B9%E7%90%86%E7%94%9F%E6%88%90%E5%8D%95%E4%B8%80sprite)
-   [从 Sprite 表单纹理生成一系列的 Sprite](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine#%E4%BB%8Esprite%E8%A1%A8%E5%8D%95%E7%BA%B9%E7%90%86%E7%94%9F%E6%88%90%E4%B8%80%E7%B3%BB%E5%88%97%E7%9A%84sprite)
-   [通过 JSON 文件导入](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine#%E9%80%9A%E8%BF%87json%E6%96%87%E4%BB%B6%E5%AF%BC%E5%85%A5)
-   [创建 Sprite 材质](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine#%E5%88%9B%E5%BB%BAsprite%E6%9D%90%E8%B4%A8)
-   [创建自定义 Sprite 材质](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89sprite%E6%9D%90%E8%B4%A8)

相关文档

[

材质

![材质](https://dev.epicgames.com/community/api/documentation/image/cdeef2f5-00ad-4403-bbd3-ee8f0b14330e?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-materials)

[

纹理

![纹理](https://dev.epicgames.com/community/api/documentation/image/ba1ff4b2-613a-41ac-a7d1-d350fedca14e?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)