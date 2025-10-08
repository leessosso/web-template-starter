import { LoveType, LoveTypeCode } from './types';

// 16가지 새로운 연애 유형 데이터 (L/F, C/A, R/P, O/E)
export const newLoveTypes: Record<LoveTypeCode, LoveType> = {
  LCAO: {
    code: 'LCAO',
    title: '리더십 있는 애정표현가',
    nickname: '적극적 로맨틱',
    description: '연애에서 주도권을 잡고 적극적으로 애정을 표현하는 타입입니다. 현실적이면서도 낙관적인 성향을 가지고 있어, 연인을 이끌면서도 따뜻한 사랑을 나눕니다. 데이트 계획을 세우고 연인을 놀라게 하는 것을 좋아하며, 관계의 발전을 위해 적극적으로 노력합니다.',
    loveStyle: '주도적이고 애정표현이 풍부한 연애',
    strengths: ['적극적인 리더십', '풍부한 애정표현', '현실적 판단', '낙관적 성격', '창의적인 데이트 아이디어', '연인의 성장을 도움'],
    challenges: ['지나친 주도권', '감정 기복', '현실성 부족', '상대방의 자율성 침해'],
    compatibleTypes: ['FFAP', 'FFRP', 'FCAO', 'FCAP'],
    incompatibleTypes: ['LFRO', 'FFRO', 'FCRO'],
    advice: '연인을 이끌되, 상대방의 의견도 충분히 들어주세요. 때로는 연인이 주도권을 잡을 수 있도록 배려하는 것도 중요합니다.',
    color: 'from-pink-400 to-rose-500'
  },
  LCAP: {
    code: 'LCAP',
    title: '열정적인 리더',
    nickname: '열정적 주도자',
    description: '연애에서 주도권을 잡고 열정적으로 애정을 표현하는 타입입니다. 감정적이고 열정적인 연애를 추구하며, 연인과의 깊은 감정적 교감을 중시합니다. 사랑에 빠지면 모든 것을 쏟아붓는 스타일로, 연인을 위해 로맨틱한 서프라이즈를 준비하는 것을 좋아합니다.',
    loveStyle: '열정적이고 주도적인 연애',
    strengths: ['강한 리더십', '열정적 애정표현', '감정적 교감', '적극적 태도', '로맨틱한 서프라이즈', '깊은 감정 표현'],
    challenges: ['감정 기복', '지나친 열정', '현실성 부족', '질투심', '감정적 소모'],
    compatibleTypes: ['FFAP', 'FCRP', 'LCRO', 'FCAP'],
    incompatibleTypes: ['LFRO', 'FFRO', 'FCRO'],
    advice: '열정도 좋지만, 연인의 감정도 고려하여 균형을 맞추세요. 때로는 차분한 시간도 필요합니다.',
    color: 'from-red-400 to-pink-500'
  },
  LCRO: {
    code: 'LCRO',
    title: '현실적 애정표현가',
    nickname: '현실적 로맨틱',
    description: '연애에서 주도권을 잡고 현실적으로 애정을 표현하는 타입입니다. 낙관적이면서도 현실적인 연애를 추구하며, 안정적이고 지속 가능한 관계를 중시합니다. 연인과의 미래를 구체적으로 계획하고, 실용적인 사랑을 나누는 것을 좋아합니다.',
    loveStyle: '현실적이고 주도적인 연애',
    strengths: ['현실적 리더십', '안정적 애정표현', '낙관적 성격', '체계적 계획', '신뢰할 수 있는 파트너', '장기적 관계 비전'],
    challenges: ['감정 표현 부족', '지나친 현실성', '유연성 부족', '로맨틱함 부족'],
    compatibleTypes: ['FFRO', 'FCAO', 'LCAO', 'FCRO'],
    incompatibleTypes: ['LFAP', 'FFAP', 'FCAP'],
    advice: '현실적인 계획도 좋지만, 연인과의 감정적 교감도 중요합니다. 때로는 즉흥적인 로맨틱한 순간도 만들어보세요.',
    color: 'from-blue-400 to-indigo-500'
  },
  LCRP: {
    code: 'LCRP',
    title: '열정적 현실주의자',
    nickname: '열정적 계획가',
    description: '연애에서 주도권을 잡고 현실적으로 애정을 표현하는 타입입니다. 열정적이면서도 현실적인 연애를 추구하며, 완벽한 관계를 만들기 위해 노력합니다. 연인과의 미래를 구체적으로 계획하면서도, 감정적으로는 열정적인 사랑을 나누는 균형잡힌 스타일입니다.',
    loveStyle: '열정적이고 현실적인 연애',
    strengths: ['강한 리더십', '현실적 애정표현', '열정적 태도', '체계적 계획', '완벽한 데이트 준비', '균형잡힌 관계 관리'],
    challenges: ['감정 기복', '지나친 완벽주의', '유연성 부족', '스트레스 과다', '자발성 부족'],
    compatibleTypes: ['FFRP', 'FCRP', 'LCAP', 'LCAO'],
    incompatibleTypes: ['LFAP', 'FFAP', 'FCAO'],
    advice: '완벽한 계획도 좋지만, 연인과의 자발적인 순간도 소중히 여기세요. 때로는 계획을 버리고 즉흥적으로 즐기는 것도 좋습니다.',
    color: 'from-purple-400 to-indigo-500'
  },
  LFAO: {
    code: 'LFAO',
    title: '수용적 리더',
    nickname: '배려심 깊은 주도자',
    description: '연애에서 주도권을 잡지만 상대방을 수용하는 타입입니다. 낙관적이면서도 배려심이 깊어, 연인의 의견을 존중하면서도 관계를 이끌어갑니다. 조화로운 관계를 중시하며, 연인과의 갈등을 최소화하려고 노력하는 따뜻한 리더십을 보입니다.',
    loveStyle: '배려심 깊고 주도적인 연애',
    strengths: ['배려심 깊은 리더십', '수용적 태도', '낙관적 성격', '안정적 관계', '조화로운 관계 유지', '연인의 의견 존중'],
    challenges: ['자기주장 부족', '지나친 배려', '결정력 부족', '갈등 회피'],
    compatibleTypes: ['FFAO', 'FCAO', 'LCAO', 'FCAP'],
    incompatibleTypes: ['LFAP', 'FFAP', 'LCAP'],
    advice: '상대방을 배려하는 것도 좋지만, 자신의 의견도 적극적으로 표현하세요. 때로는 확고한 입장을 보이는 것도 필요합니다.',
    color: 'from-green-400 to-emerald-500'
  },
  LFAP: {
    code: 'LFAP',
    title: '열정적 수용자',
    nickname: '열정적 배려자',
    description: '연애에서 주도권을 잡지만 상대방을 수용하는 타입입니다. 열정적이면서도 배려심이 깊어, 연인과의 감정적 교감을 중시하면서도 관계를 이끌어갑니다. 연인의 감정에 민감하게 반응하며, 따뜻하고 열정적인 사랑을 나누는 것을 좋아합니다.',
    loveStyle: '열정적이고 배려심 깊은 연애',
    strengths: ['열정적 리더십', '수용적 태도', '감정적 교감', '배려심', '연인의 감정 이해', '따뜻한 사랑 표현'],
    challenges: ['감정 기복', '자기주장 부족', '지나친 배려', '감정적 소모'],
    compatibleTypes: ['FFAP', 'FCAO', 'LFRO', 'LFAO'],
    incompatibleTypes: ['LCAP', 'FFRP', 'LCRP'],
    advice: '상대방을 배려하는 것도 좋지만, 자신의 감정도 솔직하게 표현하세요. 때로는 자신의 욕구도 우선시하는 것이 중요합니다.',
    color: 'from-orange-400 to-red-500'
  },
  LFRO: {
    code: 'LFRO',
    title: '현실적 수용자',
    nickname: '현실적 배려자',
    description: '연애에서 주도권을 잡지만 상대방을 수용하는 타입입니다. 현실적이면서도 배려심이 깊어, 안정적이고 지속 가능한 관계를 중시합니다. 연인의 의견을 존중하면서도 현실적인 계획을 세우는 균형잡힌 리더십을 보입니다.',
    loveStyle: '현실적이고 배려심 깊은 연애',
    strengths: ['현실적 리더십', '수용적 태도', '안정적 관계', '체계적 계획', '신뢰할 수 있는 파트너', '균형잡힌 의사결정'],
    challenges: ['감정 표현 부족', '자기주장 부족', '지나친 현실성', '로맨틱함 부족'],
    compatibleTypes: ['FFRO', 'FCAO', 'LFAP', 'LCRO'],
    incompatibleTypes: ['LCAP', 'FFAP', 'FCAP'],
    advice: '현실적인 계획도 좋지만, 연인과의 감정적 교감도 필요합니다. 때로는 감정을 표현하고 로맨틱한 순간을 만들어보세요.',
    color: 'from-teal-400 to-cyan-500'
  },
  LFRP: {
    code: 'LFRP',
    title: '열정적 현실주의 수용자',
    nickname: '열정적 현실 배려자',
    description: '연애에서 주도권을 잡지만 상대방을 수용하는 타입입니다. 열정적이면서도 현실적이고 배려심이 깊습니다.',
    loveStyle: '열정적이고 현실적인 배려 연애',
    strengths: ['열정적 리더십', '수용적 태도', '현실적 판단', '배려심'],
    challenges: ['감정 기복', '자기주장 부족', '지나친 완벽주의'],
    compatibleTypes: ['FFRP', 'FCRP', 'LFAP'],
    incompatibleTypes: ['LCAP', 'FFAP'],
    advice: '완벽한 관계를 추구하는 것도 좋지만, 때로는 자연스러운 모습도 보여주세요.',
    color: 'from-indigo-400 to-purple-500'
  },
  FCAO: {
    code: 'FCAO',
    title: '따뜻한 팔로워',
    nickname: '애정표현 팔로워',
    description: '연애에서 상대방을 따라가며 애정을 표현하는 타입입니다. 낙관적이면서도 따뜻한 성향을 가지고 있어, 연인의 리더십을 존중하면서도 풍부한 애정표현으로 관계를 풍요롭게 만듭니다. 조화로운 관계를 중시하며, 연인을 행복하게 만드는 것을 최우선으로 생각합니다.',
    loveStyle: '따뜻하고 수용적인 연애',
    strengths: ['따뜻한 애정표현', '수용적 태도', '낙관적 성격', '조화로운 관계', '연인을 행복하게 만드는 능력', '충성심'],
    challenges: ['자기주장 부족', '지나친 수용', '결정력 부족', '의존성'],
    compatibleTypes: ['LCAO', 'LFAP', 'FFAO', 'LFAO'],
    incompatibleTypes: ['LCAP', 'FFRP', 'LCRP'],
    advice: '상대방을 따라가는 것도 좋지만, 자신의 의견도 적극적으로 표현하세요. 때로는 자신만의 개성도 보여주는 것이 중요합니다.',
    color: 'from-pink-300 to-rose-400'
  },
  FCAP: {
    code: 'FCAP',
    title: '열정적 팔로워',
    nickname: '열정적 애정표현가',
    description: '연애에서 상대방을 따라가며 열정적으로 애정을 표현하는 타입입니다. 감정적이고 열정적인 연애를 추구하며, 연인의 리더십을 존중하면서도 자신만의 열정적인 사랑을 표현합니다. 연인과의 깊은 감정적 교감을 중시하고, 사랑에 빠지면 모든 것을 쏟아붓는 스타일입니다.',
    loveStyle: '열정적이고 수용적인 연애',
    strengths: ['열정적 애정표현', '수용적 태도', '감정적 교감', '따뜻한 마음', '깊은 사랑 표현', '연인에 대한 헌신'],
    challenges: ['감정 기복', '자기주장 부족', '지나친 열정', '감정적 소모'],
    compatibleTypes: ['LFAP', 'FFAP', 'FCRP', 'LCAP'],
    incompatibleTypes: ['LCRO', 'FFRO', 'FCRO'],
    advice: '열정적인 애정표현도 좋지만, 연인의 감정도 고려하여 균형을 맞추세요. 때로는 자신의 감정을 조절하는 것도 필요합니다.',
    color: 'from-rose-400 to-pink-500'
  },
  FCRO: {
    code: 'FCRO',
    title: '현실적 팔로워',
    nickname: '현실적 애정표현가',
    description: '연애에서 상대방을 따라가며 현실적으로 애정을 표현하는 타입입니다. 낙관적이면서도 현실적인 연애를 추구하며, 연인의 리더십을 존중하면서도 안정적이고 지속 가능한 관계를 만드는 데 집중합니다. 실용적인 사랑을 나누며, 연인과의 미래를 현실적으로 계획하는 것을 좋아합니다.',
    loveStyle: '현실적이고 수용적인 연애',
    strengths: ['현실적 애정표현', '수용적 태도', '안정적 관계', '체계적 계획', '신뢰할 수 있는 파트너', '실용적인 사랑'],
    challenges: ['감정 표현 부족', '자기주장 부족', '지나친 현실성', '로맨틱함 부족'],
    compatibleTypes: ['LFRO', 'FFRO', 'FCAO', 'LCRO'],
    incompatibleTypes: ['LCAP', 'FFAP', 'FCAP'],
    advice: '현실적인 계획도 좋지만, 연인과의 감정적 교감도 필요합니다. 때로는 감정을 표현하고 로맨틱한 순간을 만들어보세요.',
    color: 'from-blue-300 to-indigo-400'
  },
  FCRP: {
    code: 'FCRP',
    title: '열정적 현실 팔로워',
    nickname: '열정적 현실주의자',
    description: '연애에서 상대방을 따라가며 현실적으로 애정을 표현하는 타입입니다. 열정적이면서도 현실적인 연애를 추구하며, 연인의 리더십을 존중하면서도 완벽한 관계를 만들기 위해 노력합니다. 감정적으로는 열정적이지만, 현실적인 판단력으로 안정적인 관계를 유지하는 균형잡힌 스타일입니다.',
    loveStyle: '열정적이고 현실적인 수용 연애',
    strengths: ['열정적 애정표현', '현실적 판단', '수용적 태도', '체계적 계획', '완벽한 관계 추구', '균형잡힌 사랑'],
    challenges: ['감정 기복', '자기주장 부족', '지나친 완벽주의', '스트레스 과다'],
    compatibleTypes: ['LFRP', 'FFRP', 'FCAP', 'LCRP'],
    incompatibleTypes: ['LCAP', 'FFAP', 'LCAO'],
    advice: '완벽한 관계를 추구하는 것도 좋지만, 때로는 자연스러운 모습도 보여주세요. 완벽하지 않아도 괜찮다는 마음가짐이 필요합니다.',
    color: 'from-purple-300 to-indigo-400'
  },
  FFAO: {
    code: 'FFAO',
    title: '따뜻한 수용자',
    nickname: '배려심 깊은 팔로워',
    description: '연애에서 상대방을 따라가며 수용하는 타입입니다. 낙관적이면서도 배려심이 깊어, 연인의 모든 것을 받아들이고 이해하려고 노력합니다. 조화로운 관계를 최우선으로 생각하며, 연인을 행복하게 만드는 것을 자신의 기쁨으로 여기는 따뜻한 마음을 가지고 있습니다.',
    loveStyle: '배려심 깊고 수용적인 연애',
    strengths: ['따뜻한 수용', '배려심', '낙관적 성격', '조화로운 관계', '연인을 행복하게 만드는 능력', '무조건적인 사랑'],
    challenges: ['자기주장 부족', '지나친 수용', '결정력 부족', '자기 희생'],
    compatibleTypes: ['LFAO', 'FCAO', 'FFAP', 'LCAO'],
    incompatibleTypes: ['LCAP', 'FFRP', 'LCRP'],
    advice: '상대방을 배려하는 것도 좋지만, 자신의 의견도 적극적으로 표현하세요. 자신의 욕구도 소중히 여기는 것이 중요합니다.',
    color: 'from-green-300 to-emerald-400'
  },
  FFAP: {
    code: 'FFAP',
    title: '열정적 수용자',
    nickname: '열정적 배려자',
    description: '연애에서 상대방을 따라가며 수용하는 타입입니다. 열정적이면서도 배려심이 깊어, 연인의 모든 것을 받아들이면서도 자신만의 열정적인 사랑을 표현합니다. 연인과의 깊은 감정적 교감을 중시하며, 사랑에 빠지면 모든 것을 쏟아붓는 헌신적인 스타일입니다.',
    loveStyle: '열정적이고 배려심 깊은 수용 연애',
    strengths: ['열정적 수용', '배려심', '감정적 교감', '따뜻한 마음', '무조건적인 사랑', '깊은 헌신'],
    challenges: ['감정 기복', '자기주장 부족', '지나친 배려', '감정적 소모'],
    compatibleTypes: ['LFAP', 'FCAP', 'FFAO', 'LCAP'],
    incompatibleTypes: ['LCRO', 'FFRO', 'FCRO'],
    advice: '상대방을 배려하는 것도 좋지만, 자신의 감정도 솔직하게 표현하세요. 때로는 자신의 욕구도 우선시하는 것이 중요합니다.',
    color: 'from-orange-300 to-red-400'
  },
  FFRO: {
    code: 'FFRO',
    title: '현실적 수용자',
    nickname: '현실적 배려자',
    description: '연애에서 상대방을 따라가며 수용하는 타입입니다. 현실적이면서도 배려심이 깊어, 연인의 모든 것을 받아들이면서도 안정적이고 지속 가능한 관계를 만드는 데 집중합니다. 실용적인 사랑을 나누며, 연인과의 미래를 현실적으로 계획하는 것을 좋아합니다.',
    loveStyle: '현실적이고 배려심 깊은 수용 연애',
    strengths: ['현실적 수용', '배려심', '안정적 관계', '체계적 계획', '신뢰할 수 있는 파트너', '실용적인 사랑'],
    challenges: ['감정 표현 부족', '자기주장 부족', '지나친 현실성', '로맨틱함 부족'],
    compatibleTypes: ['LFRO', 'FCRO', 'FFAO', 'LCRO'],
    incompatibleTypes: ['LCAP', 'FFAP', 'FCAP'],
    advice: '현실적인 계획도 좋지만, 연인과의 감정적 교감도 필요합니다. 때로는 감정을 표현하고 로맨틱한 순간을 만들어보세요.',
    color: 'from-teal-300 to-cyan-400'
  },
  FFRP: {
    code: 'FFRP',
    title: '열정적 현실 수용자',
    nickname: '완벽한 배려자',
    description: '연애에서 상대방을 따라가며 수용하는 타입입니다. 열정적이면서도 현실적이고 배려심이 깊어, 연인의 모든 것을 받아들이면서도 완벽한 관계를 만들기 위해 노력합니다. 감정적으로는 열정적이지만, 현실적인 판단력으로 안정적인 관계를 유지하는 균형잡힌 스타일입니다.',
    loveStyle: '열정적이고 현실적인 완벽한 배려 연애',
    strengths: ['열정적 수용', '현실적 판단', '배려심', '체계적 계획', '완벽한 관계 추구', '무조건적인 사랑'],
    challenges: ['감정 기복', '자기주장 부족', '지나친 완벽주의', '스트레스 과다'],
    compatibleTypes: ['LFRP', 'FCRP', 'FFAP', 'LCRP'],
    incompatibleTypes: ['LCAP', 'FFAO', 'LCAO'],
    advice: '완벽한 관계를 추구하는 것도 좋지만, 때로는 자연스러운 모습도 보여주세요. 완벽하지 않아도 괜찮다는 마음가짐이 필요합니다.',
    color: 'from-indigo-300 to-purple-400'
  }
};

// 다국어 유형 데이터를 가져오는 함수들
export const getLoveTypeData = (typeCode: LoveTypeCode, t: (key: string) => string) => {
  const baseType = newLoveTypes[typeCode];
  return {
    ...baseType,
    title: t(`loveTypes.${typeCode}.title`),
    nickname: t(`loveTypes.${typeCode}.nickname`),
    description: t(`loveTypes.${typeCode}.description`),
    loveStyle: t(`loveTypes.${typeCode}.loveStyle`),
    strengths: baseType.strengths.map((_, index) => t(`loveTypes.${typeCode}.strengths.${index}`)),
    challenges: baseType.challenges.map((_, index) => t(`loveTypes.${typeCode}.challenges.${index}`)),
    advice: t(`loveTypes.${typeCode}.advice`)
  };
};

export const getLoveTypeTitle = (typeCode: LoveTypeCode, t: (key: string) => string): string => {
  return t(`loveTypes.${typeCode}.title`);
};

export const getLoveTypeNickname = (typeCode: LoveTypeCode, t: (key: string) => string): string => {
  return t(`loveTypes.${typeCode}.nickname`);
};

export const getLoveTypeDescription = (typeCode: LoveTypeCode, t: (key: string) => string): string => {
  return t(`loveTypes.${typeCode}.description`);
};
