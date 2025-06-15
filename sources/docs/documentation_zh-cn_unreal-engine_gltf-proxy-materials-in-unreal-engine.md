# 虚幻引擎中的glTF代理材质 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/gltf-proxy-materials-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:07:02.532Z

---

目录

![glTF代理材质](https://dev.epicgames.com/community/api/documentation/image/135f6065-fd59-46e4-9d5e-adf2b976417d?resizing_type=fill&width=1920&height=335)

**glTF代理材质（glTF proxy Materials）** 是你的虚幻引擎关卡中烘焙版本的材质。它们针对glTF导出进行了优化，最常用于在运行时导出材质。由于材质烘焙以及glTF导出器所依赖的其他技术在运行时无法实现，代理材质是恰当导出材质的唯一方式。

glTF代理材质还适合用于：

-   **预览** ：生成代理材质时，虚幻引擎材质外观与将其导出到glTF时完全一样。
-   **性能** ：使用glTF代理材质会加速glTF导出，因为导出器不再需要执行材质烘焙，这是导出过程中最耗时的部分。

一些虚幻引擎材质使用特定于网格体的数据，例如世界位置、顶点颜色，等等。glTF导出器可以使用特定于网格体的数据烘焙虚幻引擎材质，但无法使用特定于网格体的数据创建代理材质。如果材质使用特定于网格体的数据，而你需要为该材质创建代理，那么你必须使用每个网格体单独创建代理。

## 创建glTF代理材质

通过虚幻引擎材质创建glTF代理材质时，代理会显示在包含源材质的文件夹的 `GLTF`子文件夹中。其名称为源材质的名称加上前缀 `MI_GLTF` 。

要创建glTF代理材质，请执行以下操作：

1.  在 **内容浏览器（Content Browser）** 中，右键点击材质。
2.  从右键点击菜单中，选择 **创建GLTF代理材质（Create GLTF Proxy Material）** 。

创建代理材质时，glTF导出器会在虚幻引擎材质的 **资产用户数据（Asset User Data）** 数组中自动创建其引用。

要查看或修改引用，请执行以下操作：

1.  在 **内容浏览器（Content Browser）** 中，选择资产并进行编辑。
2.  在 **细节（Details）** 面板中，展开 **资产用户数据（Asset User Data）** 分段。
3.  找到 **资产用户数据（Asset User Data）** 行，并点击 **添加元素（Add Element (+)）** 。将显示新的 **索引（Index）** 行。
4.  从新的索引行中的下拉列表，选择 **GLTF材质导出选项（GLTF Material Export Options）** 。
5.  展开 **索引（Index）> 通用（General）** 分段。
6.  在 **代理（Proxy）** 设置中，你可以查看或修改对glTF代理材质的引用。

-   [gltf](https://dev.epicgames.com/community/search?query=gltf)
-   [gl transmission format](https://dev.epicgames.com/community/search?query=gl%20transmission%20format)
-   [import / export](https://dev.epicgames.com/community/search?query=import%20%2F%20export)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建glTF代理材质](/documentation/zh-cn/unreal-engine/gltf-proxy-materials-in-unreal-engine#%E5%88%9B%E5%BB%BAgltf%E4%BB%A3%E7%90%86%E6%9D%90%E8%B4%A8)