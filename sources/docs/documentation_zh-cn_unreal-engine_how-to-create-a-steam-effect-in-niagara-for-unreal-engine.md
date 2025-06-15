# 如何在虚幻引擎Niagara中创建蒸汽效果 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-create-a-steam-effect-in-niagara-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:32:15.930Z

---

目录

![蒸汽效果](https://dev.epicgames.com/community/api/documentation/image/5951f676-6d68-4874-b619-61f482750cb4?resizing_type=fill&width=1920&height=335)

**准备工作：**

本教程将使用M\_smoke\_subUV材质，它包含在初学者内容包中。如尚未将初学者内容添加到项目，请你务必先添加它。本教程同时使用[在Niagara中创建Sprite粒子效果](/documentation/zh-cn/unreal-engine/how-to-create-a-smoke-effect-using-sprite-particles-in-niagara-for-unreal-engine)教程中创建的FX\_Smoke发射器。

## 创建蒸汽发射器

与在Cascade中不同，Niagara发射器和系统是独立的。当前推荐工作流将从现有发射器或发射器模板创建系统。但是，由于你要复制现有发射器，因此过程会稍有不同。

1.  在项目的 **内容（Content）** 文件夹中，为本教程创建文件夹。
2.  通过[在Niagara中创建Sprite粒子效果](/documentation/zh-cn/unreal-engine/how-to-create-a-beam-effect-in-niagara-for-unreal-engine)进行操作时，找到保存的FX\_Smoke发射器。右键点击发射器，然后选择 **复制发射器（Duplicate Emitter）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19a890ee-85bd-41dd-9d2d-a41929dd8a29/steam_duplicateemitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19a890ee-85bd-41dd-9d2d-a41929dd8a29/steam_duplicateemitter.png)
    
    点击查看大图。
    
3.  将此复制发射器拖放到你在步骤1中创建的文件夹中。在弹出的上下文菜单中，选择 **移动（Move）**。
4.  重命名已复制的发射器 **FX\_Steam**。
    
    ![重命名发射器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f28eada1-a9fb-4b86-abcf-d52cd75f9d58/steam_renameemitter.png "Rename Emitter")
5.  现在，创建蒸汽效果系统。右键点击新蒸汽发射器，然后选择 **创建Niagara系统（Create Niagara System）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6797eeea-369d-4acb-a0ac-2a44de818a73/steam_createsystemfromemitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6797eeea-369d-4acb-a0ac-2a44de818a73/steam_createsystemfromemitter.png)
    
    点击查看大图。
    
    有多种方法可以创建新Niagara系统。由于你是从已创建发射器着手，所以此处使用的方法会快速创建包含该发射器的系统。但是，正如你在创建Sprite粒子效果教程中所见，发射器和系统向导提供了许多创建和设置Niagara系统的其他选项。
    
6.  将系统命名为 **蒸汽（Steam）**。
    
    ![命名系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/514ffdaa-1fcd-4c59-b143-3763f955d102/steam_namesystem.png "Name System")
7.  若尚未打开关卡，请在关卡编辑器中打开。将蒸汽系统拖到关卡中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92cda00b-ec2e-4b0c-8ffb-69c5f6bc0a48/steam_dragsystemintolevel.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92cda00b-ec2e-4b0c-8ffb-69c5f6bc0a48/steam_dragsystemintolevel.png)
    
    点击查看大图。
    
    制作粒子效果时，最好将系统拖到关卡中。这样便可查看每一项更改并在上下文中进行编辑。你对系统所做的任何更改都将自动传播到关卡中的系统实例。
    

## 编辑发射器更新设置

首先，你将在 **发射器更新（Emitter Update）** 组中编辑模块。这些是将应用于发射器本身并更新每一帧的行为。

1.  在 **系统概览（System Overview）** 中，点击 **发射器更新（Emitter Update）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c31736e-5f53-4089-95ad-7e589f5ae2fe/systemoverview_openemitterupdate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c31736e-5f53-4089-95ad-7e589f5ae2fe/systemoverview_openemitterupdate.png)
    
    点击查看大图。
    
2.  展开 **发射器状态（Emitter State）** 模块。此模块控制此发射器的时间和可延展性。由于你使用了简单Sprite迸发模板，因此 **生命周期模式（Life Cycle Mode）** 设置为 **自身（Self）**。通常，该模式用于为此特定发射器完全定制发射器生命周期逻辑，但此效果并不需要它。单击下拉列表，并将 **生命周期模式（Life Cycle Mode）** 设置为 **系统（System）**。此操作将使系统能够计算生命周期设置，而这通常可以优化性能。在默认情况下，系统以5秒的间隔无限循环。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ed88225-8fb9-420c-a89f-cf5885c1c466/steam_setlifecyclemode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ed88225-8fb9-420c-a89f-cf5885c1c466/steam_setlifecyclemode.png)
    
    点击查看大图。
    
3.  打开 **生成速率（Spawn Rate）** 模块。将 **生成速率（Spawn Rate）** 改为 **30**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3994110a-6e5f-4c78-8b3e-7ffd7e97e7f7/steam_spawnratemodule.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3994110a-6e5f-4c78-8b3e-7ffd7e97e7f7/steam_spawnratemodule.png)
    
    点击查看大图。
    

## 编辑粒子生成设置

下一步，你将在 **粒子生成（Particle Spawn）** 组中编辑模块。这些是粒子首次生成时将应用于粒子的行为。

1.  在系统概览（System Overview）中，点击 **粒子生成（Particle Spawn）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a02a16f-34b4-48f5-8ee3-4ff990f0059f/systemoverview_openparticlespawn.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a02a16f-34b4-48f5-8ee3-4ff990f0059f/systemoverview_openparticlespawn.png)
    
    点击查看大图。
    
2.  打开 **初始化粒子（Initialize Particle）** 模块。在 **点属性（Point Attributes）** 下，展开 **生命周期（Lifetime）**。将最小值和最大值改为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5b1feb3-acef-4349-b7aa-3f5799dad115/steam_initparticlelifetime.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5b1feb3-acef-4349-b7aa-3f5799dad115/steam_initparticlelifetime.png)
    
    点击查看大图。
    
    参数
    
    值
    
    **最小值（Minimum）**
    
    3.0
    
    **最大值（Maximum）**
    
    7.0
    
     
    
     
    
3.  展开 **颜色（Color）**。将RGB值改为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2a03144-4bcd-4614-99d0-f952f1cc2191/steam_initparticlecolor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2a03144-4bcd-4614-99d0-f952f1cc2191/steam_initparticlecolor.png)
    
    点击查看大图。
    
    参数
    
    值
    
    **红色（Red）**
    
    1.0
    
    **绿色（Green）**
    
    1.0
    
    **蓝色（Blue）**
    
    1.0
    
     
    
     
    
4.  在 **Sprite属性（Sprite Attributes）** 下，展开 **Sprite大小（Sprite Size）**。将 **最小值(Minimum)** 和 **最大值(Maximum)** 改为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85a76ec9-d317-470d-99fc-3ead739a3129/steam_initparticlespritesize.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85a76ec9-d317-470d-99fc-3ead739a3129/steam_initparticlespritesize.png)
    
    点击查看大图。
    
    参数
    
    值
    
    **最小值（Minimum）**
    
    100
    
    **最大值（Maximum）**
    
    200
    
     
    
     
    
5.  打开 **添加速度（Add Velocity）** 模块。将 **最小值(Minimum)** 和 **最大值(Maximum)** 改为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0824ec91-c987-43da-8bea-6914f2e0c664/steam_addvelocitymodule.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0824ec91-c987-43da-8bea-6914f2e0c664/steam_addvelocitymodule.png)
    
    点击查看大图。
    
    参数
    
    值
    
    **最小值（Minimum）**
    
    X：16，Y：-5.0，Z：35
    
    **最大值（Maximum）**
    
    X：32，Y：5.0，Z：50
    
     
    
     
    
6.  打开 **球体位置（Sphere Location）** 模块。将 **球体半径（Sphere Radius）** 值改为 **20**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b57708c2-55f4-45b7-ae83-c9cc9c3748fc/steam_spherelocationmodule.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b57708c2-55f4-45b7-ae83-c9cc9c3748fc/steam_spherelocationmodule.png)
    
    点击查看大图。
    

## 编辑粒子更新设置

现在，你将在 **粒子更新（Particle Update）** 组中编辑模块。此类行为将应用于粒子并更新每个帧。

1.  在系统概览（System Overview）中，点击 **粒子更新（Particle Update）** 组以在 **选择(Selection)** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0bfe8fa-02f5-4a0f-8510-e7018324d38b/systemoverview_openparticleupdate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0bfe8fa-02f5-4a0f-8510-e7018324d38b/systemoverview_openparticleupdate.png)
    
    点击查看大图。
    
2.  打开 **加速力（Acceleration Force）** 模块。将 **最小值** 和 **最大值** 设为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f5c2a77-1be7-48c0-827b-cf31f9cbb392/steam_accelerationforcemodule.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f5c2a77-1be7-48c0-827b-cf31f9cbb392/steam_accelerationforcemodule.png)
    
    点击查看大图。
    
    参数
    
    值
    
    **最小值（Minimum）**
    
    X：25，Y：-10.0，Z：15
    
    **最大值（Maximum）**
    
    X：55，Y：10.0，Z:25
    
     
    
     
    
3.  打开 **缩放颜色（Scale Color）** 模块。通过右键点击 **缩放透明度（Scale Alpha）** 曲线并选择 **将键添加到曲线（Add Key to Curve）** 来向该曲线添加另外三个键。因此总共有五个键。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98245f83-882c-43b6-818d-dd129b620554/steam_addkeytocurve.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98245f83-882c-43b6-818d-dd129b620554/steam_addkeytocurve.png)
    
    点击查看大图。
    
4.  从左开始，将五个键分别设为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d2c1d8a-3f57-4e1b-b211-b5187c07ab32/steam_scalecolormodule.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d2c1d8a-3f57-4e1b-b211-b5187c07ab32/steam_scalecolormodule.png)
    
    点击查看大图。
    
    键编号
    
    时间
    
    值
    
    **1**
    
    0.0
    
    0.0
    
    **2**
    
    .16
    
    .84
    
    **3**
    
    .32
    
    .68
    
    **4**
    
    .76
    
    .11
    
    **5**
    
    1.0
    
    0.0
    
     
    
     
    
     
    
5.  点击 **粒子更新（Particle Update）** 组中的 **加号** (**+**)，然后选择 **力（Forces）> 阻力（Drag）** 以添加 **阻力（Drag）** 模块。将 **阻力（Drag）** 设为 **8**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/400832ca-524d-4dd9-838d-503c5948272a/steam_adddragmodule.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/400832ca-524d-4dd9-838d-503c5948272a/steam_adddragmodule.png)
    
    点击查看大图。
    
6.  由于Niagara将新模块添加到组堆栈底部，因此你会收到一条显示"模块有未满足的依赖关系（The module has unmet dependencies）"的错误消息。这是因为 **阻力（Drag）** 模块放置在 **解算力和速度（Solve Forces and Velocity）** 模块之后。单击 **修复问题（Fix Issue）** 按钮，以移动模块并解决错误。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91cf50e6-1518-432f-99de-7e8ddc584fc8/steam_dragfixissue.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91cf50e6-1518-432f-99de-7e8ddc584fc8/steam_dragfixissue.png)
    
    点击查看大图。
    
7.  将 **阻力（Drag）** 设置为 **.8**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79290d9d-6c2c-4732-8c92-5941e59db4e8/steam_dragmodule.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79290d9d-6c2c-4732-8c92-5941e59db4e8/steam_dragmodule.png)
    
    点击查看大图。
    

## 最终结果

完成上述步骤后，Steam系统将在关卡中产生类似下图的蒸汽效果。

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建蒸汽发射器](/documentation/zh-cn/unreal-engine/how-to-create-a-steam-effect-in-niagara-for-unreal-engine#%E5%88%9B%E5%BB%BA%E8%92%B8%E6%B1%BD%E5%8F%91%E5%B0%84%E5%99%A8)
-   [编辑发射器更新设置](/documentation/zh-cn/unreal-engine/how-to-create-a-steam-effect-in-niagara-for-unreal-engine#%E7%BC%96%E8%BE%91%E5%8F%91%E5%B0%84%E5%99%A8%E6%9B%B4%E6%96%B0%E8%AE%BE%E7%BD%AE)
-   [编辑粒子生成设置](/documentation/zh-cn/unreal-engine/how-to-create-a-steam-effect-in-niagara-for-unreal-engine#%E7%BC%96%E8%BE%91%E7%B2%92%E5%AD%90%E7%94%9F%E6%88%90%E8%AE%BE%E7%BD%AE)
-   [编辑粒子更新设置](/documentation/zh-cn/unreal-engine/how-to-create-a-steam-effect-in-niagara-for-unreal-engine#%E7%BC%96%E8%BE%91%E7%B2%92%E5%AD%90%E6%9B%B4%E6%96%B0%E8%AE%BE%E7%BD%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/how-to-create-a-steam-effect-in-niagara-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)