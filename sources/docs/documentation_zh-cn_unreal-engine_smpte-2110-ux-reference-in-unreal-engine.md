# SMPTE 2110 UX Reference in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/smpte-2110-ux-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:27:40.280Z

---

目录

![SMPTE 2110 UX Reference](https://dev.epicgames.com/community/api/documentation/image/b7766972-9ba8-4d4e-8508-6b929eaa23de?resizing_type=fill&width=1920&height=335)

This page provides a guide to the UX for SMPTE 2110 with NVIDIA Rivermax in Unreal Engine.

## Settings

### Project Settings

You can configure the following settings in your **Project Settings** under **Plugins - NVIDIA Rivermax**.

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/046327c7-434d-4339-9cc9-f876cb0dd9e5/image_0.png)

Settings for the NVIDIA Rivermax plugin.

**Setting**

**Description**

**Time Source**

This setting controls the clock source (timing reference) of the Rivermax library. **PTP:** On Windows, when using a BlueField-2 card, you can configure Rivermax’s clock to be PTP, handled by the DPU on the NIC. **System:** When used, Rivermax will use system time for its clock **Engine:** When used, Rivermax will use Unreal Engine’s time returned by `FPlatformTime::Seconds`.

**PTP Interface Address**

Only used for PTP Time Source. This is the interface address where PTP is coming from.

### Assets

The following sections describe asset types for NVIDIA Rivermax, which you can create and access in the Content Browser.

#### Rivermax Media Source

![Rivermax Media Source settings.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/464f79e8-75bf-45b9-97cc-e85dad591ef6/image_1.png)

Rivermax Media Source settings.

Use the Rivermax media source settings to configure a stream you want to receive in Unreal Engine. Here’s a description of each setting:

**Setting**

**Description**

**Player**

 

**Player Mode**

The player consuming incoming video samples will use this as its mode of operation. Currently, there are two options:

-   **Latest (Default)**: In this mode, when the MediaTexture associated with the player is being rendered, the newest available sample will be picked and rendered.
-   **Framelock**: The player looks for a specific frame when the texture is being rendered. Each 2110 video sample received is timestamped and we convert this to a frame number. When picking which sample to render, the player will look for a sample with a frame number matching the engine’s frame number. If it’s not present, it will wait for it with the expectation that it will be received. This is for a UE to UE scenario where the different instances of UE are framelocked, such as in an nDisplay setup.

**Use Zero Latency**

This option is only applicable when the player is in framelock mode. If set to true, when looking for a frame number, the player will look for a sample with the current frame number of the engine. If set to false, it looks for the previous (-1) frame number compared to the Engine’s. Media I/O now supports a mechanism to capture and receive media "just in time", so it is possible to add zero frames of latency when transmitting video from UE to UE. The following diagram illustrates how this works:

![Zero Latency flowchart](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59aa8c98-ddd8-4fb0-940f-aa3fd05645f8/image_4.png)

If Zero Latency is unchecked when sharing the inner frustum, the **Global Media Settings: Latency** in the nDisplay config actor properties should be set to 1. This will buffer the outer frustums and related projection matrices such that the inner is warped onto the correct position and the outer frame numbers will match the inner frame number:

![Latency setting](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d0fba0d-e7ca-40c6-abf3-06a8a70ba93a/image_5.png)

**Options**

 

**Resolution**

**If enabled**, the resolution entered will be compared against the incoming video stream. If it doesn’t match, errors will be logged. **If not enabled**, media will automatically adjust to the incoming stream detecting its resolution using RTP headers.

**Frame Rate**

The frame rate of the video stream.

**Pixel Format**

The pixel format of the video stream. A subset of the formats supported in the 2110-20 standard are supported in Unreal Engine.

![Supported pixel formats](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f86b1dd1-7cc5-4d81-9730-66e0acc9759e/image_6.png)

**Interface Address**

This is the IP address of the network interface you want to use. That is, the IP address where the video stream will be coming in. Wildcards (`*` and `?`) are supported so the system can reuse configurations from different machines with different interface IPs.

**Stream Address**

This is the IP address the stream is read from. This is usually a multicast address to which the sender is broadcasting.

**Port**

The port number the stream is sent to.

**Video**

 

**Is sRGB Input**

If true, a sRGB to Linear will be applied on RGB samples.

**Advanced**

 

**Use GPU Direct**

When enabled and if supported, sample memory will go directly from the network card memory to GPU memory, bypassing system memory. Currently globally disabled using a CVAR because of performance problems when receiving more than one stream.

Settings in the **Synchronization** category are not used currently.

#### Rivermax Media Output

![Rivermax Media Output settings.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15ef5700-67cf-49d9-a9e9-04009bfadd93/image_2.png)

Rivermax Media Output settings.

**Setting**

**Description**

**Output**

 

**Alignment Mode**

Controls the timing of the output frame scheduling. The options are:

-   **Alignment Point:** In this mode, you use Rivermax time to schedule the timing of the output frames (‘alignment’ point) based on ST2059. Each frame will be scheduled to be sent on these alignment points.
-   **Frame Creation:** In this mode, the scheduler will start scheduling each frame when one has been created. Then, at the specified frame interval it will activate to send another one. If none is available, it will wait for the next one and send it out right away. This is useful for ICVFX streaming in nDisplay to reduce latency when sending Inner Frustum render to other nodes.

**Do Continuous Output**

Only supported when the **Alignment Mode** is using the **Alignment Point** method. Use this option to constantly output a frame on each alignment point even if no frame is available to send. In that case, the previous frame is repeated. If this option is disabled and no frame is available at a given alignment point, it is skipped and the scheduler tries again at the next alignment point.

**Frame Locking Mode**

Only supported when the **Alignment Mode** is using the **Alignment Point** method. Options control what happens when a frame is captured:

-   **Free Run:** If there is no space in the presentation queue, it is dropped.
-   **Block on Reservation:** If there is no space in the presentation queue, the RHI thread is blocked until there is space in the queue. If the engine is running faster than the configured output stream (60fps vs 24fps for example), the engine is locked to the presentation frame rate.

**Presentation Queue Size**

Size of the queue of frames to be sent out. The bigger the number, the more latency you will have between the frame being sent and the frame being rendered. This defaults to double buffering but you can increase it to tolerate bigger hitches.

**Do Frame Counter Timestamping**

Only applicable when **Alignment Mode** is using the **Frame Creation** method. It converts the engine’s frame number generated when a frame was created, and uses that as the timestamp for this sample. Use it in conjunction with the Framelock player mode of RivermaxMediaSource in a UE-UE setup, mainly for nDisplay.

**Advanced**

 

**Number of Texture Buffers**

Base MediaCapture settings controlling textures pre-allocated by MediaCapture.

**Settings**

 

**Resolution**

If **enabled**, the captured texture size will be validated against the desired output resolution. If it doesn’t match, it will error out. If **disabled**, output stream resolution will be configured based on the incoming captured texture automatically.

**Frame Rate**

The frame rate of the video stream.

**Pixel Format**

The pixel format of the video stream. A subset of the formats supported in the 2110-20 standard are supported in Unreal Engine.

![Supported pixel formats](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f86b1dd1-7cc5-4d81-9730-66e0acc9759e/image_6.png)

**Interface Address**

This is the IP address of the network interface you want to use. That is, the IP address where the video stream will come from. Wildcards (`*` and `?`) are supported so the system can reuse configurations from different machines with different interface IPs.

**Stream Address**

This is the IP address the stream is sent to. This is usually a multicast address where it will be broadcasted to. To really differentiate multicast groups, the address should be made different, not only the port.

**Port**

The port number the stream is sent on.

**Video**

 

**Use GPUDirect**

When enabled and if supported, sample memory will go directly from GPU memory to the network card memory, bypassing system memory.

#### Rivermax Custom Timestep

You can configure the Engine’s custom timestep from a MediaProfile or from the project settings, and you can now use Rivermax.

![Rivermax Custom Timestep settings.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/221da682-a7de-4871-ad14-bc9c89e07c16/image_3.png)

Rivermax Custom Timestep settings.

The custom timestep uses the same alignment method as the Rivermax output when using the Alignment Point method. This means that you can genlock the Engine for a specific frame rate and align it based on the ST2059 alignment point formulas.

The custom timestep requires the PTP clock, because it uses the Time Source settings configured in Rivermax’s project settings, and it is aligned with standard genlock signals that might be used by other devices.

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [graphics](https://dev.epicgames.com/community/search?query=graphics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Settings](/documentation/zh-cn/unreal-engine/smpte-2110-ux-reference-in-unreal-engine#settings)
-   [Project Settings](/documentation/zh-cn/unreal-engine/smpte-2110-ux-reference-in-unreal-engine#projectsettings)
-   [Assets](/documentation/zh-cn/unreal-engine/smpte-2110-ux-reference-in-unreal-engine#assets)
-   [Rivermax Media Source](/documentation/zh-cn/unreal-engine/smpte-2110-ux-reference-in-unreal-engine#rivermaxmediasource)
-   [Rivermax Media Output](/documentation/zh-cn/unreal-engine/smpte-2110-ux-reference-in-unreal-engine#rivermaxmediaoutput)
-   [Rivermax Custom Timestep](/documentation/zh-cn/unreal-engine/smpte-2110-ux-reference-in-unreal-engine#rivermaxcustomtimestep)