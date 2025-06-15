# 虚幻引擎 视口功能按钮 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/viewport-controls-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:49:44.144Z

---

目录

![视口功能按钮](https://dev.epicgames.com/community/api/documentation/image/af00213c-2a23-4509-8e49-67ff9dacc7ce?resizing_type=fill&width=1920&height=335)

你在视口中工作时，能使用多种功能按钮导航场景、选择和操作Actor，以及更改显示选项。

在本文中，我们将使用以下缩写：

功能按钮

缩写

鼠标左键

**LMB**

鼠标右键

**RMB**

鼠标中键

**MMB**

## 导航功能按钮

有多种方式可以导航虚幻编辑器视口。一些方式完全可以使用鼠标、键盘或者两者的各种组合来完成。

下面的一些功能按钮可以在"按键绑定编辑器"中配置。这里列出了它们的默认状态。如果你对它们进行了更改，它们可能不匹配。

### 标准

这些功能按钮表示在没有按下其他按键或按钮的情况下，在视口中点击并拖动时的默认行为。它们也是唯一可以用来导航正交视口的功能按钮。

功能按钮

操作

透视

 

**LMB + 拖动**

前后移动摄像机，并左右旋转。

**RMB + 拖动**

旋转视口摄像机。

**LMB + RMB + 拖动**

上下移动摄像机。

正交（顶端、前端、侧面）

 

**LMB + 拖动**

创建一个区域选择框。

**RMB + 拖动**

平移视口摄像机。

**LMB + RMB + 拖动**

放大和缩小视口摄像机。

聚焦

 

**F**

将摄像机聚焦在选定对象上。要充分利用翻转摄像机，这很重要。

### 鼠标和触控板

在Mac计算机上，在 **系统偏好设置（System Preference）** **\>** **鼠标（Mouse）** 中为鼠标启用辅助点击后，或在 **系统偏好设置（System Preference）** **\>** **触控板（Trackpad）** 中为触控板启用两根手指辅助点击后，可以使用以下功能按钮。

鼠标

触控板

操作

透视

 

 

**LMB + Drag**

**单指点击 + 拖动**

前后移动摄像机，并左右旋转。

**RMB + 拖动**

**双指点击 + 拖动**

旋转视口摄像机。

**单指点触 + 拖动**

**双指点触 + 拖动**

旋转视口摄像机。

正交（顶端、前端、侧面）

 

 

**LMB + 拖动**

**单指点击 + 拖动**

创建一个区域选择框。

**RMB + 拖动**

**双指点击 + 拖动**

平移视口摄像机。

**单指点触 + 拖动**

**双指点触 + 拖动**

平移视口摄像机。

聚焦

 

 

**F**

**F**

将摄像机聚焦在选定对象上。要充分利用翻转摄像机，这很重要。

### 游戏风格

对于那些习惯在PC上玩射击游戏的人来说，WASD功能按钮会让他们感觉很自然。这些功能按钮默认为启用状态，当你按住 **RMB** 时可以使用它们。这意味着你仍会使用 **RMB** 来转动摄像机，同时以这种方式导航。

这些功能按钮镜像在箭头按键和数字键盘上，以提供对它们的备用访问。

所有这些功能仅在透视视口中有效，默认情况下，你必须按住 **RMB** 才能使用WASD游戏风格的功能按钮。

功能按钮

操作

**W** / **数字键盘8** / **向上**

将摄像机向前移动。

**S** / **Numpad2** / **向下**

将摄像机向后移动。

**A** / **数字键盘4** / **向左**

将摄像机向左移动。

**D** / **数字键盘6** / **向右**

将摄像机向右移动。

**E** / **数字键盘9** / **向上翻页**

将摄像机向上移动。

**Q** / **数字键盘7** / **向下翻页**

将摄像机向下移动。

**Z** / **数字键盘1**

将摄像机缩小（增大FOV）。

**C** / **数字键盘3**

将摄像机放大（降低FOV）。

缩放摄像机时，按住 **RMB** 将保持FOV，防止它快速返回到默认设置。FOV将保持不变，直至释放 **RMB**。

使用 **WASD** 导航时，按住 **RMB**，可以将鼠标滚轮向上旋转以加快移动速度，也可以将鼠标滚轮向下旋转以减慢移动速度。

在使用鼠标或触控板时，你将无法通过使用 **RMB** + **鼠标滚轮** 来改变摄像机的速度，你需要使用视口摄像机速度选项来调整它。

### 平移、环绕和缩放

虚幻编辑器支持Maya风格的视口平移、环绕和缩放操作，有助于Maya美术师更容易使用工具。如果你对此不熟悉，可以参考下面这些按键说明：

命令

说明

**Alt + LMB + 拖动**

将视口围绕一个枢轴或目标点翻转。

**Alt + RMB + 拖动**

用移动车将摄像机朝向或远离一个枢轴或目标点移动（缩放）。

**Alt + MMB + 拖动**

沿着鼠标移动的方向向左、向右、向上、向下追踪摄像机。

F键的使用不限于Maya风格的功能按钮。你始终可以按F键来聚焦选定的对象或对象组。

### 摄像机按比例缩放和平移

当你在关卡视口中选择了一个或多个对象时，缩放和平移摄像机操作的灵敏性会随着选定对象与摄像机之间的距离自动调整。这让你的摄像机运动感觉更自然，尤其是当你在处理极限尺寸的对象时，例如微小的机械部件或广阔的地形。

要启用按比例缩放和平移，请打开 **编辑器偏好设置（Editor Preferences）** 窗口。导航到 **关卡编辑器（Level Editor）> 视口（Viewports）** 部分。在右侧第一个名为 **功能按钮（Controls）** 的部分中，点击底部箭头展开该部分，显示更多设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/256f9672-fcc0-4d70-a451-e0fcbb44001f/01-editor-pref-viewport-controls-01.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/256f9672-fcc0-4d70-a451-e0fcbb44001f/01-editor-pref-viewport-controls-01.png)

点击查看大图。

找到 **使用距离缩放摄像机速度（Use distance-scaled camera speed）** 设置。点击该框以启用。你可以通过点击该框来清除该设置，从而禁用该设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4c7d164-9d55-48fc-8461-f053ef9b7dcd/02-editor-pref-viewport-controls-02.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4c7d164-9d55-48fc-8461-f053ef9b7dcd/02-editor-pref-viewport-controls-02.png)

点击查看大图。

### 围绕选择环绕

当你在关卡视口中选择了一个或多个对象时，你可以让摄像机围绕选定对象的枢轴环绕，而不是围绕屏幕的中心环绕。

要启用按比例缩放和平移，请打开 **编辑器偏好设置（Editor Preferences）** 窗口。导航到 **关卡编辑器（Level Editor）> 视口（Viewports）** 部分。在右侧第一个名为 **功能按钮（Controls）** 的部分中，点击底部箭头展开该部分，显示更多设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afb5798e-5865-4b46-92ec-7c7cc2d6ce4b/03-editor-pref-viewport-controls-01.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afb5798e-5865-4b46-92ec-7c7cc2d6ce4b/03-editor-pref-viewport-controls-01.png)

点击查看大图。

找到 **围绕选择环绕摄像机（Orbit camera around selection）** 设置。点击该框以启用。你可以通过点击该框来清除该设置，从而禁用该设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/461a5d09-41db-4fc0-bc86-20956113d868/04-editor-pref-viewport-controls-03.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/461a5d09-41db-4fc0-bc86-20956113d868/04-editor-pref-viewport-controls-03.png)

点击查看大图。

## 选择功能按钮

你可以在视口中直接点击各个Actor来单独选择它们，也可以在2D视口中使用框选择来按组选择Actor：

![Selected Actors](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b6f5c2d-f814-448b-a123-925f6225d1af/05-le-selected-actors.png "Selected Actors")

![Select Marquee](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c69b5c4-bdb0-4708-a911-971f934a6da9/06-select-marquee.png "Select Marquee")

简单选择

框选择

功能按钮

操作

 

简单选择

 

 

**LMB**

选择光标下的Actor，替换当前选择。

 

**Ctrl + LMB**

将光标下的Actor添加到当前选择中。

 

框选（仅2D视口）

 

 

**LMB + 拖动**

用框中包含的Actor替换当前选择。

 

**Shift + LMB + 拖动**

将框中包含的Actor添加到当前选择中。

 

**Ctrl + RMB + 拖动**

将框中所有的已选择Actor从当前选择中删除。

 

## 变换功能按钮

这些功能按钮与使用变换工具在视口中移动、旋转和缩放Actor有关：

![Trans Widget](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6aa3fda6-c84e-4f3c-8884-e2e284cf021a/07-le-trans-widget.png "Trans Widget")

![Transform Rotate](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b28aae09-61c6-4ca8-8675-da444d725399/08-transform-rotate.png "Transform Rotate")

![Trans Scale Widget](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25dcbb60-9ecf-4c98-9e21-89cb3c59666a/09-le-trans-scalewidget.png "Trans Scale Widget")

移动工具(W)

旋转工具(E)

缩放工具(R)

你可以在视口工具栏中看到哪个工具处于活动状态：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c779296c-9279-4960-809d-c93372bcec03/10-le-trans-widget-icons.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c779296c-9279-4960-809d-c93372bcec03/10-le-trans-widget-icons.png)

点击查看大图。

功能按钮

操作

 

**LMB + 拖动（在变换工具上）**

根据活动的变换小工具移动、旋转或缩放当前选定的角色。

 

**W**

选择移动工具。

 

**E**

选择旋转工具。

 

**R**

选择缩放工具。

 

**V**

切换顶点对齐，它允许你对齐到场景中其他几何体的顶点。

 

**MMB + 拖动（仅枢轴）**

临时移动选择的枢轴以偏移变换。

 

移动工具功能按钮

 

 

**Alt + LMB + 拖动 （仅对箭头有效）**

为当前选中的单个或多个Actor创建副本并移动，原有Actor保持不变。

 

移动工具功能按钮（仅透视视口）

 

 

**Ctrl + LMB + 拖动**

沿X轴移动当前选定的Actor。

 

**Ctrl + RMB + 拖动**

沿Y轴移动当前选定的Actor。

 

**Ctrl + LMB + RMB + 拖动**

沿Z轴移动当前选定的Actor。

 

移动工具功能按钮（仅正交视口）

 

 

**Ctrl + LMB + 拖动**

沿由两个可见轴定义的平面移动当前选定的Actor。

 

旋转工具功能按钮（仅透视视口）

 

 

**Ctrl + LMB + 拖动**

沿X轴旋转当前选定的Actor。

 

**Ctrl + RMB + 拖动**

沿Y轴旋转当前选定的Actor。

 

**Ctrl + LMB + RMB + 拖动**

沿Z轴旋转当前选定的Actor。

 

缩放工具功能按钮

 

 

**Ctrl + LMB + 拖动**

沿所有轴均匀缩放当前选定的Actor。

 

移动/缩放工具功能按钮（仅正交视口）

 

 

**Ctrl + RMB + 拖动**

沿可见轴旋转当前选定的Actor。

 

## 显示功能按钮

这些功能按钮影响视口中显示关卡的方式。

功能按钮

操作

**G**

切换 **游戏模式（Game Mode）**，这将促使视口仅渲染游戏中可以看到的内容。

**Ctrl + R**

切换活动视口中的实时播放。

**F11**

切换浸入模式，将视口全屏显示。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [viewport controls](https://dev.epicgames.com/community/search?query=viewport%20controls)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [导航功能按钮](/documentation/zh-cn/unreal-engine/viewport-controls-in-unreal-engine#%E5%AF%BC%E8%88%AA%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [标准](/documentation/zh-cn/unreal-engine/viewport-controls-in-unreal-engine#%E6%A0%87%E5%87%86)
-   [鼠标和触控板](/documentation/zh-cn/unreal-engine/viewport-controls-in-unreal-engine#%E9%BC%A0%E6%A0%87%E5%92%8C%E8%A7%A6%E6%8E%A7%E6%9D%BF)
-   [游戏风格](/documentation/zh-cn/unreal-engine/viewport-controls-in-unreal-engine#%E6%B8%B8%E6%88%8F%E9%A3%8E%E6%A0%BC)
-   [平移、环绕和缩放](/documentation/zh-cn/unreal-engine/viewport-controls-in-unreal-engine#%E5%B9%B3%E7%A7%BB%E3%80%81%E7%8E%AF%E7%BB%95%E5%92%8C%E7%BC%A9%E6%94%BE)
-   [摄像机按比例缩放和平移](/documentation/zh-cn/unreal-engine/viewport-controls-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E6%8C%89%E6%AF%94%E4%BE%8B%E7%BC%A9%E6%94%BE%E5%92%8C%E5%B9%B3%E7%A7%BB)
-   [围绕选择环绕](/documentation/zh-cn/unreal-engine/viewport-controls-in-unreal-engine#%E5%9B%B4%E7%BB%95%E9%80%89%E6%8B%A9%E7%8E%AF%E7%BB%95)
-   [选择功能按钮](/documentation/zh-cn/unreal-engine/viewport-controls-in-unreal-engine#%E9%80%89%E6%8B%A9%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [变换功能按钮](/documentation/zh-cn/unreal-engine/viewport-controls-in-unreal-engine#%E5%8F%98%E6%8D%A2%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [显示功能按钮](/documentation/zh-cn/unreal-engine/viewport-controls-in-unreal-engine#%E6%98%BE%E7%A4%BA%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)