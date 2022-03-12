import { User, UQsLoader, UQsMan, UqQuery, Net, UqsConfig } from "tonwa-uq";
import {
	//UqsConfig as UqsConfigCore, AppConfig as AppConfigCore
	Tonwa, setGlobalRes, RouteFunc, Hooks, Navigo, NamedRoute
} from "tonwa-core";
import { ControllerWithWeb } from '../vm';
import { VErrorsPage, VStartError } from "./vMain";
import { uqsProxy } from "../uq";
import { t } from "../ui";

export interface IConstructor<T> {
	new(...args: any[]): T;
}

/*
export interface DevConfig {
	name: string;
	alias?: string;
	memo?: string;
}

export interface UqConfig {
	dev: DevConfig;
	name: string;
	alias?: string;	
	version?: string;
	memo?: string;
}

export interface UqsConfig {
	app?: {
		dev: DevConfig;
		name: string;
		version?: string;
	};
	uqs?: UqConfig[];
}
*/

//export type UqsConfig = UqsConfigCore;
export interface AppConfig extends UqsConfig {
	/*
	app?: {
		name: string;
		version: string;
		ownerMap?: {[key:string]: string};
	};
	*/
	//appName: string;        // 格式: owner/appName
	version: string;        // 版本变化，缓存的uqs才会重载
	//tvs?: TVs;
	//uqNameMap?: {[uqName:string]: string};      // uqName='owner/uq' 映射到内存简单名字：uq, 可以注明映射，也可以自动。有可能重
	loginTop?: JSX.Element;
	oem?: string;               // 用户注册发送验证码的oem厂家，默认同花
	privacy?: string;
	noUnit?: boolean;			// app的运行，不跟unit绑定
	htmlTitle?: string;
}

export interface Elements {
	[id: string]: (element: HTMLElement) => void,
}

export abstract class CAppBase<U> extends ControllerWithWeb {
	private appConfig: AppConfig;
	private uqsMan: UQsMan;
	protected _uqs: U;
	readonly net: Net;
	timezone: number;
	unitTimezone: number;
	unitBizMonth: number;
	unitBizDate: number;

	constructor(tonwa: Tonwa, config?: AppConfig) {
		super(tonwa);
		this.net = tonwa.net;
		//this.nav = new Nav(tonwa); // nav;
		this.appConfig = config || (tonwa.navSettings as AppConfig);
		if (this.appConfig) {
			let { uqs } = this.appConfig;
			if (uqs === undefined) {
				throw new Error('uqs must be defined in AppConfig');
			}
		}
	}

	get uqs(): U { return this._uqs; }

	internalT(str: string): any {
		return t(str);
	}

	setRes(res: any) {
		setGlobalRes(res);
	}
	protected afterBuiltUQs(uqs: any) { }

	protected async loadUnitTime($getTimezone: UqQuery<any, any>) {
		let ret = await $getTimezone.query({});
		let tz = ret.ret[0];
		this.timezone = tz.timezone ?? 8;
		this.unitTimezone = tz.unitTimeZone ?? 8;
		this.unitBizMonth = (tz.unitBizMonth ?? 1) - 1;
		this.unitBizDate = tz.unitBizDate ?? 1;
	}

	bizDate(date: Date): Date {
		let year: number, month: number, d: number;
		year = date.getFullYear();
		month = date.getMonth();
		d = date.getDate();
		let bm = this.unitBizMonth;
		let bd = this.unitBizDate;
		if (bd < 0) {
			if (d < -bd) --month;
		}
		else {
			if (d >= bd) ++month;
		}
		if (bm < 0) {
			if (month < -bm) --year;
			month = (month - bm) % 12;
		}
		else {
			if (month >= bm) ++year;
			month = (month + bm) % 12;
		}
		return new Date(year, month, 1);
	}

	private uqsUser: any = '';
	protected async initUQs(): Promise<any> {
		if (!this.appConfig) return;
		let { user } = this.tonwa;
		if (user === this.uqsUser) return;
		this.uqsUser = user;
		this.net.logoutApis();
		let { version, uqs } = this.appConfig;
		let uqsLoader = new UQsLoader(this.tonwa.net, version, uqs);
		let retErrors = await uqsLoader.build();
		this.uqsMan = uqsLoader.uqsMan;
		this._uqs = uqsProxy(uqsLoader.uqsMan) as any; //  this.uqsMan.proxy;
		this.afterBuiltUQs(this._uqs);
		return retErrors;
	}

	protected async beforeStart(): Promise<boolean> {
		try {
			this.onNavRoutes();
			let retErrors = await this.initUQs();
			if (retErrors !== undefined) {
				this.openVPage(VErrorsPage, retErrors);
				return false;
			}
			return true;
		}
		catch (err) {
			this.openVPage(VStartError, err);
			return false;
		}
	}
	protected async afterStart(): Promise<void> {
		this.tonwa.resolveRoute();
		this.tonwa.onChangeLogin = (user: User) => this.onChangeLogin(user);
		this.onChangeLogin(this.user);
	}

	async userFromId(userId: number): Promise<any> {
		return await this.net.centerApi.userFromId(userId);
	}

	async userFromName(userName: string): Promise<any> {
		return await this.net.centerApi.userFromKey(userName);
	}

	protected on(routeFunc: RouteFunc, hooks?: Hooks): Navigo;
	protected on(url: string, routeFunc: RouteFunc, hooks?: Hooks): Navigo;
	protected on(regex: RegExp, routeFunc: RouteFunc, hooks?: Hooks): Navigo;
	protected on(options: { [url: string]: RouteFunc | NamedRoute }): Navigo;
	protected on(...args: any[]): Navigo {
		return this.tonwa.on(args[0], args[1], args[2]);
	}

	protected onNavRoutes() { return; }

	async getUqRoles(uqName: string): Promise<string[]> {
		let { user } = this.tonwa;
		if (!user) return null;
		let { roles: userRoles } = user;
		let uq = uqName.toLowerCase();
		let roles: string[];
		if (userRoles) {
			roles = userRoles[uq];
		}
		if (roles) return roles;

		roles = await this.uqsMan.getUqUserRoles(uq);
		if (!roles) roles = null;
		this.tonwa.setUqRoles(uq, roles);
		return roles;
	}
	/*
	isAdmin(roles: string[]): boolean {
		return this.isRole(roles, '$');
	}

	isRole(roles: string[], role: string): boolean {
		if (!roles) return false;
		role = role.toLowerCase();
		return roles.indexOf(role) >= 0;
	}
	*/

	protected onChangeLogin(user: User): Promise<void> {
		return;
	}
}
