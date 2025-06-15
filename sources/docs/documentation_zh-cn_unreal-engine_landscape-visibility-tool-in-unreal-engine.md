# 虚幻引擎地形可视性工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-visibility-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:13:05.372Z

---

目录

![地形可视性工具](https://dev.epicgames.com/community/api/documentation/image/826a1b1d-0b18-4fc2-bf6a-e67b7eb4e189?resizing_type=fill&width=1920&height=335)

**可视性（Visibility）** 工具用于在地形部分上如洞穴之类的区域进行遮罩（创建洞窟）。

## 使用可视性工具

在此例中，可视性工具将结合地形材质使用，此材质已设为使用地形可视性遮罩。 这可将地形的部分绘制为可视或不可视，以便使用额外的静态网格体 Actor 添加洞窟或其他地下区域。上方的演示展示了先绘制不可视性，然后重新绘制可视性。

使用以下功能键绘制地形可见性的遮罩或非遮罩区域：

**功能键**

**操作**

**左键点击**

添加可见性遮罩，使地形不可见。

**Shift + 左键点击**

移除可见性遮罩，使地形组件重新可见。

![使用前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b957d18-91b9-419e-bacd-07b78d860a16/01-before-using-the-visibility-tool.png "Before")

![使用后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76dd7b1f-4a34-4f1d-95e3-5aa4c9c6d425/02-after-using-the-visibility-tool.png "After")

使用前

使用后

在此例中，地形洞穴材质用于获知地形的不可见（被遮罩）区域。 绘制遮罩区域时只有开启和关闭状态，因此从完全遮罩到无遮罩之间无法获得过渡梯度。

### 使用不透明遮罩创建洞穴

虽然可以使用造型工具在地形中创建垂直洞穴地貌，但有时需要创建水平洞穴地貌（如洞窟）。可利用 Visibility 工具和不透明遮罩进行"涂抹"， 使地形的一部分变为不可视。

如需将地形的一部分变为不可视，必须使用地形洞穴材质正确设置地形材质。 如需了解如何进行正确设置，可在此处阅读 [地形洞穴材质](/documentation/zh-cn/unreal-engine/landscape-materials-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%9C%B0%E5%BD%A2%E6%B4%9E%E6%9D%90%E8%B4%A8)。

如使用可视性工具时未指定地形洞穴材质，工具将移除应用至所选地形部分的材质图层， 而不会在地形上创建洞穴。

设置好地形洞穴材质后，即可使用绘制工具在地形上创建洞穴。

**创建地形洞穴的步骤：**

1.  确认已为地形指定 **地形洞穴材质**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f98b2d07-9743-4a07-87eb-b017122637ea/03-ls-hole_details.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f98b2d07-9743-4a07-87eb-b017122637ea/03-ls-hole_details.png)
    
    点击查看大图。
    
2.  在地形工具栏的 **Sculpt** 模式中选择 **Visibility** 工具。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7b21089-8b10-4823-a53d-53050764178a/04-visibility-tool.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7b21089-8b10-4823-a53d-53050764178a/04-visibility-tool.png)
    
    点击查看大图。
    
3.  确定在地形上创建洞穴的位置。
    
    ![Landscape Mountain No Cave](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e126951-a695-4253-86f8-bbf71e59e60b/05-landscape-mountain-no-cave.png "Landscape Mountain No Cave")
4.  根据需要设置笔刷尺寸。
    
    ![Landscape Mountain Cave Mask](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bfb6c649-55d9-4e16-8907-810b07f200c4/06-landscape-mountain-cave-mask.png "Landscape Mountain Cave Mask")
5.  **单击左键** 创建洞穴，**Shift + 左键单击** 移除创建的洞穴。
    
    ![Landscape Mountain Hole](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2473fc8-d38c-4f2a-994d-db5e2b26b3ca/07-landscape-mountain-hole.png "Landscape Mountain Hole")
    
    可在地形洞穴中匹配静态网格体 Actors，完成洞穴创建。
    
    使用 Play In Editor（PIE）对新建洞穴的碰撞进行测试，可能需要从 **Landscape** 模式切换至 **Place** 模式。
    

## 工具设置

![Visibility Tool](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3e8d69c-4dc3-449c-9898-c1b0dce1461d/08-visibility-tool.png "Visibility Tool")

此部分中没有可进行调整的可视性特有工具设置。根据步骤设置正确的地形洞穴材质（细节如上）， 然后使用绘制功能键将其绘制到遮罩区域中。

如未将 **地形洞穴材质** 指定到地形，**Target Layers** 下的 Visibility 工具面板将出现以下警告：

![Visibility Tool Warning](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6ee5c5a-4ea0-41b1-9451-fccba8d64312/09-visibility-tool-warning.png "Visibility Tool Warning")

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用可视性工具](/documentation/zh-cn/unreal-engine/landscape-visibility-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%8F%AF%E8%A7%86%E6%80%A7%E5%B7%A5%E5%85%B7)
-   [使用不透明遮罩创建洞穴](/documentation/zh-cn/unreal-engine/landscape-visibility-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%B8%8D%E9%80%8F%E6%98%8E%E9%81%AE%E7%BD%A9%E5%88%9B%E5%BB%BA%E6%B4%9E%E7%A9%B4)
-   [工具设置](/documentation/zh-cn/unreal-engine/landscape-visibility-tool-in-unreal-engine#%E5%B7%A5%E5%85%B7%E8%AE%BE%E7%BD%AE)