# 在虚幻引擎中创建函数 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-functions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:34:41.439Z

---

目录

![创建函数](https://dev.epicgames.com/community/api/documentation/image/c86bb8c6-e1e1-49ea-9fa4-0de3399f732f?resizing_type=fill&width=1920&height=335)

**函数（Functions）** 是属于特定 **蓝图（Blueprint）** 的节点图表，它们可以从蓝图中的另一个图表 执行或调用。函数具有一个由节点指定的单一进入点，函数的名称 包含一个执行输出引脚。当您从另一个图表调用函数时，输出执行引脚将被激活， 从而使连接的网络执行。

以下步骤将说明如何创建按键时在屏幕上显示文本的函数。

1.  在 **Content Browser** 中，点击 **New** 按钮，然后选择 **Blueprint Class**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3adc8bb-e7cb-4330-97a2-b6cfb8c965c2/newblueprint.png)
2.  在 **Pick Parent Class** 窗口中选择 **Actor**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6dc24d7b-07e1-4174-b1a8-db0ceb98bb1d/actorblueprint.png)
3.  为蓝图命名，然后 **双击** 将其在蓝图编辑器中打开。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ac050d3-0281-4564-ab1e-62dd04eb40f2/functionblueprint.png)
4.  在图表中 **单击右键**，搜索并添加 **Event Begin Play** 事件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2d27a35-24a5-4f88-851e-29cb649a5ddd/eventbeginplay.png)
    
    游戏启动后该节点便伴随其后的脚本开始执行。
    
5.  在图表中 **单击右键**，搜索并添加 **Get Player Controller** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69dedcfe-4101-4cfc-8365-e42759996e48/getplayercontroller.png)
    
    此操作将获取当前指派的玩家控制器，并为该蓝图启用输入。
    
6.  在图表中 **单击右键**，搜索并添加 **Enable Input** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c3bb7c7-4d64-41a6-bba7-675cf9371780/enableinput.png)
    
    此节点使输入被该蓝图接收。
    
7.  按下图所示连接节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0415150-9cbe-41f9-82c9-6cd644b3781d/connectnodes.png)
    
    游戏启动后，选取玩家控制器并在该蓝图中启用控制器的输入。
    
8.  在 **MyBlueprint** 窗口中点击 **Add New Function** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c933012-8c8a-465b-9d87-93db24870d65/addfunctionbutton.png)
9.  在 **My Blueprint** 窗口中选择新函数并按 **F2** 键对其重命名。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efa760f2-d5e2-4f9d-8c6b-10756226fdd0/renamefunction.png)
    
    为函数命名，如"Print Text"。
    
10.  在函数图表中，拖动 **Print Text** 引脚，搜索并添加一个 **Print String** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa05f359-7bbd-4c33-97b1-e8ffe7b61656/printstringfunction.png)
11.  在 **In String** 框中，可对游戏中显示的文本进行修改。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9876f0a-acab-4ca1-b11e-53bd0554f570/entertext.png)
12.  点击 **Event Graph** 标签返回事件图表。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a599bd3-77a5-40ba-9ed1-3d62a38cac36/eventgraphtab.png)
13.  在图表中 **单击右键**，搜索并添加一个 **F** 按键事件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7df9e4c0-0026-4b9a-8a36-6d2cfcea7c10/fkeyevent.png)
14.  拖动 **Pressed** 引脚，搜索并添加 **Print Text** 函数。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/943d5cae-b98a-4028-a2ed-ac3785c195d4/callfunction.png)
    
    按下 **F** 键时将调用 Print Text 函数，它使用 Print String 将文本显示到屏幕上。
    
    如找不到函数，点击工具栏中的 **Compile** 按钮，然后尝试重新搜索。
    
15.  网络外观与下图相似。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40d7941c-3c83-4009-a836-b00fa46dee7a/finishedgraph.png)
16.  点击 **Compile** 按钮，然后关闭蓝图。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8111d670-dbba-45a0-bd5d-1ed478c81b5e/compilebutton.png)
17.  将蓝图拖入关卡，然后点击 **Play** 按钮在编辑器中开始游戏。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91078794-f58a-4735-b86c-d4df520f6f76/dragintolevel.png)
18.  按下 **F** 键，函数将被调用，屏幕上将显示出文本。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58f98399-9109-4fa0-b31a-cfa6e8dad2bf/workingfunction.png)

虽然这个范例函数只能在按键时在屏幕上显示文本，但也可以为其添加更多指定键按下时执行的脚本。

举例而言，函数可用于按键发生时施出魔法，脚本则包含魔法的生成、位置、魔法的相关效果、对游戏世界场景的影响、是否对其他 Actors 造成伤害等内容。它们可全部包含在函数中，使事件图表中不包含函数中已有的脚本。

如需了解函数使用与访问的其他方法，请查阅下方的 **相关页面** 章节。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)