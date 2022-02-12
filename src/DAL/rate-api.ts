import {instance} from './api';

// types
export type GradeType = 1 | 2 | 3 | 4 | 5


// response form server

type ResponseType = {
    updatedGrade: UpdatedGrade

}
// config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
// data: {updatedGrade: {…}, token: '357d2a50-7de9-11ec-a282-01d3208c78c6', tokenDeathTime: 1643130911989}
// headers: {content-length: '401', content-type: 'application/json; charset=utf-8'}
// request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: true, upload: XMLHttpRequestUpload, …}
// status: 200
// statusText: "OK"
type UpdatedGrade = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}

// api

export const rateApi = {
    updateGrade(grade: number, card_id: string) {
        return instance.put<ResponseType>(`/cards/grade`, {
            grade,
            card_id,
        });
    }
};