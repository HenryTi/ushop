import { Route, Routes } from "react-router-dom";
import { appTabsTemplate, setPageTemplate } from "tonwa-page";
import { AppWithTabs } from './AppWithTabs';

export function AppRoutes() {
    setPageTemplate(undefined, appTabsTemplate);
    return <Routes>
        <Route path="/" element={<AppWithTabs />}>
            <Route path=":active_page" element={<AppWithTabs />} />
            <Route path=":active_page/:sub" element={<AppWithTabs />} />
        </Route>
    </Routes>;
}
/*
<Route path="/login" element={<AppLogin />} />
<Route path="/register" element={<AppRegister />} />
<Route path="/logout" element={<AppLogout />} />
*/