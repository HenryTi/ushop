import { UqIDProps } from "tonwa-controller";
import { Role } from "uq-app/uqs/BzWorkshop";
import { UqPerson } from "../UqPerson";

export class UqClient extends UqPerson {
    isInRole(role: Role): boolean { return undefined; }
}

export function useUqClient(uqIDProps: UqIDProps) {
    return new UqClient(uqIDProps);
};
