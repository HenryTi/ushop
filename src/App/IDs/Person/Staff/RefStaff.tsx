import { app } from "../../../App";
import { openPage } from "tonwa-controller";
import { PIDList } from "tonwa-controller";
import { Role } from "uq-app/uqs/BzWorkshop";
import { IconCommand } from "../../../tool";
import { MPerson } from "../UqPerson";
import { renderStaff } from "./renderStaff";
import { useUqStaff } from "./UqStaff";

export function RefStaff() {
    let caption = 'Staff';
    let icon = 'user';
    let iconClass: string = undefined;
    let { BzWorkshop } = app.uqs;
    let uqStaff = useUqStaff({
        uq: BzWorkshop,
        ID: BzWorkshop.Person,
    });
    let onClick = () => {
        openPage(async () => {
            let list = await uqStaff.loadList(Role.staff);
            let onAdd = async () => {
            };
            let onEditItem = (item: MPerson): void => {

            };
            let renderIDValue = (item: MPerson): JSX.Element => {    // renderItemInList
                return renderStaff(item);
            }
            return <PIDList caption={caption} icon={icon} iconClass={iconClass}
                list={list} onAdd={onAdd} onEditItem={onEditItem} renderIDValue={renderIDValue} />;
        });
    }
    return <IconCommand caption={caption} icon={icon} iconClass={undefined} onClick={onClick} />;
}
