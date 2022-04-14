import { FA, List, Page, useNav } from "tonwa-com";
import { renderDate, renderHourMinute } from "../../tool";
import { useEffect, useState } from "react";
import { useUqApp } from "App/App";
import { SessionPage } from "./SessionPage";
import { consts, MSession, WorkshopItem } from "./consts";
import { WorkshopView } from "App/IDs";
import { IDValue } from "tonwa-com-uq";

export function WorkshopActs() {
    let { uqs } = useUqApp();
    let nav = useNav();
    let [workshopItems, setWorkshopItems] = useState<WorkshopItem[]>(undefined);
    useEffect(() => {
        async function loadList() {
            let ret = await uqs.BzWorkshop.MySessions.query({});
            let coll: { [id: number]: WorkshopItem } = {};
            let workshopItems: WorkshopItem[] = [];
            for (let row of ret.ret) {
                let { workshop } = row;
                let workshopItem = coll[workshop];
                if (!workshopItem) {
                    workshopItem = { workshop, sessions: [] };
                    coll[workshop] = workshopItem;
                    workshopItems.push(workshopItem);
                }
                workshopItem.sessions.push(row);
            }
            workshopItems.sort((a, b) => {
                let { workshop: wa } = a;
                let { workshop: wb } = b;
                if (wa > wb) return -1;
                if (wa === wb) return 0;
                return 1;
            })
            setWorkshopItems(workshopItems);
        }
        loadList();
    }, [uqs]);
    function WorkshopItem({ value }: { value: WorkshopItem }) {
        let { workshop, sessions } = value;
        //let { cWorkshop } = this.controller;
        let { icon, iconClass } = consts;
        // cursor-pointer
        return <div className="px-3 py-2 d-block mb-3">
            <div onClick={() => onWorkshopClick(workshop)}
                className="fs-5 my-2 d-flex align-items-center">
                <FA name={icon} className={iconClass + ' me-3'} size="lg" />
                {/*cWorkshop.renderId(workshop)*/}
                <IDValue Template={WorkshopView} id={workshop} ID={uqs.BzWorkshop.Workshop} />
            </div>
            <List className="ms-4" items={sessions}
                ItemView={SessionItem} onItemClick={onSessionClick} />
        </div>
    }
    function SessionItem({ value }: { value: MSession; }) {
        let { date, time, span, substitue, done } = value;
        return <div className="px-3 py-2 d-block">
            <div>{renderDate(date)} {renderHourMinute(time)} {span}</div>
            <div>
                {done > 0 && <FA className="text-danger" name="check-circle-o" />}
                {substitue > 0 && <FA className="text-primary" name="star-o" />}
            </div>
        </div>;
    }

    function onWorkshopClick(workshop: number) {
        //alert(workshop);
    }

    function onSessionClick(session: MSession) {
        nav.open(<SessionPage session={session} />);
    }
    return <Page header="Workshops acts">
        <List items={workshopItems} ItemView={WorkshopItem} />
    </Page>;
}
