import { useUqApp } from "./UqApp";
import { Role } from "uqs/BzWorkshop";
import { useEffect, useState } from "react";

interface ForRoleProps {
    roles?: Role[];
    children: React.ReactNode;
}

export function ForAdmin({ roles, children }: ForRoleProps) {
    let app = useUqApp();
    let [isAdminOrRole, setIsAdminOrRole] = useState<boolean>(false);
    useEffect(() => {
        async function loadIsAdminOrRole() {
            let ret = await app.getIsAdminOrRole(roles);
            setIsAdminOrRole(ret);
        }
        loadIsAdminOrRole();
    }, [app, roles])
    if (isAdminOrRole !== true) return null;
    return <>{children}</>;
}

export function ForRole({ roles, children }: ForRoleProps) {
    let app = useUqApp();
    let [isRole, setIsRole] = useState<boolean>(undefined);
    useEffect(() => {
        async function loadIsAdminOrRole() {
            let ret = await app.getIsRole(roles);
            setIsRole(ret);
        }
        loadIsAdminOrRole();
    }, [app, roles])
    if (roles === undefined) return null;
    if (isRole !== true) return null;
    return <>{children}</>;
}
