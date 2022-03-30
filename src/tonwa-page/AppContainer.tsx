import { useNavigate } from "react-router-dom";
import { appPageStackTemplate } from "./AppPageStackTemplate";
import { AuthProviderContext } from "./AuthProvider";
import { AppNavContext } from "./nav";
import { AppNav } from './AppNav';
import { setPageTemplate } from "./PageTemplate";
import { PageTemplateProps } from "./PageProps";
import { useContext, useRef } from "react";
import { StackContainer } from "./StackContainer";
import { useSnapshot } from "valtio";

interface Props {
    children: React.ReactNode;
    pageTemplate: PageTemplateProps;
}

export function AppContainer({ pageTemplate, children }: Props) {
    let navigate = useNavigate();
    let { current: appNav } = useRef(new AppNav(children));
    appNav.setNavigate(navigate);
    let authProvider = useContext(AuthProviderContext);
    authProvider.subscribeOnLoginChanged(appNav.onLoginChanged);
    setPageTemplate(undefined, pageTemplate);
    let { stack } = useSnapshot(appNav.data);
    return <AppNavContext.Provider value={appNav}>
        <StackContainer stackItems={stack} />
    </AppNavContext.Provider>;
}
/*
export function AppPageStackContainer({ children }: Props) {
    let navigate = useNavigate();
    let { current: appNav } = useRef(new AppNav(children));
    appNav.setNavigate(navigate);
    let authProvider = useContext(AuthProviderContext);
    authProvider.subscribeOnLoginChanged(appNav.onLoginChanged);
    setPageTemplate(undefined, appPageStackTemplate);
    let { stack } = useSnapshot(appNav.data);
    return <AppNavContext.Provider value={appNav}>
        <StackContainer stackItems={stack} />
    </AppNavContext.Provider>;
}
*/