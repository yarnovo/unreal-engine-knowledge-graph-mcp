# 面向虚幻引擎的Horde自签名证书教程 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-self-signed-certs-tutorial-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:38:14.012Z

---

目录

![Horde自签名证书教程](https://dev.epicgames.com/community/api/documentation/image/ffb84212-1ef0-4b65-9063-f474eb2ef62e?resizing_type=fill&width=1920&height=335)

## 简介

在生产环境中部署Horde时，建议使用经过验证的签名证书。

对于测试场景，安装自签名证书会很有用。

使用自签名证书会绕过基本的安全措施。请勿在生产环境中使用此技术。

## 服务器

1.  在管理员PowerShell提示下，通过运行以下命令将证书添加到本地计算机的"个人"存储中：
    
    ```shell
         New-SelfSignedCertificate -CertStoreLocation 'Cert:\LocalMachine\My' -DnsName 'my-domain.com'
    ```
    
2.  从Windows"运行"菜单运行 `certmgr.msc` ，打开证书管理器MMC管理单元。你会在 `Personal\Certificates` 分段中看到在上面创建的证书。
    
    选择证书并按Ctrl+C。找到"Trusted Root Authorities\\Certificates"分段，然后按Ctrl+V创建副本。
    
3.  打开[server.json](/documentation/zh-cn/unreal-engine/horde-orientation-for-unreal-engine)文件，取消注释 `HttpsPort` 行：
    
    ```cpp
         "HttpsPort": 13341,
    ```
    
    ...以及文件底部的证书分段 - 将主题名称更新为在上面创建的证书上的DNS名称。
    
    ```cpp
     "Kestrel":
     {
         "Certificates":
         {
             "Default":
             {
                 "Subject": "my-domain.com",
                 "Store": "My",
                 "Location": "LocalMachine"
             }
         }
     }
    ```
    
4.  重新启动服务器。你应能从同一台机器上的浏览器在端口13341通过HTTPS进行连接。
    

## 客户端

1.  通过HTTPS URL浏览到上面指定的服务器。在有关服务器具有无效证书的警告对话框中，选择将其导出到文件。
    
    要想在 **Google Chrome** 中访问，请点击地址栏中的"不安全（Not Secure）"按钮，选择"证书无效（Certificate is not valid）"，切换到证书浏览中的"细节（Details）"选项卡，然后选择"导出（Export）"。选择"Base-64编码ASCII（Base-64 Encoded ASCII）"作为文件类型，然后保存文件。
    
    也可以直接从证书管理器MMC管理单元导出证书。
    
2.  在Windows资源管理器中找到导出的证书文件，右键单击，然后选择"安装证书（Install Certificate）"。出现提示时，选择将证书导入"受信任的根证书（Trusted Root Certificates）"存储区。
    

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [简介](/documentation/zh-cn/unreal-engine/horde-self-signed-certs-tutorial-for-unreal-engine#%E7%AE%80%E4%BB%8B)
-   [服务器](/documentation/zh-cn/unreal-engine/horde-self-signed-certs-tutorial-for-unreal-engine#%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [客户端](/documentation/zh-cn/unreal-engine/horde-self-signed-certs-tutorial-for-unreal-engine#%E5%AE%A2%E6%88%B7%E7%AB%AF)