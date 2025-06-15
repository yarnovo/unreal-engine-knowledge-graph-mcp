# 面向虚幻引擎的Horde和UnrealGameSync元数据服务器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-and-unrealgamesync-metadata-server-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:37:48.624Z

---

目录

![Horde和UnrealGameSync元数据服务器](https://dev.epicgames.com/community/api/documentation/image/a4a0b131-34f6-4a05-80a5-af6669426a49?resizing_type=fill&width=1920&height=335)

UnrealGameSync（ **UGS** ）是一款旨在简化从Perforce进行同步操作的工具，它支持为美术师检索预编译的编辑器二进制文件，也支持对本地构建进行正确的版本管理，以便工程师修改内容。它是一个便捷中心，可用于展示构建健康状况、标记问题，以及在虚幻编辑器之外对常见工作流程任务进行脚本编写。

如需详细了解UGS，请参阅[UnrealGameSync](/documentation/zh-cn/unreal-engine/unreal-game-sync-ugs-for-unreal-engine)文档。

Horde包含与UGS一起发布的旧版MetadataServer IIS Web应用程序的更新版本，可与Horde的CI功能实现无缝集成。

## 配置

要将UnrealGameSync配置为从Horde获取数据，请在 `UnrealGameSync.ini` 配置文件中添加以下几行：

```cpp
[Default]
ApiUrl=https://{{ HORDE_SERVER_URL }}/ugs
```

此配置文件可以位于特定项目的位置（例如 `{{ PROJECT_DIR }}/Build/UnrealGameSync.ini` ），也可以位于应用于流中所有项目的位置（例如 `{{ ENGINE_DIR }}/Programs/UnrealGameSync/UnrealGameSync.ini` ）。

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [配置](/documentation/zh-cn/unreal-engine/horde-and-unrealgamesync-metadata-server-for-unreal-engine#%E9%85%8D%E7%BD%AE)