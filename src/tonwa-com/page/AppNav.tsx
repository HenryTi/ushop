import React from "react";
import { NavigateFunction, NavigateOptions, To } from "react-router-dom";
import { proxy, ref } from "valtio";
import { StackItem, StackNav, TabItem } from "./nav";

interface ErrorInPage {
    err: string; // name unique
    message: string;
}

export class AppNav extends StackNav<StackItem> {
    readonly response: {
        isLogined: boolean;
        error: ErrorInPage;
    } = proxy({
        isLogined: undefined,
        error: undefined,
    });
    navigateFunc: NavigateFunction;

    init(initPage: React.ReactNode, navigateFunc: NavigateFunction) {
        this.navigate = navigateFunc;
        if (initPage) {
            this.data.stack.splice(0);
            this.internalOpen(<>{initPage}</>);
        }
    }

    onLoginChanged = (isLogined: boolean) => {
        if (isLogined === true) {
            this.response.isLogined = isLogined;
        }
        else {
            this.response.isLogined = false;
        }
        this.response.error = undefined;
    }
    setError(err: string, message: string) { this.response.error = ref({ err, message }) }
    clearError() { this.response.error = undefined; }

    navigate(to: To, options?: NavigateOptions) {
        this.navigateFunc(to, options);
    }
}

export class TabNav extends StackNav<TabItem> {
    readonly appNav: AppNav;
    readonly itemsArr: TabItem[];
    readonly response: {
        active: TabItem;
    }
    defaultActive: TabItem;

    constructor(appNav: AppNav) {
        super();
        this.appNav = appNav;
        this.itemsArr = [];
        this.response = proxy({
            active: undefined,
        });
    }

    navigate(to: To, options?: NavigateOptions) {
        this.appNav.navigateFunc(to, options);
    }

    setInitTabs(initPageItems: TabItem[], defaultActive: TabItem) {
        this.defaultActive = defaultActive;
        initPageItems = initPageItems ?? [];
        this.itemsArr.splice(0);
        this.itemsArr.push(...initPageItems);
        this.data.stack.splice(0);
        this.data.stack.push(...(initPageItems).map(v => ref(v)));
    }

    start__to_be_removed(to: To) {
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

    openTab(pageItem: TabItem) {
        let refPageItem = ref(pageItem);
        this.response.active = refPageItem;
        this.data.stack.push(refPageItem);
        this.navigate(`/${pageItem.key}`);
        this.itemsArr.push(pageItem);
    }

    activate(pageItem: TabItem) {
        let { key: name } = pageItem;
        if (this.response.active !== pageItem) {
            this.response.active = pageItem;
            let p = this.itemsArr.findIndex(v => v.key === name);
            let ret = this.itemsArr.splice(p, 1);
            this.itemsArr.push(...ret);
            this.navigate(name);
        }
    }

    closeTab(pageItem?: TabItem) {
        let { stack } = this.data;
        if (stack.length === 0) return;
        pageItem = pageItem ?? this.response.active;
        let p = stack.findIndex(v => v === pageItem);
        if (p >= 0) {
            let [item] = stack.splice(p, 1);
            let i = this.itemsArr.findIndex(v => v.key === item.key);
            if (i >= 0) this.itemsArr.splice(i, 1)
            let len = this.itemsArr.length;
            if (len > 0) {
                let item = this.itemsArr[len - 1];
                this.response.active = item;
                let active = item.key;
                this.navigate(`/${active}`);
            }
        }
    }
}
