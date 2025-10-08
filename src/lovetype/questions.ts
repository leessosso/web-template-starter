import type { Question } from './types';

// MBTI 기반 연애 유형 테스트 질문들
export const questions: Question[] = [
    // E/I 차원 질문들
    {
        id: 1,
        text: "새로운 사람들과의 만남에서 에너지를 얻는다",
        dimension: 'E',
        weight: 3
    },
    {
        id: 2,
        text: "혼자만의 시간이 필요하다",
        dimension: 'I',
        weight: 3
    },
    {
        id: 3,
        text: "파티나 모임에서 활발하게 참여한다",
        dimension: 'E',
        weight: 2
    },
    {
        id: 4,
        text: "깊이 있는 대화를 선호한다",
        dimension: 'I',
        weight: 2
    },

    // S/N 차원 질문들
    {
        id: 5,
        text: "현실적이고 구체적인 계획을 세운다",
        dimension: 'S',
        weight: 3
    },
    {
        id: 6,
        text: "미래의 가능성에 대해 상상한다",
        dimension: 'N',
        weight: 3
    },
    {
        id: 7,
        text: "세부사항에 주의를 기울인다",
        dimension: 'S',
        weight: 2
    },
    {
        id: 8,
        text: "큰 그림을 보는 것을 선호한다",
        dimension: 'N',
        weight: 2
    },

    // T/F 차원 질문들
    {
        id: 9,
        text: "논리적 분석을 통해 결정한다",
        dimension: 'T',
        weight: 3
    },
    {
        id: 10,
        text: "다른 사람의 감정을 고려한다",
        dimension: 'F',
        weight: 3
    },
    {
        id: 11,
        text: "객관적 기준으로 판단한다",
        dimension: 'T',
        weight: 2
    },
    {
        id: 12,
        text: "조화로운 관계를 중시한다",
        dimension: 'F',
        weight: 2
    },

    // J/P 차원 질문들
    {
        id: 13,
        text: "계획을 세우고 체계적으로 진행한다",
        dimension: 'J',
        weight: 3
    },
    {
        id: 14,
        text: "유연하고 즉흥적인 것을 선호한다",
        dimension: 'P',
        weight: 3
    },
    {
        id: 15,
        text: "마감일을 잘 지킨다",
        dimension: 'J',
        weight: 2
    },
    {
        id: 16,
        text: "새로운 기회에 열려있다",
        dimension: 'P',
        weight: 2
    },

    // 연애 관련 추가 질문들
    {
        id: 17,
        text: "연인과 함께 새로운 경험을 추구한다",
        dimension: 'E',
        weight: 2
    },
    {
        id: 18,
        text: "연인과의 깊은 정신적 교감을 원한다",
        dimension: 'I',
        weight: 2
    },
    {
        id: 19,
        text: "연인에게 실용적인 도움을 주고 싶다",
        dimension: 'S',
        weight: 2
    },
    {
        id: 20,
        text: "연인과 함께 꿈을 키워나가고 싶다",
        dimension: 'N',
        weight: 2
    },
    {
        id: 21,
        text: "연인과의 갈등을 논리적으로 해결하려 한다",
        dimension: 'T',
        weight: 2
    },
    {
        id: 22,
        text: "연인의 감정을 우선적으로 배려한다",
        dimension: 'F',
        weight: 2
    },
    {
        id: 23,
        text: "연인과의 데이트를 미리 계획한다",
        dimension: 'J',
        weight: 2
    },
    {
        id: 24,
        text: "연인과의 데이트에서 즉흥적인 재미를 즐긴다",
        dimension: 'P',
        weight: 2
    }
];
