# 虚幻引擎中的工作颜色空间 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/working-color-space-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:30:14.987Z

---

目录

![工作颜色空间](https://dev.epicgames.com/community/api/documentation/image/2fb31902-a61b-4c91-88df-3ae8424db2a4?resizing_type=fill&width=1920&height=335)

工作颜色空间允许你定义虚幻引擎（UE）渲染器的颜色空间。如果你正在使用在不同颜色空间中创建的纹理，或者是为了配合你所使用的显示器而在特定的颜色空间下工作，则你可以更改虚幻引擎渲染器的颜色空间。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d04e4ce-01d1-4bbe-aefa-f84f55699995/workingcolorspacewindow.png)

虚幻引擎默认使用sRBG/REC709，但你可以从提供的列表中选择使用不同颜色空间，也可以使用色度坐标自定义颜色空间。

要调整工作颜色空间，请执行以下操作：

1.  找到 **编辑（Edt） > 项目设置（Project Settings） > 渲染（Rendering） > 工作颜色空间（Working Color Space）。**
    
2.  选择工作颜色空间（Working Color Space ）下拉菜单，然后为你的项目选择你想要使用的颜色空间。
    

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50c7bd9c-526c-4721-9dcd-24bb970de56d/workingcolorspaceselect.png)

虚幻引擎支持以下颜色空间：

**颜色空间**

**说明**

sRGB / Rec709

sRGB/Rec采用国际电信联盟（ITU）制定的HDTV制片及国际电视节目交换标准的参数值。

如需详细了解，请参阅[ITU参数值](https://www.itu.int/rec/R-REC-BT.709/en) |

Rec2020

Rec2020采用ITU制定的超高清晰度电视系统制片及国际电视节目交换的 参数值。

如需详细了解，请参阅[ITU参数值](https://www.itu.int/rec/R-REC-BT.2020-0-201208-S/en) |

ACES AP0

如需详细了解ACES颜色空间，请参阅[学院色彩编码规范文档](https://docs.acescentral.com/)

ACES AP1 / ACEScg

 

P3DCI

如需详细了解P3DCI颜色空间，请参阅[国际色彩联盟网站](https://www.color.org/chardata/rgb/DCIP3.xalter)

P3D65

如需详细了解P3DCI颜色空间，请参阅[国际色彩联盟网站](https://www.color.org/chardata/rgb/DCIP3.xalter)

 

 

自定义

要使用自定义颜色空间，请输入你要用于自定义颜色空间的红色、绿色、蓝色和白色色度坐标值。

## 纹理设置：输入转换

-   （高级）源颜色设置
    
    -   颜色空间
        
        -   当颜色空间设置为无（None）（默认选项）时，不会应用任何转换。
            
        -   当手动指定了颜色空间时，在纹理被序列化时自动应用到工作颜色空间的转换。如果更改了工作颜色空间，纹理会通过经过更新的转换自动重新序列化。
            
    -   编码重载
        
        -   纹理的源编码，公开除sRGB之外更多的选项。
            
        -   *注意：这与sRGB复选框不同，sRGB复选框用于指定引擎中纹理资源的存储编码方式。*
            

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3aec8d2-0f03-4771-b793-fc613bd73fee/workingcolorspacesettings.png)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [纹理设置：输入转换](/documentation/zh-cn/unreal-engine/working-color-space-in-unreal-engine#%E7%BA%B9%E7%90%86%E8%AE%BE%E7%BD%AE%EF%BC%9A%E8%BE%93%E5%85%A5%E8%BD%AC%E6%8D%A2)