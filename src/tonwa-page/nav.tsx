import React, { useContext, useEffect, useRef } from "react";
import { NavigateFunction, NavigateOptions, To, useParams } from "react-router-dom";
import { proxy, ref, useSnapshot } from "valtio";
import { AuthProvider, User } from "./AuthProvider";

export interface PageItem {
    name: string;
    page: JSX.Element;
}

export interface AppPageItem extends PageItem {
    title: string;
    keep?: boolean;
    sub?: string;
}

abstract class NavStack<T extends PageItem> {
    readonly navOptions: NavigateOptions = {
        replace: false,
    }
    readonly data: {
        stack: T[];
    };
    constructor() {
        this.data = proxy({
            stack: [],
        });
    }
}

interface Error {
    err: string; // name unique
    message: string;
}

export class AppNav extends NavStack<AppPageItem> {
    static current = new AppNav();

    private _authProvider: AuthProvider;
    readonly itemsArr: AppPageItem[];
    readonly response: {
        active: AppPageItem;
        user: User;
        error: Error;
    }
    navigateFunc: NavigateFunction;
    defaultActive: AppPageItem;

    constructor(/*navigate: NavigateFunction, pageTemplate: PageTemplateProps/*, initPageItems?: AppPageItem[], defaultActive?: AppPageItem*/) {
        super();
        //setPageTemplate(undefined, pageTemplate);
        //this.defaultActive = defaultActive;
        //initPageItems = initPageItems ?? [];
        this.itemsArr = [];
        this.response = proxy({
            active: undefined, // defaultActive,
            user: undefined,
            error: undefined,
        });
        //this.data.stack.push(...(initPageItems).map(v => ref(v)));
    }

    setNavigate(navigateFunc: NavigateFunction) {
        this.navigateFunc = navigateFunc;
    }
    setAuthProvider(authProvider: AuthProvider) {
        this._authProvider = authProvider;
        this._authProvider.subscribeOnLoginChanged(this.onLoginChanged);
    }
    get authProvider(): AuthProvider { return this._authProvider; }
    loginChanged(user: User): void {
        this._authProvider.loginChanged(user);
    }
    onLoginChanged = (user: User) => {
        if (user) {
            this.response.user = user;
        }
        else {
            this.response.user = undefined;
            this.response.error = undefined;
        }
    }
    setError(err: string, message: string) { this.response.error = ref({ err, message }) }
    clearError() { this.response.error = undefined; }

    setInitTabs(initPageItems: AppPageItem[], defaultActive: AppPageItem) {
        this.defaultActive = defaultActive;
        initPageItems = initPageItems ?? [];
        this.itemsArr.splice(0);
        this.itemsArr.push(...initPageItems);
        this.data.stack.splice(0);
        this.data.stack.push(...(initPageItems).map(v => ref(v)));
    }

    navigate(to: To, options?: NavigateOptions) {
        this.navigateFunc(to, options ?? this.navOptions);
    }

    setNavOptions(navOptions: NavigateOptions) {
        Object.assign(this.navOptions, navOptions);
    }

    start(to: To) {
        let location = window.location;
        let href = location.href;
        let { stack } = this.data;
        let arr = stack.splice(0);
        this.navigate(to, { replace: true });
        if (location.href === href) {
            let len = arr.length;
            if (len > 0) {
                stack.push(arr[len - 1]);
            }
        }
    }

    openTab(pageItem: AppPageItem) {
        this.response.active = pageItem;
        this.data.stack.push(ref(pageItem));
        this.navigate(`/${pageItem.name}`);
        this.itemsArr.push(pageItem);
    }

    activate(pageItem: AppPageItem) {
        let { name, sub } = pageItem;
        if (this.response.active !== pageItem) {
            this.response.active = pageItem;
            let p = this.itemsArr.findIndex(v => v.name === name);
            let ret = this.itemsArr.splice(p, 1);
            this.itemsArr.push(...ret);
            this.navigate(`${name}` + (sub ? `/${sub}` : ``));
        }
    }

    close(pageItem: AppPageItem) {
        let { stack } = this.data;
        if (stack.length === 0) return;
        let active: string;
        let p = stack.findIndex(v => v === pageItem);
        if (p >= 0) {
            //let [item] = stack.splice(p, 1);
            //let i = this.itemsArr.findIndex(v => v.name === item.name);
            let len = this.itemsArr.length;
            if (len > 0) active = this.itemsArr[len - 1].name;
        }
        if (active) {
            this.navigate(`/${active}`);
        }
    }
}

export class Nav extends NavStack<PageItem> {
    readonly appNav: AppNav;
    readonly appPageItem: AppPageItem;
    private namePages: { [name: string]: JSX.Element } = {};

    constructor(appNav: AppNav, appPageItem: AppPageItem) {
        super();
        this.appNav = appNav;
        this.appPageItem = appPageItem;
    }

    //get response() { return this.appNav.response; }
    //setError(err: string, message: string) { this.appNav.response.error = ref({ err, message }) }
    //clearError() { this.appNav.response.error = undefined; }

    initPages(pages: { [name: string]: JSX.Element }) {
        Object.assign(this.namePages, pages);
    }

    navigate(to: To, options?: NavigateOptions) {
        this.appNav.navigate(to, options);
    }

    openTab(tabItem: AppPageItem) {
        this.appNav.openTab(tabItem);
    }

    start(to: To) {
        this.appNav.start(to);
    }

    open(sub: string, page?: JSX.Element) {
        if (!page) page = this.namePages[sub];
        this.appPageItem.sub = sub;
        let url = this.appPageItem.name + (sub ? '/' + sub : '');
        let pageItem = {
            name: url, page,
        };
        this.data.stack.push(ref(pageItem));
        this.navigate(`${pageItem.name}`);
    }

    close() {
        let { stack } = this.data;
        if (stack.length === 0) {
            this.appNav?.close(this.appPageItem);
            return;
        }
        stack.pop();
        if (this.appNav.navOptions.replace === true) {
            let len = stack.length;
            let active: string;
            if (len > 0) active = stack[len - 1].name;
            else active = this.appPageItem.name;
            this.navigate(`${active}`);
        }
        else {
            this.navigate(-1 as any);
        }
    }
}

export const AppNavContext = React.createContext<AppNav>(undefined);
export const PageNavContext = React.createContext<Nav>(undefined);

/*
export function useAppNav() {
    let c = useContext(AppNavContext);
    return c;
}
*/

export function useNav() {
    let c = useContext(PageNavContext);
    return c;
}

export function AppPageLayers({ active, appPageItems }: { active?: string; appPageItems: readonly AppPageItem[] }) {
    if (!active) {
        let len = appPageItems.length;
        if (len > 0) {
            active = appPageItems[len - 1].name;
        }
    }
    return <div className="tab-content d-flex flex-column flex-grow-1 overflow-hidden">
        {
            appPageItems.map(item => {
                let { name, page } = item;
                return (<div className={'tab-pane flex-column flex-grow-1 overflow-hidden ' + ((active === name ? 'active d-flex' : ''))} key={name}>
                    <PageContainer appPageItem={item}>
                        {page}
                    </PageContainer>
                </div>);
            })
        }
    </div>;
}

function PageContainer({ appPageItem, children }: { appPageItem: AppPageItem, children: React.ReactNode }) {
    let appNav = useContext(AppNavContext);
    let nav = useRef(new Nav(appNav, appPageItem));
    return <PageNavContext.Provider value={nav.current}>
        <PageLayers>
            {children}
        </PageLayers>
    </PageNavContext.Provider>;
}

function PageLayers({ children }: { children: React.ReactNode }) {
    let nav = useContext(PageNavContext);
    let { active_page, sub } = useParams();
    useEffect(() => {
        let { appPageItem, data } = nav;
        let { stack } = data;
        if (appPageItem.name === active_page) {
            if (!sub) {
                stack.splice(0);
            }
            else {
                let subLower = sub.toLowerCase();
                let len = stack.length;
                // find from last
                for (let i = len - 1; i >= 0; i--) {
                    if (stack[i].name.toLowerCase() === subLower) {
                        stack.splice(i + 1);
                        break;
                    }
                }
            }
        }
    }, [nav, active_page, sub]);
    let { data } = nav;
    let snapshot = useSnapshot(data);
    let { stack } = snapshot;
    let len = stack.length;
    const flexFill = 'flex-column flex-grow-1 overflow-hidden '
    let cnChildren: string = flexFill + (len > 0 ? 'd-none' : 'd-flex');
    let last = len - 1;
    return <>
        <div className={cnChildren}>
            {children}
        </div>
        {stack.map((v, index) => {
            if (index > last) return null;
            let { name, page } = v;
            let cn: string = flexFill + (index < last ? 'd-none' : 'd-flex');
            return <div key={name} className={cn}>
                {page}
            </div>
        })}
    </>;
}
