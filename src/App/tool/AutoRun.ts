import { runInAction } from "mobx";

const gaps = [10, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 15, 15, 15, 30, 30, 60];

export class AutoRun {
    private readonly poke: Promise<{ ret: { poke: number }[]; }>;
    private readonly refreshAction: Promise<void>;
    private timer: any;

    constructor(poke: Promise<{ ret: { poke: number }[] }>, refreshAction: Promise<void>) {
        this.poke = poke;
        this.refreshAction = refreshAction;
    }

    start() {
        if (this.refreshAction === undefined) return;
        this.stop();
        this.timer = setInterval(this.callTick, 1000);
    }

    stop() {
        if (this.timer === undefined) return;
        clearInterval(this.timer);
        this.timer = undefined;
    }

    // 数据服务器提醒客户端刷新，下面代码重新调入的数据
    refresh = async () => {
        let d = Date.now() / 1000;
        if (d - this.refreshTime < 30) return;
        await this.refreshAction;
        runInAction(() => {
            this.refreshTime = d;
        });
    }

    refreshTime: number = Date.now() / 1000;

    private tick = 0;
    private gapIndex = 0;
    private callTick = async () => {
        try {
            // if (!this.user) return;
            ++this.tick;
            if (this.tick < gaps[this.gapIndex]) return;
            this.tick = 0;
            if (this.gapIndex < gaps.length - 1) ++this.gapIndex;
            let ret = await this.poke; // this.uqs.JkMe.$poked.query(undefined, undefined, false);
            let v = ret.ret[0];
            if (v === undefined) return;
            if (!v.poke) return;
            this.gapIndex = 1;
            await this.refresh();
        }
        catch {
        }
    }
}
