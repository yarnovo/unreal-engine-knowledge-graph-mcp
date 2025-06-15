# Using Alembic for Grooms in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-alembic-for-grooms-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:00:21.728Z

---

目录

毛发渲染与模拟功能旨在提供毛发导入、渲染和模拟（基于发束）的最小可行实现。本更新不提供毛发梳理解决方案。毛发的造型或梳理需要在Maya等第三方DCC工具中用XGen工具或插件[剃毛和理发（Shave and a Haircut）](https://www.unrealengine.com/en-US/programs/shave-and-a-haircut?sessionInvalidated=true)来执行。也可使用其他工具，如[Ornatrix](https://ephere.com/plugins/autodesk/max/ornatrix/)、[Yeti](https://peregrinelabs.com/yeti/)或[Houdini](https://www.sidefx.com/docs/houdini/fur/workflow.html)。

本文档介绍了Alembic文件的一种非正式模式，以标准化毛发梳理的导入操作，并将毛发信息导入虚幻引擎，以供[毛发渲染与模拟](/documentation/zh-cn/unreal-engine/hair-rendering-and-simulation-in-unreal-engine)功能使用。在生成毛发梳理（Hair Grooms）时，只要遵循此模式，Unreal Engine即可直接导入这些梳理（grooms）文件。导入后，UE4支持的渲染和物理相关属性将映射到Alembic文件中的对应属性。

## 目标

1.  定义梳理专有的非正式Alembic元数据模式，以便将毛发导入虚幻引擎。
2.  检查Unreal Engine支持的毛发相关属性，并将这些属性映射到Alembic。

### 曲线

从标准Alembic曲线模式中读取毛发的常规形状：

```cpp
Alembic::AbcGeom::ICurves
```

### 宽度

根据此规范导出的Groom属性让导入程序在构建Groom时能够检索和使用这些属性。但是，宽度属性没有特殊行为。例如，在Maya等DCC应用程序中，宽度数值直接导出到曲线行，因此不需要导出自定义的 `groom_width` 属性；导入程序将会把Maya的宽度数值转换成 `groom_width` 属性。值得注意的是，如果你的Groom中存在 `groom_width` 属性，那么在导入期间不会被覆盖。如果未指定 `groom_width` 属性，或者无法从宽度数值转换为该属性，虚幻引擎中的构建器将会后退，使用1厘米来作为宽度值。

使用以下命令可为每个ICurve存储曲线宽度：

```cpp
(GeometryScope::kConstantScope)
```

使用以下命令可为每个曲线存储曲线宽度：

```cpp
(GeometryScope::kUniformScope)
```

使用以下命令可为每个cv存储曲线宽度：

```cpp
(GeometryScope::kVertexScope)
```

注意，导入器支持 `kUniformScope`，但未经过测试。

## 命名规则

属性名必须小写，不含空格或特殊字符。

所有属性必须使用以下前缀：

```cpp
groom_<attr>
```

举例而言，`groom_id`、`groom_color`或`groom_width`都符合命名规则。

## 范围和优先权

本文档中的属性都有指定范围。该范围控制可在哪个梳理的 *级别* 上对属性进行定义。

可用范围包括：

范围

说明

**Constant**

针对带 `AbcGeom::ICurves` 对象的所有曲线，这些参数都拥有单一值。

**Uniform**

针对 `AbcGeom::ICurves` 对象中的每个曲线，这些参数都拥有一个值。

**Vertex**

针对每个cv每条曲线，这些参数都拥有一个值。

### 常规属性

本节介绍整体应用于梳理的属性。这些属性应添加到最顶部的节点：IXForm或ICurves。

名称

类型

可选

说明

值

groom\_version\_major

int16

否

用于识别此文件符合梳理方案的哪个 **主要** 版本。

1

groom\_version\_minor

int16

否

用于识别此文件符合方案的哪个 **次要** 版本。

4

groom\_tool

字符串

是

生成此文件的工具的名称和版本。用于调试和跟踪问题。

 

groom\_properties

字符串

是

该字符串描述用于生成此梳理的参数。这些是工具专属的选项，用于调试。

 

### 几何体参数

所有几何体参数都是可选的，但如果导出的Groom中没有这些参数，则会求助于内部行为。

名称

类型

范围

可选

说明

范围

`groom_ guide`

int8/16/32

常量/统一

是

根据导入的发束和抽取设置生成导线。

0 = 无导线 / 1 = 导线

`groom_group_id`

int32

常量/统一

是

所有发束将组合到一起。

\[0, INT\_MAX\]

`groom_root_uv`

float32/64\[2\]

统一

是

通过将发束的根投射到球体上来计算根UV。

此属性是可选的。如果未指定，将使用球体映射在引擎中自动生成根UV。

\[-FLOAT\_MAX, FLOAT\_MAX\]

`groom_id`

int32

统一

是

发束不会具有ID。此属性应在调试中使用，与 `groom_closest_guides` 属性搭配。

\[0, INT\_MAX\]

`groom_color`

float32/64\[3\]

顶点

是

后退到黑色。

\[0, FLOAT\_MAX\]

`groom_closest_guides`

int32\[3\]

统一

是

计划专门用于在虚幻引擎外计算的插值数据。

\[0, INT\_MAX\]

`groom_guide_weights`

float32\[3\]

统一

是

计划专门用于在虚幻引擎外计算的插值数据。

\[0, FLOAT\_MAX\]

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [hair](https://dev.epicgames.com/community/search?query=hair)
-   [metahumans](https://dev.epicgames.com/community/search?query=metahumans)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标](/documentation/zh-cn/unreal-engine/using-alembic-for-grooms-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [曲线](/documentation/zh-cn/unreal-engine/using-alembic-for-grooms-in-unreal-engine#%E6%9B%B2%E7%BA%BF)
-   [宽度](/documentation/zh-cn/unreal-engine/using-alembic-for-grooms-in-unreal-engine#%E5%AE%BD%E5%BA%A6)
-   [命名规则](/documentation/zh-cn/unreal-engine/using-alembic-for-grooms-in-unreal-engine#%E5%91%BD%E5%90%8D%E8%A7%84%E5%88%99)
-   [范围和优先权](/documentation/zh-cn/unreal-engine/using-alembic-for-grooms-in-unreal-engine#%E8%8C%83%E5%9B%B4%E5%92%8C%E4%BC%98%E5%85%88%E6%9D%83)
-   [常规属性](/documentation/zh-cn/unreal-engine/using-alembic-for-grooms-in-unreal-engine#%E5%B8%B8%E8%A7%84%E5%B1%9E%E6%80%A7)
-   [几何体参数](/documentation/zh-cn/unreal-engine/using-alembic-for-grooms-in-unreal-engine#%E5%87%A0%E4%BD%95%E4%BD%93%E5%8F%82%E6%95%B0)