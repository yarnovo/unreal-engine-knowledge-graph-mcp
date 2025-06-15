# 面向虚幻引擎的Horde内部机制 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-internals-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:37:42.681Z

---

目录

![Horde内部机制](https://dev.epicgames.com/community/api/documentation/image/33dede14-30c9-45a3-b17d-39718071778a?resizing_type=fill&width=1920&height=335)

## 入门指南

### 服务器

Horde服务器的源代码位于 `Engine/Source/Programs/Horde/Horde.Server` 中。它用C#编写而成，使用ASP.NET。

Horde采用了 Microsoft发布的标准[C#代码约定](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/coding-style/coding-conventions)，不过由于遗留原因，我们使用制表符而非空格。我们启用了.NET SDK自带的大多数静态分析器警告，但你可以通过 `.editorconfig` 文件禁用其中一些警告。

Horde默认配置为支持本地开发。打开 `Engine/Source/Programs/Horde/Horde.sln` 并将Horde.Server设置为默认项目，即可启动它。默认情况下，转到 `http://localhost:5000/account` 即可访问服务器。

当针对实时部署调试本地Horde服务器时，在[`Server.json`](/documentation/404)中设置 `DatabaseReadOnlyMode` 属性，可以防止服务器尝试执行服务器状态的修改操作。为了安全起见，建议额外使用一个只读数据库账户。

### 操作面板

Horde操作面板是一个前端客户端，它采用[TypeScript](https://www.typescriptlang.org)并使用[React](https://react.dev/)开发而成。要设置机器以开发操作面板，请执行以下操作：

1.  安装[Node.js](https://nodejs.org/en/download)。
2.  从命令行，使用以下命令安装Yarn：`npm install --global yarn` 。
3.  找到位于 `Engine\Source\Programs\Horde\HordeDashboard` 的操作面板文件夹。
4.  运行 `yarn install` 以安装包依赖项。
5.  编辑package.json，将代理属性设置为指向你的服务器URL，例如：`http://localhost:13340` 。
6.  找到你的服务器的管理员令牌端点，以获取一个有过期时间的访问令牌，例如：`http://localhost:13340/api/v1/admin/token` 。
7.  在HordeDashboard文件夹的根目录下创建一个名为 `.env.development.local` 的文件，并按以下方式粘贴访问令牌：`REACT_APP_HORDE_DEBUG_TOKEN=eyFhbGciziJIUz` 。
8.  运行 `yarn start` 命令以启动开发Web服务器，该服务器应该会打开一个标签页，访问 `http://localhost:3000` ，显示本地操作面板。

## Docker

Horde包含一个用于创建Docker镜像的 `Dockerfile` 。但它在虚幻引擎源代码树中的位置要求预先对文件进行暂存处理，以减小复制到构建镜像中的数据大小。

在 `Engine\Source\Programs\Horde\HordeBuild.xml` 中包含了一个用于执行这些操作的BuildGraph脚本，该脚本可按以下方式运行：

```cpp
RunUAT.bat Engine/Source/Programs/Horde/HordeBuild.xml -Target="Build HordeServer"
```

## 主题

-   [构建健康状况](/documentation/404)
-   [存储](/documentation/zh-cn/unreal-engine/horde-storage-for-unreal-engine)
-   [租赁](/documentation/zh-cn/unreal-engine/horde-leases-for-unreal-engine)
-   [日志](/documentation/zh-cn/unreal-engine/horde-logs-for-unreal-engine)
-   [结构化的日志记录](/documentation/zh-cn/unreal-engine/horde-structured-logging-for-unreal-engine)

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门指南](/documentation/zh-cn/unreal-engine/horde-internals-for-unreal-engine#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [服务器](/documentation/zh-cn/unreal-engine/horde-internals-for-unreal-engine#%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [操作面板](/documentation/zh-cn/unreal-engine/horde-internals-for-unreal-engine#%E6%93%8D%E4%BD%9C%E9%9D%A2%E6%9D%BF)
-   [Docker](/documentation/zh-cn/unreal-engine/horde-internals-for-unreal-engine#docker)
-   [主题](/documentation/zh-cn/unreal-engine/horde-internals-for-unreal-engine#%E4%B8%BB%E9%A2%98)