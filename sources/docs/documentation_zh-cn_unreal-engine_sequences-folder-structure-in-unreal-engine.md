# 虚幻引擎中的序列目录结构 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/sequences-folder-structure-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:26:04.020Z

---

目录

![序列目录结构](https://dev.epicgames.com/community/api/documentation/image/6825c497-1a32-419e-9a73-f7f963b01b4f?resizing_type=fill&width=1920&height=335)

![内容浏览器中推荐的序列文件夹结构](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10c447a3-c0c8-4843-aff0-aa99e5749f54/cb_sequences.png)

**序列（Sequences）** 文件夹包含所有 **关卡序列（Level Sequences）** 和 **动画（Animations）**，按序列缩写（所显示的示例中的CE、CP和SJ）分组。

**编辑（Edits）** 子文件夹包含应用于整个项目的一起拍摄的序列的编辑。每个单独的序列文件夹还包含一个 **编辑（Edits）** 子文件夹，它专用于该序列。

该示例使用格式 `(Sequence Code)_(Setup)_(Camera or Anim Pass)_(Take)`。但是，这仅仅是示例镜头试拍命名规范。你可将对于你的项目有意义的命名体系用于你的镜头试拍。重要的是让命名体系保持一致。

-   Edits
    
    -   EDIT\_Origin\_00\_01
        
    -   EDIT\_Origin\_0A\_07
        
-   CE（序列缩写）
    
    -   Takes - 按镜头名称和镜头试拍编号排序
        
        -   CE\_00\_0A\_01
            
            -   LS\_CE\_00\_0A\_01
                
            -   SNAP\_CE\_00\_0A\_01
                
            -   CE\_00\_0A\_01\_Subscenes
                
                -   LS\_Actor01\_CE\_00\_0A\_01
                    
                -   LS\_Actor02\_CE\_00\_0A\_01
                    
            -   Animations
                
                -   A\_CE\_00\_0A-01\_Actor02
    -   Shots
        
    -   Previs
        
    -   Techvis
        
    -   Edits
        
        -   EDIT\_CE\_00\_01
            
        -   EDIT\_CE\_0G\_99
            
    -   Sublevels
        
        -   CE\_Lighting
            
        -   CE\_Chr
            

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/644ac826-ee89-4b9f-8283-7c164f1dede0/sequences-chart.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/644ac826-ee89-4b9f-8283-7c164f1dede0/sequences-chart.png)

该图在内容浏览器中显示项目的推荐序列文件夹结构。

-   [content browser](https://dev.epicgames.com/community/search?query=content%20browser)
-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [icvfx](https://dev.epicgames.com/community/search?query=icvfx)
-   [virtual sets](https://dev.epicgames.com/community/search?query=virtual%20sets)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)