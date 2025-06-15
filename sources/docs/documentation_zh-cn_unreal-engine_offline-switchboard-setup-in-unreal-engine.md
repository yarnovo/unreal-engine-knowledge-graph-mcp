# 在虚幻引擎中离线设置Switchboard | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/offline-switchboard-setup-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:29:56.026Z

---

目录

![离线设置Switchboard](https://dev.epicgames.com/community/api/documentation/image/a45f06ca-6883-435c-b112-592480f2f0dd?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

Switchboard是一款Python应用程序。首次启动时，它通常会使用 `pip` 命令从互联网下载并安装一些依赖项。本指南将介绍如何在无法上网的设备上设置Switchboard。

## 先决条件

-   一台或多台需要安装Switchboard的离线计算机。
-   一台具有相同引擎版本、操作系统和架构的在线计算机。

## 流程

由于 `PIP_FIND_LINKS` 的一个错误，Windows中必须使用不含空格的路径，作为软件包的下载目录。

1.  用在线计算机运行以下命令，从PyPI下载Python软件包并将其存储到本地：
    
    ```cpp
         > cd /d "<UE Directory>"
         > Engine\Binaries\ThirdParty\Python3\Win64\python.exe -m pip download -r Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt -d <Package Download Destination>
    ```
    
2.  将生成的 `<Package Download Destination>` 目录复制到离线计算机。
3.  用离线计算机运行以下命令，向 `pip` 表明在首次设置Switchboard时查找对应的目录：
    
    ```cpp
         > set PIP_NO_INDEX=1
         > set PIP_FIND_LINKS=<Package Download Destination>
    ```
    
4.  使用上述PIP配置在同一终端上运行 `switchboard.bat` 。这将使用首次设置继续操作，并表示正在处理上一步所下载和复制的 `.whl` 文件。
    
    ```cpp
         > "<UE Directory>\Engine\Plugins\VirtualProduction\Switchboard\Source\Switchboard\switchboard.bat"
    ```
    

### Switchboard.bat输出示例

```cpp
> D:\P4\...\Main\Engine\Plugins\VirtualProduction\Switchboard\Source\Switchboard\switchboard.bat
Using DEFAULT path for Python virtual environment (D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\Python)
Performing Switchboard first-time setup
(INFO) VENV_DIR: D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\Python
(INFO) Creating virtual environment
(INFO) post_setup() - calling install_scripts()
(INFO) post_setup() - invoking pip install
(INFO) pip> Looking in links: d:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\download
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\pyside6_essentials-6.5.3-cp37-abi3-win_amd64.whl (from -r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 1))
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\python_osc-1.8.3-py3-none-any.whl (from -r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 2))
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\requests-2.24.0-py2.py3-none-any.whl (from -r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 3))
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\six-1.15.0-py2.py3-none-any.whl (from -r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 4))
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\aioquic-0.9.21-cp37-abi3-win_amd64.whl (from -r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 5))
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\shiboken6-6.5.3-cp37-abi3-win_amd64.whl (from pyside6-essentials==6.5.3->-r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 1))
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\chardet-3.0.4-py2.py3-none-any.whl (from requests==2.24.0->-r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 3))
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\idna-2.10-py2.py3-none-any.whl (from requests==2.24.0->-r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 3))
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\urllib3-1.25.11-py2.py3-none-any.whl (from requests==2.24.0->-r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 3))
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\certifi-2024.7.4-py3-none-any.whl (from requests==2.24.0->-r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 3))
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\pylsqpack-0.3.18-cp38-abi3-win_amd64.whl (from aioquic==0.9.21->-r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 5))
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\pyopenssl-24.2.1-py3-none-any.whl (from aioquic==0.9.21->-r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 5))
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\cryptography-43.0.0-cp39-abi3-win_amd64.whl (from pyopenssl>=22->aioquic==0.9.21->-r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 5))
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\cffi-1.16.0-cp311-cp311-win_amd64.whl (from cryptography<44,>=41.0.5->pyopenssl>=22->aioquic==0.9.21->-r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 5))
(INFO) pip> Processing d:\p4\...\main\engine\extras\thirdpartynotue\switchboardthirdparty\download\pycparser-2.22-py3-none-any.whl (from cffi>=1.12->cryptography<44,>=41.0.5->pyopenssl>=22->aioquic==0.9.21->-r D:\P4\...\Main\Engine\Extras\ThirdPartyNotUE\SwitchboardThirdParty\requirements.txt (line 5))
(INFO) pip> Installing collected packages: chardet, urllib3, six, shiboken6, python-osc, pylsqpack, pycparser, idna, certifi, requests, pyside6-essentials, cffi, cryptography, pyopenssl, aioquic
(INFO) pip> Successfully installed aioquic-0.9.21 certifi-2024.7.4 cffi-1.16.0 chardet-3.0.4 cryptography-43.0.0 idna-2.10 pycparser-2.22 pylsqpack-0.3.18 pyopenssl-24.2.1 pyside6-essentials-6.5.3 python-osc-1.8.3 requests-2.24.0 shiboken6-6.5.3 six-1.15.0 urllib3-1.25.11
(INFO) pip install exited with code 0
(INFO) Finished with return code 0
```

-   [python](https://dev.epicgames.com/community/search?query=python)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [switchboard](https://dev.epicgames.com/community/search?query=switchboard)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/offline-switchboard-setup-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [流程](/documentation/zh-cn/unreal-engine/offline-switchboard-setup-in-unreal-engine#%E6%B5%81%E7%A8%8B)
-   [Switchboard.bat输出示例](/documentation/zh-cn/unreal-engine/offline-switchboard-setup-in-unreal-engine#switchboardbat%E8%BE%93%E5%87%BA%E7%A4%BA%E4%BE%8B)