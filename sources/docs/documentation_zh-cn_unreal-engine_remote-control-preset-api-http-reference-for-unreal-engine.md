# 虚幻引擎远程控制预设API HTTP参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:35:23.824Z

---

目录

![远程控制预设API HTTP参考](https://dev.epicgames.com/community/api/documentation/image/42c94962-d1fd-40a7-a2f8-dd7a05ee4f71?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

此页面介绍[远程控制预设](/documentation/zh-cn/unreal-engine/remote-control-presets-and-web-application-for-unreal-engine)的[远程控制API](/documentation/zh-cn/unreal-engine/remote-control-for-unreal-engine)提供的HTTP端点，并详细介绍了调用各个端点时需要包括的消息正文格式。

此页面中的示例使用 **蓝图第三人称（Blueprint Third-Person）** 模板。要按照示例进行操作，请将 **远程控制预设（Remote Control Preset）** 添加到项目，将其命名为MyPreset，并提供以下属性和函数：

-   定向光源的旋转属性，重命名为 **定向光源旋转（Directional Light Rotation）**
    
-   Kismet系统库中的Print Text函数，并启用 **打印至日志（Print to Log）**
    

![远程控制预设的屏幕截图，带公开的定向光源旋转属性和Print Text函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90161e37-82cb-404d-9978-73bcdc73a4a2/01_remotecontrolpreset1.png)

## GET remote/presets

使用此端点获取所有可用预设的列表。调用将返回JSON有效载荷，并提供项目中每个 **远程控制预设（Remote Control Preset）** 的信息。

### 示例

使用空白请求正文发送请求。成功的请求将会返回200状态和包含以下属性的响应正文：

```cpp
	{
		"Presets": [
			{
				"Name": "MyPreset",
				"Path": "/Game/Presets/MyPreset.MyPreset"
			}
		]
	}

```

## GET remote/preset/insert\_preset\_name

使用此端点获取有关你项目中特定预设的详细信息。在URL中，将 `insert_preset_name` 替换为你项目中 **远程控制预设（Remote Control Preset）** 的名称。如果找到了具有指定名称的预设，调用将返回JSON有效载荷以及与预设相关的信息。

如果找不到具有指定名称的预设，调用将返回JSON有效载荷以及错误消息：

```cpp
	{
		"errorMessage": "Preset insert_preset_name could not be found."
	}
```

### 示例

发送具有空白请求正文的请求GET `http://localhost:30010/remote/preset/MyPreset` 将返回状态为200的成功请求，以及以下响应正文：

```cpp
	{
		"Preset": {
			"Name": "MyPreset",
			"Path": "/Game/Presets/MyPreset.MyPreset",
			"Groups": [
				{
					"Name": "Lighting",
					"ExposedProperties": [
						{
							"DisplayName": "Directional Light Rotation",
							"UnderlyingProperty": {
								"Name": "RelativeRotation",
								"Description": "Rotation of the component relative to its parent",
								"Type": "FRotator",
								"ContainerType": "",
								"KeyType": "",
								"Metadata": {
									"ToolTip": "Rotation of the component relative to its parent"
								}
							}
						}
					],
					"ExposedFunctions": []
				},
				{
					"Name": "Print",
					"ExposedProperties": [],
					"ExposedFunctions": [
						{
							"DisplayName": "Print Text (KismetSystemLibrary)",
							"UnderlyingFunction": {
								"Name": "PrintText",
								"Description": "Prints text to the log, and optionally, to the screen\nIf Print To Log is true, it will be visible in the Output Log window.  Otherwise it will be logged only as 'Verbose', so it generally won't show up.\n\n@param       InText                  The text to log out\n@param       bPrintToScreen  Whether or not to print the output to the screen\n@param       bPrintToLog             Whether or not to print the output to the log\n@param       bPrintToConsole Whether or not to print the output to the console\n@param       TextColor               Whether or not to print the output to the console\n@param       Duration                The display duration (if Print to Screen is True). Using negative number will result in loading the duration time from the config.",
								"Arguments": [
									{
										"Name": "WorldContextObject",
										"Description": "",
										"Type": "UObject*",
										"ContainerType": "",
										"KeyType": "",
										"Metadata": {}
									},
									{
										"Name": "InText",
										"Description": "",
										"Type": "FText",
										"ContainerType": "",
										"KeyType": "",
										"Metadata": {}
									},
									{
										"Name": "bPrintToScreen",
										"Description": "",
										"Type": "bool",
										"ContainerType": "",
										"KeyType": "",
										"Metadata": {}
									},
									{
										"Name": "bPrintToLog",
										"Description": "",
										"Type": "bool",
										"ContainerType": "",
										"KeyType": "",
										"Metadata": {}
									},
									{
										"Name": "TextColor",
										"Description": "",
										"Type": "FLinearColor",
										"ContainerType": "",
										"KeyType": "",
										"Metadata": {}
									},
									{
										"Name": "Duration",
										"Description": "",
										"Type": "float",
										"ContainerType": "",
										"KeyType": "",
										"Metadata": {}
									}
								]
							}
						}
					]
				}
			]
		}
	}

```

## GET remote/preset/insert\_preset\_name/metadata

使用此端点获取与预设关联的所有元数据。在URL中，将 `insert_preset_name` 替换为你项目中 **远程控制预设（Remote Control Preset）** 的名称。此调用将返回JSON有效载荷以及该预设的元数据条目。

### 示例

发送具有空白请求正文的请求GET `http://localhost:30010/remote/preset/MyPreset/metadata` 将返回状态为200的成功请求，以及以下响应正文：

```cpp
	{
		"Metadata": {}
	}

```

使用 `PUT remote/preset/insert_preset_name/metadata/insert_metadata_key` 添加元数据条目之后，调用此端点将在此结果中包括这些键值对。

## PUT remote/preset/insert\_preset\_name/metadata/insert\_metadata\_key

使用此端点创建或更新预设的元数据键值对。元数据键可以是人和名称，但请求正文必须在JSON对象中包含属性 **"Value"**；任何其他属性都会使值成为空白字段。调用将仅返回请求的状态。

### 示例

发送请求 `PUT http://localhost:30010/remote/preset/MyPreset/metadata/MyKey`，请求正文如下：

```cpp
	{
		"Value": "MyValue"
	}

```

成功的请求将会返回200状态。通过调用 `GET http://localhost:30010/remote/preset/MyPreset/metadata` 验证是否已创建键值对：

```cpp
	{
		"Metadata": {
			"MyKey": "MyValue"
		}
	}

```

## GET remote/preset/insert\_preset\_name/metadata/insert\_metadata\_key>

使用此端点读取与元数据键关联的值。此调用将返回JSON有效载荷以及请求的信息。

### 示例

发送请求`GET http://localhost:30010/remote/preset/MyPreset/metadata/MyKey`，使用空白的请求正文。成功的请求将会返回200状态以及以下响应正文：

```cpp
	{
		"Value": "MyValue"
	}

```

## DELETE remote/preset/insert\_preset\_name/metadata/insert\_metadata\_key

使用此端点移除与预设关联的元数据键值对。调用将仅返回请求的状态。

### 示例

发送请求 `DELETE http://localhost:30010/remote/preset/MyPreset/metadata/MyKey` 将会返回状态为200的成功请求。通过调用 `GET http://localhost:30010/remote/preset/MyPreset/metadata` 验证是否已删除键值对：

```cpp
	{
		"Metadata": {}
	}

```

## GET remote/preset/insert\_preset\_name/property/insert\_property\_name

使用此端点读取预设中公开的属性。此调用将返回JSON有效载荷以及请求的信息。

### 示例

发送请求 `GET http://localhost:30010/remote/preset/MyPreset/property/Directional Light Rotation`，使用空白的请求正文。

成功的请求将会返回200状态以及以下响应正文：

```cpp
	{
		"PropertyValues": [
			{
				"ObjectPath": "/Game/ThirdPerson/Maps/ThirdPersonMap.ThirdPersonMap:PersistentLevel.DirectionalLight_0.LightComponent0",
				"PropertyValue": {
					"Pitch": -60.779161,
					"Yaw": -14.98808,
					"Roll": 25.555014
				}
			}
		]
	}

```

## PUT remote/preset/insert\_preset\_name/property/insert\_property\_name

使用此端点更新预设中公开的属性的值。

### 示例

发送请求 `PUT http://localhost:30010/remote/preset/MyPreset/property/Directional Rotation Light`，请求正文如下：

```cpp
	{
		"PropertyValue": {
			"Pitch": -90,
			"Yaw": 0,
			"Roll": 0
		},
		"GenerateTransaction": true
	}

```

成功的请求将会返回200状态。通过查看预设中的属性来验证更改：

![图像alt文本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9946d03-9d35-4e61-9af4-922e71160f50/02_remotecontrolpreset2.png)

## PUT remote/preset/insert\_preset\_name/function/insert\_function\_name

使用此端点调用预设中公开的函数。调用将返回JSON有效载荷以及函数的任何返回值。

## 示例

发送请求 `PUT http://localhost:30010/remote/preset/MyPreset/function/Print Text (KismetSystemLibrary)`，使用以下请求正文：

```cpp
	{
		"Parameters": {
			"InText": "Hello, World"
		},
		"GenerateTransaction": true
	}

```

A successful request returns a 200 status with the following response body and "Hello, World" printed to the Output Log:

```cpp
	{
		"ReturnedValues": [
			{}
		]
	}
```

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [remote control](https://dev.epicgames.com/community/search?query=remote%20control)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [GET remote/presets](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#getremote/presets)
-   [示例](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#%E7%A4%BA%E4%BE%8B)
-   [GET remote/preset/insert\_preset\_name](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#getremote/preset/insert-preset-name)
-   [示例](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#%E7%A4%BA%E4%BE%8B-2)
-   [GET remote/preset/insert\_preset\_name/metadata](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#getremote/preset/insert-preset-name/metadata)
-   [示例](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#%E7%A4%BA%E4%BE%8B-3)
-   [PUT remote/preset/insert\_preset\_name/metadata/insert\_metadata\_key](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#putremote/preset/insert-preset-name/metadata/insert-metadata-key)
-   [示例](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#%E7%A4%BA%E4%BE%8B-4)
-   [GET remote/preset/insert\_preset\_name/metadata/insert\_metadata\_key>](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#getremote/preset/insert-preset-name/metadata/insert-metadata-key%3E)
-   [示例](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#%E7%A4%BA%E4%BE%8B-5)
-   [DELETE remote/preset/insert\_preset\_name/metadata/insert\_metadata\_key](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#deleteremote/preset/insert-preset-name/metadata/insert-metadata-key)
-   [示例](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#%E7%A4%BA%E4%BE%8B-6)
-   [GET remote/preset/insert\_preset\_name/property/insert\_property\_name](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#getremote/preset/insert-preset-name/property/insert-property-name)
-   [示例](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#%E7%A4%BA%E4%BE%8B-7)
-   [PUT remote/preset/insert\_preset\_name/property/insert\_property\_name](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#putremote/preset/insert-preset-name/property/insert-property-name)
-   [示例](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#%E7%A4%BA%E4%BE%8B-8)
-   [PUT remote/preset/insert\_preset\_name/function/insert\_function\_name](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#putremote/preset/insert-preset-name/function/insert-function-name)
-   [示例](/documentation/zh-cn/unreal-engine/remote-control-preset-api-http-reference-for-unreal-engine#%E7%A4%BA%E4%BE%8B-9)