import { UQsMan } from "./uqsMan";
import { UqData, CenterAppApi, Net } from '../net';
import { UqConfig } from "tonwa-uq";

export class UQsLoader {
	protected readonly net: Net;
	protected readonly uqConfigVersion: string;
	protected readonly uqConfigs: UqConfig[];
	protected isBuildingUQ: boolean = false;
	uqsMan: UQsMan;         // value

	constructor(net: Net, uqConfigVersion: string, uqConfigs: UqConfig[]) {
		this.net = net;
		this.uqConfigVersion = uqConfigVersion;
		this.uqConfigs = uqConfigs;
	}

	async build() {
		return await this.loadUqs();
	}

	// 返回 errors, 每个uq一行
	async loadUqs(): Promise<string[]> {
		this.uqsMan = new UQsMan(this.net);
		let uqs = await this.loadUqData(this.uqConfigs);
		return await this.uqsMan.buildUqs(uqs, this.uqConfigVersion, this.uqConfigs, this.isBuildingUQ);
	}

	private async loadUqData(uqConfigs: UqConfig[]): Promise<UqData[]> {
		let uqs: { owner: string; ownerAlias: string; name: string; alias: string; version: string }[] = uqConfigs.map(
			v => {
				let { dev, name, version, alias } = v;
				let { name: owner, alias: ownerAlias } = dev;
				return { owner, ownerAlias, name, version, alias };
			}
		);
		let centerAppApi = new CenterAppApi(this.net, 'tv/');
		let ret: UqData[] = uqs.length === 0 ? [] : await centerAppApi.uqs(uqs);
		if (ret.length < uqs.length) {
			let err = `下列UQ：\n${uqs.map(v => `${v.owner}/${v.name}`).join('\n')}之一不存在`;
			console.error(err);
			throw Error(err);
		}
		for (let i = 0; i < uqs.length; i++) {
			let { ownerAlias, alias } = uqs[i];
			ret[i].ownerAlias = ownerAlias;
			ret[i].uqAlias = alias;
		}
		return ret;
	}
}

export class UQsBuildingLoader extends UQsLoader {
	async build() {
		this.isBuildingUQ = true;
		let retErrors = await this.loadUqs();
		return retErrors;
	}
}
