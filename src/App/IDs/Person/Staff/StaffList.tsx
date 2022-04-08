import { FA, Page } from "tonwa-com";
import { IDListEdit, useIdListEditContext } from "tonwa-com-uq";
import { User, VUser } from "tonwa-controller";
import { Role } from "uq-app/uqs/BzWorkshop";
import { MPerson } from "../UqPerson";

const roleCaption: { [role in Role]?: string } = {
    [Role.counselor]: 'Counselor',
    [Role.volunteer]: 'Volunteer',
};

export function StaffList({ items, caption, icon, iconClass }: {
    items: MPerson[];
    caption: string;
    icon: string;
    iconClass: string;
}) {
    let listEditContext = useIdListEditContext(items);
    let onAdd = async () => {
    };
    let onEditItem = (item: MPerson): void => {

    };
    function StaffView({ value: item }: { value: MPerson; }) {
        let { no, name, firstName, lastName, middleName, user, role } = item;
        let vUser: any;
        if (user) {
            let renderUser = (user: User) => {
                let { name } = user;
                return <span className="ms-4">
                    user:  {name}
                </span>;
            };
            vUser = <VUser id={user} render={renderUser} />;
        }
        let vRole: any;
        if (role) {
            vRole = <span className="ms-3"><FA name='dot' /> {roleCaption[role]}</span>;
        }
        return <div className="d-flex py-3">
            <div className="mx-4"><FA name={icon} className={iconClass} size="lg" /></div>
            <div className="">
                <div className="small text-muted me-3">{no} {vUser}</div>
                <div>
                    {name ?? <>{lastName} {middleName} {firstName}</>}
                    {vRole}
                </div>
            </div>
        </div>;
    }
    return <Page header={caption}>
        <IDListEdit context={listEditContext} ItemView={StaffView} />
    </Page>;
}
