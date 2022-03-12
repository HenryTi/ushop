//import {bridgeCenterApi, isBridged} from './appBridge';
import { Caller } from './caller';
//import { env } from '../tool';
import { Net } from './Net';

/*
export async function httpGet(url:string, params?:any):Promise<any> {
    let channel = new HttpChannel(false, url, undefined, undefined);
    let ret = await channel.get('', params);
    return ret;
}

export async function httpPost(url:string, params?:any):Promise<any> {
    let channel = new HttpChannel(false, url, undefined, undefined);
    let ret = await channel.post('', params);
    return ret;
}
*/

const methodsWithBody = ['POST', 'PUT'];

export abstract class HttpChannel {
    private timeout: number;
    protected net: Net;
    protected hostUrl: string;
    protected apiToken: string;

    constructor(net: Net, hostUrl: string, apiToken: string) {
        this.net = net;
        this.hostUrl = hostUrl;
        this.apiToken = apiToken;
        this.timeout = net.isDevelopment === true ? 30000 : 50000;
    }

    used() {
        this.post('', {});
    }

    async xcall(urlPrefix: string, caller: Caller<any>): Promise<void> {
        let options = this.buildOptions();
        let { headers, path, method } = caller;
        if (headers !== undefined) {
            let h = options.headers;
            for (let i in headers) {
                //h.append(i, encodeURI(headers[i]));
                h[i] = encodeURI(headers[i]);
            }
        }
        options.method = method;
        let p = caller.buildParams();
        if (methodsWithBody.indexOf(method) >= 0 && p !== undefined) {
            options.body = JSON.stringify(p)
        }
        return await this.innerFetch(urlPrefix + path, options);
    }

    private async innerFetchResult(url: string, options: any): Promise<any> {
        let ret = await this.innerFetch(url, options);
        return ret.res;
    }

    async get(url: string, params: any = undefined): Promise<any> {
        if (params) {
            let keys = Object.keys(params);
            if (keys.length > 0) {
                let c = '?';
                for (let k of keys) {
                    let v = params[k];
                    if (v === undefined) continue;
                    url += c + k + '=' + params[k];
                    c = '&';
                }
            }
        }
        let options = this.buildOptions();
        options.method = 'GET';
        return await this.innerFetchResult(url, options);
    }

    async post(url: string, params: any): Promise<any> {
        let options = this.buildOptions();
        options.method = 'POST';
        options.body = JSON.stringify(params);
        return await this.innerFetchResult(url, options);
    }

    async put(url: string, params: any): Promise<any> {
        let options = this.buildOptions();
        options.method = 'PUT';
        options.body = JSON.stringify(params);
        return await this.innerFetchResult(url, options);
    }

    async delete(url: string, params: any): Promise<any> {
        let options = this.buildOptions();
        options.method = 'DELETE';
        options.body = JSON.stringify(params);
        return await this.innerFetchResult(url, options);
    }
    async fetch(url: string, options: any, resolve: (value?: any) => any, reject: (reason?: any) => void): Promise<void> {
        let path = url;
        try {
            console.log('%s-%s %s', options.method, path, options.body || '');
            let now = Date.now();
            let timeOutHandler = setTimeout(
                () => {
                    throw new Error(`webapi timeout: ${(Date.now() - now)}ms ${url}`);
                },
                this.timeout);
            let res = await fetch(encodeURI(path), options);
            if (res.ok === false) {
                clearTimeout(timeOutHandler);
                console.log('call error %s', res.statusText);
                throw res.statusText;
            }
            let ct = res.headers.get('content-type');
            if (ct && ct.indexOf('json') >= 0) {
                return res.json().then(async retJson => {
                    clearTimeout(timeOutHandler);
                    if (retJson.ok === true) {
                        if (typeof retJson !== 'object') {
                            debugger;
                        }
                        else if (Array.isArray(retJson) === true) {
                            debugger;
                        }
                        return resolve(retJson);
                    }
                    let retError = retJson.error;
                    if (retError === undefined) {
                        reject('not valid tonwa json');
                    }
                    else {
                        reject(retError);
                    }
                }).catch(async error => {
                    reject(error);
                });
            }
            else {
                let text = await res.text();
                clearTimeout(timeOutHandler);
                console.log('text endWait');
                resolve(text);
            }
        }
        catch (error) {
            if (typeof error === 'string') {
                let err = error.toLowerCase();
                if (err.startsWith('unauthorized') === true || err.startsWith('$roles') === true) {
                    this.net.logout();
                    return;
                }
            }
            console.error('fecth error (no nav.showError): ' + url);
        };
    }

    protected abstract innerFetch(url: string, options: any): Promise<any>;

    async callFetch(url: string, method: string, body: any): Promise<any> {
        let options = this.buildOptions();
        options.method = method;
        options.body = body;
        return new Promise<any>(async (resolve, reject) => {
            await this.fetch(url, options, resolve, reject);
        });
    }

    //private buildOptions(): {method:string; headers:Headers; body:any} {
    private buildOptions(): { method: string; headers: { [name: string]: string }; body: any } {
        let headers = this.buildHeaders();
        let options = {
            headers: headers,
            method: undefined as any,
            body: undefined as any,
            // cache: 'no-cache',
        };
        return options;
    }

    /*
    protected buildHeaders():Headers {
        let {language, culture} = nav;
        let headers = new Headers();
        //headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let lang = language;
        if (culture) lang += '-' + culture;
        headers.append('Accept-Language', lang);
        if (this.apiToken) { 
            headers.append('Authorization', this.apiToken); 
        }
        return headers;
    }
    */
    protected buildHeaders(): { [name: string]: string } {
        let { language, culture } = this.net;
        let headers: { [name: string]: string } = {}; //new Headers();
        //headers.append('Access-Control-Allow-Origin', '*');
        //headers.append('Content-Type', 'application/json;charset=UTF-8');
        headers['Content-Type'] = 'application/json;charset=UTF-8';
        let lang = language;
        if (culture) lang += '-' + culture;
        //headers.append('Accept-Language', lang);
        headers['Accept-Language'] = lang;
        if (this.apiToken) {
            //headers.append('Authorization', this.apiToken); 
            headers['Authorization'] = this.apiToken;
        }
        return headers;
    }
}

export class CenterHttpChannel extends HttpChannel {
    protected async innerFetch(url: string, options: any): Promise<any> {
        let u = this.hostUrl + url;
        return new Promise<any>(async (resolve, reject) => {
            await this.fetch(u, options, resolve, reject);
        });
    }
}

export class UqHttpChannel extends HttpChannel {
    protected async innerFetch(url: string, options: any): Promise<any> {
        let u = this.hostUrl + url;
        return new Promise<any>(async (resolve, reject) => {
            await this.fetch(u, options, resolve, reject);
        });
    }
}
