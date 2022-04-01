import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { TonwaReact } from "tonwa";
import { CApp } from './CApp';
import { appConfig } from './appConfig';
import { AuthProvider } from 'tonwa-auth';
import { AppContainer, AuthProviderContext } from 'tonwa-page';
import { App, AppRoot } from '../App';

export async function startApp() {
    let tonwa = new TonwaReact();
    //initNav(tonwa);
    tonwa.setSettings(appConfig);
    //const onLogined = async (isUserLogin?: boolean) => {
    //    await start(CApp, tonwa, appConfig, isUserLogin);
    //}
    const notLogined: () => Promise<void> = async () => { };
    //const userPassword: () => Promise<{ user: string; password: string }> = undefined;
    await tonwa.appStart(notLogined);
    let cApp = new CApp(tonwa);
    await cApp.start(undefined);
    let authProvider = new AuthProvider();
    authProvider.setAuthApi(tonwa.net.userApi);
    authProvider.subscribeOnLoginChanged(tonwa.onChangeLogin as any);
    authProvider.loginChanged(tonwa.user);

    let uqApp = new App()
    uqApp.init(cApp.uqs, tonwa.appNav);
    //app.appNav = appNav;
    uqApp.user = tonwa.user;
    uqApp.userApi = tonwa.net.centerApi;
    await uqApp.loadBaseData();

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
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <AuthProviderContext.Provider value={authProvider}>
                    <AppContainer>
                        <AppRoot uqApp={uqApp} />
                    </AppContainer>
                </AuthProviderContext.Provider>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
