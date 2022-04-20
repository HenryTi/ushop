/*
const rootCenterHost = 'https://tv.jkchemical.com';
const centerHost = process.env['REACT_APP_CENTER_HOST'] ?? rootCenterHost;
const centerDebugHost = 'localhost:3000'; //'192.168.86.64';
const resHost = centerHost ?? rootCenterHost;
const resDebugHost = 'localhost:3015'; //'192.168.86.63';
const uqDebugHost = 'localhost:3015'; //'192.168.86.63';
const uqDebugBuilderHost = 'localhost:3009';
*/
export interface Hosts {
    center: string;
    uq: string;
    res: string;
}
/*
interface HostValue {
    value: string;
    local: boolean;
}
const hosts: { [name: string]: HostValue } = {
    centerhost: {
        value: undefined || centerDebugHost, // process.env['REACT_APP_CENTER_DEBUG_HOST']
        local: false,
    },
    reshost: {
        value: undefined || resDebugHost, // process.env['REACT_APP_RES_DEBUG_HOST']
        local: false,
    },
    uqhost: {
        value: undefined || uqDebugHost, // process.env['REACT_APP_UQ_DEBUG_HOST']
        local: false,
    },
    unitxhost: {
        value: undefined || uqDebugHost, // process.env['REACT_APP_UQ_DEBUG_HOST']
        local: false,
    },
    "uq-build": {
        value: undefined || uqDebugBuilderHost, // process.env['REACT_APP_UQ_DEBUG_BUILDER_HOST']
        local: false,
    }
}

const httpArr = ['https://', 'http://'];
function isAbsoluteUrl(url: string): boolean {
    for (let str of httpArr) {
        if (url.startsWith(str) === true) return true;
    }
    return false;
}

function urlFromHost(host: string): string {
    if (isAbsoluteUrl(host) === true) {
        if (host.endsWith('/')) return host;
        return host + '/';
    }
    return `http://${host}/`;
}

function centerUrlFromHost(host: string): string {
    return urlFromHost(host);
}
function centerWsFromHost(host: string) {
    let https = 'https://';
    if (host.startsWith(https) === true) {
        host = host.substr(https.length);
        if (host.endsWith('/') === true) host = host.substr(0, host.length - 1);
        return 'wss://' + host + '/tv/';
    }
    return `ws://${host}/tv/`
}
export function resUrlFromHost(host: string) {
    if (!host) return;
    let url = urlFromHost(host);
    return url + 'res/';
}
*/

const fetchOptions = {
    method: "GET",
    mode: "no-cors", // no-cors, cors, *same-origin
    headers: {
        "Content-Type": "text/plain"
    },
};

export async function buildHosts(center: string): Promise<Hosts> {
    let uq: string, res: string;
    if (center.endsWith('/') === false) {
        center += '/';
    }
    return { center, uq, res };
}

export async function buildDebugHosts(center: string, debugHosts: Hosts): Promise<Hosts> {
    if (center.endsWith('/') === false) {
        center += '/';
    }
    if (!debugHosts) {
        return { center, uq: undefined, res: undefined };
    }
    let { center: debugCenter, uq, res } = debugHosts;
    let promises: PromiseLike<any>[] = [debugCenter, uq, res].map(v => localCheck(v));
    let results = await Promise.all(promises);
    if (results[0] === true) center = `http://${debugCenter}/`;
    if (results[1] === true) uq = `http://${uq}/`;
    if (results[2] === true) res = `http://${res}/`;
    return { center, uq, res };
}

// 因为测试的都是局域网服务器，甚至本机服务器，所以一秒足够了
// 网上找了上面的fetch timeout代码。
// 尽管timeout了，fetch仍然继续，没有cancel

// 实际上，一秒钟不够。web服务器会自动停。重启的时候，可能会比较长时间。也许两秒甚至更多。
//const timeout = 2000;
const timeout = 2000;

function fetchLocalCheck(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(url, fetchOptions as any)
            .then(v => {
                v.text().then(resolve).catch(reject);
            })
            .catch(reject);
        const e = new Error("Connection timed out");
        setTimeout(reject, timeout, e);
    });
}

async function localCheck(host: string): Promise<boolean> {
    if (!host) return false;
    let url = `http://${host}/hello`;
    try {
        await fetchLocalCheck(url);
        return true;
    }
    catch (err) {
        return false;
    }
}
