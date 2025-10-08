import { LoveTypeScore, LoveTypeCode, Answer, Question } from './types';

// 답변을 기반으로 연애 유형 점수 계산
export function calculateLoveTypeScore(answers: Answer[], questions: Question[]): LoveTypeScore {
    const score: LoveTypeScore = {
        L: 0, F: 0, C: 0, A: 0, R: 0, P: 0, O: 0, E: 0
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

// 연애 유형 점수를 기반으로 유형 결정
export function determineLoveType(score: LoveTypeScore): LoveTypeCode {
    const leadership = score.L > score.F ? 'L' : 'F';
    const affection = score.C > score.A ? 'C' : 'A';
    const relationship = score.R > score.P ? 'R' : 'P';
    const attitude = score.O > score.E ? 'O' : 'E';

    return `${leadership}${affection}${relationship}${attitude}`;
}

// 점수 차이를 백분율로 변환
export function getScorePercentage(score: LoveTypeScore): Record<string, number> {
    const totalL_F = score.L + score.F;
    const totalC_A = score.C + score.A;
    const totalR_P = score.R + score.P;
    const totalO_E = score.O + score.E;

    return {
        L: totalL_F > 0 ? Math.round((score.L / totalL_F) * 100) : 50,
        F: totalL_F > 0 ? Math.round((score.F / totalL_F) * 100) : 50,
        C: totalC_A > 0 ? Math.round((score.C / totalC_A) * 100) : 50,
        A: totalC_A > 0 ? Math.round((score.A / totalC_A) * 100) : 50,
        R: totalR_P > 0 ? Math.round((score.R / totalR_P) * 100) : 50,
        P: totalR_P > 0 ? Math.round((score.P / totalR_P) * 100) : 50,
        O: totalO_E > 0 ? Math.round((score.O / totalO_E) * 100) : 50,
        E: totalO_E > 0 ? Math.round((score.E / totalO_E) * 100) : 50,
    };
}

// 궁합도 계산 (간단한 알고리즘)
export function calculateCompatibility(type1: LoveTypeCode, type2: LoveTypeCode): number {
    const type1Chars = type1.split('');
    const type2Chars = type2.split('');

    let compatibility = 0;

    // 같은 차원에서 반대 성향이면 높은 궁합
    if (type1Chars[0] !== type2Chars[0]) compatibility += 25; // L/F
    if (type1Chars[1] !== type2Chars[1]) compatibility += 25; // C/A
    if (type1Chars[2] !== type2Chars[2]) compatibility += 25; // R/P
    if (type1Chars[3] !== type2Chars[3]) compatibility += 25; // O/E

    return compatibility;
}
