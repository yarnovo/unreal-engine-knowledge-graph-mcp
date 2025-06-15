# 如何在虚幻引擎Niagara中创建火花效果 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:32:14.004Z

---

目录

![火花效果](https://dev.epicgames.com/community/api/documentation/image/862b5bc9-6eec-4018-831e-f307433b13b1?resizing_type=fill&width=1920&height=335)

**先决条件步骤：**

本教程将使用 **M\_smoke\_subUV**、**M\_Spark** 和 **M\_Radial\_Gradient**材质，它们包含在初学者内容包中。如你尚未将初学者内容添加到项目，请务必进行添加。本教程同时使用[在Niagara中创建Sprite粒子效果](/documentation/zh-cn/unreal-engine/how-to-create-a-smoke-effect-using-sprite-particles-in-niagara-for-unreal-engine)教程中创建的FX\_Smoke发射器。

若要重新创建初学者内容包中包含的火花效果，你需要制作三个Niagara发射器：一个用于火花喷泉，一个用于中心火花，一个用于火花喷泉中冒出的一小股烟雾。因为你可以使用现有发射器的副本创建烟雾发射器，所以你将从该烟雾发射器开始操作。

最终效果如下图所示。

![火花效果最终结果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5fd1219-8393-4b07-b3d4-43175016c8c3/sparks-final.gif)

因为你可以使用现有发射器的副本创建烟雾发射器，所以你将从该烟雾发射器开始操作。

## 创建烟雾发射器和火花系统

Niagara发射器和系统是独立的。当前推荐工作流将从现有发射器或发射器模板创建系统。

1.  在项目的内容文件夹中，为本教程创建新文件夹。
    
2.  复制[在Niagara中创建Sprite粒子效果](/documentation/zh-cn/unreal-engine/how-to-create-a-smoke-effect-using-sprite-particles-in-niagara-for-unreal-engine)教程中创建的 **FX\_Smoke** 发射器。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/701665ed-008e-400f-a276-235bd739826c/01-duplicate-smoke-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/701665ed-008e-400f-a276-235bd739826c/01-duplicate-smoke-emitter.png)
    
    点击查看大图。
    
3.  将此复制发射器拖放到你在步骤1中创建的文件夹中。在弹出的上下文菜单中，选择 **移动（Move）**。
    
4.  将复制的发射器重命名为 **FX\_Sparks\_Smoke**。
    
    ![重命名发射器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/548c349b-4eba-4d72-9245-651d4973e39e/02-rename-smoke-emitter.png)
5.  现在，创建火花效果系统。右键点击新烟雾发射器，然后选择 **创建Niagara系统（Create Niagara System）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1a0cffd-9a0c-4300-88e1-0010bed8a4d3/03-create-niagara-system.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1a0cffd-9a0c-4300-88e1-0010bed8a4d3/03-create-niagara-system.png)
    
    点击查看大图。
    
    有多种方法可以创建新Niagara系统。由于你是从已创建发射器着手，所以此处使用的方法会快速创建包含该发射器的系统。但是，正如你在创建Sprite粒子效果教程中所见，发射器和系统向导提供了许多创建和设置Niagara系统的其他选项。
    
6.  将系统命名为 **SparksSystem**。
    
    ![命名系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fee41f37-8052-48f3-af1e-7fab2ace07d8/04-rename-system.png "Name System")
7.  若尚未打开关卡，请在关卡编辑器中打开。将 **SparksSystem** 从 **内容抽屉（Content Drawer）** 中拖到关卡中。
    
    制作粒子效果时，最好将系统拖到关卡中。这样便可查看每一项更改并在上下文中进行编辑。你对系统所做的任何更改都将自动传播到关卡中的系统实例。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18747033-156f-4992-ae04-6d3789c3dc05/05-drag-system-into-scene.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18747033-156f-4992-ae04-6d3789c3dc05/05-drag-system-into-scene.png)
    
    点击查看大图。
    

### 烟雾发射器 - 编辑发射器更新设置

1.  在系统概览（System Overview）中，点击 **粒子更新（Particle Update）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b32c6fba-4b77-4f51-bdbb-c360b3b5876c/06-smoke-select-emitter-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b32c6fba-4b77-4f51-bdbb-c360b3b5876c/06-smoke-select-emitter-update-group.png)
    
    点击查看大图。
    
2.  打开 **发射器状态（Emitter State）** 模块。此模块控制此发射器的时间和可延展性。点击下拉列表，并将 **生命周期模式（Life Cycle Mode）** 设置为 **系统（System）**。此操作将使系统能够计算生命周期设置，而这通常可以优化性能。在默认情况下，系统以5秒的间隔无限循环。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70739165-269d-404e-896c-d35c09e2f08a/07-smoke-set-life-cycle-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70739165-269d-404e-896c-d35c09e2f08a/07-smoke-set-life-cycle-mode.png)
    
    点击查看大图。
    
3.  打开 **生成率（Spawn Rate）** 模块。将 **生成率（Spawn Rate）** 改为 **20**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63443ecc-7ec4-484e-bc0a-67392da07421/08-smoke-set-spawn-rate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63443ecc-7ec4-484e-bc0a-67392da07421/08-smoke-set-spawn-rate.png)
    
    点击查看大图。
    

### 烟雾发射器 - 编辑粒子生成设置

下一步，你将编辑粒子生成组中的模块。这些是粒子首次生成时将应用于粒子的行为。

1.  在 **系统概览（System Overview）** 中，点击 **粒子生成（Particle Spawn）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/699bc476-454b-4969-bf88-2207744e44d8/09-smoke-select-particle-spawn-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/699bc476-454b-4969-bf88-2207744e44d8/09-smoke-select-particle-spawn-group.png)
    
    点击查看大图。
    
2.  打开 **初始化粒子（Initialize Particle）** 模块。在 **点属性（Point Attributes）** 下，展开 **生命周期（Lifetime）**。将 **最小值（Minimum）** 和 **最大值（Maximum）** 改为下列值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5888afec-07d9-4c0c-8b74-4489e767e8b8/10-smoke-set-lifetime.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5888afec-07d9-4c0c-8b74-4489e767e8b8/10-smoke-set-lifetime.png)
    
    点击查看大图。
    
      
    
    参数
    
    值
    
    **生命周期模式（Lifetime Mode）**
    
    随机
    
    **最小值（Minimum）**
    
    2.0
    
    **最大值（Maximum）**
    
    3.0
    
3.  找到 **颜色（Color）** 参数。将RGB值改为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d30aaf9b-23ec-4f7f-bd16-0a547af2fd76/11-smoke-set-color.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d30aaf9b-23ec-4f7f-bd16-0a547af2fd76/11-smoke-set-color.png)
    
    点击查看大图。
    
      
    
    参数
    
    值
    
    **红色（Red）**
    
    0.3
    
    **绿色（Green）**
    
    0.3
    
    **蓝色（Blue）**
    
    0.3
    
4.  在 **Sprite属性（Sprite Attributes）** 下，展开 **Sprite大小（Sprite Size）**。将"Sprite大小模式（Sprite Size Mode）"设置为 **非统一（Non-Uniform）**。将 **最小值（Minimum）** 和 **最大值（Maximum）** 改为下列值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c588a5db-f663-4037-a5fe-538e9a010101/12-smoke-set-sprite-size.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c588a5db-f663-4037-a5fe-538e9a010101/12-smoke-set-sprite-size.png)
    
    点击查看大图。
    
    参数
    
    值
    
    **Sprite大小模式（Sprite Size Mode）**
    
    随机 一致
    
    **最小值（Minimum）**
    
    20.0
    
    **最大值（Maximum）**
    
    40.0
    
5.  打开 **添加速度（Add Velocity）** 模块。将速度（Velocity）的 **最小值（Minimum）** 和 **最大值（Maximum）** 改为下列值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c62df64b-459f-48a1-9f04-e9d34db4bb45/13-smoke-set-velocity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c62df64b-459f-48a1-9f04-e9d34db4bb45/13-smoke-set-velocity.png)
    
    点击查看大图。
    
    参数
    
    值
    
    **最小值（Minimum）**
    
    X：0，Y：0，Z：25
    
    **最大值（Maximum）**
    
    X：1，Y：1，Z：35
    
     
    
     
    
6.  打开 **形状位置（Shape Location）** 模块。将 **球体半径（Sphere Radius）** 值改为 **5**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42f51a6d-a036-455f-a153-976d9999bab2/14-smoke-set-shape-location-radius.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42f51a6d-a036-455f-a153-976d9999bab2/14-smoke-set-shape-location-radius.png)
    
    点击查看大图。
    

### 烟雾发射器 - 编辑粒子更新设置

现在，你将在粒子更新组中更新模块。这些行为将应用于发射器的粒子并更新每一帧。

1.  在 **系统概览（System Overview）** 中，点击 **粒子更新（Particle Update）** 组以在 **选择（Selection）**面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4254d97d-4a40-47c4-a6a2-a5799861d896/15-smoke-select-particle-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4254d97d-4a40-47c4-a6a2-a5799861d896/15-smoke-select-particle-update-group.png)
    
    点击查看大图。
    
2.  打开 **缩放颜色（Scale Color）** 模块。点击取消选中 **缩放RGB（Scale RGB）** 旁的框。在 **缩放透明度（Scale Alpha）** 曲线上方，点击 **Smooth Ramp Down（平顺下调）** 模板来将形状应用到曲线上。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2d7877e-c6ea-4811-9eec-e20cd1e0fc21/16-smoke-set-scale-color.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2d7877e-c6ea-4811-9eec-e20cd1e0fc21/16-smoke-set-scale-color.png)
    
    点击查看大图。
    
3.  打开 **加速力（Acceleration Force）** 模块。将 **加速（Acceleration ）** 值设为 **X：0，Y：0，Z：20**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c5d0ac4-8d05-4ab9-ae82-a1e6944b7f1e/17-smoke-set-acceleration.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c5d0ac4-8d05-4ab9-ae82-a1e6944b7f1e/17-smoke-set-acceleration.png)
    
    点击查看大图。
    

到目前为止，你已经配置好了系统中的第一个发射器。它应该和下图相似。

![配置好的火花效果第一个发射器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d5580cd-c35c-4d39-b2ec-3ba17c4d5a69/sparks-stage-1.gif)

## 为系统添加火花迸发发射器

接着，你需要在效果中心创建火花迸发效果。

1.  右键点击SparkFountain系统的 **系统概览（System Overview）**。点击 **添加发射器（Add Emitter）**，现有发射器的列表随即显示。从发射器列表中，选择 **简单Sprite迸发（Simple Sprite Burst）** 模板。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/664a3796-a30c-4b39-9896-946c99af08bd/18-add-sparks-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/664a3796-a30c-4b39-9896-946c99af08bd/18-add-sparks-emitter.png)
    
    点击查看大图。
    
2.  模板发射器的默认名称为 **SimpleSpriteBurst**，但你可以对其重命名。点击发射器名称，该字段将转变为可编辑状态。将新系统命名为 **FX\_SparkBurst**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8b139d1-d91f-4003-90af-4a3fb14ecc8c/19-rename-sparks-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8b139d1-d91f-4003-90af-4a3fb14ecc8c/19-rename-sparks-emitter.png)
    
    点击查看大图。
    

### 火花迸发发射器 - 编辑渲染器设置

虽然 **渲染（Render）** 组是堆栈中的最后一项，但你需要更改材质，以便效果按照预期方式显示。

1.  在 **系统概览（System Overview）** 中，点击 **渲染器（Renderer）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d32d6f0-ac07-4df4-a702-ca647cdad410/20-sparks-select-render-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d32d6f0-ac07-4df4-a702-ca647cdad410/20-sparks-select-render-group.png)
    
    点击查看大图。
    
2.  在 **Sprite渲染（Sprite Rendering）** 下，点击 **材质（Material）** 下拉框并在初学者内容包中选择 **M\_Spark** 材质。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b74afe5-c41c-4cfa-9b11-b992ceff5e0f/20-sparks-select-render-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b74afe5-c41c-4cfa-9b11-b992ceff5e0f/20-sparks-select-render-group.png)
    
    点击查看大图。
    

### 火花迸发发射器 - 编辑发射器更新设置

首先，你将在 **发射器更新（Emitter Update）** 组中编辑模块。这些是将应用于发射器并更新每一帧的行为。

1.  在 **系统概览（System Overview）** 中，点击 **发射器更新（Emitter Update）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a35ebde-1f7a-4da2-a731-6c821258327f/22-sparks-select-emitter-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a35ebde-1f7a-4da2-a731-6c821258327f/22-sparks-select-emitter-update-group.png)
    
    点击查看大图。
    
2.  点击 **垃圾桶（Trashcan）** 图标移除 **瞬间Sprite迸发（Sprite Burst Instantaneous）** 模块。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/434f0f1e-6fce-46cd-821c-2dca471571c2/23-sparks-delete-spawn-burst.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/434f0f1e-6fce-46cd-821c-2dca471571c2/23-sparks-delete-spawn-burst.png)
    
    点击查看大图。
    
3.  打开 **发射器状态（Emitter State）** 模块。此模块控制此发射器的时间和可延展性。由于你使用了简单Sprite迸发模板，因此 **生命周期模式（Life Cycle Mode）** 设置为自身。通常，该模式用于为此特定发射器完全定制发射器生命周期逻辑，但此效果并不需要它。点击下拉列表，并将 **生命周期模式（Life Cycle Mode）** 设置为 **系统（System）**。此操作将使系统能够计算生命周期设置，而这通常可以优化性能。在默认情况下，系统以5秒的间隔无限循环。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a63ea3bc-c08c-4bc5-a997-05c67c3023ad/24-sparks-set-life-cycle-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a63ea3bc-c08c-4bc5-a997-05c67c3023ad/24-sparks-set-life-cycle-mode.png)
    
    点击查看大图。
    
4.  点击粒子更新（Emitter Update）的 **加号** (**+**)，然后选择 **生成（Spawning）> 生成率（Spawn Rate）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8965ddf-f179-4bb8-9801-70d9c1c3940a/25-sparks-add-spawn-rate-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8965ddf-f179-4bb8-9801-70d9c1c3940a/25-sparks-add-spawn-rate-module.png)
    
    点击查看大图。
    
5.  打开 **生成率（Spawn Rate）** 模块。将 **生成率（Spawn Rate）** 设为 **50**.
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/808ce58e-99d3-4507-9b83-af0cd184b7c3/26-sparks-set-spawn-rate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/808ce58e-99d3-4507-9b83-af0cd184b7c3/26-sparks-set-spawn-rate.png)
    
    点击查看大图。
    

### 火花迸发发射器 - 编辑粒子生成设置

下一步，你将在 **粒子生成（Particle Spawn）** 组中编辑模块。这些是粒子首次生成时将应用的效果。

1.  在 **系统概览（System Overview）** 中，点击 **粒子生成（Particle Spawn）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/600ac088-d918-4d5b-b5bf-0b255538624b/27-sparks-select-particle-spawn-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/600ac088-d918-4d5b-b5bf-0b255538624b/27-sparks-select-particle-spawn-group.png)
    
    点击查看大图。
    
2.  在 **点属性（Point Attributes）** 下，将粒子 **生命周期（Lifetime）** 设为 **.2**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a899529f-0137-444d-acf7-06d08c86c9b5/28-sparks-set-lifetime.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a899529f-0137-444d-acf7-06d08c86c9b5/28-sparks-set-lifetime.png)
    
    点击查看大图。
    
3.  将 **质量模式（Mass Mode）** 设置为 **随机（Random）**，将质量的 **最小值（Minimum）** 和 **最大值（Maximum）** 设为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0abc2b41-1f4f-472e-803f-81bcca13989b/29-sparks-set-mass.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0abc2b41-1f4f-472e-803f-81bcca13989b/29-sparks-set-mass.png)
    
    点击查看大图。
    
    参数
    
    值
    
    **质量模式（Mass Mode）**
    
    随机（Random）
    
    **最小值（Minimum）**
    
    0.6
    
    **最大值（Maximum）**
    
    1.0
    
4.  在 **Sprite属性（Sprite Attributes）** 下，展开 **Sprite大小（Sprite Size）**。将 **Sprite大小模式（Sprite Size Mode）** 设置成 **随机非同一（Random Non-Uniform）**。将"Sprite大小（Sprite Size）"的 **最小值（Minimum）** 和 **最大值（Maximum）** 设为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c38adb85-5ce3-49c2-a27b-9eb1954a148e/30-sparks-set-sprite-size.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c38adb85-5ce3-49c2-a27b-9eb1954a148e/30-sparks-set-sprite-size.png)
    
    点击查看大图。
    
    Sprite 大小
    
    最小值
    
    最大值
    
    **X**
    
    10.0
    
    30.0
    
    **Y**
    
    10.0
    
    25.0
    
5.  点击 **Sprite旋转（Sprite Rotation）** 旁的复选框，启用该选项。将 **Sprite旋转模式（Sprite Rotation Mode）** 设置成 **直角（度）（Direct Angle (Degrees)）**。点击值字段旁边的下拉框，并选择 **动态输入（Dynamic Inputs）> 随机范围浮点（Random Ranged Float）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31e2fcfc-31a6-4270-8265-769167ec7272/31-sparks-sprite-rotation-random-range-float.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31e2fcfc-31a6-4270-8265-769167ec7272/31-sparks-sprite-rotation-random-range-float.png)
    
    点击查看大图。
    
6.  将 **最小值**（Minimum）和 **最大值**（Maximum）设为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b258d195-de05-45a9-9eb0-73dbb75e389c/32-sparks-set-sprite-rotation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b258d195-de05-45a9-9eb0-73dbb75e389c/32-sparks-set-sprite-rotation.png)
    
    点击查看大图。
    
    参数
    
    值
    
    **最小值（Minimum）**
    
    \-10
    
    **最大值（Maximum）**
    
    30
    
7.  点击粒子生成（Particle Spawn）的 **加号** (**+**)，然后选择 **生成（Spawning）> 添加速度（Add Velocity）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7398eca4-d194-4de1-9c0c-8d889543a0c4/33-sparks-add-velocity-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7398eca4-d194-4de1-9c0c-8d889543a0c4/33-sparks-add-velocity-module.png)
    
    点击查看大图。
    
8.  打开 **添加速度（Add Velocity）** 模块。点击值旁边的下拉框，并选择 **动态输入（Dynamic Inputs）> 随机范围向量（Random Ranged Vector）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93ac1abc-0f1a-4962-8957-292a3ad7de1e/34-sparks-velocity-random-range-vector.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93ac1abc-0f1a-4962-8957-292a3ad7de1e/34-sparks-velocity-random-range-vector.png)
    
    点击查看大图。
    
9.  将速度的 **最小值（Minimum）** 和 **最大值（Maximum）** 设为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6c827ef-ff42-4ff9-8d86-fd18da7b36cc/35-sparks-set-velocity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6c827ef-ff42-4ff9-8d86-fd18da7b36cc/35-sparks-set-velocity.png)
    
    点击查看大图。
    
    速度
    
    最小值
    
    最大值
    
    **X**
    
    0.0
    
    5.0
    
    **Y**
    
    0.0
    
    5.0
    
    **Z**
    
    0.0
    
    5.0
    
10.  点击粒子生成（Particle Spawn）的 **加号** (**+**)，然后选择 **位置（Location）> 形状位置（Shape Location）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0681e037-444e-4eb7-8df6-3e84606d5598/36-sparks-add-shape-location-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0681e037-444e-4eb7-8df6-3e84606d5598/36-sparks-add-shape-location-module.png)
    
    点击查看大图。
    
11.  打开 **形状位置（Shape Location）** 模块。将 **球体半径（Sphere Radius）** 设为 **5**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c746b834-4e5d-4111-a0a2-f7a70a1190f7/37-sparks-set-shape-location-radius.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c746b834-4e5d-4111-a0a2-f7a70a1190f7/37-sparks-set-shape-location-radius.png)
    
    点击查看大图。
    

### 火花迸发发射器 - 编辑粒子更新设置

现在，你将在 **粒子更新（Particle Update）** 组中编辑模块。这些行为将应用于发射器的粒子并更新每一帧。

1.  在系统概览（System Overview）中，点击 **粒子更新（Particle Update）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21bdb7b1-29ba-44a4-a6a1-de29c62ee272/38-sparks-select-particle-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21bdb7b1-29ba-44a4-a6a1-de29c62ee272/38-sparks-select-particle-update-group.png)
    
    点击查看大图。
    
2.  打开 **缩放色阶（Scale Color）** 模块。对于 **缩放RGB（Scale RGB）**，将 **RGB** 值设置如下。在 **缩放Alpha（Scale Alpha）** 下，选择 **平顺下调（Smooth Ramp Down）** 模板。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/125f111d-460d-4c9f-b8ea-2c8edb9a9e4c/39-sparks-set-scale-color.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/125f111d-460d-4c9f-b8ea-2c8edb9a9e4c/39-sparks-set-scale-color.png)
    
    点击查看大图。
    
    颜色
    
    数值
    
    **R**
    
    2.0
    
    **G**
    
    6.0
    
    **B**
    
    25.0
    
3.  点击粒子更新（Particle Update）的 **加号** (**+**)，然后选择 **大小（Size）> Sprite尺寸缩放（Sprite Size Scale）**。还可在搜索栏中键入"scale"，如下所示。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1017bf2c-aedd-4313-bf2e-b5f0f79e5760/40-sparks-add-scale-sprite-size-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1017bf2c-aedd-4313-bf2e-b5f0f79e5760/40-sparks-add-scale-sprite-size-module.png)
    
    点击查看大图。
    
      
    
4.  打开 **Sprite大小缩放（Sprite Size Scale）** 模块。点击 **缩放因子（Scale Factor）** 值字段旁边的下拉框，并选择 **动态输入（Dynamic Inputs）> 随机范围向量2D（Random Ranged Vector 2D）**。还可在搜索栏中键入 `random`，如下所示。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9672acb3-192d-4855-a530-8de61dee3924/41-sparks-scale-sprite-size-random-range-vector.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9672acb3-192d-4855-a530-8de61dee3924/41-sparks-scale-sprite-size-random-range-vector.png)
    
    点击查看大图。
    
5.  将缩放因子的 **最小值（Minimum）** 和 **最大值（Maximum）** 设为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6e582b4-b31b-4128-b712-c422111c80b6/42-sparks-set-scale-sprite-size.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6e582b4-b31b-4128-b712-c422111c80b6/42-sparks-set-scale-sprite-size.png)
    
    点击查看大图。
    
    缩放
    
    最小值
    
    最大值
    
    **X**
    
    1.0
    
    3.5
    
    **Y**
    
    2.5
    
    5.0
    

到目前为止，你已经配置好了系统中的第二个发射器。它应该和下图相似。

![Sparks Effect Second Emitter Configured](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b061e069-5c36-465a-8f0f-47de7c186dee/sparks-stage-2.gif)

## 添加弧度火花发射器到系统

1.  右键点击SparkFountain系统的 **系统概览（System Overview）**。点击 **添加发射器（Add Emitter）**，现有发射器的列表随即显示。从发射器列表中，选择 **简单Sprite迸发（Simple Sprite Burst）** 模板。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a04e70d-00e5-4bc8-8cc7-703030c4f0cc/43-add-radial-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a04e70d-00e5-4bc8-8cc7-703030c4f0cc/43-add-radial-emitter.png)
    
    点击查看大图。
    
2.  模板发射器的默认名称为 **SimpleSpriteBurst**，但你可以对其重命名。点击发射器名称，该字段将转变为可编辑状态。将新系统命名为 **FX\_Sparks\_Radial**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/509cb9b7-3d15-46db-b221-7447df4ba21b/44-rename-radial-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/509cb9b7-3d15-46db-b221-7447df4ba21b/44-rename-radial-emitter.png)
    
    点击查看大图。
    

### 弧度火花发射器 - 编辑渲染器设置

虽然 **渲染（Render）** 组是堆栈中的最后一项，但你需要更改材质，以便效果按照预期方式显示。

1.  在 **系统概览（System Overview）** 中，点击 **渲染器（Renderer）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4044563f-a657-45b6-981c-00507847fbeb/45-radial-select-render-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4044563f-a657-45b6-981c-00507847fbeb/45-radial-select-render-group.png)
    
    点击查看大图。
    
2.  点击 **材质（Material）** 下拉框并从初学者内容包中选择 **\*M\_Radial\_Gradient** 材质。在搜索栏中输入 `radial` 来找到它，如下图所示。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/417eed7f-24fe-4cbc-a4b4-e4c2e89df13f/46-radial-set-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/417eed7f-24fe-4cbc-a4b4-e4c2e89df13f/46-radial-set-material.png)
    
    点击查看大图。
    
      
    
3.  点击 **对齐（Alignment）** 下拉列表，然后选择 **速度对齐（Velocity Aligned）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a5a4f61-e2b8-4b37-aea2-995206ed7d15/47-radial-sprite-alignment.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a5a4f61-e2b8-4b37-aea2-995206ed7d15/47-radial-sprite-alignment.png)
    
    点击查看大图。
    

### 弧度火花发射器 - 编辑发射器更新设置

首先，你将在 **发射器更新（Emitter Update）** 组中编辑模块。这些是将应用于发射器并更新每一帧的行为。

1.  在 **系统概览（System Overview）** 中，点击 **粒子更新（Particle Update）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdae7abd-4b1c-41de-b3d5-6692a6e4d937/48-radial-select-emitter-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdae7abd-4b1c-41de-b3d5-6692a6e4d937/48-radial-select-emitter-update-group.png)
    
    点击查看大图。
    
2.  点击 **垃圾桶** 图标，以移除 **Sprite即时迸发（Sprite Burst Instantaneous）** 模块。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1e95af6-5fdd-4e07-a635-5c961df28515/49-radial-delete-spawn-burst.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1e95af6-5fdd-4e07-a635-5c961df28515/49-radial-delete-spawn-burst.png)
    
    点击查看大图。
    
3.  打开 **发射器状态（Emitter State）** 模块。此模块控制此发射器的时间和可延展性。由于你使用了 **简单Sprite迸发（Simple Sprite Burst）** 模板，因此 **生命周期模式（Life Cycle Mode）** 设置为 **自身（Self）**。通常，该模式用于为此特定发射器完全定制发射器生命周期逻辑，但此效果并不需要它。点击下拉列表，并将 **生命周期模式（Life Cycle Mode）** 设置为 **系统（System）**。此操作将使系统能够计算生命周期设置，而这通常可以优化性能。在默认情况下，系统以5秒的间隔无限循环。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9f0bd22-bcb6-4877-a857-0174d9031d3c/50-radial-set-life-cycle-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9f0bd22-bcb6-4877-a857-0174d9031d3c/50-radial-set-life-cycle-mode.png)
    
    点击查看大图。
    
4.  点击 **粒子更新（Particle Update）** 的 **加号（Plus sign）** 图标（**+**），然后选择 **生成 > 生成率（Spawning > Spawn Rate）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8bcb4b7-95da-45bc-a56b-8ef2805939f2/51-radial-add-spawn-rate-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8bcb4b7-95da-45bc-a56b-8ef2805939f2/51-radial-add-spawn-rate-module.png)
    
    点击查看大图。
    
5.  打开 **生成速率（Spawn Rate）** 模块。将 **生成速率（Spawn Rate）** 设置为 **500**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7019229-1dbc-4f50-baea-f6153a2a0465/52-radial-set-spawn-rate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7019229-1dbc-4f50-baea-f6153a2a0465/52-radial-set-spawn-rate.png)
    
    点击查看大图。
    

### 弧度火花发射器 - 编辑粒子生成设置

下一步，你将在 **粒子生成（Particle Spawn）** 组中编辑模块。这些是粒子首次生成时将应用于粒子的行为。

1.  在系统概览（System Overview）中，点击 **粒子生成（Particle Spawn）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29dfe637-b36f-4732-b311-7460db21c540/53-radial-select-particle-spawn-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29dfe637-b36f-4732-b311-7460db21c540/53-radial-select-particle-spawn-group.png)
    
    点击查看大图。
    
2.  打开 **初始化粒子（Initialize Particle）** 模块。在 **点属性（Point Attributes）** 下，展开 **生命周期（Lifetime）**。将生命周期（Lifetime）的模式设置为 **随机（Random）**，将 **最小值**（ Minimum）和 **最大值**（Maximum）设为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad79f92c-8ce0-4e6b-bff9-cc690107ddf1/54-radial-set-lifetime.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad79f92c-8ce0-4e6b-bff9-cc690107ddf1/54-radial-set-lifetime.png)
    
    点击查看大图。
    
    参数
    
    值
    
    **生命周期模式（Lifetime Mode）**
    
    Random
    
    **最小值（Minimum）**
    
    0.2
    
    **最大值（Maximum）**
    
    0.7
    
3.  展开 **颜色（Color）**。将 **颜色模式（Color Mode）** 设置为 **直接设置（Direct Set）**，将RGB值设为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7afa9d89-682b-465e-9a7e-72a5e890e12c/55-radial-set-color.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7afa9d89-682b-465e-9a7e-72a5e890e12c/55-radial-set-color.png)
    
    点击查看大图。
    
    参数
    
    值
    
    **红色（Red）**
    
    2.0
    
    **绿色（Green）**
    
    8.0
    
    **蓝色（Blue）**
    
    20.0
    
    **Alpha**
    
    1.0
    
4.  展开 **质量（Mass）**。将 **质量模式（Mass Mode）** 设置为 **随机（Random）**，将 **最小值**（Minimum）和 **最大值**（Maximum）设为下列值：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc6dcb55-7d6e-4977-b7d0-0ba98e844105/56-radial-set-mass.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc6dcb55-7d6e-4977-b7d0-0ba98e844105/56-radial-set-mass.png)
    
    点击查看大图。
    
    参数
    
    值
    
    **质量模式（Mass Mode）**
    
    随机
    
    **最小值（Minimum）**
    
    0.3
    
    **最大值（Maximum）**
    
    0.6
    
5.  在 **Sprite属性（Sprite Attributes）** 下，将 **Sprite大小模式（Sprite Size Mode）** 设置为 **非统一（Non-Uniform）**。设置以下值：**X：0.25，Y：0.5**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b35197a2-5deb-46c9-827f-c13c9f2444bc/57-radial-set-sprite-size.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b35197a2-5deb-46c9-827f-c13c9f2444bc/57-radial-set-sprite-size.png)
    
    点击查看大图。
    
6.  将 **Sprite旋转模式（Sprite Rotation Mode）** 和 **Sprite UV模式（Sprite UV Mode）** 保留为 **未设置（Unset）**。
    
7.  点击 **粒子生成（Particle Spawn）** 的 **加号（Plus sign）** 图标（**+**），然后选择 **质量 > 按质量计算尺寸和旋转惯性（Mass > Calculate Size and Rotational Inertia by Mass）**。你也可以在搜索栏中输入 `calc`，如下所示。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd45ffd4-7669-4cfa-8977-235e0f759f26/58-radial-add-calc-size-by-mass-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd45ffd4-7669-4cfa-8977-235e0f759f26/58-radial-add-calc-size-by-mass-module.png)
    
    点击查看大图。
    
8.  打开 **按质量计算尺寸和旋转惯性（Calculate Size and Rotational Inertia by Mass）** 模块。在 **密度（Density）** 下，将 **按材质类型划分的密度（Density by Material Type）** 设置为 **水（Water）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c587b10e-1383-42b2-9562-c7f86627b4f9/59-radial-set-density-to-water.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c587b10e-1383-42b2-9562-c7f86627b4f9/59-radial-set-density-to-water.png)
    
    点击查看大图。
    
9.  在 **比例（Proportions）** 下，将 **高度（Height）** 更改为 **0.5**，**深度（Depth）** 更改为 **0.0**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee224edc-00cb-4db1-95ef-570559e8148d/60-radial-set-proportions.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee224edc-00cb-4db1-95ef-570559e8148d/60-radial-set-proportions.png)
    
    点击查看大图。
    
10.  点击 **粒子生成（Particle Spawn）** 的 **加号（Plus sign）** 图标（**+**），然后选择 **速度 > 添加速度（Velocity > Add Velocity）**。你也可以在搜索栏中输入 `velocity`。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5820dcd-5fc6-47a7-b43b-41b9f5065288/61-radial-add-velocity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5820dcd-5fc6-47a7-b43b-41b9f5065288/61-radial-add-velocity.png)
    
    点击查看大图。
    
11.  打开 **添加速度（Add Velocity）** 模块。点击下拉菜单，选择 **动态输入（Dynamic Inputs）** 然后选择 **随机范围向量（Random Range Vector）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc87630e-1df7-460b-853b-2c516b1a844f/62-radial-velocity-random-range-vector.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc87630e-1df7-460b-853b-2c516b1a844f/62-radial-velocity-random-range-vector.png)
    
    点击查看大图。
    
    1.  将速度的 **最大值（Minimum）** 和 **最小值（Maximum）** 设为以下值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2030986-3053-4058-9e1a-a2ec273ed87e/63-radial-set-velocity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2030986-3053-4058-9e1a-a2ec273ed87e/63-radial-set-velocity.png)
    
    点击查看大图。
    
    速度
    
    最小值
    
    最大值
    
    **X**
    
    \-100.0
    
    90.0
    
    **Y**
    
    \-100.0
    
    90.0
    
    **Z**
    
    300.0
    
    500.0
    
12.  点击 **粒子生成（Particle Spawn）** 的 **加号（Plus sign）** 图标（**+**），然后选择 **位置（Location）> 形状位置（Shape Location）**。你也可以在搜索栏中输入 `sphere` 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53951b4d-4c92-4b8f-a0de-ae7b6b6ca04d/64-radial-add-shape-location-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53951b4d-4c92-4b8f-a0de-ae7b6b6ca04d/64-radial-add-shape-location-module.png)
    
    点击查看大图。
    
13.  打开 **形状位置（Shape Location）** 模块。将 **球体半径（Sphere Radius）** 设置为 **2.0**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31d79ac2-18d6-44fa-b861-50d69e6d4921/65-radial-set-sphere-radius.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31d79ac2-18d6-44fa-b861-50d69e6d4921/65-radial-set-sphere-radius.png)
    
    点击查看大图。
    

### 弧度火花发射器 - 编辑粒子更新设置

现在，你将在 **粒子更新（Particle Update）** 组中编辑模块。这些行为将应用于发射器的粒子并更新每一帧。

1.  在 **系统概览（System Overview）** 中，点击 **粒子更新（Particle Update）** 组，以在 **选择（Selection）** 面板中将其打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/480917a2-c3d0-4482-8e48-ddea6b4736da/66-radial-select-particle-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/480917a2-c3d0-4482-8e48-ddea6b4736da/66-radial-select-particle-update-group.png)
    
    点击查看大图。
    
2.  点击 **粒子更新（Particle Update）** 的 **加号** 图标（**+**），然后选择 **速度（Velocity） > 缩放速度（Scale Velocity）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96469548-98a5-4c02-972d-88b3cdc3e7a7/67-radial-add-scale-velocity-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96469548-98a5-4c02-972d-88b3cdc3e7a7/67-radial-add-scale-velocity-module.png)
    
    点击查看大图。
    
3.  将 **缩放速度（Scale Velocity）** 调整为 **X: 3.0, Y: 4.0, Z: 1.0**.
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e9f32d9-4b23-462f-8721-53d59e3106cb/68-radial-set-scale-velocity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e9f32d9-4b23-462f-8721-53d59e3106cb/68-radial-set-scale-velocity.png)
    
    点击查看大图。
    
4.  点击 **粒子更新（Particle Update）** 的 **加号** 图标（**+**），然后选择 **力（Forces） > 重力（Gravity Force）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e18658d1-0e27-40ff-a090-83ef44dba0da/69-radial-add-gravity-force-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e18658d1-0e27-40ff-a090-83ef44dba0da/69-radial-add-gravity-force-module.png)
    
    点击查看大图。
    
5.  打开 **重力（Gravity Force）** 模块。将 **Z** 值更改为 **\-4500**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f641769-ccf9-4ec8-9b50-2d82582876be/70-radial-set-gravity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f641769-ccf9-4ec8-9b50-2d82582876be/70-radial-set-gravity.png)
    
    点击查看大图。
    
    1.  点击 **粒子更新（Particle Update）** 的 **加号** 图标（**+**），然后选择 **力（Forces）> 阻力（Drag）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f2d1c8b-3864-4f7f-b6d9-6ee3dec2970b/71-radial-add-drag-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f2d1c8b-3864-4f7f-b6d9-6ee3dec2970b/71-radial-add-drag-module.png)
    
    点击查看大图。
    
6.  打开 **阻力（Drag）** 模块，将 **阻力（Drag）** 值设置为 **1.7**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aec3fa73-7ac8-482c-ac77-b1cb7e0d7f58/72-radial-set-drag.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aec3fa73-7ac8-482c-ac77-b1cb7e0d7f58/72-radial-set-drag.png)
    
    点击查看大图。
    
7.  点击 **粒子更新（Particle Update）** 的 **加号** (**+**) 并选择 **碰撞（Collision）> 碰撞（Collision）**。该模组可以保证所有火花能够撞击到地板之类的物体并且弹起。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec818dae-83b9-45ae-8dd9-604c79cc8113/73-radial-add-collision-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec818dae-83b9-45ae-8dd9-604c79cc8113/73-radial-add-collision-module.png)
    
    点击查看大图。
    
8.  打开 **碰撞（Collision）** 模块。在 **反射（Bounce）** 中，将 **恢复力（Restitution）** 值设置为 **0.4**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/733abb43-7942-40fe-84e8-fcf70b369d26/74-radial-collision-set-restitution.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/733abb43-7942-40fe-84e8-fcf70b369d26/74-radial-collision-set-restitution.png)
    
    点击查看大图。
    
9.  在 **摩擦力（Friction）** 中，将 **摩擦力（Friction）** 值设置为 **0.2**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3cd31b96-5b38-4352-b52a-62630d33571d/75-radial-collision-set-friction.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3cd31b96-5b38-4352-b52a-62630d33571d/75-radial-collision-set-friction.png)
    
    点击查看大图。
    
10.  点击 **垃圾桶（Trashcan）** 图标，以移除 **缩放色阶（Scale Color）** 模块。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7539b866-4eb4-4e79-b360-b09fb758b2b6/76-radial-delete-scale-color.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7539b866-4eb4-4e79-b360-b09fb758b2b6/76-radial-delete-scale-color.png)
    
    点击查看大图。
    
11.  点击 **加号** （**+**），然后选择 **大小 （Size）> 按速度缩放Sprite大小（Scale Sprite Size by Speed）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1eca7ea-c666-45f0-905e-de9cc4bc1a19/77-radial-add-scale-sprite-by-speed-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1eca7ea-c666-45f0-905e-de9cc4bc1a19/77-radial-add-scale-sprite-by-speed-module.png)
    
    点击查看大图。
    
12.  打开 **按速度Sprite大小缩放（Sprite Size Scale by Speed）** 模块。将 **比例因子（Scale Factor）** 的最小值（Minimum）和最大值（Maximum）设置如下：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cec85f5b-c4a0-4b3b-a79a-10811fddb278/78-radial-set-scale-sprite-by-speed.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cec85f5b-c4a0-4b3b-a79a-10811fddb278/78-radial-set-scale-sprite-by-speed.png)
    
    点击查看大图。
    
    按速度Sprite大小缩放
    
    最小值
    
    最大值
    
    **X**
    
    0
    
    0.5
    
    **Y**
    
    3
    
    6
    
13.  将 **速度阈值（Velocity Threshold）** 值设为 **2000**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64e291e1-e423-4cb5-a79e-6545d5eaf287/79-radial-set-scale-sprite-by-speed-threshold.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64e291e1-e423-4cb5-a79e-6545d5eaf287/79-radial-set-scale-sprite-by-speed-threshold.png)
    
    点击查看大图。
    

## 最终结果

祝贺你！在完成上述步骤后，火花效果就制作完成了。你可以回到自己的关卡中查看最终结果，并且根据需求进行微调。

![火花效果最终结果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ec6a982-99e4-40a8-ae69-cde65b598282/sparks-final.gif)

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建烟雾发射器和火花系统](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E5%88%9B%E5%BB%BA%E7%83%9F%E9%9B%BE%E5%8F%91%E5%B0%84%E5%99%A8%E5%92%8C%E7%81%AB%E8%8A%B1%E7%B3%BB%E7%BB%9F)
-   [烟雾发射器 - 编辑发射器更新设置](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E7%83%9F%E9%9B%BE%E5%8F%91%E5%B0%84%E5%99%A8-%E7%BC%96%E8%BE%91%E5%8F%91%E5%B0%84%E5%99%A8%E6%9B%B4%E6%96%B0%E8%AE%BE%E7%BD%AE)
-   [烟雾发射器 - 编辑粒子生成设置](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E7%83%9F%E9%9B%BE%E5%8F%91%E5%B0%84%E5%99%A8-%E7%BC%96%E8%BE%91%E7%B2%92%E5%AD%90%E7%94%9F%E6%88%90%E8%AE%BE%E7%BD%AE)
-   [烟雾发射器 - 编辑粒子更新设置](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E7%83%9F%E9%9B%BE%E5%8F%91%E5%B0%84%E5%99%A8-%E7%BC%96%E8%BE%91%E7%B2%92%E5%AD%90%E6%9B%B4%E6%96%B0%E8%AE%BE%E7%BD%AE)
-   [为系统添加火花迸发发射器](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E4%B8%BA%E7%B3%BB%E7%BB%9F%E6%B7%BB%E5%8A%A0%E7%81%AB%E8%8A%B1%E8%BF%B8%E5%8F%91%E5%8F%91%E5%B0%84%E5%99%A8)
-   [火花迸发发射器 - 编辑渲染器设置](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E7%81%AB%E8%8A%B1%E8%BF%B8%E5%8F%91%E5%8F%91%E5%B0%84%E5%99%A8-%E7%BC%96%E8%BE%91%E6%B8%B2%E6%9F%93%E5%99%A8%E8%AE%BE%E7%BD%AE)
-   [火花迸发发射器 - 编辑发射器更新设置](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E7%81%AB%E8%8A%B1%E8%BF%B8%E5%8F%91%E5%8F%91%E5%B0%84%E5%99%A8-%E7%BC%96%E8%BE%91%E5%8F%91%E5%B0%84%E5%99%A8%E6%9B%B4%E6%96%B0%E8%AE%BE%E7%BD%AE)
-   [火花迸发发射器 - 编辑粒子生成设置](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E7%81%AB%E8%8A%B1%E8%BF%B8%E5%8F%91%E5%8F%91%E5%B0%84%E5%99%A8-%E7%BC%96%E8%BE%91%E7%B2%92%E5%AD%90%E7%94%9F%E6%88%90%E8%AE%BE%E7%BD%AE)
-   [火花迸发发射器 - 编辑粒子更新设置](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E7%81%AB%E8%8A%B1%E8%BF%B8%E5%8F%91%E5%8F%91%E5%B0%84%E5%99%A8-%E7%BC%96%E8%BE%91%E7%B2%92%E5%AD%90%E6%9B%B4%E6%96%B0%E8%AE%BE%E7%BD%AE)
-   [添加弧度火花发射器到系统](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%BC%A7%E5%BA%A6%E7%81%AB%E8%8A%B1%E5%8F%91%E5%B0%84%E5%99%A8%E5%88%B0%E7%B3%BB%E7%BB%9F)
-   [弧度火花发射器 - 编辑渲染器设置](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E5%BC%A7%E5%BA%A6%E7%81%AB%E8%8A%B1%E5%8F%91%E5%B0%84%E5%99%A8-%E7%BC%96%E8%BE%91%E6%B8%B2%E6%9F%93%E5%99%A8%E8%AE%BE%E7%BD%AE)
-   [弧度火花发射器 - 编辑发射器更新设置](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E5%BC%A7%E5%BA%A6%E7%81%AB%E8%8A%B1%E5%8F%91%E5%B0%84%E5%99%A8-%E7%BC%96%E8%BE%91%E5%8F%91%E5%B0%84%E5%99%A8%E6%9B%B4%E6%96%B0%E8%AE%BE%E7%BD%AE)
-   [弧度火花发射器 - 编辑粒子生成设置](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E5%BC%A7%E5%BA%A6%E7%81%AB%E8%8A%B1%E5%8F%91%E5%B0%84%E5%99%A8-%E7%BC%96%E8%BE%91%E7%B2%92%E5%AD%90%E7%94%9F%E6%88%90%E8%AE%BE%E7%BD%AE)
-   [弧度火花发射器 - 编辑粒子更新设置](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E5%BC%A7%E5%BA%A6%E7%81%AB%E8%8A%B1%E5%8F%91%E5%B0%84%E5%99%A8-%E7%BC%96%E8%BE%91%E7%B2%92%E5%AD%90%E6%9B%B4%E6%96%B0%E8%AE%BE%E7%BD%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/how-to-create-a-sparks-effect-in-niagara-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)