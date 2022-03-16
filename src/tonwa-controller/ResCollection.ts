//import { app } from "App";

import { AppBase, getAppBase } from "./AppBase";

export type Res = string | JSX.Element;

export interface ResCollection {
    [str: string]: Res;
}

export function buildTFunc(_res: { [lang: string]: ResCollection }): (str: string) => Res {
    let lang: string;
    let resColl: ResCollection = {};
    let app: AppBase;
    function t(str: string): Res {
        let ret = resColl[str];
        if (ret !== undefined) return ret;
        if (lang === undefined) {
            app = getAppBase();
            lang = app.lang;
        }
        else if (lang !== app.lang) {
            resColl = {};
        }
        let coll = _res[lang];
        if (coll === undefined) {
            ret = app.t(str);
        }
        else {
            ret = coll[str];
            if (ret === undefined) {
                ret = app.t(str);
            }
        }
        if (ret === undefined) ret = str;
        resColl[str] = ret;
        return ret;
    }
    return t;
}
