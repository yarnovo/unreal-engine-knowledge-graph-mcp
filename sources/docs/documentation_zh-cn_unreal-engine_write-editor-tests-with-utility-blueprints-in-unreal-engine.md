# 在虚幻引擎中使用工具蓝图编写编辑器测试 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/write-editor-tests-with-utility-blueprints-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:40:37.865Z

---

目录

![使用工具蓝图编写编辑器测试](https://dev.epicgames.com/community/api/documentation/image/2794c43d-7e49-41e5-92ab-0509ef02409a?resizing_type=fill&width=1920&height=335)

你需要用到 **EditorTests** 插件。要将其启用，请执行以下步骤：

1.  选择 **编辑（Edit）>插件（Plugins）** ，打开 **插件（Plugin）** 面板。
2.  使用搜索栏找到该插件。
3.  启用对应复选框。
4.  重启虚幻编辑器。

你可以使用[编辑器工具蓝图](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints)在编辑器中创建自动化测试脚本。

## 创建编辑器工具蓝图的测试

要创建编辑器工具蓝图，请点击 **内容浏览器（Content Browser）** 中的 **添加（Add）** 按钮，选择 **编辑器工具（Editor Utilities） > 编辑器工具蓝图（Editor Utility Blueprint）** ，然后在 **选择父类（Pick Parent Class）** 窗口中搜索 "EditorUtilityTest"。

因为资产路径将用于测试的命名，请按以下格式为资产适当命名：`Project.Blueprints.EditorUtilities.<内容路径>.<资产名称>` 。

## 实现编辑器工具蓝图的测试

编辑器工具蓝图默认有两条事件建议：

-   **准备测试（Prepare Test）** - 用于在开始测试前执行必要设置，然后调用 **完成准备测试（Finish Prepare Test）** 。如果此事件失败或超时， **开始测试（Start Test）** 事件将不会被调用。
-   **开始测试（Start Test）** - 主事件。调用此事件后，你就可以使用普通的工具蓝图节点，然后调用 **结束测试（Finish Test）** 从而将测试结束。

必须调用 **结束测试（Finish Test）** ，否则测试将超时。你可以重载 **已完成测试（Finished Test）** 函数，从而指定测试完成时的附加说明。代码执行必须是阻塞式的。

你可以在资产的 **细节（Details）** 面板中设置超时和元数据。

## 使用编辑器工具测试来测试编辑器工具蓝图

你可创建将相应编辑器工具蓝图实例化的编辑器工具测试蓝图，从而进行自动测试。

在蓝图图表中，添加 **构造（Construct）** 节点，并将 **类（Class）** 设置为相关的编辑器工具类。之后你就可以调用任意类函数。

你可以将 **构造（Construct）** 节点的返回值存储在变量中，以便多次调用而无需重新实例化。

-   [testing](https://dev.epicgames.com/community/search?query=testing)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)
-   [automation test framework](https://dev.epicgames.com/community/search?query=automation%20test%20framework)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建编辑器工具蓝图的测试](/documentation/zh-cn/unreal-engine/write-editor-tests-with-utility-blueprints-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%BC%96%E8%BE%91%E5%99%A8%E5%B7%A5%E5%85%B7%E8%93%9D%E5%9B%BE%E7%9A%84%E6%B5%8B%E8%AF%95)
-   [实现编辑器工具蓝图的测试](/documentation/zh-cn/unreal-engine/write-editor-tests-with-utility-blueprints-in-unreal-engine#%E5%AE%9E%E7%8E%B0%E7%BC%96%E8%BE%91%E5%99%A8%E5%B7%A5%E5%85%B7%E8%93%9D%E5%9B%BE%E7%9A%84%E6%B5%8B%E8%AF%95)
-   [使用编辑器工具测试来测试编辑器工具蓝图](/documentation/zh-cn/unreal-engine/write-editor-tests-with-utility-blueprints-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%BC%96%E8%BE%91%E5%99%A8%E5%B7%A5%E5%85%B7%E6%B5%8B%E8%AF%95%E6%9D%A5%E6%B5%8B%E8%AF%95%E7%BC%96%E8%BE%91%E5%99%A8%E5%B7%A5%E5%85%B7%E8%93%9D%E5%9B%BE)