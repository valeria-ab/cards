import {instance,  UserDomainType} from './api';

export type LoginDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
};
export type LogOutType = {
    info: string;
    error: string;
};
type ChangeNamePayloadType = {
    name?: string
    avatar?: string // url or base64
}

export const authApi = {
    login(payload: LoginDataType) {
        return instance.post<UserDomainType>('auth/login', payload);
    },
    logOut() {
        return instance.delete<LogOutType>('auth/me');
    },
    me() {
        return instance.post<UserDomainType>('auth/me', {});
    },
    changeName(payload: ChangeNamePayloadType) {
        return instance.put<{
            token: string
            tokenDeathTime: string
            updatedUser: UserDomainType
        }>
        ('auth/me', {
            name: payload.name,
            avatar: payload.avatar
        });
    },
};
