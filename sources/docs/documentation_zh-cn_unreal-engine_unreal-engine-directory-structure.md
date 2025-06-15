# 虚幻引擎目录结构 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-directory-structure
> 
> 生成时间: 2025-06-14T18:51:46.147Z

---

目录

![目录结构](https://dev.epicgames.com/community/api/documentation/image/15cf2d17-44c9-4170-b140-1415a99dab8a?resizing_type=fill&width=1920&height=335)

在最高一级目录中，是你的引擎（Engine）目录以及你的所有游戏项目目录。Engine目录包含引擎自身及其随附工具。每个游戏目录都包含与该游戏有关的所有文件。

## 根目录

-   **Engine** - 包含构成引擎的所有源代码、内容等。
-   **Templates** - 创建新项目时可用的项目模板集合。
-   **GenerateProjectFiles.bat** - 用于创建在Visual Studio中使用引擎和游戏所需的虚幻引擎解决方案和项目文件。请参阅[IDE的项目文件](/documentation/zh-cn/unreal-engine/how-to-generate-unreal-engine-project-files-for-your-ide)以了解详细信息。
-   **Default.uprojectdirs** - 辅助文件，帮助引擎找到子目录中的项目。

## 通用目录

某些子目录在引擎目录和游戏项目目录中都能找到：

***Binaries** - 包含可执行文件或编译期间创建的其他文件。* **Build** - 包含编译引擎或游戏所需的文件，包括为某些特定平台创建项目版本时所需的文件。 ***Config** - 配置文件，包含的参数可用于控制引擎的行为。你在游戏项目Config文件中设置的值会覆盖 `Engine\Config` 目录中设置的值。* **Content** - 保存引擎或游戏中的内容，例如资产包、贴图。 ***DerivedDataCache** - 包含派生数据文件。这类数据专为被引用内容生成，并且在加载时生成。假如被引用内容未生成过缓存文件，则加载时间会显著增加。* **Intermediate** - 包含编译引擎或游戏时生成的临时文件。在游戏目录中，着色器也保存在Intermediate目录中。 ***Plugins** - 包含引擎中使用的插件。* **Saved** - 包含自动保存文件、配置（`.ini`）文件和日志文件。此外，**Engine > Saved** 目录还包含崩溃日志、硬件信息和Swarm选项与数据。 ***Source** - 包含引擎或游戏的所有源文件，包括引擎源代码、工具和游戏类等。* **Engine** - Engine目录中的源文件组织结构如下： ***Developer** - 编辑器和引擎共同使用的文件。* **Editor** - 仅供编辑器使用的文件。 ***Programs** - 引擎或编辑器使用的外部工具。* **Runtime** - 仅供引擎使用的文件。 ***Game** - 游戏项目目录中的源文件按模块分组，一个模块一个目录。每个模块包含以下内容：* **Classes** - 包含所有的Gameplay类头文件（`.h`）。此目录今后不应再添加。 ***Internal** - 包含同一个插件或模块内包含的交叉模块，且不会将包含的内容更广泛地公开出去。* **Private** - 包含所有源（`.cpp`）文件，包括游戏逻辑类以及各种模块的实现文件。 \* **Public** - 包含模块的头文件。

某些目录同时存在于引擎的通用目录以及特定游戏目录中。例如，**Content** 目录可能同时存在于引擎目录（`../Engine/Content`）以及你的游戏目录（`../GAME_DIR/Content`）。你游戏的content目录中的文件只能通过该特定游戏访问，而引擎中的content目录可通过任何使用该特定引擎分发的项目访问。

### 模块与插件

虚幻引擎的功能被归纳多个模块与插件。模块与插件最大的不同点在于，模块只包含代码。例如，若你在虚幻引擎中创建了一个项目，你的项目将被一个 `*.Build.cs` 文件归纳到一个模块中。而插件包含自身的源文件、二进制文件以及一个 `.uplugin` 文件。插件还可以包含资产，而模块不能。因此，你可以将插件再分发到其他UE项目以供其使用。

关于模块、插件及两者之间的重要区别，请参阅[模块](/documentation/zh-cn/unreal-engine/unreal-engine-modules)和[插件](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine)文档。

## 引擎专有目录

部分子目录只存在于Engine目录中。

***Documentation** - 包含引擎文档，包括源文件和发布的文件。* **HTML** - 发布的HTML文档文件。 ***Source** - 源markdown文档文件。* **Extras** - 其他辅助和工具文件。 ***Programs** - 包含虚幻引擎根目录中各个项目及其他虚幻程序（如Unreal Frontend和Unreal Header Tool）的配置文件和日志文件。* **Shaders** - 保存引擎的着色器源文件（`.usf`）。

## 游戏项目目录

目录

说明

**Binaries**

包含可执行文件或编译期间创建的其他文件。

**Config**

游戏的默认项目设置。

**Content**

包含引擎或游戏的内容，包括资产包和贴图。

**External dependencies**

显示公有的引擎头文件（仅在Visual Studio中可见）。

**Intermediate**

包含Unreal Build工具生成的文件，如Visual Studio项目文件。这些文件可以删除并重新构建。

**Saved**

包含引擎生成的文件，如配置文件和日志。这些文件可以删除并重新构建。

**Source**

包含游戏模块对象类文件。

## 解决方案目录

目录

说明

**Classes**

包含游戏对象的类定义（`.h` 文件）。

**Config**

游戏的默认项目设置。

**External dependencies**

显示公有引擎头文件（仅在Visual Studio中可见）。

**Private**

包含私有游戏对象类的实现文件（`.cpp` 文件）。

**Public**

包含公有游戏对象类的实现文件（`.cpp` 文件）。

-   [directory](https://dev.epicgames.com/community/search?query=directory)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [根目录](/documentation/zh-cn/unreal-engine/unreal-engine-directory-structure#%E6%A0%B9%E7%9B%AE%E5%BD%95)
-   [通用目录](/documentation/zh-cn/unreal-engine/unreal-engine-directory-structure#%E9%80%9A%E7%94%A8%E7%9B%AE%E5%BD%95)
-   [模块与插件](/documentation/zh-cn/unreal-engine/unreal-engine-directory-structure#%E6%A8%A1%E5%9D%97%E4%B8%8E%E6%8F%92%E4%BB%B6)
-   [引擎专有目录](/documentation/zh-cn/unreal-engine/unreal-engine-directory-structure#%E5%BC%95%E6%93%8E%E4%B8%93%E6%9C%89%E7%9B%AE%E5%BD%95)
-   [游戏项目目录](/documentation/zh-cn/unreal-engine/unreal-engine-directory-structure#%E6%B8%B8%E6%88%8F%E9%A1%B9%E7%9B%AE%E7%9B%AE%E5%BD%95)
-   [解决方案目录](/documentation/zh-cn/unreal-engine/unreal-engine-directory-structure#%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%E7%9B%AE%E5%BD%95)