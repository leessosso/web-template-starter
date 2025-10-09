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
    title: '카리스마 넘치는 야생의 왕',
    nickname: '든든한 애교쟁이',
    description: '당신은 마치 야생의 대지를 호령하는 군림자처럼, 강렬한 카리스마와 타고난 리더십으로 사람들을 이끄는 타입이네요. 당신의 존재감은 압도적이며, 곁에 있는 것만으로도 주변 사람들에게 든든한 안정감을 선사합니다. 겉으로는 강하고 단호해 보이지만, 당신의 시야에 들어온 \'나의 사람\'에게는 그 누구보다도 깊은 애정과 책임감을 보이죠. 독립적이고 자신감이 넘쳐 때로는 조금 고독해 보일지라도, 당신은 자신만의 방식으로 사람들과 교감하며 깊은 유대감을 형성하는 데 능숙합니다. 당신이 가는 길에 기꺼이 동참하는 이들로 당신의 왕국은 언제나 풍성하죠.',
    loveStyle: '현실적이면서 귀여운 주도형 연애',
    strengths: ['현실적 리더십', '귀여운 매력', '낙관적 성격', '안정적 관계 추구', '균형잡힌 성향'],
    challenges: ['감정 표현 부족', '지나친 응석', '의존성', '일관성 부족'],
    compatibleTypes: ['FARE', 'FAPO', 'LARE', 'FCRO'],
    incompatibleTypes: ['LCPE', 'FCPE', 'LAPE'],
    advice: '현실적인 판단력을 유지하면서도 상대방과의 감정적 교감을 잊지 마세요.',
    color: 'from-blue-400 to-cyan-500'
  },
  LCRE: {
    code: 'LCRE',
    title: '숨겨진 섬세함의 발견자',
    nickname: '진중한 큐티',
    description: '당신은 겉으로는 조용하고 차분해 보이지만, 그 내면에는 누구보다 깊고 섬세한 감성과 진실한 애정을 품고 있는 타입이네요. 당신의 꾸밈없고 성실한 태도는 주변 사람들에게 굳건한 신뢰를 주지만, 자신의 감정이나 생각 표현에는 다소 서툰 면이 있어요. 당신은 관계를 진지하게 여기고, 상대방에게 진심으로 다가가려 노력합니다. 겉모습만으로는 당신의 풍부한 내면을 모두 알기 어렵지만, 당신과 깊은 관계를 맺은 사람들은 당신이야말로 가장 소중하고 순수한 보석 같은 존재임을 깨닫게 될 거예요. 때로는 당신의 이런 섬세함 때문에 오해를 받거나 상처를 입을 수도 있겠지만, 당신의 진심은 결국 빛을 발하며 주변을 따뜻하게 물듭니다.',
    loveStyle: '현실적이고 진지하면서 귀여운 연애',
    strengths: ['현실적 리더십', '귀여운 매력', '진지한 태도', '안정적 관계', '헌신적'],
    challenges: ['감정 기복', '지나친 완벽주의', '의존성', '스트레스'],
    compatibleTypes: ['FARE', 'FCRE', 'LAPE', 'FARO'],
    incompatibleTypes: ['LCPO', 'FCPO', 'LAPO'],
    advice: '완벽을 추구하되, 때로는 여유를 가지고 즐기는 것도 중요합니다.',
    color: 'from-purple-400 to-indigo-500'
  },
  LCPO: {
    code: 'LCPO',
    title: '빛나는 주인공의 오라',
    nickname: '불타는 애교왕',
    description: '당신은 어떤 상황에 처하더라도 그 자체로 스포트라이트를 받는 듯, 남다른 존재감과 매력을 발산하는 타입이네요. 밝고 활기찬 에너지로 주변을 환하게 만들며, 사람들을 자연스럽게 당신의 매력에 빠져들게 합니다. 당신은 타고난 리더십과 자신감으로 관계를 이끌어가며, 늘 새로운 것을 추구하고 도전을 즐기죠. 이런 당신의 에너지는 때로는 주변 사람들에게 큰 영감을 주기도 하지만, 가끔 당신의 불타는 열정이 오해를 사거나 예측 불가능한 결과를 낳을 수도 있습니다. 하지만 당신은 언제나 자신만의 방식으로 삶의 무대 위에서 당당하게 빛나는 주인공입니다.',
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
    title: '열정의 불꽃 수호자',
    nickname: '열정 품은 고양이',
    description: '당신은 겉으로는 불꽃처럼 뜨겁고 강렬한 에너지를 발산하지만, 그 심장 속에는 사랑하는 모든 것을 지키려는 헌신적인 열정이 가득한 타입이네요. 당신의 거침없는 모습은 때로는 오해를 사거나 주변을 긴장시킬 수도 있지만, 결국 당신의 모든 행동은 소중한 사람들을 향한 순도 100%의 진심에서 비롯됩니다. 당신의 \'반전\'은 예상치 못한 감동을 선사하며, 이 따뜻한 온기 때문에 누구도 당신을 미워할 수 없죠.',
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
    title: '고요한 매력의 길잡이',
    nickname: '쿨한 리더',
    description: '당신은 마치 고즈넉한 등대처럼 차분하고 성숙한 분위기를 풍기며, 주변 사람들에게 은은한 신뢰와 동경을 안겨주는 타입이네요. 당신은 지적이고 사려 깊으며, 섣불리 감정을 드러내기보다는 상황을 객관적으로 파악하고 현명하게 대처하는 능력이 뛰어나죠. 당신 스스로는 그저 조용히 있을 뿐이라고 생각할지 몰라도, 당신의 존재만으로도 많은 이들은 마음의 안정을 찾고 기댈 수 있는 버팀목을 발견합니다. 당신의 빈틈없는 듯 보이는 모습은 타인의 경외심을 자아내지만, 그 이면에는 당신만의 사색과 평온을 추구하는 섬세한 내면이 자리하고 있습니다.',
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
    title: '견고한 마음의 지휘자',
    nickname: '카리스마 완벽주의자',
    description: '당신은 카리스마와 깊은 통찰력을 겸비하여, 마치 오케스트라의 지휘자처럼 관계와 상황을 조화롭게 이끌어가는 타입이네요. 흔들림 없는 자기 확신과 함께 타인을 포용하는 넓은 아량을 지녔죠. 당신은 복잡한 상황 속에서도 최적의 균형점을 찾아내고 유지하는 데 탁월하며, 이 능력 덕분에 많은 이들에게 존경과 깊은 신뢰를 받아요. 겉으로는 빈틈없이 완벽해 보일 수 있지만, 사실 당신도 약한 모습을 보이는 것에 서툰, 인간적인 섬세함이 숨어 있답니다. 그러나 이런 당신의 강인한 존재감은 주변 사람들에게 든든한 안정감과 방향을 제시합니다.',
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
    title: '변주곡의 예술가',
    nickname: '자유로운 영혼',
    description: '당신은 마치 아름다운 변주곡처럼 다채로운 매력과 예측 불가능한 면모를 끊임없이 선보이는 타입이네요. 당신의 팔색조 같은 매력은 주변 사람들을 늘 새롭고 즐겁게 합니다. 때로는 똑 부러지는 카리스마를 보여주다가도, 예상치 못한 엉뚱함으로 주변을 깜짝 놀라게 하죠. 친구들과 어울릴 때는 자유롭고 독특한 분위기를 풍기지만, 결정적인 순간에는 누구보다 믿음직스러운 리더십을 발휘하기도 합니다. 당신의 **\'퍼펙트 모드\'**가 발동될 때는 마치 영화 속 주인공처럼 모든 시선을 사로잡죠. 어디로 튈지 모르는 예측 불가능함은 당신의 매력이자 동시에 단점이 될 수도 있지만, 당신의 밝고 긍정적인 에너지 덕분에 그 어떤 단점도 매력으로 승화됩니다.',
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
    description: '당신은 마치 한 편의 드라마를 연출하듯, 사람의 마음을 사로잡는 능력이 탁월한 타입이네요. 첫인상은 언뜻 조용하고 평범해 보일지 몰라도, 당신과 깊이 관계를 맺어 본 사람들은 하나같이 당신에게 **\"첫인상과 정말 다르다!\"**고 말할 거예요. 당신은 직관적으로 사람과 상황을 꿰뚫어 보며, 어떻게 관계를 맺어야 자신에게 이롭고 평화로운지 본능적으로 알고 있습니다. 이런 타고난 \'삶의 지혜\'와 센스는 당신을 늘 적절한 위치에 있게 만들고, 주변 사람들에게 당신만의 매력을 서서히 각인시키죠. 때로는 당신의 이런 비범함이 타인의 질투를 유발할 수도 있겠지만, 당신은 그런 시선에 아랑곳하지 않고 자신만의 아름다운 연애 서사를 써 내려갑니다.',
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
    title: '사랑의 연출가',
    nickname: '순둥이 햄스터',
    description: '당신은 사랑스럽고 순수한 모습 뒤에, 자신을 진정으로 행복하게 할 상대를 정확하게 찾아내는 지혜를 가진 타입이네요. 마치 귀여운 토끼처럼 사람을 잘 따르고 정을 주는 것 같지만, 사실 당신의 마음속에는 늘 자신에게 가장 좋은 방향을 찾아가는 섬세한 안테나가 세워져 있죠. 당신은 주위를 꼼꼼히 살피고, 남들이 놓치는 중요한 부분을 꿰뚫어 보는 감각이 탁월해요. 이런 타고난 능력은 일에서도 빛을 발하여, 화려하게 드러나지 않아도 묵묵히 신뢰를 쌓아가는 견고함을 보여줍니다. 겉보기와 달리 냉철한 면모가 드러날 때도 있지만, 당신의 따뜻한 친화력 덕분에 모든 것이 사랑스러운 매력으로 승화돼요.',
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
    title: '현명한 행복 탐색가',
    nickname: '성실한 토끼',
    description: '당신은 마치 정처 없이 떠도는 방랑자처럼, 늘 새로운 사랑과 설렘을 찾아 떠나는 타입이네요. 당신의 삶은 사랑 그 자체입니다. 누구에게나 상냥하고 친화력이 좋아, 당신이 있는 곳은 늘 즐거운 에너지로 가득하죠. 당신의 흥 넘치는 모습과 활발한 이야기는 주변 사람들을 매료시키며, 당신은 그 중심에서 언제나 빛나는 존재입니다. 때로는 그 넘치는 에너지 때문에 당신을 오해하는 시선도 있겠지만, 당신의 본질은 늘 사랑을 갈구하는 순수한 영혼입니다. 섬세한 감성을 지녀 가끔 외로움을 느끼기도 하지만, 당신은 혼자만의 시간을 소중히 여기며 또 다른 사랑을 위한 충전을 한답니다.',
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
    title: '사랑을 노래하는 방랑자',
    nickname: '반짝이는 강아지',
    description: '당신은 마치 영화 속 주인공처럼 순수하고 꾸밈없는 마음으로, 사랑하는 모든 이에게 온 마음을 바치는 타입이네요. 당신의 어린아이 같은 순수함과 꾸밈없는 다정함은 주변 모든 사람들의 마음을 무장해제시킵니다. 늘 최선을 다하며 솔직하게 살아가는 당신의 모습은 보는 이로 하여금 깊은 애정과 연민을 불러일으키죠. 사랑하는 사람과의 이별 앞에서는 세상이 무너진 듯 슬퍼하지만, 그 아픔조차 당신의 진실된 감정을 여과 없이 드러내는, 사랑스러운 순간이 됩니다. 하지만 당신의 이런 순수함은 결코 약함이 아닙니다. 일 앞에서는 누구보다 진지하고 책임감 강한 모습으로 변모하는, 숨겨진 강인함과 반전 매력을 지닌 팔방미인입니다.',
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
    title: '순애보 헌신가',
    nickname: '헌신적인 연인',
    description: '당신은 마치 자신만의 고유한 행성에서 온 듯, 그 누구도 쉽사리 이해할 수 없는 독특한 매력과 세계관을 지닌 타입이네요. 평범한 사람들에게는 당신의 진정한 모습이나 속마음을 헤아리기란 거의 불가능에 가깝죠. 하지만 당신은 결코 고립되거나 비협조적이지 않아요. 오히려 사람들과 조화롭게 어울리는 데 능숙하며, 불필요한 마찰을 피하는 지혜를 가졌습니다. 이런 당신의 담담한 태도는 당신만의 독특한 세계를 더욱 견고하게 만듭니다. 겉으로는 평범해 보여도, 그 안에 숨겨진 남다른 시각과 통찰력은 마치 시대를 앞서간 예술가처럼 당신을 특별하게 만들어요. 당신의 가장 큰 매력은 바로 **\'다른 사람과는 다르지만, 그 다름으로 인해 호감을 사는 능력\'**에 있습니다.',
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
    title: '나만의 별을 가진 존재',
    nickname: '편안한 동반자',
    description: '당신은 마치 정교한 설계자처럼 타인과의 관계를 능숙하게 조율하고 아름다운 인연으로 엮어가는 타입이네요. 높은 정신 연령과 탁월한 인간 관찰 능력으로 상대방의 마음을 읽고 그들을 포용하는 데 능숙합니다. 냉철함과 순수함 사이의 균형 잡힌 매력은 당신을 더욱 돋보이게 하죠. 책임감이 강하고 소통 능력이 뛰어나 일에서도 뛰어난 잠재력을 발휘합니다. 당신은 모두와 잘 어울리지만, 깊이 있는 관계를 더 중요하게 생각하는 편입니다. 때로는 현실적이고 이성적인 면모가 차갑게 비칠 수도 있지만, 그 이면에는 관계를 더 건강하고 단단하게 만들고자 하는 당신의 깊은 지혜가 숨어 있습니다.',
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
    title: '관계의 설계자',
    nickname: '신중한 조력자',
    description: '당신은 마치 천사처럼 부드럽고 다정한 미소로 사람들을 끌어당기지만, 예측 불가능한 자유분방함으로 모두를 매료시키는 타입이네요. 기본적으로는 상대를 따뜻하게 이해하고 포용하는 천사 같은 마음을 지녔지만, 가끔 터져 나오는 엉뚱하고 자유로운 행동은 주변 사람들을 깜짝 놀라게 합니다. 당신은 스스로 \'그리 진지하지 않은\' 면모가 당신의 개성임을 잘 알죠. 이런 반전 매력 덕분에 당신은 늘 흥미로운 사람으로 기억되며, 당신과의 관계는 결코 지루할 틈이 없습니다.',
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
    title: '아이러니의 미소 천사',
    nickname: '낭만주의자',
    description: '당신은 수많은 아픔과 경험을 통해 더욱 단단해진 마음으로, 결국 모두가 찾는 \'마지막 사랑의 정점\'을 아름답게 조율하는 타입이네요. 당신의 마음은 언제나 다정함으로 충만하며, 16가지 타입 중 가장 선량하고 온화한 품성을 지녔습니다. 타인의 모든 것을 조건 없이 받아들이는 넓은 포용력은 마치 \'레이와 시대의 마더 테레사\'를 연상시킵니다. 그룹 내에서 조용히 자신의 역할을 하지만, 당신의 진정한 가치를 아는 이들에게는 없어서는 안 될 소중한 존재로 신뢰받죠. 때때로 당신의 이 순수한 다정함이 일부 사람들에게는 이용될 여지를 주기도 하지만, 결국 당신의 사랑은 모든 상처를 치유하고 아름다운 결실을 맺는 힘이 있습니다.',
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
    title: '사랑의 피날레 조율사',
    nickname: '순정파',
    description: '당신은 마치 폭풍우 속에서도 흔들림 없이 바른 길을 밝혀주는 등대처럼, 한결같은 믿음과 강인한 책임감으로 사람들을 이끄는 타입이네요. 당신의 존재감은 굳건하고 안정적이며, 곁에 있는 것만으로도 주변 사람들에게 든든한 평온함을 선사합니다. 겉으로는 조용하고 묵묵해 보일지라도, 당신의 내면에는 공동체를 위한 깊은 애정과 배려심이 자리하고 있습니다. 독립적이고 굳건한 신념을 가지고 있지만, 결코 독선적이지 않아요. 당신은 자신만의 방식으로 사람들과 교감하며 깊은 유대감을 형성하고, 그들이 당신의 리더십 아래에서 안전함과 안정을 느낄 수 있도록 돕습니다. 당신이 가는 길에는 언제나 흔들림 없는 신뢰와 존경이 함께합니다.',
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
