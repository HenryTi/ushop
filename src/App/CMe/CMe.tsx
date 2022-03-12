import { User } from 'tonwa-uq';
import { QueryPager } from "tonwa";
import { VMe } from "./VMe";
//import { CAdmin } from "../CAdmin";
import { CControl } from "../CControl";
import { App } from "../App";

export class CMe extends CControl {
	role: number;
	unitOwner: User;
	rootUnits: QueryPager<any>;
	//cAdmin: CAdmin;

	constructor(app: App) {
		super(app);
		//this.cAdmin = new CAdmin(this.app);
	}

	protected async internalStart() {
	}

	tab = () => {
		return <VMe />;
	}

	load = async () => {
		// await this.cAdmin.load();
		//this.roles = await this.getUqRoles(this.uq.name);
	}
}
