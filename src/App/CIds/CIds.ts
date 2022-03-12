import { App } from "../App";
import { CControl } from "../CControl";
import { CClient } from "./CPerson/CClient";
import { CStaff } from "./CPerson/CStaff";
import { CWorkshop } from "./CWorkshop";
import { VStart } from "./VStart";

export class CIds extends CControl {
    readonly cWorkshop: CWorkshop;
    readonly cClient: CClient;
    readonly cStaff: CStaff;
    //readonly cTag: CTag;

    // personCategories: PersonCategory[];
    //personCatClient: PersonCategory;
    //personCatStaff: PersonCategory;

    constructor(app: App) {
        super(app);
        this.cWorkshop = new CWorkshop(this);
        this.cClient = new CClient(this);
        this.cStaff = new CStaff(this);
        //this.cTag = app.cTag;
    }

    load = async () => {
        /*
        if (this.personCategories) return;
        let { BzWorkshop } = this.uqs;
        this.personCategories = await BzWorkshop.QueryID({ ID: BzWorkshop.PersonCategory });
        this.personCatStaff = this.personCategories.find(v => v.name === 'staff');
        this.personCatClient = this.personCategories.find(v => v.name === 'client');
        */
    }

    onWorkshop = (): void => {
        this.cWorkshop.openMain();
    }

    onClient = (): void => {
        this.cClient.openMain();
    }

    onStaff = (): void => {
        this.cStaff.openMain();
    }

    main() {
        return this.render(VStart);
    }
}
