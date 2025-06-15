# Using the Trace Control Tab in Unreal Insights for Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-trace-control-tab-in-unreal-insights-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:39:37.344Z

---

目录

![Trace Control Tab](https://dev.epicgames.com/community/api/documentation/image/d444a344-978e-4bec-ab25-96ad1faadd47?resizing_type=fill&width=1920&height=335)

The **Trace Control** tab provides the means for users to start and control tracing for running sessions of an Unreal Engine (UE) project. Users can also set up their own trace channel filters for easy control over what trace data is captured for a session.

## How to Find the Trace Control Tab

You can find the tab on the **Unreal Insights Frontend** dialog which opens when you launch Insights.

To open the tab, launch **Insights**, click the **Session Frontend** tab, and then click the **Trace Control** tab.

![Trace Control Tab](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77a911f0-3e61-4b67-bfef-53652c4696cc/trace-control-tab.png)

## How to Select a Session

To select an Unreal Editor session, click one of the running sessions in the left-hand column of the **Session Frontend** tab. Expand the group headings as necessary.

It may take a few seconds for the Trace Control tab to update after selecting a session.

Sessions appear for:

-   Unreal Editor sessions.
-   Play-In-Editor sessions launched using the **Play** button.
-   Standalone sessions that were launched with the `-messaging` command line argument.

If your session does not appear in the list, double check that you launched it with the `-messaging` argument.

![Session Frontend](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/507b6ce2-e876-4b28-a4ef-de34443092b7/session-frontend.png)

## How to Configure and Control Tracing

When you select a session you are able to control tracing for that session.

The most common workflow is:

1.  Select the channels you want to gather trace data for by clicking the individual channel checkboxes or using the filter presets dropdown to select common groups of channels.
    
2.  Start tracing the Unreal Editor session (see button 2 below).
    

As soon as you start tracing, an entry appears in the **Trace Store** tab which opens the new trace data for analysis in Insights.

The following table provides a full breakdown of all the available options.

![Trace Store](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79b5120e-4a45-43a0-b780-55e813087427/trace-store.png)

**Element**

**Name**

**Description**

**1**

**Trace target**

Configures where trace data for the session is written. Choose between:

-   **Server**: To write trace data to a file in the trace server's managed store directory.
-   **File**: To write trace data directly to a file.

This setting cannot be changed while tracing is already running (see element 2).

**2**

**Start / Stop trace**

Starts and stops gathering trace data for the selected channels.

As soon as you start tracing, an entry appears in the Trace Store tab labeled with the **LIVE** status. You can then open that session for analysis in Insights.

**3**

**Save a snapshot**

Takes a trace snapshot for the session. This appears in the Trace Store tab where it can then be opened for analysis.

**4**

**Pause / Resume trace channels**

Disables all the selected trace channels. Clicking this button again will resume, re-enabling all of the previously selected channels.

**5**

**Trace a bookmark**

If tracing is running, emit a `TRACE_BOOKMARK` event in the trace data. The event will be named based on the timestamp of when it was created.

**6**

**Take a screenshot**

If tracing is running, take a picture of the running session and include it in the trace data. The screenshot is named based on the timestamp of when it was created.

**7**

**Enable / Disable stat named events**

Enables or disables tracing of stat named events. These events provide additional profiling metrics at the cost of additional overhead.

**8**

**Filter presets**

Enables or disables groups of channels. To learn more, see the [How to Set Up Preset Channel Filters](/documentation/zh-cn/unreal-engine/using-the-trace-control-tab-in-unreal-insights-for-unreal-engine#howtosetuppresetchannelfilters) section of the page.

**9**

**Search channels**

Searches the trace channels shown in (element 11).

**10**

**Toggle filter presets**

All selected filter presets will appear here and can be individually toggled on and off to enable/disable groups of channels.

**11**

**Trace channels**

Enables or disables the individual trace channels you would like to capture data for.

Any grayed out channels are only supported for sessions launched with tracing enabled, and they cannot be enabled in this view. The most notable of these channels is memory tracing.

**12**

**Trace information**

Information about the current session including:

-   **Trace Endpoint:** Either the trace server IP address or the file which the trace data is being written to (see element 1).
-   **Important Events Cache**: Indicates if the important events cache is being used. This is where critical events are stored while tracing is not active.
-   **Worker Thread:** If this is on, a separate worker thread sends trace data otherwise it is just sent at the end of each frame.
-   **Tail Size**: Size of the tail buffer where recently gathered trace data is stored.
-   **Bytes sent:** Number of bytes sent to the trace target/endpoint.
-   **Bytes Traced:** Number of uncompressed bytes traced from the session.
-   **Memory Used:** Total memory overhead of the tracing system.
-   **Cache:** Total memory used by the important events cache.

## How to Set Up Preset Channel Filters

Preset channel filters are a convenient way of enabling and disabling groups of trace channels with a single click. You can configure these filters using the **Filter Presets** dropdown. See the table below for details of each option.

![Filter Presets](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8480e042-edc3-46d4-aa50-a1a630b87c42/filter-presets.png)

**Element**

**Name**

**Description**

**1**

**Reset presets**

Clears the currently selected preset filters (see element 10 in the [configure tracing](/documentation/zh-cn/unreal-engine/using-the-trace-control-tab-in-unreal-insights-for-unreal-engine#howtoconfigureandcontroltracing) section).

**2**

**Save as user preset**

Saves the currently selected channels as a new preset filter.

**3**

**Engine presets**

Selects filter presets based on common areas a user may want to profile.

These Engine presets are defined in:

-   `BaseEngine.ini` under the `[Trace.ChannelPresets]` section (Engine\\Config\_\\BaseEngine.ini).
-   Within code using the `FTraceAuxiliary::FChannelPreset` struct.

**4**

**User presets**

Selects user defined filter presets.

These are saved to the local `Engine.ini` file for Insights (Engine\\Programs\\UnrealInsights\\Saved\\Config\\WindowsEditor\\Engine.ini).

**5**

**Rename user preset**

Renames this user filter.

**6**

**Make shared preset**

Shares the filter preset with others.

Shared user presets are saved to the default Engine.ini file for Insights (Engine\\Programs\\UnrealInsights\\Config\\DefaultEngine.ini).

The config file must be writable or checked out.

**7**

**Save preset**

Saves the currently selected channels under this user filter. If the preset is shared make sure the `Engine.ini` file is writable or checked out first.

**8**

**Delete preset**

Removes the user filter from the filter presets menu.

## How to Use the Trace Control Tab From the Editor

You can also find the new Trace tab within the editor by selecting **Tools > Session Frontend**.

When opened from the editor, the Trace tab has a different set of user presets. These are stored based on the project which is open in the editor.

Local user presets are saved to:

-   The local `Engine.ini` config file for the project *(\[PROJECT\_ROOT\]\\Saved\\Config\\WindowsEditor\\Engine.ini)*.

Shared user presets are saved to:

-   The default `Engine.ini` config file for the project if it's writable or checked out *(\[PROJECT\_ROOT\]\\Config\\DefaultEngine.ini)*.

![Session Frontend](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b91549a2-9ac6-4b14-8a7b-4afe9e29ea01/session-frontend-menu.png)

## How to Use the Trace Control Tab From Insights

You can also open the Trace Control tab from Insights for Live sessions by selecting **Menu > Live Trace Control**.

![Live Trace Control](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a63255c-c5cf-4810-83e8-e7c8be72e6b5/live-trace-control.png)

-   [unreal insights](https://dev.epicgames.com/community/search?query=unreal%20insights)
-   [unreal insights trace sessions](https://dev.epicgames.com/community/search?query=unreal%20insights%20trace%20sessions)
-   [live trace](https://dev.epicgames.com/community/search?query=live%20trace)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [How to Find the Trace Control Tab](/documentation/zh-cn/unreal-engine/using-the-trace-control-tab-in-unreal-insights-for-unreal-engine#howtofindthetracecontroltab)
-   [How to Select a Session](/documentation/zh-cn/unreal-engine/using-the-trace-control-tab-in-unreal-insights-for-unreal-engine#howtoselectasession)
-   [How to Configure and Control Tracing](/documentation/zh-cn/unreal-engine/using-the-trace-control-tab-in-unreal-insights-for-unreal-engine#howtoconfigureandcontroltracing)
-   [How to Set Up Preset Channel Filters](/documentation/zh-cn/unreal-engine/using-the-trace-control-tab-in-unreal-insights-for-unreal-engine#howtosetuppresetchannelfilters)
-   [How to Use the Trace Control Tab From the Editor](/documentation/zh-cn/unreal-engine/using-the-trace-control-tab-in-unreal-insights-for-unreal-engine#howtousethetracecontroltabfromtheeditor)
-   [How to Use the Trace Control Tab From Insights](/documentation/zh-cn/unreal-engine/using-the-trace-control-tab-in-unreal-insights-for-unreal-engine#howtousethetracecontroltabfrominsights)

相关文档

[

Trace

![Trace](https://dev.epicgames.com/community/api/documentation/image/9f3eedba-a4e2-4261-926f-7f128e15886a?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5)

[

Unreal Insights

![Unreal Insights](https://dev.epicgames.com/community/api/documentation/image/f3818740-1216-4fbb-bff6-249ed0ed43ef?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)