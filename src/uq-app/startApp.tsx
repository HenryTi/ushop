import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppConfig } from 'tonwa-com-uq';
import { UqConfig } from 'tonwa-uq';
//import { TonwaReact } from "tonwa";
//import { CApp } from './CApp';
import { App, AppRoot } from '../App';
import uqConfigs from '../uqconfig.json';

export const appConfig: AppConfig = {
    version: '0.1.0',
    uqs: uqsFromConfigs(),
    noUnit: true,
    oem: undefined,
    htmlTitle: 'UShop',
};

function uqsFromConfigs(): UqConfig[] {
    let { devs, uqs } = uqConfigs;
    return uqs.map(v => {
        let { dev, name, alias } = v;
        return {
            dev: (devs as any)[dev],
            name,
            alias,
        };
    });
}

export async function startApp() {
    //let tonwa = new TonwaReact();
    //initNav(tonwa);
    //tonwa.setSettings(appConfig);
    //const onLogined = async (isUserLogin?: boolean) => {
    //    await start(CApp, tonwa, appConfig, isUserLogin);
    //}
    //const notLogined: () => Promise<void> = async () => { };
    //const userPassword: () => Promise<{ user: string; password: string }> = undefined;
    //await tonwa.appStart(notLogined);
    //let cApp = new CApp(tonwa);
    //await cApp.start(undefined);
    //let authProvider = new AuthProvider();
    //authProvider.setAuthApi(tonwa.net.userApi);
    //authProvider.subscribeOnLoginChanged(tonwa.onChangeLogin as any);
    //authProvider.loginChanged(tonwa.user);

    //let uqApp = new App(cApp.uqs)
    let uqApp = new App();
    await uqApp.init(appConfig);
    //uqApp.logined(tonwa.user);
    //uqApp.userApi = tonwa.net.userApi;
    //await uqApp.loadBaseData();

    /*
    ReactDOM.render(
        <React.StrictMode>
            <NavView ref={navView => tonwa.set(navView)}
                onLogined={onLogined}
                notLogined={notLogined}
                userPassword={userPassword} />
        </React.StrictMode>,
        document.getElementById('root')
    );
    */
    //<AuthProviderContext.Provider value={authProvider}>
    //</AuthProviderContext.Provider>
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <AppRoot uqApp={uqApp} />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
