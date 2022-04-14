import { EasyTime, FA, Page, useNav } from "tonwa-com";
import { dateFromMinuteId } from "tonwa-core";
import { Note, Person, SessionPerson } from "uq-app/uqs/BzWorkshop";
import { useUqApp } from "../../App";
import { AddNotePage } from "./AddNotePage";
import { useEffect } from "react";
import { IDListEdit, useIdListEdit } from "tonwa-com-uq";

export function ClientPage(props: { client: Person; }) {
    let uqApp = useUqApp();
    let nav = useNav();
    let editListContext = useIdListEdit<Note>(undefined);
    let { client } = props;
    useEffect(() => {
        async function loadClientLog() {
            let { BzWorkshop } = uqApp.uqs;
            /*
            let ret = await BzWorkshop.QueryID<Note>({
                IX: [BzWorkshop.IxPersonLog],
                ix: client.id,
                IDX: [BzWorkshop.Note],
                order: 'desc'
            });
            */
            //let ret = await BzWorkshop.GetPersonLog.query({ person: client.id });
            let ret = await BzWorkshop.IXValues({
                IX: BzWorkshop.IxPersonLog,
                ix: client.id,
                order: 'desc',
            })
            let notes: any[] = [];
            for (let row of ret) {
                let { type, value } = row;
                let obj: any = BzWorkshop.IDValue(type, value);
                if (obj !== undefined) {
                    obj['$type'] = type;
                    notes.push(obj);
                }
            }
            editListContext.setItems(notes);
            //this.open(PClient, client);
        }
        loadClientLog();
    }, [uqApp, client, editListContext]);

    let renderLog = (log: any, index: number) => {
        let { id } = log;
        return <div className="d-block">
            <div className="px-3 py-1 border-bottom small text-muted"><EasyTime date={dateFromMinuteId(id)} /></div>
            <div className="px-3 py-2">{
                renderLogContent(log)
            }</div>
        </div>;
    }

    function renderLogContent(log: any) {
        let { $type } = log;
        switch ($type) {
            default: return <>unknown type {$type}</>;
            case 'note': return <>renderNote(log)</>;
            case 'sessionperson': return renderSessionPerson(log);
        }
    }

    function LogView({ value }: { value: Note }) {
        let { note: noteContent, staff, sensitive } = value;
        let vLock: any;
        if (sensitive === 1) {
            vLock = <FA name="lock" className="text-danger me-3" />
            if (uqApp.isPersonMe(staff) === true) {
                return <div className="text-muted small">{vLock} #sensitive</div>;
            }
        }
        return <>{noteContent.split('\n').map((v, index) =>
            <div key={index} className="my-1">{vLock} {v}</div>
        )}</>;
    }

    function renderSessionPerson(sessionPerson: SessionPerson) {
        let { session, person, workshop } = sessionPerson;
        /*
        let { cWorkshop, cStaff } = this.controller.app.cIds;
        let { cSession } = cWorkshop;
        return <>
            <div>{cWorkshop.renderId(workshop)}</div>
            <div>{cSession.renderId(session)}</div>
            <div>{cStaff.renderId(person)}</div>
        </>;
        */
        return <>renderSessionPerson: {session}, {person}, {workshop}</>
    }

    let { firstName, lastName, no } = client;
    let header = <>{firstName} {lastName} &nbsp; <small className="text-muted">{no}</small></>;

    let right = <button className="btn btn-sm btn-success me-2"
        onClick={() => nav.open(<AddNotePage {...props} />)}>
        <FA name="plus" />
    </button>;

    return <Page header={header} right={right}>
        <div className="">
            <IDListEdit context={editListContext}
                ItemView={LogView} />
        </div>
    </Page>;
}
