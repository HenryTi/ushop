import { useUqApp } from "App/App";
import { TagInput } from "App/Tag";
import { FA, Page, useNav } from "tonwa-com";
import { IDListEdit, useIdListEdit } from "tonwa-com-uq";
import { Role } from "uq-app/uqs/BzWorkshop";
import { AddPerson } from "../AddPerson";
import { PersonDetail } from "../PersonEdit";
import { MPerson } from "../UqPerson";
import { ClientView } from "./ClientView";
import { caption } from "./consts";

export function ClientList({ items }: { items: MPerson[]; }) {
    let nav = useNav();
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    let listEditContext = useIdListEdit(items);
    function onItemClick(item: MPerson) {
        function ClientEdit() {
            let tagTop = <div className="mt-3 border-bottom bg-light px-3 pt-2 pb-1 small text-muted">
                Tags
            </div>;
            return <Page header={'Client ' + item.no}>
                <PersonDetail person={item} fields={BzWorkshop.Person.fields} />
                <TagInput id={item.id} tagGroupName="client-tags" top={tagTop} />
            </Page>;
        }
        nav.open(<ClientEdit />);
    }
    function onPersonAdded(person: MPerson) {
        listEditContext.onItemChanged(person);
    }
    let onAdd = async () => {
        nav.open(<AddPerson role={Role.client}
            header="Add client"
            onPersonAdded={onPersonAdded} />)
    }
    let right = <button className="btn btn-sm btn-primary" onClick={onAdd}>
        <FA name="plus" />
    </button>
    return <Page header={caption} right={right}>
        <IDListEdit context={listEditContext} ItemView={ClientView} onItemClick={onItemClick} />
    </Page>;
}
