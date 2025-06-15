# 虚幻引擎中的程序化内容生成框架节点参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:17:59.676Z

---

目录

![程序化内容生成框架节点参考](https://dev.epicgames.com/community/api/documentation/image/6437954c-3ce1-42c3-98d3-b081a3bd42b4?resizing_type=fill&width=1920&height=335)

借助程序化节点图表，程序化内容生成（PCG）框架可以在编辑器和运行时状态下生成程序化内容。和材质编辑器类似，空间数据被传入关卡中的PCG组件中的图表，然后生成点。这些点会经过一系列的节点的筛选和调整，这些节点如下所列：

## 蓝图

**节点**

**说明**

**Execute Blueprint**

使用Execute或Execute With Context方法，在派生自 `UPCGBlueprintElement` 的蓝图类的干净实例上执行指定的自定义蓝图类。

## 控制流程

**节点**

**说明**

**Branch**

基于布尔属性选择两个输出之一。这允许提供的数据基于可以在图表中被重载的布尔值传递到"输出A（Output A）"或"输出B（Output B）"。控制通过图表的执行流程，以便根据特定情况（某个事项是否存在、运行的平台等等）执行图表的一些不同部分。没有数据的分支会从执行中被剔除，以便更高效地执行。

**Select**

基于布尔属性选择两个输入之一以转至单个输出。这用于控制图表中的执行流程，以便根据特定情况（某个事项是否存在、运行的平台等等）执行图表的一些不同部分。

Select分支（输入）目前不会从执行中被剔除，但在未来版本中可能会剔除。

**Select (Multi)**

Select节点的多输入版本，可以设为基于整型、枚举或字符串。此节点尤其适合用于在选取不同数据时使其在图表中更明显。它会去除一些"魔力数字"印象，或在可供选择的输入超过两个时很实用。

**Switch**

Branch节点的多输出版本，可以设为选取整型、字符串或枚举。此节点尤其适合用于在选取不同数据时使其在图表中更明显。它会去除一些"魔力数字"印象，或在可供选择的输入超过两个时很实用。

## 调试

**节点**

**说明**

**Debug**

调试图表中的前一个节点，但不是临时的。其效果等同于在向此节点提供其数据的节点上启用调试。这适合用于在图表中设置永久调试点，因为它不是临时的，尽管调试参数是临时的。

它在非编辑器构建中不会执行。

**Sanity Check Point Data**

验证输入数据点的值是否在给定范围内；超出该范围，此节点将记录错误并取消生成。这在尝试验证图表中的假定时很有用，但不应该被视为图表中的良好构建块。

**Print String**

打印消息，将带前缀的消息以可选方式输出到日志、节点和屏幕。它充当发行构建中的直通节点，意味着它目前不会输出带前缀的消息。此节点适合用于调试和验证图表中的假定，例如在控制流程节点之后的死分支上。

## 密度

**节点**

**说明**

**Curve Remap Density**

根据提供的曲线将点数据中每个点的密度重新映射到其他密度值。这可以用于吻合一些情况下的密度，获得更合适的梯度，或在下游执行更复杂的处理。由于这依赖单独的数据对象，因此更容易从PCG外部更改。

最终密度 = 曲线重新映射(输入密度)

**Density Remap**

将线性变换应用于点密度。这可以选择设置为不影响输入范围之外的值。

D' = (Out\_Max - Out\_Min) \* (D - In\_min) / (In\_max - In\_min) + Out\_Min

**Distance to Density**

根据每个点与参考点间的距离设置点密度。这用于计算针对目标点的密度梯度，可实现更精细的控制。

对于大部分意图和目的，此节点可由原生Distance节点取代，后者更通用，效率也高得多。

## 筛选器

**节点**

**说明**

**Attribute Filter**

属性和特性上的通用筛选。它适用于点数据和属性集。这用于将数据分离到剔除点，或允许单独处理以引入变体。此筛选器可以是常量、其他空间数据（当输入是空间数据时，你可以如同对相同点取样那样筛选该数据或从ToPoint版本筛选）或属性集。

**Attribute Filter Range**

基于范围的属性筛选器版本，其中输入数据（点数据或属性集）分为范围中的内容和范围外的内容。这用于将数据分离到剔除点，或允许单独处理以引入变体。此筛选器可以是常量、其他空间数据（当输入是空间数据时，你可以如同对相同点取样那样筛选该数据或从ToPoint版本筛选）或属性集。

**Density Filter**

基于密度和提供的筛选器范围筛选点。

此节点完全由Attribute Filter节点取代，但更为专用，效率也更高。此节点应该在性能是重大关切点时或通过这种方式能更轻松地在图表中传达意图时使用。

**Discard Points on Irregular Surface**

围绕给定源点测试多个点，确定它们是否在相同平面上。这是使用PCG子图表的示例，在电子梦演示中使用。

**Filter Data By Attribute**

基于是否有指定元数据属性来分离数据（而非内容），有该属性的数据在"筛选器中（Inside Filter）"输出中，其余的数据在"筛选器外（Outside Filter）"输出中。这用于在依赖特定属性存在的子图表分段上防止错误和警告，这些属性在一些情况下可能不保证存在，例如从世界中的Actor获取数据时。

**Filter Data by Index**

基于索引和设置中提供的筛选器分离数据（而非内容）。此筛选器是从包含用逗号分隔的单独索引或范围的字符串构建的。支持负数，类似于Python范围的工作方式。例如，在大小为10（值为0到9）的数组上，选定索引0、2、4:5、7:-1将包括索引0、2、4、7和8。这用于图表中有非常著名的参数的情况，这种情况恰好允许一些数据，但很可能前几个或最后几个索引通常会是最常选择的索引。

**Filter Data By Tag**

根据标签分离数据（而非内容）。你可以指定用逗号分隔的标签列表，以作为筛选依据。这在从世界获取数据并在PCG中的数据之间构建关系时很有用。例如，Get Actor Data节点可以返回带有给定标签的所有Actor，然后其中一些Actor会是包括项和排除项。使用Fitler Data By Tag节点则会分离数据，并将其传递到在图表中有用的地方。

**Filter Data By Type**

基于"目标类型(Target Type)"中规定的类型分离数据（而非内容）。请注意，它可能会让"筛选器外（Outside Filter）"引脚出现在设置中。此节点在图表中用于自动筛选。但在其他情况下，它可能有助于根据提供的数据类型确定图表中的行为。它将与Count Data节点一起在这里被允许。

**Point Filter**

将按点筛选器应用于输入点数据。筛选器可以是常量空间数据（你可以像对相同点取样或从ToPoint版本取样那样筛选这些数据），也可以是属性集。

**Point Filter Range**

将基于范围的筛选器应用于点数据。

**Self Pruning**

删除相同点数据中的点之间的相交，基于设置对数据划分优先级（从大到小，等等）。半径相似的点可以使用随机化修剪进行随机选择，防止出现规律。

## 泛型

**节点**

**说明**

**Add Tags**

基于用逗号分隔的标签列表在提供的数据上添加标签。这用于与Filter Data By Tag节点一起在更复杂的图表中改进数据跟踪。

**Apply On Actor**

在Actor上设置属性，由属性集内提供的属性驱动。它还可以用于在设置属性（如有）后在Actor上调用无参数的函数。如果未提供Actor，它将被应用于PCG组件的所有者（这是分区图表中的PCG分区Actor）。其用法类似于Spawn Actor节点中的Spawned Actor Property Override Descriptions。请谨慎使用此Apply On Actor节点，因为Actor上的更改无法由PCG撤消。例如，此节点的一种用法是灵活地将从PCG计算的一些数据推送到不一定是从PCG创建的一些Actor，例如直接从PCG自动执行某个数据更新过程。

**Delete Tags**

从输入数据中删除标签，可以是针对用逗号分隔的列表为所有匹配项删除，也可以是在标签不在提供的列表中时删除。此节点可用于规格化要在下游处理的数据上的标签，更像是一种组织节点。但是，它可以用于在需要多次执行相同处理的工作流程中将数据标记为正在处理。

**Gather**

取所有输入，生成保存所有输入数据的单个集合。主要用于整理。

包含序列执行的 **仅依赖项（Dependency Only）** 引脚，用于它很重要的情况（例如，World Ray Hit Query与给定图表中生成的内容）。请注意，并非提供给此引脚的所有数据都会传递到输出。

**Data Count**

返回包含传递到输入引脚的数据数量的属性集。请注意，这不会忽略空的点数据。这可以与逻辑运算一起使用，或作为布尔值直接在分支节点中使用，以仅在需要时执行一些处理。

**Get Entries Count**

返回属性集内的条目数量。这很适合与Get Attribute Set From Index和Loop节点一起使用，精细控制子图表中发生的情况。

**Get Loop Index**

如果这在循环子图表中执行，返回包含当前循环索引的属性集。这仅返回直接子图表的索引，不会在图表层级中往上查找最接近的循环。这可以用于为递归模式计算每次迭代的数据，或用于日志记录目的。

**Proxy**

占位符节点替换，允许在图表执行期间动态重载。可以设置原型（默认值）以显示恰当的节点引脚，但正在运行的节点可以通过参数重载来驱动。这尤其适合用于允许从预构建的节点按实例进行一些控制，例如公开特定噪点类型。

**Replace Tags**

将输入数据上的标签替换为匹配的对应项。此节点支持使用逗号分隔列表以1:1、N:1或N:N的关系替换标签。

**Sort Attributes**

按指定属性以升序或降序对输入数据（点数据和属性集）排序。此节点可用于对数据排序，使其对下游节点可预测。例如，你可以按优先级对一些值排序，然后在下游对此执行运算。

**Sort Points**

Sort Attributes的别名。

## 辅助

**节点**

**说明**

**Spatial Data Bounds To Point**

计算边界并返回表示空间数据边界的单个点。这很适合用于显示目的，或更简单地表示可以与相同类型的其他数据合并的数据。

## 层级化生成

**节点**

**说明**

**Grid Size**

指定要执行下游节点的网格大小。用于[层级化生成](/documentation/404)。

## 输入输出

**节点**

**说明**

**Data Table Row to Attribute Set**

从数据表提取单行到属性集。这是对数据表的单行访问，没有Load Data Table所支持的方式那么灵活，但仍然很有用。

**Load Alembic File**

将Alembic文件加载到PCG点数据中。此节点用于导入Alembic文件并将其处理为点数据格式。虽然Alembic文件中不仅仅包含点，但此节点当前不支持其他类型。此节点不应该在正在迭代的图表中运行。请改用EUW来执行此转换，并将Alembic存储到PCG资产一次，以便提高效率。

需要 **程序化内容生成（PCG）外部数据交互操作（Procedural Content Generation (PCG) External Data Interop）** 插件。

**Load Data Table**

将UDataTable加载到PCG点数据中。此节点可以将表导入为点数据或属性集。这十分有用，不必查看PCG图表即可将PCG设为数据驱动。数据表中的更改会在文件保存时传播到PCG。

**Load PCG Data Asset**

同步或异步加载PCG数据资产对象，并将其数据传递到图表下游。

## 元数据

**节点**

**说明**

**Add Attribute**

将属性添加到点数据或属性集。

**Attribute Noise**

为一组点数据中的每个点计算目标属性的新值。这适用于点数据和属性集。值将取决于所选输入属性 **模式（Mode）** 、 **噪点最小值（Noise Min）** 和 **噪点最大值（Noise Max）** 。这适合用于在连续参数上增加变体。

**Attribute Partition**

根据选定属性分拆分区中的输入数据（点数据或属性集，或根据需要要转换为点数据的其他空间数据）。只要元素的每个选定属性有相同的值，那么这些元素都会位于相同的输出数据中。这有助于分离进入Loop节点的数据，前提是在特定情况下要为相同属性值执行处理，例如使用Mesh Sampler对网格体上的点取样，并通过在"正确的"点上复制点来传播这些点。

**Attribute Rename**

重命名现有属性。此节点在下游处理需要特定属性存在时使用。这适合用于将数据向下传递到子图表。

**Attribute Select**

计算所选 **轴（Axis）** 上的 **最小值（Min）** 、 **最大值（Max）** 或 **中值（Median）** 。请注意，这类似于使用轴计算点积。

**Attribute String Op**

执行与字符串相关的属性操作，例如附加字符串。此节点与Print String节点和Create Target Actor节点一起使用。

**Break Transform Attribute**

将变换属性分解为其组成部分：**平移（Translation）** 、 **旋转（Rotation）** 和 **缩放（Scale）** 。

**Break Vector Attribute**

将向量属性分解为其组成部分：**X** 、 **Y** 、 **Z** 和 **W** 。

**Copy Attribute**

从 **属性（Attribute）** 引脚或从输入本身将属性复制到新的点数据。此节点的用处在于，它允许你将一些值移至其他属性，执行更复杂的操作，并最终根据需要回写至原始属性。

**Create Attribute**

创建包含单个属性的属性集。

**Delete Attributes**

筛选（保留或删除）属性集或空间数据中用逗号分隔的属性。此节点用于删除在下游没有用的属性。在一些情况下，为了不让临时属性污染输出数据，这么做可能是值得的，但有一些操作（例如复制点）按属性执行的成本更高，具体取决于所使用的设置。

**Density Noise**

Attribute Noise的别名。

**Filter Attributes by Name**

从属性集或空间数据筛选（保留或删除）逗号分隔的属性。这是Delete Attributes的别名。

**Get Attribute from Point Index**

从点数据及其在单独属性集内的属性检索单个点。此节点常常在分区数据上的循环中使用，以轻松检索常用属性值。

**Make Transform Attribute**

根据三个提供的属性创建变换属性：**平移（Translation）** 、 **旋转（Rotation）** 和 **缩放（Scale）** 。

**Make Vector Attribute**

基于 **输出类型（Output Type）** ，根据2-4个属性创建向量属性。

**Match And Set Attributes**

在提供的属性集表（匹配数据）中选择一个条目，并将其值复制到输入数据（点数据或属性集）。这会取代Point Match and Set节点。

选择通过将输入数据（输入属性）上的属性（匹配属性）与匹配数据（匹配属性）上的属性相匹配来驱动，以便在其值一致时仅从匹配数据中的条目复制值。

数据不匹配属性时，匹配数据中的所有条目都会被视为有效匹配项。此外，还有一个选项可保留或丢弃不匹配"匹配数据"中的任何内容的条目。

在匹配数据中有多个潜在匹配项的情况下，可以对其加权（匹配权重属性），或随机选择一个。可以使用"使用输入权重属性（Use Input Weight Attribute）"和"输入权重属性（Input Weight Attribute）"字段，将输入数据中的某个\[0 - 1\]值关联到匹配数据中的规格化权重。这允许从之前计算的空间噪点驱动随机选择。

最后，匹配属性时，如果没有相等值，可以按照最接近的值进行匹配。还可以有一个进行匹配的最大距离阈值，但这仅限于有合理距离指标的连续值类型。

请注意，矢量上的距离采用引擎单位的欧几里得距离，旋转体上的距离以度数为单位，四元数上的距离以弧度为单位。

匹配运算期间使用的属性不会被传播到输出数据，因此匹配数据中的匹配属性和/或权重属性不会被复制到输出。

此节点非常灵活，可将数据注入点和属性集，并允许按其匹配值的能力构建复杂的数据集。它是数据驱动型图表的基石，这些图表中的一个节点可以加载一系列数据表或数据资产，然后在单个操作中轻松将恰当的数据复制到点。

**Merge Attributes**

将多个属性集（按连接顺序）合并在一起。不常用的属性会被设置为没有这些属性的条目中的相应默认值（自属性创建起）。

**Point Match and Set**

使用 **匹配和设置类型（Match And Set Type）** 选项，基于选择标准查找每个点的匹配项，然后将值应用于属性。

一种常见用例是在带有 **By Attribute** 选择器的 **Static Mesh Spawner** 节点中选择要在下游使用的网格体。

**Transfer Attribute**

根据相同数据集大小、相同类型（空间到空间或点到点）的对象设置属性。如果一些处理在相同数据集上执行，但只有其中一部分属性需要持久存在，或者如果数据中存在1:1的关系，这会很有用。

### 属性按位运算

**节点**

**说明**

**And**

计算两个属性之间按位AND运算的结果。

**Not**

计算两个属性之间按位NOT运算的结果。

**Or**

计算两个属性之间按位OR运算的结果。

**Xor**

计算两个属性之间按位XOR（异或）运算的结果。

### 属性布尔运算

**节点**

**说明**

**And**

计算两个属性之间布尔AND运算的结果。

**Not**

计算两个属性之间布尔NOT运算的结果。

**Or**

计算两个属性之间布尔OR运算的结果。

**Xor**

计算两个属性之间布尔XOR（异或）运算的结果。

### 属性比较运算

**节点**

**说明**

**Equal**

将两个属性之间的"等于"比较结果写入布尔属性。

**Greater**

将两个属性之间的"大于"比较结果写入布尔属性。

**Greater or Equal**

将两个属性之间的"大于或等于"比较结果写入布尔属性。

**Less**

将两个属性之间的"小于"比较结果写入布尔属性。

**Less or Equal**

将两个属性之间的"小于或等于"比较结果写入布尔属性。

**Not Equal**

将两个属性之间的"不等于"比较结果写入布尔属性。

### 属性数学运算

**节点**

**说明**

**Abs**

计算"绝对值"数学运算的值。将输入属性值转换为正值，并将结果写入属性。

**Add**

计算"加法"数学运算的值。取两个输入值，加起来，并将结果写入属性。

**Ceil**

计算"向上取整"数学运算的值。取一个输入值，向上舍入到下一个整数。

**Clamp**

计算"限制"数学运算的值。取输入值，将其约束到特定范围。

**Clamp Max**

提供"限制"数学运算的最大值。

**Clamp Min**

提供"限制"数学运算的最小值。

**Divide**

计算"除法"数学运算的值。取两个输入，将第一个输入除以第二个输入，并将结果写入属性。

**Floor**

计算"向下取整"数学运算的值。取一个输入值，向下舍入到最接近的整数，并将结果写入属性。

**Frac**

计算小数数学运算的值。取一个输入值，返回该值的小数部分。

例如，对于输入值X，结果是X减去X的向下取整值。输出值的范围从0到1，含0，不含1。

**Lerp**

计算"线性插值"数学运算的值。此表达式将在两个点之间画一条线，使用第三个"比率"值确定该线上某个点的值。接着将此值写入属性。

**Max**

计算对属性的"最大值"数学运算的值，并将结果写入属性。此运算取两个输入值，并输出两者中较大者。

**Min**

计算对属性的"最小值"数学运算的值，并将结果写入属性。此运算取两个输入值，并输出两者中较小者。

**Modulo**

计算"取模"数学运算的值。取两个输入值，将第一个值除以第二个值。接着返回余数，并将其作为属性写入。

**Multiply**

计算"乘法"数学运算的值。取两个输入值，相乘，并将结果写入属性。

**One Minus**

计算对属性的"一减"数学运算的值，并将结果写入属性。此表达式将取一个输入值X，输出1-X，并将结果作为属性写入。

**Pow**

计算"幂"数学运算的值。此表达式将取两个值：底数和指数。它计算底数值的指数次幂，并将结果作为属性输出。

**Round**

计算"四舍五入"数学运算的值，并将结果写入属性。此表达式将取一个输入值，并将其舍入到最接近的整数。

**Set**

将输出属性设置为提供的属性的值。

**Sign**

计算"符号"数学运算的值，并将结果写入属性。对一个输入值求值，指示它是正数、负数还是刚好为零。

-   如果输入为负数，此节点输出-1。
-   如果输入刚好为0，此节点输出0。
-   如果输入为正数，此节点输出1。

**Sqrt**

计算对输入的"平方根"数学运算的值，并将结果写入属性。

**Subtract**

计算"减法"数学运算的值。此表达式将取两个输入，从第一个输入减去第二个输入。

**Truncate**

计算"截断"数学运算的值，并将结果写入属性。此表达式将截断一个值，即舍弃小数部分，留下整数。例如，值1.4截断为1。

### 属性减少运算

**节点**

**说明**

**Average**

收集图表可以基于其操作的整体信息。例如，你可以找到平均位置以用作一个好的枢轴点，针对点数据中的所有点进行缩放。

**Max**

收集图表可以基于其操作的整体信息。例如，你可以找到平均位置以用作一个好的枢轴点，针对点数据中的所有点进行缩放。

**Min**

收集图表可以基于其操作的整体信息。例如，你可以找到平均位置以用作一个好的枢轴点，针对点数据中的所有点进行缩放。

### 属性旋转体运算

**节点**

**说明**

**Combine**

合并两个旋转值，将结果作为属性写入，先合并A，然后合并B。

**Inverse Transform Rotation**

按提供的变换的逆变换来变换旋转体。

**Invert**

找到提供的旋转体的逆对象，将结果作为属性写入。

**Lerp**

基于 **比率（Ratio）** ，在两个旋转体输入 **A** 和 **B** 之间线性内插。这会在比率为0时应用100%的A，在比率为1时应用100%的B。

**Normalize**

将角度限制为-180到180的范围，将结果作为属性写入。

**Transform Rotation**

按给定变换来变换旋转。此节点将取一个旋转作为输入，应用给定的变换。

### 属性变换运算

**节点**

**说明**

**Compose**

按顺序合成两个变换：A *B。合成变换时，顺序很重要。A* B会生成一个变换，首先应用A，然后将B应用到后续变换。结果写入属性。

**Invert**

将输入变换反转，将新变换作为属性写入。

**Lerp**

基于 **比率（Ratio）** ，在两个变换输入 **A** 和 **B** 之间线性内插。这会在比率为0时应用100%的A，在比率为1时应用100%的B。

### 属性三角运算

**节点**

**说明**

**Acos**

返回输入的反余弦（arccos），将结果写入属性。

**Asin**

返回输入的反正弦（arcsin），将结果写入属性。

**Atan**

返回输入的反正切（arctan），将结果写入属性。

**Atan 2**

返回2个输入（B/A）的反正切（arctan2），将结果写入属性。

**Cos**

返回输入的余弦（cos），将结果写入属性。

**Deg to Rad**

基于以度数为单位的输入返回弧度值，将结果写入属性。

**Rad to Deg**

基于以弧度为单位的输入返回度数值，将结果写入属性。

**Sin**

返回输入的正弦（sin），将结果写入属性。

**Tan**

返回输入的正切（tan），将结果写入属性。

### 属性向量运算

**节点**

**说明**

**Cross**

输出两个输入向量的交叉积。

**Distance**

计算两个向量输入之间的距离。

**Dot**

返回两个输入向量的点积。

**Inverse Transform Direction**

按输入变换的逆变换来变换方向向量，但不改变其长度。结果写入属性。

**Inverse Transform Location**

按输入变换的逆变换来变换位置。结果写入属性。

**Length**

返回输入向量中存储的向量的长度。

**Normalize**

输出向量的规格化副本，确保基于长度这样做是安全的。如果向量长度太小，无法安全地规格化，则返回零向量。

**Rotate Around Axis**

计算并返回向量A围绕轴按角度（度数）旋转的结果。

**Transform Direction**

按提供的变换来变换输入方向向量。不会改变其长度。结果写入属性。

**Transform Rotation**

按输入变换来变换旋转体或四元数。结果写入属性。

### 属性旋转体运算

**节点**

**说明**

**Make Rot from Angles**

返回使用翻滚角值、俯仰角值、偏航角值创建的旋转体属性。

**Make Rot from Axis**

使用根据向前轴、向右轴、向上轴创建的参考帧返回旋转体。

**Make Rot from X**

返回仅使用X轴创建的旋转体属性。Y和Z轴未指定，但将标准正交。

**Make Rot from XY**

返回使用X轴和Y轴创建的旋转体属性。X轴保持固定，Y轴可以发生极小的变化，强制实施正交性。还会计算Z值。

**Make Rot from XZ**

返回使用X轴和Z轴创建的旋转体属性。X轴保持固定，Z轴可以发生极小的变化，强制实施正交性。还会计算Y值。

**Make Rot from Y**

返回仅使用Y轴创建的旋转体属性。X轴和Z轴未指定，但将标准正交。

**Make Rot from YX**

返回使用Y轴和X轴创建的旋转体属性。Y轴保持固定，X轴可以发生极小的变化，强制实施正交性。还会计算Z值。

**Make Rot from YZ**

返回使用Y轴和Z轴创建的旋转体属性。Y轴保持固定，Z轴可以发生极小的变化，强制实施正交性。还会计算X值。

**Make Rot from Z**

返回仅使用Z轴创建的旋转体属性。X轴和Y轴未指定，但将标准正交。

**Make Rot from ZX**

返回使用Z轴和X轴创建的旋转体属性。Z轴保持固定，X轴可以发生极小的变化，强制实施正交性。还会计算Y值。

**Make Rot from ZY**

返回使用Z轴和Y轴创建的旋转体属性。Z轴保持固定，Y轴可以发生极小的变化，强制实施正交性。还会计算X值。

## 参数

**节点**

**说明**

**Get Actor Property**

从保存PCG组件的Actor（或对象层级中更高的地方）检索属性的内容。

默认情况下，它会查看Actor级别的属性（适合蓝图变量），但也可以使用 **选择组件（Select Component）** 选项查看组件属性。

此属性可以保存"扁平"结构体（例如没有数组的结构体），或成为有效支持类型的数组。对于数组的情况，输出将是带有多个条目的属性集。

此节点很适合用于从世界中的Actor（自身或其他方式）检索数据，允许使用与Get Actor Data相同的接口在图表中按实例进行控制。举例来说，这可以保存一系列静态网格体以生成材质，等等。

**Get Property From Object Path**

从保存PCG组件的Actor（或对象层级中更高的地方）检索属性的内容。这类似于Get Actor Property节点，不同之处在于它可以通过属性集获取Actor引用（软对象路径）。在一些数据驱动型用例中，此节点很有用，因为数据表可以保存对Actor的引用，并可以根据需要轻松从这些数据中检索属性，而不必依赖Actor选择。

**Point To Attribute Set**

将点数据转换为属性集，方法是丢弃所有点特性，仅保留点属性。如果输入点数据没有属性，则不会输出属性集。此节点很适合用作特定情况下的处理或内存优化，或用于在整个图表中均质化数据类型。

## 点运算

**节点**

**说明**

**Apply Scale to Bounds**

对于输入点数据中的每个点，下限和上限会乘以其比例，比例将重置为1，但保留负值。

**Bounds Modifier**

修改提供的点数据中的点上的边界属性。此节点用于以简单的方式影响输入点数据中的边界，这可能在Self Pruning节点或交集或差集之前很有用，例如用于调整最终结果。

**Build Rotation From Up Vector**

 

**Combine Points**

对于每个输入点数据，输出一个新的点数据，其中包含单个点，这个点包括其相应点数据中的所有点。这允许重新计算点数据并设置特定变换。此节点在一些情况下用于优化或概览一些数据。

**Duplicate Point**

对于每个点，复制该点并沿方向（Direction）定义的轴移动它，然后在新点上应用变换。按照"迭代（Iterations）"指示的次数重复该过程。如果选择了"相对空间中应用的方向（Direction applied in relative space）"，置换轴将从新点迭代式选取。此节点用于快速放置大量点，并构建类似分形的模式。

**Extents Modifier**

通过操控边界，修改点数据中每个点的范围。

**Split Points**

对于每个点，创建在"分拆之前（Before Split）"和"分拆之后（After Split）"中分拆的两个点，其中边界沿指定的"分拆轴（Split Axis）"和"分拆位置（Split Position）"分拆。例如，如果分拆位置是0.5，每个点将在中间切割，每一半是不同的输出。这可以用于支持细分，以执行更复杂的点程序集。

**Transform Points**

使用基本随机规则更改点变换（就地更改，或通过 **应用于属性（Apply to Attribute）** 更改为属性）。 变换的每个组件（平移、旋转、缩放）可以设置为绝对而不是相对，以允许更多控制。

它包含以下选项：

**统一缩放（Uniform Scale）** ：将点数据缩放到相同的X、Y、Z比率。

**重新计算种子（Recompute Seed）** ：强制点种子根据新世界位置进行更新。

**示例（Example）** ：使用绝对旋转和旋转Z为0的Transform Points节点，将确保点在Z轴上半部。这可确保点在从地形取样后向上。

此节点适合用于通过控制输入点数据来生成空间变体。它是生成看起来自然的数据的图表的主要部分。

## 取样器

**节点**

**说明**

**Copy Points**

复制 **Source per point in the Target** 输入中所有点的实例。有多个选项可用于继承空间属性，但 **Attribute Inheritance** 对此节点的性能的影响最大。你可以使用此节点执行嵌套循环复制，以便你可以有带有两个目标、两个输出的一个源，或带有两个目标、四个输出的两个源。此节点常用于实例化本地空间中（即PCG程序集/资产中）生成的点数据。在其世界位置中，后期处理之前。

**Mesh Sampler**

对指定静态网格体上的点取样。请注意，此运算开销高昂。

需要 **PCG几何体脚本交互操作（PCG Geometry Script Interop）** 插件和 **几何体脚本（Geometry Script）** 插件。

**Texture Sampler**

在每个点对纹理的UV取样。给定纹理输入，使用"来自纹理数据的平面（Planar From Texture Data）"纹理映射方法会基于Get Texture Data节点变换UV坐标，并将纹理取样到点输入上。如果纹理映射方法是"使用显式点UV坐标（Use Explicit Points UV Coordinates）"，UV坐标为0-1，有额外选项可确定哪个属性用于UV，以及使用高级平铺解决要封装的纹理，或将其限制为0-1。

**Select Points**

使用给定点将被选中或不被选中的概率，从输入点数据选择点的子集。在实践中，这意味着，如果你取比率0.5，你将获得大致一半的输入点，但不能保证是否恰好为一半。由于是否选择一个点的决定是独立进行的，这会呈现正态分布。

**Spline Sampler**

使用样条线作为源材质，对点取样。在样条线上取样是指直接在样条线曲线上，而 **水平（Horizontal）** 、 **垂直（Vertical）** 和 **体积（Volume）** 选项在样条线体积（由Y/Z轴中的控制点的半径驱动）上取样。

在样条线内取样需要样条线是闭合的。

**Surface Sampler**

在常规网格模式中，对表面数据上的点取样。此节点包含以下选项：

-   **点范围（Point Extents）** ：定义表面上的基本网格单元大小。
-   **松散度（Looseness）** ：定义允许变化的单元大小。在实践中，单元大小是点范围 \* (1 + 松散度)。
-   **每平方米点数（Points Per Square Meter）** ：计算保留的单元的比率。此属性可在网格很大时避免过度拥挤。

**Volume Sampler**

对常规3D网格上提供的空间数据取样。这会表现出"类似体素"的行为，对于大型数据或高密度，可能开销高昂。

## 空间

**节点**

**说明**

**Attribute Set To Point**

针对属性集内的每个条目创建一个默认点，将该属性集转换为数据点。生成的点数据具有与原始属性集相同的属性。

**Create Points**

根据点的静态说明，创建包含点的点数据。此节点一般用于创建单个点，作为需要某个世界位置或类似项的其他过程的种子。

**Create Points Grid**

创建一个点数据，其中包含设置定义的简单点网格。此节点在本地空间模式中与Copy Points节点一起用于围绕多个源创建网格。

**Create Spline**

根据输入点数据创建样条线。包含创建以下内容的选项：

-   创建组件或仅创建数据
-   闭合或线性样条线
-   根据属性名称应用自定义输入和输出切线

**Create Surface From Spline**

根据 **闭合** 样条线创建隐式表面。之后此表面可以像其他表面一样用于表面取样器、差集、交集等。

目前，这依赖样条线的离散化，因此可能不适用于非常大的样条线。如果是这种情况，请考虑首先对你的样条线取样，然后创建新的样条线（使用Create Spline节点），之后再使用此节点。

**Cull Points Outside Actor Bounds**

基于当前组件（分区Actor或原始）边界从输入点数据剔除点，并对边界扩展进行额外控制。这可以用于确保输入数据与当前处理相关，同时根据需要允许一些重叠。

**Difference**

针对差值的并集输出每个源的差值的结果。 此节点有以下选项：

**密度函数（Density Function）** ：控制在运算完成后使用哪个密度函数。包含以下选项：

-   **最小值（Minimum）** ：最终密度等于源的密度减去所有差值的最大密度。
-   **受限制的减法（Clamped Subtraction）** ：最终密度等于源的密度减去所有差值的密度总和。此值限制在0到1之间。
-   **二元（Binary）** ：如果密度差值大于0，最终密度等于0。否则，最终密度等于源的密度。

**模式（Mode）** ：控制存在具体空间数据与连续数据时的差值行为（其他类型，更接近分布函数）。请注意，在我们需要选择具体元素的一些情况下，这应该设置为"离散（Discrete）"，否则生成的密度函数无法为扁平。包含以下选项：

-   **推断（Inferred）** ：源或差值为点则为离散，否则为连续。
-   **连续（Continuous）** ：不折叠密度函数。
-   **离散（Discrete）** ：折叠密度函数，意味着将数据转换为点数据。

**Distance**

对于第一个输入中的每个点，计算与第二个输入中的最接近点的距离，在计算从一个点数据集到相同点数据集的距离时自动忽略自身。可以选择将距离向量作为属性输出。此节点用于模拟距离场或在点数据中创建基于距离的梯度。这可以用于调整森林边缘的树或太靠近溪流的树的规模。

**Find Convex Hull 2D**

仅使用每个点的位置（而不是边界）根据输入点数据计算2D凸包。此节点可以与Create Spline节点一起使用，创建包括所有点并且也可以传递到Create Surface From Spline节点的样条线。

**Get Actor Data**

Get … Data节点的通用版本。 使用Actor筛选器和模式从Actor读取数据。

它包含以下选项：

**Actor筛选器（Actor Filter）** ：确定在获取Actor数据时要考虑哪些Actor。

**包含子项（Include Children）** ：确定是否考虑输入的子Actor。

**模式（Mode）** ：包含以下选项：

-   **解析Actor组件（Parse Actor Components）** ：根据Actor上的组件构建PCG数据。
-   **获取单个点（Get Single Point）** ：返回一个点数据，其中针对每个Actor包含一个点，带有其变换和本地边界。可根据需要使用MergeSinglePointData选项。
-   **Get Data from PCG Component** ：返回另一个Actor的PCG执行的结果。请注意，只有传递到Output节点的数据会存储在PCG组件上，并且仅支持一些类型（点数据和属性集），将相应进行查询。PCG将确保在完成远程Actor的执行后继续执行。请注意，它需要数据已经生成（或当前正在生成），并且不能位于它执行的组件所在的相同Actor上。
-   **从PCG组件获取数据或解析Actor组件（Get Data from PCG component or Parse Actor components）** ：首先返回PCG输出（如果存在）。然后根据需要解析Actor。

获取PCG数据时的额外选项：

-   **预期引脚（Expected Pins）** ：如果你获取PCG数据，还可以提供匹配生成该数据的PCG图表的输出节点的预期引脚列表。
-   **获取所有网格上的数据（Get Data On All Grids）** ：从目标组件上的每个网格大小获取数据。
-   -   **允许的网格（Allowed Grids）** ：如果不使用"获取所有网格上的数据（Get Data On All Grids）"，选择可以从中提取数据的一组网格大小。
-   -   **组件必须自重叠（Components Must Overlap Self）** ：仅从与源组件边界重叠的组件获取数据。这是可选的优化，可避免获取可能与你的组件不相关的数据。

此节点是从PCG访问数据的最常见方式，尤其是在根图表中。

**Get Bounds**

创建包含任何给定空间数据的世界空间边界（下限和上限）的属性集。请注意，这比Combine Points节点更通用，因为它将返回更多类型的边界。此节点可以用作更高级别的构造，在图表中执行更大规模的处理。

**Get Landscape Data**

**Get Actor Data** 节点的特殊化，返回合适类型和构造的地形数据。

**Get PCG Component Data**

Get Actor Data节点的特殊化，仅返回从选定Actor PCG组件生成的输出。

**Get Points Count**

返回提供的输入点数据中的点数。这会创建单个属性集，无论输入数量是多少，并且每个输入点数据在该属性集内对应一个条目。

**Get Primitive Data**

**Get Actor Data** 节点的特殊化，返回合适类型和筛选的图元数据。

**Get Spline Data**

**Get Actor Data** 节点的特殊化，返回合适类型和筛选的样条线数据。

**Get Texture Data**

将纹理加载到表面数据。请注意，对于大部分压缩纹理类型，这需要GPU才能执行。这支持使用索引对压缩纹理UTexture2DArrays选择所需的UTexture2d，对CPU可用的纹理取样，这些纹理可以使用UTextures上的可用性（Availability）属性创建，进行点筛选而不是仅双线性筛选。此节点还允许仅限编辑器的选项以强制CPU取样。这会创建目标纹理的副本，它对CPU可见，未压缩，并改为对它取样。它避免了GPU取样中的压缩瑕疵。

**Get Volume Data**

**Get Actor Data** 节点的特殊化，返回合适类型和筛选的体积数据。

**Inner Intersection**

计算提供给节点的所有数据之间的内相交，而不管其引脚。

**示例** ： 输入\[A, B, C\]

**结果** ： A ∩ B ∩ C

**Intersection**

计算 **主源（Primary Source）** 引脚中提供的每个数据的外相交，其中结果是主源引脚上每个数据针对其他每个 **源（Source）** 引脚上的数据并集的一个相交。

**示例** ： 主源1包含\[A, B\] 源1包含\[C, D\] 源2包含\[E\]。

**结果** ： A ∩ (C ∪ D) ∩ E, B ∩ (C ∪ D) ∩ E

**Make Concrete**

将复合数据类型（交集、差集、并集）折叠到点数据中。对已经具体的数据不起作用。此节点一般不会直接使用，而是转换到特定节点的步骤。

**Merge Points**

将多个输入点数据合并为单个点数据。属性会合并，非公共属性根据需要设为默认值。

**Mutate Seed**

根据位置、之前种子、此节点的种子和组件的种子，改变输入点数据中每个点的种子。此节点适合用于在执行一些运算之后分离随机行为，前提是这些运算会复制点，但在其他方面不会影响种子。

**Normal To Density**

基于点法线和提供的设置（ **法线（Normal）** 、 **偏移（Offset）** 、 **强度（Strength）** 、 **密度模式（Density Mode）** ）计算点数据密度，类似于点积，但更灵活。此节点常用于以某种方式影响与特定轴最紧密地（使一些树变得更高）或最不紧密地（删除陡坡上的树）契合的一些点。

**Point Neighborhood**

根据搜索距离（采用引擎单位），计算基于邻近区域的值并在输入点数据上设置它们。值包括与中心的距离、平均邻近区域中心、平均密度和平均颜色。此节点可用于在各个点之间平滑掉密度或值，这对于自然的程序性处理常常很有用。

**Point From Mesh**

使用提供的静态网格体和该网格体的引用，构建包含一个点的点数据。如果提前执行潜在网格体的选择，然后将这些边界移至点（常常通过分区节点 + Loop节点 + Point From Mesh组合），之后再执行相交测试或自修剪，这很有用。

**Projection**

根据源数据创建投影数据，以投影到目标上。请注意，如果没有该源数据到该目标数据的特殊投影表示，则会将数据转换为点。此节点经常用于在图表中进行一些操控之后在表面上重新投影点。例如，它常常会遵循Copy Points点，替换其环境中恰当位置中的点。

**Spatial Noise**

构造空间一致的噪点模式（例如Perlin噪点），并写入指定属性。此节点可以与带有输入驱动的权重的Match and Set Attributes一起使用，将空间噪点应用于选择。一般来说，此节点适合用于获取看起来更自然的分布。

**To Point**

如果数据已经是点数据，将其投射到点数据，否则将空间数据离散化为点数据。

**Union**

从分布函数角度，创建数据之间的逻辑并集。结果依赖于所选密度函数选项。

**密度函数（Density Function）** ：控制在运算完成后使用哪个密度函数。包含以下选项：

-   **最大值（Maximum）** ：最终密度等于源的最大密度。
-   **受限制的加法（Clamped Addition）** ：最终密度等于所有差值中的密度总和。此值限制在0到1之间。
-   **二元（Binary）** ：如果源的任何密度大于0，最终密度等于1。请注意，这基本上只在二元差值的情况下有用。

**World Ray Hit Query**

创建类似表面的数据，在物理世界中执行光线投射。它可以将数据传递到预期表面数据的节点。

默认情况下，光线的大小和方向由源组件的Actor属性（很可能是体积）驱动，但光线属性可以覆盖。 它包含以下选项：

**应用地形中的元数据（Apply Metadata From Landscape）** ：光线投射击中地形时，获取地形层值。请注意，这会带来较小的性能开销。

**忽略PCG击中（Ignore PCG Hits）** ：忽略PCG生成的所有资产。相较于在世界中创建数据的其他节点（或其他图表），没有强制实施顺序时很有用。

可以选择返回物理材质和Actor击中。

筛选元素用于精细控制，仅忽略或保留部分击中。

**World Volumetric Query**

创建类似体积的数据，从物理世界收集点。它可以将数据传递到预期表面数据的节点。

"搜索重叠"检查控制是将重叠作为点范围，还是仅返回不与任何内容重叠的查询（受筛选影响）。

还可以选择返回在该体积中"找到"的Actor。

## 生成器

**节点**

**说明**

**Create Target Actor**

根据模板创建空Actor，可用作要将PCG构件写入的目标，例如静态网格体生成器。

**Point from Player Pawn**

在当前玩家Pawn位置创建点。在运行时生成期间使用。

**Spawn Actor**

生成Actor的内容，或提供的输入数据中每个点的Actor的内容。根据设置，Actor由模板Actor类、实例化模板Actor或属性驱动。

它包含以下选项：

**模板Actor类（Template Actor Class）** ：项目中可用Actor的列表。

**选项（Option）** ：

-   **折叠Actor（Collapse Actors）** ：收集一些Actor组件（静态网格体组件和PCG组件）以及目标Actor中折叠的Actor。
-   **仅合并PCG（Merge PCG only）** ：生成的Actor有PCG组件时，每个点生成一个Actor，其输入捆绑为单个图表执行。
-   **无合并（No Merging）** ：每个点生成一个Actor。

在无合并情况下，可以通过"生成的Actor特性重载说明（Spawned Actor Property Override Descriptions）"将特性设置为点上的属性中的Actor。

**附加（Attach）** 模式：

-   **未附加（Not attached）** ：原始Actor（PCG组件的所有者）与创建的Actor之间不会存在引擎感知的关系。
-   **已附加（Attached）** ：创建的目标Actor将作为子项附加到拥有PCG组件的Actor上。请注意，这会影响启用世界分区的地图中上述创建的Actor的流送，例如，此Actor将随父项一起流送进来。
-   **在文件夹中（In Folder）** ：不会存在引擎感知的关系，但Actor将放置在根据拥有PCG组件的Actor命名的文件夹中，以更轻松地在场景大纲视图中可视化。不会影响流送。

此节点可以用于创建类似分区的Actor，并在可以在播放时恰当流送进来的Actor上收集构件（视觉和其他方面）。

**Static Mesh Spawner**

在提供的点数据中每个点生成一个静态网格体。

静态网格体选项添加到网格体条目数组，并使用每个条目的 **权重（Weight）** 选择。具体做法是取所有权重值的总和，将其转换为每个条目的百分比。例如，如果数组中有四个条目，每个条目的值为1，则总和的值为4。每个条目的权重会除以总和，转换为百分比。这意味着每个条目有25%的机会生成。

静态网格体的选择是基于所选 **网格体选择器类型（Mesh Selector Type）** 选项使用变体完成的。

它包含以下选项：

-   **PCG网格体选择器加权（PCG Mesh Selector Weighted）** ：基于条目的总权重选择一个条目。
-   **PCG网格体选择器（按属性）（PCG Mesh Selector By Attribute）** ：基于网格体上存在的属性选择一个条目。
-   **PCG网格体选择器加权（按类别）（PCG Mesh Selector Weighted By Category）** ：在点上查找属性以选择类别，然后基于权重选择一个条目。

选定网格体将被写入输出点数据上的属性，而且选定网格体的边界将被推送到点边界。

对于创建的每个网格体特性重载，可以在将生成它时选择一个属性，以应用于ISM的模板描述符上的特性目标。

## 子图表

**节点**

**说明**

**Loop**

将其他图表作为子图表执行，循环引脚中的每个数据都将被执行一次。非循环引脚按原样传递。引脚特性在每个图表中的输入和输出节点上设置。在Loop节点中执行时，引脚的使用将驱动其行为。反馈引脚有特殊行为，因此它们应该在输出中与同名的另一个引脚配对。在执行期间，第一个迭代将从调用图表接收反馈引脚上的数据，但后续迭代将从上一个迭代获取数据。此节点十分重要，可简化同类数据的本地处理，例如，通过允许在单个网格体上取样（使用Mesh Sampler节点），然后仅在相关数据上复制该数据。它还用于构建有相互依赖项（选择和排除项的序列）等的数据集。

**Subgraph**

将另一个图表作为子图表执行。请注意，图表可以递归调用自身，该图表将执行到从执行中剔除此Subgraph节点（由于Control Flow节点）或它没有输入数据为止。Subgraph节点对于降低图表复杂性和最大限度提高复用起着很重要的作用。它们还支持递归，这在一些情况下很有用。

## 未分类

**节点**

**说明**

**Add Comment**

用于对图表分类和整理的视觉辅助。这不是实际的节点。

**Add Reroute Node**

图表整理工具，用于在边缘上添加控制点，使其在图表中看起来更美观。

**Add Named Reroute Declaration Node**

命名的重新路由节点类似于重新路由节点，但没有视觉边缘。它们用于删除大型图表中原本非常长的边缘或面条式的边缘。它们可以重命名并在多个位置消耗（使用），但只能在图表中的单个位置定义（定义）。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [procedural generation](https://dev.epicgames.com/community/search?query=procedural%20generation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [蓝图](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E8%93%9D%E5%9B%BE)
-   [控制流程](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E6%8E%A7%E5%88%B6%E6%B5%81%E7%A8%8B)
-   [调试](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E8%B0%83%E8%AF%95)
-   [密度](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%AF%86%E5%BA%A6)
-   [筛选器](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E7%AD%9B%E9%80%89%E5%99%A8)
-   [泛型](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E6%B3%9B%E5%9E%8B)
-   [辅助](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E8%BE%85%E5%8A%A9)
-   [层级化生成](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%B1%82%E7%BA%A7%E5%8C%96%E7%94%9F%E6%88%90)
-   [输入输出](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA)
-   [元数据](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%85%83%E6%95%B0%E6%8D%AE)
-   [属性按位运算](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%B1%9E%E6%80%A7%E6%8C%89%E4%BD%8D%E8%BF%90%E7%AE%97)
-   [属性布尔运算](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%B8%83%E5%B0%94%E8%BF%90%E7%AE%97)
-   [属性比较运算](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%B1%9E%E6%80%A7%E6%AF%94%E8%BE%83%E8%BF%90%E7%AE%97)
-   [属性数学运算](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%B1%9E%E6%80%A7%E6%95%B0%E5%AD%A6%E8%BF%90%E7%AE%97)
-   [属性减少运算](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%87%8F%E5%B0%91%E8%BF%90%E7%AE%97)
-   [属性旋转体运算](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%B1%9E%E6%80%A7%E6%97%8B%E8%BD%AC%E4%BD%93%E8%BF%90%E7%AE%97)
-   [属性变换运算](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%8F%98%E6%8D%A2%E8%BF%90%E7%AE%97)
-   [属性三角运算](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%B1%9E%E6%80%A7%E4%B8%89%E8%A7%92%E8%BF%90%E7%AE%97)
-   [属性向量运算](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%90%91%E9%87%8F%E8%BF%90%E7%AE%97)
-   [属性旋转体运算](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%B1%9E%E6%80%A7%E6%97%8B%E8%BD%AC%E4%BD%93%E8%BF%90%E7%AE%97-2)
-   [参数](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%8F%82%E6%95%B0)
-   [点运算](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E7%82%B9%E8%BF%90%E7%AE%97)
-   [取样器](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%8F%96%E6%A0%B7%E5%99%A8)
-   [空间](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E7%A9%BA%E9%97%B4)
-   [生成器](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E7%94%9F%E6%88%90%E5%99%A8)
-   [子图表](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E5%AD%90%E5%9B%BE%E8%A1%A8)
-   [未分类](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-node-reference-in-unreal-engine#%E6%9C%AA%E5%88%86%E7%B1%BB)