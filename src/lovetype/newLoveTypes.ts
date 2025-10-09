import { LoveType, LoveTypeCode } from './types';

// 16가지 새로운 연애 유형 데이터 (L/F, C/A, R/P, O/E)
// L/F: Lead(자신의 페이스에 맞춰주길 원함) / Follow(상대의 페이스에 맞춤)
// C/A: Cuddly(응석부리고 싶은) / Accept(응석받고 싶은)
// R/P: Realistic(현실적인 연애) / Passionate(열정적인 연애)
// O/E: Optimistic(자유로운) / Earnest(진지한)

export const newLoveTypes: Record<LoveTypeCode, LoveType> = {
  // Lead + Cuddly 유형들 (자신의 페이스 + 응석부리고 싶은)
  LCRO: {
    code: 'LCRO',
    title: '응석부리는 현실적 리더',
    nickname: '귀여운 현실주의자',
    description: '자신의 페이스로 관계를 이끌면서도 상대방에게 응석부리고 싶어하는 타입입니다. 현실적이고 자유로운 연애를 추구하며, 안정적인 관계 속에서 때로는 귀엽게 어리광부리고 싶어합니다.',
    loveStyle: '현실적이면서 귀여운 주도형 연애',
    strengths: ['현실적 리더십', '귀여운 매력', '자유로운 성격', '안정적 관계 추구', '균형잡힌 성향'],
    challenges: ['감정 표현 부족', '지나친 응석', '의존성', '일관성 부족'],
    compatibleTypes: ['FARE', 'FAPO', 'LARE', 'FCRO'],
    incompatibleTypes: ['LCPE', 'FCPE', 'LAPE'],
    advice: '현실적인 판단력을 유지하면서도 상대방과의 감정적 교감을 잊지 마세요.',
    color: 'from-blue-400 to-cyan-500'
  },
  LCRP: {
    code: 'LCRP',
    title: '응석부리는 현실적 리더 (열정형)',
    nickname: '귀엽고 진지한 현실주의자',
    description: '자신의 페이스로 관계를 이끌면서도 상대방에게 응석부리고 싶어하는 타입입니다. 현실적이지만 열정적이며 진지하게 연애에 임합니다.',
    loveStyle: '현실적이고 진지하면서 귀여운 연애',
    strengths: ['현실적 리더십', '귀여운 매력', '진지한 태도', '안정적 관계', '열정적'],
    challenges: ['감정 기복', '지나친 완벽주의', '의존성', '스트레스'],
    compatibleTypes: ['FARE', 'FCRE', 'LARPE', 'FARO'],
    incompatibleTypes: ['LCPO', 'FCPO', 'LAPO'],
    advice: '완벽을 추구하되, 때로는 여유를 가지고 즐기는 것도 중요합니다.',
    color: 'from-purple-400 to-indigo-500'
  },
  LCPO: {
    code: 'LCPO',
    title: '응석부리는 열정적 리더',
    nickname: '귀여운 열정가',
    description: '자신의 페이스로 관계를 이끌면서도 상대방에게 응석부리고 싶어하는 타입입니다. 열정적이고 자유로운 연애를 추구하며, 감정적으로 풍부한 관계를 원합니다.',
    loveStyle: '열정적이면서 귀여운 자유로운 연애',
    strengths: ['열정적 리더십', '귀여운 매력', '자유로운 성격', '감정적 교감', '창의적'],
    challenges: ['감정 기복', '충동적', '의존성', '현실성 부족'],
    compatibleTypes: ['FAPE', 'FCPO', 'LAPO', 'FARE'],
    incompatibleTypes: ['LCRE', 'FARE', 'LARE'],
    advice: '열정도 좋지만, 상대방의 페이스도 존중하며 균형을 맞추세요.',
    color: 'from-red-400 to-pink-500'
  },
  LCPE: {
    code: 'LCPE',
    title: '응석부리는 열정적 리더 (진지형)',
    nickname: '귀엽고 진지한 열정가',
    description: '자신의 페이스로 관계를 이끌면서도 상대방에게 응석부리고 싶어하는 타입입니다. 열정적이지만 진지하게 연애에 임하며, 깊은 관계를 추구합니다.',
    loveStyle: '열정적이고 진지하면서 귀여운 연애',
    strengths: ['열정적 리더십', '귀여운 매력', '진지한 태도', '깊은 감정 교감', '헌신적'],
    challenges: ['감정 기복', '지나친 집착', '의존성', '감정적 소모'],
    compatibleTypes: ['FAPE', 'FCPE', 'LAPE', 'FARO'],
    incompatibleTypes: ['LCRO', 'FARO', 'LARO'],
    advice: '진지함도 좋지만, 때로는 가볍게 즐기는 여유도 필요합니다.',
    color: 'from-pink-500 to-rose-600'
  },

  // Lead + Accept 유형들 (자신의 페이스 + 응석받고 싶은)
  LARO: {
    code: 'LARO',
    title: '응석받고 싶은 현실적 리더',
    nickname: '케어받고 싶은 리더',
    description: '자신의 페이스로 관계를 이끌지만 상대방이 자신을 받아주고 보호해주기를 원하는 타입입니다. 현실적이고 자유로운 연애를 추구합니다.',
    loveStyle: '현실적이면서 케어받고 싶은 연애',
    strengths: ['현실적 리더십', '받아주는 매력', '자유로운 성격', '안정적', '균형잡힌'],
    challenges: ['자기주장 과다', '수용 부족', '거리감', '냉정함'],
    compatibleTypes: ['FCRO', 'FCPO', 'LCRO', 'FARE'],
    incompatibleTypes: ['LAPE', 'FCPE', 'LCPE'],
    advice: '리더십도 좋지만, 상대방의 애정표현도 받아들이는 여유를 가지세요.',
    color: 'from-teal-400 to-cyan-500'
  },
  LARE: {
    code: 'LARE',
    title: '응석받고 싶은 현실적 리더 (진지형)',
    nickname: '진지한 리더',
    description: '자신의 페이스로 관계를 이끌지만 상대방이 자신을 받아주고 보호해주기를 원하는 타입입니다. 현실적이고 진지하게 연애에 임합니다.',
    loveStyle: '현실적이고 진지한 리더형 연애',
    strengths: ['강한 리더십', '현실적 판단', '진지한 태도', '신뢰감', '책임감'],
    challenges: ['자기주장 과다', '수용 부족', '융통성 부족', '완벽주의'],
    compatibleTypes: ['FCRE', 'FCPE', 'LCRO', 'FARO'],
    incompatibleTypes: ['LAPO', 'FCPO', 'LCPO'],
    advice: '진지함도 중요하지만, 때로는 유연하게 상대를 받아들이는 것도 필요합니다.',
    color: 'from-indigo-500 to-blue-600'
  },
  LAPO: {
    code: 'LAPO',
    title: '응석받고 싶은 열정적 리더',
    nickname: '열정적 케어 리더',
    description: '자신의 페이스로 관계를 이끌지만 상대방이 자신을 받아주고 보호해주기를 원하는 타입입니다. 열정적이고 자유로운 연애를 추구합니다.',
    loveStyle: '열정적이면서 케어받고 싶은 연애',
    strengths: ['열정적 리더십', '감정적 풍부함', '자유로운 성격', '창의적', '매력적'],
    challenges: ['감정 기복', '일관성 부족', '거리감', '충동적'],
    compatibleTypes: ['FCPO', 'FCRO', 'LCPO', 'FAPE'],
    incompatibleTypes: ['LARE', 'FCRE', 'LCRE'],
    advice: '열정적인 리더십을 발휘하되, 상대방의 감정도 수용하세요.',
    color: 'from-orange-400 to-red-500'
  },
  LAPE: {
    code: 'LAPE',
    title: '응석받고 싶은 열정적 리더 (진지형)',
    nickname: '진지한 열정 리더',
    description: '자신의 페이스로 관계를 이끌지만 상대방이 자신을 받아주고 보호해주기를 원하는 타입입니다. 열정적이지만 진지하게 연애에 임합니다.',
    loveStyle: '열정적이고 진지한 리더형 연애',
    strengths: ['강한 리더십', '열정적', '진지한 태도', '깊은 교감', '헌신적'],
    challenges: ['감정 기복', '지나친 집착', '거리감', '감정적 소모'],
    compatibleTypes: ['FCPE', 'FCRO', 'LCPE', 'FAPO'],
    incompatibleTypes: ['LARO', 'FCRO', 'LCRO'],
    advice: '진지한 열정도 좋지만, 상대방을 압도하지 않도록 주의하세요.',
    color: 'from-rose-500 to-pink-600'
  },

  // Follow + Cuddly 유형들 (상대의 페이스 + 응석부리고 싶은)
  FCRO: {
    code: 'FCRO',
    title: '응석부리는 현실적 팔로워',
    nickname: '귀여운 서포터',
    description: '상대의 페이스에 맞추면서도 상대방에게 응석부리고 싶어하는 타입입니다. 현실적이고 자유로운 연애를 추구하며, 안정적인 지지자 역할을 합니다.',
    loveStyle: '현실적이면서 귀여운 서포터형 연애',
    strengths: ['수용적', '귀여운 매력', '자유로운 성격', '안정적', '조화로운'],
    challenges: ['자기주장 부족', '의존성', '결정력 부족', '수동적'],
    compatibleTypes: ['LARO', 'LAPO', 'FCRO', 'FARE'],
    incompatibleTypes: ['FCPE', 'LAPE', 'LCPE'],
    advice: '상대를 따르되, 자신의 의견도 적극적으로 표현하세요.',
    color: 'from-blue-300 to-cyan-400'
  },
  FCRE: {
    code: 'FCRE',
    title: '응석부리는 현실적 팔로워 (진지형)',
    nickname: '귀엽고 진지한 서포터',
    description: '상대의 페이스에 맞추면서도 상대방에게 응석부리고 싶어하는 타입입니다. 현실적이고 진지하게 연애에 임합니다.',
    loveStyle: '현실적이고 진지하면서 귀여운 연애',
    strengths: ['수용적', '귀여운 매력', '진지한 태도', '신뢰감', '헌신적'],
    challenges: ['자기주장 부족', '의존성', '완벽주의', '스트레스'],
    compatibleTypes: ['LARE', 'LAPE', 'FCRE', 'FARO'],
    incompatibleTypes: ['FCPO', 'LAPO', 'LCPO'],
    advice: '진지함도 좋지만, 때로는 여유롭게 즐기는 것도 필요합니다.',
    color: 'from-purple-300 to-indigo-400'
  },
  FCPO: {
    code: 'FCPO',
    title: '응석부리는 열정적 팔로워',
    nickname: '귀여운 열정 서포터',
    description: '상대의 페이스에 맞추면서도 상대방에게 응석부리고 싶어하는 타입입니다. 열정적이고 자유로운 연애를 추구합니다.',
    loveStyle: '열정적이면서 귀여운 서포터형 연애',
    strengths: ['수용적', '귀여운 매력', '열정적', '자유로운', '감정적 교감'],
    challenges: ['자기주장 부족', '의존성', '감정 기복', '충동적'],
    compatibleTypes: ['LAPO', 'LARO', 'FCPO', 'FAPE'],
    incompatibleTypes: ['FCRE', 'LARE', 'LCRE'],
    advice: '열정도 좋지만, 자신의 욕구도 표현하는 용기를 가지세요.',
    color: 'from-red-300 to-pink-400'
  },
  FCPE: {
    code: 'FCPE',
    title: '응석부리는 열정적 팔로워 (진지형)',
    nickname: '귀엽고 진지한 열정 서포터',
    description: '상대의 페이스에 맞추면서도 상대방에게 응석부리고 싶어하는 타입입니다. 열정적이지만 진지하게 연애에 임합니다.',
    loveStyle: '열정적이고 진지하면서 귀여운 연애',
    strengths: ['수용적', '귀여운 매력', '열정적', '진지한', '깊은 헌신'],
    challenges: ['자기주장 부족', '의존성', '감정 기복', '감정적 소모'],
    compatibleTypes: ['LAPE', 'LARE', 'FCPE', 'FAPO'],
    incompatibleTypes: ['FCRO', 'LARO', 'LCRO'],
    advice: '진지한 열정도 좋지만, 자신의 행복도 챙기세요.',
    color: 'from-pink-400 to-rose-500'
  },

  // Follow + Accept 유형들 (상대의 페이스 + 응석받고 싶은)
  FARO: {
    code: 'FARO',
    title: '응석받고 싶은 현실적 팔로워',
    nickname: '케어받고 싶은 서포터',
    description: '상대의 페이스에 맞추지만 상대방이 자신을 받아주고 보호해주기를 원하는 타입입니다. 현실적이고 자유로운 연애를 추구합니다.',
    loveStyle: '현실적이면서 케어받고 싶은 연애',
    strengths: ['수용적', '현실적', '자유로운', '안정적', '조화로운'],
    challenges: ['자기주장 부족', '수용 부족', '거리감', '수동적'],
    compatibleTypes: ['LCRO', 'LCPO', 'FARO', 'FCRE'],
    incompatibleTypes: ['FAPE', 'LAPE', 'FCPE'],
    advice: '상대를 따르면서도, 자신이 원하는 것을 표현하세요.',
    color: 'from-teal-300 to-cyan-400'
  },
  FARE: {
    code: 'FARE',
    title: '응석받고 싶은 현실적 팔로워 (진지형)',
    nickname: '진지한 서포터',
    description: '상대의 페이스에 맞추지만 상대방이 자신을 받아주고 보호해주기를 원하는 타입입니다. 현실적이고 진지하게 연애에 임합니다.',
    loveStyle: '현실적이고 진지한 서포터형 연애',
    strengths: ['수용적', '현실적', '진지한', '신뢰감', '책임감'],
    challenges: ['자기주장 부족', '수용 부족', '융통성 부족', '완벽주의'],
    compatibleTypes: ['LCRE', 'LCPE', 'FARO', 'FCRO'],
    incompatibleTypes: ['FAPO', 'LAPO', 'FCPO'],
    advice: '진지함도 중요하지만, 감정적 교감도 잊지 마세요.',
    color: 'from-indigo-400 to-blue-500'
  },
  FAPO: {
    code: 'FAPO',
    title: '응석받고 싶은 열정적 팔로워',
    nickname: '열정적 케어 서포터',
    description: '상대의 페이스에 맞추지만 상대방이 자신을 받아주고 보호해주기를 원하는 타입입니다. 열정적이고 자유로운 연애를 추구합니다.',
    loveStyle: '열정적이면서 케어받고 싶은 연애',
    strengths: ['수용적', '열정적', '자유로운', '감정적 교감', '매력적'],
    challenges: ['자기주장 부족', '감정 기복', '거리감', '충동적'],
    compatibleTypes: ['LCPO', 'LCRO', 'FAPO', 'FCPE'],
    incompatibleTypes: ['FARE', 'LARE', 'FCRE'],
    advice: '열정도 좋지만, 자신의 필요도 표현하는 용기를 가지세요.',
    color: 'from-orange-300 to-red-400'
  },
  FAPE: {
    code: 'FAPE',
    title: '응석받고 싶은 열정적 팔로워 (진지형)',
    nickname: '진지한 열정 서포터',
    description: '상대의 페이스에 맞추지만 상대방이 자신을 받아주고 보호해주기를 원하는 타입입니다. 열정적이지만 진지하게 연애에 임합니다.',
    loveStyle: '열정적이고 진지한 서포터형 연애',
    strengths: ['수용적', '열정적', '진지한', '깊은 교감', '헌신적'],
    challenges: ['자기주장 부족', '감정 기복', '거리감', '감정적 소모'],
    compatibleTypes: ['LCPE', 'LCRO', 'FAPE', 'FCPO'],
    incompatibleTypes: ['FARO', 'LARO', 'FCRO'],
    advice: '진지한 열정도 좋지만, 자신의 행복도 중요하게 생각하세요.',
    color: 'from-rose-400 to-pink-500'
  }
};

// 다국어 유형 데이터를 가져오는 함수들
export const getLoveTypeData = (typeCode: LoveTypeCode, t: (key: string) => string) => {
  const baseType = newLoveTypes[typeCode];
  if (!baseType) return null;

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
