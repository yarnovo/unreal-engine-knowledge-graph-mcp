# Rundown Server WebSocket API Reference | Unreal Engine 5.6 Documentation | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference
> 
> 生成时间: 2025-06-14T20:50:41.262Z

---

目录

此页面无法以你选择的语言显示。将默认显示为**English**。如果你想以不同的语言查看，可以尝试选择另一种语言。

## Request: Ping

**Message Type:** /Script/AvalancheMedia.AvaRundownPing

Request published by client to discover servers on the message bus. The available servers will respond with a [Message: Pong](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pong).

**Properties:**

Name

Description

bAuto

True if the request originates from an automatic timer. False if request originates from user interaction.

RequestedApiVersion

API Version the client has been implemented against. If unspecified the server will consider the latest version is requested.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"bAuto": true,
		"requestedApiVersion": -1,
		"requestId": -1
	}
```

## Request: GetServerInfo

**Message Type:** /Script/AvalancheMedia.AvaRundownGetServerInfo

Requests the extended server information. Response is [Message: ServerInfo](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:serverinfo).

**Properties:**

Name

Description

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"requestId": -1
	}
```

## Request: GetPlayableAssets

**Message Type:** /Script/AvalancheMedia.AvaRundownGetPlayableAssets

Requests a list of playable assets that can be added to a rundown template. Response is [Message: PlayableAssets](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:playableassets).

**Properties:**

Name

Description

Query

The search query which will be compared with the asset names.

Limit

The maximum number of search results returned.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"query": "",
		"limit": 0,
		"requestId": -1
	}
```

## Request: GetRundowns

**Message Type:** /Script/AvalancheMedia.AvaRundownGetRundowns

Requests the list of rundowns that can be opened on the current server. Response is [Message: Rundowns](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:rundowns).

**Properties:**

Name

Description

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"requestId": -1
	}
```

## Request: LoadRundown

**Message Type:** /Script/AvalancheMedia.AvaRundownLoadRundown

Loads the given rundown for playback operations. This will also open an associated playback context. Only one rundown can be opened for playback at a time by the rundown server. If another rundown is opened, the previous one will be closed and all currently playing pages stopped, unless the rundown editor is opened. The rundown editor will keep the playback context alive.

If the path is empty, nothing will be done and the server will reply with a [Message: ServerMsg](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:servermsg) message indicating which rundown is currently loaded.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"requestId": -1
	}
```

## Request: CreateRundown

**Message Type:** /Script/AvalancheMedia.AvaRundownCreateRundown

Creates a new rundown asset.

The full package name is going to be: \[PackagePath\]/\[AssetName\] The full asset path is going to be: \[PackagePath\]/\[AssetName\].\[AssetName\] For all other requests, the rundown reference is the full asset path.

Response is [Message: ServerMsg](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:servermsg).

**Properties:**

Name

Description

PackagePath

Package path (excluding the package name)

AssetName

Asset Name.

bTransient

Create the rundown as a transient object. **Remark:** For game builds, the created rundown will always be transient, regardless of this flag.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"packagePath": "",
		"assetName": "",
		"bTransient": true,
		"requestId": -1
	}
```

## Request: DeleteRundown

**Message Type:** /Script/AvalancheMedia.AvaRundownDeleteRundown

Deletes an existing rundown.

Response is [Message: ServerMsg](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:servermsg).

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"requestId": -1
	}
```

## Request: ImportRundown

**Message Type:** /Script/AvalancheMedia.AvaRundownImportRundown

Imports rundown from json data or file.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

RundownFile

If specified, this is a server local path to a json file from which the rundown will be imported.

RundownData

If specified, json data containing the rundown to import.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"rundownFile": "",
		"rundownData": "",
		"requestId": -1
	}
```

## Request: ExportRundown

**Message Type:** /Script/AvalancheMedia.AvaRundownExportRundown

Exports a rundown to json data or file. This command is supported in game build.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

RundownFile

Optional path to a server local file where the rundown will be saved.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"rundownFile": "",
		"requestId": -1
	}
```

## Request: SaveRundown

**Message Type:** /Script/AvalancheMedia.AvaRundownSaveRundown

Requests that the given rundown be saved to disk. The rundown asset must have been loaded, either by an edit command or playback, prior to this command. Unloaded assets will not be loaded by this command. This command is not supported in game builds.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

bOnlyIfIsDirty

The save command will be executed only if the asset package is dirty.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"bOnlyIfIsDirty": false,
		"requestId": -1
	}
```

## Request: CreatePage

**Message Type:** /Script/AvalancheMedia.AvaRundownCreatePage

Requests a new page be created from the specified template in the given rundown.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

IdGeneratorParams

Defines the parameters for the page id generator algorithm. See [Struct: CreatePageIdGeneratorParams](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:createpageidgeneratorparams).

TemplateId

Specifies the template for the newly created page.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"idGeneratorParams":
		{
			"referenceId": -1,
			"increment": 1
		},
		"templateId": -1,
		"requestId": -1
	}
```

## Request: DeletePage

**Message Type:** /Script/AvalancheMedia.AvaRundownDeletePage

Requests the page be deleted from the given rundown.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

PageId

Id of the page to be deleted.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"pageId": -1,
		"requestId": -1
	}
```

## Request: CreateTemplate

**Message Type:** /Script/AvalancheMedia.AvaRundownCreateTemplate

Requests the creation of a new template. If successful, the response is [Message: ServerMsg](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:servermsg) with a "Template \[Id\] Created" text. The id of the created template can be parsed from that message's text. Also a secondary [Message: PageListChanged](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pagelistchanged) event with added template id will be sent.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

IdGeneratorParams

Defines the parameters for the page id generator algorithm. See [Struct: CreatePageIdGeneratorParams](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:createpageidgeneratorparams).

AssetPath

Specifies the asset path to assign to the template.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"idGeneratorParams":
		{
			"referenceId": -1,
			"increment": 1
		},
		"assetPath": "",
		"requestId": -1
	}
```

## Request: CreateComboTemplate

**Message Type:** /Script/AvalancheMedia.AvaRundownCreateComboTemplate

Requests the creation of a new combo template. If successful, the response is [Message: ServerMsg](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:servermsg) with a "Template \[Id\] Created" text. The id of the created template can be parsed from that message's text. Also a secondary [Message: PageListChanged](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pagelistchanged) event with added template id will be sent.

**Remark:** A combination template can only be created using transition logic templates that are in different transition layers.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

IdGeneratorParams

Defines the parameters for the page id generator algorithm. See [Struct: CreatePageIdGeneratorParams](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:createpageidgeneratorparams).

CombinedTemplateIds

Specifies the template ids that are combined.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"idGeneratorParams":
		{
			"referenceId": -1,
			"increment": 1
		},
		"combinedTemplateIds": [],
		"requestId": -1
	}
```

## Request: DeleteTemplate

**Message Type:** /Script/AvalancheMedia.AvaRundownDeleteTemplate

Requests deletion of the given template.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

PageId

Specifies the *template* id to delete.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"pageId": -1,
		"requestId": -1
	}
```

## Request: ChangeTemplateBP

**Message Type:** /Script/AvalancheMedia.AvaRundownChangeTemplateBP

Sets the Page's template asset. This applies to template pages only.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

TemplateId

Specifies the template id to modify.

AssetPath

Specifies the asset path to assign.

bReimport

If true, the asset will be re-imported and the template information will be refresh from the source asset.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"templateId": -1,
		"assetPath": "",
		"bReimport": false,
		"requestId": -1
	}
```

## Request: GetPages

**Message Type:** /Script/AvalancheMedia.AvaRundownGetPages

Requests the list of pages from the given rundown.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"requestId": -1
	}
```

## Request: GetPageDetails

**Message Type:** /Script/AvalancheMedia.AvaRundownGetPageDetails

Requests the page details from the given rundown. Response is [Message: PageDetails](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pagedetails).

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

PageId

Specified the requested page id.

bLoadRemoteControlPreset

This will request that a managed asset instance gets loaded to be accessible through WebRC.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"pageId": -1,
		"bLoadRemoteControlPreset": false,
		"requestId": -1
	}
```

## Request: PageChangeChannel

**Message Type:** /Script/AvalancheMedia.AvaRundownPageChangeChannel

Sets the channel of the given page. The page must be valid (and not a template) and the channel must exist in the current profile. Along with the corresponding response, this will also trigger a [Message: PageChannelChanged](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pagechannelchanged) event.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

PageId

Specifies the page that will be modified.

ChannelName

Specifies a valid channel to set for the specified page.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"pageId": -1,
		"channelName": "",
		"requestId": -1
	}
```

## Request: ChangePageName

**Message Type:** /Script/AvalancheMedia.AvaRundownChangePageName

Sets page name. Works for template or instance pages. By default, the command will set the page's "friendly" name as it is the one used for display purposes. The page name is reserved for native code uses. Along with the corresponding response, this will also trigger a [Message: PageNameChanged](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pagenamechanged) event.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

PageId

Specifies the page or template that will be modified.

PageName

Specifies the new page name.

bSetFriendlyName

If true, the page's friendly name will be set. The page name is usually set by the native code. For display purposes, it is preferable to use the "friendly" name.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"pageId": -1,
		"pageName": "",
		"bSetFriendlyName": true,
		"requestId": -1
	}
```

## Request: UpdatePageFromRCP

**Message Type:** /Script/AvalancheMedia.AvaRundownUpdatePageFromRCP

This is a request to save the managed Remote Control Preset (RCP) back to the corresponding page values.

**Properties:**

Name

Description

bUnregister

Unregister the Remote Control Preset from the WebRC.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"bUnregister": false,
		"requestId": -1
	}
```

## Request: PageAction

**Message Type:** /Script/AvalancheMedia.AvaRundownPageAction

Request for a program page command on the current playback rundown.

**Properties:**

Name

Description

PageId

Specifies the Page Id that is the target of this action command.

Action

Specifies the page action to execute. See [Enum: PageActions](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:pageactions).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"pageId": -1,
		"action": "None",
		"requestId": -1
	}
```

## Request: PagePreviewAction

**Message Type:** /Script/AvalancheMedia.AvaRundownPagePreviewAction

Request for a preview page command on the current playback rundown.

**Properties:**

Name

Description

PreviewChannelName

Specifies which preview channel to use. If left empty, the rundown's default preview channel is used.

PageId

Specifies the Page Id that is the target of this action command.

Action

Specifies the page action to execute. See [Enum: PageActions](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:pageactions).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"previewChannelName": "",
		"pageId": -1,
		"action": "None",
		"requestId": -1
	}
```

## Request: PageActions

**Message Type:** /Script/AvalancheMedia.AvaRundownPageActions

Command to execute a program action on multiple pages at the same time. This is necessary for pages to be part of the same transition.

**Properties:**

Name

Description

PageIds

Specifies a list of page Ids that are the target of this action command.

Action

Specifies the page action to execute. See [Enum: PageActions](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:pageactions).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"pageIds": [],
		"action": "None",
		"requestId": -1
	}
```

## Request: PagePreviewActions

**Message Type:** /Script/AvalancheMedia.AvaRundownPagePreviewActions

Command to execute a preview action on multiple pages at the same time. This is necessary for pages to be part of the same transition.

**Properties:**

Name

Description

PreviewChannelName

Specifies which preview channel to use. If left empty, the rundown's default preview channel is used.

PageIds

Specifies a list of page Ids that are the target of this action command.

Action

Specifies the page action to execute. See [Enum: PageActions](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:pageactions).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"previewChannelName": "",
		"pageIds": [],
		"action": "None",
		"requestId": -1
	}
```

## Request: TransitionAction

**Message Type:** /Script/AvalancheMedia.AvaRundownTransitionAction

Command to override transition logic directly. As it currently stands, we can only have 1 transition per channel. If there is an issue with it, it may block further playback.

**Properties:**

Name

Description

ChannelName

Specifies the channel that is the target of this action command.

Action

Specifies the page transition action to execute. See [Enum: TransitionActions](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:transitionactions).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channelName": "",
		"action": "None",
		"requestId": -1
	}
```

## Request: TransitionLayerAction

**Message Type:** /Script/AvalancheMedia.AvaRundownTransitionLayerAction

Command to override transition logic.

**Properties:**

Name

Description

ChannelName

Specifies the channel that is the target of this action command.

LayerNames

Specifies the transition logic layers for this action command.

Action

Specifies the page layer action to execute. See [Enum: TransitionLayerActions](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:transitionlayeractions).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channelName": "",
		"layerNames": [],
		"action": "None",
		"requestId": -1
	}
```

## Request: GetProfiles

**Message Type:** /Script/AvalancheMedia.AvaRundownGetProfiles

Requests a list of all profiles loaded for the current broadcast configuration. Response is [Message: Profiles](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:profiles).

**Properties:**

Name

Description

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"requestId": -1
	}
```

## Request: DuplicateProfile

**Message Type:** /Script/AvalancheMedia.AvaRundownDuplicateProfile

Duplicates an existing profile. Fails if the new profile name already exist. Fails if the source profile does not exist.

**Properties:**

Name

Description

SourceProfileName

Specifies the existing profile to be duplicated.

NewProfileName

Specifies the name of the new profile to be created.

bMakeCurrent

If true the created profile is also made "current". Equivalent to [Request: SetCurrentProfile](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:setcurrentprofile).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"sourceProfileName": "",
		"newProfileName": "",
		"bMakeCurrent": true,
		"requestId": -1
	}
```

## Request: CreateProfile

**Message Type:** /Script/AvalancheMedia.AvaRundownCreateProfile

Creates a new empty profile with the given name. Fails if the profile already exist.

**Properties:**

Name

Description

ProfileName

Name to be given to the newly created profile.

bMakeCurrent

If true the created profile is also made "current". Equivalent to [Request: SetCurrentProfile](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:setcurrentprofile).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"profileName": "",
		"bMakeCurrent": true,
		"requestId": -1
	}
```

## Request: RenameProfile

**Message Type:** /Script/AvalancheMedia.AvaRundownRenameProfile

Renames an existing profile.

**Properties:**

Name

Description

OldProfileName

Specifies the name of the existing profile to be renamed.

NewProfileName

Specifies the new name.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"oldProfileName": "",
		"newProfileName": "",
		"requestId": -1
	}
```

## Request: DeleteProfile

**Message Type:** /Script/AvalancheMedia.AvaRundownDeleteProfile

Deletes the specified profile. Fails if profile to be deleted is the current profile.

**Properties:**

Name

Description

ProfileName

Specifies the target profile.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"profileName": "",
		"requestId": -1
	}
```

## Request: SetCurrentProfile

**Message Type:** /Script/AvalancheMedia.AvaRundownSetCurrentProfile

Specified profile is made "current". The current profile becomes the context for all other broadcasts commands. Fails if some channels are currently broadcasting.

**Properties:**

Name

Description

ProfileName

Specifies the requested profile.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"profileName": "",
		"requestId": -1
	}
```

## Request: GetChannel

**Message Type:** /Script/AvalancheMedia.AvaRundownGetChannel

Requests information (devices, status, etc) on a specified channel.

Response is [Message: ChannelResponse](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channelresponse).

**Properties:**

Name

Description

ChannelName

Specifies the requested channel.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channelName": "",
		"requestId": -1
	}
```

## Request: GetChannels

**Message Type:** /Script/AvalancheMedia.AvaRundownGetChannels

Requests information (devices, status, etc) on all channels of the current profile.

Response is [Message: Channels](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channels).

**Properties:**

Name

Description

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"requestId": -1
	}
```

## Request: ChannelAction

**Message Type:** /Script/AvalancheMedia.AvaRundownChannelAction

Requests a broadcast action on the specified channel(s).

**Properties:**

Name

Description

ChannelName

Specifies the target channel for the action. If left empty, the action will apply to all channels of the current profile.

Action

Specifies the broadcast action to perform on the target channel(s). See [Enum: ChannelActions](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:channelactions).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channelName": "",
		"action": "None",
		"requestId": -1
	}
```

## Request: ChannelEditAction

**Message Type:** /Script/AvalancheMedia.AvaRundownChannelEditAction

Requests an edit action on the specified channel.

**Properties:**

Name

Description

ChannelName

Specifies the target channel for the action.

Action

Specifies the edit action to perform on the target channel. See [Enum: ChannelEditActions](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:channeleditactions).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channelName": "",
		"action": "None",
		"requestId": -1
	}
```

## Request: RenameChannel

**Message Type:** /Script/AvalancheMedia.AvaRundownRenameChannel

Requests a channel to be renamed.

**Properties:**

Name

Description

OldChannelName

Existing channel to be renamed.

NewChannelName

Specifies the new channel name.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"oldChannelName": "",
		"newChannelName": "",
		"requestId": -1
	}
```

## Request: GetDevices

**Message Type:** /Script/AvalancheMedia.AvaRundownGetDevices

Requests a list of devices from the rundown server. The server will reply with [Message: DevicesList](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:deviceslist) containing the devices that can be enumerated from the local host and all connected hosts through the motion design playback service.

**Properties:**

Name

Description

bShowAllMediaOutputClasses

If true, listing all media output classes on the server, even if they don't have a device provider.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"bShowAllMediaOutputClasses": false,
		"requestId": -1
	}
```

## Request: AddChannelDevice

**Message Type:** /Script/AvalancheMedia.AvaRundownAddChannelDevice

Add an enumerated device to the given channel. This command will fail if the channel is live.

**Properties:**

Name

Description

ChannelName

Specifies the target channel.

MediaOutputName

The specified name is one of the enumerated device from [Message: DevicesList](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:deviceslist), [Struct: OutputDeviceItem](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:outputdeviceitem)::Name.

bSaveBroadcast

Save broadcast configuration after this operation (true by default).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channelName": "",
		"mediaOutputName": "",
		"bSaveBroadcast": true,
		"requestId": -1
	}
```

## Request: EditChannelDevice

**Message Type:** /Script/AvalancheMedia.AvaRundownEditChannelDevice

Modify an existing device in the given channel. This command will fail if the channel is live.

**Properties:**

Name

Description

ChannelName

Specifies the target channel.

MediaOutputName

The specified name is one of the enumerated device from [Struct: Channel](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:channel)::Devices, [Struct: OutputDeviceItem](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:outputdeviceitem)::Name field. Must be the instanced devices from either [Message: Channels](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channels), [Message: ChannelResponse](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channelresponse) or [Message: ChannelListChanged](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channellistchanged). These names are not the same as when adding a device.

Data

(Modified) Device Data in the same format as [Struct: OutputDeviceItem](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:outputdeviceitem)::Data. See: [Struct: Channel](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:channel), [Message: DevicesList](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:deviceslist)

bSaveBroadcast

Save broadcast configuration after this operation (true by default).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channelName": "",
		"mediaOutputName": "",
		"data": "",
		"bSaveBroadcast": true,
		"requestId": -1
	}
```

## Request: RemoveChannelDevice

**Message Type:** /Script/AvalancheMedia.AvaRundownRemoveChannelDevice

Remove an existing device from the given channel. This command will fail if the channel is live.

**Properties:**

Name

Description

ChannelName

Specifies the target channel.

MediaOutputName

The specified name is one of the enumerated device from [Struct: Channel](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:channel)::Devices, [Struct: OutputDeviceItem](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:outputdeviceitem)::Name field. Must be the instanced devices from either [Message: Channels](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channels), [Message: ChannelResponse](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channelresponse) or [Message: ChannelListChanged](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channellistchanged). These names are not the same as when adding a device.

bSaveBroadcast

Save broadcast configuration after this operation (true by default).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channelName": "",
		"mediaOutputName": "",
		"bSaveBroadcast": true,
		"requestId": -1
	}
```

## Request: GetChannelImage

**Message Type:** /Script/AvalancheMedia.AvaRundownGetChannelImage

Captures an image from the specified channel. The captured image is 25% of the channel's resolution. Intended for preview. Response is [Message: ChannelImage](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channelimage).

**Properties:**

Name

Description

ChannelName

Specifies the target channel.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channelName": "",
		"requestId": -1
	}
```

## Request: GetChannelQualitySettings

**Message Type:** /Script/AvalancheMedia.AvaRundownGetChannelQualitySettings

Queries the given channel's quality settings. Response is [Message: ChannelQualitySettings](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channelqualitysettings).

**Properties:**

Name

Description

ChannelName

Specifies the target channel.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channelName": "",
		"requestId": -1
	}
```

## Request: SetChannelQualitySettings

**Message Type:** /Script/AvalancheMedia.AvaRundownSetChannelQualitySettings

Sets the given channel's quality settings.

**Properties:**

Name

Description

ChannelName

Specifies the target channel.

Features

Advanced viewport client engine features indexed by FEngineShowFlags names. See [Struct: ViewportQualitySettingsFeature](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:viewportqualitysettingsfeature).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channelName": "",
		"features": [],
		"requestId": -1
	}
```

## Request: SaveBroadcast

**Message Type:** /Script/AvalancheMedia.AvaRundownSaveBroadcast

Save current broadcast configuration to a json file in the Config folder on the server.

**Properties:**

Name

Description

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"requestId": -1
	}
```

## Message: ServerMsg

**Message Type:** /Script/AvalancheMedia.AvaRundownServerMsg

This message is the default response message for all requests, unless a specific response message type is specified for the request. On success, the message will have a Verbosity of "Log" and the text may contain response payload related data. On failure, a message with Verbosity "Error" will be sent. This message's RequestId mirrors that of the corresponding request from the client.

**Properties:**

Name

Description

Verbosity

Debug, Log, Warning, Error, etc.

Text

Message Text.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"verbosity": "",
		"text": "",
		"requestId": -1
	}
```

## Message: Pong

**Message Type:** /Script/AvalancheMedia.AvaRundownPong

The server will send this message to the client in response to [Request: Ping](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:ping). This is used to discover the server's entry point on the message bus.

**Properties:**

Name

Description

bAuto

True if it is a reply to an auto ping. Mirrors the bAuto flag from Ping message.

ApiVersion

API Version the server will communicate with for this client. The server may honor the requested version if possible. Versions newer than server implementation will obviously not be honored either. Clients should expect an older server to reply with an older version.

MinimumApiVersion

Minimum API Version the server implements.

LatestApiVersion

Latest API Version the server support.

HostName

Server Host Name

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"bAuto": true,
		"apiVersion": -1,
		"minimumApiVersion": -1,
		"latestApiVersion": -1,
		"hostName": "",
		"requestId": -1
	}
```

## Message: ServerInfo

**Message Type:** /Script/AvalancheMedia.AvaRundownServerInfo

Extended server information.

**Properties:**

Name

Description

ApiVersion

API Version the server will communicate with for this client.

MinimumApiVersion

Minimum API Version the server implements.

LatestApiVersion

Latest API Version the server support.

HostName

Server Host Name

EngineVersion

Holds the engine version checksum

InstanceId

Application Instance Identifier. See [Struct: Guid](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:guid).

InstanceBuild

See [Enum: ServerBuildTargetType](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:serverbuildtargettype).

InstanceMode

See [Enum: ServerEngineMode](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:serverenginemode).

SessionId

Holds the identifier of the session that the application belongs to. See [Struct: Guid](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:guid).

ProjectName

The unreal project name this server is running from.

ProjectDir

The unreal project directory this server is running from.

RemoteControlHttpServerPort

Http Server Port of the remote control service.

RemoteControlWebSocketServerPort

WebSocket Server Port of the remote control service.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"apiVersion": -1,
		"minimumApiVersion": -1,
		"latestApiVersion": -1,
		"hostName": "",
		"engineVersion": 0,
		"instanceId": "00000000000000000000000000000000",
		"instanceBuild": "Unknown",
		"instanceMode": "Unknown",
		"sessionId": "00000000000000000000000000000000",
		"projectName": "",
		"projectDir": "",
		"remoteControlHttpServerPort": 0,
		"remoteControlWebSocketServerPort": 0,
		"requestId": -1
	}
```

## Message: PlayableAssets

**Message Type:** /Script/AvalancheMedia.AvaRundownPlayableAssets

List of all available playable assets on the server. Expected Response from [Request: GetPlayableAssets](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getplayableassets).

**Properties:**

Name

Description

Assets

See [Struct: SoftObjectPath](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:softobjectpath).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"assets": [],
		"requestId": -1
	}
```

## Message: Rundowns

**Message Type:** /Script/AvalancheMedia.AvaRundownRundowns

List of all rundowns. Expected Response from [Request: GetRundowns](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getrundowns).

**Properties:**

Name

Description

Rundowns

List of Rundown asset paths in format: \[PackagePath\]/\[AssetName\].\[AssetName\]

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundowns": [],
		"requestId": -1
	}
```

## Message: ExportedRundown

**Message Type:** /Script/AvalancheMedia.AvaRundownExportedRundown

Server reply to [Request: ExportRundown](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:exportrundown) containing the exported rundown.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

RundownData

Exported rundown in json format.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"rundownData": "",
		"requestId": -1
	}
```

## Message: PlaybackContextChanged

**Message Type:** /Script/AvalancheMedia.AvaRundownPlaybackContextChanged

Rundown specific events broadcast by the server to help status display or related contexts in control applications.

**Properties:**

Name

Description

PreviousRundown

Previous rundown (can be empty).

NewRundown

New current rundown (can be empty).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"previousRundown": "",
		"newRundown": "",
		"requestId": -1
	}
```

## Message: Pages

**Message Type:** /Script/AvalancheMedia.AvaRundownPages

-   List of pages from the current rundown.

**Properties:**

Name

Description

Pages

List of page descriptors See [Struct: PageInfo](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:pageinfo).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"pages": [],
		"requestId": -1
	}
```

## Message: PageDetails

**Message Type:** /Script/AvalancheMedia.AvaRundownPageDetails

Server response to [Request: GetPageDetails](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getpagedetails) request.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

PageInfo

Page Information. See [Struct: PageInfo](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:pageinfo).

RemoteControlValues

Remote Control Values for this page. See [Struct: PlayableRemoteControlValues](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:playableremotecontrolvalues).

RemoteControlPresetName

Name of the remote control preset to resolve through WebRC API.

RemoteControlPresetId

Uuid of the remote control preset to resolve through WebRC API.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"pageInfo":
		{
			"pageId": -1,
			"pageName": "",
			"pageSummary": "",
			"friendlyName": "",
			"isTemplate": false,
			"templateId": -1,
			"combinedTemplateIds": [],
			"assetPath": "None",
			"statuses": [],
			"transitionLayerName": "",
			"bTransitionLogicEnabled": false,
			"commands": [],
			"outputChannel": "",
			"bIsEnabled": false,
			"bIsPlaying": false
		},
		"remoteControlValues":
		{
			"entityValues":
			{
			},
			"controllerValues":
			{
			}
		},
		"remoteControlPresetName": "",
		"remoteControlPresetId": "",
		"requestId": -1
	}
```

## Message: PagesStatuses

**Message Type:** /Script/AvalancheMedia.AvaRundownPagesStatuses

Event sent when a page status changes.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

PageInfo

Page Information. See [Struct: PageInfo](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:pageinfo).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"pageInfo":
		{
			"pageId": -1,
			"pageName": "",
			"pageSummary": "",
			"friendlyName": "",
			"isTemplate": false,
			"templateId": -1,
			"combinedTemplateIds": [],
			"assetPath": "None",
			"statuses": [],
			"transitionLayerName": "",
			"bTransitionLogicEnabled": false,
			"commands": [],
			"outputChannel": "",
			"bIsEnabled": false,
			"bIsPlaying": false
		},
		"requestId": -1
	}
```

## Message: PageListChanged

**Message Type:** /Script/AvalancheMedia.AvaRundownPageListChanged

Event sent when a page list (can be templates, pages or page views) has been modified.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

ListType

Specifies which page list has been modified. See [Enum: PageListType](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:pagelisttype).

SubListId

Specifies the uuid of the page view, in case the event concerns a page view. See [Struct: Guid](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:guid).

ChangeType

Bitfield value indicating what has changed:

-   bit 0: Added Pages
-   bit 1: Remove Pages
-   bit 2: Page Id Renumbered
-   bit 3: Sublist added or removed
-   bit 4: Sublist renamed
-   bit 5: Page View reordered See EAvaPageListChange flags.

AffectedPages

List of page Ids affected by this event.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"listType": "Instance",
		"subListId": "00000000000000000000000000000000",
		"changeType": 0,
		"affectedPages": [],
		"requestId": -1
	}
```

## Message: PageBlueprintChanged

**Message Type:** /Script/AvalancheMedia.AvaRundownPageBlueprintChanged

Event sent when a page's asset is modified. Note: this applies to templates only.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

PageId

Specified the modified page id.

BlueprintPath

Asset the page is currently assigned to (post modification).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"pageId": -1,
		"blueprintPath": "",
		"requestId": -1
	}
```

## Message: PageChannelChanged

**Message Type:** /Script/AvalancheMedia.AvaRundownPageChannelChanged

Event sent when a page's channel is modified.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

PageId

Specified the modified page id.

ChannelName

Channel the page is currently assigned to (post modification).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"pageId": -1,
		"channelName": "",
		"requestId": -1
	}
```

## Message: PageNameChanged

**Message Type:** /Script/AvalancheMedia.AvaRundownPageNameChanged

Event sent when a page's name is modified.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

PageId

Specified the modified page id.

PageName

new page name is currently assigned to (post modification).

bFriendlyName

Indicate whether the name or friendly name that changed.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"pageId": -1,
		"pageName": "",
		"bFriendlyName": true,
		"requestId": -1
	}
```

## Message: PageAnimSettingsChanged

**Message Type:** /Script/AvalancheMedia.AvaRundownPageAnimSettingsChanged

Event sent when a page's animation settings is modified.

**Properties:**

Name

Description

Rundown

Rundown asset path: \[PackagePath\]/\[AssetName\].\[AssetName\]

PageId

Specified the modified page id.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"rundown": "",
		"pageId": -1,
		"requestId": -1
	}
```

## Message: PageSequenceEvent

**Message Type:** /Script/AvalancheMedia.AvaRundownPageSequenceEvent

This message is sent by the server when a page sequence event occurs.

**Properties:**

Name

Description

Channel

Specifies the broadcast channel the event occurred in.

PageId

Page Id associated with this event.

InstanceId

Playable Instance uuid. See [Struct: Guid](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:guid).

AssetPath

Full asset path: /PackagePath/PackageName.AssetName

SequenceLabel

Specifies the label used to identify the sequence.

Event

Started, Paused, Finished See [Enum: PlayableSequenceEventType](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:playablesequenceeventtype).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channel": "",
		"pageId": -1,
		"instanceId": "00000000000000000000000000000000",
		"assetPath": "",
		"sequenceLabel": "",
		"event": "None",
		"requestId": -1
	}
```

## Message: PageTransitionEvent

**Message Type:** /Script/AvalancheMedia.AvaRundownPageTransitionEvent

This message is sent by the server when a page transition event occurs.

**Properties:**

Name

Description

Channel

Specifies the broadcast channel the event occurred in.

TransitionId

UUID of the transition. See [Struct: Guid](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:guid).

EnteringPageIds

Pages that are entering the scene during this transition.

PlayingPageIds

Pages that are already in the scene. May get kicked out or change during this transition.

ExitingPageIds

Pages that are requested to exit the scene during this transition. Typically part of a "Take Out" transition.

Event

Started, Finished See [Enum: PageTransitionEvents](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:pagetransitionevents).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channel": "",
		"transitionId": "00000000000000000000000000000000",
		"enteringPageIds": [],
		"playingPageIds": [],
		"exitingPageIds": [],
		"event": "None",
		"requestId": -1
	}
```

## Message: Profiles

**Message Type:** /Script/AvalancheMedia.AvaRundownProfiles

Response to [Request: GetProfiles](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getprofiles). Contains the list of all profiles in the broadcast configuration.

**Properties:**

Name

Description

Profiles

List of all profiles.

CurrentProfile

Current Active Profile.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"profiles": [],
		"currentProfile": "",
		"requestId": -1
	}
```

## Message: DevicesList

**Message Type:** /Script/AvalancheMedia.AvaRundownDevicesList

Response to [Request: GetDevices](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getdevices).

**Properties:**

Name

Description

DeviceClasses

List of Output Device Classes See [Struct: OutputClassItem](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:outputclassitem).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"deviceClasses": [],
		"requestId": -1
	}
```

## Message: ChannelListChanged

**Message Type:** /Script/AvalancheMedia.AvaRundownChannelListChanged

This message is sent by the server if the list of channels is modified in the current profile. Channel added, removed, pinned or type (preview vs program) changed.

**Properties:**

Name

Description

Channels

List of channel information. See [Struct: Channel](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:channel).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channels": [],
		"requestId": -1
	}
```

## Message: ChannelResponse

**Message Type:** /Script/AvalancheMedia.AvaRundownChannelResponse

This message is sent by the server in response to [Request: GetChannel](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getchannel) or as an event if a channel's states, render target, devices or settings is changed.

**Properties:**

Name

Description

Channel

Channel Information See [Struct: Channel](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:channel).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channel":
		{
			"name": "",
			"type": "Program",
			"state": "Offline",
			"issueSeverity": "None",
			"devices": []
		},
		"requestId": -1
	}
```

## Message: Channels

**Message Type:** /Script/AvalancheMedia.AvaRundownChannels

Response to [Request: GetChannels](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getchannels)

**Properties:**

Name

Description

Channels

List of channel information. See [Struct: Channel](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:channel).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channels": [],
		"requestId": -1
	}
```

## Message: AssetsChanged

**Message Type:** /Script/AvalancheMedia.AvaRundownAssetsChanged

Event broadcast when an asset event occurs on the server.

**Properties:**

Name

Description

AssetName

Asset name only, without the package path. (Keeping for legacy)

AssetPath

Full asset path: /PackagePath/PackageName.AssetName

AssetClass

Full asset class path.

bIsPlayable

true if the asset is a "playable" asset, i.e. an asset that can be set in a page's asset.

EventType

Specifies the event type, i.e. Added, Remove, etc. See [Enum: AssetEvent](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:assetevent).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"assetName": "",
		"assetPath": "",
		"assetClass": "",
		"bIsPlayable": false,
		"eventType": "Unknown",
		"requestId": -1
	}
```

## Message: ChannelImage

**Message Type:** /Script/AvalancheMedia.AvaRundownChannelImage

Response to [Request: GetChannelImage](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getchannelimage).

**Properties:**

Name

Description

ImageData

Byte array containing the image data. Expected format is compressed jpeg.

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"imageData": [],
		"requestId": -1
	}
```

## Message: ChannelQualitySettings

**Message Type:** /Script/AvalancheMedia.AvaRundownChannelQualitySettings

Response to [Request: GetChannelQualitySettings](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getchannelqualitysettings).

**Properties:**

Name

Description

ChannelName

Specifies the target channel.

Features

Advanced viewport client engine features indexed by FEngineShowFlags names. See [Struct: ViewportQualitySettingsFeature](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:viewportqualitysettingsfeature).

RequestId

Request Identifier (client assigned) for matching server responses with their corresponding requests.

**Json Format:**

```cpp
	{
		"channelName": "",
		"features": [],
		"requestId": -1
	}
```

## Struct: Guid

A globally unique identifier (mirrored from [FGuid](/documentation/en-us/unreal-engine/API/Runtime/Core/Misc/FGuid))

**Properties:**

Name

Description

A

 

B

 

C

 

D

 

**Json Format:**

```cpp
	{
		"a": 0,
		"b": 0,
		"c": 0,
		"d": 0
	}
```

## Struct: SoftObjectPath

A struct that contains a string reference to an object, either a top level asset or a subobject. **Note:** The full C++ class is located here: [FSoftObjectPath](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/FSoftObjectPath)

**Properties:**

Name

Description

AssetPath

Asset path, patch to a top level object in a package See [Struct: TopLevelAssetPath](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:toplevelassetpath).

SubPathString

Optional FString for subobject within an asset

**Json Format:**

```cpp
	{
		"assetPath": "None",
		"subPathString": ""
	}
```

## Struct: TopLevelAssetPath

A struct that can reference a top level asset such as '/Path/To/Package.AssetName' **Note:** The full C++ class is located here: [FTopLevelAssetPath](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/FTopLevelAssetPath)

**Properties:**

Name

Description

PackageName

Name of the package containing the asset e.g. /Path/To/Package

AssetName

Name of the asset within the package e.g. 'AssetName'

**Json Format:**

```cpp
	{
		"packageName": "None",
		"assetName": "None"
	}
```

## Struct: CreatePageIdGeneratorParams

Defines the parameters for the page id generator algorithm. The Id generator uses a sequence strategy to search for an unused id. It is defined by a starting id and a search direction.

**Properties:**

Name

Description

ReferenceId

Starting Id for the search.

Increment

(Initial) Search increment. **Remark:** For negative increment search, the limit of the search space can be reached. If no unique id is found, the search will continue in the positive direction instead.

**Json Format:**

```cpp
	{
		"referenceId": -1,
		"increment": 1
	}
```

## Struct: PageInfo

Page Information

**Properties:**

Name

Description

PageId

Unique identifier for the page within the rundown.

PageName

Short page name, usually the asset name for templates. It is displayed as the page description if there is no page summary or user friendly name specified.

PageSummary

Summary is generated from the remote control values for this page. It is displayed as the page description if there is no user friendly name specified.

FriendlyName

User editable page description. If not empty, this should be used as the page description.

IsTemplate

Indicates if the page is a template (true) or an instance (false).

TemplateId

Page Instance property: Template Id for this page.

CombinedTemplateIds

Template property: For combination template, lists the templates that are combined.

AssetPath

Template property: playable asset path for this template. See [Struct: SoftObjectPath](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:softobjectpath).

Statuses

List of page channel statuses. There will be an entry for each channel the page is playing/previewing in. See [Struct: ChannelPageStatus](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:channelpagestatus).

TransitionLayerName

Transition Layer Name (indicates the page has transition logic).

bTransitionLogicEnabled

Indicate if the template asset has transition logic.

Commands

Page Commands that can be executed when playing this page. See [Struct: PageCommandData](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:pagecommanddata).

OutputChannel

 

bIsEnabled

Specifies if the page is enabled (i.e. can be played).

bIsPlaying

Indicates if the page is currently playing in it's program channel.

**Json Format:**

```cpp
	{
		"pageId": -1,
		"pageName": "",
		"pageSummary": "",
		"friendlyName": "",
		"isTemplate": false,
		"templateId": -1,
		"combinedTemplateIds": [],
		"assetPath": "None",
		"statuses": [],
		"transitionLayerName": "",
		"bTransitionLogicEnabled": false,
		"commands": [],
		"outputChannel": "",
		"bIsEnabled": false,
		"bIsPlaying": false
	}
```

## Struct: ChannelPageStatus

**Properties:**

Name

Description

Type

See [Enum: BroadcastChannelType](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:broadcastchanneltype).

Status

See [Enum: PageStatus](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:pagestatus).

bNeedsSync

 

**Json Format:**

```cpp
	{
		"type": "Program",
		"status": "Unknown",
		"bNeedsSync": false
	}
```

## Struct: PageCommandData

Page command data is stored in json serialized string in the page to be compatible with external apps.

**Properties:**

Name

Description

Name

Command name: string.

Payload

Command payload: json formatted string.

**Json Format:**

```cpp
	{
		"name": "",
		"payload": ""
	}
```

## Struct: PlayableRemoteControlValues

Container for the remote control values of a playable.

**Properties:**

Name

Description

EntityValues

Value as a binary array of the Remote Control Entity. See [Struct: PlayableRemoteControlValue](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:playableremotecontrolvalue).

ControllerValues

Controller values. See [Struct: PlayableRemoteControlValue](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:playableremotecontrolvalue).

**Json Format:**

```cpp
	{
		"entityValues":
		{
		},
		"controllerValues":
		{
		}
	}
```

## Struct: PlayableRemoteControlValue

**Properties:**

Name

Description

Value

The Remote Control Entity or Controller's Value stored as a Json formatted string.

bIsDefault

Indicate if the value is a default value from a template. This is used to know which values to update when updating the page's values from the template (reimport page). This is set to true only when the values are from the template. If values are modified by an edit operation, it will be set to false.

**Json Format:**

```cpp
	{
		"value": "",
		"bIsDefault": false
	}
```

## Struct: OutputClassItem

Output Device Class Information

**Properties:**

Name

Description

Name

Class name

Server

Name of the playback server this class was seen on. The name will be empty for the "local process" device.

Devices

Enumeration of the available devices of this class on the given host. Note that not all classes can be enumerated. See [Struct: OutputDeviceItem](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:outputdeviceitem).

**Json Format:**

```cpp
	{
		"name": "",
		"server": "",
		"devices": []
	}
```

## Struct: OutputDeviceItem

Output Device information

**Properties:**

Name

Description

Name

Specifies the device name. This is used as "MediaOutputName" in [Request: AddChannelDevice](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:addchanneldevice) and [Request: EditChannelDevice](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:editchanneldevice).

OutputInfo

Extra information about the device. See [Struct: BroadcastMediaOutputInfo](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:broadcastmediaoutputinfo).

OutputState

Specifies the status of the output device. See [Enum: BroadcastOutputState](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:broadcastoutputstate).

IssueSeverity

In case the device is live, this extra status indicates if the device is operating normally. See [Enum: BroadcastIssueSeverity](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:broadcastissueseverity).

IssueMessages

List of errors or warnings.

Data

Raw Json string representing a serialized UMediaOutput. This data can be edited, then used in [Request: EditChannelDevice](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:editchanneldevice).

**Json Format:**

```cpp
	{
		"name": "",
		"outputInfo":
		{
			"guid": "00000000000000000000000000000000",
			"serverName": "",
			"deviceProviderName": "None",
			"deviceName": "None"
		},
		"outputState": "Invalid",
		"issueSeverity": "None",
		"issueMessages": [],
		"data": ""
	}
```

## Struct: BroadcastMediaOutputInfo

Extra information about the Media Output object. This is used to determine the status of server hosting the device.

**Properties:**

Name

Description

Guid

Unique identifier for this output. Allows easier management for client/server status and configuration replication. See [Struct: Guid](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:guid).

ServerName

The server name if the media output was from a remote server. This will be empty if the device was local.

DeviceProviderName

The device provider name, ex: BlackMagic, for this device (if any).

DeviceName

Device name from the Device Provider. For device that have no provider (like NDI for instance), this is the name of the source or equivalent.

**Json Format:**

```cpp
	{
		"guid": "00000000000000000000000000000000",
		"serverName": "",
		"deviceProviderName": "None",
		"deviceName": "None"
	}
```

## Struct: Channel

Channel Information

**Properties:**

Name

Description

Name

Specifies the Channel Name.

Type

See [Enum: BroadcastChannelType](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:broadcastchanneltype).

State

See [Enum: BroadcastChannelState](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:broadcastchannelstate).

IssueSeverity

See [Enum: BroadcastIssueSeverity](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:broadcastissueseverity).

Devices

List of devices. See [Struct: OutputDeviceItem](/documentation/en-us/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:outputdeviceitem).

**Json Format:**

```cpp
	{
		"name": "",
		"type": "Program",
		"state": "Offline",
		"issueSeverity": "None",
		"devices": []
	}
```

## Struct: ViewportQualitySettingsFeature

**Properties:**

Name

Description

Name

The name of the feature in the engine show flags.

bEnabled

True if this engine feature show flag should be enabled.

**Json Format:**

```cpp
	{
		"name": "",
		"bEnabled": false
	}
```

## Enum: ServerBuildTargetType

Build targets. This will help determine the set of features that are available.

**Values:**

Name

Description

Unknown

 

Editor

 

Game

 

Server

 

Client

 

Program

 

## Enum: ServerEngineMode

An editor build can be launched in different modes but it could also be a dedicated build target. The engine mode combined with the build target will determine the set of functionalities available.

**Values:**

Name

Description

Unknown

 

Editor

 

Game

 

Server

 

Commandlet

 

Other

 

## Enum: BroadcastChannelType

The channel type defines what it is used for in the broadcast framework.

Primarily, the channel type is intended to resolve channel collisions between simultaneous "program" and "preview" playbacks on a given system. In other words:

-   Channel selection for rundown pages is restricted to "program" channels.
-   Channel selection for preview is restricted to "preview" channels.

It is thus not possible for a user to mistakenly select the same channel for both preview and program.

Some additional restrictions are applied according to channel type:

-   preview channels must only have outputs local to the process. "Remote" previews are not supported.
-   \[backend\] playback request type (program or preview) must match with the channel type. This is a safety net for any other extended code paths that are not in the Motion Design plugin.

**Values:**

Name

Description

Program

 

Preview

 

## Enum: PageStatus

**Values:**

Name

Description

Unknown

Invalid page status.

Offline

Output is offline.

Missing

When the page is not available, i.e. the asset is not present in the local content.

Needs Sync

Out of date

Syncing

Asset is being downloaded.

Available

When the page is present in local content, but not loaded.

Loading

Load/Start has been requested.

Loaded

Page is loaded in memory and ready to play.

Playing

Page is currently playing in an output channel.

Previewing

Page is currently playing as local preview.

Error

Something bad happened.

## Enum: PageListType

Rundown's page list type.

**Values:**

Name

Description

Template

 

Instance

 

View

 

## Enum: PageActions

Supported Page actions for playback.

**Values:**

Name

Description

Load

 

Unload

 

Play

 

Play Next

 

Stop

 

Force Stop

 

Continue

 

Update Values

 

Take to Program

 

## Enum: TransitionActions

Supported Transition actions for playback.

**Values:**

Name

Description

Force Stop

This action will forcefully stop specified transitions.

## Enum: TransitionLayerActions

Supported Page Logic Layer actions for playback.

**Values:**

Name

Description

Stop

Trigger the out transition for the specified layer.

Force Stop

Forcefully stop, without transition, pages on the specified layer.

## Enum: PlayableSequenceEventType

**Values:**

Name

Description

Started

 

Paused

 

Finished

 

## Enum: PageTransitionEvents

**Values:**

Name

Description

Started

 

Finished

 

## Enum: BroadcastOutputState

Status of the media output.

**Values:**

Name

Description

Invalid

Invalid/Uninitialized state.

Offline

For remote output that is not connected, output disabled.

Idle

Server Connected or Local (MediaCapture Status: Stopped)

Preparing

MediaCapture Status: Preparing

Live

Broadcasting (MediaCapture Status: Capturing)

Error

MediaCapture Error (unrecoverable)

## Enum: BroadcastIssueSeverity

In case the broadcast device is Live (see EAvaBroadcastOutputState), this extra status indicates if the device is operating normally.

**Values:**

Name

Description

None

 

Warnings

 

Errors

 

## Enum: BroadcastChannelState

Channel state is a union summary of the output's states.

**Values:**

Name

Description

Offline

Indicates that all channel outputs are offline.

Idle

Indicates that at least some of the channel outputs are idle (but none are live).

Live

Indicates that at least some of the channel outputs are live.

## Enum: AssetEvent

Generic asset event

**Values:**

Name

Description

Added

 

Removed

 

## Enum: ChannelActions

Channel broadcast actions

**Values:**

Name

Description

Start

Start broadcast of the specified channel(s).

Stop

Stops broadcast of the specified channel(s).

## Enum: ChannelEditActions

**Values:**

Name

Description

Add

Add new channel with given name.

Remove

Removes channel with given name.

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Request: Ping](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:ping)
-   [Request: GetServerInfo](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getserverinfo)
-   [Request: GetPlayableAssets](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getplayableassets)
-   [Request: GetRundowns](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getrundowns)
-   [Request: LoadRundown](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:loadrundown)
-   [Request: CreateRundown](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:createrundown)
-   [Request: DeleteRundown](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:deleterundown)
-   [Request: ImportRundown](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:importrundown)
-   [Request: ExportRundown](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:exportrundown)
-   [Request: SaveRundown](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:saverundown)
-   [Request: CreatePage](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:createpage)
-   [Request: DeletePage](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:deletepage)
-   [Request: CreateTemplate](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:createtemplate)
-   [Request: CreateComboTemplate](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:createcombotemplate)
-   [Request: DeleteTemplate](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:deletetemplate)
-   [Request: ChangeTemplateBP](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:changetemplatebp)
-   [Request: GetPages](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getpages)
-   [Request: GetPageDetails](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getpagedetails)
-   [Request: PageChangeChannel](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:pagechangechannel)
-   [Request: ChangePageName](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:changepagename)
-   [Request: UpdatePageFromRCP](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:updatepagefromrcp)
-   [Request: PageAction](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:pageaction)
-   [Request: PagePreviewAction](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:pagepreviewaction)
-   [Request: PageActions](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:pageactions)
-   [Request: PagePreviewActions](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:pagepreviewactions)
-   [Request: TransitionAction](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:transitionaction)
-   [Request: TransitionLayerAction](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:transitionlayeraction)
-   [Request: GetProfiles](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getprofiles)
-   [Request: DuplicateProfile](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:duplicateprofile)
-   [Request: CreateProfile](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:createprofile)
-   [Request: RenameProfile](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:renameprofile)
-   [Request: DeleteProfile](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:deleteprofile)
-   [Request: SetCurrentProfile](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:setcurrentprofile)
-   [Request: GetChannel](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getchannel)
-   [Request: GetChannels](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getchannels)
-   [Request: ChannelAction](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:channelaction)
-   [Request: ChannelEditAction](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:channeleditaction)
-   [Request: RenameChannel](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:renamechannel)
-   [Request: GetDevices](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getdevices)
-   [Request: AddChannelDevice](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:addchanneldevice)
-   [Request: EditChannelDevice](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:editchanneldevice)
-   [Request: RemoveChannelDevice](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:removechanneldevice)
-   [Request: GetChannelImage](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getchannelimage)
-   [Request: GetChannelQualitySettings](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:getchannelqualitysettings)
-   [Request: SetChannelQualitySettings](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:setchannelqualitysettings)
-   [Request: SaveBroadcast](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#request:savebroadcast)
-   [Message: ServerMsg](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:servermsg)
-   [Message: Pong](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pong)
-   [Message: ServerInfo](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:serverinfo)
-   [Message: PlayableAssets](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:playableassets)
-   [Message: Rundowns](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:rundowns)
-   [Message: ExportedRundown](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:exportedrundown)
-   [Message: PlaybackContextChanged](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:playbackcontextchanged)
-   [Message: Pages](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pages)
-   [Message: PageDetails](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pagedetails)
-   [Message: PagesStatuses](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pagesstatuses)
-   [Message: PageListChanged](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pagelistchanged)
-   [Message: PageBlueprintChanged](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pageblueprintchanged)
-   [Message: PageChannelChanged](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pagechannelchanged)
-   [Message: PageNameChanged](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pagenamechanged)
-   [Message: PageAnimSettingsChanged](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pageanimsettingschanged)
-   [Message: PageSequenceEvent](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pagesequenceevent)
-   [Message: PageTransitionEvent](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:pagetransitionevent)
-   [Message: Profiles](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:profiles)
-   [Message: DevicesList](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:deviceslist)
-   [Message: ChannelListChanged](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channellistchanged)
-   [Message: ChannelResponse](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channelresponse)
-   [Message: Channels](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channels)
-   [Message: AssetsChanged](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:assetschanged)
-   [Message: ChannelImage](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channelimage)
-   [Message: ChannelQualitySettings](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#message:channelqualitysettings)
-   [Struct: Guid](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:guid)
-   [Struct: SoftObjectPath](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:softobjectpath)
-   [Struct: TopLevelAssetPath](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:toplevelassetpath)
-   [Struct: CreatePageIdGeneratorParams](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:createpageidgeneratorparams)
-   [Struct: PageInfo](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:pageinfo)
-   [Struct: ChannelPageStatus](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:channelpagestatus)
-   [Struct: PageCommandData](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:pagecommanddata)
-   [Struct: PlayableRemoteControlValues](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:playableremotecontrolvalues)
-   [Struct: PlayableRemoteControlValue](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:playableremotecontrolvalue)
-   [Struct: OutputClassItem](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:outputclassitem)
-   [Struct: OutputDeviceItem](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:outputdeviceitem)
-   [Struct: BroadcastMediaOutputInfo](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:broadcastmediaoutputinfo)
-   [Struct: Channel](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:channel)
-   [Struct: ViewportQualitySettingsFeature](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#struct:viewportqualitysettingsfeature)
-   [Enum: ServerBuildTargetType](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:serverbuildtargettype)
-   [Enum: ServerEngineMode](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:serverenginemode)
-   [Enum: BroadcastChannelType](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:broadcastchanneltype)
-   [Enum: PageStatus](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:pagestatus)
-   [Enum: PageListType](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:pagelisttype)
-   [Enum: PageActions](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:pageactions)
-   [Enum: TransitionActions](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:transitionactions)
-   [Enum: TransitionLayerActions](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:transitionlayeractions)
-   [Enum: PlayableSequenceEventType](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:playablesequenceeventtype)
-   [Enum: PageTransitionEvents](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:pagetransitionevents)
-   [Enum: BroadcastOutputState](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:broadcastoutputstate)
-   [Enum: BroadcastIssueSeverity](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:broadcastissueseverity)
-   [Enum: BroadcastChannelState](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:broadcastchannelstate)
-   [Enum: AssetEvent](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:assetevent)
-   [Enum: ChannelActions](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:channelactions)
-   [Enum: ChannelEditActions](/documentation/zh-cn/unreal-engine/WebAPI/RundownServerWebSocketAPIReference#enum:channeleditactions)