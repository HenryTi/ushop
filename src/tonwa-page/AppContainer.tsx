import { useNavigate } from "react-router-dom";
import { AppPageStack } from "./AppPageStack";
import { appPageStackTemplate } from "./AppPageStackTemplate";
import { appTabsTemplate } from "./AppTabsTemplate";
import { AuthProvider, AuthProviderContext } from "./AuthProvider";
import { AppNavContext } from "./nav";
import { AppNav } from './AppNav';
import { setPageTemplate } from "./PageTemplate";
import { PageTemplateProps } from "./PageProps";
import { useContext, useRef } from "react";

interface Props {
    children: React.ReactNode;
    pageTemplate?: PageTemplateProps;
}

export function AppContainer({ pageTemplate, children }: Props) {
    let navigate = useNavigate();
    let { current: appNav } = useRef(new AppNav());
    appNav.setNavigate(navigate);
    let authProvider = useContext(AuthProviderContext);
    authProvider.subscribeOnLoginChanged(appNav.onLoginChanged);
    setPageTemplate(undefined, pageTemplate);
    return <AppNavContext.Provider value={appNav}>
        {children}
    </AppNavContext.Provider>;
}

export function AppPageStackContainer({ children }: Props) {
    let navigate = useNavigate();
    let { current: appNav } = useRef(new AppNav());
    appNav.setNavigate(navigate);
    let authProvider = useContext(AuthProviderContext);
    authProvider.subscribeOnLoginChanged(appNav.onLoginChanged);
    setPageTemplate(undefined, appPageStackTemplate);
    return <AppNavContext.Provider value={appNav}>
        <AppPageStack>
            {children}
        </AppPageStack>
    </AppNavContext.Provider>;
}
