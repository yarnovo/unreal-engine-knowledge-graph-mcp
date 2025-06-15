# 在虚幻引擎中创建新的物理资产 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-a-new-physics-asset-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:51:18.381Z

---

目录

![创建新的物理资产](https://dev.epicgames.com/community/api/documentation/image/59a9f8fe-0a9f-4634-9373-6b468328165c?resizing_type=fill&width=1920&height=335)

创建新 **物理资产（Physics Asset）** 的方法有两种：在导入时创建或使用 **内容侧滑菜单（Content Drawer）** 中的上下文菜单创建。以下是这两种方法的操作步骤和相应界面。

## 步骤

导入骨骼网格体时，将会有一个选项可以在导入时生成物理资产。导入的文件被处理后，将使用默认属性生成一个新的物理资产，可以使用 **物理资产编辑器（Physics Asset Editor）** 修改这些属性。

![An option to generate a Physics Asset for Skeletal Mesh as it is imported](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1865d35e-8439-4569-aa68-57d9379fd121/import-fbx-1.png)

若要选择使用现有物理资产，你可以禁用 **创建物理资产（Create Physics Asset）** 复选框，然后使用下拉菜单选择适当的物理资产。

![You can choose to use an existing Physical Asset by disabling the Create Physics Asset checkbox and select the appropriate Physics Asset using the dropdown menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae1c3610-5b99-4000-8680-633a407fa0e3/import-fbx-2.png)

但如果你稍后需要为骨骼网格体创建物理资产，可以按照以下步骤操作：

1.  在 **内容侧滑菜单（Content Drawer）** 中找希望添加物理资产的骨骼网格体资产。
2.  右键点击该 **骨骼网格体**，打开 **上下文菜单**，选择 **创建（Create）-> 物理资产（Physics Asset）-> 创建（Create）**。
    
    ![Right-click on the Skeletal Mesh to open the Context Menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eea5ff38-3228-4a5a-848c-35ef1f44d263/create-physics-asset.png)
3.  根据自己的喜好调整属性。
    
    ![Adjust the properties to your liking](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d023caf1-ea0b-4b57-b9a4-faecb84781d9/new-physics-asset.png)
4.  点击 **创建资产（Create Asset）**。

## 结果

创建 **物理资产（Physics Asset）** 时，你会发现它与自己的创建基础 **骨骼网格体（Skeletal Mesh）** 位于相同的文件夹内。

-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/creating-a-new-physics-asset-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [结果](/documentation/zh-cn/unreal-engine/creating-a-new-physics-asset-in-unreal-engine#%E7%BB%93%E6%9E%9C)