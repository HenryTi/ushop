import { UQs } from "uq-app";
import { App } from "../App";
//import { CAdminBase } from "tonwa-contoller";
//import { VRoleSettings } from "./VRoleSettings";

export class CAdmin /*extends CAdminBase<App>*/ {
    readonly uqs: UQs;

    constructor(app: App) {
        //super(app);
        //this.cApp = cApp;
        this.uqs = app.uqs;
    }

    protected async loadAdmins(): Promise<any[]> {
        return await this.uqs.BzWorkshop.AdminGetList();
    }

    protected async setMeAdmin(): Promise<void> {
        await this.uqs.BzWorkshop.AdminSetMe();
    }

    protected async setAdmin(user: number, role: number, assigned: string): Promise<void> {
        await this.uqs.BzWorkshop.AdminSet(user, role, assigned);
    }

    get me(): number {
        return 0; // this.app.user?.id;
    }

    renderRoleSettings(): JSX.Element {
        return null; // this.render(VRoleSettings);
    }
}
