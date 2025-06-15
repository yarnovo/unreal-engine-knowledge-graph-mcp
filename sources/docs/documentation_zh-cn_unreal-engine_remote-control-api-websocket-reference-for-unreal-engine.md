# 虚幻引擎远程控制API WebSocket参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/remote-control-api-websocket-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:35:26.592Z

---

目录

![远程控制API WebSocket参考](https://dev.epicgames.com/community/api/documentation/image/314cb4e3-3e6f-4ac3-87da-176adfbb9cee?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

本页面将介绍 **远程控制API** 提供的WebSocket消息类型。本页面结束时，会提供一个内含JavaScript函数的HTML示例文件，用以演示如何使用和测试这些WebSocket消息。

引擎中的WebSocket端口默认为30020。使用 `ws://127.0.0.1:30020` 地址连接到WebSocket服务器，开始发送消息。你可以为自己的项目更改WebSocket端口。

-   在编辑器的主菜单中，选择 **编辑（Edit）> 编辑项目设置...（Edit Project Settings…）**，打开 **项目设置（Project Settings）** 窗口。
    
-   在 **项目设置（Project Settings）** 窗口中，在 **插件（Plugins）** 部分中选择 **远程控制（Web Remote Control）**。
    
-   将字段 **远程控制WebSocket服务器端口（Remote Control WebSocket Server Port）** 的值更改为想要使用的端口。
    

![远程控制插件设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f700b807-107b-4d93-b5c1-f3635df5a20d/image_0.png)

## WebSocket消息

远程控制API使用JSON格式发送WebSocket消息。所有发送到服务器的WebSocket消息必须是JSON对象，且具有以下属性：

属性

说明

MessageName

识别要发送的消息类型。选项包括：

-   HTTP
-   Preset.Register
-   Preset.Unregister

参数

各个消息类型的参数。详情请参见以下各节。

Id

可选：非常有用的标识符，供来自服务器的延迟响应所用。

### WebSocket消息类型 - HTTP

使用此消息类型通过WebSocket消息调用HTTP路由。有关可调用的HTTP路由的详细信息，请参阅[远程控制API HTTP参考](/documentation/zh-cn/unreal-engine/remote-control-api-http-reference-for-unreal-engine)。

JSON格式消息示例：

```cpp
	{
		"MessageName": "http",
		"Parameters": {
			"Url": "/remote/object/property",
			"Verb": "PUT",
			"Body": {
				"ObjectPath": "/Game/ThirdPerson/Maps/ThirdPersonMap.ThirdPersonMap:PersistentLevel.StaticMeshActor_1.StaticMeshComponent0",
				"propertyName": "StreamingDistanceMultiplier",
				"access": "READ_ACCESS"
			}
		}
	}

```

WebSocket服务器将返回一条JSON消息，以响应调用：

```cpp
	{
		"RequestId": -1,
		"ResponseCode": 200,
		"ResponseBody": {
			"StreamingDistanceMultiplier": 1
		}
	}

```

### WebSocket消息类型 - Preset.Register

使用此消息类型订阅 **远程控制预设** 发出的事件。JSON格式消息示例：

```cpp
	{
		"MessageName": "preset.register",
		"Parameters": {
			"PresetName": "MyPreset"
		}
	}

```

以下各节描述由预设发出的事件及其JSON消息。

#### 远程控制预设事件 - PresetFieldsChanged

每当预设中公开属性的值被修改时，都将发送此消息。

```cpp
	{
		"Type": "PresetFieldsChanged",
		"PresetName": "MyPreset",
		"ChangedFields":  [
			{
					"PropertyLabel": "Relative Rotation (LightSource_0)",
					"ObjectPath": "/Game/ThirdPerson/Maps/ThirdPersonMap.ThirdPersonMap:PersistentLevel.DirectionalLight_0.LightComponent0",
					"PropertyValue":  {
						"Pitch": 346.4,
						"Yaw": 0,
						"Roll": 169.2
					}
			}
			]
		}

```

#### 远程控制预设事件 - PresetFieldsAdded

每当预设中有新的公开属性加入时，都将发送此消息。响应仅包括属性添加到的组。

```cpp
	{
		"Type": "PresetFieldsAdded",
		"PresetName": "MyPreset",
		"Description": {
			"Name": "MyPreset",
			"Path": "/Game/Presets/MyPreset.MyPreset",
			"Groups": [
				{
					"Name": "Lighting",
					"ExposedProperties": [
						{
							"DisplayName": "Light Color (LightSource_0)",
							"UnderlyingProperty": {
								"Name": "LightColor",
								...
							}
						}
					],
					"ExposedFunctions": []
				}
			]
		}
	}

```

#### 远程控制预设事件 - PresetFieldsRemoved

每当预设中的属性或函数被删除后，都将发送此消息。

```cpp
	{
		"Type": "PresetFieldsRemoved",
		"PresetName": "MyPreset",
		"RemovedFields": [
			"Light Color (LightSource_0)"
		]
	}

```

#### 远程控制预设事件 - PresetFieldsRenamed

每当预设中的属性或函数被重命名后，都将发送此消息。

```cpp
	{
		"Type": "PresetFieldsRenamed",
		"PresetName": "MyPreset",
		"RenamedFields": [
			{
				"OldFieldLabel": "Relative Rotation (LightSource_0)",
				"NewFieldLabel": "Directional Light Rotation"
			}
		]
	}

```

### WebSocket消息类型 - Preset.Unregister

使用此消息类型取消订阅 **远程控制预设** 发出的事件。JSON格式消息示例：

```cpp
	{
		"MessageName": "preset.unregister",
		"Parameters": {
			"PresetName": "MyPreset"
		}
	}

```

## HTML/JavaScript示例文件

1.  在名为 **index.html** 的文件中保存以下代码：
    
    ```cpp
    	<!DOCTYPE html>
    	<html>
    	<head></head>
    	<body>
    		<h3 id="status">Connection Closed</h3>
    		<input id="in"></input>
    		<button id="btn" onclick="sendMessage()">Register Preset</button>
    		<div id="holder"></div>
    		<script>
    			// WebSocket连接成功时，用于保存该连接的变量。
    			var connection = null;
    
    			/**
    			* 此函数发送WebSocket消息，以订阅远程控制预设发出的事件。
    			* 远程控制预设由用户在HTML输入字段中指定。
    			*/
    			function sendMessage() {
    				if (connection) {
    					let input = document.getElementById("in");
    					const registerPayload = {
    						"MessageName": "preset.register",
    						"Parameters": {
    							"PresetName": `${input.value}`
    						}
    					};
    					connection.send(JSON.stringify(registerPayload));
    				}
    			}
    
    			/**
    			* 每次加载页面时都会调用此函数。
    			* 该函数设置一个WebSocket连接，如果连接成功，则更新页面并显示"连接打开（Connection Open）"。
    			* 从WebSocket服务器接收到的任何消息，都将从JSON转换成HTML元素并显示在页面上。
    			* 该函数还会在控制台中记录完整的JSON消息响应。
    			*/
    			window.onload = function() {
    				console.log("Starting test")
    				connection = new WebSocket('ws://127.0.0.1:30020');
    				connection.onopen = function () {
    					document.getElementById("status").innerHTML = "Connection Open";
    				};
    				connection.onerror = function (error) {};
    				connection.onmessage = function (message) {
    					if (message.data instanceof Blob) {
    						reader = new FileReader();
    						reader.onload = () => {
    							let holder = document.getElementById("holder");
    							let par = document.createElement("pre");
    							par.style = style="white-space: pre-line";
    							let json = JSON.parse(reader.result);
    							let text = json.Type;
    							par.innerHTML = text;
    							holder.appendChild(par);
    							console.log(reader.result)
    						};
    						reader.readAsText(message.data);
    					} else {}
    				};
    				connection.onclose = function(event) {
    				console.log("WebSocket is closed now.");
    				};
    			}
    		</script>
    	</body>
    	</html>
    ```
    
2.  在Web浏览器中打开index.html文件。如果能够成功连接WebSocket服务器，页面将显示 **连接打开（Connection Open）**。
    
    ![测试HTML/JavaScript页面的屏幕截图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbdaa6f2-0fb5-4336-b759-8e857dbea959/image_1.png)
3.  在输入字段中输入 **远程控制预设** 的名称，并更改预设的字段。
    
4.  打开浏览器的控制台日志，确认记录了响应消息。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [remote control](https://dev.epicgames.com/community/search?query=remote%20control)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [WebSocket消息](/documentation/zh-cn/unreal-engine/remote-control-api-websocket-reference-for-unreal-engine#websocket%E6%B6%88%E6%81%AF)
-   [WebSocket消息类型 - HTTP](/documentation/zh-cn/unreal-engine/remote-control-api-websocket-reference-for-unreal-engine#websocket%E6%B6%88%E6%81%AF%E7%B1%BB%E5%9E%8B-http)
-   [WebSocket消息类型 - Preset.Register](/documentation/zh-cn/unreal-engine/remote-control-api-websocket-reference-for-unreal-engine#websocket%E6%B6%88%E6%81%AF%E7%B1%BB%E5%9E%8B-presetregister)
-   [远程控制预设事件 - PresetFieldsChanged](/documentation/zh-cn/unreal-engine/remote-control-api-websocket-reference-for-unreal-engine#%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E9%A2%84%E8%AE%BE%E4%BA%8B%E4%BB%B6-presetfieldschanged)
-   [远程控制预设事件 - PresetFieldsAdded](/documentation/zh-cn/unreal-engine/remote-control-api-websocket-reference-for-unreal-engine#%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E9%A2%84%E8%AE%BE%E4%BA%8B%E4%BB%B6-presetfieldsadded)
-   [远程控制预设事件 - PresetFieldsRemoved](/documentation/zh-cn/unreal-engine/remote-control-api-websocket-reference-for-unreal-engine#%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E9%A2%84%E8%AE%BE%E4%BA%8B%E4%BB%B6-presetfieldsremoved)
-   [远程控制预设事件 - PresetFieldsRenamed](/documentation/zh-cn/unreal-engine/remote-control-api-websocket-reference-for-unreal-engine#%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E9%A2%84%E8%AE%BE%E4%BA%8B%E4%BB%B6-presetfieldsrenamed)
-   [WebSocket消息类型 - Preset.Unregister](/documentation/zh-cn/unreal-engine/remote-control-api-websocket-reference-for-unreal-engine#websocket%E6%B6%88%E6%81%AF%E7%B1%BB%E5%9E%8B-presetunregister)
-   [HTML/JavaScript示例文件](/documentation/zh-cn/unreal-engine/remote-control-api-websocket-reference-for-unreal-engine#html/javascript%E7%A4%BA%E4%BE%8B%E6%96%87%E4%BB%B6)