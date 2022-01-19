import axios from 'axios';

export const instance = axios.create({
   //baseURL: "http://localhost:7542/2.0/",
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

// types
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

type registerType = {
    addedUser: UserDomainType;
    error?: string;
};

type updateMeType = {
    updatedUser: {};
    token: string;
    tokenDeathTime: number; // под вопросом посмотреть в респонсе
    error?: string;
};

type unLoginType = {
    info: string;
    error: string;
};

type SetNewPasswordAnswerType = {
    info: string;
    error: string;
};

type SendMessageType = {
    answer: boolean;
    html: boolean;
    info: string;
    success: boolean;
};

//request to server
export type LoginDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
};

type registerDataType = {
    email: string;
    password: string;
};

export type updateMeDataType = {
    email: string;
    avatar: string;
};

type SetNewPasswordType = {
    password: string;
    resetPasswordToken: string;
};

// api
export const api = {
    login(payload: LoginDataType) {
        return instance.post<UserDomainType>('auth/login', payload);
    },
    register(payload: registerDataType) {
        return instance.post<registerType>('auth/register', {
            email: payload.email,
            password: payload.password,
        });
    },
    me() {
        return instance.post<UserDomainType>('auth/me', {});
    },
    updateMe(payload: updateMeDataType) {
        return instance.put<updateMeType>('auth/me', {payload});
    },
    unLoginMe() {
        return instance.delete<unLoginType>('auth/me');
    },
    forgotPassword(email: string) {
        return instance.post<SendMessageType>('auth/forgot', {
            email,
            from: 'test-front-admin <XXX@gmail.com>',
            message: `<div><h1><a href='https://valeria-ab.github.io/cards/#/set-new-password/$token$'>change password</h1></div>`,
        });
    },
    newPassword(password: string, token: string) {
        return instance.post<SetNewPasswordAnswerType>('auth/set-new-password', {
            password,
            resetPasswordToken: token,
        });
    },
};
