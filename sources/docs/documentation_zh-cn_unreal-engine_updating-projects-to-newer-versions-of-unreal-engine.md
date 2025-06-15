# 升级项目以兼容新版虚幻引擎 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/updating-projects-to-newer-versions-of-unreal-engine
> 
> 生成时间: 2025-06-14T18:52:45.046Z

---

目录

![升级项目以兼容新版虚幻引擎](https://dev.epicgames.com/community/api/documentation/image/60741131-3bb9-4d61-a0f6-c0b64341281d?resizing_type=fill&width=1920&height=335)

本文介绍了如何使用虚幻引擎内置的项目升级功能转换你的虚幻引擎项目，使其兼容新版引擎。

在升级项目以兼容新版虚幻引擎后，你将 \*不能\*\* 在旧版虚幻引擎中打开它。因此我们建议按照下文所述的步骤，转换一个项目副本。在确认转换的项目可正常运行后，再手动删除旧版本。

## 先决条件

此工作流程需要你的计算机安装了 **Visual Studio 2019**。

## 转换项目

请按照以下步骤转换项目：

1.  启动你想要用于转换项目的虚幻引擎版本。例如，如果你有一个虚幻引擎5项目，现在将要将其转换成虚幻引擎5.1项目，那就启动虚幻引擎5.1。
    
2.  在打开的 **虚幻项目浏览器** 窗口中，找到要转换的项目。
    
    使用搜索栏（1）按名称查找项目。注意，项目创建时使用的虚幻引擎版本会显示在项目图块（2）中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8965e94c-5371-48cb-84b3-08e965d10293/ue5_1-project-browser.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8965e94c-5371-48cb-84b3-08e965d10293/ue5_1-project-browser.png)
    
    点击查看大图
    
3.  点击项目图块将其选中，然后点击 **打开（Open）**。
    
4.  在出现的对话框中，点击 **打开副本（Open a Copy）**，让虚幻引擎为你的项目创建一个副本，并尝试升级它，并在当前版本中将其打开。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7182026e-a368-4460-9f11-5914e0066cf2/ue5_1-convert-project-open-copy.png)
    
    如果点击 **更多选项（More Options）**，你还将看到以下选项：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53f20805-bcea-4e93-b85a-25cb88693cf5/ue5_1-more-options.png)
    
    **选项**
    
    **说明**
    
    **原地转换（Convert in-place）**
    
    如果选择此项，虚幻引擎将尝试转换原始项目，而不会先为其生成副本。
    
    如果转换失败，这会导致不可逆的数据损坏和数据丢失。
    
    **跳过转换（Skip conversion）**
    
    如果选择此项，虚幻引擎会尝试直接打开项目，而不会先为其生成副本。
    
    如果打开项目失败，这会导致不可逆的数据损坏和数据丢失。
    

## 转换结果

无论你选择哪个选项，虚幻引擎都会尝试为你的项目文件自动生成代码。

如果转换成功，你的项目将在虚幻编辑器中打开。

如果转换失败，虚幻引擎会显示错误日志，提供关于失败及失败原因的详细信息。你需要手动解决造成失败的原因，然后再次尝试升级项目。

-   [projects](https://dev.epicgames.com/community/search?query=projects)
-   [templates](https://dev.epicgames.com/community/search?query=templates)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/updating-projects-to-newer-versions-of-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [转换项目](/documentation/zh-cn/unreal-engine/updating-projects-to-newer-versions-of-unreal-engine#%E8%BD%AC%E6%8D%A2%E9%A1%B9%E7%9B%AE)
-   [转换结果](/documentation/zh-cn/unreal-engine/updating-projects-to-newer-versions-of-unreal-engine#%E8%BD%AC%E6%8D%A2%E7%BB%93%E6%9E%9C)