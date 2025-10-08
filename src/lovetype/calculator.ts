import { MBTIScore, MBTIType, Answer, Question } from './types';

// 답변을 기반으로 MBTI 점수 계산
export function calculateMBTIScore(answers: Answer[], questions: Question[]): MBTIScore {
    const score: MBTIScore = {
        E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    };

    answers.forEach(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        if (question) {
            const weightedScore = answer.score * question.weight;
            score[question.dimension] += weightedScore;
        }
    });

    return score;
}

// MBTI 점수를 기반으로 유형 결정
export function determineMBTIType(score: MBTIScore): MBTIType {
    const E_I = score.E > score.I ? 'E' : 'I';
    const S_N = score.S > score.N ? 'S' : 'N';
    const T_F = score.T > score.F ? 'T' : 'F';
    const J_P = score.J > score.P ? 'J' : 'P';

    return `${E_I}${S_N}${T_F}${J_P}` as MBTIType;
}

// 점수 차이를 백분율로 변환
export function getScorePercentage(score: MBTIScore): Record<string, number> {
    const totalE_I = score.E + score.I;
    const totalS_N = score.S + score.N;
    const totalT_F = score.T + score.F;
    const totalJ_P = score.J + score.P;

    return {
        E: totalE_I > 0 ? Math.round((score.E / totalE_I) * 100) : 50,
        I: totalE_I > 0 ? Math.round((score.I / totalE_I) * 100) : 50,
        S: totalS_N > 0 ? Math.round((score.S / totalS_N) * 100) : 50,
        N: totalS_N > 0 ? Math.round((score.N / totalS_N) * 100) : 50,
        T: totalT_F > 0 ? Math.round((score.T / totalT_F) * 100) : 50,
        F: totalT_F > 0 ? Math.round((score.F / totalT_F) * 100) : 50,
        J: totalJ_P > 0 ? Math.round((score.J / totalJ_P) * 100) : 50,
        P: totalJ_P > 0 ? Math.round((score.P / totalJ_P) * 100) : 50,
    };
}

// 궁합도 계산 (간단한 알고리즘)
export function calculateCompatibility(type1: MBTIType, type2: MBTIType): number {
    const type1Chars = type1.split('');
    const type2Chars = type2.split('');

    let compatibility = 0;

    // 같은 차원에서 반대 성향이면 높은 궁합
    if (type1Chars[0] !== type2Chars[0]) compatibility += 25; // E/I
    if (type1Chars[1] !== type2Chars[1]) compatibility += 25; // S/N
    if (type1Chars[2] !== type2Chars[2]) compatibility += 25; // T/F
    if (type1Chars[3] !== type2Chars[3]) compatibility += 25; // J/P

    return compatibility;
}
