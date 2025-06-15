# 利用内购为虚幻引擎安卓游戏增加更多付费内容。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-use-in-app-purchases-in-unreal-engine-projects-on-android
> 
> 生成时间: 2025-06-14T20:01:05.428Z

---

目录

![使用安卓内购](https://dev.epicgames.com/community/api/documentation/image/61800076-34c7-4cfc-975b-a080617d905e?resizing_type=fill&width=1920&height=335)

## 配置

1.  在 Google Play 中设置内购：
    
    Google Play 要求 id 全部为小写字母。为便于进行蓝图设置，最好使 iOS 和安卓 ID 相匹配。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55e47062-9812-405e-b801-4a596eb03b99/image_0.png)
2.  记录使用的 ID，以及物品是否为消耗品。
    
3.  如项目为蓝图项目，则可直接开始。如项目为代码项目，尚未设置项目使用在线生态系统，则需要将以下代码块添加到项目的 Build.cs 文件中：
    
    ```cpp
             if (Target.Platform == UnrealTargetPlatform.Android)
             {
                 PrivateDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "OnlineSubsystem" });
                 DynamicallyLoadedModuleNames.Add("OnlineSubsystemGooglePlay");
             }
    		
    ```
    
4.  找到 **Project Settings > Platforms > Android** 中的 Advanced APKPackaging 部分。
    
5.  为 Extra Permissions 添加一个名为"com.android.vending.BILLING"的元素。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea690841-f9e3-4ece-95c2-1bd1e66719a1/image_2.png)
6.  编辑 \[ProjectName\]/Config/Android/AndroidEngine.ini:
    
    ```cpp
             [OnlineSubsystem]
             DefaultPlatformService=GooglePlay
    		
             [OnlineSubsystemGooglePlay.Store]
             bSupportsInAppPurchasing=True
    		
    ```
    

## 读取购买信息

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7b96d22-2af0-4e1d-af15-35b02af7ce83/image_3.png)

然后您可以使用 **读取应用程序内购买信息（Read In-App Purchase Information）** 蓝图节点（或关联的C++函数调用）阅读应用程序内购买信息。像大多数其他在线子系统函数一样，它将玩家控制器作为输入以及您的产品辨识符数组。注意，下方的进行应用程序内购买（Make In-App Purchase）采用单个辨识符，而读取（Read）可以处理信息数组。此函数返回应用程序内购买（In App Purchase）结构体的数组，且该数组的各个元素均可以经过分析来获取名称、描述、价格和其他数据，以显示在您的UI中或用于您的游戏进程逻辑。

## 完成购买

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/082bb9e1-635c-4565-a634-b6b0d3b284f7/image_4.png)

若要进行应用程序内购买，请使用 **进行应用程序内购买（Make In-App Purchases）** 蓝图节点（或关联的C++函数调用）。它将玩家控制器作为输入以及产品请求（Product Request）结构体。产品请求（Product Request）就是来自iTunes Connect或Google Play Developer主机的产品辨识符（此例中为match3theme\_night），以及产品是否是消费品。

**进行应用程序内购买（Make an In-App Purchase）** 节点是潜在的，因此您希望使其依赖于购买成功与否的任何游戏进程行为都应使用那两个执行引脚。它们将仅在收到在线服务返回的响应后执行。此节点还返回购买的完成状态（例如成功（Success）、失败（Failed）、恢复（Restored））和详细的应用程序内购买信息（In App Purchase Information）结构体。

此函数有非潜在版本（将显示蓝图节点，而不显示时钟）。此处的退出执行引脚并不会等待在线服务的响应，因此您通常需要使用潜在版本。

## 测试

如要进行安卓测试，需将打包的 APK 文件上传至 Google Play，并设置正确的测试账户。此外还需要您的自定义密钥库。

## 实用链接

-   [Administering In-app Billing (Creating products)](http://developer.android.com/google/play/billing/billing_admin.html)
-   [Testing Android](http://developer.android.com/google/play/billing/billing_testing.html)

-   [development](https://dev.epicgames.com/community/search?query=development)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [services](https://dev.epicgames.com/community/search?query=services)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [配置](/documentation/zh-cn/unreal-engine/how-to-use-in-app-purchases-in-unreal-engine-projects-on-android#%E9%85%8D%E7%BD%AE)
-   [读取购买信息](/documentation/zh-cn/unreal-engine/how-to-use-in-app-purchases-in-unreal-engine-projects-on-android#%E8%AF%BB%E5%8F%96%E8%B4%AD%E4%B9%B0%E4%BF%A1%E6%81%AF)
-   [完成购买](/documentation/zh-cn/unreal-engine/how-to-use-in-app-purchases-in-unreal-engine-projects-on-android#%E5%AE%8C%E6%88%90%E8%B4%AD%E4%B9%B0)
-   [测试](/documentation/zh-cn/unreal-engine/how-to-use-in-app-purchases-in-unreal-engine-projects-on-android#%E6%B5%8B%E8%AF%95)
-   [实用链接](/documentation/zh-cn/unreal-engine/how-to-use-in-app-purchases-in-unreal-engine-projects-on-android#%E5%AE%9E%E7%94%A8%E9%93%BE%E6%8E%A5)