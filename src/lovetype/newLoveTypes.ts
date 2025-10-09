import { LoveType, LoveTypeCode } from './types';

// 16가지 새로운 연애 유형 데이터 (L/F, C/A, R/P, O/E)
// L/F: Lead(자신의 페이스에 맞춰주길 원함) / Follow(상대의 페이스에 맞춤)
// C/A: Cuddly(응석부리고 싶은) / Accept(응석받고 싶은)
// R/P: Realistic(현실적인 연애) / Passionate(열정적인 연애)
// O/E: Optimistic(낙관적) / Earnest(진지한)

export const newLoveTypes: Record<LoveTypeCode, LoveType> = {
  // Lead + Cuddly 유형들 (자신의 페이스 + 응석부리고 싶은)
  LCRO: {
    code: 'LCRO',
    title: '든든한 애교쟁이',
    nickname: '든든한 애교쟁이',
    description: '평소엔 관계를 주도하고 현실적으로 판단하지만, 사랑하는 사람 앞에서는 귀엽게 응석부리고 싶은 반전 매력의 소유자입니다. 안정적인 연애를 추구하면서도 상대방에게 애교를 부리며 사랑받고 싶어하는 낙관적인 성격으로, 든든함과 귀여움을 동시에 지닌 매력적인 유형입니다.',
    loveStyle: '현실적이면서 귀여운 주도형 연애',
    strengths: ['현실적 리더십', '귀여운 매력', '낙관적 성격', '안정적 관계 추구', '균형잡힌 성향'],
    challenges: ['감정 표현 부족', '지나친 응석', '의존성', '일관성 부족'],
    compatibleTypes: ['FARE', 'FAPO', 'LARE', 'FCRO'],
    incompatibleTypes: ['LCPE', 'FCPE', 'LAPE'],
    advice: '현실적인 판단력을 유지하면서도 상대방과의 감정적 교감을 잊지 마세요.',
    color: 'from-blue-400 to-cyan-500'
  },
  LCRP: {
    code: 'LCRP',
    title: '진중한 큐티',
    nickname: '진중한 큐티',
    description: '연애를 진지하게 생각하고 완벽한 관계를 추구하지만, 사랑하는 사람에게는 무장해제되어 귀여운 모습을 보여주는 유형입니다. 현실적으로 관계를 이끌어가면서도 열정을 잃지 않으며, 진심 어린 태도로 상대방에게 응석부리는 모습이 사랑스러운 완벽주의자입니다.',
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
    title: '불타는 애교왕',
    nickname: '불타는 애교왕',
    description: '열정과 애교가 폭발하는 에너지 넘치는 연애 스타일의 소유자입니다. 주도적으로 관계를 이끌면서도 감정 표현에 거침이 없고, 낙관적인 태도로 상대방에게 사랑을 듬뿍 표현하며 응석부리는 것을 즐깁니다. 감정적으로 풍부하고 창의적인 방법으로 사랑을 표현하는 열정적인 낭만주의자입니다.',
    loveStyle: '열정적이면서 귀여운 낙관적인 연애',
    strengths: ['열정적 리더십', '귀여운 매력', '낙관적 성격', '감정적 교감', '창의적'],
    challenges: ['감정 기복', '충동적', '의존성', '현실성 부족'],
    compatibleTypes: ['FAPE', 'FCPO', 'LAPO', 'FARE'],
    incompatibleTypes: ['LCRE', 'FARE', 'LARE'],
    advice: '열정도 좋지만, 상대방의 페이스도 존중하며 균형을 맞추세요.',
    color: 'from-red-400 to-pink-500'
  },
  LCPE: {
    code: 'LCPE',
    title: '열정 품은 고양이',
    nickname: '열정 품은 고양이',
    description: '고양이처럼 도도하게 관계를 주도하지만, 마음을 연 사람에게는 뜨거운 열정과 귀여운 애교를 쏟아붓는 반전 매력의 소유자입니다. 진지하고 깊이 있는 관계를 추구하며, 선택한 상대에게는 헌신적으로 응석부리며 사랑을 표현합니다. 감정의 깊이가 남다른 열정적인 유형입니다.',
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
    title: '쿨한 리더',
    nickname: '쿨한 리더',
    description: '겉으로는 자신감 넘치게 관계를 이끌어가지만, 속으로는 상대방이 자신을 이해하고 받아주길 바라는 쿨한 매력의 소유자입니다. 현실적이고 낙관적인 태도로 안정적인 관계를 만들어가며, 강인한 리더십 뒤에 숨은 부드러운 마음을 알아봐 주는 사람을 원하는 균형잡힌 유형입니다.',
    loveStyle: '현실적이면서 케어받고 싶은 연애',
    strengths: ['현실적 리더십', '받아주는 매력', '낙관적 성격', '안정적', '균형잡힌'],
    challenges: ['자기주장 과다', '수용 부족', '거리감', '냉정함'],
    compatibleTypes: ['FCRO', 'FCPO', 'LCRO', 'FARE'],
    incompatibleTypes: ['LAPE', 'FCPE', 'LCPE'],
    advice: '리더십도 좋지만, 상대방의 애정표현도 받아들이는 여유를 가지세요.',
    color: 'from-teal-400 to-cyan-500'
  },
  LARE: {
    code: 'LARE',
    title: '카리스마 완벽주의자',
    nickname: '카리스마 완벽주의자',
    description: '강한 카리스마와 완벽을 추구하는 진지한 태도로 관계를 주도하지만, 내면으로는 상대방의 따뜻한 이해와 수용을 갈망하는 유형입니다. 현실적이고 책임감 있게 연애에 임하며, 완벽한 겉모습 뒤에 숨은 진심을 알아주는 신뢰할 수 있는 파트너를 원합니다. 리더십과 진지함이 돋보이는 든든한 유형입니다.',
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
    title: '자유로운 영혼',
    nickname: '자유로운 영혼',
    description: '자유분방하고 열정적으로 관계를 주도하면서도, 자신의 감정과 개성을 있는 그대로 받아주는 포용력 있는 파트너를 원하는 창의적인 유형입니다. 낙관적이고 매력적인 성격으로 새로운 경험을 즐기며, 자신만의 방식으로 사랑을 표현하는 것을 소중히 여깁니다. 자유로움과 열정이 공존하는 독특한 매력의 소유자입니다.',
    loveStyle: '열정적이면서 케어받고 싶은 연애',
    strengths: ['열정적 리더십', '감정적 풍부함', '낙관적 성격', '창의적', '매력적'],
    challenges: ['감정 기복', '일관성 부족', '거리감', '충동적'],
    compatibleTypes: ['FCPO', 'FCRO', 'LCPO', 'FAPE'],
    incompatibleTypes: ['LARE', 'FCRE', 'LCRE'],
    advice: '열정적인 리더십을 발휘하되, 상대방의 감정도 수용하세요.',
    color: 'from-orange-400 to-red-500'
  },
  LAPE: {
    code: 'LAPE',
    title: '운명론자',
    nickname: '운명론자',
    description: '사랑을 운명처럼 진지하게 받아들이며, 강한 리더십으로 관계를 이끌지만 내면의 깊은 감정을 이해하고 받아줄 영혼의 동반자를 찾는 유형입니다. 열정적이면서도 진지하게 헌신하며, 선택한 사람에게는 전부를 쏟아붓는 깊이 있는 사랑을 추구합니다. 강렬한 감정과 진정성이 돋보이는 운명적 사랑의 신봉자입니다.',
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
    title: '순둥이 햄스터',
    nickname: '순둥이 햄스터',
    description: '햄스터처럼 사랑스럽고 순한 성격으로 상대방의 페이스에 잘 맞춰주면서도, 때때로 귀엽게 응석부리며 애정을 표현하는 사랑스러운 유형입니다. 현실적이고 낙관적인 태도로 안정적인 관계를 지지하며, 조화로운 분위기 속에서 자연스럽게 귀여운 매력을 발산합니다. 부담스럽지 않으면서도 애틋한 사랑을 나누는 평화로운 연애 스타일입니다.',
    loveStyle: '현실적이면서 귀여운 서포터형 연애',
    strengths: ['수용적', '귀여운 매력', '낙관적 성격', '안정적', '조화로운'],
    challenges: ['자기주장 부족', '의존성', '결정력 부족', '수동적'],
    compatibleTypes: ['LARO', 'LAPO', 'FCRO', 'FARE'],
    incompatibleTypes: ['FCPE', 'LAPE', 'LCPE'],
    advice: '상대를 따르되, 자신의 의견도 적극적으로 표현하세요.',
    color: 'from-blue-300 to-cyan-400'
  },
  FCRE: {
    code: 'FCRE',
    title: '성실한 토끼',
    nickname: '성실한 토끼',
    description: '토끼처럼 온순하고 성실하게 상대방을 따르면서도, 진지한 마음으로 귀엽게 응석부리며 사랑을 표현하는 헌신적인 유형입니다. 현실적이고 신뢰할 수 있는 태도로 관계에 임하며, 상대방에게 의지하며 애교를 부리는 모습이 사랑스럽습니다. 진실된 마음과 성실함으로 깊은 신뢰 관계를 만들어가는 믿음직한 연인입니다.',
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
    title: '반짝이는 강아지',
    nickname: '반짝이는 강아지',
    description: '강아지처럼 밝고 애교 넘치는 성격으로 상대방에게 열정적으로 사랑을 표현하며 응석부리는 것을 좋아하는 사랑스러운 유형입니다. 낙관적이고 수용적인 태도로 상대방의 페이스에 맞춰주면서도, 감정 교감을 중시하며 귀여운 매력으로 사랑받고 싶어합니다. 에너지 넘치고 애정 표현이 풍부한 반짝이는 매력의 소유자입니다.',
    loveStyle: '열정적이면서 귀여운 서포터형 연애',
    strengths: ['수용적', '귀여운 매력', '열정적', '낙관적', '감정적 교감'],
    challenges: ['자기주장 부족', '의존성', '감정 기복', '충동적'],
    compatibleTypes: ['LAPO', 'LARO', 'FCPO', 'FAPE'],
    incompatibleTypes: ['FCRE', 'LARE', 'LCRE'],
    advice: '열정도 좋지만, 자신의 욕구도 표현하는 용기를 가지세요.',
    color: 'from-red-300 to-pink-400'
  },
  FCPE: {
    code: 'FCPE',
    title: '헌신적인 연인',
    nickname: '헌신적인 연인',
    description: '사랑하는 사람에게 온 마음을 다해 헌신하며, 열정적으로 응석부리고 애정을 표현하는 깊은 사랑의 소유자입니다. 진지하게 관계에 임하면서 상대방의 페이스를 존중하고, 귀여운 애교와 깊은 감정 교감으로 특별한 관계를 만들어갑니다. 진심 어린 헌신과 열정으로 하나가 되는 사랑을 꿈꾸는 진정한 연인입니다.',
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
    title: '편안한 동반자',
    nickname: '편안한 동반자',
    description: '함께 있으면 편안하고 자연스러운 관계를 추구하며, 상대방의 리드를 따르면서도 자신을 있는 그대로 받아주길 바라는 조화로운 유형입니다. 현실적이고 낙관적인 태도로 안정적인 관계를 만들어가며, 수용적이면서도 자신의 존재감을 인정받고 싶어합니다. 편안함과 안정감이 공존하는 이상적인 동반자입니다.',
    loveStyle: '현실적이면서 케어받고 싶은 연애',
    strengths: ['수용적', '현실적', '낙관적', '안정적', '조화로운'],
    challenges: ['자기주장 부족', '수용 부족', '거리감', '수동적'],
    compatibleTypes: ['LCRO', 'LCPO', 'FARO', 'FCRE'],
    incompatibleTypes: ['FAPE', 'LAPE', 'FCPE'],
    advice: '상대를 따르면서도, 자신이 원하는 것을 표현하세요.',
    color: 'from-teal-300 to-cyan-400'
  },
  FARE: {
    code: 'FARE',
    title: '신중한 조력자',
    nickname: '신중한 조력자',
    description: '신중하고 현실적인 태도로 상대방을 든든하게 뒷받침하면서도, 자신의 진심과 노력을 알아주고 받아주는 파트너를 원하는 신뢰할 수 있는 유형입니다. 진지하고 책임감 있게 관계에 임하며, 조용하지만 확고한 지지로 상대방과 깊은 신뢰 관계를 쌓아갑니다. 성실함과 진정성으로 사랑을 증명하는 믿음직한 조력자입니다.',
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
    title: '낭만주의자',
    nickname: '낭만주의자',
    description: '열정적이고 낭만적인 사랑을 꿈꾸며, 상대방의 리드를 따르면서도 자신의 감성과 감정을 이해하고 받아주길 바라는 감수성 풍부한 유형입니다. 낙관적이고 매력적인 성격으로 감정적 교감을 중시하며, 수용적이면서도 열정적으로 사랑에 빠지는 진정한 낭만주의자입니다. 꿈같은 사랑과 현실의 조화를 추구합니다.',
    loveStyle: '열정적이면서 케어받고 싶은 연애',
    strengths: ['수용적', '열정적', '낙관적', '감정적 교감', '매력적'],
    challenges: ['자기주장 부족', '감정 기복', '거리감', '충동적'],
    compatibleTypes: ['LCPO', 'LCRO', 'FAPO', 'FCPE'],
    incompatibleTypes: ['FARE', 'LARE', 'FCRE'],
    advice: '열정도 좋지만, 자신의 필요도 표현하는 용기를 가지세요.',
    color: 'from-orange-300 to-red-400'
  },
  FAPE: {
    code: 'FAPE',
    title: '순정파',
    nickname: '순정파',
    description: '한 사람을 깊고 진지하게 사랑하며, 열정적으로 헌신하면서도 상대방이 자신의 순수한 마음을 알아주고 소중히 여겨주길 바라는 진실된 유형입니다. 상대방의 페이스를 존중하면서 깊은 교감을 나누며, 수용적이면서도 진지한 태도로 운명 같은 사랑을 만들어갑니다. 순수한 열정과 헌신으로 평생을 함께할 사랑을 꿈꾸는 순정파입니다.',
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
