# 虚幻引擎粒子材质函数 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/particles-material-functions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:26:52.565Z

---

目录

![粒子材质函数](https://dev.epicgames.com/community/api/documentation/image/d876ecc9-b99d-43c0-a171-c1d265643080?resizing_type=fill&width=1920&height=335)

粒子函数用来帮助完成粒子系统的复杂材质生成。

## 粒子函数

以下是"粒子"类别下所有函数的列表。

### 3dParticleOpacity（3D 粒子不透明度）

此函数的用途是帮助设置粒子，以使其在远离摄像机时逐渐消失。

项目

说明

输入

 

**深度纹理（标量）（Depth Texture (Scalar)）**

接收反转的 Z 深度渲染器（在接近摄像机的位置为黑色，而背景为白色值）。请确保在纹理属性窗口中禁用纹理的 SRGB 开关。

深度纹理选项

 

**使用动态或显式的纹理深度设置（静态布尔值）（Use dynamic or explicit texture depth settings (StaticBool)）**

默认设置 (true) 表示使用动态纹理深度。如果使用显式纹理设置 (false)，那么您可准确指定深度纹理所表示的全局单位数。例如，指定 512 个单位将使纹理深度被设为 512 个单位。动态纹理深度选项将使用粒子大小与其深度之间的比率，针对比例不同的粒子调整深度比例。例如，如果比率设置为 1，那么大小为 512 个单位的正方形粒子会将纹理深度设置为 512 个单位。比率值 0.5 将生成 256 个单位的纹理深度。这有助于根据各种粒子大小来正确影响比例。

**动态纹理深度比率（标量）（Dynamic Texture Depth Ratio (Scalar)）**

请输入高度纹理深度与高度纹理宽度的比率（使用 3ds Max 全局单位测量值）。例如，如果您在 3D 应用程序中创建大小为 512x512 的平面，并且从该平面渲染表示距离该平面 256 个单位的高度纹理，那么此数值的计算公式为 256/512，即比率为 0.5。

**显式纹理深度比率（标量）（Explicit Texture Depth Ratio (Scalar)）**

深度纹理的全局空间比例。值 256 将使深度纹理的深度为 256 个单位。

**深度纹理衰减柔和（全局空间）(1/n)（标量）（Depth Texture Falloff Softness (WS)(1/n) (Scalar)）**

以全局空间单位计的距离，对象不透明度在这段距离上逐渐消退。请输入 1 除以所需过渡距离的全局空间单位数。例如，在输入字段中输入 1/16，虚幻引擎会将该数值转换为 0.062500。提前这样做可以从效果中移除一条指令。

摄像机衰减组

 

**使用近摄像机衰减（静态布尔值）（Use Near Camera Falloff (StaticBool)）**

将此项目设置为 *true* 表示让粒子在接近摄像机时衰减。默认值为 *false*。

**近摄像机衰减开始距离（标量）（Near Camera Falloff Start Distance (Scalar)）** -

相对于摄像机的距离（以全局空间单位计），在此距离之外，对象保持透明。

**近摄像机消退距离 (1/n)（标量）（Near Camera Fade Distance (1/n) (Scalar)）**

相对于摄像机的距离，不透明度在此距离处消退为 0。请输入目标距离的倒数。例如，要让粒子在 256 个单位的距离上淡出，请输入 1/256，虚幻引擎会将此值转换为 0.003906。

**在摄像机衰减计算中使用深度（静态布尔值）（Use Depth In Camera Falloff Calculation (StaticBool)）**

使距离较近的像素（根据深度贴图确定）在距离较远的像素之前淡出。默认值为 *false*。

粒子阿尔法通道组

 

**使用粒子阿尔法通道（静态布尔值）（Use Particle Alpha (StaticBool)）**

将结果乘以粒子颜色阿尔法通道。默认值为 *false*。

WPO 组

 

**摄像机偏移（标量）（Camera Offset (Scalar)）**

此值应该与 *纹理深度（Texture Depth）*相同。*纹理深度（Texture Depth）*值用作此输入的默认值。

输出

 

**不透明度（Opacity）**

提供衰减后的最终不透明度计算。

**全局位置偏移（World Position Offset）**

模仿粒子编辑器中的摄像机偏移。

![3dParticleOpacity（3D 粒子不透明度）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3fb9efe-d097-4ed7-b144-503b18835d81/3dparticleopacity.png)

任何以 "--------" 作为前缀的输入无非是输入列表中的分隔符，而不会接收实际输入。

-   [materials](https://dev.epicgames.com/community/search?query=materials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [粒子函数](/documentation/zh-cn/unreal-engine/particles-material-functions-in-unreal-engine#%E7%B2%92%E5%AD%90%E5%87%BD%E6%95%B0)
-   [3dParticleOpacity（3D 粒子不透明度）](/documentation/zh-cn/unreal-engine/particles-material-functions-in-unreal-engine#3dparticleopacity%EF%BC%883d%E7%B2%92%E5%AD%90%E4%B8%8D%E9%80%8F%E6%98%8E%E5%BA%A6%EF%BC%89)