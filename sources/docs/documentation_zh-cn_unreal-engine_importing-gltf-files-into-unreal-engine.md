# 将glTF文件导入到虚幻引擎中 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/importing-gltf-files-into-unreal-engine
> 
> 生成时间: 2025-06-14T19:06:38.061Z

---

目录

![导入glTF文件](https://dev.epicgames.com/community/api/documentation/image/768da3bb-8547-4b1b-859e-c0e6b78ca5bb?resizing_type=fill&width=1920&height=335)

你可以像导入其他类型的内容一样，将 **glTF** 内容导入到虚幻引擎中。你可以导入整个场景或特定资产。

你可以导入以下glTF格式：

格式

说明

JSON `.gltf`

包含以下元素，在你指定的目录中单独保存：

-   **全场景说明：** 保存为JSON格式化、人工可读的UTF-8文本文件，扩展名为 `.gltf` 。
-   **纹理文件：** 保存到你指定的格式， `.png` 、 `.jpeg` ，等等。
-   **二进制数据文件：** 保存的单独文件，文件扩展名为 `.bin` 。

Binary `.glb`

将全场景说明、所有二进制数据和所有纹理合并为单个完全独立的二进制文件。

## 从glTF文件导入单独的资产

你可以像导入其他资产一样，将glTF资产导入到虚幻引擎中。

1.  在 **内容浏览器（Content Browser）** 中，执行以下某项操作：
    -   在 **+添加（Add）** 菜单中，使用 **导入到（Import to）** 命令。如需详细说明，请参阅[从内容浏览器导入](/documentation/zh-cn/unreal-engine/importing-assets-directly-into-unreal-engine#%E4%BB%8E%E5%86%85%E5%AE%B9%E6%B5%8F%E8%A7%88%E5%99%A8%E5%AF%BC%E5%85%A5)。
    -   将glTF资产拖放到内容浏览器中。如需详细说明，请参阅[使用拖放导入](/documentation/zh-cn/unreal-engine/importing-assets-directly-into-unreal-engine#%E4%BD%BF%E7%94%A8%E6%8B%96%E6%94%BE%E5%AF%BC%E5%85%A5)。 你使用的任意工作流程都将打开 **交换管线配置（导入内容）（The Interchange Pipeline Configuration (Import Content)）** 对话框。
2.  根据需要设置导入选项，然后点击 **导入（Import）** 。

## 将glTF场景导入到虚幻引擎关卡中

你可以遵照导入FBX等其他场景格式的相同导入工作流程，将完整glTF场景导入到虚幻引擎中。

1.  从主菜单，选择 **文件（File）> 导入到关卡中（Import Into Level）** 。
2.  选择包含你想导入的场景的 `.gtlf` 或 `.glb` 文件，然后点击"打开（Open）"。
    
    这将打开 **选择用于导入场景内容的位置（Choose location for importing scene content）** 对话框。
    
3.  选择你的虚幻引擎项目中的目标文件夹，然后点击"确定"。
    
    将打开 **交换管线配置（导入内容）（Interchange Pipeline Configuration (Import Content)）** 对话框。
    
4.  根据需要设置导入选项，然后点击 **导入（Import）** 。

-   [gltf](https://dev.epicgames.com/community/search?query=gltf)
-   [gl transmission format](https://dev.epicgames.com/community/search?query=gl%20transmission%20format)
-   [import / export](https://dev.epicgames.com/community/search?query=import%20%2F%20export)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [从glTF文件导入单独的资产](/documentation/zh-cn/unreal-engine/importing-gltf-files-into-unreal-engine#%E4%BB%8Egltf%E6%96%87%E4%BB%B6%E5%AF%BC%E5%85%A5%E5%8D%95%E7%8B%AC%E7%9A%84%E8%B5%84%E4%BA%A7)
-   [将glTF场景导入到虚幻引擎关卡中](/documentation/zh-cn/unreal-engine/importing-gltf-files-into-unreal-engine#%E5%B0%86gltf%E5%9C%BA%E6%99%AF%E5%AF%BC%E5%85%A5%E5%88%B0%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E5%85%B3%E5%8D%A1%E4%B8%AD)