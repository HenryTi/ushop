import { FA } from "tonwa-com";
import { PersonView } from "../PersonView";
import { MPerson } from "../UqPerson";
import { icon, iconClass } from "./consts";

export function ClientView({ value }: { value: MPerson; }) {
    return <div className="d-flex">
        <div className="mx-4 my-2"><FA name={icon} className={iconClass} size="lg" /></div>
        <div className="my-2"><PersonView value={value} /></div>
    </div>
}
