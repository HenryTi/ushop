//=== UqApp builder created on Tue Jan 12 2021 23:14:51 GMT-0500 (GMT-05:00) ===//
import { AppConfig } from "tonwa";
import { UqConfig } from 'tonwa-uq';
import uqConfigs from '../uqconfig.json';

/*
const bz: DevConfig = {
	name: 'bizdev',
	alias: 'bz',
}
*/

export const appConfig: AppConfig = {
	version: '0.1.0',
	uqs: uqsFromConfigs(),
	noUnit: true,
	oem: undefined,
	htmlTitle: 'UShop',
};

function uqsFromConfigs(): UqConfig[] {
	let { devs, uqs } = uqConfigs;
	return uqs.map(v => {
		let { dev, name, alias } = v;
		return {
			dev: (devs as any)[dev],
			name,
			alias,
		};
	});
}
