import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AppNav } from 'tonwa-com';
import { Guest, LocalDb, NetProps, UqConfig, User, UserApi } from 'tonwa-uq';
//import { AuthProvider } from './AuthProvider';

import { UQsLoader, Net } from "tonwa-uq";
import { uqsProxy } from '../uq';
import { env, LocalData } from 'tonwa-com';
import { ObservableMap } from 'mobx';
import { proxy } from 'valtio';
import { Spinner } from 'tonwa-com';
import { AppContainer } from 'tonwa-com';
//import { VErrorsPage, VStartError } from "./vMain";
//import { uqsProxy } from "../uq";

export interface AppConfig { //extends UqsConfig {
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

let uqAppId = 1;
export abstract class UqAppBase<U = any> {
    private readonly appConfig: AppConfig;
    private readonly uqConfigs: UqConfig[];
    private localData: LocalData;
    readonly uqAppBaseId: number;
    readonly net: Net;
    //readonly auth: AuthProvider;
    readonly appNav: AppNav;
    readonly userApi: UserApi;
    readonly version: string;    // version in appConfig;
    readonly responsive: {
        user: User;
    }
    guest: number;
    //user: User;
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
            unit: env.unit,
            testing: env.testing,
            localDb: new LocalStorageDb(),
            createObservableMap: () => new ObservableMap(),
        }
        this.net = new Net(props);
        this.localData = new LocalData();

        //this.auth = new AuthProvider(this);
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
        //this.auth.loginChanged(user);
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

        await this.net.init(env.testing);
        let user = this.localData.user.get();
        if (user) {
            this.logined(user);
        }
        else {
            let guest: Guest = this.localData.guest.get();
            if (guest === undefined) {
                guest = await this.net.guestApi.guest();
            }
            if (!guest) {
                debugger;
                throw Error('guest can not be undefined');
            }
            //this.setGuest(guest);
            this.net.setCenterToken(0, guest.token);
            this.localData.guest.set(guest);
        }

        this.uqsUserId = this.responsive.user?.id;
        //this.net.logoutApis();
        let uqsLoader = new UQsLoader(this.net, version, this.uqConfigs);

        let retErrors = await uqsLoader.build();
        //this.uqsMan = uqsLoader.uqsMan;
        this.uqs = uqsProxy(uqsLoader.uqsMan) as any; //  this.uqsMan.proxy;
        //this.afterBuiltUQs(this._uqs);
        // await this.loadBaseData();
        return retErrors;
    }
    // protected abstract loadBaseData(): Promise<void>;
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
