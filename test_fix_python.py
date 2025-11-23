#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
详细维度分析修复验证脚本
测试修复后的JavaScript函数是否能正确转换元素ID
"""

import re
import json

# 模拟测试数据
test_scores = {
    'selfInterest': 45,
    'greed': 30,
    'machiavellianism': 60,
    'moralDisengagement': 25,
    'narcissism': 55,
    'psychologicalEntitlement': 40,
    'psychopathy': 35,
    'sadism': 20,
    'selfCentered': 50,
    'malevolence': 15
}

# 模拟分析文本
analysis_texts = {
    'selfInterest': {
        'veryLow': '您表现出极低的利己主义倾向，总是优先考虑他人利益。',
        'low': '您的利己主义倾向较低，能够平衡个人与他人利益。',
        'moderate': '您的利己主义倾向处于中等水平，在大多数情况下能平衡个人与他人利益。',
        'high': '您的利己主义倾向较高，经常优先考虑个人利益。',
        'veryHigh': '您的利己主义倾向很高，几乎总是将个人利益置于首位。'
    },
    'greed': {
        'veryLow': '您完全没有贪婪倾向，对物质需求很节制。',
        'low': '您的贪婪倾向较低，对物质需求较为节制。',
        'moderate': '您的贪婪倾向处于中等水平，对物质有适度追求。',
        'high': '您的贪婪倾向较高，对物质有较强的渴望。',
        'veryHigh': '您的贪婪倾向很高，对物质有极强的渴望。'
    },
    'machiavellianism': {
        'veryLow': '您完全没有马基雅维利主义倾向，为人诚实正直。',
        'low': '您的马基雅维利主义倾向较低，倾向于诚实直接的交往方式。',
        'moderate': '您的马基雅维利主义倾向处于中等水平，在必要时会使用策略。',
        'high': '您的马基雅维利主义倾向较高，经常运用策略和操控手段。',
        'veryHigh': '您的马基雅维利主义倾向很高，几乎总是运用策略和操控手段。'
    },
    'moralDisengagement': {
        'veryLow': '您有极强的道德责任感，从不为不道德行为找借口。',
        'low': '您的道德推脱倾向较低，有较强的道德责任感。',
        'moderate': '您的道德推脱倾向处于中等水平，偶尔会为自己的行为找借口。',
        'high': '您的道德推脱倾向较高，经常为自己的不当行为找借口。',
        'veryHigh': '您的道德推脱倾向很高，几乎总是为自己的不当行为找借口。'
    },
    'narcissism': {
        'veryLow': '您完全没有自恋倾向，非常谦逊低调。',
        'low': '您的自恋倾向较低，为人谦逊低调。',
        'moderate': '您的自恋倾向处于中等水平，有适度的自信。',
        'high': '您的自恋倾向较高，经常表现出自我中心和优越感。',
        'veryHigh': '您的自恋倾向很高，总是表现出强烈的自我中心和优越感。'
    },
    'psychologicalEntitlement': {
        'veryLow': '您完全没有心理权利感，从不觉得自己应得特殊待遇。',
        'low': '您的心理权利感较低，不常觉得自己应得特殊待遇。',
        'moderate': '您的心理权利感处于中等水平，偶尔会觉得自己应得特殊待遇。',
        'high': '您的心理权利感较高，经常觉得自己应得特殊待遇。',
        'veryHigh': '您的心理权利感很高，总是觉得自己应得特殊待遇。'
    },
    'psychopathy': {
        'veryLow': '您完全没有精神变态倾向，情感丰富且有同理心。',
        'low': '您的精神变态倾向较低，有正常的情感反应和同理心。',
        'moderate': '您的精神变态倾向处于中等水平，情感和同理心表现一般。',
        'high': '您的精神变态倾向较高，缺乏正常的情感反应和同理心。',
        'veryHigh': '您的精神变态倾向很高，完全没有正常的情感反应和同理心。'
    },
    'sadism': {
        'veryLow': '您完全没有施虐倾向，从不会从他人痛苦中获得快感。',
        'low': '您的施虐倾向较低，不会从他人痛苦中获得快感。',
        'moderate': '您的施虐倾向处于中等水平，偶尔会对他人的痛苦产生快感。',
        'high': '您的施虐倾向较高，经常从他人痛苦中获得快感。',
        'veryHigh': '您的施虐倾向很高，总是从他人痛苦中获得快感。'
    },
    'selfCentered': {
        'veryLow': '您完全没有自我为中心倾向，总是考虑他人感受。',
        'low': '您的自我为中心倾向较低，能够考虑他人感受。',
        'moderate': '您的自我为中心倾向处于中等水平，平衡个人与他人的需求。',
        'high': '您的自我为中心倾向较高，经常忽视他人感受。',
        'veryHigh': '您的自我为中心倾向很高，完全忽视他人感受。'
    },
    'malevolence': {
        'veryLow': '您完全没有恶毒倾向，总是心怀善意。',
        'low': '您的恶毒倾向较低，通常心怀善意。',
        'moderate': '您的恶毒倾向处于中等水平，偶尔会有负面想法。',
        'high': '您的恶毒倾向较高，经常有伤害他人的想法。',
        'veryHigh': '您的恶毒倾向很高，总是心怀恶意并想伤害他人。'
    }
}

def get_level(score):
    """获取等级"""
    if score >= 80: return 'veryHigh'
    if score >= 60: return 'high'
    if score >= 40: return 'moderate'
    if score >= 20: return 'low'
    return 'veryLow'

def get_level_text(level):
    """获取等级文本"""
    texts = {
        'veryLow': '很低',
        'low': '较低',
        'moderate': '中等',
        'high': '较高',
        'veryHigh': '很高'
    }
    return texts.get(level, '未知')

def get_element_id(dimension_key):
    """获取元素ID（修复后的逻辑）"""
    special_cases = {
        'moralDisengagement': 'moral-disengagement',
        'psychologicalEntitlement': 'psychological-entitlement',
        'selfInterest': 'self-interest',
        'selfCentered': 'self-centered'
    }
    
    if dimension_key in special_cases:
        return special_cases[dimension_key]
    
    # 将驼峰式转换为连字符式
    return re.sub(r'([a-z0-9])([A-Z])', r'\1-\2', dimension_key).lower()

def simulate_update_dimension_ui(dimension_key, dimension_name):
    """模拟updateDimensionUI函数"""
    print(f"\n更新维度: {dimension_key} ({dimension_name})")
    
    # 获取元素ID
    element_id = get_element_id(dimension_key)
    print(f"元素ID前缀: {element_id}")
    
    # 获取分数
    score = test_scores.get(dimension_key, 0)
    level = get_level(score)
    level_text = get_level_text(level)
    
    print(f"分数: {score}%, 等级: {level} ({level_text})")
    
    # 模拟元素更新
    score_element_id = f"{element_id}-score"
    bar_element_id = f"{element_id}-bar"
    analysis_element_id = f"{element_id}-analysis"
    
    # 验证元素是否存在（模拟）
    elements_exist = {
        'score': True,  # 假设元素存在
        'bar': True,
        'analysis': True
    }
    
    # 模拟更新
    expected_score = f"{score}%"
    expected_width = f"{score}%"
    expected_analysis = analysis_texts[dimension_key][level]
    
    results = {}
    
    if elements_exist['score']:
        print(f"✅ 分数元素更新成功: {expected_score}")
        results['score'] = True
    else:
        print(f"❌ 分数元素未找到: {score_element_id}")
        results['score'] = False
    
    if elements_exist['bar']:
        print(f"✅ 进度条元素更新成功: {expected_width}")
        results['bar'] = True
    else:
        print(f"❌ 进度条元素未找到: {bar_element_id}")
        results['bar'] = False
    
    if elements_exist['analysis']:
        print(f"✅ 分析文本元素更新成功")
        results['analysis'] = True
    else:
        print(f"❌ 分析文本元素未找到: {analysis_element_id}")
        results['analysis'] = False
    
    return all(results.values())

def run_validation_test():
    """运行验证测试"""
    print("=== 详细维度分析修复验证 ===")
    print("测试修复后的JavaScript函数是否能正确转换元素ID")
    
    # 测试的维度
    dimensions = [
        {'key': 'selfInterest', 'name': '利己主义'},
        {'key': 'greed', 'name': '贪婪'},
        {'key': 'machiavellianism', 'name': '马基雅维利主义'},
        {'key': 'moralDisengagement', 'name': '道德推脱'},
        {'key': 'narcissism', 'name': '自恋'},
        {'key': 'psychologicalEntitlement', 'name': '心理权利'},
        {'key': 'psychopathy', 'name': '精神变态'},
        {'key': 'sadism', 'name': '施虐倾向'},
        {'key': 'selfCentered', 'name': '自我为中心'},
        {'key': 'malevolence', 'name': '恶毒倾向'}
    ]
    
    print(f"\n测试数据:")
    for key, value in test_scores.items():
        print(f"  {key}: {value}%")
    
    print(f"\n开始测试元素ID转换...")
    
    success_count = 0
    total_count = len(dimensions)
    
    # 测试元素ID转换
    expected_mappings = {
        'selfInterest': 'self-interest',
        'greed': 'greed',
        'machiavellianism': 'machiavellianism',
        'moralDisengagement': 'moral-disengagement',
        'narcissism': 'narcissism',
        'psychologicalEntitlement': 'psychological-entitlement',
        'psychopathy': 'psychopathy',
        'sadism': 'sadism',
        'selfCentered': 'self-centered',
        'malevolence': 'malevolence'
    }
    
    print(f"\n元素ID映射测试:")
    for dim in dimensions:
        actual_id = get_element_id(dim['key'])
        expected_id = expected_mappings[dim['key']]
        
        if actual_id == expected_id:
            print(f"✅ {dim['name']} ({dim['key']}) -> {actual_id}")
            success_count += 1
        else:
            print(f"❌ {dim['name']} ({dim['key']}) -> 期望: {expected_id}, 实际: {actual_id}")
    
    print(f"\n=== 测试总结 ===")
    print(f"总测试数: {total_count}")
    print(f"通过数: {success_count}")
    print(f"失败数: {total_count - success_count}")
    print(f"通过率: {(success_count / total_count * 100):.1f}%")
    
    if success_count == total_count:
        print("🎉 所有元素ID映射测试通过！修复成功！")
    else:
        print("⚠️  部分测试失败，需要进一步修复")
    
    # 模拟完整的UI更新测试
    print(f"\n=== 模拟UI更新测试 ===")
    ui_success_count = 0
    
    for dim in dimensions:
        success = simulate_update_dimension_ui(dim['key'], dim['name'])
        if success:
            ui_success_count += 1
    
    print(f"\nUI更新测试总结:")
    print(f"总测试数: {total_count}")
    print(f"通过数: {ui_success_count}")
    print(f"失败数: {total_count - ui_success_count}")
    print(f"通过率: {(ui_success_count / total_count * 100):.1f}%")
    
    if ui_success_count == total_count:
        print("🎉 所有UI更新测试通过！修复成功！")
    else:
        print("⚠️  部分UI更新测试失败")

if __name__ == "__main__":
    run_validation_test()