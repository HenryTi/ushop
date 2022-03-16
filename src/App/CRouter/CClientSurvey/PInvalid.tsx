import { VPage } from "tonwa-controller";
import { CClientSurvey } from "./CClientSurvey";

export class PInvalid extends VPage<CClientSurvey> {
    header(): string | boolean | JSX.Element {
        return null;
    }

    content() {
        return <div className="p-3">
            invalid
        </div>;
    }
}
