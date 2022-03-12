import { Controller, react, setReact, shallowReact } from "tonwa-contoller";
import { mutedSmall } from "../tool";
import { VSelectUser } from "./VSelectUser";

interface ShallowData {
    cache: Map<number, User>;
}

export interface User {
    id: number;
    name: string;
    nick: string;
    icon: string;
}

export class CUser extends Controller {
    private readonly shallow: ShallowData = shallowReact<ShallowData>({
        cache: new Map<number, User>(),
    });
    //private readonly userApi: UserApi;
    caption: string;
    /*
    constructor(app: AppBase, userApi: UserApi) {
        super(app);
        this.userApi = userApi;
    }
    */

    async select<T>(caption: string): Promise<T> {
        this.caption = caption;
        let ret = await this.call<any, CUser>(VSelectUser);
        return ret;
    }

    async searchUser(key: string): Promise<any> {
        let user = await this.app.userApi.userFromName(key);
        this.setCache(user.id, user);
        return user;
    }

    renderUser(id: number, render: (user: User) => JSX.Element): JSX.Element {
        return react(() => {
            if (!id) return null;
            let user = this.userFromCache(id);
            if (!user) return mutedSmall(id);
            return render(user);
        });
    }

    private userFromCache(id: number): User {
        let ret = this.shallow.cache.get(id);
        if (ret === null) return null;
        if (ret === undefined) {
            this.loadUser(id);
        }
        return ret;
    }

    private async loadUser(id: number) {
        try {
            let ret = await this.app.userApi.userFromId(id);
            this.setCache(id, ret);
        }
        catch {
            this.setCache(id, null);
        }
    }

    private setCache(id: number, user: User) {
        setReact(() => this.shallow.cache.set(id, user));
    }
}
