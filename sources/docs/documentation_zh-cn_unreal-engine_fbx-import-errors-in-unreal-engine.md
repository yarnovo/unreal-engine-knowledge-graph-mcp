# 虚幻引擎中的FBX导入错误 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fbx-import-errors-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:00:21.356Z

---

目录

![FBX 导入错误](https://dev.epicgames.com/community/api/documentation/image/fd9edb06-52b7-484c-ae81-f1a830535b7a?resizing_type=fill&width=1920&height=335)

Description：导入 FBX 文件时出现错误的说明。 Parent: working-with-content/fbx-content-pipeline Version: 4.9 Order:1000

此列表包含导入 FBX 文件时可能出现的错误或警告信息。

## 泛型

导入创建新资源失败。此时可能会出现另一个警告信息，说明失败缘由。

* * *

加载 FBX 场景失败。文件已损坏或文件类型不正确。

* * *

已存在拥有特定命名的资源。使用其他命名导入，或导入到另一个文件夹中。

* * *

当前导入的资源将替代拥有相同命名的现有资源。

* * *

覆盖现有资源时，导入器需要先删除旧资源。然而因为存在引用，导入器无法将其删除。

尝试使用其他命名，或导入到另一个文件夹中。

* * *

打开文件和导入失败。文件已损坏或文件类型不正确。

* * *

文件中不含模型。确保 FBX 文件包含模型物体。

* * *

## 网格体

网格体对象不包含几何体。

* * *

网格体由多边形组成（而非三角形），因此导入器尝试进行三角剖分，但失败。检查源内容，并在 DCC 工具中对其进行三角剖分。

* * *

导入器只支持在多边形平面上的平滑。平滑由边缘完成时，导入器将尝试把边缘平滑转换为多边形平滑，但该操作已失败。

(FBX API ComputePolygonSmoothingFromEdgeSmoothing.)

* * *

导入器只支持在多边形平面上的平滑。平滑由顶点完成时，导入器将尝试把顶点平滑转换为多边形平滑，但该操作已失败。

* * *

表面材质索引无效。原因是它被映射到了错误的索引上，或材质不可用。发生此问题时，导入器强制将索引设为 0。

* * *

给定节点中找不到 FBXMesh 物体。确保场景中有模型存在。

* * *

此 FBX 场景中找不到平滑组信息。请确保在导入文件前启用 FBX 导入器插件中的"Export Smoothing Groups"选项。

FBX 导入器将在导出时生成适当的平滑数据（即使工具不支持平滑组），因此导入时可推断正确的顶点法线。

* * *

网格体 LOD 索引无效。为添加 LOD(N)，当前模型应包含从 \[0-(N-1)\] 的所有 LOD。

* * *

应为 LOD 选择一个文件。未选择文件。

* * *

只能为 LOD 选择一个文件。

* * *

### 静态网格体

当前导入器支持最高为 MAX\_MESH\_MATERIAL\_INDEX(64) 的材质。将网格体分为几个块来修复此问题。

* * *

静态网格体的灯光图 UV 集似乎存在布局问题。原因是三角形 UV 相互重叠或 UV 越界（范围 0.0 - 1.0）。

* * *

### 骨架网格体

导入 LOD（或导入带 LOD 的骨架网格体）时 LOD 请求网格体拥有的根骨骼和原始网格体所拥有的根骨骼不同，则会出现此问题。他们应拥有相同的根骨骼。

* * *

导入器不支持骨架网格体层级中存在命名相同的骨骼。确保每个骨骼的命名皆不相同。

* * *

导入器未找到加权到骨架的顶点。骨架网格体必须拥有至少一个加权到骨架的顶点。

* * *

恢复分段的排序顺序时，条带无法与新数据匹配。

* * *

无法恢复旧网格体中分段号码的三角形排序设置，因为新网格体中无法找到相匹配的分段。自定义排序信息已丢失。

* * *

无法恢复分段的三角形排序设置，因为新网格体不包含如此多的分段。请找到匹配的分段并手动应用。

* * *

根层级上未找到有效网格体。如子层级中存在网格体，请在导入时启用 \[Import Meshes In Bone Hierarchy\] 选项。

* * *

未找到有效根节点。

* * *

无法找到骨骼层级。尝试在导入时启用 Rigid Mesh 选项。

* * *

未找到有效节点。

* * *

未找到权重信息，因此忽略此变形器。

* * *

场景不含绑定姿势。确保场景中存在绑定姿势。如没有绑定姿势，则在导入时启用 \[Use Time 0 as Reference Pose\]。

* * *

未找到集群。

* * *

未找到骨骼节点。如其为刚性，请使用 \[Import Rigid Body\] 选项。

* * *

未找到有效绑定姿势。存在的绑定姿势必须为有效。在 DCC 工具中重建绑定姿势通常能解决此问题。

* * *

找到多个根。导入器只支持每个网格体一个根。

* * *

绑定姿势数据缺失部分骨骼。如希望避免此情况，可在导入时启用 \[Use Time 0 as Reference Pose\]，或在 DCC 工具中修复绑定姿势。

* * *

骨架网格体中存在未被加权到骨骼的顶点。这些顶点将被完整地加权到根骨骼。

* * *

输入网格体拥有不含三角形的分段。该网格体可能无法正常渲染。

* * *

输入网格体顶点过多。生成的网格体将损坏！

考虑添加额外材质，将源网格体拆分为较小的体块。

* * *

如 \[Create Physics Asset\] 为开启状态，它将尝试创建物理资源。

如果出现以下情况则可能失败：

1.  导入器创建骨架网格体失败（因此没有用于构建物理资源的骨骼）。
    
2.  网格体太小，物理资源创建默认设置无法应用到它上面。
    

如失败，可在导入后创建物理资源。

点击右键打开快捷菜单，选择 Skeletal Mesh -> Create...-> Create Physics Asset。之后便可调整创建物理资源的设置，便于适应骨架网格体的大小。

* * *

导入器尝试重新创建骨架但失败。原因是存在相同命名的资源，但其为不同类型的资源（如静态网格体）。尝试导入到不同的文件夹或使用不同命名。

* * *

骨架网格体骨骼过多。虚幻引擎当前支持的最大骨骼数为 65536。

* * *

骨架网格体不含 UV 集。创建一个默认集。

* * *

新网格体缺少 LOD 所需的骨骼。确保这些骨骼存在于新网格体中。

* * *

导入 LOD 失败。请检查出现的其他警告/错误信息。

* * *

LOD 中的根骨骼命名与原始网格体根骨骼命名不同。确保两个根骨骼命名相符。

* * *

新网格体的 LOD 骨骼应同样存在于原始网格体中。如它拥有多余的骨骼，导入器将无法匹配。

* * *

新网格体的 LOD 骨骼层级应和原始骨骼层级相符。特定骨骼的父项不匹配。

* * *

导入网格体 LOD 的部分顶点拥有多个影响。如果需要软顶点变形，请在编辑器 INI 文件中将 CheckSingleInfluenceLOD 设为 False。

* * *

网格体 LOD 缺少套接字所需的骨骼。这可能在 Actor 切换至 LOD 时引起游戏穿帮。

* * *

无法找到 LOD 的变形目标。

* * *

### 动画

网格体在描述中包含根骨骼，但动画不包含此骨骼轨迹。动画数据应至少包含根骨骼轨迹。

-   确定动画 FBX 是否应用于此特定骨架。
-   确定原始网格体拥有和动画相同的骨骼层级。

* * *

构建骨架创建动画轨迹失败。

* * *

无法找到动画轨迹。

* * *

动画轨迹长度为零。可尝试通过时间选项中的不同选项解决。

1.  Exported Time：找到场景的本地开始和结束时间
2.  Animated Time：找到根的动画时间
3.  Set Range：设置帧的范围

* * *

动画的根骨骼和导入动画所对应骨架的根骨骼不匹配。动画文件是否对应该骨架？

* * *

动画包含重复的骨骼。

* * *

动画包含骨架中不存在的骨骼。

* * *

动画不含有效动画轨迹、录制、或 blendshape。

* * *

出现此问题的原因可能是使用了剪切或其他导入器不支持的变形形式。数学错误也可能造成此问题。如动画在 Persona 中播放正常，即可无视此警告。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [泛型](/documentation/zh-cn/unreal-engine/fbx-import-errors-in-unreal-engine#%E6%B3%9B%E5%9E%8B)
-   [网格体](/documentation/zh-cn/unreal-engine/fbx-import-errors-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [静态网格体](/documentation/zh-cn/unreal-engine/fbx-import-errors-in-unreal-engine#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [骨架网格体](/documentation/zh-cn/unreal-engine/fbx-import-errors-in-unreal-engine#%E9%AA%A8%E6%9E%B6%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [动画](/documentation/zh-cn/unreal-engine/fbx-import-errors-in-unreal-engine#%E5%8A%A8%E7%94%BB)