import { UqID, VEditIDProps } from "tonwa-controller";
import { Role, UqExt } from "uq-app/uqs/BzWorkshop";
import { MPerson } from "./CPerson";

export abstract class UqPerson extends UqID {
    abstract isInRole(role: Role): boolean;

    async loadList(personRole: Role): Promise<any[]> {
        let result = await (this.uq as UqExt).GetPersonList.query({ role: personRole });
        let { ret, roles: retRoles } = result;
        let mPerson: MPerson;
        for (let row of ret) {
            let { id } = row;
            mPerson = row as any;
            for (let r of retRoles) {
                let { person, role } = r;
                if (person !== id) continue;
                if (this.isInRole(role as Role) === true) {
                    mPerson.role = role as Role;
                    break;
                }
            }
        }
        return ret;
    }

    async removeBoundUser() {
        let { currentItem } = this.state;
        let BzWorkshop = this.uq as UqExt;
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxUserPerson,
            values: [
                { ix: currentItem.user, xi: -currentItem.id }
            ]
        })
        currentItem.user = undefined;
    }
}
