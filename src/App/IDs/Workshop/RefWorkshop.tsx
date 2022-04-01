import { PIDList } from "tonwa-controller";
import { useNav } from "tonwa-page";
import { Workshop } from "uq-app/uqs/BzWorkshop";
import { useUqApp } from "../../App";
import { IconCommand } from "../../tool";
import { renderWorkshopItem } from "./renderItem";
import { useUqWorkshop } from "./UqWorkshop";

export function RefWorkshop() {
    let app = useUqApp();
    let nav = useNav();
    let caption = 'Workshop';
    let icon = 'book';
    let iconClass: string = 'text-warning';
    let { BzWorkshop } = app.uqs;
    let uqWorkshop = useUqWorkshop({
        uq: BzWorkshop,
        ID: BzWorkshop.Workshop,
    });
    let onClick = () => {
        nav.open(async () => {
            let list = await uqWorkshop.loadList();
            let onAdd = async () => {
                alert('Ref Workshop on Add');
            };
            let onEditItem = (item: Workshop): void => {
                alert('Ref Workshop on Edit');
            };
            let renderIDValue = (item: Workshop): JSX.Element => {    // renderItemInList
                return renderWorkshopItem(item);
            }
            return <PIDList caption={caption} icon={icon} iconClass={iconClass}
                list={list} onAdd={onAdd} onEditItem={onEditItem} renderIDValue={renderIDValue} />;
        });
    }
    return <IconCommand caption={caption} icon={icon} iconClass={undefined} onClick={onClick} />;
}
