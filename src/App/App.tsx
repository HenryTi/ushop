import { useContext } from 'react';
import { AppContainer } from "tonwa-com";
import { AppConfig, AutoRefresh, UqAppBase, UqAppContext } from 'tonwa-com-uq';
import { UQs } from "uq-app";
import { Role } from "uq-app/uqs/BzWorkshop";
import { AppRoutes } from './AppWithPageStack';
//import { AppRoutes } from './AppWithTabs';

type Roles = { [role in Role]: number };

export class App extends UqAppBase<UQs> {
    private autoRefresh: AutoRefresh;
    meAdmin: boolean;
    meRoles: Roles;

    async init(appConfig: AppConfig): Promise<any> {
        await super.init(appConfig);
        let poked = () => this.uqs.BzWorkshop.$poked.query(undefined, undefined, false);
        let autoLoader: Promise<any> = undefined;
        this.autoRefresh = new AutoRefresh(poked, autoLoader);
        this.autoRefresh.start();
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
        if (!roles) return false;
        return this.isRole(...roles);
    }

    isPersonMe(person: number): boolean {
        for (let i in this.meRoles) {
            if (person === this.meRoles[Number(i) as Role]) return true;
        }
        return false;
    }

    protected async loadBaseData() {
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

export function useUqApp() {
    return useContext<App>(UqAppContext);
}

export function AppRoot({ uqApp }: { uqApp: App }) {
    return <UqAppContext.Provider value={uqApp}>
        <AppContainer>
            <AppRoutes />
        </AppContainer>
    </UqAppContext.Provider>;
}
