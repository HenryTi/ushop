import { UserApi } from "./UserApi";
import { Nav } from "./Nav";
import { CUser } from "./CUser";
import { VPage } from "./VPage";
import { setReact, shallowReact } from "./Reactive";
import { Res } from "./ResCollection";

export abstract class AppBase {
    lang: string;
    district: string;

    constructor() {
        appBase = this;
        this.lang = 'zh';
    }
    shallow: {
        error: {
            name: string;
            message: string;
            stack: string;
        };
    } = shallowReact({
        error: null,
    });

    abstract get cUser(): CUser;
    abstract get userApi(): UserApi;
    protected abstract get nav(): Nav;

    open(page: JSX.Element, afterClose?: () => void): void {
        this.nav.open(page, afterClose);
    }

    close(level: number = 1): void {
        this.nav.close(level);
    }

    get waiting(): new () => VPage { return null; }

    renderAdmin(el: JSX.Element): JSX.Element { return null; }
    renderRole(el: JSX.Element, ...roles: number[]): JSX.Element { return null; }
    renderAdminOrRole(el: JSX.Element, ...roles: number[]): JSX.Element { return null; }
    setError(error: Error) {
        setReact(() => {
            if (!error) {
                this.shallow.error = null;
            }
            else {
                this.shallow.error = {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                };
            }
        });
    }

    t(str: string): Res {
        return str;
    }

    fetch<T>(promise: Promise<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            promise
                .then(resolve)
                .catch((reason: any) => {
                    this.setError(reason);
                    reject(reason);
                });
        })
    }

    async confirm(msg: string): Promise<boolean> {
        return window.confirm(msg);
    }
}

let appBase: AppBase;

export function getAppBase() {
    return appBase;
}
