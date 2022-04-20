import { useCallback, useEffect, useState } from "react";
import { useNav, Spinner } from "tonwa-com";
import { AdminPage } from "./AdminPage";

export enum EnumAdminRoleInEdit { sys = 1, admin = 2, nSys = -1, nAdmin = -2, }

export interface Admin {
    id: number;
    role: EnumAdminRoleInEdit;
    operator: number;
    create: number;
    update: number;
    user: number;
    assigned: string;
}

interface FuncProps {
    setMeAdmin: () => Promise<void>;
    setAdmin: (user: number, role: number, assigned: string) => Promise<void>;
}

export interface AdminProps extends FuncProps {
    meAdmin: Admin;
    sysAdmins: Admin[];
    admins: Admin[];
    me: number;
}

interface Props extends FuncProps {
    me: number;
    loadAdmins: () => Promise<any[]>;
    LinkContent: (props: { onClick: () => void }) => JSX.Element;
}

interface AdminState {
    meAdmin: Admin;
    sysAdmins: Admin[];
    admins: Admin[];
}

export function AdminLink({ LinkContent, me, loadAdmins, setAdmin, setMeAdmin }: Props) {
    let nav = useNav();
    const [adminState, setAdminState] = useState<AdminState>(null);

    let load = useCallback(async (): Promise<void> => {
        let retAdmins = await loadAdmins();
        if (!retAdmins) return;
        //await this.loadUserNames(retAdmins);
        let state: AdminState = {
            meAdmin: undefined,
            sysAdmins: [],
            admins: [],
        };
        for (let admin of retAdmins) {
            let { id } = admin;
            if (id === me) {
                state.meAdmin = admin;
                continue;
            }
            let { role } = admin;
            switch (role) {
                case -1:
                    break;
                case 1:
                    state.sysAdmins.push(admin);
                    break;
                case 2:
                    state.admins.push(admin);
                    break;
            }
        }
        setAdminState(state);
    }, [me, loadAdmins]);
    useEffect(() => {
        load();
    }, [load]);

    if (adminState === null) {
        return <Spinner />;
    }
    let { meAdmin, sysAdmins, admins } = adminState;
    if (meAdmin === undefined) return null;

    let onClick = async () => {
        function nSetAdmin(user: number, role: number, assigned: string) {
            return setAdmin(user, role, assigned);
        }
        function nSetMeAdmin() {
            setAdminState({
                meAdmin,
                sysAdmins: undefined,
                admins: undefined,
            });
            return setMeAdmin();
        }
        if (adminState.sysAdmins === undefined) {
            await load();
        }
        nav.open(
            <AdminPage meAdmin={meAdmin} sysAdmins={sysAdmins} admins={admins}
                me={me}
                setAdmin={nSetAdmin} setMeAdmin={nSetMeAdmin} />
        )
    }
    return <LinkContent onClick={onClick} />;
}
