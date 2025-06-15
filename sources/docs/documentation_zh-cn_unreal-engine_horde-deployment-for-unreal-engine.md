# 面向虚幻引擎的Horde部署 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-deployment-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:36:53.572Z

---

目录

![Horde部署](https://dev.epicgames.com/community/api/documentation/image/c45fd90e-1733-4279-b646-b57eb3722e9e?resizing_type=fill&width=1920&height=335)

Horde被设计为具备可伸缩性，能够根据需求以多种不同的配置方式进行部署。本页将介绍Horde的系统架构、构成组件以及其所对接的外部服务。

## 组件

Horde需要以下组件：

-   **Horde操作面板**
    -   一个采用TypeScript并结合React编写的Horde Web前端。操作面板可以由常规的Horde服务器或单独的Web服务器托管。
-   **Horde服务器**
    -   核心服务器代码，采用C#/ASP.NET编写。它既可以单独部署，也可以作为包含多个实例的可水平伸缩服务，部署在负载均衡器后面。在Windows和Linux上均受支持。
    -   请参阅：[部署 > 服务器](/documentation/zh-cn/unreal-engine/horde-server-for-unreal-engine)
-   **Horde代理**
    -   在工作机上运行的软件，用于执行由Horde服务器分配给它的任务。用C#/NET编写。在Windows、Mac和和Linux上均受支持。
    -   请参阅：[部署 > 代理](/documentation/zh-cn/unreal-engine/horde-agent-deployment-for-unreal-engine)
-   **MongoDB** 数据库（或兼容）
    -   一个文档数据库，用于追踪并持久保存作业、用户、代理等Horde状态信息。除非另有配置，否则Horde将在启动时自动创建一个本地MongoDB数据库。
    -   可以从[MongoDB, Inc](https://www.mongodb.com/)获取MongoDB的独立实例或托管实例。Amazon ([DocumentDB](https://aws.amazon.com/documentdb/))和Microsoft ([Azure CosmosDB](https://azure.microsoft.com/en-us/products/cosmos-db/))也提供兼容的托管产品。
-   **Redis** 数据库（或兼容）
    -   一个内存数据库，用于缓存服务器实例之间频繁访问的状态信息，并为服务器内部通信提供发布/订阅服务。除非另有配置，否则Horde将在启动时自动启动一个本地Redis实例。
    -   可以从[Redis Labs](https://redis.io/)获取Redis的独立（或托管）实例。Amazon ([ElastiCache](https://aws.amazon.com/elasticache/redis/))和Microsoft ([Azure Cache for Redis](https://azure.microsoft.com/en-us/products/cache/))也提供兼容的托管产品。
-   **存储**
    -   Horde可以使用本地磁盘、网络共享或基于云的对象存储（例如[AWS S3](https://aws.amazon.com/s3/)、[Azure Blob Store](https://azure.microsoft.com/en-us/products/storage/blobs/)）存储中间件、输出构件、日志文件和缓存数据。你可以通过 `IStorageBackend` 接口实现其他后端。默认情况下，Horde会将数据本地存储在服务器设备上。

## 集成

-   **Slack**
    -   Horde支持将通知发送到[Slack](https://www.slack.com/)开箱即用，不过也可以通过 `INotificationSink` 接口支持其他后端。
    -   请参阅：[部署 > 集成 > Slack](/documentation/zh-cn/unreal-engine/horde-integrations-for-unreal-engine#slack)
-   **Perforce**
    -   Horde支持Perforce在CI设置中进行修订控制，并支持直接从中读取配置数据。
    -   请参阅：[部署 > 集成 > Perforce](/documentation/zh-cn/unreal-engine/horde-integrations-for-unreal-engine#perforce)
-   **Jira**
    -   Horde有一个对构建健康问题进行追踪和分类的系统，但如果需要，可以与外部问题服务对接。Horde自带对[Jira](https://www.atlassian.com/software/jira)的支持，不过你可以通过 `IExternalIssueService` 接口实现对其他后端的支持。

上述服务支持是基于Epic Games内部使用而实现的。这种支持情况未来可能会发生变化，不应将其视为对特定产品的认可或不认可。

## Epic Games的Horde部署

Epic Games内部部署的Horde托管在AWS上，包括以下部分：

-   Amazon Load Balancer，用于SSL的终止和路由
-   2个Linux容器，服务于由Amazon ECS管理的操作面板（每个配置0.25 vCPU、0.5GB RAM）
-   10个Horde Server实例，使用'Server' [runmode](/documentation/zh-cn/unreal-engine/horde-settings-for-unreal-engine#runmode-enum)配置，在由Amazon ECS托管的Linux容器上运行（每个配备4 vCPU、16GB RAM）
    -   这些实例负责处理面向用户的轻量级请求。
-   2个Horde Server实例，使用'Worker' [runmode](/documentation/zh-cn/unreal-engine/horde-settings-for-unreal-engine#runmode-enum)配置，在由Amazon ECS托管的Linux容器上运行（每个配备4 vCPU、16GB RAM）
    -   这些实例负责处理更繁重的计划任务，例如复制Perforce元数据、读取和更新配置状态以及启动计划作业。
-   Amazon DocumentDB（与MongoDB兼容）
-   Amazon ElastiCache（与Redis兼容）
-   数百个EC2实例，运行包含Horde代理的AMI。
-   约100台机器，本地托管，用于提供对移动设备、主机以及非托管平台（例如Mac设备）的访问。

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [组件](/documentation/zh-cn/unreal-engine/horde-deployment-for-unreal-engine#%E7%BB%84%E4%BB%B6)
-   [集成](/documentation/zh-cn/unreal-engine/horde-deployment-for-unreal-engine#%E9%9B%86%E6%88%90)
-   [Epic Games的Horde部署](/documentation/zh-cn/unreal-engine/horde-deployment-for-unreal-engine#epicgames%E7%9A%84horde%E9%83%A8%E7%BD%B2)