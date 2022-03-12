import { VAdd } from "tonwa-contoller";
import { CWorkshop } from "./CWorkshop";

export class VAddWorkshop extends VAdd<CWorkshop> {
    content(): JSX.Element {
        return <div className="p-3">
            {this.renderForm()}
        </div>;
    }
}
