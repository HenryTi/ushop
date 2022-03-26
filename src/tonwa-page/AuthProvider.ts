export interface User {
    id: number;
    name: string;
    nick?: string;
    icon?: string;
}

type OnLoginChanged = (user: User) => void;
export interface AuthProvider {
    loginChanged(user: User): void;
    subscribeOnLoginChanged(onLoginChanged: OnLoginChanged): void;
    unsubscribeOnLoginChanged(onLoginChanged: OnLoginChanged): void;
}
