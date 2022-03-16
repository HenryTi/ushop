import { useSnapshot } from 'valtio';
import { proxyMap } from 'valtio/utils';
import { getAppBase } from "..";

export interface User {
    id: number;
    name: string;
    nick: string;
    icon: string;
    assigned: string;
}

export const userCache = proxyMap<number, User>([]);

export function useUser(id: number): User {
    let cacheSnapshop = useSnapshot(userCache);
    if (!id) return null;
    let ret = cacheSnapshop.get(id);
    if (ret === null) return null;
    if (ret === undefined) {
        loadUser(id);
    }
    return ret;
}

async function loadUser(id: number) {
    let app = getAppBase();
    try {
        let ret = await app.userApi.userFromId(id);
        userCache.set(id, ret);
    }
    catch {
        userCache.set(id, null);
    }
}


