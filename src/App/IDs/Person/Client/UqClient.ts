import { useRef } from "react";
import { Role } from "uq-app/uqs/BzWorkshop";
import { UqIDProps, UqPerson } from "../UqPerson";

export class UqClient extends UqPerson {
    isInRole(role: Role): boolean { return undefined; }
}

export function useUqClient(uqIDProps: UqIDProps) {
    let ret = useRef(new UqClient(uqIDProps));
    return ret.current;
};
