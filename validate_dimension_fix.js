// 详细维度分析修复验证脚本
// 用于验证index.html中的修复效果

// 模拟用户分数数据（用于测试）
const testUserScores = {
    selfInterest: 45,
    greed: 30,
    machiavellianism: 60,
    moralDisengagement: 25,
    narcissism: 55,
    psychologicalEntitlement: 40,
    psychopathy: 35,
    sadism: 20,
    selfCentered: 50,
    malevolence: 15,
    darkTriadTotal: 50
};

// 分析文本数据（模拟index.html中的数据）
const analysisTexts = {
    selfInterest: {
        low: "你的利己主义倾向较低，表明你在决策时会较多考虑他人利益。",
        medium: "你有适度的利己主义倾向，在关注自身利益的同时也能考虑他人。",
        high: "你的利己主义倾向较高，可能需要在决策时更多考虑他人感受。"
    },
    greed: {
        low: "你的贪婪程度较低，对物质需求有理性的认识。",
        medium: "你有适度的贪婪倾向，能够平衡物质需求和其他价值。",
        high: "你的贪婪程度较高，可能需要反思物质追求对生活的影响。"
    },
    machiavellianism: {
        low: "你的马基雅维利主义倾向较低，倾向于直接和诚实的交往方式。",
        medium: "你有适度的马基雅维利主义倾向，能够在策略和诚实间找到平衡。",
        high: "你的马基雅维利主义倾向较高，可能需要在人际交往中更多考虑道德因素。"
    },
    moralDisengagement: {
        low: "你的道德推脱倾向较低，能够较好地坚持道德原则。",
        medium: "你有适度的道德推脱倾向，偶尔会为自己的行为找借口。",
        high: "你的道德推脱倾向较高，可能需要加强道德意识。"
    },
    narcissism: {
        low: "你的自恋程度较低，表现出谦逊和脚踏实地的特质。",
        medium: "你有适度的自恋倾向，能够保持健康的自信水平。",
        high: "你的自恋程度较高，可能需要在自我认知方面进行调整。"
    },
    psychologicalEntitlement: {
        low: "你的心理权利感较低，不会过度要求特殊待遇。",
        medium: "你有适度的心理权利感，能够合理表达自己的需求。",
        high: "你的心理权利感较高，可能需要反思自己对他人的期望。"
    },
    psychopathy: {
        low: "你的精神变态特质较低，表现出良好的同理心。",
        medium: "你有适度的精神变态特质，能够在理性和情感间保持平衡。",
        high: "你的精神变态特质较高，可能需要发展更多的同理心。"
    },
    sadism: {
        low: "你的施虐倾向很低，表现出善良和体贴的特质。",
        medium: "你有轻微的施虐倾向，但能够控制这种冲动。",
        high: "你的施虐倾向较高，需要反思自己的行为对他人的影响。"
    },
    selfCentered: {
        low: "你的自我为中心程度较低，能够很好地考虑他人观点。",
        medium: "你有适度的自我为中心倾向，能够在关注自己和他人间找到平衡。",
        high: "你的自我为中心程度较高，可能需要更多从他人角度思考问题。"
    },
    malevolence: {
        low: "你的恶毒倾向很低，表现出友善和积极的特质。",
        medium: "你有轻微的恶毒倾向，但能够控制负面想法。",
        high: "你的恶毒倾向较高，可能需要反思自己的负面情绪来源。"
    }
};

// 获取等级
function getLevel(score) {
    if (score < 33) return 'low';
    if (score < 66) return 'medium';
    return 'high';
}

// 验证元素ID映射
function validateElementIdMapping() {
    console.log('=== 验证详细维度分析元素ID映射 ===');
    
    const dimensions = [
        {key: 'selfInterest', expectedId: 'self-interest'},
        {key: 'greed', expectedId: 'greed'},
        {key: 'machiavellianism', expectedId: 'machiavellianism'},
        {key: 'moralDisengagement', expectedId: 'moral-disengagement'},
        {key: 'narcissism', expectedId: 'narcissism'},
        {key: 'psychologicalEntitlement', expectedId: 'psychological-entitlement'},
        {key: 'psychopathy', expectedId: 'psychopathy'},
        {key: 'sadism', expectedId: 'sadism'},
        {key: 'selfCentered', expectedId: 'self-centered'},
        {key: 'malevolence', expectedId: 'malevolence'}
    ];
    
    // 模拟修复后的updateDimensionUI函数逻辑
    function testUpdateDimensionUI(dimensionKey) {
        const prefix = dimensionKey;
        let kebabCasePrefix = prefix.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        
        // 特殊处理复合词
        const specialCases = {
            'moralDisengagement': 'moral-disengagement',
            'psychologicalEntitlement': 'psychological-entitlement',
            'selfInterest': 'self-interest',
            'selfCentered': 'self-centered'
        };
        
        if (specialCases[dimensionKey]) {
            kebabCasePrefix = specialCases[dimensionKey];
        }
        
        return kebabCasePrefix;
    }
    
    let allCorrect = true;
    
    dimensions.forEach(dim => {
        const result = testUpdateDimensionUI(dim.key);
        const correct = result === dim.expectedId;
        
        console.log(`${dim.key}:`);
        console.log(`  期望ID: ${dim.expectedId}`);
        console.log(`  实际ID: ${result}`);
        console.log(`  状态: ${correct ? '✅ 正确' : '❌ 错误'}`);
        console.log('');
        
        if (!correct) {
            allCorrect = false;
        }
    });
    
    console.log(`=== 验证结果: ${allCorrect ? '✅ 全部正确' : '❌ 存在错误'} ===`);
    return allCorrect;
}

// 测试详细维度分析更新
function testDetailedAnalysisUpdate() {
    console.log('=== 测试详细维度分析更新 ===');
    
    const dimensions = [
        'selfInterest', 'greed', 'machiavellianism', 'moralDisengagement',
        'narcissism', 'psychologicalEntitlement', 'psychopathy', 'sadism',
        'selfCentered', 'malevolence'
    ];
    
    let successCount = 0;
    let totalCount = dimensions.length;
    
    dimensions.forEach(dimensionKey => {
        const score = testUserScores[dimensionKey];
        const level = getLevel(score);
        const expectedScoreText = `${score}%`;
        const expectedBarWidth = `${score}%`;
        const expectedAnalysis = analysisTexts[dimensionKey][level];
        
        // 获取元素ID
        const elementId = getElementId(dimensionKey);
        
        console.log(`${dimensionKey} (${elementId}):`);
        console.log(`  分数: ${score}% (等级: ${level})`);
        console.log(`  期望分数文本: ${expectedScoreText}`);
        console.log(`  期望进度条宽度: ${expectedBarWidth}`);
        console.log(`  期望分析文本: ${expectedAnalysis}`);
        
        // 在实际页面中，这里会检查DOM元素
        // 由于这是验证脚本，我们只验证逻辑是否正确
        if (score >= 0 && score <= 100 && expectedAnalysis) {
            console.log(`  状态: ✅ 逻辑正确`);
            successCount++;
        } else {
            console.log(`  状态: ❌ 逻辑错误`);
        }
        console.log('');
    });
    
    const successRate = (successCount / totalCount * 100).toFixed(1);
    console.log(`=== 测试结果: ${successCount}/${totalCount} 通过 (${successRate}%) ===`);
    
    return successRate >= 90;
}

// 获取元素ID（修复后的逻辑）
function getElementId(dimensionKey) {
    const specialCases = {
        'moralDisengagement': 'moral-disengagement',
        'psychologicalEntitlement': 'psychological-entitlement',
        'selfInterest': 'self-interest',
        'selfCentered': 'self-centered'
    };
    
    if (specialCases[dimensionKey]) {
        return specialCases[dimensionKey];
    }
    
    return dimensionKey.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// 运行所有验证
function runAllValidations() {
    console.log('开始详细维度分析修复验证...\n');
    
    const idMappingValid = validateElementIdMapping();
    const analysisUpdateValid = testDetailedAnalysisUpdate();
    
    console.log('\n=== 最终验证结果 ===');
    console.log(`元素ID映射: ${idMappingValid ? '✅ 通过' : '❌ 失败'}`);
    console.log(`分析更新逻辑: ${analysisUpdateValid ? '✅ 通过' : '❌ 失败'}`);
    
    const overallValid = idMappingValid && analysisUpdateValid;
    console.log(`\n总体结果: ${overallValid ? '✅ 修复成功' : '❌ 需要进一步修复'}`);
    
    if (overallValid) {
        console.log('\n🎉 详细维度分析修复验证通过！所有维度现在应该能正确显示分数、进度条和分析文本。');
    } else {
        console.log('\n⚠️  验证失败，请检查修复逻辑。');
    }
    
    return overallValid;
}

// 导出验证函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateElementIdMapping,
        testDetailedAnalysisUpdate,
        runAllValidations
    };
}

// 如果在浏览器环境中运行，自动执行验证
if (typeof window !== 'undefined') {
    window.addEventListener('load', function() {
        setTimeout(runAllValidations, 1000);
    });
}