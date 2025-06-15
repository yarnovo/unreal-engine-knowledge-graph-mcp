# 虚幻引擎中的时间码和同步锁定 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/timecode-and-genlock-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:25:09.074Z

---

目录

![时间码和同步锁定](https://dev.epicgames.com/community/api/documentation/image/434e3d88-0662-49dc-90b6-435ba0973acb?resizing_type=fill&width=1920&height=335)

默认情况下，虚幻编辑器会根据计算机上的当前系统时间生成自己的时间码。该时间码默认设置为每秒30帧，但是引擎在任何给定秒内渲染的帧数通常都超过了30帧。因此，通常会为输出中的多个连续帧指定相同的时间码值。

当您处理专业视频时，您经常需要在多个不同的视频源和信号处理设备之间保持时间码的同步。要做到这一点，您可能需要使虚幻引擎的时间码与您正在处理的视频源的时间码匹配。在某些情况下，您可能想更进一步，锁定引擎，以便引擎仅为通过引用输入得到的每个视频帧生成一个帧，我们称之为*集中同步*。

本页介绍如何使虚幻引擎采用来自您在AJA卡上指定的端口的时间码值（而不是生成自己的时间码），以及如何将虚幻引擎集中同步到该时间码信号。

时间码和集中同步管理正在积极开发中，在未来的版本中可能会发生更改。

## 在虚幻编辑器中显示时间码

当您在虚拟编辑器中工作时，要查看虚幻引擎使用的实际时间码值，请使用 **时间码提供者（Timecode Provider）** 面板。您可以在主菜单的 **窗口（Window）> 虚拟制片（Virtual Production） > 时间码提供者（Timecode Provider）** 下找到该面板。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3b5f12c-157d-412a-9389-94fe87da84ed/01-timecode-provider_ue5.png "timecode-panel.png")

它显示当前时间码、时间码提供者（时间码值的来源）和每秒生成的时间码帧数。您可以将该面板停靠在主关卡编辑器的UI中的任何位置。

或者，您可以使用以下控制台命令：

```cpp
	stat timecode

```

您将看到以 **时分秒帧（HH:MM:SS:FF）** 格式印在虚幻编辑器视口中的值：

![Timecode display in the viewport](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a22cb20-f2f8-49f4-931c-0e51548a1891/02-timecode-viewport_ue5.png "Timecode display in the viewport")

如果您已经将虚幻引擎设置为采用来自输入信号的时间码，或集中同步到视频信号，您还将看到时间码和集中同步源代码。例如：

![Genlocked and synchronized timecode in the viewport](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d8e94ac-8968-4d4a-86c8-bb8c6c59c81a/03-timecode-source-aja_ue5.png "Genlocked and synchronized timecode in the viewport")

您可以使用该命令来确认虚幻引擎正在以您期望的速率生成帧，并且它使用与输入视频相同的时间码值。

## 设置时间码和集中同步

下面的步骤显示了如何使虚幻引擎采用来自AJA或Blackmagic设备的输入SDI视频源的时间码值，以及如何使虚幻引擎将其帧率锁定到该来源，以便它仅为每个输入帧生成一个输出帧。

1.  右键单击内容浏览器，并选择 **创建基础资源（Create a Basic Asset）> 蓝图类（Blueprint Class）**。
    
    ![Create new Blueprint class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc5293aa-5843-4d8a-9f38-955adabe95c9/04-new-blueprint-class_ue5.png "Create new Blueprint class")
2.  在 **选择父类（Pick Parent Class）** 窗口中，展开 **所有类（All Classes）** 部分(1)。搜索并选择 **AjaTimecodeProvider** 类（如图）或 **BlackmagicTimecodeProvider** 类(2)，然后单击 **选择（Select）** (3)。
    
    ![TimecodeProvider parent classes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f1c29a9-c9c9-43af-b0a3-c8d6bb48824c/05-choose-blueprint-class_ue5.png "TimecodeProvider parent classes")
    
    回到内容浏览器中，为新资源提供一个描述性名称，，例如 **AJA\_Timecode\_Port** 或 **Blackmagic\_Timecode\_Port**。
    
3.  双击新资源以在蓝图编辑器中打开它，并在 **详细信息（Details）** 面板中设置属性。![Timecode Provider settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40ff40f9-5aa0-4cf2-ad18-816fd0c26e81/06-class-details_ue5.png "Timecode Provider settings")
    -   要从传入视频流读取时间码，请设置 **视频配置（Video Configuration）** 或 **媒体配置（Media Configuration）** 以指向AJA或Blackmagic卡上的端口，并设置要从源（LTC或VITC）读取的时间码类型（如果适用）。
    -   如果您使用的是AJA卡，想要从该卡上的引用端口而不是从视频流读取时间码，请启用 **Use Reference In**，并设置 **引用配置（Reference Configuration）**，而非 **视频配置（Video Configuration）**。
4.  **编译（Compile）** 并 **保存（Save）** 蓝图类，并关闭蓝图编辑器。
5.  如果您想将虚幻引擎集中同步到您的视频源，请重复前面的操作说明创建并设置另一个蓝图类，但这次使用 **AjaCustomTimeStep** 或 **BlackmagicCustomTimeStep** 作为父类。
    
    ![Custom Time Step Provider parent classes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92ac6aed-51a7-44c4-b3ab-ff289108801c/07-class-custom-time-step_ue5.png "Custom Time Step Provider parent classes")
6.  该类需要类似 **AjaTimecodeProvider** 或 **BlackmagicTimecodeProvider** 的设置：
    
    ![Custom Time Step Provider settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a721416-7a9b-4b90-96f8-9a7024a2279e/08-custom-class-details_ue5.png "Custom Time Step Provider settings")
    
    AJA卡还提供额外的设置；详细信息，请参阅提示文本。
    
7.  从主菜单选择 **编辑（Edit）> 项目设置（Project Settings）**。 在 **项目设置（Project Settings）** 窗口中，打开 **引擎（Engine）> 常规设置（General Settings）** 类别(1)，找到 **时间码（Timecode）** 部分(2)。从 **时间码提供者（TimecodeProvider）** 下拉列表中，选择创建的时间码端口资源。
    
    ![Set the TimecodeProvider in the Project Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af2427e5-dfb1-4d01-8978-4afaa7e537e4/09-timecode-provider_ue5.png "Set the TimecodeProvider in the Project Settings")
8.  如果您想要将虚幻引擎同步集中到您的视频源，找到上面的 **帧率（Framerate）** 部分，并在该部分底部展开高级属性。从 **自定义时间步（Custom TimeStep）** 下拉列表中，选择创建的集中同步端口资源。
    
    ![Set the Custom TimeStep in the Project Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec4742a8-2ff5-4ea7-9245-e80ada01ec16/10-custom-time-step_ue5.png "Set the Custom TimeStep in the Project Settings")
9.  关闭虚幻编辑器并重新启动项目。

如果您使用了媒体描述文件为项目设置多种不同的媒体配置，还可以在每个媒体描述文件中覆盖时间码和时间步提供者的项目级默认设置。更多信息，请参阅[支持多种媒体配置](/documentation/zh-cn/unreal-engine/supporting-multiple-media-configurations-in-unreal-engine)。

### 最终结果

只要您有视频输入传入到您为时间码提供者类和自定义时间步类设置的端口，且该视频具有您指定的分辨率、帧率和时间码格式，虚幻引擎应该就会采用您的视频的时间码并锁定其帧更新频率，以便它为每个输入帧生成一个输出帧。

要验证是否如此，使用[在虚幻编辑器中显示时间码](/documentation/zh-cn/unreal-engine/timecode-and-genlock-in-unreal-engine#%E5%9C%A8%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%98%BE%E7%A4%BA%E6%97%B6%E9%97%B4%E7%A0%81)中描述的选项之一。

## 时间码纹素编码

出于调试目的，AJA和Blackmagic设备的媒体源和媒体输出资源可以通过用白色照亮像素将每帧的时间码编码到视频图像中。如果您需要一种可视化的方法来验证给定的视频帧是否与它所对应的时间码信号匹配，那么该功能可以十分有用。

时间码通常以 **时分秒帧（HH:MM:SS:FF）** 格式表示，共8位数。从图像的顶部开始，在纹理输出中为每个数字指定一行。在每一行中，从图像的左边到时间码数字的值进行计数，以找到表示时间码值的像素。最左边的像素为0号像素。

例如，假定时间码值为12:08:44:12:

-   在第一行，左起第二个像素被照亮（1号像素）。
-   在第二行，左起第三个像素被照亮（2号像素）。
-   在第三行，最左边的像素被照亮（0号像素）。
-   在第四行，左起第九个像素被照亮（8号像素）。
-   以此类推。

-   [professional video](https://dev.epicgames.com/community/search?query=professional%20video)
-   [guide](https://dev.epicgames.com/community/search?query=guide)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [在虚幻编辑器中显示时间码](/documentation/zh-cn/unreal-engine/timecode-and-genlock-in-unreal-engine#%E5%9C%A8%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%98%BE%E7%A4%BA%E6%97%B6%E9%97%B4%E7%A0%81)
-   [设置时间码和集中同步](/documentation/zh-cn/unreal-engine/timecode-and-genlock-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E6%97%B6%E9%97%B4%E7%A0%81%E5%92%8C%E9%9B%86%E4%B8%AD%E5%90%8C%E6%AD%A5)
-   [最终结果](/documentation/zh-cn/unreal-engine/timecode-and-genlock-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [时间码纹素编码](/documentation/zh-cn/unreal-engine/timecode-and-genlock-in-unreal-engine#%E6%97%B6%E9%97%B4%E7%A0%81%E7%BA%B9%E7%B4%A0%E7%BC%96%E7%A0%81)