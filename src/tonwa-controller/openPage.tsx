import { getAppBase } from "./AppBase";
import { PWaiting } from "./PWaiting";

export function openPage(page: JSX.Element | (() => Promise<JSX.Element>), afterClose?: () => void): void {
    let app = getAppBase();
    if (!page) return;

    if (typeof (page) === 'function') {
        let promise: Promise<JSX.Element> = page();
        let isWaiting = false;
        setTimeout(() => {
            if (isWaiting === undefined) return;
            app.open(<PWaiting />);
            isWaiting = true;
        }, 100);
        promise.then((pg) => {
            if (isWaiting === true) {
                app.close();
            }
            isWaiting = undefined;
            app.open(pg, afterClose);
            return;
        });
        return;
    }

    app.open(page as JSX.Element, afterClose);
}

export function closePage(level?: number) {
    let app = getAppBase();
    app.close(level);
}