import { useUqApp } from "App/UqApp";
import { ClientView, PickClient, WorkshopView } from "App/IDs";
import { useEffect } from "react";
import { EasyTime, FA, LMR, MutedSmall, Page, Sep, useNav, renderDate, renderHourMinute } from "tonwa-com";
import { IDValue, ListEdit, useListEdit } from "tonwa-com-uq";
import { AttendeePage } from "./AttendeePage";
import { consts, MSession } from "./consts";

export function SessionPage({ session }: { session: MSession; }) {
    let nav = useNav();
    let { uqs } = useUqApp();
    //let { icon, iconClass } = cWorkshop;
    let { date, time, span, substitue, done, workshop } = session;
    let listEdit = useListEdit<any>(undefined, (item1, item2) => item1.xi === item2.xi);
    useEffect(() => {
        async function loadAttendees() {
            let { BzWorkshop } = uqs;
            let ret = await BzWorkshop.IX({
                IX: BzWorkshop.IxSessionClient,
                ix: session.id,
            });
            listEdit.setItems(ret);
        }
        loadAttendees();
    }, [uqs, session, listEdit]);

    function AttendeeView({ value }: { value: any }) {
        let { $create, $update, deleted } = value;
        let cn = '';
        if (deleted > 0) cn += ' text-decoration-line-through text-muted';
        let vTime = ($create !== $update && $update - $create >= 24 * 3600) ?
            <span className="ms-3">
                <FA name="pencil" className="me-1" />
                <EasyTime date={new Date($update * 1000)} />
            </span>
            :
            <EasyTime date={new Date($create * 1000)} />;
        return <LMR className={cn}>
            <div className="d-flex align-items-center">
                <IDValue Template={ClientView} id={value.xi} ID={uqs.BzWorkshop.Person} />
            </div>
            <div className="me-3 my-2 small text-muted">
                {vTime}
            </div>
        </LMR>;
    }

    async function onAddAttendee() {
        let { BzWorkshop } = uqs;
        let ret = await nav.call<any>(<PickClient />);
        let sessionId = session.id;
        let clientId = ret.id;
        let now = Math.floor(Date.now() / 1000);
        let ixValue = {
            ix: sessionId,
            xi: clientId,
            deleted: 0,
            $create: now,
            $update: now,
        };
        await BzWorkshop.SaveSessionAttendee.submit({
            session: sessionId,
            client: clientId,
            deleted: 0,
        });
        listEdit.onItemDeleted(ixValue);
        listEdit.moveItemToFirst(ixValue);
    }
    function onAttendeeChanged(attendee: any) {
        listEdit.onItemChanged(attendee);
    }
    function showAttendee(attendee: any) {
        nav.open(<AttendeePage attendee={attendee} onAttendeeChanged={onAttendeeChanged} />);
    }
    let { icon, iconClass } = consts;
    return <Page header="Session">
        <div className="px-3 py-3 d-flex border-bottom">
            <FA name={icon} className={iconClass + ' me-4 mt-2 fs-big'} size="lg" />
            <div>
                <div className="d-flex align-items-center fs-big">
                    <IDValue Template={WorkshopView} id={workshop} ID={uqs.BzWorkshop.Workshop} />
                </div>
                <div>{renderDate(date)} {renderHourMinute(time)} {span}</div>
                <div>
                    {done > 0 && <FA className="text-danger" name="check-circle-o" />}
                    {substitue > 0 && <FA className="text-primary" name="star-o" />}
                </div>
            </div>
        </div>
        <div>
            <LMR className="px-3 align-items-end border-bottom pt-4 pb-2 bg-light">
                Attendees
                <button className="btn btn-sm btn-outline-primary" onClick={onAddAttendee}>
                    <FA name="plus" />
                </button>
            </LMR>
            <ListEdit context={listEdit}
                none={<div className="m-3 d-block"><MutedSmall>none</MutedSmall></div>}
                ItemView={AttendeeView} onItemClick={showAttendee} />
            <Sep />
        </div>
    </Page>;
}
