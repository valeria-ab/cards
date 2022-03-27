import axios from 'axios';

export const instance = axios.create({
    baseURL:  'https://neko-back.herokuapp.com/2.0' || 'http://localhost:7542/2.0/',
  //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
});


// response form server
export type UserDomainType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
    token: string;
    tokenDeathTime: number;
    __v: number;
};


type UpdateMeType = {
    updatedUser: {};
    token: string;
    tokenDeathTime: number; // под вопросом посмотреть в респонсе
    error?: string;
};

export type updateMeDataType = {
    email: string;
    avatar: string;
};

// api
export const api = {

    // updateMe(payload: updateMeDataType) {
    //     return instance.put<updateMeType>('auth/me', {payload});
    // },
    //

};
