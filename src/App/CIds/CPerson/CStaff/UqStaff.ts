import { UqIDProps } from "tonwa-controller";
import { Role } from "uq-app/uqs/BzWorkshop";
import { UqPerson } from "../UqPerson";
import { staffRoleCaptions } from "./CStaff";

export class UqStaff extends UqPerson {
    isInRole(role: Role): boolean {
        return staffRoleCaptions[role] !== undefined;
    }
    onRoleChanged = (value: number) => {
        let { currentItem } = this.state;
        currentItem.role = value;
        return;
    }
}

export function useUqStaff(uqIDProps: UqIDProps) {
    return new UqStaff(uqIDProps);
};
