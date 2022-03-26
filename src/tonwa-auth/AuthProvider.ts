interface User {
    id: number;
    name: string;
    nick?: string;
    icon?: string;
}

type OnLoginChanged = (user: User) => void;

export class AuthProvider {
    static current: AuthProvider = new AuthProvider();
    private constructor() { }

    readonly onLoginChangeds: OnLoginChanged[] = [];
    user: User;

    subscribeOnLoginChanged(onLoginChanged: OnLoginChanged) {
        let p = this.onLoginChangeds.findIndex(v => v === onLoginChanged);
        if (p < 0) {
            this.onLoginChangeds.push(onLoginChanged);
            onLoginChanged(this.user);
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
