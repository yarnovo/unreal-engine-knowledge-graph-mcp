# 虚幻引擎地形管理模式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:11:56.350Z

---

目录

![地形管理模式](https://dev.epicgames.com/community/api/documentation/image/58d1b543-3185-4b6b-834d-db9eaf1516e8?resizing_type=fill&width=1920&height=335)

在 **管理（Manage）** 模式下，你可以创建新地形，并可以使用组件工具来修改现有地形组件。你还可以选择组件，并在 **细节（Details）** 面板中修改其属性。

有关创建地形的信息，请参阅[创建地形](/documentation/zh-cn/unreal-engine/creating-landscapes-in-unreal-engine)。

## 地形选择

在 **地形（Landscape）** 面板中，从当前位于关卡中的所有地形列表中选择想要修改的地形。

![Image of the Landscape dropdown menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26b0d8b2-bd72-4540-b1ee-bbeb7699085e/01-landscape-dropdown-menu.png "Landscape dropdown menu")

**要选择地形：**

-   在地形（Landscape）面板中，点击 **地形编辑器（Landscape Editor）** 中的 **地形（Landscape）** 下拉框，可显示当前位于地图中的所有地形的列表。
-   选择想要编辑的地形。

从列表中选择一个地形会激活该地形。所有后续编辑都将应用于该地形。

## 组件

**组件** 是任何地形Actor的构建块。你可以通过组件工具使用它们，并在关卡编辑器的 **细节（Details）** 面板中单独调节它们的属性。

### 组件工具

下面所述的工具将作用于当前选中的地形的组件关卡。

#### 选择

![The Landscape Select button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f57e421f-8f7a-44f2-889d-79aa29ac4fe0/02-landscape-select-button.png "Landscape Select button")

**选择（Selection）** 工具用于选择地形组件，以便后续用于其他工具，例如，将组件移到流送关卡或删除组件。

**控制**

**操作**

**单击鼠标左键**

切换组件选择。

**Shift+单击鼠标左键**

取消选择组件。

选择光标始终限制于一个组件：

![Image of the Landscape Selection cursor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdd114cc-6f72-4244-9fef-afc385e8e8a8/03-landscape-selection-cursor.png "Landscape Selection cursor")

当选择组件后，它们会显示有红色阴影：

![Image of selected Components](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d98b758d-4087-4ac5-b95c-839acbfd3890/04-selected-components.png "Image of selected Components")

选项

说明

**清除组件选择（Clear Component Selection）**

清除当前选择的组件。

#### 添加

![Add Component button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b225c81-117a-4371-9370-3b05f104295b/05-add-component-button.png "Add Component button")

**添加（Add）** 工具为当前地形创建新组件，一次创建一个。

**控制**

**操作**

**单击鼠标左键**

添加新组件。

当"添加地形组件（Add Landscape Component）"工具处于活跃状态时，光爆显示一个绿色线框，这里就是可以添加新组件的地方：

![Image of green wireframe Add Component cursor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cdae059-3cc1-4cf2-b136-a9a1c23e6561/06-component-cursor.png "Add Component cursor")

使用该工具在光标所在位置添加新组件：

![Adding a Component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb7ce2c0-d089-4e47-b798-bf4dd102959d/07-adding-a-component.png "Adding a Component")

#### 删除

![Delete Component button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a81703e-cfbd-4169-8cd0-9ecea976f386/08-delete-component-button.png "Delete Component button")

**删除（Delete）** 工具删除所选的所有组件。

**控制**

**操作**

**单击鼠标左键**

删除被"选择（Selection）"工具高亮的组件。如果当前未选择组件，则删除将光标移到上面而高亮显示的组件。

![Deleting currently selected Components](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0247125-df77-41eb-abb5-2852f85dbf43/09-deleting-currently-selected-components.png "Deleting currently selected Components")

使用该工具移除所选组件：

![Landscape Components deleted](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3df0827e-fcbf-4e40-ade1-848c14b3f97f/10-landscape-components-deleted.png "Landscape Components deleted")

#### 移动关卡

![Move Level button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d87f622-2116-4e92-8c46-540bf6532174/11-move-level-button.png "Move Level button")

该工具将使用"选择（Selection）"工具选中的组件移到当前流送关卡。这样可以将地形分段移到流送关卡，便于它们随着关卡流入和流出，达到优化地形性能的目的。

当流送关卡可见时，地形渲染所有组件：

![Selection visible in streaming level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7a512bb-743e-4c91-bb49-1690f092d555/12-selection-visible-in-streaming-level.png "Selection visible in streaming level")

要切换关卡可视性，在 **关卡（Levels）** 面板（通过关卡编辑器的 **窗口（Window）** 菜单访问）中，单击该关卡的眼睛图标（![Level Window Eye Icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76b5b884-84a3-44e8-9ae1-4962c8d5e6c0/13-level-window-eye-icon.png "Level Window Eye Icon")）。这样会导致不再渲染该关卡中的组件：

![Selection not visible](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6ab5cb0-3874-416d-b9fa-2521603cfbaf/14-selection-not-visible.png "Selection not visible")

#### 编辑样条

![Edit Splines button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ce53df6-c0b6-43d5-851c-515c5035f375/15-edit-splines-button.png)

**地形样条** 是一种灵活的系统，可创建需要与地形相符的任何线性特征，甚至可通过拖拉来更好地构建这些特征。在地形工具中使用样条工具可创建和编辑地形样条。

![Editing Splines on a Landscape](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/553a36c1-de5c-4d8e-81c2-2e9e338f0c9a/16-editing-splines-landscape.png "Editing Splines on a Landscape")

有关如何创建和修改样条曲线的信息，请参阅[地形样条线](/documentation/zh-cn/unreal-engine/landscape-splines-in-unreal-engine)。

### 组件属性

你可以在 **细节（Details）** 面板中单独设置组件属性，包括LOD和组件特定材质。

#### 组件LOD

你也可以为所选组件设置LOD，意味着单个组件可以有其自己的LOD设置。

**要为所选组件设置LOD：**

1.  选择想要设置其LOD的组件。有关选择组件的信息，请参阅[选择](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine#%E9%80%89%E6%8B%A9)。
    
2.  在 **细节（Details）** 面板的 **地形组件（Landscape Component）** 下面，调整 **强制LOD（Forced LOD）** 和 **LOD偏差（LODBias）** 设置以获得想要的结果。
    
    ![Changing ForcedLOD and LODBias in the Details panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/384d3a77-a9b2-40d5-be6b-0261afa35e07/17-landscape-component-lod.png "ForcedLOD and LODBias in the Details panel")

#### 组件材质覆盖

你可以设置所选组件的材质覆盖，这意味着单个组件可以分配到与其地形不同的材质。

**要为所选组件设置材质覆盖：**

1.  选择要为其设置不同材质的组件。有关选择组件的信息，请参阅[选择](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine#%E9%80%89%E6%8B%A9)。
    
2.  在 **内容浏览器** 中，查找并选择你想要使用的材质。
    
3.  在关卡编辑器 **细节（Details）** 面板的 **地形组件（Landscape Component）** 下面，单击"分配（Assign）"箭头图标（![Assign](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a25f9a41-f476-4019-b054-ec3d421a61ab/18-assign.png "Assign")），以将该材质分配给所选组件。
    
    ![Override Material field in the Details panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a02ee1c3-179b-4a4f-bf27-c701f5baebf4/19-override-material-details-panel.png)

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [地形选择](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine#%E5%9C%B0%E5%BD%A2%E9%80%89%E6%8B%A9)
-   [组件](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine#%E7%BB%84%E4%BB%B6)
-   [组件工具](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine#%E7%BB%84%E4%BB%B6%E5%B7%A5%E5%85%B7)
-   [选择](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine#%E9%80%89%E6%8B%A9)
-   [添加](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine#%E6%B7%BB%E5%8A%A0)
-   [删除](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine#%E5%88%A0%E9%99%A4)
-   [移动关卡](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E5%85%B3%E5%8D%A1)
-   [编辑样条](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine#%E7%BC%96%E8%BE%91%E6%A0%B7%E6%9D%A1)
-   [组件属性](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine#%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7)
-   [组件LOD](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine#%E7%BB%84%E4%BB%B6lod)
-   [组件材质覆盖](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine#%E7%BB%84%E4%BB%B6%E6%9D%90%E8%B4%A8%E8%A6%86%E7%9B%96)