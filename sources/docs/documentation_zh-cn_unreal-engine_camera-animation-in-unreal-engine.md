# 虚幻引擎中的摄像机动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/camera-animation-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:46:52.609Z

---

目录

![摄像机动画](https://dev.epicgames.com/community/api/documentation/image/ebc976f5-a6d4-4ee4-83f5-173f97af6508?resizing_type=fill&width=1920&height=335)

从概念上讲，**摄像机动画** 只是一个可以添加到游戏中摄像机的动画。您可以为摄像机的位置和旋转、视野及后期处理设置设置动画。 同时，摄像机动画的位置、旋转和视野变化将应用于游戏摄像机。这些关键帧将"相对于初始值"进行处理，这意味着 在动画中只应用时间为0.0的增量。

摄像机动画的后期处理设置以混合/分层的方式应用，就像可以影响场景后期处理的其他系统一样。您可以在临时摄像机的属性中选择要 覆盖的设置，并通过适当的Matinee轨道为这些设置设置动画。在预览窗口中看到的内容应该 与播放动画时看到的内容极为一致。临时摄像机还有一个PostProcessBlendWeight，您可以设置它或设置它的动画来控制您的设置对场景的影响程度。

## 创建和编辑摄像机动画

有几种方法来创建摄像机动画。最简单的方法是通过 **内容浏览器（Content Browser）** 像创建任何其他资源一样创建空白摄像机动画。您还可以通过在摄像机插值组上的 **右键** 菜单中选择"导出到摄像机动画"， 将另一个Matinee中的摄像机轨迹转换为摄像机动画。由于可以从Maya等工具将摄像机关键帧导入到Matinee， 因此这提供了一个从外部源导入摄像机动画的管道。

要编辑摄像机动画，只需像编辑其他资源一样在 **内容浏览器（Content Browser）** 中 **双击** 它。摄像机动画编辑器是一个稍微自定义版本的Matinee。当您编辑 摄像机动画时，将在场景中放置一个临时摄像机，您可以操纵它来创建关键帧并使用它来预览您的动画。

## 播放摄像机动画

**PlayerCameraManager** 包含一些函数，允许您从C++代码或蓝图脚本控制摄像机动画在游戏摄像机中的应用。当您播放摄像机动画时， 将创建一个CameraAnimInst，其中包含该动画的活跃实例播放信息。您可以使用该对象来手动停止该动画或修改其播放参数。

可以同时激活多个CameraAnimInst（目前最多8个），全部混合在一起形成最终的摄像机设置。

## 播放空间

摄像机动画可以在任何空间中播放。最常见的用法是在摄像机空间中播放。例如，如果您制作一个左右抖动的动画（Y轴）， 并在游戏中播放该动画，则无论摄像机指向哪个方向，仍然会左右抖动摄像机。

一个不太常见但仍有用的例子是在场景空间中播放摄像机动画。这对于模拟像船一样左右摇摆的效果很有用，当您向前看的时候， 您希望摄像机沿纵轴方向滚动，但是当您看船的另一侧时，您希望摄像机沿横轴方向滚动。

最后，您可以指定任意的空间。以船为例，如果您乘坐的船会四处移动并改变摇摆运动的场景空间轴， 您可以这样做。另一个用例是基于镜头或爆炸的摄像机定向"命中"。想象一下，创建一个使摄像机快速向上沿横轴方向滚动 的动画。如果您的附近发生了爆炸，则您可以使用到爆炸中心的方向矢量定义一个转换，并在该空间播放摄像机动画， 从而使您的摄像机始终旋转远离爆炸。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [camera](https://dev.epicgames.com/community/search?query=camera)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建和编辑摄像机动画](/documentation/zh-cn/unreal-engine/camera-animation-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E7%BC%96%E8%BE%91%E6%91%84%E5%83%8F%E6%9C%BA%E5%8A%A8%E7%94%BB)
-   [播放摄像机动画](/documentation/zh-cn/unreal-engine/camera-animation-in-unreal-engine#%E6%92%AD%E6%94%BE%E6%91%84%E5%83%8F%E6%9C%BA%E5%8A%A8%E7%94%BB)
-   [播放空间](/documentation/zh-cn/unreal-engine/camera-animation-in-unreal-engine#%E6%92%AD%E6%94%BE%E7%A9%BA%E9%97%B4)