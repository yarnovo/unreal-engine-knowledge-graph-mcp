# Live Link Hub Settings | Unreal Engine 5.6 Documentation | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/live-link-hub-settings
> 
> 生成时间: 2025-06-14T20:07:41.706Z

---

目录

![Live Link Hub Settings](https://dev.epicgames.com/community/api/documentation/image/f1ae272a-e4d0-40c9-8c5f-e3e06053c975?resizing_type=fill&width=1920&height=335)

此页面无法以你选择的语言显示。将默认显示为**English**。如果你想以不同的语言查看，可以尝试选择另一种语言。

## General Settings

The **Capture Manager** settings in **Live Link Hub** can be accessed through the **Settings** menu.

[![Live Link Hub Settings](https://dev.epicgames.com/community/api/documentation/image/fea933d6-0e2a-4167-8261-0c5b10904b69?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/fea933d6-0e2a-4167-8261-0c5b10904b69?resizing_type=fit)

[![Plugins Capture Manager](https://dev.epicgames.com/community/api/documentation/image/6dd9cd38-9141-496f-89db-7f70c8bef4b5?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6dd9cd38-9141-496f-89db-7f70c8bef4b5?resizing_type=fit)

-   **Default Working Directory**: Specify the (potentially temporary) location where converted data will be stored during the ingest process.  
    
-   **Should Clean Working Directory**: Whether the downloaded and converted files should be deleted from the **Working Directory** after ingest is complete (successfully or otherwise).
    
-   **Download Directory**: Location where data downloaded from a remote device (such as Live Link Face device) will be stored.
    
-   **Enable Third Party Encoder**: If enabled, use a third party encoder/decoder ([FFmpeg](https://ffmpeg.org/)) for data conversion, with additional settings as provided.
    
-   **Parallel Jobs**: The number of jobs to process in parallel when ingesting.
    

Naming tokens can be used to automatically populate parts of the **Working Directory** and **Download Directory** locations.

## Third Party Encoder Support

It is possible to use an external third party media encoder or decoder ([FFmpeg](https://ffmpeg.org/)) for data conversion during ingest. This may be desirable if the default workflow using Windows Media Foundation does not support the data format you wish to work with.

To configure a third party encoder or decoder:

1.  Download and install FFmpeg from [ffmpeg.org](http://ffmpeg.org/).
    
2.  Ensure E**nable Third Party Encoder** is enabled in the settings. This will cause some additional options to be available.
    
    [![](https://dev.epicgames.com/community/api/documentation/image/f53d0583-7982-488b-8720-e59280acb31f?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f53d0583-7982-488b-8720-e59280acb31f?resizing_type=fit)
    
3.  Provide the additional settings as needed:
    
    -   **Third Party Encoder**: The full path to the ffmpeg executable.
        
    -   **Custom Video Command Arguments**: To be used when executing the third party encoder with video data.
        
    -   **Custom Audio Command Arguments**: To be used when executing the third party encoder with audio data.
        

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [General Settings](/documentation/zh-cn/unreal-engine/live-link-hub-settings#generalsettings)
-   [Third Party Encoder Support](/documentation/zh-cn/unreal-engine/live-link-hub-settings#thirdpartyencodersupport)