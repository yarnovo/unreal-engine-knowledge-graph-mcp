# Connecting to and Managing Devices in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/connecting-to-and-managing-devices-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:42:05.059Z

---

目录

![Device Manager](https://dev.epicgames.com/community/api/documentation/image/f33078e2-8f93-44fd-8d90-c50f3c3073ce?resizing_type=fill&width=1920&height=335)

The **Device Manager** window can connect to and control remote devices directly from Unreal Editor. This includes other PCs, smartphones, and game consoles. When you connect to a device in the Device Manager, you can deploy and launch packaged builds on that device using either the **Platforms Menu** or the command line interface for **Unreal Automation Tool (UAT)**. This page provides a reference for the Device Manager window and its functions, including:

-   Adding and removing devices from your Device Manager's list of devices.
    
-   Connecting to and disconnecting from remote devices.
    
-   Remotely controlling devices by powering them on and off.
    

## Opening the Device Manager

To access the Device Manager, click the **Platforms** dropdown in Unreal Editor, then click **Device Manager**.

![Accessing the Device Manager through the Platforms dropdown.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83d7b9ea-eae7-41f7-9004-eeb1b0c25382/devicemanager.png)

The Device Manager displays a list of devices you can use to launch your project.

## Device Manager User Interface

![The user interface of the Device Manager.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/438f369b-ed75-4eb3-a193-9fb4bd3d5263/interfaceguide.png)

**Index**

**UI Element**

**Description**

1

Device Management

Controls for claiming and releasing devices.

2

Device Connection

Connect or Disconnect from the selected device in the Device List.

3

Device Control

Remotely power on, power off, or reboot the selected device in the Device List.

4

Filters and Search Bar

Search for devices in the Device List.

5

Device List

A list of devices you can reserve, connect to, and control remotely.

6

Running Processes

A list of running processes on the device you have selected in the Device List.

7

Device Details

Information about the device you have selected, including platform info, device ID, status, and available UE features.

## Browsing the Device List

The **Device List** shows all of the devices connected to the same local area network (LAN) as your computer. If you have set up Android devices for WiFi debugging, they will appear here if they are on your wireless LAN. You can also connect to devices outside of your LAN, but you will need a stable IP address for the device to be able to find it. See Adding Devices to the Device Manager below.

![The device list in the device manager.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3942b194-6da4-4885-8a04-9bc77cab98b8/devicelist.png)

Select a device by clicking on it in the list.. You can then use the Device Manager's tools to view information about it or control the device remotely.

### Context Menu

Right-click on any entry in the Device List to see a context menu with a list of options for interacting with it.

![The context menu, which appears when you right-click in the device manager.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c27c1ed-5eac-49fa-9dcb-fbd832de95bb/contextmenu.png)

The options available mirror the other controls in the Device Manager, and are as follows:

**Option**

**Description**

Claim

Claim the device for your use.

Release

Release the device back to the device pool.

Share

Share the device with other users.

Remove

Remove the device from the Device Manager.

Connect

Open a direct connection to the target device.

Disconnect

Close your connection to the target device.

Power On

Remotely turn on the target device.

Power Off

Remotely turn off the target device.

Power Off (force)

Forcefully close all running applications on the target device, then turn it off.

Reboot

Remotely restart the target device.

See the sections below for more detailed descriptions of these options.

### Claiming and Releasing Devices

![The claim/release devices buttons in the toolbar.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c414f06c-2605-4632-99cc-abd5c62796ee/claimreleasedevices.png)

You initially can't interact with some devices in the device list. Click the **Claim** button to claim the device for your use. This reserves the device so that no one else on your network can use it, preventing conflicts between users.

Click the **Release** button when you are finished using a device to release it back to the device pool in your network.

If you want your device to be available for a group of users, click **Share**, or click the Share checkbox in the device list itself. You can toggle this on and off.

Click the **Remove** button to remove device from your device list. To add it again, see the section on Adding Devices to the Device Manager below.

## Adding Devices to the Device Manager

To add a device to your Device Manager, follow these steps:

1.  Click the **Add an Unlisted Device** dropdown.
    
    ![The Add Unlisted Device dropdown is located at the bottom of the Device List.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e31521e-8456-4481-8224-061731a65f25/unlisteddevicedropdown.png)
2.  Click the **Select a Platform** dropdown and click the platform for the device you want to add.
    
3.  Fill in the **Device Identifier** with the appropriate unique identifier for your device. Depending on the platform, this can be a host name, an IP address, a MAC address, or some other platform-specific unique identifier. The Device Manager accepts stable IP addresses for most platforms.
    
4.  Fill in **Display Name** with a name for the device. This is the field that will appear under the Device column in the device list, as well as other places in the UI in Unreal Editor.
    
5.  Once both the Device Identifier and Display Name are filled out, click **Add** to add the device to the list.
    
    ![The Add Unlisted Device dropdown unfolded, with an entry for a device entered into its fields.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3cf64059-910c-434c-8007-343686519255/unlisteddevice.png)

## Connecting and Disconnecting From Devices

![The Connect and Disconnect buttons in the toolbar.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/293dbffb-d8c8-4347-94aa-56cc692e8742/connectdisconnect.png)

Once you have claimed a device, click the **Connect** button while you have it selected to open a connection between your development machine and the device. Its Status in the device list will update to Connected, and you can now remotely control the device and use it tolaunch packaged builds of your project.

To disconnect from the device, click the **Disconnect** button. The device will be grayed out in the device list.

## Viewing Device Details

When you select a device in the device list, the **Device Details** panel shows the following system information:

**Value**

**Description**

Name

Shows the display name for the device. If you haven't provided a name, then by default, this is usually a unique identifier assigned on the device itself.

Platform

Displays the platform the device is running on, such as Windows, MacOS, Linux, Android, or iOS.

Device ID

Shows the full device ID for the device.

Default device

Shows whether or not the device is a default device for deploying builds. This will usually be your local development machine.

Status

Displays the current status of the device, such as if it is currently connected, not connected, or released.

Feature List

Displays a list of UE features that are compatible on the selected device.

### Feature Compatibility List

The feature list displays a list of known features and whether they are compatible with the selected device. Compatible features display in bright gray text and will list **Yes** under the Available column. Incompatible features display in dark gray and will list **No** under the Available column.

![The Device Details panel in the Device Manager, including the feature compatibility list at the bottom.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3588657f-05ea-447c-986c-2ce0606256f0/featurecompat.png)

This list does not contain an exhaustive list of all features in Unreal Engine. You may need to do your own research and testing to fully determine compatibility with features not listed here.

## Remotely Controlling Devices

You can control devices either with the power controls, the context menu, or the Running Processes panel.

### Powering Devices On and Off

![The Power On and Off buttons in the toolbar.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42b4bd92-3f65-415a-8f71-b101deeed62f/poweronoff.png)

Click the **Power On** button to turn on a selected device if it is not already running.

Click the **Power Off** button to turn off a selected device that is running.

Click **Reboot** to restart the selected device.

If you need to force shutdown a device, right-click it and click **Power Off (force)**. This forces any running processes to close, then shuts down the device.

### Controlling Device Processes

The **Running Processes** panel provides a list of processes currently running on the selected device.

![The Running Processes panel in the Device Manager.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3142f121-6fea-42a7-8364-15c5336379b8/runningprocesses.png)

The columns in this table are as follows:

**Column**

**Description**

Process Name

Name of the process or executable that is running.

PID

A unique number that acts as the ID for the listed process.

User

The name of the user responsible for running this process. This is usually a user who is logged in on the device.

Threads

Lists the number of CPU processing threads this process is using.

Parent PID

The PID for the parent process that this process belongs to. The parent process is responsible for creating this process.

You can display more processes by checking the **Show process tree** box in the lower-left corner of the window. Parent processes will then have a foldout you can click to show their children.

![The Running Processes panel with the Process Tree enabled. One of the processes is unfolded, showing its child processes.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4c8d042-0b97-4737-9ff6-76b261b60ecd/processtree.png)

To shut down a process, click it in the process list, then click **Terminate Process**.

![The Terminate Process button in the Running Processes panel.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4c8b113-93e6-4be0-8704-9381bf74d237/terminateprocess.png)

-   [device management](https://dev.epicgames.com/community/search?query=device%20management)
-   [remote device](https://dev.epicgames.com/community/search?query=remote%20device)
-   [connect to device](https://dev.epicgames.com/community/search?query=connect%20to%20device)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Opening the Device Manager](/documentation/zh-cn/unreal-engine/connecting-to-and-managing-devices-in-unreal-engine#openingthedevicemanager)
-   [Device Manager User Interface](/documentation/zh-cn/unreal-engine/connecting-to-and-managing-devices-in-unreal-engine#devicemanageruserinterface)
-   [Browsing the Device List](/documentation/zh-cn/unreal-engine/connecting-to-and-managing-devices-in-unreal-engine#browsingthedevicelist)
-   [Context Menu](/documentation/zh-cn/unreal-engine/connecting-to-and-managing-devices-in-unreal-engine#contextmenu)
-   [Claiming and Releasing Devices](/documentation/zh-cn/unreal-engine/connecting-to-and-managing-devices-in-unreal-engine#claimingandreleasingdevices)
-   [Adding Devices to the Device Manager](/documentation/zh-cn/unreal-engine/connecting-to-and-managing-devices-in-unreal-engine#addingdevicestothedevicemanager)
-   [Connecting and Disconnecting From Devices](/documentation/zh-cn/unreal-engine/connecting-to-and-managing-devices-in-unreal-engine#connectinganddisconnectingfromdevices)
-   [Viewing Device Details](/documentation/zh-cn/unreal-engine/connecting-to-and-managing-devices-in-unreal-engine#viewingdevicedetails)
-   [Feature Compatibility List](/documentation/zh-cn/unreal-engine/connecting-to-and-managing-devices-in-unreal-engine#featurecompatibilitylist)
-   [Remotely Controlling Devices](/documentation/zh-cn/unreal-engine/connecting-to-and-managing-devices-in-unreal-engine#remotelycontrollingdevices)
-   [Powering Devices On and Off](/documentation/zh-cn/unreal-engine/connecting-to-and-managing-devices-in-unreal-engine#poweringdevicesonandoff)
-   [Controlling Device Processes](/documentation/zh-cn/unreal-engine/connecting-to-and-managing-devices-in-unreal-engine#controllingdeviceprocesses)