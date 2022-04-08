import { FA, Page } from "tonwa-com";
import { IDListEdit, useIdListEditContext } from "tonwa-com-uq";
import { PersonView } from "../PersonView";
import { MPerson } from "../UqPerson";

export function ClientList({ items, caption, icon, iconClass }: {
    items: MPerson[];
    caption: string;
    icon: string;
    iconClass: string;
}) {
    let listEditContext = useIdListEditContext(items);
    function ClientView({ value }: { value: MPerson; }) {
        return <div className="d-flex">
            <div className="mx-4 my-2"><FA name={icon} className={iconClass} size="lg" /></div>
            <div className="my-2"><PersonView value={value} /></div>
        </div>
    }
    return <Page header={caption}>
        <IDListEdit context={listEditContext} ItemView={ClientView} />
    </Page>;
}
