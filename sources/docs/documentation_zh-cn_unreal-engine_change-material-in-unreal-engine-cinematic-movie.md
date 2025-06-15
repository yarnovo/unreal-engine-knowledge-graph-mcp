# 切换虚幻引擎Sequencer中的Actor材质 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/change-material-in-unreal-engine-cinematic-movie
> 
> 生成时间: 2025-06-14T20:14:04.859Z

---

目录

![切换Sequencer中的Actor材质](https://dev.epicgames.com/community/api/documentation/image/1b66b75e-cb11-4b36-8fdd-a14340d92472?resizing_type=fill&width=1920&height=335)

**材质元素切换器（Material Element Switcher）** 轨迹是可用于对Actor上的材质设置动画的Sequencer轨迹。利用此轨迹可通过在此轨迹上添加特定材质的关键帧来改变Actor上的材质。

本指南中可使用Epic商城中的Paragon Phase和Fey材质。可以看到，Phase的裙子已拥有材质元素切换器。这样便可轻松查看材质与夹克对比的变化。

1.  前往 **过场动画（Cinematics）** > **添加关卡序列（Add Level Sequence）**。命名并保存序列，例如"MaterialAnim"，然后在 **内容浏览器** 中打开。
    
2.  将Actor的骨架网格体添加到视口。然后，将此网格体作为轨迹添加到序列中。
    
3.  在 **骨架网格体（Skeletal Mesh）** 组件下，添加新 **轨迹** 并选择 **材质元素切换器**。在骨架网格体动画蓝图中，可找到actor上要变更元素对应的材质编号。
    
    ![选择特定材质切换器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2eadfda-24d7-49df-a2c0-0c9988725cff/binding1.png)

本范例中将更改夹克材质，其为材质元素10。

1.  在标记为 **无（None）** 的下拉菜单中，选择序列的首个材质。然后，在序列中向此元素添加关键帧。
    
    ![选择材质切换器下拉菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee42ca34-e3ce-4df4-bcbb-7e8a4f6fe343/binding7.png) ![选择材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f062d0ad-5393-477a-9893-d252c52a19f4/binding2.png)

本范例将以 **MIC\_Phase\_jacket** 开始，其为Phase的夹克材质。

1.  沿 **时间轴** 将滑块移到要变更的材质处。利用下拉菜单，选择新材质并将新建添加到序列。
    
    ![使用M_Fey_Armor材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02bf92cd-4c30-4d16-b340-ecf3f8c432d5/binding3.png)

本范例将此材质变更为 **M\_Fey\_Armours** 材质。

1.  重复上一步添加第三个材质。
    
    ![使用M_Fey_Plantseed材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad4bbfc6-29cf-4869-930a-398446865080/binding5.png)

本范例将此材质变更为 **M\_Fey\_Plantseed** 材质。

1.  最后一次变更为返回Phase的初始夹克材质：MIC\_Phase\_jacket。移动滑块并再次将键添加到此材质。本范例中，在裙子材质在序列结束处改变之前变更夹克材质。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acc68aba-8e40-48a3-a48e-2fe86acadf8c/binding6.png)

现在可播放序列观看材质变化。

## 最终结果

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [最终结果](/documentation/zh-cn/unreal-engine/change-material-in-unreal-engine-cinematic-movie#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)