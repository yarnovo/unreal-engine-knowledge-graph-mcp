# 虚幻引擎纹理材质函数 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:27:16.586Z

---

目录

![纹理材质函数](https://dev.epicgames.com/community/api/documentation/image/032e58b9-0a8d-4310-8fbd-60465061e62a?resizing_type=fill&width=1920&height=335)

纹理处理函数用于对基于纹理的操作进行特殊处理，例如调整纹理的 UV 以及裁切纹理等等。以下是 **纹理函数** 列表。

## CylindricalUVs

此函数使用以对象中心居中的圆柱形投射 UV 来围绕对象平铺纹理。

输入

说明

**纹理对象（纹理对象）（TextureObject (Texture Object)）**

要通过圆柱形 UV 来投射的纹理。

**输入（标量）（In (Scalar)）**

接收投射圆柱体的高度（以全局空间单位计）。

**法线（矢量 3）**

输入一个矢量，以使投射圆柱体旋转。

输出

 

**圆柱体投射（Cylinder Projection）**

输出所产生的纹理，就像它是从某个圆柱体投射一样。但是，没有底面，因此纹理会在顶部和底部箍缩。

**圆柱体带顶部投射（Cylinder Projection w Top）**

输出所产生的纹理，就像它是从某个圆柱体投射一样，并以底面补全。

![CylindricalUVs（圆柱形 UV）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b005e1fd-5d00-4603-b70b-0aefd736a32a/cylindricaluvs_demo.png)

## DetailTexturing

DetailTexturing（细节纹理处理）函数用于简化为材质创建细节纹理的过程。细节纹理处理通过引入叠加在对象原始漫射及法线纹理上的更高度重复漫射及法线纹理组合，使纹理产生更加细腻的错觉。这可以在近距离查看时产生更加细腻的效果错觉。

输入

说明

**比例（标量）（Scale (Scalar)）**

控制细节法线及漫射纹理的平铺。

**漫射（矢量 3）（Diffuse (Vector3)）**

需要更多细节的原始漫射纹理。

**细节漫射（纹理对象）（DetailDiffuse (Texture Object)）**

添加的细节的漫射纹理。

**漫射强度（标量）（DiffuseIntensity (Scalar)）**

要混合到原始漫射中的细节漫射量。

**法线（矢量 3）（Normal (Vector3)）**

需要更多细节的原始法线纹理。

**细节法线（纹理对象）（DetailNormal (Texture Object)）**

用来向原始法线贴图添加更多细节的细节法线纹理。

**法线强度（标量）（NormalIntensity (Scalar)）**

透过原始法线纹理显示的细节法线纹理量。

输出

 

**漫射（Diffuse）**

原始漫射纹理与细节漫射纹理混合后的结果。

**法线（Normal）**

原始法线纹理与细节法线纹理混合后的结果。

![DetailTexturing（细节纹理处理）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/168743e0-ef75-4ac2-be28-95cc972a8493/detail-texturing-function.png)

## LocalAlignedTexture

LocalAlignedTexture（局部一致纹理）函数在局部空间中的对象上平铺纹理。

虽然此函数有法线输入，但目前这个输入不起作用。

输入

说明

**法线（矢量 3）（Normal (Vector3)）**

接收法线，以用作对象的表面参考。目前，这个输入不起作用。

**纹理对象（纹理对象）（TextureObject (Texture Object)）**

接收要在全局空间中平铺的纹理。

输出

 

**XY 纹理（XY Texture）**

按全局 X 和 Y 坐标来平铺纹理的结果。

**XYZ 纹理（XYZ Texture）**

按全局 X、Y 和 Z 坐标来平铺纹理的结果。

**Z 纹理（Z Texture）**

按全局 Z 坐标来平铺纹理的结果。

![LocalAlignedTexture（局部一致纹理）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bedc5b4b-32de-4b32-b64c-d816f736d5ca/localalignedtexture_demo.png)

## ZWorldSpaceFlow

ZWorldSpaceFlow（Z 全局空间流动）函数沿对象的切线空间来推送纹理，这会导致该纹理看起来像是沿该表面"流动"。其工作方式如下：建立纹理在同一方向上平移所产生的两个变体，但这两个变体之间存在轻微的偏移。然后，以重复方式将各个变体叠加混合。

输入

说明

**流动纹理（纹理对象）（FlowTexture (Texture Object)）**

这是要沿对象表面流动的纹理。

**流动强度（标量）（FlowStrength (Scalar)）**

控制纹理的两个平移版本彼此混合时发生的混合量。微调此值可控制发生混合的表面区域。

**流动方向（矢量 2）（FlowDirection (Vector2)）**

这是一个 2D 矢量，用于控制纹理的流动方向。

**UV（矢量 2）（UVs (Vector2)）**

纹理的任何现有 UV，用于控制平铺。

**流速（标量）（FlowSpeed (Scalar)）**

纹理在表面上的流动速度。

## TextureCropping

TextureCropping（纹理裁切）函数用于将给定的纹理裁切为纹理坐标平面上更小的偏移位置。此函数适合用来将一个颜色块放到自发光纹理区域上。

此函数并不会实际执行真实的裁切操作，例如 Photoshop 等图像编辑软件包中使用的裁切操作。而是，此函数将现有纹理重新映射到 UV 纹理空间中的新坐标，这更像是比例调整，而非裁切。但是，此函数仍然非常适合用来生成蒙版以及向纹理区域添加颜色。

输入

说明

**UV（矢量 2）（UVs (Vector2)）**

在新裁切的纹理上使用的纹理坐标。

**输入纹理（纹理对象）（TextureIn (Texture Object)）**

要裁切的纹理。

**左上角（矢量 2）（UpperLeftCorner (Vector2)）**

纹理的新左上角的位置（在 0-1 纹理空间内）。

**右下角（矢量 2）（LowerRightCorner (Vector2)）**

纹理的新右下角的位置（在 0-1 纹理空间内）。

输出

 

**已裁切（Cropped）**

裁切函数的结果。这与平铺操作非常相似。

**已裁切及屏蔽（CroppedMasked）**

提供裁切函数的结果，但同时遮蔽（屏蔽）*UpperLeftCorner（左上角）*和 *LowerRightCorner（右下角）*所定义区域外部的区域。

**裁切 UV（Crop UVs）**

新裁切的区域的 UV 坐标。

**裁切蒙版（Crop Mask）**

黑色背景（蒙版）上的白色区域，用于表示要裁切的区域。

![TextureCropping（纹理裁切）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fe41b33-9796-48a7-b02e-920811beff25/texture-cropping.png)

## WorldAlignedNormal

WorldAlignedNormal（全局一致法线）接收法线贴图，并使其纹理与全局空间一致，而不是与对象局部一致。它还支持按全局单位进行比例调整，而不是按纹理大小的百分比进行调整。

因为此函数在全局空间内平铺纹理，所以需要注意，任何以此方式处理纹理的动画对象都会发生纹理"漂浮"，即纹理保持原位置不动，而对象在其下方滑动。

输入

说明

**纹理对象（纹理对象）（TextureObject (Texture Object)）**

接收要在全局空间中平铺的纹理。

**纹理大小（矢量 3）（TextureSize (Vector3)）**

纹理大小，以 X、Y 和 Z 轴上的全局单位计。

**法线（矢量 3）（Normal (Vector3)）**

允许您指定全局空间的上方向轴的法线方向，从而旋转此函数所使用的坐标。默认值为 0,0,1，即，上方向 Z。

**全局位置（矢量 3）（WorldPosition (Vector3)）**

提供 3D 全局空间中纹理的开始点偏移。

输出

 

**XY 纹理（XY Texture）**

在全局 X 和 Y 方向上投射纹理的结果。

**XYZ 纹理（XYZ Texture）**

在全局 X、Y 和 Z 方向上投射纹理的结果。

**XYZ 平顶（XYZFlatTop）**

在全局 X、Y 和 Z 方向上投射纹理并提升对比度的结果。

**Z 纹理（Z Texture）**

在全局 Z 方向上投射纹理的结果。

![WorldAlignedNormal（全局一致法线）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9af8949-8da7-4892-8568-a65cc6d8b6a9/world-aligned-normal.png)

请注意，尽管地面已旋转，但纹理仍与全局坐标一致。

## WorldAlignedTexture

WorldAlignedTexture（全局一致纹理）函数用于在全局空间中的对象表面上平铺纹理，此平铺与该对象的大小或旋转无关。此函数允许您指定投射纹理的方向，并按全局单位（而非纹理大小的百分比）进行比例调整。

因为此函数在全局空间内平铺纹理，所以需要注意，任何以此方式处理纹理的动画对象都会发生纹理"漂浮"，即纹理保持原位置不动，而对象在其下方滑动。

输入

说明

**纹理对象（纹理对象）（TextureObject (Texture Object)）**

接收要在全局空间中平铺的纹理。

**纹理大小（矢量 3）（TextureSize (Vector3)）**

纹理大小，以 X、Y 和 Z 轴上的全局单位计。

**全局位置（矢量 3）（WorldPosition (Vector3)）**

提供 3D 全局空间中纹理的开始点偏移。

**导出浮点 4（静态布尔值）（ExportFloat 4 (StaticBool)）**

是否利用传入纹理的阿尔法通道。默认值为 *false*。

**全局空间法线（矢量 3）（World Space Normal (Vector3)）**

允许您指定全局空间的上方向轴的法线方向，从而旋转此函数所使用的坐标。默认值为 0,0,1，即，上方向 Z。

**投射过渡对比度（矢量 3）（ProjectionTansitionContrast (Vector3)）**

在 X、Y 和 Z 方向上投射时，此值控制两个投射平面相交时产生的混合对比度。

输出

 

**XY 纹理（XY Texture）**

在全局 X 和 Y 方向上投射纹理的结果。

**Z 纹理（Z Texture）**

在全局 Z 方向上投射纹理的结果。

**XYZ 纹理（XYZ Texture）**

在全局 X、Y 和 Z 方向上投射纹理的结果。

![WorldAlignedTexture（全局一致纹理）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92f348c9-ca08-41e5-bdfb-7e7e693f11b7/world-aligned-texture.png)

请注意，尽管地面已旋转，但纹理仍与全局坐标一致。

## 3DSandMayaUVCoordinates

此函数翻转传入 UV 的绿色通道，以将 0,0 坐标放在左下角（就像在 3DS Max 和 Maya 中一样）而非左上角。这对于来自这些应用程序的模型非常重要，因为您可以避免翻转纹理。

项目

说明

输入

 

-   **UV 通道 0（UVChannel0）** - 来自 UV 通道 0 且 V 翻转的 UV。
    
-   **UV 通道 1（UVChannel1）** - 来自 UV 通道 1 且 V 翻转的 UV。
    
-   **UV 通道 2（UVChannel2）** - 来自 UV 通道 2 且 V 翻转的 UV。
    
-   **UV 通道 3（UVChannel3）** - 来自 UV 通道 3 且 V 翻转的 UV。
    

![3DSandMayaUVCoordinates（3D 沙 Maya UV 坐标）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e669696a-7623-4f7c-b4b0-c7763f723374/3dsandmayauvcoordinates_demo.png)

## CustomRotator

CustomRotator（定制旋转）函数允许您旋转纹理。但是，它与基本的 Rotator（旋转）表达式节点的区别在于，它会公开图像的旋转中心点。它还将旋转系统更改为基于 0-1，因此值 1 被视为全程旋转，即旋转 360 度。在标准的 Rotator（旋转）上，全程旋转需要大约 25.1 的"时间"（Time）输入。

输入

说明

**UV（矢量 2）（UVs (Vector2)）**

接收纹理的现有坐标。

**旋转中心（矢量 2）（Rotation Center (Vector2)）**

纹理空间 0-1 中用作旋转中心的位置。

**旋转角度 (0-1)（标量）（Rotation Angle (0-1) (Scalar)）**

0-1 格式的图像旋转，其中，1 表示全程旋转。

![CustomRotator（定制旋转）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3c48c1a-c4e8-4001-b0f9-9a54e328daa1/custom-rotator.png)

在下方视频中，请注意材质图表中的 **旋转中心（Rotation Center）** 发生变化时，旋转角度是如何变化的。

## HeightLerp

HeightLerp（高度插值）函数允许您根据高度贴图和过渡阶段值，在 2 个纹理之间执行线性插值。这允许您沿着发生插值的高度贴图来调整值。

输入

说明

**A（矢量 3）（A (Vector3)）**

用于插值计算的第一个纹理。

**B（矢量 3）（B (Vector3)）**

用于插值计算的第二个纹理。

**过渡阶段（标量）（Transition Phase (Scalar)）**

此值定义发生过渡的高度贴图范围。保留此值为 0.5 表示执行标准插值，而将值调整为接近 0 和 1 将分别朝向高度贴图底部或顶部发生偏移。

**高度贴图（标量）（Height Texture (Scalar)）**

用于插值操作的高度贴图。

**对比度（标量）（Contrast (Scalar)）**

使用 CheapContrast（低成本对比度）函数对高度贴图应用对比度提升。

输出

 

**结果（Results）**

HeightLerp（高度插值）函数的混合结果。

**阿尔法（Alpha）**

在插值中使用的阿尔法值（已提升对比度）。

**无对比度插值阿尔法（Lerp Alpha No Contrast）**

在插值中使用的阿尔法值（未提升对比度）。

![HeightLerp（高度插值）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e257ac07-546d-4dd1-b166-c01f43035e82/height-lerp.png)

## CameraWorldBlend

3 个主要全局矢量的输出衰减结果（基于摄像机角度）。可用来根据摄像机的观看方向在纹理之间进行混合。

此函数仍在开发中，可能无法提供预期的结果。

输入

说明

**混合幂（标量）（Blend Power (Scalar)）**

两个纹理之间的混合比率。

**使用反射矢量（静态布尔值）（Use Reflection Vector (StaticBool)）**

如果为 *true*，那么将使用 ReflectionVector（反射矢量）而非 CameraVector（摄像机矢量）（材质的"法线"（Normal）输入将影响结果）。默认值为 *false*。但是，目前没有此开关的 false 输入数据，因此将其保持设置为 *false* 不会产生任何结果。

**使用可平滑法线（静态布尔值）（Use Smoothable Normals (StaticBool)）**

如果为 *true*，那么将使用 ReflectionVector（反射矢量）而非 CameraVector（摄像机矢量）（材质的"法线"（Normal）输入将影响结果）。默认值为 *false*。但是，目前没有此开关的 false 输入数据，因此将其保持设置为 *false* 不会产生任何结果。

**平滑反射百分比（标量）（Smooth Reflection Percentage (Scalar)）**

在混合前对应用于表面的法线进行平滑的程度。

输出

 

**XY True**

当表面与 XY 平面对齐时朝向白色混合的衰减结果。

**XZ True**

当表面与 XZ 平面对齐时朝向白色混合的衰减结果。

**YZ True**

当表面与 YZ 平面对齐时朝向白色混合的衰减结果。

![CameraWorldBlend（摄像机全局混合）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3f9f960-441e-43cc-a446-81701f1ee980/camera-world-blend.png)

请注意，在表面与 XY 平面对齐的所有位置都会混入绿色纹理，而在其他位置都会混入红色。

## LocalSpaceSurfaceMirroring

LocalSpaceSurfaceMirroring（局部空间表面镜像）函数将镜像应用于表面上所有朝向给定局部轴的面。表面区域上的其他区域将被屏蔽。这些蒙版可通过一个标量输入进行偏移，而整个计算可由法线贴图扰乱。这在您需要根据表面的拓扑来产生镜像时非常有用。

输入

说明

**使用法线贴图（静态布尔值）（Use NormalMap (StaticBool)）**

设置应用法线贴图后是否计算表面的方向。

**法线贴图（矢量 3）（Normal Map (Vector 3)）**

接收一个法线贴图，用于在计算局部拓扑之前扰乱对象的表面。

**输入（标量）（In (Scalar)）**

这是一个偏移值，用于移动所产生的蒙版。

输出

 

**局部 X（Local X）**

输出屏蔽后的镜像效果，此效果只影响朝向局部 X 轴的表面。

**局部 Y（Local Y）**

输出屏蔽后的镜像效果，此效果只影响朝向局部 Y 轴的表面。

**局部 Z（Local Z）**

输出屏蔽后的镜像效果，此效果只影响朝向局部 Z 轴的表面。

## SubUV\_Function

SubUV\_Function（子 Uv\_函数）适合于处理精灵表或纹理上具有多帧的动画。此函数接收一个纹理对象，并可根据输出来显示该纹理上各个帧的混合帧动画。

输入

说明

**纹理（纹理对象）**

传入的精灵表纹理。

**UV（矢量 2）（UVs (Vector2)）**

纹理的 UV 坐标（以备需要执行平铺）。

**子图像（矢量 2）（SubImages (Vector2)）**

纹理上的帧数（水平及垂直）。

**帧（标量）（Frame (Scalar)）**

动画的当前帧。此值基于零，并且将根据小数值进行混合。例如，值 2.35 将在第三个与第四个帧之间产生 35% 的混合。

![SubUV_Function（子 UV_函数）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a45b0a6-cb78-4972-90bf-3f938717de4b/sub-uv-function.png)

## TwoSidedTexturing

TwoSidedTexturing（双面纹理处理）函数为双面材质的两个面分别提供材质输入。如果材质的 *双面（Two Sided）*属性未激活，那么此函数不执行任何操作。

输入

说明

**纹理 A 面（矢量 3）（Texture Side A (Vector3)）**

在多边形的正面（外部）使用的纹理。

**纹理 B 面（矢量 3）（Texture Side B (Vector3)）**

在多边形的反面（内部）使用的纹理。

**使用表面法线（静态布尔值）（Use Surface Normals (StaticBool)）**

向着色器指出是否应使用传入的法线贴图来帮助计算网格的正面和反面。

 ![平面的每一面都添加了不同的纹理。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d35eaa47-66e8-442e-9a17-57e4e27f4329/two-sided-01.png) ![平面的每一面都添加了不同的纹理。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b7f54e7-0665-48ca-b8b5-034172e28b31/two-sided-02.png)

**平面的每一面都添加了不同的纹理。**

## WorldCoordinate3Way

WorldCoordinate3Way（全局坐标三向）函数按全局坐标将纹理投射到对象表面。用户可控制多个纹理在边缘处进行混合的方式，并可添加法线贴图以便在计算前扰乱表面。

因为这些纹理按全局坐标进行投射，所以给定对象的任何运动或旋转都会导致纹理"漂浮"在表面上。

输入

说明

**XY 纹理（纹理对象）（XY Texture (Texture Object)）**

要投射到 XY 平面的纹理。

**YZ 纹理（纹理对象）（YZ Texture (Texture Object)）**

要投射到 YZ 平面的纹理。

**XZ 纹理（纹理对象）（XZ Texture (Texture Object)）**

要投射到 XZ 平面的纹理。

**XY 比例（标量）（XY Scale (Scalar)）**

针对要投射到 XY 平面的纹理应用的比例调整。

**YZ 比例（标量）（YZ Scale (Scalar)）**

针对要投射到 YZ 平面的纹理应用的比例调整。

**XZ 比例（标量）（XZ Scale (Scalar)）**

针对要投射到 XZ 平面的纹理应用的比例调整。

**混合指数 Y Z（标量）（Blend Exponent Y Z (Scalar)）**

控制沿 Y 和 Z 投射的纹理之间的过渡比率。

**混合乘 Y Z（标量）（Blend Mult Y Z (Scalar)）**

使面之间的混合倍增。

**混合指数 X（标量）（Blend Exponent X (Scalar)）**

控制沿 X 投射的纹理之间的过渡比率。

**混合乘 X（标量）（Blend Mult X (Scalar)）**

使面之间的混合倍增。

**单个纹理（静态布尔值）（Single Texture (StaticBool)）**

设置为 *true* 时，将仅使用应用于 *XY 纹理（XY Texture）*输入的纹理，并将其投射到全部三个面。

**法线（矢量 3）（Normal (Vector3)）**

接收一个法线贴图用于混合计算（使用此贴图来确定表面所面对的方向）。

**全局位置（矢量 3）（WorldPosition (Vector3)）**

这个可选的输出用于使投射中心的位置产生偏移。

输出

 

**XYZ 输出（XYZ Output）**

输出全部三个纹理，这些纹理从相应平面投射并在边缘处混合。

**XY**

仅输出沿 XY 平面投射的纹理。

**XZ**

仅输出沿 XZ 平面投射的纹理。

**YZ**

仅输出沿 YZ 平面投射的纹理。

![WorldCoordinate3Way（全局坐标三向）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d2f7627-ae4e-4fbc-a102-bcc1b74fefc7/world-coordinate-3way.png)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [CylindricalUVs](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#cylindricaluvs)
-   [DetailTexturing](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#detailtexturing)
-   [LocalAlignedTexture](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#localalignedtexture)
-   [ZWorldSpaceFlow](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#zworldspaceflow)
-   [TextureCropping](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#texturecropping)
-   [WorldAlignedNormal](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#worldalignednormal)
-   [WorldAlignedTexture](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#worldalignedtexture)
-   [3DSandMayaUVCoordinates](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#3dsandmayauvcoordinates)
-   [CustomRotator](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#customrotator)
-   [HeightLerp](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#heightlerp)
-   [CameraWorldBlend](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#cameraworldblend)
-   [LocalSpaceSurfaceMirroring](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#localspacesurfacemirroring)
-   [SubUV\_Function](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#subuv-function)
-   [TwoSidedTexturing](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#twosidedtexturing)
-   [WorldCoordinate3Way](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine#worldcoordinate3way)