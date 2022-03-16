import { Controller } from "tonwa-controller";
import { UQs } from "uq-app";
import { App } from "./App";

export abstract class CControl extends Controller<App> {
    readonly uqs: UQs;
    constructor(app: App) {
        super(app);
        this.uqs = app.uqs;
    }

    openMain() {
        alert('openMain not defined');
    }
}
