import { User } from 'tonwa-uq';
import { AppBase, Nav, openPage, UqTagProps, UserApi } from "tonwa-controller";
import { UQs } from "uq-app";
import { Role } from "uq-app/uqs/BzWorkshop";
//import { Acts } from "./Acts";
//import { CIds } from "./IDs";
//import { CMe } from "./CMe";
//import { CTag } from "./CTag";
import { AutoRun } from "./tool";
import { routers } from "./CRouter";
import { Db } from './db';
import { PMain } from './PMain';

type Roles = { [role in Role]: number };

export class App extends AppBase {
    private autoRun: AutoRun;
    private appNav: Nav;
    db: Db;
    user: User;
    meAdmin: boolean;
    meRoles: Roles;
    uqs: UQs;
    //cTag: CTag;
    //cActs: CActs;
    //cIds: CIds;
    //cMe: CMe;
    //cUser: CUser;
    uqTagProps: UqTagProps;

    userApi: UserApi;

    protected get nav(): Nav {
        return this.appNav;
    }

    init(uqs: UQs, nav: Nav) {
        this.db = new Db(uqs);
        this.appNav = nav;
        let poked = uqs.BzWorkshop.$poked.query(undefined, undefined, false);
        let autoLoader: Promise<any> = undefined; // new Promise<any>((resolve, reject) => { });
        this.autoRun = new AutoRun(poked, autoLoader);
        this.uqs = uqs;
        //this.cTag = new CTag(this);
        //this.cActs = new CActs(this);
        //this.cIds = new CIds(this);
        //this.cMe = new CMe(this);
        //this.cUser = new CUser(this);
        let uq = this.uqs.BzWorkshop;
        this.uqTagProps = {
            uq,
            TagGroup: uq.TagGroup,
            Tag: uq.Tag,
            TagItem: uq.TagItem,
            IxTag: uq.IxTag,
            IxIDTag: uq.IxGlobalIdTag,
            groups: [
                { name: 'workshop-tags', vice: 'Workshop tags' },
                { name: 'client-tags', vice: 'Client tags' },
                { name: 'staff-tags', vice: 'Staff tags' },
            ],
        }
    }

    openMain() {
        this.autoRun.start();
        let ret = routers(this);
        if (ret === true) return;
        if (!this.user) {
            this.nav.openLogin();
            return;
        }
        //let cMain = new CMain(this);
        //cMain.openMain();
        openPage(<PMain />);
    }

    isRole(...roles: Role[]): boolean {
        if (roles === undefined) return false;
        for (let r of roles) {
            if (this.meRoles[r] !== undefined) return true;
        }
        return false;
    }

    isAdminOrRole(...roles: Role[]): boolean {
        if (this.meAdmin === true) return true;
        return this.isRole(...roles);
    }

    isPersonMe(person: number): boolean {
        for (let i in this.meRoles) {
            if (person === this.meRoles[Number(i) as Role]) return true;
        }
        return false;
    }

    async loadBaseData() {
        let { BzWorkshop } = this.uqs;
        let ret = await Promise.all([
            //this.cIds.load(),
            BzWorkshop.AdminIsMe(),
            BzWorkshop.IX<{ ix: number; a: number; b: number; }>({
                IX: BzWorkshop.IxUserPerson,
                IX1: BzWorkshop.IxPersonRole,
                ix: undefined,
            })
        ]);
        this.meRoles = this.buildRoles(ret[1] as any);
        this.meAdmin = ret[0];
    }

    private buildRoles(typeValues: { type: string; value: string }[]): Roles {
        let { BzWorkshop } = this.uqs;
        let roles: Roles = {} as Roles;
        for (let row of typeValues) {
            let { type, value } = row;
            let v = BzWorkshop.IDValue(type, value);
            switch (type) {
                case 'personrole':
                    let { person, role } = v as any;
                    roles[role as Role] = person;
                    break;
            }
        }
        return roles;
    }

    renderAdmin(el: JSX.Element): JSX.Element {
        if (this.meAdmin === true) return el;
        return null;
    }
    renderRole(el: JSX.Element, ...roles: number[]): JSX.Element {
        if (this.isRole(...roles) === true) return el;
        return null;
    }
    renderAdminOrRole(el: JSX.Element, ...roles: number[]): JSX.Element {
        if (this.isAdminOrRole(...roles) === true) return el;
        return null;
    }
}

export const app = new App();
export function useApp() {
    return app;
}
