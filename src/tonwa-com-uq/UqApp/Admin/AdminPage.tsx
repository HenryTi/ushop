import { FA, List, LMR, Page, useNav } from "tonwa-com";
import { User } from "tonwa-uq";
import { Image } from "../Image";
import { SelectUser } from "../SelectUser";
import { UserView } from "../UserView";
import { Admin, AdminProps, EnumAdminRoleInEdit } from "./AdminLink";
import { UserPage } from "./UserPage";
import { MeSysAdminPage } from "./MeSysAdminPage";

const cnRow = ' px-3 py-2 ';
const cnBg = ' bg-white ';
const cnMYLg = ' my-2 ';
const cnMYSm = ' my-1 ';
//const cnSmallMuted = ' small text-muted ';
const info = <FA className="text-primary me-3" name="info-circle" size="lg" />;

export function AdminPage(props: AdminProps) {
    let nav = useNav();
    let { meAdmin, sysAdmins, admins, me, setMeAdmin, setAdmin } = props;

    let showMeSysAdmin = () => {
        nav.open(<MeSysAdminPage {...props} />);
    }
    let onAddAdmin = async (role: EnumAdminRoleInEdit) => {
        let captionSelectUser = 'Add ' + (role === EnumAdminRoleInEdit.sys ? 'system admin' : 'admin');
        //let cSelectUser = new CUser(this.nav, captionSelectUser, this)
        //let ret = await this.app.cUser.select<Admin>(captionSelectUser);
        let ret = await nav.call<User>(<SelectUser header={captionSelectUser} />);
        // let ret = await this.call<any, CAdminBase>(VAddUser, role);
        if (!ret) return;
        let { id: user, assigned } = ret;
        await setAdmin(user, role, assigned);
        let tick = Date.now() / 1000;
        let admin: Admin = {
            id: user,
            user,
            role,
            operator: undefined,
            assigned,
            create: tick,
            update: tick,
        }
        let listAdd: Admin[], listDel: Admin[];
        if (role === 1) {
            listAdd = sysAdmins;
            listDel = admins;
        }
        else {
            listAdd = admins;
            listDel = sysAdmins;
        }
        listAdd.unshift(admin);
        removeAdmin(listDel, admin);
    }

    let removeAdmin = (list: Admin[], admin: Admin) => {
        let p = list.findIndex(v => v.id === admin.id);
        if (p >= 0) list.splice(p, 1);
    }

    let onUser = async (admin: Admin) => {
        nav.open(<UserPage {...props} admin={admin} />);
    }

    let renderMe = (): JSX.Element => {
        switch (meAdmin.role) {
            default: return null;
            case EnumAdminRoleInEdit.nSys:
                return renderMeSystemAdmin(true);
            case EnumAdminRoleInEdit.sys:
                return renderMeSystemAdmin(false);
            case EnumAdminRoleInEdit.admin:
                return <div className={cnRow + cnBg + cnMYLg}>
                    {info} I am an admin
                </div>;
        }
    }

    let renderMeSystemAdmin = (quiting: boolean) => {
        let msg = quiting === true ?
            'I am quiting system admin'
            :
            'I am a system admin';
        return <LMR className={cnRow + cnBg + cnMYLg + ' text-danger cursor-pointer'}
            onClick={showMeSysAdmin}>
            {info}
            <b>{msg}</b>
            <FA name="angle-right" />
        </LMR>;
    }

    let renderSysAdmins = (): JSX.Element => {
        switch (meAdmin.role) {
            case EnumAdminRoleInEdit.nSys: return null;
            case EnumAdminRoleInEdit.admin: return null;
        }

        return <div className="mt-3">
            <div className={cnRow + ' small '}>
                <LMR className="align-items-end">
                    <div>System admins</div>
                    <div className="small text-muted">System admin is an admin, and can add or delete admin</div>
                    {renderAdd(EnumAdminRoleInEdit.sys)}
                </LMR>
            </div>
            <List items={sysAdmins} ItemView={AdminItem} onItemClick={onUser} />
        </div>;
    }

    function VAdmins() {
        switch (meAdmin.role) {
            case EnumAdminRoleInEdit.nSys: return null;
            case EnumAdminRoleInEdit.admin: return null;
        }
        return <div className="mt-3">
            <div className={cnRow + ' small'}>
                <LMR className="align-items-end">
                    <div>Admins</div>
                    <div className="small text-muted">Admin can define user roles</div>
                    {renderAdd(EnumAdminRoleInEdit.admin)}
                </LMR>
            </div>
            <List items={admins} ItemView={AdminItem} onItemClick={onUser} />
        </div>;
    }

    function AdminItem({ value: admin }: { value: Admin; }) {
        let { id, assigned } = admin;
        function UserTemplate({ user }: { user: User; }) {
            let { name, nick, icon } = user;
            return <LMR key={id} className={cnRow + cnMYSm + cnBg}>
                <Image src={icon} className="me-4 align-self-start w-2-5c h-2-5c" />
                {
                    assigned && <div>
                        <small className="text-muted me-3">Remark:</small>
                        {assigned}
                    </div>
                }
                <div><small className="text-muted me-3">Name:</small>{name}</div>
                {nick && <div><small className="text-muted me-3">Nick:</small>{nick}</div>}
                <FA name="angle-right" className="cursor-pointer" />
            </LMR>;
        };
        return <UserView id={id} Template={UserTemplate} />;
    }

    let renderAdd = (role: EnumAdminRoleInEdit): JSX.Element => {
        return <button className="btn btn-sm btn-outline-success" onClick={() => onAddAdmin(role)}>
            <FA name="plus" />
        </button>;
    }

    return <Page header="Admin">
        <div>
            {renderMe()}
            {renderSysAdmins()}
            <VAdmins />
        </div>
    </Page>;
}

/*
import { User } from "tonwa-con troller";
import { FA, Image, List, LMR } from "tonwa-react";
import { Admin, EnumAdminRoleInEdit } from ".";
import { VPage } from "../VPage";
import { CAdminBase } from "./PAdmin";

const cnRow = ' px-3 py-2 ';
const cnBg = ' bg-white ';
const cnMYLg = ' my-2 ';
const cnMYSm = ' my-1 ';
//const cnSmallMuted = ' small text-muted ';
const info = <FA className="text-primary me-3" name="info-circle" size="lg" />;

export class VStart extends VPage<CAdminBase> {
    header(): string | boolean | JSX.Element {
        return 'Admin';
    }

    content() {
        return this.react(() => {
            return <div>
                {this.renderMe()}
                {this.renderSysAdmins()}
                {this.renderAdmins()}
            </div>
        });
    }

    private renderMe(): JSX.Element {
        let { deep } = this.controller;
        let { meAdmin } = deep;
        switch (meAdmin.role) {
            default: return null;
            case EnumAdminRoleInEdit.nSys: return this.renderMeSystemAdmin(true);
            case EnumAdminRoleInEdit.sys: return this.renderMeSystemAdmin(false);
            case EnumAdminRoleInEdit.admin:
                return <div className={cnRow + cnBg + cnMYLg}>
                    {info} I am an admin
                </div>;
        }
    }

    private renderMeSystemAdmin(quiting: boolean) {
        let rightAngle = <FA name="angle-right" />;
        let msg = quiting === true ?
            'I am quiting system admin'
            :
            'I am a system admin';
        return <LMR className={cnRow + cnBg + cnMYLg + ' text-danger cursor-pointer'}
            onClick={this.controller.showMeSysAdmin}
            right={rightAngle}>
            {info}
            <b>{msg}</b>
        </LMR>;
    }

    private renderSysAdmins(): JSX.Element {
        let { deep } = this.controller;
        let { meAdmin } = deep;
        switch (meAdmin.role) {
            case EnumAdminRoleInEdit.nSys: return null;
            case EnumAdminRoleInEdit.admin: return null;
        }

        let { sysAdmins } = deep;
        return <div className="mt-3">
            <div className={cnRow + ' small '}>
                <LMR right={this.renderAdd(EnumAdminRoleInEdit.sys)} className="align-items-end">
                    <div>System admins</div>
                    <div className="small text-muted">System admin is an admin, and can add or delete admin</div>
                </LMR>
            </div>
            <List items={sysAdmins} item={{ render: this.renderAdminItem, onClick: this.controller.onUser }} />
        </div>;
    }

    private renderAdmins(): JSX.Element {
        let { deep } = this.controller;
        let { meAdmin } = deep;
        switch (meAdmin.role) {
            case EnumAdminRoleInEdit.nSys: return null;
            case EnumAdminRoleInEdit.admin: return null;
        }
        let { admins } = deep;
        return <div className="mt-3">
            <div className={cnRow + ' small'}>
                <LMR right={this.renderAdd(EnumAdminRoleInEdit.admin)} className="align-items-end">
                    <div>Admins</div>
                    <div className="small text-muted">Admin can define user roles</div>
                </LMR>
            </div>
            <List items={admins} item={{ render: this.renderAdminItem, onClick: this.controller.onUser }} />
        </div>;
    }

    private renderAdminItem = (admin: Admin, index: number) => {
        let { id, assigned } = admin;
        return this.controller.app.cUser.renderUser(id, (user: User) => {
            let { name, nick, icon } = user;
            let right = <FA name="angle-right" className="cursor-pointer" />;
            return <LMR key={id}
                className={cnRow + cnMYSm + cnBg}
                left={<Image src={icon} className="me-4 align-self-start w-2-5c h-2-5c" />}
                right={right}>
                {
                    assigned && <div>
                        <small className="text-muted me-3">Remark:</small>
                        {assigned}
                    </div>
                }
                <div><small className="text-muted me-3">Name:</small>{name}</div>
                <div><small className="text-muted me-3">Nick:</small>{nick}</div>
            </LMR>;
        });
    }

    renderAdd(role: EnumAdminRoleInEdit): JSX.Element {
        return <button className="btn btn-sm btn-outline-success" onClick={() => this.controller.onAddAdmin(role)}>
            <FA name="plus" />
        </button>;
    }
}
*/