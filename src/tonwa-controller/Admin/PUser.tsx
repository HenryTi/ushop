import { FA, Image, UiTextItem } from "tonwa-react";
import { CStringEdit } from '../CEdit';
import { User } from "../User";
import { Admin, Data, EnumAdminRoleInEdit } from "./VAdmin";
import { Page } from "../Page";
import { getAppBase } from "../AppBase";
import { useSnapshot } from "../index";
import { VUser } from "../User";

interface Props {
    data: Data;
    admin: Admin;
    me: number;
    setAdmin: (user: number, role: number, assigned: string) => Promise<void>;
}

export function PUser({ data, admin, me, setAdmin }: Props) {
    let app = getAppBase();
    let { id, role, operator, update } = admin;
    let onDelAdmin = async () => {
        let ret = await app.confirm('do you really want to delete the admin?');
        if (ret === true) {
            let { role } = admin;
            await setAdmin(admin.id, -role, null);
            let list = role === 1 ? data.sysAdmins : data.admins;
            removeAdmin(list, admin);
            app.close();
        }
    }
    let removeAdmin = (list: Admin[], admin: Admin) => {
        let p = list.findIndex(v => v.id === admin.id);
        if (p >= 0) list.splice(p, 1);
    }
    let onEditRemark = async () => {
        let cStringEdit = new CStringEdit(app, {
            itemSchema: { name: 'remark', type: 'string', required: true },
            uiItem: { widget: 'text', maxLength: 100, label: 'Remark' } as UiTextItem,
            value: admin.assigned,
            onChanged: async (fieldName: string, value: any) => {
                admin.assigned = value;
                let { id, role, assigned } = admin;
                await setAdmin(id, role, assigned);
            }
        });
        cStringEdit.onEdit();
    }

    let { assigned } = useSnapshot(admin);
    let renderUser = (user: User) => {
        let { name, nick, icon } = user;
        let vDel: any;
        if ((role === EnumAdminRoleInEdit.sys && Date.now() / 1000 - update < 24 * 3600)
            || operator === me
            || role === EnumAdminRoleInEdit.admin) {
            vDel = <button className="btn btn-sm btn-outline-secondary" onClick={onDelAdmin}>
                Remove {role === EnumAdminRoleInEdit.sys ? 'system admin' : 'admin'}
            </button>;
        }

        return <div>
            <div className="d-flex border m-3 rounded-3 bg-white px-5 py-4">
                <Image src={icon} className="me-4 w-2-5c h-2-5c" />
                <div>
                    <div className="cursor-pointer"
                        onClick={() => onEditRemark()}>
                        <small className="text-muted me-3">Remark:</small>
                        {assigned ?? '-'}
                        <span className="ms-3">
                            <FA name="pencil-square-o" className="text-primary" />
                        </span>
                    </div>
                    <div><small className="me-3 text-muted">Name:</small> {name}</div>
                    <div><small className="me-3 text-muted">Nick:</small> {nick}</div>
                </div>
            </div>
            <div className="d-flex m-3 mt-4 justify-content-end">
                {vDel}
            </div>
        </div>
    }
    return <Page header=" ">
        <VUser id={id} render={renderUser} />
    </Page>;
}
