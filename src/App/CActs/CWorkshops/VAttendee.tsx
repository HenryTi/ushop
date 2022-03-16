import { VPage } from "tonwa-controller";
import { FA } from "tonwa-react";
import { CSessionAct } from "./CSessionAct";

export class VAttendee extends VPage<CSessionAct> {
    header(): string | boolean | JSX.Element {
        return 'Attendee';
    }

    right(): JSX.Element {
        let { deleted } = this.props;
        let onClick = () => this.controller.changeSessionClient(this.props);
        let cn = 'btn btn-sm me-2 ';
        let content: any;
        if (deleted === 0) {
            cn += ' btn-light';
            content = <FA name="trash" />;
        }
        else {
            cn += ' btn-info';
            content = <><FA name="repeat" /> Restore</>;
        }
        return <button className={cn} onClick={onClick}>
            {content}
        </button>;
    }

    content() {
        return <div className="p-3">
            {this.controller.cClient.renderId(this.props.xi)}
        </div>;
    }
}