# 虚幻引擎视图模式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:18:53.925Z

---

目录

![视图模式](https://dev.epicgames.com/community/api/documentation/image/dacb3771-18c6-497c-87cd-5baad166e601?resizing_type=fill&width=1920&height=335)

![Viewmode Header](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e017e538-bd24-4162-85a8-52477cb30ac2/01-view-mode-header.png "Viewmode Header")

虚幻编辑器视口提供了许多可视化模式来帮助您查看场景中正在处理的数据类型，以及诊断任何错误或意外结果。较为常用的视图模式有自己的热键，但所有视图模式都可从视口内通过 **视图模式（View Mode）**菜单进行访问。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9d71899-ebe3-4e82-aba6-aeb5e7dbe2e7/02-viewmode-menu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9d71899-ebe3-4e82-aba6-aeb5e7dbe2e7/02-viewmode-menu.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e127064-f1f6-4dae-b952-47736f9185c5/03-viewmodes-sub-menu-button.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e127064-f1f6-4dae-b952-47736f9185c5/03-viewmodes-sub-menu-button.png)

点击查看大图。

## 照亮

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fd0c2b3-f8f1-466b-ac3e-c271a92a8d0a/04-viewmode-lit.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fd0c2b3-f8f1-466b-ac3e-c271a92a8d0a/04-viewmode-lit.png)

点击查看大图。

-   视图模式热键：**Alt + 4**
-   控制台命令：`viewmode lit`

**照亮** 视图模式显示应用所有材质和照明之后的场景最终结果。

## 不照亮

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8a7b54b-2591-4d67-9d6f-2fc5de04246b/05-viewmode-unlit.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8a7b54b-2591-4d67-9d6f-2fc5de04246b/05-viewmode-unlit.png)

点击查看大图。

-   视图模式热键：**Alt + 3**
-   控制台命令：`viewmode unlit`

**不照亮** 视图模式从场景中移除所有照明，从而只显示底色。

## 线框

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d700c2f-0a58-40ee-8887-5d50240b9b17/06-viewmode-wireframe.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d700c2f-0a58-40ee-8887-5d50240b9b17/06-viewmode-wireframe.png)

点击查看大图。

-   视图模式热键：**Alt + 2**
-   控制台命令：`viewmode wireframe`

**线框** 显示场景中的所有多边形边缘。对于"画刷"，您将看到所产生的几何体。

## 细节照明

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24564e87-c015-4937-8656-4bb7f0beee61/07-viewmode-detail-lighting.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24564e87-c015-4937-8656-4bb7f0beee61/07-viewmode-detail-lighting.png)

点击查看大图。

-   视图模式热键：**Alt + 5**
-   控制台命令：`viewmode lit_detaillighting`

**细节照明** 使用原始材质的法线贴图在整个场景内激活中性材质。这对于进行隔离而言非常有用，而无论底色是否因为过暗或噪声过高而遮蔽了光线。

## 仅照明

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d6379e8-daaf-4bb8-a190-d3efbd42e7ea/08-viewmode-lighting-only.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d6379e8-daaf-4bb8-a190-d3efbd42e7ea/08-viewmode-lighting-only.png)

点击查看大图。

-   视图模式热键：**Alt + 6**
-   控制台命令：`viewmode lightingonly`

**仅照明** 显示仅受照明影响的中性材质。此模式与 *细节照明* 模式的区别在于，您不会看到法线贴图。

## 光线复杂性

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d55fad4f-8e0e-4f2e-9ae4-7edbdf8bc5a8/09-optimization-viewmodes-menu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d55fad4f-8e0e-4f2e-9ae4-7edbdf8bc5a8/09-optimization-viewmodes-menu.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/505e1b64-25dc-4793-93c4-828bca34e07d/10-viewmode-lighting-complexity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/505e1b64-25dc-4793-93c4-828bca34e07d/10-viewmode-lighting-complexity.png)

点击查看大图。

-   视图模式热键：**Alt + 7**
-   控制台命令：`viewmode lightcomplexity`

"光线复杂性"显示影响几何体的非静态光线数目。这对于跟踪照明成本而言非常有用 - 影响表面的光线越多，进行明暗处理的成本越高。

光线复杂性着色

 

 

 

 

 

 

**颜色**

![LightComplexity_0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6612e253-134f-4266-a5b9-a76909080f93/lightcomplexity_0.gif "LightComplexity_0")

![LightComplexity_1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3f544aa-588a-4684-9f78-9062d3dab54e/lightcomplexity_1.gif "LightComplexity_1")

![LightComplexity_2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b37281b-86aa-415d-b583-2bead9c6c645/lightcomplexity_2.gif "LightComplexity_2")

![LightComplexity_3](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc2eebf1-c352-466d-9835-f8ea5b99426e/lightcomplexity_3.gif "LightComplexity_3")

![LightComplexity_4](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28b6bebd-9931-45bb-a33b-33e38cbc51c2/lightcomplexity_4.gif "LightComplexity_4")

![LightComplexity_5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e36d087-b165-4e07-8dc1-fcdc524219b3/lightcomplexity_5.gif "LightComplexity_5")

**影响表面的光线数目**

**0**

**1**

**2**

**3**

**4**

**5+**

此颜色方案是在着色器代码中定义的。

## 着色器复杂性

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f20fa39-b1a8-4854-87f8-385505036360/11-viewmode-shader-perf.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f20fa39-b1a8-4854-87f8-385505036360/11-viewmode-shader-perf.png)

点击查看大图。

-   视图模式热键：**Alt + 8**
-   控制台命令：`viewmode shadercomplexity`

**着色器复杂性** 模式用来显示用于计算场景中每个像素的着色器指令数。通常，这可以很好地指示场景的性能状况。一般来说，此模式用来测试基本场景的整体性能以及优化粒子效果，这些效果可能会导致短时间内发生大量过度绘制，从而导致性能突降。

只有指令计数用来计算着色器复杂性，这可能不一定准确。例如，在所有平台上，含有 16 条指令（全部都是纹理查找）的着色器都会比含有 16 条算术指令的着色器慢得多。并且，包含未展开的循环的着色器无法由指令计数准确表示，此问题主要与顶点着色器相关。总的来说，指令计数在大部分情况下是一个良好的指标。

此视图模式使用色谱来指示场景的成本。绿色到红色表示"成本非常低"到"成本高"的线性关系，而粉红色和白色表示快速跳跃至"成本非常高"的像素。较小的白色区域可以容忍，但如果屏幕的大部分区域都显示为鲜红色或白色，那么表示性能不佳。

着色器复杂性着色

 

 

 

 

 

 

 

 

 

\[REGION:shadercomplexity sc\_1\]\[/REGION\]

\[REGION:shadercomplexity sc\_2\]\[/REGION\]

\[REGION:shadercomplexity sc\_3\]\[/REGION\]

\[REGION:shadercomplexity sc\_4\]\[/REGION\]

\[REGION:shadercomplexity sc\_5\]\[/REGION\]

\[REGION:shadercomplexity sc\_6\]\[/REGION\]

\[REGION:shadercomplexity sc\_7\]\[/REGION\]

\[REGION:shadercomplexity sc\_8\]\[/REGION\]

\[REGION:shadercomplexity sc\_9\]\[/REGION\]

 

**理想**

 

 

**中等**

 

 

**成本高**

**成本非常高**

 

 

**+ShaderComplexityColors** 在 `BaseEngine.ini` 文件中定义；它会根据给定像素的指令总和进行插值。

```cpp
+ShaderComplexityColors=(R=0.0,G=1.0,B=0.127,A=1.0)  
+ShaderComplexityColors=(R=0.0,G=1.0,B=0.0,A=1.0)  
+ShaderComplexityColors=(R=0.046,G=0.52,B=0.0,A=1.0)  
+ShaderComplexityColors=(R=0.215,G=0.215,B=0.0,A=1.0)  
+ShaderComplexityColors=(R=0.52,G=0.046,B=0.0,A=1.0)  
+ShaderComplexityColors=(R=0.7,G=0.0,B=0.0,A=1.0)  
+ShaderComplexityColors=(R=1.0,G=0.0,B=0.0,A=1.0)  
+ShaderComplexityColors=(R=1.0,G=0.0,B=0.5,A=1.0)  
+ShaderComplexityColors=(R=1.0,G=0.9,B=0.9,A=1.0)  
```

**MaxPixelShaderAdditiveComplexityCount** 被默认设置为 2000，不过，这个值可以在 `BaseEngine.ini` 文件中更改，以便优化项目中的材质。

```cpp
MaxPixelShaderAdditiveComplexityCount=2000
```

**MaxES3PixelShaderAdditiveComplexityCount** 定义了ES3 预览模式中的范围，默认范围被设置为800。

```cpp
MaxES3PixelShaderAdditiveComplexityCount=800
```

颜色可以在 `BaseEngine.ini` 文件中修改。"Max pixel shader additive complexity count"变量也可以在项目的 `DefaultEngine.ini` 文件中修改。

## 固定光源重叠

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8af26aa-ed76-47fc-8722-54aefa8dfc8e/12-viewmode-stationary-light-overlap.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8af26aa-ed76-47fc-8722-54aefa8dfc8e/12-viewmode-stationary-light-overlap.png)

点击查看大图。

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

## 光照贴图密度

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ccee892-bf70-4ba0-abb1-84561a33c939/13-viewmode-lightmap-density.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ccee892-bf70-4ba0-abb1-84561a33c939/13-viewmode-lightmap-density.png)

点击查看大图。

视图模式热键：**Alt + 0**

**光照贴图密度** 模式显示进行了纹理贴图的对象的光照贴图密度，按其与理想/最大密度设置的关系对其进行颜色编码，并显示映射到实际光照贴图纹素的网格。在整个场景内使用偶数纹素密度以获得一致的光照贴图照明十分重要。

![Lightmap Density Light](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49a4d8af-3cb8-4e90-a6cc-c8205dbdcc64/lightmapdensitylight.gif "Lightmap Density Light")

![Lightmap Density Medium](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94a3e685-d22b-4090-9674-5c408159457a/lightmapdensitymedium.gif "Lightmap Density Medium")

![Lightmap Density Heavy](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab403545-be71-4546-8705-82e71a198fa7/lightmapdensityheavy.gif "Lightmap Density Heavy")

小于理想纹素密度

理想纹素密度

最大或大于理想纹素密度

骨骼网格将以浅棕色显示，此计算不会对其加以考虑。

## 反射

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a8de9ac-683e-4b95-98b2-87a0d5949803/14-viewmode-reflections.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a8de9ac-683e-4b95-98b2-87a0d5949803/14-viewmode-reflections.png)

点击查看大图。

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**反射** 视图模式以平面法线和粗糙度 0（即镜面）覆盖所有材质。这对于诊断反射细节十分有用，还使您得以将更多反射捕获 Actor 放入需要更多细节的区域。

## 玩家碰撞

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1da1d42-7021-4cbb-8433-8c352b0d2cb8/player-collision.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1da1d42-7021-4cbb-8433-8c352b0d2cb8/player-collision.png)

点击查看大图

-   控制台命令：`viewmode CollisionPawn`

**玩家碰撞（Player Collision）** 视图模式会突出显示能与角色或Pawn发生碰撞的资产，并使用以下颜色：

玩家碰撞着色

 

 

 

 

 

 

**颜色**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fdbabaef-83c6-4902-b9c0-6a5fc8baf83b/color-static.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9847e9b-8ff4-4e87-ad44-a6155a15ef08/color-stationary.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8e6d04e-b5d7-4296-9319-dee7ba86d1db/color-movable.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80ca1acf-f79f-4c28-9858-e65ca5ca715a/color-volume.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/471c1b20-a35c-490c-83cb-03f60ac823ce/color-trigger.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/675ac035-f56b-4a28-9d00-9a5b090e32dd/color-brush.png)

**说明**

**静态网格体**

**固定静态网格体**

**可移动静态网格体**

**体积**

**触发器体积**

**笔刷**

## 可见性碰撞

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bac92da2-a25a-437d-aa1d-4b604daf1ca4/visibility-collision.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bac92da2-a25a-437d-aa1d-4b604daf1ca4/visibility-collision.png)

点击查看大图

-   控制台命令：`viewmode CollisionVisibility`

**碰撞可见性（Collision Visibility）** 视图模式突出显示会遮挡视线的Actor。它使用以下颜色：

碰撞可见性着色

 

 

 

 

 

 

**颜色**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdbf055c-c791-43cb-a929-a3671bbdd705/color-static.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/427e35f8-e2b9-467a-bfa5-9b7719996a86/color-stationary.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76a5138a-1b8e-46a5-a4d5-d56c4480221c/color-movable.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1540e697-bd3c-47ac-b2df-1ef8bd1dcdef/color-volume.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03f66d98-3dda-4367-a07e-1ffd44581537/color-brush.png)

 

**说明**

**静态网格体**

**固定静态网格体**

**可移动静态网格体**

**体积**

**触发器体积**

**笔刷**

## LOD 着色

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e8079d2-e6df-488c-805d-193199d19a89/15-level-of-detail-coloration-menu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e8079d2-e6df-488c-805d-193199d19a89/15-level-of-detail-coloration-menu.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f83cdc91-17f2-4281-b7a4-2749eface938/16-viewmode-lod-coloration.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f83cdc91-17f2-4281-b7a4-2749eface938/16-viewmode-lod-coloration.png)

点击查看大图。

-   控制台命令：`viewmode LODColoration`

**LOD 着色** 视图模式显示基本对象的当前 LOD 指标。这对于诊断任何 LOD 问题或了解 LOD 的切换距离非常有用。

LOD 基本着色

 

 

 

 

 

 

 

 

**颜色**

![LOD Coloration_0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53236e73-1160-4ae2-b86c-8a665bca7d7d/lodcoloration_0.png "LOD Coloration_0")

![LOD Coloration_1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/245c91de-1453-4d7c-b941-016953f95e4d/lodcoloration_1.png "LOD Coloration_1")

![LOD Coloration_2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6ffa8cf-4667-4bac-8361-4cd256dd5c0c/lodcoloration_2.png "LOD Coloration_2")

![LOD Coloration_3](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16213e17-096f-4638-8399-42d0162d44f0/lodcoloration_3.png "LOD Coloration_3")

![LOD Coloration_4](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a15e8bf-5351-40b9-8b0b-c8dd14b70ec5/lodcoloration_4.png "LOD Coloration_4")

![LOD Coloration_5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2ab6904-37d3-4455-b0c9-7bd171646fc8/lodcoloration_5.png "LOD Coloration_5")

![LOD Coloration_6](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f8d4977-ab5d-4e90-b233-47f7c15a13ad/lodcoloration_6.png "LOD Coloration_6")

![LOD Coloration_7](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d5152fa-c8d3-4053-b31c-4c95764fdf21/lodcoloration_7.png "LOD Coloration_7")

**LOD 基本颜色**

**0**

**1**

**2**

**3**

**4**

**5**

**6**

**7**

```cpp
+LODColorationColors=(R=1.0,G=1.0,B=1.0,A=1.0)     
+LODColorationColors=(R=1.0,G=0.0,B=0.0,A=1.0)     
+LODColorationColors=(R=0.0,G=1.0,B=0.0,A=1.0)     
+LODColorationColors=(R=0.0,G=0.0,B=1.0,A=1.0)     
+LODColorationColors=(R=1.0,G=1.0,B=0.0,A=1.0)     
+LODColorationColors=(R=1.0,G=0.0,B=1.0,A=1.0)     
+LODColorationColors=(R=0.0,G=1.0,B=1.0,A=1.0)     
+LODColorationColors=(R=0.5,G=0.0,B=0.5,A=1.0)     
```

默认情况下，引擎仅使用 4 个 LOD，但可在源代码中增加此数目。

## HLOD着色

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fd495e2-ef60-4fa9-a3a1-ced408052e8a/17-hierarchical-lod-coloration.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fd495e2-ef60-4fa9-a3a1-ced408052e8a/17-hierarchical-lod-coloration.png)

点击查看大图。

-   控制台命令： `viewmode hlodcoloration`

**HLOD着色** 视图模式会显示图元的"层级LOD群集（Hierarchial LOD Cluster ）"索引。

HLOD图元着色

 

 

 

 

 

**颜色**

![LOD Coloration_3](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54a29eeb-60fc-4875-aa81-ad238579df54/lodcoloration_3.png "LOD Coloration_3")

![LOD Coloration_4](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae7b4d1d-c97b-4a50-9be2-4649969c5af7/lodcoloration_4.png "LOD Coloration_4")

![LOD Coloration_7](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f94540e4-6f66-48b2-972c-8ada646feca4/lodcoloration_7.png "LOD Coloration_7")

![LOD Coloration_6](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9dbf8250-1eed-47d9-b386-31cdfab3cfd4/lodcoloration_6.png "LOD Coloration_6")

![LOD Coloration_8](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/776f28f4-16ab-4af3-808a-87b2b4bf4be0/lodcoloration_8.png "LOD Coloration_8")

**HLOD图元颜色**

**0**

**1**

**2**

**3**

**4**

```cpp
+HLODColorationColors=(R=1.0,G=1.0,B=1.0,A=1.0)  //white (not part of HLOD)   
+HLODColorationColors=(R=0.0,G=1.0,B=0.0,A=1.0)  //green (part of HLOD but being drawn outside of it)   
+HLODColorationColors=(R=0.0,G=0.0,B=1.0,A=1.0)  //blue (HLOD level 0)   
+HLODColorationColors=(R=1.0,G=1.0,B=0.0,A=1.0)  //yellow (HLOD level 1)   
+HLODColorationColors=(R=1.0,G=0.0,B=1.0,A=1.0)  //purple   
+HLODColorationColors=(R=0.0,G=1.0,B=1.0,A=1.0)  //cyan   
+HLODColorationColors=(R=0.5,G=0.5,B=0.5,A=1.0)  //grey    
```

## 缓冲区可视化

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f80276c9-042b-4a47-a392-a17c3f046f9c/18-gbuffer-menu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f80276c9-042b-4a47-a392-a17c3f046f9c/18-gbuffer-menu.png)

点击查看大图。

"缓冲区可视化"区域使您能够访问图形卡中的各个缓冲区，这可以帮助您诊断场景的外观问题。为了最大限度地利用缓冲区可视化模式，了解 [材质输入](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine) 和 [材质属性](/documentation/zh-cn/unreal-engine/unreal-engine-material-properties) 的基本要点会有帮助。

### 缓冲区概观

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d7706bd-2ba8-4260-ab58-faa35b92b435/19-buffer-overview.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d7706bd-2ba8-4260-ab58-faa35b92b435/19-buffer-overview.png)

点击查看大图。

**缓冲区概观** 可视化模式允许您查看图形卡 Gbuffer 中的多个图像。其中许多图像与材质上的输入相关，这意味着您可以在仅使用单个材质输入的情况下查看场景的外观。

### 底色

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/848126ed-d196-43c5-a958-28a3773d9783/20-buffer-base-color.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/848126ed-d196-43c5-a958-28a3773d9783/20-buffer-base-color.png)

点击查看大图。

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**底色** 模式允许您仅查看场景中材质的底色。

### 贴花蒙版

![Decal Mask](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0ef2899-5653-45dc-8e46-788554520e08/buffer_decalmask.png "Decal Mask")

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**贴花蒙版** 模式以白色显示任何可以接收延迟贴花的表面。无法显示的对象将显示为黑色。

### 漫射颜色

\[![Diffuse Color](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/902cbd80-c475-457a-ad36-19b3dd25cd95/vm_diffusecolor.png "Diffuse Color")

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**漫射颜色** 显示底色与材质环境光遮蔽输入的结果。

### 明暗处理模型

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9452f26f-419c-4391-8d5d-5d8eb97afbdd/23-buffer-lighting-model.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9452f26f-419c-4391-8d5d-5d8eb97afbdd/23-buffer-lighting-model.png)

点击查看大图。

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**明暗处理模型** 模式显示场景中每个材质的"明暗处理模型"属性的值。

光线复杂性着色

 

 

 

 

**颜色**

![Light Model Lit](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d710067d-532e-49b4-925e-b21ba9a60ac2/lightmodel_lit.gif "Light Model Lit")

![Light Model Unlit](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7c733fc-0475-4f6c-abb4-890c791ba3b9/lightmodel_unlit.gif "Light Model Unlit")

![Light Model Subsurface](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b846994a-50a1-40b3-9dc1-3a3f138f9145/lightmodel_subsurface.gif "Light Model Subsurface")

![Light Model Preintegratedskin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21579d2d-9703-448a-9131-91f10c5222a9/lightmodel_preintegratedskin.gif "Light Model Preintegratedskin")

**材质的明暗处理模型**

**默认照亮**

**不照亮**

**次表面**

**预整合皮肤**

### 材质 AO

![点亮模式下的场景（游戏视图开启）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d7cbfab-226b-45b2-b17d-2caa71380b84/24-scene-in-lit-mode.png "Scene in Lit Mode")

![Scene in Buffer Material AO Mode (Game View On)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36e06a45-7716-4aab-a611-6ec4537e6ebd/25-scene-in-buffer-material-ambient-occlusion.png "Scene in Buffer Material AO Mode")

点亮模式下的场景（游戏视图开启）

Scene in Buffer Material AO Mode (Game View On)

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**材质 AO** 可视化模式显示任何与材质 \_环境光遮蔽（Ambient Occlusion）\_输入相连接的纹理处理或材质表达式节点的结果。

### 金属色

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f760eb8-0ce4-4706-9ff0-d0a962953962/26-buffer-metallic.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f760eb8-0ce4-4706-9ff0-d0a962953962/26-buffer-metallic.png)

点击查看大图。

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**金属色** 可视化模式显示任何与材质 \_金属色（Metallic）\_输入相连接的纹理处理或材质表达式节点的结果。

注：通常，材质的"金属色"（Metallic）值为 0 或 1，而不是两者之间的值。介于 0 与 1 之间的值将会因为层混合而产生，但物理材质始终为金属或非金属。

### 不透明

![点亮模式下的场景](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f15aeb7c-a127-4897-8b8f-9de4a0a28b51/27-scene-in-lit-mode.png "Scene in Lit Mode")

![缓冲区材质不透明模式下的场景（游戏视图开启）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71de6bdb-64e4-4dc4-8650-7b7119910df0/28-scene-in-buffer-material-opacity-mode.png "Scene in Buffer Material Opacity Mode")

点亮模式下的场景

缓冲区材质不透明模式下的场景（游戏视图开启）

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**不透明** 可视化模式显示任何与材质 \_不透明（Opacity）\_输入相连接的纹理处理或材质表达式节点的结果。在上面的图中，您可以看到人物的长发绺有点透明。

"不透明"视图模式仅显示使用了"不透明"（Opacity）的不透明材质，这对于次表面散射材质来说十分重要，因为"不透明"（Opacity）控制着光线可以穿透的距离。

### 粗糙度

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/beabb7eb-fdbf-4cb2-9a0d-7325f6e6724f/29-buffer-roughness.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/beabb7eb-fdbf-4cb2-9a0d-7325f6e6724f/29-buffer-roughness.png)

点击查看大图。

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**粗糙度** 可视化模式显示任何与材质 \_粗糙度（Roughness）\_输入相连接的纹理处理或材质表达式节点的结果。粗糙度变化是许多反射变化的根源。

### 场景颜色

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0db20b11-4273-496f-ad6e-0c46954abda3/30-buffer-scene-color.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0db20b11-4273-496f-ad6e-0c46954abda3/30-buffer-scene-color.png)

点击查看大图。

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**场景颜色** 显示执行任何后处理之前的场景结果。即，在进行任何曝光、高光处理、颜色校正或抗锯齿之前的场景结果。在上图中，场景显得非常暗，因为曝光尚未使其变亮。

### 场景深度

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5829471-c0e0-418d-aa6a-125c418d7055/31-buffer-scene-depth.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5829471-c0e0-418d-aa6a-125c418d7055/31-buffer-scene-depth.png)

点击查看大图。

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**场景深度** 以白色（最远）到黑色（最近）的恒定梯度显示场景的深度。

### 单独半透明 RGB

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf5ffc1a-35f8-4516-a24b-ddf63c79e06a/32-buffer-separate-trans-rgb.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf5ffc1a-35f8-4516-a24b-ddf63c79e06a/32-buffer-separate-trans-rgb.png)

点击查看大图。

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**单独半透明 RGB** 显示任何呈半透明且使用了"单独半透明"（Separate Translucency）的材质的颜色信息。

### 单独半透明 A

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23fa3dfc-2fb7-4fa1-ad69-e11df20cf8dc/33-buffer-separate-trans-a.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23fa3dfc-2fb7-4fa1-ad69-e11df20cf8dc/33-buffer-separate-trans-a.png)

点击查看大图。

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**单独半透明 A** 仅显示任何呈半透明且使用了"单独半透明"（Separate Translucency）的材质的阿尔法信息。

### 镜面反射颜色

![Specular Color](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e240ddcf-bb7e-4ddf-b86c-e4462e96f814/buffer_speccolor.png "Specular Color")

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**镜面反射颜色** 显示向材质的镜面反射提供的颜色。通常，此颜色是根据底色和金属色值的组合来确定的。

### 镜面反射

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3075c51c-ac6a-47eb-b1f5-6a960f030b7d/35-buffer-specular.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3075c51c-ac6a-47eb-b1f5-6a960f030b7d/35-buffer-specular.png)

点击查看大图。

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**镜面反射** 显示任何输送到材质 \_镜面反射（Specular）\_输入的纹理处理或材质表达式节点的结果。

### 次表面颜色

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e11a4e8-015c-4f59-8ab7-503f97e69310/36-buffer-subsurf-color.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e11a4e8-015c-4f59-8ab7-503f97e69310/36-buffer-subsurf-color.png)

点击查看大图。

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**次表面颜色** 显示任何输送到材质 \_次表面颜色（Subsurface Color）\_输入的纹理处理或材质表达式节点的结果。

### 全局法线

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57281a6a-0b44-409f-9291-90a52ea828ad/37-buffer-world-normal.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57281a6a-0b44-409f-9291-90a52ea828ad/37-buffer-world-normal.png)

点击查看大图。

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**全局法线** 显示任何不透明表面的全局空间法线。

### 环境光遮蔽

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76764bc4-b346-48c8-85b6-11eb46c17454/38-buffer-ambient-occlusion.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76764bc4-b346-48c8-85b6-11eb46c17454/38-buffer-ambient-occlusion.png)

点击查看大图。

-   视图模式热键：**无（默认情况下只能通过菜单进行访问）**

**环境光遮蔽 (AO)** 显示场景中发生的任何环境光遮蔽计算的结果。此计算与任何应用于材质的 AO 纹理无关，因为这是引擎根据表面和法线贴图进行的计算。

## 地形可视化器

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68667da7-0616-44cf-aedc-06ca3d3f4fd6/39-visualizers-menu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68667da7-0616-44cf-aedc-06ca3d3f4fd6/39-visualizers-menu.png)

点击查看大图。

### 法线

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac3958be-d525-4f4f-84b2-a45c89af1108/40-landscape-normal.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac3958be-d525-4f4f-84b2-a45c89af1108/40-landscape-normal.png)

点击查看大图。

**法线** 地形可视化模式以法线的照亮状态显示地形。

### LOD

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e7f3fdb-5666-4cbb-a08e-7ae87bd84bfd/41-landscape-lod.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e7f3fdb-5666-4cbb-a08e-7ae87bd84bfd/41-landscape-lod.png)

点击查看大图。

**LOD** 地形可视化模式将地形划分为颜色编码面板，这些面板代表其当前 LOD 状态。

### 层密度

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c162757-42ce-48d5-bc76-69211ca5b5a6/42-landscape-layer-density.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c162757-42ce-48d5-bc76-69211ca5b5a6/42-landscape-layer-density.png)

点击查看大图。

**层密度** 地形可视化模式以颜色编码模式显示地形，随着更多的层添加到地形中，该颜色编码模式将从绿色变为红色。

## 曝光

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3998c1a9-2d1b-4955-ac26-a5529b454c9f/43-exposure.gif)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3998c1a9-2d1b-4955-ac26-a5529b454c9f/43-exposure.gif)

点击查看大图。

曝光是一种后处理效果，用于控制场景的整体亮度。您可将其设置为固定值或保持自动调整。

### 自动曝光与固定曝光

在后处理期间激活曝光的情况下游戏时，您会注意到从较亮区域移至较暗区域（反之亦然）会导致摄像机临时进行调整，这类似于我们的眼睛在注视不同光线环境时发生的调整。在大多数情况下，这是期望的结果。但是，如果特定关卡中不断变化会分散玩家的注意力，那么您可将视图设置为采用固定曝光。这将锁定曝光，使其不再随着您从较亮区域移至较暗区域或者从较暗区域移至较亮区域而自动变化，但也意味着很容易产生光线对于您需要完成的工作而言过亮或过暗的情况。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [照亮](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E7%85%A7%E4%BA%AE)
-   [不照亮](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E4%B8%8D%E7%85%A7%E4%BA%AE)
-   [线框](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E7%BA%BF%E6%A1%86)
-   [细节照明](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E7%BB%86%E8%8A%82%E7%85%A7%E6%98%8E)
-   [仅照明](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E4%BB%85%E7%85%A7%E6%98%8E)
-   [光线复杂性](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E5%85%89%E7%BA%BF%E5%A4%8D%E6%9D%82%E6%80%A7)
-   [着色器复杂性](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E7%9D%80%E8%89%B2%E5%99%A8%E5%A4%8D%E6%9D%82%E6%80%A7)
-   [固定光源重叠](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E5%9B%BA%E5%AE%9A%E5%85%89%E6%BA%90%E9%87%8D%E5%8F%A0)
-   [光照贴图密度](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E5%85%89%E7%85%A7%E8%B4%B4%E5%9B%BE%E5%AF%86%E5%BA%A6)
-   [反射](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E5%8F%8D%E5%B0%84)
-   [玩家碰撞](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E7%8E%A9%E5%AE%B6%E7%A2%B0%E6%92%9E)
-   [可见性碰撞](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E5%8F%AF%E8%A7%81%E6%80%A7%E7%A2%B0%E6%92%9E)
-   [LOD 着色](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#lod%E7%9D%80%E8%89%B2)
-   [HLOD着色](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#hlod%E7%9D%80%E8%89%B2)
-   [缓冲区可视化](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E7%BC%93%E5%86%B2%E5%8C%BA%E5%8F%AF%E8%A7%86%E5%8C%96)
-   [缓冲区概观](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E7%BC%93%E5%86%B2%E5%8C%BA%E6%A6%82%E8%A7%82)
-   [底色](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E5%BA%95%E8%89%B2)
-   [贴花蒙版](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E8%B4%B4%E8%8A%B1%E8%92%99%E7%89%88)
-   [漫射颜色](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E6%BC%AB%E5%B0%84%E9%A2%9C%E8%89%B2)
-   [明暗处理模型](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E6%98%8E%E6%9A%97%E5%A4%84%E7%90%86%E6%A8%A1%E5%9E%8B)
-   [材质 AO](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E6%9D%90%E8%B4%A8ao)
-   [金属色](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E9%87%91%E5%B1%9E%E8%89%B2)
-   [不透明](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E4%B8%8D%E9%80%8F%E6%98%8E)
-   [粗糙度](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E7%B2%97%E7%B3%99%E5%BA%A6)
-   [场景颜色](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E5%9C%BA%E6%99%AF%E9%A2%9C%E8%89%B2)
-   [场景深度](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E5%9C%BA%E6%99%AF%E6%B7%B1%E5%BA%A6)
-   [单独半透明 RGB](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E5%8D%95%E7%8B%AC%E5%8D%8A%E9%80%8F%E6%98%8Ergb)
-   [单独半透明 A](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E5%8D%95%E7%8B%AC%E5%8D%8A%E9%80%8F%E6%98%8Ea)
-   [镜面反射颜色](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E9%95%9C%E9%9D%A2%E5%8F%8D%E5%B0%84%E9%A2%9C%E8%89%B2)
-   [镜面反射](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E9%95%9C%E9%9D%A2%E5%8F%8D%E5%B0%84)
-   [次表面颜色](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E6%AC%A1%E8%A1%A8%E9%9D%A2%E9%A2%9C%E8%89%B2)
-   [全局法线](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E5%85%A8%E5%B1%80%E6%B3%95%E7%BA%BF)
-   [环境光遮蔽](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E7%8E%AF%E5%A2%83%E5%85%89%E9%81%AE%E8%94%BD)
-   [地形可视化器](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E5%9C%B0%E5%BD%A2%E5%8F%AF%E8%A7%86%E5%8C%96%E5%99%A8)
-   [法线](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E6%B3%95%E7%BA%BF)
-   [LOD](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#lod)
-   [层密度](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E5%B1%82%E5%AF%86%E5%BA%A6)
-   [曝光](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E6%9B%9D%E5%85%89)
-   [自动曝光与固定曝光](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine#%E8%87%AA%E5%8A%A8%E6%9B%9D%E5%85%89%E4%B8%8E%E5%9B%BA%E5%AE%9A%E6%9B%9D%E5%85%89)