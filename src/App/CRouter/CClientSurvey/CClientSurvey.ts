import { Person } from "uq-app/uqs/BzWorkshop";
import { CRouter } from "../CRouter";
import { PClientForm } from "./PClientForm";
import { PInvalid } from "./PInvalid";
import { PMain } from "./PMain";

export class CClientSurvey extends CRouter {
    async openMain() {
        this.open(PMain);
    }

    onStart = async () => {
        let { BzWorkshop } = this.uqs;
        let id = Number.parseInt(this.pathParam);
        if (isNaN(id) === true) {
            this.open(PInvalid);
            return
        }
        let ret = await BzWorkshop.ID<Person>({
            IDX: BzWorkshop.Person,
            id,
        });
        if (ret.length === 0) {
            this.open(PInvalid);
            return;
        }

        this.open(PClientForm, ret[0]);
    }
}
