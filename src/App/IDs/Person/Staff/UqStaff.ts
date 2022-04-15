import { useUqApp } from "App/UqApp";
import { useRef } from "react";
import { Role } from "uqs/BzWorkshop";
import { UqPerson } from "../UqPerson";

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

export function useUqStaff() {
    let app = useUqApp();
    let ret = useRef(new UqStaff(app));
    return ret.current;
};
