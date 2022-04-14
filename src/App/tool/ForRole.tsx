import { useUqApp } from "../App";
import { Role } from "uq-app/uqs/BzWorkshop";

interface ForRoleProps {
    roles?: Role[];
    children: React.ReactNode;
}

export function ForAdmin({ roles, children }: ForRoleProps) {
    let app = useUqApp();
    if (app.isAdminOrRole(...(roles ?? [])) === false) return null;
    return <>{children}</>;
}

export function ForRole({ roles, children }: ForRoleProps) {
    let app = useUqApp();
    if (roles === undefined) return null;
    if (app.isRole(...roles) === false) return null;
    return <>{children}</>;
}
