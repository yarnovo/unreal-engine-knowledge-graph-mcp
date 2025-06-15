# 虚幻引擎中的代理几何体工具概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/proxy-geometry-tool-overview-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:02:19.792Z

---

目录

![代理几何体工具概述](https://dev.epicgames.com/community/api/documentation/image/220c92f2-ff45-4258-b806-dd70e74f7bb2?resizing_type=fill&width=1920&height=335)

## 代理几何体工具

代理几何体工具的目标是帮助减少静态网格体及其对应材质和纹理的运行时渲染开销。为实现这一点，代理几何体工具会将多个静态网格体及其对应材质合并为单个静态网格体，其中包含单组纹理和材质，它们仍匹配原始静态网格体的形状和外观，但三角形数量更少。在质量差异可接受或不明显时，例如，结构远离摄像机，这一缩减结果可以用作原始几何体的代理。

![Proxy_Geometry_OV_01.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0811d735-9ff3-4ddd-8817-ab5be4f340bc/proxy_geometry_ov_01.png)

### 代理几何体工具静态网格体生成

你在使用代理几何体工具时获得的结果可能根据工具中使用的设置而有所不同。下面的图像使用代理几何体工具的默认设置创建而成。

![使用代理几何体之前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39d11981-e81f-43c2-b4fd-466ec2811c14/proxygeo_orginal_01.png)

![使用代理几何体之后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f2e06dd-6d48-44a8-b93c-56fa9152b0f5/proxygeo_crunched_01.png)

使用代理几何体之前

使用代理几何体之后

**使用代理之前**

 

**使用代理之后**

 

**对象数量**

22

**对象数量**

1

**三角形数量**

27,308

**三角形数量**

4,032

**材质数量**

6

**材质数量**

1

虽然静态网格体可能看起来与原始对象并不完全相同，但你使用代理几何体工具可以带来相当显著的节省。在此测试场景中，我们采用了22个静态网格体，其中带有六个材质和超过27000个三角形，将其变换为单个静态网格体后，其中带有一个材质和4000个三角形。

### 代理几何体工具纹理生成

代理几何体工具还将生成一组新的纹理，对应于创建的新静态网格体几何体。下图显示了此生成的纹理相较于使用的原始纹理的外观。 

![使用代理几何体之前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d96fbd3-c740-45c2-a443-f695b6ecdf0b/proxygeo_default_texture_01.png)

![使用代理几何体之后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4b286e2-b574-49a4-9315-1e240536422e/proxygeo_crunched_texture_01.png)

使用代理几何体之前

使用代理几何体之后

### 关于工具性能的简要说明

代理系统首次处理几何体的项目时，将填充游戏线程上的着色器缓存，产生一次性的开销。  这意味着，后续迭代（例如，更改某个参数并重新构建该代理）可能快得多。  针对现有第三方选项进行比较，此新系统在适中空间大小的几何体群集上可将速度提升至2到3倍，但在非常大的几何体上，完成时间类似。

请注意，以上关于速度提升的信息仅与在UE4编辑器中生成代理相关，而不是与其在游戏中的使用相关。使用代理所带来的游戏内性能提升将取决于最终多边形数量和纹理大小等数量。

-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [proxygeometrytool](https://dev.epicgames.com/community/search?query=proxygeometrytool)
-   [proxygeo](https://dev.epicgames.com/community/search?query=proxygeo)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [代理几何体工具](/documentation/zh-cn/unreal-engine/proxy-geometry-tool-overview-in-unreal-engine#%E4%BB%A3%E7%90%86%E5%87%A0%E4%BD%95%E4%BD%93%E5%B7%A5%E5%85%B7)
-   [代理几何体工具静态网格体生成](/documentation/zh-cn/unreal-engine/proxy-geometry-tool-overview-in-unreal-engine#%E4%BB%A3%E7%90%86%E5%87%A0%E4%BD%95%E4%BD%93%E5%B7%A5%E5%85%B7%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E7%94%9F%E6%88%90)
-   [代理几何体工具纹理生成](/documentation/zh-cn/unreal-engine/proxy-geometry-tool-overview-in-unreal-engine#%E4%BB%A3%E7%90%86%E5%87%A0%E4%BD%95%E4%BD%93%E5%B7%A5%E5%85%B7%E7%BA%B9%E7%90%86%E7%94%9F%E6%88%90)
-   [关于工具性能的简要说明](/documentation/zh-cn/unreal-engine/proxy-geometry-tool-overview-in-unreal-engine#%E5%85%B3%E4%BA%8E%E5%B7%A5%E5%85%B7%E6%80%A7%E8%83%BD%E7%9A%84%E7%AE%80%E8%A6%81%E8%AF%B4%E6%98%8E)