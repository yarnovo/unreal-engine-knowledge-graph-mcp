# 自定义按键快捷键

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/customizing-keyboard-shortcuts-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:52:10.429Z

---

目录

![自定义按键快捷键](https://dev.epicgames.com/community/api/documentation/image/ecbf88a8-cefc-43ad-8829-5ddfa89c448b?resizing_type=fill&width=1920&height=335)

**按键快捷键**，也叫做 **键绑定**，本质上是一种组合按键，可以执行特定命令或操作。你可以为一些常用命令和工具设置快捷键，以便满足你的个人习惯。设置方法如下：打开 **编辑器偏好设置** 窗口，在主菜单中，进入 **编辑 > 编辑器偏好设置**，然后选择 **键盘快捷键**。

![Keyboard Shortcuts editor in Unreal Engine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0a67b44-853e-419c-887b-8678693e138e/keyboard-shortcuts.png)

编辑器偏好设置 窗口中的快捷键编辑器。

此处的命令按功能区域分组。每个命令最多可以绑定两个快捷键。

## 新建一个键盘快捷方式

1.  点击需要绑定快捷键的命令旁的 **文本字段**。
    
2.  按下你希望使用的组合键。
    
    ![Adding a new keyboard shortcut](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2c2577a-4832-4b24-9db9-8a7eb620f651/adding-new-shortcut.png)

当你点击文本字段以外的任何位置时，虚幻引擎会自动保存新的快捷键。

如果你设置的组合键已经与另一个命令绑定，你会看到一个警告。

![键盘快捷方式已经存在](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72a93c3d-e8a8-4411-839b-3b48b8ddf38b/shortcut-already-exists.png)

如果你想删除已有的绑定，并将快捷键分配给新的命令，请点击 **覆盖** 按钮。如果你想保留现有的绑定，并取消新的绑定，请点击文本字段外的位置。

## 移除已有的快捷键

要删除一个已有的快捷键，请点击它旁边的 **删除**（**X**）按钮。

![Removing a keyboard shortcut](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c26487c-1643-4268-9b9e-af975cc86630/removing-a-shortcut.png)

## 导入和导出键盘快捷键

你可以将自定义按键绑定导出为一个 `.ini` 文件，然后导入并用于其他虚幻引擎编辑器。假如你需要在不同计算机上工作，或者经常需要重新安装引擎，这就很有用。

如需将自定义键位保存为 `.ini` 文件，请单击 **导出** 按钮。点击 **导入** 按钮可以导入外部 `.ini` 文件的自定义键位。这两个按钮都位于 **按键快捷键** 编辑器的顶部。

![Export and Import buttons in the Keyboard Shortcuts editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/946b4bba-f234-4421-a383-5718ffd10314/export-import-buttons.png)

导出 和 导入 按钮的位置。

-   [](https://dev.epicgames.com/community/search)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [新建一个键盘快捷方式](/documentation/zh-cn/unreal-engine/customizing-keyboard-shortcuts-in-unreal-engine#%E6%96%B0%E5%BB%BA%E4%B8%80%E4%B8%AA%E9%94%AE%E7%9B%98%E5%BF%AB%E6%8D%B7%E6%96%B9%E5%BC%8F)
-   [移除已有的快捷键](/documentation/zh-cn/unreal-engine/customizing-keyboard-shortcuts-in-unreal-engine#%E7%A7%BB%E9%99%A4%E5%B7%B2%E6%9C%89%E7%9A%84%E5%BF%AB%E6%8D%B7%E9%94%AE)
-   [导入和导出键盘快捷键](/documentation/zh-cn/unreal-engine/customizing-keyboard-shortcuts-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%92%8C%E5%AF%BC%E5%87%BA%E9%94%AE%E7%9B%98%E5%BF%AB%E6%8D%B7%E9%94%AE)