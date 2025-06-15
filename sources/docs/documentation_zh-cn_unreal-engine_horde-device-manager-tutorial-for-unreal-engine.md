# 面向虚幻引擎的Horde设备管理器教程 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-device-manager-tutorial-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:38:13.101Z

---

目录

![Horde设备管理器教程](https://dev.epicgames.com/community/api/documentation/image/0c1d26f4-9623-454e-a1c3-035d6e1a22b2?resizing_type=fill&width=1920&height=335)

## 简介

Horde包含用于维护移动端和主机开发工具包资源的[设备管理器](/documentation/zh-cn/unreal-engine/horde-devices-for-unreal-engine)。托管设备由使用简单REST API的自动化测试来保留。此外，设备可以划分为用户池，支持共享远程设备的检出，以进行手动测试和开发。

设备管理器包含操作面板UI，可以轻松管理和监控设备。设备使用情况会生成可供查看的遥测数据，以帮助分配和安排测试。Horde设备管理器在Epic中得到广泛使用，并且经过了实战检验，具有自动问题报告、发生错误时套件翻转以及与Slack集成等功能。

虽然设备管理器与Horde[构建自动化](/documentation/zh-cn/unreal-engine/horde-build-automation-for-unreal-engine)集成，但可以通过REST api单独使用。

## 先决条件

-   Horde服务器和Android手机或平板电脑（参阅[Horde安装教程](/documentation/zh-cn/unreal-engine/horde-installation-tutorial-for-unreal-engine)）。

## 步骤

1.  在Horde操作面板上，找到设备管理视图
    
    ![设备导航](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79a46a52-31e0-4abd-835a-c865595f4d70/tutorial-devicemanager-devices.png)
2.  Horde配置示例包含针对Android平台的定义。此外还定义了共享池和自动化池，设备可以分别针对用户检出和自动化测试进行分区。
    
    ```cpp
         "devices": {
         "platforms": [
             {
             "id": "android",
             "name": "Android"
             }
         ],
         "pools": [
             {
             "id": "ue5",
             "name": "UE5",
             "poolType": "Automation"
             },
             {
             "id": "remote-ue5",
             "name": "Remote UE5",
             "poolType": "Shared"
             }
         ]
         }
    ```
    
    点击添加设备（Add Device）并填写新设备表格，其中包括设备IP。选择示例UE5自动化池来为该工作负载指定设备。
    
    ![新设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1208696d-76d9-46a6-8b15-ba381720b2d9/tutorial-devicemanager-newdevice.png)
    
    保存后，Android设备将被添加，并且可用于作业。你还可以编辑设备、应用维护说明和查看历史作业详情。
    
    ![已添加设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ebdc7129-10f3-424c-8650-63e6e7554f64/tutorial-devicemanager-deviceadded.png)
3.  可选择重复步骤2，为设备选择共享池。这将填充共享设备枢轴点，使该设备可供用户检出。
    

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [简介](/documentation/zh-cn/unreal-engine/horde-device-manager-tutorial-for-unreal-engine#%E7%AE%80%E4%BB%8B)
-   [先决条件](/documentation/zh-cn/unreal-engine/horde-device-manager-tutorial-for-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [步骤](/documentation/zh-cn/unreal-engine/horde-device-manager-tutorial-for-unreal-engine#%E6%AD%A5%E9%AA%A4)