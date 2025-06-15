# 虚幻引擎中的过场动画控制台变量轨道 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-console-variable-track-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:12:15.176Z

---

目录

![控制台变量轨道](https://dev.epicgames.com/community/api/documentation/image/8dc108fd-2a08-4c0c-9872-b39a1b501456?resizing_type=fill&width=1920&height=335)

在一些过场动画序列中，你可能需要通过控制台变量来调节渲染设置（或者其它设置）。你可以使用 **控制台变量轨道（Console Variable Track）** 来实现该目的。以轨道的形式编辑控制台变量对于实时的项目或者需要在序列中途进行修改的项目非常有用. 如果你要渲染序列，那么你可能应该使用[影片渲染队列](/documentation/404)的全局或者每个镜头的[控制台变量渲染设置](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F).

#### 先决条件

-   你对于[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)及其[界面](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)有一定了解。

## 创建

要向序列中添加控制台变量轨道，点击 **轨道 (+)** 下拉菜单并选择 **控制台变量轨道（Console Variable Track）**。

![创建控制台变量轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08da6990-adea-4d74-9f16-d4d6535c3c46/create1.png)

控制台变量轨道将控制台变量使用[分段](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine#sections)应用到一个时间范围上。要创建控制台变量分段，点击轨道上的 **分段（Section） (+)**。与大部分分段类似，控制台变量分段可以在时间轴区域内裁剪、编辑以及移动。

![添加控制台变量分段](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/714db17c-60ce-43f0-92c3-f5f6960a3574/create2.png)

## 使用

要让控制台变量在分段中生效，右键点击分段然后找到 **属性（Properties） > 控制台变量（Console Variables）** 属性。

![控制台变量属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63793a24-d8fb-4189-8d6b-c2bfc2f7184c/usage1.png)

向控制台变量属性添加控制台变量时可以直接在其旁边的区域输入。要在一个区域中添加多个变量的话，将输入框中的变量用 **逗号 (,)** 隔开。

![控制台变量示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df5acb27-797b-4e15-8ffb-1378397136c6/usage2.png)

向分段中添加完变量后，可以拉动进度条或者直接播放来预览效果。就像其它默认分段一样，原来的控制台变量值会在分段结束的时候恢复。

![控制台变量结果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ae2e157-092c-4cc5-b988-502e28e51e3c/usage3.gif)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [console](https://dev.epicgames.com/community/search?query=console)
-   [track](https://dev.epicgames.com/community/search?query=track)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/cinematic-console-variable-track-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建](/documentation/zh-cn/unreal-engine/cinematic-console-variable-track-in-unreal-engine#%E5%88%9B%E5%BB%BA)
-   [使用](/documentation/zh-cn/unreal-engine/cinematic-console-variable-track-in-unreal-engine#%E4%BD%BF%E7%94%A8)