import {instance} from './api';

type SendMessageType = {
    answer: boolean;
    html: boolean;
    info: string;
    success: boolean;
};
type SetNewPasswordAnswerType = {
    info: string;
    error: string;
};

export const forgotApi = {
    forgotPassword(email: string) {
        return instance.post<SendMessageType>('auth/forgot', {
            email,
            from: 'test-front-admin <XXX@gmail.com>',
            message: `<div style="background-color: #ff5df3; padding: 15px"><h1><a href='https://valeria-ab.github.io/cards/#/set-new-password/$token$'>change password</h1></div>`,
        });
    },
    newPassword(password: string, token: string) {
        return instance.post<SetNewPasswordAnswerType>('auth/set-new-password', {
            password,
            resetPasswordToken: token,
        });
    },
};
