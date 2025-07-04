# 在虚幻引擎移动端项目中使用虚幻插件语言 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-unreal-plugin-language-for-mobile-projects-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:59:00.646Z

---

目录

![虚幻插件语言](https://dev.epicgames.com/community/api/documentation/image/14f3f625-ccea-4ce6-927f-b3ca83d8b428?resizing_type=fill&width=1920&height=335)

**虚幻插件语言** (UPL)是一种基于XML的简单语言，用于操作XML和返回字符串。它包含一个分段，在计算任何其他分段之前，每个架构计算一次这个分段。状态被维护并推进到下个分段进行评估，因此分段的执行顺序很重要。虽然UPL是一个用于修改和查询XML的通用系统，但它专门用于允许插件影响其所属包的全局配置。例如，它允许插件修改Android APK AndroidManfiest.xml文件或IOS IPA plist文件。UBT还将查询插件的UPL xml文件，查找文件中要包含的字符串（对于包来说必须是常见的字符串），例如Android上的一些.java文件。

## 启用追踪

如果需要查看在插件情境中执行的指令，请添加以下命令以启用追踪：

```cpp
	<trace enable="true"/>
```

在此指令之后，在情境中实际执行的所有节点都将写入日志，直到执行 **`<trace enable="false"></trace>`**。你还可以使用此命令获得情境中所有变量的转储：

```cpp
	<dumpvars/>
```

## 变量类型

支持Bool、Int和String变量类型。任何属性都可以引用一个变量，在使用该语法求值之前，将用等效字符串替换该变量：

```cpp
	$B(name) = 布尔变量"名称"值
	$I(name) = 整数变量"名称"值
	$S(name) = 字符串变量"名称"值
	$E(name) = 元素变量"名称"值
```

以下变量将自动初始化：

```cpp
	$S(Output) = 返回用于计算分段的输出（初始化为输入）
	$S(Architecture) = 目标架构（armeabi-armv7a、arm64-v8a、x86、x86_64）
	$S(PluginDir) = 加载XML文件的目录
	$S(EngineDir) = 引擎目录
	$S(BuildDir) = 项目平台相应的构建目录（在中间文件夹中）
	$S(Configuration) = 配置类型（Debug、DebugGame、Development、Test、Shipping）
	$B(Distribution) = 如果是发布构建，则为true
```

除上述变量外，所有变量都在插件的情境中，以防止命名空间冲突；尝试将一个新值设置为上述任何一个值（输出除外）只会影响当前情境。

## 变量操作

以下节点允许变量操作：

```cpp
	<setBool result="" value=""/>
	<setInt result="" value=""/>
	<setString result="" value=""/>
	<setElement result="" value=""/>
	<setElement result="" value="" text=""/>
	<setElement result="" xml=""/>
	包含值的<setElement>用于创建一个空的XML元素，并将标记设置为值。
	包含值和文本的<setElement>用于创建一个XML元素，并将标记设置为未解析文本的值。
	包含xml的<setElement>将解析提供的XML。记住对任何特殊字符进行换码！

```

也可以从ini文件中的属性设置变量：

```cpp
	<setBoolFromProperty result="" ini="" section="" property="" default=""/>
	<setBoolFromPropertyContains result="" ini="" section="" property="" default="" contains=""/>
	<setIntFromProperty result="" ini="" section="" property="" default=""/>
	<setStringFromProperty result="" ini="" section="" property="" default=""/>
```

还可以使用节点从环境变量中设置字符串。环境变量必须指定为"**value**"属性，并封装在一对"**%**"字符中。

```cpp
	<setStringFromEnvVar result="" value=""/>
```

你还可以检查是否定义了特定的环境变量（同样，用"%"字符包装）：

```cpp
	<setBoolEnvVarDefined result="" value=""/>
```

使用环境变量节点的一般示例：

```cpp
	<setBoolEnvVarDefined result="bHasNDK" value="%NDKROOT%"/>
	<setStringFromEnvVar result="NDKPath" value="%NDKROOT%"/>
```

布尔变量也可以设置为应用运算符的结果：

```cpp
	<setBoolNot result="" source=""/>
	<setBoolAnd result="" arg1="" arg2=""/>
	<setBoolOr result="" arg1="" arg2=""/>
	<setBoolIsEqual result="" arg1="" arg2=""/>
	<setBoolIsLess result="" arg1="" arg2=""/>
	<setBoolIsLessEqual result="" arg1="" arg2=""/>
	<setBoolIsGreater result="" arg1="" arg2=""/>
	<setBoolIsGreaterEqual result="" arg1="" arg2=""/>
	<setBoolFromPropertyContains result="" ini="" section="" property="" contains=""/>

```

整数变量可以使用这些算术运算：

```cpp
	<setIntAdd result="" arg1="" arg2=""/>
	<setIntSubtract result="" arg1="" arg2=""/>
	<setIntMultiply result="" arg1="" arg2=""/>
	<setIntDivide result="" arg1="" arg2=""/>

```

字符串是用下面的代码操作的：

```cpp
	<setStringAdd result="" arg1="" arg2=""/>
	<setStringSubstring result="" source="" start="" length=""/>
	<setStringReplace result="" source="" find="" with=""/>
```

字符串长度可以用以下代码检索：

```cpp
	<setIntLength result="" source=""/>

```

搜索字符串的索引可以通过以下命令在源代码中找到：

```cpp
	<setIntFindString result="" source="" find=""/>

```

还可以使用以下快捷键字符串比较，而不是使用 `<setIntFindString>` 并检查结果：

```cpp
	<setBoolStartsWith result="" source="" find=""/>
	<setBoolEndsWith result="" source="" find=""/>
	<setBoolContains result="" source="" find=""/>

```

## 写入消息

使用此节点将消息写入日志：

```cpp
	<log text=""/>
```

## 条件执行

条件执行使用以下形式：

```cpp
	<if condition="">
		<true>
			<-- 如果条件为true，且是布尔变量，则执行 -->
		</true>
		<false>
			<-- 如果条件为false，且是布尔变量，则执行 -->
		</false>
	</if>
```

`<true>` 和 `<false>` 块是可选的。条件必须在布尔变量中。布尔运算符节点可以组合起来，为更复杂的条件创建最终状态：

```cpp
	<setBoolNot result="notDistribution" source="$B(Distribution)/>
	<setBoolIsEqual result="isX86" arg1="$S(Architecture)" arg2="x86"/>
	<setBoolIsEqual result="isX86_64" arg2="$S(Architecture)" arg2="x86_64/">
	<setBoolOr result="isIntel" arg1="$B(isX86)" arg2="$B(isX86_64)"/>
	<setBoolAnd result="intelAndNotDistribution" arg1="$B(isIntel)" arg2="$B(notDistribution)"/>
	<if condition="intelAndNotDistribution">
		<true>
			<-- 如果不是发布构建，为Intel执行一些操作 -->
		</true>
	</if>
```

"isIntel"也可以这么做：

```cpp
	<setStringSubstring result="subarch" source="$S(Architecture)" start="0" length="3"/>
	<setBoolEquals result="isIntel" arg1="$S(subarch)" arg2="x86"/>
```

有两个快捷方式节点可用于条件执行： 以下代码：

```cpp
	<isArch arch="armeabi-armv7">
		<-- do stuff -->
	</isArch>
```

与以下代码等效：

```cpp
	<setBoolEquals result="temp" arg1="$S(Architecture)" arg2="armeabi-armv7">
	<if condition="temp">
		<true>
			<-- do stuff -->
		</true>
	</if>
```

以下代码：

```cpp
	<isDistribution> blah
		<-- do stuff -->
	</isDistribution>
```

与以下代码等效：

```cpp
	<if condition="Distribution">
		<-- do stuff -->
	</if>
```

可以使用以下代码停止执行：

```cpp
	<return/>

```

## 循环

可以使用这些节点创建循环：

```cpp
	<while condition="">
		<-- do stuff -->
	</while>
	<break/>
	<continue/>
```

`<while>` 主体将执行，直到条件为false或命中一个 `<break/>`。如果条件仍然为true或退出，`<continue></continue>` 将重新启动循环的执行。

`<while>` 主体外的 `<break/>` 的作用将与 `<return></return>` 相同。

下面是一个示例循环，它将1到5写入日志，其中跳过3。注意，while条件的更新应该在continue之前完成，否则它可能不会退出。

```cpp
	<setInt result="index" value="0"/>
	<setBool result="loopRun" value="true"/>
	<while condition="loopRun">
		<setIntAdd result="index" arg1="$I(index)" arg2="1"/>
		<setBoolIsLess result="loopRun" arg1="$I(index)" arg2="5"/>
		<setBoolIsEqual result="indexIs3" arg1="$I(index)" arg2="3"/>
		<if condition="indexIs3">
			<true>
				<continue/>
			</true>
		</if>
		<log text="$I(index)"/>
	</while>
```

也可以使用变量替换来生成结果变量名。这使得在循环中创建数组成为可能：

```cpp
	<setString result="array_$I(index)" value="element $I(index) in array"/>
```

可以使用以下方法检索（值作为变量名处理）：

```cpp
	<setStringFrom result="out" value="array_$I(index)"/>
```

也可以使用变量替换来生成结果变量名。这使得在循环中创建数组成为可能：

```cpp
	<setString result="array_$I(index)" value="element $I(index) in array"/>
```

可以使用以下方法检索（值作为变量名处理）：

```cpp
	<setStringFrom result="out" value="array_$I(index)"/>
```

对于布尔和整数类型，你可以使用 `<setBoolFrom>` 和 `<setIntFrom>`。

## 插入文本

用于将文本插入分段的节点如下所示：

```cpp
	<insert> 主体 </insert>
	<insertNewline/>
	<insertValue value=""/>
	<loadLibrary name="" failmsg=""/>
```

第一个将在返回的分段字符串中插入文本或节点。请注意，你必须对以下符号使用换码的字符：

```cpp
	< = <
	> = >
	& = &
```

`<insertValue value="" /pre>` - 在插入之前计算变量的值。如果值包含双引号(")，则必须用引号对其进行换码。 `<loadLibrary name="" failmsg="">` - 是插入system.LoadLibrary尝试/捕捉块的快捷方式，带有可选的有关加载失败案例的日志消息。

## 搜索和替换

你可通过以下方式在输出中进行搜索和替换：

```cpp
	<replace find="" with=""/>

```

你还可以直接操作实际的$S（输出），上面的方法更有效：

```cpp
	<setStringAdd result="Input" arg1="$S(Output)" arg2="sample\n"/>
	<setStringReplace result="Input" source="$S(Output)" find=".LAUNCH" with=".INFO"/>

```

## XML操作

XML操作使用以下节点：

```cpp
	<addElement tag="" name=""/>
	<addElements tag=""> 主体 </addElements>
	<removeElement tag=""/>
	<setStringFromTag result="" tag=""/>
	<setStringFromAttribute result="" tag="" name=""/>
	<setStringFromTagText result="" tag=""/>
	<addAttribute tag="" name="" value=""/>
	<removeAttribute tag="" name=""/>
	<loopElements tag=""> instructions </loopElements>

```

当前元素通过tag="$"引用。元素变量通过$varname引用，因为使用$E(varname)将被扩展为与XML等效的字符串。**addElement**、**addElements** 和 **removeElement** 默认应用于所有匹配的标记。可添加到的可选once="true"属性仅应用于第一个匹配标记。

`<uses-permission>`、`<uses-feature>` 和 `<uses-library>` 使用以下方式更新：

```cpp
	<addPermission android:name="" .. />
	<addFeature android:name="" .. />
	<addLibrary android:name="" .. />
```

上述命令中的任何属性都复制到添加到清单的元素中，以便你可以执行以下操作，例如：

```cpp
	<addFeature android:name="android.hardware.usb.host" android:required="true"/>
```

## 复制文件

最后，这些节点允许复制用于暂存jar和so文件的文件：

```cpp
	<copyFile src="" dst="" force=""/>
	<copyDir src="" dst="" force=""/>
```

如果force为false，则只有在长度或时间戳不匹配时才替换文件。此值默认为true。

应该使用以下目录作为src和dst路径的基础：

```cpp
	$S(PluginDir) = 加载XML文件的目录
		$S(EngineDir) = 引擎目录
	$S(BuildDir) = 项目平台相应的构建目录
```

虽然可以在APK目录之外写入，但不推荐这样做。

## 移除文件

如果必须移除文件（例如发布构建中的纯开发文件），则可以使用该节点：

```cpp
	<deleteFiles filespec=""/>
```

它仅限于从BuildDir中移除文件。下面是从资源目录中移除Oculus签名文件(osig)的示例用法：

```cpp
	<deleteFiles filespec="assets/oculussig_*"/>
```

## 打包或部署

在打包或部署阶段评估以下部分：

```cpp
	对于所有平台
	<-- 每个架构都要对init部分进行一次评估 -->
		<init> </init>
	Android特定部分
			<--  应用于AndroidManifest.xml的可选更新 -->
		<androidManifestUpdates> </androidManifestUpdates>
			<--  proguard的可选添加内容 -->
		<proguardAdditions>    </proguardAdditions>
			<--  可选的AAR导入添加内容 -->
		<AARImports> </AARImports>
			<--  可选的基础build.gradle添加内容 -->
		<baseBuildGradleAdditions>  </baseBuildGradleAdditions>
			<--  可选的基础build.gradle构建脚本添加内容 -->
	    <buildscriptGradleAdditions>  </buildscriptGradleAdditions>
			<--  可选的应用程序build.gradle添加内容 -->
		<buildGradleAdditions>  </buildGradleAdditions>
			<--  在${sdk.dir}/tools/ant/build.xml导入之前，对生成的build.xml的可选添加内容 -->
		<buildXmlPropertyAdditions> </buildXmlPropertyAdditions>
			<--  在ndk构建之前可以选择从Intermediate/Android/APK复制或删除的文件或目录 -->
		<prebuildCopies> </prebuildCopies>
			<-- 在ndk构建之后可以选择从Intermediate/Android/APK复制或删除的文件或目录 -->
		<resourceCopies> </resourceCopies>
			<-- 在Gradle之前可以选择从Intermediate/Android/APK复制或删除的文件或目录 -->
		<gradleCopies> </gradleCopies>
			<-- 可以选择添加到gradle.properties的属性 -->
		<gradleProperties> </gradleProperties>
			<-- 可以选择添加到Gradle命令行的参数（带有空格的前缀或将碰到前面的参数） -->
		<gradleParameters> </gradleParameters>
			<-- 可选的必要最小SDK API级别 -->
	    <minimumSDKAPI> </minimumSDKAPI>
			<-- GameActivity.java中的GameActivity导入的可选添加内容 -->
		<gameActivityImportAdditions> </gameActivityImportAdditions>
		<-- GameActivity.java中的导入后可以选择向GameActivity添加的内容 -->
	    <gameActivityPostImportAdditions> </gameActivityPostImportAdditions>
			<-- GameActivity.java中的GameActivity类实现的可选添加内容（每行以逗号结尾） -->
		<gameActivityImplementsAdditions> </gameActivityImplementsAdditions>
			<-- GameActivity.java中GameActivity类主体的可选添加内容 -->
		<gameActivityClassAdditions> </gameActivityOnClassAdditions>
			<-- GameActivity.java中GameActivity onCreate元数据读取的可选添加内容 -->
		<gameActivityReadMetadata> </gameActivityReadMetadata>
	    	<-- GameActivity.java中GameActivity onCreate的可选添加内容 -->
	    <gameActivityOnCreateAdditions> </gameActivityOnCreateAdditions>
			<-- GameActivity.java中GameActivity onDestroy的可选添加内容 -->
		<gameActivityOnDestroyAdditions> </gameActivityOnDestroyAdditions>
			<-- GameActivity.java中GameActivity onStart的可选添加内容 -->
		<gameActivityOnStartAdditions> </gameActivityOnStartAdditions>
			<-- GameActivity.java中GameActivity onStop的可选添加内容 -->
		<gameActivityOnStopAdditions> </gameActivityOnStopAdditions>
			<-- GameActivity.java中GameActivity onPause的可选添加内容 -->
		<gameActivityOnPauseAdditions> </gameActivityOnPauseAdditions>
			<-- GameActivity.java中GameActivity onResume的可选添加内容 -->
	    <gameActivityOnResumeAdditions>    </gameActivityOnResumeAdditions>
			<-- GameActivity.java中GameActivity onNewIntent的可选添加内容 -->
	    <gameActivityOnNewIntentAdditions> </gameActivityOnNewIntentAdditions>
			<-- GameActivity.java中GameActivity onActivityResult的可选添加内容 -->
		<gameActivityOnActivityResultAdditions>    </gameActivityOnActivityResultAdditions>
			<-- GameActivity.java中加载的可选库（在libUE4.so之前） -->
		<soLoadLibrary>    </soLoadLibrary>

```

## 支持的节点

以下是支持节点的完整列表：

```cpp
	<isArch arch="">
	<isDistribution>
	<if> => <true> / <false>
	<while condition="">
	<return/>
	<break/>
	<continue/>
	<log text=""/>
	<insert> </insert>
	<insertValue value=""/>
	<replace find="" with""/>
	<copyFile src="" dst=""/>
	<copyDir src="" dst=""/>
	<loadLibrary name="" failmsg=""/>
	<setBool result="" value=""/>
	<setBoolEnvVarDefined result="" value=""/>
	<setBoolFrom result="" value=""/>
	<setBoolFromProperty result="" ini="" section="" property="" default=""/>
	<setBoolFromPropertyContains result="" ini="" section="" property="" contains=""/>
	<setBoolNot result="" source=""/>
	<setBoolAnd result="" arg1="" arg2=""/>
	<setBoolOr result="" arg1="" arg2=""/>
	<setBoolIsEqual result="" arg1="" arg2=""/>
	<setBoolIsLess result="" arg1="" arg2=""/>
	<setBoolIsLessEqual result="" arg1="" arg2=""/>
	<setBoolIsGreater result="" arg1="" arg2=""/>
	<setBoolIsGreaterEqual result="" arg1="" arg2=""/>
	<setInt result="" value=""/>
	<setIntFrom result="" value=""/>
	<setIntFromProperty result="" ini="" section="" property="" default=""/>
	<setIntAdd result="" arg1="" arg2=""/>
	<setIntSubtract result="" arg1="" arg2=""/>
	<setIntMultiply result="" arg1="" arg2=""/>
	<setIntDivide result="" arg1="" arg2=""/>
	<setIntLength result="" source=""/>
	<setIntFindString result="" source="" find=""/>
	<setString result="" value=""/>
	<setStringFrom result="" value=""/>
	<setStringFromEnvVar result="" value=""/>
	<setStringFromProperty result="" ini="" section="" property="" default=""/>
	<setStringAdd result="" arg1="" arg2=""/>
	<setStringSubstring result="" source="" index="" length=""/>
	<setStringReplace result="" source="" find="" with=""/>
```

-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用追踪](/documentation/zh-cn/unreal-engine/using-the-unreal-plugin-language-for-mobile-projects-in-unreal-engine#%E5%90%AF%E7%94%A8%E8%BF%BD%E8%B8%AA)
-   [变量类型](/documentation/zh-cn/unreal-engine/using-the-unreal-plugin-language-for-mobile-projects-in-unreal-engine#%E5%8F%98%E9%87%8F%E7%B1%BB%E5%9E%8B)
-   [变量操作](/documentation/zh-cn/unreal-engine/using-the-unreal-plugin-language-for-mobile-projects-in-unreal-engine#%E5%8F%98%E9%87%8F%E6%93%8D%E4%BD%9C)
-   [写入消息](/documentation/zh-cn/unreal-engine/using-the-unreal-plugin-language-for-mobile-projects-in-unreal-engine#%E5%86%99%E5%85%A5%E6%B6%88%E6%81%AF)
-   [条件执行](/documentation/zh-cn/unreal-engine/using-the-unreal-plugin-language-for-mobile-projects-in-unreal-engine#%E6%9D%A1%E4%BB%B6%E6%89%A7%E8%A1%8C)
-   [循环](/documentation/zh-cn/unreal-engine/using-the-unreal-plugin-language-for-mobile-projects-in-unreal-engine#%E5%BE%AA%E7%8E%AF)
-   [插入文本](/documentation/zh-cn/unreal-engine/using-the-unreal-plugin-language-for-mobile-projects-in-unreal-engine#%E6%8F%92%E5%85%A5%E6%96%87%E6%9C%AC)
-   [搜索和替换](/documentation/zh-cn/unreal-engine/using-the-unreal-plugin-language-for-mobile-projects-in-unreal-engine#%E6%90%9C%E7%B4%A2%E5%92%8C%E6%9B%BF%E6%8D%A2)
-   [XML操作](/documentation/zh-cn/unreal-engine/using-the-unreal-plugin-language-for-mobile-projects-in-unreal-engine#xml%E6%93%8D%E4%BD%9C)
-   [复制文件](/documentation/zh-cn/unreal-engine/using-the-unreal-plugin-language-for-mobile-projects-in-unreal-engine#%E5%A4%8D%E5%88%B6%E6%96%87%E4%BB%B6)
-   [移除文件](/documentation/zh-cn/unreal-engine/using-the-unreal-plugin-language-for-mobile-projects-in-unreal-engine#%E7%A7%BB%E9%99%A4%E6%96%87%E4%BB%B6)
-   [打包或部署](/documentation/zh-cn/unreal-engine/using-the-unreal-plugin-language-for-mobile-projects-in-unreal-engine#%E6%89%93%E5%8C%85%E6%88%96%E9%83%A8%E7%BD%B2)
-   [支持的节点](/documentation/zh-cn/unreal-engine/using-the-unreal-plugin-language-for-mobile-projects-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E8%8A%82%E7%82%B9)