import { FA, Page, Sep, useNav } from "tonwa-com";
import { IDListEdit, useIdListEdit } from "tonwa-com-uq";
import { Role } from "uq-app/uqs/BzWorkshop";
import { AddPerson } from "../AddPerson";
import { MPerson } from "../UqPerson";
import { StaffEdit } from "./StaffEdit";
import { StaffView } from "./StaffView";
import { caption } from "./UqStaff";

export function StaffList({ items }: {
    items: MPerson[];
}) {
    let nav = useNav();
    let listEditContext = useIdListEdit(items);
    function onPersonAdded(person: MPerson) {
        listEditContext.onItemChanged(person);
    }
    let onAdd = async () => {
        nav.open(<AddPerson role={Role.staff} header="Add staff"
            onPersonAdded={onPersonAdded} />)
    }
    let right = <button className="btn btn-sm btn-primary me-2" onClick={onAdd}><FA name="plus" /></button>
    function onItemClick(item: MPerson) {
        nav.open(<StaffEdit item={item} listEditContext={listEditContext} />);
    }
    return <Page header={caption} right={right}>
        <IDListEdit context={listEditContext} ItemView={StaffView} onItemClick={onItemClick} />
        <Sep />
    </Page>;
}
