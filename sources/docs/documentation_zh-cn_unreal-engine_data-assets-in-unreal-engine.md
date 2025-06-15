# 虚幻引擎中的数据资产 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/data-assets-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:39:45.652Z

---

目录

![数据资产](https://dev.epicgames.com/community/api/documentation/image/149f95de-8075-427f-8d75-2424b3f4843f?resizing_type=fill&width=1920&height=335)

数据资产是一种资产，它可以在其类的实例中存储与特定系统相关的数据。

-   **资产（Assets）** 可以使用从[UDataAsset](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/UDataAsset)继承的原生类在[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)中创建。如果你需要数据继承或更复杂的层级，我们建议创建纯数据蓝图类。
    
-   从[主数据资产](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/UPrimaryDataAsset)继承可实现 **主资产ID（Primary Asset Id）** ，并具有资产包（Asset Bundle）支持，这样就可以手动将其从[资产管理器](/documentation/zh-cn/unreal-engine/asset-management-in-unreal-engine)加载和卸载。
    
-   原生子类的实例可以直接创建为虚幻编辑器中的数据资产，并将使用原生类的名称作为 **PrimaryAssetType** 。
    

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e537a560-a6d4-4eda-8e68-9b663b56c001/dataassetclasspreview.png)

在上图中，在编辑器中创建新数据资产时，系统将提示你从原生子类列表中选择

-   可以创建[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)子类来添加变量，然后通过设置这些变量的纯数据蓝图再次生成子类。对于蓝图子类，我们建议使用纯数据蓝图而不是数据资产实例来处理数据继承并更新父类。

## 创建数据资产

要继承或创建你自己的 **数据资产（Data Asset）** ，请执行以下步骤：

1.  找到 **工具（Tools）** > **新C++类（New C++ Class）** ，然后基于 **DataAsset** 创建新类。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a666bd22-6815-485b-ac38-566e037e2bc8/inheritdataasset.png)
2.  添加你的类数据成员。
    
    ```cpp
             USTRUCT()
             struct FMyAssetInfo {
            GENERATED_BODY()
    		 
            UPROPERTY(EditAnywhere)
            FString AssetName;
    		 
            UPROPERTY(EditAnywhere)
            UTexture2D* AssetThumbnail;
    		 
            UPROPERTY(EditAnywhere)
            UStaticMesh* AssetStaticMesh; 
             };
    		 
    		
             UCLASS()
             class PROJECTExample_API UExampleDataAsset : public UDataAsset {
            GENERATED_BODY()
    		 
            UPROPERTY(EditAnywhere)
            TArray<FMyAssetInfo> AssetItems;
             };
    ```
    
3.  编译你的项目。
    
4.  在虚幻编辑器中，右键点击 **内容浏览器（Content Browser）** ，然后选择 **杂项（Miscellaneous）** > **数据资产（Data Asset）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f6797c9-287c-4156-8d05-512d59f3aceb/createdataasset.png)
5.  系统提示你为数据资产实例选择你的类时，列表中应该会填充你的资产。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25049cde-eca7-4434-823a-7d525f5c1f6e/pickdataassetclass.png)
6.  打开 **数据资产蓝图（Data Asset Blueprint）** ，观察成员变量。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ecf5737-4db3-406b-a571-c7c0a990efd4/blueprintdataasset.png)

使用[属性说明符](/documentation/zh-cn/unreal-engine/unreal-engine-uproperties)时，你可以观察资产中你的所有成员变量，以便设计师可以直接从编辑器修改数据。

## 主数据资产

**主数据资产（Primary Data Asset）** 是实现 `GetPrimaryAssetId` 函数的数据资产，并具有资产包（Asset Bundle）支持，这样就可以手动将其从资产管理器加载/卸载。

**PrimaryAssetType** 等于沿层级向上的第一个原生类或最高级别蓝图类的名称。例如，如果你有 `UPrimaryDataAsset` **\->** `UParentNativeClass` **\->** `UChildNativeClass` **\->** `DataOnlyBlueprintClass` ，则类型将为 `ChildNativeClass` 。

或者，如果你有 `UPrimaryDataAsset` **\->** `ParentBlueprintClass` **\->** `DataOnlyBlueprintClass` ，则类型将为 `ParentBlueprintClass` 。

要更改此行为，你可以重载原生类中的 `GetPrimaryAssetId` 函数，或将这些函数复制到不同的原生基类中。

### 创建主数据资产

要继承或创建你自己的主数据资产，请执行以下步骤：

1.  找到 **工具（Tools）** > **新C++类（New C++ Class）** ，然后基于PrimaryDataAsset创建新类。
    
2.  添加你的类成员并重载 **GetPrimaryAssetID** 函数。
    
    ```cpp
             UCLASS()
             class PROJECTExample_API UExampleDataAsset : public UPrimaryDataAsset {
             GENERATED_BODY()
    		 
             UPROPERTY(EditAnywhere)
             FString AssetName;
    		 
             UPROPERTY(EditAnywhere)
             UTexture2D* AssetThumbnail;
    		 
             UPROPERTY(EditAnywhere)
             UStaticMesh* AssetStaticMesh; 
    		
             GetPrimaryAssetId() const override { return FPrimaryAssetId("AssetItems", GetFName()); } 
             };
    ```
    

## 加载和卸载资产

**虚幻引擎（Unreal Engine）** 会自动处理[资产](/documentation/zh-cn/unreal-engine/assets-and-content-packs-in-unreal-engine)的加载和卸载，为开发者提供在每个资产都有需要时与引擎通信的方法。但是，你可能希望精确控制何时发现、加载和审核资产。对于这些情况，我们建议使用[资产管理器](/documentation/zh-cn/unreal-engine/asset-management-in-unreal-engine)。

### 异步资产加载

虚幻引擎简化了异步加载资产数据的过程。这些方法对于开发中以及设备上的烘焙数据作用完全一样，因此你不需要为了按需加载数据而维护两条代码路径。

请参阅[异步资产加载](/documentation/zh-cn/unreal-engine/asynchronous-asset-loading-in-unreal-engine)文档以了解详情。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建数据资产](/documentation/zh-cn/unreal-engine/data-assets-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%95%B0%E6%8D%AE%E8%B5%84%E4%BA%A7)
-   [主数据资产](/documentation/zh-cn/unreal-engine/data-assets-in-unreal-engine#%E4%B8%BB%E6%95%B0%E6%8D%AE%E8%B5%84%E4%BA%A7)
-   [创建主数据资产](/documentation/zh-cn/unreal-engine/data-assets-in-unreal-engine#%E5%88%9B%E5%BB%BA%E4%B8%BB%E6%95%B0%E6%8D%AE%E8%B5%84%E4%BA%A7)
-   [加载和卸载资产](/documentation/zh-cn/unreal-engine/data-assets-in-unreal-engine#%E5%8A%A0%E8%BD%BD%E5%92%8C%E5%8D%B8%E8%BD%BD%E8%B5%84%E4%BA%A7)
-   [异步资产加载](/documentation/zh-cn/unreal-engine/data-assets-in-unreal-engine#%E5%BC%82%E6%AD%A5%E8%B5%84%E4%BA%A7%E5%8A%A0%E8%BD%BD)