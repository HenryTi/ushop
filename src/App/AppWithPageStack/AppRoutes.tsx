import { Route, Routes } from "react-router-dom";
import { AppPageStackContainer } from "tonwa-nav";
import { AppLogin } from './AppLogin';
import { AppRegister } from "./AppRegister";
import { AppWithPageStack } from './AppWithPageStack';

export function AppRoutes() {
    return <AppPageStackContainer>
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
