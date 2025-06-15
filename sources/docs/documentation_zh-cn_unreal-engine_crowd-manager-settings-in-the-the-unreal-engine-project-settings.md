# 虚幻引擎项目设置中的群组管理器设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/crowd-manager-settings-in-the-the-unreal-engine-project-settings
> 
> 生成时间: 2025-06-14T18:53:46.871Z

---

目录

## 群组管理器

### 配置

**分段**

**说明**

**避障配置（Avoidance Config）**

障碍物避障参数。

**采样模式（Sampling Patterns）**

障碍物避障参数。

**最大代理数（Max Agents）**

群组支持的最大代理数量。

**最大代理半径（Max Agent Radius）**

可以被添加到群组的一个代理的最大半径。

**最大避障代理数（Max Avoided Agents）**

速度避障的最大邻近代理数量。

**最大避障墙壁数（Max Avoided Walls）**

速度避障的最大墙壁分段数量。

**寻路网格体检查间隔（NavMesh Check Interval）**

定义代理在远离寻路网格体之后检查其位置的频率。

**路径优化间隔（Path Optimization Interval）**

定义代理尝试优化路径的频率。

**分离目录限制（Separation Dir Clamp）**

当邻近代理在该代理后方时（即，当该改立的朝向和邻近代理朝向之间的点积小于该阈值时），将分离力限制为向左或向右。

这可以是-1（无效果）到1（总是应用）之间的任意值，但通常应设置为0或更低的值。

这样做的效果是，该代理将试图给后方过来的代理让路。要调整此行为，可以在-1到1之间逐步调整该值。当该值为0时，该代理会避让正后方的邻近代理。

**路径偏移半径乘数（Path Offset Radius Multiplie r）**

用于绕过转角偏移路径的代理半径乘数。

**解决碰撞（Resolve Collisions）**

定义群组模拟是否应解决代理之间的碰撞。

如果不，这将由其移动组件处理。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [群组管理器](/documentation/zh-cn/unreal-engine/crowd-manager-settings-in-the-the-unreal-engine-project-settings#%E7%BE%A4%E7%BB%84%E7%AE%A1%E7%90%86%E5%99%A8)
-   [配置](/documentation/zh-cn/unreal-engine/crowd-manager-settings-in-the-the-unreal-engine-project-settings#%E9%85%8D%E7%BD%AE)