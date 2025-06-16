/**
 * 预处理脚本：移除Blueprint对象定义块
 * 
 * 此脚本用于清理虚幻引擎文档中的Blueprint对象定义块，
 * 这些块通常包含大量技术细节但对知识三元组提取没有帮助。
 * 
 * 匹配模式：
 * - Begin Object ... End Object
 * - 可能跨多行
 * - 内容包含各种技术参数和配置
 */

interface PreprocessResult {
  content: string;
  warnings?: Array<{
    type: string;
    message: string;
    timestamp: string;
  }>;
}

/**
 * 移除Blueprint对象定义块的预处理函数
 * @param content 原始文档内容
 * @param filename 文件名
 * @returns 处理后的内容或包含警告的结果对象
 */
function preprocess(content: string, filename: string): string | PreprocessResult {
  const warnings: Array<{
    type: string;
    message: string;
    timestamp: string;
  }> = [];
  
  let processedContent = content;
  let removedCount = 0;
  
  try {
    // 匹配 Begin Object...End Object 块的正则表达式
    // 使用非贪婪匹配，支持嵌套结构
    const blueprintObjectRegex = /Begin Object[\s\S]*?End Object/gi;
    
    // 记录移除的块信息（用于调试）
    const matches = content.match(blueprintObjectRegex);
    if (matches) {
      removedCount = matches.length;
      console.log(`📝 在文件 ${filename} 中发现 ${removedCount} 个Blueprint对象块`);
      
      // 可选：记录移除的块的开头部分（用于验证）
      matches.slice(0, 3).forEach((match, index) => {
        const preview = match.substring(0, 100).replace(/\n/g, ' ');
        console.log(`   块 ${index + 1}: ${preview}...`);
      });
      
      if (matches.length > 3) {
        console.log(`   ... 还有 ${matches.length - 3} 个块`);
      }
    }
    
    // 移除所有匹配的块
    processedContent = content.replace(blueprintObjectRegex, '');
    
    // 清理多余的空行（移除块后可能留下的空行）
    processedContent = processedContent.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    // 记录处理结果
    if (removedCount > 0) {
      const originalLength = content.length;
      const newLength = processedContent.length;
      const reductionPercent = ((originalLength - newLength) / originalLength * 100).toFixed(1);
      
      console.log(`✂️  移除了 ${removedCount} 个Blueprint对象块，内容减少 ${reductionPercent}% (${originalLength} → ${newLength} 字符)`);
      
      warnings.push({
        type: 'preprocessing_info',
        message: `移除了 ${removedCount} 个Blueprint对象块，内容长度减少 ${reductionPercent}%`,
        timestamp: new Date().toISOString()
      });
    }
    
    // 如果有警告，返回结果对象；否则直接返回处理后的内容
    if (warnings.length > 0) {
      return {
        content: processedContent,
        warnings
      };
    }
    
    return processedContent;
    
  } catch (error) {
    console.error(`❌ 预处理脚本执行失败:`, error);
    warnings.push({
      type: 'preprocessing_error',
      message: `Blueprint对象块移除失败: ${(error as Error).message}`,
      timestamp: new Date().toISOString()
    });
    
    // 如果处理失败，返回原始内容
    return {
      content: content,
      warnings
    };
  }
}

// 导出预处理函数 (ESM)
export { preprocess };
export default preprocess;

// 如果直接运行此脚本，执行测试
if (import.meta.url === `file://${process.argv[1]}`) {
  const testContent = `
一些正常的文档内容...

Begin Object Class=/Script/BlueprintGraph.K2Node_VariableSet Name="K2Node_VariableSet_0" VariableReference=(MemberName="IsFalling",MemberGuid=705639E843948844E07A3E9294CDE9AE,bSelfContext=True) NodePosX=1584 NodePosY=-80 NodeGuid=0CED3FDD4B1A2376E69D4C82D22F57B5 CustomProperties Pin (PinId=4F5BDC4D48B89FFC3E10B99478EBE18C,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_DynamicCast_0 9D14DCE34BC0F75E1A2D2B9256790C4B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) CustomProperties Pin (PinId=6BD7AC35458BE69A68D18CB671664C5D,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_VariableSet_1 359078C04D0835C7115B4984EB33976F,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,) End Object

更多正常的文档内容...

Begin Object Class=/Script/Something Name="Test" End Object

最后的正常内容...
  `;
  
  console.log('\n🧪 测试预处理脚本:');
  console.log('原始内容长度:', testContent.length);
  
  const result = preprocess(testContent, 'test.md');
  if (typeof result === 'string') {
    console.log('处理后内容长度:', result.length);
    console.log('处理后内容:', result);
  } else {
    console.log('处理后内容长度:', result.content.length);
    console.log('警告数量:', result.warnings?.length || 0);
    console.log('处理后内容:', result.content);
  }
} 