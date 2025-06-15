# 虚幻引擎VR分析解译与注意事项 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/vr-profiler-interpretations-and-considerations-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:44:34.564Z

---

目录

![VR分析解译与注意事项](https://dev.epicgames.com/community/api/documentation/image/b3c3ae95-8022-4a21-bec2-4165a62bbfa5?resizing_type=fill&width=1920&height=335)

[分析工具](/documentation/zh-cn/unreal-engine/vr-profiling-tools-in-unreal-engine) 可提供项目如何在 VR 中执行的数据，而解译这些数据时有一些注意事项。

在 GPU 和 CPU 分析工具中奇数的地方可能出现延迟，在遮蔽或场景图表遍历时间时最容易发生。如果数字奇高，则有可能为误报。

进行分析时，通常会在 90 Hz 和 45 Hz 之间跳动。出现这种差异的解释是因为合成器的作用与垂直同步相似。如果失去帧率，则会完全延迟到下一帧。因此通常会下降到括号中的 90 / n，此处的 n 为一个整数。因为每秒帧率报告为一个平均数，所以它不会固定报告为整数，除非帧率持续下降。如果在获取帧率之间摇摆不定，则可能会看到部分跳动。

如希望将此从测试中移除，较为实用的方法是运行游戏模拟立体渲染，而不在设备自身中运行。操作方法：

-   在命令行上输入 `-game -emulatestereo -res=2160x1200`，然后运行游戏
-   在控制台中输入 `r.vsync 0`，将垂直同步关闭。
-   在控制台中输入 `r.screenpercentage 137` 更新屏幕百分比，模拟必须为 VR 进行的过度采样。

这可模拟 GPU 和 CPU 性能特征，不会有帧率变化的烦恼。

值得一提的是，如果多数时间均为 90 fps，而进行修改后帧数大跌，则很可能是遇到了上文所述的合成器"垂直同步"问题。 问题解决后，帧数则会大大改善。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

相关文档

[

VR 性能测试

![VR 性能测试](https://dev.epicgames.com/community/api/documentation/image/9567f097-9b12-4be8-ace2-2975a11547fe?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/vr-performance-testing-in-unreal-engine)