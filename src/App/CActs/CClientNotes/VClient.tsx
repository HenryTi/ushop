import { VPage } from "tonwa-controller";
import { EasyTime, FA, List } from "tonwa-react";
import { dateFromMinuteId } from "tonwa-core";
import { Note, SessionPerson } from "uq-app/uqs/BzWorkshop";
import { CClientNotes } from ".";

export class VClient extends VPage<CClientNotes> {
    header(): string | boolean | JSX.Element {
        let { firstName, lastName, no } = this.props;
        return <>{firstName} {lastName} &nbsp; <small className="text-muted">{no}</small></>;
    }

    right(): JSX.Element {
        return <button className="btn btn-sm btn-success me-2" onClick={() => this.controller.showAddNote(this.props)}>
            <FA name="plus" />
        </button>;
    }

    content(): JSX.Element {
        return <div className="">
            <List items={this.controller.deepData.notes}
                item={{ render: this.renderLog, className: "mt-1 mb-3", key: (item) => item.id }} />
        </div>;
    }

    private renderLog = (log: any, index: number) => {
        let { id } = log;
        return <div className="d-block">
            <div className="px-3 py-1 border-bottom small text-muted"><EasyTime date={dateFromMinuteId(id)} /></div>
            <div className="px-3 py-2">{
                this.renderLogContent(log)
            }</div>
        </div>;
    }

    private renderLogContent(log: any) {
        let { $type } = log;
        switch ($type) {
            default: return <>unknown type {$type}</>;
            case 'note': return this.renderNote(log);
            case 'sessionperson': return this.renderSessionPerson(log);
        }
    }

    private renderNote(note: Note) {
        let { note: noteContent, staff, sensitive } = note;
        let vLock: any;
        if (sensitive === 1) {
            vLock = <FA name="lock" className="text-danger me-3" />
            if (this.controller.app.isPersonMe(staff) === true) {
                return <div className="text-muted small">{vLock} #sensitive</div>;
            }
        }
        return <>{noteContent.split('\n').map((v, index) =>
            <div key={index} className="my-1">{vLock} {v}</div>
        )}</>;
    }

    private renderSessionPerson(sessionPerson: SessionPerson) {
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
}
