import { AuthApi, AuthProvider as IAuthProvider, OnLoginChanged, User } from "tonwa-com";

export class AuthProvider implements IAuthProvider {
    private readonly onLoginChangeds: OnLoginChanged[] = [];
    guest: number;
    userApi: AuthApi;
    user: User;

    setAuthApi(authApi: AuthApi): void {
        this.userApi = authApi;
    }

    subscribeOnLoginChanged(onLoginChanged: OnLoginChanged) {
        let p = this.onLoginChangeds.findIndex(v => v === onLoginChanged);
        if (p < 0) {
            this.onLoginChangeds.push(onLoginChanged);
        }
    }
    unsubscribeOnLoginChanged(onLoginChanged: OnLoginChanged) {
        let p = this.onLoginChangeds.findIndex(v => v === onLoginChanged);
        if (p >= 0) {
            this.onLoginChangeds.splice(p, 1);
        }
    }

    loginChanged(user: User): void {
        this.user = user;
        this.onLoginChangeds.forEach(v => v(user));
    }
}

/*
export const authProvider = new AuthProvider();

export function useAuthProvider() {
    return authProvider;
}
*/