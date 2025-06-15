# 虚幻引擎中的Paper 2D Flipbooks | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/paper-2d-flipbooks-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:16:10.298Z

---

目录

![Paper 2D Flipbooks](https://dev.epicgames.com/community/api/documentation/image/94a9fa94-d39b-4cd6-9d5c-9d9c44f5f1ba?resizing_type=fill&width=1920&height=335)

![The best way to think of Paper 2D Flipbooks is in the form of hand-drawn animation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b2d8890-4fe3-404c-9d43-af4d59934b6f/flipbook-banner-2.png)

理解 **Paper 2D Flipbooks** （简称 **Flipbooks**）的最佳方式是把它看做一种手绘动画的表现形式。原理是一系列有细微不同之处的图片快速"翻过"，从而产生动画的效果。在虚幻引擎中，Flipbooks由一系列关键帧组成，每帧均包含一个需要展示的[Sprite](/documentation/zh-cn/unreal-engine/how-to-import-and-use-paper-2d-sprites-in-unreal-engine) 和展示时长（以帧数为单位）。 **每秒帧率** 选项将决定帧的播放速度，确定每秒中存在多少动画"节奏"；可在 **细节** 面板中编辑关键帧，或使用 **Flipbook编辑器** 下方的 **时间轴** 进行编辑。

## 创建一个Flipbook

可通过多种方法进行Flipbook的创建。可创建一个需自行填入sprite的空白Flipbook或基于一系列选中的sprite自动生成一个Flipbook。

可导入一个JSON格式化sprite表单描述，它将导入相关纹理并为描述的帧创建sprite和一个Flipbook。查看 [Paper 2D 导入选项](/documentation/zh-cn/unreal-engine/import-sprites-in-unreal-engine) 中的详细内容。

### 空白Flipbooks

可通过下列方法创建一个空白 Flipbook。

**打开内容浏览器**：

1.  点击 **新建** 按钮，然后在 *动画* 的快捷菜单下选择 **纸质 Flipbook** 选项。
    
    ![In the context menu under Animation select the Paper Flipbook option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac4653c2-087b-46db-b2de-a591a0575975/flipbook-create-1.png)
    
    除点击 **新建** 外，也可在 **内容抽屉** 中 **单击右键** 打开快捷菜单。
    
2.  弹出输入新Flipbook名称的提示。
    
    ![New Flipbook](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a668c448-6653-4976-a36a-7e1d1e4df6a0/flipbook-create-2.png)
3.  选定名字之后，Flipbook资产便已成功创建。
    
    ![Your Flipbook asset has been created](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b7f0953-e360-4def-9ce3-317fe87dbd26/flipbook-create-3.png)
    
    左下角的星号提醒资源尚未保存，保存成功后将自动消失。
    

### 自动生成Flipbooks

以下是创建自动生成 Flipbook 的步骤。

**打开内容抽屉**：

1.  在 **内容抽屉**.中找到并选择需要被加入Flipbook的每个sprite。
    
    ![Locate and select each of the sprites you would like to include in the Flipbook in the Content Drawer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef573297-b48d-407d-9463-b814e859316c/autocreate-1.png)
2.  在任意sprite上 **单击右键**，然后从快捷菜单选择 **创建Flipbook** 选项。
    
    ![Select the Create Flipbook option from the context menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba3383a1-f5d3-44e8-957d-e51120439a4e/autocreate-2.png)
3.  弹出输入新Flipbook名称的提示。
    
    ![You will then be prompted to enter a name for your new Flipbook](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd352e09-f685-49ef-b583-c1e8feab88a0/autocreate-3.png)
4.  选定名字之后，Flipbook资产便成功创建。
    
    ![Your Flipbook asset has been created](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36e08024-9bce-4e2c-9305-023c6a03d629/autocreate-4.png)
    
    在 **内容抽屉**.中将鼠标悬停在Flipbook上即可预览Flipbook动画。
    

自动生成Flipbook时，用于sprite的命名规则 **十分重要**，因为sprite将以字母顺序添加至Flipbook。在以上示例中每个sprite皆被命名，**Idle\_x** 中的X就是序列的播放顺序。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建一个Flipbook](/documentation/zh-cn/unreal-engine/paper-2d-flipbooks-in-unreal-engine#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AAflipbook)
-   [空白Flipbooks](/documentation/zh-cn/unreal-engine/paper-2d-flipbooks-in-unreal-engine#%E7%A9%BA%E7%99%BDflipbooks)
-   [自动生成Flipbooks](/documentation/zh-cn/unreal-engine/paper-2d-flipbooks-in-unreal-engine#%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90flipbooks)

相关文档

[

材质

![材质](https://dev.epicgames.com/community/api/documentation/image/cdeef2f5-00ad-4403-bbd3-ee8f0b14330e?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-materials)

[

纹理

![纹理](https://dev.epicgames.com/community/api/documentation/image/ba1ff4b2-613a-41ac-a7d1-d350fedca14e?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)