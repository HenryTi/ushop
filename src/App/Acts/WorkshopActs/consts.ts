import { Session } from "uqs/BzWorkshop";

export const consts = {
    caption: 'Workshops',
    icon: 'desktop',
    iconClass: 'text-warning',
};

export interface WorkshopItem {
    workshop: number;
    sessions: MSession[];
}

export interface MSession extends Session {
    workshop: number;
    own: number;
    substitue: number;
    done: number;
}
