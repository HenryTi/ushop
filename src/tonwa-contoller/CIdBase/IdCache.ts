import { setReact, shallowReact } from "../Reactive";
import { CIdBase, IdValue } from "./CIdBase";

interface ShallowData {
    cache: Map<number, IdValue>;
}

export class IdCache {
    private readonly shallowData: ShallowData = shallowReact<ShallowData>({
        cache: new Map<number, IdValue>(),
    });

    private readonly cId: CIdBase;
    constructor(cId: CIdBase) {
        this.cId = cId;
    }

    getValue(id: number): IdValue {
        let ret = this.shallowData.cache.get(id);
        if (ret === null) return null;
        if (ret === undefined) {
            this.loadValue(id);
        }
        return ret;
    }

    async loadValue(id: number) {
        try {
            let ret = await this.cId.loadValue(id);
            this.setCache(id, ret);
        }
        catch {
            this.setCache(id, null);
        }
    }

    setCache(id: number, value: IdValue) {
        setReact(() => this.shallowData.cache.set(id, value));
    }
}
