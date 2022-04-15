import { useUqApp } from "App/UqApp";
import { TagInput } from "App/Tag";
import { useState } from "react";
import { BandCom, Detail, FA, MutedSmall, Page, Radio, Sep, useNav } from "tonwa-com";
import { SelectUser, UserView, IDListEditContext } from "tonwa-com-uq";
import { User } from "tonwa-uq";
import { Role } from "uqs/BzWorkshop";
import { ForAdmin } from "../../../ForRole";
import { PersonDetail } from "../PersonEdit";
import { MPerson } from "../UqPerson";
import { BoundUserPage } from "./BoundUserPage";
import { staffRoleCaptions, staffRoles } from "./UqStaff";

export function StaffEdit({ item, listEditContext }: { item: MPerson; listEditContext: IDListEditContext<MPerson>; }) {
    const app = useUqApp();
    const nav = useNav();
    let { BzWorkshop } = app.uqs;
    async function saveStaffRole(role: Role) {
        let personId = item.id;
        let values = staffRoles.map(v => (
            { ix: personId, xi: v }
        ));
        // delete all other roles
        for (let v of values) {
            if (v.xi !== role) {
                v.xi = -v.xi;
            }
        }
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxPersonRole,
            values
        });
        // 这里不能直接修改，因为item是snapshot
        // item.role = role;
        listEditContext.onItemChanged({ ...item, role });
    }
    async function onValuesChanged(values: { name: string; value: any; preValue: any; }) {
        let { name, value } = values;
        switch (name) {
            case 'role': await saveStaffRole(value); break;
        }
    }
    function BindUser() {
        let { user } = item;
        let [userState, setUserState] = useState(user);
        let onEdit: () => Promise<void>;
        let icon: string;
        let com: JSX.Element;
        function onUserChanged(userId: number) {
            listEditContext.onItemChanged({ ...item, user: userId });
            setUserState(userId);
        }
        if (userState) {
            onEdit = async () => nav.open(<BoundUserPage person={item} onUserChanged={onUserChanged} />);
            icon = 'angle-right';
            com = <UserView id={userState} className="d-inline-block my-2" />
        }
        else {
            onEdit = async () => {
                let ret = await nav.call<User>(<SelectUser header="Select user" />);
                if (!ret) return;
                let userId = ret.id;
                await BzWorkshop.ActIX({
                    IX: BzWorkshop.IxUserPerson,
                    values: [
                        { ix: userId, xi: item.id }
                    ]
                });
                onUserChanged(userId);
            }
            icon = 'pencil';
            com = <div className="my-2"><MutedSmall>click to bind user</MutedSmall></div>;
        }
        return <BandCom label="Bind user"
            onEdit={onEdit}
            rightIcon={<FA name={icon} fixWidth={true} className="" />}
        >
            {com}
        </BandCom>;
    }
    async function onDelete() {
        if (await nav.confirm('Do you really want to delete?') === false) return;
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxPersonRole,
            values: [
                { ix: item.id, xi: -Role.staff }
            ]
        });
        listEditContext.onItemDeleted(item);
        nav.close();
    }
    function onPersonChanged(person: MPerson) {
        listEditContext.onItemChanged(person);
    }
    return <Page header={'Staff ' + item.no}>
        <ForAdmin>
            <Detail values={{ role: item.role }} onValuesChanged={onValuesChanged}>
                <BindUser />
                <BandCom label="Role" onEdit={null}>
                    <div className="my-3">
                        <Radio name="role"
                            options={staffRoles.map(v => ({ value: v, label: staffRoleCaptions[v] }))} />
                    </div>
                </BandCom>
            </Detail>
            <Sep sep={2} className="pb-3 bg-light" />
            <Sep sep={2} />
        </ForAdmin>
        <PersonDetail person={item} fields={BzWorkshop.Person.fields}
            onPersonChanged={onPersonChanged} />
        <Sep sep={2} />
        <TagInput id={item.id} tagGroupName="staff-tags" />
        <div className="d-flex p-3">
            <div className="flex-grow-1" />
            <button className="btn btn-outline-primary" onClick={onDelete}>delete</button>
        </div>
    </Page>;
}
