import { Tonwa } from "tonwa-core";
import { Nav } from "tonwa-com";
import { Nav as ControlNav } from "tonwa-controller";
import { start } from "tonwa";
import { res } from "./res";
import { setUI } from "uq-app/uqs";
import { appConfig } from "./appConfig";
import { CAppBase } from "tonwa-react";
import { UQs } from './uqs';

export class CApp extends CAppBase<UQs> {
	private appNav: Nav; // AppNav;

	constructor(tonwa: Tonwa) {
		super(tonwa, appConfig);
	}
	// app: App;

	setAppNav(nav: Nav) {
		this.appNav = nav; // new AppNav(nav);
	}

	protected async internalStart(isUserLogin: boolean) {
		this.setRes(res);
		setUI(this.uqs);

		//let tonwa = this.getTonwa();
		//let appNav = new AppNav(tonwa);
		//let app = new App(this.uqs);
		// this.app = app;

		//app.openMain();
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
	//private readonly tonwa: Tonwa;
	constructor(nav: Nav) {
		this.nav = nav;
	}

	open(page: JSX.Element, afterClose: () => void): void {
		this.nav.open(page); //, afterClose);
	}
	close(level: number = 1): void {
		for (let i = 0; i < level; i++) {
			this.nav.close();
		}
	}
	openLogin(): void {
		//this.tonwa.showLogin(undefined);
	}
}
