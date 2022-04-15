import { useContext } from 'react';
import { AutoRefresh, UqAppBase, UqAppContext } from 'tonwa-com-uq';
import { UQs } from "uqs";
import { Role } from "uqs/BzWorkshop";

type Roles = { [role in Role]: number };

export class UqApp extends UqAppBase<UQs> {
    private autoRefresh: AutoRefresh;
    private meAdmin: boolean;
    private meRoles: Roles;

    async init(): Promise<any> {
        await super.init();
        let poked = () => this.uqs.BzWorkshop.$poked.query(undefined, undefined, false);
        let autoLoader: Promise<any> = undefined;
        this.autoRefresh = new AutoRefresh(poked, autoLoader);
        this.autoRefresh.start();
    }

    async getIsRole(roles: Role[]): Promise<boolean> {
        if (roles === undefined) return false;
        await this.loadMeRoles();
        for (let r of roles) {
            if (this.meRoles[r] !== undefined) return true;
        }
        return false;
    }

    async getIsAdminOrRole(roles: Role[]): Promise<boolean> {
        if (this.meAdmin === true) return true;
        if (!roles) return false;
        await Promise.all([this.loadMeRoles(), this.loadIsMeAdmin()]);
        return this.getIsRole(roles);
    }

    async getIsPersonMe(person: number): Promise<boolean> {
        await this.loadMeRoles();
        for (let i in this.meRoles) {
            if (person === this.meRoles[Number(i) as Role]) return true;
        }
        return false;
    }

    private async loadIsMeAdmin(): Promise<void> {
        if (this.meAdmin === undefined) {
            this.meAdmin = await this.uqs.BzWorkshop.AdminIsMe();
        }
    }

    private async loadMeRoles(): Promise<void> {
        if (this.meRoles === undefined) {
            let { BzWorkshop } = this.uqs;
            let ret = await BzWorkshop.IX<{ ix: number; type: string; value: string; }>({
                IX: BzWorkshop.IxUserPerson,
                IX1: BzWorkshop.IxPersonRole,
                ix: undefined,
            });
            this.meRoles = this.buildRoles(ret as any);
        }
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
}

export function useUqApp() {
    return useContext<UqApp>(UqAppContext);
}
