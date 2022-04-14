import { useSnapshot } from "valtio";
import { Page, useNav, FA } from "tonwa-com";
import { User } from "tonwa-uq";
import { UserView } from "../UserView";
import { Image } from "../Image";
import { Admin, AdminProps, EnumAdminRoleInEdit } from "./AdminLink";

export function UserPage({ sysAdmins, admins, admin, me, setAdmin }: AdminProps & { admin: Admin; }) {
    let nav = useNav();
    let { id, role, operator, update } = admin;
    let onDelAdmin = async () => {
        let ret = await nav.confirm('do you really want to delete the admin?');
        if (ret === true) {
            let { role } = admin;
            await setAdmin(admin.id, -role, null);
            let list = role === 1 ? sysAdmins : admins;
            removeAdmin(list, admin);
            nav.close();
        }
    }
    let removeAdmin = (list: Admin[], admin: Admin) => {
        let p = list.findIndex(v => v.id === admin.id);
        if (p >= 0) list.splice(p, 1);
    }
    let onEditRemark = async () => {
        alert('on edit remark');
        /*
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
        */
    }

    let { assigned } = useSnapshot(admin);
    function UserTemplate({ user }: { user: User; }) {
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
        <UserView id={id} Template={UserTemplate} />
    </Page>;
}
