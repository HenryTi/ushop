import { proxy } from 'tonwa-contoller';
import { App } from "../App";
import { CControl } from "../CControl";
import { VHome } from "./VHome";

interface Item {
	id: number;
	name: string;
}

export interface Tick {
	count: number;
	text: string;
	list: Item[];
}

export class CHome extends CControl {
	tick = proxy<Tick>({
		count: 0,
		text: 'ok',
		list: [],
	});

	constructor(app: App) {
		super(app);
		setInterval(() => {
			++this.tick.count;
			let item = this.tick.list[3];
			if (item) {
				if (item.name.length > 100) item.name = '';
				item.name += ' - ' + Date.now();
			}
		}, 2000);
	}

	protected async internalStart() {
	}

	tab = () => <VHome tick={this.tick} />; // this.render(VHome);

	load = async () => {

	}
}

