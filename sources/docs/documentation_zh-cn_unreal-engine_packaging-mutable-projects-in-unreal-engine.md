# 在虚幻引擎中打包Mutable项目 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/packaging-mutable-projects-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:03:45.547Z

---

目录

![打包Mutable项目](https://dev.epicgames.com/community/api/documentation/image/811594a7-43bf-4066-8e2e-ce883e50e5a2?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

在打包项目时，Mutable会像处理其他资产一样打包数据。

在运行时，Mutable不会使用可自定义对象的源图表。相反，它会将此图表转换为更高效的表示形式，并将其从资产中删除，就像蓝图或材质一样。

源图表中的大多数网格体和纹理都经过处理，并以Mutable的内部格式存储。这些经过处理的资源会被打包到.pak/.ucas容器中。除非被外部引用，否则转换为Mutable格式的源资产不会包含在构建中。

未经过处理的资产作为标准虚幻资产包含在包中。以下是可能包含在构建中的资产列表：

直通网格体和纹理（Mutable不会对其进行处理）

-   材质
-   骨架
-   参考的骨骼网格体
-   烘焙后的实例（不再是Mutable资产）

## 打包选项

-   基础可自定义对象在烘焙阶段进行编译。为了提升运行时性能和纹理质量，Mutable会重载基础对象中指定的一些编译选项。优化级别设置为 **最大（Maximum）** ，纹理压缩设置为 **高质量（High Quality）** 。

### 批量数据文件

经过处理的资源存储在批量数据文件中，并在生成实例时按需进行流送。这些文件有两种不同的存储格式：

-   **批量数据** 格式（ `.ubulk` 和 `.uptnl` ）
-   Mutable格式（ `.mut` 和 `.mut.high` ）

#### 批量数据格式

批量数据（ `.ubulk` ）是二进制blob的标准文件格式。它是默认格式，也是推荐格式。批量数据具有诸多优势，例如兼容按需内容、允许使用可选数据、加载时间稍快一些（在大型项目中尤为明显），以及与其他标准UE功能的集成度更高。

另一方面，它可能会生成有限数量的 `.ubulk` 文件，在某些情况下可能会导致较差的补丁结果。

#### Mutable格式

Mutable格式（ `.mut` 和 `.mut.high` ）的主要优势在于对输出有更多的控制。它对生成文件的数量没有限制，因此如果配置得当，可以产生较好的补丁效果。降低生成文件的大小上限会增加文件数量，提高精细度。

可以修改 **打包数据文件最大限制（Packaged Data File Max Limit）** 值，在编译选项中为每个对象设置Mutable文件的大小上限。此设置仅在打包项目时相关。

缺点是与部分UE功能的集成度较差。不支持按需内容和可选批量数据文件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b10cd45-8d02-4291-8d0f-666963010327/mutable-packaging.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b10cd45-8d02-4291-8d0f-666963010327/mutable-packaging.png)

Mutable打包选项。

### 嵌入式批量数据

批量数据的一些blob非常小，流送效率可能不高。可以配置一个大小限制，决定哪些批量数据文件将被流送传输，哪些将被嵌入到对象中。嵌入的资源会占用额外内存，但可以提升性能。

编译选项中的"嵌入数据限制（Embedded Data Limit）"设置可以设置嵌入数据的阈值。通常，将字节值设为 `256` 比较合理。

## 可自定义对象实例资产

实例也会被打包到构建中，但大小可以忽略不计，因为实例只包含参数值。这些值以可移植方式存储，以支持在可自定义对象的源图中添加、删除和更改参数。在运行时，参数和值会进行验证和更新。

如需详细了解，请参阅[存储和复制](/documentation/zh-cn/unreal-engine/mutable-storage-and-replication-in-unreal-engine)小节。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [mutable](https://dev.epicgames.com/community/search?query=mutable)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [打包选项](/documentation/zh-cn/unreal-engine/packaging-mutable-projects-in-unreal-engine#%E6%89%93%E5%8C%85%E9%80%89%E9%A1%B9)
-   [批量数据文件](/documentation/zh-cn/unreal-engine/packaging-mutable-projects-in-unreal-engine#%E6%89%B9%E9%87%8F%E6%95%B0%E6%8D%AE%E6%96%87%E4%BB%B6)
-   [批量数据格式](/documentation/zh-cn/unreal-engine/packaging-mutable-projects-in-unreal-engine#%E6%89%B9%E9%87%8F%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F)
-   [Mutable格式](/documentation/zh-cn/unreal-engine/packaging-mutable-projects-in-unreal-engine#mutable%E6%A0%BC%E5%BC%8F)
-   [嵌入式批量数据](/documentation/zh-cn/unreal-engine/packaging-mutable-projects-in-unreal-engine#%E5%B5%8C%E5%85%A5%E5%BC%8F%E6%89%B9%E9%87%8F%E6%95%B0%E6%8D%AE)
-   [可自定义对象实例资产](/documentation/zh-cn/unreal-engine/packaging-mutable-projects-in-unreal-engine#%E5%8F%AF%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AF%B9%E8%B1%A1%E5%AE%9E%E4%BE%8B%E8%B5%84%E4%BA%A7)