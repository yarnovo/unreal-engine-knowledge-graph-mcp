# 虚幻引擎XGen毛发创建指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/xgen-guidelines-for-hair-creation-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:01:20.444Z

---

目录

![XGen Groom创建指南](https://dev.epicgames.com/community/api/documentation/image/10ce2400-77ce-42ae-a4b7-04827674cd7b?resizing_type=fill&width=1920&height=335)

本指南演示如何设置从Maya的[XGen毛发创建系统](http://help.autodesk.com/view/MAYAUL/2018/ENU/?guid=GUID-C6324505-BD4F-4FD2-B340-CF99158D4819)导入Groom发束到虚幻引擎中。其中我们会用到一组属性，它们在[Alembic以及Grooms规格](/documentation/zh-cn/unreal-engine/using-alembic-for-grooms-in-unreal-engine)这篇文档中有所介绍。

本指南使用Maya 2018.6创建资产。

## 转换旧有XGen说明

### 将导线转换为NURBS曲线

请参考下列步骤将Groom的导线转化为曲线，以便保存一组曲线并匹配你要转换的导线。

1.  将Maya菜单集设为 **建模（Modeling）**，以便查看可用的正确菜单选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d616753-0ceb-43ef-855e-8e997d77a6fa/menusetselection.png)
2.  从主菜单中，点击 **生成（Generate）** 下拉列表并选择 **XGen编辑器（XGen Editor）**。
    
3.  在 **XGen** 窗口中，使用 **工具（Utilities）** 选项卡选择 **曲线的导线（Guides to Curves）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e2b1e3a-ab59-4f61-9bba-a84681960979/xgen_utilities.png)
4.  点击 **创建曲线（Create Curves）**。
    

完成后，groom的输出将类似下图：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6eed1ed-a839-4bd1-8640-a7ca4ef70aa7/guidestonurbscurvesoutput.png)

### 将Groom转换为XGen交互式Groom

若使用旧版XGen说明，需将groom转换为 **XGen交互式Groom（XGen Interactive Groom）**。步骤如下：

1.  选择XGen Description节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0429df39-9b73-4da3-b122-f1966f6d20b1/xgendescriptionnodes.png)
2.  在 **建模（Modeling）** 菜单集中使用主菜单点击 **生成（Generate）** 下拉列表，然后选择 **转换为交互式Groom（Convert to Interactive Groom）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2b9eb56-6695-462c-8b71-dbdadad80464/xgeninteractivegroom.png)

#### 将样条说明导出到NURBS曲线

请遵循以下步骤，将你选中的样条说明导出成Alembic文件，该文件可以与插入的头发一起导入为NURBS曲线。

1.  选中你的XGen Spline Description节点。在 **建模（Modeling）** 菜单集中使用主菜单点击 **生成（Generate）** 下拉列表。然后在列表中选择 **缓存（Cache）> 导出缓存（Export Cache）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef54df61-c38e-4197-af5c-6afa29ff0d17/splinedesctonurbscurve_exportcache.png)
2.  在 **导出缓存（Export Cache）** 窗口中进行以下设置：
    
    -   **缓存时间帧（Cache Time Frame）：** 设置成 **当前帧（Current Frame）**
    -   **多个变换（Multiple Transforms）：** 禁用
    -   **写入最终宽度（Write Final Width）：** 启用
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43b0d1a3-e053-4249-963e-39c81e0c3f9f/splinedesctonurbscurve_exportcachewindow.png)
3.  为文件输入名称，文件类型选择 **Alembic**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59bd818f-6348-4ef8-bb34-4a593ca53094/splinedesctonurbscurve_exportcachefile.png)
4.  点击 **导出（Export）**。
5.  在 **文件（File）** 菜单中选择 **导入（Import）**。这会打开 **导入（Import）** 窗口，然后将Alembic（'.abc'）文件放入场景。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5913fc7-651b-443a-93f1-04f26d16d133/splinedesctonurbscurve_importalembic.png)

导入完成后，XGen样条说明就应该已经被导出为Alembic文件，并且将内插毛发作为NURBS曲线导入。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfe051a2-8532-4187-87a5-70022221726a/splinedesctonurbscurve_output.png)

## 创建属性

### 创建组ID属性

可在一个或多个组中导出内插毛发。虚幻引擎中可识别此类组，用于唯一材质指定。

创建组ID属性时使用以下脚本：

```cpp
from maya import cmds

attr_name = 'groom_group_id'

# 注意：更改以下命名以反映节点场景。
groups = ['hair_brows_splineDescription1|SplineGrp0', 'hair_lashes_splineDescription1|SplineGrp0', 'hair_head_splineDescription1|SplineGrp0']

for groom_group_id, group_name in enumerate(groups):
    
    # 获取xgGroom下的曲线
    curves = cmds.listRelatives(group_name, ad=True, type='nurbsCurve')
    
    # 用组id标记组
    cmds.addAttr(group_name, longName=attr_name, attributeType='short', defaultValue=groom_group_id, keyable=True)
    
    # 添加属性范围
    # 强制Maya的alembic将数据导出为GeometryScope::kConstantScope
    cmds.addAttr(group_name, longName='{}_AbcGeomScope'.format(attr_name), dataType='string', keyable=True)
    cmds.setAttr('{}.{}_AbcGeomScope'.format(group_name, attr_name), 'con', type='string')
```

### 创建导线属性

当你为groom创建导线属性时，只有标记为 **导线（guide）** 的曲线才会被用于虚幻引擎中的模拟。若未在Alembic文件中指定导线，在导入Unreal Engine的过程中，一定比例的内插毛发将被内部标记为导线。

导入无导线的groom时，使用[Groom导入选项](/documentation/404)可设置标记为导线的内插毛发比例。默认仅10%的毛发用作导线。

创建导线属性时使用以下脚本：

```cpp
from maya import cmds

attr_name = 'groom_guide'

# 获取xgGroom下的曲线
curves = cmds.listRelatives('xgGroom', ad=True, type='nurbsCurve')

# 新建组
guides_group = cmds.createNode('transform', name='guides')

# 将组标记为groom_guide
cmds.addAttr(guides_group, longName=attr_name, attributeType='short', defaultValue=1, keyable=True)

# 强制Maya的alembic将曲线导出为一个组。
cmds.addAttr(guides_group, longName='riCurves', attributeType='bool', defaultValue=1, keyable=True)

# 添加属性范围
# 强制Maya的alembic将数据导出为GeometryScope::kConstantScope
cmds.addAttr(guides_group, longName='{}_AbcGeomScope'.format(attr_name), dataType='string', keyable=True)
cmds.setAttr('{}.{}_AbcGeomScope'.format(guides_group, attr_name), 'con', type='string')

# 导线组下方的父曲线
对于曲线中的曲线：
    cmds.parent(curve, guides_group, shape=True, relative=True)
```

#### Groom\_Width属性

在Maya中，宽度值有一个特殊的行为，与其他DCC应用不同的是，它可以遵循[Alembic以及Grooms规格](/documentation/zh-cn/unreal-engine/using-alembic-for-grooms-in-unreal-engine)中的内容，来获取它们并使用它们来构建groom。

Maya可以直接在曲线上导出宽度值，因此不需要导出自定义的 `groom_width` 属性；导入器会自动将这些值转换为该属性。如果 `groom_wdith` 属性在导入虚幻引擎时与groom一起存在，则它不会被覆盖。如果 `groom_wdith` 没有被指定，或者不能从宽度值转换，那么生成器将退回使用1厘米。

## 从Maya导出到Alembic

1.  在Maya中，选择要导出的导线和Group\_ID曲线。
    
    每个节点应拥有唯一名称。
    
2.  在 **建模（Modeling）** 菜单集中，使用主菜单点击 **缓存（Cache）** 下拉列表，然后选择 **Alembic缓存（Alembic Cache）> 将选中项导出到Alembic（Export Selection to Alembic）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a94be692-73a3-4753-96e2-9158bf675e82/exporttoalembic_exportselection.png)
3.  在 **导出选中项（Export Selection）** 窗口中的 **通用选项（General Options）** 类别下，将 **缓存时间范围（Cache time range）** 设为 **当前帧（Current Frame）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89666682-63db-488c-bcd9-7969e39532e8/exporttoalembic_exportselection_currentframe.png)
4.  在 **属性（Attributes）** 类别下，输入要罗列出的 **属性（Attribute）** 命名，然后点击 **添加（Add）** 按钮。添加以下模式属性：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fd179c9-308f-487d-bb15-7081c6c919df/exporttoalembic_exportselection_addattributes.png)
    -   groom\_group\_id
    -   groom\_guide
5.  在 **文件名（File name）** 文本框中为文件命名，并将 **文件类型（Files of type）** 设为 **Alembic**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da913494-5269-4f25-9659-f70eab41f882/exporttoalembic_exportselection_filenametype.png)
6.  点击 **导出选中项（Export Selection）** 按钮。
    

## 将纹理应用于毛发UV

以下步骤和包含脚本可以帮助你设置自己的XGen毛发，该毛发可以导出到虚幻引擎，并且各个发束上呈现已应用的纹理。

1.  在Maya的建模菜单中，选择 **生成（Generate）** > **创建交互式Groom样条（Create Interactive Groom Splines）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/495d4e7f-b4e6-45f7-9770-b36bc0367fde/hairuv_xgen.png)
2.  你可以根据自己的偏好为项目创建导线并涂刷毛发。准备就绪后，选择 **生成（Generate）> 缓存（Cache）> 创建新缓存（Create New Cache）** 将曲线导出为 **Alembic缓存（Alembic Cache）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24ee6567-33e0-48aa-a601-76038f6a9b69/hairuv_2_xgen.png)
3.  通过隐藏或删除XGen头发以将其移除。然后，在Maya场景中，使用源网格体重新导入之前导出的毛发曲线。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1dba0e4a-85a6-4580-ae4c-0c9a923de30b/hairuv_3_xgen.png)
4.  根据你的场景，顶部曲线下将有数千条样条曲线，本例中为 **SplineGrp0**。编辑以下Python脚本，并将以下值替换为项目中的值：
    
    -   export\_directory
    -   hair\_file
    -   curve\_top\_group
    -   uv\_mesh
    
    你可以在[此处](https://epicgames.box.com/shared/static/46my2x1sueuc6hlt09ous9czx4o8fhjz.zip)下载脚本。
    
    \~~~ from maya import cmds from maya import OpenMaya import os
    

def create\_root\_uv\_attribute(curves\_group, mesh\_node, uv\_set='map1'): ''' Create "groom\_root\_uv" attribute on group of curves. '''

\# check curves group if not cmds.objExists(curves\_group): raise RuntimeError('Group not found: "{}"'.format(curves\_group))

\# get curves in group curve\_shapes = cmds.listRelatives(curves\_group, shapes=True, noIntermediate=True) curve\_shapes = cmds.ls(curve\_shapes, type='nurbsCurve') if not curve\_shapes: raise RuntimeError('Invalid curves group. No nurbs-curves found in group.') else: print "found curves" print curve\_shapes

\# get curve roots points = list() for curve\_shape in curve\_shapes: point = cmds.pointPosition('{}.cv\[0\]'.format(curve\_shape), world=True) points.append(point)

\# get uvs values = list() uvs = find\_closest\_uv\_point(points, mesh\_node, uv\_set=uv\_set) for u, v in uvs: values.append(\[u, v, 0\]) #print (str(u) + " , " + str(v) )

\# create attribute name = 'groom\_root\_uv' cmds.addAttr(curves\_group, ln=name, dt='vectorArray') cmds.addAttr(curves\_group, ln='{}\_AbcGeomScope'.format(name), dt='string') cmds.addAttr(curves\_group, ln='{}\_AbcType'.format(name), dt='string')

cmds.setAttr('{}.{}'.format(curves\_group, name), len(values), \*values, type='vectorArray') cmds.setAttr('{}.{}\_AbcGeomScope'.format(curves\_group, name), 'uni', type='string') cmds.setAttr('{}.{}\_AbcType'.format(curves\_group, name), 'vector2', type='string')

return uvs

def find\_closest\_uv\_point(points, mesh\_node, uv\_set='map1'): ''' Find mesh UV-coordinates at given points. '''

\# check mesh if not cmds.objExists(mesh\_node): raise RuntimeError('Node not found: "{}"'.format(mesh\_node))

\# check uv\_set uv\_sets = cmds.polyUVSet(mesh\_node, q=True, allUVSets=True) if uv\_set not in uv\_sets: raise RuntimeError('Invalid uv\_set provided: "{}"'.format(uv\_set))

\# get mesh as dag-path selection\_list = OpenMaya.MSelectionList() selection\_list.add(mesh\_node)

mesh\_dagpath = OpenMaya.MDagPath() selection\_list.getDagPath(0, mesh\_dagpath) mesh\_dagpath.extendToShape()

\# get mesh function set fn\_mesh = OpenMaya.MFnMesh(mesh\_dagpath)

uvs = list() for i in range(len(points)):

script\_util = OpenMaya.MScriptUtil() script\_util.createFromDouble(0.0, 0.0) uv\_point = script\_util.asFloat2Ptr()

point = OpenMaya.MPoint(\*points\[i\]) fn\_mesh.getUVAtPoint(point, uv\_point, OpenMaya.MSpace.kWorld, uv\_set)

u = OpenMaya.MScriptUtil.getFloat2ArrayItem(uv\_point, 0, 0) v = OpenMaya.MScriptUtil.getFloat2ArrayItem(uv\_point, 0, 1)

uvs.append((u, v))

return uvs

def abc\_export(filepath, node=None, start\_frame=1, end\_frame=1, data\_format='otawa', uv\_write=True):

job\_command = '-frameRange {} {} '.format(start\_frame, end\_frame) job\_command += '-dataFormat {} '.format(data\_format)

job\_command += '-attr groom\_root\_uv '

if uv\_write: job\_command += '-uvWrite '

job\_command += '-root {} '.format(node)

job\_command += '-file {} '.format(filepath)

cmds.AbcExport(verbose=True, j=job\_command)

def main():

export\_directory = 'D:/Dev/Ref' hair\_file = os.path.join(export\_directory, 'hair\_export.abc') curve\_top\_group= 'description1|SplineGrp0' uv\_mesh='pPlane1'

create\_root\_uv\_attribute( curve\_top\_group , uv\_mesh) abc\_export(hair\_file, curve\_top\_group)

main() ~~~

1.  在Maya中，使用更改后的数值运行脚本。这 *将* 生成一个新的Alembic（'.abc'）文件，该文件可以导入到虚幻引擎中。
    
2.  在虚幻引擎中，使用 **毛发** 着色模型创建新材质。在材质图表中，添加 **毛发属性（Hair Attributes）** 表达式，然后将 **根UV（Root UV）** 插入纹理样本的 **UV** 输入中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18850424-94f8-4755-a54b-402c1c7efef4/hairuv_4_xgen.png)
    
    `groom_root_uv` 属性为每个毛发指定了它所连接的底层网格UV。这个属性是可选项，如果没有指定，引擎会使用球面贴图自动生成一个根UV。
    
3.  将导入的毛发Alembic文件从内容浏览器拖到关卡中，然后向其指定毛发材质。你应该以如下形式结束：
    
    确保关卡中的毛发Alembic文件的宽度大于0。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41dcf062-8326-4b0c-acc5-e00acc4e6348/hairuv_5_xgen.png)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [hair](https://dev.epicgames.com/community/search?query=hair)
-   [metahumans](https://dev.epicgames.com/community/search?query=metahumans)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [转换旧有XGen说明](/documentation/zh-cn/unreal-engine/xgen-guidelines-for-hair-creation-in-unreal-engine#%E8%BD%AC%E6%8D%A2%E6%97%A7%E6%9C%89xgen%E8%AF%B4%E6%98%8E)
-   [将导线转换为NURBS曲线](/documentation/zh-cn/unreal-engine/xgen-guidelines-for-hair-creation-in-unreal-engine#%E5%B0%86%E5%AF%BC%E7%BA%BF%E8%BD%AC%E6%8D%A2%E4%B8%BAnurbs%E6%9B%B2%E7%BA%BF)
-   [将Groom转换为XGen交互式Groom](/documentation/zh-cn/unreal-engine/xgen-guidelines-for-hair-creation-in-unreal-engine#%E5%B0%86groom%E8%BD%AC%E6%8D%A2%E4%B8%BAxgen%E4%BA%A4%E4%BA%92%E5%BC%8Fgroom)
-   [将样条说明导出到NURBS曲线](/documentation/zh-cn/unreal-engine/xgen-guidelines-for-hair-creation-in-unreal-engine#%E5%B0%86%E6%A0%B7%E6%9D%A1%E8%AF%B4%E6%98%8E%E5%AF%BC%E5%87%BA%E5%88%B0nurbs%E6%9B%B2%E7%BA%BF)
-   [创建属性](/documentation/zh-cn/unreal-engine/xgen-guidelines-for-hair-creation-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%B1%9E%E6%80%A7)
-   [创建组ID属性](/documentation/zh-cn/unreal-engine/xgen-guidelines-for-hair-creation-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%BB%84id%E5%B1%9E%E6%80%A7)
-   [创建导线属性](/documentation/zh-cn/unreal-engine/xgen-guidelines-for-hair-creation-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%AF%BC%E7%BA%BF%E5%B1%9E%E6%80%A7)
-   [Groom\_Width属性](/documentation/zh-cn/unreal-engine/xgen-guidelines-for-hair-creation-in-unreal-engine#groom-width%E5%B1%9E%E6%80%A7)
-   [从Maya导出到Alembic](/documentation/zh-cn/unreal-engine/xgen-guidelines-for-hair-creation-in-unreal-engine#%E4%BB%8Emaya%E5%AF%BC%E5%87%BA%E5%88%B0alembic)
-   [将纹理应用于毛发UV](/documentation/zh-cn/unreal-engine/xgen-guidelines-for-hair-creation-in-unreal-engine#%E5%B0%86%E7%BA%B9%E7%90%86%E5%BA%94%E7%94%A8%E4%BA%8E%E6%AF%9B%E5%8F%91uv)