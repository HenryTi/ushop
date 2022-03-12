import { useEffect, useState } from "react";
import { getAppBase } from "../AppBase";
import { Spinner } from "../tool";
import { proxy } from '../index'
import { VStart } from "./VStart";

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

export interface Data {
    meAdmin: Admin;
    sysAdmins: Admin[];
    admins: Admin[];
}

interface Props {
    Content: (props: { onClick: () => void }) => JSX.Element;
    me: number;
    loadAdmins: () => Promise<any[]>;
    setMeAdmin: () => Promise<void>;
    setAdmin: (user: number, role: number, assigned: string) => Promise<void>;
}

export function VAdmin({ Content, me, loadAdmins, setAdmin, setMeAdmin }: Props) {
    const [data, setData] = useState<Data>(null);

    async function load(): Promise<void> {
        let retAdmins = await loadAdmins();
        if (!retAdmins) return;
        //await this.loadUserNames(retAdmins);
        let sysAdmins: Admin[] = [];
        let admins: Admin[] = [];
        let meAdmin: Admin;
        for (let admin of retAdmins) {
            let { id } = admin;
            if (id === me) {
                meAdmin = admin;
                continue;
            }
            let { role } = admin;
            switch (role) {
                case -1:
                    break;
                case 1:
                    sysAdmins.push(admin);
                    break;
                case 2:
                    admins.push(admin);
                    break;
            }
        }
        setData(proxy<Data>({
            meAdmin,
            sysAdmins,
            admins,
        }));
        //data.meAdmin = meAdmin;
        //data.sysAdmins = sysAdmins;
        //data.admins = admins;
    }

    useEffect(() => {
        load();
    }, []);

    if (data === null) {
        return <Spinner />;
    }

    let onClick = () => {
        let app = getAppBase();
        app.open(<VStart data={data} me={me} setAdmin={setAdmin} setMeAdmin={setMeAdmin} />)
    }
    return <Content onClick={onClick} />;
}
