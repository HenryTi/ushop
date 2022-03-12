import { getAppBase } from "./AppBase";
import { PWaiting } from "./PWaiting";

export function openPage(page: JSX.Element, promise?: Promise<void>, afterClose?: () => void) {
    let app = getAppBase();
    if (promise) {
        let isWaiting = false;
        setTimeout(() => {
            if (isWaiting === undefined) return;
            app.open(<PWaiting />);
            isWaiting = true;
        }, 100);
        promise.then(() => {
            if (isWaiting === true) {
                app.close();
            }
            isWaiting = undefined;
            app.open(page, afterClose);
            return;
        });
        return;
    }

    app.open(page, afterClose);
}