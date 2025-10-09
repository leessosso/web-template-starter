import type { Question } from './types';

// 연애 유형 테스트 질문들 (L/F, C/A, R/P, O/E 차원 기반)
export const questions: Question[] = [
    // L/F 차원 질문들 (리더십: Lead/Follow) - L 3개, F 3개
    {
        id: 1,
        text: "연인과 새로운 맛집을 찾아갈 때, 주로 누가 먼저 제안하나요?",
        dimension: 'L',
        weight: 3,
        optionA: "내가 먼저 적극적으로 찾아서 제안하는 편이다",
        optionB: "상대방의 제안을 기다리거나 함께 찾아보는 편이다"
    },
    {
        id: 2,
        text: "데이트 계획이 갑자기 틀어졌을 때, 당신의 반응은?",
        dimension: 'L',
        weight: 3,
        optionA: "내가 새로운 대안을 빠르게 제시하고 이끌어 나간다",
        optionB: "상대방의 의견을 듣고, 상대가 원하는 대로 따라가는 편이다"
    },
    {
        id: 3,
        text: "연인과 주말 여행을 계획한다면, 당신은 주로 어떻게 준비하나요?",
        dimension: 'L',
        weight: 3,
        optionA: "내가 목적지부터 숙소까지 구체적으로 알아보고 제안한다",
        optionB: "상대방의 의견을 듣고, 함께 고민하며 준비하는 것을 선호한다"
    },
    {
        id: 4,
        text: "연인과의 다툼 후, 먼저 화해를 시도하는 쪽은 주로 누구인가요?",
        dimension: 'F',
        weight: 3,
        optionA: "상대방의 화해 제스처를 기다리거나, 부드럽게 받아주는 편이다",
        optionB: "내가 먼저 관계 개선을 위해 대화를 주도하는 편이다"
    },
    {
        id: 5,
        text: "새로운 도전이나 취미를 함께 시작할 때, 당신의 역할은?",
        dimension: 'F',
        weight: 2,
        optionA: "상대방이 이끄는 대로 따라가며 함께 즐긴다",
        optionB: "내가 주도적으로 방법을 찾고 연인을 이끌어간다"
    },
    {
        id: 6,
        text: "평소 식사 메뉴를 결정할 때, 당신은 어느 쪽인가요?",
        dimension: 'F',
        weight: 2,
        optionA: "상대방이 원하는 메뉴에 맞춰주는 편이다",
        optionB: "먹고 싶은 메뉴를 명확하게 정해서 제안한다"
    },

    // C/A 차원 질문들 (애정 표현: Cuddly 응석부리고 싶은/Accept 응석받고 싶은) - 총 6개
    {
        id: 7,
        text: "연인이 힘들어할 때, 당신은 주로 어떻게 반응하나요?",
        dimension: 'A',
        weight: 3,
        optionA: "묵묵히 옆에서 지지하며, 상대방의 감정을 이해해주려 노력한다",
        optionB: "적극적으로 위로하고, 문제를 해결하는 데 함께하고 싶다"
    },
    {
        id: 8,
        text: "연인에게서 \"귀엽다\"는 말을 들었을 때, 당신의 솔직한 기분은?",
        dimension: 'C',
        weight: 3,
        optionA: "그런 말을 들으면 더 응석 부리고 싶고 기분이 좋다",
        optionB: "내 모습 그대로를 받아들여 준 것 같아 뿌듯하고 흐뭇하다"
    },
    {
        id: 9,
        text: "연인의 사소한 투정이나 어리광을 접했을 때, 당신의 반응은?",
        dimension: 'C',
        weight: 3,
        optionA: "그런 모습을 보며 나도 마음껏 어리광부리고 싶어진다",
        optionB: "귀엽고 사랑스러워서 더 받아주고 싶은 마음이 든다"
    },
    {
        id: 10,
        text: "연인의 고민을 들어줄 때, 당신은 주로 어떤 태도인가요?",
        dimension: 'A',
        weight: 2,
        optionA: "상대방의 이야기를 묵묵히 들어주며 곁을 지켜주는 편이다",
        optionB: "상대방의 감정에 깊이 공감하고 함께 슬퍼하며 보듬어준다"
    },
    {
        id: 11,
        text: "기념일이나 특별한 날, 연인에게서 어떤 선물을 받고 싶나요?",
        dimension: 'A',
        weight: 2,
        optionA: "무엇이든 연인의 마음이 담긴 선물이라면 기쁘게 받아들인다",
        optionB: "나의 취향을 정확히 알고 정성껏 준비한 맞춤형 선물"
    },
    {
        id: 12,
        text: "문득 생각나는 연인상은?",
        dimension: 'C',
        weight: 2,
        optionA: "나를 부드럽게 받아들여주는 사람",
        optionB: "내가 지켜주고 싶어지는 존재"
    },

    // R/P 차원 질문들 (연애관: Realistic/Passionate) - R 3개, P 3개
    {
        id: 13,
        text: "연인과 싸웠을 때 화해하는 가장 효과적인 방법은?",
        dimension: 'P',
        weight: 3,
        optionA: "서로의 감정을 솔직하게 털어놓고 마음으로 소통하며 풀어낸다",
        optionB: "차분히 앉아 문제의 원인을 분석하고 합리적인 해결책을 찾는다"
    },
    {
        id: 14,
        text: "연인과 기념일을 보낼 때, 더 중요하게 생각하는 것은?",
        dimension: 'P',
        weight: 3,
        optionA: "감동적인 이벤트나 특별한 추억을 만들어 강렬한 인상을 남긴다",
        optionB: "실용적이고 필요한 선물을 주고받으며 현실적인 기쁨을 느낀다"
    },
    {
        id: 15,
        text: "연인과의 프러포즈나 결혼식에 대한 환상이 있나요?",
        dimension: 'P',
        weight: 3,
        optionA: "화려하고 낭만적인 이벤트로 기억될 만한 순간을 꿈꾼다",
        optionB: "진심이 담겨 있다면 소박하고 현실적인 것도 괜찮다고 생각한다"
    },
    {
        id: 16,
        text: "사랑이 식었다고 느껴질 때, 당신의 대처 방식은?",
        dimension: 'R',
        weight: 2,
        optionA: "감정의 변화를 냉정하게 인정하고 관계를 정리할 방법을 모색한다",
        optionB: "관계를 되돌리기 위해 다시 열정을 불태우거나 감정적으로 괴로워한다"
    },
    {
        id: 17,
        text: "결혼에 대한 당신의 생각은?",
        dimension: 'R',
        weight: 2,
        optionA: "현실적인 동반자 관계를 통해 안정과 행복을 추구하는 것이다",
        optionB: "뜨거운 사랑의 결실이며, 인생의 가장 낭만적인 약속이다"
    },
    {
        id: 18,
        text: "결혼 후, 연인과의 가장 이상적인 주말은 어떤 모습인가요?",
        dimension: 'R',
        weight: 2,
        optionA: "미래를 위한 자기 계발이나 공동의 목표 달성에 시간을 보낸다",
        optionB: "즉흥적인 데이트나 새로운 경험을 통해 사랑을 다시 불태운다"
    },

    // O/E 차원 질문들 (태도: Optimistic/Earnest) - O 3개, E 3개
    {
        id: 19,
        text: "연인과 사귀고 난 후, 당신의 개인적인 시간 활용은?",
        dimension: 'O',
        weight: 3,
        optionA: "연애 중에도 친구와의 약속이나 개인 취미는 크게 달라지지 않는다",
        optionB: "연인을 최우선으로 생각하며, 대부분의 시간을 연인과 보내는 데 집중한다"
    },
    {
        id: 20,
        text: "연인이 너무 지나치게 질투하거나 집착하는 모습을 보일 때 당신의 반응은?",
        dimension: 'O',
        weight: 3,
        optionA: "조금 부담스럽지만, '나를 정말 좋아하는구나' 하고 넘어가는 편이다",
        optionB: "관계의 문제를 심각하게 느끼고 진지하게 대화하려 한다"
    },
    {
        id: 21,
        text: "이별 후 새로운 연애를 시작하기까지의 기간은?",
        dimension: 'O',
        weight: 3,
        optionA: "다음 연애는 인연이 닿으면 자연스럽게 시작하는 편이다",
        optionB: "충분히 슬퍼하고 관계를 정리한 후, 신중하게 다음 연애를 준비한다"
    },
    {
        id: 22,
        text: "연인과 취미나 관심사를 반드시 공유해야 한다고 생각하나요?",
        dimension: 'E',
        weight: 2,
        optionA: "깊은 관계를 위해 서로의 취미나 관심사를 함께하고 싶다",
        optionB: "각자의 취미를 존중하며, 함께하는 시간도 중요하지만 개인 시간도 필요하다"
    },
    {
        id: 23,
        text: "연애 중 다른 이성과의 자연스러운 교류에 대해 당신의 생각은?",
        dimension: 'E',
        weight: 2,
        optionA: "연인이 있는 동안에는 오해의 소지를 만들지 않도록 조심한다",
        optionB: "연인이 질투하지 않는 선에서 폭넓게 어울리는 것도 괜찮다"
    },
    {
        id: 24,
        text: "연애 중 자신의 솔직한 감정을 어디까지 표현하는 편인가요?",
        dimension: 'E',
        weight: 2,
        optionA: "상대방을 배려하며 감정을 조절하고 신중하게 표현한다",
        optionB: "때로는 감정을 숨기지 않고 자유롭게 표출하는 편이다"
    }
];

// 다국어 질문 텍스트를 가져오는 함수
export const getQuestionText = (questionId: number, t: (key: string) => string): string => {
    return t(`questions.${questionId}`);
};
