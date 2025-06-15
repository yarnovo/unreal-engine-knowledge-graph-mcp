# 在场景变体中使用Switch Actor | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-switch-actor-within-scene-variants
> 
> 生成时间: 2025-06-14T19:10:31.279Z

---

目录

![使用Switch Actor](https://dev.epicgames.com/community/api/documentation/image/b9bd9d2f-aecb-407e-83ef-f6a6d8bd9923?resizing_type=fill&width=1920&height=335)

切换Actor提供一种切换Actor可见性或关卡中Actor整个层级的便捷方法。

固定仅显示切换Actor的一个子项。选择需要显示的子Actor时，切换Actor会自动隐藏所有其他子Actor及其所有后代。然后将显示选定的一个子Actor及其所有后代。

拥有互斥的关卡Actor或Actor层级，且在给定时间仅显示其中一个Actor或层级时，此方法最便捷。例如，车辆配置器可能提供多种不同饰件，每种饰件由拥有不同几何体的不同静态网格体Actor集代表，如下所示：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a6bb266-87de-4e52-887d-6c6c633e2925/01-actor-hierarchies.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a6bb266-87de-4e52-887d-6c6c633e2925/01-actor-hierarchies.png)

Click image for full size.

要将车辆的可视模型在各饰件选项间切换，需显示和隐藏多个Actor。可使用蓝图、变量管理器、甚至在虚幻编辑器中手动完成此操作。但同时更改数十甚至数百不同Actor的可见性将十分较麻烦。若将切换Actor作为所有不同饰件选项的父项，通过在该父项上设置单个选项，可轻松在不同饰件间切换。

切换Actor包含在 **编辑器（Editor）> 变体管理器内容（Variant Manager Content）** 插件中。通常默认启用此插件。若 **模式（Modes）** 面板中未显示该切换Actor，则需要启用项目的此插件。

## 将切换Actor添加到关卡

**切换Actor（Switch Actor）** 位于 **放置Acotr（Place Actors）** 面板的 **所有类（All Classes）** 选项卡中 。将它从 **放置Acotr（Place Actors）** 面板拖入关卡视口中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c391b276-1e7a-4d9e-abdd-8e6e8e6d5231/02-add-the-switch-actor-to-your-level.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c391b276-1e7a-4d9e-abdd-8e6e8e6d5231/02-add-the-switch-actor-to-your-level.png)

Click image for full size.

## 选择要显示的子Actor

以下章节将介绍选择显示切换Actor子项的不同犯法。

### 虚幻编辑器中

在 **世界大纲视图（World Outliner）** 中选择切换Actor。在 **细节（Details）** 面板中，找到 **切换Actor > 选定选项（Selected Option）** 设置。此下拉列表将列出以切换Actor为父项的所有子Actor命名。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/461f569c-5868-429d-a5a9-83cb14c7e849/03-selected-option-setting.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/461f569c-5868-429d-a5a9-83cb14c7e849/03-selected-option-setting.png)

Click image for full size.

选择要显示的选项。

### 蓝图中

切换Actor提供可用于处理其选定子项的蓝图API。若从蓝图图表中切换Actor的引用直接拖动，此类节点将在 **切换Actor** 类别下列出：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03035a01-4944-4521-bce5-992ef9f6e496/04-switch-actor-blueprint-api.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03035a01-4944-4521-bce5-992ef9f6e496/04-switch-actor-blueprint-api.png)

Click image for full size.

节点

命名

说明

![获取选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37a8b031-901e-4855-99c1-3a1d3f846cbc/05-get-options.png "Get Options")

**获取选项（Get Options）**

返回当前以该切换Actor为父项的所有子Actor的引用阵列。

![获取选定选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7648371-a8d5-4ef3-a306-6a2bcce09caf/06-get-selected-option.png "Get Selected Option")

**获取选定选项（Selected Option）**

返回当前显示的子Actor的索引。

![选择选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/997c8404-6994-453a-b9a3-c54229529cef/07-select-option.png "Select Option")

**选择选项（Select Option）**

变更切换Actor以使用指定索引选择子项。

**Get Options** 返回阵列的顺序与 **世界大纲视图（World Outliner）** 或该切换Actor **细节（Details）** 面板中显示的子Actor顺序不固定相同。此外，**获取选定选项（Selected Option）** 返回的索引数和调用 **选择选项（Select Option）** 时指定的索引数均可识别此数组中的元素。

### 变体管理器中

将切换Actor绑定至变体管理器中的变体时，会采集其 **选定选项（Selected Option）** 属性。**值** 列将显示下拉列表，列出以该切换Actor为父项的所有子Actor的命名。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86da86cc-8288-4585-a490-35cdd85c46ce/08-capturing-the-selected-option-in-the-variant-manager.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86da86cc-8288-4585-a490-35cdd85c46ce/08-capturing-the-selected-option-in-the-variant-manager.png)

点击查看大图。

选择开启此变体时要显示的选项。

-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [manufacturing](https://dev.epicgames.com/community/search?query=manufacturing)
-   [variants](https://dev.epicgames.com/community/search?query=variants)
-   [variant manager](https://dev.epicgames.com/community/search?query=variant%20manager)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [将切换Actor添加到关卡](/documentation/zh-cn/unreal-engine/using-the-switch-actor-within-scene-variants#%E5%B0%86%E5%88%87%E6%8D%A2actor%E6%B7%BB%E5%8A%A0%E5%88%B0%E5%85%B3%E5%8D%A1)
-   [选择要显示的子Actor](/documentation/zh-cn/unreal-engine/using-the-switch-actor-within-scene-variants#%E9%80%89%E6%8B%A9%E8%A6%81%E6%98%BE%E7%A4%BA%E7%9A%84%E5%AD%90actor)
-   [虚幻编辑器中](/documentation/zh-cn/unreal-engine/using-the-switch-actor-within-scene-variants#%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD)
-   [蓝图中](/documentation/zh-cn/unreal-engine/using-the-switch-actor-within-scene-variants#%E8%93%9D%E5%9B%BE%E4%B8%AD)
-   [变体管理器中](/documentation/zh-cn/unreal-engine/using-the-switch-actor-within-scene-variants#%E5%8F%98%E4%BD%93%E7%AE%A1%E7%90%86%E5%99%A8%E4%B8%AD)