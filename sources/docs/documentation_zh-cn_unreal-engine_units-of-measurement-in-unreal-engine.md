# 虚幻引擎中的测量单位 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:52:07.717Z

---

目录

![测量单位](https://dev.epicgames.com/community/api/documentation/image/de0d22b4-3cde-4378-ae3c-869b67ba1565?resizing_type=fill&width=1920&height=335)

虚幻引擎（UE）默认采用以下国际制（SI）测量单位：

**量**

**单位**

距离/长度

厘米（cm）

质量

千克（kg）

时间

分钟（min）、秒（s）

角度

度（deg）

速度

米/秒（m / s）

温度

摄氏度（C）

力

牛顿（N）

扭矩

牛顿米（N • m）

如需详细了解UE中可用的所有单位，请参阅下面的[可用单位](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E5%8F%AF%E7%94%A8%E5%8D%95%E4%BD%8D)小节。

### 更改默认单位

在虚幻编辑器中，你可以更改项目中这些量的单位。要更改这些单位，请按照以下步骤操作：

1.  在菜单栏中选择 **编辑（Edit）> 项目设置（Project Settings...）** 。这会打开新的 **项目设置（Project Settings）** 窗口或选项卡。
2.  找到 **编辑器（Editor）> 外观（Appearance）** 。
3.  在 **单位（Units）> 高级（Advanced）** 下展开该类别。
4.  现在你应该会看到测量的所有量及其单位。要更改量，从你想更改的量旁边的下拉菜单选择新单位。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc159fe8-8b28-4654-b405-a320569fd9a9/change-units.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc159fe8-8b28-4654-b405-a320569fd9a9/change-units.png)

在虚幻编辑器中查看或更改单位。

距离/长度、质量和时间可以使用复合单位。

### 可用单位

以下小节包含UE中所有可用测量单位的列表，按测量的量整理：

#### 距离和长度

**单位**

**缩写**

**SI**

 

微米

µm

毫米

mm

厘米

cm

米

m

千米

km

**英制**

 

英寸

in

英尺

ft

码

yd

英里

mi

光年

ly

#### 速率和速度

**单位**

**缩写**

**SI**

 

厘米/秒

cm/s

米/秒

m/s

千米/秒

km/s

**英制**

 

英里/时

mph

#### 加速度

**单位**

**缩写**

厘米/平方秒

cm/s2

米/平方秒

m/s2

#### 角度

**单位**

**缩写**

度

° , deg

弧度

rad

#### 角速度

**单位**

**缩写**

度/秒

deg/s

弧度/秒

rad/s

#### 温度

**单位**

**缩写**

**温度 - SI**

 

摄氏度

C

开氏度

K

**温度 - 英制**

 

华氏度

F

#### 质量

**单位**

**缩写**

**质量 - SI**

 

微克

µg

毫克

mg

克

g

千克

kg

公吨

t, Mg

**质量 - 英制**

 

盎司

oz

磅

lb

英石

st

#### 密度

**单位**

**缩写**

**密度 - SI**

 

克/立方厘米

g/cm3

克/立方米

g/m3

千克/立方厘米

kg/cm3

千克/立方米

kg/m3

#### 力

**单位**

**缩写**

**以基本单位计**

**力 - SI**

 

 

牛顿

N

1 N = 1 kg • m / s2

千克力

kgf

1 kgf = 9.80665 kg • m / s2

千克厘米/平方秒

kg • cm / s2

 

**力 - 英制**

 

 

磅力

lbf

1 lbf = 32.174049 lb • ft / s2

#### 扭矩

**单位**

**缩写**

**以基本单位计**

**扭矩 - SI**

 

 

牛顿米

N·m

1 N·m = 1 kg • m2 / s2

千克平方厘米/平方秒

kg • cm2 / s2

 

#### 动量

**单位**

**缩写**

**以基本单位计**

**动量 - SI**

 

 

牛顿秒

N·s

1 N • s = 1 kg • m / s

#### 频率

**单位**

**缩写**

**以基本单位计**

**频率 - SI**

 

 

赫兹

Hz

1 Hz = 1 s\-1

千赫兹

kHz

 

兆赫兹

MHz

 

千兆赫兹

GHz

 

转/分钟

rpm

1 rpm = 1/60 s\-1

#### 像素密度

**单位**

**缩写**

像素/英寸

PPI

#### 数字信息

**单位**

**缩写**

字节

B

千字节

kB

兆字节

MB

千兆字节

GB

太字节

TB

#### 光通量

**单位**

**缩写**

流明

lm

#### 发光强度

**单位**

**缩写**

坎德拉

cd

#### 照度

**单位**

**缩写**

**以基本单位计**

勒克斯

lx

1 lx = 1 lm/m2

#### 亮度

**单位**

**缩写**

坎德拉/平方米

cd/m2

#### 时间

**单位**

**缩写**

纳秒

ns

微秒

µs

毫秒

ms

秒

s

分钟

min

小时

hr

天

d

月

mo

年

yr

#### 压强

**单位**

**缩写**

**以基本单位计**

帕斯卡

Pa

1 Pa = 1 kg / m • s2

千帕斯卡

KPa

 

兆帕斯卡

MPa

 

千兆帕斯卡

GPa

 

#### 其他单位

**单位**

**缩写**

**备注**

曝光数值

EV

描述场景中有多少光线。

百分比

%

0到100之间的数字值。

乘数

 

无单位的数量，表示某个基础数量的倍数。

未指定

 

没有指定的单位。

## 更多信息

如需详细了解坐标系，请参阅以下资源：

-   [国际单位制](https://www.bipm.org/en/measurement-units)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [更改默认单位](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E6%9B%B4%E6%94%B9%E9%BB%98%E8%AE%A4%E5%8D%95%E4%BD%8D)
-   [可用单位](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E5%8F%AF%E7%94%A8%E5%8D%95%E4%BD%8D)
-   [距离和长度](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E8%B7%9D%E7%A6%BB%E5%92%8C%E9%95%BF%E5%BA%A6)
-   [速率和速度](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E9%80%9F%E7%8E%87%E5%92%8C%E9%80%9F%E5%BA%A6)
-   [加速度](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E5%8A%A0%E9%80%9F%E5%BA%A6)
-   [角度](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E8%A7%92%E5%BA%A6)
-   [角速度](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E8%A7%92%E9%80%9F%E5%BA%A6)
-   [温度](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E6%B8%A9%E5%BA%A6)
-   [质量](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E8%B4%A8%E9%87%8F)
-   [密度](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E5%AF%86%E5%BA%A6)
-   [力](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E5%8A%9B)
-   [扭矩](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E6%89%AD%E7%9F%A9)
-   [动量](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E5%8A%A8%E9%87%8F)
-   [频率](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E9%A2%91%E7%8E%87)
-   [像素密度](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E5%83%8F%E7%B4%A0%E5%AF%86%E5%BA%A6)
-   [数字信息](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E6%95%B0%E5%AD%97%E4%BF%A1%E6%81%AF)
-   [光通量](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E5%85%89%E9%80%9A%E9%87%8F)
-   [发光强度](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E5%8F%91%E5%85%89%E5%BC%BA%E5%BA%A6)
-   [照度](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E7%85%A7%E5%BA%A6)
-   [亮度](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E4%BA%AE%E5%BA%A6)
-   [时间](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E6%97%B6%E9%97%B4)
-   [压强](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E5%8E%8B%E5%BC%BA)
-   [其他单位](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E5%85%B6%E4%BB%96%E5%8D%95%E4%BD%8D)
-   [更多信息](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)