import { Route, Routes } from "react-router-dom";
import { AppPageStackContainer, AuthProvider } from "tonwa-page";
import { AppLogin } from './AppLogin';
import { AppRegister } from "./AppRegister";
import { AppWithPageStack } from './AppWithPageStack';

export function AppRoutes({ authProvider }: { authProvider: AuthProvider; }) {
    return <AppPageStackContainer authProvider={authProvider}>
        <Routes>
            <Route path="/login" element={<AppLogin />} />
            <Route path="/register" element={<AppRegister />} />
            <Route path="/" element={<AppWithPageStack />}>
                <Route path=":active_page" element={<AppWithPageStack />} />
                <Route path=":active_page/:sub" element={<AppWithPageStack />} />
            </Route>
        </Routes>
    </AppPageStackContainer>;
}
