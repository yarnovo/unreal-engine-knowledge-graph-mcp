# 虚幻引擎中的MIDI | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/midi-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:22:13.207Z

---

目录

![虚幻引擎中的MIDI](https://dev.epicgames.com/community/api/documentation/image/4c640c5d-8634-4a6f-83e6-aa1541c3ccc7?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

## MIDI设备支持

![Enable the MIDI Device Support Plugin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36c333e1-a04a-4c0b-b505-67e2c787385a/01-enabling-the-midi-device-support-plugin.png "Enable the MIDI Device Support Plugin")

**MIDI设备支持** 插件可以提供收发 *MIDI（音乐设备数字接口）* 协议消息的功能。这是虚幻引擎和MIDI键盘等外部硬件最常用的通信方式。但由于MIDI是一种数据协议，用户也可以使用从消息中解析的数据来驱动相关的非音频参数。

目前，虚幻引擎仅支持流送的MIDI数据。不支持读取MIDI文件。

## 什么是MIDI？

[MIDI](https://www.midi.org/) 是一种专门用于在不同音频硬件设备之间使用MIDI消息进行通信的数据协议。MIDI消息以包含消息类型的一个字节开头（该字节是"状态"字节），后跟数据字节。

例如，一个最常见的MIDI消息是"音符开启（Note On）"消息，其中包含的状态字节不仅指明了这是音符开启（Note On）消息，而且还传达了它所适用的信道（0到15之间的数值），后跟一个音高数据字节，然后是一个速度数据字节。由于每个数据字节的最显著的数位用于指明这是数据字节，因此音高和速度数据仅包含介于0和127之间的一个数值。

MIDI协议还指定了如何解译数据的字节，例如如何将介于0到127之间的音高数值转换成一个单位，例如Hz。由于虚幻引擎不会直接用这种方式转换MIDI数据，这样就可能允许用户利用MIDI消息来驱动除音频以外的行为，我们的 **音效实用工具** 插件包含多种可以用于执行MIDI数据转换的函数。

![Enable the Sound Utilities Plugin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97f72760-78db-42d2-87d0-8d47003df148/02-enabling-the-sound-utilities-plugin.png "Enable the Sound Utilities Plugin")

## 工作流

### MIDI输出

要让 **MIDI输出** 在在虚幻引擎中正常发挥作用，请按照下述工作流操作：

1.  查找你要将MIDI信号发送到的设备的ID。你可以按照以下操作流程实现这一目的：
    
    -   选择默认的MIDI设备。
        
    -   对所有可用的MIDI设备进行迭代操作。
        
    -   根据名称搜索特定的MIDI设备。
        
    
    相关的 **蓝图** 函数有 **Get Default MIDI Output Device ID**、**Find MIDI Devices** 和 **Get MIDI Output Device ID by Name**。
    
2.  使用蓝图函数 **Create MIDIDevice Output Controller** 创建你的 **MIDI输出UObject**。此函数将取一个ID作为输入，并返回对MIDI输出的引用，如果未能成功连接到MIDI设备，则返回空引用。
    
    务必要将你的MIDI设备输出控制器缓存到变量中。否则，MIDI控制器有可能会被当做垃圾意外回收。
    
3.  发送MIDI命令！这些命令将成为 **MIDI设备管理器** 中的函数，可以对 **MIDIDevice输出控制器** 执行操作。通常来说，最常用的函数是 **Send MIDINote On**、**Send MIDINote Off** 和发送 **MIDIPitch Bend**。
    
4.  如果你对MIDI协议比较熟悉，那么也可以使用 **Send MIDIEvent** 来构建原始MIDI事件数据。
    

MIDI输出的基本蓝图实施与下图相似，但对要发送的具体MIDI数据可能具有更加详细的指令：

![A basic MIDI Output Blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9357bfb3-942e-4800-b29d-e1cd340bf456/03-midi-output-blueprint.png "A basic MIDI Output Blueprint")

### MIDI输入

要设置 **MIDI输入**，请按照下述工作流操作：

1.  设置你的 **MIDI输入设备** 并将其缓存在一个变量中；这看起来与上面列出的MIDI输出设置操作的前两个步骤完全相同，不同之处在于函数名称将包含 **Input**，而非 **Output**。
    
2.  通过MIDI输入设备上的 **Assign To On MIDI Note On** 等操作，注册到你所关注的 **MIDI事件** 代理
    
3.  使用这些MIDI事件产生的数据来驱动项目中的参数，例如播放音效时的音高或速度。在将MIDI的(0 - 127)整数数据点转换成更容易被音频引擎解译的单位（例如频率和音量标量）时，音频实用工具插件中的某些函数可能很有帮助。
    
4.  高级用户可能希望尝试解译MIDI数据，例如 **控制点更改** 消息，或者可能希望利用多个 **音频组件** 并持续跟踪活动的音符创建有音律变化的音乐系统。
    

基本的MIDI输入系统蓝图实施过程大体如此，但根据传入的MIDI数据可能具有更复杂的使用方法：

![A basic MIDI Input Blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ee8608f-4943-4314-956b-83da00f36ce3/04-midi-input-system-blueprint.png "A basic MIDI Input Blueprint")

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [midi](https://dev.epicgames.com/community/search?query=midi)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [MIDI设备支持](/documentation/zh-cn/unreal-engine/midi-in-unreal-engine#midi%E8%AE%BE%E5%A4%87%E6%94%AF%E6%8C%81)
-   [什么是MIDI？](/documentation/zh-cn/unreal-engine/midi-in-unreal-engine#%E4%BB%80%E4%B9%88%E6%98%AFmidi%EF%BC%9F)
-   [工作流](/documentation/zh-cn/unreal-engine/midi-in-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81)
-   [MIDI输出](/documentation/zh-cn/unreal-engine/midi-in-unreal-engine#midi%E8%BE%93%E5%87%BA)
-   [MIDI输入](/documentation/zh-cn/unreal-engine/midi-in-unreal-engine#midi%E8%BE%93%E5%85%A5)