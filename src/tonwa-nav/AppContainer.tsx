import { useNavigate } from "react-router-dom";
import { AppPageStack } from "./AppPageStack";
import { appPageStackTemplate } from "./AppPageStackTemplate";
import { appTabsTemplate } from "./AppTabsTemplate";
import { AppNav, AppNavContext } from "./nav";
import { setPageTemplate } from "./PageTemplate";

interface Props {
    //pages: AppPageItem[];
    //active?: AppPageItem;
    children: JSX.Element;
}

export function AppPageStackContainer({ children }: Props) {
    let navigate = useNavigate();
    //let pageTemplate = appPageStackTemplate;
    let nav = AppNav.current; //(navigate, pageTemplate));
    nav.setNavigate(navigate);
    setPageTemplate(undefined, appPageStackTemplate);
    return <AppNavContext.Provider value={nav}>
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
