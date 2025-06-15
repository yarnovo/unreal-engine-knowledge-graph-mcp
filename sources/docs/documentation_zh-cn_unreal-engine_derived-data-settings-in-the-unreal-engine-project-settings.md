# 虚幻引擎项目设置中的派生数据设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/derived-data-settings-in-the-unreal-engine-project-settings
> 
> 生成时间: 2025-06-14T18:55:09.112Z

---

目录

![派生数据设置](https://dev.epicgames.com/community/api/documentation/image/1b7b7d06-ef34-42d0-8291-0fb2793ad6b1?resizing_type=fill&width=1920&height=335)

## 派生数据

### 警告

**部分**

**描述**

**启用警告（Enable Warnings）**

当某些配置没有设置或者使用时出现警告。

下面的 "建议（Recommend）" 设置可以检查[DDC](/documentation/zh-cn/unreal-engine/using-derived-data-cache-in-unreal-engine)如何配置，如果一些配置没有设置或使用，可以在编辑器启动的时候显示弹窗提示信息。

**建议所有人设置A全局本地DDCPath（Recommend Everyone Setup AGlobal Local DDCPath）**

如果本地缓存没有通过 `UE-LocalDataCachePath` 环境变量或者编辑器设置 `Global Local DDC Path` 进行设置，弹出警告。

**建议所有人设置A全局共享DDCPath（Recommend Everyone Setup AGlobal Shared DDCPath）**

如果共享缓存没有通过 `UE-SharedDataCachePath` 环境变量或者编辑器设置 `Global Shared DDC Path` 进行设置，弹出警告。

**建议所有人设置A全局S3DDCPath（Recommend Everyone Setup AGlobal S3DDCPath）**

如果编辑器设置 `Enable AWS S3 Cache` 被停用，弹出警告。

**建议所有人启用S3DDC（Recommend Everyone Enable S3DDC）**

如果编辑器设置 `Global Local S3DDC Path` 没有设置，弹出警告。

**建议所有人使用Unreal Cloud DDC（Recommend Everyone Use Unreal Cloud DDC）**

如果没有使用Unreal Cloud DDC存储，弹出警告。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [派生数据](/documentation/zh-cn/unreal-engine/derived-data-settings-in-the-unreal-engine-project-settings#%E6%B4%BE%E7%94%9F%E6%95%B0%E6%8D%AE)
-   [警告](/documentation/zh-cn/unreal-engine/derived-data-settings-in-the-unreal-engine-project-settings#%E8%AD%A6%E5%91%8A)