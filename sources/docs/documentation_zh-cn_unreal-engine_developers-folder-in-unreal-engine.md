# 虚幻引擎中的开发者文件夹 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developers-folder-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:52:17.085Z

---

目录

![开发者文件夹](https://dev.epicgames.com/community/api/documentation/image/7d7764ad-ea73-4dfb-a0be-cee85d545297?resizing_type=fill&width=1920&height=335)

在 **内容浏览器（Content Browser）** 的 **开发者（Developers）** 文件夹中，可复制和处理资产，不必担心破坏项目中的内容。使用"开发者（Developers）"文件夹可尝试不同的操作，包括小规模资产修改，一直到项目级重构。

如果你与其他开发者在共享项目中进行协作，则每个开发者都会有自己的文件夹。

"开发者（Developers）"文件夹使用与Windows用户名相同的名称，但不包含虚幻引擎文件夹名称中不允许使用的字符，如句点或空格。

由于"开发者（Developers）"文件夹旨在用作沙盒环境，因此切勿在此文件夹之外的任何位置引用此文件夹中的资产。这样做可能会导致在烘焙项目时出错或导致烘焙失败。

## 启用开发者文件夹

如果在"内容浏览器（Content Browser）"中看不到"开发者（Developers）"文件夹，请按照以下步骤启用该文件夹：

1.  在 **内容浏览器（Content Browser）** 中，单击 **设置（Settings）**。
    
2.  在"设置（Settings）"菜单中，启用 **显示开发者内容（Show Developer Content）** 选项。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fbacb096-4b07-4d03-b119-91b7adb390a2/ue5_1-enable-developers-folder.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fbacb096-4b07-4d03-b119-91b7adb390a2/ue5_1-enable-developers-folder.png)

点击图片以查看大图。

## 与其他开发者协作

如果使用[源码控制系统](/documentation/zh-cn/unreal-engine/source-control-in-unreal-engine)，则可配置虚幻引擎以查看其他开发者的文件夹中的资产。请按照以下步骤执行此操作：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbf114c1-f078-40da-be24-3764db484243/ue5_1-other-developers-filter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbf114c1-f078-40da-be24-3764db484243/ue5_1-other-developers-filter.png)

点击图片以查看大图。

1.  在 **内容浏览器（Content Browser）** 中，单击 **过滤器（Filters）** 按钮。
    
2.  在"过滤器（Filters）"菜单中，选择 **其他过滤器（Other Filters）> 其他开发者（Other Developers）**。
    

## 从烘焙版本中排除开发者文件夹

如果要确保不会意外打包已损坏或正在处理的资产，可从烘焙版本中排除"开发者（Developers）"文件夹。请按照以下步骤执行此操作：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36a5d102-a645-4b1a-8a51-f868ebebe87d/ue5_1-directories-to-never-cook.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36a5d102-a645-4b1a-8a51-f868ebebe87d/ue5_1-directories-to-never-cook.png)

点击图片以查看大图。

1.  在主菜单中，转到 **编辑（Edit）> 项目设置（Project Settings）**，然后搜索 **从不烘焙的目录（Directories to never cook）** 数组。

可使用该分段顶部的 **搜索（Search）** 框找到此数组。

1.  单击 **添加（+）（Add (+)）** 按钮向数组中添加新项目。
    
2.  单击 **…** 以打开项目中的文件夹列表。
    
3.  单击 **开发者（Developers）** 文件夹以将其选中。
    

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用开发者文件夹](/documentation/zh-cn/unreal-engine/developers-folder-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%BC%80%E5%8F%91%E8%80%85%E6%96%87%E4%BB%B6%E5%A4%B9)
-   [与其他开发者协作](/documentation/zh-cn/unreal-engine/developers-folder-in-unreal-engine#%E4%B8%8E%E5%85%B6%E4%BB%96%E5%BC%80%E5%8F%91%E8%80%85%E5%8D%8F%E4%BD%9C)
-   [从烘焙版本中排除开发者文件夹](/documentation/zh-cn/unreal-engine/developers-folder-in-unreal-engine#%E4%BB%8E%E7%83%98%E7%84%99%E7%89%88%E6%9C%AC%E4%B8%AD%E6%8E%92%E9%99%A4%E5%BC%80%E5%8F%91%E8%80%85%E6%96%87%E4%BB%B6%E5%A4%B9)