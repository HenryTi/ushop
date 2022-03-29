import { Nav } from "tonwa-page";
import { UserApi } from "./UserApi";
//import { Nav } from "./Nav";
//import { setReact, shallowReact } from "./Reactive";
import { Res } from "./ResCollection";
import { UqTagProps } from "./Tag";
import { proxy } from "valtio";

export abstract class AppBase {
    lang: string;
    district: string;

    constructor() {
        appBase = this;
        this.lang = 'zh';
    }
    error = proxy<{
        name: string;
        message: string;
        stack: string;
    }>({
        name: null,
        message: null,
        stack: null,
    });

    //abstract get cUser(): CUser;
    abstract get userApi(): UserApi;
    protected abstract get nav(): Nav;

    open(page: JSX.Element, afterClose?: () => void): void {
        this.nav.open(page);
    }

    close(level: number = 1): void {
        //this.nav.close(level);
        for (let i = 0; i < level; i++) {
            this.nav.close();
        }
    }

    get UqTagProps(): UqTagProps { return undefined; }

    renderAdmin(el: JSX.Element): JSX.Element { return null; }
    renderRole(el: JSX.Element, ...roles: number[]): JSX.Element { return null; }
    renderAdminOrRole(el: JSX.Element, ...roles: number[]): JSX.Element { return null; }
    setError(err: unknown) {
        if (!err) {
            this.error.message = null;
        }
        else {
            let error: Error = err as any;
            this.error.name = error.name;
            this.error.message = error.message;
            this.error.stack = error.stack;
        }
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
