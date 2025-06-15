# 虚幻引擎nDisplay中的摄像机动态模糊 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/camera-motion-blur-with-ndisplay-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:24.576Z

---

目录

![nDisplay中的摄像机动态模糊](https://dev.epicgames.com/community/api/documentation/image/a0440a83-7d82-42dd-a10e-f8ff5ce39bdc?resizing_type=fill&width=1920&height=335)

之前，我们禁用了动态模糊，因为它有时会对静态场景的拍摄产生干扰。当摄像机移动时，物理摄像机的图像传感器会自然而然地模糊处理内视锥部分。如果在nDisplay中草率地启用动态模糊，那么它会在最终画面中被错误地放大——由于摄像机的位移，内视锥会被模糊处理，导致物理摄像机捕捉到内视锥画面存在模糊曝光。

然而，有时我们会希望在LED墙上渲染动态模糊效果，比如说：

-   当LED墙上存在动画内容时，例如虚拟场景中的动画车辆或人物。
-   当你需要拍摄一段 *合成镜头（process shot）*，也就是现场演员在一个已经拍摄好的虚拟场景前表演，并且虚拟场景带有动态模糊。常见的合成镜头包括演员坐在车里，而背景则是移动的虚拟场景。这类情况中，LED墙必须渲染动态模糊效果，因为物理摄像机和道具车辆本身没有大范围的位移。

nDisplay现有的解决方案能通过减去由于跟踪摄像机位移产生的模糊，来渲染带有动态模糊的内视锥。例如，如果合成镜头中的摄像机发生了平移，那么即使背景出现快速运动，也不应该在内视锥中产生额外的动态模糊。

![显示动态模糊效果的虚拟制片舞台](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be91857c-15ff-479a-9c23-e61545511aea/camera-blur-background.png) ![显示摄像机模糊效果的特写](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eae66f81-e552-4f06-b6c7-534981538ef6/camera-blur-closeup.png)

虚幻引擎4.27 ICVFX测试案例中的一个汽车合成镜头。

## 合成镜头:移动舞台还是移动世界场景

有两种方法来为合成镜头准备一个场景：

-   **移动舞台**：nDisplay Root Actor在场景中移动。
-   **移动世界场景**：整个场景围绕nDisplay Root Actor移动。

每种方法都有特定用途。最终方案取决于你的项目需求。

nDisplay的动态模糊计算专被设计成处理这两种情况。（我们）还需要对真实世界场景进行进一步测试来验证"移动舞台"方案的动态模糊的准确性。我们相信"移动世界场景"方法在所有情况下都能可靠工作。

### 移动舞台

采用这种方法后，nDisplay Root Actor应当采用一条路径来生成动画，该路径表示车辆的总体位移。这比其他方法更容易设置，因为场景不做任何修改就可以使之移动。

这种方法也有一些缺点：

-   每次拍摄都必须与动画的播放时间仔细编排。
-   除非运动路径是一个闭环动画，否则动画播放时，最后一帧和第一帧会有一个明显的重置动作。
-   拍摄的时间越长，你需要创建的场景内容就越多。
-   由于单精度浮点格式的限制，如果摄像机距离原点太远，虚幻引擎的渲染就会变得不稳定。

### 移动世界场景

采用这种方法后，你需要在虚幻的世界坐标系中保持虚拟舞台的位置固定不变，然后移动它周围的场景。当你只希望车辆外有一个通用的视觉运动效果时，这种方法可能更为灵活。

这种情况下，有很多技巧可用，特别是当车辆的运动路径很简单时。例如，你可以在虚拟舞台中像传送带一样移动场景中的不同分区，来重复使用它们，从而实现无限播放和不间断的摄像机拍摄。

如果车辆路径的方向性更强，且场景被设计成可移动的，那么车辆动画可以单独创建，然后倒置到作为场景父对象的根节点变换上。

这种方法的缺点是，它需要自定义场景设置和完全可移动的动态内容和光源。

## 局限性

在捕捉LED墙面的动态模糊内容时，物理摄像机存在一些固有的局限性。

例如，如果在某辆正在移动的真实车辆上，有一台摄像机正在平移并跟踪世界场景中的某个固定点，比如一块从车辆上移过的交通标志，在现实中，捕获的图像不会有模糊效果。但在LED舞台上这是不可能做到的，因为平移摄像机的曝光无论如何都会导致墙壁模糊。

-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [合成镜头:移动舞台还是移动世界场景](/documentation/zh-cn/unreal-engine/camera-motion-blur-with-ndisplay-in-unreal-engine#%E5%90%88%E6%88%90%E9%95%9C%E5%A4%B4:%E7%A7%BB%E5%8A%A8%E8%88%9E%E5%8F%B0%E8%BF%98%E6%98%AF%E7%A7%BB%E5%8A%A8%E4%B8%96%E7%95%8C%E5%9C%BA%E6%99%AF)
-   [移动舞台](/documentation/zh-cn/unreal-engine/camera-motion-blur-with-ndisplay-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E8%88%9E%E5%8F%B0)
-   [移动世界场景](/documentation/zh-cn/unreal-engine/camera-motion-blur-with-ndisplay-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E4%B8%96%E7%95%8C%E5%9C%BA%E6%99%AF)
-   [局限性](/documentation/zh-cn/unreal-engine/camera-motion-blur-with-ndisplay-in-unreal-engine#%E5%B1%80%E9%99%90%E6%80%A7)