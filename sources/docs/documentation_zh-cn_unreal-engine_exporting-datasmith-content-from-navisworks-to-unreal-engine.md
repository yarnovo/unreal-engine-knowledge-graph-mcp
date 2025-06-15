# 将Datasmith内容从Navisworks导出到虚幻引擎 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-navisworks-to-unreal-engine
> 
> 生成时间: 2025-06-14T19:05:45.863Z

---

目录

![从Navisworks中导出Datasmith内容](https://dev.epicgames.com/community/api/documentation/image/aaa1b5e6-6c2e-4d93-8bf0-cce84f363e75?resizing_type=fill&width=1920&height=335)

## 从功能区菜单导出

安装 **用于Navisworks的Datasmith导出器插件** 后，界面顶部的功能区菜单中将新增一个 **虚幻Datasmith（Unreal Datasmith）** 选项卡：

![添加到功能区菜单的虚幻Datasmith选项卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/496618f1-adb1-4a5a-a4da-5c9a6b8b134d/datasmithnavisexport1.png "添加到功能区菜单的虚幻Datasmith选项卡")

在隐藏了不希望导出的元素后，请按照以下步骤导出场景到（*\*.udatasmith*）类型的Datasmith文件：

在功能区菜单上点击Datasmith导出（Datasmith Export）按钮，打开导出面板：

![Navisworks中的Datasmith导出器对话框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e790b1d-b244-443a-881f-5657047b811c/datasmithnavisorigin2.png "Navisworks中的Datasmith导出器对话框")

名称

说明

合并（Merge）

选择待合并元素的对象树级别，以便合并生成静态网格体。要了解更多信息，请参阅[在Navisworks中使用Datasmith](/documentation/zh-cn/unreal-engine/using-datasmith-with-navisworks-in-unreal-engine)。

原点（Origin）

指定场景的原点。虚幻引擎中场景的原点为0,0,0。

在导出（Export）面板中设置对象合并的级别和原点，然后点击 **导出（Export）** 按钮。

![保存文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a8c061e-36f1-4dbf-b0e5-c45442b6c182/datasmithnavisexport3.png "保存文件")

浏览到你希望保存导出文件的位置，设置文件名，然后点击"保存（Save）"。

## 使用Python脚本导出

可使用Python脚本从Navisworks批量导出Datasmith内容。可尝试该示例

```cpp

           import sys

           import clr

           # 添加Navisworks程序集DLL的位置
           sys.path.append(r'C:\Program Files\Autodesk\Navisworks Manage 2022')

           # 添加Navisworks程序集
           clr.AddReference('Autodesk.Navisworks.Api')
           clr.AddReference('Autodesk.Navisworks.Automation')

           from Autodesk.Navisworks.Api import *
           from Autodesk.Navisworks.Api.Automation import *

           navisworks_app = NavisworksApplication()  # Create an app instance

           try:
               source_fpath = r'C:\Program Files\Autodesk\Navisworks Manage 2022\Samples\snowmobile.nwd'

               navisworks_app.OpenFile(source_fpath, [])

               print(f'Exporting {source_fpath}...', end='')
               if 0 == navisworks_app.ExecuteAddInPlugin('DatasmithNavisworksExporter.EpicGames', [
                   r'C:\temp\test.udatasmith',
                   'Merge=8',  # merge hierarchies up to depth 8
                   'Origin=10, 20.0, 300.0',  # origin location
                   'Hello=world',  # invalid option
               ]):
                   print("DONE")
               else:
                   print("FAILED")
           finally:
               navisworks_app.Dispose()  # Exit app
               # 也可保持打开状态（例如，如果需要查看应用程序控制台输出以进行调试）
               # navisworks_app.StayOpen()

```

## 最终结果

现在你应该可以试着将 *.udatasmith* 文件导入虚幻引擎了。参阅[将Datasmith内容导入虚幻引擎](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine)。在导入过程中，如果需要对数据进行清理、合并或其他修改操作，请参阅[Visual Dataprep](/documentation/zh-cn/unreal-engine/dataprep-import-customization-in-unreal-engine)。

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [navisworks](https://dev.epicgames.com/community/search?query=navisworks)
-   [how-to](https://dev.epicgames.com/community/search?query=how-to)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [从功能区菜单导出](/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-navisworks-to-unreal-engine#%E4%BB%8E%E5%8A%9F%E8%83%BD%E5%8C%BA%E8%8F%9C%E5%8D%95%E5%AF%BC%E5%87%BA)
-   [使用Python脚本导出](/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-navisworks-to-unreal-engine#%E4%BD%BF%E7%94%A8python%E8%84%9A%E6%9C%AC%E5%AF%BC%E5%87%BA)
-   [最终结果](/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-navisworks-to-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)

相关文档

[

Datasmith导入流程

![Datasmith导入流程](https://dev.epicgames.com/community/api/documentation/image/70c6d5d3-5baf-4f19-864b-78101dc6d7f2?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/datasmith-import-process-in-unreal-engine)