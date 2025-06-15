# 在虚幻引擎中刷新自定义细节面板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/refreshing-custom-details-panels-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:36:26.362Z

---

目录

![刷新自定义细节面板](https://dev.epicgames.com/community/api/documentation/image/a45832f9-ca4d-4da0-a254-952a5f7c0476?resizing_type=fill&width=1920&height=335)

通常，**细节面板** 仅在你选择对象时才会重新编译。这意味着，如果你使用编辑条件在细节面板自定义中添加、隐藏或跳过添加字段，即使在你更改编辑条件中使用的变量时，细节面板也会更新。当你取消选择并重新选择对象时，细节面板会更新。

要手动更新 **细节面板**，请将调用 `IDetailLayoutBuilder::ForceRefreshDetails` 的委托添加到你要触发更新的属性。本教程介绍了如何创建此类委托。

本教程基于[细节面板快速入门](/documentation/zh-cn/unreal-engine/details-panel-quickstart-guide-for-unreal-engine)中的代码编写。

## 步骤

请按照以下步骤创建用于刷新细节的可复用委托：

1.  设置委托以调用 `IDetailLayoutBuilder::ForceRefreshDetails`。下面是一个简单的lambda函数委托，你可以将内联放入 `CustomizeDetails` 函数中，并复用于你要刷新的所有属性：
    
    CustomClassDetailsCustomization.cpp
    
    ```cpp
         const FSimpleDelegate OnValueChanged = FSimpleDelegate::CreateLambda([&DetailBuilder]()
         {
             DetailBuilder.ForceRefreshDetails();
         });
    ```
    
2.  使用 `IDetailLayoutBuilder::GetProperty` 获取指向属性的TSharedRef。
    
    CustomClassDetailsCustomization.cpp
    
    ```cpp
         TSharedRef<IPropertyHandle> boolPropertyHandle = DetailBuilder.GetProperty(GET_MEMBER_NAME_CHECKED(ACustomActor, CustomBool));
    ```
    
3.  使用 `IPropertyHandle::SetOnPropertyValueChanged` 分配委托，并强制细节面板在属性更改时刷新。
    
    CustomClassDetailsCustomization.cpp
    
    ```cpp
         boolProperty->SetOnPropertyValueChanged(OnValueChanged);
    ```
    

有了此更改，CustomBool字段的任何更改都会导致细节面板刷新。

-   [customizations](https://dev.epicgames.com/community/search?query=customizations)
-   [slate](https://dev.epicgames.com/community/search?query=slate)
-   [tools programming](https://dev.epicgames.com/community/search?query=tools%20programming)
-   [details panel](https://dev.epicgames.com/community/search?query=details%20panel)
-   [edit conditions](https://dev.epicgames.com/community/search?query=edit%20conditions)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/refreshing-custom-details-panels-in-unreal-engine#%E6%AD%A5%E9%AA%A4)