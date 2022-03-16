import { FA, Image, List, LMR } from "tonwa-react";
import { Page } from "../Page";
import { getAppBase } from "../AppBase";
import { Admin, Data, EnumAdminRoleInEdit } from "./VAdmin";
import { useSnapshot } from "../index";
import { selectUser, User, VUser } from "../User";
import { PUser } from "./PUser";
import { PMeSysAdmin } from "./PMeSysAdmin";

const cnRow = ' px-3 py-2 ';
const cnBg = ' bg-white ';
const cnMYLg = ' my-2 ';
const cnMYSm = ' my-1 ';
//const cnSmallMuted = ' small text-muted ';
const info = <FA className="text-primary me-3" name="info-circle" size="lg" />;

interface Props {
    data: Data;
    me: number;
    setMeAdmin: () => Promise<void>;
    setAdmin: (user: number, role: number, assigned: string) => Promise<void>;
}

export function PAdmin({ data, me, setMeAdmin, setAdmin }: Props) {
    let { meAdmin } = useSnapshot(data);
    let app = getAppBase();

    let showMeSysAdmin = () => {
        app.open(<PMeSysAdmin data={data} setMeAdmin={setMeAdmin} />);
    }
    let onAddAdmin = async (role: EnumAdminRoleInEdit) => {
        let captionSelectUser = 'Add ' + (role === EnumAdminRoleInEdit.sys ? 'system admin' : 'admin');
        //let cSelectUser = new CUser(this.nav, captionSelectUser, this)
        //let ret = await this.app.cUser.select<Admin>(captionSelectUser);
        let ret = await selectUser(captionSelectUser);
        // let ret = await this.call<any, CAdminBase>(VAddUser, role);
        if (!ret) return;
        let { id: user, assigned } = ret;
        await app.fetch(setAdmin(user, role, assigned));
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
            listAdd = data.sysAdmins;
            listDel = data.admins;
        }
        else {
            listAdd = data.admins;
            listDel = data.sysAdmins;
        }
        listAdd.unshift(admin);
        removeAdmin(listDel, admin);
    }

    let removeAdmin = (list: Admin[], admin: Admin) => {
        let p = list.findIndex(v => v.id === admin.id);
        if (p >= 0) list.splice(p, 1);
    }

    let onUser = async (admin: Admin) => {
        app.open(<PUser data={data} admin={admin} setAdmin={setAdmin} me={me} />);
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
        let rightAngle = <FA name="angle-right" />;
        let msg = quiting === true ?
            'I am quiting system admin'
            :
            'I am a system admin';
        return <LMR className={cnRow + cnBg + cnMYLg + ' text-danger cursor-pointer'}
            onClick={showMeSysAdmin}
            right={rightAngle}>
            {info}
            <b>{msg}</b>
        </LMR>;
    }

    let renderSysAdmins = (): JSX.Element => {
        switch (meAdmin.role) {
            case EnumAdminRoleInEdit.nSys: return null;
            case EnumAdminRoleInEdit.admin: return null;
        }

        return <div className="mt-3">
            <div className={cnRow + ' small '}>
                <LMR right={renderAdd(EnumAdminRoleInEdit.sys)} className="align-items-end">
                    <div>System admins</div>
                    <div className="small text-muted">System admin is an admin, and can add or delete admin</div>
                </LMR>
            </div>
            <List items={data.sysAdmins} item={{ render: renderAdminItem, onClick: onUser }} />
        </div>;
    }

    function VAdmins() {
        switch (meAdmin.role) {
            case EnumAdminRoleInEdit.nSys: return null;
            case EnumAdminRoleInEdit.admin: return null;
        }
        return <div className="mt-3">
            <div className={cnRow + ' small'}>
                <LMR right={renderAdd(EnumAdminRoleInEdit.admin)} className="align-items-end">
                    <div>Admins</div>
                    <div className="small text-muted">Admin can define user roles</div>
                </LMR>
            </div>
            <List items={data.admins} item={{ render: renderAdminItem, onClick: onUser }} />
        </div>;
    }

    let renderAdminItem = (admin: Admin, index: number) => {
        let { id, assigned } = admin;
        let renderUser = (user: User) => {
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
                {nick && <div><small className="text-muted me-3">Nick:</small>{nick}</div>}
            </LMR>;
        };
        return <VUser id={id} render={renderUser} />;
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
import { User } from "tonwa-controller";
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