import { Navigo, Hooks, NamedRoute, RouteFunc } from "./Navigo";
import { Nav, NavPage } from './Nav';
import { Net, User, Guest } from 'tonwa-uq';
import { resOptions } from '../res';
import { LocalData, env } from '../tool';
import { Login } from './Login';

export interface NavSettings {
	oem?: string;
	loginTop?: any; // JSX.Element
	privacy?: string;
	htmlTitle?: string;
}

let logMark: number;
const logs: string[] = [];

export let tonwa: Tonwa;

export abstract class TonwaBase {
	readonly net: Net;
	testing: boolean;

	constructor() {
		this.testing = false;
		this.net = this.createWeb();
	}
	abstract createWeb(): Net;
	abstract createObservableMap<K, V>(): Map<K, V>;
	async init() {
		this.testing = env.testing;
		await this.net.host.start(this.testing);
	}
}

export abstract class Tonwa extends TonwaBase {
	private wsHost: string;
	private local: LocalData = new LocalData();
	private navigo: Navigo;
	//isWebNav:boolean = false;
	navSettings: NavSettings;
	user: User = null;
	language: string;
	culture: string;
	resUrl: string;

	constructor() {
		super();
		tonwa = this;
		let { lang, district } = resOptions;
		this.language = lang;
		this.culture = district;
	}

	/*
	protected abstract startWait(): void;
	protected abstract endWait(): void;
	*/
	//protected abstract showLogin(callback?: (user:User)=>Promise<void>, withBack?:boolean): Promise<void>;
	protected abstract showRegister(): Promise<void>;
	protected abstract showForget(): Promise<void>;

	abstract get nav(): Nav;

	abstract privacyEntry(): void;
	//abstract showLogout(callback?: ()=>Promise<void>): Promise<void>;
	//abstract openSysPage(url: string):boolean;
	//abstract changePassword(): Promise<void>;
	//abstract userQuit(): Promise<void>;
	abstract resetAll: () => void;
	abstract showAppView(isUserLogin?: boolean): Promise<void>;
	//abstract clear(): void;

	get guest(): number {
		let guest = this.local.guest;
		if (guest === undefined) return 0;
		let g = guest.get();
		if (g === undefined) return 0;
		return g.guest;
	}
	async onReceive(msg: any) {
		//if (this.ws === undefined) return;
		await this.net.messageHub.dispatch(msg);
	}

	private async loadUnitJson() {
		try {
			let unitJsonPath = this.unitJsonPath();
			let unitRes = await fetch(unitJsonPath, {});
			let res = await unitRes.json();
			return res.unit;
		}
		catch (err1) {
			this.local.unit.remove();
			return;
		}
	}

	setSettings(settings?: NavSettings) {
		this.navSettings = settings;
		let { htmlTitle } = settings;
		if (htmlTitle) {
			document.title = htmlTitle;
		}
		let html = document.getElementsByTagName('html');
		let html0 = html[0];
		if (html0) {
			let version = html0?.getAttribute('data-version');
			if (version) {
				//appConfig.version = version;
			}
		}
	}

	get oem(): string {
		return this.navSettings && this.navSettings.oem;
	}

	hashParam: string;
	private arrs = ['/test', '/test/'];
	private unitJsonPath(): string {
		let { origin, pathname } = document.location;
		pathname = pathname.toLowerCase();
		for (let item of this.arrs) {
			if (pathname.endsWith(item) === true) {
				pathname = pathname.substr(0, pathname.length - item.length);
				break;
			}
		}
		if (pathname.endsWith('/') === true || pathname.endsWith('\\') === true) {
			pathname = pathname.substr(0, pathname.length - 1);
		}
		return origin + pathname + '/unit.json';
	}
	/*
	private windowOnClick = (ev: MouseEvent) => {
		console.error('windowOnClick');
	}
	private windowOnMouseMove = (ev: MouseEvent) => {
		console.log('navigator.userAgent: ' + navigator.userAgent);
		console.log('mouse move (%s, %s)', ev.x, ev.y);
	}
	private windowOnScroll = (ev: Event) => {
		console.log('scroll event');
	}
	*/
	forceDevelopment: boolean;

	async init() {
		await super.init();
		if (this.forceDevelopment === true) {
			env.isDevelopment = true;
		}
		let { url, ws, resHost } = this.net.host;
		this.resUrl = this.net.resUrlFromHost(resHost);
		this.wsHost = ws;
		this.net.setCenterUrl(url);

		let guest: Guest = this.local.guest.get();
		if (guest === undefined) {
			guest = await this.net.guestApi.guest();
		}
		if (!guest) {
			debugger;
			throw Error('guest can not be undefined');
		}
		this.setGuest(guest);
	}

	reloadUser = () => {
		let user: User = this.local.user.get();
		let curUser = this.user;
		if (!user && !curUser) return;
		if (user?.id === curUser?.id) return;
		if (!user) {
			this.logout();
		}
		else {
			this.logined(user);
		}
	}

	//private appStarted:boolean = false;
	private notLogined?: () => Promise<void>;
	private userPassword?: () => Promise<{ user: string; password: string; }>
	async appStart(notLogined?: () => Promise<void>, userPassword?: () => Promise<{ user: string; password: string; }>) {
		//if (this.appStarted === true) return;
		//this.appStarted = true;
		this.notLogined = notLogined;
		this.userPassword = userPassword;
		await this.init();
		await this.start();
	}

	protected abstract beforeStart(): void;

	async start() {
		try {
			this.beforeStart();
			if (env.isMobile === true) {
				document.onselectstart = function () { return false; }
				document.oncontextmenu = function () { return false; }
			}
			this.nav.clear();

			let user: User = this.local.user.get();
			if (user === undefined) {
				//throw new Error('user logout to be implemented');
				//let {userPassword} = this.navView.props;
				if (this.userPassword) {
					let ret = await this.userPassword();
					if (ret) {
						let { user: userName, password } = ret;
						let logindUser = await this.net.userApi.login({
							user: userName,
							pwd: password,
							guest: this.guest,
						});
						user = logindUser;
					}
				}
				if (user === undefined) {
					//let {notLogined} = this.navView.props;
					if (this.notLogined !== undefined) {
						await this.notLogined();
					}
					else {
						await this.showLogin(undefined);
						//nav.navigateToLogin();
					}
					return;
				}
			}

			await this.logined(user);
		}
		catch (err) {
			console.error(err);
			debugger;
		}
		finally {
		}
	}

	resolveRoute() {
		//if (this.isRouting === false) return;
		if (this.navigo === undefined) return;
		this.navigo.resolve();
	}

	on(routeFunc: RouteFunc, hooks?: Hooks): Navigo;
	on(url: string, routeFunc: RouteFunc, hooks?: Hooks): Navigo;
	on(regex: RegExp, routeFunc: RouteFunc, hooks?: Hooks): Navigo;
	on(options: { [url: string]: RouteFunc | NamedRoute }): Navigo;
	on(...args: any[]): Navigo {
		if (this.navigo === undefined) {
			this.navigo = new Navigo();
			if (this.nav.isWebNav !== true) this.navigo.historyAPIUpdateMethod('replaceState');
		}
		return this.navigo.on(args[0], args[1], args[2]);
	}

	navigateToLogin() {
		this.navigate('/login');
	}

	navigate(url: string, absolute?: boolean) {
		if (!this.navigo) {
			alert('Is not in webnav state, cannot navigate to url "' + url + '"');
			return;
		}
		if (this.testing === true) {
			url += '#test';
		}
		return this.navigo.navigate(url, absolute);
	}

	go(showPage: () => void, url: string, absolute?: boolean) {
		if (this.navigo !== undefined) {
			this.navigate(url, absolute);
		}
		else {
			showPage();
		}
	}

	setGuest(guest: Guest) {
		this.local.guest.set(guest);
		this.net.setNetToken(0, guest.token);
	}

	saveLocalUser() {
		this.local.user.set(this.user);
	}

	setUqRoles(uq: string, roles: string[]) {
		let { roles: userRoles } = this.user;
		if (!userRoles) {
			this.user.roles = {};
		}
		this.user.roles[uq] = roles;
		this.local.user.set(this.user);
	}

	async loadMe() {
		let me = await this.net.userApi.me();
		this.user.icon = me.icon;
		this.user.nick = me.nick;
	}

	private async internalLogined(user: User, callback: (user: User) => Promise<void>, isUserLogin: boolean) {
		this.net.logoutApis();
		this.user = user;
		this.saveLocalUser();
		this.net.setNetToken(user.id, user.token);
		this.nav.clear();

		await this.onChangeLogin?.(this.user);
		if (callback !== undefined) {
			await callback(user);
		}
		else if (this.nav.isWebNav === true) {
			this.navigate('/index');
		}
		else {
			await this.showAppView(isUserLogin);
		}
	}

	onChangeLogin: (user: User) => Promise<void>;

	// 缓冲登录
	async logined(user: User, callback?: (user: User) => Promise<void>) {
		await this.internalLogined(user, callback, false);
	}

	// 用户操作之后登录
	async userLogined(user: User, callback?: (user: User) => Promise<void>) {
		await this.internalLogined(user, callback, true);
	}

	loginTop(defaultTop: any /*JSX.Element*/) {
		return (this.navSettings && this.navSettings.loginTop) || defaultTop;
	}

	async logout(callback?: () => Promise<void>) { //notShowLogin?:boolean) {
		this.local.logoutClear();
		this.user = undefined; //{} as User;
		this.net.logoutApis();
		let guest = this.local.guest.get();
		this.net.setCenterToken(0, guest && guest.token);
		this.nav.clear();
		if (callback === undefined)
			await this.start();
		else
			await callback();
		this.onChangeLogin?.(undefined);
	}


	get logs() { return logs };
	log(msg: string) {
		logs.push(msg);
	}
	logMark() {
		let date = new Date();
		logMark = date.getTime();
		logs.push('log-mark: ' + date.toTimeString());
	}
	logStep(step: string) {
		logs.push(step + ': ' + (new Date().getTime() - logMark));
	}

	reload = async () => {
		let waiting: Promise<void> = new Promise<void>((resolve, reject) => {
			setTimeout(resolve, 100);
		});

		if ('serviceWorker' in navigator) {
			let registration = await Promise.race([waiting, navigator.serviceWorker.ready]);
			if (registration) registration.unregister();
		}
		window.document.location.reload();
		// dcloud hbuilder里面的app自动升级，需要清webview的缓存
		let plus = (window as any).plus;
		if (plus) {
			let webview = plus.webview;
			if (webview) {
				if (webview.reload) webview.reload(true);
			}
			else {
				let webView = plus.webView;
				if (webView) {
					if (webView.reload) webView.reload(true);
				}
			}
			//plus.webview.reload(true)
		}
	}

	openSysPage(url: string): boolean {
		let navPage: NavPage = this.sysRoutes[url];
		if (navPage === undefined) {
			//alert(url + ' is not defined in sysRoutes');
			return false;
		}
		navPage(undefined);
		return true;
	}

	private navLogin: NavPage = async (params: any) => {
		this.showLogin(async (user: User) => window.history.back(), false);
	}

	private navLogout: NavPage = async (params: any) => {
		this.showLogout(async () => window.history.back());
	}

	private navRegister: NavPage = async (params: any) => {
		this.showRegister();
	}

	private navForget: NavPage = async (params: any) => {
		this.showForget();
	}


	private navPageRoutes: { [url: string]: NavPage };
	private routeFromNavPage(navPage: NavPage) {
		return (params: any, queryStr: any) => {
			if (navPage) {
				if (this.nav.isWebNav) this.nav.clear();
				navPage(params);
			}
		}
	}
	onNavRoute(navPage: NavPage) {
		this.on(this.routeFromNavPage(navPage));
	}
	private doneSysRoutes: boolean = false;
	private sysRoutes: { [route: string]: NavPage } = {
		'/login': this.navLogin,
		'/logout': this.navLogout,
		'/register': this.navRegister,
		'/forget': this.navForget,
	}
	/*
	onSysNavRoutes() {
		this.onNavRoutes(this.sysRoutes);
	}
	*/
	onNavRoutes(navPageRoutes: { [url: string]: NavPage }) {
		if (this.doneSysRoutes === false) {
			this.doneSysRoutes = true;
			this.internalOnNavRoutes(this.sysRoutes);
		}
		this.internalOnNavRoutes(navPageRoutes);
	}

	private internalOnNavRoutes(navPageRoutes: { [url: string]: NavPage }) {
		if (!navPageRoutes) return;
		this.navPageRoutes = Object.assign(this.navPageRoutes, navPageRoutes);
		let navOns: { [route: string]: (params: any, queryStr: any) => void } = {};
		for (let route in navPageRoutes) {
			let navPage = navPageRoutes[route];
			navOns[route] = this.routeFromNavPage(navPage);
		}
		this.on(navOns);
	}

	async checkVersion(): Promise<string> {
		let { href } = document.location;
		href += (href.indexOf('?') >= 0 ? '&' : '?') + '_t_t_=' + new Date().getTime();
		let ret = await fetch(href);
		let r = await ret.text();
		let parser = new DOMParser();
		let htmlDoc = parser.parseFromString(r, 'text/html');
		let elHtml = htmlDoc.getElementsByTagName('html');
		let newVersion = elHtml[0].getAttribute('data-version');
		return newVersion;
	}

	private createLogin: (tonwa: Tonwa) => Promise<Login>;
	setCreateLogin(createLogin: (tonwa: Tonwa) => Promise<Login>) {
		this.createLogin = createLogin;
	}

	async changePassword() {
		let login = await this.getLogin();
		login.showChangePassword();
	}

	async userQuit() {
		let login = await this.getLogin();
		login.showUserQuit();
	}

	private login: Login;
	private async getLogin(): Promise<Login> {
		if (this.login) return this.login;
		return this.login = await this.createLogin(this);
	}
	async showLogin(callback?: (user: User) => Promise<void>, withBack?: boolean) {
		let login = await this.getLogin();
		login.showLogin(callback, withBack);
	}

	async showLogout(callback?: () => Promise<void>) {
		let login = await this.getLogin();
		login.showLogout(callback);
	}
}
