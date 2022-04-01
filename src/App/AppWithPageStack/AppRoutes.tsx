import { Route, Routes } from "react-router-dom";
import { setPageTemplate, appPageStackTemplate } from "tonwa-page";
import { AppLogin, AppRegister } from "./AppImage";
import { AppWithPageStack } from './AppWithPageStack';

export function AppRoutes() {
    setPageTemplate(undefined, appPageStackTemplate);
    return <Routes>
        <Route path="/login" element={<AppLogin />} />
        <Route path="/register" element={<AppRegister />} />
        <Route path="/" element={<AppWithPageStack />}>
            <Route path=":active_page" element={<AppWithPageStack />} />
            <Route path=":active_page/:sub" element={<AppWithPageStack />} />
        </Route>
    </Routes>;
}
