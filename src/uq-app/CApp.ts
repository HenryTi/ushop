import { Nav, Tonwa } from "tonwa-core";
import { Nav as ControlNav } from "tonwa-controller";
import { start } from "tonwa";
import { res } from "./res";
import { setUI } from "uq-app/uqs";
import { appConfig } from "./appConfig";
import { CAppBase } from "tonwa-react";
import { UQs } from './uqs';
import { app } from "../App";

export class CApp extends CAppBase<UQs> {
	constructor(tonwa: Tonwa) {
		super(tonwa, appConfig);
	}
	// app: App;

	protected async internalStart(isUserLogin: boolean) {
		this.setRes(res);
		setUI(this.uqs);

		let tonwa = this.getTonwa();
		let appNav = new AppNav(tonwa);
		//let app = new App(this.uqs);
		// this.app = app;
		app.init(this._uqs, appNav);
		//app.appNav = appNav;
		app.user = this.user;
		app.userApi = this.net.centerApi;
		await app.loadBaseData();

		app.openMain();
	}

	async initStart() {
		await this.tonwa.appStart();
	}

	render(loginedOnly: boolean = true): JSX.Element {
		const onLogined = async (isUserLogin?: boolean) => {
			await start(CApp, this.tonwa, appConfig, isUserLogin);
		}
		let onNotLogined: () => Promise<void> = undefined;
		if (loginedOnly === false) onNotLogined = onLogined;
		return this.tonwa.nav.renderNavView(onLogined, onNotLogined);
	}
}

export class AppNav implements ControlNav {
	private readonly nav: Nav;
	private readonly tonwa: Tonwa;
	constructor(tonwa: Tonwa) {
		this.nav = tonwa.nav;
		this.tonwa = tonwa;
	}

	open(page: JSX.Element, afterClose: () => void): void {
		this.nav.push(page, afterClose);
	}
	close(level: number = 1): void {
		this.nav.pop(level);
	}
	openLogin(): void {
		this.tonwa.showLogin(undefined);
	}
}
