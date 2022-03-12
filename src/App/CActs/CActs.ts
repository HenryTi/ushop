import { CControl } from "../CControl";
import { CClientNotes } from "./CClientNotes";
import { CTest } from "./CTest";
import { CWorkshops } from "./CWorkshops";
import { VStart } from "./VStart";

export class CActs extends CControl {
    load = async () => {
    }

    main() {
        return this.render(VStart);
    }

    showRegisterWorkshop = async () => {
        let cRegisterWorkshop = new CWorkshops(this);
        cRegisterWorkshop.openMain();
    }

    showClientNotes = async () => {
        let cClientNotes = new CClientNotes(this);
        cClientNotes.openMain();
    }

    showTest = async () => {
        let cTest = new CTest(this.app);
        cTest.openMain();
    }
}
