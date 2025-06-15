# 虚幻引擎FBX Test Builder | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fbx-test-builder-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:41:04.279Z

---

目录

![FBX Test Builder](https://dev.epicgames.com/community/api/documentation/image/0817a0df-4c6e-460b-ac3d-b589ee8b7072?resizing_type=fill&width=1920&height=335)

FBX Test Builder是[自动化系统](/documentation/zh-cn/unreal-engine/automation-test-framework-in-unreal-engine)的一部分，使用该插件可为各个FBX文件创建自己的测试。FBX Test Builder为单个FBX文件创建测试计划（Test Plan）。使用该计划，可以执行导入或重新导入操作，并对照预期结果数组进行检查。创建的测试计划以JSON文件的形式存储，文件名与所测试的FBX文件相同，但扩展名不同。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15d8ca35-06a4-43aa-a590-6343f17e916d/fbxtestbuilder.png)

使用FBX Test Builder创建测试计划，可以对FBX文件执行选定的操作，然后对照预期结果数组检查，以确定是否通过已完成的测试。

## 启用插件

在开始构建FBX自动化测试之前，需要先启用 **FBXAutomationTestBuilder** 插件。为此，请转至 **编辑（Edit）** > **插件（Plugins）** > **测试（Testing）**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b397d57-052e-4993-b014-c960f6562b31/enablefbxtestbuilderplugin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b397d57-052e-4993-b014-c960f6562b31/enablefbxtestbuilderplugin.png)

单击查看大图。

在启用插件后，需要重新启动虚幻引擎才能对其进行访问。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce8fb985-2fa2-4ff0-8a3b-5d17a9f0b9de/restart.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce8fb985-2fa2-4ff0-8a3b-5d17a9f0b9de/restart.png)

单击查看大图。

要访问FBX Test Builder，请从"文件"菜单中选择 **窗口（Window）** > **自动化工具（Automation Tools）** > **FBX Test Builder**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b58d6329-3a9c-4a3a-b614-35c9ede72f12/openfbxtestbuilder.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b58d6329-3a9c-4a3a-b614-35c9ede72f12/openfbxtestbuilder.png)

单击查看大图。

## 创建测试计划

使用FBX Test Builder时，它执行选定的 **Action** （或操作），并通过一系列 **预期结果（Expected Results）** 确定给定FBX文件是否通过测试。这组操作和结果称为 **测试计划（Test Plan）**。

### 操作

每个测试计划可以执行五个主要操作。每个操作都有其自己的条件，只有满足条件才能正确执行测试。 这些操作及其条件概述如下：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87393b61-ef08-4639-a93a-f9a4aadfb02f/actions.png)

操作

步骤

**导入（Import）**

-   导入FBX文件
-   验证预期结果

**重新导入（Reimport）**

-   此操作必须在未删除所导入资源的导入测试计划之后运行
-   重新导入FBX文件
-   验证预期结果

**添加LOD（细节层级）（Add LOD (Level of Detail)）**

-   此操作必须在未删除所导入资源的导入测试计划之后运行
-   FBX文件名必须以 **\_lod00** 结尾
-   必须有一个同名的FBX文件以 **\_lod0X** 结尾（其中 **X** 大于 **0**)
-   添加LOD
-   验证预期结果

**重新导入LOD（细节层级）（Reimport LOD (Level of Detail)）**

-   使用 **导入（Import）** 或 **添加LOD（Add LOD）** 操作再次导入之前已导入的LOD。

**导入加载（Import Reload）**

-   导入FBX文件
-   保存文件包
-   从内存中卸载创建的UObject
-   重新加载已保存的包
-   验证预期结果

### 预期结果

对于每个测试计划，评估 **预期结果（Expected Results）** 列表以确定是否通过测试。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/901f14f1-8fe1-44a6-9372-eae0ebfdb444/expectedresult.png)

设置

说明

**预期预设类型（Expected Presets Type）**

应检查的预定义数据。[详见下文](/documentation/zh-cn/unreal-engine/fbx-test-builder-in-unreal-engine#%E9%A2%84%E6%9C%9F%E9%A2%84%E8%AE%BE%E7%B1%BB%E5%9E%8B)

**预期预设数据整型（Expected Presets Data Integer）**

输入应为指定的FBX文件检查的预期整型数值。

**预期预设数据浮点型（Expected Presets Data Float）**

输入应为指定的FBX文件检查的预期浮点型数值。

**预期预设数据双精度浮点型（Expected Presets Data Double）**

输入应为指定的FBX文件检查的预期双精度浮点型型数值。

**预期预设数据字符串型（Expected Presets Data String）**

输入应为指定的FBX文件检查的预期字符串型数值。

#### 预期预设类型

检查类型

说明

要求的数据类型

**错误数量（Error Number）**

数据应包括错误数量\[int0\]。

整型

**警报数量（Error Number）**

数据应包括警报数量\[int0\]。

整型

**创建的静态网格体数量（Created Static Mesh Number）**

数据应包括创建的静态网格体数量\[int0\]。

整型

**创建的骨架网格体数量（Created Skeletal Mesh Number）**

数据应包括创建的骨架网格体数量\[int0\]。

整型

**创建的材质数量（Materials Created Number）**

数据应包括在目标"内容"文件夹中创建的材质的数量\[int0\]。

整型

**材质槽导入名称（Material Slot Imported Name）**

数据应是槽索引\[int0\]和预期初始导入材质槽名称\[string0\]。

整型和String型

**顶点数量（Vertex Number）**

数据应是所有LOD的顶点总数\[int0\]。

整型

**LOD数量（LOD Number）**

数据应是LOD预期数量\[int0\]。

整型

**顶点数LOD（Vertex Number LOD）**

数据应是LOD索引\[int0\]和LOD的总顶点数\[int1\]。

两个整型

**网格体材质数量（Mesh Materials Number）**

数据应包括网格体索引的材质数量\[int0\]。

整型

**网格体LOD片段数量（Mesh LOD Section Number）**

数据应是LOD索引\[int0\]和网格体的预期片段数量\[int1\]。

两个整型

**网格体LOD片段顶点数量（Mesh LOD Section Vertex Number）**

数据应是LOD索引\[int0\]、片段索引\[int1\]和顶点预期数量\[int2\]。

三个整型

**网格体LOD片段三角形数量（Mesh LOD Section Triangle Number）**

数据应是LOD索引\[int0\]、片段索引\[int1\]和三角形预期数量\[int2\]。

三个整型

**网格体LOD片段材质名称（Mesh LOD Section Material Name）**

数据应是LOD索引\[int0\]、片段索引\[int1\]和材质预期名称\[string0\]。

整型和String型

**网格体LOD片段材质索引（Mesh LOD Section Material Index）**

数据应是LOD索引\[int0\]、片段索引\[int1\]和网格体材质的预期材质索引\[int2\]。

三个整型

**网格体LOD片段材质导入名称（Mesh LOD Section Material Imported Name）**

数据应是LOD索引\[int0\]、片段索引\[int1\]和预期初始导入材质槽名称\[string0\]。

两个整型和String型

**LOD UV信道数量（LOD UV Channel Number）**

数据应是LOD索引\[int0\]和指定LOD的UV信道数量\[int1\]。

两个整型

**骨骼数量（Bone Number）**

数据应包括创建的骨骼数量\[int0\]。

整型

**骨骼位置（Bone Position）**

数据应包括骨骼索引\[int0\]以及XYZ位置\[float0、float1和float2\]。或者，可以传递公差值\[float3\]。

整型和四个浮点型

**动画帧数（Animation Frame Number）**

数据应包括帧数\[int0\]。

整型

**动画长度（Animation Length）**

数据应包括动画长度\[float0\]。

浮点型

#### 设置预期结果

为设置预期结果，我们使用包含6种不同材质和纹理的盒体网格体的FBX示例作为测试用例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26dcce9d-a21f-4f7f-a1da-824f89c6765a/boxfbx1.png)

1.  单击 **添加（Add）**（+）按钮添加"预期结果"，然后选择要用于检查的 **预期预设类型（Expected Preset Type）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84cb1e13-97c2-4c0f-9b57-094c8a84bee5/er_addexpectedresult.png)
2.  选择与要测试的"预期预设类型"对应的 **预期预设数据（Expected Presets Data）** 类型。在此示例中，选择 **网格体材质数量（Mesh Materials Number）** 类型， 以检查导入时FBX是否包含6种材质。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b87a056f-66cb-4d06-b714-9b8a4ceafac9/er_selectexpectedpresettype.png)
3.  **网格体材质数量（Mesh Materials Number）** 预设类型只有一个整型数据（请使用预设工具提示或以上表格，参考所需的数据）来检查导入的材质数量。单击一下 **预期预设数据整型（Expected Presets Data Integer）**， 将预期结果检查添加到数组中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92e6ce6b-3b6a-4c3e-8087-d0757b27897e/er_adddatatypeinteger.png)
4.  对于数组元素0，输入应使用FBX导入的材质数。此示例中预期的材质数量为6个。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b47c3e77-74e6-40bc-81d8-a460478e2ba9/er_integervalue.png)
5.  确保设置必要的[导入选项](/documentation/zh-cn/unreal-engine/fbx-test-builder-in-unreal-engine#%E5%AF%BC%E5%85%A5%E9%80%89%E9%A1%B9)，以便正确导入所选"预期预设类型"要求的全部内容。例如，盒体FBX需要从 FBX导入材质和纹理，因此应启用 **导入材质（Import Materials）** 和 **导入纹理（Import Textures）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e35dc650-ba29-49bd-bf56-9d0266332463/er_importmaterials.png)
6.  单击 **保存为JSON（Save JSON）** 按钮，"测试计划"将添加到"会话前端自动化"（Session Frontend Automation）选项卡中。该文件可在 **Engine/Import/FBX/\[NameOfTheFBX\]** 中找到。
    
     
    
     
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/863c09c5-50db-4c4c-b6be-e45b7abec0ae/er_savejson.png)
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/421e2ca3-ca14-44f7-b775-4ca6853f3ec7/er_automationfbxtest.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/421e2ca3-ca14-44f7-b775-4ca6853f3ec7/er_automationfbxtest.png)
    
    点击查看大图
    
    FBX 测试编辑器
    
    会话前端自动化（Session Frontend Automation）选项卡
    
7.  在运行测试后，操作系统会测试指定LOD(0)的 **网格体材质数量（Mesh Materials Number）**（6）是否与导入的资源数量相匹配。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbbc8e61-d7e6-44be-bbb6-582a620527f3/er_successful.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbbc8e61-d7e6-44be-bbb6-582a620527f3/er_successful.png)
    
    单击查看大图。
    
    如果测试失败，可以在"自动化"选项卡中选择该测试，然后在 **自动化测试结果（Automation Test Results）** 面板下查看失败的原因。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36f9af5b-c320-4752-82d5-602cf7278c56/er_failure.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36f9af5b-c320-4752-82d5-602cf7278c56/er_failure.png)
    
    单击查看大图。
    
    无论"会话前端"（Session Frontend）窗口是否打开，"消息日志"都会弹出，显示测试是成功还是失败，以及失败的原因。
    

### 导入选项

设置"预期结果测试计划"后，还必须确保将要测试的操作正确设置为导入/重新导入。 例如，如果要测试导入固定数量材质的FBX，请务必启用 **导入材质（Import Materials）**。这些选项与通过内容浏览器将资源导入编辑器时可用的选项相同。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b874065-7ef1-4b3d-b502-880d4bc3a291/importoptions.png)

有关更多信息，请参阅[FBX导入选项](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)页面。

## 创建测试计划的流程

请按照以下步骤为FBX测试创建测试计划：

1.  将要测试的FBX复制到以下位置：
    
    ```cpp
             [Unreal Engine Root Directory]/Engine/Content/FBXEditorAutomation
    		
    ```
    
2.  置于此文件夹中的任何FBX都将自动填充到 **选择FBX文件（Select an FBX file）** 下拉列表中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1073af6-4cbf-453e-bbc5-2b91d1e1fd7f/testplan_selectfbx.png)
3.  使用 **选择测试平面（Select a Test Plane）** 下拉列表选择 **创建新计划（Create new plan）**，或选择已存在的计划并进行编辑。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eaf3e110-c84d-4aa5-b06a-96819160cea5/testplan_createnewplan.png)
4.  填写以下部分。
    
    **通用：（General:）**
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2e47a3b-79c5-41df-bec9-1c4823fc29a1/testplan_general.png)
    
    -   **测试计划名称（Test Plan Name）** - 为此测试计划命名，以便使用该名称从测试计划列表中进行选择。
    -   **操作（Action）** - 选择要对FBX文件执行的操作类型。例如，导入、重新导入、添加LOD、重新导入LOD、重新导入加载等。
    -   **LOD索引（LOD Index）** - 如果使用重新导入LOD，则输入要重新导入的LOD索引。
    -   **删除文件夹资源（Delete Folder Assets）** - 是否在测试计划结束时删除导入的资源。
    
    **预期结果：（Expected Results:）**
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f0eb7ae-4d40-4e3d-abfd-0344e4409c25/testplan_expectedresult.png)
    
    -   设置[预期预设类型](/documentation/zh-cn/unreal-engine/fbx-test-builder-in-unreal-engine#%E9%A2%84%E6%9C%9F%E7%BB%93%E6%9E%9C)并填写完成测试所需的数据类型。
    
    **导入选项：（Import Options:）**
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/902bdaa9-fc37-4cc3-85c9-0235dc84d048/testplan_importoptions.png)
    -   设置成功导入此特定FBX以进行测试所需的[导入选项](/documentation/zh-cn/unreal-engine/fbx-test-builder-in-unreal-engine#%E5%AF%BC%E5%85%A5%E9%80%89%E9%A1%B9)。
5.  单击 **保存为JSON（Save JSON）** 按钮保存测试计划，并将其添加为可在自动测试期间针对此FBX文件运行的测试。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e495caeb-a89f-444d-ab07-2073de6b353c/testplan_savejson.png)

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用插件](/documentation/zh-cn/unreal-engine/fbx-test-builder-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%8F%92%E4%BB%B6)
-   [创建测试计划](/documentation/zh-cn/unreal-engine/fbx-test-builder-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%B5%8B%E8%AF%95%E8%AE%A1%E5%88%92)
-   [操作](/documentation/zh-cn/unreal-engine/fbx-test-builder-in-unreal-engine#%E6%93%8D%E4%BD%9C)
-   [预期结果](/documentation/zh-cn/unreal-engine/fbx-test-builder-in-unreal-engine#%E9%A2%84%E6%9C%9F%E7%BB%93%E6%9E%9C)
-   [预期预设类型](/documentation/zh-cn/unreal-engine/fbx-test-builder-in-unreal-engine#%E9%A2%84%E6%9C%9F%E9%A2%84%E8%AE%BE%E7%B1%BB%E5%9E%8B)
-   [设置预期结果](/documentation/zh-cn/unreal-engine/fbx-test-builder-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E9%A2%84%E6%9C%9F%E7%BB%93%E6%9E%9C)
-   [导入选项](/documentation/zh-cn/unreal-engine/fbx-test-builder-in-unreal-engine#%E5%AF%BC%E5%85%A5%E9%80%89%E9%A1%B9)
-   [创建测试计划的流程](/documentation/zh-cn/unreal-engine/fbx-test-builder-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%B5%8B%E8%AF%95%E8%AE%A1%E5%88%92%E7%9A%84%E6%B5%81%E7%A8%8B)