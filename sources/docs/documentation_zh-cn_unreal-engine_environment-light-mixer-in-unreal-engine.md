# 虚幻引擎中的环境光源混合器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/environment-light-mixer-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:14:00.189Z

---

目录

![环境光源混合器](https://dev.epicgames.com/community/api/documentation/image/8654bbca-2792-473b-9ee8-ad3e1f2720be?resizing_type=fill&width=1920&height=335)

**环境光源混合器（Environment Light Mixer）** 是一个编辑器窗口，你可以在其中创建和编辑关卡的天空、云、大气光源和天空光照的环境光照组件。对于设计师和美术师而言，只需通过这一个窗口即可快速编辑这些组件，并选择你要访问的属性细节的数量。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afe9f8d4-4031-4f5a-b3b8-b32777c9fe22/01-env-light-mixer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afe9f8d4-4031-4f5a-b3b8-b32777c9fe22/01-env-light-mixer.png)

点击查看大图。

## 打开环境光源混合器

在 **主菜单** 中选择 **窗口（Window） > 环境光源混合器（Env.Light Mixer）**，打开环境光源混合器（Environment Light Mixer）。

![在主菜单中选择窗口，然后选择环境光源混合器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/415ab328-d10d-4d3c-82fa-e94b995360e1/02-open-env-light-mixer.png)

## 环境光源混合器界面

环境光源混合器的界面包含两个主要元素：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/273c70f9-a87f-44dc-ad35-5f3f485ee943/03-elm-interface.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/273c70f9-a87f-44dc-ad35-5f3f485ee943/03-elm-interface.png)

点击查看大图。

1.  [工具栏](/documentation/zh-cn/unreal-engine/environment-light-mixer-in-unreal-engine#toolbar)
2.  [组件面板](/documentation/zh-cn/unreal-engine/environment-light-mixer-in-unreal-engine#componentspanels)

### 工具栏

你可以在 **工具栏** 中添加和配置组件面板（Components Panels）中可见属性的详细级别。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bee92292-b769-4f48-8969-a07cdca32a22/04-elm-toolbar.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bee92292-b769-4f48-8969-a07cdca32a22/04-elm-toolbar.png)

点击查看大图。

#### 添加场景组件

当你打开环境光源混合器（Environment Light Mixer）窗口时，如果从空关卡开始，会看到如下组件：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be2967b5-fa18-470a-ad81-d0b27bc46ec0/05-elm-toolbar-adding-components.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be2967b5-fa18-470a-ad81-d0b27bc46ec0/05-elm-toolbar-adding-components.png)

点击查看大图。

1.  [天空光照](/documentation/zh-cn/unreal-engine/sky-lights-in-unreal-engine)
2.  [大气光源（用于太阳和月亮的两个定向光源或两个代表太阳的光源）](/documentation/zh-cn/unreal-engine/directional-lights-in-unreal-engine)
3.  [天空大气](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-in-unreal-engine)
4.  [体积云](/documentation/zh-cn/unreal-engine/volumetric-cloud-component-in-unreal-engine)

如果其中任一组件从放置Actor（Place Actors）面板添加，或者已经存在于场景中，则列表将自动反映当前未添加的内容。同样，当你从场景中删除组件时，创建按钮在工具栏中再次变为可用。

### 控制属性细节数量

当你的关卡中引用了一个可用组件时，无论该组件是你通过环境光源混合器添加的还是本就存在的，该组件的属性都会添加到组件面板中，你可以在其中调整和编辑每个组件的各种属性。

如果想要最大程度地控制组件编辑，你可以使用 **属性细节（Property Details）** 下拉列表更改显示的属性数量：

![使用属性细节下拉菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/155e7697-b8dd-493a-928a-b9affdb0aa58/06-elm-toolbar-properties-detail.png)

1.  **最低（Minimal）** 提供了组件的基本要素。
2.  **常规（Normal）** 提供组件的通用属性。
3.  **常规+高级（Normal+Advanced）** 提供组件的通用和高级属性。

下面是使用各个细节数量的定向光源的属性数量示例：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/722e4075-808e-49fc-8681-ada94ebd416c/07-elm-toolbar-minimal.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/722e4075-808e-49fc-8681-ada94ebd416c/07-elm-toolbar-minimal.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9ce8055-139e-4ff5-9d3f-d193f564493a/08-elm-toolbar-normal.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9ce8055-139e-4ff5-9d3f-d193f564493a/08-elm-toolbar-normal.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44f6d654-8b10-46a3-9c13-aa3ebdcd2d1a/09-elm-toolbar-advanced.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44f6d654-8b10-46a3-9c13-aa3ebdcd2d1a/09-elm-toolbar-advanced.png)

最低（Minimal）

常规（Normal）

常规+高级（Normal+Advanced）

点击查看大图。

### 组件面板

**组件面板（Components Panels）** 列出了工具栏中任何可添加到场景中的组件。其中包括天空大气、体积云组件，最多两个定向光源和一个天空光照组件。

默认情况下，每个组件的显示属性仅限于其 **最低（Minimal）** 设置，但可以使用工具栏中的[属性细节](/documentation/zh-cn/unreal-engine/environment-light-mixer-in-unreal-engine#controllingtheamountofpropertiesdetail)下拉菜单进行扩展，以便显示更多属性。

![组件面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f13d285-232c-4ffa-9238-0f8e92945429/10-elm-components-panel.png)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [environment lighting](https://dev.epicgames.com/community/search?query=environment%20lighting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [打开环境光源混合器](/documentation/zh-cn/unreal-engine/environment-light-mixer-in-unreal-engine#%E6%89%93%E5%BC%80%E7%8E%AF%E5%A2%83%E5%85%89%E6%BA%90%E6%B7%B7%E5%90%88%E5%99%A8)
-   [环境光源混合器界面](/documentation/zh-cn/unreal-engine/environment-light-mixer-in-unreal-engine#%E7%8E%AF%E5%A2%83%E5%85%89%E6%BA%90%E6%B7%B7%E5%90%88%E5%99%A8%E7%95%8C%E9%9D%A2)
-   [工具栏](/documentation/zh-cn/unreal-engine/environment-light-mixer-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F)
-   [添加场景组件](/documentation/zh-cn/unreal-engine/environment-light-mixer-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%9C%BA%E6%99%AF%E7%BB%84%E4%BB%B6)
-   [控制属性细节数量](/documentation/zh-cn/unreal-engine/environment-light-mixer-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%B1%9E%E6%80%A7%E7%BB%86%E8%8A%82%E6%95%B0%E9%87%8F)
-   [组件面板](/documentation/zh-cn/unreal-engine/environment-light-mixer-in-unreal-engine#%E7%BB%84%E4%BB%B6%E9%9D%A2%E6%9D%BF)