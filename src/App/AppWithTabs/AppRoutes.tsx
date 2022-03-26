import { Route, Routes } from "react-router-dom";
import { AppTabsContainer, AuthProvider, useNav } from "tonwa-page";
import { AppWithTabs } from './AppWithTabs';

export function AppRoutes({ authProvider }: { authProvider: AuthProvider }) {
    return <AppTabsContainer authProvider={authProvider}>
        <Routes>
            <Route path="/" element={<AppWithTabs />}>
                <Route path=":active_page" element={<AppWithTabs />} />
                <Route path=":active_page/:sub" element={<AppWithTabs />} />
            </Route>
        </Routes>
    </AppTabsContainer>;
}
