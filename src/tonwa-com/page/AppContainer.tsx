import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { AppNavContext } from "./nav";
import { AppNav } from './AppNav';
import { useRef } from "react";
import { StackContainer } from "./StackContainer";
import { useSnapshot } from "valtio";

interface Props {
    children: React.ReactNode;
}

export function AppContainer({ children }: Props) {
    let navigate = useNavigate();
    let { current: appNav } = useRef(new AppNav(children));
    appNav.setNavigate(navigate);
    let auth = useAuth();
    auth.subscribeOnLoginChanged(appNav.onLoginChanged);
    appNav.onLoginChanged(auth.user);
    let { stack } = useSnapshot(appNav.data);
    return <AppNavContext.Provider value={appNav}>
        <StackContainer stackItems={stack} />
    </AppNavContext.Provider>;
}
