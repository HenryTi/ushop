import { app } from "../../../App";
import { openPage } from "tonwa-controller";
import { PIDList } from "tonwa-controller";
import { Role } from "uq-app/uqs/BzWorkshop";
import { IconCommand } from "../../../tool";
import { MPerson } from "../UqPerson";
import { useUqClient } from "./UqClient";
import { renderPerson } from "../renderPerson";

export function RefClient() {
    let caption = 'Client';
    let icon = 'user-o';
    let iconClass: string = 'text-info';
    let { BzWorkshop } = app.uqs;
    let uqClient = useUqClient({
        uq: BzWorkshop,
        ID: BzWorkshop.Person,
    });
    let onClick = () => {
        openPage(async () => {
            let list = await uqClient.loadList(Role.client);
            let onAdd = async () => {
            };
            let onEditItem = (item: MPerson): void => {

            };
            let renderIDValue = (item: MPerson): JSX.Element => {    // renderItemInList
                return renderPerson(item);
            }
            return <PIDList caption={caption} icon={icon} iconClass={iconClass}
                list={list} onAdd={onAdd} onEditItem={onEditItem} renderIDValue={renderIDValue} />;
        });
    }
    return <IconCommand caption={caption} icon={icon} iconClass={undefined} onClick={onClick} />;
}
