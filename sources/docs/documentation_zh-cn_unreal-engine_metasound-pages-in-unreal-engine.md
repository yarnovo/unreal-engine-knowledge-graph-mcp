# MetaSound Pages in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/metasound-pages-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:22:49.666Z

---

目录

![MetaSound Pages](https://dev.epicgames.com/community/api/documentation/image/87d89c82-0926-449b-ba49-a2fb8e0320c0?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

**MetaSound Pages** are MetaSound variations you can use to support different hardware performance levels. With pages, you can define a set of MetaSound input values or an entirely different MetaSound graph, and then swap between the pages based on platform targets or runtime logic.

Platforms are not one-to-one with pages, so you can map them based on complexity, CPU usage, memory usage, or anything else.

You cannot use pages to modify active MetaSound instances, as paged data swaps occur before a MetaSound instance executes.

## Using Pages

### Adjust Project Settings

![Adjust Project Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3d33b18-023b-4d73-ba89-185343b867b4/01.png)

You can create pages and adjust their settings in Project Settings.

1.  Select **Edit > Project Settings**.
2.  On the left, under the **Engine** heading, select **MetaSounds**.
3.  Modify the following settings under the **Pages (Experimental)** section:
    1.  Click the **Add** button for **Page Settings** to add a page to the array.
    2.  Expand the new array element.
    3.  Set the **Name**, such as "Low," "High," or "Mobile." The order of the pages in the array is important. See [Fallback Handling](/documentation/zh-cn/unreal-engine/metasound-pages-in-unreal-engine#fallbackhandling) for more information.
    4.  If **Targetable** is true, the page targets all platforms. If you want to target a specific platform, click the **Add** button for **Targetable** and select the target platform. Repeat this step to set multiple.
    5.  If you want to exclude the page from cooking on specific platforms, click the **Add** button for **Exclude from Cook** and select the excluded platforms. Repeat this step to set multiple.
    6.  If you want to target a page other than "Default," set the **Target Page Name** to your desired page. See [Target Page Name](/documentation/zh-cn/unreal-engine/metasound-pages-in-unreal-engine#targetpagename) for more information on this setting.

The **Default** page cannot be deleted or renamed.

#### Fallback Handling

If a target page is not implemented for the active platform, the MetaSound uses the index order of the cooked pages in **Page Settings**. Specifically, the MetaSound falls back to the next lowest index-ordered page that it implements. If no fallback is found, the MetaSound uses the default implementation.

#### Target Page Name

The **Target Page Name** setting sets the page used when executing MetaSounds. This target is reflected during playback in **Play In Editor (PIE)**.

You can set the Target Page Name in the following ways:

-   In the Project Settings
-   In a Platform `.ini` file (`[PROJECT_ROOT]\Platforms\[PLATFORM_NAME]\Config\[PLATFORM_NAME]MetaSound.ini`)
-   Using the console variable `cvar au.MetaSound.Pages.SetTarget [PAGE_NAME]`
-   In Blueprint or C++, during runtime

![Target Page Name](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8d6d3d9-ad34-4220-ae7b-2e1461eb0bb3/02.png)

The Target Page Name is also reflected in the **MetaSound Editor** by default, but you can audition with other platforms and pages, too. See [Auditioning Pages in Editor](/documentation/zh-cn/unreal-engine/metasound-pages-in-unreal-engine#auditioningpagesineditor) for more information.

### Paging MetaSound Graphs

![Paging MetaSound Graphs](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8efd0df1-07b8-442d-84b2-64f4c72bbfd1/03.png)

After setting up pages in Project Settings, you can use them in MetaSound Source and Patch graphs in the **Pages** tab.

From the **Pages** tab, you can:

-   Add a new page by selecting one from the **Add Page Graph** dropdown.
-   Remove a page by selecting the **Trash Can** button to the right of it.
-   Focus a page by selecting the **Focus (<-)** button to the left of it.

If you add a page, the existing graph is copied to the new page. Afterward, any changes to the active graph apply only to the focused page. You should use this workflow to create the best-case sound, then add pages for variations requiring less complex graphs.

All pages share the same input and output members, including interfaces. However, variables are set per graph.

You can see the currently focused page in the bottom-left corner of the **MetaSound Graph** panel.

### Paging MetaSound Inputs

![Paging MetaSound Inputs](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8f2ed47-b677-4598-8970-e1b33f8fd933/04.png)

In addition to graph variations, you can also set different default input values per page. For example, you can specify a different number of Sound Waves in an array based on the different resource requirements of your target pages.

To create a paged input, do the following:

1.  In the **Members** panel, select an input.
2.  In the **Details** panel, click the **Default Value > Add Page Default Value** dropdown and select the relevant page. This creates a new **Default Value** entry.
3.  Set the new entry's value.

#### Graphless Input Fallback

The input variations associated with pages are separate from graph variations. If a paged graph is unavailable for a given page, the next available paged graph is used as a fallback with any relevant input variations.

For example, you can use a "Low" paged input on a "Medium" page's graph by doing the following:

1.  In the Project Settings, create the "Medium" and "Low" pages in that order.
2.  On the MetaSound:
    1.  Create the "Medium" paged graph.
    2.  Create a "Low" paged input.

See [Fallback Handling](/documentation/zh-cn/unreal-engine/metasound-pages-in-unreal-engine#fallbackhandling) for more information.

### Auditioning Pages in Editor

![Auditioning Pages in Editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bec8dc72-9f7d-47cb-a0bf-043fc2d13568/05.png)

By default, auditioning a MetaSound in the MetaSound Editor corresponds to what plays in PIE.

However, you can override this functionality in the **Audition** menu, where you can set the following:

-   **Audition Platform** - Set a platform and apply the relevant target and cook settings to auditioning.
-   **Sync With Graph Page** (enabled by default) - If enabled, playing a MetaSound in the MetaSound Editor plays the focused page's graph. If disabled, you can select a specific **Audition Page** to preview.

If the page is not a target page for the selected Audition platform, the **Play** button will turn yellow with a warning icon and relevant tooltip. However, you can still play it.

The Audition menu's settings are reflected in **Editor Preferences > MetaSound Editor**.

## Limitations

-   You cannot add or remove pages within a MetaSound Preset, but you can override page input defaults.
-   Interface input defaults do not support page input defaults.
-   C++ node classes do not support page input defaults.
-   Projects cannot alter audition behavior in editor.

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [sound sources](https://dev.epicgames.com/community/search?query=sound%20sources)
-   [metasounds](https://dev.epicgames.com/community/search?query=metasounds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Using Pages](/documentation/zh-cn/unreal-engine/metasound-pages-in-unreal-engine#usingpages)
-   [Adjust Project Settings](/documentation/zh-cn/unreal-engine/metasound-pages-in-unreal-engine#adjustprojectsettings)
-   [Fallback Handling](/documentation/zh-cn/unreal-engine/metasound-pages-in-unreal-engine#fallbackhandling)
-   [Target Page Name](/documentation/zh-cn/unreal-engine/metasound-pages-in-unreal-engine#targetpagename)
-   [Paging MetaSound Graphs](/documentation/zh-cn/unreal-engine/metasound-pages-in-unreal-engine#pagingmetasoundgraphs)
-   [Paging MetaSound Inputs](/documentation/zh-cn/unreal-engine/metasound-pages-in-unreal-engine#pagingmetasoundinputs)
-   [Graphless Input Fallback](/documentation/zh-cn/unreal-engine/metasound-pages-in-unreal-engine#graphlessinputfallback)
-   [Auditioning Pages in Editor](/documentation/zh-cn/unreal-engine/metasound-pages-in-unreal-engine#auditioningpagesineditor)
-   [Limitations](/documentation/zh-cn/unreal-engine/metasound-pages-in-unreal-engine#limitations)