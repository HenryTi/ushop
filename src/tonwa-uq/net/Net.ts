/* eslint-disable */
import { UqTokens } from "./UqTokens";
import { CenterApi } from "./centerApi";
import { CallCenterApi, UqTokenApi, UserApi } from "./uqApi";
import { HttpChannel, CenterHttpChannel } from './httpChannel';
import { GuestApi } from "./guestApi";
import { MessageHub } from "./messageHub";
import { WsBridge, WSChannel } from "./wsChannel";
import { Host, resUrlFromHost } from './host';
import { LocalDb } from "tonwa-uq";

export interface PromiseValue<T> {
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}

export interface NetProps {
    unit: number;
    testing: boolean;
    buildingUq?: boolean;           // default false
}

export abstract class Net {
    logout() {
        throw new Error('Method not implemented.');
    }
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
    readonly guestApi: GuestApi;
    readonly messageHub: MessageHub;
    readonly wsBridge: WsBridge;
    readonly host: Host;

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
        this.localDb = this.createLocalDb();
        this.centerApi = new CenterApi(this, 'tv/');
        this.uqTokens = new UqTokens(this);
        this.userApi = new UserApi(this, 'tv/');
        this.uqTokenApi = new UqTokenApi(this, 'tv/tie/');
        this.callCenterapi = new CallCenterApi(this, '');
        this.guestApi = new GuestApi(this, 'tv/guest/');
        this.messageHub = new MessageHub(this);
        this.wsBridge = new WsBridge(this);
        this.host = Host.createHost(this.isDevelopment);
    }

    abstract createLocalDb(): LocalDb;
    abstract createObservableMap(): Map<number, any>;

    logoutApis() {
        this.uqTokens.logoutUqTokens();
    }

    setCenterUrl(url: string) {
        console.log('setCenterUrl %s', url);
        this.centerHost = url;
        this.centerChannel = undefined;
    }

    setCenterToken(userId: number, t?: string) {
        this.loginedUserId = userId;
        this.centerToken = t;
        this.centerChannel = undefined;
    }

    getCenterChannel(): HttpChannel {
        if (this.centerChannel !== undefined) return this.centerChannel;
        return this.centerChannel = new CenterHttpChannel(this, this.centerHost, this.centerToken);
    }

    setNetToken(userId: number, token: string) {
        this.setCenterToken(userId, token);
        WSChannel.setCenterToken(token);
    }

    clearNetToken() {
        this.setCenterToken(0, undefined);
        WSChannel.setCenterToken(undefined);
    }

    resUrlFromHost(host: string): string {
        return resUrlFromHost(host);
    }
}
