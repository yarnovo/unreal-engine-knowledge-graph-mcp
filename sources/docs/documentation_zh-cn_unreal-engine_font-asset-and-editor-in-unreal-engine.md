# 虚幻引擎中的字体资源和编辑器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/font-asset-and-editor-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:18:57.276Z

---

目录

![字体资源和编辑器](https://dev.epicgames.com/community/api/documentation/image/4ed2fd5f-6c6c-4ba8-ab1f-d0a145413ebd?resizing_type=fill&width=1920&height=335)

本文介绍了可用于 **字体编辑器** 的 **字体** 和 **字体风格** 资源。

## 字体资源

虚幻引擎中的字体被分类为 **字体** 资源，使用两种缓存方法：**Runtime** 的形式是合成字体；**Offline** 是更古老的预计算字体图谱法。在字体编辑器中打开字体资源后即可在两种方法之间切换（无需替换即可简单将现有字体资源从 Offline 转换到新合成方法）。

## 字体风格（Font Face）资源

导入字体时便会创建 **字体风格** 资源，它将保存可被字体资源引用的字体数据。这意味着相同的字体数据可在 多个字体资源之间交替使用，甚至与资源中的多个字型共用，最终减少内存消耗。

![The Font Face window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5eedae64-1c0c-4af5-ab22-5e4377be5e4b/ue5_1-01-font-face.png "The Font Face window")

打开字体风格资源时，可访问 **Hinting** 和 **Loading Policy** 的设置。

属性

描述

**Hinting**

字体风格所使用的微调算法：

-   **Default**：使用字体中指定的默认微调。
-   **Auto**：强制使用自动微调算法。
-   **Auto Light**：强制使用自动微调算法，已针对非单色显示进行优化。
-   **Monochrome**：强制使用自动微调算法，已针对单色显示进行优化。
-   **None**：不使用微调。

**Loading Policy**

控制此字体风格运行时加载方式的枚举。查看枚举获得选项的更多解释：

-   **Lazy Load**：延迟加载整个字体到内存中。这比流送消耗的内存更多，然而在字体中渲染字形时文件 IO 为零（但初始加载可能导致卡顿）。
-   **Stream**：从磁盘流送字体。这比 Lazy Load 或 Inline 消耗的内存更低，但渲染字形时存在文件 IO，可能导致特定情况下或特定平台上出现卡顿。
-   **Inline**：在资产中嵌入字体数据。这比流送占用更多内存，但能避免卡顿（只对Font Face资产中的字体数据有效）。

**Source File Name**

所创建字体风格的文件名。这不会固定保存在磁盘中，因为我们之前可能已在此资源中加载和缓存字体数据。

**Layout Method**

此项将选择字体布局时所使用的方法。如字体出现裁剪或高度问题，可尝试对此项进行修改：

-   **Metrics**：使用字体中可用的参数数据设计字体。这通常是最佳选项，然而部分字体的参数破损或有误，使用边界框值设计字体可能获得更佳效果。
-   **Bounding Box**：使用来自边界框的数值设计字体。这通常会为含有效参数的度量/指标生成较大的行高，然而也可为拥有破损或错误参数的字体生成更佳效果。

**Sub Faces**

瞬时缓存，用于该面内的子面。

## 字体编辑器

在 **Content Browser** 中双击字体资源后，它将在 **字体编辑器** 窗口中打开。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fe3bd2a-e1ad-4bda-9976-bec079a245d1/ue5_1-02-font-editor-window.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fe3bd2a-e1ad-4bda-9976-bec079a245d1/ue5_1-02-font-editor-window.png)

点击查看大图。

字体编辑器窗口详解如下：

#### 工具栏菜单

![Toolbar menu of the Font Editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afec7e90-49d0-4a21-9155-08a11c9f5197/ue5_1-03-toolbar.png "Toolbar menu of the Font Editor")

可在此菜单中保存修改、在 **Content Browser** 中查找资源，在预览窗口中变更预览窗口背景颜色或 前景颜色（文本颜色）。有更新或导出正在进行修改的选项，然而这些选项 只在 **离线** 缓存模式中可用。

#### 默认字体群

![Default Font Family](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9c375b5-a293-4a6d-9bac-14c873caa82a/ue5_1-04-default-font-family.png "Default Font Family")

用户可在此窗口中指定此字体资源使用的默认字体群。用户可添加特定字体风格的多个版本（如常规、 粗体、斜体、下划线等），或将不同字体风格的合集设为一个合成字体。如已创建 一个空白字体，则也可从此窗口中指定字体。

#### 子字体群

![Add Sub-Font Family](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be70834e-23f7-455d-812b-d38a71391b5f/ue5_1-05-sub-font-family.png "Add Sub-Font Family")

在此窗口中点击 **Add Sub-Font Family** 按钮即可指定此字体资源所使用的子字体群。

![Setting of the Sub-Font Family](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a38bbf88-9110-4ac5-9084-4e2c1d706c19/ue5_1-06-set-sub-font-family.png "Setting of the Sub-Font Family")

可在此处指定字符范围。进入此字符范围后将指定不同于默认字体的另一种字体。 这在需要为不同语言使用不同字体类型时十分实用。

#### 预览

![Preview window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c40eacf6-5d00-4b32-bee9-e11849fc8448/ue5_1-07-preview-window.png "Preview window")

此窗口可预览字体，并提供一个文本输入框以便输入范例文本。

#### Draw Font Metrics

![Enable Draw Font Metrics](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3dba692-456b-49d2-9657-f182afe96104/ue5_1-08-draw-font-metric.png "Enable Draw Font Metrics")

**Draw Font Metrics** 将覆盖行高、字形边界框，和作为预览一部分的的基线。

-   **Base Line** - 这是文本所处的线。
-   **Line Bounds** - 这是为给定文本字符串长度所创建的边界框。
-   **Grapheme Cluster Bounds** - 此边界框沿给定语言中的逻辑字符而绘制，可能由数个字形组成（例如一个基础字符和重音符号）。
-   **Glyph Bounds** - 这是沿给定字形绘制的边界框。

#### 详情

![Details Panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb72f92e-729a-45e2-9ecc-39a6a3cd594e/ue5_1-09-details-panel.png "Details Panel")

可在此创库中修改 Font Cache Type，以及 Font Size 和 Font Name（针对运行时）。

-   如使用旧方法，在 Offline 缓存模式中仍然可以修改字体的参数。
-   也可将现有字体资源从 **Offline** 转换为 **Runtime**，无需进行替换。

## 范例字体资源

范例字体资源显示如下。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00e0b3be-cc5a-4aab-be2e-2eb9f3701c75/ue5_1-10-example-font-asset.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00e0b3be-cc5a-4aab-be2e-2eb9f3701c75/ue5_1-10-example-font-asset.png)

点击查看大图。

合成字体固定包含一个默认字体群，也可能包含任意数量用于给定字符范围的子字体群。每个字体群其自身由任意数量的字体风格组成（这些字体风格可基于其风格进行命名）。运行时每个字符将使用字体群中该字符范围最适合的字体（基于可用字体）。

如上图范例所示，日语文本属于日语字体群的字符范围中，因此使用源 Han Sans 进行绘制，而不以默认字体群（Roboto）进行绘制。子字体群中的字体优先按命名匹配选择。而常规体、粗体和细体也会基于默认字体的属性进行匹配，粗斜体同样如此（其自动选择日语粗体，因为字体包含加粗属性）。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)
-   [fonts](https://dev.epicgames.com/community/search?query=fonts)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [字体资源](/documentation/zh-cn/unreal-engine/font-asset-and-editor-in-unreal-engine#%E5%AD%97%E4%BD%93%E8%B5%84%E6%BA%90)
-   [字体风格（Font Face）资源](/documentation/zh-cn/unreal-engine/font-asset-and-editor-in-unreal-engine#%E5%AD%97%E4%BD%93%E9%A3%8E%E6%A0%BC%EF%BC%88fontface%EF%BC%89%E8%B5%84%E6%BA%90)
-   [字体编辑器](/documentation/zh-cn/unreal-engine/font-asset-and-editor-in-unreal-engine#%E5%AD%97%E4%BD%93%E7%BC%96%E8%BE%91%E5%99%A8)
-   [工具栏菜单](/documentation/zh-cn/unreal-engine/font-asset-and-editor-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F%E8%8F%9C%E5%8D%95)
-   [默认字体群](/documentation/zh-cn/unreal-engine/font-asset-and-editor-in-unreal-engine#%E9%BB%98%E8%AE%A4%E5%AD%97%E4%BD%93%E7%BE%A4)
-   [子字体群](/documentation/zh-cn/unreal-engine/font-asset-and-editor-in-unreal-engine#%E5%AD%90%E5%AD%97%E4%BD%93%E7%BE%A4)
-   [预览](/documentation/zh-cn/unreal-engine/font-asset-and-editor-in-unreal-engine#%E9%A2%84%E8%A7%88)
-   [Draw Font Metrics](/documentation/zh-cn/unreal-engine/font-asset-and-editor-in-unreal-engine#drawfontmetrics)
-   [详情](/documentation/zh-cn/unreal-engine/font-asset-and-editor-in-unreal-engine#%E8%AF%A6%E6%83%85)
-   [范例字体资源](/documentation/zh-cn/unreal-engine/font-asset-and-editor-in-unreal-engine#%E8%8C%83%E4%BE%8B%E5%AD%97%E4%BD%93%E8%B5%84%E6%BA%90)

相关文档

[

控件类型参考说明

![控件类型参考说明](https://dev.epicgames.com/community/api/documentation/image/d25cc82c-39d2-4c65-b9c3-96fd77e35065?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/widget-type-reference-for-umg-ui-designer-in-unreal-engine)