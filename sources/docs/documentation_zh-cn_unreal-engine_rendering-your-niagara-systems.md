# 渲染Niagara系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/rendering-your-niagara-systems
> 
> 生成时间: 2025-06-14T19:31:17.634Z

---

目录

![渲染Niagara系统](https://dev.epicgames.com/community/api/documentation/image/b623b1ec-15ad-4920-a9a1-c5bef3f99970?resizing_type=fill&width=1920&height=335)

## 配置项目

创建关卡序列前，单击 **设置（Settings） > 插件（Plugins）** 以打开 **插件（Plugins）窗口** 并 **启用** 以下插件：

-   Niagara MRQ Support
-   Niagara SIM Caching

出现提示时，重新启动编辑器。现在可以开始创建关卡序列了。

## 创建关卡序列

按照以下步骤创建带 **摄像机（Camera）** 的 **关卡序列（Level Sequence）** 并使用 **影片渲染队列（MRQ）** 生成帧：

1.  右键单击 **内容浏览器（Content Browser）**，找到 **过场动画（Cinematics）** 并创建 **关卡序列（Level Sequence）**。
2.  将关卡序列重命名为合适的名称。
3.  双击关卡序列将其打开。
4.  单击Sequencer面板顶部的 **摄像机（Camera）** 按钮，新建一个 **过场动画摄像机（Cine Camera）** 和一个 **镜头切换轨道（Camera Cuts track）** 。
5.  使用3D视图功能按钮将摄像机定位到你想要的取景处。

## 使用影片渲染队列渲染帧

1.  按下 **Sequencer面板** 顶部的 **场记板（Clapper Board）** 按钮，打开**影片渲染队列（MRQ）** 。
2.  如果配置了ffmpeg：
    -   单击序列的 **设置（Settings）** ，它也可能显示为"**未保存配置（Unsaved Config）**"。
    -   按下 **+设置（+Setting）** 按钮
    -   添加 **命令行编码器（Command Line Encoder）** 设置块。
    -   按下 **接受（Accept）** 按钮，离开"设置（Settings）"对话框。
3.  在"影片渲染队列"面板上，按下 **渲染（本地）（Render (Local)）** 按钮。

现在将运行MRQ。在显示正在生成的帧的预览之前，它可能会先编译必要的着色器。

如果你的计算机上未安装FFmpeg编码解码器，请阅读[如何在影片渲染队列中使用FFmpeg和命令行编码器](https://dev.epicgames.com/community/learning/tutorials/BbYV/unreal-engine-how-to-use-ffmpeg-with-the-command-line-encoder-in-movie-render-queue)文档了解安装方法。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [配置项目](/documentation/zh-cn/unreal-engine/rendering-your-niagara-systems#%E9%85%8D%E7%BD%AE%E9%A1%B9%E7%9B%AE)
-   [创建关卡序列](/documentation/zh-cn/unreal-engine/rendering-your-niagara-systems#%E5%88%9B%E5%BB%BA%E5%85%B3%E5%8D%A1%E5%BA%8F%E5%88%97)
-   [使用影片渲染队列渲染帧](/documentation/zh-cn/unreal-engine/rendering-your-niagara-systems#%E4%BD%BF%E7%94%A8%E5%BD%B1%E7%89%87%E6%B8%B2%E6%9F%93%E9%98%9F%E5%88%97%E6%B8%B2%E6%9F%93%E5%B8%A7)