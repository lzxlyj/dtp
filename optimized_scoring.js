/**
 * 优化的黑暗三角人格测试计分体系
 * 确保分数严格在0-100%范围内，提高计分准确性
 */

class DarkTriangleScoringSystem {
    constructor() {
        // 定义每个维度的权重和题目数量
        this.dimensionConfig = {
            selfInterest: { weight: 1.0, questions: [] },
            greed: { weight: 1.0, questions: [] },
            machiavellianism: { weight: 1.0, questions: [] },
            moralDisengagement: { weight: 1.0, questions: [] },
            narcissism: { weight: 1.0, questions: [] },
            psychologicalEntitlement: { weight: 1.0, questions: [] },
            psychopathy: { weight: 1.0, questions: [] },
            sadism: { weight: 1.0, questions: [] },
            selfCentered: { weight: 1.0, questions: [] },
            malevolence: { weight: 1.0, questions: [] }
        };
        
        // 分数映射配置
        this.scoreMapping = {
            1: 0,    // 完全不同意 -> 0%
            2: 25,   // 不同意 -> 25%
            3: 50,   // 中立 -> 50%
            4: 75,   // 同意 -> 75%
            5: 100   // 完全同意 -> 100%
        };
    }

    /**
     * 分析题目配置，确定每个维度的题目分布
     */
    analyzeQuestionConfiguration(questions) {
        const dimensionStats = {};
        
        // 初始化统计对象
        Object.keys(this.dimensionConfig).forEach(dimension => {
            dimensionStats[dimension] = {
                totalWeight: 0,
                questionCount: 0,
                maxPossibleScore: 0
            };
        });
        
        // 分析每个题目对各维度的贡献
        questions.forEach((question, index) => {
            if (question.dimensions) {
                Object.entries(question.dimensions).forEach(([dimension, weight]) => {
                    if (dimensionStats[dimension] !== undefined) {
                        dimensionStats[dimension].totalWeight += weight;
                        dimensionStats[dimension].questionCount += 1;
                        dimensionStats[dimension].maxPossibleScore += weight * 5; // 最高5分
                    }
                });
            }
        });
        
        return dimensionStats;
    }

    /**
     * 计算标准化的维度分数
     * 确保每个维度的分数都在0-100%范围内
     */
    calculateNormalizedScores(questions, userAnswers) {
        const rawScores = {};
        const maxPossibleScores = {};
        
        // 初始化分数对象
        Object.keys(this.dimensionConfig).forEach(dimension => {
            rawScores[dimension] = 0;
            maxPossibleScores[dimension] = 0;
        });
        
        // 计算原始分数和最大可能分数
        questions.forEach((question, index) => {
            const answer = userAnswers[index];
            if (answer !== null && answer !== undefined && question.dimensions) {
                const mappedScore = this.scoreMapping[answer] || 0;
                
                Object.entries(question.dimensions).forEach(([dimension, weight]) => {
                    if (rawScores[dimension] !== undefined) {
                        // 用户得分 = 映射分数 × 权重
                        rawScores[dimension] += mappedScore * weight;
                        // 最大可能得分 = 100 × 权重
                        maxPossibleScores[dimension] += 100 * weight;
                    }
                });
            }
        });
        
        // 计算标准化分数（0-100%）
        const normalizedScores = {};
        Object.keys(rawScores).forEach(dimension => {
            const rawScore = rawScores[dimension];
            const maxScore = maxPossibleScores[dimension];
            
            if (maxScore > 0) {
                // 标准化到0-100%范围
                normalizedScores[dimension] = Math.round((rawScore / maxScore) * 100);
            } else {
                normalizedScores[dimension] = 0;
            }
            
            // 确保分数在有效范围内
            normalizedScores[dimension] = Math.max(0, Math.min(100, normalizedScores[dimension]));
        });
        
        return {
            scores: normalizedScores,
            rawScores: rawScores,
            maxPossibleScores: maxPossibleScores
        };
    }

    /**
     * 计算黑暗三角总分(D因子)
     * 基于三个核心维度的平均值
     */
    calculateDarkTriadTotal(scores) {
        const darkTriadDimensions = ['machiavellianism', 'psychopathy', 'narcissism'];
        let total = 0;
        let count = 0;
        
        darkTriadDimensions.forEach(dimension => {
            if (scores[dimension] !== undefined) {
                total += scores[dimension];
                count++;
            }
        });
        
        return count > 0 ? Math.round(total / count) : 0;
    }

    /**
     * 计算分数置信度
     * 基于答题完整性和题目分布
     */
    calculateConfidence(questions, userAnswers) {
        const totalQuestions = questions.length;
        const answeredQuestions = userAnswers.filter(answer => answer !== null && answer !== undefined).length;
        const completionRate = answeredQuestions / totalQuestions;
        
        // 分析题目覆盖度
        const dimensionCoverage = {};
        Object.keys(this.dimensionConfig).forEach(dimension => {
            dimensionCoverage[dimension] = 0;
        });
        
        questions.forEach((question, index) => {
            if (userAnswers[index] !== null && userAnswers[index] !== undefined && question.dimensions) {
                Object.keys(question.dimensions).forEach(dimension => {
                    if (dimensionCoverage[dimension] !== undefined) {
                        dimensionCoverage[dimension]++;
                    }
                });
            }
        });
        
        // 计算覆盖度（有多少维度被充分测量）
        const coveredDimensions = Object.values(dimensionCoverage).filter(count => count >= 2).length;
        const totalDimensions = Object.keys(this.dimensionConfig).length;
        const coverageRate = coveredDimensions / totalDimensions;
        
        // 综合置信度
        const confidence = Math.round((completionRate * 0.6 + coverageRate * 0.4) * 100);
        
        return {
            overall: Math.max(0, Math.min(100, confidence)),
            completionRate: completionRate,
            coverageRate: coverageRate,
            dimensionCoverage: dimensionCoverage
        };
    }

    /**
     * 生成详细的分数报告
     */
    generateScoreReport(questions, userAnswers) {
        // 计算标准化分数
        const scoreResult = this.calculateNormalizedScores(questions, userAnswers);
        
        // 计算黑暗三角总分
        const darkTriadTotal = this.calculateDarkTriadTotal(scoreResult.scores);
        
        // 计算置信度
        const confidence = this.calculateConfidence(questions, userAnswers);
        
        // 生成完整报告
        const report = {
            scores: {
                ...scoreResult.scores,
                darkTriadTotal: darkTriadTotal
            },
            rawData: {
                rawScores: scoreResult.rawScores,
                maxPossibleScores: scoreResult.maxPossibleScores
            },
            confidence: confidence,
            statistics: {
                totalQuestions: questions.length,
                answeredQuestions: userAnswers.filter(a => a !== null && a !== undefined).length,
                completionRate: confidence.completionRate
            }
        };
        
        return report;
    }

    /**
     * 验证分数有效性
     */
    validateScores(scores) {
        const issues = [];
        
        Object.entries(scores).forEach(([dimension, score]) => {
            if (typeof score !== 'number' || isNaN(score)) {
                issues.push(`${dimension}: 无效数字`);
            } else if (score < 0 || score > 100) {
                issues.push(`${dimension}: 分数超出范围 (0-100)`);
            }
        });
        
        return {
            isValid: issues.length === 0,
            issues: issues
        };
    }
}

// 使用示例和测试函数
function demonstrateOptimizedScoring() {
    // 创建计分系统实例
    const scoringSystem = new DarkTriangleScoringSystem();
    
    // 示例题目数据（简化版）
    const sampleQuestions = [
        {
            id: 1,
            text: "我喜欢成为关注的焦点",
            dimensions: { narcissism: 1.0, selfInterest: 0.5 }
        },
        {
            id: 2,
            text: "为了成功，我会不择手段",
            dimensions: { machiavellianism: 1.0, malevolence: 0.8 }
        },
        {
            id: 3,
            text: "别人的痛苦让我感到愉悦",
            dimensions: { sadism: 1.0, psychopathy: 0.7 }
        }
    ];
    
    // 示例答案（1-5分）
    const sampleAnswers = [5, 4, 3]; // 完全同意，同意，中立
    
    console.log("=== 优化计分系统演示 ===");
    
    // 生成详细报告
    const report = scoringSystem.generateScoreReport(sampleQuestions, sampleAnswers);
    
    console.log("标准化分数:", report.scores);
    console.log("置信度:", report.confidence);
    console.log("统计信息:", report.statistics);
    
    // 验证分数
    const validation = scoringSystem.validateScores(report.scores);
    console.log("分数验证:", validation);
    
    return report;
}

// 导出给主应用使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkTriangleScoringSystem;
}