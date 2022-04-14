import { env } from "../tools"

export function buildTFunc(res: { [lang: string]: any }) {
    let langRes = res[env.lang];
    return function (str: string): any {
        return langRes[str];
    }
}
