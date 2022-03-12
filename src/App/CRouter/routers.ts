import { App } from "../App";
import { CClientSurvey } from "./CClientSurvey";
import { CRouter } from "./CRouter";

const coll: {
    [name: string]: new (a: App) => CRouter
} = {
    '/client/survey/': CClientSurvey,
};

export function routers(app: App): boolean {
    let { href } = document.location;
    let path = href.toLowerCase();
    for (let i in coll) {
        let p = path.indexOf(i.toLowerCase());
        if (p >= 0) {
            let Control = coll[i];
            let param = path.substring(p + i.length);
            let c = new Control(app);
            c.pathParam = param;
            c.openMain();
            return true;
        }
    }
    return false;
}
