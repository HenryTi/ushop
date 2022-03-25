import { Route, Routes } from "react-router-dom";
import { AppTabsContainer } from "tonwa-nav";
import { AppWithTabs } from './AppWithTabs';

export function AppRoutes() {
    return <AppTabsContainer>
        <Routes>
            <Route path="/" element={<AppWithTabs />}>
                <Route path=":active_page" element={<AppWithTabs />} />
                <Route path=":active_page/:sub" element={<AppWithTabs />} />
            </Route>
        </Routes>
    </AppTabsContainer>;
}
