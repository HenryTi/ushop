import { useRef } from "react";
import { Role } from "uq-app/uqs/BzWorkshop";
import { UqIDProps, UqPerson } from "../UqPerson";

export const caption = 'Staff';
export const icon = 'user';
export const iconClass: string = 'text-primary';

export const staffRoles = [Role.counselor, Role.volunteer];
export const staffRoleCaptions: { [role in Role]?: string } = {
    [Role.counselor]: 'Counselor',
    [Role.volunteer]: 'Volunteer',
};

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
    let ret = useRef(new UqStaff(uqIDProps));
    return ret.current;
};
