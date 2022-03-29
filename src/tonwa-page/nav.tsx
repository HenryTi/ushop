import React, { useContext } from "react";
import { NavigateOptions, To } from "react-router-dom";
import { proxy, ref } from "valtio";
import { AppNav, TabNav } from "./AppNav";

export interface PageItem {
    page: JSX.Element;
    pageId: number;
    onClose?: () => boolean;
}

export interface StackItem {
    name: string;
    page: JSX.Element;
    onClose?: () => boolean;
}

export interface TabItem extends StackItem {
    name: string;
    page: JSX.Element;
    title: string;
    keep?: boolean;
    onClose?: () => boolean;
}

export class Nav {
    readonly data: {
        stack: PageItem[];
    };
    readonly appNav: AppNav;
    readonly tabNav: TabNav;
    private pageId: number;

    constructor(appNav: AppNav, tabNav: TabNav, initPage: React.ReactNode) {
        this.pageId = 0;
        this.appNav = appNav;
        this.tabNav = tabNav;
        this.data = proxy({
            stack: [ref({
                name: undefined,
                pageId: ++this.pageId,
                page: <>{initPage}</>,
            })],
        });
    }

    navigate(to: To, options?: NavigateOptions) {
        this.appNav.navigate(to, options);
    }

    openTab(tabItem: TabItem) {
        this.tabNav.openTab(tabItem);
    }

    open(page?: JSX.Element, onClose?: () => boolean): void {
        let pageItem = {
            pageId: ++this.pageId,
            name: undefined as string, //url, 
            page, onClose,
        };
        this.data.stack.push(ref(pageItem));
    }

    close(level: number = 1) {
        for (let i = 0; i < level; i++) this.innerClose();
    }

    clear() {
        alert('nav clear');
    }

    private innerClose() {
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
