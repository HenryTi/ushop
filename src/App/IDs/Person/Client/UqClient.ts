import { useUqApp } from "App/UqApp";
import { useRef } from "react";
import { Role } from "uqs/BzWorkshop";
import { UqPerson } from "../UqPerson";

export class UqClient extends UqPerson {
    isInRole(role: Role): boolean { return undefined; }
}

export function useUqClient() {
    let app = useUqApp();
    let ret = useRef(new UqClient(app));
    return ret.current;
};
