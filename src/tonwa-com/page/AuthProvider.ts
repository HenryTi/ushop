import React, { useContext } from "react";

export interface User {
    id: number;
    name: string;
    nick?: string;
    icon?: string;
    token?: string;
}

export type OnLoginChanged = (user: User) => Promise<void>;

export interface RegisterParameter {
    nick: string,
    user: string,
    pwd: string,
    country: number,
    mobile: number,
    mobileCountry: number,
    email: string,
    verify: string,
};

export interface AuthApi {
    login(params: { user: string, pwd: string, guest: number }): Promise<any>;
    register(params: RegisterParameter): Promise<any>;
    sendVerify(account: string, type: 'mobile' | 'email', oem: string): Promise<any>;
    checkVerify(account: string, verify: string): Promise<any>;
    isExists(account: string): Promise<any>;
    resetPassword(account: string, password: string, verify: string, type: 'mobile' | 'email'): Promise<any[]>;
    userSetProp(prop: string, value: any): Promise<void>;
    me(): Promise<any>;
    user(id: number): Promise<any>;
    fromKey(key: string): Promise<{ id: number, name: string, nick: string, icon: string }>;
    userQuit(): Promise<void>;
}

export interface AuthProvider {
    setAuthApi(authApi: AuthApi): void;
    guest: number;
    user: User;
    subscribeOnLoginChanged(onLoginChanged: OnLoginChanged): void;
    unsubscribeOnLoginChanged(onLoginChanged: OnLoginChanged): void;
    loginChanged(user: User): void;
    userApi: AuthApi;
}

export const AuthProviderContext = React.createContext<AuthProvider>(undefined);

export function useAuth() {
    return useContext(AuthProviderContext);
}
