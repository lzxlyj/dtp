// 简单验证脚本 - 测试详细维度分析修复效果
console.log('=== 详细维度分析修复验证 ===');

// 模拟HTML元素
const mockElements = {};

// 创建模拟DOM元素
function createMockElement(id, initialValue = '') {
    const element = {
        id: id,
        textContent: initialValue,
        style: { width: '0%' },
        exists: true
    };
    mockElements[id] = element;
    return element;
}

// 模拟document.getElementById
const originalGetElementById = document.getElementById;
document.getElementById = function(id) {
    return mockElements[id] || null;
};

// 模拟userScores对象
const userScores = {};

// 模拟getLevel函数
function getLevel(score) {
    if (score >= 80) return 'veryHigh';
    if (score >= 60) return 'high';
    if (score >= 40) return 'moderate';
    if (score >= 20) return 'low';
    return 'veryLow';
}

// 模拟getLevelText函数
function getLevelText(level) {
    const texts = {
        veryLow: '很低',
        low: '较低',
        moderate: '中等',
        high: '较高',
        veryHigh: '很高'
    };
    return texts[level] || '未知';
}

// 模拟analysisTexts对象
const analysisTexts = {
    selfInterest: {
        veryLow: '您表现出极低的利己主义倾向，总是优先考虑他人利益。',
        low: '您的利己主义倾向较低，能够平衡个人与他人利益。',
        moderate: '您的利己主义倾向处于中等水平，在大多数情况下能平衡个人与他人利益。',
        high: '您的利己主义倾向较高，经常优先考虑个人利益。',
        veryHigh: '您的利己主义倾向很高，几乎总是将个人利益置于首位。'
    },
    greed: {
        veryLow: '您完全没有贪婪倾向，对物质需求很节制。',
        low: '您的贪婪倾向较低，对物质需求较为节制。',
        moderate: '您的贪婪倾向处于中等水平，对物质有适度追求。',
        high: '您的贪婪倾向较高，对物质有较强的渴望。',
        veryHigh: '您的贪婪倾向很高，对物质有极强的渴望。'
    },
    machiavellianism: {
        veryLow: '您完全没有马基雅维利主义倾向，为人诚实正直。',
        low: '您的马基雅维利主义倾向较低，倾向于诚实直接的交往方式。',
        moderate: '您的马基雅维利主义倾向处于中等水平，在必要时会使用策略。',
        high: '您的马基雅维利主义倾向较高，经常运用策略和操控手段。',
        veryHigh: '您的马基雅维利主义倾向很高，几乎总是运用策略和操控手段。'
    },
    moralDisengagement: {
        veryLow: '您有极强的道德责任感，从不为不道德行为找借口。',
        low: '您的道德推脱倾向较低，有较强的道德责任感。',
        moderate: '您的道德推脱倾向处于中等水平，偶尔会为自己的行为找借口。',
        high: '您的道德推脱倾向较高，经常为自己的不当行为找借口。',
        veryHigh: '您的道德推脱倾向很高，几乎总是为自己的不当行为找借口。'
    },
    narcissism: {
        veryLow: '您完全没有自恋倾向，非常谦逊低调。',
        low: '您的自恋倾向较低，为人谦逊低调。',
        moderate: '您的自恋倾向处于中等水平，有适度的自信。',
        high: '您的自恋倾向较高，经常表现出自我中心和优越感。',
        veryHigh: '您的自恋倾向很高，总是表现出强烈的自我中心和优越感。'
    },
    psychologicalEntitlement: {
        veryLow: '您完全没有心理权利感，从不觉得自己应得特殊待遇。',
        low: '您的心理权利感较低，不常觉得自己应得特殊待遇。',
        moderate: '您的心理权利感处于中等水平，偶尔会觉得自己应得特殊待遇。',
        high: '您的心理权利感较高，经常觉得自己应得特殊待遇。',
        veryHigh: '您的心理权利感很高，总是觉得自己应得特殊待遇。'
    },
    psychopathy: {
        veryLow: '您完全没有精神变态倾向，情感丰富且有同理心。',
        low: '您的精神变态倾向较低，有正常的情感反应和同理心。',
        moderate: '您的精神变态倾向处于中等水平，情感和同理心表现一般。',
        high: '您的精神变态倾向较高，缺乏正常的情感反应和同理心。',
        veryHigh: '您的精神变态倾向很高，完全没有正常的情感反应和同理心。'
    },
    sadism: {
        veryLow: '您完全没有施虐倾向，从不会从他人痛苦中获得快感。',
        low: '您的施虐倾向较低，不会从他人痛苦中获得快感。',
        moderate: '您的施虐倾向处于中等水平，偶尔会对他人的痛苦产生快感。',
        high: '您的施虐倾向较高，经常从他人痛苦中获得快感。',
        veryHigh: '您的施虐倾向很高，总是从他人痛苦中获得快感。'
    },
    selfCentered: {
        veryLow: '您完全没有自我为中心倾向，总是考虑他人感受。',
        low: '您的自我为中心倾向较低，能够考虑他人感受。',
        moderate: '您的自我为中心倾向处于中等水平，平衡个人与他人的需求。',
        high: '您的自我为中心倾向较高，经常忽视他人感受。',
        veryHigh: '您的自我为中心倾向很高，完全忽视他人感受。'
    },
    malevolence: {
        veryLow: '您完全没有恶毒倾向，总是心怀善意。',
        low: '您的恶毒倾向较低，通常心怀善意。',
        moderate: '您的恶毒倾向处于中等水平，偶尔会有负面想法。',
        high: '您的恶毒倾向较高，经常有伤害他人的想法。',
        veryHigh: '您的恶毒倾向很高，总是心怀恶意并想伤害他人。'
    }
};

// 创建测试元素
function setupTestElements() {
    const dimensions = [
        'self-interest', 'greed', 'machiavellianism', 'moral-disengagement',
        'narcissism', 'psychological-entitlement', 'psychopathy', 'sadism',
        'self-centered', 'malevolence'
    ];
    
    dimensions.forEach(dim => {
        createMockElement(dim + '-score', '0%');
        createMockElement(dim + '-bar', '');
        createMockElement(dim + '-analysis', '等待分析...');
    });
}

// 修复后的updateDimensionUI函数
function updateDimensionUI(dimensionKey, dimensionName) {
    console.log(`更新维度: ${dimensionKey} (${dimensionName})`);
    
    // 修复后的ID转换逻辑
    const specialCases = {
        'moralDisengagement': 'moral-disengagement',
        'psychologicalEntitlement': 'psychological-entitlement',
        'selfInterest': 'self-interest',
        'selfCentered': 'self-centered'
    };
    
    let kebabCasePrefix;
    if (specialCases[dimensionKey]) {
        kebabCasePrefix = specialCases[dimensionKey];
    } else {
        kebabCasePrefix = dimensionKey.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    }
    
    console.log(`元素ID前缀: ${kebabCasePrefix}`);
    
    // 获取分数
    const score = userScores[dimensionKey] || 0;
    const level = getLevel(score);
    const levelText = getLevelText(level);
    
    console.log(`分数: ${score}%, 等级: ${level} (${levelText})`);
    
    // 更新元素
    const scoreEl = document.getElementById(kebabCasePrefix + '-score');
    const barEl = document.getElementById(kebabCasePrefix + '-bar');
    const analysisEl = document.getElementById(kebabCasePrefix + '-analysis');
    
    if (scoreEl) {
        scoreEl.textContent = score + '%';
        console.log(`✅ 分数元素更新成功`);
    } else {
        console.log(`❌ 分数元素未找到: ${kebabCasePrefix}-score`);
    }
    
    if (barEl) {
        barEl.style.width = score + '%';
        console.log(`✅ 进度条元素更新成功`);
    } else {
        console.log(`❌ 进度条元素未找到: ${kebabCasePrefix}-bar`);
    }
    
    if (analysisEl) {
        analysisEl.textContent = analysisTexts[dimensionKey][level];
        console.log(`✅ 分析文本元素更新成功`);
    } else {
        console.log(`❌ 分析文本元素未找到: ${kebabCasePrefix}-analysis`);
    }
}

// 运行测试
function runTest() {
    console.log('\n=== 开始测试详细维度分析修复 ===');
    
    // 设置测试数据
    const testScores = {
        selfInterest: 45,
        greed: 30,
        machiavellianism: 60,
        moralDisengagement: 25,
        narcissism: 55,
        psychologicalEntitlement: 40,
        psychopathy: 35,
        sadism: 20,
        selfCentered: 50,
        malevolence: 15
    };
    
    // 创建测试元素
    setupTestElements();
    
    // 更新测试分数
    Object.assign(userScores, testScores);
    
    console.log('\n测试分数设置完成:');
    Object.entries(testScores).forEach(([key, value]) => {
        console.log(`${key}: ${value}%`);
    });
    
    console.log('\n开始更新各个维度...');
    
    // 测试每个维度
    const dimensions = [
        {key: 'selfInterest', name: '利己主义'},
        {key: 'greed', name: '贪婪'},
        {key: 'machiavellianism', name: '马基雅维利主义'},
        {key: 'moralDisengagement', name: '道德推脱'},
        {key: 'narcissism', name: '自恋'},
        {key: 'psychologicalEntitlement', name: '心理权利'},
        {key: 'psychopathy', name: '精神变态'},
        {key: 'sadism', name: '施虐倾向'},
        {key: 'selfCentered', name: '自我为中心'},
        {key: 'malevolence', name: '恶毒倾向'}
    ];
    
    let successCount = 0;
    let totalCount = dimensions.length;
    
    dimensions.forEach(dim => {
        console.log(`\n--- 测试 ${dim.name} ---`);
        updateDimensionUI(dim.key, dim.name);
        
        // 验证更新结果
        const kebabCasePrefix = getElementId(dim.key);
        const scoreEl = document.getElementById(kebabCasePrefix + '-score');
        const barEl = document.getElementById(kebabCasePrefix + '-bar');
        const analysisEl = document.getElementById(kebabCasePrefix + '-analysis');
        
        const expectedScore = testScores[dim.key] + '%';
        const expectedWidth = testScores[dim.key] + '%';
        const expectedAnalysis = analysisTexts[dim.key][getLevel(testScores[dim.key])];
        
        const scoreOk = scoreEl && scoreEl.textContent === expectedScore;
        const barOk = barEl && barEl.style.width === expectedWidth;
        const analysisOk = analysisEl && analysisEl.textContent === expectedAnalysis;
        
        if (scoreOk && barOk && analysisOk) {
            console.log(`✅ ${dim.name} 测试通过`);
            successCount++;
        } else {
            console.log(`❌ ${dim.name} 测试失败`);
            if (!scoreOk) console.log(`  - 分数不匹配: 期望 ${expectedScore}, 实际 ${scoreEl ? scoreEl.textContent : 'null'}`);
            if (!barOk) console.log(`  - 进度条不匹配: 期望 ${expectedWidth}, 实际 ${barEl ? barEl.style.width : 'null'}`);
            if (!analysisOk) console.log(`  - 分析文本不匹配: 期望 ${expectedAnalysis}, 实际 ${analysisEl ? analysisEl.textContent : 'null'}`);
        }
    });
    
    console.log('\n=== 测试总结 ===');
    console.log(`总测试数: ${totalCount}`);
    console.log(`通过数: ${successCount}`);
    console.log(`失败数: ${totalCount - successCount}`);
    console.log(`通过率: ${((successCount / totalCount) * 100).toFixed(1)}%`);
    
    if (successCount === totalCount) {
        console.log('🎉 所有测试通过！修复成功！');
    } else {
        console.log('⚠️  部分测试失败，需要进一步修复');
    }
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

// 运行测试
runTest();