import { VPage } from "tonwa-controller";
import { FA, List } from "tonwa-react";
import { renderDate, renderHourMinute } from "../../tool";
import { CWorkshops, MSession, WorkshopItem } from ".";

export class VStart extends VPage<CWorkshops> {
    header(): string | boolean | JSX.Element {
        return 'Workshops';
    }

    content(): JSX.Element {
        return this.react(() => {
            let { workshopItems } = this.controller.shallow;
            return <div>
                <List items={workshopItems} item={{ render: this.renderWorkshopItem }} />
            </div>;
        });
    }

    private renderWorkshopItem = (item: WorkshopItem, index: number) => {
        let { workshop, sessions } = item;
        let { cWorkshop } = this.controller;
        let { icon, iconClass } = cWorkshop;
        return <div className="px-3 py-2 d-block mb-3">
            <div onClick={() => this.onWorkshopClick(workshop)}
                className="fs-5 my-2 d-flex align-items-center cursor-pointer">
                <FA name={icon} className={iconClass + ' me-3'} size="lg" />
                {cWorkshop.renderId(workshop)}
            </div>
            <List className="ms-4" items={sessions}
                item={{ render: this.renderSessionItem, onClick: this.onSessionClick }} />
        </div>
    }

    private renderSessionItem = (item: MSession, index: number) => {
        let { date, time, span, substitue, done } = item;
        return <div className="px-3 py-2 d-block">
            <div>{renderDate(date)} {renderHourMinute(time)} {span}</div>
            <div>
                {done > 0 && <FA className="text-danger" name="check-circle-o" />}
                {substitue > 0 && <FA className="text-primary" name="star-o" />}
            </div>
        </div>;
    }

    private onWorkshopClick = (workshop: number) => {
        alert(workshop);
    }

    private onSessionClick = (session: MSession) => {
        this.controller.openSession(session);
    }
}