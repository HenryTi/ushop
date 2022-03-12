import { Role } from "uq-app/uqs/BzWorkshop";
import { CPerson } from "../CPerson";

export class CClient extends CPerson {
    get tagGroupName() { return 'client-tags'; }
    get personRole(): Role { return Role.client; }
    get caption() { return 'Client' }
    get icon() { return 'user-o' }
    get iconClass(): string { return 'text-info'; }
    isInRole(role: Role): boolean { return undefined; }
    isVisible(): boolean {
        return this.app.isAdminOrRole(Role.counselor);
    }
}
