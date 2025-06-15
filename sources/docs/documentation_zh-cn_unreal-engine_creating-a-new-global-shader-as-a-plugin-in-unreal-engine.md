# 在虚幻引擎中新建全局着色器并作为插件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-a-new-global-shader-as-a-plugin-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:24:56.742Z

---

目录

![新建全局着色器并作为插件](https://dev.epicgames.com/community/api/documentation/image/d29a095e-5212-4581-a0f8-d4023bb0e835?resizing_type=fill&width=1920&height=335)

虚幻引擎插件系统能帮助用户添加大量新功能，而无需重编译和发布整个引擎。以下指南中将重建光学变形（Lens Distortion）全局着色器，展示实现可由蓝图进行控制的全局着色器的方法。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10d88cdb-0e27-466e-89af-3ef91726f1fc/ht_hero_image.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10d88cdb-0e27-466e-89af-3ef91726f1fc/ht_hero_image.png)

点击查看大图。

此例中将重建现有的Lens Distortion插件（位于 **Engine\\Plugins\\Compositing\\LensDistortion** 中），将其改为名为 **Foo** 的新插件，展示此工作流的实现过程。

Shaders in 插件快速入门将对创建全局着色器并用作插件进行讲解。

## 1 - 代码设置

开始新建虚幻引擎4的插件之前，需要先安装 Visual Studio。此快速入门需要Visual Studio，用户需要对插件代码进行编译，使其能正常运行。如不了解此操作，请查阅\[为虚幻引擎设置Visual Studio\]\](programming-and-scripting/development-environment-setup/visual-studio-setup/)文档。

1.  首先新建一个 **游戏** 项目并选择 **空白** 模板。确保将其设置为 **最高质量**，且不带 **初学者内容包**。
    
2.  项目创建后，Visual Studio将打开，之后即可右键点击ShadersInPlugins项目并选择 **编译** 选项编译项目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43b3317a-d270-4f39-955b-12dd56d7982e/ht_shadersinplugins_01.png)
3.  项目编译完成后，在Visual Studio中按下 **F5** 键在虚幻引擎编辑器中启动ShadersInPlugins项目。
    
4.  虚幻引擎编辑器完成加载后，前往 **编辑** > **插件** 打开 **插件** 管理器，然后点击"插件"窗口右下角的 **新建插件（New Plugin）** 选项，调出"新建插件"窗口。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2296dab9-787a-4749-a5ca-046f89380ad1/ht_shadersinplugins_02.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2296dab9-787a-4749-a5ca-046f89380ad1/ht_shadersinplugins_02.png)
    
    点击查看大图。
    
5.  在 **新建插件** 窗口中，选择 **空白（Blank）** 插件，将其命名为 **Foo** ，保留所有默认设置。所有操作完成后，按下 **创建插件** 键创建插件最初需要的全部内容。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf74f07c-cf32-428d-9cb5-d31604097fb9/ht_shadersinplugins_03.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf74f07c-cf32-428d-9cb5-d31604097fb9/ht_shadersinplugins_03.png)
    
    点击查看大图。
    
6.  完成后，关闭虚幻引擎和Visual Studio，前往在项目文件夹中创建的 **Plugins** > **Foo** 插件文件夹。
    
7.  在Foo plugins文件夹中添加一个名为 **Shaders** 的新文件夹，并在其中再新建一个名为 **Private** 的文件夹。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d00a82ac-7016-486a-9993-cacf0bf4f4da/ht_shadersinplugins_04.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d00a82ac-7016-486a-9993-cacf0bf4f4da/ht_shadersinplugins_04.png)
    
    点击查看大图。
    
8.  在Private文件夹中新建一个文本文件并将其命名为 **MyShader.USF**，然后将以下HLSL代码复制粘贴到此文件中，完成操作后保存文件。
    
    须将文件扩展名改为 **.USF**，否则虚幻引擎无法将其识别为着色器文件。
    
    ```cpp
         // Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.
    
         /*=============================================================================
             LensDistortionUVGeneration.usf:将光学变形和不
             变形UV置换贴图生成到一个渲染目标中。
    
             像素着色器直接计算变形视口UV，
             不对使用Sv_Position和参考方程式的视口UV置换执行变形，
             并将它们保存到红色和绿色的通道中。
    
             为避免用费拉里法进行解析、
             或在 GPU 上执行牛顿法计算不变形视口 UV 这两种方式
             来对视口UV置换进行变形，这对着色器的工作方式如下：顶点着色器不对网格的顶点执行变形，
             并下传到像素着色器视口 UV 应在屏幕上
             所处的位置，而不进行变形。像素
             着色器可生成不变形视口UV，
             减去像素的视口UV后即可对视口UV置换进行变形。
         =============================================================================*/
    
         #include "/Engine/Public/Platform.ush"
    
         // 视口UV坐标中的像素大小。
         float2 PixelUVSize;
    
         // K1, K2, K3
         float3 RadialDistortionCoefs;
    
         // P1, P2
         float2 TangentialDistortionCoefs;
    
         // 未变形视口的相机矩阵。
         float4 UndistortedCameraMatrix;
    
         // 变形视口的相机矩阵。
         float4 DistortedCameraMatrix;
    
         // 对渲染目标输出乘法和加法。
         float2 OutputMultiplyAndAdd;
    
         // 不对V.z=1视图位置进行变形。
         float2 UndistortNormalizedViewPosition(float2 V)
         {
             float2 V2 = V * V;
             float R2 = V2.x + V2.y;
    
             // 径向变形（额外添加括号是为匹配 MF_Undistortion.uasset）。
             float2 UndistortedV = V * (1.0 + R2 * (RadialDistortionCoefs.x + R2 * (RadialDistortionCoefs.y + R2 * RadialDistortionCoefs.z)));
    
             // 切向变形。
             UndistortedV.x += TangentialDistortionCoefs.y * (R2 + 2 * V2.x) + 2 * TangentialDistortionCoefs.x * V.x * V.y;
             UndistortedV.y += TangentialDistortionCoefs.x * (R2 + 2 * V2.y) + 2 * TangentialDistortionCoefs.y * V.x * V.y;
    
             return UndistortedV;
         }
    
         // 返回变形视口UV的未变形视口UV。
         //
         // 注意：
         //        UV创建于左下角。
         float2 UndistortViewportUV(float2 ViewportUV)
         {
             // 已变形视口UV -> 已变形视图位置（z=1）
             float2 DistortedViewPosition = (ViewportUV - DistortedCameraMatrix.zw) / DistortedCameraMatrix.xy;
    
             // 计算未变形的视图位置（z=1）
             float2 UndistortedViewPosition = UndistortNormalizedViewPosition(DistortedViewPosition);
    
             // 未变形的视图位置（z=1） -> 未变形的视口UV。
             return UndistortedCameraMatrix.xy * UndistortedViewPosition + UndistortedCameraMatrix.zw;
         }
    
         // 翻转UV的y组件。
         float2 FlipUV(float2 UV)
         {
             return float2(UV.x, 1 - UV.y);
         }
    
         void MainVS(
             in uint GlobalVertexId :SV_VertexID,
             out float2 OutVertexDistortedViewportUV :TEXCOORD0,
             out float4 OutPosition :SV_POSITION
             )
         {
             // 计算单元索引。
             uint GridCellIndex = GlobalVertexId / 6;
    
             // 计算网格中单元行和列的ID。
             uint GridColumnId = GridCellIndex / GRID_SUBDIVISION_Y;
             uint GridRowId = GridCellIndex - GridColumnId * GRID_SUBDIVISION_Y;
    
             // 计算双三角形网格单元中的顶点ID。
             uint VertexId = GlobalVertexId - GridCellIndex * 6;
    
             // 计算单元中三角形顶点源自左下角的UV坐标。
             float2 CellVertexUV = float2(0x1 & ((VertexId + 1) / 3), VertexId & 0x1);
    
             // 计算网格中顶点源自左上角的UV。
             float2 GridInvSize = 1.f / float2(GRID_SUBDIVISION_X, GRID_SUBDIVISION_Y);
             float2 GridVertexUV = FlipUV(
                 GridInvSize * (CellVertexUV + float2(GridColumnId, GridRowId)));
    
             // 标准不含半像素位移。
             GridVertexUV -= PixelUVSize * 0.5;
    
             // 输出顶点位置。
             OutPosition = float4(FlipUV(
                 UndistortViewportUV(GridVertexUV) + PixelUVSize * 0.5) * 2 - 1, 0, 1);
    
             // 输出顶点源自左上角的UV。
             OutVertexDistortedViewportUV = GridVertexUV;
         }
    
         void MainPS(
             in noperspective float2 VertexDistortedViewportUV :TEXCOORD0,
             in float4 SvPosition :SV_POSITION,
             out float4 OutColor :SV_Target0
             )
         {
             // 计算像素源自左上角的UV。
             float2 ViewportUV = SvPosition.xy * PixelUVSize;
    
             // 标准不含半像素位移。
             ViewportUV -= PixelUVSize * 0.5;
    
             float2 DistortUVtoUndistortUV = (UndistortViewportUV((ViewportUV))) - ViewportUV;
             float2 UndistortUVtoDistortUV = VertexDistortedViewportUV - ViewportUV;
    
             // 输出置换通道。
             OutColor = OutputMultiplyAndAdd.y + OutputMultiplyAndAdd.x * float4(
                 DistortUVtoUndistortUV, UndistortUVtoDistortUV);
         }
    
    ```
    
9.  现在找到 **Foo.uplugin** 文件并将其在文本编辑器中打开，用以下文本替代文件中的信息，完成后保存文件。
    
    ```cpp
             {
                 "FileVersion" :3,
                 "Version" :1,
                 "VersionName" :"1.0",
                 "FriendlyName" :"Foo",
                 "Description" :"Plugin to play around with shaders.",
                 "Category" :"Sandbox",
                 "CreatedBy" :"Epic Games, Inc.",
                 "CreatedByURL" :"http://epicgames.com",
                 "DocsURL" :"",
                 "MarketplaceURL" :"",
                 "SupportURL" :"",
                 "EnabledByDefault" : false,
                 "CanContainContent" : true,
                 "IsBetaVersion" : false,
                 "Installed" : false,
                 "Modules" :
                 [
                     {
                         "Name" :"Foo",
                         "Type" :"Developer",
                         "LoadingPhase" :"PostConfigInit"
                     }
                 ]
             }
    		
    ```
    
10.  接下来前往 **Plugins\\Foo\\Source\\Foo** 并新建文件夹 **Classes**，然后从 **Engine\\Plugins\\Compositing\\LensDistortion** 路径下复制 **LensDistortionAPI.h** 和 **LensDistortionBlueprintLibrary.h** 文件到该新建文件夹中。
    
    要复制的文件位于 **Engine\\Plugins\\Compositing\\LensDistortion** 中。
    
    -   类 - 新建文件夹
        
        -   复制 - LensDistortionAPI.h
        -   复制 - LensDistortionBlueprintLibrary.h
        
        ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26fdbc3f-b343-4da5-a381-e77354661466/ht_shadersinplugins_05.png)
11.  然后前往 **Private** 文件夹并将 **LensDistortionBlueprintLibrary.cpp** 和 **LensDistortionRendering.cpp** 文件复制到此Private文件夹。
    
    -   Private - 现有文件夹
        
        -   复制 - LensDistortionBlueprintLibrary.cpp
        -   复制 - LensDistortionRendering.cpp
        
        ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e8d1142-383d-4847-88d7-c6e092a5de92/ht_shadersinplugins_06.png)
12.  现在关闭虚幻引擎编辑器和Visual Studio，然后找到项目.U项目文件。找到以后，对其点击右键，选择 **生成Visual Studio项目文件（Generate Visual Studio project files）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3f4c0dd-1e72-4e32-8ce5-8a546c15dee8/ht_shadersinplugins_07.png)
13.  重新打开Visual Studio解决方案，然后前往Foo > Classes并打开 **LensDistortionAPI.h** 文件。在此文件中，将 **FLensDistortionCameraModel** 替换为 **FFooCameraModel**。
    
    需在此文件中用FFooCameraModel替换FLensDistortionCameraModel **四次** 。
    
    ```cpp
             // Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.
    
             #pragma once
    
             #include "CoreMinimal.h"
             #include "LensDistortionAPI.generated.h"
    
             /** 光学变形/不变形的数学相机模型。
             *
             * 相机矩阵 =
             *  | F.X  0  C.x |
             *  |  0  F.Y C.Y |
             *  |  0   0   1  |
             */
             USTRUCT(BlueprintType)
             struct FFooCameraModel
             {
                 GENERATED_USTRUCT_BODY()
                 FFooCameraModel()
                 {
                     K1 = K2 = K3 = P1 = P2 = 0.f;
                     F = FVector2D(1.f, 1.f);
                     C = FVector2D(0.5f, 0.5f);
                 }
    
                 /** Radial parameter #1.*/
                 UPROPERTY(Interp, EditAnywhere, BlueprintReadWrite, Category = "Lens Distortion|Camera Model")
                 float K1;
    
                 /** 径向参数 #2。*/
                 UPROPERTY(Interp, EditAnywhere, BlueprintReadWrite, Category = "Lens Distortion|Camera Model")
                 float K2;
    
                 /** 径向参数 #3。*/
                 UPROPERTY(Interp, EditAnywhere, BlueprintReadWrite, Category = "Lens Distortion|Camera Model")
                 float K3;
    
                 /** 切向参数 #1。*/
                 UPROPERTY(Interp, EditAnywhere, BlueprintReadWrite, Category = "Lens Distortion|Camera Model")
                 float P1;
    
                 /** 切向参数 #2。*/
                 UPROPERTY(Interp, EditAnywhere, BlueprintReadWrite, Category = "Lens Distortion|Camera Model")
                 float P2;
    
                 /** 相机矩阵的Fx和Fy。*/
                 UPROPERTY(Interp, EditAnywhere, BlueprintReadWrite, Category = "Lens Distortion|Camera Model")
                 FVector2D F;
    
                 /** 相机矩阵的Cx和Cy。*/
                 UPROPERTY(Interp, EditAnywhere, BlueprintReadWrite, Category = "Lens Distortion|Camera Model")
                 FVector2D C;
    
                 /** 不在视图空间中进行3D向量变形（x, y, z=1.f）并返回（x', y', z'=1.f）。*/
                 FVector2D UndistortNormalizedViewPosition(FVector2D V) const;
    
                 /** 返回不变形渲染所需的过扫描因子，避免出现未渲染的变形像素。*/
                 float GetUndistortOverscanFactor(
                     float DistortedHorizontalFOV,
                     float DistortedAspectRatio) const;
    
                 /** 在输出渲染目标中绘制UV置换贴图。
                 * - 红色和绿色通道负责变形置换；
                 * - 蓝色和透明通道负责不变形置换。
                 * @param World 获取渲染设置的当前场景（如特征场景）。
                 * @param DistortedHorizontalFOV 变形渲染中理想的水平视野。
                 * @param DistortedAspectRatio 变形渲染中理想的高宽比。
                 * @param UndistortOverscanFactor 未变形渲染的过扫描因子。
                 * @param OutputRenderTarget 进行绘制的渲染目标。不必拥有和变形渲染相同的分辨率或高宽比。
                 * @param OutputMultiply 应用在置换上的乘法因子。
                 * @param OutputAdd 保存到输出渲染目标中之前被添加到相乘置换的值。
                 */
                 void DrawUVDisplacementToRenderTarget(
                     class UWorld* World,
                     float DistortedHorizontalFOV,
                     float DistortedAspectRatio,
                     float UndistortOverscanFactor,
                     class UTextureRenderTarget2D* OutputRenderTarget,
                     float OutputMultiply,
                     float OutputAdd) const;
    
                 /** 对比两个光学变形模型并返回其是否相同。*/
                 bool operator == (const FFooCameraModel& Other) const
                 {
                     return (
                         K1 == Other.K1 &&
                         K2 == Other.K2 &&
                         K3 == Other.K3 &&
                         P1 == Other.P1 &&
                         P2 == Other.P2 &&
                         F == Other.F &&
                         C == Other.C);
                 }
    
                 /** 对比两个光学变形模型并返回其是否不同。*/
                 bool operator != (const FFooCameraModel& Other) const
                 {
                     return !(*this == Other);
                 }
             };
    
    ```
    
14.  接下来打开 **LensDistortionBlueprintLibrary.h** 文件。此文件控制此节点在蓝图中的显示方式，因此不仅需要将 **FLensDistortionCameraModel** 替换为 **FFooCameraModel**，还需要将 **Category = "Lens Distortion"** 改为 **Category = "Foo | Lens Distortion"**。
    
    需要在此文件中用FFooCameraModel替换FLensDistortionCameraModel **六次**。
    
    ```cpp
         // Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.
    
         #pragma once
    
         #include "CoreMinimal.h"
         #include "UObject/ObjectMacros.h"
         #include "Classes/Kismet/BlueprintFunctionLibrary.h"
         #include "LensDistortionAPI.h"
         #include "LensDistortionBlueprintLibrary.generated.h"
    
         UCLASS(MinimalAPI)
         class ULensDistortionBlueprintLibrary : public UBlueprintFunctionLibrary
         {
             GENERATED_UCLASS_BODY()
    
             /** 返回不变形渲染所需的过扫描因子，避免出现未渲染的变形像素。*/
             UFUNCTION(BlueprintPure, Category = "Foo | Lens Distortion")
             static void GetUndistortOverscanFactor(
                 const FFooCameraModel& CameraModel,
                 float DistortedHorizontalFOV,
                 float DistortedAspectRatio,
                 float& UndistortOverscanFactor);
    
             /** 在输出渲染目标中绘制UV置换贴图。
             * - 红色和绿色通道负责变形置换；
             * - 蓝色和透明通道负责不变形置换。
             * @param DistortedHorizontalFOV 变形渲染中理想的水平视野。
             * @param DistortedAspectRatio 变形渲染中理想的高宽比。
             * @param UndistortOverscanFactor 未变形渲染的过扫描因子。
             * @param OutputRenderTarget 进行绘制的渲染目标。不必拥有和变形渲染相同的分辨率或高宽比。
             * @param OutputMultiply 应用在置换上的乘法因子。
             * @param OutputAdd 保存到输出渲染目标中之前被添加到相乘置换的值。
             */
             UFUNCTION(BlueprintCallable, Category = "Foo | Lens Distortion", meta = (WorldContext = "WorldContextObject"))
             static void DrawUVDisplacementToRenderTarget(
                 const UObject* WorldContextObject,
                 const FFooCameraModel& CameraModel,
                 float DistortedHorizontalFOV,
                 float DistortedAspectRatio,
                 float UndistortOverscanFactor,
                 class UTextureRenderTarget2D* OutputRenderTarget,
                 float OutputMultiply = 0.5,
                 float OutputAdd = 0.5
                 );
    
             /* 如果A等于B（A == B）则返回true */
             UFUNCTION(BlueprintPure, meta=(DisplayName = "Equal (LensDistortionCameraModel)", CompactNodeTitle = "==", Keywords = "== equal"), Category = "Foo | Lens Distortion")
             static bool EqualEqual_CompareLensDistortionModels(
                 const FFooCameraModel& A,
                 const FFooCameraModel& B)
             {
                 return A == B;
             }
    
             /* 如A不等于B（A != B），则返回true */
             UFUNCTION(BlueprintPure, meta = (DisplayName = "NotEqual (LensDistortionCameraModel)", CompactNodeTitle = "!=", Keywords = "!= not equal"), Category = "Foo | Lens Distortion")
             static bool NotEqual_CompareLensDistortionModels(
                 const FFooCameraModel& A,
                 const FFooCameraModel& B)
             {
                 return A != B;
             }
         };
    
    ```
    
15.  现在前往 **Private** 文件夹打开 **LensDistortionBlueprintLibrary.cpp** 进行以下替换：
    
    -   **FLensDistortionCameraModel** 替换为 **FFooCameraModel**
    -   **ULensDistortionBlueprintLibrary** 替换为 **UFooBlueprintLibrary**
    
    应用FFooCameraModel替换FLensDistortionCameraModel **两** 次，用UFooBlueprintLibrary替换ULensDistortionBlueprintLibrary **四** 次。
    
    ```cpp
             // Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.
    
             #include "LensDistortionBlueprintLibrary.h"
    
             ULensDistortionBlueprintLibrary::ULensDistortionBlueprintLibrary(const FObjectInitializer& ObjectInitializer)
                 :Super(ObjectInitializer)
             { }
    
             // 静态
             void ULensDistortionBlueprintLibrary::GetUndistortOverscanFactor(
                 const FFooCameraModel& CameraModel,
                 float DistortedHorizontalFOV,
                 float DistortedAspectRatio,
                 float& UndistortOverscanFactor)
             {
                 UndistortOverscanFactor = CameraModel.GetUndistortOverscanFactor(DistortedHorizontalFOV, DistortedAspectRatio);
             }
    
             // 静态
             void ULensDistortionBlueprintLibrary::DrawUVDisplacementToRenderTarget(
                 const UObject* WorldContextObject,
                 const FFooCameraModel& CameraModel,
                 float DistortedHorizontalFOV,
                 float DistortedAspectRatio,
                 float UndistortOverscanFactor,
                 class UTextureRenderTarget2D* OutputRenderTarget,
                 float OutputMultiply,
                 float OutputAdd)
             {
                 CameraModel.DrawUVDisplacementToRenderTarget(
                     WorldContextObject->GetWorld(),
                     DistortedHorizontalFOV, DistortedAspectRatio,
                     UndistortOverscanFactor, OutputRenderTarget,
                     OutputMultiply, OutputAdd);
             }
    
    ```
    
16.  接下来，在 **Private** 文件夹中打开 **LensDistortionRendering.cpp** 文件，将 **FLensDistortionCameraModel** 替换为 **FFooCameraModel**
    
    需要在此文件中用FFooCameraModel替换FLensDistortionCameraModel **六次**。
    
    ```cpp
             // Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.
    
             #include "LensDistortionAPI.h"
             #include "Classes/Engine/TextureRenderTarget2D.h"
             #include "Classes/Engine/World.h"
             #include "Public/GlobalShader.h"
             #include "Public/PipelineStateCache.h"
             #include "Public/RHIStaticStates.h"
             #include "Public/SceneUtils.h"
             #include "Public/SceneInterface.h"
             #include "Public/ShaderParameterUtils.h"
    
             static const uint32 kGridSubdivisionX = 32;
             static const uint32 kGridSubdivisionY = 16;
    
             /**
             * 派生自 FFooCameraModel 的中间结构体，
             * 由游戏线程交付给渲染线程。
             */
             struct FCompiledCameraModel
             {
                 /** 生成此编译模型的原始相机模型。*/
                 FFooCameraModel OriginalCameraModel;
    
                 /** 未变形和变形渲染光学变形的相机矩阵。
                 *  XY保存缩放因子，ZW保存平移。
                 */
                 FVector4 DistortedCameraMatrix;
                 FVector4 UndistortedCameraMatrix;
    
                 /** 对渲染目标输出通道的乘法和加法。*/
                 FVector2D OutputMultiplyAndAdd;
             };
    
             /** 不对源自左上角的视口UV进行变形，将其放入视图空间（x', y', z'=1.f）*/
             static FVector2D LensUndistortViewportUVIntoViewSpace(
                 const FFooCameraModel& CameraModel,
                 float TanHalfDistortedHorizontalFOV, float DistortedAspectRatio,
                 FVector2D DistortedViewportUV)
             {
                 FVector2D AspectRatioAwareF = CameraModel.F * FVector2D(1, -DistortedAspectRatio);
                 return CameraModel.UndistortNormalizedViewPosition((DistortedViewportUV - CameraModel.C) / AspectRatioAwareF);
             }
    
             class FLensDistortionUVGenerationShader : public FGlobalShader
             {
             public:
                 static bool ShouldCache(EShaderPlatform Platform)
                 {
                     return IsFeatureLevelSupported(Platform, ERHIFeatureLevel::SM4);
                 }
    
                 static void ModifyCompilationEnvironment(EShaderPlatform Platform, FShaderCompilerEnvironment& OutEnvironment)
                 {
                     FGlobalShader::ModifyCompilationEnvironment(Platform, OutEnvironment);
                     OutEnvironment.SetDefine(TEXT("GRID_SUBDIVISION_X"), kGridSubdivisionX);
                     OutEnvironment.SetDefine(TEXT("GRID_SUBDIVISION_Y"), kGridSubdivisionY);
                 }
    
                 FLensDistortionUVGenerationShader() {}
    
                 FLensDistortionUVGenerationShader(const ShaderMetaType::CompiledShaderInitializerType& Initializer)
                     :FGlobalShader(Initializer)
                 {
                     PixelUVSize.Bind(Initializer.ParameterMap, TEXT("PixelUVSize"));
                     RadialDistortionCoefs.Bind(Initializer.ParameterMap, TEXT("RadialDistortionCoefs"));
                     TangentialDistortionCoefs.Bind(Initializer.ParameterMap, TEXT("TangentialDistortionCoefs"));
                     DistortedCameraMatrix.Bind(Initializer.ParameterMap, TEXT("DistortedCameraMatrix"));
                     UndistortedCameraMatrix.Bind(Initializer.ParameterMap, TEXT("UndistortedCameraMatrix"));
                     OutputMultiplyAndAdd.Bind(Initializer.ParameterMap, TEXT("OutputMultiplyAndAdd"));
                 }
    
                 template<typename TShaderRHIParamRef>
                 void SetParameters(
                     FRHICommandListImmediate& RHICmdList,
                     const TShaderRHIParamRef ShaderRHI,
                     const FCompiledCameraModel& CompiledCameraModel,
                     const FIntPoint& DisplacementMapResolution)
                 {
                     FVector2D PixelUVSizeValue(
                         1.f / float(DisplacementMapResolution.X), 1.f / float(DisplacementMapResolution.Y));
                     FVector RadialDistortionCoefsValue(
                         CompiledCameraModel.OriginalCameraModel.K1,
                         CompiledCameraModel.OriginalCameraModel.K2,
                         CompiledCameraModel.OriginalCameraModel.K3);
                     FVector2D TangentialDistortionCoefsValue(
                         CompiledCameraModel.OriginalCameraModel.P1,
                         CompiledCameraModel.OriginalCameraModel.P2);
    
                     SetShaderValue(RHICmdList, ShaderRHI, PixelUVSize, PixelUVSizeValue);
                     SetShaderValue(RHICmdList, ShaderRHI, DistortedCameraMatrix, CompiledCameraModel.DistortedCameraMatrix);
                     SetShaderValue(RHICmdList, ShaderRHI, UndistortedCameraMatrix, CompiledCameraModel.UndistortedCameraMatrix);
                     SetShaderValue(RHICmdList, ShaderRHI, RadialDistortionCoefs, RadialDistortionCoefsValue);
                     SetShaderValue(RHICmdList, ShaderRHI, TangentialDistortionCoefs, TangentialDistortionCoefsValue);
                     SetShaderValue(RHICmdList, ShaderRHI, OutputMultiplyAndAdd, CompiledCameraModel.OutputMultiplyAndAdd);
                 }
    
                 virtual bool Serialize(FArchive& Ar) override
                 {
                     bool bShaderHasOutdatedParameters = FGlobalShader::Serialize(Ar);
                     Ar << PixelUVSize << RadialDistortionCoefs << TangentialDistortionCoefs << DistortedCameraMatrix << UndistortedCameraMatrix << OutputMultiplyAndAdd;
                     return bShaderHasOutdatedParameters;
                 }
    
             private:
                 FShaderParameter PixelUVSize;
                 FShaderParameter RadialDistortionCoefs;
                 FShaderParameter TangentialDistortionCoefs;
                 FShaderParameter DistortedCameraMatrix;
                 FShaderParameter UndistortedCameraMatrix;
                 FShaderParameter OutputMultiplyAndAdd;
    
             };
    
             class FLensDistortionUVGenerationVS : public FLensDistortionUVGenerationShader
             {
                 DECLARE_SHADER_TYPE(FLensDistortionUVGenerationVS, Global);
    
             public:
    
                 /** 默认构造函数。*/
                 FLensDistortionUVGenerationVS() {}
    
                 /** 初始化构造函数。*/
                 FLensDistortionUVGenerationVS(const ShaderMetaType::CompiledShaderInitializerType& Initializer)
                     :FLensDistortionUVGenerationShader(Initializer)
                 {
                 }
             };
    
             class FLensDistortionUVGenerationPS : public FLensDistortionUVGenerationShader
             {
                 DECLARE_SHADER_TYPE(FLensDistortionUVGenerationPS, Global);
    
             public:
    
                 /** 默认构造函数。*/
                 FLensDistortionUVGenerationPS() {}
    
                 /** 初始化构造函数。*/
                 FLensDistortionUVGenerationPS(const ShaderMetaType::CompiledShaderInitializerType& Initializer)
                     :FLensDistortionUVGenerationShader(Initializer)
                 { }
             };
    
             IMPLEMENT_SHADER_TYPE(, FLensDistortionUVGenerationVS, TEXT("/Plugin/Foo/Private/MyShader.usf"), TEXT("MainVS"), SF_Vertex)
             IMPLEMENT_SHADER_TYPE(, FLensDistortionUVGenerationPS, TEXT("/Plugin/Foo/Private/MyShader.usf"), TEXT("MainPS"), SF_Pixel)
    
             static void DrawUVDisplacementToRenderTarget_RenderThread(
                 FRHICommandListImmediate& RHICmdList,
                 const FCompiledCameraModel& CompiledCameraModel,
                 const FName& TextureRenderTargetName,
                 FTextureRenderTargetResource* OutTextureRenderTargetResource,
                 ERHIFeatureLevel::Type FeatureLevel)
             {
                 check(IsInRenderingThread());
    
             #if WANTS_DRAW_MESH_EVENTS
                 FString EventName;
                 TextureRenderTargetName.ToString(EventName);
                 SCOPED_DRAW_EVENTF(RHICmdList, SceneCapture, TEXT("LensDistortionDisplacementGeneration %s"), *EventName);
             #else
                 SCOPED_DRAW_EVENT(RHICmdList, DrawUVDisplacementToRenderTarget_RenderThread);
             #endif
    
                 // 设置渲染目标
                 SetRenderTarget(
                     RHICmdList,
                     OutTextureRenderTargetResource->GetRenderTargetTexture(),
                     FTextureRHIRef(),
                     ESimpleRenderTargetMode::EUninitializedColorAndDepth,
                     FExclusiveDepthStencil::DepthNop_StencilNop);
    
                 FIntPoint DisplacementMapResolution(OutTextureRenderTargetResource->GetSizeX(), OutTextureRenderTargetResource->GetSizeY());
    
                 // 更新视口。
                 RHICmdList.SetViewport(
                     0, 0, 0.f,
                     DisplacementMapResolution.X, DisplacementMapResolution.Y, 1.f);
    
                 // 获取着色器。
                 TShaderMap<FGlobalShaderType>* GlobalShaderMap = GetGlobalShaderMap(FeatureLevel);
                 TShaderMapRef< FLensDistortionUVGenerationVS > VertexShader(GlobalShaderMap);
                 TShaderMapRef< FLensDistortionUVGenerationPS > PixelShader(GlobalShaderMap);
    
                 // 设置图像管线状态。
                 FGraphicsPipelineStateInitializer GraphicsPSOInit;
                 RHICmdList.ApplyCachedRenderTargets(GraphicsPSOInit);
                 GraphicsPSOInit.DepthStencilState = TStaticDepthStencilState<false, CF_Always>::GetRHI();
                 GraphicsPSOInit.BlendState = TStaticBlendState<>::GetRHI();
                 GraphicsPSOInit.RasterizerState = TStaticRasterizerState<>::GetRHI();
                 GraphicsPSOInit.PrimitiveType = PT_TriangleList;
                 GraphicsPSOInit.BoundShaderState.VertexDeclarationRHI = GetVertexDeclarationFVector4();
                 GraphicsPSOInit.BoundShaderState.VertexShaderRHI = GETSAFERHISHADER_VERTEX(*VertexShader);
                 GraphicsPSOInit.BoundShaderState.PixelShaderRHI = GETSAFERHISHADER_PIXEL(*PixelShader);
                 SetGraphicsPipelineState(RHICmdList, GraphicsPSOInit);
    
                 // 更新视口。
                 RHICmdList.SetViewport(
                     0, 0, 0.f,
                     OutTextureRenderTargetResource->GetSizeX(), OutTextureRenderTargetResource->GetSizeY(), 1.f);
    
                 // 更新着色器的统一参数。
                 VertexShader->SetParameters(RHICmdList, VertexShader->GetVertexShader(), CompiledCameraModel, DisplacementMapResolution);
                 PixelShader->SetParameters(RHICmdList, PixelShader->GetPixelShader(), CompiledCameraModel, DisplacementMapResolution);
    
                 // 绘制网格。
                 uint32 PrimitiveCount = kGridSubdivisionX * kGridSubdivisionY * 2;
                 RHICmdList.DrawPrimitive(PT_TriangleList, 0, PrimitiveCount, 1);
    
                 // 解析渲染目标。
                 RHICmdList.CopyToResolveTarget(
                     OutTextureRenderTargetResource->GetRenderTargetTexture(),
                     OutTextureRenderTargetResource->TextureRHI,
                     false, FResolveParams());
             }
    
             FVector2D FFooCameraModel::UndistortNormalizedViewPosition(FVector2D EngineV) const
             {
                 // 引擎视图空间 -> 标准视图空间。
                 FVector2D V = FVector2D(1, -1) * EngineV;
    
                 FVector2D V2 = V * V;
                 float R2 = V2.X + V2.Y;
    
                 // 径向变形（额外添加括号是为匹配 MF_Undistortion.uasset）。
                 FVector2D UndistortedV = V * (1.0 + (R2 * K1 + (R2 * R2) * K2 + (R2 * R2 * R2) * K3));
    
                 // 切向变形。
                 UndistortedV.X += P2 * (R2 + 2 * V2.X) + 2 * P1 * V.X * V.Y;
                 UndistortedV.Y += P1 * (R2 + 2 * V2.Y) + 2 * P2 * V.X * V.Y;
    
                 // 返回引擎V。
                 return UndistortedV * FVector2D(1, -1);
             }
    
             /** 编译相机模型。*/
             float FFooCameraModel::GetUndistortOverscanFactor(
                 float DistortedHorizontalFOV, float DistortedAspectRatio) const
             {
                 // 如光学变形模型为同一，则会及早返回1。
                 if (*this == FFooCameraModel())
                 {
                     return 1.0f;
                 }
    
                 float TanHalfDistortedHorizontalFOV = FMath::Tan(DistortedHorizontalFOV * 0.5f);
    
                 // 获取变形视口UV坐标系统中不同关键点在z'=1处视图空间中所处的位置。
                 // 这非常近似于知晓未变形视口所需的过扫描缩放因子，但在实际操作中效果极佳。
                 //
                 //  视图空间中未变形UV位置：
                 //                 ^ 视图空间的Y轴
                 //                 |
                 //        0        1        2
                 //
                 //        7        0        3 --> 视图空间的X轴
                 //
                 //        6        5        4
                 FVector2D UndistortCornerPos0 = LensUndistortViewportUVIntoViewSpace(
                     *this, TanHalfDistortedHorizontalFOV, DistortedAspectRatio, FVector2D(0.0f, 0.0f));
                 FVector2D UndistortCornerPos1 = LensUndistortViewportUVIntoViewSpace(
                     *this, TanHalfDistortedHorizontalFOV, DistortedAspectRatio, FVector2D(0.5f, 0.0f));
                 FVector2D UndistortCornerPos2 = LensUndistortViewportUVIntoViewSpace(
                     *this, TanHalfDistortedHorizontalFOV, DistortedAspectRatio, FVector2D(1.0f, 0.0f));
                 FVector2D UndistortCornerPos3 = LensUndistortViewportUVIntoViewSpace(
                     *this, TanHalfDistortedHorizontalFOV, DistortedAspectRatio, FVector2D(1.0f, 0.5f));
                 FVector2D UndistortCornerPos4 = LensUndistortViewportUVIntoViewSpace(
                     *this, TanHalfDistortedHorizontalFOV, DistortedAspectRatio, FVector2D(1.0f, 1.0f));
                 FVector2D UndistortCornerPos5 = LensUndistortViewportUVIntoViewSpace(
                     *this, TanHalfDistortedHorizontalFOV, DistortedAspectRatio, FVector2D(0.5f, 1.0f));
                 FVector2D UndistortCornerPos6 = LensUndistortViewportUVIntoViewSpace(
                     *this, TanHalfDistortedHorizontalFOV, DistortedAspectRatio, FVector2D(0.0f, 1.0f));
                 FVector2D UndistortCornerPos7 = LensUndistortViewportUVIntoViewSpace(
                     *this, TanHalfDistortedHorizontalFOV, DistortedAspectRatio, FVector2D(0.0f, 0.5f));
    
                 // 寻找z'=1处视图空间中未变形视口的内方最大与最小值。
                 FVector2D MinInnerViewportRect;
                 FVector2D MaxInnerViewportRect;
                 MinInnerViewportRect.X = FMath::Max3(UndistortCornerPos0.X, UndistortCornerPos6.X, UndistortCornerPos7.X);
                 MinInnerViewportRect.Y = FMath::Max3(UndistortCornerPos4.Y, UndistortCornerPos5.Y, UndistortCornerPos6.Y);
                 MaxInnerViewportRect.X = FMath::Min3(UndistortCornerPos2.X, UndistortCornerPos3.X, UndistortCornerPos4.X);
                 MaxInnerViewportRect.Y = FMath::Min3(UndistortCornerPos0.Y, UndistortCornerPos1.Y, UndistortCornerPos2.Y);
    
                 check(MinInnerViewportRect.X < 0.f);
                 check(MinInnerViewportRect.Y < 0.f);
                 check(MaxInnerViewportRect.X > 0.f);
                 check(MaxInnerViewportRect.Y > 0.f);
    
                 // 计算正切（VerticalFOV * 0.5）
                 float TanHalfDistortedVerticalFOV = TanHalfDistortedHorizontalFOV / DistortedAspectRatio;
    
                 // 计算各轴上所需的未变形视口比例。
                 FVector2D ViewportScaleUpFactorPerViewAxis = 0.5 * FVector2D(
                     TanHalfDistortedHorizontalFOV / FMath::Max(-MinInnerViewportRect.X, MaxInnerViewportRect.X),
                     TanHalfDistortedVerticalFOV / FMath::Max(-MinInnerViewportRect.Y, MaxInnerViewportRect.Y));
    
                 // 将视图空间中未变形视口尺寸调大2%，
                 // 即可解决奇数未变形位置在切向
                 // 桶状光学变形中并不为最小的问题。
                 const float ViewportScaleUpConstMultiplier = 1.02f;
                 return FMath::Max(ViewportScaleUpFactorPerViewAxis.X, ViewportScaleUpFactorPerViewAxis.Y) * ViewportScaleUpConstMultiplier;
             }
    
             void FFooCameraModel::DrawUVDisplacementToRenderTarget(
                 UWorld* World,
                 float DistortedHorizontalFOV,
                 float DistortedAspectRatio,
                 float UndistortOverscanFactor,
                 UTextureRenderTarget2D* OutputRenderTarget,
                 float OutputMultiply,
                 float OutputAdd) const
             {
                 check(IsInGameThread());
    
                 // 编译相机模型，以了解过扫描比例因子。
                 float TanHalfUndistortedHorizontalFOV = FMath::Tan(DistortedHorizontalFOV * 0.5f) * UndistortOverscanFactor;
                 float TanHalfUndistortedVerticalFOV = TanHalfUndistortedHorizontalFOV / DistortedAspectRatio;
    
                 // 输出。
                 FCompiledCameraModel CompiledCameraModel;
                 CompiledCameraModel.OriginalCameraModel = *this;
    
                 CompiledCameraModel.DistortedCameraMatrix.X = 1.0f / TanHalfUndistortedHorizontalFOV;
                 CompiledCameraModel.DistortedCameraMatrix.Y = 1.0f / TanHalfUndistortedVerticalFOV;
                 CompiledCameraModel.DistortedCameraMatrix.Z = 0.5f;
                 CompiledCameraModel.DistortedCameraMatrix.W = 0.5f;
    
                 CompiledCameraModel.UndistortedCameraMatrix.X = F.X;
                 CompiledCameraModel.UndistortedCameraMatrix.Y = F.Y * DistortedAspectRatio;
                 CompiledCameraModel.UndistortedCameraMatrix.Z = C.X;
                 CompiledCameraModel.UndistortedCameraMatrix.W = C.Y;
    
                 CompiledCameraModel.OutputMultiplyAndAdd.X = OutputMultiply;
                 CompiledCameraModel.OutputMultiplyAndAdd.Y = OutputAdd;
    
                 const FName TextureRenderTargetName = OutputRenderTarget->GetFName();
                 FTextureRenderTargetResource* TextureRenderTargetResource = OutputRenderTarget->GameThread_GetRenderTargetResource();
    
                 ERHIFeatureLevel::Type FeatureLevel = World->Scene->GetFeatureLevel();
    
                 ENQUEUE_RENDER_COMMAND(CaptureCommand)(
                     [CompiledCameraModel, TextureRenderTargetResource, TextureRenderTargetName, FeatureLevel](FRHICommandListImmediate& RHICmdList)
                     {
                         DrawUVDisplacementToRenderTarget_RenderThread(
                             RHICmdList,
                             CompiledCameraModel,
                             TextureRenderTargetName,
                             TextureRenderTargetResource,
                             FeatureLevel);
                     }
                 );
             }
    
    ```
    
17.  最后，在 **LensDistortionRendering.cpp** 文件中第155和156行，将以下两行代码改为指向先前新建的MyShader.USF文件。
    
    修改：
    
    -   IMPLEMENT\_SHADER\_TYPE(, FLensDistortionUVGenerationVS, TEXT("/Plugin/LensDistortion/Private/UVGeneration.usf"), TEXT("MainVS"), SF\_Vertex)
    
    为：
    
    -   IMPLEMENT\_SHADER\_TYPE(, FLensDistortionUVGenerationVS, TEXT("/Plugin/Foo/Private/MyShader.usf"), TEXT("MainVS"), SF\_Vertex)
    
    修改：
    
    -   IMPLEMENT\_SHADER\_TYPE(, FLensDistortionUVGenerationPS, TEXT("/Plugin/LensDistortion/Private/UVGeneration.usf"), TEXT("MainPS"), SF\_Pixel)
    
    为：
    
    -   IMPLEMENT\_SHADER\_TYPE(, FLensDistortionUVGenerationPS, TEXT("/Plugin/Foo/Private/MyShader.usf"), TEXT("MainPS"), SF\_Pixel)
18.  现在前往 **Foo/Source** 文件夹打开 **Foo.Build.cs** 文件，在 **Foo.Build.cs** 中的 **PublicDependencyModuleNames.AddRange** 部分下添加以下代码行：
    
    ```cpp
             PublicDependencyModuleNames.AddRange(
             new string[]
             {
                 "Core",
                 "RenderCore",
                 "ShaderCore",
                 "RHI",
                 // ... 在此处添加静态连接的其他公共依赖性 ...
             }
             );
    		
    ```
    
19.  然后在 **Foo.Build.cs** 文件中的 **PrivateDependencyModuleNames.AddRange** 部分移除 **Slate** 和 **SlateCore**。操作完成后Foo.Build.cs应如下：
    
    ```cpp
             // Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.
    		
             using UnrealBuildTool;
    		
             public class Foo :ModuleRules
             {
                 public Foo(ReadOnlyTargetRules Target) : base(Target)
                 {
                     PCHUsage = ModuleRules.PCHUsageMode.UseExplicitOrSharedPCHs;
    		
                     PublicIncludePaths.AddRange(
                         new string[] {
                             "Foo/Public"
                             // ... 在此处添加所需的公共包含路径 ...
                         }
                         );
                     PrivateIncludePaths.AddRange(
                         new string[] {
                             "Foo/Private",
                             // ... 在此处添加所需的其他私有包含路径 ...
                         }
                         );
    		
                     PublicDependencyModuleNames.AddRange(
                         new string[]
                         {
                             "Core",
                             "RenderCore",
                             "ShaderCore",
                             "RHI",
                             // ... 在此处添加静态连接的其他公共依赖性 ...
                         }
                         );
                     PrivateDependencyModuleNames.AddRange(
                         new string[]
                         {
                             "CoreUObject",
                             "Engine",
                             // ... 在此处添加静态连接的私有依赖性 ...
                         }
                         );
    		
                     DynamicallyLoadedModuleNames.AddRange(
                         new string[]
                         {
                             // ... 在此处添加模式动态加载的模式 ...
                         }
                         );
                 }
             }
    		
    ```
    
20.  重新启动项目的Visual Studio解决方案文件，并按下 **CRTL + 5** 重新编译项目。编译完成后按下 **F5** 启动虚幻引擎编辑器。
    
21.  虚幻引擎编辑器完成加载后，前往 **编辑** > **插件** 以打开 **插件** 管理器。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d90e3ee-35fa-46b3-9433-2ac6311e3dfe/ht_shadersinplugins_08.png)
22.  在Plugins管理器中向下滚动寻找 **Project** 部分，在此部分中找到插件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9601071-48a7-48bb-9dba-10f147ceb2d8/ht_shadersinplugins_09.png)
    
    如插件未启用，则点击其命名旁边的勾选框将其启用，并重启虚幻引擎编辑器。
    
23.  打开关卡蓝图，在事件图表中点击右键，在搜索框中输入 **Foo** 即可检查是否所有内容均齐备。完成后，便可看到所有项目均被添加到Foo Camera。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5071a676-c72d-4f2a-95bc-fac7c507b6a7/ht_shadersinplugins_10.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5071a676-c72d-4f2a-95bc-fac7c507b6a7/ht_shadersinplugins_10.png)
    
    点击查看大图。
    

### 最终结果

恭喜，您已成功重建和编译了虚幻引擎Lense Distortion插件的新版本。下一部分将讲述如何从蓝图调用这个新全局着色器，以及其如何对渲染目标进行变形。

## 2 - 蓝图设置

验证插件正常工作后，以下部分将说明如何使用蓝图调用全局着色器。

1.  如需查看其工作原理，在 **内容浏览器** 中右键点击并新建 **蓝图类**，以 **Actor** 作为父类，命名为 **DrawUVDisToRenderTarget**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f11b43ae-0ced-49e1-aa3c-0b3aaf36cd5f/ht_shadersinplugins_11.png)
2.  接下来，新建名为 **RT\_00** 的 **渲染目标** 和名为 **MAT\_RT** 的材质。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bd97ae5-0337-43a9-97c7-67606caaee23/ht_shadersinplugins_12.png)
3.  打开MAT\_RT材质，然后将RT\_00渲染目标添加到材质图表，将其输出连接到主材质节点上的"Base Color"输入，完成后按 **应用** 和 **保存** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1786228e-7816-40da-8606-404a74c87e3f/ht_shadersinplugins_13.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1786228e-7816-40da-8606-404a74c87e3f/ht_shadersinplugins_13.png)
    
    点击查看大图。
    
4.  接下来打开DrawUVDisToRenderTarget蓝图并将以下变量和节点创建/添加到事件图表。
    
    变量
    
    默认值
    
    K1
    
    1.0
    
    K2
    
    1.0
    
    inc
    
    1.0
    
    节点
    
    默认值
    
    W
    
    不适用
    
    S
    
    不适用
    
    Event Tick
    
    N/A
    
    Draw UVDisplacement to Render Target
    
    在视野（FOV）、高宽比（Aspect Ratio）、过扫描因子（Overscan Factor）中输入 **1**
    
    Make FooCameraModel
    
    N/A
    
    Clear Render Target 2D
    
    N/A
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3c036fc-5549-472b-b28b-0a2f79fe2c9b/ht_shadersinplugins_14.png)
5.  为简单地展示Draw UVDisplacement to Render Target节点如何对提供的渲染目标进行变形，用户需要对蓝图进行设置，使此节点上 **K1** 和 **K2** 输入中输入的值能够通过按键进行增加或减少。为完成此操作，需要在事件图表中设置节点，使其与下图相匹配：
    
    复制代码
    
    BEGIN OBJECT Begin Object Class=/Script/BlueprintGraph.K2Node\_CallFunction Name="K2Node\_CallFunction\_415" FunctionReference=(MemberParent=Class'/Script/Foo.FooBlueprintLibrary',MemberName="DrawUVDisplacementToRenderTarget") NodePosX=-320 NodePosY=320 NodeGuid=6A47664B4ECC988FD0BC3083A247DEE4 CustomProperties Pin (PinId=37A50945406550EE210602B9EDA46A00,PinName="execute",PinToolTip="\\n执行",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_CallFunction\_416 90ED15F94550FFA4BBC36CA3442B9E34,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=A229BA4C4B3AB1E96CD8FCB7337B7E81,PinName="then",PinToolTip="\\n执行",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=074FA9FC4524DDA34DE5FD9182A32C96,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinToolTip="目标\\nFoo 蓝图库对象引用",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/Foo.FooBlueprintLibrary',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultObject="/Script/Foo.Default\_\_FooBlueprintLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=E7AD9BC443D9AE707AB792B6E1B4C883,PinName="WorldContextObject",PinToolTip="场景内容物体\\n对象物体引用",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/CoreUObject.Object',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=F2AB8E6441774533823DD2A413DEF544,PinName="CameraModel",PinToolTip="相机模型\\nFoo相机模型结构（按引用）",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=ScriptStruct'/Script/Foo.FooCameraModel',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=True,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_MakeStruct\_96 9EB96E474F8D2725864D30B6ECDFF41F,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=997B44ED47F8AFC32E1E3D8D076096B4,PinName="DistortedHorizontalFOV",PinToolTip="变形水平视野\\n浮动\\n\\n变形渲染中理想的水平视野。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="1",AutogeneratedDefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=7D39B8B24ECD165F87E3AE8A7B13FA35,PinName="DistortedAspectRatio",PinToolTip="变形高宽比\\n浮动\\n\\n变形渲染中理想的高宽比。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="1",AutogeneratedDefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=FBC9F81D4E3E519A67B8DB9F8DF3EE82,PinName="UndistortOverscanFactor",PinToolTip="未变形过扫描因子\\n浮动\\n\\n未变形渲染的过扫描因子。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="1",AutogeneratedDefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=F7F38CFD47D34A5FE4DE3A9FEE2F2B82,PinName="OutputRenderTarget",PinToolTip="输出渲染目标\\n纹理渲染目标2D物体引用\\n\\n进行绘制的渲染目标。不必拥有和变形渲染相同的分辨率或高宽比。",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/Engine.TextureRenderTarget2D',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultObject="/Game/RT\_00.RT\_00",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=3EA265BD4D6E66170D25E4B760B8C4B9,PinName="OutputMultiply",PinToolTip="输出乘法\\n浮动\\n\\n应用在置换上的乘法因子。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.500000",AutogeneratedDefaultValue="0.500000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=41D4A4834F5BF73382730A915976A8AA,PinName="OutputAdd",PinToolTip="输出加法\\n浮动\\n\\n保存到输出渲染目标之前被添加到相乘置换的值。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.500000",AutogeneratedDefaultValue="0.500000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_MakeStruct Name="K2Node\_MakeStruct\_96" bMadeAfterOverridePinRemoval=True ShowPinForProperties(0)=(PropertyName="K1",PropertyFriendlyName="K1",PropertyTooltip=NSLOCTEXT("", "AAE0E1744CF690D4533F5B8735A92401", "Radial parameter #1."),CategoryName="Lens Distortion|Camera Model",bShowPin=True,bCanToggleVisibility=True,bPropertyIsCustomized=True) ShowPinForProperties(1)=(PropertyName="K2",PropertyFriendlyName="K2",PropertyTooltip=NSLOCTEXT("", "21EF07AD4C81C729E14C25902E1EC1D4", "Radial parameter #2."),CategoryName="Lens Distortion|Camera Model",bShowPin=True,bCanToggleVisibility=True,bPropertyIsCustomized=True) ShowPinForProperties(2)=(PropertyName="K3",PropertyFriendlyName="K3",PropertyTooltip=NSLOCTEXT("", "51EE62C949CD22B416EAF4932244E40C", "Radial parameter #3."),CategoryName="Lens Distortion|Camera Model",bShowPin=True,bCanToggleVisibility=True,bPropertyIsCustomized=True) ShowPinForProperties(3)=(PropertyName="P1",PropertyFriendlyName="P1",PropertyTooltip=NSLOCTEXT("", "739015D3419D714685C9AB810122ECC7", "Tangential parameter #1."),CategoryName="Lens Distortion|Camera Model",bShowPin=True,bCanToggleVisibility=True,bPropertyIsCustomized=True) ShowPinForProperties(4)=(PropertyName="P2",PropertyFriendlyName="P2",PropertyTooltip=NSLOCTEXT("", "294AD7ED4093BCA7AFBF01B8EC0C9A93", "Tangential parameter #2."),CategoryName="Lens Distortion|Camera Model",bShowPin=True,bCanToggleVisibility=True,bPropertyIsCustomized=True) ShowPinForProperties(5)=(PropertyName="F",PropertyFriendlyName="F",PropertyTooltip=NSLOCTEXT("", "A99C20144CE2EBB9DD0A62B672BE148D", "Camera matrix's Fx and Fy."),CategoryName="Lens Distortion|Camera Model",bShowPin=True,bCanToggleVisibility=True,bPropertyIsCustomized=True) ShowPinForProperties(6)=(PropertyName="C",PropertyFriendlyName="C",PropertyTooltip=NSLOCTEXT("", "68542CDC4C0F33F2FA893981BFBFAF16", "Camera matrix's Cx and Cy."),CategoryName="Lens Distortion|Camera Model",bShowPin=True,bCanToggleVisibility=True,bPropertyIsCustomized=True) StructType=ScriptStruct'/Script/Foo.FooCameraModel' NodePosX=-656 NodePosY=384 AdvancedPinDisplay=Shown NodeGuid=891CB1A843FED8C70EA3B28B103CB264 CustomProperties Pin (PinId=9EB96E474F8D2725864D30B6ECDFF41F,PinName="FooCameraModel",Direction="EGPD\_Output",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=ScriptStruct'/Script/Foo.FooCameraModel',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_CallFunction\_415 F2AB8E6441774533823DD2A413DEF544,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=2B2D8DA343819F2653E8FD8EDB5CCF2E,PinName="K1",PinFriendlyName=NSLOCTEXT("", "51FD07904E508F7CB13C93BD688F8053", "K1"),PinToolTip="K1\\n浮动\\n\\n径向参数 #1。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.000000",AutogeneratedDefaultValue="0.000000",LinkedTo=(K2Node\_VariableGet\_576 A5D1350D4684134EB5EDE0B43F3983D6,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=3704C64244726B58EC95F2A67CFF69A6,PinName="K2",PinFriendlyName=NSLOCTEXT("", "E801FDE14963B939270257AD8B050D63", "K2"),PinToolTip="K2\\n浮动\\n\\n径向参数 #2。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.000000",AutogeneratedDefaultValue="0.000000",LinkedTo=(K2Node\_VariableGet\_577 F9AAFCFC4510CDA989300C82B66FDD0A,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=6BBE5F394D044BCFCB0DE791007C3C29,PinName="K3",PinFriendlyName=NSLOCTEXT("", "23B742A84529B786D655BAA474DF093F", "K3"),PinToolTip="K3\\n浮动\\n\\n径向参数 #3。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.000000",AutogeneratedDefaultValue="0.000000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,) CustomProperties Pin (PinId=750F705D4ABB4FEC5A0E2F94FAFC71D2,PinName="P1",PinFriendlyName=NSLOCTEXT("", "12DC4DF74BEABC4D838FC1B6B6AE31D9", "P1"),PinToolTip="P1\\n浮动\\n\\nT切向参数 #1。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.000000",AutogeneratedDefaultValue="0.000000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,) CustomProperties Pin (PinId=0CC9318C424EDB349C2708B0FC278312,PinName="P2",PinFriendlyName=NSLOCTEXT("", "F697F2D046F8BCE75C362E907893C2CE", "P2"),PinToolTip="P2\\n浮动\\n\\n切向参数 #2。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.000000",AutogeneratedDefaultValue="0.000000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,) CustomProperties Pin (PinId=C1ED9647469C1C9EEB589195C808CA4F,PinName="F",PinFriendlyName=NSLOCTEXT("", "87C4A2A842A30F6626475C9B1A20B3C1", "F"),PinToolTip="F\\n向量2D结构\\n\\n相机矩阵的Fx和Fy。",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=ScriptStruct'/Script/CoreUObject.Vector2D',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="(X=1.000000,Y=1.000000)",AutogeneratedDefaultValue="(X=1.000000,Y=1.000000)",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,) CustomProperties Pin (PinId=D3F2C462415328548B3A7DB01661C58B,PinName="C",PinFriendlyName=NSLOCTEXT("", "0D0E5404467E73DD95C63F894611758E", "C"),PinToolTip="C\\n向量2D结构\\n\\n相机矩阵的Cx和Cy。",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=ScriptStruct'/Script/CoreUObject.Vector2D',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="(X=0.500000,Y=0.500000)",AutogeneratedDefaultValue="(X=0.500000,Y=0.500000)",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableGet Name="K2Node\_VariableGet\_576" VariableReference=(MemberName="K1",MemberGuid=4839CC3849FA034E4200C5930E5527BE,bSelfContext=True) NodePosX=-880 NodePosY=528 NodeGuid=9D923D8B485BDBC67AE6C49857387A19 CustomProperties Pin (PinId=A5D1350D4684134EB5EDE0B43F3983D6,PinName="K1",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_MakeStruct\_96 2B2D8DA343819F2653E8FD8EDB5CCF2E,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=855757D34C3ACB48D139749625D425A1,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableGet Name="K2Node\_VariableGet\_577" VariableReference=(MemberName="K2",MemberGuid=D895BC2A4F39BE80B8EAD096E8B7700E,bSelfContext=True) NodePosX=-880 NodePosY=576 NodeGuid=EF3CEEFE4A1744607E5ADFAAFC05FD12 CustomProperties Pin (PinId=F9AAFCFC4510CDA989300C82B66FDD0A,PinName="K2",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_MakeStruct\_96 3704C64244726B58EC95F2A67CFF69A6,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=21CD4CBD4F198D2481CD28BDE8611989,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_Event Name="K2Node\_Event\_192" EventReference=(MemberParent=Class'/Script/Engine.Actor',MemberName="ReceiveTick") bOverrideFunction=True NodePosX=-1024 NodePosY=320 NodeGuid=B7AA8C13412B9A161A352B92CA6A517B CustomProperties Pin (PinId=0946FFD548ACE53983F881B5777ABC2F,PinName="OutputDelegate",Direction="EGPD\_Output",PinType.PinCategory="delegate",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(MemberParent=Class'/Script/Engine.Actor',MemberName="ReceiveTick"),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=CF3109B747079A44B53B3DB5B51020FC,PinName="then",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_CallFunction\_416 79BFE6EF42D85E5A60B44D92A288F50C,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=42C21E7D47A3E8C35F8585A663FFBFB5,PinName="DeltaSeconds",PinToolTip="Delta Seconds\\n浮动",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_InputKey Name="K2Node\_InputKey\_192" InputKey=W NodePosX=-976 NodePosY=-161 NodeGuid=4FBA7A1249F1F885C74D75AA91AC55F2 CustomProperties Pin (PinId=0429EAAA4F3A1525226DAE8C05168835,PinName="Pressed",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_VariableSet\_384 34FD5FE0407CEFD46D3AE59501650E22,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=1AAED7B94E1848D93AC4D1A2C1FF372D,PinName="Released",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=5E9345974B5A3DDD591CC19CB2AAB597,PinName="Key",Direction="EGPD\_Output",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=ScriptStruct'/Script/InputCore.Key',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="AnyKey",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableGet Name="K2Node\_VariableGet\_578" VariableReference=(MemberName="K1",MemberGuid=4839CC3849FA034E4200C5930E5527BE,bSelfContext=True) NodePosX=-880 NodePosY=-65 NodeGuid=B4638D624BC2F7C9D6FD4588B8F3E398 CustomProperties Pin (PinId=4B8548F545AA42E5DEAA30BB788BDFD5,PinName="K1",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_288 2881016344EEA036B25198B1A2901731,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=ED52FD8B45FABD0DB36912A73E4B4A42,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_CommutativeAssociativeBinaryOperator Name="K2Node\_CommutativeAssociativeBinaryOperator\_288" bIsPureFunc=True FunctionReference=(MemberParent=Class'/Script/Engine.KismetMathLibrary',MemberName="Add\_FloatFloat") NodePosX=-736 NodePosY=-43 NodeGuid=9C35063A4FDEA57DACE141B8111FD85F CustomProperties Pin (PinId=31DA9D4E432BCD1808FA6E85CB5FAC16,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/Engine.KismetMathLibrary',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultObject="/Script/Engine.Default\_\_KismetMathLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=2881016344EEA036B25198B1A2901731,PinName="A",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_VariableGet\_578 4B8548F545AA42E5DEAA30BB788BDFD5,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=0F92D08C4BA9B44D30CBD388DA7B164C,PinName="B",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="1.000000",AutogeneratedDefaultValue="1.000000",LinkedTo=(K2Node\_VariableGet\_580 2980C241419284FB7AE273AF1E29C508,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=16B924E244A4C93A9D11E5B6D0644337,PinName="ReturnValue",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_VariableSet\_384 5F4C474943E3F540C19AB698F5128FD4,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableSet Name="K2Node\_VariableSet\_384" VariableReference=(MemberName="K1",MemberGuid=4839CC3849FA034E4200C5930E5527BE,bSelfContext=True) NodePosX=-560 NodePosY=-80 NodeGuid=193B539C4A92386BB27C14ACC1591AFE CustomProperties Pin (PinId=34FD5FE0407CEFD46D3AE59501650E22,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_InputKey\_192 0429EAAA4F3A1525226DAE8C05168835,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=4855AEC64D016016F1DBA0B7F06F6E34,PinName="then",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=5F4C474943E3F540C19AB698F5128FD4,PinName="K1",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_288 16B924E244A4C93A9D11E5B6D0644337,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=B369DA294B0EFE460125B89D37B36016,PinName="Output\_Get",PinToolTip="获取变量的值，可用于替代单独的Get节点",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=375B1D804A328D8760AD28AE350A5683,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_InputKey Name="K2Node\_InputKey\_193" InputKey=S NodePosX=-976 NodePosY=32 NodeGuid=15E31E514BEC9996A60ABB8835A76ECC CustomProperties Pin (PinId=8E7ECA29433D7EDD8DCDA9AEF8A6CAB3,PinName="Pressed",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_VariableSet\_385 34FD5FE0407CEFD46D3AE59501650E22,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=68CE8604440CA4A0CEACDFAB4483450D,PinName="Released",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=811D73054ED84FD4651E0D94C848DB85,PinName="Key",Direction="EGPD\_Output",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=ScriptStruct'/Script/InputCore.Key',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="AnyKey",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableGet Name="K2Node\_VariableGet\_579" VariableReference=(MemberName="K1",MemberGuid=4839CC3849FA034E4200C5930E5527BE,bSelfContext=True) NodePosX=-848 NodePosY=117 NodeGuid=FF6F5BDF4D0BFAF03F5310BAEDD12754 CustomProperties Pin (PinId=4B8548F545AA42E5DEAA30BB788BDFD5,PinName="K1",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_289 2881016344EEA036B25198B1A2901731,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=ED52FD8B45FABD0DB36912A73E4B4A42,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_CommutativeAssociativeBinaryOperator Name="K2Node\_CommutativeAssociativeBinaryOperator\_289" bIsPureFunc=True FunctionReference=(MemberParent=Class'/Script/Engine.KismetMathLibrary',MemberName="Add\_FloatFloat") NodePosX=-688 NodePosY=133 NodeGuid=B6EF6E4D40028BE66750DFBFC28D5026 CustomProperties Pin (PinId=31DA9D4E432BCD1808FA6E85CB5FAC16,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinToolTip="目标\\nKismet数学库引用",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/Engine.KismetMathLibrary',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultObject="/Script/Engine.Default\_\_KismetMathLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=2881016344EEA036B25198B1A2901731,PinName="A",PinToolTip="A\\n浮动",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_VariableGet\_579 4B8548F545AA42E5DEAA30BB788BDFD5,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=0F92D08C4BA9B44D30CBD388DA7B164C,PinName="B",PinToolTip="B\\n浮动",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="1.000000",AutogeneratedDefaultValue="1.000000",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_290 783E07954DAB142BA4459BA53C394344,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=16B924E244A4C93A9D11E5B6D0644337,PinName="ReturnValue",PinToolTip="返回值\\n浮动",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_VariableSet\_385 5F4C474943E3F540C19AB698F5128FD4,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableSet Name="K2Node\_VariableSet\_385" VariableReference=(MemberName="K1",MemberGuid=4839CC3849FA034E4200C5930E5527BE,bSelfContext=True) NodePosX=-512 NodePosY=96 NodeGuid=2D13E4BF4CB4A7FC1523E1AE69AA90A3 CustomProperties Pin (PinId=34FD5FE0407CEFD46D3AE59501650E22,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_InputKey\_193 8E7ECA29433D7EDD8DCDA9AEF8A6CAB3,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=4855AEC64D016016F1DBA0B7F06F6E34,PinName="then",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=5F4C474943E3F540C19AB698F5128FD4,PinName="K1",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_289 16B924E244A4C93A9D11E5B6D0644337,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=B369DA294B0EFE460125B89D37B36016,PinName="Output\_Get",PinToolTip="获取变量的值，可用于替代单独的Get节点",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=375B1D804A328D8760AD28AE350A5683,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableGet Name="K2Node\_VariableGet\_580" VariableReference=(MemberName="inc",MemberGuid=4884B3C94FC8DF3C61FE879F885C0513,bSelfContext=True) NodePosX=-880 NodePosY=-1 NodeGuid=04CFCC974D09F5C39905CC92FE6A1713 CustomProperties Pin (PinId=2980C241419284FB7AE273AF1E29C508,PinName="inc",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_288 0F92D08C4BA9B44D30CBD388DA7B164C,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=F03E9DF14235EE0A66DA7A8AE9CCEC0A,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableGet Name="K2Node\_VariableGet\_581" VariableReference=(MemberName="inc",MemberGuid=4884B3C94FC8DF3C61FE879F885C0513,bSelfContext=True) NodePosX=-1024 NodePosY=165 NodeGuid=0EB1B27D4A04A1C09B751CA82FBE119E CustomProperties Pin (PinId=3A16050E455FC2A7B8753280F3B3A49F,PinName="inc",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_290 A361B639411834B96FE764A2D4906668,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=B918EB1D428E95863AB5D7B814A3BB9E,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_CommutativeAssociativeBinaryOperator Name="K2Node\_CommutativeAssociativeBinaryOperator\_290" bIsPureFunc=True FunctionReference=(MemberParent=Class'/Script/Engine.KismetMathLibrary',MemberName="Multiply\_FloatFloat") NodePosX=-848 NodePosY=168 NodeGuid=BDAB4F194B50AE675B4401BB9D6C8C39 CustomProperties Pin (PinId=3FDEE1EC4FC5966307A607902689EAEB,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/Engine.KismetMathLibrary',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultObject="/Script/Engine.Default\_\_KismetMathLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=A361B639411834B96FE764A2D4906668,PinName="A",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_VariableGet\_581 3A16050E455FC2A7B8753280F3B3A49F,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=BC525A6F442150954DE5E5BEE36BC24A,PinName="B",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="-1",AutogeneratedDefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=783E07954DAB142BA4459BA53C394344,PinName="ReturnValue",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_289 0F92D08C4BA9B44D30CBD388DA7B164C,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_CallFunction Name="K2Node\_CallFunction\_416" FunctionReference=(MemberParent=Class'/Script/Engine.KismetRenderingLibrary',MemberName="ClearRenderTarget2D") NodePosX=-880 NodePosY=320 NodeGuid=FE0330D94D3366BD6864BDB61EE7936C CustomProperties Pin (PinId=79BFE6EF42D85E5A60B44D92A288F50C,PinName="execute",PinToolTip="\\n执行",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_Event\_192 CF3109B747079A44B53B3DB5B51020FC,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=90ED15F94550FFA4BBC36CA3442B9E34,PinName="then",PinToolTip="\\n执行",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_CallFunction\_415 37A50945406550EE210602B9EDA46A00,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=701455F543533B934DAD6D9724A33137,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinToolTip="目标\\nKismet 渲染库对象引用",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/Engine.KismetRenderingLibrary',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultObject="/Script/Engine.Default\_\_KismetRenderingLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=0410B7A34146C336929C98820F4C4F9A,PinName="WorldContextObject",PinToolTip="场景内容物体\\n对象物体引用",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/CoreUObject.Object',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=BC869BDB4035291D58A4F5BCF647E7BC,PinName="TextureRenderTarget",PinToolTip="纹理渲染目标\\n纹理渲染目标2D对象引用",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/Engine.TextureRenderTarget2D',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultObject="/Game/RT\_00.RT\_00",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=B131BC83400BC3963FBF45A829987EA1,PinName="ClearColor",PinToolTip="清楚颜色\\n线性颜色结构",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=ScriptStruct'/Script/CoreUObject.LinearColor',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="(R=0.000000,G=0.000000,B=0.000000,A=1.000000)",AutogeneratedDefaultValue="(R=0.000000,G=0.000000,B=0.000000,A=1.000000)",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/UnrealEd.EdGraphNode\_Comment Name="EdGraphNode\_Comment\_5" NodePosX=-1048 NodePosY=-222 NodeWidth=688 NodeHeight=480 NodeComment="增加（W）或降低（S）UV置换" NodeGuid=F9DBA6D24A88AC009B27B0A979C22582 End Object Begin Object Class=/Script/UnrealEd.EdGraphNode\_Comment Name="EdGraphNode\_Comment\_3" NodePosX=-1056 NodePosY=272 NodeWidth=1088 NodeHeight=400 NodeComment="确保仅绘制最新K1和K2输入值" NodeGuid=8A0F32874A5E6677357A34A938594544 End Object END OBJECT
    
    BEGIN OBJECT Begin Object Class=/Script/BlueprintGraph.K2Node\_CallFunction Name="K2Node\_CallFunction\_415" FunctionReference=(MemberParent=Class'/Script/Foo.FooBlueprintLibrary',MemberName="DrawUVDisplacementToRenderTarget") NodePosX=-320 NodePosY=320 NodeGuid=6A47664B4ECC988FD0BC3083A247DEE4 CustomProperties Pin (PinId=37A50945406550EE210602B9EDA46A00,PinName="execute",PinToolTip="\\n执行",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_CallFunction\_416 90ED15F94550FFA4BBC36CA3442B9E34,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=A229BA4C4B3AB1E96CD8FCB7337B7E81,PinName="then",PinToolTip="\\n执行",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=074FA9FC4524DDA34DE5FD9182A32C96,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinToolTip="目标\\nFoo 蓝图库对象引用",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/Foo.FooBlueprintLibrary',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultObject="/Script/Foo.Default\_\_FooBlueprintLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=E7AD9BC443D9AE707AB792B6E1B4C883,PinName="WorldContextObject",PinToolTip="场景内容物体\\n对象物体引用",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/CoreUObject.Object',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=F2AB8E6441774533823DD2A413DEF544,PinName="CameraModel",PinToolTip="相机模型\\nFoo相机模型结构（按引用）",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=ScriptStruct'/Script/Foo.FooCameraModel',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=True,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_MakeStruct\_96 9EB96E474F8D2725864D30B6ECDFF41F,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=997B44ED47F8AFC32E1E3D8D076096B4,PinName="DistortedHorizontalFOV",PinToolTip="变形水平视野\\n浮动\\n\\n变形渲染中理想的水平视野。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="1",AutogeneratedDefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=7D39B8B24ECD165F87E3AE8A7B13FA35,PinName="DistortedAspectRatio",PinToolTip="变形高宽比\\n浮动\\n\\n变形渲染中理想的高宽比。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="1",AutogeneratedDefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=FBC9F81D4E3E519A67B8DB9F8DF3EE82,PinName="UndistortOverscanFactor",PinToolTip="未变形过扫描因子\\n浮动\\n\\n未变形渲染的过扫描因子。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="1",AutogeneratedDefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=F7F38CFD47D34A5FE4DE3A9FEE2F2B82,PinName="OutputRenderTarget",PinToolTip="输出渲染目标\\n纹理渲染目标2D物体引用\\n\\n进行绘制的渲染目标。不必拥有和变形渲染相同的分辨率或高宽比。",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/Engine.TextureRenderTarget2D',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultObject="/Game/RT\_00.RT\_00",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=3EA265BD4D6E66170D25E4B760B8C4B9,PinName="OutputMultiply",PinToolTip="输出乘法\\n浮动\\n\\n应用在置换上的乘法因子。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.500000",AutogeneratedDefaultValue="0.500000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=41D4A4834F5BF73382730A915976A8AA,PinName="OutputAdd",PinToolTip="输出加法\\n浮动\\n\\n保存到输出渲染目标之前被添加到相乘置换的值。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.500000",AutogeneratedDefaultValue="0.500000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_MakeStruct Name="K2Node\_MakeStruct\_96" bMadeAfterOverridePinRemoval=True ShowPinForProperties(0)=(PropertyName="K1",PropertyFriendlyName="K1",PropertyTooltip=NSLOCTEXT("", "AAE0E1744CF690D4533F5B8735A92401", "Radial parameter #1."),CategoryName="Lens Distortion|Camera Model",bShowPin=True,bCanToggleVisibility=True,bPropertyIsCustomized=True) ShowPinForProperties(1)=(PropertyName="K2",PropertyFriendlyName="K2",PropertyTooltip=NSLOCTEXT("", "21EF07AD4C81C729E14C25902E1EC1D4", "Radial parameter #2."),CategoryName="Lens Distortion|Camera Model",bShowPin=True,bCanToggleVisibility=True,bPropertyIsCustomized=True) ShowPinForProperties(2)=(PropertyName="K3",PropertyFriendlyName="K3",PropertyTooltip=NSLOCTEXT("", "51EE62C949CD22B416EAF4932244E40C", "Radial parameter #3."),CategoryName="Lens Distortion|Camera Model",bShowPin=True,bCanToggleVisibility=True,bPropertyIsCustomized=True) ShowPinForProperties(3)=(PropertyName="P1",PropertyFriendlyName="P1",PropertyTooltip=NSLOCTEXT("", "739015D3419D714685C9AB810122ECC7", "Tangential parameter #1."),CategoryName="Lens Distortion|Camera Model",bShowPin=True,bCanToggleVisibility=True,bPropertyIsCustomized=True) ShowPinForProperties(4)=(PropertyName="P2",PropertyFriendlyName="P2",PropertyTooltip=NSLOCTEXT("", "294AD7ED4093BCA7AFBF01B8EC0C9A93", "Tangential parameter #2."),CategoryName="Lens Distortion|Camera Model",bShowPin=True,bCanToggleVisibility=True,bPropertyIsCustomized=True) ShowPinForProperties(5)=(PropertyName="F",PropertyFriendlyName="F",PropertyTooltip=NSLOCTEXT("", "A99C20144CE2EBB9DD0A62B672BE148D", "Camera matrix's Fx and Fy."),CategoryName="Lens Distortion|Camera Model",bShowPin=True,bCanToggleVisibility=True,bPropertyIsCustomized=True) ShowPinForProperties(6)=(PropertyName="C",PropertyFriendlyName="C",PropertyTooltip=NSLOCTEXT("", "68542CDC4C0F33F2FA893981BFBFAF16", "Camera matrix's Cx and Cy."),CategoryName="Lens Distortion|Camera Model",bShowPin=True,bCanToggleVisibility=True,bPropertyIsCustomized=True) StructType=ScriptStruct'/Script/Foo.FooCameraModel' NodePosX=-656 NodePosY=384 AdvancedPinDisplay=Shown NodeGuid=891CB1A843FED8C70EA3B28B103CB264 CustomProperties Pin (PinId=9EB96E474F8D2725864D30B6ECDFF41F,PinName="FooCameraModel",Direction="EGPD\_Output",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=ScriptStruct'/Script/Foo.FooCameraModel',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_CallFunction\_415 F2AB8E6441774533823DD2A413DEF544,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=2B2D8DA343819F2653E8FD8EDB5CCF2E,PinName="K1",PinFriendlyName=NSLOCTEXT("", "51FD07904E508F7CB13C93BD688F8053", "K1"),PinToolTip="K1\\n浮动\\n\\n径向参数 #1。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.000000",AutogeneratedDefaultValue="0.000000",LinkedTo=(K2Node\_VariableGet\_576 A5D1350D4684134EB5EDE0B43F3983D6,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=3704C64244726B58EC95F2A67CFF69A6,PinName="K2",PinFriendlyName=NSLOCTEXT("", "E801FDE14963B939270257AD8B050D63", "K2"),PinToolTip="K2\\n浮动\\n\\n径向参数 #2。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.000000",AutogeneratedDefaultValue="0.000000",LinkedTo=(K2Node\_VariableGet\_577 F9AAFCFC4510CDA989300C82B66FDD0A,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=6BBE5F394D044BCFCB0DE791007C3C29,PinName="K3",PinFriendlyName=NSLOCTEXT("", "23B742A84529B786D655BAA474DF093F", "K3"),PinToolTip="K3\\n浮动\\n\\n径向参数 #3。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.000000",AutogeneratedDefaultValue="0.000000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,) CustomProperties Pin (PinId=750F705D4ABB4FEC5A0E2F94FAFC71D2,PinName="P1",PinFriendlyName=NSLOCTEXT("", "12DC4DF74BEABC4D838FC1B6B6AE31D9", "P1"),PinToolTip="P1\\n浮动\\n\\nT切向参数 #1。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.000000",AutogeneratedDefaultValue="0.000000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,) CustomProperties Pin (PinId=0CC9318C424EDB349C2708B0FC278312,PinName="P2",PinFriendlyName=NSLOCTEXT("", "F697F2D046F8BCE75C362E907893C2CE", "P2"),PinToolTip="P2\\n浮动\\n\\n切向参数 #2。",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.000000",AutogeneratedDefaultValue="0.000000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,) CustomProperties Pin (PinId=C1ED9647469C1C9EEB589195C808CA4F,PinName="F",PinFriendlyName=NSLOCTEXT("", "87C4A2A842A30F6626475C9B1A20B3C1", "F"),PinToolTip="F\\n向量2D结构\\n\\n相机矩阵的Fx和Fy。",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=ScriptStruct'/Script/CoreUObject.Vector2D',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="(X=1.000000,Y=1.000000)",AutogeneratedDefaultValue="(X=1.000000,Y=1.000000)",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,) CustomProperties Pin (PinId=D3F2C462415328548B3A7DB01661C58B,PinName="C",PinFriendlyName=NSLOCTEXT("", "0D0E5404467E73DD95C63F894611758E", "C"),PinToolTip="C\\n向量2D结构\\n\\n相机矩阵的Cx和Cy。",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=ScriptStruct'/Script/CoreUObject.Vector2D',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="(X=0.500000,Y=0.500000)",AutogeneratedDefaultValue="(X=0.500000,Y=0.500000)",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableGet Name="K2Node\_VariableGet\_576" VariableReference=(MemberName="K1",MemberGuid=4839CC3849FA034E4200C5930E5527BE,bSelfContext=True) NodePosX=-880 NodePosY=528 NodeGuid=9D923D8B485BDBC67AE6C49857387A19 CustomProperties Pin (PinId=A5D1350D4684134EB5EDE0B43F3983D6,PinName="K1",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_MakeStruct\_96 2B2D8DA343819F2653E8FD8EDB5CCF2E,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=855757D34C3ACB48D139749625D425A1,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableGet Name="K2Node\_VariableGet\_577" VariableReference=(MemberName="K2",MemberGuid=D895BC2A4F39BE80B8EAD096E8B7700E,bSelfContext=True) NodePosX=-880 NodePosY=576 NodeGuid=EF3CEEFE4A1744607E5ADFAAFC05FD12 CustomProperties Pin (PinId=F9AAFCFC4510CDA989300C82B66FDD0A,PinName="K2",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_MakeStruct\_96 3704C64244726B58EC95F2A67CFF69A6,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=21CD4CBD4F198D2481CD28BDE8611989,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_Event Name="K2Node\_Event\_192" EventReference=(MemberParent=Class'/Script/Engine.Actor',MemberName="ReceiveTick") bOverrideFunction=True NodePosX=-1024 NodePosY=320 NodeGuid=B7AA8C13412B9A161A352B92CA6A517B CustomProperties Pin (PinId=0946FFD548ACE53983F881B5777ABC2F,PinName="OutputDelegate",Direction="EGPD\_Output",PinType.PinCategory="delegate",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(MemberParent=Class'/Script/Engine.Actor',MemberName="ReceiveTick"),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=CF3109B747079A44B53B3DB5B51020FC,PinName="then",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_CallFunction\_416 79BFE6EF42D85E5A60B44D92A288F50C,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=42C21E7D47A3E8C35F8585A663FFBFB5,PinName="DeltaSeconds",PinToolTip="Delta Seconds\\n浮动",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_InputKey Name="K2Node\_InputKey\_192" InputKey=W NodePosX=-976 NodePosY=-161 NodeGuid=4FBA7A1249F1F885C74D75AA91AC55F2 CustomProperties Pin (PinId=0429EAAA4F3A1525226DAE8C05168835,PinName="Pressed",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_VariableSet\_384 34FD5FE0407CEFD46D3AE59501650E22,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=1AAED7B94E1848D93AC4D1A2C1FF372D,PinName="Released",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=5E9345974B5A3DDD591CC19CB2AAB597,PinName="Key",Direction="EGPD\_Output",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=ScriptStruct'/Script/InputCore.Key',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="AnyKey",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableGet Name="K2Node\_VariableGet\_578" VariableReference=(MemberName="K1",MemberGuid=4839CC3849FA034E4200C5930E5527BE,bSelfContext=True) NodePosX=-880 NodePosY=-65 NodeGuid=B4638D624BC2F7C9D6FD4588B8F3E398 CustomProperties Pin (PinId=4B8548F545AA42E5DEAA30BB788BDFD5,PinName="K1",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_288 2881016344EEA036B25198B1A2901731,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=ED52FD8B45FABD0DB36912A73E4B4A42,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_CommutativeAssociativeBinaryOperator Name="K2Node\_CommutativeAssociativeBinaryOperator\_288" bIsPureFunc=True FunctionReference=(MemberParent=Class'/Script/Engine.KismetMathLibrary',MemberName="Add\_FloatFloat") NodePosX=-736 NodePosY=-43 NodeGuid=9C35063A4FDEA57DACE141B8111FD85F CustomProperties Pin (PinId=31DA9D4E432BCD1808FA6E85CB5FAC16,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/Engine.KismetMathLibrary',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultObject="/Script/Engine.Default\_\_KismetMathLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=2881016344EEA036B25198B1A2901731,PinName="A",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_VariableGet\_578 4B8548F545AA42E5DEAA30BB788BDFD5,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=0F92D08C4BA9B44D30CBD388DA7B164C,PinName="B",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="1.000000",AutogeneratedDefaultValue="1.000000",LinkedTo=(K2Node\_VariableGet\_580 2980C241419284FB7AE273AF1E29C508,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=16B924E244A4C93A9D11E5B6D0644337,PinName="ReturnValue",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_VariableSet\_384 5F4C474943E3F540C19AB698F5128FD4,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableSet Name="K2Node\_VariableSet\_384" VariableReference=(MemberName="K1",MemberGuid=4839CC3849FA034E4200C5930E5527BE,bSelfContext=True) NodePosX=-560 NodePosY=-80 NodeGuid=193B539C4A92386BB27C14ACC1591AFE CustomProperties Pin (PinId=34FD5FE0407CEFD46D3AE59501650E22,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_InputKey\_192 0429EAAA4F3A1525226DAE8C05168835,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=4855AEC64D016016F1DBA0B7F06F6E34,PinName="then",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=5F4C474943E3F540C19AB698F5128FD4,PinName="K1",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_288 16B924E244A4C93A9D11E5B6D0644337,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=B369DA294B0EFE460125B89D37B36016,PinName="Output\_Get",PinToolTip="获取变量的值，可用于替代单独的Get节点",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=375B1D804A328D8760AD28AE350A5683,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_InputKey Name="K2Node\_InputKey\_193" InputKey=S NodePosX=-976 NodePosY=32 NodeGuid=15E31E514BEC9996A60ABB8835A76ECC CustomProperties Pin (PinId=8E7ECA29433D7EDD8DCDA9AEF8A6CAB3,PinName="Pressed",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_VariableSet\_385 34FD5FE0407CEFD46D3AE59501650E22,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=68CE8604440CA4A0CEACDFAB4483450D,PinName="Released",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=811D73054ED84FD4651E0D94C848DB85,PinName="Key",Direction="EGPD\_Output",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=ScriptStruct'/Script/InputCore.Key',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="AnyKey",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableGet Name="K2Node\_VariableGet\_579" VariableReference=(MemberName="K1",MemberGuid=4839CC3849FA034E4200C5930E5527BE,bSelfContext=True) NodePosX=-848 NodePosY=117 NodeGuid=FF6F5BDF4D0BFAF03F5310BAEDD12754 CustomProperties Pin (PinId=4B8548F545AA42E5DEAA30BB788BDFD5,PinName="K1",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_289 2881016344EEA036B25198B1A2901731,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=ED52FD8B45FABD0DB36912A73E4B4A42,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_CommutativeAssociativeBinaryOperator Name="K2Node\_CommutativeAssociativeBinaryOperator\_289" bIsPureFunc=True FunctionReference=(MemberParent=Class'/Script/Engine.KismetMathLibrary',MemberName="Add\_FloatFloat") NodePosX=-688 NodePosY=133 NodeGuid=B6EF6E4D40028BE66750DFBFC28D5026 CustomProperties Pin (PinId=31DA9D4E432BCD1808FA6E85CB5FAC16,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinToolTip="目标\\nKismet数学库引用",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/Engine.KismetMathLibrary',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultObject="/Script/Engine.Default\_\_KismetMathLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=2881016344EEA036B25198B1A2901731,PinName="A",PinToolTip="A\\n浮动",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_VariableGet\_579 4B8548F545AA42E5DEAA30BB788BDFD5,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=0F92D08C4BA9B44D30CBD388DA7B164C,PinName="B",PinToolTip="B\\n浮动",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="1.000000",AutogeneratedDefaultValue="1.000000",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_290 783E07954DAB142BA4459BA53C394344,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=16B924E244A4C93A9D11E5B6D0644337,PinName="ReturnValue",PinToolTip="返回值\\n浮动",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_VariableSet\_385 5F4C474943E3F540C19AB698F5128FD4,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableSet Name="K2Node\_VariableSet\_385" VariableReference=(MemberName="K1",MemberGuid=4839CC3849FA034E4200C5930E5527BE,bSelfContext=True) NodePosX=-512 NodePosY=96 NodeGuid=2D13E4BF4CB4A7FC1523E1AE69AA90A3 CustomProperties Pin (PinId=34FD5FE0407CEFD46D3AE59501650E22,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_InputKey\_193 8E7ECA29433D7EDD8DCDA9AEF8A6CAB3,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=4855AEC64D016016F1DBA0B7F06F6E34,PinName="then",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=5F4C474943E3F540C19AB698F5128FD4,PinName="K1",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_289 16B924E244A4C93A9D11E5B6D0644337,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=B369DA294B0EFE460125B89D37B36016,PinName="Output\_Get",PinToolTip="获取变量的值，可用于替代单独的Get节点",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=375B1D804A328D8760AD28AE350A5683,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableGet Name="K2Node\_VariableGet\_580" VariableReference=(MemberName="inc",MemberGuid=4884B3C94FC8DF3C61FE879F885C0513,bSelfContext=True) NodePosX=-880 NodePosY=-1 NodeGuid=04CFCC974D09F5C39905CC92FE6A1713 CustomProperties Pin (PinId=2980C241419284FB7AE273AF1E29C508,PinName="inc",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_288 0F92D08C4BA9B44D30CBD388DA7B164C,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=F03E9DF14235EE0A66DA7A8AE9CCEC0A,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_VariableGet Name="K2Node\_VariableGet\_581" VariableReference=(MemberName="inc",MemberGuid=4884B3C94FC8DF3C61FE879F885C0513,bSelfContext=True) NodePosX=-1024 NodePosY=165 NodeGuid=0EB1B27D4A04A1C09B751CA82FBE119E CustomProperties Pin (PinId=3A16050E455FC2A7B8753280F3B3A49F,PinName="inc",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_290 A361B639411834B96FE764A2D4906668,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=B918EB1D428E95863AB5D7B814A3BB9E,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=BlueprintGeneratedClass'/Game/DrawUVDisToRenderTarget.DrawUVDisToRenderTarget\_C',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_CommutativeAssociativeBinaryOperator Name="K2Node\_CommutativeAssociativeBinaryOperator\_290" bIsPureFunc=True FunctionReference=(MemberParent=Class'/Script/Engine.KismetMathLibrary',MemberName="Multiply\_FloatFloat") NodePosX=-848 NodePosY=168 NodeGuid=BDAB4F194B50AE675B4401BB9D6C8C39 CustomProperties Pin (PinId=3FDEE1EC4FC5966307A607902689EAEB,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/Engine.KismetMathLibrary',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultObject="/Script/Engine.Default\_\_KismetMathLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=A361B639411834B96FE764A2D4906668,PinName="A",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_VariableGet\_581 3A16050E455FC2A7B8753280F3B3A49F,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=BC525A6F442150954DE5E5BEE36BC24A,PinName="B",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="-1",AutogeneratedDefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=783E07954DAB142BA4459BA53C394344,PinName="ReturnValue",Direction="EGPD\_Output",PinType.PinCategory="float",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="0.0",AutogeneratedDefaultValue="0.0",LinkedTo=(K2Node\_CommutativeAssociativeBinaryOperator\_289 0F92D08C4BA9B44D30CBD388DA7B164C,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/BlueprintGraph.K2Node\_CallFunction Name="K2Node\_CallFunction\_416" FunctionReference=(MemberParent=Class'/Script/Engine.KismetRenderingLibrary',MemberName="ClearRenderTarget2D") NodePosX=-880 NodePosY=320 NodeGuid=FE0330D94D3366BD6864BDB61EE7936C CustomProperties Pin (PinId=79BFE6EF42D85E5A60B44D92A288F50C,PinName="execute",PinToolTip="\\n执行",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_Event\_192 CF3109B747079A44B53B3DB5B51020FC,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=90ED15F94550FFA4BBC36CA3442B9E34,PinName="then",PinToolTip="\\n执行",Direction="EGPD\_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,LinkedTo=(K2Node\_CallFunction\_415 37A50945406550EE210602B9EDA46A00,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=701455F543533B934DAD6D9724A33137,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinToolTip="目标\\nKismet 渲染库对象引用",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/Engine.KismetRenderingLibrary',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultObject="/Script/Engine.Default\_\_KismetRenderingLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=0410B7A34146C336929C98820F4C4F9A,PinName="WorldContextObject",PinToolTip="场景内容物体\\n对象物体引用",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/CoreUObject.Object',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=BC869BDB4035291D58A4F5BCF647E7BC,PinName="TextureRenderTarget",PinToolTip="纹理渲染目标\\n纹理渲染目标2D对象引用",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=Class'/Script/Engine.TextureRenderTarget2D',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultObject="/Game/RT\_00.RT\_00",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=B131BC83400BC3963FBF45A829987EA1,PinName="ClearColor",PinToolTip="清楚颜色\\n线性颜色结构",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=ScriptStruct'/Script/CoreUObject.LinearColor',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsMap=False,PinType.bIsSet=False,PinType.bIsArray=False,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,DefaultValue="(R=0.000000,G=0.000000,B=0.000000,A=1.000000)",AutogeneratedDefaultValue="(R=0.000000,G=0.000000,B=0.000000,A=1.000000)",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object Begin Object Class=/Script/UnrealEd.EdGraphNode\_Comment Name="EdGraphNode\_Comment\_5" NodePosX=-1048 NodePosY=-222 NodeWidth=688 NodeHeight=480 NodeComment="增加（W）或降低（S）UV置换" NodeGuid=F9DBA6D24A88AC009B27B0A979C22582 End Object Begin Object Class=/Script/UnrealEd.EdGraphNode\_Comment Name="EdGraphNode\_Comment\_3" NodePosX=-1056 NodePosY=272 NodeWidth=1088 NodeHeight=400 NodeComment="确保仅绘制最新K1和K2输入值" NodeGuid=8A0F32874A5E6677357A34A938594544 End Object END OBJECT
    
    可直接将此蓝图代码复制粘贴到蓝图中。
    
    需要将渲染目标输入 **Output Render Target**，否则不会有效果。
    
6.  所需的蓝图逻辑设置完成后，**编译** 并 保存 **蓝图**，然后将蓝图从 **内容浏览器** 拖入 **关卡。完成后，选择蓝图，在** 输入 **下将** 自动接收输入（Auto Receive Input） **从** 禁用（Disabled） **改为** Player 0\*\*。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f0175cd-00a7-4f57-8418-15fdad4e744a/ht_shadersinplugins_16.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f0175cd-00a7-4f57-8418-15fdad4e744a/ht_shadersinplugins_16.png)
    
    点击查看大图。
    
7.  接下来选中地面，按下 **CTRL + W** 复制，然后在 **X** 轴中将其旋转 **\-90 度**，然后将材质 **MAT\_RT** 拖到其上方，即可看到Draw UVDisplacement to Render Target的效果。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f244f67f-78ff-4c3c-9a44-102adf1e6a0a/ht_shadersinplugins_17.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f244f67f-78ff-4c3c-9a44-102adf1e6a0a/ht_shadersinplugins_17.png)
    
    点击查看大图。
    
8.  所有内容设置完成后，按下 **Play** 按钮，再按下 **W** 和 **S** 键对输入Draw UVDisplacement to Render Target节点的渲染目标执行变形，效果与以下视频相似。
    

### 最终结果

此时您便已学习到如何通过蓝图对渲染目标中的内容执行变形，创建各种有趣的形状。下一步可以尝试新建一个插件，或对现有插件进行编辑，看能否创建出有趣的图像和效果。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 代码设置](/documentation/zh-cn/unreal-engine/creating-a-new-global-shader-as-a-plugin-in-unreal-engine#1-%E4%BB%A3%E7%A0%81%E8%AE%BE%E7%BD%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/creating-a-new-global-shader-as-a-plugin-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [2 - 蓝图设置](/documentation/zh-cn/unreal-engine/creating-a-new-global-shader-as-a-plugin-in-unreal-engine#2-%E8%93%9D%E5%9B%BE%E8%AE%BE%E7%BD%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/creating-a-new-global-shader-as-a-plugin-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C-2)