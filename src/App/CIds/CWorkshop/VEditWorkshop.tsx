import { VEditId } from "tonwa-contoller";
import { CWorkshop } from "./CWorkshop";

export class VEditWorkshop extends VEditId<CWorkshop> {
    content() {
        return <div className="">
            <div className="my-3 border rounded-3 pt-1">
                {this.renderProps()}
            </div>
            {this.renderStaffPick()}

            {this.renderTagInput()}

            <div className="my-3 border rounded-3">
                {this.controller.cSession.renderList()}
            </div>
        </div>
    }

    renderStaffPick(): JSX.Element {
        return null;
    }
}
