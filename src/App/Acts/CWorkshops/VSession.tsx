import { VPage } from "tonwa-controller";
import { EasyTime, FA, List, LMR } from "tonwa-react";
import { renderDate, renderHourMinute } from "../../tool";
import { CSessionAct } from "./CSessionAct";

export class VSession extends VPage<CSessionAct> {
    header() {
        return 'Session';
    }

    content(): JSX.Element {
        let { session, deep: shallow } = this.controller;
        //let { icon, iconClass } = cWorkshop;
        let { date, time, span, substitue, done, workshop } = session;
        let right = <button className="btn btn-sm btn-outline-primary" onClick={this.onAddAttendee}>
            <FA name="plus" />
        </button>;
        return <div>
            <div className="fs-5 px-3 py-2 d-flex align-items-center">
                {/*<FA name={icon} className={iconClass + ' me-3'} size="lg" />*/}
                {/*cWorkshop.renderId(workshop)*/}
            </div>
            <div className="px-3 py-2 d-block">
                <div>{renderDate(date)} {renderHourMinute(time)} {span}</div>
                <div>
                    {done > 0 && <FA className="text-danger" name="check-circle-o" />}
                    {substitue > 0 && <FA className="text-primary" name="star-o" />}
                </div>
            </div>
            <div className="mt-3">
                <LMR className="px-3 mb-2 align-items-end"
                    right={right}>
                    Attendees
                </LMR>
                <List items={shallow.list} item={{ render: this.renderAttendee, onClick: this.controller.showAttendee }} />
            </div>
        </div>;
    }

    private renderAttendee = (attendee: any, index: number) => {
        let { $create, $update, deleted } = attendee;
        let cn = 'px-3 py-2 align-items-center';
        if (deleted > 0) cn += ' text-decoration-line-through text-muted';
        let vChanged: any;
        if ($create !== $update) {
            vChanged = <span className="ms-3">
                change at: <EasyTime date={new Date($update * 1000)} />
            </span>;
        }
        let right = <div>
            <EasyTime date={new Date($create * 1000)} />
            {vChanged}
        </div>;
        return <LMR className={cn} right={right}>
            <div className="d-flex align-items-center">
                {/*this.controller.cClient.renderId(attendee.xi)*/}
            </div>
        </LMR>;
    }

    private onAddAttendee = () => {
        this.controller.addAttendee();
    }
}
