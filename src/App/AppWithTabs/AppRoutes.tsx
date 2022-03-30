import { Route, Routes } from "react-router-dom";
import { AppContainer, appTabsTemplate } from "tonwa-page";
import { AppWithTabs } from './AppWithTabs';

export function AppRoutes() {
    return <AppContainer pageTemplate={appTabsTemplate}>
        <Routes>
            <Route path="/" element={<AppWithTabs />}>
                <Route path=":active_page" element={<AppWithTabs />} />
                <Route path=":active_page/:sub" element={<AppWithTabs />} />
            </Route>
        </Routes>
    </AppContainer>;
}
/*
<Route path="/login" element={<AppLogin />} />
<Route path="/register" element={<AppRegister />} />
<Route path="/logout" element={<AppLogout />} />
*/