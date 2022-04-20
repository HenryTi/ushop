/* eslint-disable */
import { UqTokens } from "./UqTokens";
import { CenterApi } from "./centerApi";
import { CallCenterApi, UqTokenApi } from "./uqApi";
import { UserApi } from "./userApi";
import { HttpChannel } from './httpChannel';
import { MessageHub } from "./messageHub";
import { WsBridge, WSChannel } from "./wsChannel";
import { buildDebugHosts, buildHosts, Hosts } from './host';
import { LocalDb } from "../tool";
import { env } from "tonwa-com";

export interface PromiseValue<T> {
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}

export interface NetProps {
    center: string;
    debug: Hosts;
    unit: number;
    testing: boolean;
    buildingUq?: boolean;           // default false
    localDb: LocalDb;
    createObservableMap(): Map<number, any>;
}

export class Net {
    logout() {
        throw new Error('Method not implemented.');
    }
    private hosts: Hosts;
    private testing: boolean;

    centerHost: string;
    centerToken: string | undefined = undefined;
    loginedUserId: number = 0;
    centerChannel: HttpChannel;

    readonly props: NetProps;
    readonly isDevelopment: boolean;
    readonly localDb: LocalDb;
    readonly uqChannels: { [name: string]: HttpChannel | (PromiseValue<any>[]) } = {};
    readonly centerApi: CenterApi;
    readonly uqTokens: UqTokens;
    readonly userApi: UserApi;
    readonly uqTokenApi: UqTokenApi;
    readonly callCenterapi: CallCenterApi;
    //readonly guestApi: GuestApi;
    readonly messageHub: MessageHub;
    readonly wsBridge: WsBridge;
    //readonly hostMan: HostMan;

    language: string;
    culture: string;

    // 下面的变量应该以后会去掉
    isBuildingUQ: boolean;
    _uqs: any;
    user: any;
    // -- end -------------------

    constructor(props: NetProps) {
        this.props = props;
        this.isDevelopment = process.env.NODE_ENV === 'development';
        this.testing = env.testing;
        this.localDb = this.props.localDb;
        this.createObservableMap = this.props.createObservableMap;
        this.centerApi = new CenterApi(this, 'tv/');
        this.uqTokens = new UqTokens(this);
        this.userApi = new UserApi(this, 'tv/');
        this.uqTokenApi = new UqTokenApi(this, 'tv/tie/');
        this.callCenterapi = new CallCenterApi(this, '');
        //this.guestApi = new GuestApi(this, 'tv/guest/');
        this.messageHub = new MessageHub(this);
        this.wsBridge = new WsBridge(this);
        //this.hostMan = HostMan.createHost(this.isDevelopment);
    }

    async init() {
        let { center, debug } = this.props;
        this.hosts = this.isDevelopment === true ?
            await buildDebugHosts(center, debug)
            :
            await buildHosts(center);
        //await this.hostMan.start(testing)
        //let { url } = this.hostMan;
        this.setCenterUrl(this.hosts.center);
    }

    getResUrl(res: string): string {
        return this.hosts.res + res;
    }

    //abstract createLocalDb(): LocalDb;
    createObservableMap: () => Map<number, any>;

    logoutApis() {
        this.uqTokens.logoutUqTokens();
        for (let i in this.uqChannels) this.uqChannels[i] = undefined;
    }

    setCenterUrl(url: string) {
        console.log('setCenterUrl %s', url);
        this.centerHost = url;
        this.centerChannel = undefined;
    }

    setCenterToken(userId: number, token: string) {
        this.loginedUserId = userId;
        this.centerToken = token;
        this.centerChannel = undefined;
        WSChannel.setCenterToken(token);
    }

    clearCenterToken() {
        this.setCenterToken(0, undefined);
        WSChannel.setCenterToken(undefined);
    }

    getCenterChannel(): HttpChannel {
        if (this.centerChannel !== undefined) return this.centerChannel;
        let centerHost = this.hosts.center;
        return this.centerChannel = new HttpChannel(this, centerHost, this.centerToken);
    }
    /*
    resUrlFromHost(host: string): string {
        return resUrlFromHost(host);
    }
    */
    buildUqUrl(db: string, url: string, urlTest: string): string {
        let testOrProd: string;
        if (this.testing === true) {
            let { uq } = this.hosts;
            if (uq) {
                url = uq;
            }
            else if (urlTest !== '-') {
                url = urlTest;
            }
            testOrProd = 'test';
        }
        else {
            testOrProd = 'prod';
        }
        if (url.endsWith('/') === false) {
            url += '/';
        }
        return `${url}uq/${testOrProd}/${db}/`;
    }
}
