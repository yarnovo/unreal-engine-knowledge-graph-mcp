# 虚幻引擎BuildGraph脚本任务 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:32:31.268Z

---

目录

![BuildGraph脚本任务](https://dev.epicgames.com/community/api/documentation/image/d6c14fb1-f16a-4bc6-9a51-dd7b994a5d8c?resizing_type=fill&width=1920&height=335)

通常而言，项目特定的实用脚本被实现为**虚幻自动化工具（UAT）**的`BuildCommand`类。 然而有时您需要为项目自动化自定义任务。 这时**BuildGraph**便可派上用场，因为你可以通过任意数量的自动化任务拓展BuildGraph，只要能满足你的需求即可。 以下部分将说明使用 BuildGraph 创建自定义任务的多种方式，包括预定义任务的列表，为创建自定义任务提供良好的起始点。

## 自定义任务

如需新建自定义任务，请实现一个派生自 `CustomTask`类的类并对其应用`TaskElement`特性。 `TaskElement`构造函数拥有两个参数：其所代表的XML元素的命名、包含其参数的类的类型（将在加载时传至构造函数）。

如需从XML文件读取参数类字段，请将`TaskParameter`特性附加到任务。 附加`TaskParameter`特性即可指明该参数为必须或可选，包括应被应用到实际参数的额外验证。

## 预定义任务

如果你需要创建任务的起始点，那么我们提供了各种预定义的任务作为模板供你使用。 如果你需要从简单的预定义任务开始，我们推荐从`LogTask`开始。 如果你需要了解BuildGraph的最新改进，请将此页加入书签。 我们将定期更新下方的预定义任务列表。

对于打包任务来说，BuildCookRun是一个强力而又常用的工具。 如需更多信息，请参阅概述文档[编译操作](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/build-operations-cooking-packaging-deploying-and-running-projects-in-unreal-engine)。

### AgeStore

用于从一组文件中分离符号的任务。 该任务根据Microsoft调试工具SDK随附的AGESTORE实用程序命名，但实际上它是一种单独的实现方案。 主要区别在于，它使用最后修改时间来确定要删除哪些文件，而非使用上次访问时间。

平台

虚幻目标平台

必需

操作符号的目标平台。

StoreDir

字符串

必需

符号服务器目录。

天

整型

必需

符号需要保留的天数。

BuildDir

字符串

可选

构建目录的根目录，用于检查现有的构建版本命名目录。

筛选器

字符串

可选

在删除符号前，在目录文件名称中进行匹配的子字符串。 在多个构建版本共享同一符号服务器的情况下，此属性使得"age store"任务可以避免从其他构建中删除符号。 筛选器值的具体用法由平台工具链定义的符号服务器结构确定。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Aws

生成AWS CLI，并等待其完成。

参数

字符串

可选

新建进程的参数。

Environment

字符串

可选

环境变量。

EnvironmentFile

字符串

可选

从中读取环境的文件。

日志输出

布尔

可选

将输出写入日志。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Aws-AssumeRole

取用AWS角色。

Arn

字符串

必需

要取用的角色。

Session

字符串

必需

此会话的名称。

时长（Duration）

整型

可选

令牌时长，以秒为单位。

Environment

字符串

可选

环境变量。

EnvironmentFile

字符串

可选

从中读取环境变量的文件。

OutputFile

字符串

必需

新环境的输出文件。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Aws-EcsDeploy

创建新的AWS ECS任务定义，并更新ECS服务，以使用此任务定义的新版本。

TaskDefinitionFile

字符串

必需

要使用的任务定义文件。

DockerImage

字符串

必需

要在新任务定义中设置的Docker镜像（会将%%DOCKER\_PATTERN%%换成此值）。

版本

字符串

可选

要在新任务定义中设置的应用版本（会将%%VERSION%%换成此值）。

群集（Cluster）

字符串

必需

表示AWS ECS群集要运行的群集ARN。

Service

字符串

必需

要更新并在上面部署的服务名称。

Environment

字符串

可选

环境变量。

EnvironmentFile

字符串

可选

从中读取环境的文件。

日志输出

布尔

可选

将输出写入日志。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### CheckMarkdown

检查给定文件之间的所有Markdown链接是否有效。

Files

文件规范

可选

要应用于输入文件列表的可选过滤器。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 命令

调用AutomationTool子进程来运行给定命令。

名称

字符串

必需

要执行的命令名称。

参数

字符串

可选

要传递给命令的参数。

MergeTelemetryWithPrefix

字符串

可选

如果为非null，则指示来自命令的遥测合并到具有给定前缀的此UAT实例的遥测中。 可以是空（非null）字符串。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Commandlet

生成编辑器以运行Commandlet。

名称

字符串

必需

要执行的commandlet名称。

项目

文件规范

可选

要通过编辑器运行的项目。

参数

字符串

可选

要传递给commandlet的参数。

EditorExe

文件引用

可选

要使用的编辑器可执行文件。 默认为当前平台的开发UnrealEditor可执行文件。

ErrorLevel

整型

可选

最低等级的退出代码，视作错误处理。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 编译

使用虚幻编译工具（UnrealBuildTool）编译目标。

目标

字符串

可选

要编译的目标。

配置

虚幻目标配置

必需

要编译的配置。

平台

虚幻目标平台

必需

编译所针对的平台。

项目

文件规范

可选

要编译的项目。

参数

字符串

可选

用于虚幻编译工具的其它参数。

AllowXGE

布尔

可选

是否允许将XGE用于编译。

AllowParallelExecutor

布尔

可选

是否允许为此编译使用并行执行器。

AllowAllCores

布尔

可选

当禁用AllowXGE时，是否允许UBT使用所有可用核心。

Clean

布尔

可选

是否允许清理该目标。 如果不指定，则在命令行上传递-Clean参数时清理目标。

标签

标签列表

可选

要应用到该任务构建产品的标签。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 烘焙

烘焙特定平台的所选贴图。

项目

字符串

必需

要烘焙的项目文件。

平台

字符串

必需

目标烘焙平台（如Windows）。

Maps

字符串

可选

要烘焙的贴图列表，以'+'字符分隔。

Versioned

布尔

可选

要传递到烘焙器的附加参数。

参数

字符串

可选

要传递到烘焙器的附加参数。

EditorExe

字符串

可选

为烘焙而运行的编辑器可执行文件的可选路径。

TagOutput

布尔

可选

是否标记烘焙的输出。 由于烘焙会产生大量文件，如果我们在依赖节点中不需要这些输出，那么就没必要花时间标记它们。

标签

标签列表

可选

要应用到该任务构建产品的标签。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 复制

将文件从一个目录复制到另一个目录。

Files

文件规范

可选

要应用于输入文件列表的可选过滤器。

从

文件规范

必需

要复制的源模式（如Engine/\*.txt）。

到

文件规范

必需

要复制到的目录。

Overwrite

布尔

可选

是否覆盖现有文件。

标签

标签列表

可选

要应用到该任务构建产品的标签。

ErrorIfNotFound

布尔

可选

如果没有找到要复制的文件，是否弹出错误提示

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### CreateArtifact

将构件上传至Horde。

名称

字符串

必需

构件名称。

类型

字符串

必需

构件类型。 决定构件的权限和过期策略。

说明

字符串

可选

构件描述。 将通过Horde操作面板进行展示。

BaseDir

字符串

可选

上传文件的基本路径。 所有被标记的文件都必须位于此目录下。 默认为工作区根目录。

StreamId

字符串

可选

构件所在的流。

Commit

字符串

可选

提交被上传的构件。

Files

文件规范

必需

构件中需包含的文件。

Keys

字符串

可选

此构件的可查询密钥，以分号分隔。

元数据

字符串

可选

此构件的其他元数据，以分号分隔。

Symbols

布尔

可选

是否为Symbol文件添加别名。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### CsCompile

编译C#项目文件及其依赖项。

项目

字符串

必需

要编译的C#项目文件。 使用分号可以指定多个项目文件。

配置

字符串

可选

要编译的配置。

平台

字符串

可选

要编译的平台。

目标

字符串

可选

要构建的目标。

属性

字符串

可选

命令的属性

参数

字符串

可选

要传递到编译器的附加选项。

EnumerateOnly

布尔

可选

仅枚举构建产品，不会实际编译项目。

标签

标签列表

可选

要应用到该任务构建产品的标签。

TagReferences

标签列表

可选

将应用于项目中任何非私有引用的标签。 （例如，没有复制到输出目录的外部引用的标签）。

UseSystemCompiler

布尔

可选

是否用系统工具链来代替集束的UE SDK。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 删除（Delete）

删除一组文件。

Files

文件规范

可选

以分号分隔的文件规范列表（如 `*.cpp;Engine/.../*.bat`），或者标签集的名称

Directories

字符串

可选

目录名称列表。

DeleteEmptyDirectories

布尔

可选

删除文件后是否删除空目录。 默认为true。

冗长（Verbose）

布尔

可选

是否使用冗长记录。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### DeployTool

通过Horde部署工具更新。

Id

字符串

必需

工具的标识符。

设置

字符串

必需

用于部署的设置文件。 应是包含服务器名称和访问令牌的JSON文件。

版本

字符串

必需

新工具的版本号。

时长（Duration）

整型

可选

推出该工具的时长，以分钟为单位。

暂停（Paused）

布尔

可选

是否将部署创建为暂停。

文件（File）

字符串

可选

包含要上传文件的Zip文件。

目录

字符串

可选

该工具的上传目录。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Docker

生成Docker并等待其完成。

参数

字符串

必需

Docker命令行参数。

Environment

字符串

可选

要设置的环境变量。

EnvironmentFile

字符串

可选

从中读取环境变量的文件。

WorkingDir

字符串

可选

运行命令的基础目录。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Docker-Build

生成Docker并等待其完成。

BaseDir

字符串

必需

构建的基础目录。

Files

字符串

必需

构建镜像之前要暂存的文件。

DockerFile

字符串

可选

Dockerfile的路径。 如果不指定，将会使用basedir的根目录。

DockerIgnoreFile

字符串

可选

\`.dockerignore\` 的路径。 如果指定，将会被复制到basedir。

UseBuildKit

布尔

可选

在Docker中使用BuildKit。

ProgressOutput

字符串

可选

进程输出类型（ \`--progress\` ）。

标签

字符串

可选

镜像的标签。

参数

字符串

可选

可选参数。

OverlayDirs

字符串

可选

要覆盖到暂存输入文件的附加目录列表。 可以将凭证暂存等等。

Environment

字符串

可选

要设置的环境变量。

EnvironmentFile

字符串

可选

从中读取环境变量的文件。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Docker-Compose-Down

生成Docker并等待其完成。

文件（File）

字符串

必需

docker-compose文件的路径。

参数

字符串

可选

命令的参数。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Docker-Compose-Up

生成Docker并等待其完成。

文件（File）

字符串

必需

docker-compose文件的路径。

参数

字符串

可选

命令的参数。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Docker-Push

生成Docker并等待其完成。

仓库。

字符串

必需

仓库。

图像

字符串

必需

要推送的源镜像。

TargetImage

字符串

可选

目标镜像的名称。

Environment

字符串

可选

附加环境变量。

EnvironmentFile

字符串

可选

要从中读取环境的文件。

AwsEcr

布尔

可选

是否登录到AWS ECR。

RepositoryAuthFile

字符串

可选

用于向仓库进行身份验证以进行推送的json文件的路径。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### DotNet

生成Docker并等待其完成。

参数

字符串

可选

Docker命令行参数。

BaseDir

字符串

可选

运行命令的基础目录。

Environment

字符串

可选

要设置的环境变量。

EnvironmentFile

字符串

可选

从中读取环境变量的文件。

ErrorLevel

整型

可选

最低等级的退出代码，视作错误处理。

DotNetPath

文件引用

可选

重载dotnet可执行文件路径。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### FindModifiedFiles

编译C#项目文件及其依赖项。

路径（Path）

文件规范

可选

用分号隔开的文件规范列表（默认为...）。

Change

整型

可选

要编译的配置。

MinChange

整型

可选

要编译的配置。

MaxChange

整型

可选

要编译的配置。

输出

文件引用

可选

要写入的文件。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Git

生成Git，并等待其完成。

参数

字符串

可选

Git命令行参数。

BaseDir

字符串

可选

运行命令的基础目录。

ErrorLevel

整型

可选

最低等级的退出代码，视作错误处理。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Git-Clone

将Git仓库克隆到本地路径。

Dir

字符串

必需

仓库的目录。

Remote

字符串

可选

要添加的遥控。

分支

字符串

必需

遥控上要检查的分支。

ConfigFile

字符串

可选

仓库的配置文件。 可以用于设置一个遥控可获取和/或者提供凭证。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Helm

生成Helm，并等待其完成。

图表

字符串

必需

Helm命令行参数。

Deployment

字符串

必需

版本名称。

Namespace

字符串

可选

Kubernetes命名空间。

KubeContext

字符串

可选

kubectl上下文。

KubeConfig

字符串

可选

要使用的kubectl配置文件。

值

字符串

可选

为运行图表而设置的数值。

ValuesFile

字符串

可选

为运行图表而设置的数值。

Environment

字符串

可选

要设置的环境变量。

EnvironmentFile

字符串

可选

从中解析环境变量的文件。

参数

字符串

可选

附加参数。

WorkingDir

字符串

可选

运行命令的基础目录。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Horde-CreateReport

创建Horde报告文件，文件将在操作面板上显示，呈现所有运行该任务的作业。

名称

字符串

必需

报告名称。

范围

字符串

必需

显示报告的位置。

Placement

字符串

必需

展示报告的位置。

文本

字符串

必需

要显示的文本。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Horde-GetSecrets

将文本文件中的字符串替换为通过Horde获取的加密内容。

文件（File）

字符串

必需

待更新加密内容的文件。

文本

字符串

可选

待更新加密内容的文本。

Replace

字符串

可选

文本文件中可展开的成对字符串以及加密内容名称，其格式为SOURCE\_TEXT=secret-name;SOURCE\_TEXT\_2=secret-name-2。 若未指定，则嵌入在文本中的加密内容将从{{secret-name.value}}字符串中展开。

If 

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Horde-SetSecretEnvVar

将文本文件中的字符串替换为通过Horde获取的加密内容。

名称

字符串

必需

待设置的环境变量名。

Secret

字符串

必需

待获取的加密内容的名称。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Kubectl

生成Kubectl，并等待其完成。

参数

字符串

必需

命令行参数。

BaseDir

字符串

可选

运行命令的基础目录。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 日志（Log）

将消息（和其他可选诊断信息）打印到输出日志。

消息

字符串

可选

要打印的消息。

Files

文件规范

可选

如果指定，会在显示指定的消息后打印给定文件列表。

IncludeContents

布尔

可选

如果指定，会打印出给定文件的内容。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### ModifyConfig

修改配置文件。

文件（File）

文件规范

必需

配置文件的路径。

分段

字符串

必需

要修改的分段名称。

按键

字符串

必需

要设置的属性名称。

值（Value）

字符串

必需

要设置的属性值。

标签

标签列表

可选

要应用到提取文件的标签

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### ModifyJsonValue

通过设置key路径中的指定值来修改json文件。

Files

文件规范

必需

要修改的json文件路径。

KeyPath

字符串

必需

每个文件中要查找的json key路径。

NewValue

整型

必需

要应用的新数值。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 移动

将文件从一个目录移动到另一个目录。

Files

文件规范

可选

要应用于输入文件列表的可选过滤器。

从

文件规范

必需

要复制的源模式（如Engine/\*.txt）。

到

文件规范

必需

要复制到的目录。

Overwrite

布尔

可选

选择文件是否要覆盖，默认为false。

标签

标签列表

可选

要应用到该任务构建产品的标签。

ErrorIfNotFound

布尔

可选

如果没有找到要复制的文件，是否弹出错误提示

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### MsBuild

执行MsBuild。

项目

字符串

必需

要编译的C#项目文件。 使用分号可以指定多个项目文件。

配置

字符串

可选

要编译的配置。

平台

字符串

可选

要编译的平台。

参数

字符串

可选

要传递到编译器的附加选项。

Verbosity

字符串

可选

MSBuild输出冗长度。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### NuGet-LicenseCheck

生成Docker并等待其完成。

BaseDir

字符串

必需

运行命令的基础目录。

IgnorePackages

字符串

可选

指定进行版本检查时要忽略的包列表，以分号分隔。 可选版本号可使用 'name@version' 语法指定。

LicenseDir

目录引用

可选

包含允许许可证的目录。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### OnExit

生成外部可执行文件，并等待其完成。

命令

字符串

必需

要生成的可执行文件。

Lease

布尔

可选

是否在租约终止时执行。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### PakFile

根据一组给定文件创建PAK文件。

Files

文件规范

必需

要添加到pak文件的文件、通配符和标签集列表，用';'字符隔开。

输出

文件引用

必需

要输出的PAK文件。

ResponseFile

文件引用

可选

响应文件的路径，其中包含要添加到pak文件的文件列表，而非单独指定。

RebaseDir

目录列表

可选

进行文件变基的相对目录。 如果指定，所列目录下面的最短路径将用于每个文件。

顺序

文件引用

可选

指定文件顺序的脚本。

签名

文件引用

可选

该pak文件的加密密钥。

Compress

布尔

可选

是否压缩文件。

参数

字符串

可选

要传递到UnrealPak的附加参数。

标签

标签列表

可选

要应用到该任务构建产品的标签。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### QueryTargets

运行UBT以查询特定项目的所有目标。

ProjectFile

文件引用

可选

要查询的项目文件的路径。

OutputFile

文件引用

可选

接收目标相关信息的输出文件的路径。

IncludeAllTargets

布尔

可选

写出所有目标，即使在Default\*.ini文件的BuildSettings分段中指定了默认值。

标签

标签列表

可选

要应用到该任务构建产品的标签。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### RandomData

在指定的输出目录中创建包含随机数据的文件。 用于为临时存储系统生成测试数据。

大小

整型

可选

每个文件的大小。

计数（Count）

整型

可选

要写入的文件数。

Different

布尔

可选

是否为每个输出文件生成不同的数据。

OutputDir

字符串

可选

输出目录。

标签

字符串

可选

要应用于输入文件列表的可选过滤器。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Reconcile

创建一个新的变更列表，并对一组文件进行协调，以将其提交至Perforce流。

说明

字符串

必需

已提交变更列表的描述。

Files

文件规范

可选

待协调的文件。

Directories

字符串

可选

待协调的目录，以分号分隔，采用相对的p4语法。

Workspace

字符串

可选

工作空间名称。 如果指定，则使用给定流和根目录来创建新的工作空间以用于提交文件。 如果不指定，则将使用当前工作空间。

Stream

字符串

可选

工作空间的流，默认为当前流。 除非同时指定了Workspace属性，否则忽略。

分支

字符串

可选

工作空间的分支（旧版本的P4 depot路径）。 不能同时与Stream使用。 

RootDir

目录引用

可选

流的根目录。 如果不指定，默认为当前根目录。  

力

布尔

可选

强制进行提交，即使需要解析也是如此（始终接受当前版本）。

P4Verbose

布尔

可选

允许详尽的P4输出（spew）。

预览

布尔

必需

执行一次协调预览，而不提交。  

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 重命名（Rename）

重命名一个文件或一组文件。

Files

文件规范

必需

要重命名的文件。

从

字符串

可选

当前文件名或要匹配的模式（如\*.txt）。 不得包含路径分隔符。

到

字符串

必需

一个或多个文件的新名称。 不得包含路径分隔符。

标签

标签列表

可选

要应用到重命名文件的标签。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### SanitizeReceipt

通过读取\*.target文件来标记构建产品和/或运行时依赖项的任务。

Files

文件规范

必需

待读取的接收文件（`*.target`）集，包含通配符和标签名称，以分号分隔。

EngineDir

目录引用

可选

引擎文件夹的路径，用于在接收文件中扩展$(EngineDir)属性。 默认为当前工作空间的引擎目录。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### SetVersion

使用给定版本信息更新本地版本文件（Engine/Source/Runtime/Launch/Resources/Version.h、Engine/Build/Build.version和Engine/Source/Programs/Shared/Metadata.cs）。

Change

整型

必需

要在版本文件中设置的变更列表。

CompatibleChange

整型

可选

要在版本文件中设置的引擎兼容变更列表。

分支

字符串

必需

分支字符串。

构建（Build）

字符串

可选

构建版本字符串。

BuildURL

字符串

可选

正在运行的持续集成作业的URL。

Licensee

布尔

可选

是否将IS\_LICENSEE\_VERSION标记设置为true。

Promoted

布尔

可选

是否将ENGINE\_IS\_PROMOTED\_BUILD标记设置为true。

SkipWrite

布尔

可选

如果设置，不会写入文件，而是返回将要更新的版本文件。 用于本地构建。

标签

标签列表

可选

要应用到该任务构建产品的标签。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 签名

用已安装证书对一组可执行文件签名。

Files

文件规范

必需

以分号分隔的文件规范列表（如 `*.cpp;Engine/.../*.bat`），或者标签集的名称。

标签

标签列表

可选

要应用到该任务构建产品的标签。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 生成

生成外部可执行文件，并等待其完成。

Exe

字符串

必需

要生成的可执行文件。

参数

字符串

可选

新建进程的参数。

WorkingDir

字符串

可选

用于生成新任务的工作目录。

Environment

字符串

可选

要设置的环境变量。

EnvironmentFile

字符串

可选

要从中读取环境的文件。

日志输出

布尔

可选

将输出写入日志。

ErrorLevel

整型

可选

最低等级的退出代码，视作错误处理。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 暂存

将构建接收中列出的文件暂存到输出目录。

项目

文件引用

可选

该目标所属的项目。

目标

字符串

必需

要暂存的目标的名称。

平台

虚幻目标平台

必需

要暂存的平台。

配置

虚幻目标配置

必需

要暂存的配置。

架构

字符串

可选

要暂存的架构。

ToDir

目录引用

必需

接收文件应该暂存到的目录。

Overwrite

布尔

可选

是否覆盖现有文件。

标签

标签列表

可选

要应用到该任务构建产品的标签。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### Strip

从一组文件分离调试信息。

平台

虚幻目标平台

必需

用于分离二进制文件的平台工具链。

BaseDir

目录引用

可选

从中查找文件的目录。

Files

文件规范

必需

以分号分隔的文件规范列表（如`Engine/.../*.pdb`）或标签集名称。

OutputDir

目录引用

可选

用于分离文件的输出目录。 默认为输入路径，覆盖输入文件。

标签

标签列表

可选

要应用到该任务构建产品的标签。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 提交

创建一个新的变更列表，并向Perforce流提交一组文件。

说明

字符串

必需

已提交变更列表的描述。

Files

文件规范

必需

要提交的文件。

FileType

字符串

可选

已提交文件的Perforce文件类型（如binary+FS32）。

Workspace

字符串

可选

工作空间名称。 如果指定，则使用给定流和根目录来创建新的工作空间以用于提交文件。 如果不指定，则将使用当前工作空间。

Stream

字符串

可选

工作空间的流，默认为当前流。 除非同时指定了Workspace属性，否则忽略。

分支

字符串

可选

工作空间的分支（旧版本的P4 depot路径）。 不能同时与Stream使用。

RootDir

目录引用

可选

流的根目录。 如果不指定，默认为当前根目录。

RevertUnchanged

布尔

可选

是否在尝试提交之前恢复未更改的文件。

力

布尔

可选

强制进行提交，即使需要解析也是如此（始终接受当前版本）。

P4Verbose

布尔

可选

允许详尽的P4输出（spew）。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### SymGen

通过指定的二进制文件生成一个可移动的符号转储文件。

Files

文件规范

必需

用分号隔开的文件规范列表（例如 \*.cpp;Engine/.../\*.bat），或者标签集的名称。

标签

标签列表

可选

要应用到该任务构建产品的标签。

UseRadSym

布尔

可选

如果为ture，将使用rad调试器的pdb标识转储器以及rad标识路径修正器。 

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。 

### SymStore

用于从一组文件中分离符号的任务。

平台

虚幻目标平台

必需

处理符号文件所需的平台工具链。

Files

字符串

必需

输出文件的列表。 将从该列表中提取PDB。

StoreDir

字符串

必需

压缩符号的输出目录。

Product

字符串

必需

符号存储记录的产品名称。

分支

字符串

可选

所有库源文件所基于的分支的名称。 当IndexSources为true时使用（只能在某些平台上使用）。

Change

整型

可选

所有仓库源文件都已同步到的变更列表。 当IndexSources为true时使用（只能在某些平台上使用）。

BuildVersion

字符串

可选

与这些符号关联的BuildVersion。 用于通过将该版本与构建共享中的目录名称匹配以在AgeStore实现清理。

IndexSources

布尔

可选

上传符号中是否包含源代码索引。 启用后，该任务将生成源服务器所需的数据（仅支持某些平台和版本控制服务器）。 源服务器允许调试器在调试版本或分析转储时自动获取匹配的源代码。

SourceFiles

字符串

可选

要索引库源文件的过滤器。 这是一个以分号分隔的Perforce过滤器列表，例如 Engine/....cpp;Engine/....h。 也可能是先前定义标签的名称，例如 当IndexSources为true时，使用的"#SourceFiles"（只能在某些平台上使用）。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 标签

对一组给定文件应用标签。 通过枚举标签和通过'Files'参数指定的文件规范找到文件列表。 从该列表，所有未被'Filter'参数匹配的文件都将被移除，后跟'Except'参数匹配的文件。

BaseDir

目录引用

可选

设置基本目录以用于解析相对路径和模式。 如果设置，则所有绝对模式（例如/Engine/Build/...）将相对于该路径。 如果不设置，则视为真正的绝对路径。

Files

文件规范

可选

要从中工作的文件集，包括通配符和标签名称，以分号分隔。 如果设置，则解析为相对于BaseDir，否则解析为相对于分支根目录。

FileLists

文件规范

可选

要从中添加额外文件的文本文件集。 每个文件列表都应在每一行有一个文件。

筛选器

文件规范

可选

用于过滤文件列表的模式，包括标签名称或通配符。 如果设置，可能包含适用于基本目录的模式。 如果不指定，默认为所有文件。

Except

文件规范

可选

要从匹配列表中排除的模式集。 可能包含适用于基本目录的模式的标签名称。

With

标签列表

必需

要应用的标签名称。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### TagReceipt

通过读取\*.target文件来标记构建产品和/或运行时依赖项的任务。

Files

文件规范

必需

要读取的接收文件（\*.target）集，包含通配符和标签名称，以分号分隔。

EngineDir

目录引用

可选

引擎文件夹的路径，用于在接收文件中扩展$(EngineDir)属性。 默认为当前工作空间的引擎目录。

ProjectDir

目录引用

可选

项目文件夹的路径，用于在接收文件中扩展$(ProjectDir)属性。 默认为当前工作空间的引擎目录，已弃用。

BuildProducts

布尔

可选

是否标记接收中列出的构建产品。

BuildProductType

字符串

可选

要标记的构建产品类型（请参阅TargetReceipt.cs — UnrealBuildTool.BuildProductType以了解有效值）。

RuntimeDependencies

布尔

可选

是否标记接收中列出的运行时依赖项。

StagedFileType

字符串

可选

要标记的运行时依赖项类型（请参阅TargetReceipt.cs — UnrealBuildTool.StagedFileType以了解有效值）。

With

标签列表

必需

要应用的标签名称。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 解压

从zip档案提取文件。

ZipFile

文件规范

必需

要提取的zip文件的路径。

ToDir

目录引用

必需

提取文件的输出目录。

UseLegacyUnzip

布尔

可选

是否使用旧版本解压代码。

OverwriteFiles

布尔

可选

解压时是否覆盖文件。

标签

标签列表

可选

要应用到提取文件的标签。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 上传

将一组文件上传到Jupiter便于以后检索。

FromDir

目录引用

必需

要从中读取压缩文件的目录。

Files

文件规范

可选

以分号分隔的文件规范列表（如 `*.cpp;Engine/.../*.bat`），或者标签集的名称。 相对路径取自FromDir。

JupiterNamespace

字符串

必需

用于上传构建的jupiter命名空间。 用于控制谁可以访问构建。

JupiterKey

字符串

必需

用于再次下载构建的构建key。 必须对该特定上传具有全局唯一性。

ArchiveType

字符串

必需

这些文件来自的档案类型，将会添加至元数据。

项目名称（Project Name）

字符串

必需

该组文件关联的项目的名称，将会添加至元数据。

分支

字符串

必需

生成这些文件的源控制分支，将会添加至元数据。

Changelist

字符串

必需

生成这些文件的源控制修订，将会添加至元数据。

JupiterUrl

字符串

必需

指定要上传至的Jupiter实例的url。

AdditionalMetadata

字符串

可选

要添加到元数据的'='分隔键值映射列表，用分号隔开。 例如： Foo=bar;spam=eggs

LimitMemoryUsage

布尔

可选

启用后，文件内容不会保留在内存中，从而减少内存占用，但是增加了io，因为文件内容需要多次读取（既用于哈希也用于上传）。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 等待

等待指定秒数。

秒

整型

必需

要等待的秒数。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### WriteJsonValue

通过设置key路径中的指定值来修改json文件。

文件（File）

文件规范

必需

将要修改的Json文件

按键

字符串

必需

要在每个文件中设置的Json元素。 此字符串的语法是JsonPath表示法的有限子集，并且可支持对象属性和数组索引。 所有被省略或超出范围的数组索引都会向数组添加一个新元素（例如， '$.foo.bar\[\]'将向'foo'对象中的'bar'数组添加一个元素）。

值（Value）

字符串

必需

要设置的新值。 可以是JSON值（字符串、数组、对象、数字、布尔值或null）。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### WriteTextFile

将文本写入一个文件。

文件（File）

文件引用

必需

要写入的文件的路径。

附加（Append）

布尔

可选

可选，是否要添加到文件，而不是覆盖文件内容。

文本

字符串

可选

要写入文件的文本。

Files

文件规范

可选

如果指定，会在显示指定的消息后打印给定文件列表。

标签

标签列表

可选

要应用到该任务构建产品的标签。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### ZenExportSnapshot

将快照从Zen导出到特定目标位置。

项目

文件引用

可选

从中导出快照的项目。

平台

字符串

可选

为其导出快照的目标平台。

SnapshotDescriptorFile

文件引用

可选

要创建的文件，其中包含关于导出快照的信息。

DestinationStorageType

字符串

必需

导出快照的目标位置类型（云端等）。

DestinationCloudHost

字符串

可选

导出到云目标位置时使用的主机名称。

DestinationCloudNamespace

字符串

可选

导出到云目标位置时使用的命名空间。

DestinationCloudIdentifier

字符串

可选

导出到云目标位置时使用的标识符。

DestinationCloudBucket

字符串

可选

导出到云目标位置时使用的自定义桶名称。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### ZenImportOplog

将操作日志（Oplog）从Zen导入到指定目标位置。

ImportType 

字符串

必需

从中导入的目标类型（云端、文件等……）。    

Files

字符串

可选

逗号分隔的操作日志目录完整路径，用于导入至本地Zen服务器。Files="Path1,Path2"。

项目

文件引用

可选

待进行导入的项目。

项目名称（Project Name）

字符串

可选

待进行导入的新建Zen项目名称。 

平台

字符串

可选

待导入快照的目标平台。 

RootDir

字符串

可选

虚幻引擎项目的根目录。 用于派生Engine文件夹和Project文件夹。

OplogName

字符串

可选

被导入操作日志的名称。 

HostName

字符串

可选

要从中导入的Zen服务器的主机URL。 

HostPort

字符串

可选

要从中导入的Zen服务器的主机端口。 

CloudURL

字符串

可选

要从中导入的云端URL。 

Namespace

字符串

可选

从云端导入时所用的命名空间。

Bucket

字符串

可选

从云端导入时所用的桶。

按键

字符串

可选

从云端导入时所用的密钥。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### ZenLaunch

启动Zen服务器。

项目

文件引用

必需

启动Zen服务器所针对的项目。 

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### ZenMirror

将快照从Zen导出到指定的目标位置。

项目

文件引用

可选

从中导出快照的项目。  

平台

字符串

可选

快照镜像操作的目标平台。

DestinationFileDir

目录引用

可选

数据将被镜像到的本地磁盘路径（如果路径为空，则使用%Project%\\Saved\\Cooked\\%Platform%目录）。

如果

Condtion

可选

是否执行该任务。 如果此条件判定为false，则忽略。

### 压缩

将文件压缩为zip档案。

FromDir

目录引用

必需

要从中读取压缩文件的目录。

Files

文件规范

可选

以分号分隔的文件规范列表（如 `*.cpp;Engine/.../*.bat`），或者标签集的名称。 相对路径取自FromDir。

ExecutableFiles

文件规范

可选

应设置可执行位的文件列表。

ZipFile

文件引用

必需

要创建的zip文件。

标签

标签列表

可选

要应用于已创建zip文件的标签。

如果

条件（Condition）

可选

是否执行该任务。 如果此条件判定为false，则忽略。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [buildgraph](https://dev.epicgames.com/community/search?query=buildgraph)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [自定义任务](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#custom-tasks)
-   [预定义任务](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#predefined-tasks)
-   [AgeStore](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#agestore)
-   [Aws](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#aws)
-   [Aws-AssumeRole](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#aws-assumerole)
-   [Aws-EcsDeploy](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#aws-ecsdeploy)
-   [CheckMarkdown](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#checkmarkdown)
-   [命令](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E5%91%BD%E4%BB%A4)
-   [Commandlet](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#commandlet)
-   [编译](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E7%BC%96%E8%AF%91)
-   [烘焙](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E7%83%98%E7%84%99)
-   [复制](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E5%A4%8D%E5%88%B6)
-   [CreateArtifact](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#createartifact)
-   [CsCompile](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#cscompile)
-   [删除（Delete）](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E5%88%A0%E9%99%A4%EF%BC%88delete%EF%BC%89)
-   [DeployTool](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#deploytool)
-   [Docker](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#docker)
-   [Docker-Build](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#docker-build)
-   [Docker-Compose-Down](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#docker-compose-down)
-   [Docker-Compose-Up](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#docker-compose-up)
-   [Docker-Push](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#docker-push)
-   [DotNet](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#dotnet)
-   [FindModifiedFiles](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#findmodifiedfiles)
-   [Git](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#git)
-   [Git-Clone](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#git-clone)
-   [Helm](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#helm)
-   [Horde-CreateReport](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#horde-createreport)
-   [Horde-GetSecrets](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#horde-getsecrets)
-   [Horde-SetSecretEnvVar](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#horde-setsecretenvvar)
-   [Kubectl](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#kubectl)
-   [日志（Log）](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E6%97%A5%E5%BF%97%EF%BC%88log%EF%BC%89)
-   [ModifyConfig](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#modifyconfig)
-   [ModifyJsonValue](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#modifyjsonvalue)
-   [移动](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E7%A7%BB%E5%8A%A8)
-   [MsBuild](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#msbuild)
-   [NuGet-LicenseCheck](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#nuget-licensecheck)
-   [OnExit](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#onexit)
-   [PakFile](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#pakfile)
-   [QueryTargets](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#querytargets)
-   [RandomData](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#randomdata)
-   [Reconcile](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#reconcile)
-   [重命名（Rename）](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E9%87%8D%E5%91%BD%E5%90%8D%EF%BC%88rename%EF%BC%89)
-   [SanitizeReceipt](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#sanitizereceipt)
-   [SetVersion](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#setversion)
-   [签名](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E7%AD%BE%E5%90%8D)
-   [生成](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E7%94%9F%E6%88%90)
-   [暂存](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E6%9A%82%E5%AD%98)
-   [Strip](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#strip)
-   [提交](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E6%8F%90%E4%BA%A4)
-   [SymGen](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#symgen)
-   [SymStore](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#symstore)
-   [标签](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E6%A0%87%E7%AD%BE)
-   [TagReceipt](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#tagreceipt)
-   [解压](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E8%A7%A3%E5%8E%8B)
-   [上传](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E4%B8%8A%E4%BC%A0)
-   [等待](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E7%AD%89%E5%BE%85)
-   [WriteJsonValue](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#writejsonvalue)
-   [WriteTextFile](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#writetextfile)
-   [ZenExportSnapshot](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#zenexportsnapshot)
-   [ZenImportOplog](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#zenimportoplog)
-   [ZenLaunch](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#zenlaunch)
-   [ZenMirror](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#zenmirror)
-   [压缩](/documentation/zh-cn/unreal-engine/buildgraph-script-tasks-reference-for-unreal-engine#%E5%8E%8B%E7%BC%A9)