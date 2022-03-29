import { Route, Routes } from "react-router-dom";
import { AppLogin, AppLogout, AppRegister } from "./AppImage";
import { AppWithTabs } from './AppWithTabs';

export function AppRoutes() {
    return <Routes>
        <Route path="/login" element={<AppLogin />} />
        <Route path="/register" element={<AppRegister />} />
        <Route path="/logout" element={<AppLogout />} />
        <Route path="/" element={<AppWithTabs />}>
            <Route path=":active_page" element={<AppWithTabs />} />
            <Route path=":active_page/:sub" element={<AppWithTabs />} />
        </Route>
    </Routes>;
}
