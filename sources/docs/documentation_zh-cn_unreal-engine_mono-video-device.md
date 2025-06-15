# Mono Video Device | Unreal Engine 5.6 Documentation | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mono-video-device
> 
> 生成时间: 2025-06-14T20:07:39.679Z

---

目录

![Mono Video Device](https://dev.epicgames.com/community/api/documentation/image/d7e41b95-07bd-4395-a13c-3f649ae44bff?resizing_type=fill&width=1920&height=335)

此页面无法以你选择的语言显示。将默认显示为**English**。如果你想以不同的语言查看，可以尝试选择另一种语言。

The **Mono Video** device enables the ingest of individual video files as mono takes. If the video contains an audio track it will also be extracted during ingest.

[![Capture Manager Device Details](https://dev.epicgames.com/community/api/documentation/image/61ca965e-501c-4439-856e-5d3c73de3d6c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/61ca965e-501c-4439-856e-5d3c73de3d6c?resizing_type=fit)

-   **Display Name**: The name of the device as it will appear in the **Devices** list.
    
-   **Take Directory**: The path to the root folder containing video files. This folder can contain subfolders.
    
-   **Video Discovery Expression**: [Tokens](https://dev.epicgames.com/documentation/en-us/unreal-engine/mono-video-device#discovery-expression-tokens) that can be extracted from the folder and file name to identify the take.
    

A visual example of the content expected to be found by the **Mono Video** device in the **Take Directory** is shown below:

```
+-- takes
|   +-- take_1.mov
|   \-- take_2.mov
|
\-- take_3.mov
```

+-- takes | +-- take\_1.mov | \\-- take\_2.mov | \\-- take\_3.mov

复制完整片段(5行长度)

## Discovery Expression Tokens

The **Video Discovery Expression** is used to define the naming convention for video files in your takes. The available tokens are:

`<Slate>`

The slate name.

**`<Name>`**

The identifier for the camera.

**`<Take>`**

The take number.

**`<Any>`**

Any valid string.

`<Auto>`

Used without any other tokens to automatically identify takes based on the directory structure.

Tokens can be separated using the following delimiters: `_-.\`

When not using the `<Auto>` token, both `<Slate>` and `<Name>` must be present.

For example, consider the following take: `MyTakeFolder/MySlate_MyName_SomeString-005.mov`. If the Video Discovery Expression is set to the default value of `<Auto>`, the following tokens will be identified:

**Slate**

`MySlate_MyName_SomeString`

**Name**

`video` (the default value)

**Take**

`1` (the default value)

However, if the Video Discovery Expression is set to `<Slate>_<Name>_<Any>-<Take>` the following tokens will be extracted instead:

**Slate**

`MySlate`

**Name**

`MyName`

**Take**

`5`

**Any**

`SomeString`

In both cases, the extension `.mov` is ignored.

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Discovery Expression Tokens](/documentation/zh-cn/unreal-engine/mono-video-device#discovery-expression-tokens)