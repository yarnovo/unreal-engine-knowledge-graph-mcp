# 为虚幻引擎Android项目上架Google Play Store设置签名 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/signing-android-projects-for-release-on-the-google-play-store-with-unreal-engine
> 
> 生成时间: 2025-06-14T20:01:29.664Z

---

目录

![项目发布签名](https://dev.epicgames.com/community/api/documentation/image/d842d746-4595-44ef-8b10-a461fc764c2d?resizing_type=fill&width=1920&height=335)

选择操作系统：

Windows macOS Linux

在本文中，我们将介绍为了让 UE4 移动端项目上架 Google Play 商店，你需要做好哪些准备。

请注意：此文档只集中讨论与 UE4 项目上架 Google Play 商店有关的内容。 如需了解 Google Play 商店的整体信息，请查阅官方 [Google Developer Console 帮助](https://support.google.com/googleplay/android-developer#topic=3450986)。

## 生成密钥

在提交甚至上传项目到 Google Play 商店之前，需要生成一个密钥库。 密钥库是一个单独的密钥，可确保您的项目只链接到您的 Google Play 账户。 以下部分将讲述如何生成密钥，以及如何进行放置，以便项目打包时使用。

1.  打开命令行窗口，找到 Android Studio 安装 `keytool.exe` 文件的目录。如果你使用的是默认安装路径，这个目录应该是 `\jre\bin`。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/631b5c32-3e10-4198-8878-455116eefa47/01.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dc7cafd-b552-4f60-9931-a7d7cf0ffe81/01_mac.png)
2.  打开命令行弹出窗口后，输入下列命令行参数并按下 Enter 键。
    
    ```cpp
             keytool -genkey -v -keystore ExampleKey.keystore -alias MyKey -keyalg RSA -keysize 2048 -validity 10000
    ```
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f39b9498-f621-4d23-9e0f-f510f2700146/02.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1ed1bf4-e9d8-4fb7-905a-69d3c18267ba/02_mac.png)
    
    可复制以上文本，右键粘贴到命令行参数窗口中，无需手动输入
    
3.  为密钥库输入密码。请牢记密码，因为之后需要多次输入密码。在此例中，我们使用 **123password** 作为密钥库密码。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddcf55d4-f460-41ed-b8be-c7f05b96d6e4/03.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b710b014-208e-4bad-9264-bd23355db433/03_mac.png)
4.  之后需要在命令行窗口中输入姓和名。在此例中输入名称 **TestGuy**，再按下 Enter 键。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6efaa9f3-5253-44db-a508-2359d3e88373/04.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57ff4a55-dfaa-424c-aecf-0cc4d59e740b/04_mac.png)
5.  然后输入组织单位名。在此例中输入名称 **MyCompany**，再按下 Enter 键。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9ab4290-9f61-4c98-b6cb-afe24c18d468/05.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f8735ff-0b79-4e89-bb7d-1ab28c506713/05_mac.png)
6.  输入组织名称。在此例中输入 **MyGame**，再按下 Enter 键。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57941a63-b04c-49ab-a14a-cce2e6d79de3/06.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94399e5f-80b7-47a9-bb75-8795cb6211f2/06_mac.png)
7.  之后输入您所在的城市名或地名。在此例中输入 **MyCity**，然后按下 Enter 键继续。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1767697e-87e9-43cf-b842-df56a44c3bb7/07.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a31bb2b-d043-4e87-9a12-89181a63cbfc/07_mac.png)
8.  随后输入城市所在的州或省名。在此例中输入 **NC**，再按下 Enter 键继续。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/750fa4bc-970d-48be-8191-223f2f8334c7/08.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b22de72-7300-4eb9-8741-35bf38aa8664/08_mac.png)
9.  输入城市或州所在的城市代码。在此例中输入 **00**，再按下 Enter 键继续。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a8faa89-e84b-445f-8c2d-296f8ec0af6c/09.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28a31928-f937-4cec-9c2f-c2a979df6fc8/09_mac.png)
10.  将出现询问，确定输入的全部信息正确无误。在命令行窗口中输入 **Yes** 或 **Y**，再按下 Enter 键继续。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41cbd630-b3ec-4a19-8eca-b76a96eb561b/10.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b0850e0-8b55-41ef-9114-2c91c56ee4f0/10_mac.png)
11.  我们只需要在此密钥库中保存一个密钥，因此需要执行的下一步操作就是在要求输入密码时按下 Enter 键。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cb0e163-2596-470b-abae-880d6c8ff1b4/11.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7447174-cdd0-44b3-ba5f-06ac0440bdf4/11_mac.png)
12.  如全部设置正确，命令行窗口的最后一行将显示 **\[Storing ExampleKey.keystore\]**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a479ea7c-9b42-4076-ba01-799016e05410/12.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/146dbc82-4d53-486c-bc70-898e3c545f22/12_mac.png)

密钥被创建后将被放置在 `\jre\bin` 目录中。该目录包含 `keytool.exe`。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1689a7cd-31fc-4ae9-873d-6405aedf5825/keystore_location.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83f5e7a2-9175-4e06-8daa-48a6db244b34/keystore_location_mac.png)

## 放置密钥

密钥生成后，需要将其放置在 UE4 项目的以下路径中。

```cpp
	（游戏文件夹）\Build\Android
```

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b539a5f-63e8-4ebc-9507-64ba6ddfdc3a/keystore_build_location.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c866a20c-26be-456d-bffb-4ac4a6ca2172/keystore_build_location_mac.png)

## 应用密钥

将密钥放置到 **（游戏文件夹）\\Build\\Android** 文件夹中后，需要执行下列操作将其应用到 UE4 项目。

1.  前往 UE4 中的 **Edit > ProjectSettings > Platforms > Android**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f36e0657-4403-499f-9218-1d65d9f955b4/android_signing_section.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/324c5cf9-d1a5-4cd2-b352-2cd9ac6ae58f/android_signing_section_mac.png)
2.  在 **APK Packing** 部分下，将 **Store Version** 设为数字 1（如这是首次上传项目到商店）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cbcfdf0f-bf1c-43f8-a560-72e771214d34/apkpackaging_store_number.png)
    
    每次重新打包游戏再次上传到商店时，均需要增加 Store Version 的数字。如未执行此操作，新的 APK 文件将无法上传覆盖旧文件。
    
3.  随后将以上用于生成密钥库的密钥库信息填入 **Distribution Signing** 中的以下栏位。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78c605a6-bfab-4755-a9ef-0f06230eff2b/ue4_keystore_input.png)
    
    属性名
    
    描述
    
    范例中使用的名称
    
    Key Store
    
    为 .Keystore file 文件赋予的命名
    
    ExampleKey.keystore
    
    Key Alias
    
    .Keystore file 文件的命名。- ExampleKey.keystore
    
    MyKey
    
    Key Store Password
    
    用于保护密钥的密码
    
    123password
    
4.  所有信息填入后，前往项目的 Packaging 部分，将 Project 部分下的 Full Rebuild 和 For Distribution 启用。
    

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17f50574-ef59-46f6-88c1-f74a9c2a1055/ue4_shipping_settings.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37ece400-598b-4bae-a65e-fa6edac68443/ue4_shipping_settings_mac.png)

## 部署至 Google Play 商店

现在即可将项目上传至 Google Play 商店。 如需了解如何将项目上传至 Google Play 商店，请查阅官方 [Google Developer Console](https://support.google.com/googleplay/android-developer#topic=3450986) 帮助页面。

-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [distribution](https://dev.epicgames.com/community/search?query=distribution)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [生成密钥](/documentation/zh-cn/unreal-engine/signing-android-projects-for-release-on-the-google-play-store-with-unreal-engine#%E7%94%9F%E6%88%90%E5%AF%86%E9%92%A5)
-   [放置密钥](/documentation/zh-cn/unreal-engine/signing-android-projects-for-release-on-the-google-play-store-with-unreal-engine#%E6%94%BE%E7%BD%AE%E5%AF%86%E9%92%A5)
-   [应用密钥](/documentation/zh-cn/unreal-engine/signing-android-projects-for-release-on-the-google-play-store-with-unreal-engine#%E5%BA%94%E7%94%A8%E5%AF%86%E9%92%A5)
-   [部署至 Google Play 商店](/documentation/zh-cn/unreal-engine/signing-android-projects-for-release-on-the-google-play-store-with-unreal-engine#%E9%83%A8%E7%BD%B2%E8%87%B3googleplay%E5%95%86%E5%BA%97)