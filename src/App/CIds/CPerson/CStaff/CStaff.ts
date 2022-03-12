import { CIdBase, VPage, setReact } from "tonwa-contoller";
import { CEnumSingle } from "tonwa-contoller/CEnumBase";
import { IX } from "tonwa-uq";
import { Role } from "uq-app/uqs/BzWorkshop";
import { CPerson, MPerson } from "../CPerson";
import { renderStaff } from "./renderStaff";
import { VEditStaff } from "./VEditStaff";

export const staffRoles = [Role.counselor, Role.volunteer];
export const staffRoleCaptions: { [role in Role]?: string } = {
    [Role.counselor]: 'Counselor',
    [Role.volunteer]: 'Volunteer',
};

export class CStaff extends CPerson {
    cRoleSingle: CRoleSingle;
    get tagGroupName() { return 'staff-tags'; }
    get personRole(): Role { return Role.staff; }
    get caption() { return 'Staff' }
    get icon() { return 'user' }
    isInRole(role: Role): boolean { return staffRoleCaptions[role] !== undefined; }

    protected async beforeEdit() {
        this.cRoleSingle = new CRoleSingle(this);
        await super.beforeEdit();
    }

    get VEdit(): new (c: CIdBase) => VPage<CPerson> {
        return VEditStaff as any;
    }
    /*
    saveStaffRole = async (role: Role) => {
        let { BzWorkshop } = this.uqs;
        let { currentItem } = this.deepData;
        let personId = currentItem.id;
        let values = staffRoles.map(v => (
            { ix: personId, xi: v }
        ));
        // delete all other roles
        for (let v of values) {
            if (v.xi !== role) {
                v.xi = -v.xi;
            }
        }
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxPersonRole,
            values
        });
        setReact(() => {
            currentItem.role = role;
        });
    }
    */
    onRoleChanged = async (value: Role): Promise<void> => {
        setReact(() => {
            let { currentItem } = this.deepData;
            currentItem.role = value;
        });
    }

    renderItemInList(item: any): JSX.Element {
        return renderStaff(item, this.cIds.app.cUser);
    }
}

class CRoleSingle extends CEnumSingle<Role> {
    private readonly cStaff: CStaff;
    constructor(cStaff: CStaff) {
        let { currentItem } = cStaff.deepData;
        super(cStaff.app, currentItem?.id, (currentItem as MPerson).role);
        this.cStaff = cStaff;
    }
    get enums() { return staffRoles; }
    get enumCaptions() { return staffRoleCaptions; }

    get caption() { return 'Role' }
    get uq() { return this.cStaff.uqs.BzWorkshop; }
    get IX(): IX { return this.uq.IxPersonRole; }
    get OnEnumChanged(): (value: Role) => Promise<void> {
        return this.cStaff.onRoleChanged;
    }
}
