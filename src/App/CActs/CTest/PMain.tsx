import { VPage } from "tonwa-contoller";
import { CTest } from "./CTest";

export class PMain extends VPage<CTest> {
    header(): string | boolean | JSX.Element {
        return 'Test';
    }

    content() {
        return <div className="p-3">
            Test
            <div>
                <button className="btn btn-primary me-3"
                    onClick={evt => this.waitingEvent(evt, this.controller.onTestSave)}>
                    save
                </button>
                <button className="btn btn-primary me-3"
                    onClick={evt => this.waitingEvent(evt, this.controller.onTestLoad)}>
                    load
                </button>
            </div>
        </div>
    }
}