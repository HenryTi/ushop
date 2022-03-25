import { ControllerBase } from "tonwa-controller";
import { UQs } from "uq-app";
import { App } from "./App";

export abstract class Controller extends ControllerBase<App> {
    protected readonly uqs: UQs;
    constructor() {
        super();
        this.uqs = this.app.uqs;
    }
}
