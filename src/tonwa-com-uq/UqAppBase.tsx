import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AppNav } from 'tonwa-com';
import { Guest, Hosts, LocalDb, NetProps, UqConfig, User, UserApi } from 'tonwa-uq';

import { UQsLoader, Net } from "tonwa-uq";
import { uqsProxy } from './uq';
import { env, LocalData } from 'tonwa-com';
import { ObservableMap } from 'mobx';
import { proxy } from 'valtio';
import { Spinner } from 'tonwa-com';
import { AppContainer } from 'tonwa-com';

export interface AppConfig { //extends UqsConfig {
    center: string;
    debug: Hosts;
    version: string;        // 版本变化，缓存的uqs才会重载
    loginTop?: JSX.Element;
    oem?: string;               // 用户注册发送验证码的oem厂家，默认同花
    privacy?: string;
    noUnit?: boolean;			// app的运行，不跟unit绑定
    htmlTitle?: string;
}

let uqAppId = 1;
export abstract class UqAppBase<U = any> {
    private readonly appConfig: AppConfig;
    private readonly uqConfigs: UqConfig[];
    private localData: LocalData;
    readonly uqAppBaseId: number;
    readonly net: Net;
    readonly appNav: AppNav;
    readonly userApi: UserApi;
    readonly version: string;    // version in appConfig;
    readonly responsive: {
        user: User;
    }
    guest: number;
    uqs: U;

    constructor(appConfig: AppConfig, uqConfigs: UqConfig[]) {
        this.uqAppBaseId = uqAppId++;
        this.appConfig = appConfig;
        this.uqConfigs = uqConfigs;
        this.version = appConfig.version;
        this.responsive = proxy({
            user: undefined,
        });
        let props: NetProps = {
            center: appConfig.center,
            debug: appConfig.debug,
            unit: env.unit,
            testing: env.testing,
            localDb: new LocalStorageDb(),
            createObservableMap: () => new ObservableMap(),
        }
        this.net = new Net(props);
        this.localData = new LocalData();

        this.appNav = new AppNav();
        this.userApi = this.net.userApi;
    }

    initAppNav(initPage: React.ReactNode, navigateFunc: NavigateFunction) {
        this.appNav.init(initPage, navigateFunc);
    }

    logined(user: User) {
        this.net.logoutApis();
        this.responsive.user = user;
        this.appNav.onLoginChanged(true);
        if (user) {
            this.net.setCenterToken(user.id, user.token);
        }
        else {
            this.net.clearCenterToken();
        }
        this.localData.user.set(user);
    }

    async setUserProp(propName: string, value: any) {
        await this.userApi.userSetProp(propName, value);
        let { user } = this.responsive;
        (user as any)[propName] = value;
        this.localData.user.set(user);
    }

    saveLocalData() {
        this.localData.saveToLocalStorage();
    }

    private uqsUserId: number = -1;
    async init(): Promise<any> {
        let { version } = this.appConfig;
        if (this.responsive.user?.id === this.uqsUserId) return;

        await this.net.init();
        let user = this.localData.user.get();
        if (user) {
            this.logined(user);
        }
        else {
            let guest: Guest = this.localData.guest.get();
            if (guest === undefined) {
                guest = await this.net.userApi.guest();
            }
            if (!guest) {
                debugger;
                throw Error('guest can not be undefined');
            }
            this.net.setCenterToken(0, guest.token);
            this.localData.guest.set(guest);
        }

        this.uqsUserId = this.responsive.user?.id;
        let uqsLoader = new UQsLoader(this.net, version, this.uqConfigs);

        let retErrors = await uqsLoader.build();
        this.uqs = uqsProxy(uqsLoader.uqsMan) as any; //  this.uqsMan.proxy;
        return retErrors;
    }
}

class LocalStorageDb extends LocalDb {
    getItem(key: string): string {
        return localStorage.getItem(key);
    }
    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}

export const UqAppContext = React.createContext(undefined);
export function useUqAppBase<U, T extends UqAppBase<U> = UqAppBase<U>>() {
    return useContext<T>(UqAppContext);
}

export function UqAppBaseView<T extends UqAppBase>({ uqApp, children }: { uqApp: T; children: ReactNode; }) {
    let [appInited, setAppInited] = useState<boolean>(false);
    let navigateFunc = useNavigate();
    useEffect(() => {
        async function appInit() {
            await uqApp.init();
            uqApp.initAppNav(children, navigateFunc);
            setAppInited(true);
        }
        appInit();
    }, [uqApp, children, navigateFunc]);
    if (appInited === false) return <div className="p-5 text-center">
        <Spinner className="text-info" />
    </div>
    return <UqAppContext.Provider value={uqApp}>
        <AppContainer />
    </UqAppContext.Provider>;
}
