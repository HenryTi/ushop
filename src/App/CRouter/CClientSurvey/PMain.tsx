import { VPage } from "tonwa-controller";
import { CClientSurvey } from "./CClientSurvey";

export class PMain extends VPage<CClientSurvey> {
    header(): string | boolean | JSX.Element {
        return null;
    }

    content(): JSX.Element {
        return <div className="p-3">
            <div className="my-5 text-center text-success">
                Welcome to the servey!
            </div>
            <div className="my-5 text-center">
                {this.controller.pathParam}
            </div>
            <div className="my-5 text-center">
                <button className="btn btn-primary" onClick={evt => this.waitingEvent(evt, this.controller.onStart)}>Next &gt;</button>
            </div>
        </div>;
    }
}
