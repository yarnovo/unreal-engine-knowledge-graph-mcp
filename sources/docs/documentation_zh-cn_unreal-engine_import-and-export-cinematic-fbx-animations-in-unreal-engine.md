# 在虚幻引擎中导入和导出过场动画FBX动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/import-and-export-cinematic-fbx-animations-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:12:38.006Z

---

目录

![导出和导入FBX文件](https://dev.epicgames.com/community/api/documentation/image/edfdda7f-a4d2-4936-b818-020dc86292d1?resizing_type=fill&width=1920&height=335)

本文介绍如何将场景从Sequencer中导出为FBX文件，并在第三方应用程序（如3ds Max或Maya）中修改该文件， 完成必要的修改后，可以再将该FBX文件连同修改重新导入虚幻引擎4的Sequencer场景中。

在此过程中，有几点需要注意：

-   导出时，场景中所有带动画的物体都可以导出到FBX文件中。
-   导入FBX文件时，只会导入动画。不会新建物体。
-   导出/导入无法用于 **主序列**、主序列中的 **镜头** 或 **子场景**。
-   务必使第三方应用程序中的时间设置与虚幻引擎中场景使用的时间帧一致。

只要你是从源关卡序列导出（而非从主场景中的镜头导出），且仅修改了现有资源的动画，就可以将修改直接导回虚幻引擎4中的场景。 另外，在虚幻引擎和第三方应用程序中用相同的时间帧还确保了两者能够对齐，且导入的场景不会以不同的时率重新采样。

## 工作流示例

下面，我们从Sequencer Subway项目（如下图所示，可从启动程序的 **学习（Learn）** 选项卡免费获取）中导出一个场景， 将其导入Maya，修改场景中的摄像机移动，然后将该FBX文件连同修改导回虚幻引擎，修改会自动更新到现有场景。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/730824be-8f91-48dd-b92f-8f60d29ef88b/sequencersample4-23.png)

### 从Sequencer导出

首先，确定要导出的关卡序列。

1.  在下面的片段中，我们选择并打开了要修改的镜头。然后转至 **常规选项（General Options）**，选择 **导出（Export）**。此时会看到一个主轨迹，其中包含 **shot0040\_001**，我们打开这个特定关卡序列并将其导出。
    
    执行FBX导出过程时，将显示 **FBX导出选项（FBX Export Options）** 窗口。在此窗口中，可以定义内容的导出方式。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1de53720-4c00-4d31-9fa0-329c1f9aa0bd/fbxexportoptions4-24.png)
    
    在这里，你可以设置 **FBX导出兼容性（FBX Export Compatibility）** 版本以及骨架网格体的 **顶点颜色（Vertex Color）**、**细节层级（Level of Detail）** 或 **碰撞（Collision）** 选项。
    
    另外，还有一个 **将骨骼运动映射到根（Map Skeletal Motion to Root）** 的选项。如果启用该选项，会将骨骼Actor运动映射到骨架的根骨骼。 此例中，我们使用默认设置，然后选择 **导出（Export）** 以导出内容。
    

#### 按本地时间或主时间导出镜头

导出镜头或子序列中的对象时，可以决定按主序列时间还是本地序列时间导出镜头。 整体观看动画并与其他镜头进行对比时，主序列时间将更为实用。逐一处理镜头时，本地序列时间则更为实用。 导出至任何一种时间都会映射至Maya中的镜头关键帧；在Sequencer中，可以轻松从本地时间转换为主时间。

默认设置为 **导出本地时间** （已勾选）。要按主时间导出，请取消选中此框。

![导出本地时间勾选框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/875a1672-c706-4870-a605-ff528dabe304/export_time2.png)

### 外部编辑

从Sequencer导出FBX后，可以打开第三方应用程序将其导入，然后开始编辑。

1.  将FBX导入Maya之前，需要将 **时间（Time）** 的工作单位设置成与虚幻引擎中使用的 **时率（Time Rate）** 一致。
    
2.  然后将FBX导入Maya并设置场景，以便开始编辑。导入后：
    
    1.  在 **面板（Panel）** 中设置视角（Perspective），在场景中使用摄像机 **shotCamA**。
    2.  选中摄像机，按 **Ctrl + H** 组合键，隐藏妨碍视图的元素（例如体积光网格体）。
    3.  然后在 **视图（View）** 中 **选择摄像机（Select Camera）**，显示 **shotCamA** 的属性和关键帧，然后就可以开始编辑了。
    
3.  接下来编辑摄像机的移动。在下方，选择 **shotCamA** 的 **平移（Translation）** 和 **旋转（Rotation）** 属性。然后点击右键并选择 **断开连接（Break Connections）**。 然后为摄像机选择新起始点，按 **S** 键为新位置设置关键帧，即可开始播放场景。 略微向前拉动，然后将摄像机移至终点位置。再次按 **S** 键在最终位置添加关键帧，让摄像机沿新路径移动。
    
4.  修改完后，使用"文件（File）"菜单上的 **导出选中项（Export Selection）** 导出场景。从Maya导出时，首先将导出类型更改为 **FBX导出（FBX export）**。然后在 **高级选项（Advanced Options）** 和 **轴转换（Axis Conversion）** 下将 **上方向轴（Up Axis）** 更改为沿着Z轴，实现向虚幻引擎的兼容导入。此问题可能会在未来版本的引擎中得到解决，从而无需再对轴进行转换，但目前必须执行此操作来避免出现导入问题。
    

### 导入Sequencer

现在我们有了一个经编辑的FBX格式文件。我们可以将其与修改一起导入虚幻引擎来更新场景。

1.  在需要编辑的 **shot0040\_001** 中，右键单击 **shotCamA** 并选择 **导入（Import）**。此操作将获取FBX中的变换数据，然后将其应用到虚幻引擎中所选的物体上。当需要将相同变换数据应用到场景中的多个物体上时，此操作将十分实用。
    
    导入FBX时，将显示 **导入FBX（Import FBX）** 窗口。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcbd240d-0b83-4aad-8851-e600331cd35e/importfbx.png)
    
    你可以在此窗口（如启用）**强制执行顺X轴前视口（Force Front XAxis）**，以使用顺X轴前视口而不是-Y轴将场景从FBX坐标系转换为UE4坐标系。 另如果关卡中尚无摄像机，可以启用 **创建摄像机（Create Cameras）** 选项。
    
    除单击右键外，也可从 **常规选项（General Options）** 窗口导入FBX。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0367d263-46e6-406c-99c6-4b4e3775ba01/importoption.png)
    
    选择此方法时，虚幻引擎将尝试匹配物体的名称。例如，如果FBX文件和序列中都有 **shotCamA**，引擎会将FBX文件中的数据应用到引擎中的相应物体上。
    

在此例中，我们只对摄像机应用了变换修改。但是，我们也可以将新数值设为 **焦距（Focal Length）** 关键帧，形成外观不同的镜头。

请在此工作流程中多尝试，找到最适合实际情况的使用方式。 有时，你可能需要导出3D包（如Maya或3ds Max），对场景的各方面进行微调，然后将修改导回虚幻引擎里的场景中。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [工作流示例](/documentation/zh-cn/unreal-engine/import-and-export-cinematic-fbx-animations-in-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A4%BA%E4%BE%8B)
-   [从Sequencer导出](/documentation/zh-cn/unreal-engine/import-and-export-cinematic-fbx-animations-in-unreal-engine#%E4%BB%8Esequencer%E5%AF%BC%E5%87%BA)
-   [按本地时间或主时间导出镜头](/documentation/zh-cn/unreal-engine/import-and-export-cinematic-fbx-animations-in-unreal-engine#%E6%8C%89%E6%9C%AC%E5%9C%B0%E6%97%B6%E9%97%B4%E6%88%96%E4%B8%BB%E6%97%B6%E9%97%B4%E5%AF%BC%E5%87%BA%E9%95%9C%E5%A4%B4)
-   [外部编辑](/documentation/zh-cn/unreal-engine/import-and-export-cinematic-fbx-animations-in-unreal-engine#%E5%A4%96%E9%83%A8%E7%BC%96%E8%BE%91)
-   [导入Sequencer](/documentation/zh-cn/unreal-engine/import-and-export-cinematic-fbx-animations-in-unreal-engine#%E5%AF%BC%E5%85%A5sequencer)