import React, { useContext } from "react";
import { NavigateOptions, To } from "react-router-dom";
import { FA } from "tonwa-react";
import { proxy, ref } from "valtio";
import { AppNav, TabNav } from "./AppNav";
import { UPage } from "./Page";

export interface StackItem {
    key: string;
    page: JSX.Element;
    onClose?: () => boolean;
}

export interface TabItem extends StackItem {
    title: string;
    keep?: boolean;
}

export class StackNav<T extends StackItem> {
    readonly data: {
        stack: T[];
    };
    private pageKeyNO: number;
    constructor(initPage: React.ReactNode) {
        this.pageKeyNO = 0;
        let stack = [];
        if (initPage) {
            stack.push(ref({
                key: String(++this.pageKeyNO),
                page: <>{initPage}</>,
            } as T));
        }
        this.data = proxy({
            stack,
        });
    }

    open(page: JSX.Element | (() => Promise<JSX.Element>), onClose?: () => boolean): void {
        if (typeof (page) === 'function') {
            let promise: Promise<JSX.Element> = page();
            let isWaiting = false;
            setTimeout(() => {
                if (isWaiting === undefined) return;
                this.open(<Waiting />);
                isWaiting = true;
            }, 100);
            promise.then((pg) => {
                if (isWaiting === true) {
                    this.close();
                }
                isWaiting = undefined;
                this.open(pg, onClose);
                return;
            });
            return;
        }
        this.internalOpen(page, onClose);
    }

    private internalOpen(page: JSX.Element, onClose?: () => boolean): void {
        let pageItem = {
            key: String(++this.pageKeyNO),
            page, onClose,
        } as T;
        this.data.stack.push(ref(pageItem));
    }

    close(level: number = 1) {
        for (let i = 0; i < level; i++) this.innerClose();
    }

    clear() {
        alert('nav clear');
    }

    protected innerClose() {
        let { stack } = this.data;
        let len = stack.length;
        if (len === 0) {
            //this.appNav?.close(this.appPageItem);
            return;
        }
        let { onClose } = stack[len - 1];
        if (onClose?.() === false) return;
        stack.pop();
    }
}

function Waiting() {
    return <UPage header="..." back="none" headerClassName="bg-secondary">
        <div className="p-5 text-center">
            <FA name="spinner" size="lg" className="text-info" spin={true} />
        </div>
    </UPage>;
}

export class Nav extends StackNav<StackItem> {
    readonly appNav: AppNav;
    readonly tabNav: TabNav;

    constructor(appNav: AppNav, tabNav: TabNav, initPage: React.ReactNode) {
        super(initPage);
        this.appNav = appNav;
        this.tabNav = tabNav;
    }

    navigate(to: To, options?: NavigateOptions) {
        this.appNav.navigate(to, options);
    }

    openTab(tabItem: TabItem) {
        this.tabNav.openTab(tabItem);
    }

    protected innerClose() {
        super.innerClose();
        if (this.data.stack.length > 0) return;
        if (this.tabNav) {
            this.tabNav.closeTab();
        }
        else {
            this.appNav.close();
        }
    }
}

export const AppNavContext = React.createContext<AppNav>(undefined);
export const TabNavContext = React.createContext<TabNav>(undefined);
export const PageStackContext = React.createContext<Nav>(undefined);

export function useAppNav() {
    return useContext(AppNavContext);
}

export function useTabNav() {
    return useContext(TabNavContext);
}

export function useNav() {
    return useContext(PageStackContext);
}
