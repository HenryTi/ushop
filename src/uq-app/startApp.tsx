import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { NavView, start, TonwaReact } from "tonwa";
import { CApp } from './CApp';
import { appConfig } from './appConfig';
//import { AppRoutes } from 'App/AppWithTabs';
import { AppRoutes } from 'App/AppWithPageStack';
import { AuthRoutes } from 'tonwa-nav/AuthRoutes';

export async function startApp() {
    /*
    let tonwa = new TonwaReact();
    //initNav(tonwa);
    tonwa.setSettings(appConfig);
    const onLogined = async (isUserLogin?: boolean) => {
        await start(CApp, tonwa, appConfig, isUserLogin);
    }
    const notLogined: () => Promise<void> = onLogined;
    const userPassword: () => Promise<{ user: string; password: string }> = undefined;
    tonwa.appStart(onLogined);
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
                <AppRoutes />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
