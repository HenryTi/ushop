import { openPage, Page } from "tonwa-controller";
import { EasyTime, FA, List } from "tonwa-react";
import { dateFromMinuteId } from "tonwa-core";
import { Note, Person, SessionPerson } from "uq-app/uqs/BzWorkshop";
import { app } from "../../App";
import { PAddNote } from "./PAddNote";
import { CClientNotes } from "./CClientNotes";

export function PClient(props: { controller: CClientNotes; client: Person; }) {
    let { controller, client } = props;
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
            case 'note': return renderNote(log);
            case 'sessionperson': return renderSessionPerson(log);
        }
    }

    function renderNote(note: Note) {
        let { note: noteContent, staff, sensitive } = note;
        let vLock: any;
        if (sensitive === 1) {
            vLock = <FA name="lock" className="text-danger me-3" />
            if (app.isPersonMe(staff) === true) {
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
        onClick={() => openPage(<PAddNote {...props} />)}>
        <FA name="plus" />
    </button>;

    return <Page header={header} right={right}>
        <div className="">
            <List items={controller.deepData.notes}
                item={{ render: renderLog, className: "mt-1 mb-3", key: (item) => item.id }} />
        </div>
    </Page>;
}
