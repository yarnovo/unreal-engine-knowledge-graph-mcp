# Python Scripting | Unreal Engine 5.6 Documentation | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/python-scripting
> 
> 生成时间: 2025-06-14T20:08:07.230Z

---

目录

![Python Scripting](https://dev.epicgames.com/community/api/documentation/image/8804d06c-6240-4997-94e4-82e42ca69578?resizing_type=fill&width=1920&height=335)

此页面无法以你选择的语言显示。将默认显示为**English**。如果你想以不同的语言查看，可以尝试选择另一种语言。

The download and ingest of takes using **Capture Manager** can be automated as part of a performance capture workflow with the Python API. The Capture Manager plugin includes a number of example scripts that can be used as a reference and modified to suit your specific requirements. Python scripts should be executed using the **LiveLinkHub** executable.

Use forward slashes `/`(instead of `\`) for paths that appear in a command to avoid problems with character parsing.

## Download Takes

An example script for downloading data from a **Live Link Face** device is provided in the plugin. This can be used as a reference, and modified to suit your specific requirements. It can be found in the following location:

`\Engine\Plugins\VirtualProduction\CaptureManager\CaptureManagerApp\Content\Python\examples\live_link_face_download_only.py`

The script can be run from a Windows terminal (such as PowerShell) using the following command, with the `ip-address` parameter updated for your environment:

```
LiveLinkHub.exe -ExecutePythonScript="<path-to-ue-installation>/Engine/Plugins/VirtualProduction/CaptureManager/CaptureManagerApp/Content/Python/examples/live_link_face_download_only.py --ip-address <ip-address>"
```

LiveLinkHub.exe -ExecutePythonScript="<path-to-ue-installation>/Engine/Plugins/VirtualProduction/CaptureManager/CaptureManagerApp/Content/Python/examples/live\_link\_face\_download\_only.py --ip-address <ip-address>"

复制完整片段(1行长度)

## Ingest Takes

Several example scripts are provided to demonstrate ingesting data from [Mono Video](https://dev.epicgames.com/documentation/en-us/unreal-engine/mono-video-device), [Live Link Face](https://dev.epicgames.com/documentation/en-us/unreal-engine/live-link-face-device), and [Take Archive](https://dev.epicgames.com/documentation/en-us/unreal-engine/take-archive-device) devices. These can be used as a reference and modified to suit your specific requirements. They can be found in the following folder:

`\Engine\Plugins\VirtualProduction\CaptureManager\CaptureManagerApp\Content\Python\examples\`

These scripts can be run from a Windows terminal (such as PowerShell) using the following command as a template. You will need to update the `path-to-takes` parameter for your environment:

```
LiveLinkHub.exe -ExecutePythonScript="<path-to-ue-installation>/Engine/Plugins/VirtualProduction/CaptureManager/CaptureManagerApp/Content/Python/examples/take_archive_ingest.py --archive-path <path-to-takes>"
```

LiveLinkHub.exe -ExecutePythonScript="<path-to-ue-installation>/Engine/Plugins/VirtualProduction/CaptureManager/CaptureManagerApp/Content/Python/examples/take\_archive\_ingest.py --archive-path <path-to-takes>"

复制完整片段(1行长度)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Download Takes](/documentation/zh-cn/unreal-engine/python-scripting#downloadtakes)
-   [Ingest Takes](/documentation/zh-cn/unreal-engine/python-scripting#ingesttakes)