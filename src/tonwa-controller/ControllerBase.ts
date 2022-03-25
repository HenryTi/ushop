import { AppBase, getAppBase } from "./AppBase";

export abstract class ControllerBase<App extends AppBase> {
    readonly app: App;
    constructor() {
        this.app = getAppBase() as App;
    }
}
