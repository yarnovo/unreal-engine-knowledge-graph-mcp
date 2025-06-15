# How to Render Out Final Images and Video | Unreal Engine 5.6 Documentation | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-render-out-final-images-and-video
> 
> 生成时间: 2025-06-14T18:51:12.136Z

---

目录

![How to use the Movie Render Pipeline for Final Images and Video](https://dev.epicgames.com/community/api/documentation/image/cbb9c906-e92c-4d75-b622-e8d3839599f6?resizing_type=fill&width=1920&height=335)

此页面无法以你选择的语言显示。将默认显示为**English**。如果你想以不同的语言查看，可以尝试选择另一种语言。

Unreal Engine’s [Movie Render Pipeline](https://dev.epicgames.com/documentation/en-us/unreal-engine/BlueprintAPI/MovieRenderPipeline) is an offline image sequence and movie rendering solution. When creating linear content using its 3D rendering and lighting capabilities, you can use this pipeline to achieve higher quality results when compared to traditional real-time rendering.

Using the offline rendering with Movie Render Pipeline provides an opportunity to use settings and commands that greatly increase quality, precision, and look for features like ray tracing with Lumen Global Illumination and Reflections. Offline rendering in Unreal Engine also provides improved motion blur while removing unwanted anti-aliasing artifacts.

Unreal Engine’s Movie Render Pipeline offers three tools you can use to render your project. Each offers different features to meet your project’s needs:

-   [Movie Render Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/movie-render-pipeline-in-unreal-engine#movie-render-graph) (MRG) is a graph-based interface you can use to build logic to execute render operations.
    
-   [Movie Render Queue](https://dev.epicgames.com/documentation/en-us/unreal-engine/movie-render-pipeline-in-unreal-engine#movie-render-queue) (MRQ) is a tool you can use to create presets and scripts to queue render processes and then export high-quality images. This is a plugin you’ll need to enable for the project if you want to use it.
    
-   [Quick Render](https://dev.epicgames.com/documentation/en-us/unreal-engine/movie-render-pipeline-in-unreal-engine#quick-render) is a tool inside of Sequencer you can use to render the project quickly with one-click and some customizable parameters.
    

For the purposes of this guide, we’ll use the Quick Render tool in Sequencer to demonstrate how you can render your scene. We recommend taking a look at MRG and MRQ documentation on your own to learn more about these and all the parameters you can set to render at even higher levels of quality afforded an offline rendering option while enjoying the flexibility a real-time engine brings to your process.

## Using Quick Render

The **Quick Render** tool is part of Sequencer’s main toolbar. It provides quick access to the **Movie Scene Capture** (legacy) tool and **Movie Render Queue** (when its plugin is activated for the project). 

To open the quick render settings, click the **Quick Render** (Clapper board) icon.

[![Quick Render Tool in Sequencer.](https://dev.epicgames.com/community/api/documentation/image/93bea546-63f3-46ec-bfd2-b34762d01fd9?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/93bea546-63f3-46ec-bfd2-b34762d01fd9?resizing_type=fit)

Quick Render Tool in Sequencer.

The legacy **Movie Scene Capture** tool is a tool with minimal settings that can export image sequences or video for quick review. This can be useful for workflows that do not require heavy adjustment to rendering settings, or as a way to quickly see the composition of the scene and its animations rendered out.

[![Movie Scene Capture (Legacy) settings](https://dev.epicgames.com/community/api/documentation/image/88d740e8-91e7-4321-a561-5cfc30f9e126?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/88d740e8-91e7-4321-a561-5cfc30f9e126?resizing_type=fit)

Movie Scene Capture (Legacy) settings

From this dialogue, you can configure settings to output the image or video. When you’re ready to begin, click **Capture Movie** to start the process.

You should see a window open and start to render out your video or images. By default, a video will be rendered out. Below is the final result from this guide.

-   [maya](https://dev.epicgames.com/community/search?query=maya)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Using Quick Render](/documentation/zh-cn/unreal-engine/how-to-render-out-final-images-and-video#usingquickrender)