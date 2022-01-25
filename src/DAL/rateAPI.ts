import {instance} from './api';

// types
export type GradeType = 1 | 2 | 3 | 4 | 5


// response form server

type UpdatedGrade = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: GradeType
    shots: number
}

// api

export const rateAPI = {
    updateGrade(grade: number, card_id: string) {
        return instance.put<UpdatedGrade>(`/cards/grade`, {
            grade,
            card_id,
        });
    }
};