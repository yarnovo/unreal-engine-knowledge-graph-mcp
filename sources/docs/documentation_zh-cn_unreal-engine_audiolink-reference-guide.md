# AudioLink参考指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/audiolink-reference-guide
> 
> 生成时间: 2025-06-14T20:22:19.455Z

---

目录

![AudioLink参考指南](https://dev.epicgames.com/community/api/documentation/image/7d8b7c6f-13b4-4396-a9dd-26ab448a1c50?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

只需几行代码，再加上 `IAudioLinkFactory` 声明和注册，你就可以创建基本的 **AudioLink** 实现方案。不过，你还可以通过其他API类型进一步编译实现方案。

下文是各核心AudioLink C++类型的摘要和一些代码示例。

AudioLink源代码见 `Engine\Source\Runtime\AudioLink\` 。

## IAudioLinkFactory

所有AudioLink实现方案都需要一个从 `IAudioLinkFactory` 派生而来的工厂类，该类包含数个纯虚拟函数，定义了实现方案的进入点。

你必须逐个实现这些函数，因为返回null会导致断言。虚幻引擎（UE）要求所有调度的调用都是线程安全的，且最好为无锁，从而高效返回。

你可以使用参数结构体来代替大量的单个参数，以简化这些函数调用的拓展。

你只能注册单个工厂对象；额外工厂在启动时会引发致命错误。

### 插件实现

AudioLink使用 `IModularFeature` 接口来拓展虚幻引擎。`IAudioLinkFactory` 构造函数负责处理注册，因此要进行识别，创建一个工厂的实例就够了。请在实现方案的 `StartupModule()` 中处理此问题。

在虚幻引擎中实现插件的方法有多种，但 `IModularFeature` 接口是音频扩展最常用的接口。

### 示例：子混音AudioLink的实现方案

```cpp
// 创建子混音Audio Link时所用的参数 
struct FAudioLinkSubmixCreateArgs
{
	TWeakObjectPtr<const USoundSubmix> Submix;
	FAudioDevice* Device = nullptr;
	TWeakObjectPtr<const UAudioLinkSettingsAbstract> Settings;
};

// 创建一个子混音Audio Link。
// @param InCreateArgs 创建AudioLink实例所用的参数
// @return 新创建的链接实例（如果成功）。
virtual TUniquePtr<IAudioLink> CreateSubmixAudioLink(const FAudioLinkSubmixCreateArgs& InCreateArgs) = 0;
```

```cpp
	/**
	* 创建子混音Audio Link时所用的参数 
	*/
	struct FAudioLinkSubmixCreateArgs
	{
		TWeakObjectPtr<const USoundSubmix> Submix;
		FAudioDevice* Device = nullptr;
		TWeakObjectPtr<const UAudioLinkSettingsAbstract> Settings;
	};

	/**
	* 创建一个子混音Audio Link。
	* @param InCreateArgs 创建AudioLink实例所用的参数
	* @return 新创建的链接实例（如果成功）。
	*/
	virtual TUniquePtr<IAudioLink> CreateSubmixAudioLink(const FAudioLinkSubmixCreateArgs& InCreateArgs) = 0;
```

#### 示例：工厂实现

```cpp
	class FAudioLinkExampleFactory : public IAudioLinkFactory
	{
	public:
		FAudioLinkExampleFactory() = default;
		virtual ~FAudioLinkExampleFactory() = default;

		static FName GetFactoryNameStatic();

	protected:
		/** Begin IAudioLinkFactory */
		FName GetFactoryName() const override;
		TSubclassOf<UAudioLinkSettingsAbstract> GetSettingsClass() const override;
		TUniquePtr<IAudioLink> CreateSubmixAudioLink(const FAudioLinkSubmixCreateArgs&) override;
		TUniquePtr<IAudioLink> CreateSourceAudioLink(const FAudioLinkSourceCreateArgs&) override;
		FAudioLinkSourcePushedSharedPtr CreateSourcePushedAudioLink(const FAudioLinkSourcePushedCreateArgs&) override;
		FAudioLinkSynchronizerSharedPtr CreateSynchronizerAudioLink() override;
		/** End IAudioLinkFactory */
	};
```

## UAudioLinkSettingsAbstract

所有AudioLink实现方案都需要一个从 `UAudioLinkSettingsAbstract` 派生而来的设置类，用于创建含有相关数据的链接，比如缓冲区大小、握手和UAsset引用。

### 示例：设置实现

```cpp
	UCLASS(config = Engine, defaultconfig)
	class AUDIOLINKEXAMPLERUNTIME_API UAudioLinkSettingsExample : public UAudioLinkSettingsAbstract
	{
		GENERATED_BODY()

		UPROPERTY(Config, EditAnywhere, Category = "Example|AudioLink")
		float MyBufferSize = 1.0f;
	};

	class FAudioLinkSettingsProxyExample : public IAudioLinkSettingsProxy
	{
	public:
		FAudioLinkSettingsProxyExample(const UAudioLinkSettingsExample&);
		virtual ~FAudioLinkSettingsProxyExample() = default;

		float GetMyBufferSize() const { return MyBufferSize; }

	private:
	#if WITH_EDITOR
		void RefreshFromSettings(UAudioLinkSettingsAbstract* InSettings, FPropertyChangedEvent& InPropertyChangedEvent) override
		{	
			MyBufferSize = CastChecked<UAudioLinkSettingsExample>(InSettings)->MyBufferSize;
		}
	#endif //WITH_EDITOR

		float MyBufferSize = 0;
	};
```

## IAudioLinkSettingsProxy

AudioLink的设置项遵循代理设计的模式，因此可以安全地存在于通常执行音频的游戏线程之外。系统会创建一个线程安全的设置项副本，并将其作为共享指针附加到设置项的 `UObject` 上。

这种方法主要有两个好处。

-   提供了垃圾回收保护，因为所有存在共享指针的线程都能持续安全地运行。
-   在编辑器中进行更改时， `PostEditChangedProperty` 会自动向代理传送数据，如此一来，设置项就能像标准资产一样运行。

所有AudioLink设置资产都必须实现一份自身的代理，并在所属资产发生变化时，通过 `RefreshFromSettings` 函数处理刷新。

另外，你还需要为你的属性实现默认设置，并将其在 `DefaultEngine.ini` 中进行序列化。在"设置项实现"示例中，这一点是通过设置对象的 `defaultconfig` 标记实现的。

未设置属性时，将使用设置项的默认值，因此无需在每次创建AudioLink时都传递该值。

### UFactory实现

虚幻引擎会将AudioLink的设置项序列化为资产。因此，你需要为设置类实现资产工厂，以便创建资产。

#### 示例：标准设置项工厂实现

```cpp
	class FAssetTypeActions_AudioLinkExampleSettings : public FAssetTypeActions_Base
	{
		public:
			virtual FText GetName() const override;
			virtual FColor GetTypeColor() const override;
			virtual const TArray<FText>& GetSubMenus() const override;
			virtual UClass* GetSupportedClass() const override;
			virtual uint32 GetCategories() override;
	};

	UCLASS(hidecategories = Object, MinimalAPI)
	class UAudioLinkExampleSettingsFactory : public UFactory
	{
		GENERATED_UCLASS_BODY()

		virtual UObject* FactoryCreateNew(UClass* Class, UObject* InParent, FName Name, EObjectFlags Flags, UObject* Context, FFeedbackContext* Warn) override;

		virtual uint32 GetMenuCategories() const override;
	};
```

## IAudioLink

`IAudioLink` 是 `IAudioLinkFactory` 使用的主要抽象，通常由 `TUniquePtr` 返回。它是一种不透明类型，专门用于承载特定于插件的实现方案的隐藏细节，并将其包含在指向消费者和生产者的线程安全共享指针中。消费者对象保持对生产者的弱引用，并在生产者被删除时安全地终止连接，这通常在链接的生命周期结束时发生。

### 示例：实例实现

```cpp
	//* AudioLink实例，即共享指针的容器，用于生命周期管理。*/
	struct FExampleLink : IAudioLink
	{
		// 监听新缓冲区的循环缓冲区（子混音/源）
		FSharedBufferedOutputPtr ProducerSP; 

		// 示例客户端
		FSharedExampleAudioInputClientPtr ConsumerSP;	

		// ...
	};
```

## IAudioMixerPlatformInterface

当你用虚幻引擎注册AudioLink工厂时，AudioLink平台混音器将被实例化，并与AudioLink（而不是平台硬件）挂钩。传统上，第三方库必须修改 `.ini` 文件才能避免这种情况，但AudioLink简化了这一问题。

## IBufferedAudioOutput

大部分AudioLink实例都使用由 `IBufferedAudioOutput` 派生的类来创建生产者对象。而它们在内部充当脉冲编码调制（PCM）数据的循环缓冲区，等待由消费者对象排空。

循环缓冲区是一种先进先出（FIFO）的数据结构，用于缓冲跨虚幻引擎边界的PCM数据。对AudioLink而言，它们是原子化的，但并不是无锁的。

源代码（ `FBufferedSourceListener` 和 `FBufferedSubmixListener` ）中已经定义了该接口的实现，因此应该无须为这些类型编译单独的派生版本。

通常情况下，链接会在识别传入音频的格式之前就被创建。因此在识别格式后会触发 `OnFormatKnown` 委托。你应该设置该委托，并在委托发生时开始播放。

请仔细考虑你为这些对象分配的空间大小。空间过大会导致延迟，但过小又会导致缓冲区不足。通常情况下，你应该使用与消费者比特率呈2：1或更高比例的大小。

### 链接实例的生命周期

链接实例的生命周期取决于其类型。

-   源链接的生命周期一般等于源的播放生命周期。播放一旦结束，源就会被删除，链接也随之断开。导致断开的主要原因是，每个新源的格式都可能不同。
-   子混音链接会在子混音运行时打开，而这通常为应用程序的运行时间。这可能导致由实例生命周期引起的问题，尤其是在编辑器中。如需了解详情，请参阅[故障排除](/documentation/zh-cn/unreal-engine/audiolink-overview#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4)。

## IAudioLinkSynchronizer

AudioLink的每份实现都需要一个源自 `IAudioLinkSynchronizer` 的同步器类，承载用于设置各种回调的注册和删除的调用。该类会与另一个时钟源同步，从而让虚幻引擎和外部应用程序保持同步。

你必须为下列所有回调分别提供线程安全的委托：

-   `Suspend`
-   `Resume`
-   `OpenStream`
-   `CloseStream`
-   `BeginRender`
-   `EndRender`

请使用 `OpenStream` 向虚幻引擎通知外部AudioLink工厂的格式。这种通知对匹配区块速率/取样率和通道数量而言最为适用。

请使用 `BeginRender` 和 `EndRender` 来同步虚幻引擎和外部渲染器。

### 示例：同步器实现

```cpp
	struct FExampleSynchronizerAudioLink : IAudioLinkSynchronizer 
	{
		IAudioLinkSynchronizer::FOnSuspend		OnSuspend;
		IAudioLinkSynchronizer::FOnResume		OnResume;
		IAudioLinkSynchronizer::FOnOpenStream	OnOpenStream;
		IAudioLinkSynchronizer::FOnCloseStream	OnCloseStream;
		IAudioLinkSynchronizer::FOnBeginRender	OnBeginRender;
		IAudioLinkSynchronizer::FOnEndRender	OnEndRender;

		FRWLock RwLock;

		// ...

		#define MAKE_DELEGATE_FUNC(X)\
			FDelegateHandle Register##X##Delegate(const FOn##X::FDelegate& InDelegate) override\
			{\
				FWriteScopeLock WriteLock(RwLock);\
				return On##X.Add(InDelegate);\
			}\
			bool Remove##X##Delegate(const FDelegateHandle& InHandle) override\
			{\
				FWriteScopeLock WriteLock(RwLock);\
				return On##X.Remove(InHandle);\
			}

		MAKE_DELEGATE_FUNC(Suspend)
		MAKE_DELEGATE_FUNC(Resume)
		MAKE_DELEGATE_FUNC(OpenStream)
		MAKE_DELEGATE_FUNC(CloseStream)
		MAKE_DELEGATE_FUNC(BeginRender)
		MAKE_DELEGATE_FUNC(EndRender)

		#undef MAKE_DELEGATE_FUNC
	};
```

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [audiolink](https://dev.epicgames.com/community/search?query=audiolink)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [IAudioLinkFactory](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#iaudiolinkfactory)
-   [插件实现](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#%E6%8F%92%E4%BB%B6%E5%AE%9E%E7%8E%B0)
-   [示例：子混音AudioLink的实现方案](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#%E7%A4%BA%E4%BE%8B%EF%BC%9A%E5%AD%90%E6%B7%B7%E9%9F%B3audiolink%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%96%B9%E6%A1%88)
-   [示例：工厂实现](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#%E7%A4%BA%E4%BE%8B%EF%BC%9A%E5%B7%A5%E5%8E%82%E5%AE%9E%E7%8E%B0)
-   [UAudioLinkSettingsAbstract](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#uaudiolinksettingsabstract)
-   [示例：设置实现](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#%E7%A4%BA%E4%BE%8B%EF%BC%9A%E8%AE%BE%E7%BD%AE%E5%AE%9E%E7%8E%B0)
-   [IAudioLinkSettingsProxy](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#iaudiolinksettingsproxy)
-   [UFactory实现](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#ufactory%E5%AE%9E%E7%8E%B0)
-   [示例：标准设置项工厂实现](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#%E7%A4%BA%E4%BE%8B%EF%BC%9A%E6%A0%87%E5%87%86%E8%AE%BE%E7%BD%AE%E9%A1%B9%E5%B7%A5%E5%8E%82%E5%AE%9E%E7%8E%B0)
-   [IAudioLink](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#iaudiolink)
-   [示例：实例实现](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#%E7%A4%BA%E4%BE%8B%EF%BC%9A%E5%AE%9E%E4%BE%8B%E5%AE%9E%E7%8E%B0)
-   [IAudioMixerPlatformInterface](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#iaudiomixerplatforminterface)
-   [IBufferedAudioOutput](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#ibufferedaudiooutput)
-   [链接实例的生命周期](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#%E9%93%BE%E6%8E%A5%E5%AE%9E%E4%BE%8B%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
-   [IAudioLinkSynchronizer](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#iaudiolinksynchronizer)
-   [示例：同步器实现](/documentation/zh-cn/unreal-engine/audiolink-reference-guide#%E7%A4%BA%E4%BE%8B%EF%BC%9A%E5%90%8C%E6%AD%A5%E5%99%A8%E5%AE%9E%E7%8E%B0)