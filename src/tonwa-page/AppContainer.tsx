import { useNavigate } from "react-router-dom";
import { AppPageStack } from "./AppPageStack";
import { appPageStackTemplate } from "./AppPageStackTemplate";
import { appTabsTemplate } from "./AppTabsTemplate";
import { AuthProvider } from "./AuthProvider";
import { AppNav, AppNavContext } from "./nav";
import { setPageTemplate } from "./PageTemplate";

interface Props {
    authProvider: AuthProvider;
    children: JSX.Element;
}

export function AppPageStackContainer({ authProvider, children }: Props) {
    let navigate = useNavigate();
    let appNav = AppNav.current;
    appNav.setNavigate(navigate);
    appNav.setAuthProvider(authProvider);
    setPageTemplate(undefined, appPageStackTemplate);
    return <AppNavContext.Provider value={appNav}>
        <AppPageStack>
            {children}
        </AppPageStack>
    </AppNavContext.Provider>;
}

export function AppTabsContainer({ children }: Props) {
    let navigate = useNavigate();
    let nav = AppNav.current;
    nav.setNavigate(navigate);
    setPageTemplate(undefined, appTabsTemplate);
    return <AppNavContext.Provider value={nav}>
        {children}
    </AppNavContext.Provider>;
}
