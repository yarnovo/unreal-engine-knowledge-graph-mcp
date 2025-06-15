# 根据平台设置LOD | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-per-platform-lods
> 
> 生成时间: 2025-06-14T19:02:42.245Z

---

目录

![根据平台设置LOD](https://dev.epicgames.com/community/api/documentation/image/944efc26-6aa0-46b4-baef-1ec15e3be20f?resizing_type=fill&width=1920&height=335)

虽然让静态网格体拥有多个LOD可以降低远距离物体的渲染开销，但对于内存资源有限的平台，保存这类信息所需的额外内存会成为一个问题。以下指南将讲述如何限制平台可使用的LOD数量。

## 步骤

以下部分将说明如何在PC、主机和移动平台上运行UE5项目时指定使用的LOD。

1.  首先在 **内容浏览器** 中找到一个拥有数个LOD的 **静态网格体**，然后将其在 **静态网格体编辑器** 中打开。在此例中选中的静态网格体拥有4个LOD，您可以根据项目需求选择多与少。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44d37a2d-3b48-4f49-8b7e-4a04c2046f26/01-pplatform-lod01.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44d37a2d-3b48-4f49-8b7e-4a04c2046f26/01-pplatform-lod01.png)
    
    点击查看大图。
    
2.  在静态网格体编辑器中打开静态网格体后，前往 **细节面板** 并展开 **LOD设置** 类目。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74cc32e7-7920-485a-a0d2-5439fb7b684e/02-pplatform-lod02.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74cc32e7-7920-485a-a0d2-5439fb7b684e/02-pplatform-lod02.png)
    
    点击查看大图。
    
3.  点击 **最小LOD** 输入，然后点击其旁边的白色小三角形来公开逐平台LOD选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffa24e00-143e-4004-b475-bced8c3c4f1b/03-pplatform-lod03.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffa24e00-143e-4004-b475-bced8c3c4f1b/03-pplatform-lod03.png)
    
    点击查看大图。
    
4.  在显示的列表中点击平台名，选择需要覆盖的平台。在此例中我们将设置 **桌面（Desktop）**、**移动平台（Mobile）** 和 **主机（Console）** 的覆盖。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1223cc6-0cfe-4b70-a6be-2da178a93d7c/04-pplatform-lod04.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1223cc6-0cfe-4b70-a6be-2da178a93d7c/04-pplatform-lod04.png)
    
    点击查看大图。
    
5.  最小LOD设置的工作原理是限制应先使用的LOD等级。因为范例静态网格体拥有4个LOD，这意味着可以输入范围在0到4之间的数字。输入0将允许使用每个LOD，而输入4则只允许使用最后一个LOD。在此例中，将一个 **0** 值输入到"默认"中、将一个 **1** 值输入到"桌面"中、将一个 **2** 值输入到"主机"中，最后将一个 **3** 值输入到"移动平台"中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a5dd61b-86c5-4ac5-9058-5e2d2bb0ad4f/05-pplatform-lod05.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a5dd61b-86c5-4ac5-9058-5e2d2bb0ad4f/05-pplatform-lod05.png)
    
    点击查看大图。
    
6.  操作完成后，务必按下 **保存** 按钮保存修改。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee610922-1c5e-473b-acea-eed0c66f7bae/06-pplatform-lod06.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee610922-1c5e-473b-acea-eed0c66f7bae/06-pplatform-lod06.png)
    
    点击查看大图。
    

## 最终结果

所有平台设置相应的LOD后，即可在UE5项目中使用静态网格体。请参见下图，深入理解工作原理：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/903ee4cc-1f78-4c37-afa2-dd8f8453965a/07-pplatform-lod07.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/903ee4cc-1f78-4c37-afa2-dd8f8453965a/07-pplatform-lod07.png)

点击查看大图。

-   在PC上查看此静态网格体时，其只会显示4个LOD中的3个，因为 **PC** 的 **最小LOD** 值被设为 **1**。
-   在主机上查看此静态网格体时，其只会显示4个LOD中的2个，因为 **主机** 的 **最小LOD** 值被设为 **2**。 
-   在移动平台上查看此静态网格体时，其只会显示4个LOD中的1个，因为 **静态网格体** 的 **最小LOD** 值被设为 **3**。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [static meshes](https://dev.epicgames.com/community/search?query=static%20meshes)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/setting-up-per-platform-lods#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/setting-up-per-platform-lods#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)