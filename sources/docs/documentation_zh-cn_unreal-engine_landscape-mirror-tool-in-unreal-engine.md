# 虚幻引擎中的地形镜像工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-mirror-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:12:37.634Z

---

目录

![地形镜像工具](https://dev.epicgames.com/community/api/documentation/image/009d9d32-438d-4659-8ea0-1526c02cb713?resizing_type=fill&width=1920&height=335)

利用 **镜像（Mirror）** 工具可沿 X 轴或 Y 轴镜像或旋转现有的地形高度图几何体。

在本示例中，镜像工具用于将整个地形沿着Y轴进行镜像处理。

## 使用镜像工具

1.  在 Landscape 工具栏的 **Sculpt** 标签页中选择 **Mirror** 工具。
    
    ![Mirror Tool button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3de4fa7f-0e9f-4e9e-867d-9688fd953103/01-mirror-tool-button.png "Mirror Tool button")
2.  使用 **Operation** 下拉选项选择用于所选地形的轴和镜像方法。方向箭头则说明地形几何体的哪一侧将被镜像。
    
    ![Mirror Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2aa75285-4d61-41a1-8c10-567527f2f3df/02-mirror-settings.png "Mirror Settings")
3.  如有必要，可调整镜像平面的 **镜像点（Mirror Point）** 值，或左键点击拖动镜像平面的方向箭头到需要镜像的位置中。
    
    只有当前选中的 **操作（Operation）** 轴才将用于 **镜像点（Mirror Point）**。举例而言，如操作方法为"-X to +X"，X 轴则是唯一一个被影响的活跃镜像点。
    
    ![Setting the Mirror Point](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d95a49ed-1253-4e7a-9feb-876b8bb0aa96/03-setting-the-mirror-point.png "Setting the Mirror Point")
4.  完成编辑后即可按下 **Apply** 按钮查看结果。
    
    ![Applying Mirror](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f04b2a83-3399-4a0e-bd10-012105273e4e/04-applying-mirror.png "Applying Mirror")
    
    您现在便获得了带镜像几何体的地形。
    

### 镜像平滑宽度

如应用修改后镜像地形产生的边缘接缝相比之下十分不自然或锐度过高，则可使用 **CTRL + Z** 取消上一步操作。然后再对 **平滑宽度（Smoothing Width）** 进行调整， 将这些合并的边缘顶点柔化。

![使用平滑宽度前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81ffc136-e86a-46fb-adb2-15d8dd92343d/05-smoothing-width-before.png "Smoothing Width Before")

![使用平滑宽度后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60733f8d-5f49-42bf-b39b-a379511646d9/06-smoothing-width-after.png "Smoothing Width After")

使用平滑宽度前

使用平滑宽度后

在此例中，左图为镜像地形后未应用平滑的效果，而右图则是对镜像边缘应用了 10 点平滑值的效果，减弱了接缝的毛边。

## 工具设置

![Mirror Tool](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9d25580-184c-4ba1-8c35-557225ea7dbe/07-mirror-tool.png "Mirror Tool")

![Mirror Tool properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/313d2459-40de-4cb8-a3d7-286a55dfa650/08-mirror-tool-properties.png "Mirror Tool properties")

 

 

**属性**

**描述**

**Mirror Point**

这将设置镜像平面的位置。位置默认为所选地形的中央，通常情况下均无需进行修改。

**Operation**

执行的镜像操作类型。举例而言，"-X to +X"将把地形 -X 的一半复制并翻转到 +X 的一半上。

**Recenter**

此按钮将把镜像平面放置回所选地形的中央。

**Smoothing Width**

此属性将设置镜面平面任意一侧的顶点数量，平滑镜像面，减少相比之下的锐角。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [region](https://dev.epicgames.com/community/search?query=region)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用镜像工具](/documentation/zh-cn/unreal-engine/landscape-mirror-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E9%95%9C%E5%83%8F%E5%B7%A5%E5%85%B7)
-   [镜像平滑宽度](/documentation/zh-cn/unreal-engine/landscape-mirror-tool-in-unreal-engine#%E9%95%9C%E5%83%8F%E5%B9%B3%E6%BB%91%E5%AE%BD%E5%BA%A6)
-   [工具设置](/documentation/zh-cn/unreal-engine/landscape-mirror-tool-in-unreal-engine#%E5%B7%A5%E5%85%B7%E8%AE%BE%E7%BD%AE)