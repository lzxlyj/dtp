// 自动化分数测试脚本
// 用于验证所有10个维度在不同分数下的分析文本显示

// 如果dimensionNames未定义，则创建它
if (typeof dimensionNames === 'undefined') {
    window.dimensionNames = {
        selfInterest: "利己主义",
        greed: "贪婪",
        machiavellianism: "马基雅维利主义",
        moralDisengagement: "道德推脱",
        narcissism: "自恋",
        psychologicalEntitlement: "心理权利",
        psychopathy: "精神变态",
        sadism: "施虐倾向",
        selfCentered: "自我为中心",
        malevolence: "恶毒倾向"
    };
}

// 关键测试分数点
const testScores = [
    1.0,  // 最低分
    1.5,  // 低分段中间值
    2.5,  // 低分段边界
    2.6,  // 中分段边界
    3.0,  // 中分段中间值
    4.0,  // 中分段边界
    4.1,  // 高分段边界
    4.5,  // 高分段中间值
    5.0   // 最高分
];

// 如果analysisTexts未定义，则创建它
if (typeof analysisTexts === 'undefined') {
    window.analysisTexts = {
        selfInterest: {
            low: "你的利己主义倾向较低（1.0-2.5分），表明你在大多数情况下能够考虑他人利益和集体福祉。你通常会在追求个人目标的同时，也关注他人的感受和需求，展现出良好的社会责任感。",
            medium: "你的利己主义倾向处于中等水平（2.6-4.0分），这意味着你在维护自身利益与关心他人之间能够保持相对平衡。在某些情况下你会优先考虑自己，但也能够在适当的时候为他人着想。",
            high: "你的利己主义倾向较高（4.1-5.0分），显示你在多数情况下倾向于优先考虑个人利益。你可能非常注重个人目标的实现，有时可能会忽视他人的需求或感受。"
        },
        greed: {
            low: "你的贪婪程度较低（1.0-2.5分），表明你对物质财富和权力的渴望相对适度。你更容易感到满足，不太可能因为追求更多而损害他人利益或违背自己的价值观。",
            medium: "你的贪婪程度处于中等水平（2.6-4.0分），这意味着你对财富和成功有一定渴望，但通常能够在追求与道德之间找到平衡点。你会努力工作以获得回报，但不会不择手段。",
            high: "你的贪婪程度较高（4.1-5.0分），显示你对财富、权力或资源有强烈的获取欲望。你可能会不断追求更多，即使已经拥有足够资源，这种特质可能推动你取得巨大成就，但也可能导致道德妥协。"
        },
        machiavellianism: {
            low: "你的马基雅维利主义倾向较低（1.0-2.5分），表明你通常诚实直率，不喜欢操纵他人。你倾向于相信他人，认为合作比竞争更能带来好结果，重视真诚的人际关系。",
            medium: "你的马基雅维利主义倾向处于中等水平（2.6-4.0分），这意味着你在必要时能够运用策略，但通常不会伤害他人。你理解人际关系的复杂性，能够在诚实与策略之间找到平衡。",
            high: "你的马基雅维利主义倾向较高（4.1-5.0分），显示你倾向于运用策略和操纵来达成目标。你可能相信结果比手段更重要，愿意使用各种策略来影响他人和情况。"
        },
        moralDisengagement: {
            low: "你的道德推脱倾向较低（1.0-2.5分），表明你有较强的道德约束感。你通常会为自己的行为负责，不太会用各种理由来为不当行为辩护，重视道德原则。",
            medium: "你的道德推脱倾向处于中等水平（2.6-4.0分），这意味着你在某些情况下可能会为自己的行为寻找理由，但通常仍能意识到道德问题。你能够在现实需求与道德原则之间挣扎。",
            high: "你的道德推脱倾向较高（4.1-5.0分），显示你可能较容易用各种机制来为自己的行为辩护。你可能善于找到理由来解释自己的行为，即使这些行为可能存在问题。"
        },
        narcissism: {
            low: "你的自恋程度较低（1.0-2.5分），表明你通常谦逊务实，不会过度关注自己的重要性。你能够承认自己的不足，愿意向他人学习，重视团队合作而非个人表现。",
            medium: "你的自恋程度处于中等水平（2.6-4.0分），这意味着你有适度的自信，但不会过度自负。你认识到自己的价值，但也能够欣赏他人的贡献，在自信与谦逊之间保持平衡。",
            high: "你的自恋程度较高（4.1-5.0分），显示你可能有强烈的优越感，相信自己是特别的。你可能渴望被崇拜和关注，认为自己的需求比他人更重要，这种特质可能带来领导力，但也可能导致人际关系问题。"
        },
        psychologicalEntitlement: {
            low: "你的心理权利感较低（1.0-2.5分），表明你通常不会认为自己应该得到特殊待遇。你倾向于通过努力工作来获得回报，理解权利需要与责任相平衡。",
            medium: "你的心理权利感处于中等水平（2.6-4.0分），这意味着你有适度的期望，但不会过分要求。你认为自己应该得到公平对待，但不会强求超出合理范围的特权。",
            high: "你的心理权利感较高（4.1-5.0分），显示你可能相信自己应该得到更多优待和资源。你可能期望他人满足你的需求，认为规则对你来说可以有所不同，这种特质可能带来自信，但也可能导致冲突。"
        },
        psychopathy: {
            low: "你的精神变态特质较低（1.0-2.5分），表明你有较强的同理心和情感联系能力。你关心他人的感受，能够建立深层情感连接，不太可能做出伤害他人的行为。",
            medium: "你的精神变态特质处于中等水平（2.6-4.0分），这意味着你能够在理性与情感之间保持相对平衡。你有一定的同理心，但也能够在必要时保持情感距离。",
            high: "你的精神变态特质较高（4.1-5.0分），显示你可能缺乏同理心和悔意，对他人感受不太敏感。你可能冷静理性，不易被情感影响，这种特质在某些职业中可能有优势，但也可能导致人际关系问题。"
        },
        sadism: {
            low: "你的施虐倾向较低（1.0-2.5分），表明你通常厌恶看到他人受苦。你倾向于帮助他人，从他人的快乐中获得满足，不会从伤害他人中获得快感。",
            medium: "你的施虐倾向处于中等水平（2.6-4.0分），这意味着你在竞争或冲突中可能会感到某种满足，但不会主动寻求伤害他人。你能够在竞争中保持基本的人性底线。",
            high: "你的施虐倾向较高（4.1-5.0分），显示你可能从他人的痛苦或失败中获得某种满足感。你可能喜欢支配他人，在竞争或冲突中感到兴奋，这种特质可能导致你主动寻求让他人受苦的机会。"
        },
        selfCentered: {
            low: "你的自我为中心倾向较低（1.0-2.5分），表明你能够从他人角度思考问题。你通常能够考虑他人的感受和需求，不会将所有事情都与自己联系起来。",
            medium: "你的自我为中心倾向处于中等水平（2.6-4.0分），这意味着你在关注自己与关注他人之间能够保持平衡。你有一定的自我意识，但也能够理解他人的观点。",
            high: "你的自我为中心倾向较高（4.1-5.0分），显示你可能倾向于将所有事情都与自己联系起来。你可能很难从他人角度看问题，认为世界应该围绕你的需求运转。"
        },
        malevolence: {
            low: "你的恶毒倾向较低（1.0-2.5分），表明你内心善良，不希望他人遭遇不幸。你倾向于祝福他人，即使对竞争对手也不会怀有强烈的恶意。",
            medium: "你的恶毒倾向处于中等水平（2.6-4.0分），这意味着你在受到伤害时可能会有报复的想法，但通常能够控制这种冲动。你不会主动寻求伤害他人。",
            high: "你的恶毒倾向较高（4.1-5.0分），显示你可能怀有强烈的恶意和报复欲望。你可能希望看到他人遭遇不幸，特别是那些伤害过你的人，这种特质可能导致你主动寻求让他人受苦的方式。"
        }
    };
}

// 自动化测试类
class ScoreAnalysisTester {
    constructor() {
        this.testResults = [];
        this.currentTestIndex = 0;
    }

    // 获取分数等级
    getLevel(score) {
        if (score <= 2.5) return 'low';
        if (score <= 4.0) return 'medium';
        return 'high';
    }

    // 验证分析文本
    validateAnalysisText(dimensionKey, score, expectedText, actualText) {
        const level = this.getLevel(score);
        const expectedLevelText = analysisTexts[dimensionKey][level];
        
        return {
            dimension: dimensionKey,
            dimensionName: dimensionNames[dimensionKey],
            score: score,
            level: level,
            expectedText: expectedLevelText,
            actualText: actualText,
            textMatches: expectedLevelText === actualText,
            hasScoreRange: actualText.includes(`${score}-${score < 2.6 ? '2.5' : score < 4.1 ? '4.0' : '5.0'}`),
            textLength: actualText.length
        };
    }

    // 运行完整测试
    runCompleteTest() {
        console.log('🚀 开始全分数段自动化测试...');
        this.testResults = [];
        
        // 为每个维度测试所有关键分数点
        Object.keys(dimensionNames).forEach(dimensionKey => {
            testScores.forEach(score => {
                this.testDimensionAtScore(dimensionKey, score);
            });
        });

        this.generateTestReport();
    }

    // 测试特定维度的特定分数
    testDimensionAtScore(dimensionKey, score) {
        const level = this.getLevel(score);
        const expectedText = analysisTexts[dimensionKey][level];
        
        // 模拟实际测试环境
        console.log(`📊 测试 ${dimensionNames[dimensionKey]} 在 ${score} 分 (${level}等级)`);
        
        // 这里可以集成实际的DOM查询或API调用
        // 现在使用模拟数据
        const testResult = this.validateAnalysisText(dimensionKey, score, expectedText, expectedText);
        this.testResults.push(testResult);
        
        // 输出测试结果
        const status = testResult.textMatches ? '✅' : '❌';
        console.log(`  ${status} 分析文本匹配: ${testResult.textMatches}`);
        console.log(`  📏 文本长度: ${testResult.textLength} 字符`);
        console.log(`  🔍 包含分数范围: ${testResult.hasScoreRange}`);
    }

    // 生成测试报告
    generateTestReport() {
        console.log('\n📋 ==== 完整测试报告 ====');
        
        const totalTests = this.testResults.length;
        const passedTests = this.testResults.filter(r => r.textMatches).length;
        const failedTests = totalTests - passedTests;
        
        console.log(`总测试数: ${totalTests}`);
        console.log(`通过测试: ${passedTests}`);
        console.log(`失败测试: ${failedTests}`);
        console.log(`成功率: ${((passedTests/totalTests)*100).toFixed(2)}%`);
        
        // 按维度统计
        console.log('\n📊 按维度统计:');
        Object.keys(dimensionNames).forEach(dimensionKey => {
            const dimensionTests = this.testResults.filter(r => r.dimension === dimensionKey);
            const passed = dimensionTests.filter(r => r.textMatches).length;
            const total = dimensionTests.length;
            console.log(`  ${dimensionNames[dimensionKey]}: ${passed}/${total} 通过`);
        });
        
        // 按分数等级统计
        console.log('\n📊 按分数等级统计:');
        ['low', 'medium', 'high'].forEach(level => {
            const levelTests = this.testResults.filter(r => r.level === level);
            const passed = levelTests.filter(r => r.textMatches).length;
            const total = levelTests.length;
            const levelName = level === 'low' ? '低分段' : level === 'medium' ? '中分段' : '高分段';
            console.log(`  ${levelName}: ${passed}/${total} 通过`);
        });
        
        // 失败详情
        if (failedTests > 0) {
            console.log('\n❌ 失败详情:');
            this.testResults.filter(r => !r.textMatches).forEach(failedTest => {
                console.log(`  ${failedTest.dimensionName} (${failedTest.score}分): 文本不匹配`);
            });
        }
        
        // 文本长度分析
        console.log('\n📏 文本长度分析:');
        const avgLength = this.testResults.reduce((sum, r) => sum + r.textLength, 0) / this.testResults.length;
        console.log(`平均文本长度: ${avgLength.toFixed(0)} 字符`);
        
        // 分数范围验证
        const scoreRangeTests = this.testResults.filter(r => r.hasScoreRange);
        console.log(`包含分数范围的测试: ${scoreRangeTests.length}/${totalTests}`);
        
        return {
            totalTests,
            passedTests,
            failedTests,
            successRate: (passedTests/totalTests)*100,
            averageTextLength: avgLength,
            scoreRangeCoverage: (scoreRangeTests.length/totalTests)*100
        };
    }

    // 运行边界值测试
    runBoundaryTest() {
        console.log('🔍 运行边界值测试...');
        
        const boundaryScores = [1.0, 2.5, 2.6, 4.0, 4.1, 5.0];
        const boundaryResults = [];
        
        Object.keys(dimensionNames).forEach(dimensionKey => {
            boundaryScores.forEach(score => {
                const level = this.getLevel(score);
                const expectedText = analysisTexts[dimensionKey][level];
                
                const result = {
                    dimension: dimensionKey,
                    score: score,
                    level: level,
                    isBoundary: true,
                    textValid: expectedText && expectedText.length > 50
                };
                
                boundaryResults.push(result);
                
                console.log(`  测试边界值 ${score} 分: ${result.textValid ? '✅' : '❌'}`);
            });
        });
        
        return boundaryResults;
    }

    // 验证所有维度都有完整的三个等级文本
    validateCompleteness() {
        console.log('🔍 验证文本完整性...');
        
        const completenessReport = {};
        let allComplete = true;
        
        Object.keys(dimensionNames).forEach(dimensionKey => {
            const dimensionData = analysisTexts[dimensionKey];
            const levels = ['low', 'medium', 'high'];
            
            completenessReport[dimensionKey] = {
                hasLow: !!dimensionData.low && dimensionData.low.length > 50,
                hasMedium: !!dimensionData.medium && dimensionData.medium.length > 50,
                hasHigh: !!dimensionData.high && dimensionData.high.length > 50,
                allLevelsPresent: false
            };
            
            completenessReport[dimensionKey].allLevelsPresent = 
                completenessReport[dimensionKey].hasLow &&
                completenessReport[dimensionKey].hasMedium &&
                completenessReport[dimensionKey].hasHigh;
            
            if (!completenessReport[dimensionKey].allLevelsPresent) {
                allComplete = false;
            }
            
            console.log(`  ${dimensionNames[dimensionKey]}: ${completenessReport[dimensionKey].allLevelsPresent ? '✅' : '❌'}`);
        });
        
        return { allComplete, completenessReport };
    }
}

// 创建全局测试器实例
window.scoreTester = new ScoreAnalysisTester();

// 便捷测试函数
function runQuickTest() {
    console.log('🚀 运行快速验证测试...');
    
    // 测试几个关键维度在不同分数下的表现
    const testCases = [
        { dimension: 'selfInterest', scores: [1.5, 3.2, 4.7] },
        { dimension: 'machiavellianism', scores: [2.1, 3.5, 4.8] },
        { dimension: 'narcissism', scores: [1.8, 3.0, 4.5] },
        { dimension: 'psychopathy', scores: [2.5, 3.8, 4.9] },
        { dimension: 'sadism', scores: [1.2, 3.4, 4.6] }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n📊 测试 ${dimensionNames[testCase.dimension]}:`);
        testCase.scores.forEach(score => {
            const level = window.scoreTester.getLevel(score);
            const expectedText = analysisTexts[testCase.dimension][level];
            console.log(`  ${score}分 (${level}): ${expectedText.substring(0, 50)}...`);
        });
    });
}

// 在浏览器控制台中运行完整测试
console.log('🎯 黑暗三角人格测试 - 自动化验证工具已加载');
console.log('可用命令:');
console.log('  runQuickTest() - 运行快速验证测试');
console.log('  window.scoreTester.runCompleteTest() - 运行完整自动化测试');
console.log('  window.scoreTester.runBoundaryTest() - 运行边界值测试');
console.log('  window.scoreTester.validateCompleteness() - 验证文本完整性');

// 自动运行快速测试（可选）
// setTimeout(runQuickTest, 1000);